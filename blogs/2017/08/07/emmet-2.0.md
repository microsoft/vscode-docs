---
Order: 30
TOCTitle: Emmet 2.0
PageTitle: Emmet 2.0 in Visual Studio Code
MetaDescription: New Emmet 2.0 brings a better Emmet experience inside VS Code.
Date: 2017-08-07
ShortDescription: New Emmet 2.0 brings a better Emmet experience inside VS Code.
Author: Ramya Rao
---
# Emmet 2.0 in Visual Studio Code

August 7, 2017 Ramya Rao, [@ramyanexus](https://twitter.com/ramyanexus)

In the July 2017 release of Visual Studio Code (version 1.15), we're shipping a better Emmet experience which has been in preview for the past 2 releases.

Its features include:

* Emmet abbreviation expansions in suggestion/auto-completion lists.
* Multi-cursor support for most [Emmet actions](https://docs.emmet.io/actions/).
* Updated support for custom Emmet snippets.

![Emmet in suggestion/auto-completion list](emmet.gif)

As part of this update, we have re-written all of the Emmet actions using new npm modules from [@emmetio](https://www.npmjs.com/~emmetio).

An important change is that the `kbstyle(Tab)` key is no longer the default way to expand Emmet abbreviations. Instead, Emmet abbreviations will now appear in the suggestion list. They can be selected like any other smart completion and on selection, the abbreviation will be expanded.

>**Note**: To continue to expand Emmet abbreviations and snippets using the `kbstyle(Tab)` key, set `emmet.triggerExpansionOnTab` to `true`.

Read on to learn about the Emmet 2.0 changes in Visual Studio Code.

## New modular approach to Emmet

Previously, the [Emmet library](https://github.com/emmetio/emmet) was a single monolithic codebase that was used for every [Emmet action](https://docs.emmet.io/actions/). The author of Emmet, [Sergey Chikuyonok](https://github.com/sergeche), envisioned a new world for Emmet 2.0 with smaller, re-usable modules.

There are now separate npm modules from [@emmetio](https://github.com/emmetio) for the different parts of the pipeline required to expand an Emmet abbreviation. These include steps such as:

* Parsing an abbreviation
* Resolving snippets and variables
* Rendering output as per syntax
* Applying transformations

There are also separate modules for parsing HTML and CSS documents to aid in implementing the rest of the Emmet features. You can find these modules on npm under [emmetio](https://www.npmjs.com/~emmetio).

This modular approach was taken to allow editor plugins to use the editor specific APIs for better Emmet integration with the editor features. For example, this approach has allowed us to:

* Provide Emmet abbreviation expansions in the suggestion/auto-completion list.
* Provide multi cursor support for most of the Emmet actions.
* Provide more efficient parsing of documents using VS Code specific APIs for Emmet actions that need parsed files.
* Pull the Emmet integration out of the VS Code core and into an extension.

## Tab no longer the default Emmet expansion key

There were two issues with using the `kbstyle(Tab)` key as a keyboard shortcut for Emmet expansion:

* Emmet expansions occurred when the user wanted to indent source code using the `kbstyle(Tab)` key.
* Items from the suggestion list were inserted when the user wanted to expand an Emmet abbreviation.

[Sergey Chikuyonok](https://github.com/sergeche) realized that having Emmet in the suggestion list would be a more pleasant experience. That it helped us solve the above two issues, was an added bonus.

With Emmet abbreviations now easily accessible via suggestion list, we were able to remove the default association of `kbstyle(Tab)` key with the **Emmet: ExpandAbbreviation** command. The `kbstyle(Tab)` key is now free to do what it was meant to do: indent.

If you have the `editor.quickSuggestions` [setting](/docs/getstarted/settings.md) turned off, you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list manually.

If you don't want Emmet showing up in the suggestion/auto-completion list, set `emmet.showExpandedAbbreviation` to `never`.

You can still bind any keyboard shortcut (other than `kbstyle(Tab)` key) to the `editor.emmet.action.expandAbbreviation` command or use **Emmet: Expand Abbreviation** from the **Command Palette**.

If you prefer the `kbstyle(Tab)` key for expanding your abbreviations, then add the setting `emmet.triggerExpansionOnTab` to your settings and set it to `true`. We use this setting to provide the appropriate fallback to provide indentation when there is no abbreviation to expand.

## Other changes

There are a few other changes that we have documented in the new Emmet [page](/docs/editor/emmet.md):

* Use `emmet.includeLanguages` instead of `emmet.syntaxProfiles` setting to [enable Emmet in other file types](/docs/editor/emmet.md#emmet-abbreviations-in-other-file-types)
* Changes to how you write [custom snippets in Emmet](/docs/editor/emmet.md#using-custom-emmet-snippets)
* Changes to available [Emmet settings](/docs/editor/emmet.md#emmet-configuration)
* To wrap individual lines in a single selection in separate tags, use the command **Emmet: Wrap Individual Lines with Abbreviation** instead of **Emmet: Wrap with Abbreviation**.
* [Known issues in Emmet 2.0](/docs/editor/emmet.md#known-issues-in-emmet-20) that we are working on in August 2017

## People who made Emmet 2.0 happen

I want to thank [Sergey Chikuyonok](https://github.com/sergeche) for his amazing work on modularizing Emmet and helping us bring these improvements to VS Code.

Thanks also goes to everyone who used the new Emmet in VS Code when it was in preview and provided great feedback through GitHub issues. The discussions in Github issues were very helpful in getting to the current user experience.

Special thanks to [Steve Lombardi](https://github.com/smlombardi), [Jens Hausdorf](https://github.com/jens1o), [Vladimir Sizikov](https://github.com/vvs), [Niichie](https://github.com/Niichie), [Thomas Klepzig](https://github.com/tklepzig) and many more who used the VS Code Insiders builds to test my bug fixes and feature additions.

## Share your thoughts on the new Emmet

Do you miss any features of the old Emmet? Having trouble using the new Emmet? Feel free to create an GitHub [issue](https://github.com/Microsoft/vscode/issues) and we will do our best to help you out.

It is also easier than ever to contribute to Emmet in VS Code as it is now an extension. The [emmet folder](https://github.com/Microsoft/vscode/tree/master/extensions/emmet) in the VS Code GitHub repo has all the source code you need to get started.

Happy Coding!

Ramya Rao, VS Code Team member [@ramyanexus](https://twitter.com/ramyanexus)
