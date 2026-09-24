---
ContentId: 8a7c3f4e-5b2d-4c9a-8e1f-6d3a2b1c0e9f
MetaDescription: Resolve Git setup, tracking, authentication, and push failures in {% data variables.product.prodname_vscode %} with targeted fixes and Git logs.
DateApproved: 9/16/2026
Keywords:
- source control
- git
- troubleshooting
- authentication
- logs
---
# Troubleshoot source control

Use this article to resolve common Git problems in {% data variables.product.prodname_vscode %}. Start with the symptom that matches your problem, then use the Git Output window to collect more information if the suggested fix doesn't resolve it.

## Git not found

If {% data variables.product.prodname_vscode_shortname %} reports 'Git not found', it can't locate a Git executable in the environment where your repository is open.

1. Run `git --version` in a terminal in that environment. For a remote workspace, check the remote environment, not only your local machine.

1. If the command isn't found, follow the [Git installation prerequisites](/docs/sourcecontrol/quickstart.md#prerequisites), then restart {% data variables.product.prodname_vscode_shortname %}.

1. If Git works in the terminal but not in {% data variables.product.prodname_vscode_shortname %}, check the [Git Output window](#open-the-git-output-window) for the executable paths it tried. If needed, set `setting(git.path)` to the full path of the Git executable, then restart {% data variables.product.prodname_vscode_shortname %}.

When detection succeeds, the Git Output window shows the Git executable and version, and the Source Control view can open your repository.

## A commit fails because user.name or user.email is missing

The error 'Make sure you configure your "user.name" and "user.email" in git' means Git doesn't have the author identity needed to create a commit. Signing in to your Git hosting service doesn't configure this identity.

1. In a terminal opened in the repository folder, check the effective values:

    ```bash
    git config --get user.name
    git config --get user.email
    ```

1. Set any missing or incorrect values for this repository:

    ```bash
    git config user.name "<your-name>"
    git config user.email "<your-email>"
    ```

    These commands affect only the current repository. To use the same identity across repositories, follow the [global configuration steps](/docs/sourcecontrol/quickstart.md#prerequisites).

1. Retry the commit. The new commit uses the configured name and email. This doesn't change existing commits.

## Ignored files still appear in Source Control

Git ignore rules apply to untracked files. Adding a file to `.gitignore` doesn't stop Git from tracking a file that is already committed or staged.

1. In a terminal opened in the repository folder, check whether the file is in Git's index:

    ```bash
    git ls-files -- "<file>"
    ```

1. If the command lists the file, Git is tracking it. If you only staged a new file, [unstage it](/docs/sourcecontrol/staging-commits.md#unstage-changes) and add an ignore rule. If the file is already committed, keep it tracked or use the procedure below to stop tracking it.

1. If the command doesn't list the file, inspect the ignore rule that applies:

    ```bash
    git check-ignore -v -- "<file>"
    ```

    Correct missing or negated patterns in `.gitignore`. A pattern beginning with `!` makes a matching file eligible for inclusion again. See the [Git ignore pattern reference](https://git-scm.com/docs/gitignore) for pattern syntax. After a matching ignore rule applies, the untracked file no longer appears as a change.

The `setting(files.exclude)` setting hides files in the Explorer. It doesn't change Git tracking or ignore rules.

### Stop tracking a file without deleting the local copy

Use this procedure only when an already committed file should no longer be part of the repository:

> [!CAUTION]
> Removing a tracked file from Git's index stages a deletion from the repository, not from your working folder. Committing and pushing it changes tracking for everyone. When collaborators pull the commit, Git can remove their tracked copies. Coordinate this change before sharing it. The file remains in earlier commits.

1. Add an ignore rule for the file to `.gitignore`.

1. Remove the file from Git's index while keeping your working copy:

    ```bash
    git rm --cached -- "<file>"
    ```

1. Review and commit `.gitignore` and the staged deletion when you're ready to share the tracking change.

After the commit, your local file remains on disk and is ignored. To hide a file from the Explorer without changing repository tracking, use `setting(files.exclude)` instead.

## Push is rejected because the remote has new commits

A rejection containing `non-fast-forward` or `fetch first` means the remote branch has commits that your local branch doesn't contain. Git rejects the push to avoid overwriting remote history.

1. [Fetch the remote commits](/docs/sourcecontrol/repos-remotes.md#fetch-commits) and [review incoming and outgoing history](/docs/sourcecontrol/repos-remotes.md#review-incoming-and-outgoing-history). Confirm that you're working on the intended branch and remote.

1. Commit your local changes or [stash unfinished work](/docs/sourcecontrol/branches-worktrees.md#manage-stashes) before integrating the incoming commits.

1. [Pull the remote commits](/docs/sourcecontrol/repos-remotes.md#pull-commits), using your team's merge or rebase workflow. If conflicts occur, [resolve them](/docs/sourcecontrol/merge-conflicts.md) and [complete the operation](/docs/sourcecontrol/merge-conflicts.md#complete-the-merge-operation).

1. [Push again](/docs/sourcecontrol/repos-remotes.md#push-commits). The push can succeed once your branch includes the remote history and you have permission to update it.

> [!CAUTION]
> Don't force push to bypass this rejection. A force push can overwrite commits that others depend on. If you intentionally rewrote shared history, agree on a recovery plan with your collaborators first.

If the error instead mentions permissions or branch protection, use the next section rather than pulling repeatedly.

## Permission denied, read-only repository, or protected branch

These errors have different causes. Check the [Git Output window](#open-the-git-output-window) for the failing command and the full error. Run `git remote -v` in the repository folder to confirm that the fetch and push URLs point to the intended repository.

| Symptom | Diagnosis and action |
|---------|----------------------|
| `Authentication failed` or `Permission denied (publickey)` | Git couldn't authenticate. For HTTPS, check the account and credentials stored by your [credential helper](/docs/sourcecontrol/repos-remotes.md#credential-helpers). For SSH, check your key and agent using the [SSH authentication guidance](/docs/sourcecontrol/faq.md#authentication). Retry after correcting the credentials. |
| The remote reports that you don't have permission to push | Your account might have read access but not write access, or Git might be using credentials for the wrong account. Update the stored credentials, request write access from a maintainer, or push a branch to a fork you own. |
| The remote rejects an update to a protected branch or reports a repository rule violation | Authentication succeeded, but the host's policy blocks the update. Push your work to an allowed feature branch and open a pull request, or follow the checks required by your repository. Changing credentials or force pushing doesn't bypass these rules. |
| A local path reports `Permission denied` or `Read-only file system` | Git can't write to the working folder or `.git` directory. Check filesystem permissions, ownership, and whether the drive is mounted read-only. Restore write access for your account before retrying. |

Retry the failed operation after correcting its cause. Successful authentication doesn't grant repository write access or override branch protection.

## Push, pull, or sync doesn't finish

A Git operation that doesn't finish often indicates that Git is waiting for authentication but the credential prompt isn't visible.

1. Open the Git Output window and check the most recent command for an authentication error.

1. Configure a [Git credential helper](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git) for your operating system.

1. Run the operation again and complete any sign-in prompt.

[Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager) is the recommended credential helper for Windows, macOS, and Linux. Git for Windows includes Git Credential Manager.

## Git authentication prompts appear repeatedly

If `setting(git.autofetch)` is on, background fetches can trigger repeated authentication prompts even when you haven't selected a Git action. Automatic fetching is off by default in the editor window and on by default in the {% data variables.copilot.agents_window %}.

Check the Git Output window to see which command triggered the prompt. Configure a [Git credential helper](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git) to store valid credentials for the remote. If you don't want background fetches, turn off `setting(git.autofetch)`. This stops those fetches but doesn't fix credentials needed for manual fetch, pull, or push operations.

## Git actions are unavailable after initializing a repository

Push, pull, and sync require a remote repository. Initializing a local repository doesn't create a remote. To connect to an existing hosted repository, [add a remote](/docs/sourcecontrol/repos-remotes.md#add-a-remote). To create a new {% data variables.product.prodname_github %} repository, use [Publish to GitHub](/docs/sourcecontrol/repos-remotes.md#publish-to-github).

After adding a remote, [push your committed branch](/docs/sourcecontrol/repos-remotes.md#push-commits) and accept the prompt to publish it if it has no upstream. The branch then has an upstream for synchronization. Local actions, such as staging and committing, don't require a remote.

## {% data variables.product.prodname_vscode_shortname %} reports that a repository is potentially unsafe

Git blocks operations in a repository owned by a different operating-system user. This protects you from running Git configuration or hooks from an untrusted repository.

Select **Manage Unsafe Repositories** in the Source Control view or notification. Review the repository location before you mark it as safe. Marking a repository as safe adds its location to Git's [`safe.directory` configuration](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory).

On Windows, this can happen when you clone a repository from an application running as administrator and later open it from an application that isn't running as administrator.

## {% data variables.product.prodname_vscode_shortname %} doesn't detect a repository in a parent folder

{% data variables.product.prodname_vscode_shortname %} doesn't automatically open Git repositories in parent folders because doing so can expose changes outside the folder you intended to work with.

When {% data variables.product.prodname_vscode_shortname %} detects a repository in a parent folder, use the notification or Source Control welcome view to open it. To always open repositories in parent folders, set the `setting(git.openRepositoryInParentFolders)` setting to `always`.

## Open the Git Output window

{% data variables.product.prodname_vscode_shortname %} uses your machine's Git installation for source control operations. The Git Output window records the Git executable, commands, errors, timestamps, and command duration.

Open the Git Output window in one of these ways:

* In the Source Control view, select **More Actions** (**...**) > **Show Git Output**.
* Run **Git: Show Git Output** from the Command Palette (`kb(workbench.action.showCommands)`).
* Open the Output panel (`kb(workbench.action.output.toggleOutput)`) and select **Git** from the channel list.

![Screenshot showing the Git output channel in the Output panel.](images/troubleshooting/git-output.png)

Review the most recent command and error message. The first error after the command is usually more useful than later errors that result from it.

> [!TIP]
> By default, the Git Output window shows standard output only when a command fails. Use the `setting(git.commandsToLog)` setting to choose commands that should always log their standard output.

## Filter and search Git logs

Use the Output panel filters to reduce the amount of log information:

* Select a log level such as `trace`, `debug`, `info`, `warning`, or `error`. The default level is `info`.
* Select a category such as `git` or `repository`. Select `git` to focus on commands executed by Git.

![Screenshot showing log level and category filters in the Git Output window.](images/troubleshooting/git-output-filters.png)

Use the search box (`kb(actions.find)`) to find a command, repository path, or error. The search box supports regular expressions.

![Screenshot showing search results in the Git Output window.](images/troubleshooting/git-output-search.png)

## Collect trace logs

Enable trace logging when the regular Git output doesn't contain enough information:

1. Open the Git Output window.

1. Select the gear icon in the Output panel header.

1. Select **Trace**.

    ![Screenshot showing the trace log level selected in the Git Output window.](images/troubleshooting/git-output-log-level.png)

1. Reproduce the problem and review the new log entries.

Trace logs can contain repository paths, remote URLs, branch names, and other development information. Review the output and remove sensitive information before you share it.

## Next steps

* [Choose a remote operation](/docs/sourcecontrol/repos-remotes.md#push-pull-and-sync) to fetch, pull, or push without unintended synchronization.
* [Source control FAQ](/docs/sourcecontrol/faq.md) answers product support and compatibility questions.
* [Git documentation](https://git-scm.com/doc) provides reference details for Git commands and configuration.
