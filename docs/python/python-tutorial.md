---
Order: 1
Area: python
TOCTitle: Tutorial
ContentId: 77828f36-ae45-4887-b25c-34545edd52d3
PageTitle: Get Started Tutorial for Python in Visual Studio Code
DateApproved: 04/25/2019
MetaDescription: A Python hello world tutorial using the Python extension in Visual Studio Code (a great Python IDE like PyCharm, if not the best Python IDE)
MetaSocialImage: images/tutorial/social.png
---
# Getting Started with Python in VS Code

In this tutorial, you use Python 3 to create the simplest Python "Hello World" application in Visual Studio Code. By using the Python extension, you make VS Code into a great lightweight Python IDE (which you may find a productive alternative to PyCharm).

This tutorial is intended to introduce you to VS Code as a Python environment, primarily how to edit, run, and debug code. This tutorial is not intended to teach you Python itself. Once you are familiar with the basics of VS Code, you can then follow any of the [programming tutorials on python.org](https://wiki.python.org/moin/BeginnersGuide/Programmers) within the context of VS Code for an introduction to the language.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

> **Note**: You can use VS Code with Python 2 with this tutorial, but you need to make appropriate changes to the code, which are not covered here.

## Prerequisites

To successfully complete this tutorial, complete the following requirements:

1. Install the [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python). For details on installing extensions, see [Extension Marketplace](/docs/editor/extension-gallery.md). The Python extension is named **Python** and published by Microsoft.

1. Install a version of Python 3 (for which this tutorial is written). Options include:
   - (All operating systems) A download from [python.org](https://www.python.org/downloads/); you can typically use the **Download Python 3.7.3** button that appears first on the page (or whatever is the latest version).
   - (Linux) The built-in Python 3 installation works well, but to install other Python packages you must install `pip` with [`get-pip.py`](https://pip.pypa.io/en/stable/installing/#installing-with-get-pip-py).
   - (macOS) An installation through [Homebrew](https://brew.sh/) on macOS using `brew install python3` (the system install of Python on macOS is not supported).
   - (All operating systems) A download from [Anaconda](https://www.anaconda.com/download/) (for data science purposes).

   > **Note** You can use the `py -0` command in the integrated terminal to view the versions of python installed on your machine. The default interpreter is identified by an asterisk (*).
1. On MacOS, make sure the location of your VS Code installation is included in your PATH environment variable.  See [the setup instructions](/docs/setup/mac.md#launching-from-the-command-line) for more information.

## Start VS Code in a project (workspace) folder

At a command prompt or terminal, create an empty folder called "hello", navigate into it, and open VS Code (`code`) in that folder (`.`) by entering the following commands:

```bash
mkdir hello
cd hello
code .
```

By starting VS Code in a folder, that folder becomes your "workspace". VS Code stores settings that are specific to that workspace in `.vscode/settings.json`, which are separate from user settings that are stored globally.

Alternately, you can run VS Code through the operating system UI, then use **File > Open Folder** to open the project folder.

## Select a Python interpreter

Python is an interpreted language, and in order to run Python code and get Python IntelliSense, you must tell VS Code which interpreter to use.

From within VS Code, select a Python 3 interpreter by opening the **Command Palette** (`kb(workbench.action.showCommands)`), start typing the **Python: Select Interpreter** command to search, then select the command. You can also use the **Select Python Environment** option on the Status Bar if available (it may already show a selected interpreter, too):

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

The command presents a list of available interpreters that VS Code can find automatically, including virtual environments. If you don't see the desired interpreter, see [Configuring Python environments](/docs/python/environments.md).

Selecting an interpreter sets the `python.pythonPath` value in your workspace settings to the path of the interpreter. To see the setting, select **File** > **Preferences** > **Settings** (**Code** > **Preferences** > **Settings** on macOS), then select the **Workspace Settings** tab.

> **Note**: If you select an interpreter without a workspace folder open, VS Code sets `python.pythonPath` in your user settings instead, which sets the default interpreter for VS Code in general. The user setting makes sure you always have a default interpreter for Python projects. The workspace settings lets you override the user setting.

## Create a Python Hello World source code file

From the File Explorer toolbar, click the New File button on the `hello` folder:

![File Explorer New File](images/tutorial/toolbar-new-file.png)

Name the file `hello.py`, and it automatically opens in the editor:

![File Explorer hello.py](images/tutorial/hello-py-file-created.png)

By using the `.py` file extension, you tell VS Code to interpret this file as a Python program, so that it evaluates the contents with the Python extension and the selected interpreter.

Next, start entering the following source code if using Python 3:

```python
msg = "Hello World"
print(msg)
```

When you start typing `print`, notice how [IntelliSense](/docs/editor/intellisense.md) presents auto-completion options.

![IntelliSense appearing for Python code](images/tutorial/intellisense01.png)

IntelliSense and auto-completions work for standard Python modules as well as other packages you've installed into the environment of the selected Python interpreter. It also provides completions for methods available on object types. For example, because the `msg` variable contains a string, IntelliSense provides string methods when you type `msg.`:

![IntelliSense appearing for a variable whose type provides methods](images/tutorial/intellisense02.png)

Feel free to experiment with IntelliSense some more, but then revert your changes so you have only the `msg` variable and the `print` call, and save the file (`kb(workbench.action.files.save)`).

For full details on editing, formatting, and refactoring, see [Editing code](/docs/python/editing.md). The Python extension also has full support for [Linting](/docs/python/linting.md).

## Run Hello World

It's simple to run `hello.py` with Python. Right-click in the editor and select **Run Python File in Terminal** (which saves the file automatically):

![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

The command opens a terminal panel in which your Python interpreter is automatically activated, then runs `python3 hello.py` (macOS/Linux) or `python hello.py` (Windows):

![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

There are two other ways you can run Python within VS Code:

- Select one or more lines, then press `kbstyle(Shift+Enter)` or right-click and select **Run Selection/Line in Python Terminal**. This command is convenient for testing just a part of a file.
- Use the **Python: Start REPL** command to open a REPL terminal for the currently selected Python interpreter. In the REPL, you can then enter and run lines of code one at a time.

## Configure and run the debugger

Let's now try debugging our simple Hello World program.

First, set a breakpoint on line 2 of `hello.py` by placing the cursor on the `print` call and pressing `kb(editor.debug.action.toggleBreakpoint)`. Alternately, just click in the editor's left gutter, next to the line numbers. When you set a breakpoint, a red circle appears in the gutter.

![Setting a breakpoint in hello.py](images/tutorial/breakpoint-set.png)

Next, select the Debug View in the sidebar:

![Debug icon](images/tutorial/debug-icon.png)

Then select the settings icon on the debug toolbar (or use the **Debug** > **Open configurations** menu command):

![Debug toolbar settings command](images/tutorial/debug-settings.png)

Selecting the settings icon automatically opens a configuration menu from the Command Palette, allowing you to select the type of debug configuration you would like for the opened file.

![Debug configurations after launch.json is created](images/tutorial/debug-configurations.png)

**Note**: VS Code uses JSON files for all of its various configurations; `launch.json` is the standard name for a file containing debugging configurations.

These different configurations are fully explained in [Debugging configurations](/docs/python/debugging.md); for now, just select **Python File**, which is the configuration that runs the current file shown in the editor using the currently selected Python interpreter. Once selected the Python extension creates and opens a `launch.json` file that contains a pre-defined configuration based on your selection.

To automatically stop the debugger on the first line when the program starts, add a `"stopOnEntry": true` setting to the "Python: Current File" configuration in the generated `launch.json` file, so that the whole configuration appears as follows:

```json
{
    "name": "Python: Current File",
    "type": "python",
    "request": "launch",
    "program": "${file}",
    "console": "integratedTerminal",
    "stopOnEntry": true
},
```

Save `launch.json` after making changes.

> **Tip:** If you need to specify the exact folder containing the interpreter to use for debugging, include an entry for `pythonPath` in the configuration, such as `"pythonPath": "${workspaceFolder}"` or `"pythonPath": "${workspaceFolder}/.venv"`.

> **Tip:** To specify command-line arguments for the Python program, add a line `"args": []` to the configuration, and place each argument as elements inside the `[]` list. For examples, see [Debugging - args](/docs/python/debugging.md#args).

Switch to `hello.py` in the editor, then run the debugger by selecting the arrow in the Debug toolbar or pressing `kb(workbench.action.debug.start)`. The debugger stops at the first line of the file breakpoint (or the first line if `stopOnEntry` is set to true). The current line is indicated with a yellow arrow in the left margin. If you're stopped on the first line and examine the **Local** variables window at this point, you see that only automatic dunder variables are defined:

![Debugging step 1 - stop on entry](images/tutorial/debug-step-01.png)

A debug toolbar appears along the top with the following commands from left to right: continue (`kb(workbench.action.debug.start)`), step over (`kb(workbench.action.debug.stepOver)`), step into (`kb(workbench.action.debug.stepInto)`), step out (`kb(workbench.action.debug.stepOut)`), restart (`kb(workbench.action.debug.restart)`), and stop (`kb(workbench.action.debug.stop)`).

![Debugging toolbar](images/tutorial/debug-toolbar.png)

The Status Bar also changes color (orange in many themes) to indicate that you're in debug mode. The **Python Debug Console** also appears automatically in the lower right panel to show the commands being run, along with the program output.

To continue running the program, select the continue command on the debug toolbar (`kb(workbench.action.debug.start)`). The debugger runs the program to the next breakpoint. The now-defined `msg` variable appears in the **Local** pane.
> **Tip** Debugging information can also be seen by hovering over code, such as variables. In the case of `msg`, hovering over the variable will display the string `Hello world` in a box above the variable.

![Debugging step 2 - variable defined](images/tutorial/debug-step-02.png)

You can also work with variables in the **Debug Console** (If you don't see it, select **Debug Console** in the lower right area of VS Code, or select it from the **...** menu.) Then try entering the following lines, one by one, at the **>** prompt at the bottom of the console:

```python
msg
msg.capitalize()
msg.split()
```

![Debugging step 3 - using the debug console](images/tutorial/debug-step-03.png)

Select the blue **Continue** button on the toolbar again (or press F5) to run the program to completion. "Hello World" appears in the **Python Debug Console** if you switch back to it, and VS Code exits debugging mode once the program is complete.

If you restart the debugger, the debugger again stops on the first breakpoint, (or the first line is `stopOnEntry` is set to true, in which case the debugger stops before any code is run.)

To stop running a program before it's complete, use the red square stop button on the debug toolbar (`kb(workbench.action.debug.stop)`), or use the **Debug > Stop debugging** menu command.

For full details, see [Debugging configurations](/docs/python/debugging.md), which includes notes on how to use a specific Python interpreter for debugging.

> **Tip: Use Logpoints instead of print statements**: Developers often litter source code with `print` statements to quickly inspect variables without necessarily stepping through each line of code in a debugger. In VS Code, you can instead use **Logpoints**. A Logpoint is like a breakpoint except that it logs a message to the console and doesn't stop the program. For more information, see [Logpoints](/docs/editor/debugging.md#logpoints) in the main VS Code debugging article.

### Troubleshooting

If for some reason VS Code doesn't generate `launch.json` for you, create the `.vscode/launch.json` file within the project folder (creating the `.vscode` folder if you need to), then paste the following contents into `launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal"
        }
    ]
}
```

If you see "SyntaxError: invalid syntax" as shown below,  you may have attempted to start debugging when `launch.json` was showing in the editor. The error occurs because `launch.json` is not Python code like `hello.py`:

```bash
    // Use IntelliSense to learn about possible attributes.
     ^
SyntaxError: invalid syntax
```

Select `hello.py` and try again. Alternately, create a debug configuration specifically for the `hello.py` file by adding the following lines in `launch.json` within the `configuration` array. Then select this configuration in the debugger drop-down and start the debugger again.

```json
        {
            "name": "Python: hello.py",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/hello.py",
            "console": "integratedTerminal"
        },
```

If you see the message, "Python interpreter is not found because python.exe is not in the workspace directory," or "You need to install a Python interpreter before you start debugging," then you may have `pythonPath: ${workspaceFolder}` in your `launch.json` file, but your Python interpreter actually exists in a different path. Check the value, or remove the `pythonPath` property altogether.

## Install and use packages

Let's now run an example that's a little more interesting. In Python, packages are how you obtain any number of useful code libraries, typically from [PyPI](https://pypi.org/). For this example, you use the `matplotlib` and `numpy` packages to create a graphical plot as is commonly done with data science. (Note that `matplotlib` cannot show graphs when running in the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/about) as it lacks the necessary UI support.)

Return to the **Explorer** view (the top-most icon on the left side, which shows files), create a new file called `standardplot.py`, and paste in the following source code:

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 20, 100)  # Create a list of evenly-spaced numbers over the range
plt.plot(x, np.sin(x))       # Plot the sine of each x point
plt.show()                   # Display the plot
```

> **Tip**: If you enter the above code by hand, you may find that auto-completions change the names after the `as` keywords when you press `kbstyle(Enter)` at the end of a line. To avoid this, type a space, then `kbstyle(Enter)`.

Next, try running the file in the debugger using the "Python: Current file" configuration as described in the last section. (If you still have `"stopOnEntry": true` in that configuration, you need to select the run command again to continue.)

Unless you're using an Anaconda distribution or have previously installed the `matplotlib` package, you should see the message, "ModuleNotFoundError: No module named 'matplotlib'". Such a message indicates that the required package isn't available in your system.

To install the `matplotlib` package (which also installs `numpy` as a dependency), stop the debugger and use the Command Palette to run **Terminal: Create New Integrated Terminal** (`kb(workbench.action.terminal.new)`)). This command opens a command prompt for your selected interpreter.

A best practice among Python developers is to avoid installing packages into a global interpreter environment. You instead use a project-specific `virtual environment` that contains a copy of a global interpreter. Once you activate that environment, any packages you then install are isolated from other environments. Such isolation reduces many complications that can arise from conflicting package versions. To create a `virtual environment` and install the required packages, enter the following commands as appropriate for your operating system:

> **Note**: For additional information about virtual environments, see [Environments](/docs/python/environments.md#global-virtual-and-conda-environments).

1. Create and activate the virtual environment

   **For windows**

   ```cmd
   py -3 -m venv env
   env\scripts\activate
   ```

   **For macOS/Linux**

   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

1. Install the packages

   ```bash
   # Don't use with Anaconda distributions because they include matplotlib already.

   # macOS
   python3 -m pip install matplotlib

   # Windows (may require elevation)
   python -m pip install matplotlib

   # Linux (Debian)
   apt-get install python3-tk
   python3 -m pip install matplotlib
   ```

1. Select your new environment by using the **Python: Select Interpreter** command from the **Command Palette**.

1. Rerun the program now (with or without the debugger) and after a few moments a plot window appears with the output:

   ![matplotlib output](images/tutorial/plot-output.png)

1. Once you are finished, type `deactivate` in the terminal window to deactivate the virtual environment.

For additional examples of creating and activating a virtual environment and installing packages, see the [Django tutorial](/docs/python/tutorial-django.md) and the [Flask tutorial](/docs/python/tutorial-flask.md).

## Next steps

You can configure VS Code to use any Python environment you have installed, including virtual and conda environments. You can also use a separate environment for debugging. For full details, see [Environments](/docs/python/environments.md).

To learn more about the Python language, follow any of the [programming tutorials](https://wiki.python.org/moin/BeginnersGuide/Programmers) listed on python.org within the context of VS Code.

To learn to build web apps with the Django and Flask frameworks, see the following tutorials:

- [Use Django in Visual Studio Code](/docs/python/tutorial-django.md)
- [Use Flask in Visual Studio Code](/docs/python/tutorial-flask.md)

There is then much more to explore with Python in Visual Studio Code:

- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Linting](/docs/python/linting.md) - Enable, configure, and apply a variety of Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
- [Deploy Python to Azure App Service using containers](/docs/python/tutorial-deploy-containers.md)
- [Deploy Python to Azure App Service on Linux (Preview)](/docs/python/tutorial-deploy-app-service-on-linux.md)
