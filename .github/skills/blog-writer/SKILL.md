---
name: blog-writer
description: 'Plan, write, and review VS Code blog posts. ALWAYS use this skill when the user asks to "write a blog post", "draft a blog", "add a blog post for", "review this blog post", or provides a feature/issue/PR to announce on the VS Code blog. For new posts, it proposes an outline and asks clarifying questions first, and does not edit any files until you approve the plan.'
argument-hint: 'Topic to blog about (or a link to the relevant issue/PR), or a blog post to review.'
---

# Write or Review a Blog Post

Help author a new VS Code blog post or review an existing one in the `blogs/` folder. The skill has two modes:

* **Write mode** works in two phases: it first **researches the topic and proposes an outline**, then drafts the post **only after you approve**.
* **Review mode** evaluates an existing draft for clarity, conciseness, and style, and reports concrete suggestions without editing unless asked.

All work must follow the [blog-writing style guide](../../instructions/blog-writing.instructions.md), which in turn builds on the [docs-writing style guide](../../instructions/docs-writing.instructions.md).

## When to Use

Use this skill **whenever** the request maps to any of these:

* The user says "write a blog post", "draft a blog", "add a blog post for…", or "announce this on the blog".
* The user pastes a GitHub issue or PR link and asks you to turn it into a blog post.
* The user asks you to "review this blog post", check a draft, or improve an existing post in `blogs/`.
* Announcing or explaining a new or changed VS Code or GitHub Copilot feature in a narrative, conversational format.

For new posts, run the plan-first workflow rather than jumping straight to a draft, even when the topic seems small.

Do **not** use this skill for reference documentation, release notes, or API docs. Those are handled by other skills (`doc-writer`, `release-note-writer`) or direct edits. If the user wants reference docs rather than a narrative post, switch to `doc-writer`.

## Guardrails

* **Blogs only.** Limit changes to the `blogs/` folder. Do **not** update reference docs, release notes, or API docs as part of this skill.
* **Folder structure.** A new post MUST live in `blogs/<year>/<month>/<day>/` with each date level as its own subfolder. Store images and the social image alongside the post.
* **Frontmatter is required.** Every post needs the YAML frontmatter fields from the style guide (`Order`, `TOCTitle`, `PageTitle`, `MetaDescription`, `MetaSocialImage`, `Date`, `Author`). `Order` must be unique and higher than the most recent post, so check existing posts before assigning it.
* **Images and screenshots are human work.** When a hero image or screenshot is needed, insert a `TODO` comment for a human to capture and add it later. Do not fabricate image references or invent file names beyond the placeholder.
* **Style compliance.** Follow the [blog-writing style guide](../../instructions/blog-writing.instructions.md): engaging, conversational tone, active voice, first-person plural ("we"), contractions, and a closing call to action ending with `Happy coding! 💙`.

## Phase 1 — Research & Propose an Outline (no edits)

Do not modify any files in this phase.

1. **Understand the topic.** Read the feature description, issue, or PR provided. If it is ambiguous or lacks detail, ask clarifying questions (audience, angle, key takeaways, author name and social link) before continuing.
2. **Check the source if needed.** To understand the feature, inspect the source code in the `microsoft/vscode` and `microsoft/vscode-copilot-chat` repos. Use the `gh` CLI for all GitHub interactions (issues, PRs, code). See user memory `gh-cli-powershell.md` for PowerShell-specific `gh` patterns.

   | Area being written about | Primary source repo |
   |--------------------------|---------------------|
   | Core editor, workbench, debug, terminal, tasks, settings, commands, keybindings | `microsoft/vscode` |
   | Copilot Chat, inline chat, agent mode, chat tools, chat participants, MCP in chat | `microsoft/vscode-copilot-chat` |

3. **Determine placement and metadata.** Decide the target folder (`blogs/<year>/<month>/<day>/`) and the next available `Order` value by checking recent posts. Confirm the author name and social media profile link with the user if unknown.
4. **Present the outline.** Summarize:
   * The proposed title, target folder path, and draft frontmatter values.
   * A section-by-section outline (H2 headings) with a one-line description of each.
   * Any `TODO` image placeholders that will be needed (hero/social image, inline screenshots).
   * Open questions or assumptions.
5. **Stop and wait for approval.** Do not proceed to Phase 2 until the user explicitly approves the outline (or adjusts it).

## Phase 2 — Draft the Post (after approval)

Once the user approves the outline:

1. Create the post at `blogs/<year>/<month>/<day>/<slug>.md` with complete YAML frontmatter.
2. Write the body following the content structure from the style guide:
   * An H1 title, followed by a byline `<Month> <day>, <year> by [<author>](<social link>)` and a blank line.
   * A brief introduction that summarizes the main points.
   * H2 sections as outlined, in an engaging, conversational tone using active voice, "we", and contractions.
   * Images via relative paths with descriptive alt text. Use absolute URLs for links to documentation articles.
   * A closing call to action, ending with `Happy coding! 💙`.
3. Add `TODO` comments where images or screenshots need to be captured by a human.
4. Summarize the post you created and call out any remaining `TODO`s for the user.

## Review Mode

When the user asks you to review an existing blog post instead of writing one:

1. Read the draft and check it against the [blog-writing style guide](../../instructions/blog-writing.instructions.md):
   * Frontmatter completeness and correctness (all required fields, unique `Order`, `MetaDescription` under 160 chars, `TOCTitle` under 30 chars).
   * Folder structure (`blogs/<year>/<month>/<day>/`).
   * Content structure (H1 title, byline, intro, H2 sections, alt text on images, absolute URLs for doc links, closing call to action ending with `Happy coding! 💙`).
   * Writing style (engaging and conversational, active voice, first-person plural, contractions, clear language for a developer audience).
2. Verify technical claims against the source where practical (setting names, command IDs, version availability), using the `gh` CLI.
3. Report concrete, practical suggestions grouped by theme. **Do not edit the file** unless the user asks you to apply the changes.
