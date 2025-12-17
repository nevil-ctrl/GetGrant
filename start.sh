#!/bin/bash
# GetGrant Project Docker Initialization Script

cd "$(dirname "$0")"

echo "========================================="
echo "GetGrant Project Setup & Launch"
echo "========================================="
echo ""

# Function to wait for container
wait_for_container() {
    local container=$1
    local max_attempts=60
    local attempt=0
    
    echo "Waiting for $container to be ready..."
    while [ $attempt -lt $max_attempts ]; do
        if docker ps --filter "name=$container" --format "{{.State}}" 2>/dev/null | grep -q "running"; then
            echo "✓ $container is ready"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo "✗ Timeout waiting for $container"
    return 1
}

# Build the app image if it doesn't exist
echo ""
echo "Building application image..."
if ! docker image inspect getgrant-app > /dev/null 2>&1; then
    docker build -t getgrant-app . || {
        echo "Failed to build image"
        exit 1
    }
else
    echo "✓ Image already exists"
fi

# Start the app container
echo ""
echo "Starting application container..."
docker run -d \
    --name getgrant_app \
    --network bridge \
    -p 8000:8000 \
    -v "$(pwd):/var/www/html" \
    -e DB_CONNECTION=pgsql \
    -e DB_HOST=getgrant_pg \
    -e DB_PORT=5432 \
    -e DB_DATABASE=getgrant_db \
    -e DB_USERNAME=getgrant_user \
    -e DB_PASSWORD=secret \
    -e REDIS_HOST=getgrant_redis \
    -e REDIS_PORT=6379 \
    --link getgrant_pg:postgres \
    --link getgrant_redis:redis \
    getgrant-app \
    sh -c "composer install && \
           php artisan key:generate && \
           php artisan migrate --force && \
           php artisan db:seed && \
           php artisan storage:link && \
           php artisan config:clear && \
           php artisan cache:clear && \
           php artisan serve --host=0.0.0.0 --port=8000" || {
    echo "Failed to start app container"
    exit 1
}

# Start the Node container
echo ""
echo "Starting Node.js container..."
docker run -d \
    --name getgrant_node \
    -p 5173:5173 \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    node:22 \
    sh -c "npm install && npm run build && npm run dev" || {
    echo "Failed to start Node container"
    exit 1
}

# Wait for services to be ready
echo ""
wait_for_container "getgrant_app" || exit 1
wait_for_container "getgrant_node" || exit 1

echo ""
echo "========================================="
echo "✓ Setup Complete!"
echo "========================================="
echo ""
echo "Application is running at:"
echo "  🌐 Web App:    http://localhost:8000"
echo "  ⚡ Vite Dev:   http://localhost:5173"
echo ""
echo "Database:"
echo "  🐘 PostgreSQL: localhost:5433"
echo "  User:          getgrant_user"
echo "  Password:      secret"
echo ""
echo "Cache & Queue:"
echo "  🔴 Redis:      localhost:6379"
echo ""
echo "View logs with:"
echo "  docker logs -f getgrant_app"
echo "  docker logs -f getgrant_node"
echo ""
echo "Stop all containers:"
echo "  docker stop getgrant_app getgrant_node getgrant_pg getgrant_redis"
echo ""
