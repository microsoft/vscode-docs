---
ContentId: 77f594c1-b808-4421-9729-d6b17dd16e16
DateApproved: 09/08/2026
MetaDescription: Recover an AI agent session in {% data variables.product.prodname_vscode_shortname %} by steering requests, restoring checkpoints, and resetting context.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- troubleshooting
- checkpoints
- context
- recovery
---
# Get an agent back on track

An AI agent might misunderstand the goal, repeat an unsuccessful action, change more files than expected, or lose track of an earlier decision. Intervene as soon as you recognize a mismatch. Early corrections preserve useful work and reduce the number of changes you need to review or undo.

This guide helps you choose the least disruptive recovery action. You learn how to redirect a running request, correct completed work, recover unwanted changes, reset conversation context, and diagnose repeated failures.

## Choose a recovery action

Start with the symptom you observe:

| Symptom | Recovery action |
|---|---|
| The agent appears idle or blocked. | [Check the current state](#assess-the-current-state) for a pending question, approval request, or running terminal command. |
| The agent is still running, and the current approach is safe but incorrect. | [Steer the request](#redirect-a-running-request) with a focused correction. |
| The agent is about to perform an unsafe, destructive, or irrelevant action. | [Stop the request](#redirect-a-running-request) immediately and state what it must not do. |
| The response is complete, and most of the work is useful. | [Send a focused follow-up](#correct-a-completed-response) that identifies the specific mismatch. |
| An ambiguous earlier prompt caused the agent to take the wrong approach. | [Edit the earlier request](#correct-a-completed-response) and resend it. |
| File changes after a known point are unwanted. | [Restore a checkpoint](#recover-unwanted-changes). |
| You want to compare another approach without losing the current conversation. | [Fork the conversation](#reset-conversation-context). |
| The conversation contains too much irrelevant or conflicting context. | [Compact the context or start a new session](#reset-conversation-context). |
| The agent follows your instructions but repeatedly encounters the same error. | [Diagnose the failure](#diagnose-repeated-failures) before it retries. |

> [!CAUTION]
> If the agent is about to run a destructive command, deploy a change, expose sensitive information, or modify an external service, stop the request before you investigate further.

## Assess the current state

Before you ask the agent to continue, identify what happened and what you want to preserve:

1. Check whether the agent is waiting for an answer or approval, or is tracking a terminal command that is still running.
1. Find the earliest point where the agent's work diverged from your intent.
1. Review the changed files, recent tool calls, terminal output, and error messages.
1. Separate correct work from changes that need revision or removal.
1. Check whether completed actions affected only workspace files or also affected the terminal, network, deployments, or external services.
1. Write down the expected result, constraints, and validation that the agent missed.

Use these facts in your correction. Avoid prompts such as "try again" or "fix it," which don't tell the agent what needs to change.

## Redirect a running request

While a request is running, type your correction in the chat input box. The **Send** button menu becomes available after you type a message. Open the menu and choose how the new message should affect the current request:

* Select **Steer with Message** when the current actions are safe, but the agent needs a different approach. The agent finishes the active tool call, stops the current response, and processes your correction.

* Select **Stop and Send** when the agent should not continue the current request. {% data variables.product.prodname_vscode_shortname %} cancels the request and sends your new message immediately.

For example, steer an agent before it makes more edits:

```prompt
Do not change the database schema or add dependencies. Stop editing after the current tool call. Explain why the existing API tests fail, then propose a fix limited to src/api. Wait for my approval before changing files.
```

If an action presents an immediate risk, stop it and ask the agent to report the current state:

```prompt
Stop. Do not run deployment commands or modify external services. Summarize the commands and tool calls that already completed, list their effects, and wait for further instructions.
```

Steering or stopping a request does not undo actions that already completed. Review the current changes and [restore a checkpoint](#recover-unwanted-changes) if you need to rewind workspace files.

Learn more about [sending messages while a request is running](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running).

## Correct a completed response

When the response is complete, choose how much of the conversation and work to keep.

### Send a focused follow-up

Keep the current work when the overall approach is correct. Describe the observed mismatch, the expected result, the boundaries of the correction, and how to verify it:

```prompt
The new test passes, but the existing pagination test now fails because the response shape changed. Keep the public API unchanged. Update only the pagination calculation, run the complete API test suite, and report the test results.
```

If the agent repeats the same unsuccessful action, require analysis before another attempt:

```prompt
Do not rerun the unchanged command. Summarize the first error, identify which assumption the error disproves, and propose two different recovery options. Do not edit files or run commands until I choose an option.
```

### Edit an earlier request

Edit a previous request when its wording introduced the wrong requirement or omitted an important constraint. When you edit and resend a request, {% data variables.product.prodname_vscode_shortname %} reverts workspace file changes from that request and all subsequent requests, then processes the revised prompt.

Before you edit the request, review the affected changes so you understand which work will be removed. Select the prompt in the conversation, modify its text, and resend it. Learn more about [editing a previous chat request](/docs/agents/run/review-code-edits.md#edit-a-previous-chat-request).

## Recover unwanted changes

Use a checkpoint when you can identify the last request before the agent's workspace changes went wrong. Restoring the checkpoint returns affected workspace files and chat history to that point.

In supported chat sessions, checkpoints are enabled by default and created automatically before each request is processed. Send a request to establish a checkpoint before the agent makes changes. You don't need to create one manually.

Before you restore:

1. Review the changed files for the requests you plan to remove.
1. Check for completed actions outside the workspace.
1. Record any error output or decisions that you need for the revised request.

After you restore, restate the task with the missing constraints and expected validation.

> [!IMPORTANT]
> Checkpoints don't reverse terminal commands, network requests, deployments, or changes to external services. Use Git or the external system's recovery controls to reverse those effects. Checkpoints are temporary and don't replace Git version control.

For the complete procedure and scope, see [restore a checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint).

## Reset conversation context

Recovery sometimes requires changing the conversation rather than the code. Choose the option that matches how much context remains useful.

### Compact the current conversation

Use `/compact` when you want to continue the same task but the conversation contains old exploration, repeated output, or details that no longer matter. Tell the agent which facts to retain:

```prompt
/compact Retain the approved API contract, the root cause of the pagination failure, the files changed so far, and the required test commands. Discard superseded approaches and repeated command output.
```

Compaction summarizes earlier history. It doesn't change workspace files. Learn more about [compacting conversation context](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context).

### Fork the conversation

Fork from a checkpoint when you want to explore a different approach while preserving the original conversation. You can compare the results and return to the original session if the alternative is not useful.

A fork creates separate conversation history, but it doesn't always provide separate files. Depending on the session type, the fork might share the same folder or Git worktree. Use a separate worktree-isolated session when both approaches must modify files independently. Learn more about [forking a chat session](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session).

### Start a new session

Start a new session when:

* The goal changed into a different task.
* Earlier instructions conflict with the current requirements.
* Repeated corrections make it difficult to identify the authoritative decision.
* You want the agent to investigate the current workspace without inheriting earlier assumptions.

Starting a new session doesn't undo file changes. Review or restore the workspace first, then provide a concise prompt with the current state, accepted decisions, constraints, and validation criteria.

## Diagnose repeated failures

If the agent understands the task but can't make progress, stop automatic retries and investigate the underlying failure.

1. Ask the agent to report the exact command or tool that failed, the first error, and the evidence it used to diagnose the error.
1. Verify prerequisites such as the working directory, installed dependencies, required services, authentication, and permissions.
1. Ask for recovery options that don't repeat the failed action.
1. If debug logging was active for the session, use `/troubleshoot` to analyze the captured logs when you need to understand ignored instructions, unexpected tool behavior, or slow responses.
1. For deeper inspection, use the Agent Debug Log panel (Preview) to review model requests, tool calls, prompt-file discovery, and errors.

For connectivity, extension, customization, and MCP server problems, follow the [AI troubleshooting procedures](/docs/agents/agent-troubleshooting/troubleshooting.md). To inspect an agent interaction, see [Debug chat interactions](/docs/agents/agent-troubleshooting/chat-debug-view.md).

## Prevent the agent from drifting

Reduce the need for recovery by making the intended outcome observable:

* Define the task boundary, constraints, and files or systems that must not change.
* Include acceptance criteria, expected output, or test commands.
* Ask for a plan before implementation when the task spans several components or contains significant risk.
* Commit a known-good starting point with Git before a large change.
* Keep **Manual permissions** selected for unfamiliar repositories, tools, and workflows.
* Review the first meaningful result instead of waiting until the entire task is complete.
* Start a new session when you switch to an unrelated task.

## Related resources

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md)
* [Review and revert agent changes](/docs/agents/run/review-code-edits.md)
* [Troubleshoot AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/agent-troubleshooting/troubleshooting.md)
