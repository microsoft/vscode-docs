---
Order: 4
Area: copilot
TOCTitle: Quickstart
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
PageTitle: GitHub Copilot quickstart
DateApproved: 03/05/2025
MetaDescription: Get started with GitHub Copilot in Visual Studio Code and create your first AI-powered suggestions in the editor.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Get started with GitHub Copilot in VS Code

Visual Studio Code has rich AI features powered by GitHub. In this tutorial, you discover how to use AI while coding in the editor, to ask questions about your code, and to start an editing session to make changes across multiple files.

While we're using JavaScript and TypeScript for this tutorial, note that Copilot is also trained on numerous other languages and a wide variety of frameworks.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2q0BoioYSxQ" title="GitHub Copilot Best Practices (what not to do)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

* VS Code installed on your machine. Download it from the [Visual Studio Code website](https://code.visualstudio.com/).

* Access to GitHub Copilot. Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md).

    > [!TIP]
    > If you don't have a Copilot subscription or have a seat assigned by your organization, you can sign up to use Copilot for free directly from within VS Code and get a monthly limit of completions and chat interactions.

## Get your first code suggestion

To get started with AI features in VS Code, you don't have to do anything special. As you're typing code in the editor, Copilot automatically presents you code suggestions (_code completions_) in the editor to help you code more efficiently.

1. Open VS Code and create a new JavaScript file `calculator.js`.

1. In the JavaScript file, start typing the following code:

    ```javascript
    class Calculator
    ```

    Notice that as you type, you automatically get code suggestions for the implementation of the `Calculator` class in gray dimmed text (ghost text). The exact suggestions you receive might vary because large language models are non-deterministic.

    ![Screenshot of VS Code editor, showing Copilot suggesting the `add` method inside the `Calculator` class.](./images/getting-started/copilot-code-completion.png)

1. To accept the suggestion, press the `kbstyle(Tab)` key.

    Congratulations! You've just accepted your first AI-powered code suggestion. As you continue typing, Copilot updates the code suggestion accordingly.

1. For any given input, there might be multiple suggestions. Type the following code inside the class to add a `factorial` method:

    ```javascript
    factorial(n) {
    ```

1. Hover over the suggestion in the editor and notice that there are multiple suggestions.

    ![Screenshot of VS Code editor, showing Copilot giving multiple suggestions for `factorial` when hovering over it.](./images/getting-started/copilot-code-completion-multiple.png)

    You can use the arrow controls or use the keyboard shortcuts to show the next (`kb(editor.action.inlineSuggest.showNext)`) or previous (`kb(editor.action.inlineSuggest.showPrevious)`) suggestion.

AI-powered code completions can help you with generating boilerplate or repetitive code, letting you stay in the developer flow and focus on more complex coding tasks.

## Use editor inline chat to generate a basic web server

With chat-based AI, you can use natural language to ask questions about your code or to ask it to generate code for you. _Editor inline chat_ provides a chat interface directly in the editor, so you can prompt about the code in the active editor.

Let's use editor inline chat to help generate a basic Express web server.

1. First, add a new TypeScript file `server.ts` to your workspace.

1. Now, press `kb(inlinechat.start)` on your keyboard to bring up editor inline chat.

    Editor inline chat gives you a chat interface that lets you ask questions about the code in the active editor or generate code for you.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat control.](./images/getting-started/copilot-inline-chat.png)

