---
applyTo: 'api/**/*.md'
---
# Extension API Documentation Writing Instructions

Follow the general [documentation writing guidelines](./docs-writing.instructions.md) first. These rules apply specifically to Extension API content in the `api/` folder.

## Frontmatter

API docs use the same frontmatter as main documentation:

```yaml
---
# DO NOT TOUCH — Managed by doc writer
ContentId: <UUID>
DateApproved: <MM/DD/YYYY>
MetaDescription: <description under 160 chars>
---
```

The `# DO NOT TOUCH — Managed by doc writer` comment is required for API docs.

## Code samples

* Write all code samples in TypeScript.
* Import from the `vscode` namespace: `import * as vscode from 'vscode';`
* Include type annotations on function signatures and return types.
* Show complete, runnable examples when possible rather than fragments.
* Use `async/await` instead of `.then()` chains.

## API references

* Link to API types using relative paths to `/api/references/vscode-api.md` (e.g., `[TextDocument](/api/references/vscode-api.md#TextDocument)`).
* When documenting a `contributes` point, show the relevant `package.json` snippet.
* When documenting activation events, list the event string and explain when it fires.

## Method and property documentation

* Use a heading for each method or property name in code style (e.g., `### executeCommand`).
* Show the full method signature in a TypeScript code block.
* Document parameters in a table with columns: Parameter, Type, Description.
* Document the return type after the parameter table.

## TOC and sitemap

* New API articles must be added to `api/toc.json` (not `docs/toc.json`).
* Also add a URL entry to `build/sitemap.xml`.

## Keybinding macros

* Use the `kb()` macro for keybindings (e.g., `kb(workbench.action.debug.start)`) so they render correctly for each platform.

## Alerts

* Use blockquote style for notes: `> **Note**: ...`
* This differs from main docs, which use the `[!NOTE]` alert syntax.
