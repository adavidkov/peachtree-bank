#!/bin/bash

echo "Cleaning up containers and images..."

# Stop all running containers
echo "Stopping all containers..."
podman stop $(podman ps -q) 2>/dev/null || echo "No running containers to stop"

# Remove all containers
echo "Removing all containers..."
podman rm $(podman ps -aq) 2>/dev/null || echo "No containers to remove"

# Remove all images
echo "Removing all images..."
podman rmi $(podman images -q) 2>/dev/null || echo "No images to remove"

# Clean up system (remove unused data)
echo "Cleaning up system..."
podman system prune -af

# Remove volumes
echo "Removing all volumes..."
podman volume prune -f

echo "Cleanup complete! Ready for fresh build."