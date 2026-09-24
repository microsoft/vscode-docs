---
ContentId: 5f83254d-2817-4398-9321-456789abcdef
DateApproved: 9/16/2026
MetaDescription: Make a first Git commit in {% data variables.product.prodname_vscode %} with a practice project, then optionally publish it online.
Keywords:
- source control
- scm
- version control
- git
---
# Quickstart: use source control in {% data variables.product.prodname_vscode_shortname %}

Create a small practice repository, save a file in Git history, and verify your first commit in {% data variables.product.prodname_vscode %}. You don't need a hosting account or an existing project. Publishing your work online is an optional final step.

<a name="option-a-clone-a-repository-locally"></a>

If you want to work on an existing project instead, [clone a repository](/docs/sourcecontrol/repos-remotes.md#clone-repositories), then follow [staging and committing changes](/docs/sourcecontrol/staging-commits.md). Choose a repository you can push to, or [fork it first](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) if you plan to contribute changes.

## Prerequisites

1. Install [{% data variables.product.prodname_vscode %}](https://code.visualstudio.com/download) and [Git](https://git-scm.com/downloads).

1. In {% data variables.product.prodname_vscode_shortname %}, select **Terminal** > **New Terminal**, then check that Git is available:

    ```bash
    git --version
    ```

    You should see a Git version number. If the command isn't found, restart {% data variables.product.prodname_vscode_shortname %} after installing Git. If it still fails, see [source control troubleshooting](/docs/sourcecontrol/troubleshooting.md).

1. Configure the author name and email for your commits. Replace the placeholders with your details:

    ```bash
    git config --global user.name "<your-name>"
    git config --global user.email "<your-email>"
    ```

    Skip this step if your identity is already configured. These values identify the author in Git history, not your sign-in credentials. The `--global` option sets the default for your repositories. If you publish commits, their author information is also shared.

<a name="option-b-initialize-a-repository-in-a-local-folder"></a>

## Step 1: Open a project

1. Create an empty folder named `git-practice` outside any existing Git repository.

1. Open the folder in {% data variables.product.prodname_vscode_shortname %} with **File** > **Open Folder...**.

    If prompted, confirm that you trust this folder you created. Only trust other projects when you know their source. Learn about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Open the **Source Control** view (`kb(workbench.view.scm)`) and select **Initialize Repository**.

    ![Screenshot showing the Initialize Repository button in the Source Control view.](images/quickstart/initialize-repository.png)

    If the button isn't visible, open the Command Palette (`kb(workbench.action.showCommands)`) and run **Git: Initialize Repository**.

Your folder is now a local Git repository. It has no commits yet, and nothing has been uploaded.

## Step 2: Make changes and review

1. In the Explorer view (`kb(workbench.view.explorer)`), create a file named `README.md`.

1. Add the following content and save the file (`kb(workbench.action.files.save)`):

    ```markdown
    # Git practice

    My first Git repository.
    ```

1. Open the **Source Control** view. `README.md` appears under **Changes**, marked **U** for untracked. Git can see the new file, but it isn't part of a commit.

1. Select `README.md` under **Changes** to review its contents.

    For a new file, all its contents are new. For files already tracked by Git, this view shows the edits that aren't staged yet.

<!-- TODO: Capture the git-practice repository with README.md under Changes and its new contents open for review. -->

Saving writes the file to disk. It does not create a Git commit.

## Step 3: Stage and commit

Staging selects the version of a file to include in the next commit. Committing records those staged changes in local Git history.

1. Hover over `README.md` in **Changes** and select **+** (**Stage Changes**).

    The file moves to **Staged Changes**. Select it there to review the content that will be committed.

1. Enter `Add practice README` in the commit message input box at the top of the Source Control view.

1. Select **Commit**.

    `README.md` is no longer listed as changed. Its contents are still in your folder and are now recorded in Git history.

1. Expand **Source Control Graph** in the Source Control view and find the `Add practice README` commit.

    Select the commit to inspect the file it contains. This confirms that your first commit succeeded.

<!-- TODO: Capture the git-practice repository after the first commit, showing Add practice README in the Source Control Graph and no pending file changes. -->

> [!NOTE]
> To remove a file from staging without losing edits, select **-** (**Unstage Changes**) beside it in **Staged Changes**. This is different from **Discard Changes**, which removes edits. See [undo and discard options](/docs/sourcecontrol/staging-commits.md#undo-or-discard-changes) before removing work.

You can stop here and continue using Git locally. To practice again, add a line to `README.md`, save it, review the **M** (modified) entry, then stage and commit the change.

## Step 4: Sync with the server

This step is optional and requires a {% data variables.product.prodname_github %} account. Publishing creates a repository in your account and uploads your local commits.

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and run **Publish to GitHub**.

1. Sign in when prompted and return to {% data variables.product.prodname_vscode_shortname %}.

1. Enter an available repository name, such as `git-practice`, and choose a **private** repository for this exercise.

1. When publishing finishes, open the repository on {% data variables.product.prodname_github %}. Verify that it contains `README.md` and your commit.

After publishing, future commits are still local until you push them. In the Source Control view, select **More Actions** (**...**) > **Push** to upload commits. **Sync Changes** does more: it pulls remote changes before pushing your commits.

If a push fails, don't repeatedly sync or force-push. Use [source control troubleshooting](/docs/sourcecontrol/troubleshooting.md) to identify the cause.

## Next steps

* [Stage selected changes](/docs/sourcecontrol/staging-commits.md#stage-specific-lines-or-code-blocks) to make focused commits.
* [Create a branch](/docs/sourcecontrol/branches-worktrees.md#create-new-branches) to work on a separate feature.
* [Fetch, pull, and push](/docs/sourcecontrol/repos-remotes.md#push-pull-and-sync) when collaborating with others.
