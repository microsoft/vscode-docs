---
ContentId: b52d0265-d616-4c76-8910-c4e83d1efe13
DateApproved: 10/28/2026
FeatureStatus: copilot-connectors
MetaDescription: Connect external services to {% data variables.product.prodname_copilot_short %} without server setup, use their tools, and manage connections.
MetaSocialImage: images/customization/chat-customizations-editor.png
Keywords:
- copilot connectors
- github-managed mcp servers
- external services
- mcp
- tools
- ai
---
# Connect services with {% data variables.product.prodname_copilot_short %} connectors in {% data variables.product.prodname_vscode_shortname %}

Bring context from services such as Slack, Notion, and Microsoft Learn into your agent sessions with {% data variables.product.prodname_copilot_short %} connectors, also called {% data variables.product.prodname_github %}-managed MCP servers. Connect a supported service without installing a local server, writing MCP configuration, or managing credentials.

Connect a service once and reuse the connection across supported {% data variables.product.prodname_copilot_short %} clients signed in with the same account. {% data variables.product.prodname_github %} manages the connection and keeps you signed in.

If the service you need isn't available as a connector, [add an MCP server](/docs/agent-customization/mcp-servers.md) using the publisher's URL or launch command instead.

## Before you start

* Sign in to {% data variables.product.prodname_vscode_shortname %} with your GitHub.com account. Connectors are available on all {% data variables.product.prodname_copilot %} plans.
* Select **Copilot** in the **Session Target** dropdown. Connectors provide tools to the [Copilot harness](/docs/agents/run/agent-harnesses.md#copilot), not Local harness sessions.

Marketplace discovery and connectors are enabled by default with `setting(chat.customizations.marketplace.enabled)` and `setting(chat.customizations.copilotConnectors.enabled)`.

For Business and Enterprise plans, an administrator must turn on the **Editor preview features** policy. When that policy is off, both settings are forced off. Some services also require approval from a service administrator, such as allowing Slack MCP access. Your organization's MCP access restrictions also apply. See [administration guidance for connectors](https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist#allowing-copilot-connectors).

## Connect a service

Connectors are a source in the [Customization Marketplace](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview). Unlike installing a skill or plugin, connecting a service authorizes access to its tools rather than installing customization files.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`) and select **Browse**.

1. Choose **Copilot Connectors** in the source menu, or search for a service by name.

1. Open the connector's details and select **Connect**.

1. Review the requested permissions and complete authorization in your browser, including service sign-in when required.

1. Wait for the status to show **Connected**.

<!-- TODO: Add a screenshot showing a Copilot connector's details and Connect action in the Agent Customizations editor. -->

While authorization is pending, select **Cancel** to stop connecting. You can select **Connect** again to retry.

## Use a connected service

Return to your {% data variables.product.prodname_copilot_short %} session and ask a question that needs information from the service. {% data variables.product.prodname_copilot_short %} uses connected services' tools when they're relevant to your request.

For example, after connecting **Microsoft Learn Docs**, enter:

```prompt
Use the Microsoft Learn Docs connector to find the official documentation for the Kusto Query Language where operator. Summarize its syntax and link to the documentation.
```

Review tool approval requests before accepting them. Expand the tool call in the conversation to check that the agent used the connected service and received a result. A plausible answer alone doesn't confirm that the connector was used.

## Disconnect a service

Connected services appear in **MCP Servers** with a **Connector: &lt;name&gt;** label. Their connections are managed by {% data variables.product.prodname_github %}, not by a local MCP configuration file.

1. With the **Copilot** harness selected, run **Chat: Open Customizations** and select **MCP Servers**.

1. Find the connector's row and open its ellipsis (**...**) menu.

1. Select **Disconnect** and wait for the operation to complete.

The connector's row disappears, and its tools are no longer available to the {% data variables.product.prodname_copilot_short %} session. Use **Disconnect**, not **Uninstall** or a configuration-file edit, to remove a connector.

To use the service again, [connect it from the Agent Customizations editor](#connect-a-service).

## Troubleshoot a connection

| What you observe | Next step |
|------------------|-----------|
| Connectors don't appear in **Browse** | Check that the **Copilot** harness is selected, both discovery settings are on, and your account and administrator policies permit access. |
| The status stays at **Connecting** | Select **Cancel**, then select **Connect** and complete authorization in the browser. |
| Service sign-in fails or access is denied | Review the requested permissions and check whether a service administrator needs to approve MCP access before retrying. |
| The connector is connected, but no tool is called | Check that the session uses the **Copilot** harness, name the service explicitly in your prompt, and inspect the tool call. See [tool availability and invocation](/docs/agents/agent-troubleshooting/chat-debug-view.md#an-mcp-tool-is-not-being-invoked). |

## Related resources

* [Browse available connectors](https://github.com/copilot/customize).
* [{% data variables.product.prodname_github %}-managed MCP servers](https://docs.github.com/copilot/concepts/customizations/copilot-connectors).
