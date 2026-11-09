---
ContentId: c7e2f4a1-8d3b-4a6e-9c5d-2f1b3e8a7d4c
DateApproved: 11/11/2026
MetaDescription: Continue agent work from another machine or start tasks on a remote host with {% data variables.product.prodname_vscode_shortname %}.
---
# Run and manage remote agent sessions

Use remote agent sessions to run tasks on another machine and interact with them from your current device. Connect to a host from the {% data variables.copilot.agents_window %}, then start a new task or continue an existing conversation.

The machines have two roles:

* **Host machine:** Runs the agent and contains the project, tools, and session.
* **Client machine:** Runs the application you use to connect and interact with the session.

Keep the host machine awake, online, and its Agent Host or owning application running. Connecting doesn't transfer the session or copy the project to the client machine.

[Make a host available for remote access](#make-a-host-available-for-remote-access), then [connect to an existing session](#continue-an-existing-remote-session) or [start a new remote session](#start-a-remote-session). To edit and debug the remote project alongside chat, see [Use remote sessions in the {% data variables.copilot.chat_view %}](#use-remote-sessions-in-the-chat-view).

## Choose how to connect

![Screenshot showing three client groups with directly labeled connections to a host machine. The installed Agents window uses {% data variables.copilot.github_environments %}, SSH, or a dev tunnel. The browser-based Agents window uses {% data variables.copilot.github_environments %} or a dev tunnel. Other {% data variables.product.prodname_copilot_short %} experiences use {% data variables.copilot.github_environments %}. A shared cloud-sessions path connects all three groups to managed cloud.](../images/remote-agent-sessions/remote-session-connections.svg)

Choose the workflow that matches what you want to do:

| Your task | Start here | What you need |
|---------------|------------|---------------|
| Continue an existing agent session from another machine. | Use [{% data variables.copilot.github_environments %}](#github-environments) `feature(github-environments)` from the {% data variables.copilot.agents_window %} on the client machine. | Register the host machine as a {% data variables.copilot.github_environment %} and sign in with the same {% data variables.product.prodname_github %} account on both machines. |
| Run agent tasks on an SSH-accessible development server. | [Start a remote session](#start-a-remote-session) in the {% data variables.copilot.agents_window %}, choosing **SSH** and a folder on that server. | SSH access to the server. |
| Connect through an existing dev tunnel or use a browser. | [Start a remote session](#start-a-remote-session) with **Dev Tunnels** in the installed app, or follow the [browser workflow](#use-the-agents-window-in-the-browser). | For a dev tunnel, an authenticated tunnel running on the host. For browser access, either a registered {% data variables.copilot.github_environment %} or a dev tunnel. The browser doesn't connect directly over SSH. |
| Edit and debug a remote project while using chat. | Open the project through [Remote Development](#work-in-a-remote-workspace), then use the {% data variables.copilot.chat_view %}. | A remote workspace open in the editor. This is different from opening an existing agent conversation. |
| Run agent tasks without keeping a development machine online. | Start a [cloud session](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)`. | Managed cloud compute. Starting a cloud session doesn't move an existing session from your own host into the cloud. |

Opening a remote project in the editor is a separate workflow, described under [Use remote sessions in the {% data variables.copilot.chat_view %}](#use-remote-sessions-in-the-chat-view).

## Make a host available for remote access

Enable remote access to start or continue agent sessions from another device while the project, tools, and execution stay on the host machine. Remote clients can access its Agent Host-backed sessions, such as a {% data variables.product.prodname_copilot_short %} session. **Local** harness sessions and older extension-host sessions aren't shared this way.

Run these steps on the host machine to make it available for remote access.

1. On the host machine, open the {% data variables.copilot.agents_window %}, or use an Agent Host-backed session in the {% data variables.copilot.chat_view %} in an editor window.

1. Open **Remote Connections** (antenna icon) in the {% data variables.copilot.agents_window %} title bar or the {% data variables.copilot.chat_view %} input area.

    ![Screenshot showing the Remote Connections menu with {% data variables.copilot.github_environments_caps %} selected and the registered environment name.](../images/remote-agent-sessions/remote-connections-picker.png)

1. Choose a connection method to start sharing.

    * **{% data variables.copilot.github_environments_caps %}** `feature(github-environments)`: Register the host as a {% data variables.copilot.github_environment %} for access from supported {% data variables.product.prodname_copilot_short %} clients.
    * **Dev Tunnels**: Allow remote access from {% data variables.product.prodname_vscode_shortname %} or the browser-based {% data variables.copilot.agents_window %}.

1. Complete any sign-in or confirmation prompts.

From the client machine, [continue an existing session](#continue-an-existing-remote-session) or [start a remote session](#start-a-remote-session) for a new task. To stop remote access, select **Off** in the same **Remote Connections** menu. This doesn't stop running agent tasks.

> [!IMPORTANT]
> Remote connections enable access to the host's supported sessions, tools, and workspace resources, not just the current conversation. With {% data variables.copilot.github_environments %}, session actions are mirrored to {% data variables.product.prodname_github %} for catalog and history storage, and conversation content is not end-to-end encrypted. Review [remote connection security](/docs/agents/run/security.md#remote-connections-and-github-environments) before enabling access.

## Continue an existing remote session

Connect to the host that owns the session through [{% data variables.copilot.github_environments %}](#github-environments), [SSH](#connect-via-ssh), or a [dev tunnel](#connect-via-dev-tunnel). After connecting, select the existing session from the {% data variables.copilot.agents_window %} [sessions list](/docs/agents/run/sessions/manage-sessions.md#find-and-resume-a-session).

Connecting to a host doesn't by itself reopen a conversation. To continue a task, select its existing session rather than submitting the task as a new prompt.

To manage its customizations, keep the remote session selected and open **Customizations**. The editor uses that session's harness and remote workspace. It can show both host-owned customizations and supported customizations supplied by your connected client. Changes aren't necessarily limited to the selected session. See [Manage customizations for remote sessions](/docs/agent-customization/overview.md#manage-customizations-for-remote-sessions).

### {% data variables.copilot.github_environments %}

`feature(github-environments)`

[Enable remote access on the host](#make-a-host-available-for-remote-access) and select **{% data variables.copilot.github_environments_caps %}** to make it discoverable through your {% data variables.product.prodname_github %} account. Registration doesn't create a new machine or copy your code.

On the **client machine**, where you want to interact with the remote session:

1. Sign in with the same {% data variables.product.prodname_github %} account you used to register the host.

1. Open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#open-the-agents-window). If needed, select **New Session** to show the chat input and its **Environment** picker.

1. Run the **Agents: Manage Remote Environments** command from the Command Palette.

1. Verify that the remote host appears in the list of available environments.

1. The sessions list in the {% data variables.copilot.agents_window %} shows available sessions from the remote host. Select the existing session list to continue the conversation.

The session's files, tools, and execution remain on the host machine. If you don't see the task, check the selected host and [session filters](/docs/agents/run/sessions/manage-sessions.md#find-a-missing-session).

For other supported {% data variables.product.prodname_copilot_short %} clients, use that client's environment connection controls. Registration makes the machine discoverable; it doesn't guarantee that every client supports the same harnesses, sessions, or actions.

## Start a remote session

Start a new remote session to run a task in a project folder on another machine.

Have the project folder and its required tools available on the host. For {% data variables.copilot.github_environments %} or dev tunnels, [enable remote access with the antenna button](#make-a-host-available-for-remote-access) first. You can also [start a dev tunnel from the command line](#set-up-a-dev-tunnel).

In the {% data variables.copilot.agents_window %}:

1. Select **New Session** or press `kb(workbench.action.chat.newChat)`.

1. Open the **Environment** picker in chat. Select an existing remote environment, or choose [**{% data variables.copilot.github_environments_caps %}**](#github-environments), [**SSH**](#connect-via-ssh), or [**Dev Tunnels**](#connect-via-dev-tunnel) to connect to a new one.

    ![Screenshot showing the environment picker in the chat window.](../images/remote-agent-sessions/remote-agent-environment-picker.png)

1. Choose a folder on the remote host when prompted, or select one in the workspace picker. Use the folder that contains the project you want the agent to work on.

1. Review the selected [agent](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses) and [permission level](/docs/agents/run/approvals.md#permission-levels). Confirm the host and folder before sending your request.

1. Describe the task, any constraints, and how the agent should check its work. Press `kbstyle(Enter)` to submit it. Review any tool approval requests before proceeding.

The agent uses the selected folder and tools on the host machine, not the client machine's local workspace. [Review its edits](/docs/agents/run/review-code-edits.md) before integrating the result.

> [!TIP]
> To verify the connection, ask the agent to report the operating system and current working directory without changing files. Check that the result matches the intended host and project folder before requesting edits.

### Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. {% data variables.product.prodname_vscode_shortname %} installs the required CLI on the remote machine when needed.

Select **SSH** in the **Environment** picker, then select a configured host or enter a connection string, such as `user@hostname`. Complete any authentication prompts.

![Screenshot showing how to select SSH in the environments dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote-2.png)

### Connect via dev tunnel

**Prerequisite**: a dev tunnel is already running on the host machine. Enable **Dev Tunnels** through [Remote Connections](#make-a-host-available-for-remote-access), or [start a tunnel from the command line](#set-up-a-dev-tunnel).

> [!IMPORTANT]
> Ensure your dev tunnel requires authentication (GitHub or Microsoft account). If the tunnel allows anonymous access, anyone who discovers the URL can reach your machine and start agent sessions. With auto-approval enabled, those sessions can execute commands with your credentials. For more information, see [remote connection security](/docs/agents/run/security.md#remote-connections-and-github-environments).

Select **Dev Tunnels** in the **Environment** picker, choose your account type, then select the active tunnel from the list.

![Screenshot showing how to select Tunnels in the environments dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote-2.png)

## Use the {% data variables.copilot.agents_window %} in the browser

Use the browser-based {% data variables.copilot.agents_window %} to access remote sessions from a device with a browser, without installing {% data variables.product.prodname_vscode %} on that device. The agent and its project stay on the host machine.

Prepare the host using **one** of these methods (the browser doesn't connect directly over SSH):

* **{% data variables.copilot.github_environments %}** `feature(github-environments)`: [Enable remote access on the host](#make-a-host-available-for-remote-access) with **{% data variables.copilot.github_environments_caps %}**. If it's already registered, you don't need to start a dev tunnel.
* **Dev tunnel:** Enable **Dev Tunnels** through [Remote Connections](#make-a-host-available-for-remote-access), [start a tunnel from the command line](#set-up-a-dev-tunnel), or use one that's already running.

Then, on the device you want to connect from:

1. Open the [browser-based {% data variables.copilot.agents_window %}](https://vscode.dev/agents).

1. Sign in with **Continue with GitHub** when prompted. For a {% data variables.copilot.github_environment %}, use the same account that registered the host. For a dev tunnel, authenticate with the account that owns the tunnel when prompted for tunnel access.

1. Select the host in the sidebar's host picker. On mobile, the host picker is in the title bar of the new-session screen.

1. If the selected host is **Disconnected**, use its connection control to connect. On larger layouts, you can also select **Connect** from the host picker's menu.

1. Choose what you want to do:

    * **Continue a task:** Select its existing session from the sessions list, review the conversation, and send a follow-up.
    * **Start a new task:** Start a new session, choose a folder on the host and an available agent, then enter your task. Check the selected host and folder before sending the prompt.

### Set up a dev tunnel

Skip this step if you use {% data variables.copilot.github_environments %} or already have a tunnel running.

On the **host machine**, open a terminal and run:

```bash
code tunnel
```

For {% data variables.product.prodname_vscode_shortname %} Insiders, use `code-insiders tunnel` instead. Complete the GitHub or Microsoft authentication prompts if this is your first tunnel. Tunnels require authentication by default.

Leave the tunnel running, then follow the [browser connection steps](#use-the-agents-window-in-the-browser) or [start a session in the installed app](#start-a-remote-session). For more setup options, see [Developing with Remote Tunnels](/docs/remote/tunnels.md).

### Host management

The host picker scopes the sessions list to the selected machine. Selecting a host and connecting to it are separate actions.

Use **Re-discover Hosts** if a machine is missing. If a host is **Disconnected**, check that its tunnel or environment sharing is running and that the host is reachable, then reconnect. Disconnected doesn't necessarily mean that the remote machine is powered off.

In the browser, {% data variables.copilot.github_environments %} can connect automatically when available and `setting(chat.remoteAgentHostsAutoConnect)` is on. They don't require the prior connection history used by the installed app. Explicitly disconnecting suppresses automatic reconnection until you connect again.

If a connection drops during a session, let automatic recovery complete or reconnect through the host's connection control. Reopen the existing session to continue its conversation rather than starting a replacement.

## Use remote sessions in the {% data variables.copilot.chat_view %}

Use the {% data variables.copilot.chat_view %} to work with an agent alongside the editor, terminal, and debugger. Open a remote workspace to work with code on another machine.

The **Environment** picker and connected-host list belong to the {% data variables.copilot.agents_window %}. The editor's {% data variables.copilot.chat_view %} uses the separate workflows below.

### Work in a remote workspace

To edit and debug a remote project alongside chat, [open the project through Remote Development](/docs/remote/remote-overview.md), such as with the [Remote - SSH extension](/docs/remote/ssh.md), then [start a chat](/docs/agents/run/chat-view.md#start-a-session) in that editor window.

The chat uses the remote project's context and tools while the editor runs on the client machine.

Opening the remote project isn't the same as reopening an existing agent conversation. To continue a task, select its session from the sessions list if it is available in that window. Don't assume that opening the same repository starts or resumes a session from another application.

### Share this machine from the {% data variables.copilot.chat_view %}

The **Remote Connections** control in the {% data variables.copilot.chat_view %} enables access to the machine running the agent. It doesn't connect the editor to another machine. In a local editor window with an Agent Host-backed session, follow [Make a host available for remote access](#make-a-host-available-for-remote-access) to use {% data variables.copilot.github_environments %} or dev tunnels.

## Manage remote connections

### Disconnect or stop sharing

* **Disconnect a client** to end that client's connection. This doesn't stop the host or its running tasks.

* **Stop sharing the host** by opening **Remote Connections** on the host and selecting **Off**. This stops sharing without changing the preferred connection method.

* **Stop an agent task** in its session when you want to halt active work. Disconnecting or turning sharing off is not a task-cancellation action.

The `setting(chat.agentHost.remoteConnections)` setting records your preferred connection method. Changing the setting directly turns sharing off. To start sharing, select the method in **Remote Connections**.

In the installed {% data variables.copilot.agents_window %}, discovering a machine doesn't connect to it for the first time. Connect explicitly. With `setting(chat.remoteAgentHostsAutoConnect)` on, previously connected online environments can reconnect for the same profile and account. Explicitly disconnecting suppresses automatic reconnection until you connect manually again.

### Manage remote environments (Experimental)

Use the Remote Environments editor in the installed {% data variables.copilot.agents_window %} to find and manage your remote machines in one place. This editor is optional; you don't need to open it to follow the connection steps above.

The table groups known SSH hosts, dev tunnels, and WSL distributions on Windows. When support for [{% data variables.copilot.github_environments %}](#github-environments) is available and enabled, the **Environments** group also lists your registered machines, including offline ones. These are user-shared machines, not the managed environments used by cloud sessions.

Remote environment management requires `setting(sessions.chat.experimental.environmentPicker)`, `setting(sessions.chat.experimental.environmentPickerManageRemotes)`, and `setting(chat.remoteAgentHostsEnabled)`. All three settings are on by default.

![Screenshot showing the Remote Environments editor in the Agents window.](../images/remote-agent-sessions/remote-environments-editor.png)

#### Open remote environment management

Run **Agents: Manage Remote Environments** from the Command Palette (`kb(workbench.action.showCommands)`), or select **Manage Remote Environments** from the sessions list **More Actions** (`...`) menu.

You can also open the editor from the **Environment** picker:

1. Create a new chat or session in the {% data variables.copilot.agents_window %}.

1. Open the **Environment** picker and select **Manage**.

    ![Screenshot showing the Environment picker and its Manage entry.](../images/remote-agent-sessions/environment-picker-manage.png)

#### Find and organize remote machines

Use the table to search, connect, and organize your remote machines. Keep these behaviors in mind:

* Disconnecting doesn't stop running tasks. Refreshing discovers machines without connecting.

* Renaming or hiding a machine affects only this client. Hiding doesn't disconnect it or remove sessions. Leave a name empty to restore the default.

* **Delete** has different effects depending on the connection:
  * For a {% data variables.copilot.github_environment %}, it removes the registration and disconnects this client. The environment can reappear if its owning application registers it again.
  * For an eligible saved SSH connection, it forgets the saved connection and disconnects this client. It doesn't change your SSH configuration.
  * For a dev tunnel, it deletes the tunnel registration and disconnects its clients. Stop hosting a tunnel from this application before deleting it. A machine that starts hosting the tunnel again can recreate it.

  None of these actions deletes files on the remote machine.

## Other remote workflows

### Start a chat without a workspace on a remote host

In the installed {% data variables.copilot.agents_window %}, use a chat without a workspace when a task needs the resources or environment of a remote host but doesn't need a repository. The **Chat** workspace option isn't available in the browser-based interface.

To start a chat without a workspace:

1. Select **New Session** or press `kb(workbench.action.chat.newChat)`.

1. In the **Environment** picker, select the connected remote host.

1. In the workspace picker, select **Chat** instead of a project folder. This option requires a supported harness and environment.

1. Choose an agent harness, enter your prompt, and press `kbstyle(Enter)`.

Select a folder on that host instead when the task needs an existing project.

### Run a session in a remote Dev Container

Run agents inside your remote project's Dev Container to use its configured tools and dependencies without installing them directly on the remote machine. Starting in {% data variables.product.prodname_vscode_shortname %} 1.139, this is supported for SSH, Tunnel, and WSL connections in the installed {% data variables.copilot.agents_window %}, not in the browser-based window.

Dev Container support (`setting(chat.agentHost.devContainer.enabled)`) is on by default. Docker must be installed and running on the remote host, and the project must contain a [Dev Container configuration](/docs/devcontainers/create-dev-container.md).

To run a session in a remote Dev Container:

1. Connect over SSH, through a tunnel, or to WSL, and select the project folder in the workspace picker.

1. Expand the menu for the remote folder and select **Use Dev Container**.

    The workspace label gains the **- Dev Container** suffix.

1. Choose an available agent harness, configure the session, and enter your prompt.

The **Use Dev Container** option appears only when the source machine advertises Dev Container support. It isn't available for unsupported machines or for folders whose source is nested inside another remote environment. For more information about prerequisites, switching back to the source machine, and troubleshooting, see [Run a session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

### Preview a remote web app

`feature(integrated-browser-remote)`

In the installed {% data variables.copilot.agents_window %}, use the integrated browser to preview a web app running on a supported session host without forwarding its port. Enable `setting(workbench.browser.enableRemoteProxy)`, leave `setting(workbench.browser.dataStorage)` at `default`, and open the app's original localhost URL. Check that the remote indicator in the address bar identifies the intended host.

Select **Share with Agent** to let the agent interact with your page, or ask it to open the app and validate a user flow. See [browsing through a remote agent host](/docs/debugtest/integrated-browser.md#browse-through-a-remote-agent-host) for supported hosts, storage behavior, and connection troubleshooting.

<a name="delegate-work-to-remote-agent-hosts-experimental"></a>

### Delegate tasks to remote machines (Experimental)

Ask an agent in the installed {% data variables.copilot.agents_window %} to run work on another connected machine, such as testing a project on a different operating system. This starts remote work rather than resuming a session from the sessions list.

The originating chat must run on an [Agent Host](/docs/agents/concepts/agent-host.md), and the connected target must advertise remote delegation support. Other chat providers aren't supported.

Turn on `setting(chat.remoteSessions.tools.enabled)` and `setting(chat.remoteAgentHostsEnabled)`, and connect the machines that the agent can use. You don't need to select the target machine in the workspace picker.

For example:

```prompt
Run the tests in <remote-project-path> on the connected Windows host <host-name>.
Use the existing folder and send the results back to this chat when you finish.
```

The agent can discover connected hosts, start remote sessions, inspect their status, and send follow-up messages. You can name a host or ask the agent to choose one that matches requirements such as operating system, memory, CPU count, or model. If no connected host meets the criteria, the tool reports an error.

For repository work, specify an existing trusted folder on the target machine, either directly or in a new Git worktree. The tools don't clone or copy the coordinating session's workspace to the remote machine. If you don't specify a workspace, the remote session starts without one.

Normal approval requirements still apply to delegated work and messages. Review the selected host, folder, and worktree before you approve a tool call, especially when the agent uses automatic placement.

Keep the coordinating {% data variables.copilot.agents_window %} open and connected while delegated work runs so messages can flow between sessions. A remote session's final response isn't forwarded automatically. Ask the remote agent to send the result back to the originating chat, as in the example above.

Turning off `setting(chat.remoteSessions.tools.enabled)` removes the remote delegation tools, but doesn't disconnect remote machines or stop remote sessions that are already running.

## Troubleshoot remote sessions

| Symptom | What to check |
|---------|---------------|
| Remote connection options are missing | Confirm that `setting(chat.remoteAgentHostsEnabled)` is on. Turning it off prevents this client from connecting to remote agent hosts. For {% data variables.copilot.github_environments %}, also check the feature-specific requirements below. |
| The host is offline or won't connect | Keep the host awake and online, with its application or Agent Host running. Connecting to an offline registered machine doesn't start the host. Check [SSH setup](/docs/remote/ssh.md) or [dev tunnel setup](/docs/remote/tunnels.md) for your connection method. |
| A session is missing | Check the connected host, supported session types, workspace group, and [sessions list filters](/docs/agents/run/sessions/manage-sessions.md#find-a-missing-session). Starting a new session doesn't resume a missing one. |
| A transcript is visible but can't accept messages | Reconnect to the host. A cached transcript or [synced history](/docs/agents/run/sessions/session-history.md) is not a live connection. |

### Troubleshoot {% data variables.copilot.github_environments %}

For host connectivity or missing sessions, start with the [common checks](#troubleshoot-remote-sessions).

| Symptom | What to check |
|---------|---------------|
| {% data variables.copilot.github_environments %} or the connection command is missing | Check feature availability, `setting(chat.agentHost.githubEnvironments.enabled)`, `setting(chat.remoteAgentHostsEnabled)`, and [organization policy](/docs/enterprise/manage-ai-settings.md#control-github-environments). |
| The machine isn't listed | Confirm that sharing is on at the host and both clients use the same account. Refresh the environment picker. |
| A discovered machine doesn't connect automatically | In the installed {% data variables.copilot.agents_window %}, connect explicitly the first time. Automatic reconnection requires `setting(chat.remoteAgentHostsAutoConnect)` and a previously connected online environment for the same profile and account. In the browser, prior connection history isn't required. After an explicit disconnect, connect manually again. |

## Related resources

* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - agent-first workflows across multiple projects.
* [Developing with Remote Tunnels](/docs/remote/tunnels.md) - set up and manage dev tunnels.
* [Agent Host architecture](/docs/agents/concepts/agent-host.md) - technical details about remote connections and session execution.
