---
Order: 4
Area: copilot
TOCTitle: Copilot Chat Tutorial
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
PageTitle: Getting started with Copilot Chat
DateApproved: 08/01/2024
MetaDescription: Get started with AI-powered chat conversations with GitHub Copilot in Visual Studio Code, inline while you're coding, or in a separate chat view.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Getting started with GitHub Copilot Chat in VS Code

This tutorial walks you through using the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension in Visual Studio Code. You use AI-powered chat conversations to help with refactoring code, improving your code understanding, and finding your way around configuring VS Code.

If you're new to using GitHub Copilot in VS Code, see the [GitHub Copilot Overview](/docs/copilot/overview.md) or get set up and discover the key capabilities in the [GitHub Copilot Getting Started Tutorial](/docs/copilot/getting-started.md).

## Prerequisites

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

* To use GitHub Copilot, you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

Follow these steps to [set up GitHub Copilot in VS Code](/docs/copilot/setup.md) by signing up for a subscription and installing the Copilot extension in VS Code.

## Get your first Copilot chat conversation

GitHub Copilot Chat is a chat interface that lets you interact with GitHub Copilot, to ask and receive answers to coding-related questions. The chat interface provides access to coding information and support without requiring you to navigate documentation or search online forums.

In this tutorial, you'll be creating a simple Node.js web application. So, let's get started and ask Copilot to tell us more about web frameworks for Node.js.

1. Open the Chat view from the Activity Bar or press `kb(workbench.action.chat.open)`.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat control in the Activity bar.](./images/getting-started-chat/copilot-chat-view.png)

    > **Tip**: You can drag the Chat view to the Secondary side bar to keep the Chat view and Explorer view open at the same time. Learn about [custom layouts and the Secondary side bar](/docs/editor/custom-layout.md#secondary-side-bar).

1. In the chat input field, enter *give a list of nodejs web server frameworks*, and then press `kb(workbench.action.chat.submit)` to send the request to Copilot.

    Copilot returns a list of web frameworks and with some additional information. So, you can search for coding information while you stay in VS Code.

    Note that your results might be different from what is shown in the screenshots. AI models are non-deterministic, which means that they can return different responses when asked the same question. This might be due to additional learning and adaption over time, language variation, changes in context, such as your chat history, and more.

    ![Screenshot of VS Code, showing the Copilot Chat view, showing the chat response and a suggested follow-up question.](./images/getting-started-chat/copilot-chat-view-node-frameworks.png)

    Notice that Copilot also suggests relevant follow-up questions, which you can select to directly submit directly to Copilot.

    > **Tip**: To get help about GitHub Copilot and how to interact with Copilot Chat, you can type `/help` in the chat input field.

1. Let's get more information about Express.js. Enter *how to get started with express* in the chat input field.

    The response contains step-by-step instructions for setting up an Express.js app and might also include code blocks with shell commands or implementation code. Code blocks in the chat response support IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

    ![Screenshot of VS Code Copilot Chat view, showing the chat response with code blocks in the response.](./images/getting-started-chat/copilot-chat-view-express-app.png)

    You can interact with these code blocks by copying the content in the editor or inserting it in the terminal.

    ![Screenshot of VS Code Copilot Chat view, showing the context menu for code blocks.](./images/getting-started-chat/copilot-chat-view-code-block-actions.png)

    > **Tip**: Experiment with different questions and see how Copilot responds. For example, you can ask for only code samples ("give me 3 code samples to create an express app"), or ask how to add basic authentication to an Express app ("how to create an express app with basic auth"), and much more!

## Generate a new workspace

Even to create a simple Express.js application involves creating multiple files: a JavaScript file to set up the server, a `package.json`, HTML (template) files, and more. Rather than asking Copilot to generate each individual file, you can instruct it to create an entire workspace for you.

Let's ask Copilot to generate a workspace for an Express.js and Pug application.

1. Enter *@workspace /new express with typescript and pug* in the chat input field, and press `kb(workbench.action.chat.submit)` to send the request.

    Notice how this chat prompt is structured to provide clear and concise instructions to Copilot. Let's break it down:

    * `@workspace` is a *chat participant*, which are domain experts that can perform tasks or answer questions in a specific domain. In this case, `@workspace` knows about VS Code workspaces and your codebase.

    * `/new` is a *slash command* that tells the `@workspace` participant that you want to create a new workspace. Slash commmands are a shorthand for commonly used instructions. You can enter the `/` symbol in the chat input to get the list of supported commands.

1. Copilot returns a file tree that represents the new workspace files, and a button to create the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing a file tree for a new workspace and a 'Create workspace' button.](./images/getting-started-chat/copilot-chat-view-workspace-file-tree.png)

    You can select any file in the file tree to preview its content.

