---
Order: 11
Area: languages
TOCTitle: Python
ContentId: c2cb770d-571d-4edf-9eb9-b5b8977c21a0
PageTitle: Python with Visual Studio Code
DateApproved: 9/7/2017
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Python.
---
# Python on Visual Studio Code

Python is fully supported in Visual Studio Code through [extensions](/docs/editor/extension-gallery.md). Popular extensions in the [Marketplace](https://marketplace.visualstudio.com) provide code completion, linting, debugging, code formatting, snippets, and more.

> [Download VS Code](/download) - If you haven't downloaded VS Code yet, quickly install for your platform (Windows, Mac, Linux).

## Install Python Extension

VS Code is a fast editor and ships with only the basic features. Add Python language support to VS Code by installing one of the popular Python extensions.

1. Select an extension.
2. Install the extension by typing `ext install` into the Command Palette `kb(workbench.action.showCommands)`.

<div class="marketplace-extensions-python"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com/vscode).

The examples in this document will use Don Jayamanne's popular and full featured [Python Extension](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python).

## Code Completion

Python extensions support code completion and Intellisense. [Intellisense](/docs/editor/intellisense.md) is a general term for a number of features, including intelligent code completion (in-context method and variable suggestions) across all your files and for built-in and thirty-party modules.

Quickly see methods, class members, and documentation.

<video id="python-code-completion-video" src="https://az754404.vo.msecnd.net/public/python-intellisense.mp4" poster="/images/python_python-intellisense-placeholder.png" autoplay loop controls muted></video>

> Tip: Trigger code completion with `kb(editor.action.triggerSuggest)`.

## Linting

Linting is the analysis of your Python code for potential errors. Use Visual Studio Code to quickly navigate to the errors and warnings in your code.

<video id="python-linting-video" src="https://az754404.vo.msecnd.net/public/python-linting.mp4" poster="/images/python_python-linting-placeholder.png" autoplay loop controls muted></video>

> Tip: [Don Jayamanne's Python extension](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python) gives you the option of using three different linters - [Pylint](https://www.pylint.org/), [Pep8](https://pypi.python.org/pypi/pep8), and [Flake8](https://flake8.readthedocs.io/en/latest/). See the [wiki](https://github.com/DonJayamanne/pythonVSCode/wiki/Linting) for more details.

## Debugging

No more `print` statement debugging! Set breakpoints, inspect data, and use the debug console. Debug a number of different type of Python applications, including multi-threaded, web, and remote applications.

<video id="python-debugging-video" src="https://az754404.vo.msecnd.net/public/python-debugging.mp4" poster="/images/python_python-debugging-placeholder.png" autoplay loop controls muted></video>

> Tip: Follow the instructions in the [wiki](https://github.com/DonJayamanne/pythonVSCode/wiki/Debugging) for getting started with debugging, including setting up your `launch.json` debugging configuration and troubleshooting common issues.

> Tip: Read more about general information about debugging in Visual Studio Code in the [debugging document](/docs/editor/debugging.md).

## Snippets

Snippets will take productivity to the next level. You can configure [your own snippets](/docs/editor/userdefinedsnippets.md) and use snippets provided by an extension.

<video id="python-snippets-video" src="https://az754404.vo.msecnd.net/public/python-snippets.mp4" poster="/images/python_python-snippets-placeholder.png" autoplay loop controls muted></video>

> Tip: Snippets appear in the same way as code completion `kb(editor.action.triggerSuggest)`.

## Configuration

You will need an [extension](/docs/languages/python.md#install-python-extension) and [Python](https://www.python.org/downloads/) installed. Other dependencies are optional and depend on the features you want to use. Read through the requirements on the [extension's README](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python#requirements).

## Next Steps

* [Install an Extension](/docs/editor/extension-gallery.md) - Python extension are available in the [Marketplace](https://marketplace.visualstudio.com/vscode).
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.

## Common Questions

**Q: Why won't linting work for me?**

**A:** First make sure you have installed an extension. Next, many extensions have a dependency on an external package. Install the [required packages](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python#requirements) using a Python package manager like [pip](https://pypi.python.org/pypi/pip) or [easy_install](http://peak.telecommunity.com/DevCenter/EasyInstall). You can read more about troubleshooting linting issues [here](https://github.com/DonJayamanne/pythonVSCode/wiki/Autocomplete-Intellisense).
