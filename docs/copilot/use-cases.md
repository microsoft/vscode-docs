---
Order: 
Area: copilot
TOCTitle: Use cases
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: GitHub Copilot advanced usage
DateApproved: 02/28/2024
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# GitHub Copilot advanced

<!--  

Use cases for GitHub Copilot:

- Code completions in the editor
    - Copilot suggests code as you type. 
    - receive suggestions from GitHub Copilot either by starting to write the code you want to use, or by writing a natural language comment describing what you want the code to do
    - GitHub Copilot analyzes the context in the file you are editing, as well as related files, and offers suggestions from within your text editor.

- Generating unit test cases
    - help you write unit test cases by generating code snippets based on the code open in the editor or the code snippet you highlight in the editor. 
    - Copilot Chat can also suggest assertions that ensure the function is working correctly, based on the code's context and semantics.
    - help you write test cases for edge cases and boundary conditions that might be difficult to identify manually. For instance, Copilot Chat can suggest test cases for error handling, null values, or unexpected input types,

- Code docs
- Refactorings
- Scaffold notebook
- Scaffold workspace
- Fix coding issues
    - propose a fix for bugs in your code by suggesting code snippets and solutions based on the context of the error or issue.
    - For example, if your code produces an error message or warning, Copilot Chat can suggest possible fixes based on the error message, the code's syntax, and the surrounding code.
    - suggest changes to variables, control structures, or function calls that might resolve the issue and generate code snippets that can be incorporated into the codebase. 
    - 
- Explaining code and suggesting improvements
    -  suggest potential improvements to selected code, such as improved handling of errors and edge cases, or changes to the logical flow to make the code more readable.
    - help explain selected code by generating natural language descriptions of the code's functionality and purpose. This can be useful if you want to understand the code's behavior or for non-technical stakeholders who need to understand how the code works.
    - 

    - Ask Copilot for help with your code. 
    -  ask and receive answers to coding-related questions

- Answer general coding questions
    - ask Copilot Chat for help or clarification on specific coding problems and receive responses in natural language format or in code snippet format. This can be a useful tool for programmers, as it can provide guidance and support for common coding tasks and challenges.
    - access to coding information and support without requiring you to navigate documentation or search online forums.
    - answer a wide range of coding-related questions on topics including syntax, programming concepts, test cases, debugging, and more.
    - Copilot Chat may use syntax highlighting, indentation, and other formatting features to add clarity to the generated response. Depending upon the type of question from the user, links to context that the model used when generating a response, such as source code files or documentation, may also be provided.

- Get help about using VS Code and the VS Code API (@vscode, command palette help)
- Productivity improvements with AI-generated commit messages and PR descriptions
    - Get Copilot to describe the changes in a pull request.
    - 
- Terminal suggestions for failed commands
- 
-->



GitHub Copilot has several advanced features and settings, such as agents and slash commands. This article explains these advanced features in detail.

If you're new to VS Code or GitHub Copilot, you might want to review the [GitHub Copilot Overview](/docs/copilot/overview.md) article first.

## Creating a workspace

You can use `@workspace /new` to scaffold a new project by using a natural language description:

![Asking the @workspace agent to scaffold a new Node.js project using TypeScript](images/use-cases/workspace-agent-new-example.png)

The agent lists the directory structure for the new project. You can then create a new workspace for this project by selecting **Create Workspace**.

Copilot Chat renders a file tree with the proposed directory structure in the chat response. You can select files to open a readonly preview in the editor. If Copilot's initial proposal wasn't quite right, you can ask follow-up questions to help Copilot iterate and improve.

## Fixing code

Several [slash commands](#agents-and-slash-commands) also work in inline chat such as `/explain` to ask Copilot to explain a block of code or `/tests` to generate unit tests.

A useful command is `/fix`, which analyzes the error line or selected code and proposes a fix in a diff view for your review. After reviewing and possibly modifying the generated code, you can choose to **Accept** or **Discard** the fix.

![Inline chat /fix identifying an unassigned variable and proposing a fix in a diff view](images/use-cases/inline-chat-fix-example.png)

If the cursor is on an error line, inline chat can suggest a fix for the error. For example, when you're missing a dependency, the chat response provides a command to install that dependency. You can then use the **Insert into terminal**  button or `kb(workbench.action.chat.runInTerminal) to insert the command in the terminal.

![Inline chat /fix for an error proposing to install a missing library](images/use-cases/inline-chat-fix-error-message-example.png)

## Generating code documentation

It can be tedious to add documentation comments to your code. The Copilot inline chat lets you use the `/doc` slash command to generate documentation for the entire code file or the selection. Copilot Chat supports multiple languages for generating code documentation.

![Inline chat /doc example to generate documentation code comments for a calculator class](images/use-cases/inline-chat-doc-example.png)

## Generating unit tests

The `@workspace /tests` slash command enables you to generate unit tests for your code. When generating the tests, the agent can detect the testing framework you're using and generates new tests in the same style. When you use inline chat, you can use the `/tests` slash command.

![Chat view showing the /tests slash command to generate unit tests for the Divide method in a C# calculator class](images/use-cases/workspace-agent-tests-example.png)

When inline chat proposes creating new files, such as when using the `/tests` slash command, you can choose the file name and location by selecting **Create As** from the **Create** drop down.

## Additional resources

* [Building a GPT-3 app using GitHub Copilot](https://github.blog/2023-07-25-how-to-build-a-gpt-3-app-with-nextjs-react-and-github-copilot/)
* [Write tests using GitHub Copilot](https://www.youtube.com/watch?v=FnJlLruGz5g)
* [Improve code performance using Github Copilot Chat](https://www.youtube.com/watch?v=whhq0-5ibac)
* [Fixing errors using GitHub Copilot](https://www.youtube.com/watch?v=D-gkwzExddk)
* [Getting help from GitHub Copilot Chat to make your code more accessible](https://github.blog/2023-10-09-prompting-github-copilot-chat-to-become-your-personal-ai-assistant-for-accessibility/)



<!-- 
## Other Copilot uses

In addition to inline completions and chat, GitHub Copilot can help with other development tasks and workflows. For example, Copilot can help with writing commit messages, fixing errors, and finding commands.

When Copilot can help with a task or workflow, VS Code displays a **sparkle** icon. Hovering over the sparkle icon describes the Copilot action.

![Sparkle icon in an input box](images/overview/sparkle-icon.png)

### Generate Git commit messages

Copilot can help you write GitHub commit messages. In the Source Control message input box, select the sparkle button at the right and Copilot creates a commit message based on your pending changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/overview/generate-commit-message.png)

If you're using the [GitHub Pull Request and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, there is a sparkle button to fill in both the title and description in the Pull Request **Create** view.

### Terminal Quick Fixes

When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Terminal command failure shows sparkle with Explain using Copilot Quick Fix](images/overview/terminal-quick-fix.png)

Selecting **Explain using Copilot** populates Quick Chat with the `@terminal #terminalLastCommand` agent and variable to help correct the last terminal command error.

![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/overview/terminal-command-explanation.png)

### Command Palette help

When you're looking for a command in the Command Palette (`kb(workbench.action.showCommands)`), you can run **Ask GitHub Copilot** with your search term to help you find the relevant command.

![Command Palette with Ask GitHub Copilot selected to search for "hide editor overview"](images/overview/command-palette-ask-copilot.png)

The **Ask GitHub Copilot** command opens the Chat view and input your search term.

![Chat view with answer to "hide editor overview"](images/overview/copilot-answer-hide-editor-overview.png)

 -->