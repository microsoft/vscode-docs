---
TOCTitle: FAQ
ContentId: E02F97FD-842B-4D27-B461-37DD18B2582E
PageTitle: Visual Studio Code Frequently Asked Questions
DateApproved: 7/7/2016
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
---

# Visual Studio Code FAQ

Our docs contain a **Common Questions** section as needed for specific topics. We've captured items here that don't fit in the other topics.

If you don't see an answer to your question here, check our previously [reported issues](https://github.com/microsoft/vscode/issues) and our [Updates](/updates) notes.

## What is the difference between VS Code and VS Community?

Visual Studio Code is a streamlined code editor with support for development operations like debugging, task running and version control. It aims to provide just the tools a developer needs for a quick code-build-debug cycle and leaves more complex workflows to fuller featured IDEs. For more details about the goals of VS Code, see [Why VS Code](/docs/editor/whyvscode.md).

## Which OS's are supported?

VS Code runs on Mac, Linux, and Windows. See [Requirements](requirements) for the supported versions. You can find more platform specific details under [SETUP](/docs/setup/setup-overview.md).

## Is VS Code free?

Yes, VS Code is a free, [open source](https://github.com/microsoft/vscode) editor.

## How do I opt out of VS Code auto-updates?

By default, VS Code is set up to auto-update for OS X and Windows users when we release new updates. (Auto-update of VS Code is not supported for Linux.) If you do not want to get automatic updates, you can set the `update.channel` setting from the default `stable` to `none`.

To modify the update channel, go to **File** > **Preferences** > **User Settings** and add the `update.channel` setting with the value `"none"`.

```json
    "update.channel": "none"
```

You can install a previous release of VS Code by uninstalling your current version and then installing the download provided at the top of a specific release page under [Updates](/updates).

## Licensing

### Location

You can find the VS Code licenses, third party notices and [Chromium](https://www.chromium.org) Open Source credit list under your VS Code installation location `resources\app` folder. VS Code's `ThirdPartyNotices.txt`, Chromium's `Credits_*.html`, and VS Code's English language `LICENSE.txt` are available under `resources\app`. Localized versions of `LICENSE.txt` by Language ID are under `resources\app\licenses`.

### Why does Visual Studio Code have a different license than the vscode GitHub repository?

To learn why Visual Studio Code, the product, has a different license than vscode, the open source [GitHub repository](https://github.com/microsoft/vscode), see [issue #60](https://github.com/Microsoft/vscode/issues/60#issuecomment-161792005) for a detailed explanation.

## How can I test prerelease versions of VS Code?

Want get an early peek at new VS Code features?  You can try prerelease versions of VS Code by installing the "Insiders" build.  The Insiders build installs side by side to your stable VS Code install and has isolated settings, configurations and extensions.  The Insiders build is updated nightly so you'll get the latest bug fixes and feature updates from the day before.

To install the Insiders build, go to the Insiders [download page](/insiders).

## VS Code gets unresponsive right after opening a folder

When you open a folder, VS Code will search for typical project files to offer you additional tooling (e.g. the solution picker in the status bar to open a solution). If you open a folder with lots of files, the search can take a large amount of time and CPU resources during which VS Code might be slow to respond. We plan to improve this in the future but for now you can exclude folders from the explorer via settings and they will not be searched for project files:

```json
    "files.exclude": {
        "**/largeFolder": true
    }
```

## Missing `csharp-o` extension?

If you get an error at startup about a missing `csharp-o` extension, you can fix it by completely deleting its directory from the installation directory:

```
C:\Program Files (x86)\Microsoft VS Code\resources\app\extensions\csharp-o
```

## VS Code main window is blank?

The Electron shell used by Visual Studio Code has trouble with some GPU (graphics processing unit) hardware acceleration. If VS Code is displaying a blank (empty) main window, you can try disabling GPU acceleration when launching VS Code by adding the Electron `--disable-gpu` command line switch.

```bash
code --disable-gpu
```

## How to disable crash reporting

From **File** > **Preferences** > **User Settings**, add the following option to disable crash reporting:

```json
    "telemetry.enableCrashReporter": false
```

**Important Notice**: This option requires a restart of VS Code to take effect.

## How to disable telemetry reporting

VS Code collects usage data and sends it to Microsoft to help improve our products and services.  Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) to learn more.

If you don’t wish to send usage data to Microsoft, you can set the `telemetry.enableTelemetry` setting to `false`.

From **File** > **Preferences** > **User Settings**, add the following option to disable telemetry reporting:

```json
    "telemetry.enableTelemetry": false
```

>**Note:** VS Code gives you the option to install Microsoft and third party extensions.  These extensions may be collecting their own usage data and are not controlled by the `telemetry.enableTelemetry` setting.  Consult the specific extension’s documentation to learn about its telemetry reporting.

## Technical Support

You can ask questions and search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode), provide suggestions on [UserVoice](http://go.microsoft.com/fwlink/?LinkID=533482), and enter issues directly in our [GitHub repository](https://github.com/Microsoft/vscode/issues).

If you'd like to contact a professional support engineer, you can open a ticket with the [Microsoft assisted support team](https://support.microsoft.com/en-us/assistedsupportproducts).
