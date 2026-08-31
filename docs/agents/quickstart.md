---
ContentId: 9f3c7e21-6b48-4d5a-a097-2e1c8f64b3d9
DateApproved: 9/2/2026
MetaDescription: Build a web app with an AI agent in {% data variables.product.prodname_vscode_shortname %}, then review the code and use browser tools to validate the result.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Quickstart: Complete your first task with an agent

In this quickstart, you use an AI agent in {% data variables.product.prodname_vscode %} to build a small web app from a natural-language prompt. You can work in the **{% data variables.copilot.agents_window %}** for an agent-first experience or use the **{% data variables.copilot.chat_view %}** alongside your code. You then review the generated code and use browser tools to let the agent validate the app.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Build a complete app with agents">
Follow a hands-on tutorial to build and refine an app with agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agents tutorial](/docs/agents/agents-tutorial.md)

</div>

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download).
* [Set up AI in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md).

## Create a project folder

You will create a project folder for the quickstart app on your computer. You will open this folder in {% data variables.product.prodname_vscode_shortname %} to work with the agent.

Run the following command in your terminal to create the folder:

```bash
mkdir agent-quickstart
```

## Build the app

Depending on your workstyle, you can choose to work with agents in the **{% data variables.copilot.agents_window %}** or the **{% data variables.copilot.chat_view %}**. Both options create the same app and give you access to the same session.

{% tabs id="agent-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

The **{% data variables.copilot.agents_window %}** (Preview) is a dedicated window for assigning (high-level) tasks to agents across all your projects.

1. In {% data variables.product.prodname_vscode_shortname %}, select **Open in Agents** in the title bar.

    ![Screenshot of opening the {% data variables.copilot.agents_window %} in {% data variables.product.prodname_vscode_shortname %}.](images/agents-quickstart/open-agents-window.png)

    You can also run **Chat: Open {% data variables.copilot.agents_window %}** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **New** at the top of the left sidebar.

1. Select **Folder**, and then select the `agent-quickstart` folder you just created. This folder becomes the primary execution workspace for the session.

    ![Screenshot of selecting the agent-quickstart folder as the primary workspace in the redesigned new-session input.](images/agents-quickstart/agent-session-select-folder-2.png)

    If {% data variables.product.prodname_vscode_shortname %} asks whether you trust the folder, select **Trust**.

1. Select the **Copilot** agent harness and the **Agent** role. Keep **Manual Permissions** selected so that {% data variables.product.prodname_vscode_shortname %} asks before the agent runs actions that require approval.

    ![Screenshot of selecting the Copilot agent harness, Agent role, and Manual Permissions in the redesigned new-session input.](images/agents-quickstart/agent-session-select-harness-role-2.png)

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review any approval requests before you accept them.

    The agent will create the `index.html` file and update it as it progresses through the task list web app creation. To perform specific actions, the agent requests your approval.

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

The **{% data variables.copilot.chat_view %}** lets you work with agents alongside your editor within a specific project. This approach is useful for coding tasks where agents assist you in real-time while you develop your code.

1. In {% data variables.product.prodname_vscode_shortname %}, select **File** > **Open Folder** from the menu, and then open the `agent-quickstart` folder.

    If {% data variables.product.prodname_vscode_shortname %} asks whether you trust the folder, select **Manage** from the notification, and then select **Trust**.

    ![Screenshot of trusting the folder in {% data variables.product.prodname_vscode_shortname %}.](images/agents-quickstart/editor-trust-folder.png)

1. Open the {% data variables.copilot.chat_view %} with `kb(workbench.action.chat.open)`, and then select **New Chat** (`+`).

    ![Screenshot of opening a new chat in the Copilot {% data variables.copilot.chat_view %}.](images/agents-quickstart/editor-new-chat.png)

1. Select the **Copilot** agent harness and the **Agent** role. Keep **Manual Permissions** selected so that {% data variables.product.prodname_vscode_shortname %} asks before the agent runs actions that require approval.

    ![Screenshot of selecting the Copilot agent harness and the Agent role with Manual Permissions.](images/agents-quickstart/agent-session-editor-select-harness-role.png)

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review any approval requests before you accept them.

    The agent will create the `index.html` file and update it as it progresses through the task list web app creation. To perform specific actions, the agent requests your approval.

{% /tab %}
{% /tabs %}

## Review and validate the result

It's important to review the generated code and outcome carefully. You can let the agent validate key scenarios and edge cases for you by running the app in the integrated browser and observing its behavior.

Notice that the agent might have launched the integrated browser to validate that the app runs correctly as part of creating the task list web app in the previous steps.

In the following steps you'll ask the agent to validate the basic functionality of the task list web app.

{% tabs id="agent-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

1. Open the **Changes** panel in the right sidebar (`kb(workbench.view.agentSessions.changesContainer)`) and select `index.html` to review the generated code.

    If you're not happy with a specific part of the, select it in the diff view and enter feedback to send it to the agent.

    ![Screenshot of reviewing the generated code in the Changes panel.](images/agents-quickstart/review-changes-panel.png)

1. Now, enter the following prompt to have the agent open the app in the integrated browser and validate its functionality.

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Notice how the agent interacts with the integrated browser and validates the user scenarios.

    ![Screenshot of the integrated browser validating the app.](images/agents-quickstart/integrated-browser-validation.png)

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

1. Select `index.html` in the agent response to review the generated code and its diff.

1. Now, enter the following prompt to have the agent open the app in the integrated browser and validate its functionality.

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Notice how the agent interacts with the integrated browser and validates the user scenarios.

    ![Screenshot of the integrated browser validating the app.](images/agents-quickstart/editor-integrated-browser-validation.png)

{% /tab %}
{% /tabs %}

You have completed your first task with an agent. The agent interpreted your goal, created the code, exercised the app in the browser, and fixed any issues it found. You stayed in control through approvals, code review, and final validation.

## Continue in the other surface

The {% data variables.copilot.agents_window %} and {% data variables.copilot.chat_view %} share the same agent sessions, so you can switch between them without losing the conversation.

* From the {% data variables.copilot.agents_window %}, select **Open in Editor** in the title bar. {% data variables.product.prodname_vscode_shortname %} opens the project in an editor window with the session available in the {% data variables.copilot.chat_view %}.

* From the {% data variables.copilot.chat_view %}, select **Open in Agents** in the title bar. The {% data variables.copilot.agents_window %} opens with the same session selected.

## Clean up resources

When you no longer need the app, run these steps to clean up your local resources:

* Close the `agent-quickstart` folder in {% data variables.product.prodname_vscode_shortname %}.
* Delete the `agent-quickstart` folder from your computer.

## Next steps

* [Build a complete app with agents](/docs/agents/agents-tutorial.md).
* [Learn how agents use browser tools](/docs/agents/run/browser-tools.md).
* [Learn more about agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/concepts/agents.md).
