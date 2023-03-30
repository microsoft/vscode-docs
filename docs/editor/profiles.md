---
Order: 15
Area: editor
TOCTitle: Profiles
ContentId: a65efc48-5a2d-4c7d-bd23-03f0393b53f6
PageTitle: Profiles in Visual Studio Code
DateApproved: 3/30/2023
MetaDescription: Expand your development workflow with task integration in Visual Studio Code.
---
# Profiles in Visual Studio Code

Visual Studio Code has hundreds of [settings](/docs/getstarted/settings.md), thousands of [extensions](/docs/editor/extension-marketplace.md), and innumerable ways to adjust the UI layout to customize the editor. VS Code **Profiles** let you create sets of customizations and quickly switch between them or share them with others. This topic explains how to create, modify, export, and import profiles.

## Create a Profile

VS Code treats your current configuration as the **Default Profile**. As you modify settings, install extensions, or change UI layout by moving views, these customizations are tracked in the Default Profile.

To create a new profile, you can use the **File** > **Preferences** > **Profiles** > **Create Profile** menu item (**Code** > **Preferences** > **Profiles** > **Create Profile** on macOS).

![Create Profile command](images/profiles/create-profile.png)

You can create a new profile based on the current profile (**Profiles: Create from Current Profiles**) or create an Empty Profile. An Empty Profile includes no user customizations (settings, extensions, snippets, etc.).

You can also access the Profile command menu via the **Manage** gear button in the lower right of the Activity bar.

![Create Profile command via the Manage button in the Activity bar](images/profiles/create-profile-via-manage.png)

The **Profiles: Create Profile** command is also available in the Command Palette (`kb(workbench.action.showCommands)`).

Once you choose whether to create a new profile based on the current profile or an empty profile, you are prompted to enter a name for the new profile.

### Check the current profile

The current profile name is displayed in several places in the VS Code UI:

* Title bar
* **File** > **Preferences** > **Profiles**
* **Manage** gear button hover

If you are still using the Default Profile, no profile name is displayed.

The **Manage** gear button displays a badge with the first two letters of the active profile so you can quickly check which profile you are running.

