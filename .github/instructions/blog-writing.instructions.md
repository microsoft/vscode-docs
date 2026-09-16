---
applyTo: 'blogs/**/*.md'
---
# VS Code blog writing guidelines

Apply the following guidelines when authoring blog posts on the VS Code website.

## Content framing

Before you outline or draft a post, identify its primary persona, reader intent, and narrative purpose by following the [documentation content-framing guidance](./docs-writing.instructions.md#content-framing).

The broad blog audience includes developers who use VS Code, but each post must define a more specific primary persona when role, experience, or context affects the angle. Also identify what the reader wants to understand, evaluate, or try after reading, and how the post will move them toward that outcome. If the primary persona, reader intent, or narrative purpose is ambiguous and would change the angle, ask the writer to confirm before drafting.

State the primary persona, reader intent, and narrative purpose in the proposed outline. Use them to choose the opening hook, key takeaways, examples, terminology, assumed knowledge, and call to action. After drafting, verify that each section advances the agreed narrative purpose for the primary persona.

## Public availability

Announce functionality only when it is publicly available in the named product channel by the post's publication date. Public Preview, Experimental, and Insiders functionality can be announced when the post identifies its lifecycle and availability clearly. Do not present planned, source-only, hidden, or internal dogfood functionality as available to readers.

## Metadata

A blog post must have the following metadata fields, formatted with YAML frontmatter.

### YAML frontmatter schema

```yaml
---
Order: <number>              # Required. Sequence number; higher = more recent. Must be unique.
TOCTitle: <string>           # Required. Title for the table of contents. Keep under 30 chars.
PageTitle: <string>          # Required. Title shown in the browser tab.
MetaDescription: <string>    # Required. SEO description. Keep under 160 chars.
MetaSocialImage: <filename>  # Required. Image filename for social sharing (relative path).
MetaSocialImageLight: <filename>  # Optional. Light-theme screenshot for the blog home page.
MetaSocialImageDark: <filename>   # Optional. Dark-theme screenshot for the blog home page.
Date: <YYYY-MM-DD>           # Required. Publication date in ISO format.
Author: <string>             # Required. Full name(s) of author(s). Separate multiple with comma.
Keywords: [<string>, ...]    # Optional. Array of keywords for SEO/search purposes.
---
```

### Field descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `Order` | Yes | Sequence number used for sorting (higher numbers appear first). Increment from the most recent blog post. Must be unique across all posts. |
| `TOCTitle` | Yes | Blog post title used in the sidebar table of contents. Keep it shorter than 30 characters for display. |
| `PageTitle` | Yes | Full blog post title displayed in the browser tab. Can include quotes if needed. |
| `MetaDescription` | Yes | Short description for SEO and social previews. Keep under 160 characters. |
| `MetaSocialImage` | Yes | Filename of the hero/social image, stored in the same folder as the post. Use relative path (e.g., `hero-image.png`). |
| `MetaSocialImageLight` | No | Screenshot shown on the `/blogs/` home page when the website is in **light** theme. Filename in the post folder. Only used when `MetaSocialImageDark` is also set. |
| `MetaSocialImageDark` | No | Screenshot shown on the `/blogs/` home page when the website is in **dark** theme. Filename in the post folder. Only used when `MetaSocialImageLight` is also set. |
| `Date` | Yes | Publication date in `YYYY-MM-DD` format (e.g., `2025-06-30`). |
| `Author` | Yes | Author's full name. For multiple authors, separate with comma (e.g., `Jane Doe, John Smith`). |
| `Keywords` | No | Array of keywords for search optimization (e.g., `[copilot, ai, productivity]`). |

> **Theme-aware home page images:** If you provide **both** `MetaSocialImageLight` and `MetaSocialImageDark`, the blog home page shows the matching screenshot for the visitor's active website theme. If you provide only `MetaSocialImage`, that single image is used in both themes (existing behavior).

### Example frontmatter

```yaml
---
Order: 125
TOCTitle: MCP Apps Support
PageTitle: "Giving Agents a Visual Voice: MCP Apps Support in VS Code"
MetaDescription: VS Code now supports MCP Apps, enabling AI agents to display interactive UIs for richer developer workflows.
MetaSocialImage: mcp-apps-hero.png
Date: 2026-01-26
Author: Harald Kirschner, Connor Peet
---
```

```yaml
---
Order: 92
TOCTitle: Copilot Next Edit Suggestions (preview)
PageTitle: Copilot Next Edit Suggestions (preview)
MetaDescription: Announcing the Next Edit Suggestions and Agent Mode for GitHub Copilot in Visual Studio Code.
MetaSocialImage: nes-gutter-cover.png
Date: 2025-02-12
Author: Brigit Murtaugh, Burke Holland
Keywords: [nes]
---
```

## Folder structure

A blog post MUST be stored in the `blogs` folder, within a `year/month/day` subfolder structure. Each of the three levels of the date must be subfolder.

## Content structure

- The blog post title is an H1 heading.
- There must be a byline directly underneath the title, formatted as `<Month> <day>, <year> by [<author name>](<link to social media profile>))`. The byline must be followed by an empty line.
- The blog post must be broken into sections with H2 headings.
- Images should be included using relative paths and must have alt text.
- Links to documentation articles should use full URLs.
- Start with a brief introduction that summarizes the main points of the post.
- End with a call to action, such as encouraging readers to try out a new feature or share their thoughts in the comments.
- The blog post should end with a line saying `Happy coding! 💙`

## Writing style

- In general, the blog post should adhere to the docs [writing guidelines](./docs-writing.instructions.md).
- Blog posts should be engaging and can include a more conversational tone than standard documentation.
- Use active voice and first-person plural ("we") to create a sense of community and shared experience.
- Use contractions (e.g., "it's", "we're") to make the writing feel more natural and approachable.
- The broad audience is developers who use VS Code, ranging from beginners to advanced users. Write for the post's defined primary persona.
- Use simple and clear language, avoiding jargon unless it's widely understood by the primary persona.
