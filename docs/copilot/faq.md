---
Order: 15
Area: copilot
TOCTitle: FAQ
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
PageTitle: GitHub Copilot frequently asked questions
DateApproved: 10/29/2024
MetaDescription: Frequently asked questions for using GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## GitHub Copilot subscription

### How can I get a Copilot subscription?

There are different ways to get access to GitHub Copilot:

* As an individual, you can sign up to use [Copilot for free](https://github.com/github-copilot/signup), without the need for a credit card. You are entitled to a limited number of completions and chat interactions per month with the free plan, which reset each month. Learn more about the [Copilot Free plan details and conditions](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot).

* As an individual, sign up for a [paid subscription](https://github.com/github-copilot/signup/copilot_individual) to get unlimited completions and chat interactions. You can try GitHub Copilot for free with a one-time 30-day trial.

* If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

### I reached my completions or chat interactions limit

Your limit of code completions and chat interactions is reset every month, starting from the day you first signed up for the Copilot Free plan. If you reach your limit, you can opt to sign up for a [paid subscription](#how-can-i-get-a-copilot-subscription), and get an unlimited number of completions and chat messages. Alternatively, you can wait until the next month to continue using Copilot for free.

![Visual indicators in Chat view, Status Bar, and title bar that you reached a limit for Copilot chat messages.](images/faq/copilot-chat-limit-reached.png)

If only the chat interactions are reaching the limit, you can still use Copilot for code completions.

If only the code completions are reaching the limit, you can still use Copilot for chat interactions and Copilot Edits.

### My Copilot subscription is not detected in VS Code

- To use Copilot Chat in Visual Studio Code, you must be signed into Visual Studio Code with a GitHub ID that has access to GitHub Copilot. If your Copilot subscription is associated with another GitHub account, you might have to sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity Bar for signing out of your current GitHub account.

- Verify that your Copilot subscription is still active in [GitHub Copilot settings](https://github.com/settings/copilot).

### How can I switch accounts for Copilot

To switch to another GitHub account for using Copilot:

1. Open the Extensions view from the Activity Bar ( or use `kb(workbench.view.extensions)`) and enter *GitHub Copilot* in the search box.

    ![Extensions view in VS Code, showing the GitHub Copilot extension.](images/faq/copilot-extensions.png)

    > [!NOTE]
    > There are two Copilot extensions: GitHub Copilot and GitHub Copilot Chat.

1. For the **GitHub Copilot** extension, select the gear icon, and then select **Account Preferences**.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/faq/extension-account-preferences.png)

1. From the Account Preferences Quick Pick, choose an existing account or select **Use a new account...** to sign in with a different GitHub account.

    ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/faq/account-preferences-quick-pick.png)

1. Repeat these steps for the **GitHub Copilot Chat** extension.

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
- Verify that you have not reached the limit of completions for the month with the [Copilot Free plan](TODO).

## Copilot Chat

### Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

- Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
- Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
- Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).
- Verify that you have not reached your limit of chat interactions for the month with the [Copilot Free plan](TODO).

### Why is my Copilot Chat extension blocked?

If you receive a message that an extension is blocked from using Copilot Chat, the extension was likely disabled due to a detected pattern of abuse coming from that specific extension. Contact the publisher of the extension when you encounter this issue. You can find the publisher information on the extension details page in the Visual Studio Marketplace.

## Additional resources

- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation
