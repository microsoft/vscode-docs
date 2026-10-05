---
Order:
TOCTitle: Requirements
ContentId: 1D4850EE-85E2-4152-81BE-FECAE62EA99E
PageTitle: Requirements for {% data variables.product.prodname_vscode %}
DateApproved: 02/04/2026
MetaDescription: {% data variables.product.prodname_vscode %} hardware and platform (operating system) requirements.
---
# Requirements for {% data variables.product.prodname_vscode %}

## Hardware

{% data variables.product.prodname_vscode %} is a small download (< 200 MB) and has a disk footprint of < 500 MB. {% data variables.product.prodname_vscode_shortname %} is lightweight and should easily run on today's hardware.

We recommend:

* 1.6 GHz or faster processor
* 1 GB of RAM

## Platforms

{% data variables.product.prodname_vscode_shortname %} is supported on the following platforms:

* [Supported versions of Windows client](https://learn.microsoft.com/en-us/windows/release-health/supported-versions-windows-client) (64-bit).
* macOS versions with Apple security update support. This is typically the latest release and the two previous versions.
* Linux (Debian): Ubuntu Desktop 20.04, Debian 10
* Linux (Red Hat): Red Hat Enterprise Linux 8, Fedora 36

Running {% data variables.product.prodname_vscode_shortname %} with the [Dev Containers](/docs/devcontainers/containers.md) extension is supported. When using the Dev Containers extension, {% data variables.product.prodname_vscode_shortname %} server is running in the container while the {% data variables.product.prodname_vscode_shortname %} client is on the desktop.

## Not supported

* Running {% data variables.product.prodname_vscode_shortname %} in application virtualization solutions such as Microsoft App-V or MSIX for Windows, or third-party app virtualization technologies.
* Running {% data variables.product.prodname_vscode_shortname %} in a virtual machine environment requires a full operating system.
* Running {% data variables.product.prodname_vscode_shortname %} on a non-persistent virtual machine.
* Running {% data variables.product.prodname_vscode_shortname %} on systems utilizing or managing users with FSLogix.
* Multiple simultaneous users using the software on the same machine, including shared virtual desktop infrastructure machines or a pooled Windows/Linux Virtual Desktop host pool.
* Running the full {% data variables.product.prodname_vscode_shortname %} in Windows/Linux containers.
* Windows Server

### Additional Linux requirements

* GLIBCXX version 3.4.25 or later
* GLIBC version 2.28 or later

For a list of currently known issues, see our [FAQ](faq).
