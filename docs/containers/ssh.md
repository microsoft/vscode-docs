---
Area: containers
ContentId: DDE07043-BA8C-4D75-B392-ABACC31F6EA8
PageTitle: Connect to Docker running on a remote machine
DateApproved: 01/29/2020
MetaDescription: Connect to a container image running on a remote machine, using Visual Studio Code.
---
# Connect to remote Docker over SSH

In order to connect to a remote Docker daemon over SSH (as opposed to HTTPS with certificate authentication), there are two options for configuring the extension:

* Visual Studio Code [Remote Development using SSH](/docs/remote/ssh.md) - Run your VS Code client in the context of the remote host.
* Directly via SSH - Manually set up an SSH connection to the remote host.

## Using VS Code remote development

The simplest way is to use VS Code's [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension, from the [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension pack.

1. Run command **Remote-SSH: Add new SSH host...** and follow the prompts to set up a connection to the target host.

1. Run command **Remote-SSH: Connect to host...** and connect to the host.

1. A new VS Code window opens, running in the context of the target machine. If using password authentication, the password will be prompted here. It is recommended to set up [SSH key authentication](https://www.ssh.com/ssh/public-key-authentication), for ease of use.

1. In the Extensions view, install the Docker extension (on the remote host) (a reload may be required after this step):

   ![Screenshot - Installing the Docker extension](images/ssh/install-in-ssh.png)

>**NOTE**: If you are using the Docker extension to build Docker images and have source code, the approach above probably means you have your source enlistment on the remote host, rather than your local machine. If you are just using the Docker extension for the Docker Explorer features, then you can disregard this.

## Directly via SSH

It is possible to connect to a remote Docker daemon over SSH without using VS Code remoting, but it is more complicated. This is only recommended if you cannot have your source code on the Docker daemon server.

1. Use `ssh-keygen` or similar to get and configure a public/private key pair for SSH authentication: https://www.ssh.com/ssh/keygen/. Password authentication is not supported by Docker and not possible with a `DOCKER_HOST`-based configuration. If a key pair has already been set up, it can be used.

1. Configure `ssh-agent` on the _local_ system with the _private_ key file produced above.

    1. Windows (OpenSSH): the latest version(s) of Windows 10 include OpenSSH by default. There is a Windows service, `ssh-agent` that is disabled by default, and needs to be re-enabled and set to automatic start. From an admin command prompt, run `sc config ssh-agent start=auto` and `net start ssh-agent`. Then, do `ssh-add <keyfile>`.

    1. Windows (Pageant): You can use Pageant instead of OpenSSH, in which case it is necessary to set the environment variable `SSH_AUTH_SOCK=pageant`. Making that a user or system environment variable will be easiest.

    1. Linux (Ubuntu was tested; you might have different results on other distributions): `ssh-agent` is present by default. Do `ssh-add <keyfile>`.

    1. macOS: `ssh-agent` is present by default, **but `ssh-add` does not persist across logins**. Do `ssh-add <keyfile>`. We recommend configuring VS Code to run this command on terminal startup with `terminal.integrated.shellArgs.osx`, or otherwise configuring a startup script, or otherwise just manually running that command each login.

1. Verify that your identity is available to the agent with `ssh-add -l`. It should list one or more identities that look something like `2048 SHA256:abcdefghijk somethingsomething (RSA)`. **If it does not list any identity, you will not be able to connect.** Also, it needs to have the right identity, of course. The Docker CLI working does _not_ mean that the Explorer window will work--the Explorer window uses [dockerode](https://www.npmjs.com/package/dockerode) (which in turn uses [ssh2](https://www.npmjs.com/package/ssh2)), whereas the Docker CLI uses simply the `ssh` command, and benefits from more automatically inferred configuration.

1. Configure VS Code with your `DOCKER_HOST` to `ssh://username@host`. If you don't include username, it will use your current local user name, which may be wrong.

    1. You can simply use the `DOCKER_HOST` environment variable, or

    1. There's a setting `docker.host` in VS Code, which has the same effect, but allows for user or workspace settings instead of machine settings.

1. It is recommended to change the refresh rate to something longer with the `docker.explorerRefreshInterval` setting. The connection over SSH is slow, and it can result in trying to refresh again before the previous refresh even finished. We recommend at least 3000 ms.
