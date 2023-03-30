---
# DO NOT TOUCH — Managed by doc writer
ContentId: 113b458a-3692-4ccf-a181-048bd572a120
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating Color Theme in Visual Studio Code
---

# Color Theme

Colors visible in the Visual Studio Code user interface fall in two categories:

- Workbench colors used in views and editors, from the Activity Bar to the Status Bar. A complete list of all these colors can be found in the [theme color reference](/api/references/theme-color).
- Syntax colors and styles used for source code in the editor. The theming of these colors is different as syntax colorization is based on TextMate grammars and TextMate themes as well as semantic tokens.

This guide will cover the different ways in which you can create themes.

## Workbench colors

The easiest way to create a new workbench color theme is to start with an existing color theme and customize it. First switch to the color theme that you want to modify, then open your [settings](/docs/getstarted/settings) and make changes to the `workbench.colorCustomizations` setting. Changes are applied live to your VS Code instance.

The following, for example, would change the color of the title bar:

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#ff0000"
  }
}
```

A complete list of all themable colors can be found in the [color reference](/api/references/theme-color).

## Syntax colors

For syntax highlighting colors, there are two approaches. You can reference an existing TextMate theme (`.tmTheme` file) from the community, or you can create your own theming rules. The easiest way is to start with an existing theme and customize it, much like in the workbench colors section above.

First switch to the color theme to customize and use the `editor.tokenColorCustomizations` [settings](/docs/getstarted/settings). Changes are applied live to your VS Code instance and no refreshing or reloading is necessary.

For example, the following would change the color of comments within the editor:

```json
{
  "editor.tokenColorCustomizations": {
    "comments": "#FF0000"
  }
}
```

The setting supports a simple model with a set of common token types such as 'comments', 'strings' and 'numbers' available. If you want to color more than that, you need to use TextMate theme rules directly, which are explained in detail in the [Syntax Highlighting guide](/api/language-extensions/syntax-highlight-guide).

## Semantic colors

Semantic highlighting is available for TypeScript and JavaScript in VS Code release 1.43. We expect it to be adopted by other languages soon.

Semantic highlighting enriches syntax coloring based on symbol information from the language service, which has more complete understanding of the project. The coloring changes appear once the language server is running and has computed the semantic tokens.

Each theme controls whether to enable semantic highlighting with a specific setting that is part of the theme definition. The style of each semantic token is defined by the theme's styling rules.

Users can override the semantic highlighting feature and colorization rules using the `editor.tokenColorCustomizations` setting:

Enable semantic highlighting for a specific theme:

```json
"editor.tokenColorCustomizations": {
    "[Material Theme]": {
        "semanticHighlighting": true
    }
},
```

Themes can define theming rules for semantic tokens as described in the [Syntax Highlighting guide](/api/language-extensions/syntax-highlight-guide#semantic-theming).

## Create a new Color Theme

Once you have tweaked your theme colors using `workbench.colorCustomizations` and `editor.tokenColorCustomizations`, it's time to create the actual theme.

1. Generate a theme file using the **Developer: Generate Color Theme from Current Settings** command from the **Command Palette**
2. Use VS Code's [Yeoman](https://yeoman.io) extension generator to generate a new theme extension:

   ```bash
   npm install -g yo generator-code
   yo code
   ```

3. If you customized a theme as described above, select 'Start fresh'.

   ![yo code theme](./images/color-theme/yocode-colortheme.png)

4. Copy the theme file generated from your settings to the new extension.

You can also use an existing TextMate theme by telling the extension generator to import a TextMate theme file (.tmTheme) and package it for use in VS Code. Alternatively, if you have already downloaded the theme, replace the `tokenColors` section with a link to the `.tmTheme` file to use.

```json
{
  "type": "dark",
  "colors": {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "editorIndentGuide.background": "#404040",
    "editorRuler.foreground": "#333333",
    "activityBarBadge.background": "#007acc",
    "sideBarTitle.foreground": "#bbbbbb"
  },
  "tokenColors": "./Diner.tmTheme"
}
```

> **Tip:** Give your color definition file the `-color-theme.json` suffix and you will get hovers, code completion, color decorators, and color pickers when editing.

> **Tip:** [ColorSublime](https://colorsublime.github.io) has hundreds of existing TextMate themes to choose from. Pick a theme you like and copy the Download link to use in the Yeoman generator or into your extension. It will be in a format like `"https://raw.githubusercontent.com/Colorsublime/Colorsublime-Themes/master/themes/(name).tmTheme"`

## Test a new Color Theme

To try out the new theme, press F5 to launch an Extension Development Host window.

There, open the Color Theme picker with **File** > **Preferences** > **Theme** > **Color Theme** and you can see your theme in the dropdown list. Arrow up and down to see a live preview of your theme.

![select my theme](images/color-theme/mytheme.png)

Changes to the theme file are applied live in the `Extension Development Host` window.

## Publishing a Theme to the Extension Marketplace

If you'd like to share your new theme with the community, you can publish it to the [Extension Marketplace](/docs/editor/extension-marketplace). Use the [vsce publishing tool](/api/working-with-extensions/publishing-extension) to package your theme and publish it to the VS Code Marketplace.

> **Tip:** To make it easy for users to find your theme, include the word "theme" in the extension description and set the `Category` to `Themes` in your `package.json`.

We also have recommendations on how to make your extension look great on the VS Code Marketplace, see [Marketplace Presentation Tips](/api/references/extension-manifest#marketplace-presentation-tips).

## Adding a new Color ID

Color IDs can also be contributed by extensions through the [color contribution point](/api/references/contribution-points#contributes.colors). These colors also appear when using code complete in the `workbench.colorCustomizations` settings and the color theme definition file. Users can see what colors an extension defines in the [extension contributions](/docs/editor/extension-marketplace#_extension-details) tab.

## Further reading

- [CSS Tricks - Creating a VS Code theme](https://css-tricks.com/creating-a-vs-code-theme/)
