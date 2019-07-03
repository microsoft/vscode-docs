---
Order: 4
Area: setup
TOCTitle: Windows
ContentId: 4670C281-5761-46E6-8C46-10D523946FFB
PageTitle: Running Visual Studio Code on Windows
DateApproved: 7/3/2019
MetaDescription: Get Visual Studio Code up and running on Windows
---
# Visual Studio Code on Windows

## Installation

1. Download the [Visual Studio Code installer](https://go.microsoft.com/fwlink/?LinkID=534107) for Windows.
2. Once it is downloaded, run the installer (VSCodeUserSetup-{version}.exe). This will only take a minute.
3. By default, VS Code is installed under `C:\users\{username}\AppData\Local\Programs\Microsoft VS Code`.

Alternatively, you can also download a [Zip archive](/docs/?dv=winzip), extract it and run Code from there.

>**Note:** .NET Framework 4.5.2 or higher is required for VS Code.  If you are using Windows 7, make sure you have at least [.NET Framework 4.5.2](https://www.microsoft.com/download/details.aspx?id=42643) installed.

>**Tip:** Setup will add Visual Studio Code to your `%PATH%`, so from the console you can type 'code .' to open VS Code on that folder. You will need to restart your console after the installation for the change to the `%PATH%` environmental variable to take effect.

## User versus system setup

VS Code provides both Windows user and system level setups. Installing the user setup does not require Administrator privileges as the location will be under your user Local AppData (LOCALAPPDATA) folder. User setup also provides a smoother background update experience.

The system setup requires elevation to Administrator privileges and will place the installation under Program Files.

## 32-bit versions

If you need to run a 32-bit version of VS Code, both a 32-bit [Installer](https://go.microsoft.com/fwlink/?LinkId=723965) and [Zip archive](https://go.microsoft.com/fwlink/?LinkID=733265) are available.

## Updates

VS Code ships monthly [releases](/updates) and supports auto-update when a new release is available. If you're prompted by VS Code, accept the newest update and it will be installed (you won't need to do anything else to get the latest bits).

>Note: You can [disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) if you prefer to update VS Code on your own schedule.

## Next steps

Once you have installed VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - Lets you jump right in and learn how to be productive with VS Code.

## Common questions

### What command-line arguments are supported by the Windows Setup?

VS Code uses [Inno Setup](http://www.jrsoftware.org/isinfo.php) to create its setup package
for Windows. Thus, all the [Inno Setup command-line switches](http://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline) are available for use.

Additionally, you can prevent the Setup from launching VS Code after completion with `/mergetasks=!runcode`.

### Scrolling is laggy and not smooth

On certain devices, editor scrolling is not smooth but laggy for an unpleasant experience. If you notice this issue, make sure you install the Windows 10 October 2018 update where this issue is fixed.

### I'm having trouble with the installer

Try using the [zip file](/docs/?dv=winzip) instead of the installer.  To use this, unzip VS Code in your `AppData\Local\Programs` folder.

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
