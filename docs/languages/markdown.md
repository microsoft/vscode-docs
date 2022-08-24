---
Order: 7
Area: languages
TOCTitle: Markdown
ContentId: 47A8BA5A-A103-4B61-B5FB-185C15E54C52
PageTitle: Markdown editing with Visual Studio Code
DateApproved: 8/4/2022
MetaDescription: Get the best out of Visual Studio Code for Markdown
---
# Markdown and Visual Studio Code

Working with Markdown files in Visual Studio Code is simple, straightforward, and fun. Besides VS Code's basic editing, there are a number of Markdown specific features that will help you be more productive.

## Markdown extensions

In addition to the functionality VS Code provides out of the box, you can install an extension for greater functionality.

<div class="marketplace-extensions-markdown-curated"></div>

> Tip: Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

## Editing Markdown

### Document outline

The Outline view is a separate section in the bottom of the File Explorer. When expanded, it will show the symbol tree of the currently active editor. For Markdown files, the symbol tree is the Markdown file's header hierarchy.

![Markdown Outline view](images/Markdown/markdown-outline-view.png)

The Outline view is a great way to review your document's header structure and outline.

### Snippets for Markdown

There are several built-in Markdown snippets included in VS Code - press `kb(editor.action.triggerSuggest)` (Trigger Suggest) and you get a context specific list of suggestions.

>**Tip:** You can add in your own User Defined Snippets for Markdown. Take a look at [User Defined Snippets](/docs/editor/userdefinedsnippets.md) to find out how.

### Go to header in file

Use `kb(workbench.action.gotoSymbol)` to quickly jump to a header in the current file.

You can browse through all headers in the file or start typing a header name to find just the one you are after. Once you've found the header you what, press `kbstyle(Enter)` to move your cursor to it. Press `kbstyle(Esc)` to cancel jumping to the header.

### Go to header in workspace

Use `kb(workbench.action.showAllSymbols)` to search through headers across all Markdown files in the current workspace.

Start typing a header name to filter down the list and find the header you are after.

### Path completions

Path completions help with create links to files and images. These paths are shown bu [IntelliSense](/docs/editor/intellisense.md) automatically as you type the path of an image or link, and can also be manually requested by using `kb(editor.action.triggerSuggest)`.

![Path completions in a Markdown link](images/Markdown/path-completions.png)

Paths starting with `/` are resolved relative to the current workspace root, while paths staring with `./` or without any prefix are resolved relative to the current file. Path suggestions are automatically shown when you type `/` or can be manually invoked by using `kb(editor.action.triggerSuggest)`.

Path IntelliSense can also help you link to headers within the current file or within another Markdown file. Start the path with `#` to see completions for all the headers in the file (depending on your settings, you may need to use `kb(editor.action.triggerSuggest)` to see these):

![Header section suggestions in a Markdown link](images/Markdown/path-completions-header.png)

You can disable path IntelliSense with `"markdown.suggest.paths.enabled": false`.

### Drag and drop to insert links and images

Quickly insert images and file links by dragging and dropping. To start, drag a file from VS Code's explorer over your Markdown code and then hold down `kbstyle(Shift)` to start dropping it into the file. The preview cursor shows where it will be inserted when you drop it.

![Inserting a Markdown link by dragging and dropping from the explorer](images/Markdown/drop-link.gif)

Dropped images insert a Markdown image `![](path/to/image.png)`. Dropped files insert a normal markdown link `[](path/to/file.md)`.

### Smart selection

Smart selection lets you quickly expand and shrink selection in Markdown documents. This can be used to quickly select entire block elements (such as codeblocks or tables) and to select the entire contents of a header section in the markdown file.

Smart selection uses the following comands:

* Expand: `kb(editor.action.smartSelect.expand)`
* Shrink: `kb(editor.action.smartSelect.shrink)`

Selection applies to the following, and follows a traditional hierarchical pattern:

* Headers
* Lists
* Block quotes
* Fenced code blocks
* Html code blocks
* Paragraphs

![Smart select within a Markdown document expands from a block element, to the block element containing it, to the rest of the content under a header, to the header itself](images/Markdown/smart-select.gif)

## Markdown preview

VS Code supports Markdown files out of the box. You just start writing Markdown text, save the file with the .md extension and then you can toggle the visualization of the editor between the code and the preview of the Markdown file; obviously, you can also open an existing Markdown file and start working with it. To switch between views, press `kb(markdown.showPreview)` in the editor. You can view the preview side-by-side (`kb(markdown.showPreviewToSide)`) with the file you are editing and see changes reflected in real-time as you edit.

Here is an example with a very simple file.

![Markdown Preview](images/Markdown/preview.png)

