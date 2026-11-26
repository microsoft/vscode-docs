---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 11/26/2026
MetaDescription: Add files, folders, images, GitHub items, web URLs, and browser content as context to AI prompts in {% data variables.product.prodname_vscode %}.
---
# Add context to chat

Providing relevant context helps the AI give more accurate responses. Add files, folders, editor selections, images, GitHub items, web URLs, and browser content directly to your prompt when you want the AI to consider specific details.

> [!NOTE]
> Unless otherwise noted, the features on this page work in [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot) across both the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). For context pickers that apply only to the deprecated Local harness, see [Local harness context options (Deprecated)](#local-harness-context-options-deprecated).

For background on what context is and how {% data variables.product.prodname_vscode_shortname %} assembles it, see [Context concepts](/docs/agents/concepts/context.md).

## Attach context with #-mentions and Add Context

You can explicitly add context to your prompt by typing `#` followed by the file, folder, or `#selection` you want to mention, or by selecting **Add Context** (`+` icon) in the chat input to open the context picker. You can also paste stack traces, terminal output, or code snippets directly into the chat input, where {% data variables.product.prodname_vscode_shortname %} attaches large pasted blocks cleanly as text context.

![Screenshot of {% data variables.product.prodname_vscode_shortname %} {% data variables.copilot.chat_view %}, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

For a full reference of context items and legacy Local tool names, see the [Tools and context reference](/docs/agents/reference/tools-reference.md).

<a name="add-files-as-context"></a>

### Add files and folders as context

Agents can use workspace search and file-reading tools to gather relevant context automatically. A workspace index helps locate code, but doesn't attach every file to the conversation. Add specific files, folders, or editor selections when you know which sources the agent should consider:

* Type `#` followed by a file or folder name to mention it in your prompt, or type `#selection` to attach the code currently selected in the active editor.

* Drag and drop files or folders from the Explorer view, Search view, or editor tabs onto the {% data variables.copilot.chat_view %} to add them as context.

* Select **Add Context** (`+` icon) and then **Files & Folders** to pick workspace items, or **Files** to choose files from anywhere on disk.

To request a broad search across the repository, describe what you want the agent to find in your prompt. See [workspace search and indexing](/docs/agents/reference/workspace-context.md) for how agents search your project.

#### Attach files from disk

Use the file chooser to attach files outside your workspace, such as a log file, screenshot, or UI mockup from your desktop. You don't need to add their folder to the workspace or open a workspace first.

1. Select **Add Context** (`+` icon) > **Files** in the chat input.

1. Choose one or more files, including text files or supported images, and then select **Attach**.

1. Confirm that the attachments appear in the chat input, then enter a prompt about them.

<!-- TODO: Capture the Files... attachment workflow with files from outside the workspace. -->

If the selected session supports only image attachments, **Files** filters the chooser to supported images. It doesn't enable ordinary local-file transfer for those sessions.

In sandboxed {% data variables.product.prodname_copilot_short %} harness sessions, attaching a file can grant read access for the session without changing sandbox settings. It doesn't grant write permission or override organization restrictions. See [Read attached files and folders](/docs/agents/run/agent-sandboxing.md#read-attached-files-and-folders).

### Add project, session, and GitHub context

When you start a session in the {% data variables.copilot.agents_window %}, the first folder or repository you select is the primary execution workspace. It determines where the agent runs and changes files.

You can attach project, session, and {% data variables.product.prodname_github %} context to a request:

* In the {% data variables.copilot.agents_window %}, select **Folder** or **Repository** to attach another project. An attached project provides request context and doesn't become another workspace root.

* In any chat input, select **Add Context** (`+` icon), and then select **Issue** or **Pull Request**. If multiple {% data variables.product.prodname_github %} repositories are available, select a repository before you choose the issue or pull request.

* Paste a {% data variables.product.prodname_github %} issue or pull request URL directly into the prompt. {% data variables.product.prodname_vscode_shortname %} automatically adds the item as a context attachment.

* Select **Add Context** (`+` icon) > **Sessions** to attach a previous compatible {% data variables.product.prodname_copilot_short %} session as context.

You can attach multiple items. The attachments are preserved in a draft and included when you send the request. Learn more about [starting an agent session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session).

With `setting(chat.inlineAttachments.enabled)` enabled (Experimental, on by default), attached context such as files, folders, images, and pull requests appears as inline pills inside your prompt text instead of above the input. For {% data variables.product.prodname_github %} items in the {% data variables.copilot.chat_view %}, hover over a pill or highlight it with the arrow keys to preview its title, status, and description. Select it or press `kbstyle(Enter)` while highlighted to open the item without sending the draft, or press `kbstyle(Escape)` to dismiss the preview.

### Reference content from the web

You can reference web pages in your chat prompts, for example to check the latest API reference or migration guide.

Include the URL directly in your prompt and describe what you want the agent to check. For example:

* `"Summarize the breaking changes in https://learn.microsoft.com/en-us/aspnet/core/migration/80-90 and check whether this project is affected."`

{% data variables.product.prodname_vscode_shortname %} prompts for confirmation before accessing external URLs to protect your privacy and security. Learn more about [configuring URL auto-approval](/docs/agents/run/approvals.md#url-approval) and [using tools with agents](/docs/agents/run/tools.md).

## Vision

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask the agent to implement it.

Select a model that supports images to ask questions about visual content. Vision analyzes image input and doesn't generate image output. To generate an image or ask an image model to edit one, use [image generation](/docs/chat/chat-overview.md#generate-and-edit-images) in a {% data variables.product.prodname_copilot_short %} harness session. To highlight details yourself before sending an image, [mark up the attachment](#mark-up-an-image).

> [!TIP]
> You can drag and drop an image from a web browser onto the {% data variables.copilot.chat_view %} to add it as context.

### Capture the {% data variables.product.prodname_vscode_shortname %} window

On desktop, capture the whole {% data variables.product.prodname_vscode_shortname %} window or a selected area without saving an image file first:

1. Select a model that supports images. **Screenshot Window** is only available when the selected model and session support image attachments.
1. In the chat input, select **Add Context** (`+` icon) > **Screenshot Window**.
1. When the cursor becomes a camera, select anywhere in the window or press `kbstyle(Enter)` to capture the whole window. Drag to capture an area instead. Press `kbstyle(Escape)` to cancel.

The screenshot is attached to the chat input. Add a prompt describing the problem or change you want, then send it.

### Capture another app window

`feature(chat-app-window-screenshots)`

On desktop, attach a screenshot of another app, such as a browser or simulator, to show the agent what you're building.

1. Enable `setting(chat.appWindowScreenshots.enabled)` if needed. It is on by default in Insiders and off by default in Stable.
1. Focus the chat input where you want the screenshot, then switch to the app you want to capture.
1. Press `kb(workbench.action.chat.attachAppWindowScreenshot)`. {% data variables.product.prodname_vscode_shortname %} comes to the front with the screenshot attached. If you use the shortcut while {% data variables.product.prodname_vscode_shortname %} is in front, it captures the app window you just left.

The shortcut works system-wide while the feature is enabled. To choose a window instead, select **Add Context** > **Screenshot App Window**, or run **Chat: Pick App Window to Screenshot** from the Command Palette.

On macOS, follow the setup dialog to grant Screen Recording permission, then restart {% data variables.product.prodname_vscode_shortname %}. On Wayland, choose the window in the system's window picker.

> [!NOTE]
> The shortcut attaches to the chat input that last had focus. In the {% data variables.copilot.agents_window %}, this can differ from the session selected in the sessions list. Confirm the destination before sending.

### Mark up an image

On desktop, draw, add shapes, arrows, or text, and crop any image attached to the chat input. This works for screenshots and for images you paste or drop into chat.

1. Select **Mark Up** (pencil icon) at the end of the image attachment. Alternatively, open the image preview and select **Mark Up** in its toolbar.
1. Use the drawing and crop tools to highlight the relevant details.
1. Select **Done** to update the attached image, then add your prompt and send it.

<!-- TODO: Capture an attached screenshot open in Mark Up, with an annotation and the Done button visible. -->

Taking a screenshot or marking up an image doesn't send a chat request. Review the image for sensitive content before sending it.

## Add browser context

Use the [integrated browser](/docs/debugtest/integrated-browser.md) to preview web pages and attach information from the current page to a prompt.

The browser toolbar has an **Add to Chat** split button with actions that let you attach different types of context from the current page to your chat prompt:

* **Add Element to Chat**: select HTML elements from the page to add as context, including their CSS styles and screenshots.
* **Add Screenshot to Chat**: capture a screenshot of the current browser viewport and attach it as an image.
* **Add Console Logs to Chat**: capture console output from the page and attach it as context for debugging runtime errors.

Learn how to [add browser context to chat](/docs/debugtest/integrated-browser.md#add-context-to-ai-chat). To let an agent interact with a page instead of attaching it as prompt context, see [browser tools for agents](/docs/debugtest/integrated-browser.md#browser-tools-for-agents).

<a name="-mentions"></a>

## Local harness context options (Deprecated)

`feature(local-harness)`

The Local harness is deprecated and will be removed. The following context pickers and mentions apply only to Local harness sessions and aren't supported in the default [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot):

| Local-only context option | What to use in the {% data variables.product.prodname_copilot_short %} harness |
|---------------------------|--------------------------------------------------------------------------------|
| **Tool `#`-mentions** (`#codebase`, `#fetch`, `#read/...`, **Add Context** > **Tools**) | Describe what you want in natural language or paste a URL directly so the agent selects its built-in tools. |
| **Code symbols** (`#<symbol>`, **Add Context** > **Symbols**) | Attach the file (`#<file>`) or select the code in the editor and use `#selection`. |
| **Terminal output** (**Add Context** > **Terminal**, terminal command decorations) | Copy and paste terminal output into the prompt, attach a log file with **Add Context** > **Files**, or ask the agent to run the command directly. |
| **Source Control changes** (**Add Context** > **Source Control**, Graph **Add to Chat**) | Mention the commit SHA, branch, or uncommitted changes in your prompt so the agent inspects them with Git. |
| **Problems, Search Results, Open Editors, and Instructions picker** | Ask the agent to inspect current errors or workspace files directly, or attach the specific files you want it to check. |
| **`@-mentions` (Chat participants)** | Ask {% data variables.product.prodname_copilot_short %} directly with relevant files, or use [plugins](/docs/agent-customization/agent-plugins.md), [skills](/docs/agent-customization/agent-skills.md), [MCP servers](/docs/agent-customization/mcp-servers.md), or extension tools. See [Replace chat participants](/docs/agent-customization/migrate-customizations.md#replace-chat-participants). |

Plan to [move from the Local to the Copilot harness](/docs/agents/run/move-to-copilot.md) before the Local harness is removed.

## Next steps

* [Adapt a prompt to your project](/docs/agents/guides/prompt-examples.md#adapt-an-example-to-your-project) with relevant files, errors, and expected results.
* [Explore a codebase](/docs/agents/guides/explore-a-codebase.md) and verify the explanation against source references.
* If the response misses your intent, [get the agent back on track](/docs/agents/guides/get-agent-back-on-track.md) with focused feedback or a fresh conversation.
