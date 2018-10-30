---
Order: 4
Area: advanced-topics
TOCTitle: Using Proposed API
PageTitle: Using Proposed API
---

# Using Proposed API

At VS Code, we take Extension API compatibility seriously. We give our best effort to avoid breaking API changes, and extension authors could expect published extensions to continue to work. However, this puts great limitation on us: once we introduce an API, we cannot change it any more.

Proposed API solves the problem for us. Proposed API is a set of unstable API that is published with each release of VS Code. They are **subject to change**, **only available in Insider distribution**  and **cannot be used in published extensions**. With these restrictions, extension authors could test the new API in local development and provide feedback for us to improve the API. Eventually, Proposed API becomes stable API and available for general use.

### Using Proposed API

These are the steps for testing Proposed API in local development:

- Use [Insiders](https://code.visualstudio.com/insiders) release of VS Code.
- Add `"enableProposedApi": true` to your `package.json`.
- Copy the latest version of the [`vscode.proposed.d.ts`](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts) into your project.

Here is a sample using Proposed API: https://github.com/Microsoft/vscode-extension-samples/tree/ext-docs/proposed-api-sample.
