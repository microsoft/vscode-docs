# Getting Started with Data Wrangler in VS Code

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) is a code-centric data viewing and cleaning tool that is integrated into VS Code and VS Code Jupyter Notebooks. It provides a rich user interface to view and analyze your data, show insightful column statistics and visualizations, and automatically generate Pandas code as you clean and transform the data.

![gif](https://private-user-images.githubusercontent.com/15910920/307412238-074cbe94-dcbe-48ac-8c21-5e8ec1337503.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTE5NjAsIm5iZiI6MTcwODcxMTY2MCwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MTIyMzgtMDc0Y2JlOTQtZGNiZS00OGFjLThjMjEtNWU4ZWMxMzM3NTAzLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE4MDc0MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWIxODczYTkwN2NlMjMzOWE3Y2QyMTQ1Yzk2MDFhZDg2NWUwMzEyMzNlMGIxYzFkMWYxZmEyZDRmMWZkNjJhZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.qE9c6Dg2F8KmBIEL-oAqJDeNY_KkzGmQZ2N-qnyETcA)

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

![image](https://private-user-images.githubusercontent.com/15910920/307426798-53273480-8544-408a-be96-638ca073b6cd.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTU2ODIsIm5iZiI6MTcwODcxNTM4MiwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MjY3OTgtNTMyNzM0ODAtODU0NC00MDhhLWJlOTYtNjM4Y2EwNzNiNmNkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE5MDk0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNiNzU2NTA2ZjhhMjViM2U5N2IzZDZlNWE5OWE2Mzk3OTBhNTZiMGMzOTFhNmE5ODBjZGUyNjlkMDhkODBiODcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.7L662lvyh1OHkQIN3GxrgnYHENFNyH_Ca8W0BDLvrPw)

1. In the Jupyter Notebook Variable Explorer, beside any supported data object, you will see a button to launch Data Wrangler.
2. If you have a Pandas data frame in your Notebook, you’ll now see an `Open 'df'` button (where 'df' is the variable name of your data frame) appear in bottom of the cell after running code that outputs the data frame. This includes 1) `df.head()`, 2) `df.tail()`, 3) `df`.
3. In the Notebook toolbar, selecting `View data` will bring up a list of every supported data object in your Notebook. You can then choose which variable in that list you want to open in Data Wrangler.

### Launching Data Wrangler directly from a file

You can also launch Data Wrangler directly from a local file (such as a .csv). To do so, open any folder in VS Code that contains the file you’d like to open. In the File Explorer panel, right click the file and click `Open in Data Wrangler`.

