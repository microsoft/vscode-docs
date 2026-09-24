---
ContentId: 6257086f-4936-4f53-bfa1-fec1cfd4dfb5
DateApproved: 9/20/2026
MetaDescription: Look up tools, tool sets, and context references for AI chat in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/chat-tools/agent-mode-select-tools.png
Keywords:
- agents
- chat
- tools
- tool sets
- context
- reference
---
# Tools and context reference

Look up common tool names and context references for chat prompts in {% data variables.product.prodname_vscode %}. For instructions on selecting tools, invoking them, and managing approvals, see [Use tools with agents](/docs/agents/run/tools.md).

## Reference types and availability

The `#` picker includes references that serve different purposes:

* **Tools** perform actions, such as reading a file or running a command. For example, `#search/textSearch` searches file contents.
* **Tool sets** group related tools. For example, `#search` groups workspace search tools.
* **Context items** supply information to a prompt without asking the agent to perform an action. For example, `#selection` adds the selected editor text.

Available references depend on your harness, enabled extensions, and session capabilities. Type `#` in the chat input to see the current list. Extensions and MCP servers can provide additional tools beyond those listed here.

Referencing a tool does not bypass its [approval and permission controls](/docs/agents/run/approvals.md).

## Tools and tool sets

### Read and search workspace files

| Reference | Purpose |
|---|---|
| `#read` (tool set) | Read workspace files and execution output. |
| `#read/readFile` | Read a file. |
| `#read/problems` | Get diagnostics from the **Problems** panel. |
| `#search` (tool set) | Search the workspace. |
| `#search/changes` | List source control changes. |
| `#search/codebase` | Find relevant code with workspace code search. |
| `#search/fileSearch` | Find files by a glob pattern. |
| `#search/listDirectory` | List directory contents. |
| `#search/textSearch` | Find text in files. |
| `#search/usages` | Find references, implementations, and definitions of symbols. |

### Edit files and work with notebooks

| Reference | Purpose |
|---|---|
| `#edit` (tool set) | Modify workspace files and notebooks. |
| `#edit/createDirectory` | Create a directory. |
| `#edit/createFile` | Create a file. |
| `#edit/editFiles` | Apply edits to files. |
| `#edit/editNotebook` | Edit a notebook. |
| `#read/getNotebookSummary` | List notebook cells and their details. |
| `#read/readNotebookCellOutput` | Read the output from a notebook cell. |
| `#execute/runNotebookCell` | Run a notebook cell. |

### Run commands and diagnose tests

| Reference | Purpose |
|---|---|
| `#execute` (tool set) | Run commands, tasks, and notebook cells. |
| `#execute/createAndRunTask` | Create and run a [workspace task](/docs/debugtest/tasks.md). |
| `#execute/getTerminalOutput` | Get output from a running terminal command. |
| `#execute/runInTerminal` | Run a shell command in the integrated terminal. |
| `#execute/testFailure` | Get unit test failure information. |
| `#read/terminalLastCommand` | Get the last terminal command and its output. |
| `#read/terminalSelection` | Get the current terminal selection. |

### Access the web and GitHub

| Reference | Purpose |
|---|---|
| `#browser` (tool set) | Navigate, inspect, and interact with pages using [browser tools](/docs/agents/run/browser-tools.md). |
| `#web` (tool set) | Access web content. |
| `#web/fetch` | Fetch a web page. |
| `#githubRepo` | Search a GitHub repository semantically. Specify the repository as `owner/repo`. |
| `#githubTextSearch` | Search a GitHub repository or organization for text or code patterns. |

### Delegate and track work

| Reference | Purpose |
|---|---|
| `#agent` (tool set) | Delegate tasks to [subagents](/docs/agents/run/subagents.md). |
| `#agent/runSubagent` | Run a task in an isolated subagent context. |
| `#todos` | Track task progress with a todo list. |
| `#vscode/askQuestions` | Ask clarifying questions with interactive controls. |

For tools that coordinate work across Agent Host sessions, see [session orchestration](/docs/agents/run/sessions/manage-sessions.md#orchestrate-sessions-from-agent-host-sessions).

### Configure projects and the editor

| Reference | Purpose |
|---|---|
| `#newWorkspace` | Create a workspace. |
| `#vscode/extensions` | Search for extensions and information about them. |
| `#vscode/getProjectSetupInfo` | Get project-scaffolding instructions and configuration. |
| `#vscode/installExtension` | Install an extension. |
| `#vscode/runCommand` | Run a {% data variables.product.prodname_vscode_shortname %} command. |
| `#vscode/VSCodeAPI` | Get information about editor functionality and extension APIs. |

## Context items

Type `#` followed by a file, folder, or symbol name, then select the item from the picker. The placeholders below represent the name of the item you want to attach.

| Reference | Context supplied |
|---|---|
| `#<file>` | A file selected from the context picker. |
| `#<folder>` | A folder selected from the context picker. |
| `#<symbol>` | A code symbol. Open the file containing the symbol first. |
| `#selection` | The current editor selection, available when text is selected. |

Use **Add Context** or drag items into chat to attach other context, such as images, errors, or GitHub issues. See [Add context to chat](/docs/chat/copilot-chat-context.md) for supported sources and attachment methods.

## Related resources

* [Understand tools in the agent loop](/docs/agents/concepts/tools.md).
* [Create and use tool sets](/docs/agent-customization/tool-sets.md).
