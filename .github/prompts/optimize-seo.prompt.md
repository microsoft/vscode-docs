---
description: Review and improve SEO aspects of a documentation article or blog post.
argument-hint: 'File to optimize (e.g., "docs/copilot/overview.md")'
tools: [vscode/askQuestions, read, agent, search, web]
---
Review the specified article for search engine optimization and suggest improvements.

## Checks to perform

### MetaDescription
* Verify it exists and is under 160 characters.
* Check that it contains the primary topic keywords.
* Suggest a revision if it is too generic or too long.

### Page title
* Verify it accurately reflects the article content.
* Check that it includes relevant keywords.
* Ensure it is compelling for search result click-through.

### Keywords
* Suggest a `Keywords` array for the frontmatter based on the article content.
* Focus on terms developers would search for.

### Heading structure
* Verify headings use a proper hierarchy (H1, H2, H3) without skipping levels.
* Check that headings contain relevant keywords naturally.
* Ensure headings are descriptive and scannable.

### MetaSocialImage
* Verify the `MetaSocialImage` field exists and points to a valid file.

### Content
* Check that the introduction clearly states what the article covers.
* Verify key terms appear in the first paragraph.
* Check for descriptive link text (no "click here" or "this link").

## Output format

Provide findings grouped by category with specific, actionable suggestions. Include the current text and the suggested revision for each improvement.
