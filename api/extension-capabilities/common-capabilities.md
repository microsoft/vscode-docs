---
Order: 2
Area: extension-capabilities
TOCTitle: Common Capabilities
PageTitle: Common Capabilities
---

# Common Capabilities of Extensions

This page should have a few short paragraphs that talks about common capabilities that extensions could use, for example:

- Using commands
- Showing information messages
- Persist data between extension activations
- Contribute Context Menu items
- Contribute configurations
- Progress API

## Progress API

[`Progress`](/api/references/vscode-api#Progress) is used for reporting progress updates to the user.

Progress can be shown in different locations using the [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) option:

- In the notifications area
- In the source control view
- General progress in the VS Code window

A sample extension that uses the Progress API can be found [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/progress-sample).
