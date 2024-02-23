# Getting Started with Data Wrangler in VS Code

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) is a code-centric data viewing and cleaning tool that is integrated into VS Code and VS Code Jupyter Notebooks. It provides a rich user interface to view and analyze your data, show insightful column statistics and visualizations, and automatically generate Pandas code as you clean and transform the data.

![gif](https://github.com/microsoft/vscode-docs/assets/15910920/68d4e18f-dd99-4913-91b0-f36092e19a65)

This document will cover how to:

-   Install and setup Data Wrangler
-   Launch Data Wrangler from a notebook
-   Launch Data Wrangler from a data file
-   Use Data Wrangler to explore your data
-   Use Data Wrangler to perform operations and cleaning on your data
-   Edit and export the data wrangling code to a notebook
-   Troubleshooting and providing feedback

## Setting up your environment

1. If you have not already done so, install [Python](https://www.python.org/downloads/).
   **IMPORTANT:** Data Wrangler only supports Python version 3.8 or higher.
2. Install [Visual Studio Code](https://code.visualstudio.com/download).
3. Install the [Data Wrangler extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) from the Visual Studio Marketplace. For additional details on installing extensions, see Extension Marketplace. The Data Wrangler extension is named Data Wrangler and it’s published by Microsoft.

When you launch Data Wrangler for the first time, it will ask you which Python kernel you would like to connect to. It will also check your machine and environment to see if any required Python packages are installed (e.g., Pandas).

> Here is a list of the required versions for Python and Python packages, along with whether they are automatically installed by Data Wrangler:
>
> | Name   | Minimum required version | Automatically installed |
> | ------ | ------------------------ | ----------------------- |
> | Python | 3.8                      | No                      |
> | pandas | 0.25.2                   | Yes                     |

If they are not found on your environment, Data Wrangler will attempt to install them for you via pip. If Data Wrangler is unable to install dependencies, the easiest workaround is to manually run pip install, and then launch Data Wrangler again. These dependencies are required for Data Wrangler such that it can generate Python and Pandas code.


## Opening Data Wrangler
Anytime you are in Data Wrangler, you are in a **sandboxed** environment, meaning you are safely able to explore and transform the data, without worry of modifying the original dataset until you explicity export your changes.

### Launching Data Wrangler from a Jupyter Notebook

There are 3 ways to launch Data Wrangler from your Jupyter Notebook

![image](https://github.com/microsoft/vscode-docs/assets/15910920/c03a4b85-80cf-46e0-b365-38820d51ff96)

1. In the Jupyter Notebook Variable Explorer, beside any supported data object, you will see a button to launch Data Wrangler.
2. If you have a Pandas data frame in your Notebook, you’ll now see an `Open 'df'` button (where 'df' is the variable name of your data frame) appear in bottom of the cell after running code that outputs the data frame. This includes 1) `df.head()`, 2) `df.tail()`, 3) `df`.
3. In the Notebook toolbar, selecting `View data` will bring up a list of every supported data object in your Notebook. You can then choose which variable in that list you want to open in Data Wrangler.

### Launching Data Wrangler directly from a file

You can also launch Data Wrangler directly from a local file (such as a .csv). To do so, open any folder in VS Code that contains the file you’d like to open. In the File Explorer panel, right click the file and click `Open in Data Wrangler`.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/517e1e29-ba45-4e24-87fb-adb53a6207f1)

Data Wrangler currently supports the following filetypes
1. `.csv`/`.tsv`
2. `.xls`/`.xlsx`
3. `.parquet`

Depending on the file type, you will be able to specify the delimeter and/or sheet of the file.
![image](https://github.com/microsoft/vscode-docs/assets/15910920/424a88fd-be5a-4d03-b878-426fe380266a)

You can also set these file types to open with Data Wrangler by default.


## UI Tour

Data Wrangler has 2 modes when working with your data. The details for each mode are explained in the subequent sections below.

1. **View Mode:** The view mode optimizes the interface for you to quickly view, filter and sort your data.
2. **Edit Mode:** The edit mode optimizes the interface for you to apply transformations, cleaning, or modifications to your dataset. As you apply these transformations in the interface, Data Wrangler will autoamtically generate the relevant Pandas code, and this can be exported back into your Notebook to be reused.

Note: By default Data Wrangler opens in the View mode, but this can be changed to Edit as well in the settings.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/6f2bef2f-d071-42aa-926c-83bcda4c9db5)

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

## Data Wrangler Operations

The built-in Data Wrangler operations can be selected from the operation panel.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/7016afb1-beee-4dc8-a223-c265fa715ebb)

These are the Data Wrangler operations that are currently supported in the initial launch of Data Wrangler (with many more to be added in the near future).

