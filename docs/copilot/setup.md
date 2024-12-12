---
Order: 3
Area: copilot
TOCTitle: Setup
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: Set up GitHub Copilot
DateApproved: 10/29/2024
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This guide walks you through setting up GitHub Copilot in Visual Studio Code. To use Copilot in VS Code, you need to have access to GitHub Copilot with your GitHub account and have the Copilot extensions installed in VS Code.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Get access to GitHub Copilot

There are different ways to get access to GitHub Copilot:

* As an individual, you can sign up to use [Copilot for free](https://github.com/github-copilot/signup), without the need for a credit card. You are entitled to a limited number of completions and chat interactions per month with the free plan, which reset each month. Learn more about the [Copilot Free plan details and conditions](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot).

* As an individual, sign up for a [paid subscription](https://github.com/github-copilot/signup/copilot_individual). You can try GitHub Copilot for free with a one-time 30-day trial.

* If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Set up Copilot in VS Code

* If you don't have access to Copilot with your GitHub account:

    1. Open the Copilot menu in the VS Code title bar and select **Use AI Features with Copilot for free...**

        ![The Copilot menu in the VS Code title bar, showing the option to use AI features with Copilot for free.](images/setup/copilot-menu-use-ai-features.png)

        You can also open the Chat view directly by using the keyboard shortcut `kb(workbench.action.chat.open)` or by with the **Chat: Focus on Chat View** command.

    1. Select **Sign in to Use Copilot for Free** to sign in to your GitHub account and sign up for the Copilot Free plan

        If you're already signed in to your GitHub account in VS Code, select **Use Copilot for Free** to sign up for the Copilot Free plan.

        ![Chat view in VS Code, showing the option to sign in to use Copilot for free.](images/setup/copilot-chat-view-new-user.png)

        > [!IMPORTANT]
        > When you sign up for Copilot Free in VS Code, we capture some telemetry data to improve the product. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off` or by configuring this in your Copilot settings (<https://github.com/settings/copilot>).

## Use an existing Copilot subscription in VS Code

1. Install the GitHub Copilot extensions

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extensions</a>

    You can also open the Extensions view and search for *GitHub Copilot* to install the extension.

    > [!NOTE]
    > When you install the GitHub Copilot extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

1. Sign in to your GitHub account by entering **GitHub Copilot: Sign in** in the Command Palette (`kb(workbench.action.showCommands)`)

    ![Command Palette in VS Code, showing the option to sign in to GitHub Copilot.](images/setup/command-palette-copilot-sign-in.png)

## Get started with Copilot in VS Code

After you've signed in to your GitHub account and have access to Copilot, start to explore AI-powered coding in VS Code.

1. Verify that the Chat view (`kb(workbench.action.chat.open)`) shows the Copilot welcome message and you can enter a prompt in the chat input box.

    ![The Chat view opens in the Secondary Side Bar and shows the Copilot welcome message.](images/setup/copilot-chat-view-welcome.png)

1. Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

## Sign out of GitHub Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to GitHub in VS Code by selecting the **Accounts** menu in the Activity Bar, and then **Sign in with GitHub to use GitHub Copilot**.

    ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

## Next steps

* Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

* Check our [Copilot cheat sheet](/docs/copilot/copilot-vscode-features.md) for an overview of the key Copilot commands and shortcuts.
