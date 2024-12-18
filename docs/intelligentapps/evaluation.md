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

# Evaluation Overview

AI engineers often need to evaluate models with different parameters, different prompts in a dataset for comparing to ground truth and generate values from the comparisons. AI Toolkit allows you to perform evaluations with minimal effort.

## Prepare an evaluation job

Navigate to the tree view's `Batch Run` entry in `TOOLS` section. You will see an evaluation job history view. Select the button `Start Evaluation`, then answer the questions:
1. Evaluation job name: default or a name you can specify
1. Evaluator: currently the built-in evaluators can be selected.
1. Judging model: a model from the list that is selected as judging model to evaluate for some evaluators.
1. Dataset: you can start with a sample dataset for learning purpose, or import a JSONL file with fields `query`,`response`,`ground truth`.

## Start an evaluation job

You will be promoted to confirm you want to start the evaluation. Or select any individual evaluation job to re-run it.

## Monitor the evaluation job

Once an evaluation job is started, you can find its status from the evaluation job overview. Each evaluation job has link to the dataset used, logs from evaluation process, timestamp and details of the evaluation.

## Find results of evaluation

Select the evaluation job detail, the view has columns of selected evaluators with the numerical values. Some may have aggregate values.

You can also open the data in `Data Wrangler` extension from the button `Open in Data Wrangler`