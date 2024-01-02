---
Order: 3
Area: python
TOCTitle: Linting
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Linting Python in Visual Studio Code
DateApproved: 6/15/2023
MetaDescription: Linting Python in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---

# Linting Python in Visual Studio Code

Linting highlights syntactical and stylistic problems in your Python source code, which often helps you identify and correct subtle programming errors or unconventional coding practices that can lead to errors. For example, linting detects use of an uninitialized or undefined variable, calls to undefined functions, missing parentheses, and even more subtle issues such as attempting to redefine built-in types or functions. Linting is distinct from [Formatting](/docs/python/formatting.md) because linting analyzes how the code runs and detects errors whereas formatting only restructures how code **appears**.

> **Note**: Stylistic and syntactical code detection is enabled by the Language Server. To enable third-party linters for additional problem detection, you can enable them by using the **Python: Select Linter** command and selecting the appropriate linter.

## Choose a linter

Install the linting tool of your choice from the VS Code [Marketplace](https://marketplace.visualstudio.com/vscode).

Microsoft publishes the following linting extensions:

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

| Setting        | Default      | Description                                                                                                                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| args           | `[]`         | Arguments to be passed to the linter. **Note**: The officially supported linters run on individual open files. Make sure your configuration applies in that scenario. |
| importStrategy | `useBundled` | When set to `useBundled`, the extension uses the version of the tool that it ships with. When set to `fromEnvironment`, it attempts to load from your selected Python environment first, otherwise it falls back to the bundled version. |

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
| No problems reported | No Python has been selected for your workspace. | Look at the logs for the linter you are using and check the path to the Python environment it's using. If there is no Python selected, run the **Python: Select Interpreter** command from the Command Palette and select an existing interpreter for your workspace.  |

## Next steps

- [Formatting](/docs/python/formatting.md) - Learn about how to format your Python code.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite linter into VS Code.
