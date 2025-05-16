---
ContentId: 2f21c45a-8931-4da2-a921-af23a3b92949
DateApproved: 05/08/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to set up debugging configurations and fix issues during debugging.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Debug with GitHub Copilot

GitHub Copilot can help improve your debugging workflow in Visual Studio Code. Copilot can assist with the setup of the debug configuration for your project and provide suggestions for fixing issues discovered during debugging. This article gives an overview of how to use Copilot for debugging applications in VS Code.

Copilot can help with the following debugging tasks:

* **Configure debug settings**: generate and customize launch configurations for your project.
* **Start a debugging session**: use `copilot-debug` to start a debugging session from the terminal.
* **Fix issues**: receive suggestions for fixing issues discovered during debugging.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up debug configuration with Copilot

VS Code uses the `launch.json` file to store [debug configuration](/docs/debugtest/debugging-configuration.md). Copilot can help you create and customize this file to set up debugging for your project.

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

Learn more about [debugging in VS Code](/docs/debugtest/debugging.md).

## Fix coding issues with Copilot

You can use Copilot Chat to help you fix coding issues or improve your code.

### Use chat prompts

1. Open your application code file.

1. Open one of these views:
    * Copilot Edits (`kb(workbench.action.chat.openEditSession)`)
    * Chat view (`kb(workbench.action.chat.open)`)
    * Inline Chat (`kb(inlineChat.start)`)

1. Enter a prompt like:
    * "/fix"
    * "Fix this #selection"
    * "Validate input for this function"
    * "Refactor this code"
    * "Improve the performance of this code"

Learn more about using [Copilot Chat](/docs/copilot/chat/copilot-chat.md) and [Copilot Edits](/docs/copilot/chat/copilot-edits.md) in VS Code.

### Use editor smart actions

To fix coding issues for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Fix**.

    Copilot provides a code suggestion to fix the code.

1. Optionally, refine the generated code by providing additional context in the chat prompt.

## Next steps

* Explore [general debugging features in VS Code](/docs/debugtest/debugging.md).
* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).
