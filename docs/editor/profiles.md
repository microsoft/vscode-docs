---
Order: 15
Area: editor
TOCTitle: Profiles
ContentId: a65efc48-5a2d-4c7d-bd23-03f0393b53f6
PageTitle: Profiles in Visual Studio Code
DateApproved: 2/2/2023
MetaDescription: Expand your development workflow with task integration in Visual Studio Code.
---
# Profiles in Visual Studio Code

Visual Studio Code has 100's of [settings](/docs/getstarted/settings.md), 1000's of [extensions](/docs/editor/extension-marketplace.md), and unnumerable ways to adjust the layout and sizing of the UI to let you customize the editor. Profiles let you create sets of customizations and quickly switch between them or share them with others. This topic explains how to create, modify, export, and import Profiles.

## Create a Profile

VS Code treats your current configuration as the **Default Profile**. As you modify settings, install extensions, or open and close views and panels, these customization are tracked in the Default Profile.

To create a new profile, you can use the **File** > **Preferences** > **Profiles** > **Create Profile** menu item (**Code** > > **Preferences** > **Profiles** > **Create Profile** on macOS).

![Create Profile command](images/profiles/create-profile.png)

You can create a new profile based on the current profile (**Profiles: Create from Current Profiles**) or create an Empty Profile. An Empty Profile includes no user customizations (settings, extensions, snippets, etc.) but with the UI state (view layouts and sizing) preserved.

You can also access the Profile command menu via the **Manage** gear button in the lower right of the Activity bar.

![Create Profile command via the Manage button in the Activity bar](images/profiles/create-profile-via-manage.png)

The **Profiles: Create Profile** commands are also available in the Command Palette (`kb(workbench.action.showCommands)`).

Once you choose whether to create a new profile based on the current profile or an empty profile, you'll be prompted to enter a name for the new profile.

### Check the current profile

The current profile name is displayed in several places in the VS Code UI:

* Title bar
* Manage gear button hover
* **File** > **Preferences** > **Profiles**

If you are still using the Default Profile, no profile name is displayed.

### Rename a profile

You can rename an existing profile via the **Rename** command in the Profiles menu.

### Delete a profile

You can delete a profile via the **Delete Profile** command. The **Delete Profile** drop down lets you select which profile(s) to delete.

### Workspace Associations

When you select create or select an existing profile

## Profile contents

Show Contents brings up the Profiles view

TBD ![alt](https://) that shows the Activity bar icon

A profile can include:

* Settings - Referenced by your user and profile `settings.json` file.
* Extensions - You can remove extensions from the profile by unchecking their entry in the Profiles view.
* UI state - Current opens views and their layout.
* Keybindings
* Snippets
* User Tasks

## Share Profiles

### Export

brings up Profiles view with **Export** button
**Show Contents** always has **Export** button
select which types of customizations to Export
as GitHub gist or local file

`https://vscode.dev/profile/github/57638f9b18434187e355c9eb0afa28f8` GitHub Gist

Marked as **Secret**, only those with the link can see the gist

URL brings up vscode.dev with Profiles view open

cloud button to **Install Extensions** (does all)
**Import Profile** button
**Import Profile in Visual Studio Code** button

https://gist.github.com/username to see your Gists

local file, you get to choose where to place the file

Profile has extension `.code-profile`

### Import

Provide URL for gist or select file for local
Profiles view will show current profile details (with Export) and imported profile (with Import)

## Uses for Profiles

todo@isidorn

### Programming Languages

Per workspace
Also web development (front end versus back end)

### Demos

Simple without extra extensions or customizations
Back to a default layout
Also good for documentation screenshots
Can use larger font size for presenting

### Education

Simplified layout and settings (autosave enabled) and just the extensions needed for a class

### Testing

Set up a specific repro or configuration without modifying your work setup
"Oops" profile to put your setup back to a known state

## Command line

You can launch VS Code with a specific profile via the `--profile` command-line interface option. You pass the name of the profile after the `--profile` argument and open a folder or a workspace using that profile. The command line below opens the `web-sample` folder with the "Web Development" profile:

`code ~/projects/web-sample --profile "Web Development"`

If the profile specified does not exist, a new empty profile with the given name is created.

## Common Questions

### Where are profiles kept?

Profiles are stored under your User configurations similar to your user settings and keybindings.

* **Windows** `%APPDATA%\Code\User\profiles`
* **macOS** `$HOME/Library/Application\ Support/Code/User/profiles`
* **Linux** `$HOME/.config/Code/User/profiles`

If you are using the [Insiders](/insiders) version, the intermediate folder name will be `Code - Insiders`.

### Where is the UI State globalState.json file?

In memory JSON rendering of the profile global state database.

### What is a Temporary Profile?

A Temporary Profile is a profile that is not saved across VS Code sessions. You create a Temporary Profile via the **Profiles: Create a Temporary Profile** command in the Command Palette. The Temporary Profile starts as an Empty Profile and has an automatically generated name (such as **Temp 1**). You can modify the profile settings and extensions, use the profile for the lifetime of your VS Code session, but it will be deleted once you close VS Code.

Temporary Profiles are useful if you want to try a new configuration or test an extension without modifying your default or existing profiles. Restarting VS Code will reenable the current profile for your workspace.

### How can I remove the profile from my project?

You can set you project back to the Default Profile. If you'd like to remove all profile workspace associations, you can use the **Developer: Reset Workspace Profile Associations**, which will set all folders currently assigned a profile back to the Default Profile but not delete any existing profiles.

### Do profiles sync across machines (via Settings Sync)?

Yes, you can use [Settings Sync](/docs/editor/settings-sync.md) to move your profiles across various machines. With Setting Sync enabled and **Profiles** checked in the **Settings Sync: Configure** drop down, all your created profiles will be available.

![Settings Sync data drop down with Profiles checked](images/profiles/settings-sync-profiles.png)
