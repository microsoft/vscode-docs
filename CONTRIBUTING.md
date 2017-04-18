# Visual Studio Code Documentation

You've found the GitHub repository that houses the source for the VS Code docs at <https://code.visualstudio.com/docs>.

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

## Contributing

To contribute to [VS Code documentation](https://code.visualstudio.com/docs), you need to fork this repository and submit a pull request for the Markdown and/or image changes that you're proposing.

## Documentation intent

The goal of the VS Code documentation is to educate users on VS Code features and how VS Code can be used to enhance their development experience with different programming languages and runtimes.

The documentation is not intended to provide:

* An introduction to coding or software development
* Tutorials on technologies independent from VS Code
* Promotion of third-party tools, plug-ins or services
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
* \extensions
* \extensionAPI
* \other
* \supporting

Within these folders you'll find the Markdown files used for the content. Each of these folders also contains an \images folder that references the images (such as screenshots) used in the topics.

### Branches

We recommend that you create local working branches that target a specific scope of change (and then submit a pull request when your changes are ready). Each branch should be limited to a single concept/topic both to streamline work flow and reduce the possibility of merge conflicts.  The following efforts are of the appropriate scope for a new branch:

* A new topic (and associated images).
* Spelling and grammar edits on a topic.
* Applying a single formatting change across a large set of topics.

## Authoring tools

[Visual Studio Code](https://code.visualstudio.com) is a great editor for Markdown!

In fact, VS Code itself is developed using VS Code and the core documentation is authored using VS Code.

## How to use Markdown to format your topic

The topics in this repository use Markdown.  Here is a good overview of [Markdown basics](https://help.github.com/articles/markdown-basics/).

## Topic Metadata

Topic metadata enables certain functionalities for the topics such as table of contents order, topic descriptions, and online search optimization as well as aiding Microsoft in evaluating the effectiveness of the content.

* **Order** - This is the order that is used in the left rail TOC, the page is left out of the TOC if this is blank
* **Area** - General area within VS Code
* **TOCTitle** - The title used in the left rail Table of Contents for this page
* **PageTitle** - The title used in the HTML title for the page and in search results
* **DateApproved** - This is set when the page is actually published on the VS Code portal. You can ignore it.
* **MetaDescription** - The meta description for this page which helps for search
* **MetaTags** - Further tags for this page again for search

## Formatting

### Headings & Right Nav

H2 subheadings `##` end up in the right hand jump list for the document (this happens in our compile script).  It's a good idea to include h2 subheadings to help users get an overview of the doc and quickly navigate to the major topics.

### Text formatting

Use bold for VS Code commands and UI elements.

    **Extensions: Install Extension**
    **Debug Console**

Limit the use of bold for emphasis unless it is crucial to get the user's attention.

Use Markdown highlight for settings, filename and JSON attributes.

    `files.exclude`
    `tasks.json`
    `preLaunchTask`

Use '>' to show menu sequence.

    **File** > **Preferences** > **Settings**
    **View** > **Command Palette**

### Links

For links within our own documentation, use a site relative link like `/docs/editor/codebasics.md`.

>For example: `[Why VS Code](/docs/editor/whyvscode.md)` - links to the **Why Visual Studio Code** page

<strike>>**Caution:** Do not include the .md file extension.</strike>
>**Correction:** For this repo to ease content development you should add the .md suffix.  We will parse these out for the website deployment.

### Bookmarks

To provide links to h2 subheadings (Markdown ##), the format is `[Link Text](page#subheading-title)`.

Note the subheading title is lowercase and subheading title words are separated by '-' dashes.

>For example: `[More on documentation intent](#documentation-intent)` - links to the **Documentation intent** subheading above.

### Images

Images are important to bring the product to life - even if people can't try the product these really help them see what they are missing.

For images you're adding to the repo, store them in the `images` subfolder of the TOC section, for example: `editor\images\debugging`.

When you link to an image, the path and filename are case-sensitive.  The convention is for image filenames to be all lowercase.

>For example: `![Debug Breakpoints](images/debugging/breakpoints.png)`

### Key bindings

The VS Code portal is able to show the correct key bindings depending on the reader's operating system (Mac, Windows or Linux).

To enable this for keyboard shortcuts, use the format `kb(workbench.action.files.openFile)` where the command name is included in parentheses.

>For a list of key bindings and the relevant `Command Ids` review the [key bindings document](https://code.visualstudio.com/docs/getstarted/keybindings).

If you are listing out multiple key bindings, you can use a table.

>Shortcut|Key Strokes
>--------|-----------
>Cut|`kb(editor.action.clipboardCutActionn)`
>Copy|`kb(editor.action.clipboardCopyAction)`
>Paste|`kb(editor.action.clipboardPasteActionn)`

### Source Code

For source code we use the fenced code block notation ```` ``` ````.

>**Note:** To get colorization, add a language modifier e.g. ```` ```json ```` or ```` ```javascript ````.

Some JavaScript code...

```javascript
function fancyAlert(arg) {
	if(arg) {
		$.facebox({div:foo})
	}
}
```