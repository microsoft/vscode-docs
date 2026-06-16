---
Order: 140
TOCTitle: Improving Token Efficiency
PageTitle: "Improving token efficiency in GitHub Copilot"
MetaDescription:
MetaSocialImage: NICK-TODO.png
Date: 2026-06-17
Author: Ryan Caldwell, Bhavya U
---

# Improving token efficiency in GitHub Copilot

June 17, 2026 by [Ryan Caldwell](https://github.com/RyanJamesCaldwell) and [Bhavya U](https://github.com/bhavyaus)

With the recent move to usage-based billing for GitHub Copilot, every token in an agentic session matters - to your credits, to latency, and to the context window an agent has left to finish the task. On top of that, each new model generation tends to consume more tokens per task than the last - we see this clearly in our own data - so harness-level efficiencies are increasingly important to counter that trend. As agents take on longer, more autonomous work, an inefficient harness adds up fast.

![Chart showing tokens per turn increasing across successive model generations](token-usage-trend.png)

<!-- Image TODO: each green line should say "Generation n", purple "n+1", pink "n+2", and the Y axis should say "tokens per turn". -->

Making the GitHub Copilot agentic harness more token-efficient is continuous work. We run A/B experiments in production and offline evaluations against task suites for most changes in the harness, checking that task success rate holds (or improves) while token usage drops. It is rarely one big win - usually a steady stream of small ones. Below, we walk through recent gains, first for OpenAI models and then for Anthropic models.

## Efficiency wins for OpenAI models

For OpenAI models, our recent efficiency work focused on reducing usage costs and latency for Copilot users through improved token efficiency. We pursued that through three changes: retaining cached model state for longer, reducing tool-definition overhead, and replacing repeated HTTP requests with persistent WebSocket connections.

### Extended prompt caching

In agentic coding sessions, a significant portion of the prompt repeats across turns: system instructions, tool definitions, repository context, conversation history, and more. This repeated beginning is the prompt prefix. When requests share the *exact* same prompt prefix, the inference provider can reuse cached model state instead of recomputing it from scratch on each request. Despite the name, the reusable artifact in prompt caching is not a human-readable copy of the prompt itself. It is the model state computed while processing that prefix, represented internally as key/value tensors. This concept isn't new, and we've been optimizing Copilot products to maintain a high prompt cache hit-rate for a long time. That reuse has a direct cost benefit: for most OpenAI models that support cached input pricing, uncached input tokens cost **10 times as much** as cached input tokens.

In addition to our ongoing token efficiency efforts, we enabled extended prompt caching after careful evaluation. For supported models, caching behavior is configured through the `prompt_cache_retention` body parameter. With in-memory retention, cached model state generally remains active for 5 to 10 minutes of inactivity, and for up to one hour in some cases. Setting `"prompt_cache_retention": "24h"` enables extended retention, which can offload the same model state from GPU memory to GPU-local storage and keep it available for up to 24 hours.

After enabling extended prompt caching for supported OpenAI models in VS Code, we measured the following relative increases in cache hit rate. These are relative changes, not percentage-point increases: a 919% increase means the cache hit rate was 10.19 times higher than its previous value.

| Time between requests | GPT-5.2 | GPT-5.3-Codex | GPT-5.4 |
| --- | --- | --- | --- |
| 10-20 min | +13% | +32% | +10% |
| 20-30 min | +135% | +142% | +137% |
| 30-40 min | +301% | +203% | +679% |
| 40-60 min | +338% | +279% | +919% |

The increase was largest after longer gaps between requests, when cached model state that would otherwise have expired remained available for reuse. In practice, this increase means more of your prompt is processed at the lower cached-input rate, reducing the cost of requests even after longer pauses.

### Tool search

Agentic coding agents may lean on a high number of tools: those exposed by MCPs, running terminal commands, custom tools, and more. Historically, each tool was sent to the model with a full definition (a name, a description, and a complete JSON parameter schema), and every one of them was loaded into context on every request. While that data is often cached, the context window overhead is fixed on each turn, and it grows as the toolset does.

Available to models GPT-5.4 and newer, [OpenAI's native tool search](https://developers.openai.com/api/docs/guides/tools-tool-search) enables the model to load tool definitions on demand instead of all at once. Up front, the model sees only lightweight metadata: the name and description of each deferred function or, when deferred functions are grouped into a namespace, only the namespace's name and description. The heavier parameter schemas stay out of context until the model searches for a tool and loads it.

The changes needed to defer loading a tool definition are small:

```diff
 {
   "tools": [
     {
       "type": "function",
       "name": "runInTerminal",
       "description": "Run commands in the terminal.",
+      "defer_loading": true,
       "parameters": { "...": "..." }
-    }
+    },
+    { "type": "tool_search" }
   ]
 }
```

Because tools loaded through tool search are [added at the end of a model's context window](https://developers.openai.com/api/docs/guides/tools-tool-search), the cached model state for the existing prompt prefix remains reusable. In a four-day VS Code experiment with GPT-5.4 and GPT-5.5, tool search reduced total tokens, time to first token, and time to complete:

| Metric | Model | Delta |
| --- | --- | --- |
| P50 Total tokens used per turn | GPT-5.4 | -9.81% |
| P50 Total tokens used per turn | GPT-5.5 | -8.61% |
| P50 Time to first token (TTFT) | GPT-5.4 | -6.88% |
| P50 Time to first token (TTFT) | GPT-5.5 | -7.34% |
| P50 Time to complete (TTC) | GPT-5.4 | -5.31% |
| P50 Time to complete (TTC) | GPT-5.5 | -5.42% |

For the median Copilot user, overall token usage fell by roughly 9% with GPT-5.4 and 11% with GPT-5.5.

### WebSockets

An agentic coding turn can involve many sequential requests to the inference provider; one for each step the model takes as it calls tools and works toward a solution. Even when the underlying HTTP connection is reused, each step remains a separate API request.

[Responses API WebSocket mode](https://developers.openai.com/api/docs/guides/websocket-mode) keeps a persistent connection open and provides a lower-latency continuation path for those sequential requests. On an active connection, OpenAI can also reuse the most recent response state from a connection-local in-memory cache, reducing continuation overhead across long chains of tool calling.

A few months ago, OpenAI announced WebSocket support in the Responses API. Initial documentation showed large latency improvements, so we experimented with it early and saw consistent latency reductions in our own A/B test. This was one of those ideas that feels obvious in retrospect; agentic coding sessions make repeated requests over a long-lived interaction, which is exactly what WebSockets are designed to handle.

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

For Anthropic models, our recent efficiency work focused on two parts of an agentic session that repeat over and over: the prompt we keep warm in cache, and the tool payload we send on every request. We pursued that through two changes: spending our prompt-cache breakpoints more deliberately, and deferring tool definitions through tool search.

### Smarter prompt caching

As described above, a large share of an agentic request repeats across turns - the system prompt, tool definitions, repository context, and conversation history - and reusing the cached model state for that prefix is what keeps cost and latency down. Anthropic's prompt caching, though, works differently from the automatic prefix caching used by OpenAI models. Rather than the provider inferring the reusable prefix, the caller places explicit `cache_control` breakpoints, and the API caches everything up to each marker.

There is a small, fixed budget of breakpoints per request, so where you put them matters as much as whether you use them. We reworked our Messages API caching to spend that budget deliberately - up to four breakpoints per request - anchored at the most stable boundaries of the prompt: the end of the tool definitions and the end of the system prompt (the parts that change least between turns), plus a pair of rolling anchors on the two most recent cacheable messages. The second, older message anchor is intentional: if the freshest anchor misses - say a slow tool call lets a segment's cache lapse, or content drifts slightly - the older anchor still serves a hit covering everything up to it, so we typically give up a single exchange instead of cold-starting the entire conversation cache.

These changes produced a steady few-percentage-point increase in cache hit rate. For agentic workloads, where the prefix is long and turns come in quick succession, it now sits at around 94% - meaning only a small fraction of each request's input has to be recomputed instead of served from cache - which reduces both usage cost and time to first token.

### Tool search

As with OpenAI models, the tool payload is fixed overhead that grows on every turn: each tool is sent to the model with a full definition (a name, a description, and a complete JSON parameter schema), and even when that data is cached, the context window cost is paid on each request and grows as the toolset does - and Anthropic agents can pull in many tools through MCPs, terminal commands, and custom tools.

Anthropic's tool search tool lets the model load tool definitions on demand instead of all at once. Tools are marked with `defer_loading: true`, and up front the model sees only lightweight metadata - the name and description of each deferred tool - alongside a small, curated set of core tools we keep loaded (reading and editing files, running terminal commands, searching the workspace) so the most common actions never require an extra step. The heavier parameter schemas stay out of context until the model searches for a tool and loads it.

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

With the approach proven, we then moved the search itself client-side, backing it with the same tools-grouping system we built for VS Code's reduced toolset. Anthropic supports a custom tool search implementation: the model still calls a `tool_search` tool, but instead of Anthropic matching against the deferred catalog, we run the search locally and return `tool_reference` blocks for the best matches. Rather than lexical matching over tool names and descriptions, we use [our internal Copilot embedding model optimized for semantic similarity tasks](https://github.blog/news-insights/product-news/copilot-new-embedding-model-vs-code/) - the same model that powers our embedding-guided tool routing - to compare the query embedding against vector representations of every available tool and surface the most semantically relevant candidates. Because the search matches intent rather than literal keywords, a request like "find all references to this symbol" surfaces the right tool even when its name and description share no words with the query. For a deeper look at the grouping and embedding-guided routing that powers this, see [How we're making GitHub Copilot smarter with fewer tools](https://github.blog/ai-and-ml/github-copilot/how-were-making-github-copilot-smarter-with-fewer-tools/).

Moving the search client-side gave us three benefits beyond the original token savings:

1. **Responsiveness:** the search runs locally against cached embeddings, so discovering a tool no longer depends on a server-side search round trip.
2. **ZDR compliance:** keeping the search in our own harness fits cleanly with Zero Data Retention requirements, since the catalog and query never depend on a server-side search step.
3. **Dynamic MCP tool discovery:** because we own the candidate set, tools that connected MCP servers add or remove mid-session are reflected immediately, without waiting on a fixed server-side catalog.

That responsiveness showed up directly in the numbers. In a two-week VS Code Stable rollout, the client-side tool search reduced latency on top of the token savings already gained from deferral:

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

<!-- TODO: section content to be written. -->

Happy coding! 💙
