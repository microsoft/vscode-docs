---
Order: 26
Area: editor
TOCTitle: Port Forwarding
ContentId: d7a80c88-c091-4d13-9240-d432c12407a7
PageTitle: Port forwarding local services with VS Code
DateApproved: 08/01/2024
MetaDescription: Make your local web services accessible over the internet with Visual Studio Code
---
# Local Port Forwarding

Support for port forwarding is built into Visual Studio Code via [Microsoft dev tunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview), no extension required. When running a local web service, you can use the **Ports** view to make the service accessible to others over the internet.

## How to use local port forwarding

First, you need to have a service you want to forward. If you don't have one yet but do have Node.js installed, you can run this command to start up a server on port 3000:

```bash
npx serve
```

Then, navigate to the **Ports** view in the Panel region (**Ports: Focus on Ports View**), and select **Forward a Port**.

![Forward a Port button displayed in the Ports view](images/port-forwarding/ports-view.png)

If you haven't logged in with GitHub before, you'll be prompted to sign in. Then, enter the port you'd like to forward; the default port using the above command is port 3000. Once you do, the port forwarding system starts and the **Ports** view updates to show the port you forwarded and its **Forwarded Address**.

![Port 3000 added to the Ports view](images/port-forwarding/forwarded-port.png)

Hovering over the **Forwarded Address**, you can use the inline actions copy the address, open it in your browser, or open an in-editor preview.

By default, the forwarded port is **Private**. When you navigate to the URL, you'll be required to sign in with the same GitHub account you used to start the port forwarding process in VS Code. You can change the visibility right-clicking on the port and selecting **Port Visibility > Public**. **Public** ports don't require sign in.

## Common questions

### How do I forward local services if I'm connected to a remote machine?

Currently, port forwarding only works to expose locally-running services. It doesn't work in remote connections yet, although we expect it to in the future.

Depending on your scenario, you may want to use the VS Code [Remote - Tunnels](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-server) extension to tunnel into a remote machine. You can learn more in the [Remote - Tunnels documentation](/docs/remote/tunnels.md).

### How are forwarded ports secured?

By default, both hosting and connecting to a tunnel requires authentication with the same GitHub or Microsoft account on each end. In both cases, VS Code makes outbound connections to a service hosted in Azure; no firewall changes are generally necessary, and VS Code doesn't set up any network listeners.

However, if you've opened a **Public** port, any user with your link can access the forwarded service. You should be careful to avoid hosting any confidential information or insecure services over such ports.

You can learn more about the security of the underlying dev tunnels service in its [documentation](https://learn.microsoft.com/azure/developer/dev-tunnels/security).

### What limits are there on port forwarding?

There are limits to both the amount of bandwidth used and the number of active machines that can be used in port forwarding, which are subject to change over time. Read more about tunnel usage limits in the [Remote-Tunnels](https://aka.ms/vscode-dev-tunnel-limit) documentation.

### Can I configure policies across my organization?

If you're part of an organization that wants to control access to port forwarding, you can do so by allowing or denying access to the domain `global.rel.tunnels.api.visualstudio.com`.

For users running Windows devices, you can also configure and then deploy group policy settings for dev tunnels. You can learn more in the [dev tunnels documentation](https://learn.microsoft.com/azure/developer/dev-tunnels/policies).