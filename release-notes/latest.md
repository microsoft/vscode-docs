---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code January 0.10.7
MetaDescription: See what is new in the Visual Studio Code January Release (0.10.7)
---

# 0.10.7 (January 2016)

Hi,

We're back from the holidays and have been busy with a new update of Visual Studio Code.

These release notes only capture what's new in the core of Visual Studio Code. Do not forget to check out the [marketplace](https://marketplace.visualstudio.com/#VSCode) for new extensions.

## Hide the Menu Bar (Windows, Linux)

We added a new action to hide the menu bar on Windows and Linux (`View | Toggle Menu Bar`). You can still access the menu pressing the `Alt` key.

## Auto Save

VS Code always supported to automatically save dirty files after one second (`File | Auto Save`). We received lots of feedback that users want to have ore control over
when Code should automatically save dirty files. The setting now moved into the `settings.json` configuration file and provides more options:

* `files.autoSave`: can have the values `off` to disable auto save, `afterDelay` to save files after a configured delay and `onFocusChange` to save files when 
focus moves out of the editor of the dirty file
* `files.autoSaveDelay`: configures the delay in milliseconds when `files.autoSave` is configured to `afterDelay`
* since this setting can be configured via our official settings story, it is possible to enable auto save for selected workspaces only by configuring it via the
workspace settings (`Preferences | Workspace Settings`)

**Note:** if you had auto save enabled previously, we will migrate your setting into the `settings.json` file automatically.

## File Picker

Some useful changes around the file picker (`kb(workbench.action.quickOpen)`) include:
* fuzzy matching is now enabled by default and the previously introduced setting `filePicker.alternateFileNameMatching` is no longer needed
* you can open any file (including line/column pattern at the end) that exists on disk by typing the full path or full workspace relative path even if your exclude settings hide it otherwise

## Keyboard Accessibility

You will find that VS Code is already providing an exhaustive list of commands from the command palette (`kb(workbench.action.showCommands)`) so that you can operate VS Code without using the mouse.
However, some parts of the UI could not be operated without using the mouse to click. We made a pass over these locations and added support to use the `Tab` key to jump between UI controls that you
can interact with. Using `Tab` or `Shift-Tab` to jump between elements with actions in the UI is a very common pattern for keyboard accessibility. In addition to that, we now also draw an indicator around the UI
element once the element gains focus. 

Some areas where you can now jump to using keyboard only:
* view switcher
* header of collapsible sections in a view to expand/collapse
* actions in views and sections
* actions for items in the tree

This is just the beginning of your journey to become more keyboard accessible, expect more areas to follow in the future!

## Extension API Consumption

When you write an extension for VS Code your are developing it against a set of APIs that we define through a file called `vscode.d.ts`. You can see this file
in our repository [here](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts). This file is picked up from our TypeScript and JavaScript language
service to provide you with nice validation and intellisense while you develop on your extension.

As we make changes to the VS Code API between versions, `vscode.d.ts` changes and is updated and tagged from release to release. Previously, we stored the `vscode.d.ts`
file within the `vscode` npm module that all extensions automatically depend on. So, in order to update to our latest API, you would just install a newer version of
the `vscode` npm module in your extension by typing `npm update vscode`.

We found that this approach has many issues:
* the `vscode` npm module needs to be updated and versioned independent from VS Code versions because it contains API unrelated code (e.g. for test running)
* the `engine` field of the `package.json` in your extension should be the only place that drives the decision which API to develop against

Thus we made the following changes:
* the `vscode.d.ts` is no longer shipping within the `vscode` npm module
* the value of the `engine` field in your extension is used to determine which version of `vscode.d.ts` to use
* it is still very easy to update to a newer API via basic `npm` commands

Since this is a somewhat breaking change for existing extensions, we decided to bump the `vscode` npm module version to `0.2.0`. We encourage all extension writers to 
update their dependency to `vscode` from the `package.json` to this version (`^0.2.0`) to benefit from future updates to tooling for extensions.

The process of installing a specific version of the API into your extension is still very simple:
* set the minimal version of VS Code that your extension requires from the `engine` field of the `package.json`
* make sure your dependency to the `vscode` module is at least `0.2.0`
* type `npm install vscode` from the root of your extension
* the `vscode` module will download the appropiate version of `vscode.d.ts` based on the `engine` field you declared
* go back to VS Code and see how the API for the specific version you chose appears in Intellisense and validation

## Notable Bug Fixes

* [1485](https://github.com/Microsoft/vscode/issues/1485): Windows 7: Deleting always fails with error message

