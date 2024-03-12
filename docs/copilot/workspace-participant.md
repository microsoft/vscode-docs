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

The goal of the `@workspace` is to provide answers to questions about your VS Code workspace and your codebase and implicitly uses different sources of information as its context:

- All files in the VS Code workspace, except for files that are included in `.gitignore` files
- Currently selected text in the active editor (`#selection`)
- Currently visible text in the active editor (`#editor`)
- Workspace structure, such as folder and file names

**Note**: `.gitignore` is overridden if you have a file open or have text selected in an ignored file.

If you're using [slash commands](#workspace-slash-commands), only a subset of the context might be used:

| Command | Context |
|-|-|
| `/explain` | <ul><li>Only the text selection in the active editor is used (#selection). To optimize the Copilot chat responses, make sure to expand the text selection to include any relevant information to help Copilot provide a useful response.</li></ul> |
| `/test`    | <ul><li>Current text selection in the active editor.</li></ul><ul><li>If no text is selected, use the contents of the currently active file.</li></ul> |
| `/fix`    | <ul><li>Current text selection in the active editor.</li></ul><ul><li>If no text is selected, use the currently visible text in the editor.</li></ul> |

You can explicitly expand the context by using chat variables, such as `#editor`, `#selection`, or `#file` in your chat prompt. For example, to get an explanation of the currently visible code in the editor, use this chat prompt: `@workspace /explain #editor`.

## How does @workspace work?

Problem: workspaces can be large, too large for handing as-is to Copilot (limited token size)
Solution: extract only the relevant info from the workspace and pass this as context to Copilot

1. Determine which info would be relevant to answer user's question -> ask Copilot what would be relevant info

1. Gather relevant info from the context by using different methods:

    - GitHub Code search (if it's a GitHub repository, and it's indexed by code search)
    - TF-IDF
    - Local embeddings

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
