---
Order: 5
Area: customization
TOCTitle: Colorizer
PageTitle: Visual Studio Code Colorizers
DateApproved: 10/12/2015
MetaDescription: How to add colorization and bracket matching.
---

## Customization - Adding Language Colorization & Bracket Matching
Using the 'code' Yeoman generator you can add TextMate language specification files (.tmLanguage) to your VS Code installation to get syntax highlighting and bracket matching.

A good place to look for existing TextMate .tmLanguage files is on GitHub.  Search for a TextMate bundle for the language you are interested in and then navigate to the `Syntaxes` folder.  The 'code' Yeoman generator can handle either .tmLanguage or .plist files.  When prompted for the URL or file location, pass the raw path to the .tmLanguage file e.g. http://raw.githubusercontent.com/textmate/ant.tmbundle/master/Syntaxes/Ant.tmLanguage.

![yo code language](images/colorizer/yocodelanguage.png)

The generator will prompt you for other information such a unique name (this should be unique to avoid clashing with other customizations) and the language name, aliases and file extensions. 

When the generator is finished, copy the complete output folder to a new folder under `.vscode/extensions`.  When you restart VS Code, your new language will be visible in the language specifier dropdown and you'll get full colorization and bracket/tag matching for files matching the language's file extension.

![ant language](images/colorizer/antlanguage.png)
at it does or at least mention in the coming releases we will provide more context

## Next Steps
Read on to find out about:  

* [Customization](/docs/customization/overview) - Learn about all of VS Code's customization options.
* [Custom themes](/docs/customization/themes) - Learn how to import existing TextMate themes.