![Manage gear displaying "DE' to indicate that the user's 'Demo' profile is active](images/profiles/profile-gear-two-letters.png)

### Edit a profile

You can edit a profile just as you would normally change any VS Code configuration. You can install/uninstall/disable extensions, change settings, and adjust the editor's UI layout (for example, moving and hiding views) like normal. These changes are stored in your currently active profile.

### Workspace associations

When you select create or select an existing profile, it is associated with the current workspace and whenever you open that folder, the workspace's profile is active. If you open another folder, the profile switches to that folder's associated profile if one has been set or remains on the last used profile.

## Managing profiles

### Switch profiles

You can quickly switch between profiles with the **Profiles: Switch Profile** command in the Command Palette, which presents a dropdown listing your available profiles.

You can also switch profiles by selecting a profile from the list displayed in the Profiles menus, available via the **Manage** gear button or **File** > **Preferences** > **Profiles**.

### Rename a profile

You can rename an existing profile via the **Rename** command in the Profiles menu.

### Delete a profile

You can delete a profile via the **Delete Profile** command. The **Delete Profile** drop down lets you select which profile(s) to delete.

## Profile contents

The **Profiles: Show Contents** command (available in the Command Palette or Profiles menus) brings up the Profiles view, where you can review the customizations for the profile.

![Profile view displaying contents of a Doc Work profile](images/profiles/profile-show-contents.png)

A profile can include:

* Settings - In a profile-specific `settings.json` file.
* Extensions - You can remove extensions from the profile by unchecking their entry in the Profiles view.
* UI state - View layout (positions), visible views and actions.
* Keybindings - In a profile-specific `keybindings.json` file.
* Snippets - In a profile-specific `{language}.json` files.
* User Tasks - In a profile-specific `tasks.json` file.

When you create a new profile based on the Default Profile, the profile-specific configuration files are populated from your user configuration files. Workspace-specific settings are not automatically included in a new profile.

## Share Profiles

### Export

You can export a profile in order to save it or share it with others. The **Export Profile** command displays the Profiles view with the contents of the active profile and an **Export** button. You can unselect various elements of the profile such as extensions or configuration files before you export the profile.

When you select **Export**, you are prompted for the profile name and whether you want to export to a [GitHub gist](https://docs.github.com/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists) or your local file system.

#### Save as a GitHub gist

After you save a profile to GitHub (you'll be prompted to log into GitHub), a dialog gives you the option to **Copy Link** so you can share your profile gist URL with others. The URL includes an autogenerated GUID and has the format `https://vscode.dev/profile/github/{GUID}`. The GitHub gist is marked as **Secret**, so only those with the link can see the gist.

If you launch the profile URL, it opens VS Code for the Web (vscode.dev) with the Profiles view open and the imported profile contents displayed. You can unselect profile elements if you wish and you need to manually **Install Extensions** (via the download cloud button) if you want to continue using that profile in vscode.dev.

You also have the option to **Import Profile in Visual Studio Code**, which opens VS Code Desktop with the profile's contents displayed and an **Import Profile** button.

You can review your gists at `https://gist.github.com/{username}`. From your GitHub gist page you can rename, delete, or copy the GUID of a gist.

#### Save as a local file

If you chose to save the profile as a local file, a **Save Profile** dialog lets you place the file on your local machine. A profile is persisted in a file with the extension `.code-profile`.

### Import

To import an existing profile, run the **Import Profiles** command. You are prompted for the URL of a GitHub gist or the file location of a profile via an **Import Profile** dialog. Once you have selected the profile, the Profiles view opens and displays the profile to import. You can unselect some profile elements if you don't want to import them.  Select the **Import Profile** button and you will now be using the imported profile.

## Uses for Profiles

Profiles are a great way to customize VS Code to better fit your needs. In this section, we look at some common use cases for profiles.

Since profiles are remembered per workspace, they are a great way to customize VS Code for a specific programming language. For example, you can create a JavaScript frontend profile that includes the extensions, settings, and customizations you use for JavaScript development in one workspace, and have a Python backend profile that includes the extensions, settings, and customizations you use for Python development in another workspace. Using this approach, you can easily switch between workspaces and always have VS Code configured the right way.

### Demos

When doing a demo, you can use a profile to set up a specific configuration for your demo. For example, you can create a profile with a specific set of extensions and settings like zoom level, font size, and color theme. By doing this, a demo will not mess up your normal VS Code setup and you can customize VS Code for better visibility during your presentation.

### Education

Profiles can be used to customize VS Code for students to ease the use in a classroom setting. Profiles allow educators to quickly share a customized VS Code setup with students. For example, educators can create a profile with a specific set of extensions and settings needed for a computer science class and then share that profile with students.

### Report VS Code issues

One use of an Empty Profile is to reset your editor when you want to report an issue with VS Code. An Empty Profile disables all extensions and modified settings so you can quickly see if the issue is due to an extension, a setting, or is in VS Code core.

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

If you are using the [Insiders](/insiders) version, the intermediate folder name is `Code - Insiders`.

### Where is the UI State globalState.json file?

If you expand the **UI State** node in the Profiles view, there is a `globalState.json` entry. This is an in-memory JSON representation of your profile's UI State, describing the visibility and layout of various VS Code UI elements. The file does not actually exist on disk and is just a JSON view of the underlying global state storage.

### What is a Temporary Profile?

A Temporary Profile is a profile that is not saved across VS Code sessions. You create a Temporary Profile via the **Profiles: Create a Temporary Profile** command in the Command Palette. The Temporary Profile starts as an Empty Profile and has an automatically generated name (such as **Temp 1**). You can modify the profile settings and extensions, use the profile for the lifetime of your VS Code session, but it will be deleted once you close VS Code.

Temporary Profiles are useful if you want to try a new configuration or test an extension without modifying your default or existing profile. Restarting VS Code reenables the current profile for your workspace.

### How can I remove the profile from my project?

You can set your project back to the Default Profile. If you'd like to remove all profile workspace associations, you can use the **Developer: Reset Workspace Profiles Associations**, which will set all local folders currently assigned a profile back to the Default Profile. **Reset Workspace Profiles Associations** does not delete any existing profiles.

### Do profiles sync across machines (via Settings Sync)?

Yes, you can use [Settings Sync](/docs/editor/settings-sync.md) to move your profiles across various machines. With Setting Sync enabled and **Profiles** checked in the **Settings Sync: Configure** drop down, all your created profiles are available.

![Settings Sync data drop down with Profiles checked](images/profiles/settings-sync-profiles.png)

### Why are some settings not exported when exporting a profile?

When exporting profiles, machine-specific settings are not included because these setting would not be applicable on another machine. For example, settings that point to local paths are not included.
