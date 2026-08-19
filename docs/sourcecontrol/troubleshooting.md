---
ContentId: 8a7c3f4e-5b2d-4c9a-8e1f-6d3a2b1c0e9f
MetaDescription: Diagnose Git authentication, repository detection, trust, and synchronization problems in Visual Studio Code with targeted fixes and Git logs.
DateApproved: 8/19/2026
Keywords:
- source control
- git
- troubleshooting
- authentication
- logs
---
# Troubleshoot source control

Use this article to resolve common Git problems in Visual Studio Code. Start with the symptom that matches your problem, then use the Git Output window to collect more information if the suggested fix doesn't resolve it.

## Push, pull, or sync doesn't finish

A Git operation that doesn't finish often indicates that Git is waiting for authentication but the credential prompt isn't visible.

1. Open the Git Output window and check the most recent command for an authentication error.

1. Configure a [Git credential helper](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git) for your operating system.

1. Run the operation again and complete any sign-in prompt.

[Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager) is the recommended credential helper for Windows, macOS, and Linux. Git for Windows includes Git Credential Manager.

## Git authentication prompts appear repeatedly

VS Code automatically fetches remote changes to show incoming commits. The authentication prompt comes from your Git credential helper, not from VS Code.

Configure a [Git credential helper](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git) to store your credentials. If you don't want VS Code to fetch in the background, turn off the `setting(git.autofetch)` setting.

## Git actions are unavailable after initializing a repository

Push, pull, and sync require a remote repository. If you initialized a local repository, [add a remote](/docs/sourcecontrol/repos-remotes.md#add-a-remote) or use **Publish to GitHub** in the Source Control view.

After the branch has an upstream remote, VS Code makes the synchronization actions available.

## VS Code reports that a repository is potentially unsafe

Git blocks operations in a repository owned by a different operating-system user. This protects you from running Git configuration or hooks from an untrusted repository.

Select **Manage Unsafe Repositories** in the Source Control view or notification. Review the repository location before you mark it as safe. Marking a repository as safe adds its location to Git's [`safe.directory` configuration](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory).

On Windows, this can happen when you clone a repository from an application running as administrator and later open it from an application that isn't running as administrator.

## VS Code doesn't detect a repository in a parent folder

VS Code doesn't automatically open Git repositories in parent folders because doing so can expose changes outside the folder you intended to work with.

When VS Code detects a repository in a parent folder, use the notification or Source Control welcome view to open it. To always open repositories in parent folders, set the `setting(git.openRepositoryInParentFolders)` setting to `always`.

## Open the Git Output window

VS Code uses your machine's Git installation for source control operations. The Git Output window records the Git executable, commands, errors, timestamps, and command duration.

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

* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Configure remotes and synchronization
* [Source Control FAQ](/docs/sourcecontrol/faq.md) - Review product support and compatibility questions
* [Git documentation](https://git-scm.com/doc) - Learn more about Git commands and configuration
