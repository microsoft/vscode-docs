---
ContentId: 44aa6759-14dd-41ba-b48c-dc5ba3a6e8de
DateApproved: 6/6/2023
MetaDescription: Signing in to C# Dev Kit
---
# Signing in to C# Dev Kit

In this article, you'll learn:

* How to [sign in](#sign-in-with-a-microsoft-or-organizational-account) with an account.
* How to check the [status of your Visual Studio subscription](#verifying-your-visual-studio-subscription-status).
* How to [sign out of your account](#how-to-sign-out).
* How to [troubleshoot sign in issues](#troubleshoot-sign-in-issues).

You can also get [subscription support](https://visualstudio.microsoft.com/subscriptions/support/) and can search the FAQ to find answers to common support questions about subscriptions, accounts, and billing.

## Sign in with a Microsoft or organizational account

1. Launch Visual Studio Code.  When the C# Dev Kit extension is activated for the first time, you'll be asked to sign in via a toast notification.

  ![Sign-in notification](images/signing-in/sign-in-notification.png)

  Alternatively, you can also go to the **Accounts** button in the Activity bar to sign in.

  ![Sign-in with the Account button](images/signing-in/account-button-sign-in.png)

2. Once you start the sign in process, the browser will open, and you'll be able to use your Microsoft or your organizational (Work or School) account to sign in.

>**Note**: While sign in is not required or enforced by the extension, you might need to sign in using your Visual Studio account to comply with the EULA requirements for the C# Dev Kit extension.

## Verifying your Visual Studio subscription status

After you sign in to use the C# Dev Kit extension, the Status bar icon might change depending on the status of the Visual Studio subscription associated with the account. If you haven't signed in or sign in using an account that does not contain a valid Visual Studio subscription, you'll see the following icon and tooltip message on the icon:

![Invalid Visual Studio subscription](images/signing-in/no-subscription-found.png)

If you sign in with an account that has a valid Visual Studio subscription, the Status bar icon and its associated tooltip will change as follows:

![Successful Visual Studio subscription sign-in](images/signing-in/valid-vs-subscription.png)

You can also view your Visual Studio subscription information by clicking on the Status bar icon.

![Visual Studio subscription information](images/signing-in/subscription-status.png)

>**Note**: Using the C# Dev Kit extension on a Microsoft Dev Box or GitHub Codespace environment will automatically grant you with entitlements for C# Dev Kit regardless of the sign in status.

## How to sign out

You can sign out by going to the **Accounts** button in the Activity bar. Once there, select the desired account and select sign out.

![Sign out of Visual Studio subscription](images/signing-in/sign-out.png)

## Troubleshoot sign in issues

### Unable to retrieve a license

If you are not able to retrieve a license after a successful sign in operation, you'll likely need to modify your firewall settings by adding the URL below to its allowlist:

`https://api.subscriptions.visualstudio.microsoft.com/Me/Entitlements/IDEBenefits`
