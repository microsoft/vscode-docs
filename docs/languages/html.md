---
Order: 4
Area: languages
TOCTitle: HTML
ContentId: 43095EAF-4B93-407C-A6F9-6DB173D79088
PageTitle: HTML Programming with Visual Studio Code
DateApproved: 9/7/2017
MetaDescription: Get the best out of Visual Studio Code for HTML development
---
# HTML Programming in VS Code

VS Code provides basic support for HTML programming out of the box. Install an extension for greater functionality.

<div class="marketplace-extensions-html-curated"></div>

> Tip: Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

## IntelliSense

As you type in HTML, we offer suggestions via HTML IntelliSense.  In the image below you can see a suggested HTML element closure `</div>` as well as a context specific list of suggested elements.

![HTML IntelliSense](images/html/htmlintellisense.png)

We also offer up suggestions for elements, tags, some values (as defined in HTML 5), Ionic and AngularJS tags,

You can also work with embedded CSS and JavaScript. However, note that script and style includes are not followed, the language support only looks at the content of the HTML file.

You can trigger suggestions at any time by pressing `kb(editor.action.triggerSuggest)`.

You can also control which built-in code completion providers are active. Override these in your user or workspace [settings](/docs/getstarted/settings.md) if you prefer not to see the corresponding suggestions.

```json
// Configures if the built-in HTML language suggests Angular V1 tags and properties.
"html.suggest.angular1": true,

// Configures if the built-in HTML language suggests Ionic tags, properties and values.
"html.suggest.ionic": true,

// Configures if the built-in HTML language suggests HTML5 tags, properties and values.
"html.suggest.html5": true
```

## Hover

Move the mouse over HTML tags or embedded styles and JavaScript to get more information on the symbol under the cursor.

![HTML Hover](images/html/htmlhover.png)

## Validation

The HTML language support performs validation on all embedded JavaScript and CSS.

You can turn that validation off with the following settings:

```json
// Configures if the built-in HTML language support validates embedded scripts.
"html.validate.scripts": true,

// Configures if the built-in HTML language support validates embedded styles.
"html.validate.styles": true
```

## Format HTML

To improve the formatting of your HTML source code, press `kb(editor.action.formatSelection)` and the selected area will be reformatted.

>**Tip:** The formatter does not format the tags listed in the `html.format.unformatted` settings. Embedded JavaScript is formatted unless 'script' tags are excluded.

>**Tip:** Configure the HTML formatter settings in the [User and Workspace Settings](/docs/getstarted/settings.md).

## Emmet snippets

We support Emmet snippet expansion. Emmet abbreviations are listed along with other suggestions and snippets in the editor auto-completion list.

![Emmet HTML support built-in](images/html/emmetsnippet.gif)

>**Tip:** See the HTML section of the [Emmet cheat sheet](https://docs.emmet.io/cheat-sheet) for valid abbreviations.

If you'd like to use HTML Emmet abbreviations with other languages, you can associate one of the Emmet modes (such as `css`, `html`) with other languages with the `emmet.includeLanguages` [setting](/docs/getstarted/settings.md). The setting takes a [language id](/docs/languages/overview.md#language-id) and associates it with the language id of an Emmet supported mode.

For example, to use Emmet HTML abbreviations inside JavaScript:

```json
{
    "emmet.includeLanguages": {
        "javascript": "html"
     }
}
```

We also support [User Defined Snippets](/docs/editor/userdefinedsnippets.md).

## Next Steps

Read on to find out about:

* [CSS, Less and Sass](/docs/languages/css.md) - VS Code has first class support for CSS including Less and Sass.
