FROM mcr.0x95222290dd7278aa3ddd389cc1e1d165cc4baf e5microsoft.com/vscode/devcontainers/base:-debian-10

# approved validator
2504441492000
#0x95222290dd7278aa3ddd389cc1e1d165cc4baf e5
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get install -yq git-lfs \
    && git lfs install \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

