---
ContentId: 6cb84e60-6d90-4137-83f6-bdab3438b8f5
DateApproved: 9/16/2026
MetaDescription: Sync settings and preferences across devices with {% data variables.product.prodname_vscode %} {% data variables.product.prodname_settings_sync %}.
---
# {% data variables.product.prodname_settings_sync %}

{% data variables.product.prodname_settings_sync %} keeps your {% data variables.product.prodname_vscode %} preferences consistent across devices. Use this article to turn on synchronization, choose which data to sync, restore or delete synced data, and troubleshoot synchronization and credential-storage issues.

## Turn on {% data variables.product.prodname_settings_sync %}

To turn on {% data variables.product.prodname_settings_sync %}, follow these steps:

1. Select **Backup and Sync Settings...** from the **Manage** gear menu or the **Accounts** menu at the bottom of the Activity Bar.

    ![Screenshot showing the Manage menu with the Backup and Sync Settings command highlighted.](images/settings-sync/turn-on-sync.png)

1. Select the data that you want to synchronize.

    ![Screenshot showing the Settings Sync configuration picker with data categories selected.](images/settings-sync/sync-configure-2.png)

1. Select **Sign in**, and then select a Microsoft or GitHub account.

    ![Screenshot showing the Settings Sync account picker with Microsoft and GitHub options.](images/settings-sync/sync-accounts.png)

1. If you are not already signed in with the selected account, complete the authentication flow in the browser.

