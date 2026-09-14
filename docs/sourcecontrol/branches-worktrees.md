---
ContentId: a9b2c3d4-e5f6-7890-ab12-cd3456789012
DateApproved: 9/9/2026
MetaDescription: Manage Git branches and worktrees in {% data variables.product.prodname_vscode %} to develop in parallel, compare changes, and move work between checkouts.
Keywords:
- source control
- scm
- version control
- git
---
# Git branches and worktrees in {% data variables.product.prodname_vscode_shortname %}

Git branches enable you to work on different features or experiments simultaneously without affecting your main codebase. {% data variables.product.prodname_vscode_shortname %} provides tools for branch management, Git worktrees for parallel development, and stash management for temporary changes.

This article covers working with branches, worktrees, and stashes in {% data variables.product.prodname_vscode_shortname %} to manage parallel development work.

## Working with branches

Branches are lightweight, movable pointers to specific commits in your Git history. They enable you to diverge from the main line of development and work on features independently.

For example, suppose you're working on a web application and need to add user authentication while also fixing a bug in the payment system. You can create two branches:

* `feature/user-authentication` - contains your login and signup functionality
* `bugfix/payment-validation` - contains fixes for payment processing errors

Each branch maintains its own set of changes without affecting the other. You can switch between branches to work on different tasks, and later merge the completed branches back into your main branch.

### View current branch

The current branch appears in several places in {% data variables.product.prodname_vscode_shortname %}:

* **Status Bar**: shows the current branch name and provides quick branch switching
* **Repositories view**: displays the current branch in the repository header
* **Source Control Graph**: visually represents branch relationships and history

![Screenshot showing the current branch displayed in the Status Bar and Source Control view.](images/branches-worktrees/current-branch.png)

### Switch between branches

Switching to a different branch is called "checking out" a branch in Git terminology. When you check out a branch, Git updates your working directory to match that branch's state.

To switch to a different branch:

1. Select the branch name in the Status Bar, or run the **Git: Checkout to** command from the Command Palette (`kb(workbench.action.showCommands)`).

2. Choose from the list of available branches:
   * **Local branches**: Branches that exist on your local machine
   * **Remote branches**: Branches from the remote repository that you can check out locally
   * **Recent branches**: Recently used branches

