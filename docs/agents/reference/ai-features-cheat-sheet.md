---
ContentId: de6f9f68-7dd5-4de3-a210-3db57882384b
DateApproved: 11/11/2026
MetaDescription: Choose AI features in {% data variables.product.prodname_vscode_shortname %} for coding, planning, testing, and reviewing changes.
---
# AI features cheat sheet

Find the AI feature in {% data variables.product.prodname_vscode %} that fits your task, take the first action, and follow the linked guide when you need more detail.

The agent examples use the [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot) in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md), unless noted otherwise. New to agents? [Complete your first task with recommended defaults](/docs/agents/quickstart.md). Available features depend on your model, account, and organization policies.

Jump to:

* [Choose a feature](#choose-a-feature).
* [Review and recover](#stay-in-control).
* [Shortcuts and commands](#shortcuts-and-common-commands).
* [Improve responses](#get-better-results).
* [Customize and scale up](#customize-and-scale-up).

<a name="access-ai-in-vs-code"></a>
<a name="editor-ai-features"></a>
<a name="scaffold-a-new-project"></a>
<a name="source-control-and-issues"></a>
<a name="search-and-settings"></a>
<a name="chat-experience-in-vs-code"></a>
<a name="planning"></a>
<a name="generate-tests"></a>

## Choose a feature

Select **Ask** or **Agent** in chat, type `/plan` to plan a change, or select code and press `kb(inlineChat.start)` for inline chat. Adapt the examples to your project and [attach relevant code or error output](/docs/chat/copilot-chat-context.md).

| Task | Feature | Example prompt |
|---|---|---|
| Understand code without changing it | [Ask](/docs/agents/guides/explore-a-codebase.md) | "Where is sign-in validated?" |
| Plan a change or feature | [Plan](/docs/agents/run/planning.md) | "/plan Add pagination without breaking existing clients" |
| Build, fix, or test | [Agent](/docs/agents/guides/add-a-feature.md) | "Fix this failure and run the relevant tests." |
| Edit selected code inline | [Inline chat](/docs/chat/inline-chat.md#use-editor-inline-chat) | "Handle empty input without changing other behavior." |
| Validate a web app | [Browser tools](/docs/agents/run/browser-tools.md) | "Submit an empty form and verify the validation message." |

For assistance without writing a prompt:

* **Complete code as you type:** Review [inline suggestions](/docs/editing/ai-powered-suggestions.md), then press `kbstyle(Tab)` to accept or `kbstyle(Escape)` to dismiss them.
* **Write a commit message:** Select the sparkle beside the **Source Control** message input to [generate a message](/docs/editing/copilot-smart-actions.md#generate-a-commit-message-and-pr-information), then review it.

<a name="review-code-experimental"></a>

## Stay in control

> [!IMPORTANT]
> Agents can save edits directly to your project. **Manual permissions** does not ask for confirmation for every file edit. Review the [security baseline](/docs/agents/run/security.md#recommended-security-baseline) before working on an existing project.

| I need to... | Action |
|---|---|
| Choose which actions require approval | Select a [permission level](/docs/agents/run/approvals.md#permission-levels) in the chat input. Keep **Manual permissions** for an interactive first task. |
| Review changes | In the {% data variables.copilot.chat_view %}, open a changed file and use [**Keep** or **Undo**](/docs/agents/run/review-code-edits.md#review-pending-edits-with-the-working-set) to accept or revert individual tracked edits. Edits are already saved. In the {% data variables.copilot.agents_window %}, inspect diffs and provide inline feedback in **Changes**. |
| Redirect or stop a request | Use the **Send** dropdown to [steer, queue, or stop and send](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running). Use **Stop** to cancel without sending another message. |
| Undo file changes | Hover over an earlier request and select [**Restore Checkpoint**](/docs/agents/run/review-code-edits.md#restore-a-checkpoint) to restore affected files and chat history. |
| Restrict terminal access | Use [agent sandboxing](/docs/agents/run/agent-sandboxing.md). |
| Keep agent execution off my machine | Run the task on a [remote host](/docs/agents/run/remote-agent-sessions.md) or in a [cloud session](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)`. Review permissions for that environment. The agent can still change its files and access connected services. |

Stopping doesn't undo completed work. Checkpoints don't reverse terminal commands or changes to external services. If you're unsure how to recover, follow [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md).

## Shortcuts and common commands

<a name="terminal"></a>

### Keyboard shortcuts

| Action | Shortcut |
|---|---|
| Open the {% data variables.copilot.chat_view %} | `kb(workbench.action.chat.open)` |
| Start a new chat with focus in the {% data variables.copilot.chat_view %} | `kb(workbench.action.chat.newChat)` |
| Open inline chat with focus in the editor | `kb(inlineChat.start)` |
| Open [terminal inline chat](/docs/chat/inline-chat.md#use-terminal-inline-chat) with focus in the terminal | `kb(workbench.action.terminal.chat.start)` |
| Open [Quick Chat](/docs/chat/inline-chat.md#use-quick-chat) | `kb(workbench.action.quickchat.toggle)` |
| Accept an inline suggestion in the editor | `kb(editor.action.inlineSuggest.commit)` |
| Dismiss an inline suggestion in the editor | `kb(editor.action.inlineSuggest.hide)` |

For spoken interaction, see [Voice Mode](/docs/configure/accessibility/voice.md#use-voice-mode) `feature(voice-mode)` and [built-in dictation](/docs/configure/accessibility/voice.md#use-built-in-dictation) `feature(built-in-dictation)`.

### Slash commands

These commands work in {% data variables.product.prodname_copilot_short %} harness sessions. Type `/` in the chat input to see available commands and installed skills.

| Command | Purpose |
|---|---|
| `/plan <task>` | Research the task and propose a plan before implementation. |
| `/compact` | [Summarize earlier conversation context](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context). |
| `/fork` | [Copy the conversation with its history](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session) to explore another approach. Forking doesn't isolate file changes. |
| `/<skill-name>` | [Run an installed skill](/docs/agent-customization/agent-skills.md#use-skills-as-slash-commands) by name. |

<a name="add-context-to-your-prompt"></a>

## Get better results

Combine the task, constraints, and verification in one request:

```prompt
Find the cause of the failing authentication test.
Fix the implementation without changing the expected behavior.
Run the relevant tests and summarize the change and results.
```

| I need to... | Action |
|---|---|
| Ground a request in my code | Select **Add Context** or type `#` to [attach files, symbols, or other context](/docs/chat/copilot-chat-context.md). Include relevant errors and test output. |
| Balance quality, speed, and cost | Use the [model picker](/docs/agent-customization/language-models.md#change-the-model-for-chat), or **Auto** when available. Changing the model doesn't change the harness. |
| Use another agent provider | Open **Session Target** and [choose a harness](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses). Check its account and tool requirements. |
| Use my own model credentials | Follow [BYOK setup](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) for {% data variables.product.prodname_copilot_short %} sessions. `feature(agent-host-byok-models)` Inline suggestions and semantic search still require the {% data variables.product.prodname_copilot %} service. |
| Reuse knowledge across conversations | Ask the agent to remember a durable convention with [{% data variables.copilot.copilot_memory %}](/docs/agents/run/memory.md#copilot-memory). [Review and delete cloud memories](/docs/agents/run/memory.md#review-and-delete-cloud-memories) on {% data variables.product.prodname_github %}. |

Agents can search your workspace and choose tools automatically. See [workspace context](/docs/agents/reference/workspace-context.md) for what they can find, and [AI credit usage guidance](/docs/agents/guides/optimize-usage.md) to manage conversation cost.

To search yourself without exact keywords, use [semantic code search](/docs/editing/copilot-smart-actions.md#semantic-search-results-preview) (Preview) or [AI settings search](/docs/editing/copilot-smart-actions.md#search-settings-with-ai).

<a name="customize-your-chat-experience"></a>

## Customize and scale up

### Tailor agents to your project

Run **Chat: Open Customizations** to open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) for your selected session. Start with a recurring need, rather than configuring every option.

| I want to... | Use |
|---|---|
| Apply project conventions | [Instructions](/docs/agent-customization/custom-instructions.md) for coding standards and test commands. |
| Reuse a task or multi-step workflow | [Agent skills](/docs/agent-customization/agent-skills.md), loaded when relevant or invoked by name. |
| Define a specialized role | [Custom agents](/docs/agent-customization/custom-agents.md) with focused instructions and tools. |
| Connect an external service | [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)` for supported services without server setup, or [MCP servers](/docs/agent-customization/mcp-servers.md) you configure yourself. |
| Run commands at workflow events | [Hooks](/docs/agent-customization/hooks.md) supported by your harness. |
| Install a packaged setup | [Agent plugins](/docs/agent-customization/agent-plugins.md) from [community or organization marketplaces](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace). |

### Coordinate and continue work

| I want to... | Start with |
|---|---|
| Manage independent tasks | Select **Open in Agents** to use the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). Use [separate worktrees](/docs/agents/guides/delegate-two-tasks.md) when changes must stay separate. |
| Delegate part of a task | Ask for a [subagent](/docs/agents/run/subagents.md#subagents-by-harness) to investigate a bounded question and report back. |
| Continue work from another device | Register your host through **Remote Connections** with [{% data variables.copilot.github_environments %}](/docs/agents/run/remote-agent-sessions.md#make-a-host-available-for-remote-access). `feature(github-environments)` Keep the host running and reachable. |
| Work without keeping my machine online | Follow [cloud session setup](/docs/agents/run/cloud-sandbox-sessions.md#prerequisites), then select **Cloud** for a new session. `feature(cloud-sessions)` |
| Repeat a task automatically | Select **Automations** in the {% data variables.copilot.agents_window %} to [create an automation](/docs/agents/run/automations.md#create-an-automation). Review a manual run before scheduling it. |

For unattended repository work, [cloud automations](/docs/agents/run/automations.md#choose-where-an-automation-runs) `feature(cloud-automations)` run on {% data variables.product.prodname_github %} without keeping your computer online.

## Next steps

* [Find a step-by-step guide for your task](/docs/agents/guides/overview.md).
* [Adapt a prompt example to your project](/docs/agents/guides/prompt-examples.md).
