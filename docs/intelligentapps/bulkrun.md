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

The bulk run feature in AI Toolkit allows you to run multiple prompts in batch. When you use the playground, you can only run one prompt manually at a time, in the order they're listed. Bulk run takes a dataset as input, where each row in the dataset has a prompt as the minimal requirement. Typically, the dataset has multiple rows. Once imported, you can select any prompt to run or run all prompts on the selected model. The responses will be displayed in the same dataset view. The results from running the dataset can be exported.

To start a bulk run:

1. In the AI Toolkit view, select **TOOLS** > **Bulk Run** to open the Bulk Run view.


1. Select either a sample dataset or import a local JSONL file that has a `query` field to use as prompts.

    ![Select dataset](./images/bulkrun/dataset.png)

1. Once the dataset is loaded, select **Run** or **Rerun** on any prompt to run a single prompt.


    Like in the playground, you can select AI model, add context for your prompt, and change inference parameters.

    ![Bulk run prompts](./images/bulkrun/bulkrun_one.png)

1. Select **Run all** on the top of the Bulk Run view to automatically run through queries. The responses are shown in the **response** column.

    There is an option to only run the remaining queries that have not yet been run.

1. Select the **Export** button to export the results to a JSONL format.

1. Select **Import** to import another dataset in JSONL format for the bulk run.