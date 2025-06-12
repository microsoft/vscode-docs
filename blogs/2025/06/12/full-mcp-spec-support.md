---
Order: 98
TOCTitle: Full MCP Spec Support
PageTitle: "The Complete MCP Experience: Full Specification Support in VS Code"
MetaDescription: VS Code now supports the complete Model Context Protocol specification, including authorization, prompts, resources, and sampling.
MetaSocialImage: agent-mcp-tools.png
Date: 2025-06-12
Author: Harald Kirschner
---

# The Complete MCP Experience: Full Specification Support in VS Code

June 12th, 2025 by [Harald Kirschner](https://github.com/digitarald), [Connor Peet](https://github.com/connor4312), and [Tyler Leonhardt](https://github.com/tylerleonhardt)

VS Code now supports the complete [Model Context Protocol specification](https://modelcontextprotocol.io/).

Beyond the initial tools and workspace awareness we [introduced in May](https://code.visualstudio.com/blogs/2025/05/12/agent-mode-meets-mcp), you can now use authorization, prompts, resources, and sampling. These additions transform MCP from a set of individual tools into a comprehensive standard for AI agent integrations.

## Security-First: The New Authorization Foundation

The [new authorization specification](https://modelcontextprotocol.io/specification/draft/basic/authorization) is the biggest leap forward. Microsoft, Anthropic, and the broader identity community—including Okta/Auth0, Stytch, and Descope—collaborated on this effort. The new specification cleanly separates MCP servers as Resource Providers from Authorization Servers, allowing developers to delegate authentication to existing identity providers rather than building their own OAuth implementations from scratch. For the technical details on how the new authorization flow works, check out [Den Delimarsky's comprehensive overview](https://den.dev/blog/new-mcp-authorization-spec/).

Combined with **streamable HTTP transport** (which landed in our previous version), this enables remote MCP servers that can scale independently while maintaining enterprise-grade security. The [GitHub MCP Server](https://github.blog/changelog/) demonstrates this evolution perfectly—it's now available as a remote server with proper OAuth integration that leverages VS Code's existing GitHub authentication and account management, so you can securely connect repositories and issue tracking.

## Beyond Tools: The Complete MCP Primitives

While tools handle individual actions, [**Prompts**](https://modelcontextprotocol.io/docs/concepts/prompts) deliver complete workflows. These aren't static templates—they're dynamic, context-aware starting points that servers can tailor to your current workspace and project state. When a server provides prompts, they appear directly in VS Code's slash commands next to your [user-defined prompts](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental), letting you invoke sophisticated workflows with a simple `/mcp.servername.promptname` command.

[**Resources**](https://modelcontextprotocol.io/docs/concepts/resources) represent semantic information that you can interact with directly: Screenshots you can save and reference, log files that stream updates in real-time, or full issues to reference without vague descriptions. When the Playwright MCP server takes a screenshot of a web application, that image can become a resource you can drag into your workspace, annotate, or share with teammates. When debugging tools return logs, those logs can stream live updates directly in VS Code.

Perhaps the most upvoted MCP capability is [**Sampling**](https://modelcontextprotocol.io/docs/concepts/sampling), the ability for MCP servers to make their own language model requests. Instead of servers managing their own AI SDKs and API keys, they leverage your existing model subscription. This enables complex reasoning and multi-agent coordination while you maintain control over security, privacy, and costs.

## Ready to Explore

The complete MCP experience is available now in VS Code. Try the GitHub MCP server with its new remote capabilities and VS Code authentication integration, explore servers that provide rich prompts and resources, or build your own server that takes advantage of the full specification.

To get started, check out the [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), browse the [official server repository](https://github.com/modelcontextprotocol/servers), or dive into the [Model Context Protocol specification](https://modelcontextprotocol.io/).

The MCP ecosystem now has a client that provides the complete foundation to build on.

*Happy Coding!*