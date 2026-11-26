---
ContentId: 9e4d2f7a-6b8c-4a1e-9d3f-2c5b8a4e7f12
DateApproved: 11/26/2026
MetaDescription: Review a pull request, address reviewer comments, and fix failing CI checks with an agent in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/agents-window/agents-window-changes.png
Keywords:
- pull request
- code review
- CI failures
- review comments
- agents
- agents window
- rubber duck
- agent merge
---
# Review a pull request and address feedback with an agent

Reviewing a pull request means checking more than syntax. You need to verify behavior against requirements, catch edge cases or regressions, respond to reviewer comments, and resolve failing CI checks before merging.

In this guide, you open a pull request in an isolated worktree in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), review the diff with an agent, turn findings into code edits or GitHub review comments, fix failing checks or review feedback, and sync the verified branch.

## Prerequisites

**Project:** Your {% data variables.product.prodname_github %}-backed repository. **Harness:** {% data variables.product.prodname_copilot_short %}. **Interface:** {% data variables.copilot.agents_window %} (or {% data variables.copilot.chat_view %} for read-only review).

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) and sign in to {% data variables.product.prodname_github %}.
* Open a local clone of a {% data variables.product.prodname_github %}-backed repository with an open pull request and working local test commands.
* Review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline) before letting an agent run commands on an existing repository.

> [!NOTE]
> Pull requests from forks aren't supported by **New Session from Pull Request** and don't appear in the picker. For a fork pull request, fetch the branch locally or paste the pull request URL into a chat for read-only analysis.

## 1. Start a session from the pull request

Start a dedicated session from the pull request so the agent has the pull request description, diff, and comments in an isolated worktree that tracks the pull request branch without disturbing your current working tree.

1. Open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#open-the-agents-window) and group the sessions list by workspace.

1. Hover over your repository, expand the **+** (**New Session**) menu, and select **New Session from Pull Request**.

    ![Screenshot showing the New Session from Pull Request action in the workspace menu.](../images/agents-window/agents-window-new-session-from-pull-request.png)

1. Select the pull request you want to review or update.

    The session opens in an isolated worktree tracking the pull request branch, with the pull request title and its changed files shown in **Changes**.

If you only want a read-only review without checking out the branch in a worktree, open a new chat in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), paste the {% data variables.product.prodname_github %} pull request URL into your prompt, and ask your review questions there.

## 2. Review the diff and check for risks

Inspect the pull request changes yourself while using the agent to surface potential bugs, missing tests, and unintended edits. Keep **Manual permissions** selected while reviewing so the agent asks before running commands.

