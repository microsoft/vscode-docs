---
applyTo: 'docs/**/*.md, api/**/*.md, remote/**/*.md'
---
# Documentation Writing Instructions

These are our documentation writing style guidelines.

## Content framing

Before you plan or edit content, establish:

* **Primary persona:** The specific reader the content serves, including their role, experience level, and relevant context. Account for secondary personas when they have distinct needs, but optimize the content for one primary persona.
* **Reader intent:** What the reader came to understand, decide, or accomplish.
* **Article purpose:** How the article helps the reader fulfill that intent and the outcome they should reach.

Infer this framing from the existing article, its location in the documentation journey, source material, and the writer's request. If the primary persona, reader intent, or article purpose remains ambiguous and different interpretations would change the content, ask the writer to confirm before making edits. Do not rely on a broad audience such as "VS Code users" when a more specific persona is needed to make content decisions.

Use the agreed framing to guide the plan, scope, structure, terminology, prerequisites, examples, and level of detail. Include the primary persona, reader intent, and article purpose in documentation plans and outlines. After editing, verify that the introduction, main content, and next steps consistently serve that framing.

## General Style tips

* Get to the point fast.
* Talk like a person.
* Simpler is better.
* Be brief. Give customers just enough information to make decisions confidently. Prune every excess word.

## Grammar

* Use present tense verbs (is, open) instead of past tense (was, opened).
* Write factual statements and direct commands. Avoid hypotheticals like "could" or "would".
* Use active voice where the subject performs the action.
* Write in second person (you) to speak directly to readers.
* Use gender-neutral language.
* Avoid multiple -ing words that can create ambiguity.
* Keep prepositional phrases simple and clear.
* Place modifiers close to what they modify.
* Avoid em-dashes and prefer commas or separate sentences to break up complex thoughts.

## Capitalization

* Use sentence-style capitalization for everything except proper nouns.
* Always capitalize proper nouns.
* Don’t capitalize the spelled-out form of an acronym unless it's a proper noun.
* Use title-style capitalization for product and service names.
* In programming languages, follow the traditional capitalization of keywords and other special terms.
* Don't use all uppercase for emphasis.

## Numbers

* Spell out numbers for zero through nine, unless space is limited. Use numerals for 10 and above.
* Spell out numbers at the beginning of a sentence.
* Spell out ordinal numbers such as first, second, and third. Don't add -ly to form adverbs from ordinal numbers.

## Punctuation

* Use short, simple sentences.
* End all sentences with a period.
* Use one space after punctuation marks.
* After a colon, capitalize only proper nouns.
* Avoid semicolons - use separate sentences instead.
* Avoid em-dashes and prefer commas or separate sentences to break up complex thoughts.
* Use question marks sparingly.
* Don't use slashes (/) - use "or" instead.
* Prefer single over double quotes, avoiding typographic quotes.
* Only use apostrophe (U+0027) and quotes (U+0022), not left or right single or double quotation marks.

## Text formatting

* UI elements, like menu items, dialog names, and names of text boxes, should be in bold text.
* Use code style for:
    * Code elements, like method names, property names, and language keywords.
    * SQL commands.
    * NuGet package names.
    * Command-line commands.
    * Database table and column names.
    * Resource names (like virtual machine names) that shouldn't be localized.
    * URLs that you don't want to be selectable.
* For code placeholders, if you want users to replace part of an input string with their own values, use angle brackets (less than < and greater than > characters) on that placeholder text.
* Don't apply an inline style like italic, bold, or inline code style to headings.

## Prompt code blocks

* Use code blocks with `prompt` as the language for AI prompts that use agent mode, optionally followed by "- <custom agent name>" to use a specific custom agent. For example, use `prompt-plan` to indicate that the prompt is intended for a custom agent named "plan".

## Reusable variables

* When you add or update a reusable variable (`{% data variables.<group>.<name> %}`), verify that its full path exists in the repository's [`data/variables` definitions](../../data/variables/README.md) and resolves to the intended text. Don't infer or guess the variable group or name.
* Preserve existing reusable data variables when editing content, including frontmatter. Never replace a product-name variable with its rendered product name, such as replacing `{% data variables.product.prodname_vscode %}` with `Visual Studio Code`.

