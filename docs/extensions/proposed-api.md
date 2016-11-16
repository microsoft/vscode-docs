---
Order: 6
Area: extensions
TOCTitle: Proposed API
ContentId: A8CBE8D6-1FEE-47BF-B81E-D79FA0DB5D03
PageTitle: Using Proposed API in Visual Studio Code
DateApproved: 11/2/2016
MetaDescription: Learn how to use Proposed API to develop extension for Visual Studio Code.
---

# Proposed API

Proposed API includes experimental APIs that is under active development.  Because of its experimental nature, you should be aware of the following restrictions:

- **Any Proposed API is subject to change and removal without notice.**
- **Proposed API is only exposed for extension development. Packaged extensions using Proposed API won't run.**

With that being said, by developing with Proposed API, extension authors can get a sneak-peek of new APIs that are likely to be added.  Playing with Proposed API is also an excellent way to get involved in the development of VS Code.  By adapting extensions to Proposed API, you can see how your extensions would take advantage of future APIs and provide feedback to influence the development of the API.

## Developing Extension using Proposed API

All Proposed API is available at https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts.

To use it, you need to:

- Use `yo code` to generate a normal extension 
- Download the `vscode.proposed.d.ts` file into `typings/vscode.proposed.d.ts`
- Add `"enableProposedApi": true` to package.json

As Proposed API is not yet finalized, documentation for using Proposed API is coupled with extension samples and available at [Microsoft/vscode-extension-samples](https://github.com/Microsoft/vscode-extension-samples) repository.

## List of Proposed API

### Custom Tree Explorer

- Sample: [Dependency Tree Explorer](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-explorer-sample)
- Usage: https://github.com/Microsoft/vscode-extension-samples/blob/master/tree-explorer-sample/USAGE.md
- Related GitHub issue: [Improvement for Tree Explorer API](https://github.com/Microsoft/vscode/issues/15485)
