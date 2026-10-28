---
Tags: [Agents, AI, Collaboration, Editor, Engineering, Extensions, GitHub Copilot, Models, Remote Development, Security]
Order: 142
TOCTitle: VS Code Wrapped: GitHub Universe 2026
PageTitle: VS Code Wrapped: GitHub Universe 2026
MetaDescription: Explore how VS Code evolved between GitHub Universe 2025 and 2026, with new ways to code, collaborate with agents, and manage work across tools and environments.
MetaSocialImage: social-image.png
Date: 2026-10-28
Author: Hailey Victory
---

# VS Code Wrapped: GitHub Universe 2026

October 28, 2026 by [Hailey Victory](https://github.com/haileyvictory)

When we gathered at [GitHub Universe in October 2025](https://code.visualstudio.com/updates/v1_106), working with agents in VS Code was still relatively new. A year later, working with agents has become the new normal. A single developer can put several agents to work on different problems, keep coding while those tasks move forward, and check back in to review the results. Work can continue on another machine, in another app, or in the cloud after your laptop closes. The editor that helps you write code is also becoming the place where you coordinate much more of the work it takes to ship software.

Imagine handing off a feature to Copilot while Claude investigates a bug, then opening the running app in a browser that both you and the agent can see and control. Project instructions and tools give those agents the context to work, and the Agents window brings their progress and changes together for review.

When you hand a task to an agent, it shouldn't matter which app you're using to launch the task. When you switch to another tool, the task should continue running. Over the last releases, we've worked to make these connected, continuous experiences across VS Code and other Copilot apps become reality. 

In this blog post, we're zooming into how far VS Code has come since the last Universe, and what you can do with it today.

![Screenshot of the Agents Window](AgentsWindow.png)

## Agents that keep working 

<video loop controls autoplay muted width="100%" src="https://github.com/user-attachments/assets/77d2a3a3-3a32-4162-b158-5f34019320e4">
</video> 

Developers can hand off more of the work without handing over the decisions that matter. We built on our Language Server Protocol and Debug Adapter Protocol experience to create the [Agent Host Protocol (AHP)](https://microsoft.github.io/agent-host-protocol/), which just went 1.0. 

Just as a language server makes code completion and Go to Definition available to different editors, an [Agent Host](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture) brings agent functionality into an independent process. It manages sessions and provides access to multiple harnesses, models, files, and terminals. 

AHP lets clients connect to those sessions and stay in sync. Cloud sessions run on GitHub's infrastructure, so closing your laptop doesn't stop them. You can continue the same session in VS Code, the GitHub Copilot app, GitHub Mobile, github.com, or Copilot CLI. And because the protocol is open, anyone can build a client that works with the same live sessions as VS Code. 

## Choosing your agent 
![Screenshot of selecting a harness](harness-image.png)

The agent harness is what coordinates the agent loop and connects the language model to context and tools.
We combined our Local VS Code harness with the Copilot CLI harness to create the new Copilot harness, now the default for new sessions in both the editor and Agents window. Built on the [Microsoft Copilot SDK](https://github.com/github/copilot-sdk), it brings more consistent agent behavior across VS Code, Copilot CLI, and the GitHub Copilot app. This also means that you can reuse your agent customizations across different Copilot experiences without modifications.

You can also use [Claude and Codex](https://code.visualstudio.com/blogs/2026/02/05/multi-agent-development) in VS Code through the Agent Host. Each runs on its provider’s own [agent harness](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses), with its own runtime and capabilities. VS Code brings their sessions together in one place, where you can manage work across agents without requiring every agent to work the same way. 

## Choosing your model 

Access to multiple models remains one of Copilot's pillars. The [model picker](https://code.visualstudio.com/docs/agent-customization/language-models) lets you select from Copilot and bring your own key models. You can specify options like reasoning effort and context size to optimize the model configuration for the task.

As newer and more capable models become available, choosing the right model for the task is becoming more and more difficult. Maybe one model is not the best for each part of the task.
[Copilot Fusion](https://github.blog/changelog/2026-09-30-hydrafusion-in-vs-code-and-the-github-copilot-app/) autonomously chooses one model or orchestrates a set of models to solve the task at hand. In the Agents Window, you can also use the [Compare Models](https://code.visualstudio.com/updates/v1_143#_compare-model-results-preview) feature in Preview to run different models and harnesses on the same task, review results side by side, and combine the best ideas. Together, these options help you balance speed, cost, and quality. 

<video loop controls autoplay muted width="100%" src="https://github.com/user-attachments/assets/79c63fbb-e233-4c3f-9edb-3e57f7cff63e">
</video>

## Managing parallel work 
<video loop controls autoplay muted width="100%" src="https://github.com/user-attachments/assets/e2f34e59-a797-41c1-a319-a49d127ff241">
</video>

The work we started with Agent HQ in VS Code has grown into the [Agents Window](https://code.visualstudio.com/docs/agents/run/agents-window), a dedicated space to manage agents across all your workspaces and environments. Run agent sessions in parallel, follow progress, and review changes from a single interface. Seamlessly switch between the editor and the Agents window without starting over. Both views stay in sync with the same live Copilot session. For recurring tasks, use [automations](https://code.visualstudio.com/updates/v1_138#_automations-are-now-enabled-by-default-and-can-be-shared), either locally or in the cloud. To avoid conflicts, worktrees help you keep changes isolated between agents.

And when you need to dive into the code or run a debugging session, you can switch to the editor and back to the Agents window at any time. Your active sessions remain running uninterrupted.

The Agent Host is a separate process that lets the Agents window connect to multiple agent sessions at once, including those on [remote machines](https://code.visualstudio.com/docs/agents/run/remote-agent-sessions) over SSH or dev tunnels, or sessions running in the cloud. Remote agents use that machine's code, tools, and dependencies and keep working after you disconnect, as long as the machine and host stay running. 

![Screenshot of multi host interface](multi%20host.png)

## Shaping your agents 

[Instructions, skills, hooks, custom agents, and plugins](https://code.visualstudio.com/docs/agent-customization/overview) help agents understand your project conventions and workflows. Projects already customized for Claude Code or Codex can use that setup with their respective harnesses, without rebuilding it for VS Code. 

Support for the [Model Context Protocol](https://code.visualstudio.com/docs/agent-customization/mcp-servers), including MCP Apps, connects agents to your tools and services. Extension authors can contribute [agent tools and MCP servers](https://code.visualstudio.com/api/extension-guides/ai/ai-extensibility-overview) through the Marketplace. 

[Copilot connectors](https://code.visualstudio.com/docs/agent-customization/copilot-connectors), now in preview, bring context from services such as Slack, Notion, and Microsoft Learn into your agent sessions without requiring you to install or manage an MCP server. Connect once and reuse the connection across supported Copilot clients signed in with the same account. Connectors work with the Copilot harness and are available on all Copilot plans. For Business and Enterprise plans, administrators must allow editor preview features.

For organizations, [managed settings](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) apply policies across teams, while [sandboxing](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) can restrict agent access to files and network resources. 

## Beyond the chat 

The [integrated browser](https://code.visualstudio.com/updates/v1_110) gives you and your agent a shared view of a page, so you can both see and interact with it without leaving VS Code. Your agent can use Playwright to test a workflow, check the results of its changes, and help identify web accessibility issues.

Some workflows are easier to navigate visually than through a conversation. [Canvases](https://code.visualstudio.com/updates/v1_142#_canvases-preview), now in preview, let you create interactive interfaces for working with your agent and its context, such as a task board for tracking a project. You can also choose from [readily available canvases](https://awesome-copilot.github.com/extensions/). The [Markdown editor](https://code.visualstudio.com/updates/v1_142#_markdown-editor) lets you edit a rendered plan or document directly and leave comments for your agent to act on, rather than describing every revision in chat.

<video loop controls autoplay muted width="100%" src="https://github.com/user-attachments/assets/6746a655-d29a-42a2-b96e-ee5006d676e6">
</video> 

Completing a task might mean working with a desktop application that doesn’t have an MCP server or another tool integration. Experimental [computer use](https://docs.github.com/copilot/concepts/agents/computer-use) lets your agent interact with those applications on macOS and Windows by clicking controls and editing text. You control application access, and organizations can disable it through policy.  

With models that support image generation, you can create visual assets for your project alongside the code, whether you’re exploring a design idea or building a prototype.

For a little fun, there's [Blobby](https://code.visualstudio.com/updates/v1_141#_meet-blobby), the VS Code pet who reacts as you work with agents, with achievements to unlock along the way. 

<video loop controls autoplay muted width="100%" src="https://github.com/user-attachments/assets/51adbd67-835d-4a90-840e-fe6d01b9b3ac">
</video>  

## Still your editor 

We remain just as committed to the editor you rely on every day. Precision editing, code completion, navigation, refactoring, and debugging remain at the heart of VS Code. [Next edit suggestions](https://code.visualstudio.com/docs/editing/ai-powered-suggestions#_next-edit-suggestions) continue to improve with new models and are available to Copilot Free users. 

The extension ecosystem remains central to making VS Code your own, from language support to AI extensions like Claude Code and Codex. And it has never been easier to [build your own extension](https://code.visualstudio.com/api/get-started/your-first-extension). 

Last, but not least, our [UI modernization](https://code.visualstudio.com/blogs/2026/10/15/modern-ui) work brings shared design choices to the editor and Agents window for a clearer, more consistent experience that preserves your customization and familiar workflows. 

![Screenshot of the modernized VS Code interface](UI%20modernization.png)

Feedback and ideas from the VS Code community have shaped how the product has evolved over the past year. Please keep sharing what is working and what could be better in [VS Code GitHub issues](https://github.com/microsoft/vscode/issues)! 

Happy coding! 💙
