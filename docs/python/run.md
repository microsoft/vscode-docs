---
ContentId:
DateApproved: 09/11/2025
MetaDescription: Running Python Code in Visual Studio Code
MetaSocialImage: images/tutorial/python-social.png
---
# Running Python code in Visual Studio Code

Whether you are experimenting with smaller lines of Python code in the REPL or ready to run a Python script, the Python extension offers multiple ways to run your code.

## Interactively running Python code

The Python interpreter that is installed on your machine gives you what's known as an interactive REPL (Read-Evaluate-Print Loop), which reads a piece of code, evaluates it, and then prints the result to the console.

After installing a Python interpreter on your machine, you can interact with the Python REPL by opening the terminal or command prompt on your system, and typing `python` (Windows) or `python3` (macOS/Linux) to activate the Python REPL, notated by `>>>`.

There are two additional ways you can interact with a Python REPL in VS Code.

### Native REPL

The VS Code Native REPL for Python builds upon the classic Python REPL and provides additional features, such as Intellisense and syntax highlighting to make your Python development experience more efficient. However, this REPL still adheres to principles present in the REPL built-in to Python itself, in that historical execution order and its content are immutable.

You can open the Native REPL via the Command Palette (`kb(workbench.action.showCommands)`) by searching for **Python: Start Native REPL**. Furthermore, you can send code to the Native REPL via Smart Send (`kbstyle(Shift+Enter)`) and **Run Selection/Line in Python REPL** by setting `"python.REPL.sendToNativeREPL": true` in your `settings.json` file. You can opt to continue to use the REPL built-in to Python located in the terminal ( `>>>` ) by setting `"python.REPL.sendToNativeREPL": false` in your `settings.json`.

![Gif showing the Native REPL for Python.](images/shared/nativeREPL-demo.gif)

### Terminal REPL

Similar to how you can interact with the Python REPL outside of VS Code, you can open a terminal within VS Code and activate a Python REPL. To do so, you can search in the Command Palette (`kb(workbench.action.showCommands)`) for **Python: Start Terminal REPL**, which opens a terminal for the currently selected Python interpreter. Alternatively, you can navigate to **Terminal > New Terminal** and enter the `python` (Windows) or `python3` (macOS/Linux) command.

There are a number of features supported in the terminal via [Terminal Shell Integration](https://code.visualstudio.com/docs/terminal/shell-integration), such as run recent command, command decorators, and improved accessibility. To enable or disable shell integration in the terminal, you can toggle `setting(python.terminal.shellIntegration.enabled)` in your settings.

## Run Python code

The Python extension offers various ways to run Python code without extra configuration.

1. Select the **Run Python File in Terminal** play button in the top-right of the editor.

    ![Using the Run Python File in Terminal button](images/tutorial/run-python-file-in-terminal-button.png)

    The button opens a terminal panel in which your Python interpreter is automatically activated, then runs the specified script (for example, `python3 hello.py` (macOS/Linux) or `python hello.py` (Windows)):

    ![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

2. Right-click anywhere in the editor window, and then select **Run > Python File in Terminal** (which saves the file automatically):

   ![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

3. Select one or more lines, then press `kbstyle(Shift+Enter)`, or right-click and select **Run Selection/Line in Python Terminal**.

    This option is convenient for testing just a part of a file.

4. Place your cursor on a line of code and press `kbstyle(Shift+Enter)` to activate Smart Send.

### Smart Send

The Python extension enables Smart Send (`kbstyle(Shift+Enter)`) by default. Smart Send looks at the code where the cursor is placed, sends the smallest runnable chunk of code to the Python REPL, and then places your cursor at the next line of code. This enables you to easily and efficiently run Python code in your program.

Smart Send will not work on unsupported versions of Python (for example, Python 2) or invalid Python code. To disable Smart Send in favor of only sending code at the line which your cursor is placed, set `python.REPL.enableREPLSmartSend` to `false`.

## See also

- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
