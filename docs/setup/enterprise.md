---
Order: 8
Area: setup
TOCTitle: Enterprise
ContentId: 936ab8e0-3bbe-4842-bb17-ea314665c20a
PageTitle: Visual Studio Code enterprise support
DateApproved: 05/08/2025
MetaDescription: Learn about Visual Studio Code's enterprise support features, such as group policies or restricting allowed extensions.

---
# Enterprise support

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compatibility across your organization.

## Network: Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

Refer to the [network common hostnames list](/docs/setup/network.md#common-hostnames) for the required domains.

## Configure allowed extensions

> [!NOTE]
> Support for allowed extensions is available starting from VS Code version 1.96.

The `extensions.allowed` application-wide setting in VS Code enables you to control which extensions can be installed on the user's machine. If the setting is not configured, all extensions are allowed. If the setting is configured, all extensions not listed are blocked from installing. If you block an extension or version that is already installed, the extension is disabled.

To [centrally manage](#centrally-manage-vs-code-settings) allowed extensions for your organization, configure the `AllowedExtensions` policy using your device management solution. This policy overrides the `extensions.allowed` setting on users' devices. The value of this policy is a JSON string that contains the allowed extensions.

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

The following JSON snippet shows examples of the different `extensions.allowed` setting values:

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

If you want to learn more about extensions in VS Code, refer to the [extensions documentation](/docs/configure/extensions/extension-marketplace.md).

## Configure automatic updates

The `update.mode` VS Code setting controls whether VS Code automatically updates when a new version is released. The updates are fetched from a Microsoft online service.

The setting has the following options:

* `none` - updates are disabled
* `manual` - automatic checking for updates is disabled, but users can manually check for updates
* `start` - only check for updates when VS Code starts, automatic checking for updates is disabled
* `default` - automatic checking for updates is enabled and runs in the background periodically

To [centrally manage](#centrally-manage-vs-code-settings) automatic updates for your organization, configure the `UpdateMode` policy using your device management solution. This policy overrides the `update.mode` setting on users' devices. The value of this policy is a string that contains the update mode.

## Configure telemetry level

The `setting(telemetry.telemetryLevel)` VS Code setting controls VS Code telemetry, first-party extension telemetry, and participating third-party extension telemetry. Some third party extensions might not respect this setting. Read more about the [data we collect](https://aka.ms/vscode-telemetry).

* `all` - sends usage data, errors, and crash reports
* `error` - sends general error telemetry and crash reports
* `crash` - sends OS level crash reports
* `off` - disables all product telemetry

To [centrally manage](#centrally-manage-vs-code-settings) telemetry for your organization, configure the `TelemetryLevel` policy using your device management solution. This policy overrides the `telemetry.telemetryLevel` setting on users' devices. The value of this policy is a string that contains the telemetry level.

## Centrally manage VS Code settings

You can centrally manage specific features of VS Code through device management solutions to ensure it meets the needs of your organization. When you specify a VS Code policy, its value overrides the corresponding VS Code setting on users' devices.

![Settings editor showing that the 'Extensions: Allowed' setting is managed by the organization.](images/enterprise/allowed-extensions-managed-by-organization.png)

VS Code currently provides policies to control the following admin-controlled features:

| Policy                       | Description                                                      | VS Code setting                  | Available since |
|------------------------------|------------------------------------------------------------------|----------------------------------|-----------------|
| `AllowedExtensions`          | Controls which extensions can be installed.                      | `extensions.allowed`             | 1.96            |
| `UpdateMode`                 | Controls whether VS Code automatically updates when a new version is released. | `update.mode`      | 1.67            |
| `TelemetryLevel`             | Controls the level of telemetry data.                             | `telemetry.telemetryLevel`       | 1.99            |
| `EnableFeedback`             | Controls feedback mechanisms, such as the issue reporter and surveys. | `telemetry.feedback.enabled` | 1.99            |
| `ChatAgentMode`              | Controls if [agent mode](/docs/copilot/chat/copilot-chat.md#chat-mode) is enabled in chat.           | `chat.agent.enabled`             | 1.99            |
| `ChatAgentExtensionTools`    | Enable using tools contributed by third-party extensions.        | `chat.agent.extensionTools.enabled` | 1.99        |
| `ChatPromptFiles`            | Enable [reusable prompt and instruction files](/docs/copilot/copilot-customization.md) in chat.      | `chat.promptFiles`               | 1.99            |
| `ChatMCP`                    | Enable integration with [Model Context Protocol (MCP) servers](/docs/copilot/chat/mcp-servers.md).   | `chat.mcp.enabled`               | 1.99            |
| `ChatToolsAutoApprove`       | Enable auto-approval for agent mode tools.                       | `chat.tools.autoApprove`         | 1.99            |

### Group Policy on Windows

VS Code has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release ships with a `policies` directory containing ADMX template files that can be added to the following path: `C:\Windows\PolicyDefinitions`. Make sure to also copy the corresponding `adml` file to the `C:\Windows\PolicyDefinitions\<your-locale>` directory.

Once the policy definitions are installed, admins can use the [Local Group Policy Editor](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to manage the policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. When a policy value is set, the value overrides the VS Code [setting](/docs/configure/settings.md) value configured at any level (default, user, workspace, etc.).

### Configuration profiles on macOS

Configuration profiles manage settings on macOS devices. A profile is an XML file with key/value pairs that correspond to available policy. These profiles can be deployed using Mobile Device Management (MDM) solutions, or installed manually.

Starting from VS Code version 1.99, each release ships with a sample `.mobileconfig` file. This file is located within the `.app` bundle under `Contents/Resources/app/policies`. Use a text editor to manually edit or remove policy to match your organization's requirements.

> [!TIP]
> To view the contents of the `.app` bundle, right-click on the application (for example, `/Applications/Visual Studio Code.app`) in Finder and select **Show Package Contents**.

#### String policies

The example below demonstrates configuration of the `AllowedExtensions` policy. The policy value starts empty in the sample file (no extensions are allowed).

```xml
<key>AllowedExtensions</key>
<string></string>
```

Add the [appropriate JSON string](#configure-allowed-extensions) defining your policy between the `<string>` tags.

```xml
<key>AllowedExtensions</key>
<string>{"microsoft": true, "github": true}</string>
```

Other policies, like `UpdateMode`, accept a string from a set of [predefined values](#configure-automatic-updates).

```xml
<key>UpdateMode</key>
<string>start</string>
```

#### Boolean policies

Boolean policy values are represented with `<true/>` or `<false/>`.

```xml
<key>EnableFeedback</key>
<true/>
```

To omit a given policy, remove its key/value pair from the `.mobileconfig` file. For example, to not enforce an update mode policy, remove the `UpdateMode` key and the `<string></string>` tags that follow it.

> [!IMPORTANT]
> The provided `.mobileconfig` file initializes **all** policies available in that version of VS Code. Delete any policies that are not needed.
>
> If you do not edit or remove a policy from the sample `.mobileconfig`, that policy will be enforced with its default (restrictive) policy value.

Manually install a configuration profile by double-clicking on the `.mobileconfig` profile in Finder and then enabling it in System Preferences under **General** > **Device Management**.  Removing the profile from System Preferences will remove the policies from VS Code.

For more information on configuration profiles, refer to [Apple's documentation](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac).


### Additional policies

The goal is to promote current VS Code settings as policies and closely follow existing settings, so that the naming and behavior are consistent. If there are requests to enact more policies, please open an issue in the VS Code [GitHub repository](https://github.com/microsoft/vscode/issues). The team will determine if there is already a corresponding setting for the behavior or if a new setting should be created to control the desired behavior.

## Set up VS Code with preinstalled extensions

You can set up VS Code with a set of preinstalled extensions (*bootstrap*). This functionality is useful in cases where you prepare a machine image, virtual machine, or cloud workstation where VS Code is preinstalled and specific extensions are immediately available for users.

> [!NOTE]
> Support for preinstalling extensions is currently only available on Windows.

Follow these steps to bootstrap extensions:

1. Create a folder `bootstrap\extensions` in the VS Code installation directory.

1. Download the [VSIX files](/docs/configure/extensions/extension-marketplace.md#can-i-download-an-extension-directly-from-the-marketplace) for the extensions that you want to preinstall and place them in the `bootstrap\extensions` folder.

1. When a user launches VS Code for the first time, all extensions in the `bootstrap\extensions` folder are installed silently in the background.

Users can still uninstall extensions that were preinstalled. Restarting VS Code after uninstalling an extension will not reinstall the extension.

## Frequently asked questions

### Does VS Code support configuration profiles on Linux?

Support for Linux is not on the roadmap. If you're interested in configuration profiles on Linux, open an issue in the VS Code [GitHub repository](https://github.com/microsoft/vscode/issues) and share details about your scenario.
