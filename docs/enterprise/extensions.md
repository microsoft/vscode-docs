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

VS Code supports controlling which extension can be installed on users' machines through the `setting(extensions.allowed)` application-wide setting. You can selectively allow extensions by publisher, specific extension, version, and platform.

If the setting is not configured, all extensions are allowed. If the setting is configured, all extensions that are not listed are blocked from installing. If you block an extension or version that is already installed, the extension is disabled.

Organizations can centrally manage allowed extensions by using the `AllowedExtensions` [policy](/docs/enterprise/policies.md). Through device management solutions, admins can then deploy and enforce the policy across all managed devices. This overrides any user-configured `setting(extensions.allowed)` setting on individual devices.

For example, to only allow extensions from the `github` and `microsoft` publishers, set the following JSON value for the `AllowedExtensions` policy:

```json
{
    "github": true,
    "microsoft": true
}
```

![Screenshot of configuring AllowedExtensions from the Local Group Policy Editor.](images/policies/allowed-extensions-local-gp-editor.png)

> [!IMPORTANT]
> If there's a syntax error in the policy value, the `extensions.allowed` setting is not applied. You can check the Window log in VS Code for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**).

### Allowed extensions setting values

The `extensions.allowed` setting contains a list of extension selectors that determine which extensions are allowed or blocked. You can specify the following types of extension selectors:

* Allow or block all extensions from a publisher
* Allow or block specific extensions
* Allow specific extension versions
* Allow specific extension versions and platforms
* Allow only stable versions of an extension
* Allow only stable extension versions from a publisher

The following JSON snippet shows examples of the different `settings(extensions.allowed)` setting values:

```json
"extensions.allowed": {
    // Allow all extensions from the 'microsoft' publisher. If the key does not have a '.', it means it is a publisher ID.
    "microsoft": true,

    // Allow all extensions from the 'github' publisher
    "github": true,

    // Allow prettier extension
    "esbenp.prettier-vscode": true,

    // Do not allow container tools extension
    "ms-azuretools.vscode-containers": false,

    // Allow only version 3.0.0 of the eslint extension
    "dbaeumer.vscode-eslint": ["3.0.0"],

    // Allow multiple versions of the figma extension
    "figma.figma-vscode-extension": ["3.0.0", "4.2.3", "4.1.2"],

    // Allow version 5.0.0 of the rust extension on Windows and macOS
    "rust-lang.rust-analyzer": ["5.0.0@win32-x64", "5.0.0@darwin-x64"],

    // Allow only stable versions of the GitHub Pull Requests extension
    "github.vscode-pull-request-github": "stable",

    // Allow only stable versions from redhat publisher
    "redhat": "stable",
}
```

Specify publishers by their publisher ID. If a key does not have a period (`.`), it is considered a publisher ID. If a key has a period, it is considered an extension ID. The use of wildcards is currently not supported.

> [!TIP]
> You can use `microsoft` as the publisher ID to refer to all extensions published by Microsoft, even though they might have different publisher IDs.

Version ranges are not supported. If you want to allow multiple versions of an extension, you must specify each version individually. To further restrict versions by platform, use the `@` symbol to specify the platform. For example, `"rust-lang.rust-analyzer": ["5.0.0@win32-x64", "5.0.0@darwin-x64"]`.

The more specific the selector, the higher the precedence. For example, `"microsoft": true` and `"microsoft.cplusplus": false` allows all Microsoft extensions, except for the C++ extension.

Duplicate key values are not supported. For example, including both `"microsoft": true` and `"microsoft": false` results in an invalid policy.

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

The private marketplace enables enterprises to self-host and distribute extensions within their organization to meet organizational security and compliance requirements. The private marketplace integrates with the VS Code extensions experience, giving users easy discovery and automatic updates of private extensions.

> [!NOTE]
> Connecting from VS Code Server or VS Code for the Web is not supported.

<details>
<summary>Use cases</summary>

* Hosting internal extensions privately to protect intellectual property.
* Providing developers with access to selected or all extensions from the [Visual Studio Marketplace](https://marketplace.visualstudio.com), even in environments with restricted internet connectivity.
* Downloading and rehosting extensions from external sources to apply enterprise-specific verification and security standards. See how [Microsoft protects your software supply chain](https://aka.ms/vsmsecurityblog).

</details>

<details>
<summary>Key features</summary>

* **Self-hosting**: Host internal and downloaded extensions on your own infrastructure, such as Azure or Kubernetes.
* **Simple deployment**: Deploy the private marketplace as a stateless Docker container, no external database required.
* **Flexible storage**: Publish and manage extensions using any file system or Azure Artifacts.
* **Upstreaming**: Choose to automatically include public extensions from the Visual Studio Marketplace. Allow or deny select extensions by setting up an [allow list](#configure-allowed-extensions).
* **Rehosting**: Choose to download and host public extensions for enhanced security and support for environments without public internet connectivity (air-gapped).
* **Centralized rollout**: Deploy the private marketplace to your team using group policy on Windows and macOS.
* **Integrated installation and updates**: Search for and install extensions directly from VS Code, with automatic updates for new versions in the private marketplace.
* **Cross-platform support**: Compatible with VS Code desktop on Windows, macOS, and Linux.

</details>

### Availability

Private marketplace is currently available to GitHub Enterprise customers. VS Code users must sign in with a GitHub Enterprise or Copilot Enterprise/Business account to access the private marketplace.

### Getting started

Refer to the **[deployment and feature guide](https://aka.ms/private-marketplace/readme)** for deployment instructions, scripts, and development environment configuration. If you have questions or need assistance, contact [private marketplace support](https://aka.ms/vspm/support).

## Related resources

* [Extension Marketplace](/docs/configure/extensions/extension-marketplace.md) - Learn about installing and managing extensions in VS Code.
* [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md) - Learn about extension security in VS Code.
* [Enterprise policies](/docs/enterprise/policies.md) - Reference for all enterprise policies in VS Code.
