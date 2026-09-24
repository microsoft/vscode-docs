---
ContentId: a9b2c3d4-e5f6-7890-ab12-cd3456789012
DateApproved: 9/16/2026
MetaDescription: Create and switch Git branches, stash changes, and manage worktrees in {% data variables.product.prodname_vscode %}.
Keywords:
- source control
- scm
- version control
- git
---
# Git branches and worktrees in {% data variables.product.prodname_vscode_shortname %}

Create and switch branches, set aside unfinished changes, and work on multiple branches in separate folders with the Git tools in {% data variables.product.prodname_vscode_shortname %}.

Choose the workflow for your task:

* [Use branches](#working-with-branches) to keep separate lines of development and switch between them in one folder.
* [Use a stash](#manage-stashes) to set aside uncommitted changes without creating a commit.
* [Use worktrees](#working-with-git-worktrees) to keep multiple branches checked out in separate folders at the same time.

## Working with branches

Branches are lightweight, movable pointers to specific commits in your Git history. Create a branch to develop a feature independently, then merge it into a target branch when the work is ready.

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

To create a branch from your current commit (`HEAD`):

1. Run **Git: Create Branch...** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Enter a name for your new branch. Use descriptive names like `feature/user-authentication` or `bugfix/login-error`.

To start from a different branch or tag:

1. Run **Git: Create Branch From...** from the Command Palette.

1. Select the source branch or tag, such as `main` or `origin/main`.

1. Enter the new branch name.

Both commands switch to the new branch after creation. You can also select the branch name in the Status Bar and choose **Create new branch...** or **Create new branch from...**.

![Screenshot showing the branch picker with Create new branch and Create new branch from actions.](images/branches-worktrees/scm-create-branch.png)

{% data variables.product.prodname_vscode_shortname %} can generate random branch names. Configure this with the `setting(git.branchRandomName.enable)` and `setting(git.branchRandomName.dictionary)` settings.

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
1. Run **Git: Merge...** from the Command Palette.
1. Select the branch to merge.

To publish a branch to your remote repository, use the **Publish Branch** action.

{% data variables.product.prodname_vscode_shortname %} shows the merge result in the Source Control view. If there are conflicts, {% data variables.product.prodname_vscode_shortname %} highlights them and provides tools to resolve them. Learn more about [resolving merge conflicts](/docs/sourcecontrol/merge-conflicts.md).

## Manage stashes

A Git stash temporarily stores selected uncommitted changes. Use a stash when you need to switch branches or handle another task without creating a commit for unfinished work.

You can invoke stash commands from the Command Palette or from the **More Actions** (...) menu in the Source Control view.

### Create a stash

To stash your current changes:

1. Open the Command Palette (`kb(workbench.action.showCommands)`).

1. Run one of the following commands:

    * **Git: Stash** to store tracked changes.
    * **Git: Stash (Include Untracked)** to also store new, untracked files.
    * **Git: Stash Staged** to store only the changes in the **Staged Changes** section. This command requires Git 2.35 or later.

1. Enter an optional message that describes the stashed work.

Git stores the selected changes and removes them from the working directory. Changes outside the chosen scope remain: for example, **Git: Stash** leaves untracked files in place, and **Git: Stash Staged** leaves unstaged changes.

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

Use [Git worktrees](https://git-scm.com/docs/git-worktree) to work on another branch without changing the files or unfinished work in your current folder.

### Understanding worktrees

A Git repository normally has one working directory, called the primary worktree. A linked worktree is another working directory for the same repository. Each worktree checks out a branch in its own folder, so you can work on multiple branches at the same time without switching the files in your primary worktree.

The following table shows how the Git concepts relate:

| Concept | What it represents |
|---------|--------------------|
| Repository | The shared Git history, branches, tags, and remotes. |
| Branch | A movable pointer to a commit in the repository history. |
| Worktree | A working directory with its own checked-out files, staging area, and uncommitted changes. |

Worktrees share the repository history, but they don't share working files or uncommitted changes. Git also prevents the same local branch from being checked out in more than one worktree at a time.

For example, your primary worktree might have `main` checked out while a linked worktree contains the `feature/theme-toggle` branch. To bring work back to `main`, merge the feature branch's commits or [migrate its uncommitted changes](#compare-and-migrate-changes-from-a-worktree).

Worktrees are especially useful to:

* Develop multiple features in separate folders.
* Run different versions of an application side by side.
* Compare implementations across branches.
* Keep changes from parallel [agent sessions](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) separate.

### Create a worktree

To create a new worktree in {% data variables.product.prodname_vscode_shortname %}:

1. Open the **Source Control Repositories** view from the Source Control view.

    ![Screenshot showing the Source Control Repositories view with multiple repositories listed.](images/branches-worktrees/source-control-view-repositories.png)

1. Select your repository, open the **More Actions (...)** menu, and choose **Worktrees** > **Create Worktree**.

    ![Screenshot showing the worktree context menu in the Source Control Repositories view.](images/branches-worktrees/worktree-create.png)

1. Follow the prompts to choose a branch and location for the new worktree.

    {% data variables.product.prodname_vscode_shortname %} creates a new folder for the worktree at the specified location and checks out the selected branch into that folder.

The new worktree appears as a separate entry in the **Source Control Repositories** view.

### Switch between worktrees

{% data variables.product.prodname_vscode_shortname %} can display multiple repositories (including worktrees) simultaneously:

* Each worktree appears as a separate repository in the **Source Control Repositories** view
* You can open multiple {% data variables.product.prodname_vscode_shortname %} windows, each pointing to a different worktree
* Use **File** > **Open Recent** to quickly switch between worktree directories

### Open a worktree

There are multiple ways to open a worktree:

* Directly open the folder associated with the worktree in {% data variables.product.prodname_vscode_shortname %}. {% data variables.product.prodname_vscode_shortname %} automatically detects that it's a worktree of an existing repository.

* Right-click the worktree in the Source Control Repositories view and select **Open Worktree in New Window** or **Open Worktree in Current Window**.

### Compare and migrate changes from a worktree

Use **Compare with Workspace** to review a changed worktree file against the primary worktree. Use **Git: Migrate Worktree Changes...** to move uncommitted changes, including untracked files, into the primary worktree. Migration doesn't merge commits. To bring in committed changes, [merge the worktree's branch](#merge-and-publish-branches) instead.

1. In a window with the primary repository open, make sure both it and the worktree appear in the **Source Control Repositories** view. If needed, [turn on worktree detection](#automatically-detect-worktrees).

1. Select the worktree, then right-click a changed file in the Source Control view and select **Compare with Workspace**.

    ![Screenshot showing the compare with workspace option in the worktree context menu and side-by-side diff view.](images/branches-worktrees/worktree-compare-changes.png)

1. Run **Git: Migrate Worktree Changes...** from the Command Palette. If prompted, select the primary repository as the destination and the worktree to migrate from.

1. Review the confirmation and select **Proceed**. After a successful migration, the changes are in the primary worktree and are removed from the source worktree.

If migration reports overlapping local changes, commit or stash those changes in the destination before retrying. If there are merge conflicts, resolve them before committing.

### Remove a worktree

Remove a linked worktree when you no longer need its working directory:

1. Review the worktree's changes in the Source Control view. Commit, stash, or copy out any changes and local files you want to keep.

1. Open the primary repository's folder in {% data variables.product.prodname_vscode_shortname %}, rather than the worktree you want to remove.

1. Run **Git: Delete Worktree...** from the Command Palette. Select the repository if prompted, then select the worktree to delete. Check the displayed folder path before selecting it.

Deleting a worktree removes its working directory, not its branch. Commits on that branch remain in the shared repository history. Deleting the branch is a [separate action](#rename-and-delete-branches).

> [!CAUTION]
> Removing a worktree also removes ignored files in its folder, even when Git reports no changes. If the worktree contains modified or untracked files, {% data variables.product.prodname_vscode_shortname %} offers **Force Delete**. Cancel and preserve those files unless you intend to discard them. **Force Delete** removes the worktree and its uncommitted changes.

### Include files when creating a worktree

When you create a worktree, Git doesn't copy files that are excluded by `.gitignore`, such as local configuration files, environment files, or installed dependencies. This behavior also applies when {% data variables.product.prodname_vscode_shortname %} creates a worktree for an agent session.

Use the `setting(git.worktreeIncludeFiles)` setting (Experimental) to configure [glob patterns](https://aka.ms/vscode-glob-patterns) for files and folders to copy into a new worktree. A file is copied only when it matches one of the patterns and is also listed in `.gitignore`.

A common use is to copy the `node_modules` folder into each new worktree. This way, you can start working right away without having to reinstall dependencies. For example, configure the setting as follows to also copy a local `.env` file:

```json
"git.worktreeIncludeFiles": [
    ".env",
    "node_modules/**"
]
```

For agent worktrees, only include files that the agent can safely access.

### Automatically detect worktrees

By default, {% data variables.product.prodname_vscode_shortname %} lists the worktrees that you create from the **Source Control Repositories** view. To also automatically detect worktrees that already exist in your repository, enable the `setting(git.detectWorktrees)` setting. When this setting is enabled, {% data variables.product.prodname_vscode_shortname %} scans the repository for worktrees and shows them in the **Source Control Repositories** view.

To avoid scanning a large number of worktrees, {% data variables.product.prodname_vscode_shortname %} limits the number of detected worktrees. Use the `setting(git.detectWorktreesLimit)` setting to change this limit. The default value is 50.

## Next steps

* [Inspect branch and commit history](/docs/sourcecontrol/history.md).
* [Stage and commit changes](/docs/sourcecontrol/staging-commits.md).
* [Publish and synchronize branches with a remote](/docs/sourcecontrol/repos-remotes.md).