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

# Run multiple prompts in bulk

The bulk run feature in AI Toolkit allows you to run multiple prompts in batch. When you use the playground, you can only run one prompt manually at a time, in the order they're listed. Bulk run takes a dataset as input, where each row in the dataset has a prompt as the minimal requirement. Typically teh dataset has multiple rows. Once imported, you can select any prompt to run or run all prompts on the selected model. The responses will be displayed in the same dataset view. Executed dataset can be exported.

To start a bulk run:

1. Open Bulk Run view

    In the AI Toolkit view, select **TOOLS** > **Bulk Run** to open the Bulk Run view.

1. Select dataset

    You can select either a sample dataset to get familiar about the feature, or import a local JSONL file that has at least a field `query` to use as prompts.
    ![Select dataset](./images/bulkrun/dataset.png)

1. Run a single prompt

    Once dataset is loaded in the bulk run view, you can **Run** or **Rerun** any prompt.

    Like in the playground, you can select AI model, add context for your prompt, and change inference parameters.

    ![Bulk run prompts](./images/bulkrun/bulkrun_one.png)

1. Bulk run prompts

    Select **Run all** on the top of bulk run view to automatically run through all queries and display responses in the response column. There is an option to only run the remaining queries that have not been executed.

1. Export results

    You can export the bulk run result to a JSONL format for future reference.
    You can also import another dataset in JSONL format for the bulk run.