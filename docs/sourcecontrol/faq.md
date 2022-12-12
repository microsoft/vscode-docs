---
Order: 16
Area: sourcecontrol
TOCTitle: FAQ
PageTitle: Source Control, Git & GitHub in VS Code Frequently Asked Questions
ContentId: 431b4458-34c4-4aba-a0ee-eaddf7cd91a1
MetaDescription: Visual Studio Code's Frequently Asked Questions (FAQ) for Source Control, Git & GitHub in VS Code
DateApproved: 12/7/2022
---
# Source Control FAQ

This topic answers frequently asked questions about using Git source control and GitHub in Visual Studio Code.

## Git

### How to revert or undo a Git commit?

Revert your last commit with the **Git: Undo Last Commit** command. This will reset your branch to the state right before you did the commit, including all changes. The command is also available as menu in **More Actions** `...` under **Commit** on the top of the Source Control view.

### How to rename a local branch?

The **Git: Rename Branch…** command will prompt you for the new name.

### How to I undo a git add before committing?

Added files listed in the **Staged Changes** can be unstaged with the **-** icon or by drag-and-drop.

### How to I edit the most recent commit message?

To update the commit message for the last local commit use the **Git: Commit Staged (Amend)** command. It will open an editor to edit and save the last message. Make sure that no other changes are staged, as they would be included with the commit.

### I initialized my repo but the actions in the `...` menu are all grayed out

To **push, pull, and sync** you need to have a Git origin set up.  You can get the required URL from the repository host.  Once you have that URL, you need to add it to the Git settings by running a couple of command-line actions. For example:

```bash
> git remote add origin https://github.com/<repo owner>/<repo name>.git
> git push -u origin main
```

### My team is using Team Foundation Version Control (TFVC) instead of Git. What should I do?

Use the [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) extension and this will light up TFVC support.

### Why do the Pull, Push and Sync actions never finish?

This usually means there is no credential management configured in Git and you're not getting credential prompts for some reason.

You can always set up a [credential helper](https://help.github.com/articles/caching-your-github-password-in-git/) in order to pull and push from a remote server without having VS Code prompt for your credentials each time.

### How can I sign in to Git with my Azure DevOps organization that requires multi-factor authentication?

[Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager) (GCM) is the recommended Git credential helper for Windows, macOS, and Linux. If you're running Git for Windows, GCM has already been installed and configured for you. If you're running on macOS or Linux, the GCM [README](https://github.com/GitCredentialManager/git-credential-manager#download-and-install)
has setup instructions.

### I have GitHub Desktop installed on my computer but VS Code ignores it

VS Code only supports the [official Git distribution](https://git-scm.com/) for its Git integration.

### I keep getting Git authentication dialogs whenever VS Code is running

VS Code automatically fetches changes from the server in order to present you with a summary of incoming changes. The Git authentication dialog is independent from VS Code itself and is a part of your current Git credential helper.

One way to avoid these prompts is to set up a [credential helper](https://help.github.com/articles/caching-your-github-password-in-git/) that remembers your credentials.

Another option is to disable the auto fetch feature by changing the following setting: `"git.autofetch": false`.

### Why is VS Code warning me that the git repository is potentially unsafe?

VS Code uses `git.exe` for executing all git operations. Starting with Git [2.35.2](https://github.blog/2022-04-18-highlights-from-git-2-36/#stricter-repository-ownership-checks), users are prevented from running git operations in a repository that is in a folder that owned by a user other than the current user as the repository is deemed to be potentially unsafe.

If you try to open such a repository, VS Code will show a welcome view in the Source Control view as well as an error notification. Both the welcome view, and the notification contain the **Manage Unsafe Repositories** command that enables user to review the list of potentially unsafe repositories, mark them as safe, and open them. The **Manage Unsafe Repositories** command is also available in the command palette. Marking a repository as safe will add the repository location to the `safe.directory` [git configuration](https://git-scm.com/docs/git-config#Documentation/git-config.txt-safedirectory).

### Can I use SSH Git authentication with VS Code?

Yes, though VS Code works most easily with SSH keys without a passphrase. If you have an SSH key with a passphrase, you'll need to launch VS Code from a Git Bash prompt to inherit its SSH environment.

## GitHub

### Is GitHub Enterprise supported?

VS Code has official support for authentication with GitHub Enterprise Servers. Open a local checkout of a GHES repository and you will be prompted to sign in with your GitHub Enterprise Server account.