1. Select **Create workspace** to create a new workspace and select a folder on disk where the workspace should be created.

    When the workspace creation finishes, VS Code reloads with the new workspace.

    ![Screenshot of VS Code, showing the newly created workspace for an Express app.](./images/getting-started-chat/copilot-chat-create-workspace-result.png)

Congratulations! You've just created a workspace with Copilot Chat by using natural language. The advantage of this approach is that you tweak your request as you like. Maybe you prefer using Express.js with EJS, or not use Express.js at all and use plain Node.js with Bootstrap. Choose what you prefer most!

## Use chat participants

Previously, you used `@workspace` to generate a new workspace, but you can also use it to ask questions about the actual code in the workspace.

1. In the Chat view, enter the *@workspace how to add a new page?*

    ![Screenshot of VS Code Copilot Chat view, showing the results for added a page.](./images/getting-started-chat/copilot-chat-view-add-page.png)

    Copilot returns step-by-step instructions for adding a new page that are specific to your code. This is because you added `@workspace` in the chat prompt, which has the context about your specific workspace contents. If you wouldn't include `@workspace`, you would get more generic instructions.

1. Optionally, follow the instructions and add a new page to your app.

    > **Tip**: You can add more details about the type of page you want to add, such as a home page, a contact page, or a product page.

1. There are more chat participants that you can use. Start typing `@` in the chat window to get the list of available chat participants.

    ![Screenshot of VS Code Copilot Chat view, showing the list of chat participants.](./images/getting-started-chat/copilot-chat-view-participants.png)

    > **Note**: The list of participants might vary based on the extensions you have installed in VS Code.

1. Let's use `@vscode` to ask about VS Code. Enter `@vscode how to debug node.js app` in the chat input field.

    You get instructions about how to debug a Node.js app in VS Code, and also get a button to directly access the corresponding VS Code functionality.

    ![Screenshot of VS Code Copilot Chat view, showing results and a button to open the Command Palette in VS Code.](./images/getting-started-chat/copilot-chat-view-node-debugging.png)

## Stay in the flow with inline chat

While the Chat view is great for keeping a conversation going with Copilot, having access to chat directly from the editor might be more efficient for particular scenarios. For example, when you're reviewing code changes, writing unit tests, or refactoring code.

Let's look at how to use chat for code refactoring.

1. Open the `app.ts` file in the editor and put the cursor on the line where the port number is set (`const port = 3000`).

    For more complex code changes, you can select a block of code to provide more context to Copilot about what you want to change.

1. Press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat, or right-click and select **Copilot** > **Start in Editor**.

    Copilot inline chat enables you to ask questions to Copilot directly from the editor.

    ![Screenshot of VS Code editor, highlighting the inline chat popup control.](./images/getting-started-chat/copilot-inline-chat-popup.png)

    Let's now ask Copilot to refactor the code to make the port number configurable.

1. Enter *make configurable* in the chat input field and press `kbstyle(Enter)`.

    Notice how Copilot updates the selected code and suggests reading the port number from an environment variable.

    ![Screenshot of VS Code editor with the suggested code change.](./images/getting-started-chat/copilot-inline-chat-configurable-port.png)

    You can view the applied changes by selecting the **Toggle Changes** control.

    ![Screenshot of VS Code inline chat, highlighting the 'Show changes' button and diff editor.](./images/getting-started-chat/copilot-inline-chat-show-changes.png)

