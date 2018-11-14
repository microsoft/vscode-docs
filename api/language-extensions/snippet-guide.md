---
Order: 3
Area: language-extensions
TOCTitle: Snippet Guide
PageTitle: Snippet Guide
---

# Snippet Guide

The [`contributes.snippets`](/api/references/contribution-points#contributes.snippets) Contribution Point allows you to bundle snippets into an extension for sharing. This is useful for sharing snippets for specific frameworks, for example:

- https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
- https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets
- https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented

TODO: Pine - Turn these into extension tiles.

The [Creating snippets](https://vscode-ext-docs.azurewebsites.net/docs/editor/userdefinedsnippets) guide contains all information for creating snippets. This guide / sample just shows how you can turn your own snippets into an extension for sharing. The suggested workflow is:

- Create and test your snippets using `Preferences: Configure User Snippets` command
- Once you are happy with the snippets, copy the whole JSON file into an extension folder, such as `snippets.json`
- Add the following snippet contribution to your `package.json`

```json
{
	"contributes": {
		"snippets": [
			{
				"language": "javascript",
				"path": "./snippets.json"
			}
		]
	}
}
```

**Tip**: You can tag your extension as a snippet extension with the following config in your `package.json`:

```json
{
	"categories": [
		"Snippets"
	]
}
```
