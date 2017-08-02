---
Order: 10
Area: extensionapi
TOCTitle: Markdown Extension API
ContentId: 1664249a-ba7a-4a53-b3f0-9d757cff7d27
PageTitle: Visual Studio Code Markdown Extensions
DateApproved: 7/10/2017
MetaDescription: How extensions can extend VS Code's built-in markdown preview.
---

# Markdown Extensions

Markdown extensions allow you to extend and enhance VS Code's built-in markdown preview. This includes changing the look of the preview or adding support for new markdown syntax.

## Changing the look of the markdown preview with css
Extensions can contribute css to change the look or layout of the markdown preview. Stylesheets are registered using the `markdown.previewStyles` contribution in your extension's `package.json`:

```json
"contributes": {
    "markdown.previewStyles": [
        "./style.css"
    ]
}
```

`"markdown.previewStyles"` is a list of files relative to the extension's root folder.

Contributed styles are added after the built-in markdown preview styles but before a user's `"markdown.styles"`.

**Next Steps**
- The [*VS Code Github Style* extension](https://github.com/mjbvz/vscode-github-markdown-preview-style) demonstrates using a to make the markdown preview look like Github's rendered markdown.

## Adding support for new syntax with markdown-it plugins

The VS Code markdown preview supports [CommonMark markdown](http://spec.commonmark.org). Extensions can  add support for additional markdown syntax by contributing a [markdown-it plugin.](https://github.com/markdown-it/markdown-it#syntax-extensions)

To contribute a *markdown-it* plugin, first add a `"markdown.markdownItPlugins"` contribution in your extension's `package.json`:

```json
"contributes": {
    "markdown.markdownItPlugins": true
}
```

Then, in the extension's main `activation` function, return an object with function named `extendMarkdownIt`. This function takes the current *markdown-it* instance and must return a new markdown-it instance:

```ts
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: any) {
            return md.use(require('markdown-it-emoji'));
        }
    }
}
```

To contribute multiple *markdown-it plugins*, simply return multiple `use` statements chained together:

```ts
return md.use(require('markdown-it-emoji')).use(require('markdown-it-hashtag'));
```

Extensions that contribute *markdown-it plugins* are activated lazily, when a markdown preview is shown for the first time.

**Next Steps**
- The [*VS Code Markdown Emoji* extension](https://github.com/mjbvz/vscode-markdown-emoji) demonstrates using a *markdown-it* plugin to add emoji support to the markdown preview.
- [Guidelines](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md) for *markdown-it* plugin developers.
- [Check out existing *markdown-it* plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin).

## Adding advanced functionality with scripts

Finally, for advanced functionality, extensions may contribute scripts that are executed inside of the markdown preview.


```json
"contributes": {
    "markdown.previewScripts": [
        "./main.js"
    ] 
}
```

Contributed scripts are loaded asynchronously and reloaded on every content change.

**Next Steps**
- The [*VS Code Markdown Mermaid* extension](https://github.com/mjbvz/vscode-markdown-mermaid) demonstrates using scripts to add [mermaid](http://knsv.github.io/mermaid/index.html) diagrams and flowchart support to the markdown preview.


