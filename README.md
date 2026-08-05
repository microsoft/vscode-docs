#!/bin/bash

# ============================================
# VS Code Docs Repository Cloner with LFS Support
# ============================================

set -e

REPO_URL="https://github.com/microsoft/vscode-docs.git"
CLONE_DIR="vscode-docs"
LFS_FILES=("*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.pdf" "*.psd" "*.webp" "*.mp4" "*.mov")

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ==================== Functions ====================

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✔ $1${NC}"
}

print_error() {
    echo -e "${RED}✖ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

check_dependencies() {
    print_step "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed! Please install Git first."
        exit 1
    fi
    
    if ! command -v git-lfs &> /dev/null; then
        print_warning "Git LFS is not installed! Attempting automatic installation..."
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            sudo apt-get update -qq && sudo apt-get install git-lfs -y || {
                print_error "Failed to install Git LFS. Please install manually: https://git-lfs.com"
                exit 1
            }
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            brew install git-lfs || {
                print_error "Failed to install Git LFS. Please install manually: https://git-lfs.com"
                exit 1
            }
        else
            print_error "Unsupported OS. Please install Git LFS manually: https://git-lfs.com"
            exit 1
        fi
        git lfs install
        print_success "Git LFS installed and initialized."
    else
        print_success "Git LFS is available."
    fi
}

clone_repo() {
    print_step "Cloning repository (with LFS support)..."
    
    if [ -d "$CLONE_DIR" ]; then
        print_warning "Directory $CLONE_DIR already exists. Remove it? (y/n)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            rm -rf "$CLONE_DIR"
            print_success "Old directory removed."
        else
            print_warning "Using existing directory... (may cause conflicts)"
        fi
    fi
    
    GIT_LFS_SKIP_SMUDGE=0 git clone "$REPO_URL" "$CLONE_DIR" 2>&1 | while read line; do
        echo -e "${YELLOW}  $line${NC}"
    done
    
    if [ $? -eq 0 ]; then
        print_success "Repository cloned successfully!"
    else
        print_error "Failed to clone repository!"
        exit 1
    fi
}

setup_lfs_tracking() {
    print_step "Configuring LFS tracking..."
    cd "$CLONE_DIR"
    
    for pattern in "${LFS_FILES[@]}"; do
        git lfs track "$pattern" 2>/dev/null
    done
    
    git add .gitattributes 2>/dev/null || true
    print_success "Binary files are now tracked by LFS."
    cd ..
}

pull_lfs_files() {
    print_step "Pulling LFS files (may take a while)..."
    cd "$CLONE_DIR"
    
    if git lfs pull 2>&1 | while read line; do
        echo -e "${YELLOW}  $line${NC}"
    done; then
        print_success "All LFS files pulled successfully."
    else
        print_warning "Some LFS files failed to pull. You can retry with 'git lfs pull' later."
    fi
    cd ..
}

show_stats() {
    print_step "Repository statistics:"
    cd "$CLONE_DIR"
    
    echo -e "${GREEN}Total commits:${NC} $(git rev-list --all --count 2>/dev/null || echo 'N/A')"
    echo -e "${GREEN}Current branch:${NC} $(git branch --show-current 2>/dev/null || echo 'N/A')"
    echo -e "${GREEN}LFS objects size:${NC} $(du -sh .git/lfs/objects 2>/dev/null | cut -f1 || echo 'N/A')"
    echo -e "${GREEN}Total files:${NC} $(find . -type f -not -path './.git/*' | wc -l | tr -d ' ')"
    
    cd ..
}

create_readme() {
    cat > "$CLONE_DIR/README.local.md" << 'EOF'
# VS Code Docs - Local Clone

This repository was cloned using an automated script with full LFS support.

## Useful Commands:
- Update: `git pull`
- Pull LFS files: `git lfs pull`
- Official docs: https://code.visualstudio.com/docs

## How to Contribute:
1. Create a branch: `git checkout -b your-fix`
2. Make your changes
3. Commit: `git commit -m "Describe your changes"`
4. Push: `git push origin your-fix`
5. Open a Pull Request

## Troubleshooting:
- If LFS files are missing: `git lfs pull`
- If you get permission errors: Check your SSH/GitHub credentials
- For large downloads: Make sure you have enough disk space

Happy coding! 🚀
EOF
    print_success "README.local.md created."
}

check_disk_space() {
    print_step "Checking available disk space..."
    AVAILABLE=$(df -h . | awk 'NR==2 {print $4}')
    echo -e "${GREEN}Available space:${NC} $AVAILABLE"
    
    # Check if less than 2GB (warning)
    AVAILABLE_GB=$(df . | awk 'NR==2 {print $4}')
    if [ "$AVAILABLE_GB" -lt 2097152 ]; then
        print_warning "Low disk space! Repository needs at least 2GB free."
    fi
}

cleanup() {
    print_step "Cleaning up temporary files..."
    cd "$CLONE_DIR"
    git gc --auto 2>/dev/null || true
    cd ..
    print_success "Cleanup completed."
}

# ==================== Main Execution ====================

clear
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}   VS Code Docs Cloner v2.0 (Production Ready)${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

# Check disk space first
check_disk_space

# Step 1: Check dependencies
check_dependencies

# Step 2: Clone repository
clone_repo

# Step 3: Setup LFS
setup_lfs_tracking

# Step 4: Pull LFS files
pull_lfs_files

# Step 5: Show statistics
show_stats

# Step 6: Create helper README
create_readme

# Step 7: Cleanup
cleanup

echo ""
print_success "✅ All steps completed successfully!"
echo -e "${BLUE}Repository location: ${GREEN}$CLONE_DIR${NC}"
echo -e "${BLUE}Enter directory: ${YELLOW}cd $CLONE_DIR${NC}"
echo ""
echo -e "${GREEN}Now you can make any changes you want! 🎉${NC}"
