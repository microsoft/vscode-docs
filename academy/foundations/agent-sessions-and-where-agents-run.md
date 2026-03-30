---
ContentId: 9a8f0a40-f4f9-4d2b-b7b2-c1d54ef4c004
DateApproved: 03/30/2026
MetaDescription: Manage agent sessions in VS Code across local, background, and cloud execution modes, and choose the right agent type.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Agent sessions and where agents run

<!-- TODO update with the actual video id once published on youtube -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="Agent sessions and where agents run"></iframe>

As you work with agents, you accumulate multiple sessions across different features, bug fixes, and explorations. You also want to run several agents simultaneously. This guide covers how to navigate and manage agent sessions, and the difference between the three places an agent can run, locally in VS Code, in the background with Copilot CLI, and in the cloud on GitHub infrastructure.

## The agent sessions sidebar

The Agent Sessions sidebar is your control center for everything happening across your agents. Open it from the VS Code activity bar, or select **Show Agent Sessions Sidebar** at the top of the Chat view.

The sidebar lists every session you have worked in. Each entry shows:

* The session name.
* A timestamp for when it was last active.
* A file change count if the agent made changes you have not reviewed yet.

Select any session to open it in the Chat view. Every session is independent, with its own context window, conversation history, and tool results.

### Running multiple agents in parallel

You do not have to finish one session before starting another. Start a new session and the previous one keeps working in the background.

This lets you run multiple agents at once.

* A local session for interactive debugging.
* A background agent for refactoring a test suite.
* A cloud agent for writing documentation.

If you want to watch more than one session at once, move a session into an editor tab or separate window.

### Managing sessions

Right-select any session for management options.

* Archive hides the session from the active list but keeps it intact.
* Delete removes the session permanently.

## The agent type picker

At the bottom of the chat input is the agent type picker. It shows the current agent type and controls where the next session runs.

In a fresh session, it shows the available agent types. In an active session, it also offers handoff options.

## Local agents

Local is the default. The agent runs interactively inside VS Code with access to your workspace, tools, and terminal.

Use Local when you want to:

* Work hands-on and iterate quickly.
* Stay in control of each decision.
* Do interactive debugging or exploratory development.

## Copilot CLI background agents

Copilot CLI runs the agent as a background process on your machine while you keep working in the editor. You can run multiple CLI sessions in parallel.

CLI sessions show up in the Agent Sessions sidebar alongside local sessions.

## Cloud agents

Cloud runs the agent on GitHub infrastructure. It creates a pull request, pushes commits as it works, and leaves the result ready for review.

Use Cloud for tasks that are:

* Well-scoped with a clear done state.
* Suitable to hand off completely.
* Naturally suited to a pull request workflow.

### Starting a cloud session

In a fresh session, select **Cloud** in the agent type picker.

Here is an example prompt.

```prompt
Add a README documenting the base62 encoder, what it does, how to run it, and examples of encoding and decoding from the command line.
```

The agent spins up on GitHub infrastructure, creates a draft pull request, clones the repository, reads the code, and starts pushing commits.

### Viewing cloud sessions

If you have the GitHub Pull Requests extension installed, the pull request shows up inside VS Code. On GitHub, the repository Agents tab shows active sessions, their status, and the linked pull request.

## Handing off between agent types

In an active session, the agent type picker shows two options.

* New Chat Session starts a fresh session with an empty context window.
* Continue In hands off the current session to a different agent type and carries the full context forward.

## Choosing the right agent type

| Situation | Best choice |
| --- | --- |
| Interactive, hands-on development | Local |
| Several independent tasks in parallel | Copilot CLI |
| Well-scoped task to hand off as a pull request | Cloud |
| Exploratory work where you want to stay in the loop | Local |
| Async work to review later | Cloud |

## What's next

The Agent Sessions sidebar gives a complete view of work happening across agent types. In the [next guide](debugging-and-whats-happening-behind-the-scenes.md), you will go behind the scenes and inspect prompts, tool calls, and responses to understand what the agent is doing.

## Learn more

* [GitHub Copilot coding agent](https://github.com/features/copilot)
* [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)