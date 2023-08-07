---
Order: 2
Area: python
TOCTitle: Editing Code
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Editing Python Code in Visual Studio Code
DateApproved: 8/7/2023
MetaDescription: Editing Python in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Editing Python in Visual Studio Code

Visual Studio Code is a powerful editing tool for Python source code. The editor includes various features to help you be productive when writing code. For more information about editing in Visual Studio Code, see [Basic Editing](/docs/editor/codebasics.md) and [Code Navigation](/docs/editor/editingevolved.md).

In this overview, we will describe the specific editing features provided by the [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), including steps on how to customize these features via user and workspace [settings](/docs/getstarted/settings.md).

## Autocomplete and IntelliSense

IntelliSense is a general term for code editing features that relate to code completion. Take a moment to look at the example below. When **print** is typed, notice how IntelliSense populates auto-completion options. The user is also given a list of options when they begin to type the variable named **greeting**.

![Hello World Example for IntelliSense](images/editing/hello-world.gif)

Autocomplete and IntelliSense are provided for all files within the current working folder. They're also available for Python packages that are installed in standard locations.

[Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) is the default language server for Python in VS Code, and is installed alongside the Python extension to provide IntelliSense features.

Pylance is based on Microsoft’s [Pyright](https://github.com/microsoft/pyright) static type checking tool, leveraging [type stubs](https://typing.readthedocs.io/en/latest/source/stubs.html) (`.pyi` files) and lazy type inferencing to provide a highly-performant development experience.

For more on IntelliSense generally, see [IntelliSense](/docs/editor/intellisense.md).

> **Tip**: Check out the [IntelliCode extension for VS Code](https://go.microsoft.com/fwlink/?linkid=2006060). IntelliCode provides a set of AI-assisted capabilities for IntelliSense in Python, such as inferring the most relevant auto-completions based on the current code context. For more information, see the [IntelliCode for VS Code FAQ](https://learn.microsoft.com/visualstudio/intellicode/intellicode-visual-studio-code).

### Customize IntelliSense behavior

Enabling the full set of IntelliSense features by default could end up making your development experience feel slower, so the Python extension enables a minimum set of features that allow you to be productive while still having a performant experience. However, you can customize the behavior of the analysis engine to your liking through multiple settings.

### Enable Auto Imports

Pylance offers auto import suggestions for modules in your workspace and/or packages you have installed in your environment. This enables import statements to be automatically added as you type. Auto imports are disabled by default, but you can enable them by setting `python.analysis.autoImportCompletions` to `true` in your settings.

### Enable IntelliSense for custom package locations

To enable IntelliSense for packages that are installed in non-standard locations, add those locations to the `python.analysis.extraPaths` collection in your `settings.json` file (the default collection is empty). For example, you might have Google App Engine installed in custom locations, specified in `app.yaml` if you use Flask. In this case, you'd specify those locations as follows:

**Windows:**

```json
"python.analysis.extraPaths": [
    "C:/Program Files (x86)/Google/google_appengine",
    "C:/Program Files (x86)/Google/google_appengine/lib/flask-0.12"]
```

**macOS/Linux:**

```json
"python.analysis.extraPaths": [
    "~/.local/lib/Google/google_appengine",
    "~/.local/lib/Google/google_appengine/lib/flask-0.12" ]
```

For the full list of available IntelliSense controls, you can reference the Python extension [code analysis settings](/docs/python/settings-reference.md#code-analysis-settings) and [autocomplete settings](/docs/python/settings-reference.md#autocomplete-settings).

You can also customize the general behavior of autocomplete and IntelliSense, even disable the features completely. You can learn more in [Customizing IntelliSense](/docs/editor/intellisense.md#customizing-intellisense).

## Enhance completions with AI

[GitHub Copilot](https://copilot.github.com/) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) in VS Code to generate code, or to learn from the code it generates.

![Copilot extension in the VS Code Marketplace](images/editing/copilot-extension.png)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the [Copilot documentation](/docs/editor/artificial-intelligence.md).

## Navigation

While editing, you can right-click different identifiers to take advantage of several convenient commands

- **Go to Definition** (`kb(editor.action.revealDefinition)`) jumps from your code into the code that defines an object. This command is helpful when you're working with libraries.

- **Peek Definition** (`kb(editor.action.peekDefinition)`), is similar, but displays the definition directly in the editor (making space in the editor window to avoid obscuring any code). Press `kbstyle(Escape)` to close the Peek window or use the **x** in the upper right corner.

- **Go to Declaration** jumps to the point at which the variable or other object is declared in your code.

- **Peek Declaration** is similar, but displays the declaration directly in the editor. Again, use `kbstyle(Escape)` or the **x** in the upper right corner to close the Peek window.

## Quick Fixes

The add imports Quick Fix when using Pylance allows you to quickly complete import statements. First, begin by typing a package name within the editor. You will notice a Code Action is available to automatically complete the line of source code (as long as you have the module installed within the environment). Hover over the text (marked with a squiggle) and then select the Code Action light bulb when it appears. You can then select from a list of potential imports.
![Adding an import](images/editing/quickFix.gif)

This Code Action also recognizes some of the popular abbreviations for the following common Python packages: `numpy` as np, `tensorflow` as tf, `pandas` as pd, `matplotlib.pyplot` as plt, `matplotlib`, as mpl, `math` as m, `scipi.io` as spio, and `scipy` as sp, `panel` as pn, and `holoviews` as hv.

![Common package abbreviations](images/editing/packageAbbreviations.gif)

The import suggestions list is ordered with import statements for packages (or modules) at the top. It will also include statements for more modules and/or members (classes, objects, etc.) from specified packages.

Just like with auto imports, only top-levels symbols are suggested by default. You can customize this behavior through the `python.analysis.packageIndexDepths` setting.

## Refactoring

The Python extension adds the following refactoring functionalities: **Extract Variable**, **Extract Method** and **Rename Module**. It also supports extensions that implement additional refactoring features such as **Sort Imports**.

### Extract Variable

Extracts all similar occurrences of the selected text within the current scope, and replaces it with a new variable.

You can invoke this command by selecting the line of code you wish to extract as a variable. Then select the light-bulb that is displayed next to it.

![Refactoring a variable](images/editing/refactorExtractVar.gif)

### Extract Method

Extracts all similar occurrences of the selected expression or block within the current scope, and replaces it with a method call.

You can invoke this command by selecting the lines of code you wish to extract as a method. Then select the light-bulb that is displayed next to it.

![Refactoring code into a method](images/editing/refactorExtractMethod.gif)

### Rename Module

After a Python file/module is renamed, Pylance can find all instances that may need to be updated and provide you with a preview of all the changes.

To customize which references need to be updated, you can toggle the checkboxes at the line or from the file level in **Refactor Preview**. Once you've made your selections, you can select **Apply Refactoring** or **Discard Refactoring**.

![Renaming a module](images/editing/refactorRenameModule.gif)

### Sort Imports

The Python extension supports extensions such as [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort) and [Ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff) that implement the **Sort Imports** functionality. This command consolidates specific imports from the same module into a single `import` statement,  and organizes `import` statements in alphabetical order.

You can invoke this by installing an extension that supports sorting imports, then opening the Command Palette (`kb(workbench.action.showCommands)`) and running **Organize Imports**.

> **Tip**: you can assign a keyboard shortcut to the `editor.action.organizeImports` command.

![Sorting import statements](images/editing/sortImports.gif)

## Troubleshooting

For help with common IntelliSense and Python editing issues, check the table below:

| Problem | Cause | Solution |
| --- | --- | ---|
| Pylance is only offering top-level symbol options when adding imports. | By default, only top-level modules are indexed (depth=1). <br>For example, you may see `import matplotlib` as a suggestion, but not `import matplotlib.pyplot` by default. | Try increasing the depth to which Pylance can index your installed libraries through the `python.analysis.packageIndexDepths`. Check [code analysis settings](/docs/python/settings-reference.md#code-analysis-settings). |
| Pylance is not automatically adding missing imports | The auto import completion setting may be disabled. | Check the [Enable Auto Imports section](/docs/python/editing.md#customize-intellisense-behavior). |
| Auto imports are enabled but Pylance is not automatically importing symbols defined in other files in the workspace. | User defined symbols (those not coming from installed packages or libraries) are only automatically imported if they have already been used in files opened in the editor.<br> Otherwise, they will only be available through the [add imports Quick Fix](/docs/python/editing.md#quick-fixes). |  Use the add imports Quick Fix, or make sure to open the relevant files in your workspace first.  |
| Pylance seems slow or is consuming too much memory when working on a large workspace. | Pylance analysis is done on all files present in a given workspace.  | If there are subfolders you know can be excluded from Pylance's analysis, you can add their paths to the `python.analysis.exclude` setting. Alternatively, you can try setting `python.analysis.indexing` to `false` to disable Pylance's indexer (**Note**: this will also impact the experience of completions and auto imports. Learn more about indexing in [code analysis settings](/docs/python/settings-reference.md#code-analysis-settings)).  |
| You are unable to install a custom module into your Python project. | The custom module is located in a non-standard location (not installed using pip). | Add the location to the `python.autoComplete.extraPaths` setting and restart VS Code. |

### Pylance Diagnostics

Pylance by default provides diagnostics for Python files in the Problems panel.

The list below are some of the most common diagnostics provided by Pylance and how to fix them.

#### importResolveSourceFailure

This error occurs when Pylance is able to find type stubs for the imported package, but is unable find the package itself. This can happen when the package you are trying to import is not installed in the selected Python environment.

**How to fix it**

- If the package is already installed in a different interpreter or kernel, [select the correct interpreter](/docs/python/environments.md#select-and-activate-an-environment).
- If the package is not installed, you can install it by running the following command in an activated terminal: `python -m pip install {package_name}`.

#### importResolveFailure

This error happens when Pylance is unable to find the package or module you're importing, nor its type stubs.

**How to fix it**

- If you are importing a module, make sure it exists in your workspace or in a location that is included in the `python.autoComplete.extraPaths` setting.
- If you are importing a package that is not installed, you can install it by running the following command in an activated terminal: `python -m pip install {package_name}`.
- If you are importing a package that is already installed in a different interpreter or kernel, [select the correct interpreter](/docs/python/environments.md#select-and-activate-an-environment).
- If you are working with an editable install and it is currently set up to use import hooks, consider switching to using `.pth` files to enhance compatibility and ensure smoother import behavior. Learn more in the [Pyright documentation](https://microsoft.github.io/pyright/#/import-resolution?id=editable-installs).

#### importCycleDetected

This error occurs when Pylance detects a circular dependency between two or more modules.

**How to fix it**

Try to reorder your import statements to break the circular dependency.

---

The severity of Pylance's diagnostics can be customized through the `python.analysis.diagnosticSeverityOverrides` setting. Check the [settings reference](/docs/python/settings-reference.md) for more information.

## Next steps

- [Linting](/docs/python/linting.md) - Enable, configure, and apply various Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
- [IntelliSense](/docs/editor/intellisense.md) - Learn about IntelliSense features.
- [Jupyter Support](/docs/datascience/jupyter-notebooks.md) - Learn how to get started with Jupyter Notebooks.
- [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite Python tools.
