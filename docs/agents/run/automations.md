---
ContentId: 76a5b461-bcbd-474f-9638-d4533c51a4e3
DateApproved: 9/8/2026
FeatureStatus: automations
MetaDescription: Schedule recurring agent tasks in the {% data variables.copilot.agents_window %}, review run results, and manage automations.
MetaSocialImage: ../images/agents-window/agents-window-ui-annotated.png
---
# Automate recurring agent tasks

Automations run recurring agent tasks from a saved prompt, session configuration, and schedule. Use them for work such as summarizing repository changes or triaging issues without starting each session manually. This article walks you through creating an automation, checking its first run, and scheduling future runs.

## Prerequisites

* Set up and open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#prerequisites) with an available agent.
* Enable `setting(chat.automations.enabled)` in the Settings editor.

Automations are rolling out gradually. The setting is off by default on Stable and on by default in Insiders. If **Automations** isn't visible in the sidebar, check that the setting is enabled.

## Create an automation

1. In the {% data variables.copilot.agents_window %} sidebar, select **Automations**.

1. Select **Create Automation**, or choose a card under **Start with a template** to fill in a starting prompt and schedule.

1. Enter a descriptive **Name** and a **Prompt**. Specify the task, its scope, and the output you expect. For example:

    ```prompt
    Summarize commits on the current branch from the last 24 hours.
    Group the summary by feature, fix, and maintenance work.
    Include commit references and flag changes that might need documentation.
    Do not modify files.
    ```

    If you start with a template, review and adapt its prompt before saving.

1. Choose the workspace where the agent should work, or **No workspace** for a task that doesn't need project files. The available agents depend on this choice.

1. Choose an available agent and review **Session configuration**, including the model and permission options. For a Git workspace, you can select **New Worktree** and a base branch when the agent supports isolation. Learn how to [choose an agent and code isolation](/docs/agents/run/agent-harnesses.md).

1. Set **Schedule** to **Manual** to check the task before making it recurring, and then select **Create**.

![Screenshot showing the automation creation form with the prompt, workspace, session configuration, and schedule controls.](../images/automations/automation-creation-form.png)

> [!CAUTION]
> An automation can read files, run commands, and make changes according to its agent's permissions. Review the [permission level](/docs/agents/run/approvals.md#permission-levels) before scheduling unattended work. Saving an automation doesn't bypass organization policies or guarantee that future runs won't need your approval.

## Run and review an automation

Select **Run now** on the automation card. The automation starts an agent session, and its run appears under **History**.

Select a run in **History** to open its session. Review the response and any changes before relying on the task's output. If the session needs approval, review the request there. If a run fails, inspect its error and session before trying again.

Each run uses the selected agent and model, so account for recurring usage when choosing a schedule.

## Set a recurring schedule

After checking the first run, select the automation's name to edit it. Choose a **Schedule**, keep **Enabled** selected, and select **Save**.

| Schedule | When it runs |
|---|---|
| **Manual** | Only when you select **Run now**. |
| **Hourly** | Every hour. |
| **Daily** | At the selected **Time** each day. |
| **Weekly** | At the selected **Time** on the selected **Day of week**. |

Daily and weekly schedules use your local time zone.

Keep these execution requirements in mind:

* Keep the machine that runs the automation awake and its agent available. Agent Host-backed schedules require a running Agent Host process. Other schedules require a running {% data variables.product.prodname_vscode_shortname %} window. Don't assume that local automations continue after you quit the application.
* After an interruption, a missed schedule can trigger a catch-up run. Don't rely on every missed occurrence being replayed.
* An automation runs one session at a time. Another scheduled occurrence doesn't start a parallel run of the same automation.

## Change or stop an automation

* **Edit**: select the automation's name, update its prompt, target, session configuration, or schedule, and select **Save**.
* **Disable future runs**: edit the automation, clear **Enabled**, and select **Save**. Select **Enabled** again to resume scheduling.
* **Stop an active run**: select **Stop** for the running session in **History**. Disabling an automation doesn't stop a run already in progress.
* **Delete**: select **Delete** on the automation card and confirm. This permanently deletes the automation and its run history.

## Next steps

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md)
