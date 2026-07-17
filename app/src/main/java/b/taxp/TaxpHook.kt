package b.taxp

import com.rio.tvboxagg.NodeBridge

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.os.Handler
import android.widget.Toast
import de.robv.android.xposed.IXposedHookLoadPackage
import de.robv.android.xposed.IXposedHookZygoteInit
import de.robv.android.xposed.XC_MethodHook
import de.robv.android.xposed.XposedBridge
import de.robv.android.xposed.XposedHelpers
import de.robv.android.xposed.callbacks.XC_LoadPackage
import java.io.File
import java.io.FileOutputStream
import java.util.concurrent.CountDownLatch
import java.util.zip.ZipFile
import org.tukaani.xz.XZInputStream

class TaxpHook : IXposedHookLoadPackage, IXposedHookZygoteInit {

    companion object {
        private const val TARGET_PACKAGE = "com.fongmi.android.tv"
        private const val MODULE_PACKAGE = "b.taxp"
        @Volatile
        private var modulePathFromZygote: String? = null
    }

    override fun initZygote(startupParam: IXposedHookZygoteInit.StartupParam) {
        modulePathFromZygote = startupParam.modulePath?.takeIf { it.isNotEmpty() }
    }

    override fun handleLoadPackage(lpparam: XC_LoadPackage.LoadPackageParam) {
        if (lpparam.packageName != TARGET_PACKAGE) return

        var unhook: XC_MethodHook.Unhook? = null

        val hook = object : XC_MethodHook() {
            override fun beforeHookedMethod(param: MethodHookParam) {

                // 首次执行后解除 hook
                unhook?.let {
                    it.unhook()
                    XposedBridge.log("TAXP: 一次性 Hook 已移除")
                }

                val activity = param.thisObject as Activity
                runCatching {
                    startNodeServer(activity)
                }.onFailure { e ->
                    XposedBridge.log("TAXP: 模块发生致命错误")
                    XposedBridge.log(android.util.Log.getStackTraceString(e))
                }
            }
        }

        unhook = XposedHelpers.findAndHookMethod(
            Activity::class.java,
            "onCreate",
            android.os.Bundle::class.java,
            hook
        )
    }

    @SuppressLint("UnsafeDynamicallyLoadedCode")
    private fun startNodeServer(context: Context) {
        val mainLooper = context.mainLooper

        // 1. Preserve module path
        val modulePath = findModulePath(context)

        // 2. Extract assets
        val nativeLibDir = extractNativeLibs(context, modulePath)
        val TaProjectDir = File(nativeLibDir, "ta")
        extractAssets(modulePath, TaProjectDir)

        // 3. Load libs
        @Suppress("UnsafeDynamicallyLoadedCode")
        runCatching {
            System.load(File(nativeLibDir, "libc++_shared.so").absolutePath)
            System.load(File(nativeLibDir, "libnode.so").absolutePath)
            System.load(File(nativeLibDir, "libnative-lib.so").absolutePath)
        }.onFailure { e ->
            XposedBridge.log("TAXP: 库加载失败")
            XposedBridge.log(android.util.Log.getStackTraceString(e))
        }

        // 4. Start the Node.js server in new thread
        // NodeBridge.startNodeWithArguments is a blocking JNI call — Node.js event loop
        // runs on the calling thread and never returns until the process exits.
        XposedBridge.log("TAXP: 正在启动 TA...")

        // TA launch wrapper of loading ENV from .env file to match the behavior
        val launcherJs = File(TaProjectDir, "launcher.js")
        val args = arrayOf("node", launcherJs.absolutePath)

        Thread {
            NodeBridge.startNodeWithArguments(args)
        }.start()

        // 5. Wait ta until standby
        XposedBridge.log("TAXP: 等待 TA 就绪...")

        // Standby check in new thread
        val latch = CountDownLatch(1)
        Thread {
            waitForPortReady(5678)
            latch.countDown()
        }.start()
        latch.await()

        // Cooldown for 100ms
        Thread.sleep(100)

        // 6. TA is standby, make a toast on screen and also for logcat
        Handler(mainLooper).post {
            Toast.makeText(context, "TA 已启动，端口 5678", Toast.LENGTH_LONG).show()
        }

        XposedBridge.log("TAXP: TA 就绪")
    }

