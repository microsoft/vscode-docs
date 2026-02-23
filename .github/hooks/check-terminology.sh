#!/bin/bash
# PostToolUse hook: check for forbidden terminology in Markdown edits.

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

# Only apply to Markdown files
MD_EDITED=false
for FILE in $FILE_PATHS; do
  if echo "$FILE" | grep -qE '\.md$'; then
    MD_EDITED=true
    break
  fi
done

if [ "$MD_EDITED" = "false" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Extract the text content being written
CONTENT=$(echo "$INPUT" | jq -r '.tool_input | tostring')

# Check for forbidden terms (case-insensitive, word boundaries)
VIOLATIONS=""
if echo "$CONTENT" | grep -iqE '\bsimply\b'; then VIOLATIONS="$VIOLATIONS 'simply'"; fi
if echo "$CONTENT" | grep -iqE '\bjust\b'; then VIOLATIONS="$VIOLATIONS 'just'"; fi
if echo "$CONTENT" | grep -iqE '\bobviously\b'; then VIOLATIONS="$VIOLATIONS 'obviously'"; fi
if echo "$CONTENT" | grep -iqE '\bbasically\b'; then VIOLATIONS="$VIOLATIONS 'basically'"; fi
if echo "$CONTENT" | grep -iqE '\butilize\b'; then VIOLATIONS="$VIOLATIONS 'utilize'"; fi
if echo "$CONTENT" | grep -iqE '\bleverage\b'; then VIOLATIONS="$VIOLATIONS 'leverage'"; fi
if echo "$CONTENT" | grep -iqE '\bdelve\b'; then VIOLATIONS="$VIOLATIONS 'delve'"; fi
if echo "$CONTENT" | grep -iqE '\bcrucial\b'; then VIOLATIONS="$VIOLATIONS 'crucial'"; fi
if echo "$CONTENT" | grep -iqE '\bclick\b'; then VIOLATIONS="$VIOLATIONS 'click' (use 'select')"; fi
if echo "$CONTENT" | grep -iqE '\beasy\b'; then VIOLATIONS="$VIOLATIONS 'easy'"; fi

if [ -z "$VIOLATIONS" ]; then
  echo '{"continue":true}'
  exit 0
fi

VIOLATIONS=$(echo "$VIOLATIONS" | xargs)
cat <<EOF
{
  "continue": true,
  "systemMessage": "Terminology check: forbidden words detected.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The edit contains forbidden terminology: $VIOLATIONS. Please revise the text to avoid these words. Refer to the writing style guidelines for alternatives."
  }
}
EOF
