---
Order: 1
Area: copilot
TOCTitle: Overview
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: GitHub Copilot overview
DateApproved: 10/29/2024
MetaDescription: Copilot is your AI pair programmer in VS Code. Code faster with completions and Inline Chat. Build features or resolve bugs with Copilot Edits, and explore your codebase using chat.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code

[GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) is your AI pair programmer tool in Visual Studio Code. Get code suggestions as you type or use Inline Chat in the editor to write code faster. Add new functionality or resolve bugs across your project with Copilot Edits, or use natural language in chat to explore your codebase.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

GitHub Copilot can provide assistance in a variety of scenarios.

<div class="card-grid">
<a href="#_code-completions-in-the-editor" class="card">
    <i class="codicon codicon-keyboard"></i>
    <p class="card-title">Get code suggestions as you type</p>
</a>
<a href="#_iterate-on-large-changes-across-multiple-files" class="card">
    <i class="codicon codicon-edit-session"></i>
    <p class="card-title">Make large changes across multiple files</p>
</a>
<a href="#_answer-coding-questions" class="card">
    <i class="codicon codicon-comment-discussion"></i>
    <p class="card-title">Ask questions about your code</p>
</a>
<a href="#_code-refactoring-and-improvements" class="card">
    <i class="codicon codicon-lightbulb"></i>
    <p class="card-title">Refactor and improve your code</p>
</a>
<a href="#_fix-issues" class="card">
    <i class="codicon codicon-debug"></i>
    <p class="card-title">Fix code issues and debugging</p>
</a>
<a href="#_jumpstart-your-project" class="card">
    <i class="codicon codicon-new-file"></i>
    <p class="card-title">Scaffold a new project or files</p>
</a>
<a href="#_generate-unit-test-cases" class="card">
    <i class="codicon codicon-beaker"></i>
    <p class="card-title">Configure and generate tests</p>
</a>
<a href="#_generate-code-documentation" class="card">
    <i class="codicon codicon-book"></i>
    <p class="card-title">Generate code documentation</p>
</a>
<a href="#_productivity-improvements" class="card">
    <i class="codicon codicon-sparkle"></i>
    <p class="card-title">Improve your productivity in VS Code</p>
</a>
</div>

## Getting started

1. Install the GitHub Copilot extensions.

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extensions</a>

1. Sign in with your GitHub account to use Copilot.

    > [!TIP]
    > You can get started for free with the [Copilot Free plan](TODO) if you don't yet have a Copilot subscription. Follow the steps in the [setup guide](/docs/copilot/setup.md) to set up a Copilot subscription.

1. Discover the key features of Copilot in VS Code with our [Copilot Quickstart](/docs/copilot/getting-started.md).

## Keyboard shortcuts

Use the following keyboard shortcuts to start a chat conversation with Copilot:

| Shortcut | Description |
|----------|-------------|
| `kb(workbench.action.chat.open)` | Open the **Chat view** and start a chat conversation with Copilot by using natural language. |
| `kb(workbench.action.chat.openEditSession)` | Open the **Copilot Edits view** and start a code editing session across multiple files. |
| `kb(workbench.action.quickchat.toggle)` | Open **Quick Chat** and ask a quick question to Copilot. |
| `kb(inlinechat.start)` | Start **Inline Chat** to send a chat request to Copilot directly from the editor. Use natural language or use `/` commands to give instructions to Copilot. |

Check our [Copilot cheat sheet](/docs/copilot/copilot-vscode-features.md) for an overview of the key Copilot commands and shortcuts.

## Use cases for GitHub Copilot in VS Code

### Code completions in the editor

* **Copilot suggests code as you type**. Copilot analyzes the context in the file you're editing and related files, and offers suggestions from within the editor. For example, begin typing the name of a method and Copilot suggests the implementation, following your coding style.

    ![Inline chat suggests the implementation of a 'CalculateDaysBetweenDates' JavaScript function](images/overview/js-suggest.png)

### Iterate on large changes across multiple files

* **Start a AI-powered code editing session**. [Copilot Edits](/docs/copilot/copilot-edits.md) brings the conversational flow of Copilot Chat and fast feedback from Inline Chat together in one experience. Have an ongoing, multi-turn chat conversation on the side, while benefiting of inline code suggestions.

    ![Screenshot showing the Copilot Edits response for "Add a feedback field in the contact page" and showing the diff in the editor.](images/copilot-edits/copilot-edits-view-edits-in-file.png)

### Answer coding questions

* **Provide guidance and support for common coding tasks and challenges**. Ask Copilot about syntax or general programming concepts without requiring to navigate documentation or search online forums. Copilot gives responses in natural language format or in code snippet format. For example, you can ask questions such as "what is recursion?" or "how to create a singleton in Java?".

    ![Copilot Chat answering what a singleton is](images/overview/copilot-chat-singleton.png)

* **Improve code understanding by explaining selected code**. Copilot generates natural language descriptions of the code's functionality and purpose. This can be useful if you want to understand the code's behavior or for non-technical stakeholders who need to understand how the code works.

    ![Inline chat explaining which sorting algorithm is used in the selected text](images/overview/inline-chat-question-example.png)

* **Provide guidance that is specific to your codebase**. Copilot has the context of your workspace and can give step-by-step guidance and code samples that are tailored to your project. For example, "how to add a contacts page?" or "how do I read customer data from the database?".

    ![Copilot Chat provides step-by-step guidance about adding a page to an Express app](images/overview/copilot-chat-view-add-page.png)

