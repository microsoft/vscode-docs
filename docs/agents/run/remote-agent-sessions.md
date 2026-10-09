---
ContentId: c7e2f4a1-8d3b-4a6e-9c5d-2f1b3e8a7d4c
DateApproved: 10/7/2026
MetaDescription: Delegate work to remote agent hosts, use remote Dev Containers, and manage sessions in the browser-based {% data variables.copilot.agents_window %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Run and manage remote agent sessions

The [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) lets you connect to remote machines to start agent sessions or check in on existing ones. You can connect over SSH, through a dev tunnel, or use the {% data variables.copilot.agents_window %} directly in a browser from any device.

This is useful when you want to take advantage of a remote machine's resources, work from a mobile device, or check in on your agent's progress when you're away from your main development machine.

The {% data variables.copilot.agents_window %} connects to the remote machine by using the [Agent Host Protocol (AHP)](https://microsoft.github.io/agent-host-protocol/) over SSH or a dev tunnel. When you connect, the {% data variables.copilot.agents_window %} automatically installs and starts the {% data variables.product.prodname_vscode_shortname %} CLI on the remote machine. The remote machine must be powered on and accessible over the network.

## Start a chat without a workspace on a remote host

Use a chat without a workspace when a task needs the resources or environment of a remote host but doesn't need a repository. First, enable `setting(sessions.chat.unifiedWorkspacePicker.enabled)` and connect the host over SSH or a dev tunnel.

To start a chat without a workspace:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace picker, select the **Chat** entry for a connected remote host without choosing a folder. The entry identifies the host where the chat runs.

1. Choose an agent harness, enter your prompt, and press `kbstyle(Enter)`.

The main workspace picker also shows folders from connected remote hosts alongside local folders. Select a remote folder there when the task needs an existing workspace.

## Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. No extra agent installation is needed on the remote machine.

To start a session on a remote machine via SSH:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace dropdown, select the **Remote** tab, and then select **SSH**. If you've already set up SSH connections, they appear as options in the dropdown.

    ![Screenshot showing how to select SSH in the workspace dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote.png)

1. Enter the SSH connection string for the remote machine (for example, `user@hostname`).

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

## Connect via dev tunnel

**Prerequisite**: a dev tunnel is already running on the remote machine. See [Developing with Remote Tunnels](/docs/remote/tunnels.md) for setup instructions.

To start a session on a remote machine via dev tunnel:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace dropdown, select the **Remote** tab, and then select **Tunnels** and choose your account type.

    ![Screenshot showing how to select Tunnels in the workspace dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote.png)

1. Choose the active dev tunnel from the list.

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

> [!IMPORTANT]
> Ensure your dev tunnel requires authentication (GitHub or Microsoft account). If the tunnel allows anonymous access, anyone who discovers the URL can reach your machine and start agent sessions. This is especially dangerous when auto-approval modes are active, because unauthorized users can trigger AI-assisted command execution with your credentials. For more information, see [Security](/docs/agents/run/security.md).

## Delegate work to remote agent hosts (Experimental)

From an Agent Host session in the {% data variables.copilot.agents_window %}, delegate a task to a connected remote host without selecting the host in the workspace picker. Enable both `setting(chat.remoteAgentHostsEnabled)` and `setting(chat.remoteSessions.tools.enabled)`, and connect the hosts that the agent can use.

The remote delegation tools let an agent:

* Use `list_agent_hosts` to discover connected hosts, available models, resource capacity, and session load.
* Use `create_remote_session` to start a session on a specific host or choose a host automatically. For automatic placement, specify criteria such as Windows, Linux, or macOS, minimum memory, logical CPU count, and an optional model. Among matching hosts, placement favors the host with the fewest running sessions and pending session creations. If no connected host meets all the criteria, the tool reports an error instead of selecting a nonmatching host.
* Use `get_remote_session` to check a remote session's status and latest response.
* Use `send_remote_message` to send follow-up work or report results and questions to the exact originating chat. If that chat is busy, the message waits in its queue.

For repository work, specify an existing trusted folder on the target host, either directly or in a new Git worktree. The tools don't clone or copy the coordinating session's workspace to the remote host. If you don't specify a workspace, the remote session starts without one.

Normal approval requirements still apply to delegated work and messages. Review the selected host, folder, and worktree before you approve a tool call, especially when the agent uses automatic placement.

Keep the coordinating {% data variables.copilot.agents_window %} open and connected while delegated work runs so messages can flow between sessions. A remote session's final response isn't forwarded automatically. Ask the remote agent to use `send_remote_message` to report its result.

Turning off `setting(chat.remoteSessions.tools.enabled)` removes the remote delegation tools, but doesn't disconnect hosts or stop remote sessions that are already running.

## Run a session in a remote Dev Container

`feature(agent-host-dev-containers)`

Run agents inside your remote project's Dev Container to use its configured tools and dependencies without installing them directly on the host. Starting in {% data variables.product.prodname_vscode_shortname %} 1.139, this is supported for SSH, Tunnel, and WSL hosts in the desktop {% data variables.copilot.agents_window %}.

Before you start, enable `setting(chat.agentHost.devContainer.enabled)`. Docker must be installed and running on the remote host, and the project must contain a [Dev Container configuration](/docs/devcontainers/create-dev-container.md).

To run a session in a remote Dev Container:

1. Connect to an SSH, Tunnel, or WSL host and select the project folder in the workspace picker.

1. Expand the menu for the remote folder and select **Use Dev Container**.

    The workspace label gains the **- Dev Container** suffix.

1. Choose an available agent harness, configure the session, and enter your prompt.

The **Use Dev Container** option appears only when the source host advertises Dev Container support. It isn't available for unsupported hosts or for folders whose source is nested inside another remote environment. For more information about prerequisites, switching back to the source host, and troubleshooting, see [Run a session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

## Use the {% data variables.copilot.agents_window %} in the browser

The {% data variables.copilot.agents_window %} is also available as a web client at <https://insiders.vscode.dev/agents>, so you can manage agent sessions from any device with a browser. This is useful when you're away from your main development machine, working from a mobile device, or want to check in on sessions running on a remote host without installing {% data variables.product.prodname_vscode %} locally.

The browser-based {% data variables.copilot.agents_window %} connects to your development machine through a [dev tunnel](/docs/remote/tunnels.md). Agent sessions run on the remote host, and the browser acts as a lightweight client for chatting, reviewing changes, and managing sessions.

### Set up a dev tunnel

Before you can use the {% data variables.copilot.agents_window %} in the browser, start a dev tunnel on the machine you want to connect to:

1. On your remote host, run the following command to start a dev tunnel:

    ```bash
    code-insiders tunnel
    ```

    If you're using the stable release, run `code tunnel` instead.

    The first time you run this command, you're prompted to authenticate with your GitHub or Microsoft account. The tunnel requires authentication by default for security.

1. After the tunnel is running, open <https://insiders.vscode.dev/agents> in a browser on any device.

1. Sign in with **Continue with GitHub** when prompted. If you're already authenticated, the {% data variables.copilot.agents_window %} loads directly.

1. Your tunnel host appears in the hosts bar at the top of the window. Select it to connect.

1. Choose a folder on the remote machine, select an agent, and start a session.

### Host management

The hosts bar in the browser-based {% data variables.copilot.agents_window %} shows your available tunnel hosts. Each host displays its connection status:

* **Online**: the host is reachable and you can start or continue sessions on it.
* **Offline**: the tunnel on the host is not running. Start the tunnel on the host to bring it back online.

You can connect and disconnect from hosts directly through the hosts bar. If a host goes offline while you have an active session, the session shows a disconnected state. When the host comes back online, the session reconnects automatically.

## Related resources

* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - agent-first workflows across multiple projects.
* [Choose an agent harness](/docs/agents/run/agent-harnesses.md) - compare harnesses, execution environments, and isolation options.
* [Developing with Remote Tunnels](/docs/remote/tunnels.md) - set up and manage dev tunnels.
* [Security](/docs/agents/run/security.md) - trust boundaries and security considerations.
