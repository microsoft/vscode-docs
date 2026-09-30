---
ContentId: a73cc399-b974-4639-9965-497749172539
DateApproved: 9/30/2026
MetaDescription: Find agent tutorials and guides for {% data variables.product.prodname_vscode_shortname %} by task, from a first app to testing and project workflows.
MetaSocialImage: ../images/agents-overview/chat-view-expanded.png
---
# Agent tutorials and guides

Choose a tutorial to learn with a sample project, or follow a guide to apply an agent workflow to your own codebase in {% data variables.product.prodname_vscode_shortname %}.

## New to agents

<div class="card-grid">
    <a class="card" href="/docs/agents/quickstart">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Complete your first agent task</strong></p>
            <p>Recommended starting point. Build and validate a small web app, then review the changes.</p>
            <p>Sample project. No runtime or build tools required.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <div>
            <p><strong>Build an app step by step</strong></p>
            <p>Build a portfolio page while learning agent, editor, browser, and source control workflows.</p>
            <p>Sample project. Requires Git.</p>
        </div>
    </a>
</div>

Already use agents? Jump to a task:

* [Work on a project](#work-on-a-project).
* [Test and validate](#test-and-validate).
* [Customize and coordinate agents](#customize-and-coordinate-agents).
* [Improve results and recover](#improve-results-and-recover).

## Work on a project

* [Explore a codebase](/docs/agents/guides/explore-a-codebase.md): trace a behavior without editing files and verify explanations against source references. **Use your own repository.**

* [Add a feature](/docs/agents/guides/add-a-feature.md): research, plan, implement, and verify a bounded change. **Use your own repository with a working development environment and tests.**

* [Fix an API bug](/docs/agents/guides/fix-a-bug-with-agents.md): reproduce a pagination bug, add a regression test, and review the fix. **Sample project. Requires Node.js 22 or later and Git.**

* [Refactor safely](/docs/agents/guides/refactor-safely.md): change code structure in reviewable steps while preserving behavior and checking existing callers. **Use your own repository.**

* [Work with Jupyter notebooks](/docs/agents/guides/notebooks-with-ai.md): create or edit a notebook, run cells, and review analysis results. **Use your own data. Requires the Jupyter extension and a notebook kernel.**

## Test and validate

* [Add tests to existing code](/docs/agents/guides/test-code-with-ai.md): generate tests for a function or module, run them, and review assertions, failures, and coverage. **Use your own project.**

* [Validate a web app with browser tools](/docs/agents/guides/browser-agent-testing-guide.md): build a calculator app and check it against observable acceptance criteria. **Sample web app.**

* [Set up test-driven development](/docs/agents/guides/test-driven-development-guide.md): create custom agents and instructions for a repeatable test-first workflow. **Workflow setup, rather than a one-off testing task.**

## Customize and coordinate agents

* [Adapt agents to your project](/docs/agents/guides/customize-copilot-guide.md): share project instructions with your team, then add skills or specialized agents where needed. **Use your own repository.**

* [Set up a context engineering workflow](/docs/agents/guides/context-engineering-guide.md): curate project context and connect planning to implementation with instructions, custom agents, and prompt files. **Workflow setup.**

* [Run independent tasks in parallel](/docs/agents/guides/delegate-two-tasks.md): work in separate Git worktrees, review each result, then integrate and retest the changes. **Use your own Git repository after completing a single agent task.**

## Improve results and recover

* [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md): choose whether to steer a request, recover unwanted changes, or reset conversation context.

* [Reduce AI credit usage](/docs/agents/guides/optimize-usage.md): compare model costs and results, focus context, and scope tools to reduce unnecessary usage.

* [Find prompt examples](/docs/agents/guides/prompt-examples.md): adapt prompts for exploring code, building features, debugging, and testing.

## Background and help

* [How agents work](/docs/agents/concepts/agents.md): understand the agent loop and the role of models, context, and tools.

* [Best practices for using AI](/docs/agents/best-practices.md): scope tasks, provide relevant context, and verify results.

* [Troubleshoot AI features](/docs/agents/agent-troubleshooting/troubleshooting.md): diagnose setup, sign-in, connection, and other technical issues.
