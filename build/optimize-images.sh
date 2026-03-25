#!/bin/bash
# Convert PNG images to WebP and update markdown references
# Usage: ./optimize-images.sh <media-folder>

show_help() {
    cat << EOF
Usage: ./optimize-images.sh <media-folder>

Converts all PNG images in the specified folder to WebP format using ffmpeg,
then updates any markdown files that reference those images.

Arguments:
  media-folder    Path to the folder containing PNG files to convert
                  (e.g., release-notes/images/1_113)

Options:
  -h, --help      Show this help message

Example:
  ./optimize-images.sh release-notes/images/1_113

Note: Original PNG files are removed after successful conversion.
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
    echo "Usage: ./optimize-images.sh <media-folder>"
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

# Count PNG files
shopt -s nullglob
png_files=("$MEDIA_FOLDER"/*.png)
png_count=${#png_files[@]}
shopt -u nullglob

if [ "$png_count" -eq 0 ]; then
    echo "No PNG files found in $MEDIA_FOLDER"
    exit 0
fi

echo "Found $png_count PNG file(s) in $MEDIA_FOLDER"
echo "Converting to WebP..."
echo ""

# Process each PNG file
processed=0
failed=0
converted_files=()

for file in "$MEDIA_FOLDER"/*.png; do
    [ -e "$file" ] || continue

    filename=$(basename "$file")
    webp_file="${file%.png}.webp"

    echo "Processing: $filename"

    if ffmpeg -hide_banner -loglevel error -i "$file" "$webp_file" -y; then
        rm "$file"
        echo "  ✓ Converted: $filename → ${filename%.png}.webp"
        converted_files+=("$filename")
        processed=$((processed + 1))
    else
        echo "  ✗ Failed to convert $filename"
        rm -f "$webp_file"
        failed=$((failed + 1))
    fi

    echo ""
done

# Update markdown references
if [ "${#converted_files[@]}" -gt 0 ]; then
    echo "Updating markdown references..."

    # Determine the markdown folder to search based on the media folder path
    # e.g., release-notes/images/1_113 → release-notes/
    #        docs/copilot/images/ → docs/copilot/
    md_folder=$(echo "$MEDIA_FOLDER" | sed 's|/images/.*|/|')

    md_updated=0
    for png_name in "${converted_files[@]}"; do
        webp_name="${png_name%.png}.webp"
        # Find and update markdown files referencing this PNG
        grep -rl "$png_name" "$md_folder" --include="*.md" 2>/dev/null | while read -r md_file; do
            sed -i "s|$png_name|$webp_name|g" "$md_file"
            echo "  ✓ Updated reference in $md_file: $png_name → $webp_name"
            md_updated=$((md_updated + 1))
        done
    done

    echo ""
fi

# Summary
echo "Done!"
echo "Successfully converted: $processed file(s)"
if [ "$failed" -gt 0 ]; then
    echo "Failed: $failed file(s)"
    exit 1
fi
