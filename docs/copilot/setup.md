---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 03/05/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This guide walks you through setting up GitHub Copilot in Visual Studio Code. To use Copilot in VS Code, you need to have access to GitHub Copilot with your GitHub account and have the Copilot extensions installed in VS Code.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Get access to GitHub Copilot

There are different ways to get access to GitHub Copilot:

| Type of User                   | Description |
|--------------------------------|-------------|
| Individual                     | <ul><li>Set up [GitHub Copilot Free](https://github.com/github-copilot/signup) to get a limited experience of Copilot without a subscription. See [About GitHub Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).</li><li>Sign up for a paid GitHub Copilot subscription to get unlimited completions and chat interactions. You can [try GitHub Copilot for free](https://github.com/github-copilot/signup?ref_cta=Copilot+trial&ref_loc=about+github+copilot&ref_page=docs) with a one-time 30-day trial.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

## Set up Copilot in VS Code

VS Code provides a streamlined experience to set up GitHub Copilot. This installs the GitHub Copilot extensions and signs you in to your GitHub account. If you don't have a Copilot subscription yet, it activates the [Copilot Free plan](https://github.com/github-copilot/signup).

1. Select **Use AI Features with Copilot for Free...** from the Copilot menu in the VS Code title bar or from the Command Palette (`kb(workbench.action.showCommands)`)

    ![The Copilot menu in the VS Code title bar, showing the option to use AI features with Copilot for free.](images/setup/copilot-menu-use-ai-features.png)

    > [!TIP]
    > You can also open the Chat view directly by using the keyboard shortcut `kb(workbench.action.chat.open)` or with the **Open Chat** command.

1. Select **Sign in to Use Copilot for Free** to sign in to your GitHub account. This step also installs the Copilot extensions.

    ![Chat view shows the Copilot message and a button that enables you to sign in to use Copilot.](images/setup/copilot-chat-view-new-user.png)

    If you already have a Copilot subscription, you can now start using Copilot in VS Code.

1. If you don't yet have a Copilot subscription, follow the steps in the browser to sign up for the Copilot Free plan

    > [!IMPORTANT]
    > Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the VS Code and <github.com> experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

## Get started with Copilot in VS Code

After you've signed in to your GitHub account and have access to Copilot, start to explore AI-powered coding in VS Code.

1. Verify that the Chat view (`kb(workbench.action.chat.open)`) shows, and that you can enter a prompt in the chat input box.

    ![The Chat view opens in the Secondary Side Bar and shows the Copilot welcome message.](images/setup/copilot-chat-view-welcome.png)

    Notice that you can choose from multiple language models to use with Copilot.

1. Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

## Manually set up GitHub Copilot in VS Code

To manually set up GitHub Copilot in VS Code, perform the following steps:

1. Install the GitHub Copilot extensions in VS Code

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot?referrer=docs-copilot-setup">Install the GitHub Copilot extensions</a>

    You can also open the Extensions view and search for *GitHub Copilot* to install the extension.

    > [!NOTE]
    > When you install the GitHub Copilot extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

1. Sign in to Copilot from VS Code

    Sign in to your GitHub account by entering **GitHub Copilot: Sign in** in the Command Palette (`kb(workbench.action.showCommands)`)

    ![Command Palette in VS Code, showing the option to sign in to GitHub Copilot.](images/setup/command-palette-copilot-sign-in.png)

## Use a different GitHub account with Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account by entering **GitHub Copilot: Sign in** in the Command Palette (`kb(workbench.action.showCommands)`)

    Alternatively, sign in to GitHub in VS Code by selecting the **Accounts** menu in the Activity Bar, and then **Sign in with GitHub to use GitHub Copilot**.

    ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

## Next steps

* Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

* Check our [Copilot cheat sheet](/docs/copilot/reference/copilot-vscode-features.md) for an overview of the key Copilot commands and shortcuts.
