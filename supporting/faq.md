---
TOCTitle: FAQ
PageTitle: Visual Studio Code Frequently Asked Questions
DateApproved: 9/10/2015
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
---

# Visual Studio Code FAQ
Our docs contain a **Common Questions** section as needed for specific topics. We've captured items here that don't fit in the other topics.

If you don't see an answer to your question here, check our previously [reported issues](http://code.visualstudio.com/Issues) and our [Updates](http://code.visualstudio.com/Updates) notes.

## Why am I now prompted with an installation dialog?

We adopted a new installation and update framework for Windows based on [Inno Setup](http://www.jrsoftware.org/isinfo.php).
This fixes many Windows integration issues and streamlines the update story.  Inno Setup runs an installation wizard and places VS Code under Program Files by default which requires user account elevation.

## I saw two updates when I updated to VS Code 0.8.0.

On Windows, you will likely see a two stage update as a result of the change to the new [Inno Setup](http://www.jrsoftware.org/isinfo.php) installer.  The first update to version 0.7.20 bootstraps the new installer and then the second, installs the 0.8.0 release.  The new installer will prompt you during installation.  Continue through the setup dialog to install VS Code 0.8.0.

## 0.7.0 is not Working on Windows
**FIXED:** There is an issue with the 0.7.0 setup on Windows where VS Code will not properly load if you have non-ASCII characters in your installation path, normally your user name. This issue has been resolved in 0.7.10 for Windows. If you were affected by this bug please refer to the [how to update](/Docs/supporting/howtoupdate) documentation to download and install 0.7.10.

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


## Trouble with the Windows installer
Try using the [zip file](http://go.microsoft.com/fwlink/?LinkID=615207) instead of the installer.  To use this unzip VS Code in your `Program Files` folder.

>**Note:** When VS Code is installed via a Zip you will need to manually update it for each release.

## VS Code fails to start OmniSharp on OS X
On OS X, VS Code can no longer start OmniSharp after updating VS Code to 0.7.0.

To fix this issue, run these commands to update mono:

```
brew update
brew reinstall mono
```

## Windows 7 installation is failing
We're heard reports about failures to install on Windows 7. If you are willing to help us diagnose the issue, please contact us at [vscodefeedback@microsoft.com](mailto:vscodefeedback@microsoft.com).


## Icons are missing
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


## Linux Azure VM Issues
I getting a "Running without the SUID sandbox" error?

Unfortunately, this is a known issue that we're still investigating.

## Debian and Moving Files to Trash
In case you see an error when deleting files from the VS Code Explorer on the Debian operating system, it might be because the trash implementation that VS Code is using is not there.

Run these commands to solve this issue:

```
sudo apt-get install gvfs-bin
```

## Linux error ENOSPC
When you see this error happening, it indicates that VSCodes file watcher is running out of handles. To increase the limit open `/etc/sysctl.conf` and add this line to the end of the file:

`fs.inotify.max_user_watches=16384`

## I can't see Chinese characters in Ubuntu
We're working on a fix. In the meantime, open the application menu, then choose `File`, `Preferences`, `User Settings`. Then set `editor.fontFamily` as shown:

`editor.fontFamily: "Droid Sans Mono, Droid Sans Fallback"`


## Mono and El Capitan
Mono stopped working in Visual Studio Code after I installed OS X 10.11 El Capitan Public Beta. What do I do?

Run these commands:

```
brew update
brew reinstall mono
```
## How to disable crash reporting
From File | Preferences | User Settings, add the following option to disable crash reporting:
```
"telemetry.enableCrashReporter": false
```
**Important Notice**: This option requires a restart of VS Code to take effect.

## VS Code gets unresponsive right after opening a folder
When you open a folder, VS Code will search for typical project files to offer you additional tooling (e.g. the solution picker in the status bar to open a solution).
If you open a folder with lots of files, the search can take a large amount of time and CPU resources during which VS Code might be slow to respond. We plan to improve
this in the future but for now you can exclude folders from the explorer via settings and they will not be searched for project files:
```
"files.exclude": {
	"**/largeFolder": true
}
```