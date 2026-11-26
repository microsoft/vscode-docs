---
ContentId: 6e9a4f2c-8b1d-4d7a-9c3e-5f2a8b4d1e67
DateApproved: 11/26/2026
MetaDescription: Run agent sessions inside project or standalone Dev Containers on this computer or a remote host in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/agents-window/agents-window-ui-annotated.png
Keywords:
- dev containers
- agents
- docker
- container
- isolated environment
- agents window
---
# Work with agents in Dev Containers

Use a Dev Container in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) to run an agent with tools and dependencies inside a container rather than directly on its host. Containers can run on this computer or on a configured SSH, Tunnel, or WSL host. These workflows aren't supported in {% data variables.product.prodname_vscode %} for the Web.

Choose the starting point that fits your task:

* [Use your project's Dev Container](#use-your-projects-dev-container) to work with its existing files and configuration.
* [Create a container without a project](#create-a-container-without-a-project-experimental) for a fresh Ubuntu workspace.
* [Ask the agent to continue in a new container](#ask-the-agent-to-continue-in-a-new-container-experimental) to hand off a task to a new session.

## Use your project's Dev Container

Before starting:

* [Install and run Docker](/docs/devcontainers/containers.md#installation) on the host that contains the folder, with its CLI on `PATH`.
* Add a [Dev Container configuration](/docs/devcontainers/create-dev-container.md) at `.devcontainer/devcontainer.json` or `.devcontainer.json`.
* For remote folders, [configure the connection](/docs/agents/run/remote-agent-sessions.md) to a host that supports Dev Container sessions.

1. Select **New Session** in the {% data variables.copilot.agents_window %}.
1. In the workspace picker, expand the eligible folder's menu and select **Use Dev Container**. The workspace label gains the **- Dev Container** suffix.
1. Choose an available harness and submit your prompt.

To switch back before starting, select **Use This Computer** or **Use Remote Host** from the folder menu. Dev Container sessions edit the container workspace directly and don't support **New Worktree**. For command restrictions, see [sandboxing in Dev Containers](/docs/agents/run/agent-sandboxing.md#use-sandboxing-in-dev-containers).

If startup fails, check the workspace-specific **Dev Container** Output channel. The picker option isn't available for unsupported hosts or folders nested inside another remote environment. Dev Container support is on by default through `setting(chat.agentHost.devContainer.enabled)`.

Idle containers stop after five minutes when no session is working, waiting for input, or holding an unsent draft. Continuing a session restarts the container without losing the conversation. Change the timeout with `setting(chat.agentHost.devContainer.idleTimeout)` (`300` seconds by default, `0` to turn off automatic shutdown). Marking sessions as done or deleting them can still remove the container.

Restarting an existing container is different from rebuilding or replacing it. To keep container-stored chat sessions across replacements, enable `setting(chat.agentHost.devContainer.stateVolume.enabled)` before creating the container. See [Preserve chat sessions across rebuilds](/docs/devcontainers/create-dev-container.md#preserve-chat-sessions-across-rebuilds) `feature(dev-container-state-volume)`, especially the warning about the first rebuild of an existing container.

## Create a container without a project (Experimental)

Create a standalone Ubuntu container when you need a fresh workspace without an existing project folder or `devcontainer.json`. Its files stay in a Docker volume on the machine that runs the container.

Before starting, [install and run Docker](/docs/devcontainers/containers.md#installation) on the intended host, with its CLI on `PATH`. For a remote host, [connect to it](/docs/agents/run/remote-agent-sessions.md) first. For WSL, Docker must be available inside the distribution.

Enable `setting(chat.agentHost.devContainer.environments.enabled)`, which is off by default. Keep `setting(chat.agentHost.devContainer.enabled)` and `setting(chat.remoteAgentHostsEnabled)` enabled.

1. Run **Agents: Manage Remote Environments** from the Command Palette (`kb(workbench.action.showCommands)`).
1. In the search box's **Filter** menu, choose **Group By > Type** to show the **Dev Containers** group.
1. Select **Create Dev Container** on the **Dev Containers** group. If prompted, choose **This Computer** or a connected host.

    To create the container on a specific connected host, you can instead use the create action on that host's row.

1. After the container connects, select **New Session** and choose it in the **Environment** picker.
1. Choose an available harness and submit your prompt.

Standalone containers persist independently of their sessions. The idle timeout and session cleanup described for project-configured containers don't apply. Disconnecting or marking a session as done doesn't delete the container's files.

> [!CAUTION]
> To remove a standalone container, use **Delete** on its row in **Remote Environments**. This deletes the container and its Docker volumes, including workspace files. Save any work you need elsewhere first. Sessions that ran in the deleted container can no longer continue.

To edit or debug the workspace, see [open a standalone container in the editor](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window) for extension and WSL requirements.

## Ask the agent to continue in a new container (Experimental)

To let an agent create a standalone container and continue work there, [enable standalone containers](#create-a-container-without-a-project-experimental) and turn on `setting(chat.agentHost.devContainer.handoff.enabled)`, which is off by default. This also provides the remote session tools. You don't need to separately enable `setting(chat.remoteSessions.tools.enabled)`.

In an [Agent Host-backed session](/docs/agents/concepts/agent-host.md), describe the task and where the container should run. For example:

```prompt
Create a Dev Container on this computer for a Python command-line tool,
then continue implementing the tool in a new session there.
```

Review the container host and the new-session approval before proceeding. By default, the agent creates the container on the current session's host when it supports containers, otherwise on this computer. Name a connected host in your request when its location matters.

The agent starts a new session in the container and links to it from the original conversation. It passes a task summary, not the full conversation history, and doesn't copy the original project's files into the new workspace. The container appears in **Remote Environments** and follows the same persistence and deletion rules as a manually created standalone container.

## Related resources

* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md)
* [Run and manage remote agent sessions](/docs/agents/run/remote-agent-sessions.md)
* [Configure agent sandboxing](/docs/agents/run/agent-sandboxing.md#use-sandboxing-in-dev-containers)
