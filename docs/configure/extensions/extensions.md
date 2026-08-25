---
ContentId: d2ce015b-4075-4467-a221-114aff2633db
DateApproved: 6/3/2026
MetaDescription: Learn how to install extensions from the Visual Studio Marketplace to add features for your programming language, framework, or development workflow to Visual Studio.
---
# Use extensions in {% data variables.product.prodname_vscode %}

{% data variables.product.prodname_vscode %} extensions let you add languages, debuggers, and tools to your installation to support your development workflow. When you use {% data variables.product.prodname_vscode_shortname %}, you can install extensions directly from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) and take advantage of automatic updates to always have the latest features. In this article, you learn how to browse and install extensions in {% data variables.product.prodname_vscode_shortname %}.

The Visual Studio Marketplace hosts thousands of extensions across a wide range of categories. To protect you from malicious extensions, it employs several mechanisms, like publisher trust, malware scanning, and more. Learn more about [extension runtime security](/docs/configure/extensions/extension-runtime-security.md).

## Browse extensions

The Extensions view in {% data variables.product.prodname_vscode_shortname %} enables you to browse and install extensions from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

To browse the extension Marketplace from within {% data variables.product.prodname_vscode_shortname %}:

1. Open the Extensions view by selecting the Extensions icon in the Activity Bar, or use the `kb(workbench.view.extensions)` keyboard shortcut.

    ![Screenshot of the Extensions view, filtered by 'todo', highlighting the Activity Bar icon.](images/extensions/search-for-todo-extension.png)

1. Optionally, search for an extension by using the search box or use one of the filters. For example, to filter by extension category.

1. Select an extension to view its details, such as its description, publisher, install count, user rating, and more.

## Install a {% data variables.product.prodname_vscode_shortname %} extension

You can install an extension directly from the Extensions view in {% data variables.product.prodname_vscode_shortname %}. Alternatively, you can install an extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) website.

1. Open the Extensions view (`kb(workbench.view.extensions)`).
1. Select the **Install** button on the extension's tile.

    ![Screenshot of the Extensions view, highlighting the install button.](images/extensions/todo-extension-install.png)

1. You can also select the **Install** button on the extension's details view.

> [!TIP]
> If you have to switch between different technology stacks, use [{% data variables.product.prodname_vscode_shortname %} profiles](/docs/configure/profiles.md) to only install the extensions you need for a given workload. For example, you can install extensions for web development in one profile and extensions for data science in another profile.

## Open extension settings

Extensions can also contribute settings to {% data variables.product.prodname_vscode_shortname %}. Use the [Settings editor](/docs/getstarted/personalize-vscode.md#configure-settings) to view and modify these settings like you would for other settings in {% data variables.product.prodname_vscode_shortname %}.

1. Open the Settings editor via the **File** > **Preferences** > **Settings** menu or use the `kb(workbench.action.openSettings)` keyboard shortcut.
1. In the settings tree view, select **Extensions**, and then select the specific extension to see its settings.

    ![Screenshot of the Settings view, showing the settings of the GitHub Pull Requests extension, highlighting the Extensions entry in the tree view.](images/extensions/settings-view-extension-settings.png)

## Uninstall a {% data variables.product.prodname_vscode_shortname %} extension

You can uninstall an extension from the Extensions view in {% data variables.product.prodname_vscode_shortname %}. If you want to temporarily disable an extension, you might choose to disable the extension instead of uninstalling it.

1. Open the Extensions view (`kb(workbench.view.extensions)`).
1. Select the gear icon or right-click on the extension's tile, and then select **Uninstall**.

## Next steps

* [Extension Marketplace](/docs/configure/extensions/extension-marketplace.md): learn more about recommended extensions, pre-release extensions, or installing extensions from the command-line.
* [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md): learn more about how {% data variables.product.prodname_vscode_shortname %} protects you from malicious extensions.
* [{% data variables.product.prodname_vscode_shortname %} extension development](/api/get-started/your-first-extension.md): create and publish your own extension for {% data variables.product.prodname_vscode_shortname %}.
* [{% data variables.product.prodname_vscode_shortname %} Quickstart](/docs/editing/getting-started.md): discover the key features of {% data variables.product.prodname_vscode_shortname %} with a step-by-step guide.
* [Version control](/docs/sourcecontrol/overview.md): learn how to set up version control with Git in {% data variables.product.prodname_vscode_shortname %}.
* [Debugging](/docs/debugtest/debugging.md): configure debugging for your project.
