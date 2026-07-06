---
# DO NOT TOUCH — Managed by doc writer
ContentId: 200bf922-3684-45ee-a8dd-43191d6b3f8b
DateApproved: 7/8/2026

VSCodeCommitHash: 5dbc18b9f6914161325aef30f3d86c2095ad2f0c
VSCodeVersion: 1.122.0

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Enterprise policies in Visual Studio Code enable organizations to centrally manage settings for their development teams. This reference details the available policies and how to implement them.
---

# Centrally manage VS Code settings with policies

Enterprise policies in Visual Studio Code enable organizations to centrally manage VS Code settings for their development teams to ensure consistency and compatibility across their organization. When a policy value is set, the value overrides the VS Code setting value configured at any level (default, user, and workspace).

IT admins can deploy and enforce specific VS Code configurations on users' devices through different device management solutions. VS Code supports applying policies on Windows, macOS, and Linux.

![Settings editor showing that the 'Extensions: Allowed' setting is managed by the organization.](images/policies/allowed-extensions-managed-by-organization.png)

In this article, you learn which enterprise policies are available in VS Code and how to configure them on different operating systems.

## Windows group policies

VS Code has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy).

These profiles can be deployed using Mobile Device Management (MDM) solutions or installed manually on individual devices.

### Step 1: Obtain the sample ADMX and ADML files

Starting from VS Code version 1.69, each release ships with a `policies` directory containing ADMX template files that define the available policies.

You can get the ADMX and ADML files from either an existing installation or by downloading and extracting the VS Code zip archive. Follow these steps to obtain the files:

1. Download the [VS Code zip archive](/download) for your version of VS Code.
1. Extract the zip file to a temporary location.
1. Navigate to the `policies` folder in the extracted files. This folder contains the ADMX template files (for example, `vscode.admx`) and a `locales` subfolder with ADML files for different languages.

### Step 2: Configure policy values

After installing the ADMX and ADML files, configure policy values through your management tool:

- For Active Directory environments, use the Group Policy Editor (`gpedit.msc`) and navigate to **Computer Configuration** > **Administrative Templates** > **Visual Studio Code**.
- For cloud-managed devices, use your MDM solution (for example, Microsoft Intune) to configure the imported VS Code administrative template policies.
- Open each policy, set it to **Enabled** or **Disabled**, and provide any required value in the policy UI.
- Leave policies in the **Not Configured** state if you don't want to enforce them.

Configured policy values are written to the registry under `Software\Policies\Microsoft\VSCode`.

