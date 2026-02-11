---
Order: 108
TOCTitle: A Unified Agent Experience
PageTitle: A Unified Experience for all Coding Agents
MetaDescription: "Agents took over VS Code in 2025. We released agent mode for VS Code, integration for the Copilot coding agent, and the new GitHub Copilot CLI. But Copilot is not the only agent game in town. There are now more coding agents than ever, including options from OpenAI and Anthropic."
MetaSocialImage: unified-agent-experience.png
Date: 2025-11-05
Author: VS Code Team
---
# A Unified Experience for all Coding Agents

November 5, 2025 by VS Code Team, [@code](https://twitter.com/code)

_Special thanks to Rob Lourens, Bhavya U, Matt Bierner, Peng Lyu, Osvaldo Ortega, Josh Spicer, Brigit Murtaugh, Martin Aeschlimann, Alex Britez and Harald Kirschner for their work on these features._

If we had to pick one word to describe the past year, it would probably be "Agent".

Agents took over VS Code in 2025. We released [agent mode](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) for VS Code, integration for the [Copilot coding agent (cloud)](https://code.visualstudio.com/docs/copilot/copilot-coding-agent), and the new [GitHub Copilot CLI](https://github.com/features/copilot/cli/). But Copilot is not the only agent game in town. There are now more coding agents than ever - including options from OpenAI and Anthropic.

With all these choices, things got better for developers but the agent ecosystem got a little more fragmented. Subscription hopping, tool juggling, and the constant FOMO on the latest agent trend is now the norm. This year at GitHub Universe, we set out to fix that with a unified agent experience in VS Code. The first big step towards making that a reality was offering more agents in your Copilot subscription. And not just those with "Copilot" in their name.

## OpenAI Codex Integration

OpenAI had a big year: they shipped the GPT-5 and GPT-5 Codex models, which were available in VS Code on day one through the standard model picker. But they also launched Codex - their  coding agent, available as both a CLI tool and a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt). And it was a huge hit with developers.

At GitHub Universe, we announced you can now use OpenAI Codex with your GitHub Copilot Pro+ subscription. No additional subscription required.

To use this integration, install the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) and sign in with GitHub Copilot.

![OpenAI Codex sign-in panel in VS Code](codex-signin.gif)

When you use Codex with Copilot Pro+, Copilot handles all model calls and standard rate limits apply. You get code generation, code explanation, and all the features - no need to manage a separate OpenAI account.

With the addition of Codex, you now have four powerful coding agents in VS Code:

* GitHub Copilot
* Copilot coding agent (cloud)
* GitHub Copilot CLI
* OpenAI Codex

But with all these agents, it's easy to get overwhelmed. What agents are running? Where are they running? What day is it?

That's why we've introduced a new feature in VS Code for orchestrating all your agents - local or remote. We call it, "Agent Sessions".

## Agent Sessions

There's a new view in the VS Code side bar called "[Agent Sessions](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_agent-sessions)". It gives you one place to manage all your agents, whether they're running locally or in the cloud.

![VS Code window with Agent Sessions sidebar showing Copilot, Coding Agent, CLI, and Codex statuses against a calm gray workspace](agent-sessions.png)

With Agent Sessions, you see all agent sessions for your project. You can check which agents are running, their status, and jump between sessions with a click.

All agents now have a new tabbed experience called "chat editors". You can open the Copilot coding agent in a chat editor to watch its progress. You can even course-correct the agent mid-run. It's common to send a prompt and realize you forgot something important. Before, you had to wait or cancel. Now, just open the tab, add an update, and watch the agent adjust its plan.

You can also delegate any task to any agent right from the Chat view.

![VS Code showing the "Delegate" button from the chat, when clicked opens a menu of agents to delegate to](why-settle.gif)

This unified Agent Sessions view makes VS Code a "mission control" for orchestrating all your agents, while keeping you in the editor where you do your best work. We're excited to welcome OpenAI Codex today, and we're working to bring more agents to your Copilot+ subscription in the future.

## Planning Agent

A few months ago we introduced the concept of chat modes in VS Code. These are custom modes that let you augment or alter the behavior of the built-in agent prompt. When you use a chat mode to alter the agent behavior in VS Code, what you're _really_ doing is creating your own custom agent. So we've renamed "chat modes" to just "agents" to better reflect what they actually are.

To get you started building custom agents, we've added a new built-in agent called "[Plan](https://code.visualstudio.com/docs/copilot/chat/chat-planning)".

