---
ContentId: efbb70bd-40d6-4bfc-a651-7215a9a69bd2
DateApproved: 11/11/2026
MetaDescription: Understand how projects, language tools, and optional AI fit together in {% data variables.product.prodname_vscode %}, then choose a starting path.
MetaSocialImage: images/overview/vscode-overview.png
---
# Get to know {% data variables.product.prodname_vscode %}

{% data variables.product.prodname_vscode %} is a code editor that brings your project files, development tools, and AI assistance into one environment. You can write code yourself, work alongside an AI assistant, or delegate and coordinate tasks to an agent and review the results.

This introduction explains how these pieces fit together and helps you choose where to start. For installation steps, see [Download and install {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md).

## Your project is the starting point

Your project is a collection of files and folders, not a configuration file stored inside {% data variables.product.prodname_vscode_shortname %}. You can open code you already have or create a folder for a new project.

When you open a folder, it becomes a *workspace*. The editor uses it as the context for finding files, searching code, and applying project settings. The integrated terminal lets you run your project's commands alongside the code. If your project uses Git, source control shows the changes you make.

You can also open an individual file for a quick edit. Opening the project folder is more useful when you need to work across files or run the application. Learn more about how these tools connect in the [core editor overview](/docs/editing/getting-started/overview.md).

## Bring your language and tools

{% data variables.product.prodname_vscode_shortname %} works with your development tools rather than replacing them. Three pieces often work together:

* **The editor** lets you read, write, and organize code.

* **Language support** adds features such as code completion, error checking, and debugging. Some support is built in. Extensions add support for other languages and tools.

* **A runtime or compiler** runs or builds your application. Depending on your language, you install tools such as Python, Node.js, or a C++ compiler separately.

For example, the Python extension connects {% data variables.product.prodname_vscode_shortname %} to Python tooling, but it doesn't include the Python interpreter. Installing the editor and an extension alone isn't enough to run a Python program.

For an existing project, follow its README to install dependencies and find its run and test commands. To create a project, use your language or framework's tools. The setup and commands depend on the project, so start with the guide for your language rather than assuming every project runs the same way.

## Choose how you work

You don't have to choose between using an editor and using AI. Combine approaches as your task changes:

* **Write code directly**: navigate files, edit code, and use your project's tools to run and debug it.

* **Use AI alongside your code**: get suggestions as you type or use the Chat view to collaborate with an AI agent while you code.

* **Delegate and coordinate tasks**: use the Agents window let agents accomplish goals across multiple projects. You can monitor their progress, review their changes, and intervene as needed to ensure the desired outcome.

For example, you might ask an agent to make an initial change, adjust the code yourself, and use the debugger to investigate a problem. You remain responsible for checking the result.

AI is optional. You don't need an account to use the core editor. If you want AI assistance, the [AI overview](/docs/agents/overview.md) explains the workflows and setup options.

## Choose your next step

* **Work on your project**: follow the setup guide for [Python](/docs/python/python-tutorial.md), [Node.js](/docs/nodejs/nodejs-tutorial.md), or [another language](/docs/languages/overview.md).

* **Learn the editor**: follow the [editor tutorial](/docs/editing/getting-started/editor-tutorial.md) to build a sample app without AI.

* **Try an agent**: follow the [agents quickstart](/docs/agents/quickstart.md) to build, validate, and review an app with AI.
