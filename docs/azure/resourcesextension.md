---
Order: 3
Area: azure
TOCTitle: Resources View
PageTitle: Azure Resources for Visual Studio Code
ContentId: fc1e60f9-86a6-47c2-beb6-5289d21f48d1
MetaDescription: Azure Resources for Visual Studio Code
DateApproved: 5/5/2025
---
# Azure Resources for Visual Studio Code

The [Azure Resources](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups) extension allows you to seamlessly view and manage your Azure resources directly within VS Code. It also provides the ability to authenticate and manage your Azure accounts and tenants.

## How to sign in to your Azure account

The Azure Resources extension uses the built-in VS Code Microsoft authentication provider to authenticate with Azure.
Sign in by selecting the **Sign in to Azure…** item in the Azure Resources view.

![Screenshot that shows where to sign in to your Azure account](images/extensions/signInView.png)

You can also sign in using the **Azure: Sign in** command contributed by the Azure Resources extension.

![Screenshot that shows where to sign in to an Azure account from the command palette](images/extensions/signInCommandPallete.png)

## How to sign out

Sign out in the Accounts menu, located in the bottom left of your VS Code window.

![Screenshot that shows where to sign out of an Azure account](images/extensions/signOut.png)

## Filter subscriptions

You can filter the displayed subscriptions, by selecting the filter icon on any subscription.

![Screenshot that shows where to filter your subscriptions](images/extensions/filterSub.png)

The filtered subscriptions are stored in the `setting(azureResourceGroups.selectedSubscriptions)` setting.

## Accounts & Tenants view

Within the Azure Resources extension you can use the Accounts & Tenants view to manage and authenticate accounts and tenants.

![Screenshot that shows the Accounts & Tenants view](images/extensions/accountsAndTenants.png)

### Filter out tenants

You can also filter out tenants by checking and unchecking tenants. This causes subscriptions within the Resources view and subscription filter to be filtered out, based on which tenants are checked/unchecked within the tenant’s view.

<img width = "900" alt = "Accounts & Tenants view" src = "https://github.com/user-attachments/assets/d34c1f79-fb21-46f9-af3a-cbb109ba0414">

### Authenticate tenants

In the Accounts & Tenants view, you can view all tenants associated with your accounts. Many tenants require multi-factor authentication (MFA) in order to access them. Tenants that require multi-factor authentication will have a sign-in button located to the right of the tenant when hovering over the tenant.

![Screenshot that shows where to authenticate your tenants](images/extensions/authenticateTenant.png)

You can authenticate specific tenants by navigating to the Accounts & Tenants view and either selecting the sign-in button located to the right of the tenant, or by simply checking an unauthenticated tenant.

### Multi-account support

With the Accounts & Tenants view, you can sign into a new account by selecting the `+` icon in the right corner of the view.

![Screenshot that shows where to sign in to multiple Azure Accounts](images/extensions/multiAccount.png)

### Using sovereign clouds

To connect to a sovereign cloud, you can select the gear icon on the right side of the Accounts & Tenants view.

<img width = "474" alt = "Sovereign Clouds" src = "https://github.com/user-attachments/assets/d07af7a8-eab9-46db-8ab5-f386c5c78b57">

This brings up a list of sovereign clouds to choose from.

![Screenshot that shows where to connect to a sovereign cloud](images/extensions/cloudOptions.png)

Once chosen, the `setting(Microsoft-sovereign-cloud.environment)` setting is automatically set. The Resources and Accounts & Tenants view also refreshes, allowing you to sign into your sovereign cloud account.