## Feature lifecycle markers

* When you add or update a `feature(<id>)` marker, verify that the feature ID exists in [`build/feature-lifecycle.json`](../../build/feature-lifecycle.json). Don't infer or guess the feature ID.

## Alerts

* Alerts are a Markdown extension to create block quotes that render with colors and icons that indicate the significance of the content. The following alert types are supported:

    * `[!NOTE]` Information the user should notice even if skimming.
    * `[!TIP]` Optional information to help a user be more successful.
    * `[!IMPORTANT]` Essential information required for user success.
    * `[!CAUTION]` Negative potential consequences of an action.
    * `[!WARNING]` Dangerous certain consequences of an action.

## Links

* Links to other documentation articles should be relative, not absolute. Start relative links with `/docs/` and include the `.md` suffix.
* Links in release notes should be full URLs, not relative. Use the `https://code.visualstudio.com/docs/` domain.
* Links to bookmarks within the same article should be relative and start with `#`.
* Link descriptions should be descriptive and make sense on their own. Don't use "click here" or "this link" or "here".
* Keep Related resources sections to two or three links that are the most useful next steps for the article's primary persona and reader intent. Don't repeat links already prominently surfaced in the article unless the repetition provides a clear navigation benefit.

## Images

* Use images only when they add value.
* Images have a descriptive and meaningful alt text that starts with "Screenshot showing" and ends with ".".

## Videos

* Use videos only when they add value.
* Videos have a descriptive and meaningful title that starts with "Video showing" or "Video of" and ends with ".".
* For embedded videos, you MUST use `youtube-nocookie.com` instead of `youtube.com`.

## Lists

* Use asterisks (*) for lists of items.
* Use numbered lists for steps in a procedure.
* Keep list items parallel in structure.
* In lists with a lead-in term, use a colon as the separator. Don't use an em-dash or a dash.

## Numbered steps

* Write complete sentences with capitalization and periods.
* Use imperative verbs.
* Clearly indicate where actions take place (UI location).
* For single steps, use a bullet instead of a number.
* Use angle brackets for menu sequences (File > Open).

## Terminology

* Use "Select" instead of "Click" for UI elements like buttons, menu items, links, dropdowns, and checkboxes.
* Use "might" instead of "may" for conditional statements.
* Avoid latin abbreviations like "e.g.". Use "for example" instead.
* Use the verb "to enable" instead "to allow" unless you're referring to permissions.
* Follow the terms and capitalization guidelines in #fetch [VS Code docs wiki](https://github.com/microsoft/vscode-docs/wiki/VS-Code-glossary)
* Don't use the following terms: "simply", "just", "easy", "obviously", "of course", "etc.", "delve", "crucial", "utilize", "leverage", "prior to", "in order to", "harness".

## Metadata

A docs or api page must have the following metadata fields, formatted with YAML frontmatter.

```yaml
---
ContentId: <string>          # Required. Unique identifier for the content.
DateApproved: <mm/dd/yyyy>   # Required. Approval date in MM/DD/YYYY format.
MetaDescription: <string>    # Required. SEO description. Keep under 160 chars.
MetaSocialImage: <filename>  # Required. Image filename for social sharing (relative path).
Keywords: [<string>, ...]    # Optional. Array of keywords for SEO/search purposes.
---
```

## Table of content and sitemap

- Add new articles to the table of contents in `docs/toc.json` or `api/toc.json` as appropriate.
- Add new articles to the sitemap in `build/sitemap.xml`.
- File name changes must be reflected in both the table of contents and sitemap.
- Titles in table of contents must use title-style capitalization.

## Article structure

- Use headings to break up content into sections. Use H2 for main sections, H3 for subsections, and so on.
- Start with an introduction that summarizes the article and its purpose. Include a clear statement of what the reader will learn or be able to do after reading.
- Use a logical flow of information, starting with basic concepts and building up to more complex topics.
- End with relevant links to related articles or resources for further learning.
