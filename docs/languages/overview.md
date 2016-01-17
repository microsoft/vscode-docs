---
Order: 1
Area: languages
TOCTitle: Overview
PageTitle: Language Support in Visual Studio Code
DateApproved: 12/18/2015
MetaDescription: In Visual Studio Code we have support for all common languages.  We even support debugging for Node.js and ASP.NET 5.
---


# Languages

## What Languages are Supported
In Visual Studio Code, we have support for many languages out of the box and more through language extensions available on the [VS Code Marketplace](http://marketplace.visualstudio.com/vscode/Languages).

>**Tip:** You can also add support for your favorite language through TextMate colorizers.  See [Colorizers](/docs/customization/colorizer.md) to learn how to integrate TextMate .tmLanguage syntax files into VS Code.

![Languages](images/overview/languagecoverage.png)

The richness of support varies across the different languages. The table below provides a brief description of Visual Studio Code's various languages features.  Click on any linked item to get an overview of how to use VS Code in the context of that language.

Features|Languages
--------|-------------------------
Syntax coloring, bracket matching |Batch, C++, Clojure, Coffee Script, [Dockerfile](/docs/languages/dockerfile.md), F#, Go, Jade, Java, HandleBars, Ini, Lua, Makefile, Objective-C, Perl, PowerShell, Python, R, Razor, Ruby, Rust, SQL, Visual Basic, XML
+ Snippets| Groovy, [Markdown](/docs/languages/markdown.md), PHP, Swift
+ IntelliSense, linting, outline|[CSS](/docs/languages/css.md), [HTML](/docs/languages/html.md), [JavaScript](/docs/languages/javascript.md), [JSON](/docs/languages/json.md), [Less](/docs/languages/css.md), [Sass](/docs/languages/css.md)
+ Refactoring, find all references|[TypeScript](/docs/languages/typescript.md), [C&#35;](/docs/languages/csharp.md)

## Language Extensions

The community is providing VS Code language support for nearly any modern programming language.  To see if there are extensions for the language you're interested in, simply bring up the extension gallery and filter on the language name.  Type `kb(workbench.action.showCommands)`, `'ext inst '` to bring up the extension gallery dropdown and then type the language name to filter the results.

![filter go](images/overview/filter-go.png)

You can also browse the VS Code Marketplace directly to look for [supported languages](https://marketplace.visualstudio.com/vscode/Languages).

## Changing the Language for the Selected File

In VS Code, we default the language support for a file based on its filename extension.  However at times you may wish to change language modes, to do this click on the language indicator - which is located on the right hand of the status bar.  This will bring up the Command Palette for Select Language Mode.

![Language Selector](images/overview/languageselect.png)

## Next Steps
Now you know that VS Code has support for the languages you care about. Read on...

* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines
* [Customization](/docs/customization/overview.md) - themes, settings and keyboard bindings

## Common Questions

**Q: Can I contribute my own language service?**

**A:** Not yet but soon. Help us prioritize this in our [user voice](http://go.microsoft.com/fwlink/?LinkID=533482) site.

**Q: Can I map additional file extensions to a language?**

**A:** Currently this is not supported but it's on the way.
