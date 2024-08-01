---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1e37b895-d0b3-45b8-a071-107bd665248e
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for views in a Visual Studio Code extension.
---

# Views

[Views](/api/references/contribution-points#contributes.views) are containers of content that can appear in the Sidebar or Panel. Views can contain Tree Views, Welcome Views, or Webview Views and can also display View Actions. Views can also be rearranged by the user or moved to another View Container (for example, from the Primary Sidebar to the Secondary Sidebar). Limit the number of Views created as other extensions can contribute in the same View Container.

**✔️ Do**

* Use existing icons when possible
* Use file icons for language files
* Use a Tree View for displaying data
* Add an icon to every View (in case it is moved to the Activity Bar or Secondary Sidebar—both of which use icons to represent the View)
* Keep the number of Views to a minimum
* Keep the length of names to a minimum
* Limit the use of custom Webview Views

**❌ Don't**

* Repeat existing functionality
* Use tree items as single action items (for example, firing a Command on click)
* Use custom Webview Views if not necessary
* Use a Activity Bar Item (View Container) to open a Webview in the Editor

![Views example](images/examples/view.png)

*This example uses a Tree View to display a flat list of Tree View Items.*

## View Locations

Views can be placed in [existing View Containers](/api/references/contribution-points#contributes.views), such as the File Explorer, Source Control (SCM) and Debug View Containers. They can also be added to a custom [View Container](/api/ux-guidelines/views#view-containers) via the Activity Bar. In addition, Views can be added to any View Container in the Panel. They can also be dragged to the Secondary Sidebar.

![View locations](images/examples/view-locations.png)

## View Containers

View Containers, as the name implies, are the "parent" container in which Views are rendered. Extensions can contribute custom View Containers to the [Activity Bar](/api/ux-guidelines/activity-bar)/[Primary Sidebar](/api/ux-guidelines/sidebars) or to the Panel. Users can drag an entire View Container from the Activity Bar to the Panel (or vice versa) and can also move individual Views.

![Example of a View Container](images/examples/view-container.png)

*This is an example of a View Container placed in the Activity Bar/Primary Sidebar*

![Example of a View Container in a Panel](images/examples/view-container-panel.png)

*This is an example of a View Container placed in the Panel*

## Tree Views

Tree Views are a powerful and flexible format to display content in a View. Extensions can add everything from simple flat lists to deeply nested trees.

* Use descriptive labels to give context to items (if applicable)
* Use product icons to distinguish between item types (if applicable)

**❌ Don't**

* Use Tree View Items as buttons to fire Commands
* Avoid deep nesting unless necessary. A few levels of folders/items is a good balance for most situations.
* Add more than three actions to an item

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

*This example shows one primary action for the extension with an additional link to documentation.*

## Views With Progress

You can also [show progress in a view](/api/references/vscode-api#ProgressLocation) by referencing the view's ID.

![View with progress](images/examples/view-with-progress.png)

## View Actions

Views can expose [View Actions](/api/extension-guides/tree-view#view-actions) on the View Toolbar. Be careful not to add too many actions to avoid noise and confusion. Using the built-in product icons helps an extension fit in alongside the native UI. However, an SVG icon can be supplied if a custom icon is needed.

![Example of View Actions](images/examples/view-toolbar.png)

## Links

* [View Container API reference](/api/references/contribution-points#contributes.viewsContainers)
* [View API reference](/api/references/contribution-points#contributes.views)
* [View Actions extension guide](/api/extension-guides/tree-view#view-actions)
* [Tree View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/tree-view-sample)
* [Welcome View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/welcome-view-content-sample)
* [Webview View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)
