---
ContentId: 9f3c7e21-6b48-4d5a-a097-2e1c8f64b3d9
DateApproved: 10/7/2026
MetaDescription: Build and validate a web app with an AI agent in {% data variables.product.prodname_vscode_shortname %}, then review and recover changes.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Quickstart: Complete your first task with an agent

In this quickstart, you use an AI agent in {% data variables.product.prodname_vscode %} to build a small web app from a natural-language prompt. You then review the generated code, let the agent validate the app with browser tools, and verify the result yourself.

{% action-card title="Build a complete app with agents" display="sidebar" %}
Follow a hands-on tutorial to build and refine an app with agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agents tutorial](/docs/agents/agents-tutorial.md)

{% /action-card %}

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download).

* [Set up {% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md).

    This quickstart uses the [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#use-the-copilot-harness), which connects the model to the tools that build and test your app. To use {% data variables.product.prodname_anthropic_claude %}, {% data variables.product.prodname_openai_codex %}, or a model with your own API key instead, [choose and configure another harness](/docs/agents/run/agent-harnesses.md).

> [!NOTE]
> Requests in this quickstart use AI credits from your Copilot plan. {% data variables.copilot.copilot_free_short %} includes a monthly allowance. Open the Copilot status dashboard from the Status Bar to monitor your monthly usage. Learn more about [AI credits and model costs](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) and [what happens when you reach a limit](/docs/agents/agent-troubleshooting/faq.md#i-reached-my-inline-suggestions-or-ai-credits-limit).

## 1. Create a project folder

Start by creating an empty folder for the quickstart app. In the next section, you open this folder in {% data variables.product.prodname_vscode_shortname %} and ask an agent to build the app.

Run the following command in your terminal to create the folder:

```bash
mkdir agent-quickstart
```

## 2. Build the app

{% data variables.product.prodname_vscode_shortname %} lets you work with agents in different ways:

* **{% data variables.copilot.chat_view %}**: work with an agent alongside your code in the editor, focused on the current project.
* **{% data variables.copilot.agents_window %}**: assign (high-level) tasks to agents and switch between projects without reloading the window.

Choose the approach that works best for you and follow the steps in the corresponding tab below.

{% tabs id="agent-surface" %}
{% tab label="{% data variables.copilot.chat_view %}" %}

1. In {% data variables.product.prodname_vscode_shortname %}, select **File** > **Open Folder** from the menu, and then open the `agent-quickstart` folder.

    If {% data variables.product.prodname_vscode_shortname %} asks whether you trust the folder, select **Manage** from the notification, and then select **Trust**.

    ![Screenshot of trusting the folder in {% data variables.product.prodname_vscode_shortname %}.](images/agents-quickstart/editor-trust-folder.png)

1. Open the {% data variables.copilot.chat_view %} with `kb(workbench.action.chat.open)`, and then select `+` to start a new chat.

    ![Screenshot of opening a new chat in the Copilot {% data variables.copilot.chat_view %}.](images/agents-quickstart/editor-new-chat.png)

    If you already had an active chat, starting a new chat does not close the previous one. The previous chat remains accessible via the sessions list.

1. Configure the following settings for the chat session. Keep the default values for any other options.

    | Control | Value | Short description |
    |---------|-------|-------------------|
    | **Session Target** | **Copilot** | Uses the {% data variables.product.prodname_copilot_short %} agent harness to run the session with the Copilot SDK on your machine. |
    | **Agent** | **Agent** | Uses tools to plan, edit files, run commands, and validate the result. |
    | **Language model** | **Auto** | Automatically selects a model based on task complexity and availability. |
    | **Permissions** | **Manual permissions** | Requests your approval for running tools or accessing resources. The agent can make file edits in your project folder. |

    ![Screenshot of selecting the Copilot agent harness and the Agent role with Manual permissions.](images/agents-quickstart/agent-session-editor-select-harness-role-2.png)

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review each approval request before you accept it.

    The agent creates the `index.html` file and saves updates as it progresses. Approval prompts appear for actions that aren't covered by your approval settings.

    > [!TIP]
    > At any time you can stop the agent by selecting the **Stop** button in the chat input or steer it in another direction by sending a new prompt.

1. If the agent asks to open the `index.html` file in the integrated browser, select **Allow in this Session**. You can interact with the app directly in the integrated browser in {% data variables.product.prodname_vscode_shortname %}.

    ![Screenshot of interacting with the app in the integrated browser.](images/agents-quickstart/editor-integrated-browser-interaction.png)

{% /tab %}
{% tab label="{% data variables.copilot.agents_window %}" %}

The {% data variables.copilot.agents_window %} is a dedicated window for interacting with agents across different projects.

1. To open the {% data variables.copilot.agents_window %}, select **Open in Agents** in the title bar of {% data variables.product.prodname_vscode_shortname %} or run **Chat: Open {% data variables.copilot.agents_window %}** from the Command Palette (`kb(workbench.action.showCommands)`).

    ![Screenshot of opening the {% data variables.copilot.agents_window %} in {% data variables.product.prodname_vscode_shortname %}.](images/agents-quickstart/open-agents-window.png)

1. Select **New** at the top of the left sidebar to start a new agent session.

    ![Screenshot of starting a new agent session in the redesigned new-session input.](images/agents-quickstart/agent-session-new.png)

1. Because the {% data variables.copilot.agents_window %} can operate across different projects, select the `agent-quickstart` folder you created earlier from the dropdown.

    If {% data variables.product.prodname_vscode_shortname %} asks whether you trust the folder, select **Trust**.

1. Configure the following settings for the session. Keep the default values for any other options.

    | Control | Value | Short description |
    |---------|-------|-------------------|
    | **Session Target** | **Copilot** | Uses the {% data variables.product.prodname_copilot_short %} agent harness to run the session with the {% data variables.copilot.copilot_sdk %} on your machine. |
    | **Agent** | **Agent** | Uses tools to plan, edit files, run commands, and validate the result. |
    | **Language model** | **Auto** | Automatically selects a model based on task complexity and availability. |
    | **Permissions** | **Manual permissions** | Requests your approval for running tools or accessing resources. The agent can make file edits in your project folder. |

    ![Screenshot of selecting the Copilot agent harness, Agent role, and Manual permissions in the redesigned new-session input.](images/agents-quickstart/agent-session-select-harness-role.png)

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a task list web app in a single index.html file with embedded CSS and JavaScript. Let me add, complete, and delete tasks. Save the tasks in local storage so they persist after a page reload. Use no external libraries.
    ```

1. Follow the agent's progress and review each approval request before you accept it.

    The agent creates the `index.html` file and saves updates as it progresses. Approval prompts appear for actions that aren't covered by your approval settings.

    > [!TIP]
    > At any time you can stop the agent by selecting the **Stop** button in the chat input or steer it in another direction by sending a new prompt.

1. If the agent asks to open the `index.html` file in the integrated browser, select **Allow in this Session**. You can interact with the app directly in the integrated browser in {% data variables.product.prodname_vscode_shortname %}.

    ![Screenshot of interacting with the app in the integrated browser.](images/agents-quickstart/agent-integrated-browser-interaction.png)

{% /tab %}
{% /tabs %}

## 3. Review and validate the result

It's important to review the generated code and outcome carefully. You can let the agent validate key scenarios and edge cases for you by running the app in the integrated browser and observing its behavior.

The agent might already have launched the integrated browser to validate that the app runs correctly as part of creating the task list web app in the previous steps.

In the following steps you'll ask the agent to validate the basic functionality of the task list web app.

{% tabs id="agent-surface" %}
{% tab label="{% data variables.copilot.chat_view %}" %}

1. The {% data variables.copilot.chat_view %} indicates it changed one file and shows diff stats. Select it to review the generated code and its diff.

1. Enter the following prompt to have the agent open the app in the integrated browser and validate its functionality.

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Notice how the agent interacts with the integrated browser and autonomously validates different user scenarios.

    ![Screenshot of the integrated browser validating the app.](images/agents-quickstart/editor-integrated-browser-validation.png)

{% /tab %}
{% tab label="{% data variables.copilot.agents_window %}" %}

1. Open the **Changes** panel in the right sidebar (`kb(workbench.view.agentSessions.changesContainer)`) and select `index.html` to review the generated code.

    If you're not happy with a specific part of the result, select it in the diff view and enter feedback to send it to the agent.

    ![Screenshot of reviewing the generated code in the Changes panel.](images/agents-quickstart/review-changes-panel.png)

1. Enter the following prompt to have the agent open the app in the integrated browser and validate its functionality.

    ```prompt
    Open index.html in the integrated browser and validate the app.
    Add a task, mark it complete, and delete it. Then add another task,
    reload the page, and verify that the task persists. If any step fails,
    fix the issue and repeat the complete flow.
    ```

1. Notice how the agent interacts with the integrated browser and autonomously validates different user scenarios.

    ![Screenshot of the integrated browser validating the app.](images/agents-quickstart/integrated-browser-validation.png)

{% /tab %}
{% /tabs %}

For keyboard and screen reader access to the generated diffs, use the [Accessible Diff Viewer](/docs/configure/accessibility/accessibility.md#diff-editor-accessibility).

## 4. Verify the result yourself

The agent's validation report helps you find problems, but it doesn't replace your own review. In the integrated browser:

1. Add a task and mark it complete.
1. Reload the page and confirm that the task and its completed state persist.
1. Delete the task and confirm that it doesn't return after another reload.

If a check fails, describe what you observed in chat and ask the agent to fix and retest it. Review the resulting diff before you commit the changes.

You have completed your first task with an agent. The agent interpreted your goal, created the code, exercised the app in the browser, and fixed issues it found. You reviewed both the code and the result.

## Stop, revise, or undo the work

If you're not satisfied with the agent's actions or the results, you have several options:

* **Stop or redirect the current request**: while a request is running, use the **Send** dropdown to choose **Steer with Message** or **Stop and Send**. Stopping doesn't undo actions that already completed.

* **Revise the result**: send a follow-up prompt. In a diff, you can select code and provide focused feedback when the interface offers that action.

* **Undo file changes from a request**: hover over an earlier request and select **Restore Checkpoint**. This restores affected workspace files and chat history. It doesn't reverse terminal commands, network requests, deployments, or changes to external services. Learn more about [reviewing and reverting agent changes](/docs/agents/run/review-code-edits.md).

If a follow-up doesn't resolve the problem, use [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md) to choose your next recovery action.

## If your screen looks different

* If the **Copilot** target or **Agent** role isn't available, verify your sign-in and review the [agent harness setup requirements](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target). Your organization's policies might restrict specific agents, models, or tools.

* If you reach an AI credits limit, review [what remains available and when allowances reset](/docs/agents/agent-troubleshooting/faq.md#i-reached-my-inline-suggestions-or-ai-credits-limit).

## Optional: Continue in the other surface

The {% data variables.copilot.agents_window %} and {% data variables.copilot.chat_view %} share the same agent sessions, so you can switch between them without losing the conversation.

* From the {% data variables.copilot.agents_window %}, select **Open in Editor** in the title bar. {% data variables.product.prodname_vscode_shortname %} opens the project in an editor window with the session available in the {% data variables.copilot.chat_view %}.

* From the {% data variables.copilot.chat_view %}, select **Open in Agents** in the title bar. The {% data variables.copilot.agents_window %} opens with the same session selected.

## Clean up resources

When you no longer need the app, run these steps to clean up your local resources:

* Close the `agent-quickstart` folder in {% data variables.product.prodname_vscode_shortname %}.
* Delete the `agent-quickstart` folder from your computer.

## Next steps

* [Apply the workflow to a bounded task in your own project](/docs/agents/best-practices.md#apply-the-workflow-to-your-project).
* [Explore a codebase without changing files](/docs/agents/guides/explore-a-codebase.md).
* [Build a complete app and learn the editor, browser, and source control workflows](/docs/agents/agents-tutorial.md).
* [Review the recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline).
