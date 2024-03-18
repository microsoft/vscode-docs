---
Order: 11
Area: copilot
TOCTitle: Copilot Chat tutorial
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
PageTitle: Getting started with Copilot Chat
DateApproved: 02/28/2024
MetaDescription: Get started with AI-powered chat conversations with GitHub Copilot in Visual Studio Code, inline while you're coding, or in a separate chat view.
---
# Getting started with GitHub Copilot in VS Code

This tutorial walks you through using the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension in Visual Studio Code. You use AI-powered chat conversations to help with refactoring code, improving your code understanding, and finding your way around configuring VS Code.

If you're new to using GitHub Copilot in VS Code, see the [GitHub Copilot Getting Started](/docs/copilot/getting-started.md) or the [GitHub Copilot Overview](/docs/copilot/overview.md).

## Prerequisites

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

* To use GitHub Copilot, you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/getting-started.md#set-up-vs-code-for-github-copilot).

## Get your first Copilot chat conversation

GitHub Copilot Chat is a chat interface that lets you interact with GitHub Copilot, to ask and receive answers to coding-related questions. The chat interface provides access to coding information and support without requiring you to navigate documentation or search online forums.

In this tutorial, you'll be creating a simple Node.js web application. So, let's get started and ask Copilot to tell us more about web frameworks for Node.js.

1. Open the Chat view from the Activity Bar or press `kb(workbench.action.chat.open)`.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat control in the Activity bar.](./images/getting-started-chat/copilot-chat-view.png)

    > **Tip**: Drag the Chat view to the Secondary Side bar to keep both the Chat view and Explorer view open.

1. In the chat input field, enter *nodejs web server frameworks*, and then press `kb(inlineChat.accept)` to send the request to Copilot.

    Copilot returns a list of web frameworks and with some additional information. So, without leaving VS Code, you can search for coding information while you stay in VS Code. Note that your results might be different from what is shown in the screenshots.

    ![Screenshot of VS Code, showing the Copilot Chat view, showing the chat response and a suggested follow-up question.](./images/getting-started-chat/copilot-chat-view-node-frameworks.png)

    Notice that Copilot also suggests relevant follow-up questions, which you can select to directly submit directly to Copilot.

    > **Tip**: To get help about GitHub Copilot and how to interact with Copilot Chat, you can type `/help` in the chat input field.

1. Let's get more information about Express.js. Enter *how to create an express app* in the chat input field.

    The response contains step-by-step instructions for setting up an Express.js app. Notice that the output combines code blocks with shell commands, and JavaScript code.

    ![Screenshot of VS Code Copilot Chat view, showing the chat response with code blocks in the response.](./images/getting-started-chat/copilot-chat-view-express-app.png)

    You can interact with these code blocks by copying the content in the editor or inserting it in the terminal.

    ![Screenshot of VS Code Copilot Chat view, showing the context menu for code blocks.](./images/getting-started-chat/copilot-chat-view-code-block-actions.png)

## Generate a new workspace

Even to create a simple Express.js application involves creating multiple files: a JavaScript file to set up the server, a `package.json`, HTML (template) files, and more. Rather than asking Copilot to generate each individual file, you can instruct it to create an entire workspace for you.

Let's ask Copilot to generate a workspace for an Express.js and Pug application.

1. Enter *@workspace /new express with typescript and pug* in the chat input field, and press `kb(inlineChat.accept)` to send the request.

    Notice how this chat prompt is precise and concise about its intent, which is to create a workspace for an Express.js web app that uses TypeScript and Pug.

    In the chat prompt, you referred to `@workspace`, which is called a *chat participant*. Participants are domain experts that can perform tasks or answer questions in a specific domain. Specifically, `@workspace` knows about VS Code workspaces and your codebase.

    And with `/new` you can tell the `@workspace` participant about your intent, namely to create a new workspace. These commands are known as *slash commands*. A chat participant can publish slash commands as a shorthand for commonly used instructions. Enter the `/` symbol in the chat input to get the list of supported commands for a participant.

1. Copilot returns a file tree that represents the new workspace files, and a button to create the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing a file tree for a new workspace and a 'Create workspace' button.](./images/getting-started-chat/copilot-chat-view-workspace-file-tree.png)

1. You can select a file in the file tree to preview its content.

    ![Screenshot of VS Code Copilot Chat view, previewing a file in the editor after selecting it in the tree view.](./images/getting-started-chat/copilot-chat-view-file-tree-preview.png)

1. Press the **Create workspace** button to create a new workspace. Select a folder on disk where the workspace should be created.

    When the workspace creation finishes, VS Code reloads with the new workspace.

    ![Screenshot of VS Code, showing the newly created workspace for an Express app.](./images/getting-started-chat/copilot-chat-view-file-tree-preview.png)

Congratulations! You've just created a workspace with Copilot Chat by using natural language. The advantage of this approach is that you tweak your request as you like. Maybe you prefer using Express.js with EJS, or not use Express.js at all and use plain Node.js with Bootstrap. Choose what you prefer most!

## Use chat participants

Previously, you used `@workspace` to generate a new workspace, but you can also use this to ask questions about the actual code in the workspace.

