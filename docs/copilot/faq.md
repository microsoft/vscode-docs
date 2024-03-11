---
Order: 8
Area: copilot
TOCTitle: FAQ
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
PageTitle: GitHub Copilot frequently asked questions
DateApproved: 02/28/2024
MetaDescription: Frequently asked questions for using GitHub Copilot in Visual Studio Code.
---
# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## General

### I can't find Copilot Chat in the Activity Bar

If you moved the Chat view out of the Primary Side Bar, for example, if you dragged the view to the [Secondary Side Bar](/docs/editor/custom-layout.md#secondary-side-bar), the Chat view icon is no longer displayed on the Activity Bar. If you close the Secondary Side Bar, the Chat view isn't visible and it might appear that you lost access to the Chat view.

There are several ways to display the Chat view or restore it back to the Activity Bar:

* **View: Show Chat** - Opens the Chat view no matter where it's hosted.
* **Copilot status menu** - The status menu dropdown has an option to **Open GitHub Copilot Chat**.
* **View: Reset View Locations** - General command to restore all views and panels to their default locations.

As with any view, you can drag and drop the Chat view back to the Activity Bar or use **Reset Location** from the view title bar context menu.

### How do I disable Copilot?

You can temporarily deactivate Copilot from the Status Bar. You're prompted whether you want to disable Copilot for all code (globally) or just the programming language detected in the active editor (for example, Python).

### How can I provide feedback on Copilot?

You can give feedback on Copilot inline suggestions and responses in the [GitHub Copilot Discussions](https://github.com/orgs/community/discussions/categories/copilot).

If you would like to provide feedback on the Copilot Chat features, you can create issues in the [vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu, and then select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](images/faq/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](images/faq/copilot-ext-pre-release.png)

## Copilot Chat

### The Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

* Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
* Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
* Your GitHub account that is signed into VS Code must have an activated Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).

## Additional resources

* [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation
