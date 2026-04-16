---
ContentId: 09f4c3b8-1504-4fb2-9f84-5aa0fbe3969a
DateApproved: 04/15/2026
MetaDescription: Learn how to create AI agents with the AI Toolkit in Visual Studio Code, including hosted agents using templates or Copilot with Foundry skills and prompt agents using Agent Builder.
---

# Create agents with the Foundry Toolkit

The Foundry Toolkit extension for Visual Studio Code provides multiple ways to create AI agents using Microsoft Foundry. You can build hosted agents, which run as deployed services with supporting code and infrastructure, or prompt agents, which are lightweight agents defined by instructions, model settings, and optional tools.

## Choose the right approach

- **Templates** Full agent projects with code and deployment support
- **Copilot + Foundry skills** Quickly generate a custom agent
- **Agent Builder** Simple prompt-based agents without full project setup

## Prerequisites

- Visual Studio Code
- Foundry Toolkit extension installed
- Access to Microsoft Foundry

## Create a hosted agent from a template

Use templates to quickly scaffold a new hosted agent project.

1. In the Foundry Toolkit panel, select **My Resources** > **Your project name** > **Hosted Agents (Preview)**
1. Select the **+** icon to create a new hosted agent
1. In the **Choose Framework** dialog, choose either "Microsoft Agent Framework" or "LangGraph".
1. In the **Create a Hosted Agent** dialog, select one of the templates:
   - Single Agent Hotel Assistant - single agent template
   - Writer-Reviewer Agent Workflow - multi-agent template
1. In the **Choose Programming Language** dialog, choose either:
   - Python
   - C#
1. In the **Choose Model** dialog, select of the options:
   - An existing models you've already deployed to your Foundry project
   - **Deploy & use new model** to upload an existing local model
   - **Browse model catalog** to choose a Foundry model to be deployed to your Foundry project
1. In the **Workspace Folder** dialog, select the **Browse** option to choose the folder on your local drive where you want the template to generate the code

Once you've made your selections, a new instance of Visual Studio Code will open with the working folder you selected and the new generated code from the template you selected. 

### Next steps

After the project is created:

1. Follow the directions in the `README.md` file. For example, in the case of a Python project, it will provide the exact PowerShell or bash commands to run to set up an environment and install dependencies.
1. Press F5 to run and test the agent locally
1. Update configuration and code as needed
1. Deploy the agent to Microsoft Foundry

## Create a hosted agent using Copilot and Foundry skills

You can also create agents using GitHub Copilot with Foundry skills. Foundry Skills are automatically installed with Foundry Toolkit, and you do not have to do anything special to invoke the skills.

1. Open GitHub Copilot Chat in Visual Studio Code
1. Enter a prompt such as: "Create a Foundry agent that..."
1. Copilot uses Foundry skills to generate the required files and configuration
1. Review and update the generated project

This approach is useful for quickly generating a customized agent based on a scenario.

## Create a prompt agent with Agent Builder

Use Agent Builder to create lightweight prompt-based agents.

1. In the Foundry Toolkit panel, select **My Resources** > **Your project name** > **Prompt Agents**
1. Select the **+** to create a new agent
1. Configure the Basic Information like:
   - Agent name
   - Model
   - Instructions (system prompt)
   - Optional tools
1. Test the agent
1. Use the **Save** button to publish to your Foundry project

For more information, see [Agent Builder](/docs/intelligentapps/agentbuilder.md).
