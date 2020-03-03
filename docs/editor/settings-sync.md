---
Order: 11
Area: editor
TOCTitle: Settings Sync
ContentId: 6cb84e60-6d90-4137-83f6-bdab3438b8f5
PageTitle: Settings Sync in Visual Studio Code
DateApproved: 2/5/2020
MetaDescription: Synchronize your user settings across all your Visual Studio Code instances.
---
# Settings Sync

>**Note**: Settings Sync is still in Preview and only available on VS Code [Insiders](/insiders).

## To enable Settings Sync

Turn on sync using **Sync: Turn On** entry in the gear menu at the bottom of the activity bar. You will be asked to sign in and what preferences you would like to sync; currently Settings, Keyboard Shortcuts, Extensions, and the Display Language are supported.

After making this selection, the browser will open so that you can login to a Microsoft account. Both personal accounts, such as Outlook accounts, and Azure accounts can be used. If you're signing in to Microsoft for the first time, there is also an option to sign in with GitHub. If at any time you decide you want to sync your data to a different account, you can use the `Microsoft: Sign Out` command from the command palette, and then use the `Sync: Sign in to sync` entry from the gear menu.

## Configuring synced data

What gets synced is configured when you turn on sync for the first time via this dialog:

![Settings sync configure dialog](images/settings-sync/sync-configure.png)

Once signed in you can change what is synced via the `Sync: Configure` command or by clicking the gear menu, selecting "Sync is on" and selecting `Sync: Configure`.

## Conflicts

When synchronizing files between multiple machines it's natural for the occasional conflict to occur. Typically this only happens when first setting up sync or when one machine has changed settings while offline. When conflicts occur you will be presented with the following options:

- Accept Local: Selecting this will overwrite _remote_ settings in the cloud with your local settings
- Accept Remote: Selecting this will overwrite _local_ settings with remote settings from the cloud
- Show Conflicts: Selecting this will display a diff editor similar to a git editor where you can preview the local and remote files and choose to either accept local or remote or manually resolve the changes in your local file then accept the local file

## Restoring data

Just in case something goes wrong, VS Code always stores local backups of your preferences which can be accessed via the `Sync: Open Local Backups Folder`. The folder is organized by the type of preference and contains the json files named with a timestamp of when the backup occurred. These backups are automatically deleted after 30 days.

## Reporting issues

Settings Sync activity can be monitored in the **Log (Sync)** output view. If you experience a problem with settings sync, please include this log when creating the issue. If your problem is authentication related, please include the log from the **Account** output view.

## How do I delete my data?

If you want to remove all your data from our servers just turn off sync via the gear menu and check the checkbox to clear all cloud data. If you choose to re-enable sync after this it will be as if you're signing in for the first time.

## Next steps

* [User and Workspace settings](/docs/getstarted/settings.md) - Learn how to configure VS Code to your preferences through user and workspace settings.

## Common questions

### Can I access history of remote preferences?

Currently not, but [this is planned](https://github.com/microsoft/vscode/issues/85619) to be done before the feature leaves preview.
