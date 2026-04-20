---
ContentId: 557a7e74-f77e-488d-90ea-fd2cfecfffda
DateApproved: 4/22/2026
MetaDescription: Overview of chat in VS Code. Learn how to access different chat surfaces, add context, choose a language model, write effective prompts, and review AI-generated changes.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Chat overview

Chat in Visual Studio Code enables you to use natural language for AI-powered coding assistance. Ask questions about your code, get help understanding complex logic, generate new features, fix bugs, and more, all through a conversational interface. This article provides an overview of the chat surfaces, how to add context, choose a language model, write effective prompts, and review AI-generated changes.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## Prerequisites

* Access to [GitHub Copilot](/docs/copilot/setup.md). If you don't have a subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup).

## Access chat in VS Code

VS Code provides multiple ways to start an AI chat conversation, each optimized for different workflows. Use the **Chat** menu in the VS Code title bar or the corresponding keyboard shortcuts.

![Screenshot of the Copilot Chat menu in the VS Code Command Center.](images/copilot-chat/copilot-chat-menu-command-center.png)

| Surface | Shortcut | Best for | Learn more |
|---|---|---|---|
| **Chat view** | `kb(workbench.action.chat.open)` | Multi-turn conversations, agentic workflows, multi-file edits. Also available as an [editor tab or separate window](/docs/copilot/chat/chat-sessions.md#start-a-new-chat-session). | [Chat sessions](/docs/copilot/chat/chat-sessions.md) |
| **Inline chat** | `kb(inlineChat.start)` | In-place code edits and terminal command suggestions. | [Inline chat](/docs/copilot/chat/inline-chat.md) |
| **Quick chat** | `kb(workbench.action.quickchat.toggle)` | Quick questions without leaving your current view. Opens a lightweight chat panel at the top of the editor. | [Quick Chat](/docs/copilot/chat/inline-chat.md#use-quick-chat) |
| **Command line** | `code chat` | Starting chat from outside VS Code. | [CLI docs](/docs/configure/command-line.md#start-chat-from-the-command-line) |

## Submit your first prompt

To see how chat works, try creating a basic app:

1. Open the Chat view by pressing `kb(workbench.action.chat.open)` or selecting **Chat** from the VS Code title bar.

1. Select where you want to run the agent by using the **Agent Target** dropdown. For example, select **Local** to run the agent interactively in the editor with full access to your workspace, tools, and models.

1. Select an agent from the agent picker. For example, select **Agent** to let chat autonomously determine what needs to be done and make changes to your workspace. Learn more about [choosing an agent](/docs/copilot/agents/overview.md#choose-an-agent).

1. Type the following prompt in the chat input field and press `kb(workbench.action.chat.submit)` to submit it:

    ```prompt
    Create a basic calculator app with HTML, CSS, and JavaScript
    ```

    The agent applies changes directly to your workspace and might also run terminal commands, for example, to install dependencies or run build scripts.

1. In the editor, [review the suggested changes](/docs/copilot/chat/review-code-edits.md) and choose to keep or discard them.

> [!TIP]
> For a full hands-on walkthrough, follow the [agents tutorial](/docs/copilot/agents/agents-tutorial.md).

## Configure your chat session

When you start a chat session, the following choices shape how the AI responds:

* **Session type**: determines where the agent runs (locally, in the background, or in the cloud). Learn more about [agent types](/docs/copilot/agents/overview.md#types-of-agents).
* **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent](/docs/copilot/agents/overview.md#choose-an-agent).
* **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/copilot/agents/overview.md#choose-a-permission-level).
* **Language model**: determines which AI model powers the conversation. Learn more about [language models in VS Code](/docs/copilot/customization/language-models.md).

## Add context to your prompts

Providing the right context helps the AI generate more relevant and accurate responses.

* **Implicit context**: VS Code automatically includes the active file, your current selection, and the file name as context. When you use agents, the agent decides autonomously if additional context is needed.

* **`#`-mentions**: type `#` in the chat input to explicitly reference files (`#file`), folders, symbols, your codebase (`#codebase`), terminal output (`#terminalSelection`), or tools like `#fetch`.

* **`@`-mentions**: type `@` to invoke specialized chat participants like `@vscode` or `@terminal`, each optimized for their respective domain.

* **Vision**: attach images, such as screenshots or UI mockups, as context for your prompt.

* **Browser elements** (Experimental): select elements from the [integrated browser](/docs/debugtest/integrated-browser.md) to add HTML, CSS, and screenshot context to your prompt.

Learn more about [managing context for AI](/docs/copilot/chat/copilot-chat-context.md).

## Image carousel (Experimental)

When `setting(imageCarousel.chat.enabled)` is enabled, you can select images or videos in chat responses to open a dedicated carousel view. Media files from tool results (such as the integrated browser, Playwright, or other MCP servers) and inlined in assistant messages are all accessible from the carousel.

![Screenshot showing the image carousel view with multiple images.](../images/chat-sessions/image-carousel.png)

## Review and manage changes

After the AI makes changes to your files, review and accept or discard them.

* **Review inline diffs**: open a changed file to see inline diffs of the applied changes. Use the editor overlay controls to navigate between edits and **Keep** or **Undo** individual changes. For more information, see [reviewing AI-generated code edits](/docs/copilot/chat/review-code-edits.md).

* **Use checkpoints**: VS Code can automatically create snapshots of your files at key points during chat interactions, enabling you to roll back to a previous state. For more information, see [checkpoints and editing requests](/docs/copilot/chat/chat-checkpoints.md).

* **Stage to accept**: staging your changes in the Source Control view automatically accepts any pending edits. Discarding changes also discards pending edits.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](../images/review-code-edits/copilot-edits-file-review-controls.png)

## Get better responses

Chat provides several ways to improve the quality and relevance of AI responses:

* **Write effective prompts**: be specific about what you want, reference relevant files and symbols, and use `/` commands for common tasks. Get inspired by [prompt examples](/docs/copilot/chat/prompt-examples.md) or review the full [prompt engineering guide](/docs/copilot/best-practices.md).

* **Customize the AI**: tailor the AI's behavior to your project by adding [custom instructions](/docs/copilot/customization/custom-instructions.md), creating reusable [prompt files](/docs/copilot/customization/prompt-files.md), or building [custom agents](/docs/copilot/customization/custom-agents.md) for specialized workflows. For example, create a "Code Reviewer" agent that provides feedback on code quality and adherence to your team's coding standards.

* **Extend with tools**: connect [MCP servers](/docs/copilot/customization/mcp-servers.md) or install extensions that contribute tools to give the agent access to external services, databases, or APIs.

For more information, see [customizing AI in VS Code](/docs/copilot/customization/overview.md).

## Troubleshoot chat interactions

Use [Agent Logs and the Chat Debug view](/docs/copilot/chat/chat-debug-view.md) to inspect what happens when you send a prompt. Agent Logs shows a chronological event log of tool calls, LLM requests, and prompt file discovery. The Chat Debug view shows the raw system prompt, user prompt, context, and tool payloads for each interaction. These tools are useful for understanding why the AI responded in a certain way or for troubleshooting unexpected results.

## Related resources

* [Create and manage chat sessions](/docs/copilot/chat/chat-sessions.md)

* [Choose agents and configure permissions](/docs/copilot/agents/overview.md)

* [Prompt examples](/docs/copilot/chat/prompt-examples.md)
