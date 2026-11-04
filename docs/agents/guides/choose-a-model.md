---
ContentId: e0f478a1-d3e4-4d38-b312-f292b6a2c748
DateApproved: 11/4/2026
MetaDescription: Choose between Copilot Fusion, Auto, and individual models, then compare coding results, time, and AI credit usage on representative tasks.
MetaSocialImage: ../images/compare-models/bake-off-results.png
Keywords:
- copilot
- model selection
- compare models
- Copilot Fusion
- AI credits
---

# Compare and choose models for your coding tasks

You don't need to compare every model before you start coding. Let Copilot Fusion choose models and a workflow for your task, or select an individual model when you want more control.

This guide helps you choose a starting approach, try it on your own code, and evaluate the result. If you need more evidence, compare alternatives before choosing an approach for similar tasks. The goal is a reliable result at an acceptable cost, not a model leaderboard.

## Prerequisites

* [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md).
* Open a trusted Git repository with a working development environment and tests.
* Preserve unrelated work using your team's normal branch and commit workflow.

The walkthrough uses the [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot) in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). Available models and Fusion tiers depend on your account and organization policies. If you prefer the {% data variables.copilot.chat_view %}, use the [separate-session comparison workflow](#compare-fusion-auto-or-models-in-separate-sessions).

## 1. Choose a starting approach

Start with how much control you want over model selection:

| Approach | Consider it when |
|---|---|
| **Copilot Fusion** | You want to delegate model selection and orchestration instead of choosing a model for each step. |
| **An individual model** | You have a known preference, need a particular capability, or want to control the model and its configuration. |
| **Auto**, when shown | You want automatic selection of one model per request based on task complexity and availability. |

Fusion is an orchestration system, not an individual model. It can use one model or coordinate multiple models, such as having one draft a solution and another review it. You receive a single final response. A substantial, well-scoped bug fix or multi-file change is a useful task for assessing whether that additional review is worth the time and [AI credits](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs).

To start with Fusion, create a new chat with the {% data variables.product.prodname_copilot_short %} harness, select **Copilot Fusion** in the model picker, and choose an available effort level. **Standard** is a starting point for everyday work. Consider **High** for substantial tasks where additional model calls can be worthwhile. For setup, available tiers, and what to do if the picker shows **Auto** instead, see [Use Copilot Fusion](/docs/agent-customization/language-models.md#use-copilot-fusion).

<!-- TODO: Add a screenshot showing Copilot Fusion and its available effort levels in the Agents window model picker. -->

For an individual model, use the [current model comparison reference](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) to shortlist a model with the capabilities you need. Start with its recommended thinking effort rather than increasing it for every task.

## 2. Try a representative task

Choose a bounded task you actually do, with a result you can verify. Avoid a broad request such as 'improve this application', which leaves each attempt to define a different goal.

1. Define the expected behavior, constraints, and checks before asking the agent to implement anything.
1. Run the existing tests for the affected area. Resolve setup problems and record pre-existing failures.
1. Commit the starting code that the agent needs and record the commit. In the {% data variables.copilot.agents_window %}, select **New**, choose your repository and the {% data variables.product.prodname_copilot_short %} harness, then select **New Worktree** and the base branch.
1. Select Fusion, Auto, or your chosen model, then send the task prompt.

Worktrees start from committed files. Uncommitted changes, ignored configuration, and installed dependencies might be absent. Use the same project setup for every attempt. See [Choose where an agent makes changes](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes) for setup requirements.

> [!CAUTION]
> Worktree sessions use **Allow all**, which skips tool approval prompts. A worktree separates edits, not access to your machine or network. Review [agent sandboxing](/docs/agents/run/agent-sandboxing.md) before running the task. To retain manual approvals, open an isolated worktree as a workspace and use a folder session with a supported permission level instead.

For example, use the following brief if your project has a paginated issues API with an existing title filter. Adapt the behavior and test commands to your project before sending it. Don't ask the agent to create a new API to fit the example.

```prompt
Fix the issues-list API so the optional q title filter runs before
pagination. Match titles without regard to case and trim the query.
Missing, empty, or whitespace-only q must preserve unfiltered behavior.
The existing total field must count all matches, not just the page.
A query with no matches must return an empty list and total of zero.

Preserve response fields, ordering, page numbering, page size, and
existing validation. Reuse the current implementation and test framework.
Don't add dependencies or change unrelated endpoints.

Add regression tests with enough matching records to span multiple pages.
Cover trimmed and mixed-case queries, empty queries, no matches, and
the absence of gaps or duplicates across pages.

Run <targeted-test-command> and <related-test-command>.
Report the commands and results, including checks that couldn't run.
```

Replace the command placeholders with your project's actual commands. Keep this brief and the starting commit if you decide to compare alternatives later.

## 3. Evaluate the result

Evaluate the implementation, not how confident or detailed the final message sounds. Use the following scorecard for your first run and each alternative:

| Check | Record for each run |
|---|---|
| Correctness | Which acceptance criteria pass or fail, based on observable behavior. |
| Validation | Test commands, actual results, skipped checks, and missing evidence. |
| Scope and maintainability | Unrelated changes, unnecessary dependencies, and whether the code follows project conventions. |
| Time | Initial run duration and total time until the result is acceptable, including your review and corrections. |
| Human rework | Follow-up prompts, manual edits, and unresolved problems. |
| Usage | Reported AI credits and tokens, including follow-up requests. Mark unavailable measurements as unknown. |

For the API example, inspect the regression tests. Use enough matching records to check more than one page, verify that `total` includes every match, and check that unfiltered requests still behave as before. Run the relevant tests in the attempt's worktree, not your original checkout. A check that couldn't run is not a pass.

To record usage, [inspect request and session credit consumption](/docs/agents/guides/optimize-usage.md#monitor-your-usage). A short response or low token count alone doesn't establish a lower credit cost. Model prices, token types, and caching affect usage.

If the result meets your quality threshold within your time and credit budget, continue with it. You don't need a comparison to justify that choice. Before changing models for a poor result, check whether the task, context, or environment was incomplete.

## 4. Compare alternatives when you need more evidence

Comparison is useful when a result misses your requirements, you want to explore alternatives, or a recurring task makes the evaluation effort worthwhile. Start with two or three candidates rather than running every available model.

Keep the prompt, starting commit, harness, project instructions, tools, permissions, and environment consistent. Start fresh sessions without earlier attempts' conversation history. Record each model's effort and context configuration. The same effort label doesn't imply an equivalent reasoning budget across models.

If you need to keep manual approvals, use separate folder sessions for every candidate rather than the built-in comparison.

If you change harnesses as well as models, you're comparing complete agent setups, not isolating a model difference.

### Compare explicit models in the {% data variables.copilot.agents_window %}

Use [model comparison (Preview)](/docs/agents/run/compare-models.md) to run the same prompt with explicit models in isolated worktrees. Repository comparisons require at least one commit and a Git remote.

1. Start a new repository session, open the model picker, and select **Compare Models**.
1. Choose two or three models available to the {% data variables.product.prodname_copilot_short %} harness. Optionally configure a judge before launching.
1. Select **Done**, send the unchanged task brief, and select **Run N Attempts**.
1. Inspect each attempt's changes and complete the same scorecard.

![Screenshot showing the model picker with the Compare Models option selected.](../images/compare-models/compare-models-icon.png)

The optional judge provides a recommendation and validation evidence. Treat that recommendation as advice, not proof of correctness. Its scorecard reports time and tokens, which can be incomplete, not AI credit costs. Judge evaluation also uses models, so account for it separately from the implementation attempts.

### Compare Fusion, Auto, or models in separate sessions

**Compare Models** doesn't offer Fusion or Auto. Evaluate them as separate sessions using the same task and scorecard:

1. Create a fresh session in another worktree from the original base branch and commit, not from an earlier attempt's changes.
1. Keep the same {% data variables.product.prodname_copilot_short %} harness, instructions, tools, and environment. Select **Copilot Fusion**, **Auto**, or an individual model, and record its configuration.
1. Send the unchanged brief without including earlier answers or corrections.
1. Review and verify the result independently. Include orchestration and any follow-up requests in its total time and usage.

For the {% data variables.copilot.chat_view %}, open each worktree as its own workspace before starting a fresh chat. If comparison isn't available, this separate-session workflow also works for explicit models.

Fusion can use different models and workflows across requests. Compare its end-to-end result with the explicit-model attempts rather than attributing it to a single underlying model.

Repeat promising candidates more than once because outputs vary. Use the same retry policy for each candidate and record every correction. A single successful run isn't evidence of consistent performance, and one task doesn't establish the best choice for every kind of work.

## 5. Keep a practical selection strategy

Choose the option that consistently meets your quality threshold within your time and credit budget. Don't choose a faster or cheaper result that fails required behavior, and don't pay for extra reasoning when it doesn't improve the outcome.

Record a small decision table based on your observations:

| Your task type | Preferred option and configuration | Evidence and limits |
|---|---|---|
| Routine edits | Record Fusion, Auto, or an explicit model and effort. | Note correctness, review time, and usage across repeated runs. |
| Difficult bug fixes | Record the choice that resolves representative bugs reliably. | Note regression coverage and how much correction was needed. |
| Multi-file changes | Record the choice that preserves constraints across files. | Note scope discipline, integration checks, and total time and usage. |

Fusion is worth keeping when delegating model selection and review meets your requirements with less manual coordination. An explicit model is worth keeping when its control, capability, or measured results better fit the task. Neither choice removes the need to review and validate the changes.

When you're ready to keep an implementation, follow the [agent change review and worktree integration workflow](/docs/agents/run/review-code-edits.md). Revisit your preferences when models, pricing, or your workload change.

## Related resources

* [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md)
* [Find prompt examples](/docs/agents/guides/prompt-examples.md)
