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

### Delete a profile

You can delete a profile via the **Delete Profile** command where you can either name the profile to delete or select multiple profiles from the drop down.

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

As GitHub gist or local file

### Import

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

Roaming

### Where is the UI State globalState.json file?

In memory JSON rendering of the profile global state database.

### What is a Temporary Profile?

Non-persisted profile that only lasts for the VS Code session.

### How can I remove the profile from my project?

You can set you project back to the Default Profile. If you'd like to remove all profile workspace associations, you can use the **Developer: Reset Workspace Profile Associations**, which will set all folders currently assigned a profile back to the Default Profile but not delete any existing profiles.

### Do profiles sync across machines (via Settings Sync)?

Or do you need to Export and Import?
