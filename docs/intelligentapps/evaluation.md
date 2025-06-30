---
ContentId: 3342b8ef-72fe-4cca-baad-64ee57c05b5f
DateApproved: 06/16/2025
MetaDescription: Evaluate AI models, prompts, and agents using AI Toolkit's comprehensive evaluation system. Import datasets, run evaluations with built-in evaluators like F1 score, relevance, coherence, and similarity, or create custom LLM-based and code-based evaluators. Visualize and compare results in tables and charts.
---
# Evaluate models, prompts, and agents

You can evaluate models, prompts, and agents by comparing their outputs to ground truth data and computing evaluation metrics. AI Toolkit streamlines this process. Upload datasets and run comprehensive evaluations with minimal effort.

![Screenshot showing the start of an evaluation in AI Toolkit.](./images/evaluation/evaluation.png)

## Evaluate prompts and agents

You can evaluate prompts and agents in **Agent Builder** by selecting the **Evaluation** tab. Before you evaluate, run your prompts or agents against a dataset. Read more about [Bulk run](/docs/intelligentapps/bulkrun.md) to learn how to work with a dataset.

To evaluate prompts or agents:

1. In **Agent Builder**, select the **Evaluation** tab.
1. Add and run the dataset you want to evaluate.
1. Use the thumbs up and down icons to rate responses and keep a record of your manual evaluation.
1. To add an evaluator, select **New Evaluation**.
1. Select an evaluator from the list of built-in evaluators, such as F1 score, relevance, coherence, or similarity.
    > [!NOTE]
    > [Rate limits](https://docs.github.com/en/github-models/use-github-models/prototyping-with-ai-models#rate-limits) might apply when using GitHub-hosted models to run the evaluation.
1. Select a model to use as a judging model for the evaluation, if required.
1. Select **Run Evaluation** to start the evaluation job.

![Screenshot showing the Evaluation tab in Agent Builder with options to select evaluators, judging models, and run evaluation against a dataset.](./images/evaluation/new_eval_builder.png)

## Versioning and evaluation comparison

AI Toolkit supports versioning of prompts and agents, so you can compare the performance of different versions. When you create a new version, you can run evaluations and compare results with previous versions.

To save a new version of a prompt or agent:

1. In **Agent Builder**, define the system or user prompt, add variables and tools.
1. Run the agent or switch to the **Evaluate** tab and add a dataset to evaluate.
1. When you are satisfied with the prompt or agent, select **Save as New Version** from the toolbar.
1. Optionally, provide a version name and press Enter.

### View version history

You can view the version history of a prompt or agent in **Agent Builder**. The version history shows all versions, along with evaluation results for each version.

![Screenshot showing the Version History dialog with a list of saved versions of a prompt or agent.](./images/evaluation/version_history.png)

In version history view, you can:
- Select the pencil icon next to the version name to rename a version.
- Select the trash icon to delete a version.
- Select a version name to switch to that version.

### Compare evaluation results between versions

You can compare evaluation results of different versions in **Agent Builder**. Results are displayed in a table, showing scores for each evaluator and the overall score for each version.

To compare evaluation results between versions:

1. In **Agent Builder**, select the **Evaluation** tab.
1. From the agent title, select **Compare with**.
1. Choose the version you want to compare with from the list.
    > [!NOTE]
    > Compare functionality is only available in full screen mode of Agent Builder for better visibility of the evaluation results. You can expand the **Prompt** section to see the model and prompt details.
1. The evaluation results for the selected version are displayed in a table, allowing you to compare the scores for each evaluator and the overall score for each version.

![Screenshot showing the Evaluation tab in Agent Builder with the interface for comparing evaluation results between different versions.](./images/evaluation/compare_eval.png)

## Built-in evaluators

AI Toolkit provides a set of built-in evaluators to measure the performance of your models, prompts, and agents. These evaluators compute various metrics based on your model outputs and ground truth data.

For agents:
- **Intent Resolution**: Measures how accurately the agent identifies and addresses user intentions.
- **Task Adherence**: Measures how well the agent follows through on identified tasks.
- **Tool Call Accuracy**: Measures how well the agent selects and calls the correct tools.

For general purposes:
- **Coherence**: Measures logical consistency and flow of responses.
- **Fluency**: Measures natural language quality and readability.

For RAG (Retrieval Augmented Generation):
- **Retrieval**: Measures how effectively the system retrieves relevant information.

For textual similarity:
- **Similarity**: AI-assisted textual similarity measurement.
- **F1 Score**: Harmonic mean of precision and recall in token overlaps between response and ground truth.
- **BLEU**: Bilingual Evaluation Understudy score for translation quality; measures overlaps in n-grams between response and ground truth.
- **GLEU**: Google-BLEU variant for sentence-level assessment; measures overlaps in n-grams between response and ground truth.
- **METEOR**: Metric for Evaluation of Translation with Explicit Ordering; measures overlaps in n-grams between response and ground truth.

The evaluators in AI Toolkit are based on the Azure Evaluation SDK. To learn more about observability for generative AI models, see the [Azure AI Foundry documentation](https://learn.microsoft.com/azure/ai-foundry/concepts/observability?tabs=warning).

## Start a standalone evaluation job

1. In the AI Toolkit view, select **TOOLS** > **Evaluation** to open the Evaluation view.
1. Select **Create Evaluation**, then provide the following information:
    - **Evaluation job name**: Use the default or enter a custom name.
    - **Evaluator**: Select from built-in or custom evaluators.
    - **Judging model**: Select a model to use as the judging model, if required.
    - **Dataset**: Select a sample dataset for learning, or import a JSONL file with the fields `query`, `response`, and `ground truth`.
1. A new evaluation job is created. You are prompted to open the evaluation job details.

    ![Screenshot showing the Open Evaluation dialog in AI Toolkit.](./images/evaluation/openevaluation.png)

1. Verify your dataset and select **Run Evaluation** to start the evaluation.

    ![Screenshot showing the Run Evaluation dialog in AI Toolkit.](./images/evaluation/runevaluation.png)

### Monitor the evaluation job

After you start an evaluation job, you can view its status in the evaluation job view.

![Screenshot showing a running evaluation in AI Toolkit.](./images/evaluation/running.png)

Each evaluation job includes a link to the dataset used, logs from the evaluation process, a timestamp, and a link to the evaluation details.

### Find results of evaluation

The evaluation job details view shows a table of results for each selected evaluator. Some results might include aggregate values.

You can also select **Open In Data Wrangler** to open the data with the [Data Wrangler extension](vscode:extension/ms-toolsai.datawrangler).

![Screenshot showing the Data Wrangler extension with evaluation results.](./images/evaluation/datawrangler.png)

## Create custom evaluators

You can create custom evaluators to extend the built-in evaluation capabilities of AI Toolkit. Custom evaluators let you define your own evaluation logic and metrics.

![Screenshot showing the custom evaluator creation interface in AI Toolkit.](./images/evaluation/custom_evaluator.png)

To create a custom evaluator:

1. In the **Evaluation** view, select the **Evaluators** tab.
1. Select **Create Evaluator** to open the creation form.

    ![Screenshot showing the form to create a new custom evaluator.](./images/evaluation/create_new_custom_evaluator.png)

1. Provide the required information:
    - **Name**: Enter a name for your custom evaluator.
    - **Description**: Describe what the evaluator does.
    - **Type**: Select the type of evaluator: LLM-based or Code-based (Python).
1. Follow the instructions for the selected type to complete the setup.
1. Select **Save** to create the custom evaluator.
1. After you create the custom evaluator, it appears in the list of evaluators for selection when you create a new evaluation job.

### LLM-based evaluator

For LLM-based evaluators, define the evaluation logic using a natural language prompt.

Write a prompt to guide the evaluator in assessing specific qualities. Define criteria, provide examples, and use variables like `{{query}}` or `{{response}}` for flexibility. Customize the scale or feedback style as needed.

Make sure the LLM outputs a JSON result, for example: `{"score": 4, "reason": "The response is relevant but lacks detail."}`

You can also use the **Examples** section to get started with your LLM-based evaluator.

![Screenshot showing the LLM-based evaluator configuration in AI Toolkit.](./images/evaluation/LLM-eval.png)

### Code-based evaluator

For code-based evaluators, define the evaluation logic using Python code. The code should return a JSON result with the evaluation score and reason.

![Screenshot showing the Evaluators tab in AI Toolkit with options for creating code-based evaluators.](./images/evaluation/code_eval.png)

AI Toolkit provides a scaffold based on your evaluator name and whether you use an external library.

You can modify the code to implement your evaluation logic:

```python
# The method signature is generated automatically. Do not change it.
# Create a new evaluator if you want to change the method signature or arguments.
def measure_the_response_if_human_like_or_not(query, **kwargs):
    # Add your evaluator logic to calculate the score.

    # Return an object with score and an optional string message to display in the result.
    return {
        "score": 3,
        "reason": "This is a placeholder for the evaluator's reason."
    }
```
