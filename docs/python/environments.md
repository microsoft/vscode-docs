---
ContentId: 8fe4ca8b-fc70-4216-86c7-2c11b6c14cc6
DateApproved: 02/04/2026
MetaDescription: Configuring Python Environments in Visual Studio Code
MetaSocialImage: images/tutorial/python-social.png
---
# Python environments in VS Code

The Python Environments extension brings environment and package management into VS Code's UI. Whether you use venv, uv, conda, pyenv, poetry, or pipenv, the extension provides a single interface for all of them—create environments, install packages, and switch interpreters the same way regardless of which tool manages them.

Core features:

- Creating, deleting, and switching between environments
- Installing and managing packages
- Activated python in terminals
- Assigning environments to specific files or folders (called "Python projects")

The extension works alongside the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and requires no setup to get started.

## Quick Start

**Most users don't need to configure anything.** The extension automatically discovers your Python environments and uses them when running code.

If you have a basic setup, such as one environment for your whole workspace:

1. Open a Python file
2. Check the Status Bar to see which environment is active
3. To switch environments, select the environment control in the Status Bar

**Need to create an environment?** Open the Python sidebar, expand **Environment Managers**, and select the **+** button. The extension walks you through the different steps.



## User interface components

## Environment discovery

The following environment managers are discovered automatically:

| Manager       | Search locations                                                                     |
| ------------- | ------------------------------------------------------------------------------------ |
| venv          | Workspace folders (configurable via `workspaceSearchPaths`)                          |
| System Python | PATH, `/usr/bin`, `/usr/local/bin`, Windows Registry, python.org installs            |
| Conda         | Runs `conda info --envs` to find configured environment directories                  |
| Pyenv         | `$PYENV_ROOT/versions` or `~/.pyenv/versions`                                        |
| Poetry        | Project `.venv` folders and `~/.cache/pypoetry/virtualenvs`                          |
| Pipenv        | `~/.local/share/virtualenvs` (Linux/macOS) or `%USERPROFILE%\.virtualenvs` (Windows) |

Discovery runs automatically when the extension activates. The extension uses the Python Environment Tool (PET) Rust binary that scans your system for Python environments. PET finds environment managers by checking your PATH (for example, by looking for `conda`, `pyenv`, and `poetry` executables) and known installation locations, and then searches for environments managed by each of these environment managers.

To manually trigger a refresh:

1. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run **Python Environments: Refresh All Environment Managers**

You can also click the refresh icon in the **Environment Managers** view header.

![Screenshot showing the Environment Managers panel in the Python sidebar with the refresh button highlighted in the view header.](images/environments/environmentRefresh.png)

_Select the refresh icon to rescan for environments._

### View discovered environments

Discovered environments appear in two places:

* **Environment Managers view**: in the Python sidebar, environments are grouped by manager type (for example, venv, Conda, and more )
* **Environment selection**: when selecting an interpreter for a project, all discovered environments appear in a unified list

![Screenshot showing the Environment Managers tree view with Global, venv, and Conda sections expanded, displaying discovered Python environments grouped by manager type.](images/environments/EnvironmentManagerTree.png)

_The Environment Managers view groups environments by type._

> **Don't have an environment yet?** See [Managing Python Projects](managing-python-projects.md) to create one.

### Configure search paths

By default, the extension searches your entire workspace for virtual environments using the glob pattern `./**/.venv`. This finds any folder named `.venv` anywhere in your workspace.

To discover environments in custom locations, update the `python-envs.workspaceSearchPaths` setting:

> [!NOTE]
> This setting must be configured at the workspace or folder level, not user level.

```json
{
  "python-envs.workspaceSearchPaths": [
    "./**/.venv",
    "./envs/**",
    "./my-custom-env"
  ]
}
```

**Tips**:

- Use `**` for recursive searches (for example, `./**/env` finds any folder named `env` at any depth)
- Relative paths resolve from your workspace folder root

