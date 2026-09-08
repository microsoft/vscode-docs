---
ContentId: 09f4c3b8-1504-4fb2-9f84-5aa0fbe3969a
DateApproved: 04/15/2026
MetaDescription: Choose a prompt or hosted agent path in Foundry Toolkit for {% data variables.product.prodname_vscode %}, then open its setup guide.
---

# Create agents with the Foundry Toolkit

Choose how to build an agent with Foundry Toolkit for {% data variables.product.prodname_vscode %}. Compare the agent types, then follow the creation guide that fits your scenario.

## Choose an agent type

Microsoft Foundry supports two [agent types](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/development-lifecycle#agent-types-in-microsoft-foundry). Both can use tools to retrieve information and perform actions, and both require testing and evaluation before production use. You can integrate either type into an application, so prompt agents are not limited to prototypes.

| Compare | Prompt agent | Hosted agent |
| --- | --- | --- |
| Example uses | A support assistant that answers from product documents, or a summarizer that retrieves information through tools. | A multi-agent research workflow, a webhook processor, or an assistant with custom runtime logic. |
| How you define behavior | Configure a model, instructions, and supported tools through Agent Builder, an SDK, or an API. | Implement the agent with a supported framework or custom code and deploy it to Foundry Agent Service. |
| Strengths | Iterate on instructions and tools without maintaining a hosted-agent code project. Save configurations as versions. | Control orchestration, dependencies, and runtime behavior while Foundry manages hosting and scaling. |
| Trade-offs | Work within the service's agent configuration and supported tools. A prompt-agent definition does not host your own agent runtime. | Maintain, test, package, and deploy your agent code and dependencies, even though Foundry manages the hosting infrastructure. |

These examples are starting points, not exclusive capabilities. Start with a prompt agent when instructions and supported tools meet your needs. Choose a hosted agent when you need custom agent logic or orchestration. See [when to use hosted agents](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents#when-to-use-hosted-agents) for more guidance.

## Choose a creation route

Agent Builder, samples, and Copilot are ways to create agents, not additional agent types.

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

* [Debug code-based agents with Agent Inspector](/docs/intelligentapps/agent-inspector.md)
* [Use Tool Catalog to connect shared tools](/docs/intelligentapps/tool-catalog.md)
