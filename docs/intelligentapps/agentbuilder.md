---
ContentId: bd3d7555-3d84-4500-ae95-6dcd39641af0
DateApproved: 10/03/2025
MetaDescription: Get Started with creating, iterating and optimizing your agents in AI Toolkit.
---
# Build agents and prompts in AI Toolkit

> [!NOTE]
> Agent Builder was previously known as Prompt Builder. The updated name better reflects the feature's capabilities and its focus on building agents.

Agent Builder in AI Toolkit streamlines the engineering workflow for building agents, including prompt engineering and integration with tools, such as MCP servers. It helps with common prompt engineering tasks:

- Iterate and refine in real-time
- Provide easy access to code for seamless Large Language Model (LLM) integration via APIs

Agent Builder also enhances intelligent app's capabilities with tool use:
- Connect to existing MCP servers
- Build new MCP servers from scaffolds
- Use function calling to connect to external APIs and services

![Screenshot showing the Agent Builder interface with prompt engineering and testing capabilities.](./images/promptbuilder/AgentBuilder.gif)

## Create, edit, and test prompts

To access Agent Builder, use either of these options:

- In the AI Toolkit view, select **Agent Builder**
- Select **Try in Agent Builder** from a model card in the model catalog
- In the My Resources view, under **Models**, right-select a model and choose **Load in Agent Builder**

To test a prompt in Agent Builder, follow these steps:

1. If you haven't chosen a model, select one from the **Model** dropdown list in Agent Builder. You can also select **Browse models** to add a different model from the model catalog.

   ![Screenshot showing the model selection dropdown in Agent Builder.](./images/promptbuilder/select-models.png)

1. Enter the agent instructions.

   Use the **Instructions** field to tell your agent exactly what to do and how to do it. List the specific tasks, put them in order, and add any special instructions like tone or how to engage.

1. Iterate over your instructions by observing the model response and making changes to the instructions.
1. Use the `{{your_variable}}` syntax to add a dynamic value in instructions.  For example, add a variable called `user_name` and use it in your instructions like this: `Greet the user by their name: {{user_name}}`.
1. Provide a value for the variable in the **Variables** section.
1. Enter a prompt in the text box and select the send icon to test your agent.
1. Observe the model's response and make any necessary adjustments to your instructions.

## Use MCP servers

MCP server is a tool that allows you to connect to external APIs and services, enabling your agent to perform actions beyond just generating text. For example, you can use an MCP server to access databases, call web services, or interact with other applications.

Use the agent builder to discover and configure featured MCP servers, connect to existing MCP servers, or build a new MCP server from scaffold.

