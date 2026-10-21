---
ContentId: fb94d678-70e5-49e9-9192-a1294a2bc14d
DateApproved: 10/28/2025
MetaDescription: Use Foundry Toolkit tools and skills with {% data variables.product.prodname_copilot %} to choose models, develop agents, and prepare deployment.
MetaSocialImage: images/overview/initial-view.png
---
# Use Foundry Toolkit Copilot tools for AI agent development

Foundry Toolkit adds model and agent development guidance to {% data variables.product.prodname_copilot %} Chat. Use its tools and skills to choose a model, generate application code, configure local debugging, and prepare evaluation and deployment.

This walkthrough develops a Python agent that summarizes text using a model deployed in Microsoft Foundry. You first check the model in the Playground, then ask {% data variables.product.prodname_copilot_short %} to create code that uses that deployment. Testing and cloud deployment remain separate steps.

The guidance tools return instructions and best practices to {% data variables.product.prodname_copilot_short %}. {% data variables.product.prodname_copilot_short %} uses those instructions with its other tools to propose code changes or run commands. A tool response alone does not mean that code was saved, a test ran, or a service was deployed. Review changes and execution requests before proceeding.

If you only need a model client sample, use [View Code in the Playground](/docs/intelligentapps/playground.md#use-a-model-in-application-code). For a prompt agent configured through instructions and tools rather than a code project, use [Agent Builder](/docs/intelligentapps/agentbuilder.md).

## Prerequisites

* The current public [Foundry Toolkit extension and its prerequisites](/docs/intelligentapps/overview.md#install-and-setup).
* Access to [{% data variables.product.prodname_copilot %} Chat in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md).
* A folder open for the agent project. Use a separate project folder rather than an unrelated application's workspace.
* Access to a [selected Foundry project](https://learn.microsoft.com/azure/foundry/how-to/develop/set-up-foundry-project-visual-studio-code). You can choose a model during the walkthrough, but need a compatible [model deployment](/docs/intelligentapps/models.md#deploy-a-model-to-microsoft-foundry) before testing inference.
* Python and the dependencies required by the generated project. Follow its setup instructions and review the [hosted-agent prerequisites](/docs/intelligentapps/hosted-agents.md#prerequisites) before running or deploying it.

Remote model requests can consume quota or incur charges even when the agent runs locally. Use non-sensitive test inputs and keep credentials out of prompts and committed files.

## Using Copilot tools in Foundry Toolkit

Enable the relevant tools so {% data variables.product.prodname_copilot_short %} can use Toolkit guidance while working on your project.

1. Open the {% data variables.copilot.chat_view %} `kb(workbench.action.chat.open)`. Select the **Copilot** harness and **Agent** role for the session.
2. Run **Chat: Open Customizations** from the Command Palette, then select **Tools**. For shared tool-management instructions, see [Manage available tools](/docs/agents/run/tools.md#manage-available-tools).
3. Find the Foundry Toolkit tools and enable those relevant to your task. Common guidance tools include:

   * **Get AI Model Guidance** for model discovery and setup guidance.
   * **Get Agent Code Generation Best Practices** for agent development guidance.
   * **Get Evaluation Code Generation Best Practices** for evaluation code guidance.
   * **Get Tracing Code Generation Best Practices** for instrumentation guidance.

   Supporting tools provide selected-project context, list deployed models, prepare debugging, and guide evaluation planning. The list is not limited to these four tools.

<!-- TODO: Have a human capture the Tools tab in Agent Customizations in VS Code Insiders with the current public Foundry Toolkit guidance tools. Replace the outdated images/copilottools/configure-tools.png capture before embedding it again. -->

Toolkit also contributes [skills](#foundry-skills), which provide instructions for a broader workflow. You can describe your goal in Chat without manually invoking each tool.

> [!NOTE]
> The model selected in Chat powers {% data variables.product.prodname_copilot_short %}. It is separate from the model deployment your generated application calls. Enabling Toolkit tools does not change your application's model or create a deployment. For Chat model selection, see [Language models in Chat](/docs/agent-customization/language-models.md).

## AI Model Guide tool

**Get AI Model Guidance** supplies Foundry-oriented guidance for discovering models, preparing a deployment, and trying it in Toolkit. Describe your inputs, expected outputs, hosting requirements, and constraints rather than relying on a fixed default model.

1. Ask {% data variables.product.prodname_copilot_short %} to identify model options for the summarization task:

   ```prompt
   I am building a Python agent that summarizes support notes into three bullet points.
   Use Foundry Toolkit model guidance to help me choose a Microsoft Foundry model.
   Check the models already deployed in my selected Toolkit project first.
   Explain input limits and trade-offs I should test. Do not create Azure resources.
   ```

2. Review the response. **List Microsoft Foundry Models** returns deployments in the selected project, not every model in the catalog. If you need another model, follow [model discovery and deployment](/docs/intelligentapps/models.md) and review availability, quota, and access before creating it.
3. Open your chosen deployment in [Model Playground](/docs/intelligentapps/playground.md#test-a-model). Test a short support note and a longer example with the same summarization instruction.
4. Check whether the response preserves important details and follows the requested format. Use [Compare](/docs/intelligentapps/playground.md#compare-model-responses) if you have multiple candidates. Record the deployment name you want the application to use.

Model guidance is a starting point, not a benchmark or a promise about cost or quality. Verify the current model's capabilities and lifecycle, then test representative inputs. Playground comparison does not replace repeatable evaluation.

## Agent Code Gen tool

**Get Agent Code Generation Best Practices** supplies instructions that complement the Microsoft Foundry skill. Use it to guide {% data variables.product.prodname_copilot_short %}'s code changes for the scenario and model you tested.

1. In the project folder, ask {% data variables.product.prodname_copilot_short %} to create the agent. Replace `<deployment-name>` with the deployment you selected:

   ```prompt
   Create a Python agent with Microsoft Agent Framework that summarizes support
   notes into three bullet points. Use my selected Foundry Toolkit project and
   its existing model deployment named <deployment-name>.
   Use Foundry Toolkit agent development guidance. Include setup instructions
   and {% data variables.product.prodname_vscode_shortname %} configurations for local debugging with Agent Inspector.
   Do not provision new Azure resources or deploy the agent yet.
   ```

2. Confirm the project and deployment when {% data variables.product.prodname_copilot_short %} requests them. Review the proposed changes before accepting them. Check the instructions, dependencies, credential handling, entry point, and model deployment configuration.
3. Save the files you intend to keep. For the Python debugging path, check that `.vscode` configurations are at the workspace root so {% data variables.product.prodname_vscode_shortname %} can find them.
4. Follow the generated project's setup instructions, then [run and test the agent locally](/docs/intelligentapps/hosted-agents.md#run-and-test-locally). Use its generated debug configuration with `F5` when available.
5. In [Agent Inspector](/docs/intelligentapps/agent-inspector.md#use-the-inspector), send the same support note you tested in the Playground and review the response. Repeat after changing the instructions.

Opening Inspector alone does not start the agent server. Generated code and debug configuration require review and execution; they are not proof that the agent works or is deployed.

If you later add tools, test a request that requires a real tool result and inspect its inputs and output. A model-only answer or a mocked result does not verify the live integration. For shared connections and tool prerequisites, use [Tool Catalog](/docs/intelligentapps/tool-catalog.md).

## Evaluation Code Gen tool

After the agent works interactively, add repeatable tests to check whether changes improve the result or introduce regressions. **Get Evaluation Code Generation Best Practices** provides Python evaluation guidance, with different paths for local tests and Foundry evaluation.

Continue the same Chat conversation with a concrete evaluation goal:

```prompt
Add local Python evaluation tests for this summarization agent using Foundry
Toolkit evaluation guidance. Check that each result contains three bullet
points and preserves the important facts in my sample support notes.
Explain which checks are deterministic and which require a judge model.
Show the dataset, test code, and run instructions before executing tests.
```

Review the dataset, expected results, evaluator selection, and any judge-model requirements. Then follow [Run agent evaluations as tests](/docs/intelligentapps/evaluation.md#run-agent-evaluations-as-tests) to execute the suite and inspect results. For service-side runs, use [Run and review evaluations in Foundry](/docs/intelligentapps/evaluation.md#run-and-review-evaluations-in-foundry).

The guidance tool does not itself run your dataset. Application execution, scoring, and storing results are separate actions with their own runtime, model access, and cost requirements.

## Tracing Code Gen tool

Use traces when you need to understand which model or tool calls occurred, or investigate latency and failures. **Get Tracing Code Generation Best Practices** provides instrumentation guidance for supported language and SDK combinations.

For the same Python agent, ask:

```prompt
Add local OpenTelemetry tracing to this Python Microsoft Agent Framework agent
using Foundry Toolkit tracing guidance. Explain how to start the Toolkit
collector and inspect the traces. Keep support-note content and credentials
out of telemetry where possible.
```

Review the generated instrumentation, then follow [Collect local traces](/docs/intelligentapps/tracing.md#collect-local-traces) for collector setup and supported SDKs. Run the agent again to produce data and verify that traces arrive.

Live Agent Inspector events, locally stored traces, and hosted-agent telemetry are separate data sources. For cloud telemetry and its access requirements, see [View hosted-agent traces](/docs/intelligentapps/tracing.md#view-hosted-agent-traces).

## Deploy the tested agent

Deploy only after you have reviewed the generated code and checked its local behavior. Use [Deploy your hosted agent](/docs/intelligentapps/hosted-agents.md#deploy-your-hosted-agent) for the canonical deployment procedure and its source-code or container-image options.

If you continue with {% data variables.product.prodname_copilot_short %}, explicitly identify the tested project and intended deployment target:

```prompt
Prepare this tested agent for deployment to my selected Foundry project.
Review its deployment configuration, required identity permissions, packaged
files, and secrets handling. Explain the resources and changes before deployment.
```

Preparing configuration does not submit a deployment. After you authorize deployment, confirm service-side success and test the deployed agent, rather than treating a local file change as success.

Local sign-in does not transfer your user's permissions to the deployed agent. For service identity, publication, networking, and production operations, follow the [Foundry agent lifecycle](https://learn.microsoft.com/azure/foundry/agents/concepts/development-lifecycle). Publishing an agent application is separate from deploying hosted-agent code.

## Foundry skills

Skills supply workflow instructions, while tools expose specific capabilities or guidance to Chat. Toolkit contributes skills for {% data variables.product.prodname_vscode_shortname %}-specific agent development and onboarding:

| Skill | Role |
| --- | --- |
| `vscode-microsoft-foundry` | Adds Toolkit project/model selection and local debugging guidance to the broader Foundry agent workflow. |
| `foundrytk-quick-start` | Helps you choose an onboarding task, such as exploring models, building an agent, or working with a toolbox. |
| `microsoft-foundry` | Provides the broader Foundry resource and agent lifecycle workflow. Toolkit installs and updates this skill separately. |

{% data variables.product.prodname_copilot_short %} can load relevant skills from the context of your request. The `microsoft-foundry` installation requires Git and can fail or be turned off. If it is unavailable, run **Foundry Toolkit: Install Foundry Skill**, review any reported errors, and retry after resolving them. Automatic installation and updates are controlled by `setting(windowsaistudio.autoCheckFoundrySkill)`.

## Troubleshoot the workflow

* **Toolkit tools are missing:** Confirm that the current extension is installed and enabled, then check the **Tools** tab in Agent Customizations. Workspace restrictions or organizational policies can limit available capabilities.
* **The Foundry skill is unavailable:** Check Git availability and use **Foundry Toolkit: Install Foundry Skill** to retry. A request in Chat does not prove installation succeeded.
* **No deployed models appear:** Confirm the selected Toolkit project and your access to it. Catalog discovery and listing existing deployments are different operations. Follow [Foundry project setup](https://learn.microsoft.com/azure/foundry/how-to/develop/set-up-foundry-project-visual-studio-code) before creating another resource.
* **A model input or feature does not work:** Check the selected model's capabilities and endpoint, then test it directly in the [Playground](/docs/intelligentapps/playground.md#troubleshoot-the-playground) before changing the agent code.

## Related resources

* [Choose an agent type and creation route](/docs/intelligentapps/create-agents.md).
* [Use tools with agents](/docs/agents/run/tools.md).
