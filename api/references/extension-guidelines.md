---
## DO NOT TOUCH — Managed by doc writer
ContentId: fc74f04f-6ba5-4ecc-a28c-75efcdb8ed9a
DateApproved: 8/5/2021
MetaDescription: User interface guidelines for Visual Studio Code extension authors
---
# Extension Guidelines

These guidelines cover the best practices for creating Visual Studio Code extensions.

## Architecture

The VS Code UI has two types of elements: containers and items. Containers refer to the outer layers, which include:

[![Overview of Visual Studio Code containers elements](images/guidelines/architecture-groups.png)](/assets/api/references/guidelines/architecture-groups.png)

1. [Activity Bar](#view-containers)
2. Sidebar
3. Editor
4. Panel
5. Status Bar

Items are placed inside of various containers and include:

[![Overview of Visual Studio Code item elements](images/guidelines/architecture-sections.png)](/assets/api/references/guidelines/architecture-sections.png)

6. View Container
7. [View](#views)
8. View Toolbar
9. Sidebar Toolbar
10. [Editor Toolbar](#editor-actions)
11. View Container
12. Panel Toolbar
13. View
14. [Status Bar Item](#status-bar):

## Notifications

[Notifications](/api/extension-capabilities/common-capabilities#display-notifications) display brief information that is surfaced from the bottom right of VS Code. You can send three types of notifications:

* [Information](/api/references/vscode-api#window.showInformationMessage)
* [Warning](/api/references/vscode-api#window.showWarningMessage)
* [Error](/api/references/vscode-api#window.showErrorMessage)

It's important to limit the number of notifications sent in order to respect the user's attention. To help guide your decision on whether or not you should show a notification, please follow our notification decision tree:

[![Notification decision tree for showing notifications](images/guidelines/notification-decision-tree.png)](/assets/api/references/guidelines/notification-decision-tree.png)

### Notification examples

![Information notification](images/guidelines/notification-info.png)

*This notification appears after the user runs an **Update version** command. Notice that there are no additional actions and is purely informational.*

![Warning notification](images/guidelines/notification-warning.png)

*This example highlights a blocking error with a feature that requires user input and shows actions to resolve the issue.*

![Error notification](images/guidelines/notification-error.png)

*This example shows a failure notification with no actions.*

**✔️ Do**

* Respect the user's attention by only sending notifications when absolutely necessary
* Add a **Do not show again** option for every notification
* Show one notification at a time

**❌ Don't**

* Send repeated notifications
* Use for promotion
* Ask for feedback on the first install
* Show actions if there aren't any

### Progress notification

When needing to display progress for an undetermined timeframe (for example, setting up an environment), you can use the progress notification. This type of global progress notification should be used as a last resort as progress is best kept within context (within a view or editor).

**✔️ Do**

* Show a link to see more details (like logs)
* Show information as setup progresses (initializing, building, etc.)
* Provide an action to cancel the operation (if applicable)
* Add timers for timed out scenarios

**❌ Don't**

* Leave a notification running in progress

![Progress notification](images/guidelines/notification-progress.png)

*This example uses the progress notification to show the setup involved for a remote connection, while also providing a link to the output logs (**details**).*

## Views

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

![Views example](images/guidelines/views-example.png)

*This example uses the tree view to display a list of tests and the state for each one. Each test type has a unique icon.*

### View locations

Views can be placed in [existing view containers](/api/references/contribution-points#contributes.views), such as the File Explorer and Source Control (SCM) and Debug view containers. They can also be added to a custom view container via the Activity Bar. In addition, views can be added to any view container in the panel or in their own custom view container.

![View locations](images/guidelines/views-locations.png)

### View Containers

[View Containers](/api/references/contribution-points#contributes.viewsContainers) are part of the Activity Bar. Each container has a unique icon that matches the rest of the iconography (outline) style.

![View Container](images/guidelines/view-container.png)

*This example shows an outline icon used for a custom view container.*

### Views with progress

You can also [show progress in the Source Control view](/api/references/vscode-api#ProgressLocation) if your view is inside of the SCM view container.

![SCM Progress](images/guidelines/scm-progress.png)

### Welcome views

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

![Welcome Views](images/guidelines/welcome-views.png)

*This example shows one primary action for the extension and the additional views have context about what to expect with links to documentation.*

## Webviews

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

### Webview examples

**Browser preview**

This extension opens a browser preview for the editor to the side.

![Weview Sample - Browser](images/guidelines/webview-browser.png)

**Pull request**

This extension shows pull requests for the repository of the workspace in a custom tree view and then uses a webview for a detail view of the pull request.

![Webview Sample - Pull Request](images/guidelines/webview-pullrequest.png)

**Onboarding**

This extension opens a quickstart webview with helpful actions and links for more information. The webview only appears the first time a user opens a certain file and checks if certain steps have already been completed (for example, install or create a file).

![Webview Sample - Onboarding](images/guidelines/webview-onboarding.png)

### Webview views

You can also place webviews into any view container (sidebar or panel) and these elements are called [webview views](/api/references/vscode-api#WebviewView). The same webview guidance applies to webview views.

![Webview View](images/guidelines/webview-view.png)

*This webview view shows content for creating a pull request that uses dropdowns, inputs, and buttons.*

## Status Bar

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

![Status Bar Item](images/guidelines/statusbar-item.png)

*This example shows an item that relates to the entire workspace, so it is on the left.*

### Progress Status Bar item

When needing to show discreet progress (progress happening in the background), it's recommended to show a Status Bar item with the loading icon (you can also add spin animation). If progress needs to be elevated for user attention, we recommend moving to a progress notification.

![Status Bar Progress](images/guidelines/status-bar-progress.png)

*This example shows a progress Status Bar item that is discreet.*

### Error Status Bar item

If you need to show an item that is highly visible for error purposes, you can use the error Status Bar item. Only use error Status Bar items as a last resort and only for special cases.

![Status Bar Error](images/guidelines/status-bar-error.png)

*This example uses the error Status Bar item for showing a blocking error in the file.*

## Quick Picks

[Quick Picks](/api/extension-capabilities/common-capabilities#quick-pick) are an easy way to perform actions and receive input from the user. This is helpful when selecting a configuration option, needing to filter content, or picking from a list of items.

![Quick Pick](images/guidelines/quickpick.png)

*This made-up example shows all of the variations that a Quick Pick can contain. It can have items with icons, detail lines, and labels for indicating a default or current item. At the top, it shows the multi-step pattern with back, undo, and forward actions.*

**✔️ Do**

* Use icons for clear metaphors
* Use the description for displaying the current items (if applicable)
* Use the detail for providing (brief) additional context
* Use the multi-step pattern for a series of inputs (like a wizard)
* Provide an option to create a new item when picking from a list (if applicable)

❌ Don't

* Repeat existing functionality
* Use the same icon for multiple items
* Use more than six icons in a list

## Editor Actions

[Editor actions](/api/references/contribution-points#contributes.commands) can appear in the editor toolbar. You can either add an icon as a quick action or add menu item under the overflow menu (**...**).

**✔️ Do**

* Show only when contextually appropriate
* Use icons from the icon library
* Use the overflow menu for secondary actions

❌ Don't

* Add more than one icon
* Add custom colors
* Use emojis

![Editor Actions](images/guidelines/editor-actions.png)

*This example only uses a single icon that only appears on HTML pages to launch a preview.*

## Context Menus

[Menu items](/api/references/contribution-points#contributes.menus) appear in views, actions, and right-click menus. It's important that the grouping of menus remain consistent. If your extension has actions that relate to files, place your actions in the File Explorer context menu (when appropriate). If an extension has actions for certain file types, only display it for those items.

**✔️ Do**

* Show actions when contextually appropriate
* Group similar actions together
* Place large groups of actions into a submenu

❌ Don't

* Show actions for every file without context

![Context Menu](images/guidelines/context-menu.png)

*This example places a **Copy GitHub Link** next to the other copy commands. This action only appears on files that are from a GitHub repository.*

## Settings

[Settings](/api/references/contribution-points#contributes.configuration) are how a user can configure your extension. Settings can be inputs boxes, booleans, dropdowns, lists, key/value pairs. If your extension requires the user to configure specific settings, you can open the Settings UI and query your extension setting via the setting ID.

**✔️ Do**

* Add default values to each setting
* Add clear descriptions to each setting
* Link to documentation for complicated settings
* Link to additional settings that are related
* Link to setting IDs when needing the user to configure specific settings

❌ Don't

* Create your own settings page/webview
* Create long descriptions

![Settings](images/guidelines/settings.png)

*This example links to a specific setting using the setting ID.*

## Command Palette

The [Command Palette](/api/references/contribution-points#contributes.commands) is where all commands are found. It's important that your command names are labeled appropriately so users can easily find them.

**✔️ Do**

* Add keyboard shortcuts where appropriate
* Use clear names for commands
* Group commands together in the same category

❌ Don't

* Overwrite existing keyboard shortcuts
* Use emojis in command names

![Command Palette](images/guidelines/command-palette.png)

*This example has commands that are grouped together in the "Debug" category and have clear labels and only a few commands have shortcuts.*
