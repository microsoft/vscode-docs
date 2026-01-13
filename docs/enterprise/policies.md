---
# DO NOT TOUCH — Managed by doc writer
ContentId: 200bf922-3684-45ee-a8dd-43191d6b3f8b
DateApproved: 01/08/2026

VSCodeCommitHash: 587d46304c7f6c500b66440a4314f6d4540a4724
VSCodeVersion: 1.108.0

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Enterprise policies in Visual Studio Code enable organizations to centrally manage settings for their development teams. This reference details the available policies and how to implement them.
---

# Centrally manage VS Code settings with policies

Enterprise policies in Visual Studio Code enable organizations to centrally manage VS Code settings for their development teams to ensure consistency and compatibility across their organization. When a policy value is set, the value overrides the VS Code setting value configured at any level (default, user, and workspace).

IT admins can deploy and enforce specific VS Code configurations on users' devices through different device management solutions. VS Code supports applying policies on Windows, macOS, and Linux.

![Settings editor showing that the 'Extensions: Allowed' setting is managed by the organization.](images/policies/allowed-extensions-managed-by-organization.png)

In this article, you learn which enterprise policies are available in VS Code and how to configure them on different operating systems.

## Windows group policies

VS Code has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release ships with a `policies` directory containing ADMX template files that define the available policies.

### Configure policies using Local Group Policy Editor

Follow these steps to configure VS Code policies on a local Windows machine:

#### Step 1: Obtain the ADMX and ADML files

