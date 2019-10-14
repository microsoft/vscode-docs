---
Order: 1
Area: python
TOCTitle: Setup
ContentId: A258DDA8-2C20-4B8A-BAA0-8526F96BF8F5
PageTitle: Setup Python in Visual Studio Code
DateApproved: 10/14/2019
MetaDescription: Covers setting up Python in Visual Studio Code, including installing the extension and an interpreter.
MetaSocialImage: images/tutorial/social.png
---
# Installing Python in VS Code

TBD Intro Paragraph

## Installing the Python extension for VS Code

Install the [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python). For details on installing extensions, see [Extension Marketplace](/docs/editor/extension-gallery.md). The Python extension is named **Python** and published by Microsoft.

## Installing a Python interpreter

### All operating systems

### Windows

### macOS

### Linux

### Data Science???

1. Install a version of Python 3 (for which this tutorial is written). Options include:
   - (All operating systems) A download from [python.org](https://www.python.org/downloads/); you can typically use the **Download Python 3.7.4** button that appears first on the page (or whatever is the latest version).
   - (Linux) The built-in Python 3 installation works well, but to install other Python packages you must install `pip` with [`get-pip.py`](https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py).
   - (macOS) An installation through [Homebrew](https://brew.sh/) on macOS using `brew install python3` (the system install of Python on macOS is not supported).
   - (Windows) Install Python from the Windows Store.
   - (All operating systems) A download from [Anaconda](https://www.anaconda.com/download/) (for data science purposes).

1. On macOS, make sure the location of your VS Code installation is included in your PATH environment variable.  See [the setup instructions](/docs/setup/mac.md#launching-from-the-command-line) for more information.

## Verify the Python installation

To verify that you've installed Python successfully on your machine, run one of the following commands (depending on your operating system):

- Linux/macOS: open a Terminal Window and type the following command:

    ```bash
    python3 --version
    ```

- Windows: open a command prompt and run the following command:

    ```ps
    py -3 --version
    ```

If the installation was successful, the output window should show the version of Python that you installed.

   > **Note** You can use the `py -0` command in the integrated terminal to view the versions of python installed on your machine. The default interpreter is identified by an asterisk (*).

## Windows Subsystem for Linux

If you are working on Windows and want an isolated environment for working with Python, the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/about) (WSL) is a great option. You can enable WSL and install a Linux distribution on your Windows machine, completely isolated from your normal development environment. This Python tutorial can be done inside WSL, using the VS Code [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).

For more information, see [VS Code Remote Development](/docs/remote/remote-overview.md) or try the [Working in WSL tutorial](/remote-tutorials/wsl/getting-started.md), which will walk you through setting up WSL, installing Python, and creating a Hello World application running in WSL.

Once you have WSL running, you can return to this tutorial and verify the prerequisites with a WSL terminal or VS Code integrated terminal.