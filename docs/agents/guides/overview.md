---
ContentId: a73cc399-b974-4639-9965-497749172539
DateApproved: 11/11/2026
MetaDescription: Find agent tutorials and guides for {% data variables.product.prodname_vscode_shortname %} by task, from a first app to testing and project workflows.
MetaSocialImage: ../images/agents-overview/chat-view-expanded.png
---
# Agent tutorials and guides

Find a tutorial or guide for the task you want to complete with agents in {% data variables.product.prodname_vscode_shortname %}. Learn with a sample project or apply a workflow to your own codebase.

For help choosing an AI workflow, [compare suggestions, collaboration alongside code, and agent orchestration](/docs/agents/overview.md#choose-how-you-work).

## Choose where to start

Choose a starting path. If you're new to {% data variables.product.prodname_vscode_shortname %}, [install the editor and open a workspace](/docs/getstarted/overview.md) first.

<div class="card-grid">
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
            <p><strong>Build an app step by step</strong></p>
            <p>Extended tutorial. Build a portfolio page in the {% data variables.copilot.agents_window %}, then continue the session in the {% data variables.copilot.chat_view %} to refine it.</p>
            <p>Sample project. Requires Git.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/guides/overview#work-on-a-project">
        <i class="codicon codicon-source-control" aria-hidden="true"></i>
        <div>
            <p><strong>Work in your own repository</strong></p>
            <p>Explore your codebase, add a feature, or refactor existing code with an agent.</p>
            <p>Your repository. Check the guide's prerequisites.</p>
        </div>
    </a>
</div>

Or jump to a task:

* [Work on a project](#work-on-a-project).
* [Test and validate](#test-and-validate).
* [Customize and coordinate agents](#customize-and-coordinate-agents).
* [Improve results and recover](#improve-results-and-recover).

## Work on a project

* [Explore a codebase](/docs/agents/guides/explore-a-codebase.md): trace a behavior without editing files and verify explanations against source references. **Setup:** your repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Add a feature](/docs/agents/guides/add-a-feature.md): plan, implement, and test a change. **Setup:** your repository with a working development environment and tests, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Fix an API bug](/docs/agents/guides/fix-a-bug-with-agents.md): reproduce a pagination bug, add a regression test, and review the fix. **Setup:** sample project, Node.js 22 or later, and Git.

* [Refactor safely](/docs/agents/guides/refactor-safely.md): change code structure in reviewable steps while preserving existing behavior. **Setup:** your repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Work with Jupyter notebooks](/docs/agents/guides/notebooks-with-ai.md): create or edit a notebook, run cells, and review results. **Setup:** your data, the Jupyter extension, and a notebook kernel.

## Test and validate

* [Add tests to existing code](/docs/agents/guides/test-code-with-ai.md): generate and run tests, then review assertions, failures, and coverage. **Setup:** your project, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.chat_view %}.

* [Validate a web app with browser tools](/docs/agents/guides/browser-agent-testing-guide.md): build a calculator app and test it against acceptance criteria. **Setup:** sample web app.

* [Set up test-driven development](/docs/agents/guides/test-driven-development-guide.md): create custom agents and instructions for a repeatable test-first workflow. **Setup:** your repository with working tests, Local harness in the {% data variables.copilot.chat_view %}.

## Customize and coordinate agents

* [Adapt agents to your project](/docs/agents/guides/customize-copilot-guide.md): share project instructions, then add skills or custom agents where needed. **Setup:** your repository.

* [Set up a context engineering workflow](/docs/agents/guides/context-engineering-guide.md): connect project context, planning, and implementation with instructions, custom agents, and prompt files. **Setup:** your repository, Local harness in the {% data variables.copilot.chat_view %}.

* [Run independent tasks in parallel](/docs/agents/guides/delegate-two-tasks.md): work in separate Git worktrees, review each result, then integrate and retest. **Setup:** your Git repository, {% data variables.product.prodname_copilot_short %} in the {% data variables.copilot.agents_window %}. Complete one agent task first.

* [Continue a cloud session in your terminal](/docs/agents/cloud-continuity-tutorial.md) `feature(cloud-sessions)`: explore a repository in the cloud, then continue the same session in your terminal. **Setup:** your private repository, cloud session access, and {% data variables.copilot.copilot_cli_short %}.

## Improve results and recover

* [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md): choose whether to steer a request, recover unwanted changes, or reset conversation context.

* [Reduce AI credit usage](/docs/agents/guides/optimize-usage.md): compare model costs and results, focus context, and scope tools to reduce unnecessary usage.

* [Find prompt examples](/docs/agents/guides/prompt-examples.md): adapt prompts for exploring code, building features, debugging, and testing.

## Experienced-agent fast track

To skip the sample projects, [open your repository as a workspace](/docs/getstarted/overview.md#open-your-code), then [explore the codebase](/docs/agents/guides/explore-a-codebase.md) or [add a feature](/docs/agents/guides/add-a-feature.md). Follow the guide's setup and [review and validate edits](/docs/agents/run/review-code-edits.md) before you integrate them.

To bring an existing setup, compare [agent harnesses and supported accounts](/docs/agents/run/agent-harnesses.md#requirements-and-setup), or [connect a model with your own API key](/docs/agent-customization/language-models.md#bring-your-own-language-model-key). Check compatibility with the guide you choose.

## Match a guide to your setup

* **Project:** check whether the guide uses a sample or your own repository, and which development tools it requires.
* **Harness:** use the specified harness. Tools and customization formats can differ, even with the same model.
* **Interface:** follow the steps in the specified {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}.

## Background and help

* [How agents work](/docs/agents/concepts/agents.md): understand the agent loop and the role of models, context, and tools.

* [Best practices for using AI](/docs/agents/best-practices.md): scope tasks, provide relevant context, and verify results.

* [Troubleshoot AI features](/docs/agents/agent-troubleshooting/troubleshooting.md): diagnose setup, sign-in, connection, and other technical issues.
