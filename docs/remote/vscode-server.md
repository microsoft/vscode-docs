---
ContentId: d750ab6d-82c2-4e64-8fbb-7888e1374381
MetaDescription: Using {% data variables.product.prodname_vscode %} Server
DateApproved: 9/9/2026
---
# {% data variables.product.prodname_vscode %} Server

The {% data variables.product.prodname_vscode %} Server is a service you can run on a remote development machine, like your desktop PC or a virtual machine (VM). It allows you to securely connect to that remote machine from anywhere through a local {% data variables.product.prodname_vscode_shortname %} client, without the requirement of SSH.

## What is the {% data variables.product.prodname_vscode_shortname %} Server?

In {% data variables.product.prodname_vscode_shortname %}, we want users to seamlessly leverage the environments that make them the most productive. The [{% data variables.product.prodname_vscode_shortname %} Remote Development extensions](/docs/remote/remote-overview.md) allow you to work in the Windows Subsystem for Linux (WSL), remote machines via SSH, and dev containers directly from {% data variables.product.prodname_vscode_shortname %}. These extensions install a server on the remote environment, allowing local {% data variables.product.prodname_vscode_shortname %} to smoothly interact with remote source code and runtimes.

We now provide a standalone "{% data variables.product.prodname_vscode_shortname %} Server," which is a service built off the same underlying server used by the remote extensions, plus some additional functionality, like an interactive CLI and facilitating secure connections to vscode.dev.

![vscode.dev connected to the {% data variables.product.prodname_vscode_shortname %} Server](images/vscode-server/server-connected.png)

## Architecture

We want to provide a unified {% data variables.product.prodname_vscode_shortname %} experience no matter how you use the editor, whether it's local or remote, in the desktop or in the browser.

