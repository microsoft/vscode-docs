---
Order: 9
Area: copilot
TOCTitle: FAQ
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
PageTitle: GitHub Copilot frequently asked questions
DateApproved: 08/01/2024
MetaDescription: Frequently asked questions for using GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## GitHub Copilot subscription

### How can I get a Copilot subscription?

If you want to use GitHub Copilot, you either need an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat in a subscription managed by an organization or enterprise.

| Account type | Instructions |
| ------------ | ------------ |
| Personal account | Set up a subscription to **GitHub Copilot Individual** with your personal GitHub account. You can [activate a one-time 30-day trial to evaluate GitHub Copilot](https://github.com/github-copilot/signup). |
| Member of an organization | You need to be assigned a seat by an organization owner.<br/><br/>You can request access to **GitHub Copilot Business** from the [GitHub Copilot settings](https://github.com/settings/copilot) for your personal account. |

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

### My Copilot subscription is not detected in VS Code

- To use GitHub Copilot Chat in Visual Studio Code, you must be signed into Visual Studio Code with the same GitHub ID that has access to GitHub Copilot. If your Copilot subscription is associated with another GitHub account, you might have to sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity bar for signing out of your current GitHub account.

- Verify that your Copilot subscription is still active in [GitHub Copilot settings](https://github.com/settings/copilot).

### How can I switch accounts for Copilot

To switch to another GitHub account for using Copilot, first sign out of your GitHub account in VS Code, and then sign in with another account.

1. Sign out of your current GitHub account in VS Code:

    Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to GitHub in VS Code:

    Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

    ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

## General

### Network and firewall configuration for Copilot

- If you or your organization employs security measures like a firewall or proxy server, it may be beneficial to include certain domain URLs in an "allowlist" and open specific ports and protocols. Learn more about troubleshooting [firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

- If you're working on company equipment and connecting to a corporate network, you may be connecting to the Internet via a VPN or an HTTP proxy server. In some cases, these types of network setups may prevent GitHub Copilot from connecting to GitHub's server. Learn more about [troubleshooting network errors for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-network-errors-for-github-copilot).

### How can I provide feedback on Copilot?

You can give feedback on Copilot inline suggestions and responses in the [GitHub Copilot Discussions](https://github.com/orgs/community/discussions/categories/copilot).

If you would like to provide feedback on the Copilot Chat features, you can create issues in the [vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

It can be helpful to include information from the [GitHub Copilot logs](#view-logs-for-github-copilot-in-vs-code) if you're reporting an issue.

### View logs for GitHub Copilot in VS Code

The log files for the GitHub Copilot extension are stored in the standard log location for Visual Studio Code extensions. The log files are useful for diagnosing connection issues.

Use the **Toggle Output** command (`kb(workbench.action.output.toggleOutput)`) and select **GitHub Copilot** or **GitHub Copilot Chat** in the dropdown.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu, and then select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](images/faq/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](images/faq/copilot-ext-pre-release.png)

## Copilot code completions

### How do I enable/disable Copilot?

You can temporarily deactivate Copilot completions from the Status Bar. You're prompted whether you want to disable Copilot for all code (globally) or just the programming language detected in the active editor (for example, Python).

![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/faq/vscode-status-bar-copilot-active.jpg)

### Inline completions are not working in the editor

- Verify that [GitHub Copilot is not disabled](#how-do-i-enabledisable-copilot) globally or for this language
- Verify that your [GitHub Copilot subscription is active and detected](#my-copilot-subscription-is-not-detected-in-vs-code)
- Verify that your [network settings](#network-and-firewall-configuration-for-copilot) are configured to allow connectivity to GitHub Copilot.

## Copilot Chat

### Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

- Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
- Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
- Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).

### Why is my Copilot Chat extension blocked?

If you receive a message that an extension is blocked from using Copilot Chat, the extension was likely disabled due to a detected pattern of abuse coming from that specific extension. Contact the publisher of the extension when you encounter this issue. You can find the publisher information on the extension details page in the Visual Studio Marketplace.

## Additional resources

- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation
