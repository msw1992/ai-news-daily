@echo off
chcp 65001 > nul
echo ========================================
echo    AI News Daily - Startup Script
echo ========================================
echo.

echo [1/2] Starting Backend Server (Real Crawler)...
cd server
start "AI News Server" cmd /k "node server.js"
cd ..

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Dev Server...
start "AI News Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo    Services are starting...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo    Mode: REAL CRAWLER (Live Data)
echo ========================================
echo.
pause