> [!NOTE]
> Using MCP servers might require either [Node](https://nodejs.org/en/download) or [Python](https://www.python.org/downloads/) environment. AI Toolkit validates your environment to ensure that the required dependencies are installed.
> After installing, use the command `npm install -g npx` to install `npx`. If you prefer Python, we recommend using [`uv`](https://docs.astral.sh/uv/getting-started/installation/)

### Configure a featured MCP server
AI Toolkit provides a list of featured MCP servers that you can use to connect to external APIs and services.

To configure an MCP server from featured selections, follow these steps:
1. In the **Tool** section, select **+ MCP Server**, and then select **MCP Server** in the Quick Pick.
1. Select **Could not find one? Browse more MCP servers** from the dropdown list.
      ![Screenshot showing the connect to MCP server interface in Agent Builder.](./images/promptbuilder/featured-server.png)

1. Choose an MCP server that meets your needs.
   ![Screenshot showing the connect to MCP server interface in Agent Builder.](./images/promptbuilder/featured-server.png)

1. The MCP server is added to your agent in the **MCP** subsection under **Tools**.

### Select tools from VS Code

1. In the **Tool** section, select **+ MCP Server**, and then select **MCP Server** in the Quick Pick.
1. Select **Use Tools Added in Visual Studio Code** from the dropdown list.
      ![Screenshot showing the connect to MCP server interface in Agent Builder.](./images/promptbuilder/featured-server.png)
1. Select tools you want to use.
   ![Screenshot showing the select tools interface in Agent Builder.](./images/promptbuilder/select-tools.png)

1. An MCP Server tool called `VSCode Tools` is added to your agent in the **MCP** subsection under **Tools**.

### Use an existing MCP server
> [!TIP]
> Find MCP servers in these [reference servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-reference-servers).

To use an existing MCP server, follow these steps:
1. In the **MCP Workflow** section, select **+ Add MCP Server**.

1. Or in Agent Builder, in the **Tool** section, select the `+` icon to add a tool for your agent, and then select **+ Add server** in the Quick Pick.
1. Select **MCP server** in the Quick Pick.
1. Select **Connect to an Existing MCP Server**
1. Scroll down to the bottom of the dropdown list for the options to connect to the MCP server:
   - **Command (stdio)**: Run a local command that implements the MCP protocol
   - **HTTP (HTTP or server-sent events)**: Connect to a remote server that implements the MCP protocol
1. Select tools from the MCP server if there are multiple tools available.
1. Enter your prompts in the text box and select the send icon to test the connection.

Here's an example of configuring the [Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) server in AI Toolkit:

1. In the **Tool** section, select **+ MCP Server** in the Quick Pick.
1. Select **Could not find one? Browse more MCP servers** from the dropdown list.
1. Scroll down to the bottom of the dropdown list and select **Command (stdio)**
   > [!NOTE]
   > Some servers use the Python runtime and the `uvx` command. The process is the same as using the `npx` command.
1. Navigate to the [Server instructions](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem#npx) and locate the `npx` section.
1. Copy the `command` and `args` into the input box in AI Toolkit. For the Filesystem server example, it's `npx -y @modelcontextprotocol/server-filesystem /Users/<username>/.aitk/examples`
1. Input an ID for the server.
1. Optionally, enter extra environment variables.
   Some servers might require extra environment variables such as API keys. In this case, AI Toolkit fails at the stage of adding tools and a file `mcp.json` opens, where you can enter the required server details following the instructions provided by each server.
   ![Screenshot showing an example of a missing arg exception](./images/promptbuilder/modify-args.png)
   After you complete the configuration:
       1. Navigate back to **Tool** section and select **+ MCP Server**
       1. Select the server you configured from the dropdown list

1. Select the tools you want to use.

![connect to MCP server](./images/promptbuilder/mcp_existing.gif)

AI Toolkit also provides a scaffold to help you build a new MCP server. The scaffold includes a basic implementation of the MCP protocol, which you can customize to suit your needs.

### Build a new MCP server

To build a new MCP server, follow these steps:
1. In the **MCP Workflow** section, select **Create New MCP Server**.
1. Select a programming language from the dropdown list: **Python** or **TypeScript**
1. Select a folder to create the new MCP server project in.
1. Enter a name for the MCP server project.

After you create the MCP server project, you can customize the implementation to suit your needs. The scaffold includes a basic implementation of the MCP protocol, which you can modify to add your own functionality.

You can also use the Agent Builder to test the MCP server. The Agent Builder sends the prompts to the MCP server and displays the response.

Follow these steps to test the MCP server:

> [!NOTE]
> To run the MCP Server in your local dev machine, you need: [Node.js](https://nodejs.org/) or Python installed on your machine.

1. Open VS Code Debug panel. Select `Debug in Agent Builder` or press `F5` to start debugging the MCP server.
1. The server is automatically connected to Agent Builder.
1. Use AI Toolkit Agent Builder to enable the agent with the following instructions:
   - "You are a weather forecast professional that can tell weather information based on given location.".

1. Enter the prompt "What is the weather in Seattle?" in the prompt box and select the send icon to test the server with the prompt.
1. Observe the response from the MCP server in the Agent Builder.

## Use function calling

Function calling connects your agent to external APIs and services.

![Screenshot showing the Add Custom Function Tool dialog with options to add tools by example or upload schemas.](./images/promptbuilder/add-function-call.png)

1. In **Tool**, select **Add Tool**, then **Custom Tool**.
1. Choose how to add the tool:
   - **By Example**: Add from a JSON schema example
   - **Upload Existing Schema**: Upload a JSON schema file
1. Enter the tool name and description, then select **Add**.
1. Provide a mock response in the tool card.

![Screenshot showing a function calling tool card with weather tool configuration.](./images/promptbuilder/function-call-card.png)

1. Run the agent with the function calling tool.

Use function calling tools in the **Evaluation** tab by entering mock responses for test cases.

![Screenshot showing function calling tool usage in the evaluation tab.](./images/promptbuilder/function-call-eval.png)

## Integrate prompt engineering into your application

After experimenting with models and prompts, you can get into coding right away with the automatically generated Python code.

![Animated GIF showing the generated Python code](./images/promptbuilder/view-code-2.gif)

To view the Python code, follow these steps:

1. Select **View Code**.

1. For models hosted on GitHub, select the inference SDK you want to use.

   AI Toolkit generates the code for the model you selected by using the provider's client SDK. For models hosted by GitHub, you can choose which inference SDK you want to use: [Agent Framework SDK](https://github.com/microsoft/agent-framework) or the SDK from the model provider, such as [OpenAI SDK](https://platform.openai.com/docs/libraries) or [Mistral API](https://docs.mistral.ai/api).

1. The generated code snippet is shown in a new editor, where you can copy it into your application.

   > To authenticate with the model, you usually need an API key from the provider. To access models hosted by GitHub, [generate a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (PAT) in your GitHub settings.

## What you learned

In this article, you learned how to:

- Use the AI Toolkit for VS Code to test and debug your agents.
- Discover, configure, and build MCP servers to connect your agents to external APIs and services.
- Set up function calling to connect your agents to external APIs and services.
- Implement structured output to deliver predictable results from your agents.
- Integrate prompt engineering into your application with generated code snippets.

## Next steps

- [Run an evaluation job](/docs/intelligentapps/evaluation.md) for the popular evaluators
