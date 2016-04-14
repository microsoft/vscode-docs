---
Order: 7
Area: languages
TOCTitle: PHP
ContentId: DD4E5A59-1586-4A5D-8047-3D58B2FE6937
PageTitle: PHP Programming with Visual Studio Code
DateApproved: 4/14/2016
MetaDescription: Learn about Visual Studio Code features (syntax highlighting, snippets, linting) for PHP development.
---

# PHP Programming in VS Code

Visual Studio Code is a great editor for PHP development. You get features like syntax highlighting and bracket matching, IntelliSense, and snippets out of the box and you can add more functionality through community created VS Code [extensions](/docs/editor/extension-gallery.md).

![show PHP IntelliSense](images/php/php-intellisense.png)

## Snippets

Visual Studio Code includes a set of common snippets for PHP.  To access these, hit `kb(editor.action.triggerSuggest)` to get a context specific list.

![PHP Snippets](images/php/php-snippets.png)

## Linting

VS Code uses the official PHP linter (`php -l`) for PHP language diagnostics. This allows VS Code to stay current with PHP linter improvements.

There are three [settings](/docs/customization/userandworkspace.md) to control the PHP linter:

* `php.validate.enable`: controls whether to enable PHP linting at all. Enabled by default.
* `php.validate.executablePath`: points to the PHP executable on disk. Set this if the PHP executable is not on the system path.
* `php.validate.run`: controls whether the validation is triggered on save (value: `"onSave"`) or on type (value: `"onType"`). Default is on save.

![show PHP settings](images/php/php-settings.png)

To set the PHP executable path, open your **User or Workspace Settings** and add the `php.validate.executablePath`:

```json
{
    "php.validate.executablePath": "c:/php/php.exe"
}
```

## Extensions

There are many PHP language extensions available on the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) and more are being created.  You can search for PHP extensions from within VS Code by running the **Extensions: Install Extension** command (`kb(workbench.action.showCommands)` and type `ext install`) then filter the extensions drop down list by typing `php`.

![show PHP extensions](images/php/php-extensions.png)

## Debugging

PHP debugging with **XDebug** is supported through a [PHP Debug extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug).  Follow the extension's instructions for configuring **XDebug** to work with VS Code.

## Next Steps

Read on to find out about:

* [Extension Marketplace](/docs/editor/extension-gallery.md) - Browse the extensions others have shared
* [Debugging](/docs/editor/debugging.md) - Learn more about VS Code debugging


