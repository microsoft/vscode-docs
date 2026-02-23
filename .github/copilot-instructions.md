# VS Code Documentation Repository

This repository contains the official documentation, blog posts, API reference, and release notes for Visual Studio Code, published at [https://code.visualstudio.com/docs](https://code.visualstudio.com/docs).

## Repository structure

| Folder | Content | Instruction file |
|--------|---------|------------------|
| `docs/` | Main documentation (features, languages, setup, etc.) | [docs-writing.instructions.md](instructions/docs-writing.instructions.md) |
| `api/` | Extension API reference and guides | [api-writing.instructions.md](instructions/api-writing.instructions.md) |
| `blogs/` | Blog posts (`YYYY/MM/DD/` subfolders) | [blog-writing.instructions.md](instructions/blog-writing.instructions.md) |
| `release-notes/` | Stable and Insiders release notes | [release-notes-writing.instructions.md](instructions/release-notes-writing.instructions.md) |
| `remote/` | Remote development documentation | [docs-writing.instructions.md](instructions/docs-writing.instructions.md) |
| `images/` | Shared images (tracked via Git LFS) | -- |
| `templates/` | Release note templates | -- |
| `build/` | Build scripts, sitemap, keybindings | -- |

## Writing guidelines

Follow the [documentation writing guidelines](instructions/docs-writing.instructions.md) when reviewing or writing documentation. Each content type has its own instruction file listed above.

## Key terminology

* Spell out "Visual Studio Code" on first reference in an article body. Use "VS Code" for subsequent references.
* Use "select" instead of "click".
* Use "might" instead of "may".
* Avoid: simply, just, easy, obviously, basically, utilize, leverage, delve, crucial.

## Linking rules

* **Docs, API, Remote**: Use relative links starting with `/docs/`, `/api/`, or `/remote/` and include the `.md` suffix.
* **Release notes**: Use absolute URLs (`https://code.visualstudio.com/docs/...`).
* **Blog posts**: Use absolute URLs for documentation links.

## Images

* All images are tracked with **Git LFS**. Run `git lfs install` before cloning.
* **Docs/API/Remote**: Store images in an `images/` subfolder within the content directory.
* **Blogs**: Store images alongside the `.md` file in the date folder.
* **Release notes**: Store images in `images/1_<version>/` (e.g., `images/1_110/`).

## Content registration

When adding a new documentation article:
1. Add an entry to `docs/toc.json` (or `api/toc.json` for API docs).
2. Add a URL entry to `build/sitemap.xml`.

## Common workflows

* **Document a feature**: Use the [document-feature](prompts/document-feature.prompt.md) prompt.
* **Write a new doc article**: Use the [doc-writer](agents/doc-writer.agent.md) agent.
* **Write a blog post**: Use the [blog-writer](agents/blog-writer.agent.md) agent.
* **Review content**: Use the [content-reviewer](agents/content-reviewer.agent.md) agent.
* **Generate release notes**: Use the [generate-release-notes](prompts/generate-release-notes.prompt.md) or [generate-insiders-release-notes](prompts/generate-insiders-release-notes.prompt.md) prompts.
