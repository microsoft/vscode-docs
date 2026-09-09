---
ContentId: d2159d8c-be90-421f-91a3-3af033e9ddbf
DateApproved: 09/08/2026
MetaDescription: Delegate two independent agent tasks in {% data variables.product.prodname_vscode_shortname %}, review isolated changes, and integrate and test the result.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- delegation
- parallel tasks
- worktrees
- code review
---
# Delegate two tasks without mixing their changes

When two coding tasks are independent, you can assign each to an agent and let both run while you review their progress. Separate conversations keep instructions focused, but they don't necessarily keep file changes separate.

In this guide, you choose two changes in your own repository, run them in separate Git worktrees, review each result, and integrate and retest the combined change. You define the tasks and their acceptance criteria first, then use them throughout the workflow. No sample project is required.

## Prerequisites

To follow this guide, you need:

* {% data variables.product.prodname_vscode %} with [AI features set up](/docs/setup/copilot.md).
* Access to the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), which is currently in Preview, and the **{% data variables.product.prodname_copilot_short %}** session target.
* A local Git repository with at least one commit, a working development environment, and existing tests.
* Experience completing a single agent-assisted task. If you're new to agents, start with the [agents quickstart](/docs/agents/quickstart.md).

## 1. Separate the work

Choose two small changes from your backlog and label them **task A** and **task B**. Each task must be implementable and testable against the current code, without waiting for the other task.

Create a brief for each task with the following details. You use these briefs to write the delegation prompts and review the results.

| Detail | What to record |
|---|---|
| Outcome | The observable change you want, such as an input that must produce a particular result. |
| Allowed files | The implementation and test files the agent can edit. |
| Acceptance criteria | The behavior or test results that prove the task is complete. |
| Behavior to preserve | Existing behavior that must remain unchanged. |
| Out of scope | Files and changes the agent must avoid, including the other task's implementation. |
| Validation | Existing test commands and any manual checks needed to verify the result. |

For example, a parsing fix in a utility and a validation-message change in an unrelated form might be independent. These are examples of task boundaries, not features your project needs. Choose work that matters in your repository.

Compare the two briefs before you continue:

1. Check that each task has a distinct set of files and can be validated on its own.
1. Identify shared files that neither task should change, such as dependency manifests, API contracts, generated files, and shared styles.
1. Check whether either task depends on the other's output. If so, choose a different pair or complete the prerequisite first.

Different files don't always mean independent work. If both tasks need a new API response shape, complete and validate that shared change first. Don't ask two agents to design it independently.

**Check your task definitions:** You should be able to explain what success looks like for each task without referring to work the other agent will do.

## 2. Choose isolation

Choose where the agents can make changes before you send the prompts:

| Work arrangement | Appropriate use | File isolation |
|---|---|---|
| Multiple chats in one session | Related questions or coordinated work that can share edits. | Chats share the session's folder or worktree, and their changes appear together. |
| Separate sessions using the same folder | Read-only investigation alongside implementation, or tasks you run one at a time. | Conversations are separate, but both sessions can edit the same working files. |
| Separate sessions, each with a new worktree | Independent implementation tasks you want to review and integrate separately. | Each task has its own working files and branch. Integration can still produce conflicts. |

For this walkthrough, use **two separate sessions**, each with **New Worktree** selected. Creating another chat or forking a conversation is not a substitute for creating another worktree.

> [!CAUTION]
> Worktrees isolate working files, not the agent's access to your machine or external services. {% data variables.product.prodname_copilot_short %} worktree sessions use **Allow all**, which skips tool approval prompts. Use a trusted repository and review the [permission and sandboxing controls](/docs/agents/run/approvals.md) before proceeding. If you require manual approvals, use folder sessions one at a time instead.

For details about the available choices, see [choose code isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation).

## 3. Prepare and delegate

Start both tasks from the same known-good commit so that you can review each result against the same baseline.

1. In your primary workspace, commit the changes that both tasks need. Commit or stash unrelated work, including untracked files you want to preserve. Confirm that the working tree is clean:

    ```shell
    git status --short
    ```

    No output means there are no tracked or untracked changes to account for. Ignored files aren't included.

1. Run the existing tests for both task areas. Resolve baseline failures before you start.

