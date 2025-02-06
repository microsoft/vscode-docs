---
Order: 10
Area: copilot
TOCTitle: Workspace Context
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
PageTitle: Chat using @workspace Context References
DateApproved: 02/06/2025
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

- All [indexable files](#what-content-is-included-in-the-workspace-index) in the workspace, except for files that are ignored by a `.gitignore` file
- Directory structure with nested folder and file names
- GitHub's code search index, if the workspace is a GitHub repository and [indexed by code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom#asking-a-question-about-a-specific-repository-file-or-symbol)
- Symbols and definitions in the workspace
- Currently selected text or visible text in the active editor

> [!NOTE]
> `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.

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

## Managing the workspace index

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine. This section covers the different types of indices that Copilot can use ([remote](#remote-index), [local](#local-index), and [basic](#basic-index)), and explains when each one is used and how you can switch between them.

To see the type of index that Copilot is currently using, check the language status UI by selecting the `{}` icon in the Status Bar. The Copilot workspace index entry shows both the index type along with any relevant information about this index, such as the number of files being reindexed.

![Viewing the status of the Copilot index in the language status UI](images/copilot-chat/workspace-index-status.png)

### Remote index

For GitHub repositories, Copilot can use [GitHub code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/using-github-copilot/asking-github-copilot-questions-in-github#asking-exploratory-questions-about-a-repository) to build a remote index of your codebase. This allows Copilot to search your entire codebase very quickly, even if the codebase is very large.

To use a remote index:

- Sign in with your GitHub account in VS Code.

- Open a project with a GitHub git remote. Make sure that you have pushed your code to GitHub too.

    The remote index works best if GitHub has a relatively up-to-date version of your code, so make sure to push your code to GitHub regularly.

- Build the remote index by running the **Build remote workspace index** command or by selecting the Build Index button in the workspace index status UI.

    It may take some time for the remote index to be built, especially for large codebases. You can monitor the status of the remote index in the workspace index status UI.

    Once the remote index has been built, GitHub automatically keeps it up-to-date whenever you push code changes. You only need to run the **Build remote workspace index** command once per repository.

### Local index

For cases where you can't use a [remote index](#remote-index), Copilot can instead use an advanced semantic index that is stored on your local machine. This index can also provide fast, high quality search results. However it is currently limited to 2500 indexable files. Unlike the remote index, the local index must be built once per user per machine. With the remote index, all users of a given repo can all use the same index.

Copilot automatically builds an advanced local index if your project has under 750 indexable files. For projects with between 750 and 2500 files, you can run the **Build local workspace index** command to start indexing. This command only needs to be run once.

It may take some time to build the initial local index or update the index if many files have changed (such as when switching git branches). You can monitor the current local index status in the  workspace index status UI.

### Basic index

If your project does not have a [remote index](#remote-index) and also has more than 2500 [indexable files](#what-content-is-included-in-the-workspace-index), Copilot falls back to using a basic index to search your codebase. This index uses simpler algorithms to search your codebase and has been optimized to work locally for larger codebases.

The basic index should work just fine for many questions. However, if you find that Copilot is struggling to answer questions about your codebase, try upgrading to a [remote index](#remote-index).

### What content is included in the workspace index

Copilot indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages, however Copilot automatically skips over some common file types that are typically not relevant to `@workspace` questions, such as `.tmp` or `.out` files. Copilot also excludes any files that are excluded from VS Code using the `setting(files.exclude)` setting or that are part of the `.gitignore` file.

Copilot also currently does not index binary files, such as images or PDFs.

## Tips for using `@workspace`

The way you phrase your question can significantly influence the quality of the references `@workspace` provides and the accuracy of the response. To optimize results, consider the following tips:

- Be specific and detailed in your question, avoiding vague or ambiguous terms like "what does this do" (where "this" could be interpreted as the last answer, current file, or whole project, etc.).
- Incorporate terms and concepts in your prompt that are likely to appear in your code or its documentation.
- Review the *used references* in the response to ensure that the files are relevant. Iterate on your question if necessary.
- Explicitly include relevant context by selecting code or mentioning chat variables such as `#editor`, `#selection`, or `#file`.
- Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't anticipate a comprehensive code analysis across your codebase, such as "how many times is this function invoked?" or "rectify all bugs in this project".
- Avoid assuming information beyond the code (for now), such as "who contributed to this file?" or "summarize review comments for this folder".

## Related resources

- Get started with the [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md)
- [Use the Chat Participant API to build a chat extension](/api/extension-guides/chat.md)
