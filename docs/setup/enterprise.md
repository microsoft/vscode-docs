---
Order: 8
Area: setup
TOCTitle: Enterprise
ContentId:
PageTitle: Enterprise Support
DateApproved: 06/30/2022
MetaDescription: Ensure VS Code is enterprise-ready.

---
# Enterprise Support

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compatability across your organization.

## Network: Common hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

Please refer to the [network common hostnames list](https://code.visualstudio.com/docs/setup/network#_common-hostnames).

## Group Policy on Windows

System administrators need a way to control default software settings across all client machines in their organization. Group Policy is a client solution that gives administrators flexibility to implement the behavior for each of the available policies and settings.

VS Code now has support for [Windows Registry based Group Policy](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release will ship with a `policies` directory containing ADMX template files which can be added to the following path: `C:\Windows\PolicyDefinitions`. Once the policy definitions are installed, admins can use the [Local Group Policy Editor](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to manage the policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. Whenever it is set, the policy value overrides whatever VS Code setting value may have been configured at any level (default, user, workspace, etc).

## Additional Policies

Our goal is to promote current VS Code settings as Policies and stick closely to our settings, so that the naming and behavior is consistent. If there are requests to enact more policies, please open an issue in our [GitHub repo](https://github.com/microsoft/vscode). Our team will determine if there is already corresponding setting for this behavior or if we should first create a setting to control the desired behavior.