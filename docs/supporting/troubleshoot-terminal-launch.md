---
Order:
TOCTitle: Troubleshoot Terminal Launch
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Troubleshoot Visual Studio Code Integrated Terminal launch failures
DateApproved: 6/10/2020
MetaDescription: Troubleshoot Visual Studio Code Integrated Terminal launch failures
---

# Troubleshoot Integrated Terminal launch failures

Follow these steps to diagnose issues:

1. If you're on Windows, check the Common issues on Windows section below first
2. Check your [settings](https://code.visualstudio.com/docs/getstarted/settings) for any `terminal.integrated` settings that could affect the launch. These settings in particular can cause a terminal to fail launching:
   ```
   terminal.integrated.automationShell
   terminal.integrated.cwd
   terminal.integrated.env.<platform>
   terminal.integrated.inheritEnv
   terminal.integrated.shell.<platform>
   terminal.integrated.shellArgs.<platform>
   terminal.integrated.splitCwd
   terminal.integrated.windowsEnableConpty
   ```
3. Enable [trace logging](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging) and capture a log when launching the terminal, this often reveals what is wrong as all arguments used to create the terminal process/pty are logged. Bad shell names, arguments or environment variables can cause the terminal to not launch. Keep this log for later if you problem isn't solved.

If none of these steps helped solve the issue you can do one of the following:

- Ask about it on [Stack Overflow](http://stackoverflow.com/), often launch issues are related to environment setup and not a problem with VS Code
- If the terminal is being launched from an extension, report the issue to the extension by opening the issue reporter (Help > Report Issue) and set File On = "An Extension"
- If you believe it to be a bug with VS Code, report the issue issue using the issue reporter (Help > Report Issue). This will autofill a lot of relevant information, see [Creating great terminal issues](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues) for what else to include in the report.
  - Note that if you're on Windows 1809 (build 17763) or below the issue is related to the legacy "winpty" backend, upgrading to Windows 1903 (build 18362) will move you onto the new "conpty" backend that is built by Microsoft and could fix your problem.



## Common issues on Windows

### The terminal exited with code 1 on Windows 10

This can happen if you run VS Code in compatibility mode, which may be turned on automatically if you have upgraded to Windows 10. You can change this by right-clicking the executable and selecting properties, then uncheck "Run this program in compatibility mode" in the compatibility tab.

### The terminal not working when running the 32-bit Windows client on 64-bit Windows?

The easy fix for this is to use the 64-bit version. If you must use the 32-bit version, you need to use the sysnative path when configuring your shell path instead of System32. Adding this setting should fix the issue:

```json
"terminal.integrated.shell.windows": "C:\\Windows\\Sysnative\\cmd.exe"
```

### Error "ConnectNamedPipe failed: Windows error 232"

This error can occur due to anti-virus software intercepting winpty from creating a pty. To workaround this error, you can exclude the following file from your anti-virus scanning:

```
<install_path>\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty.dll
<install_path>\resources\app\node_modules.asar.unpacked\node-pty\build\Release\winpty-agent.exe
<install_path>\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty.node
<install_path>\resources\app\node_modules.asar.unpacked\node-pty\build\Release\conpty_console_list.node
```

Reporting this issue to the Anti-virus team can also help stamp out the issue all together.

### Terminal exits with code 3221225786 (or similar)

This can happen when you have legacy console mode enabled in conhost's properties. To change this, open cmd.exe from the start menu, right-click the title bar, go to Properties and under the Options tab, uncheck Use legacy console.

TODO: conhost.png