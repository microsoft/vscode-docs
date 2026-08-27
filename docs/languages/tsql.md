---
ContentId: 5325cf50-e4c7-11e6-bf01-fe55135034f3
DateApproved: 8/19/2026
MetaDescription: Learn about {% data variables.product.prodname_vscode %} editor features (code completion, debugging, snippets, linting) for Transact-SQL.
---
# Transact-SQL in {% data variables.product.prodname_vscode %}

Turn {% data variables.product.prodname_vscode %} into a powerful editor for [Transact-SQL]  (T-SQL) development, with the [mssql] extension available in the {% data variables.product.prodname_vscode_shortname %} Marketplace. The [mssql] extension is optimized to work with SQL Server running on-premises, in any cloud, Azure SQL Database, and Azure SQL Data Warehouse.

Connect to SQL databases, type T-SQL code, execute T-SQL code, view results, and save results as JSON or CSV files. While typing T-SQL code, you get rich T-SQL language features like T-SQL IntelliSense (code completion), syntax highlighting, linting, code navigation and code snippets.

> [Download {% data variables.product.prodname_vscode_shortname %}] - If you haven't downloaded {% data variables.product.prodname_vscode_shortname %} yet, quickly install for your platform (Linux, macOS or Windows).

## Install T-SQL support

Add T-SQL language support to {% data variables.product.prodname_vscode_shortname %} by installing the [mssql] extension from the {% data variables.product.prodname_vscode_shortname %} marketplace as follows:

1. Open the **Extensions** view from {% data variables.product.prodname_vscode_shortname %} Side Bar (`kb(workbench.view.extensions)`).
2. Type "mssql" in the search bar, click **Install**, and reload {% data variables.product.prodname_vscode_shortname %} when prompted.

![install mssql extension](images/tsql/install-mssql.png)

## Connect and Execute T-SQL

Easily connect to SQL Server running on-premises, in any cloud, Azure SQL Database, and Azure SQL Data Warehouse. Then, execute your T-SQL statements and batches to view results and messages - all within {% data variables.product.prodname_vscode_shortname %}. Your recent connections are saved across sessions, so you can quickly connect to your databases again.

<video src="images/tsql/execute.mp4" title="Video showing Execute T-SQL." autoplay loop controls muted></video>

## View and Save Results

View results and messages when you execute your T-SQL code. Save results as a JSON or CSV file to use the data in your applications with just a few clicks.

<video src="images/tsql/save.mp4" title="Video showing Save T-SQL." autoplay loop controls muted></video>

## T-SQL IntelliSense

As you type T-SQL code in the editor, {% data variables.product.prodname_vscode_shortname %} provides intelligent code completion for T-SQL keywords, suggestions for schema object names (tables, columns, views), and parameter help for functions and procedures when connected to a database.

<video src="images/tsql/intellisense.mp4" title="Video showing tsql intellisense." autoplay loop controls muted></video>

## Linting

Linting is the analysis of your T-SQL code for potential syntax errors. Use {% data variables.product.prodname_vscode %} to quickly navigate to the errors and warnings in your T-SQL code as you type.

<video src="images/tsql/linting.mp4" title="Video showing tsql linting." autoplay loop controls muted></video>

## Peek Definition/Go to Definition

Use **Peek Definition** or **Go to Definition** to quickly browse the definition of schema objects in your database such as tables, functions, and procedures while typing T-SQL code.

<video src="images/tsql/peekdefinition.mp4" title="Video showing tsql peek definition." autoplay loop controls muted></video>

## Snippets

T-SQL snippets provide code templates for commonly used T-SQL statements. Type "sql" to get the list of T-SQL snippets.

<video src="images/tsql/snippets.mp4" title="Video showing tsql snippets." autoplay loop controls muted></video>

## Next steps

* Download the free [SQL Server 2017 Developer Edition].
* Install the [mssql] extension from the {% data variables.product.prodname_vscode %} Marketplace.
* [Build an app] using SQL Server - Get started with SQL Server on macOS, Linux, and Windows using your favorite programming language.
* Contribute to the mssql extension on [GitHub]. Submit a bug report or a feature suggestion on our [GitHub Issue Tracker].

## Further Reading

* [SQL Server documentation]
* [SQL Server on Linux documentation]
* [SQL Server Blog]

[Build an app]: https://aka.ms/sqldev
[Download {% data variables.product.prodname_vscode_shortname %}]: https://code.visualstudio.com/download
[GitHub]: https://github.com/microsoft/vscode-mssql
[GitHub Issue Tracker]: https://github.com/microsoft/vscode-mssql/issues
[mssql]: https://aka.ms/mssql-marketplace
[SQL Server 2017 Developer Edition]: https://www.microsoft.com/sql-server/sql-server-downloads
[SQL Server Blog]: https://blogs.technet.microsoft.com/dataplatforminsider/
[SQL Server documentation]: https://learn.microsoft.com/sql/sql-server
[SQL Server on Linux documentation]: https://learn.microsoft.com/sql/linux/sql-server-linux-overview/
[Transact-SQL]: https://learn.microsoft.com/sql/t-sql/language-reference
