---
ContentId: c2d81f09-3c24-4659-8aa0-9ca24ef4950d
DateApproved: 02/04/2026
MetaDescription: Visual Studio Code glob patterns reference
---
# Glob Patterns Reference

Visual Studio Code uses glob patterns in many components. Examples include setting file and folder includes/excludes in features such as [Search](/docs/editing/codebasics.md#advanced-search-options), hiding files from the File Explorer or marking them readonly, and setting up programming language-specific file associations.

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

## Case sensitivity

Glob pattern matching behavior differs based on the platform's file system:

* **Windows and macOS**: Glob patterns are **case-insensitive** by default. For example, the pattern `**/MyFolder/**` will match `myfolder/`, `MyFolder/`, `MYFOLDER/`, and any other case variation.
* **Linux**: Glob patterns are **case-sensitive**. The pattern `**/MyFolder/**` will only match folders with that exact casing.

This platform-aware behavior applies to all uses of glob patterns in VS Code, including:

* Search view include/exclude patterns
* `setting(files.exclude)` setting
* `setting(search.exclude)` setting
* `.gitignore` file patterns (when `setting(explorer.excludeGitIgnore)` is enabled)
* Search Editor patterns

For example, if you have a `.gitignore` file with a pattern like `build/`, this will match `build/`, `Build/`, `BUILD/`, and other case variations on Windows and macOS, but only exact matches on Linux. This ensures consistent behavior with how these file systems handle file and folder names.

**Remote development:** When working with remote workspaces (such as WSL, SSH, or dev containers), the glob matching behavior follows the **remote** file system's case sensitivity rules, not the local client's operating system.

## Special cases

Glob patterns in the Search view work differently than in settings such as `setting(files.exclude)` and `setting(search.exclude)`. In the settings, you must use `**/example` to match a folder named `example` in subfolder `folder1/example` in your workspace. In the Search view, the `**` prefix is assumed. The glob patterns in these settings are always evaluated relative to the path of the workspace folder.

## Common questions

### Why do glob patterns not support feature X or Y?

We implemented our own [glob matching library](https://github.com/microsoft/vscode/blob/main/src/vs/base/common/glob.ts) with a goal to provide optimal performance for most typical patterns. If you expect a certain glob syntax to be supported, you can report an issue with your usecase.

### Why does my glob pattern not work?

Make sure that on Windows you are using `/` to separate paths and not `\`. Glob patterns in VS Code require `/` for separating paths but they will both match on `/` and `\` in paths.

If you're trying to literally match a special character like `[` or `]`, escape it by placing the special character inside square brackets (single-character range) to avoid it being interpreted in pattern matching. Backslashes do not escape them. For example, to match files under `src/routes/post/[id]/`, you would use the pattern `src/routes/post/[[]id[]]/**`.
