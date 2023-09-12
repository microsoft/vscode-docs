# Visual Studio Code Documentation

You've found the GitHub repository that contains the source for the Visual Studio Code documentation at <https://code.visualstudio.com/docs>.

## Contribute to VS Code documentation

Thank you for your interest in VS Code documentation!

* [Contributing](#contributing)
* [Documentation intent](#documentation-intent)
* [Repository organization](#repository-organization)
* [Branches](#branches)
* [Authoring Tools](#authoring-tools)
* [How to use Markdown to format your topic](#how-to-use-markdown-to-format-your-topic)
* [Topic Metadata](#topic-metadata)
* [Formatting](#formatting)

>**Note**: Before submitting a pull request, especially for rendering or link issues, please review the content on the official VS Code website, [code.visualstudio.com](https://code.visualstudio.com). The element in question may render correctly after processing by the website build.

## Contributing

To contribute to [VS Code documentation](https://code.visualstudio.com/docs), you need to fork this repository and submit a pull request for the Markdown and/or image changes that you're proposing.

* [How to fork a repository](https://docs.github.com/get-started/quickstart/fork-a-repo)
* [How to make a pull request](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
* [Changing a commit message](https://docs.github.com/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message)
* [How to squash commits](https://docs.github.com/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits)

The vscode-docs repository supports [Git LFS](https://git-lfs.github.com/) to allow you to avoid bringing down large image files when you clone the repository. See the [README](README.md#contributing) section for details on enabling Git LFS for your local repository.

## Documentation intent

The goal of the VS Code documentation is to educate users on VS Code features and how VS Code can be used to enhance their development experience with different programming languages and runtimes.

The documentation is not intended to provide:

* An introduction to coding or software development
* Tutorials on technologies independent from VS Code
* Promotion of third-party tools, plug-ins, or services
* Excessive detail or advanced walkthroughs

The documentation should target developers learning to use VS Code or searching for quick answers to commonly asked questions.  Other forums such as blog posts can provide more detailed content elaborating on specific scenarios.

## Repository organization

The content in this repository follows the organization of documentation at <https://code.visualstudio.com/docs>.

This repository contains the following folders:

* \setup
* \introvideos
* \getstarted
* \editor
* \languages
* \nodejs
* \typescript
* \python
* \java
* \azure
* \other
* \supporting

Within these folders, you'll find the Markdown files used for the content. Each of these folders also contains an `\images` folder that references the images (such as screenshots) used in the topics.

### Branches

We recommend that you create local working branches that target a specific scope of change (and then submit a pull request when your changes are ready). Each branch should be limited to a single concept/topic, both to streamline workflow, and to reduce the possibility of merge conflicts.  The following efforts are of the appropriate scope for a new branch:

* A new topic (and associated images).
* Spelling and grammar edits on a topic.
* Applying a single formatting change across a large set of topics.

## Authoring tools

[Visual Studio Code](https://code.visualstudio.com) is a great editor for Markdown!

In fact, VS Code and its core documentation are written using VS Code.

## How to use Markdown to format your topic

The topics in this repository use Markdown.  Here is a good overview of [Markdown basics](https://docs.github.com/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## Topic Metadata

Topic metadata enables certain functionalities for the topics such as table of contents order, topic descriptions, and online search optimization as well as aiding Microsoft in evaluating the effectiveness of the content.

* **Order** - This is the order that is used in the left rail TOC, the page is left out of the TOC if this is blank.
* **Area** - General area within VS Code. Corresponds to the high-level Table of Contents (TOC) node.
* **TOCTitle** - The title used in the left rail Table of Contents for this page.
* **PageTitle** - The title used in the HTML title for the page and in search results.
* **ContentId** - A GUID that uniquely identifies the topic to DevDiv doc reporting.
* **DateApproved** - The date of the most recent update or review. It is displayed at the bottom of an article to indicate freshness. The date should be updated in a significant PR.
* **MetaDescription** - The meta description for this page, which helps for search. Use sentence structure limited to 300 characters.
* **MetaSocialImage** - Optional. Used for og:image in page header for sharing on social media. Should be 1024 x 512 .png.
* **MetaTags** - Optional. Further tags for this page again for search.

## Product name

Use the full product name "Visual Studio Code" in the topic MetaDescription and the first use in a topic. You can use the shortened "VS Code" after that throughout the rest of the content. Do not use "VSCode" (no space) or "Code".

### Metadata for /api docs

**For Writer**:

* **MetaDescription** - The meta description for this page, which helps for search.

**For Doc Maintainer**:

* **DateApproved** - This is set when the page is published on the VS Code website.

## File and Folder names

Use lowercase for file and folder names and dashes `-` as separators.

For example:

* `/docs/editor/workspace-trust.md`
* `/docs/supporting/troubleshoot-terminal-launch.md`
* `/api/extension-guides/custom-editors.md`

### Moving or renaming content

Before moving or renaming content, a redirect should be added in case people have bookmarked the topic. Redirects are added in the private website repo.

It seems to improve CSAT if, when a topic title or intent is changed, the filename is also updated. resulting in a new, more appropriate URL.

For example: `/docs/editor/extension-gallery.md` -> `/docs/editor/extension-marketplace.md`

### sitemap

The code.visualstudio.com sitemap is authored in `/build/sitemap.xml` and should be updated when new topics are added or existing content moved or renamed.

## Formatting

### Headings & Right Nav

H2 subheadings `##` end up in the right-hand jump list for the document (the jump list is created by our compile script).  It's a good idea to include h2 subheadings to help users get an overview of the doc and quickly navigate to the major topics.

### Text formatting

Use bold for VS Code commands and UI elements.

    **Extensions: Install Extension**
    **Debug Console**

Limit the use of bold for emphasis unless it is crucial to get the user's attention. Avoid the use of italics for emphasis since italics doesn't render well on the code.visualstudio.com site.

Use inline code formatting (backticks) for settings, filename, and JSON attributes.

    `files.exclude`
    `tasks.json`
    `preLaunchTask`

Use '>' to show menu sequence.

    **File** > **Preferences** > **Settings**
    **View** > **Command Palette**

### Links

For links within our own documentation, use a site relative link like `/docs/editor/codebasics.md`.

>For example: `[Why VS Code](/docs/editor/whyvscode.md)` - links to the **Why Visual Studio Code** page

>**Note:** For navigation on GitHub, you should add the .md suffix.  The suffix is removed during conversion to HTML.

### Bookmarks

To provide links to h2 subheadings (Markdown ##), the format is `[Link Text](page.md#subheading-title)`.

Note the subheading title is lowercase and subheading title words are separated by '-' hyphens.

>For example: `[Keyboard Shortcuts](/docs/editor/codebasics.md#keyboard-shortcuts)` - links to https://code.visualstudio.com/docs/editor/codebasics#_keyboard-shortcuts.

### Images

Images are important to bring the product to life and clarify the written content.

For images you're adding to the repo, store them in the `images` subfolder of the TOC section, for example: `editor\images\debugging`.

When you link to an image, the path and filename are case-sensitive. The convention is for image filenames to be all lowercase and use dashes `-` for separators.

>For example: `![Debug Breakpoints](images/debugging/breakpoints-view.png)`

### Key bindings

The VS Code website is able to show the correct key bindings depending on the reader's operating system (macOS, Windows, or Linux).

To enable this for keyboard shortcuts, use the format `kb(workbench.action.files.openFile)` where the command identifier is included in parentheses.

>For a list of key bindings and the relevant `Command Ids`, review the [key bindings document](https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts).

If you are listing out multiple key bindings, you can use a table.

>Shortcut|Key Strokes
>--------|-----------
>Cut|`kb(editor.action.clipboardCutAction)`
>Copy|`kb(editor.action.clipboardCopyAction)`
>Paste|`kb(editor.action.clipboardPasteAction)`

### Source Code

For source code, we use the fenced code block notation ```` ``` ````.

>**Note:** You can add an optional language identifier to enable syntax highlighting in your fenced code block. For example, ```` ```json ```` or ```` ```javascript ````. [Read more →](https://docs.github.com/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks#syntax-highlighting)

An example of JavaScript source code:

```javascript
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: foo });
  }
}
```

## Gotchas

### Double opening curly braces break generated handlebar files

Escape double opening curly braces in code blocks.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Hello, Flask</title>
    </head>
    <body>
        <strong>Hello there, \{{ name }}!</strong> It's \{{ date.strftime("%A, %d %B, %Y at %X") }}.
    </body>
</html>
```