1. Download the [VS Code zip archive](https://code.visualstudio.com/docs/?dv=winzip) for your version of VS Code.
1. Extract the zip file to a temporary location.
1. Navigate to the `policies` folder in the extracted files. This folder contains the ADMX template files (for example, `vscode.admx`) and a `locales` subfolder with ADML files for different languages.

#### Step 2: Install the policy definition files

1. Copy the `vscode.admx` file to `C:\Windows\PolicyDefinitions`.
1. Copy the appropriate ADML file from the `locales` subfolder (for example, `en-US\vscode.adml`) to `C:\Windows\PolicyDefinitions\<your-locale>` (for example, `C:\Windows\PolicyDefinitions\en-US`).

> [!NOTE]
> You need administrator privileges to copy files to the `PolicyDefinitions` directory.

#### Step 3: Open the Local Group Policy Editor

1. Press `Windows+R` to open the Run dialog.
1. Type `gpedit.msc` and press Enter to open the Local Group Policy Editor.
1. If prompted by User Account Control, select **Yes** to allow the app to make changes.

#### Step 4: Navigate to VS Code policies

The VS Code policies are available under both Computer Configuration and User Configuration:

* **Computer Configuration** > **Administrative Templates** > **Microsoft VS Code**
* **User Configuration** > **Administrative Templates** > **Microsoft VS Code**

> [!TIP]
> Computer-level policies take precedence over user-level policies when both are configured.

#### Step 5: Configure a policy

1. Select the policy category (either Computer Configuration or User Configuration).
1. Navigate to **Administrative Templates** > **Microsoft VS Code**.
1. Double-click on the policy you want to configure (for example, **Update Mode**).
1. In the policy settings dialog, select **Enabled** to enforce the policy.
1. Configure the policy value using the available options or text fields.
1. Select **OK** to save the changes.
1. Close the Local Group Policy Editor.

The policy will take effect the next time VS Code is started. Some policies may require restarting Windows to take effect.

### Deploy policies at scale

Products such as [Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune) or Active Directory Group Policy can be used to centrally manage device policy at scale across an organization. These solutions allow administrators to deploy the ADMX/ADML files and policy configurations to multiple devices from a central location.

For Active Directory environments, copy the ADMX and ADML files to the [Central Store](https://learn.microsoft.com/troubleshoot/windows-client/group-policy/create-and-manage-central-store) to make the policies available across the domain.

## macOS configuration profiles

Configuration profiles manage settings on macOS devices. A profile is an XML file (`.mobileconfig`) with key/value pairs that correspond to available policies. These profiles can be deployed using Mobile Device Management (MDM) solutions or installed manually on individual devices.

### Configure policies manually

Follow these steps to configure VS Code policies on a macOS device:

#### Step 1: Locate the sample configuration profile

1. Open Finder and navigate to `/Applications`.
1. Right-click on **Visual Studio Code.app** (or your VS Code variant) and select **Show Package Contents**.
1. Navigate to `Contents/Resources/app/policies`.
1. Locate the sample `.mobileconfig` file (for example, `vscode-sample.mobileconfig`).

> [!TIP]
> Starting from VS Code version 1.99, each release ships with a sample `.mobileconfig` file in this location.

#### Step 2: Copy and edit the configuration profile

1. Copy the sample `.mobileconfig` file to a working location (for example, your Desktop or Documents folder).
1. Open the copied file in a text editor (for example, TextEdit, VS Code, or any XML editor).
1. Review the file structure - it contains XML key/value pairs for all available policies.

    > [!IMPORTANT]
    > The provided `.mobileconfig` file initializes **all** policies available in that version of VS Code with their default (restrictive) values. You must edit or remove policies that you do not want to enforce.

#### Step 3: Configure policy values

Edit the policy values according to your requirements:

**String policies** - policies that accept text values or JSON strings:

```xml
<!-- Example: Allow extensions from specific publishers -->
<key>AllowedExtensions</key>
<string>{"microsoft": true, "github": true}</string>

<!-- Example: Set update mode to a specific value -->
<key>UpdateMode</key>
<string>start</string>
```

**Boolean policies** - policies that accept true/false values:

```xml
<!-- Example: Enable user feedback -->
<key>EnableFeedback</key>
<true/>

<!-- Example: Disable telemetry -->
<key>EnableTelemetry</key>
<false/>
```

**Remove unwanted policies** - delete both the key and value for any policy you don't want to enforce:

```xml
<!-- To not enforce an update mode policy, remove these lines: -->
<key>UpdateMode</key>
<string>start</string>
```

Refer to the [policy reference](#vs-code-enterprise-policy-reference) below for details on each policy's accepted values and behavior.

#### Step 4: Install the configuration profile

1. Save your edited `.mobileconfig` file.
1. Double-click the `.mobileconfig` file in Finder.
1. The System Settings (or System Preferences on older macOS versions) will open.
1. Review the profile details and select **Install** (or **Continue** depending on your macOS version).
1. If prompted, authenticate with your administrator credentials.
1. Confirm the installation when prompted.

#### Step 5: Verify the profile installation

1. Open **System Settings** (macOS Ventura and later) or **System Preferences** (earlier versions).
1. Navigate to **Privacy & Security** > **Profiles** (or **General** > **Device Management** on older versions).
1. Verify that your VS Code configuration profile appears in the list.
1. Launch VS Code to see the policies in effect.

> [!NOTE]
> Policies take effect immediately for new VS Code instances. You may need to restart VS Code if it's already running.

#### Remove a configuration profile

To remove policies and revert to default settings:

1. Open **System Settings** > **Privacy & Security** > **Profiles**.
1. Select the VS Code configuration profile.
1. Select the **Remove** (or **-**) button.
1. Authenticate with your administrator credentials to confirm removal.

### Deploy profiles at scale

For enterprise deployments across multiple devices, use Mobile Device Management (MDM) solutions such as:

* [Microsoft Intune](https://learn.microsoft.com/mem/intune/configuration/device-profiles)
* Apple Business Manager with MDM

For more information on configuration profiles, refer to [Apple's documentation](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac).

## Linux JSON policies

Starting from VS Code version 1.106, you can configure VS Code setting policies on Linux devices by placing a JSON policy file at `/etc/vscode/policy.json`. This approach uses a simple JSON format to define policy values.

### Configure policies manually

Follow these steps to configure VS Code policies on a Linux device:

#### Step 1: Obtain the sample policy file

The sample `policy.json` file is included with each VS Code release. You can obtain it from either an existing installation or by downloading and extracting the VS Code archive. The file is located in the `resources/app/policies` directory.

#### Step 2: Copy and edit the policy file

1. Ensure the `/etc/vscode` directory exists:

    ```bash
    sudo mkdir -p /etc/vscode
    ```

    > [!NOTE]
    > You need root or sudo privileges to create the directory and manage policy files in `/etc/vscode`.

1. Copy the sample `policy.json` file to a working location:

    ```bash
    sudo cp /usr/share/code/resources/app/policies/policy.json /tmp/policy.json
    ```

1. Edit the file using your preferred text editor:

    ```bash
    sudo nano /tmp/policy.json
    # or
    sudo vim /tmp/policy.json
    # or
    code /tmp/policy.json
    ```

1. Review the JSON structure - it contains key/value pairs for all available policies.

    > [!IMPORTANT]
    > The provided `policy.json` file initializes **all** policies available in that version of VS Code with their default (restrictive) values. You must edit or remove policies that you do not want to enforce.

#### Step 3: Install the policy file

Copy the edited policy file to the `/etc/vscode/` system location:

```bash
sudo cp /tmp/policy.json /etc/vscode/policy.json
```

Set appropriate permissions:

```bash
sudo chmod 644 /etc/vscode/policy.json
sudo chown root:root /etc/vscode/policy.json
```

#### Step 4: Verify the policy installation

1. Launch VS Code (or restart it if already running).
1. Open **File** > **Preferences** > **Settings** (or press `Ctrl+,`).
1. Look for settings that correspond to your configured policies - they should show as "managed by your organization" or have a lock icon.
1. Hover over managed settings to see that they are controlled by policy.

> [!TIP]
> You can verify the policy file is being read by checking VS Code's logs or by attempting to change a managed setting (the change will be prevented).

#### Remove policies

To remove all policies and revert to default settings, delete the `/etc/vscode/policy.json` file and restart VS Code.

### Deploy policies at scale

For enterprise Linux deployments across multiple devices, use configuration management tools such as Ansible, Puppet, Chef, or Salt to deploy the `policy.json` file.

These tools allow administrators to deploy, update, and remove policies remotely across all managed Linux devices in the organization.

## VS Code enterprise policy reference

The following table lists all available enterprise policies in VS Code.

| Policy Name | Setting ID | Description | Minimum Version |
|------------|------------|-------------|----------------|
| `McpGalleryServiceUrl` | `setting(chat.mcp.gallery.serviceUrl)` | Configure the MCP Gallery service URL to connect to | 1.101 |
| `ExtensionGalleryServiceUrl` | `setting(extensions.gallery.serviceUrl)` | Configure the Marketplace service URL to connect to | 1.99 |
| `AllowedExtensions` | `setting(extensions.allowed)` | Specify a list of extensions that are allowed to use. This helps maintain a secure and consistent development environment by restricting the use of unauthorized extensions. More information: https://code.visualstudio.com/docs/setup/enterprise#_configure-allowed-extensions | 1.96 |
| `ChatToolsAutoApprove` | `setting(chat.tools.global.autoApprove)` | Global auto approve also known as "YOLO mode" disables manual approval completely for all tools in all workspaces, allowing the agent to act fully autonomously. This is extremely dangerous and is *never* recommended, even containerized environments like Codespaces and Dev Containers have user keys forwarded into the container that could be compromised. This feature disables critical security protections and makes it much easier for an attacker to compromise the machine. | 1.99 |
| `ChatToolsEligibleForAutoApproval` | `setting(chat.tools.eligibleForAutoApproval)` | Controls which tools are eligible for automatic approval. Tools set to 'false' will always present a confirmation and will never offer the option to auto-approve. The default behavior (or setting a tool to 'true') may result in the tool offering auto-approval options. | 1.107 |
| `ChatMCP` | `setting(chat.mcp.access)` | Controls access to installed Model Context Protocol servers. | 1.99 |
| `ChatAgentExtensionTools` | `setting(chat.extensionTools.enabled)` | Enable using tools contributed by third-party extensions. | 1.99 |
| `ChatAgentMode` | `setting(chat.agent.enabled)` | When enabled, agent mode can be activated from chat and tools in agentic contexts with side effects can be used. | 1.99 |
| `ChatToolsTerminalEnableAutoApprove` | `setting(chat.tools.terminal.enableAutoApprove)` | Controls whether to allow auto approval in the run in terminal tool. | 1.104 |
| `UpdateMode` | `setting(update.mode)` | Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service. | 1.67 |
| `TelemetryLevel` | `setting(telemetry.telemetryLevel)` | Controls the level of telemetry. | 1.99 |
| `EnableFeedback` | `setting(telemetry.feedback.enabled)` | Enable feedback mechanisms such as the issue reporter, surveys, and other feedback options. | 1.99 |


> [!NOTE]
> If you want to enact more policies, open an issue in the [VS Code GitHub repository](https://github.com/microsoft/vscode/issues). The team will determine if there is already a corresponding setting for the behavior or if a new setting and policy should be created.

## Related resources

<!-- TODO -->
