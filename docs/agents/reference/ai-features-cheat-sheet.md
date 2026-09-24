---
ContentId: de6f9f68-7dd5-4de3-a210-3db57882384b
DateApproved: 9/16/2026
MetaDescription: Choose AI features in {% data variables.product.prodname_vscode_shortname %} for coding, planning, testing, and reviewing changes.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# AI features cheat sheet

Find the AI feature in {% data variables.product.prodname_vscode %} that fits your task, from a focused edit to work you delegate to an agent. Use this reference for common tasks, useful controls, and shortcuts.

New to agents? [Complete your first task with an agent](/docs/agents/quickstart.md). Available features depend on your [agent harness](/docs/agents/run/agent-harnesses.md), model, account, and organization policies.

<a name="access-ai-in-vs-code"></a>
<a name="editor-ai-features"></a>
<a name="scaffold-a-new-project"></a>
<a name="source-control-and-issues"></a>
<a name="python-and-notebook-support"></a>
<a name="search-and-settings"></a>

## Choose a feature

| I want to... | Use | Start with... |
|---|---|---|
| Understand unfamiliar code | [Chat](/docs/chat/chat-overview.md) | Ask "Trace how a request reaches the database." |
| Plan a complex change | [Plan agent](/docs/agents/run/planning.md) | Select **Plan** and describe the change to research before implementation. |
| Build a feature, fix a bug, or create a project | [Agents](#use-agents) | Select **Agent**, describe the outcome, and specify how to verify it. |
| Make a focused edit | [Inline chat](/docs/chat/inline-chat.md) | Select code in the editor and describe the change. |
| Get help while typing and editing | [Inline suggestions](/docs/editing/ai-powered-suggestions.md) | Accept ghost text to complete code, or use next edit suggestions to navigate to and apply a related edit. |
| Manage independent tasks across projects | [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) (Preview) | Select **Open in Agents** in the title bar, then start and monitor sessions. |
| Delegate work that returns a pull request | [Cloud agents](/docs/agents/run/agent-harnesses.md#start-a-cloud-session) | Choose the **Cloud** session target and a repository. |
| Check a web app's behavior | [Browser tools](/docs/agents/run/browser-tools.md) | Ask the agent to open the app, test a user flow, and report the result. |
| Repeat routine work on a schedule | [Automations](/docs/agents/run/automations.md) `feature(automations)` | Save a prompt and schedule in the {% data variables.copilot.agents_window %}. |
| Generate commit messages or rename symbols | [Smart actions](/docs/editing/copilot-smart-actions.md) | Use the sparkle action or editor context menu without writing a prompt. |
| Explore data or edit a notebook | [AI for notebooks](/docs/agents/guides/notebooks-with-ai.md) | In a **Local** agent session, ask the agent to create, edit, and run notebook cells. |
| Find code or settings without exact keywords | [Semantic search](/docs/editing/copilot-smart-actions.md#semantic-search-results-preview) (Preview) and [AI settings search](/docs/editing/copilot-smart-actions.md#search-settings-with-ai) | Search by meaning in the Search view, or describe a setting in the Settings editor. |

<a name="chat-experience-in-vs-code"></a>
<a name="planning"></a>

## Use agents

Use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) to work beside your code, or the **{% data variables.copilot.agents_window %}** to focus on assigning higher-level tasks and reviewing outcomes.

For a complex change, **plan**, **implement**, **verify**, then **review**:

* **Plan:** Ask the Plan agent to research the change and identify risks. Review the approach before handing it to an implementation agent.
* **Implement:** Describe the intended behavior and constraints. The agent searches your code, edits files, and uses tools.
* **Verify:** Ask the agent to run relevant tests or exercise the app. Inspect what it actually checked.
* **Review:** Review the diff and validation results before committing or merging.

For example, give the agent a concrete browser check:

```prompt
Open the app and test the sign-up flow with a missing email address.
Verify that it shows a validation error and does not submit the form.
Report what you tested and any problems you found.
```

To organize larger tasks:

* Use [separate sessions and worktrees](/docs/agents/guides/delegate-two-tasks.md) for independent tasks that should not share code changes.
* Use [subagents](/docs/agents/run/subagents.md) to delegate a focused part of a task in a separate context.
* [Hand off a session](/docs/agents/run/agent-harnesses.md#hand-off-a-session) when you want to continue work with another supported session target.

<a name="add-context-to-your-prompt"></a>

## Get better results

| Need | What to use |
|---|---|
| Ground a request in specific code or a failure | [Add context](/docs/chat/copilot-chat-context.md) with **Add Context**, `#`-mentions, or dragged files. Attach relevant code, errors, test output, or GitHub issues. |
| Explore the codebase without finding every file yourself | Let the agent gather [workspace context](/docs/agents/reference/workspace-context.md) with search and language tools. |
| Balance reasoning, speed, and cost | Use the [model picker](/docs/agent-customization/language-models.md), or **Auto** when available. Changing the model does not change the agent harness. |
| Work with another agent provider | [Choose a harness](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target), such as {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude %}, or {% data variables.product.prodname_openai_codex %}. Check its tools, authentication options, and setup requirements. |
| Use your own model provider or a local model | Configure [bring your own key (BYOK)](/docs/agent-customization/language-models.md#bring-your-own-language-model-key). Inline suggestions and semantic search still require the {% data variables.product.prodname_copilot %} service. |
| Retain useful knowledge across conversations | Ask the agent to remember it with [memory](/docs/agents/run/memory.md). Use **Chat: Show Memory Files** to inspect stored notes. |
| Manage a long conversation or its cost | Check [context usage](/docs/agents/run/sessions/manage-sessions.md#manage-session-context), compact the conversation, or start a new chat for an unrelated task. See [usage guidance](/docs/agents/guides/optimize-usage.md). |

<a name="review-code-experimental"></a>

## Stay in control

| I need to... | Action |
|---|---|
| Decide which actions need confirmation | Choose a session [permission level](/docs/agents/run/approvals.md#permission-levels) and review tool requests. **Allow all** bypasses confirmations and should not be treated as a prerequisite for using agents. |
| Redirect work in progress | [Steer, queue a follow-up, or stop the request](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running). Stopping does not undo completed actions. |
| Inspect or undo agent changes | [Review the diff, provide feedback, or restore a checkpoint](/docs/agents/run/review-code-edits.md). Validate the result before integrating it. |
| Restrict terminal access to files and the network | Use [agent terminal sandboxing](/docs/agents/run/agent-sandboxing.md) (Preview on macOS, Linux, and WSL2, Experimental on Windows). A Git worktree separates code changes, but is not a security boundary. |
| Ask AI to review my code | Use [code review smart actions](/docs/editing/copilot-smart-actions.md#review-code). This generates review feedback, not a replacement for your review of agent changes. |

> [!IMPORTANT]
> Agents can save edits directly to the session's folder or worktree. **Manual permissions** does not ask for confirmation for every file edit. Review the [security baseline](/docs/agents/run/security.md#recommended-security-baseline) before working on an existing project.

<a name="customize-your-chat-experience"></a>

## Customize your workflow

| I want to... | Use |
|---|---|
| Apply project conventions without repeating them | [Instructions](/docs/agent-customization/custom-instructions.md) for coding standards, architecture, and test commands. |
| Package a workflow with supporting scripts or examples | [Agent skills](/docs/agent-customization/agent-skills.md), loaded when relevant or invoked by name. |
| Run a saved prompt on demand | [Prompt files](/docs/agent-customization/prompt-files.md), invoked as slash commands. |
| Define a specialized role and tool selection | [Custom agents](/docs/agent-customization/custom-agents.md), such as a read-only reviewer. |
| Connect a database, issue tracker, or other external system | [MCP servers](/docs/agent-customization/mcp-servers.md) that provide tools. |
| Run a command at a specific agent lifecycle event | [Hooks](/docs/agent-customization/hooks.md), rather than relying on the model to follow an instruction. |
| Install a packaged set of customizations | [Agent plugins](/docs/agent-customization/agent-plugins.md). |

Use the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) to create and manage these options for your selected harness.

<a name="generate-tests"></a>

## Debug and fix problems

| Task | Starting point |
|---|---|
| Generate tests | Select code and use **Generate Code** > **Generate Tests**, or ask an agent to add and run tests with your project's framework. |
| Diagnose a failing test | Select **Fix Test Failure** in the Test Explorer, or attach the failure output to chat. |
| Fix a compiler or linting error | Use the editor Code Action (lightbulb), or attach the problem to chat. |
| Configure a debugging session | Ask for a debug configuration, or use `copilot-debug` (Preview) before a terminal run command, such as `copilot-debug python foo.py`. |

Combine the task, constraint, and verification in one request:

```prompt
Find the cause of the failing authentication test.
Fix the implementation without changing the expected behavior.
Run the relevant tests and summarize the change and results.
```

See [smart actions for tests and errors](/docs/editing/copilot-smart-actions.md#fix-testing-errors) and [debugging](/docs/debugtest/debugging.md).

<a name="terminal"></a>

## Essential keyboard shortcuts

| Action | Shortcut |
|---|---|
| Open the {% data variables.copilot.chat_view %} | `kb(workbench.action.chat.open)` |
| Start a new chat | `kb(workbench.action.chat.newChat)` |
| Open editor inline chat | `kb(inlineChat.start)` |
| Open [terminal inline chat](/docs/chat/inline-chat.md#use-terminal-inline-chat) | `kb(workbench.action.terminal.chat.start)` |
| Open [Quick Chat](/docs/chat/inline-chat.md#use-quick-chat) | `kb(workbench.action.quickchat.toggle)` |
| Accept an inline suggestion | `kb(editor.action.inlineSuggest.commit)` |
| Dismiss an inline suggestion | `kb(editor.action.inlineSuggest.hide)` |

For spoken interaction, see [Voice Mode](/docs/configure/accessibility/voice.md#use-voice-mode) `feature(voice-mode)` and [built-in dictation](/docs/configure/accessibility/voice.md#use-built-in-dictation) `feature(built-in-dictation)`.

## Chat reference

### Chat tools

Agents choose tools automatically. You do not need to name every tool in your prompt. Type `#` to browse available tools and context items, or reference a tool to direct the agent to a capability. See the [Tools and context reference](/docs/agents/reference/tools-reference.md) for individual names.

### Slash commands

Type `/` to see commands available in the current session. Availability depends on the chat surface, harness, role, and enabled features.

| Command | Purpose |
|---|---|
| `/plan` | Research and propose an implementation plan. |
| `/explain`, `/fix`, `/tests` | Explain code, suggest a fix, or generate tests. |
| `/doc` | Generate documentation comments from editor inline chat. |
| `/setupTests` (Experimental) | Get help choosing and setting up a test framework. |
| `/new`, `/newNotebook` | Scaffold a workspace, file, or notebook. |
| `/compact`, `/fork` | Compact context, or branch the conversation with its history. |
| `/clear` | Start a new chat and archive or mark the current chat as done. |
| `/rename <name>`, `/help` | Rename a local chat, or list commands and agents in a local Ask chat. |
| `/models`, `/tools` | Open the model picker, or configure tools for a local chat. |
| `/init` | Generate or update workspace instructions in a local agent session. |
| `/agents`, `/instructions`, `/skills`, `/prompts`, `/hooks` | Configure the corresponding customization type. |
| `/create-agent`, `/create-instructions`, `/create-skill`, `/create-prompt`, `/create-hook` | Generate a customization in a local agent session. |
| `/troubleshoot` | Analyze agent debug logs in a local or {% data variables.copilot.copilot_cli_short %} session. |
| `/debug` | Open the Chat Debug view from the {% data variables.copilot.chat_view %}, not the {% data variables.copilot.agents_window %}. |
| `/sandbox-policy` | Inspect the [effective sandbox policy](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy) for a {% data variables.product.prodname_copilot_short %} Agent Host session. |
| `/<name>` | Invoke an agent skill or reusable prompt by name. |

For example, a skill in `.github/skills/webapp-testing/SKILL.md` can be invoked with `/webapp-testing`. For permission and Autopilot commands, see [approvals and permissions](/docs/agents/run/approvals.md).

### Chat participants

In chat surfaces that support participants, type `@` to choose a specialist. Use `@github` for repositories, issues, and pull requests, `@terminal` for shell questions, or `@vscode` for editor features and settings. For example, `@vscode /search` generates a Search view query.

## Next steps

* [Apply AI best practices to your project](/docs/agents/best-practices.md).
* [Look up AI settings](/docs/agents/reference/ai-settings.md).