1. In the Chat view, enter the *@workspace how to add a new page?*

1. Notice that Copilot returns step-by-step instructions and code blocks for adding a new page to the application.

    The instructions are specific for your technology selection. This is because you added `@workspace` in the chat prompt, which has the context about your specific workspace contents. If you wouldn't include `@workspace`, you would get more generic instructions.

    ![Screenshot of VS Code Copilot Chat view, showing the results for added a page.](./images/getting-started-chat/copilot-chat-view-add-page.png)

1. Optionally, you can follow the instructions to add a new page to your app.

There are other chat participants available in Copilot Chat:

1. Start typing `@` in the chat window and notice the list of available chat participants.

    For example, `@vscode` knows about using VS Code, and how to use the VS Code API.

    ![Screenshot of VS Code Copilot Chat view, showing the list of chat participants.](./images/getting-started-chat/copilot-chat-view-participants.png)

1. Continue typing and enter `@vscode how to debug node.js app`.

    You get instructions about how to debug a Node.js app in VS Code, and also get a button to directly access the corresponding VS Code functionality.

    ![Screenshot of VS Code Copilot Chat view, showing results and a button to open the Command Palette in VS Code.](./images/getting-started-chat/copilot-chat-view-node-debugging.png)

## Stay in the flow with inline chat

While the Chat view is great for keeping a conversation going with Copilot, having access to chat directly from the editor might be more efficient for particular scenarios.

Let's look at how to use chat for code refactoring.

1. Open the `app.ts` file in the editor and select the line `const port = 3000`

    By selecting a line of code, you can provide more context to Copilot about what we want to change.

    ![Screenshot of VS Code editor, highlighting a selected line in the editor.](./images/getting-started-chat/copilot-inline-chat-selection.png)

1. Then press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

    Copilot inline chat enables you to ask questions to Copilot directly from the editor.

    ![Screenshot of VS Code editor, highlighting the inline chat popup control.](./images/getting-started-chat/copilot-inline-chat-popup.png)

    Let's now ask Copilot to make the port number configurable.

1. Enter *make configurable* in the chat input field and press `kbstyle(Enter)`.

    Notice how Copilot updates the selected code and suggests reading the port number from an environment variable.

    ![Screenshot of VS Code editor with the suggested code change.](./images/getting-started-chat/copilot-inline-chat-configurable-port.png)

    You can view the applied changes in a diff view by selecting the **Show Changes** control.

    ![Screenshot of VS Code inline chat, highlighting the 'Show changes' button and diff editor.](./images/getting-started-chat/copilot-inline-chat-show-changes.png)

1. Select **Accept** or **Discard** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Regenerate** button to get another suggestion.

Congratulations on using Copilot inline chat in the editor to help you with code refactoring!

## Use smart actions

There are some common scenarios where you might invoke Copilot directly, without having to enter a chat prompt. For example, Copilot can help with adding code documentation, or generating a unit test, or help fix coding errors.

1. Open the `app.ts` file and select one of the symbols that has a red squiggle.

1. Select the sparkle to view the Copilot code actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code, highlighting the sparkle and Copilot smart actions context menu.](./images/getting-started-chat/copilot-smart-action-fix.png)

1. Copilot inline chat comes up, prepopulated with the error message, and suggestion to resolve the problem.

    ![Screenshot of VS Code inline chat, showing the result of the fix smart action.](./images/getting-started-chat/copilot-smart-action-fix-suggestion.png)

    Alternately, you can select the code block with errors, right-click to get the editor context menu, and select **Copilot** > **Fix this**.

Copilot provides more smart code actions, such as `/doc` to generate code documentation, or `/tests` to generate unit tests.

![Screenshot of VS Code Copilot smart action context menu.](./images/getting-started-chat/copilot-smart-action-menu.png)

And if you come across some block of code that's unclear, use `/explain` to get Copilot to give you an explanation and help improve your code understanding.

## Provide context by using chat variables

Previously, you used `@workspace` to ask questions about the workspace. What if you want to ask Copilot a question about something specific? How can you provide context to Copilot without having to describe everything in natural language?

Let's use chat variables to ask Copilot about a specific file in our workspace.

1. Open the Chat view from the Activity Bar or press `kb(workbench.action.chat.open)`.

1. Enter *@workspace what does this do #file* in the chat input field, and press `kbstyle(Enter)`.

    You can use the `#` symbol to reference a chat variable. With `#file` you can pass the contents of a file in the workspace to Copilot.

    ![Screenshot of VS Code Copilot Chat view, showing the use of the '#file' variable.](./images/getting-started-chat/copilot-chat-view-file-variable.png)

1. Select the `types/index.ts` file.

    Notice how Copilot provides an explanation about the purpose of the code in the selected file.

    When you type `#` in the chat input field, you can find the list of available chat variables, such as `#selection`, `#editor`, and more.

    ![Screenshot of VS Code Copilot Chat view, showing the list of chat variables.](./images/getting-started-chat/copilot-chat-view-variables.png)

## Congratulations

Congratulations, you successfully used the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension to have AI-powered conversations to help refactor your code, fix problems, or improve your code understanding.
