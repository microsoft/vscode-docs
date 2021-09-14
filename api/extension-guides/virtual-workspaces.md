---
# DO NOT TOUCH — Managed by doc writer
ContentId:
DateApproved:

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to support virtual workspaces in extensions
---

# Virtual Workspaces

Extensions like the [Github Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension open VS Code on one or more folders backed by a [file system provider](/api/extension-guides/virtual-documents#file-system-api). In that setup, workspace resources are not on the local disk, but **virtual**, located on a server or the cloud and directly edited there.

We call this a __virtual workspace__.  When a virtual workspace is open in a VS Code window, this is shown by a label in the remote indicator in the lower left corner, similar to remote windows.

![Remote indicator](images/virtual-workspaces/remote-indicator.png)

Not all extensions are able to work with virtual resources the same way as with resources on disk. Some extensions use tools that rely on disk access, need synchronous file access or don't have the necessary file system abstractions. For that, when in a virtual workspace, VS Code will indicate to the user the restricted mode and that some extensions are deactivated or work with limited functionality.

Still, we want to make sure as many extensions as possible work in that setup and that we have a good user experience with when VS Code is used to browse and edit remote resources.

This guide shows how extensions can test against virtual workspaces, helps adopting and introduces the `virtualWorkspaces` capability property.

Adopting an extension to work with virtual workspaces is also an important step to have it work in VS Code for the Web. There, VS Code runs entirely inside a browser and workspaces are virtual due to the browser sandbox. See the [Web Extension](/api/extension-guides/web-extensions) adoption guide for more details.

## Is my extension affected?

When a extension has no code but is a pure theme, keybinding, snippets, grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extension with code, that means extensions that define a `main` entry point, require inspection and, possibly, adoption.

## Run your extension against a virtual workspace

Install the [Github Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension and run the **Open Github Repository...** command from the Command Palette. The command shows a quick pick dialog and you can paste in any GitHub URL, or choose to search for a specific repository or pull request.

This opens a VSCode window for a virtual workspace where all resources are virtual.

## Review that the code is ready for virtual resources

The API support for virtual file system has already been around for quite a while. You can check out the [file system provider API](/api/extension-guides/virtual-documents#file-system-api).

A file system provider is registered for a new URI scheme (e.g. `vscode-vfs`) and resources on that file system will be represented by URIs using that schema (e.g. `vscode-vfs://github/microsoft/vscode/pacakge.json`)

Check how your extension deals with URIs it gets from the VSCode APIs:

- Never assume that the URI scheme is 'file'. `URI.fsPath` can only be used when the URI scheme is file.
- Look out for usages of the `fs` node module for file system operations. If possible, use the `vscode.workspace.fs` API, which delegates to the responsible file system provider.
- Check for third party components that depend on a `fs` access (e.g. a language server or a node module)
- If you run executables and tasks from commands, check whether these commands make sense in a virtual workspace window or whether they should be disabled.

## Signal whether your extension can handle virtual workspaces

There's a new `capabilities` property in `package.json`, and `virtualWorkspaces` is used  to signal whether an extension works with virtual workspace, or not.

### No support for virtual workspaces

The example below declares that an extension does not support virtual workspaces and should not be enabled by VS Code in this setup.

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": false,
      "description": "Debugging is not possible in virtual workspaces."
    }
  }
}
```

### Partial and full support for virtual workspaces

When an extension works or partially works with virtual workspaces, then it should define `"virtualWorkspaces": true`.
```json
{
  "capabilities": {
    "virtualWorkspaces": true
  }
}
```


If it works, but has limited functionality, you can describe this the following way:

```json
{
  "capabilities": {
    "virtualWorkspaces": {
      "supported": "limited",
      "description": "In virtual workspaces, resolving and finding references across files is not supported."
    }
  }
}
```

The description is will be shown in the extensions view:
![Extensions View](images/virtual-workspaces/extensions-view.png)

The extension should then disable the features that are not supported in a virtual workspace as described below.

### Default

`"virtualWorkspaces": true` is the default for all extensions that have no yet filled in the `virtualWorkspaces` capability.

However, when testing, we came up list of extensions that we think should be disabled in virtual workspaces.
The list can be found [here](https://github.com/microsoft/vscode/issues/122836). These extensions have `"virtualWorkspaces": false` as default.

Of course, extension authors are in a better position to make this decision. The  `virtualWorkspaces` capability in the `package.json` will override our default and we will eventually retire our list.


## Disable functionality when a virtual workspace is opened

### Disable commands and view contributions

The availability of commands and views and many other contributions can be controlled through context keys in [`when` clauses](/api/references/when-clause-contexts).

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems. The example below shows the command `npm.publish` in the command palette only when not in a virtual workspace:
```json
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "!virtualWorkspace"
        }
      ]
    }
}
```

The `resourceScheme` context key is set to the URI scheme of the currently selected element in the explorer or the element open in the editor.
In this example the `npm.runSelectedScript` command is only in the editor context menu if the underlying resource is on the local disk.
```json
{
    "menus": {
      "editor/context": [
        {
          "command": "npm.runSelectedScript",
          "when": "resourceFilename == 'package.json' && resourceScheme == file"
        }
      ]
    }
}
```

### Detect virtual workspaces in code

To check in code whether the current workspace consists of non-`file` schemes and is virtual you can use

```ts
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```



## Language Extensions and Virtual Workspaces

### What are the expectations for language support with virtual workspaces?

It's not realistic that all extensions are able to fully work with virtual resources. Many extensions built are on tools that require synchronous file access and files on disk. It's therefore ok to only provide limited functionality, such as the 'Basic' and the 'Single-File' support as listed below.

A. Basic Language Support:
* TextMate tokenization and colorization,
* language specific editing support: bracket pairs, comments, on enter rules, folding markers
* snippets

B. Single-File Language Support:
* document symbols (outline), folding, selection ranges
* document highlights, semantic highlighting, document colors
* completions, hovers, signature help, find references/declarations based on symbols on the current file and on static language libraries
* formatting, linked editing
* syntax validation and same-file semantic validation and code actions

C. Cross-file, Workspace Aware Language Support
* references across files
* workspace symbols
* validation of all files in the workspace/project

The rich language extensions that ship with VS Code (TypeScript, JSON, CSS, HTML, Markdown) are limited to Single-File Language Support when working on virtual resources.

### Disabling a language extension

If working on a single file is not option, language extensions can also decide to disable the extension when in a virtual workspaces.

If your extension provides both grammars and rich language support and have to disable the extension also the grammars will be disabled. To avoid this, we recommend to split off a basic language extension (grammars, language configuration, snippets) form the rich language support and have two extensions.
- The basic language extension has `"virtualWorkspaces": true` and provides language id, configuration, grammar and snippets.
- The rich language extension  has `"virtualWorkspaces": false` contains the main file contributing language supports and commands and has a extension dependency (`extensionDependencies`) on the basic language extension. The rich language extension should keep the ID of the established extension, so the user will continue to the full functionality by installing a single extension.

You can see this with the built-in language extensions, such as JSON, which consists of a JSON extension and a JSON language feature extension.

This separation has also helps with [untrusted workspaces](api/extension-guides/workspace-trust). Rich language extension often require trust while basic language features can run in any setup.


### Language selectors

When registering a provider for a language feature (e.g. completions, hovers, code actions..) make sure to specify the schemes the provider supports:

```ts
return vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, {
	provideCompletionItems(document, position, token) {
		// ...
	}
});
```


### What about support in the language server protocol (LSP) for accessing virtual resources

Work is under way that will add FS support to LSP. Tracked in https://github.com/microsoft/language-server-protocol/issues/1264.

