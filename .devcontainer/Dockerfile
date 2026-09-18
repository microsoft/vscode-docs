ARG VARIANT=24-trixie
FROM mcr.microsoft.com/devcontainers/javascript-node:4-${VARIANT}

# Set locale so Unicode characters render correctly in locale-aware tools (e.g. tmux).
ENV LANG=C.UTF-8

ARG NODE_MODULES="tslint-to-eslint-config typescript"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1
# Install Git LFS, add a locale
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get install -yq git-lfs \
    && git lfs install \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

