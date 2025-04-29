---
ContentId: bd3d7555-3d84-4500-ae95-6dcd39641af0
DateApproved: 04/22/2025
MetaDescription: Get Started with creating, iterating and optimizing your agents in AI Toolkit.
---
# Build agents and prompts in AI Toolkit

> [!NOTE]
> Agent Builder was previously known as Prompt Builder. The name has been changed to better reflect the feature's capabilities and its focus on building agents.

Agent Builder in AI Toolkit streamlines the engineering workflow for building agents, including prompt engineering and integration with tools, such as MCP servers. It helps with common prompt engineering tasks:
- Generate starter prompts
- Iterate and refine with each run
- Break down complex tasks through prompt chaining and structured outputs
- Provide easy access to code for seamless Large Language Model (LLM) integration via APIs

Agent Builder also enhances intelligent app's capabilities with tool use:
- Connect to existing MCP servers
- Build a new MCP server from scaffold and test in Agent Builder

![Getting started with prompt builder](./images/promptbuilder/AgentBuilder.gif)

## Create, edit, and test prompts

To access Agent Builder, use either of these options:

- In the AI Toolkit view, select **Agent (Prompt) Builder**
- Select **Try in Agent (Prompt) Builder** from a model card in the model catalog

To test a prompt in Agent Builder, follow these steps:

1. In **Models**, select a model from the dropdown list, or select **Browse models** to add another model from the model catalog.

    ![select a model](./images/promptbuilder/select_models.png)

1. Enter a **User prompt** and optionally enter a **System prompt**.

   The *user prompt* is the input that you want to send to the model. The optional *system prompt* is used to provide instructions with relevant context to guide the model response.

   > [!TIP]
   > You can describe your project idea by using natural language and let the AI-powered feature generate the prompts for you to experiment with.
   > ![generate prompts with natural language](./images/promptbuilder/generate_prompt_2.gif)

1. Select **Run** to send the prompts to the selected model.

1. Optionally, select **Add Prompt** to add more user and assistant prompts to the conversation, or select **Add to Prompts** as the history and context you send to the model to further guide the model's behavior.

1. Repeat the previous steps to iterate over your prompts by observing the model response and making changes to the prompts.

## Use MCP servers
MCP server is a tool that allows you to connect to external APIs and services, enabling your agent to perform actions beyond just generating text. For example, you can use an MCP server to access databases, call web services, or interact with other applications.

You can use the agent builder to discover and configure featured MCP servers, connect to existing MCP servers or build a new MCP server from scaffold.

