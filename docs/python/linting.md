---
Order: 4
Area: python
TOCTitle: Linting
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Linting Python in Visual Studio Code
DateApproved: 6/15/2023
MetaDescription: Linting Python in Visual Studio Code
MetaSocialImage: images/tutorial/python-social.png
---

# Linting Python in Visual Studio Code

Linting highlights semantic and stylistic problems in your Python source code, which often helps you identify and correct subtle programming errors or coding practices that can lead to errors. For example, linting can detect the use of an undefined variable, calls to undefined functions, missing parentheses, and even more subtle issues such as attempting to redefine built-in types or functions. Linting is distinct from [Formatting](/docs/python/formatting.md) because linting analyzes how the code runs and detects errors, whereas formatting only restructures how code appears.

> **Note**: Syntax error detection is enabled by default in the Python extension's Language Server. To learn how you can configure the Language Server, see [Language Server Settings](/docs/python/settings-reference.md#python-language-server-settings). This document covers how you can enable linting for additional code detection, including stylistic checks.

## Choose a linter

Search the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) for the linter extension of your choice. You can use multiple linters at the same time if you'd like.

Microsoft publishes the following linting extensions for Python:
| Linter | Extension                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| Pylint | [https://marketplace.visualstudio.com/items?itemName=ms-python.pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)            |
| flake8 | [https://marketplace.visualstudio.com/items?itemName=ms-python.flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)            |
| mypy   | [https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker) |

Linting extensions offered by the community:

| Linter | Extension                                                              |
| ------ | ---------------------------------------------------------------------- |
| Ruff   | [https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff) |
| mypy   | [https://marketplace.visualstudio.com/items?itemName=matangover.mypy](https://marketplace.visualstudio.com/items?itemName=matangover.mypy)    |

> **Note**: If you don't find your preferred linter in the table above or in the Marketplace, you can add support for it via an extension. You can use the [Python Extension Template](/api/advanced-topics/python-extension-template.md) to integrate new Python tools into VS Code.

## General Settings

You can refer to each linter extension's README for more details on the supported settings. The following settings are supported by most linter extensions:

| Setting        | Default      | Description                                                                                                                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| args           | `[]`         | Arguments to be passed to the linter. **Note**: The officially supported linters run on individual open files. Make sure your configuration applies in that scenario. |
| importStrategy | `useBundled` | When set to `useBundled`, the extension uses the version of the tool that it ships with. When set to `fromEnvironment`, it attempts to load from your selected Python environment first, otherwise it falls back to the bundled version. |
| path | `""` | Path to the linter binary to be used for linting. **Note:** Using this option may slow down formatting. |
| interpreter | `[]` | When set to a path to a Python executable, the extension will use that to launch the linting server and its subprocesses. |
| showNotifications | `off`| Controls when notifications are displayed by the extension. Supported values are `off`, `always`, `onError`, and `onWarning`. |

## Disable linting

Linters, if installed, are enabled by default. You can disable them by [disabling the extension](/docs/editor/extension-marketplace.md#disable-an-extension) per workspace.

## Run linting

Linting will automatically run when a Python file is opened or saved.

Errors and warnings are shown in the **Problems** panel (`kb(workbench.actions.view.problems)`) for open files, and are also highlighted in the code editor. Hovering over an underlined issue displays the details:

![Linting messages in the editor and the Problems panel](images/linting/lint-messages.png)

## Code Actions

Some linters may offer [Code Actions](/docs/editor/refactoring.md#code-actions-quick-fixes-and-refactorings) that can help address reported problems. You can refer to the [Feature Contributions](/docs/editor/extension-marketplace.md#extension-details) section under your preferred linter extension to find out what Code Actions it offers.

## Logging

Logs for linters are available in the **Output** panel (`kb(workbench.action.output.toggleOutput)`) when you select `<linter name>` from the drop down menu.

You can change the log level for a linter extension by running the **Developer: Set Log Level** command from the Command Palette (`kb(workbench.action.showCommands)`). Select the extension from the **Extension Logs** group, and then select the desired log level.

## Severity

Linters report issues with some predefined severity. This can be changed using `severity` setting for the linter. Refer to each linter extension's README for more details on the supported values and severity levels.

## Troubleshooting linting

| Issue | Cause | Solution |
| --- | --- | --- |
| Linter extension is not reporting any problems. | No Python has been selected for your workspace. | Look at the logs for the linter you are using and check the path to the Python environment it's using. If there is no Python selected, run the **Python: Select Interpreter** command from the Command Palette and select an existing interpreter for your workspace.  |
| The "You have deprecated linting or formatting settings" notification is displayed  | If you are seeing this notification, it means you have settings such as `python.linting` or `python.formatting` in VS Code. These settings are no longer supported by the Python extension, as [linting and formatting support has been migrated to tools extensions](https://github.com/microsoft/vscode-python/wiki/Migration-to-Python-Tools-Extensions). | Find where these settings are defined in VS Code by opening the Command Palette (`kb(workbench.action.showCommands)`) and running the **Preferences: Open User Settings (JSON)** command. If they're not in your User settings, then run the **Preferences: Open Workspace Settings (JSON)** command. Then delete the deprecated settings. <br> **Note**: If you're using any of the extension in the [Remote Development extension pack](/docs/remote/remote-overview.md#remote-development-extension-pack), you can also check the remote settings by running the **Preferences: Open Remote Settings (JSON)** command. |
| Linting doesn't work even though I have a linter extension installed.  | Linting can fail for different reasons, such as an unsupported version of Python being used, or the linter isn't configured correctly. Check the linter extension's Output channel to understand why the linter has failed (run the **Output: Focus on Output** command in the Command Palette, and then select the linter extension channel).|

## Next steps

- [Formatting](/docs/python/formatting.md) - Learn about how to format your Python code.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite linter into VS Code.
