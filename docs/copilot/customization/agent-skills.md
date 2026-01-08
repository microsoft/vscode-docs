---
ContentId: a7d3e5f8-2c4b-4d9a-b8e1-3f6c9a2d7e41
DateApproved: 01/08/2026
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

> [!NOTE]
> Agent Skills support in VS Code is currently in preview. Enable the `setting(chat.useAgentSkills)` setting to use Agent Skills.

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

Skills are stored in directories with a `SKILL.md` file that defines the skill's behavior. VS Code supports two types of skills:

* Project skills, stored in your repository: `.github/skills/` (recommended) or `.claude/skills/` (legacy, for backward compatibility)
* Personal skills, stored in your user profile: `~/.github/skills/` (recommended) or `~/.claude/skills/` (legacy, for backward compatibility)

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

### SKILL.md file format

The `SKILL.md` file is a Markdown file with YAML frontmatter that defines the skill's metadata and behavior.

#### Header (required)

The header is formatted as YAML frontmatter with the following fields:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | A unique identifier for the skill. Must be lowercase, using hyphens for spaces (for example, `webapp-testing`). Maximum 64 characters. |
| `description` | Yes | A description of what the skill does **and when to use it**. Be specific about both capabilities and use cases to help Copilot decide when to load the skill. Maximum 1024 characters. |

#### Body

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

## How Copilot uses skills

Skills use progressive disclosure to efficiently load content only when needed. This three-level loading system ensures you can install many skills without consuming context:

**Level 1: Skill discovery**

Copilot always knows which skills are available by reading their `name` and `description` from the YAML frontmatter. This metadata is lightweight and helps Copilot decide which skills are relevant to your request.

**Level 2: Instructions loading**

When your request matches a skill's description, Copilot loads the `SKILL.md` file body into its context. Only then do the detailed instructions become available.

**Level 3: Resource access**

Copilot can access additional files in the skill directory (scripts, examples, documentation) only as needed. These resources don't load until Copilot references them, keeping your context efficient.

This architecture means skills are automatically activated based on your prompt—you don't need to manually select them. You can install many skills, and Copilot will load only what's relevant for each task.

## Use shared skills

You can use skills created by others to enhance Copilot's capabilities. The [github/awesome-copilot](https://github.com/github/awesome-copilot) repository contains a growing community collection of skills, custom agents, instructions, and prompts. The [anthropics/skills](https://github.com/anthropics/skills) repository contains additional reference skills.

To use a shared skill:

1. Browse the available skills in the repository
1. Copy the skill directory to your `.github/skills/` folder
1. Review and customize the `SKILL.md` file for your needs
1. Optionally, modify or add resources as needed

> [!TIP]
> Always review shared skills before using them to ensure they meet your requirements and security standards. VS Code's [terminal tool](/docs/copilot/chat/chat-tools.md#terminal-commands) provides controls for script execution, including [auto-approve options](/docs/copilot/chat/chat-tools.md#automatically-approve-terminal-commands) with configurable allow-lists and tight controls over which code runs. Learn more about [security considerations](/docs/copilot/security.md#automated-approval) for auto-approval features.

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
