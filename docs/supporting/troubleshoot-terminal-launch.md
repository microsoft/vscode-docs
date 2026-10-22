---
Order:
TOCTitle: Troubleshoot Terminal Launch
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Troubleshoot {% data variables.product.prodname_vscode %} terminal launch failures and unexpected exits
DateApproved: 09/28/2026
MetaDescription: Diagnose terminal launch failures and unexpected exits in {% data variables.product.prodname_vscode %}. Check shell profiles, working directories, and logs.
MetaSocialImage: ../terminal/images/basics/integrated-terminal.png
---

<a name="troubleshoot-terminal-launch-failures"></a>
<a id="_troubleshoot-terminal-launch-failures"></a>

# Troubleshoot terminal launch failures and unexpected exits

If your integrated terminal does not start or closes unexpectedly, use the error message to choose a troubleshooting path. This article helps you check the shell, its startup configuration, and the environment, then collect logs if the problem persists.

The **Open Help** action in {% data variables.product.prodname_vscode %} leads to this page for both launch failures and some later shell exits. Arriving here does not necessarily mean that the terminal failed to start.

## Identify the failure

Copy the complete error message, including the executable, directory, and code. Use the message and what happened before it, rather than the code alone.

| Error or symptom | Start here |
| --- | --- |
| `Path to shell executable ... does not exist` or the path is not a file. | [Check the shell profile](#check-settings-and-the-working-directory) and select an installed shell. |
| `Starting directory (cwd) ... does not exist` or is not a directory. | [Check the working directory](#check-settings-and-the-working-directory) named in the error. |
| `The terminal process ... failed to launch (exit code: ...)`. | The shell failed during startup or exited very early. [Test the shell directly](#test-the-shell-outside-the-editor), then isolate startup customization. |
| `The terminal process ... terminated with exit code: ...`. | The shell exited and might have started successfully. See [Terminal exited after starting](#terminal-exited-after-starting). |
| `A native exception occurred during launch`. | On Windows, see [native process creation failures](#a-native-exception-occurred). On other hosts, test the shell directly and [capture trace logs](#enable-trace-logging). |
| A terminal repeatedly restarts or closes before you can read its output. | [Isolate shell integration](#isolate-shell-integration) in a new terminal and capture trace logs. |
| WSL exits with code `1`. | [Check the WSL distribution](#wsl-exits-with-code-1). |

> [!NOTE]
> In a remote window, first identify where the failing shell runs. Check the executable, directory, settings, and shell startup files on that host. A working local shell does not rule out a problem in WSL, an SSH host, or a container.

<a name="launch-failures"></a>
<a id="_launch-failures"></a>

## Troubleshooting steps

Change one thing at a time and record the previous value so you can restore it after testing. Create a new terminal after changing launch settings.

### Try an installed shell

1. Open the dropdown next to **New Terminal** in the terminal panel and select another installed shell.
2. If that shell works, compare its profile with the failing one. Use **Terminal: Select Default Profile** if you want to change the default for new terminals.
3. Check that {% data variables.product.prodname_vscode_shortname %}, your shell, and your operating system are up to date and meet the [supported platform requirements](/docs/supporting/requirements.md).

For profile configuration, see [Terminal profiles](/docs/terminal/profiles.md).

### Check settings and the working directory

Open **Preferences: Open Settings (UI)** from the Command Palette (`kb(workbench.action.showCommands)`) and search for `@modified terminal.integrated`. Review the relevant User, Workspace, and Remote settings. Use **Preferences: Open User Settings (JSON)** to inspect profile definitions.

| Setting | What to check |
| --- | --- |
| `terminal.integrated.defaultProfile.<platform>` | The selected profile refers to an installed shell. |
| `terminal.integrated.profiles.<platform>` | The executable path exists, and its arguments are valid for that shell. |
| `terminal.integrated.cwd` | The starting directory exists, is a directory, and is accessible to your account. |
| `terminal.integrated.splitCwd` | A split terminal is not trying to reuse a directory that was moved or deleted. |
| `terminal.integrated.env.<platform>` | Overrides do not remove required environment variables or point `PATH` at an outdated installation. |
| `terminal.integrated.inheritEnv` | The shell receives the environment your setup requires. |
| `terminal.integrated.automationProfile.<platform>` | Tasks and debugging use the intended shell and arguments. |

Replace `<platform>` with `windows`, `linux`, or `osx`. For remote terminals, use the platform of the remote host.

The directory in the error is the one to investigate. It can come from the workspace, a terminal setting, a task, or an extension, not only `terminal.integrated.cwd`. If a task fails but a terminal opened from the panel works, inspect the task's `options.cwd`, `options.shell`, and environment in [tasks configuration](/docs/debugtest/tasks.md). For debugger or extension terminals, check that component's launch configuration.

If the message refers to an untrusted workspace, review [Workspace Trust](/docs/editing/workspaces/workspace-trust.md). Only trust a workspace when you trust its contents.

### Test the shell outside the editor

Run the same shell executable with the same arguments from an external terminal on the same host. If it also fails there, investigate the shell or operating system error first. If it works outside the editor, continue with startup customization and shell integration.

### Test without startup customization

Shell startup files can contain commands that fail or exit the shell. From an external terminal, try the appropriate command to reduce startup customization:

| Shell | Command |
| --- | --- |
| PowerShell 7 | `pwsh -NoProfile` |
| Windows PowerShell | `powershell.exe -NoProfile` |
| Bash | `bash --noprofile --norc` |
| Zsh | `zsh -f` |
| Windows Command Prompt | `cmd.exe /d` |

If this works, inspect your usual startup files for the failing command. Back them up before making changes rather than deleting them.

To repeat the test inside {% data variables.product.prodname_vscode_shortname %}, [create a temporary terminal profile](/docs/terminal/profiles.md#configuring-profiles) with the same executable and options in its `args` array. Select it from the terminal dropdown, then remove the diagnostic profile when you finish.

### Isolate shell integration

[Automatic shell integration](/docs/terminal/shell-integration.md#automatic-script-injection) changes startup arguments or environment variables for supported shells.

1. Record the current value of `terminal.integrated.shellIntegration.enabled`, then temporarily set it to `false` in the settings that apply to the failing terminal.
2. Create a new terminal. The change does not affect a shell that is already running.
3. If the terminal now works, compare your profile arguments and startup files with the shell integration documentation. Include this result in an issue report if you cannot resolve the conflict.
4. Restore the previous value after testing. Disabling integration removes features such as command tracking and working directory detection.

If you [manually installed shell integration](/docs/terminal/shell-integration.md#manual-installation) in a startup file, this setting does not remove that code. Back up the file and temporarily skip that integration command when isolating it.

## Exit codes

A process exit code reports how the shell or program ended. A native process-creation error, such as Windows error `5` or `267`, instead reports a failure to create the process. These codes have different meanings, even when their numbers match.

Search using the complete message, shell name, and operating system. An exit code alone is not a diagnosis.

### Terminal exited after starting

A shell can start successfully and later exit with a non-zero status. For example, an explicit `exit` command or a script that terminates the shell can produce an exit notification. This is different from a command failing while the shell remains open.

Check the last terminal output and the command that preceded the exit. If the shell exits only during startup, use the startup customization and integration tests above. If you did not expect the shell to close, capture logs rather than hiding the notification.

## Common issues on Windows

### Make sure compatibility mode is disabled

Compatibility mode can interfere with terminal process creation. Open **Properties** for the {% data variables.product.prodname_vscode_shortname %} executable, select the **Compatibility** tab, and clear **Run this program in compatibility mode** if it is selected.

<a name="the-terminal-exited-with-code-1-on-windows-10-with-wsl-as-the-default-shell"></a>
<a id="_the-terminal-exited-with-code-1-on-windows-10-with-wsl-as-the-default-shell"></a>

### WSL exits with code 1

Code `1` is not unique to a missing default distribution. Check WSL outside the editor from PowerShell or Command Prompt:

```powershell
wsl --status
wsl --list --verbose
```

Use an installed Linux distribution intended for interactive use, not a Docker-managed distribution such as `docker-desktop-data`. Test it with `wsl --distribution "<distribution-name>"`, replacing the placeholder with its listed name.

If WSL selects the wrong default, use `wsl --set-default "<distribution-name>"`. If your terminal profile explicitly specifies a distribution with `-d`, update that profile instead. See the [WSL command reference](https://learn.microsoft.com/windows/wsl/basic-commands) for details.

### A native exception occurred

Read the detail after `A native exception occurred during launch`. It does not identify antivirus software as the cause.

| Error detail | What to check |
| --- | --- |
| `Cannot launch conpty` | Check the supported Windows version and the ConPTY setting described below, then capture the Pty Host log. |
| `error code: 5` or access denied. | Check permissions for the shell executable and starting directory, and any security software block notifications. |
| `error code: 267` or invalid starting directory. | Check the actual directory named in the error, including task or extension overrides. |
| `error code: 1260` or a software restriction policy. | Review Windows Event Viewer with your administrator. Do not bypass the policy. |

Current releases use ConPTY on supported Windows versions. [WinPTY support was removed in version 1.109](https://code.visualstudio.com/updates/v1_109#_removal-of-winpty-support), so older instructions to switch to WinPTY no longer apply.

`terminal.integrated.windowsUseConptyDll` selects the ConPTY library shipped with {% data variables.product.prodname_vscode_shortname %} instead of the one supplied by Windows. It defaults to `true`. If you changed it, test with the default in a new terminal. If it is already `true`, enabling it again is not a diagnostic step. Setting it to `false` selects Windows' ConPTY library, not WinPTY.

If security software reports a block, share the exact detection with your administrator or security software vendor. Do not disable protection or add broad exclusions as a general workaround. If the shell executable is configured to always run as administrator, use a shell that can run with your normal account or ask your administrator to review that requirement.

### Terminal exits with code 259

This code alone does not identify which component failed. Test the same shell outside {% data variables.product.prodname_vscode_shortname %} and capture the complete message and Pty Host log. Avoid terminating unrelated processes based only on the code.

### Terminal exits with code 3221225786 (or similar)

The specific code `3221225786` is `0xC000013A`, or `STATUS_CONTROL_C_EXIT`. Windows defines it as [application termination by Ctrl+C](https://learn.microsoft.com/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55). It is not, by itself, proof of a launch failure or a legacy console configuration problem.

Check whether the process was interrupted or closed. Other, similar-looking codes can have different meanings, so record the exact value if you report the issue.

## Enable trace logging

Capture logs from a fresh reproduction, before changing more settings:

1. Run **Developer: Set Log Level...** from the Command Palette and set the log level to **Trace**.
2. Reproduce the failure by creating a terminal.
3. Run **Developer: Open Log...** and select **Terminal** for frontend logs. Repeat for **Pty Host**, which records shell process creation and communication. For a remote terminal, include the relevant remote log when available.
4. Save the relevant log content, then restore the previous log level.

> [!IMPORTANT]
> Logs can contain file paths, environment details, commands, and terminal output. Review them and remove secrets and sensitive information before sharing.

For additional capture options, see [terminal trace logging](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging).

## Additional troubleshooting steps

If the problem persists, use **Help** > **Report Issue** and include:

* The complete error message and the last terminal output.
* Your {% data variables.product.prodname_vscode_shortname %} version, operating system version, and shell executable and version.
* Whether the terminal runs locally, in WSL, over SSH, or in a container.
* Whether it was created from the terminal panel, a task, a debugger, or an extension.
* Whether the same shell works outside the editor, without startup customization, or with automatic shell integration disabled.
* Relevant profile settings and redacted Terminal and Pty Host logs.

If only an extension-created terminal fails, select that extension in the issue reporter. For more reporting guidance, see [Creating great terminal issues](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues).

<a name="integrated-terminal-user-guide"></a>
<a id="_integrated-terminal-user-guide"></a>

## Next steps

* [Terminal basics](/docs/terminal/basics.md): Learn how to create and manage terminals.
* [Remote development troubleshooting](/docs/remote/troubleshooting.md): Diagnose connection and remote environment problems.
