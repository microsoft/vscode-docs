# PostToolUse hook: validate frontmatter fields after editing Markdown files.

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

# Determine content type from path
$contentType = $null
foreach ($p in $paths) {
    if ($p -match '\.md$') {
        if ($p -match '(^|[\\/])docs[\\/]') { $contentType = 'docs'; break }
        elseif ($p -match '(^|[\\/])api[\\/]') { $contentType = 'api'; break }
        elseif ($p -match '(^|[\\/])blogs[\\/]') { $contentType = 'blogs'; break }
        elseif ($p -match '(^|[\\/])release-notes[\\/]') { $contentType = 'release-notes'; break }
    }
}

if (-not $contentType) {
    Write-Output '{"continue":true}'
    exit 0
}

$toolInputStr = $json.tool_input | ConvertTo-Json -Depth 10

# Only flag if this looks like a file creation (contains frontmatter delimiters)
if ($toolInputStr -notmatch '---') {
    Write-Output '{"continue":true}'
    exit 0
}

$missing = @()

switch ($contentType) {
    { $_ -in 'docs','api' } {
        if ($toolInputStr -notmatch 'ContentId') { $missing += 'ContentId' }
        if ($toolInputStr -notmatch 'DateApproved') { $missing += 'DateApproved' }
        if ($toolInputStr -notmatch 'MetaDescription') { $missing += 'MetaDescription' }
    }
    'blogs' {
        if ($toolInputStr -notmatch 'Order') { $missing += 'Order' }
        if ($toolInputStr -notmatch 'TOCTitle') { $missing += 'TOCTitle' }
        if ($toolInputStr -notmatch 'PageTitle') { $missing += 'PageTitle' }
        if ($toolInputStr -notmatch 'MetaDescription') { $missing += 'MetaDescription' }
        if ($toolInputStr -notmatch '"Date"') { $missing += 'Date' }
        if ($toolInputStr -notmatch 'Author') { $missing += 'Author' }
    }
    'release-notes' {
        if ($toolInputStr -notmatch 'Order') { $missing += 'Order' }
        if ($toolInputStr -notmatch 'TOCTitle') { $missing += 'TOCTitle' }
        if ($toolInputStr -notmatch 'PageTitle') { $missing += 'PageTitle' }
        if ($toolInputStr -notmatch '"Date"') { $missing += 'Date' }
        if ($toolInputStr -notmatch 'DownloadVersion') { $missing += 'DownloadVersion' }
    }
}

if ($missing.Count -eq 0) {
    Write-Output '{"continue":true}'
    exit 0
}

$missingStr = $missing -join ', '
$result = @{
    continue = $true
    systemMessage = 'Frontmatter validation: missing fields detected.'
    hookSpecificOutput = @{
        hookEventName = 'PostToolUse'
        additionalContext = "The $contentType file is missing required frontmatter fields: $missingStr. Please add the missing fields."
    }
}
$result | ConvertTo-Json -Depth 5
