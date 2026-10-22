---
Tags: [GitHub Copilot, Models, Engineering]
Order: 141
TOCTitle: Configurable eagerness
PageTitle: Tune GitHub Copilot Inline Suggestions with Configurable Eagerness
MetaDescription: Choose how proactively Copilot offers inline suggestions.
MetaSocialImage: configurable-eagerness-social.png
Date: 2026-10-26
Author: Ben Steenhoek, Ulugbek Abdullaev
Keywords: [github copilot, inline suggestions, configurable eagerness, model training, reinforcement learning, on-policy distillation]
---

# Tune GitHub Copilot inline suggestions with configurable eagerness

October 26, 2026 by [Ben Steenhoek](https://github.com/bstee615) and [Ulugbek Abdullaev](https://github.com/ulugbekna)

_Choose how proactively Copilot offers inline suggestions._

A helpful suggestion at the wrong moment can still feel like an interruption. When you're completing a familiar pattern, you may want Copilot to anticipate several changes ahead. When working through delicate logic, you may prefer Copilot to scope its changes to the statement at hand and leave the next decision to you.

[Community feedback about inline suggestions](https://github.com/microsoft/vscode/issues/283075) made both preferences clear: some developers wanted fewer suggestions, while others wanted Copilot to do more. No single default could satisfy everyone. In earlier posts about training the 3-in-1 inline suggestions model covering Completions, NES, and Long-Distance NES ([part one](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one), [part two](https://code.visualstudio.com/blogs/2026/09/23/building-the-github-copilot-inline-suggestions-model-part-two)), we explained how developer feedback helped us improve the default experience. This strong default is a great starting point, but developers differ in how much assistance they prefer. We wanted to let them tailor their experience to their own preferences.

Configurable eagerness gives developers more control over how proactively Copilot offers inline suggestions. We trained the inline suggestions model to support three modes: low, medium, and high eagerness. In this post, we'll explain how we defined and trained those behaviors, what our first approach taught us, and how on-policy distillation (OPD) and reinforcement learning (RL) made the feature easier to carry forward to future models.

> [!QUOTE]
> Configurable eagerness gives developers more control over how proactively Copilot offers inline suggestions.
## Introducing configurable eagerness

We define eagerness along two dimensions: how often the model offers a suggestion and the size of each proposed edit.

<table aria-label="Intended behavior by eagerness setting">
  <thead>
    <tr>
      <th scope="col">Eagerness setting</th>
      <th scope="col">Intended behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Low</th>
      <td>Offer fewer suggestions and favor smaller, more conservative edits.</td>
    </tr>
    <tr>
      <th scope="row">Medium</th>
      <td>Provide the current 'default' level of assistance.</td>
    </tr>
    <tr>
      <th scope="row">High</th>
      <td>Offer suggestions more proactively, including larger edits when appropriate.</td>
    </tr>
  </tbody>
</table>

These settings guide how Copilot behaves rather than imposing strict limits on suggestion timing or size. Low eagerness still offers complete, useful suggestions; it's simply more conservative. High eagerness may propose more and larger suggestions, but only when that work is relevant to the user's current task.

This demo shows a simple example: from the same starting point (`class ModelManager:`), each setting produces different behavior. Low eagerness proposes five small, incremental suggestions and leaves it to the developer to decide which methods to add and what validation they need. High eagerness proposes three larger suggestions that anticipate follow-on work, such as raising a `KeyError` when attempting to remove a model that doesn't exist.

![Animated side-by-side comparison of Low, Medium, and High eagerness building a Python ModelManager class. Footer labels report lines and characters added; callouts contrast incremental suggestions at Low with KeyError validation at High.](configurable-eagerness-modelmanager.gif)

_Figure 1. Low, medium, and high eagerness while building a `ModelManager` class._

To train these behaviors, we needed a measurable definition of eagerness. Because our model outputs suggestions in a diff-based format, we used [edit distance](https://en.wikipedia.org/wiki/Edit_distance) (the number of characters changed by a suggestion) as a proxy for eagerness, capturing both edit size and frequency<sup><a id="edit-distance-note-ref" href="#edit-distance-note" role="doc-noteref" aria-label="Footnote 1: edit distance and suggestion frequency">1</a></sup>.

## One model, three modes

We considered training a separate model for each eagerness level, but this approach would have multiplied future deployment and upgrade complexity. Instead, we trained one model to produce all three behaviors (low, medium, and high eagerness), conditioned on a lightweight control tag:

<table aria-label="Intended behavior by eagerness setting">
  <thead>
    <tr>
      <th scope="col">Eagerness setting</th>
      <th scope="col">Intended behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Low</th>
      <td><code>&lt;|aggression|&gt;low&lt;|/aggression|&gt;</code></td>
    </tr>
    <tr>
      <th scope="row">Medium</th>
      <td><em>No change</em></td>
    </tr>
    <tr>
      <th scope="row">High</th>
      <td><code>&lt;|aggression|&gt;high&lt;|/aggression|&gt;</code></td>
    </tr>
  </tbody>
</table>

We trained the model to interpret this tag as an eagerness control: it produced more conservative suggestions for low eagerness and more proactive suggestions for high eagerness, while preserving its default behavior for medium.

We started with [supervised fine-tuning (SFT)](https://en.wikipedia.org/wiki/Supervised_learning). For every training prompt, we sampled responses from variants of the model with varying levels of eagerness, filtered to high-quality responses, and ordered the responses by edit distance to produce examples of low, medium, and high eagerness for each prompt in the dataset.

![Supervised fine-tuning workflow from variant model responses to three eagerness training sets, described below.](supervised-fine-tuning.png)

_Figure 2. Supervised fine-tuning for configurable eagerness._

The training dataset is sent to model variants with different eagerness settings, and their responses are filtered by eagerness and quality into low-eagerness responses with prompts, default responses, and high-eagerness responses with prompts. These three groups form the dataset for SFT, followed by RL and evaluation.

This approach fit naturally into our existing reinforcement-learning pipeline. Most of the work happened during supervised fine-tuning, with only minimal changes to the RL setup:

* SFT taught the model the new low-, medium-, and high-eagerness behaviors.
* RL improved overall suggestion quality while preserving those learned behaviors.

## Making configurable eagerness portable across models

The SFT approach worked, but it had two limitations that made it difficult to scale: it depended on pre-existing model variants with different eagerness levels and required retraining on responses from those models. Adding the feature to an improved base model would therefore mean training new models and then retraining from scratch. We needed a way to preserve a new model's default behavior while adding only the low- and high-eagerness modes.

The key insight was that instead of relying on multiple model variants, we could use the production model to generate and compare multiple variants of a suggestion.

To make eagerness portable across future base models, we separated the behavior we wanted to preserve from the behavior we wanted to change. The training objective had two parts:

* For medium eagerness, match the behavior of a reference inline suggestions model.
* For low and high eagerness, move edit distance below or above the reference model's medium prediction while preserving suggestion quality.

![Portable post-training workflow combining distillation, quality, and eagerness objectives, described below.](portable-post-training.png)

_Figure 3. Portable post-training with on-policy distillation for configurable eagerness._

The training dataset branches into default prompts and low- and high-eagerness prompts. Default prompts and the reference model contribute the distillation objective, while low- and high-eagerness prompts contribute quality and eagerness rewards; the combined objective feeds RL and evaluation.

For medium eagerness, we used [on-policy distillation (OPD)](https://en.wikipedia.org/wiki/Knowledge_distillation) to preserve the reference model's default behavior<sup><a id="distillation-note-ref" href="#distillation-note" role="doc-noteref" aria-label="Footnote 2: shared model architecture">2</a></sup>. The model under training generated responses, and the reference model supplied token-level probabilities on those same generated prefixes. This taught the model to match the reference on its own generated responses at medium eagerness, while low- and high-eagerness modes were learned through their rewards.

For low and high eagerness, we reused the quality graders developed for the 3-in-1 model's SFT and RL, then added a relative eagerness reward based on the response's edit distance compared to the reference model's medium response. Low eagerness was rewarded for proposing a smaller edit than the reference. High eagerness was rewarded for proposing a larger one. In both cases, the quality reward prevented the model from optimizing edit distance at the expense of usefulness.

### Mitigating reward hacking

[Reward hacking](https://en.wikipedia.org/wiki/Reward_hacking) occurs when a model finds a way to increase its measured reward without producing the behavior the model developer intended to encourage. During development, we observed such failure modes in both of the new eagerness settings and added mitigations for each.

**High eagerness:** An early reward design did not apply the quality grader to the low- and high-eagerness modes. In that training run, the model sometimes proposed unrelated functionality or unnecessary formatting changes while increasing edit distance.

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

![Before-and-after Simulation Tests chart showing high-eagerness quality recovering after mitigation; trends and approximate values follow.](reward-hacking-benchmark.png)

_Figure 5. Benchmark results before and after mitigating excessive suggestions on the STests benchmark._

The chart plots training steps against the percentage of bad suggestions avoided, on a scale from 60% to 100%. The production baseline stays near 89%; before mitigation, the high-eagerness score falls to about 66% by the final plotted step, while low and medium eagerness remain near the baseline. After mitigation, all three modes stay near the baseline. Low, medium, and high are distinguished by square, circle, and triangle markers, respectively, as well as line styles, so the comparison does not depend on color alone; values here are approximate readings of the plotted lines.

**Low eagerness:** One training run produced smaller measured edits partly by [minifying suggestions](https://en.wikipedia.org/wiki/Minification_(programming)): removing whitespace and delimiter characters or shortening variable names while maintaining syntactic correctness. This is technically shorter code but is much less desirable! We mitigated this behavior in two ways:

* We normalized whitespace and delimiters before calculating edit distance, which removed any possible advantage from deleting whitespace.
* We added LLM-based grading for less deterministic cases involving variable names and delimiters.

We baked this into our evaluations by adding a deterministic minification check to the training and evaluation pipeline so this failure mode can be screened in subsequent runs.

<table aria-label="Code example before and after minification mitigation">
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

## Online results

We evaluated the configurable model in A/B experiments against the [production 3-in-1 model](https://code.visualstudio.com/blogs/2026/09/23/building-the-github-copilot-inline-suggestions-model-part-two). The results below highlight statistically significant changes. No other key metrics changed significantly from the baseline.

<table aria-label="Online results by eagerness setting">
  <thead>
    <tr>
      <th scope="col">Low eagerness</th>
      <th scope="col">Medium eagerness</th>
      <th scope="col">High eagerness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>29% lower dismissal rate</strong> and <strong>28% shorter suggestions</strong> than medium eagerness.
      </td>
      <td>
        No key metrics changed significantly from the baseline.
      </td>
      <td>
        <strong>40% increase in accepted and retained characters</strong>, <strong>40% more suggestions shown</strong>, and <strong>22% longer suggestions</strong> than medium eagerness<sup><a id="high-eagerness-note-ref" href="#high-eagerness-note" role="doc-noteref" aria-label="Footnote 3: high-eagerness dismissals">3</a></sup>.
      </td>
    </tr>
  </tbody>
</table>

These findings indicate that the configurable model behaved as intended: low eagerness was more conservative, high eagerness was more proactive, and medium preserved the default experience.

## What we learned

* **Pluggable features simplify development and deployment.** The key was separating what should change (eagerness) from what should remain stable (base-model quality). Instead of embedding eagerness in the full SFT recipe, the post-training approach starts from the production model, preserves its default behavior through the reference objective, and adds targeted objectives for low and high eagerness. That separation lets us carry the feature forward without rebuilding the entire training recipe.
* **A strong offline-to-online pipeline is essential.** We evaluated each candidate in two stages: first, whether eagerness moved in the intended direction. Second, whether suggestions remained useful. Offline benchmarks tracked online behavior closely and exposed a critical failure mode: optimizing high eagerness for edit distance alone could reduce quality. That finding led us to a joint reward that combined the eagerness objective with quality feedback.
* **Dogfooding findings should become regression tests.** As with the [Qualitative Must-Haves benchmark](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_offline-benchmarks), internal use surfaced issues that offline examples alone could miss because timing, cached suggestions, and surrounding tools all affect the experience. For example, several examples of reward hacking were caught during dogfooding. We turned those findings into repeatable checks and used them to monitor the final model's quality.

## What's next

Configurable eagerness is a first step toward inline suggestions that adapt to each developer and task. We're exploring two directions:

* **Automatic eagerness:** Adjust how proactively Copilot offers suggestions based on the current context, while keeping developers in control of the experience.
* **Learning from experience:** Use signals from rejected, modified, or corrected suggestions to reduce repeated errors and better align future suggestions with a developer's intent.

The goal isn't simply to suggest more or less code. It's to provide the right level of assistance for the moment, and improve that fit over time.

## Try it out

Configurable eagerness is available to paid GitHub Copilot subscribers in VS Code. Update to the latest version of VS Code, [confirm that Next Edit Suggestions are enabled](https://code.visualstudio.com/docs/editing/ai-powered-suggestions#_next-edit-suggestions) (they are on by default), then open the Copilot settings menu and choose an **Eagerness** setting. Try each mode to find the level of assistance that works best for you.

![Screenshot showing the Copilot settings menu with Next edit suggestions enabled and the Eagerness dropdown outlined in red, listing Auto, Low, Medium, and High.](eagerness-setting.png)

## Acknowledgments

Thank you to the developer community for your ongoing feedback that shaped configurable eagerness, and to the combined teams of researchers, engineers, PMs, and designers across VS Code, GitHub Copilot, and Microsoft for their contributions, testing, and support throughout development.

Special thanks to Julia Gong, Satarupa Guha, Yu Hu, Ben Liggett, Shengjie Ma, Gaurav Mittal, and Nick Trogh for their insightful feedback on this blog post.

Happy coding! 💙

<section role="doc-endnotes" aria-label="Footnotes">
<hr>
<p id="edit-distance-note"><a href="#edit-distance-note-ref" role="doc-backlink" aria-label="Footnote 1: return to edit distance">[1]</a> A no-edit response has distance zero, while a nonzero distance counts the characters changed in a proposed edit, so the distribution reflects both how often edits are proposed and how much they change.</p>

<p id="distillation-note"><a href="#distillation-note-ref" role="doc-backlink" aria-label="Footnote 2: return to on-policy distillation">[2]</a> Here, the reference model and the model under training share the same base architecture; our application of distillation preserves behavior from the reference model rather than compressing a larger model into a smaller one.</p>

<p id="high-eagerness-note"><a href="#high-eagerness-note-ref" role="doc-backlink" aria-label="Footnote 3: return to online results">[3]</a> Raw dismissals were also higher alongside the increase in shown suggestions, but dismissal rate did not change significantly.</p>
</section>
