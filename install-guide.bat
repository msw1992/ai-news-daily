@echo off
chcp 65001 > nul
echo ========================================
echo    每日AI资讯 - 安装与启动指南
echo ========================================
echo.
echo 检测到系统未安装 Node.js，请按以下步骤操作：
echo.
echo [步骤1] 安装 Node.js
echo   1. 访问 https://nodejs.org/
echo   2. 下载 LTS 版本 (推荐 18.x 或更高)
echo   3. 运行安装程序，一路下一步
echo   4. 安装完成后重启终端
echo.
echo [步骤2] 安装项目依赖
echo   打开终端，执行以下命令：
echo   cd D:\Trae\test3\ai-news-daily
echo   npm install
echo   cd server
echo   npm install
echo.
echo [步骤3] 启动项目
echo   方式一：双击 start.bat
echo   方式二：手动启动
echo     - 终端1: cd server ^&^& node mockServer.js
echo     - 终端2: npm run dev
echo.
echo [步骤4] 访问网站
echo   前端: http://localhost:3000
echo   后端: http://localhost:3001
echo.
echo ========================================
pause
