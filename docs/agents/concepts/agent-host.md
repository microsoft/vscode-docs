---
ContentId: 9c358671-d18a-4c50-beab-e69beb997ea2
DateApproved: 10/7/2026
MetaDescription: Learn how the {% data variables.product.prodname_vscode_shortname %} Agent Host supports harness sessions across execution environments.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- agent host
- agent host protocol
- ahp
- ai agents
- architecture
- remote agents
- headless agents
- multi-client
---

# Understand the {% data variables.product.prodname_vscode_shortname %} Agent Host

{% data variables.product.prodname_vscode_shortname %} runs supported provider harnesses, including {% data variables.product.prodname_copilot_short %}, Claude, and Codex, in a dedicated process called the Agent Host. {% data variables.product.prodname_vscode_shortname %} communicates with the host through the Agent Host Protocol (AHP). The host owns these sessions independently of the clients that display and control them. The Local harness continues to run in the extension host.

## Why a dedicated Agent Host?

A dedicated Agent Host process for agents provides the following capabilities:

* **Shared sessions**: the editor and the {% data variables.copilot.agents_window %} can display and control the same live session, with updates synchronized between them.
* **Remote execution**: the host can run next to the workspace on another machine while desktop or browser clients connect from elsewhere. The session remains available while the remote machine and host service are available.
* **Independent execution**: an agent session can continue after you close its project folder or originating editor window, while {% data variables.product.prodname_vscode_shortname %} remains running.
* **Multiple agent implementations**: supported provider harnesses share a session experience while preserving their provider-specific capabilities, customizations, and workflows.
* **Dedicated process**: agents run in their own process, where they won't be blocked by busy extensions.

Continuing sessions from other {% data variables.product.prodname_copilot_short %} applications is separate from live synchronization between Agent Host clients. You can [continue supported local repository-associated sessions from {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %} in {% data variables.product.prodname_vscode_shortname %}, or resume a {% data variables.product.prodname_copilot_short %} session in the CLI](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications).

The Local and Agent Host architectures coexist. Local harness sessions run in the extension host and already support background and parallel sessions. The {% data variables.product.prodname_copilot_short %} harness uses its dedicated runtime through the Agent Host. Changing your preferred harness affects new sessions and does not migrate existing Local sessions.

The extension host remains important for extensibility. Extensions can contribute chat customizations such as tools, MCP servers, and custom agents. By default, tools from extensions are only available in chats in an editor window where the extension is running.

![Screenshot showing {% data variables.product.prodname_vscode_shortname %} communicating with extension-host customizations and the Agent Host, which contains adapters for Copilot, Claude, and Codex.](../images/concepts/agent-host-transition.svg)

## Process architecture

The Agent Host can run as a local utility process or as a standalone server on a remote machine. {% data variables.product.prodname_vscode_shortname %} uses a message port for local IPC and AHP JSON-RPC over WebSocket for remote connections.

The first-party agent adapters run inside the Agent Host process. An adapter translates between its agent runtime and the common AHP session model. The underlying runtime does not have to run in the same process as the adapter. The {% data variables.copilot.copilot_sdk %} manages the {% data variables.product.prodname_copilot_short %} runtime as a child process, while the {% data variables.product.prodname_anthropic_claude %} SDK integration uses a different process model.

The Agent Host lives next to the workspace. It can run on your machine, inside a Dev Container, or on a remote machine. File edits and commands run in the environment that contains the host.

## Agent Host Protocol

