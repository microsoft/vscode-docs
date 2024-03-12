---
Order: 
Area: copilot
TOCTitle: @workspace overview
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: @workspace Copilot chat participant
DateApproved: 02/28/2024
MetaDescription: Overview of how the @workspace Copilot chat participants works and how it manages context.
---
# How the @workspace Copilot chat participant works

You can include a chat participant, such as `@workspace` or `@vscode`, in your Copilot Chat prompt in Visual Studio Code. They can help with responding to domain-specific questions. The `@workspace` chat participant uses your VS Code workspace as context. It can provide answers that are relevant and grounded in your codebase, rather than giving general answers. You reference the chat participant in Copilot Chat by using the `@` symbol.

With `@workspace`, you can ask different types of questions in Copilot Chat about your VS Code workspace, such as:

- Find something in your codebase: "Where is the code for getting the database connecting string?"
- Get an explanation and code sample based on your code: "How can I add a hover text to a button?"
- Get help for getting started with a new project: "How do I build this project?"

## What context does @workspace have?

## How does @workspace work?

Problem: workspaces can be large, too large for handing as-is to Copilot (limited token size)
Solution: extract only the relevant info from the workspace and pass this as context to Copilot

1. Determine which info would be relevant to answer user's question -> ask Copilot what would be relevant info
1. Gather relevant info
    1. GitHub Code search
    1. TF-IDF
    1. Local embeddings
1. Pass user request to Copilot, and provide the relevant info

## @workspace slash commands

- `/fix`
- `/explain`
- `/new`
- `/newNotebook`
- `/tests`

## Chat context variables

- `#codebase`

## Related resources

- Chat tutorial
- Copilot Chat features
- [Use the Chat Participant API to build a chat extension](/api/extension-guides/chat.md).
