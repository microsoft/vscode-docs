---
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
DateApproved: 09/11/2025
MetaDescription: Learn how workspace context gives chat a deep understanding of your entire codebase to provide accurate, contextual answers.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Make chat an expert in your workspace

Chat becomes significantly more helpful when it has a deep understanding of your entire codebase, not just individual files. Workspace context is the underlying mechanism that enables the AI to search across your project, understand how components connect, and provide answers grounded in your actual code. This enables you to ask broad questions like "where is authentication handled?" or "how do I add a new API endpoint?" and get accurate answers based on your specific codebase.

This article explains how workspace context works, how to manage your workspace index for optimal results, and how to use `@workspace` and `#codebase` to leverage it in your prompts.

The intelligence behind workspace context automatically adjusts based on your project's size and setup, ensuring you get accurate results whether you're working on a small personal project or a large enterprise codebase.

## How workspace context works

VS Code uses intelligent search strategies to find the most relevant code for your questions. Rather than using a single approach, it automatically selects the best method based on your project size and available resources. VS Code might run multiple strategies in parallel and then choose the one that produces the best results the fastest.

### What sources are used for context?

Workspace context searches through the same sources a developer would use when navigating a codebase in VS Code:

* All [indexable files](#what-content-is-included-in-the-workspace-index) in the workspace (workspace index), except those ignored by a `.gitignore` file
* Directory structure with nested folders and file names
* Code symbols and definitions (classes, functions, variables)
* Currently selected text or visible text in the active editor

The workspace index can be maintained remotely by GitHub or stored locally on your machine. See the [workspace index](#workspace-index) section for more details.

> [!IMPORTANT]
> `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.

### Search strategy

For small projects, the entire workspace can be included directly in the chat context. For larger projects, VS Code uses different strategies to find the most relevant information to include in the chat context for your prompt.

The following steps outline how VS Code constructs the workspace context:

1. Determine which information from the workspace is needed to answer your question, also including the conversation history, workspace structure, and currently editor selection.

1. Collect relevant code snippets from the [workspace index](#workspace-index) by using various approaches:

    * [GitHub's code search](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search)
    * Local semantic search to find code that matches the meaning of your question, not just exact keywords
    * Text-based file-name and content search
    * VS Code's language IntelliSense to add details like function signatures, parameters, and more.

1. If the resulting context is too large to fit in the _context window_, only the most relevant parts are kept.

## Workspace index

Chat in VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

You can view the type of index that is being used and its indexing status in the Copilot status dashboard in the VS Code Status Bar.

![Screenshot showing the workspace index status in the Copilot status menu.](images/workspace-context/workspace-index-status.png)

### Remote index

VS Code can use remote code search indexes to enable AI to search your codebase quickly, even for large codebases. Remote code search is currently available for workspaces that use GitHub or Azure DevOps repositories.

#### GitHub remote indexing

VS Code automatically builds and uses remote code search indexes for any GitHub-backed repositories in your workspace. Sign in with your GitHub account in VS Code and chat will automatically start using any available remote code search indexes.

Repositories are automatically indexed the first time `@workspace` or `#codebase` is used in chat.  You can also force indexing by running the **Build Remote Workspace Index** command in the Command Palette (`kb(workbench.action.showCommands))`.

The index only needs to be built once per repository. After that, the index is automatically kept up to date. Building the index is fast for small and medium sized projects, but may take a little time if your repository contains hundreds of thousands of files. The remote index works also best if GitHub has a relatively up-to-date version of your code, so make sure to push your code to GitHub regularly.

Currently remote indexing works for GitHub repositories hosted on GitHub.com or on GitHub Enterprise Cloud. It is not supported for repositories that use GitHub Enterprise Server.

#### Azure DevOps remote indexing

VS Code can also use remote indexes for Azure DevOps repositories. These indexes are automatically built and maintained. Sign in with your Microsoft account in VS Code for chat to start using the remote indexes. Check the Copilot Status Bar item for the current index status and to get a sign-in link if your account doesn't have the right permissions to access the Azure DevOps repository.

### Local index

If you can't use a [remote index](#remote-index), for example because you're not using a GitHub or Azure DevOps repository, VS Code can use an advanced semantic index that is stored on your local machine to provide fast, high quality search results. Currently, local indexes are limited to 2500 indexable files.

To build a local index:

* The project has less than 750 indexable files: VS Code automatically builds an advanced local index.

* The project has between 750 and 2500 indexable files: run the **Build local workspace index** command in the Command Palette (`kb(workbench.action.showCommands))` - this should only be run once.

* The project has more than 2500 indexable files: use a [basic index](#basic-index).

It might take some time to build the initial local index or update the index if many files have changed, for example when switching git branches. You can monitor the current local index status in the Copilot status dashboard in the Status Bar.

### Basic index

If your project does not have a [remote index](#remote-index) and has more than 2500 [indexable files](#what-content-is-included-in-the-workspace-index), VS Code falls back to using a basic index to search your codebase. This index uses simpler algorithms to search your codebase and is optimized to work locally for larger codebases.

The basic index should work just fine for many types of chat prompts. However, if you find that chat is struggling to provide relevant answers to questions about your codebase, consider upgrading to a [remote index](#remote-index).

### What content is included in the workspace index

Copilot indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages, however Copilot automatically skips over some common file types that are typically not relevant to `@workspace` questions, such as `.tmp` or `.out` files. Copilot also excludes any files that are excluded from VS Code using the `setting(files.exclude)` setting or that are part of the `.gitignore` file.

Copilot also currently does not index binary files, such as images or PDFs.

## Use workspace context in chat

When you ask a workspace-related question in chat, the behavior for determining the workspace context depends on which chat mode you're using:

* **Agent mode**

    In agent mode, the agent automatically performs an _agentic_ codebase search based on your prompt. This means that after performing an initial search to determine the workspace context, depending on the results, the agent might decide to perform additional, more targeted searches to gather the information it needs to answer your question.

    You don't need to explicitly reference the `#codebase` tool in your prompt, but you can do so if you want to ensure that workspace context is used for your question. This is useful if your prompt is ambiguous and might be interpreted as not requiring workspace context.

* **Ask/edit mode**

    In ask and edit mode, VS Code performs intent detection on your prompt to determine if it requires workspace context. If requires workspace context, VS Code performs a codebase search and adds the relevant code snippets to the chat context. As opposed to agent mode, no follow-up searches are performed.

    You don't need to explicitly reference the `#codebase` tool in your prompt, but you can do so if you want to ensure that workspace context is used for your question. This is useful if your prompt is ambiguous and might be interpreted as not requiring workspace context.

## Tips for using workspace context

The way you phrase your question can significantly influence the quality of the context and the accuracy of the response. To optimize results, consider the following tips:

* Be specific and detailed in your question, avoiding vague or ambiguous terms like "what does this do", where "this" could be interpreted as the last answer, current file, or whole project.
* Incorporate terms and concepts in your prompt that are likely to appear in your code or its documentation.
* Explicitly include relevant context by selecting code, referencing files, or [#-mentioning context items](/docs/copilot/chat/copilot-chat-context.md) such as debug context, terminal output, and more.
* Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't anticipate a comprehensive code analysis across your codebase, such as "how many times is this function invoked?" or "rectify all bugs in this project".
* When asking about information beyond the code, such as "who contributed to this file?" or "summarize review comments for this folder", make sure to configure the relevant [tools or MCP servers](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools) in agent mode.

## Frequently asked questions

### What is the difference between `@workspace` and `#codebase`?

Conceptually, both `@workspace` and `#codebase` enable you to ask questions about your entire codebase. However, there are some differences in how you can use them:

* `@workspace` is a [chat participant](/docs/copilot/chat/copilot-chat-context.md#atmentions)

    The `@workspace` participant is subject matter expert that is specialized to answering questions about your codebase. The language model hands off the entire chat prompt to the participant, which uses its knowledge of the codebase to provide an answer. The language model can't perform any additional processing or invoke other tools when using a chat participant. A chat prompt can only contain a single chat participant.

* `#codebase` is a [chat tool](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)

    The `#codebase` tool is specialized in searching your codebase for relevant information. It is one of many tools that the language model can choose to invoke when answering your chat prompt. The language model can decide to invoke the `#codebase` tool multiple times, interleaved with other tools, to gather the information it needs to answer your question. A chat prompt can contain multiple tools.

It's recommended to use `#codebase` in your chat prompts, as it provides more flexibility.
