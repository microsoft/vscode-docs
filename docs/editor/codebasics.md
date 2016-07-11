---
Order: 2
Area: editor
TOCTitle: The Basics
ContentId: DE4EAE2F-4542-4363-BB74-BE47D64141E6
PageTitle: The Basics of Visual Studio Code
DateApproved: 7/7/2016
MetaDescription: This topic helps you get acquainted with the Visual Studio Code user interface.
---

# The Basics of Visual Studio Code

At its heart, - Visual Studio Code (VS Code) is a code editor. Like many other code editors - it adopts a common user interface and layout of an explorer (on the left: access to all the files and folders) and editor (on the right: file contents).

In addition, there is a number of unique features in user interface (this topic describes them).


## Files, Folders & Projects

VS Code is file and folder based - you can get started immediately by opening a file or folder in it.

On top of this, VS Code can take advantage of a variety of project-files defined by various frameworks and platforms. For example: if the folder you opened in it contains one or more `package.json`, `project.json`, `tsconfig.json`, or .NET Core Visual Studio solution and project files - VS Code will provide additional functionality (such as rich IntelliSense in the editor).


## Basic Layout

VS Code comes with a simple and intuitive layout (maximizes the editor while leaving a room to browse folders or projects). The UI is divided into five areas:

* **Editor** - the main area to edit files; (up to three editors side by side)
* **Side Bar** - different views (like the Explorer) to assist with working on projects;
* **Status Bar** - information about opened project and files;
* **View Bar** (on the far left-hand side) - to switch between views and to display additional context-specific indicators; (like the number of outgoing changes - when Git is enabled)
* **Panels** (below the editor) - a region for output or debug information, errors and warnings, or an integrated terminal.

Each time you start VS Code, it opens up in the same state it was last closed. The folder, layout, and opened files - are preserved.

![VS Code Layout](images/codebasics/layout.png)

VS Code allows up to three visible editors at one time - to edit or view up to three files together side by side.

The Explorer view maintains a list of open editors - allowing you quick access to the files you need.

>**Tip:** You can move the Side Bar to the right-hand side (**View > Move Sidebar**) or toggle its visibility (`kb(workbench.action.toggleSidebarVisibility)`).

## Side by Side Editing

You can have up to three editors open side by side.

If you already have one editor open - there are multiple ways of opening another to the side of existing:

* `kbstyle(Ctrl)` (Mac: `kbstyle('Cmd')`) - click on a file in the Explorer;
* `kb(workbench.action.splitEditor)` - to split the active editor in two;
* **Open to the Side** - from the Explorer context menu for a file.

![Side by Side editing](images/codebasics/sidebyside.png)

Whenever you open another file - active editor will display the content of file. So if you have two editors open and you want to open file 'foo.cs' in the right-hand - make sure that editor is active at the moment (by clicking it).

When you have more than one editor open - you can switch between them quickly by holding the `kbstyle(Ctrl)` (Mac: `kbstyle('Cmd')`) key and pressing `kbstyle(1)`, `kbstyle(2)`, or `kbstyle(3)`.

>**Tip:** You can resize and reorder editors: drag & drop their title area.

## Explorer

The Explorer is used to browse, open, and manage all of the files and folders in your project.

After opening a folder (in VS Code) - its contents are shown by Explorer. You can do many things from here:

* Create, delete, and rename files & folders;
* Move files and folders with drag & drop;
* Use the context menu to explore all options.

>**Tip:** You can drag & drop files into Explorer from outside VS Code to copy them.

![Explorer Menu](images/codebasics/explorer_menu.png)

VS Code works very well with other tools that you might use, - especially, command-line tools: if you want to run some in context of the current folder - right-click the folder and select **Open in Command Prompt** (or **Open in Terminal** on "OS X" or "Linux").

You can also navigate to the location of a file (or folder) in the native Explorer by right-clicking it and selecting **Reveal in Explorer** (or **Reveal in Finder** on the "Mac", or **Open Containing Folder** on "Linux").

>**Tip:** Type `kb(workbench.action.quickOpen)` (**Quick Open**) to quickly search & open a file by name.

By default, VS Code excludes some folders from the explorer (e.g. - `.git`) - use the `files.exclude` [setting](/docs/customization/userandworkspace.md) to configure the corresponding rules.

>**Tip:** This is really useful to hide derived resources files (like `\*.meta` in Unity, or `\*.js` in a TypeScript project). For Unity - to exclude the `\*.cs.meta` files, the pattern to choose would be: `"**/*.cs.meta": true`; for TypeScript - you can exclude generated JavaScript for TypeScript files, with: `"**/*.js": {"when": "$(basename).ts"}`.

## Open Editors

At the top of the Explorer, there is a section **OPEN EDITORS** (a list of active files or previews) - showing what was previously opened in VS Code. For example, - a file will be listed there, if you:

* Make a change to it;
* Double-click it in explorer;
* Open it from non-current folder.

Click an item to make it active.

