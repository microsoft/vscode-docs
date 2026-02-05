---
ContentId: 8b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 02/04/2026
MetaDescription: Learn how to use third-party agents like Claude Agent and OpenAI Codex for autonomous coding tasks in VS Code, powered by your GitHub Copilot subscription.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- third-party agent
- claude
- codex
- anthropic
- openai
- copilot
---

# Third-party agents in Visual Studio Code

Third-party agents in Visual Studio Code are AI agents developed by external providers, such as Anthropic and OpenAI. Third-party agents enable you to use the unique capabilities of these AI providers, while still benefiting from the unified agent sessions management in VS Code and the rich editor experience for coding, debugging, testing, and more. In addition, you can use these providers with your existing GitHub Copilot subscription.

VS Code uses the provider's SDK and agent harness to access the agent's unique capabilities. You can use both local and cloud-based third-party agents in VS Code. Integration with cloud-based third-party agents is enabled through your GitHub Copilot plan.

> [!NOTE]
> Third-party coding agents in the cloud are currently in preview.

## Why use third-party agents?

The benefits of using third-party agents in VS Code are:

* **Use unique capabilities**: Each third-party agent has its own strengths and specialized features. VS Code uses the provider's SDK and agent harness to access these capabilities, letting you choose the best agent for your coding tasks.
* **Unified experience**: Manage all your agent sessions, including third-party agents, from the same VS Code agent experience.
* **Rich editor integration**: Use VS Code's coding features, such as rich debugging and testing in combination with the agent's capabilities.
* **Billing**: Authenticate and manage billing through your existing GitHub Copilot subscription without additional setup.

## Claude Agent (Preview)

Claude agent sessions provide agentic coding capabilities powered by Anthropic's Claude Agent SDK directly in VS Code. The Claude agent operates autonomously on your workspace to plan, execute, and iterate on coding tasks with its own set of tools and capabilities.

Enable or disable support for Claude agent sessions with the `setting(github.copilot.chat.claudeAgent.enabled)` setting.

### Start a Claude agent session

To start a new Claude agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **New Chat** (`+`).

1. Choose between a local or cloud agent session:

    * For a local session, select **Claude** from the **Session Type** dropdown

        ![Screenshot showing session type dropdown with Claude agent option selected.](../images/third-party-agents/claude-agent-new-chat.png)

    * For a cloud session, select **Cloud** from the **Session Type** dropdown. Then, select **Claude** from the **Partner Agent** dropdown.

        ![Screenshot showing cloud agent partner selection picker in chat input.](../images/third-party-agents/partner-agent-cloud-chat.png)

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

![Screenshot showing Claude agent permission mode options.](../images/third-party-agents/claude-agent-permission-modes.png)

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

1. Choose between a local or cloud agent session:

    * For a local session, select **Codex** from the **Session Type** dropdown

        ![Screenshot showing session type dropdown with Codex agent option selected.](../images/third-party-agents/codex-agent-new-chat.png)

    * For a cloud session, select **Cloud** from the **Session Type** dropdown. Then, select **Codex** from the **Partner Agent** dropdown.

        ![Screenshot showing cloud agent partner selection picker in chat input.](../images/third-party-agents/partner-agent-cloud-chat.png)

1. Enter your prompt in the chat editor input and let the agent work on the task

## Frequently asked questions

<details>
<summary>Can I use third-party agents with my existing Copilot subscription?</summary>

Yes, third-party agents in VS Code authenticate and manage billing through your existing GitHub Copilot subscription. For cloud-based third-party agents, follow the steps to enable the agent.

For cloud-based third-party agents, availability might be limited based on your Copilot subscription plan. Check [About Third-party agents](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents) in the GitHub documentation for more information.

</details>

<details>
<summary>How are third-party agents different from using the provider's VS Code extension?</summary>

Both the provider's VS Code extension and the third-party agent integration in VS Code let you use the provider's AI capabilities and agent harness. The difference is in billing: when you use third-party agents in VS Code, GitHub bills you through your Copilot subscription. When you use the provider's extension, you are billed through the provider's subscription.

</details>

<details>
<summary>Why are there two Claude/Codex agents?</summary>

VS Code lets you choose between local and cloud-based third-party agents, depending on the provider's availability. When you select the third-party agent from the **Session Type** dropdown, a local agent session is created for that provider.

To choose a cloud-based third-party agent, first select the **Cloud** option from the **Session Type** dropdown, and then select the provider from the **Partner Agent** dropdown.

</details>

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and how to hand off tasks between agents
* [About Third-party agents](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents): Learn more about third-party agents in the GitHub documentation
