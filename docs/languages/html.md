---
Order: 4
Area: languages
TOCTitle: HTML
ContentId: 43095EAF-4B93-407C-A6F9-6DB173D79088
PageTitle: HTML Programming with Visual Studio Code
DateApproved: 2/7/2018
MetaDescription: Get the best out of Visual Studio Code for HTML development
---
# HTML Programming in VS Code

Visual Studio Code provides basic support for HTML programming out of the box. There is syntax highlighting, smart completions with IntelliSense, and customizable formatting. VS Code also includes great Emmet support.

## IntelliSense

As you type in HTML, we offer suggestions via HTML IntelliSense.  In the image below you can see a suggested HTML element closure `</div>` as well as a context specific list of suggested elements.

![HTML IntelliSense](images/html/htmlintellisense.png)

We also offer up suggestions for elements, tags, some values (as defined in HTML5), Ionic and AngularJS tags. Document symbols are also available for HTML, allowing you to quickly navigate to DOM nodes by id and class name.

You can also work with embedded CSS and JavaScript. However, note that script and style includes from other files are not followed, the language support only looks at the content of the HTML file.

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

## Close tags

Tag elements are automatically closed when `>` of the opening tag is typed.

![HTML Close1](images/html/auto-close1.gif)

The matching closing tag is inserted when `/` of the closing tag is entered.

![HTML Close2](images/html/auto-close2.gif)

You can turn off autoclosing tags with the following [setting](/docs/getstarted/settings.md):

```json
"html.autoClosingTags": false
```

## Color picker

The VS Code color picker UI is now available in HTML style sections.

![color picker in HTML](images/html/color-picker-html.png)

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

The HTML formatter is based on [js-beautify](https://www.npmjs.com/package/js-beautify). The formatting options offered by that library are surfaced in the VS Code [settings](/docs/getstarted/settings.md):

* `html.format.wrapLineLength`: Maximum amount of characters per line.
* `html.format.unformatted`: List of tags that shouldn't be reformatted.
* `html.format.extraLiners`: List of tags that should have an extra newline before them.
* `html.format.preserveNewLines`: Whether existing line breaks before elements should be preserved.
* `html.format.maxPreserveNewLines`: Maximum number of line breaks to be preserved in one chunk.
* `html.format.endWithNewline`: End with a newline.
* `html.format.indentInnerHtml`: Indent `<head>` and `<body>` sections.
* `html.format.wrapAttributes`: Wrapping strategy for attributes:
  * `auto`: Wrap when the line length is exceeded
  * `force`: Wrap all attributes, except first
  * `force-aligned`: Wrap all attributes, except first, and align attributes
  * `force-expand-multiline`: Wrap all attributes


>**Tip:** The formatter does not format the tags listed in the `html.format.unformatted` settings. Embedded JavaScript is formatted unless 'script' tags are excluded.

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

## HTML extensions

Install an extension to add more functionality. Go to the **Extensions** view (`kb(workbench.view.extensions)`) and type 'html' to see a list of relevant extensions to help with creating and editing HTML.

<div class="marketplace-extensions-html-curated"></div>

> Tip: Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

## Next Steps

Read on to find out about:

* [CSS, Less and Sass](/docs/languages/css.md) - VS Code has first class support for CSS including Less and Sass.
* [Emmet](/docs/editor/emmet.md) - Learn about VS Code's powerful built-in Emmet support.

## Common Questions

**Q: Does VS Code have HTML preview?**

**A:** No, VS Code doesn't have built-it support for HTML preview but there are extensions available in the VS Code [Marketplace](https://marketplace.visualstudio.com/vscode). Open the **Extensions** view (`kb(workbench.view.extensions)`) and search on 'live preview' or 'html preview' to see a list of available HTML preview extensions.
