@echo off
title Readify AI Platform
color 0B
echo.
echo  ==========================================
echo     READIFY AI - STARTING...
echo  ==========================================
echo.

:: Kill any existing node processes on port 8000
echo  [1/3] Cleaning up old processes...
taskkill /f /im node.exe >nul 2>&1

:: Start Backend
echo  [2/3] Starting AI Backend on port 8000...
cd readify-backend
start "Readify Backend" /min cmd /k "node server.js"
cd ..

:: Wait for backend to be ready
echo  [3/3] Waiting for backend (5 sec)...
timeout /t 5 /nobreak >nul

:: Open dashboard in browser
echo  Opening Readify Dashboard...
start dashboard.html

echo.
echo  ==========================================
echo   Readify AI is RUNNING!
echo   Backend : http://localhost:8000
echo   Frontend: dashboard.html (opened above)
echo  ==========================================
echo.
echo  Close this window OR press any key to STOP.
pause >nul

:: Cleanup
taskkill /f /im node.exe >nul 2>&1
echo  Server stopped. Goodbye!
timeout /t 2 /nobreak >nul
