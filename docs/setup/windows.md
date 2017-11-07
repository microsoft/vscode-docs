---
Order: 4
Area: setup
TOCTitle: Windows
ContentId: 4670C281-5761-46E6-8C46-10D523946FFB
PageTitle: Running Visual Studio Code on Windows
DateApproved: 11/8/2017
MetaDescription: Get Visual Studio Code up and running on Windows
---
# Running VS Code on Windows

## Installation

1. Download the [Visual Studio Code installer](https://go.microsoft.com/fwlink/?LinkID=534107) for Windows.
2. Once it is downloaded, run the installer (VSCodeSetup-version.exe). This will only take a minute.
3. By default, VS Code is installed under `C:\Program Files\Microsoft VS Code` for a 64-bit machine.

You can also find a Zip archive [here](/docs/?dv=winzip).

>**Note:** .NET Framework 4.5.2 or higher is required for VS Code.  If you are using Windows 7, make sure you have at least [.NET Framework 4.5.2](https://www.microsoft.com/en-us/download/details.aspx?id=42643) installed.

>**Tip:** Setup will optionally add Visual Studio Code to your `%PATH%`, so from the console you can type 'code .' to open VS Code on that folder. You will need to restart your console after the installation for the change to the `%PATH%` environmental variable to take effect.

## 32 bit versions

If you need to run a 32 bit version of VS Code, both an 32 bit [Installer](https://go.microsoft.com/fwlink/?LinkId=723965) and [Zip archive](https://go.microsoft.com/fwlink/?LinkID=733265) are available.

## Updates

VS Code ships monthly [releases](/updates) and supports auto-update when a new release is available. If you're prompted by VS Code, accept the newest update and it will be installed (you won't need to do anything else to get the latest bits). If you'd rather control VS Code updates manually, see [How do I opt out of auto-updates](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates).

## Next Steps

Once you have installed VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.

## Common Questions

### Trouble with the installer

Try using the [zip file](/docs/?dv=winzip) instead of the installer.  To use this, unzip VS Code in your **Program Files** folder.

>**Note:** When VS Code is installed via a Zip file, you will need to manually update it for each [release](/updates).

### Icons are missing

I installed Visual Studio Code on my Windows 7 or 8 machine. Why are some icons not appearing in the workbench and editor?

VS Code uses [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) icons and we have found instances where the .SVG file extension is associated with something other than `image/svg+xml`. We're considering options to fix it, but for now here's a workaround:

Using the Command Prompt:

1. Open an Administrator Command Prompt.
2. Type `REG ADD HKCR\.svg /f /v "Content Type" /t REG_SZ /d image/svg+xml`.

Using the Registry Editor (regedit):

1. Start `regedit`.
2. Open the `HKEY_CLASSES_ROOT` key.
3. Find the `.svg` key.
4. Set its `Content Type` Data value to `image/svg+xml`.
5. Exit `regedit`.