1. In the primary editor workspace, check out the branch you want both tasks to start from. Run **Git: Create Branch** from the Command Palette and enter `integrate-agent-tasks`, or another unused branch name. This creates and checks out a branch for the combined change.

    Use this integration branch as the base for both worktree sessions. The **Merge Changes** action merges each session back into its configured base branch, not an arbitrary destination chosen later.

1. Record the integration branch name and starting commit:

    ```shell
    git branch --show-current
    git rev-parse HEAD
    ```

    Keep the integration branch checked out in your primary workspace. Don't add changes to it until you reach the integration steps.

1. Open the {% data variables.copilot.agents_window %} from the **Open in Agents** button in the title bar. Select **New**, select your local project folder, and choose **{% data variables.product.prodname_copilot_short %}** as the **Session Target**.

1. Select **New Worktree** and choose the integration branch you recorded as the base branch.

1. Fill in the following prompt template from task A's brief, then submit it. Replace every angle-bracket placeholder with the task's details and your repository's commands. For dependency setup, use your project's normal procedure for a new checkout.

    ```prompt
    Implement <task-name>.
    Outcome: <expected-outcome>

    Limit edits to <allowed-implementation-and-test-files>.
    Acceptance criteria: <acceptance-criteria>
    Preserve this existing behavior: <behavior-to-preserve>
    Out of scope: <files-and-changes-to-avoid>
    Add or update tests for the acceptance criteria.
    If the task requires edits outside this scope, stop and explain the dependency.

    Use <dependency-setup-command> if this worktree needs dependencies, then run <validation-commands>.
    Do not commit, merge, push, deploy, or modify external services.
    Finish with the changed files, validation commands and results, any manual checks still needed, and unresolved concerns.
    ```

1. Select **New** again to create a separate session for the same project. Choose the same session target and integration branch as the base, and select **New Worktree** again. Don't add a chat to the first session.

1. Fill in a second copy of the template from task B's brief and submit it to the new session. Use task B's outcome, scope, and validation commands, not task A's. Keep the same base commit.

Worktrees don't include uncommitted changes from your primary workspace. Git-ignored files, such as installed dependencies and local configuration, are also absent by default. Use your project's normal setup procedure in each worktree, and provide only configuration that is safe for the agent to access. Don't copy production credentials. Learn more about [including files when creating a worktree](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree).

**Check your setup:** Confirm that the two sessions report different worktree paths and branches, but the same starting commit. Run `git worktree list` in your primary workspace to check the paths and branches. If both tasks are using the same directory, stop them and correct the isolation before they continue.

<!-- TODO: Add a screenshot showing the two task sessions in the Agents window, with their distinct worktree paths and branches visible. -->

## 4. Monitor both tasks

Use the sessions list to track each task's status. Select a session to inspect its conversation and **Changes** view. Confirm which session is active before you send feedback or open a terminal.

> [!TIP]
> You can view multiple sessions side by side in the Agents window to easily compare their progress and changes. Drag and drop sessions to arrange them as needed.

Check each task after its first meaningful change:

* Is it editing only the agreed files?
* Is it following the acceptance criteria?
* Is it waiting for your answer, a required confirmation, or a running command?
* Did setup or testing fail before the agent could validate the change?

If a task starts changing files outside its brief, send a focused correction to that task's session. Replace the placeholders with the specific boundary and the evidence you need:

```prompt
Keep <out-of-scope-files-or-behavior> unchanged. Stop expanding the scope. Explain why <allowed-files> are insufficient for <expected-outcome>, and wait for my decision before editing more files.
```

If either task discovers a shared dependency, pause the affected work. Decide whether to complete that dependency first or assign the shared change to one task and run the dependent work afterward.

Separate worktrees can still share ports, databases, and other external resources. Use separate test resources or run those checks one at a time. For an agent that drifts or repeats failures, follow [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md).

## 5. Review each result separately

A completed response is a handoff for review, not proof that the task is correct. Review task A and task B independently before combining them.

