---
ContentId: 09f4c3b8-1504-4fb2-9f84-5aa0fbe3969a
DateApproved: 04/15/2026
MetaDescription: Choose a prompt or hosted agent path in Foundry Toolkit for {% data variables.product.prodname_vscode %}, then open its setup guide.
---

# Create agents with the Foundry Toolkit

Choose how to build an agent with Foundry Toolkit for {% data variables.product.prodname_vscode %}. Configure a **prompt agent** with a model, instructions, and tools, or write a **hosted agent** in code and deploy it to Foundry Agent Service.

## Choose the right approach

| Approach | Use it when | Get started |
| --- | --- | --- |
| Agent Builder | You want to configure and test a prompt agent without a code project. | [Build a prompt agent](/docs/intelligentapps/agentbuilder.md) |
| Hosted-agent samples | You need custom logic or code-based orchestration, starting from an Agent Framework, Copilot SDK, or LangGraph sample. | [Create and deploy a hosted agent](/docs/intelligentapps/hosted-agents.md) |
| Copilot-assisted coding | You want help writing and modifying agent code for your scenario. | [Use Foundry Toolkit Copilot tools and skills](/docs/intelligentapps/copilot-tools.md) |

Each guide includes its prerequisites and creation steps. For extension installation and project setup, see the [Foundry Toolkit overview](/docs/intelligentapps/overview.md).

![Screenshot showing the Create Agent page with options to start from samples, code with Copilot, or build an agent in Agent Builder.](./images/create-agents/create-agent.png)

## Workflows and routines

* **Workflows:** Coordinate multiple steps, decisions, or agents. For new code-based orchestration, use Microsoft Agent Framework through the sample or Copilot route.
* **Routines (Preview):** Invoke an existing agent when a trigger fires, for example, for a daily summary. See [Routines in Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/routines).

> [!IMPORTANT]
> Declarative workflows in Microsoft Foundry are in preview and retire on December 1, 2026. This does not affect code-based orchestration in hosted agents. See the [Foundry workflow migration guidance](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow).

## Related resources

* [Agent development lifecycle in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/development-lifecycle)
* [Use Tool Catalog to connect shared tools](/docs/intelligentapps/tool-catalog.md)
