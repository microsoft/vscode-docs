---
ContentId: 1124d141-e893-4780-aba7-b6ca13628bc5
DateApproved: 07/14/2025
MetaDescription: Run a set of prompts with variables or function calls with an imported or synthetically generated dataset towards the selected models and parameters.
---
# Run multiple prompts in bulk

> [!NOTE]
> Bulk run was previously a standalone webview feature in AI Toolkit. It is now fully integrated into **Agent Builder** under the **Evaluation** tab. You can still access it through the AI Toolkit view by selecting **TOOLS** > **Bulk Run**.

The bulk run feature in AI Toolkit lets you test agents and prompts against multiple test cases in batch mode. Unlike the playground, which runs one prompt at a time, bulk run automates the process by using a dataset as input and running all prompts sequentially.

After execution, AI responses appear in the dataset view next to your original prompts. You can review, compare, and export the complete dataset with responses for further analysis.

![Screenshot showing AI Toolkit interface with the bulk run feature. The dataset table displays multiple prompts and responses, with queries about weather in Paris France and Shanghai China.](./images/bulkrun/bulkrun.png)

## Start a bulk run

To start a bulk run in AI Toolkit, follow these steps:

1. In the AI Toolkit view, select **Agent Builder** from the Activity Bar.
1. Enter your prompt and variables using the `{{your_variable}}` format. Select a model to run the prompt against.
1. Switch to the **Evaluation** tab in **Agent Builder**.

> [!NOTE]
> AI Toolkit uses the same LLM models you use for agents to generate datasets, which might incur costs. You can view the meta prompt used to generate datasets in the [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/data_generator.md).

1. Select **Generate Data** to create a synthetic dataset.
1. Choose the number of rows to generate and view or modify the data generation logic.
    ![Screenshot showing Generate Data dialog in AI Toolkit.](./images/bulkrun/generate-data.png)
1. Select **Generate** to create the dataset.

> [!TIP]
> You can choose to run only the remaining queries that have not yet been run.

1. Once the dataset is loaded, select **Run** to run a single row or **Run All** to run all rows in the dataset.

## Operate on dataset

![Screenshot showing AI Toolkit interface with dataset operations and a table of evaluation results.](./images/bulkrun/dataset-operation.png)

AI Toolkit provides several operations to manage and analyze your dataset during a bulk run:

- **Generate Data**: Create a synthetic dataset based on a prompt and variables. Specify the number of rows and modify the data generation logic.
- **Add Row**: Add a new row to the dataset.
- **Delete Row**: Delete the selected row from the dataset.
- **Export Dataset**: Export the dataset to a CSV file for further analysis or reporting.
- **Import Dataset**: Import a dataset from a CSV file to use as input for the bulk run.
- **Run**: Execute a single row in the dataset against the selected model.
- **Run All**: Execute all rows in the dataset against the selected model.
- **Run Remaining**: Execute only the rows that have not yet been run against the selected model.
- **Manual Evaluation**: Mark responses as Thumb Up or Thumb Down to keep a record of manual evaluations.

## Evaluate bulk run results

AI Toolkit lets you evaluate the results of your bulk run directly in the dataset view.

![Screenshot showing AI Toolkit interface in full screen mode with the Evaluation tab expanded. The dataset table displays multiple columns, including query prompts and AI responses, for detailed analysis.](./images/bulkrun/full-screen.png)

You can expand the **Evaluation** tab to full screen mode for a more detailed view of the results. Full screen mode provides the same functionality as the standard view, but with a larger display area for better visibility and analysis.

![Screenshot showing detailed view of evaluation results with a modal dialog displaying a full conversation between user and assistant about weather queries.](./images/bulkrun/view-detail.png)

Select **View Details** to see the full response for each query.

In the detail view, you can:

- Review the full conversation between the user and the assistant.
- Analyze the AI's responses.
- Mark responses as good or bad to keep a record of manual evaluations.
- Navigate to previous or next queries in the dataset.
- Select **Exit** to return to the dataset overview.
- View the total number of queries in the dataset and the current query index.

## Manage data columns

![Screenshot showing AI Toolkit interface with dataset management options and column management controls.](./images/bulkrun/manage-columns.png)

With data column management, you can customize the dataset view to focus on the most relevant information for your bulk run analysis.

You can:

- **Add Columns**: Add columns to the left or right of the current column.
- **Edit Column Name**: Change the name of any column in the dataset.
- **Add Ground Truth Column**: Add a column for ground truth values to compare with AI responses.

## What you learned

In this article, you learned how to:

- Generate a synthetic dataset for bulk runs.
- Import and export datasets in CSV format.
- Run evaluations on bulk run results.
- Mark responses as good or bad to keep a record of manual evaluations.
- View details of responses and navigate between queries in the dataset.
- Manage data columns for better analysis.

## Next steps

- [Run an evaluation](/docs/intelligentapps/evaluation.md) with the popular evaluators