---
Order: 126
TOCTitle: Long Distance NES
PageTitle: "Long Distance Next Edit Suggestions: How We Extended NES Across Your Entire File"
MetaDescription: Learn how we extended next edit suggestions to work across your entire file, reducing friction and improving productivity in GitHub Copilot.
MetaSocialImage: long-distance-nes-hero.png
Date: 2026-02-09
Author: TODO
---

# Long Distance Next Edit Suggestions: How We Extended NES Across Your Entire File

February 9, 2026 by [TODO](https://github.com/TODO)

## Introduction

On the GitHub Copilot team, we use the features we build every day. This tight feedback loop allows us to quickly identify bugs, uncover missing capabilities, and spot areas where we can further reduce friction for developers.

Last February, we released next edit suggestions (NES) in GitHub Copilot. NES extends ghost text (aka code autocomplete) by suggesting edits near the current cursor position, rather than only inserting text at the cursor. By operating within a small window around the cursor (−2 to +5 lines), NES can propose contextually relevant edits without requiring you to manually select the exact edit location.

<!-- TODO: Add NES screenshot and completions reference image -->

---

## Long Distance NES

While NES significantly improves local code editing, it is limited to edits near the current cursor position. When the desired change is located elsewhere in the file, you still need to navigate to that location before receiving a relevant suggestion.

To reduce this friction, we began exploring long-distance next edit suggestions, which extend NES-style edits to arbitrary locations throughout the file. Instead of requiring you to move the cursor, the system proactively identifies promising edit locations anywhere in the document and surfaces those opportunities directly.

Our initial approach was to leave the edit model unchanged and train a new model whose sole responsibility is to propose good locations for potential edits. This separation allows each model to specialize and perform its task effectively and allows the NES model team to continue development.

---

## Evaluation Dataset

One of the first steps we take before training a new model is to build an evaluation set that mirrors how the model will be realistically used for development. To do that, we first tried to understand how developers chain together multiple edits rather than having one-off edits. Some of the use cases we saw were:

- Renaming variables, functions, or classes
- Modifying function signatures
- Updating documentation

Based on this, we built a dataset capturing relevant information for these multi-edit scenarios, such as ground truth for the next line to jump to, mouse position, and recent edits.

From the ground truth next lines, we had a significant number of samples leading to another line (for example, another instance of a variable to be renamed) and a relatively small portion requiring the model to predict the current line (that is, not jumping yet). We found this dataset to be representative of real cursor movements during development and well suited for evaluation.

---

## Training Dataset

While the evaluation dataset was small enough to construct by hand, training a model required data at a much larger scale. To start, we reused data from our special data curation effort detailed in our earlier post on training NES. This dataset contains trajectories of how a developer moves and makes edits through a file.

By replaying these trajectories, we can transform every cursor movement into a training sample. After applying filters—such as ensuring the jump location appeared in the prompt—we constructed our training dataset.

---

## Training with Supervised Finetuning

To train the model, we used Supervised Finetuning (SFT) with two different hyperparameter search strategies.

First, we tried Bayesian Optimization, a technique designed to optimize black-box functions that are expensive to evaluate. In this case, the “function” is a model that must be trained from scratch, making evaluation costly in terms of hardware. Despite strong theoretical results and multiple iterations, this approach did not yield strong performance improvements.

Next, we tried a simple grid search, compiling a list of values for each hyperparameter and training a model for each combination. By centering the grid around the hyperparameters used by the main NES model, we were able to keep the search space tight. This approach produced our best-performing model candidate.

---

## Bridging model capability and user experience

Extending the range of NES fundamentally changed what the system could do. However, unlocking that capability required rethinking how suggestions are surfaced to you. A better model alone is not enough if you never notice or trust the suggestions it produces.

---

## UX for out-of-viewport suggestions

Extending NES requires continuously balancing three competing concerns: keeping suggestions small, making them easy to read, and minimizing how much of your code we cover. This balance becomes especially important when suggestions live outside your current viewport.

Historically, next edit suggestions appeared close to the cursor and almost always within view, making them naturally discoverable while you were already focused on that part of the file. With long-distance NES, however, the most relevant next edit can be far from your current focus. While this unlocks new capabilities, it also introduces a risk: suggestions can easily go unnoticed or become distracting if surfaced poorly.

To address this, we optimized for minimal disruption. Rather than rendering large diffs inline or forcing attention shifts, we designed a compact widget that appears near your cursor and prefers empty space when available. The widget adapts to the surrounding editor layout, shrinking or expanding to fit naturally into whitespace such as at the end of a line or between blocks of code. This reflects a deliberate tradeoff: we sacrifice some vertical compactness to preserve clarity, while avoiding unnecessary overlap with source text.

Because the full edit may be far away and potentially large, the widget does not attempt to render the entire suggestion. Instead, it provides a lightweight preview—an excerpt from one of the affected lines, rendered with diff-style highlighting. This gives you enough context to quickly assess relevance without interrupting your editing flow or covering large portions of code.

If the preview looks useful, you can explicitly choose to jump to the suggested location and review or apply the full edit there. If not, you can continue editing uninterrupted.

<!-- TODO: Add resizing video here -->

---

## Internal Testing

Before releasing any feature to the public, we always test it internally. After gathering feedback, we decide whether to revisit the model-building process or continue forward.

While we liked many of the suggestions produced by the first model, we also noticed a problem: too many jumps. As important as it is for the model to predict good jump locations, it must also learn when not to jump. Even good suggestions can become distracting if they appear too often.

To address this, we added a small set of samples to the evaluation dataset where the correct “jump location” is the current line (that is, “no jump”). These cases included situations where only half a class name had been typed and jumping elsewhere would not make sense. Evaluating the model with this new stratification revealed what the initial evaluation missed: “no jump” accuracy was significantly lower than “jump” accuracy.

We traced this issue back to the training data curation pipeline, which had filtered out too many “no jump” samples. After reintroducing more of these cases, both jump and no-jump accuracy improved significantly, and the updated model received more positive dogfooding feedback.

---

## Online Flighting

Before shipping long-distance NES, we validated the feature through online A/B flights comparing the new experience against standard NES. Our goal was to understand not just whether the feature was discoverable, but whether it meaningfully improved real editing behavior.

The initial results were strongly positive. With long-distance edits enabled, we observed a 23% increase in code written via NES, along with improvements across several other engagement and acceptance metrics.

At the same time, the flights surfaced an important limitation. While expanded capabilities were beneficial, far-away suggestions were rejected more often than standard NES suggestions. Some of this was expected due to a new UI pattern and a broader class of edits, but it also highlighted room for improvement in how selective and well-timed these suggestions were.

Rather than treating this as a UX adoption problem alone, we used these signals to guide the next iteration of the model, focusing on reducing unnecessary jumps while preserving productivity gains.

---

## Reinforcement Learning Training Stage

While the supervised model performed well, internal testing and early flights revealed a clear gap: the model was still too eager to suggest jumps. Even when individual predictions were reasonable, suggesting a jump at the wrong moment could break flow and reduce trust. Teaching the model when not to jump turned out to be just as important as teaching it where to jump.

To address this, we added a reinforcement learning stage using Reinforcement Learning with Verified Rewards (RLVR), guided by a simple grading signal based on how close the predicted jump location was to where the cursor was actually moved. Predictions that landed closer to the eventual edit location were rewarded more highly, while less relevant jumps were penalized. This allowed the model to learn directly from realistic editing behavior without requiring manual annotations or new UX instrumentation.

This additional training stage helped the model better balance precision and restraint. Compared to the previous version, the new model achieved higher offline scores and showed consistent improvements in online performance, including increased code written via NES and lower rejection rates. Based on these results, we began shipping the updated model the following month.

---

## What's next?

Looking ahead, we plan to extend this work by incorporating cross-file cursor jump suggestions, enabling the model to reason beyond the current file. We also aim to explore a unified model that jointly predicts both the location of the next edit and the edit itself, allowing for tighter coupling between cursor movement and code generation and potentially improving overall suggestion relevance and user experience.

## Try It Out

Long-distance next edit suggestions are available now in [VS Code](https://code.visualstudio.com/) for users with a [GitHub Copilot](https://github.com/features/copilot) subscription. Give it a try the next time you're doing refactoring work—renaming variables, updating function signatures, or making changes that ripple through your file. We'd love to hear your feedback!

Happy coding! 💙
