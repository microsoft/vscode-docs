---
ContentId: 1e2d3c4b-5a6f-4d7e-8c9b-0a1b2c3d4e06
DateApproved: 05/21/2026
MetaDescription: Learn how to use third-party agents like Claude and Codex in VS Code with your GitHub Copilot subscription.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - third-party agents
  - claude
  - codex
  - agents
  - copilot
  - preview
---

# Using third-party agents in VS Code

Third-party agents let you use provider-specific agent experiences inside VS Code while keeping your work in the same editor and session flow. This course introduces the available agent types, how to start a session, and what to watch for when you use them.

## Prerequisites

Before you start: you'll need VS Code Insiders installed and the GitHub Copilot and GitHub Copilot Chat extensions set up and signed in. For cloud partner agents, make sure they are enabled in your GitHub Copilot settings. For Codex, install the OpenAI Codex extension.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## What third-party agents are

Third-party agents come from providers such as Anthropic and OpenAI. They use the provider's SDK and agent harness, and they can work locally or in the cloud depending on the provider and your Copilot setup.

Cloud-based third-party agents are currently in preview.

## Why use them

Third-party agents let you keep your workflow in VS Code while using provider-specific capabilities. That gives you:

* The provider's agent behavior and SDK.
* A single chat experience inside the editor.
* The ability to debug, test, and code without switching tools.

## Start a session

Open the Chat view, select **New Chat**, and choose the agent type from the **Session Type** dropdown.

For cloud sessions, first select **Cloud**, then choose the partner agent from the **Partner Agent** dropdown.

![Screenshot showing session type dropdown with Claude agent option selected.](../../docs/copilot/images/third-party-agents/claude-agent-new-chat-1.121.png)

For Codex, install the [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension first. You can then open the Codex view from its activity bar icon or switch to the **Codex** tab in the Chat view.

## Claude agent slash commands

Inside a Claude session, type `/` in the chat input to see the available commands.

| Slash command | Description |
|---------------|-------------|
| `/agents` | Wizard for creating and managing Claude sub-agents. |
| `/hooks` | Configure lifecycle hooks that run at key points during a session. |
| `/memory` | Open and edit the `CLAUDE.md` memory file used across sessions. |
| `/init` | Initialize a new `CLAUDE.md` memory file for the project. |
| `/review` | Review code changes in a pull request. |
| `/security-review` | Run a security review on pending changes. |

## Enable cloud partner agents

Before you can use cloud partner agents, enable them in your GitHub Copilot settings. From github.com, open your profile menu, go to **Copilot settings** > **Cloud Agent**, then turn on the partner agents you want under **Partner Agents**.

You can start a cloud session from the **Agents** tab on a GitHub repository: select the Copilot logo on the **New session** button to choose Claude or Codex.

## Choose the right permission mode

Claude agent runs with one of three permission modes that you can pick from the chat input:

* **Edit automatically**: Claude makes workspace changes autonomously as it works.
* **Request approval**: Claude asks for your review before making changes.
* **Plan**: Claude outlines its intended approach before starting work.

Pick the mode that matches the task and your risk tolerance. For sensitive work, keep approval in the loop and combine the agent with sandboxing when possible.

![Screenshot showing Claude agent permission mode options.](../../docs/copilot/images/third-party-agents/claude-agent-permission-modes.png)

> [!CAUTION]
> The `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` setting bypasses all permission checks. Only enable it in isolated sandbox environments with no internet access.

## Learn more about Claude and Codex

Claude sessions use Anthropic's Claude Agent SDK and are available through your Copilot subscription. Codex sessions use the OpenAI Codex extension and authenticate with a Copilot Pro+ subscription, with no extra setup required.

Use either provider when you want to stay in VS Code and still take advantage of a third-party agent's own model and harness.

## Why this matters

Third-party agents let you keep your coding workflow in one place while still using provider-specific capabilities. That reduces context switching and keeps debugging, testing, and editing inside VS Code.

## What's next

You now have the four course topics covered. The next step is to fill in each page with the final transcript details, screenshots, and video embeds.

## Learn more

* [Third-party agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
* [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)
* [Security considerations](https://code.visualstudio.com/docs/copilot/security)
