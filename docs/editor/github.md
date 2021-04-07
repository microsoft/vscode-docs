---
Order: 9
Area: editor
TOCTitle: Working with GitHub
ContentId: bd1be8cf-b745-4737-be48-db381ec3acc6
PageTitle: Working with GitHub in Visual Studio Code
DateApproved: 3/31/2021
MetaDescription: Working with GitHub in Visual Studio Code
---
# Working with GitHub in VS Code

Using [GitHub](https://github.com) with Visual Studio Code lets you share your source code and collaborate with others. GitHub integration is provided through the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension.

<a class="tutorial-install-extension-btn" href="vscode:extension/GitHub.vscode-pull-request-github">Install the GitHub Pull Requests and Issues extension</a>

To get started with the GitHub in VS Code, you'll need to [create an account](https://help.github.com/github/getting-started-with-github/signing-up-for-a-new-github-account) and install the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension. In this topic, we'll demonstrate how you can use some of your favorite parts of GitHub without leaving VS Code.

If you're new to source control and want to start there, you can learn about VS Code's [source control integration](/docs/editor/versioncontrol.md).

## Getting started with GitHub Pull Requests and Issues

Once you've installed the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, you'll need to sign in. Follow the prompts to authenticate with GitHub in the browser and return to VS Code.

![Extension Sign In](images/github/extension-signin.png)

If you are not redirected to VS Code, you can add your authorization token manually. In the browser window, you will receive your authorization token. Copy the token, and switch back to VS Code. Select **Signing in to github.com...** in the Status bar, paste the token, and hit `kbstyle(Enter)`.

## Setting up a repository

### Cloning a repository

You can search for and clone a repository from GitHub using the **Git: Clone** command in the Command Palette (`kb(workbench.action.showCommands)`) or by using the **Clone Repository** button in the Source Control view (available when you have no folder open).

![Clone From GitHub](images/github/clone-from-github.gif)

### Authenticating with an existing repository

Enabling authentication through GitHub happens when you run any Git action in VS Code that requires GitHub authentication, such as pushing to a repository that you're a member of or cloning a private repository. You don't need to have any special extensions installed for authentication; it is built into VS Code so that you can efficiently manage your repository.

When you do something that requires GitHub authentication, you'll see a prompt to sign in:

![Authentication Prompt](images/github/auth-prompt.png)

Follow the steps to sign into GitHub and return to VS Code. If authenticating with an existing repository doesn’t work automatically, you may need to manually provide a personal access token. See [Personal Access Token authentication](https://github.com/microsoft/vscode-pull-request-github/wiki#personal-access-token-authentication) for more information.

Note that there are several ways to authenticate to GitHub, including using your username and password with two-factor authentication (2FA), a personal access token, or an SSH key. See [About authentication to GitHub](https://docs.github.com/en/github/authenticating-to-github/about-authentication-to-github) for more information and details about each option.

## Editor integration

### Hovers

When you have a repository open and a user is @-mentioned, you can hover over that username and see a GitHub-style hover.

![User Hover](images/github/user-hover.png)

There is a similar hover for #-mentioned issue numbers, full GitHub issue URLs, and repository specified issues.

![Issue Hover](images/github/issue-hover.png)

### Suggestions

User suggestions are triggered by the "@" character and issue suggestions are triggered by the "#" character. Suggestions are available in the editor and in the **Source Control** view's input box.

![User and Issue suggestions](images/github/user-issue-suggest.gif)

The issues that appear in the suggestion can be configured with the **GitHub Issues: Queries** (`githubIssues.queries`) [setting](/docs/getstarted/settings.md). The queries use the [GitHub search syntax](https://help.github.com/articles/understanding-the-search-syntax).

You can also configure which files show these suggestions using the settings **GitHub Issues: Ignore Completion Trigger** (`githubIssues.ignoreCompletionTrigger`) and **GitHub Issues: Ignore User Completion Trigger** (`githubIssues.ignoreUserCompletionTrigger`). These settings take an array of [language identifiers](/docs/languages/identifiers.md) to specify the file types.

```jsonc
// Languages that the '#' character should not be used to trigger issue completion suggestions.
"githubIssues.ignoreCompletionTrigger": [
  "python"
]
```

## Pull requests

From the **Pull Requests** view you can view, manage, and create pull requests.

![Pull Request View](images/github/pull-request-view.png)

The queries used to display pull requests can be configured with the **GitHub Pull Requests: Queries** (`githubPullRequests.queries`) setting and use the [GitHub search syntax](https://help.github.com/articles/understanding-the-search-syntax).

```json
"githubPullRequests.queries": [
    {
        "label": "Assigned To Me",
        "query": "is:open assignee:${user}"
    },
```

### Creating Pull Requests

You can use the **GitHub Pull Requests: Create Pull Request** command or use the **+** button in the **Pull Requests** view to create a pull request. If you have not already pushed your branch to a remote, the extension will do this for you. You can use the last commit message, the branch name, or write a custom title for the pull request. If your repository has a pull request template, this will automatically be used for the description.

![Creating a Pull Request](images/github/pull-request-create.gif)

### Reviewing

Pull requests can be reviewed from the **Pull Requests** view. You can assign reviewers and labels, add comments, approve, close, and merge all from the pull request description.

![Review Pull Request](images/github/review-pull-request.gif)

From the description page, you can also easily checkout the pull request locally using the **Checkout** button. This will add a new **Changes in Pull Request** view from which you can view diffs of the current changes as well as all commits and the changes within these commits. Files that have been commented on are decorated with a diamond icon. To view the file on disk, you can use the **Open File** inline action.

![Changes in Pull Request](images/github/changes-view.png)

The diff editors from this view use the local file, so file navigation, IntelliSense, and editing work as normal. You can add comments within the editor on these diffs. Both adding single comments and creating a whole review is supported.

## Issues

### Creating issues

Issues can be created from the **+** button in the **Issues** view and by using the **GitHub Issues: Create Issue from Selection** and **GitHub Issues: Create Issue from Clipboard** commands. They can also be created using a Code Action for "TODO" comments.

![Create Issue from TODO](images/github/issue-from-todo.gif)

You can configure the trigger for the Code Action using the **GitHub Issues: Create Issue Triggers** (`githubIssues.createIssueTriggers`) setting.

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

From the **Issues** view, you can see your issues and work on them. By default, when you start working on an issue, a branch will be created for you. You can configure the name of the branch using the **GitHub Issues: Working Issue Branch** (`githubIssues.workingIssueBranch`) setting. The commit message input box in the **Source Control** view will be populated with a commit message, which can be configured with **GitHub Issues: Working Issue Format SCM** (`githubIssues.workingIssueFormatScm`).

![Work on Issue](images/github/work-on-issue.gif)

If your workflow doesn't involve creating a branch, or if you want to be prompted to enter a branch name every time, you can skip that step by turning off the **GitHub Issues: Use Branch For Issues** (`githubIssues.useBranchForIssues`) setting.
