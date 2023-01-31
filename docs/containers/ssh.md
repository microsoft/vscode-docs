---
Area: containers
ContentId: DDE07043-BA8C-4D75-B392-ABACC31F6EA8
PageTitle: Connect to Docker engine running on a remote machine
DateApproved: 11/21/2022
MetaDescription: Connect via SSH to Docker engine running on a remote machine and use the remote machine as a development environment for Visual Studio Code.
---
# Connect to remote Docker over SSH

We recommend using the Visual Studio Code [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension to connect to a remote machine running Docker engine. You can use the [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) and [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extensions together. You may review the steps in the [Dev Containers documentation](/docs/devcontainers/containers.md#open-a-folder-on-a-remote-ssh-host-in-a-container).

It is also possible to connect to the remote Docker engine directly using SSH tunneling, which you can read more about below.

## Set up SSH Tunneling

1. Use [ssh-keygen](https://www.ssh.com/ssh/keygen) or similar to get and configure a public/private key pair for SSH authentication. Password authentication is not supported by Docker and not possible with a `DOCKER_HOST`-based configuration. If a key pair has already been set up, it can be used.

1. Configure `ssh-agent` on the **local** system with the **private** key file produced above.

    * **Windows (OpenSSH):** The latest version(s) of Windows 10 include OpenSSH by default. There is a Windows service, `ssh-agent` that is disabled by default, and needs to be re-enabled and set to automatic start. From an admin PowerShell prompt, run `Set-Service ssh-agent -StartupType "Automatic"` and `Start-Service ssh-agent`. Then, do `ssh-add <keyfile>`.

    * **Windows (Pageant):** You can use Pageant instead of OpenSSH, in which case it is necessary to set the environment variable `SSH_AUTH_SOCK=pageant`. Making that a user or system environment variable will be easiest.

    * **Linux:** `ssh-agent` is present by default. Do `ssh-add <keyfile>`. Ubuntu was tested; you might have different results on other distributions.

    * **macOS:** `ssh-agent` is present by default, but `ssh-add` does not persist across logins. Do `ssh-add <keyfile>`. We recommend configuring VS Code to run this command on terminal startup with `terminal.integrated.profiles.osx` `args` value or otherwise configuring a startup script. You can also manually run that command each login.

1. Verify that your identity is available to the agent with `ssh-add -l`. It should list one or more identities that look something like `2048 SHA256:abcdefghijk somethingsomething (RSA)`. If it does not list any identity, you will not be able to connect. Also, it needs to have the right identity. The Docker CLI working does not mean that the Explorer window will work. The Explorer window uses [dockerode](https://www.npmjs.com/package/dockerode) (which in turn uses [ssh2](https://www.npmjs.com/package/ssh2)), whereas the Docker CLI uses the `ssh` command, and benefits from an automatically inferred configuration.

1. Create a [Docker context](https://docs.docker.com/engine/context/working-with-contexts/) that points to the remote machine running Docker. Use `ssh://username@host:port` as the Docker endpoint (replace "host" with your remote machine name, or the remote machine IP address). Issue the following command from terminal window:

    ```shell
    docker context create my-remote-docker-machine --docker "host=ssh://username@host:port"
    ```

    Always include the user name in the Docker endpoint address, even if it is the same as the local user name. If you omit the port, it defaults to 22.

1. Use the **Command Palette** (`kb(workbench.action.showCommands)`) to issue the **Docker Contexts: Use** command to activate the Docker context pointing to the remote machine. This command causes both VS Code and Docker CLI to use the remote machine context.

1. It is recommended to change the refresh rate to something longer than the default with the `docker.explorerRefreshInterval` setting. The connection over SSH is slow, and it can result in trying to refresh again before the previous refresh even finished. We recommend at least 3000 ms.

## Tips

* The "host" part in the Docker endpoint string (`ssh://username@host:port`) must be either a globally-resolvable DNS machine name, or an IP address. Docker extension will not be able to use host aliases defined in the [SSH configuration file](https://www.ssh.com/ssh/config/).

* Make sure the remote machine host key is already memorized [in the known_hosts file](https://www.ssh.com/ssh/key/#known-host-keys). The simplest way to ensure this is to connect to the machine via `ssh` client program (run `ssh username@host:port` from the command line). Upon first-time connection, the `ssh` program will display the host key and let you approve it, updating the `known_hosts` file automatically.

* There is [an issue with ssh-keygen utility that comes with Windows 10 build 1909 and older](https://github.com/PowerShell/Win32-OpenSSH/issues/1263) that prevents it from working properly with newer SSH daemons (for example, the one that comes with Ubuntu 20.04 LTS and newer). The workaround is to use ECDSA-type key, not RSA-type key, for the SSH connection. You can generate an ECDSA SSH key and add it to SSH agent with following commands:

    ```shell
    ssh-keygen -t ecdsa -b 521
    ssh-add id_ecdsa
    ```

* Windows 10 build 1909 and older are affected by [an issue that prevents SSH from getting to your identities after Windows OS update](https://github.com/PowerShell/Win32-OpenSSH/issues/1234). The workaround is to add a dummy service entry to system configuration. Run the following from administrative PowerShell window:

    ```powershell
    New-Service sshd -BinaryPathName "C:\Windows\System32\OpenSSH\ssh.exe"
    ```
