---
ContentId: 8a2b5f4c-9e3d-4c6a-b8f1-2d7e9a4c5b3f
DateApproved: 10/21/2026
MetaDescription: Manage {% data variables.product.prodname_vscode_shortname %} extensions with allowlists, a private marketplace, and preinstalled extensions.
---

# Manage extensions in enterprise environments

As an IT admin, you can configure extension installation and enablement in {% data variables.product.prodname_vscode %}, host a private marketplace, and preinstall extensions for your development teams.

## Configure allowed extensions

> [!NOTE]
> Support for allowed extensions is available starting from {% data variables.product.prodname_vscode_shortname %} version 1.96.

Use the application-wide `setting(extensions.allowed)` setting to control which extensions {% data variables.product.prodname_vscode_shortname %} permits users to install and enable. You can allow or block extensions by publisher, extension ID, version, and platform.

By default, all extensions are allowed. With an allowlist, extensions that do not match an allow rule are blocked. If you block an extension or version that is already installed, {% data variables.product.prodname_vscode_shortname %} disables it.

> [!NOTE]
> For locally supplied VSIX packages, these rules use identifiers declared in the package. They do not verify the package's origin, prevent changes to local extension files, or limit an extension's [runtime permissions](/docs/configure/extensions/extension-runtime-security.md#about-extension-runtime-permissions).

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
> If there's a syntax error in the policy value, the `extensions.allowed` setting is not applied. Check the Window log in {% data variables.product.prodname_vscode_shortname %} for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**).

## Preinstall extensions

You can set up {% data variables.product.prodname_vscode_shortname %} with a set of preinstalled extensions (*bootstrap*). This functionality is useful in cases where you prepare a machine image, virtual machine, or cloud workstation where {% data variables.product.prodname_vscode_shortname %} is preinstalled and specific extensions are immediately available for users.

> [!NOTE]
> Support for preinstalling extensions is currently only available on Windows.

Follow these steps to bootstrap extensions:

1. Create a folder `bootstrap\extensions` in the {% data variables.product.prodname_vscode_shortname %} installation directory.

1. Download the [VSIX files](/docs/configure/extensions/extension-marketplace.md#can-i-download-an-extension-directly-from-the-marketplace) for the extensions that you want to preinstall and place them in the `bootstrap\extensions` folder.

1. When a user launches {% data variables.product.prodname_vscode_shortname %} for the first time, all extensions in the `bootstrap\extensions` folder are installed silently in the background.

Users can still uninstall extensions that were preinstalled. Restarting {% data variables.product.prodname_vscode_shortname %} after uninstalling an extension will not reinstall the extension.

## Host a private extension marketplace

Use a private marketplace to host and distribute extensions within your organization. It integrates with the {% data variables.product.prodname_vscode_shortname %} extensions experience, giving users discovery and automatic updates of private extensions.

Key features of the private marketplace:

* **Self-hosting**: Host internal extensions on your own infrastructure, such as Azure or Kubernetes.
* **Upstreaming**: Automatically include public extensions from the [Visual Studio Marketplace](https://marketplace.visualstudio.com), even in environments with restricted internet connectivity. Allow or deny select extensions by setting up an [allow list](#configure-allowed-extensions).
* **Rehosting**: Download and host public extensions on your own infrastructure, including in air-gapped environments.
* **Simple deployment**: Deploy as a stateless Docker container, no external database required.
* **Flexible storage**: Publish and manage extensions using any file system or Azure Artifacts.
* **Centralized rollout**: Deploy the private marketplace to your team using group policy on Windows and macOS.
* **Integrated installation and updates**: Search for and install extensions directly from {% data variables.product.prodname_vscode_shortname %}, with automatic updates for new versions.
* **Cross-platform support**: Compatible with {% data variables.product.prodname_vscode_shortname %} desktop on Windows, macOS, and Linux.

> [!NOTE]
> Connecting from {% data variables.product.prodname_vscode_shortname %} Server or {% data variables.product.prodname_vscode_shortname %} for the Web is not supported.

Private marketplace is currently available to GitHub Enterprise customers. {% data variables.product.prodname_vscode_shortname %} users must sign in with a GitHub Enterprise or {% data variables.copilot.copilot_enterprise_short %}/Business account to access the private marketplace.

Get started with the **[deployment and feature guide](https://aka.ms/private-marketplace/readme)**, which includes deployment instructions, scripts, and development environment configuration. For questions or assistance, contact [private marketplace support](https://aka.ms/vspm/support).

## Related resources

* [Extension Marketplace](/docs/configure/extensions/extension-marketplace.md) - Learn about installing and managing extensions in {% data variables.product.prodname_vscode_shortname %}.
* [Extension runtime security](/docs/configure/extensions/extension-runtime-security.md) - Learn about extension security in {% data variables.product.prodname_vscode_shortname %}.
* [Enterprise policies](/docs/enterprise/policies.md) - Reference for all enterprise policies in {% data variables.product.prodname_vscode_shortname %}.
