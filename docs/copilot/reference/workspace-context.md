---
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
DateApproved: 4/1/2026
MetaDescription: Learn how Copilot agents understand your codebase with semantic search, text search, grep, and other tools to gather context for accurate answers.
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
- grep
- text search
- agentic search
---

# How Copilot understands your workspace

Copilot agents search your entire codebase to understand how components connect and provide answers grounded in your actual code. You can ask broad questions like "where is authentication handled?" or "add tests for the list endpoint?" and get accurate answers and edits based on your codebase.

This article explains how Copilot understands your codebase, including the different tools it uses for searching through your code and the indexes it creates to enable quick searches. These same general approaches are used on all codebases, from those with five files to those with 500,000 files.

## Search and read tools

When you send a prompt, Copilot analyzes what information it needs and automatically selects the right combination of search tools to either answer your question or start generating code edits. Copilot runs multiple tools for this, reviews the results, and automatically performs follow-up searches until it has a good understanding of the problem.

For example, when asked to "add error handling to the payment service", the agent might:

1. Use **semantic search** to find payment-related code across the project.
1. Use **grep** to find existing error handling patterns in the codebase.
1. Use **usages** to trace how the payment functions are called.
1. Use **file search** to locate related configuration and test files.
1. Read the relevant files and make coordinated changes.

This iterative approach means the agent gathers context the same way a developer would: by exploring the codebase from multiple angles until it has a complete picture.

Agents have access to the following built-in search tools. You can also explicitly reference these tools in your prompts by typing `#` followed by the tool name.

| Tool | Description |
|------|-------------|
| **Semantic search** (`#codebase`) | Finds code that matches the meaning of your question, not just exact keywords. Requires a [workspace index](#workspace-index). |
| **Text search** | Searches file content for text matches, such as specific keywords. |
| **Grep** | Searches for exact text or regex patterns across files. Works without an index. |
| **File search** | Finds files by name or glob pattern. |
| **Usages** | Combines Find All References, Find Implementation, and Go to Definition to trace how symbols are used across files. |
| **List directory** | Lists the contents of a directory to explore the project structure. |
| **Read file** | Reads the content of a specific file to examine its code in detail. |

These tools work for any workspace size. For small projects, the entire workspace can be read directly into the agent's context. For larger projects, the agent selects the most efficient search strategy based on your project size and available resources.

### What the agent has access to

Agents search through the same sources a developer would use when navigating a codebase:

* All [indexable files](#what-content-is-included-in-the-workspace-index) in the workspace, except those ignored by a `.gitignore` file
* Directory structure with nested folders and file names
* Code symbols and definitions (classes, functions, variables)
* Currently selected text or visible text in the active editor
* Conversation history and previous tool results

> [!IMPORTANT]
> `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.


## Semantic search

The semantic search tool (`#codebase`) finds code by meaning rather than exact keywords.

Semantic search requires building and maintaining an index so that it can run quickly, even on very large codebases. Copilot maintains this index for you automatically. Behind the scenes, parts of the index might be stored on your machine and parts might come from remote sources, but you don't need to manage this distinction.

You can view the indexing status in the Copilot status dashboard in the VS Code Status Bar.

![Screenshot showing the workspace index status in the Copilot status menu.](../images/workspace-context/workspace-index-status.png)

### Semantic index sources

* **GitHub repositories**: GitHub automatically indexes the GitHub repositories in your workspace. Sign in with your GitHub account to use them. This index only needs to be built once per repository, which means it is often instantly available. GitHub builds and updates this index when needed. This is fast for small and medium sized projects, but might take some time if your repository contains hundreds of thousands of files. Remote indexing works for repositories hosted on GitHub.com or GitHub Enterprise Cloud. It is not supported for GitHub Enterprise Server.

* **Azure DevOps repositories**: Indexes are automatically built and maintained. Sign in with your Microsoft account in VS Code for Copilot to start using the index. Check the Copilot Status Bar item for the current index status.

* **Other code**: Copilot can also build up a semantic index for code that is not in a GitHub or Azure DevOps repo through a feature called "External Ingest". This requires a paid Copilot subscription. Support for External Ingest is gradually rolling out to all users.

### What content is included in the semantic index

VS Code indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages. VS Code automatically skips some common file types that are typically not relevant, such as `.tmp` or `.out` files.

The workspace index also excludes files that are excluded from VS Code by the `setting(files.exclude)` setting or by a `.gitignore` file.

Binary files, such as images or PDFs, are not indexed.

## Tips for better results

The way you phrase your prompt influences which tools the agent uses and the quality of the results.

* **Be specific**: avoid vague terms like "what does this do", where "this" could mean the last answer, current file, or whole project.
* **Use code terms**: use function names, class names, and concepts that appear in your code so the agent can find exact matches.
* **Add context manually**: select code, reference files, or [#-mention context items](/docs/copilot/chat/copilot-chat-context.md) such as debug context, terminal output, and more.
* **Scope your request**: responses can draw from multiple references, such as "find exceptions without a catch block". But don't expect a full codebase analysis, such as "how many times is this function invoked?".
* **Use external tools for non-code questions**: for information like "who contributed to this file?", configure the relevant [tools or MCP servers](/docs/copilot/agents/agent-tools.md).

## Private repositories

To use semantic search for private repositories, Copilot may need additional permission. If these permissions are not already granted, VS Code asks for them at startup. Once granted, the session is securely stored for the future.

![Modal window asking for additional authentication for a private repository.](../images/workspace-context/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### Do I need to use `#codebase` in my prompts?

No. Agents automatically use semantic search when it makes sense. You don't need to add `#codebase` to your prompt.

The `#codebase` tool is always semantic and provides consistent results. If you want to force a semantic search for a specific prompt, you can still add `#codebase` as a [context item](/docs/copilot/chat/copilot-chat-context.md).

### What happens if my workspace is not semantically indexed?

Agents still search your code effectively by using text search, grep, file search, and language intelligence. The workspace index enables semantic search, which finds code by meaning rather than keywords. Without it, agents rely on the other search tools and can still provide accurate results for most prompts. We've found that these other tools still provide great results.
