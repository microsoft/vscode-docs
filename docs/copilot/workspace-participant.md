---
Order:
Area: copilot
TOCTitle: Workspace Context
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: Chat using @workspace Context References
DateApproved: 02/28/2024
MetaDescription: Overview of how the @workspace Copilot chat participants works and how it manages context.
---
# How the @workspace Copilot chat participant works

Referencing `@workspace` in Copilot Chat lets you ask questions about your entire codebase. Copilot smartly retrieves relevant files and symbols based on your question, which it then references in its answer. Using `@workspace` references, Copilot Chat can provide in-depth expert help for tasks like:

- Finding existing code in your codebase:
  - `"@workspace where is database connecting string configured?"`
  - `"@workspace is there a library for date validation?"`
  - `"Where are tests defined?"`
- Making plans for larger codebase edits:
  - `"@workspace how can I add a hover text to a button?"`
  - `"@workspace add date validation to #selection"`
  - `"@workspace how do I add a new a new API route?"`
- Explaining higher-level concepts in a codebase:
  - `"@workspace how is authentication implemented?"`
  - `"@workspace which API routes does this service provide?"`
  - `"How do I build this project?"`

## What context does @workspace have?

The goal of the `@workspace` is to provide answers to questions about your full workspace that you have open in VS Code. It indexes different sources of information and applies different search strategies to come up with the most relevant context:

- All files in the VS Code workspace, except for files that are included in `.gitignore` files
- Workspace structure, such as folder and file names
- GitHub's code search index, if the workspace is a GitHub repository and indexed by code search.
- Symbols and definitions in the workspace
- Currently selected text (`#selection`) or visible text in the active editor (`#editor`)

**Note**: `.gitignore` is overridden if you have a file open or have text selected in an ignored file.

## How does @workspace work?

Problem: workspaces can be large, too large for handing as-is to Copilot (limited token size)
Solution: extract only the relevant info from the workspace and pass this as context to Copilot

1. Determine which info would be relevant to answer user's question -> ask Copilot what would be relevant info

1. Gather relevant info from the context by using different methods:

    - GitHub Code search (if it's a GitHub repository, and it's indexed by code search)
    - TF-IDF
    - Local embeddings

1. Pass user request to Copilot, and provide the relevant info

## Tips for using @workspace

- Be specific in your questions, using terms and concepts that are potentially present in your codebase
- Use variables to expand the explicit context on top of what will be automatically included from the codebase, such as `#editor`, `#selection`, or `#file`
- Don't expect statistical analysis, such as "how many times is this function called?" or "how many times is this variable used?"


## @workspace Slash Commands

If you're using [slash commands](#workspace-slash-commands), commands define their own context that is optimized for their specific task:

| Command    | Context                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/explain` | <ul><li>Starts with the text selection in the active editor (#selection). To optimize the Copilot chat responses, make sure to expand the text selection to include any relevant information to help Copilot provide a useful response.</li></ul><ul><li>Looks up the implementations of referenced symbols such as functions and classes, leading to more accurate and useful explanations.</li></ul> |
| `/test`    | <ul><li>Current text selection in the active editor. If no text is selected, use the contents of the currently active file.</li></ul><ul><li>Related existing test files, to understand existing tests and best practices.</li></ul>                                                                                                                                                                   |
| `/fix`     | <ul><li>Current text selection in the active editor. If no text is selected, use the currently visible text in the editor.</li></ul><ul><li>Errors and referenced symbols to understand what needs to be fixed and how.</li></ul>                                                                                                                                                                      |

You can explicitly expand the context by using chat variables, such as `#editor`, `#selection`, or `#file` in your chat prompt. For example, to get an explanation of the currently visible code in the editor, use this chat prompt: `@workspace /explain #editor`.

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
