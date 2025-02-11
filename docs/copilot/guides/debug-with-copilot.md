---
Order: 1
Area: copilot
TOCTitle: Debug with Copilot
ContentId: 2f21c45a-8931-4da2-a921-af23a3b92949
PageTitle: Debugging with GitHub Copilot in Visual Studio Code
DateApproved: 02/06/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to set up debugging configurations and fix issues during debugging.
---

# Debug with GitHub Copilot

GitHub Copilot can help streamline your debugging workflow in Visual Studio Code by assisting with debug configuration setup and providing intelligent suggestions for fixing issues discovered during debugging. This article shows you how to use Copilot's debugging capabilities to make your debugging sessions more productive.

Copilot can help with the following debugging tasks:

* **Configure debug settings**: Generate and customize launch configurations for your project
* **Start debugging sessions**: Set up and initiate debugging with the right configuration
* **Fix runtime issues**: Get suggestions for fixing problems found during debugging
* **Handle edge cases**: Identify and fix edge cases that cause errors
* **Improve error handling**: Add better error handling based on debugging sessions

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up debug configuration

You can use Copilot to help create and customize your debug configuration:

1. Open the Chat view (`kb(workbench.action.chat.open)`)
2. Enter the `/startDebugging` command
3. Follow Copilot's guidance to set up debugging for your project

Alternatively, you can use a natural language prompt like:
- "Create a debug configuration for a Django app"
- "Set up debugging for a React Native app"
- "Configure debugging for a Flask application"

Add `#codebase` to your prompt to give Copilot context about your project: "Set up debugging for this project #codebase"

## Start debugging with Copilot

Copilot provides several ways to start debugging your application:

### Use the terminal command

1. Open the integrated terminal
2. Enter `copilot-debug` followed by your application's start command
   ```bash
   copilot-debug node app.js
   # or
   copilot-debug python manage.py runserver
   ```

Copilot will configure and start a debugging session automatically.

### Use chat prompts

1. Open the Chat view (`kb(workbench.action.chat.open)`)
2. Enter a prompt like:
   - "Debug this file"
   - "Start debugging with these environment variables"
   - "Debug with breakpoint at function X"

## Fix issues during debugging

When you encounter issues during debugging, Copilot can help:

1. Open the Chat view
2. Enter the `/fix` command or use a natural language prompt
3. Describe the issue you're seeing
4. Review and apply Copilot's suggested fixes

You can also use the editor context menu:
1. Right-click on the error in your code
2. Select **Copilot** > **Fix**
3. Choose from the suggested solutions

## Debug configuration tips

To get better results when using Copilot for debugging:

* Provide context about your runtime environment
* Specify any special launch requirements
* Mention specific debugging features you need (like source maps or network requests)
* Include details about environment variables or configuration files

## Personalize debugging assistance

You can customize how Copilot assists with debugging by providing special instructions:

* Set preferred debug configuration patterns
* Define environment-specific settings
* Configure compound debug configurations
* Specify logging preferences

Learn more about [personalizing Copilot](/docs/copilot/copilot-customization.md).

## Next steps

* Learn about [general debugging in VS Code](/docs/editor/debugging.md)
* Explore language-specific debugging for [Node.js](/docs/nodejs/nodejs-debugging.md), [Python](/docs/python/debugging.md), or [Java](/docs/java/java-debugging.md)
* Check out the [debugging features in VS Code](/docs/editor/debugging.md#debug-actions)
