---
# DO NOT TOUCH — Managed by doc writer
ContentId:
DateApproved:

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription:
---

# Extension Guidelines

These guidelines are to provide guidance for extension when using the API.

# Architecture

## Groups

- Activity Bar
- Side Bar
- Editor
- Panel
- Status Bar

![images/guidelines/Untitled.png](images/guidelines/architecture-groups.png)

## Sections

- Activity Bar
    - View Container
- Side Bar
    - Sidebar Toolbar
    - View
    - View Toolbar
- Editor
    - Editor Toolbar
- Panel
    - Panel Toolbar
    - View Container
    - View
    - View toolbar
- Status Bar
    - Status Bar Item

![images/guidelines/Untitled%201.png](images/guidelines/architecture-sections.png)

---


# Notifications

These are small bits of information that is surfaced from the bottom right. You can send three types of notifications: Information, Warning, and Error. It's important to limit the amount of notifications sent in order to respect the user's attention.

![Information notification](images/guidelines/notification-info.png)

*This notification appears after the users runs a "Update version" command. Notice that there are no additional actions and is purely informational.*

![Warning Notification](images/guidelines/Untitled%2019.png)

*This examples highlights the errors that appear when trying to build and has an action to open the files with errors.*

![Error Notification](images/guidelines/Untitled%2020.png)

*This example shows a failure notifiction with no actions.*

### ✅ Do
- Respect the user's attention by only sending notifications when absolutely necessary
- Add a "Do not show again" option for every notification
- Show one notification at a time

### ❌ Don't
- Send repeated notifications
- Use for promotion
- Ask for feedback on the first install
- Show actions if there aren't any

## Progress Notification

When needing to display progress for an undetermed timeframe (setting up an evironment), you can use the progress notification.

### ✅ Do
- Show a link to see more details (like logs)
- Show information as setup progresses (initializing, building, etc.)
- Provide an action to cancel the operation (if applicable)
- Add timers for timed out scenarios

### ❌ Don't
- Leave a notification running in progress

![Progress notification](images/guidelines/notification-progress.png)

This example uses the progress notification to show the setup involved for a remote connection, while also providing a link to the output logs.

# Views

