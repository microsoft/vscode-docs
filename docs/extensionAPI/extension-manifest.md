---
Order: 4
Area: extensionapi
TOCTitle: Extension Manifest
ContentId: C4F184A5-A804-4B0B-9EBA-AFE83B88EE49
PageTitle: Visual Studio Code Extension Manifest File - package.json
DateApproved: 2/7/2018
MetaDescription: At the core of Visual Studio Code's extensibility model is an extension (plug-in) manifest file where your extension declares its extension type(s), activation rules and runtime resources.
---
# Extension Manifest File - package.json

Every Visual Studio Code extension needs a manifest file `package.json` at the root of the extension directory structure.

## Fields

Name | Required | Type | Details
---- |:--------:| ---- | -------
`name` | Y | `string` | The name of the extension - should be all lowercase with no spaces.
`version` | Y | `string` | [SemVer](http://semver.org/) compatible version.
`publisher` | Y | `string` | The [publisher name](/docs/extensions/publish-extension.md#publishers-and-personal-access-tokens)
`engines` | Y | `object` | An object containing at least the `vscode` key matching the versions of VS Code that the extension is [compatible](/docs/extensions/publish-extension.md#visual-studio-code-compatibility) with.  Cannot be `*`. For example: `^0.10.5` indicates compatibility with a minimum VS Code version of `0.10.5`.
`license` | | `string` | Refer to [npm's documentation](https://docs.npmjs.com/files/package.json#license). If you do have a `LICENSE` file in the root of your extension, the value for `license` should be `"SEE LICENSE IN <filename>"`.
`displayName` | | `string`| The display name for the extension used in the Marketplace.
`description` | | `string` | A short description of what your extension is and does.
`categories` | | `string[]` | the categories you want to use for the extensions allowed values: `[Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, Other, Extension Packs]`
`keywords` | | `array` | An array of **keywords** or **tags** to make it easier to find the extension.
`galleryBanner` | | `object` | Helps format the Marketplace header to match your icon.  See details below.
`preview` | | `boolean` | Sets the extension to be flagged as a Preview in the Marketplace.
`main` | | `string` | The entry point to your extension.
[`contributes`](/docs/extensionAPI/extension-points.md) | | `object` | An object describing the extension's [contributions](/docs/extensionAPI/extension-points.md).
[`activationEvents`](/docs/extensionAPI/activation-events.md) | | `array` | An array of the [activation events](/docs/extensionAPI/activation-events.md) for this extension.
`badges` | | `array` | Array of [approved](/docs/extensionAPI/extension-manifest.md#approved-badges) badges to display in the sidebar of the Marketplace's extension page. Each badge is an object containing 3 properties: `url` for the badge's image URL, `href` for the link users will follow when clicking the badge and `description`.
`markdown` | | `string` | Controls the Markdown rendering engine used in the Marketplace. Either `github` (default) or `standard`.
`qna` | | `marketplace` (default), `string`, `false` | Controls the **Q & A** link in the Marketplace. Set to `marketplace` to enable the default Marketplace Q & A site. Set to a string to provide the URL of a custom Q & A site. Set to `false` to disable Q & A altogether.
`dependencies` | | `object` | Any runtime Node.js dependencies your extensions needs. Exactly the same as [npm's `dependencies`](https://docs.npmjs.com/files/package.json#dependencies).
`devDependencies` | | `object` | Any development Node.js dependencies your extension needs. Exactly the same as [npm's `devDependencies`](https://docs.npmjs.com/files/package.json#devdependencies).
`extensionDependencies` | | `array` | An array with the ids of extensions that this extension depends on. These other extensions will be installed when the primary extension is installed. The id of an extension is always `${publisher}.${name}`. For example: `vscode.csharp`.
`scripts` | | `object` | Exactly the same as [npm's `scripts`](https://docs.npmjs.com/misc/scripts) but with [extra VS Code specific fields](/docs/extensions/publish-extension.md#pre-publish-step).
`icon` | | `string` | The path to a 128x128 pixel icon.

Also check [npm's `package.json` reference](https://docs.npmjs.com/files/package.json).

## Example

Here is a complete `package.json`

```json
{
    "name": "wordcount",
    "displayName": "Word Count",
    "version": "0.1.0",
    "publisher": "ms-vscode",
    "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
    "author": {
        "name": "seanmcbreen"
    },
    "categories": [
        "Other"
    ],
    "icon": "images/icon.png",
    "galleryBanner": {
        "color": "#C80000",
        "theme": "dark"
    },
    "activationEvents": [
        "onLanguage:markdown"
    ],
    "engines": {
        "vscode": "^1.0.0"
    },
    "main": "./out/extension",
    "scripts": {
        "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
        "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
    },
    "devDependencies": {
        "vscode": "0.10.x",
        "typescript": "^1.6.2"
    },
    "license": "SEE LICENSE IN LICENSE.txt",
    "bugs": {
        "url": "https://github.com/Microsoft/vscode-wordcount/issues",
        "email": "smcbreen@microsoft.com"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/vscode-wordcount.git"
    },
    "homepage": "https://github.com/Microsoft/vscode-wordcount/blob/master/README.md"
}
```

## Marketplace Presentation Tips

Here are some tips and recommendations to make your extension look great when displayed on the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode).

Always use the latest `vsce` so `npm install -g vsce` to make sure you have it.

Have a `README.md` Markdown file in your extension's root folder and we will include the contents in the body of the extension details (on the Marketplace).  You can provide relative path image links in the `README.md`.

Here are a few examples:

1. [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)
2. [MD Tools](https://marketplace.visualstudio.com/items/seanmcbreen.MDTools)

Provide a good display name and description. This is important for the Marketplace and in product displays.  These strings are also used for text search in VS Code and having relevant keywords will help a lot.

```json
    "displayName": "Word Count",
    "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
```

An Icon and a contrasting banner color looks great on the Marketplace page header.  The `theme` attribute refers to the font to be used in the banner - `dark` or `light`.

```json
{
    "icon": "images/icon.png",
    "galleryBanner": {
        "color": "#C80000",
        "theme": "dark"
    },
}
```

There are several optional links (`bugs`, `homepage`, `repository`) you can set and these are displayed under the **Resources** section of the Marketplace.

```json
{
    "license": "SEE LICENSE IN LICENSE.txt",
    "homepage": "https://github.com/Microsoft/vscode-wordcount/blob/master/README.md",
    "bugs": {
        "url": "https://github.com/Microsoft/vscode-wordcount/issues",
        "email": "smcbreen@microsoft.com"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/vscode-wordcount.git"
    },
}
```

Marketplace Resources link | package.json attribute
-----------------|-----------------------
Issues | `bugs:url`
Repository | `repository:url`
Homepage | `homepage`
License | `license`

Set a `category` for your extension.  Extensions in the same `category` are grouped together on the Marketplace which improves filtering and discovery.

>**Note:** Only use the values that make sense for your extension - allowed values are `[Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, Other, Extension Packs]`

```json
{
    "categories": [
        "Linters", "Languages", "Other"
    ],
}
```

>**Tip:** The [Extension Manifest Editor](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.extension-manifest-editor) extension lets you preview how your extension `README.md` and `package.json` metadata will look when published to the Marketplace.

### Approved Badges

Due to security concerns, we only allow badges from trusted services.

We allow badges from the following URL prefixes:

* api.travis-ci.org
* badge.fury.io
* badges.frapsoft.com
* badges.gitter.im
* badges.greenkeeper.io
* cdn.travis-ci.org
* ci.appveyor.com
* codacy.com
* codeclimate.com
* codecov.io
* coveralls.io
* david-dm.org
* deepscan.io
* gemnasium.com
* githost.io
* gitlab.com
* img.shields.io
* isitmaintained.com
* marketplace.visualstudio.com
* opencollective.com
* snyk.io
* travis-ci.com
* travis-ci.org
* vsmarketplacebadge.apphb.com
* www.bithound.io
* www.versioneye.com
* nodesecurity.io

If you have other badges you would like to use, please open a Github [issue](https://github.com/Microsoft/vscode/issues) and we're happy to take a look.

## Combining Extension Contributions

The `yo code` generator lets you easily package TextMate themes, colorizers and snippets and create new extensions.  When the generator is run, it creates a complete standalone extension package for each option.  However it is often more convenient to have a single extension which combines multiple contributions.  For example, if you are adding support for a new language, you'd like to provide users with both the language definition with colorization and also snippets and perhaps even debugging support.

To combine extension contributions, edit an existing extension manifest `package.json` and add the new contributions and associated files.

Below is an extension manifest which includes a LaTex language definition (language identifier and file extensions), colorization (`grammar`), and snippets.

```json
{
    "name": "language-latex",
    "description": "LaTex Language Support",
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
        "snippets": [{
            "language": "latex",
            "path": "./snippets/snippets.json"
        }]
    }
}
```

Notice that the extension manifest `categories` attribute now includes both `Languages` and `Snippets` for easy discovery and filtering on the Marketplace.

>**Tip:** Make sure your merged contributions are using the same identifiers.  In the example above, all three contributions are using "latex" as the language identifier.  This lets VS Code know that the colorizer (`grammar`) and snippets are for the LaTeX language and will be active when editing LaTeX files.

## Extension Packs

You can also bundle separate extensions together in 'Extension Packs'. An Extension Pack is a set of extensions that can be installed together. This enables easily sharing your favorite extensions with other users or creating a set of extensions for a particular scenario like PHP development to help a PHP developer get started with VS Code quickly.

An Extension Pack can include other contributions or be a bundling extension that lists other extensions. This dependency is expressed using the `extensionDependencies` attribute inside the `package.json` file.

For example, here is an Extension Pack for PHP that includes a debugger, language service, and formatter:

```json
{
  "extensionDependencies": [
      "felixfbecker.php-debug",
      "felixfbecker.php-intellisense",
      "Kasik96.format-php"
  ]
}
```

When installing an Extension Pack, VS Code will now also install its extension dependencies.

Extension packs should be categorized in the `Extension Packs` Marketplace category:

```json
{
  "categories": [
      "Extension Packs"
  ],
}
```

To create an extension pack, you can use the `yo code` Yeoman generator. Optionally, it can also seed the pack with the set of extensions you have currently installed in your VS Code instance. In this way, you can easily create an Extension Pack with your favorite extensions, publish it to the Marketplace, and share it with others.

## Useful Node modules

There are several Node.js modules available on npmjs to help with writing VSCode extensions. You can include these in your extension's `dependencies` section.

* [vscode-nls](https://www.npmjs.com/package/vscode-nls) - Support for externalization and localization.
* [vscode-uri](https://www.npmjs.com/package/vscode-uri) - The URI implementation used by VS Code and its extensions.
* [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) - A scanner and fault tolerant parser to process JSON with or without comments.
* [request-light](https://www.npmjs.com/package/request-light) - A light weight Node.js request library with proxy support
* [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) - Consistent telemetry reporting for VS Code extensions.
* [vscode-languageclient](https://www.npmjs.com/package/vscode-languageclient) - Easily integrate language servers adhering to the [language server protocol](https://github.com/Microsoft/language-server-protocol).

## Next Steps

To learn more about VS Code extensibility model, try these topic:

* [Contribution Points](/docs/extensionAPI/extension-points.md) - VS Code contribution points reference
* [Activation Events](/docs/extensionAPI/activation-events.md) - VS Code activation events reference
* [Extension Marketplace](/docs/editor/extension-gallery.md) - Read more about the VS Code Extension Marketplace
