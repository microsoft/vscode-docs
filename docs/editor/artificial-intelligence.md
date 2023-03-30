---
Order: 7
Area: editor
TOCTitle: AI Tools
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: Enhance your coding with artificial intelligence
DateApproved: 3/30/2023
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# AI Tools in VS Code

The [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) is an AI pair programmer tool that helps you write code faster and smarter. You can use the Copilot extension in VS Code to generate code, learn from the code it generates, and even configure your editor.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fi3AJZZregI" title="Get Started with the Future of Coding: GitHub Copilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

You'll use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) to power your AI suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the Copilot extension</a>

![Copilot extension in the VS Code Marketplace](images/artificial-intelligence/copilot-extension.png)

To use GitHub Copilot, you need an active GitHub Copilot subscription. In the [content below](#activate-your-free-trial), you'll learn how VS Code will help you activate your free trial directly from VS Code. You can also activate your trial starting from the [GitHub Copilot signup page](https://github.com/github-copilot/signup).

> **Note:** For some of the latest features we'll explore below, you'll need to use the [GitHub Copilot Nightly extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly) and [VS Code Insiders](https://code.visualstudio.com/insiders/). These provide you the latest updates in both Copilot and VS Code overall.

## Sign in and sign up

If you have not previously authorized VS Code in your GitHub account, you will be prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/artificial-intelligence/copilot-auth-toast.png)

In your browser, GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

### Activate your free trial

If you haven't yet activated your free trial for Copilot, the extension will notify you in VS Code. Select **Signup for GitHub Copilot** to activate your trial.

![Copilot sign up notification in VS Code](images/artificial-intelligence/copilot-access-toast.png)

You can learn more about billing for Copilot in the [GitHub Copilot documentation](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Using Copilot

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

There are three main ways to get assistance from Copilot:

* **Inline suggestions:** Harness Copilot's help automatically through suggestions it provides directly inline as you work in your code.
* **Chat view:** Ask Copilot for help with any task or question in the GitHub Copilot Chat view.
* **Inline chat:** Talk with Copilot while writing code, inline in your files.

> **Note:** To get access to the chat view and inline chat, you'll need to sign up for the [GitHub Copilot chat waitlist](https://github.com/github-copilot/chat_waitlist_signup/join). You'll also need to use the [GitHub Copilot Nightly extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly) and [VS Code Insiders](https://code.visualstudio.com/insiders/).

## Inline suggestions

Copilot presents suggestions automatically to help you code more efficiently. There are just 3 steps to harnessing these suggestions:

1. Start writing code (or code-related items, like comments or tests).

Copilot provides suggestions for a variety of languages and frameworks. For any given input, Copilot may offer multiple suggestions. You can select which suggestion to use or reject all suggestions.

2. Receive a Copilot suggestion in gray ghost (faded) text.

Ghost text is placeholder text that will be replaced by input you type or select from Copilot.

As an example, a JavaScript file, you can type the following function header:

```js
function calculateDaysBetweenDates(begin, end) {
```

Copilot will provide a suggestion like the following:

![JavaScript ghost text suggestion](images/artificial-intelligence/js-suggest.png)

3. Choose to accept Copilot's suggestion.

For any given input, Copilot may offer multiple suggestions. When Copilot offers a suggestion, you can use accept it with the `kbstyle(Tab)` key, or hover over the suggestion to see the inline suggestion toolbar:

![JavaScript ghost text suggestion](images/artificial-intelligence/copilot-hover-highlight.png)

In the image above, Copilot presents three suggestions. You can accept the entire suggestion with `kbstyle(Tab)`, or only part of the suggestion with `kbstyle(Ctrl+RightArrow)`. You can switch between suggestions in the suggestion toolbar, or use the keyboard shortcut `kb(editor.action.inlineSuggest.showNext)` instead.

If you don't want to accept any of the suggestions, you can continue typing, and Copilot will continue providing suggestions as you work.

## Chat view

When developing a project or learning something new, it can be a big help to get AI assistance on your questions, big or small. Copilot enables an interactive Chat experience that understands the context of your code, workspace, extensions, settings, and more.

Once you've signed up and been granted access to Copilot chat through the [chat waitlist](https://github.com/github-copilot/chat_waitlist_signup/join), install the [GitHub Copilot Nightly extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly) in [VS Code Insiders](https://code.visualstudio.com/insiders/). You'll be presented a new GitHub Copilot chat view in the Activity Bar:

![Copilot view in VS Code Activity Bar](images/artificial-intelligence/copilot-view.png)

Like other views in VS Code, you can move it anywhere. For example, you can move it to the secondary sidebar so that you can use other views like the Explorer at the same time:

![Copilot view moved to secondary sidebar](images/artificial-intelligence/secondary-sidebar.png)

Copilot will suggest potential questions to get started. You can select any of these questions or use the chat box to type your own:

![Copilot explaining a devcontainer.json file](images/artificial-intelligence/devcontainer-explain.png)

As you continue asking questions, Copilot maintains the history of your conversation, and it'll provide related follow-up questions or commands in its response too.

You can help Copilot provide better answers by upvoting or downvoting responses with the thumbs up and down icons in the upper right of its response. This provides Copilot feedback on how much it helped with your scenario so that it can help you even better in the future.

### Slash commands

To further help Copilot give you more relevant answers, you can choose a topic for your questions through "slash commands."

You can prepend your chat inputs with a specific topic name to help Copilot give you a more relevant response. When you start typing `/`, you’ll see the list of possible topics:

![Copilot slash command list in chat](images/artificial-intelligence/slash-commands.png)

* /explain: Explain step-by-step how the selected code works.
* /fix: Propose a fix for the bugs in the selected code.
* /help: Prints general help about GitHub Copilot.
* /tests: Generate unit tests for the selected code.
* /vscode: Questions about VS Code commands and settings.
* /clear: Clear the session.

![Example using /vscode slash command](images/artificial-intelligence/slash-commands-example.png)

## Inline chat

An additional key functionality of Copilot is answering questions inline as you're coding. This allows you to harness the power of AI while staying in your existing editor workflow.

In any file, you can press `kb(interactiveEditor.start)` on your keyboard to bring up Copilot inline chat:

![Copilot inline chat in devcontainer.json file](images/artificial-intelligence/inline-chat.png)

You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code" or "How do I add functionality to do X?" Several [slash commands](#slash-commands) also work in inline chat.

## Additional resources

Congratulations, you've now used artificial intelligence to enhance your coding!

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code).
