---
ContentId: efbb70bd-40d6-4bfc-a651-7215a9a69bd2
DateApproved: 11/25/2026
MetaDescription: Explore {% data variables.product.prodname_vscode %} as a code editor for any language with built-in AI, and choose how to start working.
MetaSocialImage: images/overview/vscode-overview.png
---
# Get to know {% data variables.product.prodname_vscode %}

{% data variables.product.prodname_vscode %} is a code editor for any language. Language support, an integrated terminal, a debugger, Git source control, and extensions help you write, run, and debug your project in one place.

AI is built in when you want it. Get suggestions as you type, work with an agent in chat, or delegate tasks to agents across workspaces. Use as much or as little AI as suits your task.

This introduction explains these ways of working and helps you choose where to start. For installation steps, see [Download and install {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md).

## Choose how you work

Combine approaches and switch between them as your task changes:

* **Write code directly**: navigate files, edit and refactor code, and use your project's tools to run, test, and debug it.

* **Get AI help as you code**: accept [inline suggestions](/docs/editing/ai-powered-suggestions.md) as you type, or use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) to ask questions and work with an agent that edits code and runs tests.

* **Delegate tasks to agents**: use the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) to assign tasks across workspaces, monitor progress, and review results.

You don't need an account to use the core editor.

## A full code editor

Open an individual file for a quick edit, or open a project folder as a *workspace*. A workspace gives the editor context for finding files, searching code, and applying project settings. The integrated terminal runs your project's commands alongside the code, and source control shows your changes if the project uses Git.

{% data variables.product.prodname_vscode_shortname %} works with your development tools rather than replacing them. Three pieces often work together:

* **The editor** lets you read, write, navigate, and refactor code.

* **Language support** adds features such as code completion, error checking, and debugging. Some support is built in, and extensions add support for other languages and tools.

* **A runtime or compiler** runs or builds your application. Install tools such as Python, Node.js, or a C++ compiler separately. For example, the Python extension doesn't include the Python interpreter.

For an existing project, follow its README to install dependencies and find its run and test commands. To create a project, use your language or framework's tools. The same debugging, testing, and source control tools also help you review changes made with AI. Learn more in the [core editor overview](/docs/editing/getting-started/overview.md).

## Work with AI agents

An AI agent uses a model and tools to read and edit files and run commands or tests to complete a task. For example, ask an agent to add form validation and run your project's tests. You choose which actions need your approval, can steer or stop the agent, and decide which changes to keep.

The {% data variables.copilot.agents_window %} lists agent sessions from multiple workspaces, so you can run independent tasks in parallel and review their changes in one place. Sessions don't yet support multi-root workspaces. When available to your account, an experimental cloud session `feature(cloud-sessions)` continues working while your computer is offline.

AI providers and agent harnesses have their own requirements, and your organization might restrict the available agents, models, or tools. To get started, see the [AI overview](/docs/agents/overview.md).

## Choose your next step

* **Work on your project**: follow the setup guide for [Python](/docs/python/python-tutorial.md), [Node.js](/docs/nodejs/nodejs-tutorial.md), or [another language](/docs/languages/overview.md).

* **Learn the editor**: follow the [editor tutorial](/docs/editing/getting-started/editor-tutorial.md) to build a sample app without AI.

* **Try an agent**: follow the [agents quickstart](/docs/agents/quickstart.md) to build, validate, and review an app with AI.