### Code refactoring and improvements

* **Provide suggestions for implementing code refactorings**. Copilot suggests refactorings using the context of your codebase. For example, ask Copilot to refactor a function to not use recursion, or to suggest an algorithm that can improve performance.

    ![Inline Chat refactoring to use different sorting algorithm](images/overview/inline-chat-convert-sort.png)

* **Suggest potential improvements to selected code**, such as improved handling of errors and edge cases, or changes to the logical flow to make the code more readable.

    ![Copilot Inline Chat suggesting improvements to error handling](images/overview/copilot-inline-chat-error-handling.png)

### Fix issues

* **Propose a fix for bugs in your code** with the `/fix` command by suggesting code snippets and solutions based on the context of the error or issue. For example, if your code produces an error message or warning, Copilot Chat can suggest possible fixes based on the error message, the code's syntax, and the surrounding code. The changes might consist of changes to variables, control structures, or function calls that could resolve the issue.

    ![Inline Chat /fix for an error proposing to install a missing library](images/overview/inline-chat-fix-error-message-example.png)

* **Propose a fix for failing tests** (preview). When you run automated tests for your code, Copilot can suggest code fixes for tests that fail with the `/fixTestFailure` command.

    ![Copilot Chat /fixTestFailure for identifying and suggesting a fix for a failing test](images/overview/copilot-chat-fix-test-failure.png)

* **Suggest terminal command fixes**. When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

    ![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/overview/terminal-command-explanation.png)

### Jumpstart your project

* **Generate a new VS Code workspace** for your choice of technologies with `/new` to get started quickly with a new project. Pick and choose your technology stack, preview the workspace files, and let Copilot scaffold the entire workspace for you.

    ![Asking the @workspace agent to scaffold a new Node.js project using TypeScript](images/overview/copilot-chat-view-file-tree-preview.png)

* **Scaffold a new Jupyter notebook by using natural language**. Generate a new notebook that is preconfigured based on a description by using `/newNotebook`. For example, to scaffold a new notebook that loads, inspects, and visualizes a sample dataset, prompt Copilot with "@workspace /newNotebook download titanic dataset and display key information using MatPlotLib".

    ![Asking the @workspace agent to scaffold a new notebook that reads titanic data, and visualizes with MatPlotLib](images/overview/copilot-new-notebook.png)

### Generate unit test cases

* **Configure your testing framework setup** based on your codebase. For example, if you have a JavaScript and TypeScript project, Copilot will suggest suitable testing frameworks and steps to configure them for your workspace.

    ![Chat view showing the /setupTests slash command to set up a testing framework for JavaScript and TypeScript](images/overview/copilot-chat-setup-tests.png)

* **Write unit test cases for your testing framework** based on the code open in the editor or the code snippet you highlight in the editor. Copilot identifies your testing framework and coding style and generates matching code snippets.

    ![Chat view showing the /tests slash command to generate unit tests for the Divide method in a C# calculator class](images/overview/workspace-agent-tests-example.png)

* **Identify and write test cases for edge cases and boundary conditions** that might be difficult to identify manually. For instance, Copilot can suggest test cases for error handling, null values, or unexpected input types.

* **Suggest assertions** that ensure the function is working correctly, based on the code's context and semantics. For example, generate assertions to ensure that function input parameters are valid.

### Generate code documentation

* **Generate code documentation for multiple languages** for the code open in the editor or the code snippet you highlight in the editor. Use `/doc` or a Copilot smart action to help you generate meaningful code documentation.

    ![Inline chat /doc example to generate documentation code comments for a calculator class](images/overview/inline-chat-doc-example.png)

### Productivity improvements

* **AI-generated commit messages and PR descriptions** based on the code changes in a commit or the changes in a pull request. Use the *sparkle* button in the Source Control view or GitHub PR extension to generate a title and description that summarizes your changes.

    ![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/overview/generate-commit-message.png)

* **Ask help in the Command Palette** to help you find the relevant command in VS Code. You can describe the functionality and Copilot can help identify the matching functionality. For example, type "code preview in scrollbar" in the Command Palette, and Copilot can identify that you're referring to the `editor.minimap` settings.

    ![Chat view with answer to "hide editor overview"](images/overview/copilot-answer-hide-editor-overview.png)

* **AI-generated rename suggestions** for symbols in your source code. When you rename a symbol in your code, Copilot suggests a new name based on the context of the symbol and the codebase.

    ![Inline chat suggesting a new name for a symbol in a Python file](images/overview/copilot-inline-chat-rename-suggestion.png)

* **Semantic search results** (preview). The Search view lists exact text matches across your files, in addition to matches that are semantically relevant based on your search text.

    ![Search view showing semantic search results that are not an exact match for the search criteria.](images/overview/semantic-search-results.png)

* **Use terminal Inline Chat** to ask questions about the terminal or how to use specific shell commands. For example, you can ask questions such as "list the top 5 largest files in the src directory", or "how to enable shell integration".

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/overview/terminal-chat-2.png)

## Next steps

* [Get started with the Copilot in VS Code Quickstart](/docs/copilot/getting-started.md)
* [Get started with editing across multiple files with Copilot Edits](/docs/copilot/copilot-edits.md)
* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/copilot-vscode-features.md)

## Additional resources

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.
