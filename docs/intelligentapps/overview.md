---
ContentId: 164299e8-d27d-40b9-8b8d-a6e05df8ac69
DateApproved: 03/12/2026
MetaDescription: Build, test, and deploy AI apps and agents with Foundry Toolkit for {% data variables.product.prodname_vscode %}.
MetaSocialImage: images/overview/initial-view.png
---
# Foundry Toolkit for {% data variables.product.prodname_vscode %}

Foundry Toolkit is an extension for building, testing, deploying, evaluating, and monitoring AI applications and agents in {% data variables.product.prodname_vscode %}. It brings local development tools and access to Microsoft Foundry resources into one workspace.

Use Toolkit to create agents, connect tools and knowledge, experiment with models, and investigate application behavior. This overview helps you choose a starting point and find the guide for your task, whether you are exploring an idea or working on an existing application.

## Choose your starting point

Start with the task that matches your project, whether you are creating an agent, exploring an idea, or investigating an existing application.

| Goal | Toolkit capabilities | Get started |
| --- | --- | --- |
| Build an application or agent. | Agent Builder, hosted-agent samples, and {% data variables.product.prodname_copilot_short %} tools and skills. | [Choose an agent development route](/docs/intelligentapps/create-agents.md). |
| Connect an agent to information and actions. | Tool Catalog, configured connections, and knowledge resources. | [Discover and configure tools](/docs/intelligentapps/tool-catalog.md). |
| Explore a model's capabilities. | Model Catalog, chat and image playgrounds, and model client samples. | [Discover and set up a model](/docs/intelligentapps/models.md). |
| Investigate behavior and measure quality. | Agent Inspector, tracing, and dataset-based evaluation. | [Debug an agent](/docs/intelligentapps/agent-inspector.md) or [run evaluations](/docs/intelligentapps/evaluation.md). |
| Deploy and test an agent in Foundry. | Hosted-agent deployment, remote playgrounds, and project resource management. | [Deploy a hosted agent](/docs/intelligentapps/hosted-agents.md#deploy-your-hosted-agent). |

## Build applications and agents

An agent combines a model with instructions, tools, or application logic to complete a task. Toolkit provides different ways to create and iterate on that behavior:

* Use [Agent Builder](/docs/intelligentapps/agentbuilder.md) to configure a prompt agent's instructions and supported tools. You maintain the configuration, connections, and saved versions without a hosted-agent code project.
* Use [hosted-agent samples](/docs/intelligentapps/hosted-agents.md) or [{% data variables.product.prodname_copilot_short %}-assisted coding](/docs/intelligentapps/copilot-tools.md) when you need custom logic, dependencies, or code-based orchestration. You maintain the code, tests, packaging, and deployment configuration.

Connect agents to external information and actions through [Tool Catalog](/docs/intelligentapps/tool-catalog.md). Use the selected project's knowledge resources when the task requires retrieval from your data. Available integrations depend on the agent, model, service, and permissions.

Samples and coding assistance are creation methods, while workflows coordinate steps or agents. Routines (Preview) schedule or trigger an existing agent. See [Create agents](/docs/intelligentapps/create-agents.md) for the distinctions and supported starting points.

## Explore and customize models

Use [Model Catalog](/docs/intelligentapps/models.md) to find and deploy Foundry models, connect provider-hosted endpoints, or add supported local models. The source you choose determines where inference runs and which credentials, deployments, or runtime components you maintain.

In [Model Playground](/docs/intelligentapps/playground.md), test prompts and model-specific parameters, compare chat responses, or generate images with a supported image-generation deployment. Use its client code samples to integrate a model into an application. A client sample is not a complete agent project or a deployed service.

For specialized model work, Toolkit also provides [fine-tuning](/docs/intelligentapps/finetune.md), [model conversion](/docs/intelligentapps/modelconversion.md), and [Model Profiling (Preview)](/docs/intelligentapps/profiling.md). These experiences have model-specific, runtime-specific, and hardware-specific requirements.

## Test, evaluate, and monitor

Use different tools to answer different development questions. An interactive test helps you inspect one execution; repeatable evaluations help you compare behavior across changes.

* **[Agent Inspector](/docs/intelligentapps/agent-inspector.md):** Send requests to a locally running agent, inspect responses and tool calls, and debug its code. Available views depend on the agent's protocol and instrumentation.
* **[Evaluation](/docs/intelligentapps/evaluation.md):** Assess models, prompts, and agents with datasets, built-in evaluators, or custom criteria. Choose local tests or Foundry evaluation based on your workflow.
* **[Tracing](/docs/intelligentapps/tracing.md):** Collect local telemetry or inspect hosted-agent traces to investigate model calls, tool activity, latency, and failures. Live Inspector events and stored traces are separate data sources.

Running your development tools or agent server locally does not mean every operation stays on your device. Requests to cloud models and live tools can consume quota, incur charges, or access external data.

## Deploy and manage Foundry resources

Select a Foundry project to work with its models, agents, tools, knowledge, and evaluations from Toolkit. The project provides the cloud context for resource operations, so confirm the target before creating or changing resources.

For code-based agents, use [hosted-agent deployment](/docs/intelligentapps/hosted-agents.md#deploy-your-hosted-agent) to deploy source code or a container image. After deployment, use the Hosted Agent Playground to test the remote agent and inspect its behavior. Local test results do not replace verification of the deployed version and its access to dependencies.

Saving a prompt-agent version, deploying hosted-agent code, and publishing an agent application are separate operations. Follow the [Foundry agent lifecycle](https://learn.microsoft.com/azure/foundry/agents/concepts/development-lifecycle) for service identity, permissions, publication, and production operations.

## Install and setup

Install the current public extension, then follow the prerequisites for your chosen workflow. Foundry Toolkit includes the capabilities previously provided by the separate Microsoft Foundry extension.

1. Install [{% data variables.product.prodname_vscode %}](/download) and the [.NET Runtime](https://learn.microsoft.com/dotnet/core/install/).
2. In the Activity Bar, select **Extensions** and search for **Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %}**.
3. Select the [Foundry Toolkit extension published by Microsoft](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio), then select **Install**.
4. Open **Foundry Toolkit** from the Activity Bar.
5. For cloud resources, [sign in and select a Foundry project](https://learn.microsoft.com/azure/foundry/how-to/develop/set-up-foundry-project-visual-studio-code). For local inference or an existing provider endpoint, follow the corresponding [model setup procedure](/docs/intelligentapps/models.md#add-or-connect-a-model).

Azure sign-in is required when you use Foundry resources, but not for every local development task. Agent frameworks, model runtimes, and tool connections have their own prerequisites, which are covered in their task guides.

Under **Help And Feedback**, open **What's New** to review changes in your installed version. The [public changelog](https://microsoft.github.io/foundry-dev-tools/) identifies released features and previews.

## Explore Foundry Toolkit

The Toolkit sidebar separates the resources you have from the actions you can take.

| Section | Use it to |
| --- | --- |
| **My Resources** | Open models, agents, tools, knowledge, and evaluations in the selected Foundry project, or manage local resources and recent items. |
| **Developer Tools** | Discover models and tools, build and test applications, and inspect evaluations and telemetry. |
| **Help And Feedback** | Ask Copilot, open getting-started material, read documentation and release notes, or report an issue. |

The following example shows these three sections in the default lifecycle layout. Tool availability depends on your platform and installed runtime components.

<!-- TODO: Have a human capture the current public Toolkit sidebar in VS Code Insiders and review or replace this image. Hide or redact account and resource details. -->
![Screenshot showing the Foundry Toolkit sidebar with My Resources, Developer Tools, and Help And Feedback sections.](./images/overview/initial-view.png)

In the default layout, **Developer Tools** groups actions under **Discover**, **Build**, and **Monitor**. Use the catalogs to find models and tools, the build tools to create and test agents or models, and the monitoring tools to investigate behavior and quality.

For Foundry deployments, Toolkit uses your selected project as its default cloud context. Confirm that project before you create resources. The [Foundry project setup guide](https://learn.microsoft.com/azure/foundry/how-to/develop/set-up-foundry-project-visual-studio-code) covers sign-in, project selection, and switching projects.

## Next steps

* [Choose an agent type and creation route](/docs/intelligentapps/create-agents.md).
* [Experiment with models in the Playground](/docs/intelligentapps/playground.md).
* [Evaluate models, prompts, and agents](/docs/intelligentapps/evaluation.md).
