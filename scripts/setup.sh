#!/bin/bash

set -e

echo "🚀 LifeMtrics Development Environment Setup"
echo "=========================================="

# Check if we're in the right directory
if [ ! -d "LifeMtrics-buildsetup" ]; then
    echo "❌ Error: LifeMtrics-buildsetup directory not found"
    echo "Please ensure you're in the vscode-docs repository root"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Enable corepack for Node version management
echo "🔧 Enabling corepack..."
corepack enable

# Navigate to the monorepo
echo "📂 Setting up LifeMtrics monorepo..."
cd LifeMtrics-buildsetup

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build packages in correct order
echo "🔨 Building shared packages..."
pnpm build

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Docker detected - you can use 'npm run dev' for containerized development"
else
    echo "⚠️  Docker not available - using local development mode"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   cd LifeMtrics-buildsetup && pnpm dev"
echo ""
echo "Or use containerized development:"
echo "   npm run dev"
echo ""
echo "📚 Available commands:"
echo "   pnpm dev          - Start all apps in development"
echo "   pnpm build        - Build all packages"
echo "   pnpm lint         - Run linting"
echo "   pnpm typecheck    - Run TypeScript checks"
echo "   pnpm test         - Run tests"
echo ""
echo "Happy coding! 🎉"