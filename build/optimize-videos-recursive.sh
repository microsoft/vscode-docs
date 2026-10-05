#!/usr/bin/env bash

set -u

show_help() {
    cat << EOF
Usage: $(basename "$0") <folder>

Recursively finds folders containing MP4 or GIF files and runs
optimize-videos.sh once for each folder.

Example:
  $(basename "$0") blogs
  $(basename "$0") docs
  $(basename "$0") release-notes
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
    show_help
    exit 0
fi

if [ -z "${1:-}" ]; then
    echo "Error: Missing folder argument." >&2
    show_help
    exit 1
fi

if [ ! -d "$1" ]; then
    echo "Error: Folder not found: $1" >&2
    exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_FOLDER="$(cd -- "$1" && pwd)"
OPTIMIZER="$SCRIPT_DIR/optimize-videos.sh"

if [ ! -f "$OPTIMIZER" ]; then
    echo "Error: Optimizer not found: $OPTIMIZER" >&2
    exit 1
fi

failed=0
processed_folders=0

while IFS= read -r -d '' folder; do
    shopt -s nullglob
    media_files=("$folder"/*.mp4 "$folder"/*.gif)
    shopt -u nullglob

    if [ "${#media_files[@]}" -eq 0 ]; then
        continue
    fi

    echo "Processing folder: $folder"
    if bash "$OPTIMIZER" "$folder" </dev/null; then
        processed_folders=$((processed_folders + 1))
    else
        echo "Failed to process: $folder" >&2
        failed=$((failed + 1))
    fi
done < <(find "$ROOT_FOLDER" -type d -print0)

echo "Processed $processed_folders folder(s)."

if [ "$failed" -gt 0 ]; then
    echo "Failed to process $failed folder(s)." >&2
    exit 1
fi

echo "All folders processed successfully."
