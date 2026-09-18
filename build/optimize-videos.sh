#!/bin/bash
# Optimize MP4 videos and convert GIF animations to MP4 using ffmpeg
# Usage: ./optimize-videos.sh <media-folder>

show_help() {
    cat << EOF
Usage: ./optimize-videos.sh <media-folder>

Optimizes all MP4 videos in the specified folder and converts GIF animations
to MP4. Videos are encoded with:
  - libx264 codec
  - CRF 25 quality setting
  - Padding to ensure dimensions are divisible by 2
  - yuv420p pixel format for GIF conversions

Arguments:
  media-folder    Path to the folder containing MP4 and GIF files

Options:
  -h, --help      Show this help message

Example:
  ./optimize-videos.sh release-notes/images/1_110

Note: Optimized MP4 files overwrite the originals. Successfully converted GIF
files are removed, and matching Markdown images are replaced with video tags.
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

# Find MP4 and GIF files
shopt -s nullglob
mp4_files=("$MEDIA_FOLDER"/*.mp4)
gif_files=("$MEDIA_FOLDER"/*.gif)
mp4_count=${#mp4_files[@]}
gif_count=${#gif_files[@]}
shopt -u nullglob

if [ "$mp4_count" -eq 0 ] && [ "$gif_count" -eq 0 ]; then
    echo "No MP4 or GIF files found in $MEDIA_FOLDER"
    exit 0
fi

echo "Found $mp4_count MP4 file(s) in $MEDIA_FOLDER"
echo "Found $gif_count GIF file(s) in $MEDIA_FOLDER"
echo "Optimizing videos..."
echo ""

processed=0
failed=0
converted_gifs=()

# Optimize each MP4 file
for file in "${mp4_files[@]}"; do
    filename=$(basename "$file")
    temp_file="$MEDIA_FOLDER/.${filename%.mp4}.tmp.mp4"

    echo "Processing: $filename"

    # Run ffmpeg command with minimal output
    if ffmpeg -nostdin -hide_banner -loglevel error -i "$file" -vcodec libx264 -crf 25 \
        -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" "$temp_file" -y; then
        # Replace original with optimized version
        mv "$temp_file" "$file"
        echo "  ✓ Optimized: $filename"
        processed=$((processed + 1))
    else
        echo "  ✗ Failed to process $filename"
        rm -f "$temp_file"
        failed=$((failed + 1))
    fi

    echo ""
done

# Convert each GIF file to MP4
for file in "${gif_files[@]}"; do
    filename=$(basename "$file")
    mp4_file="${file%.gif}.mp4"
    mp4_name="${filename%.gif}.mp4"
    temp_file="$MEDIA_FOLDER/.${filename%.gif}.tmp.mp4"

    echo "Processing: $filename"

    if [ -e "$mp4_file" ]; then
        echo "  ✗ Failed to convert $filename: $mp4_name already exists"
        failed=$((failed + 1))
        echo ""
        continue
    fi

    if ffmpeg -nostdin -hide_banner -loglevel error -i "$file" -vcodec libx264 -crf 25 \
        -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -pix_fmt yuv420p "$temp_file" -y; then
        mv "$temp_file" "$mp4_file"
        rm "$file"
        echo "  ✓ Converted: $filename → $mp4_name"
        converted_gifs+=("$filename")
        processed=$((processed + 1))
    else
        echo "  ✗ Failed to convert $filename"
        rm -f "$temp_file"
        failed=$((failed + 1))
    fi

    echo ""
done

# Update Markdown references for converted GIF files
if [ "${#converted_gifs[@]}" -gt 0 ]; then
    echo "Updating Markdown references..."

    # Search the documentation folder that owns the media folder.
    # For example, release-notes/images/1_113 maps to release-notes/.
    md_folder=$(echo "$MEDIA_FOLDER" | sed 's|/images/.*|/|')

    for gif_name in "${converted_gifs[@]}"; do
        mp4_name="${gif_name%.gif}.mp4"
        grep -rlF --include="*.md" -- "$gif_name" "$md_folder" 2>/dev/null | while read -r md_file; do
            GIF_NAME="$gif_name" MP4_NAME="$mp4_name" perl -0pi.bak -e '
                s{!\[([^\]\n]*)\]\(([^)\n]*\Q$ENV{GIF_NAME}\E)(?:\s+["'\''][^"'\'']*["'\''])?\)}{
                    my ($title, $src) = ($1, $2);
                    $src =~ s/\Q$ENV{GIF_NAME}\E$/$ENV{MP4_NAME}/;
                    $title =~ s/^(?:Screenshot|Video)\s+(?:showing|of)\s+//i;
                    $title =~ s/\.\s*$//;
                    $title = $ENV{MP4_NAME} unless length $title;
                    $title =~ s/&/&amp;/g;
                    $title =~ s/"/&quot;/g;
                    $title =~ s/</&lt;/g;
                    $title =~ s/>/&gt;/g;
                    qq{<video src="$src" title="Video showing $title." autoplay loop controls muted></video>};
                }ge;
            ' "$md_file"

            if cmp -s "$md_file" "$md_file.bak"; then
                rm "$md_file.bak"
                echo "  ⚠ Found $gif_name in $md_file, but not in Markdown image syntax"
            else
                rm "$md_file.bak"
                echo "  ✓ Replaced $gif_name image in $md_file with a video tag"
            fi
        done
    done

    echo ""
fi

# Summary
echo "Done!"
echo "Successfully processed: $processed file(s)"
if [ "$failed" -gt 0 ]; then
    echo "Failed: $failed file(s)"
    exit 1
fi
