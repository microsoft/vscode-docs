---
Order: 5
Area: remote
TOCTitle: Tips & Tricks
PageTitle: Visual Studio Code Remote Development Troubleshooting Tips and Tricks
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Visual Studio Code Remote Development troubleshooting tips and tricks for SSH, Containers, and WSL
DateApproved: 4/11/2019
---
# Remote Development Tips & Tricks

This article covers troubleshooting tips and tricks for each of the Visual Studio Code Remote Development extensions. See the [SSH](/docs/remote/ssh.md), [Containers](/docs/remote/containers.md), and [WSL](/docs/remote/wsl.md) articles for more details on setting up and working with each of their respective capabilities.

## SSH Tips

### Configuring key based authentication

> **Azure Linux VM / PuTTY Tip:** If you've already set up key based authentication using PuTTYGen, you will need to convert your private key for use in other SSH clients. See [below](#reusing-a-key-generated-in-puttygen) for details.

You can set up SSH key based authentication for your remote host as follows:

1. Check to see if `~/.ssh/id_rsa.pub` exists on macOS / Linux or `%USERPROFILE%\.ssh\id_rsa.pub` on Windows. If not, run the following command in a terminal / command prompt to generate a SSH key pair:

    ````bash
    ssh-keygen -t rsa -b 4096 -C "your@email-address.here"
    ````

    > **Tip:** Don't have `ssh-keygen`? Install [a supported client](#installing-a-supported-ssh-client).

2. Add the contents of your **local** `id_rsa.pub` file to the appropriate `authorized_keys` file(s) on the remote host. How you do this depends on the operating systems involved.

    **macOS / Linux to macOS / Linux**: Run the following command in a terminal replacing `your-remote-linux-machine` with the host from your SSH config file.

    ````bash
    ssh-copy-id your-remote-linux-machine
    ````

    **Windows to macOS/Linux**: Run the following commands in a command prompt replacing `your-remote-linux-machine` with the host from your SSH config file.

    ````bash
    SET REMOTEHOST=user@your-remote-linux-machine

    scp %USERPROFILE%\.ssh\id_rsa.pub %REMOTEHOST%:~/tmp.pub
    ssh %REMOTEHOST% "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat ~/tmp.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm -f ~/tmp.pub"
    ````

### Reusing a key generated in PuTTYGen

If you already used PuTTYGen to set up SSH public key authentication for the host you are connecting to, you will need to convert your private key for use in other SSH clients. Simply follow these steps:

1. Load the private key you created back into PuTTYGen
2. Select **Conversions > Export OpenSSH key** and select a location to export the key such as `%USERPROFILE%\.ssh`.
3. Validate that the permissions on the file you exported only grant "Full Control to your user, Administrators, and SYSTEM.
4. Open your SSH `config` file and add an `IdentityFile` keyword with the path to the key file. For example:

    ````
    Host example-azure-vm-with-exported-private-key
        User myuser
        HostName 192.168.0.128
        IdentityFile C:\path\to\your\exported\private\keyfile
    ````

### Enabling alternate SSH authentication methods

If one of the following conditions apply, you will need to enable the `remote.SSH.showLoginTerminal` setting:

- Connecting with 2-factor authentication
- Using password auth
- Using an SSH key with a passphrase when the SSH agent is not running or accessible

This setting will cause the terminal to be shown whenever vscode runs an ssh command. You will have to enter your auth code, password, or passphrase each time. A convenient way to work around this is to enable the `ControlMaster` feature that tells OpenSSH to multiple multiple SSH sessions over a single connection. Enable it in your SSH config file like this:

```
Host *
    ControlMaster auto
    ControlPath  ~/.ssh/sockets/%r@%h-%p
    ControlPersist  600
```

Finally, run `mkdir -p ~/.ssh/sockets` to create the sockets folder.

With this enabled, you will only have to enter your auth code/password/passphrase once.

### Fixing SSH file permission errors

SSH can be very particular about file permissions and you can see errors like "WARNING: UNPROTECTED PRIVATE KEY FILE!" if set incorrectly. Update your permissions as follows.

#### SSH local file and folder permissions

The following are permissions that should be set correctly on your local machine.

| Folder / File | Linux / macOS Permissions | Windows Permissions |
|---------------|---------------------------|---------------------|
| `.ssh` in your user folder | chmod 700 ~/.ssh | Grant "Full Control" to your user, Administrators and SYSTEM. |
| `.ssh/config` in your user folder | chmod 600 ~/.ssh | Grant "Full Control" to your user, Administrators and SYSTEM. |
| `.ssh/id_rsa.pub` in your user folder | chmod 600 ~/.ssh/id_rsa.pub | Grant "Full Control" to your user, Administrators and SYSTEM. |
| Any other key file | chmod 600 /path/to/key/file| Grant "Full Control" to your user, Administrators and SYSTEM.|

#### SSH server file and folder permissions

The following are permissions that need to be correct on the remote machine you are connecting to.

| Folder / File | Linux / macOS Permissions |
|---------------|---------------------------|
| `.ssh` in your user folder on the server | chmod 700 ~/.ssh |
| `.ssh/authorized_keys` in your user folder on the server  | chmod 600 ~/.ssh/authorized_keys |

#### Updating permissions on Windows using the command line

If you'd prefer to use the command line to update permissions on Windows, you can use the `icacls` command. For example, this will set your user as the owner, clear out permissions, disable inheritance, and grant the needed permissions:

```
SET FILEORFOLDERTOUPDATE="%USERPROFILE%\.ssh"

icacls "%FILEORFOLDERTOUPDATE%" /c /setowner %USERDOMAIN%\%USERNAME%
icacls "%FILEORFOLDERTOUPDATE%" /c /reset
icacls "%FILEORFOLDERTOUPDATE%" /c /inheritance:r /grant %USERDOMAIN%\%USERNAME%:F SYSTEM:F BUILTIN\Administrators:F
```

### Installing a supported SSH client

| OS | Instructions |
|----|--------------|
| Windows 10 / Server 2016 | Install the [Windows OpenSSH Client](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse). |
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

## Container Tips

### Enabling file sharing in Docker Desktop

The VS Code Remote - Containers extension can automatically mount your source code into the container if (and only if) it's in an allowed location. You can update this as follows:

1. Right-click on the Docker task bar item and select Settings.
2. On Windows, go to the Shared Drives tab and check the drive(s) where your source code is located. On macOS, go the File Sharing tab and be sure the folder containing your source code is under a file path specified in the list.

### Resolving errors about missing dependencies

Some extensions rely on libraries not found in the certain Docker images. See the [primary containers article](/docs/remote/containers.md#installing-additional-software-in-the-sandbox) for a few options on resolving this issue.

### Connecting to multiple containers

Currently you can only connect to one container per VS Code window. However, you can spin up multiple containers and [attach to them](#attaching-to-running-containers) from different VS Code windows to work around this limitation.

### Using Docker / Kubernetes from inside a dev container

You can use Docker and Kubernetes related CLIs and extensions from inside your development container by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes) in the container. See the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker), [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

### Accessing remote containers

If you are remotely running your containers in Docker, you can configure your local `docker` command to connect to the remote machine. However, you'll want to take care in ensuring you're authenticating your connection. This approach is also generally not recommended outside of development environments. You can [read this article](https://www.kevinkuszyk.com/2016/11/28/connect-your-docker-client-to-a-remote-docker-host/) for information on setting this up.

## WSL Tips

### Resolving errors about missing dependencies

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager.  For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

## Questions, Feedback, Contributing

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

Have a question or feedback? There are many ways to interact with us.

- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
