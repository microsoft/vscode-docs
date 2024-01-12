---
Order: 1
Area: python
TOCTitle: Quick Start
ContentId: c7134463-4fdd-4674-8685-77c94472902c
PageTitle: Quick Start Guide for Python in VS Code
DateApproved: 1/9/2024
MetaDescription: A quick start guide to get you up and coding with the Python extension in Visual Studio Code.
MetaSocialImage: images/tutorial/social.png
---

# Quick Start Guide for Python in VS Code

The Python extension makes VS Code an excellent Python editor, works on any operating system, and is usable with a variety of Python interpreters.

Get started by installing:
-	[VS Code](https://code.visualstudio.com/)
-	[A Python Interpreter](https://code.visualstudio.com/docs/python/python-tutorial#_install-a-python-interpreter) (any [actively supported Python version](https://devguide.python.org/#status-of-python-branches))
-	[Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) from the VS Code Marketplace

![Gif installing the Python extension in a fresh install of VS Code.](/docs/python/images/quick-start/qs-python-ext-install.gif)

To further customize VS Code for Python, you can leverage the [Python profile template](https://code.visualstudio.com/docs/editor/profiles#_python-profile-template), automatically installing recommended extensions and settings. For Data Science projects, consider using the [Data Science profile template](https://code.visualstudio.com/docs/editor/profiles#_data-science-profile-template).

![Gif showing the Python profile template being installing into VS Code.](/docs/python/images/quick-start/python-profile-create.gif)

## How to create and open a Python project or file

If you have an existing Python project you wish to work on in VS Code, you can begin by opening your folder or file from the VS Code welcome page or Explorer panel, or by selecting **File -> Open Folder** (`kb(workbench.action.files.openFolder)`) or **File -> Open File** (`kb(workbench.action.files.openFile)`).

You can create a new Python files by selecting **New File** in the VS Code Welcome page and select **Python file**, or navigating to **File -> New File** (`kb(workbench.action.files.newFile)`).

> **Tip:** If you already have a workspace folder open in VS Code, you can add new files or folders directly into your existing project. You can create new folders and file by clicking the icons on the top level folder in the Explorer panel.

## UI Tour

When you launch VS Code for the very first time, you will need to install the Python extension to get Python specific features and UI. Let’s look at the UI once the Python extension is installed.

![Image of the Python UI highlights in VS Code.](/docs/python/images/quick-start/ui-tour.png)

## Code Actions

Code Actions (also known as Quick Fixes) are provided when there are Warnings or Errors to help fix issues you may be experiencing in your code. These helpful hints are displayed in the editor left margin as a lightbulb (💡). Click on the light bulb to display Code Action options which can come from extensions such as Python, Pylance, or VS Code itself. For more information about Code Actions, see [Python Quick Fixes](https://code.visualstudio.com/docs/python/editing#_quick-fixes).

![Gif showing Code Actions in a Python project.](images/editing/quickFix.gif)

## Python Commands

Python commands can be accessed through the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (`kb(workbench.action.showCommands)`). From the Command Palette, you have access to various features from VS Code as well as installed extensions. Begin typing **“Python: “** to locate the commands accessible through the Python extension.

![Gif demonstrating how to access Python commands in the Command Palette.](/docs/python/images/quick-start/cmd-plt-python.gif)

## Run, debug, and test

Now that you are more familiar with Python in VS Code, let’s learn how to run, debug, and test your code.

### Run

There are a few ways to run Python code in VS Code.

To run the Python script you have open on the editor, click the **Run Python File in Terminal** play button in the top-right of the editor.

![Image showing the Run Python File in Terminal play button.](images/tutorial/run-python-file-in-terminal-button.png)

There are also additional ways you can iteratively run snippets of your Python code within VS Code:
-	Select one or more lines, then press `kbstyle(Shift+Enter)` or right-click and select **Run Selection/Line in Python Terminal**. This command is convenient for testing just a part of a file.
-	From the Command Palette (`kb(workbench.action.showCommands)`), select the **Python: Start REPL** command to open a REPL terminal for the currently selected Python interpreter. In the REPL, you can then enter and run lines of code one at a time.

### Debug

The debugger is a helpful tool that allows you to inspect the flow of your code execution and more easily identify errors, as well as explore how your variables and data change as your program is run. You can start debugging by setting a breakpoint in your Python project by clicking in the gutter next to the line you wish to inspect.

![Screenshot showing a debugger breakpoint in a Python program.](images/tutorial/breakpoint-set.png)

To start debugging, initialize the debugger by pressing `F5`. Since this is your first time debugging this file, a configuration menu will open allowing you to select the type of application you want to debug. If it's a Python script, you can select "Python File".

Once your program reaches the breakpoint, it will stop and allow you to track data in the Python Debug console, and progress through your program using the debug toolbar.

![Gif showing how to configure the Python debugger for the first time.](images/quick-start/qs-python-debug.gif)

For a deeper dive into Python debugging functionality, see [Python debugging in VS Code](https://code.visualstudio.com/docs/python/debugging).

### Test
The Python extension provides robust testing support for [Unittest](https://docs.python.org/3.3/library/unittest.html) and [pytest](https://pytest.org/en/7.4.x/).

You can configure Python tests through the Test Panel on the Activity Bar by selecting **Configure Python Tests** and selecting your test framework of choice.

You can also create tests for your Python project, which the Python extension will attempt to discover once your framework of choice is configured. The Python extension also allows you to run and debug your tests in the Testing view and inspect the test run output in the Test Results panel.

![Gif demonstrating test configuration, discovery, and run in the Python extension.](/docs/python/images/quick-start/qs-testing.gif)

For a comprehensive look at testing functionality, see [Python testing in VS Code](https://code.visualstudio.com/docs/python/testing).

## Next steps

To learn how to build web apps with popular Python web frameworks, see the following tutorials:

- [Use Django in Visual Studio Code](/docs/python/tutorial-django.md)
- [Use Flask in Visual Studio Code](/docs/python/tutorial-flask.md)
- [Use FastAPI in Visual Studio Code](/docs/python/tutorial-fastapi.md)

There is much more to explore with Python in Visual Studio Code:

- [Python profile template](/docs/editor/profiles.md#python-profile-template) - Create a new [profile](/docs/editor/profiles) with a curated set of extensions, settings, and snippets
- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Linting](/docs/python/linting.md) - Enable, configure, and apply a variety of Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.



