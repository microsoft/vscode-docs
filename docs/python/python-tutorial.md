---
Order: 1
Area: python
TOCTitle: Python Tutorial
ContentId: 77828f36-ae45-4887-b25c-34545edd52d3
PageTitle: Get Started Tutorial with Python in Visual Studio Code
DateApproved: 06/20/2018
MetaDescription: A Python hello world tutorial using the Python extension in Visual Studio Code (a great Python IDE like PyCharm, if not the best Python IDE)
MetaSocialImage: images/tutorial/social.png
---
# Getting Started with Python

In this tutorial you use Python 3 to create the simplest Python "Hello World" application in Visual Studio Code. By using the Python extension, you make VS Code into a great lightweight Python IDE (which you may find a productive alternative to PyCharm).

> **Note**: You can use VS Code with Python 2 with this tutorial, but you need to make appropriate changes to the code.

## Prerequisites

To successfully complete this tutorial, you must do the following:

1. Install the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python).

1. Install a version of Python 3 (for which this tutorial is written). Options include:
   - (All operating systems) A download from [python.org](https://www.python.org/downloads/); typically use the **Download Python 3.6.5** button that appears first on the page (or whatever is the latest version).
   - (Linux) The built-in Python 3 installation works well, but to install other Python packages you must run `sudo apt install python3-pip` in the terminal.
   - (MacOS) An installation through [Homebrew](https://brew.sh/) on macOS using `brew install python3` (the system install of Python on macOS is not supported).
   - (All operating systems) A download from [Anaconda](https://www.anaconda.com/download/) (for data science purposes).

1. On Windows, make sure the location of your Python interpreter is included in your PATH environment variable. You can check this by running `path` at the command prompt. If the Python interpreter's folder isn't included, open Windows Settings, search for "environment", select **Edit environment variables for your account**, then edit the **Path** variable to include that folder.

## Start VS Code in a project (workspace) folder

Create an empty folder called "hello", navigate into it, and open VS Code (`code`) in that folder (`.`):

```
mkdir hello
cd hello
code .
```

By starting VS Code in a folder, that folder becomes you "workspace". VS Code stores settings that are specific to that workspace in `.vscode/settings.json`, which are separate from user settings that are stored globally.

## Select a Python interpreter

Python is an interpreted language, and in order to run Python code and get Python IntelliSense, you must tell VS Code which interpreter to use.

From within VS Code, select a Python 3 interpreter by opening the **Command Palette** (`kb(workbench.action.showCommands)`), start typing the **Python: Select Interpreter** command to search, then select the command. You can also use the **Select Python Environment** option on the Status Bar if available (it may already show a selected interpreter, too):

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

The command presents a list of available interpreters that VS Code can find automatically. If you don't see the desired interpreter, see [Configuring Python environments](/docs/python/environments.md).

Selecting an interpreter sets the `python.pythonPath` value in your workspace settings to the path of the interpreter. To see the setting, select **File** > **Preferences** > **Settings**, then select the **Workspace Settings** tab.

> **Note**: If you select an interpreter without a workspace folder open, VS Code sets `python.pythonPath` in your user settings instead, which sets the default interpreter for VS Code in general. The user setting makes sure you always have a default interpreter for Python projects. The workspace settings lets you override the user setting.

## Create a Python Hello World source code file

From the File Explorer toolbar, press the New File button on the `hello` folder:

![File Explorer New File](images/tutorial/toolbar-new-file.png)

Name the file `hello.py`, and it automatically opens in the editor:

![File Explorer hello.py](images/tutorial/hello-py-file-created.png)

By using the `.py` file extension, VS Code interprets this file as Python and evaluates the contents with the Python extension and the selected interpreter.

Next, start entering the following source code if using Python 3:

```python
msg = "Hello World"
print(msg)
```

When you start typing `print`, notice how [IntelliSense](/docs/editor/intellisense.md) presents auto-completion options.

![IntelliSense appearing for Python code](images/tutorial/intellisense01.png)

IntelliSense and auto-completions work for standard Python modules as well as other packages you've installed into the environment of the selected Python interpreter. It also provides completions for methods available on object types. For example, because the `msg` variable contains a string, IntelliSense provides string methods then you type `msg.`:

![IntelliSense appearing for a variable whose type provides methods](images/tutorial/intellisense02.png)

Feel free to experiment with IntelliSense some more, but then revert changes so you have only the `msg` variable and the `print` call, and save the file (`kb(workbench.action.files.save)`).

For full details on editing, formatting, and refactoring, see [Editing code](/docs/python/editing.md). The Python extension also has full support for [Linting](/docs/python/linting.md).

## Run Hello World

It's simple to run `hello.py` with Python. Right-click in the editor and select **Run Python File in Terminal** (which saves the file automatically):

![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

The command opens a terminal panel in which your Python interpreter is automatically activated, then runs `python3 hello.py` (Mac/Linux) or `python hello.py` (Windows):

![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

There are two other ways you can run Python within VS Code:

- Select one or more lines, then press `kbstyle(Shift+Enter)` or right-click and select **Run Selection/Line in Python Terminal**. This command is very convenient for testing just a part of a file.
- Use the **Python: Start REPL** command to opens a REPL terminal for the currently selected Python interpreter. In the REPL you can then enter and run lines of code one at a time.

## Configure and run the debugger

Let's now try debugging our simple Hello World program.

First, set a breakpoint on line 2 of `hello.py` by placing the cursor on the `print` call and pressing `kb(editor.debug.action.toggleBreakpoint)`. Alternately, just click in the editor left gutter next to the line numbers. A red circle  appears in the gutter.

![Setting a breakpoint in hello.py](images/tutorial/breakpoint-set.png)

Next, select the Debug View in the sidebar:

![Debug icon](images/tutorial/debug-icon.png)

Then select the settings icon on the debug toolbar (or use the **Debug** > **Open configurations** menu command):

![Debug toolbar settings command](images/tutorial/debug-settings.png)

The command opens a menu of available debuggers, which shows **Python** and **Python Experimental**. Select **Python**. The Python extension then creates a `launch.json` file that contains a number of configurations, which appear in the configurations drop-down:

![Debug configurations after launch.json is created](images/tutorial/debug-configurations.png)

**Note**: VS Code uses JSON files for all of its various configurations; `launch.json` is the standard name for a file containing debugging configurations.

These different configurations are fully explained in [Debugging](/docs/python/debugging.md); for now, just select "Python: Current File", which is the configuration that runs the current file shown in the editor using the currently selected Python interpreter.

To automatically stop the debugger on the first line when the program starts, add a `"stopOnEntry": true` setting to the "Python: Current File" configuration in `launch.json`, so that the whole configuration appears as follows:

```json
{
    "name": "Python: Current File",
    "type": "python",
    "request": "launch",
    "program": "${file}",
    "stopOnEntry": true
},
```

Save `launch.json`, switch to `hello.py` in the editor, then run the debugger by selecting the green arrow in the Debug toolbar or pressing `kb(workbench.action.debug.start)`. Because `stopOnEntry` is set to true, the debugger stops on the first line of the file. The current line is indicated with a yellow arrow in the left margin. If you examine the **Local** variables window at this point, you see that only automatic dunder variables are defined:

![Debugging step 1 - stop on entry](images/tutorial/debug-step-01.png)

A debug toolbar appears along the top with the following commands from left to right: run (`kb(workbench.action.debug.start)`), step over (`kb(workbench.action.debug.stepOver)`), step into (`kb(workbench.action.debug.stepInto)`), step out (`kb(workbench.action.debug.stepOut)`), restart (`kb(workbench.action.debug.restart)`), and stop (`kb(workbench.action.debug.stop)`).

![Debugging toolbar](images/tutorial/debug-toolbar.png)

The Status Bar also changes color (orange in many themes) to indicate debug mode. The **Python Debug Console** also appears automatically in the lower right panel to show the commands being run along with program output.

To continue running the program, select the run command on the debug toolbar (`kb(workbench.action.debug.start)`) or the green arrow in the Debug view. The debugger runs the program to the next breakpoint. The now-defined `msg` variable appears in the **Local** pane

![Debugging step 2 - variable defined](images/tutorial/debug-step-02.png)

You can also work with variables in the **Debug Console** (If you don't see it, select **Debug Console** in the lower right area of VS Code, or select it from the **...** menu.) Then try entering the following lines, one by one, at the **>** prompt at the bottom of the console:

```python
msg
msg.capitalize()
msg.split()
```

![Debugging step 3 - using the debug console](images/tutorial/debug-step-03.png)

Select the green arrow again to run the program to completion. "Hello World" appears in the **Python Debug Console** if you switch back to it, and VS Code exits debugging mode once the program is complete.

If you restart the debugger, remember that you set `stopOnEntry` in the configuration so that the debugger stops before running any code. To run all the way to the first breakpoint, remove that entry from the configuration.

To stop running a program before it's complete, use the red square stop button on the debug toolbar (`kb(workbench.action.debug.stop)`), or use the **Debug > Stop debugging** menu command.

For full details, see [Debugging](/docs/python/debugging.md), which includes details on how to use a use a specific Python interpreter for debugging.

### Troubleshooting

If for some reason VS Code doesn't generate `launch.json` for you, create a file by that name within the folder named `.vscode` folder (creating it if you need to), then paste the following contents into `launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}"
        }
    ]
}
```

If you see "SyntaxError: invalid syntax" as shown below, you attempted to start to debugger when `launch.json` is currently showing in the editor, which is not Python code like `hello.py`:

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
            "program": "hello.py"
        },
```

## Install and use packages

Let's now run an example that's a little more interesting. In Python, packages are how you obtain any number of useful code libraries, typically from [PyPi](https://pypi.org/). For this example you use the matplotlib and numpy packages to create a graphical plot as commonly done with data science.

Return to the **Explorer** view (the top-most icon on the left side, which shows files), create a new file called `standardplot.py`, and paste in the following source code:

```python
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np

x = np.linspace(0, 20, 100)  # Create a list of evenly-spaced numbers over the range
plt.plot(x, np.sin(x))       # Plot the sine of each x point
plt.show()                   # Display the plot
```

> **Tip**: if you enter the above code by hand, you may find that auto-completions change the names after the `as` keywords when you press Enter at the end of a line. To avoid this, type a space, then Enter.

Next, try running the file in the debugger using the "Python: Current file" configuration as described in the last section. (If you still have `"stopOnEntry": true` in that configuration, you need to select the run command again to continue.)

Unless you're using an Anaconda distribution or have previously installed the matplotlib package, you should see the message, "ModuleNotFoundError: No module named 'matplotlib'".

To install that packages (which also installed numpy), switch to the **Terminal** that is already open (the terminal type should be "Python Debug Console" indicating that it has the selected interpreter activated). Then enter the following commands as appropriate for your operating system:

```bash
# Windows
pip install matplotlib

# MacOS
pip3 install matplotlib

# Linux
sudo apt-get install python3-tk
pip3 install matplotlib
```

Rerun the program now and after a few moments a plot window appears with the output:

![matplotlib output](images/tutorial/plot-output.png)

## Next steps

You can configure VS Code to use any Python environment you have installed, including virtual and conda environments. You can also use a separate environment for debugging. For full details, see [Environments](/docs/python/environments.md).

There is then much more to explore with Python in Visual Studio Code:

- [Python environments](/docs/python/environments.md) - Control which Python interpreter is used for editing and debugging.
- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Linting](/docs/python/linting.md) - Enable, configure, and apply a variety of Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
