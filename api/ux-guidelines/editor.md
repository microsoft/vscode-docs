# Editor

The Editor area contains one or more Editor Groups. Extensions can contribute [Custom Editors](api/extension-guides/custom-editors) or [Webviews](api/ux-guidelines/webviews) to open in the Editor area.

**✔️ Do**

- TBD
- TBD
- TBD

❌ Don't

- TBD
- TBD
- TBD

![Example of a custom editor](images/examples/editor.png)

## Editor Actions

[Editor actions](/api/references/contribution-points#contributes.commands) can appear in the editor toolbar. You can either add an icon as a quick action or add menu item under the overflow menu (**...**).

**✔️ Do**

- Show only when contextually appropriate
- Use icons from the icon library
- Use the overflow menu for secondary actions

❌ Don't

- Add more than one icon
- Add custom colors
- Use emojis

![Editor Actions](images/examples/editor-toolbar.png)

*This example only uses a single icon that only appears on HTML pages to launch a preview.*

## Links
- [Custom Editor Extension Guide](https://code.visualstudio.com/api/extension-guides/custom-editors)
- [Custom Editor API Reference](https://code.visualstudio.com/api/references/contribution-points#contributes.customEditors)
- [Custom Editor Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/custom-editor-sample)
- [Webview Extension Guide](https://code.visualstudio.com/api/extension-guides/webview)
- [Weview Extension Sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample)