1. Select the task's session and open **Changes**. Inspect the full branch diff, including added tests and new files, rather than only the most recent response.
1. Compare the changes with the task's brief. Check that every acceptance criterion is met, the required existing behavior is preserved, and there are no unrelated edits.
1. Inspect the test output. Verify that the expected tests ran and that a setup failure or skipped test wasn't reported as success.
1. Run the validation commands and complete the manual checks from the brief in that session's worktree. Use **Open Terminal** in the session title bar and confirm its working directory before running commands.
1. Send revisions to the same session, then review the revised diff and rerun the affected checks.
1. When the result is ready, review `git status --short` in the worktree for unintended or untracked files. Preserve any unrelated work separately before you select **Commit Changes**, which commits all current changes to the session branch.
1. Record the session branch name and commit. Keep the session available until integration is validated.

Inspect the expected results in the tests, not only whether the tests pass. The assertions should demonstrate the outcome in the task's brief, rather than repeat assumptions from the implementation.

For the full diff and feedback procedures, see [review agent changes](/docs/agents/run/review-code-edits.md#review-agent-changes).

## 6. Integrate and retest

Use **Merge Changes** in the {% data variables.copilot.agents_window %} to merge each reviewed session branch into the integration branch in your primary workspace. Keep the task commits separate so that you can identify each result in the combined history.

> [!NOTE]
> **Merge Changes** is available for worktree sessions with changes and no associated pull request for the session branch. It commits any uncommitted worktree changes before merging. Review all changes first, even if you already committed the task's result. If the session branch has a pull request, use that pull request's review and merge workflow instead.

If either merge fails, follow [the recovery steps](#if-a-merge-fails) before continuing.

1. Confirm that both sessions have stopped editing, that both results are committed, and that your primary working tree is clean.
1. In the primary editor workspace, confirm that the integration branch is checked out. **Merge Changes** requires the parent repository to be on the session's configured base branch. If you switched branches, switch back before proceeding.
1. In the {% data variables.copilot.agents_window %}, select task A's session. Open **Changes** and select **Branch Changes**.
1. Select **Merge Changes** and confirm. Wait for the merge to complete before you continue.
1. Return to the primary workspace and run task A's validation commands on the integration branch. If they fail, resolve the failure and commit any fix before you add task B. Confirm that the working tree is clean again.
1. Select task B's session in the {% data variables.copilot.agents_window %}. Open **Changes**, select **Branch Changes**, and select **Merge Changes**. Confirm and wait for the merge to complete.
1. In the primary workspace, review the combined diff against the starting commit you recorded. Confirm that both reviewed changes are present and that conflict resolution hasn't removed either task's behavior or tests.
1. Run both targeted test sets and the project's relevant integration checks on the combined branch. Include the existing build, type check, or lint checks required by your project's contribution workflow.
1. Exercise both changed behaviors from the destination workspace, using the manual checks in the task briefs:

    * Confirm task A's expected outcome with task B's changes present.
    * Confirm task B's expected outcome with task A's changes present.
    * Check the existing behavior that both briefs require you to preserve.

Passing tests in each worktree doesn't prove the combined change works. If integration introduces a failure, investigate it on the destination branch where both changes are present. Commit any follow-up fix and rerun the affected checks.

### If a merge fails

Read the error before you retry. If the primary workspace has uncommitted changes or the wrong branch checked out, correct that state first.

If Git reports conflicts, open the primary workspace, inspect both versions, and preserve both tasks' requirements. Don't accept one side wholesale to make the conflict disappear. [Resolve the conflicts](/docs/sourcecontrol/merge-conflicts.md) and complete that merge before you run tests or start the next merge. A failed merge can leave the session's work committed even though integration didn't complete.

If you prefer to merge manually, use **Git: Merge Branch** in the primary editor workspace or run `git merge --no-ff <session-branch>` from its terminal, with the integration branch checked out. Use the actual reviewed session branch name, integrate one task at a time, and follow the same validation steps. Don't also apply the changes through another integration action.

## 7. Finish the workflow

Before you mark either session done, confirm:

* Each task stayed within its agreed scope, or you explicitly approved a scope change.
* You reviewed and committed each result separately.
* Both results are present on the intended destination branch.
* The combined tests and manual checks pass.
* Any integration fixes are committed.

Continue with your team's normal pull request or review process. Only then mark the sessions done. Don't delete a session or its worktree while it contains work that hasn't been preserved.

You now have one tested change assembled from two independently reviewed tasks, with each task's history retained.

## Related resources

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Git branches and worktrees](/docs/sourcecontrol/branches-worktrees.md)
