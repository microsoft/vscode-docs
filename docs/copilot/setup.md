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

This guide walks you through setting up your GitHub Copilot subscription and installing the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension in Visual Studio Code. After you complete these steps, you can get started with GitHub Copilot in VS Code.

> [!TIP]
> If you don't yet have a Copilot subscription, you can try out Copilot for free by signing up for the [Copilot Free plan](TODO)

## Install the GitHub Copilot extension

To use Copilot in VS Code, install the GitHub Copilot extension.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

> [!NOTE]
> When you install the GitHub Copilot extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

## Sign in to your GitHub account

To access Copilot, you need to sign in with your GitHub account. You can sign in directly from the Copilot Chat view.

1. Open the Chat view by pressing `kb(workbench.action.chat.open)`

    ![Screenshot that shows the Chat view in the Secondary Side Bar. The Chat view contains a button to sign up for Copilot Free plan.](images/setup/copilot-chat-view-new-user.png)

1. Sign in to your GitHub account:

    * If you don't yet have a Copilot subscription, select **Start GitHub Copilot Free** and follow the steps to sign up for the Copilot Free plan.

        ![Screenshot of the Chat view, highlighting the button to sign up for Copilot Free plan.](images/setup/copilot-chat-view-start-free.png)

        The Copilot Free plan enables you to try Copilot for free, without the need for a credit card to sign up. You have a limited number of completions and chat interactions per month with the free plan, which reset each month. Get more info about the [Copilot Free plan](https://github.com/copilot) in the GitHub documentation.

        Alternatively, follow these steps to [sign up for a Copilot subscription](#set-up-a-github-copilot-subscription).

    * If you already have a Copilot subscription, select **sign in to that account** to sign in to your GitHub account.

        ![Screenshot of the Chat view, highlighting the link to sign in to existing Copilot account.](images/setup/copilot-chat-view-sign-in.png)

        Alternatively, you can sign in to GitHub in VS Code by selecting the **Accounts** menu in the Activity Bar, and then **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

## Get started with Copilot in VS Code

After you've signed in to your GitHub account and have access to Copilot, start to explore AI-powered coding in VS Code.

1. Verify that the Chat view (`kb(workbench.action.chat.open)`) shows the Copilot welcome message and you can enter a prompt in the chat input box.

    ![The Chat view opens in the Secondary Side Bar and shows the Copilot welcome message.](images/setup/copilot-chat-view-welcome.png)

1. Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

## Set up a GitHub Copilot subscription

To use Copilot, you need to have access to Copilot with your GitHub account. You can have Copilot associated with your personal account, or you might be assigned a seat in a subscription managed by an organization or enterprise.

| Account type | Instructions |
| ------------ | ------------ |
| Personal account | <li>Sign up for the [Copilot Free plan](https://github.com/github-copilot/signup) with your personal GitHub account to try out Copilot for free, without the need for a credit card. Get more info about the [Free plan details and limitations](TODO).</li><li>Set up a subscription to **GitHub Copilot Pro** with your personal GitHub account. You can [activate a one-time 30-day trial to evaluate GitHub Copilot](https://github.com/github-copilot/signup/copilot_individual).</li> |
| Member of an organization | <li>You can request access to **GitHub Copilot Business** from the [GitHub Copilot settings](https://github.com/settings/copilot) for your personal account. You need to be assigned a seat by an organization owner.</li><br/>![Screenshot of Copilot settings, showing how to request access from an organization.](images/setup/request-cfb-access-settings.png) |

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Sign out of GitHub Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to GitHub in VS Code by selecting the **Accounts** menu in the Activity Bar, and then **Sign in with GitHub to use GitHub Copilot**.

    ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

## Next steps

* Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

* Check our [Copilot cheat sheet](/docs/copilot/copilot-vscode-features.md) for an overview of the key Copilot commands and shortcuts.
