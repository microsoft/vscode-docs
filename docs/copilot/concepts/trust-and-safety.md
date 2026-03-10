---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 3/9/2026
MetaDescription: Learn about the control mechanisms and safety considerations when using AI in VS Code, including review tools, tool approval, and AI limitations.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- trust
- safety
- security
- review
- checkpoints
- tool approval
- limitations
- prompt injection
---

# Trust and safety

AI-generated output requires review. Visual Studio Code includes multiple mechanisms to keep you in control of what changes reach your codebase. This article explains the control mechanisms, AI limitations, and security considerations you should be aware of.

## Stay in control

Agents can read files, edit code, run terminal commands, and call external services. VS Code provides several mechanisms to ensure you remain in charge of what happens in your workspace:

* **Review edits before applying.** Agents show file changes in a diff view. You can review each change, accept or reject individual edits, and modify the code before saving. Learn more about [reviewing code edits](/docs/copilot/chat/review-code-edits.md).

* **Use checkpoints to revert.** Agent sessions create checkpoints as work progresses. If the agent takes a wrong turn, return to a previous checkpoint and try a different approach. Learn more about [checkpoints](/docs/copilot/chat/chat-checkpoints.md).

* **Approve tool calls.** VS Code asks for your approval before running terminal commands or using tools with side effects. You control which tools can run automatically and which require confirmation.

* **Choose a permission level.** Control how much autonomy the agent has: **Default Approvals** requires confirmation for sensitive tools, **Bypass Approvals** auto-approves all tool calls, and **Autopilot** (Preview) also auto-responds to questions and continues autonomously. For higher autonomy levels, pair with [terminal sandboxing](/docs/copilot/agents/agent-tools.md#sandbox-terminal-commands) or a container.

* **Trust boundaries.** VS Code enforces security boundaries around file access, URL access, terminal sandboxing, and MCP server interactions. Learn more about [AI security](/docs/copilot/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues.

## AI limitations to watch for

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to redirect the agent's behavior. This is why VS Code includes tool approval gates and trust boundaries. Learn more about [AI security](/docs/copilot/security.md).

Treat AI-generated output as a first draft: useful as a starting point, but always requiring your review and judgment. For more on how models work, including nondeterminism, knowledge boundaries, and context limits, see [Language models](/docs/copilot/concepts/language-models.md).

## Related resources

* [AI security considerations](/docs/copilot/security.md)
* [Reviewing code edits](/docs/copilot/chat/review-code-edits.md)
* [Checkpoints](/docs/copilot/chat/chat-checkpoints.md)
* [Tool approval](/docs/copilot/agents/agent-tools.md#tool-approval)