    /**
     * Blocks the calling thread until a TCP connection to [port] succeeds.
     * Polls every 50ms with no timeout.
     */
    private fun waitForPortReady(port: Int) {
        while (true) {
            try {
                java.net.Socket("127.0.0.1", port).use { it.getInputStream() }
                return
            } catch ( e : Exception) {
                // 若此处出现问题需要取消注释再观察日志
                // XposedBridge.log("TAXP: 监听异常信息如下，不一定是错误")
                // XposedBridge.log(android.util.Log.getStackTraceString(e))
            }
            Thread.sleep(50)
        }
    }

    private fun extractNativeLibs(context: Context, modulePath: String): File {
        val outDir = File(context.dataDir, "taxp_data")

        if (outDir.exists()) {
            XposedBridge.log("TAXP: 库已存在")
            return outDir
        }
        outDir.mkdirs()

        XposedBridge.log("TAXP: 正在解压库文件至：$modulePath")

        ZipFile(File(modulePath)).use { zip ->
            val tarXzEntry = zip.getEntry("assets/lib.tar.xz")
                ?: throw RuntimeException("APK 中未找到 lib.tar.xz")

            zip.getInputStream(tarXzEntry).use { input ->
                XZInputStream(input).use { xzis ->
                    extractTarEntries(xzis, outDir)
                }
            }
        }

        return outDir
     }

    /**
     * 独立实现解压逻辑优化体积
     */
    private fun extractTarEntries(input: java.io.InputStream, outDir: File) {
        val header = ByteArray(512)
        val blockSize = 512

        while (true) {
            if (!readFully(input, header, blockSize)) break

            // 空块 = tar 结束
            if (header.all { it == 0.toByte() }) break

            // 解析文件名：从偏移 0 开始，以 null 结尾
            val nameEnd = header.indexOf(0.toByte())
            val name = if (nameEnd >= 0) String(header, 0, nameEnd) else String(header, 0, 100)
            if (name.isEmpty()) break

            // 解析文件大小：偏移 124，12 字节八进制字符串
            val sizeStr = String(header, 124, 12, Charsets.US_ASCII)
                .trimEnd('\u0000', ' ').trim()
            val size = if (sizeStr.isEmpty()) 0L else sizeStr.toLong(8)

            // 只提取 .so 文件
            if (name.endsWith(".so") && size > 0) {
                val soName = name.substringAfterLast("/")
                val outFile = File(outDir, soName)

                FileOutputStream(outFile).use { output ->
                    // 按块拷贝，避免一次性分配 size 大小的缓冲区
                    var remaining = size
                    val buffer = ByteArray(8192)
                    while (remaining > 0) {
                        val toRead = minOf(buffer.size.toLong(), remaining).toInt()
                        val read = input.read(buffer, 0, toRead)
                        if (read <= 0) break
                        output.write(buffer, 0, read)
                        remaining -= read
                    }
                }
                outFile.setExecutable(true, false)
//                XposedBridge.log("TAXP: 已解压 $soName")

                // 跳过填充字节（数据填充到 512 字节对齐）
                val padding = (blockSize - (size % blockSize)).toInt() % blockSize
                if (padding > 0) readFully(input, ByteArray(padding), padding)
            } else {
                // 跳过非 .so 条目的数据 + 填充
                val totalSkip = size + (blockSize - (size % blockSize)).toInt() % blockSize
                var remaining = totalSkip
                val skipBuf = ByteArray(8192)
                while (remaining > 0) {
                    val toRead = minOf(skipBuf.size.toLong(), remaining).toInt()
                    val read = input.read(skipBuf, 0, toRead)
                    if (read <= 0) break
                    remaining -= read
                }
            }
        }
    }

    /**
     * extractTarEntries函数的辅助函数
     */
    private fun readFully(input: java.io.InputStream, buf: ByteArray, count: Int): Boolean {
        var read = 0
        while (read < count) {
            val n = input.read(buf, read, count - read)
            if (n <= 0) return false
            read += n
        }
        return true
    }

