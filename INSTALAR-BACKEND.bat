@echo off
echo ========================================
echo   INSTALANDO BACKEND NEXTHIRE
echo ========================================
echo.

cd /d "%~dp0procv-backend"

echo [1/4] Limpando cache do npm...
call npm cache clean --force

echo.
echo [2/4] Instalando Express...
call npm install express

echo.
echo [3/4] Instalando CORS...
call npm install cors

echo.
echo [4/4] Instalando Dotenv...
call npm install dotenv

echo.
echo ========================================
echo   INSTALACAO CONCLUIDA!
echo ========================================
echo.
echo Agora execute: RODAR-BACKEND.bat
echo.
pause
