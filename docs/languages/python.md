---
Order: 11
Area: languages
TOCTitle: Python
ContentId: c2cb770d-571d-4edf-9eb9-b5b8977c21a0
PageTitle: Python in Visual Studio Code
DateApproved: 02/14/2018
MetaDescription: Learn about Visual Studio Code features (code completion, debugging, snippets, linting) for Python.
---
# Python in Visual Studio Code

Working with Python in Visual Studio Code, using the [Microsoft Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), is simple, fun, and productive. The extension works with different Python interpreters as well as Anaconda. It leverages all of VS Code's power to provide auto complete and IntelliSense, linting, debugging, and unit testing, along with the ability to easily switch between Python environments, including virtual and conda environments.

## Install Python and the Python extension

The [tutorial](/docs/python/python-tutorial.md) guides you through installing Python and using the extension.

## Autocomplete and IntelliSense

The Python extension supports code completion and Intellisense. [Intellisense](/docs/editor/intellisense.md) is a general term for a number of features, including intelligent code completion (in-context method and variable suggestions) across all your files and for built-in and third-party modules.

IntelliSense quickly shows methods, class members, and documentation as you type, and you can trigger completions at any time with `kb(editor.action.triggerSuggest)`.

<video id="python-code-completion-video" src="https://az754404.vo.msecnd.net/public/python-intellisense.mp4" poster="/images/python_python-intellisense-placeholder.png" autoplay loop controls muted></video>

## Linting

Linting analyzes your Python code for potential errors, making it easy to navigate to and correct different problems.

The Python extension can apply a number of different linters including Pylint, Pep8, Flake8, mypy, pydocstule, prospector, and pylama. See [Linting](/docs/python/linting.md).

<video id="python-linting-video" src="https://az754404.vo.msecnd.net/public/python-linting.mp4" poster="/images/python_python-linting-placeholder.png" autoplay loop controls muted></video>

## Debugging

No more `print` statement debugging! Set breakpoints, inspect data, and use the debug console as you run your program step by step. Debug a number of different type of Python applications, including multi-threaded, web, and remote applications.

For Python-specific details, including setting up your `launch.json` configuration, see [Debugging](/docs/python/debugging.md). General VS Code debugging information is found in the [debugging document](/docs/editor/debugging.md).

<video id="python-debugging-video" src="https://az754404.vo.msecnd.net/public/python-debugging.mp4" poster="/images/python_python-debugging-placeholder.png" autoplay loop controls muted></video>

## Snippets

Snippets take productivity to the next level. You can configure [your own snippets](/docs/editor/userdefinedsnippets.md) and use snippets provided by an extension. Snippets appear in the same way as code completion `kb(editor.action.triggerSuggest)`.

<video id="python-snippets-video" src="https://az754404.vo.msecnd.net/public/python-snippets.mp4" poster="/images/python_python-snippets-placeholder.png" autoplay loop controls muted></video>

## Environments

The Python extension automatically detects Python interpreters that are installed in standard locations. It also detects conda environments as well as virtual environments in the workspace folder. See [Configuring Python environments](/docs/python/environments.md).

The current environment is shown on the left side of the Visual Studio Code status bar:

![Selected Python interpreter in the status bar](images/python/selected-interpreter-status-bar.png)

This environment is used for IntelliSense, auto-completions, linting, formatting, and any other language-related feature other than debugging. It is also activated when you use [run Python in a terminal](#run-python-in-the-terminal).

To change the current interpreter, which includes switching to conda or virtual environments, click the interpreter on the status bar or use the **Python: Select Interpreter** command.

![Python: Select Interpreter command](images/python/select-interpreters-command.png)

VS Code then prompts you with a list of detected environments as well as any you've added manually to your user settings (see [Configuring Python environments](/docs/python/environments.md)).

## Run Python in the Terminal

The Python extension provides shortcuts to quickly run Python code in the current interpreter:

- From the editor: right-click anywhere in the editor and select **Run Python File in Terminal**. If invoked on a selection, only that selection is run.
- From Explorer: right-click a Python file and select **Run Python File in Terminal**.

You can also use the **Python: Create Terminal** command to create a terminal with the current environment activated.

## Unit testing

The Python extension supports [unit testing](/docs/python/unit-testing.md) with the unittest, pytest, and nose test frameworks.

To run unit tests, you enable one of the frameworks in settings. Each framework also has specific settings, such as arguments that identify paths and patterns for test discovery.

Once discovered, VS Code provides a variety of commands (on the status bar, the command palette, and elsewhere) to run and debug tests, including ability to run individual test files and individual methods.

## Configuration

The Python extension provides a wide variety of settings for its various features. These are described on their relevant topics, such as [Editing code](/docs/python/editing.md), [Linting](/docs/python/linting.md), [Debugging](/docs/python/debugging.md), and [Unit Testing](/docs/python/unit-testing.md). The complete list is found in the [Settings reference](/docs/python/settings-reference.md).

## Other popular Python extensions

Additional Python language support can be added to to VS Code by installing other popular Python extensions. For Jupyter support, we recommend the "Jupyter" extension from Don Jayamanne.

1. Open the **Extensions** view (`kb(workbench.view.extensions)`).
1. Filter the extension list by typing 'python'.

<div class="marketplace-extensions-python"></div>

The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com/vscode).

## Next steps

- [Python tutorial](/docs/python/python-tutorial.md) - Walk through the core features of Python in VS Code.
- [Editing Python](/docs/python/editing.md) - Learn about auto-completion, formatting, and refactoring for Python.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
