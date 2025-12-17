#!/usr/bin/env pwsh

Write-Host "Starting GetGrant project setup..."

# Function to wait for container to be ready
function Wait-ContainerReady {
    param(
        [string]$ContainerName,
        [int]$MaxWaitSeconds = 30
    )
    
    $elapsed = 0
    $interval = 2
    
    while ($elapsed -lt $MaxWaitSeconds) {
        $running = docker inspect -f '{{.State.Running}}' $ContainerName 2>$null
        
        if ($running -eq "true") {
            Write-Host "✓ Container $ContainerName is ready"
            return $true
        }
        
        $restarting = docker inspect -f '{{.State.Restarting}}' $ContainerName 2>$null
        if ($restarting -eq "true") {
            Write-Host "  Container $ContainerName is still restarting..."
        }
        
        Start-Sleep -Seconds $interval
        $elapsed += $interval
    }
    
    Write-Host "✗ Timeout waiting for container $ContainerName"
    return $false
}

# Wait for app container
Write-Host ""
Write-Host "Waiting for app container to be ready..."
if (-not (Wait-ContainerReady -ContainerName "getgrant_app" -MaxWaitSeconds 60)) {
    Write-Host "Error: App container failed to start"
    exit 1
}

# Wait for node container
Write-Host ""
Write-Host "Waiting for node container to be ready..."
if (-not (Wait-ContainerReady -ContainerName "getgrant_node" -MaxWaitSeconds 60)) {
    Write-Host "Error: Node container failed to start"
    exit 1
}

# Install composer dependencies
Write-Host ""
Write-Host "Installing PHP dependencies with Composer..."
docker exec getgrant_app composer install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Composer install had issues, continuing..."
}

# Install npm dependencies
Write-Host ""
Write-Host "Installing Node dependencies with npm..."
docker exec getgrant_node npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: npm install had issues, continuing..."
}

# Build frontend assets
Write-Host ""
Write-Host "Building frontend assets..."
docker exec getgrant_node npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: npm build had issues, but app may still work"
}

# Generate app key if not already done
Write-Host ""
Write-Host "Generating Laravel app key..."
docker exec getgrant_app php artisan key:generate 2>$null || Write-Host "  (Key may already exist)"

# Run migrations
Write-Host ""
Write-Host "Running database migrations..."
docker exec getgrant_app php artisan migrate --force 2>&1 | tail -10
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: Some migrations had issues"
}

# Seed database
Write-Host ""
Write-Host "Seeding database..."
docker exec getgrant_app php artisan db:seed 2>&1 | tail -10
if ($LASTEXITCODE -ne 0) {
    Write-Host "  (Database may already be seeded)"
}

# Create storage link
Write-Host ""
Write-Host "Creating storage link..."
docker exec getgrant_app php artisan storage:link 2>&1 | tail -5
if ($LASTEXITCODE -ne 0) {
    Write-Host "  (Storage link may already exist)"
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════"
Write-Host "✓ Setup complete!"
Write-Host "═══════════════════════════════════════════════════════"
Write-Host ""
Write-Host "Application is running at:"
Write-Host "  🌐 Web App: http://localhost:8000"
Write-Host "  ⚡ Vite Dev: http://localhost:5173"
Write-Host ""
Write-Host "Database:"
Write-Host "  🐘 PostgreSQL: localhost:5433"
Write-Host "  User: getgrant_user / Password: secret"
Write-Host ""
Write-Host "Redis:"
Write-Host "  🔴 Redis: localhost:6379"
Write-Host ""
Write-Host "View logs with:"
Write-Host "  docker compose logs -f app"
Write-Host "  docker compose logs -f node"
Write-Host ""
