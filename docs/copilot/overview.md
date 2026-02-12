---
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
DateApproved: 02/04/2026
MetaDescription: Use AI agents in VS Code to autonomously plan, implement, and test code across your project.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
- GitHub Copilot
- AI
- agents
- inline suggestions
- chat
- MCP
- introduction
- overview
- getting started
---
# GitHub Copilot in VS Code

GitHub Copilot adds multi-agent development capabilities to Visual Studio Code. Plan your approach, then let AI agents implement and verify code changes across your project. Run multiple agent sessions in parallel: locally, in the background, or in the cloud. Manage them all from a central view. Inline suggestions, inline chat, and smart actions assist you throughout the rest of the coding workflow.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## Agents and agent sessions

Agents handle complete coding tasks end-to-end. Give an agent a high-level task and it breaks the work into steps, edits files, runs terminal commands, invokes tools, and self-corrects when it hits errors or failing tests. Each task runs inside an **agent session**, a persistent conversation you can track, pause, resume, or hand off to another agent.

<video src="images/overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in VS Code." autoplay loop controls muted></video>

> [!IMPORTANT]
> Your organization might have disabled agents in VS Code. Contact your admin to enable this functionality.

### Manage sessions from a central view

Run multiple agent sessions in parallel, each focused on a different task. The **Sessions** view in the **Chat** panel gives you a single place to monitor all active sessions, whether they run locally, in the background, or in the cloud. See the status of each session, switch between them, review file changes, and pick up where you left off.

<video src="images/overview/agent-sessions-demo.mp4" title="Video showing the agent sessions list, demonstrating filtering, showing, and archiving sessions." autoplay loop controls muted></video>

Learn more about [managing agent sessions](/docs/copilot/chat/chat-sessions.md).

### Run agents anywhere

Agents can run locally in VS Code for interactive work, in the background on your machine for autonomous tasks, or in the cloud for team collaboration via pull requests. You can also use third-party agents from providers like Anthropic and OpenAI. At any point, hand off a task from one agent type to another and the full conversation history carries over.

![Screenshot showing the sessions type picker in the Chat view with options for local, background, cloud, and third-party agents.](images/agents-overview/sessions-type-picker.png)

Learn more about [agent types and delegation](/docs/copilot/agents/overview.md) or follow the [agents tutorial](/docs/copilot/agents/agents-tutorial.md).

### Plan before you build

Use the built-in **Plan** agent to break a task into a structured implementation plan before writing any code. The Plan agent analyzes your codebase, asks clarifying questions, and produces a step-by-step plan. When the plan looks right, hand it off to an implementation agent to execute it, locally, in the background, or in the cloud.

<video src="images/overview/plan-intro.mp4" title="Video showing the plan agent creating a structured implementation plan for adding authentication to the app." autoplay loop controls muted></video>

Learn more about [planning with agents](/docs/copilot/agents/planning.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Plan a feature with agents">
Use the Plan agent to create a structured implementation plan for a new feature.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%2Fplan%20a%20terminal%20UI%20app%20to%20track%20my%20todo%20list.)

</div>

## What can you do

* **Build a feature end-to-end.** Describe a feature in natural language and the agent scaffolds the project, implements the logic across multiple files, and runs tests to verify the result.

* **Debug and fix failing tests.** Point an agent at a failing test and it reads the error, traces the root cause across your codebase, applies a fix, and re-runs the test to confirm. Learn more about [debugging with AI](/docs/copilot/guides/debug-with-copilot.md).

* **Refactor or migrate a codebase.** Ask an agent to plan a migration, for example, from one framework to another, and it applies coordinated changes across files while verifying with builds.

* **Collaborate via pull requests.** Delegate a task to a cloud agent that creates a branch, implements the changes, and opens a pull request for your team to review. Learn more about [cloud agents](/docs/copilot/agents/cloud-agents.md).

## Getting started

### Step 1: Set up Copilot

1. Hover over the Copilot icon in the Status Bar and select **Set up Copilot**.

    ![Screenshot showing the Copilot icon in the Status Bar with the Set up Copilot option.](images/setup/setup-copilot-status-bar.png)

