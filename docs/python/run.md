---
Order:
Area: python
TOCTitle: Run Python Code
ContentId:
PageTitle: Running Python Code in Visual Studio Code
DateApproved: 09/05/2024
MetaDescription: Running Python Code in Visual Studio Code
MetaSocialImage: images/tutorial/python-social.png
---

# Running Python in Visual Studio Code

Whether you are experimenting with smaller lines of code in a REPL or ready to run your whole project, the Python extension offers a number of ways to run Python code.

## Interactively running Python code

The Python interpreter installed on your machine allows for what’s known as an interactive REPL (Read-Evaluate-Print Loop), which reads a piece of code, evaluates it, and then prints the result to the console. You can interact with a Python REPL outside of VS Code by searching for the Terminal / Command Prompt on you system, and type `python` (Windows) or `python3` (macOS/Linux) to activate the Python REPL, notated by `>>>`. Within VS Code, there are two ways you can interact with a Python REPL.

### Terminal REPL

Similar to how you can interact with the Python REPL outside of VS Code, you can open a Terminal within VS Code and activate a Python REPL. To do so, you can either open a Terminal via **Open > Terminal** and use `python` (Windows) or `python3` (macOS/Linux) command to activate `>>>` or you can use the Command Palette (`kb(workbench.action.showCommands)`) and search for **Python: Open Terminal REPL** which opens a terminal for the currently selected Python interpreter.

### Native REPL

The VS Code Native REPL for Python builds upon the classic Python REPL including features such as Intellisense and syntax highlighting to make your Python development experience more efficient. **ADD SOMETHING ABOUT THE VARIABLE VIEWER!!!!!** However, this REPL still adheres to principles present in the REPL built-in to Python itself, in that history is immutable.

You can open this REPL via the Command Palette (`kb(workbench.action.showCommands)`) by searching for **Python: Open Native REPL**. Furthermore, you can send code to the Native REPL via Smart Send (`kbstyle(Shift+Enter)`) and **Run Selection/Line** byb setting `"python.REPL.sendToNativeREPL": true` in your `settings.json` file. You can opt to continue to use the REPL built-in to Python located in the terminal ( `>>>` ) by setting `"python.REPL.sendToNativeREPL": false` in your `settings.json`.

## Run code within your Python project

Whether you are running a single line, a single file, or an entire Python application, there are a number of ways the Python extension allows you to run Python code.

1. Click the **Run Python File in Terminal** play button in the top-right side of the editor.

![Using the Run Python File in Terminal button](images/tutorial/run-python-file-in-terminal-button.png)

The button opens a terminal panel in which your Python interpreter is automatically activated, then runs `python3 hello.py` (macOS/Linux) or `python hello.py` (Windows):

![Program output in a Python terminal](images/tutorial/output-in-terminal.png)

2. Right-click anywhere in the editor window and select **Run > Python File in Terminal** (which saves the file automatically):

   ![Run Python File in Terminal command in the Python editor](images/tutorial/run-python-file-in-terminal.png)

3. Select one or more lines, then press `kbstyle(Shift+Enter)` or right-click and select **Run Selection/Line in Python Terminal**. This command is convenient for testing just a part of a file.

### Smart Send

The Python extension enables Smart Send on (`kbstyle(Shift+Enter)`) by default. Smart Send looks at the code where you cursor is placed, and sends the smallest runnable chunk of code to the Python REPL and then places your cursor at the next line of code. This allows you to more easily and efficiently execute Python code in your program.

Smart Send will not work on unsupported versions of Python (i.e. Python 2). To disable Smart Send in favor or only sending the line of code at which your cursor is placed, **ADD SETTING NAME**.
