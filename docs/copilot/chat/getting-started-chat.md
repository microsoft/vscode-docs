---
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
DateApproved: 03/05/2025
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

Copilot Chat is a chat interface that lets you interact with GitHub Copilot, to ask and receive answers to coding-related questions. The chat interface provides access to coding information and support without requiring you to navigate documentation or search online forums.

In this tutorial, you'll be creating a simple Node.js web application.

1. Select **Open Chat** from the Copilot menu in the title bar or use the `kb(workbench.action.chat.open)` keyboard shortcut.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat menu in the Command Center.](./images/getting-started-chat/copilot-chat-menu-command-center.png)

    > [!TIP]
    > You can access different Copilot features from the Command Center menu at any time.

1. In the Chat view, select **Ask** from the chat mode dropdown.

    TODO: add screenshot

1. Enter "@workspace /new express with typescript and pug" in the chat input field, and press `kb(workbench.action.chat.submit)` to send the request.

    Notice how this chat prompt is structured to provide clear and concise instructions to Copilot. Let's break it down:

    * `@workspace` is a *chat participant*, which are domain experts that can perform tasks or answer questions in a specific domain. In this case, `@workspace` knows about VS Code workspaces and your codebase.

    * `/new` is a *slash command* that tells the `@workspace` participant that you want to create a new workspace. Slash commands are a shorthand for commonly used instructions. You can enter the `/` symbol in the chat input to get the list of supported commands.

1. Copilot returns a file tree that represents the new workspace files, and a button to create the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing a file tree for a new workspace and a 'Create workspace' button.](./images/getting-started-chat/copilot-chat-view-workspace-file-tree.png)

    You can select any file in the file tree to preview the content before it's actually created. If you're not happy with the generated files, or want something different, you can ask follow-up questions, like `@workspace use ejs` to use EJS instead of Pug.

1. Select **Create workspace** to create a new workspace and select a folder on disk where the workspace should be created.

    When the workspace creation finishes, VS Code reloads with the new workspace.

Congratulations! You've just created a workspace with Copilot Chat by using natural language. The advantage of this approach is that you can tweak your request as you like. Maybe you prefer using Express.js with EJS, or not use Express.js at all and use plain Node.js with Bootstrap. Choose what you prefer most!

## Stay in the flow with Inline Chat

While the Chat view is great for keeping a conversation going with Copilot, having access to chat directly from the editor might be more efficient for particular scenarios. For example, when you're reviewing code changes, writing unit tests, or refactoring code.

Let's look at how to use inline chat for code refactoring.

1. Open the `app.ts` file in the editor and put the cursor on the line where the port number is set (`const port = 3000`).

    For more complex code changes, you can select a block of code to provide more context to Copilot about what you want to change.

1. Press `kb(inlinechat.start)` on your keyboard to bring up Copilot Inline Chat, or right-click and select **Copilot** > **Start in Editor**.

    Copilot Inline Chat enables you to ask questions to Copilot directly from the editor.

    ![Screenshot of VS Code editor, highlighting the Inline Chat popup control.](./images/getting-started-chat/copilot-inline-chat-popup.png)

    Let's now ask Copilot to refactor the code to make the port number configurable.

1. Enter *make configurable* in the chat input field and press `kbstyle(Enter)`.

    Notice how Copilot updates the selected code and suggests reading the port number from an environment variable.

    ![Screenshot of VS Code editor with the suggested code change.](./images/getting-started-chat/copilot-inline-chat-configurable-port.png)

    You can view the applied changes by selecting **More Actions** > **Toggle Changes**.

    ![Screenshot of VS Code Inline Chat, highlighting the 'More Actions' control and diff editor.](./images/getting-started-chat/copilot-inline-chat-show-changes.png)

1. Select **Accept** or **Close** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Rerun Request** button to get another suggestion.

Congratulations on using Copilot Inline Chat in the editor to help you with code refactoring!

## Use smart actions

There are some common scenarios where you might invoke Copilot directly, without having to enter a chat prompt. For example, Copilot can help with adding code documentation, generating unit tests, or help you fix coding errors.

Let's see how to use smart actions to fix a coding error.

1. Open the `app.ts` file and select one of the symbols that has a red squiggle.

1. Select the sparkle icon to view the Copilot code actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code, highlighting the sparkle and Copilot smart actions context menu.](./images/getting-started-chat/copilot-smart-action-fix.png)

1. Copilot Inline Chat comes up, prepopulated with the error message, and a suggestion to resolve the problem.

    ![Screenshot of VS Code Inline Chat, showing the result of the fix smart action.](./images/getting-started-chat/copilot-smart-action-fix-suggestion.png)

    Notice how Copilot uses the `/fix` slash command, followed by the error message. You can also use the `/fix` command directly in the chat input field to get help with fixing coding errors.

In addition to **Fix**, Copilot provides more smart code actions, such as **Explain** (/explain), **Generate Docs** (`/doc`), and **Generate Tests** (`/tests`). You can access these actions via the editor context menu and then selecting **Copilot**.

![Screenshot of VS Code Copilot smart action context menu.](./images/getting-started-chat/copilot-smart-action-menu.png)

And if you come across some block of code that's unclear, just select it and use `/explain` to get Copilot to give you an explanation and help improve your code understanding.

## Add chat context

Previously, you used `@workspace` to ask questions about your workspace. What if you want to ask Copilot a question about something specific, maybe a particular file or a symbol in your code? How can you provide that context to Copilot without having to describe everything extensively in natural language?

Let's ask Copilot about what the purpose of a specific file in the workspace is.

1. Open the Chat view from the Command Center chat menu or press `kb(workbench.action.chat.open)`.

1. Select the **Attach Context** button next to the chat input field to open the context Quick Pick.

    ![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/getting-started-chat/copilot-chat-view-attach-context.png)

    In the context Quick Pick, you can select different types of context to add to your chat prompt, such as a file from your workspace, a symbol, the current selection, and more.

1. In the context Quick Pick, start typing `index.ts`, and then select the `src\types\index.ts` file.

    ![Screenshot of VS Code context Quick Pick, highlighting the selected 'index.ts' file.](./images/getting-started-chat/copilot-chat-view-attach-context-file.png)

    After you select the file, notice that the file is added in the Chat view. Optionally, you can add more files or other context types to your chat prompt.

1. Now enter the following prompt in the chat input field: "@workspace what does this do?". Then, press `kbstyle(Enter)` to send the request.

    ![Screenshot of VS Code Copilot Chat view, showing the chat prompt with the attached file context.](./images/getting-started-chat/copilot-chat-view-context-prompt.png)

    Copilot now returns an explanation about the purpose of the code in the selected file.

1. Instead of using the **Attach Context** control, you can also directly reference the different types of context by typing `#` in the chat input field.

    > [!TIP]
    > Add `#codebase` to add your entire workspace as context to your chat prompt. This can be useful if you want to ask questions that relate to different areas of your project.

1. To quickly attach a file as context for your chat prompt, drag and drop a file from the Explorer view onto the Chat view. If the file is open in the editor, you can also drag and drop the editor tab onto the Chat view to attach the file.

    <video src="images/copilot-chat/copilot-attach-dnd.mp4" title="Dragging files and editors into chat" autoplay loop controls muted></video>

## Congratulations

Congratulations, you successfully used the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension to have AI-powered conversations to help refactor your code, fix problems, or improve your code understanding.

## Additional resources

* Get an overview of [Copilot Chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* Optimize your Copilot experience with [prompt crafting and context setting](/docs/copilot/chat/prompt-crafting.md)
