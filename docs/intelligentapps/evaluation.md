---
ContentId: 3342b8ef-72fe-4cca-baad-64ee57c05b5f
DateApproved: 10/13/2026
MetaDescription: Evaluate models, prompts, and agents with Foundry Toolkit. Run dataset and pytest evaluations, compare results, and review Foundry evaluation runs.
MetaSocialImage: images/evaluation/custom-evaluator-form.png
---
# Evaluate models, prompts, and agents

Evaluation helps you choose a model and check whether changes to prompts, tools, or agent code improve the behavior your application needs. Use representative test cases and consistent scoring criteria rather than relying on one useful playground response.

Foundry Toolkit for {% data variables.product.prodname_vscode %} has four evaluation experiences: standalone dataset scoring, inline tabular evaluation in Agent Builder, evaluation as pytest tests, and Copilot-assisted agent evaluation. They differ in what you provide, whether they generate new agent responses, and where the evaluation runs. This guide explains when to choose each experience and takes you through its workflow. For exploratory model comparisons before building a benchmark, use the [Model Playground](/docs/intelligentapps/playground.md).

## Choose an evaluation path

Start with the artifact you already have and the outcome you need:

| Evaluation experience | Choose it when | What you provide | How you use it and what you get |
| --- | --- | --- | --- |
| [Standalone dataset scoring](#score-an-existing-dataset) | You already have responses, such as answers recorded from your application, and want to measure their quality. | A JSONL or CSV dataset with inputs, responses, and any reference or tool fields required by the evaluators. | Open **Developer Tools** > **Monitor** > **Evaluation**. Run local scoring and inspect the job's metrics and logs. This does not invoke the application again to produce responses. |
| [Inline tabular evaluation](#evaluate-a-local-prompt) | You are revising a saved local prompt and want to compare model or instruction changes against the same cases. | The prompt, its variables and tools, a configured model, and dataset rows. | Use Agent Builder's **Evaluation** grid to generate responses, record manual feedback, score selected rows, and compare saved local versions. |
| [Evaluation as tests (pytest)](#run-agent-evaluations-as-tests) | You want repeatable regression checks with pass criteria, and test code and data that you can maintain in source control. | An agent target, dataset, evaluators, and acceptance thresholds. | Scaffold a Python suite for a saved Foundry prompt agent, run it in **Testing**, and inspect pass or fail output and detailed results. You can also submit supported Foundry-agent configurations to the service. |
| [Copilot-assisted agent evaluation](#set-up-a-service-evaluation-with-copilot) | You have a Foundry prompt or hosted agent and want help turning evaluation goals into a configured service run. | An existing Foundry agent, evaluation goals, and an optional dataset. For a hosted agent, also provide its code workspace. | Use **My Resources** > **Evaluations** > **New Evaluation**. Copilot helps prepare configuration, data, and Azure Developer CLI commands. Review the proposed work, then inspect the run in Foundry. |

These are workflows, not evaluator categories. For example, you can use a relevance evaluator in a local dataset job or an agent test. Choose the workflow first, then choose metrics that match the behavior you want to check.

### Decide where to run the evaluation

Standalone scoring and the inline grid run evaluation code locally. A local pytest run also executes its test harness on your computer. However, those workflows can call cloud models, judge models, deployed agents, and live tools.

Choose local execution when you need to inspect test code and cases in your development environment. Choose a Foundry run when you need a project-owned evaluation record that teammates can review. Foundry executes the submitted evaluation and stores its results, while you manage project access and service prerequisites. Generating a test project is not the same as submitting a cloud job.

The **Evaluation** tab in Agent Builder depends on where the agent is saved. A saved local prompt has a dataset grid. A saved Foundry prompt agent has **Scaffold Evaluation Code** and a **Foundry** link for service evaluation guidance. Selecting a Foundry model alone does not make a prompt a Foundry-saved agent.

Ongoing evaluation has a different purpose: checking deployed-agent traffic over time rather than testing a fixed benchmark once. Use it after establishing a baseline, as described in [Monitor deployed agents](#monitor-deployed-agents).

## Prepare data and evaluators

Install the [Foundry Toolkit extension](/docs/intelligentapps/overview.md#install-and-setup). For prompt or model execution, configure the model and tools first through [model setup](/docs/intelligentapps/models.md) or [Agent Builder](/docs/intelligentapps/agentbuilder.md).

Start with test cases that include normal requests, edge cases, and known failures. Keep a baseline dataset unchanged when comparing revisions. Reserve separate cases to check whether a change generalizes beyond the data used to improve it.

### Choose how to judge responses

Combine the scoring methods that match your requirements:

| Method | Use it for | What to check |
| --- | --- | --- |
| Code-based scoring | Measurable rules such as response format, required fields, or overlap with a reference answer. | The rule and expected data are correct. Built-in metrics such as F1 Score do not need a judge model. |
| LLM-based scoring | Qualities such as relevance, coherence, or task adherence that need interpretation. | The criterion, judge model, and explanations are suitable. A model-generated score is not proof that the answer is correct. |
| Manual feedback | Reviewing edge cases and checking whether automatic scores match human judgment. | In the inline grid, use thumbs up and thumbs down to record feedback. These ratings are separate from automatic evaluator scores. |

For example, use a code-based evaluator to check that an answer has required JSON fields, an LLM-based evaluator to judge whether its content addresses the question, and human review to inspect unexpected failures.

### Match the data to the evaluator

Evaluators measure different properties. Some compare the response with a reference answer, called ground truth. Others judge response quality or tool use without a reference answer.

The local evaluator picker includes the following built-in options:

| Evaluators | What they measure | Required columns | Judge model |
| --- | --- | --- | --- |
| **Relevance**, **Coherence** | Whether a response addresses the query or is logically consistent. | `query`, `response` | Required. |
| **Fluency** | Language quality and readability. | `response` | Required. |
| **Similarity** | Similarity to a reference answer. | `query`, `response`, `ground_truth` | Required. |
| **F1 Score**, **BLEU**, **GLEU**, **METEOR** | Token or phrase overlap with a reference answer. | `response`, `ground_truth` | Not required. |
| **Intent Resolution**, **Task Adherence** | How the agent addresses user intent and follows its task. | `query`, `response`, `tool_definitions` | Required. |
| **Tool Call Accuracy** | Selection and use of tools. | `query`, `tool_calls`, `tool_definitions` | Required. |

For example, this JSONL file contains recorded responses suitable for reference-based scoring. Each line is a separate JSON object:

```jsonl
{"query":"What is the capital of France?","response":"Paris.","ground_truth":"Paris."}
{"query":"What is the capital of Japan?","response":"Tokyo.","ground_truth":"Tokyo."}
```

Use the exact field name `ground_truth`, not `ground truth`. Supply structured tool information when the selected evaluator requires it. The import workflow checks for missing columns. JSONL and CSV are supported for local datasets, but generated agent tests use their own data and evaluator configuration.

The Foundry service has its own evaluator catalog. Do not assume that every evaluator in the [Foundry built-in evaluator reference](https://learn.microsoft.com/en-us/azure/foundry/concepts/built-in-evaluators) appears in the Toolkit's local picker.

### Choose a judge model

An LLM-based evaluator uses a judge model to score a response. This can be different from the model or agent being tested. The standalone picker offers configured chat models from OpenAI, Custom, and Foundry providers. Code-based metrics such as F1 Score do not need a judge model.

For service evaluation, use a compatible model deployment in the Foundry project. Review the [agent evaluation prerequisites](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent#prerequisites) and the evaluator's model requirements. Access to a project does not necessarily grant permission to invoke its models.

> [!IMPORTANT]
> Local storage and local test execution do not mean offline execution. Cloud model calls, judge calls, and live tools can incur charges or change external data. Use non-sensitive datasets and appropriate test resources. Foundry runs also have [region and rate limits](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-regions-limits-virtual-network).

## Evaluate a local prompt

Inline tabular evaluation generates and scores responses in the same grid. Use it for a saved local prompt in Agent Builder when you want to change instructions or the selected model and inspect how those changes affect the same cases. To set up the prompt and its tools, follow [Work with local prompts](/docs/intelligentapps/agentbuilder.md#work-with-local-prompts).

The empty grid shows where to import cases or add rows before generating responses and scoring them.

![Screenshot showing the empty local-prompt Evaluation grid with User Query, Response, and Manual columns and the Add an Empty Row action.](./images/evaluation/local-evaluation-grid.png)

1. Open the local prompt and select **Evaluation**.
2. Define any variables needed to run the prompt with different inputs. For example, the instruction <code>Answer this question concisely: &#123;&#123;question&#125;&#125;.</code> uses a dataset column named `question`.
3. Select **Import** to load the dataset, or add rows manually. Provide a value for each prompt variable and any additional evaluator columns.
4. Select the rows to test, then select **Run Response**. Review the generated responses. Use thumbs up and thumbs down to record manual feedback separately from automatic scores.
5. Select **Add Evaluation**. Choose the evaluators and, when required, a judge model.
6. Select the rows to score. From **Run Evaluation**, select **Run Evaluation Only** to score the current responses, or **Run Evaluation with Response** to rerun the selected rows before scoring.
7. Inspect the scores and explanations, including individual failures rather than only aggregate values.

Mock custom-tool responses are not evidence that an external service ran. When testing live MCP tools, check the calls and returned data. Use the [tool setup guide](/docs/intelligentapps/tool-catalog.md) for runtime and authentication requirements.

### Compare saved local versions

Keep the model, dataset, and evaluators consistent when comparing an instruction change. Save the local configuration and evaluation results you want to retain.

1. In the local prompt's **Evaluation** tab, expand the view to full screen if needed.
2. Select **Compare** and choose another saved version.
3. Compare the responses and evaluator scores for the same cases.
4. Exit comparison before changing data or running another evaluation.

An evaluator score is specific to that metric. Do not treat different metrics as one universal overall score. For saving and selecting configurations, see [Agent Builder version management](/docs/intelligentapps/agentbuilder.md#save-drafts-and-versions).

## Score an existing dataset

Standalone scoring evaluates recorded outputs without rerunning the model or agent that produced them. Use it to assess an exported application dataset, or to try an evaluator against known responses before adding it to an agent test suite.

1. In **Foundry Toolkit**, select **Developer Tools** > **Monitor** > **Evaluation**.
2. On **Overview**, select **Add Evaluation**.
3. Enter an evaluation name, select evaluators, and select a judge model if required.
4. Import a dataset with the required columns, or choose the sample dataset to explore the workflow.
5. Open the created evaluation, review the input data, and select **Run Evaluation**.
6. Review the job status, logs, and result table. Check failed or incomplete rows before interpreting aggregate scores.

![Screenshot showing the standalone Evaluation overview with Overview and Evaluators tabs, an existing job, and the Add Evaluation action.](./images/evaluation/evaluation-overview.png)

The job's configuration, logs, and results are stored locally under the user's `.aitk` directory. These standalone jobs are not automatically published to Foundry or saved in the open workspace.

For further analysis, select **Open in Data Wrangler** in the standalone result view. This action uses the [Data Wrangler extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler). It differs from the **Data Viewer** used for pytest and downloaded Foundry results below.

### Create a custom evaluator

Use a custom evaluator when the built-in metrics do not cover a requirement such as a response format or a domain-specific quality criterion.

1. In the standalone **Evaluation** view, select **Evaluators** > **Create Evaluator**.
2. Enter a **Name** and **Description**.
3. Select **LLM-based** or **Code-based (Python)**.
4. Define the criterion or code, then select **Save**.
5. Select the saved evaluator when creating an evaluation job.

For an LLM-based evaluator, define a scoring scale, examples, and the expected JSON output. Use variables such as <code>&#123;&#123;query&#125;&#125;</code> and <code>&#123;&#123;response&#125;&#125;</code>. The **Prompt example** selector provides starting points. For example, request a result with a score and explanation:

```json
{"score":4,"reason":"The response addresses the question but omits one required detail."}
```

For a code-based evaluator, edit the generated Python scaffold and preserve its method signature. Return a score and, when useful, a reason. If it requires external Python libraries, configure the Python environment and dependencies requested by the Toolkit.

![Screenshot showing the custom evaluator form with Name, Description, LLM-based and Code-based (Python) choices, and prompt configuration.](./images/evaluation/custom-evaluator-form.png)

## Run agent evaluations as tests

Evaluation as tests turns quality requirements into repeatable regression checks that you can review and maintain alongside your application. Each test combines an agent target, a dataset, evaluators, and pass criteria. For example, after changing a tool description, run the same tool-call tests and inspect any new failures.

For a saved Foundry prompt agent:

1. Open the agent in Agent Builder and select **Evaluation** > **Scaffold Evaluation Code**.
2. Select the evaluators and a destination folder. The Toolkit opens the generated project in a new {% data variables.product.prodname_vscode_shortname %} window.
3. Follow the generated `README.md` to create a Python 3.10 or later environment and install `requirements.txt`. Select that interpreter with **Python: Select Interpreter**. See [Python environments](/docs/python/environments.md).
4. Review `.env`. Verify the Foundry project endpoint and judge model endpoint and deployment. Authenticate as required by the generated project, including Azure CLI sign-in.
5. Replace the sample cases in `data.jsonl` with representative requests. Review the evaluator configuration, required data, and pass thresholds in the generated tests.
6. Open **Testing** in the Activity Bar. Run the test file or individual cases and inspect the output.

![Screenshot showing a Foundry prompt agent's Evaluation tab with Scaffold Evaluation Code and a Foundry evaluation guidance link.](./images/evaluation/foundry-evaluation-setup.png)

The project includes a `test_<agent>.py` test file, `data.jsonl`, `requirements.txt`, `.env`, pytest configuration, and workspace test settings. Custom evaluator selections also provide code you can adapt. Tests invoke the configured agent and score its responses. Running pytest locally does not move a Foundry agent to your computer.

> [!NOTE]
> The scaffold identifies the Foundry agent by name and project endpoint. It does not pin the version selected in Agent Builder. Review the generated target before using it to compare versions, and do not assume unsaved Agent Builder edits are included.

For a code-based or hosted agent, keep the evaluation suite with the agent workspace and configure its target for the intended endpoint. Use [Agent Inspector](/docs/intelligentapps/agent-inspector.md) to debug local execution, and [Foundry evaluation guidance](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent) for deployed agents. A client project generated from Agent Builder is not independently hosted agent code.

### Review test results

Use **Testing** to inspect pass and fail output. Detailed local evaluation files are written under `test-results` in the generated workspace.

In the **Testing** sidebar, expand **Foundry Toolkit** > **View Evaluation Results**. Choose local results or remote results for Foundry agents defined in the workspace's pytest evaluation configurations. For the project-wide evaluation list, use **My Resources** > **Evaluations** instead. Open a result in **Data Viewer** to inspect the recorded inputs, responses, and scores. Downloaded remote results remain copies of service-owned data, not new local evaluation runs.

Optionally, select **Analyze Evaluation Results** in the Toolkit's Testing view and choose a result file. This fills {% data variables.product.prodname_copilot %} Chat with a draft request. Review it and select **Send** to start the analysis. Review the suggested changes against the failed cases rather than accepting them as evidence that the agent is fixed.

## Run and review evaluations in Foundry

Choose service evaluation when you need a project-owned run and results that teammates can review. Prepare an existing Foundry agent, a compatible judge model deployment, and the [permissions for your evaluation workflow](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluation-permissions). Service model and evaluation calls can incur charges.

### Set up a service evaluation with Copilot

Copilot-assisted evaluation starts from a goal rather than requiring you to author the full evaluation configuration first. Use it for a Foundry prompt or hosted agent when you want help preparing the dataset, evaluators, and service-run commands. For example, ask it to check whether a support agent answers policy questions accurately and uses its lookup tool when needed.

The guided setup uses the Microsoft Foundry skill and Azure Developer CLI. It is separate from the local pytest scaffolding procedure above. Review the generated artifacts and execution target instead of assuming that every Copilot-created evaluation is a pytest suite.

To use the guided setup:

1. In **Foundry Toolkit**, select **My Resources** > **Evaluations** > **New Evaluation**.
2. Select an existing agent in the project.
3. For a hosted agent, select the workspace that contains its code. For a prompt agent, Copilot Chat opens directly without a workspace picker.
4. In Copilot Chat, review the prepared prompt, describe what to evaluate, and optionally provide a dataset. Select **Send** to start the setup.
5. Review the proposed evaluation configuration and Azure Developer CLI commands before running them. The workflow can initialize an AZD environment and generate evaluation data when you do not supply a dataset.
6. After the run, return to **Evaluations** to inspect its status, runs, and results.

**New Evaluation** starts a Copilot-assisted evaluation workflow. It does not enable ongoing evaluation. Keep generated cases under review and replace them with a representative benchmark before relying on the scores.

### Submit an existing pytest suite

To submit a configured pytest evaluation:

1. Open the evaluation workspace with its Python environment and test configuration.
2. In **Testing**, expand **Foundry Toolkit** and select **Submit Evaluation to Microsoft Foundry**.
3. Select the Foundry agent evaluation configuration. This shortcut does not submit local chat-agent configurations.
4. Confirm that the Toolkit's selected project matches the test's project endpoint. Select the judge model deployment when prompted.
5. Review and confirm submission. Monitor progress and use **Open Report** when the run completes.
6. Review service runs through **My Resources** > **Evaluations**, or use the remote-results branch in **Testing** to download a result for local analysis.

Submission creates a new service evaluation and reruns the remote agent. It does not upload scores from `test-results`. The shortcut submits each row's `query` and targets the agent by name, without an explicit version pin. Additional columns such as `ground_truth` are not automatically forwarded.

If your benchmark needs reference answers, custom fields, or explicit target control, configure those mappings through the [Foundry evaluation SDK workflow](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent) rather than assuming local and submitted tests are identical.

## Monitor deployed agents

Dataset tests check a selected benchmark. Ongoing evaluation checks deployed-agent traffic and can expose failures that the benchmark does not contain. It is separate from local tests and continues in Foundry after you close the Toolkit.

Prepare the project's connected Application Insights resource and the identities that need access to its traces and models. Follow [Foundry monitoring setup](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard) and the [evaluation permissions reference](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluation-permissions). Hosted-agent evaluation and tracing are generally available. This does not change the lifecycle of hosted-agent hosting or recurring-evaluation features.

To configure trace-based ongoing evaluation when the trace view offers setup:

1. Open a deployed agent's trace through the [hosted-agent tracing workflow](/docs/intelligentapps/tracing.md), select a span, and open **Evaluation**.
2. Select **Enable Continuous Evaluation** to open **Continuous Evaluation** settings.
3. Turn on **Auto Run** to show the remaining controls. Choose the evaluators and a compatible judge deployment in **Select Model**, and set **Sample rate**.
4. Select **Submit** only when you intend to enable ongoing service work.

The Toolkit configures an hourly trace-evaluation schedule. **Sample rate** is a count, not a percentage: it is the maximum traces per hourly run. Changing evaluators or the judge creates a new evaluation definition; saving the schedule controls whether it runs. Closing the Toolkit does not stop it. Manage the retained schedule in Foundry when you no longer need the evaluations.

> [!NOTE]
> Recurring evaluation is a Preview service capability. Check the current monitoring guidance for availability and limitations. Evaluation-model consumption and telemetry storage can incur ongoing charges. Access, retention, and billing follow the connected Azure resources.

## Use the results to improve the application

Inspect failed cases, evaluator explanations, tool activity, and missing data before changing the application. A low score can indicate a response problem, an unsuitable evaluator, or incomplete inputs. Rerun the same benchmark after a change and check held-out cases.

For prompt revisions and evaluated hosted-agent candidates, follow [Optimize models, prompts, and agents](/docs/intelligentapps/optimizations.md). Saving a recovery draft, saving a prompt-agent version with **Deploy**, publishing an agent application, and deploying hosted-agent code are separate operations. Evaluation alone performs none of those publication or deployment steps.

## Related resources

* [Microsoft Foundry evaluation and observability concepts](https://learn.microsoft.com/en-us/azure/foundry/concepts/observability)
* [Configure agents and their tools](/docs/intelligentapps/agentbuilder.md)
* [Optimize models, prompts, and agents](/docs/intelligentapps/optimizations.md)
