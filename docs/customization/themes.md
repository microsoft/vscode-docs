---
Order: 6
Area: customization
TOCTitle: Themes
PageTitle: Visual Studio Code Themes
DateApproved: 10/12/2015
MetaDescription: How to add a new color theme
---

# Changing the Color Theme

## Selecting the Color Theme
There are several out-of-the-box color themes in VS Code for you to try out.

1. Open the Color Theme picker with `File | Preferences | Color Theme`.
2. Use the cursor keys to preview the colors of the theme.
3. Select the theme you want and hit `kbstyle(Enter)`.

![Themes in the Command Palette](images/themes/colorthemes.png)

## Adding a Theme
You can also add new TextMate theme files (.tmTheme) to your VS Code installation.

[ColorSublime](http://colorsublime.com) has hundreds of existing TextMate themes to choose from.  Pick a theme you like and copy the Download link to use in the Yeoman generator e.g. http://colorsublime.com/theme/download/40781.  The 'code' generator will prompt you for the URL or file location of the .tmTheme file, the theme name as well as other information for the theme.

![yo code theme](images/themes/yocodetheme.png)

Copy the generated theme folder to a new folder under `.vscode/extensions` and restart VS Code.

Open the Color Theme picker theme with `File | Preferences | Color Theme` and you can see your theme in the dropdown.  Arrow up and down to see a live preview of your theme.

![my theme](images/themes/mytheme.png)

## Next Steps
Read on to find out about:  

* [Customization](/docs/customization/overview.md) - Themes, settings and keyboard bindings
* [Colorizers and Bracket Matchers](/docs/customization/colorizer.md) - Learn how to import TextMate colorizers

## Common Questions
  Nothing yet 
