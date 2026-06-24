---
ContentId: 1e2d3c4b-5a6f-4d7e-8c9b-0a1b2c3d4e06
DateApproved: 05/21/2026
MetaDescription: Start Claude and Codex agent sessions in VS Code and choose local or cloud workflows for coding tasks.
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

<!-- IMAGE PLACEHOLDER - YouTube thumbnail embed showing the Customization UI -->
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/watch?v=OWYQ8Mn7KqE" title="Third Party Agents" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Third-party agents let you use provider-specific agent experiences inside VS Code. In this guide, you will choose between local and cloud sessions, start a Claude or Codex session, and pick a permission mode that matches the task.

## Prerequisites

Before you start, install VS Code, enable AI features, and sign in to GitHub Copilot. For cloud partner agents, follow the GitHub documentation to enable third-party coding agents for your account. You do not need the provider's VS Code extension for cloud partner agents. For local Codex sessions, install the OpenAI Codex extension.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## Choose the session type

Third-party agents come from providers such as Anthropic and OpenAI. VS Code uses the provider's SDK and agent harness, while keeping the session in the VS Code chat experience.

Cloud-based third-party agents are currently in preview.

Before starting, decide which kind of session fits the task.

| Session type | Use it when | Example |
| --- | --- | --- |
| Local third-party agent | You want the provider agent to work directly in your local workspace. | Ask Claude to refactor a small module and run local tests. |
| Cloud partner agent | You want a provider agent to work in a cloud session through your Copilot setup. | Hand off a longer coding task that can run away from your editor. |
| Built-in VS Code agent | You want the standard VS Code agent with your current tool selection and customizations. | Make a focused edit using selected tools and approvals. |

Use third-party agents when you specifically want the provider's agent behavior or SDK. Use the built-in VS Code agent when the task mainly depends on VS Code tools, custom agents, tool sets, or the approval model you already configured.

## Start a Claude session

Try Claude with a contained task first, such as asking it to inspect a small feature and propose a plan.

1. Open the Chat view.

1. Select **New Chat**.

1. For a local session, choose **Claude** from the **Session Type** dropdown.

1. For a cloud session, choose **Cloud** from the **Session Type** dropdown, then choose **Claude** from the **Partner Agent** dropdown.

1. Send a prompt that defines the desired scope.

```prompt
Inspect the current branch and propose a plan for one small refactor. Do not edit files yet.
```

![Screenshot showing session type dropdown with Claude agent option selected.](../images/agents/claude-agent-new-chat-1.121.png)

Starting with a planning prompt gives you a low-risk way to see how the provider agent approaches the repository before it changes files.

## Start a Codex session

Use Codex when you want OpenAI Codex agent behavior for a coding task. Cloud Codex sessions use the cloud partner flow. Local Codex sessions require the [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension and a Copilot Pro+ subscription for authentication.

1. Open the Chat view.

1. Select **New Chat**.

1. For a local session, choose **Codex** from the **Session Type** dropdown.

1. For a cloud session, choose **Cloud** from the **Session Type** dropdown, then choose **Codex** from the **Partner Agent** dropdown.

1. Send a focused coding task.

```prompt
Find one failing or missing test around the current change, add the smallest useful test, and explain how to validate it.
```

## Claude agent slash commands

Inside a Claude session, type `/` in the chat input to see the available commands.

| Slash command | Description |
| --- | --- |
| `/agents` | Wizard for creating and managing Claude sub-agents. |
| `/hooks` | Configure lifecycle hooks that run at key points during a session. |
| `/memory` | Open and edit the `CLAUDE.md` memory file used across sessions. |
| `/init` | Initialize a new `CLAUDE.md` memory file for the project. |
| `/pr-comments` | Get comments from a pull request. |
| `/review` | Review code changes in a pull request. |
| `/security-review` | Run a security review on pending changes. |

Try one command after you start a Claude session. For example, use `/review` when you want Claude to inspect pending changes, or use `/init` when you want it to create project memory for future Claude sessions.

## Enable cloud partner agents

Before you can use cloud partner agents, enable third-party coding agents for your GitHub Copilot account by following the GitHub documentation.

After third-party coding agents are enabled for your account, return to VS Code and start a session with Claude or Codex from the chat agent picker.

## Choose the right permission mode

Claude agent runs with one of three permission modes that you can pick from the chat input:

* **Edit automatically**: Claude makes workspace changes autonomously as it works.
* **Request approval**: Claude asks for your review before making changes.
* **Plan**: Claude outlines its intended approach before starting work.

Pick the mode that matches the task:

* Use **Plan** when you are exploring an unfamiliar area or want to review the approach first.
* Use **Request approval** when the agent can edit files, but you want to approve changes before they land.
* Use **Edit automatically** for contained work where you are comfortable reviewing the final diff after the agent iterates.

For sensitive work, keep approval in the loop and combine the agent with sandboxing when possible.

![Screenshot showing Claude agent permission mode options.](../images/agents/claude-agent-permission-modes.png)

> [!CAUTION]
> The `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` setting bypasses all permission checks. Only enable it in isolated sandbox environments with no internet access.

## Compare the result

Run the same small planning prompt in two places:

1. Start with the built-in VS Code agent.

1. Run the same prompt in Claude or Codex.

1. Compare the plan, tool use, and amount of control you had during the session.

This comparison helps you decide when a provider-specific agent adds value and when the built-in agent is enough.

## Why this matters

Third-party agents let you keep your coding workflow in one place while still using provider-specific capabilities. The practical choice is not "which agent is best," but which session type fits the work, risk, and amount of review you want.

## What's next

You now have the four course topics covered. Review the tool choices, MCP server setup, plugin packaging, and third-party agent session types, then apply the smallest setup that fits your next real task.

## Learn more

* [Third-party agents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
* [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)
* [Security considerations](https://code.visualstudio.com/docs/copilot/security)