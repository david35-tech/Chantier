@echo off
echo Lancement du serveur local...
echo.

REM Vérifie si Python est installé
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python n'est pas installe.
    echo Installe Python depuis https://www.python.org/downloads/
    pause
    exit /b
)

echo Serveur lance sur http://localhost:8000
start "" http://localhost:8000

python -m http.server 8000