> [!NOTE]
> Using MCP servers may require either [Node](https://nodejs.org/en/download) or [Python](https://www.python.org/downloads/) environment. AI Toolkit will validate your environment to ensure that the required dependencies are installed.
> After installing, please use the command `npm install -g npx` to install `npx`. If you prefer Python, we recommend using [`uv`](https://docs.astral.sh/uv/getting-started/installation/)

### Configure a featured MCP server
AI Toolkit provides a list of featured MCP servers that you can use to connect to external APIs and services.

To configure an MCP server from featured selections, follow these steps:
1. In the **Tools** section, select **+ MCP Server**, and then select **+ Add server** in the Quick Pick.
2. Select **Use Featured MCP Servers** from the dropdown list.
3. Choose an MCP server that meets your needs.
   ![connect to MCP server](./images/promptbuilder/featured_server_2.png)
4. Enter a name for the server.
5. Select tools you want to use.
   ![select_tools](./images/promptbuilder/select_tools.png)

### Use an existing MCP server
> [!TIP]
> There are many registry and marketplace for MCP servers, we recommend starting with [Reference Servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-reference-servers).

To use an existing MCP server, follow these steps:
1. In the **Tools** section, select **+ MCP Server**, and then select **+ Add server** in the quick pick.
2. Select **Connect to an Existing MCP Server**
3. Select an option from the dropdown list to specify how you want to connect to the MCP server:
   - **Command (stdio)**: Run a local command that implements the MCP protocol
   - **HTTP (server-sent events)**: Connect to a remote server that implements the MCP protocol
4. Select tools from the MCP server if there are multiple tools available.
5. Enter your prompts and select **Run** to test the connection.

Here is an example of configuring [Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) server in AI Toolkit:
1. In the **Tools** section, select **+ MCP Server**, and then select **+ Add server** in the quick pick.
2. Select **Connect to an Existing MCP Server**
3. Select **Command (stdio)**
> [!Note] Some servers use Python runtime and `uvx` command. The process is the same as using `npx` command.
4. Navigate to [Server instructions](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem#npx) and locate `npx` section.
5. Copy `command` and `args` into input box in AI Toolkit. In Filesystem server example, it will be `npx -y @modelcontextprotocol/server-filesystem /Users/junjieli/.aitk/examples`
6. Input a name for the server.
> [!Note]
> Some servers might require additional environment variables such as API keys. In this case, AI Toolkit will fail at the stage of adding tools and a file `mcp.json` will pop up so you enter the required details following the instructions provided by each server.
> ![Modify args](./images/promptbuilder/modify_args.png)
> Once completed the configuration:
> 1. Navigate back to **Tools** section and select **+ MCP Server**
> 2. Select the server you just configured from the dropdown list
> 3. Select tools you want to use.
7. Select tools you want to use.

![connect to MCP server](./images/promptbuilder/mcp_existing.gif)

AI Toolkit also provides a scaffold to help you build a new MCP server. The scaffold includes a basic implementation of the MCP protocol, which you can customize to suit your needs.

### Build a new MCP server
To build a new MCP server, follow these steps:
1. In the **Tools** section, select **+ MCP Server**, and then select **+ Add server** in the quick pick.
2. Select **Create a New MCP Server**
3. Select a programming language from the dropdown list: **Python** or **TypeScript**
4. Select a folder to create the new MCP server project in.
5. Enter a name for the MCP server project.

![scaffold mcp](./images/promptbuilder/scaffold_mcp.gif)

After you create the MCP server project, you can customize the implementation to suit your needs. The scaffold includes a basic implementation of the MCP protocol, which you can modify to add your own functionality.

You can also use the agent builder to test the MCP server. The agent builder will send the prompts to the MCP server and display the response.

Follow these steps to test the MCP server:

> [!NOTE]
> To run the MCP Server in your local dev machine, you will need: [Node.js](https://nodejs.org/) or Python installed on your machine.

1. Open VS Code Debug panel. Select `Debug in Agent Builder` or press `F5` to start debugging the MCP server.
2. Use AI Toolkit Agent Builder to test the server with the following prompt:
   1. System Prompt: You are a weather forecast professional that can tell weather information based on given location.
3. The server will be automatically connected to Agent Builder.
4. Select `Run` to test the server with the prompt.

![debug mcp](./images/promptbuilder/mcp_debug.gif)

## Structured output

Structured output support helps you design prompts to deliver outputs in a structured, predictable format.

![Use structured output](./images/promptbuilder/structured_output_2.gif)

To test using structured output in Agent Builder, follow these steps:

1. Select the **Structure output** from the left area, and select **json_schema**.

2. Select **Prepare schema**, and then select **Select local file** to use your own schema, or select **Use an example** to use a predefined schema.

   If you proceed with an example, you can select a schema from the dropdown list.

3. Select **Run** to send the prompts to the selected model.

4. You can also edit the schema by selecting name of the schema.

   ![edit schema](./images/promptbuilder/edit_schema_2.png)

## Integrate prompt engineering into your application

After experimenting with models and prompts, you can get into coding right away with the automatically generated Python code.

![view code](./images/promptbuilder/view_code_2.gif)

To view the Python code, follow these steps:

1. Select **View Code**.

1. For models hosted on GitHub, select the inference SDK you want to use.

   AI Toolkit generates the code for the model you selected by using the provider's client SDK. For models hosted by GitHub, you can choose which inference SDK you want to use: [Azure AI Inference SDK](https://learn.microsoft.com/python/api/overview/azure/ai-inference-readme?view=azure-python-preview) or the SDK from the model provider, such as [OpenAI SDK](https://platform.openai.com/docs/libraries) or [Mistral API](https://docs.mistral.ai/api).

1. The generated code snippet is shown in a new editor, where you can copy it into your application.

   > To authenticate with the model, you usually need an API key from the provider. To access models hosted by GitHub, [generate a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) (PAT) in your GitHub settings.

## Next steps

- [Run an evaluation job](/docs/intelligentapps/evaluation.md) for the popular evaluators
