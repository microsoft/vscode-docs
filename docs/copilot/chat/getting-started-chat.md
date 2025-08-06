---
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
DateApproved: 07/09/2025
MetaDescription: Get started with AI-powered chat conversations with GitHub Copilot in Visual Studio Code, inline while you're coding, or in a separate Chat view.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Getting started with Copilot Chat in VS Code

This tutorial walks you through using Copilot Chat in Visual Studio Code. You use AI-powered chat conversations to help with refactoring code, improving your code understanding, and finding your way around configuring VS Code.

If you're new to using Copilot in VS Code, see the [Copilot Overview](/docs/copilot/overview.md) or get set up and discover the key capabilities in the [Copilot Quickstart](/docs/copilot/getting-started.md).

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Prerequisites

To use GitHub Copilot in VS Code, you need to have the following:

* Access to GitHub Copilot
* GitHub Copilot extensions installed in VS Code

Follow the steps in the [GitHub Copilot set up guide](/docs/copilot/setup.md) to get access to GitHub Copilot and install the Copilot extensions in VS Code.

## Get your first chat conversation

Copilot Chat lets you interact with GitHub Copilot by using natural language, to ask and receive answers to coding-related questions.

In this tutorial, you'll be creating a simple Node.js web application.

1. Open a new VS Code window. You'll be creating a new workspace in a follow-up step.

1. Select **Open Chat** from the Copilot menu in the title bar or use the `kb(workbench.action.chat.open)` keyboard shortcut.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat menu in the Command Center.](./images/getting-started-chat/copilot-chat-menu-command-center.png)

    Notice that the Chat view opens in the Secondary Side Bar. Having the Chat view on the side allows you to keep the conversation going while you work on your code.

1. In the Chat view, select **Ask** from the chat mode dropdown.

    Use _ask mode_ to ask Copilot questions about coding and technology topics, explain code, or brainstorm ideas.

    ![Screenshot of VS Code Copilot Chat view, showing the Ask mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-ask.png)

1. Let's ask Copilot about popular web frameworks. Enter "what are the most popular web frameworks?" in the chat input field.

    Copilot returns a list of popular web frameworks. Experiment with asking follow-up questions to get more information about a specific framework, or to compare frameworks. For example, you can ask "what are the differences between Express and Fastify?" or "how to do server-side rendering?".

1. To scaffold a new web app, enter "new express app with typescript and pug" in the chat input field.

    Notice how Copilot returns a file tree that represents the new workspace files. Select any file in the file tree to preview its content.

    ![Screenshot of VS Code Copilot Chat view, showing a file tree for a new workspace and a 'Create Workspace' button.](./images/getting-started-chat/copilot-chat-view-workspace-file-tree.png)

1. Select **Create Workspace** to create the app, and select a folder on disk where the workspace should be created.

    Select **Open** in the dialog to open the newly-created workspace in VS Code.

    > [!NOTE]
    > VS Code might ask if you want to trust the new workspace. Select **Yes, I trust the contents** to trust the workspace. Get more details about [workspace trust](/docs/editing/workspaces/workspace-trust.md).

## Stay in the flow with inline chat

While the Chat view is great for keeping a conversation going, _editor inline chat_ is optimized for situations where you want to ask Copilot about the code you're actively working on in the editor. For example, to refactor a specific piece of code, or explain a complex algorithm.

Let's look at how to use editor inline chat for code refactoring.

1. Open the `app.ts` file and use the `kb(inlinechat.start)` keyboard shortcut to bring up editor inline chat. Alternatively, select **Editor Inline Chat** from the Copilot menu in the title bar.

    A chat input field appears inline in the editor, where you can enter your chat prompt and ask Copilot about the code in the editor.

    ![Screenshot of VS Code editor, highlighting the Inline Chat popup control.](./images/getting-started-chat/copilot-inline-chat-popup.png)

1. Enter "Add support for JSON output" in the chat input field and press `kbstyle(Enter)`.

    Notice how Copilot provides a code suggestion to add support for JSON output in Express.

    ![Screenshot of VS Code editor with the suggested code change.](./images/getting-started-chat/copilot-inline-chat-json-support.png)

1. Select **Accept** or **Close** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Rerun Request** control or ask a follow-up question to get another suggestion.

> [!TIP]
> Right-click in the editor and select the **Copilot** context menu to access commonly used Copilot commands, such as fixing or explaining code or generating tests.

## Make edits across multiple files

With inline chat, you made changes to a single file. You can also use Copilot to make changes across multiple files in your workspace by switching to _edit mode_ in the Chat view.

Let's use edit mode to use a `.env` file to store the configuration for your web app.

1. Open the Chat view and select **Edit** from the chat mode dropdown.

    ![Screenshot of VS Code Copilot Chat view, showing the Edit mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-edit.png)

1. To help Copilot understand the scope of your request, let's add `package.json` and `app.ts` as context to the prompt.

    1. Select **Add Context** in the Chat view, type `package` in the search field, and select the `package.json` file from the list of files. Notice that there are many types of context you can add.

    1. Open the `app.ts` file in the editor, and notice that Copilot automatically adds the active file to the chat context.

1. Enter "Use a .env file for configuration" in the chat input field and press `kbstyle(Enter)`.

1. Notice how Copilot makes updates across multiple files and adds a new `.env` file to your workspace.

    The Chat view shows the files that were changed in bold text in the Chat view.

    ![Screenshot of VS Code editor, showing the suggested code change in the app.ts file.](./images/getting-started-chat/copilot-inline-chat-env-file.png)

1. Select **Keep** in the Chat view to confirm all suggested changes.

    Use the overlay controls in the editor to easily navigate and review the individual changes across your files.

## Start an agentic coding flow

For more complex requests, you can use _agent mode_ to let Copilot autonomously plan and execute the tasks that are needed to complete your request. These tasks can involve editing code but also include running commands in the terminal. In agent mode, Copilot might invoke different tools to accomplish the task.

Let's use agent mode to make the web app about sharing travel tips and add testing.

1. Open the Chat view and select **Agent** from the chat mode dropdown.

    ![Screenshot of VS Code Copilot Chat view, showing the Agent mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-agent.png)

1. Enter "Make the app a travel blog. Add tests to avoid code regression." in the chat input field and press `kbstyle(Enter)`.

    Note that you don't need to add context to your prompt. Agent mode automatically analyzes the code in your workspace.

1. Copilot iterates to apply code changes and run commands like running tests. Confirm terminal commands by selecting **Continue** in the Chat view.

    ![Screenshot of VS Code editor, showing the Chat view asking to confirm running tests in the terminal.](./images/getting-started-chat/copilot-chat-agent-terminal.png)

    Depending on the complexity of your request, Copilot might take a few minutes to complete all tasks. If it encounters issues along the way, it iterates to fix them.

1. Once Copilot completes the tasks, review the changes, and test the app.

    You can also ask Copilot to run the app by giving it a prompt like "Run the app" or "Start the server".

## Congratulations

Congratulations, you successfully used Copilot Chat in VS Code to ask questions and make code edits across your workspace. Continue to experiment with different prompts and chat modes to get the most out of Copilot Chat.

## Additional resources

* [Get an overview of Copilot Chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Use chat for asking questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
* [Start an agentic coding workflow](/docs/copilot/chat/chat-agent-mode.md)
