---
Order: 139
TOCTitle: "New Inline Suggestions Model (part 2)"
PageTitle: "Building the new GitHub Copilot Inline Suggestions Model: Part Two"
MetaDescription: Explore how GitHub Copilot unified completion, next edit, and long-distance suggestions into one model for a faster, more cohesive coding experience.
MetaSocialImage: building_github_copilot_inline_suggestions.png
Date: 2026-09-23
Author: Julia Gong, Shengjie Ma, Ben Liggett, Ulugbek Abdullaev
Keywords: [github copilot, inline suggestions, code editing, coding models, next edit suggestions, long-distance edits, code generation, ai-assisted coding, model training, vs code, machine learning]
---

# Building the new GitHub Copilot Inline Suggestions Model: Part Two

September 23, 2026 by [Julia Gong](https://linkedin.com/in/juliagong), [Shengjie Ma](https://www.linkedin.com/in/shengjie-ma), [Ben Liggett](https://www.linkedin.com/in/ben-liggett), and [Ulugbek Abdullaev](https://github.com/ulugbekna)

_Completion-style ghost text, next edit suggestions near the cursor, and edits farther away were previously powered by separate models. We built one model for all three, and learned that the best results come from training, evaluation, and editor design evolving together._

## Phase 2: The 3-in-1 model

In the [first part of this blog post](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one), we shared the first phase of the unified modeling effort: unifying the NES and long-distance edit behavior into a single 2-in-1 model.

![The unification strategy diagram showing the stagewise merge from completions, NES, and long-distance edit models into the 2-in-1 model and then the final 3-in-1 model.](unification_strategy.jpg)

_Figure 1. We first unified the NES and long-distance NES models to yield the 2-in-1 unified model, followed by unifying the 2-in-1 model with the completions model to yield the 3-in-1 model._

The next step was to **bring completion behavior into the 2-in-1 model**. Previously, an edit opportunity could involve a completion request followed by another request for a richer 2-in-1 model edit. With the fully unified 3-in-1 model, one request can consider the full range of code editing behaviors and decide the best response at any given moment, or chain many of them together in a single response.

This greatly reduces model calls and serving complexity, but the biggest benefit isn't even the efficiency. A **single model** can **optimize for the best edit that fits the moment** instead of preserving the artificial boundaries that resulted from the system architecture.

Case in point, in our final 3-in-1 model candidate, we found that while the proportion of less-intrusive ghost text decreased in the 3-in-1 model compared to the 2-in-1 model setup, there were actually significant **measurable improvements in user satisfaction**. We will talk more about this later in this post.

## Training the v4 models: adding in completions

To train the 3-in-1 model, we applied what we learned while developing the 2-in-1 model. As the goal was to add completion behavior to the 2-in-1 model, the distribution of the training data needed to change. We gathered ghost text completions data through a variety of techniques, including **distilling ghost text from the original completions model** and filtering them for quality using an LLM judge. We leveraged the original training recipes from the 2-in-1 model while adding this new ghost text data.

We also took care when **rebalancing the distribution of the multi-edit data** inherited from the 2-in-1 model recipe, since models that showed too little ghost text or were too eager to jump away from the user’s cursor had been shown in previous experiments to result in more disruptions to the user flow and thus higher dismissal rates. This naturally gave rise to a **dedicated subset of multi-edit data** where the **first patch was a ghost text completion at the user’s cursor**. During RL, as mentioned earlier in [part one](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_patch-ordering), we also kept the grader design that encouraged the model's edit sequences to begin with the most immediate continuation of the developer's work, then move outward to related follow-up changes, which made edits least intrusive and kept more logical flow and continuity.

Early model candidates produced ghost text more often and more suggestions overall as a result. We measured these results offline with three [benchmarks](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_offline-benchmarks) discussed in part one: STests, Output View Kind, and [Pseudo-Online Evaluation](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_the-pseudo-online-evaluation-benchmark). We also noticed that the HumanEval benchmark results improved because of having stronger completions capabilities.

When we flighted these v4 models against the now-production setup of the 2-in-1 model and the completions model, results were quite promising: no statistically significant changes in acceptance rate, dismissal rate, shown rate, and user engagement metrics. But we did find a **marginally statistically significant regression in accumulated retained characters**, or the number of characters that were not reverted by the user within a certain time interval after accepting a suggestion.

We considered several potential causes of this regression, including poorer suggestion quality, but because of the lack of movement in other metrics, we ultimately pulled the thread on one hypothesis in particular: **suggestion length**.

## Training the v5 models: ghost text completeness

Our hypothesis was that because the model was producing slightly shorter ghost text suggestions compared to the production completions model, users might be accepting promising but incomplete suggestions. As a result, they might be more frequently reverting or editing the suggestions. For instance, writing the function signature and docstring is nice, but if we don’t follow through with the full implementation, then the user might remove the function, make edits, or rewrite it manually.

To test this hypothesis, we applied [what we learned](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one#_training-the-v3-models-tackling-issues-in-insertion-pattern-propagation) from the 2-in-1 model’s insertion challenges and gathered a **subset of data that specifically targeted this type of longer-output scenario** and performed a similar **upweighting of the data**. We further added another **auxiliary grader** dedicated to **ghost text completeness** and gated it to these specific curated samples. To measure the offline impact of this change, we also introduced a **second version of the Output View Kind dataset** that measured the character lengths and proportion of ghost text in model responses compared to the original distribution of the production model.

We flighted our most promising model candidate and were pleased to see that the regression in accumulated retained characters had decreased but was not eliminated, and the dismissal rates were trending higher. However, there were several observations made during the dogfooding experience that led us to look beyond the model itself. This reinforced an important lesson we had learned through iterating on our previous models: **client behavior is just as important as the model**.

## The model is part of a larger end-to-end experience

The ultimate user experience is much more than just the model's capabilities: **a great inline suggestions experience is the fusion of a great model with a great end-to-end system**. Careful client orchestration is also necessary to show edits to the user at the best time and in the best way.

For example, when dogfooding the most promising 3-in-1 flight candidate, we noticed an important past client behavior decision for NES that was worth revisiting. When ghost text was shown to the user but ignored, if the user moved their cursor to a different location, that **cached ghost text suggestion would be re-shown as an NES edit**. Upon deeper investigation, we estimated that this client behavior alone could potentially be responsible for inflating the 3-in-1 model’s dismissal rate by 7-8%. Once we ablated this issue in an A/B flight, we found the impact was even larger than we had estimated—the dismissal rate went from a **15.9% increase to a 10.1% decrease—a 26% difference**—compared to the production 2-in-1 setup.

The reason for this behavior requires some historical context. Originally, the standalone NES model’s suggestions could arrive asynchronously as the user moved their cursor, whereas the standalone completions model’s ghost text disappeared when the cursor moved away. As a result, the **ghost text from the standalone NES model was intentionally made persistent** so it could be shown as the user moved their cursor. However, because the 3-in-1 model identified itself to the client as an NES model, it **inherited this behavior** despite its ability to also provide completion-style ghost text at the cursor. By ablating this NES ghost text persistence behavior through a client setting, `nesMimicGhostTextBehavior`, we were able to revisit and change this behavior to make a choice that best fit the new model behavior. This underscores the **importance of experimenting with the feature end-to-end in the client**—new models have new behavior, which might warrant different client settings.

Beyond this ablation study, we also did **extensive testing to make the best client-side choices for the 3-in-1 model's edits**, including optimizations in edit caching, speculative decoding, how to render the edit to the user, and progressive reveal of longer edits. Through multiple rounds of internal dogfooding and A/B testing, we discovered that each of these client choices made a big impact on the user experience.

We evaluated five client-side optimizations as a joint configuration that resulted in the best end-to-end unified model experience:

1. **Speculative decoding**: The prior standalone NES model was already using speculative decoding to decrease suggestion latency, but the new unified model output format demanded a new prefix to condition the speculated text. We ablated several prefixes with progressively stronger guidance toward completion behavior: only the file path header (not specifying any line, the default used for the 2-in-1 models), replacing the current line (specifying the current line, but not a particular view kind), and completing the current line (specifying the current line and ghost text view kind). After conducting load testing, latency analysis, view kind distribution analysis, and online flights to compare each of these options, we chose to speculate completing the code at the current line, which had the lowest suggestion latency without negatively impacting the user experience.

2. **Ghost-text progressive reveal**: Progressive reveal shows the immediately relevant portion of a longer ghost text suggestion first, then progressively reveals the remainder. This prevents the user from navigating a long block of text while making incremental progress on their work. Progressive reveal of ghost text was a critical client feature that underwent several rounds of optimization for the original standalone completions models, and its functionality was extended later to the standalone NES models—we thus ported over this technique to the unified model client behavior.

3. **Diff-based edit rendering**: For the standalone NES models, the client would take parse the code in the rewritten window to determine the code diff and thus the corresponding view kinds to show the edits to the user. This was required because raw rewritten code had to be parsed to show a minimal edit to the user. However, for the unified models with diff patch output formats, we had a choice—should we display the view kinds implied by the raw patches themselves, or perform this diff-based rendering per-patch as well? Earlier, we found that the model may generate suboptimal-efficiency patches in exchange for better overall suggestion quality (see the discussion on patch validity in part one of this post). For instance, the model might produce the following patch:
   ```diff
   aquarium.py:2
   -cuttlefish
   +axolotl
   +blobfish
   +cuttlefish
   +dolphin
   ```

   If we used the raw patch, we would show a side-by-side “diff” view kind to the user, where cuttlefish is replaced by axolotol, blobfish, cuttlefish, and dolphin. However, if parsed, this could be optimized so that the user first sees this insertion ghost text:

   ```diff
   aquarium.py:2
   -cuttlefish
   +axolotl
   +blobfish
   +cuttlefish
   ```

   Followed by this insertion on a different line:

   ```diff
   aquarium.py:4
   -cuttlefish
   +cuttlefish
   +dolphin
   ```

   Thus, we hypothesized rendering might serve as another safeguard in case there were an even stronger way to present the edit to the user than what was implied by the model output. Through online A/B experimentation, we found this was indeed a positive change for the user experience. Thus, we first interpret each change in the patch and then present it through the appropriate rendered interaction (for example, ghost text, a nearby rewrite, a farther rewrite, a cross-file suggestion, or no suggestion), rather than rendering edits based on the model's raw patch structure.

4. **Cache delay and debounce settings**: Immediate presentation of suggestions can be disruptive when they arrive too quickly, which results in a worse user experience. A slight delay before presenting a cached suggestion better matches the developer's typing rhythm to help them stay in-flow, especially with the decreased suggestion latency from optimizing the speculative decoding. This setting was already in use, and we ablated several configurations of cache delay durations to arrive at a configuration tailored to the unified models. We did the same for debounce settings—whether to delay calling the model for a suggestion while the user is still typing—and found that immediate model invocation while the user was still typing did not result in a worse experience.

5. **Cross-mode ignored suggestion suppression**: As discussed above, this prevents ignored ghost text from immediately resurfacing as a next edit suggestion after the cursor moves. To the system, these may be different views, but to the developer, they are the same unwanted suggestion.

This work underscored a point that applies across interactive AI systems: ultimately, **a good model is just one component of a complex system**—UX, client logic, networking, and server-side logic, to name a few—and **all parts of that system must be designed with care and optimized intentionally** to create a great experience for the user. The end-to-end experience is the product.

## Takeaways and learnings

Folding completions into the unified model had a much higher development velocity **because it built directly on the 2-in-1 foundation**, showing how compounding learnings accelerate each strategic phase. A few lessons to call out:

1. **Build on successes.** The ghost-text length regression was resolved with the same playbook from Phase 1: Targeted longer-output data, upweighting, and a dedicated auxiliary grader gated to completeness. Identifying successful patterns and reusing them when appropriate was critical.
2. **The model is only one part of an end-to-end experience.** When changing the fundamental model behavior and the task formulation, some parts of the end-to-end system had to change as well. Some client behaviors were intentional choices optimized for the previous standalone NES model and needed to be revisited as the unified model took on completion behavior. Through careful experimentation, one such change—preventing ignored ghost text from resurfacing as NES suggestions—helped swing dismissal rate by 26%, from +15.9% to -10.1%.
3. **The beauty of unification.** The unified 3-in-1 model saw a 10.1% drop in dismissals during online experimentation with no key metric regressions, despite showing 13% less non-intrusive ghost text. One model deciding the end-to-end best edit beat orchestrating independent specialists, illustrating that the unified experience is greater than the sum of its parts.

Beyond the individual model results themselves, another broader lesson we learned is the value of **reflection and learning across the end-to-end system**.

From a science perspective, the 2-in-1 model took our team over **15 SFT training runs**, **170 RL training runs**, and **several times as many checkpoint-selection runs**, resulting in **14 A/B flight candidates** before the final shipping candidate. In contrast, the 3-in-1 model was developed using only RL on top of the 2-in-1 model, and it took us **only 35 RL training runs** and **10 A/B flight candidates**. Each modeling milestone has benefited from, built on, and been accelerated by our learnings in previous ones.

This iteration extended far beyond the model itself. Over the same period, the VS Code client team made **113 PRs improving and supporting the NES experience**, including the changes described earlier in this post. These spanned experimentation and configurability, model integration, prompting and context construction, serving and request orchestration, caching and rebasing, rendering and interaction, telemetry and observability, correctness and robustness, and the extensive ongoing work of keeping the experience running smoothly as it shipped to millions of users each week.

This is the reward of building the product as an end-to-end system: **the model and the surrounding experience evolved together, with learnings from each continually shaping the other**. The acceleration we see in the end-to-end system getting better at learning and improving is just as, if not more, exciting than any individual milestone itself.

![The learning loop between the model and the full end-to-end experience.](learning_loop.jpg)
_Figure 2. The learning loop between the model and the full end-to-end experience is a two-way street, and evaluation and reflection at every step benefits all components of the experience._

## Online results

We flighted the 3-in-1 model compared to the then-production baseline of the 2-in-1 model and completions model. We were excited to see a **10.1% decrease in dismissals** with the new unified model without statistically significant regressions in any key metrics, including accumulated retained characters. This was especially notable given that the proportion of **ghost text at the cursor decreased by 13%** compared to the control, adding nuance to our prior learnings that increasing the proportion of less intrusive ghost text lowered dismissal rates.

This underscores the benefit of a unified model. The model can choose the best edit for the given context, often more effectively than complex client logic that orchestrates independent models. We consider this to be a promising data point to show that the **unified experience can be greater than the sum of its parts**.

We are excited for you to try this unified system that treats inline editing as one continuum, from finishing the current line to carrying a change through the rest of the file.

## What’s next?

We hope you enjoyed this two-part deep dive into training the inline suggestions models (and in case you missed it, you can find part one here: [Building the new GitHub Copilot Inline Suggestions Model: Part One](https://code.visualstudio.com/blogs/2026/09/16/building-the-github-copilot-inline-suggestions-model-part-one)). Please also stay tuned for a more detailed technical report!

We are also working on expanding this model’s capabilities to make the code editing experience even more seamless and intuitive. This includes personalized model eagerness, which builds on our work in model quality by tailoring how proactively the model suggests edits to user preferences.

## Try it out

The unified Inline Suggestions experience is available now for paid GitHub Copilot users in VS Code. Update to the latest version of VS Code, then make sure [next edit suggestions are enabled](https://code.visualstudio.com/docs/editing/ai-powered-suggestions#_next-edit-suggestions).

Give it a try the next time you are in the editor, whether you're working on a refactor or writing a new function. We hope you enjoy the tab-tab-tab experience, and we'd love to hear your feedback!

In the second part of this blog post, we’ll dive deeper into how we moved to the 3-in-1 model for inline suggestions. Stay tuned!

Happy coding! 💙

## Acknowledgements

Special thanks to Luciana Abud, Alexandru Dima, Yu Hu, Simona Liao, Gaurav Mittal, Elsie Nallipogu, and Nick Trogh for their thoughtful feedback, insights, and contributions to this blog post.

We extend our deepest gratitude to our developer community for the ongoing feedback that pushes us to deliver the best possible experiences with VS Code and GitHub Copilot. Huge thanks to the researchers, engineers, product managers, and designers across GitHub and Microsoft who curated the training data, built the training pipeline, evaluation suites, and serving stack, and to the VS Code and GitHub Copilot teams for smooth model releases.
