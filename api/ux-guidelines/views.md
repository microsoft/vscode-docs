---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1e37b895-d0b3-45b8-a071-107bd665248e
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for views in a Visual Studio Code extension.
---

# Views

[Views](/api/references/contribution-points#contributes.views) are containers of content that can appear in the sidebar or panel. Views can contain tree views or custom views and can also display view actions. Views can also be rearranged by the user into other views, Activity Bar items, and panels. Limit the number of views created as other extensions can contribute in the same view.

**✔️ Do**

* Use existing icons when possible
* Use file icons for language files
* Use a tree view for displaying data
* Add an Activity Bar icon to every view
* Keep the number of views to a minimum
* Keep the length of names to a minimum
* Limit the use of custom webview views

**❌ Don't**

* Repeat existing functionality
* Use tree items as single action items (for example, search bar)
* Use custom webview views if not necessary
* Use a view container to launch a webview in the editor

![Views example](images/examples/view.png)

*This example uses the tree view to display a list of tests and the state for each one. Each test type has a unique icon.*

## View locations

Views can be placed in [existing view containers](/api/references/contribution-points#contributes.views), such as the File Explorer and Source Control (SCM) and Debug view containers. They can also be added to a custom view container via the Activity Bar. In addition, views can be added to any view container in the panel or in their own custom view container.

![View locations](images/examples/view-locations.png)

## View Containers

[View Containers](/api/references/contribution-points#contributes.viewsContainers) are part of the Activity Bar. Each container has a unique icon that matches the rest of the iconography (outline) style.

![View Container](images/examples/view-container.png)

*This example shows an outline icon used for a custom view container.*

## Views with progress

You can also [show progress in a view](/api/references/vscode-api#ProgressLocation) by referencing the view's ID.

![View with progress](images/examples/view-with-progress.png)

## Welcome views

When a view is empty, you can [add content to guide users](/api/references/contribution-points#contributes.viewsWelcome) on how to use your extension or get started. Links and icons are supported in Welcome views.

**✔️ Do**

* Use Welcome views only when necessary
* Use links instead of buttons when possible
* Use buttons only for primary actions
* Use clear link text to indicate the link destination
* Limit the length of the content
* Limit the number of Welcome views
* Limit the number of buttons in views

**❌ Don't**

* Use buttons if not necessary
* Use Welcome views for promotions
* Use generic "read more" as link text

![Welcome Views](images/examples/welcome-view.png)

*This example shows one primary action for the extension and the additional views have context about what to expect with links to documentation.*

## View Toolbar

TBD

## Links
- [View Container API Reference](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers)
- [View API Reference](https://code.visualstudio.com/api/references/contribution-points#contributes.views)
- [View Actions](https://code.visualstudio.com/api/extension-guides/tree-view#view-actions)
- [Tree View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/tree-view-sample)
- [Welcome View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/welcome-view-content-sample)
- [Webview View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)