1. Choose a sign-in method and follow the prompts. If you don't have a Copilot subscription yet, you are signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

### Step 2: Start your first agent session

1. Open the **Chat** view (`kb(workbench.action.chat.open)`).

1. Enter a prompt that describes what you want to build, for example:

    ```prompt-agent
    Create a basic Node.js web app for sharing recipes. Make it look modern and responsive.
    ```

1. Review the generated code. The agent creates files, installs dependencies, and runs commands as needed.

1. Enter `/init` to configure your project for AI. This creates [custom instructions](/docs/copilot/customization/custom-instructions.md) that help the agent understand your codebase and generate better code.

For a full hands-on tutorial covering inline suggestions, agents, inline chat, and customization, see [Get started with GitHub Copilot in VS Code](/docs/copilot/getting-started.md).

## More ways to code with AI

### Inline suggestions

Copilot provides code suggestions as you type, from single-line completions to full function implementations. Next edit suggestions predict the next logical change based on your current edits.

<video src="images/inline-suggestions/nes-video.mp4" title="Video showing inline code suggestions appearing as ghost text in the editor." autoplay loop controls muted poster="./images/inline-suggestions/point3d.png"></video>

Learn more about [inline suggestions in VS Code](/docs/copilot/ai-powered-suggestions.md).

### Inline chat

Press `kb(inlinechat.start)` to open a chat prompt directly in the editor. Describe a change, and Copilot suggests edits in place, so you stay in the flow of coding. Use it for targeted refactors, explanations, or quick fixes without switching context.

Learn more about [inline chat in VS Code](/docs/copilot/chat/inline-chat.md).

### Smart actions

VS Code includes predefined AI-powered actions for common tasks: generating commit messages, renaming symbols, fixing errors, and running semantic search across your project.

![Screenshot showing the smart actions menu in VS Code with options to fix a test failure.](images/overview/copilot-chat-fix-test-failure.png)

Learn more about [smart actions in VS Code](/docs/copilot/copilot-smart-actions.md).

## Customize AI for your workflow

Agents work best when they understand your project's conventions, have the right tools, and use a model suited to the task. VS Code gives you several ways to [tailor the AI](/docs/copilot/customization/overview.md) so it produces code that fits your codebase from the start, instead of requiring manual corrections after the fact.

* **[Custom instructions](/docs/copilot/customization/custom-instructions.md)**: Define project-wide coding conventions so the AI generates code that matches your style.
* **[Agent skills](/docs/copilot/customization/agent-skills.md)**: Teach Copilot specialized capabilities that work across VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.
* **[Custom agents](/docs/copilot/customization/custom-agents.md)**: Create agents that assume a specific role, such as a code reviewer or documentation writer, with their own tools and instructions.
* **[MCP servers](/docs/copilot/customization/mcp-servers.md)**: Extend agents with tools from MCP servers or Marketplace extensions.
* **[Hooks](/docs/copilot/customization/hooks.md)**: Execute custom commands at specific events for automation and policy enforcement.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Customize AI">
Explore all the ways to tailor the AI experience to your workflow.

* [Open Customization Overview](/docs/copilot/customization/overview.md)

</div>

## Support

Support for GitHub Copilot Chat is provided by GitHub and can be reached at <https://support.github.com>.

To learn more about Copilot's security, privacy, compliance, and transparency, see the [GitHub Copilot Trust Center FAQ](https://copilot.github.trust.page/faq).

## Pricing

You can start using GitHub Copilot for free with monthly limits on inline suggestions and chat interactions. For more extensive usage, you can choose from various paid plans.

[View detailed GitHub Copilot pricing](https://docs.github.com/en/copilot/get-started/plans)

## Next steps

* [Get started with agents](/docs/copilot/agents/agents-tutorial.md)
* [Hands-on quickstart with GitHub Copilot](/docs/copilot/getting-started.md)
* [Learn about agent types](/docs/copilot/agents/overview.md)
* [Customize the AI for your workflow](/docs/copilot/customization/overview.md)
* [Best practices for using AI in VS Code](/docs/copilot/copilot-tips-and-tricks.md)
* [Set up Copilot in VS Code](/docs/copilot/setup.md)
