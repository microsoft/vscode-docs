---
Order: 134
TOCTitle: GPT-5.5 Prompt Tuning
PageTitle: "How Prompt Tuning Improved GPT-5.5 in VS Code"
MetaDescription: Learn how VS Code works with model providers to tune agent prompts, improve token efficiency, and validate changes with experiments.
MetaSocialImage: gpt55-prompt-recommendations-social.png
Date: 2026-07-06
Author: VS Code Team
Keywords:
  - github copilot
  - coding agents
  - model providers
  - prompt engineering
  - evaluations
---

# How Prompt Tuning Improved GPT-5.5 in VS Code

July 6, 2026 by VS Code Team, [@code](https://x.com/code)

In our [previous post](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode), we introduced the VS Code coding harness: the system around the model that gives it tools, context, instructions, validation loops, and the ability to make changes in a real developer workspace.

This post looks at how we improve that harness with model providers. We work closely with providers to understand how their models respond to our tools and instructions, turn insights from their research teams into concrete changes, and validate those changes before rolling them out broadly.

A recent collaboration with OpenAI for `GPT-5.5` shows what that looks like in practice. Based on their model research and our harness data, we tested small prompt changes that helped the agent explore less, validate sooner, use fewer tokens, and respond faster.

## From prompt changes to experiment setup

After the launch of `GPT-5.5`, we felt the model's token efficiency inside the VS Code agent harness could be improved further, in line with our broader efforts described in [Improving token efficiency in GitHub Copilot](https://code.visualstudio.com/blogs/2026/06/17/improving-token-efficiency-in-github-copilot/). We dug into the harness to understand where the model was spending tokens and where it was over-exploring before acting.

After testing different hypotheses and running offline evaluations, we identified two system-prompt updates worth testing with live data. Both changes looked like they could improve token efficiency without disrupting model quality. On that basis, we introduced two variants of the `GPT-5.5` system prompt.

In the following sections, we explain the control group and the two prompt treatment groups we tested with live `GPT-5.5` traffic.

### Treatment A: economical search and edit

Treatment A tested whether a small, targeted prompt reminder could reduce unnecessary exploration. The problem we wanted to solve was simple: agents can spend too much time searching, rereading, or comparing nearby paths before making a useful edit. The `<economical_search_and_edit>` section told the agent to **start from a concrete anchor, gather only enough local context, avoid broad exploration, act once there is a cheap discriminating check, and avoid rereading unchanged context.**

Complete implementation details are in [`gpt55BasePrompt.tsx`](https://github.com/microsoft/vscode/blob/56d74126ee02bf1104e813bf4a41f10e90b2119c/extensions/copilot/src/extension/prompts/node/agent/openai/gpt55BasePrompt.tsx#L172-L178):

```tsx
{economicalSearchAndEditEnabled && <Tag name='economical_search_and_edit'>
    - Start from the most concrete available anchor: a file, symbol, failing behavior, failing command, or nearby implementation surface.<br />
    - Gather only enough nearby context to choose one plausible local hypothesis and one cheap check that could disconfirm it.<br />
    - Prefer one targeted search or nearby read over broad repo exploration.<br />
    - Once the cheapest discriminating check is known, act.<br />
    - Do not re-read unchanged context unless a new result makes it relevant.<br />
</Tag>}
```

### Treatment B: large prompt sections

Treatment B tested a broader version of the same idea. Instead of adding one compact reminder about economical search, it reorganized the agent workflow into explicit `<Before_the_first_edit>` and `<After_the_first_edit>` sections. The goal was to solve the full loop, not just the search step: **form a local hypothesis before editing**, **avoid broad exploration**, **make a grounded first edit**, and **validate immediately after the first substantive edit**.

Complete implementation details are in [`gpt55BasePrompt.tsx`](https://github.com/microsoft/vscode/blob/56d74126ee02bf1104e813bf4a41f10e90b2119c/extensions/copilot/src/extension/prompts/node/agent/openai/gpt55BasePrompt.tsx#L33-L62):

```tsx
{largePromptSectionsEnabled && <>
    <Tag name='Before_the_first_edit'>
        - Start from the most concrete anchor available: a file, symbol, failing behavior, failing command, test, or nearby implementation surface. If the request does not name one explicitly, use the first targeted search or nearby read to identify that anchor, then continue locally from there.<br />
        - Before the first edit, gather only enough nearby evidence to state one falsifiable local hypothesis about how the requested behavior should work or why it is failing, and one cheap check that could disconfirm it.<br />
        [...]
        - Once you can state one falsifiable local hypothesis, the nearby code path it depends on, one cheap check that could disconfirm it, and one small edit that would test it, the next action must be a grounded edit.<br />
		- If confidence is incomplete, the first edit may be a small reversible probe that exposes missing types, behavior mismatches, control-flow gaps, or validation failures.<br />
        - If you find yourself still searching after that local-routing budget, treat that as drift. Recover by choosing the best current hypothesis and the best available nearby check, then make the smallest plausible edit that will let that check discriminate.<br />
    </Tag>
    <Tag name='After_the_first_edit'>
        - Prefer this order for that first validation action:<br />
		- the cheapest behavior-scoped or failing check that can falsify the current hypothesis<br />
		- a narrow test for the touched slice<br />
		- a narrow compile, lint, or typecheck command for the touched slice<br />
        [...]
        - Finish with at least one post-edit executable validation step whenever the environment provides one. Only fall back to diff-only validation when no focused command exists or commands are unavailable.<br />
    </Tag>
</>}
```

Both treatments came from the same idea: the model should spend less effort wandering and more effort moving through a deliberate loop of evidence, action, and validation. We ran the experiment in VS Code over a two-week window and split `GPT-5.5` agent traffic across two treatment groups and one control group with a 25/25/25 split.

### Experiment setup

| Group | Variant name | Description | Traffic allocation |
| --- | --- | --- | ---: |
| Control | `PRPT_CTRL` | Current default prompt | 25% |
| Treatment A | `PRPT_SRCH` | EconomicalSearchAndEdit: more economical search and edit prompting | 25% |
| Treatment B | `PRPT_LRG` | LargePromptSections: larger, restructured prompt sections | 25% |

> **Note:** The allocations add up to 75% because the experiment scorecard compares evenly sized groups. The remaining `GPT-5.5` traffic continued to use the default prompt outside this scorecard slice, so we could compare the treatments and control across the same kind of user traffic.

## What the two-week scorecard showed

The two-week scorecard showed that LargePromptSections was the stronger treatment. It did make the system prompt larger, but the right instructions helped the agent save more tokens elsewhere: it improved latency, reduced upper-tail token usage, and reduced tool-call volume while quality, engagement, and reliability guardrails stayed healthy.

<!-- TODO: Add screenshot of the two-week GPT-5.5 agent scorecard here. Suggested filename: gpt55_prompt_recommendations_latency_2week.png. -->

Signal legend: <span style="color: #107c10;">●</span> favorable and highly significant (p < 0.001), <span style="color: #107c10;">○</span> favorable and statistically significant (p < 0.05), <span style="color: #d13438;">●</span> unfavorable and highly significant, <span style="color: #d13438;">○</span> unfavorable and statistically significant, `-` not statistically significant.

| Metric | Control (`PRPT_CTRL`) | Treatment A (`PRPT_SRCH`) | Delta % | P-value | Signal | Treatment B (`PRPT_LRG`) | Delta % | P-value | Signal |
| --- | ---: | ---: | ---: | ---: | :---: | ---: | ---: | ---: | :---: |
| 10-minute survival rate (by user) | 91.54% | 91.17% | -0.40% | 0.0707 | - | 91.13% | -0.44% | 0.0493 | <span style="color: #d13438;">○</span> |
| Commit survival rate (by user) | 83.36% | 82.95% | -0.48% | 0.3200 | - | 83.93% | +0.68% | 0.1533 | - |
| p50 Time to First Edit (by turn) | 70.1s | 68.1s | -2.88% | 0.0271 | <span style="color: #107c10;">○</span> | 66.2s | -5.68% | 2e-5 | <span style="color: #107c10;">●</span> |
| p95 Time to First Edit (by turn) | 417.1s | 409.1s | -1.93% | 0.1928 | - | 378.3s | -9.30% | 1e-10 | <span style="color: #107c10;">●</span> |
| p50 total tokens (by user) | 10.6M | 10.4M | -2.54% | 0.3429 | - | 10.3M | -3.25% | 0.2094 | - |
| p95 total tokens (by turn) | 6.1M | 5.8M | -5.19% | 0.0157 | <span style="color: #107c10;">○</span> | 5.6M | -7.64% | 0.0003 | <span style="color: #107c10;">●</span> |
| Average tool calls (by turn) | 23.86 | 23.09 | -3.19% | 0.0091 | <span style="color: #107c10;">○</span> | 21.82 | -8.54% | 1e-12 | <span style="color: #107c10;">●</span> |

In this table, p95 means the 95th percentile: 95% of measured turns were at or below that value, and 5% were above it.

* **Quality**: the guardrail metrics stayed mostly healthy. Commit survival rate moved slightly up for LargePromptSections (+0.68%) and slightly down for EconomicalSearchAndEdit (-0.48%), **neither statistically significant**. The 10-minute survival rate moved slightly down for both treatments: -0.44% for LargePromptSections and -0.40% for EconomicalSearchAndEdit. Only the LargePromptSections movement crossed the statistical significance threshold, and just barely (p=0.0493), unlike the highly significant efficiency wins. We treated that as a real tradeoff to weigh, but the movement was small and the other quality guardrail did not regress.
* **Latency**: LargePromptSections delivered the strongest edit-latency wins, and both were **highly statistically significant**: p50 Time to First Edit improved -5.68% (p=2e-5), and p95 Time to First Edit improved -9.30% (p=1e-10). EconomicalSearchAndEdit moved in the right direction, but the edit-latency effects were weaker: p50 Time to First Edit -2.88% (p=0.0271), and p95 Time to First Edit -1.93% (not significant).
* **Token efficiency**: both treatments reduced median total tokens per user, but those p50 movements were **not statistically significant**: -3.25% for LargePromptSections and -2.54% for EconomicalSearchAndEdit. At the upper tail, LargePromptSections reduced p95 total tokens by -7.64%, **highly statistically significant** (p=0.0003). EconomicalSearchAndEdit also reduced p95 total tokens by -5.19%, **statistically significant** (p=0.0157). Both variants reduced average tool calls per turn: -8.54% for LargePromptSections, **highly statistically significant** (p=1e-12), and -3.19% for EconomicalSearchAndEdit, **statistically significant** (p=0.0091).

Based on these findings, we chose Treatment B, LargePromptSections, as the update to the default `GPT-5.5` system prompt. It had the strongest overall profile: clear latency improvements, significant upper-tail token reductions, fewer tool calls, and mostly stable quality guardrails. The small drop in 10-minute survival was worth watching, but it was only lightly significant, while the latency, token, and tool-call gains were larger and more statistically robust. We expected the overall experience to remain strong while becoming faster and more token efficient. Treatment A moved several metrics in the right direction, but Treatment B gave us the more consistent result across the measures that matter most for VS Code.

The important part is not only that the numbers moved. The movement was tied to a specific, testable harness hypothesis from provider feedback, validated offline first, and then confirmed online over a two-week production window. One change made the agent reason more economically about search and edit flow. The other gave it clearer structure for reasoning, editing, and validating. Both produced useful efficiency signals, and LargePromptSections held up as the most durable.

## Continuous optimization

This experiment is one example of how we work with model providers beyond launch day. A model release is not the end of the tuning loop. It is another chance to look at real VS Code behavior, test focused improvements, and find new ways to make the experience faster, more reliable, and more efficient.

That work matters even more with usage-based billing in place. Token efficiency is not only an infrastructure metric. It is part of the value customers feel when an agent responds faster, explores less unnecessarily, and spends more of its budget on the work that matters. We will keep looking for those improvements across models, prompts, tools, and the VS Code coding harness.

Try agent mode in VS Code, switch between models, and compare how different models approach the same task. Share your feedback in [our GitHub repo](https://github.com/microsoft/vscode). It helps us keep improving the experience.

Happy coding! 💙
