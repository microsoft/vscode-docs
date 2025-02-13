---
ContentId: 2f21c45a-8931-4da2-a921-af23a3b92949
PageTitle: Debugging with GitHub Copilot in Visual Studio Code
DateApproved: 02/06/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to set up debugging configurations and fix issues during debugging.
---

# Debug with GitHub Copilot

GitHub Copilot can help streamline your debugging workflow in Visual Studio Code by assisting with debug configuration setup and providing suggestions for fixing issues discovered during debugging. This article shows you how to use Copilot's debugging capabilities to make your debugging sessions more productive.

Copilot can help with the following debugging tasks:

* **Configure debug settings**: Generate and customize launch configurations for your project.
* **Start a debugging session**: Set up and initiate debugging with the right configuration.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up debug configuration

VS Code uses a `launch.json` file to store [debug configuration](/docs/editor/debugging.md#launch-configurations). Copilot can help you create and customize this file to set up debugging for your project.

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Enter the `/startDebugging` command.
1. Follow Copilot's guidance to set up debugging for your project.

Alternatively, you can use a natural language prompt like:

* "Create a debug configuration for a Django app"
* "Set up debugging for a React Native app"
* "Configure debugging for a Flask application"

## Start debugging with Copilot

The `copilot-debug` terminal command simplifies the process of configuring and starting a debugging session. Prefix the command you'd use for starting your application with `copilot-debug` to have Copilot automatically configure and start a debugging session.

1. Open the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`).

1. Enter `copilot-debug` followed by your application's start command. For example:

    ```bash
    copilot-debug node app.js
    ```

    or

    ```bash
    copilot-debug python manage.py
    ```

1. Copilot launches a debugging session for your application. You can now use the built-in debugging features in VS Code.

## Next steps

* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).
* Explore [general debugging features in VS Code](/docs/editor/debugging.md).
