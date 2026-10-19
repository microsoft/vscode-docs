---
ContentId: d1fa0d9f-96f4-40c0-a2c8-17d4f0938b63
DateApproved: 10/13/2026
MetaDescription: Compare and apply optimization workflows for prompt instructions, hosted agents, and local models in Microsoft Foundry Toolkit.
MetaSocialImage: images/optimizations/optimization-results.png
---

# Optimize models, prompts, and agents

Optimization changes an AI application's configuration or model artifacts to improve its results against a specific goal. Start with a representative evaluation benchmark before you optimize. Without a stable dataset and useful criteria, a higher score might reflect the optimizer fitting an unrepresentative test instead of improving the behavior that matters to your application.

Foundry Toolkit provides different optimization paths depending on what you need to change:

| Goal | Workflow and result | Responsibilities and trade-offs |
| --- | --- | --- |
| Draft or refine prompt-agent instructions | Use **Generate** or **Improve** in Agent Builder to revise instructions, then **Deploy** to save a Foundry prompt-agent version. | You review the text and test representative cases. This does not run an evaluation-driven optimization job. |
| Improve a deployed code-based agent | Use **Optimize** to generate and score candidates that can change instructions, skills, function-tool descriptions, or model selection. | You maintain the agent workspace, benchmark, and tool connections, and review changes before deploying a candidate. Cloud execution and model calls incur usage. |
| Prepare a model for local Windows hardware | Use [Model Conversion](/docs/intelligentapps/modelconversion.md) to convert, quantize, analyze, and optimize a model for supported CPU, GPU, or NPU targets. | You maintain model artifacts and validate their quality and hardware compatibility. This changes the model artifacts rather than a Foundry agent configuration. |

## Improve prompt-agent instructions

Use Agent Builder when you want to draft instructions or make a focused revision without running an evaluation-driven optimization job.

1. In **Foundry Toolkit**, under **My Resources** > **Agents**, open a Foundry prompt agent.
2. Select the model that the agent uses.
3. Under **Instructions**, select **Generate** when the field is empty, or select **Improve** to revise existing instructions. Describe the task or change. For an improvement, suggestions are optional.
4. Review the revised instructions. For an improvement, use the offered diff to inspect the changes.
5. Test representative requests in the playground. Check that the revision improves the intended behavior without regressing important existing scenarios.
6. Select **Deploy** to save the configuration as the latest version of the Foundry prompt agent.

The **Deploy** action in Agent Builder saves the prompt-agent definition to Foundry. It does not deploy hosted-agent code or containers, and it does not publish the agent to a distribution channel.

For Foundry prompt agents, **Generate** and **Improve** first use Foundry Prompt Optimizer. If the selected model does not support that API, Foundry Toolkit falls back to standard prompt generation when the model supports it. Other failures leave the current instructions unchanged so that you can retry with another model or edit them manually.

This workflow only applies the generated instructions. It does not produce scored candidates, optimize an agent's runtime code, or deploy a hosted agent. For a broader evaluation-driven workflow, use hosted-agent optimization.

![Screenshot showing a Foundry prompt agent in Agent Builder with instructions, the Improve action, and the Deploy control, with agent identifiers redacted.](./images/optimizations/improve-instructions.png)

## Optimize a hosted agent

Hosted-agent optimization evaluates the deployed agent against a dataset, generates alternative configurations, scores each candidate against the same criteria, and recommends the strongest result. The optimizer runs in Microsoft Foundry, while Foundry Toolkit provides the starting workflow, run details, candidate comparison, and deployment actions.

### Prerequisites

Prepare the following before you start:

* A deployed hosted agent that uses the **Responses** protocol. New optimization runs are not supported for agents that use the Invocations protocol.
* The local workspace that contains the matching agent source.
* {% data variables.product.prodname_copilot %} with access to agent mode. Foundry Toolkit starts the optimization setup through Copilot and the Microsoft Foundry skill.
* The Azure CLI and Azure Developer CLI installed and authenticated. Run `az login` and `azd auth login` before starting the workflow.
* Compatible evaluation and optimization model deployments in the same Foundry project. The evaluation model must support chat completion. Choose the optimization model from the service's supported list.
* Permission to use and deploy the project's hosted agents and models. Review the [hosted-agent permissions](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agent-permissions).
* An Azure subscription with access to the agent optimizer.

An existing `azure.yaml` or `azure.yml` is not required to start the setup. Copilot can propose initializing the AZD project and preparing deployment configuration when it is missing. Review that configuration before deployment.

