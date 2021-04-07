---
Order: 7
Area: languages
TOCTitle: Markdown
ContentId: 47A8BA5A-A103-4B61-B5FB-185C15E54C52
PageTitle: Markdown editing with Visual Studio Code
DateApproved: 3/31/2021
MetaDescription: Get the best out of Visual Studio Code for Markdown
---
# Markdown and Visual Studio Code

Working with Markdown files in Visual Studio Code is simple, straightforward, and fun. Besides VS Code's basic editing, there are a number of Markdown specific features that will help you be more productive.

## Markdown extensions

In addition to the functionality VS Code provides out of the box, you can install an extension for greater functionality.

<div class="marketplace-extensions-markdown-curated"></div>

> Tip: Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

## Markdown preview

VS Code supports Markdown files out of the box. You just start writing Markdown text, save the file with the .md extension and then you can toggle the visualization of the editor between the code and the preview of the Markdown file; obviously, you can also open an existing Markdown file and start working with it. To switch between views, press `kb(markdown.showPreview)` in the editor. You can view the preview side-by-side (`kb(markdown.showPreviewToSide)`) with the file you are editing and see changes reflected in real-time as you edit.

Here is an example with a very simple file.

![Markdown Preview](images/Markdown/preview.png)

>**Tip:** You can also right-click on the editor Tab and select **Open Preview** (`kb(markdown.showPreview)`) or use the **Command Palette** (`kb(workbench.action.showCommands)`) to run the **Markdown: Open Preview to the Side** command (`kb(markdown.showPreviewToSide)`).

### Dynamic previews and preview locking

By default, Markdown previews automatically update to preview the currently active Markdown file:

![The preview automatically switching to preview the current Markdown document](images/Markdown/md-dynamic-preview.gif)

You can lock a Markdown preview using the **Markdown: Toggle Preview Locking** command to keep it locked to its current Markdown document. Locked previews are indicated by **[Preview]** in the title:

![A locked markdown preview](images/Markdown/locked-preview-title.png)

### Editor and preview synchronization

VS Code automatically synchronizes the Markdown editor and the preview panes. Scroll the Markdown preview and the editor is scrolled to match the preview's viewport. Scroll the Markdown editor and the preview is scrolled to match its viewport:

![Markdown Preview editor selection scroll sync](images/Markdown/preview-scroll-sync.gif)

You can disable scroll synchronization using the `markdown.preview.scrollPreviewWithEditor` and `markdown.preview.scrollEditorWithPreview` [settings](/docs/getstarted/settings.md).

The currently selected line in the editor is indicated in the Markdown preview by a light gray bar in the left margin:

![Markdown Preview editor line marker](images/Markdown/preview-selection-marker.png)

Additionally, double clicking an element in the Markdown preview will automatically open the editor for the file and scroll to the line nearest the clicked element.

![Markdown Preview double click switches to editor](images/Markdown/double-click-preview-switch.gif)

## Outline view

The Outline view is a separate section in the bottom of the File Explorer. When expanded, it will show the symbol tree of the currently active editor. For Markdown files, the symbol tree is the Markdown file's header hierarchy.

![Markdown Outline view](images/Markdown/markdown-outline-view.png)

The Outline view is a great way to review your document's header structure and outline.

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

![markdown security alert](images/Markdown/security-alert.png)

You can change what content is allowed in the Markdown preview by clicking on this popup or running the **Markdown: Change preview security settings** command in any Markdown file:

![markdown security selector](images/Markdown/security-selector.png)

The Markdown preview security settings apply to all files in the workspace.

Here are the details about each of these security levels:

### Strict

This is the default setting. Only loads trusted content and disables script execution. Blocks `http` images.

It is strongly recommended that you keep `Strict` security enabled unless you have a very good reason to change it AND you trust all markdown files in the workspace.

### Allow insecure content

Keeps scripts disabled but allows content to be loaded over `http`.

### Disable

Disables additional security in the preview window. This allows script execution and also allows content to be loaded over `http`.

## Snippets for Markdown

There are several built-in Markdown snippets included in VS Code - press `kb(editor.action.triggerSuggest)` (Trigger Suggest) and you get a context specific list of suggestions.

>**Tip:** You can add in your own User Defined Snippets for Markdown. Take a look at [User Defined Snippets](/docs/editor/userdefinedsnippets.md) to find out how.

## Compiling Markdown into HTML

VS Code integrates with Markdown compilers through the integrated [task runner](/docs/editor/tasks.md). We can use this to compile `.md` files into `.html` files. Let's walk through compiling a simple Markdown document.

### Step 1: Install a Markdown compiler

For this walkthrough, we use the popular [Node.js](https://nodejs.org) module, [markdown-it](https://github.com/markdown-it/markdown-it).

```bash
npm install -g markdown-it
```

> **Note:** There are many Markdown compilers to choose from beyond **markdown-it**. Pick the one that best suits your needs and environment.

### Step 2: Create a simple MD file

Open VS Code on an empty folder and create a `sample.md` file.

> **Note:** You can open a folder with VS Code by either selecting the folder with **File** > **Open Folder** or navigating to the folder and typing 'code .' at the command line.

Place the following source code in that file:

```markdown
# Hello Markdown in VS Code!

This is a simple introduction to compiling Markdown in VS Code.

Things you'll need:

* [Node.js](https://nodejs.org)
* [markdown-it](https://www.npmjs.com/package/markdown-it)
* [tasks.json](/docs/editor/tasks.md)

## Section Title

> This block quote is here for your information.
```

### Step 3: Create tasks.json

The next step is to set up the task configuration file `tasks.json`. To do this, run **Terminal** > **Configure Tasks** and click **Create tasks.json file from templates**. VS Code then presents a list of possible `tasks.json` templates to choose from. Select **Others** since we want to run an external command.

This generates a `tasks.json` file in your workspace `.vscode` folder with the following content:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "echo",
            "type": "shell",
            "command": "echo Hello"
        }
    ]
}
```

To use **markdown-it** to compile the Markdown file, change the contents as follows:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Compile Markdown",
            "type": "shell",
            "command": "markdown-it sample.md -o sample.html",
            "group": "build"
        }
    ]
}
```

