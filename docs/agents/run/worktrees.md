---
ContentId: 526fd4d2-eec4-4ac9-8d3b-9ca8ee0ce032
DateApproved: 11/23/2026
MetaDescription: Choose where agents change code in {% data variables.product.prodname_vscode_shortname %}, prepare isolated worktrees, and integrate reviewed results.
MetaSocialImage: ../images/agent-harnesses/agents-window-new-worktree-2.png
Keywords:
- agents
- worktrees
- code isolation
- parallel tasks
---
# Work with agents in worktrees

Choose where an agent changes files before you start a coding task. Use your current folder to work with existing edits, or a separate [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) to keep an independent task's changes apart. This article helps you choose isolation, prepare the worktree, and bring reviewed changes back into your project.

Separate conversations don't automatically mean separate files. Chats in the same folder or worktree can change the same files, even when they have different conversation histories.

## Choose folder or worktree isolation

The available choices depend on the session's harness and execution environment.

| Aspect | Current folder | New worktree |
|---|---|---|
| Best for | Working with existing files and unfinished edits. | Independent tasks or alternative implementations. |
| Where edits go | Directly into the selected folder. | Into a separate working directory and branch. |
| Starting point | The folder's current files, including uncommitted changes. | Committed files from the session's base branch. |
| Uncommitted and untracked files | Available in the folder. | Not copied from the original folder. |
| Integration | Edits are already in the selected folder. | Review and integrate the worktree branch afterward. |

For parallel implementation tasks, use a separate worktree for each task. For related conversations that should share edits, use the same folder or worktree. Forking a chat doesn't by itself create another worktree.

> [!IMPORTANT]
> A worktree separates working files, not the agent's access to your machine or external services. Choose from the [permission levels](/docs/agents/run/approvals.md#permission-levels) your harness offers, and use [agent sandboxing](/docs/agents/run/agent-sandboxing.md) for operating system-level restrictions.

## Prepare a worktree

1. Use a Git repository with at least one commit and a harness that supports worktree isolation. Dev Container sessions work directly in the container workspace and don't offer **New Worktree**.

1. Commit the code the task needs. A new worktree doesn't include uncommitted or untracked files from the original folder.

1. Choose the session's base branch before starting work. Don't assume it is the branch currently checked out in your editor. For tasks you want to compare or integrate together, start each from the same known-good commit.

1. Prepare dependencies and local configuration in the new worktree before running the project.

Git-ignored files, such as installed dependencies and local configuration, are absent from new worktrees by default. Run your project's setup or [configure which ignored files to copy](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree). Only include configuration that is safe for the agent to access.

For large ignored folders, [symlinking instead of copying](/docs/sourcecontrol/branches-worktrees.md#symlink-ignored-folders-when-creating-a-worktree) is Experimental. Changes through a symlink affect the original folder, so don't use it for files that must stay isolated.

Worktrees can still share ports, databases, and other external resources. Use separate test resources or run conflicting checks one at a time.

## Start a worktree session

Choose the interface that fits how you want to work:

| Interface | Workflow |
|---|---|
| [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes) | Choose **New Worktree** and a base branch in the session input. Coordinate sessions across projects or view several side by side. |
| [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md#work-in-separate-worktrees) `feature(editor-worktrees)` | In {% data variables.product.prodname_vscode_shortname %} Insiders, enable editor worktree support for a single local Git folder. Choose **New Worktree** before the first prompt. The editor's folder location follows the chat you open. |

Each interface has its own controls and defaults. Follow the linked setup instructions, and confirm the session's working directory and branch before editing, running commands, or committing.

## Review and integrate changes

Switching chats or opening another worktree doesn't merge changes into your original folder. Review each task's complete changes, including untracked files, and run the relevant checks in its worktree. Follow [Review AI-generated code edits](/docs/agents/run/review-code-edits.md) for the controls available in each interface.

Commit the changes you want to keep, then [merge the worktree branch](/docs/sourcecontrol/branches-worktrees.md#merge-and-publish-branches) into your intended destination branch or use your team's pull request workflow. The {% data variables.copilot.agents_window %} also provides [integration actions](/docs/agents/run/agents-window.md#integrate-the-result) for supported sessions.

After combining changes, rerun the relevant checks on the destination branch. Keep the sessions and worktrees available until you have preserved the changes and validated the combined result. For manual cleanup, see [Remove a worktree](/docs/sourcecontrol/branches-worktrees.md#remove-a-worktree).

## Related resources

* [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md)
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