Hosted-agent optimization is available only in supported regions and has specific model requirements. Review the current [agent optimizer availability and model constraints](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-optimizer-overview#limitations-and-availability) before choosing deployments. For current access and setup requirements, see the [hosted-agent optimization quickstart](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-optimize-hosted-agent).

### Start an optimization run

1. Select **Foundry Toolkit** in the Activity Bar. Under **Developer Tools** > **Build**, select **Hosted Agent Playground**.
2. In **Hosted Agent**, select the deployed Responses agent.
3. Select **Optimize**, and then select **New Optimization**.
4. Select the workspace that contains the matching agent source.
5. In Copilot Chat, review the prepared prompt and select **Send**. Then answer the questions about:

   * The evaluation metrics or evaluators.
   * The evaluation dataset.
   * The maximum number of candidates.
   * The optimization model.

6. Review the proposed code and commands before they run. Depending on the workspace, Copilot might propose initializing the AZD agent project, adding optimizer integration, generating `eval.yaml` and evaluation data, or deploying the baseline agent.
7. Confirm that the selected dataset and criteria represent the behavior you want to improve, and then start the optimization.

The optimization runs in the selected Foundry project. You can leave the run page and return to **Optimize** to monitor its status.

### Review candidates

The optimization run list shows status, completed candidates, baseline and best scores, duration, and creation time. Select a run to review:

* The baseline and generated candidates.
* The evaluation and optimization models.
* The dataset and maximum candidate count.
* The score and score change for each candidate.
* Score details from the associated evaluation run.
* A diff of the candidate configuration against the baseline.
* The full run JSON for troubleshooting.

A higher aggregate score is evidence for the selected dataset and evaluators, not a universal quality guarantee. Review the configuration changes and individual evaluation results. Pay particular attention to candidates that change models, add longer instructions, revise tool descriptions, or alter skills, because these changes can affect latency, token use, cost, and tool behavior.

The following example shows an optimization still in progress, with the baseline and one generated candidate already scored. Project-specific identifiers are redacted. Wait for the run to finish before making a deployment decision.

![Screenshot showing an in-progress hosted-agent optimization with baseline and candidate scores, a best-score summary, and the deployment action disabled.](./images/optimizations/optimization-results.png)

### Apply and deploy a candidate

An optimization run does not update the hosted agent automatically. After reviewing the results, deliberately select the candidate to deploy.

If the workspace contains `azure.yaml` or `azure.yml`, confirm that it declares an `azure.ai.agent` service whose name matches the selected hosted agent before applying a candidate.

For the recommended candidate, select **Deploy best candidate**. Foundry Toolkit:

1. Downloads the candidate configuration into the matching agent service directory.
2. Applies the candidate to the deployment configuration for this operation.
3. Deploys a new hosted-agent version. If the previous deployment settings are not sufficient for unattended deployment, Foundry Toolkit opens the deployment wizard for you to complete.

The localized candidate is stored under `.agent_configs/<candidateId>/`. Depending on the optimization targets, the directory contains:

* `metadata.yaml` with the agent and model configuration.
* `instructions.md` with optimized instructions.
* A `skills` directory with optimized `SKILL.md` files.
* `tools.json` with optimized function-tool descriptions.

Localizing these files does not deploy them. The candidate affects the hosted agent only after a deployment uses that configuration.

The deployment menu also provides **Custom deploy** for changing deployment settings or targeting another agent. Treat this action as a handoff to the deployment wizard. Verify that the resulting deployment uses the intended candidate rather than assuming that opening the wizard activates it automatically.

If no candidate improves on the baseline, keep the current agent and review the dataset or optimization settings before another run.

After deployment, rerun the original benchmark and test representative requests in the hosted-agent playground. Comparing the deployed version against the same baseline helps distinguish a real improvement from variation in the optimization run.

## Understand data, cost, and side effects

Microsoft Foundry stores optimization runs, referenced datasets, candidates, and evaluation results in the selected project. Foundry Toolkit reads that service data and writes a candidate to the local workspace only when you apply or deploy it.

Optimization invokes the baseline and candidate agents against tasks in the dataset. Evaluation-model calls score those responses, and the optimization model generates candidate configurations. If the agent calls APIs, databases, search services, or other tools, those calls run during candidate evaluation and can incur charges, mutate data, or trigger rate limits. Use test accounts, test endpoints, or mocked tools when repeated execution could have unwanted effects.

Hosted-agent optimization does not show a pre-run cost estimate in Foundry Toolkit. Candidate count, dataset size, evaluators, models, response length, and external tools all affect usage. Review [agent optimizer cost and token usage](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-optimizer-costs) and use your Azure invoice as the billing source of truth.

## Related resources

* [Build prompt agents with Agent Builder](/docs/intelligentapps/agentbuilder.md)
* [Create and deploy a hosted agent](/docs/intelligentapps/hosted-agents.md)
* [Evaluate AI models and agents](/docs/intelligentapps/evaluation.md)
