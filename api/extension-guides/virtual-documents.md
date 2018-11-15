---
# Order: 8
Area: extension-guides
TOCTitle: Virtual Documents
PageTitle: Virtual Documents
---

# Virtual Documents

The text document content provider API allows you to create readonly documents from arbitrary sources. You can find a sample extension with source code at: https://github.com/Microsoft/vscode-extension-samples/blob/master/virtual-document-sample/README.md

## TextDocumentContentProvider

The API works by claiming an uri-scheme for which your provider then returns text contents. The scheme must be provided when registering a provider and cannot change afterwards. The same provider can be used for multiple schemes and multple providers can be registered for a single scheme.

```ts
vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider);
```
Calling `registerTextDocumentContentProvider` returns a disposable with which the registration can be undone. A provider must only implement the `provideTextDocumentContent`-function which is called with an uri and cancellation token.

```ts
const myProvider = new class implements vscode.TextDocumentContentProvider {
  provideTextDocumentContent(uri: vscode.Uri): string {
    // simply invoke cowsay, use uri-path as text
    return cowsay.say({ text: uri.path });
  }
}
```

Note how the provider doesn't create uris for virtual documents - its role is to *provide* contents given such an uri. In return, content providers are wired into the open document logic so that providers are always considered.

This sample uses a 'cowsay'-command that crafts an uri which the editor should then show:

```ts
vscode.commands.registerCommand('cowsay.say', async () => {
  let what = await vscode.window.showInputBox({ placeHolder: 'cow say?' });
  if (what) {
    let uri = vscode.Uri.parse('cowsay:' + what);
    let doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, { preview: false });
  }
})
```

The command prompts for input, creates an uri of the `cowsay`-scheme, opens a document for the uri, and finally opens an editor for that document. In step 3, opening the document, the provider is being asked to provide contents for that uri.
