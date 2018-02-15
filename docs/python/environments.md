---
Order: 5
Area: python
TOCTitle: Environments
ContentId: 8fe4ca8b-fc70-4216-86c7-2c11b6c14cc6
PageTitle: Configuring Python Environments in Visual Studio Code
DateApproved: 02/14/2018
MetaDescription: Configuring Python Environments in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Configuring Python environments

The Python extension relies on a Python environment (an interpreter and installed packages) for IntelliSense, auto-completions, linting, formatting, and any other language-related feature other than debugging. The selected environment is also automatically activated when using the **Run Python File in Terminal** and **Python: Create Terminal** commands.

The extension automatically looks for interpreters in the following locations:

- Standard paths such as `/usr/local/bin`, `/usr/sbin`, `/sbin`, `c:\\python27`, `c:\\python36`, etc.
- Virtual environments located under the workspace (project) folder.
- Conda environments that contain a Python interpreter. VS Code does not show conda environments that don't contain an interpreter.

You can also [manually specify an interpreter](#manually-specifying-an-interpreter) if Visual Studio Code does not locate it automatically.

> **Tip:** If you create a new conda environment while VS Code is running, use the **Reload Window** command to refresh the environment list.

## Choosing an environment

By default, the Python extension relies on the first Python interpreter it finds in the path, but it's easy to switch between environments.

To use a specific interpreter, select the **Python: Select Interpreter** command from the **Command Palette** (`kb(workbench.action.showCommands)`).

![Python: Select Interpreter command](images/environments/select-interpreters-command.png)

This command automatically looks for and displays a list of available Python interpreters, conda environments, and virtual environments. The following image, for example, shows several Anaconda and CPython installations along with one conda environment:

![List of interpreters](images/environments/interpreters-list.png)

> **Note:** On Windows, it can take a little time for VS Code to detect available conda environments. During that process, you may see "(cached)" before the path to an environment. The label indicates that Visual Studio code is presently working with cached information about that environment.

Selecting an interpreter from the list configures your User [Settings](/docs/getstarted/settings.md) accordingly. The Status Bar shows the current interpreter and when selected brings up a list of available interpreters. The Status Bar also reflects when no interpreter is selected.

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

### Activating an environment in the Terminal

The currently selected interpreter is applied when right-clicking a file and selecting **Run Python File in Terminal**. You can also use **Python: Create Terminal** to open a terminal with the current environment activated.

When an environment is activated in the terminal, any changes you make to the environment within the terminal are persistent. For example, using `conda install <package>` from the terminal with a conda environment activated installs the package into that environment permanently. Similarly, using `pip install` in a terminal with a virtual environment activated adds the package to that environment.

To avoid activating virtual and conda environments when using these terminal commands, change the `python.terminal.activateEnvironments` setting to `false`.

> **Note:** Launching VS Code from a shell in which a certain Python environment is activated does not automatically activate that environment in the default Terminal. Use the **Python: Create Terminal** command after VS Code is running.

### Conda environments

A conda environment is a Python environment that's managed using the `conda` package manager (see [Getting started with conda](https://conda.io/docs/user-guide/getting-started.html) (conda.io)). Conda works very well to create environments with interrelated dependencies as well as binary packages. Unlike virtual environments, which are scoped to a project, conda environments are available globally on any given computer. This availability makes it easy to configure several distinct conda environments and then choose the appropriate one for any given project.

As noted earlier, Visual Studio automatically detects existing conda environments provided that the environment contains a Python interpreter.

For example, the following command creates a conda environment *without* an interpreter, so VS Code doesn't display it in the list of available interpreters:

```bash
conda create --name env-00
```

In contrast, the following command creates a conda environment with a the Python 3.4 interpreter and several libraries. Because the environment contains an interpreter (which you can see in the Anaconda `envs/env-01` folder created by this command), VS Code includes it in its list:

```bash
conda create -n env-01 python=3.4 scipy=0.15.0 astroid babel
```

Again, run the **Reload Window** command in VS Code after creating a new conda environment so that it appears in the list of interpreters.

For more information on the conda command line, see [Conda environments](https://conda.io/docs/user-guide/tasks/manage-environments.html) (conda.io).

> **Note:** Although the Python extension for Visual Studio Code doesn't currently have direct integration with conda environment.yml files, VS Code itself is a great YAML editor.

## Manually specifying an interpreter

If Visual Studio Code does not automatically locate an interpreter you want to use, you can set the path to it manually in your User Settings `settings.json` file:

- Select the **File** > **Preferences** > **Settings** command (`kb(workbench.action.openGlobalSettings)`) to open your User [Settings](/docs/getstarted/settings.md).
- Create or modify an entry for `python.pythonPath` with the full path to the Python executable.

For example:

- Windows:
  ```json
  "python.pythonPath": "c:/python36/python.exe"
  ```
- Mac/Linux:
  ```json
  "python.pythonPath": "/home/python36/python"
  ```

### Environment variables in the interpreter path

An environment variable can be used in the path setting using the syntax `${env:VARIABLE}`. For example:

```json
{
    "python.pythonPath": "${env:PYTHONPATH}/venv/bin/python"
}
```

### Virtual environments

To use a Python interpreter that's installed in a virtual environment:

1. Edit the `python.pythonPath` setting to point to the virtual environment. For example:

    Windows:
    ```json
    {
        "python.pythonPath": "c:/dev/ala/venv/Scripts/python.exe"
    }
    ```

    Mac/Linux:
    ```json
    {
        "python.pythonPath": "/home/xxx/dev/ala/venv/bin/python"
    }
    ```

2. Configure the same `python.pythonPath` variable in `launch.json`.
3. Ensure that the the libraries and modules you plan on using for linting are installed within the virtual environment.

## Python interpreter for debugging

By default, the debugger uses the same `python.pythonPath` setting as for other features of VS Code. Specifically, the value for `pythonPath` in the debugger settings simply refers to the main interpreter setting as follows:

```json
{
    "name": "Python",
    "type": "python",
    "request": "launch",
    "stopOnEntry": true,
    "program": "${file}",
    "pythonPath": "${config:python.pythonPath}",
    "debugOptions": [
        "WaitOnAbnormalExit",
        "WaitOnNormalExit",
        "RedirectOutput"
    ]
}
```

To use a different interpreter for debugging, specify its path directly in the `pythonPath` setting.

> **Note:** The debugger settings don't support relative paths, including when relying on the main `python.pythonPath` setting. To work around this, use an environment variable, or create a variable such as `${workspaceFolder}` that resolves to your project folder, then use that variable in the path, as in `"python.pythonPath": "${workspaceFolder}/venv/bin/python"`.

For information on general debugging configuration, see [Debugging](/docs/python/debugging.md).

## Next steps

- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
