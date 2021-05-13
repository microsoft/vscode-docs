---
Area: containers
ContentId: DDE07043-BA8C-4D75-B392-ABACC31F6EA8
PageTitle: Connect to Docker engine running on a remote machine
DateApproved: 01/29/2020
MetaDescription: Connect via SSH to Docker engine running on a remote machine and use the remote machine as a development environment for Visual Studio Code.
---
# Connect to remote Docker over SSH

We recommend using the Visual Studio Code [Remote-SSH extension](/docs/containers/choosing-dev-environment.md#remote-machine) to connect to a remote machine running Docker engine, but it also possible to connect to the remote Docker engine directly, using SSH tunneling.

## Set up SSH Tunneling

1. Use [ssh-keygen](https://www.ssh.com/ssh/keygen) or similar to get and configure a public/private key pair for SSH authentication. Password authentication is not supported by Docker and not possible with a `DOCKER_HOST`-based configuration. If a key pair has already been set up, it can be used.

1. Configure `ssh-agent` on the **local** system with the **private** key file produced above.

    * **Windows (OpenSSH):** The latest version(s) of Windows 10 include OpenSSH by default. There is a Windows service, `ssh-agent` that is disabled by default, and needs to be re-enabled and set to automatic start. From an admin command prompt, run `sc config ssh-agent start=auto` and `net start ssh-agent`. Then, do `ssh-add <keyfile>`.

    * **Windows (Pageant):** You can use Pageant instead of OpenSSH, in which case it is necessary to set the environment variable `SSH_AUTH_SOCK=pageant`. Making that a user or system environment variable will be easiest.

    * **Linux:** `ssh-agent` is present by default. Do `ssh-add <keyfile>`. Ubuntu was tested; you might have different results on other distributions.

    * **macOS:** `ssh-agent` is present by default, but `ssh-add` does not persist across logins. Do `ssh-add <keyfile>`. We recommend configuring VS Code to run this command on terminal startup with `terminal.integrated.shellArgs.osx` or otherwise configuring a startup script. You can also manually run that command each login.

1. Verify that your identity is available to the agent with `ssh-add -l`. It should list one or more identities that look something like `2048 SHA256:abcdefghijk somethingsomething (RSA)`. If it does not list any identity, you will not be able to connect. Also, it needs to have the right identity. The Docker CLI working does not mean that the Explorer window will work. The Explorer window uses [dockerode](https://www.npmjs.com/package/dockerode) (which in turn uses [ssh2](https://www.npmjs.com/package/ssh2)), whereas the Docker CLI uses the `ssh` command, and benefits from an automatically inferred configuration.

1. Create a [Docker context](https://docs.docker.com/engine/context/working-with-contexts/) that points to the remote machine running Docker. Use `ssh://username@host:port` as the Docker endpoint (replace "host" with your remote machine name, or the remote machine IP address). Issue the following command from terminal window:

    ```shell
    docker context create my-remote-docker-machine --docker "host=ssh://username@host:port"
    ```

    If you don't include user name, the command will use your current local user name, which might be wrong. If you omit the port, it defaults to 22.

1. Use the **Command Palette** (`kb(workbench.action.showCommands)`) to issue the **Docker Context: Use** command to activate the Docker context pointing to the remote machine. This command causes both VS Code and Docker CLI to use the remote machine context.

1. It is recommended to change the refresh rate to something longer than the default with the `docker.explorerRefreshInterval` setting. The connection over SSH is slow, and it can result in trying to refresh again before the previous refresh even finished. We recommend at least 3000 ms.