![image](https://private-user-images.githubusercontent.com/15910920/307406413-92bffc97-da96-4ed1-aac1-97e852dd52f2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTA1NjEsIm5iZiI6MTcwODcxMDI2MSwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MDY0MTMtOTJiZmZjOTctZGE5Ni00ZWQxLWFhYzEtOTdlODUyZGQ1MmYyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE3NDQyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZiMWU1YzkxNTU2MTNiNTk2NWJjNWYyOGNjNTllNjU5NWJhYjAzNzAyOGNiMDY3ZjhkZDhjNTAwNDZmMWZmOWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.LYWbpqiKgp6c-XvDgRFYHZNovwEJN0buhpHgHCIin4I)

Data Wrangler currently supports the following filetypes
1. `.csv`
2. `.xls`/`.xlsx`
3. `.parquet`
4. `.tsx`

Depending on the file type, you will be able to specify the delimeter and/or sheet of the file.
![image](https://private-user-images.githubusercontent.com/15910920/307452182-7e39febb-d9d8-46b2-a95f-329145a199a1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjMwNDcsIm5iZiI6MTcwODcyMjc0NywicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NTIxODItN2UzOWZlYmItZDlkOC00NmIyLWE5NWYtMzI5MTQ1YTE5OWExLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIxMTIyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFjZmExYjE4ZjY2NWQ3MzEyOTk2NDMxNzlkNGMwMWFiODRlNGNmZTVmNjJjZTJjYjFjYWIwMTQ5OWI3NTdkMGUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.PZN2yCIi-4ZdHtvAz_XfpC142E8Z9A4YeCGHacfSKpg)

You can also set these file types to open with Data Wrangler by default.


## UI Tour

Data Wrangler has 2 modes when working with your data. The details for each mode are explained in the subequent sections below.

1. **View Mode:** The view mode optimizes the interface for you to quickly view, filter and sort your data.
2. **Edit Mode:** The edit mode optimizes the interface for you to apply transformations, cleaning, or modifications to your dataset. As you apply these transformations in the interface, Data Wrangler will autoamtically generate the relevant Pandas code, and this can be exported back into your Notebook to be reused.

Note: By default Data Wrangler opens in the View mode, but this can be changed to Edit as well in the settings.

![image](https://private-user-images.githubusercontent.com/15910920/307448603-52106028-bedc-4bfe-93fe-de889f94277d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjE5NjEsIm5iZiI6MTcwODcyMTY2MSwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NDg2MDMtNTIxMDYwMjgtYmVkYy00YmZlLTkzZmUtZGU4ODlmOTQyNzdkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIwNTQyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVmMzM1OWQ5YTExZWY5NTE2ZjAxYWMxMDExNmEzNGVlNGI2ZDg1MzU2NmU0M2ZjYTA3MjkyYjQ5MWY4MWQyMDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.3ioF9bZMTCNsUtmSr_w85XcLF1orBNDeuTbCDRr7it4)

### View mode interface

![image](https://private-user-images.githubusercontent.com/15910920/307448371-722e227e-776c-4e75-ae2c-089fc3871459.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjE5MDAsIm5iZiI6MTcwODcyMTYwMCwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NDgzNzEtNzIyZTIyN2UtNzc2Yy00ZTc1LWFlMmMtMDg5ZmMzODcxNDU5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIwNTMyMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY0NjJmMWZhNTliOWI5NjZhZjFkNTdmZDU0MDY1Y2VhZDkyNzk2OTg5MTljYmZiMDQ2ZWYxYzY0M2Y2NTgxZTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.4k1bPu2GLWNxkXE9hIySud9a9m_X1V25lruVAM9B0bk)

1. The **Data Summary Panel** shows detailed summary statistics for your overall dataset or a specific column if one is selected.

2. You can apply any **Data Filters/Sorts** on the column from the header menu of the column.

3. You can toggle between the **View/Edit** modes of Data Wrangler to access the built-in data operations.

4. The **Quick Insights** header is where you can quickly see valuable information about each column. Depending on the datatype of the column, Quick Insights will show the distribution of the data or the frequency of datapoints, as well as missing and distinct values.

5. The **Data Grid** gives you a scrollable pane where you can view your entire dataset.

---

### Edit mode interface

Switching to Edit mode enables additional funcionality and UI within Data Wrangler. In the example below, we are using Data Wrangler to replace the missing values in the last column with median of that column.

![image](https://private-user-images.githubusercontent.com/15910920/307176698-450de035-aeb6-4e05-87cc-60ea6ac3a586.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg2NDIzMzgsIm5iZiI6MTcwODY0MjAzOCwicGF0aCI6Ii8xNTkxMDkyMC8zMDcxNzY2OTgtNDUwZGUwMzUtYWViNi00ZTA1LTg3Y2MtNjBlYTZhYzNhNTg2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIyVDIyNDcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQzOGQ3Mjg1ZWIxYjA2MThiODZlNTRmOWEyYWQzODZiNjc5NTczNjUyNzMzMDcxZjc5ODRjOTI4YTMwNWVjMmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.3Cc8lNVn9CRkz7Y7YGjopY577-xKBl4ygfMgFi-MGVo)


1. The **Operations Panel** is where you can search through all of Data Wrangler’s built-in data operations. The operations are organized by their top-level category.

2. The **Cleaning Steps Panel** shows a list of all the operations that have been previously applied. It enables the user to undo specific operations or edit the *most recent* operation. Selecting a step will highlight the changes in the data grid and will show the generated code associated with that operation.

3. The **Export Menu** lets you export the code back into a Jupyter Notebook or into a new data file.

4. When you have an operation selected and are previewing its effects on the data, the grid will be overlayed with a **Data Diff** view of the changes you made to the data.

5. The **Code Preview** section will show the Python and Pandas code that Data Wrangler has generated when an operation is selected. It will remain blank when no operation is selected. The code can even be edited by the user, and the data grid will highlight the effect on the data.

## Data Wrangler Operations

The built-in Data Wrangler operations can be selected from the operation panel.

![image](https://private-user-images.githubusercontent.com/15910920/307450328-468b82fe-bf78-40a8-ab60-860b2ad4ce53.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjI0ODMsIm5iZiI6MTcwODcyMjE4MywicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NTAzMjgtNDY4YjgyZmUtYmY3OC00MGE4LWFiNjAtODYwYjJhZDRjZTUzLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIxMDMwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFjOGU3YzU0ZDk1ZjA3MWQzZDUzNTJiNWExNTRkZjIzMTJlMjU1ZmVmNGVmZDY5MWUwZmFmMDRkYzA5Yzk1NmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.dqqEBYkfpf2PyqVYmVH4_9Mc_aKYYBytEz3l792beg4)

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

![image](https://private-user-images.githubusercontent.com/15910920/307450932-e87a13bc-f9dc-4653-867e-8036f9e6cd1f.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjI2NzMsIm5iZiI6MTcwODcyMjM3MywicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NTA5MzItZTg3YTEzYmMtZjlkYy00NjUzLTg2N2UtODAzNmY5ZTZjZDFmLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIxMDYxM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThmOTY3NmQ2OWU0YjIzODE4OGNiZDI0N2E4MTYxMmY0NGZmNWFkNjU3M2Y1MDgxNzJiZjIyZjg2NTM4MjE0ZDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1Iq1xDx3KnJujjuowYiTb9XZcS2kQW6bpdojGIX13WQ)


## Editing and exporting code

Once you’re done with your data cleaning steps in Data Wrangler, there are 3 ways to export your cleaned dataset from Data Wrangler.

1. **Export code back to Notebook and exit:** This creates a new cell in your Jupyter Notebook with all the data cleaning code you generated packaged up into a clean Python function.
2. **Export data to a file:** This saves the cleaned dataset as a new CSV or Parquet file onto your machine.
3. **Copy code to clipboard:** This copies all the code that was generated by Data Wrangler for the data cleaning operations.


![image](https://private-user-images.githubusercontent.com/15910920/307446970-5762375c-d072-4352-9c48-e834a3562880.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjE0NzUsIm5iZiI6MTcwODcyMTE3NSwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NDY5NzAtNTc2MjM3NWMtZDA3Mi00MzUyLTljNDgtZTgzNGEzNTYyODgwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIwNDYxNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVmMjc2N2ZmMWQwNWU0MzE1NzUyMTg4ZGJiZTMyOTA5NzM0MzQ0Njk1ZWJhNWE3MDAwYTRhYTFmMjhlZWRjMjUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.2lrqrzEVmbXeZ1cvgZYExPtHEsRJxfv_JemGHlTUgTU)

## Searching for columns

To find a specific column in your dataset, select `Go to column` from the Data Wrangler toolbar and search for the respective column.

![image](https://private-user-images.githubusercontent.com/15910920/307451540-3835c239-ddc9-496b-876c-c8615476d7db.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MjI4NTYsIm5iZiI6MTcwODcyMjU1NiwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0NTE1NDAtMzgzNWMyMzktZGRjOS00OTZiLTg3NmMtYzg2MTU0NzZkN2RiLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDIxMDkxNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNmODE1NDU2NTU3NTdmN2YzOTAzNzJhNmRkYzBmOGY5MjE1NDk0ZjBkY2E4YWJmNmFhOGRhYWYyNjg1NTIwNWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.eY4eVVlVJXiRr5mZvgEYahQEe1iF34WJvm19AIhEd2M)

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