> [!TIP]
> If you have uncommitted changes when switching branches, Git might prevent the switch to avoid losing work. Consider committing your changes or using a [stash](#manage-stashes) before switching.

### Create new branches

Create a new branch to start working on a feature or experiment:

1. Select the branch name in the Status Bar or run **Git: Create Branch** from the Command Palette.

1. Enter a name for your new branch. Use descriptive names like `feature/user-authentication` or `bugfix/login-error`.

    > [!TIP]
    > {% data variables.product.prodname_vscode_shortname %} can generate random branch names for you. Configure this with the `setting(git.branchRandomName.enable)` and `setting(git.branchRandomName.dictionary)` settings.

1. Choose the source branch (usually `main` or `develop`) from which to create the new branch.

![Screenshot showing the create branch dialog with branch name input and source branch selection.](images/branches-worktrees/scm-create-branch.png)

{% data variables.product.prodname_vscode_shortname %} switches to the new branch after creation.

> [!TIP]
> If you use the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, you can create branches directly from GitHub issues, which gets you started working in a new local branch and automatically prefills the pull request for you.

### Rename and delete branches

To rename the current branch:

1. Run **Git: Rename Branch** from the Command Palette or select it from the **More Actions** (...) menu.
1. Enter the new branch name.

To delete a branch:

1. Switch to a different branch (you can't delete the currently active branch).
1. Run **Git: Delete Branch** from the Command Palette or select it from the **More Actions** (...) menu.
1. Select the branch to delete from the list.

You can also delete a remote branch by using the matching **Delete Remote Branch** action.

> [!CAUTION]
> Deleting a branch permanently removes it from your local repository. Make sure the branch has been merged or you no longer need the changes.

### Merge and publish branches

When your feature is complete, merge it back into the main branch:

1. Switch to the target branch (usually `main` or `develop`).
1. Run **Git: Merge Branch** from the Command Palette.
1. Select the branch to merge.

To publish a branch to your remote repository, use the **Publish Branch** action.

{% data variables.product.prodname_vscode_shortname %} shows the merge result in the Source Control view. If there are conflicts, {% data variables.product.prodname_vscode_shortname %} highlights them and provides tools to resolve them. Learn more about [resolving merge conflicts](/docs/sourcecontrol/merge-conflicts.md).

## Manage stashes

A Git stash temporarily stores uncommitted changes and returns your working directory to a clean state. Use a stash when you need to switch branches or handle another task without creating a commit for unfinished work.

You can invoke stash commands from the Command Palette or from the **More Actions** (...) menu in the Source Control view.

### Create a stash

To stash your current changes:

1. Open the Command Palette (`kb(workbench.action.showCommands)`).

1. Run one of the following commands:

    * **Git: Stash** to store tracked changes.
    * **Git: Stash (Include Untracked)** to also store new, untracked files.
    * **Git: Stash Staged** to store only the changes in the **Staged Changes** section. This command requires Git 2.35 or later.

1. Enter an optional message that describes the stashed work.

Git stores the changes and restores your working directory to the state of the current commit.

### View and restore stashed changes

Run **Git: View Stash** from the Command Palette to inspect the files in a stash before restoring it.

To restore stashed changes, choose one of these commands from the Command Palette or the **More Actions** (...) menu:

* **Git: Apply Stash...** restores a selected stash and keeps it in the stash list.
* **Git: Pop Stash...** restores a selected stash and removes it from the stash list.
* **Git: Apply Latest Stash** or **Git: Pop Latest Stash** performs the corresponding action on the most recent stash.

If the stashed changes conflict with changes in your working directory, resolve the conflicts before continuing. Learn more about [resolving merge conflicts](/docs/sourcecontrol/merge-conflicts.md).

### Delete stashes

Run **Git: Drop Stash...** to permanently delete a selected stash, or run **Git: Drop All Stashes...** to delete every stash in the repository.

> [!CAUTION]
> Dropping a stash is difficult to undo. Verify that you no longer need the changes before you delete it.

## Working with Git worktrees

{% data variables.product.prodname_vscode_shortname %} has built-in support for [Git worktrees](https://git-scm.com/docs/git-worktree), making it easy to manage and work with multiple branches at the same time.

### Understanding worktrees

A Git repository normally has one working directory, called the primary worktree. A linked worktree is another working directory for the same repository. Each worktree checks out a branch in its own folder, so you can work on multiple branches at the same time without switching the files in your primary worktree.

The following table shows how the Git concepts relate:

| Concept | What it represents |
|---------|--------------------|
| Repository | The shared Git history, branches, tags, and remotes. |
| Branch | A movable pointer to a commit in the repository history. |
| Worktree | A working directory with its own checked-out files, staging area, and uncommitted changes. |

Worktrees share the repository history, but they don't share working files or uncommitted changes. Git also prevents the same local branch from being checked out in more than one worktree at a time.

For example, your primary worktree might have `main` checked out while a linked worktree contains the `feature/theme-toggle` branch. Changes in the feature worktree don't appear in the primary worktree until you merge or migrate them.

Worktrees are especially useful to:

* Develop multiple features in separate folders.
* Run different versions of an application side by side.
* Compare implementations across branches.
* Keep changes from parallel [agent sessions](/docs/agents/concepts/agent-harnesses.md#code-isolation) separate.

### Create a worktree

To create a new worktree in {% data variables.product.prodname_vscode_shortname %}:

1. Open the **Source Control Repositories** view from the Source Control view.

    ![Screenshot showing the Source Control Repositories view with multiple repositories listed.](images/branches-worktrees/source-control-view-repositories.png)

1. Select your repository, open the **More Actions (...)** menu, and choose **Worktrees** > **Create Worktree**.

    ![Screenshot showing the worktree context menu in the Source Control Repositories view.](images/branches-worktrees/worktree-create.png)

1. Follow the prompts to choose a branch and location for the new worktree.

    {% data variables.product.prodname_vscode_shortname %} creates a new folder for the worktree at the specified location and checks out the selected branch into that folder.

The new worktree appears as a separate entry in the **Source Control Repositories** view.

### Include files when creating a worktree

When you create a worktree, Git doesn't copy files that are excluded by `.gitignore`, such as local configuration files, environment files, or installed dependencies. This behavior also applies when {% data variables.product.prodname_vscode_shortname %} creates a worktree for an agent session.

Use the `setting(git.worktreeIncludeFiles)` setting to configure [glob patterns](https://aka.ms/vscode-glob-patterns) for files and folders to copy into a new worktree. A file is copied only when it matches one of the patterns and is also listed in `.gitignore`.

A common use is to copy the `node_modules` folder into each new worktree. This way, you can start working right away without having to reinstall dependencies. For example, configure the setting as follows to also copy a local `.env` file:

```json
"git.worktreeIncludeFiles": [
    ".env",
    "node_modules/**"
]
```

For agent worktrees, only include files that the agent can safely access.

### Switch between worktrees

{% data variables.product.prodname_vscode_shortname %} can display multiple repositories (including worktrees) simultaneously:

* Each worktree appears as a separate repository in the **Source Control Repositories** view
* You can open multiple {% data variables.product.prodname_vscode_shortname %} windows, each pointing to a different worktree
* Use **File** > **Open Recent** to quickly switch between worktree directories

### Open a worktree

There are multiple ways to open a worktree:

* Directly open the folder associated with the worktree in {% data variables.product.prodname_vscode_shortname %}. {% data variables.product.prodname_vscode_shortname %} automatically detects that it's a worktree of an existing repository.

* Right-click the worktree in the Source Control Repositories view and select **Open Worktree in New Window** or **Open Worktree in Current Window**.

* Run the **Git: Open Worktree in Current Window** or **Git: Open Worktree in New Window** command in the Command Palette and select the desired worktree.

### Automatically detect worktrees

By default, {% data variables.product.prodname_vscode_shortname %} lists the worktrees that you create from the **Source Control Repositories** view. To also automatically detect worktrees that already exist in your repository, enable the `setting(git.detectWorktrees)` setting. When this setting is enabled, {% data variables.product.prodname_vscode_shortname %} scans the repository for worktrees and shows them in the **Source Control Repositories** view.

To avoid scanning a large number of worktrees, {% data variables.product.prodname_vscode_shortname %} limits the number of detected worktrees. Use the `setting(git.detectWorktreesLimit)` setting to change this limit. The default value is 50.

### Compare and migrate changes from a worktree

When you make changes in a worktree, you can compare those changes with your main workspace and bring worktree changes back into your main repository.

1. In the Source Control view, right-click a changed file in the worktree and select **Compare with Workspace** to see the differences side-by-side.

    ![Screenshot showing the compare with workspace option in the worktree context menu and side-by-side diff view.](images/branches-worktrees/worktree-compare-changes.png)

1. After reviewing, use the **Migrate Worktree Changes** command from the Command Palette to merge all changes from a worktree into your current workspace.

## Next steps

* [Staging and Committing](/docs/sourcecontrol/staging-commits.md) - Learn about committing changes within branches
* [Source Control History](/docs/sourcecontrol/history.md) - Inspect branch and commit history
* [Merge Conflicts](/docs/sourcecontrol/merge-conflicts.md) - Handle conflicts when merging branches
* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Work with remote branches and collaboration
* [Collaborate on GitHub](/docs/sourcecontrol/github.md) - Use GitHub pull requests with your branch workflow