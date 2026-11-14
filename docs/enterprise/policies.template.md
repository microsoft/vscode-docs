---
# DO NOT TOUCH — Managed by doc writer
ContentId: 200bf922-3684-45ee-a8dd-43191d6b3f8b
DateApproved: 11/11/2026

VSCodeCommitHash: 142e5584a76358bbb4fb687d8a0d2f4e859a6767
VSCodeVersion: 1.146.0

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Deploy and verify enterprise policies for {% data variables.product.prodname_vscode %} on managed Windows, macOS, and Linux devices.
---

# Centrally manage {% data variables.product.prodname_vscode_shortname %} settings with policies

Enterprise policies in {% data variables.product.prodname_vscode %} enable organizations to centrally manage {% data variables.product.prodname_vscode_shortname %} settings for their development teams to ensure consistency and compatibility across their organization. When a policy value is set, the value overrides the {% data variables.product.prodname_vscode_shortname %} setting value configured at any level (default, user, and workspace).

IT admins can deploy and enforce specific {% data variables.product.prodname_vscode_shortname %} configurations on users' devices through different device management solutions. {% data variables.product.prodname_vscode_shortname %} supports applying policies on Windows, macOS, and Linux.

![Screenshot showing that the 'Extensions: Allowed' setting is managed by the organization.](images/policies/allowed-extensions-managed-by-organization.png)

In this article, you learn which enterprise policies are available in {% data variables.product.prodname_vscode_shortname %} and how to configure them on different operating systems.

Choose policy values by following the guidance for [extensions](/docs/enterprise/extensions.md), [AI features](/docs/enterprise/manage-ai-settings.md), [telemetry](/docs/enterprise/telemetry.md), and [updates](/docs/enterprise/updates.md). For AI controls, also review [precedence and management scope](/docs/enterprise/manage-ai-settings.md#understand-precedence).

> [!IMPORTANT]
> Sample policy files are configuration examples, not a recommended organizational baseline. Before deployment, remove policies you don't intend to enforce and verify the remaining values on a test device.

## Windows group policies

{% data variables.product.prodname_vscode_shortname %} has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy).

You can deploy policies through Active Directory Group Policy or a device management solution such as Microsoft Intune. Use the Local Group Policy Editor to test policies on an individual device.

### Step 1: Obtain the sample ADMX and ADML files

Starting from {% data variables.product.prodname_vscode_shortname %} version 1.69, each release ships with a `policies` directory containing ADMX template files that define the available policies.

You can get the ADMX and ADML files from either an existing installation or by downloading and extracting the {% data variables.product.prodname_vscode_shortname %} zip archive. Follow these steps to obtain the files:

1. Download the [{% data variables.product.prodname_vscode_shortname %} zip archive](/download) for your version of {% data variables.product.prodname_vscode_shortname %}.
1. Extract the zip file to a temporary location.
1. Navigate to the `policies` folder in the extracted files. This folder contains the ADMX template file (for example, `VSCode.admx`) and a folder for each language, such as `en-us`, with the ADML file for that language.

### Step 2: Install or import the policy templates

Make the templates available to your management tool before configuring values:

* For Active Directory environments, copy the ADMX and language-specific ADML files to the [Central Store](https://learn.microsoft.com/troubleshoot/windows-client/group-policy/create-and-manage-central-store).
* For cloud-managed devices, import the ADMX and ADML files into your management solution, then configure and assign the imported administrative template policies.
* For a local test, install the files as described below.

<details>
<summary>Install templates for a local test</summary>

1. Copy the `VSCode.admx` file to `C:\Windows\PolicyDefinitions`.
1. Copy the ADML file from the folder for your language (for example, `en-us\VSCode.adml`) to `C:\Windows\PolicyDefinitions\<your-locale>` (for example, `C:\Windows\PolicyDefinitions\en-US`).

> [!NOTE]
> You need administrator privileges to copy files to the `PolicyDefinitions` directory and a Windows edition that includes the Local Group Policy Editor.

</details>

### Step 3: Configure policy values

For a domain deployment, edit the Group Policy Object that applies to your target devices or users. For a local test, run `gpedit.msc` to open the Local Group Policy Editor.

The policies are grouped by feature under:

* **Computer Configuration** > **Administrative Templates** > **{% data variables.product.prodname_vscode %}**
* **User Configuration** > **Administrative Templates** > **{% data variables.product.prodname_vscode %}**

> [!TIP]
> Computer-level policies take precedence over user-level policies when both are configured.

For example, to turn off {% data variables.product.prodname_vscode %}'s auto-update:

1. Under **{% data variables.product.prodname_vscode %}**, open **Update** and then **UpdateMode**.
1. Select **Enabled**, then choose `none` in the policy's value dropdown.
1. Select **OK** to save the changes.

For a Boolean policy, select **Enabled** and use the checkbox in the policy's options to set its value to `true` or `false`. The policy's **Enabled** state means that its configured value is enforced; it is not the value itself. Use **Not Configured** when you don't want the Group Policy Object to enforce that policy.

Configured values are written under `Software\Policies\Microsoft\VSCode` in the machine or user registry hive, depending on the scope you chose.

### Step 4: Deploy and verify the policies

Apply the Group Policy Object or assign the policy configuration through your device management solution to a test group first. After the device receives the configuration, restart {% data variables.product.prodname_vscode_shortname %} and follow [Verify policy enforcement](#verify-policy-enforcement).

For the `UpdateMode` example, confirm that the report lists `UpdateMode` with the value `none` and that the application's updater is disabled. This policy does not control [package-manager or extension updates](/docs/enterprise/updates.md#update-policy).

## macOS configuration profiles

Configuration profiles manage settings on macOS devices. A profile is an XML file (`.mobileconfig`) with key/value pairs that correspond to available policies.

These profiles can be deployed using Mobile Device Management (MDM) solutions or installed manually on individual devices.

### Step 1: Obtain the sample configuration profile

Starting from {% data variables.product.prodname_vscode_shortname %} version 1.99, each release ships with a sample `.mobileconfig` file. Follow these steps to locate the sample file on a macOS device with {% data variables.product.prodname_vscode_shortname %} installed:

1. Open Finder and navigate to `/Applications`.
1. Right-click on **{% data variables.product.prodname_vscode %}.app** (or your {% data variables.product.prodname_vscode_shortname %} variant) and select **Show Package Contents**.
1. Navigate to `Contents/Resources/app/policies`.
1. Locate the file with the `.mobileconfig` extension.

### Step 2: Configure policy values

1. Copy the sample `.mobileconfig` file to a working location (for example, your Desktop or Documents folder).
1. Open the copied file in a text editor (for example, TextEdit, {% data variables.product.prodname_vscode_shortname %}, or any XML editor).
1. Find the application payload dictionary inside the `PayloadContent` array. Replace the corresponding policy entries with the values you want to enforce. For example:

    ```xml
    <key>AllowedExtensions</key>
    <string>{"microsoft": true, "github": true}</string>
    <key>UpdateMode</key>
    <string>start</string>
    <key>EnableFeedback</key>
    <true/>
    <key>TelemetryLevel</key>
    <string>off</string>
    ```

    This is a fragment of the application payload, not a complete configuration profile. Keep the profile's metadata and enclosing XML structure. Object-valued policies such as `AllowedExtensions` use JSON encoded inside an XML `<string>` element.

1. Remove the `<key>` element and its associated value for each policy you don't want to enforce. Don't add duplicate entries for a policy.
1. Save the `.mobileconfig` file.

> [!IMPORTANT]
> Check both the profile's XML syntax and any JSON-encoded policy values before deployment. If a value isn't applied, run **Developer: Policy Diagnostics** and check the Window log for errors by running **Developer: Show Logs** and selecting **Window**.

### Step 3: Deploy the policies

You can now deploy the configured policies at scale to all relevant devices in your organization with an MDM solution. You can manually test the policies on a local machine before deploying them at scale.

<details name="deploy-policies-mac">
<summary>Deploy profiles at scale</summary>

For enterprise deployments across multiple devices, use Mobile Device Management (MDM) solutions such as:

* [Microsoft Intune](https://learn.microsoft.com/mem/intune/configuration/device-profiles)
* Apple Business Manager with MDM

For installation and removal steps for your macOS version, refer to [Apple's configuration profile documentation](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac).

</details>

<details name="deploy-policies-mac">
<summary>Manually test policies on a local machine</summary>

### Configure policies manually

Follow these steps to manually test your {% data variables.product.prodname_vscode_shortname %} policy configuration on a macOS device before deploying at scale:

#### Step 1: Install the configuration profile

1. Save your edited `.mobileconfig` file.
1. Double-click the `.mobileconfig` file in Finder.
1. Open **System Settings** > **General** > **Device Management**. On older macOS versions, find **Profiles** in System Settings or System Preferences.
1. Open the downloaded profile, review its details, and follow the prompts to install it.
1. If prompted, authenticate with your administrator credentials.
1. Confirm the installation when prompted.

#### Step 2: Verify the profile installation

1. Open **System Settings** > **General** > **Device Management**, or **Profiles** on older macOS versions.
1. Verify that your {% data variables.product.prodname_vscode_shortname %} configuration profile appears in the list.
1. Restart {% data variables.product.prodname_vscode_shortname %} and follow [Verify policy enforcement](#verify-policy-enforcement). For the example above, confirm that `TelemetryLevel` is `off` and `UpdateMode` is `start`.

> [!NOTE]
> Policies take effect immediately for new {% data variables.product.prodname_vscode_shortname %} instances. You may need to restart {% data variables.product.prodname_vscode_shortname %} if it's already running.

#### Remove a configuration profile

To remove a manually installed test profile:

1. Open **System Settings** > **General** > **Device Management**, or **Profiles** on older macOS versions.
1. Select the {% data variables.product.prodname_vscode_shortname %} configuration profile.
1. Select the **Remove** (or **-**) button.
1. Authenticate with your administrator credentials to confirm removal.

For profiles deployed through device management, remove the assignment through that management solution. Removing a profile stops it from enforcing its values; other policies and user settings can still apply.

</details>

## Linux JSON policies

Starting from {% data variables.product.prodname_vscode_shortname %} version 1.106, you can configure {% data variables.product.prodname_vscode_shortname %} setting policies on Linux devices by placing a JSON policy file at `/etc/vscode/policy.json`. This approach uses a simple JSON format to define policy values.

Deploy the file through your configuration management solution or install it manually on a test device.

### Step 1: Obtain the sample policy file

Starting from {% data variables.product.prodname_vscode_shortname %} version 1.106, each release ships with a sample `policy.json` file. You can obtain it from either an existing installation or by downloading and extracting the {% data variables.product.prodname_vscode_shortname %} archive. The file is located in the `resources/app/policies` directory.

### Step 2: Configure policy values

1. Copy the sample `policy.json` file to a working location. For a package installation under `/usr/share/code`, run:

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
      "TelemetryLevel": "off"
    }
    ```

    > [!IMPORTANT]
    > If there's a syntax error in the policy value, the setting will not be applied. Run **Developer: Show Logs** from the Command Palette (`kb(workbench.action.showCommands)`), select **Window**, and check for errors.

1. Remove the corresponding JSON property for each policy you don't want to enforce.

Use policy names such as `TelemetryLevel`, not editor setting IDs such as `telemetry.telemetryLevel`, as the top-level keys.

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

1. Launch {% data variables.product.prodname_vscode_shortname %} (or restart it if already running).
1. Follow [Verify policy enforcement](#verify-policy-enforcement). For the example above, confirm that `TelemetryLevel` is `off` and `UpdateMode` is `start`.
1. Open Settings (`kb(workbench.action.openSettings)`) and check that the corresponding settings are managed by your organization.

> [!TIP]
> You can verify the policy file is being read by checking {% data variables.product.prodname_vscode_shortname %}'s logs or by attempting to change a managed setting (the change will be prevented).

#### Remove policies

To remove the policies delivered through this file, delete `/etc/vscode/policy.json` and restart {% data variables.product.prodname_vscode_shortname %}. Other policy sources and user settings can still apply.

</details>

## Verify policy enforcement

After you deploy enterprise policies to a device, you can confirm that {% data variables.product.prodname_vscode_shortname %} is reading and enforcing them with the **Developer: Policy Diagnostics** command. The command opens a new untitled Markdown document with a report of the current policy state on the device. It works the same way on Windows, macOS, and Linux.

The report includes the following sections:

* **System Information**: {% data variables.product.prodname_vscode_shortname %} product name, version, and commit, useful for matching the report to a specific build.
* **Account Information**: details of the default account that is signed in, including the raw account-level policy data returned by the account provider.
* **Account Policy Gate**: state of the [approved GitHub organizations gate](/docs/enterprise/manage-ai-settings.md#restrict-ai-features-to-approved-github-organizations) that controls AI features. Possible states are `inactive`, `satisfied`, and `restricted`. When the state is `restricted`, the report also lists a reason such as `noAccount`, `wrongProvider`, `orgNotApproved`, or `policyNotResolved`.
* **Policy-Controlled Settings**: two tables that list the policy state for each registered setting:
    * **Applied Policy**: settings that are currently overridden by a policy, with the setting key, policy name, policy source, default value, current value, and the value enforced by the policy.
    * **Non-applied Policy**: registered policies that are not currently being enforced. Use this table to detect deployment errors, such as a misspelled key or a policy file that is not being read.
* **Authentication Information**: registered authentication providers, sessions, accounts, and the extensions that have access to each account.

> [!CAUTION]
> The report can contain sensitive information such as account identifiers, session details, and the list of extensions with access to each account. Review the contents before you share the report.

> [!TIP]
> If the **Account Policy Gate** state is `policyNotResolved`, run the **Developer: Sync Account Policy** command to force a refresh of the account-side policy data, then regenerate the report.

## {% data variables.product.prodname_vscode_shortname %} enterprise policy reference

The following table lists all available enterprise policies in {% data variables.product.prodname_vscode_shortname %}.

For deployment values and examples, use the [extension](/docs/enterprise/extensions.md), [AI](/docs/enterprise/manage-ai-settings.md), [telemetry](/docs/enterprise/telemetry.md), and [update](/docs/enterprise/updates.md) guides. AI policy behavior can differ by harness; review the [device-policy limitations](/docs/enterprise/manage-ai-settings.md#use-vs-code-device-policies) before relying on a control.

{$ Content $}

> [!NOTE]
> If you want to enact more policies, open an issue in the [{% data variables.product.prodname_vscode_shortname %} GitHub repository](https://github.com/microsoft/vscode/issues). The team will determine if there is already a corresponding setting for the behavior or if a new setting and policy should be created.
