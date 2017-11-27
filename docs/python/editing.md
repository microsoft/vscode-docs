---
Order: 2
Area: python
TOCTitle: Editing Code
ContentId: 0ccb0e35-c4b2-4001-91bf-79ff1618f601
PageTitle: Editing Python Code in Visual Studio Code
DateApproved: 11/10/2017
MetaDescription: Editing Python in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Editing Python in VS Code

The Python extension provides many features for editing Python source code:

- [Autocomplete and Intellisense](#autocomplete-and-intellisense)
- [Formatting](#formatting)
- [Refactoring](#refactoring)

Also see [Linting](/docs/python/linting.md).

## Autocomplete and IntelliSense

Autocomplete and IntelliSense are provided for all files within the current working folder and for Python packages that are installed in standard locations.

<video id="python-code-completion-video" src="https://az754404.vo.msecnd.net/public/python-intellisense.mp4" poster="/images/python_python-intellisense-placeholder.png" autoplay loop controls muted></video>

To enable IntelliSense for packages that are installed in other, non-standard locations, add those locations to the `python.autoComplete.extraPaths` collection in the settings file (the default collection is empty). For example, you might have installed Google App Engine installed in custom locations, in which case you'd specify those locations as follows:

**Windows:**

```json
"python.autoComplete.extraPaths": [
    "C:/Program Files (x86)/Google/google_appengine",
    "C:/Program Files (x86)/Google/google_appengine/lib" ]
```

**Mac/Linux:**

```json
"python.autoComplete.extraPaths": [
    "~/.local/lib/Google/google_appengine",
    "~/.local/lib/Google/google_appengine/lib" ]
```

The `python.autoComplete.preloadModules` setting also allows you speed up autocomplete for specific packages by preloading their information. For example:

```json
"python.autoComplete.preloadModules": ["numpy", "pandas", "matplotlib"],
```

Finally, the `python.autocomplete.addBrackets` setting (default false) determines whether VS Code automatically adds parentheses (`()`) when autocompleting a function name. For example, if you set `addBrackets` to true:

```json
  "python.autoComplete.addBrackets": true,
```

and then write `import os` followed by `os.getc`, you'll see autocomplete for `os.getcwd`. Selecting that auto-complete will add `os.getcwd()` to your source code and place the cursor inside the parentheses. When the setting is false, only `os.getcwd` is added to the file.

For more on IntelliSense generally, see [IntelliSense](/docs/editor/intellisense.md).

### Troubleshooting

If autocomplete and IntelliSense are not working for a custom module, check the following causes:

| Cause | Solution |
| --- | --- |
| The path to the python interpreter is incorrect | Check the `pythonPath` setting. Restart VS Code if you make a correction. |
| The custom module is located in a non-standard location (not installed using pip). | Add the location to the `python.autoComplete.extraPaths` setting and restart VS Code. |
| VS Code was not launched from the active virtual environment that would set the path to custom modules. | Launch VS Code from a command prompt with the correct virtual environment activated, for example: `(venv) ter@minal:~$ code`. |

## Formatting

The Python extension supports source code formatting using either autopep8 (the default) or yapf.

### General formatting settings

| Setting<br/>(python.formatting.) | Default value | Description |
| --- | --- | --- |
| formatOnSave | `false` | Applies formatting on document save. |
| outputWindow | `"Python"` | The name of the output window for formatting messages. |
| provider | `"autopep8"` | Specifies the formatter to use, either "autopep8" or "yapf". |

### Formatter-specific settings

The following settings apply to the individual formatters. The Python extension looks in the current `pythonPath` for the formatter. To use a formatter in another location, specify that location in the appropriate custom path setting.

| Formatter | Install steps | Arguments setting<br/>(python.linting.) | Custom path setting<br/>(python.linting.) |
| --- | --- | --- | --- |
| autopep8 | pip install pep8<br/>pip install --upgrade autopep8 | autopep8Args | autopep8Path |
| yapf | pip install yapf | yapfArgs | yapfPath |

Example custom arguments:

```json
"python.formatting.autopep8Args": ["--max-line-length", "120", "--experimental"],
"python.formatting.yapfArgs": ["--style", "{based_on_style: chromium, indent_width: 20}"]
```

### Troubleshooting

If formatting fails, check the following possible causes:

| Cause | Solution |
| --- | --- |
| The path to the python interpreter is incorrect | Check the `pythonPath` setting. Restart VS Code if you make a correction. |
| The formatter is not installed in the current environment | Open a command prompt, navigate to the location specified in the `pythonPath` setting, and run `pip install` for the formatter.
| The path to the formatter is incorrect. | Check the value of the appropriate `python.formatting.<formatter>Path` setting. |
| Custom arguments for the formatter are incorrect. | Check that the appropriate `python.formatting.<formatter>Path` setting does not contain arguments, and that `python.formatting.<formatter>Args` contains an array of individual argument items such as `"python.formatting.yapfArgs": ["--style", "{based_on_style: chromium, indent_width: 20}"]`.

## Refactoring

The Python extension adds the following refactoring commands: **Extract Variable**, **Extract Method**, and **Sort Imports**.

### Extract Variable

Extracts all similar occurrences of the selected text within the current scope, and replaces it with a variable. The new method is given the name `newvariableNNN` where NNN is a random number.

Invoked by:

- Context Menu: right-click a selection and select **Extract Variable**.
- Command Palette: ⇧⌘P or Ctrl+Shift+P, then **Python Refactor: Extract Variable**.
- Assign a keyboard shortcut to the `python.refactorExtractVariable` command.

![Refactoring a variable](images/editing/refactorExtractVar.gif)

### Extract Method

Extracts all similar occurrences of the selected expression or block of within the current scope, and replaces it with a method call. The new method is given the name `newmethodNNN` where NNN is a random number.

Invoked by:

- Context Menu: right-click a selection and select **Extract Method**.
- Command Palette: ⇧⌘P or Ctrl+Shift+P, then **Python Refactor: Extract Method**.
- Assign a keyboard shortcut to the `python.refactorExtractMethod` command.

![Refactoring code into a method](images/editing/refactorExtractMethod.gif)

### Sort Imports

Sort Imports uses the isort package to consolidate specific imports from the same module into a single `import` statement and  to organize `import` statements in alphabetical order.

Invoked by:

- Right-click in editor and select **Sort Imports** (no selection is required)
- Command Palette (⇧⌘P or Ctrl+Shift+P): **Python Refactor: Sort Imports**
- Assign a keyboard shortcut to the `python.sortImports` command

![Sorting import statements](images/editing/sortImports.gif)

Custom arguments to isort can be specified in the `python.sortImports.args` setting, with each argument as a separate item in the array:

```json
"python.sortImports.args": ["-rc", "--atomic"],
```

To use a custom isort script, use the `python.sortImports.path` setting to specify the path:

Further configurations can be stored in an `.isort.cfg` file as documented on [Configuring isort](https://github.com/timothycrosley/isort#configuring-isort).

## Next steps

- [Linting](/docs/python/linting.md) - Enable, configure, and apply a variety of Python linters.
- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.

- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
- [IntelliSense](/docs/editor/intellisense.md) - Learn about IntelliSense features.
