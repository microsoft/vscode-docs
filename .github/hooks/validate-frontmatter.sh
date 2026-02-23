#!/bin/bash
# PostToolUse hook: validate frontmatter fields after editing Markdown files.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Only act on file-editing tools
case "$TOOL_NAME" in
  editFiles|createFile|create_file|edit_file|apply_patch|replace_string_in_file|multi_replace_string_in_file|\
  copilot_replaceString|copilot_multiReplaceString|copilot_createFile|copilot_editFile)
    ;;
  *)
    echo '{"continue":true}'
    exit 0
    ;;
esac

# Extract file paths from tool input
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')
FILE_PATHS=$(echo "$TOOL_INPUT" | jq -r '
  [.file_path, .filePath, .path, (.files[]? | if type == "object" then .path else . end)] |
  map(select(. != null and . != "")) | .[]
' 2>/dev/null)

# Extract paths from apply_patch input
if [ "$TOOL_NAME" = "apply_patch" ]; then
  PATCH_TEXT=$(echo "$TOOL_INPUT" | jq -r '.input // empty')
  PATCH_PATHS=$(printf '%s\n' "$PATCH_TEXT" | sed -nE 's/^\*\*\* (Update|Add|Delete) File: (.*)$/\2/p')
  if [ -n "$PATCH_PATHS" ]; then
    FILE_PATHS="$FILE_PATHS"$'\n'"$PATCH_PATHS"
  fi
fi

# Determine content type from path
CONTENT_TYPE=""
for FILE in $FILE_PATHS; do
  if echo "$FILE" | grep -qE '\.md$'; then
    if echo "$FILE" | grep -qE '(^|/)docs/'; then
      CONTENT_TYPE="docs"
    elif echo "$FILE" | grep -qE '(^|/)api/'; then
      CONTENT_TYPE="api"
    elif echo "$FILE" | grep -qE '(^|/)blogs/'; then
      CONTENT_TYPE="blogs"
    elif echo "$FILE" | grep -qE '(^|/)release-notes/'; then
      CONTENT_TYPE="release-notes"
    fi
    break
  fi
done

if [ -z "$CONTENT_TYPE" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Check tool input for frontmatter content
TOOL_INPUT_STR=$(echo "$INPUT" | jq -r '.tool_input | tostring')

MISSING=""

case "$CONTENT_TYPE" in
  docs|api)
    echo "$TOOL_INPUT_STR" | grep -q 'ContentId' || MISSING="$MISSING ContentId"
    echo "$TOOL_INPUT_STR" | grep -q 'DateApproved' || MISSING="$MISSING DateApproved"
    echo "$TOOL_INPUT_STR" | grep -q 'MetaDescription' || MISSING="$MISSING MetaDescription"
    ;;
  blogs)
    echo "$TOOL_INPUT_STR" | grep -q 'Order' || MISSING="$MISSING Order"
    echo "$TOOL_INPUT_STR" | grep -q 'TOCTitle' || MISSING="$MISSING TOCTitle"
    echo "$TOOL_INPUT_STR" | grep -q 'PageTitle' || MISSING="$MISSING PageTitle"
    echo "$TOOL_INPUT_STR" | grep -q 'MetaDescription' || MISSING="$MISSING MetaDescription"
    echo "$TOOL_INPUT_STR" | grep -q 'Date' || MISSING="$MISSING Date"
    echo "$TOOL_INPUT_STR" | grep -q 'Author' || MISSING="$MISSING Author"
    ;;
  release-notes)
    echo "$TOOL_INPUT_STR" | grep -q 'Order' || MISSING="$MISSING Order"
    echo "$TOOL_INPUT_STR" | grep -q 'TOCTitle' || MISSING="$MISSING TOCTitle"
    echo "$TOOL_INPUT_STR" | grep -q 'PageTitle' || MISSING="$MISSING PageTitle"
    echo "$TOOL_INPUT_STR" | grep -q 'Date' || MISSING="$MISSING Date"
    echo "$TOOL_INPUT_STR" | grep -q 'DownloadVersion' || MISSING="$MISSING DownloadVersion"
    ;;
esac

# Only flag if this looks like a file creation (contains frontmatter delimiters)
if ! echo "$TOOL_INPUT_STR" | grep -q '^\-\-\-'; then
  echo '{"continue":true}'
  exit 0
fi

if [ -n "$MISSING" ]; then
  MISSING=$(echo "$MISSING" | xargs)
  cat <<EOF
{
  "continue": true,
  "systemMessage": "Frontmatter validation: missing fields detected.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The $CONTENT_TYPE file is missing required frontmatter fields: $MISSING. Please add the missing fields."
  }
}
EOF
  exit 0
fi

echo '{"continue":true}'
