# Quick Start Guide for Data Wrangler in VS Code

[Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler) is a code-centric data viewing and cleaning tool that is integrated into VS Code and VS Code Jupyter Notebooks. It provides a rich user interface to view and analyze your data, show insightful column statistics and visualizations, and automatically generate Pandas code as you clean and transform the data.

![gif](https://private-user-images.githubusercontent.com/15910920/307412238-074cbe94-dcbe-48ac-8c21-5e8ec1337503.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTE5NjAsIm5iZiI6MTcwODcxMTY2MCwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MTIyMzgtMDc0Y2JlOTQtZGNiZS00OGFjLThjMjEtNWU4ZWMxMzM3NTAzLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE4MDc0MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWIxODczYTkwN2NlMjMzOWE3Y2QyMTQ1Yzk2MDFhZDg2NWUwMzEyMzNlMGIxYzFkMWYxZmEyZDRmMWZkNjJhZjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.qE9c6Dg2F8KmBIEL-oAqJDeNY_KkzGmQZ2N-qnyETcA)

## Setting up your environment

1. If you have not already done so, install [Python](https://www.python.org/downloads/)
   (**Note:** Data Wrangler only supports Python version 3.8 or higher).
2. Install the [Data Wrangler extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler).

When you launch Data Wrangler for the first time, it will check your machine and environment to see if any required Python packages are installed (e.g., Pandas). If they are not found on your environment, Data Wrangler will attempt to install them for you via pip.

## Opening Data Wrangler
Anytime you are in Data Wrangler, you are in a **sandboxed** environment, meaning you are safely able to explore and transform the data, without worry of modifying the original dataset until you explicity export your changes.

### Launching Data Wrangler from a Jupyter Notebook

If you have a Pandas data frame in your Notebook, you’ll now see an `Open 'df'` button (where 'df' is the variable name of your data frame) appear in bottom of the cell after running `df.head()`.

![image](https://private-user-images.githubusercontent.com/15910920/307405587-2d37b807-8e55-4233-aa47-1706af223950.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTAzNDEsIm5iZiI6MTcwODcxMDA0MSwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MDU1ODctMmQzN2I4MDctOGU1NS00MjMzLWFhNDctMTcwNmFmMjIzOTUwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE3NDA0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY4MzliMWI3YTVkMGUwYzc1OGNjMTgwN2QyMjJhZDhlYWQ3YjU3NDhjYjJjNDk2NGQxMTZhODk4MTEyMGYyZWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.6Ivz44kqrVUPEPPgWtLrq1huxLTveogpUwdQg4e2_nI)

### Launching Data Wrangler directly from a file

You can also launch Data Wrangler directly from a local file (such as a .csv). To do so, open any folder in VS Code that contains the file you’d like to open. In the File Explorer panel, right click the file and click `Open in Data Wrangler`.

![image](https://private-user-images.githubusercontent.com/15910920/307406413-92bffc97-da96-4ed1-aac1-97e852dd52f2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTA1NjEsIm5iZiI6MTcwODcxMDI2MSwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MDY0MTMtOTJiZmZjOTctZGE5Ni00ZWQxLWFhYzEtOTdlODUyZGQ1MmYyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE3NDQyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZiMWU1YzkxNTU2MTNiNTk2NWJjNWYyOGNjNTllNjU5NWJhYjAzNzAyOGNiMDY3ZjhkZDhjNTAwNDZmMWZmOWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.LYWbpqiKgp6c-XvDgRFYHZNovwEJN0buhpHgHCIin4I)

## UI Tour

Data Wrangler has 2 modes when working with your data. The details for each mode are explained in the subequent sections below.

1. **View Mode:** The view mode optimizes the interface for you to quickly view, filter and sort your data.
2. **Edit Mode:** The edit mode optimizes the interface for you to apply transformations, cleaning, or modifications to your dataset. As you apply these transformations in the interface, Data Wrangler will autoamtically generate the relevant Pandas code, and this can be exported back into your Notebook to be reused.


Note: By default Data Wrangler opens in the View mode, but this can be changed to Edit as well in the settings.

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

## Example: Replacing missing values in your dataset

![gif](https://private-user-images.githubusercontent.com/15910920/307414835-58c04bba-e0ed-4d6e-a890-c750e7f51fe7.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg3MTI2OTAsIm5iZiI6MTcwODcxMjM5MCwicGF0aCI6Ii8xNTkxMDkyMC8zMDc0MTQ4MzUtNThjMDRiYmEtZTBlZC00ZDZlLWE4OTAtYzc1MGU3ZjUxZmU3LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjIzVDE4MTk1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI4NDhhZjhiZGQxMTM5YjBjZjAwMmQzM2UxMGI5MDNkZWRjNGY2ZmNjNzRjZmY2MGNkOGMwNzk3YjJiZmYxMDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.KDKP2JzEks2KWXpGhUXnQcCcOinuphhSvoiwSlUSdVg)

1. In the **Operation Panel**, search for the `Fill Missing Values` operation.
2. Specify in the parameters what you would like to replace the missing values with. In this case, we will be replacing the missing values with the median value for the column.
3. Validate that the data grid is showing you the correct changes in the data diff.
4. Validate that the code generated by Data Wrangler is what you intended.
5. Apply the operation and it will be added to your cleaning steps history.

# Next Steps

This page covered how to quickly get started with Data Wrangler. For the full documentation and tutorial of Data Wrangler, including all the built-in operations that Data Wrangler currently supports, see the following page.

[Data Wrangler Documentation]()