---
Order: 8
Area: setup
TOCTitle: Enterprise
ContentId: 936ab8e0-3bbe-4842-bb17-ea314665c20a
PageTitle: Visual Studio Code enterprise support
DateApproved: 10/29/2024
MetaDescription: Learn about Visual Studio Code's enterprise support features, such as group policies or restricting allowed extensions.

---
# Enterprise support

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compatibility across your organization.

## Network: Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

Refer to the [network common hostnames list](/docs/setup/network.md#common-hostnames) for the required domains.

## Configure allowed extensions

The `extensions.allowed` application setting enables you to control which extensions can be installed in your organization. If the setting is not configured, all extensions are allowed. If the setting is configured, all extensions not listed are blocked from installing. If you block an extension or version that is already installed, the extension is disabled.

> [!NOTE]
> Support for allowed extensions is available starting from VS Code version 1.96.

The `extensions.allowed` setting contains a list of extension selectors that determine which extensions are allowed or blocked. You can specify the following types of extension selectors:

* Allow or block all extensions from a publisher
* Allow or block specific extensions
* Allow specific extension versions
* Allow specific extension versions and platforms
* Allow only stable versions of an extension
* Allow only stable extension versions from a publisher

The following JSON snippet shows examples of the different `extensions.allowed` setting values:

```json
"extensions.allowed": {
    // Allow all extensions from the 'microsoft' publisher. If the key does not have a '.', it means it is a publisher ID.
    "microsoft": true,

    // Allow all extensions from the 'github' publisher
    "github": true,

    // Allow prettier extension
    "esbenp.prettier-vscode": true,

    // Do not allow docker extension
    "ms-azuretools.vscode-docker": false,

    // Allow only version 3.0.0 of the eslint extension
    "dbaeumer.vscode-eslint": ["3.0.0"],

    // Allow multiple versions of the figma extension
    "figma.figma-vscode-extension": ["3.0.0", "4.2.3", "4.1.2"]

    // Allow version 5.0.0 of the rust extension on Windows and macOS
    "rust-lang.rust-analyzer": ["5.0.0@win32-x64", "5.0.0@darwin-x64"]

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

If you want to learn more about extensions in VS Code, refer to the [extensions documentation](/docs/editor/extension-marketplace.md).

### Control allowed extensions via device management

You can control the `extensions.allowed` setting by using [device management](#device-management). Use the `AllowedExtensions` VS Code policy, which overrides the `extensions.allowed` setting. The value of this policy is a JSON string that contains the allowed extensions.

> [!IMPORTANT]
> If there's a syntax error in the policy value, the `extensions.allowed` setting is not applied. You can check the Window log in VS Code for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**). In the Settings editor (`kb(workbench.action.openSettings)`), you can see a warning message for the `Extensions: Allowed` setting that the setting value was not applied.

![Settings editor showing a warning message for the 'Extensions: Allowed' setting.](images/enterprise/allowed-extensions-not-applied.png)

## Configure automatic updates

The `update.mode` setting controls whether VS Code automatically updates when a new version is released. The updates are fetched from a Microsoft online service.

The setting has the following options:

* `none` - updates are disabled
* `manual` - automatic checking for updates is disabled, but users can manually check for updates
* `start` - only check for updates when VS Code starts, automatic checking for updates is disabled
* `default` - automatic checking for updates is enabled and runs in the background periodically

### Control update mode via device management

You can control the `update.mode` setting by using [device management](#device-management). Use the `UpdateMode` VS Code policy, which overrides the `update.mode` setting. The value of this policy is a string that contains the update mode.

## Device management

You can control specific features of VS Code through device management solutions to ensure it meets the needs of your organization.

### Admin-controlled features

* Automatic updates (`update.mode`)
* Allowed extensions (`extensions.allowed`)

### Group Policy on Windows

System administrators need a way to control default software settings across all client machines in their organization. Group Policy is a client solution that gives administrators flexibility to implement the behavior for each of the available policies and settings.

VS Code now has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release will ship with a `policies` directory containing ADMX template files that can be added to the following path: `C:\Windows\PolicyDefinitions`. Make sure to also copy the corresponding `adml` file to the `C:\Windows\PolicyDefinitions\<your-locale>` directory.

Once the policy definitions are installed, admins can use the [Local Group Policy Editor](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to manage the policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. When a policy value is set, the value overrides the VS Code [setting](/docs/getstarted/settings.md) value configured at any level (default, user, workspace, etc.).

### Additional policies

The goal is to promote current VS Code settings as Policies and closely follow existing settings, so that the naming and behavior are consistent. If there are requests to enact more policies, please open an issue in the VS Code [GitHub repository](https://github.com/microsoft/vscode/issues). The team will determine if there is already a corresponding setting for the behavior or if a new setting should be created to control the desired behavior.

## Set up VS Code with preinstalled extensions

You can set up VS Code with a set of preinstalled extensions (*bootstrap*). This functionality is useful in cases where you prepare a machine image, virtual machine, or cloud workstation where VS Code is preinstalled and specific extensions are immediately available for users.

> [!NOTE]
> Support for preinstalling extensions is currently only available on Windows.

Follow these steps to bootstrap extensions:

1. Create a folder `bootstrap\extensions` in the VS Code installation directory.

1. Download the [VSIX files](/docs/editor/extension-marketplace.md#can-i-download-an-extension-directly-from-the-marketplace) for the extensions that you want to preinstall and place them in the `bootstrap\extensions` folder.

1. When a user launches VS Code for the first time, all extensions in the `bootstrap\extensions` folder are installed silently in the background.

Users can still uninstall extensions that were preinstalled. Restarting VS Code after uninstalling an extension will not reinstall the extension.

## Frequently asked questions

### Does VS Code support configuration profiles on macOS or Linux?

Currently, VS Code only supports Windows group policies. Support for configuration profiles on macOS is coming soon.

Support for Linux is not on the roadmap. If you're interested in configuration profiles on Linux, open an issue in the VS Code [GitHub repository](https://github.com/microsoft/vscode/issues) and share details about your scenario.
