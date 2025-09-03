---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 08/07/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This guide walks you through setting up GitHub Copilot in Visual Studio Code. To use Copilot in VS Code, you need to have access to GitHub Copilot with your GitHub account.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Get access to GitHub Copilot

There are different ways to get access to GitHub Copilot:

| Type of User                   | Description |
|--------------------------------|-------------|
| Individual                     | <ul><li>Set up [GitHub Copilot Free](https://github.com/github-copilot/signup) to get a limited experience of Copilot without a subscription. See [About GitHub Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).</li><li>Sign up for a paid GitHub Copilot subscription to get unlimited completions and chat interactions. You can [try GitHub Copilot for free](https://github.com/github-copilot/signup?ref_cta=Copilot+trial&ref_loc=about+github+copilot&ref_page=docs) with a one-time 30-day trial.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

## Set up Copilot in VS Code

To use Copilot in VS Code, you need access to a GitHub Copilot subscription. You can set up Copilot directly from within VS Code.

1. Hover over the Copilot icon in the Status Bar and select **Set up Copilot**.

    ![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

1. Choose a sign-in method and follow the prompts. If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

    ![Sign in to your GitHub account or use Copilot if you're already signed in.](images/setup/setup-copilot-sign-in.png)

    > [!IMPORTANT]
    > Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the VS Code and <github.com> experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

1. You can now start using Copilot in VS Code. Learn the basics with the [Copilot Quickstart](/docs/copilot/getting-started.md).

## Use a different GitHub account with Copilot

If your Copilot subscription is associated with another GitHub account, follow these steps to sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    - Select **Sign in to use Copilot** from the Copilot menu in the Status Bar.

        ![Sign in to use Copilot from the Copilot status menu.](images/setup/copilot-signedout-sign-in.png)

    - Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

    - Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Remove AI features from VS Code

To remove the built-in AI features from VS Code, run the **Chat: Hide AI Features** command from the Command Palette (`kb(workbench.action.showCommands)`) or select the **Hide AI Features** option from the Copilot menu in the VS Code title bar.

> [!NOTE]
> If you have already installed the Copilot extensions, you need to first uninstall the Copilot and Copilot Chat extensions before you can remove the AI features.

To restore the built-in AI features in VS Code, run the **Chat: Use AI Features with Copilot for free** command from the Command Palette (`kb(workbench.action.showCommands)`).

## Disable AI features for a workspace

To disable AI features for a specific workspace:

1. Open the Extensions view in VS Code (`kb(workbench.view.extensions)`).
1. Search for the **GitHub Copilot** extension.
1. Select the gear icon and then select **Disable (Workspace)**.
1. Select **Restart extensions**.
1. You can re-enable it later by selecting the **Enable (Workspace)** button that appears after restarting extensions.

![Screenshot that shows the GitHub Copilot extension in the Extensions view, with the option to disable it for the workspace.](images/setup/copilot-disable-workspace.png)

## Next steps

- Continue with the [Quickstart for using AI](/docs/copilot/getting-started.md) to discover the key features for AI-powered development in VS Code.
