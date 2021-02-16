---
Order:
TOCTitle: Troubleshoot Terminal Launch
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Troubleshoot Visual Studio Code Integrated Terminal launch failures
DateApproved: 2/4/2021
MetaDescription: Troubleshoot Visual Studio Code Integrated Terminal launch failures
---

# Troubleshoot Terminal launch failures

If you are new to using the Visual Studio Code Integrated Terminal, you can learn more in the [Integrated Terminal](/docs/editor/integrated-terminal.md) user guide. There you can read how to [configure](/docs/editor/integrated-terminal.md#configuration) the terminal, as well as review answers to [common questions](/docs/editor/integrated-terminal.md#common-questions).

Below are specific troubleshooting steps, if the user guide hasn't helped you diagnose the launch failure. The troubleshooting steps, such as checking your settings and enabling logging, apply to all platforms that support VS Code; macOS, Linux, and Windows.

> **Note**: If you're on Windows, review the [common issues on Windows](#common-issues-on-windows) section first.

## Troubleshooting steps

To troubleshoot Integrated Terminal launch failures in Visual Studio Code, follow these steps to diagnose issues:

1. Check your [settings](/docs/getstarted/settings.md) for any of these settings that could affect the launch:

    ```json
    terminal.integrated.automationShell
    terminal.integrated.cwd
    terminal.integrated.env.{platform}
    terminal.integrated.inheritEnv
    terminal.integrated.shell.{platform}
    terminal.integrated.shellArgs.{platform}
    terminal.integrated.splitCwd
    terminal.integrated.windowsEnableConpty
    ```

   You can review settings in the Settings editor (**File** > **Preferences** > **Settings**) and search for specific settings by the setting ID.

   ![Search for Integrated terminal settings](images/troubleshoot-terminal-launch/search-for-settings.png)

   A quick way to check if you have changed settings that you might not be aware of, is to use the `@modified` filter in the Settings editor.

   ![Filter for modified settings](images/troubleshoot-terminal-launch/search-for-modified-settings.png)

   Most Integrated Terminal settings will need to be modified directly in your user `settings.json` JSON file. You can open `settings.json` via the **Edit in settings.json** link in the Settings editor or with the **Preferences: Open Settings (JSON)** command from the Command Palette (`kb(workbench.action.showCommands)`).

   ![A user's settings.json file](images/troubleshoot-terminal-launch/settings-json-file.png)

2. Enable [trace logging](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging) and capture a log when launching the terminal. Logging often reveals what is wrong as all arguments used to create the terminal process/pty are recorded. Bad shell names, arguments, or environment variables can cause the terminal to not launch. Keep this log for later if your problem isn't solved.

## Additional troubleshooting steps

If none of these steps helped solve the issue, you can also try:

* Ask about it on [Stack Overflow](https://stackoverflow.com/), often launch issues are related to environment setup and not a problem with VS Code.
* If the terminal is being launched from an extension, report the issue to the extension by opening the issue reporter (Help > Report Issue) and set File On = "An Extension"
* If you believe it to be a bug with VS Code, report the issue using the issue reporter (**Help** > **Report Issue**). The issue reporter will autofill relevant information, see [Creating great terminal issues](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues) for what else to include in the report.
* If you're on Windows 10 1809 (build 17763) or below, the issue is related to the legacy "winpty" backend. Upgrading to Windows 1903 (build 18362) will move you onto the new "conpty" backend that is built by Microsoft and could fix your problem.

## Common issues on Windows

### Make sure compatibility mode is disabled

When upgrading to Windows 10, some apps may have compatibility mode turned on automatically. When this happens with VS Code, the terminal breaks as it does some low level things to enable the emulation it uses. You can check and disable compatibility mode by right-clicking on the VS Code executable and selecting properties, then uncheck the **Run this program in compatibility mode** option in the compatibility tab.

### The terminal exited with code 1 on Windows 10 (with WSL as the default shell)

This can happen if Windows Subsystem for Linux (WSL) is not set up with a valid default Linux distribution.

**Note:** 'docker-desktop-data' is not a valid distribution.

* Open PowerShell and enter `wslconfig.exe /l` to confirm WSL is installed correctly and list the currently available Linux distributions within your system. Confirm a valid distribution has **(default)** next to it.
* To change the default distribution, enter `wslconfig.exe /setdefault "distributionNameAsShownInList"`

### The terminal not working when running the 32-bit Windows client on 64-bit Windows?

The easy fix for this issue is to use the 64-bit version. If you must use the 32-bit version, you need to use the sysnative path when configuring your shell path instead of System32. Adding this setting should fix the issue:

```json
"terminal.integrated.shell.windows": "C:\\Windows\\Sysnative\\cmd.exe"
```

### A native exception occurred

Typically this error occurs due to anti-virus software intercepting and blocking the winpty/conpty components from creating the terminal process. To work around this error, you can exclude the following file from your anti-virus scanning:

```
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty.dll
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty-agent.exe
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty.node
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty_console_list.node
```

Reporting this issue to the Anti-virus team can also help stamp out the issue all together.

### Terminal exits with code 3221225786 (or similar)

This can happen when you have legacy console mode enabled in conhost's properties. To change this, open cmd.exe from the start menu, right-click the title bar, go to **Properties** and under the **Options** tab, uncheck **Use legacy console**.

![Use legacy mode checkbox](images/troubleshoot-terminal-launch/legacy-console-mode.png)
