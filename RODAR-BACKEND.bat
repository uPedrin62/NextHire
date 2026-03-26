@echo off
echo ========================================
echo   INICIANDO BACKEND NEXTHIRE
echo ========================================
echo.
echo Verificando dependencias...
echo.

cd /d "%~dp0procv-backend"

REM Verificar se node_modules existe
if not exist "node_modules\" (
    echo Instalando dependencias pela primeira vez...
    call npm install
    echo.
)

echo Backend rodando em: http://localhost:4001
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
echo ========================================
echo.

node server.js

pause
