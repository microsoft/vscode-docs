---
# DO NOT TOUCH — Managed by doc writer
ContentId: ac3f00c8-78a8-408c-8af6-3e997a482972
DateApproved: 10/21/2026
MetaDescription: Replace deprecated chat participants with agent plugins, MCP tools and Apps, or editor-specific extension tools.
---

# Chat participants (deprecated)

Chat participants are deprecated and are not supported in the Copilot harness. The Chat Participant API remains available for Local harness compatibility. Do not use it for new Copilot integrations.

For an existing participant, follow [Replace chat participants](/docs/agent-customization/migrate-customizations.md#replace-chat-participants). The guide covers migration for both people who use a participant and extension authors who maintain one.

## Choose a replacement

Start with an [agent plugin](/docs/agent-customization/agent-plugins.md) that packages skills and an MCP server:

* **Skills** provide domain knowledge and reusable workflows that users can invoke as slash commands.
* **MCP tools** retrieve data and perform actions.
* **MCP Apps** provide interactive controls, including buttons, forms, and multi-step workflows. See the [MCP development guide](/api/extension-guides/ai/mcp.md#mcp-apps).
* **Custom agents** optionally provide an ongoing specialist role.

Use [extension tools](/api/extension-guides/ai/tools.md) when the integration needs live editor context or access to {% data variables.product.prodname_vscode_shortname %} APIs. For information the user can supply directly, use [chat context attachments](/docs/chat/copilot-chat-context.md).

There is no automatic conversion of a participant's request handler, history, feedback events, or response UI. Rebuild interactive UI as an MCP App where appropriate; app-level confirmation does not replace host tool approvals. Keep bespoke model orchestration or editor UI in extension commands and views when it does not fit a tool-based workflow.

## Related resources

* [Migrate a code tutor to a plugin](/docs/agent-customization/migrate-customizations.md#example-migrate-a-code-tutor-to-a-plugin)
* [Build editor features with the Language Model API](/api/extension-guides/ai/language-model.md)
