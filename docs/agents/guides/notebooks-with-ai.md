---
ContentId: 101027aa-e73c-4d1b-a93f-b8ce10e1f946
DateApproved: 9/9/2026
MetaDescription: Create, edit, run, and analyze Jupyter notebooks with AI in {% data variables.product.prodname_vscode %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Work with Jupyter notebooks using AI in {% data variables.product.prodname_vscode_shortname %}

Use AI throughout your notebook workflow. An agent can create a Jupyter notebook, edit and run cells, inspect outputs, and iterate on errors. For focused changes, use inline chat directly in a notebook cell.

This guide shows how to use AI for data analysis in a Jupyter notebook while you review the generated code and control when it runs.

## Prerequisites

* Set up [{% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md).

* Install the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter). To learn how to configure a Python environment and select a kernel, see [Jupyter notebooks in {% data variables.product.prodname_vscode_shortname %}](/docs/datascience/jupyter-notebooks.md).

* Open a [workspace that you trust](/docs/editing/workspaces/workspace-trust.md). Running a notebook cell executes code in the selected kernel and can access workspace files.

## Create a notebook with an agent

Start with the outcome you want instead of specifying individual cells. The agent plans the notebook, creates Markdown and code cells, and can run the code to validate the result.

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) (`kb(workbench.action.chat.open)`) and start a **Local** agent session.

1. Add your data file as context, then describe the analysis and output you want.

    ```prompt
    Create a Jupyter notebook that uses pandas and seaborn to analyze #housing.csv. Clean the data, summarize key metrics, and visualize the price distribution.
    ```

1. Review any requested tool and command approvals before you continue. If the notebook does not have a kernel, follow the prompts to select or create a Python environment.

The agent creates an `.ipynb` file that you can continue to refine in the same session. You can also start your prompt with `/newNotebook` to explicitly request a new Jupyter notebook.

## Iterate by editing and running cells

Agents have notebook-specific tools for understanding the cell structure, editing cells, running code, and reading cell outputs. This edit-run loop lets the agent validate the analysis and respond to runtime errors instead of only generating a static notebook.

Ask the agent to continue from the current notebook:

```prompt
Run the notebook from top to bottom. Fix any errors you find, then explain the main result.
```

You can also request a specific revision:

```prompt
Add a section that identifies outliers, explains how they affect the analysis, and compares the results before and after removing them.
```

Keep the notebook editor open to review cell changes and outputs as the agent works. Configure agent permissions to control which tool and command invocations require approval. Learn more about [agent approvals](/docs/agents/run/approvals.md).

<!-- TODO: Add a screenshot showing an agent editing and running notebook cells in the current UI. -->

## Add notebook context to a prompt

Give the agent notebook-specific context when a request depends on the current kernel state or a cell result.

### Add a kernel variable

With the notebook active, type `#` in the chat input and select a kernel variable from the suggestions. The selected variable becomes available as context for your request.

For example, add the `df` variable and enter:

```prompt
Check this DataFrame for missing values and recommend a cleaning strategy.
```

### Add a cell output

From the cell output toolbar, select **Add Cell Output to Chat** to attach a supported output. You can then ask the agent to explain a chart, diagnose an error, or update the notebook based on the result.

```prompt
Explain the outliers in this chart and update the analysis to investigate them.
```

<!-- TODO: Add a screenshot showing Add Cell Output to Chat in the current notebook UI. -->

## Make focused cell changes with inline chat

Use inline chat when you want to change one cell without starting a broader agent workflow.

1. Place the cursor in a cell or select the code you want to change.

1. Press `kb(inlinechat.start)` and describe the change.

1. Review the suggested diff. Select **Accept and Run** to apply the change and execute the cell in one step.

To generate a new cell, select **Generate** between cells or press `kb(notebook.cell.chat.start)` when a cell editor is not focused. The **Generate** action is experimental and is controlled by the `setting(notebook.experimental.generate)` setting.

<!-- TODO: Add a screenshot showing inline chat editing an existing notebook cell in the current UI. -->

## Follow cell execution (Experimental)

To keep the cell that an agent is running in view, enable the `setting(github.copilot.chat.notebook.followCellExecution.enabled)` setting. After the agent starts to run cells, use the pin action in the notebook toolbar to pause or resume following the current execution.

## Next steps

* [Learn more about Jupyter notebooks in {% data variables.product.prodname_vscode_shortname %}](/docs/datascience/jupyter-notebooks.md)
* [Add context to chat](/docs/chat/copilot-chat-context.md)
* [Explore prompt examples for Jupyter notebooks](/docs/agents/guides/prompt-examples.md#working-with-jupyter-notebooks)
