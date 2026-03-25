---
ContentId: a4e7b2c1-3d5f-4a8e-b9c6-1e2d3f4a5b6c
DateApproved: 3/25/2026
MetaDescription: Learn how to use the artifacts panel in Visual Studio Code to view important resources surfaced by the AI during a chat session.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Artifacts panel (Preview)

The artifacts panel in Visual Studio Code gives the AI a way to surface important resources, such as links, screenshots, plans, and documents, alongside the chat conversation. When the agent identifies key outputs during a session, it can present them in a dedicated panel for quick access.

> [!NOTE]
> The artifacts panel is currently in preview. To enable it, set `setting(chat.artifacts.enabled)` to `true`.

![Screenshot of the artifacts panel in the Chat view, showing example artifacts such as links, images, and documents.](../images/chat-artifacts/chat-artifacts-list.png)

## Types of artifacts

The agent can surface different types of artifacts, depending on the task and context:

* **Links**: URLs or references to web pages or documentation relevant to the conversation.
* **Screenshots and images**: images captured during the session, such as screenshots from the [integrated browser](/docs/debugtest/integrated-browser.md).
* **Plans and documents**: in-memory documents, such as project plans, or files saved in your workspace.

## Use artifacts

When the agent invokes the `#artifacts` tool during a chat session, the artifacts panel appears alongside the conversation. Each artifact has a label and a link to the underlying resource.

* Select an artifact to open the corresponding resource. For example, selecting an image artifact shows a preview, while selecting a document artifact opens the file in the editor.
* Each time the agent sets artifacts, the previous list is replaced with the new one.

## Ask the agent to create artifacts

You can ask the agent to store something as an artifact by describing what you want in your prompt. For example:

* "Take a screenshot of my app and set it as an artifact"
* "Write a project plan and set it as an artifact"
* "Save these links as artifacts"

The agent then uses the `#artifacts` tool to add the resource to the artifacts panel. You don't need to reference the tool directly. Just describe what you want to keep, and the agent determines when to surface it as an artifact.

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Agent tools](/docs/copilot/agents/agent-tools.md)
* [Copilot settings reference](/docs/copilot/reference/copilot-settings.md)
