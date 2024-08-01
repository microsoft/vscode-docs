---
Order: 1
Area: copilot
TOCTitle: Overview
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: GitHub Copilot overview
DateApproved: 08/01/2024
MetaDescription: Enhance your coding with AI-powered suggestions and chat conversations with GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code

The [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension is an AI pair programmer tool that helps you write code faster and smarter. You can use the Copilot extension in Visual Studio Code to generate code, learn from the code it generates, and even configure your editor.

With GitHub Copilot in VS Code you can:

* Get inline code suggestions while you're writing and iterating on code.
* Start a chat conversation to generate or refactor source code, produce documentation comments, or generate unit tests.
* Get help with fixing errors in your code, or resolve errors while running commands in the terminal.
* Ask questions to help ramp-up on a new code base, or accelerate learning a new programming language or framework.
* Use chat features to discover and configure your VS Code setup.

<iframe width="560" height="315" src="https://www.youtube.com/embed/jXp5D5ZnxGM" title="Get to know GitHub Copilot in VS Code" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

* To use GitHub Copilot, you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization. Sign up for a [GitHub Copilot free trial](https://github.com/login?return_to=%2fgithub-copilot%2fsignup) in your personal account.

Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md).

## Copilot tutorials

* [GitHub Copilot Quickstart](/docs/copilot/getting-started.md) - discover the key features of GitHub Copilot in VS Code.
* [Copilot Chat Tutorial](/docs/copilot/getting-started-chat.md) - get started with AI chat conversations.

## Use cases for GitHub Copilot in VS Code

GitHub Copilot can provide coding assistance in a variety of scenarios:

* [Code completions in the editor](#code-completions-in-the-editor)
* [Answering coding questions](#answering-coding-questions)
* [Code refactoring and improvements](#code-refactoring-and-improvements)
* [Fix issues](#fix-issues)
* [Jumpstart your project](#jumpstart-your-project)
* [Generate unit test cases](#generate-unit-test-cases)
* [Generate code documentation](#generate-code-documentation)
* [Improve your productivity in VS Code](#productivity-improvements)

### Code completions in the editor

* **Copilot suggests code as you type**. Copilot analyzes the context in the file you're editing and related files, and offers suggestions from within the editor. For example, begin typing the name of a method and Copilot suggests the implementation, following your coding style.

    ![Inline chat suggests the implementation of a 'CalculateDaysBetweenDates' JavaScript function](images/overview/js-suggest.png)

### Answering coding questions

* **Provide guidance and support for common coding tasks and challenges**. Ask Copilot about syntax or general programming concepts without requiring to navigate documentation or search online forums. Copilot gives responses in natural language format or in code snippet format. For example, you can ask questions such as "what is recursion?" or "how to create a singleton in Java?".

    ![Copilot Chat answering what a singleton is](images/overview/copilot-chat-singleton.png)

* **Improve code understanding by explaining selected code**. Copilot generates natural language descriptions of the code's functionality and purpose. This can be useful if you want to understand the code's behavior or for non-technical stakeholders who need to understand how the code works.

    ![Inline chat explaining which sorting algorithm is used in the selected text](images/overview/inline-chat-question-example.png)

* **Provide guidance that is specific to your codebase**. Copilot has the context of your workspace and can give step-by-step guidance and code samples that are tailored to your project. For example, "how to add a contacts page?" or "how do I read customer data from the database?".

    ![Copilot Chat provides step-by-step guidance about adding a page to an Express app](images/overview/copilot-chat-view-add-page.png)

### Code refactoring and improvements

* **Provide suggestions for implementing code refactorings**. Copilot suggests refactorings using the context of your codebase. For example, ask Copilot to refactor a function to not use recursion, or to suggest an algorithm that can improve performance.

    ![Inline chat refactoring to use different sorting algorithm](images/overview/inline-chat-convert-sort.png)

* **Suggest potential improvements to selected code**, such as improved handling of errors and edge cases, or changes to the logical flow to make the code more readable.

    ![Copilot inline chat suggesting improvements to error handling](images/overview/copilot-inline-chat-error-handling.png)

### Fix issues

* **Propose a fix for bugs in your code** with the `/fix` command by suggesting code snippets and solutions based on the context of the error or issue. For example, if your code produces an error message or warning, Copilot Chat can suggest possible fixes based on the error message, the code's syntax, and the surrounding code. The changes might consist of changes to variables, control structures, or function calls that could resolve the issue.

    ![Inline chat /fix for an error proposing to install a missing library](images/overview/inline-chat-fix-error-message-example.png)

* **Suggest terminal command fixes**. When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

    ![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/overview/terminal-command-explanation.png)

### Jumpstart your project

* **Generate a new VS Code workspace** for your choice of technologies with `/new` to get started quickly with a new project. Pick and choose your technology stack, preview the workspace files, and let Copilot scaffold the entire workspace for you.

    ![Asking the @workspace agent to scaffold a new Node.js project using TypeScript](images/overview/copilot-chat-view-file-tree-preview.png)

* **Scaffold a new Jupyter notebook by using natural language**. Generate a new notebook that is preconfigured based on a description by using `/newNotebook`. For example, to scaffold a new notebook that loads, inspects, and visualizes a sample dataset, prompt Copilot with "@workspace /newNotebook read titanic dataset with pandas, display key values with seaborn".

    ![Asking the @workspace agent to scaffold a new notebook that reads titanic data, and visualizes with Seaborn](images/overview/copilot-new-notebook.png)

### Generate unit test cases

* **Write unit test cases for your test framework** based on the code open in the editor or the code snippet you highlight in the editor. Copilot identifies your test framework and coding style and generates matching code snippets.

* **Identify and write test cases for edge cases and boundary conditions** that might be difficult to identify manually. For instance, Copilot can suggest test cases for error handling, null values, or unexpected input types.

* **Suggest assertions** that ensure the function is working correctly, based on the code's context and semantics. For example, generate assertions to ensure that function input parameters are valid.

    ![Chat view showing the /tests slash command to generate unit tests for the Divide method in a C# calculator class](images/overview/workspace-agent-tests-example.png)

### Generate code documentation

* **Generate code documentation for multiple languages** for the code open in the editor or the code snippet you highlight in the editor. Use `/doc` or a Copilot smart action to help you generate meaningful code documentation.

    ![Inline chat /doc example to generate documentation code comments for a calculator class](images/overview/inline-chat-doc-example.png)

### Productivity improvements

* **AI-generated commit messages and PR descriptions** based on the code changes in a commit or the changes in a pull request. Use the *sparkle* button in the Source Control view or GitHub PR extension to generate a title and description that summarizes your changes.

    ![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/overview/generate-commit-message.png)

* **Ask help in the Command Palette** to help you find the relevant command in VS Code. You can describe the functionality and Copilot can help identify the matching functionality. For example, type "code preview in scrollbar" in the Command Palette, and Copilot can identify that you're referring to the `editor.minimap` settings.

    ![Chat view with answer to "hide editor overview"](images/overview/copilot-answer-hide-editor-overview.png)

* **Use terminal inline chat** to ask questions about the terminal or how to use specific shell commands. For example, you can ask questions such as "list the top 5 largest files in the src directory", or "how to enable shell integration".

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/overview/terminal-chat-2.png)

* **AI-generated rename suggestions** for symbols in your source code. When you rename a symbol in your code, Copilot suggests a new name based on the context of the symbol and the codebase.

    ![Inline chat suggesting a new name for a symbol in a Python file](images/overview/copilot-inline-chat-rename-suggestion.png)

## Additional resources

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.
