---
ContentId: 4a7e9c21-5b3f-4e8d-9a12-7c6b4d2f8e35
DateApproved: 11/26/2026
MetaDescription: Reference for Agent Skills file locations, SKILL.md YAML frontmatter fields, forked context execution, and extension contributions in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../agent-customization/images/customization/create-skill.png
Keywords:
- agent skills
- SKILL.md
- yaml frontmatter
- chatSkills
- customization reference
- forked context
---
# Agent Skills reference

Use this reference for supported Agent Skill directories, `SKILL.md` frontmatter fields, forked subagent execution, and extension contributions in {% data variables.product.prodname_vscode %}.

For step-by-step instructions to discover, create, invoke, and verify skills, see [Use Agent Skills in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/agent-skills.md).

## Skill locations

Store project skills in the repository when you want to share them with contributors. Store personal skills in your home directory to use them across workspaces. Each skill has its own directory containing `SKILL.md`.

The following table gives a supported project and personal location for each harness, not every directory it recognizes. The Agent Customizations editor offers creation locations for the selected harness.

| Harness | Skill directories |
|---------|-------------------|
| {% data variables.product.prodname_copilot_short %} | Project: `.github/skills/`<br>Personal: `~/.copilot/skills/` |
| {% data variables.product.prodname_anthropic_claude %} | Project: `.claude/skills/`<br>Personal: `~/.claude/skills/` |
| {% data variables.product.prodname_openai_codex %} | Project: `.agents/skills/`<br>Personal: `~/.agents/skills/` |
| Local `feature(local-harness)` | Project: `.github/skills/`<br>Personal: `~/.copilot/skills/` |

### Codex

To reuse repository skills with {% data variables.product.prodname_openai_codex %}, [configure the experimental Codex integration](/docs/agents/run/agent-harnesses.md#codex). In addition to native `.agents/skills/` discovery, this integration discovers workspace skills in `.github/skills/` before your first prompt, without additional skill-location configuration.

If skills in `.github/skills/` have duplicate names across workspace roots, the primary root takes precedence.

The Codex harness is disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability), unless your administrator explicitly permits it. Contact the IT team that deployed the settings to discuss access.

### Local (Deprecated)

`feature(local-harness)`

Local sessions also read project skills from `.claude/skills/` and `.agents/skills/`, and personal skills from `~/.claude/skills/` and `~/.agents/skills/`.

