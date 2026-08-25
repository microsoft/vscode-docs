---
Order: 137
TOCTitle: The Agent Host
PageTitle: "Introducing the Agent Host for persistent, portable agent sessions"
MetaDescription: Explore how the VS Code Agent Host and AHP support multiple agent harnesses with durable, synchronized local and remote sessions.
MetaSocialImage: remote-agent-hosts.png
Date: 2026-08-26
Author: Rob Lourens, Connor Peet, Brigit Murtaugh
Keywords: [agent host, agent host protocol, ahp, agent harness, persistent agent sessions, remote agent sessions, github copilot, ai agents]
---

# Introducing the Agent Host for persistent, portable agent sessions

August 26, 2026 by [Rob Lourens](https://github.com/roblourens), [Connor Peet](https://github.com/connor4312), and [Brigit Murtaugh](https://github.com/bamurtaugh)

When you assign work to an agent, it should just continue its work, even when you're not actively watching. Whether you switch to another agent session, move between the editor and the [Agents window](https://code.visualstudio.com/docs/agents/agents-window), or connect remotely from another machine or the browser, you should be able to monitor and interact with that session.

We're introducing the **Agent Host**, a self-contained process that owns agent sessions, and the open [Agent Host Protocol (AHP)](https://microsoft.github.io/agent-host-protocol/) for connecting hosts and clients. Together, they enable sessions to continue after you close the folder or editor window where they started, stay synchronized across clients, run locally or remotely, and support multiple agent harnesses without losing their distinct capabilities.

In this post, we'll explain why we built the Agent Host, what it enables in VS Code (and how you can try it), how its architecture works, and how AHP opens that architecture to other clients.

<video src="agent-host-vscode.mp4" title="Video showing an Agent Host session continuing across folders, VS Code surfaces, and remote connections." controls></video>

## Why we built the Agent Host

In late 2025, we added support for [closing a local agent chat and keeping it running in the background](https://code.visualstudio.com/updates/v1_107#_local-agent-sessions-remain-active-when-closed). That made it possible to run multiple sessions in parallel or focus on another task while you were in VS Code. The next step was enabling those sessions to continue after you closed the folder where they started and to move across VS Code surfaces.

Aside from supporting long-running sessions, we set out to adopt the [GitHub Copilot SDK](https://github.com/github/copilot-sdk) for the Copilot harness in VS Code. Using the SDK gives Copilot a more consistent harness behavior and functionality across Copilot CLI, the standalone GitHub Copilot app, and other Copilot products.

Bringing these efforts together gave us an opportunity to reevaluate how we run agent harnesses in VS Code. An [agent harness](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses) assembles context, provides tools, runs the agent loop, and applies changes. Without the Agent Host, VS Code runs the local agent harness in each editor window's extension host, the process that VS Code uses to run extensions such as GitHub Copilot Chat. The extension host isolates extension code from the core editor, however it also ties the agent runtime to one VS Code window. Closing that window stops the runtime. As a result, each window loads its own agent infrastructure.

Moving session state, harness adapters, and baseline workspace capabilities into a dedicated process changes that boundary. The extension host is no longer in the critical path for baseline agent work, and multiple windows can connect to one host instead of each loading a separate runtime. VS Code still communicates with the host, and tools contributed by a client still route back to that client, but the session itself no longer depends on the specific folder or editor window where it started.

This separation also gives VS Code a common foundation for multiple agent harnesses while preserving what makes each one distinct. Earlier this year, we introduced the [Claude Agent](https://code.visualstudio.com/updates/v1_109#_claude-agent-preview) using Anthropic's official harness. Copilot and Claude can retain their own SDKs, agent loops, tools, and provider-specific capabilities, while the Agent Host and AHP give them a consistent session experience in VS Code.

## What the Agent Host enables

The Agent Host is enabled in the latest VS Code Stable and [Insiders](https://code.visualstudio.com/insiders/). Because the Agent Host owns the session, you can start working with an agent in an editor window and continue with the same live session in the [Agents window](https://code.visualstudio.com/docs/agents/agents-window). Both surfaces stay synchronized, so you can monitor progress and interact with the session wherever you prefer without creating a copy.

The separation between clients and hosts also enables remote sessions. The Agent Host can run with your workspace on another machine while you connect from the desktop or [web](https://code.visualstudio.com/docs/agents/run/remote-agent-sessions#_use-the-agents-window-in-the-browser) to check progress, review changes, and manage sessions. Learn more about [remote agent sessions](https://code.visualstudio.com/docs/agents/run/remote-agent-sessions), including setup instructions for SSH, dev tunnels, and the web.

![Diagram showing a VS Code client connected to a local Agent Host and remote Agent Hosts over dev tunnels and SSH.](remote-agent-hosts.svg)

Try this workflow to experience how a session continues after you close its folder and stays in sync across VS Code surfaces:

1. Open a folder in an editor window, select **Copilot** from the harness picker, and start an agent session as you normally would.

   ![Screenshot showing the Copilot harness selected from the editor window harness picker.](agent-host-harness-dropdown-editor.webp)

1. While the agent is working, close the folder but keep VS Code running. The active turn continues in the Agent Host even though that folder is no longer open.

   > **Note:** Closing a folder does not quit VS Code. For local sessions, VS Code must remain running because it manages the local Agent Host.

1. Reopen the folder and return to the session. Its state and progress are still there.

1. Open the [Agents window](https://code.visualstudio.com/docs/agents/agents-window) to monitor the same live session. You can work with it from the editor and Agents window without creating a copy, and updates appear in both.

1. To try a remote connection, connect the Agents window to a remote Agent Host and start or open a session. Then open [insiders.vscode.dev/agents](https://insiders.vscode.dev/agents), select the same host, and continue the session from your browser.

   ![Screenshot showing SSH and Tunnels options in the Remote workspace picker in the Agents window.](agents-window-remote.png)

## How the pieces fit

The **Agent Host** is a dedicated process that owns sessions. It can run locally as a VS Code utility process or remotely as a standalone server. In either case, it remains active across many editor sessions. Previously, we could rely on direct IPC between the extension host and editor window, but a persistent process that could communicate with multiple versions of VS Code necessitates a standardization in how we talk about agents. The **Agent Host Protocol (AHP)** is that standardization.

![Diagram showing VS Code clients communicating with the Agent Host, which uses SDKs to run different agent harnesses.](agent-host-arch.svg)

When the host runs on the same machine as VS Code, all editor windows and the Agents window connect to the single host process. In AHP terms, those windows are clients and the Agent Host plays the server role. VS Code bundles our own implementation of an Agent Host and our UI is a client, but other applications can implement either side of the same agnostic protocol. Clients can also contribute tools based on their own capabilities.

The Agent Host is designed to support different harnesses. Each harness retains its own agent loop and capabilities, while an adapter translates its events into the common AHP session model. Here are two examples of how this works:

* The **Copilot harness** is powered by the [GitHub Copilot SDK](https://github.com/github/copilot-sdk), which manages its runtime as a child process.
* The **Claude harness** loads Anthropic's Claude Agent SDK. Its adapter maps sessions, tools, permissions, and subagents into AHP while retaining features such as slash commands and hooks.

AHP standardizes the client-facing session, not how an agent reasons, manages context, or calls tools. Learn more about [choosing an agent harness in VS Code](https://code.visualstudio.com/docs/agents/run/agent-harnesses).

## Why an open protocol?

Most agent protocols describe a one-to-one conversation between a client and an agent. [AHP](https://microsoft.github.io/agent-host-protocol/guide/what-is-ahp) solves a different problem: coordinating multiple independent clients around the same long-running agent session. The host owns the authoritative, agent-agnostic state, while connected clients can observe progress, contribute actions, approve tool calls, or cancel work.

AHP is deliberately [state-first](https://microsoft.github.io/agent-host-protocol/guide/doctrine#ahp-is-state-first). Rather than expose harness-specific backend events, the host translates them into durable, display-ready state and ordered Redux-like actions. Clients can optimistically apply an action and reconcile it with the host's sequenced response, then replay missed actions gracefully on reconnection.

The state is opinionated to reflect which user experience clients should present, and it avoids going into implementation details. For example, while our Agent Host drives changes through local git and GitHub, this is modeled as the generic concept of [changesets](https://microsoft.github.io/agent-host-protocol/guide/changesets.html). Implementations can operate on other representations - for example, in-memory virtual file systems like those used on [vscode.dev](https://vscode.dev/) or by the [GitHub Repositories extension](https://code.visualstudio.com/docs/sourcecontrol/github#_github-repositories-extension).

All protocol functionality is exposed as URI-addressable [channels](https://microsoft.github.io/agent-host-protocol/guide/what-is-ahp#channels-the-core-abstraction), including sessions, chats, terminals, and changesets. When a client subscribes, it receives a snapshot of the current state followed by an ordered stream of actions. Shared reducers apply those actions consistently, so an editor, the Agents window, and a browser client converge on the same view without each client having to understand the harness's SDK or session model.

![A diagram showing an example of AHP messages broadcast by a host.](ahp-messages.svg)

While AHP handles these coordination challenges, we also want it to be straightforward to implement. At the coarsest level, clients and hosts choose which channels they implement beyond the basic session and chat channels, and negotiate capabilities for finer-grained control. As we add functionality, it will continue to compose into the protocol - providing richer experiences for setups that expose it without adding burden for new clients and hosts.

## Build your own AHP client

Because AHP is open, you can build clients that connect to an Agent Host to monitor session progress, review changes, approve tool calls, and contribute tools based on the client's capabilities.

To get started, run `code agent host` (or `code-insiders agent host` for Insiders) to start a standalone Agent Host on your machine. Then connect to it with one of the AHP client libraries:

| Language | Package | Source |
| --- | --- | --- |
| Rust | [`ahp`](https://crates.io/crates/ahp), [`ahp-types`](https://crates.io/crates/ahp-types), and [`ahp-ws`](https://crates.io/crates/ahp-ws) | [Rust client source](https://github.com/microsoft/agent-host-protocol/tree/main/clients/rust) |
| TypeScript | [`@microsoft/agent-host-protocol`](https://www.npmjs.com/package/@microsoft/agent-host-protocol) | [TypeScript client source](https://github.com/microsoft/agent-host-protocol/tree/main/clients/typescript) |
| Kotlin | [`com.microsoft.agenthostprotocol:agent-host-protocol`](https://central.sonatype.com/artifact/com.microsoft.agenthostprotocol/agent-host-protocol) | [Kotlin client source](https://github.com/microsoft/agent-host-protocol/tree/main/clients/kotlin) |
| Go | [`github.com/microsoft/agent-host-protocol/clients/go`](https://pkg.go.dev/github.com/microsoft/agent-host-protocol/clients/go) | [Go client source](https://github.com/microsoft/agent-host-protocol/tree/main/clients/go) |
| Swift | [Swift Package Manager: `microsoft/agent-host-protocol`](https://github.com/microsoft/agent-host-protocol) | [Swift client source](https://github.com/microsoft/agent-host-protocol/tree/main/clients/swift/AgentHostProtocol) |

See the [AHP client library table](https://github.com/microsoft/agent-host-protocol#client-libraries) for current versions and additional clients.

## Follow along and share feedback

VS Code's Agent Host implementation and the AHP specification are under active development, and new capabilities continue to roll out. Follow the [Agent Host architecture documentation](https://code.visualstudio.com/docs/agents/concepts/agent-host) for current VS Code behavior. To follow AHP's design or share feedback on the protocol overall, explore the [AHP documentation](https://microsoft.github.io/agent-host-protocol/) and [source repository](https://github.com/microsoft/agent-host-protocol).

As you run agents through the Agent Host in VS Code, please share your feedback with us in the [VS Code repository](https://github.com/microsoft/vscode/issues).

Happy coding! 💙
