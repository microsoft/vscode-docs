---
ContentId: 2f1c7a0e-69d4-4b83-bb72-0e897a31f5c6
DateApproved: 10/21/2026
MetaDescription: Choose an agent interface, scope a task, guide the work, and review results in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/agents-overview/chat-view-expanded.png
---
# Run agents in {% data variables.product.prodname_vscode_shortname %}

Run a bounded task with an agent, guide its progress, and review the result before integrating changes. Choose an interface that fits your workflow and start with the recommended setup. Adjust the harness, model, isolation, or permissions only when your task requires it.

## Choose an interface

Both the {% data variables.copilot.chat_view %} and {% data variables.copilot.agents_window %} run agents. Choose based on where you want to focus:

| Interface | Start here when |
|---|---|
| [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) | You want to collaborate over code in the current workspace while using the editor, debugger, terminals, and tests alongside the conversation. A workspace can contain one or more folders. |
| [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) | You want to assign higher-level tasks, coordinate work across projects, and monitor several sessions from a dedicated window. |

You can direct agents and review their work in either interface. Which sessions you can [continue between interfaces and applications](/docs/agents/concepts/sessions.md) depends on the harness and provider.

## Start with a bounded task

Before the agent acts, state the outcome, relevant context, boundaries, and evidence that will demonstrate success. A narrow request makes progress easier to review and reduces unintended changes.

If this is your first agent task, follow the [agents quickstart](/docs/agents/quickstart.md). To work in your own repository, use the [experienced-agent fast track](/docs/agents/guides/overview.md#experienced-agent-fast-track) to choose a guide. Keep the recommended defaults for your first task instead of configuring every session option.

For example:

```prompt
Add an optional title filter to the issues API. Preserve the response
shape and pagination behavior. Reuse existing patterns and don't add
dependencies. Run the targeted tests and report the exact results.
```

## Plan, run, and steer

Ask the agent to plan first when requirements are unclear, the change crosses several parts of the project, or you need to compare approaches. Review its assumptions, affected files, and verification steps before implementation. For a dedicated workflow, see [Plan work with agents](/docs/agents/run/planning.md).

For a small, well-defined change, ask the agent to implement it directly. As it works, follow tool calls, output, questions, and approval requests. If the approach drifts while a request is running, use the [running-request controls](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running) to send a focused correction or stop the request.

## Review, validate, and recover

Use the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list) to monitor status. When the agent finishes, [review its code edits](/docs/agents/run/review-code-edits.md), including changed and untracked files. Inspect the agent's test output, then run the relevant tests and perform the user-visible checks yourself. Integrate only the changes that match the task and pass your project's requirements.

If work goes off track, choose the least disruptive [recovery action](/docs/agents/guides/get-agent-back-on-track.md#choose-a-recovery-action). Stopping a request doesn't undo completed actions. Checkpoints restore supported workspace files and conversation history, not terminal commands, network requests, deployments, or changes to external services. Use the affected system's recovery controls for those external effects.

## Adjust the setup only when needed

Change one dimension at a time so you can tell why the workflow behaves differently:

* **Harness and execution location:** [compare agent harnesses](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses) when you need different tools, customizations, providers, or a different place for the agent to run.
* **Model:** [choose or add a language model](/docs/agent-customization/language-models.md) based on task complexity, availability, and cost. Changing the model doesn't change the harness.
* **Code isolation:** [choose a folder or worktree](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes) to control where edits land. A worktree separates code changes, not access to your machine. Use [agent sandboxing](/docs/agents/run/agent-sandboxing.md#understand-the-sandbox-boundary) for supported file system and network restrictions.
* **Permissions:** [choose a permission level](/docs/agents/run/approvals.md#permission-levels) based on which actions should require confirmation. Permissions and sandboxing provide different protections.

## Next steps

* [Apply agent best practices](/docs/agents/best-practices.md).
* [Review the recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline).
