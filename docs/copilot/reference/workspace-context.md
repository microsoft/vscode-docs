---
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
DateApproved: 3/9/2026
MetaDescription: Learn how GitHub Copilot automatically understands your codebase using workspace context for cross-file reasoning and accurate answers.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- workspace context
- semantic search
- cross-file reasoning
- codebase understanding
- large codebase
- monorepo
- indexing
- language intelligence
- LSP
- GitHub code search
---
# How Copilot understands your workspace

Copilot works best when it understands your entire codebase, not just individual files. Workspace context is the underlying mechanism that enables agents and chat to reason across files, understand how components connect, and provide answers grounded in your actual code. You can ask broad questions like "where is authentication handled?" or "how do I add a new API endpoint?" and get accurate answers based on your specific codebase.

This article explains how workspace context works, how the workspace index is built, and how context is gathered across different modes.

Workspace context automatically adjusts based on your project's size and setup. You get accurate results whether you're working on a small personal project or a large enterprise codebase with multiple repositories. During agent sessions, the agent autonomously searches your codebase, often performing multiple rounds of targeted searches to gather the context it needs for coordinated changes across files.

## How workspace context works

VS Code uses intelligent search strategies to find the most relevant code for your prompts. Rather than relying on a single approach, it automatically selects the best method based on your project size and available resources. VS Code runs multiple strategies in parallel and uses whichever produces the best results the fastest.

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

For small projects, the entire workspace can be included directly in the context. For larger projects, VS Code uses different strategies to find the most relevant information for your prompt.

The following steps outline how VS Code constructs the workspace context:

1. Determine which information from the workspace is needed to answer your question, also including the conversation history, workspace structure, and current editor selection.

1. Collect relevant code snippets from the [workspace index](#workspace-index) by using various approaches:

    * [GitHub's code search](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search) for fast, comprehensive search across your repository and related repositories on GitHub
    * Local semantic search to find code that matches the meaning of your question, not just exact keywords
    * Text-based file-name and content search
    * VS Code's language intelligence (IntelliSense, LSP) to resolve symbols, function signatures, type hierarchies, and cross-file references.

1. If the resulting context is too large to fit in the _context window_, only the most relevant parts are kept.

## Workspace index

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. GitHub automatically indexes every workspace you open, regardless of hosting provider. The index can also be stored locally on your machine for repositories that are not backed by GitHub or Azure DevOps.

The remote index is built from the committed state of your repository. Any uncommitted changes in your local workspace are not included in the remote index.

When you have local uncommitted changes, VS Code uses a hybrid approach combining the remote index with local file tracking. VS Code detects which files have been modified since the indexed commit and also reads the current file content from the editor for real-time context.

You can view the type of index that is being used and its indexing status in the Copilot status dashboard in the VS Code Status Bar.

![Screenshot showing the workspace index status in the Copilot status menu.](../images/workspace-context/workspace-index-status.png)

### Remote index

GitHub automatically builds and maintains a remote code search index for your workspace. This enables fast, comprehensive search results even for large codebases.

#### GitHub remote indexing

When you open a workspace in VS Code, GitHub automatically indexes the repository. Sign in with your GitHub account and Copilot starts using the remote index right away. You can also trigger indexing manually by running the **Build Remote Workspace Index** command in the Command Palette (`kb(workbench.action.showCommands)`).

The index only needs to be built once per repository. After that, it is automatically kept up to date. Building the index is fast for small and medium sized projects, but might take some time if your repository contains hundreds of thousands of files. The remote index works best if GitHub has a relatively up-to-date version of your code, so push your code to GitHub regularly.

Remote indexing works for GitHub repositories hosted on GitHub.com or on GitHub Enterprise Cloud. It is not supported for repositories that use GitHub Enterprise Server.

#### Azure DevOps remote indexing

VS Code can also use remote indexes for Azure DevOps repositories. These indexes are automatically built and maintained. Sign in with your Microsoft account in VS Code for Copilot to start using the remote indexes. Check the Copilot Status Bar item for the current index status and to get a sign-in link if your account doesn't have the right permissions to access the Azure DevOps repository.

### Local index

If you can't use a [remote index](#remote-index), for example because you're not using a GitHub or Azure DevOps repository, VS Code can use an advanced semantic index that is stored on your local machine to provide fast, high quality search results. Currently, local indexes are limited to 2500 indexable files.

To build a local index:

* The project has less than 750 indexable files: VS Code automatically builds an advanced local index.

* The project has between 750 and 2500 indexable files: run the **Build local workspace index** command in the Command Palette (`kb(workbench.action.showCommands)`) - this should only be run once.

* The project has more than 2500 indexable files: use a [basic index](#basic-index).

It might take some time to build the initial local index or update the index if many files have changed, for example when switching git branches. You can monitor the current local index status in the Copilot status dashboard in the Status Bar.

### Basic index

If your project does not have a [remote index](#remote-index) and has more than 2500 [indexable files](#what-content-is-included-in-the-workspace-index), VS Code falls back to using a basic index to search your codebase. This index uses simpler algorithms to search your codebase and is optimized to work locally for larger codebases.

The basic index should work just fine for many types of chat prompts. However, if you find that chat is struggling to provide relevant answers to questions about your codebase, consider upgrading to a [remote index](#remote-index).

### What content is included in the workspace index

VS Code indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages, however VS Code automatically skips over some common file types that are typically not relevant to workspace questions, such as `.tmp` or `.out` files.

The workspace index also excludes any files that are excluded from VS Code using the `setting(files.exclude)` setting or that are part of the `.gitignore` file.

VS Code also currently does not index binary files, such as images or PDFs.

## How workspace context is used

How workspace context is gathered depends on which mode you're using in chat:

* **Agent and Plan**

    Agents automatically perform agentic codebase searches based on your prompt. After an initial search, the agent might perform additional targeted searches to gather more context, depending on the results. Agents use tools like `codebase`, `grep`, `file`, and language intelligence to build a complete picture of the relevant code before making changes.

* **Ask**

    Ask mode uses the same agentic tool-based approach as agents. Copilot automatically searches your codebase with the tools available to it and gathers relevant code snippets. You can also explicitly reference files, symbols, or other [context items](/docs/copilot/chat/copilot-chat-context.md) in your prompt.

* **Edit** _(deprecated)_

    Edit mode is deprecated. Use agents or ask mode instead. Edit mode searches the workspace for relevant context but does not perform follow-up searches.

## Tips for better workspace context

The way you phrase your prompt influences the quality of the context and the accuracy of the response.

* Be specific and detailed, avoiding vague terms like "what does this do", where "this" could be interpreted as the last answer, current file, or whole project.
* Use terms and concepts that are likely to appear in your code or its documentation.
* Explicitly include relevant context by selecting code, referencing files, or [#-mentioning context items](/docs/copilot/chat/copilot-chat-context.md) such as debug context, terminal output, and more.
* Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't expect a comprehensive code analysis across the entire codebase, such as "how many times is this function invoked?" or "fix all bugs in this project".
* For information beyond the code, such as "who contributed to this file?", configure the relevant [tools or MCP servers](/docs/copilot/agents/agent-tools.md).

## Private repositories

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](../images/workspace-context/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### Do I need to use `#codebase` in my prompts?

In most cases, no. Agents and ask mode automatically search your workspace for relevant context. You don't need to explicitly reference workspace context in your prompt.

If you want to ensure that a specific prompt triggers a workspace search, you can still add `#codebase` as a [context item](/docs/copilot/chat/copilot-chat-context.md) in your prompt.
