---
ContentId: 7f1d9a52-3c84-4e17-9a2b-6d5c8e4f0b19
DateApproved: 10/7/2026
MetaDescription: Understand agent harnesses, execution environments, and code isolation in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- local agent
- "{% data variables.copilot.copilot_cloud_agent_short %}"
- worktree
- code isolation
---

# Understand agent harnesses

An agent harness connects a language model to the tools and instructions it needs to complete a task. The harness you select affects the tools, customizations, and workflows that are available in the session.

{% data variables.product.prodname_vscode_shortname %} supports multiple agent harnesses, including {% data variables.product.prodname_copilot_short %}, Claude, Codex, and Local. This choice lets you use the capabilities and provider-specific workflows that fit your task while managing sessions through a shared {% data variables.product.prodname_vscode_shortname %} experience.

The harness, model access, and language model are separate choices. Model access is the account, subscription, or credentials used to access a model, and might involve paid or usage-based billing. In the Language Models editor, configured model-access sources are called model providers. The organization that develops a model can differ from the service that provides access to it.

Each harness supports compatible models and model-access options. Subject to harness availability, account catalog, configuration, and organization policy, {% data variables.product.prodname_copilot %} can supply compatible model access in the {% data variables.product.prodname_copilot_short %}, Claude, Codex, and Local harnesses. Signing in to {% data variables.product.prodname_copilot_short %} does not make every harness available. For example, the Claude harness supports Claude-family models through {% data variables.product.prodname_copilot_short %} or a detected Claude configuration. Choosing a different access source can change authentication and billing, but it does not change the harness.

This article explains how a harness differs from a language model, agent role, execution environment, and code-isolation choice. To select and configure a harness, see [Choose and use an agent harness](/docs/agents/run/agent-harnesses.md).

## How a harness differs from other agent concepts

Several choices determine how an agent works. They work together, but they are not interchangeable:

| Concept | What it determines | Relationship to the harness |
|---------|--------------------|-----------------------------|
| **Model access** | Which account, subscription, or credentials provide access to a model and handle any billing. | Each harness supports compatible access options. Changing the access source does not change the harness. |
| **Language model** | How the agent reasons and generates responses, and which organization developed that model. | Selecting a model retains the harness. The available list also depends on account access, organization policy, mode capabilities, and model visibility. |
| **Agent role** | Which instructions, tools, and behavior apply to a task. Examples include Agent, Plan, Ask, and custom agents. | A role shapes the task behavior within a harness. Changing the role does not replace the harness. |
| **Execution environment** | Where workspace tools run and code changes are made, such as your machine, a connected host, a Dev Container, or cloud infrastructure. | The environment is separate from the harness. Several harnesses can work in the same environment. |
| **Code isolation** | Which working directory receives changes, such as your current folder or a separate Git worktree. | Isolation is separate from the harness and execution environment. Available isolation options depend on the session target and environment. |
| **Session target** | Which harness or cloud target {% data variables.product.prodname_vscode_shortname %} uses for a session. | The **Session Target** UI control lists harnesses and the Cloud target. The workspace picker selects the execution environment separately from the harness. |

## Understand what the harness choice changes

Depending on the harness and your configuration, this choice affects:

* **Tools and capabilities**: which built-in, extension-provided, [MCP](/docs/agent-customization/mcp-servers.md), or provider-specific tools the agent can use.
* **Model options**: which language models the harness offers and how it configures requests to them.
* **Customizations and workflows**: which provider-specific commands, customizations, and session features are available.
* **Permissions**: which approval modes and tool permission settings the harness supports.

The harness choice does not by itself determine where the language model runs or whether code changes go into a folder or worktree. Those choices depend on the models, execution environments, and isolation options that the session target supports.

## Map session targets to harnesses

{% data variables.product.prodname_vscode_shortname %} provides a shared chat, session-management, change-review, and handoff experience across session targets. For supported {% data variables.product.prodname_copilot_short %} sessions, you can also [continue local repository-associated sessions from {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %} in {% data variables.product.prodname_vscode_shortname %}, or resume a session in the CLI](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications). The **Session Target** UI control includes both harnesses and the Cloud execution target.

You can run a {% data variables.product.prodname_copilot_short %}, Claude, or Codex harness session on your machine. **Local** is the name of the built-in {% data variables.product.prodname_vscode_shortname %} harness, not a physical location. A Local session can also work in a Remote Development workspace.

