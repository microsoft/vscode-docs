---
ContentId: 7E22CCC0-2AB8-4729-A4C9-BE2B16853820
DateApproved: 9/16/2026
MetaDescription: Explore Git in {% data variables.product.prodname_vscode_shortname %} and find guides to commits, collaboration, history, and troubleshooting.
Keywords:
- source control
- scm
- version control
- git
---
# Source control in {% data variables.product.prodname_vscode_shortname %}

{% data variables.product.prodname_vscode %} has built-in Git support for reviewing changes, creating commits, and collaborating on code without leaving your editor. Use this page to choose a starting point or find the guide for a specific task.

Git tracks versions of files in a repository. {% data variables.product.prodname_github %} is a service that hosts Git repositories and adds collaboration tools such as pull requests. You don't need a hosting account to use Git locally.

| What do you want to do? | Start here |
|------------------------|------------|
| Learn Git in the editor and make a first commit | [Source control quickstart](/docs/sourcecontrol/quickstart.md) |
| Work on an existing project | [Clone a repository](/docs/sourcecontrol/repos-remotes.md#clone-repositories) |
| Choose changes to save in Git history | [Stage and commit changes](/docs/sourcecontrol/staging-commits.md) |
| Share local commits with a team | [Push, pull, and sync](/docs/sourcecontrol/repos-remotes.md#push-pull-and-sync) |
| Undo or recover work | [Choose an undo action](/docs/sourcecontrol/staging-commits.md#undo-or-discard-changes) |
| Resolve an error or unexpected behavior | [Troubleshoot source control](/docs/sourcecontrol/troubleshooting.md) |

The editor and command-line Git use the same repository. You can work in either interface without importing or synchronizing changes between them.

## Prerequisites

To use Git features in {% data variables.product.prodname_vscode_shortname %}, you need:

* [Install Git](https://git-scm.com/download) on your machine. {% data variables.product.prodname_vscode_shortname %} uses this installation for Git operations.

* Configure the name and email recorded in your commits. These values identify the author, not your sign-in credentials:

    ```bash
    git config --global user.name "<your-name>"
    git config --global user.email "<your-email>"
    ```

Replace the placeholders with your name and email. The [quickstart](/docs/sourcecontrol/quickstart.md#prerequisites) walks through this setup. For background on Git concepts, see the [Git documentation](https://git-scm.com/doc).

## Get started with a repository

Open a repository folder with **File** > **Open Folder...** to use its Git history in {% data variables.product.prodname_vscode_shortname %}. If you don't have a local repository yet, choose one of these paths:

* **Start locally**: [Initialize a repository and make a first commit](/docs/sourcecontrol/quickstart.md) in a practice folder.

* **Work on an existing project**: [Clone a repository](/docs/sourcecontrol/repos-remotes.md#clone-repositories) from a Git host.

* **Browse without cloning**: Use the [GitHub Repositories extension](/docs/sourcecontrol/github.md#github-repositories-extension) for a virtual workspace. This workflow has different capabilities from a local checkout.

To share an existing local repository, [publish it](/docs/sourcecontrol/repos-remotes.md#publish-to-github) or [add a remote](/docs/sourcecontrol/repos-remotes.md#add-a-remote).

## Source control interface

Open the **Source Control** view (`kb(workbench.view.scm)`) to review and commit changes.

![Screenshot showing staged changes in the Source Control view and a side-by-side comparison in the diff editor.](images/overview/overview.png)

| Interface | Use it to |
|-----------|-----------|
| **Source Control** view | Review changed files, choose changes to stage, and commit them. |
| **Diff editor** | Compare versions of a file and stage individual changes. |
| **Source Control Graph** | Inspect commits, branches, and incoming or outgoing work. |
| **Timeline** view in Explorer | Inspect Git commits and local saves for one file. |
| **Status Bar** | Check the active branch and access synchronization actions. |

## Common workflows

### Review changes before committing

Select a file in **Changes** to review unstaged edits, or in **Staged Changes** to review what the next commit will contain. Learn how to [review diffs](/docs/sourcecontrol/staging-commits.md#review-changes-with-the-diff-editor), including partially staged files.

### Stage and commit changes

Staging selects the changes for your next commit. Committing records that snapshot in local Git history, but does not upload it to a server. Learn how to [stage files or individual lines and create a commit](/docs/sourcecontrol/staging-commits.md).

### Sync with remotes

Push uploads your commits, pull integrates remote commits, and sync pulls before pushing. Learn how to [choose a remote operation](/docs/sourcecontrol/repos-remotes.md#push-pull-and-sync) and inspect incoming work before integrating it.

### Resolve merge conflicts

When Git cannot combine changes automatically, use inline actions or the 3-way merge editor to resolve them. Follow the [conflict resolution guide](/docs/sourcecontrol/merge-conflicts.md) to review the result and complete or cancel the operation.

### Work with branches, worktrees, and stashes

Use a **branch** to develop a separate line of work, a **stash** to set aside uncommitted changes, or a **worktree** to check out another branch in a separate folder. Learn how to [manage branches, stashes, and worktrees](/docs/sourcecontrol/branches-worktrees.md).

### View commit history

Use the graph for repository history, Timeline for a file's history, and Git blame to identify who last changed a line. Learn how to [inspect commits, compare changes, and find line authorship](/docs/sourcecontrol/history.md).

## Working with GitHub pull requests and issues

Cloning and pushing to {% data variables.product.prodname_github %} use built-in Git support. To create or review pull requests and manage issues, install the GitHub Pull Requests and Issues extension. See [which integration to use](/docs/sourcecontrol/github.md#choose-a-github-workflow).

## Other source control providers

While Git support is built-in, you can [install extensions](https://marketplace.visualstudio.com/search?target=VSCode&category=SCM%20Providers&sortBy=Installs) for other version control systems, such as Subversion or Mercurial. Git repositories hosted on Azure DevOps use the built-in Git integration.

Browse available SCM provider extensions in the Extensions view (`kb(workbench.view.extensions)`) by searching for `@category:"scm providers"`.

<div class="marketplace-extensions-scm-curated"></div>

## Next steps

* [Make your first commit](/docs/sourcecontrol/quickstart.md) in a guided practice project.
* [Watch the Git introduction](/docs/introvideos/versioncontrol.md) for a visual walkthrough.
* [Check source control compatibility](/docs/sourcecontrol/faq.md) for Git clients, authentication, and other providers.