To quickly open search path settings:

1. Open the Command Palette
2. Run **Python Environments: Configure Search Settings**

![Screenshot showing the VS Code Settings editor filtered to the Python Environments extension, displaying the python-envs Workspace Search Paths setting with a glob pattern entry.](images/environments/workspaceSearchPathsConfiguration.png)

_Add custom glob patterns to search additional locations._

**Global search paths**: For environments outside your workspace (like a shared `~/envs` folder), use `python-envs.globalSearchPaths`:

```json
{
  "python-envs.globalSearchPaths": [
    "/Users/yourname/envs",
    "/opt/shared-envs"
  ]
}
```

This setting requires absolute paths and is configured at the user (global) level.

**Legacy settings**: If you previously used `python.venvPath` or `python.venvFolders`, these are automatically merged with the new search paths. Consider migrating to `python-envs.globalSearchPaths` for future compatibility.

### Select an environment

To use a discovered environment:

* **Status Bar**: select the Python version shown at the bottom of the window
* **Command Palette**: run **Python: Select Interpreter** and choose from the list

The selected environment is used for running code, debugging, and language features like IntelliSense.

> [!TIP]
> By default, the debugger uses your selected environment. To use a different interpreter for debugging, set the `python` property in your `launch.json` debug configuration.

![Screenshot showing the Select Interpreter quick pick with the currently selected interpreter at the top, and a list of discovered environments labeled by type such as Conda, Global, and Workspace.](images/environments/selectedInterpreter.png)

_Select the Python version in the Status Bar to switch environments._
**How the extension auto-selects**: When you open a workspace without explicitly selecting an environment, the extension chooses one automatically in the following order:

1. Workspace-local virtual environments (`.venv`, `venv`)
2. Global/system interpreters