| Session target choice | Harness | Execution environment |
|-----------------------|---------|-----------------------|
| **Copilot, Claude, or Codex** | The corresponding provider harness and its provider-specific capabilities. | Your machine, a connected host, or a Dev Container, depending on the selected workspace and available harness. |
| **Cloud** | The provider harness for the cloud agent that you select, such as Copilot, Claude, or Codex. | The provider's cloud infrastructure, working against a GitHub repository and returning the result through a pull request. |
| **Local** | The built-in {% data variables.product.prodname_vscode_shortname %} harness. It can use built-in tools, extension tools, MCP servers, and models configured in {% data variables.product.prodname_vscode_shortname %}. | Your current workspace. With Remote Development, workspace tools and code changes run in the connected environment as appropriate. |

Cloud is an execution target that groups available cloud agents, not a single provider harness. After you select Cloud, you choose an available cloud agent.

## Relate execution environments and code isolation

The execution environment determines where the session uses workspace tools and changes code. A Dev Container can run on your machine or on a connected host:

* **Your machine**: the session works with a local folder or Git worktree and can access local context, such as test results and terminal output.
* **A connected host**: the session works next to the source code on an SSH, Tunnel, or WSL host. Learn more about [remote agent sessions](/docs/agents/run/remote-agent-sessions.md).
* **A Dev Container**: the session uses the tools and dependencies inside the project's container. The container can be on your machine or on a supported SSH, Tunnel, or WSL host.
* **Cloud infrastructure**: the agent works with a GitHub repository and creates a pull request. It uses the tools and models configured in the cloud service instead of your local {% data variables.product.prodname_vscode_shortname %} environment.

![Screenshot showing session execution options grouped by your machine, a connected SSH, Tunnel, or WSL host, and provider-managed cloud infrastructure. Both your machine and a connected host can run sessions directly on the host or inside a Dev Container.](../images/concepts/session-execution-options.svg)

The diagram shows where sessions work on code, not where you connect from or where the language model runs. See [how clients connect to an Agent Host](/docs/agents/concepts/agent-host.md#local-and-remote-hosts) for desktop and browser access. Harness availability depends on the selected environment.

`feature(agent-host-dev-containers)`

Dev Container sessions require the desktop {% data variables.copilot.agents_window %} and an environment that supports Dev Container execution. Selecting a container in the workspace picker changes the execution environment, not the harness. Learn how to [run a session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

For sessions that offer folder and worktree options, code isolation controls which working directory receives changes. Folder isolation applies edits directly to your current workspace, including its uncommitted changes. Worktree isolation gives the session a separate [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) based on committed Git state. Dev Container sessions work directly in the container workspace and don't support **New Worktree**.

A worktree is a Git code-isolation boundary, not a security boundary. It does not restrict commands, network access, or access to files outside the worktree. Use [agent sandboxing](/docs/agents/run/agent-sandboxing.md) for operating system-level file system and network restrictions.

Changing the session target for ongoing work is one type of [handoff](/docs/agents/concepts/sessions.md#hand-off-a-session). The handoff carries the conversation history and context to the new harness or execution environment. Learn how to [choose a session target and code isolation](/docs/agents/run/agent-harnesses.md).

## Follow a turn through an agent harness

This optional architecture section explains how the pieces work together when you submit a prompt:

1. The harness receives your request and the current session state. It prepares the instructions, context, and available tool definitions for the language model.
1. The language model reasons over that information and returns either a response or a request to call a tool.
1. For a tool request, the harness applies the configured permission and approval rules, routes the call to the environment where the tool runs, and captures the result.
1. The harness returns the tool result to the model. The model decides whether to call another tool, ask for input, or finish the task.
1. The harness associates the messages, tool calls, results, and code changes with the session, and presents the current status in {% data variables.product.prodname_vscode_shortname %}.

The model chooses the actions, while the harness coordinates the system that carries them out.

![Diagram showing an agent harness coordinating the user interface, language model, tools, and conversation state. The model requests actions, while the harness prepares context, applies permissions, coordinates tools, and tracks state.](../images/concepts/agent-harness-relationships.svg)

The diagram shows responsibilities, not process or deployment boundaries. The model and tools can run in different locations from the harness.

### Harness, runtime, and host

The [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#use-the-copilot-harness) uses the {% data variables.copilot.copilot_sdk %} to access the shared {% data variables.product.prodname_copilot_short %} agent runtime. The runtime also powers {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %}. The SDK provides the runtime integration, not a language model or a user interface.

In {% data variables.product.prodname_vscode_shortname %}, the [Agent Host](/docs/agents/concepts/agent-host.md) owns sessions for supported provider harnesses. The Local harness continues to use the extension host. The {% data variables.copilot.chat_view %} and {% data variables.copilot.agents_window %} display and control Agent Host sessions, including sessions that use supported harnesses other than {% data variables.product.prodname_copilot_short %}.

## Related resources

* [Choose and use an agent harness](/docs/agents/run/agent-harnesses.md)
* [Complete your first task with an agent](/docs/agents/quickstart.md)
* [Sessions and handoff](/docs/agents/concepts/sessions.md)
