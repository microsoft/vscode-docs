---
Tags: [GitHub Copilot, Models, Engineering]
Order: 141
TOCTitle: Configurable eagerness
PageTitle: Tune GitHub Copilot Inline Suggestions with Configurable Eagerness
MetaDescription: Choose how proactively Copilot offers inline suggestions.
MetaSocialImage: supervised-fine-tuning.png
Date: 2026-10-27
Author: Ben Steenhoek, Ulugbek Abdullaev
Keywords: [github copilot, inline suggestions, configurable eagerness, model training, reinforcement learning, on-policy distillation]
---

# Tune GitHub Copilot inline suggestions with configurable eagerness

October 27, 2026 by [Ben Steenhoek](https://github.com/bstee615) and [Ulugbek Abdullaev](https://github.com/ulugbekna)

_Choose how proactively Copilot offers inline suggestions._

A helpful suggestion at the wrong moment can still feel like an interruption. When you're completing a familiar pattern, you may want Copilot to anticipate several changes ahead. When working through delicate logic, you may prefer Copilot to scope its changes to the statement at hand and leave the next decision to you.

[Community feedback about inline suggestions](https://github.com/microsoft/vscode/issues/283075) made both preferences clear: some developers wanted fewer suggestions, while others wanted Copilot to do more. No single default could satisfy everyone. In earlier posts about training the 3-in-1 inline suggestions model covering Completions, NES, and Long-Distance NES ([part one](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one), [part two](https://code.visualstudio.com/blogs/2026/09/23/building-the-github-copilot-inline-suggestions-model-part-two)), we explained how developer feedback helped us improve the default experience. This strong default is a great starting point, but developers differ in how much assistance they prefer. We wanted to let them tailor their experience to their own preferences.

Configurable eagerness gives developers more control over how proactively Copilot offers inline suggestions. We trained the inline suggestions model to support three modes: low, medium, and high eagerness. In this post, we'll explain how we defined and trained those behaviors, what our first approach taught us, and how on-policy distillation (OPD) and reinforcement learning (RL) made the feature easier to carry forward to future models.

## Introducing configurable eagerness

We define eagerness along two dimensions: how often the model offers a suggestion and the size of each proposed edit.

| Eagerness setting | Intended behavior |
|-------------------|-------------------|
| Low | Offer fewer suggestions and favor smaller, more conservative edits. |
| Medium | Provide the current 'default' level of assistance. |
| High | Offer suggestions more proactively, including larger edits when appropriate. |

These settings guide how Copilot behaves rather than imposing strict limits on suggestion timing or size. Low eagerness still offers complete, useful suggestions; it's simply more conservative. High eagerness may propose more and larger suggestions, but only when that work is relevant to the user's current task.

The demo placeholder below marks a comparison of all three modes as a developer adds password and password-confirmation support to a registration form. That seemingly small change creates several opportunities for follow-up work: adding field labels, validating that the passwords match, and updating the form inputs.

![Static demo placeholder labeled Low, Medium, and High, with no recording or application content.](demo-placeholder.svg)

_Figure 1. Placeholder for a comparison of low, medium, and high eagerness during the same development task._

To train these behaviors, we needed a measurable definition of eagerness. Because inline suggestions use a diff-based format, we chose edit distance, the number of characters changed by a proposed edit, as a proxy for eagerness. Larger edit distances indicate more eager behavior. For a response that proposes an edit, edit distance measures the size of the change. A no-edit response produces an empty diff with an edit distance of zero, so the distribution of zero- and nonzero-distance responses also reflects how often the model chooses to show a suggestion.

## One model, three modes

We considered training a separate model for each eagerness level, but this approach would have multiplied future deployment and upgrade complexity. Instead, we trained one model to produce all three behaviors (low, medium, and high eagerness), conditioned on a lightweight control tag:

<table>
  <thead>
    <tr>
      <th scope="col">Low</th>
      <th scope="col">Medium</th>
      <th scope="col">High</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">

```text
<|aggression|>low<|/aggression|>
```

</td>
<td style="vertical-align: top;"><em>No change</em></td>
<td style="vertical-align: top;">

```text
<|aggression|>high<|/aggression|>
```

</td>
</tr>
</tbody>
</table>

We trained the model to interpret this tag as an eagerness control: it produced more conservative suggestions for low eagerness and more proactive suggestions for high eagerness, while preserving its default behavior for medium.

We started with [supervised fine-tuning (SFT)](https://en.wikipedia.org/wiki/Supervised_learning). For every training prompt, we sampled responses from variants of the model with varying levels of eagerness, filtered to high-quality responses, and ordered the responses by edit distance to produce examples of low, medium, and high eagerness for each prompt in the dataset.

![Diagram showing responses filtered by eagerness and quality into low, default, and high training examples, followed by supervised fine-tuning, reinforcement learning, and evaluation.](supervised-fine-tuning.png)

_Figure 2. Supervised fine-tuning for configurable eagerness._

This approach fit naturally into our existing reinforcement-learning pipeline. Most of the work happened during supervised fine-tuning, with only minimal changes to the RL setup:

* SFT taught the model the new low-, medium-, and high-eagerness behaviors.
* RL improved overall suggestion quality while preserving those learned behaviors.

## Making configurable eagerness portable across models

The SFT approach worked, but it had two limitations that made it difficult to scale: it depended on pre-existing model variants with different eagerness levels and required retraining on responses from those models. Adding the feature to an improved base model would therefore mean training new models and then retraining from scratch. We needed a way to preserve a new model's default behavior while adding only the low- and high-eagerness modes.

To make eagerness portable across future base models, we separated the behavior we wanted to preserve from the behavior we wanted to change. The training objective had two parts:

* For medium eagerness, match the behavior of a reference inline suggestions model.
* For low and high eagerness, move edit distance below or above the reference model's medium prediction while preserving suggestion quality.

![Diagram showing a reference model and default prompt contributing distillation loss, with low and high prompts contributing quality and eagerness rewards to a joint training objective.](portable-post-training.png)

_Figure 3. Portable post-training for configurable eagerness._

For medium eagerness, we used [on-policy distillation (OPD)](https://en.wikipedia.org/wiki/Knowledge_distillation) to preserve the reference model's default behavior in medium eagerness mode. OPD normally transfers knowledge from a larger teacher to a smaller student. Here, the teacher and student shared the same base architecture: the reference model supplied the target behavior, and the model under training learned to match it at medium eagerness while also learning low- and high-eagerness modes.

For low and high eagerness, we reused the quality graders developed for the 3-in-1 model's SFT and RL, then added a relative eagerness reward based on the response's [edit distance](https://en.wikipedia.org/wiki/Edit_distance) compared to the reference model's medium response. Low eagerness was rewarded for proposing a smaller edit than the reference. High eagerness was rewarded for proposing a larger one. In both cases, the quality reward prevented the model from optimizing edit distance at the expense of usefulness.

### Mitigating reward hacking

[Reward hacking](https://en.wikipedia.org/wiki/Reward_hacking) occurs when a model finds a way to increase its measured reward without producing the behavior the model developer intended to encourage. During development, we observed two such failure modes in certain training runs and added mitigations for each.

For high eagerness, an early reward design did not apply the quality grader to the low- and high-eagerness modes. In that training run, the model sometimes proposed unrelated functionality or unnecessary formatting changes while increasing edit distance.

We addressed this failure mode by balancing eagerness rewards with rewards from the RL quality grader, plus added instructions to allow legitimately broader edits. Our offline [Simulation Tests (STests)](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_offline-benchmarks) caught this issue.

```diff
 class SplashStorageService implements ISplashStorageService {
     _serviceBrand: undefined;
+    private _windowSplash: IPartsSplash | undefined;
+
     readonly saveWindowSplash: (splash: IPartsSplash) => Promise<void>;
+    readonly getWindowSplash = (): IPartsSplash | undefined => this._windowSplash;

     constructor(@INativeHostService nativeHostService: INativeHostService) {
-        this.saveWindowSplash = nativeHostService.saveWindowSplash.bind(nativeHostService);
+        this.saveWindowSplash = async (splash: IPartsSplash) => {
+            this._windowSplash = splash;
+            return nativeHostService.saveWindowSplash(splash);
+        };
     }
 }
```

_Figure 4. Example of an over-eager suggestion before mitigation._

![Chart showing Simulation Tests scores falling for high eagerness before mitigation and remaining near the production baseline after mitigation.](reward-hacking-benchmark.png)

_Figure 5. Benchmark results before and after mitigating excessive suggestions on the STests benchmark._

For low eagerness, one training run produced smaller measured edits partly by [minifying suggestions](https://en.wikipedia.org/wiki/Minification_(programming)): removing whitespace and delimiter characters or shortening variable names while maintaining syntactic correctness. This is technically shorter code but is much less desirable! We mitigated this behavior in two ways:

* We normalized whitespace and delimiters before calculating edit distance, which removed any possible advantage from deleting whitespace.
* We added LLM-based grading for less deterministic cases involving variable names and delimiters.

We baked this into our evaluations by adding a deterministic minification check to the training and evaluation pipeline so this failure mode can be screened in subsequent runs.

<table>
  <thead>
    <tr>
      <th scope="col">Before mitigation</th>
      <th scope="col">After mitigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 50%; vertical-align: top;">

```python
class ModelManager: # user typed
    # model suggestion
    def __init__(self):self.models=[]
    def add(self,m):self.models.append(m)

def main():
    m=ModelManager()
    m.add("model1")
main()
```

</td>
<td style="width: 50%; vertical-align: top;">

```python
class ModelManager: # user typed
    # model suggestion
    def __init__(self):
        self.models = []

    def add(self, model):
        self.models.append(model)

def main():
    m = ModelManager()
    m.add("model1")

main()
```

</td>
</tr>
</tbody>
</table>

_Figure 6. Example of minification before and after mitigation._

## What the online evaluations showed

We evaluated the configurable model in A/B experiments against the [production 3-in-1 model](https://code.visualstudio.com/blogs/2026/09/23/building-the-github-copilot-inline-suggestions-model-part-two). The results below highlight statistically significant changes. No other key metrics changed significantly from the baseline.

<table>
  <thead>
    <tr>
      <th scope="col">Low</th>
      <th scope="col">Medium</th>
      <th scope="col">High</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Low eagerness had a <strong>29% lower dismissal rate</strong> and <strong>28% shorter suggestions</strong> than medium eagerness.
      </td>
      <td>
        No key metrics changed significantly from the baseline.
      </td>
      <td>
        High eagerness had a <strong>40% increase in accepted and retained characters</strong>, <strong>40% more suggestions shown</strong>, and <strong>22% longer suggestions</strong> than medium eagerness.
      </td>
    </tr>
  </tbody>
</table>

These findings indicate that the configurable model behaved as intended: low eagerness was more conservative, high eagerness was more proactive, and medium preserved the default experience.

## What we learned

* **Pluggable features simplify development and deployment.** The key was separating what should change (eagerness) from what should remain stable (base-model quality). Instead of embedding eagerness in the full SFT recipe, the post-training approach starts from the production model, preserves its default behavior through the reference objective, and adds targeted objectives for low and high eagerness. That separation lets us carry the feature forward without rebuilding the entire training recipe.
* **A strong offline-to-online pipeline is essential.** We evaluated each candidate in two stages: first, whether eagerness moved in the intended direction. Second, whether suggestions remained useful. Offline benchmarks tracked online behavior closely and exposed a critical failure mode: optimizing high eagerness for edit distance alone could reduce quality. That finding led us to a joint reward that combined the eagerness objective with quality feedback.
* **Dogfooding findings should become regression tests.** As with the [Qualitative Must-Haves benchmark](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_offline-benchmarks), internal use surfaced issues that offline examples alone could miss because timing, cached suggestions, and surrounding tools all affect the experience. For example, several examples of reward hacking were caught during dogfooding and turned into repeatable tests. We turned those findings into repeatable checks and used them to monitor the final model's quality.

## What's next

Configurable eagerness is a first step toward inline suggestions that adapt to each developer and task. We're exploring two directions:

* **Automatic eagerness:** Adjust how proactively Copilot offers suggestions based on the current context, while keeping developers in control of the experience.
* **Learning from experience:** Use signals from rejected, modified, or corrected suggestions to reduce repeated errors and better align future suggestions with a developer's intent.

The goal isn't simply to suggest more or less code. It's to provide the right level of assistance for the moment, and improve that fit over time.

## Try configurable eagerness

Configurable eagerness is available to paid GitHub Copilot subscribers in VS Code. Update to the latest version of VS Code, [confirm that Next Edit Suggestions are enabled](https://code.visualstudio.com/docs/editing/ai-powered-suggestions#_next-edit-suggestions) (they are on by default), then open the Copilot settings menu and choose an **Eagerness** setting. Try each mode to find the level of assistance that works best for you.

## Acknowledgments

Thank you to the developer community for your ongoing feedback that shaped configurable eagerness, and to the combined teams of researchers, engineers, PMs, and designers across VS Code, GitHub Copilot, and Microsoft for their contributions, testing, and support throughout development.

Special thanks to Julia Gong, Satarupa Guha, Yu Hu, Ben Liggett, Shengjie Ma, Gaurav Mittal, and Nick Trogh for their insightful feedback on this blog post.

Happy coding! 💙
