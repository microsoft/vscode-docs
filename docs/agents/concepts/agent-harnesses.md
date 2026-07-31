---
ContentId: 7f1d9a52-3c84-4e17-9a2b-6d5c8e4f0b19
DateApproved: 7/31/2026
MetaDescription: Understand how agent harnesses coordinate sessions in VS Code and compare local, cloud, and remote execution with folder or worktree isolation.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- local agent
- cloud agent
- worktree
- code isolation
---

# Agent harnesses

An agent harness is the runtime that runs the [agent loop](/docs/agents/concepts/agents.md#agent-loop). It manages the session, calls [tools](/docs/agents/concepts/tools.md), and applies changes to your code. This article explains how agent harnesses relate to session targets, agent roles, language models, execution environments, and code isolation.

To select and configure a harness, see [Choose and use an agent harness](/docs/agents/agent-harnesses.md).

## Agent harnesses and session targets

**Agent harness** is the industry term for the software that coordinates an agent. **Session Target** is the VS Code control for choosing the harness and execution environment for a session.

For harnesses that run on your machine, the session target directly identifies the harness, such as Copilot, Claude, or Codex. The Cloud target first selects remote execution, and then lets you choose an available cloud provider.

## Separate the session choices

The options in the chat input control different parts of an agent session:

* **Agent harness**: coordinates the agent loop and determines the provider-specific tools and capabilities. Examples include Local, Copilot, Claude, and Codex.
* **Execution environment**: determines where tool calls and code changes run. An agent can run on your machine, a remote machine, or cloud infrastructure.
* **Agent role**: provides instructions, tools, and behavior for a task. Examples include Agent, Plan, Ask, and custom agents.
* **Language model**: provides the reasoning and generates responses. The model might run in a different location from the harness.

The harness passes your prompt and context to the model, executes the model's requested tool calls, returns the results, and continues the loop until the task is complete or requires your input.

## Supported harnesses

VS Code supports multiple harnesses through a shared session experience:

* **Local**: the built-in VS Code harness runs in the extension host and can use VS Code tools, extension-provided tools, MCP servers, and models configured in VS Code.
* **Copilot**: uses the Copilot SDK and runs on the Agent Host.
* **Claude**: uses Anthropic's Claude Agent SDK for local sessions and is also available as a cloud agent.
* **Codex**: uses OpenAI Codex for local sessions and is also available as a cloud agent.

Provider SDKs expose provider-specific capabilities while VS Code supplies common session management, workspace selection, chat, change review, and handoff.

## Where harnesses run

An agent harness can run in these environments:

* **Your machine**: the harness works with a local folder or Git worktree and can access local runtime context, such as test results and terminal output.
* **Cloud infrastructure**: the harness works with a GitHub repository and creates a pull request. It uses the tools and models configured in the cloud service instead of your local VS Code environment.
* **A remote machine**: the harness runs next to the source code on a remote host. You connect to it over SSH or a dev tunnel. Learn more about [remote agent sessions](/docs/agents/remote-agent-sessions.md).

You can [hand off a session](/docs/agents/agent-harnesses.md#hand-off-a-session) when another harness or execution environment is a better fit for the next part of a task.

## Code isolation

When a harness runs on your machine, code isolation determines where it applies changes:

* **Worktree isolation**: VS Code creates a separate [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) for the session. The harness applies changes there until you review and integrate them.
* **Folder isolation**: the harness works directly in your current workspace and applies changes in place.

Worktree isolation requires a Git repository. Isolation also affects [permissions and approvals](/docs/agents/approvals.md) because a worktree keeps agent changes separate from your active workspace.

## Agent harnesses and the Agent Host

The [Agent Host](/docs/agents/concepts/agent-host.md) is a dedicated process for running harnesses independently of the windows that display their sessions. It lets sessions continue in the background, stay synchronized across windows, and run on a remote machine.

## Related resources

* [Choose and use an agent harness](/docs/agents/agent-harnesses.md)
* [How agents work](/docs/agents/concepts/agents.md)
* [Sessions and handoff](/docs/agents/concepts/sessions.md)
* [Language models](/docs/agents/concepts/language-models.md)
* [Agent Host architecture](/docs/agents/concepts/agent-host.md)
