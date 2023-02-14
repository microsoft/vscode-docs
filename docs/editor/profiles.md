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

You can also access the Profile command memu via the **Manage** gear button in the lower right of the Activity bar.

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

* Settings
* Extensions
* UI state
* Keybindings
* Snippets
* User Tasks

## Share Profiles

### Export

As GitHub gist or local file

### Import

## Uses for Profiles

### Programming Languages

Per workspace

### Demos

### Education

### Testing

## Command line

launch with an existing profile

launch and create an empty profile

## Common Questions

### Where are profiles kept?

Roaming

### Why is the UI State globalState.json file?

In memory JSON rendering of the profile global state database.

### What is a Temporary Profile?

Non-persisted profile that only lasts for the VS Code session.

### How can I remove the profile from my project?

You can set you project back to the Default Profile. If you'd like to remove all profile workspace associations, you can use the **Developer: Reset Workspace Profile Associations**, which will set all folders currently assigned a profile back to the Default Profile but not delete any existing profiles.

### Do profiles sync across machines (via Settings Sync)?

Or do you need to Export and Import?
