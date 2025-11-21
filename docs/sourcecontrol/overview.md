---
ContentId: 7E22CCC0-2AB8-4729-A4C9-BE2B16853820
DateApproved: 11/12/2025
MetaDescription: Learn how to use VS Code's integrated Git source control features like staging, committing, branching, merge conflict resolution, and GitHub integration.
---
# Source Control in VS Code

Visual Studio Code has integrated source control management (SCM) that lets you work with Git and other version control systems directly in your editor. Git support is built-in, and you can install extensions for other SCM providers from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=SCM%20Providers&sortBy=Installs).

The integrated source control interface provides access to Git functionality through a graphical interface instead of terminal commands. You can perform Git operations like staging changes, committing files, creating branches, and resolving merge conflicts without switching to the command line.

Changes you make in the VS Code interface are synced with your command-line Git operations, so you can use both the UI and terminal as needed. The source control interface works alongside the command line rather than replacing it.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/i_23KUAEtUM" title="Video showing how to use Git with Visual Studio Code." frameborder="0" allowfullscreen></iframe>

## Prerequisites

To use Git features in VS Code, you need:

* VS Code uses your machine's Git installation. [Install Git version 2.0.0 or later](https://git-scm.com/download) on your machine.

* When you commit changes, Git uses your configured username and email. You can set these values with:

    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```

> [!TIP]
> If you're new to Git, the [git-scm](https://git-scm.com/doc) website is a good place to start, with a popular online [book](https://git-scm.com/book), Getting Started [videos](https://git-scm.com/video/what-is-git) and [cheat sheets](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf).

## Get started with a repository

VS Code automatically detects when you open a folder that's a Git repository and activates all source control features. To get started with a new or existing repository, you have several options:

* **Initialize a new repository**: Create a new Git repository for your current folder.

* **Clone a repository**: Clone an existing repository from GitHub or another Git host.

* **Open a remote repository**: Work with a repository without cloning it to your local machine with the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension.

> [!TIP]
> You can publish a local repository directly to GitHub with the **Publish to GitHub** command, which creates a new repository and pushes your commits in one step.

Learn more about [cloning and publishing repositories](/docs/sourcecontrol/repos-remotes.md#clone-repositories).

## Source control interface

VS Code provides Git functionality through several key interface elements. This UI integration enables you to perform Git operations without knowing terminal commands:

* **Source Control view**: central hub for common Git operations like staging, committing, and managing changes

    ![Screenshot of the Source Control view showing staged changes, and the diff editor showing side-by-side changes.](images/overview/overview.png)

* **Source Control Graph**: graphical representation of your commit history and branch relationships

    ![Screenshot of the Source control graph showing commit history.](images/overview/source-control-graph.png)

* **Diff editor**: side-by-side file comparisons for effective change review

    ![Screenshot of the diff editor showing changes between file versions.](images/overview/diff.png)

* **Additional UI elements**: in-context Git information like editor gutter indicators or Git blame annotations

    ![Screenshot of editor gutter indicators showing line changes and a hover showing Git blame information.](images/overview/gutter.png)

If you prefer using the command line, you can still run Git commands in the integrated terminal (`kb(terminal.toggleTerminal)`). Changes made via the terminal are reflected in the VS Code source control interface.

## Common workflows

### Review changes before committing

Before committing changes, it's important to review them to ensure accuracy and quality. Use VS Code's AI features to perform a code review of your changes and get review comments and suggestions in the editor.

![Screenshot of the code review results, showing as editor overlay comments.](images/overview/copilot-code-review-results.png)

### Stage and commit changes

Review your changes in the Source Control view, then stage files by selecting the **+** icon next to each file or stage all changes at once. For more fine-grained control, stage specific lines or selections from a file's diff view.

![Screenshot of staging changes in the Source Control view.](images/overview/stage-changes.png)

Type your commit message in the input box or select the sparkle icon (<i class="codicon codicon-sparkle"></i>) in the commit message input box to use AI to generate a commit message based on your staged changes.

![Screenshot of generating a commit message with Copilot.](images/overview/copilot-generate-commit-message.png)

Learn more about [staging changes and writing commits](/docs/sourcecontrol/staging-commits.md).

### Sync with remotes

When your branch is connected to a remote branch, VS Code shows sync status in the Status Bar and shows incoming and outgoing commits in the Source Control view. You can quickly sync or perform individual fetch, pull, and push operations.

![Screenshot of the Source Control view showing the sync button indicating outgoing and incoming changes.](images/overview/incoming-outgoing-changes.png)

Learn more about [working with repositories and remotes](/docs/sourcecontrol/repos-remotes.md).

### Resolve merge conflicts

When you encounter merge conflicts, VS Code highlights the conflicting files in the Source Control view. Open a file with conflicts to see inline conflict markers. You have several options to resolve the conflicts:

* Use inline editor actions to choose how to resolve the conflicts directly in the editor
* Use the 3-way merge editor for a side-by-side view of changes and merge result
* Use AI assistance to help resolve merge conflicts

![Screenshot of the 3-way merge editor.](images/overview/merge-editor-overview.png)

Once resolved, you can stage the files and commit the merge.

### Work with branches, worktrees, and stashes

VS Code supports multiple workflows for managing parallel development work. You can easily switch between branches within a single workspace.

![Screenshot of the branch Quick Pick showing options to switch to a branch or create a new branch.](images/overview/gitbranches.png)

To work with multiple branches simultaneously, you can use Git worktrees to create separate working directories for different branches.

![Screenshot of the worktrees submenu in the Source Control Repositories view.](images/overview/worktree-create.png)

Temporarily save uncommitted changes when you need to switch contexts quickly by using a Git stash: save, view, apply, or pop your stashed changes directly from the Source Control view.

### View commit history

It can be helpful to review the commit history to understand how your code has changed over time.

The Source Control Graph provides a visual representation of your branch structure and commit history, highlighting incoming and outgoing commits.

The Timeline view in the Explorer view shows the commit history for a specific file, allowing you to see how it has evolved. You can filter the timeline to show only Git commits or to also include local file changes.

![Screenshot of the timeline view showing file commit history.](images/overview/timeline-view.png)

Learn more about [using the Timeline view and reviewing changes](/docs/sourcecontrol/staging-commits.md#timeline-view-for-file-history).

## Working with GitHub pull requests and issues

VS Code integrates with GitHub to provide pull request and issue management directly in your editor. Install the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension to:

* Create, review, and merge pull requests
* View and manage issues
* Comment on and approve PRs without leaving VS Code
* Check out PR branches and review changes locally

Learn more about [working with GitHub in VS Code](/docs/sourcecontrol/github.md).

## Other source control providers

VS Code supports multiple source control providers. While Git support is built-in, you can [install extensions](https://marketplace.visualstudio.com/search?target=VSCode&category=SCM%20Providers&sortBy=Installs) for other version control systems like Azure DevOps, Subversion, or Mercurial.

Browse available SCM provider extensions in the Extensions view (`kb(workbench.view.extensions)`) by searching for `@category:"scm providers"`.

<div class="marketplace-extensions-scm-curated"></div>

## Next steps

* [Source Control Quickstart](/docs/sourcecontrol/quickstart.md) - Quickly get started with Git source control in VS Code

* [Intro Video - Git Version Control](/docs/introvideos/versioncontrol.md) - An introductory video providing an overview of VS Code Git support

* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Learn about cloning, publishing, and syncing with remote repositories
* [Working with GitHub](/docs/sourcecontrol/github.md) - Learn how to work with pull requests and issues in VS Code
* [Copilot in VS Code](/docs/copilot/overview.md) - Discover more AI-powered features beyond Git workflows
