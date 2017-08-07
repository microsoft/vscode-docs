# Emmet 2.0 in Visual Studio Code

Emmet has been a part of Visual Studio Code from the very beginning. With a simple pressing of a `kbstyle(Tab)` key, you could transform an emmet abbreviation to complex html or css property-value pair. 

Over the past year, more [Emmet Actions](https://docs.emmet.io/actions/) like `Wrap with abbreviation`, `Select Next/Prev Item`, `Go to Next/Prev Edit Point` etc. were added.

While Emmet features grew like this, the basic feature of `kbstyle(Tab)` key triggering emmet expansion had issues of its own.

* Many unexpected Emmet expansions occurred when the user wanted to just add an indent using the `kbstyle(Tab)` key 
* On the other hand, items from the suggestion/auto-completion list (content assist) got inserted when the user was expecting the Emmet abbreviation to be expanded.

We are happy to introduce a brand new model for Emmet where we now serve the expanded Emmet abbreviations in the suggestion/auto-completion list (content assist). In this model, the `kbstyle(Tab)` key is no longer bound to the Emmet expansion command and is freed up for what it was meant to do i.e indent.

![Emmet abbreviation expansion in autocomplete](images/1_13/emmet.gif)

## Changes under the hood

Under the hood, there have been massive changes as well. 

In the previous model, the single [Emmet library](https://github.com/emmetio/emmet) was used. Its author, [Sergey Chikuyonok](https://github.com/sergeche) envisioned a new world where Emmet 2.0 is based on a modular system. For eg. there are now different modules for parsing and expanding abbreviations. Different modules for parsing html and css content. Different modules for output rendering based on syntax. So on and so forth. 

This new model has allowed us to not only provide Emmet abbreviation expansions in the suggestion/auto-completion list (content assist), but also provide multi cursor support for most of the Emmet commands.

## How to get Emmet abbreviations expanded in the new model?

If you are working on any of the Emmet supported modes (html, haml, jade, slim, xml, xsl, css, scss, sass, less and stylus), you will start seeing the emmet abbreviation expansions in the suggestion/auto-completion list (content assist) as you type. 

If you have `editor.quickSuggestions` turned off then you will have to press `kb(editor.action.triggerSuggest)` to trigger the suggestion/auto-completion list (content assist) manually.

Another way to get your Emmet abbreviations expanded is by using the `Emmet: Expand Abbreviation` command. Since `kbstyle(Tab)` key is no longer bound to this command, you should add a new key binding to the command id `editor.emmet.action.expandAbbreviation`.

Both the above ways of getting your Emmet abbreviations expanded will work with multi cursor as well. Enjoy!

If you don't like emmet showing up in the suggestion/auto-completion list (content assist), set `emmet.showExpandedAbbreviation` to `never`

## How to get Emmet abbreviations expanded in other file types?

In the old model, we supported the use of `emmet.syntaxProfiles` setting to enable Emmet in other file types. 

Since this setting was meant for customizing Emmet output as described in the [Emmet Syntax Profile Customization docs](https://docs.emmet.io/customization/syntax-profiles/), we are introducing a setting `emmet.includeLanguages` to map file types/languages to known Emmet modes. 

For more on this new setting, see the section on [Emmet Configuration](#emmet-configuration)

## Can I use custom snippets?

Yes definitely! In February 2017, we introduced a new setting `emmet.extensionsPath`. Provide the location to a directory where your `snippets.json` file resides in this setting and the custom snippets defined in the `snippets.json` file will be used by Emmet.
This file should follow the below schema:

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
* For css snippets, the name of your snippet should be fuzzy matchable to the value of the snippet. Say you want `color: black`, then the name of the snippet cannot be `black`. 
     * If the snippet name is not fuzzy matchable with the snippet value, you can still get `Emmet: ExpandAbbreviation` command to work, but will not show up in the suggestions in the suggestion/auto-completion list, as they will get filtered out.
     * Do not include a trailing `;` for the css property value pair. Emmet will take care of that
     * Css custom snippets are applicable to all other stylesheet flavors like `scss`, `less` or `sass`. 

> Note: Once you make a change to this `snippets.json` file, remember to reload Visual Studio Code for it to take effect.
     

## Emmet configuration

* `emmet.includeLanguages`

    Add **Emmet: Expand Abbreviation** and **Emmet: Wrap with Abbreviation** support to the language of your choice by providing a mapping to an existing Emmet supported language. The new language goes on the left and the Emmet supported language on the right. Use language ids for both sides of the mapping.
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
    * `inMarkupAndStylesheetFilesOnly` - Emmet abbreviations in the suggestion list for languages that are markup and stylesheet based ('html','pug','slim','haml','xml','xsl','css','scss','sass','less','stylus') (default).
    * `always` - Emmet abbreviations in the suggestion list in languages that are markup and stylesheet based as well as `javascriptreact`, `typescriptreact` and any other language that has been mapped in the new setting `emmet.includeLanguages`.

    **Note:** In the `always` mode, the new Emmet implementation is not context aware. For example, if you are editing a JavaScript React file, you will get Emmet suggestions not only when writing markup but also while writing JavaScript.

* `emmet.extensionsPath`

   Provide the location of the directory that houses the `snippets.json` file which in turn has your custom snippets.
   
## Deprecated Emmet Settings

* The setting `emmet.triggerExpansionOnTab` has been deprecated. Since `kbstyle(Tab)` is no longer bound to the `Emmet: Expand Abbreviation` command, the setting `emmet.triggerExpansionOnTab` is obsolete.
* The setting `emmet.preferences` has been deprecated. This was used to customize preferences as described in the [Emmet Preferences docs](https://docs.emmet.io/customization/preferences/). The reason here is that the new modular emmet doesnt support all of the emmet preferences yet. If there was anything in these preferences, that you are using today, please log an issue about it and we can see how we can include it in the new Emmet model