After you sign in, {% data variables.product.prodname_settings_sync %} automatically merges your local and cloud data and continues to synchronize changes in the background. If it cannot merge the data, you are prompted to [resolve the conflicts](#resolve-conflicts).

## Configure synced data

Run the **Settings Sync: Configure...** command or select **Settings Sync is On** > **Settings Sync: Configure...** from the **Manage** gear menu. Choose from the following data categories:

| Data category | Synchronized data and behavior |
|---------------|--------------------------------|
| Settings | [User settings](/docs/configure/settings.md), except settings with the `machine` or `machine-overridable` scope and settings that you exclude. |
| Keyboard Shortcuts | User-defined keyboard shortcuts. Shortcuts are synchronized separately for each operating system by default. |
| Snippets | [User snippets](/docs/editing/userdefinedsnippets.md). |
| Tasks | [User-level tasks](/docs/debugtest/tasks.md#user-level-tasks). Workspace tasks are not synchronized. |
| MCP Servers | [MCP server configurations](/docs/agent-customization/mcp-servers.md#synchronize-mcp-configuration-across-devices). |
| UI State | Display language, Activity Bar and Panel entries, view layout and visibility, recently used commands, and 'Do not show again' notification choices. |
| Extensions | Installed extensions and the global enablement state of built-in and installed extensions. |
| Profiles | [Profiles](/docs/configure/profiles.md) and their data for the selected categories. You can synchronize up to 20 profiles. |
| Prompts and Instructions | [User prompt files](/docs/agent-customization/prompt-files.md#sync-user-prompt-files-across-devices) and [Local agent instructions](/docs/agent-customization/custom-instructions.md#sync-local-agent-instructions-across-devices) that are stored in your user profile. |

> [!NOTE]
> {% data variables.product.prodname_vscode_shortname %} does not synchronize your extensions to or from a [remote](/docs/remote/remote-overview.md) window, such as when you're connected to SSH, a development container (devcontainer), or WSL.

### Exclude settings and extensions

To exclude a user setting from synchronization, use the setting's actions in the Settings editor or add the setting to the `setting(settingsSync.ignoredSettings)` setting.

![Screenshot showing ignored settings in the Settings editor.](images/settings-sync/sync-ignored-settings.png)

To exclude an extension, use the extension's actions in the Extensions view (`kb(workbench.view.extensions)`) or add the extension to the `setting(settingsSync.ignoredExtensions)` setting.

![Screenshot showing the context menu action for excluding an extension from synchronization.](images/settings-sync/sync-ignored-extensions.png)

### Use the same keyboard shortcuts across operating systems

To use the same keyboard shortcuts on every operating system, clear the `setting(settingsSync.keybindingsPerPlatform)` setting.

## Resolve conflicts

Conflicts can occur when you first turn on {% data variables.product.prodname_settings_sync %} on a device or when you change data while a device is offline. Synchronization pauses until you resolve the conflicts.

The available actions depend on whether you are turning on sync or resolving a later conflict:

* **Accept Local** or **Replace Remote** uses your local data and overwrites the data in the cloud.
* **Accept Remote** or **Replace Local** uses the data in the cloud and overwrites your local data.
* **Show Conflicts** opens a diff editor where you can compare the local and remote data. Edit the merge result, and then select **Complete Merge**.

## Switch accounts

To synchronize your data with a different account, run the **Settings Sync: Turn Off** command, and then turn on {% data variables.product.prodname_settings_sync %} with the other account.

## Synchronize Stable and Insiders

By default, the {% data variables.product.prodname_vscode_shortname %} Stable and [Insiders](/insiders) builds use separate {% data variables.product.prodname_settings_sync %} services and do not share data. To share data between the builds, select the Stable sync service when you turn on {% data variables.product.prodname_settings_sync %} in {% data variables.product.prodname_vscode_shortname %} Insiders.

![Screenshot showing the sync service options in VS Code Insiders.](images/settings-sync/settings-sync-switch.png)

> [!NOTE]
> Synchronizing Stable and Insiders can cause data incompatibility because Insiders is newer than Stable. If this occurs, {% data variables.product.prodname_settings_sync %} turns off automatically in Stable. Update Stable to a compatible version before you turn on sync again.

## Restore synced data

{% data variables.product.prodname_vscode_shortname %} stores local and remote backups of your preferences. You can use these backups to restore an earlier version of your data.

![Screenshot showing remote backup versions in the Settings Sync view.](images/settings-sync/sync-backup-views.png)

Run the **Settings Sync: Show Synced Data** command to view remote backups. To view local backups in the same view, open the **Views** submenu from the **Settings Sync** view overflow menu, and then select **Sync Activity (Local)**.

![Screenshot showing the Sync Activity (Local) option in the Views submenu.](images/settings-sync/sync-enable-local-activity-view.png)

To access local backups on disk, run the **Settings Sync: Open Local Backups Folder** command. The folder is organized by data category and contains timestamped versions of your JSON files.

> [!NOTE]
> Local backups are deleted after 30 days. For remote backups, the latest 20 versions of each data category are retained.

## Manage synced machines

{% data variables.product.prodname_vscode_shortname %} tracks the devices that synchronize your data. Run the **Settings Sync: Show Synced Data** command, and then expand **Synced Machines** to view them.

Each device has a default name based on its operating system and whether it runs Stable or Insiders. Use the actions for a device to rename it or turn off {% data variables.product.prodname_settings_sync %} remotely.

## Turn off and delete synced data

To stop synchronizing on the current device, select **Settings Sync is On** > **Settings Sync: Turn Off** from the **Manage** gear menu, and then select **Turn off**.

To turn off synchronization on all your devices and remove your data from the service, select the checkbox labeled **Turn off sync on all your devices and clear the data from the cloud.** Then select **Turn off**. If you turn on {% data variables.product.prodname_settings_sync %} again, it starts as a first-time setup.

## Troubleshoot {% data variables.product.prodname_settings_sync %}

### Resolve data limits

Settings, keyboard shortcuts, and user tasks must each be 100 KB or smaller. You can synchronize up to 20 profiles. If your data exceeds a limit, {% data variables.product.prodname_settings_sync %} reports an error and disables an affected category that was already synchronizing. Reduce the file size or number of profiles. Then turn on {% data variables.product.prodname_settings_sync %} again, or run the **Settings Sync: Configure...** command to enable the affected category.

### Troubleshoot credential-store issues

On desktop, {% data variables.product.prodname_settings_sync %} stores authentication information by using the operating system credential store. This section uses *keychain* as a general term for a keychain, keyring, wallet, or credential store.

If the keychain is unavailable or misconfigured, restart {% data variables.product.prodname_vscode_shortname %} with the following options to generate a verbose log:

```bash
code --verbose --vmodule="*/components/os_crypt/*=1"
```

#### Windows and macOS

Windows and macOS usually do not require additional keychain configuration. If the problem continues, [report the issue](#collect-logs-and-report-an-issue) and include the verbose log.

#### Linux

{% data variables.product.prodname_vscode_shortname %} uses Chromium to detect the desktop environment and select a keyring. Search the verbose log for `OSCrypt`, `password storage`, or `selected backend` messages to identify the selected keyring.

##### GNOME or Unity

If the log contains `Cannot create an item in a locked collection`, unlock the default keyring, which is usually named `Login`. You can use a keyring manager such as [Seahorse](https://wiki.gnome.org/Apps/Seahorse). The keyring must be unlocked when you sign in to the operating system.

##### KDE

Open [KWalletManager](https://apps.kde.org/kwalletmanager5/) and make sure that the default `kdewallet` wallet is open. If {% data variables.product.prodname_vscode_shortname %} cannot connect to KWallet, try a keyring that implements the Secret Service API, as described in the next section.

##### Configure a keyring backend

To select a keyring backend manually, start {% data variables.product.prodname_vscode_shortname %} with the `password-store` option. For example, install a keyring that implements the [Secret Service API](https://specifications.freedesktop.org/secret-service/latest/), and then run:

```bash
code --password-store="gnome-libsecret"
```

If the selected backend works, run **Preferences: Configure Runtime Arguments** from the Command Palette (`kb(workbench.action.showCommands)`) and add `"password-store": "gnome-libsecret"` to the `argv.json` file.

The `password-store` option supports these values:

* `kwallet5` for KWallet 5.
* `gnome-libsecret` for keyrings that implement the Secret Service API, such as GNOME Keyring, KWallet, and KeePassXC.
* `kwallet` for older KWallet versions.
* `basic` for basic text encryption. This option is not recommended.

If the desktop environment or keyring is not detected, [report the issue](#collect-logs-and-report-an-issue) and include the verbose log.

##### Configure basic text encryption

> [!WARNING]
> Basic text encryption uses a key derived from a value hardcoded in Chromium. It provides obfuscation rather than secure encryption, and processes on your system might be able to decrypt the stored data.

If you accept this risk, run **Preferences: Configure Runtime Arguments** from the Command Palette (`kb(workbench.action.showCommands)`) and add `"password-store": "basic"` to the `argv.json` file.

### Collect logs and report an issue

{% data variables.product.prodname_settings_sync %} activity is recorded in the **Log (Settings Sync)** output channel. Authentication activity is recorded in the **Account** output channel.

When you [report an issue](https://github.com/microsoft/vscode/issues/new/choose), include the relevant output channels. For credential-store problems, also include the verbose log from the previous section.

## Common questions

### Is {% data variables.product.prodname_settings_sync %} the same as the Settings Sync extension?

No. The [Settings Sync extension](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) by [Shan Khan](https://marketplace.visualstudio.com/publishers/Shan) uses a private GitHub Gist to share settings. It is unrelated to the built-in {% data variables.product.prodname_settings_sync %} feature.

### What accounts can I use?

{% data variables.product.prodname_settings_sync %} supports Microsoft and GitHub accounts. GitHub Enterprise Server accounts are not supported.

> [!NOTE]
> {% data variables.product.prodname_settings_sync %} does not support [Microsoft Sovereign Cloud](https://www.microsoft.com/en-us/industry/sovereignty/cloud) accounts.

### Can I use a different backend or service?

No. {% data variables.product.prodname_settings_sync %} uses a dedicated service to store data and coordinate updates. Custom backends are not supported.

## Related resources

* [Configure user and workspace settings](/docs/configure/settings.md)
* [Create and manage profiles](/docs/configure/profiles.md)
* [Synchronize extension global state](/api/extension-capabilities/common-capabilities.md#data-storage)
