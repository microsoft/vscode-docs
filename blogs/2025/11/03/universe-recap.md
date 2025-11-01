# Agent sessions, A planning agent and OpenAI Codex Integration: A Universe Recap

VS Code releases 11 times a year. That's a release every _single_ month.  And all of those releases culminate each year with our announcements at GitHub Universe. Last year, we announced that Claude was being added to Copilot and a new chat mode called "Edits" that would both answer your chat questions AND write code. What a time to be alive!

Fast forward 12 months to GitHub Universe 2025 and the Copilot experience in VS Code is virtually unrecognizable from where it was just a year ago. If you haven't seen Copilot in the past year, you haven't seen it at all.

So let's take a look at some of the biggest announcements from Universe 2025, and how we have transformed the Copilot experience in VS Code over the past year.

## Agent Sessions

If we were picking the official word for 2025, it would definitely be "agent". Naming things is definitely hard and that word has taken on a lot of different meanings, but in the past year we've come to understand agents as autonomous collaborators that can break work down into steps, use tools and API's, and iterate on their work until they reach a goal. There are a lot of agents out there - including Copilot in VS Code, Copilot Coding Agent in the cloud, and the recently released GitHub Copilot CLI.

But there are other agents too. Ones whose names don't include the word "Copilot". 😉

This year at GitHub Universe, we had some major announcements both in VS Code and in GitHub with the instroduction of "Agent HQ".

In this post, we'll take a look at these big agent announcements from Universe 2025 and how we are moving from a single Copilot experience to a full agent ecosystem.

And there's no better place to start than with what was one of the breakout agent stars of 2025 - OpenAI Codex.

### OpenAI Codex Integration

There was no shortage of coding agents released this year. There are literally dozens to choose from and many of them are incredibly capable. This is _great_ for developers. Choice is paramount and the intense agent competition means that coding agents are improving at a remarkable pace. But it's also led to a lot of fragmentation in the agent ecosystem. Developers are often forced to choose between multiple subscriptions and tools to get their work done. This causes a lot of "subscription hopping" and wondering if you're missing out because you aren't using "fill in the blank" new agent that everyone is raving about and using to build their side project which is earning 100K passive MMR what are you even doing with your life.

It shouldn't have to be this way. Ideally, developers should be able to seamlessly switch between any agent they want to use without needing to manage multiple accounts, subscriptions, or tools.

That's why we are so excited about the OpenAI Codex integration announced at GitHub Universe 2025.

OpenAI Codex was a **huge** hit with developers in 2025. Coming on the back of the highly capable GPT-5 model and the subsequent GPT-5 Codex model, OpenAI delivered a top tier agent development experience with the Codex CLI. They also have a _fantastic_ VS Code extension that allows you to get the Codex agent experience directly in the editor.

And this year at GitHub Universe, we announced that you can now use OpenAI Codex with your GitHub Copilot Pro+ login.

To light up this integration, all you need to do is install the OpenAI Codex extension and sign in with your GitHub Copilot Pro+ account. That's it. Full access to Codex, no additional subscription required.

![OpenAI Codex sign-in panel in VS Code](codex-signin.gif)

When you use Codex via your Copilot Pro+ account, Copilot is used for all the model calls and the standard Copilot rate limits and billing apply. This means you can use Codex for code generation, code explanation, and all the other great features it provides without needing to manage a separate OpenAI account or subscription.

This is a huge step forward in unifying the agent ecosystem. Developers can now choose between multiple top-tier coding agents - Copilot and Codex - all within the same subscription and experience.


With the addition of Codex, you now have access to four incredibly capable coding agents within VS Code:

1. GitHub Copilot
2. GitHub Copilot Coding Agent (Cloud)
3. GitHub Copilot CLI
4. OpenAI Codex

But with all of these agents available, it can be easy to get overwhelemed and lost in the sauce. What agents are running again? Where are they running? What day is it?

And that's why we've introduced a new feature in VS Code for orchestrating all your agents - local or remote. And we call it, Agent Sessions.

### Agent Sessions

There is a new view in the sidebar of VS Code called "Agent Sessions". This view provides a single pane of glass for managing all your agents - whether they are running locally in VS Code or remotely in the cloud.

![VS Code window with Agent Sessions sidebar showing Copilot, Coding Agent, CLI, and Codex statuses against a calm gray workspace](agent-sessions.png)

With the Agent Sessions view, you get a simple view for all of the agent session associated with the current project. You can see which agents are running, their status, and easily jump between agent sessions - just by clicking on them.

Cloud Agent sessions are now easier to interact with as well with a new tabbed experience that lets you course correct the agent in the middle of its work. This is incredibly helpful since it's super common to send a prompt and then realize you forgot a pretty important piece of context. Before you had to wait until the agent finished or cancel the run. Now you can just pop the tab open, add an update and watch the agent adjust its plan on the fly.

TODO IMAGE of updating cloud agent mid-run

This new unified Agent Sessions view is a huge step towards making VS Code a "mission control" for orchastrating all your agents, while keeping you firmly in the editor where you do your best work.

### Planning Agent

We've talked a lot about coding agents like Copilo and Codex. But if you think about how we use AI with instructions files, prompts and chat modes, what you are really doing when you are directing the agent like this with special instructions is creating your own custom agent.

