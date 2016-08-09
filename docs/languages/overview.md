---
Order: 1
Area: languages
TOCTitle: Overview
ContentId: AC888642-FBE5-43E5-9DC2-47B197717940
PageTitle: Language Support in Visual Studio Code
DateApproved: 8/4/2016
MetaDescription: In Visual Studio Code we have support for all common languages including smart code completion and debugging.
---

# Programming Languages

In Visual Studio Code, we have support for many programming languages out of the box (JavaScript, TypeScript, CSS, HTML) and more through language extensions available on the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode/Languages).

<div class="marketplace-extensions-languages"></div>

## What Languages are Supported

Batch - [C++](/docs/languages/cpp.md) - [C&#35;](/docs/languages/csharp.md) - Clojure - Coffee Script - [CSS](/docs/languages/css.md) - [Dockerfile](/docs/languages/dockerfile.md) - F# - Go - Groovy - HandleBars - [HTML](/docs/languages/html.md) - Ini - Jade - Java - [JavaScript](/docs/languages/javascript.md) - [JSON](/docs/languages/json.md) - [Less](/docs/languages/css.md) - Lua - Makefile - 
[Markdown](/docs/languages/markdown.md) - Objective-C - Pascal - Perl  - [PHP](/docs/languages/php.md) - PowerShell - [Python](/docs/languages/python.md) - R - Razor - Ruby - Rust - [Sass](/docs/languages/css.md) - Scala - SQL - Swift - [TypeScript](/docs/languages/typescript.md) - Visual Basic - XML

>Click on any linked item to get an overview of how to use VS Code in the context of that language.

## Language Features in VS Code

The richness of support varies across the different languages and their extensions:

* Syntax highlighting and bracket matching
* Smart completions (IntelliSense)
* Linting and corrections
* Code navigation (Go to Definition, Find All References)
* Debugging
* Refactoring

## Language Extensions

The community is providing VS Code language support for nearly any modern programming language.  To see if there are [extensions](/docs/editor/extension-gallery.md) for the language you're interested in, simply bring up the Extension view (`kb(workbench.view.extensions)`) and filter on the language name in the search box.

![python extensions](images/overview/extensions-python.png)

You can also browse the VS Code Marketplace directly to look for [supported languages](https://marketplace.visualstudio.com/vscode/Languages).

## Changing the Language for the Selected File

In VS Code, we default the language support for a file based on its filename extension.  However at times you may wish to change language modes, to do this click on the language indicator - which is located on the right hand of the status bar.  This will bring up the Command Palette for Select Language Mode.

![Language Selector](images/overview/languageselect.png)

## Adding a file extension to a Language

You can add new file extensions to an existing language with the `files.associations` [setting](/docs/customization/userandworkspace.md).

For example, the setting below adds the `.myphp` file extension to the `php` language:

```json
    "files.associations": {
        "*.myphp": "php"
    }
```

IntelliSense (`kb(editor.action.triggerSuggest)`) will show you the available language identifiers.

![language id IntelliSense](images/overview/language-id-intellisense.png)

## Next Steps

Now you know that VS Code has support for the languages you care about. Read on...

* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines
* [Customization](/docs/customization/overview.md) - themes, settings and keyboard bindings

## Common Questions

**Q: Can I contribute my own language service?**

**A:** Yes you can! Check out the [example language server](/docs/extensions/example-language-server.md) in the [Extending Visual Studio Code](/docs/extensions/overview.md) documentation.

**Q: What if I don't want to create a full language service, can I reuse existing TextMate bundles?**

>**A:** Yes, you can also add support for your favorite language through TextMate colorizers.  See [Colorizers](/docs/customization/colorizer.md) to learn how to integrate TextMate .tmLanguage syntax files into VS Code. 

**Q: Can I map additional file extensions to a language?**

**A:** Yes, with the `files.associations` [setting](/docs/customization/userandworkspace.md) you can map file extensions to an existing language either globally or per workspace.

Here is an example that will associate more file extensions to the PHP language:

```json
"files.associations": {
    "*.php4": "php",
    "*.php5": "php"
}
```

You can also configure full file paths to languages if needed. The following example associates all files in a folder `somefolder` to PHP:

```json
"files.associations": {
    "**/somefolder/*.*": "php"
}
```

Note that the pattern is a [glob pattern](https://en.wikipedia.org/wiki/Glob_%28programming%29) that will match on the full path of the file if it contains a `/` and will match on the file name otherwise.