# Panel

The Panel functions as another main area to display [View Containers](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers).

**✔️ Do**

- Render Views in the Panel that benefit from more horizontal space
- Use for Views that provide supporting functionality

**❌ Don't**

- Use for Views that are meant to be always visible since users often minimize the Panel
- Render custom Webview content that fails to resize/reflow properly when dragged to other View Containers (like the Primary or Secondary Sidebars).

![Example of a panel](images/examples/panel.png)

## Panel Toolbar

The Panel Toolbar can expose options scoped to the currently selected View. For example the Terminal view exposes [View Actions](https://code.visualstudio.com/api/extension-guides/tree-view#view-actions) to add a new terminal, split the view layout, and more. Switching to the Problems view exposes a different set of actions.

**✔️ Do**

- Use an existing [product icon](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing) if available
- Provide clear, useful tooltips

**❌ Don't**

- Don't add an excessive number of icon buttons. Consider using a [Context Menu](https://code.visualstudio.com/api/references/contribution-points#contributes.menus) if more options are needed for a specific button.
- Don't duplicate the default Panel icons (collapse/expand, close, etc.)

![!Example of a panel toolbar](images/examples/panel-toolbar.png)

## Links
- [View Container Contribution Point](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers)
- [View Contribution Point](https://code.visualstudio.com/api/references/contribution-points#contributes.views)
- [View Actions](https://code.visualstudio.com/api/extension-guides/tree-view#view-actions)