1. Open the **Changes** panel in the Secondary Side Bar (`kb(workbench.action.toggleAuxiliaryBar)`) and select **Branch** from the changeset dropdown so you see the full pull request diff rather than only the latest turn.

    ![Screenshot showing the Changes panel in the {% data variables.copilot.agents_window %}, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

1. Ask the agent to perform a read-only risk review before editing any files:

    ```prompt
    Review the changes in this pull request without editing any files.
    Identify logic bugs, missing edge cases, regressions, security risks,
    and missing test coverage. Cite exact files and line numbers for each finding.
    ```

1. Check every finding against the actual diff in **Changes**. Select **Mark as Reviewed** in a file's toolbar as you finish inspecting each file.

1. For complex or high-risk changes, optionally ask for a read-only second opinion from a complementary model with [Rubber Duck](/docs/agents/run/review-code-edits.md#get-a-second-opinion-with-rubber-duck) `feature(rubber-duck)`:

    ```prompt
    /rubber-duck What failure modes or backward-compatibility risks are missing from this review?
    ```

An agent review helps you identify blind spots faster, but it isn't proof that the pull request is correct. Verify claims directly against the code and test suite.

## 3. Turn findings into code fixes or PR comments

When you spot an issue in the diff, choose whether you want the agent to edit the branch or publish a review comment on {% data variables.product.prodname_github %}:

| Your role | Action in **Changes** | What happens |
|-----------|-----------------------|--------------|
| Author updating your own pull request (or an agent-generated branch) | Select lines in the diff, add inline feedback, and select **Submit Feedback**. | Sends all inline comments to the agent, which edits the files in the worktree and resolves each comment. |
| Reviewer commenting on a teammate's pull request | Select lines in the diff, select **Add Feedback**, and select **Add PR Comment** `feature(agents-window-pr-comments)`. | Publishes the review comment to {% data variables.product.prodname_github %} without changing files or sending a prompt to the agent. |

For detailed steps and settings for **Add PR Comment** (`setting(chat.experimental.agentsWindowPRComments)`), see [Provide feedback and request revisions](/docs/agents/run/review-code-edits.md#provide-feedback-and-request-revisions).

## 4. Address review comments and failing CI checks

If the pull request already has reviewer feedback or failing checks, address them in bounded steps so every fix stays reviewable.

1. Ask the agent to inspect the open review comments or failing checks and propose or apply focused fixes:

    ```prompt
    Inspect the unresolved review comments and any failing checks on this pull request.
    Address the valid issues with minimal, focused changes, add or update tests
    for each fix, and run the relevant test suite. Report what changed and what passed.
    ```

1. If a CI failure only reproduces in logs that the agent can't fetch directly, paste the failing log output into the prompt or attach the saved log file with **Add Context** > **Files**.

1. Inspect the resulting edits in **Changes** (use **Last Turn** to check the latest fix, then switch back to **Branch** to verify the full pull request diff).

### Optional shortcuts for checks and review comments

When managing multiple active pull requests in the {% data variables.copilot.agents_window %}, you can also use these built-in workflows:

* **One-click session-list actions** `feature(sessions-list-inline-actions)`: Enable `setting(sessions.list.inlineActions)` to run **Fix Checks**, **Address Comments**, or **Fix Checks & Address Comments** directly from a session row without switching conversations. See [Fix checks and address comments from the sessions list](/docs/agents/run/sessions/organize-sessions.md#fix-checks-and-address-comments-from-the-sessions-list).
* **Automated blocker monitoring** `feature(agent-merge)`: Enable [{% data variables.copilot.agent_merge %}](/docs/agents/run/agents-window.md#finish-a-pull-request-with-agent-merge) to monitor a pull request for review comments, CI failures, or merge conflicts. Review its safeguards carefully because enabling {% data variables.copilot.agent_merge %} switches the session to Autopilot with Assisted permissions and pushes updates to the pull request branch.

## 5. Verify, commit, and sync the pull request

Before pushing updates to the pull request branch, verify the final state yourself.

1. Select **Terminal** in the session activity bar and run the project's required tests, linter, and build commands in the worktree.

    > [!IMPORTANT]
    > The **Commit** action in the {% data variables.copilot.agents_window %} runs `git commit --no-verify`, which skips local `pre-commit` and `commit-msg` hooks. Run required checks before committing.

1. Open **Changes**, select **Uncommitted** from the changeset dropdown, review every modified file, and select **Commit**.

1. Select **Sync Changes** in the title bar to push your new commits to the existing pull request branch on {% data variables.product.prodname_github %}.

1. Confirm that CI checks pass on {% data variables.product.prodname_github %} and reply to or resolve addressed review threads. When the pull request is merged, [mark the session as done](/docs/agents/run/sessions/manage-sessions.md#archive-sessions) so its temporary worktree is cleaned up.

## Next steps

* [Review and revert agent changes](/docs/agents/run/review-code-edits.md) for inline diff feedback, checkpoints, and undo controls.
* [Work with pull requests in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#work-with-pull-requests) for creating pull requests and configuring {% data variables.copilot.agent_merge %}.
* [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md) to run parallel worktrees and integrate the combined result.
