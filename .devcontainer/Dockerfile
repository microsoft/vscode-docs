FROM mcr.microsoft.com/vscode/devcontainers/base:0-debian-10

# Install Git LFS, add a locale
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get install -yq git-lfs \
    && git lfs install \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*
# Użycie obrazu bazowego z określonym tagiem wersji
FROM mcr.microsoft.com/vscode/devcontainers/base:0-debian-10

# Dodanie metadanych obrazu
LABEL maintainer="Thenomad123 <your-email@example.com>"
LABEL description="Devcontainer for VS Code with Git LFS support"
LABEL version="1.0.0"

# Instalacja Git LFS i czyszczenie niepotrzebnych plików
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get install -yq --no-install-recommends git-lfs \
    && git lfs install \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Dodaj inne polecenia, jeśli potrzebne
