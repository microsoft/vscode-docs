---
Order: 131
TOCTitle: Improving Token Efficiency
PageTitle: "Improving token efficiency in GitHub Copilot"
MetaDescription: Learn how we're improving token efficiency in GitHub Copilot to reduce costs and latency for users.
MetaSocialImage: cache-explorer.webp
Date: 2026-06-17
Author: Ryan Caldwell, Bhavya U
---

# Improving token efficiency in GitHub Copilot

June 17, 2026 by [Ryan Caldwell](https://github.com/RyanJamesCaldwell) and [Bhavya U](https://github.com/bhavyaus)

With the recent move to usage-based billing for GitHub Copilot, every token in an agentic session matters. They affect your credits, latency, and the context window an agent has left to finish the task. Each new model generation tends to consume more tokens per task than the last, as we've witnessed in our own data. This means that harness-level efficiencies are increasingly important to counter this trend. As agents take on longer, more autonomous work, an inefficient harness adds up fast.

![Chart showing tokens per turn increasing across successive model generations](token-usage-trend.png)

Making the GitHub Copilot agentic harness more token-efficient is continuous work, and it's the best way to counter this trend. For most changes, we run [A/B experiments in production and offline evaluations](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode) against task suites, confirming that task success rate holds or improves while token usage drops. It's rarely one big win, usually a steady stream of small ones. Below, we walk through recent gains, first for OpenAI models and then for Anthropic models.

## How agentic requests spend tokens

Two costs sit at the heart of every agentic request, and two ideas help us reduce them. Both apply across OpenAI and Anthropic models, even though each provider exposes them differently.

![Screenshot of the Cache Explorer showing parts of the prompt in a horizontal stacked bar chart.](prompt-signature.png)
_Graphical overview of the prompt signature highlighting the different parts of the prompt._

**The prompt prefix and caching.** In an agentic coding session, a large share of every request repeats across turns: system instructions, tool definitions, repository context, and conversation history. This repeated beginning is the **prompt prefix**. When requests share the exact same prefix, the inference provider can reuse cached model state instead of recomputing it from scratch on each request. Despite the name, the cached artifact is not a human-readable copy of the prompt. It is the model state computed while processing that prefix, represented internally as key/value tensors. Reusing the prefix cuts both cost (cached tokens can be **up to 10 times cheaper**) and latency, which is why we work to keep the prompt cache hit-rate high.

**Tool-definition overhead.** Agents can pull in a large number of tools: those exposed by MCP servers, built-in tools, or extension-provided tools. Each tool is sent to the model with a full definition (a name, a description, and a complete JSON parameter schema), and historically every one was loaded into context on every request. Even when that data is cached, the context window overhead is fixed on each turn and grows as the toolset does.

**Tool search.** Tool search reduces that overhead by letting the model **load tool definitions** on demand instead of all at once. Upfront, the model sees only lightweight metadata, the name and description of each deferred tool, and the heavier parameter schemas stay out of context until the model searches for a tool and loads it. Because deferred tools are added at the end of the context window rather than the prefix, the cached prompt prefix stays reusable and the caching gains keep working across turns. The payoff is a leaner context window: the model spends fewer tokens on tools it never uses, leaving more room and budget for the actual task.

## Efficiency wins for OpenAI models

For OpenAI models, our recent work focused on reducing usage costs and latency for Copilot users through improved token efficiency. We pursued that through three changes: retaining cached model state for longer, reducing tool-definition overhead, and replacing repeated HTTP requests with persistent WebSocket connections.

### Extended prompt caching

OpenAI models cache the prompt prefix automatically: the provider infers the reusable prefix and reuses its model state across requests. That reuse has a direct cost benefit. For most OpenAI models that support cached input pricing, uncached input tokens cost **10 times as much** as cached input tokens.

Caching the prefix happens on its own, but how long that cache survives is something we can configure. After careful evaluation, we enabled extended prompt caching for supported models through the `prompt_cache_retention` body parameter. By default, the cache lives in fast GPU memory, where it is dropped after about 5 to 10 minutes of inactivity (up to an hour in some cases) to make room for other work. Setting `"prompt_cache_retention": "24h"` moves the cache to slower but roomier GPU-local storage and keeps it for up to 24 hours.

The benefit is simple. With the default cache, a pause of more than a few minutes throws the cache away, so your next request has to reprocess the whole prefix at the full, uncached price. Extended retention keeps the cache warm, so picking up where you left off is still fast and cheap, even after a long break.

After enabling extended prompt caching for supported OpenAI models in VS Code, we measured the following relative increases in cache hit rate. These are relative changes, not percentage-point increases: a 919% increase means the cache hit rate was 10.19 times higher than its previous value.

| Time between requests | GPT-5.2 | GPT-5.3-Codex | GPT-5.4 |
| --- | --- | --- | --- |
| 10-20 min | +13% | +32% | +10% |
| 20-30 min | +135% | +142% | +137% |
| 30-40 min | +301% | +203% | +679% |
| 40-60 min | +338% | +279% | +919% |

The increase was largest after longer gaps between requests, when cached model state that would otherwise have expired remained available for reuse. In practice, this increase means more of your prompt is processed at the lower cached-input rate, reducing the cost of requests even after longer pauses.

### Tool search

To avoid sending all tool definitions on every request, tool search makes this on-demand. Available to models GPT-5.4 and newer, [OpenAI's native tool search](https://developers.openai.com/api/docs/guides/tools-tool-search) implements this deferral with a `defer_loading` flag.

Upfront, the model only sees lightweight metadata: the name and description of each deferred function or, when deferred functions are grouped into a namespace, only the namespace's name and description.

During a four-day VS Code experiment with GPT-5.4 and GPT-5.5, tool search reduced per-turn token utilization, time to first token, and time to complete:

| Metric | Model | Delta |
| --- | --- | --- |
| P50 Total tokens used per turn | GPT-5.4 | -9.81% |
| P50 Total tokens used per turn | GPT-5.5 | -8.61% |
| P50 Time to first token (TTFT) | GPT-5.4 | -6.88% |
| P50 Time to first token (TTFT) | GPT-5.5 | -7.34% |
| P50 Time to complete (TTC) | GPT-5.4 | -5.31% |
| P50 Time to complete (TTC) | GPT-5.5 | -5.42% |

Aggregated across an entire session, total token usage for the median Copilot user decreased by 8.97% with GPT-5.4 and 10.92% with GPT-5.5.

### WebSockets

An agentic coding turn can involve many sequential requests to the inference provider; one for each step the model takes as it calls tools and works toward a solution. Even when the underlying HTTP connection is reused, each step remains a separate API request.

[Responses API WebSocket mode](https://developers.openai.com/api/docs/guides/websocket-mode) keeps a persistent connection open and provides a lower-latency continuation path for those sequential requests. On an active connection, OpenAI can also reuse the most recent response state from a connection-local in-memory cache, reducing continuation overhead across long chains of tool calling.

A few months ago, OpenAI announced WebSocket support in the Responses API. Initial documentation showed large latency improvements, so we experimented with it early and saw consistent latency reductions in our own A/B test. This was one of those ideas that feels obvious in retrospect. Agentic coding sessions make repeated requests over a long-lived interaction, which is exactly what WebSockets are designed to handle.

During the initial rollout of WebSockets to VS Code Stable, the latency gains from the A/B experiment held in production. The table below shows the latency gains from WebSockets relative to HTTP during that rollout. Since then, improvements elsewhere in the stack, including improved prompt caching, have further reduced latency and usage costs. For each metric, lower is better:

| Tracking metric | Percentile | GPT-5.3-Codex | GPT-5.4 |
| --- | --- | --- | --- |
| Time to first token (TTFT) | p50 | -19.46% | -16.37% |
| Time to first token (TTFT) | p95 | -12.92% | -15.78% |
| Time to complete (by turn) | p50 | -13.55% | -11.74% |
| Time to complete (by turn) | p95 | -7.86% | -6.26% |

We also observed statistically significant relative increases in user engagement. For GPT-5.3-Codex and GPT-5.4, respectively, active users increased by 1.27% and 2.17%, while two-day engagement increased by 1.90% and 3.14%.

These gains led us to make WebSockets the default transport for OpenAI models GPT-5.2 and newer across Copilot products including VS Code, Copilot CLI, the GitHub app, and more.

## Efficiency wins for Anthropic models

For Anthropic models, our recent work targeted the same two repeating costs: the prompt prefix we keep warm in cache, and the tool payload we send on every turn. We pursued that through two changes: spending our prompt-cache breakpoints more deliberately, and deferring tool definitions through tool search.

### Smarter prompt caching

Anthropic's prompt caching works differently from the automatic prefix caching that OpenAI models use. Rather than the provider inferring the reusable prefix, the caller places explicit `cache_control` breakpoints, and the API caches everything up to each marker.

The budget of breakpoints per request is small and fixed, so where you place them matters as much as whether you use them. We reworked our Messages API caching to spend up to four breakpoints deliberately, anchored at the prompt's most stable boundaries:

* The **end of the tool definitions** and the **end of the system prompt**, the parts that change least between turns.
* A pair of **rolling anchors** on the two most recent cacheable messages.

That second, older anchor is a safety net. If the freshest anchor misses (a slow tool call lets its cache lapse, or content drifts slightly), the older anchor still serves a hit covering everything up to it. We typically give up a single exchange instead of cold-starting the whole conversation cache.

These changes produced a steady few-percentage-point increase in cache hit rate. For agentic workloads, where the prefix is long and turns come in quick succession, it now sits at around 94%, which means that only a small fraction of each request's input has to be recomputed instead of served from cache. This reduces both usage cost and time to first token.

### Tool search

Anthropic's tool search tool applies the same deferral idea. Tools are marked with `defer_loading: true`, and alongside the deferred catalog we keep a small, curated set of core tools loaded (reading and editing files, running terminal commands, searching the workspace) so the most common actions never require an extra step.

We first rolled this out using Anthropic's server-side tool search, where the model searches the deferred catalog on Anthropic's side and the API expands matches into `tool_reference` blocks inline. In a seven-day VS Code experiment, deferring tool definitions reduced both prompt-token and total-token usage and trimmed time to first chunk:

| Metric | Percentile / scope | Delta |
| --- | --- | --- |
| Time to first chunk | p50 (by turn) | -2.45% |
| Total prompt tokens | p50 (by turn) | -11.30% |
| Total prompt tokens | p95 (by turn) | -8.85% |
| Total prompt tokens | p50 (by user) | -18.32% |
| Total tokens | p50 (by turn) | -11.09% |
| Total tokens | p95 (by turn) | -8.74% |
| Total tokens | p50 (by user) | -18.03% |

For the median Copilot user, overall prompt-token and total-token usage each fell by roughly 18% across a full session.

With the approach proven, we moved the search itself client-side, backing it with the same tools-grouping system we built for VS Code's reduced toolset. The model still calls a `tool_search` tool, but instead of Anthropic matching against the deferred catalog, we run the search locally and return `tool_reference` blocks for the best matches.

The local search is also smarter. Rather than lexical matching over tool names and descriptions, we use [our internal Copilot embedding model](https://github.blog/news-insights/product-news/copilot-new-embedding-model-vs-code/), the same model that powers our embedding-guided tool routing, to compare the query against vector representations of every available tool. Because it matches intent rather than literal keywords, a request like "find all references to this symbol" surfaces the right tool even when its name and description share no words with the query.

For a deeper look at the grouping and embedding-guided routing behind this, see [How we're making GitHub Copilot smarter with fewer tools](https://github.blog/ai-and-ml/github-copilot/how-were-making-github-copilot-smarter-with-fewer-tools/).

Moving the search client-side gave us some extra benefits beyond the original token savings:

* **Responsiveness:** the search runs locally against cached embeddings, so discovering a tool no longer depends on a server-side search round trip.

* **Dynamic MCP tool discovery:** because we own the candidate set, tools that connected MCP servers add or remove mid-session are reflected immediately, without waiting on a fixed server-side catalog.

* **Better quality:** the embedding-guided search is more likely to surface the right tool for a given query, which reduces user error and improves task success, as shown in the metrics below.

That responsiveness showed up directly in the numbers. In a two-week VS Code Stable rollout, the client-side tool search reduced latency on top of the token savings already gained from deferral.

| Metric | Model | Delta |
| --- | --- | --- |
| Time to first token (p50) | Claude Opus 4.6 | -1.91% |
| Time to complete (p50) | Claude Opus 4.6 | -1.97% |
| Time to complete (p95) | Claude Opus 4.6 | -2.57% |
| Time to complete (p50) | Claude Sonnet 4.6 | -1.30% |
| Time to complete (p95) | Claude Sonnet 4.6 | -3.35% |
| User error rate | Claude Sonnet 4.6 | -4.01% |

In both variants, deferred tools sit outside the cached prompt prefix, so the prefix is never rewritten and the caching gains above keep working across turns. And once a tool has been discovered, it stays available for the rest of the conversation, so the model does not pay to search for it again.

## What's next

The work above makes our agentic harness leaner: a higher cache hit rate, fewer tool definitions per request, and less transport overhead. The next step is to move whole classes of work off the main agent entirely. We're building specialized subagents, and exploring custom-trained ones, for narrow tasks like searching the workspace, running commands, and summarizing results. Each runs on the smallest, cheapest model that can do the job, instead of the main model paying for that work in its own context. The result is a lower overall cost per task.

In addition, we're working to improve transparency around token usage and cache state in the product. This includes flagging actions that quietly drive up cost, such as resuming a session after a long pause with its cache expired, or changing the reasoning effort in the middle of a session. That way, you can make an informed choice before paying for a cache cold start.

Making the agentic harness more token-efficient is ongoing work, and we'll keep investing, one small win at a time.

Happy coding! 💙
