---
ContentId: 76a5b461-bcbd-474f-9638-d4533c51a4e3
DateApproved: 10/28/2026
MetaDescription: Automate routine agent tasks locally or in GitHub from the {% data variables.copilot.agents_window %}, with schedules, repository triggers, and run history.
MetaSocialImage: ../images/agents-window/agents-window-ui-annotated.png
---
# Create and manage agent automations

Automations run agent tasks from a saved prompt and session configuration. Use them for work such as summarizing repository changes or triaging issues without starting each session manually. Run an automation on demand, on a recurring schedule, or, for cloud automations, in response to supported repository events. You can also start from a template or share an automation as a reusable file.

Run an automation locally when the task needs your development environment. Run it in GitHub's cloud `feature(cloud-automations)` when you want recurring repository work to continue while {% data variables.product.prodname_vscode_shortname %} and your computer are off.

This article explains how to choose between local and cloud automations, and how to create, monitor, and safely manage them.

## Prerequisites

* Set up and open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#prerequisites) with an available agent.
* For cloud automations `feature(cloud-automations)`, sign in with a GitHub.com account that has write access to an eligible private repository. Your Copilot plan and organization must allow automations. See [GitHub automation availability and permissions](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations#availability-and-permissions).

Automations and cloud automation management are on by default. If **Automations** isn't visible in the sidebar, check that `setting(chat.automations.enabled)` is on. If **Run in the Cloud** isn't available in the creation form, also check `setting(chat.automations.cloud.enabled)`. Turning on these settings doesn't grant access to the GitHub service.

## Choose where an automation runs

You can choose to run an automation locally or in the cloud based on your needs:

| Option | Choose it when | Execution requirements |
|--------|----------------|------------------------|
| **Local** | The task needs your local workspace, tools, or development environment. | Keep your computer awake and the agent available for scheduled runs. |
| **Cloud** | You want unattended repository work on a schedule or in response to supported issue and pull request events. | Runs on GitHub, even when your computer is off. Requires an eligible repository and service access. |

GitHub service plans, permissions, billing, security, and supported triggers can change independently of {% data variables.product.prodname_vscode_shortname %}. Review [{% data variables.product.prodname_copilot %} automations](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) before enabling unattended cloud runs.

Automations start a run when a trigger fires. They are different from [cloud sessions](/docs/agents/run/cloud-sandbox-sessions.md), where you start an interactive task and reopen the same session to continue it. Creating a cloud session doesn't create an automation or schedule.

## Create an automation

Choose local or cloud execution:

{% tabs id="automation-execution" %}
{% tab label="Local" %}

1. In the {% data variables.copilot.agents_window %} sidebar, select **Automations**.

1. Create a new automation or select one of the [starter templates](#start-from-a-template). Starting from a template prepopulates the prompt and schedule fields.

1. Leave **Run in the Cloud** off.

1. Enter a descriptive **Name** and a **Prompt**. Specify the task, its scope, and the output you expect. For example:

    ```prompt
    Summarize commits on the current branch from the last 24 hours.
    Group the summary by feature, fix, and maintenance work.
    Include commit references and flag changes that might need documentation.
    Do not modify files.
    ```

    If you start with a template, review and adapt its prompt before saving.

1. Choose the workspace where the agent should work, or **Chat** for a task that doesn't need project files. The available agents depend on this choice.

1. Choose an available agent and review other configuration options like the model and permissions. For a Git workspace, you can select **New Worktree** and a base branch when the agent supports isolation. Learn how to [choose an agent and code isolation](/docs/agents/run/agent-harnesses.md).

1. Configure the **Trigger** to specify when the automation should run.

    You can choose between **Manual** or a [recurring schedule](#set-a-recurring-schedule).

1. Optionally, in the advanced settings, enable or disable the use of customizations.

1. Review your automation settings, and then select **Create**.

![Screenshot showing the automation creation form with the prompt, workspace, session configuration, and schedule controls.](../images/automations/automation-creation-form.png)

> [!CAUTION]
> An automation can read files, run commands, and make changes according to its agent's permissions. Review the [permission level](/docs/agents/run/approvals.md#permission-levels) before scheduling unattended work. Saving an automation doesn't bypass organization policies or guarantee that future runs won't need your approval.

{% /tab %}
{% tab label="Cloud" %}

`feature(cloud-automations)`

1. In the {% data variables.copilot.agents_window %} sidebar, select **Automations**.

1. Create a new automation or select one of the [starter templates](#start-from-a-template). Starting from a template prepopulates the prompt and schedule fields.

1. Turn on **Run in the Cloud**.

1. Choose an eligible private GitHub.com repository in the workspace picker. You can use a local clone or select a repository without cloning it to your machine. Public repositories aren't supported.

1. Enter a descriptive **Name** and **Prompt**. Make the task, scope, expected output, and safety constraints explicit. For example, name the automation 'Daily repository summary' and use:

    ```prompt
    Summarize commits merged into the default branch in the last 24 hours.
    Group them by feature, fix, and maintenance work.
    Include commit references and flag changes that might need documentation.
    Return the summary in the session. Do not modify files, open pull requests,
    or change issues.
    ```

1. Select an available model.

1. In **Tools**, select **Configure allowed tools** to choose which tools the automation can use. No tools are selected by default. Grant only the tools the task needs. For the summary example, allow repository-reading tools and leave tools that change files, issues, or pull requests off.

1. Choose an **Owner**.

    * **Only me**: Only you can see and edit this automation definition, and its runs act as you.
    * **Repository**: The automation is owned by a private repository, and it runs as Copilot. Anyone with read access to the repository can see the automation definition. Anyone with write access to the repository can edit and run it.

    You can't change the owner after creation. The Automations view groups personal and repository-owned automations under **Your automations** and **Shared automations**.

1. Configure the **Trigger** to specify when the automation should run.

    You can choose between **Manual**, a [recurring schedule](#set-a-recurring-schedule), or responding to [repository events](#run-on-repository-events) (issues or pull requests).

1. Review your automation settings, and then select **Create**.

For the summary example, compare the cited commits with the repository history, confirm the summary covers the requested time window, and check that no files or issues changed. After this check, [set a recurring schedule](#set-a-recurring-schedule).

<!-- TODO: Capture the cloud automation form with Run in the Cloud, repository, model, tools, Owner, and Trigger controls. -->

The cloud service runs the prompt in the selected repository. It doesn't use your local working tree, uncommitted changes, or local development environment.

{% /tab %}
{% /tabs %}

## Start from a template

Automation templates provide a starting name, prompt, and schedule that you can review and adapt:

* **Built-in Templates** contains templates included with {% data variables.product.prodname_vscode_shortname %}.
* **Templates from Plugins** contains templates from enabled [Agent Plugins](/docs/agent-customization/agent-plugins.md#what-plugins-provide). Each template shows a **Plugin** badge and its source plugin.

The template sections start expanded when you have no saved automations and collapsed when you have saved automations. A blue marker on **Templates from Plugins** indicates that an enabled plugin contributed a new template. Expand the section to clear the marker.

Select a template to open it in the **New Automation** dialog. Review the prompt and schedule, and then choose the workspace, agent, model, permissions, and isolation. The **Enabled** checkbox is cleared by default. Select it only after you review the complete configuration, and then select **Create**.

Disabling a plugin removes its templates from the view. Automations that you already created from those templates and their run history remain available.

## Run and review an automation

Select **Run now** on the automation card. The automation starts an agent session, and its run appears under **History**.

Select a run in **History** to open its session. Review the response and any changes before relying on the task's output. If the session needs approval, review the request there. If a run fails, inspect its error and session before trying again.

Each run uses the selected agent and model, so account for recurring usage when choosing a schedule.

For a cloud automation, the automation card and its history update while a run is active and show whether the run is queued, running, completed, or failed. Select a run to open its session in the {% data variables.copilot.agents_window %}, review its output, and send a follow-up when available. A follow-up continues that run's conversation. It doesn't update the automation's saved prompt or future triggers.

Select **Refresh** to retrieve changes made on GitHub. On a run, use **Open on GitHub** to review or manage it there, or if the session isn't available in the editor yet. If a run reports **Needs input on GitHub**, open it on GitHub to respond.

## Set a recurring schedule

After checking the first run, select the automation's name to edit it. Choose a schedule from **Trigger**, keep **Enabled** selected, and select **Save**.

| Schedule | When it runs |
|---|---|
| **Manual** | Only when you select **Run now**. |
| **Hourly** (local only) | Every hour. |
| **Daily** | At the selected **Time** each day. |
| **Weekly** | At the selected **Time** on the selected **Day of week**. |

Daily and weekly times are displayed in your local time zone. Cloud schedules are stored in UTC. Review the saved time when your local UTC offset changes, such as after a daylight saving time change.

Cloud automations support **Manual**, **Daily**, and **Weekly** triggers. For daily and weekly cloud schedules, select a time with minutes set to `00`, `15`, `30`, or `45`.

For local automations, keep these execution requirements in mind:

* Keep the machine that runs the automation awake and its agent available. Agent Host-backed schedules require a running Agent Host process. Other schedules require a running {% data variables.product.prodname_vscode_shortname %} window. Don't assume that local automations continue after you quit the application.
* After an interruption, a missed schedule can trigger a catch-up run. Don't rely on every missed occurrence being replayed.
* An automation runs one session at a time. Another scheduled occurrence doesn't start a parallel run of the same automation.

Cloud schedules run on GitHub rather than through your local scheduler. You can close the {% data variables.copilot.agents_window %} or turn off your computer without stopping the schedule.

## Run on repository events

Instead of a schedule, a cloud automation can respond to events advertised by GitHub for your account and repository:

1. Create or edit a cloud automation and set **Trigger** to **Issue** or **Pull Request**, when available.

1. Choose the event or pull request events to respond to. For example, respond when an issue receives a label or a pull request review is submitted. Available events depend on GitHub's trigger catalog.

1. Expand **Advanced** to configure the filters available for the selected event. The fields, allowed values, and required fields depend on GitHub's trigger catalog.

    | Field | Use it to |
    |-------|-----------|
    | **Query** | Limit which issues or pull requests match. |
    | **Comment text** | Filter by text in the triggering comment. |
    | **Labels added** | Match labels added to an issue or pull request. |
    | **Assignees** | Filter by assignees associated with the event. |
    | **Changed paths** | Limit triggering to matching file paths in a pull request. |
    | **Review states** | Filter by pull request review states. |

1. Turn on **Require write access to trigger** to limit triggering to people with write access to the repository. This option is off by default. Review the [security considerations](#cloud-automation-security-and-usage) before allowing events from other users.

1. Review the prompt and allowed tools for the selected event, then save the automation with **Enabled** selected.

<!-- TODO: Capture Issue and Pull Request trigger configuration with the Advanced filters and Require write access to trigger option. -->

Test with a controlled event in a repository where you can safely inspect the outcome. Event-triggered automations don't show **Run now**. To test the prompt manually first, create a separate automation with a **Manual** trigger.

If an existing automation uses triggers or fields that the editor doesn't support, those trigger controls are read-only. Other supported changes preserve the triggers. Use **Open on GitHub** to manage the unsupported trigger configuration.

## Share an automation

Export a local automation as a `.automation.md` file to reuse it on another machine or share it with someone else. The file is readable Markdown with YAML frontmatter and contains only portable information:

* Name and prompt.
* Manual, hourly, daily, or weekly schedule.
* File format version and portable identifier.

The file doesn't include the workspace, provider, model, permissions, enabled state, or run history. The person who imports the file chooses these options locally.

Cloud automations don't offer **Export**. Manage their definitions and triggers on GitHub rather than relying on an exported `.automation.md` file to reproduce them.

### Export an automation

1. On the automation card, select **More Actions** > **Export**.

1. Choose where to save the proposed `.automation.md` file.

You can open the exported file in an editor to review its prompt and schedule before you share it.

### Import an automation

1. Select **Import Automation** in the Automations view, and then choose a `.automation.md` file. You can also drag one `.automation.md` file anywhere over the view.

1. In the **New Automation** dialog, review the imported name, prompt, and schedule.

1. Choose the workspace, agent, model, permissions, and isolation for the automation.

1. The **Enabled** checkbox is cleared by default. Select it only after you review the complete configuration, and then select **Create**.

{% data variables.product.prodname_vscode_shortname %} rejects unsupported files instead of silently changing their schedule or importing execution permissions.

## Manage an automation

* **Edit**: select the automation's name, update its supported fields, and select **Save**. A cloud automation's repository and **Owner** can't change after creation. Create another automation to use a different repository or owner, and disable the original if it should no longer run.
* **Enable or disable future runs**: select **More Actions** > **Enable** or **Disable**. Disabling an automation doesn't stop a run already in progress.
* **Duplicate**: select **More Actions** > **Duplicate**, review the copy in the **New Automation** dialog, and select **Create**. Duplicate event-triggered cloud automations on GitHub to preserve their complete configuration.
* **Stop an active run**: select **Stop** for the run in **History** when available. This requests cancellation, not a rollback of completed actions.
* **Export** (local only): select **More Actions** > **Export**. For more information, see [Share an automation](#share-an-automation).
* **Open on GitHub** (cloud only): select **More Actions** > **Open on GitHub** to open the automation definition. Use this action on an individual run to open that run instead.
* **Delete**: select **More Actions** > **Delete** and confirm. This permanently deletes the automation and its run history.

For cloud automations, edit, enable, disable, and delete actions update the automation on GitHub. Disabling a cloud automation prevents future scheduled runs but doesn't stop a run in progress. Deleting it removes the cloud automation and its schedule from GitHub. Select **Refresh** after managing an automation on GitHub to update the Automations view.

> [!IMPORTANT]
> Turning off `setting(chat.automations.cloud.enabled)` or `setting(chat.automations.enabled)` hides cloud automation controls in {% data variables.product.prodname_vscode_shortname %}, but it doesn't stop schedules or event triggers that are already active on GitHub. Disable or delete those cloud automations before turning off the settings.

## Cloud automation security and usage

Cloud automations perform unattended work with the tools you allow. Grant only the tools the task needs, use narrowly scoped prompts and event filters, and review a manual run before enabling recurring work. Don't assume that local approval or sandbox settings apply to GitHub's execution environment.

An **Only me** automation is private, but its run sessions and logs can be visible to people with repository access. Don't put secrets in prompts. Use the repository's supported secret configuration and review [GitHub automation security and safety](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations#security-and-safety).

Scheduled runs, event-triggered runs, and follow-ups can consume service usage. Check [GitHub automation billing](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations#billing) and your organization's policies before enabling frequent triggers.

## Troubleshoot cloud automations

| Symptom | What to check |
|---------|---------------|
| Cloud automation creation is unavailable | Check both automation settings, your GitHub.com account, repository write access, and service or organization eligibility. Turning on a setting doesn't grant access. |
| A repository isn't offered | Use an eligible private GitHub.com repository. Public repositories and non-Git folders aren't cloud automation targets. |
| A saved automation is missing | Check the signed-in account and selected repository. The view discovers automations in known repositories, not every repository in your account. Select the repository and then **Refresh**. |
| **Run now** isn't available | Cloud automations must be enabled. Event-triggered automations run from matching events instead of **Run now**. |
| A trigger or tool catalog doesn't load | Retry loading it and inspect the reported error. Don't replace saved tools or triggers with an empty selection to work around a load failure. |
| A run needs input or its session won't open | Use **Open on GitHub**. If the session isn't available yet, refresh and try opening it again. |
| Work continues after turning off an editor setting | Disable or delete the automation on GitHub. Hiding editor controls doesn't stop remote triggers or cancel an active run. |

## Cloud automation limitations

Cloud automation support in {% data variables.product.prodname_vscode_shortname %} currently has these limitations:

* Available repositories, event types, filters, models, and tools depend on GitHub service support and your account's permissions.
* A cloud automation uses the cloud model and tool configuration. It doesn't accept local mode or approval settings, custom agents, or local MCP configuration.
* Unsupported trigger configuration must be managed on GitHub. It isn't replaced when you edit other supported fields.

## Next steps

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Discover and manage Agent Plugins](/docs/agent-customization/agent-plugins.md)
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md)
