---
Order: 4
Area: copilot
TOCTitle: Quickstart
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: GitHub Copilot quickstart
DateApproved: 12/11/2024
MetaDescription: Get started with GitHub Copilot in Visual Studio Code and create your first AI-powered suggestions in the editor.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Getting started with GitHub Copilot in VS Code

This tutorial walks you through the key features of GitHub Copilot in Visual Studio Code. Learn how to get started with the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension to get AI-powered code suggestions in the editor, use chat conversations to refactor your code, and fix code errors with smart actions.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

While we're using TypeScript for this tutorial, please note that Copilot is also trained on numerous other languages and a wide variety of frameworks.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2q0BoioYSxQ" title="GitHub Copilot Best Practices (what not to do)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

To use GitHub Copilot in VS Code, you need to have the following:

* Access to GitHub Copilot
* GitHub Copilot extensions installed in VS Code

Follow the steps in the [GitHub Copilot set up guide](/docs/copilot/setup.md) to get access to GitHub Copilot and install the Copilot extensions in VS Code.

## Get your first code suggestion

To get started with GitHub Copilot in VS Code, you don't have to do anything special. As you're typing code in the editor, Copilot automatically presents you code suggestions in the editor to help you code more efficiently.

1. Open Visual Studio Code and create a new JavaScript file `calculator.js`.

1. In the JavaScript file, start typing the following code:

    ```javascript
    class Calculator
    ```

    Copilot automatically suggests a method for our `Calculator` class in gray dimmed text (ghost text). In our example, the `add` and `subtract` methods are suggested. The exact suggestions you receive might vary.

    ![Screenshot of VS Code editor, showing Copilot suggesting the `add` method inside the `Calculator` class.](./images/getting-started/copilot-code-completion.png)

1. To accept the suggestion, press the `kbstyle(Tab)` key.

    Congratulations! You've just accepted your first AI-powered inline suggestion. As you continue typing, Copilot updates the inline suggestion accordingly.

1. For any given input, there might be multiple suggestions. Type the following code inside the class to add a `factorial` method:

    ```javascript
    factorial(n) {
    ```

1. Hover over the suggestion in the editor and notice that there are multiple suggestions.

    ![Screenshot of VS Code editor, showing Copilot giving multiple suggestions for `factorial` when hovering over it.](./images/getting-started/copilot-code-completion-multiple.png)

    You can use the arrow controls or use the keyboard shortcuts to show the next (`kb(editor.action.inlineSuggest.showNext)`) or previous (`kb(editor.action.inlineSuggest.showPrevious)`) suggestion.

AI-powered code completions can help you with generating boilerplate or repetitive code, letting you stay in the developer flow and focus on more complex coding tasks.

## Use Inline Chat to generate a basic web server

With Copilot Chat, you can start a chat conversation with Copilot in VS Code to ask specific tasks about your code by using natural language.

Let's use **Inline Chat** to help generate a basic Express web server.

1. First, add a new TypeScript file `server.ts` to your workspace.

1. Now, press `kb(inlinechat.start)` on your keyboard to bring up Copilot Inline Chat.

    Copilot Inline Chat gives you a chat interface that lets you ask questions about the code in the active editor.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat control.](./images/getting-started/copilot-inline-chat.png)

