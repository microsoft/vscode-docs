---
ContentId: 5b1e6f94-2c73-4a80-9d15-7f3c8e2a6b41
DateApproved: 10/7/2026
MetaDescription: Compare agent harnesses in {% data variables.product.prodname_vscode %}, select one for a session, and review provider requirements.
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- copilot harness
- session target
- claude
- codex
- "{% data variables.copilot.copilot_cloud_agent_short %}"
---

# Choose an agent harness

{% data variables.product.prodname_vscode_shortname %} supports multiple agent harnesses, each with its own tools, customizations, and workflows. An agent harness coordinates the language model, context, and tools that an agent uses to complete your task.

Use this guide to compare the available options, identify which harness your session uses, select a harness or the Cloud execution target, and review its setup requirements.

For a deeper explanation of how harnesses work and differ from models and hosts, [learn about agent harness concepts](/docs/agents/concepts/agent-harnesses.md).

<a name="choose-a-session-target"></a>

## Compare agent harnesses

Start with **Copilot** for day-to-day coding and agent tasks. Choose another target when you need its tools, customizations, or execution workflow.

| Session target | What runs | What this means for your work |
|----------------|-----------|-------------------------------|
| **Copilot** | Run tasks using the {% data variables.copilot.copilot_sdk_short %}, which provides the shared agent experience across {% data variables.product.prodname_copilot %} products. The agent works in the [Agent Host](/docs/agents/concepts/agent-host.md#session-lifetime-and-client-dependencies). | Sessions run independently of the editor window and can continue in the background after you close it, while the Agent Host stays running. You can also continue sessions across supported interfaces. See [Copilot requirements and limitations](#copilot). |
| **Local** | Run tasks within {% data variables.product.prodname_vscode_shortname %}'s built-in agent harness. The agent works in {% data variables.product.prodname_vscode_shortname %}'s [extension host](/docs/agents/concepts/agent-host.md#local-and-existing-extension-host-sessions). | The agent iterates via chat and works interactively to implement changes in your current workspace. The session is tied to the editor window: closing that window stops the agent's ongoing work. See [Local requirements](#local). |
| **Claude** | The {% data variables.product.prodname_anthropic_claude %} Agent SDK is integrated into {% data variables.product.prodname_vscode_shortname %}. | Sessions use Claude project configuration and provider workflows in your current workspace or an isolated worktree. See [Claude requirements](#claude). |
| **Codex** | {% data variables.product.prodname_openai_codex %} runs through the {% data variables.product.prodname_openai_codex %} extension or the experimental Agent Host integration. | Sessions support interactive or background coding. Available interfaces depend on the integration. See [Codex requirements](#codex). |
| **Cloud** | An available provider harness runs on provider-managed remote infrastructure. Cloud is an execution target, not a single harness. | The selected provider works against a GitHub repository and returns a pull request. The session does not use local editor context. See [Cloud target requirements](#cloud-target). |

For Agent Host sessions managed by desktop {% data variables.product.prodname_vscode_shortname %} on your machine, keep the application running. Closing an editor window is different from quitting the application. Tools provided by a window also require that window to stay connected.

Changing the model or agent role does not change the harness. For example, selecting a Claude model in a Copilot session still uses the Copilot harness. Opening the same session in another supported interface also keeps its harness.

**Local** is a target name, not a synonym for running on your machine. Copilot, Claude, and Codex can also run on your machine.

Available models depend on the harness and how you [access models](/docs/agent-customization/language-models.md), such as through a {% data variables.product.prodname_copilot %} subscription, another supported account, or your own API key. Harness-specific customizations, including [hooks](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session), follow the selected harness.

<a name="start-a-session"></a>

## Select a harness

Select a harness before you submit the first prompt for a session:

1. [Open the {% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or [open the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

1. Select **New Chat** (`+`) in the {% data variables.copilot.chat_view %}, or select **New** in the {% data variables.copilot.agents_window %}.

1. In the {% data variables.copilot.agents_window %}, select the folder or GitHub repository for the session.

1. Open the **Session Target** control and select an available harness or the Cloud target.

    ![Screenshot showing the Session Target control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-session-target.png)

The control only lists targets whose [requirements](#requirements-and-setup) are met in the current window.

<a name="choose-a-built-in-agent-role"></a>

After selecting a harness, choose an available agent role separately. For example, Local sessions provide **Ask** for questions without code changes, **Agent** for autonomous implementation, and **Plan** for researching and planning changes. Switching roles from the agent picker does not change the harness.

<a name="choose-code-isolation"></a>

Your harness choice is separate from where the session changes code. In the {% data variables.copilot.agents_window %}, you can also [choose between a folder and a worktree](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes) or [run a session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

### Identify your current harness

The target picker is not available in every running session. To identify the current harness, open the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list). The list includes the session type, and each session in the {% data variables.copilot.agents_window %} shows its harness.

<!-- TODO: Add a screenshot that identifies the current harness in the sessions list. -->

<a name="configure-an-agent-harness"></a>
<a name="configure-a-harness-or-cloud-target"></a>

## Requirements and setup

Check the accounts, extensions, and settings needed for your chosen target. If a target does not appear in the **Session Target** control, start with its requirements below.

### Copilot

For GitHub sign-in and account requirements, follow the [{% data variables.product.prodname_copilot_short %} setup guide](/docs/setup/copilot.md). Copilot sessions use the same GitHub authentication context as chat in {% data variables.product.prodname_vscode_shortname %}, including your GitHub Enterprise account when configured.

For managed user accounts on GHE.com, complete the setup in [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

Before reusing a Local session's configuration, check [tool availability](/docs/agents/run/tools.md#manage-tool-availability-for-copilot) and [MCP configuration compatibility](/docs/agent-customization/mcp-servers.md#configure-the-mcpjson-file). Copilot sessions don't have access to every built-in or extension-provided tool. The shared SDK runtime also does not imply identical tools, models, permissions, or customizations across products, or that all sessions and personal settings synchronize.

<a name="prefer-copilot-for-new-editor-chat-sessions"></a>

For enterprise SDK Policy Hooks requirements, see [enterprise hook configuration](/docs/enterprise/manage-ai-settings.md#use-the-sdk-harness-for-policy-hooks).

### Local

Local sessions use the models configured in {% data variables.product.prodname_vscode_shortname %}. [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) to use Copilot-provided models, or [configure your own model credentials](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) for a supported model.

Select **Local** in the {% data variables.copilot.chat_view %} and keep the editor window open while the agent works. Local sessions use different [customization settings](/docs/agent-customization/custom-instructions.md) from Copilot sessions.

SDK Policy Hooks are not loaded in Local sessions. Check [hook compatibility](/docs/agent-customization/hooks.md#migrate-hooks-between-harnesses) before reusing hooks from another harness.

<a name="claude-preview"></a>
<a name="third-party-agents"></a>

### Claude

Claude support is enabled by default. Turn it on or off with `setting(github.copilot.chat.claudeAgent.enabled)`.

To use Claude, configure one of these authentication and billing options:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-routed models. Usage is billed through your Copilot subscription.
* **Bring your own key (BYOK)**: use a Claude API key or another supported Claude BYOK option. Usage is billed by your configured provider.

When both options are available, the model picker groups models by **Anthropic** and **Copilot**. The model you select determines the provider and billing method for the next turn. You can switch between BYOK-backed and Copilot-routed models in an existing Claude session.

<a name="use-claude-without-github-sign-in"></a>
<a name="use-claude-without-github-sign-in-experimental"></a>

To use Claude without signing in to GitHub _(Experimental)_, configure a Claude API key or another supported Claude BYOK option. For an Anthropic API key, set `ANTHROPIC_API_KEY` in your environment or in the `env` object in `~/.claude/settings.json`. Learn more about [Claude Code authentication](https://code.claude.com/docs/en/authentication).

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` to open the {% data variables.copilot.agents_window %} while signed out of GitHub. The model picker only shows models from your Claude BYOK configuration until you sign in. After you sign in to GitHub, Copilot-routed models are also available.

See [Claude permission modes](/docs/agents/run/approvals.md#claude-permission-modes) for approval behavior and related cautions.

### Codex

Codex is not listed by default. Choose one of the following integrations. You don't need both.

#### Extension-based integration

To use Codex in the {% data variables.copilot.chat_view %}, install and enable the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt). Follow the extension's documentation for authentication and permissions.

#### Agent Host integration (Experimental)

Enable `setting(chat.agentHost.codexAgent.enabled)` to make Codex available in the {% data variables.copilot.agents_window %} without the {% data variables.product.prodname_openai_codex %} extension.

To also use this integration in the {% data variables.copilot.chat_view %}, enable `setting(chat.editor.codex.preferAgentHost)` and restart {% data variables.product.prodname_vscode_shortname %} when prompted. Only one Codex implementation appears in each window. This setting replaces the Codex target from the OpenAI extension in the {% data variables.copilot.chat_view %}.

Sign in with one of these accounts for the Agent Host integration:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-backed models. This option requires {% data variables.copilot.copilot_pro_plus_short %}.
* **ChatGPT subscription**: open the account menu and select **Sign in to ChatGPT**. A free ChatGPT account is sufficient.

When both accounts are signed in, the model picker groups models by **Copilot** and **ChatGPT**. Your selection determines which subscription is used, and {% data variables.product.prodname_vscode_shortname %} saves that provider with the session.

<a name="use-codex-without-github-sign-in"></a>
<a name="use-codex-without-github-sign-in-experimental"></a>

To use Codex without signing in to GitHub _(Experimental)_, sign in to ChatGPT and enable `setting(chat.agentHost.allowSignedOutWhenUsable)`. The desktop {% data variables.copilot.agents_window %} then shows ChatGPT-backed models while signed out. Copilot-backed models prompt you to sign in to GitHub, and the browser-based {% data variables.copilot.agents_window %} still requires GitHub sign-in.

See [Codex approval presets](/docs/agents/run/approvals.md#codex-approval-presets) for approval behavior and related cautions.

<a name="cloud"></a>

### Cloud target

Cloud sessions require a GitHub repository and access to an available cloud provider. {% data variables.product.prodname_vscode_shortname %} supports the {% data variables.copilot.copilot_cloud_agent %} and Claude and Codex cloud agents (Preview).

To use Claude or Codex in the cloud, turn on support in your Copilot account settings. See [Managing policies for third-party {% data variables.copilot.copilot_cloud_agent_short %}s](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-third-party-coding-agents-in-your-repositories). You don't need the provider's {% data variables.product.prodname_vscode_shortname %} extension for a cloud session.

<a name="start-a-cloud-session"></a>

Select **Cloud** from the **Session Target** control, then choose the cloud provider and, when available, a custom agent and model. In the {% data variables.copilot.agents_window %}, select a GitHub repository when you [start the session](/docs/agents/run/agents-window.md#start-an-agent-session).

Configure tools, MCP servers, and models in the cloud service. Cloud sessions can't use {% data variables.product.prodname_vscode_shortname %} built-in tools or local development context.

<a name="hand-off-a-session"></a>

## Continue with a different harness

A handoff continues an ongoing task with a different harness or execution environment and carries the conversation history and context with it. The tools, permissions, and models might change because the new configuration provides different capabilities.

In a Copilot session, enter `/delegate` to continue a well-scoped task with a cloud agent.

### Hand off from a Local session

Local sessions support changing the session target after work starts. Copilot and Claude sessions, and Codex sessions that use the [experimental Agent Host integration](#codex), can receive these handoffs but do not show a **Session Target** dropdown after the session starts.

To hand off a Local session:

1. Open the session.

1. In the chat input, open the **Session Target** dropdown.

1. Select Copilot, Claude, Codex, or Cloud to continue the work.

{% data variables.product.prodname_vscode_shortname %} carries the conversation history and context to the selected target. To implement a plan or continue it with another supported session, see [planning with agents](/docs/agents/run/planning.md).

Changing a harness is different from starting another conversation or opening the same session in another interface. Learn more about [sessions, forks, and handoffs](/docs/agents/concepts/sessions.md).

## Related resources

<a name="use-copilot-cli-from-the-terminal"></a>
<a name="remote-control-copilot-sessions"></a>

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md), including [continuing in the terminal](/docs/agents/run/sessions/manage-sessions.md#use-copilot-cli-from-the-terminal).
* [Remote control for Copilot sessions](/docs/agents/run/remote-agent-sessions.md#remote-control-copilot-sessions)
* [Approvals and permissions](/docs/agents/run/approvals.md)
