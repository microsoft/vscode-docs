---
Order: 138
TOCTitle: "Inline Suggestions Model: Part One"
PageTitle: "Building the GitHub Copilot Inline Suggestions Model: Part One"
MetaDescription: Explore how GitHub Copilot unified completion, next edit, and long-distance suggestions into one model for a faster, more cohesive coding experience.
MetaSocialImage: building_github_copilot_inline_suggestions.png
Date: 2026-09-16
Author: Julia Gong, Ben Liggett, Ulugbek Abdullaev
Keywords: [github copilot, inline suggestions, code editing, coding models, next edit suggestions, long-distance edits, code generation, ai-assisted coding, model training, vs code, machine learning]
---

# Building the new GitHub Copilot Inline Suggestions Model: Part One

September 16, 2026 by [Julia Gong](https://linkedin.com/in/juliagong), [Ben Liggett](https://www.linkedin.com/in/ben-liggett), and [Ulugbek Abdullaev](https://github.com/ulugbekna)

_Completion-style ghost text, next edit suggestions near the cursor, and edits farther away were previously powered by separate models. We built one model for all three, and learned that the best results come from training, evaluation, and editor design evolving together._

At GitHub Copilot, our mission is to support all development workflows, from AI-assisted coding using inline suggestions to agent-first software engineering in the VS Code Agents window. Inline suggestions are used and loved by millions of developers, and we continue to push the quality bar on it and all GitHub Copilot experiences.

Writing code is rarely linear. The next useful change might be a few characters at the cursor, a nearby rewrite, or a related edit elsewhere in the codebase. Inline suggestions accommodate these different workflows through completion-style ghost text, nearby next edit suggestions, and long-distance edits.

Previously, specialized model paths powered each type of suggestion. The tried-and-true [completions model](https://github.blog/ai-and-ml/github-copilot/the-road-to-better-completions-building-a-faster-smarter-github-copilot-with-a-new-custom-model/) doesn’t need much of an introduction, and in earlier posts, we shared how we [trained a custom model for next edit suggestions](https://github.blog/ai-and-ml/github-copilot/evolving-github-copilots-next-edit-suggestions-through-custom-model-training/) and [extended those suggestions to edits farther away](https://code.visualstudio.com/blogs/2026/02/26/long-distance-nes). We have now unified all three models behind a single “3-in-1” model that can do it all.

Unifying the models **improves suggestion quality** by allowing a **single model to choose the best edit for the developer’s current work end-to-end** instead of using programmatic logic to choose among specialized models. For instance, let’s say the developer has typed `class Fa` in the penguin feeding program below. Using the previous standalone models (left), the most mature and battle-tested completions model is always triggered first. Since it can only append to the prefix `Fa`, it does what it knows best and suggests `FastingPenguin`. However, in this particular case, a better NES suggestion exists, as suggested by the unified model (right): semantically rewrite `Fa` to `Fish`.

| Before (standalone models) | After (unified model) |
| --- | --- |
| <img src="/assets/blogs/2026/09/16/quality_improvement_before.png" alt="A code example where the standalone completion model chooses FastingPenguin instead of the better Fish rewrite." height="300"> | <img src="/assets/blogs/2026/09/16/quality_improvement_after.png" alt="A code example where the unified model selects the better Fish rewrite for the same context." height="300"> |

Not only can we tackle all existing tasks in one model, but because this model can **output multiple edits in one response**, we can cache these additional edits to deliver a **faster experience** for subsequent edits if the preceding suggestions were desirable. This creates a **smoother, snappier tab-tab-tab experience** across the editing flow.

To enable this better editing experience, we first **reframed the modeling task**—especially the prompt and output format—to generalize across code editing tasks. We then **combined our learnings in data quality, model training and evaluation, and client design** from the standalone models, in addition to extensive additional experimentation (over 200 offline and 20 online experiments, whose course we will chart in the remainder of these posts), to carefully optimize the model and end-to-end experience. The result is a **higher quality, faster, and more cohesive typing companion** that is greater than the sum of its parts.

![An animation of a VS Code coding experience with ghost text and fast follow-up tab-tab-tab suggestions showing the unified inline suggestions experience.](unified_experience_teaser.gif)

## Why unify?

Prior to the unified model, the production implementation of inline suggestions in VS Code was powered by three separate models:

1. **Completions** (the [familiar ghost text](https://github.blog/ai-and-ml/github-copilot/the-road-to-better-completions-building-a-faster-smarter-github-copilot-with-a-new-custom-model/) we all know and love),
2. **NES** ([next edit suggestions](https://github.blog/ai-and-ml/github-copilot/evolving-github-copilots-next-edit-suggestions-through-custom-model-training/), or nearby edits bounded by a few lines above and below the cursor position),
3. **Long-distance NES** ([longer-range NES-style suggestions](https://code.visualstudio.com/blogs/2026/02/26/long-distance-nes) farther from the cursor).

This dedicated work on individual tasks, with a highly mature completions model alongside newer editing models, resulted in a client-orchestrated experience that triggered each where appropriate.

While effective for these individual tasks and a necessary step to bring new editing capabilities to users, this created key shortcomings not only in terms of user flow quality (sometimes making suboptimal or piecemeal edits rather than a single clear edit that best serves the context) and latency (potentially up to 4 model calls per opportunity, as shown in the figure below), but also in terms of extensibility to future features (for example, multi-file edits).

![Standalone models diagram showing separate completion, NES, and long-distance NES call paths.](standalone_models_diagram.jpg)

_Figure 1. The original stepping-stone production setup for VS Code inline suggestions with three standalone models: completions, NES, and long-distance NES. Note that this diagram is simplified for clarity and represents the behavior from a user’s perspective (real provider calling behavior is more complex and involves issuing parallel calls to completions and NES, for instance, depending on the position of the user’s cursor and how quickly the prioritized model responds). Each model handled its own standalone task, while the client orchestrated the logic of when to trigger which model. The completions model would always be triggered first to predict ghost text at the user’s cursor, which would be shown if ghost text was generated. If no ghost text was produced, the NES model would be invoked to rewrite the window around the user’s cursor, and shown using the appropriately rendered view kind if the rewrite resulted in a net edit. If still no edit was predicted, the long-distance edit model was triggered to predict a potential line number to jump to. If no line number was produced, no edit would be shown. If it did jump to a new line number, the NES model would be invoked once more to rewrite a window around the long-distance line number, resulting in a long-distance NES edit._

Unification also creates a compounding benefit. With **one shared model powering every inline suggestion**, each model improvement or new model feature can now benefit the full experience rather than remaining isolated to a single suggestion type.

## Reformulating the code editing task

Knowing that a unified model was the north star, we realized this was an opportunity to reformulate the code editing problem, starting from the model output format. None of the three individual siloed tasks of predicting a suffix (completions), a window rewrite (NES), or a line number (cursor jump), which we had solved systematically and individually over time, were sufficiently expressive to represent the other tasks entirely. To combine these into a single model that could do all three, we needed a similarly unified output format—this gave rise to an elegant solution that we call the **“diff patch” output format**.

Consider a developer changing a function signature. The next useful action may be completing a new argument at the cursor. A moment later, it may be updating a call site below. After that, it may be adjusting validation logic elsewhere in the file. These are different interactions, but they are part of one editing task. A shared patch language lets the model reason about them as **sequential steps of the same problem**, which can be presented to the user with greater fluidity.

To fully understand the model output format changes, one can think of the three individual model tasks each as natural extensions of LLM next-token prediction capabilities—completions **continued unfinished code**, NES **rewrote a local edit window**, and long-distance edits **predicted the next line number to jump to**, accompanied by a call to NES. The 3-in-1 model puts these together to tackle all three at once while allowing the model to predict **multiple edits in one pass**.

To make this concrete, consider this example, where the symbol `<|cursor|>` represents the position of the user’s cursor.

```python
def feed_penguin(penguin, fo<|cursor|>):
    penguin.meals += 1
    penguin.hungry = False
    penguin.last_ate_time = datetime.now()

    print(f"{penguin.name} ate {fish.type}")

penguin = Penguin("emperor")
feed_penguin(penguin, fish="silverfish")
```

The completions, NES, and long-distance edit models might predict the following in isolation to make the best edit for their corresponding tasks:

<table>
  <thead>
    <tr>
      <th>Completions format</th>
      <th>NES (Window Rewrite) format</th>
      <th>Long-Distance Edit format</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>od</code></td>
      <td>

```python
def feed_penguin(penguin, food):
    penguin.meals += 1
    penguin.hungry = False
    penguin.last_ate_time = datetime.now()

    print(f"{penguin.name} ate {food.type}")
```

</td>
      <td><code>5</code> (the next line number where fish should be replaced with food)</td>
    </tr>
  </tbody>
</table>

The diff patch output format puts all of these elements together into a chain of edits that makes most sense at the cursor, farther away from the cursor, and even in a related file:

```diff
/path/to/penguins.py:0
-def feed_penguin(penguin, fish):
+def feed_penguin(penguin, food):
/path/to/penguins.py:5
-    print(f"{penguin.name} ate {fish.type}")
+    print(f"{penguin.name} ate {food.type}")
/path/to/penguins.py:8
-feed_penguin(penguin, fish="silverfish")
+feed_penguin(penguin, food="silverfish")
/path/to/antarctica.py:42
-feed_penguin(penguin2, fish="krill")
+feed_penguin(penguin2, food="krill")
```

Multi-patch responses also importantly allow us to **cache subsequent patches** (in the example above, the edits at lines 5, 8, and 42). Upon acceptance of preceding patches, they can appear with low latency, which results in a **fast tab-tab-tab code editing experience**.

This format expresses the three previous tasks in full and allows for flexibility in elegantly expressing future behaviors like cross-file edits (edits suggested in a related, but different file from the current one). More general formats such as tool calls are more abundant in pretraining and support actions beyond editing, but for code edits, we found that this format is most compact while remaining expressive.

In addition to reformulating the output task, we also took the opportunity to revisit the context given to the model as input. Originally, the input to the model included:

1. Recently viewed code snippets without line numbers
2. Current file content with line numbers
3. Recent edit history of the user in unified diff format
4. Area around the code to edit, a total of +/- 15 lines around the user’s cursor to pad the code to edit region
5. Code to edit, the rewrite window spanning 2 lines above and 5 lines below the user’s cursor

The unified output format enabled us to **simplify the input context as well**. Because the task scope now allowed for arbitrary edits anywhere in the file and was not limited to predicting the suffix at a specific location or rewriting a fixed window, we could remove the last two sections of the input—area around the code to edit and code to edit—and instead replace it with a single 3-line block with the line number and file content of the current cursor location. One important learning we carried forward from the previous models was that since the user’s cursor is constantly changing positions, we kept the cursor location section at the end of the prompt as opposed to directly placing it inside of the current file content. This **optimizes key-value caching** by maximizing the common prefix of the prompt with previous prompts.

We wanted to tackle the problem of unification methodically, so we approached it in two phases. First, we unified the NES and long-distance capabilities into a single model with the unified diff patch format, which we refer to as the 2-in-1 model. The completions model was left intact, and the client orchestration logic was simplified to prioritize completions, followed by the **2-in-1 model**. We then unified the 2-in-1 model with the completions model to bring in the ghost text capabilities to arrive at the **3-in-1 model**. We’ll describe our experimental process and share some of the methods we developed, challenges we encountered, and learnings we gained along the way.

![The unification strategy diagram showing the stagewise merge from completions, NES, and long-distance edit models into the 2-in-1 model and then the final 3-in-1 model.](unification_strategy.jpg)

_Figure 2. We first unified the NES and long-distance NES models to yield the 2-in-1 unified model, followed by unifying the 2-in-1 model with the completions model to yield the 3-in-1 model._

## Phase 1: The 2-in-1 model

We deliberately chose to **first tackle NES and long-distance edits before completions**. In our experience, the completions model accounted for most of the inline suggestions traffic—higher than 70% of edit opportunities. Previous experimentation from the team also showed that NES suggestions were more prone to user dismissals than ghost text. Thus, we chose to first unify the two other models and tackle the flagship completions model last. Because the diff patch output format could be used for the 2-in-1 model, this also meant that later training for the 3-in-1 model could directly take advantage of the data and other learnings from the 2-in-1 model, accelerating experiment velocity.

## Evaluation

To build a good system and improve it, we must start by deciding what we want to measure. No single score captures the quality of an inline suggestions model. We therefore used four complementary stages of evaluation, similar to the process we used for earlier next edit suggestion releases.

1. **Offline evaluation**: Targeted offline tests helped us inspect completion behavior, difficult editing scenarios, patch validity, suggestion length, and the balance among different types of edits.
2. **Internal dogfooding**: Daily use exposed issues that aggregate scores could miss, such as suggestions that were reasonable but poorly timed, too eager, incomplete, or awkwardly presented.
3. **Human evaluation at scale**: We also did human evaluation with programmers of diverse backgrounds on thousands of coding tasks using structured feedback templates to get a quantitative assessment of model quality from real developers.
4. **Controlled online experiments**: Promising model candidates were flighted live using A/B testing so we could evaluate the ultimate impact of the model on real users.

Each stage answered a different question. Offline evaluation told us whether a candidate was worth testing. Dogfooding gave us a firsthand perspective on how it felt in realistic workflows. Human evaluation quantified the dogfooding experience and provided structured feedback. Online experiments told us whether the complete system created value in use compared to the existing production setup.

### Offline benchmarks

Offline evaluation for the original NES models consisted primarily of 3 benchmarks, which each assessed different dimensions of the NES models:

1. **Simulation Tests (STests)**. A manually curated set of workspace recordings from our team that demonstrate must-have, nice-to-have, and must-avoid suggestion behaviors.
2. **HumanEval**. An augmented version of the HumanEval dataset from OpenAI that was expanded to evaluate models’ completion capabilities on single-line, multi-line, and random spans of code.
3. **Output View Kind**. Examples passed through prior production models, including the view kinds (ghost text, side-by-side NES, no edit, etc.) of the models’ output, used to track any differences in the distribution of view kinds produced by new candidates compared to the original models.

## Training the v1 models: Diff-patch NES

We began by building tools to robustly convert the original NES model evaluation and training data into diff patch format. Once the data was converted, we trained some initial **supervised fine-tuning (SFT)** models, followed by **reinforcement learning (RL)** on the NES-only training data—let's call this round of models the **v1 models**.

As we expected, the resulting models could perform on par with the NES models in offline benchmarks, but the distribution of edits they learned was exactly that—NES edits, with almost no long-distance edits. We also discovered that the difference in data formats, despite using identical data samples, sometimes resulted in different behaviors. For instance, edits tended to be more incremental, which might be due to the diff patch format naturally expressing targeted changes at specific locations instead of rewriting an entire target window (this will come up again later when we discuss the 3-in-1 model). Upon flighting these models, we also discovered several client-side nuances for handling this new output format, including caching and error handling, that were refined early so that future model candidates could benefit from this dry-run.

Now it was time to fold in long-distance edits. In the diff patch formulation of the problem, an elegant property emerges for the long-distance NES case: **An NES edit + a long-distance NES edit = a multi-patch response**. Multi-patch responses were also critical to add because of the user experience economies of scale that come with caching subsequent patches for fast follow-up edits.

But how were we going to get multi-patch responses when our existing models did not have multi-patch capabilities?

## Training the v2 models: Adding in long-distance NES

Folding in long-distance edit capabilities wasn’t trivial because the sets of existing data for long-distance edits and NES were not joinable, as they were from completely different files and edit histories. We needed to bootstrap multi-edit data from the single-edit data. We ultimately came up with two approaches to solve this problem:

1. **Bootstrapping responses using v1 model pseudolabels**. We first fast-forwarded the diff patch-format NES data by moving the output label into the edit history. We then fed this fast-forwarded data back into the best v1 models that we trained. If the model produced an edit response, we appended this pseudolabel to the original data’s output label as another patch. We continued to repeat this process until the v1 model produced no edit in its response. This yielded samples with n patches that we could then teach the model to produce. See the figure below for details.
2. **Edit playback**. We parsed the NES data model input, which contained user edit histories, and used those edits to “rewind” the state of the workspace file by anywhere from 1 to n edits. We then removed those edits from the edit history in the input and prepended them to the output.

![A diagram showing the multi-patch bootstrapping techniques used to generate multi-patch data from single-patch data.](multipatch_bootstrapping.jpg)

_Figure 3. Two processes by which we repeatedly bootstrapped multi-patch data by fast-forwarding single-patch data. Top: We first fast-forwarded the data with n patches in the output by moving the output label into the edit history. If the model produced a response for this fast-forwarded sample, that output would be added to the original sample’s output label to create a response with n+1 patches. Bottom: We performed edit playback by moving recent edits from the edit history to rewind the session state and predict them as part of the model output._

After these approaches yielded enough data, we then filtered the data using an **LLM-as-a-judge and rules-based quality filter**. The criteria in this filter were distilled from our understanding of developer preferences throughout the development of our preceding code editing models, such as correctness, necessity, and intent and edit history alignment, and the rules-based filters accounted for patch validity and undesirable behaviors like code duplication.

We then used SFT to train a new model on a new mix of this data and the previous NES data, which yielded models that produced 1.3 to 1.4 patches on average, compared to the original near-1 averages. While this number might sound small, we later found this is a sweet spot that makes a significant difference in the user experience without degrading quality. After all, to get an average of 2 patches per response, long-distance edits would need to happen on average at every edit opportunity, which was not the case in the existing production setup with a dedicated long-distance edit model.

RL was applied to the v2 SFT models in a similar fashion, using the same techniques to bootstrap multi-patch data. The grader logic was also altered to incorporate guidance for multi-patch responses. We found this model had much stronger offline results compared to the SFT model.

### Patch ordering

When there are multiple edits, the natural question of how to order them comes up. This was also a deliberate choice we made.

During data filtering, in addition to the criteria for edit quality, we also added a new criterion targeting edit ordering requiring a **smooth logical flow of the edits through the file in order of priority and proximity to the user’s cursor**. This choice sounds intuitive because it was distilled from our experience in orchestrating the three standalone models in the client. The logic was to first query the completions model, followed by the NES model, followed by the cursor jump model and a subsequent NES model call if the cursor jump model chose to jump.

In addition to including these criteria in the data filtering pipeline, we also included them in the RL grader with some additional nuances in the reward function, which we observed was important for prioritizing logically coherent edits.

### The Pseudo-Online Evaluation benchmark

The v2 models were a step-function improvement compared to the v1 models in online A/B testing compared to the production three-model control. Aside from the dismissal rates being elevated, all other metrics like acceptance rate, shown rate, accumulated retained characters, and user engagement metrics had no statistically significant movement. But one strange finding emerged: **offline results were not very predictive of the online results**. One of the strongest offline candidates with the highest-ever score in STests, for instance, did not do as well as another with lower STests in the A/B flight. This got us thinking: how do we **close the gap between our offline and online results** so we can iterate on model candidates more efficiently and confidently?

The result was a fourth offline benchmark that we call the **Pseudo-Online Evaluation (POE)**. The benchmark consists of three equally-sized sample buckets representing acceptance, rejection, and no edit cases from production model outputs, along with suggestion quality signals. The benchmark runs each of the samples in these groups through the candidate model. It then uses an LLM judge using in-context learning to determine whether the candidate response would be accepted or rejected given the known outcome of that sample.
The most critical metrics that arose from this benchmark were the **reject rate** (lower being better), **accept-to-reject-rate ratio** (higher being better) and the **ratio of rejects that became no edits to the accepts that became no edits** (a measure of whether the model learned to abstain more for previously poor responses without losing previously good responses). We also quantified issues like patch validity errors, which we will talk about later, and other metrics, such as the number of patches in responses. These metrics, while admittedly still not a perfect proxy, became a stronger predictor of online performance for subsequent model candidates.

### Grader and quality filter calibration

Developing the POE benchmark also raised another question: were we leaving anything on the table with our new diff patch-specific RL graders? Could we improve it using additional data and quality signals?
We decided to try to calibrate the grader better to user feedback by taking a self-refinement approach to the grader. We developed an agent skill that performed the following loop:
1. Take the samples from POE and run them through the grader to get the **grader’s judgment** on the production model response.
2. Construct the **confusion matrix** of false positives, false negatives, true positives, and true negatives after running all samples.
3. Randomly sample examples from each category to **understand common failure modes** of the grader and patterns in its blind spots.
4. Adapt the existing grader instructions to **incorporate any observed feedback** that clearly formed a pattern.
5. Repeat.

It is worth noting that the quality signals we use are oftentimes noisy. However, through this process, we were able to automatically increase concordance between the RL grader and these quality signals, **reducing false negatives by 8.4%** and **false positives by 1.1%**. This improved the reliability of our training, evaluation, and data filtering pipelines.

### Tackling invalid patches

Later v2 model variants benefited from the updated RL grader and better offline model selection, but a few other challenges emerged as we dogfooded the models more regularly. One of these challenges was invalid patches.

We noticed that the model would sometimes create patches that were malformed or introduced mistakes that were programmatically verifiable. We characterized patch validity with two tiers: **critical issues** that impact the user experience, and **suboptimal patches** that are token-inefficient. We developed fine-grained rules-based filters to catch these issues. An example of a critical issue is duplication of code in the lines preceding or following the line where the user’s cursor is. These are visible to the user and negatively impact the suggestions they receive. In contrast, an example of a suboptimal issue is no-op patches, or patches where additions and deletions are perfectly matched; in other words, patches that completely undo their own work. These were wasteful from a token and latency perspective, but not detrimental to edits presented to the user.

Incorporating these rules-based patch validity checks into the RL grader did decrease the proportion of invalid responses, but it improved less than expected. We turned to examining the distribution of data in our RL dataset and hypothesized that it did not capture the common contexts in production that led to these model errors. To validate this suspicion, we conducted **targeted data mining** on examples from the latest v2 models that triggered patch validity failures. We ran the responses through our patch validity checks, **repaired them automatically using an iterative LLM feedback loop** guided by those checks, and **filtered the repaired samples for quality**. By carefully experimenting with the sampling ratio of these examples during training, we were able to reduce patch validity issues without negatively impacting other scenarios.

One last thing we ablated for the patch validity checks was whether to penalize both critical and suboptimal issues, or just the critical issues. We hypothesized that allowing the model to produce suboptimal patches might **clean up the reward signal** for reducing critical issues and also have unexpected benefits (e.g., a no-op patch between two valid patches might almost serve as a ‘chain of thought’ as the model thinks through possible edit locations). Indeed, once we **removed the penalty for suboptimal patches**, we did see more consistent reduction in critical issues without significant detriments in other offline quality metrics.

## Training the v3 models: Tackling issues in insertion pattern propagation

As we got closer to a strong shipping candidate, one other persistent issue presented itself through dogfooding: misplaced insertions during **pattern propagation**, and specifically, **correct content with incorrect placement**. This was a very specific failure mode of the v2 models when the appropriate response would be to insert new content at another location in the file to propagate a pattern of repeated insertions following user intent. For instance, if the user added the field `password` after `email` in a web form, the expectation would be to add the corresponding `Password` label after the `Email` label, and a `validate_password` check after the `validate_email` check. However, the v2 models were found to frequently place `Password` before `Email`, or even at the very bottom of the list of fields.

Building on our learnings from suppressing invalid patch behavior, we approached this problem in two ways.

First, we used **LLM judges to identify examples from the v2 model outputs** that exhibited this specific failure mode: generating the correct content but placing it incorrectly when user intent implied pattern propagation. This proved surprisingly difficult because long-distance insertion scenarios were relatively rare compared to replacement scenarios. Even after LLM-based response repair and quality filtering, we obtained thousands of positive examples, but only a few hundred negative examples exhibiting the original placement error.

![Diagram of the data mining workflow used for targeting problematic behaviors.](data_mining_workflow.jpg)

_Figure 4. The data mining workflow we distilled to target problematic behaviors, such as invalid patches and insertion pattern propagation. Raw data is first collected from model outputs, then filtered to specific problematic examples, then repaired and filtered for quality before being used in training._

After folding this data into both SFT and RL, we did not notice a significant impact on model behavior. We then hypothesized that the positive examples and corrected negative examples did not have the same distribution or value for model learning, so we **upweighted the negative examples during RL**.

After doing so, we inspected model rollouts during RL training and were surprised to see that the RL grader was not reliably flagging insertion pattern propagation errors of this type despite the sufficient data representation. Because of the multiple objectives in the already complex grader, to avoid destabilizing the existing grader behavior, we developed a new technique for the RL grader that **introduced a new auxiliary grader** to specifically address the insertion pattern-following deficit in the primary grader. We gated this grader to examples that had insertions in the ground truth or prediction.

Altogether, the targeted examples, hard example upweighting, and grader changes ultimately corrected the models’ problematic insertion behavior, resulting in the v3 models. This combination of **data representation, data balancing, and grader augmentation** was a very important learning for us, and a technique we would reuse again when developing the 3-in-1 model.

### The Qualitative Must-Haves benchmark

The challenges we faced with the insertion pattern propagation issue, which **surfaced only through dogfooding and not through flighting nor through offline evaluation**, led us to think about the potential gaps in our existing evaluation methodology. This prompted us to develop a fifth offline evaluation benchmark, Qualitative Must-Haves (QMH), which is a living curated collection of scenarios that previous and current models have found challenging, often discovered through dogfooding.

The objective of this benchmark is distinct from the others. While the others are larger-scale and quantitative, we deliberately kept this one lean and small so that it could serve as a **“canary” set to flag issues** with models and **filter out or rule in model candidates quickly**. In addition, it focuses more on preventing past bad behaviors than generically measuring model quality. The name is somewhat of a misnomer, though, as it eventually became quantitative as we developed LLM judges that could serve as human proxies for judging the results.

Both our 2-in-1 and 3-in-1 modeling efforts have greatly benefited from this benchmark as a heuristic for model regressions and potential user frustration, as well as the quick iteration it has enabled due to its small size. We also further included scenarios we added to the QMH dataset in the larger-scale human evaluations that we do at scale.

One of our greatest learnings in developing this benchmark has been that because the models we train have shared data and training pipelines, problematic behaviors can crop up again in future models if not carefully monitored, especially if future models have different objectives, such as adding a new feature. **Having a small set of samples that measure critical behaviors that can quickly flag regressions**, or if used proactively, prevent possible regressions, has been a **game-changer for model selection**. It is worth noting that for this set to be reliable, it must have good coverage, so spending time to curate the examples and making sure they are a fair representation of past and potential regressions has been important.

Another learning to underscore is the **importance of dogfooding**. Nothing beats trying it out yourself, especially as not everything can be captured perfectly on a quantitative scorecard. Testing the boundaries of the model ourselves as end users provides a unique perspective. As developers of products for developers, we consider this **mandatory and an important part of the culture we pride ourselves on** in providing high-quality code editing models.

![Diagram illustrating the model selection process, showing how evaluation benchmarks, human feedback, dogfooding, and online experimentation are combined to compare and choose candidate models.](model_selection_process.jpg)

_Figure 5. Our model selection process was refined to leverage the insights gained in each step to efficiently narrow down model candidates, from early filtering using QMH to extensive offline evaluation to dogfooding to online flighting. All intermediate steps in this process are valuable evaluation signals and can also loop back to inform another round of model training._

## Takeaways and learnings

Unifying NES and long-distance edits hinged on **reformulating the output as a single diff patch format**. This one representation could express every prior task and, critically, chain multiple edits into a **multi-patch response**, which was the foundation for a low-latency tab-tab-tab flow. A few core lessons stood out:

1. **Bootstrap data when pioneering new scenarios.** Multi-patch training data didn't exist, so we synthesized it from single-edit data using pseudolabels and edit playback, followed by quality filtering. This formed the foundation of the SFT and RL data to start the flywheel of multi-patch model development.
1. **A repeatable recipe emerged for fixing specific failure modes.** Targeted examples, hard-example upweighting, and a gated auxiliary grader were critical to refining the model from a good model into a shipping candidate. It fixed issues of invalid patches and insertion-pattern propagation, and became our go-to technique going forward.
1. **Try to close the offline-to-online gap.** This drove the Pseudo-Online Evaluation (POE) benchmark and a self-refinement loop to calibrate the grader against model outputs and quality signals, and tightening the offline to online gap led to faster and more confident experimentation.
1. **Bring tried and true lessons and intuition into new territory.** In both the data filter and the RL grader, we enforced the guideline that edits must flow logically outward by priority and proximity to the cursor. This arose from our experience in orchestrating a successful experience for inline suggestions in the three-model setup.
1. **Dogfooding can catch what metrics are missing.** Issues that were invisible offline and online surfaced only through daily use, motivating the small Qualitative Must-Haves “canary” benchmark to guard against regressions in shared pipelines.

## Online results

We flighted 2-in-1 model candidates against the production baseline of the three standalone models (completions, NES, and cursor jump). The final shipping candidate was observed to have **no statistically significant regressions in any key metrics** (acceptance rate, dismissal rate, shown rate, recurring engagement, and accumulated retained characters). In addition, we saw a **decrease of 10% in the time it took for suggestions to be shown** to the user, along with a **reduction of 61% in output tokens**. These were mostly due to the more efficient output and input formats and more streamlined client logic.

## Try it out

The unified Inline Suggestions experience is available now for paid GitHub Copilot users in VS Code. Update to the latest version of VS Code, then make sure [next edit suggestions are enabled](https://code.visualstudio.com/docs/editing/ai-powered-suggestions#_next-edit-suggestions).

Give it a try the next time you are in the editor, whether you're working on a refactor or writing a new function. We hope you enjoy the tab-tab-tab experience and we'd love to hear your feedback!

In the second part of this blog post, we’ll dive deeper into how we moved to the 3-in-1 model for inline suggestions. Stay tuned!

## Acknowledgements
Special thanks to Luciana Abud, Alexandru Dima, Yu Hu, Simona Liao, Shengjie Ma, Elsie Nallipogu, and Nick Trogh for their thoughtful feedback, insights, and contributions to this blog post.

We extend our deepest gratitude to our developer community for the ongoing feedback that pushes us to deliver the best possible experiences with VS Code and GitHub Copilot. Huge thanks to the researchers, engineers, product managers, and designers across GitHub and Microsoft who curated the training data, built the training pipeline, evaluation suites, and serving stack, and to the VS Code and GitHub Copilot teams for smooth model releases.

Happy coding! 💙
