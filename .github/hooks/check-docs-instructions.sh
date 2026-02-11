#!/bin/bash
# PostToolUse hook: remind agent to read docs-writing instructions after editing docs files.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Only act on file-editing tools
case "$TOOL_NAME" in
  editFiles|createFile|create_file|replace_string_in_file|multi_replace_string_in_file|edit_file|apply_patch|\
  copilot_replaceString|copilot_multiReplaceString|copilot_createFile|copilot_editFile)
    ;;
  *)
    echo '{"continue":true}'
    exit 0
    ;;
esac

# Extract file paths from tool input (handles both .path and .files[] and .filePath variants)
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')
FILE_PATHS=$(echo "$TOOL_INPUT" | jq -r '
  [.file_path, .filePath, .path, (.files[]? | if type == "object" then .path else . end)] |
  map(select(. != null and . != "")) | .[]
' 2>/dev/null)

# Check if any edited file is in the docs/ directory
DOCS_EDITED=false
for FILE in $FILE_PATHS; do
  if echo "$FILE" | grep -qE '(^|/)docs/'; then
    DOCS_EDITED=true
    break
  fi
done

if [ "$DOCS_EDITED" = "false" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Check transcript for evidence that the instructions file was read
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty')
INSTRUCTIONS_READ=false

if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
  if grep -q 'docs-writing.instructions.md' "$TRANSCRIPT_PATH" 2>/dev/null; then
    INSTRUCTIONS_READ=true
  fi
fi

if [ "$INSTRUCTIONS_READ" = "true" ]; then
  echo '{"continue":true}'
  exit 0
fi

# Agent edited docs without reading the instructions — inject a reminder
cat <<'EOF'
{
  "continue": true,
  "systemMessage": "Docs writing guidelines not loaded — verifying edit.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "You edited a file in docs/ without first reading the documentation writing guidelines. Please read .github/instructions/docs-writing.instructions.md now and verify your edit follows the style guide. Fix any issues."
  }
}
EOF
