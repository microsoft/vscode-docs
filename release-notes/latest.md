---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code March 0.10.12
MetaDescription: See what is new in the Visual Studio Code March Release (0.10.12)
---

# 0.10.12 (March 2016)

## Insiders Release

Preliminary information on the new features and fixes coming with the 0.10.12 Insiders release can be found in our [March Iteration Plan](https://github.com/Microsoft/vscode/issues/3555) on GitHub.  There you will find brief feature descriptions and links to the feature test plans. As the milestone matures we'll expand upon the documentation here.

## Next Release

We're excited for the next release of Visual Studio Code at the [Build 2016 conference](http://build.microsoft.com/).

Downloads: [Windows](TBD) |
[OS X](TBD) | [Linux 32-bit](TBD) | [Linux 64-bit](TBD)

## Languages - JavaScript

**Please note**: If you have tested the [Salsa](https://github.com/Microsoft/TypeScript/issues/4789) preview in the past and have configured the `typescript.tsdk`, then please make sure to remove the setting. Otherwise you might use an old TypeScript version. When you have `typescript.tsdk` set, then the TS version is shown in the bottom right of the status bar.

### Disable Syntax Validation when using ES7 constructs
Some users want to use syntax constructs like the proposed ES7 Object Rest/Spread Properties. However, these are currently not supported by Salsa and are be flagged as errors. For users that still want to use Code and use these ES7 features, we have revived the`javascript.validate.enable` setting. It allows you to disable all the built-in syntax checking. If you do this then you should really use a linter like `eslint` to validate your code. Since the JavaScript support doesn't understand these constructs, features like IntelliSense might not be fully accurate.

### Guidance to create a jsconfig.json file
The JavaScript experience is much better when you have a `jsconfig.json` file in your workspace that defines the project context. Without a `jsconfig.json` each JavaScript file is treated as an island. Only the file itself and JavaScript files it references are considered for features like Intellisense. By adding a `jsconfig.json` file you can the define the root of your project, the folders to exclude etc. For this reason we now provide a hint to create a `jsonfing.json` file. 

![jsconfig-hint](images/March/jsconfig-hint.png)

The hint creates a template for a `jsconfig.json`, with an exclusion list for you to edit:

![jsconfig-template](images/March/jsconfig-template.png)

Similarly when your JavaScript project is growing too large we invite you to edit the `excludes` list.

### Go To Symbol is back
During the transition to Salsa the support for `Go to Symbol` has been lost [Typescript#7134](https://github.com/Microsoft/TypeScript/issues/7134) for some JavaScript coding patterns. This feature is now back. 

### No more "Reload JavaScript Project"
Previously you often that to run the `Reload JavaScript Project` command to ensure that the JavaScript information is up to date. This is no longer the case and the information is up to date as you edit the jsonfig.json or when you add a typings (`.d.ts`) file.

### Source for Diagnostics
To support that diagnostics from external linters and the built-in syntax validation can be easily distinguished, errors and warnings from the built-validator are now prefixed with `[JS]`.

## Languages - TypeScript

Code now ships with TypeScript 1.8.9, which includes some fixes over [TypeScript 1.8.2](https://blogs.msdn.microsoft.com/typescript/2016/02/22/announcing-typescript-1-8-2/).

## Languages - formatting options

### Formatting options for JavaScript, TypeScript and HTML

New `typescript.format` settings

## Languages - C&#35;

## Editor

### Column Selection

TDODgif

### Code Folding Shortcuts

Ctrl+K Ctrl+(level) to code fold a specific level

TODOgif

### Indentation

We have improved our indentation handling in the editor. By default, the editor will now auto detect indentation based on file content. We have also added additional actions to the indentation status.

![indentation](images/March/indentation.png)

### File to language association

A very common request was having a configurable way to associate file names and paths to languages. We are happy to provide the new `files.associations` setting that allows you to make this association either globally or per workspace.

Here is an example that will associate more extensions to the PHP language:

```json
"files.associations": {
    "*.php4": "php",
    "*.php5": "php"
}
```

You can also configure full file paths to languages if needed. The following example associates all files in a folder `somefolder` to PHP:

```json
"files.associations": {
    "**/somefolder/*.*": "php"
}
```

Note that the pattern is a glob pattern that will match on the full path of the file if it contains a `/` and will match on the file name otherwise.

### Toggle Whitespace

### UTF-8 BOM support

Some environments explicitly ask to include a BOM (Byte Order Mark) for UTF-8 files. There is now a way to save files with UTF-8 BOM as well as to convert existing files with or without BOM.

To enable that all new files are saved with the UTF-8 BOM, configure the `files.encoding` setting to this:

```json
"files.encoding": "utf8bom"
```

The status bar now distinguishes between files with UTF-8 and UTF-8 with BOM. You can convert the encoding from there.

![jsconfig-hint](images/March/statusbar_bom.png)


### Wait support and git/patch/diff mode TODO@Ben

```bash
git config --global core.editor "code --wait"
```

```bash
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code-alpha --wait --diff $LOCAL $REMOTE
```

## Workbench

### Extension display in Status Bar

Brings up **Extensions:** commands
Install animation
Update available notification

### New setting to exclude files from watching

When you open Code on a folder, it installs a file watcher service on the folder and every file and folder contained within to be notified when something changes. If the folder is very large, this can consume quite some resources right on startup. A new setting `files.watcherExclude` now allows to explicitly exclude large directories from file watching. This setting has the following defaults:

```json
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/node_modules/**": true
}
```

We suggest to only exclude more folders if you see that Code is using lots of CPU after opening a folder. Typically you would not have to make any changes to this setting. 

### Output handling improvements

Large amounts of output were the cause of multiple user issues, we have now addressed this and are handling large amounts of output in a more efficient way.

## Debugging

### Run command

### Improved thread handling

Thanks to this [PR](https://github.com/Microsoft/vscode/pull/3990) call stack for each thread is now requested lazily. This improves performance of debugging multi-threaded programs.

## Tasks

### Tasks.json Creation

Tasks.json creation with dropdown

TODOimage

## Setup

## Accessibility

### Parameter hints

Parameter hints are now read out to the user.

## Localization

## Extension Authoring

## Notable Bug Fixes

- [2808](https://github.com/Microsoft/vscode/issues/2808): Make it easier to add more file extensions to an existing colorizer/language

Here are the [closed bugs](https://github.com/Microsoft/vscode/issues?q=milestone%3A%22March+2016%22+is%3Aclosed) and the [closed feature requests](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22March+2016%22+is%3Aclosed+label%3Afeature-request) for the March update.

## Thank You

Last but certainly not least, a big *__Thank You!__* to the following folks that helped to make VS Code even better:

- [todo](https://github.com/todo): TODO fixed something [todo](https://github.com/Microsoft/vscode/pull/todo).
