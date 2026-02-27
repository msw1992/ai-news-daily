#!/bin/bash

echo "========================================"
echo "   AI News Daily - Startup Script"
echo "========================================"
echo ""

echo "[1/2] Starting Backend Server..."
cd server
osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"' && node mockServer.js"'
cd ..

sleep 3

echo "[2/2] Starting Frontend Dev Server..."
osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"' && npm run dev"'

echo ""
echo "========================================"
echo "   Services are starting..."
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo "========================================"
