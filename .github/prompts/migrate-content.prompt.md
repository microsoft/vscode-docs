---
description: Move or restructure documentation articles, updating all references, TOC entries, redirects, and sitemap.
argument-hint: 'Source and target paths for the content to migrate (e.g., "move docs/editor/tasks.md to docs/terminal/tasks.md")'
tools: ['read', 'search', 'editFiles', 'agent', 'problems']
---
Migrate documentation content from one location to another, ensuring all references remain valid.

## Steps

1. **Confirm the move**: Verify the source file exists and confirm the target path with the user.

2. **Move the file**: Rename or move the source file to the target path.

3. **Move associated images**: If the source has an `images/` subfolder, move it alongside the article to maintain relative image paths.

4. **Update `docs/toc.json`** (or `api/toc.json`): Find the old path entry and update it to the new path.

5. **Add a redirect**: Add an entry to `docs/redirection.json` mapping the old URL path to the new URL path, so existing links and bookmarks continue to work.

6. **Update `build/sitemap.xml`**: Replace the old URL with the new URL.

7. **Fix internal links**: Search the entire repository for links pointing to the old path and update them to point to the new path. Check both relative links (e.g., `/docs/old/path.md`) and absolute URLs (e.g., `https://code.visualstudio.com/docs/old/path`).

8. **Verify**: Run a search for any remaining references to the old path to confirm nothing was missed.
