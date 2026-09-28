---
ContentId: 319916C4-93F2-471F-B448-FD416736C40C
DateApproved: 9/16/2026
MetaDescription: Find, install, update, and manage {% data variables.product.prodname_vscode %} extensions from the Extension Marketplace.
---
# Extension Marketplace

Extensions add languages, debuggers, and tools to {% data variables.product.prodname_vscode %} to support your development workflow. Learn how to find, install, and manage extensions from the [{% data variables.product.prodname_vscode %} Marketplace](https://marketplace.visualstudio.com/VSCode).

## Browse for extensions

You can browse and install extensions from within {% data variables.product.prodname_vscode_shortname %}. Open the Extensions view by selecting the Extensions icon in the **Activity Bar**, or by running the **View: Extensions** command (`kb(workbench.view.extensions)`).

![Screenshot showing the Extensions icon in the Activity Bar.](images/extension-marketplace/extensions-view-icon.png)

The Extensions view shows a list of the most popular {% data variables.product.prodname_vscode_shortname %} extensions on the [{% data variables.product.prodname_vscode_shortname %} Marketplace](https://marketplace.visualstudio.com/VSCode).

![Screenshot showing popular extensions listed in the Extensions view.](images/extension-marketplace/extensions-popular.png)

Each extension in the list includes a brief description, the publisher, the download count, and a five star rating. Select an extension item to display its details page, where you can learn more.

> [!NOTE]
> If your computer's Internet access goes through a proxy server, you need to configure the proxy server. See [Proxy server support](/docs/setup/network.md#proxy-server-support) for details.

### Search for an extension

Clear the Search box at the top of the Extensions view and type the name of the extension, tool, or programming language you're looking for.

For example, typing 'python' brings up a list of Python language extensions:

![Screenshot showing Python extensions listed after searching for python in the Extensions view.](images/extension-marketplace/extensions-python.png)

If you know the exact identifier for an extension you're looking for, you can use the `@id:` prefix, for example `@id:vue.volar`. You can also narrow or order the results with the [filter](#extensions-view-filters) and [sort](#sorting) commands.

### Extension details

On the extension details page, you can read the extension's README and review the extension's:

* **Feature Contributions** - The extension's additions to {% data variables.product.prodname_vscode_shortname %} such as settings, commands and keyboard shortcuts, language grammars, and debuggers.
* **Changelog** - The extension repository CHANGELOG if available.
* **Dependencies** - Lists if the extension depends on any other extensions.

![Screenshot showing an extension's feature contributions on its details page.](images/extension-marketplace/extension-contributions.png)

If an extension is an Extension Pack, the **Extension Pack** section displays which extensions are installed when you install the pack. [Extension Packs](/api/references/extension-manifest.md#extension-packs) bundle separate extensions together so they can be easily installed at one time.

![Screenshot showing the extensions bundled in the Azure Tools extension pack.](images/extension-marketplace/extension-pack.png)

## Install an extension

To install an extension, select the **Install** button. After the installation completes, the **Install** button changes to the **Manage** gear button.

> [!IMPORTANT]
> Extensions have the same permissions as {% data variables.product.prodname_vscode_shortname %} itself. As of {% data variables.product.prodname_vscode_shortname %} release 1.97, when you first install an extension from a third-party publisher, {% data variables.product.prodname_vscode_shortname %} shows a dialog prompting you to confirm that you trust the extension publisher. Get more information about [extension runtime security](/docs/configure/extensions/extension-runtime-security.md) and how to protect yourself from malicious extensions.

If you want to install a specific version of an extension, right-click the extension and select **Install Another Version**. You can then select a version from the available list.

When [Settings Sync](/docs/configure/settings-sync.md) is enabled, you can share your {% data variables.product.prodname_vscode_shortname %} configurations, such as extensions, across your machines. To install an extension and not sync it across your machines, right-click the extension and select **Install (Do not Sync)**.

### Find and install an extension

For example, install the popular [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) extension. This extension highlights text like 'TODO:' and 'FIXME:' in your source code so you can quickly find undone sections.

![Screenshot showing the TODO Highlight extension highlighting TODO comments in the editor.](images/extension-marketplace/todo-highlighting.png)

In the Extensions view (`kb(workbench.view.extensions)`), type 'todo' in the search box to filter the Marketplace offerings to extensions with 'todo' in the title or metadata. The **TODO Highlight** extension appears in the list.

![Screenshot showing search results for todo in the Extensions view.](images/extension-marketplace/search-for-todo-extension.png)

An extension is uniquely identified by its publisher and extension IDs. Selecting the **TODO Highlight** extension opens the Extension details page, where you can find the extension ID, in this case, `wayou.vscode-todo-highlight`. Knowing the extension ID can be helpful if there are several similarly named extensions.

![Screenshot showing the TODO Highlight extension details page with the extension ID highlighted.](images/extension-marketplace/todo-highlight-details.png)

Select the **Install** button, and {% data variables.product.prodname_vscode_shortname %} downloads and installs the extension from the Marketplace. After the installation completes, the **Install** button is replaced with a **Manage** gear button.

![Screenshot showing the Manage gear button after an extension installs.](images/extension-marketplace/manage-button.png)

To see the TODO Highlight extension in action, open any source code file and add the text 'TODO:'. The editor highlights the text.

The TODO Highlight extension contributes the commands, **TODO-Highlight: List highlighted annotations** and **TODO-Highlight: Toggle highlight**, that you can find in the Command Palette (`kb(workbench.action.showCommands)`). The **TODO-Highlight: Toggle highlight** command lets you quickly disable or enable highlighting.

![Screenshot showing the TODO Highlight commands in the Command Palette.](images/extension-marketplace/todo-highlight-commands.png)

The extension also provides settings for tuning its behavior, which you can find in the Settings editor (`kb(workbench.action.openSettings)`). For example, you might want the text search to be case insensitive and you can uncheck the **Todohighlight: Is Case Sensitive** setting.

![Screenshot showing the TODO Highlight settings in the Settings editor.](images/extension-marketplace/todo-highlight-settings.png)

If an extension doesn't provide the functionality you want, you can always **Uninstall** the extension from the **Manage** button context menu.

![Screenshot showing the Uninstall option for the TODO Highlight extension.](images/extension-marketplace/todo-highlight-uninstall.png)

This walkthrough shows one example of how to install and use an extension. The {% data variables.product.prodname_vscode_shortname %} Marketplace has thousands of extensions supporting hundreds of programming languages and tasks. Options range from full featured language support for [Java](https://marketplace.visualstudio.com/items?itemName=redhat.java), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go), and [C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools), to simple extensions that [create GUIDs](https://marketplace.visualstudio.com/items?itemName=nwallace.createGUID), change the [color theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme), or add [virtual pets](https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets) to the editor.

### Install a pre-release extension version

An extension publisher might provide a pre-release version of an extension. To install a pre-release version, select the dropdown on the **Install** button and select **Install Pre-Release Version**.

![Screenshot showing the Install Pre-Release Version option in the Install button dropdown.](images/extension-marketplace/extensions-install-prerelease.png)

### Install from a VSIX

You can manually install a {% data variables.product.prodname_vscode_shortname %} extension packaged in a `.vsix` file. Select **Install from VSIX** in the Extensions view command dropdown, or run **Extensions: Install from VSIX** in the **Command Palette**, and choose the `.vsix` file.

You can also install using the {% data variables.product.prodname_vscode_shortname %} `--install-extension` command-line switch providing the path to the `.vsix` file.

```bash
code --install-extension myextension.vsix
```

You can provide `--install-extension` multiple times on the command line to install multiple extensions at once.

> [!NOTE]
> When you install an extension via VSIX, [auto update](#extension-auto-update) for that extension is disabled by default.

If you'd like to learn more about packaging and publishing extensions, see our [Publishing Extensions](/api/working-with-extensions/publishing-extension.md) article in the Extension API.

## Manage extensions

{% data variables.product.prodname_vscode_shortname %} makes it easy to manage your extensions. You can install, disable, update, and uninstall extensions through the Extensions view, the **Command Palette** (commands have the **Extensions:** prefix) or command-line switches.

### List installed extensions

By default, the Extensions view shows the extensions you currently have installed, and all extensions that are recommended for you. You can use the **Extensions: Focus on Installed View** command, available in the **Command Palette** (`kb(workbench.action.showCommands)`) or in the **More Actions** (`...`) dropdown menu > **Views** > **Installed**, to clear any text in the search box and show the list of all installed extensions, which includes those that have been disabled.

### Uninstall an extension

To uninstall an extension, select the **Manage** gear button at the right of an extension entry and then choose **Uninstall** from the dropdown menu. This uninstalls the extension and prompts you to restart the extension host (**Restart Extensions**).

![Screenshot showing the option to uninstall an extension from the Manage gear button menu.](images/extension-marketplace/uninstall-extension.png)

### Disable an extension

If you don't want to permanently remove an extension, you can instead temporarily disable the extension by selecting the gear button at the right of an extension entry. You can disable an extension globally or only for your current Workspace. You're prompted to restart the extension host (**Restart Extensions**) after you disable an extension.

If you want to quickly disable all installed extensions, there is a **Disable All Installed Extensions** command in the **Command Palette** and **More Actions** (`...`) dropdown menu.

Extensions remain disabled for all {% data variables.product.prodname_vscode_shortname %} sessions until you re-enable them.

### Enable an extension

If you have disabled an extension, it's in the **Disabled** section of the list and marked ***Disabled***. You can re-enable it with the **Enable** or **Enable (Workspace)** commands in the dropdown menu.

![Screenshot showing the option to enable a disabled extension.](images/extension-marketplace/enable-extension.png)

There is also an **Enable All Extensions** command in the **More Actions** (`...`) dropdown menu.

### Extension auto-update

{% data variables.product.prodname_vscode_shortname %} checks for extension updates and installs them automatically. After an update, you are prompted to restart the extension host (**Restart Extensions**).

If you'd rather update your extensions manually, you can disable auto-update with the **Disable Auto Update for Extensions** command or the corresponding action in the Extensions view. You can also configure the `setting(extensions.autoUpdate)` setting. Use the **Enable Auto Update for Extensions** command to re-enable auto update.

When auto-update is enabled, {% data variables.product.prodname_vscode_shortname %} updates only enabled extensions. Disabled extensions are not updated automatically and update the next time you enable them.

![Screenshot of the Extensions context menu with the Disable Auto Update for Extensions action.](images/extension-marketplace/disable-auto-update-all-extensions-v2.png)

You can also configure auto update for individual extensions by right-clicking on an extension and toggling the **Auto Update** item.

By default, {% data variables.product.prodname_vscode_shortname %} waits a short time after an update is published before it installs the update automatically. Use the `setting(extensions.autoUpdateDelay)` setting to configure the delay, in hours. The default value is `12` hours. Set the value to `0` to install updates as soon as they are published. This delay only applies when auto-update is `on`. To update an extension immediately, select the **Update** button for the extension, which bypasses the delay.

If you don't want {% data variables.product.prodname_vscode_shortname %} to even check for updates, you can set the `setting(extensions.autoCheckUpdates)` setting to false.

> [!NOTE]
> Administrators can centrally manage the `setting(extensions.autoUpdate)` and `setting(extensions.autoUpdateDelay)` settings with [enterprise policies](/docs/enterprise/policies.md).

### Update an extension manually

If you have extensions auto-update disabled, you can quickly look for extension updates by using the **Show Extension Updates** command, which uses the `@updates` filter. This displays any available updates for your currently installed extensions.

Select the **Update** button for the outdated extension. The update installs, and you're prompted to restart the extension host (**Restart Extensions**). You can also update all your outdated extensions at one time with the **Update All Extensions** command.

If you also have automatic checking for updates disabled, you can use the **Check for Extension Updates** command to check which of your extensions can be updated.

## Extensions view filters

The Extensions view search box supports filters to help you find and manage extensions. You might have seen filters such as `@installed` and `@recommended` if you used the **Show Installed Extensions** and **Show Recommended Extensions** commands. Filters also let you sort by popularity or rating, and search by category (for example 'Linters') and tag (for example 'node'). Type `@` in the extensions search box and follow the suggestions to see a complete listing of all filters and sort commands.

![Screenshot showing IntelliSense suggestions for extension search filters.](images/extension-marketplace/extension-search-filters.png)

You can also open the filter list from the **Filter Extensions** context menu.

![Screenshot showing the Filter Extensions context menu in the Extensions view.](images/extension-marketplace/extensions-view-filter-menu.png)

Here are some of the Extensions view filters:

* `@builtin` - Show extensions that come with {% data variables.product.prodname_vscode_shortname %}. Grouped by type (Programming Languages, Themes, and so on).
* `@deprecated` - Show deprecated extensions.
* `@disabled` - Show disabled installed extensions.
* `@enabled` - Show enabled installed extensions. Extensions can be individually enabled or disabled.
* `@featured` - Show featured extensions.
* `@installed` - Show installed extensions.
* `@popular` - Show popular extensions.
* `@recentlyPublished` - Show extensions that were recently published in the Marketplace.
* `@recommended` - Show recommended extensions. Grouped as Workspace specific or general use.
* `@updates` - Show outdated installed extensions. A newer version is available on the Marketplace.
* `@workspaceUnsupported` - Show extensions that are not supported for this workspace.
* `@category` - Show extensions belonging to a specified category. For a complete list, type `@category` and follow the options in the suggestion list. A few supported categories:
  * `@category:themes`
  * `@category:formatters`
  * `@category:linters`
  * `@category:snippets`

You can combine filters. For example, use `@installed @category:themes` to view all installed themes.

If no filter is provided, the Extensions view displays the currently installed and recommended extensions.

You can run additional Extensions view commands via the `...` **View and More Actions** button.

![Screenshot showing the View and More Actions button in the Extensions view.](images/extension-marketplace/more-button.png)

Through this menu, you can control extension updates, enable or disable all extensions, and use the [Extension Bisect](https://code.visualstudio.com/blogs/2021/02/16/extension-bisect) utility to isolate problematic extension behavior.

### Sorting

You can sort extensions with the `@sort` filter, which can take the following values:

* `installs` - Sort by Marketplace installation count, in descending order.
* `name` - Sort alphabetically by extension name.
* `publishedDate` - Sort by extension published date.
* `rating` - Sort by Marketplace rating (1-5 stars), in descending order.
* `updateDate` - Sort by extension last update date.

![Screenshot showing extensions sorted by install count.](images/extension-marketplace/sort-install-count.png)

### Categories and tags

Extensions can set **Categories** and **Tags** that describe their features.

![Screenshot showing extension categories and tags on an extension details page.](images/extension-marketplace/categories-and-tags.png)

You can filter on category and tag by using `category:` and `tag:`.

Supported categories are: `[AI, Azure, Chat, Data Science, Debuggers, Extension Packs, Education, Formatters, Keymaps, Language Packs, Linters, Machine Learning, Notebooks, Programming Languages, SCM Providers, Snippets, Testing, Themes, Visualization, Other]`. IntelliSense in the extensions search box provides these categories.

![Screenshot showing extension category suggestions for debuggers in the Extensions view.](images/extension-marketplace/extension-search-categories.png)

Surround the category name in quotes if it's more than one word, for example `category:"SCM Providers"`.

Tags can contain any string and aren't provided by IntelliSense, so review the Marketplace to find helpful tags.

## Recommended extensions

You can see a list of recommended extensions using **Show Recommended Extensions**, which sets the `@recommended` [filter](#extensions-view-filters). Extension recommendations can either be:

* **Workspace Recommendations** - Recommended by other users of your current workspace.
* **Other Recommendations** - Recommended based on recently opened files.

See [Workspace recommended extensions](#workspace-recommended-extensions) to learn how to contribute recommendations for other users in your project.

### Ignoring recommendations

To dismiss a recommendation, select the extension item to open the Details page and then select the **Manage** gear button to display the context menu. Select the **Ignore Recommendation** menu item. Ignored recommendations are no longer recommended to you.

![Screenshot showing the option to ignore an extension recommendation.](images/extension-marketplace/ignore-recommendation.png)

### Workspace recommended extensions

A good set of extensions can make working with a particular workspace or programming language more productive, and you might want to share this list with your team or colleagues. You can create a recommended list of extensions for a workspace with the **Extensions: Configure Recommended Extensions (Workspace Folder)** command.

In a single folder workspace, the command creates an `extensions.json` file located in the workspace `.vscode` folder where you can add a list of extension identifiers in the form `publisher.extension`.

In a [multi-root workspace](/docs/editing/workspaces/multi-root-workspaces.md), the command opens your `.code-workspace` file where you can list extensions under `extensions.recommendations`. You can still add extension recommendations to individual folders in a multi-root workspace by using the **Extensions: Configure Recommended Extensions (Workspace Folder)** command.

For example, an `extensions.json` file can contain:

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
    ]
}
```

This example recommends a linter extension and a code formatter extension.

An extension is identified using its publisher identifier and extension identifier `publisher.extension`. You can see the name on the extension's detail page. {% data variables.product.prodname_vscode_shortname %} provides auto-completion for installed extensions inside these files.

{% data variables.product.prodname_vscode_shortname %} prompts a user to install the recommended extensions when a workspace is opened for the first time. The user can also review the list with the **Extensions: Show Recommended Extensions** command.

![Screenshot showing the prompt to install workspace-recommended extensions.](images/extension-marketplace/recommendations.png)

## Configuring extensions

{% data variables.product.prodname_vscode_shortname %} extensions might have very different configurations and requirements. Some extensions contribute [settings](/docs/configure/settings.md) to {% data variables.product.prodname_vscode_shortname %}, which can be modified in the Settings editor. Other extensions might have their own configuration files. Extensions might also require installation and setup of additional components like compilers, debuggers, and command-line tools. Consult the extension's README (visible in the Extensions view details page) or go to the extension page on the [{% data variables.product.prodname_vscode_shortname %} Marketplace](https://marketplace.visualstudio.com/VSCode) by selecting the extension name in the details page. Many extensions are open source and have a link to their repository on their Marketplace page.

## Command line extension management

To make it easier to automate and configure {% data variables.product.prodname_vscode_shortname %}, it is possible to list, install, and uninstall extensions from the [command line](/docs/configure/command-line.md). When identifying an extension, provide the full name of the form `publisher.extension`, for example `ms-python.python`.

For example, use these commands:

* `code --list-extensions`: List installed extensions.
* `code --list-extensions --show-versions`: Include the version of each installed extension.
* `code --install-extension ms-python.python`: Install an extension by its ID.
* `code --uninstall-extension ms-python.python`: Uninstall an extension by its ID.
* `code --extensions-dir <directory>`: Set the root path for extensions.

You can see the extension ID on the extension details page under the Marketplace Info.

![Screenshot showing the extension identifier on the extension details page.](images/extension-marketplace/extension-identifier.png)

## Common questions

### Where are extensions installed?

Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

* **Windows** `%USERPROFILE%\.vscode\extensions`
* **macOS** `~/.vscode/extensions`
* **Linux** `~/.vscode/extensions`

You can change the location by launching {% data variables.product.prodname_vscode_shortname %} with the `--extensions-dir <dir>` command-line [option](/docs/configure/command-line.md).

Alternatively, you can set the `VSCODE_EXTENSIONS` environment variable to a location where you want to install extensions. This is useful in an enterprise environment where you want to centrally manage where extensions are installed on user machines.

### Whenever I try to install any extension, I get a connect ETIMEDOUT error

You might see this error if your machine is going through a proxy server to access the Internet. See the [Proxy server support](/docs/setup/network.md#proxy-server-support) section in the setup topic for details.

### Can I download an extension directly from the Marketplace?

Some users prefer to download an extension once from the Marketplace and then install it to multiple {% data variables.product.prodname_vscode_shortname %} instances from a local share. This is useful when there are connectivity concerns or if your development team wants to use a fixed set of extensions.

To download an extension, search for it in the Extensions view, right-click an extension from the results, and select **Download VSIX** or **Download Specific Version VSIX**.

### Can I stop {% data variables.product.prodname_vscode_shortname %} from providing extension recommendations?

To hide the **Recommended** view, open the Extensions view **More Actions** (`...`) menu and turn off **Recommended** under **Views**. To stop recommendation notifications, set `setting(extensions.ignoreRecommendations)` to `true`.

You can still use the **Show Recommended Extensions** command to see recommendations.

### Can I trust extensions from the Marketplace?

The {% data variables.product.prodname_vs_marketplace} employs several measures to protect you from malicious extensions and you can also perform various steps to determine if an extension is reliable before installing it. See [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md) to learn how {% data variables.product.prodname_vscode_shortname %} confirms that you trust an extension's publisher before installing it and how to protect yourself from malicious extensions.

### Can I host extensions internally for my organization?

Yes, see the [Private Marketplace for Extensions](/docs/enterprise/extensions.md#host-a-private-extension-marketplace).

### The extension signature cannot be verified by {% data variables.product.prodname_vscode_shortname %}

The {% data variables.product.prodname_vs_marketplace %} signs all extensions when they are published. {% data variables.product.prodname_vscode_shortname %} verifies this signature when you install an extension to check the integrity and the source of the extension package.

> [!IMPORTANT]
> When you install an extension, you might see the following error message: `Cannot install extension because {% data variables.product.prodname_vscode %} cannot verify the extension signature`. This error can have a variety of causes. If you encounter this error, exercise caution before deciding to install anyway. Disable extension signature verification with the `setting(extensions.verifySignature)` setting.

#### Package integrity issues

For package integrity issues, contact the [{% data variables.product.prodname_vs_marketplace %} team](mailto:vsmarketplace@microsoft.com?subject=Extension%20Signature%20Verification%20Issue) to report the issue. Make sure to include the extension ID. The following list provides error codes related to package integrity issues:

```text
PackageIntegrityCheckFailed
SignatureIsInvalid
SignatureManifestIsInvalid
SignatureIntegrityCheckFailed
EntryIsMissing
EntryIsTampered
Untrusted
CertificateRevoked
SignatureIsNotValid
SignatureArchiveHasTooManyEntries
NotSigned
```

#### Other issues

For other issues like an unsupported environment or unknown reasons, [report an issue](https://github.com/microsoft/vscode/issues/new) with {% data variables.product.prodname_vscode_shortname %} by providing all necessary information and including the shared log: `kb(workbench.action.showCommands)` > **Open View...** > **Shared**.

### My extensions don't synchronize when connected to a remote window

[Settings Sync](/docs/configure/settings-sync.md) lets you share your {% data variables.product.prodname_vscode %} configurations such as settings, keyboard shortcuts, and installed extensions across your machines so you are always working with your favorite setup.

{% data variables.product.prodname_vscode_shortname %} does not synchronize your extensions to or from a [remote](/docs/remote/remote-overview.md) window, such as when you're connected to SSH, a development container (devcontainer), or WSL.

### Can I allow or block specific extensions in my organization?

You can control which extensions can be installed in your organization by configuring the `extensions.allowed` application setting. If the setting is not configured, all extensions are allowed. If the setting is configured, all extensions not listed are blocked from installing.

Get more details about [configuring allowed extensions](/docs/enterprise/extensions.md#configure-allowed-extensions).

## Next steps

* [{% data variables.product.prodname_vscode_shortname %} profiles](/docs/configure/profiles.md): use different sets of extensions for different projects or workflows.
* [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md): learn how to assess an extension before installing it.
* [Your first extension](/api/get-started/your-first-extension.md): create an extension if the Marketplace doesn't have what you need.
