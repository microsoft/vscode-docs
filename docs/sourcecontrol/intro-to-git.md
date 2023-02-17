# Intro Git in Visual Studio Code

## Introduction
Want to easily manage your code and collaborate with others? Git and GitHub are the tools you need! And with VS Code, you can set up and use them in a snap. Even if you're a beginner, VS Code's user-friendly interface will guide you through common Git actions like pushing and pulling code, creating and merging branches, and committing code changes. And if you're a pro, you'll love the ability to perform Git actions directly within the editor, saving you time and effort compared to using the Terminal. Plus, the seamless workflow between VS Code and Git means you can stay in your editor and get more done.

## Setup Git in VS Code

To use Git and GitHub in VS Code, first make sure you [have Git installed on your computer](https://git-scm.com/downloads). If Git is missing the *Source Control* tab will show instructions on how to install it. Make sure to restart VS Code afterwards.

Optionally you can sign into VS Code with your GitHub account in the **Accounts** menu to enables additional features like settings sync, but also cloning and publishing repositories from GitHub.

## Open a Git repository

VS Code provides several ways to get started in a Git repository, from local to remote cloud-powered environments like GitHub Codespaces.

### Clone a repository locally

![Screenshot of the Clone Repository quick prompt, searching fot repositories with the name vscode](images/intro/github-clone.png)

To clone a repository from GitHub, execute the **Git: Clone** command or select the **Clone Repository** button in the **Source Control** view. If you clone from GitHub, VS Code will prompt you to authenticate with GitHub. This will allow you to search all available repositories and clone private repositories. For other Git providers enter the repository URL and select **Clone** and pick a folder. VS Code will open it once the repository has been cloned.

### Initialize a repository in a local folder

To initialize a new local repository, pick an existing or new folder on your computer and open it in VS Code. In the **Source Control** tab, select the **Initialize Repository** button. This will create a new Git repository in the current folder, allowing you to start tracking code changes.

#### Publish local repository to GitHub

Once you have a local Git repository set up, you can publish it to GitHub. This will create a new repository on your GitHub account, and push your local code to the remote repository. It is great for backing up your code, collaborating with others, and automating your workflow with GitHub Actions.

![Source Control view for a workspace without git will offer to Initialize a Git repo or Publish to GitHub](images/intro/scm-init-publish.png)

Use the **Publish to GitHub** command button in the **Source Control** tab. You can then choose a name and description for the repository, and whether to make it public or private. Once the repository has been created, VS Code will push your local code to the remote repository. Your code is now backed up on GitHub, and you can start collaborating with others with commits and pull requests.

### Open a GitHub repository in a Codespace

GitHubCodespaces let you open a GitHub repository in a full configured cloud-based development environment, allowing you to develop in a browser without having to install any software on your local computer. They include free usage for individuals which makes it easy to getting started in open source.

Install the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension into VS Code and sign in with GitHub. Run the **Codespaces: Create New Codespace** command and pick the repository and branch you want to open. The Codespace will open in a new window.

![Creating a Codespace from a repo within desktop VS Code](images/intro/codespace-create.png)

Alternatively, you can also start from a template from the [GitHub's Codespaces site](https://github.com/codespaces/templates). If you already have a Codespace open in your browser, you can open it in your Desktop VS Code by running the **Codespaces: Open in VS Code Desktop** command. Learn more about Codespaces to forwarding ports.

### Open a GitHub Repository remotely

VS Code remote repositories allows you to browse and edit a GitHub repository without cloning it to your local computer. This is useful for quickly making changes to a remote repository without having to clone the entire codebase to your local machine.

First install the the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension. Run the command **Remote Repositories: Open Remote Repository...** or use the **Open Remote Repository** button the Explorer view. Search and select the GitHub repository that you want to open.

![Remote Repositories opening a remote GitHub repo, pull request or Azure repo](images/intro/remote-repo.png)

> **Tip:** If you need to execute code or run terminal commands, you can seamlessly switch from a remote repository to a Codespace with the command **Continue Working on**.

## Staging and committing code changes

Once you have a Git repository set up, you can start tracking code changes by staging and committing your newly created and edited code.

![Source Control view with one file staged and other changes, a diff showing in the editor that highlights the changes](images/intro/scm-staging.png)

> **Tip:** Commit early and often. This will make it easier to revert to previous versions of your code if needed.

To stage a file, select the **+** (plus) icon next to the file in the **Source Control** tab. This will add the file to the **Staged Changes** section, indicating that it will be included in the next commit. Staged changes can also be discarded by selecting the **−** (minus) icon next to the file.

To commit your staged changes, type a commit message and select the **Commit** button. This will save your changes to the local Git repository, allowing you to revert to previous versions of your code if needed. All local file changes and commits can be navigated in the **Timeline** section.

![Timeline view with one item selected and its change being shown in the editor](images/intro/timeline.png)

## Pushing and pulling remote changes

Once you have made commits to your local Git repository, you can push them to the remote repository. The **Sync** button will indicate how many commits are going to be pushed and pulled. selecting **Sync** button will download (pull) any new remote commits and upload (push) new local commits to the remote repository.

![Sync button with one change to push](images/intro/sync.png)

> Tip: Make sure to enable **Git: Autofetch** to always get an up-to-date remote commit indicators.

 Push and pull can also be performed individually by using their respective commands.

## Using branches

In Git, [branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) allow you to work on multiple versions of your codebase simultaneously. This is useful for experimenting with new features or making large code changes without affecting the main codebase.

![Branch indicator in the status bar](images/intro/branch-indicator.png)

The branch dropdown in the status bar shows the current branch and lets you switch to new and existing branches. To create a new branch, select the branch indicator and choose to create it from the current branch or another local one. Type a name for the new branch, and confirm. This will create a new branch and switch you to it, allowing you to make changes to your code without affecting the main branch.

> **Tip:** If you use the GitHub Pull Request extension you can create a branch directly from an issue, which get you started coding in a new new local branch and automatically prefill the pull request for you.

To push the branch to the remote repository, select **Publish** in the **Source Control** tab. This will create a new branch on the remote repository, allowing you to collaborate with others on the branch.

### Creating and reviewing GitHub Pull Requests

In Git and GitHub, [Pull Requests (PRs)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) are a way for collaborators to review and merge code changes from separate branches into the main branch. This allows teams to review and approve code changes before they are incorporated into the main codebase, ensuring that only high-quality code is merged.

To use Pull Requests in VS Code, you will need to install the [GitHub Pull Request & Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension. This extension adds PR and issue tracking functionality to VS Code, allowing you to create, review, and merge PRs from within the editor.

To create a PR, make sure you are on a separate branch from the main branch, and push your code changes to the remote repository. In the **Source Control** tab, select the **Create Pull Request** button. This will open the PR creation form, where you can enter a title and description for the PR, and choose which branch to merge the changes into. select **Create** to create the PR.

To review a PR, select the **Review Pull Request** button in the **Source Control** tab, and select the PR you want to review. This will open the PR in a new editor window, where you can review the code changes and leave comments. Once you are satisfied with the code changes, you can select the **Merge** button to merge the PR into the main branch.

Learn more about Pull Requests in the [VS Code's GitHub documentation](https://code.visualstudio.com/docs/sourcecontrol/github).