    private fun extractAssets(modulePath: String, targetDir: File) {
        if (targetDir.exists()) {
            XposedBridge.log("TAXP: TA 项目已存在")
            return
        }
        targetDir.mkdirs()

        XposedBridge.log("TAXP: 正在提取 TA 至 ${targetDir.absolutePath}")

        ZipFile(File(modulePath)).use { zip ->
            // Log all asset entries for debugging
            val allAssetEntries = zip.entries().asSequence()
                .filter { it.name.startsWith("assets/") }
                .filter { !it.isDirectory }
                .toList()

//            XposedBridge.log("TAXP: APK 中找到 ${allAssetEntries.size} 个资源文件")
//            allAssetEntries.forEach { entry ->
//                XposedBridge.log("TAXP: APK 条目: ${entry.name}")
//            }

            // 过滤无关文件
            val assetEntries = allAssetEntries
                .filter { it.name != "assets/xposed_init" }
                .filter { it.name != "assets/lib.tar.xz" }

            for (entry in assetEntries) {
                // Strip the "assets/" prefix to get the relative path
                val relativePath = entry.name.removePrefix("assets/")
                val outFile = File(targetDir, relativePath)

                outFile.parentFile?.mkdirs()

                // Delete existing file to ensure fresh extraction
                if (outFile.exists()) {
                    outFile.delete()
                }

                FileOutputStream(outFile).use { output ->
                    zip.getInputStream(entry).use { input ->
                        input.copyTo(output)
                    }
                }
            }

        }
    }

    /**
     * 查找模块APK路径。
     *
     * 优先级：
     * 1. IXposedHookZygoteInit.StartupParam.modulePath —— LSPatch 集成模式下框架直接传入的
     *    模块 APK 缓存路径，经 XposedInit.initZygote 以该字段下发。
     * 2. 遍历各集成模式框架的缓存目录，兼容多框架。
     * 3. 系统安装的模块 APK 路径 —— 普通Xposed模式
     */
    private fun findModulePath(context: Context): String {
        // 1. 通过 xposed 传递 modulePath
        XposedBridge.log("TAXP: 正在通过 Xposed 直接定位模块")
        modulePathFromZygote?.let { path ->
            if (File(path).exists()) {
                XposedBridge.log("TAXP: 通过 Xposed 直接定位成功: $path")
                return path
            }
            XposedBridge.log("TAXP: 通过 Xposed 直接定位失败，此路径下不存在: $path")
        }

        // 2. 通过直接定位缓存目录查找模块
        try {
            val cacheDir = File(context.dataDir, "cache")
            XposedBridge.log("TAXP: 正在通过集成模式定位模块")
            if (cacheDir.exists() && cacheDir.isDirectory) {
                cacheDir.listFiles()?.forEach { frameworkDir ->
                    val moduleDir = File(frameworkDir, MODULE_PACKAGE)
                    if (moduleDir.exists() && moduleDir.isDirectory) {
                        moduleDir.listFiles()?.forEach { file ->
                            if (file.name.endsWith(".apk")) {
                                XposedBridge.log("TAXP: 定位成功: ${file.absolutePath}")
                                return file.absolutePath
                            }
                        }
                    }
                }
            }
        } catch (e: Exception) {
            XposedBridge.log("TAXP: 集成模式定位失败")
            XposedBridge.log(android.util.Log.getStackTraceString(e))
        }

        // 3. 通过普通模式查找模块
        try {
            XposedBridge.log("TAXP: 正在通过应用模式定位模块")
            val pm = context.packageManager
            val packageInfo = pm.getPackageInfo(MODULE_PACKAGE, 0)
            val sourceDir = packageInfo.applicationInfo?.sourceDir
            if (!sourceDir.isNullOrEmpty() && File(sourceDir).exists()) {
                XposedBridge.log("TAXP: 定位成功 APK: $sourceDir")
                return sourceDir
            }
        } catch (e: Exception) {
            XposedBridge.log("TAXP: 应用模式定位失败")
            XposedBridge.log(android.util.Log.getStackTraceString(e))
        }
        throw RuntimeException("无法定位模块APK，集成与本地模式仅支持NAPTCH和LSPATCH，其他XPOSED实现暂未测试，运行失败")
    }

}