[Agent Host Protocol](https://microsoft.github.io/agent-host-protocol/) is an open, agent-agnostic protocol between a host and its clients. It uses JSON-RPC for communication and immutable state with pure reducers for synchronized session data.

The host is the source of truth. Each client subscribes to URI-addressed channels for resources such as sessions, chats, terminals, and changesets. The client receives an initial state snapshot followed by ordered actions. If the connection drops, the client reconnects and receives missed actions or a fresh snapshot.

## Self-contained, with optional client tools

The defining Agent Host principle is that the agent can run without a client. A client is a viewer and controller that can come and go. The host therefore includes the baseline capabilities needed to manage sessions and work with the workspace.

Agent Host sessions are not tied to the lifetime of the window for their workspace. You can close the project folder or originating editor window and reopen the session from another window. While {% data variables.product.prodname_vscode_shortname %} and the Agent Host remain running, an active turn can continue without its original client. Quitting local {% data variables.product.prodname_vscode_shortname %} ends locally hosted execution.

Connected clients can also contribute tools. For example, {% data variables.product.prodname_vscode_shortname %} can advertise tools that are provided by the client (like the browser tools) or by installed extensions. The Agent Host adds those definitions to the active session and routes a tool call back to the client that contributed it.

## Local and remote hosts

The desktop {% data variables.copilot.agents_window %} can connect to an Agent Host on the same machine or on a connected SSH, Tunnel, or WSL host. The [browser-based {% data variables.copilot.agents_window %}](/docs/agents/run/remote-agent-sessions.md#use-the-agents-window-in-the-browser) connects to your development machine through a dev tunnel. The browser is a client, not the host that runs the session.

Remote sessions remain available to desktop and browser clients while the remote machine and Agent Host service are available.

![Screenshot showing desktop and browser clients connecting to Agent Hosts. The desktop client can use a host workspace or a Dev Container, while the browser connects to a development machine through a dev tunnel.](../images/concepts/agent-host-deployment.svg)

Clients display and control sessions. The Agent Host owns them. Desktop and browser clients can connect to the same tunnel host.

`feature(agent-host-dev-containers)`

For a Dev Container session, the Agent Host runs inside the project's container. The container can run on your machine or on a supported SSH, Tunnel, or WSL host, while the desktop {% data variables.copilot.agents_window %} remains on your machine. Workspace file edits and commands use the tools and dependencies inside the container, rather than those installed directly on the source host.

Dev Container execution is an environment choice, not a different harness. See the [session execution options diagram](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) for how local, connected-host, container, and cloud execution relate. For setup steps, see [Run an agent session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

Like [{% data variables.product.prodname_vscode_shortname %} Remote Development](/docs/remote/remote-overview.md), the user interface stays on the client while workspace operations run close to the source code and development tools.

To run your own standalone Agent Host, use `code agent host`. By default, the command starts a server on localhost and protects it with a connection token. Use the `--tunnel` option to expose it through a dev tunnel.

## Behavior on the extension host

Local harness sessions run in the extension host. Existing Local sessions continue to run there, even if you choose a different preferred harness for new sessions.

There are some differences in behavior for Local harness sessions:

| Behavior | Difference |
|----------|------------|
| Reviewing changes | Agent Host sessions apply edits directly to the session folder or worktree. Review the resulting diffs and then commit, merge, or discard the changes. Local sessions track edits as pending until you keep or undo them. Learn more about [reviewing AI-generated code edits](/docs/agents/run/review-code-edits.md). |
| Customizations | The Agent Host reads user-level customizations from harness-agnostic folders like `~/.copilot` and `~/.claude`. Customizations stored only in your {% data variables.product.prodname_vscode_shortname %} profile user data are a legacy location that the Copilot agent doesn't read. Learn more about [customizing agent behavior](/docs/agent-customization/overview.md). |
| Hooks | Agent Host does not define one shared hook schema for every agent. The selected Copilot, Claude, or Codex harness executes its provider hook implementation. Local sessions use the Local hook implementation and Local settings. Learn how to [choose the hook implementation for a session](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session). |
| Autopilot | For harnesses that support [Autopilot](/docs/agents/run/approvals.md#how-autopilot-works), Agent Host exposes it as an agent mode. In Local sessions, it's a permission level. |
| Assisted permissions `feature(assisted-permissions)` | The [Assisted permissions](/docs/agents/run/approvals.md#permission-levels) level is available only for supported Agent Host sessions and is off by default in Stable. |
| Session capabilities | Shared multi-window sessions, multiple chats per session, quick chats, and remote hosting are available only on the Agent Host. |
| Extension-provided tools | Tools from extensions are only available in chats in an editor window where the extension is running. |
| MCP configuration | The Agent Host reads harness-agnostic MCP config from `.mcp.json` (workspace) and `~/.copilot/mcp-config.json` (user). It doesn't read `.vscode/mcp.json` directly, but {% data variables.product.prodname_vscode_shortname %} forwards servers you configure in {% data variables.product.prodname_vscode_shortname %} to the Agent Host, except servers that require interactive input (for example, `${input:...}` variables). Learn more about [configuring MCP servers](/docs/agent-customization/mcp-servers.md). |

## Related resources

* [Agent Host Protocol documentation](https://microsoft.github.io/agent-host-protocol/)
* [Agent Host Protocol source repository](https://github.com/microsoft/agent-host-protocol)
* [Agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/concepts/agents.md)
* [Remote agent sessions](/docs/agents/run/remote-agent-sessions.md)
* [{% data variables.product.prodname_vscode_shortname %} Remote Development architecture](/docs/remote/remote-overview.md)
