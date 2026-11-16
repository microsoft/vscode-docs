---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 11/11/2026
MetaDescription: Set up GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}, understand billing and data use, and manage your account.
---
# Set up GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}

Use this guide to sign in to {% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode %} and manage your account. If you already have Copilot access, sign in with that GitHub account.

To use another provider's account or your own API key, see [other AI access options](#other-ai-access-options).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Choose your first AI task">
Start with your own code or a guided sample project.

* [Explore your code without changing files](/docs/agents/guides/explore-a-codebase.md)
* [Build a sample app](/docs/agents/quickstart.md)

</div>

## Before you start

Review these account, usage, and data-handling details before you send project content to an AI model:

* **Account access**: the recommended setup uses a GitHub account with a Copilot plan. If your employer provides Copilot, use the account and policies for your organization. Without a plan, signing in enrolls an eligible account in {% data variables.copilot.copilot_free_short %}.
* **Usage and billing**: models accessed through {% data variables.product.prodname_copilot_short %} consume AI credits from your Copilot plan. Learn about [AI credits and model costs](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs).
* **Monitor usage**: open the Copilot status dashboard from the {% data variables.product.prodname_vscode_shortname %} Status Bar to view the percentage of your monthly allowance that you used. Learn [how to monitor usage and what happens when you reach a limit](/docs/agents/agent-troubleshooting/faq.md#how-can-i-monitor-my-copilot-usage).
* **Data handling**: review the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/) and your organization's policies before you send work code. {% data variables.product.prodname_vscode_shortname %} [telemetry settings](/docs/configure/telemetry.md) are separate from AI-provider data handling.

## Set up GitHub Copilot

Follow these steps to get started with Copilot in {% data variables.product.prodname_vscode_shortname %}:

1. Hover over the Copilot icon in the Status Bar and select **Use AI Features**.

1. Choose a sign-in method and follow the prompts.

    * If you already have a Copilot subscription for your account, {% data variables.product.prodname_vscode_shortname %} will use that subscription.

    * If you don't have a Copilot subscription yet, you'll be signed up for the [{% data variables.copilot.copilot_free_short %} plan](https://github.com/github-copilot/signup) and get a monthly allowance of inline suggestions and AI credits. Learn more about the different [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans).

1. Choose a first task:

    * **Use your own project**: [explore a codebase without changing files](/docs/agents/guides/explore-a-codebase.md) and check the explanation against your code.

    * **Use a practice project**: [build and validate a small app](/docs/agents/quickstart.md) with recommended defaults.

> [!IMPORTANT]
> Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the {% data variables.product.prodname_vscode_shortname %} and [github.com](https://github.com/copilot) experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in {% data variables.product.prodname_vscode_shortname %} by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

## Use Copilot with a GHE account

If your Copilot subscription is associated with a GitHub Enterprise (GHE) account, you can sign in to Copilot in {% data variables.product.prodname_vscode_shortname %} with your GHE credentials.

1. If you haven't already, hover over the Copilot icon in the Status Bar and select **Use AI Features**.

1. In the sign in dialog, choose **Continue with GHE.com** and provide your GHE instance URL and credentials.

If you need to switch between a GitHub.com account and a GHE account, see [Use a different GitHub account per workspace or profile](#use-a-different-github-account-per-workspace-or-profile) for instructions.

## Other AI access options

To use another provider's account, follow the [{% data variables.product.prodname_anthropic_claude %} setup](/docs/agents/run/agent-harnesses.md#claude) or [{% data variables.product.prodname_openai_codex %} setup](/docs/agents/run/agent-harnesses.md#codex). To connect a model with your own API key, follow the [bring your own key (BYOK) setup](/docs/agent-customization/language-models.md#bring-your-own-language-model-key). These routes have their own requirements. Some agent workflows without GitHub sign-in are experimental.

Access through another provider's credentials follows that provider's usage, billing, and data-handling terms. Compare [harness authentication and billing options](/docs/agents/run/agent-harnesses.md#requirements-and-setup).

BYOK can provide chat access without a Copilot plan, but it doesn't replace the {% data variables.product.prodname_copilot %} service for inline suggestions, semantic search, or embeddings.

> [!NOTE]
> {% data variables.product.prodname_anthropic_claude_short %} and {% data variables.product.prodname_openai_codex_short %} harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability), even with separate provider credentials. Contact the IT team that deployed the settings to discuss access.

## Use a different GitHub account with Copilot

If your Copilot subscription is associated with another GitHub account, follow these steps to sign out of your GitHub account in {% data variables.product.prodname_vscode_shortname %}, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with.

    ![Accounts menu in {% data variables.product.prodname_vscode_shortname %}, showing the option to sign out of the current GitHub account.](images/copilot/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    * Select **Sign in to use Copilot** from the Copilot menu in the Status Bar.

        ![Sign in to use Copilot from the Copilot status menu.](images/copilot/copilot-signedout-sign-in.png)

    * Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in {% data variables.product.prodname_vscode_shortname %}, showing the option to sign in with GitHub to use GitHub Copilot.](images/copilot/vscode-accounts-menu.png)

    * Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Use a different GitHub account per workspace or profile

You can use different GitHub accounts for Copilot per {% data variables.product.prodname_vscode_shortname %} workspace or profile. This is useful if you use Copilot with different accounts for work and personal projects, or if you want to use different accounts for different extensions that use GitHub authentication.

Follow these steps to configure which GitHub account to use for Copilot. This configuration is saved per workspace and per profile.

* For GitHub.com accounts:

    1. In the Accounts menu in the Activity Bar, select **Manage Extension Account Preferences**
    1. Select **GitHub Copilot Chat** from the list of extensions
    1. Choose the GitHub account you want to use for Copilot in the current workspace and profile

* For GHE.com accounts:

    > [!TIP]
    > If you only want to use a GHE account for Copilot, follow the steps in [Use Copilot with a GHE account](#use-copilot-with-a-ghe-account) to sign in with your GHE account.

    1. Run **Preferences: Open User Settings (JSON)** or **Preferences: Open Workspace Settings (JSON)** from the Command Palette (`kb(workbench.action.showCommands)`)

    1. Add the following setting to specify GitHub Enterprise as the authentication provider for Copilot:

        ```json
        "github.copilot.advanced": {
            "authProvider": "github-enterprise"
        }
        ```

    1. Re-sign in to your GitHub Enterprise account if you're not already signed in

## Remove AI features from {% data variables.product.prodname_vscode_shortname %}

You can disable the built-in AI features in {% data variables.product.prodname_vscode_shortname %} with the `setting(chat.disableAIFeatures)` setting, similar to how you configure other features in {% data variables.product.prodname_vscode_shortname %}.

This setting disables and hides features like chat or inline suggestions in {% data variables.product.prodname_vscode_shortname %} and disables the Copilot extension. You can configure the setting at the workspace or user level.

## Disable AI features for a workspace

To disable AI features for a specific workspace, configure the `setting(chat.disableAIFeatures)` setting in workspace settings. This setting is available in the Settings editor (`kb(workbench.action.openSettings)`), or you can edit the `settings.json` file in the workspace.

## Next steps

* [Explore your codebase without changing files](/docs/agents/guides/explore-a-codebase.md).
* [Build and validate a sample app with an agent](/docs/agents/quickstart.md).
