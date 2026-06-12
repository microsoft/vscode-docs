---
Order: 131
TOCTitle: 50,000 Runs, One Eval
PageTitle: "What 50,000 Runs of a 5-Line Eval Taught Us"
MetaDescription: See how one small VSC-Bench task detects infrastructure incidents and reveals how coding models calibrate their effort.
MetaSocialImage: 50000-runs-social.png
Date: 2026-06-15
Author: Karthik Nadig
Keywords:
  - vsc-bench
  - evaluations
  - coding agents
  - github copilot
---

# What 50,000 Runs of a 5-Line Eval Taught Us

June 15, 2026 by VS Code Eval Team, [@code](https://x.com/code)

Our VS Code agent gets one instruction: add `HELLO` to `HELLO.txt`. There is no large codebase to understand, no test suite to debug, and no architectural decision to make. The task looks almost too simple to be useful.

We ran it more than 50,000 times. It became our most useful distributed systems probe, and an accidental mirror for model behavior.

In our [previous post](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode), we introduced VSC-Bench, the offline evaluation suite we use to measure agent behavior in VS Code. This blog post focuses on the simplest test case and what it revealed to us at scale.

## The five-line eval

The `say_hello` task simply asks the agent "Add HELLO to HELLO.txt"

```yaml
promptSteps:
  - text: Add HELLO to HELLO.txt.
    assertions:
        - check: file_exists("HELLO.txt")
        - check: file_contains("HELLO.txt", "HELLO")

```

Every run starts in the same empty workspace, with the same tools and the same fixed prompt, using our VS Code agent harness in chat mode. Because `say_hello` runs as a smoke test before every benchmark suite, it quietly accumulated 50,974 runs across 30 models over six months. What started as a throwaway sanity check became a mirror for how differently models approach even the simplest work, and one of our most reliable alarms for infrastructure failures.

## The model behavior

As expected, `say_hello` almost always passes. The more interesting signal is *how* each model gets there: whether it recognizes that a simple request needs only a simple path.

### The direct path

The most direct path requires only 1 tool call to create the file with the requested content. A useful response needs about 50 output tokens, including the tool-call structure. Anything beyond that is overhead for this task.

> **Note:** In the following graphs, model names are anonymized using nature-themed codenames, and vendor families are shuffled across categories. Failure categories are stamped at write-time by the harness, not retroactively classified. Tables below show representative models chosen to illustrate behavioral range, not the full set.

We measured the share of passing runs in which each model took that one-tool-call path:

![Percentage of passing runs where the model achieves the one-tool-call direct path.](passing-rate.png)

| Model | Passing run count | Direct path % | What it does instead |
| --- | ---: | ---: | --- |
| Falcon | 4,210 | 40% | Often adds one planning step before creating. |
| Hawk | 3,890 | 28% | Like Falcon, slightly more exploration. |
| Danube | 5,120 | 27% | Occasionally reads internal state first. |
| Thames | 2,015 | 28% | Clean. Rarely explores. |
| Loire | 1,840 | 15% | Explores the workspace 38% of the time. |
| Cheetah | 1,450 | 9% | Lists the directory first in 91% of runs. |
| Fuji | 2,300 | 2% | Explores workspace, searches, then creates. |
| Kilimanjaro | 832 | 0% | Never. Not once. Always plans first. |
| Everest | 1,950 | 0% | Never. Uses a patch tool instead of file creation. |
| Amazon | 1,180 | 0% | Searches and plans every single time. |


No model takes the direct path every time. Three models never even take it across thousands of passing runs. They all produce the right file, but they reach the same destination with very different amounts of work. Even on a task with almost no ambiguity, some models still plan, search, or choose a more complex editing tool. They all produce the right file, but they do not spend the same amount of work to get there.

### How models spend their overhead

Because our offline eval harness captures the complete tool-call sequence, we can see where each model spends its extra effort. The patterns fall into a few recurring categories:

| Overhead pattern | Representative models | Frequency | What happens |
| --- | --- | ---: | --- |
| Planning before acting | Kilimanjaro, Amazon, Fuji | 84-99% | Drafts a checklist or reads internal state before creating a 5-character file. Kilimanjaro does this in 99% of runs. On one occasion, four planning steps in a single run for a one-step task. |
| Exploring an empty workspace | Rainier, Cheetah, Everest | 56-96% | Lists directories or searches for files in an empty workspace. Everest does both in 56% of runs, looking for clues in an empty room. |
| Using the wrong tool for the job | Everest | About 95% | Uses a complex patch/edit tool (designed for modifying existing files) instead of simple file creation. Like using a CNC machine to cut a piece of paper. |
| Running a terminal command | Eagle, Amazon, Denali | 3-14% | Runs a terminal command (echo HELLO > HELLO.txt) when a simpler file-creation API is available. |

These are not correctness failures. They are signs that the model does not consistently recognize when the shortest path is enough. On longer tasks, planning and exploration can be valuable. On a one-step task with one unambiguous answer, they add latency and cost without improving the result.

### The cost of overthinking

That extra work appears directly in output token usage. About 50 output tokens is a realistic floor for this task. The selected models range from nearly that floor to thousands of tokens for the same five-character result.

![Average output tokens per run vary from near the ideal floor to thousands of tokens for the same HELLO.txt task.](token-consumption.png)

| Model | Average output tokens | Overhead compared with the 50-token floor |
| --- | ---: | ---: |
| Vesuvius | 3,676 | 74x |
| Elbrus | 2,120 | 42x |
| Etna | 1,441 | 29x |
| Everest | 617 | 12x |
| Seine | 519 | 10x |
| Denali | 451 | 9x |
| Danube | 160 | 3x |
| Rushmore | 102 | 2x |
| Hawk | 55 | About 1x |

Vesuvius produces 74 times more output than the realistic floor. It narrates its reasoning and confirms its understanding, all to create a five-character file. In total contrast, Hawk stays close to the minimum even when it does not take the direct tool path.

### Model size does not predict overhead

Our first hypothesis was that larger models overthink more. Our data contradicts this:

* Danube (a larger model) uses 160 output tokens on average and 2.1 tool calls. The most disciplined model in its family.
* Loire (a smaller model from the same family) uses 476 output tokens on average and 3.7 tool calls. More overhead than its larger sibling.
* Vesuvius (a "mini" model) is the single highest-overhead model at 3,676 output tokens on average. The smallest model in this sample does the most work.

Our read is that newer generations within each family trend more disciplined, regardless of parameter count. It points to training maturity: how well a model scales its effort to the task in front of it. And that calibration isn't an academic curiosity. It shows up directly on the bill.

### Match the model to your task

With [usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), output tokens represent both money and time. The difference between the leanest and heaviest model on this task is roughly 70× for identical output. The obvious lesson would be "don't reach for the biggest model to write HELLO." But that lesson is too blunt, and seeing why is the most useful thing say_hello taught us.

There is an important limit to this result. `say_hello` is a short-horizon task with one step and one correct answer. On long-horizon work, planning, exploration, and reasoning can prevent expensive mistakes and improve the odds of finishing. The goal is not to eliminate planning. It is to understand whether a model can tell the difference between a one-step task and a 30-step task.

That is one reason why we think model selection should not become the developer's burden. Signals like effort calibration, token efficiency, and tool discipline can help automatic model routing pick the right model for the task at hand without asking developers to reason about every tradeoff.

## The canary

The same 5-line eval also became our most reliable infrastructure alarm. The clue was a model that kept vanishing from our platform. Run the test five times by hand and it passed every time; run it 300 times in a day and it failed on roughly 2% of runs. At human scale, the glitch was invisible. At benchmark scale, it was an obvious signal, and it led us to a real fix for a race condition nobody had noticed.

It was not a one-off. The same test kept surfacing platform problems that nobody expected:

* **A policy change with a side effect:** Someone updated an access policy, and a model that should have stayed available quietly dropped off. The policy team did not know. We did, because `say_hello` started returning routing errors for that model within minutes.
* **An auth regression nobody had reported:** Bring-your-own-key models began failing authentication before a single customer noticed. `say_hello` caught it because it runs across every supported authentication path.
* **Outages, caught before they cost anything:** We spotted a service degradation before launching expensive full-scale evaluation runs. The price of catching it early was one trivial benchmark; the price of missing it was hundreds of compute-hours spent against a broken pipeline.

### The numbers behind the stories

say_hello passes about 93% of the time, and when it fails it is almost never the model's fault. Across roughly 56,000 runs spanning about six months, fewer than 4,200 failed — a median day clears 94.6%, and 86 of 191 days finish at or above 95%. The table below breaks the failures down by cause. Every percentage is a share of failures, not of all runs, so a category at 29% is still a sliver of everything we ran.

| Category | % of failures | What it means |
| --- | --- | --- |
| Chat / API flakes | 29% | Upstream chat service intermittently drops requests |
| Model routing errors | 22% | Model configured but not reachable |
| Generic harness errors | 21% | The test harness itself crashed or errored out |
| Dependency outages | 8% | An upstream service went down |
| Chat / UI errors | 7% | Extension or widget crashes |
| Rate limits / quota | 6% | Quota exhaustion under concurrent load |
| Harness export / parsing | 4% | The harness couldn't capture or read back the result |
| Agent timeout | 2% | The model kept thinking past the time limit |
| Other infra | 2% | Auth, network, extension activation, and the like |
| **Wrong answer from the model** | **0%** | Not once in 56,000 runs did a model fail to write HELLO |


![Every run in context. About 92.5% pass; the small slice that fails is almost entirely infrastructure, and none of it is the model getting the answer wrong.](failure-share.png)

Put another way, 97% of those rare failures trace to infrastructure rather than the model. And because every failure is categorized the moment it happens, the daily timeline reads like a heartbeat: each dip is an incident we could name and fix.

![Daily pass rate for say_hello showing critical and moderate infrastructure incidents from December 2025 through June 2026.](daily-pass-rate.png)

If your simplest benchmark fails, you almost certainly have an infrastructure problem. If only your hard benchmarks fail, you likely have a model problem. The gap between them is your diagnostic.

## Build your own canary

The lesson is not tied to our harness. It is that a trivial task becomes a diagnostic tool when you capture structure instead of just pass or fail rates. Two things will lead to success:

### 1. Pick your simplest task. Run it constantly.

Start with three simple rules:

* Choose a task with an unambiguous correct answer, something you would trust a junior engineer to verify in two seconds.

* Use it as a cheap preflight check before nightly evals, new model onboarding, and infrastructure changes.

* **Alert on change, not failure.** A 93% pass rate might be fine. A 93% pass rate that was 98% yesterday is an incident.

The task does not need to be clever. What matters is volume and consistency.

> **Note:** But how many runs are enough? At 100 runs per day, a five-percentage-point drop is detectable within two days. At 50 runs per day, give it a week. The key is to run enough that a regression exceeds normal variance, then alert when it does.
>


### 2. Record the right things.

The difference between a smoke test and a diagnostic tool is what your harness captures.

**Record tool-call sequences, not just counts.**

Knowing "4 tool calls" tells you nothing. Knowing the model planned, explored, searched, and then did the work tells you where effort is being wasted. The sequence reveals the decision-making pattern. Without it, you would know "some models cost more" but never know why.

```jsonc
// What most harnesses log:
{ "tool_calls": 4, "pass": true }

// What you actually need:
{
  "tool_sequence": ["plan", "list_directory", "search_files", "create_file"],
  "output_tokens": 617,
  "pass": true
}
```

**Categorize errors at write-time, not analysis-time.**

When a failure happens, stamp it immediately with a failure category: rate limit, routing error, model timeout, or auth failure.

If you wait until analysis to categorize, you're doing archaeology on logs. If you stamp at write-time, every drop on your timeline graph is instantly attributable. You'll know within minutes whether a pass-rate drop is "the model got worse" or "someone rotated a certificate."

```jsonc
// Stamp at failure time, before you need to analyze:
{
  "pass": false,
  "error_category": "infra/routing", // one of about 6-8 categories
  "error_detail": "model_not_reachable",
  "model": "falcon",
  "timestamp": "2026-03-14T08:23:00Z"
}
```

Our taxonomy has eight categories. Yours might need four. The number does not matter. What matters is that every failure is classified before you need to query it.

**Capture editor-level events, not just agent outputs.**

Our harness records everything that happens in the editor: files created, diffs applied, terminal commands executed, extensions activated, and UI interactions, all captured alongside the agent trajectory. This means we can answer questions the agent never surfaces: "Did the file actually get written to disk?" "What was the diff between what the model intended and what landed?" "Did an extension crash silently?" The agent's self-report is one signal. The editor's ground truth is another. Capture both.

| Without structured capture | With structured capture |
| --- | --- |
| "It failed." | "It failed because model routing broke at 3 AM." |
| "It is slow." | "It is slow because the model explores an empty workspace." |
| "It costs too much." | "It costs 74x more than necessary due to unnecessary planning." |
| "Something changed." | "Pass rate dropped five points, all from rate-limit errors, correlated with a new deployment." |

## The punchline

Fifty thousand runs of the simplest possible benchmark told us which models overthink a trivial task, which infrastructure bugs only surface at statistical scale, and which outages to catch before they burn expensive compute. None of that value lived in the benchmark itself. It lived in the repetition, and in measuring *how* the work got done rather than just whether it succeeded.

The same signal that tells us the platform is healthy also tells us which model to reach for, and we are working to bake that judgment into the product so you never have to make the call yourself. The hardest part was convincing ourselves that five lines were worth running.

Try the same request with your preferred model in VS Code, inspect its tool calls in the [Chat Debug View](https://code.visualstudio.com/docs/chat/chat-debug-view), and consider what your own smallest useful canary might be. Share what you find in the [VS Code repository](https://github.com/microsoft/vscode).

Happy coding! 💙
