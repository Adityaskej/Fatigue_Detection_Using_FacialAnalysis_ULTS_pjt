@echo off
REM ========================================
REM FATIGUE DETECTION - CLEAN BUILD
REM ========================================
title Docker Build - Fatigue Detection

cd /d E:\fatigue_detection_facial_landmarks-main

REM === VERIFY FILES ===
if not exist "Dockerfile" (
    echo ❌ Dockerfile missing!
    pause
    exit /b 1
)
if not exist "requirements-lite.txt" (
    echo ❌ requirements-lite.txt missing!
    echo Create it manually with package names only!
    pause
    exit /b 1
)

REM === CLEAN ===
echo 🧹 Cleaning Docker...
docker system prune -f

REM === BUILD ===
echo ⏳ Building (2min)...
docker build --no-cache -t fatigue-detection .

if %errorlevel% equ 0 (
    echo ✅ SUCCESS!
    echo 🚀 Run: docker run -p 8501:8501 fatigue-detection
) else (
    echo ❌ Build failed!
)

pause
