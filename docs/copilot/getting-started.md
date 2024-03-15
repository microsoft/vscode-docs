---
Order: 2
Area: copilot
TOCTitle: Getting started tutorial
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: GitHub Copilot getting started
DateApproved: 02/28/2024
MetaDescription: Get started with GitHub Copilot in Visual Studio Code and create your first AI-powered suggestions in the editor.
---
# Getting started with GitHub Copilot in VS Code

This tutorial walks you through setting up the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension, and discovering the key features of GitHub Copilot in Visual Studio Code. Learn how to get started with AI-powered code suggestions, use chat conversations to refactor your code, and fix code errors with smart actions.

In this tutorial, you're using GitHub Copilot to help you create a `Calculator` class in TypeScript. 

> **Note:** While we're using TypeScript for this tutorial, please note that Copilot is also trained on numerous other languages and a wide variety of frameworks.

For an overview of the GitHub Copilot features in VS Code, see the [GitHub Copilot Overview](/docs/copilot/overview.md).

<iframe width="560" height="315" src="https://www.youtube.com/embed/jXp5D5ZnxGM" title="Get to know GitHub Copilot in VS Code" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Set up VS Code for GitHub Copilot

### Step 1: Set up your GitHub Copilot subscription

If you want to use GitHub Copilot, you either need an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat in a subscription managed by an organization or enterprise.

