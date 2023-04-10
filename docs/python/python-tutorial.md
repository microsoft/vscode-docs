---
Order: 1
Area: python
TOCTitle: Tutorial
ContentId: 77828f36-ae45-4887-b25c-34545edd52d3
PageTitle: Get Started Tutorial for Python in Visual Studio Code
DateApproved: 1/20/2023
MetaDescription: A Python hello world tutorial using the Python extension in Visual Studio Code (a great Python IDE like PyCharm, if not the best Python IDE)
MetaSocialImage: images/tutorial/social.png
---
# Getting Started with Python in VS Code

In this tutorial, you will use Python 3 to create a simple Python "Hello World" application in Visual Studio Code. By using the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), you turn VS Code into a great, lightweight Python editor (which you may find a productive alternative to PyCharm).

This tutorial introduces you to VS Code for Python development - primarily how to edit, run, and debug code through the following tasks:

- Write, run, and debug a Python "Hello World" Application
- Learn how to install packages by creating Python virtual environments
- Write a simple Python script to plot figures within VS Code

This tutorial is not intended to teach you Python itself. Once you are familiar with the basics of VS Code, you can then follow any of the [programming tutorials on python.org](https://wiki.python.org/moin/BeginnersGuide) within the context of VS Code for an introduction to the language.

If you have any problems, you can search for answers or ask a question on the [Python extension Discussions Q&A](https://github.com/microsoft/vscode-python/discussions/categories/q-a).

## Prerequisites

To successfully complete this tutorial, you need to first setup your Python development environment. Specifically, this tutorial requires:

- Python 3
- VS Code
- [VS Code Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

## Install Visual Studio Code and the Python Extension

1. If you have not already done so, install [VS Code](https://code.visualstudio.com/).
2. Next, install the [Python extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python) from the Visual Studio Marketplace. For additional details on installing extensions, see [Extension Marketplace](/docs/editor/extension-marketplace.md). The Python extension is named **Python** and it's published by Microsoft.

   [![Python extension on Marketplace](images/tutorial/python-extension-marketplace.png)](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

## Install a Python interpreter

Along with the Python extension, you need to install a Python interpreter. Which interpreter you use is dependent on your specific needs, but some guidance is provided below.

### Windows

Install [Python from python.org](https://www.python.org/downloads/). You can typically use the **Download Python** button that appears first on the page to download the latest version.

>**Note**: If you don't have admin access, an additional option for installing Python on Windows is to use the Microsoft Store. The Microsoft Store provides installs of [supported Python versions](https://apps.microsoft.com/store/search?publisher=Python%20Software%20Foundation).

For additional information about using Python on Windows, see [Using Python on Windows at Python.org](https://docs.python.org/3.9/using/windows.html)

### macOS

The system install of Python on macOS is not supported. Instead, a package management system like  [Homebrew](https://brew.sh/) is recommended. To install Python using Homebrew on macOS use `brew install python3` at the Terminal prompt.

> **Note** On macOS, make sure the location of your VS Code installation is included in your PATH environment variable.  See [these setup instructions](/docs/setup/mac.md#launching-from-the-command-line) for more information.

### Linux

The built-in Python 3 installation on Linux works well, but to install other Python packages you must install `pip` with [get-pip.py](https://pip.pypa.io/en/stable/installation/#get-pip-py).

### Other options

- **Data Science**: If your primary purpose for using Python is Data Science, then you might consider a download from [Anaconda](https://www.anaconda.com/download/). Anaconda provides not just a Python interpreter, but many useful libraries and tools for data science.

- **Windows Subsystem for Linux**: If you are working on Windows and want a Linux environment for working with Python, the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about) (WSL) is an option for you. If you choose this option, you'll also want to install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). For more information about using WSL with VS Code, see [VS Code Remote Development](/docs/remote/remote-overview.md) or try the [Working in WSL tutorial](/docs/remote/wsl-tutorial.md), which will walk you through setting up WSL, installing Python, and creating a Hello World application running in WSL.

## Verify the Python installation

To verify that you've installed Python successfully on your machine, run one of the following commands (depending on your operating system):

- Linux/macOS: open a Terminal Window and type the following command:

    ```bash
    python3 --version
    ```

- Windows: open a command prompt and run the following command:

    ```bat
    py -3 --version
    ```

If the installation was successful, the output window should show the version of Python that you installed.

   > **Note** You can use the `py -0` command in the VS Code integrated terminal to view the versions of python installed on your machine. The default interpreter is identified by an asterisk (*).

## Start VS Code in a workspace folder

By starting VS Code in a folder, that folder becomes your "workspace". VS Code stores settings that are specific to that workspace in `.vscode/settings.json`, which are separate from user settings that are stored globally.

Using a command prompt or terminal, create an empty folder called "hello", navigate into it, and open VS Code (`code`) in that folder (`.`) by entering the following commands:

```bash
mkdir hello
cd hello
code .
```

>**Note**: If you're using an Anaconda distribution, be sure to use an Anaconda command prompt.


Alternately, you can run VS Code through the operating system UI, then use **File > Open Folder** to open the project folder.

## Select a Python interpreter

Python is an interpreted language. Thus, in order to run Python code and get Python IntelliSense, you must tell VS Code which interpreter to use.

From within VS Code, select a Python 3 interpreter by opening the **Command Palette** (`kb(workbench.action.showCommands)`), start typing the **Python: Select Interpreter** command to search, then select the command. You can also use the **Select Python Environment** option on the Status Bar if available (it may already show a selected interpreter, too):

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

The command presents a list of available interpreters that VS Code can find automatically, including virtual environments. If you don't see the desired interpreter, see [Configuring Python environments](/docs/python/environments.md).

![Select an Interpreter](images/tutorial/interpreter.png)

> **Note**: When using an Anaconda distribution, the correct interpreter should have the suffix `('base':conda)`, for example `Python 3.7.3 64-bit ('base':conda)`.

Selecting an interpreter sets which interpreter will be used by the Python extension for that workspace.

> **Note**: If you select an interpreter without a workspace folder open, VS Code sets `python.defaultInterpreterPath` in User scope instead, which sets the default interpreter for VS Code in general. The user setting makes sure you always have a default interpreter for Python projects. The workspace settings lets you override the user setting.

## Create a Python Hello World source code file

From the File Explorer toolbar, select the **New File** button on the `hello` folder:

![File Explorer New File](images/tutorial/toolbar-new-file.png)

Name the file `hello.py`, and it automatically opens in the editor:

![File Explorer hello.py](images/tutorial/hello-py-file-created.png)

By using the `.py` file extension, you tell VS Code to interpret this file as a Python program, so that it evaluates the contents with the Python extension and the selected interpreter.

>**Note**: The File Explorer toolbar also allows you to create folders within your workspace to better organize your code. You can use the **New folder** button to quickly create a folder.

Now that you have a code file in your Workspace, enter the following source code in `hello.py`:

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

It's simple to run `hello.py` with Python. Just click the **Run Python File in Terminal** play button in the top-right side of the editor.

![Using the run python file in terminal button](images/tutorial/run-python-file-in-terminal-button.png)

The button opens a terminal panel in which your Python interpreter is automatically activated, then runs `python3 hello.py` (macOS/Linux) or `python hello.py` (Windows):

![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

There are three other ways you can run Python code within VS Code:

- Right-click anywhere in the editor window and select **Run Python File in Terminal** (which saves the file automatically):

   ![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

- Select one or more lines, then press `kbstyle(Shift+Enter)` or right-click and select **Run Selection/Line in Python Terminal**. This command is convenient for testing just a part of a file.
- From the Command Palette (`kb(workbench.action.showCommands)`), select the **Python: Start REPL** command to open a REPL terminal for the currently selected Python interpreter. In the REPL, you can then enter and run lines of code one at a time.

## Configure and run the debugger

Let's now try debugging our simple Hello World program.

First, set a breakpoint on line 2 of `hello.py` by placing the cursor on the `print` call and pressing `kb(editor.debug.action.toggleBreakpoint)`. Alternately, just click in the editor's left gutter, next to the line numbers. When you set a breakpoint, a red circle appears in the gutter.

![Setting a breakpoint in hello.py](images/tutorial/breakpoint-set.png)

Next, to initialize the debugger, press `kb(workbench.action.debug.start)`. Since this is your first time debugging this file, a configuration menu will open from the Command Palette allowing you to select the type of debug configuration you would like for the opened file.

![Debug configurations after launch.json is created](images/tutorial/debug-configurations.png)

**Note**: VS Code uses JSON files for all of its various configurations; `launch.json` is the standard name for a file containing debugging configurations.

These different configurations are fully explained in [Debugging configurations](/docs/python/debugging.md); for now, just select **Python File**, which is the configuration that runs the current file shown in the editor using the currently selected Python interpreter.

You can also start the debugger by clicking on the down-arrow next to the run button on the editor, and selecting **Debug Python File in Terminal**.

![Using the debug Python file in terminal button](images/tutorial/debug-python-file-in-terminal-button.png)

The debugger will stop at the first line of the file breakpoint. The current line is indicated with a yellow arrow in the left margin. If you examine the **Local** variables window at this point, you will see now defined `msg` variable appears in the **Local** pane.

![Debugging step 2 - variable defined](images/tutorial/debug-step-02.png)

A debug toolbar appears along the top with the following commands from left to right: continue (`kb(workbench.action.debug.start)`), step over (`kb(workbench.action.debug.stepOver)`), step into (`kb(workbench.action.debug.stepInto)`), step out (`kb(workbench.action.debug.stepOut)`), restart (`kb(workbench.action.debug.restart)`), and stop (`kb(workbench.action.debug.stop)`).

![Debugging toolbar](images/tutorial/debug-toolbar.png)

The Status Bar also changes color (orange in many themes) to indicate that you're in debug mode. The **Python Debug Console** also appears automatically in the lower right panel to show the commands being run, along with the program output.

To continue running the program, select the continue command on the debug toolbar (`kb(workbench.action.debug.start)`). The debugger runs the program to the end.

> **Tip** Debugging information can also be seen by hovering over code, such as variables. In the case of `msg`, hovering over the variable will display the string `Hello world` in a box above the variable.

You can also work with variables in the **Debug Console** (If you don't see it, select **Debug Console** in the lower right area of VS Code, or select it from the **...** menu.) Then try entering the following lines, one by one, at the **>** prompt at the bottom of the console:

```python
msg
msg.capitalize()
msg.split()
```

![Debugging step 3 - using the debug console](images/tutorial/debug-step-03.png)

Select the blue **Continue** button on the toolbar again (or press F5) to run the program to completion. "Hello World" appears in the **Python Debug Console** if you switch back to it, and VS Code exits debugging mode once the program is complete.

If you restart the debugger, the debugger again stops on the first breakpoint.

To stop running a program before it's complete, use the red square stop button on the debug toolbar (`kb(workbench.action.debug.stop)`), or use the **Run > Stop debugging** menu command.

For full details, see [Debugging configurations](/docs/python/debugging.md), which includes notes on how to use a specific Python interpreter for debugging.

> **Tip: Use Logpoints instead of print statements**: Developers often litter source code with `print` statements to quickly inspect variables without necessarily stepping through each line of code in a debugger. In VS Code, you can instead use **Logpoints**. A Logpoint is like a breakpoint except that it logs a message to the console and doesn't stop the program. For more information, see [Logpoints](/docs/editor/debugging.md#logpoints) in the main VS Code debugging article.

## Install and use packages

Let's now run an example that's a little more interesting. In Python, packages are how you obtain any number of useful code libraries, typically from [PyPI](https://pypi.org/). For this example, you use the `matplotlib` and `numpy` packages to create a graphical plot as is commonly done with data science. (Note that `matplotlib` cannot show graphs when running in the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about) as it lacks the necessary UI support.)

Return to the **Explorer** view (the top-most icon on the left side, which shows files), create a new file called `standardplot.py`, and paste in the following source code:

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 20, 100)  # Create a list of evenly-spaced numbers over the range
plt.plot(x, np.sin(x))       # Plot the sine of each x point
plt.show()                   # Display the plot
```

> **Tip**: If you enter the above code by hand, you may find that auto-completions change the names after the `as` keywords when you press `kbstyle(Enter)` at the end of a line. To avoid this, type a space, then `kbstyle(Enter)`.

Next, try running the file in the debugger using the "Python: Current file" configuration as described in the last section.

Unless you're using an Anaconda distribution or have previously installed the `matplotlib` package, you should see the message, **"ModuleNotFoundError: No module named 'matplotlib'"**. Such a message indicates that the required package isn't available in your system.

To install the `matplotlib` package (which also installs `numpy` as a dependency), stop the debugger and use the Command Palette to run **Terminal: Create New Terminal** (`kb(workbench.action.terminal.new)`). This command opens a command prompt for your selected interpreter.

A best practice among Python developers is to avoid installing packages into a global interpreter environment. You instead use a project-specific `virtual environment` that contains a copy of a global interpreter. Once you activate that environment, any packages you then install are isolated from other environments. Such isolation reduces many complications that can arise from conflicting package versions. To create a *virtual environment* and install the required packages, enter the following commands as appropriate for your operating system:

> **Note**: For additional information about virtual environments, see [Environments](/docs/python/environments.md#creating-environments).

1. Create a virtual environment using the Create Environment command

   From within VS Code, you can create non-global environments, using Venv or Anaconda, by opening the Command Palette (`kb(workbench.action.showCommands)`), start typing the **Python: Create Environment** command to search, and then select the command. You can also trigger the **Python: Create Environment** command through the Getting Started with Python page.

   The command presents a list of environment types, Venv or Conda. For this example, select **Venv**.

   ![Create Environment dropdown](images/environments/create_environment_dropdown.png)

   The command then presents a list of interpreters that can be used for your project.

   ![Virtual environment interpreter selection](images/environments/interpreters-list.png)



   After selecting the desired interpreter, a notification will show the progress of the environment creation and the environment folder will appear in your workspace.

   ![Create environment status notification](images/environments/create_environment_prompt_status.png)

   The command will also install necessary packages outlined in a requirements/dependencies file, such as `requirements.txt`, `pyproject.toml`, or `environment.yml`, located in the project folder.

   > **Note**: If you want to create an environment manually, or run into error in the environment creation process, visit the [Environments](/docs/python/environments.md#create-a-virtual-environment-in-the-terminal) page.

1. Ensure your new environment is selected by using the **Python: Select Interpreter** command from the **Command Palette**.

   ![Select an Interpreter](images/tutorial/interpreter-venv.png)
1. Install the packages

   ```bash
   # Don't use with Anaconda distributions because they include matplotlib already.

   # macOS
   python3 -m pip install matplotlib

   # Windows (may require elevation)
   py -m pip install matplotlib

   # Linux (Debian)
   apt-get install python3-tk
   python3 -m pip install matplotlib
   ```

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
- [Deploy Python to Azure App Service](https://learn.microsoft.com/azure/developer/python/tutorial-containerize-deploy-python-web-app-azure-01)
- [Deploy Python to Container Apps](https://learn.microsoft.com/azure/developer/python/tutorial-deploy-python-web-app-azure-container-apps-01)
