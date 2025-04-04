---
Order: 97
TOCTitle: Agent mode available to all users
PageTitle: Agent mode: available to all users and supports MCP
MetaDescription: Agent mode is now available to all users and supports MCP.
Date: 2025-04-07
Author: Isidor Nikolic
---

# Agent mode: available to all users and supports MCP

April 4th, 2025 by [Isidor Nikolic](https://github.com/isidorn)

Agent mode is rolling out to all VS Code users! The agent acts as an autonomous pair programmer. It performs multi-step coding tasks at your command — including analyzing your codebase, proposing file edits, and running terminal commands. It responds to compile and lint errors, monitors terminal output, and auto-corrects in a loop until the task is completed. The agent can also use contributed tools, allowing it to interact with external MCP servers or VS Code extensions to perform a wide variety of tasks.

<video src="agent-mode.mp4" title="Agent mode" autoplay muted controls></video>

## Available to all users

Open the Chat view, sign-in to GitHub, set `setting(chat.agent.enabled:true)` in your settings and select **Agent** in the Chat mode dropdown. In the following weeks, we are rolling it out by default to everyone - no setting will be required.

Use agent mode when:
* Your taks involves multiple steps - the agent edits code, runs terminal commends, monitors for errors, and iterates to resolve any issues that arise.
* You are unsure which files or context are relevant - the agent automatically determines what's needed.
* Your task requires interaction with external apps or data - the agent integrates with MCP servers and VS Code extensions

On the other hand, use edit mode when the task has a well-defined scope, you want a quick turnaround or you want to preserve your GitHub Copilot quota.

We have created a unified chat experience (combining Chat and Edits view) that brings benefits like session history, moving chat into a separate window, and simplification of the Working Set view. All these benefits are now also available in agent mode.

<large screenshot of agent mode with applied changes>

We continue to receive fantastic user feedback ([please keep it coming!]( http://github.com/microsoft/vscode-copilot-release/issues/)), which has inspired many of the improvements we have made. Most notably:
* Undo now reverts changes up to the last edit file tool call
* Support for multiple agent sessions in the same workspace (best when editing sessions do not overlap)
* The agent can now edit notebooks and create new ones
* The ability to auto-approve tool calls (terminal auto-approve coming in April)
* A host of quality-of-life improvements and bug fixes

Both the Ask and Edit experiences are evolving towards an architecture that, like the agent, utilizes tools. We are making this change to unify Ask/Edit/Agent modes to all be agentic (with the goal of smoothening the overall user experience). This allows the Edit mode to use the `edit_file` tool for improved speed, and the Edit and Ask mode to use `#codebase` – an agentic codebase search. Consequently, language models with no tool calling support will no longer be available in Edit mode.

If you want to learn more about how the agent works you can read our [previous post]( https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode).

## Extensible: MCP servers and VS Code extensions

Just as VS Code extensions enable you to customize your specific workflows, agent extensibility allows you to tailor the agent to your unique needs. With extensibility, the agent can perform browser actions (perform AI web debugging), connect to your chat and note-taking apps, interact with your databases, get context from your design system, get issues and repo context from GitHub and integrate with your cloud platforms. The power of agent mode is in the diversity of tools available and the flexibility to add and remove tools as a user. We are launching extensibility in preview and available to all users.

Agent mode can use the following tools:
* Built-in tools contributed by VS Code (blue in the diagram), which allow the agent to search the workspace, read file contents, run terminal commands, retrieve compile or lint errors from the editor, apply proposed changes, fetch website content (`#fetch` to manually trigger) etc.
* Tools contributed by MCP servers (green in the diagram)
* Tools contributed by VS Code extensions (green in the diagram)

![Diagram showing the inner works of agent mode and how it interacts with context, LLM and tools - including tools contributed by MCP servers and VS Code extensions](diagram.png)

When the VS Code team invented the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) back in [2016](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol#_any-language-any-tool), our goal was to standardize how language servers communicate with development tools. We are proud that LSP has become a widely adopted standard and fulfilled our vision. Recently, the [ideas behind LSP]( https://x.com/dsp_/status/1897821339332882617) inspired a new protocol: the [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP), which standardizes how applications provide context to LLMs. By allowing the agent to use tools contributed by MCP servers we are bringing this story full circle back to VS Code.

### It's about developer control

Not every task needs all the tools you might have added to agent mode, and as with any AI workflow, being specific leads to better results. We recommend using the tools UI to manage and enable the tools needed for each scenario or explicitly adding tools to your prompt by pressing `#`.

![Edit UI showing how to enable and disable tools](tools-ui.png)

To give you full control, every tool invocation is transparently displayed in the UI and requires approval (unless it is built-in and read-only). You can allow a specific tool for the current session, workspace, or all future invocations. If you want to minimize interruptions by always allowing the agent to use all tools – while still maintaining security – consider using the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension. This isolates all agent-driven changes within the container environment up to a point (e.g. the agent could still push changes to remote if you allow it).

![Chat UI showing a tool call](tool-call.png)

### Get started

To customize the agent to your workflows, click the **Tools** icon in the Chat input and follow the **Add More Tools…** flow. Alternatively, read our [MCP server docs](https://aka.ms/vscode-add-mcp), which explain the configuration format, how to add an MCP server, or how to import MCP servers from an existing MCP client app (e.g., Claude Desktop). VS Code supports local standard input/output (`stdio`) and server-sent events (`sse`) for MCP server transport.

MCP's [official server repository](https://github.com/modelcontextprotocol/servers) is a great starting point for official, and community-contributed servers that showcase MCP's versatility. To install extensions that contribute tools, simply open the extensions view and search using the tag `@tag:language-model-tools`.

![extension search showing extensions that contribute tools](tool-extensions.png)

As a developer you can extend the agent by creating an MCP server, or if you are an extension author you can [contribute tools]( https://marketplace.visualstudio.com/search?term=%40tag%3Alanguage-model-tools&target=VSCode&category=All%20categories&sortBy=Relevance) to your VS Code extension. Refer to [these docs](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview) for guidance and best practices on writing tools.

## What’s next

Agent mode is improving every day, and to be among the first to benefit consider installing [VS Code Insiders]( https://code.visualstudio.com/insiders/). Using VS Code Insiders and providing feedback in [our repo](http://github.com/microsoft/vscode-copilot-release/issues/) is the best way to help us improve the product. Next, we plan to work on:
* Support for custom modes with custom toolsets and [instructions]( https://code.visualstudio.com/docs/copilot/copilot-customization)
* Faster code apply experience
* Checkpoints to easily go back to a specific step in your agent mode session
* Expand MCP support from tools to prompts, resources, sampling, and the latest spec updates
* Streaming of edits limited to changed code blocks for improved speed
* Overall performance and service quality improvements

Make sure you are on the latest VS Code Stable, set `setting(chat.agent.enabled:true)` in your settings and select **Agent** from the mode dropdown. Try it out today and let us know what you think! You can find the documentation [here](https://aka.ms/vscode-copilot-agent).

Happy coding!

Isidor and the VS Code team
