@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo GetGrant Project Setup & Launch
echo ========================================
echo.

REM Check if docker is available
docker --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not installed or not in PATH
    pause
    exit /b 1
)

REM Get the directory where this script is located
cd /d "%~dp0"

echo Starting infrastructure containers...
docker inspect getgrant_pg >nul 2>&1
if errorlevel 1 (
    echo PostgreSQL container not found. Please start with: docker compose up -d
    pause
    exit /b 1
)

echo.
echo Building application image...
docker image inspect getgrant-app >nul 2>&1
if errorlevel 1 (
    docker build -t getgrant-app . || (
        echo Failed to build image
        pause
        exit /b 1
    )
) else (
    echo Application image already exists
)

echo.
echo Stopping old app containers...
docker stop getgrant_app 2>nul
docker rm getgrant_app 2>nul

echo.
echo Starting application container...
timeout /t 2 /nobreak >nul
docker run -d --name getgrant_app ^
    -p 8000:8000 ^
    -v "%CD%:/var/www/html" ^
    -e DB_CONNECTION=pgsql ^
    -e DB_HOST=host.docker.internal ^
    -e DB_PORT=5433 ^
    -e DB_DATABASE=getgrant_db ^
    -e DB_USERNAME=getgrant_user ^
    -e DB_PASSWORD=secret ^
    -e REDIS_HOST=host.docker.internal ^
    -e REDIS_PORT=6379 ^
    getgrant-app ^
    sh -c "composer install && php artisan key:generate && php artisan migrate --force && php artisan db:seed && php artisan storage:link && php artisan config:clear && php artisan cache:clear && php artisan serve --host=0.0.0.0 --port=8000"

echo.
echo Installing Node dependencies...
docker stop getgrant_node 2>nul
docker rm getgrant_node 2>nul

timeout /t 2 /nobreak >nul
docker run -d --name getgrant_node ^
    -p 5173:5173 ^
    -v "%CD%:/var/www/html" ^
    -w /var/www/html ^
    node:22 ^
    sh -c "npm install && npm run build && npm run dev"

echo.
echo ========================================
echo Waiting for services to start...
echo ========================================
echo.

REM Wait for app container
echo Waiting for Laravel app...
set /a count=0
:wait_app
if %count% geq 60 (
    echo Warning: App container took too long to start
    goto skip_app_wait
)
docker ps --filter "name=getgrant_app" --format "{{.State}}" 2>nul | findstr /i "running" >nul
if errorlevel 1 (
    timeout /t 1 /nobreak >nul
    set /a count=count+1
    goto wait_app
)
echo ✓ Laravel app is running

:skip_app_wait
echo.
echo ========================================
echo ✓ Setup Complete!
echo ========================================
echo.
echo Application URLs:
echo   🌐 Web App:    http://localhost:8000
echo   ⚡ Vite Dev:   http://localhost:5173
echo.
echo Database:
echo   🐘 PostgreSQL: localhost:5433
echo   User:          getgrant_user
echo   Password:      secret
echo.
echo Cache:
echo   🔴 Redis:      localhost:6379
echo.
echo Useful commands:
echo   docker logs -f getgrant_app       (View app logs)
echo   docker logs -f getgrant_node      (View Node logs)
echo   docker stop getgrant_app          (Stop app)
echo   docker compose down               (Stop all containers)
echo.
pause
