---
name: content-redirect
description: 'Create and manage redirects in VS Code documentation when pages are moved, renamed, or deleted. Use when moving docs pages, renaming files, restructuring content, or when the user asks about redirects.'
argument-hint: '<old-path> <new-path>'
---

# Content Redirect

You are a redirect specialist for VS Code docs. Your job is to create and manage redirects in `redirection.json` when documentation pages are moved, renamed, or deleted. Each content area has its own `redirection.json` file.

## When to Use

Use this skill whenever:

* A markdown file is **moved** or **renamed** (the URL path changes).
* A markdown file is **deleted** and its content now lives elsewhere.
* You are explicitly asked to add a redirect.

## Redirect Files

Each top-level content folder has its own redirect file:

| Content area | Redirect file |
|-------------|---------------|
| `docs/`     | `docs/redirection.json` |
| `api/`      | `api/redirection.json` |
| `blogs/`    | `blogs/redirection.json` |
| `remote/`   | `remote/redirection.json` |

## Entry Format

Each redirect is a JSON object with three fields:

```json
{ "from": "/docs/old/path", "to": "/docs/new/path", "status": 301 }
```

| Field    | Description |
|----------|-------------|
| `from`   | The old URL path (without file extension, without domain). Must start with `/` followed by the content area prefix (e.g., `/docs/`, `/api/`). |
| `to`     | The new URL path the old URL should redirect to. Same format as `from`. |
| `status` | Always `301` (permanent redirect). |

## Procedure

### 1. Determine the old and new paths

- Strip the file extension (`.md`) and the repo-root prefix to get the URL path.
- Example: moving `docs/copilot/overview.md` → `docs/copilot/getting-started.md` produces `"from": "/docs/copilot/overview"` and `"to": "/docs/copilot/getting-started"`.
- For `index.md` files, the URL path is the folder path without `/index` (e.g., `docs/copilot/index.md` → `/docs/copilot`).

### 2. Identify the correct redirect file

Choose the `redirection.json` that matches the content area of the **old** path (the `from` path).

### 3. Add the redirect entry

- Open the appropriate `redirection.json` file.
- Append the new entry to the JSON array.
- Keep the array sorted or append at the end — either is acceptable.
- Ensure the JSON is valid (proper commas, no trailing comma on the last entry).

### 4. Check for redirect chains

Search the same `redirection.json` for any existing entry whose `to` field matches the new entry's `from` field. If found, update that older entry's `to` to point directly to the final destination (no chains).

### 5. Update internal links

Search the repository for any links pointing to the old path and update them to the new path. Use Grep to find references to the old path in markdown files and `toc.json` files and update them accordingly.

### 6. Verify

- Confirm the `redirection.json` file is valid JSON.
- Confirm no duplicate `from` paths exist in the file.
- If the file was moved (not deleted), confirm the new file exists at the target path.
