---
Order:
Area: editor
TOCTitle: Glob Patterns Reference
ContentId: c2d81f09-3c24-4659-8aa0-9ca24ef4950d
PageTitle: Visual Studio Code glob patterns reference
DateApproved: 08/01/2024
MetaDescription: Visual Studio Code glob patterns reference
---
# Glob Patterns Reference

Visual Studio Code uses glob patterns in many components. Examples include setting file and folder includes/excludes in features such as [Search](/docs/editor/codebasics.md#advanced-search-options), hiding files from the File Explorer or marking them readonly, and setting up programming language-specific file associations.

## Glob pattern syntax

VS Code supports the following glob syntax:

* `/` to separate path segments
* `*` to match zero or more characters in a path segment
* `?` to match on one character in a path segment
* `**` to match any number of path segments, including none
* `{}` to group conditions (for example `{**/*.html,**/*.txt}` matches all HTML and text files)
* `[]` to **declare** a range of characters to match (`example.[0-9]` to match on `example.0`, `example.1`, …)
* `[!...]` to negate a range of characters to match (`example.[!0-9]` to match on `example.a`, `example.b`, but not `example.0`)

**Note:** Paths are separated by `/` and not `\` even on Windows. But when applied, glob patterns will match paths with both slash and backslashes.

## Special cases

Glob patterns in the Search view work differently than in settings such as `files.exclude` and `search.exclude`. In the settings, you must use `**/example` to match a folder named `example` in subfolder `folder1/example` in your workspace. In the Search view, the `**` prefix is assumed. The glob patterns in these settings are always evaluated relative to the path of the workspace folder.

## Common questions

### Why do glob patterns not support feature X or Y?

We implemented our own [glob matching library](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/glob.ts) with a goal to provide optimal performance for most typical patterns. If you expect a certain glob syntax to be supported, you can report an issue with your usecase.

### Why does my glob pattern not work?

Make sure that on Windows you are using `/` to separate paths and not `\`. Glob patterns in VS Code require `/` for separating paths but they will both match on `/` and `\` in paths.
