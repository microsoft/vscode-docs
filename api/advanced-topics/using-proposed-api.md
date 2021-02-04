---
# DO NOT TOUCH — Managed by doc writer
ContentId: f4d4e9e0-8901-405c-aaf5-faa16c32588b
DateApproved: 2/4/2020

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
- Copy the latest version of the [vscode.proposed.d.ts](https://github.com/microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts) into your project's source location.

The [vscode-dts](https://github.com/microsoft/vscode-dts) CLI utility allows you to quickly download latest `vscode.proposed.d.ts` for extension development.

```bash
> npx vscode-dts dev
Downloading vscode.proposed.d.ts to /Users/username/Code/vscode-docs/vscode.proposed.d.ts
Please set "enableProposedApi": true in package.json.
Read more about proposed API at: https://code.visualstudio.com/api/advanced-topics/using-proposed-api
```

Here is a pre-configured sample using proposed API: [proposed-api-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/proposed-api-sample).

## Proposed API incompatibility

On the master branch, the `vscode.proposed.d.ts` is always compatible with `vscode.d.ts`. However, when you add `vscode.proposed.d.ts` to your project that uses `@types/vscode`, the latest `vscode.proposed.d.ts` might be incompatible with the version in `@types/vscode`.

You can solve this issue by either:

- Remove dependency on `@types/vscode` and use `npx vscode-dts master` to download `vscode.d.ts` from `microsoft/vscode` master branch.
- Use `@types/vscode@<version>` and also use `npx vscode-dts dev <version>` to download the `vscode.proposed.d.ts` from an old branch of `microsoft/vscode`. However, be careful the API might have changed in the latest version of VS Code Insiders.
