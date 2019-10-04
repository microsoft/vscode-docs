---
Order: 5
Area: python
TOCTitle: Jupyter Notebooks Support
ContentId: 779b7ad3-0aaa-4632-9998-0d8f964c0599
PageTitle: Working with Jupyter Notebooks in Visual Studio Code
DateApproved: 08/15/2019
MetaDescription: Working with Jupyter Notebooks in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---

# Working with Jupyter Notebooks in Visual Studio Code

[Jupyter](http://jupyter-notebook.readthedocs.io/en/latest/) (formerly IPython) is an open-source project that lets you easily combine Markdown text and executable Python source code on one canvas called a *notebook*. Visual Studio Code supports working with Jupyter Notebooks natively, as well as through [Python code files](jupyter-support-py.md). This topic covers the native support available for Jupyter Notebooks and demonstrates how to:

- Create and open Jupyter Notebooks
- Work with Jupyter code cells
- View, inspect, and filter variables using the Variable explorer and Data viewer
- Connect to a remote Jupyter server
- Debug a Jupyter notebook

To work with Jupyter notebooks, you must activate an Anaconda environment in VS Code, or another Python environment in which you've installed the [Jupyter package](https://pypi.org/project/jupyter/). To select an environment, use the **Python: Select Interpreter** command from the Command Palette (`kb(workbench.action.showCommands)`).

Once the appropriate environment is activated, you can create and open Jupyter Notebooks, connect to a remote Jupyter server for running code cells, and export Jupyter Notebooks as Python files.

## Create or open Jupyter Notebooks

You can create a Jupyter Notebook by running the **Python: Create Blank New Jupyter Notebook** command from the Command Palette (`kb(workbench.action.showCommands)`) or by creating a new .ipynb file in your workspace. When you select the file, the Notebook Editor is launched allowing you to edit and run code cells.

![Blank Jupyter Notebook](images/jupyter/native-code-cells-01.png)

If you have an existing Jupyter Notebook, you can open it in the Notebook Editor by double clicking on the file and opening with Visual Studio Code, through the Visual Studio Code, or using the Command Palette **Python: Open in Notebook Editor** command.

## Work with code cells in the Notebook Editor

The Notebook Editor makes it easy to create, edit, and run code cells within your Jupyter Notebook.

### Create a code cell

By default, a blank Notebook will have an empty code cell for you to start with and an existing Notebook will place one at the bottom. Simply add your code to the empty code cell to get started.

```python
msg = "Hello world"
print(msg)
```

![Simple Jupyter code cell](images/jupyter/native-code-cells-02.png)

### Add additional code cells

Code cells can be added to a Notebook using the main toolbar, a code cell's vertical toolbar, the add code cell icon at the bottom of the notebook, the add code cell icon at the top of the notebook (visible with hover), and through keyboard commands.

![Add code cells](images/jupyter/native-code-cells-07.png)

 Using the plus icon in the main toolbar will add a new cell directly below the currently selected cell. Using the add cell icons at the top and bottom of the Jupyter Notebook, will add a code cell at the top and bottom respectively. And using the add icon in the code cell's toolbar, will add a new code cell directly below it.

When a code cell is selected, the `kbstyle(A)` key can be used to add a cell above and the `kbstyle(B)` can be used to add a cell below.

### Select a code cell

The selected code cell can be changed using the mouse, the up/down arrow keys on the keyboard, and the `kbstyle(J)` (up) and `kbstyle(K)` (down) keys. When you select a code cell, there are two different modes.....

### Run a single code cell

Once your code is added, you can run the cell using the green run arrow and the output will be displayed below the code cell.

![Run Jupyter code cell](images/jupyter/native-code-cells-03.png)

Alternately, you can use the key combos `kbstyle(Ctrl+Enter)` to run the current cell, `kbstyle(Shift+Enter)` to run the current cell and insert a new cell immediately below (focus moves to new cell), or `kbstyle(Alt+Enter)` to run the current cell and insert a new cell immediately below (focus remains on current cell).

### Run multiple code cells

Running multiple code cells can be accomplished in a number of ways. You can use the double arrow in the toolbar of the Notebook Editor to run all cells within the Notebook or the hover toolbar arrows to run all cells above or below the current code cell.

![Run multiple code cells](images/jupyter/native-code-cells-04.png)

### Move a code cell

Moving code cells up or down within a Notebook can be accomplished using the vertical arrows beside each code cell. Simply select the cell by clicking the vertical bar to it's left or by clicking within the cell content. Then click the up arrow to move the cell up and the down arrow to move the cell down.

![Move a code cell](images/jupyter/native-code-cells-05.png)

### Delete a code cell

Deleting a code cell can be accomplished using the delete icon in the code cell toolbar or through the keyboard combo `kbstyle(dd)`. To use the keyboard combo, the cell must first be selected by clicking on the vertical bar to it's left.

![Delete a code cell](images/jupyter/native-code-cells-06.png)

### Switch between code and Markdown

The Notebook Editor allows you to easily change code cells between Markdown and code. By default a code cell is set for code, but just click the Markdown icon (or the code icon, if Markdown was previously set) in the code cell's toolbar to change it.

![Markdown toolbar icon](images/jupyter/native-code-cells-08.png)

Once Markdown is set, you can enter Markdown formatted content to the code cell. Once you select another cell or toggle out of the content selection, the Markdown content is rendered in the Notebook Editor.

![Raw Markdown displayed in code cell](images/jupyter/native-markdown-03.png)

![Rendered Markdown displayed in code cell](images/jupyter/native-markdown-02.png)

You can also use the keyboard to change the cell type. When a cell is selected, but not the content, the `kbstyle(M)` key switches the cell type to Markdown and the `kbstyle(Y)` key switches the cell type to code.


## Intellisense support in the Jupyter Notebook Editor

The Python Jupyter Notebook Editor window has full IntelliSense – code completions, member lists, quick info for methods, and parameter hints. You can be just as productive typing in the Notebook Editor window as you are in the code editor.

![Intellisense support](images/jupyter/native-intellisense.png)

## Plot viewer

The Plot Viewer gives you the ability to work more deeply with your plots. In the viewer you can pan, zoom, and navigate plots in the current session. You can also export plots to PDF, SVG, and PNG formats.

Within the Notebook Editor window, double-click any plot to open it in the viewer, or select the plot viewer button on the upper left corner of the plot (visible on hover).

![Plot Viewer icon in the Notebook Editor](images/jupyter/native-plot-viewer.png)

![Plot Viewer with a selected plot](images/jupyter/native-plot-viewer-02.png)

## Data viewer and variable explorer

Within the Python Notebook Editor, it's possible to view, inspect, and filter the variables within your current Jupyter session. By clicking the **Variables** icon in the top toolbar after running code and cells, you'll see a list of the current variables, which will automatically update as variables are used in code. Clicking on each column header will allow you to sort the variables in the table.

![Variable Explorer](images/jupyter/native-variable-explorer.png)

For additional information about your variables, you can also double-click on a row or use the **Show variable in data viewer** button next to the variable to see a more detailed view of a variable in the Data Viewer. Once open, you can filter the values by searching over the rows.

![Data Viewer](images/jupyter/native-data-viewer.png)

> **Note:** Variable explorer is enabled by default, but can be turned off in settings (Python > Data Science: Show Jupyter Variable Explorer).

## Debug a Jupyter Notebook

Currently, to debug a Jupyter Notebook you will need to first convert and save it as a Python file. Once converted to a Python file, the Visual Studio Code debugger lets you step through your code, set breakpoints, examine state, and analyze problems. Using the debugger is a helpful way to find and correct issues in notebook code. To debug your Python file:

1. In VS Code, if you haven't already, activate a Python environment in which Jupyter is installed.
1. From your Jupyter Notebook (.ipynb) select the convert button in the main toolbar.

   ![Convert Jupyter Notebook to Python file](images/jupyter/native-toolbar-convert.png)

   Once converted, you'll have a .py file with your code that you can use for debugging.

1. After saving the converted file, to start the debugger, use one of the following options:

    - For the whole notebook, open the Command Palette (`kb(workbench.action.showCommands)`) and run the **Python: Debug Current File in Python Interactive Window** command.
    - For an individual cell, use the **Debug Cell** adornment that appears above the cell. The debugger specifically starts on the code in that cell. By default, **Debug Cell** just steps into user code. If you want to step into non-user code, you need to uncheck **Data Science: Debug Just My Code** in the Python extension settings (`kb(workbench.action.openSettings)`).

1. To familiarize yourself with the general debugging features of VS Code, such as inspecting variables, setting breakpoints, and other activities, review [VS Code debugging](/docs/editor/debugging.md).

1. As you find issues, stop the debugger, correct your code, save the file, and start the debugger again.

1. When you're satisfied that all your code is correct, use the Python Interactive window to export the Python file as a Jupyter Notebook (.ipynb).

## Connect to a remote Jupyter server

You can offload intensive computation in a Jupyter notebook to other computers by connecting to a remote Jupyter server. Once connected, code cells run on the remote server rather than the local computer.

To connect to a remote Jupyter server:

1. Run the **Python: Specify Jupyter server URI** command from the Command Palette (`kb(workbench.action.showCommands)`).
2. When prompted, provide the server's URI (hostname) with the authentication token included with a `?token=` URL parameter. (If you start the server in the VS Code terminal with an authentication token enabled, the URL with the token typically appears in the terminal output from where you can copy it.)

    ![Prompt to supply a Jupyter server URI](images/jupyter/enter-url-auth-token.png)

## Save your Jupyter Notebook

You can save your Jupyter Notebook using the keyboard combo `kbstyle(Ctrl+S)` or through the save icon on the Notebook Editor toolbar.

![Notebook Editor save icon](images/jupyter/native-toolbar-save.png)
