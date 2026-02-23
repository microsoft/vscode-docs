---
name: image-guidelines
description: Guidelines for images, screenshots, and videos in VS Code documentation. Use when adding or reviewing media content.
---
# Image and Media Guidelines

Use these guidelines when adding, reviewing, or referencing images and videos in VS Code documentation, blog posts, and release notes.

## Git LFS

All images in this repository are tracked with **Git Large File Storage (LFS)**.

* Run `git lfs install` before cloning the repository.
* New image files are automatically tracked by the `.gitattributes` configuration.
* Run `npm run check-lfs` to verify images are properly tracked.

## Image placement by content type

| Content type | Image location | Example |
|-------------|---------------|---------|
| Documentation (`docs/`) | `images/` subfolder within the content directory | `docs/editor/images/codebasics/minimap.png` |
| API docs (`api/`) | `images/` subfolder within the content directory | `api/extension-guides/images/command/command.png` |
| Blog posts (`blogs/`) | Same folder as the `.md` file | `blogs/2026/01/26/hero-image.png` |
| Release notes (`release-notes/`) | `images/1_<version>/` folder | `release-notes/images/1_110/feature.png` |
| Shared images | Top-level `images/` folder | `images/shared/github-copilot-social.png` |

## Alt text

### Screenshots
* Alt text **must** start with "Screenshot showing" and end with a period.
* Be descriptive: explain what the screenshot shows, not just the UI element name.

```markdown
![Screenshot showing the Command Palette with a list of recently used commands.](images/commandpalette.png)
```

### Videos
* Alt text **must** start with "Video showing" or "Video of" and end with a period.

```markdown
![Video showing the multi-cursor editing feature in action.](images/multicursor.mp4)
```

## YouTube embeds

* Always use `youtube-nocookie.com` instead of `youtube.com` for privacy.

```markdown
[![Video title](thumbnail.png)](https://www.youtube-nocookie.com/embed/VIDEO_ID)
```

## Social images

* Every article must have a `MetaSocialImage` frontmatter field.
* Social images appear in link previews on social media.
* For docs: use a path relative to the `docs/` folder (e.g., `images/shared/github-copilot-social.png`).
* For blogs: use the filename only (image is colocated with the post).
* For release notes: use a path relative to `release-notes/` (e.g., `1_110/vscode-v1110-social.webp`).

## Image formats

| Format | Use for |
|--------|---------|
| PNG | Screenshots, UI images with text |
| WebP | Optimized images, social images |
| GIF | Short animations (prefer video for longer content) |
| SVG | Diagrams, icons |

## Best practices

* Use images only when they add value to the content.
* Crop screenshots to show only the relevant UI area.
* Avoid including personal information in screenshots.
* Use a clean VS Code theme (default Dark+ or Light+) for consistency.
* Keep file sizes reasonable (compress PNGs, use WebP where possible).
