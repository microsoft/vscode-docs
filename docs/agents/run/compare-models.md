---
ContentId: 924a518d-d9de-4f32-aaf4-b16919f0e66b
DateApproved: 10/20/2026
MetaDescription: Run one coding task across models, compare evaluated results, and continue with the strongest implementation in the {% data variables.copilot.agents_window %}.
MetaSocialImage: ../images/agents-window/agents-window-ui-annotated.png
Keywords:
- copilot
- ai
- agents
- compare models
- model evaluation
- judge
- synthesis
- worktrees
---

# Compare model results (Preview)

Run the same coding task with multiple models or agent harnesses in the {% data variables.copilot.agents_window %}, then compare their implementations side by side. You can choose the strongest attempt or synthesize a new implementation from the best parts of several attempts.

Model comparison is available in Preview and only in the {% data variables.copilot.agents_window %}. It isn't available in the editor {% data variables.copilot.chat_view %}.

## Prerequisites

Before you start, make sure you have:

* Met the [{% data variables.copilot.agents_window %} prerequisites](/docs/agents/run/agents-window.md#prerequisites).
* Selected a Git repository that has a branch, at least one commit, and a configured remote.
* Access to an eligible Agent Host harness that supports worktree isolation for the selected repository.

The models and harnesses available for comparison depend on your setup, credentials, and enterprise policies. Learn how to [configure and choose an agent harness](/docs/agents/run/agent-harnesses.md).

## Configure a comparison

1. In the {% data variables.copilot.agents_window %}, open **Settings** and enable `setting(sessions.chat.compareAgents.enabled)`.

    This setting is off by default. An active experiment might enable the feature automatically.

1. Select **New**, and then select the Git repository for the task.

1. Open the model picker and select **Compare Models**.

1. Add between two and 10 attempts.

    Choose from the models available to your agent harnesses. When available, you can mix {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude %}, and {% data variables.product.prodname_openai_codex %} attempts. **Auto** and other routing choices aren't available for comparisons.

    For models that support thinking effort, add the same model more than once and select a different effort for each attempt.

1. To evaluate the attempts automatically, select **Judge**, and then choose a judge model.

1. To create a combined implementation later, also select **Synthesizer** and choose a synthesizer model.

    Configure the judge and synthesizer before you run the comparison. Without a judge, compare the attempts manually. Synthesis requires both a judge and a synthesizer.

1. Select **Done**.

![Screenshot showing the model picker with four models selected for a comparison.](../images/compare-models/bake-off-picker.webp)

## Run the same task across attempts

Enter one bounded prompt that gives every attempt the same goal and success criteria. For example:

```prompt
Add validation to the profile form so the display name is required and no longer
than 50 characters. Show an inline error, preserve the existing form styles, and
add focused tests for valid, empty, and overlong names. Don't change other forms.
```

![Screenshot showing a comparison prompt and the Run 4 Attempts button.](../images/compare-models/bake-off-multiple-attempts.webp)

Select **Run N Attempts**, where `N` is the number of attempts you configured. All attempts start concurrently as independent sessions. The results appear in a tiled grid by default, where you can monitor each attempt and open its session.

![Screenshot showing four model comparison attempts running side by side in a grid.](../images/compare-models/bake-off-grid.webp)

Each attempt works in its own Git worktree based on the repository's committed state. It doesn't include changes that are uncommitted in your original working tree. Git-ignored files and dependencies might also be absent. For worktree requirements, ignored files, and **Allow all** permission behavior, see [Choose where an agent makes changes](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes).

> [!CAUTION]
> Worktree sessions use **Allow all**, which skips tool approval prompts. Worktrees separate edits, not the agent's access to your machine or network. Review [approvals and permissions](/docs/agents/run/approvals.md) and [agent sandboxing](/docs/agents/run/agent-sandboxing.md) before you run a comparison.

## Compare the results

After the attempts finish, compare them manually or use the judge scorecard:

* Review the changed files and agent responses for each attempt.
* Check whether each implementation meets the prompt's constraints and follows the repository's conventions.
* Run the relevant tests and checks in promising attempts.

If you configured a judge, evaluation starts automatically after the attempts finish. The scorecard includes a recommendation, time and token usage for each attempt, and expandable rationale with validation evidence. Select **Open Attempt N** to inspect an attempt's full session and changes.

Token values can be lower bounds rather than complete totals. The scorecard doesn't measure credit or currency costs.

![Screenshot showing the judge scorecard with the recommended attempt, time and token usage, validation evidence, and Synthesize action.](../images/compare-models/bake-off-results.webp)

> [!IMPORTANT]
> A judge's assessment isn't proof that an implementation is correct. Review the code, verify the evidence, and run the project's tests before you integrate a result.

## Synthesize a new implementation

If you configured both a judge and a synthesizer, select **Synthesize** after reviewing the verdict. Add optional instructions to focus the synthesis on specific strengths, constraints, or corrections.

The synthesizer creates a new grouped session in another isolated worktree. It uses the judge verdict and strengths from the attempts as context for a new implementation. It doesn't modify the recommended attempt or your original working tree.

Synthesis doesn't automatically merge changes from the attempts or the synthesized result. Review and validate the new implementation as a separate result.

## Continue with a result

Open the attempt or synthesized session that you want to continue. Review all changed and untracked files, run the relevant tests, and make any needed revisions.

When the result is ready, follow the [agent change review and worktree integration workflow](/docs/agents/run/review-code-edits.md). Comparison doesn't automatically merge, push, or create a pull request for the selected result.

Each attempt, judge evaluation, and synthesis is separate model work. Consider the additional model usage when you choose the number of attempts and whether to enable evaluation or synthesis.

## Related resources

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Use Git branches and worktrees](/docs/sourcecontrol/branches-worktrees.md)
