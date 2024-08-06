---
# DO NOT TOUCH — Managed by doc writer
ContentId: f470466d-89b0-4115-ab7a-2448023b0a6d
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating Product Icon Theme in Visual Studio Code
---

# Product Icon Theme

Visual Studio Code contains a set of built-in icons that are used in views and the editor, but can also be referenced in hovers, the status bar, and even by extensions. Examples are the icons in filter action buttons and view icons, in the status bar, breakpoints, and the folding icons in trees and the editor.

A product icon theme allows an extension to redefine these icons to give VS Code a custom appearance. Not covered by product icon themes are the file icons (covered by file icon themes) and icons contributed by extensions.

VS Code requires the icons to be defined as glyph in an icon font and (currently) limits product icons to consist of a single color. The color used for an icon is specific to the place where it is shown and is defined by the active color theme.

## Adding a new product icon theme

To define your own product icon theme, start by creating a VS Code extension and add the `productIconThemes` contribution point to the extension's `package.json`.

```json
{
  "contributes": {
    "productIconThemes": [
      {
        "id": "aliensAreBack",
        "label": "Aliens Are Back",
        "path": "./producticons/aliens-product-icon-theme.json"
      }
    ]
  }
}
```

The `id` is the identifier for the product icon theme. It is used in the settings, so make it unique but also readable. `label` is shown in the product icon theme picker dropdown. The `path` points to a file in the extension that defines the icon set. If your file name follows the `*product-icon-theme.json` name scheme, you will get completion support and hovers when editing the product icon theme file in VS Code.

## Product icon definition file

The product icon definition file is a JSON file defining one or more icon fonts and a set of icon definitions.

### Font definitions

The `fonts` section lets you declare any number of glyph fonts that you want to use, but must define at least one font definition.

These fonts can later be referenced in the icon definitions. The font declared first will be used as the default if an icon definition does not specify a font ID.

Copy the font file into your extension and set the path accordingly.

It is recommended that you use [WOFF](https://developer.mozilla.org/docs/Web/Guide/WOFF) fonts.

- Set 'woff' as the format.
- The weight property values are defined [here](https://developer.mozilla.org/docs/Web/CSS/font-weight#Values).
- The style property values are defined [here](https://developer.mozilla.org/docs/Web/CSS/@font-face/font-style#Values).

```json
{
  "fonts": [
    {
      "id": "alien-font",
      "src": [
        {
          "path": "./alien.woff",
          "format": "woff"
        }
      ],
      "weight": "normal",
      "style": "normal"
    }
  ]
}
```

### Icon definitions

VS Code defines a list of icon IDs through which the icons are referenced by the views. The product icon's `iconDefinitions` section assigns new icons to these IDs.

Each definition uses `fontId` to reference one of the fonts defined in the `fonts` section. If `fontId` is omitted, the first font listed in  the font definitions is taken.

```json
{
  "iconDefinitions": {
    "dialog-close": {
      "fontCharacter": "\\43",
      "fontId": "alien-font"
    },
  }
}
```

A list of all icon identifiers can be found in the [icon reference](/api/references/icons-in-labels#icon-listing).

## Develop and test

VS Code has built-in editing support for the `package.json` file as well as for product icon theme files. To get that, your theme file name needs to end with `product-icon-theme.json`. This enables code completion on all properties including the known icon IDs as well as hovers and validation.

To try out a product icon theme, open the extension folder in VS Code and press `kb(workbench.action.debug.start)`. This will run the extension in an extension development host window. The window has your extension enabled and the extension will automatically switch to the first product icon theme.

Also, the theme file is watched for changes and updates to the icons will be applied automatically whenever the theme file is modified. As you work on the product icon definition file, you will see the changes live on save.

To switch between product icon themes, use the command **Preferences: Product Icon Theme**.

To find out which icon is used at a certain location in the VS Code UI, open Developer Tools by running **Help > Toggle Developer Tools** and then:

- Click on the Developer Tools inspect tool in the upper left.
- Move the mouse over the icon to inspect.
- If the icon's class name is `codicon.codicon-remote`, then the icon ID is `remote`.

![dev tools inspect tool](images/product-icon-theme/dev-tool-select-tool.png)

## Sample

The [Product Color Theme sample](https://github.com/microsoft/vscode-extension-samples/tree/main/product-icon-theme-sample) can be used as a playground.
