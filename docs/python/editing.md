---
Order: 2
Area: python
TOCTitle: Editing Code
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Editing Python Code in Visual Studio Code
DateApproved: 3/6/2023
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

For more on IntelliSense generally, see [IntelliSense](/docs/editor/intellisense.md).

> **Tip**: Check out the [IntelliCode extension for VS Code](https://go.microsoft.com/fwlink/?linkid=2006060). IntelliCode provides a set of AI-assisted capabilities for IntelliSense in Python, such as inferring the most relevant auto-completions based on the current code context. For more information, see the [IntelliCode for VS Code FAQ](https://learn.microsoft.com/visualstudio/intellicode/intellicode-visual-studio-code).

### Customize IntelliSense behavior

Enabling the full set of IntelliSense features by default could end up making your development experience feel slower, so the Python extension enables a minimum set of features that allow you to be productive while still having a performant experience. However, you can customize the behavior of the analysis engine to your liking through multiple settings.

### Enable Auto Imports

[Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) offers auto import suggestions for modules in your workspace and/or packages you have installed in your environment. This enables import statements to be automatically added as you type. Auto imports are disabled by default, but you can enable them by setting `python.analysis.autoImportCompletions` to `true` in your settings.

By default, only top-level symbols/packages are suggested to be auto imported. For example, you may see `import matplotlib` as a suggestion, but not `import matplotlib.pyplot` by default. However, you can customize this behavior through the `python.analysis.packageIndexDepths` setting (check out the [IntelliSense settings documentation](/docs/python/settings-reference.md#pylance-language-server) to learn more). User defined symbols (those not coming from installed packages or libraries) are only automatically imported if they have already been used in files opened in the editor. Otherwise, they will only be available through the [add imports Quick Fix](/docs/python/editing.md#quick-fixes).

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

### Troubleshooting IntelliSense

For autocomplete and IntelliSense issues, check the following causes:

| Cause | Solution |
| --- | --- |
| Pylance seems slow or is consuming too much memory when working on a large workspace. | If there are subfolders you know can be excluded from Pylance's analysis, you can add their paths to the `python.analysis.exclude` setting to see if performance improves. Alternatively, you can try setting `python.analysis.indexing` to `false` to disable Pylance's indexer (**Note**: this will also impact the experience of completions and auto imports. Learn more about indexing in [code analysis settings](/docs/python/settings-reference.md#code-analysis-settings)).  |
| Pylance is only offering top-level symbol options when adding imports. | Try increasing the depth to which Pylance can index your installed libraries through the `python.analysis.packageIndexDepths`. Check [code analysis settings](/docs/python/settings-reference.md#code-analysis-settings).     |
| The path to the python interpreter is incorrect | Make sure you selected a valid interpreter path by running the **Python: Select Interpreter** command (see [Environments](/docs/python/environments.md)). |
| The custom module is located in a non-standard location (not installed using pip). | Add the location to the `python.autoComplete.extraPaths` setting and restart VS Code. |

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

## Formatting

Formatting makes code easier to read by human beings. It applies specific rules and conventions for line spacing, indents, spacing around operators, and so on. You can view an example on the [autopep8](https://pypi.org/project/autopep8/) page. Keep in mind, formatting doesn't affect the functionality of the code itself.

[Linting](/docs/python/linting.md) helps to prevent errors by analyzing code for common syntactical, stylistic, and functional errors and unconventional programming practices. Although there is a little overlap between formatting and linting, the two capabilities are complementary.

The Python extension supports source code formatting through formatter extensions, such as [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) and [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter).

### Setting a default formatter
Once you install a formatter extension, you can select it as the default formatter for Python files in VS Code by following the steps below:
1. Open a Python file in VS Code
1. Right click on the editor
1. Select **Format Document With...**
1. Select **Configure Default Formater...** from the drop-down menu
1. Select your preferred formatter extension from the list.


Alternatively, you can set it as the default formatter for all Python files by setting `"editor.defaultFormatter"` in your User `settings.json` file, under a `[python]` scope.

For example, to set Black Formatter as the default formatter, add the following setting to your User `settings.json` file:

```
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
```

### Formatting your code

You can format your code by right-clicking on the editor and selecting **Format Document**, or by using the `kb(editor.action.formatDocument)` keyboard shortcut.

You can also add the following setting to your User `settings.json` file to enable formatting on save for your code:

```
  "[python]": {
    "editor.formatOnSave": true
  }
```

### General formatting settings

Each formatter extension may have its own settings, but the ones below are supported by both [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) and [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter):

| Setting Suffix<br/> | Default value | Description |
| --- | --- | --- |
| args | `[]` | Arguments to be passed to the formatter. Each argument should be passed as a separate string in the array. <br> For example:<br> `black-formatter.args: ["--line-length", "100"]` |
| importStrategy | `useBundled` | When set to `useBundled`, the extension uses the version of the tool that it ships with. When set to `fromEnvironment`, it attempts to load from your selected Python environment first, otherwise it falls back to the bundled version. |
| path | `""` | Path to the formatter binary to be used for formatting. **Note:** Using this option may slowdown formatting. |
| interpreter | `[]` | When set to a path to a Python executable, the extension will use that to launch the formatter server and its subprocesses. |
| showNotifications | `off`| Controls when notifications are displayed by this extension. Supported values are `off`, `always`, `onError`, and `onWarning`. |


### Troubleshooting formatting

If formatting fails, check the following possible causes:

| Problem | Solution |
| --- | --- |
| There are multiple formatters available for Python files | Set the default formatter by following the instructions in [the section above](#setting-a-default-formatter). |
| Custom arguments for the formatter are incorrect. | Check that the appropriate `<formatter>.path` setting does not contain arguments, and that `<formatter>.args` contains a list of individual top-level argument elements. |
| Format Selection fails with Black Formatter | `black` does not support formatting sections of code. To work around this limitation, you can disable format on paste and set `formatOnSave`` to format the whole file with the following settings: `"[python]": {"editor.formatOnPaste": false, "editor.formatOnSaveMode": "file"}`.|
| The document isn't formatted.  | Check the formatter extension's Output channel to understand why the formatter has failed (run the **Output: Focus on Output** command in the Command Palette and then select the formatter extension channel).|

> **Note**: If you don't find your preferred formatter listed above, you can add support via an extension. The [Python Extension Template](/api/advanced-topics/python-extension-template.md) makes it easy to integrate new Python tools into VS Code.

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

## Next steps

- [Linting](/docs/python/linting.md) - Enable, configure, and apply various Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
- [IntelliSense](/docs/editor/intellisense.md) - Learn about IntelliSense features.
- [Jupyter Support](/docs/datascience/jupyter-notebooks.md) - Learn how to get started with Jupyter Notebooks.
- [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite Python tools.
