package com.rio.tvboxagg

/**
 * JNI bridge for Node.js runtime.
 *
 * The native library `libnative-lib.so` exports:
 * `Java_com_rio_tvboxagg_NodeBridge_startNodeWithArguments`
 *
 * This class declares the matching native method so that the JVM
 * can link it to the native implementation when the library is loaded.
 *
 * todo: 临时借用jni库，当前仅供适配运行，将在未来使用原版替代优化逻辑
 */
object NodeBridge {

    /**
     * Starts Node.js with the given arguments.
     *
     * Note: The native implementation may return null — Node.js stdout
     * is often written directly to logcat rather than captured as a return value.
     *
     * @param args Arguments array, e.g. ["node", "-e", "console.log(process.version)"]
     * @return The stdout output from Node.js, or null if not captured
     */
    @JvmStatic
    external fun startNodeWithArguments(args: Array<String>): String?
}
