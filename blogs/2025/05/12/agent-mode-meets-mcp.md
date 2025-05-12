---
Order: 98
TOCTitle: Agent Mode Meets MCP
PageTitle: "Agent mode meets MCP: bring your own tools"
MetaDescription: Bring your own tools to VS Code's agent mode with MCP.
MetaSocialImage: agent_full.png
Date: 2025-05-12
Author: Harald Kirschner
---

# Agent mode meets MCP: bring your own tools

May 12th, 2025 by [Harald Kirschner](https://github.com/digitarald)

Since MCP (Model Context Protocol) support landed last month in VS Code, it’s time for a deep dive into what it does and how it works. VS Code’s agent mode is deeply integrated to access everything inside your workspace; update files, check for errors, run build tasks, check the tests, and more. But if you ask the agent to write database queries, you might need your database schema is in your codebase or paste it in for accurate results. Once you install an MCP database server, like [postgres](https://github.com/modelcontextprotocol/servers/tree/main/src/postgres) or [sqlite](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite), agent mode can connect check your database for current tables and fields to write real, up-to-date info for queries.

<!-- [ANIMATION: MCP agent workflow in VS Code] -->

Think of MCP as the “API for your AI.” Instead of being stuck with whatever the model was trained on, you can wire up custom endpoints, scripts, or services, and VS Code’s agent mode can query them on the fly.  MCP is fast-growing ecosystem of interoperable building blocks to extend AI agents, so you will find servers for any use case—some examples:

- [Playwright MCP Server](https://github.com/microsoft/playwright-mcp): Agent opens the web preview after making frontend changes and does a visual verification.

- [GitHub MCP Server](https://github.com/github/github-mcp-server/): Agent searches for the most up-voted bug, diagnose and fix it and create a draft PR.

- [Context7](https://github.com/upstash/context7/): Agent reads the developer documentation to pick the right APIs and follow framework best practices.

The [official server repository](https://github.com/modelcontextprotocol/servers) is a good place to find more MCP servers.

## Easy and Secure to Manage

Most MCP setup instructions will ask to copy JSON objects into a mcp.json file, like .vscode/mcp.json, but we wanted to make it even easier to get started. VS Code’s **MCP: Add Server** command takes a NPM, PyPi or Docker package and automatically discover the necessary commands to set up the MCP server. Websites can show an _Install in VS Code_ button ([learn how](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_url-handler)) that opens VS Code to confirm and finish the setup. VS Code also auto-discovers existing MCP configurations from Claude Desktop or other clients, eliminating redundant setup.

<!-- [MCP server quick setup in VS Code] -->

Another pain point of configuring MCP servers is how to manage secrets in the configuration. We added some convenience features to keep your secrets out of source control:

- **Input variables**: Inputs are prompted once when the MCP server starts the first time, then encrypted at rest when marked as _password._
- **Environment files**: Standard .env files you already trust and have set up for local development can be pointed to via envFile to reference its environment variables in the server configuration.

A secure way to manage secrets makes it easier to have configuration committed and shared across the team. Discovery and security remain hot topic for MCP, so you can expect a lot more improvement shipping soon.

## Deeper Spec Capabilities

Most MCP servers provide a basic set of tools, which already provide a lot of productivity. VS Code supports more aspects of the spec that make MCP servers more adaptive and contextual; solving some problems we hear from MCP server developers.

[**Roots**](https://modelcontextprotocol.io/docs/concepts/roots)  provide servers with a list of folders to understand what you are working on. Without roots, servers need to manually ask for folder paths via tool calls or configuration. VS Code sends your open workspace folders as list of _roots_ when it initializes an MCP server. This allows MCP servers to customize tools based on workspace files and even act on files in the workspace. Imagine tools that immediately locate "TODO" markdown files or provide deployment tools based on your infra-as-code scripts.

[**Dynamic Tool Discovery**](https://modelcontextprotocol.io/docs/concepts/tools#tool-discovery-and-updates) _(list-changed events )_ is a concept that allows servers to notify clients that their available tools changed. Without dynamic tool discovery, the list of tools a server provides is defined once during initialization. Making tools more dynamic and adaptive can avoid overwhelming AI agent with irrelevant tools. MCP servers can dynamically add/remove tools based on scope, context or state—like a to-do server that updates tools as tasks are completed or an API monitoring server showing tools depending on which features are enabled for an endpoint. GitHub’s official MCP server is using this in their [“dynamic toolset discovery”](https://github.com/github/github-mcp-server/?tab=readme-ov-file#dynamic-tool-discovery) feature, which gives client control to enable/disable sets of tools on demand during an agent session.

[**Tool annotations**](https://modelcontextprotocol.io/docs/concepts/tools#tool-annotations) are a recent addition to the spec and are meant for clients like VS Code as hints on how to display and manage tools. VS Code added support for human-readable tool names (_title_). The support for _readOnlyHint_ flag allows tools to run similar to built-in read-only tools.

[**Streamable HTTP**](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) is the latest remote transport mechanism for MCP, simplifying the development and deployment of MCP servers, particularly in cloud and serverless environments. It replaces using Server-Sent Events (SSE) as a more efficient and scalable remote transport. By having VS Code support for the latest spec, developers can stay current. Local MCP servers remain a great choice for developer tools, as they run on the local machine and have access to the workspace (via roots).

As more servers adopt these primitives, agentic workflows can become more precise, contextual, and composable.

## What's Next

MCP has gained traction with official servers from GitHub, Playwright, Azure, and Perplexity, alongside a growing community of over a thousand servers. As more agents adopt the protocol, MCP is becoming foundational infrastructure for practical AI-assisted development. As the protocol matures and the ecosystem expands, we'll continue refining the experience based on your feedback and in collaboration with the MCP community.

Ready to start? Check out [ModelContextProtocol.io](https://modelcontextprotocol.io/), [VS Code MCP Docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), or [Example servers on GitHub](https://github.com/modelcontextprotocol/servers).

Happy smarter coding.