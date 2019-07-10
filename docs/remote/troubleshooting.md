---
Order: 5
Area: remote
TOCTitle: Tips and Tricks
PageTitle: Visual Studio Code Remote Development Troubleshooting Tips and Tricks
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Visual Studio Code Remote Development troubleshooting tips and tricks for SSH, Containers, and the Windows Subsystem for Linux (WSL)
DateApproved: 6/26/2019
---
# Remote Development Tips and Tricks

This article covers troubleshooting tips and tricks for each of the Visual Studio Code [Remote Development](https://aka.ms/vscode-remote/download/extension) extensions. See the [SSH](/docs/remote/ssh.md), [Containers](/docs/remote/containers.md), and [WSL](/docs/remote/wsl.md) articles for details on setting up and working with each specific extension.

## SSH tips

### Configuring key based authentication

[SSH public key authentication](https://www.ssh.com/ssh/public-key-authentication) is a convenient, high security authentication method that combines a local "private" key with a "public" key that you associate with your user account on an SSH host. This section will walk you through how to generate these keys and add them to a host.

> **Tip:** PuTTY for Windows is not a [supported client](#installing-a-supported-ssh-client), but you can [convert your PuTTYGen keys](#reusing-a-key-generated-in-puttygen).

### Quick start: SSH key

To set up SSH key based authentication for your remote host:

1. Check to see if you already have an SSH key on your **local** machine. The public key is typically located at `~/.ssh/id_rsa.pub` on macOS / Linux, and at `%USERPROFILE%\.ssh\id_rsa.pub` on Windows.

    If you do not have a key, run the following command in a **local** terminal / command prompt to generate an SSH key pair:

    ```bash
    ssh-keygen -t rsa -b 4096
    ```

    > **Tip:** Don't have `ssh-keygen`? Install [a supported SSH client](#installing-a-supported-ssh-client).

2. Add the contents of your **local** public key (the `id_rsa.pub` file) to the appropriate `authorized_keys` file(s) on the **SSH host**.

    On **macOS / Linux**, run the following command in a **local terminal**, replacing the user and host name as appropriate.

    ```bash
    ssh-copy-id your-user-name-on-host@host-fqdn-or-ip-goes-here
    ```

    On **Windows**, run the following commands in a **local command prompt** replacing the value of `REMOTEHOST` as appropriate.

    ```bat
    SET REMOTEHOST=your-user-name-on-host@host-fqdn-or-ip-goes-here

    scp %USERPROFILE%\.ssh\id_rsa.pub %REMOTEHOST%:~/tmp.pub
    ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
    ```

### Improving your security with a dedicated key

While using a single SSH key across all your SSH hosts can be convenient, if anyone gains access to your private key, they will have access to all of your hosts as well. You can prevent this by creating a separate SSH key for your development hosts. Just follow these steps:

1. Generate a separate SSH key in a different file.

    On macOS / Linux, run the following command in a **local terminal**:

    ```bash
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa-remote-ssh
    ```

    On Windows, run the following command in a **local command prompt**:

    ```bat
    ssh-keygen -t rsa -b 4096 -f %USERPROFILE%\.ssh\id_rsa-remote-ssh
    ```

2. In VS Code, run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`), select an SSH config file, and add (or modify) a host entry as follows:

    ```yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile ~/.ssh/id_rsa-remote-ssh
    ```

3. Add the contents of the **local** `id_rsa-remote-ssh.pub` file generated in step 1 to the appropriate `authorized_keys` file(s) on the **SSH host**.

    On **macOS / Linux**, run the following command in a **local terminal**, replacing `name-of-ssh-host-here` with the host name in the SSH config file from step 2:

    ```bash
    ssh-copy-id -i ~/.ssh/id_rsa-remote-ssh.pub name-of-ssh-host-here
    ```

    On **Windows**, run the following commands in a **local command prompt**, replacing `name-of-ssh-host-here` with the host name in the SSH config file from step 2.

    ```bat
    SET REMOTEHOST=name-of-ssh-host-here
    SET PATHOFIDENTITYFILE=%USERPROFILE%\.ssh\id_rsa-remote-ssh.pub

    scp %PATHOFIDENTITYFILE% %REMOTEHOST%:~/tmp.pub
    ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
    ```

### Reusing a key generated in PuTTYGen

If you used PuTTYGen to set up SSH public key authentication for the host you are connecting to, you need to convert your private key so that other SSH clients can use it. To do this:

1. Open PuTTYGen **locally** and load the private key you want to convert.
2. Select **Conversions > Export OpenSSH key** from the application menu. Save the converted key to a **local** location such as `%USERPROFILE%\.ssh`.
3. Validate that the **local** permissions on the exported key file only grant `Full Control` to your user, Administrators, and SYSTEM.
4. In VS Code, run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`), select the SSH config file you wish to change, and add (or modify) a host entry in the config file as follows:

    ```yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile C:\path\to\your\exported\private\keyfile
    ```

### Troubleshooting hanging or failing connections

If you are running into problems with VS Code hanging while trying to connect (and potentially timing out), there are a few things you can do to try to resolve the issue.

**See if VS Code is waiting on a prompt**

Enable the `remote.SSH.showLoginTerminal` [setting](/docs/getstarted/settings.md) in VS Code and retry. If you are prompted to input a password or token, see [Enabling alternate SSH authentication methods](#enabling-alternate-ssh-authentication-methods) for details on reducing the frequency of prompts.

**Enable TCP Forwarding on the remote host**

Remote - SSH extension makes use of an SSH tunnel to facilitate communication with the host. In some cases, this may be disabled on your SSH server. To see if this is the problem, open the **Remote - SSH** category in the output window and check for the following message:

```text
open failed: administratively prohibited: open failed
```

If you do see that message, follow these steps to update your SSH server's [sshd config](https://www.ssh.com/ssh/sshd_config/):

1. Open `/etc/ssh/sshd_config` in an editor  (like vim, nano, or pico) on the **SSH host** (not locally).
2. Add the setting  `AllowTcpForwarding yes`.
3. Restart the SSH server (on Ubuntu, run `sudo systemctl restart sshd`).
4. Retry.

**Set the ProxyCommand parameter in your SSH config file**

If you are behind a proxy and are unable to connect to your SSH host, you may need to use the `ProxyCommand` parameter for your host in a **local** [SSH config file](https://linux.die.net/man/5/ssh_config). You can [read this article](https://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/) for an example of its use.

**Ensure the remote machine has internet access**

The remote machine must have internet access to be able to download the VS Code Server and extensions from the Marketplace. See [the FAQ for details](/docs/remote/faq.md##what-are-the-connectivity-requirements-for-vs-code-server) on connectivity requirements.

**Set HTTP_PROXY / HTTPS_PROXY on the remote host**

If your remote host is behind a proxy, you may need to set the HTTP_PROXY or HTTPS_PROXY environment variable on the **SSH host**. Open your `~/.bashrc` file add the following (replacing `proxy.fqdn.or.ip:3128` with the appropriate hostname / IP and port):

```bash
export HTTP_PROXY=http://proxy.fqdn.or.ip:3128
export HTTPS_PROXY=$HTTP_PROXY

# Or if an authenticated proxy
export HTTP_PROXY=http://username:password@proxy.fqdn.or.ip:3128
export HTTPS_PROXY=$HTTP_PROXY
```

**Work around `/tmp` mounted with `noexec`**

Some remote servers are set up to disallow executing scripts from `/tmp`. VS Code writes its install script to the system temp directory and tries to execute it from there. You can work with your system administrator to determine whether this can be worked around.

**Check whether a different shell is launched during install**

Some users launch a different shell from their `.bash_profile` or other startup script on their **SSH host** because they want to use a different shell than the default. This can break VS Code's remote server install script and isn't recommended. Instead, use `chsh` to change your default shell on the remote machine.

**Connecting to systems that dynamically assign machines per connection**

Some systems will dynamically route an SSH connection to one node from a cluster each time an SSH connection is made. This is an issue for VS Code because it makes two connections to open a remote window: the first to install or start the VS Code Server (or find an already running instance) and the second to create the SSH port tunnel that VS Code uses to talk to the server. If VS Code is routed to a different machine when it creates the second connection, it won't be able to talk to the VS Code server.

One workaround for this is to use the `ControlMaster` option in OpenSSH (macOS/Linux clients only), described [above](#enabling-alternate-ssh-authentication-methods), so that VS Code's two connections will be multiplexed through a single SSH connection to the same node.

**Contact your system administrator for configuration help**

SSH is a very flexible protocol and supports many configurations. If you see other errors, in either the login terminal or the `Remote-SSH` output window, they could be due to a missing setting.

Contact your system administrator for information about the required settings for your SSH host and client. Specific command-line arguments for connecting to your SSH host can be added to an [SSH config file](https://linux.die.net/man/5/ssh_config).

To access your config file, run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`). You can then work with your admin to add the necessary settings.

### Enabling alternate SSH authentication methods

If you are connecting to an SSH remote host and are either:

- connecting with two-factor authentication,
- using password authentication,
- using an SSH key with a passphrase when the [SSH Agent](#setting-up-the-ssh-agent) is not running or accessible,

...VS Code should automatically prompt you to enter needed information. If you do not see the prompt, enable the `remote.SSH.showLoginTerminal` [setting](/docs/getstarted/settings.md) in VS Code. This setting displays the terminal whenever VS Code runs an SSH command. You can then enter your auth code, password, or passphrase when the terminal appears.

However, you may be prompted to enter this information multiple times due to [vscode-remote-release#642](https://github.com/microsoft/vscode-remote-release/issues/642). On macOS and Linux, you can avoid this problem by enabling the `ControlMaster` feature on your local machine so that OpenSSH runs multiple SSH sessions over a single connection.
To enable `ControlMaster`:

1. Add an entry like this to your SSH config file:

    ```yaml
    Host *
        ControlMaster auto
        ControlPath  ~/.ssh/sockets/%r@%h-%p
        ControlPersist  600
    ```

2. Then run `mkdir -p ~/.ssh/sockets` to create the sockets folder.

With `ControlMaster` enabled, you will only have to enter your auth code/password/passphrase once.

### Setting up the SSH Agent

If you are connecting to an SSH host using a key with a passphrase, you should ensure that the [SSH Agent](https://www.ssh.com/ssh/agent) is running **locally**. VS Code will automatically add your key to the agent so you don't have to enter your passphrase every time you open a remote VS Code window.

To verify that the agent is running and is reachable from VS Code's environment, run `ssh-add -l` in the terminal of a local VS Code window. You should see a listing of the keys in the agent (or a message that it has no keys). If the agent is not running, follow these instructions to start it. After starting the agent, be sure to restart VS Code.

**Windows:**

To enable SSH Agent automatically on Windows, start PowerShell as an Administrator and run the following commands:

```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

Now the agent will be started automatically on login.

**Linux:**

To start the SSH Agent in the background, run:

```bash
eval "$(ssh-agent -s)"
```

To start the SSH Agent automatically on login, add these lines to your `~/.bash_profile`:

```bash
if [ -z "$SSH_AUTH_SOCK" ]
then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]
   then
        # Launch a new instance of the agent
        ssh-agent -s &> .ssh/ssh-agent
   fi
   eval `cat .ssh/ssh-agent`
fi
```

**macOS:**

The agent should be running by default on macOS.

### Fixing SSH file permission errors

SSH can be strict about file permissions and if they are set incorrectly, you may see errors such as "WARNING: UNPROTECTED PRIVATE KEY FILE!". There are several ways to update file permissions in order to fix this, which are described in the sections below.

### Local SSH file and folder permissions

**macOS / Linux:**

On your local machine, make sure the following permissions are set:

| Folder / File |  Permissions |
|---------------|---------------------------|
| `.ssh` in your user folder | `chmod 700 ~/.ssh` |
| `.ssh/config` in your user folder | `chmod 600 ~/.ssh/config` |
| `.ssh/id_rsa.pub` in your user folder | `chmod 600 ~/.ssh/id_rsa.pub` |
| Any other key file | `chmod 600 /path/to/key/file` |

**Windows:**

The specific expected permissions can vary depending on the exact SSH implementation you are using. We strongly recommend using the out of box [Windows 10 OpenSSH Client](https://docs.microsoft.com/windows-server/administration/openssh/openssh_overview). If you are using this official client, cut-and-paste the following in an **administrator PowerShell window** to try to repair your permissions:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

Install-Module -Force OpenSSHUtils -Scope AllUsers

Repair-UserSshConfigPermission ~/.ssh/config
Get-ChildItem ~\.ssh\* -Include "id_rsa","id_dsa" -ErrorAction SilentlyContinue | % {
    Repair-UserKeyPermission -FilePath $_.FullName @psBoundParameters
}
```

For all other clients, consult **your client's documentation** for what the implementation expects. However, note that not all SSH clients may work.

### Server SSH file and folder permissions

On the remote machine you are connecting to, make sure the following permissions are set:

| Folder / File | Linux / macOS Permissions |
|---------------|---------------------------|
| `.ssh` in your user folder on the server | `chmod 700 ~/.ssh` |
| `.ssh/authorized_keys` in your user folder on the server  | `chmod 600 ~/.ssh/authorized_keys` |

Note that only Linux hosts are currently supported, which is why permissions for macOS and Windows 10 have been omitted.

### Installing a supported SSH client

| OS | Instructions |
|----|--------------|
| Windows 10 / Server 2016 | Install the [Windows OpenSSH Client](https://docs.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse). |
| Earlier Windows | Install [Git for Windows](https://git-scm.com/download/win). |
| macOS | Comes pre-installed. |
| Debian/Ubuntu | Run `sudo apt-get install openssh-client` |
| RHEL / Fedora / CentOS | Run `sudo yum install openssh-clients` |

VS Code will look for the `ssh` command in the PATH. Failing that, on Windows it will attempt to find `ssh.exe` in the default Git for Windows install path, and failing that attempt to use WSL if installed. You can specifically tell VS Code where to find the SSH client by adding the `remote.SSH.path` property in `settings.json`

### Installing a supported SSH server

| OS | Instructions | Details |
|----|--------------|---|
| Debian 8+ / Ubuntu 16.04+| Run `sudo apt-get install openssh-server` |  See the [Ubuntu SSH](https://help.ubuntu.com/community/SSH?action=show) documentation for details. |
| RHEL / CentOS 7+ | Run `sudo yum install openssh-server && sudo systemctl start sshd.service && sudo systemctl enable sshd.service` | See the [RedHat SSH](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-openssh) documentation for details. |
| SuSE 12+ / openSUSE 42.3+ |  In Yast, go to Services Manager, select "sshd" in the list, and click **Enable**. Next go to Firewall, select the **Permanent** configuration, and under services check **sshd**. | See the [SuSE SSH](https://en.opensuse.org/OpenSSH) documentation for details. |
| Windows | Not supported yet. | |
| macOS | Not supported yet. | |

### Resolving hangs when doing a Git push or sync on an SSH host

If you clone a Git repository using SSH and your SSH key has a passphrase, VS Code's pull and sync features may hang when running remotely.

Either use an SSH key without a passphrase, clone using HTTPS, or run `git push` from the command line to work around the issue.

### Using SSHFS to access files on your remote host

[SSHFS](https://en.wikipedia.org/wiki/SSHFS) is a secure remote filesystem access protocol that builds up from SFTP. It provides advantages over something like a CIFS / Samba share in that all that is required is SSH access to the machine.

> **Note:** For performance reasons, SSHFS is best used for single file edits and uploading/downloading content. If you need to use an application that bulk reads/write to many files at once (like a local source control tool), [rsync](#using-rsync-to-maintain-a-local-copy-of-your-source-code) is a better choice.

**macOS / Linux**:

On Linux, you can use your distribution's package manager to install SSHFS. For Debian/Ubuntu: `sudo apt-get install sshfs`

> **Note:** WSL 1 does not support FUSE or SSHFS, so the instructions differ for Windows currently. **WSL2 does include FUSE and SSHFS support**, so this will change soon.

On macOS, you can install SSHFS using [Homebrew](https://brew.sh/): `brew install sshfs` In addition, if you would prefer not to use the command line to mount the remote filesystem, you can also install [SSHFS GUI](https://github.com/dstuecken/sshfs-gui).

To use the command line, run the following commands from a local terminal (replacing `user@hostname` with the remote user and hostname / IP):

```bash
export USER_AT_HOST=user@hostname
# Make the directory where the remote filesystem will be mounted
mkdir -p "$HOME/sshfs/$USER_AT_HOST"
# Mount the remote filesystem
sshfs "$USER_AT_HOST:" "$HOME/sshfs/$USER_AT_HOST" -ovolname="$USER_AT_HOST" -p 22  \
    -o workaround=nonodelay -o transform_symlinks -o idmap=user  -C
```

This will make your home folder on the remote machine available under the `~/sshfs`. When you are done, you can unmount it using your OS's Finder / file explorer or by using the command line:

```bash
umount "$HOME/sshfs/$USER_AT_HOST"
```

**Windows:**

Follow these steps:

1. On Linux, add `.gitattributes` file to your project to **force consistent line endings** between Linux and Windows to avoid unexpected issues due to CRLF/LF differences between the two operating systems. [See below](#resolving-git-line-ending-issues-in-wsl-resulting-in-many-modified-files) for details.

2. Next, install [SSHFS-Win](https://github.com/billziss-gh/sshfs-win) on using [Chocolatey](https://chocolatey.org/): `choco install sshfs`

3. Once you've installed SSHFS for Windows, you can use the File Explorer's **Map Network Drive...** option with the path `\\sshfs\user@hostname`, where `user@hostname` is your remote user and hostname / IP. You can script this using the command prompt as follows: `net use /PERSISTENT:NO X: \\sshfs\user@hostname`

4. Once done, disconnect by right-clicking on the drive in the File Explorer and clicking **Disconnect**.

### Using rsync to maintain a local copy of your source code

An alternative to [using SSHFS to access remote files](#using-sshfs-to-access-files-on-your-remote-host) is to [use `rsync`](https://rsync.samba.org/) to copy the entire contents of a folder on remote host to your local machine. The `rsync` command will determine which files need to be updated each time it is run, which is far more efficient and convenient than using something like `scp` or `sftp`. This is primarily something to consider if you really need to use multi-file or performance intensive local tools.

The `rsync` command is available out of box on macOS and can be installed using Linux package managers (for example `sudo apt-get install rsync` on Debian/Ubuntu). For Windows, you'll need to either use [WSL](https://docs.microsoft.com/windows/wsl/install-win10) or [Cygwin](https://www.cygwin.com/) to access the command.

To use the command, navigate to the folder you want to store the synched contents and run the following replacing `user@hostname` with the remote user and hostname / IP and `/remote/source/code/path` with the remote source code location.

On **macOS, Linux, or inside WSL**:

```bash
rsync -rlptzv --progress --delete --exclude=.git "user@hostname:/remote/source/code/path" .
```

Or using **WSL from a command prompt on Windows**:

```bat
wsl rsync -rlptzv --progress --delete --exclude=.git "user@hostname:/remote/source/code/path" "$(wslpath -a '%CD%')"
```

You can rerun this command each time you want to get the latest copy of your files and only updates will be transferred. The `.git` folder is intentionally excluded both for performance reasons and so you can use local Git tools without worrying about the state on the remote host.

To push content, reverse the source and target parameters in the command. However, **on Windows** you should add a `.gitattributes` file to your project to **force consistent line endings** before doing so. [See below](#resolving-git-line-ending-issues-in-wsl-resulting-in-many-modified-files) for details.

```bash
rsync -rlptzv --progress --delete --exclude=.git . "user@hostname:/remote/source/code/path"
```

### Cleaning up the VS Code Server on the remote

The SSH extension provides a command for cleaning up the VS Code Server from the remote machine, **Remote-SSH: Uninstall VS Code Server from Host...**. The command does two things: it kills any running VS Code Server processes and it deletes the folder where the server was installed.

If you want to run these steps manually, or if the command isn't working for you, you can run a script like this:

```bash
kill -9 `ps ax | grep "remoteExtensionHostAgent.js" | grep -v grep | awk '{print $1}'`
kill -9 `ps ax | grep "watcherService" | grep -v grep | awk '{print $1}'`
rm -rf ~/.vscode-server # Or ~/.vscode-server-insiders
```

The VS Code Server was previously installed under `~/.vscode-remote` so you can check that location too.

## Container tips

### Docker Desktop for Windows tips

[Docker Desktop](https://www.docker.com/products/docker-desktop) for Windows works well in most setups, but there are a few "gotchas" that can cause problems. Here are some tips on avoiding them:

1. **Use an AD domain account or local administrator account when sharing drives. Do not use an AAD (email-based) account.** AAD (email-based) accounts have well known issues, as documented in Docker issues [#132](https://github.com/docker/for-win/issues/132) and [#1352](https://github.com/docker/for-win/issues/1352). If you must use an AAD account, create a separate local administrator account on your machine that you use purely for the purpose of sharing drives. Follow  the [steps in this blog post](https://blogs.msdn.microsoft.com/stevelasker/2016/06/14/configuring-docker-for-windows-volumes/) to get everything set up.

2. **Stick with alphanumeric passwords to avoid drive sharing problems.** When asked to share your drives on Windows, you will be prompted for the username and password of an account with admin privileges on the machine. If you are warned about an incorrect username or password, this may be due to special characters in the password. For example, `!`, `[` and `]` are known to cause issues. Change your password to alphanumeric characters to resolve. See this issue about [Docker volume mounting problems](https://github.com/moby/moby/issues/23992#issuecomment-234979036) for details.

3. **Use your Docker ID to sign into Docker (not your email).** The Docker CLI only supports using your Docker ID, so using your email can cause problems. See Docker issue [#935](https://github.com/docker/hub-feedback/issues/935#issuecomment-300361781) for details.

If you are still having trouble, see the [Docker Desktop for Windows troubleshooting guide](https://docs.docker.com/docker-for-windows/troubleshoot/#volumes).

### Enabling file sharing in Docker Desktop

The VS Code [Remote - Containers](https://aka.ms/vscode-remote/download/containers) extension can only automatically mount your source code into a container if your code is in a folder or drive shared with Docker. If you open a dev container from a non-shared location, the container will successfully start but the workspace will be empty.

To change Docker's drive and folder sharing settings:

**Windows:**

1. Right-click on the Docker task bar item and select **Settings**.
2. Go to the **Shared Drives** tab and check the drive(s) where your source code is located.

**macOS:**

1. Click on the Docker menu bar item and select **Preferences**.
2. Go to the **File Sharing** tab. Confirm that the folder containing your source code is under one of the shared folders listed.

### Resolving Git line ending issues in containers (resulting in many modified files)

Since Windows and Linux use different default line endings, Git may report a large number of modified files that have no differences aside from their line endings. To prevent this from happening, you can disable line ending conversion using a `.gitattributes` file or globally on the Windows side.

Typically adding or modifying a  `.gitattributes` file in your repository is the most reliable way to solve this problem. Committing this file to source control will help others and allows you to vary behaviors by repository as appropriate. For example, adding the following to `.gitattributes` file to the root of your repository will force everything to be LF, except for Windows batch files that require CRLF:

```yaml
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

Note that this works in **Git v2.10+**, so if you are running into problems, be sure you've got a recent Git client installed. You can add other file types in your repository that require CRLF to this same file.

If you would prefer to still always upload Unix-style line endings (LF), you can use the `input` option.

```bash
git config --global core.autocrlf input
```

If you'd prefer to disable line ending conversation entirely, run the following instead:

```bash
git config --global core.autocrlf false
```

Finally, you may need to clone the repository again for these settings to take effect.

### Avoid setting up Git in a container when using Docker Compose

See [Sharing Git credentials with your container](/docs/remote/containers.md#sharing-git-credentials-with-your-container) in the main containers article for information on resolving this issue.

### Resolving hangs when doing a Git push or sync from a Container

If you clone a Git repository using SSH and your SSH key has a passphrase, VS Code's pull and sync features may hang when running remotely.

Either use an SSH key without a passphrase, clone using HTTPS, or run `git push` from the command line to work around the issue.

### Resolving errors about missing Linux dependencies

Some extensions rely on libraries not found in the certain Docker images. See the [Containers](/docs/remote/containers.md#installing-additional-software-in-the-sandbox) article for a few options on resolving this issue.

### Resolving disk performance issues with local volume (bind) mounts on Docker Desktop for Mac

The Remote - Containers extension uses Docker's defaults for creating "bind mounts" to the local filesystem for your source code. While this is the safest option, you may encounter slower individual file disk performance when running commands like `yarn install` or `npm install` from inside the container.

A trick that is often used with Docker Desktop for Mac is to use cached consistency for the file mount. If you are using an **image** or **Dockerfile**, you can change the consistency requirements using `devcontainer.json`. For example:

```json
"workspaceMount": "src=/absolute/path/to/source/code,dst=/workspace,type=bind,consistency=cached",
"workspaceFolder": "/workspace"
```

See [Changing or removing the default source code mount](/docs/remote/containers-advanced.md#changing-the-default-source-code-mount) for additional details on the `workspaceMount` property.

For **Docker Compose**, you can modify the consistency requirements in `docker-compose.yml` instead. For example:

```yml
  volumes:
    - type: bind
      source: ./path/to/source/code
      target: /workspace # Should match 'workspaceFolder' in devcontainer.json
      consistency: cached
```

### Speeding up containers in Docker Desktop

By default, Docker Desktop only gives containers a fraction of your machine capacity. In most cases, this is enough, but if you are doing something that requires more capacity, you can increase memory, CPU, or disk use.

First, try [stopping any running containers](/docs/remote/containers.md#managing-containers) you are no longer using.

If this doesn't solve your problem, you may want to see if CPU usage is actually the issue or if there is something else going on. An easy way to check this is to install the [Resource Monitor extension](https://marketplace.visualstudio.com/items?itemName=mutantdino.resourcemonitor&ssr=false#overview). When installed in a container, it provides information about capacity for your containers in the Status bar.

![Resource use status bar](images/troubleshooting/resource-monitor.png)

If you'd like this extension to always be installed, add this to your `settings.json`:

```json
"remote.containers.defaultExtensions": [
    "mutantdino.resourcemonitor"
]
```

If you determine that you need to give your container more of your machine's capacity, follow these steps:

1. Right-click on the Docker task bar item and select **Settings** / **Preferences**.
2. Go to **Advanced** to increase CPU, Memory, or Swap.
3. On Mac, go to **Disk** to increase the amount of disk Docker is allowed to consume on your machine. On Windows, this is located under Advanced with the other settings.

Finally, if your container is disk intensive, you should avoid using a volume (bind) mount of your local filesystem to store data files (for example database data files) particularly on Windows. Update your application's settings to use a folder inside the container instead. On Docker Desktop for Mac, [using a cached consistency](#resolving-disk-performance-issues-with-local-volume-bind-mounts-on-docker-desktop-for-mac) for local filesystem mounts can also improve performance.

### Cleaning out unused containers and images

If you see an error from Docker reporting that you are out of disk space, you can typically resolve this by cleaning out unused containers and images. There are a few ways to do this:

**Option 1: Use the Docker extension.**

 1. Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) from the Extensions view if not already present.

    > **Note:** Using the Docker extension from a VS Code window opened in a container has some limitations. Most containers do not have the Docker command line installed. Therefore commands invoked from the Docker extension that rely on the Docker command line, for example **Docker: Show Logs**, fail. If you need to execute these commands, open a new local window and use the Docker extension from this VS Code window or [set up Docker inside your container](https://aka.ms/vscode-remote/samples/docker-in-docker).

 1. You can then go to the Docker view and expand the **Containers** or **Images** node, right-click, and select **Remove Container / Image**.

     ![Docker Explorer screenshot](images/containers/docker-remove.png)

**Option 2: Use the Docker CLI to pick containers to delete**:

1. Open a **local** terminal/command prompt (or use a local window in VS Code).
2. Type `docker ps -a` to see a list of all containers.
3. Type `docker rm <Container ID>` from this list to remove a container.
4. Type `docker image prune` to remove any unused images.

**Option 3: Use Docker Compose**:

1. Open a **local** terminal/command prompt (or use a local window in VS Code).
2. Go to the directory with your `docker-compose.yml` file.
3. Type `docker-compose down` to stop and delete the containers. If you have more than one Docker Compose file, you can specify additional Docker Compose files with the `-f` argument.

**Option 4: Delete all containers and images that are not running:**

1. Open a **local** terminal/command prompt (or use a local window in VS Code).
2. Type `docker system prune --all`.

### Resolving Dockerfile build failures for images using Debian 8

When building containers that use images based on Debian 8/Jessie — such as older versions of the `node:8` image — you may encounter the following error:

```text
...
W: Failed to fetch http://deb.debian.org/debian/dists/jessie-updates/InRelease  Unable to find expected entry 'main/binary-amd64/Packages' in Release file (Wrong sources.list entry or malformed file)
E: Some index files failed to download. They have been ignored, or old ones used instead.
...
```

This is a [well known issue](https://github.com/debuerreotype/docker-debian-artifacts/issues/66) caused by the Debian 8 being "archived". More recent versions of images typically resolve this problem, often by upgrading to Debian 9/Stretch.

There are two ways to resolve this error:

- **Option 1**: Remove any containers that depend on the image, remove the image, and then try building again. This should download an updated image that is not affected by the problem. See [cleaning out unused containers and images](#cleaning-out-unused-containers-and-images) for details.

- **Option 2**: If you don't want to delete your containers or images, add this line into your Dockerfile before any `apt` or `apt-get` command. It adds the needed source lists for Jessie:

    ```Dockerfile
    # Add archived sources to source list if base image uses Debian 8 / Jessie
    RUN cat /etc/*-release | grep -q jessie && printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
    ```

### Resolving Docker Hub sign in errors when an email is used

The Docker CLI only supports using your Docker ID, so using your email to sign in can cause problems. See Docker issue [#935](https://github.com/docker/hub-feedback/issues/935#issuecomment-300361781) for details.

As a workaround, use your Docker ID to sign into Docker rather than your email.

### High CPU utilization of Hyperkit on macOS

There is [known issue with Docker for Mac](https://github.com/docker/for-mac/issues/1759) that can drive high CPU spikes. In particular, high CPU usage occurring when watching files and building. If you see high CPU usage for `com.docker.hyperkit` in Activity Monitor while very little is going on in your dev container, you are likely hitting this issue. Follow the [Docker issue](https://github.com/docker/for-mac/issues/1759) for updates and fixes.

### Advanced container configuration tips

See the [Advanced Container Configuration](/docs/remote/containers-advanced.md) article for information on the following topics:

* [Adding environment variables](/docs/remote/containers-advanced.md#adding-environment-variables)
* [Adding another volume mount](/docs/remote/containers-advanced.md#adding-another-volume-mount)
* [Changing or removing the default source code mount](/docs/remote/containers-advanced.md#changing-the-default-source-code-mount)
* [Adding a non-root user to your dev container](/docs/remote/containers-advanced.md#adding-a-nonroot-user-to-your-dev-container)
* [Avoiding extension reinstalls on container rebuild](/docs/remote/containers-advanced.md#avoiding-extension-reinstalls-on-container-rebuild)
* [Using Docker or Kubernetes from inside a container](/docs/remote/containers-advanced.md#using-docker-or-kubernetes-from-a-container)
* [Connecting to multiple containers at once](/docs/remote/containers-advanced.md#connecting-to-multiple-containers-at-once)
* [Developing inside a container on a remote Docker Machine or SSH host](/docs/remote/containers-advanced.md#developing-inside-a-container-on-a-remote-docker-host)
* [Reducing Dockerfile build warnings](/docs/remote/containers-advanced.md#reducing-dockerfile-build-warnings)

## WSL tips

### Selecting the default distribution used by Remote - WSL

Opening a remote WSL window on a non-default WSL distro requires Windows 10, May 2019 Update (version 1903). With older WSL versions, VS Code will use your system **default distro**. You can use [wslconfig.exe](https://docs.microsoft.com/windows/wsl/wsl-config) to change your default as needed.

For example:

```bat
wslconfig /setdefault Ubuntu
```

You can see which distributions you have installed by running:

```bat
wslconfig /l
```

### VS Code server hangs when starting up

This can happen if there are custom startup scripts that prevent startup.

The VS Code server is started in an interactive login shell and uses the shell that is configured. See this [blog post](https://medium.com/@vinhp/set-and-use-zsh-as-default-shell-in-wsl-on-windows-10-the-right-way-4f30ed9592dc) for more information on how to specify a shell.

By default, `bash` is used as the shell. Bash will look for startup files under `/etc/profile` first and for any startup files under `~/.bash_profile`, `~/.bash_login`, `~/.profile`. If this lookup seems unnecessary, you may include all startup settings in `~/.bashrc`. Check whether these files contain any commands that could block the server from starting. For example, it is not recommended using the startup script to start another shell.

### Fixing problems with the code command not working

If typing `code` from a WSL terminal on Window does not work, you may be missing some key locations from your PATH in WSL.

Check by opening a WSL terminal and typing `echo $PATH`. You should see the following paths listed:

1. `/mnt/c/Windows/System32`
2. The VS Code install path. By default, this should be:

    ```bash
    /mnt/c/Users/Your Username/AppData/Local/Programs/Microsoft VS Code/bin
    ```

    But, if you installed the **System Installer** version, the install path is:

    ```bash
    /mnt/c/Program Files/Microsoft VS Code/bin
    ```

    ...or...

    ```bash
    /mnt/c/Program Files (x86)/Microsoft VS Code/bin
    ```

If the VS Code install path is missing, edit your `.bashrc`, add the following, and start a new terminal:

```bash
WINDOWS_USERNAME="Your Username"
VSCODE_PATH="/mnt/c/Users/${WINDOWS_USERNAME}/AppData/Local/Programs/Microsoft VS Code/bin"
# or...
# VSCODE_PATH="/mnt/c/Program Files/Microsoft VS Code/bin"
# or...
# VSCODE_PATH="/mnt/c/Program Files (x86)/Microsoft VS Code/bin"

export PATH=$PATH:/mnt/c/Windows/System32:${VSCODE_PATH}
```

> **Note:** Be sure to quote or escape spaces in the directory names.

### Resolving errors about missing dependencies

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager. For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### Resolving Git line ending issues in WSL (resulting in many modified files)

Since Windows and Linux use different default line endings, Git may report a large number of modified files that have no differences aside from their line endings. To prevent this from happening, you can disable line ending conversion using a `.gitattributes` file or globally on the Windows side.

Typically adding or modifying a  `.gitattributes` file in your repository is the most reliable way to solve this problem. Committing this file to source control will help others and allows you to vary behaviors by repository as appropriate. For example, adding the following to `.gitattributes` file to the root of your repository will force everything to be LF, except for Windows batch files that require CRLF:

```yaml
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

Note that this works in **Git v2.10+**, so if you are running into problems, be sure you've got a recent Git client installed. You can add other file types in your repository that require CRLF to this same file.

If you would prefer to still always upload Unix-style line endings (LF), you can use the `input` option.

```bash
git config --global core.autocrlf input
```

If you'd prefer to disable line ending conversation entirely, run the following instead:

```bash
git config --global core.autocrlf false
```

Finally, you may need to clone the repository again for these settings to take effect.

### Resolving hangs when doing a Git push or sync from WSL

If you clone a Git repository using SSH and your SSH key has a passphrase, VS Code's pull and sync features may hang when running remotely.

Either use an SSH key without a passphrase, clone using HTTPS, or run `git push` from the command line to work around the issue.

## Extension tips

While many extensions will work unmodified, there are a few issues that can prevent certain features from working as expected. In some cases, you can use another command to work around the issue, while in others, the extension may need to be modified. This section provides a quick reference for common issues and tips on resolving them. You can also refer to the main extension article on [Supporting Remote Development](/api/advanced-topics/remote-extensions) for an in-depth guide on modifying extensions to support remote extension hosts.

### Local absolute path settings fail when applied remotely

VS Code's local user settings are reused when you connect to a remote endpoint. While this keeps your user experience consistent, you may need to vary absolute path settings between your local machine and each host / container / WSL since the target locations are different.

**Resolution:** You can set endpoint-specific settings after you connect to a remote endpoint by running the **Preferences: Open Remote Settings** command from the Command Palette (`kbstyle(F1)`) or by clicking on the **Remote** tab in the settings editor. These settings will override any local settings you have in place whenever you connect.

### Need to install local VSIX on remote endpoint

Sometimes you want to install a local VSIX on a remote machine, either during development or when an extension author asks you to try out a fix.

**Resolution:** Once you have connected to an SSH host, container, or WSL, you can install the VSIX the same way you would locally. Run the **Extensions: Install from VSIX...** command from the Command Palette (`kbstyle(F1)`). You may also want to add `"extensions.autoUpdate": false` to `settings.json` to prevent auto-updating to the latest Marketplace version. See [Supporting Remote Development](/api/advanced-topics/remote-extensions) for more information on developing and testing extensions in a remote environment.

### Browser does not open locally

Some extensions use external node modules or custom code to launch a browser window. Unfortunately, this may cause the extension to launch the browser remotely instead of locally.

**Resolution:** The extension can switch to using the `vscode.env.openExternal` API to resolve this problem. See the [extension guide](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application) for details.

### Clipboard does not work

Some extensions use node modules like `clipboardy` to integrate with the clipboard. Unfortunately, this may cause the extension to incorrectly integrate with the clipboard on the remote side.

**Resolution:** The extension can switch to the VS Code clipboard API to resolve the problem. See the [extension guide](/api/advanced-topics/remote-extensions#using-the-clipboard) for details.

### Cannot access local web server from browser or application

When working inside a container or SSH host, the port the browser is connecting to may be blocked.

**Resolution:** The extension can switch to the  `vscode.env.openExternal` API (which automatically forwards localhost ports) to resolve this problem. See the [extension guide](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application) for details.

### WebView contents do not appear

If the extension's WebView content uses an iframe to connect to a local web server, the port the WebView is connecting to may be blocked.

**Resolution:** The WebView API now includes a `portMapping` property that the extension can use to solve this problem. See the [extension guide](/api/advanced-topics/remote-extensions#accessing-localhost) for details.

### Blocked localhost ports

If you are trying to connect to a localhost port from an external application, the port may be blocked.

**Resolution:** There currently is no API for extensions to programmatically forward arbitrary ports, but you can use the **Remote-Containers: Forward Port from Container...** or **Remote-SSH: Forward Port from Active Host...** to do so manually.

### Errors storing extension data

Extensions may try to persist global data by looking for the `~/.config/Code` folder on Linux. This folder may not exist, which can cause the extension to throw errors like `ENOENT: no such file or directory, open '/root/.config/Code/User/filename-goes-here`.

**Resolution:** Extensions can use the `context.globalStoragePath` or `context.storagePath` property to resolve this problem. See the [extension guide](/api/advanced-topics/remote-extensions#persisting-extension-data-or-state) for details.

### Cannot sign in / have to sign in each time I connect to a new endpoint

Extensions that require sign in may persist secrets using their own code. This code can fail due to missing dependencies. Even if it succeeds, the secrets will be stored remotely, which means you have to sign in for every new endpoint.

**Resolution:** Extensions can use the `keytar` node module to solve this problem. See the [extension guide](/api/advanced-topics/remote-extensions#persisting-secrets) for details.

### An incompatible extension prevents VS Code from connecting

If an incompatible extension has been installed on a remote host, container, or in WSL, we have seen instances where the VS Code Server hangs or crashes due to the incompatibility. If the extension activates right away, this can prevent you from connecting and being able to uninstall the extension.

**Resolution:** Manually delete the remote extensions folder by following these steps:

1. For containers, ensure your `devcontainer.json` no longer includes a reference to the faulty extension.

2. Next, use a separate terminal / command prompt to connect to the remote host, container, or WSL.

   - If SSH or WSL, connect to the environment accordingly (run `ssh` to connect to the server or open WSL terminal).
   - If using a container, identify the container ID by calling `docker ps -a` and looking through the list for an image with the correct name. If the container is stopped, run `docker run -it <id> /bin/sh`. If it is running, run `docker exec -it <id> /bin/sh`.

3. Once you are connected, run `rm -rf ~/.vscode-server/extensions` for VS Code stable and/or `rm -rf ~/.vscode-server-insiders/extensions` for VS Code Insiders to remove all extensions.

### Extensions that ship or acquire pre-built native modules fail

Native modules bundled with (or dynamically acquired for) a VS Code extension must be recompiled [using Electron's `electron-rebuild`](https://electronjs.org/docs/tutorial/using-native-node-modules). However, VS Code Server runs a standard (non-Electron) version of Node.js, which can cause binaries to fail when used remotely.

**Resolution:** Extensions need to be modified to solve this problem. They will need to include (or dynamically acquire) both sets of binaries (Electron and standard Node.js) for the "modules" version in Node.js that VS Code ships and then check to see if `context.executionContext === vscode.ExtensionExecutionContext.Remote` in their activation function to set up the correct binaries. See the [extension guide](/api/advanced-topics/remote-extensions#using-native-node.js-modules) for details.

### Extension only fails on non-x86_64 hosts or Alpine Linux

If an extension works on Debian 9+, Ubuntu 16.04+, or RHEL / CentOS 7+ remote SSH hosts, containers, or WSL, but fails on supported non-x86_64 hosts (for example, ARMv7l) or Alpine Linux containers, the extension may only include native code or runtimes that do not support these platforms. For example, the extensions may only include x86_64 compiled versions of native modules or runtimes. For Alpine Linux, the included native code or runtimes may not work due to [fundamental differences](https://wiki.musl-libc.org/functional-differences-from-glibc.html) between how `libc` is implemented in Alpine Linux (`musl`) and other distributions (`glibc`).

**Resolution:**
Extensions will need to opt-in to supporting these platforms by compiling / including binaries for these additional targets. It is important to note that some third party npm modules may also include native code that can cause this problem. So, in some cases you may need to work with the npm module author to add additional compilation targets. See the [extension guide](api/advanced-topics/remote-extensions#supporting-non-x8664-hosts-or-alpine-linux-containers) for details.

### Extensions fail due to missing modules

Extensions that rely on Electron or VS Code base modules (not exposed by the extension API) without providing a fallback can fail when running remotely. You may see errors in the Developer Tools console like `original-fs` not being found.

**Resolution:** Remove the dependency on an Electron module or provide a fallback. See the [extension guide](/api/advanced-topics/remote-extensions#avoid-using-electron-modules) for details.

### Cannot access / transfer remote workspace files to local machines

Extensions that open workspace files in external applications may encounter errors because the external application cannot directly access the remote files.

**Resolution:** None currently. We are investigating options for how extensions might be able to transfer files from the remote workspace to solve this problem.

### Cannot access attached device from extension

Extensions that access locally attached devices will be unable to connect to them when running remotely.

**Resolution:** None currently. We are investigating the best approach to solve this problem.

## Questions and feedback

- See [Remote Development FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
