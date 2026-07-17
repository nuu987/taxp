# TAXP

TvboxAuxiliary Xposed 版，以共享目标应用进程和资源的形式在后台运行一个 Node.js 运行时，无须部署（或者说无须 Docker），与应用共存活，简称 TAXP，或 **TvboxAuxiliary on-the-go！**

# 特性

- 使用 Xposed 技术劫持目标应用主进程，并插入自定义代码，运行 Node.js 运行时，并在 Node.js 项目就绪时返回主进程
- TA 将以嵌入式模式运行，部分功能表现与原版可能有所不同，例如定时同步等
- 最低支持安卓 7 (API24)，计划最低支持安卓 5 (API21)
- 支持 armeabi-v7a 和 arm64

# 用法
推荐使用 NPATCH 或 LSPATCH 以集成模式注入目标应用运行，并满足以下要求：  
1. 目标应用包名应为 `com.fongmi.android.tv`
   - NPATCH 可直接修改包名，LSPATCH 需手动外部处理
2. 最低安卓版本不低于安卓 7（当前暂不支持安卓 6，请以本页面说明为准），由于主流免 root 框架均不支持安卓 7，可使用我专为此项目适配的概念验证版 [LSPatch ver Nougat](https://github.com/nuu987/LSPatch-Ver-Nougat) 版在安卓 7 上运行此模块，需自动构建，暂不提供预编译 apk
3. 使用 NPATCH 或 LSPATCH 以集成模式将目标应用与本模块一同打包生成新应用 APK 安装并使用即可
   - 推荐开启**可调试**开关
- 不推荐使用 NPATCH 或 LSPATCH 的本地模式运行此模块
- 不推荐使用非 rootless Xposed 方案运行此模块

# todo
- [ ] 替换 Node.js JNI 库兼容更低版本
- [ ] 补充构建说明

# LICENSE
GNU General Public License v3 (GPL-3)