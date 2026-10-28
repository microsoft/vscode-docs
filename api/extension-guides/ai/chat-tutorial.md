---
# DO NOT TOUCH — Managed by doc writer
ContentId: bea1d4c5-71e5-4b27-ac1e-fa9b59886dab
DateApproved: 10/28/2026
MetaDescription: Migrate a code-tutor chat participant to an agent plugin with skills, MCP tools, and interactive exercises.
---

# Code-tutor chat participant tutorial (deprecated)

Chat participants are deprecated and are not supported in the Copilot harness. This tutorial has been retired. The Chat Participant API remains available for Local harness compatibility.

For the supported approach, follow [Migrate a code tutor to a plugin](/docs/agent-customization/migrate-customizations.md#example-migrate-a-code-tutor-to-a-plugin). Package teaching workflows as skills and exercise operations as MCP tools. Use MCP Apps for interactive exercises, and extension tools when you need live editor context.

The migration guide explains which participant responsibilities have replacements and which require redesign. Renaming a participant or copying its request handler into a custom-agent file does not migrate the integration.

## Related resources

* [Package an agent plugin](/docs/agent-customization/agent-plugins.md)
* [Build MCP tools and Apps](/api/extension-guides/ai/mcp.md)
* [Build editor annotations with the Language Model API](/api/extension-guides/ai/language-model-tutorial.md)