Access to the {% data variables.product.prodname_vscode_shortname %} Server is built in to the existing [`code` CLI](/docs/configure/command-line.md#launching-from-command-line).

The CLI establishes a tunnel between a {% data variables.product.prodname_vscode_shortname %} client and your remote machine. Tunneling securely transmits data from one network to another.

![The {% data variables.product.prodname_vscode_shortname %} Server architecture](images/vscode-server/server-arch-latest.png)

The {% data variables.product.prodname_vscode_shortname %} Server experience includes a few components:

* The {% data variables.product.prodname_vscode_shortname %} Server: Backend server that makes {% data variables.product.prodname_vscode_shortname %} remote experiences possible.
* [Remote - Tunnels extension](/docs/remote/tunnels.md): Automatically loaded in your local {% data variables.product.prodname_vscode_shortname %} client, it facilitates the connection to the remote machine.

## Scenarios

The {% data variables.product.prodname_vscode_shortname %} Server allows you to use {% data variables.product.prodname_vscode_shortname %} in new ways, such as:

* Developing on a remote machine where SSH support may be limited, or you need web-based access.
* Developing on a machine that doesn't support the installation of {% data variables.product.prodname_vscode_shortname %} desktop, such as an iPad / tablet or Chromebook.
* Experiencing the client-side security benefit that all code can be executed in the browser sandbox.

## Getting Started

You can choose from two paths to enable tunneling, which are described in greater details in their respective docs content:

* [Run the `tunnel` command in the `code` CLI](/docs/remote/tunnels.md#using-the-code-cli)
* [Enable tunneling through the {% data variables.product.prodname_vscode_shortname %} UI](/docs/remote/tunnels.md#using-the-vs-code-ui)

## Things to try

### Licensing and other commands

Upon first run of the {% data variables.product.prodname_vscode_shortname %} Server, you'll be prompted with the terms of the license. You can view the license for the {% data variables.product.prodname_vscode_shortname %} Server [here](https://aka.ms/vscode-server-license).

```bash
* {% data variables.product.prodname_vscode %} Server
*
* By using the software, you agree to
* the {% data variables.product.prodname_vscode %} Server License Terms (https://aka.ms/vscode-server-license) and
* the Microsoft Privacy Statement (https://privacy.microsoft.com/en-US/privacystatement).
```

You can explore the CLI's other commands by running `code -h`, and specifically the tunneling commands by running `code tunnel -help`:

![Output of tunnel help CLI command](images/vscode-server/tunnel-help.png)

### Extension commands

As with the CLI, the {% data variables.product.prodname_vscode_shortname %} Remote Tunnels extension has additional commands you can explore by opening the Command Palette (`F1`) in {% data variables.product.prodname_vscode_shortname %} and typing **Remote Tunnels**. You may learn more in the [Remote Tunnels documentation](/docs/remote/tunnels.md).

## Telemetry

If you want to disable telemetry, you can pass in `--disable-telemetry` when launching the {% data variables.product.prodname_vscode_shortname %} Server: `code tunnel --disable-telemetry`. Alternatively, if you would like to specify an initial telemetry level, such as only collecting errors, you can pass in `--telemetry-level` followed by the level (for example, `error`).

If telemetry is not disabled via the CLI, the {% data variables.product.prodname_vscode_shortname %} Server will begin respecting the client telemetry settings (your telemetry setting in vscode.dev or desktop) upon successful connection.

## Common Questions

### Is the {% data variables.product.prodname_vscode_shortname %} Server designed for multiple users to access the same remote instance?

No, an instance of the server is designed to be accessed by a single user.

### Can I host the {% data variables.product.prodname_vscode_shortname %} Server as a service?

No, hosting it as a service is not allowed, as specified in the [{% data variables.product.prodname_vscode_shortname %} Server license](https://aka.ms/vscode-server-license).

### Is there a list of endpoints the {% data variables.product.prodname_vscode_shortname %} Server uses?

If you're working in a restricted environment, you may need to ensure the {% data variables.product.prodname_vscode_shortname %} Server has access to the endpoints listed in the following articles:

* [Setup network common hostnames](/docs/setup/network.md#common-hostnames)
* [Connectivity requirements for the {% data variables.product.prodname_vscode_shortname %} Server](/docs/remote/ssh.md#what-are-the-connectivity-requirements-for-the-vs-code-server-when-it-is-running-on-a-remote-machine--vm)

### Are there any other extension limitations?

Pure UI extensions are not supported when using a web-based instance of {% data variables.product.prodname_vscode_shortname %}, which you can learn more about in the extension authors [Remote Development](/api/advanced-topics/remote-extensions.md#architecture-and-extension-kinds) guide.

### Are there browser limitations?

While working in the browser, there are certain limitations and configuration steps to consider. You can read more about this in the [{% data variables.product.prodname_vscode_shortname %} for the Web](/docs/remote/vscode-web.md#additional-browser-setup) documentation.

### How can I keep the {% data variables.product.prodname_vscode_shortname %} Server up-to-date?

You will get a notification in {% data variables.product.prodname_vscode_shortname %} when you connect to your remote machine if an update is available, and you'll be able to update directly through this notification.

### I see an error about keyring storage. What should I do?

Settings Sync requires authentication against a Settings Sync server. The corresponding secret is persisted on the server. This requires to set up a keyring on the server. When the keyring is not set up, the {% data variables.product.prodname_vscode_shortname %} Server falls back to an in-memory secret stored on the server. In this case, secrets are only persisted during the lifetime of the server.

[This issue](https://github.com/microsoft/vscode-remote-release/issues/8628) provides more context and may help you troubleshoot. If you're still experiencing issues, please feel free to file a new issue in the [{% data variables.product.prodname_vscode_shortname %} Remote GitHub repo](https://github.com/microsoft/vscode-remote-release/issues).

### Where can I provide feedback or report an issue?

If you have any issues or feedback, please file an issue in the [{% data variables.product.prodname_vscode_shortname %} Remote GitHub repo](https://github.com/microsoft/vscode-remote-release/issues). When filing an issue, include verbose logging, which you can enable by launching the {% data variables.product.prodname_vscode_shortname %} Server with the `-v` flag: `code -v tunnel`.

You may filter just for {% data variables.product.prodname_vscode_shortname %} Server issues with the [`code-server` label](https://github.com/microsoft/vscode-remote-release/issues?q=is%3Aissue+is%3Aopen+label%3Acode-server).
