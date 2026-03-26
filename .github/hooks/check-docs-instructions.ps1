# PostToolUse hook: remind agent to read docs-writing instructions after editing docs files.

$Input = [Console]::In.ReadToEnd()
$json = $Input | ConvertFrom-Json
$toolName = $json.tool_name

$editTools = @(
    'editFiles','createFile','create_file','edit_file','apply_patch',
    'replace_string_in_file','multi_replace_string_in_file',
    'copilot_replaceString','copilot_multiReplaceString','copilot_createFile','copilot_editFile'
)

if ($toolName -notin $editTools) {
    Write-Output '{"continue":true}'
    exit 0
}

# Extract file paths from tool input
$paths = @()
if ($json.tool_input.file_path) { $paths += $json.tool_input.file_path }
if ($json.tool_input.filePath) { $paths += $json.tool_input.filePath }
if ($json.tool_input.path) { $paths += $json.tool_input.path }
if ($json.tool_input.files) {
    foreach ($f in $json.tool_input.files) {
        if ($f -is [string]) { $paths += $f }
        elseif ($f.path) { $paths += $f.path }
    }
}

# Check if any edited file is in the docs/ directory
$docsEdited = $false
foreach ($p in $paths) {
    if ($p -match '(^|[\\/])docs[\\/]') {
        $docsEdited = $true
        break
    }
}

if (-not $docsEdited) {
    Write-Output '{"continue":true}'
    exit 0
}

# Check transcript for evidence that the instructions file was read
$transcriptPath = $json.transcript_path
$instructionsRead = $false

if ($transcriptPath -and (Test-Path $transcriptPath)) {
    $content = Get-Content $transcriptPath -Raw -ErrorAction SilentlyContinue
    if ($content -and $content.Contains('docs-writing.instructions.md')) {
        $instructionsRead = $true
    }
}

if ($instructionsRead) {
    Write-Output '{"continue":true}'
    exit 0
}

# Agent edited docs without reading the instructions - inject a reminder
$result = @{
    continue = $true
    systemMessage = 'Docs writing guidelines not loaded - verifying edit.'
    hookSpecificOutput = @{
        hookEventName = 'PostToolUse'
        additionalContext = 'You edited a file in docs/ without first reading the documentation writing guidelines. Please read .github/instructions/docs-writing.instructions.md now and verify your edit follows the style guide. Fix any issues.'
    }
}
$result | ConvertTo-Json -Depth 5
