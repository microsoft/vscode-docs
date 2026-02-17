FROM mcr.microsoft.com/devcontainers/typescript-node:22-bookworm

RUN git config --system codespaces-theme.hide-status 1

USER node
RUN npm install -g node-gyp

USER vscode
# Install Git LFS, add a locale
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get install -yq git-lfs \
    && git lfs install \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN npm install
