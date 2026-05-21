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

Before you start, install VS Code and sign in to GitHub Copilot. For cloud partner agents, make sure they are enabled in your GitHub Copilot settings. For Codex, install the OpenAI Codex extension.

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

For Claude, you can also use its slash commands, such as `/agents`, `/hooks`, and `/memory`.

For Codex, install the OpenAI Codex VS Code extension and open the Codex view or the Codex tab in chat.

![Screenshot showing session type dropdown with Claude agent option selected.](../../docs/copilot/images/third-party-agents/claude-agent-new-chat.png)

![Screenshot showing session type dropdown with Codex agent option selected.](../../docs/copilot/images/third-party-agents/codex-agent-new-chat.png)

## Enable cloud partner agents

Before you can use cloud partner agents, enable them in your GitHub Copilot settings in GitHub. Once they are enabled, they appear in the VS Code session picker.

![Screenshot showing cloud agent partner selection picker in chat input.](../../docs/copilot/images/third-party-agents/partner-agent-cloud-chat.png)

## Choose the right permission mode

Third-party agents can run with different permission modes, depending on the provider. Pick the mode that matches the task and your risk tolerance. For sensitive work, keep approval in the loop and combine the agent with sandboxing when possible.

## Learn more about Claude and Codex

Claude sessions use Anthropic's Claude Agent SDK and are available through your Copilot subscription. Codex sessions use the OpenAI Codex extension and support the same editor-centric workflow.

Use either provider when you want to stay in VS Code and still take advantage of a third-party agent's own model and harness.

![Screenshot showing Claude agent permission mode options.](../../docs/copilot/images/third-party-agents/claude-agent-permission-modes.png)

## Why this matters

Third-party agents let you keep your coding workflow in one place while still using provider-specific capabilities. That reduces context switching and keeps debugging, testing, and editing inside VS Code.

## What's next

You now have the four course topics covered. The next step is to fill in each page with the final transcript details, screenshots, and video embeds.

## Learn more

* [Third-party agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
* [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)
* [Security considerations](https://code.visualstudio.com/docs/copilot/security)
