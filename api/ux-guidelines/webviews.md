---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1c1f6d51-5914-44fa-ae10-0360be0ae2a3
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for webviews in a Visual Studio Code extension.
---

# Webviews

If you need to display custom functionality that is beyond what the VS Code API supports, you can use [webviews](/api/extension-guides/webview), which are fully customizable. It's important to understand that webviews should only be used if you absolutely need them.

**✔️ Do**

* Only use webviews when absolutely necessary
* Activate your extension only when contextually appropriate
* Open webviews only for the active window
* Ensure all elements in the view are themeable (see the [webview-view-sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/media/main.css) and [color tokens](/api/references/theme-color) documentation)
* Ensure your views follow [accessibility guidance](/docs/editor/accessibility) (color contrast, ARIA labels, keyboard navigation)
* Use command actions in the toolbar and in the view

❌ Don't

* Use for promotions (upgrades, sponsors, etc.)
* Use for wizards
* Open on every window
* Open on extension updates (ask via a Notification instead)
* Add functionality that is unrelated to the editor or workspace
* Repeat existing functionality (Welcome page, Settings, configuration, etc.)

## Webview examples

**Simple Browser**

This extension opens a browser preview for the editor to the side.

![Weview sample - Browser](images/examples/webview-browser.png)

*This example shows VS Code Web being developed right inside VS Code. A Webview panel is used to render a browser-like window.*

**Pull Request**

This extension shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

![Webview sample - Pull Request](images/examples/webview-pull-request.png)

## Webview views

You can also place webviews into any view container (sidebar or panel) and these elements are called [webview views](/api/references/vscode-api#WebviewView). The same webview guidance applies to webview views.

![Webview View](images/examples/webview-view.png)

*This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons.*

## Links

* [Webview extension guide](/api/extension-guides/webview)
* [Webview extension sample](https://github.com/Microsoft/vscode-extension-samples/tree/main/webview-sample)
* [Webview View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)