Previously, VS Code had the concept of "Chat Modes". These were specialized prompts that you could use to augment the built-in system prompt for the Copilot agent. These have been renamed to just "Agents" to better reflect what they actually are.

And to get you started with these custom Agents, we've added a new one out of the box called "Plan". You'll find this new mode in the Agent dropdown right below the "Agent" selection.

![Copilot chat in VS Code with Plan agent dropdown highlighted, planning guidance beside dark theme editor, label reads Plan for a focused tone.](planning-agent.png)

We've found that when working on medium to large tasks, having a detailed plan to give the model over an open-ended prompt makes a world of difference. The less information the model has, the more it has to fill in the gaps itself by guessing at what you want because you didn't just come out and say it. It's a properly passive-agressive relationship at that point.

The new Plan agent helps create a proper detailed plan from my incredibly lazy prompts like, "add drag and drop". That's an actual prompt that I sent yesterday. No mention of what to add it to or on what page or whether or not to use a library. I'm somewhat embarassed to say that I do this a lot and I _feel_ like I'm not alone. Unfortunately comments aren't enabled on this blog so you can't validate my insecurities.

But with the Plan agent, Copilot is able to ask the pressing questions that kinda need an answer. In this case it even recommends some libraries to use for the drag and drop and gives me reasons I might want to choose one over the other.

![Plan agent breaking down drag-and-drop into steps recommending React Beautiful DnD and React DnD with comparisons.](plan-in-action.png)

You can answer these with a quick set of replies on different lines so it knows which answer goes to which question. This is how I would answer the questions above. No need to overthink it. Clearly I don't do a whole lot of thinking at all here given I thought just "add drag and drop" was a sufficient prompt...

```
dnd-kit
yes - what kind of a question is this in 2025
link creation only
```

> Pro tip: Change the "workbench.action.chat.submit" keybinding to "Ctrl + Enter" so that you can stop accidentally sending messages when you just want a new line. Your swear jar thanks you.

When the Plan agent feels like it has enough information, it will stop asking questions and ask you if you are ready to proceed with the implementation. You can use the new "Handoff" feature in chat to either proceed with the implementation or open the full plan in the editor.

![Screenshot showing the Handoff feature in Copilot chat with options to proceed with implementation or open the plan in the editor.](handoffs.png)

You can experiment with different models to see which one you like beset for planning. We've found the Claude models to be exceptionally good at planning out tasks because they are especially skilled in at proactively identifying missing context and edge cases and asking the right questions to fill in those gaps.

If you're like me, you're going to want to know how this Plan agent works so that you can up your prompt engineering game. You can examine the Plan prompt by choosing "Configure Agents" from the Command Palette and selecting the Plan prompt. I recommend reading through this prompt so that you can see how we define the looping workflow, use XML tags to direct the model, provide examples, etc. It also makes a great baseline for creating your own agents. I used it to create one called ["Research"](https://gist.github.com/burkeholland/919d655ae4df5c809b549632c3afb144) that recursively does internet research and writes up its findings.

And finally, if you did take my advice and read the Plan prompt, you would see it make a tool call to something called "runSubagent".

### Subagents

[Context Confusion](https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html) is a real problem when working with agents. The more you interact with an agent, the more context it has to keep track of. And the more context it has to keep track of, the more likely it is to get confused and make mistakes. There is an entire discipline sprouting up to define best practices for managing context called, "Context Engineering".

With the latest release of VS Code, we've created a new tool called "runSubagent" to help you manage your context better.

[Subagents](https://code.visualstudio.com/updates/v1_105#_isolated-subagents) run independently from the main chat session and have their own isolated context. You can call one directly from the main chat just by adding the `#runSubagent` tool to your prompt. When you do this, the LLM creates a prompt that is then handed off to a subagent. This agent only has the context provided in the prompt sent to it. It knows nothing about the rest of your chat and your chat knows nothing about the context the subagent builds up as it runs. Subagents do not pause to ask you for feedback and they have access to pretty much all the same tools as the main chat session.

When a subagent completes its work, it returns the final result back to the main chat session and _only_ that final result is part of the main chat context. Subagents are a powerful way for you to keep the main chat context lean while still being able to go on sidebars and deep dives. For instance, if you have an agent session building out an API and you need to research best practices for authentication, you can spin up a subagent to that...

```
Analyze the #file:api with #runSubagent and recommend the best authentication strategy for a web client consuming these endpoints.
```

You'll know that a subagent is running because you can see the tool calls and model responses below the subagent action text. In the screenshot below, that's "Analyze app structure for auth".

![A subagent process running in VS Code with tool calls underneath the main agent action](subagent-in-progress.png)

We're continuing to explore ways to help you manage context better with agents, and subagents are just the beginning.

## Looking Ahead

Agents are transforming the way we write code and the workflows we have to do it. Our vision is that you shouldn't have to pick just one, and you should be able to easily move between multiple agents while keeping fine grained control over your context and letting you create your own Agents to extend our system prompts.

These are just a few of the highlights from this year's GitHub Universe, and I highly recommend checking out GitHub's blog post for all of the updates on the GitHub side as we work on a unified workflow for a multiagent experience that is available everywhere you need it.

I'll leave you with this closing thought: It was only 12 months ago that we announced "Copilot Edits" and Claude support in Copilot. At this pace, imagine where we'll be 12 months from now.

And as always, Happy Coding!






