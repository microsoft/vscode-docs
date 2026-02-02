---
ContentId: 8b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 01/08/2026
MetaDescription: Learn how to use third-party agents like Claude Agent and OpenAI Codex for autonomous coding tasks in VS Code, powered by your Copilot subscription.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- third-party agent
- claude agent
- openai codex
- anthropic
---

# Third-party agents in Visual Studio Code

Third-party agents in Visual Studio Code are AI agents developed by external providers that integrate into the VS Code agent experience. These agents use your existing Copilot subscription and provide alternative approaches to autonomous coding powered by different AI providers. VS Code supports third-party agents that can run either locally or in the background, depending on the provider.

You can manage third-party agent sessions from the unified Chat view in VS Code, just like local, background, and cloud agent sessions.

## Claude Agent (Preview)

Claude agent sessions provide agentic coding capabilities powered by Anthropic's Claude Agent SDK directly in VS Code. The Claude agent operates autonomously on your workspace to plan, execute, and iterate on coding tasks with its own set of tools and capabilities.

Enable or disable support for Claude agent sessions with the `setting(github.copilot.chat.claudeAgent.enabled)` setting.

### Start a Claude agent session

To start a new Claude agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **New Chat** (`+`).

1. Select **Claude** from the agents dropdown

    ![Screenshot showing session type dropdown with Claude agent option selected](../images/third-party-agents/claude-agent-new-chat.png)

1. Enter your prompt and let the agent work on the task

    The Claude agent autonomously determines which tools to use and makes changes to your workspace.

### Claude agent slash commands

The Claude agent provides specialized slash commands for advanced workflows. Type `/` in the chat input box to see the available commands.

| Slash command | Description |
|---------------|-------------|
| `/agents` | Create and manage specialized Claude agents for specific tasks. Define custom agent behaviors through a wizard. Learn more about [Claude sub-agents](https://code.claude.com/docs/en/sub-agents). |
| `/hooks` | Configure lifecycle hooks that execute at key points during Claude agent sessions, such as before or after tool execution. Learn more about [Claude hooks](https://code.claude.com/docs/en/hooks). |
| `/memory` | Open and edit `CLAUDE.md` memory files that provide persistent context to Claude agent across sessions. |
| `/init` | Initialize a new `CLAUDE.md` memory file for your project. |
| `/pr-comments` | Get comments from a pull request. |
| `/review` | Review code changes in a pull request. |
| `/security-review` | Perform a security review of pending code changes on the current branch. |

### Permission modes

Claude agent requests permission before performing certain operations. By default, file edits within your workspace are auto-approved, while other operations like running terminal commands might require confirmation.

You can choose how the agent applies changes to your workspace:

* **Edit automatically**: Claude agent makes changes to your workspace autonomously as it works on the task.
* **Request approval**: Claude agent asks for your review before making changes to your workspace.
* **Plan**: Claude agent outlines its intended approach before starting work on the task.

![Screenshot showing Claude agent permission mode options](../images/third-party-agents/claude-agent-permission-modes.png)

> [!CAUTION]
> The `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` setting bypasses all permission checks. Only enable this in isolated sandbox environments with no internet access.

## OpenAI Codex

The OpenAI Codex agent uses OpenAI's Codex to perform coding tasks autonomously. Codex runs can run interactively in VS Code or unattended in the background.

### Prerequisites

* A Copilot Pro+ subscription for authentication
* The [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension installed from the Visual Studio Marketplace

OpenAI Codex in VS Code enables you to use your Copilot Pro+ subscription to authenticate and access Codex without additional setup. Get more information about [GitHub Copilot billing and premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) in the GitHub documentation.

### Start a Codex session

To start a new OpenAI Codex agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **New Chat** (`+`).

1. Select **Codex** from the agents dropdown

    ![Screenshot showing session type dropdown with Codex agent option selected](../images/third-party-agents/codex-agent-new-chat.png)

1. A chat editor opens for the Codex agent

1. Enter your prompt and let the agent work on the task

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and how to hand off tasks between agents