> **Tip:** While the sample is there to help with common configuration settings, IntelliSense is available for the `tasks.json` file as well to help you along. Use `kb(editor.action.triggerSuggest)` to see the available settings.

### Step 4: Run the Build Task

Since in more complex environments there can be more than one build task we prompt you to pick the task to execute after pressing `kb(workbench.action.tasks.build)` (**Run Build Task**). In addition, we allow you to scan the output for compile problems. Since we only want to convert the Markdown file to HTML select **Never scan the build output** from the presented list.

At this point, you should see an additional file show up in the file list `sample.html`.

If you want to make the **Compile Markdown** task the default build task to run execute **Configure Default Build Task** from the global **Terminal** menu and select **Compile Markdown** from the presented list. The final `tasks.json` file will then look like this:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Compile Markdown",
            "type": "shell",
            "command": "markdown-it sample.md -o sample.html",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

## Automating Markdown compilation

Let's take things a little further and automate Markdown compilation with VS Code. We can do so with the same task runner integration as before, but with a few modifications.

### Step 1: Install Gulp and some plug-ins

We use [Gulp](https://gulpjs.com/) to create a task that automates Markdown compilation. We also use the [gulp-markdown](https://www.npmjs.com/package/gulp-markdown) plug-in to make things a little easier.

We need to install gulp both globally (`-g` switch) and locally:

```
npm install -g gulp
npm install gulp gulp-markdown-it
```

> **Note:** gulp-markdown-it is a Gulp plug-in for the **markdown-it** module we were using before. There are many other Gulp Markdown plug-ins you can use, as well as plug-ins for Grunt.

You can test that your gulp installation was successful by typing `gulp -v`. You should see a version displayed for both the global (CLI) and local installations.

### Step 2: Create a simple Gulp task

Open VS Code on the same folder from before (contains `sample.md` and `tasks.json` under the `.vscode` folder), and create `gulpfile.js` at the root.

Place the following source code in that file:

```javascript
var gulp = require('gulp');
var markdown = require('gulp-markdown-it');

gulp.task('markdown', function() {
    return gulp.src('**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }));
});

gulp.task('default', function() {
    return gulp.watch('**/*.md', gulp.series(['markdown']));
});
```

What is happening here?

1. We are watching for changes to any Markdown file in our workspace, i.e. the current folder open in VS Code.
2. We take the set of Markdown files that have changed, and run them through our Markdown compiler, i.e. `gulp-markdown-it`.
3. We now have a set of HTML files, each named respectively after their original Markdown file. We then put these files in the same directory.

### Step 3: Run the gulp default Task

To complete the tasks integration with VS Code, we will need to modify the task configuration from before to run the default Gulp task we just created. You can either delete the `tasks.json` file or empty it only keeping the `"version": "2.0.0"` property. Now execute **Run Task** from the global **Terminal** menu. Observe that you are presented with a picker listing the tasks defined in the gulp file. Select **gulp: default** to start the task. We allow you to scan the output for compile problems. Since we only want to convert the Markdown file to HTML select **Never scan the build output** from the presented list. At this point, if you create and/or modify other Markdown files, you see the respective HTML files generated and/or changes reflected on save. You can also enable [Auto Save](/docs/editor/codebasics.md#saveauto-save) to make things even more streamlined.

If you want to make the **gulp: default** task the default build task executed when pressing `kb(workbench.action.tasks.build)` run **Configure Default Build Task** from the global **Terminal** menu and select **gulp: default** from the presented list. The final `tasks.json` file will then look like this:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "gulp",
            "task": "default",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

### Step 4: Terminate the gulp default Task

The **gulp: default** task runs in the background and watches for file changes to Markdown files. If you want to stop the task, you can use the **Terminate Task** from the global **Terminal** menu.

## Next steps

Read on to find out about:

* [CSS, SCSS, and Less](/docs/languages/css.md) - Want to edit your CSS? VS Code has great support for CSS, SCSS, and Less editing.

## Common questions

### Is there spell checking?

Not installed with VS Code but there are spell checking extensions. Check the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) to look for useful extensions to help with your workflow.

### Does VS Code support GitHub Flavored Markdown?

No, VS Code targets the [CommonMark](https://commonmark.org) Markdown specification using the [markdown-it](https://github.com/markdown-it/markdown-it) library. GitHub is moving toward the CommonMark specification which you can read about in this [update](https://github.blog/2017-03-14-a-formal-spec-for-github-markdown/).

### In the walkthrough above, I didn't find the Configure Task command in the Command Palette?

You may have opened a file in VS Code rather than a folder. You can open a folder by either selecting the folder with **File** > **Open Folder** or navigating to the folder and typing 'code .' at the command line.
