---
ContentId: 9f3c7e21-6b48-4d5a-a097-2e1c8f64b3d9
DateApproved: 8/12/2026
MetaDescription: Build a web app with an AI agent in VS Code, then review the code and use browser tools to validate the result.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Quickstart: Complete your first task with an agent

In this quickstart, you use an AI agent in Visual Studio Code to build a small web app from a natural-language prompt. You can work in the **Agents window** for an agent-first experience or use the **Chat view** alongside your code. You then review the generated code and use browser tools to let the agent validate the app.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Build a complete app with agents">
Follow a hands-on tutorial to build and refine an app with agents in VS Code.

* [Start agents tutorial](/docs/agents/agents-tutorial.md)

</div>

## Prerequisites

* [Download and install Visual Studio Code](/download).
* [Set up AI in VS Code](/docs/setup/copilot.md).

## Create a project folder

On your computer, create an empty folder named `agent-quickstart`. The agent creates all the files for the app in this folder.

## Build the app

Choose where you want to work with the agent. Both options create the same app and give you access to the same session.

{% tabs id="agent-surface" %}
{% tab label="Agents window" %}

The **Agents window** (Preview) is a dedicated window for assigning tasks and monitoring agents across your projects.

1. In VS Code, select **Open in Agents** in the title bar.

    You can also run **Chat: Open Agents Window** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **New** at the top of the sidebar.

1. From the workspace dropdown, select the `agent-quickstart` folder.

    If VS Code asks whether you trust the folder, select **Yes, I trust the authors**.

1. Select the **Copilot** agent harness and the **Agent** role. Keep **Default Approvals** selected so that VS Code asks before the agent runs actions that require approval.

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review any approval requests before you accept them.

{% /tab %}
{% tab label="Chat view" %}

The **Chat view** keeps the agent beside your editor, which is useful when you want to inspect and work with the generated code.

1. In VS Code, select **File** > **Open Folder**, and then open the `agent-quickstart` folder.

    If VS Code asks whether you trust the folder, select **Yes, I trust the authors**.

1. Open the Chat view with `kb(workbench.action.chat.open)`, and then select **New Chat** (`+`).

1. Select the **Copilot** agent harness and the **Agent** role. Keep **Default Approvals** selected so that VS Code asks before the agent runs actions that require approval.

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review any approval requests before you accept them.

{% /tab %}
{% /tabs %}

The agent creates `index.html` and reports when the task is complete.

## Review and validate the result

AI-generated code can contain mistakes. Review the code, ask the agent to validate the app in the integrated browser, and manually confirm the result before you keep it.

{% tabs id="agent-surface" %}
{% tab label="Agents window" %}

1. Open the **Changes** panel and select `index.html` to review the generated code.

1. Select **Customizations** > **Tools** and verify that **Integrated Browser** is selected.

1. Enter the following prompt:

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Review the agent's tool calls, code changes, and verification report.

1. In the **Files** panel, right-click `index.html`, and then select **Open in Integrated Browser**. Manually try the task flow to confirm the result.

{% /tab %}
{% tab label="Chat view" %}

1. Select `index.html` in the agent response to review the generated code and its diff.

1. In the Chat view, select **Open Customizations** (gear icon) > **Tools** and verify that **Integrated Browser** is selected.

1. Enter the following prompt:

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Review the agent's tool calls, code changes, and verification report.

1. Open `index.html` from the Explorer, and then select **Open in Integrated Browser** in the editor title bar. Manually try the task flow to confirm the result.

{% /tab %}
{% /tabs %}

You have completed your first task with an agent. The agent interpreted your goal, created the code, exercised the app in the browser, and fixed any issues it found. You stayed in control through approvals, code review, and final validation.

## Continue in the other surface

The Agents window and Chat view share the same agent sessions, so you can switch between them without losing the conversation.

* From the Agents window, select **Open in Editor** in the title bar. VS Code opens the project in an editor window with the session available in the Chat view.

* From the Chat view, select **Open in Agents** in the title bar. The Agents window opens with the same session selected.

## Next steps

* [Build a complete app with agents](/docs/agents/agents-tutorial.md).
* [Learn how agents use browser tools](/docs/agents/run/browser-tools.md).
* [Learn more about agents in VS Code](/docs/agents/concepts/agents.md).
