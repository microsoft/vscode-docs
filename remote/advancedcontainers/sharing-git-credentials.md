---
Order: 15
Area: advancedcontainers
TOCTitle: Sharing git credentials
PageTitle: Sharing git credentials
ContentId: 4627daab-1bc2-4e3b-ba81-cd9319ec1230
MetaDescription: Sharing git credentials
DateApproved: 3/30/2023
---

# Sharing Git credentials with your container

The Dev Containers extension provides out of the box support for using local Git credentials from inside a container. In this section, we'll walk through the two supported options.

If you do not have your user name or email address set up locally, you may be prompted to do so. You can do this on your **local** machine by running the following commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@address"
```

The extension will automatically copy your local `.gitconfig` file into the container on startup so you should not need to do this in the container itself.

## Using a credential helper

If you use HTTPS to clone your repositories and **have a [credential helper configured](https://docs.github.com/get-started/getting-started-with-git/caching-your-github-credentials-in-git) in your local OS, no further setup is required.** Credentials you've entered locally will be reused in the container and vice versa.

## Using SSH keys

There are some cases when you may be cloning your repository using SSH keys instead of a credential helper. To enable this scenario, the extension will automatically forward your **local [SSH agent](https://www.ssh.com/ssh/agent) if one is running**.

You can add your local SSH keys to the agent if it is running by using the `ssh-add` command. For example, run this from a terminal or PowerShell:

```bash
ssh-add $HOME/.ssh/github_rsa
```

On Windows and Linux, you may get an error because the agent is not running (macOS typically has it running by default). Follow these steps to resolve the problem:

**Windows**:

Start a **local Administrator PowerShell** and run the following commands:

```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

**Linux:**

First, start the SSH Agent in the background by running the following in a terminal:

```bash
eval "$(ssh-agent -s)"
```

Then add these lines to your `~/.bash_profile` or `~/.zprofile` (for Zsh) so it starts on login:

```bash
if [ -z "$SSH_AUTH_SOCK" ]; then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # Launch a new instance of the agent
        ssh-agent -s &> $HOME/.ssh/ssh-agent
   fi
   eval `cat $HOME/.ssh/ssh-agent`
fi
```

## Sharing GPG Keys

If you want to [GPG](https://www.gnupg.org/) sign your commits, you can share your local keys with your container as well. You can find out about signing using a GPG key in [GitHub's documentation](https://docs.github.com/authentication/managing-commit-signature-verification).

If you do not have GPG set up, you can configure it for your platform:

* On **Windows**, you can install [Gpg4win](https://www.gpg4win.org/).
* On **macOS**, you can install [GPG Tools](https://gpgtools.org/).
* On **Linux**, **locally** install the `gnupg2` package using your system's package manager.
* On **WSL**:
  * Install [Gpg4win](https://www.gpg4win.org/) on the Windows side.
  * Install `gpg` in your WSL distro. `sudo apt install gpg`
  * Register a `pinentry` GUI in your WSL distro. `echo pinentry-program /mnt/c/Program\ Files\ \(x86\)/Gpg4win/bin/pinentry.exe > ~/.gnupg/gpg-agent.conf`
  * Reload the `gpg` agent in WSL. `gpg-connect-agent reloadagent /bye`

>**Note**: For Windows user, the gpg signing key must be configured using the Windows GUI or CLI (powershell/cmd) and not in Git Bash. A Dev Container can't access the gpg keys set in Git Bash even though it is in your `~/.gnupg/` folder, accessible in the Windows Explorer.

Next, install `gnupg2` in your container by updating your Dockerfile.

For example:

```docker
RUN apt-get update && apt-get install gnupg2 -y
```

Or if running as a [non-root user](/remote/advancedcontainers/add-nonroot-user.md):

```docker
RUN sudo apt-get update && sudo apt-get install gnupg2 -y
```

To apply your configuration changes, you need to rebuild the container. You can do this by running **Dev Containers: Rebuild Container** from the Command Palette (`F1`). The next time the container starts, your GPG keys should be accessible inside the container as well.

>**Note**: If you used `gpg` previously in the container, you may need to run **Dev Containers: Rebuild Container** for the update to take effect.
