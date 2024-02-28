---
Order: 5
Area: datascience
TOCTitle: Data Wrangler Quick Start
ContentId: 0227288a-2698-47bd-b97a-3a1736acb473
PageTitle: Getting Started with Data Wrangler in VS Code
DateApproved: 02/28/2024
MetaDescription: A quick start guide to get you up and running with the Data Wrangler extension in Visual Studio Code.
---

# Quick Start Guide for Data Wrangler in VS Code

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) is a code-centric data viewing and cleaning tool that is integrated into VS Code and VS Code Jupyter Notebooks. It provides a rich user interface to view and analyze your data, show insightful column statistics and visualizations, and automatically generate Pandas code as you clean and transform the data.

The following is an example of opening Data Wrangler from the Notebook to analyze and clean the data with the built-in operations. Then the automatically generated code is exported back into the Notebook.

![a gif of opening Data Wrangler from a Notebook, looking through the data, switching from View to Edit modes, applying data transformations, and exporting the generated Python code back into the Notebook](https://github.com/microsoft/vscode-docs/assets/15910920/68d4e18f-dd99-4913-91b0-f36092e19a65)

The goal of this page is to help you quickly get up and running with Data Wrangler.

## Set up your environment

1. If you have not already done so, install [Python](https://www.python.org/downloads/)
   (**Note:** Data Wrangler only supports Python version 3.8 or higher).
2. <a class="install-extension-btn" href="vscode:extension/ms-toolsai.datawrangler">Install the Data Wrangler extension</a>

When you launch Data Wrangler for the first time, it asks you which Python kernel you would like to connect to. It also checks your machine and environment to see if the required Python packages are installed, such as Pandas.

## Open Data Wrangler

Anytime you are in Data Wrangler, you are in a *sandboxed* environment, meaning you are able to safely explore and transform the data. The original dataset is not modified until you explicitly export your changes.

### Launch Data Wrangler from a Jupyter Notebook

If you have a Pandas data frame in your Notebook, you’ll now see an **Open 'df' in Data Wrangler** button (where 'df' is the variable name of your data frame) appear in bottom of the cell after running `df.head()`.

![a screenshot showing the entry point into Data Wrangler from a Notebook](https://github.com/microsoft/vscode-docs/assets/15910920/9013003c-4247-4e1b-85a4-4b83056a0ac7)

### Launch Data Wrangler directly from a file

YYou can also launch Data Wrangler directly from a local file (such as a `.csv`). To do so, open any folder in VS Code that contains the file you’d like to open. In the File Explorer view, right click the file and click **Open in Data Wrangler**.

![a screenshot showing the entry point into Data Wrangler from a file](https://github.com/microsoft/vscode-docs/assets/15910920/517e1e29-ba45-4e24-87fb-adb53a6207f1)

## UI Tour

Data Wrangler has two modes when working with your data. The details for each mode are explained in the subsequent sections below.

1. **View Mode:** The view mode optimizes the interface for you to quickly view, filter and sort your data. This mode is great for doing initial exploration on the dataset.
2. **Edit Mode:** The edit mode optimizes the interface for you to apply transformations, cleaning, or modifications to your dataset. As you apply these transformations in the interface, Data Wrangler automatically generates the relevant Pandas code, and this can be exported back into your Notebook for reuse.

Note: By default, Data Wrangler opens in the View mode. You can change this behavior in the Settings editor `kb(workbench.settings.dataWrangler.startInEditModeForNotebookEntrypoints)`.

### View mode interface

![a screenshot showing the different components in the UI for Data Wrangler in View mode](https://github.com/microsoft/vscode-docs/assets/15910920/16d7d4d9-63e8-459f-9b7c-5bb1908b245d)

1. The **Data Summary** panel shows detailed summary statistics for your overall dataset or a specific column, if one is selected.

2. You can apply any **Data Filters/Sorts** on the column from the header menu of the column.

3. Toggle between the **View** or **Edit** mode of Data Wrangler to access the built-in data operations.

4.  The **Quick Insights** header is where you can quickly see valuable information about each column. Depending on the datatype of the column, quick insights shows the distribution of the data or the frequency of datapoints, as well as missing and distinct values.

5. The **Data Grid** gives you a scrollable pane where you can view your entire dataset.

---

### Edit mode interface

Switching to Edit mode enables additional functionality and user interface elements in Data Wrangler. In the following screenshot, we use Data Wrangler to replace the missing values in the last column with the median of that column.

![a screenshot showing the different components in the UI for Data Wrangler in Edit mode](https://github.com/microsoft/vscode-docs/assets/15910920/8ec458aa-556d-4f03-beda-c86898d97112)


1. The **Operations** panel is where you can search through all of Data Wrangler’s built-in data operations. The operations are organized by their top-level category.

2. The **Cleaning Steps** panel shows a list of all the operations that have been previously applied. It enables the user to undo specific operations or edit the *most recent* operation. Selecting a step will highlight the changes in the data grid and will show the generated code associated with that operation.

3. The **Export Menu** lets you export the code back into a Jupyter Notebook or into a new data file.

4. When you have an operation selected and are previewing its effects on the data, the grid is overlayed with a **data diff** view of the changes you made to the data.

5. The **Code Preview** section shows the Python and Pandas code that Data Wrangler has generated when an operation is selected. It remains empty when no operation is selected. You can edit the generated code, which results in the data grid to highlight the effects on the data.

## Example: Replacing missing values in your dataset

![an example of using Data Wrangler to replace missing values in your dataset](https://github.com/microsoft/vscode-docs/assets/15910920/2235a291-e26f-4741-b5fc-bd570c8f66d1)

1. In the **Operation Panel**, search for the **Fill Missing Values** operation.
2. Specify in the parameters what you would like to replace the missing values with. In this case, we will be replacing the missing values with the median value for the column.
3. Validate that the data grid is showing you the correct changes in the data diff.
4. Validate that the code generated by Data Wrangler is what you intended.
5. Apply the operation and it will be added to your cleaning steps history.

# Next Steps

This page covered how to quickly get started with Data Wrangler. For the full documentation and tutorial of Data Wrangler, including all the built-in operations that Data Wrangler currently supports, please see the following page.

[Working with Data Wrangler](https://code.visualstudio.com/docs/datascience/data-wrangler)