# Polyglot Notebooks

## What is Polyglot Programming?

Polyglot programming is the practice of using multiple programming languages to leverage the strength of each language for different tasks.

## What are Notebooks?
Notebooks are interactive files that allow the mixing of executable code, visualizations, equations and narrative text. Notebooks are composed of code cells that make it easy to quickly iterate on code. Created and popularized by the open-source project [Jupyter](https://jupyter.org/), they have become the de facto tool for data science and a great resource for teaching or learning a new programming language and quick prototyping.



## Polyglot Notebooks

When polyglot programming meets notebooks, you get Polyglot Notebooks! As opposed to traditional notebooks that are typically used with Python, the [Polyglot Notebooks Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) allows you to use multiple programming languages natively all in the same notebook! No more needing wrapper libraries or magic commands to work with your favorite languages in the same notebook!

![Polyglot Notebooks Extension](images/polyglot/polyglot_ext.png)

### Languages Supported
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

- **Connecting to and querying from** Microsoft SQL Server databases and Kusto clusters

- **Language server support** such as intellisense, autocompletion, and syntax highlighting _for each language_

- **Variable sharing** between languages that ensures a continuous workflow within the notebook

    *Variable sharing not available for HTML and Mermaid

- **Variable Explorer** to check state of variables and which subkernel variables exist in

- **Full portability between Jupyter/JupyterLab**

To learn about all the features, visit the VS Code Marketplace [Polyglot Notebooks Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode).

## Prerequisites

To use Polyglot Notebooks in VS Code you will need:

- [Polyglot Notebooks Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode)
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

### Why do I need the .NET SDK?

Polyglot Notebooks is powered by .NET Interactive which is a cutting edge and innovative engine built on .NET technology that can run multiple languages and share variables between them. In Polyglot Notebooks, this engine behaves as the notebooks kernel and is the reason the .NET 7 SDK is required at this time.

## Getting Started

1. To create your first polyglot notebook, open the command palette (_Ctrl+Shift+P on Windows, Cmd+Shift+P on iOS_) and select `Polyglot Notebooks: Create new blank
notebook`, select `.ipynb`, and select the language you'd like to start with.

    You can also create a notebook by creating a new file and giving it the extension `.ipynb`. In this case, make sure that .NET Interactive is selected as the kernel of the notebook in the top right.

![Kernel Picker](images/polyglot/kernel_picker.png)


2. By default, added cells will be the same language as the cell above it. To change the language, click the language picker in the bottom right of the cell.

![Cell Language Picker](images/polyglot/language_picker.png)

3. Get coding!

![Example of Polyglot Notebook](images/polyglot/polyglot_nb_example.png)

## Working with Data

Connect to and query Microsoft SQL Server databases and Kusto clusters.

To get more detailed instructions on connecting to and working with data sources, visit our [Working with Data documentation](https://github.com/dotnet/interactive/blob/main/docs/working-with-data.md).


![Connecting to SQL Example](images/polyglot/SQL_connection_example.png)

## Language Server Support

Each language in Polyglot Notebooks gets a first-class editing experience with language server support such as autocompletion, syntax highlighting, and signature help.


## Variable Sharing & Variable Explorer

Share variables between languages using the `#!share` magic command and check on the values of variables for each language using the variable explorer. Simply click the `Variables` icon in the global toolbar to open the variable explorer.

![SQLJavaScript](images/polyglot/SQLJavaScript.mp4)

To learn more about variable sharing, visit our [Variable Sharing documentation](https://github.com/dotnet/interactive/blob/main/docs/variable-sharing.md).

## Features Requests & Features
Since Polyglot Notebooks is powered by .NET Interactive, you can continue to provide feedback and file issues on our [.NET Interactive GitHub Repository](https://github.com/dotnet/interactive/issues).


