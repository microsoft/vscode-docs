#!/bin/bash
# Prepare a new VS Code Insiders release (Part 2)
# Usage: ./build/docs-release-part2.sh <version> <releaseDate>
#
# Example:
#   ./build/docs-release-part2.sh 1.115.0 2026-05-07

set -e

show_help() {
    cat << EOF
Usage: ./build/docs-release-part2.sh <version> <releaseDate>

Optimizes media content, creates Insiders release notes for the next version,
and updates date metadata in documentation articles.

Steps performed:
  1. Optimize PNG images in the release-notes media folder (convert to WebP)
  2. Optimize MP4 videos in the release-notes media folder
  3. Create Insiders release notes from the template
  4. Update DateApproved metadata in documentation articles

Arguments:
  version         The full version string (e.g. 1.115.0)
  releaseDate     The release date in YYYY-MM-DD format (e.g. 2026-05-07)

Options:
  -h, --help      Show this help message

Derived values:
  releaseNumber   Extracted from version (e.g. 1.115.0 → 115)
  mediaFolder     release-notes/images/1_<releaseNumber>
  milestone       v<version> (e.g. v1.115.0)
  lastUpdated     Today's date (for Insiders release notes)

Example:
  ./build/docs-release-part2.sh 1.115.0 2026-05-07
EOF
}

# Check for help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Validate arguments
if [ "$#" -ne 2 ]; then
    echo "Error: Expected 2 arguments, got $#."
    echo "Usage: ./build/docs-release-part2.sh <version> <releaseDate>"
    echo "Run with --help for more information."
    exit 1
fi

VERSION="$1"
RELEASE_DATE="$2"

# Validate version format (e.g. 1.115.0)
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: version must be in the format X.Y.Z (e.g. 1.115.0)."
    exit 1
fi

# Validate date format (YYYY-MM-DD)
if [[ ! "$RELEASE_DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Error: releaseDate must be in YYYY-MM-DD format (e.g. 2026-05-07)."
    exit 1
fi

# Derive values from version
RELEASE_NUMBER=$(echo "$VERSION" | cut -d. -f2)
MILESTONE="v$VERSION"
MAJOR_MINOR="1.$RELEASE_NUMBER"
MEDIA_FOLDER="release-notes/images/1_${RELEASE_NUMBER}"
LAST_UPDATED=$(date +%Y-%m-%d)

# Determine the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== VS Code Release Preparation (Part 2 — Insiders) ==="
echo ""
echo "  Version:         $VERSION"
echo "  Release number:  $RELEASE_NUMBER"
echo "  Release date:    $RELEASE_DATE"
echo "  Milestone:       $MILESTONE"
echo "  Media folder:    $MEDIA_FOLDER"
echo "  Last updated:    $LAST_UPDATED"
echo ""

cd "$ROOT_DIR"

# Step 1: Optimize images
echo "--- Step 1: Optimize images ---"
if [ -d "$MEDIA_FOLDER" ]; then
    bash "$SCRIPT_DIR/optimize-images.sh" "$MEDIA_FOLDER"
else
    echo "Skipping: Media folder not found ($MEDIA_FOLDER)"
fi
echo ""

# Step 2: Optimize videos
echo "--- Step 2: Optimize videos ---"
if [ -d "$MEDIA_FOLDER" ]; then
    bash "$SCRIPT_DIR/optimize-videos.sh" "$MEDIA_FOLDER"
else
    echo "Skipping: Media folder not found ($MEDIA_FOLDER)"
fi
echo ""

# Step 3: Create Insiders release notes
echo "--- Step 3: Create Insiders release notes ---"
node "$SCRIPT_DIR/create-release-notes.js" --insiders "$RELEASE_NUMBER" "$RELEASE_DATE" "$MILESTONE" "$LAST_UPDATED"
echo ""

# Step 4: Update date metadata
echo "--- Step 4: Update date metadata ---"
node "$SCRIPT_DIR/update-dates.js" "$MAJOR_MINOR" "$RELEASE_DATE"
echo ""

echo "=== Release preparation (Part 2) complete ==="
