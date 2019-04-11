---
Order: 5
Area: remote
TOCTitle: Troubleshooting
PageTitle: Visual Studio Code Remote tips and troubleshooting
ContentId: 42e65445-fb3b-4561-8730-bbd19769a160
MetaDescription: Visual Studio Code Remote Development tips and troubleshooting for SSH, Containers, and WSL
DateApproved: 2/25/2019
---
# Troubleshooting Remote Development

## SSH tips

Visual Studio Code Remote allows you to open any folder on a remote machine, VM, or container with a SSH server and take advantage of VS Code's full feature set. This article includes additional troubleshooting and configuration tips for setting up support for developing on remote machines using SSH. See the [primary article](/docs/remote/ssh.md) for getting started information.

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

## Container tips

## WSL tips

## Reporting issues

When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.
