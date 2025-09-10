---
ContentId: 101027aa-e73c-4d1b-a93f-b8ce10e1f946
DateApproved: 09/11/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to edit Jupyter notebooks with AI.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Edit Jupyter notebooks with AI in VS Code

Visual Studio Code supports working with [Jupyter notebooks](/docs/datascience/jupyter-notebooks.md) natively, and through [Python code files](/docs/python/jupyter-support-py.md). The AI features in VS Code can help you in creating and editing notebooks, as well as analyzing and visualizing data. In this article, you learn how to use the AI features in VS Code to work with Jupyter notebooks.

## Scaffold a new notebook

To accelerate getting started with a new notebook, you can use the AI features in VS Code to scaffold a new notebook. Use natural language to provide details about what functionality you want to add and which libraries you want to use.

To create a new notebook with AI, choose either of these options:

* Type the `/newNotebook` slash command in the chat input box, followed by the details of the notebook to create.

    Example prompts:

    * `/newNotebook use pandas and seaborn to read and visualize the titanic dataset. Show key information from the dataset.`
    * `/newNotebook /newNotebook analyze the data in the housing.csv file`

* Switch to [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent), and type a natural language prompt asking to create a new notebook.

    Example prompts:

    * `Create a notebook to read data from #housing.csv and plot the distribution of prices`
    * `Create a Jupyter notebook to read data from #housing.csv. Run all cells.`

The following screenshot shows how the output from agent mode to the prompt *Create a Jupyter notebook to read data from #housing.csv* (you can get this dataset from [Kaggle](https://www.kaggle.com/search?q=housing+dataset+in%3Adatasets)):

![Screenshot that shows a new notebook created by agent mode that reads the 'housing.csv' file in the workspace.](images/notebooks-with-ai/agent-mode-create-new-notebook.png)

Notice that a new `.ipynb` file is created, which contains Markdown and code cells for reading the CSV file and displaying the first few rows of the data.

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Make inline edits in notebook cells

If you already have a notebook and want to make some inline changes in a cell, you can use inline chat, like you would in a code file.

To make inline edits in a cell, press `kb(notebook.cell.chat.start)`. This opens the inline chat view, where you can enter your prompt.

> [!TIP]
> You can reference kernel variables in your chat prompt. Type `#` followed by the variable name to reference it. For example, if you have a variable named `df`, you can type `#df` in your chat prompt to reference it.

![Screenshot that shows the inline chat view in a notebook cell.](images/notebooks-with-ai/notebook-inline-chat.png)

When the response is generated, notice that the code is updated in the notebook cell. You can **Accept** the changes and decide to **Accept and Run** the cell changes.

To generate a new cell with AI, select the **Generate** button in the notebook view, or don't focus on a cell and press `kb(notebook.cell.chat.start)` to open the inline chat view for a new cell.

## Make edits across multiple cells

To make larger edits, across multiple cells, you can switch to [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) in the Chat view. Provide a prompt to request changes to the notebook and agent mode will iterate through the tasks to implement the changes.

Example prompts:

* *Plot a graph of the price distribution*
* *Make sure the data is cleaned before visualizing and processing it*
* *Show the correlation between different features in the dataset*
* *Use matplotlib instead of seaborn to plot the data*
* *Remove the display of dataset information*

![Screenshot that shows the response from agent mode to the prompt 'Plot a graph of the price distribution'.](images/notebooks-with-ai/notebook-agent-mode-plot-prices.png)

Notice that you can use the overlay controls to navigate between the different edit suggestions, and to keep or undo the changes.

## Ask questions about notebook content

You can use the chat interface to ask questions about the content of your notebook. This is useful for getting explanations of code, data, or visualizations. You can add extra context to your chat request, such as the cell output, graphs, or errors.

The following example shows how to ask questions about a visualization in a notebook.

1. Select `...` next to the graph, and select **Add Cell Output to Chat** to add the chart as context to your chat request.

    ![Screenshot that shows the context menu for a graph in a notebook cell.](images/notebooks-with-ai/notebook-ask-mode-add-cell-output.png)

1. Enter the prompt *Explain this chart* in the chat input field.

    Notice that you get a detailed explanation of the chart.

    ![Screenshot that shows the response from chat to the prompt 'Explain this chart'.](images/notebooks-with-ai/notebook-ask-mode-explain-chart.png)

## Perform data analysis and visualization

You can do a full data analysis and visualization notebook of a dataset by using agent mode in chat. Agent mode analyzes the dataset, and then scaffolds a new notebook, implements the code for performing the data analysis, and runs the cells to process and visualize the data. As needed, agent mode invokes relevant tools and terminal commands to complete its tasks.

For example, to perform a data analysis of the housing dataset:

1. Open [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) in chat.

1. Enter the following prompt in the chat input field: *Perform data analysis of the data in #housing.csv*.

    Notice that agent mode iterates through the different tasks. When needed, approve the tool and command invocations.

1. The result is a new notebook with a complete data analysis of the dataset, including data cleaning, data visualization, and statistical analysis.

    ![Screenshot that shows the response from agent mode to the prompt 'Perform data analysis of the data in housing.csv'.](images/notebooks-with-ai/notebook-agent-mode-data-analysis.png)

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Next steps

* [Learn more about Jupyter notebooks in VS Code](/docs/datascience/jupyter-notebooks.md)
* [Learn more about the AI features in VS Code](/docs/copilot/overview.md)
* [Learn more about chat in VS Code](/docs/copilot/chat/copilot-chat.md)
