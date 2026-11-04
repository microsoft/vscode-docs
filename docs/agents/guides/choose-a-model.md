---
ContentId: e0f478a1-d3e4-4d38-b312-f292b6a2c748
DateApproved: 11/4/2026
MetaDescription: Decide when to use Copilot Fusion, Auto, or an individual model, and compare models on coding tasks to balance quality, time, and cost.
MetaSocialImage: ../images/compare-models/bake-off-results.png
Keywords:
- copilot
- model selection
- compare models
- Copilot Fusion
- AI credits
---

# Compare and choose models for your coding tasks

Choosing the right model can be difficult when you need to balance code quality, response time, and cost. This guide helps you decide when to let {% data variables.product.prodname_copilot_short %} choose models, when to select one yourself, and when to compare results on your own code.

## Choose your path

If you're unsure where to start, use Fusion or Auto for your next task and let it choose the model for you. Choose a different path when you need a specific capability or evidence about which model works better for your tasks.

<div class="card-grid">
    <a class="card" href="/docs/agents/guides/choose-a-model#let-fusion-or-auto-choose">
        <div>
            <p><strong>Let Fusion or Auto choose</strong></p>
            <p>Start coding without hand-selecting a model for each task.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/guides/choose-a-model#choose-an-individual-model">
        <div>
            <p><strong>Choose an individual model</strong></p>
            <p>Use a particular capability or control the model and its settings.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/guides/choose-a-model#compare-models-on-your-code-preview">
        <div>
            <p><strong>Compare models side by side (Preview)</strong></p>
            <p>Try the same task with different models, then choose based on the results.</p>
        </div>
    </a>
</div>

