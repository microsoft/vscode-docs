---
Order: 5
Area: python
TOCTitle: Environments
ContentId: 8fe4ca8b-fc70-4216-86c7-2c11b6c14cc6
PageTitle: Configuring Python Environments in Visual Studio Code
DateApproved: 07/11/2018
MetaDescription: Configuring Python Environments in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Configuring Python environments

**Note**: If you're looking to get started with Python in Visual Studio Code, refer to the [Tutorial](/docs/python/python-tutorial.md). This present article is focused only on aspects of setting up a Python interpreter/environment.

An "environment" in Python is the context in which a Python program runs. An environment consists of an interpreter and any number of installed packages. Because many programs are written specifically for a certain Python interpreter and makes use of a set of libraries, developers often create and manage an environment for individual programs.

When working with Python in VS Code, you select from available environments using the **Python: Select Interpreter** command. The Python extension then uses that selected environment for IntelliSense, auto-completions, linting, formatting, and any other language-related features. (The environment is **not**, however, used for debugging; see [Choose a debugging environment](#choose-a-debugging-environment).)

The selected environment is also automatically activated when using the **Python: Run Python File in Terminal** and **Python: Create Terminal** commands. Installing (or uninstalling) a package in the Terminal with a command like `pip install matplotlib` installs (or uninstalls) the package in whatever environment is active in that Terminal.

> **Note**: By default, the Python extension looks for and uses on the first Python interpreter it finds in the system path. If it doesn't find an interpreter, it issues a warning. On macOS, the extension also issues a warning if you're using the OS-installed Python interpreter, because you typically want to use an interpreter you install directly. In either case, you can disable these warnings by setting `python.disableInstallationCheck` to `true` in your user settings.

## Global and virtual environments

By default, any Python interpreter that you've installed run in its own "global" environment, which is not specific to any one program. For example, if you just run `python` (Windows) or `python3` (macOS/Linux) at a new command prompt, you're running in that interpreter's global environment. Accordingly, any packages that you install or uninstall affect the global environment and all programs that you run within that context.

> **Note**: The Python Extension version 2018.8.1 and later automatically updates environments.

Although working in the global environment is an easy way to get started, that environment will, over time, become cluttered with many different packages that you've installed for different projects. Such clutter makes it difficult to thoroughly test an application against a specific set of packages with known versions, which is exactly the kind of environment you'd set up on a build server or web server.

For this reason, developers often create a *virtual environment* for any given project. A virtual environment is a subfolder in a project that contains a copy of a specific interpreter. When you activate the virtual environment, any packages you install are installed only in that environment's subfolder. When you then run a Python program within that environment, you know that it's running against only those specific packages.

> **Tip**: A *conda environment* is a virtual environments that's set up using the `conda` package manager.

To create a virtual environment, use the following command, where "env" is the name of the environment folder:

```bash
# macOS/Linux
# You may need to run sudo apt-get install python3-venv first
python3 -m venv env

# Windows
py -3 -m venv env
```

The next section describes how to select an environment, include virtual environments. For an example of using a virtual environment in a project, see the [Flask tutorial](/docs/python/tutorial-flask.md).

> **Tip**: When you're ready to deploy the application to other computers, you can create a `requirements.txt` file with the command `pip freeze > requirements.txt` (`pip3` on macOS/Linux). The requirements file describes the packages you've installed in your virtual environment. With only this file, you or other developers can restore those packages using `pip install -r requirements.txt` (or, again, `pip3` on macOS/Linux). By using a requirements file, you need not commit the virtual environment itself to source control.

## Select an environment

VS Code makes it easy to select and activate environments. Switching environments help you test different parts of your project with different interpreters as needed.

To select a specific interpreter, invoke the **Python: Select Interpreter** command from the **Command Palette** (`kb(workbench.action.showCommands)`).

![Python: Select Interpreter command](images/environments/select-interpreters-command.png)

This command automatically looks for and displays a list of available Python interpreters, conda environments, and virtual environments. (See [Where the extension looks for environments](#where-the-extension-looks-for-environments) in a later section.) The following image, for example, shows several Anaconda and CPython installations along with one conda environment:

![List of interpreters](images/environments/interpreters-list.png)

> **Note:** On Windows, it can take a little time for VS Code to detect available conda environments. During that process, you may see "(cached)" before the path to an environment. The label indicates that VS Code is presently working with cached information for that environment.

Selecting an interpreter from the list configures your [Workspace Settings](/docs/getstarted/settings.md) accordingly, specifically adding an entry for `python.pythonPath` with the path to the interpreter. This setting, however, doesn't affect debugging. See [Choose a debugging environment](#choose-a-debugging-environment).

The Status Bar shows the current interpreter.

![Status Bar showing a selected interpreter](images/environments/selected-interpreter-status-bar.png)

The Status Bar also reflects when no interpreter is selected.

![No interpreter selected](images/environments/no-interpreter-selected-statusbar.png)

In either case, selecting this area of the Status Bar displays a list of available interpreters.

### Activate an environment in the Terminal

After using **Python: Select Interpreter**, that interpreter is applied when right-clicking a file and selecting **Python: Run Python File in Terminal**. You can also use **Python: Create Terminal** to open a terminal in which that environment is activated. (However, launching VS Code from a shell in which a certain Python environment is activated does not automatically activate that environment in the default Terminal. Use the **Python: Create Terminal** command after VS Code is running.)

Any changes you make to an activated environment within the terminal are persistent. For example, using `conda install <package>` from the terminal with a conda environment activated installs the package into that environment permanently. Similarly, using `pip install` in a terminal with a virtual environment activated adds the package to that environment.

### Choose a debugging environment

Debugging uses the value from `python.pythonPath` in selecting what Python interpreter to use, in the following order of precedence:

1. `launch.json`
1. Workspace `settings.json`
1. User `settings.json`

See [Debugging](/docs/python/debugging.md) for more details.

## Where the extension looks for environments

The extension automatically looks for interpreters in the following locations:

- Standard paths such as `/usr/local/bin`, `/usr/sbin`, `/sbin`, `c:\\python27`, `c:\\python36`, etc.
- Virtual environments located directly under the workspace (project) folder.
- Virtual environments located in the folder identified by the `python.venvPath` setting (see [General settings](settings-reference.md#general-settings)). The extension looks for virtual environments in the first-level subfolders of `venvPath`.
- Interpreters installed by [pyenv](https://github.com/pyenv/pyenv).
- A [pipenv](https://docs.pipenv.org/) environment for the workplace folder. If one is found then no other interpreters are searched for or listed as pipenv expects to manage all aspects of the environment.
- Conda environments that contain a Python interpreter. VS Code does not show conda environments that don't contain an interpreter.
- Interpreters installed in a `.direnv` folder for [direnv](https://direnv.net/) under the workspace (project) folder.

You can also [manually specify an interpreter](#manually-specify-an-interpreter) if Visual Studio Code does not locate it automatically.

> **Tip:** If you create a new conda environment while VS Code is running, use the **Reload Window** command to refresh the environment list.

The extension also loads an [environment variable definitions file](#environment-variable-definitions-file) identified by the `python.envFile` setting. The default value of this setting is `${workspaceFolder}/.env`.

## Use of the PYTHONPATH variable

The PYTHONPATH environment variable, which can be included in a [Environment variable definitions file](#environment-variable-definitions-file), specifies where Python should look for modules. The value of PYTHONPATH can contain multiple path values separated by `os.pathsep` (semicolons on Windows, colons on Linux/MacOS). Invalid paths are ignored.

In VS Code, PYTHONPATH affects debugging, linting, IntelliSense, unit testing, and any other operation that depends on Python resolving modules. For example, suppose you have source code in a `src` folder and tests in a `tests` folder. When running tests, however, they can't normally access modules in `src` unless you hard-code relative paths. To solve this, add the path to `src` to PYTHONPATH.

For more information, including referring to ZIP files, see [PYTHONPATH](https://docs.python.org/3.7/using/cmdline.html#envvar-PYTHONPATH) (docs.python.org).

## Manually specify an interpreter

If VS Code does not automatically locate an interpreter you want to use, you can set the path to it manually in your User Settings `settings.json` file:

1. Select the **File** > **Preferences** > **Settings** command (`kb(workbench.action.openSettings)`) to open your User [Settings](/docs/getstarted/settings.md).

1. Create or modify an entry for `python.pythonPath` with the full path to the Python executable:

    For example:

    - Windows:

      ```json
      "python.pythonPath": "c:/python36/python.exe"
      ```

    - macOS/Linux:

      ```json
      "python.pythonPath": "/home/python36/python"
      ```

1. You can also use `python.pythonPath` to point to a virtual environment, for example:

    Windows:
    ```json
    {
        "python.pythonPath": "c:/dev/ala/venv/Scripts/python.exe"
    }
    ```

    macOS/Linux:
    ```json
    {
        "python.pythonPath": "/home/abc/dev/ala/venv/bin/python"
    }

### Environment variables in the interpreter path

A system environment variable can be used in the path setting using the syntax `${env:VARIABLE}`. For example:

```json
{
    "python.pythonPath": "${env:PYTHON_INSTALL_LOC}"
}
```

By using an environment variable, you can easily transfer a project between operating systems where the paths are different - just be sure to set the environment variable on the operating system first.

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

## Conda environments

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

## Next steps

- [Editing code](/docs/python/editing.md) - Learn about autocomplete, IntelliSense, formatting, and refactoring for Python.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
