---
Order: 5
Area: python
TOCTitle: Jupyter Support
ContentId: 779b7ad3-0aaa-4632-9998-0d8f964c0599
PageTitle: Working with Jupyter Notebooks in Visual Studio Code
DateApproved: 01/03/2019
MetaDescription: Working with Jupyter Notebooks in Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---

# Working with Jupyter Notebooks in Visual Studio Code

[Jupyter](http://jupyter-notebook.readthedocs.io/en/latest/) (formerly IPython) is an open source project that lets you easily combine Markdown text and executable Python source code on one canvas called a *notebook*.

To work with Jupyter notebooks, you must activate an Anaconda environment in VS Code, or another Python environment in which you've installed the [Jupyter package](https://pypi.org/project/jupyter/). To select an environment, use the **Python: Select Interpreter** command from the Command Palette (`kb(workbench.action.showCommands)`).

Once the appropriate environment is activated, you can create and run Jupyter-like code cells, connect to a remote Jupyter server for running code cells, open a Jupyter notebook directly, and export Python files as Jupyter notebooks.

## Jupyter code cells

You define Jupyter-like code cells within Python code using a `#%%` comment:

```python
#%%
msg = "Hello World"
print(msg)
```

When the Python extension detects a code cell, it adds a **Run Cell** or **Run All Cells** CodeLens above the comment:

![Jupyter adornments for code cells in the VS Code editor](images/jupyter/code-cells-01.png)

Selecting either command starts Jupyter (if necessary, which might take a minute), then runs the cell(s) in the Python interactive window.

![Code cells running in a Python Interactive window](images/jupyter/code-cells-02.png)

You can also run code cells using the **Python: Run Selection/Line in Python Terminal** command (`kbstyle(Shift+Enter)`). After using this command, the Python extension automatically moves the cursor to the next cell. If you're in the last cell in the file, the extension automatically inserts another `#%%` delimiter for a new cell, mimicking the behavior of a Jupyter notebook.

## Connect to a remote Jupyter server

You can offload intensive computation in a Jupyter notebook to other computers by connecting to a remote Jupyter server. Once connected, code cells run on the remote server rather than the local computer.

To connect to a remote Jupyter server:

1. Run the **Python: Specify Jupyter server URI** command from the Command Palette (`kb(workbench.action.showCommands)`).
2. When prompted, provide the server's URI (hostname) with the authentication token included with a `?token=` URL parameter. (If you start the server in the VS Code terminal with an authentication token enabled, the URL with the token typically appears in the terminal output from where you can copy it.)

    ![Prompt to supply a Jupyter server URI](images/jupyter/enter-url-auth-token.png)

3. The Python interactive window indicates where code is run by displaying the URI (which is blurred out in the image below):

    ![The Python interactive window showing that code is running on a remote Jupyter server](images/jupyter/jupyter-running-remotely.png)

## Open Jupyter notebooks

When you've activated an environment with Jupyter installed, you can import a Jupyter notebook file (`.ipynb`) in VS Code as Python code. Once you've imported the file, you can run the code as you would with any other Python file and also use the VS Code debugger. Opening and debugging notebooks in VS Code is a convenient way to find and resolve code bugs, which is difficult to do directly in a Jupyter notebook.

When you open a notebook file, the Python extension prompts you to import the notebook as a Python code file:

![Prompt to import a Jupyter notebook file](images/jupyter/jupyter-prompt.png)

Choose **Import**, wait a few seconds, and then VS Code opens the converted notebook in an untitled file. The notebook's cells are delimited in the Python file with `#%%` comments; Markdown cells are converted wholly to comments preceded with `#%% [markdown]`, and render as HTML in the interactive window alongside code and output such as graphs:

![Jupyter notebook running in VS Code and the Python interactive window](images/jupyter/jupyter-notebook.png)

If you open the file without importing, it appears as plain text.

> **Note:** The first time you run code in a notebook file, the Python extension starts a Jupyter server. It may take some time for the server to start up and for the **Python Interactive** window to appear with the results of the code.

## Export a Jupyter notebook

In addition to opening a Jupyter notebook, you can also use one of the following commands from the Command Palette (`kb(workbench.action.showCommands)`) to export content from VS Code to a Jupyter notebook (with the `.ipynb` extension).

- **Python: Export Current Python File as Jupyter Notebook**: creates a Jupyter notebook from the contents of the current file, using the `#%%` and `#%% [markdown]` delimiters to specify their respective cell types.
- **Python: Export Current Python File and Output as Jupyter Notebook**: creates a Jupyter notebook from the contents of the current file and includes output from code cells.
- **Python: Export Python Interactive window as Jupyter Notebook**: creates a Jupyter notebook from the contents of the Python interactive window.

After exporting the contents, VS Code displays a prompt through whcih you can open the notebook in a browser.