1. Type *"add a simple express web server"* in the chat input field, and press `kbstyle(Enter)` to send the prompt to Copilot.

    Notice that Copilot returns a streaming response in the editor. The response is an implementation for a simple Node.js Express web server.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat response for adding an Express web server.](./images/getting-started/copilot-inline-chat-express-server.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

    Congratulations! You've used Copilot Chat for generating code using chat and natural language.

## Refactor your code through AI chat

You can also use Inline Chat to refactor or improve existing code in the editor.

Notice that our web server is currently using a static port number `3000`. Let's change this to use an environment variable for the port number.

1. In the editor, select the `3000` port number in the `server.ts` file, and then press `kb(inlinechat.start)` to start Inline Chat.

1. Type *"use an environment variable for the port number"* in the chat input field, and press `kbstyle(Enter)` to send the chat request or prompt.

    Notice how Copilot updates the existing code to use an environment variable for the port number.

    ![Screenshot of VS Code editor, showing Inline Chat to use an environment variable for the port number.](./images/getting-started/copilot-inline-chat-refactor-port.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

1. If you're not happy with a proposed change, you can modify the prompt and ask Copilot to provide a different solution.

    For example, you can ask Copilot to use a different environment variable name for the port number.

## Use Copilot Chat for general programming questions

As you're working in a new codebase, or exploring a new programming language, you might have more general coding questions come up. Copilot Chat lets you open a chat conversation on the side, and which keeps track of the history of your questions.

1. Open the Chat view from the Command Center Copilot menu or press `kb(workbench.action.chat.open)`.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the Copilot menu in the Command Center.](./images/getting-started-chat/command-center-open-chat.png)

    > [!TIP]
    > You can access different Copilot features from the Command Center menu at any time.

1. Type "what is recursion?" in the chat input field and press `kb(workbench.action.chat.submit)` to send the request to Copilot.

    ![Screenshot of VS Code editor, showing the Copilot Chat view containing the answer to what recursion is. The result contains both text and a code block.](./images/getting-started/copilot-chat-view-recursion.png)

    Notice how the chat response contains rich results, consisting of text and a code block. The code block in the chat response supports IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

1. Follow the steps in the [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md) to learn how you can also use Copilot Chat to ask questions about your specific codebase.

## Make edits across multiple files with Copilot Edits (preview)

Larger code changes might involve making edits to multiple files. With Copilot Edits, you can get AI-powered suggestions inline in the editor, across multiple files in your workspace. Instead of applying individual code blocks, Copilot Edits makes edits across your workspace.

Let's use Copilot Edits to return the contents of an HTML file in a web server response.

1. Select **Open Copilot Edits** from the Command Center Copilot menu or press `kb(workbench.action.chat.openEditSession)`.

    ![Screenshot showing the Copilot menu in the Command Center, highlighting the Open Edit Session item](images/copilot-edits/copilot-command-center-open-edit-session.png)

1. The Copilot Edits view is opened. Notice that the `server.ts` file is added to the *working set*.

    The working set contains the files that can be modified by Copilot Edits. If the file is not added, use **Add Files...* to add the file to the working set.

    ![Screenshot of the Copilot Edits view, showing the working set with the `server.ts` file.](./images/getting-started/copilot-edits-working-set.png)

1. Enter *Return a static html page as the home page and implement it.* in the chat input field and press `kbstyle(Enter)` to start a new edit session.

    Notice that Copilot Edits makes multiple edits: it updates the `server.ts` file to return a static HTML page, and it also adds a new file `index.html`.

    ![Screenshot of VS Code editor, showing the Copilot Edits response for returning a static HTML page in the web server response.](./images/getting-started/copilot-edits-html-response.png)

1. If you're happy with the results, select **Accept** to apply all suggested changes.

    ![Screenshot of the Copilot Edits view, highlighting the Accept button to apply the changes.](./images/getting-started/copilot-edits-accept.png)

    You can also navigate between the different edited files and accept/discard them by using the editor overlay controls.

    ![Screenshot of the Copilot Edits view, highlighting editor overlay controls to navigate between edits and accept or discard them.](./images/getting-started/copilot-edits-overlay-controls.png)

## Fix coding errors with Copilot

Aside from inline completions and chat conversations, GitHub Copilot is available in different places and throughout your developer flow in VS Code. You might notice the presence of Copilot functionality through the *sparkle* icon in the VS Code user interface.

One such place is the Copilot coding actions in the editor, whenever there you have a red squiggle because of a compiler error. Let's see how Copilot can help with resolving coding errors.

1. Open the `server.ts` TypeScript file that you created earlier in the editor.

    Notice that the `import express from 'express';` statement contains a red squiggle. If you put the cursor on the red squiggle, you can see the Copilot sparkle appear.

    ![Screenshot of VS Code editor, showing the Copilot sparkle because of an error with the express import statement.](./images/getting-started/copilot-code-action-sparkle.png)

1. Select the sparkle to view the Copilot code actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code editor, showing the Copilot code actions, highlighting `Fix using Copilot`.](./images/getting-started/copilot-code-action-fix.png)

1. Notice that the Copilot Inline Chat comes up, prepopulated with the error message, and a solution to fix the problem.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat proposing to install the express npm package to solve the problem.](./images/getting-started/copilot-code-action-fix-result.png)

    Directly from the chat response, you can optionally select the **Insert into Terminal** button to copy the proposed command in your terminal.

## Next steps

Congratulations, you've now used artificial intelligence to enhance your coding! In this tutorial, you successfully set up Copilot in VS Code, and used Copilot code completions, Copilot Chat, and code actions to help you code more efficiently.

* To learn more about Copilot Chat, proceed to the [Copilot Chat Tutorial](/docs/copilot/getting-started-chat.md).

* To learn more about Copilot Edits, proceed to the [Copilot Edits](/docs/copilot/copilot-edits.md) documentation.

## Related resources

Check our [Advanced Features](https://www.youtube.com/watch?v=SLMfhuptCo8) video on YouTube for in-depth coverage of using Copilot for refactoring, context-based suggestions, unit tests, and more.
