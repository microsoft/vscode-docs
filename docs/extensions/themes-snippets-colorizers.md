---
Order: 6
Area: extensions
TOCTitle: Themes, Snippets and Colorizers
ContentId: 448E9027-3AD0-420D-9A58-D428D1B1067D
PageTitle: Add Themes, Snippets and Colorizers to Visual Studio Code
DateApproved: 3/1/2017
MetaDescription: How to add themes, snippets and colorization and bracket matching to Visual Studio Code.  TextMate .tmLanguage files are supported.
---
# Themes, Snippets and Colizers

TBD

## Using TextMate Snippets

You can also add TextMate snippets (.tmSnippets) to your VS Code installation using the [yo code](/docs/tools/yocode.md) extension generator. The generator has an option `New Code Snippets` which lets you point to a folder containing multiple .tmSnippets files and they will be packaged into a VS Code snippet extension.  The generator also supports Sublime snippets (.sublime-snippets). 

The final generator output has two files: an extension manifest `package.json` which has metadata to integrate the snippets into VS Code and a `snippets.json` file which includes the snippets converted to the VS Code snippet format.

```bash
.
├── snippets                    // VS Code integration
│   └── snippets.json           // The JSON file w/ the snippets
└── package.json                // extension's manifest
```

Copy the generated snippets folder to a new folder under [your `.vscode/extensions` folder](/docs/extensions/install-extension.md#your-extensions-folder) and restart VS Code.

## Sharing Your Snippets in the Marketplace

Once you have created your snippets and tested them out, you can share them with the community.

To do this, you need to create a snippet extension.  If you've used the `yo code` extension generator, your snippet extension is ready to be published.

If you want to share user snippets, you'll need to package your snippet json file along with an extension manifest which has the necessary metadata to integrate the snippets into VS Code.

Depending on your platform, your user snippets file is located here:

* **Windows** `%APPDATA%\Code\User\snippets\(language).json`
* **Mac** `$HOME/Library/Application Support/Code/User/snippets/(language).json`
* **Linux** `$HOME/.config/Code/User/snippets/(language).json`

where `(language).json` depends on the targeted language of the snippets (e.g. `markdown.json` for Markdown snippets).  Create a new folder for your extension and copy your snippet file to a `snippets` subdirectory.

Now add an extension manifest package.json file to the extension folder.  The snippet extension manifest follows the structure defined in the [Extension Manifest](/docs/extensionAPI/extension-manifest.md) reference and provides a [`snippets` contribution](/docs/extensionAPI/extension-points.md#contributessnippets).

Below is an example manifest for Markdown snippets:

```json
{
    "name": "DM-Markdown",
    "publisher": "mscott",
    "description": "Dunder Mifflin Markdown snippets",
    "version": "0.1.0",
    "engines": { "vscode": "0.10.x" },
    "categories": ["Snippets"], 
    "contributes": {
        "snippets": [
            {
                "language": "markdown",
                "path": "./snippets/markdown.json"
            }
        ]
    }
}
```

Note that snippets need to be associated with a `language` identifier.  This can be a [language supported](/docs/languages/overview.md) directly by VS Code or a language provided by an extension.  Make sure the `language` identifier is correct.

You then use the [vsce publishing tool](/docs/tools/vscecli.md) to publish the snippet extension to the [VS Code Extension Marketplace](/docs/editor/extension-gallery.md).

> **Tip:** To make it easy for users to find your snippet, include the word "snippet" in the extension description and set the `Category` to `Snippets` in your `package.json`.

We also have recommendations on how to make your extension look great on the VS Code Marketplace, see [Marketplace Presentation Tips](/docs/extensionAPI/extension-manifest.md#marketplace-presentation-tips).

## Adding a New Language (Colorizer)

Using the ['code' Yeoman generator](/docs/tools/yocode.md), you can create an extension that adds syntax highlighting and bracket matching for a language to your VS Code installation.

Central to language support is a TextMate [language specification](https://manual.macromates.com/en/language_grammars) file (.tmLanguage) that describes the colorizer rules. The yeoman generator either takes an existing TextMate language specification file or lets you start with a fresh one.

A good place to look for existing TextMate .tmLanguage files is on GitHub. Search for a TextMate bundle for the language you are interested in and then navigate to the `Syntaxes` folder.  The 'code' Yeoman generator can import either .tmLanguage or .pList files.  When prompted for the URL or file location, pass the raw path to the .tmLanguage file e.g. http://raw.githubusercontent.com/textmate/ant.tmbundle/master/Syntaxes/Ant.tmLanguage. Make sure that the path points to the content of the file, not the HTML file showing the content.

![yo code language support](images/colorizer/yocodelanguage.png)

The generator will prompt you for other information such a unique name (this should be unique to avoid clashing with other extensions) and the language name, aliases and file extensions. You also have to provide the top level scope name of the grammar. That scope name must match the scope name in the tmLanguage file.

When the generator is finished, open the created folder in Visual Studio Code. Have a look at the generated `<languageid>.configuration.json` file: It contains more language settings such as the tokens used for comments and brackets.  Make sure the configurations are accurate. 

Here is an example for a language with XML-like brackets:

```json
{
	"comments": {
		"lineComment": "",
		"blockComment": ["<!--", "-->"]
	},
	"brackets": [
		["<", ">"]
	],
	"autoClosingPairs": [
		["<", ">"],
		["'", "'"],
		["\"", "\""]
	],
	"surroundingPairs": [
		["<", ">"],
		["'", "'"],
		["\"", "\""]
	]

}
```

For more details check out the [languages contribution point documentation](/docs/extensionAPI/extension-points.md#contributeslanguages).

The generated `vsc-extension-quickstart.md` file also contains more information on how to run and debug your extension.

To use your extension in your stable VS Code installation, copy the complete output folder to a new folder under [your `.vscode/extensions` folder](/docs/extensions/install-extension.md#your-extensions-folder) and restart VS Code.  When you restart VS Code, your new language will be visible in the language specifier dropdown and you'll get full colorization and bracket/tag matching for files matching the language's file extension.

![select ant language](images/colorizer/antlanguage.png)

## Publishing Language Support to the Extension Marketplace

If you'd like to share your new language with the community, you can publish it to the [Extension Marketplace](/docs/editor/extension-gallery.md). Use the [vsce publishing tool](/docs/tools/vscecli.md) to package your extension and publish it to the VS Code Marketplace.

> **Tip:** To make it easy for users to find your language support, include the language name and words "language" or "language support" in the extension description and set the `Category` to `Languages` in your `package.json`.

We also have recommendations on how to make your extension look great on the VS Code Marketplace, see [Marketplace Presentation Tips](/docs/extensionAPI/extension-manifest.md#marketplace-presentation-tips).

## Add to your Language Support Extension

When you're adding a new language to VS Code, it is also great to add language [snippets](/docs/customization/userdefinedsnippets.md) to support common editing actions. It is easy to [combine multiple extensions](/docs/extensionAPI/extension-manifest.md#combining-extension-contributions) like snippets and colorizers into the same extension. You can modify the colorizer extension manifest `package.json` to include a `snippets` contribution and the snippets.json.

```json
{
    "name": "language-latex",
    "description": "LaTeX Language Support",
    "version": "0.0.1",
    "publisher": "someone",
    "engines": {
        "vscode": "0.10.x"
    },
    "categories": [
        "Languages",
        "Snippets"
    ],
    "contributes": {
        "languages": [{
            "id": "latex",
            "aliases": ["LaTeX", "latex"],
            "extensions": [".tex"]
        }],
        "grammars": [{
            "language": "latex",
            "scopeName": "text.tex.latex",
            "path": "./syntaxes/latex.tmLanguage"
        }],
        "snippets": [
            {
                "language": "latex",
                "path": "./snippets/snippets.json"
            }
        ]
    }
}
```

## Next Steps

Colorizers are just one way to customize VS Code, If you'd like to learn more about VS Code extensibility, try these topics:

* [Snippets](/docs/customization/userdefinedsnippets) - Learn how to also include snippets in your language extension.
* [Custom themes](/docs/customization/themes.md) - Learn how to import existing TextMate themes.
* [Extending Visual Studio Code](/docs/extensions/overview.md) - Learn about other ways to extend VS Code

## Common Questions

**Q: I created a snippets extension but they aren't showing up in the VS Code editor?**

**A:** Be sure you have correctly specified the `language` identifier for your snippet (e.g. `markdown` for Markdown .md files, `plaintext` for Plain Text .txt files).  Also verify that the relative path to the snippets json file is correct.

**Q: Can I add more file extensions to my colorizer?**

**A:** Yes, the `yo code` generator provides the default file extensions from the .tmLanguage file but you can easily add more file extensions to a `languages` contribution `extensions` array.  In the example below, the `.asp` file extension has been added to the default `.asa` file extension. 

```json
{
    "name": "asp",
    "version": "0.0.1",
    "engines": {
        "vscode": "0.10.x"
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

**A:** Yes. To extend an existing colorizer, you can associate a file extension to an existing language identifier with the `files.associations` [setting](/docs/customization/userandworkspace.md).  IntelliSense will show you the list of currently available language ids.

For example, the setting below adds the `.mmd` file extension to the `markdown` colorizer:

```json
    "files.associations": {
        "*.mmd": "markdown"
    }
```

**Q: What if I want to completely override an existing colorizer?**

**A:** Yes. You override the colorizer by providing a new `grammars` element for an existing language id. Also, add a `extensionDependencies` attribute that contains the name of the extension that defines the grammar that you want to replace. 

```json
{
    "name": "override-xml",
    "version": "0.0.1",
    "engines": {
        "vscode": "0.10.x"
    },
    "publisher": "none",
    "extensionDependencies": [
        "xml"
    ],
    "contributes": {
        "grammars": [{
            "language": "xml",
            "scopeName": "text.xml",
            "path": "./syntaxes/BetterXML.tmLanguage"
        }]
    }
}
```
