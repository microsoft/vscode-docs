---
Order: 17
Area: languages
TOCTitle: T-SQL
ContentId: 5325cf50-e4c7-11e6-bf01-fe55135034f3
PageTitle: Transact-SQL with Visual Studio Code
DateApproved: 1/24/2017
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Transact-SQL.
---
# Transact-SQL in Visual Studio Code

Turn Visual Studio Code into a powerful editor for [Transact-SQL]  (T-SQL) development, with the [mssql] extension available in the VS Code Marketplace. The [mssql] extension is optimized to work with SQL Server running on-premises, in any cloud, Azure SQL Database, and Azure SQL Data Warehouse.

Connect to SQL databases, type T-SQL code, execute T-SQL code, view results, and save results as JSON or CSV files. While typing T-SQL code, you get rich T-SQL language features like T-SQL IntelliSense (code completion), syntax highlighting, linting, code navigation and code snippets.

> [Download VS Code] - If you haven't downloaded VS Code yet, quickly install for your platform (Linux, macOS or Windows).

## Install T-SQL support

Add T-SQL language support to VS Code by installing the [mssql] extension from the VS Code marketplace as follows:

1. Open the **Extensions** view from VS Code Side Bar (`kb(workbench.view.extensions)`).
2. Type "mssql" in the search bar, click **Install**, and reload VS Code when prompted.

![install mssql extension](images/tsql/install-mssql.png)

## Connect and Execute T-SQL

Easily connect to SQL Server running on-premises, in any cloud, Azure SQL Database, and Azure SQL Data Warehouse. Then, execute your T-SQL statements and batches to view results and messages - all within VS Code. Your recent connections are saved across sessions, so you can quickly connect to your databases again.

![Execute T-SQL](images/tsql/execute.gif)

## View and Save Results

View results and messages when you execute your T-SQL code. Save results as a JSON or CSV file to use the data in your applications with just a few clicks.

![Save T-SQL](images/tsql/save.gif)

## T-SQL IntelliSense

As you type T-SQL code in the editor, VS Code provides intelligent code completion for T-SQL keywords, suggestions for schema object names (tables, columns, views), and parameter help for functions and procedures when connected to a database.

![tsql intellisense](images/tsql/intellisense.gif)

## Linting

Linting is the analysis of your T-SQL code for potential syntax errors. Use Visual Studio Code to quickly navigate to the errors and warnings in your T-SQL code as you type.

![tsql linting](images/tsql/linting.gif)

## Peek Definition/Go to Definition

Use **Peek Definition** or **Go to Definition** to quickly browse the definition of schema objects in your database such as tables, functions, and procedures while typing T-SQL code.

![tsql peek definition](images/tsql/peekdefinition.gif)

## Snippets

T-SQL snippets provide code templates for commonly used T-SQL statements. Type "sql" to get the list of T-SQL snippets.

![tsql snippets](images/tsql/snippets.gif)

## Next steps

* Download the free [SQL Server 2017 Developer Edition].
* Install the [mssql] extension from the Visual Studio Code Marketplace.
* [Build an app] using SQL Server - Get started with SQL Server on macOS, Linux, and Windows using your favorite programming language.
* Contribute to the mssql extension on [GitHub]. Submit a bug report or a feature suggestion on our [GitHub Issue Tracker].

## Further Reading

* [SQL Server documentation]
* [SQL Server on Linux documentation]
* [SQL Server Blog]

[Transact-SQL]: https://learn.microsoft.com/sql/t-sql/language-reference
[mssql]: https://aka.ms/mssql-marketplace
[Download VS Code]: https://code.visualstudio.com/download
[SQL Server 2017 Developer Edition]: https://www.microsoft.com/sql-server/sql-server-downloads
[Build an app]: https://aka.ms/sqldev
[SQL Server documentation]: https://learn.microsoft.com/sql/sql-server
[SQL Server on Linux documentation]: https://learn.microsoft.com/sql/linux/sql-server-linux-overview/
[SQL Server Blog]: https://blogs.technet.microsoft.com/dataplatforminsider/
[GitHub]: https://github.com/microsoft/vscode-mssql
[GitHub Issue Tracker]: https://github.com/microsoft/vscode-mssql/issues
