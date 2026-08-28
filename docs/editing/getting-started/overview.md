---
PageTitle: Core editor features
DateApproved: 8/26/2026
MetaDescription: Explore core {% data variables.product.prodname_vscode %} capabilities for editing, debugging, testing, source control, terminal workflows, and editor customization.
---
# Core editor features

{% data variables.product.prodname_vscode %} is a cross-platform code editor that combines a focused editing experience with the tools you need across the development lifecycle. Use it to make a quick change to a single file or open a complete project and move from editing to running, debugging, testing, and source control without switching applications.

This overview introduces the concepts behind the core editor capabilities and directs you to the detailed documentation for each part of your workflow.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="Learn the editor basics">
New to {% data variables.product.prodname_vscode_shortname %}? Follow the hands-on tutorial to explore the editor and complete a coding task.

* [Start the editor tutorial](/docs/editing/getting-started/editor-tutorial.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Build with AI agents">
Prefer to delegate coding tasks? Follow the agents quickstart to make changes across a project with AI.

* [Start the agents quickstart](/docs/agents/quickstart.md)

</div>

## One editor for your development workflow

{% data variables.product.prodname_vscode_shortname %} does not prescribe a programming language, operating system, or set of development tools. Instead, it provides a consistent workbench that adapts to your project:

* **Work in one place.** Access your files, code intelligence, terminal, source control, debugger, and tests from the same window. The tools share project context, so you can move between writing code and validating a change with less friction.
* **Bring your tools and technology stack.** Use your existing compilers, command-line tools, shells, and source control workflows. Install extensions to add rich support for almost any programming language, framework, or service.
* **Work where your code runs.** Develop on your local computer, connect to a [remote machine or container](/docs/remote/remote-overview.md), or make lightweight changes with [{% data variables.product.prodname_vscode_shortname %} for the Web](/docs/remote/vscode-web.md).
* **Make the editor your own.** Customize the layout, keyboard shortcuts, and behavior, then use profiles to switch between configurations for different projects or tasks.

## Explore the core capabilities

<div class="card-grid">
    <a class="card" href="/docs/editing/codebasics">
        <i class="codicon codicon-edit" aria-hidden="true"></i>
        <div>
            <p><strong>Edit and understand code</strong></p>
            <p>Write, navigate, and refactor code with language-aware assistance.</p>
        </div>
    </a>
    <a class="card" href="/docs/debugtest/debugging">
        <i class="codicon codicon-debug-alt" aria-hidden="true"></i>
        <div>
            <p><strong>Run, debug, and test</strong></p>
            <p>Build and validate changes without leaving the editor.</p>
        </div>
    </a>
    <a class="card" href="/docs/sourcecontrol/overview">
        <i class="codicon codicon-source-control" aria-hidden="true"></i>
        <div>
            <p><strong>Manage source control</strong></p>
            <p>Review changes, work with branches, and collaborate with Git.</p>
        </div>
    </a>
    <a class="card" href="/docs/terminal/basics">
        <i class="codicon codicon-terminal" aria-hidden="true"></i>
        <div>
            <p><strong>Use the integrated terminal</strong></p>
            <p>Run shells and command-line tools alongside your code.</p>
        </div>
    </a>
    <a class="card" href="/docs/configure/settings">
        <i class="codicon codicon-settings-gear" aria-hidden="true"></i>
        <div>
            <p><strong>Customize and extend</strong></p>
            <p>Adapt the editor with settings, profiles, and extensions.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/overview">
        <i class="codicon codicon-sparkle" aria-hidden="true"></i>
        <div>
            <p><strong>Build with AI agents</strong></p>
            <p>Delegate coding tasks while staying in control of the changes.</p>
        </div>
    </a>
</div>

## Get oriented

The {% data variables.product.prodname_vscode_shortname %} window is called the workbench. The [user interface](/docs/editing/getting-started/userinterface.md) centers on the editor and provides dedicated views for files, search, source control, running and debugging, and extensions. The Activity Bar switches between these views, while the Panel hosts supporting tools such as the terminal, Problems view, and debug console.

A [workspace](/docs/editing/workspaces/workspaces.md) represents the project you have open. A workspace can contain one or more folders and gives {% data variables.product.prodname_vscode_shortname %} the context to restore your open files and layout, apply project-specific settings, and store task and debug configurations. You can also open an individual file when you do not need project context.

## Edit code

The editor combines general text-editing features with language-aware assistance. Use [basic editing](/docs/editing/codebasics.md) features such as multiple cursors, search and replace, and automatic save in any text file. For supported programming languages, [IntelliSense](/docs/editing/intellisense.md) uses information about your code to provide completions, parameter information, and inline documentation.

[Code navigation](/docs/editing/editingevolved.md) helps you move between definitions, references, and symbols across a project. You can transform code with language-aware [refactoring tools](/docs/editing/refactoring.md) and reuse common code with [snippets](/docs/editing/userdefinedsnippets.md). These capabilities come from built-in language support and extensions, so the exact features vary by language. Visit the [language documentation](/docs/languages/overview.md) to set up support for your technology stack.

## Run, debug, and test

Running, debugging, and testing form a continuous loop as you make changes. {% data variables.product.prodname_vscode_shortname %} brings each activity into the workbench while continuing to use the tools and runtimes from your project.

Automate builds, scripts, and other recurring commands with [tasks](/docs/debugtest/tasks.md). Use the [debugger](/docs/debugtest/debugging.md) to control program execution with breakpoints, step through code, and inspect application state. The [Testing view](/docs/debugtest/testing.md) uses testing extensions to discover tests and lets you run, debug, and review results alongside your code.

## Manage source control

Integrated [source control](/docs/sourcecontrol/overview.md) keeps the history and state of your project close to the code. See which files changed, review inline differences, and move between edits and source control operations without losing context.

{% data variables.product.prodname_vscode_shortname %} includes Git support for [reviewing, staging, and committing changes](/docs/sourcecontrol/staging-commits.md), [managing branches and worktrees](/docs/sourcecontrol/branches-worktrees.md), and [resolving merge conflicts](/docs/sourcecontrol/merge-conflicts.md). You can also [collaborate on GitHub](/docs/sourcecontrol/github.md), and extensions can add support for other source control systems.

## Use the integrated terminal

The [integrated terminal](/docs/terminal/basics.md) runs a full shell inside the workbench, so you can use the same command-line tools and workflows you use in an external terminal. New terminals start in the context of your workspace, and you can keep multiple terminals open, split them, or move them into the editor area.

Choose and configure your preferred shell with [terminal profiles](/docs/terminal/profiles.md). [Shell integration](/docs/terminal/shell-integration.md) adds awareness of commands and their output for navigation, command status, and other editor features. You can also personalize the [terminal appearance](/docs/terminal/appearance.md).

## Customize and extend the editor

{% data variables.product.prodname_vscode_shortname %} starts with useful defaults but lets you control how the editor looks and behaves. Change the [layout](/docs/configure/custom-layout.md), remap [keyboard shortcuts](/docs/configure/keybindings.md), and configure [settings](/docs/configure/settings.md) globally or for a specific workspace.

[Extensions](/docs/configure/extensions/extensions.md) add languages, debuggers, source control providers, and connections to external tools and services. Create [profiles](/docs/configure/profiles.md) to switch between sets of extensions, settings, and user interface customizations for different projects or tasks. Use [Settings Sync](/docs/configure/settings-sync.md) to share your configuration across devices.

## Next steps

* Follow the [editor tutorial](/docs/editing/getting-started/editor-tutorial.md) for a guided introduction.
* Review [editing tips and tricks](/docs/editing/getting-started/tips-and-tricks.md) to work more efficiently.
* Learn how to develop on a [remote machine or in a container](/docs/remote/remote-overview.md).
