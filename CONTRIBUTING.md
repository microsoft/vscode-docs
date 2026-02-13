# Visual Studio Code Documentation

You've found the GitHub repository that contains the source for the Visual Studio Code documentation at <https://code.visualstudio.com/docs>.

## Contribute to VS Code documentation

Thank you for your interest in VS Code documentation!

* [Prerequisites](#prerequisites)
* [Quick Start](#quick-start)
* [Contributing](#contributing)
* [Testing Your Changes](#testing-your-changes)
* [Documentation intent](#documentation-intent)
* [Repository organization](#repository-organization)
* [Branches](#branches)
* [Authoring Tools](#authoring-tools)
* [How to use Markdown to format your topic](#how-to-use-markdown-to-format-your-topic)
* [Topic Metadata](#topic-metadata)
* [Formatting](#formatting)

> [!IMPORTANT]
> Before submitting a pull request, especially for rendering or link issues, please review the content on the official VS Code website, [code.visualstudio.com](https://code.visualstudio.com). The element in question may render correctly after processing by the website build.

## Prerequisites

Before you start contributing, make sure you have:

* **Git** installed and configured on your machine
* **Git LFS** enabled - this repository uses Git LFS for managing images. See the [Git LFS setup section](#git-lfs-setup) below.
* **A GitHub account** to fork the repository and submit pull requests

### Git LFS setup

> [!IMPORTANT]
> Make sure you have Git LFS enabled on your machine before cloning the repository!

The vscode-docs repository uses [Git LFS](https://git-lfs.github.com/) to manage large image files efficiently. Without Git LFS, you'll download placeholder files instead of actual images.

1. Install Git LFS from [git-lfs.github.com](https://git-lfs.github.com/)
2. Set up Git LFS in your environment:
   ```bash
   git lfs install
   ```
3. Clone or pull the repository - Git LFS will automatically handle the image files

## Quick Start

For simple edits like fixing typos or updating a few lines:

1. Navigate to the file on GitHub (for example, browse to `https://github.com/microsoft/vscode-docs/blob/main/docs/editing/codebasics.md`)
2. Select the **Edit** button (pencil icon) in the top right
3. Make your changes in GitHub's web editor
4. Scroll down and add a descriptive commit message
5. Select **Commit changes** to create a branch and start a pull request

For more substantial contributions, follow the complete [Contributing](#contributing) workflow below.

## Contributing

To contribute to [VS Code documentation](https://code.visualstudio.com/docs), follow these steps:

### Step 1: Fork and clone the repository

1. [Fork the `vscode-docs` repository](https://github.com/microsoft/vscode-docs) to your GitHub account
2. Clone your fork to your local machine:

   ```bash
   git clone https://github.com/YOUR-USERNAME/vscode-docs.git
   cd vscode-docs
   ```

3. Add the upstream repository as a remote:

   ```bash
   git remote add upstream https://github.com/microsoft/vscode-docs.git
   ```

### Step 2: Create a branch

Create a new branch for your changes. Use a descriptive name that reflects your contribution:

```bash
git checkout -b fix/update-debugging-docs
```

> [!TIP]
> Keep each branch focused on a single topic or fix. This makes reviews easier and reduces merge conflicts.

### Step 3: Make your changes

1. Make your edits to the Markdown files and images
2. Follow the [Formatting](#formatting) guidelines below
3. Review the [Documentation intent](#documentation-intent) to ensure your changes align with our goals
4. Test your changes locally if possible (see [Testing Your Changes](#testing-your-changes))

### Step 4: Commit your changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Fix typo in debugging documentation"
```

> [!TIP]
> Use GitHub Copilot to help generate commit messages! Select the sparkle icon in the Source Control view.

Learn more:

* [Changing a commit message](https://docs.github.com/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message)
* [How to squash commits](https://docs.github.com/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits)

### Step 5: Push and create a pull request

1. Push your branch to your fork:

   ```bash
   git push origin fix/update-debugging-docs
   ```

2. Go to the [vscode-docs repository](https://github.com/microsoft/vscode-docs) on GitHub
3. Select **Compare & pull request**
4. Fill out the pull request template with:
   * A clear title summarizing your changes
   * A description of what you changed and why
   * References to any related issues
5. Submit the pull request

Learn more about [making pull requests](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Testing Your Changes

### Preview locally with Docsify

You can preview the documentation site locally using [Docsify](https://docsify.js.org/). This provides a browsable site with sidebar navigation, search, and cross-linking — useful for reviewing content changes before submitting a pull request.

```bash
npm install
npm run serve
```

This starts a local server (default `http://localhost:3000`) with:

* Sidebar navigation generated from `docs/toc.json` and `api/toc.json`
* Top navbar to switch between Docs, Extension API, Blogs, and Release Notes
* Full-text search across all content

> [!NOTE]
> The local preview is **not an exact copy of the production site** at code.visualstudio.com. Custom syntax like `kb(command.id)` keybinding macros, interactive `prompt` code blocks, and some layout details will not render as they do on the production site. Use the local preview to verify content, navigation, and cross-links.

### Validate your Markdown

* Check that your Markdown is properly formatted
* Verify that all links are correct (relative paths for internal links, full URLs for external)
* Ensure images are in the correct location with proper alt text
* Test any code samples to make sure they work

### Use VS Code to help

> [!TIP]
> Use GitHub Copilot in VS Code to help you:
>
> * Write clear documentation following our style guide
> * Generate proper Markdown formatting
> * Identify potential issues in your content
> * Review your changes before submitting

## Documentation intent

The goal of the VS Code documentation is to educate users on VS Code features and how VS Code can be used to enhance their development experience with different programming languages and runtimes.

The documentation is not intended to provide:

* An introduction to coding or software development
* Tutorials on technologies independent from VS Code
* Promotion of third-party tools, plug-ins, or services
* Excessive detail or advanced walkthroughs

The documentation should target developers learning to use VS Code or searching for quick answers to commonly asked questions.  Other forums such as blog posts can provide more detailed content elaborating on specific scenarios.

## Repository organization

This repository contains the following top-level folders:

* \api - content for the API documentation at <https://code.visualstudio.com/api>
* \blogs - content for the blog at <https://code.visualstudio.com/blogs>
* \build - content for the documentation build process, such as the keybinding mappings and sitemap
* \docs - content for the documentation at <https://code.visualstudio.com/docs> - the content in this folder follows the organization of the documentation table of contents
* \images - images used in the documentation
* \learn - (deprecated) content for the education content at <https://code.visualstudio.com/learn>
* \release-notes - content for the release notes at <https://code.visualstudio.com/updates>
* \remote - content for the remote development tools documentation at <https://code.visualstudio.com/docs/remote>
* \remote-release-notes - content for the remote development tools release notes
* \wiki - content for the repository wiki

Within these folders, you'll find the Markdown files used for the content. Each of these folders also contains an `\images` folder that references the images (such as screenshots) used in the topics.

### Branches

We recommend that you create local working branches that target a specific scope of change. Each branch should be limited to a single concept or topic to streamline workflow and reduce merge conflicts.

**Appropriate scope for a new branch:**

* A new topic and associated images
* Spelling and grammar edits on a topic
* Applying a single formatting change across a large set of topics

**Branch naming suggestions:**

* `docs/add-debugging-tutorial`
* `fix/typo-in-extensions-doc`
* `update/refresh-setup-screenshots`

## Authoring tools

[Visual Studio Code](https://code.visualstudio.com) is a great editor for Markdown!

In fact, VS Code and its core documentation are written using VS Code.

## How to use Markdown to format your topic

The topics in this repository use Markdown.  Here is a good overview of [Markdown basics](https://docs.github.com/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## Topic Metadata

Topic metadata enables certain functionalities for the topics such as topic description and online search optimization.

The page title is taken from the first H1 heading in the topic.

* **ContentId** - A GUID that uniquely identifies the topic to DevDiv doc reporting.
* **DateApproved** - The date of the most recent update or review. It is displayed at the bottom of an article to indicate freshness. The date should be updated in a significant PR.
* **MetaDescription** - The meta description for this page, which helps for search. Use sentence structure limited to 300 characters.
* **MetaSocialImage** - Optional. Used for og:image in page header for sharing on social media. Should be 1024 x 512 .png.
* **MetaTags** - Optional. Further tags for this page again for search.
* **Keywords** - Optional. A list of keywords relevant to this topic to help with search.

## Table of contents

The table of contents (TOC) is defined in the `/docs/toc.yml` file. The TOC is used to generate the left rail navigation for the documentation. If a topic is not listed in the `/docs/toc.yml` file, it will not be included in the left rail navigation.

To add a new topic to the TOC, add a new entry in the `topics` attribute of the appropriate section in the `/docs/toc.yml` file. The TOC is organized into sections, each with a name and an area. The area is used to group related topics together.

The order in which the topics are listed in the `/docs/toc.yml` file determines the order in which they are displayed in the left rail navigation.

Each topic in the TOC has two attributes:

* TOC title: the title that is displayed in the left rail navigation.
* File name: the relative path to the topic file in the format `/docs/<subfolder>/<filename-without-md>`.

The following example shows a `Getting Started` section that has two topics.

```yaml
    {
      "name": "Getting Started",
      "area": "getstarted",
      "topics": [
        ["VS Code Tutorial", "/docs/getstarted/getting-started"],
        ["Copilot Quickstart", "/docs/getstarted/copilot-quickstart"]
      ]
    },
```

To create a subsection within a section, add a subsection entry to the `topics` attribute. A subsection entry has the following attributes:

* TOC Title: empty string
* File name: empty string
* Subsection: a subsection entry with the same format as a section entry. It has a `name` attribute, an `area` attribute, and a `topics` attribute.

The following example shows a `Guides` subsection with two topics, within the `GitHub Copilot` section.

```yaml
    {
      "name": "GitHub Copilot",
      "area": "copilot",
      "topics": [
        ["Overview", "/docs/copilot/overview"],
        ["Setup", "/docs/copilot/setup"],
        ["", "", {
          "name": "Guides",
          "area": "copilot/guides",
          "topics": [
            ["Test with Copilot", "/docs/copilot/guides/test-with-copilot"],
            ["Debug with Copilot", "/docs/copilot/guides/debug-with-copilot"]
          ]
        }
        ],
        ["FAQ", "/docs/copilot/faq"]
      ]
    },
```

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

When you move, rename, or remove a page, add a redirect so that existing links and bookmarks continue to work. Add an entry in the `redirection.json` file in the corresponding content folder (`docs/`, `api/`, `blogs/`, or `remote/`):

```json
[
  { "from": "/docs/editor/old-page", "to": "/docs/editor/new-page", "status": 301 }
]
```

* `from` — the old URL path (absolute, starting with `/`)
* `to` — the new URL path or an external URL (starting with `https://`)
* `status` — use `301` for permanent moves (most cases) or `302` for temporary redirects

### sitemap

The code.visualstudio.com sitemap is authored in `/build/sitemap.xml` and should be updated when new topics are added or existing content moved or renamed.

## Formatting

### Headings & Right Nav

H2 subheadings (`##`) appear in the right-hand navigation panel of documentation pages.

> [!TIP]
> Include H2 subheadings to help users quickly scan the document structure and navigate to major topics.

**Example structure:**

```markdown
# Main Topic Title (H1)

## Getting Started (H2 - appears in right nav)

### Step 1: Install (H3 - does not appear in right nav)

### Step 2: Configure (H3)

## Advanced Features (H2 - appears in right nav)
```

### Text formatting

**Bold for UI elements and commands:**

Use bold for VS Code commands and UI elements.

```markdown
**Extensions: Install Extension**
**Debug Console**
**File** > **Preferences** > **Settings**
```

> [!NOTE]
> Limit the use of bold for emphasis unless it's crucial to get the user's attention. Avoid using italics for emphasis since italics doesn't render well on the code.visualstudio.com site.

**Inline code for settings and filenames:**

Use inline code formatting (backticks) for settings, filenames, and JSON attributes.

```markdown
`files.exclude`
`tasks.json`
`preLaunchTask`
```

**Menu sequences:**

Use '>' to show menu sequences.

```markdown
**File** > **Preferences** > **Settings**
**View** > **Command Palette**
```

### Links

For links within our own documentation, use a site relative link like `/docs/editing/codebasics.md`.

>For example: `[Why VS Code](/docs/editor/whyvscode.md)` - links to the **Why Visual Studio Code** page

> [!NOTE]
> For navigation on GitHub, you should add the `.md` suffix. The suffix is removed during conversion to HTML.

### Bookmarks

To link to h2 subheadings (Markdown ##), use the format `[Link Text](page.md#subheading-title)`.

Note that the subheading title is lowercase and words are separated by '-' hyphens.

**Example:**

```markdown
[Keyboard Shortcuts](/docs/editing/codebasics.md#keyboard-shortcuts)
```

This links to <https://code.visualstudio.com/docs/editing/codebasics#_keyboard-shortcuts.

### Images

Images are important to bring the product to life and clarify the written content.

**Image location and naming:**

* Store images in the `docs/<section>/images/<article name>` subfolder. For example: `docs/sourcecontrol/images/overview`
* Use lowercase filenames with dashes (`-`) as word separators
* Link using relative paths (paths are case-sensitive)

**Example:**

```markdown
![Debug Breakpoints](images/debugging/breakpoints-view.png)
```

**Version control for images:**

* Images are cached on the server, so don't update images in-place
* Create a new file and add a version indicator (yyyymmddseq) to the filename when updating

> [!IMPORTANT]
> Make sure you have Git LFS enabled before committing images! See the [Git LFS setup](#git-lfs-setup) section.

> [!TIP]
> For detailed guidance about creating and adding screenshots, see the [Images and Screenshots](https://github.com/microsoft/vscode-docs/wiki/Style-Guide#images-and-screenshots) section in the Style Guide wiki.

### Keybindings

The VS Code website shows the correct key bindings based on the reader's operating system (macOS, Windows, or Linux).

To enable platform-specific key bindings, use the format `kb(command.id)` where the command identifier is in parentheses.

**Example:**

```markdown
Press `kb(workbench.action.files.openFile)` to open a file.
```

> [!TIP]
> For a list of key bindings and Command IDs, review the [key bindings document](https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts).

**For multiple key bindings, use a table:**

Shortcut|Key Strokes
--------|-----------
Cut|`kb(editor.action.clipboardCutAction)`
Copy|`kb(editor.action.clipboardCopyAction)`
Paste|`kb(editor.action.clipboardPasteAction)`

### Source Code

For source code, we use the fenced code block notation ```` ``` ````.

> [!NOTE]
> You can add an optional language identifier to enable syntax highlighting in your fenced code block. For example, ```` ```json ```` or ```` ```javascript ````. [Read more →](https://docs.github.com/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks#syntax-highlighting)

An example of JavaScript source code:

```javascript
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: foo });
  }
}
```

### Prompt Code Blocks

For prompts that should be interactive in the documentation, use the `prompt` code block syntax. This renders an "Open in VS Code" button on the website that launches VS Code chat and inserts the prompt in the chat input box.

There are two types of prompt code blocks:

* **`prompt`** - Opens the prompt with the default "Agent"

  ````markdown
  ```prompt
  Create a simple todo app with HTML, CSS, and JavaScript.
  ```
  ````

* **`prompt-<custom-agent>`** - Opens the prompt with a specified custom agent

  ````markdown
  ```prompt-plan
  Create a plan to add a dark/light theme toggle to the app.
  ```
  ````

Use prompt code blocks when you want readers to easily try the prompt in VS Code Chat. The prompt text should be complete and actionable.

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

## Next Steps

Ready to contribute? Here are some helpful resources:

* [VS Code Glossary](https://github.com/microsoft/vscode-docs/wiki/VS-Code-glossary) - Official terminology and capitalization
* [Style Guide](https://github.com/microsoft/vscode-docs/wiki/Style-Guide) - Detailed writing and formatting guidelines
* [Documentation Writing Instructions](.github/instructions/docs-writing.instructions.md) - Writing style and grammar guidelines
* [Blog Writing Instructions](.github/instructions/blog-writing.instructions.md) - For blog post contributions
* [Release Notes Writing Instructions](.github/instructions/release-notes-writing.instructions.md) - For release notes contributions
* [VS Code Issues](https://github.com/microsoft/vscode/issues) - The main VS Code repository for reporting documentation issues

Thank you for helping improve VS Code documentation!
