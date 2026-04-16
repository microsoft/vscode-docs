---
ContentId: 60ed75f8-8cde-43b6-bd24-d0f0fc01937d
DateApproved: 04/15/2026
MetaDescription: Learn how to connect Foundry tools and local MCP server tools using the Tool Catalog in Visual Studio Code and add them to agents with Agent Builder in Microsoft Foundry.
---

# Add MCP Server tools to agents with AI Foundry's Tool Catalog

In Microsoft Foundry, a tool is an external capability that an agent can call to perform actions or retrieve data beyond the model’s built-in knowledge. Tools enable agents to interact with APIs, services, or local resources to complete tasks more effectively.

The Tool Catalog in the Foundry Toolkit extension for Visual Studio Code lets you connect tools and add them to your agents.

This article explains how to:

- Connect Foundry tools
- Connect local MCP server tools
- Add tools to agents in Agent Builder

## When to use each option

- **Foundry tools** Use with prompt agents running in Microsoft Foundry
- **Local MCP servers** Use with local agents that rely on tools running in your environment

## Connect a Foundry tool

Use Foundry tools when building prompt agents backed by Microsoft Foundry.

1. In the Foundry Toolkit panel, select **My Resources** > **Your project name** > **Tools**
1. Select the **+** icon next to **Tools** to open the **Tool Catalog**
1. Go to the **Catalog** tab
1. Browse available tools
1. Select a tool and choose the **Connect** button
1. On the **Connect** dialog, you'll provide a name, endpoint, parameters, authentication credentials, and so on.
1. Select the **Connect** button.

After connecting, the tool is available for use in your agents.

## Connect a local MCP server tool

Use local MCP servers when building agents that run locally.

1. In the Foundry Toolkit panel, select **My Resources** > **Your project name** > **Tools**
1. Select the **+** icon next to **Tools** to open the **Tool Catalog**
1. Go to the **Custom** tab
1. Choose one of the following options:
   - Edit mcp.json to define a server
   - Configure (stdio) to run a local command
   - Configure (HTTP / SSE) to connect to a remote endpoint
1. Save or complete the configuration

Once configured, the MCP server appears as an available tool.

## Add a tool to an agent

After connecting a tool, add it to your agent:

1. Open Agent Builder for a given agent using the Foundry Toolkit panel. There are several ways to do this, including selecting an existing agent in  **My Resources** > **Your project name** > **Prompt agents**, or selecting **Developer Tools** > **Build** > **Create Agent**
1. In the Agent Builder, on the **Playground** tab, in the **Tool** section,  select **+**
1. The **Select a tool** dialog appears. From here you can add a pre-configured tool, a catalog tool, or a custom tool. This is similar to the options in the **Tool catalog**. Select your desired tool, configure the options.
1. Select **Add Tool** button

The tool is now attached to your agent and can be used during execution.