The deprecated `setting(chat.agentSkillsLocations)` setting adds other skill locations for Local sessions and remains available for compatibility. When another harness runs in {% data variables.product.prodname_vscode_shortname %}, the editor forwards skills from these locations. Independent harness clients do not inherit this setting. To use these skills from native locations, [move them to supported locations](/docs/agent-customization/migrate-customizations.md#move-customizations-from-configured-locations).

### Monorepos

If you open a subfolder of a monorepo, check the [parent repository discovery requirements](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo) before storing skills above the open workspace folder.

## SKILL.md file format

The `SKILL.md` file is a Markdown file with YAML frontmatter that defines the skill's metadata and behavior.

### Header (required)

The header is formatted as YAML frontmatter with the following fields:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | A unique identifier for the skill. Only lowercase letters, numbers, and hyphens are allowed (for example, `webapp-testing`). Do not use slashes, colons, dots, or namespace prefixes. Must match the parent directory name. Maximum 64 characters. Names with invalid characters cause the skill to silently fail to load. |
| `description` | Yes | A description of what the skill does **and when to use it**. Be specific about both capabilities and use cases to help {% data variables.product.prodname_copilot_short %} decide when to load the skill. Maximum 1024 characters. |
| `argument-hint` | No | Hint text shown in the chat input field when the skill is invoked as a slash command. Helps users understand what additional information to provide (for example, `[test file] [options]`). |
| `user-invocable` | No | Controls whether the skill appears as a slash command in the chat menu. Defaults to `true`. Set to `false` to hide the skill from the `/` menu while still enabling the agent to load it automatically. |
| `disable-model-invocation` | No | Controls whether the agent can automatically load the skill based on relevance. Defaults to `false`. Set to `true` to require manual invocation through the `/` slash command only. |
| `context` `feature(forked-skill-context)` | No | Controls how the skill is loaded. Defaults to inline (the skill's instructions are added to the parent agent's context). Set to `fork` to run the skill in a dedicated subagent context. See [Run a skill in a forked context](#run-a-skill-in-a-forked-context). |

> [!IMPORTANT]
> When a skill is distributed through a [plugin](/docs/agent-customization/agent-plugins.md), the plugin name is automatically used as a command prefix (for example, `/my-plugin:test-runner`). Do not manually add namespace prefixes to the skill `name` field. Using prefixes like `myorg/skillname` or `myorg:skillname` causes the skill to silently fail to load.

### Body

The skill body contains the instructions, guidelines, and examples that {% data variables.product.prodname_copilot_short %} should follow when using this skill. Write clear, specific instructions that describe:

* What the skill helps accomplish
* When to use the skill
* Step-by-step procedures to follow
* Examples of the expected input and output
* References to any included scripts or resources

You can reference files by using Markdown links or the `#file:` syntax. For files within the skill directory, use paths relative to the `SKILL.md` file, such as `[test script](./test-template.js)`. To reference your environment user home folder, use `~`, or start a path with `~/`, such as `#file:~/skill-resources/test-template.js`. Use Unix-style `/` path separators to keep skills portable across operating systems.

### Run a skill in a forked context

`feature(forked-skill-context)`

By default, when {% data variables.product.prodname_vscode_shortname %} loads a skill, the skill's instructions are added to the parent agent's context window. For large skills, or skills whose intermediate reasoning isn't relevant to the rest of your conversation, you can instead run the skill in a **forked context**. In a forked context, the skill executes in a dedicated subagent and only its final result is returned to the parent agent. This keeps your main conversation's context clean.

To run a skill in a forked context, set the `context` field in the `SKILL.md` frontmatter to `fork`:

```markdown
---
name: review-pr
description: Review a pull request for code quality, style, and correctness. Use when asked to review a PR.
context: fork
---

# PR review

Follow these steps to review the pull request...
```

Use `context: fork` for skills that:

* Read many files or run lengthy investigations whose details don't need to stay in the main conversation
* Produce a focused result (such as a summary, a report, or a small set of edits) that the parent agent can act on directly
* Should not influence the parent agent's behavior beyond their final output

> [!NOTE]
> To run a skill in a forked context, enable the `setting(github.copilot.chat.skillTool.enabled)` setting in {% data variables.product.prodname_vscode_shortname %}.

## Contribute skills from extensions

Extensions can contribute skills using the `chatSkills` contribution point in their `package.json`. The path must point to a directory that contains a `SKILL.md` file, following the [Agent Skills specification](https://agentskills.io/specification).

### Required folder structure

The skill directory must follow this structure:

```text
extension-root/
└── skills/
    └── my-skill/           # Directory name must match the `name` field in SKILL.md
        └── SKILL.md         # Required
```

### Register the skill in package.json

Add the `chatSkills` contribution point in your extension's `package.json`. The `path` property must point to the corresponding `SKILL.md` file:

```json
{
  "contributes": {
    "chatSkills": [
      {
        "path": "./skills/my-skill/SKILL.md"
      }
    ]
  }
}
```

> [!IMPORTANT]
> The `name` field in the `SKILL.md` frontmatter must match the parent directory name. For example, if the directory is `skills/my-skill/`, the `name` field must be `my-skill`. If the name does not match, the skill is not loaded.

The `SKILL.md` file follows the same format as [project and personal skills](/docs/agent-customization/agent-skills.md#create-a-skill). For example:

```markdown
---
name: my-skill
description: Description of what the skill does and when to use it.
---

# My Skill

Detailed instructions for the skill...
```

## Agent Skills standard

Agent Skills is an open standard that enables portability across different AI agents. Skills you create in {% data variables.product.prodname_vscode_shortname %} work with multiple agents, including:

* **{% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}**: Available in chat and agent mode
* **{% data variables.copilot.copilot_cli %}**: Accessible when working in the terminal
* **{% data variables.copilot.github_copilot_app %}**: Available in the dedicated desktop experience
* **{% data variables.product.prodname_openai_codex %} integration (Experimental)**: Discovers workspace skills in `.github/skills/` after you [set up the integration](/docs/agents/run/agent-harnesses.md#codex)

Learn more about the Agent Skills standard at [agentskills.io](https://agentskills.io).

## Related resources

* [Use Agent Skills in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/agent-skills.md)
* [Agent plugin authoring reference](/docs/agents/reference/agent-plugin-reference.md)
* [Customize agents for your workflow](/docs/agent-customization/overview.md)
