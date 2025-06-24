#!/bin/bash

# Build and start Transaction Manager containers
set -e

echo "Building Transaction Manager containers..."

# Check if podman is installed
if ! command -v podman &> /dev/null; then
    echo "ERROR: Podman is not installed. Please install Podman first."
    exit 1
fi

# Use podman-compose for simplicity
if command -v podman-compose &> /dev/null; then
    echo "Building and starting containers..."
    podman-compose up -d --build
    
    echo "Application started successfully!"
    echo "Frontend: http://localhost:4173"
    echo "Backend:  http://localhost:3002"
else
    echo "ERROR: podman-compose required. Install with: pip3 install podman-compose"
    exit 1
fi