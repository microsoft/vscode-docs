# Emmet 2.0 in Visual Studio Code

Emmet has been a part of Visual Studio Code from the very beginning. With a simple pressing of a `kbstyle(Tab)` key, you could transform an emmet abbreviation to complex html or css property-value pair. 

Over the past year, more [Emmet Actions](https://docs.emmet.io/actions/) like `Wrap with abbreviation`, `Select Next/Prev Item`, `Go to Next/Prev Edit Point` etc. were added.

While Emmet features grew this way, the basic feature of `kbstyle(Tab)` key triggering emmet expansion had issues of its own.

* Many unexpected Emmet expansions occurred when the user wanted to just add an indent using the `kbstyle(Tab)` key 
* On the other hand, items from the suggestion/auto-completion list (content assist) got inserted when the user was expecting the Emmet abbreviation to be expanded.

We are happy to introduce a brand new model for Emmet where we now serve the expanded Emmet abbreviations in the suggestion/auto-completion list (content assist). In this model, the `kbstyle(Tab)` key is no longer bound to the Emmet expansion command and is freed up for what it was meant to do i.e indent.

![Emmet abbreviation expansion in autocomplete](../../../../release-notes/images/1_13/emmet.gif)

## Changes under the hood

Under the hood, there have been massive changes as well. 

In the previous model, a single [Emmet library](https://github.com/emmetio/emmet) did all the work. Its author, [Sergey Chikuyonok](https://github.com/sergeche) envisioned a new world for Emmet 2.0 where he has taken a more modular approach. For eg. there are now different npm modules for parsing and expanding abbreviations, resolving snippets, parsing html and css content, output rendering based on syntax etc.

This modular approach has allowed us to
- Provide Emmet abbreviation expansions in the suggestion/auto-completion list (content assist)
- Re-write all of the other Emmet Actions, thus enabling us to give multi cursor support for most of them.


## How to get Emmet abbreviations expanded in the new model?

If you are working on any of the Emmet supported modes (html, haml, jade, slim, xml, xsl, css, scss, sass, less and stylus), you will start seeing the emmet abbreviation expansions in the suggestion/auto-completion list (content assist) as you type. 

If you have `editor.quickSuggestions` turned off then you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list (content assist) manually.

Or you can use the `Emmet: Expand Abbreviation` command. Since `kbstyle(Tab)` key is no longer bound to this command, you should add a new key binding to it (`editor.emmet.action.expandAbbreviation`).

Both the above ways of getting your Emmet abbreviations expanded will work with multi cursor as well. Enjoy!

If you don't like emmet showing up in the suggestion/auto-completion list (content assist), set `emmet.showExpandedAbbreviation` to `never`

## How to get Emmet abbreviations expanded in other file types?

In the new model, the commands `Emmet: Expand Abbreviation` and `Emmet: Wrap with Abbreviation` will expand html abbreviations on all file types. No setting update is necessary.

If you need Emmet to show up in the suggestion list or for it to work in a mode other than `html`, like `jade`, `haml`, `css`, `scss`, then use the new setting `emmet.includeLanguages`. 

Read more on this new setting in the section on [Emmet Configuration](#emmet-configuration).

> Note: Use of `emmet.syntaxProfiles` to enable Emmet in other file types is no longer supported.

The setting `emmet.syntaxProfiles` is only meant for customizing Emmet output as described in the [Emmet Syntax Profile Customization docs](https://docs.emmet.io/customization/syntax-profiles/).


## Can I use custom snippets?

Yes definitely! Create a file called `snippets.json` and provide the location of the parent directory of this file in the setting `emmet.extensionsPath`. 
Below are the contents of a sample `snippets.json`:

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

Keep the below in mind when creating custom snippets

* For html snippets, the value for your snippet should be a valid Emmet abbreviation. Say you want an unordered list with a list item. Your snippet should be `ul>li` and not `<ul><li></li></ul>`. 
     * Html custom snippets are applicable to all other markup flavors like `haml` or `jade`. Which is why the snippet value has to be an abbreviation and not actual html.
* For css snippets, the name of your snippet should be fuzzy matchable to the value of the snippet. Say you want `color: black`, then the name of the snippet cannot be `dark`. 
     * If the snippet name is not fuzzy matchable with the snippet value, you can still get `Emmet: ExpandAbbreviation` command to work, but will not show up in the suggestions in the suggestion/auto-completion list, as they will get filtered out.
     * Do not include a trailing `;` for the css property value pair. Emmet will take care of that
     * Css custom snippets are applicable to all other stylesheet flavors like `scss`, `less` or `sass`. 

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
