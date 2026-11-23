param(
    [Parameter(Mandatory = $true)][int]$WorkerId,
    [Parameter(Mandatory = $true)][int]$OwnerId,
    [Parameter(Mandatory = $true)][long]$CreatedAfter,
    [Parameter(Mandatory = $true)][long]$CreatedBefore
)

$ErrorActionPreference = 'Stop'
$deadline = [DateTime]::UtcNow.AddSeconds(8)
$known = @{}
$stopped = [System.Collections.Generic.List[int]]::new()
$errors = [System.Collections.Generic.List[string]]::new()

function Assert-Deadline {
    if ([DateTime]::UtcNow -ge $deadline) {
        throw 'Owned process-tree termination exceeded its eight-second deadline.'
    }
}

function Register-Process($candidate) {
    Assert-Deadline
    $process = Get-Process -Id $candidate.ProcessId -ErrorAction Stop
    $started = $process.StartTime.ToUniversalTime()
    # CIM timestamps have microsecond precision; retain the exact process handle and start time.
    if ([Math]::Abs(($started - $candidate.CreationDate.ToUniversalTime()).Ticks) -gt 10) {
        $process.Dispose()
        throw "PID $($candidate.ProcessId) changed identity during discovery."
    }
    $null = $process.Handle
    $key = "$($process.Id):$($started.Ticks)"
    if (-not $known.ContainsKey($key)) {
        $known[$key] = @{ Process = $process; Id = $process.Id; Started = $started; Key = $key; Visited = $false }
    } else {
        $process.Dispose()
    }
    return $known[$key]
}

function Find-Children($parent, [DateTime]$until) {
    Assert-Deadline
    $children = @(Get-CimInstance Win32_Process -Filter "ParentProcessId = $($parent.Id)" `
        -Property ProcessId, ParentProcessId, CreationDate -OperationTimeoutSec 2)
    foreach ($candidate in $children) {
        $created = $candidate.CreationDate.ToUniversalTime()
        if ($created -lt $parent.Started -or $created -gt $until) { continue }
        try {
            Register-Process $candidate
        } catch {
            $errors.Add($_.Exception.Message)
        }
    }
}

function Stop-OwnedProcess($entry) {
    if ($entry.Visited) { return }
    $entry.Visited = $true
    $children = @{}
    try {
        foreach ($child in @(Find-Children $entry ([DateTime]::MaxValue))) { $children[$child.Key] = $child }
    } catch {
        $errors.Add($_.Exception.Message)
    }
    try {
        Assert-Deadline
        $process = $entry.Process
        if (-not $process.HasExited) {
            $current = Get-Process -Id $entry.Id -ErrorAction Stop
            try {
                if ($current.StartTime.ToUniversalTime().Ticks -ne $entry.Started.Ticks) {
                    throw "PID $($entry.Id) changed identity before termination."
                }
                Stop-Process -Id $entry.Id -Force -ErrorAction Stop
            } finally {
                $current.Dispose()
            }
        }
        $remaining = [Math]::Max(1, [Math]::Min(2000, ($deadline - [DateTime]::UtcNow).TotalMilliseconds))
        if (-not $process.WaitForExit([int]$remaining)) {
            throw "Owned PID $($entry.Id) did not exit within its termination bound."
        }
        $stopped.Add($entry.Id)
        # Stop parents first, then include children born during discovery. The original handle's
        # exit time excludes children of a later process that reuses the same parent PID.
        foreach ($child in @(Find-Children $entry ($process.ExitTime.ToUniversalTime()))) { $children[$child.Key] = $child }
    } catch {
        $errors.Add($_.Exception.Message)
    } finally {
        foreach ($child in $children.Values) { Stop-OwnedProcess $child }
    }
}

try {
    Assert-Deadline
    $root = Get-CimInstance Win32_Process -Filter "ProcessId = $WorkerId" `
        -Property ProcessId, ParentProcessId, CreationDate -OperationTimeoutSec 2
    if (-not $root -or $root.ParentProcessId -ne $OwnerId) {
        throw "Owned worker PID $WorkerId is no longer observable under its original parent; descendants cannot be verified."
    }
    $birth = [DateTimeOffset]::new($root.CreationDate.ToUniversalTime()).ToUnixTimeMilliseconds()
    if ($birth -lt $CreatedAfter -or $birth -gt $CreatedBefore) {
        throw "Owned worker PID $WorkerId does not match its spawn identity."
    }
    Stop-OwnedProcess (Register-Process $root)
    foreach ($entry in $known.Values) {
        if (-not $entry.Process.HasExited) { $errors.Add("Owned PID $($entry.Id) is still running.") }
    }
} catch {
    $errors.Add($_.Exception.Message)
} finally {
    foreach ($entry in $known.Values) { $entry.Process.Dispose() }
}

@{ verified = ($errors.Count -eq 0); workerId = $WorkerId; stopped = @($stopped); errors = @($errors) } |
    ConvertTo-Json -Compress -Depth 4
if ($errors.Count) { exit 1 }
