---
# DO NOT TOUCH — Managed by doc writer
ContentId: 37b6ae0a-d1b5-48b6-9bd4-9b50ef11d573
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to add custom themes for colors and icons in Visual Studio Code.
---

# Theming

In Visual Studio Code, there are three types of themes:

- **Color Theme**: A mapping from both UI Component Identifier and Text Token Identifier to colors. Color theme allows you to apply your favorite colors to both VS Code UI Components and the text in the editor.
- **File Icon Theme**: A mapping from file type / file name to images. File icons are displayed across the VS Code UI in places such as File Explorer, Quick Open List, and Editor Tab.
- **Product Icon Theme**: A set of icons used throughout the UI, from the Side bar, the Activity bar, status bar to the editor glyph margin.

## Color Theme

![color-theme](images/theming/color-theme.png)

As you can see in the illustration, Color Theme defines colors for UI components as well as for highlighting in the editor:

- The `colors` mapping that controls colors for UI Components.
- The `tokenColors` define the color and styles for highlighting in the editor. The [Syntax Highlight guide](/api/language-extensions/syntax-highlight-guide) has more information on that topic.
- The `semanticTokenColors` mappings as well as the `semanticHighlighting` setting allow to enhance the highlighting in the editor. The [Semantic Highlight guide](/api/language-extensions/semantic-highlight-guide) explains the APIs related to that.

We have a [Color Theme guide](/api/extension-guides/color-theme) and a [Color Theme sample](https://github.com/microsoft/vscode-extension-samples/tree/main/theme-sample) that illustrates how to create a theme.

## File Icon Theme

File icon themes allow you to:

- Create a mapping from unique file icon identifiers to images or font icons.
- Associate files to these unique file icon identifiers by filenames or file language types.

The [File Icon Theme guide](/api/extension-guides/file-icon-theme) discusses how to create a File Icon Theme.
![file-icon-theme](images/theming/file-icon-theme.png)

## Product Icon Theme

Product icon themes allow you to:

Redefine all the built-in icons used in the workbench. Examples are the icons in filter action buttons and view icons, in the status bar, breakpoints and the folding icons in trees and the editor.

The [Product Icon Theme guide](/api/extension-guides/product-icon-theme) discusses how to create a Product Icon Theme.
