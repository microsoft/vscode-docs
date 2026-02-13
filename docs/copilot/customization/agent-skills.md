---
ContentId: a7d3e5f8-2c4b-4d9a-b8e1-3f6c9a2d7e41
DateApproved: 02/04/2026
MetaDescription: Learn how to use Agent Skills in VS Code to teach GitHub Copilot specialized capabilities that work across VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- agents
- skills
- instructions
- customization
- ai
- claude
---
# Use Agent Skills in VS Code

Agent Skills are folders of instructions, scripts, and resources that GitHub Copilot can load when relevant to perform specialized tasks. Agent Skills is an [open standard](https://agentskills.io) that works across multiple AI agents, including GitHub Copilot in VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.

Unlike [custom instructions](/docs/copilot/customization/custom-instructions.md) that primarily define coding guidelines, skills enable specialized capabilities and workflows that can include scripts, examples, and other resources. Skills you create are portable and work across any skills-compatible agent.

Key benefits of Agent Skills:

* **Specialize Copilot**: Tailor capabilities for domain-specific tasks without repeating context
* **Reduce repetition**: Create once, use automatically across all conversations
* **Compose capabilities**: Combine multiple skills to build complex workflows
* **Efficient loading**: Only relevant content loads into context when needed

## Agent Skills vs custom instructions

While both Agent Skills and custom instructions help customize Copilot's behavior, they serve different purposes:

| Feature | Agent Skills | Custom Instructions |
| ------- | ------------ | ------------------- |
| **Purpose** | Teach specialized capabilities and workflows | Define coding standards and guidelines |
| **Portability** | Works across VS Code, Copilot CLI, and Copilot coding agent | VS Code and GitHub.com only |
| **Content** | Instructions, scripts, examples, and resources | Instructions only |
| **Scope** | Task-specific, loaded on-demand | Always applied (or via glob patterns) |
| **Standard** | Open standard ([agentskills.io](https://agentskills.io)) | VS Code-specific |

Use Agent Skills when you want to:

* Create reusable capabilities that work across different AI tools
* Include scripts, examples, or other resources alongside instructions
* Share capabilities with the wider AI community
* Define specialized workflows like testing, debugging, or deployment processes

Use custom instructions when you want to:

* Define project-specific coding standards
* Set language or framework conventions
* Specify code review or commit message guidelines
* Apply rules based on file types using glob patterns

## Create a skill

> [!TIP]
> Type `/skills` in the chat input to quickly open the **Configure Skills** menu.

Skills are stored in directories with a `SKILL.md` file that defines the skill's behavior. VS Code supports two types of skills:

| Skill type | Location |
| ---------- | -------- |
| Project skills, stored in your repository | `.github/skills/`, `.claude/skills/`, `.agents/skills/` |
| Personal skills, stored in your user profile | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

> [!TIP]
> You can configure additional locations where VS Code searches for skills by using the `setting(chat.agentSkillsLocations)` setting. This is useful for sharing skills across projects or keeping them in a central location.

To create a skill:

1. Create a `.github/skills` directory in your workspace.

1. Create a subdirectory for your skill. Each skill should have its own directory (for example, `.github/skills/webapp-testing`).

1. Create a `SKILL.md` file in the skill directory with the following structure:

    ```markdown
    ---
    name: skill-name
    description: Description of what the skill does and when to use it
    ---

    # Skill Instructions

    Your detailed instructions, guidelines, and examples go here...
    ```

1. Optionally, add scripts, examples, or other resources to your skill's directory.

    For example, a skill for testing web applications might include:

    * `SKILL.md` - Instructions for running tests
    * `test-template.js` - A template test file
    * `examples/` - Example test scenarios

## SKILL.md file format

The `SKILL.md` file is a Markdown file with YAML frontmatter that defines the skill's metadata and behavior.

### Header (required)

The header is formatted as YAML frontmatter with the following fields:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | A unique identifier for the skill. Must be lowercase, using hyphens for spaces (for example, `webapp-testing`). Must match the parent directory name. Maximum 64 characters. |
| `description` | Yes | A description of what the skill does **and when to use it**. Be specific about both capabilities and use cases to help Copilot decide when to load the skill. Maximum 1024 characters. |
| `argument-hint` | No | Hint text shown in the chat input field when the skill is invoked as a slash command. Helps users understand what additional information to provide (for example, `[test file] [options]`). |
| `user-invokable` | No | Controls whether the skill appears as a slash command in the chat menu. Defaults to `true`. Set to `false` to hide the skill from the `/` menu while still allowing the agent to load it automatically. |
| `disable-model-invocation` | No | Controls whether the agent can automatically load the skill based on relevance. Defaults to `false`. Set to `true` to require manual invocation through the `/` slash command only. |

### Body

The skill body contains the instructions, guidelines, and examples that Copilot should follow when using this skill. Write clear, specific instructions that describe:

* What the skill helps accomplish
* When to use the skill
* Step-by-step procedures to follow
* Examples of the expected input and output
* References to any included scripts or resources

You can reference files within the skill directory using relative paths. For example, to reference a script in your skill directory, use `[test script](./test-template.js)`.

## Example skills

The following examples demonstrate different types of skills you can create.

<details>
<summary>Example: Web application testing skill</summary>

````markdown
---
name: webapp-testing
description: Guide for testing web applications using Playwright. Use this when asked to create or run browser-based tests.
---

# Web Application Testing with Playwright

This skill helps you create and run browser-based tests for web applications using Playwright.

## When to use this skill

Use this skill when you need to:
- Create new Playwright tests for web applications
- Debug failing browser tests
- Set up test infrastructure for a new project

## Creating tests

1. Review the [test template](./test-template.js) for the standard test structure
2. Identify the user flow to test
3. Create a new test file in the `tests/` directory
4. Use Playwright's locators to find elements (prefer role-based selectors)
5. Add assertions to verify expected behavior

## Running tests

To run tests locally:
```bash
npx playwright test
```

To debug tests:
```bash
npx playwright test --debug
```

## Best practices

- Use data-testid attributes for dynamic content
- Keep tests independent and atomic
- Use Page Object Model for complex pages
- Take screenshots on failure
````

</details>

<details>
<summary>Example: GitHub Actions debugging skill</summary>

````markdown
---
name: github-actions-debugging
description: Guide for debugging failing GitHub Actions workflows. Use this when asked to debug failing GitHub Actions workflows.
---

# GitHub Actions Debugging

This skill helps you debug failing GitHub Actions workflows in pull requests.

## Process

1. Use the `list_workflow_runs` tool to look up recent workflow runs for the pull request and their status
2. Use the `summarize_job_log_failures` tool to get an AI summary of the logs for failed jobs
3. If you need more information, use the `get_job_logs` or `get_workflow_run_logs` tool to get the full failure logs
4. Try to reproduce the failure locally in your environment
5. Fix the failing build and verify the fix before committing changes

## Common issues

- **Missing environment variables**: Check that all required secrets are configured
- **Version mismatches**: Verify action versions and dependencies are compatible
- **Permission issues**: Ensure the workflow has the necessary permissions
- **Timeout issues**: Consider splitting long-running jobs or increasing timeout values
````

</details>

## Use skills as slash commands

Skills are available as slash commands in chat, alongside [prompt files](/docs/copilot/customization/prompt-files.md). Type `/` in the chat input field to see a list of available skills and prompts, and select a skill to invoke it.

You can add extra context after the slash command. For example, `/webapp-testing for the login page` or `/github-actions-debugging PR #42`.

By default, all skills appear in the `/` menu. Use the `user-invokable` and `disable-model-invocation` frontmatter properties to control how each skill is accessed:

| Configuration | Slash command | Auto-loaded by Copilot | Use case |
|---|---|---|---|
| Default (both properties omitted) | Yes | Yes | General-purpose skills |
| `user-invokable: false` | No | Yes | Background knowledge skills that the model loads when relevant |
| `disable-model-invocation: true` | Yes | No | Skills you only want to run on demand |
| Both set | No | No | Disabled skills |

## How Copilot uses skills

Skills use progressive disclosure to efficiently load content only when needed. This three-level loading system ensures you can install many skills without consuming context:

**Level 1: Skill discovery**

Copilot always knows which skills are available by reading their `name` and `description` from the YAML frontmatter. This metadata is lightweight and helps Copilot decide which skills are relevant to your request.

**Level 2: Instructions loading**

When your request matches a skill's description, Copilot loads the `SKILL.md` file body into its context. Only then do the detailed instructions become available. You can also directly invoke a skill by using the `/` slash command in chat.

**Level 3: Resource access**

Copilot can access additional files in the skill directory (scripts, examples, documentation) only as needed. These resources don't load until Copilot references them, keeping your context efficient.

This architecture means skills are both automatically activated based on your prompt and manually invocable through slash commands. You can install many skills, and Copilot loads only what's relevant for each task.

## Use shared skills

You can use skills created by others to enhance Copilot's capabilities. The [github/awesome-copilot](https://github.com/github/awesome-copilot) repository contains a growing community collection of skills, custom agents, instructions, and prompts. The [anthropics/skills](https://github.com/anthropics/skills) repository contains additional reference skills.

To use a shared skill:

1. Browse the available skills in the repository
1. Copy the skill directory to your `.github/skills/` folder
1. Review and customize the `SKILL.md` file for your needs
1. Optionally, modify or add resources as needed

> [!TIP]
> Always review shared skills before using them to ensure they meet your requirements and security standards. VS Code's [terminal tool](/docs/copilot/agents/agent-tools.md#terminal-commands) provides controls for script execution, including [auto-approve options](/docs/copilot/agents/agent-tools.md#automatically-approve-terminal-commands) with configurable allow-lists and tight controls over which code runs. Learn more about [security considerations](/docs/copilot/security.md#automated-approval) for auto-approval features.

## Contribute skills from extensions

Extensions can contribute skills using the `chatSkills` contribution point in their `package.json`. The path must point to a directory that contains a `SKILL.md` file, following the [Agent Skills specification](https://agentskills.io/specification).

### Required folder structure

The skill directory must follow this structure:

```
extension-root/
└── skills/
    └── my-skill/           # Directory name must match the `name` field in SKILL.md
        └── SKILL.md         # Required
```

### Register the skill in package.json

Add the `chatSkills` contribution point in your extension's `package.json`. The `path` property must point to a directory that contains a `SKILL.md` file:

```json
{
  "contributes": {
    "chatSkills": [
      {
        "path": "./skills/my-skill"
      }
    ]
  }
}
```

> [!IMPORTANT]
> The `name` field in the `SKILL.md` frontmatter must match the parent directory name. For example, if the directory is `skills/my-skill/`, the `name` field must be `my-skill`. If the name does not match, the skill is not loaded.

The `SKILL.md` file follows the same format as [project and personal skills](#create-a-skill). For example:

```markdown
---
name: my-skill
description: Description of what the skill does and when to use it.
---

# My Skill

Detailed instructions for the skill...
```

## Agent Skills standard

Agent Skills is an open standard that enables portability across different AI agents. Skills you create in VS Code work with multiple agents, including:

* **GitHub Copilot in VS Code**: Available in chat and agent mode
* **GitHub Copilot CLI**: Accessible when working in the terminal
* **GitHub Copilot coding agent**: Used during automated coding tasks

Learn more about the Agent Skills standard at [agentskills.io](https://agentskills.io).

## Related resources

* [Customize AI responses overview](/docs/copilot/customization/overview.md)
* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
* [Agent Skills specification](https://agentskills.io)
* [Reference skills repository](https://github.com/anthropics/skills)
