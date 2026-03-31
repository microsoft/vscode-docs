#!/bin/bash
# Prepare a new VS Code Insiders release (Part 2)
# Usage: ./build/docs-release-part2.sh <version> <nextReleaseDate>
#
# Example:
#   ./build/docs-release-part2.sh 1.114.0 2026-05-07

set -e

show_help() {
    cat << EOF
Usage: ./build/docs-release-part2.sh <version> <nextReleaseDate>

Optimizes media content for the current release and creates Insiders release
notes for the next version.

Steps performed:
  1. Optimize PNG images in the release-notes media folder (convert to WebP)
  2. Optimize MP4 videos in the release-notes media folder
  3. Create Insiders release notes for the next version

Arguments:
  version         The current release version (e.g. 1.114.0)
  nextReleaseDate The next release date in YYYY-MM-DD format (e.g. 2026-05-07)

Options:
  -h, --help      Show this help message

Derived values:
  releaseNumber     Extracted from version (e.g. 1.114.0 → 114)
  mediaFolder       release-notes/images/1_<releaseNumber>
  nextReleaseNumber releaseNumber + 1 (e.g. 115)
  nextVersion       1.<nextReleaseNumber>.0 (e.g. 1.115.0)
  nextMilestone     v<nextVersion> (e.g. v1.115.0)
  lastUpdated       Today's date (for Insiders release notes)

Example:
  ./build/docs-release-part2.sh 1.114.0 2026-05-07
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
    echo "Usage: ./build/docs-release-part2.sh <version> <nextReleaseDate>"
    echo "Run with --help for more information."
    exit 1
fi

VERSION="$1"
NEXT_RELEASE_DATE="$2"

# Validate version format (e.g. 1.114.0)
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: version must be in the format X.Y.Z (e.g. 1.114.0)."
    exit 1
fi

# Validate date format (YYYY-MM-DD)
if [[ ! "$NEXT_RELEASE_DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    echo "Error: nextReleaseDate must be in YYYY-MM-DD format (e.g. 2026-05-07)."
    exit 1
fi

# Derive values from current version
RELEASE_NUMBER=$(echo "$VERSION" | cut -d. -f2)
MEDIA_FOLDER="release-notes/images/1_${RELEASE_NUMBER}"

# Calculate next version
NEXT_RELEASE_NUMBER=$((RELEASE_NUMBER + 1))
NEXT_VERSION="1.${NEXT_RELEASE_NUMBER}.0"
NEXT_MILESTONE="v$NEXT_VERSION"
LAST_UPDATED=$(date +%Y-%m-%d)

# Determine the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== VS Code Release Preparation (Part 2 — Insiders) ==="
echo ""
echo "  Current version:      $VERSION"
echo "  Release number:       $RELEASE_NUMBER"
echo "  Media folder:         $MEDIA_FOLDER"
echo ""
echo "  Next version:         $NEXT_VERSION"
echo "  Next release number:  $NEXT_RELEASE_NUMBER"
echo "  Next release date:    $NEXT_RELEASE_DATE"
echo "  Next milestone:       $NEXT_MILESTONE"
echo "  Last updated:         $LAST_UPDATED"
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
node "$SCRIPT_DIR/create-release-notes.js" --insiders "$NEXT_RELEASE_NUMBER" "$NEXT_RELEASE_DATE" "$NEXT_MILESTONE" "$LAST_UPDATED"
echo ""

echo "=== Release preparation (Part 2) complete ==="
