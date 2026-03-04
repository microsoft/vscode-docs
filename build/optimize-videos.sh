#!/bin/bash
# Optimize MP4 videos in a directory using ffmpeg
# Usage: ./optimize-videos.sh <media-folder>

show_help() {
    cat << EOF
Usage: ./optimize-videos.sh <media-folder>

Optimizes all MP4 videos in the specified folder by re-encoding them with:
  - libx264 codec
  - CRF 25 quality setting
  - Padding to ensure dimensions are divisible by 2

Arguments:
  media-folder    Path to the folder containing MP4 files to optimize

Options:
  -h, --help      Show this help message

Example:
  ./optimize-videos.sh release-notes/images/1_110

Note: This script will overwrite the original files. Make sure you have backups!
EOF
}

# Check for help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Check if folder argument is provided
if [ -z "$1" ]; then
    echo "Error: Missing media folder argument."
    echo "Usage: ./optimize-videos.sh <media-folder>"
    echo "Run with --help for more information."
    exit 1
fi

MEDIA_FOLDER="$1"

# Check if folder exists
if [ ! -d "$MEDIA_FOLDER" ]; then
    echo "Error: Folder not found: $MEDIA_FOLDER"
    exit 1
fi

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed or not in PATH."
    echo "Please install ffmpeg to use this script."
    exit 1
fi

# Count MP4 files
shopt -s nullglob
mp4_files=("$MEDIA_FOLDER"/*.mp4)
mp4_count=${#mp4_files[@]}
shopt -u nullglob

if [ "$mp4_count" -eq 0 ]; then
    echo "No MP4 files found in $MEDIA_FOLDER"
    exit 0
fi

echo "Found $mp4_count MP4 file(s) in $MEDIA_FOLDER"
echo "Optimizing videos..."
echo ""

# Change to the media folder
cd "$MEDIA_FOLDER"

# Process each MP4 file
processed=0
failed=0

for file in *.mp4; do
    # Skip if no files match (in case of empty directory)
    [ -e "$file" ] || continue
    
    echo "Processing: $file"
    
    # Create temporary output filename with timestamp to avoid conflicts
    temp_file=".${file%.mp4}.tmp.mp4"
    
    # Run ffmpeg command with minimal output
    if ffmpeg -hide_banner -loglevel error -i "${file}" -vcodec libx264 -crf 25 \
        -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" "${temp_file}" -y; then
        # Replace original with optimized version
        mv "${temp_file}" "${file}"
        echo "  ✓ Optimized: $file"
        processed=$((processed + 1))
    else
        echo "  ✗ Failed to process $file"
        rm -f "${temp_file}"
        failed=$((failed + 1))
    fi
    
    echo ""
done

# Summary
echo "Done!"
echo "Successfully processed: $processed file(s)"
if [ "$failed" -gt 0 ]; then
    echo "Failed: $failed file(s)"
    exit 1
fi
