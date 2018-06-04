---
Order: 5
Area: python
TOCTitle: Environments
ContentId: 8fe4ca8b-fc70-4216-86c7-2c11b6c14cc6
PageTitle: Configuring Python Environments in Visual Studio Code
DateApproved: 05/21/2018
MetaDescription: Configuring Python Environments in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Configuring Python environments

The Python extension relies on a Python environment (an interpreter and installed packages) for IntelliSense, auto-completions, linting, formatting, and any other language-related features other than debugging. The selected environment is also automatically activated when using the **Python: Run Python File in Terminal** and **Python: Create Terminal** commands.

Installing (or uninstalling) a package in the Terminal with a command like `pip install matplotlib` installs (or uninstalls) the package in the current environment.

> **Note**: By default, the Python extension looks for and uses on the first Python interpreter it finds in the system path. If it doesn't find an interpreter, it issues a warning. On macOS, the extension also issues a warning if you're using the OS-installed Python interpreter, because you typically want to use an interpreter you install directly. In either case, you can disable these warnings by setting `python.disableInstallationCheck` to `true` in your user settings.

## How to choose an environment

VS Code makes it easy to switch between multiple environments, allowing you to test different parts of your project with different interpreters as needed.

To use a specific interpreter, select the **Python: Select Interpreter** command from the **Command Palette** (`kb(workbench.action.showCommands)`).

![Python: Select Interpreter command](images/environments/select-interpreters-command.png)

