---
Order: 10
Area: languages
TOCTitle: PHP
ContentId: DD4E5A59-1586-4A5D-8047-3D58B2FE6937
PageTitle: PHP Programming with Visual Studio Code
DateApproved: 7/3/2019
MetaDescription: Learn about Visual Studio Code editor features (syntax highlighting, snippets, linting) and extensions for PHP.
---
# PHP in Visual Studio Code

Visual Studio Code is a great editor for PHP development. You get features like syntax highlighting and bracket matching, IntelliSense (code completion), and snippets out of the box and you can add more functionality through community-created VS Code [extensions](/docs/editor/extension-gallery.md).

## PHP extensions

There are many PHP language extensions available on the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) and more are being created. You can search for PHP extensions from within VS Code in the **Extensions** view (`kb(workbench.view.extensions)`) then filter the extensions drop-down list by typing `php`.

<div class="marketplace-extensions-php"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

> Tip: The following [setting](/docs/getstarted/settings.md) allows to disable the built-in PHP completions in favor of proposals created by installed PHP extensions.

- `php.suggest.basic`: Configures if the built-in PHP language suggestions are enabled. Enabled by default.

## Snippets

Visual Studio Code includes a set of common snippets for PHP. To access these, hit `kb(editor.action.triggerSuggest)` to get a context-specific list.

![PHP Snippets](images/php/php-snippets.png)

## Linting

VS Code uses the official PHP linter (`php -l`) for PHP language diagnostics. This allows VS Code to stay current with PHP linter improvements.

> Tip: Using XAMPP? Install the full version of PHP in order to obtain the development libraries.

There are three [settings](/docs/getstarted/settings.md) to control the PHP linter:

* `php.validate.enable`: controls whether to enable PHP linting at all. Enabled by default.
* `php.validate.executablePath`: points to the PHP executable on disk. Set this if the PHP executable is not on the system path.
* `php.validate.run`: controls whether the validation is triggered on save (value: `"onSave"`) or on type (value: `"onType"`). Default is on save.

![show PHP settings](images/php/php-settings.png)

To set the PHP executable path, open your **User or Workspace Settings** and add the `php.validate.executablePath`:

### Windows

```json
{
    "php.validate.executablePath": "c:/php/php.exe"
}
```

### Linux and macOS

```json
{
    "php.validate.executablePath": "/usr/bin/php"
}
```

## Debugging

PHP debugging with **XDebug** is supported through a [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug). Follow the extension's instructions for configuring **XDebug** to work with VS Code.

## Next steps

Read on to find out about:

* [Extension Marketplace](/docs/editor/extension-gallery.md) - Browse the extensions others have shared
* [Debugging](/docs/editor/debugging.md) - Learn more about VS Code debugging
