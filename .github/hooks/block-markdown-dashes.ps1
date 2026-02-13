# PreToolUse hook: block en dash/em dash in Markdown edits.

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

$toolInput = $json.tool_input | ConvertTo-Json -Depth 10

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

# Extract paths from apply_patch input
if ($toolName -eq 'apply_patch' -and $json.tool_input.input) {
    $patchText = $json.tool_input.input
    foreach ($line in $patchText -split "`n") {
        if ($line -match '^\*\*\* (?:Update|Add|Delete) File: (.*)$') {
            $paths += $Matches[1]
        }
    }
}

# Only apply to Markdown files
$mdEdited = $false
foreach ($p in $paths) {
    if ($p -match '\.md$') {
        $mdEdited = $true
        break
    }
}

if (-not $mdEdited) {
    Write-Output '{"continue":true}'
    exit 0
}

$emDash = [char]0x2014
$enDash = [char]0x2013

if ($toolInput.Contains($emDash) -or $toolInput.Contains($enDash)) {
    $result = @{
        hookSpecificOutput = @{
            hookEventName = 'PreToolUse'
            permissionDecision = 'deny'
            permissionDecisionReason = 'Markdown edits must not include en dash or em dash characters.'
            additionalContext = 'Avoid em-dashes and prefer commas or separate sentences to break up complex thoughts.'
        }
    }
    $result | ConvertTo-Json -Depth 5
    exit 0
}

Write-Output '{"continue":true}'
