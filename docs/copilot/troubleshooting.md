---
ContentId: f8e4b2c1-9d3a-4e5f-b6c7-8a9d0e1f2b3c
DateApproved: 02/04/2026
MetaDescription: Troubleshoot GitHub Copilot issues in Visual Studio Code with logs, diagnostics, and debugging tools.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- troubleshooting
- diagnostics
- logs
- debugging
---
# Troubleshoot AI in Visual Studio Code

This article covers diagnostic tools and techniques for troubleshooting AI-related issues in VS Code. Use these tools to identify problems with network connectivity, customization files, and AI responses.

## View logs for GitHub Copilot

The log files for the GitHub Copilot extension are stored in the standard log location for Visual Studio Code extensions. Use these logs to diagnose connection issues, extension errors, and unexpected behavior.

To view detailed logs:

1. Open the Command Palette (`kb(workbench.action.showCommands)`).
1. Run **Developer: Set Log Level** and set the value to **Trace** for the GitHub Copilot and GitHub Copilot Chat extensions.
1. Run **Output: Show Output Channels** and select either **GitHub Copilot** or **GitHub Copilot Chat** from the list.
1. In the Output panel, view the logs for the selected extension.

To switch between output channels, select **GitHub Copilot** or **GitHub Copilot Chat** from the dropdown menu on the right side of the Output panel.

## Collect network diagnostics

If you encounter problems connecting to GitHub Copilot, collect network connectivity diagnostics to identify firewall, proxy, or VPN issues.

1. Open the Command Palette (`kb(workbench.action.showCommands)`).
1. Run **GitHub Copilot: Collect Diagnostics**.
1. An editor tab opens with diagnostic information you can review and share when reporting issues.

For more information about network configuration, see [Network and firewall configuration for Copilot](/docs/copilot/faq.md#network-and-firewall-configuration-for-copilot).

## Chat Debug view

The Chat Debug view shows the details of AI requests and responses, including the system prompt, user prompt, context sent to the language model, and tool invocations. Use this view to understand how the AI interprets your requests and what context it uses to generate responses.

To open the Chat Debug view:

1. Select the overflow menu (`...`) in the Chat view.
1. Select **Show Chat Debug View**.

Alternatively, run **Developer: Show Chat Debug View** from the Command Palette.

Learn more about the [Chat Debug view](/docs/copilot/chat/chat-debug-view.md).

## Chat customization diagnostics

The chat customization diagnostics view shows all currently loaded custom agents, prompt files, instruction files, and skills. Use this view to troubleshoot issues with customization files that aren't being applied or are causing errors.

To open the diagnostics view:

1. Right-click in the Chat view.
1. Select **Diagnostics**.

This opens a markdown document listing:

* All active customization files and their locations
* Load status for each file (loaded, failed, or skipped)
* Error messages for files that failed to load
* The order in which instructions are applied

> [!TIP]
> If a customization file isn't being applied, check the diagnostics view to verify it was loaded successfully and review any error messages.

## Troubleshoot MCP servers

MCP servers extend chat capabilities by connecting to external services. If an MCP server isn't working correctly, you can view its logs and restart it.

To troubleshoot MCP servers:

1. Open the Command Palette and run **MCP: List Servers**.
1. Select a server to view its status and available actions.
1. Select **Show Output** to view the server's logs.
1. Select **Restart Server** to restart a misbehaving server.

Learn more about [configuring and debugging MCP servers](/docs/copilot/customization/mcp-servers.md).

## Provide feedback

If you encounter issues that you can't resolve, report them to help improve GitHub Copilot:

* **Ghost text suggestions**: Hover over a ghost text suggestion in the editor and select **Send Copilot Completion Feedback**.
* **Next edit suggestions**: Select the **Feedback** action in the next edit suggestions menu in the editor gutter.
* **General issues**: Open **Help** > **Report Issue**, select **VS Code Extension**, and choose **GitHub Copilot Chat**.

When reporting issues, include relevant information from the [Copilot logs](#view-logs-for-github-copilot) to help diagnose the problem.

## Related resources

* [Chat Debug view](/docs/copilot/chat/chat-debug-view.md)
* [Custom instructions](/docs/copilot/customization/custom-instructions.md)
* [MCP servers](/docs/copilot/customization/mcp-servers.md)
* [GitHub Copilot FAQ](/docs/copilot/faq.md)
