# LifeMtrics Development Makefile
# Use 'make <target>' to run common development tasks

.PHONY: setup start dev build clean help

# Default target
help:
	@echo "LifeMtrics Development Commands:"
	@echo ""
	@echo "Setup & Development:"
	@echo "  setup    - First-time setup (installs dependencies)"
	@echo "  start    - Start development environment (auto-setup)"
	@echo "  dev      - Start with Docker containers"
	@echo ""
	@echo "Building & Testing:"
	@echo "  build    - Build all Docker images"
	@echo "  clean    - Clean up containers and volumes"
	@echo ""
	@echo "Examples:"
	@echo "  make setup  # First time only"
	@echo "  make start  # Every day development"

# Setup target (first time)
setup:
	@echo "🚀 Setting up LifeMtrics development environment..."
	@./scripts/setup.sh

# Start development (every day)
start:
	@echo "🚀 Starting LifeMtrics development..."
	@./scripts/start.sh

# Docker development
dev:
	@echo "🐳 Starting Docker development environment..."
	@docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Build containers
build:
	@echo "🔨 Building Docker images..."
	@docker-compose build

# Clean up
clean:
	@echo "🧹 Cleaning up containers and volumes..."
	@docker-compose down -v --remove-orphans
	@docker system prune -f