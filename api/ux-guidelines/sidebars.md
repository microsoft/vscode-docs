---
# DO NOT TOUCH — Managed by doc writer
ContentId: 05bd995d-946e-4046-8816-c6d50dccb1b4
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the Side Bar in a Visual Studio Code extension.
---

# Sidebars

The Primary and Secondary Sidebars one of more [Views](/api/ux-guidelines/views) contributed by a [View Container](/api/ux-guidelines/views#view-containers). Extensions can contribute Views to an existing View Container (for example, Explorer) or they can contribute an entirely new View Container.

**✔️ Do**

- Group related Views and content together
- Use clear, descriptive names for View Containers and their Views

**❌ Don't**

- Use an excessive number of View Containers. A single View Container (such as a Sidebar with Views unique that extension) is generally enough for most extensions.
- Use an excessive number of Views (3-5 is a comfortable max for most screen sizes)
- Add content to the Sidebar that could be a simple Command.
- Repeat existing functionality

![Example of two sidebars](images/examples/sidebars.png)

## Primary Sidebar

Many extensions choose to contribute Views and/or View Containers to the Primary Sidebar given the high visibility it gives content. Use good judgement when adding content here—too much contributed UI can lead to a cluttered experience that can confuse your users.

![Example of the primary sidebar](images/examples/primary-sidebar.png)

## Secondary Sidebar

As the name implies, the Secondary Sidebar is normally considered a auxiliary location for Views. While extensions cannot contribute Views directly to it by default, users can drag Views from the Primary Sidebar or the Panel to customize their layout.

![Example of the secondary sidebar](images/examples/secondary-sidebar.png)

## Sidebar Toolbars

By default, View Containers in the Sidebar with more than one View will feature a single `...` icon button in the Sidebar Toolbar to show and hide each View. That looks something like this:

![Sidebar with two views](images/examples/sidebar-toolbar-default.png)

However, if only one View is used, the Sidebar will automatically consolidate the UI to use the Sidebar Toolbar to render all of the actions specific to that View. In place of the `...` button, the two actions associated with the 'Notes' View are rendered in its place:

![Sidebar with a single view and toolbar with actions](images/examples/sidebar-toolbar-actions.png)

As with other toolbars, be careful to not add too many actions to reduce clutter and confusion. If possible, use an existing product icon paired with a descriptive Command name.

## Links

- [View Container contribution point](/api/references/contribution-points#contributes.viewsContainers)
- [View contribution point](/api/references/contribution-points#contributes.views)
- [View Actions extension guide](/api/extension-guides/tree-view#view-actions)
- [Welcome View contribution point](/api/references/contribution-points#contributes.viewsWelcome)
- [Tree View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/tree-view-sample)
- [Webview View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)
- [Welcome View extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/welcome-view-content-sample)
