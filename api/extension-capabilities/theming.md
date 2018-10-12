---
Order: 3
Area: extension-capabilities
TOCTitle: Theming
PageTitle: Theming
---

# Theming VS Code extension

In VS Code, there are two types of themes:

- Color Theme: A mapping from both UI Component Identifier and Text Token Identifier to color codes. Color theme allows you to apply your favorite colors to both VS Code UI Components and the text in the editor.
- Icon Theme: A mapping from file type / file name to images. The file icon is displayed across the VS Code UI in places such as File Explorer, Quick Open List and Editor Tab.

Additionally, there is an API [`vscode.TextEditor.setDecorations`](/api/references/vscode-api#TextEditor.setDecorations) that allows you to create decorations for specific ranges in a text editor.

## Color Theme

![color-theme](./images/theming/color-theme.png)

As you can see in the illustration, Color Theme defines two mappings, `color` and `tokenColors` that determine the color of UI Components and Text Tokens.

You can see how each UI Component corresponds to the color key code at the [Theme Color Reference](/api/references/theme-color) topic.

If you want to change the color of text in your editor, you need to know how the text is tokenized. VS Code provides a handy command "Developer: Inspect TM Scopes" that shows you the TextMate scopes of each syntax token in the editor.

![tm-inspector](./images/theming/tm-inspector.png)

There are also two settings, `workbench.colorCustomizations` and `editor.tokenColorCustomizations` that correspond to the `color` and `tokenColors` color theme config. They provide a quick way for you to play with colors. For example, try adding this to your user settings:

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#ff0000"
  },
  "editor.tokenColorCustomizations": {
    "comments": "#FF0000"
  }
}
```

![color-setting](./images/theming/color-setting.png)

## Icon Theme

Icon theme allows you to:
- Create a mapping from unique Icon Identifiers to images/font-icons
- Associate files to these unique Icon Identifiers by filenames or file language types.

![icon-theme](./images/theming/icon-theme.png)

## Text Decoration

You can refer to the [Text Decorator Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample) to learn how to create custom text decorations, such as:

![text-decoration](./images/theming/text-decoration.png)