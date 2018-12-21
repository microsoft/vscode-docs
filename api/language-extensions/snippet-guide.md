---
# DO NOT TOUCH — Managed by doc writer
ContentId: 4b24790b-781a-43cc-afe6-58b1d57d6163
DateApproved: 12/6/2018

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to bundle snippets into an extension (plug-in) for Visual Studio Code
---

# Snippet Guide

The [`contributes.snippets`](/api/references/contribution-points#contributes.snippets) Contribution Point allows you to bundle snippets into a Visual Studio Code extension for sharing.

The [Creating snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets) topic contains all information for creating snippets. This guide / sample just shows how you can turn your own snippets into an extension for sharing. The suggested workflow is:

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

You can find the complete source code at: https://github.com/Microsoft/vscode-extension-samples/tree/master/snippet-sample

**Tip**: Tag your extension as a snippet extension with the following config in your `package.json`:

```json
{
	"categories": [
		"Snippets"
	]
}
```
