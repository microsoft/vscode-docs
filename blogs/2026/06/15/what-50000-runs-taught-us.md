---
Order: 131
TOCTitle: 50,000 Runs, One Eval
PageTitle: "What 50,000 Runs of a 5-Line Eval Taught Us"
MetaDescription: See how one small VSC-Bench task detects infrastructure incidents and reveals how coding models calibrate their effort.
MetaSocialImage: 50000-runs-social.png
Date: 2026-06-15
Author: Julia Kasper
Keywords:
  - vsc-bench
  - evaluations
  - coding agents
  - github copilot
---

# What 50,000 Runs of a 5-Line Eval Taught Us

June 15, 2026 by VS Code Eval Team, [@code](https://x.com/code)

Our VS Code agent gets one instruction: add `HELLO` to `HELLO.txt`. There is no large codebase to understand, no test suite to debug, and no architectural decision to make. The task looks almost too simple to be useful.

We ran it more than 50,000 times. At that scale, a small file-editing task becomes a practical way for us to study agent execution behavior: how reliably agents complete work, where runs differ, and what kinds of failures appear in practice.

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

Every run starts in the same empty workspace, with the same tools and the same fixed prompt, using our VS Code agent harness in chat mode. Because `say_hello` runs as a smoke test before every benchmark suite, it quietly accumulated 50,974 runs across 30 models over six months. What started as a throwaway sanity check became a mirror for how differently models approach even the simplest work.

## How models solve `say_hello`

As expected, `say_hello` almost always passes. The more interesting signal is *how* each model gets there: whether it recognizes that a simple request needs only a simple path.

### The expected path

A human doing this task would recognize that the workspace is empty, create `HELLO.txt`, and add the requested content. In the most direct VS Code agent path, that translates to one editor-oriented tool call: `create_file` with `HELLO` as the file content.

```yaml
tool : create_file
args : {
  "filePath": "/path/to/workspace/HELLO.txt",
  "content": "HELLO"
}
```

> **Note:** Our eval harness includes workspace state in the initial prompt context, so we do not expect the model to double-check the workspace unless the task requires it.

To establish a baseline, we filtered for passing runs that used this one-tool-call path and looked at the lowest output-token counts in that group. Those runs averaged roughly 50 output tokens, including the tool-call structure. We then measured how often each model took that path:

![Percentage of passing runs where the model achieves the one-tool-call direct path.](passing-rate.png)

No model takes the direct path every time. Model-A does it most often, at 71% of passing runs, and usually goes straight to file creation when it succeeds. The next group is clustered much lower: Model-B through Model-E land between 32% and 35%, often adding a small step first, such as reading internal state or doing light workspace exploration. Model-F through Model-I range from 19% to 27%, and more often plan or explore before creating the file.

After that, the drop is steep. Model-J takes the direct path in only 6% of passing runs, and usually lists the directory first. Model-K reaches it in 2%, typically after exploring the workspace and searching. Model-L and Model-M are both below 1%, which means they almost always do extra work before producing the same five-character file.

Four models never take the direct path across thousands of passing runs. Model-N, Model-O, Model-P, and Model-Q always add something else before creating the file: one plans first, one chooses a patch tool instead of simple file creation, one searches and plans every time, and one narrates at length before acting.

All models create the file with the right content, but they reach the same outcome with very different amounts of work. Even on a task with almost no ambiguity, some models still plan, search, or choose a more complex editing tool. They all pass the eval, but they do not use the same amount of effort to pass it.

### How models spend their overhead

Because our offline eval harness captures the complete tool-call sequence, we can turn those traces into model behavior patterns. Across runs, models tend to spend their extra effort in a few familiar ways:

| Overhead pattern | Frequency | Representative models | What happens |
| --- | ---: | --- | --- |
| Planning before acting | 84-99% | Model-H, Model-J, Model-G | Drafts a checklist or reads internal state before creating a 5-character file. Model-H does this in 99% of runs. On one occasion, four planning steps in a single run for a one-step task. |
| Exploring an empty workspace | 56-96% | Model-K, Model-F, Model-I | Lists directories or searches for files in an empty workspace. Model-I does both in 56% of runs, looking for clues in an empty room. |
| Using the wrong tool for the job | About 95% | Model-I | Uses a complex patch/edit tool (designed for modifying existing files) instead of simple file creation. Like using a CNC machine to cut a piece of paper. |
| Running a terminal command | 3-14% | Model-L, Model-J, Model-M | Runs a terminal command (echo HELLO > HELLO.txt) when a simpler file-creation API is available. |

These are not correctness failures. They are signs that the model does not consistently recognize when the shortest path is enough. On longer tasks, planning and exploration can be valuable. On a one-step task, they add latency and cost without improving the result.

### The cost of overthinking

That extra work appears directly in output token usage. About 50 output tokens is a realistic floor for this task. The selected models range from nearly that floor to thousands of tokens for the same five-character result.

![Average output tokens per run vary from near the ideal floor to thousands of tokens for the same HELLO.txt task.](token-consumption.png)

The chart falls into four clear bands. The extreme group is a single outlier: Model-Q averages 3,676 output tokens, or 74 times more than the realistic floor, for the same five-character result. The high-overhead group, from 400 to 1,000 tokens, includes Model-O, Model-H, Model-E, Model-M, Model-B, and Model-K. These models are not in the thousands, but they still spend roughly 9x to 12x the realistic floor.

The moderate group, from 150 to 400 tokens, includes Model-L, Model-D, Model-P, Model-N, Model-C, Model-F, and Model-J. They add overhead, but stay far closer to the task's natural size. The efficient group is below 150 tokens: Model-I, Model-A, and Model-G. Model-G comes closest to our realistic floor at 55 tokens, showing that a model can complete the task with very little extra narration even when it does not always take the direct tool path.

### Model size does not predict overhead

Our first hypothesis was that larger models overthink more. Our data contradicts this:

* Model-C (a larger model) uses 160 output tokens on average and 2.1 tool calls. The most disciplined model in its family.
* Model-E (a smaller model from the same family) uses 476 output tokens on average and 3.7 tool calls. More overhead than its larger sibling.
* Model-N (a "mini" model) is the single highest-overhead model at 3,676 output tokens on average. The smallest model in this sample does the most work.

Our read is that newer generations within each family trend more disciplined, regardless of parameter count. It points to training maturity: how well a model scales its effort to the task in front of it. And that calibration isn't an academic curiosity. It shows up directly on the bill.

## Where do we go from here?

We wanted to share a few key insights our team took from these runs, and a few learnings you might be able to apply to your own day-to-day flow.

> **Note:** `say_hello` gave us great insights, but it represents only one task. For harness optimization, we avoid optimizing too narrowly around a single task. We still run the full benchmark regularly across a diverse task set to validate whether changes improve our harness broadly.

### Match the model to your task

With [usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), output tokens represent both money and time. The difference between the leanest and heaviest model on this task is roughly 70× for identical output. The obvious lesson would be "don't reach for the biggest model to write HELLO." But that lesson is too blunt, and seeing why is the most useful thing `say_hello` taught us.

There is an important limit to this result. `say_hello` is a short-horizon task with one step and one correct answer. On long-horizon work, planning, exploration, and reasoning can prevent expensive mistakes and improve the odds of finishing. The goal is not to eliminate planning. It is to understand whether a model can tell the difference between a one-step task and a 30-step task.

That is one reason why we think model selection should not become the developer's burden. Signals like effort calibration, token efficiency, and tool discipline can help automatic model routing pick the right model for the task at hand without asking developers to reason about every tradeoff.We continue to invest in and research [automatic model selection in VS Code](https://code.visualstudio.com/blogs/2025/09/15/autoModelSelection), so the product can make more of these choices for you over time.

### Start small, measure well

Most teams do not start with a private offline benchmark suite they can run every day. Even a simple task, run consistently and logged well, can reveal useful changes in model or system behavior.

Start with the smallest task that has an unambiguous correct answer. Then run it constantly: use it as a preflight check before nightly evals, model onboarding, and infrastructure changes. The task does not need to be clever; it needs to be stable enough that changes in pass rate, latency, tool use, or failure mode mean something.

The important part is to capture enough structure to explain what changed. Record the tool-call sequence, not just the count. Knowing there were 4 tool calls is useful, but incomplete. Knowing that the model planned, explored, searched, and then created the file tells you where the overhead came from and why the run cost more.

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

## From smoke test to signal

The surprising part of `say_hello` was not that models could write `HELLO.txt`. It was that a five-character edit made effort visible: which models scaled down, which kept planning or searching, and which system failures only appeared after thousands of runs.

Try the same request with your preferred model in VS Code, inspect its tool calls in the [Chat Debug View](https://code.visualstudio.com/docs/chat/chat-debug-view), and consider what your own smallest useful task might be. Share what you find in the [VS Code repository](https://github.com/microsoft/vscode).

Happy coding! 💙
