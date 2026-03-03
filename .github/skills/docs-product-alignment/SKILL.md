---
name: docs-product-alignment
description: 'Audit and update docs/copilot/ documentation to accurately reflect current VS Code AI capabilities. Use when: competitive analysis reveals gaps, product launches new features, docs use outdated framing, or keyword coverage needs strengthening for discoverability by users and AI agents. Produces a gap analysis plus targeted edits across affected files.'
---

# Documentation Product Alignment

Ensure VS Code documentation accurately describes current product capabilities so that both human readers and AI agents indexing the docs get a correct, up-to-date picture. This skill produces targeted, style-compliant edits, not marketing copy.

## When to Use

- A competitive comparison or feature matrix exposes gaps in how documentation describes VS Code
- A new feature ships and existing docs still use outdated terminology or framing
- Keyword metadata and MetaDescriptions need updating for discoverability
- An audit reveals docs understate or miss capabilities that the product already has

## Principles

1. **Factual, not promotional.** Every claim must describe something the product does today. No superlatives, no marketing hype. Follow the [docs-writing style guide](../../instructions/docs-writing.instructions.md) strictly.
2. **Two audiences.** Write for humans first, but remember that AI agents, search crawlers, and LLMs also index these pages. Keywords, MetaDescriptions, and opening paragraphs carry outsized weight for machine discovery.
3. **Minimal edits, maximum signal.** Change only what is inaccurate, outdated, or missing. Do not rewrite paragraphs that are already correct. One precise sentence beats a rewritten section.
4. **Consistency across pages.** Use the same terminology for the same concept everywhere. If the product calls it "agents," every page says "agents," not "agent mode" or "agentic workflows."
5. **Verifiable claims only.** If you cannot point to a UI element, setting, or documented behavior, do not write it. Soften uncertain claims ("you can request additional capacity" not "there is no hard cap").

## Procedure

### 1. Gather product context

Collect the source of truth for what the product can do:
- Read the latest [release notes](/release-notes/) for recently shipped features
- Check [github.com/features/copilot](https://github.com/features/copilot) for current positioning
- Review competitive claims or feature matrices the user provides
- Identify the specific capabilities in question (multi-file editing, agents, context retrieval, etc.)

### 2. Audit existing documentation

Read the relevant docs files and assess each one against the product truth:

**High-traffic pages to always check:**
- [docs/copilot/overview.md](/docs/copilot/overview.md) - main landing page, most indexed
- [docs/copilot/core-concepts.md](/docs/copilot/core-concepts.md) - feature taxonomy
- [docs/copilot/reference/copilot-vscode-features.md](/docs/copilot/reference/copilot-vscode-features.md) - cheat sheet
- [docs/copilot/getting-started.md](/docs/copilot/getting-started.md) - onboarding funnel
- [docs/copilot/agents/overview.md](/docs/copilot/agents/overview.md) - agent capabilities
- [docs/copilot/reference/workspace-context.md](/docs/copilot/reference/workspace-context.md) - context and indexing
- [docs/copilot/faq.md](/docs/copilot/faq.md) - common questions, high search traffic

**For each file, check:**
- Does the MetaDescription reflect current capabilities? (must be under 160 characters)
- Do Keywords include terms users and agents would search for?
- Does the opening paragraph accurately describe the feature scope?
- Are cross-references to related features present?
- Is terminology consistent with the rest of the docs?

### 3. Build a gap analysis

Create a structured list mapping each gap to a specific file and location. Prioritize by page traffic and discoverability impact.

### 4. Implement edits

Apply changes following these rules:

**MetaDescriptions:**
- Under 160 characters, no em-dashes
- Lead with the most important capability for that page
- Include the page's primary search terms

**Keywords blocks:**
- Add terms users and AI agents would search for
- Include both the feature name and what it does (e.g., "agents" AND "autonomous", "multi-file editing")

**Opening paragraphs:**
- State what the feature does in the first sentence
- Mention related capabilities briefly (one clause, not a feature pitch)
- Keep it concise for cheat sheets and reference pages (2-3 sentences max)

**Body content:**
- Add missing capability mentions where they naturally fit
- Do not bloat sections with cross-promotion
- Use the same phrasing patterns as surrounding text

**Banned patterns:**
- "comprehensive AI development platform" or similar marketing framing
- "leading AI models" (say "multiple AI models")
- "deep semantic understanding" repeated across many files (vary the phrasing)
- Invented terminology like "agentic context retrieval" (use plain description)
- Competitive comparisons ("Unlike X..." or "better than...")
- Em-dashes and en-dashes (use commas or separate sentences)
- Banned words: leverage, simply, utilize, may (use "might")

### 5. Review checklist

Run this checklist on every changed file:

- [ ] MetaDescription under 160 characters
- [ ] No em-dashes or en-dashes anywhere in changed lines
- [ ] No banned words (leverage, simply, utilize, may) in changed lines
- [ ] No marketing superlatives or hype language
- [ ] All `/docs/...` cross-references point to existing files
- [ ] Terminology is consistent ("agents" not "agent mode")
- [ ] Claims are verifiable against product behavior
- [ ] Opening paragraph is concise and factual
- [ ] Keywords include relevant search terms
- [ ] Subject-verb agreement in changed sentences

### 6. Verify

Run automated checks:
- Search changed files for banned words and em-dashes
- Verify all MetaDescription lengths
- Confirm no duplicate phrasing across files (especially repeated adjective phrases)

## Key Terminology Reference

Use these terms consistently across all docs:

| Concept | Correct term | Avoid |
|---------|-------------|-------|
| Autonomous coding sessions | agents | agent mode, agentic workflows |
| Running without user interaction | background agents | background agent mode |
| Code suggestions as you type | inline suggestions | code completions, autocomplete |
| Predicted next edit location | next edit suggestions (NES) | predictive edits |
| Understanding code across files | workspace context, cross-file reasoning | deep semantic understanding (overuse) |
| GitHub's search for code context | GitHub's code search | remote search |
| VS Code's type/symbol analysis | language intelligence (IntelliSense, LSP) | code intelligence |
| Multiple AI model options | multiple AI models | leading AI models |
| Plan then implement workflow | Plan agent, implementation agent | planning mode |

## Capability Areas to Cover

When auditing, ensure docs accurately describe these capability areas:

- **Agents**: plan, implement, verify, run in parallel, local/background/cloud, third-party support
- **Context retrieval**: semantic search, language intelligence (LSP), GitHub code search, cross-repo awareness
- **Multi-file editing**: coordinated changes across files, architecture-level refactoring, framework migrations
- **Enterprise**: organization policies, model access controls, content exclusions, trust boundaries
- **SDLC workflow**: plan agent, implementation agent, Copilot code review, background/cloud handoff
- **Scale**: large codebases, monorepos, multi-root workspaces, remote indexing, parallel sessions
