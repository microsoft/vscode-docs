---
ContentId: bd1be8cf-b745-4737-be48-db381ec3acc6
DateApproved: 9/9/2026
MetaDescription: Use GitHub in {% data variables.product.prodname_vscode %} to clone repositories, manage pull requests and issues, or edit remote repositories without cloning.
Keywords:
- source control
- scm
- version control
- git
---
# Work with GitHub in {% data variables.product.prodname_vscode_shortname %}

{% data variables.product.prodname_vscode %} provides several ways to work with repositories, pull requests, and issues on [GitHub](https://github.com). Basic GitHub authentication and Git operations are built into {% data variables.product.prodname_vscode_shortname %}. Extensions add pull request, issue, and virtual repository workflows.

This article helps you choose the right GitHub integration and use it without leaving {% data variables.product.prodname_vscode_shortname %}.

> [!TIP]
> If you're new to source control or want to learn more about {% data variables.product.prodname_vscode_shortname %}'s basic Git support, you can start with the [Source Control](/docs/sourcecontrol/overview.md) topic.

## Choose a GitHub workflow

Choose an integration based on what you want to do:

| Goal | Capability | Requirement |
|------|------------|-------------|
| Clone, fetch, pull, and push a repository | Built-in Git support | Install [Git](https://git-scm.com/download) and sign in to GitHub when prompted. |
| Create and review pull requests or manage issues | [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension | Install the extension and sign in to GitHub. |
| Browse and edit a repository without cloning it | [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension | Install the extension and sign in to GitHub. |

The GitHub Pull Requests and Issues and GitHub Repositories extensions are separate. Install only the extension that supports your workflow.

## Prerequisites

For local GitHub repositories, install [Git version 2.0.0 or later](https://git-scm.com/download) and create a [GitHub account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).

When you commit changes, Git uses your configured username and email. Set these values with:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Sign in to GitHub for Git operations

You don't need an extension to authenticate Git operations with GitHub. When you clone a private repository or push to a GitHub repository, {% data variables.product.prodname_vscode_shortname %} prompts you to sign in. Follow the browser prompts, then return to {% data variables.product.prodname_vscode_shortname %}.

![Screenshot showing the GitHub authentication prompt in {% data variables.product.prodname_vscode_shortname %}.](images/github/auth-prompt.png)

Personal access token authentication is supported for GitHub Enterprise Server. To use a personal access token, cancel the browser sign-in prompts until {% data variables.product.prodname_vscode_shortname %} asks for a token. For other authentication options, see [GitHub authentication methods](https://docs.github.com/authentication/keeping-your-account-and-data-secure/about-authentication-to-github).

## Get started with GitHub Pull Requests and Issues

After you install the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, sign in to use pull request and issue features.

1. Select the GitHub icon in the Activity Bar.

1. Select **Sign In** and follow the browser prompts.

    ![Screenshot showing the sign-in button in the GitHub view.](images/github/extension-signin.png)

1. Return to {% data variables.product.prodname_vscode_shortname %} when authentication is complete.

If you are not redirected to {% data variables.product.prodname_vscode_shortname %}, you can add your authorization token manually:

1. In the browser window, copy your authorization token.

1. In {% data variables.product.prodname_vscode_shortname %}, select **Signing in to github.com...** in the Status Bar.

1. Paste the token and press `kbstyle(Enter)` to complete the sign-in process.

## Setting up a repository

### Cloning a repository

You can search for and clone a repository from GitHub using the **Git: Clone** command in the Command Palette (`kb(workbench.action.showCommands)`) or by using the **Clone Repository** button in the Source Control view (available when you have no folder open).

From the GitHub repository dropdown you can filter and pick the repository you want to clone locally.

![Screenshot showing the GitHub repository Quick Pick filtered on microsoft/vscode.](images/github/github-repo-dropdown.png)

Learn more about [cloning repositories and working with remotes](/docs/sourcecontrol/repos-remotes.md#clone-repositories).

> [!NOTE]
> If you'd like to work on a repository without cloning the contents to your local machine, you can install the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension to browse and edit directly on GitHub. Learn more about the [GitHub Repositories extension](/docs/sourcecontrol/github.md#github-repositories-extension).

## Editor integration

### Hovers

When you have a repository open and a user is @-mentioned (for example, in a code comment), you can hover over that username and see a GitHub-style hover with the user's details.

![Screenshot showing a user hover for a @-mentioned user in a code comment.](images/github/user-hover.png)

There is a similar hover for #-mentioned issue numbers, full GitHub issue URLs, and repository specified issues.

![Screenshot showing a hover for a #-mentioned issue number in a code comment.](images/github/issue-hover.png)

### Suggestions

User suggestions are triggered by typing the "@" character and issue suggestions are triggered by typing the "#" character. Suggestions are available in the editor and in the Source Control commit message input box.

![Screenshot showing GitHub user and issue suggestions in the editor.](images/github/user-issue-suggest.gif)

The issues that appear in the suggestion can be configured with the **GitHub Issues: Queries** (`setting(githubIssues.queries)`) setting. The queries use the [GitHub search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax).

You can also configure which file types show these suggestions by using the settings **GitHub Issues: Ignore Completion Trigger** (`setting(githubIssues.ignoreCompletionTrigger)`) and **GitHub Issues: Ignore User Completion Trigger** (`setting(githubIssues.ignoreUserCompletionTrigger)`). These settings take an array of [language identifiers](/docs/languages/identifiers.md) to specify the file types.

```jsonc
// Languages that the '#' character should not be used to trigger issue completion suggestions.
"githubIssues.ignoreCompletionTrigger": [
  "python"
]
```

## Pull requests

From the **Pull Requests** view you can view, manage, and create pull requests.

![Screenshot showing the Pull Request view.](images/github/pull-request-view.png)

The queries used to display pull requests can be configured with the **GitHub Pull Requests: Queries** (`setting(githubPullRequests.queries)`) setting and use the [GitHub search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax).

```json
"githubPullRequests.queries": [
    {
        "label": "Assigned To Me",
        "query": "is:open assignee:${user}"
    },
```

### Creating pull requests

Once you have committed changes to your fork or branch, you can use the **GitHub Pull Requests: Create Pull Request** command or the **Create Pull Request** button in the **Pull Requests** view to create a pull request.

![Screenshot showing the Create Pull Request button in the Pull Request view.](images/github/create-pull-request-button.png)

A new **Create** view will be displayed where you can select the base repository and base branch you'd like your pull request to target as well as fill in the title and description. If your repository has a pull request template, this will automatically be used for the description.

Use the buttons in the action bar at the top to add **Assignees**, **Reviewers**, **Labels** and a **Milestone**.

![Screenshot showing the Create Pull Request view.](images/github/create-pull-request-view.png)

The **Create** button menu provides alternative options, such as **Create Draft** and **Auto-Merge**.

Once you select **Create**, if you have not already pushed your branch to a GitHub remote, the extension will ask if you'd like to publish the branch and provides a dropdown to select the specific remote.

The **Create Pull Request** view now enters **Review Mode**, where you can review the details of the PR, add comments, and merge the PR once it's ready. After the PR is merged, you'll have the option to delete both the remote and local branch.

> [!TIP]
> Use AI to generate a pull request title and description based on the included commits. Select the sparkle icon <i class="codicon codicon-sparkle"></i> next to the pull request title field. This action uses the fast, lightweight utility model configured by `setting(chat.utilitySmallModel)`, not the model selected for a chat or agent session. Learn more about [configuring models for utility tasks](/docs/agent-customization/language-models.md#change-the-model-for-utility-tasks).

### Reviewing

Pull requests can be reviewed from the **Pull Requests** view. You can assign reviewers and labels, add comments, approve, close, and merge all from the pull request **Description**.

![Screenshot showing a pull request description in the editor.](images/github/pull-request-description-editor.png)

From the **Description** page, you can also easily checkout the pull request locally using the **Checkout** button. This will switch {% data variables.product.prodname_vscode_shortname %} to open the fork and branch of the pull request (visible in the Status Bar) in Review Mode and add a new **Changes in Pull Request** view from which you can view diffs of the current changes as well as all commits and the changes within these commits. Files that have been commented on are decorated with a diamond icon. To view the file on disk, you can use the **Open File** inline action.

![Screenshot showing files and commits in the Changes in Pull Request view.](images/github/changes-view.png)

The diff editors from this view use the local file, so file navigation, IntelliSense, and editing work as normal. You can add comments within the editor on these diffs. Both adding single comments and creating a whole review is supported.

When you are done reviewing the pull request changes you can merge the PR or select **Exit Review Mode** to go back to the previous branch you were working on.

> [!TIP]
> You can also [use AI to perform a code review of the PR](https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review?tool=vscode) before you create it. Select the **Code Review** button in the GitHub Pull Request view.

## Issues

### Creating issues

Issues can be created from the **+** button in the **Issues** view and by using the **GitHub Issues: Create Issue from Selection** and **GitHub Issues: Create Issue from Clipboard** commands. They can also be created using a Code Action for "TODO" comments. When creating issues, you can take the default description or select the **Edit Description** pencil icon in the upper right to bring up an editor for the issue body.

![Screenshot showing an issue created from a TODO comment.](images/github/issue-from-todo.gif)

You can configure the trigger for the Code Action using the **GitHub Issues: Create Issue Triggers** (`setting(githubIssues.createIssueTriggers)`) setting.

The default issue triggers are:

```json
"githubIssues.createIssueTriggers": [
  "TODO",
  "todo",
  "BUG",
  "FIXME",
  "ISSUE",
  "HACK"
]
```

### Working on issues

From the **Issues** view, you can see your issues and work on them.

![Screenshot showing an issue and its details in the Issues view.](images/github/issues-view.png)

By default, when you start working on an issue (**Start Working on Issue** context menu item), a branch will be created for you, as shown in the Status Bar in the image below.

![Screenshot showing an active issue and its branch in the Status Bar.](images/github/working-on-issue.png)

The Status Bar also shows the active issue and if you select that item, a list of issue actions are available such as opening the issue on the GitHub website or creating a pull request.

![Screenshot showing actions for the active issue in the Status Bar.](images/github/issue-status-bar-actions.png)

You can configure the name of the branch using the **GitHub Issues: Issue Branch Title** (`setting(githubIssues.issueBranchTitle)`) setting. If your workflow doesn't involve creating a branch, or if you want to be prompted to enter a branch name every time, you can skip that step by turning off the **GitHub Issues: Use Branch For Issues** (`setting(githubIssues.useBranchForIssues)`) setting.

> [!TIP]
> Learn more about [working with branches](/docs/sourcecontrol/branches-worktrees.md) to understand branch management, switching between branches, and organizing your development work.

Once you are done working on the issue and want to commit a change, the commit message input box in the **Source Control** view will be populated with a message, which can be configured with **GitHub Issues: Working Issue Format SCM** (`setting(githubIssues.workingIssueFormatScm)`).

## GitHub Repositories extension

The [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension lets you browse, search, edit, and commit to a remote GitHub repository without cloning it locally. Use this workflow to review source code or make a small change to a file.

![Screenshot showing a remote repository opened with the GitHub Repositories extension.](images/github/github-repositories-extension.png)

### Opening a repository

After you install the GitHub Repositories extension, open a repository with the **GitHub Repositories: Open Repository...** command from the Command Palette (`kb(workbench.action.showCommands)`) or by selecting the Remote indicator in the lower-left corner of the Status Bar.

![Screenshot showing the Remote indicator in the Status Bar.](images/github/remote-indicator.png)

When you run the **Open Repository** command, you then choose whether to open a repository from GitHub, open a Pull Request from GitHub, or reopen a repository that you had previously connected to.

If you haven't logged into GitHub from {% data variables.product.prodname_vscode_shortname %} before, you'll be prompted to authenticate with your GitHub account.

![Screenshot showing the repository picker for the GitHub Repositories extension.](images/github/open-github-repository-dropdown.png)

You can provide the repository URL directly or search GitHub for the repository you want by typing in the text box.

After you select a repository or pull request, {% data variables.product.prodname_vscode_shortname %} reloads the window and shows the repository contents in the Explorer view. You can open files with syntax highlighting and bracket matching, make edits, and commit changes as you would in a local clone.

One difference from working with a local repository is that when you commit a change with the GitHub Repository extension, the changes are pushed directly to the remote repository, similar to if you were working in the GitHub web interface.

Another feature of the GitHub Repositories extension is that every time you open a repository or branch, you get the up-to-date sources available from GitHub. You don't need to remember to pull to refresh as you would with a local repository.

The GitHub Repositories extension supports viewing and even committing LFS-tracked files without needing to install [Git LFS](https://git-lfs.github.com) (Large File System) locally. Add the file types you want tracked with LFS to a [`.gitattributes` file](https://git-lfs.com), then commit your changes directly to GitHub using the Source Control view.

### Switching branches

Select the branch indicator in the Status Bar to switch branches. You don't need to stash uncommitted changes first because the extension remembers your changes and reapplies them when you return to the branch.

![Screenshot showing the branch indicator in the Status Bar.](images/github/branch-indicator-status-bar.png)

### Remote Explorer

You can quickly reopen remote repositories with the Remote Explorer available on the Activity bar. This view shows you the previously opened repositories and branches.

![Screenshot showing remote GitHub repositories in Remote Explorer.](images/github/github-remote-explorer.png)

### Create pull requests

If your workflow uses Pull Requests, rather than direct commits to a repository, you can create a new PR from the Source Control view. You'll be prompted to provide a title and create a new branch.

![Screenshot showing the Create Pull Request button in the Source Control view.](images/github/github-repositories-create-pull-request.png)

Once you have created a Pull Request, you can use the [GitHub Pull Request and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension to review, edit, and merge your PR as described [earlier](/docs/sourcecontrol/github.md#pull-requests) in this topic.

### Virtual file system

Without a repository's files on your local machine, the GitHub Repositories extension creates a virtual file system in memory so you can view file contents and make edits. Using a virtual file system means that some operations and extensions which assume local files are not enabled or have limited functionality. Features such as tasks, debugging, and integrated terminals are not enabled and you can learn about the level of support for the virtual file system via the **features are not available** link in the Remote indicator hover.

![Screenshot showing unavailable virtual workspace features in the Remote indicator hover.](images/github/features-not-available-hover.png)

Extension authors can learn more about running in a virtual file system and workspace in the [Virtual Workspaces extension author's guide](https://github.com/microsoft/vscode/wiki/Virtual-Workspaces).

### Continue working on

Sometimes you'll want to switch to working on a repository in a development environment with support for a local file system and full language and development tooling. The GitHub Repositories extension makes it easy for you to:

* Create a GitHub codespace (if you have the [GitHub Codespaces extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces)).
* Clone the repository locally.
* Clone the repository into a Docker container (if you have [Docker](https://docker.com/) and the Microsoft [Container Tools extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers) installed).

To switch development environments, use the **Continue Working On** command from the Command Palette (`kb(workbench.action.showCommands)`) or select the Remote indicator in the Status Bar.

![Screenshot showing development environment options for the Continue Working On command.](images/github/continue-working.png)

If you are using the [browser-based editor](/docs/remote/codespaces.md#browser-based-editor), the **Continue Working On** command has the options to open the repository locally or within a cloud-hosted environment in [GitHub Codespaces](https://github.com/features/codespaces).

![Screenshot showing Continue Working On options in the browser-based editor.](images/github/codespaces-continue.png)

The first time that you use **Continue Working On** with uncommitted changes, you will have the option to bring your edits to your selected development environment using **Cloud Changes**, which stores your pending changes on the same {% data variables.product.prodname_vscode_shortname %} service used for Settings Sync.

These changes are deleted from our service once they are applied to your target development environment. If you choose to continue without your uncommitted changes, you can always change this preference later by configuring the setting `"workbench.cloudChanges.continueOn": "prompt"`.

In the event that your pending changes are not automatically applied to your target development environment, you can view, manage, and delete your stored changes using the **Cloud Changes: Show Cloud Changes** command.

## Next steps

* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Clone, publish, and synchronize repositories
* [Branches and Worktrees](/docs/sourcecontrol/branches-worktrees.md) - Manage branches for pull request workflows
* [Source Control History](/docs/sourcecontrol/history.md) - Inspect commits and file history
* [AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/overview.md) - Learn about AI features in {% data variables.product.prodname_vscode_shortname %}
