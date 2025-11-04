---
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
DateApproved: 10/09/2025
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
| Individual                     | <ul><li>Set up GitHub Copilot Free to explore basic functionality at no cost with a monthly limit of completions and chat interactions.</li><li>Sign up for a paid GitHub Copilot plan for more flexibility and access to premium features.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

### What's the advantage of signing in with a GitHub account?

Signing in with a GitHub account that has access to GitHub Copilot has the following benefits:

* [Code completions and next edit suggestions in the editor](/docs/copilot/ai-powered-suggestions.md)
* [Increased monthly limit of chat interactions](https://docs.github.com/en/copilot/get-started/plans#comparing-copilot-plans)
* [Access to premium language models in chat](https://docs.github.com/en/copilot/reference/ai-models/supported-models#supported-ai-models-per-copilot-plan) beyond auto model selection
* [Bring your own model keys](/docs/copilot/customization/language-models.md#bring-your-own-language-model-key) (BYOK) to access more models
* [Remote repository indexing and semantic code search](/docs/copilot/reference/workspace-context.md#remote-index)
* [Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
* [Copilot content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)
* [Delegate tasks to Copilot coding agent](/docs/copilot/copilot-coding-agent.md) for background execution

Depending on your Copilot plan, you might have different levels of access and limits. See [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans) for more information.

### How can I monitor my Copilot usage?

You can view the current Copilot usage in the Copilot status dashboard, available through the VS Code Status Bar. The dashboard shows the following information:

- **Completions**: The percentage of code completions quota you have used in the current month.
- **Chat messages**: The percentage of chat requests quota you have used in the current month.
- **Premium requests**: The percentage of premium requests quota you have used in the current month.
- **Premium requests overage**: The number of overage premium requests you have used in the current month.

Visit the GitHub Copilot documentation for more information about [monitoring usage and entitlements](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements).

### I reached my completions or chat interactions limit

Your limit of code completions and chat interactions is reset every month. If only you've only reached the chat interactions limit, you can still use code completions. Inversely, if you've reached the limit for code completions, you can still use chat.

For users on Copilot Free, to access more completions and chat interactions, you can sign up for a [paid plan](https://docs.github.com/en/copilot/concepts/billing/individual-plans) directly from VS Code. Alternatively, you can wait until the next month to continue using Copilot for free.

![Visual indicators in Chat view, Status Bar, and title bar that you reached a limit for Copilot chat messages.](images/faq/copilot-chat-limit-reached.png)

If you're on a paid plan and use all of your premium requests, you can still use Copilot with one of the included models for the rest of the month. You can also request additional premium requests beyond your plan's limit. Learn more about [getting additional premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#what-if-i-run-out-of-premium-requests) in the GitHub Copilot documentation.

### My Copilot subscription is not detected in VS Code

To use chat in Visual Studio Code, you must be signed into Visual Studio Code with a GitHub account that has access to GitHub Copilot.

- If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity Bar for signing out of your current GitHub account. See [Use a different GitHub account with Copilot](/docs/copilot/setup.md#use-a-different-github-account-with-copilot) for more information.

- Verify that your Copilot subscription is still active in [GitHub Copilot settings](https://github.com/settings/copilot).

- If you're using a Copilot plan for a managed user account on GHE.com, you'll need to update some settings before you sign in. See [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

### How can I switch accounts for Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

See [Use a different GitHub account with Copilot](/docs/copilot/setup.md#use-a-different-github-account-with-copilot) for more information.

## General Copilot questions

### How can I remove Copilot from VS Code?

You can disable the built-in AI features in VS Code with the `setting(chat.disableAIFeatures)` setting, similar to how you configure other features in VS Code. This disables and hides features like chat or inline suggestions in VS Code and disables the Copilot extensions. You can configure the setting at the workspace or user level.

Alternatively, use the **Learn How to Hide AI Features** action from the Chat menu in the title bar to access the setting.

> [!NOTE]
> If you have previously disabled the built-in AI features, your choice is respected upon updating to a new version of VS Code.

### Network and firewall configuration for Copilot

- If you or your organization employs security measures like a firewall or proxy server, it may be beneficial to include certain domain URLs in an "allowlist" and open specific ports and protocols. Learn more about troubleshooting [firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

- If you're working on company equipment and connecting to a corporate network, you may be connecting to the Internet via a VPN or an HTTP proxy server. In some cases, these types of network setups may prevent GitHub Copilot from connecting to GitHub's server. Learn more about [troubleshooting network errors for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-network-errors-for-github-copilot).

### My request is rate-limited

This error suggests that you have exceeded the rate limit for Copilot requests. GitHub uses rate limits to ensure everyone has fair access to the Copilot service and to protect against abuse.

See [Rate limits for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/rate-limits-for-github-copilot) for more information about rate limits and what to do if you are rate limited.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu, and then select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](images/faq/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](images/faq/copilot-ext-pre-release.png)

## Code completions

### How do I enable or disable code completions?

To enable or disable code completions in VS Code, use the checkboxes in the Copilot status dashboard from the VS Code Status Bar. You can enable or disable code completions globally or for the file type of the active editor.

![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/faq/copilot-disable-completions.png)

Alternatively, use the `setting(github.copilot.enable)` and `setting(github.copilot.nextEditSuggestions.enabled)` settings to enable or disable code completions and next edit suggestions, respectively. You can configure these settings at the workspace or user level.

### Inline completions are not working in the editor

- Verify that [GitHub Copilot is not disabled](#how-do-i-enable-or-disable-code-completions) globally or for this language
- Verify that your [GitHub Copilot subscription is active and detected](#my-copilot-subscription-is-not-detected-in-vs-code)
- Verify that your [network settings](#network-and-firewall-configuration-for-copilot) are configured to allow connectivity to GitHub Copilot.
- Verify that you have not reached the limit of completions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

## Chat

### Chat features aren't working for me

Verify the following requirements to ensure Chat features work in Visual Studio Code:

- Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
- Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
- Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).
- Verify that you have not reached your limit of chat interactions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

### Agents are not available in chat

Verify that agents are enabled in your VS Code settings: `setting(chat.agent.enabled)`. It's possible that your organization has disabled this feature, verify with your administrator to have agents enabled.

### Not all models are available in the language model picker

You can choose which models are available in the language model picker. Learn how to [customize the language model picker](/docs/copilot/customization/language-models.md#customize-the-model-picker).

Organizations can restrict access to certain models. If you believe a model should be available, contact your organization administrator.

### How do I prevent the Chat view from opening automatically?

By default, the Chat view opens in the Secondary Side Bar. When you close the Chat view for a workspace, VS Code remembers this setting and does not open the Chat view automatically the next time you open that workspace.

You can change the default visibility directly from the Chat view:

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Select the `...` icon in the top-right corner of the Chat view.
1. Select **Show View by Default** to enable or disable the automatic opening of the Chat view.

You can also control the default visibility of the Secondary Side Bar with the `setting(workbench.secondarySideBar.defaultVisibility)` setting. Set it to `hidden` to prevent the Chat view from opening automatically.

## Troubleshooting and feedback

### How can I provide feedback on Copilot?

We track issues and feature requests for GitHub Copilot in VS Code in the [microsoft/vscode](https://github.com/microsoft/vscode) GitHub repository. You can create issues in this repository or use the following feedback mechanisms in VS Code:

- **Code completions**

    Use the **Send Copilot Completion Feedback** action when hovering over a code completion in the editor. In the Issue Reporter, provide a clear and detailed description of the issue, including steps to reproduce it.

    ![Screenshot that shows sending Copilot Completion Feedback action in the editor.](images/faq/code-completions-feedback.png)

- **Next edit suggestions**

    Select the **Feedback** action in the next edit suggestions menu in the editor gutter. In the Issue Reporter, provide a clear and detailed description of the issue, including steps to reproduce it.

    ![Screenshot that shows next edit suggestions menu in the editor gutter.](images/faq/nes-feedback.png)

- **General issues**

    Open the VS Code Issue reporter (**Help menu** > **Report Issue**), select the **VS Code Extension** source, and then select the **GitHub Copilot Chat** extension. Provide a clear and detailed description of the issue, including steps to reproduce it.

    ![Screenshot that shows VS Code Issue Reporter with GitHub Copilot Chat selected.](images/faq/issue-reporter.png)

When you report an issue, follow the guidelines in our [wiki](https://github.com/microsoft/vscode/wiki/Copilot-Issues) to make sure your issue is actionable.

It can be helpful to include information from the [GitHub Copilot logs](#view-logs-for-github-copilot-in-vs-code) if you're reporting an issue.

### View logs for GitHub Copilot in VS Code

The log files for the GitHub Copilot extension are stored in the standard log location for Visual Studio Code extensions.

To get detailed logs for Copilot in VS Code, follow these steps:

1. In the Command Palette (`kb(workbench.action.showCommands)`), run the **Developer: Set Log Level** command and set the value to **Trace** (you can do this only for the GitHub Copilot and GitHub Copilot Chat extensions).
1. In the Command Palette (`kb(workbench.action.showCommands)`), run the **Output: Show Output Channels** command and select either GitHub Copilot or GitHub Copilot Chat from the list.
1. In the Output panel, you can see the logs for the selected extension.
1. To switch to another output channel, on the right of the Output panel, select **GitHub Copilot** or **GitHub Copilot Chat** from the dropdown menu.

If you encounter problems connecting to GitHub Copilot, you can view network connectivity diagnostics logs:

1. Open the Command Palette (`kb(workbench.action.showCommands)`).
1. Run the **GitHub Copilot: Collect Diagnostics** command.
1. An editor tab opens where you can inspect the diagnostics information.

### Use the Chat Debug view

You can use the Chat Debug view to see the details of AI requests and responses, including the prompt being used and the context that is sent to the language model. This view can help you understand how the AI is interpreting your requests and what context it is using to generate responses.

Learn more about the [Chat Debug view](/docs/copilot/chat/chat-debug-view.md).

## Additional resources

- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation
