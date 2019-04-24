---
Order: 5
Area: remote
TOCTitle: Tips and Tricks
PageTitle: Visual Studio Code Remote Development Troubleshooting Tips and Tricks
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Visual Studio Code Remote Development troubleshooting tips and tricks for SSH, Containers, and the Windows Subsystem for Linux (WSL)
DateApproved: 4/11/2019
---
# Remote Development Tips and Tricks

This article covers troubleshooting tips and tricks for each of the Visual Studio Code Remote Development extensions. See the [SSH](/docs/remote/ssh.md), [Containers](/docs/remote/containers.md), and [WSL](/docs/remote/wsl.md) articles for details on setting up and working with each specific extension.

## SSH tips

### Configuring key based authentication

> **Azure Linux VM / PuTTY Tip:** If you've already set up key based authentication using PuTTYGen, you will need to convert your private key for use in other SSH clients. See [below](#reusing-a-key-generated-in-puttygen) for details.

#### Quick start

You can set up SSH key based authentication for your remote host as follows:

1. Check to see if `~/.ssh/id_rsa.pub` exists on macOS / Linux or `%USERPROFILE%\.ssh\id_rsa.pub` on Windows. If not, run the following command in a terminal / command prompt to generate an SSH key pair:

    ````bash
    ssh-keygen -t rsa -b 4096
    ````

    > **Tip:** Don't have `ssh-keygen`? Install [a supported client](#installing-a-supported-ssh-client).

2. Add the contents of your **local** `id_rsa.pub` file to the appropriate `authorized_keys` file(s) on the remote host.

    On **macOS / Linux**, run the following command in a **local terminal** replacing the user and host name as appropriate.

    ````bash
    ssh-copy-id your-user-name-on-host@host-fqdn-or-ip-goes-here
    ````

    On **Windows**, run the following commands in a **local command prompt** replacing the value of `REMOTEHOST` as appropriate.

    ````bat
    SET REMOTEHOST=your-user-name-on-host@host-fqdn-or-ip-goes-here

    scp %USERPROFILE%\.ssh\id_rsa.pub %REMOTEHOST%:~/tmp.pub
    ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
    ````

#### Improving your security with a dedicated key

While using a single SSH key across all your SSH hosts can be convenient, if anyone gains access to your private key, they will have access to all of your hosts as well. You can solve this by creating a separate SSH key for your development hosts. Just follow these steps:

1. Generate a separate SSH key in a different file by running the following in a **local terminal** on macOS / Linux:

    ```bash
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa-remote-ssh
    ```

    ...or in a **local command prompt** on Windows:

    ```bat
    ssh-keygen -t rsa -b 4096 -f %USERPROFILLE%\.ssh\id_rsa-remote-ssh
    ```

2. Run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`), select an SSH config file, and add (or modify) a host entry as follows:

   *macOS / Linux:*

    ````yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile $HOME/.ssh/id_rsa-remote-ssh
    ````

    *Windows:*

    ````yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile %USERPROFILLE%\.ssh\id_rsa-remote-ssh
    ````

3. Add the contents the **local** `id_rsa-remote-ssh.pub` file generated in step 1 to the appropriate `authorized_keys` file(s) on the remote host.

    On **macOS / Linux**, run the following command in a **local terminal** replacing `name-of-ssh-host-here` with the host name in the SSH config file from step 2:

    ````bash
    ssh-copy-id -f ~/.ssh/id_rsa-remote-ssh.pub name-of-ssh-host-here
    ````

    ...or on **Windows**, run the following commands in a **local command prompt** replacing `name-of-ssh-host-here` with the host name in the SSH config file from step 2.

    ````bat
    SET REMOTEHOST=name-of-ssh-host-here
    SET PATHOFIDENTITYFILE=%USERPROFILE%\.ssh\id_rsa-remote-ssh.pub

    scp %PATHOFIDENTITYFILE% %REMOTEHOST%:~/tmp.pub
    ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
    ````

### Reusing a key generated in PuTTYGen

If you already used PuTTYGen to set up SSH public key authentication for the host you are connecting to, you will need to convert your private key for use in other SSH clients.

Follow these steps:

1. Load the private key you created back into PuTTYGen
2. Select **Conversions > Export OpenSSH key** and select a location to export the key such as `%USERPROFILE%\.ssh`.
3. Validate that the permissions on the file you exported only grant "Full Control to your user, Administrators, and SYSTEM.
4. Run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`), select an SSH config file, and add (or modify) a host entry as follows:

    ````yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile C:\path\to\your\exported\private\keyfile
    ````

### Enabling alternate SSH authentication methods

If one of the following conditions applies, you will need to enable the `remote.SSH.showLoginTerminal` setting:

- Connecting with 2-factor authentication
- Using password authentication
- Using an SSH key with a passphrase when the [SSH Agent](#setting-up-the-ssh-agent) is not running or accessible

This setting will cause the terminal to be shown whenever VS Code runs an SSH command. You will have to enter your auth code, password, or passphrase each time. A convenient way to work around this is to enable the `ControlMaster` feature that tells OpenSSH to run multiple SSH sessions over a single connection.

Enable it in your SSH config file like this:

```yaml
Host *
    ControlMaster auto
    ControlPath  ~/.ssh/sockets/%r@%h-%p
    ControlPersist  600
```

Finally, run `mkdir -p ~/.ssh/sockets` to create the sockets folder.

With this enabled, you will only have to enter your auth code/password/passphrase once.


### Setting up the SSH Agent

If you are connecting to your SSH host using a key with a passphrase, you should ensure that the [SSH Agent](https://www.ssh.com/ssh/agent) is running. If it's running, VS Code will add your key to the agent so you don't have to enter your passphrase every time you open a remote VS Code window.

After starting the agent, restart VS Code. To verify that the agent is running and is reachable from VS Code's environment, run `ssh-add -l` in a terminal in a local VS Code window. You should see a listing of the keys in the agent (or a message that it has no keys).

#### Windows

Start a powershell instance as Administrator, and run these commands.

```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

#### Linux

Add these lines to `~/.bash_profile` to ensure that the agent is started on every login.

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

#### MacOS

The agent should be running by default on MacOS.


### Fixing SSH file permission errors

SSH can be particular about file permissions and you can see errors like "WARNING: UNPROTECTED PRIVATE KEY FILE!" if set incorrectly. Update your permissions as follows.

#### SSH local file and folder permissions

The following are permissions that should be set correctly on your local machine.

| Folder / File | Linux / macOS Permissions | Windows Permissions |
|---------------|---------------------------|---------------------|
| `.ssh` in your user folder | `chmod 700 ~/.ssh` | Grant "Full Control" to your user, Administrators, and SYSTEM. |
| `.ssh/config` in your user folder | `chmod 600 ~/.ssh` | Grant "Full Control" to your user, Administrators, and SYSTEM. |
| `.ssh/id_rsa.pub` in your user folder | `chmod 600 ~/.ssh/id_rsa.pub` | Grant "Full Control" to your user, Administrators, and SYSTEM. |
| Any other key file | `chmod 600 /path/to/key/file` | Grant "Full Control" to your user, Administrators, and SYSTEM.|

#### SSH server file and folder permissions

The following are permissions that need to be correct on the remote machine you are connecting to.

| Folder / File | Linux / macOS Permissions |
|---------------|---------------------------|
| `.ssh` in your user folder on the server | chmod 700 ~/.ssh |
| `.ssh/authorized_keys` in your user folder on the server  | chmod 600 ~/.ssh/authorized_keys |

#### Updating permissions on Windows using the command line

If you'd prefer to use the command line to update permissions on Windows, you can use the `icacls` command.

The example below will set your user as the owner, clear out permissions, disable inheritance, and grant the needed permissions:

```bat
SET FILEORFOLDERTOUPDATE="%USERPROFILE%\.ssh"

icacls "%FILEORFOLDERTOUPDATE%" /c /setowner %USERDOMAIN%\%USERNAME%
icacls "%FILEORFOLDERTOUPDATE%" /c /reset
icacls "%FILEORFOLDERTOUPDATE%" /c /inheritance:r /grant %USERDOMAIN%\%USERNAME%:F SYSTEM:F BUILTIN\Administrators:F
```

### Installing a supported SSH client

| OS | Instructions |
|----|--------------|
| Windows 10 / Server 2016 | Install the [Windows OpenSSH Client](https://docs.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse). |
| Earlier Windows | Install [Git for Windows](https://git-scm.com/download/win) and select the **Use Git and optional Unix tools from the Command Prompt** option or manually add `C:\Program Files\Git\usr\bin` into your PATH. |
| macOS | No steps required. |
| Debian/Ubuntu | Run `sudo apt-get install openssh-client` |
| RHL / Fedora / CentOS | Run `sudo yum install openssh-clients` |

### Installing a supported SSH server

| OS | Instructions |
|----|--------------|
| Debian / Ubuntu | Run `sudo apt-get install openssh-server` |  See [here](https://help.ubuntu.com/community/SSH?action=show) for additional setup instructions. |
| RHL / Fedora / CentOS | Run `sudo yum install openssh-server && sudo systemctl start sshd.service && sudo systemctl enable sshd.service` | You may need to omit `sudo` when running in a container. |
| macOS | Go to **System Preferences** &gt; **Sharing**, check **Remote Login**. | |


## Container tips

### Docker Desktop for Windows tips

Docker Desktop for Windows works well in many cases, but there are a number of "gotchas" to that can cause real headaches. The following are some tips to avoid them:

1. **Use an AD domain account or local administrator account when sharing drives. Do not use an AAD (email-based) account.**  AAD (email-based) accounts have well known issues as documented [here](https://github.com/docker/for-win/issues/132) and [here](https://github.com/docker/for-win/issues/1352). If you must use this type of account, create a separate local administrator account on your machine that you use purely for the purpose of sharing drives. Follow  the [steps in this blog post](https://blogs.msdn.microsoft.com/stevelasker/2016/06/14/configuring-docker-for-windows-volumes/) to get everything set up.

2. **Stick with alphanumeric passwords to avoid drive sharing problems.** When asked to share your drives on Windows, you will be asked for user name and password with admin privileges on the machine. If you get incorrect username/password, this may be due to special characters in the password. For example, `!`, `[` and `]` are known to cause issues. Change your password to alphanumeric characters to resolve. See [here](https://github.com/moby/moby/issues/23992#issuecomment-234979036) for details.

3. **Use your Docker ID to sign into Docker (not email).** The Docker CLI only supports using your Docker ID, so using your email can cause problems. See [here](https://github.com/docker/hub-feedback/issues/935#issuecomment-300361781) for details.

If you are still having trouble see the [Docker Desktop for Windows troubleshooting guide](https://docs.docker.com/docker-for-windows/troubleshoot/#verify-domain-user-has-permissions-for-shared-drives-volumes).

### Enabling file sharing in Docker Desktop

The VS Code Remote - Containers extension can automatically mount your source code into the container if (and only if) it's in an allowed location. You can update this as follows:

1. Right-click on the Docker task bar item and select Settings.
2. On Windows, go to the Shared Drives tab and check the drive(s) where your source code is located. On macOS, go the File Sharing tab and be sure the folder containing your source code is under a file path specified in the list.

### Resolving Git line ending issues (resulting in many modified files)

Since Windows and Linux use different default line endings, you may see files that appear modified by seem to have no differences aside from the line endings.  To prevent this from happening, you can disable automatic line ending conversion and add a `.gitattributes` file to your folder.  Run

```bash
git config --global core.autocrlf false
```

You will need to re-clone the repository for this setting to take effect.

Optionally, you can add the following contents to a `.gitattributes` file to force everything to be LF except for windows batch files that require CRLF:

```yaml
*.* text eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

### Resolving errors about missing Linux dependencies

Some extensions rely on libraries not found in the certain Docker images. See the [primary containers article](/docs/remote/containers.md#installing-additional-software-in-the-sandbox) for a few options on resolving this issue.

### Speeding up containers in Docker Desktop

By default, Docker Desktop only gives containers a fraction of your machine capacity. In most cases, this is enough, but if you are doing something that requires more capacity you can increase memory, CPU, or disk use.

First, try [stopping any running containers](/docs/remote/containers.md#managing-containers) you are no longer using.

If this doesn't solve your problem, you may want to see if CPU is actually your problem or if there is something else going on. An easy way to keep tabs on this this is to install the [Resource Monitor extension](https://marketplace.visualstudio.com/items?itemName=mutantdino.resourcemonitor&ssr=false#overview). When installed in a container, it will provide you info about capacity for your containers in the status bar.

![Resource use status bar](images/troubleshooting/resource-monitor.png)

If you'd like this extension to always be installed, add this to `settings.json`:

```json
"remote.containers.defaultExtensions": [
    "mutantdino.resourcemonitor"
]
```

If you determine that you need to give your container more of your machine's capacity, follow these steps:

1. Right-click on the Docker task bar item and select Preferences...
2. Click on Advanced to increase CPU, Memory, or Swap.
3. Click on Disk to increase the amount of disk Docker is allowed to consumer on your machine.

Finally, if the application is disk intensive, you should avoid using a volume mount of your local filesystem to store data files (for example database data files) particularly on Windows. Update your application's settings to use a folder inside the container instead.

### Cleaning out unused containers and images

If you see an error from Docker reporting that you are out of disk space, you can resolve this typically by cleaning out your unused containers and images. There are a few ways of doing this:

**Option 1: Use the Docker extension from a local window.** While you can use the [Docker-in-Docker](https://aka.ms/vscode-remote/sample/docker-in-docker) approach to use the [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) from within a container, typically it is easiest to manage your containers from a separate local window so you don't accidentally shut down the container you are using.

 1. Use **File > New Window** to open a local window.

 2. Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) from the Extensions view if not already present.

 3. You can then go to the Docker panel and expand the Containers or Images tree, right-click, and select Remove Container / Image.

     ![Docker Explorer screenshot](images/containers/docker-remove.png)

**Option 2: Use the Docker CLI to pick containers to delete**:

1. Open a terminal
2. Type `docker ps -a` to see all containers
3. Type `docker rm <Container ID>` from this list to remove a container.
4. Type `docker image prune` to remove any unused images.

**Option 3: Use Docker Compose**:

1. Open a terminal
2. Go to the directory with your `docker-compose.yml` file
3. Type `docker-compose down` stop and delete. If you have more than one Docker Compose file, can specify additional Docker Compose files with the `-f` argument.

**Option 4: Delete all containers and images that are not running:**

1. Open a terminal
2. Type `docker system prune --all`

### Connecting to multiple containers

Currently you can only connect to one container per VS Code window. However, you can spin up multiple containers and [attach to them](#attaching-to-running-containers) from different VS Code windows to work around this limitation.

### Using Docker / Kubernetes from inside a dev container

You can use Docker and Kubernetes related CLIs and extensions from inside your development container by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes) in the container. See the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker), [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

## WSL tips

### Selecting the distribution used by Remote - WSL

The Remote - WSL extension uses your **default distribution** which you can change using `wslconfig.exe`. For example:

```bat
wslconfig /setdefault Ubuntu
```

You can see which distributions you have installed using:

```bat
wslconfig /l
```

### Resolving errors about missing dependencies

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager.  For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### Resolving Git line ending issues (resulting in many modified files)

Since Windows and Linux use different default line endings, you may see files that appear modified by seem to have no differences aside from the line endings.  To prevent this from happening, you can disable automatic line ending conversion and add a `.gitattributes` file to your folder.  Run

```bash
git config --global core.autocrlf false
```

You will need to re-clone the repository for this setting to take effect.

Optionally, you can add the following contents to a `.gitattributes` file to force everything to be LF except for windows batch files that require CRLF:

```yaml
*.* text eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

## Questions and feedback

> **Dogfooding Note:**  When reporting issues, please file them against the [vscode-remote](https://github.com/Microsoft/vscode-remote/issues) repository.

- See [Remote Development FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
