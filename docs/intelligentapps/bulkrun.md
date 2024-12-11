---
Order: 4
Area: intelligentapps
TOCTitle: Bulk Run
ContentId:
PageTitle: Bulk Run Prompts
DateApproved:
MetaDescription: Run a set of prompts in an imported dataset, individually or in a full batch towards the selected genAI models and parameters.
MetaSocialImage:
---

# Bulk Run Overview

Bulk run feature in AI Toolkit allows you to run many prompts in batch mode. Compared to playground you can only run each prompt manually in order.

## Start a bulk run

Navigate to `Bulk Run` in the `TOOLS` section in the tree view of AI Toolkit. You can select either a sample dataset to get familiar about the feature, or import a local JSONL file that has at least a field `query` to use as prompts.


## Run any prompt

Once dataset is loaded in the bulk run view, you can find the table format of the imported dataset, with column of query and column of response.

Like in the playground, you can select the AI model, context for your prompt, and inference parameters.

Initially the response cell of each row is empty with a `Run` icon. You can select this icon to execute prompt just for that row.

## Bulk run prompts

Select `Run all` on the top of bulk run view to automatically run through all queries and display responses in the response column.
There is an option to only run the remaining queries that have not been executed.

## Rerun

For any previously response, there is `Rerun` icon displayed for that row. You can switch to different model with different parameter to quickly see the results.

## Export results

You can export the bulk run result to a JSONL format for future reference.

You can also import another dataset in JSONL format for the bulk run.