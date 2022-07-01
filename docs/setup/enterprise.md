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

## Specific hostnames

A handful of features within VS Code require network communication to work, such as the auto-update mechanism, querying and installing extensions, and telemetry. For these features to work properly in a proxy environment, you must have the product correctly configured.

If you are behind a firewall that needs to allow specific domains used by VS Code, here's the list of hostnames you should allow communication to go through:

* `update.code.visualstudio.com` - Visual Studio Code download and update server
* `code.visualstudio.com` - Visual Studio Code documentation
* `go.microsoft.com` - Microsoft link forwarding service
* `vscode.blob.core.windows.net` - Visual Studio Code blob storage, used for remote server
* `marketplace.visualstudio.com` - Visual Studio Marketplace
* `*.gallery.vsassets.io` - Visual Studio Marketplace
* `*.gallerycdn.vsassets.io` - Visual Studio Marketplace
* `rink.hockeyapp.net` - Crash reporting service
* `bingsettingssearch.trafficmanager.net` - In-product settings search
* `vscode.search.windows.net` - In-product settings search
* `raw.githubusercontent.com` - GitHub repository raw file access
* `vsmarketplacebadge.apphb.com` - Visual Studio Marketplace badge service
* `az764295.vo.msecnd.net` - Visual Studio Code download CDN
* `download.visualstudio.microsoft.com` - Visual Studio download server, provides dependencies for some VS Code extensions (C++, C#)
* `vscode-sync.trafficmanager.net` - Visual Studio Code Settings Sync service
* `vscode-sync-insiders.trafficmanager.net` - Visual Studio Code Settings Sync service (Insiders)
* `vscode.dev` - Used when logging in with GitHub or Microsoft for an extension or Settings Sync
* `default.exp-tas.com` - Visual Studio Code Experiment Service, used to provide experimental user experiences

# Group Policy on Windows

System administrators need a way to control default software settings across all client machines in their organization. Group Policy is a client solution that gives administrators flexibility to implement the behavior for each of the available policies and settings.

VS Code now has support for [registry-based Group Policy](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/policy/implementing-registry-based-policy). Starting from VS Code version 1.69, each release will ship with ADMX template files which can be added to the path: `HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\CodeOSS`. Admins can use the [Local Group Policy Editor](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn265982(v=ws.11)) to read and update these files with different policy values.

Policies can be set both at the Computer level and the User level. If both are set, Computer level will take precedence. Whenever it is set, the policy overrides whatever VS Code setting value may have been configured at any level (default, user, workspace, etc).


# Policies

| Policy Name      | Description | Type | Default |
| ----------- | ----------- | ----------- | -----------
| UpdateMode      | Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service.        |  `REG_EXPAND_SZ `  | "Automatic" |

# Additional Policies

Our goal is to promote current VS Code settings as Policies and stick closely to our settings, so that the naming and behavior is consistent. If there are requests to enact more policies, please open an issue in our [GitHub repo](https://github.com/microsoft/vscode) with the `group-policy` label. Our team will determine if there is already corresponding setting for this behavior or if we should first create a setting to control the desired behavior.