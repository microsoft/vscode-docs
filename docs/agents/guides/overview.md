---
ContentId: a73cc399-b974-4639-9965-497749172539
DateApproved: 11/25/2026
MetaDescription: Find agent tutorials and guides for {% data variables.product.prodname_vscode_shortname %} by task, from a first app to testing and project workflows.
MetaSocialImage: ../images/agents-overview/chat-view-expanded.png
---
# Agent tutorials and guides

Find a tutorial or guide for the task you want to complete with agents in {% data variables.product.prodname_vscode_shortname %}. Learn with a sample project or apply a workflow to your own codebase.

For help choosing a feature and its first action, use the [AI features cheat sheet](/docs/agents/reference/ai-features-cheat-sheet.md#choose-a-feature).

## Choose where to start

New to AI coding? Start by exploring your own code without changing it, or use a sample project to practice making and reviewing changes. If you're new to {% data variables.product.prodname_vscode_shortname %}, [install the editor and open a workspace](/docs/getstarted/overview.md) first.

<div class="card-grid">
    <a class="card" href="/docs/agents/guides/explore-a-codebase">
        <i class="codicon codicon-source-control" aria-hidden="true"></i>
        <div>
            <p><strong>Explore your own code</strong></p>
            <p>Ask about a behavior and verify the explanation without changing files.</p>
            <p>Your repository. Start with a question about code you know.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/quickstart">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Complete your first agent task</strong></p>
            <p>Quickstart. Build and validate a small web app, then review the changes.</p>
            <p>Sample project. No runtime or build tools required.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <div>
            <p><strong>Build, refine, and commit an app</strong></p>
            <p>Extended tutorial. Build a portfolio page in the {% data variables.copilot.agents_window %}, refine it in the {% data variables.copilot.chat_view %}, and review and commit your changes.</p>
            <p>Sample project. Requires Git.</p>
        </div>
    </a>
</div>

For a change to a single function, [try a focused edit with inline chat](/docs/chat/inline-chat.md#try-a-focused-edit). Compare the result with four expected outputs without starting an agent task.

Already use AI coding tools? Follow the [experienced-agent fast track](#experienced-agent-fast-track) to bring your workflow to {% data variables.product.prodname_vscode_shortname %}.

Or jump to a task:

* [Work on a project](#work-on-a-project).
* [Test and validate](#test-and-validate).
* [Customize and coordinate agents](#customize-and-coordinate-agents).
* [Improve results and recover](#improve-results-and-recover).

## Work on a project

* [Explore a codebase](/docs/agents/guides/explore-a-codebase.md): trace a behavior without editing files and verify explanations against source references. **Setup:** your repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Fix an API bug](/docs/agents/guides/fix-a-bug-with-agents.md): reproduce a pagination bug, add a regression test, and review the fix. **Setup:** sample project, Node.js 22 or later, and Git.

* [Add a feature](/docs/agents/guides/add-a-feature.md): continue the bug tutorial by adding filtering to the same pagination API, or plan, implement, and test a feature in your own project. **Setup:** the fixed sample or your repository with working tests, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Refactor safely](/docs/agents/guides/refactor-safely.md): change code structure in reviewable steps while preserving existing behavior. **Setup:** your repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Review a pull request](/docs/agents/guides/review-pull-request.md): inspect a pull request diff, address review comments or failing CI checks in an isolated worktree, verify fixes, and sync the branch. **Setup:** your {% data variables.product.prodname_github %}-backed repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.agents_window %}.

* [Work with Jupyter notebooks](/docs/agents/guides/notebooks-with-ai.md): create or edit a notebook, run cells, and review results. **Setup:** your data, the Jupyter extension, and a notebook kernel.

If the change is already written, [review uncommitted changes with AI](/docs/sourcecontrol/staging-commits.md#review-code-changes-with-ai) before you commit.

## Test and validate

Choose the testing workflow that fits your starting point:

| Goal | Guide | Setup |
|------|-------|-------|
| Add tests to existing behavior | [Add tests to existing code](/docs/agents/guides/test-code-with-ai.md) | Your project, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}. |
| Build new behavior test-first (red-green-refactor) | [Practice test-driven development](/docs/agents/guides/test-driven-development-guide.md) | Your repository with working tests, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}. |
| Validate interactive web UI flows | [Validate a web app with browser tools](/docs/agents/guides/browser-agent-testing-guide.md) | Sample web app, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}. |
| Reproduce a defect with a regression test | [Fix an API bug](/docs/agents/guides/fix-a-bug-with-agents.md) | Sample project (or your own repository), Node.js 22 or later, and Git. |

## Customize and coordinate agents

* [Adapt agents to your project](/docs/agents/guides/customize-copilot-guide.md): start with one project convention the agent keeps missing. Add instructions, then compare the result on the same task. **Setup:** your repository, {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude_short %}, or {% data variables.product.prodname_openai_codex_short %}.

* [Set up a context engineering workflow](/docs/agents/guides/context-engineering-guide.md): combine custom instructions, Agent Skills, and planning and TDD custom agents for repeatable feature delivery. **Setup:** your repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}.

* [Run independent tasks in parallel](/docs/agents/guides/delegate-two-tasks.md): work in separate Git worktrees, review each result, then integrate and retest. **Setup:** your Git repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.agents_window %}. Complete one agent task first.

* [Continue a cloud session in your terminal](/docs/agents/cloud-continuity-tutorial.md) `feature(cloud-sessions)`: explore a repository in the cloud, then continue the same session in your terminal. **Setup:** your private repository, cloud session access, and {% data variables.copilot.copilot_cli_short %}.

## Improve results and recover

* [Compare and choose models](/docs/agents/guides/choose-a-model.md): start with Fusion, Auto, or an individual model, then compare results when you need more evidence. **Use your own repository with working tests.**

* [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md): choose whether to steer a request, recover unwanted changes, or reset conversation context.

* [Reduce AI credit usage](/docs/agents/guides/optimize-usage.md): compare model costs and results, focus context, and scope tools to reduce unnecessary usage.

If you already know your task and need a prompt to adapt, browse the [prompt examples](/docs/agents/guides/prompt-examples.md).

## Experienced-agent fast track

If you already use AI coding tools but are new to {% data variables.product.prodname_vscode_shortname %}, bring your workflow to your own repository without completing the sample tutorials:

1. [Open your repository as a workspace](/docs/getstarted/overview.md#open-your-code).

1. Connect your existing account by following the [setup for your agent harness](/docs/agents/run/agent-harnesses.md#requirements-and-setup), or [connect a model with your own API key](/docs/agent-customization/model-providers.md#bring-your-own-language-model-key).

1. Use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) to work alongside your editor, tests, and debugger, or the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) to coordinate tasks across multiple projects.

Start with a bounded task: [explore the codebase](/docs/agents/guides/explore-a-codebase.md) or [add a feature](/docs/agents/guides/add-a-feature.md). Check the guide's harness and interface requirements, and [review and validate edits](/docs/agents/run/review-code-edits.md) before you integrate them.

## Match a guide to your setup

* **Project:** check whether the guide uses a sample or your own repository, and which development tools it requires.
* **Harness:** use the specified harness. Tools and customization formats can differ, even with the same model.
* **Interface:** follow the steps in the specified {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}.

## Background and help

* [How agents work](/docs/agents/concepts/agents.md): understand the agent loop and the role of models, context, and tools.

* [Best practices for using AI](/docs/agents/best-practices.md): scope tasks, provide relevant context, and verify results.

* [Troubleshoot AI features](/docs/agents/agent-troubleshooting/troubleshooting.md): diagnose setup, sign-in, connection, and other technical issues.
