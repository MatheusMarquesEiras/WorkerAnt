@echo off
set ACTION=%1

if "%ACTION%"=="" set ACTION=run

if "%ACTION%"=="dmk" (
    if not exist uploads mkdir uploads
    exit /b 0
)

if "%ACTION%"=="run" (
    pushd docker
    docker compose up -d
    popd
    exit /b 0
)

if "%ACTION%"=="run_dev" (
    pushd docker
    docker compose up -d
    popd
    python main.py
    exit /b 0
)

if "%ACTION%"=="clean" (
    pushd docker
    docker compose down
    popd
    exit /b 0
)

if "%ACTION%"=="rebuild" (
    pushd docker
    docker compose down
    docker compose up --build -d
    popd
    exit /b 0
)

if "%ACTION%"=="absc" (
    pushd docker
    docker compose down
    popd
    docker system prune -a --volumes
    exit /b 0
)

echo Uso: manage.bat [dmk ^| run ^| run_dev ^| clean ^| rebuild ^| absc]
exit /b 1
