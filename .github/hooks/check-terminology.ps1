# PostToolUse hook: check for forbidden terminology in Markdown edits.

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

$content = $json.tool_input | ConvertTo-Json -Depth 10

# Check for forbidden terms
$violations = @()
if ($content -match '\bsimply\b') { $violations += "'simply'" }
if ($content -match '\bjust\b') { $violations += "'just'" }
if ($content -match '\bobviously\b') { $violations += "'obviously'" }
if ($content -match '\bbasically\b') { $violations += "'basically'" }
if ($content -match '\butilize\b') { $violations += "'utilize'" }
if ($content -match '\bleverage\b') { $violations += "'leverage'" }
if ($content -match '\bdelve\b') { $violations += "'delve'" }
if ($content -match '\bcrucial\b') { $violations += "'crucial'" }
if ($content -match '\bclick\b') { $violations += "'click' (use 'select')" }
if ($content -match '\beasy\b') { $violations += "'easy'" }

if ($violations.Count -eq 0) {
    Write-Output '{"continue":true}'
    exit 0
}

$violationStr = $violations -join ', '
$result = @{
    continue = $true
    systemMessage = 'Terminology check: forbidden words detected.'
    hookSpecificOutput = @{
        hookEventName = 'PostToolUse'
        additionalContext = "The edit contains forbidden terminology: $violationStr. Please revise the text to avoid these words. Refer to the writing style guidelines for alternatives."
    }
}
$result | ConvertTo-Json -Depth 5
