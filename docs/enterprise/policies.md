---
# DO NOT TOUCH — Managed by doc writer
ContentId: 200bf922-3684-45ee-a8dd-43191d6b3f8b
DateApproved: 01/08/2026

VSCodeCommitHash: 587d46304c7f6c500b66440a4314f6d4540a4724
VSCodeVersion: 1.108.0

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Enterprise policies in Visual Studio Code enable organizations to centrally manage settings for their development teams. This reference details the available policies and how to implement them.
---

# Enterprise policies for VS Code

In this article, you learn about enterprise policies in Visual Studio Code. Policies enable organizations to manage and enforce settings across their development teams.

## Policy reference

The following table lists all available enterprise policies in VS Code.

| Policy Name | Setting ID | Description | Minimum Version |
|------------|------------|-------------|----------------|
| `McpGalleryServiceUrl` | `setting(chat.mcp.gallery.serviceUrl)` | Configure the MCP Gallery service URL to connect to | 1.101 |
| `ExtensionGalleryServiceUrl` | `setting(extensions.gallery.serviceUrl)` | Configure the Marketplace service URL to connect to | 1.99 |
| `AllowedExtensions` | `setting(extensions.allowed)` | Specify a list of extensions that are allowed to use. This helps maintain a secure and consistent development environment by restricting the use of unauthorized extensions. More information: https://code.visualstudio.com/docs/setup/enterprise#_configure-allowed-extensions | 1.96 |
| `ChatToolsAutoApprove` | `setting(chat.tools.global.autoApprove)` | Global auto approve also known as "YOLO mode" disables manual approval completely for all tools in all workspaces, allowing the agent to act fully autonomously. This is extremely dangerous and is *never* recommended, even containerized environments like Codespaces and Dev Containers have user keys forwarded into the container that could be compromised. This feature disables critical security protections and makes it much easier for an attacker to compromise the machine. | 1.99 |
| `ChatToolsEligibleForAutoApproval` | `setting(chat.tools.eligibleForAutoApproval)` | Controls which tools are eligible for automatic approval. Tools set to 'false' will always present a confirmation and will never offer the option to auto-approve. The default behavior (or setting a tool to 'true') may result in the tool offering auto-approval options. | 1.107 |
| `ChatMCP` | `setting(chat.mcp.access)` | Controls access to installed Model Context Protocol servers. | 1.99 |
| `ChatAgentExtensionTools` | `setting(chat.extensionTools.enabled)` | Enable using tools contributed by third-party extensions. | 1.99 |
| `ChatAgentMode` | `setting(chat.agent.enabled)` | When enabled, agent mode can be activated from chat and tools in agentic contexts with side effects can be used. | 1.99 |
| `ChatToolsTerminalEnableAutoApprove` | `setting(chat.tools.terminal.enableAutoApprove)` | Controls whether to allow auto approval in the run in terminal tool. | 1.104 |
| `UpdateMode` | `setting(update.mode)` | Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service. | 1.67 |
| `TelemetryLevel` | `setting(telemetry.telemetryLevel)` | Controls the level of telemetry. | 1.99 |
| `EnableFeedback` | `setting(telemetry.feedback.enabled)` | Enable feedback mechanisms such as the issue reporter, surveys, and other feedback options. | 1.99 |


## Related resources

TODO
