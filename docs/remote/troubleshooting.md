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

> **PuTTY Tip:** PuTTY for Windows is not a [supported client](#installing-a-supported-ssh-client), but if you've already set up key based authentication using PuTTYGen, you can convert your private key so that it can be used by other SSH clients. See [below](#reusing-a-key-generated-in-puttygen) for details.

#### Quick start

To set up SSH key based authentication for your remote host:

1. Check to see if you already have an SSH key. The public key is typically located at `~/.ssh/id_rsa.pub` on macOS / Linux, and at `%USERPROFILE%\.ssh\id_rsa.pub` on Windows.

    If you do not have a key, run the following command in a terminal / command prompt to generate a SSH key pair:

    ```bash
    ssh-keygen -t rsa -b 4096
    ```

    > **Tip:** Don't have `ssh-keygen`? Install [a supported SSH client](#installing-a-supported-ssh-client).

2. Add the contents of your **local** public key (the `id_rsa.pub` file) to the appropriate `authorized_keys` file(s) on the remote host.

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

#### Improving your security with a dedicated key

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

3. Add the contents of the **local** `id_rsa-remote-ssh.pub` file generated in step 1 to the appropriate `authorized_keys` file(s) on the remote host.

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

1. Open PuTTYGen and load the private key you want to convert.
2. Select **Conversions > Export OpenSSH key** from the application menu. Save the converted key to a location such as `%USERPROFILE%\.ssh`.
3. Validate that the permissions on exported key file only grant `Full Control` to your user, Administrators, and SYSTEM.
4. In VS Code, run **Remote-SSH: Open Configuration File...** in the Command Palette (`kbstyle(F1)`), select the SSH config file you wish to change, and add (or modify) a host entry in the config file as follows:

    ```yaml
    Host name-of-ssh-host-here
        User your-user-name-on-host
        HostName host-fqdn-or-ip-goes-here
        IdentityFile C:\path\to\your\exported\private\keyfile
    ```

### Enabling alternate SSH authentication methods

If are you connecting to an SSH remote host and are:

- connecting with two-factor authentication,
- using password authentication,
- using an SSH key with a passphrase when the [SSH Agent](#setting-up-the-ssh-agent) is not running or accessible

you need to enable the `remote.SSH.showLoginTerminal` setting in VS Code. This setting displays the terminal whenever VS Code runs an SSH command. You can enter your auth code, password, or passphrase when this happens.

A convenient way to work around this is to enable the `ControlMaster` feature that tells OpenSSH to run multiple SSH sessions over a single connection. To enable `ControlMaster`:

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

If you are connecting to a SSH host using a key with a passphrase, you should ensure that the [SSH Agent](https://www.ssh.com/ssh/agent) is running. VS Code will automatically add your key to the agent so you don't have to enter your passphrase every time you open a remote VS Code window.

To verify that the agent is running and is reachable from VS Code's environment, run `ssh-add -l` in the terminal of a local VS Code window. You should see a listing of the keys in the agent (or a message that it has no keys). If the agent is not running, follow these instructions to start it. After starting the agent, be sure to restart VS Code.

#### Windows

To enable SSH Agent automatically on Windows, start PowerShell as an Administrator and run the following commands:

```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

Now the agent will be started automatically on login.

#### Linux

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

#### macOS

The agent should be running by default on macOS.

### Fixing SSH file permission errors

SSH can be particular about file permissions and if they are set incorrectly you may see errors such as "WARNING: UNPROTECTED PRIVATE KEY FILE!". To fix this, update the file permissions as follows:

#### Local SSH file and folder permissions

On your local machine, make sure the following permissions are set:

| Folder / File | Linux / macOS Permissions | Windows Permissions |
|---------------|---------------------------|---------------------|
| `.ssh` in your user folder | `chmod 700 ~/.ssh` | Grant `Full Control` to your user, Administrators, and SYSTEM. |
| `.ssh/config` in your user folder | `chmod 600 ~/.ssh/config` | Grant `Full Control` to your user, Administrators, and SYSTEM. |
| `.ssh/id_rsa.pub` in your user folder | `chmod 600 ~/.ssh/id_rsa.pub` | Grant `Full Control` to your user, Administrators, and SYSTEM. |
| Any other key file | `chmod 600 /path/to/key/file` | Grant `Full Control` to your user, Administrators, and SYSTEM.|

#### Server SSH file and folder permissions

On the remote machine you are connecting to, make sure the following permissions are set:

| Folder / File | Linux / macOS Permissions |
|---------------|---------------------------|
| `.ssh` in your user folder on the server | `chmod 700 ~/.ssh` |
| `.ssh/authorized_keys` in your user folder on the server  | `chmod 600 ~/.ssh/authorized_keys` |

#### Updating permissions on Windows using the command line

If you'd prefer to use the command line to update permissions on Windows, you can use the [`icacls`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/icacls) command.

The script below will set your user as the owner, clear out permissions, disable inheritance, and grant the needed permissions:

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
| macOS | Comes pre-installed. |
| Debian/Ubuntu | Run `sudo apt-get install openssh-client` |
| RHEL / Fedora / CentOS | Run `sudo yum install openssh-clients` |

### Installing a supported SSH server

| OS | Instructions | Details |
|----|--------------|---|
| Debian / Ubuntu | Run `sudo apt-get install openssh-server` |  See the [Ubuntu SSH](https://help.ubuntu.com/community/SSH?action=show) documentation for additional setup instructions. |
| RHEL / Fedora / CentOS | Run `sudo yum install openssh-server && sudo systemctl start sshd.service && sudo systemctl enable sshd.service` | You may need to omit `sudo` when running in a container. |
| macOS | Go to **System Preferences** &gt; **Sharing**, check **Remote Login**. ||

## Container tips

### Docker Desktop for Windows tips

[Docker Desktop](https://www.docker.com/products/docker-desktop) for Windows works well in most setups, but there are a few important "gotchas" that can cause real headaches. Here are some tips on avoiding them:

1. **Use an AD domain account or local administrator account when sharing drives. Do not use an AAD (email-based) account.** AAD (email-based) accounts have well known issues, as documented in Docker issues [#132](https://github.com/docker/for-win/issues/132) and [#1352](https://github.com/docker/for-win/issues/1352). If you must use an AAD account, create a separate local administrator account on your machine that you use purely for the purpose of sharing drives. Follow  the [steps in this blog post](https://blogs.msdn.microsoft.com/stevelasker/2016/06/14/configuring-docker-for-windows-volumes/) to get everything set up.

2. **Stick with alphanumeric passwords to avoid drive sharing problems.** When asked to share your drives on Windows, you will be prompted for the username and password of an account with admin privileges on the machine. If you are warned about an incorrect username or password, this may be due to special characters in the password. For example, `!`, `[` and `]` are known to cause issues. Change your password to alphanumeric characters to resolve. See this issue about [Docker volume mounting problems](https://github.com/moby/moby/issues/23992#issuecomment-234979036) for details.

3. **Use your Docker ID to sign into Docker (not your email).** The Docker CLI only supports using your Docker ID, so using your email can cause problems. See Docker issue [#935](https://github.com/docker/hub-feedback/issues/935#issuecomment-300361781) for details.

If you are still having trouble see the [Docker Desktop for Windows troubleshooting guide](https://docs.docker.com/docker-for-windows/troubleshoot/#volumes).

### Enabling file sharing in Docker Desktop

The VS Code Remote - Containers extension can only automatically mount your source code into a container if your code is in a folder or drive shared with Docker. If you open a dev container from a non-shared location, the container will successfully start but the workspace will be empty.

To change Docker's drive and folder sharing settings:

#### Windows

1. Right-click on the Docker task bar item and select **Settings**.
2. Go to the **Shared Drives** tab and check the drive(s) where your source code is located.

#### macOS

1. Click on the Docker menu bar item and select **Preferences**.
2. Go to the the **File Sharing** tab. Confirm that the folder containing your source code is under one of the shared folders listed.

### Resolving Git line ending issues in containers (resulting in many modified files)

Since Windows and Linux use different default line endings, you may see files that appear modified but seem to have no differences aside from the line endings. To prevent this from happening, you can disable automatic line ending conversion. Just add a `.gitattributes` file to your folder and then run:

```bash
git config --global core.autocrlf false
```

You will need to re-clone the repository for this setting to take effect.

Optionally, you can add the following contents to a `.gitattributes` file to force everything in the repo to use LF endings except for windows batch files that require CRLF:

```yaml
*.* text eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
```

### Avoid setting up Git in a container when using Docker Compose

To avoid having to set up Git a second time in your container, VS Code automatically adds a volume mount to your local Git configuration when referencing an `image` or `Dockerfile`. The Docker Compose scenario gives you more control, but in this case requires adding an extra configuration line to your `docker-compose.yml` file.

Specifically add the following to the service you open in VS Code:

```yaml
volumes:
  # This lets you avoid setting up Git again in the container
  - ~/.gitconfig:/root/.gitconfig
```

If you do not have your email address set up locally, you may be prompted to do so. You can do this on your local machine by running the following command:

```bash
git config --global user.email "your.email@address"
```

You can also opt to extend your configuration instead to achieve the same thing without modifying your existing Docker Compose file. See [here for additional details](/docs/remote/containers.md#extending-your-docker-compose-file-for-development).

### Resolving errors about missing Linux dependencies

Some extensions rely on libraries not found in the certain Docker images. See the [primary containers article](/docs/remote/containers.md#installing-additional-software-in-the-sandbox) for a few options on resolving this issue.

### Speeding up containers in Docker Desktop

By default, Docker Desktop only gives containers a fraction of your machine capacity. In most cases, this is enough, but if you are doing something that requires more capacity you can increase memory, CPU, or disk use.

First, try [stopping any running containers](/docs/remote/containers.md#managing-containers) you are no longer using.

If this doesn't solve your problem, you may want to see if CPU is actually your problem or if there is something else going on. An easy way to keep tabs on this is to install the [Resource Monitor extension](https://marketplace.visualstudio.com/items?itemName=mutantdino.resourcemonitor&ssr=false#overview). When installed in a container, it will provide you info about capacity for your containers in the status bar.

![Resource use status bar](images/troubleshooting/resource-monitor.png)

If you'd like this extension to always be installed, add this to your `settings.json`:

```json
"remote.containers.defaultExtensions": [
    "mutantdino.resourcemonitor"
]
```

If you determine that you need to give your container more of your machine's capacity, follow these steps:

1. Right-click on the Docker task bar item and select **Settings** (**Preferences** on macOS).
2. Click on **Advanced** to increase CPU, Memory, or Swap.
3. Click on **Disk** to increase the amount of disk Docker is allowed to consume on your machine.

Finally, if your container is disk intensive, you should avoid using a volume mount of your local filesystem to store data files (for example database data files) particularly on Windows. Update your application's settings to use a folder inside the container instead.

### Cleaning out unused containers and images

If you see an error from Docker reporting that you are out of disk space, you can typically resolve this by cleaning out unused containers and images. There are a few ways to do this:

**Option 1: Use the Docker extension.**

 1. Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) from the Extensions view if not already present.

 2. You can then go to the Docker panel and expand the Containers or Images tree, right-click, and select Remove Container / Image.

     ![Docker Explorer screenshot](images/containers/docker-remove.png)

**Option 2: Use the Docker CLI to pick containers to delete**:

1. Open a terminal.
2. Type `docker ps -a` to see a list of all containers.
3. Type `docker rm <Container ID>` from this list to remove a container.
4. Type `docker image prune` to remove any unused images.

**Option 3: Use Docker Compose**:

1. Open a terminal.
2. Go to the directory with your `docker-compose.yml` file.
3. Type `docker-compose down` to stop and delete the containers. If you have more than one Docker Compose file, can specify additional Docker Compose files with the `-f` argument.

**Option 4: Delete all containers and images that are not running:**

1. Open a terminal
2. Type `docker system prune --all`

### Adding another volume mount

You can add a volume mount to any local folder using these steps:

1. Configure the volume mount:

   - When an **image or Dockerfile** is referenced in `devcontainer.json`, add the following to the `runArgs` property in this same file:

        ```json
        "runArgs": ["-v","/local/source/path/goes/here:/target/path/in/container/goes/here"]
        ```

   - When an **Docker Compose** file is referenced, add the following to your `docker-compose.yml`:

        ```json
        volumes:
          - /local/source/path/goes/here:/target/path/in/container/goes/here
        ```

2. If you've already built the container and connected to it, run **Remote-Containers: Rebuild Container** from the command palette (`kbstyle(F1)`) to pick up the change.

### Connecting to multiple containers

Currently you can only connect to one container per VS Code window. However, you can spin up multiple containers and [attach to them](/docs/remote/containers.md#attaching-to-running-containers) from different VS Code windows to work around this limitation.

### Using Docker / Kubernetes from inside a dev container

You can use Docker and Kubernetes related CLIs and extensions from inside your development container by forwarding the Docker socket and installing the Docker CLI (and kubectl for Kubernetes) in the container. See the [Docker-in-Docker](https://aka.ms/vscode-remote/samples/docker-in-docker), [Docker-in-Docker Compose](https://aka.ms/vscode-remote/samples/docker-in-docker-compose), and [Kubernetes-Helm](https://aka.ms/vscode-remote/samples/kubernetes-helm) dev container definitions for details.

### Adding a non-root user to your dev container

Many images run as a root user by default. However some provide non-root users that you can optionally use instead. If your image or Dockerfile provides a non-root user that you have to opt into using (e.g. the default is still root), you can specify the user in one of two ways:

- When referencing an `image` or `Dockerfile`, add the following to your `devcontainer.json`:

    ```json
    "runArgs": ["-u", "user-name-goes-here"]
    ```

- If you are using Docker Compose, add the following to your service in `docker-compose.yml`:

    ```yaml
    user: user-name-goes-here
    ```

Note that you do not need to do this if the default behavior of the container is to use the non-root user.

For images that only provide a root user, you can automatically create a non-root user in the `Dockerfile`. For example, this snippet will create a user called `user-name-goes-here` and give it the ability to use `sudo`:

```Dockerfile
ARG USERNAME=user-name-goes-here
RUN useradd -m $USERNAME
ENV HOME /home/$USERNAME

# [Optional] Add sudo support
RUN apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME

# ** Anything else you want to do like clean up goes here **

# [Optional] Set the default user
USER $USERNAME
```

### Resolving Dockerfile build failures for images using Debian 8

When building containers that use images based on Debian 8/Jessie — such as older versions of the `node:8` image — you may encounter the following error:

```text
...
Get:5 http://security.debian.org jessie/updates/main amd64 Packages [825 kB]
Get:6 http://deb.debian.org jessie/main amd64 Packages [9098 kB]
Fetched 10.1 MB in 6s (1458 kB/s)
W: Failed to fetch http://deb.debian.org/debian/dists/jessie-updates/InRelease  Unable to find expected entry 'main/binary-amd64/Packages' in Release file (Wrong sources.list entry or malformed file)
E: Some index files failed to download. They have been ignored, or old ones used instead.
The command '/bin/sh -c apt-get update     && apt-get -y install --no-install-recommends apt-utils 2>&1' returned a non-zero code: 100
Failed: Building an image from the Dockerfile.
```

This is a [well known issue](https://github.com/debuerreotype/docker-debian-artifacts/issues/66) caused by the Debian 8 being "archived". More recent versions of images typically resolve this problem, often by upgrading to Debian 9/Stretch.

There are two ways to resolve this error:

- **Option 1**: Remove any containers that depend on the image, remove the image, and then try building again. This should download an updated image that is not effected by the problem. See **[cleaning out unused containers and images](#cleaning-out-unused-containers-and-images)** for details.

- **Option 2**: If you don't want to delete your containers or images, add this line into your `Dockerfile` before any `apt` or `apt-get` command. It adds the needed source lists for Jessie:

    ```Dockerfile
    # Add archived sources to source list if base image uses Debian 8 / Jessie
    RUN cat /etc/*-release | grep -q jessie && printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
    ```

### Other common Docker related errors and issues

#### High CPU Utilization of Hyperkit in Mac

There is [known issue with Docker for Mac](https://github.com/docker/for-mac/issues/1759) that can drive high CPU spikes. In particular, we have seen spikes happening when watching files and building. If you see high CPU usage for `com.docker.hyperkit` in Activity Monitor while very little is going on in your dev container, you are likely hitting this issue. Follow the [Docker issue](https://github.com/docker/for-mac/issues/1759) for updates and fixes.

#### debconf: delaying package configuration, since apt-utils is not installed

This error can typically be safely ignored and is tricky to get rid of completely. However, you can reduce it to one message in standard out when installing the needed package by adding the following to your Dockerfile:

```Dockerfile
# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1

## YOUR DOCKERFILE CONTENT GOES HERE

ENV DEBIAN_FRONTEND=dialog
```

#### Warning: apt-key output should not be parsed (stdout is not a terminal)

This warning is just that, a warning. It is telling you not to parse the output of `apt-key`, so as long as your script isn't, there's no problem. You can safely ignore it.

This occurs in `Dockerfile`s because the `apt-key` command is not running from a terminal. Unfortunately, this error cannot be eliminated completely, but can be hidden unless the `apt-key` command returns a non-zero exit code (indicating a failure). For example:

```Dockerfile
# (OUT=$(apt-key add - 2>&1) || echo $OUT) will only print the output if a non-zero exit code is hit
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | (OUT=$(apt-key add - 2>&1) || echo $OUT)
```

You can also set the `APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE` environment variable to suppress the warning, but it looks a bit scary so be sure to add comments in your Dockerfile if you use it:

```Dockerfile
# Suppress an apt-key warning about standard out not being a terminal. Its use in this script is safe.
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
```

## WSL tips

### Selecting the distribution used by Remote - WSL

The Remote - WSL extension uses your **default distribution** which you can change using `wslconfig.exe`. For example:

```bat
wslconfig /setdefault Ubuntu
```

You can see which distributions you have installed by running:

```bat
wslconfig /l
```

### Resolving errors about missing dependencies

Some extensions rely on libraries not found in the vanilla install of certain WSL Linux distributions. You can add additional libraries into your Linux distribution by using its package manager. For Ubuntu and Debian based distributions, run `sudo apt-get install <package>` to install the needed libraries. Check the documentation for your extension or the runtime that is mentioned for additional installation details.

### Resolving Git line ending issues in WSL (resulting in many modified files)

Since Windows and Linux use different default line endings, you may see files that appear modified but seem to have no differences aside from the line endings. To prevent this from happening, you can disable automatic line ending conversion and add a `.gitattributes` file to your folder. Then run:

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

## Extension tips

While many extensions will work unmodified, there are a few issues that can prevent certain features from working as expected. These issues can typically be resolved by adopting a VS Code API. This section provides a quick reference for common issues and tips on resolving them. You can also refer to the main extension article on [Supporting Remote Development](/api/advanced-topics/remote-extensions) for an in-depth guide.

| Problem | Description | Resolution |
|---------|-------------|------------|
| **Browser does not open locally** | Some extensions use external node modules or custom code to launch a browser window. Unfortunately, this may cause the extension to launch the browser remotely instead of locally. | The `vscode.env.openExternal` API will open a local browser to resolve this problem. See [here for details](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application). |
| **Clipboard does not work** | Some extensions use node modules like `clipboardy` to integrate with the clipboard. Unfortunately, this may cause the extension to incorrectly integrate with the clipboard on the remote side. | Use the VS Code clipboard API. See [here for details](/api/advanced-topics/remote-extensions#using-the-clipboard). |
| **Cannot access local web server from browser or application** | When working inside a container or SSH host, the port the browser is connecting to may be blocked. | The `vscode.env.openExternal` API will automatically forward localhost ports to resolve this problem. See [here for details](/api/advanced-topics/remote-extensions#opening-something-in-a-local-browser-or-application).  |
| **WebView contents do not appear** | If your WebView content uses an iframe to connect to a local web server, the port the WebView is connecting to may be blocked. | The WebView API now includes a `portMapping` property that you can use to solve this problem. See [here for details](/api/advanced-topics/remote-extensions#accessing-localhost). |
| **Blocked localhost ports** |  If you are trying to connect to a localhost port from an external application, the port may be blocked. | There currently is no API for extensions to programmatically forward arbitrary ports, but you can use the **Remote-Containers: Forward Port from Container...** or **Remote-SSH: Forward Port from Active Host...** to do so manually. |
| **Errors storing extension data** | Extensions may try to persist global data by looking for the `~/.config/Code` folder on Linux. This folder may not exist, which can cause the extension to throw errors like `ENOENT: no such file or directory, open '/root/.config/Code/User/fileame-goes-here`. | Use the `context.globalStoragePath` or `context.storagePath` property instead. See [here for details](/api/advanced-topics/remote-extensions#persisting-extension-data-or-state). |
| **Cannot sign in / have to sign in each time I connect to a new endpoint** | Extensions with a sign in may persist secrets using their own code. This code can fail due to missing dependencies. Even if it succeeds, the secrets will be stored remotely, which means you have to sign in for every new endpoint. | Use the `keytar` node module or create a "UI Helper Extension" to interact with local secret stores. See [here for details](/api/advanced-topics/remote-extensions#persisting-secrets). |
| **Cannot access / transfer remote workspace files to local machines** | Extensions that open workspace files in external applications may encounter errors because the external application cannot directly access the remote files. | We are investigating options for how extensions might be able to transfer files from the remote workspace to solve this problem. |
| **Cannot access attached device from extension** | Extensions that access locally attached devices will be unable to connect to them when running remotely. | A "UI Helper Extension" can be used to integrate with the device. See [here for details](/api/advanced-topics/remote-extensions#accessing-local-apis-using-a-helper-extension). However, the Helper Extension will not be able to access workspace files. We are investigating options for how extensions might be able to transfer files from the remote workspace to solve this problem. |

## Questions and feedback

- See [Remote Development FAQ](/docs/remote/faq.md).
- Search on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- Add a [feature request](https://aka.ms/vscode-remote/feature-requests) or [report a problem](https://aka.ms/vscode-remote/issues/new).
