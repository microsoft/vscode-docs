---
Order: 1
Area: languages
TOCTitle: Overview
PageTitle: Language Support in Visual Studio Code
DateApproved: 9/10/2015
MetaDescription: In Visual Studio Code we have support for all common languages.  We even support debugging for Node.js and ASP.NET 5.
---


# Languages

## What Languages are Supported
In Visual Studio Code we have support for many languages. The richness of support varies across the different languages.

![Languages](images/languages/languagecoverage.png)

The table below provides a brief description of Visual Studio Code's various languages features.  Click on any linked item to get an overview of how to use VS Code in the context of that language.

Features|Languages
--------|-------------------------
Syntax coloring, bracket matching |Batch, C++, Clojure, Coffee Script, [Dockerfile](/docs/languages/dockerfile), F#, Go, Jade, Java, HandleBars, Ini, Lua, Makefile, Objective-C, Perl, PowerShell, Python, R, Razor, Ruby, Rust, SQL, Visual Basic, XML
+ Snippets| Groovy, [Markdown](/docs/languages/markdown), PHP, Swift
+ IntelliSense, linting, outline|[CSS](/docs/languages/css), [HTML](/docs/languages/html), [JavaScript](/docs/languages/javascript), [JSON](/docs/languages/json), [Less](/docs/languages/css), [Sass](/docs/languages/css)
+ Refactoring, find all references|[TypeScript](/docs/languages/typescript), [C&#35;](/docs/languages/csharp)

## Changing the Language for the Selected File

In VS Code, we default the language support for a file based on its filename extension.  However at times you may wish to change language modes, to do this click on the language indicator - which is located on the right hand of the status bar.  This will bring up the Command Palette for Select Language Mode.

![Language Selector](images/languages/languageselect.png)

## Next Steps
Now you know that VS Code has support for the languages you care about. Read on...

* [Editing Evolved](/docs/editor/editingevolved) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition and more
* [Debugging](/docs/editor/debugging) - This is where VS Code really shines
* [Customization](/docs/editor/customization) - themes, settings and keyboard bindings

## Common Questions

**Q: Can I contribute my own language service?**

**A:** Not yet but soon. Help us prioritize this in our [user voice](http://go.microsoft.com/fwlink/?LinkID=533482) site.

**Q: Can I map additional extensions to a language?**

**A:** Currently this is not supported but it's on the way.