---
ContentId: 1e9a832b-694f-4ab6-85ce-cf4af9e71870
DateApproved: 10/28/2026
FeatureStatus: cloud-sessions
MetaDescription: Explore a private repository in a cloud session, then continue the same session from a terminal with {% data variables.copilot.copilot_cli_short %}.
MetaSocialImage: images/agents-overview/hero-copilot-cli-dark.png
---
<a name="tutorial-continue-a-cloud-agent-session-in-your-terminal-experimental"></a>

# Tutorial: Continue a cloud agent session in your terminal

Start an agent task in {% data variables.product.prodname_vscode %}, close the application, and continue the same conversation from {% data variables.copilot.copilot_cli %} in a regular terminal. The agent runs in a managed cloud environment, so your development machine doesn't need to stay online for the task to run.

In this tutorial, you ask an agent to explore one of your private repositories and suggest improvements. Then you connect from your terminal and turn one suggestion into an implementation plan without repeating the repository context. You don't need to clone the repository, install its dependencies, or change any code.

If you haven't worked with agents before, start with the [agents quickstart](/docs/agents/quickstart.md).

## Prerequisites

* [Install {% data variables.product.prodname_vscode_shortname %}](/download) and [set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Use a {% data variables.product.prodname_github %} account with access to cloud sessions. Availability depends on your account and organization.
* Have an existing repository on GitHub.com.
* Ensure the `setting(chat.agentHost.cloudSandbox.enabled)` setting is on in {% data variables.product.prodname_vscode_shortname %}.
* [Install the latest {% data variables.copilot.copilot_cli_short %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli). Choose a native installation option if you don't already have Node.js. Your account and organization must allow CLI access and cloud connections.

> [!NOTE]
> Requests use your {% data variables.product.prodname_copilot_short %} plan's allowance. Review [AI credits and model costs](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) before starting.

## 1. Choose a repository

Choose a repository from your own projects that is available for cloud sessions. Pick a small project or focus on one feature to keep the exploration manageable.

The task only reads repository files and returns its findings in the conversation. You don't need to install dependencies or run the project for this walkthrough.

The cloud session works with the code available on GitHub.com. Uncommitted changes, local dependencies, and files that exist only on your computer aren't copied to the cloud environment.

<a name="2-start-the-task-in-a-cloud-sandbox"></a>

## 2. Start the task in a cloud session

A cloud session provides an isolated environment for the agent to explore the repository without affecting your local setup. It runs on {% data variables.product.prodname_github %}'s infrastructure.

1. In {% data variables.product.prodname_vscode_shortname %}, select **Open in Agents** in the title bar to open the {% data variables.copilot.agents_window %}.

1. Select **New** to start a session.

1. Choose the **Cloud** environment from the environment dropdown, then select **Work in Repository** from the workspace dropdown, and choose your private repository.

    ![Screenshot of selecting the cloud environment and repository.](images/cloud-continuity-tutorial/cloud-environment-repo.png)

1. Keep other options at their defaults.

1. Enter the following prompt:

    ```prompt
    Explore this repository to help me understand where to make a small contribution.

    1. Summarize the project's purpose and main directories.
    2. Trace one main feature from its entry point or data source to its output.
    3. Suggest three small improvements, numbered so I can refer to them later.

    Cite the relevant file paths for the explanation and each suggestion.
    Don't edit files, install dependencies, execute project code, or create
    issues or pull requests. Return your findings in this conversation.
    ```

    To focus the exploration, add the name of a feature you're interested in and ask the agent to trace how it works.

1. Wait for the cloud environment to connect and for the agent to start working. Review any approval requests before accepting them.

1. Note the session title so you can recognize it in the CLI, then close the {% data variables.product.prodname_vscode_shortname %} application.

This task starts in the cloud. Connecting from another app doesn't move a local session or upload a local workspace. Because a cloud session runs on the remote cloud infrastructure, it is independent of your local application state. Closing the application doesn't stop cloud execution.

## 3. Continue in the {% data variables.copilot.copilot_cli_short %}

You can connect and interact with Copilot agents sessions from different Copilot clients. In this section, you use the Copilot CLI to continue working with the cloud session you started in {% data variables.product.prodname_vscode_shortname %}. Alternatively, use another supported Copilot client, like the {% data variables.copilot.github_copilot_app_short %}.

You can use the same computer or another computer with {% data variables.copilot.copilot_cli_short %} installed.

1. If you haven't signed in to the CLI, run:

    ```shell
    copilot login
    ```

    Sign in with the same {% data variables.product.prodname_github %} account you used to start the cloud session.

1. Type `/sessions` to view the list of sessions. Use `kbstyle(right)` to select the **Remote** tab.

1. Choose the cloud session you started in {% data variables.product.prodname_vscode_shortname %}. Match its title and repository to the task from the previous section.

    ![Screenshot of the Copilot CLI connecting to the cloud session.](images/cloud-continuity-tutorial/connect-cloud-session.png)

1. Wait for the connection, then check that the conversation includes your repository exploration prompt and the agent's progress or findings.

    ![Screenshot of the Copilot CLI showing the ongoing conversation in the cloud session.](images/cloud-continuity-tutorial/ongoing-conversation.png)

1. Observe that the terminal now shows the ongoing conversation and the agent's progress. You can continue interacting with the agent as if you were in the original client.

    The terminal is another client for the same session. Repository access and agent tools still run in the cloud environment, not in your terminal's current directory. You don't need a local clone.

If you already know the session ID or task ID, you can connect directly with `copilot --connect=<session-or-task-id>`. For details, see the [CLI command-line options](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-line-options).

If you can't find or connect to the session:

* Check that both applications use the same account and that your account has cloud session access.
* Run `copilot --help` to check for `--connect`. If it's missing, update the CLI using the installation instructions.
* Reopen the original session in {% data variables.product.prodname_vscode_shortname %} and check its connection state. A saved transcript doesn't guarantee that the cloud environment is available for live work.

## 4. Continue without repeating the context

After the agent finishes its exploration, enter this follow-up in the connected CLI session:

```prompt
Turn the second improvement you suggested into a short implementation plan.
Identify the affected files, acceptance criteria, and verification steps.
Don't implement the change, install dependencies, execute project code,
or create issues or pull requests.
```

The agent uses the earlier conversation to identify the suggestion. You don't need to paste the repository summary or start another task.

Review the result:

* Confirm that the plan addresses the second suggestion from the original response.
* Open the cited files on GitHub.com and check that they support the explanation.
* Check that the acceptance criteria describe an observable outcome and that proposed verification steps are labeled as steps to run, not tests that already passed.

You have explored a repository in {% data variables.product.prodname_vscode_shortname %} and continued the same cloud-hosted task from your terminal. You can also reopen the original session in the {% data variables.copilot.agents_window %} to continue there.

## Next steps

* [Manage cloud sessions](/docs/agents/run/cloud-sandbox-sessions.md) to learn about reconnecting, reviewing work, and finishing a session.
* [Create an automation](/docs/agents/run/automations.md) for recurring work such as a repository digest. An automation starts new runs from a saved prompt rather than keeping this interactive session running.
