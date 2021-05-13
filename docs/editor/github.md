---
Order: 9
Area: editor
TOCTitle: Working with GitHub
ContentId: bd1be8cf-b745-4737-be48-db381ec3acc6
PageTitle: Working with GitHub in Visual Studio Code
DateApproved: 4/8/2020
MetaDescription: Working with GitHub in Visual Studio Code
---
# Working with GitHub in VS Code

Using GitHub with VS Code lets you share your code and collaborate with others. GitHub integration is provided through the GitHub Pull Requests and Issues extension. To get started with the GitHub in VS Code, you'll need to [create an account](https://help.github.com/en/github/getting-started-with-github/signing-up-for-a-new-github-account) and install the [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github). In this topic, we'll demonstrate how you can get some of your favorite parts of GitHub without leaving VS Code.

If you're new to source control and want to start there you can [learn about VS Code's source control integration](/docs/editor/versioncontrol.md).

## Getting started with GitHub Pull Requests and Issues

Once you've installed the [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) you'll need to sign in. Follow the prompts to authenticate with GitHub and return to VS Code.

![Extension Sign In](images/github/extension-signin.png)

## Setting up a repository

### Cloning a repository

You can search for and clone a repository from GitHub using the **Git: Clone** command or by using the **Clone Repository** button in the Source Control (available when you have no folder open or in the command palette via <kbd>F1</kbd>).

![Clone From GitHub](images/github/clone-from-github.gif)

### Authenticating with an existing repository

Setting up authentication through GitHub so that you can manage your repository is done by taking any action using git in VS Code that requires GitHub authentication, such as pushing to a repository that you're a member of or cloning a private repository. You don't need to have any special extensions installed for authentication, it's built into VS Code.

When you do something that requires GitHub authentication, you'll see a prompt to sign in:

![Authentication Prompt](images/github/auth-prompt.png)

From there, follow the steps to sign into GitHub and return to VS Code.

## In editor integration

### Hovers

When you have a repository open and a user is @-mentioned, you can hover over that username and see a GitHub-style hover.

![User Hover](images/github/user-hover.png)

For #-mentioned issue numbers, full GitHub issue URLs, and repository specified issues (ex. Microsoft/vscode#1234) there is a similar hover.

![Issue Hover](images/github/issue-hover.png)

### Suggestions

User suggestions are triggered by the "@" character and issue suggestions are triggered by the "#" character. Suggestions are available in the editor and in the **Source Control** view's input box.

![User and Issue suggestions](images/github/user-issue-suggest.gif)

The issues that appear in the suggestion can be configured with the **GitHub Issues: Queries** setting. You can also configure which files show these suggestions using the settings **GitHub Issues: Ignore Completion Trigger** and **GitHubIssues: Ignore User Completion Trigger**

## Pull requests

From the pull request view you can view, manage, and create pull requests. The query used to display pull requests can be configured with the `githubPullRequests.queries` setting.

![Pull Request View](images/github/pull-request-view.png)

### Creating Pull Requests

You can use the **GitHub Pull Requests: Create Pull Request** or use the "+" button in the **Pull Requests View** to create a pull request. If you have not already pushed your branch to a remote, the extension will do this for you. You can use the last commit message, the branch name, or write a custom title for the pull request. If your repository has a pull request template, this will automatically be used for the description.

![Creating a Pull Request](images/github/pull-request-create.gif)

### Reviewing

Pull requests can be reviewed from the **Pull Requests** view. You can assign reviewers and labels, add comments, approve, close, and merge all from the pull request description.

![Review Pull Request](images/github/review-pull-request.gif)

From the description page, you can also easily checkout the pull request locally using the "Checkout" button. This will add a new **Changes in Pull Request** view from which you can view diffs of the current changes as well as all commits and the changes within these commits. Files that have been commented on are decorated with a diamond icon. To view the file on disk, you can use the **Open File** inline action.

![Changes in Pull Request](images/github/changes-view.png)

The diff editors from this view use the local file, so file navigation, intellisense, and editing work as normal. You can add comments within the editor on these diffs. Both adding single comments and creating a whole review is supported.

## Issues

### Creating issues

Issues can be created from the "+" in the **Issues** view and by using the **GitHub Issues: Create Issue from Selection** and **GitHub Issues: Create Issue from Clipboard** commands. They can also be created using a code action for "todo" comments. You can configure the trigger for the code action using the **GitHub Issues: Create Issue Triggers** setting.

![Create Issue from TODO](images/github/issue-from-todo.gif)

### Working on issues

From the **Issues** view, you can see your issues and work on them. By default, when you start working on an issue a branch will be created for you. You can configure the name of the branch using the setting `githubIssues.workingIssueBranch`. The commit message input box in the **Source Control** view will be populated with a commit message, which can be configured with `githubIssues.workingIssueFormatScm`.

![Work on Issue](images/github/work-on-issue.gif)

If your workflow doesn't involve creating a branch, or if you want to be promped to enter a branch name every time, you can configure that step to be skipped with the `githubIssues.useBranchForIssues` setting.