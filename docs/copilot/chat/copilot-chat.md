---
ContentId: 557a7e74-f77e-488d-90ea-fd2cfecfffda
DateApproved: 02/04/2026
MetaDescription: Get started with GitHub Copilot chat in VS Code. Learn how to access chat and start using natural language to code, understand your codebase, and solve problems.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Get started with chat in VS Code

Chat in Visual Studio Code enables you to use natural language for AI-powered coding assistance. Ask questions about your code, get help understanding complex logic, generate new features, fix bugs, and more - all through a conversational interface.

In this article, you learn how to access the different chat experiences in VS Code, submit your first prompt, write effective prompts to get better results, and customize chat for your workflow.

## Access chat in VS Code

VS Code provides three ways to start an AI chat conversation, each optimized for different workflows and tasks. To access each chat experience, use the Chat menu in the VS Code title bar or the corresponding keyboard shortcuts.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

<details>
<summary>Chat view</summary>

Press `kb(workbench.action.chat.open)` to open the Chat view in a dedicated side panel. If you prefer a larger workspace for chat, you can open it as an editor tab by selecting **New Chat Editor** from the chat menu or as a separate window by selecting **New Chat Window**.

**Use the Chat view for:**

* Ongoing, multi-turn chat conversations
* Switching between different [agents](#switch-between-agents) to ask questions, make code edits across files, or start autonomous coding workflows
* Working on features that span multiple files
* Planning and implementing complex changes

![Screenshot of the Chat view](images/copilot-chat/chat-view.png)

</details>

<details>
<summary>Inline chat</summary>

Press `kb(inlineChat.start)` to start a chat conversation directly in your editor or terminal.

**Use inline chat for:**

* Getting suggestions inline, right where you're working
* Understanding code in your current context
* Getting help with terminal commands and output

![Screenshot of Inline chat](images/copilot-chat/inline-chat.png)

</details>

<details>
<summary>Quick chat</summary>

Press `kb(workbench.action.quickchat.toggle)` to open a lightweight chat overlay.

**Use quick chat for:**

* Quick questions that don't require extended conversation
* Getting answers without changing your current view
* Looking up information while maintaining focus on your work

![Screenshot of Quick Chat](images/copilot-chat/quick-chat.png)

</details>

> [!TIP]
> You can start chat directly from the command line by using the `code chat` command. For more information, see the [VS Code Command Line documentation](/docs/configure/command-line.md#start-chat-from-the-command-line).

## Submit your first chat prompt

Let's start by creating a basic calculator app to see how chat works in VS Code:

1. Open the Chat view by pressing `kb(workbench.action.chat.open)` or selecting **Chat** from the VS Code title bar.

1. Select an agent from the agent picker. For example, select **Agent** to let chat autonomously determine what needs to be done and make changes to your workspace. Learn more about [built-in agents](/docs/copilot/agents/overview.md#built-in-agents).

1. Type the following prompt in the chat input field and press `kb(workbench.action.chat.submit)` to submit it:

    ```prompt
    Create a basic calculator app with HTML, CSS, and JavaScript
    ```

    The agent applies changes directly to your workspace and might also run terminal commands, for example, to install dependencies or run build scripts.

1. In the editor, [review the suggested changes](/docs/copilot/chat/review-code-edits.md) and choose to keep or discard them.

1. Ask follow-up questions to enhance the app. For example, you might ask:

    ```prompt
    Add a dark mode toggle
    ```

    or

    ```prompt
    Style it with a modern design
    ```

    As you continue the conversation, VS Code uses the history of chat prompts and responses as context. This context enables you to have multi-turn conversations with chat to refine and improve the results.

> [!TIP]
> Use voice input to interact with chat in VS Code. Learn more about [using voice input with chat](/docs/configure/accessibility/voice.md).

## Explore different language models

VS Code offers different language models to choose from, each optimized for different tasks. Some models are designed for fast coding tasks, while others excel at complex reasoning and planning.

To change the language model, use the model picker in the chat input field and select the model that best fits your needs.

![Screenshot of the language model picker in the Chat view, showing a dropdown list of available models.](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/customization/language-models.md).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Switch between agents

Agents let chat assume a different role or persona optimized for specific tasks. You can switch between agents at any time during a chat session by selecting a different agent from the agent picker in the Chat view.

![Screenshot showing the Chat view with the agent picker expanded, displaying different agent options.](../images/customization/chat-mode-dropdown.png)

VS Code provides three built-in agents: **Agent**, **Plan**, and **Ask**. Each agent is designed for different types of tasks. For more specialized workflows, you can also create your own [custom agents](/docs/copilot/customization/custom-agents.md).

Learn more about the [built-in agents and their capabilities](/docs/copilot/agents/overview.md#built-in-agents).

## Write effective prompts

To get the best results from chat, keep these tips in mind when writing prompts:

* **Add context with `#`-mentions**: reference specific files (`#file`), your codebase (`#codebase`), or terminal output (`#terminalSelection`). Type `#` in the chat input field to view all available context items. Learn more about [adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md).

* **Use `/` commands**: type `/` to access common commands like `/new`, `/plan`, or `/explain`, or create your own [custom prompts](/docs/copilot/customization/prompt-files.md).

* **Reference tools**: type `#` followed by a tool name to extend chat capabilities. For example, `#fetch` retrieves web content, and `#githubRepo` searches GitHub repositories. Learn more about [adding and using tools in chat](/docs/copilot/agents/agent-tools.md).

## Next steps

Now that you know the basics, explore more chat capabilities:

* [Create multiple chat sessions](/docs/copilot/chat/chat-sessions.md)
* [Get more relevant responses by adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md)
* [Expand the capabilities of chat with tools from MCP servers or extensions](/docs/copilot/agents/agent-tools.md)

## Additional resources

* Get inspired by the [chat prompt examples](/docs/copilot/chat/prompt-examples.md) that cover common tasks like understanding your codebase, generating code, debugging, working with notebooks, and more.

* Read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

* Check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.
