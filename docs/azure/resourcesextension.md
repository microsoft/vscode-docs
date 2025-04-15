# Azure Resources for Visual Studio Code

The Azure Resources Extension allows you to seamlessly view and manage your Azure resources directly within VS Code. It also provides the ability to authenticate and manage your Azure accounts and tenants.

## How to Sign in to your Azure Account

The Azure Resources extension uses the built-in VS Code Microsoft authentication provider to authenticate with Azure.
Sign in by selecting the “Sign in to Azure…” item in the Azure Resources view.

![signInView](images/extensions/signInView.png)

You can also sign in using the “Azure: Sign in” command contributed by the Azure Resources extension.

![signInCommand](images/extensions/signInCommandPallete.png)

## How to Sign Out

Sign out in the Accounts menu located in the bottom left of your VS Code window.

![signOut](images/extensions/signOut.png)

## Filter Subscriptions

You can filter the displayed subscriptions, by selecting the Filter icon on any subscription.

![filterSubscription](images/extensions/filterSub.png)

The filtered subscriptions are stored in the `azureResourceGroups.selectedSubscriptions` setting.

## Accounts & Tenants view

Within the Azure Resources extension users can use the Accounts & Tenants view to manage and authenticate accounts and tenants.

![accountsAndTenants](images/extensions/accountsAndTenants.png)

### Filter out Tenants

Users can also filter out tenants by checking and unchecking tenants. This will cause subscriptions within the Resources view and subscription filter will be filtered out based on which tenants are checked/unchecked within the tenant’s view.

<img width = "900" alt = "Accounts & Tenants view" src = "https://github.com/user-attachments/assets/d34c1f79-fb21-46f9-af3a-cbb109ba0414">

### Authenticate Tenants

In the Accounts & Tenants view, users can view all tenants associated with their accounts. Many tenants require multi-factor authentication (MFA) in order to access them. Tenants that require multi-factor authentication will have a sign-in button located to the right of the tenant when hovering over the tenant.

![authenticateTenant](images/extensions/authenticateTenant.png)

Users can authenticate specific tenants by navigating to the Accounts & Tenant’s view and either clicking the sign-in button located to the right of the tenant or by simply checking an unauthenticated tenant.

### Multi-Account Support

With the Accounts & Tenants view, users can sign into a new account by clicking the + icon in the right corner of the view.

![multiAccount](images/extensions/multiAccount.png)

### Using Sovereign Clouds

To connect to a sovereign cloud users can click the gear icon on the right side of the tenants view.

<img width = "400" alt = "Sovereign Clouds" src = "https://github.com/user-attachments/assets/d07af7a8-eab9-46db-8ab5-f386c5c78b57">

This will bring up a list of sovereign clouds to choose from.

![cloudOptions](images/extensions/cloudOptions.png)

Once chosen the `Microsoft-sovereign-cloud.environment` setting will automatically be set. The Resources and Accounts & Tenants view will also refresh, allowing users to sign into their sovereign cloud account.