# Blog Posts

Select a post from the sidebar to read it.

## Tagging posts

Add an optional `Tags` array to a post's YAML frontmatter:

```yaml
Tags: [Agents, GitHub Copilot]
```

Tags appear on articles, homepage cards, and entries in the full blog archive.
Readers can follow a tag to related posts or select multiple tags in the archive
to see posts matching any selected tag.

Choose one to three tags that describe the post's main topics, using the existing
vocabulary:

- Agents
- AI
- Announcements
- Collaboration
- Community
- Debugging
- Design
- Editor
- Education
- Engineering
- Extensions
- GitHub Copilot
- Languages
- Models
- Notebooks
- Performance
- Remote Development
- Security
- Source Control
- Web

Review the article's content rather than assigning tags from its title alone.
Prefer an existing broad topic over a synonym, product-version tag, or one-off
category. Introduce a new topic only when it meaningfully helps readers discover
related posts, and add it to this list. Keep the spelling and capitalization
consistent across posts.

### Choosing AI-related tags

- **Models**: Use when language models are a main topic, such as model selection,
  bring your own key (BYOK), local models, language model APIs, model training,
  evaluation, or model-specific performance and token efficiency. Do not apply
  it just because a post mentions a model, uses AI, or discusses the Model
  Context Protocol (MCP). It does not refer to programming-language support,
  data models, or general machine learning.
- **Agents**: Use for agent workflows, orchestration, tools, and harnesses.
- **AI**: Use for broader AI-assisted development topics. Prefer **Models** for
  model-focused posts rather than adding both tags automatically.
- **GitHub Copilot**: Use when the post centers on Copilot features or integration.

Combine these with other relevant topics, keeping the one-to-three-tag limit.
For example, a model-training deep dive can use
`Tags: [GitHub Copilot, Models, Engineering]`, while a post about MCP tools can
use `Tags: [Agents, Extensions]`. Use **Languages** for programming languages and
language tooling, not language models.

`Tags` is separate from SEO/search `Keywords` and `MetaTags`. It must be an array
of nonempty strings; invalid metadata fails the website build with the filename.
The build trims surrounding whitespace and removes case-insensitive duplicates.
Posts without tags remain supported and appear in the unfiltered archive, but
are not included in tag-filtered results.
