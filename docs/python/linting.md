---
Order: 3
Area: python
TOCTitle: Linting
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Linting Python in Visual Studio Code
DateApproved: 4/30/2022
MetaDescription: Linting Python in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---

# Linting Python in Visual Studio Code

Linting highlights syntactical and stylistic problems in your Python source code, which often helps you identify and correct subtle programming errors or unconventional coding practices that can lead to errors. For example, linting detects use of an uninitialized or undefined variable, calls to undefined functions, missing parentheses, and even more subtle issues such as attempting to redefine built-in types or functions. Linting is thus distinct from [Formatting](/docs/python/editing.md#formatting) because linting analyzes how the code runs and detects errors whereas formatting only restructures how code **appears**.

> **Note**: Stylistic and syntactical code detection is enabled by the Language Server. To enable third-party linters for additional problem detection, you can enable them by using the **Python: Select Linter** command and selecting the appropriate linter.

## Choose a linter

Install the linting tool of your choice from the marketplace. We support the following linting extensions:

| Linter | Extension                                                                       |
| ------ | ------------------------------------------------------------------------------- |
| Pylint | https://marketplace.visualstudio.com/items?itemName=ms-python.pylint            |
| flake8 | https://marketplace.visualstudio.com/items?itemName=ms-python.flake8            |
| mypy   | https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker |

Linting extensions offered by the community:

| Linter | Extension                                                              |
| ------ | ---------------------------------------------------------------------- |
| Ruff   | https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff |
| mypy   | https://marketplace.visualstudio.com/items?itemName=matangover.mypy    |

> **Note**: If you don't find your preferred linter in the table above or in the marketplace, you can add support via an extension. The [Python Extension Template](/api/advanced-topics/python-extension-template.md) makes it easy to integrate new Python tools into VS Code.

## General Settings

| Setting        | Default      | Description                                                                                                                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| args           | `[]`         | Will be passed to the linter. **Note**: The officially supported linters run on individual opened file. Make sure your configuration applies in that scenario.                                         |
| importStrategy | `useBundled` | `useBundled` means extension uses bundled version of the linter. `fromEnvironment` means it will attempt to load from your selected python environment first, otherwise falls back to bundled version. |

## Disable linting

Linters, if installed, are enabled by default. You can disable them by [disabling the extension](/docs/editor/extension-marketplace.md#disable-an-extension) per workspace.

## Run linting

Linting will automatically run when a Python file is opened or saved.

Errors and warnings are shown in the **Problems** panel for open files, and are also highlighted in the code editor. Hovering over an underlined issue displays the details:

![Linting messages in the editor and the Problems panel](images/linting/lint-messages.png)

## Code Actions

Some linters may offer code actions that can help address reported problems.

## Logging

Logs for linters are available in the `Output` panel when you select `<linter name>` from the drop down menu.

You can change the log level for a linter extension by running the command pallet command `Developer: Set Log Level` select the extension from the extension logs group. and change the level.

## Severity

Linters report issues with some predefined severity. This can be changed using `severity` setting for the linter. Refer to readme for the linter extension of your choice for more details on the supported values and severity levels.

## Troubleshooting linting

| Issue | Cause | Solution |
| --- | --- | --- |
| No problems reported | No python selected | Look at the logs for the linter you are using. It should say which python is being used. If there is no python selected, there should be some instructions on how to select an interpreter. |

## Next steps

-   [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
-   [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
-   [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
-   [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
-   [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite linter into VS Code.
