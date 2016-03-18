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

### Disable Syntax Validation

New `javascript.validate.enable` setting

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

### File to language association TODO@Ben

New `files.associations` array setting

### Toggle Whitespace

### UTF-8 BOM support TODO@Ben

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

### New setting to exclude files from watching TODO@Ben

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
