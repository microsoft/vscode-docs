---
Order: 5
Area: customization
TOCTitle: Colorizer
PageTitle: Visual Studio Code Colorizers
DateApproved: 10/12/2015
MetaDescription: How to add colorization and bracket matching.
---

# Adding Language Colorization
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

## Common Questions

**Q: Can I add more file extensions to my colorizer?**

**A:** Yes, the `yo code` generator provides the default file extensions from the .tmLanguage file but you can easily add more file extensions to a `languages` contribution `extensions` array.  In the example below, the `.asp` file extension has been added to the default `.asa` file extension. 

```json
{
	"name": "asp",
	"version": "0.0.1",
	"engines": {
		"vscode": ">=0.9.0"
	},
	"publisher": "none",
	"contributes": {
		"languages": [{
			"id": "asp",
			"aliases": ["ASP", "asp"],
			"extensions": [".asa", ".asp"]
		}],
		"grammars": [{
			"language": "asp",
			"scopeName": "source.asp",
			"path": "./syntaxes/asp.tmLanguage"
		}]
	}
}
```

**Q: Can I add more file extensions to an existing colorizer?**

**A:** Yes. To extend an existing colorizer, you would create a simple `package.json` in a new folder under `.vscode/extensions` and provide the `extensionDependencies` attribute specifying the customization you want to add to.  In the example below, an extension `.mmd` is added to the `markdown` colorizer. Note that not only must the `extensionDependency` name match the customization but also the `language` `id` must match the language id of the colorizer you are extending.

```json
{
	"name": "MyMarkdown",
	"version": "0.0.1",
	"engines": {
		"vscode": ">=0.9.0"
	},
	"publisher": "none",
	"extensionDependencies": [
                     "markdown"
                ],
	"contributes": {
		"languages": [{
			"id": "markdown",
			"aliases": ["mmd"],
			"extensions": [".mmd"]
		}]
	}
}
```

**Q: What if I want to completely overide an existing colorizer?**

**A:** Yes and no.  If the colorizer is implemented as a customization then yes but some of VS Code's built-in colorizers (e.g. markdown) are integrated differently and cannot be overridden.  You override the colorizer by using the `extensionDependencies` attribute as above and providing a new `grammars` element.
