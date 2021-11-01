---
# DO NOT TOUCH — Managed by doc writer
ContentId: f4d4e9e0-8901-405c-aaf5-faa16c32588b
DateApproved: 10/7/2021

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use Visual Studio Code's Proposed API
---

# Using Proposed API

At Visual Studio Code, we take Extension API compatibility seriously. We give our best effort to avoid breaking API changes, and extension authors could expect published extensions to continue to work. However, this puts great limitation on us: once we introduce an API, we cannot easily change it any more.

Proposed API solves the problem for us. Proposed API is a set of unstable API that are implemented in VS Code but not exposed to the public as stable API does. They are **subject to change**, **only available in Insiders distribution** and **cannot be used in published extensions**. Nevertheless, extension authors could test these new API in local development and provide feedback for VS Code team to iterate on the API. Eventually, Proposed API finds their way into the stable API and becomes available for all extensions.

## Using a proposed API

These are the steps for testing Proposed API in local extension development:

- Use [Insiders](/insiders) release of VS Code.
- Add `"enableProposedApi": true` to your `package.json`.
- Copy the latest version of the [vscode.proposed.d.ts](https://github.com/microsoft/vscode/blob/main/src/vs/vscode.proposed.d.ts) into your project's source location.

The [vscode-dts](https://github.com/microsoft/vscode-dts) CLI utility allows you to quickly download latest `vscode.proposed.d.ts` for extension development.

```bash
> npx vscode-dts dev
Downloading vscode.proposed.d.ts to /Users/username/Code/vscode-docs/vscode.proposed.d.ts
Please set "enableProposedApi": true in package.json.
Read more about proposed API at: https://code.visualstudio.com/api/advanced-topics/using-proposed-api
```

Here is a pre-configured sample using proposed API: [proposed-api-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/proposed-api-sample).

## Proposed API incompatibility

On the main branch, the `vscode.proposed.d.ts` is always compatible with `vscode.d.ts`. However, when you add `vscode.proposed.d.ts` to your project that uses `@types/vscode`, the latest `vscode.proposed.d.ts` might be incompatible with the version in `@types/vscode`.

You can solve this issue by either:

- Remove dependency on `@types/vscode` and use `npx vscode-dts main` to download `vscode.d.ts` from `microsoft/vscode` main branch.
- Use `@types/vscode@<version>` and also use `npx vscode-dts dev <version>` to download the `vscode.proposed.d.ts` from an old branch of `microsoft/vscode`. However, be careful the API might have changed in the latest version of VS Code Insiders.

## Sharing extensions using the Proposed API

While you're not able to publish extensions using the Proposed API on the Marketplace, you can still share your extension with your peers by packaging and sharing your extension.

To package your extension, you can run `vsce package` to create a VSIX file of your extension. You can then share this VSIX file to others to install the extension in their VS Code.

To install an extension from a VSIX file, you would go into the Extensions view, select the **...** ellipsis **View and More Actions** button, and select **Install from VSIX**.

Selecting the **Install from VSIX** menu item is shown in the short video below.

![Demo showing a user going into the Extensions view to find the Install from VSIX menu item](images/proposed-api/install-from-vsix.gif)

For extensions using the Proposed API, there are a couple more steps to enable your extension. After installing from your VSIX, you need to quit and relaunch VS Code Insiders from command line with `code-insiders . --enable-proposed-api=<YOUR-EXTENSION-ID>` in your project folder.

If you'd like to set it so that your extension using the Proposed API is always available to use on every launch of VS Code Insiders, you can run the **Preferences: Configure Runtime Arguments** command to edit the `.vscode-insiders/argv.json` file to set a list of enabled extensions.

```json
{
    ...
    "enable-proposed-api": ["<YOUR-EXTENSION-ID>"]
}
```
