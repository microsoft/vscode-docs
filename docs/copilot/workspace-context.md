---
Order: 7
Area: copilot
TOCTitle: Workspace Context
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: Chat using @workspace Context References
DateApproved: 02/28/2024
MetaDescription: How to use Copilot's @workspace chat to ask questions against your entire codebase.
---
# Making Copilot Chat an expert in your workspace

Referencing `@workspace` in Copilot Chat lets you ask questions about your entire codebase. Based on the question Copilot intelligently retrieves relevant files and symbols, which it then references in its answer as links and code examples. Grounded in `@workspace` references, Copilot Chat becomes a domain expert for tasks like:

- Finding existing code in your codebase:
  - `"@workspace where is database connecting string configured?"` - Explains where and how the database connection is configured
  - `"@workspace how can I validate a date?"` - Finds existing date validation helpers in the codebase
  - `"@workspace where are tests defined?"` - Provides the location of test suites, cases, and related references and configurations
- Making plans for complex code edits:
  - `"@workspace how can I add a rich tooltip to a button?"` - Provides a plan for using the existing tooltip component with button elements
  - `"@workspace add date validation to #selection"` - Plans how to apply the existing date validation to the selected code
  - `"@workspace add a new API route for the forgot password form"` - Outlines where to add the new route and how to connect it to the existing code
- Explaining higher-level concepts in a codebase:
  - `"@workspace how is authentication implemented?"` - Overview of the authentication flow and references to the relevant code
  - `"@workspace which API routes depend on this service?"` - Lists the routes that use the service in the selected code
  - `"How do I build this #codebase?"` - List the steps to build the project based on documentation, scripts, and configurations

## What sources does `@workspace` use for context?

To answer your question, `@workspace` searches through the same sources a developer would use when navigating a codebase in VS Code:

- All files in the workspace, except for files that are included in `.gitignore` files
- Directory structure with nested folder and file names
- GitHub's code search index, if the workspace is a GitHub repository and [indexed by code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom#asking-a-question-about-a-specific-repository-file-or-symbol)
- Symbols and definitions in the workspace
- Currently selected text or visible text in the active editor

**Note**: `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.

## How does `@workspace` finds the most relevant context

Your full VS Code workspace can be too large to pass entirely to GitHub Copilot for responding to your chat prompt. Instead, `@workspace` extracts the most relevant information from the different context sources to ground Copilot's answer.

First, `@workspace` determine which information are needed to answer your prompt, which selects the mix of sources and search strategies it will use.

Next, it performs a combination of search strategies, such as [GitHub's code search index](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search), a lexical text searches over the local index to find local, uncommitted changes, and VS Code's language intelligence to add details like function signatures, parameters, and more.

Finally, all of these pieces of context are ranked, sliced, and summarized by `@workspace`, and then used by GitHub Copilot to answer your question. The responses is marked up with references to files, file ranges, and symbols. This enables you to link directly from the chat response to the corresponding information in your codebase.

## Context for `@workspace` slash commands

`@workspace` provides several *slash commands* as shorthand for commonly used tasks, saving you time and typing effort. Each command defines its own optimized context, often eliminating the need for additional prompting or chat variables. Here are the available slash commands and their contexts:

| Command    | Context |
| ---------- | ------- |
| `/explain` | <ul><li>Starts with the text selection in the active editor (`#selection`). To optimize the Copilot chat responses, make sure to expand the text selection to include any relevant information to help Copilot provide a useful response.</li></ul><ul><li>Looks up the implementations of referenced symbols such as functions and classes, leading to more accurate and useful explanations.</li></ul> |
| `/test`    | <ul><li>Current text selection in the active editor. If no text is selected, use the contents of the currently active file.</li></ul><ul><li>Related existing test files, to understand existing tests and best practices.</li></ul> |
| `/fix`     | <ul><li>Current text selection in the active editor. If no text is selected, use the currently visible text in the editor.</li></ul><ul><li>Errors and referenced symbols to understand what needs to be fixed and how.</li></ul> |

You can explicitly expand the context by using chat variables, such as `#editor`, `#selection`, or `#file` in your chat prompt. For example, to fix an error in the current file based on a pattern from another file, use this chat prompt: `@workspace /fix linting error in the style of #file:form.ts`.

## Tips for using @workspace

- Ask specific questions and use terms and concepts that are likely to be found in the code or documentation of your codebase
- Use chat variables to expand the explicit context on top of what is implicitly included from the codebase, such as `#editor`, `#selection`, or `#file`
- Basic code analysis is possible (e.g., "find exceptions without a catch block"), but complex code analysis like "fix all bugs in this project" is not
- Answers can be based on multiple references (e.g., "how is handleError is used"), but it won't do a full code analysis like "how many times is this function called?" or "How many TSX files"
- Don't assume information beyond code (yet), like "who contributed to this file?" or "summarize review comments for this folder"

## Related resources

- Get started with the [GitHub Copilot Chat tutorial](/docs/copilot/getting-started-chat.md)
- [Use the Chat Participant API to build a chat extension](/api/extension-guides/chat.md)
