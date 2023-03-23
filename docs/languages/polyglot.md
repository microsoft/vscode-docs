---
Order: 21
Area: languages
TOCTitle: Polyglot
ContentId: 4bbd7ad1-8420-4ddd-a86f-442497e597b1
PageTitle: Polyglot Programming with Notebooks in Visual Studio Code
DateApproved: 3/15/2022
MetaDescription: Polyglot Notebooks for multiple programming languages in Visual Studio Code.
---
# Polyglot Notebooks in VS Code

**What is Polyglot Programming?**

Polyglot programming is the practice of using multiple programming languages to leverage the strength of each language for different tasks.

**What are Notebooks?**

Notebooks are interactive files that allow the mixing of executable code, visualizations, equations, and narrative text. Notebooks are composed of code cells that make it easy to quickly iterate on code. Popularized by the open-source project [Jupyter](https://jupyter.org/), they have become the de facto tool for [Python data science](/docs/datascience/overview.md) and a great resource for teaching or learning a new programming language and quick prototyping.

## Polyglot Notebooks

When polyglot programming meets notebooks, you get Polyglot Notebooks! As opposed to traditional notebooks that are typically used with Python, the [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) extension allows you to use multiple programming languages natively all in the same notebook in Visual Studio Code! No more needing wrapper libraries or magic commands to work with your favorite languages in the same notebook!

![Polyglot Notebooks Extension](images/polyglot/polyglot_ext.png)

### Languages supported

- C#
- F#
- PowerShell
- JavaScript
- HTML
- Mermaid
- SQL
- KQL (Kusto Query Language)

## Features

In addition to executing the code for the languages above, you can take advantage of:

- **Connecting to and querying from** Microsoft SQL Server databases and Kusto clusters.

- **Language server support** such as IntelliSense, autocompletion, and syntax highlighting _for each language_.

- **Variable sharing** between languages that ensures a continuous workflow within the notebook. (Variable sharing not available for HTML and Mermaid)

- **Variable Explorer** to check state of variables and the subkernel variables exist in.

- **Full portability between Jupyter/JupyterLab**.

To learn about all the features, visit the VS Code Marketplace [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) extension.

## Prerequisites

To use Polyglot Notebooks in VS Code, you will need:

- [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) extension
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

### Why do I need the .NET SDK?

The Polyglot Notebooks extension is powered by .NET Interactive, which is a cutting edge and innovative engine built on .NET technology that can run multiple languages and share variables between them. In Polyglot Notebooks, this engine behaves as the notebook's kernel and is the reason that the .NET 7 SDK is required.

## Getting started

1. To create your first polyglot notebook, open the Command Palette (`kb(workbench.action.showCommands)`) and select **Polyglot Notebooks: Create new blank notebook**, select `.ipynb`, and select the language you'd like to start with.

   You can also create a notebook by creating a new file and giving it the extension `.ipynb`. In this case, make sure that **.NET Interactive** is selected as the kernel of the notebook in the top right.

   ![Kernel Picker](images/polyglot/kernel_picker.png)

2. By default, added cells will be the same language as the cell above it. To change the language, select the language picker in the bottom right of the cell.

   ![Cell Language Picker](images/polyglot/language_picker.png)

3. Get coding!

   ![Example of Polyglot Notebook](images/polyglot/polyglot_nb_example.png)

## Working with data

Connect to and query Microsoft SQL Server databases and Kusto clusters.

To get more detailed instructions on connecting to and working with data sources, visit the [Working with Data](https://github.com/dotnet/interactive/blob/main/docs/working-with-data.md) documentation.

![Connecting to SQL Example](images/polyglot/SQL_connection_example.png)

## Language server support

Each language in Polyglot Notebooks gets a first-class editing experience with language server support such as autocompletion, syntax highlighting, and signature help.

## Variable Sharing and Variable Explorer

Share variables between languages using the `#!set` command and check on the values of variables for each language using the Variable explorer. Note that if you were previously using the `#!share` command, it will continue to work. Select the **Variables** icon in the global toolbar to open the Variable explorer.

<video src="images/polyglot/SQLJavaScript.mp4" placeholder="images/polyglot/SQLJavaScript.mp4" autoplay loop controls muted title="Video showing user sharing variables between SQL and JavaScript">
    Sorry, your browser doesn't support HTML 5 video.
</video>

To learn more about variable sharing, visit the [Variable Sharing](https://github.com/dotnet/interactive/blob/main/docs/variable-sharing.md) documentation.

## Feature requests and feedback

The Polyglot Notebooks extension is powered by .NET Interactive and you can provide feedback and enter issues on the [.NET Interactive GitHub repository](https://github.com/dotnet/interactive/issues).
