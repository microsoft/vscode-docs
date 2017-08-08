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

A better Emmet experience, including abbreviation expansions in suggestion/auto-completion lists, multi-cursor support for most [Emmet actions](https://docs.emmet.io/actions/) and updated support for custom snippets are in store as we ship Emmet 2.0 in the July 2017 release of Visual Studio Code (version 1.15).

![Emmet in suggestion/auto-completion list](2017_08_07_emmet.gif)

With this move, we have re-written all of the Emmet actions using new npm modules from [@emmetio](http://github.com/emmetio).

The most important change for VS Code users is that Emmet Abbreviations will now appear in suggestion/auto-completion lists just like any other completion, and no longer have the `(kbstyle(Tab))` key as a dedicated keyboard shortcut in order to expand.

Read on to learn how this changes the way you use Emmet in Visual Studio Code.

## New modular approach to Emmet

Previously, the [Emmet library](https://github.com/emmetio/emmet) was a single monolithic codebase that was used for every [Emmet action](https://docs.emmet.io/actions/). The author of Emmet, [Sergey Chikuyonok](https://github.com/sergeche), envisioned a new world for Emmet 2.0 with smaller, re-usable modules.

This was done to allow editor plugins to use the editor specific APIs for a better Emmet integration with editor features like multiple cursors and syntax detection.

There are now separate npm modules from [@emmetio](https://github.com/emmetio) for the different parts of the pipeline required to expand an Emmet abbreviation, including parsing an abbreviation, resolving snippets, rendering output as per syntax, and applying transformations. 

There are also separate modules for parsing HTML and CSS documents to aid in implementing the rest of the Emmet features. You can find these modules on [npm](https://www.npmjs.com/~emmetio).

This modular approach has allowed us to:

- Provide Emmet abbreviation expansions in the suggestion/auto-completion list.
- Provide multi cursor support for most of the Emmet actions.
- Provide more efficient parsing of documents using VS Code specific APIs for Emmet actions that need parsed files.
- Pull the Emmet integration in VS Code from the core to an extension.


## Replacing use of Tab for expanding Emmet abbreviations

Many of our users had two issues with using the `kbstyle(Tab)` key as a keyboard shortcut for the **Emmet: Expand Abbreviation**:

* Unexpected Emmet expansions occurring when the user wanted to just add an indent using the `kbstyle(Tab)` key.
* Items from the suggestion list getting inserted when the user actually wanted to expand an Emmet abbreviation.

[Sergey Chikuyonok](https://github.com/sergeche) realized that having Emmet show up in the suggestion list would be a much more pleasant experience. 

The fact that this helped us solve both the above issues is an added bonus because the conflict between Emmet and the suggestion list is indeed best resolved by having Emmet show up in the suggestion list. 

With this move, the default keybinding of the `kbstyle(Tab)` key with the `editor.action.emmet.expandAbbreviation` is removed and the `kbstyle(Tab)` key is free to do what it was meant to do i.e add an indent.

If you have `editor.quickSuggestions` turned off then you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list manually.

If you don't want Emmet showing up in the suggestion/auto-completion list, set `emmet.showExpandedAbbreviation` to `never`.

You can still bind any keyboard shortcut (other than `kbstyle(Tab)` key) to the `editor.action.emmet.expandAbbreviation` command or use **Emmet: Expand Abbreviation** from the **Command Palette**.

## Emmet suggestions in other file types

In Emmet 2.0, the commands **Emmet: Expand Abbreviation** and **Emmet: Wrap with Abbreviation** will expand HTML abbreviations on all file types. No configuration or setting update needed.

If you are working on any of the default Emmet-enabled file types (`html`, `haml`, `jade`, `slim`, `jsx`, `xml`, `xsl`, `css`, `scss`, `sass`, `less` and `stylus`), you will see Emmet abbreviation expansions in the suggestion/auto-completion list as you type or when you manually trigger auto-completion.

To get Emmet suggestions in a file type that is not enabled for Emmet by default, use the [setting](/docs/getstarted/settings.md) `emmet.includeLanguages`.

Read more on this new setting in the section on [Emmet Configuration](#emmet-configuration).

> Note: You might have used `emmet.syntaxProfiles` previously to map new file types. Please use the new setting `emmet.includeLanguages` from VS Code 1.15 onwards instead. The `emmet.syntaxProfiles` should be used solely for customizing the final output.

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

Say you want an unordered list with a list item. Your snippet should be `ul>li` and not `<ul><li></li></ul>`.

These custom snippets are applicable to all other markup flavors like `haml` or `jade`. Therefore the snippet value has to be an abbreviation and not actual HTML, so that appropriate transformations can be applied to get the right output as per the language type.

### CSS Emmet snippets

Values for CSS Emmet snippets should either be a property value or the complete property value pair.

Make sure that the name of the snippet contains the letters from the snippet value, so that fuzzy matching algorithms can make the right match in the suggestion list.

If you don't, then the **Emmet: Expand Abbreviation** command will still work. But, these snippets won't show up in the suggestion list which relies on the fuzzy matching to filter out suggestions.

These custom snippets are applicable to all other stylesheet flavors like `scss`, `less` or `sass`. Therefore, don't include a trailing `;` at the end of the snippet value. Emmet will add it as needed based on the whether the language requires it.

> Note: After making changes to the `snippets.json` file, remember to reload VS Code for it to take effect.

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

## Deprecated Emmet Settings

Setting | Reason for deprecation
-------- | ------------------------
`emmet.triggerExpansionOnTab` | Obsolete as `kbstyle(Tab)` is no longer bound to the **Emmet: Expand Abbreviation** command.
`emmet.preferences` | The new modular Emmet does not support [Emmet Preferences](https://docs.emmet.io/customization/preferences/) in the same way as it did before. If you are using preferences today, please log an issue and we'll try to include them in the new Emmet.


## Share your thoughts on the new Emmet

Do you miss any of the features from the old Emmet? Having trouble using the new Emmet? Feel free to create an GitHub [issue](https://github.com/Microsoft/vscode/issues) and we will try our best to help you out.

Also, it is easier than ever to contribute to the Emmet integration in VS Code as it is now an extension. The [emmet folder in VS Code](https://github.com/Microsoft/vscode/tree/master/extensions/emmet) is where all the code you need to get started lives.

Happy Coding!

Ramya Rao, VS Code Team member [@ramyanexus](https://twitter.com/ramyanexus)


