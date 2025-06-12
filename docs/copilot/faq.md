---
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
DateApproved: 06/12/2025
MetaDescription: Frequently asked questions for using GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## GitHub Copilot subscription

### How can I get a Copilot subscription?

There are different ways to get access to GitHub Copilot:

| Type of User                   | Description |
|--------------------------------|-------------|
| Individual                     | <ul><li>Set up [GitHub Copilot Free](https://github.com/github-copilot/signup) to get a limited experience of Copilot without a subscription. See [About GitHub Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).</li><li>Sign up for a paid GitHub Copilot subscription to get unlimited completions and chat interactions. You can [try GitHub Copilot for free](https://github.com/github-copilot/signup?ref_cta=Copilot+trial&ref_loc=about+github+copilot&ref_page=docs) with a one-time 30-day trial.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

### How can I monitor my Copilot usage?

You can view the current Copilot usage in the Copilot status dashboard, available through the VS Code Status Bar. The dashboard shows the following information:

- **Completions**: The percentage of code completions quota you have used in the current month.
- **Chat messages**: The percentage of chat requests quota you have used in the current month.
- **Premium requests**: The percentage of premium requests quota you have used in the current month.
- **Premium requests overage**: The number of overage premium requests you have used in the current month.

Visit the GitHub Copilot documentation for more information about [monitoring usage and entitlements](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements).

### I reached my completions or chat interactions limit

Your limit of code completions and chat interactions is reset every month, starting from the day you first signed up for the Copilot Free plan. If you reach your limit, you can opt to sign up for a [paid subscription](#how-can-i-get-a-copilot-subscription), and get an unlimited number of completions and chat messages. Alternatively, you can wait until the next month to continue using Copilot for free.

![Visual indicators in Chat view, Status Bar, and title bar that you reached a limit for Copilot chat messages.](images/faq/copilot-chat-limit-reached.png)

If only the chat interactions are reaching the limit, you can still use Copilot for code completions.

If only the code completions are reaching the limit, you can still use Copilot for chat interactions and Copilot Edits.

### My Copilot subscription is not detected in VS Code

- To use Copilot Chat in Visual Studio Code, you must be signed into Visual Studio Code with a GitHub ID that has access to GitHub Copilot. If your Copilot subscription is associated with another GitHub account, you might have to sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity Bar for signing out of your current GitHub account.

- Verify that your Copilot subscription is still active in [GitHub Copilot settings](https://github.com/settings/copilot).

### How can I switch accounts for Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    - Select **Sign in to use Copilot** from the Copilot status menu.

        ![Sign in to use Copilot from the Copilot status menu.](images/setup/copilot-signedout-sign-in.png)

    - Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

    - Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## General

### How can I remove Copilot from VS Code?

To remove Copilot from VS Code, select the **Hide Copilot** option from the Copilot menu in the VS Code title bar. This removes the Copilot menu from the title bar and the Status Bar, and removes the Chat view.

If you have already installed the Copilot extensions, you need to first uninstall the Copilot and Copilot Chat extensions from the Extensions view. After that, you can hide the Copilot menu.

To restore the Copilot functionality, run the **Chat: Use AI Features with Copilot for free** command from the Command Palette (`kb(workbench.action.showCommands)`).

### Network and firewall configuration for Copilot

- If you or your organization employs security measures like a firewall or proxy server, it may be beneficial to include certain domain URLs in an "allowlist" and open specific ports and protocols. Learn more about troubleshooting [firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

- If you're working on company equipment and connecting to a corporate network, you may be connecting to the Internet via a VPN or an HTTP proxy server. In some cases, these types of network setups may prevent GitHub Copilot from connecting to GitHub's server. Learn more about [troubleshooting network errors for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-network-errors-for-github-copilot).

### How can I provide feedback on Copilot?

If you would like to provide feedback on the Copilot features including inline suggestions and chat, you can create issues in the [vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

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

### How do I enable or disable code completions?

You can enable or disable code completions in VS Code by using the checkboxes in the Copilot status dashboard from the VS Code Status Bar. You can enable or disable code completions globally or for the file type of the active editor.

![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/faq/copilot-disable-completions.png)

### Inline completions are not working in the editor

- Verify that [GitHub Copilot is not disabled](#how-do-i-enabledisable-copilot) globally or for this language
- Verify that your [GitHub Copilot subscription is active and detected](#my-copilot-subscription-is-not-detected-in-vs-code)
- Verify that your [network settings](#network-and-firewall-configuration-for-copilot) are configured to allow connectivity to GitHub Copilot.
- Verify that you have not reached the limit of completions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

## Copilot Chat

### Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

- Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
- Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
- Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).
- Verify that you have not reached your limit of chat interactions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

### Why is my Copilot Chat extension blocked?

If you receive a message that an extension is blocked from using Copilot Chat, the extension was likely disabled due to a detected pattern of abuse coming from that specific extension. Contact the publisher of the extension when you encounter this issue. You can find the publisher information on the extension details page in the Visual Studio Marketplace.

## Additional resources

- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation
