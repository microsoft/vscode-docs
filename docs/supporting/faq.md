---
TOCTitle: FAQ
PageTitle: Visual Studio Code Frequently Asked Questions
DateApproved: 12/19/2015
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
---

# Visual Studio Code FAQ
Our docs contain a **Common Questions** section as needed for specific topics. We've captured items here that don't fit in the other topics.

If you don't see an answer to your question here, check our previously [reported issues](http://github.com/microsoft/vscode/issues) and our [Updates](/Updates) notes.

## How do I update to the latest version?
See [how to update](howtoupdate). You'll find downloads for Linux (32-bit and 64-bit) and OS X, and both an installer and download for Windows.

## Which OS's are supported
VS Code runs on Mac, Linux, and Windows. See [Requirements](requirements) for the supported versions.

## How do I opt out of VS Code auto-updates?
By default, VS Code is set up to auto-update for OS X and Windows users when we release new updates. (Auto-update of VS Code is not supported for Linux.) If you do not want to get automatic updates, take the following steps to modify the storage.json file used by VS Code. To modify storage.json, use a text editor other than VS Code, since VS Code modifies this file on shutdown.

If you opt out of auto-updates, your VS Code version will eventually be out of date with our docs, since we document only the latest version of VS Code.

### Windows
1. Close VS Code if it is still running.
2. Open a command prompt.
3. Type `cd %APPDATA%\code`
4. Type `notepad storage.json`
5. Replace `"updateChannel": "stable"` with `"updateChannel": "none"`
6. Save the file via `kbstyle(Ctrl+S)` and exit Notepad. You’re now opted out of auto-updates.

### OS X
1. Close VS Code if it is still running.
2. Start the Terminal app.
3. Type `cd ~/Library/"Application Support"/Code`
4. Type `vi storage.json`
5. Replace `"updateChannel": "stable"` with `"updateChannel": "none"`
6. Save the file via `kbstyle(Esc ZZ)`. You’re now opted out of auto-updates.

## Why does Visual Studio Code have a different license than the `vscode` GitHub repository?

