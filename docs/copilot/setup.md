---
Order: 2
Area: copilot
TOCTitle: Setup
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: Set up GitHub Copilot
DateApproved: 02/28/2024
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This tutorial walks you through setting up your GitHub Copilot subscription and installing the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension in Visual Studio Code. After you complete these steps, you can get started with GitHub Copilot in VS Code.

For an overview of what you can do with GitHub Copilot in VS Code, see the [GitHub Copilot Overview](/docs/copilot/overview.md).

## Step 1: Set up your GitHub Copilot subscription

If you want to use GitHub Copilot, you either need an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat in a subscription managed by an organization or enterprise.

| Account type | Instructions |
| ------------ | ------------ |
| Personal account | Set up a subscription to **GitHub Copilot Individual** with your personal GitHub account. You can [activate a one-time 30-day trial to evaluate GitHub Copilot](https://github.com/github-copilot/signup).<br/><br/>If you didn't yet activate your free trial for Copilot, the GitHub Copilot extension notifies you in VS Code.<br/>![Copilot sign up notification in VS Code](images/setup/copilot-access-toast.png) |
| Member of an organization | You need to be assigned a seat by an organization owner.<br/><br/>You can request access to **GitHub Copilot Business** from the [GitHub Copilot settings](https://github.com/settings/copilot) for your personal account.<br/>![Screenshot of Copilot settings, showing how to request access from an organization.](images/setup/request-cfb-access-settings.png) |

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Step 2: Install the GitHub Copilot extension

You use the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension to power your artificial intelligence (AI) suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

When you install the GitHub Copilot extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

## Step 3: Sign in to GitHub

To use GitHub Copilot in Visual Studio Code, you must be signed into Visual Studio Code with the same GitHub account that has access to GitHub Copilot.

If you didn't previously authorize VS Code in your GitHub account, you're prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/setup/copilot-auth-toast.png)

Alternatively, you can sign in to GitHub in VS Code by selecting the **Accounts** menu in the Activity Bar, and then **Sign in with GitHub to use GitHub Copilot**.

![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

In your browser, GitHub requests the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

## Validation: Check the Copilot status

Now that you've signed up for GitHub Copilot and activated the extension, let's verify that it's actually active.

1. Open Visual Studio Code.

1. Notice the GitHub Copilot icon in the status bar, which indicates that GitHub Copilot is active.

    ![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/setup/vscode-status-bar-copilot-active.png)

1. Select the GitHub Copilot icon to open the Copilot status.

    The GitHub Copilot status should show **Ready**.

    ![Screenshot showing the GitHub Copilot status menu in VS Code, indicating that the Copilot status is ready.](./images/setup/copilot-status-menu.png)

## Sign out of GitHub Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

To sign out of your GitHub account in VS Code, select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

## Next steps

You've successfully set up Copilot in VS Code with your GitHub Copilot subscription. Continue your journey and discover the key features of GitHub Copilot in VS Code with the [Copilot Getting Started Tutorial](/docs/copilot/getting-started.md).
