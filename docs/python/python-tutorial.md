---
Order: 1
Area: python
TOCTitle: Python Tutorial
ContentId: 77828f36-ae45-4887-b25c-34545edd52d3
PageTitle: Get Started Tutorial with Python in Visual Studio Code
DateApproved: 10/26/2017
MetaDescription: Tutorial for the Python extension in Visual Studio Code
MetaSocialImage: TBD
---
# Python Tutorial in VS Code

(Talk about Python itself, as this is the landing page)

## Install the Python extension

# Hello World

Let's get started by creating the simplest "Hello World" Python application.

Create an empty folder called "hello", navigate into it, and open VS Code:

```bash
mkdir hello
cd hello
code .
```

>**Tip:** You can open files or folders directly from the command line.  The period '.' refers to the current folder, therefore VS Code will start and open the `Hello` folder.

From the File Explorer tool bar, press the New File button:

![File Explorer New File](images/tutorial/toolbar-new-file.png)

and name the file `hello.py`:

![File Explorer hello.py](images/tutorial/hello-py-file-created.png)

By using the `.py` file extension, VS Code interprets this file as Python and evaluates the contents with the Python extension.

Create a simple string variable in `hello.py` and send the contents of the string to the console:

```python
var msg = 'Hello World';
print(msg)
```

Note that when you start typing `print`, [IntelliSense](/docs/editor/intellisense.md) presents auto-completion options.

![console IntelliSense](images/nodejs/consoleintellisense.png)

Also notice that VS Code knows that `msg` is a string based on the initialization to `'Hello World'`.  If you type `msg.` IntelliSense shows methods functions available a string.

![string IntelliSense](images/nodejs/stringintellisense.png)

After experimenting with IntelliSense, revert any extra changes from the source code example above and save the file (`kb(workbench.action.files.save)`).


### Running Hello World

It's simple to run `hello.py` with Python. From a terminal, just type:

```bash
python hello.py
```

You should see "Hello World" output to the terminal and then Python returns.

### Integrated Terminal

VS Code has an [integrated terminal](/docs/editor/integrated-terminal.md) which you can use to run shell commands. You can run Python directly from there and avoid switching out of VS Code while running command line tools.

**View** > **Integrated Terminal** (`kb(workbench.action.terminal.toggleTerminal)` with the backtick character) opens the integrated terminal and you can run `python hello.py` there:

![integrated terminal](images/nodejs/integrated-terminal.png)

For this walkthrough, you can use either an external terminal or the VS Code integrated terminal for running the command line tools.

### Debugging Hello World

As mentioned in the introduction, the Python extension provides support for debugging Python. Let's try debugging our simple Hello World application.

To set a breakpoint in `hello.py`, put the editor cursor on the first line and press `kb(editor.debug.action.toggleBreakpoint)` or click in the editor left gutter next to the line numbers. A red circle  appears in the gutter.

![app.js breakpoint set](images/nodejs/app-js-breakpoint-set.png)

To start debugging, select the Debug View in the Side Bar:

![Debug icon](images/nodejs/debugicon.png)

You can now click Debug tool bar green arrow or press `kb(workbench.action.debug.start)` to launch and debug "Hello World". Your breakpoint is hit and you can view and step through the simple application.  Notice that VS Code displays an orange Status Bar to indicate it is in Debug mode and the DEBUG CONSOLE is displayed.

![hello world debugging](images/nodejs/hello-world-debugging.png)




## Next Steps

There is much more to explore with Python in Visual Studio Code:

* [Advanced Configurations](/docs/python/advanced-config.md) - Learn how to customize VS Code for how you like to work.

## Common Questions

**Q: How can I blah with Python?**

**A**: The answer.