---
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
DateApproved: 4/15/2026
MetaDescription: Describe what you want to build, and let agents in VS Code plan, implement, and verify the changes across your project.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
- GitHub Copilot
- AI
- agents
- autonomous
- agentic
- multi-file editing
- architecture
- refactoring
- semantic search
- codebase understanding
- enterprise
- inline suggestions
- chat
- MCP
- team
- overview
- getting started
---
# GitHub Copilot in VS Code

GitHub Copilot brings AI agents to Visual Studio Code. Describe what you want to build, and an agent plans the approach, writes the code, and verifies the result across your entire project. Choose from Copilot's built-in agents, third-party agents from providers like Anthropic and OpenAI, or your own custom agents, and run them locally, in the background, or in the cloud. For more targeted changes, inline suggestions and chat give you precise control directly in the editor.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## Agents

An agent is an AI assistant that works autonomously to complete a coding task. Unlike traditional code completion, which suggests the next few lines, an agent takes a goal, breaks it into steps, edits files across your project, runs commands, and self-corrects when something goes wrong.

Give an agent a high-level description of what you want to build and it gets to work. Each task runs inside an **agent session**, a persistent conversation you can track, pause, resume, or hand off to another agent.

<video src="images/overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in VS Code." controls muted></video>

> [!IMPORTANT]
> Your organization might have disabled agents in VS Code. Contact your admin to enable this functionality.

### Plan before you build

Use the built-in **Plan** agent to break a task into a structured implementation plan before writing any code. The Plan agent analyzes your codebase, asks clarifying questions, and produces a step-by-step plan. When the plan looks right, hand it off to an implementation agent to execute it, locally, in the background, or in the cloud.

<video src="images/overview/plan-intro.mp4" title="Video showing the plan agent creating a structured implementation plan for adding authentication to the app." controls muted></video>

Learn more about [planning with agents](/docs/copilot/agents/planning.md).

### Run agents anywhere

Agents run where the work needs to happen. Run them locally in VS Code for interactive work, in the background for autonomous tasks, or in the cloud for team collaboration through pull requests. You can also use third-party agents from providers like Anthropic and OpenAI. At any point, hand off a task from one agent type to another and the relevant context carries over.

![Screenshot showing the sessions type picker in the Chat view with options for local, background, cloud, and third-party agents.](images/agents-overview/sessions-type-picker.png)

Learn more about [agent types and delegation](/docs/copilot/agents/overview.md) or follow the [agents tutorial](/docs/copilot/agents/agents-tutorial.md).

### Manage sessions from a central view

Run multiple agent sessions in parallel, each focused on a different task. The **Sessions** view in the **Chat** panel gives you a single place to monitor all active sessions, whether they run locally, in the background, or in the cloud. See the status of each session, switch between them, review file changes, and pick up where you left off.

<video src="images/overview/agent-sessions-demo.mp4" title="Video showing the agent sessions list, demonstrating filtering, showing, and archiving sessions." controls muted></video>

Learn more about [managing agent sessions](/docs/copilot/chat/chat-sessions.md).

## What can you build

Agents handle coding tasks end-to-end, from a single file change to a full feature shipped as a pull request.

* **Build a feature end-to-end.** Describe a feature in natural language and the agent scaffolds the project, implements the logic across multiple files, and runs tests to verify the result.

* **Debug and fix failing tests.** Point an agent at a failing test and it reads the error, traces the root cause across your codebase, applies a fix, and re-runs the test to confirm. Learn more about [debugging with AI](/docs/copilot/guides/debug-with-copilot.md).

* **Refactor or migrate a codebase.** Ask an agent to plan a migration, for example, from one framework to another, and it applies coordinated changes across files while verifying with builds.

* **Test and interact with web apps.** _(Experimental)_ Ask an agent to open your web app in the [integrated browser](/docs/debugtest/integrated-browser.md), verify a feature works, check for layout issues, or take screenshots. Follow the [browser agent testing guide](/docs/copilot/guides/browser-agent-testing-guide.md).

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

## AI assistance as you type

For smaller changes or when you want more precise control, Copilot assists directly in the editor.

### Inline suggestions

Copilot provides code suggestions as you type, from single-line completions to full function implementations. Next edit suggestions predict the next logical change based on your current edits.

<video src="images/inline-suggestions/nes-video.mp4" title="Video showing inline code suggestions appearing as ghost text in the editor." controls muted poster="./images/inline-suggestions/point3d.png"></video>

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
* **[Agent skills](/docs/copilot/customization/agent-skills.md)**: Teach Copilot specialized capabilities that work across VS Code, GitHub Copilot CLI, and GitHub Copilot cloud agent.
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

> [!IMPORTANT]
> **Starting April 20, 2026**, new sign-ups for Copilot Pro, Copilot Pro+, and student plans are temporarily paused. Additionally, we are tightening weekly usage limits. See [GitHub Copilot usage limits](https://docs.github.com/copilot/concepts/usage-limits).

You can start using GitHub Copilot for free with monthly limits on inline suggestions and chat interactions. For more extensive usage, you can choose from various paid plans.

[View detailed GitHub Copilot pricing](https://docs.github.com/en/copilot/get-started/plans)

## Next steps

* [Quickstart: Get started with GitHub Copilot in VS Code](/docs/copilot/getting-started.md)
* [Tutorial: Get started with agents in VS Code](/docs/copilot/agents/agents-tutorial.md)
* [Customize the AI for your workflow](/docs/copilot/customization/overview.md)
