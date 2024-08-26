---
# DO NOT TOUCH — Managed by doc writer
ContentId: ce5c9fff-df86-454a-b4e8-4ae05c8158e2
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for editor actions in a Visual Studio Code extension.
---

# Editor Actions

[Editor actions](/api/references/contribution-points#contributes.commands) can appear in the editor toolbar. You can either add an icon as a quick action or add menu item under the overflow menu (**...**).

**✔️ Do**

* Show only when contextually appropriate
* Use icons from the icon library
* Use the overflow menu for secondary actions

❌ Don't

* Add more than one icon
* Add custom colors
* Use emojis

![Editor Actions](images/examples/editor-actions.png)

*This example from the GitHub Pull Requests and Issues extension opens a diff view and only shows on files with changes.*

## Links

* [Custom Editor extension guide](/api/extension-guides/custom-editors)
* [Custom Editor API reference](/api/references/contribution-points#contributes.customEditors)
* [Custom Editor extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/custom-editor-sample)
* [Webview extension guide](/api/extension-guides/webview)
* [Webview extension sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample)
