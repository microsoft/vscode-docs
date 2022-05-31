---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1e37b895-d0b3-45b8-a071-107bd665248e
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for views in a Visual Studio Code extension.
---

# Views

[Views](/api/references/contribution-points#contributes.views) are containers of content that can appear in the Sidebar or Panel. Views can contain Tree Views, Welcome Views, or Webview Views and can also display View Actions. Views can also be rearranged by the user or moved to another View Container (e.g. from the Primary Sidebar to the Secondary Sidebar). Limit the number of Views created as other extensions can contribute in the same View Container.

**✔️ Do**

* Use existing icons when possible
* Use file icons for language files
* Use a Tree View for displaying data
* Add an icon to every View (in case it is moved to the Acivity Bar or Secondary Sidebar—both of which use icons to represent the View)
* Keep the number of Views to a minimum
* Keep the length of names to a minimum
* Limit the use of custom Webview Views

**❌ Don't**

* Repeat existing functionality
* Use tree items as single action items (e.g. firing a Command on click)
* Use custom Webview Views if not necessary
* Use a Activity Bar Item (View Container) to open a Webview in the Editor

![Views example](images/examples/view.png)

*This example uses a Tree View to display a flat list of Tree View Items.*

## View Locations

Views can be placed in [existing View Containers](/api/references/contribution-points#contributes.views), such as the File Explorer, Source Control (SCM) and Debug View Containers. They can also be added to a custom View Container via the Activity Bar. In addition, Views can be added to any View Container in the Panel. They can also be dragged to the Secondary Sidebar.

![View locations](images/examples/view-locations.png)

## Tree Views

Tree Views are a powerful and flexible format to display content in a View. Extensions can add everything from simple flat lists to deeply nested trees.

* Use labels to add context to items where applicable
* TBD
* TBD

**❌ Don't**

* Use Tree View Items as buttons to fire Commands
* TBD
* TBD

![Example of a Tree View](images/examples/tree-view.png)

## Welcome Views

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

## Views With Progress

You can also [show progress in a view](/api/references/vscode-api#ProgressLocation) by referencing the view's ID.

![View with progress](images/examples/view-with-progress.png)


## View Toolbar

TBD

![Example of a View Toolbar](images/examples/view-toolbar.png)

## Links
- [View Container API Reference](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers)
- [View API Reference](https://code.visualstudio.com/api/references/contribution-points#contributes.views)
- [View Actions](https://code.visualstudio.com/api/extension-guides/tree-view#view-actions)
- [Tree View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/tree-view-sample)
- [Welcome View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/welcome-view-content-sample)
- [Webview View Extension Sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)