To override this priority order, set `python-envs.defaultEnvManager` to prefer a specific manager (for example, `ms-python.python:conda`), or configure [Python Projects](#python-projects) for per-folder control. The legacy setting is still supported as well.

### Troubleshoot environment discovery

| Symptom                              | Cause                                             | Solution                                                                |
| ------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------- |
| Environment not listed               | Location not in search paths                      | Add the path to `workspaceSearchPaths` or `globalSearchPaths`           |
| Environment shows as "(broken)"      | Missing `pyvenv.cfg` or invalid Python executable | Recreate the environment or fix the broken files                        |
| Recently created environment missing | Discovery cache is stale                          | Run **Refresh All Environment Managers**                                |
| Conda environment not found          | Conda not detected                                | Ensure `conda` is in your PATH or install Conda                         |
| Settings not taking effect           | Wrong setting scope                               | Ensure `workspaceSearchPaths` is set at workspace level, not user level |


For advanced troubleshooting, run the Python Environment Tool (PET) directly to see raw discovery output:

1. Open the Command Palette
2. Run **Python Environments: Run Python Environment Tool (PET) in Terminal...**
3. Choose an option:
   * **Find All Environments**: runs `pet find --verbose` to list all discovered environments with detailed output
   * **Resolve Environment...**: enter a path to a Python executable to debug why a specific environment isn't being detected

![Screenshot showing the VS Code terminal with verbose output from the Python Environment Tool, displaying a breakdown of search times by locator, environment counts by type, and discovered managers.](images/environments/PETVerbose.png)

_PET verbose output shows exactly what environments are discovered and why._

Advanced troubleshooting is useful for the following scenarios:

* You need to verify an environment is being detected
* You want to understand why an environment appears under a specific manager
* You're debugging path resolution issues



## Create, delete, and manage environments

### Create environments

The extension provides two ways to create environments: **Quick Create** for speed, and **Custom Create** for control.

**Quick Create**

Select the **+** button in the Environment Managers view. The extension performs the following steps:

- Uses your default manager (venv by default, configurable via `python-envs.defaultEnvManager`)
- Picks the latest Python version available
- Names the environment `.venv` (or `.venv-1`, `.venv-2` if one already exists)
- Installs dependencies from `requirements.txt` or `pyproject.toml` if found
- Selects the new environment for your workspace

This is the fastest way to get a working environment.

![Screenshot showing the Quick Create flow with the plus button in the Environment Managers view header, a prompt to select projects, and a status bar notification indicating the environment is being created.](images/environments/quickCreate.png)

_Quick Create builds an environment with sensible defaults._

**Custom Create**

For more control, run **Python: Create Environment** from the Command Palette and walk through the prompts:

1. **Choose manager**: venv or conda
2. **Select Python version**: pick from discovered interpreters (venv) or available Python versions (conda)
3. **Name your environment**: enter a custom name or accept the default
4. **Install dependencies**: choose to install from `requirements.txt`, `pyproject.toml`, or `environment.yml`

![Screenshot showing the Custom Create flow with the Select packages to install dialog, listing available packages with checkboxes and an install count indicator.](images/environments/selectPackage.png)

_Custom Create lets you configure each step._

**Using uv for faster creation**

If [uv](https://github.com/astral-sh/uv) is installed, the extension uses it automatically for venv creation and package installation, which is significantly faster than standard tools. Configure this with:

```json
{
  "python-envs.alwaysUseUv": true
}
```

When `alwaysUseUv` is enabled (the default), uv manages all virtual environments. Set it to `false` to only use uv for environments explicitly created by uv.

**Supported managers**

| Manager | Quick Create | Custom Create |
|---------|--------------|---------------|
| venv    | ✅           | ✅            |
| conda   | ✅           | ✅            |
| pyenv   | —            | —             |
| poetry  | —            | —             |
| pipenv  | —            | —             |

> [!NOTE]
> Only **venv** and **conda** support creating environments from VS Code. Other managers (pyenv, poetry, pipenv) discover existing environments but don't create new ones through the extension. Use their respective CLI tools to create environments, and then the extension will discover them automatically.

### Delete environments

To delete an environment:

1. In the **Environment Managers** view, find the environment
2. Right-click and select **Delete**

Deleting an environment removes the environment folder from disk. Any projects that use this environment will require that you select a new one.

## Python projects

A **Python project** is any file or folder you want to associate with a specific environment. By default, your entire workspace uses one environment. Projects let you assign different environments to different folders. This is essential for mono-repos, microservices, or testing across Python versions.

### Why use projects?

| Scenario | Without projects | With projects |
|----------|------------------|---------------|
| Mono-repo with backend + ML service | Both share one interpreter | Each gets its own environment |
| Testing Python 3.10 vs 3.12 | Manually switch interpreters | Assign different versions to different folders |
| Shared workspace with teammates | Everyone configures manually | Settings sync via `.vscode/settings.json` |

If you only have one environment for your whole workspace, you don't need to set up projects explicitly. Select an interpreter and you're done.

```text
Workspace
├── Python Project: backend/
│     └── Environment: .venv (Python 3.12)
│            └── Manager: venv
│
├── Python Project: frontend-utils/
│     └── Environment: .venv (Python 3.10)
│            └── Manager: venv
│
└── Python Project: ml-pipeline/
       └── Environment: ml-env (Python 3.11)
              └── Manager: conda
```

**What uses project assignments?**

* **Running and debugging**: uses the project's environment
* **Terminals**: activated with the project's environment
* **Test Explorer**: each project gets its own test tree with its own interpreter (see [Multi-Project Testing](https://github.com/microsoft/vscode-python/wiki/Multi%E2%80%90Project-Testing-in-VS-Code))

> [!NOTE]
> Pylance and Jupyter currently use a single interpreter per workspace, not per-project environments. See [Known Limitations](#known-limitations).

### Add a project

To treat a folder or file as a separate project:

1. Right-click it in the Explorer
2. Select **Add as Python Project**

Alternatively, select **+** in the **Python Projects** view and choose either of these options:
* **Add Existing**: select files/folders manually
* **Auto Find**: discover folders with `pyproject.toml` or `setup.py`

> [!TIP]
> When you add a project, its folder is automatically added to the environment search path. Environments inside project folders (e.g., `my-project/.venv`) are discovered automatically without the need to update `workspaceSearchPaths`.

![Screenshot showing the Python Projects panel with the Add Python Project dropdown menu displaying Add Existing and Auto Find options.](images/environments/addPythonProject.png)

_Add existing folders or auto-discover projects._

### Assigning an environment

Once a folder is a project, assign its environment:

1. In the **Python Projects** view, click the environment shown under your project (or "No environment")
2. Select from discovered environments

The selected environment is used whenever you run or debug files in that project.

![Screenshot showing the Python Projects view with two projects listed, each assigned a Python environment, and the Environment Managers section below with available interpreters and installed packages.](images/environments/pythonProject.png)

_Click the environment to change it._

### How settings are stored

When you assign an environment to a project, the extension writes to your workspace settings (`.vscode/settings.json`):

```json
{
  "python-envs.pythonProjects": [
    {
      "path": "backend",
      "envManager": "ms-python.python:venv"
    },
    {
      "path": "ml-service",
      "envManager": "ms-python.python:conda"
    }
  ]
}
```

Notice that settings store the **environment manager**, not hardcoded interpreter paths. The extension remembers which specific environment you selected separately, and resolves it at runtime. This design makes settings shareable:

- **No machine-specific paths** — teammates don't need `/Users/yourname/.venv`
- **Portable across systems** — works on macOS, Windows, and Linux
- **Survives environment recreation** — if you delete and recreate `.venv`, it still works

**Sharing with teammates:**
1. Commit `.vscode/settings.json` to your repo
2. Teammates clone and open the workspace
3. They create their own environments (Quick Create works great here)
4. The extension automatically uses each project's configured manager

> **Note**: The environment *folders* (like `.venv`) still need to be created on each machine. Only the configuration is shared, not the environment itself.

### Removing a project

Right-click a project in the **Python Projects** view and select **Remove Python Project**. This removes the mapping—it doesn't delete any files.

### Creating a project from a template

To scaffold a new project with the right structure, run **Python Envs: Create New Project from Template** from the Command Palette. Choose between:

- **Package** — creates a folder with `pyproject.toml`, package directory, and tests
- **Script** — creates a single `.py` file with inline dependency metadata (PEP 723)

See the full [Python Projects guide](managing-python-projects.md) for details on template structure.

### Learn more

For detailed guidance on templates, multi-root workspaces, common scenarios, and troubleshooting, see the full [Python Projects guide](https://github.com/microsoft/vscode-python-environments/wiki/Making-and-Managing-Python-Projects).


## Package Management

Install and uninstall Python packages directly from VS Code without opening a terminal.

### Installing packages

1. In the **Environment Managers** view, find an environment
2. Right-click and select **Manage Packages**
3. Search for packages and select ones to install

Or run **Python Envs: Manage Packages** from the Command Palette.

![Screenshot showing the Manage Packages dialog with a search box at the top and a scrollable list of packages with checkboxes, indicating installed packages and the total number selected for installation.](images/environments/ManagePackages.png)

_Search and install packages directly from VS Code._

**Installing from a requirements file**: You can also install packages from `requirements.txt`, `pyproject.toml`, or `environment.yml`. When prompted, select the file and the extension installs all listed dependencies.

### Uninstalling packages

1. Expand an environment in the **Environment Managers** view to see installed packages
2. Right-click a package and select **Uninstall Package**

### Package managers by environment

The extension automatically uses the appropriate package manager based on your environment:

| Environment | Package Manager |
|-------------|-----------------|
| venv        | pip             |
| conda       | conda           |
| pyenv       | pip             |
| poetry      | pip             |
| pipenv      | pip             |
| system      | pip             |

To override the default, set `python-envs.defaultPackageManager`.

### Faster installation with uv

If [uv](https://github.com/astral-sh/uv) is installed and `python-envs.alwaysUseUv` is enabled (the default), package installation in venv environments uses `uv pip` instead of regular pip—significantly faster for large dependency trees.


## Settings and Configuration

This section covers all extension settings, how interpreter selection works, and legacy settings migration.

### Interpreter selection priority

When you open a workspace, the extension determines which environment to use by checking these sources in order:

| Priority | Source | When it applies |
|----------|--------|-----------------|
| 1 | `pythonProjects[]` | If you've configured a project for this path |
| 2 | `defaultEnvManager` | Only if you've explicitly set this (not the default value) |
| 3 | `python.defaultInterpreterPath` | Legacy setting, if configured |
| 4 | Auto-discovery | Finds workspace-local `.venv`, then global interpreters |

**Key principle**: User-configured settings always win over defaults. If you haven't explicitly set `defaultEnvManager` (it just has the built-in default), the extension skips it and checks the next priority.

**Caching**: The extension caches resolved environments for performance, but your explicit settings always take precedence over cached values. You never need to worry about stale cache overriding your choices.

For more details on interpreter selection behavior, see the [Interpreter Selection Quick Reference](https://github.com/microsoft/vscode-python-environments/wiki/Python-Interpreter-Selection:-Quick-Reference).

### When settings are written

The extension only writes to settings when **you** make an explicit change:

| Action | Writes to settings? |
|--------|---------------------|
| Open workspace (first time) | ❌ No |
| Extension auto-selects an environment | ❌ No |
| You manually select an environment | ✅ Yes — updates `pythonProjects` |
| You create a new environment | ✅ Yes — may update `pythonProjects` |
| You change settings in UI | ✅ Yes |

This means opening a workspace never pollutes your `settings.json` with auto-generated configuration.

### Python Environments settings

| Setting | Default | Description |
|---------|---------|-------------|
| `python-envs.defaultEnvManager` | `ms-python.python:venv` | Default environment manager for creating environments. Options: `ms-python.python:venv`, `ms-python.python:conda` |
| `python-envs.defaultPackageManager` | `ms-python.python:pip` | Default package manager. Usually determined by the environment manager. |
| `python-envs.pythonProjects` | `[]` | Array of project configurations. Managed via UI — rarely edited manually. |
| `python-envs.workspaceSearchPaths` | `["./**/.venv"]` | Glob patterns to search for environments in your workspace. Must be set at workspace level. |
| `python-envs.globalSearchPaths` | `[]` | Absolute paths to search for environments globally (e.g., `~/envs`). |
| `python-envs.alwaysUseUv` | `true` | Use uv for venv creation and package installation when available. |

### Terminal settings

When you open a terminal in VS Code, the extension automatically activates your selected Python environment so that `python`, `pip`, and related commands use the correct interpreter.

| Setting | Default | Description |
|---------|---------|-------------|
| `python-envs.terminal.autoActivationType` | `shellStartup` | How environments are activated in terminals. See below. |
| `python-envs.terminal.showActivateButton` | `false` | (Experimental) Show activate/deactivate button in terminal. |
| `python.terminal.useEnvFile` | `false` | When `true`, injects variables from `.env` files into terminals. |
| `python.envFile` | `${workspaceFolder}/.env` | Path to the `.env` file to use when `useEnvFile` is enabled. |

**Terminal activation types:**

| Value | Behavior | Best for |
|-------|----------|----------|
| `shellStartup` | Activates via shell startup scripts—environment is active immediately when the terminal opens | Copilot terminal commands, cleaner experience |
| `command` | Runs the activation command visibly in the terminal after it opens | Compatibility with all shells |
| `off` | No automatic activation | Manual control |

> **Tip**: Use `shellStartup` if you use Copilot to run terminal commands—it ensures the environment is active before the first command executes. This will become the default in a future release.

> **Note**: After changing `autoActivationType`, restart your terminals for the change to take effect. To undo `shellStartup` changes, run **Python Envs: Revert Shell Startup Script Changes**.

**Opening a terminal for a specific environment:**

You can open a new terminal with any environment activated:

1. In the **Environment Managers** view, find the environment
2. Right-click and select **Open in Terminal**

![Screenshot showing the Environment Managers tree view with a venv environment selected and the Create Python Terminal tooltip visible on the terminal icon button.](images/environments/createPythonTerminal.png)

_Open a terminal with any environment activated._

For detailed troubleshooting and how activation works under the hood, see [Terminal Auto-Activation Explained](https://github.com/microsoft/vscode-python-environments/wiki/Terminal-Auto%E2%80%90Activation-Explained).

### .env file support

To inject environment variables from a `.env` file into your terminals:

1. Create a `.env` file in your workspace root (or specify a custom path with `python.envFile`)
2. Set `python.terminal.useEnvFile` to `true`

```
# .env
API_KEY=your-secret-key
DATABASE_URL=postgres://localhost/mydb
```

Variables are injected when terminals are created. This is useful for development credentials that shouldn't be committed to source control.

### Legacy settings

These settings from the Python extension are still supported but have newer equivalents:

| Legacy setting | New equivalent | Notes |
|----------------|----------------|-------|
| `python.venvPath` | `python-envs.globalSearchPaths` | Automatically merged. Consider migrating. |
| `python.venvFolders` | `python-envs.globalSearchPaths` | Automatically merged. Consider migrating. |
| `python.terminal.activateEnvironment` | `python-envs.terminal.autoActivationType` | Set to `off` to disable. New setting takes precedence. |
| `python.defaultInterpreterPath` | — | Still supported. Used as fallback in priority chain. |
| `python.condaPath` | — | Still supported. Specifies custom conda executable location. |

### Settings scope reference

Settings behave differently depending on where they're configured:

| Setting | User | Workspace | Folder |
|---------|------|-----------|--------|
| `defaultEnvManager` | ✅ | ✅ | ❌ |
| `defaultPackageManager` | ✅ | ✅ | ❌ |
| `pythonProjects` | ❌ | ✅ | ✅ |
| `workspaceSearchPaths` | ❌ | ✅ | ✅ |
| `globalSearchPaths` | ✅ | ❌ | ❌ |
| `alwaysUseUv` | ✅ | ❌ | ❌ |
| `terminal.autoActivationType` | ✅ | ❌ | ❌ |

**Key insight**: `workspaceSearchPaths` must be set at workspace or folder level (not user level) because it's relative to workspace folders.


## Extensibility

The Python Environments extension is designed to be extensible. Any environment or package manager can build an extension that plugs into the Python sidebar, appearing alongside the built-in managers. This means the ecosystem can grow to support new tools without waiting for updates to this extension.

Community members are building extensions for additional environment managers like the [Pixi Extension](https://marketplace.visualstudio.com/items?itemName=renan-r-santos.pixi-code).

## Known Limitations

### Pylance and multi-project workspaces

Pylance does not support multiple Python projects with different interpreters in the same workspace. Even if you configure separate environments for different folders using [Python Projects](#python-projects), Pylance uses a single interpreter for the entire workspace—typically the one associated with the workspace root. If you need Pylance to use a different interpreter for a specific folder, consider opening that folder in a separate VS Code window, or add the subfolder as a workspace folder in a multi-root workspace. Pylance runs per workspace folder, so each folder in a multi-root workspace can have its own interpreter.

### Jupyter notebooks

Jupyter notebooks do not use the Python Environments API for environment discovery. Instead, they rely on the older Python extension API. This means notebook kernel selection may show a different set of environments than the **Environment Managers** view.