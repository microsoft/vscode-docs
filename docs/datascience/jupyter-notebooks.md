---
Order: 2
Area: datascience
TOCTitle: Jupyter Notebooks
ContentId: 17345073-cb40-448c-a312-28982900f132
PageTitle: Working with Jupyter Notebooks in Visual Studio Code
DateApproved: 1/9/2023
MetaDescription: Working with Jupyter Notebooks in Visual Studio Code.
MetaSocialImage: images/tutorial/python-social.png
---

# Jupyter Notebooks in VS Code

[Jupyter](https://jupyter-notebook.readthedocs.io/en/latest/) (formerly IPython Notebook) is an open-source project that lets you easily combine Markdown text and executable Python source code on one canvas called a **notebook**. Visual Studio Code supports working with Jupyter Notebooks natively, and through [Python code files](/docs/python/jupyter-support-py.md). This topic covers the native support available for Jupyter Notebooks and demonstrates how to:

- Create, open, and save Jupyter Notebooks
- Work with Jupyter code cells
- View, inspect, and filter variables using the Variable Explorer and Data Viewer
- Connect to a remote Jupyter server
- Debug a Jupyter Notebook

## Setting up your environment

To work with Python in Jupyter Notebooks, you must activate an Anaconda environment in VS Code, or another Python environment in which you've installed the [Jupyter package](https://pypi.org/project/jupyter/). To select an environment, use the **Python: Select Interpreter** command from the Command Palette (`kb(workbench.action.showCommands)`).

Once the appropriate environment is activated, you can create and open a Jupyter Notebook, connect to a remote Jupyter server for running code cells, and export a Jupyter Notebook as a Python file.

## Workspace Trust

When getting started with Jupyter Notebooks, you'll want to make sure that you are working in a trusted workspace. Harmful code can be embedded in notebooks and the [Workspace Trust](/docs/editor/workspace-trust.md) feature allows you to indicate which folders and their contents should allow or restrict automatic code execution.

If you attempt to open a notebook when VS Code is in an untrusted workspace running [Restricted Mode](/docs/editor/workspace-trust.md#restricted-mode), you will not be able to execute cells and rich outputs will be hidden.

## Create or open a Jupyter Notebook

You can create a Jupyter Notebook by running the **Create: New Jupyter Notebook** command from the Command Palette (`kb(workbench.action.showCommands)`) or by creating a new `.ipynb` file in your workspace.

![Blank Jupyter Notebook](images/jupyter/native-code-cells-01.png)

Next, select a kernel using the kernel picker in the top right.

![Kernel Picker](images/jupyter/native-kernel-picker.png)

After selecting a kernel, the language picker located in the bottom right of each code cell will automatically update to the language supported by the kernel.

![Language Picker](images/jupyter/native-language-picker-01.png)

If you have an existing Jupyter Notebook, you can open it by right-clicking on the file and opening with VS Code, or through the VS Code File Explorer.

## Running cells

### Run a single code cell

Once your code is added, you can run a cell using the **Run** icon to the left of the cell and the output will be displayed below the code cell.

![Run Jupyter code cell](images/jupyter/native-code-cells-03.png)

To run a selected code cell, you can also use keyboard shortcuts in both command and edit mode. `kbstyle(Ctrl+Enter)` runs the currently selected cell. `kbstyle(Shift+Enter)` runs the currently selected cell and inserts a new cell immediately below (focus moves to new cell). `kbstyle(Alt+Enter)` runs the currently selected cell and inserts a new cell immediately below (focus remains on current cell).

### Run multiple code cells

Running multiple code cells can be accomplished in many ways. You can use the double arrow in the main toolbar of the Notebook Editor to run all cells within the Notebook or by selecting **Run All**, **Run All Above**, or **Run All Below** above or below the current code cell.

![Run multiple code cells](images/jupyter/native-code-runs.png)

### Run cells in section

To more easily run related cells in a notebook, you can run cells that are grouped together by a markdown section header with the **Run Cells in Section** action. This action is available on the notebook Outline view and for Sticky Scroll elements.

Within Sticky Scroll elements, right-click the header of your choice, and run the section via the action in the context menu. Within the Outline view, select the toolbar icon that appears on hover or selection, and then run a single cell or a section of cells via the presented actions.

<video src="images/jupyter/notebook-run-in-section.mp4" title="Run Cells in Section for notebook outline and Sticky Scroll" autoplay loop controls muted></video>

## Save your Jupyter Notebook

You can save your Jupyter Notebook using the keyboard shortcut `kbstyle(Ctrl+S)` or **File** > **Save**.

## Export your Jupyter Notebook

You can export a Jupyter Notebook as a Python file (`.py`), a PDF, or an HTML file. To export, select **...** > **Export** on the main toolbar. You're then presented with a dropdown of file format options.

 ![Convert Jupyter Notebook to Python file](images/jupyter/native-toolbar-export.png)

> **Note:** For PDF export, you must have [TeX installed](https://nbconvert.readthedocs.io/en/latest/install.html#installing-tex). If you don't, you will be notified that you need to install it when you select the PDF option. Also, be aware that if you have SVG-only output in your Notebook, they will not be displayed in the PDF. To have SVG graphics in a PDF, either ensure that your output includes a non-SVG image format or else you can first export to HTML and then save as PDF using your browser.

## Work with code cells in the Notebook Editor

The Notebook Editor makes it easy to create, edit, and run code cells within your Jupyter Notebook.

### Create a code cell

By default, a blank notebook will have an empty code cell for you to start with and an existing notebook will place one at the bottom. Add your code to the empty code cell to get started.

```python
msg = "Hello world"
print(msg)
```

![Simple Jupyter code cell](images/jupyter/native-code-cells-02.png)

### Code cell modes

While working with code cells, a cell can be in three states: unselected, command mode, and edit mode. A vertical bar to the left of a code cell and editor border shows the current state of a cell. When no bar is visible, the cell is unselected. When a cell is selected, it can be in command mode or in edit mode.

![Unselected Jupyter code cell](images/jupyter/native-code-unselected-02.png)

In command mode, a solid vertical bar will appear to the left of the cell. The cell can be operated on and accepts keyboard commands.

![Code cell in command mode](images/jupyter/native-code-cells-02.png)

In edit mode, a solid vertical bar is joined by a border around the cell editor. The cell's contents (code or Markdown) can be modified.

![Code cell in edit mode](images/jupyter/native-code-cells-04.png)

To switch modes, you can use your keyboard or mouse. On your keyboard, press the `kbstyle(Enter)` key to move to edit mode or the `kbstyle(Esc)` key to move to command mode. With your mouse, click the vertical bar to the left of the cell or out of the code/Markdown region in the code cell.

### Add additional code cells

You can add code cells using the main toolbar, a cell's add cell toolbar (visible with hover), and through keyboard commands.

![Add code cells](images/jupyter/native-add-cells.png)

To add a new cell below the currently selected cell, use the plus icon in the main toolbar or a cell's hover toolbar.

When a code cell is in command mode, use the `kbstyle(A)` key to add a cell above and the `kbstyle(B)` key to add a cell below the selected cell.

### Select a code cell

You can change a selected code cell using the mouse or the up/down arrow keys on the keyboard. When a code cell is in command mode, you can also use the `kbstyle(J)` key (down) and `kbstyle(K)` key (up).

### Select multiple code cells

To select multiple cells, start with one cell in selected mode. A filled background indicates selected cells. To select consecutive cells, hold down the `kbstyle(Shift)` key and click the last cell you want to select. To select any group of cells, hold down the `kbstyle(Ctrl)` key and click the cells you'd like to add to your selection.

![Multiselected cells](images/jupyter/multiselect.png)

### Move a code cell

You can move cells up or down within a notebook via dragging and dropping. For code cells, the drag and drop area is to the left of the cell editor as indicated below. For rendered Markdown cells, you may click anywhere to drag and drop cells.

![Move a code cell](images/jupyter/code-move.png)

To move multiple cells, you can use the same drag and drop areas in any cell included in the selection.

The keyboard shortcut `kbstyle(Alt+Arrow)` also moves one or multiple selected cells.

### Delete a code cell

To delete code, you can use the **Delete** icon in the code cell toolbar. When the selected code cell is in command mode, you can use the keyboard shortcut `kbstyle(dd)`.

![Delete a code cell](images/jupyter/native-code-delete.png)

### Undo your last change

You can use the `kbstyle(z)` key to undo your previous change, for example, if you've made an accidental edit, you can undo it to the previous correct state, or if you've deleted a cell accidentally, you can recover it.

### Switch between code and Markdown

The Notebook Editor allows you to easily change code cells between Markdown and code. Selecting the language picker in the bottom right of a cell will allow you to switch between Markdown and, if applicable, any other language supported by the selected kernel.

![Change language](images/jupyter/native-language-picker-01.png)

You can also use the keyboard to change the cell type. When a cell is selected and in command mode, the `kbstyle(M)` key switches the cell type to Markdown and the `kbstyle(Y)` key switches the cell type to code.

Once Markdown is set, you can enter Markdown formatted content to the code cell.

![Raw Markdown displayed in code cell](images/jupyter/native-markdown-not-rendered.png)

To render Markdown cells, you can select the check mark in the cell toolbar, or use the keyboard shortcuts `kbstyle(Ctrl+Enter)` and `kbstyle(Shift+Enter)`.

![How to render Markdown](images/jupyter/native-markdown-htr.png)

![Rendered Markdown displayed in code cell](images/jupyter/native-markdown-rendered.png)

### Clear output or restart/interrupt the kernel

If you'd like to clear all code cell outputs or restart/interrupt the kernel, you can accomplish that using the main Notebook Editor toolbar.

![Notebook Toolbar](images/jupyter/notebook-toolbar.png)

### Enable/disable line numbers

When you are in command mode, you can enable or disable line numbering within a single code cell by using the `kbstyle(L)` key.

![Line numbers enabled in code cell](images/jupyter/cell-toggle-line-num.png)

To toggle line numbering for the entire notebook, use `kbstyle(Shift+L)` when in command mode on any cell.

![Line numbers enabled for notebook](images/jupyter/notebook-toggle-line-num.png)

## Table of Contents

To navigate through your notebook, open the File Explorer in the Activity Bar. Then open the **Outline** tab in the Side Bar.

![Table of contents](images/jupyter/table-of-contents.png)

You can use the filter control in the Outline view to include Markdown headers, code cells, and code cell symbols. The filters correspond to the following settings:

- `notebook.outline.showMarkdownHeadersOnly`
- `notebook.outline.showCodeCells`
- `notebook.outline.showCodeCellSymbols`

<video src="images/jupyter/notebook-outline-filters.mp4" title="Notebook Outline filter controls." autoplay loop controls muted></video>

> **Note:** By default, the outline will only show Markdown. To show code cells, enable the following setting:  **Notebook > Outline: Show Code Cells**.

## IntelliSense support in the Jupyter Notebook Editor

The Python Jupyter Notebook Editor window has full IntelliSense – code completions, member lists, quick info for methods, and parameter hints. You can be just as productive typing in the Notebook Editor window as you are in the code editor.

![IntelliSense support](images/jupyter/intellisense.png)

## Variable Explorer and Data Viewer

Within a Python Notebook, it's possible to view, inspect, sort, and filter the variables within your current Jupyter session. By selecting the **Variables** icon in the main toolbar after running code and cells, you'll see a list of the current variables, which will automatically update as variables are used in code. The variables pane will open at the bottom of the notebook.

![Variable Explorer](images/jupyter/variable-explorer-01.png)

![Variable Explorer](images/jupyter/variable-explorer-02.png)

### Data Viewer

For additional information about your variables, you can also double-click a row or use the **Show variable in data viewer** button next to the variable for a more detailed view of a variable in the Data Viewer.

![Data Viewer](images/jupyter/data-viewer.png)

Alternatively, you can use the data viewing experience offered by other extensions like [Data Wrangler](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler). The Data Wrangler extension offers a rich user interface to show insights about your data and helps you perform data profiling, quality checks, transformations, and more. Learn more about the [Data Wrangler extension in our docs](/docs/datascience/data-wrangler.md).

### Filtering rows

Filtering rows in the data viewer can be done by typing in the textbox at the top of each column. Type a string you want to search for and any row that has that string in the column will be found:

![Data Viewer](images/jupyter/filter-default.png)

If you want to find an exact match, prefix your filter with '=':

![Data Viewer](images/jupyter/filter-exact.png)

More complex filtering can be done by typing a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions):

![Data Viewer](images/jupyter/filter-regex.png)

## Saving plots

To save a plot from your notebook, simply hover over the output and select the **Save** icon in the top right.

![Save output](images/jupyter/save-output.png)

> **Note:** There is support for rendering plots created with [matplotlib](https://matplotlib.org/) and [Altair](https://altair-viz.github.io/index.html).

## Custom notebook diffing

Under the hood, Jupyter Notebooks are JSON files. The segments in a JSON file are rendered as cells that are comprised of three components: input, output, and metadata. Comparing changes made in a notebook using lined-based diffing is difficult and hard to parse. The rich diffing editor for notebooks allows you to easily see changes for each component of a cell.

You can even customize what types of changes you want displayed within your diffing view. In the top right, select the overflow menu item in the toolbar to customize what cell components you want included. Input differences will always be shown.

![Custom notebook diffing](images/jupyter/notebook-diffing.png)

To learn more about Git integration within VS Code, visit [Source Control in VS Code](/docs/sourcecontrol/overview.md).

## Debug a Jupyter Notebook

There are two different ways to debug a Jupyter notebook: a simpler mode called "Run by Line", and full debugging mode.

> **Note:** Both of these features require ipykernel 6+. See [this wiki page](https://github.com/microsoft/vscode-jupyter/wiki/Setting-Up-Run-by-Line-and-Debugging-for-Notebooks) for details about installing or upgrading ipykernel.

### Run by Line

Run by Line lets you execute a cell one line at a time, without being distracted by other VS Code debug features. To start, select the **Run by Line** button in the cell toolbar:

![Run by line button](images/jupyter/run-by-line.png)

Use the same button to advance by one statement. You can select the cell **Stop** button to stop early, or the **Continue** button in the toolbar to continue running to the end of the cell.

### Debug Cell

If you want to use the full set of debugging features supported in VS Code, such as breakpoints and the ability to step in to other cells and modules, you can use the full VS Code debugger.

1. Start by setting any breakpoints you need by clicking in the left margin of a notebook cell.
2. Then select the **Debug Cell** button in the menu next to the **Run** button. This will run the cell in a debug session, and will pause on your breakpoints in any code that runs, even if it is in a different cell or a `.py` file.
3. You can use the Debug view, Debug Console, and all the buttons in the Debug Toolbar as you normally would in VS Code.

Note that debugging cells in a jupyter notebook does not use any of the debug configurations in launch.json.  It can be customized instead via settings such as `jupyter.debugJustMyCode`.

![Debug cell button](images/jupyter/debug-cell.png)

### Search through notebook

You can search through a notebook (or parts of it by filtering the search options) by using the keyboard shortcut `kbstyle(Ctrl/Cmd + F)`. Click the Filter option (funnel icon) to search across:

- Markdown cell input (**Markdown Source**)
- Markdown cell output (**Rendered Markdown**)
- Code cell input (**Code Cell Source**)
- Code cell output (**Cell Output**)

Notebook searches are filtered cell inputs only by default.

![Search options](images/jupyter/search-filter.png)

## Connect to a remote Jupyter server

You can offload intensive computation in a Jupyter Notebook to other computers by connecting to a remote Jupyter server. Once connected, code cells run on the remote server rather than the local computer.

To connect to a remote Jupyter server:

1. Open the Kernel Picker button on the top right-hand side of the notebook (or run the **Notebook: Select Notebook Kernel** command from the Command Palette).

   ![Notebook kernel picker](images/jupyter/notebook-kernel-picker.png)

2. Select the **Existing Jupyter Server** option to connect to an existing Jupyter server.

   ![Select existing Jupyter server](images/jupyter/select-existing-server.png)

3. To connect to an existing server for the first time, select **Enter the URL of the running Jupyter server**.

   ![Choose to connect to an existing server](images/jupyter/select-enter-server-url.png)

4. When prompted to **Enter the URL of the running Jupyter server**, provide the server's URI (hostname) with the authentication token included with a `?token=` URL parameter. (If you start the server in the VS Code terminal with an authentication token enabled, the URL with the token typically appears in the terminal output from where you can copy it.) Alternatively, you can specify a username and password after providing the URI.

   ![Prompt to supply a Jupyter server URI](images/jupyter/enter-server-url.png)

> **Note:** For added security, Microsoft recommends configuring your Jupyter server with security precautions such as SSL and token support. This helps ensure that requests sent to the Jupyter server are authenticated and connections to the remote server are encrypted. For guidance about securing a notebook server, refer to the [Jupyter documentation](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#securing-a-notebook-server).

## Data Science profile template

[Profiles](https://code.visualstudio.com/docs/editor/profiles) let you quickly switch your extensions, settings, and UI layout depending on your current project or task. To help you get started with Jupyter Notebooks, you can use the [Data Science profile template](/docs/editor/profiles.md#data-science-profile-template), which is a curated profile with useful extensions, settings, and snippets. You can use a profile template as is or use it as a starting point to customize further for you own workflows.

You select a profile template through the **Profiles** > **Create Profile...** dropdown:

![Create Profile dropdown with profile templates](images/jupyter/profile-template-dropdown.png)

Once you select a profile template, you can review the settings and extensions, and remove individual items if you don't want to include them in your new profile. After creating the new profile based on the template, changes made to settings, extensions, or UI are persisted in your profile.
