---
Order: 8
Area: copilot
TOCTitle: Workspace Context
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: Chat using @workspace Context References
DateApproved: 08/01/2024
MetaDescription: How to use Copilot's @workspace chat to ask questions against your entire codebase.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Making Copilot Chat an expert in your workspace

Referencing `@workspace` in Copilot Chat lets you ask questions about your entire codebase. Based on the question, Copilot intelligently retrieves relevant files and symbols, which it then references in its answer as links and code examples. Grounded in `@workspace` references, Copilot Chat becomes a domain expert for tasks like:

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

- All files in the workspace, except for files that are ignored by a `.gitignore` file
- Directory structure with nested folder and file names
- GitHub's code search index, if the workspace is a GitHub repository and [indexed by code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom#asking-a-question-about-a-specific-repository-file-or-symbol)
- Symbols and definitions in the workspace
- Currently selected text or visible text in the active editor

**Note**: `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.

## How does `@workspace` find the most relevant context

Your full VS Code workspace can be too large to pass entirely to GitHub Copilot for responding to your chat prompt. Instead, `@workspace` extracts the most relevant information from the different context sources to ground Copilot's answer.

First, `@workspace` determines which information is needed to answer your question, also including the conversation history, workspace structure, and currently selected code.

Next, it collects the context using different approaches, such as finding relevant code snippets by searching locally or by using [GitHub's code search](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search), and using VS Code's language IntelliSense to add details like function signatures, parameters, and more.

Finally, this context is used by GitHub Copilot to answer your question. If the context is too large, only the most relevant parts of the context are used. The response is marked up with references to files, file ranges, and symbols. This enables you to link directly from the chat response to the corresponding information in your codebase. The code snippets that were provided to Copilot are listed as references in the response.

## Context for `@workspace` slash commands

`@workspace` provides several *slash commands* as shorthand for commonly used tasks, saving you time and typing effort. Each command defines its own optimized context, often eliminating the need for additional prompting or chat variables. Here are the available slash commands and their contexts:

| Command        | Context |
| -------------- | ------- |
| `/explain`     | <ul><li>Starts with the text selection in the active editor (`#selection`). To optimize the Copilot chat responses, make sure to expand the text selection to include any relevant information to help Copilot provide a useful response.</li><li>Looks up the implementations of referenced symbols such as functions and classes, leading to more accurate and useful explanations.</li></ul> |
| `/tests`       | <ul><li>Current text selection in the active editor. If no text is selected, use the contents of the currently active file.</li><li>Related existing test files, to understand existing tests and best practices.</li></ul> |
| `/fix`         | <ul><li>Current text selection in the active editor. If no text is selected, use the currently visible text in the editor.</li><li>Errors and referenced symbols to understand what needs to be fixed and how.</li></ul> |
| `/new`         | <ul><li>Only the chat prompt is used as context.</li></ul> |
| `/newNotebook` | <ul><li>Only the chat prompt is used as context.</li></ul> |

You can explicitly expand the context by using chat variables, such as `#editor`, `#selection`, or `#file` in your chat prompt. For example, to fix an error in the current file based on a pattern from another file, use this chat prompt: `@workspace /fix linting error in the style of #file:form.ts`.

## Tips for using `@workspace`

The way you phrase your question can significantly influence the quality of the references `@workspace` provides and the accuracy of the response. To optimize results, consider the following tips:

- Be specific and detailed in your question, avoiding vague or ambiguous terms like "what does this do" (where "this" could be interpreted as the last answer, current file, or whole project, etc.).
- Incorporate terms and concepts in your prompt that are likely to appear in your code or its documentation.
- Review the *used references* in the response to ensure that the files are relevant. Iterate on your question if necessary.
- Explicitly include relevant context by selecting code or mentioning chat variables such as `#editor`, `#selection`, or `#file`.
- Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't anticipate a comprehensive code analysis across your codebase, such as "how many times is this function invoked?" or "rectify all bugs in this project".
- Avoid assuming information beyond the code (for now), such as "who contributed to this file?" or "summarize review comments for this folder".

## Related resources

- Get started with the [GitHub Copilot Chat tutorial](/docs/copilot/getting-started-chat.md)
- [Use the Chat Participant API to build a chat extension](/api/extension-guides/chat.md)
