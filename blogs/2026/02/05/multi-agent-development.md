---
Order: 126
TOCTitle: Multi-Agent Development
PageTitle: "Your Home for Multi-Agent Development"
MetaDescription: VS Code has become the unified interface for all your coding agents. Manage local, background, and cloud agents in one place, use Claude and Codex agents alongside Copilot, and benefit from open standards like MCP and Agent Skills.
MetaSocialImage: your-agent-ux.png
Date: 2026-02-05
Author: VS Code Team
---

# Your Home for Multi-Agent Development

February 5, 2026 by VS Code Team, [@code](https://x.com/code)

Agents are everywhere. We've been working to make VS Code the home for multi-agent development. One place to run your agents, manage your sessions, and pick the right tool for each task, without switching editors or juggling subscriptions.

With the [January 2026 release (1.109)](https://aka.ms/VSCode/109), we're taking the biggest step forward since we laid out that vision at GitHub Universe last year. You can now run Claude and Codex agents directly alongside GitHub Copilot. Start them as local agents when you need fast, interactive help, or delegate async to a cloud agent for longer-running tasks. We've also made updates to the Agent Sessions view, your single place to manage your agents.

## Manage all your agents

The agent landscape keeps moving fast. We're all still figuring out how to work with agents. Fire-and-forget when the task is clear, hands-on when you want control, or somewhere in between; it depends on the task, and it changes. Either way, more agents mean more sessions to keep track of.

The Agent Sessions view gives you one place to see all your agent sessions—local, background, cloud—and move between them as you work.

Kick off a cloud agent for a well-defined refactor, then jump into a local session for something more exploratory. Monitor a background task or let it run as you work on something else.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BsAHunfVwNs?si=6m4vsMuc2Wb0YRpb" title="Video showing the unified agent experience." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The above demo illustrates how developers are constantly tackling multiple things at once: planning improvements, building features, reviewing results, debugging errors. For each moment, you need to pick the right tool: local when needing to steer, background or cloud when wanting isolated changes, parallel subagents when needing multiple processes.

Here’s a quick overview to help you decide when to use local, background, or cloud agents:

| Criteria | Local | Background | Cloud |
|----------|-------|------------|-------|
| Where it runs | Your machine | Your machine (CLI) | Remote infrastructure |
| Interaction style | Interactive | Unattended (async) | Unattended (async), Autonomous |
| Team visibility | No | No | Yes (PRs/issues) |
| Isolation | No (direct workspace) | Yes (worktrees) | Yes (remote) |

Now that you can run multiple agent types, the next question is which agents to use.

## Your agent, your choice

With 1.109, you can run Claude and Codex agents: locally, or in the cloud, all under your same GitHub Copilot subscription.

Codex has been available as a local agent [for a few months](https://code.visualstudio.com/blogs/2025/11/03/unified-agent-experience). Claude is new. It uses the official Claude Agent harness by Anthropic, so you get the same prompts, tools, and overall architecture as other Claude implementations.

![Screenshot of the Sessions Type picker in VS Code, showing the Claude and Codex agent options.](local-agents.png)

GitHub also [just announced Claude and Codex agent support](https://github.blog/changelog/2026-02-04-claude-and-codex-are-now-available-in-public-preview-on-github/). Copilot Pro+ and Enterprise subscribers can use them in VS Code as cloud agents today.

![Screenshot of the Partner Agents picker in VS Code, showing options for Claude and Codex.](cloud-agents.png)

> [!NOTE]
> Enable or disable support for Claude agent sessions with the `setting(github.copilot.chat.claudeAgent.enabled)` setting.
>
> Prerequisites for the Codex local agent: a Copilot Pro+ subscription and the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt).

The beauty of this unified approach is that all these agents show up in the same Agent Sessions view. You can delegate tasks between them, compare their outputs, and pick the right tool for each job.

## Orchestrate with subagents

Running multiple agents is one thing. Getting them to work together is another.

Let's say you're adding a new feature and your agent needs to research authentication patterns, check how similar features are structured in your codebase, AND scan the relevant docs. Doing this sequentially eats up time and adds a lot of context that makes it hard for the agent to focus on what's important.

[Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents) solve this. They're context-isolated agents that run independently from your main session—your main agent delegates work and only the final result flows back. The intermediate exploration stays contained, keeping your primary context clean.

What's new this release: VS Code can now run multiple subagents in parallel. Fire off multiple tasks at once, get results faster, and save premium requests in the process.

We've also added better visibility into what subagents are doing. You can see which tasks are running, which agent is being used, and expand any subagent to see the full prompt and result.

<video src="subagents-clip.mp4" title="Video demonstrating parallel subagents in VS Code." autoplay muted controls></video>

Combine this with [custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents) to give each subagent specialized behavior: a research agent with read-only access and web search tools, an implementation agent with full editing capabilities, a security agent focused on vulnerability scanning. Define the tools, instructions, and model for each. Use [handoffs](https://code.visualstudio.com/docs/copilot/customization/custom-agents#_handoffs) to create workflows that transition from plan to implement to review—all orchestrated from your main session.

## Building on open standards

More agents, more ways to use them. But agents are only as useful as you can make them for your workflow.

That's where open standards come in.

[MCP Apps](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support) landed last week. This is the first official MCP extension, and it lets tool calls return interactive UI components that render directly in chat: dashboards, forms, visualizations, multi-step workflows. This creates opportunities for a richer and more effective human-agent collaboration. VS Code is the first major AI code editor with full MCP Apps support, and we're so excited to see what the community builds.

<video src="mcp-apps-wide-demo.mp4" title="Video demonstrating MCP Apps in VS Code." autoplay muted controls></video>

We've also made [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills), Anthropic's open standard for extending AI agents, generally available. Skills are specialized capabilities that help agents produce high-quality outputs—they provide tested instructions for domains like testing strategies, API design, or performance optimization. Extension authors can now even package and distribute skills with their extensions using the `chatSkills` contribution point. This means the ecosystem can share specialized AI capabilities the same way it shares code snippets and themes.

## VS Code: your unified agent experience

Agents are changing how we work. You shouldn't have to pick just one, or switch tools every time something new comes along. With VS Code, you can run the agents you want, extend them with open standards, and manage it all from one place.

A year ago, we were just introducing agent mode. Now you've got Copilot, Claude, and Codex running side by side and SO much more. We're building this alongside you, and your feedback shapes what comes next. Drop us an issue in the [VS Code repo](https://github.com/microsoft/vscode/issues) or find us on social. We're just getting started.

Want to see these features demoed live? Join us for [Agent Sessions Day](https://youtube.com/live/tAezuMSJuFs) on February 19th!

Happy coding!
