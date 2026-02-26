---
ContentId: 8a2b5f4c-9e3d-4c6a-b8f1-2d7e9a4c5b3f
DateApproved: 02/04/2026
MetaDescription: Learn how to manage and control VS Code extensions in enterprise environments, including private marketplace, allowed extensions, and preinstalling extensions.
---

# Manage extensions in enterprise environments

Visual Studio Code extensions enhance productivity but require careful management in enterprise environments to maintain security and compliance. This article covers how IT admins can control extension installation, host a private marketplace, and deploy extensions to users' machines.

## Configure allowed extensions

> [!NOTE]
> Support for allowed extensions is available starting from VS Code version 1.96.

VS Code supports controlling which extensions can be installed on users' machines through the `setting(extensions.allowed)` application-wide setting. You can selectively allow extensions by publisher, specific extension, version, and platform. By default, all extensions are allowed. When you configure this setting, only listed extensions can be installed, and unlisted extensions are blocked. If you block an extension or version that is already installed, the extension is disabled.

### Allow or block by publisher

Use the publisher ID to allow or block all extensions from a publisher. A key without a period (`.`) is treated as a publisher ID.

```jsonc
"extensions.allowed": {
    "microsoft": true,
    "github": true
}
```

> [!TIP]
> Use `microsoft` as the publisher ID to refer to all extensions published by Microsoft, even though they might have different publisher IDs.

### Allow or block by extension

Use the full extension ID (`<publisher>.<extension>`) to allow or block a specific extension. A key with a period is treated as an extension ID.

```jsonc
"extensions.allowed": {
    "esbenp.prettier-vscode": true,
    "ms-azuretools.vscode-containers": false
}
```

### Allow specific versions or platforms

Pin an extension to one or more approved versions. Version ranges are not supported, so you must list each version individually. To further restrict by platform, append `@<platform>` to the version.

```jsonc
"extensions.allowed": {
    "dbaeumer.vscode-eslint": ["3.0.0"],
    "figma.figma-vscode-extension": ["3.0.0", "4.2.3", "4.1.2"],
    "rust-lang.rust-analyzer": ["5.0.0@win32-x64", "5.0.0@darwin-x64"]
}
```

### Allow only stable versions

Use `"stable"` as the value to allow all stable versions of an extension or all extensions from a publisher, while blocking pre-release versions.

```jsonc
"extensions.allowed": {
    "github.vscode-pull-request-github": "stable",
    "redhat": "stable"
}
```

### Precedence and rules

* The more specific selector takes precedence. For example, `"microsoft": true` and `"microsoft.cplusplus": false` allows all Microsoft extensions except the C++ extension.
* Duplicate key values are not supported. Including both `"microsoft": true` and `"microsoft": false` results in an invalid configuration.
* Wildcards are not supported in extension or publisher IDs, except for `"*"` to allow or block all extensions. For example, `"*": false` blocks all extensions.

### Deploy with organization policy

Organizations can centrally manage allowed extensions by using the `AllowedExtensions` [policy](/docs/enterprise/policies.md). Through device management solutions, admins can deploy and enforce the policy across all managed devices. This overrides any user-configured `setting(extensions.allowed)` setting on individual devices.

![Screenshot of configuring AllowedExtensions from the Local Group Policy Editor.](images/policies/allowed-extensions-local-gp-editor.png)

> [!IMPORTANT]
> If there's a syntax error in the policy value, the `extensions.allowed` setting is not applied. Check the Window log in VS Code for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**).

## Preinstall extensions

You can set up VS Code with a set of preinstalled extensions (*bootstrap*). This functionality is useful in cases where you prepare a machine image, virtual machine, or cloud workstation where VS Code is preinstalled and specific extensions are immediately available for users.

> [!NOTE]
> Support for preinstalling extensions is currently only available on Windows.

Follow these steps to bootstrap extensions:

1. Create a folder `bootstrap\extensions` in the VS Code installation directory.

1. Download the [VSIX files](/docs/configure/extensions/extension-marketplace.md#can-i-download-an-extension-directly-from-the-marketplace) for the extensions that you want to preinstall and place them in the `bootstrap\extensions` folder.

1. When a user launches VS Code for the first time, all extensions in the `bootstrap\extensions` folder are installed silently in the background.

Users can still uninstall extensions that were preinstalled. Restarting VS Code after uninstalling an extension will not reinstall the extension.

## Host a private extension marketplace

The private marketplace enables enterprises to self-host and distribute extensions within their organization to meet security and compliance requirements. The private marketplace integrates with the VS Code extensions experience, giving users discovery and automatic updates of private extensions.

Key features of the private marketplace:

* **Self-hosting**: Host internal extensions on your own infrastructure, such as Azure or Kubernetes, to protect intellectual property.
* **Upstreaming**: Automatically include public extensions from the [Visual Studio Marketplace](https://marketplace.visualstudio.com), even in environments with restricted internet connectivity. Allow or deny select extensions by setting up an [allow list](#configure-allowed-extensions).
* **Rehosting**: Download and host public extensions to apply enterprise-specific verification and security standards, with support for air-gapped environments. See how [Microsoft protects your software supply chain](https://aka.ms/vsmsecurityblog).
* **Simple deployment**: Deploy as a stateless Docker container, no external database required.
* **Flexible storage**: Publish and manage extensions using any file system or Azure Artifacts.
* **Centralized rollout**: Deploy the private marketplace to your team using group policy on Windows and macOS.
* **Integrated installation and updates**: Search for and install extensions directly from VS Code, with automatic updates for new versions.
* **Cross-platform support**: Compatible with VS Code desktop on Windows, macOS, and Linux.

> [!NOTE]
> Connecting from VS Code Server or VS Code for the Web is not supported.

Private marketplace is currently available to GitHub Enterprise customers. VS Code users must sign in with a GitHub Enterprise or Copilot Enterprise/Business account to access the private marketplace.

Get started with the **[deployment and feature guide](https://aka.ms/private-marketplace/readme)**, which includes deployment instructions, scripts, and development environment configuration. For questions or assistance, contact [private marketplace support](https://aka.ms/vspm/support).

## Related resources

* [Extension Marketplace](/docs/configure/extensions/extension-marketplace.md) - Learn about installing and managing extensions in VS Code.
* [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md) - Learn about extension security in VS Code.
* [Enterprise policies](/docs/enterprise/policies.md) - Reference for all enterprise policies in VS Code.
