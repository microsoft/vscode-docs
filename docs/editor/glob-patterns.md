---
Order:
Area: editor
TOCTitle: Glob Patterns Reference
ContentId: c2d81f09-3c24-4659-8aa0-9ca24ef4950d
PageTitle: Visual Studio Code glob patterns reference
DateApproved: 6/8/2023
MetaDescription: Visual Studio Code glob patterns reference
---
# Glob Patterns Reference

Visual Studio Code uses glob patterns to filter file and folder includes and excludes in features such as [Search](/docs/editor/codebasics.md#advanced-search-options), File Explorer autoreveal, and setting up programming language-specific file associations.

## Glob pattern syntax

VS Code uses the following glob syntax:

* `*` to match zero or more characters in a path segment
* `?` to match on one character in a path segment
* `**` to match any number of path segments, including none
* `{}` to group conditions (for example `{**/*.html,**/*.txt}` matches all HTML and text files)
* `[]` to **declare** a range of characters to match (`example.[0-9]` to match on `example.0`, `example.1`, …)
* `[!...]` to negate a range of characters to match (`example.[!0-9]` to match on `example.a`, `example.b`, but not `example.0`)

## Common questions
