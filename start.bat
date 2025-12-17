#!/bin/bash
# Final Launch Script for GetGrant Project

cd "$(dirname "$0")"

echo "========================================="
echo "GetGrant Project - Final Launch"
echo "========================================="
echo ""

# Clean up old containers from manual runs
echo "Cleaning up old containers..."
docker rm -f getgrant_app_debug 2>/dev/null || true
docker rm -f getgrant_app 2>/dev/null || true
docker rm -f getgrant_node 2>/dev/null || true

echo "Starting Docker Compose..."
docker compose up -d --build

echo ""
echo "Waiting 15 seconds for services to initialize..."
sleep 15

echo ""
echo "Checking container status..."
docker ps --filter "name=getgrant" --format "table {{.Names}}\t{{.Status}}"

echo ""
echo "========================================="
echo "✓ GetGrant is running!"
echo "========================================="
echo ""
echo "Access the application:"
echo "  🌐 Web:  http://localhost:8000"
echo "  ⚡ Vite: http://localhost:5173"
echo ""
echo "View logs:"
echo "  docker compose logs -f app"
echo "  docker compose logs -f node"
echo ""
