---
ContentId: 364a2f92-20c6-4539-9657-4a147bc60f34
DateApproved: 10/14/2026
MetaDescription: Group tools for Local harness prompts and custom agents with reusable tool sets in {% data variables.product.prodname_vscode %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- tools
- tool sets
- customization
---
# Create and use tool sets

A tool set is a reusable collection of agent tools that you can reference as a single entity. This article describes user-defined tool-set files for organizing related tools in prompts, [prompt files](/docs/agent-customization/prompt-files.md), and [custom agents](/docs/agent-customization/custom-agents.md) in Local sessions.

> [!IMPORTANT]
> User-defined tool-set files are supported only in **Local** harness sessions. For the **{% data variables.product.prodname_copilot_short %}** harness, configure tools through its tool controls or a custom agent's tool list instead. See [customizations without automatic migration](/docs/agent-customization/migrate-customizations.md#customizations-without-automatic-migration).

{% data variables.product.prodname_vscode_shortname %} also provides predefined tool sets, such as `#edit` and `#search`.

## Create a tool set

Select **Local** as the **Session Target** in the {% data variables.copilot.chat_view %}, then create a tool set:

1. Run **Chat: Configure Tool Sets** from the Command Palette and select **Create new tool sets file**.

    Alternatively, select the ellipsis (**...**) menu in the {% data variables.copilot.chat_view %}, select **Tool Sets**, and then select **Create new tool sets file**.

1. Define your tool set in the `.jsonc` file that opens.

    The following example creates a tool set named `reader`:

    ```json
    {
        "reader": {
            "tools": [
                "search/changes",
                "search/codebase",
                "read/problems",
                "search/usages"
            ],
            "description": "Tools for reading and gathering context",
            "icon": "book"
        }
    }
    ```

    A tool set has the following properties:

    * `tools`: array of built-in, MCP, or extension tool names.
    * `description`: brief description displayed in the tools picker.
    * `icon`: icon for the tool set. See the [Product Icon Reference](/api/references/icons-in-labels.md).

## Use a tool set

Reference a tool set in a prompt by typing `#` followed by its name:

```prompt
Analyze the codebase for security issues #reader
```

In the tools picker, tool sets appear as collapsible groups. Select or deselect a tool set to change the availability of all its tools at once.

You can also reference tool sets in [prompt files](/docs/agent-customization/prompt-files.md) and [custom agents](/docs/agent-customization/custom-agents.md).

## Related resources

* [Use tools with agents](/docs/agents/run/tools.md)
* [Add MCP servers](/docs/agent-customization/mcp-servers.md)
* [Create custom agents](/docs/agent-customization/custom-agents.md)
