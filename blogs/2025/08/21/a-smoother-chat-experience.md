---
Order: 104
TOCTitle: "A Smoother Chat Experience: v1.103 Release Highlights"
PageTitle: "A Smoother Chat Experience: v1.103 Release Highlights"
MetaDescription: The VS Code v1.103 release focuses on reducing friction for users, with rewriting the terminal tools, adding virtual tools to bypass the 128 tool limit, introducing checkpoints, and more.
MetaSocialImage: release-highlights.png
Date: 2025-08-21
Author: Olivia McVicker
---

# A Smoother Chat Experience: v1.103 Release Highlights

August 19, 2025 by Olivia McVicker, [@OliviaGuzzardo](https://twitter.com/oliviaguzzardo)

Papercuts can make great tools feel miserable. They are the extra clicks, the stalled actions, and the moments where you feel like you have to fight your tools to keep moving. The [v1.103 (July) release of VS Code](https://code.visualstudio.com/updates/v1_103) is about removing those frictions with practical quality of life improvements.

We focused on common pain points you have told us about: terminals that hang right when you need them, requests failing in chat when you hit tool limits, losing context after a large change, and agents that don’t quite fit in your flow. In this update, you will see:
- A rewritten terminal that stays responsive
- Smarter tool grouping so you never have to see the 128 tool limit ever again
- Checkpoints for safe rollbacks
- Better integration with the async Copilot coding agent without ever having to leave chat

Oh and on top of that – we’re bringing you the latest models right to VS Code, with [GPT-5](https://github.blog/changelog/2025-08-07-openai-gpt-5-is-now-in-public-preview-for-github-copilot/) and [GPT-5 mini](https://github.blog/changelog/2025-08-13-gpt-5-mini-now-available-in-github-copilot-in-public-preview/) now available in the model picker. You have OpenAI’s most advanced reasoning capabilities right at your fingertips – and [we had a pretty great first impression](https://youtu.be/wqc85X2rpEY).

Now let’s dive in to each of these improvements and see how they keep you in the flow instead of chasing interruptions.

## A smoother terminal experience

With this release, we’ve completed an overhaul of the terminal tools to resolve many of the frustrating terminal hanging issues that you’ve told us about. The tools for running tasks and commands within the terminal are now part of the core [microsoft/vscode](https://github.com/microsoft/vscode) repository, giving access to lower-level and richer APIs.

Expect a smoother, more reliable terminal experience in chat. Initial testing shows a decrease in tool error from 2.4% to just 0.2%.

We’ve also streamlined the terminal auto-approve settings. The old `allowList` and `denyList` options have merged into a single `chat.tools.terminal.autoApprove` setting. For example, if you want to make sure the agent doesn’t auto-approve git commit commands so you can edit commit messages before proceeding, you can easily configure that in the new setting.

<!-- screenshot/gif -->

## More tools, less problems

We know once users start leveling up their agent game with their first MCP server, they keep installing more tools. Meanwhile, MCP servers continue expanding their toolsets. This rapid growth often means hitting model limits, like the [128-tool cap](https://github.com/microsoft/vscode/issues/248021).

With this update, VS Code can now automatically manage large numbers of servers and tools. When the number of tools exceeds the threshold (default of 128 - configurable with the `github.copilot.chat.virtualTools.threshold` setting), tools are automatically grouped, and the model can activate and call on these groups to stay under the limit. You'll see a warning that you may experience degraded tool calling with this experience, but your request will succeed and the tool groupings will be cached for optimized tool calling in subsequent requests.

<!-- gif -->

As the number of available tools grows, we realized how tedious navigating the tool picker could be, so we’ve overhauled the tool picker UI for easier tool management. The new Quick Tree UI with sticky scroll and icon rendering lets you expand or collapse tool sets, MCP servers, and more, making it effortless to search, group, and browse tools.

<!-- screenshot -->

## Restore to checkpoints

Sometimes while you’re iterating in chat, you realize that the request you just sent wasn’t quite what you meant – maybe you needed to be more specific, use a different mode, or switch models. In last month’s release, we added the ability to edit chat requests for that exact situation. When you submit the edited request, it’s the same as if you reverted the previous request, then sent in the new, edited request.

<!-- insert screenshot -->

But other times, you want to completely roll back everything that happened in previous requests. That’s why in this month’s release, we’ve introduced checkpoints. While VS Code has long supported undo/redo, checkpoints bring this to a new level by giving you a visual way to revert your work and chat to specific moments. Select a checkpoint, and VS Code will roll back your workspace changes and chat history to that exact point.

<!-- insert gif -->

Restored a checkpoint by mistake and want your changes back? No problem – you can redo that action. Think of checkpoints as a user-friendly version history for your chat and code.

<!-- insert gif -->

## Better collaboration with Copilot coding agent

Last month, we introduced the first phase of our [Copilot coding agent integration](/blogs/2025/07/17/copilot-coding-agent.md) through the GitHub Pull Requests extension, bringing asynchronous agents directly into VS Code.

In this month’s release, we’ve added several improvements to the experience. First, coding agent sessions now render pull requests as cards in the Chat view, showing the PR title, link, author, and description for easy referencing.

<!-- screenshot -->

You can then track a coding agent session from a dedicated chat editor – follow progress, give follow-up instructions, and see responses all in one place.

<!-- screenshot -->

And if you have multiple coding agent sessions running at once, there’s a new Chat Sessions experimental feature to help you view and manage your coding agent sessions. You can configure the `chat.agentSessionsViewLocation` setting to surface this in either the VS Code Side Bar or alongside the local chat history.

<!-- screenshot -->

Check out our documentation to learn more about how you can delegate changes to your newest AI teammate: https://code.visualstudio.com/docs/copilot/copilot-coding-agent

## That’s not all, folks

These are just some of the highlights from the v1.103 release – you’ll want to read [the release notes](https://aka.ms/VSCodeRelease) for a full look at everything that’s new (and spoiler, there’s a lot!). We make improvements every day, so be sure to install [VS Code Insiders](https://code.visualstudio.com/insiders/) so you’re the first to try out the latest features and follow us on [X](https://x.com/code) so you can stay in the loop. Happy coding!
