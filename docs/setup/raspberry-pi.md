---
Order: 5
Area: setup
TOCTitle: Raspberry Pi
ContentId: E059E35A-8AD0-4D4A-9BE1-E23D45D75C1C
PageTitle: Running Visual Studio Code on Raspberry Pi OS
DateApproved: 03/05/2025
MetaDescription: Get Visual Studio Code up and running on Raspberry Pi OS.
---
# Visual Studio Code on Raspberry Pi

Although it's not officially supported, you can run Visual Studio Code on [Raspberry Pi](https://www.raspberrypi.org) devices.

[![Raspberry Pi Logo](images/raspberry-pi-os/RPi-Logo-Landscape-Reg-SCREEN.png)](https://www.raspberrypi.org)

By downloading and using Visual Studio Code, you agree to the [license terms](https://code.visualstudio.com/license) and [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409).

## Installation

Visual Studio Code is officially distributed via the [Raspberry Pi OS](https://www.raspberrypi.org/software/operating-systems) (previously called Raspbian) APT repository, in both 32-bit and 64-bit variants.

You can install it by running:

```bash
sudo apt update
sudo apt install code
```

### Running VS Code

After installing the VS Code package, you can run VS Code by typing `code` in a terminal or launching it via the **Programming** menu.

![Visual Studio Code under the Programming menu on Raspberry Pi](images/raspberry-pi-os/vscode-under-programming.jpg)

## Updates

Your Raspberry Pi should handle updating VS Code in the same way as other packages on the system:

```bash
sudo apt update
sudo apt upgrade code
```

You can always check when a new release is available in our [Updates](/updates) page.

## System requirements

VS Code is not officially supported on Raspberry Pi. Check our [community discussions](https://github.com/microsoft/vscode-discussions/discussions/2379) for information on platforms that are known to work.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/editor/customizing/settings.md) - Learn how to configure VS Code to your preferences through settings.
