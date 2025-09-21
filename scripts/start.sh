#!/bin/bash

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$REPO_ROOT"

echo "🚀 LifeMtrics Development Environment"
echo "===================================="

# Check if setup has been run
if [ ! -d "LifeMtrics-buildsetup/node_modules" ]; then
    echo "📦 First time setup detected. Running setup..."
    ./scripts/setup.sh
fi

# Check if we should use Docker or local development
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Starting containerized development environment..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
else
    echo "💻 Starting local development environment..."
    cd LifeMtrics-buildsetup
    pnpm dev
fi