Great question! Please see [issue #60](https://github.com/Microsoft/vscode/issues/60#issuecomment-161792005) for a detailed explanation.

## How can I test prerelease versions of VS Code?

Want get an early peek at new VS Code features?  You can try prerelease versions of VS Code by using the `insiders` update channel.  

>**Note:** You can always go back to latest release version of VS Code by switching back to the `stable` update channel.

To modify the update channel, go to `File | Preferences | User Settings` and add the `update.channel` setting with the value `"insiders"`.

```json
    "update.channel": "insiders"
```

## Windows - Trouble with the installer
Try using the [zip file](http://go.microsoft.com/fwlink/?LinkID=615207) instead of the installer.  To use this unzip VS Code in your `Program Files` folder.

>**Note:** When VS Code is installed via a Zip you will need to manually update it for each release.


## Windows - Icons are missing
I installed Visual Studio Code on my Windows 7 or 8 machine. Why are some icons not appearing in the workbench and editor?

VS Code uses [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) icons and we have found instances where the .SVG file extension is associated with something other than `image/svg+xml`. We're considering options to fix it, but for now here's a workaround:

Using the Command Prompt:

1. Open an Administrator Command Prompt.
2. Type `REG ADD HKCR\.svg /f /v "Content Type" /t REG_SZ /d image/svg+xml`.

Using the Registry Editor:

1. Start regedit.
2. Open the `HKEY_CLASSES_ROOT` key.
3. Find the `.svg` key.
4. Set its `Content Type` Data value to `image/svg+xml`.
5. Exit regedit.

## Windows 7 - Error when deleting files from Explorer

>**19 Dec 2015 | version 0.10.5**

When deleting a file from the VS Code Explorer on **Windows 7** using the 0.10.5 release, you may receive an error "Failed to move '*filename*' to the trash" which prompts you to "Delete Permanently", "Retry", or "Cancel".

By default, VS Code attempts to move the file to the Trash (Windows Recycle Bin). In the 0.10.5 release, there is an issue [3656](https://github.com/atom/electron/issues/3656) with the Electron Shell preventing this from working correctly.

You can choose to delete the file permanently or delete the file using the Windows Explorer or Command Prompt, which will properly move the file to the Windows Recycle Bin.

## OS X - VS Code fails to start OmniSharp
On OS X, VS Code can no longer start OmniSharp after updating VS Code.

To fix this issue, run these commands to update mono:

```
brew update
brew reinstall mono
```

## OS X - Mono and El Capitan
Mono stopped working in Visual Studio Code after I installed OS X 10.11 El Capitan Public Beta. What do I do?

Run these commands:

```
brew update
brew reinstall mono
```

## Linux - Azure VM Issues
I getting a "Running without the SUID sandbox" error?

Unfortunately, this is a known issue that we're still investigating.

## Linux - Debian and Moving Files to Trash
In case you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```
sudo apt-get install gvfs-bin
```

## Linux - error ENOSPC
When you see this error, it indicates that the VS Code file watcher is running out of handles. To increase the limit open `/etc/sysctl.conf` and add this line to the end of the file:

`fs.inotify.max_user_watches=16384`

## Linux - I can't see Chinese characters in Ubuntu
We're working on a fix. In the meantime, open the application menu, then choose `File`, `Preferences`, `User Settings`. Then set `editor.fontFamily` as shown:

`editor.fontFamily: "Droid Sans Mono, Droid Sans Fallback"`

## Proxy Server Support

If you work on a machine where internet traffic needs to go through a proxy server, then configure the proxy server in one of the following ways:

*	Set the operating system environment variables ‘http.proxy’ and ‘https.proxy’

```
    SET http_proxy=http://10.203.0.1:5187/
```

*	Configure the ‘http.proxy’ setting in your user settings (File > Preferences > User Settings)

```json
    “http.proxy”: “http://10.203.0.1:5187/”
```

Additionally, use `"http.proxyStrictSSL": false` if your proxy server uses a self-signed certificate.

>**Note:** VS Code supports http and https proxies, but not SOCKS proxies.

## VS Code gets unresponsive right after opening a folder
When you open a folder, VS Code will search for typical project files to offer you additional tooling (e.g. the solution picker in the status bar to open a solution).
If you open a folder with lots of files, the search can take a large amount of time and CPU resources during which VS Code might be slow to respond. We plan to improve
this in the future but for now you can exclude folders from the explorer via settings and they will not be searched for project files:
```
"files.exclude": {
	"**/largeFolder": true
}
```

## How to disable crash reporting

From File | Preferences | User Settings, add the following option to disable crash reporting:
```
"telemetry.enableCrashReporter": false
```
**Important Notice**: This option requires a restart of VS Code to take effect.

## How to disable telemetry reporting 
 
VS Code collects usage data and sends it to Microsoft to help improve our products and services.  Read our [privacy statement](http://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) to learn more. 
 
If you don’t wish to send usage data to Microsoft, please follow the instructions below to disable its collection. 
 
**Important Notice**: You will need to apply these changes after every update to disable collection of usage data.  These changes do not survive product updates. 
 
### Windows 
1. Close VS Code. 
2. Open the command prompt. 
3. Type `cd %ProgramFiles(x86)%\Visual Studio Code\resources\app`
4. Type `notepad product.json`
5. Replace `enableTelemetry=true` with `enableTelemetry=false`.
6. Save the file via `CTRL+S` and exit Notepad. Collection of usage data should now be disabled. 
 
### OS X / Linux 
> **TIP:** For Mac, editing `product.json` may prevent you from opening VS Code for the first time depending on your security settings. A workaround is to open VS Code at least once before editing the file.

1. Close VS Code. 
2. Open the terminal 
3. For: 
	- Mac Type `cd <PATH-TO-VSCode>/Visual\ Studio\ Code.app/Contents/Resources/app`
	- Linux Type `cd <PATH-TO-VSCode>/Resources/app`
4. Type `vi product.json`
5. Replace `enableTelemetry=true` with `enableTelemetry=false` 
6. Save the file via `Esc ZZ`. Collection of usage data should now be disabled. 
 
