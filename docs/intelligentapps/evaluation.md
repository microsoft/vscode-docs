---
Order: 5
Area: intelligentapps
TOCTitle: Evaluation
ContentId:
PageTitle: AI Evaluation
DateApproved:
MetaDescription: Import a dataset with LLMs or SLMs output or rerun it for the queries. Run evaluation job for the popular evaluators like F1 score, relevance, coherence, similarity... find, visualize, and compare the evaluation results in tables or charts.
MetaSocialImage:
---

# Model evaluation

AI engineers often need to evaluate models with different parameters or prompts in a dataset for comparing to ground truth and compute evaluator values from the comparisons. AI Toolkit allows you to perform evaluations with minimal effort.

![Start evaluation](./images/evaluation/evaluation.png)

## Start an evaluation job

1. In AI Toolkit view, select **TOOLS** > **Evaluation** to open the Evaluation view.
1. Select the **Create Evaluation** button and provide the following information:

    - **Evaluation job name:** default or a name you can specify
    - **Evaluator:** currently the built-in evaluators can be selected.
        ![Evaluators](./images/evaluation/evaluators.png)
    - **Judging model:** a model from the list that can be selected as judging model to evaluate for some evaluators.
    - **Dataset:** you can start with a sample dataset for learning purpose, or import a JSONL file with fields `query`,`response`,`ground truth`.
1. Once you provide all necessary information for evaluation, a new evaluation job is created. You will be promoted to open your new evaluation job details.

    ![Open evaluation](./images/evaluation/openevaluation.png)

1. Verify your dataset and select **Run Evaluation** to start the evaluation.

    ![Run Evaluation](./images/evaluation/runevaluation.png)

## Monitor the evaluation job

Once an evaluation job is started, you can find its status from the evaluation job view.

![Running evaluation](./images/evaluation/running.png)

Each evaluation job has a link to the dataset that was used, logs from the evaluation process, timestamp, and a link to the details of the evaluation.

## Find results of evaluation

Select the evaluation job detail, the view has columns of selected evaluators with the numerical values. Some may have aggregate values.

You can also select **Open In Data Wrangler** to open the data with the Data Wrangler extension.

> <a class="install-extension-btn" href="vscode:extension/ms-toolsai.datawrangler">Install Data Wrangler</a>

![Data Wrangler](./images/evaluation/datawrangler.png)