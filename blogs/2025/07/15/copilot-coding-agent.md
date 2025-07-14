

# Command GitHub's Coding Agent from VS Code

Today, we’re excited to give you a first look at the Copilot Coding Agent in Visual Studio Code.

Instead of only having one agent in VS Code, you can now have multiple agents running at once working on your behalf. This is _actually_ being a 10x developer. It's officially a a thing. You get to hand off any work you need done to to a squad of AI teammates.

In this post, we'll take a look at what the coding agent is, give you an exclusive preview of the integrations coming to VS Code and even tell you how you can start using them today.

## What is GitHub Copilot Coding Agent?

[GitHub Copilot Coding Agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/) is an autonomous AI developer you can assign to any GitHub issue. The agent runs in GitHub and is fully integrated as a member of your repo that can comment on issues, open PR's, do code reviews and more. The agent can tackle complex work, implement features across your codebase, and even use Model Context Protocol (MCP) tools to work with databases or cloud services.

1. You enable the agent in your repo settings.
2. You assign an issue to Copilot.
3. The agent does the work, opens a pull request, and keeps you in the loop.
4. You review the PR, leave comments if you want changes, and the agent iterates until it’s done.

![Copilot Coding Agent on GitHub](coding-agent-github.png)

That's all there is to it. It's the workflow you already know with an agent in the mix.

The agent runs within a temporary, isolated dev environment (similar to GitHub Actions) that gets spun up where the agent can explore the codebase, make changes, build the code, run tests, etc. - a complete dev enviornment just for the agent so it can function in a fully autonomous manner.

And now, we're integrating the coding agent and all of its workflows directly into VS Code.

## Copilot Coding Agent in Visual Studio Code

Copilot Coding Agent integrates with the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github). You can assign any issue or PR to Copilot Coding Agent right from the sidebar - no need to switch to your browser. Just select, assign, and let the agent take it from there.

![A GIF showing Copilot assigned to an issue from within VS Code](assign-to-copilot-gif.gif)

### Track your agent’s progress

There’s a new **Copilot on My Behalf** query in the Pull Requests view. This shows you everything Copilot is working on for you. Want to see exactly what the agent did? Click "View Session" and watch the play-by-play. You get full transparency into every command and decision. You can also terminate the agent if you're not happy with how things are going. And you can drive all of this without even leaving the editor.

![A WIP PR shown under the "Copilot on my behalf" section with the "View Session" button highlighted](copilot-wip.png)

In this screenshot, the agent implemented a "trending" section to a website, complete with UI and database changes. All of this is one interaction so it's only one premium request.

### Review, comment, and iterate

When the agent is done, it will assign the PR to you and request you as a reviewer. It even includes a screenshot if applicable so you can quickly verify whether it did the right thing or not at all.

![PR from Coding agent shown in VS Code with a screenshot](draft-with-screenshot.png)

You can review the agent’s PR, leave comments, and ask for changes - all from within VS Code. The agent will pick up your feedback, update the PR, and let you know when it's finished.

This workflow integrates beautifully with services that offer previews for pull requests.
For example, if you use Azure Static Web Apps, Vercel, Netlify, and others, you can review the agent's work without even having to check out and run a branch locally.

![Live preview of the site on Netlify but we have an error](live-preview-netlify.png)

Uh oh - now that we look closely, it looks like we didn't quite get the "Trending" section working. In this case, that's ok. In fact it's good. Our agent couldn't succeed in one shot because it doesn't have access to create the required database changes. Instead, so it created a migration script as part of the PR. That *will* require us to manually check out the PR, but you might feel more comfortable being in control over that sort of change.

But what if we *did* want to give access to make the database changes to a dev environment? Coding agent has support for MCP servers, and provided you have one for your database of choice (in this case Supabase), you can [configure MCP servers for the agent on the repo](https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/extending-copilot-coding-agent-with-mcp). It's up to you - how autonomous do you want the agent to be?

![MCP configuration shown for copilot coding agent on github.com](coding-agent-mcp-config.png)

But it gets even better - because you can do all of this right from VS Code.

### Start sessions from Copilot Chat

We find ourselves wanting to do more and more right from the [chat pane](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) in VS Code. This is where most work and thinking happens and you're not locked into the issue workflow. You can - at any point in a chat, no matter how long - delegate the task directly to the coding agent. All of the context that is currently a part of that chat will get sent to the coding agent.

The coding agent then opens a PR and goes directly to work - skipping the issue step entirely. It distills down the context into a detailed PR description and you'll see that Copilot Coding Agent makes use of "to-do lists" so that you can see what it's doing and where it is in the process at a glance.

![A GIF that shows the delegate to copilot button in chat](delegate-to-coding-agent.gif)

## What’s next?

The Copilot Coding Agent integration in Visual Studio Code is currently in preview, but as with everything we do, we do it all in the open and you can use it all today. If you want to light all of this up in your editor, all you need to do is make sure you have the GitHub Pull Requests extension installed and add the following settings...

```json
"githubPullRequests.codingAgent.enabled": true,
"githubPullRequests.experimental.chat": true,
"githubPullRequests.codingAgent.uiIntegration": true,
"githubPullRequests.codingAgent.autoCommitAndPush": true,
```

We recently made the move [to fully open source the AI features in VS Code](https://code.visualstudio.com/blogs/2025/05/19/openSourceAIEditor) and you can track our progress and open new issues [on the vscode repo](https://github.com/microsoft/vscode).

## Go forth and 100x yourself

We can’t wait to see what you and your new agent friends build together! Keep an eye on the [release notes](/release-notes/) and the [Copilot documentation](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent) for new developments here.

In the meantime, start making a list of all the things you’d rather not do. Because you’re about to have a new favorite teammate.