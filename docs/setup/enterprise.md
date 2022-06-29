---
Order: 8
Area: setup
TOCTitle: Enterprise
ContentId:
PageTitle: Group Policy
DateApproved: 06/29/2022
MetaDescription: Use Group Policy to configure VS Code.

---
# Group Policy on Windows

System administrators need a way to control default software settings in order to achieve consistency across all client machines in their organization. Group Policy is a client solution that gives administrators flexibility to implement the behavior for each of the available policies and settings.

VS Code now has support for [registry-based Group Policy](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release will ship with ADMX template files which can be added to the path: `HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\CodeOSS`. Admins can use the [Local Group Policy Editor](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to read and update these files with different policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. Whenever it is set, the policy overrides whatever VS Code setting value may have been configured at any level (default, user, workspace, etc).


# Policies

| Policy Name      | Description | Type | Default |
| ----------- | ----------- | ----------- | -----------
| UpdateMode      | Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service.        |  `REG_EXPAND_SZ `  | "Automatic" |

# Additional Policies

Our goal is to promote current VS Code settings as Policies and stick closely to our settings, so that the naming and behavior is consistent. If there are requests to enact more policies, please open an issue in our [GitHub repo](https://github.com/microsoft/vscode) with the `group-policy` label. Our team will determine if there is already corresponding setting for this behavior or if we should first create a setting to control the desired behavior.