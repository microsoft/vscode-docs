---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 9/18/2026
MetaDescription: Configure project instructions, skills, and custom agents for multiple harnesses in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- customization
- instructions
- custom agents
- skills
- copilot
- claude
- codex
- ai
- tutorial
---

# Configure AI for your codebase

AI agents can produce better results when they understand how your codebase is structured, which commands to run, and which conventions to follow. Configure this information once as repository customizations instead of repeating it in every prompt.

This guide helps you configure the {% data variables.product.prodname_copilot %}, {% data variables.product.prodname_anthropic_claude %}, or {% data variables.product.prodname_openai_codex %} harness in {% data variables.product.prodname_vscode %}. Start with project instructions, verify the result, and share the configuration with your team. Then add more focused customizations where they help. The workflow is shared, with tabs for harness-specific formats and behavior.

To understand how the customization types differ and work together, see [Agent customization](/docs/agents/concepts/customization.md).

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download).
* Complete the [setup and authentication for your harness](/docs/agents/run/agent-harnesses.md#configure-an-agent-harness).
* Open the repository root that you want to configure.
* [Start a session](/docs/agents/run/agent-harnesses.md#start-a-session) and select **{% data variables.product.prodname_copilot_short %}**, **Claude**, or **Codex** from the **Session Target** control. Use the same harness when creating and testing its customizations.

For this walkthrough, work in the current folder. If you're using the {% data variables.copilot.agents_window %}, leave **New Worktree** unselected so new sessions can access your uncommitted customization files.

Choose the tabs for your **harness**, not your language model. For example, a Claude model in a {% data variables.product.prodname_copilot_short %} session still uses the {% data variables.product.prodname_copilot_short %} harness.

> [!NOTE]
> The **Local** harness also supports the {% data variables.product.prodname_copilot_short %} file layout shown in this guide, but tool names and some activation behavior differ. For Local-specific configuration, see [custom instructions](/docs/agent-customization/custom-instructions.md), [agent skills](/docs/agent-customization/agent-skills.md), and [custom agents](/docs/agent-customization/custom-agents.md).

## Step 1: Create project instructions

Start with a project instructions file for information that applies across your codebase. Each harness has its own discovery rules, so use its expected file name and location.

1. Open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) for the selected harness. In the {% data variables.copilot.chat_view %}, run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. In the **Overview** section, enter the prompt for your harness below and press `kbstyle(Enter)` to submit it.

1. Continue in the chat that opens. Confirm that it uses the intended harness and repository, and answer any clarifying questions.

1. Review the changes and save the instructions in the expected location. If the file already exists, review the update rather than replacing existing guidance without checking it.

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

Use `.github/copilot-instructions.md` at the repository root for project-wide instructions.

```prompt
Analyze this codebase and create or update .github/copilot-instructions.md with project-wide instructions. Cover architecture, important directories, build and test commands, coding conventions, and requirements for completing a change. Preserve useful existing guidance, avoid duplication, and ask about anything you cannot determine from the repository.
```

{% /tab %}
{% tab label="Claude" %}

Use `CLAUDE.md` at the repository root for project-wide instructions.

```prompt
Analyze this codebase and create or update CLAUDE.md at the repository root with project-wide instructions. Cover architecture, important directories, build and test commands, coding conventions, and requirements for completing a change. Preserve useful existing guidance, avoid duplication, and ask about anything you cannot determine from the repository.
```

{% /tab %}
{% tab label="Codex" %}

Use `AGENTS.md` at the repository root for project-wide instructions.

```prompt
Analyze this codebase and create or update AGENTS.md at the repository root with project-wide instructions. Cover architecture, important directories, build and test commands, coding conventions, and requirements for completing a change. Preserve useful existing guidance, avoid duplication, and ask about anything you cannot determine from the repository.
```

{% /tab %}
{% /tabs %}

> [!TIP]
> Project instructions are most useful when they document decisions the agent cannot reliably infer from the code alone. Avoid generic advice that applies to any project.

## Step 2: Review the generated instructions

Treat generated instructions as a starting point. Check that they contain accurate, project-specific information:

* **Architecture**: describe important directories, component boundaries, and where to add different types of code.
* **Commands**: include the correct build, test, lint, and formatting commands.
* **Technology choices**: identify preferred frameworks, libraries, and patterns.
* **Conventions**: capture naming, error-handling, testing, security, and documentation requirements.
* **Definition of done**: state which validations the agent should run before completing a task.

Remove information that is generic, obsolete, or duplicated elsewhere in the file. Resolve conflicting instructions and keep each rule concise.

For example, project-specific instructions might include:

```markdown
## Project structure

* Add API routes under `src/api/routes`.
* Put shared validation schemas in `src/schemas`.
* Keep database access in the repository layer.

## Validation

* Run the unit tests for the changed package.
* Run the linter before completing a code change.
* Add or update tests for every behavior change.
```

Learn more about writing effective [custom instructions](/docs/agent-customization/custom-instructions.md).

<a name="step-3-verify-the-improvement"></a>

## Step 3: Verify the configuration

Test the configuration with a representative task from your repository. Choose a task where project knowledge affects the result, such as adding a component, changing an API endpoint, or fixing a test.

1. In the Agent Customizations editor, select **Instructions** for your harness and confirm that the project instructions file is listed. This checks discovery, not whether the agent follows every instruction.
1. Start a new chat with the same harness and repository so the test doesn't rely on guidance from the creation conversation.
1. Ask the agent to complete a small task with a clear success criterion. For example, ask it to add a unit test that follows the repository's existing test patterns.
1. Check that it places files in the correct directories and follows your documented patterns.
1. Check that it uses the preferred libraries and runs the documented validation commands. Review the changes and command results, not only the agent's summary.

If the file is missing or isn't applied, check its location, the selected harness, and the session's working folder before adding more instructions. See [Troubleshoot customization issues](/docs/agent-customization/overview.md#troubleshoot-customization-issues) for diagnostic steps.

If the file is discovered but the result misses a convention, clarify the relevant rule and repeat the task in a new chat. Instructions guide the model, but don't guarantee that it follows every rule.

## Step 4: Share the configuration

Commit the project instructions file and share it through your repository's normal pull request or review process. Contributors who obtain the updated files and use a compatible harness can reuse the guidance without recreating it.

Review the instructions like other development configuration. Update them when the architecture, commands, dependencies, or team practices change.

If your team uses multiple harnesses, keep shared guidance consistent and avoid contradictory copies. A file supported by one harness isn't automatically supported by every other harness.

At this point, your repository has a useful baseline customization. The remaining steps are optional. Add them when different parts of the codebase need distinct guidance or when your team repeatedly performs the same workflow.

<a name="step-5-add-targeted-instructions"></a>

## Step 5: Add targeted instructions (optional)

Add targeted instructions when different parts of your codebase need different guidance. For example, frontend code and infrastructure code might follow different conventions. Keep project-wide standards in the instructions file from step 1.

In the Agent Customizations editor's **Overview** section, submit a request to create the file for your harness below. Describe the conventions it should cover and use an existing file type or directory from your repository.

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

Create `.github/instructions/frontend.instructions.md`. For TypeScript React files, include this YAML frontmatter before the Markdown instructions:

```yaml
---
applyTo: "**/*.tsx"
---
```

The pattern matches `.tsx` files throughout the repository. Review the pattern and test the instructions by asking the agent to make a small change to a specific matching file.

Learn more about [file-based instructions](/docs/agent-customization/custom-instructions.md#use-instructionsmd-files).

{% /tab %}
{% tab label="Claude" %}

Create `.claude/rules/frontend.md`. Claude uses `paths` rather than `applyTo` for path-scoped rules:

```yaml
---
paths:
  - "**/*.tsx"
---
```

Review the pattern and test the rules by asking the agent to make a small change to a specific matching file. Without `paths`, the rule file applies generally rather than only to matching files.

Learn more about [Claude path-specific rules](https://code.claude.com/docs/en/memory#path-specific-rules).

{% /tab %}
{% tab label="Codex" %}

Use an `AGENTS.md` file in the directory that needs its own guidance, such as `packages/frontend/AGENTS.md`. Codex discovers instructions from the repository root down to the session's working directory. This is directory-based guidance, not an `applyTo` or `paths` glob.

To test the nested instructions, start a new Codex session with that subdirectory as its working folder. Opening a file in the editor doesn't change the session's working directory.

Learn more about [Codex instruction discovery](https://developers.openai.com/codex/guides/agents-md).

{% /tab %}
{% /tabs %}

Review and save the generated file, then test it in a new chat with the same harness. Confirm that the result follows the targeted conventions. If it doesn't, check discovery and scope before revising the instructions.

If you changed the session's working folder to test nested instructions, return to the repository root before continuing.

<a name="step-6-package-a-recurring-workflow"></a>

## Step 6: Package a recurring workflow (optional)

Create an agent skill when your team repeatedly explains the same multi-step process. A skill can include instructions, scripts, templates, examples, and other resources that the agent loads when relevant.

For example, create a `validate-change` skill that selects and runs the relevant checks for a code change, then reports what passed, failed, or wasn't run. Submit the prompt for your harness in the Agent Customizations editor's **Overview** section:

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

```prompt
Create a workspace skill named validate-change at .github/skills/validate-change/SKILL.md. It should inspect a code change, choose and run the relevant tests and lint checks using this repository's commands, and report what passed, failed, or was not run. Describe when to use it in its frontmatter.
```

{% /tab %}
{% tab label="Claude" %}

```prompt
Create a workspace skill named validate-change at .claude/skills/validate-change/SKILL.md. It should inspect a code change, choose and run the relevant tests and lint checks using this repository's commands, and report what passed, failed, or was not run. Describe when to use it in its frontmatter.
```

{% /tab %}
{% tab label="Codex" %}

```prompt
Create a workspace skill named validate-change at .agents/skills/validate-change/SKILL.md. It should inspect a code change, choose and run the relevant tests and lint checks using this repository's commands, and report what passed, failed, or was not run. Describe when to use it in its frontmatter.
```

{% /tab %}
{% /tabs %}

After generating the skill:

1. Review the `SKILL.md` file. Check that its `name` matches the directory name and its `description` explains what it does and when to use it.
1. Review any scripts, templates, or other resources in the skill directory, and save your changes.
1. Start a new chat with the same harness and repository. Type `/` in the chat input and select **validate-change** to invoke the skill explicitly. Identify the code change to validate.
1. Review the tool activity and results. Check that the agent loads the skill, selects appropriate checks, and reports failures or skipped checks accurately.

You can also test automatic selection in a separate chat by asking the agent to validate a change without naming the skill. If it doesn't select the skill, review the description and invocation settings. Explicit invocation and model-selected use are separate checks.

Learn more about [agent skills](/docs/agent-customization/agent-skills.md).

<a name="step-7-add-a-specialized-agent"></a>

## Step 7: Add a specialized agent (optional)

Create a custom agent when a role needs focused instructions. For example, a codebase researcher can investigate implementation details and report findings before you decide what to change. Tool restrictions depend on the harness, so don't assume a role description alone prevents edits.

In the Agent Customizations editor's **Overview** section, submit the prompt for your harness:

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

```prompt
Create a workspace custom agent named researcher at .github/agents/researcher.agent.md. It should trace how features work and report findings with file locations, without changing the repository. Configure its tools to use only the {% data variables.product.prodname_copilot_short %} harness's file-reading and code-search tools. Exclude tools that can edit files, run shell commands, or delegate to other agents.
```

Review the `tools` allowlist in the generated file. Confirm that it contains only the intended reading and search tools, rather than unrestricted tool access.

{% /tab %}
{% tab label="Claude" %}

```prompt
Create a workspace custom agent named researcher at .claude/agents/researcher.md. It should trace how features work and report findings with file locations, without changing the repository. Restrict its tools to Read, Grep, and Glob.
```

Review the generated agent's `tools` frontmatter to confirm that it limits the agent to those reading and search tools. Learn more about [Claude custom agents and tool access](https://code.claude.com/docs/en/sub-agents#available-tools).

{% /tab %}
{% tab label="Codex" %}

```prompt
Create a workspace custom agent named researcher at .github/agents/researcher.agent.md for Codex in {% data variables.product.prodname_vscode_shortname %}. It should trace how features work and report findings with file locations. Instruct it not to edit files or run commands that change the repository.
```

The Codex integration in {% data variables.product.prodname_vscode_shortname %} loads the role instructions from this file, but doesn't use its `tools` frontmatter as a tool allowlist. Treat the no-edit instruction as guidance, not enforcement. Review [Codex permissions](/docs/agents/run/agent-harnesses.md#codex) before using the agent.

{% /tab %}
{% /tabs %}

After generating the agent:

1. Review and save the file. Check that the instructions define a clear role and don't conflict with your project guidance.
1. Start a new chat with the same harness and repository, and select **researcher** from the agents dropdown.
1. Ask it to research how a feature works. Check that it identifies relevant files, supports findings with evidence, and follows its configured role.
1. Review any changes and tool activity rather than assuming the agent's name or instructions make it read-only.

Learn more about [custom agents](/docs/agent-customization/custom-agents.md).

## What you configured

If you completed the optional steps, your repository can contain the following files for your selected harness. The frontend directory is an example; use the structure of your repository.

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

```text
your-project/
  .github/
    copilot-instructions.md
    instructions/
      frontend.instructions.md
    skills/
      validate-change/
        SKILL.md
    agents/
      researcher.agent.md
```

{% /tab %}
{% tab label="Claude" %}

```text
your-project/
  CLAUDE.md
  .claude/
    rules/
      frontend.md
    skills/
      validate-change/
        SKILL.md
    agents/
      researcher.md
```

{% /tab %}
{% tab label="Codex" %}

```text
your-project/
  AGENTS.md
  packages/
    frontend/
      AGENTS.md
  .agents/
    skills/
      validate-change/
        SKILL.md
  .github/
    agents/
      researcher.agent.md
```

{% /tab %}
{% /tabs %}

Project instructions provide the baseline. Targeted instructions focus guidance on part of the codebase. Skills package recurring workflows, and custom agents define specialized roles with harness-specific capabilities. You can adopt each layer independently as your repository's needs grow.

Review and share any optional customization files through the same process as the project instructions. Include a skill's supporting resources so other contributors can use it.

## Next steps

* [Create and manage customizations](/docs/agent-customization/overview.md) from the Agent Customizations editor.
* Add [MCP servers](/docs/agent-customization/mcp-servers.md) to connect the agent to external tools and services.
* Set up [hooks](/docs/agent-customization/hooks.md) when an action must run at a specific agent lifecycle event.
