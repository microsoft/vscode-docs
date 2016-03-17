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

## Languages - TypeScript

## Languages - C&#35;

## Editor

### Indentation

We have improved our indentation handling in the editor. By default, the editor will now auto detect indentation based on file content. We have also added additional actions to the indentation status.
![indentation](images/March/indentation.png)

#### File to language association TODO@Ben

#### UTF-8 BOM support TODO@Ben

#### Wait support and git/patch/diff mode TODO@Ben

## Workbench

#### New setting to exclude files from watching TODO@Ben

#### Output handling improvements
Large amounts of output were the cause of multiple user issues, we have now addressed this and are handling large amounts of output in a more efficient way.

## Debugging

#### Improved thread handling
Thanks to this [PR](https://github.com/Microsoft/vscode/pull/3990) call stack for each thread is now requested lazily. This improves performance of debugging multi-threaded programs.

## Tasks

## Setup

## Accessibility

#### Parameter hints
Parameter hints are now read out to the user.

## Localization

## Extension Authoring

## Notable Bug Fixes

- [todo](https://github.com/Microsoft/vscode/issues/todo): TODO Something really great

Here are the [closed bugs](https://github.com/Microsoft/vscode/issues?q=milestone%3A%22March+2016%22+is%3Aclosed) and the [closed feature requests](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22March+2016%22+is%3Aclosed+label%3Afeature-request) for the March update.

## Thank You

Last but certainly not least, a big *__Thank You!__* to the following folks that helped to make VS Code even better:

- [todo](https://github.com/todo): TODO fixed something [todo](https://github.com/Microsoft/vscode/pull/todo).
