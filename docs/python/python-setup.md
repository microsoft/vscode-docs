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

The Python extension for Visual Studio Code makes an excellent Python editor, and works on any operating system with a variety of Python interpreters. It leverages all of VS Code's power to provide auto complete and IntelliSense, linting, debugging, and unit testing, along with the ability to easily switch between Python environments, including virtual and conda environments.

## Installing the Python extension for VS Code

Begin by installing the [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python) from the Visual Studio Marketplace. For additional details on installing extensions, see [Extension Marketplace](/docs/editor/extension-gallery.md). The Python extension is named **Python** and published by Microsoft.

[![Python extension on Marketplace](images/setup/python-extension-marketplace.png)](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

## Installing a Python interpreter

Along with the Python extension, you need to install a Python interpreter. Which interpreter you use is dependent on your specific needs, but some guidance is provided below.

### All operating systems

 For a quick install, you can use [Python from python.org](https://www.python.org/downloads/). Python.org provides installations for Windows, Linux/Unix, and macOS. You can typically use the **Download Python** button that appears first on the page to download the latest version.

### Windows

An additional option for installing Python on Windows is to use the Microsoft Store. The Microsoft Store provides an easy way to install [Python 3.7](https://www.microsoft.com/en-us/p/python-37/9nj46sx7x90p) and [Python 3.8](https://www.microsoft.com/en-us/p/python-38/9mssztt1n39l).

Installing via the Microsoft Store uses the basic Python3 interpreter, but handles set up of your PATH settings for the current user (avoiding the need for admin access), in addition to providing automatic updates. This method is especially helpful if you are in an educational environment or a part of an organization that restricts permissions or administrative access on your machine.

For additional information about Python on Windows, see [Using Python on Windows at Python.org](https://docs.python.org/3.7/using/windows.html)

### macOS

The system install of Python on macOS is not supported. Instead, an installation through [Homebrew](https://brew.sh/) Is recommended. To install Python using Homebrew on macOS use `brew install python3` at the Terminal prompt.

> **Note** On macOS, make sure the location of your VS Code installation is included in your PATH environment variable.  See [these setup instructions](/docs/setup/mac.md#launching-from-the-command-line) for more information.

### Linux

The built-in Python 3 installation on Linux works well, but to install other Python packages you must install `pip` with [`get-pip.py`](https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py).

### Data Science

If your primary purpose for using Python is Data Science, then you might consider a download from [Anaconda](https://www.anaconda.com/download/). Anaconda provides not just a Python interpreter, but many useful libraries and tools for data science.

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

   > **Note** You can use the `py -0` command in the VS Code integrated terminal to view the versions of python installed on your machine. The default interpreter is identified by an asterisk (*).

## Windows Subsystem for Linux

If you are working on Windows and want an isolated environment for working with Python, the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/about) (WSL) is a great option. You can enable WSL and install a Linux distribution on your Windows machine, completely isolated from your normal development environment.

If you choose this option, you'll also want to install the [Remote - WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). The Remote - WSL extension runs commands and extensions directly in WSL so you don't have to worry about pathing issues, binary compatibility, or other cross-OS challenges. You'll be able to use VS Code in WSL just as you would from Windows.

For more information about using WSL with VS Code, see [VS Code Remote Development](/docs/remote/remote-overview.md) or try the [Working in WSL tutorial](/remote-tutorials/wsl/getting-started.md), which will walk you through setting up WSL, installing Python, and creating a Hello World application running in WSL.

## Next steps

Now that your development environment is setup, get started developing with Python in VS Code by following the [Python tutorial](/docs/python/python-tutorial.md).
