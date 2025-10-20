---
ContentId: 2f4a8e9d-3c5b-4f6e-a7d8-1c2b3e4f5a6b
DateApproved: 10/16/2025
MetaDescription: Learn how to use the Chat Debug view to inspect AI requests, responses, system prompts, and tool invocations in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Chat Debug view

The Chat Debug view is a dedicated view in Visual Studio Code where you can see the details of AI requests and responses. This view helps you understand what information is being sent to the language model and how it responds.

This article explains how to open and use the Chat Debug view to inspect AI interactions.

## Why use the Chat Debug view?

The Chat Debug view provides transparency into how interactions with the AI work by showing:

* The system prompt that sets up the AI's behavior
* The user prompt that you submitted
* The context that is sent to the language model
* The detailed response from the language model
* Responses from tools that are invoked as part of the chat request

## Open the Chat Debug view

To open the Chat Debug view:

* Select the overflow menu in the Chat and select **Show Chat Debug View**.

* Run the **Developer: Show Chat Debug View** command from the Command Palette.

The Chat Debug view opens and shows details for each chat request you make.

![Screenshot of the Chat Debug view, showing the details of a chat request and response.](../images/chat-debug-view/chat-debug-view.png)

## Understand the Chat Debug view

The Chat Debug view displays information in a tree structure for each AI request:

* **System prompt**: The instructions that configure the AI's behavior and capabilities
* **User prompt**: Your chat message
* **Context items**: Files, symbols, and other context included in the request
* **Language model response**: The raw response from the AI model
* **Tool invocations**: Details about any tools that were called, including their parameters and results

You can expand each section to see the full details. This is particularly useful when using [agent mode](/docs/copilot/chat/copilot-chat.md#switch-between-chat-modes) where multiple tools might be invoked as part of a single request.

## Related resources

* [Troubleshoot AI in VS Code](/docs/copilot/faq.md#troubleshooting-and-feedback)
* [Security considerations for using AI in VS Code](/docs/copilot/security.md)
