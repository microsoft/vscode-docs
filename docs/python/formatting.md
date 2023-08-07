---
Order: 4
Area: python
TOCTitle: Formatting
ContentId: c5039182-eee4-47ff-a2a8-dc28f4bc2cbc
PageTitle: Formatting Python in Visual Studio Code
DateApproved: 8/7/2023
MetaDescription: Formatting Python in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Formatting Python in VS Code

Formatting makes source code easier to read by human beings. By enforcing particular rules and conventions such as line spacing, indents, and spacing around operators, the code becomes more visually organized and comprehensible. You can view an example on the [autopep8](https://pypi.org/project/autopep8/) page. Keep in mind, formatting doesn't affect the functionality of the code itself.

[Linting](/docs/python/linting.md) helps to prevent errors by analyzing code for common syntactical, stylistic, and functional errors and unconventional programming practices. Although there is a little overlap between formatting and linting, the two capabilities are complementary.

The Python extension supports source code formatting through formatter extensions, such as [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) and [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter).

## Set a default formatter

Once you install a formatter extension, you can select it as the default formatter for Python files in VS Code by following the steps below:

1. Open a Python file in VS Code.
1. Right-click on the editor to display the context menu.
1. Select **Format Document With...**.
1. Select **Configure Default Formatter...** from the drop-down menu.
1. Select your preferred formatter extension from the list.

Alternatively, you can set it as the default formatter for all Python files by setting `"editor.defaultFormatter"` in your User `settings.json` file, under a `[python]` scope. You can open `settings.json` with the **Preferences: Open User Settings (JSON)** command.

For example, to set Black Formatter as the default formatter, add the following setting to your User `settings.json` file:

```json
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  }
```

## Format your code

You can format your code by right-clicking on the editor and selecting **Format Document**, or by using the `kb(editor.action.formatDocument)` keyboard shortcut.

You can also add the following setting to your User `settings.json` file to enable formatting on save for your code:

```json
  "[python]": {
    "editor.formatOnSave": true
  }
```

## General formatting settings

Each formatter extension may have its own settings, but the ones below are supported by both [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) and [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter):

| Setting Suffix<br/> | Default value | Description |
| --- | --- | --- |
| args | `[]` | Arguments to be passed to the formatter. Each argument should be passed as a separate string in the array. <br> For example:<br> `black-formatter.args: ["--line-length", "100"]` |
| importStrategy | `useBundled` | When set to `useBundled`, the extension uses the version of the tool that it ships with. When set to `fromEnvironment`, it attempts to load from your selected Python environment first, otherwise it falls back to the bundled version. |
| path | `""` | Path to the formatter binary to be used for formatting. **Note:** Using this option may slow down formatting. |
| interpreter | `[]` | When set to a path to a Python executable, the extension will use that to launch the formatter server and its subprocesses. |
| showNotifications | `off`| Controls when notifications are displayed by this extension. Supported values are `off`, `always`, `onError`, and `onWarning`. |

## Troubleshoot formatting

If formatting fails, check the following possible causes:

| Problem | Solution |
| --- | --- |
| There are multiple formatters available for Python files. | Set the default formatter by following the instructions in [the section above](#set-a-default-formatter). |
| Custom arguments for the formatter are incorrect. | Check that the appropriate `<formatter>.path` setting does not contain arguments, and that `<formatter>.args` contains a list of individual top-level argument elements. |
| The **Format Selection** command fails when using Black Formatter. | `black` does not support formatting sections of code. To work around this limitation, you can disable format on paste and set `formatOnSave` to format the whole file with the following settings: `"[python]": {"editor.formatOnPaste": false, "editor.formatOnSaveMode": "file"}`.|
| The document isn't formatted.  | Check the formatter extension's Output channel to understand why the formatter has failed (run the **Output: Focus on Output** command in the Command Palette and then select the formatter extension channel).|

> **Note**: If you don't find your preferred formatter listed above, you can add support via an extension. The [Python Extension Template](/api/advanced-topics/python-extension-template.md) makes it easy to integrate new Python tools into VS Code.

## Next steps

- [Debugging](/docs/python/debugging.md) - Learn to debug Python both locally and remotely.
- [Testing](/docs/python/testing.md) - Configure test environments and discover, run, and debug tests.
- [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
- [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
- [Python Extension Template](/api/advanced-topics/python-extension-template.md) - Create an extension to integrate your favorite linter into VS Code.
