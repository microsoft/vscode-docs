---
ContentId: 364a2f92-20c6-4539-9657-4a147bc60f34
DateApproved: 10/28/2026
MetaDescription: Replace deprecated tool sets with custom-agent tool selections and plugins in {% data variables.product.prodname_vscode %}.
Keywords:
- copilot
- ai
- agents
- tools
- tool sets
- customization
---
# Tool sets (deprecated)

User-defined tool sets group existing tools under a reusable name. They are deprecated and are not supported in the Copilot harness. Tool-set files remain available only for Local harness compatibility.

To move an existing workflow to the Copilot harness, follow [Replace tool sets](/docs/agent-customization/migrate-customizations.md#replace-tool-sets).

## Choose a replacement

* For a recurring role, specify supported tools directly in a [custom agent](/docs/agent-customization/custom-agents.md).
* For personal tool availability, use the [Tools tab in the Agent Customizations editor](/docs/agents/run/tools.md#manage-available-tools).
* To distribute a workflow with external tools, package skills and MCP servers in an [agent plugin](/docs/agent-customization/agent-plugins.md).

The tool groups displayed by the Copilot harness and its supported built-in tool aliases are not user-defined tool-set files. A plugin or skill does not recreate a named tool-set alias.

## Related resources

* [Migrate existing customizations](/docs/agent-customization/migrate-customizations.md)
* [Tools and context reference](/docs/agents/reference/tools-reference.md)
