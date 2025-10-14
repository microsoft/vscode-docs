---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 10/14/2025
MetaDescription: Learn about the different types of tools available in GitHub Copilot chat in VS Code, including built-in tools, MCP tools, and extension tools.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use tools in chat

Tools extend the capabilities of chat in Visual Studio Code with specialized functionality to accomplish specific tasks. When you use chat, tools can be automatically invoked by agent mode or explicitly referenced in your prompts to perform actions like searching code, running commands, fetching web content, invoking APIs, and more.

This article describes the different types of tools available in VS Code, how to use them in your chat prompts, and how to manage tool invocations and approvals.

## Types of tools

VS Code supports three types of tools that you can use in chat:

* **Built-in tools**
* **MCP tools**
* **Extension tools**

### Built-in tools

VS Code provides a comprehensive set of built-in tools that are automatically available in chat. These tools cover common development tasks and are optimized for working within your workspace.

Built-in tools don't require any installation or configuration and are available as soon as you start using chat.

For a complete list of built-in tools and their descriptions, see the [Chat tools reference](/docs/copilot/reference/copilot-vscode-features.md#chat-tools).

VS Code includes several predefined [tool sets](#tool-sets) that group related built-in tools, such as:

* `#edit`: Tools for modifying files in the workspace
* `#runCommands`: Tools for running terminal commands and reading output
* `#search`: Tools for searching files in the workspace

Tool sets make it easier to work with multiple related tools at once. You can reference a tool set in your prompts just like individual tools.

### MCP tools

Model Context Protocol (MCP) is an open standard that enables AI models to use external tools and services through a unified interface. MCP servers provide tools that you can add to VS Code to extend chat with additional capabilities.

You need to install and configure MCP servers before you can use their tools in chat. MCP servers can run locally on your machine or be hosted remotely.

Learn more about [configuring MCP servers in VS Code](/docs/copilot/customization/mcp-servers.md).

### Extension tools

VS Code extensions can contribute tools that integrate deeply with the editor. Extension tools use the Language Model Tools API to provide specialized functionality while accessing the full range of VS Code extension APIs.

Extension tools are automatically available when you install an extension that contributes them. Users don't need separate installation or configuration beyond installing the extension itself.

For developers looking to create extension tools, see the [Language Model Tools API guide](/api/extension-guides/ai/tools.md).

## Using tools in your prompts

You can use tools in chat in two ways: through automatic invocation in agent mode or by explicitly referencing them in your prompts.

### Automatic tool invocation in agent mode

In [agent mode](/docs/copilot/chat/chat-agent-mode.md), chat automatically determines which tools to use based on your prompt and the context of your request. The AI autonomously selects and invokes tools as needed to accomplish the task.

For example, if you ask agent mode to "refactor the authentication module to use OAuth", it might:

1. Use the `#codebase` tool to find authentication-related code
2. Use the `#readFile` tool to examine the current implementation
3. Use the `#editFiles` tool to apply the refactoring
4. Use the `#runTests` tool to verify the changes

Agent mode can invoke multiple tools and iterate based on the results, fixing issues as they arise.

To use agent mode:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the chat mode dropdown.

1. Enter your prompt and submit it.

    Agent mode automatically determines which tools are needed and invokes them as it processes your request.

1. Review and approve tool invocations when prompted.

    ![Screenshot of the Chat view showing a tool confirmation dialog in agent mode.](../images/mcp-servers/mcp-tool-confirmation.png)

### Reference tools explicitly

You can explicitly reference tools in your prompts in any chat mode (ask, edit, or agent) by typing `#` followed by the tool name. This is useful when you want to ensure a specific tool is used or when you want to provide specific parameters.

Type `#` in the chat input field to see a list of available tools, including built-in tools, MCP tools from installed servers, extension tools, and tool sets.

**Examples of explicit tool references:**

* `"Summarize the content from #fetch https://code.visualstudio.com/updates"`
* `"How does routing work in Next.js? #githubRepo vercel/next.js"`
* `"Fix the issues in #problems"`
* `"Explain the authentication flow #codebase"`

Some tools accept parameters directly in the prompt. For example, `#fetch` requires a URL, and `#githubRepo` requires a repository name.

### Manage tools with the tool picker

In agent mode, you can control which tools are available for a request by using the tool picker.

To access the tool picker:

1. Open the Chat view in agent mode.

1. Select the **Tools** button in the chat input field.

    ![Screenshot showing the Chat view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

1. Select or deselect tools to control which ones are available for the current request.

    You can search for specific tools by typing in the search box.

> [!TIP]
> A chat request can have a maximum of 128 tools enabled at a time. If you have more than 128 tools, reduce the number by deselecting tools in the picker, or enable virtual tools with the `setting(github.copilot.chat.virtualTools.threshold)` setting. Using only the tools that are relevant for your prompt might also improve your results.

## Work with tool invocations

### Review and approve tool invocations

Before chat runs certain tools, it requests confirmation to continue. This is a security measure because tools can perform actions that modify files, run commands, or access external services.

![Screenshot of a tool confirmation dialog showing tool details and approval options.](../images/mcp-servers/mcp-tool-confirmation.png)

You can:

* Select **Allow** to run the tool once
* Use the **Allow** dropdown to approve the tool for the current session, workspace, or all future invocations
* Select **Skip** to skip the tool invocation

> [!IMPORTANT]
> Always review tool parameters carefully before approving, especially for tools that modify files, run commands, or access external services. See the [Security considerations](/docs/copilot/security.md) for using AI in VS Code.

### Edit tool parameters

You can review and edit the input parameters before a tool runs:

1. When the tool confirmation dialog appears, select the chevron next to the tool name to expand its details.

1. Review the input parameters.

1. Edit any parameters as needed.

    ![Screenshot of a tool confirmation dialog with expanded input parameters.](../images/mcp-servers/mcp-tool-edit-parameters.png)

1. Select **Allow** to run the tool with the modified parameters.

### Manage tool approvals

You can configure which tools and commands are automatically approved without requiring manual confirmation.

#### Auto-approve specific terminal commands

You can configure which terminal commands are automatically approved by using the `setting(chat.tools.terminal.autoApprove)` setting. This setting lets you specify both allowed and denied commands:

* Set commands to `true` to automatically approve them
* Set commands to `false` to always require approval
* Use regular expressions by wrapping patterns in `/` characters

For example:

```jsonc
{
  // Allow the `mkdir` command
  "mkdir": true,
  // Allow `git status` and commands starting with `git show`
  "/^git (status|show\\b.*)$/": true,

  // Block the `del` command
  "del": false,
  // Block any command containing "dangerous"
  "/dangerous/": false
}
```

By default, patterns match against individual subcommands. For a command to be auto-approved, all subcommands must match a `true` entry and must not match a `false` entry.

For advanced scenarios, use object syntax with the `matchCommandLine` property to match against the full command line instead of individual subcommands.

Learn more about [terminal command auto-approval patterns](/docs/copilot/chat/chat-agent-mode.md#auto-approve-terminal-commands) in the agent mode documentation.

#### Auto-approve all tools

To disable all manual approvals for tools and terminal commands in all workspaces, enable the `setting(chat.tools.global.autoApprove)` setting.

> [!CAUTION]
> This setting disables critical security protections and makes it easier for an attacker to compromise the machine. Only enable this setting if you understand the security implications. See the [Security documentation](/docs/copilot/security.md) for more details.

#### Reset tool confirmations

To clear all saved tool approvals and start fresh, use the **Chat: Reset Tool Confirmations** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Tool sets

A tool set is a collection of tools that you can reference as a single entity in your prompts. Tool sets help organize related tools and make them easier to use in a chat prompt, [prompt files](/docs/copilot/customization/prompt-files.md), and [custom chat modes](/docs/copilot/customization/custom-chat-modes.md).

![Screenshot showing the tools picker with user-defined tool sets.](images/agent-mode/tools-picker-tool-sets.png)

### Create a tool set

To create a tool set:

1. Select the **Configure Chat** button in the Chat view, select **Tool Sets**, and then select **Create new tool sets file**.

    Alternatively, use the **Chat: Configure Tool Sets** command from the Command Palette.

    ![Screenshot showing the Chat view and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

1. Define your tool set in the `.jsonc` file that opens.

A tool set has the following structure:

```json
{
    "reader": {
        "tools": [
            "changes",
            "codebase",
            "fetch",
            "githubRepo",
            "problems",
            "usages"
        ],
        "description": "Tools for reading and gathering context",
        "icon": "book"
    }
}
```

Tool set properties:

* `tools`: Array of tool names (built-in tools, MCP tools, or extension tools)
* `description`: Brief description displayed in the tools picker
* `icon`: Icon for the tool set (see [Product Icon Reference](/api/references/icons-in-labels.md))

### Use a tool set

Reference a tool set in your prompts by typing `#` followed by the tool set name:

* `"Analyze the codebase for security issues #reader"`
* `"Set up the project with all necessary tools #setup"`

You can also select tool sets from the tool picker in agent mode.

## Frequently asked questions

### How do I know which tools are available?

Type `#` in the chat input field to see a list of all available tools. You can also access the tool picker in agent mode to view and manage tools.

### I'm getting an error that says "Cannot have more than 128 tools per request."

A chat request can have a maximum of 128 tools enabled at a time. If you see an error about exceeding 128 tools per request:

* Open the tool picker in the Chat view and deselect some tools or entire MCP servers to reduce the count.

* Alternatively, enable virtual tools with the `setting(github.copilot.chat.virtualTools.threshold)` setting to automatically manage large tool sets.

### What's the difference between tools and chat participants?

Chat participants are specialized assistants that enable you to ask domain-specific questions in chat. Imagine a chat participant as a domain expert to whom you hand off your chat request and it takes care of the rest.

Chat participants are different from tools that are invoked as part of an agent flow to contribute and perform specific tasks.

### Can I create my own tools?

Yes. You can create tools in two ways:

* **Develop a VS Code extension** that contributes tools using the [Language Model Tools API](/api/extension-guides/ai/tools.md)
* **Create an MCP server** that provides tools. See the [MCP developer guide](/docs/copilot/guides/mcp-developer-guide.md)

## Related resources

* [Chat tools reference](/docs/copilot/reference/copilot-vscode-features.md#chat-tools)
* [Configure MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Use agent mode](/docs/copilot/chat/chat-agent-mode.md)
* [Develop language model tools](/api/extension-guides/ai/tools.md)
* [Security considerations](/docs/copilot/security.md)
