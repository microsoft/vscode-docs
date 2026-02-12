---
Order:
TOCTitle: Requirements
ContentId: 1D4850EE-85E2-4152-81BE-FECAE62EA99E
PageTitle: Requirements for Visual Studio Code
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code hardware and platform (operating system) requirements.
---
# Requirements for Visual Studio Code

## Hardware

Visual Studio Code is a small download (< 200 MB) and has a disk footprint of < 500 MB. VS Code is lightweight and should easily run on today's hardware.

We recommend:

* 1.6 GHz or faster processor
* 1 GB of RAM

## Platforms

VS Code is supported on the following platforms:

* Windows 10 and 11 (64-bit)
* macOS versions with Apple security update support. This is typically the latest release and the two previous versions.
* Linux (Debian): Ubuntu Desktop 20.04, Debian 10
* Linux (Red Hat): Red Hat Enterprise Linux 8, Fedora 36

Running VS Code with the [Dev Containers](/docs/devcontainers/containers.md) extension is supported. When using the Dev Containers extension, VS Code server is running in the container while the VS Code client is on the desktop.

## Not supported

* Running VS Code in application virtualization solutions such as Microsoft App-V or MSIX for Windows, or third-party app virtualization technologies.
* Running VS Code in a virtual machine environment requires a full operating system.
* Running VS Code on a non-persistent virtual machine.
* Running VS Code on systems utilizing or managing users with FSLogix.
* Multiple simultaneous users using the software on the same machine, including shared virtual desktop infrastructure machines or a pooled Windows/Linux Virtual Desktop host pool.
* Running the full VS Code in Windows/Linux containers.
* Windows Server

### Additional Linux requirements

* GLIBCXX version 3.4.25 or later
* GLIBC version 2.28 or later

For a list of currently known issues, see our [FAQ](faq).
