# Quick Start Guide for Data Wrangler in VS Code

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) is a code-centric data viewing and cleaning tool that is integrated into VS Code and VS Code Jupyter Notebooks. It provides a rich user interface to view and analyze your data, show insightful column statistics and visualizations, and automatically generate Pandas code as you clean and transform the data.

![gif](https://github.com/microsoft/vscode-docs/assets/15910920/68d4e18f-dd99-4913-91b0-f36092e19a65)

## Setting up your environment

1. If you have not already done so, install [Python](https://www.python.org/downloads/)
   (**Note:** Data Wrangler only supports Python version 3.8 or higher).
2. Install the [Data Wrangler extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler).

When you launch Data Wrangler for the first time, it will check your machine and environment to see if any required Python packages are installed (e.g., Pandas). If they are not found on your environment, Data Wrangler will attempt to install them for you via pip.

## Opening Data Wrangler
Anytime you are in Data Wrangler, you are in a **sandboxed** environment, meaning you are safely able to explore and transform the data, without worry of modifying the original dataset until you explicity export your changes.

### Launching Data Wrangler from a Jupyter Notebook

If you have a Pandas data frame in your Notebook, you’ll now see an `Open 'df'` button (where 'df' is the variable name of your data frame) appear in bottom of the cell after running `df.head()`.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/9013003c-4247-4e1b-85a4-4b83056a0ac7)

### Launching Data Wrangler directly from a file

You can also launch Data Wrangler directly from a local file (such as a .csv). To do so, open any folder in VS Code that contains the file you’d like to open. In the File Explorer panel, right click the file and click `Open in Data Wrangler`.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/517e1e29-ba45-4e24-87fb-adb53a6207f1)

## UI Tour

Data Wrangler has 2 modes when working with your data. The details for each mode are explained in the subequent sections below.

1. **View Mode:** The view mode optimizes the interface for you to quickly view, filter and sort your data. This mode is great for doing initial exploration on the dataset.
2. **Edit Mode:** The edit mode optimizes the interface for you to apply transformations, cleaning, or modifications to your dataset. As you apply these transformations in the interface, Data Wrangler will autoamtically generate the relevant Pandas code, and this can be exported back into your Notebook to be reused.


Note: By default Data Wrangler opens in the View mode, but this can be changed to Edit as well in the settings.

### View mode interface

![image](https://github.com/microsoft/vscode-docs/assets/15910920/16d7d4d9-63e8-459f-9b7c-5bb1908b245d)

1. The **Data Summary Panel** shows detailed summary statistics for your overall dataset or a specific column if one is selected.

2. You can apply any **Data Filters/Sorts** on the column from the header menu of the column.

3. You can toggle between the **View/Edit** modes of Data Wrangler to access the built-in data operations.

4. The **Quick Insights** header is where you can quickly see valuable information about each column. Depending on the datatype of the column, Quick Insights will show the distribution of the data or the frequency of datapoints, as well as missing and distinct values.

5. The **Data Grid** gives you a scrollable pane where you can view your entire dataset.

---

### Edit mode interface

Switching to Edit mode enables additional funcionality and UI within Data Wrangler. In the example below, we are using Data Wrangler to replace the missing values in the last column with median of that column.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/8ec458aa-556d-4f03-beda-c86898d97112)


1. The **Operations Panel** is where you can search through all of Data Wrangler’s built-in data operations. The operations are organized by their top-level category.

2. The **Cleaning Steps Panel** shows a list of all the operations that have been previously applied. It enables the user to undo specific operations or edit the *most recent* operation. Selecting a step will highlight the changes in the data grid and will show the generated code associated with that operation.

3. The **Export Menu** lets you export the code back into a Jupyter Notebook or into a new data file.

4. When you have an operation selected and are previewing its effects on the data, the grid will be overlayed with a **Data Diff** view of the changes you made to the data.

5. The **Code Preview** section will show the Python and Pandas code that Data Wrangler has generated when an operation is selected. It will remain blank when no operation is selected. The code can even be edited by the user, and the data grid will highlight the effect on the data.

## Example: Replacing missing values in your dataset

![gif](https://github.com/microsoft/vscode-docs/assets/15910920/2235a291-e26f-4741-b5fc-bd570c8f66d1)

1. In the **Operation Panel**, search for the `Fill Missing Values` operation.
2. Specify in the parameters what you would like to replace the missing values with. In this case, we will be replacing the missing values with the median value for the column.
3. Validate that the data grid is showing you the correct changes in the data diff.
4. Validate that the code generated by Data Wrangler is what you intended.
5. Apply the operation and it will be added to your cleaning steps history.

# Next Steps

This page covered how to quickly get started with Data Wrangler. For the full documentation and tutorial of Data Wrangler, including all the built-in operations that Data Wrangler currently supports, see the following page.

[Data Wrangler Documentation]()