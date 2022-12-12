---
Order:
TOCTitle: Troubleshoot Terminal Launch
ContentId: c9dd7da5-2ad9-4862-bf24-2ed0fb65675e
PageTitle: Troubleshoot Visual Studio Code Integrated Terminal launch failures
DateApproved: 12/7/2022
MetaDescription: Troubleshoot Visual Studio Code Integrated Terminal launch failures
---

# Troubleshoot Terminal launch failures

To start, we'd like to say we're sorry that you're here reading this document instead of having a good time using the Integrated Terminal in Visual Studio Code. The VS Code team works hard to make the terminal experience as seamless as possible but in some cases, there are issues with shell or terminal configurations that the VS Code editor can't work around.

After having worked with hundreds of developers to diagnose their terminal launch failures, the VS Code team has put together this topic with the advice and troubleshooting tips that have helped people in the past. We hope you'll find an answer here for your shell or terminal issue and can get quickly back to work.

## Integrated Terminal user guide

If you are new to using the VS Code Integrated Terminal, you can learn more in the [Integrated Terminal](/docs/terminal/basics.md) user guide. There you can read how to [configure](/docs/terminal/profiles.md) the terminal, as well as review answers to [common questions](/docs/terminal/basics.md#common-questions).

Below are specific troubleshooting steps, if the user guide hasn't helped you diagnose the launch failure. The troubleshooting steps, such as checking your settings and enabling logging, apply to all platforms that support VS Code; macOS, Linux, and Windows.

> **Note**: If you're on Windows, you may want to review the [common issues on Windows](#common-issues-on-windows) section first.

## Troubleshooting steps

To troubleshoot Integrated Terminal launch failures in Visual Studio Code, follow these steps to diagnose issues:

1. **Check your user settings.** Review these `terminal.integrated` [settings](/docs/getstarted/settings.md) that could affect the launch:

   * `terminal.integrated.defaultProfile.{platform}` - The default shell profile that the terminal uses.
   * `terminal.integrated.profiles.{platform}` - The defined shell profiles. Sets the shell path and arguments.
   * `terminal.integrated.cwd` - The current working directory (cwd) for the shell process.
   * `terminal.integrated.env.{platform}` - Environment variables that will be added to the shell process.
   * `terminal.integrated.inheritEnv` - Whether new shells should inherit their environment from VS Code.
   * `terminal.integrated.automationProfile.{platform}` - Shell profile for automation-related terminal usage like tasks and debug.
   * `terminal.integrated.splitCwd` - Controls the current working directory a split terminal starts with.
   * `terminal.integrated.windowsEnableConpty` - Whether to use ConPTY for Windows terminal process communication.

   You can review settings in the Settings editor (**File** > **Preferences** > **Settings**) and search for specific settings by the setting ID.

   ![Search for Integrated terminal settings](images/troubleshoot-terminal-launch/search-for-settings.png)

   A quick way to check if you have changed settings that you might not be aware of, is to use the `@modified` filter in the Settings editor.

   ![Filter for modified settings](images/troubleshoot-terminal-launch/search-for-modified-settings.png)

   Most Integrated Terminal settings will need to be modified directly in your user `settings.json` JSON file. You can open `settings.json` via the **Edit in settings.json** link in the Settings editor or with the **Preferences: Open Settings (JSON)** command from the Command Palette (`kb(workbench.action.showCommands)`).

   ![A user's settings.json file](images/troubleshoot-terminal-launch/settings-json-file.png)

2. **Test your shell directly.** Try running your designated integrated terminal shell outside VS Code from an external terminal or command prompt. Some terminal launch failures may be due to your shell installation and are not specific to VS Code. The exit codes displayed come from the shell and you may be able to diagnose shell issues by searching on the internet for the specific shell and exit code.

3. **Use the most recent version of VS Code.** Each VS Code monthly release has many updates and fixes and may include integrated terminal improvements. You can check your VS Code version via **Help** > **About** (on macOS **Code** > **About Visual Studio Code**). To find the latest version of VS Code, go to the VS Code [release notes](/updates). You may also want to check that you have installed the latest version of your shell.

4. **Use the most recent version of your shell.** If your shell is installed separate from your platform, try installing the latest available version of the shell. The same advice applies if you are on an older build of your operating system. For example, some older versions of Windows 10 did not work well with the VS Code terminal.

5. **Enable trace logging.** You can enable [trace logging](https://github.com/microsoft/vscode/wiki/Terminal-Issues#enabling-trace-logging) and capture a log when launching the terminal. Logging often reveals what is wrong as all arguments used to create the terminal process/pty are recorded. Bad shell names, arguments, or environment variables can cause the terminal to not launch. Keep this log for later if your problem isn't solved.

## Additional troubleshooting steps

If none of these steps helped solve the issue, you can also try:

* Ask about it on [Stack Overflow](https://stackoverflow.com/), often launch issues are related to environment setup and not a problem with VS Code.
* If the terminal is being launched from an extension, report the issue to the extension by opening the issue reporter (Help > Report Issue) and set File On = "An Extension"
* If you believe it to be a bug with VS Code, report the issue using the issue reporter (**Help** > **Report Issue**). The issue reporter will autofill relevant information, see [Creating great terminal issues](https://github.com/microsoft/vscode/wiki/Terminal-Issues#creating-great-terminal-issues) for what else to include in the report.
* If you're on Windows 10 1809 (build 17763) or below, the issue is related to the legacy "winpty" backend. Upgrading to Windows 1903 (build 18362) will move you onto the new "conpty" backend that is built by Microsoft and could fix your problem.
* If your terminal is set to run as administrator only, and you are not launching VS Code as administrator, the terminal will not be able to open. You can either change the default terminal or edit the properties of the terminal exe to not run as administrator.

## Exit codes

The exit codes displayed in the terminal launch failure notification are returned from the shell process and are not generated by VS Code. There are many available shells that can be used in the terminal and hundreds of possible exit codes.

* Try searching on the internet for your specific shell and exit code (for example, "PowerShell 4294901760") and you may find specific suggestions or known issues related to your terminal launch failure.
* Try searching in your shell's issue repository. For example, if you are having trouble with WSL, you might find a workaround searching for your error code in the open or resolved issues at [https://github.com/microsoft/WSL/issues](https://github.com/microsoft/WSL/issues).

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
{
   "terminal.integrated.profiles.windows": {
      "Command Prompt": {
         "path": "${env:windir}\\Sysnative\\cmd.exe"
      }
   }
}
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

### Terminal exits with code 259

Exit code **259** can mean `STILL_ACTIVE` when the terminal is trying to start a new process such as PowerShell.exe. You can try killing unused programs and processes on your machine in case one of them is keeping a terminal shell process active and unable to relaunch.

Anti-virus software running on your machine may also interfere with starting your terminal shell.

### Terminal exits with code 3221225786 (or similar)

This can happen when you have legacy console mode enabled in conhost's properties. To change this, open cmd.exe from the start menu, right-click the title bar, go to **Properties** and under the **Options** tab, uncheck **Use legacy console**.

![Use legacy mode checkbox](images/troubleshoot-terminal-launch/legacy-console-mode.png)

## Next steps

* [Integrated Terminal user guide](/docs/terminal/basics.md) - Learn more about general terminal use and configuration.
