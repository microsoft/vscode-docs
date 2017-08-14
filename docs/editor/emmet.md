---
Order: 12
Area: editor
TOCTitle: Emmet
ContentId: baf4717c-ea52-486e-9ea3-7bf1c4134dad
PageTitle: Emmet in Visual Studio Code
DateApproved: 8/14/2017
MetaDescription: Using Emmet abbreviations inside VS Code. 
---
# Emmet in Visual Studio Code

Visual Studio Code supports [Emmet](https://docs.emmet.io/cheat-sheet) abbreviations.

![Emmet in suggestion/auto-completion list](images/emmet/emmet.gif)

## Emmet suggestions in other file types

The commands **Emmet: Expand Abbreviation** and **Emmet: Wrap with Abbreviation** will expand HTML abbreviations on all file types. No configuration or settings update is needed.

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

Keep in mind that there are some restrictions on the snippet name and value.

### HTML Emmet snippets

Values for HTML Emmet snippets should be a valid abbreviation.

For example, if you want an unordered list with a list item, your snippet should be `ul>li` and not `<ul><li></li></ul>`.

HTML custom snippets are applicable to all other markup flavors like `haml` or `jade`. When snippet value is an abbreviation and not actual HTML, the appropriate transformations can be applied to get the right output as per the language type.

### CSS Emmet snippets

Values for CSS Emmet snippets should either be a property value or the complete property value pair.

Name the snippet such that it contains the letters from the snippet value in the order that they appear in the latter, so that the fuzzy matching algorithm of the suggestion list can make the right match. If you don't use similar letters, the **Emmet: Expand Abbreviation** command will still work, but the snippets won't show up as expected in a filtered suggestion list.

For example, don't use `bc` or `darkc` as the name for `color: black`. Use `cb` or `cob` instead.

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

In VS Code release 1.15, the following settings were deprecated:

Setting | Reason for deprecation
-------- | ------------------------
`emmet.triggerExpansionOnTab` | Obsolete as `kbstyle(Tab)` is no longer bound to the **Emmet: Expand Abbreviation** command.
`emmet.preferences` | The new modular Emmet does not support [Emmet Preferences](https://docs.emmet.io/customization/preferences/) in the same way as it did before. If you are using preferences today, please log an issue and we'll try to include them in the new Emmet.