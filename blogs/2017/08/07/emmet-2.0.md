# Emmet 2.0 in Visual Studio Code

Emmet abbreviation expansions in suggestion/auto-completion list, multi-cursor support for [Emmet actions](https://docs.emmet.io/actions/), updated support for custom snippets and more are in store as part of Emmet 2.0 in Visual Studio Code. 

![Emmet in suggestion/auto-completion list](../../../images/2017-08-07/emmet.gif)

With this move, we have re-written all of the Emmet actions using new helper modules from [emmetio](http://github.com/emmetio). Also, the `kbstyle(Tab)` key is no longer bound to the **Emmet: Expand Abbrevation** command. 

Read on to learn how this changes the way you do Emmet in Visual Studio Code

## New Modular Emmet

Previously, a single [Emmet library](https://github.com/emmetio/emmet) did all the work required for all of the [Emmet actions](https://docs.emmet.io/actions/). The author of Emmet, [Sergey Chikuyonok](https://github.com/sergeche), envisioned a new world for Emmet 2.0 where he has taken a more modular approach. 

There are now separate individual npm modules for the different parts of the pipeline required to expand an Emmet abbreviation. From parsing an abbreviation, resolving snippets, rendering output as per syntax, apply transformations etc. as well as parsing html/css documents. You can find these modules at https://www.npmjs.com/%7Eemmetio.

This modular approach has allowed us to
- Provide Emmet abbreviation expansions in the suggestion/auto-completion list.
- Re-write all of the other Emmet Actions, thus enabling us to give multi cursor support for most of them.

## Expand Emmet with Tab vs suggestion list

Using the `kbstyle(Tab)` key as a keyboard shortcut for the `Emmet: Expand Abbreviation` command had 2 issues that many of our users saw:

* Unexpected Emmet expansions occurring when the user wanted to just add an indent using the `kbstyle(Tab)` key.
* Items from the suggestion list getting inserted when the user actually wanted to expand an Emmet abbreviation.

The conflict between Emmet and the suggestion list is best resolved by having Emmet show up in the suggestion list. With this move, the keybinding of `kbstyle(Tab)` key with the `editor.action.emmet.expandAbbreviation` is removed and the `kbstyle(Tab)` key is free to do what it was meant to do i.e add an indent.

If you have `editor.quickSuggestions` turned off then you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list manually.

If you don't like emmet showing up in the suggestion/auto-completion list, set `emmet.showExpandedAbbreviation` to `never`

You can still bind any keyboard shortcut (other than `kbstyle(Tab)` key) to the `editor.action.emmet.expandAbbreviation` command or use **Emmet: Expand Abbrevation** from the **Command Palette**.


## Emmet suggestions in other files types

In the new Emmet, the commands `Emmet: Expand Abbreviation` and `Emmet: Wrap with Abbreviation` will expand html abbreviations on all file types. No configuration or setting update needed.

If you are working on any of the Emmet supported modes (html, haml, jade, slim, xml, xsl, css, scss, sass, less and stylus), you will start seeing the emmet abbreviation expansions in the suggestion/auto-completion list as you type or when you manually trigger auto-completion.

To get Emmet suggestions in a file type that is not supported by Emmet by default (see above list), use the new setting `emmet.includeLanguages`. 

Read more on this new setting in the section on [Emmet Configuration](#emmet-configuration).


## Using custom Emmet snippets

Custom snippets need to be in a json file named `snippets.json`. The `emmet.extensionsPath` setting should have the path to the directory containing this file.

Below is an example for the contents of this `snippets.json` file.

```
{
    "html": {
        "snippets: {
            "ull": "ul>li" 
        }
    },
    "css": {
        "snippets: {
            "cb": "color: black" 
        }
    }
}
```

In the new Emmet, there are some restrictions on the snippet name and value.

### Html Emmet Snippets

The value for Html Emmet snippets should be a valid abbreviation.

Say you want an unordered list with a list item. Your snippet should be `ul>li` and not `<ul><li></li></ul>`. 

These custom snippets are applicable to all other markup flavors like `haml` or `jade`. Therefore the snippet value has to be an abbreviation and not actual html, so that appropriate transformations can be applied to get the right output as per the language type.

### Css Emmet Snippets 

The value for CSS Emmet snippets should either be a property value or the complete property value pair.

Make sure that the name of the snippet contains the letters from the snippet value, so that fuzzy matching algorithms can make the right match in the suggestion list.

These custom snippets are applicable to all other stylesheet flavors like `scss`, `less` or `sass`. Therefore, dont include a trailing `;` at the end of the snippet value. Emmet will add it if needed based on the whether the language requires it.

> Note: After every change to this `snippets.json` file, remember to reload Visual Studio Code for it to take effect.
     

## Emmet configuration

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

    If there is any language where you do not want to see Emmet expansions, add it in this setting which takes an array of language id strings.

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

    * `never` - Never show Emmet abbreviations in the suggestion list for any language.
    * `inMarkupAndStylesheetFilesOnly` - Show Emmet suggestions only for languages that are purely markup and stylesheet based ('html','pug','slim','haml','xml','xsl','css','scss','sass','less','stylus').
    * `always` - Show Emmet suggestions in all Emmet supported modes as well as the languages that have a mapping in the `emmet.includeLanguages` setting.

    **Note:** In the `always` mode, the new Emmet implementation is not context aware. For example, if you are editing a JavaScript React file, you will get Emmet suggestions not only when writing markup but also while writing JavaScript.

* `emmet.extensionsPath`

   Provide the location of the directory that houses the `snippets.json` file which in turn has your custom snippets.
   
## Deprecated Emmet Settings

Setting | Reason for deprecation
-------- | ------------------------
`emmet.triggerExpansionOnTab` | Since `kbstyle(Tab)` is no longer bound to the `Emmet: Expand Abbreviation` command, this setting is obsolete.
`emmet.preferences` | The new modular Emmet does not support [Emmet Preferences](https://docs.emmet.io/customization/preferences/) yet. If there was anything in these preferences, that you are using today, please log an issue about it and we can see how we can include it in the new Emmet model
