"use strict";
// 切换工作目录到脚本所在目录，使 dotenv.config() 能正确读取 .env 文件
process.chdir(__dirname);
// 加载主程序
require("./server.js");