Refer to the [policy reference](#vs-code-enterprise-policy-reference) below for details on each policy's accepted values and behavior.

### Step 3: Deploy the policies

You can now deploy the configured policies at scale to all relevant devices in your organization using a device management solution. You can manually test the policies on a local Windows machine before deploying them at scale using the Local Group Policy Editor.

<details name="deploy-policies-win">
<summary>Deploy policies at scale</summary>

Products such as [Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/what-is-intune) or Active Directory Group Policy can be used to centrally manage device policy at scale across an organization. These solutions allow administrators to deploy the ADMX/ADML files and policy configurations to multiple devices from a central location.

For Active Directory environments, copy the ADMX and ADML files to the [Central Store](https://learn.microsoft.com/troubleshoot/windows-client/group-policy/create-and-manage-central-store) to make the policies available across the domain.

</details>

<details name="deploy-policies-win">
<summary>Manually test policies on a local machine</summary>

If you want to test the policies on a local Windows machine before deploying them at scale, you can manually install the ADMX/ADML files and configure the policies using the Local Group Policy Editor.

Follow these steps to configure VS Code policies on a local Windows machine:

#### Step 1: Install the policy definition files

1. Copy the `vscode.admx` file to `C:\Windows\PolicyDefinitions`.
1. Copy the appropriate ADML file from the `locales` subfolder (for example, `en-US\vscode.adml`) to `C:\Windows\PolicyDefinitions\<your-locale>` (for example, `C:\Windows\PolicyDefinitions\en-US`).

> [!NOTE]
> You need administrator privileges to copy files to the `PolicyDefinitions` directory.

#### Step 2: Open the Local Group Policy Editor

1. Press `Windows+R` to open the Run dialog.
1. Type `gpedit.msc` and press Enter to open the Local Group Policy Editor.
1. If prompted by User Account Control, select **Yes** to allow the app to make changes.

#### Step 3: Navigate to VS Code policies

The VS Code policies are available under both Computer Configuration and User Configuration:

* **Computer Configuration** > **Administrative Templates** > **Microsoft VS Code**
* **User Configuration** > **Administrative Templates** > **Microsoft VS Code**

> [!TIP]
> Computer-level policies take precedence over user-level policies when both are configured.

#### Step 4: Configure a policy

1. Select the policy category (either Computer Configuration or User Configuration).
1. Navigate to **Administrative Templates** > **Microsoft VS Code**.
1. Double-click on the policy you want to configure (for example, **Update Mode**).
1. In the policy settings dialog, select **Enabled** to enforce the policy.
1. Configure the policy value using the available options or text fields.
1. Select **OK** to save the changes.
1. Close the Local Group Policy Editor.

The policy will take effect the next time VS Code is started. Some policies may require restarting Windows to take effect.

</details>

## macOS configuration profiles

Configuration profiles manage settings on macOS devices. A profile is an XML file (`.mobileconfig`) with key/value pairs that correspond to available policies.

These profiles can be deployed using Mobile Device Management (MDM) solutions or installed manually on individual devices.

### Step 1: Obtain the sample configuration profile

Starting from VS Code version 1.99, each release ships with a sample `.mobileconfig` file. Follow these steps to locate the sample file on a macOS device with VS Code installed:

1. Open Finder and navigate to `/Applications`.
1. Right-click on **Visual Studio Code.app** (or your VS Code variant) and select **Show Package Contents**.
1. Navigate to `Contents/Resources/app/policies`.
1. Locate the sample `.mobileconfig` file (for example, `vscode-sample.mobileconfig`).

### Step 2: Configure policy values

1. Copy the sample `.mobileconfig` file to a working location (for example, your Desktop or Documents folder).
1. Open the copied file in a text editor (for example, TextEdit, VS Code, or any XML editor).
1. Edit the policy values according to your requirements:

    Example `policy.json` configuration:

    ```json
    {
      "AllowedExtensions": {"microsoft": true, "github": true},
      "UpdateMode": "start",
      "EnableFeedback": true,
      "EnableTelemetry": false
    }
    ```

    > [!IMPORTANT]
    > If there's a syntax error in the policy value, the setting will not be applied. You can check the Window log in VS Code for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**).

    **Remove unwanted policies** - remove the corresponding JSON property for any policy you don't want to enforce.

Refer to the [policy reference](#vs-code-enterprise-policy-reference) for details on each policy's accepted values and behavior.

### Step 3: Deploy the policies

You can now deploy the configured policies at scale to all relevant devices in your organization with an MDM solution. You can manually test the policies on a local machine before deploying them at scale.

<details name="deploy-policies-mac">
<summary>Deploy profiles at scale</summary>

For enterprise deployments across multiple devices, use Mobile Device Management (MDM) solutions such as:

* [Microsoft Intune](https://learn.microsoft.com/mem/intune/configuration/device-profiles)
* Apple Business Manager with MDM

For more information on configuration profiles, refer to [Apple's documentation](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac).

</details>

<details name="deploy-policies-mac">
<summary>Manually test policies on a local machine</summary>

### Configure policies manually

Follow these steps to manually test your VS Code policy configuration on a macOS device before deploying at scale:

#### Step 1: Install the configuration profile

1. Save your edited `.mobileconfig` file.
1. Double-click the `.mobileconfig` file in Finder.
1. The System Settings (or System Preferences on older macOS versions) will open.
1. Review the profile details and select **Install** (or **Continue** depending on your macOS version).
1. If prompted, authenticate with your administrator credentials.
1. Confirm the installation when prompted.

#### Step 2: Verify the profile installation

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

</details>

## Linux JSON policies

Starting from VS Code version 1.106, you can configure VS Code setting policies on Linux devices by placing a JSON policy file at `/etc/vscode/policy.json`. This approach uses a simple JSON format to define policy values.

These profiles can be deployed using Mobile Device Management (MDM) solutions or installed manually on individual devices.

### Step 1: Obtain the sample policy file

Starting from VS Code version 1.106, each release ships with a sample `.policy.json` file. You can obtain it from either an existing installation or by downloading and extracting the VS Code archive. The file is located in the `resources/app/policies` directory.

### Step 2: Configure policy values

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

1. Edit the policy values according to your requirements:

    Example `policy.json` configuration:

    ```json
    {
      "AllowedExtensions": {"microsoft": true, "github": true},
      "UpdateMode": "start",
      "EnableFeedback": true,
      "EnableTelemetry": false
    }
    ```

    > [!IMPORTANT]
    > If there's a syntax error in the policy value, the setting will not be applied. You can check the Window log in VS Code for errors (press `kb(workbench.action.showCommands)` and enter **Show Window Log**).

    **Remove unwanted policies** - remove the corresponding JSON property for any policy you don't want to enforce.

Refer to the [policy reference](#vs-code-enterprise-policy-reference) for details on each policy's accepted values and behavior.

### Step 3: Deploy the policies

You can now deploy the configured policies at scale to all relevant devices in your organization with an MDM solution. You can manually test the policies on a local machine before deploying them at scale.

<details name="deploy-policies-linux">
<summary>Deploy policies at scale</summary>

For enterprise Linux deployments across multiple devices, use configuration management tools such as Ansible, Puppet, Chef, or Salt to deploy the `policy.json` file.

These tools allow administrators to deploy, update, and remove policies remotely across all managed Linux devices in the organization.

</details>

<details name="deploy-policies-linux">
<summary>Manually test policies on a local machine</summary>

#### Step 1: Copy the policy file

1. Ensure the `/etc/vscode` directory exists:

    ```bash
    sudo mkdir -p /etc/vscode
    ```

    > [!NOTE]
    > You need root or sudo privileges to create the directory and manage policy files in `/etc/vscode`.

1. Copy the edited policy file to the `/etc/vscode/` system location:

    ```bash
    sudo cp /tmp/policy.json /etc/vscode/policy.json
    ```

    Set appropriate permissions:

    ```bash
    sudo chmod 644 /etc/vscode/policy.json
    sudo chown root:root /etc/vscode/policy.json
    ```

#### Step 2: Verify the policy installation

1. Launch VS Code (or restart it if already running).
1. Open **File** > **Preferences** > **Settings** (or press `Ctrl+,`).
1. Look for settings that correspond to your configured policies - they should show as "managed by your organization" or have a lock icon.
1. Hover over managed settings to see that they are controlled by policy.

> [!TIP]
> You can verify the policy file is being read by checking VS Code's logs or by attempting to change a managed setting (the change will be prevented).

#### Remove policies

To remove all policies and revert to default settings, delete the `/etc/vscode/policy.json` file and restart VS Code.

</details>

## Verify policy enforcement

After you deploy enterprise policies to a device, you can confirm that VS Code is reading and enforcing them with the **Developer: Policy Diagnostics** command. The command opens a new untitled Markdown document with a report of the current policy state on the device. It works the same way on Windows, macOS, and Linux.

The report includes the following sections:

* **System Information**: VS Code product name, version, and commit, useful for matching the report to a specific build.
* **Account Information**: details of the default account that is signed in, including the raw account-level policy data returned by the account provider.
* **Account Policy Gate**: state of the [approved GitHub organizations gate](/docs/enterprise/ai-settings.md#restrict-ai-features-to-approved-github-organizations) that controls AI features. Possible states are `inactive`, `satisfied`, and `restricted`. When the state is `restricted`, the report also lists a reason such as `noAccount`, `wrongProvider`, `orgNotApproved`, or `policyNotResolved`.
* **Policy-Controlled Settings**: two tables that list the policy state for each registered setting:
    * **Applied Policy**: settings that are currently overridden by a policy, with the setting key, policy name, policy source, default value, current value, and the value enforced by the policy.
    * **Non-applied Policy**: registered policies that are not currently being enforced. Use this table to detect deployment errors, such as a misspelled key or a policy file that is not being read.
* **Authentication Information**: registered authentication providers, sessions, accounts, and the extensions that have access to each account.

> [!CAUTION]
> The report can contain sensitive information such as account identifiers, session details, and the list of extensions with access to each account. Review the contents before you share the report.

> [!TIP]
> If the **Account Policy Gate** state is `policyNotResolved`, run the **Developer: Sync Account Policy** command to force a refresh of the account-side policy data, then regenerate the report.

## VS Code enterprise policy reference

The following table lists all available enterprise policies in VS Code.

| Policy<br>Setting ID | Description |
|:--|:--|
| `McpGalleryServiceUrl` | <span data-min-version="1.101">Configure the MCP Gallery service URL to connect to</span> |
| `ChatApprovedAccountOrganizations` | <span data-min-version="1.118">Setting this policy to a non-empty list activates the Approved Account gate: all AI features are disabled until the user signs into a GitHub account whose organizations intersect this list AND the account-side policy data has resolved. Comparison is case-insensitive. Use '*' as a wildcard to accept any signed-in GitHub or GHE account (use this for GHE deployments where the organization list is not surfaced).</span> |
| `ExtensionGalleryServiceUrl` | <span data-min-version="1.99">Configure the Marketplace service URL to connect to</span> |
| `AllowedExtensions`<br>`setting(extensions.allowed)` | <span data-min-version="1.96">Specify a list of extensions that are allowed to use. This helps maintain a secure and consistent development environment by restricting the use of unauthorized extensions. More information: https://aka.ms/vscode/enterprise/extensions/allowed</span> |
| `ChatToolsAutoApprove`<br>`setting(chat.tools.global.autoApprove)` | <span data-min-version="1.99">Global auto approve also known as "YOLO mode" disables manual approval completely for all tools in all workspaces, allowing the agent to act fully autonomously. This is extremely dangerous and is *never* recommended, even containerized environments like Codespaces and Dev Containers have user keys forwarded into the container that could be compromised. This feature disables critical security protections and makes it much easier for an attacker to compromise the machine. Note: This setting only controls tool approval and does not prevent the agent from asking questions. To automatically answer agent questions, use the `#chat.autoReply#` setting.</span> |
| `CopilotSessionSync`<br>`setting(chat.sessionSync.enabled)` | <span data-min-version="1.121">Enable session sync to GitHub.com for cross-device Copilot session history. When disabled by organization policy, session data is kept local only.</span> |
| `ChatToolsEligibleForAutoApproval`<br>`setting(chat.tools.eligibleForAutoApproval)` | <span data-min-version="1.107">Controls which tools are eligible for automatic approval. Tools set to 'false' will always present a confirmation and will never offer the option to auto-approve. The default behavior (or setting a tool to 'true') may result in the tool offering auto-approval options.</span> |
| `ChatMCP`<br>`setting(chat.mcp.access)` | <span data-min-version="1.99">Controls access to installed Model Context Protocol servers.</span> |
| `ChatAgentExtensionTools`<br>`setting(chat.extensionTools.enabled)` | <span data-min-version="1.99">Enable using tools contributed by third-party extensions.</span> |
| `ChatPluginsEnabled`<br>`setting(chat.plugins.enabled)` | <span data-min-version="1.116">Enable agent plugin integration in chat.</span> |
| `ChatAgentMode`<br>`setting(chat.agent.enabled)` | <span data-min-version="1.99">When enabled, agent mode can be activated from chat and tools in agentic contexts with side effects can be used.</span> |
| `ChatAgentNetworkFilter`<br>`setting(chat.agent.networkFilter)` | <span data-min-version="1.116">When enabled, network access by agent tools (fetch tool, integrated browser) is restricted according to `#chat.agent.allowedNetworkDomains#` and `#chat.agent.deniedNetworkDomains#`. Domain filtering is also applied to those tools when `#chat.agent.sandbox.enabled#` is enabled.</span> |
| `ChatAgentAllowedNetworkDomains`<br>`setting(chat.agent.allowedNetworkDomains)` | <span data-min-version="1.116">Allowed domains for network access by agent tools (fetch tool, integrated browser). Applies when `#chat.agent.networkFilter#` or `#chat.agent.sandbox.enabled#` is enabled. When `#chat.agent.sandbox.enabled#` is set to `allowNetwork`, all domains are allowed. Supports wildcards like `*.example.com`. When both allowed and denied lists are empty, all domains are blocked. Denied domains (see `#chat.agent.deniedNetworkDomains#`) take precedence.</span> |
| `ChatAgentDeniedNetworkDomains`<br>`setting(chat.agent.deniedNetworkDomains)` | <span data-min-version="1.116">Denied domains for network access by agent tools (fetch tool, integrated browser). Applies when `#chat.agent.networkFilter#` or `#chat.agent.sandbox.enabled#` is enabled. This does not apply when `#chat.agent.sandbox.enabled#` is set to `allowNetwork`. Takes precedence over `#chat.agent.allowedNetworkDomains#`. Supports wildcards like `*.example.com`.</span> |
| `DeprecatedEditModeHidden`<br>`setting(chat.editMode.hidden)` | <span data-min-version="1.112">When enabled, hides the Edit mode from the chat mode picker.</span> |
| `ChatHooks`<br>`setting(chat.useHooks)` | <span data-min-version="1.109">Controls whether chat hooks are executed at strategic points during an agent's workflow. Hooks are loaded from the files configured in `#chat.hookFilesLocations#`.</span> |
| `ChatToolsTerminalEnableAutoApprove`<br>`setting(chat.tools.terminal.enableAutoApprove)` | <span data-min-version="1.104">Controls whether to allow auto approval in the run in terminal tool.</span> |
| `ChatAgentSandboxEnabled`<br>`setting(chat.agent.sandbox.enabled)` | <span data-min-version="1.116">Controls whether agent mode uses sandboxing to restrict what tools can do. When enabled, tools like the terminal are run in a sandboxed environment to limit access to the system.</span> |
| `ChatAgentSandboxAllowUnsandboxedCommands`<br>`setting(chat.agent.sandbox.allowUnsandboxedCommands)` | <span data-min-version="1.116">Controls whether agent mode terminal commands can run outside the sandbox after user confirmation when a sandboxed command fails or when sandbox restrictions would block the command. This applies only when `#chat.agent.sandbox.enabled#` is enabled.</span> |
| `ChatAgentSandboxAutoApproveUnsandboxedCommands`<br>`setting(chat.agent.sandbox.autoApproveUnsandboxedCommands)` | <span data-min-version="1.116">Controls whether agent mode terminal commands that run outside the sandbox are auto-approved. This applies only when both `#chat.agent.sandbox.enabled#` and `#chat.agent.sandbox.allowUnsandboxedCommands#` are enabled.</span> |
| `ChatAgentSandboxAllowAutoApprove`<br>`setting(chat.agent.sandbox.allowAutoApprove)` | <span data-min-version="1.116">Controls whether agent mode terminal commands that run inside the sandbox are auto-approved. When disabled, the run in terminal tool uses the existing approval flow. This applies only when `#chat.agent.sandbox.enabled#` is enabled.</span> |
| `UpdateMode`<br>`setting(update.mode)` | <span data-min-version="1.67">Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service.</span> |
| `TelemetryLevel`<br>`setting(telemetry.telemetryLevel)` | <span data-min-version="1.99">Controls the level of telemetry.</span> |
| `EnableFeedback`<br>`setting(telemetry.feedback.enabled)` | <span data-min-version="1.99">Enable feedback mechanisms such as the issue reporter, surveys, and other feedback options.</span> |
| `BrowserChatTools`<br>`setting(workbench.browser.enableChatTools)` | <span data-min-version="1.110">When enabled, chat agents can use browser tools to open and interact with pages in the Integrated Browser.</span> |
| `CopilotNextEditSuggestions`<br>`setting(github.copilot.nextEditSuggestions.enabled)` | <span data-min-version="1.99">Whether to enable next edit suggestions (NES). NES can propose a next edit based on your recent changes.</span> |
| `CopilotReviewSelection`<br>`setting(github.copilot.chat.reviewSelection.enabled)` | <span data-min-version="1.104">Enables code review on current selection.</span> |
| `CopilotReviewAgent`<br>`setting(github.copilot.chat.reviewAgent.enabled)` | <span data-min-version="1.104">Enables the code review agent.</span> |
| `Claude3PIntegration`<br>`setting(github.copilot.chat.claudeAgent.enabled)` | <span data-min-version="1.113">Enable Claude Agent sessions in VS Code. Start and resume agentic coding sessions powered by Anthropic Claude Agent SDK directly in the editor. Uses your existing Copilot subscription.</span> |


> [!NOTE]
> If you want to enact more policies, open an issue in the [VS Code GitHub repository](https://github.com/microsoft/vscode/issues). The team will determine if there is already a corresponding setting for the behavior or if a new setting and policy should be created.