| Operation                      | Description                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Sort                           | Sort column(s) ascending or descending                                                                |
| Filter                         | Filter rows based on one or more conditions                                                           |
| Calculate text length          | Create new column with values equal to the length of each string value in a text column               |
| One-hot encode                 | Split categorical data into a new column for each category                                            |
| Multi-label binarizer          | Split categorical data into a new column for each category using a delimiter                          |
| Create column from formula     | Create a column using a custom Python formula                                                         |
| Change column type             | Change the data type of a column                                                                      |
| Drop column                    | Delete one or more columns                                                                            |
| Select column                  | Choose one or more columns to keep and delete the rest                                                |
| Rename column                  | Rename one or more columns                                                                            |
| Clone column                  | Create a copy of one or more columns                                                                            |
| Drop missing values            | Remove rows with missing values                                                                       |
| Drop duplicate rows            | Drops all rows that have duplicate values in one or more columns                                      |
| Fill missing values            | Replace cells with missing values with a new value                                                    |
| Find and replace               | Replace cells with a matching pattern                                                             |
| Group by column and aggregate  | Group by columns and aggregate results                                                                |
| Strip whitespace               | Remove whitespace from the beginning and end of text                                                  |
| Split text                     | Split a column into several columns based on a user defined delimiter                                 |
| Capitalize first character     | Converts first character to uppercase and remaining to lowercase                                      |
| Convert text to lowercase      | Convert text to lowercase                                                                             |
| Convert text to uppercase      | Convert text to UPPERCASE                                                                             |
| String transform by example    | Automatically perform string transformations when a pattern is detected from the examples you provide |
| DateTime formatting by example | Automatically perform DateTime formatting when a pattern is detected from the examples you provide    |
| New column by example          | Automatically create a column when a pattern is detected from the examples you provide.               |
| Scale min/max values           | Scale a numerical column between a minimum and maximum value                                          |
| Round                          | Rounds numbers to the specified number of decimal places |
| Round down (floor)             | Rounds numbers down to the nearest integer |
| Round up (ceiling)             | Rounds numbers up to the nearest integer |
| Custom operation               | Automatically create a new column based on examples and the derivation of existing column(s)          |

If there is an operation that is missing that you'd like to see supported in Data Wrangler, please file a feature request in our [Github repo](https://github.com/microsoft/vscode-data-wrangler/issues)

## Modifying previous steps

Each step of the generated code can be modified through the cleaning steps panel. Select the step you want to modify first. Then, as you make changes to the operation (either via code or the operation panel), the effects of your changes on the data will be highlighted in the grid view.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/8d2e20dd-9c2d-4b9c-bdad-3651d1930cc2)


## Editing and exporting code

Once you’re done with your data cleaning steps in Data Wrangler, there are 3 ways to export your cleaned dataset from Data Wrangler.

1. **Export code back to Notebook and exit:** This creates a new cell in your Jupyter Notebook with all the data cleaning code you generated packaged up into a clean Python function.
2. **Export data to a file:** This saves the cleaned dataset as a new CSV or Parquet file onto your machine.
3. **Copy code to clipboard:** This copies all the code that was generated by Data Wrangler for the data cleaning operations.


![image](https://github.com/microsoft/vscode-docs/assets/15910920/798cc251-05a2-4cef-85a1-c99210d48b29)

## Searching for columns

To find a specific column in your dataset, select `Go to column` from the Data Wrangler toolbar and search for the respective column.

![image](https://github.com/microsoft/vscode-docs/assets/15910920/0a8d41ab-d8ba-440b-9e67-312618375989))

## Troubleshooting

### General kernel connectivity issues

For general connectivity issues, please see the "Connecting to a Python kernel" section above on alternative methods to connect. To debug issues related to the local Python interpreter option, one way to potentially fix the issue would be to try installing different versions of the Jupyter and Python extensions. For example, if stable versions of the extensions are installed then one could try installing the pre-release (and vice versa). If the issue is new, then consider reverting to a previous version.

To clear an already cached kernel, you can run the `Data Wrangler: Clear cached runtime` command from the command palette (Ctrl/Cmd+Shift+P).

### UnicodeDecodeError

If you run into a UnicodeDecodeError when opening a data file directly from Data Wrangler, then this could be caused by two possible issues:

1. The file you're trying to open has an encoding other than utf-8, and/or
2. The file is corrupted.

To work around this error, you’ll need to open Data Wrangler from a Jupyter Notebook instead of directly from a data file. Use a Jupyter Notebook to read the file using Pandas, for example using the [read_csv](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html) method. Within that read method, use the _encoding_ and/or _encoding_errors_ parameters to define the encoding to use or how to handle encoding errors. If you don’t know which encoding might work for this file, you can try a library such as [chardet](https://github.com/chardet/chardet) to try to infer an encoding that works.

## Questions and feedback

If you have problems, have feature requests, or any other feedback, please submit an Issue on our GitHub repository: [https://github.com/microsoft/vscode-data-wrangler/issues/new/choose](https://github.com/microsoft/vscode-data-wrangler/issues/new/choose)

## Data and telemetry

The Microsoft Data Wrangler Extension for Visual Studio Code collects usage data and sends it to Microsoft to help improve our products and services. Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839) to learn more. This extension respects the `telemetry.telemetryLevel` setting which you can learn more about at https://code.visualstudio.com/docs/getstarted/telemetry.