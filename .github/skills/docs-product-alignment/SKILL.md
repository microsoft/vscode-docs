---
name: docs-product-alignment
description: 'Audit and update docs/copilot/ documentation to accurately reflect current VS Code AI capabilities. Use when: competitive analysis reveals gaps, product launches new features, docs use outdated framing, or keyword coverage needs strengthening for discoverability by users and AI agents. Produces a gap analysis plus targeted edits across affected files.'
---

# Documentation Product Alignment

Audit VS Code Copilot documentation against current product capabilities and produce targeted, style-compliant edits. Follow the [docs-writing style guide](../../instructions/docs-writing.instructions.md) for all writing rules.

## Guardrails

- **Factual only.** Every claim must map to something the product does today. No superlatives, no competitive comparisons, no invented terminology.
- **Two audiences.** Humans read the prose; AI agents and search crawlers index Keywords, MetaDescriptions, and opening paragraphs. Both matter.
- **Minimal edits.** Change only what is inaccurate, outdated, or missing. One precise sentence beats a rewritten section.
- **Verifiable.** If you cannot point to a UI element, setting, or documented behavior, do not write it.

## Workflow

1. **Gather context.** Read the latest [release notes](/release-notes/), check [github.com/features/copilot](https://github.com/features/copilot), and review any competitive claims or feature matrices the user provides.
2. **Audit high-traffic pages.** Read each page and compare against current product truth. Focus on MetaDescriptions, Keywords, opening paragraphs, and terminology.
3. **Gap analysis.** List what is inaccurate, outdated, or missing. Map each gap to a file and location. Prioritize by page traffic.
4. **Edit.** Apply targeted changes. Vary phrasing across pages to avoid repetition.
5. **Verify.** Search changed files for banned words, em-dashes, and MetaDescription length violations.

**High-traffic pages to always check:**
- [docs/copilot/overview.md](/docs/copilot/overview.md), [docs/copilot/core-concepts.md](/docs/copilot/core-concepts.md), [docs/copilot/reference/copilot-vscode-features.md](/docs/copilot/reference/copilot-vscode-features.md)
- [docs/copilot/getting-started.md](/docs/copilot/getting-started.md), [docs/copilot/agents/overview.md](/docs/copilot/agents/overview.md)
- [docs/copilot/reference/workspace-context.md](/docs/copilot/reference/workspace-context.md), [docs/copilot/faq.md](/docs/copilot/faq.md)

## Terminology

Use these terms consistently. The "Avoid" column lists terms that should not appear in docs.

| Concept | Use | Avoid |
|---------|-----|-------|
| Autonomous coding sessions | agents, agent mode (for the chat mode) | agentic workflows |
| Running without user interaction | background agents | (none) |
| Code suggestions as you type | inline suggestions | code completions, autocomplete |
| Predicted next edit location | next edit suggestions (NES) | predictive edits |
| Understanding code across files | workspace context, cross-file reasoning | repeating "deep semantic understanding" across pages |
| GitHub's search for code context | GitHub's code search | remote search |
| VS Code's type/symbol analysis | language intelligence (IntelliSense, LSP) | code intelligence |
| Multiple AI model options | multiple AI models | leading AI models |
| Structured plan before coding | Plan agent | planning mode (except in custom agent prompts) |

## Capability areas

When auditing, ensure docs accurately cover these areas:

- **Agents**: plan, implement, verify, parallel sessions, local/background/cloud, third-party support
- **Context**: semantic search, language intelligence (LSP), GitHub code search, cross-repo awareness
- **Multi-file editing**: coordinated changes, architecture-level refactoring, framework migrations
- **Enterprise**: organization policies, model access controls, content exclusions, trust boundaries
- **SDLC workflow**: Plan agent, implementation agent, Copilot code review, background/cloud handoff
- **Scale**: large codebases, monorepos, multi-root workspaces, remote indexing
