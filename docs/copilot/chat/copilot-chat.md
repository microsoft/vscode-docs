---
ContentId: 557a7e74-f77e-488d-90ea-fd2cfecfffda
DateApproved: 10/09/2025
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

Press `kb(workbench.action.chat.open)` to open the Chat view in a dedicated side panel.

**Use the Chat view for:**

* Ongoing, multi-turn chat conversations
* Switching between different [chat modes](#switch-between-chat-modes) to ask questions, make code edits across files, or start autonomous coding workflows
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

1. Select **Agent** from the chat mode dropdown list.

    In agent mode, chat autonomously determines what needs to be done and makes the necessary changes to your workspace.

1. Type the following prompt in the chat input field and press `kb(workbench.action.chat.submit)` to submit it: `"Create a basic calculator app with HTML, CSS, and JavaScript"`.

    The agent applies changes directly to your workspace and might also run terminal commands, for example, to install dependencies or run build scripts.

1. In the editor, [review the suggested changes](/docs/copilot/chat/review-code-edits.md) and choose to keep or discard them.

1. Ask follow-up questions to enhance the app. For example, you might ask "Add a dark mode toggle" or "style it with a modern design".

    As you continue the conversation, VS Code uses the history of chat prompts and responses as context. This context enables you to have multi-turn conversations with chat to refine and improve the results.

> [!TIP]
> Use voice input to interact with chat in VS Code. Learn more about [using voice input with chat](/docs/configure/accessibility/voice.md).

## Explore different language models

VS Code offers different language models to choose from, each optimized for different tasks. Some models are designed for fast coding tasks, while others excel at complex reasoning and planning.

To change the language model, use the model picker in the chat input field and select the model that best fits your needs.

![Screenshot of the chat model picker in the Chat view, showing a dropdown list of available models.](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/customization/language-models.md).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Switch between chat modes

Chat modes let chat assume a different role or persona optimized for specific tasks. You can switch between chat modes at any time during a chat session.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Select the desired mode from the chat mode dropdown list.

    ![Screenshot showing the Chat view with the chat mode dropdown expanded, displaying different chat mode options.](../images/customization/chat-mode-dropdown.png)

### Built-in chat modes

VS Code provides three built-in chat modes: ask mode, edit mode, and agent mode. For more specialized workflows, you can also create your own [custom chat modes](/docs/copilot/customization/custom-chat-modes.md).

<details>
<summary>Agent mode</summary>

Agent mode is optimized for complex coding tasks based on high-level requirements that might require running terminal commands and tools. The AI operates autonomously, determining the relevant context and files to edit, planning the work needed, and iterating to resolve issues as they arise.

VS Code directly applies code changes in the editor and the editor overlay controls enable you to navigate between the suggested edits and review them. Agent mode might invoke multiple [tools](/docs/copilot/chat/chat-tools.md) to accomplish different tasks.

You can [customize chat with extra tools](/docs/copilot/chat/chat-tools.md) by adding MCP servers or installing extensions that contribute tools.

Open agent mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

### Get started with agent mode

1. Select the **Agent** mode from the chat mode dropdown list in the Chat view.

1. Type your high-level request in the chat input field. For example, you might ask:

    * "Implement a user authentication system with OAuth2 and JWT."
    * "Set up a CI/CD pipeline for this project."

1. Give agent mode more capabilities by [enabling tools](/docs/copilot/chat/chat-tools.md). Select **Configure Tools** and select from the list of built-in tools, MCP tools, or extension-contributed tools.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. As the AI works through your request, it might make code changes, invoke tools, or run terminal commands. Review and confirm these actions, or ask follow-up questions to refine the results.

</details>

<details>
<summary>Ask mode</summary>

Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. Use ask mode when you want to understand how something works, explore ideas, or get help with coding tasks. For larger changes across multiple files or more complex coding tasks, consider using edit mode or agent mode.

In ask mode, responses can contain code blocks that you apply individually to your codebase. This works well for smaller edits within a single file. To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button.

Open ask mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

### Get started with ask mode

1. Select the **Ask** mode from the chat mode dropdown list in the Chat view.

1. Type your question in the chat input field. For example, you might ask:

    * "How do I optimize this function for performance?"
    * "Provide 3 ways to implement a search feature in React."
    * "Where is the db connection configured in this project? #codebase"

1. Optionally, [add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to get more accurate responses.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

</details>

<details>
<summary>Edit mode</summary>

Edit mode is optimized for making code edits across multiple files in your project. Edit mode is useful for coding tasks when you have a good understanding of the changes that you want to make and which files you want to edit.

VS Code directly applies the code changes in the editor, where you can review them. Use the editor overlay controls to navigate between edits with the `kbstyle(Up)` and `kbstyle(Down)` controls and either keep or undo changes.

Open edit mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit)

### Get started with edit mode

1. Select the **Edit** mode from the chat mode dropdown list in the Chat view.

1. Type your request in the chat input field. For example, you might ask:

    * "Refactor the authentication logic to use OAuth2."
    * "Add unit tests for the user service."

1. [Add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to guide the AI to make edits in the right files.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. As the AI makes edits to your files, review and either keep or undo each change using the editor overlay controls.

</details>

## Customize chat for your workflow

By adding context you can get more relevant responses from chat. To further tailor chat to your specific project guidelines and development practices, you can customize chat in VS Code in several ways.

* [**Custom instructions**](/docs/copilot/customization/custom-instructions.md): add persistent instructions that guide chat behavior across all conversations, such as coding standards, preferred frameworks, or architectural guidelines.
* [**Prompt files**](/docs/copilot/customization/prompt-files.md): define reusable prompt templates that you can invoke with `/` commands to standardize common workflows across your team.
* [**Custom chat modes**](/docs/copilot/customization/custom-chat-modes.md): create specialized chat modes for different personas tailored to specific development roles and tasks like code reviews, planning, or documentation.
* [**MCP servers**](/docs/copilot/customization/mcp-servers.md): extend chat with custom capabilities by integrating external tools and services through the Model Context Protocol.

## Write effective prompts

To get the best results from chat, keep these tips in mind when writing prompts:

* **Add context with `#`-mentions**: reference specific files (`#file`), your codebase (`#codebase`), or terminal output (`#terminalSelection`). Type `#` in the chat input field to view all available context items. Learn more about [adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md).

* **Use `/` commands**: type `/` to access common commands like `/new`, or `/explain`, or create your own [custom prompts](/docs/copilot/customization/prompt-files.md).

* **Reference tools**: type `#` followed by a tool name to extend chat capabilities. For example, `#fetch` retrieves web content, and `#githubRepo` searches GitHub repositories. Learn more about [adding and using tools in chat](/docs/copilot/chat/chat-tools.md).

## Next steps

Now that you know the basics, explore more chat capabilities:

* [Create multiple chat sessions](/docs/copilot/chat/chat-sessions.md)
* [Get more relevant responses by adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md)
* [Expand the capabilities of chat with tools from MCP servers or extensions](/docs/copilot/chat/chat-tools.md)

## Additional resources

* Get inspired by the [chat prompt examples](/docs/copilot/chat/prompt-examples.md) that cover common tasks like understanding your codebase, generating code, debugging, working with notebooks, and more.

* Read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

* Check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.
