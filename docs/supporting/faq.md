---
TOCTitle: FAQ
PageTitle: Visual Studio Code Frequently Asked Questions
DateApproved: 10/12/2015
MetaDescription: Our docs contain a Common Questions section. Here are items that don't fit in the other topics.
---

# Visual Studio Code FAQ
Our docs contain a **Common Questions** section as needed for specific topics. We've captured items here that don't fit in the other topics.

If you don't see an answer to your question here, check our previously [reported issues](http://code.visualstudio.com/Issues) and our [Updates](http://code.visualstudio.com/Updates) notes.

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

## How can I test prerelease versions of VS Code?

Want get an early peek at new VS Code features?  You can try prerelease versions of VS Code by using the `insiders` update channel.  

>**Note:** You can always go back to latest release version of VS Code by switching back to the `stable` update channel.

Do the following steps to modify the storage.json file used by VS Code. To modify storage.json, use a text editor other than VS Code, since VS Code modifies this file on shutdown.

### Windows
1. Close VS Code if it is still running.
2. Open a command prompt.
3. Type `cd %APPDATA%\code`
4. Type `notepad storage.json`
5. Replace `"updateChannel": "stable"` with `"updateChannel": "insiders"`
6. Save the file via `kbstyle(Ctrl+S)` and exit Notepad. You will now get insiders updates as they are available.

### OS X
1. Close VS Code if it is still running.
2. Start the Terminal app.
3. Type `cd ~/Library/"Application Support"/Code`
4. Type `vi storage.json`
5. Replace `"updateChannel": "stable"` with `"updateChannel": "insiders"`
6. Save the file via `kbstyle(Esc ZZ)`. You’re now get insiders updates as they are available.

## How to disable crash reporting
From File | Preferences | User Settings, add the following option to disable crash reporting:
```
"telemetry.enableCrashReporter": false
```
**Important Notice**: This option requires a restart of VS Code to take effect.
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

## VS Code gets unresponsive right after opening a folder
When you open a folder, VS Code will search for typical project files to offer you additional tooling (e.g. the solution picker in the status bar to open a solution).
If you open a folder with lots of files, the search can take a large amount of time and CPU resources during which VS Code might be slow to respond. We plan to improve
this in the future but for now you can exclude folders from the explorer via settings and they will not be searched for project files:
```
"files.exclude": {
	"**/largeFolder": true
}
```