1. Select **Accept** or **Discard** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Rerun Request** button to get another suggestion.

    > **Tip**: Use the thumbs up and thumbs down buttons to provide feedback to Copilot about the suggestions.

Congratulations on using Copilot inline chat in the editor to help you with code refactoring!

## Use smart actions

There are some common scenarios where you might invoke Copilot directly, without having to enter a chat prompt. For example, Copilot can help with adding code documentation, generating unit tests, or help you fix coding errors.

Let's see how to use smart actions to fix a coding error.

1. Open the `app.ts` file and select one of the symbols that has a red squiggle.

1. Select the sparkle icon to view the Copilot code actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code, highlighting the sparkle and Copilot smart actions context menu.](./images/getting-started-chat/copilot-smart-action-fix.png)

1. Copilot inline chat comes up, prepopulated with the error message, and a suggestion to resolve the problem.

    ![Screenshot of VS Code inline chat, showing the result of the fix smart action.](./images/getting-started-chat/copilot-smart-action-fix-suggestion.png)

    Notice how Copilot uses the `/fix` slash command, followed by the error message. You can also use the `/fix` command directly in the chat input field to get help with fixing coding errors.

In addition to **Fix This**, Copilot provides more smart code actions, such as **Explain This**, **Generate Docs** (`/doc`), and **Generate Tests** (`/tests`). You can access these actions via the editor context menu and then selecting **Copilot**.

![Screenshot of VS Code Copilot smart action context menu.](./images/getting-started-chat/copilot-smart-action-menu.png)

And if you come across some block of code that's unclear, use `/explain` to get Copilot to give you an explanation and help improve your code understanding.

## Add chat context

Previously, you used `@workspace` to ask questions about your workspace. What if you want to ask Copilot a question about something specific, maybe a particular file or a symbol in your code? How can you provide that context to Copilot without having to describe everything extensively in natural language?

Let's ask Copilot about what the purpose of a specific file in the workspace is.

1. Open the Chat view from the Activity Bar or press `kb(workbench.action.chat.open)`.

1. Select the **Attach Context** button next to the chat input field to open the context Quick Pick.

    ![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/getting-started-chat/copilot-chat-view-attach-context.png)

    In the context Quick Pick, you can select different types of context to add to your chat prompt, such as a file from your workspace, a symbol, the current selection, and more.

1. Start typing `index.ts` to find the corresponding file, and then select the `src\types\index.ts` file.

    ![Screenshot of VS Code context Quick Pick, highlighting the selected' index.ts' file.](./images/getting-started-chat/copilot-chat-view-attach-context-file.png)

    After you select the file, notice that the file is added in the Chat view. Optionally, you can add more files or other context types to your chat prompt.

1. Now enter the following prompt in the chat input field: *@workspace what does this do*. Then, press `kbstyle(Enter)` to send the request.

    ![Screenshot of VS Code Copilot Chat view, showing the chat prompt with the attached file context.](./images/getting-started-chat/copilot-chat-view-context-prompt.png)

    Copilot now returns an explanation about the purpose of the code in the selected file.

1. Instead of using the **Attach Context** control, you can also reference different types of context by `#` in the chat input field.

    ![Screenshot of VS Code Copilot Chat view, showing the list of chat variables.](./images/getting-started-chat/copilot-chat-view-variables.png)

## Congratulations

Congratulations, you successfully used the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension to have AI-powered conversations to help refactor your code, fix problems, or improve your code understanding.

## Additional resources

* Get an overview of [GitHub Copilot Chat in VS Code](/docs/copilot/copilot-chat.md)
* Optimize your Copilot experience with [prompt crafting and context setting](/docs/copilot/prompt-crafting.md)
