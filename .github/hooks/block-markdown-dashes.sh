#!/bin/bash
# PreToolUse hook: block en dash/em dash in Markdown edits.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

case "$TOOL_NAME" in
  editFiles|createFile|create_file|edit_file|apply_patch|replace_string_in_file|multi_replace_string_in_file|\
  copilot_replaceString|copilot_multiReplaceString|copilot_createFile|copilot_editFile)
    ;;
  *)
    echo '{"continue":true}'
    exit 0
    ;;
esac

TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')

# Extract file paths from tool input (handles both .path and .files[] and .filePath variants)
FILE_PATHS=$(echo "$TOOL_INPUT" | jq -r '
  [.file_path, .filePath, .path, (.files[]? | if type == "object" then .path else . end)] |
  map(select(. != null and . != "")) | .[]
' 2>/dev/null)

# Extract paths from apply_patch input (*** Update|Add|Delete File:)
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

EM_DASH=$(printf '\xe2\x80\x94')
EN_DASH=$(printf '\xe2\x80\x93')

if echo "$TOOL_INPUT" | grep -q "$EM_DASH" || echo "$TOOL_INPUT" | grep -q "$EN_DASH"; then
  cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Markdown edits must not include en dash or em dash characters.",
    "additionalContext": "Avoid em-dashes and prefer commas or separate sentences to break up complex thoughts."
  }
}
EOF
  exit 0
fi

echo '{"continue":true}'
