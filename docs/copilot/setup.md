---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 11/12/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This guide walks you through setting up GitHub Copilot in Visual Studio Code. To use Copilot in VS Code, you need to have access to GitHub Copilot with your GitHub account.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of inline suggestions and chat interactions.

## Set up Copilot in VS Code

To use Copilot in VS Code, you need access to a GitHub Copilot subscription. Follow these steps to set up Copilot directly from within VS Code. Learn more about [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans) in the GitHub Copilot documentation.

1. Hover over the Copilot icon in the Status Bar and select **Use AI Features**.

    ![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

1. Choose a sign-in method and follow the prompts.

    * If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

    * If you already have a Copilot subscription, VS Code will use that subscription.

    ![Sign in to your GitHub account or use Copilot if you're already signed in.](images/setup/setup-copilot-sign-in.png)

1. You can now start using Copilot in VS Code.

    Learn the basics with the [Copilot Quickstart](/docs/copilot/getting-started.md).

> [!IMPORTANT]
> Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the VS Code and [github.com](http://github.com/copilot) experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

## Use Copilot with a GHE account

If your Copilot subscription is associated with a GitHub Enterprise (GHE) account, you can sign in to Copilot in VS Code with your GHE credentials.

1. If you haven't already, hover over the Copilot icon in the Status Bar and select **Use AI Features**.

1. In the sign in dialog, choose **Continue with GHE.com** and provide your GHE instance URL and credentials.

If you need to switch between a GitHub.com account and a GHE account, see [Use a different GitHub account per workspace or profile](#use-a-different-github-account-per-workspace-or-profile) for instructions.

## Use a different GitHub account with Copilot

If your Copilot subscription is associated with another GitHub account, follow these steps to sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    * Select **Sign in to use Copilot** from the Copilot menu in the Status Bar.

        ![Sign in to use Copilot from the Copilot status menu.](images/setup/copilot-signedout-sign-in.png)

    * Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

    * Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Use a different GitHub account per workspace or profile

You can use different GitHub accounts for Copilot per VS Code workspace or profile. This is useful if you use Copilot with different accounts for work and personal projects, or if you want to use different accounts for different extensions that use GitHub authentication.

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

## Remove AI features from VS Code

You can disable the built-in AI features in VS Code with the `setting(chat.disableAIFeatures)` setting, similar to how you configure other features in VS Code. This disables and hides features like chat or inline suggestions in VS Code and disables the Copilot extensions. You can configure the setting at the workspace or user level.

Alternatively, use the **Learn How to Hide AI Features** action from the Chat menu in the title bar to access the setting.

> [!NOTE]
> If you have previously disabled the built-in AI features, your choice is respected upon updating to a new version of VS Code.

## Disable AI features for a workspace

To disable AI features for a specific workspace, configure the `setting(chat.disableAIFeatures)` setting in workspace settings. This setting is available in the Settings editor (`kb(workbench.action.openSettings)`), or you can edit the `settings.json` file in the workspace.

## Next steps

* Continue with the [Quickstart for using AI](/docs/copilot/getting-started.md) to discover the key features for AI-powered development in VS Code.
