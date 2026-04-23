---
Order: 130
TOCTitle: MCP Tool Overload
PageTitle: "Solving MCP Tool Overload: How VS Code Manages 200+ Agent Tools"
MetaDescription: AI agents in VS Code access 200+ tools but only send 30 per turn. Progressive tool discovery uses embeddings and caching to make the rest instantly available.
MetaSocialImage: tool-discovery-hero.png
Date: 2026-04-24
Author: Bhavya U, Connor Peet, Harald Kirschner
---

# Solving MCP Tool Overload: How VS Code Manages 200+ Agent Tools

April 24, 2026 by [Bhavya U](https://github.com/bhavyaus), [Connor Peet](https://github.com/connor4312), [Harald Kirschner](https://github.com/digitarald)

We just got back from [MCP Dev Summit](https://events.linuxfoundation.org/mcp-dev-summit-north-america/) in New York City, where we presented on [MCP Apps support in VS Code](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support). One theme came up in nearly every session: too many tools. As the MCP ecosystem grows, servers and extensions each bring their own capabilities, and it adds up fast. Install a few [MCP servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers), enable some extensions, and your agent session suddenly has access to over 200 tools. Including all of their schemas in every request adds over 12,000 tokens on top of the base prompt, pushing a single turn past 18,000 tokens before you've even said "hello."

That creates real problems. The model gets slower. It picks the wrong tool more often. And because the tool list changes between sessions (different MCP servers, different extensions), [prompt caching](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/prompt-caching), one of the biggest performance wins in production LLM systems, becomes unreliable.

We believe strongly that **the client should handle this**, not the user. Developers shouldn't have to think about which tools to enable, worry about token budgets, or pay penalties in performance and cost just because their ecosystem is rich. The hard parts of agentic optimization, including how tools are provided to the model, should be invisible. This post walks through how we built that in VS Code: progressive tool discovery.

<!-- TODO: Replace ASCII art with designed diagram -->

```text
  ALL TOOLS LOADED                    CORE + DEFERRED
  (before)                            (after)

  +---------------------------+       +---------------------------+
  | System prompt   ~6K tok   |       | System prompt   ~6K tok   |
  +---------------------------+       +---------------------------+
  | read_file        { ... }  |       | read_file        { ... }  |
  | grep_search      { ... }  |       | grep_search      { ... }  |
  | run_in_terminal  { ... }  |       | run_in_terminal  { ... }  |
  | replace_string   { ... }  |       | replace_string   { ... }  |
  | ...28 more full schemas   |       | ...28 more full schemas   |
  +---------------------------+       +------ stable prefix ------+
  | open_browser     { ... }  |       | open_browser  (deferred)  |
  | click_element    { ... }  |       | click_element (deferred)  |
  | run_notebook     { ... }  |       | run_notebook  (deferred)  |
  | create_pr        { ... }  |       | create_pr     (deferred)  |
  | ...170 more full schemas  |       | ...170 more (deferred)    |
  +---------------------------+       +---------------------------+

  Total: ~18,800 tokens                Total: ~6,400 tokens
         (12K+ just for tools)                (schemas hidden for deferred)
```

## A core toolkit and a search index

When we looked at telemetry, a clear pattern emerged. On any given turn, the agent uses two to five tools. The same ~30 tools cover nearly 88% of all invocations: reading files, editing code, searching the codebase, running terminal commands. The remaining 170+ tools are specialized: open a browser page, run a notebook cell, create a GitHub pull request, drag an element on a page. Important, but not on every turn.

This suggested a natural split. Keep a **core set** of tools always available, and make everything else **discoverable on demand**.

When VS Code sends a request to the model, it partitions all available tools into two groups:

- **Always-available tools** (~30) are sent with their full schemas. Think `read_file`, `replace_string_in_file`, `run_in_terminal`, `grep_search`. They're always ready to call.
- **Deferred tools** (everything else) are also included, but marked with a `defer_loading` flag. The full definition is sent in the API request so the provider can resolve it later, but the model only sees the tool name. It knows the capability is there but needs to unlock it first.

In the API request, the difference looks like this:

```json
// Always-available: full schema sent, visible to the model
{
  "name": "read_file",
  "description": "Read the contents of a file...",
  "input_schema": { "type": "object", "properties": { ... } }
}

// Deferred: full schema sent, but hidden from the model until unlocked
{
  "name": "open_browser_page",
  "description": "Open a browser page...",
  "input_schema": { "type": "object", "properties": { ... } },
  "defer_loading": true
}
```

To unlock a deferred tool, the agent calls `tool_search`, a [built-in capability](https://code.visualstudio.com/docs/copilot/agents/agent-tools) that takes a natural language query and returns the three to five most relevant matches. Once returned, those tools become immediately callable for the rest of the conversation.

From the model's perspective, the flow is simple:

1. "I need to open a browser."
2. Calls `tool_search` with query "open browser page"
3. Gets back `open_browser_page`, `click_element`, `screenshot_page`
4. Calls `open_browser_page` with the URL

One extra tool call, and the agent has exactly what it needs.

<!-- TODO: Replace ASCII art with designed diagram -->

```text
  User                     Model                  VS Code               Anthropic API
   |                        |                       |                       |
   |-- "open this URL" ---->|                       |                       |
   |                        |                       |                       |
   |                        |-- tool_search -------->|                       |
   |                        |   "open browser page"  |                       |
   |                        |                        |                       |
   |                        |                    [embed query]               |
   |                        |                    [cosine sim vs cache]       |
   |                        |                    [top-k matches]             |
   |                        |                        |                       |
   |                        |<-- tool_reference[] ---|                       |
   |                        |    open_browser_page   |                       |
   |                        |    click_element       |                       |
   |                        |    screenshot_page     |                       |
   |                        |                        |                       |
   |                        |                        |-- expand schemas ---->|
   |                        |                        |   (API resolves refs) |
   |                        |                        |                       |
   |                        |-- open_browser_page -->|                       |
   |                        |   { url: "..." }       |                       |
   |                        |                        |                       |
```

> [!NOTE]
> Progressive discovery with `defer_loading` is currently enabled for Claude Sonnet 4.5+ and Opus 4.5+ (Haiku does not support `tool_search`). OpenAI's GPT 5.4 and newer models also support `tool_search`. For Gemini models, VS Code uses a separate tool grouping system that consolidates related tools into virtual groups. Subagents get curated, small tool sets and skip `tool_search` entirely.

## Why we built our own search

Here's where our approach diverges from what you might expect. Anthropic's API offers a built-in server-side tool search. You can include `tool_search_tool_regex` or `tool_search_tool_bm25` in your tools array, and the server handles search automatically using regex pattern matching or BM25 text search.

We actually shipped that first. In late 2025, we rolled out Anthropic's server-side search behind a feature flag, tested it via A/B experiment, and enabled it for Opus 4.5. It worked, but we ran into three issues:

1. **Keyword matching had limits.** A query like "look up this URL" should match `fetch_webpage` even though none of those words appear in the tool name. Regex and BM25 struggle with this kind of semantic gap. We could see it in the data: the server-side approach needed more search invocations to find the right tools.
2. **Dynamic tool discovery.** MCP servers support [dynamic tool discovery](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-discovery), where the set of available tools can change mid-session. Server-side search has no awareness of these changes, but a client-side implementation can re-index tools as they appear.
3. **Enterprise compliance.** Anthropic's server-side tool search was not Zero Data Retention compliant, a blocker for enterprise customers.

So we pivoted. We replaced server-side search with a **client-side implementation** running entirely within VS Code, using **embedding-based semantic similarity**. When the model calls `tool_search`, VS Code computes an embedding of the query, compares it against pre-computed embeddings of every tool's name and description, and returns the closest matches by cosine similarity.

We didn't choose embeddings on a hunch. Back in mid-2025, we ran a controlled experiment comparing three approaches to tool selection on a benchmark of 200 tool-use scenarios:

| Method | Correct tool in results | Hit rate |
|--------|------------------------|----------|
| Embedding-based (top 10 by cosine similarity) | **93.0%** | 186/200 |
| GPT-4.1-based (LLM picks top 10 tools) | 87.5% | 175/200 |
| Default tools only (no selection) | 69.0% | 138/200 |

Embeddings beat an LLM at its own game, with a 24 percentage point improvement over defaults. And the client-side implementation needed fewer search invocations than the server-side regex approach to find the right tools in our evals.

The key insight: Anthropic's API doesn't care *who* does the search. It supports a "custom tool search" pattern where the client implements its own search tool and returns `tool_reference` content blocks, the same format the server-side search would produce. The API handles the rest, expanding those references into full tool schemas for the model. We get the best of both worlds: Anthropic's native deferred-tool infrastructure with our own search quality.

OpenAI's GPT 5.4+ models also support [tool search](https://developers.openai.com/api/docs/guides/tools-tool-search) with a similar client-executed mode. When the model emits a `tool_search_call`, VS Code performs the embedding-based lookup and returns a `tool_search_output` containing the matched deferred tools (full definitions with `defer_loading: true`). The deferred tools must be included as part of the tool output for the model to call them on subsequent turns.

## Making discovery instant

The agent shouldn't have to wait for a network round-trip every time it needs to discover a tool. We built a two-layer caching system to make search a sub-millisecond local operation.

**Layer 1: Pre-computed cache.** For every VS Code release, we pre-compute embeddings for all known built-in tools and ship them as a versioned cache. When the agent searches, the lookup is a pure in-memory dot-product.

**Layer 2: Local persistent cache.** For tools from MCP servers or [extensions](https://code.visualstudio.com/api/extension-guides/ai/tools), tools we can't know about at release time, VS Code computes embeddings on first encounter and stores them in a compact binary file in your global storage. The cache uses an LRU policy with 1,000 entries, keyed by a hash of the tool's name and description. If a tool's description changes (say, an MCP server updates), the hash changes and a fresh embedding is computed automatically.

The result: the first time you use an MCP server's tools, there's a brief computation. Every subsequent search is instant.

<!-- TODO: Replace ASCII art with designed diagram -->

```text
  tool_search("open browser page")
       |
       v
  +------------------+    tool embs   +------------------------+
  | Embed query      |--- hit? ------>| Layer 1: Pre-computed  |
  | (API call or     |                | (built-in tools,       |
  | local model)     |                |  shipped with VS Code) |
  +------------------+                +------------------------+
       |                                    miss |
       v                                         v
  +------------------+    tool embs   +------------------------+
  | Cosine similarity|--- hit? ------>| Layer 2: Local binary  |
  | top-k results    |                | (MCP/ext tools, LRU,   |
  +------------------+                |  1000 entries, hashed)  |
       |                              +------------------------+
       v                                         |
  [tool_reference]                           miss |
  open_browser_page                               v
  click_element                          [compute embedding]
  screenshot_page                        [write to cache]
```

## Teaching the model the protocol

Progressive discovery only works if the model knows the rules. We invest significant prompt engineering in making this seamless:

- The system prompt explains that deferred tools must be discovered via `tool_search` before they can be called.
- A full list of deferred tool names is included, so the model knows *what's available* to search for. It just can't call them directly.
- We encourage broad queries: "search for 'github' to find all GitHub tools at once, rather than separate searches for issues and pull requests."
- We explicitly warn against anti-patterns: don't call a deferred tool without searching first, don't re-search for tools already found.
- A reminder at the end of the prompt reinforces the protocol. Models follow instructions well, but critical behaviors deserve repetition.

We also learned the hard way that some tools can't be deferred. Early on, we deferred `view_image`. The model saw the name in a flat list but never its description, and it simply didn't think to search for an image-viewing tool when encountering `.png` files. Benchmark failures led us to a simple rule: tools that represent core capabilities the model might not think to look for need to stay always-available. Telemetry, not guesswork, drives which tools make the cut.

## The prompt caching bonus

There's a subtle but important performance benefit to this architecture that goes beyond token savings.

We deliberately put always-available tools **first** in the request. Because these tools are the same across turns and often across sessions, they form a **stable prefix** that the API can cache. Deferred tools, which vary by session, come after and don't invalidate the cached prefix.

We also discovered that our initial implementation wasn't placing `cache_control` breakpoints on tools or the system prompt, causing ~13,000 tokens of stable content to be reprocessed every turn. After reordering the request and adding breakpoints in the right places, the first ~15,000 tokens of every request hit the prompt cache on every turn after the first. Less latency, lower cost, and the model gets its context faster.

## What we learned

Building progressive tool discovery taught us lessons that apply broadly to anyone building agentic systems:

1. **You don't have to send every tool in every request.** Split your tools into a core set and a discoverable set. The model is perfectly capable of searching when it needs something specialized.

2. **Semantic search beats keyword matching for tool discovery.** Models describe what they need in natural language. Your search should understand natural language too. In our benchmarks, embeddings outperformed both LLM-based selection and regex/BM25 search.

3. **Cache aggressively, at multiple layers.** Pre-compute what you can. Persist what you compute. Make the common case instant.

4. **Teach the protocol explicitly, and then remind.** Models follow instructions well, but critical behaviors deserve repetition in the prompt. And watch for tools that become invisible when deferred.

5. **Use the platform's native primitives.** Anthropic's `defer_loading` and `tool_reference` blocks and OpenAI's `tool_search` with client-executed mode gave us the right abstractions. We just brought our own search quality.

The result: VS Code's agent can access 200+ tools while paying the token cost of ~30 on most turns, with sub-millisecond discovery when it needs more. The model barely notices the difference, but your prompt cache and your latency certainly do.

Looking ahead, we're exploring **personalized deferral**: instead of a static list of always-available tools, use each developer's actual usage patterns to decide what stays loaded. A data scientist would keep notebook tools always available. A web developer would keep browser tools. The core set adapts to you.

Happy coding! 💙
