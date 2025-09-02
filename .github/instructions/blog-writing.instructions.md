---
applyTo: 'blogs/**/*.md'
---
# VS Code blog writing guidelines

Apply the following guidelines when authoring blog posts on the VS Code website.

## Metadata

A blog post must have the following metadata fields, formatted with frontmatter.

* Order: sequence number (higher number is more recent)
* TOCTitle: blog post title used in table of contents - try to keep it shorter than 30 characters
* PageTitle: blog post title used in the browser tab
* MetaDescription: short description of the blog post, used for SEO purposes - keep it shorter than 160 chars
* MetaSocialImage: file name of the image used for sharing on social channels - relative path
* Date: publication date, formatted as YYYY-MM-DD
* Author: full name of the author(s)

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
- The target audience is developers who use VS Code, ranging from beginners to advanced users.
- Use simple and clear language, avoiding jargon unless it's widely understood by the target audience.