| Account type | Instructions |
| ------------ | ------------ |
| Personal account | Set up a subscription to **GitHub Copilot Individual** with your personal GitHub account. You can [activate a one-time 30-day trial to evaluate GitHub Copilot](https://github.com/github-copilot/signup).<br/><br/>If you didn't yet activate your free trial for Copilot, the GitHub Copilot extension notifies you in VS Code.<br/>![Copilot sign up notification in VS Code](images/getting-started/copilot-access-toast.png) |
| Member of an organization | You need to be assigned a seat by an organization owner.<br/><br/>You can request access to **GitHub Copilot Business** from the [GitHub Copilot settings](https://github.com/settings/copilot) for your personal account.<br/>![Screenshot of Copilot settings, showing how to request access from an organization.](images/getting-started/request-cfb-access-settings.png) |

Learn more about [billing for GitHub Copilot](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

### Step 2: Install the GitHub Copilot extension

You use the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension to power your artificial intelligence (AI) suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

When you install the GitHub Copilot extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

### Step 3: Sign in to GitHub

To use GitHub Copilot in Visual Studio Code, you must be signed into Visual Studio Code with the same GitHub account that has access to GitHub Copilot.

If you didn't previously authorize VS Code in your GitHub account, you're prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/getting-started/copilot-auth-toast.png)

In your browser, GitHub requests the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

> **Note**: If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account. Use the **Accounts** menu in the Activity bar for signing out of your current GitHub account.

## Get your first code suggestion

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

To get started with GitHub Copilot in VS Code, you don't have to do anything special. As you're typing code in the editor, Copilot automatically presents you code suggestions in the editor to help you code more efficiently.

1. Open Visual Studio Code and create a new TypeScript file `Calculator.ts`.

1. Notice from the status bar that GitHub Copilot is active.

    ![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/getting-started/vscode-status-bar-copilot-active.jpg)

1. In the TypeScript file, start typing the following class definition.

    ```typescript
    class Calculator
    ```

    Copilot automatically suggests a method for our `Calculator` class in gray dimmed text (ghost text). In our example, the `add` method is suggested. The exact suggestions can vary.

    ![Screenshot of VS Code editor, showing Copilot suggesting the `add` method inside the `Calculator` class.](./images/getting-started/copilot-code-completion.png)

1. To accept the suggestion, press the `kbstyle(Tab)` key.

    Congratulations! You've just accepted your first AI-powered inline suggestion. As you continue typing, Copilot updates the inline suggestion accordingly.

1. For any given input, there might be multiple suggestions. Type the following inside the class to add a `fibonacci` method:

    ```typescript
    fibonacci(n: number): number {
    ```

1. Hover over the suggestion in the editor and notice that there are multiple suggestions.

    ![Screenshot of VS Code editor, showing Copilot giving multiple suggestions for `fibonacci` when hovering over it.](./images/getting-started/copilot-code-completion-multiple.png)

    You can use the arrow controls or use the keybindings to show the next (`kb(editor.action.inlineSuggest.showNext)`) or previous (`kb(editor.action.inlineSuggest.showPrevious)`) suggestion.

AI-powered code completions can help you with generating boilerplate or repetitive code, letting you stay in the developer flow and focus on more complex coding tasks.

## Refactor your code through AI chat

As you work on an existing codebase, you often need to refactor or improve existing code. With the [Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension, you can use AI-driven chat conversations in VS Code to ask specific tasks about your code.

Let's use Copilot Chat to help us with generating and refactoring code.

1. First, add a new TypeScript file `server.ts` to your workspace.

    Let's use the Copilot inline chat in the editor to generate a simple Express web server.

1. Now, press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

    With Copilot inline chat you get a chat interface that lets you ask questions about your code by using natural language.

    ![Screenshot of VS Code editor, showing the Copilot inline chat control.](./images/getting-started/copilot-inline-chat.png)

1. Type *"add a simple express web server"* in the chat input field, and press `kbstyle(Enter)` to send the chat request or prompt to Copilot.

    Notice that Copilot returns a streaming response into the editor. The response is an implementation for a simple Node.js Express web server.

    ![Screenshot of VS Code editor, showing the Copilot inline chat response for adding an Express web server.](./images/getting-started/copilot-inline-chat-express-server.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

    Congratulations! You've used GitHub Copilot Chat for generating code using chat and natural language.

    Now, let's use Copilot Chat to help us refactor the code to return a static HTML file as the home page, instead of "Hello, World!".

1. In the editor, select the `app.get('/'`, req, res) method, and then press `kb(inlinechat.start)` to start inline chat.

    By selecting a range of text in the editor, you provide more context to Copilot about your request.

1. Type *"return a static index.html file"* in the chat input field, and press `kbstyle(Enter)` to send the chat request or prompt.

    Notice how Copilot updates the existing method implementation to return an `index.html` file. Optionally, select the **Show changes** button to view a diff view and compare the changes.

    ![Screenshot of VS Code editor, showing the Copilot inline chat suggested changes, highlighting the `Show changes` button.](./images/getting-started/copilot-inline-chat-refactor.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

    Experiment further with Copilot Chat, for example to add more routes to your web server, or ask Copilot Chat to add error handling, and more.

With Copilot Chat you can use a chat conversation and natural language to direct Copilot to perform specific tasks on your codebase. With inline chat, you can stay in the flow of coding, and ask for AI assistance in the moment, when you need it, without switching context.

## Use Copilot Chat for general programming questions

As you're working in a new codebase, or exploring a new programming language, you might have more general questions come up. GitHub Copilot Chat lets you open a chat conversation on the side, and which keeps track of the history of your questions.

1. Open the Chat view from the Activity Bar or press `kb(workbench.action.chat.open)`.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat control in the Activity bar.](./images/getting-started/copilot-chat-view.png)

1. Type "what is recursion?" in the chat input field and press `kb(inlineChat.accept)` to send the request to Copilot.

    ![Screenshot of VS Code editor, showing the Copilot Chat view containing the answer to what recursion is. The result contains both text and a code block.](./images/getting-started/copilot-chat-view-recursion.png)

    Notice how the chat response contains rich results, consisting of text and a code block.

1. You can also drag the Chat view to the Secondary Side bar, for example if you want to view both the Chat view and Explorer view.

    ![Screenshot of VS Code editor, showing the Copilot Chat view in the secondary side bar on the right.](./images/getting-started/copilot-chat-view-secondary-side-bar.png)

## Fix coding errors with Copilot

Aside from inline completions and chat conversations, GitHub Copilot is available in different places and throughout your developer flow in VS Code. You might notice the presence of Copilot functionality through the *sparkle* icon in the VS Code user interface.

One such place is the Copilot coding actions in the editor, whenever there you have a red squiggle because of a compiler error. Let's see how Copilot can help with resolving coding errors.

1. Open the `server.ts` TypeScript file that you created earlier in the editor.

    Notice that the `import express from 'express';` statement contains a red squiggle. If you put the cursor on the red squiggle, you can see the Copilot sparkle appear.

    ![Screenshot of VS Code editor, showing the Copilot sparkle because of an error with the express import statement.](./images/getting-started/copilot-code-action-sparkle.png)

1. Select the sparkle to view the Copilot code actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code editor, showing the Copilot code actions, hihglighting `Fix using Copilot`.](./images/getting-started/copilot-code-action-fix.png)

    Notice that the second argument gets a red squiggle because the method only accepts one argument.

1. Notice that the Copilot inline chat comes up, prepopulated with the error message, and a solution to fix the problem.

    ![Screenshot of VS Code editor, showing the Copilot inline chat proposing to install the express npm package to solve the problem.](./images/getting-started/copilot-code-action-fix-result.png)

    Directly from the chat response, you can optionally select the **Insert into Terminal** button to copy the proposed command in your terminal.

## Congratulations

Congratulations, you've now used artificial intelligence to enhance your coding! In this tutorial, you successfully set up Copilot in VS Code, and used Copilot code completions, Copilot Chat, and code actions to help you code more efficiently.

You've started experimenting with Copilot and there's a lot more you can do with it! To learn more about GitHub Copilot Chat, proceed to the [Copilot Chat Tutorial](/docs/copilot/getting-started-chat.md).
