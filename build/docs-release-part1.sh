#!/bin/bash
# Prepare a new VS Code release (Part 1)
# Usage: ./docs-release-part1.sh <version> <releaseDate> <commitHash>
#
# Example:
#   ./build/docs-release-part1.sh 1.114.0 2026-04-02 abc123...def

set -e

show_help() {
    cat << EOF
Usage: ./build/docs-release-part1.sh <version> <releaseDate> <commitHash>

Prepares a new VS Code Stable release by running the following steps:
  1. Create the release notes file from the endgame template
  2. Update the VS Code commit hash and version in templates
  3. Export and clean up default keybindings
  4. Generate the social media image for the release
  5. Update DateApproved metadata in documentation articles

Arguments:
  version         The full version string (e.g. 1.114.0)
  releaseDate     The release date in YYYY-MM-DD format (e.g. 2026-04-02)
  commitHash      The 40-character git commit hash from the VS Code build

Options:
  -h, --help      Show this help message

The commit hash and version can be found at:
  https://builds.code.visualstudio.com/builds/stable

Example:
  ./build/docs-release-part1.sh 1.114.0 2026-04-02 a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
EOF
}

# Check for help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Validate arguments
if [ "$#" -ne 3 ]; then
    echo "Error: Expected 3 arguments, got $#."
    echo "Usage: ./build/docs-release-part1.sh <version> <releaseDate> <commitHash>"
    echo "Run with --help for more information."
    exit 1
fi

VERSION="$1"
RELEASE_DATE="$2"
COMMIT_HASH="$3"

# Derive release number and milestone from version (e.g. 1.114.0 → 114)
RELEASE_NUMBER=$(echo "$VERSION" | cut -d. -f2)
MILESTONE="$VERSION"

# Determine the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== VS Code Release Preparation (Part 1) ==="
echo ""
echo "  Release number:  $RELEASE_NUMBER"
echo "  Release date:    $RELEASE_DATE"
echo "  Milestone:       $MILESTONE"
echo "  Commit hash:     $COMMIT_HASH"
echo "  Version:         $VERSION"
echo ""

# Step 1: Create release notes
echo "--- Step 1: Create release notes ---"
node "$SCRIPT_DIR/create-release-notes.js" "$RELEASE_NUMBER" "$RELEASE_DATE" "$MILESTONE"
echo ""

# Step 2: Update VS Code version in templates
echo "--- Step 2: Update VS Code version ---"
node "$SCRIPT_DIR/update-vscode-version.js" "$COMMIT_HASH" "$VERSION"
echo ""

# Step 3: Export default keybindings
echo "--- Step 3: Export default keybindings ---"
KEYBINDINGS_DIR="$SCRIPT_DIR/keybindings"
code-insiders --disable-extensions --export-default-keybindings "$KEYBINDINGS_DIR"
echo ""

# Step 4: Clean up keybindings
echo "--- Step 4: Clean up keybindings ---"
node "$SCRIPT_DIR/cleanup-keybindings.js"
echo ""

# Step 5: Generate social media image
echo "--- Step 5: Generate social media image ---"
bash "$SCRIPT_DIR/generate-social-image.sh" "1.$RELEASE_NUMBER"
echo ""

# Step 6: Update date metadata
echo "--- Step 6: Update date metadata ---"
node "$SCRIPT_DIR/update-dates.js" "1.$RELEASE_NUMBER" "$RELEASE_DATE"
echo ""

echo "=== Release preparation (Part 1) complete ==="
