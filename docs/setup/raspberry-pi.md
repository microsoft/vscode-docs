---
ContentId: E059E35A-8AD0-4D4A-9BE1-E23D45D75C1C
DateApproved: 8/26/2026
MetaDescription: Get {% data variables.product.prodname_vscode %} up and running on Raspberry Pi OS.
---
# {% data variables.product.prodname_vscode %} on Raspberry Pi

Although it's not officially supported, you can run {% data variables.product.prodname_vscode %} on [Raspberry Pi](https://www.raspberrypi.org) devices.

[![Raspberry Pi Logo](images/raspberry-pi-os/RPi-Logo-Landscape-Reg-SCREEN.png)](https://www.raspberrypi.org)

By downloading and using {% data variables.product.prodname_vscode %}, you agree to the [license terms](https://code.visualstudio.com/license) and [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409).

## Installation

{% data variables.product.prodname_vscode %} is officially distributed via the [Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/) (previously called Raspbian) APT repository, in both 32-bit and 64-bit variants.

You can install it by running:

```bash
sudo apt update
sudo apt install code
```

### Running {% data variables.product.prodname_vscode_shortname %}

After installing the {% data variables.product.prodname_vscode_shortname %} package, you can run {% data variables.product.prodname_vscode_shortname %} by typing `code` in a terminal or launching it via the **Programming** menu.

![{% data variables.product.prodname_vscode %} under the Programming menu on Raspberry Pi](images/raspberry-pi-os/vscode-under-programming.jpg)

## Updates

Your Raspberry Pi should handle updating {% data variables.product.prodname_vscode_shortname %} in the same way as other packages on the system:

```bash
sudo apt update
sudo apt upgrade code
```

You can always check when a new release is available in our [Updates](/updates) page.

## System requirements

{% data variables.product.prodname_vscode_shortname %} is not officially supported on Raspberry Pi. Check our [community discussions](https://github.com/microsoft/vscode-discussions/discussions/2379) for information on platforms that are known to work.

## Next steps

Once you have installed {% data variables.product.prodname_vscode_shortname %}, these topics will help you learn more about it:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript, and tools like Yeoman.
* [User Interface](/docs/editing/userinterface.md) - A quick orientation to {% data variables.product.prodname_vscode_shortname %}.
* [User/Workspace Settings](/docs/configure/settings.md) - Learn how to configure {% data variables.product.prodname_vscode_shortname %} to your preferences through settings.
