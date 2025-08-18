---
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
DateApproved: 08/07/2025
MetaDescription: How to use Copilot's @workspace chat to ask questions against your entire codebase.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Making chat an expert in your workspace

To ask questions in chat about your entire codebase, you can reference `@workspace` or `#codebase` in your chat prompt. Based on the question, chat intelligently retrieves relevant files and symbols, which it then references in its answer as links and code examples.

## What is the difference between `@workspace` and `#codebase`?

Conceptually, both `@workspace` and `#codebase` enable you to ask questions about your entire codebase. However, there are some differences in how you can use them:

- `@workspace`
  - Chat participant, dedicated to answering questions about your codebase.
  - Takes control of the user prompt and uses the codebase to provide an answer.
  - Can't invoke other tools.
  - Can only be used in ask mode.
  - Example: `"@workspace how can I validate a date?"`

- `#codebase`
  - Tool that performs a codebase search based on the user prompt and adds the relevant code as context to the chat prompt.
  - The LLM remains in control and can combine it with other tools for editing scenarios.
  - Can be used in all chat modes (ask, edit, and agent).
  - Examples: `"add a tooltip to this button, consistent with other button #codebase"`, `"add unit tests and run them #codebase"`

It's recommended to use `#codebase` in your chat prompts, as it provides more flexibility.

> [!TIP]
> Enable the `setting(github.copilot.chat.codesearch.enabled)` to make `#codebase` more effective in finding relevant code snippets. This setting is enabled by default.

## Prompt examples

- Finding existing code in your codebase:
  - `"@workspace where is database connecting string configured?"` - Explains where and how the database connection is configured
  - `"@workspace how can I validate a date?"` - Finds existing date validation helpers in the codebase
  - `"@workspace where are tests defined?"` - Provides the location of test suites, cases, and related references and configurations
- Making plans for complex code edits:
  - `"@workspace how can I add a rich tooltip to a button?"` - Provides a plan for using the existing tooltip component with button elements
  - `"@workspace add a new API route for the forgot password form"` - Outlines where to add the new route and how to connect it to the existing code
- Explaining higher-level concepts in a codebase:
  - `"@workspace how is authentication implemented?"` - Overview of the authentication flow and references to the relevant code
  - `"@workspace which API routes depend on this service?"` - Lists the routes that use the service in the selected code
  - `"How do I build this #codebase?"` - List the steps to build the project based on documentation, scripts, and configurations

## What sources are used for context?

To answer your question, workspace context searches through the same sources a developer would use when navigating a codebase in VS Code:

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

## Managing the workspace index

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

You can view the type of index and its status in the Copilot status dashboard in the Status Bar.

![Screenshot showing the workspace index status in the Copilot status menu.](images/workspace-context/workspace-index-status.png)

### Remote index

If your code is hosted in a GitHub repository, you can build a remote index with [GitHub code search](https://docs.github.com/en/search-github/github-code-search/about-github-code-search) to enable AI to search your codebase quickly, even for large codebases.

To build a remote index for your workspace:

1. Sign in with your GitHub account in VS Code.

1. Run the **Build Remote Workspace Index** command in the Command Palette (`kb(workbench.action.showCommands))`.

    It may take some time for the remote index to be built, especially for large codebases. You can monitor the status of the remote index in the Copilot status dashboard in the Status Bar.

    You only need to build the remote index once. GitHub automatically keeps it up-to-date whenever you push code changes.

> [!IMPORTANT]
> Remote indexing requires a project with a git remote on GitHub. Make sure that you have pushed your code to GitHub too. The remote index works best if GitHub has a relatively up-to-date version of your code, so make sure to push your code to GitHub regularly.

### Local index

If you can't use a [remote index](#remote-index), Copilot can use an advanced semantic index that is stored on your local machine to provide fast, high quality search results. Currently, local indexes are limited to 2500 indexable files.

To build a local index:

- The project has less than 750 indexable files: Copilot automatically builds an advanced local index.

- The project has between 750 and 2500 indexable files: run the **Build local workspace index** command in the Command Palette (`kb(workbench.action.showCommands))`. This command only needs to be run once.

- The project has more than 2500 indexable files: see the [basic index](#basic-index) section below.

It may take some time to build the initial local index or update the index if many files have changed (such as when switching git branches). You can monitor the current local index status in the Copilot status dashboard in the Status Bar.

### Basic index

If your project does not have a [remote index](#remote-index) and has more than 2500 [indexable files](#what-content-is-included-in-the-workspace-index), Copilot falls back to using a basic index to search your codebase. This index uses simpler algorithms to search your codebase and has been optimized to work locally for larger codebases.

The basic index should work just fine for many questions. However, if you find that Copilot is struggling to answer questions about your codebase, try upgrading to a [remote index](#remote-index).

### What content is included in the workspace index

Copilot indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages, however Copilot automatically skips over some common file types that are typically not relevant to `@workspace` questions, such as `.tmp` or `.out` files. Copilot also excludes any files that are excluded from VS Code using the `setting(files.exclude)` setting or that are part of the `.gitignore` file.

Copilot also currently does not index binary files, such as images or PDFs.

## Tips for using workspace context

The way you phrase your question can significantly influence the quality of the context and the accuracy of the response. To optimize results, consider the following tips:

- Be specific and detailed in your question, avoiding vague or ambiguous terms like "what does this do" (where "this" could be interpreted as the last answer, current file, or whole project, etc.).
- Incorporate terms and concepts in your prompt that are likely to appear in your code or its documentation.
- Review the *used references* in the response to ensure that the files are relevant. Iterate on your question if necessary.
- Explicitly include relevant context by selecting code or mentioning chat variables such as `#editor`, `#selection`, or `#<file name>`.
- Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't anticipate a comprehensive code analysis across your codebase, such as "how many times is this function invoked?" or "rectify all bugs in this project".
- Avoid assuming information beyond the code (for now), such as "who contributed to this file?" or "summarize review comments for this folder".

## Related resources

- Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
- Get started with the [Quickstart](/docs/copilot/getting-started.md)
- Learn more about [chat in VS Code](/docs/copilot/chat/copilot-chat.md)
