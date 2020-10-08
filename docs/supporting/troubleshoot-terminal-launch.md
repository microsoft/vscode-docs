---
Order:
TOCTitle: Troubleshoot Terminal Launch
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Troubleshoot Visual Studio Code Integrated Terminal launch failures
DateApproved: 10/8/2020
MetaDescription: Troubleshoot Visual Studio Code Integrated Terminal launch failures
---

# Troubleshoot Terminal launch failures

To troubleshoot Integrated Terminal launch failures in Visual Studio Code, follow these steps to diagnose issues:

1. If you're on Windows, review the [common issues on Windows](#common-issues-on-windows) section first.

2. Check your [settings](/docs/getstarted/settings.md) for any of these settings that could affect the launch:

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

3. Enable [trace logging](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging) and capture a log when launching the terminal. Logging often reveals what is wrong as all arguments used to create the terminal process/pty are recorded. Bad shell names, arguments, or environment variables can cause the terminal to not launch. Keep this log for later if your problem isn't solved.

## Additional troubleshooting steps

If none of these steps helped solve the issue, you can also try:

- Ask about it on [Stack Overflow](https://stackoverflow.com/), often launch issues are related to environment setup and not a problem with VS Code.
- If the terminal is being launched from an extension, report the issue to the extension by opening the issue reporter (Help > Report Issue) and set File On = "An Extension"
- If you believe it to be a bug with VS Code, report the issue using the issue reporter (Help > Report Issue). The issue reporter will autofill relevant information, see [Creating great terminal issues](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues) for what else to include in the report.
- If you're on Windows 10 1809 (build 17763) or below, the issue is related to the legacy "winpty" backend. Upgrading to Windows 1903 (build 18362) will move you onto the new "conpty" backend that is built by Microsoft and could fix your problem.

## Common issues on Windows

### The terminal exited with code 1 on Windows 10

This can happen if you run VS Code in compatibility mode, which may be turned on automatically if you have upgraded to Windows 10. You can change the mode by right-clicking the executable and selecting properties, then uncheck the **Run this program in compatibility mode** option in the compatibility tab.

### The terminal not working when running the 32-bit Windows client on 64-bit Windows?

The easy fix for this issue is to use the 64-bit version. If you must use the 32-bit version, you need to use the sysnative path when configuring your shell path instead of System32. Adding this setting should fix the issue:

```json
"terminal.integrated.shell.windows": "C:\\Windows\\Sysnative\\cmd.exe"
```

### Error "ConnectNamedPipe failed: Windows error 232"

This error can occur due to anti-virus software intercepting winpty from creating a pty. To work around this error, you can exclude the following file from your anti-virus scanning:

```
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty.dll
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty-agent.exe
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty.node
{install_path}\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty_console_list.node
```

Reporting this issue to the Anti-virus team can also help stamp out the issue all together.

### Terminal exits with code 3221225786 (or similar)

This can happen when you have legacy console mode enabled in conhost's properties. To change this, open cmd.exe from the start menu, right-click the title bar, go to Properties and under the Options tab, uncheck Use legacy console.

![](images/troubleshoot-terminal-launch/legacy-console-mode.png)
