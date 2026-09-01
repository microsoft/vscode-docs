---
ContentId: 557a7e74-f77e-488d-90ea-fd2cfecfffda
DateApproved: 9/2/2026
MetaDescription: Use chat in {% data variables.product.prodname_vscode_shortname %} to send requests, add context, personalize chat, and review AI-generated changes.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use chat in {% data variables.product.prodname_vscode_shortname %}

Chat in {% data variables.product.prodname_vscode %} lets you use natural language for interacting with AI agents. Ask questions about your code, get help understanding complex logic, generate new features, fix bugs, and more, all through a conversational interface.

This article describes the mechanics of how to interact with chat: how to send a request, add context, choose a language model, personalize chat, write effective prompts, and review AI-generated changes. These mechanics apply to all chat surfaces in {% data variables.product.prodname_vscode_shortname %}. For an overview of what agents can do and how to configure a session, see [Build with agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Ways to chat in {% data variables.product.prodname_vscode_shortname %}

{% data variables.product.prodname_vscode_shortname %} gives you two main surfaces for working with agents, plus lightweight options for quick interactions. You can choose the experience that best fits your current task and workflow, and switch between them as needed.

| Name | Description | How to open |
|------|-------------|-------------|
| [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) | A dedicated, agent-first window for orchestrating tasks across multiple projects. Focus on high-level tasks and outcomes. | <ul><li>Select **Open in Agents** in the {% data variables.product.prodname_vscode_shortname %} title bar</li><li>Use the **Chat: Open {% data variables.copilot.agents_window %}** command</li><li>Run `code --agents`</li></ul> |
| [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) | A code-first experience running in the editor sidebar, to assist you with coding tasks in your workspace. | <ul><li>Select the chat icon in the {% data variables.product.prodname_vscode_shortname %} title bar</li><li>Use the **Chat: Open Chat** command</li><li>Press `kb(workbench.action.chat.open)`</li></ul> |
| [Inline chat](/docs/chat/inline-chat.md) | Quick, in-place code edits or terminal suggestions. | <ul><li>Press `kb(inlineChat.start)`</li></ul> |
| [Quick Chat](/docs/chat/inline-chat.md#use-quick-chat) | A lightweight chat panel at the top of the editor. | <ul><li>Press `kb(workbench.action.quickchat.toggle)`</li></ul> |

## Send a chat request

Type your message in the chat input box and press `kbstyle(Enter)` or select the **Send** button. The agent analyzes your code, makes the changes, and responds with a summary. You can then continue the conversation with follow-up messages. For example, you might start with a request like:

```prompt
Add input validation to the signup form
```

To give extra project-specific context, you can [add context to your prompt](#add-context-to-your-prompts) by referencing files, symbols, or other information with `#`-mentions.

For common tasks, you can use slash commands as shortcuts for frequently used prompts or to invoke [agent skills](/docs/agent-customization/agent-skills.md). Type `/` in the chat input to see all available commands.

You can run multiple sessions in parallel and switch between them without losing context. Learn more in [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

Each session has configuration options that shape how the agent responds, such as the agent harness, agent role, permission level, and language model. Learn how to [choose an agent harness](/docs/agents/run/agent-harnesses.md).

> [!TIP]
> To get the best results, be specific about what you want, provide relevant context, and write clear instructions. For more information, see [Get better responses](#get-better-responses).

## Run terminal commands from chat

Start a message with `!` to run a terminal command directly from the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. The `!` must be the first character and must be followed by a command.

For example, enter the following message to run your tests:

```shell
!npm test
```

The command runs immediately in the session's default shell, without sending the message to the agent or asking for approval. It uses the session folder or worktree as the working directory. The command output and exit status appear in the chat transcript.

> [!NOTE]
> The `!` command is only available in [Agent Host](/docs/agents/concepts/agent-host.md) sessions.

## Send messages while a request is running

You don't have to wait for a response to finish before sending your next message. While a request is in progress, the **Send** button changes to a dropdown that gives you three options for how to handle the new message.

![Screenshot of the Send button dropdown menu showing options to queue, steer, or stop and send a new message.](images/chat-sessions/send-dropdown.png)

* **Add to Queue**: your message waits and sends automatically after the current response completes. The current response finishes uninterrupted.
* **Steer with Message**: signals the current request to yield after finishing the current tool execution. The current response stops and your new message processes immediately. Use this to redirect the agent when it's heading in the wrong direction.
* **Stop and Send**: cancels the current request entirely and sends your new message right away.

The default action for the **Send** button is configurable. Use `setting(chat.requestQueuing.defaultAction)` to set it to `steer` (default) or `queue`.

### Reorder pending messages

When you have multiple pending messages (queued or steering), you can drag and drop them to change the order in which they are processed. A drag handle appears on hover when more than one message of the same type is pending.

![Screenshot of pending messages in the chat input box with drag handles to reorder them.](images/chat-sessions/pending-messages.png)

## Add context to your prompts

Providing the right context helps the AI generate more relevant and accurate responses.

* **Implicit context**: {% data variables.product.prodname_vscode_shortname %} automatically includes the active file, your current selection, and the file name as context. When you use agents, the agent decides autonomously if additional context is needed.

* **`#`-mentions**: type `#` in the chat input to explicitly reference files (`#file`), folders, symbols, your codebase (`#codebase`), terminal output (`#terminalSelection`), or tools like `#fetch`.

* **Vision**: attach images, such as screenshots or UI mockups, as context for your prompt.

* **Browser elements**: select elements from the [integrated browser](/docs/debugtest/integrated-browser.md) to add HTML, CSS, and screenshot context to your prompt.

Learn more about [managing context for AI](/docs/chat/copilot-chat-context.md).

## Image carousel (Experimental)

When `setting(imageCarousel.chat.enabled)` is enabled, you can select images or videos in chat responses to open a dedicated carousel view. Media files from tool results (such as the integrated browser, Playwright, or other MCP servers) and inlined in assistant messages are all accessible from the carousel.

![Screenshot showing the image carousel view with multiple images.](images/chat-sessions/image-carousel.png)

## Review and manage changes

After the AI changes your files, review and validate the result before you commit or integrate it.

* **Review diffs**: select a changed file in the agent's response or use the **Changes** panel in the {% data variables.copilot.agents_window %}. To show a changed-files summary after each request in the {% data variables.copilot.chat_view %}, set `setting(chat.checkpoints.showFileChanges)` to `true`.
* **Request revisions**: send a follow-up prompt, leave feedback in the {% data variables.copilot.agents_window %} diff editor, or edit the files directly.
* **Use checkpoints**: restore an earlier snapshot to revert a request and all later file changes. For more information, see [checkpoints and editing requests](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints).
* **Integrate the result**: commit folder changes with Source Control, or apply or merge changes from an isolated worktree.

For more information, see [reviewing AI-generated code edits](/docs/agents/run/review-code-edits.md).

## Get notified about chat responses

When you're working in another window or application, {% data variables.product.prodname_vscode_shortname %} can send you OS notifications to let you know about important chat events, so you don't have to keep checking back.

Use `setting(chat.notifyWindowOnResponseReceived)` to configure when you receive an OS notification when a chat response is received. The notification includes a preview of the response, and selecting it brings focus to the chat session.

Use `setting(chat.notifyWindowOnConfirmation)` to configure when you receive an OS notification when the agent needs your input or confirmation to continue.

Both settings have three possible values:

* `off`: never show notifications
* `windowNotFocused` (default): show notifications only when the {% data variables.product.prodname_vscode_shortname %} window is not focused
* `always`: show notifications even when the {% data variables.product.prodname_vscode_shortname %} window is in focus

> [!TIP]
> Set the value to `always` if you want to stay aware of chat activity while working in other parts of {% data variables.product.prodname_vscode_shortname %}, such as when running long agent tasks in the background.

## Find text in a chat session

Press `kb(workbench.action.chat.find)` to search the entire conversation. Find is available in the {% data variables.copilot.chat_view %}, chat editor tabs, and the {% data variables.copilot.agents_window %}. It searches prompts and responses, including off-screen content and code blocks.

Use `kb(workbench.action.chat.findNext)` and `kb(workbench.action.chat.findPrevious)` to navigate between matches. When a match is inside a collapsed **Completed N steps** section, navigating to the match expands the section. Use the **Match Case**, **Whole Word**, and **Regular Expression** options to refine the results.

> [!NOTE]
> Find is not available in Quick Chat or inline chat. It does not search text inside tool pills or collapsed reasoning.

## Navigate between prompts in a chat session

Use the following keyboard shortcuts to navigate between prompts in a chat session:

* `kb(workbench.action.chat.previousUserPrompt)`: Go to the previous prompt in the chat session.
* `kb(workbench.action.chat.nextUserPrompt)`: Go to the next prompt in the chat session.
* `kb(workbench.action.chat.previousCodeBlock)`: Go to the previous code block in the chat session.
* `kb(workbench.action.chat.nextCodeBlock)`: Go to the next code block in the chat session.

## Personalize chat

Adjust how chat content appears, add an interactive pet, or set a decorative background in the {% data variables.copilot.agents_window %}.

### Customize the chat display

Use these settings to adjust the chat transcript:

| Display option | Settings |
|----------------|----------|
| Markdown font | Set the font family with `setting(chat.fontFamily)` and the font size with `setting(chat.fontSize)`. |
| Code block font and layout | Set the font family, size, weight, and line height with `setting(chat.editor.fontFamily)`, `setting(chat.editor.fontSize)`, `setting(chat.editor.fontWeight)`, and `setting(chat.editor.lineHeight)`. Control line wrapping with `setting(chat.editor.wordWrap)`. |
| Sticky prompts | Use `setting(chat.stickyScroll.enabled)` to pin the current prompt to the top of the transcript while you scroll. |
| Request timestamps | Use `setting(chat.verbose)` to show or hide request and completion timestamps. Hover over a completion timestamp to view the elapsed response time. |

For more chat preferences, see the [AI settings reference](/docs/agents/reference/ai-settings.md#chat-experience).

### Use the VS Code pet

`feature(chat-pet)`

The interactive VS Code pet sits above the chat input box and reacts to chat activity and your interactions. Type `/vscode-pet` in the chat input to show or hide it. In the new-session view of the {% data variables.copilot.agents_window %}, you can also right-click outside the input box and select the **Pet (/vscode-pet)** item.

Interact with the pet in the following ways:

* Select the pet to trigger a reaction. With the keyboard, press `kbstyle(Tab)` to focus it, and then press `kbstyle(Enter)` or `kbstyle(Space)`.
* Drag the pet around chat and release it to drop it. You can also flick it to throw it.
* When the pet has keyboard focus, press `kbstyle(Left)` or `kbstyle(Right)` to make it hop. Hold `kbstyle(Shift)` with an arrow key to throw it toward a wall.
* Right-click the pet to open its context menu and view achievements, send it on the run, resize it, or switch between Stable and Insiders colors. With the keyboard, focus the pet and press `kbstyle(Shift+F10)`.

Only one pet appears at a time in the active chat surface. Its position and size are shared across chats and windows and persist after you restart {% data variables.product.prodname_vscode_shortname %}.

For a complete list of behaviors, see the [VS Code pet interactions and reactions reference](/docs/agents/reference/chat-pet.md).

### Customize the {% data variables.copilot.agents_window %} chat background

`feature(agents-window-chat-backgrounds)`

Add a decorative background to the chat area of the {% data variables.copilot.agents_window %} without changing chat in the main {% data variables.product.prodname_vscode_shortname %} window.

To set a background, run the **Chat: Set Background...** command from the Command Palette (`kb(workbench.action.showCommands)`) or right-click an empty area of the chat. Then, choose one of these options:

* **Codicons**: use a theme-aware pattern of built-in {% data variables.product.prodname_vscode_shortname %} icons.
* **Image...**: select an image from your machine.
* **Recently used**: reuse one of your five most recent background images.

For an image background, run **Chat: Change Background Layout...** to repeat, stretch, center, or position the image along an edge or in a corner. Moving through the layout options previews each one. Select an option to save it, or dismiss the picker to restore the previous layout.

To remove the background for the current color theme, run **Chat: Clear Background**.

> [!NOTE]
> Light and dark color themes have separate backgrounds. Background choices are stored on the current machine and don't sync, while the image layout syncs across devices.

Backgrounds are hidden in high contrast themes to preserve chat readability. The background commands are also unavailable while a high contrast theme is active.

## Get better responses

Chat provides several ways to improve the quality and relevance of AI responses:

* **Write effective prompts**: be specific about what you want, reference relevant files and symbols, and use `/` commands for common tasks. Get inspired by [prompt examples](/docs/agents/guides/prompt-examples.md) or review the full [prompt engineering guide](/docs/agents/best-practices.md).

* **Customize the AI**: tailor the AI's behavior to your project by adding [custom instructions](/docs/agent-customization/custom-instructions.md), creating reusable [prompt files](/docs/agent-customization/prompt-files.md), or building [custom agents](/docs/agent-customization/custom-agents.md) for specialized workflows. For example, create a "Code Reviewer" agent that provides feedback on code quality and adherence to your team's coding standards.

* **Extend with tools**: connect [MCP servers](/docs/agent-customization/mcp-servers.md) or install extensions that contribute tools to give the agent access to external services, databases, or APIs.

For more information, see [Customize agent behavior in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/overview.md).

## Troubleshoot chat interactions

Use [Agent Logs and the Chat Debug view](/docs/agents/agent-troubleshooting/chat-debug-view.md) to inspect what happens when you send a prompt. Agent Logs shows a chronological event log of tool calls, LLM requests, and prompt file discovery. The Chat Debug view shows the raw system prompt, user prompt, context, and tool payloads for each interaction. These tools are useful for understanding why the AI responded in a certain way or for troubleshooting unexpected results.

## Support

Support for GitHub Copilot Chat is provided by GitHub and can be reached at <https://support.github.com>.

To learn more about Copilot's security, privacy, compliance, and transparency, see the [GitHub Copilot Trust Center FAQ](https://copilot.github.trust.page/faq).

## Related resources

* [Create and manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)

* [Choose agents and configure permissions](/docs/agents/overview.md)

* [Prompt examples](/docs/agents/guides/prompt-examples.md)
