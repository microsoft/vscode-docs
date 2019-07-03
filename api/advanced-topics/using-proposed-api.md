---
# DO NOT TOUCH — Managed by doc writer
ContentId: f4d4e9e0-8901-405c-aaf5-faa16c32588b
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use Visual Studio Code's Proposed API
---

# Using Proposed API

At Visual Studio Code, we take Extension API compatibility seriously. We give our best effort to avoid breaking API changes, and extension authors could expect published extensions to continue to work. However, this puts great limitation on us: once we introduce an API, we cannot easily change it any more.

Proposed API solves the problem for us. Proposed API is a set of unstable API that are implemented in VS Code but not exposed to the public as stable API does. They are **subject to change**, **only available in Insider distribution** and **cannot be used in published extensions**. Nevertheless, extension authors could test these new API in local development and provide feedback for VS Code team to iterate on the API. Eventually, Proposed API finds their way into the stable API and becomes available for general use.

## Using Proposed API

These are the steps for testing Proposed API in local extension development:

- Use [Insiders](/insiders) release of VS Code.
- Add `"enableProposedApi": true` to your `package.json`.
- Copy the latest version of the [`vscode.proposed.d.ts`](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts) into your project.

We now provide [vscode-dts](https://github.com/microsoft/vscode-dts) module that allows you to quickly download latest `vscode.proposed.d.ts` for development.

```bash
> npx vscode-dts dev
Downloading vscode.proposed.d.ts to /Users/pine/Code/vscode-docs/vscode.proposed.d.ts
Please set "enableProposedApi": true in package.json.
Read more about proposed API at: https://code.visualstudio.com/api/advanced-topics/using-proposed-api
```