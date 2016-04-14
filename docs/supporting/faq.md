---
TOCTitle: FAQ
ContentId: E02F97FD-842B-4D27-B461-37DD18B2582E
PageTitle: Visual Studio Code Frequently Asked Questions
DateApproved: 4/14/2016
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
---

# Visual Studio Code FAQ

Our docs contain a **Common Questions** section as needed for specific topics. We've captured items here that don't fit in the other topics.

If you don't see an answer to your question here, check our previously [reported issues](https://github.com/microsoft/vscode/issues) and our [Updates](/Updates) notes.

## What is the difference between VS Code and VS Community?

Visual Studio Code is a streamlined code editor with support for development operations like debugging, task running and version control. It aims to provide just the tools a developer needs for a quick code-build-debug cycle and leaves more complex workflows to fuller featured IDEs. For more details about the goals of VS Code, see [Why VS Code](/docs/editor/whyvscode.md).

## Which OS's are supported?

VS Code runs on Mac, Linux, and Windows. See [Requirements](requirements) for the supported versions.

## Is VS Code free?

Yes, VS Code is a free, [open source](https://github.com/microsoft/vscode) editor.

## How big is VS Code?

VS Code is a small download (< 100 MB) and has a disk footprint of less than 200 MB, so you can quickly install VS Code and try it out.

## How do I update to the latest version?

See [how to update](howtoupdate). You'll find downloads for Linux (32-bit and 64-bit) and OS X, and both an installer and download for Windows.

## How do I opt out of VS Code auto-updates?

By default, VS Code is set up to auto-update for OS X and Windows users when we release new updates. (Auto-update of VS Code is not supported for Linux.) If you do not want to get automatic updates, you can set the `update.channel` setting from the default `stable` to `none`.

To modify the update channel, go to **File** > **Preferences** > **User Settings** and add the `update.channel` setting with the value `"none"`.

```json
    "update.channel": "none"
```

You can install a previous release of VS Code by uninstalling your current version and then installing the download provided at the top of a specific release page under [Updates](/Updates).

## Licensing

### Location

You can find the VS Code licenses, third party notices and [Chromium](https://www.chromium.org) Open Source credit list under your VS Code installation location `resources\app` folder. VS Code's `ThirdPartyNotices.txt`, Chromium's `Credits_*.html`, and VS Code's English language `LICENSE.txt` are available under `resources\app`. Localized versions of `LICENSE.txt` by Language ID are under `resources\app\licenses`.

### Why does Visual Studio Code have a different license than the vscode GitHub repository?

To learn why Visual Studio Code, the product, has a different license than vscode, the open source [GitHub repository](https://github.com/microsoft/vscode), see [issue #60](https://github.com/Microsoft/vscode/issues/60#issuecomment-161792005) for a detailed explanation.

## How can I test prerelease versions of VS Code?

Want get an early peek at new VS Code features?  You can try prerelease versions of VS Code by installing the "Insiders" build.  The Insiders build installs side by side to your stable VS Code install and has isolated settings, configurations and extensions.  The Insiders build will automatically update when we release new builds, towards the end of each month or whenever there is new functionality we'd like to get into the hands of developers early.

To install the Insiders build, go to the Insiders [download page](/Download#insiders).

## Windows FAQ

### Trouble with the installer

Try using the [zip file](https://go.microsoft.com/fwlink/?LinkID=615207) instead of the installer.  To use this, unzip VS Code in your **Program Files** folder.

>**Note:** When VS Code is installed via a Zip you will need to manually update it for each release.

### Icons are missing

I installed Visual Studio Code on my Windows 7 or 8 machine. Why are some icons not appearing in the workbench and editor?

VS Code uses [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) icons and we have found instances where the .SVG file extension is associated with something other than `image/svg+xml`. We're considering options to fix it, but for now here's a workaround:

Using the Command Prompt:

1. Open an Administrator Command Prompt.
2. Type `REG ADD HKCR\.svg /f /v "Content Type" /t REG_SZ /d image/svg+xml`.

Using the Registry Editor:

1. Start regedit.
2. Open the `HKEY_CLASSES_ROOT` key.
3. Find the `.svg` key.
4. Set its `Content Type` Data value to `image/svg+xml`.
5. Exit regedit.

### Windows 7 - Error when deleting files from Explorer

>**19 Dec 2015 | version 0.10.5**

When deleting a file from the VS Code Explorer on **Windows 7** using the 0.10.5 release, you may receive an error "Failed to move '*filename*' to the trash" which prompts you to "Delete Permanently", "Retry", or "Cancel".

By default, VS Code attempts to move the file to the Trash (Windows Recycle Bin). In the 0.10.5 release, there is an issue [3656](https://github.com/atom/electron/issues/3656) with the Electron Shell preventing this from working correctly.

You can choose to delete the file permanently or delete the file using the Windows Explorer or Command Prompt, which will properly move the file to the Windows Recycle Bin.

## OS X FAQ

### VS Code fails to start OmniSharp

On OS X, VS Code can no longer start OmniSharp after updating VS Code.

To fix this issue, run these commands to update mono:

```bash
brew update
brew reinstall mono
```

### Mono and El Capitan

Mono stopped working in Visual Studio Code after I installed OS X 10.11 El Capitan Public Beta. What do I do?

Run these commands:

```bash
brew update
brew reinstall mono
```

## Linux FAQ

### Azure VM Issues

I'm getting a "Running without the SUID sandbox" error?

Unfortunately, this is a known issue that we're still investigating.

### Debian and Moving Files to Trash

If you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```bash
sudo apt-get install gvfs-bin
```

### error ENOSPC

When you see this error, it indicates that the VS Code file watcher is running out of handles. The current limit can be viewed by running:

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

The limit can be increased to its maximum by editing `/etc/sysctl.conf` and adding this line to the end of the file:

```
fs.inotify.max_user_watches=524288
```

The new value can then be loaded in by running `sudo sysctl -p`. Note that [Arch Linux](https://www.archlinux.org/) works a little differently, [view this page for advice](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers).

While 524288 is the maximum number of files that can be watched, if you're in an environment that is particularly memory constrained, you may wish to lower the number. Each file watch [takes up 540 bytes (32-bit) or ~1kB (64-bit)](http://stackoverflow.com/a/7091897/1156119), so assuming that all 524288 watches are consumed that results in an upperbound of around 256MB (32-bit) or 512MB (64-bit).

### I can't see Chinese characters in Ubuntu

We're working on a fix. In the meantime, open the application menu, then choose **File** > **Preferences** > **User Settings**. Then set `editor.fontFamily` as shown:

```json
    "editor.fontFamily": "Droid Sans Mono, Droid Sans Fallback"
```

## Proxy Server Support

If you work on a machine where Internet traffic needs to go through a proxy server, then configure the proxy server in one of the following ways:

* Set the operating system environment variables ‘http.proxy’ and ‘https.proxy’

```bash
    SET http_proxy=http://10.203.0.1:5187/
```

* Configure the ‘http.proxy’ setting in your user settings (**File** > **Preferences** > **User Settings**)

```json
    "http.proxy": "http://10.203.0.1:5187/"
```

Additionally, use `"http.proxyStrictSSL": false` if your proxy server uses a self-signed certificate.

>**Note:** VS Code supports http and https proxies, but not SOCKS proxies.

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
