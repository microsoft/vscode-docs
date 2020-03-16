---
Order: 11
Area: editor
TOCTitle: Settings Sync
ContentId: 6cb84e60-6d90-4137-83f6-bdab3438b8f5
PageTitle: Settings Sync in Visual Studio Code
DateApproved: 3/9/2020
MetaDescription: Synchronize your user settings across all your Visual Studio Code instances.
---
# Settings Sync

>**Note**: Settings Sync is still in Preview and only available on VS Code [Insiders](/insiders).

## Enabling Settings Sync

Turn on Settings Sync using the **Turn On Sync** entry in the **Manage** gear menu at the bottom of the Activity Bar. You will be asked to sign in and what preferences you would like to sync; currently Settings, Keyboard Shortcuts, Extensions, and Display Language are supported.

![Turn on Sync command](images/settings-sync/turn-on-sync.png)

After making this selection, the browser will open so that you can sign in to a Microsoft account. Both personal accounts, such as Outlook accounts, and Azure accounts can be used. You can also sign in with GitHub. If at any time you decide you want to sync your data to a different account, you can use the **Microsoft Account: Sign Out** command from the Command Palette (`kb(workbench.action.showCommands)`), and then use the **Sync: Sign in to sync** entry from the **Manage** gear menu.

## Configuring synced data

Which preferences get shared is configured when you turn on Settings Sync for the first time via this dialog:

![Settings Sync configure dialog](images/settings-sync/sync-configure.png)

Once signed in, you can change what is synced via the **Sync: Configure** command or by opening the **Manage** gear menu, selecting **Sync is on**, and then **Sync: Configure**.

Machine settings (with `machine` or `machine-overridable` [scopes](updates/v1_34.md#machinespecific-settings)) are not synchronized by default, since their values are specific to a given machine. You can also add or remove settings you want to this list from the Settings editor or using the setting `sync.ignoredSettings`.

Keyboard Shortcuts are synchronized per platform by default. If your keyboard shortcuts are platform-agnostic, you can synchronize them across platforms by disabling the setting `sync.keybindingsPerPlatform`.

All built-in and installed extensions are synchronized along with their global enablement state. You can skip synchronizing an extension, either from the Extensions view (`kb(workbench.view.extensions)`) or using the setting `sync.ignoredExtensions`.

## Conflicts

When synchronizing settings between multiple machines, there may occasionally be conflicts. Conflicts can happen when first setting up sync between machines or when settings change while a machine is offline. When conflicts occur, you will be presented with the following options:

- **Accept Local**: Selecting this option will overwrite **remote** settings in the cloud with your local settings.
- **Accept Remote**: Selecting this option will overwrite **local** settings with remote settings from the cloud.
- **Show Conflicts**: Selecting this will display a diff editor similar to the Source Control diff editor, where you can preview the local and remote settings and choose to either accept local or remote or manually resolve the changes in your local settings file and then accept the local file.

## Restoring data

In case something goes wrong, VS Code always stores local backups of your preferences, which can be accessed via the **Sync: Open Local Backups Folder** command. The folder is organized by the type of preference and contains versions of your JSON files named with a timestamp of when the backup occurred. These backups are automatically deleted after 30 days.

## Reporting issues

Settings Sync activity can be monitored in the **Log (Sync)** output view. If you experience a problem with Settings Sync, please include this log when creating the issue. If your problem is related to authentication, also include the log from the **Account** output view.

## How do I delete my data?

If you want to remove all your data from our servers, just turn off sync via the **Manage** gear menu and select the checkbox to clear all cloud data. If you choose to re-enable sync, it will be as if you're signing in for the first time.

## Next steps

* [User and Workspace settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through user and workspace settings.

## Common questions

### Can I access history of remote preferences?

Currently not, but [this is planned](https://github.com/microsoft/vscode/issues/85619) before the feature leaves preview.
