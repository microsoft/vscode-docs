---
Order: 3
Area: copilot
TOCTitle: Copilot Chat tutorial
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
PageTitle: Getting started with Copilot Chat
DateApproved: 12/7/2023
MetaDescription: Get started with AI-powered chat conversations with GitHub Copilot in Visual Studio Code, inline while you're coding, or in a separate chat view.
---
# Getting started with GitHub Copilot in VS Code

This tutorial walks you through using the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension in Visual Studio Code. You use AI-powered chat conversations to help with refactoring code, improving your code understanding, and finding your way around configuring VS Code.

If you're new to using GitHub Copilot in VS Code, see the [GitHub Copilot Getting Started](/docs/copilot/getting-started.md) or the [GitHub Copilot Overview](/docs/copilot/overview.md).

## Prerequisites

If you want to use GitHub Copilot, you either need a subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

To get started, go through the steps to [Set up VS Code for GitHub Copilot](/docs/copilot/getting-started.md#set-up-vs-code-for-github-copilot).

## Install the GitHub Copilot Chat extension

The Chat features are available by installing the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot-chat">Install the GitHub Copilot Chat extension</a>

## Get your first Copilot chat conversation

TODO: -> start with existing code (calculator, add, subtract, factorial)

```typescript
class Calc {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    factorial(a: number): number {
        if (a === 0 || a === 1) {
            return 1;
        }
        return a * this.factorial(a - 1);
    }
}

let calculator = new Calc();
console.log(calculator.add(5, 3));
```

A common cause of errors is when a method receives invalid input. A good practice is to test all input parameters and add error handling. Notice that our `factorial` method doesn't have any error handling, and would actually fail when given a negative number.

Let's use GitHub Copilot to improve our code by adding error handling.

1. In the editor, select the code block for the `factorial` method.

1. Then press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

    With inline chat, you can ask Copilot any questions while you're in the editor writing and iterating on your code.

1. Enter *Add error handling* in the input box and press `kb(Enter)`.

    Copilot sends the request and shows an inline diff of the proposed code changes.

1. Select **Accept** or **Discard** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Regenerate** button to get another suggestion.

## Generate code documentation

To make your code more readable and maintainable, you can add code documentation. This can be a tedious task, so let's use Copilot to help generate documentation comments for our code.

1. In the editor, select the code block for the `add` method.

1. Then press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

1. Enter the */doc* slash command in the input box and press `kb(Enter)`.

    Copilot chat has several slash commands, which are a shorthand notation for command chat instructions. The */doc* command is short for generating documentation comments.

    To view the list of slash commands, enter just */* in the chat input box.

1. Notice that Copilot suggests a documentation comment in the inline diff.

1. Either **Accept** or **Discard** the suggestion.

## Improve your code understanding

So far, you used Copilot to generate code suggestions. Next, you'll use Copilot to help you with code understanding. For example, you might be learning a new programming language, or you're jumping into a new code base.

Let's ask Copilot to help us with better understand the `factorial` method.

1. In the editor, select the code block for the `factorial` method.

1. Then press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

1. Enter */explain* in the chat input box and press `kb(Enter)`.

1. Notice that the Chat view opens automatically, and a request is sent to GitHub Copilot.

    > **Note:** you can open the Chat view directly from the Activity Bar at any time, to start a conversation with GitHub Copilot.

1. Copilot returns a detailed description of what the method does and explains the implementation.

    The Chat view maintains the context of your questions, and lets you ask follow-on questions. For example, in the previous answer, it was stated that the `factorial` method uses recursion, so you might ask *What is recursion*.

1. Let's now ask if Copilot can make our code better by entering *Can you make this code more efficient* in the Chat view input box.

    Notice that Copilot understands that *this code* refers to source code that we referred to earlier, when asking for an explanation.

1. Let's now copy the code block that Copilot returned and use it to improve our code.

    You can also immediately insert the code block in the editor at the cursor location, or insert it in a new file.

## Find your way around VS Code

With GitHub Copilot Chat in VS Code, you can not only ask about your code, but you can also ask questions about VS Code itself. For example, you might be looking for a specific command or setting.

Follow these examples or experiment yourself to let Copilot help you explore VS Code features:

1. In the Chat view, enter the following text: *@vscode How do I disable auto-save?*

    Notice that Copilot returns a JSON fragment for setting the `files.autoSave` value. Also, the result also contains a button for directly opening the Settings editor.

1. In the Chat view, enter the following text: *@vscode How do I change the color of VS Code?*

    Notice that Copilot presents you with a button to open the Command Palette and prepopulates the command.

## Congratulations

Congratulations, you've successfully used the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension to have AI-powered conversations about your improving or explaining your code, and about finding your way around VS Code.

Next, learn more about the features in GitHub Copilot in VS Code in the [GitHub Copilot Overview](/docs/copilot/overview.md).