[Views](/api/references/contribution-points#contributes.views) are containers of content that can appear in the sidebar or panel. Views can contain tree views  or custom views and can also display view actions. Views can also be re-arranged by the user into other views, activity bar items, and panels. Please limit the amount of views created as other extensions can contribute in the same view.

### ✅ Do
- Use existing icons when possible
- Use file icons for language files
- Use a tree view for displaying data
- Add an activity bar icon to every view
- Keep the number of views to a minimum
- Keep the length of names to a minimum
- Limit the use of custom webview views

### ❌ Don't
- Repeat existing functionality
- Use tree items as single action items (i.e. search bar)
- Use custom webview views if not necessary
- Use a view container to launch a webview in the editor

![Views example](images/guidelines/views-example.png)

*This example uses the tree view to display a list of tests and the state for each one. Each test type has a unique icon.*

## View Locations

Views can be placed in [existing view containers](/api/references/contribution-points#contributes.views) in the like the Explorer, SCM, Debug, etc. They can also be added to a custom view container via the Activity Bar. And they can also be added to any view container in the panel or in their own custom view container.

![View locations](images/guidelines/views-locations.png)

## View Container

[View containers](/api/references/contribution-points#contributes.viewsContainers) are part of the Activity Bar. Each container has a unique icon that matches the rest of the iconography (outline) style. View container can display a badge count when needing to surface informaion to the user.

![View Container](images/guidelines/view-container.png)

*This example shows an outline icon used for a custom view container.*

## Views with progress

You can also [show progress in the Source Control view](/api/references/vscode-api#ProgressLocation) if your view is inside of the SCM view.

![SCM Progress](images/guidelines/scm-progress.png)

## Welcome views

When a view is empty, you can [add content to guide users](/api/references/contribution-points#contributes.viewsWelcome) on how to use your extension or get started. Links and icons are supported in welcome views.

### ✅ Do
- Use welcome views only when necessary
- Use links instead of buttons when possible
- Use buttons only for primary actions
- Use clear link text to indicate the link destination
- Limit the length of the content
- Limit the number of welcome views
- Limit the number of buttons in views

### ❌ Don't
- Use buttons if not necessary
- Use welcome views for promotions
- Use "read more" as link text

![Welcome Views](images/guidelines/welcome-views.png)

*This example shows one primary action for the extension and the additional views have context about what to expect with links to documentation.*

# Webviews

If you need to display custom functionality that is beyond what the API supports, you can leverage [webviews](/api/extension-guides/webview) which are fully customizable. It's important to understand that these should only be used if you absolutely need them.

✅ Do

- Only use webviews when absolutely necessary
- Activate your extension only when contextually appropriate
- Open webviews only for the active window
- Ensure all elements in the view is themeable (see [sample](https://github.com/microsoft/vscode-extension-samples/blob/master/webview-view-sample/media/main.css) and [color tokens](/api/references/theme-color))
- Ensure your views follow [accessibility guidance](/docs/editor/accessibility) (color contrast, aria labels, keyboard navigation, etc.)
- Leverage command actions in the toolbar and in the view

❌ Don't

- Use for pomotions (upgrades, sponsors, etc.)
- Use for wizards
- Open on every window
- Open on extension updates (ask via a notification)
- Add functionality that is unrelated to the editor or workspace
- Repeat existing functionality (welcome page, settings, configuration, etc.)

## Webview examples

### **Browser preview**

This extension opens a browser preview for the editor to the side.

![Weview Sample - Browser](images/guidelines/webview-browser.png)

### **Pull request**

This extensions shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

![Webview Sample - Pull Request](images/guidelines/webview-pullrequest.png)

### Onboarding

This extensions opens a quickstart webview with helpful actions and links for more information. This only appears the first time a user opens a certain file and checks if certain steps have already been complete (i.e. install or create a file).

![Webview Sample - Onboarding](images/guidelines/webview-onboarding.png)

## Webview views

You can also place webviews into any view container (sidebar or panel), these are called [webview views](/api/references/vscode-api#WebviewView). The same webview guidance applies to webview views.

![Webview View](images/guidelines/webview-view.png)

*This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons.*


# Status Bar

The status bar sits at the bottom of the workbench and displays information and actions that relate to your workspace. Items are placed into two groups: Primary (left) and Secondary (right). Items that relate to the entire workspace (status, problems/warnings, sync) go on the left and items that are secondary or contextual (language, spacing, feedback) go on the right. Please limit the amount of items added as other extensions contribute to the same area.

### ✅ Do

- Use short text labels
- Use icons only when necessary
- Use icons only for clear metaphors
- Place primary (global) items on the left
- Place secondary (contextual) items on the right

### ❌ Don't

- Add custom colors
- Add more than one icon (unless necessary)
- Add more than one item (unless necessary)

![images/guidelines/Untitled%202.png](images/guidelines/Untitled%202.png)

_This example shows an item that relates to the entire workspace, so it is on the left_

## Progress status bar item

When needing to show discreet progress (progress happening in the background), it's recommended to show a status bar item with the loading icon (you can also add spin animation). If progress needs to be elevated for user attention, we recommend moving to a progress notification.

![images/guidelines/Untitled%203.png](images/guidelines/Untitled%203.png)

This example shows a progress status bar item that is discreet

### Error status bar item

If you need to show an item that is highly visible for error purposes, you can use the error status bar item. Please only use this as a last resort and only for special cases.

![images/guidelines/Untitled%204.png](images/guidelines/Untitled%204.png)

This example uses the error status bar item for showing a blocking error in the workspace

# Quick picks

A way to perform actions and to receive input from the user. This is helpful when setting something up, needing to filter content, or pick from a list of items.

![images/guidelines/Untitled%2017.png](images/guidelines/Untitled%2017.png)

This example shows all of the variations that a quick pick can contain. It can have items with icons, detail lines, and labels for indicating a default or current item. At the top, it shows the multi step pattern with back, undo, and forward actions.

✅ Do

- Use icons for clear metaphors
- Use the description for displaying the current items (if applicable)
- Use the detail for providing (brief) additional context
- Use the multi-step pattern for a series of inputs (like wizard)
- Provide an option to create a new item when picking from a list (if applicable)

❌ Don't

- Repeat existing functionality
- Use the same icon for multiple items
- Use more then 6 icons in a list

---

# Editor Actions

These appear in the editor toolbar. You can either add an icon as a quick action or add menu item under the overflow menu (...).

✅ Do

- Show only when contextually appropriate
- Use icons from the icon library
- Use the overflow menu for secondary actions
- Allow users to hide via settings

❌ Don't

- Add more than one icon
- Add custom colors
- Use emojis

![images/guidelines/Untitled%2022.png](images/guidelines/Untitled%2022.png)

This example only uses a single icon that only appears on HTML pages to launch a preview.

---

# Context Menus

These items appear in menus on views, actions, and right-click menus. It's important that the grouping of menus remain consistent. If you extension has actions that relate to files, place your actions in the file explorer context menu (when appropriate). If an extension has actions for certain file types, only display it for those items.

✅ Do

- Show actions when contextually appropriate
- Group similar actions together
- Place large groups of actions into a subemnu

❌ Don't

- Show actions for every file without context

![images/guidelines/Untitled%2023.png](images/guidelines/Untitled%2023.png)

This example places a "Copy GitHub Link" next to the other copy commands. This action only appears on files that are from a GitHub repository.

---

# Settings

This is where you can display settings that a user can configure. Settings can be inputs boxes, booleans, dropdowns, lists, key/value pairs. If your extension requires the user to configure specific settings, you can open the settings ui and query your extension setting via the setting id.

✅ Do

- Add default values to each setting
- Add clear descriptions to each setting
- Link to documentation for complicated settings
- Link to additional settings that are related
- Link to setting IDs when needing the user to configure specific settings

❌ Don't

- Create your own settings page/webview
- Create long descriptions

![images/guidelines/Untitled%2024.png](images/guidelines/Untitled%2024.png)

This example links to a specfic setting using the setting id

---

# Command Palette

This is where all commands are found. It's important that your command names are labeled appropriately so users can easily find them.

✅ Do

- Add keyboard shortcuts where appropriate
- Use clear names for commands
- Group commands together in the same category

❌ Don't

- Overwrite existing keyboard shortcuts
- Use emojis in command names

![images/guidelines/Untitled%2025.png](images/guidelines/Untitled%2025.png)

This examples has commands that are grouped together in the "Debug" category and have clear labels and only a few commands have shortcuts.