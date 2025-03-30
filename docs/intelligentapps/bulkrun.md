---
Order: 4
Area: intelligentapps
TOCTitle: Bulk Run
ContentId: 1124d141-e893-4780-aba7-b6ca13628bc5
PageTitle: Bulk Run Prompts
DateApproved: 12/11/2024
MetaDescription: Run a set of prompts in an imported dataset, individually or in a full batch towards the selected genAI models and parameters.
---

# Run multiple prompts in bulk

The bulk run feature in AI Toolkit enables you to run multiple prompts in batch. When you use the playground, you can only run one prompt manually at a time, in the order they're listed.

Bulk run takes a dataset as input, where each row in the dataset has at least a prompt. Typically, the dataset has multiple rows. Once imported, you can select one or more prompts to run on the selected model. The responses are then displayed in the same dataset view. The results from running the dataset can be exported.

## Start a bulk run

1. In the AI Toolkit view, select **TOOLS** > **Bulk Run** to open the Bulk Run view

1. Select either a sample dataset or import a local [JSONL](https://jsonlines.org/) file with chat prompts

    The JSONL file needs to have a `query` field to represent a prompt.

1. Once the dataset is loaded, select **Run** or **Rerun** on any prompt to run a single prompt.

    Similar to testing a model in the playground, select a model, add context for your prompt, and change inference parameters.

    ![Bulk run prompts](./images/bulkrun/bulkrun_one.png)

1. Select **Run all** to automatically run through all queries.

    The model responses are shown in the **response** column.

    ![Run all](./images/bulkrun/runall.png)

    > [!TIP]
    > There is an option to only run the remaining queries that have not yet been run.

1. Select the **Export** button to export the results to a JSONL format

1. Select **Import** to import another dataset in JSONL format for the bulk run
