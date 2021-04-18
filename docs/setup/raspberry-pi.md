---
Order: 5
Area: setup
TOCTitle: Raspberry Pi
ContentId: E059E35A-8AD0-4D4A-9BE1-E23D45D75C1C
PageTitle: Running Visual Studio Code on Raspberry Pi OS
DateApproved: 3/31/2021
MetaDescription: Get Visual Studio Code up and running on Raspberry Pi OS.
---
# Visual Studio Code on Raspberry Pi

You can run Visual Studio Code on [Raspberry Pi](https://www.raspberrypi.org) devices.

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

VS Code is supported on these Raspberry Pi models running a 32-bit or 64-bit version of Raspberry Pi OS:

* Raspberry Pi 3 Model B/B+
* Raspberry Pi 4 Model B
* Raspberry Pi 400

While 1 GB of memory (RAM) meets the minimum system requirements, users will benefit from installing VS Code on a Raspberry Pi 4 with more memory.

First-generation Raspberry Pi modules and Raspberry Pi Zero are not supported as they only include an ARMv6 CPU.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [User/Workspace Settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through settings.
