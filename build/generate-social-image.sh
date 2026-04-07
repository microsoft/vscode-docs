#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <version>"
  echo "Example: $0 1.114"
  exit 1
fi

VERSION="$1"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATES="${REPO_ROOT}/templates/images"
VERSION_FOLDER="1_${VERSION#1.}"
OUTPUT_DIR="${REPO_ROOT}/release-notes/images/${VERSION_FOLDER}"

mkdir -p "${OUTPUT_DIR}"

magick -background none -fill white -font NimbusSans-Bold -pointsize 75 label:"v${VERSION}" text.png

magick text.png "${TEMPLATES}/gradient.png" -alpha off -compose copy_opacity -composite text_masked.png

magick "${TEMPLATES}/release-social-background.png" text_masked.png -geometry +675+432 -composite "${OUTPUT_DIR}/release-highlights.webp"

rm -f text.png text_masked.png

echo "Generated ${OUTPUT_DIR}/release-highlights.webp"
