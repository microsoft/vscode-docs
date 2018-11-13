---
Order: 5
Area: advanced-topics
TOCTitle: Using Proposed API
PageTitle: Using Proposed API
---

# Using Proposed API

At VS Code, we take Extension API compatibility seriously. We give our best effort to avoid breaking API changes, and extension authors could expect published extensions to continue to work. However, this puts great limitation on us: once we introduce an API, we cannot easily change it any more.

Proposed API solves the problem for us. Proposed API is a set of unstable API that are implemented in VS Code but not exposed to the public as stable API does. They are **subject to change**, **only available in Insider distribution**  and **cannot be used in published extensions**. Nevertheless, extension authors could test these new API in local development and provide feedback for VS Code team to iterate on the API. Eventually, Proposed API finds their way into the stable API and becomes available for general use.

### Using Proposed API

These are the steps for testing Proposed API in local development:

- Use [Insiders](https://code.visualstudio.com/insiders) release of VS Code.
- Add `"enableProposedApi": true` to your `package.json`.
- Copy the latest version of the [`vscode.proposed.d.ts`](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts) into your project.
