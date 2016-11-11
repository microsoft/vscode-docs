---
Order: 20
TOCTitle: Creating a Formatter Extension
PageTitle: Creating a Formatter Extension
MetaDescription: Best practices for creating a formatter extension.
Date: 2016-11-15
ShortDescription: Best practices for creating a formatter extension.
Author: Johannes Rieken
---

# Creating a Formatter Extension

November 15, 2016 by Johannes Rieken, [@johannesrieken](https://twitter.com/johannesrieken)

Since its introduction, the extension API has provided support for code formatters. The first language extensions we built, for example TypeScript, C# and Go, used the formatting API. We wrote this blog to explain the best practices for implementing formatters.

VS Code's extension API follows a set of guiding principles. The essence of these principles is that VS Code provides the skeleton and extensions provide the "smarts". The common pattern is for VS Code to provide the UI around a feature and the extensions provide the necessary data to make it shine.

The core benefit of using the extension API for implementing a formatter comes from the exposure of the Format Document and Format Selection actions. These actions are available in the context menu, bound to default keybindings, and visible in the command palate. Using the API leads to a consistent user experience from formatter extension to formatter extension.

## The Formatting API

The code snippet below shows what to do and what not to do when implementing a formatter. The best practice is to use the API. We recommend not creating a new action, such as "Format Foo File." The full extension example can be found on [GitHub](https://github.com/jrieken/vscode-formatter-sample).

```typescript
// 👎 formatter implemented as separate command
vscode.commands.registerCommand('extension.format-foo', () => {
    const {activeTextEditor} = vscode.window;

    if (activeTextEditor && activeTextEditor.document.languageId === 'foo-lang') {
        const {document} = activeTextEditor;
        const firstLine = document.lineAt(0);

        if (firstLine.text !== '42') {
            const edit = new vscode.WorkspaceEdit();
            edit.insert(document.uri, firstLine.range.start, '42\n');

            return vscode.workspace.applyEdit(edit)
        }
    }
});


// 👍 formatter implemented using API
vscode.languages.registerDocumentFormattingEditProvider('foo-lang', {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

        const firstLine = document.lineAt(0);
        if (firstLine.text !== '42') {
            return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
        }
    }
});
```

Recently, we added the "Format on Save" feature. An extension properly implementing the formatting API would take advantage of this new feature without any new code.

> Tip: To take advantage of this a formatting extension needs to be registered using this [API call](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L4087).

## Multiple Formatters

A common misunderstanding is that when contributing a formatter, you must support all kind of languages. That is not true. When an extension [registers as a formatter](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L4087) it indicates the languages it supports. With that information, the editor can enable the formatting actions when showing for example, html-documents. Likewise, the editor will disable the formatting actions when showing documents for which no formatter is known.

But what happens when there are multiple formatters for one language? This can be a problem when formatters contradict. In October we added a setting to enable or disable the default formatters that ship with VS Code. The best practice is for extension authors to add a similar setting as what we did in VS Code as shown below.

```json
"html.format.enable": true,
"javascript.format.enable": true,
"typescript.format.enable": true,
"json.format.enable": true
```

## Formatters in the Marketplace

Last, we want to bring more awareness to formatters and have added a new [‘Formatter’ category](https://marketplace.visualstudio.com/search?target=VSCode&category=Formatters&sortBy=Downloads) to the Marketplace. We have seeded it with popular formatting extensions and invite formatter authors to add theirs as well. Or, use [extension packs](http://code.visualstudio.com/updates#_preview-extension-packs) to bundle a formatter extension with other extensions for your favorite language.

## Summary

To summarize, an extension that implements the formatting extension API properly will do the following :

1. Register formatters via [API calls](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L4087).  
2. Implement the formatting logic per the [formatter interface](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L2071).
3. Have a setting to enable / disable the formatter.
4. Add “Formatters” category to the extension manifest

We are not done with the feature work for formatters. “Format on Paste”, “Format Files in Folder” and more are on our roadmap and we are happily awaiting more of your feedback and ideas.

[#HappyCoding](https://twitter.com/hashtag/HappyCoding?src=hash)

Johannes Rieken, VS Code Team Member <br>
[@johannesrieken](https://twitter.com/johannesrieken)