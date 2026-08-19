---
ContentId: 4ef4e839-e552-4b61-954e-ad58fbd9a2bd
DateApproved: 8/19/2026
MetaDescription: Manage the client-side tools available to Copilot harness sessions in Agent Host across chats and Visual Studio Code user profiles.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- agents
- agent host
- tools
- extensions
- customization
---
# Manage tools for the Copilot harness

The **Tools** section in the Agent Customizations editor controls which client-side tools Visual Studio Code makes available to sessions that use the [Copilot harness](/docs/agents/run/agent-harnesses.md). Use it to limit the tools that the agent can choose from across chats.

Disabled tools aren't advertised to the agent. This reduces the set of tools that the agent has to consider and prevents it from requesting tools that you don't want it to use.

> [!NOTE]
> The **Tools** section is only available for the Copilot harness, which runs on [Agent Host](/docs/agents/concepts/agent-host.md). For this harness, tool choices are profile-wide and persist across sessions. Other harnesses use the **Configure Tools** picker in the Chat view to select tools for individual requests.

## Open the Tools section

To manage tools for the Copilot harness:

1. Select the **Copilot** harness from the agent picker in the chat input.

1. Open the Agent Customizations editor:

    * In the Chat view, select **Configure Chat** (gear icon), or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
    * In the Agents window, go to the **Customizations** panel.

1. Select **Tools**.

If the **Tools** section isn't visible, verify that the Copilot harness is selected.

## Manage tool availability

Tools are organized into collapsible groups. For example, VS Code groups tools for editor operations, tasks, the integrated browser, and extensions that contribute language model tools.

All client-side tools are available by default. You can:

* Enter text in the search box to filter tool groups and individual tools.
* Select a tool group checkbox to enable or disable every tool in the group.
* Expand a group and select individual tools. The group checkbox shows a mixed state when only some tools are enabled.
* Review the enabled and total tool counts shown for each group.

The count beside **Tools** in the customization navigation includes enabled client-side tools and excludes the read-only Copilot tools.

Changes apply to Copilot harness sessions and persist in the active [user profile](/docs/configure/profiles.md).

The **Copilot** group lists the harness's built-in tools. These tools run in the Copilot runtime and are read-only in the Tools section. Other tools run in the VS Code client and are available to the agent only while the client is connected.

Tool availability is separate from tool approval. Enabling a tool makes it available to the agent, but doesn't bypass the configured [approval and permission controls](/docs/agents/run/approvals.md).

## Add tools from extensions

In the main VS Code window, you can find extensions that contribute language model tools:

1. Open the **Tools** section and select **Browse Marketplace**.

1. Search for an extension and select it to view its details and contributed tools.

1. Install the extension. Its tools then appear in the tool list, where you can manage their availability.

The Agents window shows the tool availability list but doesn't include Marketplace browsing.

To remove an extension from the tool list, right-click its tool group and select **Uninstall Extension**.

> [!CAUTION]
> Uninstalling a tool extension removes the entire extension, including contributions that aren't tools.

## Related resources

* [Tools concepts](/docs/agents/concepts/tools.md)
* [Use tools with agents](/docs/agents/run/tools.md)
* [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md)
* [Use agent harnesses](/docs/agents/run/agent-harnesses.md)