1. Type "add a simple express web server" in the chat input field, and press `kbstyle(Enter)` to submit the prompt.

    Notice that the code changes start streaming directly in the editor. The response is an implementation for a simple Node.js Express web server.

    ![Screenshot of VS Code editor, showing the inline chat response for adding an Express web server.](./images/getting-started/copilot-inline-chat-express-server.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

    Congratulations! You've used editor inline chat for generating code using chat and natural language.

## Refactor your code through AI chat

You can also use editor inline chat to refactor or improve existing code in the editor.

Notice that the generated web server is currently using a static port number `3000`. Let's change this to use an environment variable instead.

1. In the editor, select the `3000` port number in the `server.ts` file, and then press `kb(inlinechat.start)` to open inline chat.

1. Type "use an environment variable for the port number" in the chat input field, and press `kbstyle(Enter)` to send the chat request or prompt.

    Notice how the existing code is updated to use an environment variable for the port number.

    ![Screenshot of VS Code editor, showing editor inline chat to use an environment variable for the port number.](./images/getting-started/copilot-inline-chat-refactor-port.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

1. If you're not happy with a proposed change, you can modify the prompt and keep iterating to get a different solution. For example, ask to use a different environment variable name for the port number.

## Use chat for general programming questions

As you're working in a new codebase, or exploring a new programming language, you might have more general coding questions come up. By using chat, you can have a chat conversation on the side, which keeps track of the history of your questions.

1. Open the Chat view from the Copilot menu in the title bar or press `kb(workbench.action.chat.open)`.

    ![Screenshot of the VS Code editor, showing the Copilot menu, highlighting the Open Chat option.](./images/getting-started/copilot-chat-menu-command-center.png)

1. You can use chat in different ways. Select **Ask** from the mode dropdown to ask questions.

    In a later step, you'll use chat to start an editing session and make changes across multiple files.

    ![Screenshot of the Chat view, highlighting the dropdown to to change the chat mode to 'Ask'.](./images/getting-started/copilot-chat-ask-mode.png)

    > [!TIP]
    > You can change the language model that is used in chat by choosing a different model from the dropdown.

1. Type "what is recursion?" in the chat input field and press `kb(workbench.action.chat.submit)` to submit your chat prompt.

    Notice how the chat response contains rich results like Markdown text and code blocks.

    ![Screenshot of VS Code editor, showing the Chat view containing the answer to what recursion is.](./images/getting-started/copilot-chat-view-recursion.png)

1. Follow the steps in the [Chat Tutorial](/docs/copilot/getting-started-chat.md) to learn how you can also use chat to ask questions about your specific codebase.

## Make edits across multiple files

For larger code changes that might involve making edits to multiple files, you can start an AI-powered editing session. Instead of receiving code blocks in the Chat view, the edits are applied directly to your files across your workspace.

Let's start an editing session to return the contents of an HTML file for our web server.

1. Select **Edit** from the mode dropdown in the Chat view.

    ![Screenshot of the Chat view, highlighting the dropdown to to change the chat mode to 'Edit'](./images/getting-started/copilot-chat-edit-mode.png)

1. Notice that the `server.ts` file is automatically added as context for your chat prompt.

    By adding the file as context to your prompt, the AI model can provide more relevant code edits. Optionally, add more context to your prompt with the **Add Context** button.

    ![Screenshot of the Chat view, showing the prompt input field with the `server.ts` file.](./images/getting-started/copilot-edits-working-set.png)

1. Enter _Return a static html page as the home page and implement it._ in the chat input field and press `kbstyle(Enter)` to start a new edit session.

    Notice that multiple edits are applied to your project: the `server.ts` file now returns the newly created `index.html` HTML page.

    ![Screenshot of VS Code editor, showing the chat response for returning a static HTML page in the web server response.](./images/getting-started/copilot-edits-html-response.png)

1. If you're happy with the results, select **Keep** to apply all suggested changes.

    You can also navigate between the different edited files and accept or reject them by using the editor overlay controls.

    ![Screenshot of the Chat view, highlighting the Keep button to apply the changes and the editor overlay controls.](./images/getting-started/copilot-edits-accept.png)

## Fix coding errors with AI

Aside from inline suggestions and chat conversations, AI features are available in different areas throughout your developer flow in VS Code. You might notice the presence of AI functionality through the _sparkle_ icon in the VS Code user interface.

One such place is the editor, whenever there's a red squiggle due to a compiler error. Let's use AI to fix a coding error.

1. Open the `server.ts` TypeScript file that you created earlier in the editor.

    Notice that the `import express from 'express';` statement contains a red squiggle. If you put the cursor on the red squiggle, you can see the sparkle icon appear.

    ![Screenshot of VS Code editor, showing the Copilot sparkle because of an error with the express import statement.](./images/getting-started/copilot-code-action-sparkle.png)

1. Select the sparkle icon to view the AI Code Actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code editor, showing the Copilot code actions, highlighting `Fix using Copilot`.](./images/getting-started/copilot-code-action-fix.png)

1. Notice that editor inline chat comes up, prepopulated with the error message, and a solution to fix the problem.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat proposing to install the express npm package to solve the problem.](./images/getting-started/copilot-code-action-fix-result.png)

    Directly from the chat response, you can optionally select the **Insert into Terminal** button to copy the proposed command in your terminal.

## Next steps

Congratulations, you've now used AI to enhance your coding! In this tutorial, you successfully used AI features in VS Code to get code completions in the editor, and used chat to ask questions and generate code edits.

* To learn more about chat, proceed to the [Copilot Chat Tutorial](/docs/copilot/getting-started-chat.md).

* To learn more about AI code editing, proceed to the [Copilot Edits](/docs/copilot/copilot-edits.md) documentation.

## Related resources

* Check our videos on YouTube about [Copilot Best Practices](https://youtu.be/2q0BoioYSxQ) and [Advanced Features](https://www.youtube.com/watch?v=SLMfhuptCo8).
