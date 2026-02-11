---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 02/04/2026
MetaDescription: Learn how to configure and manage Visual Studio Code in enterprise environments, including policies, extensions, AI settings, and network configuration.
---

# VS Code for enterprise

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compliance across your organization.

## Enterprise policies

VS Code supports centrally managed policies that override user settings on managed devices. Policies can be deployed through device management solutions like Microsoft Intune, Active Directory Group Policy, or MDM solutions on macOS.

Policies are available to control:

* [AI and Copilot features](/docs/enterprise/ai-settings.md) - Agent mode, MCP servers, and tool approvals
* [Extensions](/docs/enterprise/extensions.md) - Allowed extensions and private marketplace
* [Telemetry](/docs/enterprise/telemetry.md) - Data collection levels and feedback mechanisms
* [Automatic updates](/docs/enterprise/updates.md) - Control when and how VS Code updates

See the [enterprise policies reference](/docs/enterprise/policies.md) for a complete list of available policies.

## Extension management

Organizations can control which extensions are installed on users' machines and host a private extension marketplace.

* **Allowed extensions** - Specify which extensions can be installed by publisher, extension ID, or version
* **Private marketplace** - Self-host extensions for your organization and control access to the public marketplace

Learn more about [managing extensions in enterprise environments](/docs/enterprise/extensions.md).

## Network configuration

VS Code requires network access for several features, including automatic updates, extension marketplace, and telemetry. For environments with restricted network access or proxy servers, you might need to configure:

* **Firewall allowlist** - Allow specific hostnames for VS Code functionality
* **Proxy server** - VS Code uses system proxy settings by default
* **SSL certificates** - Configure trusted certificates for HTTPS proxies

For detailed network configuration, see [Network connections in VS Code](/docs/setup/network.md).

### Common hostnames

If your firewall requires an allowlist, the key hostnames to allow include:

* `update.code.visualstudio.com` - Updates
* `marketplace.visualstudio.com` - Extension marketplace
* `*.gallery.vsassets.io` - Extension assets
* `vscode.download.prss.microsoft.com` - Downloads

See the [complete list of hostnames](/docs/setup/network.md#common-hostnames) in the network documentation.

## Preinstalled extensions

You can prepare machine images or virtual machines with VS Code and a set of preinstalled extensions. When users launch VS Code for the first time, the extensions are installed automatically.

Learn more about [preinstalling extensions](/docs/enterprise/extensions.md#preinstall-extensions).

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md) - Complete list of policies
* [Network connections](/docs/setup/network.md) - Proxy and firewall configuration
* [Settings Sync](/docs/configure/settings-sync.md) - Synchronize settings across devices
