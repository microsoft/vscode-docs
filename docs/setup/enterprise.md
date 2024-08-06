---
Order: 8
Area: setup
TOCTitle: Enterprise
ContentId: 936ab8e0-3bbe-4842-bb17-ea314665c20a
PageTitle: Visual Studio Code enterprise support
DateApproved: 08/01/2024
MetaDescription: Learn about Visual Studio Code's enterprise support features.

---
# Enterprise Support

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compatibility across your organization.

## Network: Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

Refer to the [network common hostnames list](/docs/setup/network.md#common-hostnames) for the required domains.

## Group Policy on Windows

System administrators need a way to control default software settings across all client machines in their organization. Group Policy is a client solution that gives administrators flexibility to implement the behavior for each of the available policies and settings.

VS Code now has support for [Windows Registry-based Group Policy](https://learn.microsoft.com/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release will ship with a `policies` directory containing ADMX template files that can be added to the following path: `C:\Windows\PolicyDefinitions`.

Once the policy definitions are installed, admins can use the [Local Group Policy Editor](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to manage the policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. When a policy value is set, the value overrides the VS Code [setting](/docs/getstarted/settings.md) value configured at any level (default, user, workspace, etc.).

## Additional Policies

The goal is to promote current VS Code settings as Policies and closely follow existing settings, so that the naming and behavior are consistent. If there are requests to enact more policies, please open an issue in the VS Code [GitHub repository](https://github.com/microsoft/vscode). The team will determine if there is already a corresponding setting for the behavior or if a new setting should be created to control the desired behavior.