>**Tip:** You can also right-click on the editor Tab and select **Open Preview** (`kb(markdown.showPreview)`) or use the **Command Palette** (`kb(workbench.action.showCommands)`) to run the **Markdown: Open Preview to the Side** command (`kb(markdown.showPreviewToSide)`).

### Dynamic previews and preview locking

By default, Markdown previews automatically update to preview the currently active Markdown file:

![The preview automatically switching to preview the current Markdown document](images/Markdown/md-dynamic-preview.gif)

You can lock a Markdown preview using the **Markdown: Toggle Preview Locking** command to keep it locked to its current Markdown document. Locked previews are indicated by **\[Preview]** in the title:

![A locked Markdown preview](images/Markdown/locked-preview-title.png)

### Editor and preview synchronization

VS Code automatically synchronizes the Markdown editor and the preview panes. Scroll the Markdown preview and the editor is scrolled to match the preview's viewport. Scroll the Markdown editor and the preview is scrolled to match its viewport:

![Markdown Preview editor selection scroll sync](images/Markdown/preview-scroll-sync.gif)

You can disable scroll synchronization using the `markdown.preview.scrollPreviewWithEditor` and `markdown.preview.scrollEditorWithPreview` [settings](/docs/getstarted/settings.md).

The currently selected line in the editor is indicated in the Markdown preview by a light gray bar in the left margin:

![Markdown Preview editor line marker](images/Markdown/preview-selection-marker.png)

Additionally, double clicking an element in the Markdown preview will automatically open the editor for the file and scroll to the line nearest the clicked element.

![Markdown Preview double click switches to editor](images/Markdown/double-click-preview-switch.gif)

## Extending the Markdown preview

Extensions can contribute custom styles and scripts to the Markdown preview to change its appearance and add new functionality. Here's a set of example extensions that customize the preview:

<div class="marketplace-extensions-markdown-preview-curated"></div>

### Using your own CSS

You can also use your own CSS in the Markdown preview with the `"markdown.styles": []` [setting](/docs/getstarted/settings.md). This lists URLs for style sheets to load in the Markdown preview. These stylesheets can either be `https` URLs, or relative paths to local files in the current workspace.

For example, to load a stylesheet called `Style.css` at the root of your current workspace, use **File** > **Preferences** > **Settings** to bring up the workspace `settings.json` file and make this update:

```json
// Place your settings in this file to overwrite default and user settings.
{
    "markdown.styles": [
        "Style.css"
    ]
}
```

### Keep trailing whitespace in order to create line breaks

To create [hard line breaks](https://spec.commonmark.org/0.29/#hard-line-breaks), Markdown requires two or more spaces at the end of a line. Depending on your user or workspace settings, VS Code may be configured to remove trailing whitespace. In order to keep trailing whitespace in Markdown files only, you can add these lines to your `settings.json`:

```json
{
  "[markdown]": {
    "files.trimTrailingWhitespace": false
  }
}
```

## Markdown preview security

For security reasons, VS Code restricts the content displayed in the Markdown preview. This includes disabling script execution and only allowing resources to be loaded over `https`.

When the Markdown preview blocks content on a page, an alert popup is shown in the top right corner of the preview window:

![Markdown security alert](images/Markdown/security-alert.png)

You can change what content is allowed in the Markdown preview by clicking on this popup or running the **Markdown: Change preview security settings** command in any Markdown file:

![Markdown security selector](images/Markdown/security-selector.png)

The Markdown preview security settings apply to all files in the workspace.

Here are the details about each of these security levels:

### Strict

This is the default setting. Only loads trusted content and disables script execution. Blocks `http` images.

It is strongly recommended that you keep `Strict` security enabled unless you have a very good reason to change it AND you trust all Markdown files in the workspace.

### Allow insecure content

Keeps scripts disabled but allows content to be loaded over `http`.

### Disable

Disables additional security in the preview window. This allows script execution and also allows content to be loaded over `http`.

## Next steps

Read on to find out about:

* [CSS, SCSS, and Less](/docs/languages/css.md) - Want to edit your CSS? VS Code has great support for CSS, SCSS, and Less editing.

## Common questions

### Is there spell checking?

Not installed with VS Code but there are spell checking extensions. Check the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) to look for useful extensions to help with your workflow.

### Does VS Code support GitHub Flavored Markdown?

No, VS Code targets the [CommonMark](https://commonmark.org) Markdown specification using the [markdown-it](https://github.com/markdown-it/markdown-it) library. GitHub is moving toward the CommonMark specification, which you can read about in this [update](https://github.blog/2017-03-14-a-formal-spec-for-github-markdown/).

### In the walkthrough above, I didn't find the Configure Task command in the Command Palette?

You may have opened a file in VS Code rather than a folder. You can open a folder by either selecting the folder with **File** > **Open Folder** or navigating to the folder and typing 'code .' at the command line.
