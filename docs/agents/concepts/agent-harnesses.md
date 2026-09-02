---
ContentId: 7f1d9a52-3c84-4e17-9a2b-6d5c8e4f0b19
DateApproved: 9/2/2026
MetaDescription: Understand how agent harnesses in {% data variables.product.prodname_vscode_shortname %} differ from models, roles, execution environments, and code isolation.
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

# Agent harnesses

An agent harness is the runtime that coordinates the [agent loop](/docs/agents/concepts/agents.md#agent-loop). It passes prompts and context to a language model, executes requested [tool calls](/docs/agents/concepts/tools.md), returns the results to the model, and maintains the session as the work progresses.

Choosing a harness affects which provider-specific tools and capabilities are available. It can also affect which models, agent roles, execution environments, and code-isolation options you can use. This article explains how these choices differ. To select and configure a harness, see [Choose and use an agent harness](/docs/agents/run/agent-harnesses.md).

![Screenshot showing the Session Target control in the {% data variables.copilot.agents_window %} with a list of available agent harnesses.](../images/agent-harnesses/agents-window-session-target.png)

## Understand the session choices

The options in the chat input control different parts of an agent session:

* **Agent harness**: coordinates the agent loop and provides provider-specific tools and capabilities. Examples include Local, Copilot, Claude, and Codex.
* **Execution environment**: determines where tools run and code changes are made. An agent can run on your machine, a remote machine, or cloud infrastructure.
* **Agent role**: provides instructions, tools, and behavior for a task. Examples include Agent, Plan, Ask, and custom agents.
* **Language model**: provides the reasoning and generates responses. The model might run in a different location from the harness.

The available roles, models, and execution environments depend on the selected harness, but these choices are not interchangeable. For example, the Local harness can use a supported Claude model configured in {% data variables.product.prodname_vscode_shortname %}. Local remains the harness and Claude is the language model. Selecting the Claude harness instead uses only Claude language models and its provider-specific capabilities.

**Session Target** is the {% data variables.product.prodname_vscode_shortname %} control that combines harness and execution-environment selection. For targets that run on your machine, it directly identifies a harness, such as Copilot, Claude, or Codex. The Cloud target first selects remote execution and then lets you choose an available cloud agent.

## Compare harness types

{% data variables.product.prodname_vscode_shortname %} provides a shared chat, session-management, change-review, and handoff experience across harnesses. Choose a harness based on the capabilities and environment the task requires:

| Type | How it works | Choose it for |
|------|--------------|---------------|
| **Local** | The built-in {% data variables.product.prodname_vscode_shortname %} harness runs in the extension host. It can use built-in tools, extension tools, MCP servers, and models configured in {% data variables.product.prodname_vscode_shortname %}. | Interactive work that needs editor context or a model configured in {% data variables.product.prodname_vscode_shortname %}. |
| **Provider harnesses** | Copilot, Claude, and Codex use provider runtimes and expose provider-specific tools and capabilities. Depending on the provider, they can run on your machine or in the cloud. | Work that benefits from a specific provider's agent workflow or capabilities. |
| **Cloud target** | The target runs an available provider harness on remote infrastructure against a GitHub repository and returns the result through a pull request. | Well-scoped work that can run independently or benefit from team review. |

## Choose where work runs

The execution environment determines where the harness runs tools and changes code:

* **Your machine**: the harness works with a local folder or Git worktree and can access local context, such as test results and terminal output.
* **Cloud infrastructure**: the harness works with a GitHub repository and creates a pull request. It uses the tools and models configured in the cloud service instead of your local {% data variables.product.prodname_vscode_shortname %} environment.
* **A remote machine**: the harness runs next to the source code on a remote host. You connect to it over SSH or a dev tunnel. Learn more about [remote agent sessions](/docs/agents/run/remote-agent-sessions.md).

Changing the session target for ongoing work is a [handoff](/docs/agents/concepts/sessions.md#hand-off-a-session). The handoff carries the conversation history and context to the new harness or execution environment.

## Code isolation

When an agent runs on your machine, code isolation determines which working directory receives its changes. It does not change which harness or model the session uses.

* **Folder isolation**: the agent works directly in your current workspace. The agent sees any uncommitted changes and applies edits in place.
* **Worktree isolation**: {% data variables.product.prodname_vscode_shortname %} creates a separate [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) for the session. The agent runs in the worktree folder and starts from the committed state of the selected base branch. It keeps its changes out of your primary branch until you integrate them.

Worktree isolation requires a Git repository with at least one commit. It is useful for parallel tasks because each worktree has its own checked-out files and uncommitted changes.

> [!IMPORTANT]
> A worktree is a Git code-isolation boundary, not a security boundary. It does not restrict commands, network access, or access to files outside the worktree. Use [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing) when you need operating system-level file system and network restrictions.

Code isolation also affects [permissions and approvals](/docs/agents/run/approvals.md). Learn how to [choose folder or worktree isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation).

## Agent harnesses and the Agent Host

Provider harnesses such as Copilot can run in the [Agent Host](/docs/agents/concepts/agent-host.md), a dedicated process that is independent of the windows displaying their sessions. This separation lets sessions continue in the background, stay synchronized across windows, and run on a remote machine. You don't need to manage the Agent Host directly during normal agent use.

## Related resources

* [Choose and use an agent harness](/docs/agents/run/agent-harnesses.md)
* [Sessions and handoff](/docs/agents/concepts/sessions.md)
* [Language models](/docs/agents/concepts/language-models.md)
