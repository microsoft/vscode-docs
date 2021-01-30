---
Order: 4
Area: setup
TOCTitle: Raspberry Pi OS
ContentId: E059E35A-8AD0-4D4A-9BE1-E23D45D75C1C
PageTitle: Running Visual Studio Code on Raspberry Pi OS
DateApproved: 01/29/2021
MetaDescription: Get Visual Studio Code up and running on Raspberry Pi OS.
---
# Visual Studio Code on Raspberry Pi OS

## Installation

Visual Studio Code is officially distributed via the Raspberry Pi OS apt repository.

You can install it by running:

```bash
sudo apt update
sudo apt install code # or code-insiders
```

>**Tip:** Setup will add Visual Studio Code to your `%PATH%`, so from the terminal you can type 'code .' to open VS Code on that folder. You will need to restart your terminal after the installation for the change to the `%PATH%` environmental variable to take effect.

## Updates

VS Code ships monthly and you can see when a new release is available by checking the [release notes](/updates). If the VS Code repository was installed correctly, then your system package manager should handle auto-updating in the same way as other packages on the system.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.
