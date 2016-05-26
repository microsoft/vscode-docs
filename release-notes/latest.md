---
Order: 12
TOCTitle: Latest
PageTitle: Visual Studio Code May 1.2.0
MetaDescription: See what is new in the Visual Studio Code May Release (1.2.0)
---

# 1.2.0 (May 2016)

Here is an overview of some of the updates contained in this release:

* TODO

Downloads: [Windows](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/VSCodeSetup-stable.exe) |
[OS X](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/VSCode-darwin-stable.zip) | Linux 64-bit [.zip](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/VSCode-linux-x64-stable.zip) [.deb](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/vscode-amd64.deb) [.rpm](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/vscode-x86_64.rpm) | Linux 32-bit [.zip](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/VSCode-linux-ia32-stable.zip) [.deb](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/vscode-i386.deb) [.rpm](https://az764295.vo.msecnd.net/stable/c212f0908f3d29933317bbc3233568fbca7944b1/vscode-i386.rpm)

## Editor

### Configure Word Based Suggestion

When a language service isn't able to compute semantic completion, VS Code defaults to word based completions. Word based completions can be disabled with the `editor.wordBasedSuggestions`-setting.

### Resizable Peek View

The peek view editor that shows for reference search and for previewing declarations can now be resized.

![Peek](images/May/peek.gif)


## Workbench

## Debugging

## Setup

## Extension Authoring

### Comparing resources

We have added a new API command that allows you to use the diff-editor on two arbitrary resources like so: `commands.executeCommand('vscode.diff', uri1, uri2)`

### Updated extension samples

There is a new rich sample that walks you through _virtual documents_, _eventing_, and using _language features as commands_. Also, the preview html sample was updated:

* [contentprovider-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/contentprovider-sample)
* [previewhtml-sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/previewhtml-sample)

## Bug Fixes

This release has a number of notable bug fixes.

* [5780](https://github.com/Microsoft/vscode/issues/5780): Come up with better external terminal defaults on Linux
* [6432](https://github.com/Microsoft/vscode/issues/6432): Ubuntu scope not setup on installation
* [1000](https://github.com/Microsoft/vscode/issues/1000): Slow response when system is offline

These are the [closed bugs](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+label%3Abug+milestone%3A%22May+2016%22+is%3Aclosed) and these are the [closed feature requests](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22May+2016%22+is%3Aclosed+label%3Afeature-request) for the 1.2.0 update.

## Thank You

Last but certainly not least, a big *__Thank You!__* to the following folks that helped to make VS Code even better:


* [rebornix (@rebornix)](https://github.com/rebornix): add touch screen tap support for reference search. [PR #6386](add touch screen tap support for reference search)
* [Ikuyadeu (@Ikuyadeu)](https://github.com/Ikuyadeu): debt reduction in suggest. [PR #6035](https://github.com/Microsoft/vscode/pull/6035) and [PR #6057](https://github.com/Microsoft/vscode/pull/6057)

