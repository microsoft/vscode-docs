---
ContentId: 3342b8ef-72fe-4cca-baad-64ee57c05b5f
DateApproved: 12/11/2024
MetaDescription: Import a dataset with LLMs or SLMs output or rerun it for the queries. Run evaluation job for the popular evaluators like F1 score, relevance, coherence, similarity... find, visualize, and compare the evaluation results in tables or charts.
---

# Model evaluation

AI engineers often need to evaluate models with different parameters or prompts for comparing to ground truth and compute evaluator values from the comparisons. AI Toolkit lets you perform evaluations with minimal effort by uploading a prompts dataset.

![Start evaluation](./images/evaluation/evaluation.png)

## Start an evaluation job

1. In AI Toolkit view, select **TOOLS** > **Evaluation** to open the Evaluation view

1. Select **Create Evaluation**, and then provide the following information:

    - **Evaluation job name:** default or a name you can specify

    - **Evaluator:** currently, only the built-in evaluators can be selected.

        ![Screenshot of a Quick Pick with the list of built-in evaluators](./images/evaluation/evaluators.png)

    - **Judging model:** a model from the list that can be selected as judging model to evaluate for some evaluators.

    - **Dataset:** select a sample dataset for learning purpose, or import a JSONL file with fields `query`,`response`,`ground truth`.

1. A new evaluation job is created and you will be prompted to open your new evaluation job details

    ![Open evaluation](./images/evaluation/openevaluation.png)

1. Verify your dataset and select **Run Evaluation** to start the evaluation.

    ![Run Evaluation](./images/evaluation/runevaluation.png)

## Monitor the evaluation job

Once an evaluation job is started, you can find its status from the evaluation job view.

![Running evaluation](./images/evaluation/running.png)

Each evaluation job has a link to the dataset that was used, logs from the evaluation process, timestamp, and a link to the details of the evaluation.

## Find results of evaluation

The evaluation job details view shows a table of the results for each of the selected evaluators. Note that some results may have aggregate values.

You can also select **Open In Data Wrangler** to open the data with the [Data Wrangler extension](vscode:extension/ms-toolsai.datawrangler).

![Screenshot the Data Wrangler extension, showing the evaluation results.](./images/evaluation/datawrangler.png)
