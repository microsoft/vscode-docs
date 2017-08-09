---
Order: 30
TOCTitle: Emmet 2.0
PageTitle: Emmet 2.0 in Visual Studio Code
MetaDescription: New Emmet 2.0 brings a better Emmet experience inside VS Code. 
Date: 2017-08-07
ShortDescription: New Emmet 2.0 brings a better Emmet experience inside VS Code. . 
Author: Ramya Rao
---
# Emmet 2.0 in Visual Studio Code

August 7, 2017 Ramya Rao, [@ramyanexus](https://twitter.com/ramyanexus)

In the July 2017 release of Visual Studio Code (version 1.15), we're shipping a better Emmet experience which has been in preview for the past 2 releases. 

It's features include:

* Emmet abbreviation expansions in suggestion/auto-completion lists.
* Multi-cursor support for most [Emmet actions](https://docs.emmet.io/actions/).
* Updated support for custom Emmet snippets.

![Emmet in suggestion/auto-completion list](2017_08_07_emmet.gif)

As part of this update, we have re-written all of the Emmet actions using new npm modules from [@emmetio](https://www.npmjs.com/~emmetio).

An important change is that the `kbstyle(Tab)` key is no longer the dedicated keyboard shortcut for expanding Emmet abbreviations. Instead, Emmet abbreviations will appear in the suggestion list. They can be selected like any other smart completion and on selection, the abbreviation will be expanded. 

This may take some getting used to but we think you'll see the benefits of Emmet abbreviations being treated as suggestions or smart completions. You can still bind any keyboard shortcut (other than `kbstyle(Tab)` key) to the `editor.action.emmet.expandAbbreviation` command or use **Emmet: Expand Abbreviation** from the **Command Palette**.

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

## Replacing Tab for expanding Emmet abbreviations

There were two issues with using the `kbstyle(Tab)` key as a keyboard shortcut for Emmet expansion:

* Emmet expansions occurred when the user wanted to indent source code using the `kbstyle(Tab)` key.
* Items from the suggestion list were inserted when the user wanted to expand an Emmet abbreviation.

[Sergey Chikuyonok](https://github.com/sergeche) realized that having Emmet in the suggestion list would be a more pleasant experience. That it helped us solve the above two issues, was an added bonus. 

With Emmet abbreviations now easily accessible via suggestion list, we were able to remove the association of `kbstyle(Tab)` key with the **Emmet: ExpandAbbreviation** command (command Id `editor.action.emmet.expandAbbreviation`). The `kbstyle(Tab)` key is now free to do what it was meant to do: indent.

If you have the `editor.quickSuggestions` [setting](/docs/getstarted/settings.md) turned off, you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list manually.

If you don't want Emmet showing up in the suggestion/auto-completion list, set `emmet.showExpandedAbbreviation` to `never`.

You can still bind any keyboard shortcut (other than `kbstyle(Tab)` key) to the `editor.action.emmet.expandAbbreviation` command or use **Emmet: Expand Abbreviation** from the **Command Palette**.

## Emmet suggestions in other file types

In Emmet 2.0, the commands **Emmet: Expand Abbreviation** and **Emmet: Wrap with Abbreviation** will expand HTML abbreviations on all file types. No configuration or settings update is needed.

If you are working on any of the default Emmet-enabled file types (`html`, `haml`, `jade`, `slim`, `jsx`, `xml`, `xsl`, `css`, `scss`, `sass`, `less` and `stylus`), you will see Emmet abbreviations in the suggestion/auto-completion list as you type or when you manually trigger auto-completion.

To get Emmet suggestions in a file type that is not enabled for Emmet by default, use the [setting](/docs/getstarted/settings.md) `emmet.includeLanguages`.

Read more on this new setting in the section on [Emmet Configuration](#emmet-configuration).

> Note: If you used `emmet.syntaxProfiles` previously to map new file types, you should now use the new setting `emmet.includeLanguages` instead. `emmet.syntaxProfiles` should only be used for [customizing the final output](https://docs.emmet.io/customization/syntax-profiles).

## Using custom Emmet snippets

Custom Emmet snippets need to be defined in a json file named `snippets.json`. The `emmet.extensionsPath` setting should have the path to the directory containing this file.

Below is an example for the contents of this `snippets.json` file.

```json
{
    "html": {
        "snippets": {
            "ull": "ul>li"
        }
    },
    "css": {
        "snippets": {
            "cb": "color: black"
        }
    }
}
```

Keep in mind that in Emmet 2.0, there are some restrictions on the snippet name and value.

### HTML Emmet snippets

Values for HTML Emmet snippets should be a valid abbreviation.

For example, if you want an unordered list with a list item, your snippet should be `ul>li` and not `<ul><li></li></ul>`.

HTML custom snippets are applicable to all other markup flavors like `haml` or `jade`. When snippet value is an abbreviation and not actual HTML, the appropriate transformations can be applied to get the right output as per the language type.

### CSS Emmet snippets

Values for CSS Emmet snippets should either be a property value or the complete property value pair.

Also make sure that the name of the snippet contains the letters from the snippet value, so that the fuzzy matching algorithm of the suggestion list can make the right match. If you don't use similar letters, the **Emmet: Expand Abbreviation** command will still work, but the snippets won't show up as expected in a filtered suggestion list.

CSS custom snippets are applicable to all other stylesheet flavors like `scss`, `less` or `sass`. Therefore, don't include a trailing `;` at the end of the snippet value. Emmet will add it as needed based on the whether the language requires it.

>Note: After making changes to the `snippets.json` file, remember to reload VS Code for it to take effect.

## Emmet configuration

Below are Emmet [settings](/docs/getstarted/settings.md) that you can use to customize your Emmet experience in VS Code.

* `emmet.includeLanguages`

    Use this setting to add mapping between the language of your choice and one of the Emmet supported languages to enable Emmet in the former using the syntax of the latter.
    Make sure to use language ids for both sides of the mapping.

    For example:
    ```json
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "vue-html": "html",
        "plaintext": "jade"
    }
    ```

* `emmet.excludeLanguages`

    If there is a language where you do not want to see Emmet expansions, add it in this setting which takes an array of language id strings.

* `emmet.syntaxProfiles`

    See [Emmet Customization of output profile](https://docs.emmet.io/customization/syntax-profiles/#create-your-own-profile) to learn how you can customize the output of your HTML abbreviations.

    For example:
    ```json
    "emmet.syntaxProfiles": {
        "html": {
            "attr_quotes": "single"
        },
        "jsx": {
            "self_closing_tag": true
        }
    }
    ```

* `emmet.variables`

    Customize variables used by Emmet snippets.

    For example:
    ```json
    "emmet.variables": {
        "lang": "de",
        "charset": "UTF-16"
    }
    ```

* `emmet.showExpandedAbbreviation`

    Controls the Emmet suggestions that show up in the suggestion/completion list.

    Setting Value | Description
    ----------- | -------
    `never` | Never show Emmet abbreviations in the suggestion list for any language.
    `inMarkupAndStylesheetFilesOnly` | Show Emmet suggestions only for languages that are purely markup and stylesheet based ('html', 'pug', 'slim', 'haml', 'xml', 'xsl', 'css', 'scss', 'sass', 'less', 'stylus').
    `always` | Show Emmet suggestions in all Emmet supported modes as well as the languages that have a mapping in the `emmet.includeLanguages` setting.

    **Note:** In the `always` mode, the new Emmet implementation is not context aware. For example, if you are editing a JavaScript React file, you will get Emmet suggestions not only when writing markup but also while writing JavaScript.

* `emmet.extensionsPath`

   Provide the location of the directory that houses the `snippets.json` file which in turn has your custom snippets.

## Deprecated Emmet settings

Setting | Reason for deprecation
-------- | ------------------------
`emmet.triggerExpansionOnTab` | Obsolete as `kbstyle(Tab)` is no longer bound to the **Emmet: Expand Abbreviation** command.
`emmet.preferences` | The new modular Emmet does not support [Emmet Preferences](https://docs.emmet.io/customization/preferences/) in the same way as it did before. If you are using preferences today, please log an issue and we'll try to include them in the new Emmet.

## People who made Emmet 2.0 happen

I want to thank [Sergey Chikuyonok](https://github.com/sergeche) for his amazing work on modularizing Emmet and helping us bring these improvements to VS Code.

Thanks also goes to everyone who used the new Emmet in VS Code when it was in preview and provided great feedback through GitHub issues. The discussions in Github issues were very helpful in getting to the current user experience.

Special thanks to [Steve Lombardi](https://github.com/smlombardi), [Jens Hausdorf](https://github.com/jens1o), [Vladimir Sizikov](https://github.com/vvs), [Niichie](https://github.com/Niichie), [Thomas Klepzig](https://github.com/tklepzig) and many more who used the VS Code Insiders builds to test my bug fixes and feature additions. 

## Share your thoughts on the new Emmet

Do you miss any features of the old Emmet? Having trouble using the new Emmet? Feel free to create an GitHub [issue](https://github.com/Microsoft/vscode/issues) and we will do our best to help you out.

It is also easier than ever to contribute to Emmet in VS Code as it is now an extension. The [emmet folder] (https://github.com/Microsoft/vscode/tree/master/extensions/emmet) in the VS Code GitHub repo has all the source code you need to get started.

Happy Coding!

Ramya Rao, VS Code Team member [@ramyanexus](https://twitter.com/ramyanexus)