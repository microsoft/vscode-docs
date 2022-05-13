---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2d16d367-2831-47ca-8f0e-22e3e5fd24bc
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for status bar and status bar items in a Visual Studio Code extension.
---

# Status Bar

The [Status Bar](/api/extension-capabilities/extending-workbench#status-bar-item) sits at the bottom of the VS Code workbench and displays information and actions that relate to your workspace. Items are placed into two groups: Primary (left) and Secondary (right). Items that relate to the entire workspace (status, problems/warnings, sync) go on the left and items that are secondary or contextual (language, spacing, feedback) go on the right. Limit the number of items added, as other extensions contribute to the same area.

**✔️ Do**

* Use short text labels
* Use icons only when necessary
* Use icons only for clear metaphors
* Place primary (global) items on the left
* Place secondary (contextual) items on the right

**❌ Don't**

* Add custom colors
* Add more than one icon (unless necessary)
* Add more than one item (unless necessary)

![Status Bar Item](images/examples/statusbar-item.png)

*This example shows an item that relates to the entire workspace, so it is on the left.*

## Progress Status Bar item

When needing to show discreet progress (progress happening in the background), it's recommended to show a Status Bar item with the loading icon (you can also add spin animation). If progress needs to be elevated for user attention, we recommend moving to a progress notification.

![Status Bar Progress](images/examples/status-bar-progress.png)

*This example shows a progress Status Bar item that is discreet.*

## Error Status Bar item

If you need to show an item that is highly visible for error purposes, you can use the error Status Bar item. Only use error Status Bar items as a last resort and only for special cases.

![Status Bar Error](images/examples/status-bar-error.png)

*This example uses the error Status Bar item for showing a blocking error in the file.*
