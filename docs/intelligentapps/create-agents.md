---
ContentId: 09f4c3b8-1504-4fb2-9f84-5aa0fbe3969a
DateApproved: 04/15/2026
MetaDescription: Choose a prompt or hosted agent path in Foundry Toolkit for {% data variables.product.prodname_vscode %}, then open its setup guide.
---

# Create agents with the Foundry Toolkit

Use the Foundry Toolkit extension for {% data variables.product.prodname_vscode %} to build an agent in Microsoft Foundry. This article helps you choose a development approach and find its setup guide.

Microsoft Foundry has two agent types:

* **Prompt agents:** Define an agent with a model, instructions, and tools. Use Agent Builder to configure and test it without creating a code project.
* **Hosted agents:** Define your agent in code, test it locally, and deploy it to Foundry Agent Service. Use this approach when you need custom logic, framework support, or code-based orchestration.

Samples and GitHub Copilot are ways to start a code project, not additional agent types.

## Choose the right approach

| Your goal | Select in Create Agent | Setup guide |
| --- | --- | --- |
| Configure a prompt agent without a code project. | **Build an agent** | [Build prompt agents with Agent Builder](/docs/intelligentapps/agentbuilder.md) |
| Start a hosted agent from a working code sample. | **Code an agent from samples** | [Create and deploy a hosted agent](/docs/intelligentapps/hosted-agents.md) |
| Use Copilot to help write and modify agent code. | **Code an agent with Copilot** | [Use Foundry Toolkit Copilot tools and skills](/docs/intelligentapps/copilot-tools.md) |

## Prerequisites

Install [{% data variables.product.prodname_vscode %}](/download) and the [Foundry Toolkit extension](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio). Each setup guide lists the additional requirements for its route, such as a Foundry project, model access, GitHub Copilot, or a language runtime.

## Open Create Agent

1. Select **Foundry Toolkit** in the **Activity Bar**.
2. Under **Developer Tools**, expand **Build** and select **Create Agent**.

If Developer Tools uses **Group by Resource**, **Create Agent** is under **Agent Dev Tools** instead of **Build**.

![Screenshot showing the Create Agent page with options to start from samples, code with Copilot, or build an agent in Agent Builder.](./images/create-agents/create-agent.png)

## Create a prompt agent with Agent Builder

Choose **Build an agent** when you want to define behavior through instructions and tools. Agent Builder provides a playground for testing, version selection, conversation history, and client code generation.

Continue with [Agent Builder](/docs/intelligentapps/agentbuilder.md). That guide explains the difference between saving a prompt agent to Foundry and saving a prompt locally.

## Create a hosted agent from a sample

Choose **Code an agent from samples** when you want a project that you can modify and deploy. Start with a featured **Agent Framework**, **Copilot SDK**, or **LangGraph** sample, or select **Browse all samples**.

Continue with [Create and deploy a hosted agent](/docs/intelligentapps/hosted-agents.md) and the generated project's `README.md`. For local debugging, use the separate [Agent Inspector guide](/docs/intelligentapps/agent-inspector.md).

## Create a hosted agent using Copilot and Foundry skills

Choose **Code an agent with Copilot** when you want help turning a task description into agent code. Copilot uses Foundry guidance to help create and update the project. You remain responsible for reviewing the generated code and deploying it.

Continue with [Foundry Toolkit Copilot tools and skills](/docs/intelligentapps/copilot-tools.md) for prerequisites and usage. Copilot-assisted development is a code-authoring method, not a separate Foundry runtime.

## Workflows and routines

Workflows and routines address different needs:

* **Workflows:** Coordinate multiple steps, decisions, or agents. For new code-based orchestration, use a framework such as Microsoft Agent Framework through the sample or Copilot route.
* **Routines (Preview):** Invoke an existing prompt or hosted agent when a trigger fires. Use a routine for tasks such as a daily summary or a one-time reminder. See [Routines in Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/routines).

> [!IMPORTANT]
> Declarative workflows in Microsoft Foundry are in preview and retire on December 1, 2026. Microsoft recommends Microsoft Agent Framework for new workflows. This retirement does not apply to code-based orchestration in your hosted agent. See the [Foundry workflow guidance](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow) for migration options.

## Related resources

* [Agent development lifecycle in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/development-lifecycle)
* [Use Tool Catalog to connect shared tools](/docs/intelligentapps/tool-catalog.md)