The examples use the [{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot). [Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) first. Available models and Fusion tiers depend on your account and organization policies.

## Let Fusion or Auto choose

Use this path when you want to focus on the task rather than model selection. In a new chat, select **Copilot Fusion** or **Auto** from the model picker and send your task.

* **Copilot Fusion** chooses the best model for the task. It can use one model or coordinate several, such as having one draft a solution and another review it. You receive one final response.

* **Auto**, when shown, selects one model per request based on task complexity and model availability.

![Screenshot of the model picker, showing the Copilot Fusion option.](../images/choose-a-model-guide/model-picker-copilot-fusion.png)

Start with the recommended configuration. See [Fusion setup and effort levels](/docs/agent-customization/language-models.md#use-copilot-fusion) or [Auto configuration](/docs/agent-customization/language-models.md#use-auto-model-selection) for the available options.

Review the result as you would any AI-generated change. If it meets your needs within your time and credit budget, keep using that approach. Fusion's additional model calls can use more time and AI credits. Compare alternatives if the extra work isn't helping.

## Choose an individual model

Use this path when you already prefer a model, need a particular capability, or want control over its configuration. Use the [current model comparison reference](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) to find candidates that fit your task:

| Your task or constraint | What to look for |
|---|---|
| Routine edits or short questions | Fast responses and lower usage costs. |
| Difficult debugging, planning, or multi-file changes | Reasoning capabilities, then verify the result on your code. |
| Working from a screenshot or a large amount of context | Support for image input or a context window that fits the material. |

Select the model in the model picker. Start with its recommended thinking effort rather than increasing it for every task. Learn how to [change models and configure their settings](/docs/agent-customization/language-models.md#change-the-model-for-chat).

If two models both look suitable, use the comparison workflow below to choose based on your work rather than a general ranking.

## Compare models on your code (Preview)

Use the side by side model comparison functionality in the {% data variables.copilot.agents_window %} when you want to explore alternatives, improve an unsatisfactory result, or choose a model for a recurring task. It runs the same prompt with multiple explicit models in parallel, each in an isolated worktree.

{% action-card title="Explore model comparison options" display="sidebar" %}
Find the full setup instructions and learn how to synthesize a result from multiple attempts.

* [Open the model comparison reference](/docs/agents/run/compare-models.md)
{% /action-card %}

### Prepare a small task

For this walkthrough:

* Open a trusted Git repository with at least one commit and a Git remote.
* Make sure you can run the relevant tests. Resolve setup problems before comparing models.
* Preserve unrelated work and commit the starting code. Worktrees don't include your uncommitted changes. See [worktree requirements](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes).

Choose a bounded task with a result you can check. For example, if your app has a profile form:

```prompt
Require a display name of 1 to 50 characters in the profile form.
Reject whitespace-only names and show an inline validation error.
Preserve the existing styling and behavior of other fields.
Add tests for valid, empty, whitespace-only, and overlong names.
Run <test-command> and report the results, including anything you couldn't verify.
```

Replace the example with a task from your project and its actual test command. Keep the prompt, starting commit, harness, project instructions, tools, and permissions the same for each attempt. Start with two or three models, not the entire catalog.

Each attempt and optional judge evaluation uses models and adds to your usage.

> [!CAUTION]
> Check the session's permissions before launching. **Allow all** skips tool approval prompts. Worktrees separate file changes, not access to your machine or network. Review [agent sandboxing](/docs/agents/run/agent-sandboxing.md) before running a comparison.

### Run the comparison

1. In the {% data variables.copilot.agents_window %}, select **New**, choose your repository and the {% data variables.product.prodname_copilot_short %} harness, then open the model picker and select **Compare Models**.

    ![Screenshot showing the model picker with the Compare Models option selected.](../images/compare-models/compare-models-icon.png)

1. Select two or three models. Keep their recommended configurations for your first comparison.

1. To get an automated assessment, select **Configure Judge** and choose a judge model. Otherwise, compare the attempts yourself.

1. Select **Done**, enter your task prompt, and select **Run N Attempts**.

The attempts run concurrently. You can open each session to inspect its progress and changes. For additional setup options, including synthesis, see the [model comparison reference](/docs/agents/run/compare-models.md).

### Review the results and choose

If you selected a judge, it evaluates the attempts and provides a scorecard with a recommendation, validation evidence, time, and token usage. Select **Open Attempt N** to inspect a session and its changes.

![Screenshot showing the judge scorecard with a recommended attempt, time and token usage, and validation evidence.](../images/compare-models/bake-off-results.png)

With or without a judge, make the final decision using these checks:

| Check | How to decide |
|---|---|
| Correctness | Review the changes and run the relevant tests in the attempt's worktree. Reject results that miss the task's requirements, even if they are faster or cheaper. |
| Maintainability | Prefer focused changes that follow your project's conventions and don't require unrelated dependencies or edits. |
| Time and effort | Include your review, follow-up prompts, and manual corrections, not only the initial response time. |
| Cost | [Check reported AI credit usage](#check-credit-usage), including follow-ups. Account for judge usage separately as comparison overhead. |

The judge's recommendation isn't proof of correctness.

#### Check credit usage

Open an attempt's chat session to inspect its reported usage:

* **Per request:** hover over a chat response to see that turn's credit consumption.

* **Per session:** select the context window control in the chat input. The **Session Info** popover shows the total reported credits under **Session Cost**.

Compare each attempt's session total after any follow-up corrections. Account for the judge's session usage separately as comparison overhead, rather than adding it to one candidate's cost.

Token totals, including those in the judge's scorecard, can be incomplete and aren't AI credit costs. If credit usage isn't shown, treat it as unknown, not zero. For monthly usage details, see [Monitor your usage](/docs/agents/guides/optimize-usage.md#monitor-your-usage).

Open the attempt that meets your requirements and continue there. Before keeping its implementation, [review and integrate the worktree changes](/docs/agents/run/review-code-edits.md). Selecting a result doesn't merge it into your original working tree.

### Compare Fusion, Auto, or models in separate sessions

**Compare Models** doesn't offer Fusion or Auto and isn't available in the {% data variables.copilot.chat_view %}. Use separate sessions for those comparisons. This is also an alternative when you need manual approvals that your worktree session doesn't offer.

<details>
<summary>Compare using separate sessions</summary>

1. Create separate worktrees from the same starting commit. Don't start a candidate from another attempt's changes.
1. Open each worktree as its own workspace and start a fresh chat. For manual approvals, use folder sessions with a supported permission level.
1. Keep the same harness, instructions, tools, permissions, and project setup. Select Fusion, Auto, or an individual model, and note its configuration.
1. Send the same prompt without including other attempts' answers. Apply the [same review checks](#review-the-results-and-choose) to every result.

Compare Fusion's complete result and usage, not an assumed underlying model. If you change harnesses too, you're comparing complete agent setups rather than only models.

</details>

## Decide what to use next

* **The result works for you:** keep the model or automatic selection approach for similar tasks. No further comparison is required.

* **The result misses your requirements:** check the prompt, context, and project setup before changing models. Use [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md) to choose a recovery action.

* **You're choosing for recurring work:** try the promising option on another representative task before treating it as your default. One successful attempt doesn't establish the best model for every task.

Revisit your choice when your work, available models, or pricing changes.

## Related resources

* [Understand language models](/docs/agents/concepts/language-models.md)
* [Find prompt examples](/docs/agents/guides/prompt-examples.md)