![Copilot chat in VS Code with Plan agent dropdown highlighted, planning guidance beside dark theme editor, label reads Plan for a focused tone.](planning-agent.png)

The new Plan agent helps create a detailed plan from lazy prompts like "add drag and drop". That's an actual prompt I sent yesterday. No mention of what to add it to, what page, or whether to use a library. I do this a lot, and I bet I'm not alone.

With the Plan agent, Copilot asks the questions that need answers. It even recommends libraries for drag and drop and gives reasons to pick one over another.

![Plan agent breaking down drag-and-drop into steps recommending React Beautiful DnD and React DnD with comparisons.](plan-in-action.png)

You can answer these with quick replies on separate lines so it knows which answer goes to which question. Here's how I'd answer:

```
dnd-kit
yes - what kind of a question is this in 2025
link creation only
```

> Pro tip: Change the "workbench.action.chat.submit" keybinding to "Ctrl + Enter" so you stop accidentally sending messages when you just want a new line. Your swear jar will thank you.

When the Plan agent has enough info, it stops asking questions and asks if you're ready to proceed. You can use the new "[Handoff](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes#_handoffs)" feature in chat to either proceed or open the full plan in the editor.

![Screenshot showing the Handoff feature in Copilot chat with options to proceed with implementation or open the plan in the editor.](handoffs.png)

Try different models to see which you like best for planning. We've found the [Claude models](https://www.anthropic.com/claude) are great at identifying missing context and edge cases, and asking the right questions.

If you're like me, you'll want to know how the Plan agent works so you can up your prompt engineering game. You can read the Plan prompt by choosing "Configure Agents" from the Command Palette and selecting Plan. It's a great baseline for creating your own [custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-chat-modes). I used it to create one called ["Research"](https://gist.github.com/burkeholland/919d655ae4df5c809b549632c3afb144) that recursively does internet research and writes up its findings.

These custom agents are also available when you delegate to other agents such as the Copilot CLI and the Copilot coding agent. Your custom agents work everywhere that you need them to.

> Pro tip: You can find hundreds of custom instructions, prompt files and agents over on the [awesome-copilot](https://github.com/github/awesome-copilot) repo. If you haven't checked that out yet, you're missing out. It's a treasure trove of inspiration and ready-made prompts.

## Subagents

[Context Confusion](https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html) is a real problem with agents. The more you interact, the more context they track - and the more likely they are to get confused. There's a whole new discipline for managing context called "Context Engineering".

With the latest VS Code release, we've added a tool called "[runSubagent](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_contextisolated-subagents)" to help you manage context.

[Subagents](https://code.visualstudio.com/docs/copilot/chat/chat-sessions#_contextisolated-subagents) run independently from the main chat and have their own context. You can call one by adding the `#runSubagent` tool to your prompt. The LLM creates a prompt, hands it off to a subagent, and that agent only gets the context you send. It knows nothing about the rest of your chat, and your chat knows nothing about the subagent's context. Subagents don't pause for feedback and have access to most of the same tools as the main chat.

When a subagent finishes, it returns the final result to the main chat - and only that result joins the main context. Subagents keep your main chat lean while letting you go on sidebars and deep dives. For example, if you're building an API and need to research authentication, spin up a subagent to do that.

```
Analyze the #file:api with #runSubagent and recommend the best authentication strategy for a web client consuming these endpoints.
```

You'll know a subagent is running because you can see tool calls and model responses below the subagent action. In the screenshot below, that's "Analyze app structure for auth".

![A subagent process running in VS Code with tool calls underneath the main agent action](subagent-in-progress.png)

We're still exploring ways to help you manage context with agents, and subagents are just the beginning.

## Looking Ahead

Agents are changing how we write code and how we work. You shouldn't have to pick just one. You should be able to move between agents, keep fine-grained control over your context, and create your own custom agents to extend the various built-in agent prompts. With the unified agent experience in VS Code, you can now do all of that.

These are just a few highlights from this year's [GitHub Universe](https://github.com/events/universe). Check out [GitHub's blog](https://github.blog/) for all the updates as we work on a unified workflow for a multi-agent experience everywhere you need it.

I'll leave you with this: it was only 12 months ago that we announced "Copilot Edits" and Claude support in Copilot. At this pace, imagine where we'll be 12 months from now.


And as always, Happy Coding! 💙