This command automatically looks for and displays a list of available Python interpreters, conda environments, and virtual environments. (See [Where the extension looks for environments](#where-the-extension-looks-for-environments) in a later section.) The following image, for example, shows several Anaconda and CPython installations along with one conda environment:

![List of interpreters](images/environments/interpreters-list.png)

> **Note:** On Windows, it can take a little time for VS Code to detect available conda environments. During that process, you may see "(cached)" before the path to an environment. The label indicates that VS Code is presently working with cached information for that environment.

Selecting an interpreter from the list configures your [Workspace Settings](/docs/getstarted/settings.md) accordingly,specifically adding an entry for `python.pythonPath` with the path to the interpreter. The Status Bar shows the current interpreter.

![Status Bar showing a selected interpreter](images/environments/selected-interpreter-status-bar.png)

The Status Bar also reflects when no interpreter is selected.

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

In either case, selecting this area of the Status Bar displays a list of available interpreters.

### Activate an environment in the Terminal

The currently selected interpreter is applied when right-clicking a file and selecting **Python: Run Python File in Terminal**. You can also use **Python: Create Terminal** to open a terminal with the current environment activated.

When an environment is activated in the terminal, any changes you make to the environment within the terminal are persistent. For example, using `conda install <package>` from the terminal with a conda environment activated installs the package into that environment permanently. Similarly, using `pip install` in a terminal with a virtual environment activated adds the package to that environment.

To avoid activating virtual and conda environments when using these terminal commands, change the `python.terminal.activateEnvironment` setting to `false`.

> **Note:** Launching VS Code from a shell in which a certain Python environment is activated does not automatically activate that environment in the default Terminal. Use the **Python: Create Terminal** command after VS Code is running.

### Choose a debugging environment

Although selecting a different environment changes the `python.pythonPath` value in your Workspace `settings.json` file, it doesn't affect the User settings file, which is used by default for debugging. To use a different interpreter for debugging, set the value for `pythonPath` in the debugger settings `launch.json` file. See [Debugging](/docs/python/debugging.md).

### Conda environments

A conda environment is a Python environment that's managed using the `conda` package manager (see [Getting started with conda](https://conda.io/docs/user-guide/getting-started.html) (conda.io)). Conda works very well to create environments with interrelated dependencies as well as binary packages. Unlike virtual environments, which are scoped to a project, conda environments are available globally on any given computer. This availability makes it easy to configure several distinct conda environments and then choose the appropriate one for any given project.

As noted earlier, Visual Studio automatically detects existing conda environments provided that the environment contains a Python interpreter.

For example, the following command creates a conda environment *without* an interpreter, so VS Code doesn't display it in the list of available interpreters:

```
conda create --name env-00
```

In contrast, the following command creates a conda environment with a the Python 3.4 interpreter and several libraries. Because the environment contains an interpreter (which you can see in the Anaconda `envs/env-01` folder created by this command), VS Code includes it in its list:

```
conda create -n env-01 python=3.4 scipy=0.15.0 astroid babel
```

Again, run the **Reload Window** command in VS Code after creating a new conda environment so that it appears in the list of interpreters.

For more information on the conda command line, see [Conda environments](https://conda.io/docs/user-guide/tasks/manage-environments.html) (conda.io).

> **Note:** Although the Python extension for VS Code doesn't currently have direct integration with conda environment.yml files, VS Code itself is a great YAML editor.

## Where the extension looks for environments

The extension automatically looks for interpreters in the following locations:

- Standard paths such as `/usr/local/bin`, `/usr/sbin`, `/sbin`, `c:\\python27`, `c:\\python36`, etc.
- Virtual environments located directly under the workspace (project) folder.
- Virtual environments located in the folder identified by the `python.venvPath` setting (see [General settings](settings-reference.md#general-settings). The extension looks for virtual environments in the first-level subfolders of `venvPath`.
- Interpreters installed by [pyenv](https://github.com/pyenv/pyenv).
- A [pipenv](https://docs.pipenv.org/) environment for the workplace folder. If one is found then no other interpreters are searched for or listed as pipenv expects to manage all aspects of the environment.
- Conda environments that contain a Python interpreter. VS Code does not show conda environments that don't contain an interpreter.
- Interpreters installed in a `.direnv` folder for [direnv](https://direnv.net/) under the workspace (project) folder.

You can also [manually specify an interpreter](#manually-specifying-an-interpreter) if Visual Studio Code does not locate it automatically.

> **Tip:** If you create a new conda environment while VS Code is running, use the **Reload Window** command to refresh the environment list.

The extension also loads an [environment variable definitions file](#environment-variable-definitions-file) identified by the `python.envFile` setting. The default value of this setting is `${workspaceFolder}/.env`.

## Manually specify an interpreter

If VS Code does not automatically locate an interpreter you want to use, you can set the path to it manually in your User Settings `settings.json` file:

1. Select the **File** > **Preferences** > **Settings** command (`kb(workbench.action.openSettings)`) to open your User [Settings](/docs/getstarted/settings.md).

2. Create or modify an entry for `python.pythonPath` with the full path to the Python executable.

    For example:

    - Windows:

      ```json
      "python.pythonPath": "c:/python36/python.exe"
      ```

    - macOS/Linux:

      ```json
      "python.pythonPath": "/home/python36/python"
      ```

### Environment variables in the interpreter path

A system environment variable can be used in the path setting using the syntax `${env:VARIABLE}`. For example:

```json
{
    "python.pythonPath": "${env:PYTHONPATH}"
}
```

By using an environment variable, you can easily transfer a project between operating systems where the paths are different. Just be sure to set the PYTHONPATH environment variable on the operating system first.

### Virtual environments

To use a Python interpreter that's installed in a virtual environment, use the `python.venvPath` to point to the folder containing the virtual environment.

Alternately, you can point `python.pythonPath` directly to the interpreter in the virtual environment:

1. Edit the `python.pythonPath` setting to point to the virtual environment. For example:

    Windows:
    ```json
    {
        "python.pythonPath": "c:/dev/ala/venv/Scripts/python.exe"
    }
    ```

    macOS/Linux:
    ```json
    {
        "python.pythonPath": "/home/xxx/dev/ala/venv/bin/python"
    }
    ```

1. Configure the same `python.pythonPath` variable in `launch.json`; see [Choosing a debugging environment](#choosing-a-debugging-environment) earlier.

1. Ensure that the libraries and modules you plan on using for linting are installed within the virtual environment.

## Environment variable definitions file

An environment variable definitions file is a simple text file containing key-value pairs in the form of `environment_variable=value`, with `#` used to mark comments. Multi-line values are not supported.

By default, the Python extension loads a file named `.env` in the current workspace folder, as identified by the default value of the `python.envFile` setting (see [General settings](settings-reference.md#general-settings)). You can change the `python.envFile` setting at any time to use a different definitions file.

A debug configuration also contains an `envFile` property that also defaults to the `.env` file in the current workspace (see [Debugging - standard configuration and options](/docs/python/debugging.md#standard-configuration-and-options)). This property allows you to easily set variables for debugging purposes that replace those used in the default `.env` file.

For example, when developing a web application, you might want to easily switch between development and production servers. Instead of coding the different URLs and other settings into your application directly, you could use separate definitions files for each. For example:

**dev.env file**

```bash
# dev.env - development configuration

# API endpoint
MYPROJECT_APIENDPOINT=https://my.domain.com/api/dev/

# Variables for the database
MYPROJECT_DBURL=https://my.domain.com/db/dev
MYPROJECT_DBUSER=devadmin
MYPROJECT_DBPASSWORD=!dfka**213=
```

**prod.env file**

```bash
# prod.env - production configuration

# API endpoint
MYPROJECT_APIENDPOINT=https://my.domain.com/api/

# Variables for the database
MYPROJECT_DBURL=https://my.domain.com/db/
MYPROJECT_DBUSER=coreuser
MYPROJECT_DBPASSWORD=kKKfa98*11@
```

You can then set the `python.envFile` setting to `${workspaceFolder}/prod.env`, then set the `envFile` property in the debug configuration to `${workspaceFolder}/dev.env`.

## Next steps

- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
