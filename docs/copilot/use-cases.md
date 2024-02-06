---
Order: 7
Area: copilot
TOCTitle: Advanced
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: GitHub Copilot advanced usage
DateApproved: 02/1/2024
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# GitHub Copilot advanced

GitHub Copilot has several advanced features and settings, such as agents and slash commands. This article explains these advanced features in detail.

If you're new to VS Code or GitHub Copilot, you might want to review the [GitHub Copilot Overview](/docs/copilot/overview.md) article first.

## Agents and slash commands

To further help Copilot give you more relevant answers, you can indicate the scope and intent of your question through **agents** and **slash commands**.

Agents are like experts who have a specialty that they can help you with, and you can talk to them in the chat by mentioning them with the `@` symbol. Currently, there are the following agents:

* `@workspace` has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
* `@vscode` knows about commands and features in the VS Code editor itself, and can help you use them.
* `@terminal` has context about the integrated terminal shell and its contents.

You can prepend your chat inputs with a specific agent to help Copilot give you a more relevant response.

![Asking the @vscode agent how to change the VS Code colors](images/use-cases/agent-example.png)

Agents can also support slash commands for specific types of questions or tasks. For example, `@workspace /explain` can be used to ask Copilot to explain a file or code selection in the context of your open workspace. To see the available agents and slash commands, type `/` for a list.

![Copilot slash command list in chat](images/use-cases/slash-commands.png)

* @workspace /explain: Explain step-by-step how the selected code works.
* @workspace /fix: Propose a fix for the bugs in the selected code.
* @workspace /new: Create a new project based on a natural language description.
* @workspace /newNotebook: Create a new Jupyter Notebook based on your description.
* @workspace /tests: Generate unit tests for the selected code.
* @vscode /api: Questions about VS Code extension development.
* @vscode /search: Generate query parameters for workspace search.
* @terminal: Explain how to do something in the integrated terminal.

## General purpose slash commands

In addition to agent and slash command combinations, there are general purpose slash commands for actions such as clearing the chat session or getting help.

* /help: Prints general help about GitHub Copilot.
* /clear: Clear the session.

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
