@echo off
echo ========================================
echo   DIAGNOSTICO BACKEND NEXTHIRE
echo ========================================
echo.

cd /d "%~dp0procv-backend"

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale Node.js em: https://nodejs.org/
    pause
    exit /b 1
) else (
    node --version
    echo [OK] Node.js instalado
)
echo.

echo [2/5] Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
) else (
    npm --version
    echo [OK] npm instalado
)
echo.

echo [3/5] Verificando dependencias...
if not exist "node_modules\" (
    echo [AVISO] Dependencias nao instaladas
    echo Instalando agora...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependencias
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias instaladas
)
echo.

echo [4/5] Verificando arquivo .env...
if not exist ".env" (
    echo [ERRO] Arquivo .env nao encontrado!
    echo Crie o arquivo .env com:
    echo OPENAI_API_KEY=sua-chave-aqui
    echo PORT=4001
    pause
    exit /b 1
) else (
    echo [OK] Arquivo .env existe
)
echo.

echo [5/5] Verificando API Key...
findstr /C:"OPENAI_API_KEY=" .env >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] OPENAI_API_KEY nao configurada no .env
    pause
    exit /b 1
) else (
    echo [OK] API Key configurada
)
echo.

echo ========================================
echo   DIAGNOSTICO COMPLETO
echo ========================================
echo.
echo Tudo pronto! Pode executar RODAR-BACKEND.bat
echo.
pause