Once you are done with your tasks - you can remove files from the section individually or all of them by using the **View: Close All Editors** or **View: Close All Editors in Group** actions.

## Configuring the Editor

VS Code Editor options can be set globally (user settings) or per project/folder (workspace settings); values are kept in `settings.json` [file](/docs/customization/userandworkspace.md#settings-file-locations):
 
* User settings: **File > Preferences > User Settings** (or - press `kb(workbench.action.showCommands)`, type `user`, and press `Enter`).
 
* Workspace settings: **File > Preferences > Workspace Settings** (or - press `kb(workbench.action.showCommands)`, type `worksp` and press `Enter`).

>**Note for Mac-users**: On Mac, the **Preferences** menu is under **Code**, not **File**! (e.g. - **Code > Preferences > User Settings**)

You will see the VS Code [Default Settings](/docs/customization/userandworkspace.md#default-settings) in the left window and an editable `settings.json` on the right; you can review and copy them.

After editing settings - type `kb(workbench.action.files.save)` to save them, and the changes will take effect immediately.

## Save / Auto Save

By default, VS Code requires an explicit action to save your changes to disk: `kb(workbench.action.files.save)`.

However, there is a possible `Auto Save` of changes (with a configurable delay, or when focus leaves the editor) - find the appropriate in **User Settings** or **Workspace Settings**:

* `files.autoSave` - `off` | `afterDelay` | `onFocusChange`.
* `files.autoSaveDelay` - milliseconds (for `afterDelay`).

## Search Across Files

VS Code allows quick search over current folder: `kb(workbench.view.search)` - displaying file-containers, hits, and location. Select a file to list its hits; select a hit to edit it.

![A simple text search across files](images/codebasics/search.png)

>**Tip:** Regular Expressions are supported, too.

Configure advanced search options: `kb(workbench.action.search.toggleQueryDetails)`.

![Advanced search options](images/codebasics/searchadvanced.png)

In input-boxes below search-box, files can be included and excluded. Click on the toggle to the right - to enable the glob pattern syntax:

* `*` - match one or more characters, in a path segment;
* `?` - match one character, in a path segment;
* `**` - match any path segments (including none);
* `{}` - group conditions; (e.g. - `{**/*.html,**/*.txt}` match all HTML and text files)
* `[]` - declare a range of characters to match. (e.g. - `[0-9]` match `0`, `1`, … , `9`)

VS Code excludes some folders by default (reducing non-interesting results; e.g. - `node_modules`); to change it - edit settings under the `files.exclude` and `search.exclude` section.

>**Tip:** To search in a specific folder only - right-click on it and select **Find in Folder**.

## Command Palette

VS Code **Command Palette** is keyboard-accessible: type `kb(workbench.action.showCommands)` to access functionality (including shortcuts for most operations).

![Command Palette](images/codebasics/commands.png)

It provides access to many commands: editor's, open files, symbols search, quick outline of a file, - in one window. Tips:

* `kb(workbench.action.quickOpen)` - navigate to a file or symbol by name;
* `kb(workbench.action.openPreviousRecentlyUsedEditorInGroup)` - cycle through the last set of opened files;
* `kb(workbench.action.gotoSymbol)` - navigate to a symbol;
* `kb(workbench.action.gotoLine)` - navigate to a line.

Type `?` in the input field - to get a list of available commands to execute from there:

![Quick Open Help](images/codebasics/quickopenhelp.png)

## Quick File Navigation

The Explorer is great for navigating between files when exploring a project; however, (when you are working on a task) you will find yourself quickly jumping between the same set of files. VS Code provides two commands to navigate in and across, with key-bindings:

* To view a list of all files opened in an editor group - hold `kbstyle(Ctrl)` and press `kbstyle(Tab)`; 
* To open one of these files - use `kbstyle(Tab)` to pick the file, and then release `kbstyle(Ctrl)`.

![Quick Navigation](images/codebasics/quicknav.png)

Alternatively - you can use `kb(workbench.action.navigateBack)` and `kb(workbench.action.navigateForward)` to navigate between files and edit locations; if inside a file - it navigates between lines.

>**Tip:** You can open any file by its name: `kb(workbench.action.quickOpen)`. (**Quick Open**)

## File Encoding Support

Set the file encoding by using the `files.encoding` setting (globally - in **User Settings**; locally - in **Workspace Settings**).

![files.encoding setting](images/codebasics/filesencodingsetting.png)

You can view the file encoding in the status bar.

![Encoding in status bar](images/codebasics/fileencoding.png)

Click the encoding button to reopen or save the active file with a different encoding.

![Reopen or save with a different encoding](images/codebasics/encodingclicked.png)

Choose an encoding.

![Select an encoding](images/codebasics/encodingselection.png)

## Launching from the Command Line

You can launch VS Code from the command-line to quickly open a file, folder, or project. To open VS Code within a current folder - type:

```
code .
```

>**Tip:** We have instructions for Mac-users in our [Setup](/docs/setup/osx.md) topic - how to enable VS Code start from within a terminal. In Windows and Linux, the VS Code executable is added to the `PATH` environment-variable automatically.

If specified files do not exist - they will be created:

```
code index.html style.css readme.md
```

>**Tip:** You can type as many file names, as you want; separate them by spaces.


## Additional Command line arguments

Here are optional command-line arguments to use when starting VS Code there via `code`:

Argument|Description
------------------|-----------
`-h` or `--help` | A manual.
`-v` or `--version` | VS Code version. (e.g. - 0.10.10)
`-n` or `--new-window`| A new session of VS Code. (instead of restoring the previous)
`-r` or `--reuse-window` | Reuse the last active window.
`-g` or `--goto` | If with *file:line:column?* - open the file at specified line (optionally: and column). This is provided since some operating systems permit `:` in a file name. 
*file* | File to open; if it doesn't exist - it will be created and marked edited. Separate multiple names with spaces.
*file:line:column?* | Open file at specified line (optionally: and column). Separate multiple names with spaces; use the `-g` argument (once) before the specifier.
*folder* | Folder to open; may be multiple, too.
`-d` or `--diff` | Open a file difference editor; requires two file paths as arguments.
`--locale` | Set the display language (locale) for the VS Code session: `en-US`, `zh-TW`, `zh-CN`, `fr`, `de`, `it`, `ja`, `ko`, `ru`, `es`.
`--disable-extensions` | Disable installed extensions; they will remain visible in `Extensions: Show Installed Extensions` dropdown, but will be inactive.
`--list-extensions` | A list of installed extensions.
`--install-extension` | Install an extension; provide its full name `publisher.extension` as an argument.
`--uninstall-extension` | Uninstall an extension; provide its full name `publisher.extension` as an argument.
`-w` or `--wait` | Wait for the window to be closed before returning.

For both files and folders, absolute or relative paths can be used. Relative ones - are relative to the current directory (of the command prompt where you run `code`).

If you specify more than one file or folder at the command-line - VS Code will only open a single instance.

## Opening a Project

VS Code does not distinguish between opening a folder and a project. If it detects a project in the folder you opened (for example, a C# one) - this project's context will be displayed in the Status Bar (if more projects are found - they will be switchable there, too).

For example, - to open a project which is in the folder `C:\src\WebApp` - you would start VS Code like this:

````
code C:\src\webapp
````

After VS Code opens - just open source files and use the Status Bar to switch the active project as needed.

![Status Bar](images/codebasics/status.png)

## Window Management

Options to control how windows should be opened or restored, between sessions:

* `window.openFilesInNewWindow` - controls if files should be opened in a new window (instead of reusing an existing VS Code instance). By default, VS Code will open a new window when you double-click on a file outside the VS Code (or open a file from the command line). Set this to `false` - to reuse the last active VS Code instance and open files there.

* `window.reopenFolders` - sets how to restore the windows opened in your previous session:

* * `one` (by default) - reopen the last folder you worked on;
* * `none` - never reopen folders and always start with an empty VS Code instance; 
* * `all` - restore all folders you worked on during previous session.

## Next Steps

You've covered the basic user interface - there is a lot more to VS Code. Read on, to find out about:

* [User/Workspace Settings](/docs/customization/userandworkspace.md) - how to configure VS Code to your preferences through user and workspace settings;
* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Goto Definition, and more;
* [Integrated Terminal](/docs/editor/integrated-terminal.md) - the integrated terminal for quickly performing command line tasks from within VS Code;
* [Debugging](/docs/editor/debugging.md) - where VS Code really shines;
* [Customization](/docs/customization/overview.md) - themes, settings, and keyboard bindings.

## Common Questions

**Q: Global search and replace - is it possible?**

**A:** Yes, expand the Search-view text-box to include a replace-text field.

![global search and replace](images/codebasics/global-search-replace.png)

**Q: Word-wrap - how do I turn it on?**

**A:** You can control it through the `editor.wrappingColumn` [setting](/docs/customization/userandworkspace.md). By default, `editor.wrapperingColumn` is set to 300 characters; you can adjust it, or set the value to zero (to wrap on the editor viewport width):

```json
    "editor.wrappingColumn": 0
```

You can toggle word-wrap for the VS Code session with `kb(editor.action.toggleWordWrap)`. Restarting VS Code will pick up the persisted `editor.wrappingColumn` value.

You can also add vertical column rulers to the editor (with the `editor.rulers` setting - which takes an array of column character positions, where you'd like vertical rulers).

**Q: Number files in the OPEN EDITORS section - how can I show more?**

**A:** You can configure the appearance of **OPEN EDITORS** through your [settings](/docs/customization/userandworkspace.md). For example, - you can set the maximum number of visible files before a scroll-bar appears (via the `explorer.openEditors.visible` setting), and whether the **OPEN EDITORS** section should dynamically set its height (via `explorer.openEditors.dynamicHeight`).
