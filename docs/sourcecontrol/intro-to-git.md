---
Order: 2
Area: sourcecontrol
TOCTitle: Introduction to Git
ContentId: b3e4717d-81e2-4bfa-a022-c37aab950bce
PageTitle: Introduction to Git in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Get started with Git in Visual Studio Code and take control of your code! Our beginner's guide covers everything you need to know, from setting up a repository to committing changes and collaborating with others. Learn Git today and streamline your development workflow.
---
# Introduction to Git in VS Code

Want to easily manage your source code and collaborate with others? Git and GitHub are the tools you need! And with Visual Studio Code, you can set up and use them in a snap. Even if you're a beginner, VS Code's user-friendly interface guides you through common Git actions like pushing and pulling code, creating and merging branches, and committing code changes. And if you're a pro, you'll love the ability to perform Git actions directly within the editor, saving you time and effort compared to using the Git command line. Plus, the seamless workflow between VS Code and Git means you can stay in your editor and get more done.

## Set up Git in VS Code

To use Git and GitHub in VS Code, first make sure you [have Git installed on your computer](https://git-scm.com/downloads). If Git is missing, the **Source Control** view shows instructions on how to install it. Make sure to restart VS Code afterwards.

Additionally you can sign into VS Code with your GitHub account in the **Accounts** menu in the lower right of the Activity bar to enable additional features like [Settings Sync](/docs/editor/settings-sync.md), but also cloning and publishing repositories from GitHub.

![Screenshot of the Accounts menu in VS Code](images/intro/vscode-accounts-menu.png)

## Open a Git repository

VS Code provides several ways to get started in a Git repository, from local to remote cloud-powered environments like [GitHub Codespaces](https://github.com/features/codespaces).

### Clone a repository locally

To clone a repository, run the **Git: Clone** command in the Command Palette (`kb(workbench.action.showCommands)`), or select the **Clone Repository** button in the **Source Control** view.

If you clone from GitHub, VS Code prompts you to authenticate with GitHub. Then, select a repository from the list to clone to your machine. The list contains both public and private repositories.

![Screenshot of the Clone Repository quick prompt, searching for repositories with the name vscode](images/intro/github-clone.png)

For other Git providers, enter the repository URL, select **Clone**, and pick a folder on your local machine to clone the files into. VS Code opens the folder once the repository is cloned on your local machine.

![Screenshot of the Clone Repository quick prompt, searching for a repository by providing the repository URL](images/intro/git-clone-repository-url.png)

### Initialize a repository in a local folder

To initialize a new local Git repository:

1. Pick an existing or new folder on your computer and open it in VS Code.

1. In the **Source Control** view, select the **Initialize Repository** button.

    This creates a new Git repository in the current folder, allowing you to start tracking code changes.

    This action is equivalent to running `git init` on the command-line.

    ![Source Control view for a workspace not under Git source control will offer to Initialize a Git repo or Publish to GitHub](images/intro/scm-init-publish.png)

#### Publish local repository to GitHub

You can also initialize and local repository and publish it directly to GitHub. This creates a new repository on your GitHub account, and pushes your local code changes to the remote repository. Having your source code on a remote repository is a great way to back up your code, collaborate with others, and automate your workflow with [GitHub Actions](https://github.com/features/actions).

Use the **Publish to GitHub** command button in the **Source Control** view. You can then choose a name and description for the repository, and whether to make it public or private.

![Screenshot of the Publish to GitHub quick prompt, showing private and public GitHub repository names](images/intro/publish-to-github.png)

Once the repository has been created, VS Code pushes your local code to the remote repository. Your code is now backed up on GitHub, and you can start collaborating with others with commits and pull requests.

### Open a GitHub repository in a codespace

[GitHub Codespaces](https://github.com/features/codespaces) lets you open a GitHub repository in a fully configured cloud-based development environment, enabling you to develop in a browser without having to install any software on your local computer. GitHub Codespaces allows free usage for individuals, which makes it easy to get started working on open source projects.

To create a codespace for your GitHub repository:

1. Install the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension in VS Code and sign in with your GitHub account.

1. Run the **Codespaces: Create New Codespace** command.

1. Select the repository and branch you want to open.

    VS Code opens a new window, which is connected to the codespace. The source code, terminal, and running and debugging are hosted in the remote cloud-based development environment.

    Notice that the File Explorer and Status Bar indicate that the workspace is opened in a codespace.

    ![Screenshot of a workspace opened in a codespace, highlighting the codespace name in the File Explorer and Status Bar](images/intro/open-workspace-in-codespace.png)

Alternatively, you can also start from a codespace template on the [GitHub Codespaces website](https://github.com/codespaces/templates).

If you already have a codespace open in your browser, run the **Codespaces: Open in VS Code Desktop** command in the browser to connect to the codespace from your local VS Code Desktop.

You can learn more about GitHub Codespaces, including customization such as forwarding ports, in the [Developing in a codespace](https://docs.github.com/codespaces/developing-in-codespaces/developing-in-a-codespace?tool=vscode) documentation.

### Open a GitHub repository remotely

VS Code's remote repository support allows you to browse and edit a GitHub repository without cloning it to your local computer. This is useful for quickly making changes to a remote repository without having to clone the entire codebase to your machine.

1. First install the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) extension.

1. Run the command **Remote Repositories: Open Remote Repository...** or use the **Open Remote Repository** button the Explorer view.

1. Search and select the GitHub repository that you want to open.

    ![Remote Repositories opening a remote GitHub repo, pull request or Azure repo](images/intro/remote-repo.png)

> **Tip:** If you need to execute code or run terminal commands, you can seamlessly switch from a remote repository to a codespace with the command **Continue Working on**.

## Staging and committing code changes

Once you have a Git repository set up, you can start tracking code changes by [staging and committing](https://git-scm.com/about/staging-area) your newly created and edited code.

> **Tip**: Commit your changes early and often. This makes it easier to revert back to previous versions of your code if needed.

You can access the **Source Control** view from the Activity Bar to list all changed files in your workspace. You can toggle between a tree view or list view by using the tree/list icon in the Source Control view header.

![Source Control view, highlighting the tree/list view control in the header](images/intro/source-control-view.png)

When you select a file in the Source Control view, the editor shows a diff view that highlights the file changes, compared to the previously committed file.

![Source Control view with one file staged and other changes, a diff showing in the editor that highlights the changes](images/intro/scm-staging.png)

To stage a file, select the **+** (plus) icon next to the file in the **Source Control** view. This adds the file to the **Staged Changes** section, indicating that it will be included in the next commit.

![Source Control view with four changed files, highlighting the '+' button to stage the changes of a file](images/intro/scm-stage-changes.png)

You can also stage all pending changes at once by selecting the **+** (plus) icon next to **Changes** in the Source Control view.

Staged changes can also be discarded by selecting the **−** (minus) icon next to the file. Similarly, you can discard all staged changes by selecting the **−** (minus) icon next to **Staged Changes** in the Source Control view.

![Source Control view with four changed files, highlighting the '-' button to unstage the changes of a file](images/intro/scm-unstage-changes.png)

To commit your staged changes, type a commit message in the upper text box, and then select the **Commit** button. This saves your changes to the local Git repository, allowing you to revert to previous versions of your code if needed.

> **Tip**: If you have a GitHub Copilot subscription, and installed the Github Copilot extension, you can use the *sparkle* icon to [generate a commit message](/docs/copilot/overview.md#productivity-improvements).

You can navigate through and review all local file changes and commits in the **Timeline** view available in the bottom of the Explorer view.

![Timeline view with one item selected and its change being shown in the editor](images/intro/timeline.png)

## Pushing and pulling remote changes

Once you have made commits to your local Git repository, you can push them to the remote repository. The **Sync Changes** button indicates how many commits are going to be pushed and pulled. Selecting the **Sync Changes** button downloads (pull) any new remote commits and uploads (push) new local commits to the remote repository.

![Sync button with one change to push](images/intro/sync.png)

> **Tip:** You can enable the **Git: Autofetch** [setting](/docs/getstarted/settings.md) to always get an up-to-date remote commit indicator.

Push and pull can also be performed individually by using their respective commands. You can access these commands from the Source Control menu.

![Source Control menu that shows all source control commands](images/intro/scm-menu.png)

## Using branches

In Git, [branches](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) allow you to work on multiple versions of your codebase simultaneously. This is useful for experimenting with new features or making large code changes without affecting the main codebase.

The branch indicator in the Status bar shows the current branch and lets you switch to new and existing branches.

![Branch indicator in the Status bar](images/intro/branch-indicator.png)

To create a new branch, select the branch indicator and choose to create it from the current branch or another local one. Type a name for the new branch, and confirm. VS Code creates a new branch and switches to it, allowing you to make changes to your code without affecting the main branch.

![Create branch quick prompt that shows when selecting the branch indicator](images/intro/scm-create-branch.png)

> **Tip:** If you use the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, you can create a branch directly from an issue, which gets you started working in a new local branch and automatically prefills the pull request for you.

After you create a local branch, you can push the branch to the remote repository by selecting **Publish Branch** in the **Source Control** view. This creates a new branch on the remote repository, allowing you to collaborate with others in that branch.

### Creating and reviewing GitHub pull requests

In Git and GitHub, [pull requests (PRs)](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) are a way for collaborators to review and merge code changes from separate branches into the main branch. This enables teams to review and approve code changes before they are incorporated into the main codebase, ensuring that only high-quality changes are merged.

To use pull requests in VS Code, you need to install the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension. This extension adds PR and issue tracking functionality to VS Code, allowing you to create, review, and merge PRs from within the editor.

To create a PR, make sure you are on a separate branch from the main branch, and push your code changes to the remote repository. In the **Source Control** view, select the **Create Pull Request** button. This opens the PR creation form, where you can enter a title and description for the PR, and choose which branch to merge the changes into. Select **Create** to create the PR.

![Source Control view, highlighting the 'Create pull request' button](images/intro/scm-create-pull-request.png)

To review a PR, select the **Review Pull Request** button in the **Source Control** view, and select the PR you want to review. This opens the PR in a new editor window, where you can review the code changes and leave comments. Once you are satisfied with the code changes, you can select the **Merge** button to merge the PR into the targeted branch.

Learn more about pull requests in [VS Code's GitHub documentation](/docs/sourcecontrol/github.md).

## Using Git in the built-in terminal

As all Git state is kept in the local repository, you can easily switch between VS Code's UI, the [built-in terminal](/docs/terminal/basics.md), or external tools like [GitHub Desktop](https://desktop.github.com). You can also set up [VS Code as your default Git editor](/docs/sourcecontrol/overview.md#vs-code-as-git-editor), allowing you to use VS Code to edit commit messages and other Git-related files.

### Git Bash on Windows

Git Bash is a popular shell environment for Windows that provides a Unix-like command-line interface for working with Git and other command-line tools. Visual Studio Code's integrated terminal supports Git Bash as a shell, allowing you to seamlessly integrate Git Bash into your development workflow. Installing Git on your Windows machine also installs Git Bash, if it wasn't deselected during the installation steps.

![Selecting Git Bash as shell in Visual Studio Code's built-in terminal](images/intro/git-bash.png)

Start by opening **View** > **Terminal** (`kb(workbench.action.terminal.toggleTerminal)`). Select the dropdown arrow next to the `+` icon in the terminal panel to pick a new shell to open. If Git Bash is installed, it's shown in the list of terminals and shells. You can toggle between different terminals and shells in the Terminal sidebar. With Git Bash configured in Visual Studio Code, you can now use all of your favorite Git commands directly from the terminal in your code editor.

If you want to set Git Bash as your default shell, open the Terminal dropdown (next to the `+` icon) and select **Select Default Profile**. This opens a list of available shells, including Git Bash. Selecting *Git Bash* sets it as your default shell, and all future terminals will be opened with Git Bash. More advanced terminal tips are available in the [terminal documentation](/docs/terminal/basics.md).
