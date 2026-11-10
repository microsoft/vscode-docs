---
ContentId: a7d3e5f8-2c4b-4d9a-b8e1-3f6c9a2d7e41
DateApproved: 11/11/2026
MetaDescription: Find, adapt, and create Agent Skills in {% data variables.product.prodname_vscode_shortname %} for reusable workflows with supported agents.
Keywords:
- copilot
- agents
- skills
- instructions
- customization
- ai
- claude
---
# Use Agent Skills in {% data variables.product.prodname_vscode_shortname %}

Agent Skills are folders of instructions, scripts, and resources that AI agents can load when relevant to perform specialized tasks. Agent Skills is an [open standard](https://agentskills.io) that works across multiple AI agents, including {% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, the {% data variables.copilot.github_copilot_app %}, and the [experimental {% data variables.product.prodname_openai_codex %} integration](/docs/agents/run/agent-harnesses.md#codex).

Unlike [custom instructions](/docs/agent-customization/custom-instructions.md) that primarily define coding guidelines, skills enable specialized capabilities and workflows that can include scripts, examples, and other resources. Skills you create are portable across skills-compatible agents, but supported locations and optional features vary by agent. Unless otherwise noted, the configuration options and controls on this page apply to {% data variables.product.prodname_copilot_short %}.

For how skills compare with the other customization options, see [Customization concepts](/docs/agents/concepts/customization.md).

Key benefits of Agent Skills:

* **Specialize Copilot**: Tailor capabilities for domain-specific tasks without repeating context
* **Reduce repetition**: Create once, use automatically across all conversations
* **Compose capabilities**: Combine multiple skills to build complex workflows
* **Efficient loading**: Only relevant content loads into context when needed

> [!TIP]
> Use the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) to discover, create, and manage all your agent customizations in one place. Run **Chat: Open Customizations** from the Command Palette.

## Agent Skills vs custom instructions

While both Agent Skills and custom instructions help customize Copilot's behavior, they serve different purposes:

| Feature | Agent Skills | Custom Instructions |
| ------- | ------------ | ------------------- |
| **Purpose** | Teach specialized capabilities and workflows | Define coding standards and guidelines |
| **Portability** | Reusable across [skills-compatible coding agents](#agent-skills-standard), subject to each agent's supported locations and features | Reusable across experiences that support the selected [instruction format](/docs/agents/reference/custom-instructions-reference.md#supported-formats-and-locations) |
| **Content** | Instructions, scripts, examples, and resources | Instructions only |
| **Scope** | Task-specific, loaded on-demand | Always applied (or via glob patterns) |
| **Standard** | Open standard ([agentskills.io](https://agentskills.io)) | Multiple formats, such as `AGENTS.md` and `.github/copilot-instructions.md` |

For example, you can share a repository's `.github/copilot-instructions.md` between {% data variables.product.prodname_vscode_shortname %} and [{% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions). Check the supported file locations and activation rules for each experience.

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

## Where skills come from

Skills can come from the following sources:

* **Project or personal files:** [Create a skill](#create-a-skill), [copy and adapt one](#copy-and-adapt-an-existing-skill), or use skills included in a repository.
* **Marketplaces and plugins:** [Install individual skills](#install-a-skill-from-the-customization-marketplace-preview) or use skills bundled in an [agent plugin](/docs/agent-customization/agent-plugins.md).
* **Extensions:** Installed {% data variables.product.prodname_vscode_shortname %} extensions can [contribute skills](#contribute-skills-from-extensions).
* **MCP servers:** Connected servers can [supply skills](#use-skills-from-an-mcp-server) `feature(mcp-skills)` for {% data variables.product.prodname_copilot_short %} harness sessions.

Supported sources depend on your [agent harness](/docs/agents/run/agent-harnesses.md). For project and personal skill directories, see [Skill locations](#skill-locations).

## Use an existing skill

Start with an existing skill when it provides the workflow you need. [Browse customization marketplaces](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview) to install an individual skill or find one bundled in an [agent plugin](/docs/agent-customization/agent-plugins.md). You can also copy and adapt a skill for your project. Review the requirements for [reusing customizations across harnesses](/docs/agent-customization/overview.md#reuse-customizations-across-harnesses) before choosing a source and location.

A skill includes its full directory, not only the `SKILL.md` file: scripts, templates, examples, and other resources can be part of the workflow.

### Install a skill from the Customization Marketplace (Preview)

Use the Customization Marketplace to find and install skills from configured sources. Marketplace discovery is enabled by default. The experimental GitHub Feed requires a harness that provides marketplace search. Local sessions don't provide this source, and organization policy can restrict access.

1. Open the Agent Customizations editor and select **Browse**.
1. From the source menu, select **GitHub Feed**, and then search for a skill by name or add `@type:skill` to your search.
1. Select a skill and review its publisher, source, and included files.
1. Select **Install**, and choose a supported user or workspace destination when prompted.
1. [Verify the installed skill](#verify-a-skill) in a session with the intended harness.

To reuse skills bundled in a plugin, select a plugin marketplace from the source menu and [install the plugin](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace). If your team's marketplace isn't listed, [add it through Configure Marketplaces](/docs/agent-customization/agent-plugins.md#configure-plugin-marketplaces).

{% data variables.product.prodname_vscode_shortname %} doesn't overwrite an existing skill at the selected destination. If another supported location contains a skill with the same name, both skills appear on the **Skills** page. The source or publisher image identifies the Marketplace installation, and **Copy Relative Path** shows its exact location.

{% data variables.product.prodname_vscode_shortname %} tracks the directory of each skill installed from the Marketplace. Deleting that skill from the **Skills** page doesn't remove a local skill with the same name in another location.

If files from a Marketplace-installed skill are missing, **Browse** shows **Missing files**. Select **Repair** to restore only the missing packaged files. Files that you changed or added remain unchanged.

For source availability and setup, see [Discover and install existing customizations](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview).

### Use skills from an MCP server

`feature(mcp-skills)`

An [MCP server](/docs/agent-customization/mcp-servers.md) can provide Agent Skills alongside its tools. These skills supply reusable instructions for working with a service, without requiring you to copy a skill directory into your project. This feature requires the [Copilot harness](/docs/agents/run/agent-harnesses.md#copilot) and isn't available in Local harness sessions `feature(local-harness)`.

1. Enable the `setting(chat.agentHost.mcpSkills.enabled)` setting. It is off by default.
1. [Add an MCP server](/docs/agent-customization/mcp-servers.md#add-a-server-by-url-or-command) that provides skills, following the publisher's setup instructions.
1. Start a new session with the {% data variables.product.prodname_copilot_short %} harness. Changing the setting doesn't affect sessions that are already running.
1. Ask the agent to describe the skills available from that server.
1. With that session selected, run **Chat: Open Customizations** and select **Skills**. Server-provided skills appear under **Skills from \<server\>**. Open a skill to inspect its read-only instructions.
1. In chat, type `/` and select a skill, shown as `/<server>:<skill>`, or ask the agent to use it.

Before the agent loads instructions from a server, it asks **Allow Skills from \<server\>?**. Only allow instructions from servers you trust. Your choice applies to that server:

| Choice | Effect |
|--------|--------|
| **Allow Once** | Allow skills for the current session, including later turns. A new session asks again. |
| **Always Allow** | Allow skills in the current and future sessions, including after a reload. |
| **Not Now** | Decline for the current turn. A later turn can ask again. |
| **Never** | Decline in the current and future sessions, including after a reload. |

This approval is separate from [MCP server trust](/docs/agents/run/manage-mcp-servers.md#mcp-server-trust).

If skills don't appear, confirm that the server is fully running and authenticated, and that you started a new session after enabling the setting. If sign-in hasn't started, ask the agent to call a read-only tool from that server to trigger authentication.

### Copy and adapt an existing skill

1. Review the skill's instructions, scripts, and other resources before adding it to your workspace.
1. Copy the entire skill directory to a [supported project or personal location](#skill-locations) for your harness.
1. Adapt the `SKILL.md` file to your needs. Check commands, file paths, dependencies, and assumptions about the project.
1. Update any supporting scripts, templates, or examples that the adapted instructions use.
1. [Verify the adapted skill](#verify-a-skill) before sharing it.

> [!TIP]
> Only reuse skills you trust. Skills can include scripts that run tools or interact with external systems. Review [security considerations](/docs/agents/run/security.md#approvals-and-review) before using them.

## Create a skill

Use the Agent Customizations editor to create the skill's directory and `SKILL.md` file in a location supported by your selected harness. Choose **Workspace** to share the skill with your project or **User** to use it across your workspaces.

1. Select the intended harness, run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`), and select **Skills**. In the {% data variables.copilot.agents_window %}, you can also select **Customizations** in the sidebar.

1. Select **New Skill** (plus icon) next to **Workspace** to store the skill in your project, or next to **User** to use it across your workspaces.

    <!-- TODO: Replace screenshot to show the New Skill (plus icon) buttons next to the Workspace and User groups in the Skills section. -->
    ![Screenshot of the Agent Customizations editor, showing the Skills tab and the dropdown to create a new skill.](images/customization/create-skill.png)

1. Choose a location if prompted, and enter a skill name, such as `test-changes`. The editor offers locations for the selected harness. See [Skill locations](#skill-locations) for details.

1. In the generated `SKILL.md` file, describe what the skill does, when to use it, and the instructions to follow. For example:

    ```markdown
    ---
    name: test-changes
    description: Run relevant project tests and report the results. Use when validating a code change.
    ---

    # Test changes

    1. Identify the tests that cover the changed code.
    1. Run them using the test commands documented in this repository.
    1. Report what passed, what failed, and any checks you couldn't run.
    ```

    Keep `name` consistent with the skill directory name. For additional fields, see the [file format reference](#skillmd-file-format).

1. If the skill needs scripts, templates, or examples, add them to its directory and reference them from `SKILL.md`.

    Use Markdown links or `#file:` references with paths relative to `SKILL.md`, such as `[test template](./test-template.js)` or `#file:./test-template.js`.

1. Save the files and [verify the skill](#verify-a-skill).

If you prefer to create files directly, create a directory for the skill in a [supported skill location](#skill-locations) and save its instructions as `SKILL.md`. Keep the directory name consistent with the frontmatter `name`, then verify the skill in the same way.

### Generate a skill with AI

Instead of writing the file yourself, ask the agent to create a skill in a chat with your intended harness. Describe the task, when the skill should apply, and where to store it. For example:

```prompt
Create a project skill named test-changes in a location supported by this harness. It should identify and run the relevant tests for a code change using this repository's documented commands, then report what passed, failed, or wasn't run. Include a description of when to use the skill.
```

You can also ask the agent to turn a process from the current conversation into a skill, such as "create a skill from how we just debugged that." Review the generated instructions, file locations, and supporting resources, then [verify the skill](#verify-a-skill).

### Local harness shortcuts

`feature(local-harness)`

With **Local** `feature(local-harness)` selected in the {% data variables.copilot.chat_view %}, you can also:

* Enter `/skills` to open the **Configure Skills** menu.
* Enter `/create-skill` followed by a description to generate a skill.
* Select **Generate with AI** in the **Skills** section of the Agent Customizations editor.

For other harnesses, use **Open Customizations** or describe the skill directly in chat.

## Use skills as slash commands

Skills can appear as slash commands in chat and can be loaded automatically when the request matches their description. Type `/` in the chat input field to see available skills and prompts, and select a skill to invoke it. You can add context after the command, such as `/test-changes for the authentication update`.

Use the `user-invocable` and `disable-model-invocation` frontmatter properties to control how each skill is accessed:

| Configuration | Slash command | Auto-loaded by Copilot | Use case |
|---|---|---|---|
| Default (both properties omitted) | Yes | Yes | General-purpose skills |
| `user-invocable: false` | No | Yes | Background knowledge skills that the model loads when relevant |
| `disable-model-invocation: true` | Yes | No | Skills you only want to run on demand |
| Both set | No | No | Disabled skills |

## Verify a skill

Use these checks after installing, copying, creating, or editing a skill.

Start a fresh chat with the intended harness and workspace. If the skill appears in the `/` menu, [run the skill yourself](#use-skills-as-slash-commands) and give it a small task you expect it to handle. Review the tool activity and result to confirm that it uses the expected instructions and resources.

If you want the agent to select the skill automatically, test that separately with a request that matches its description. Discovery and installation make a skill available; they don't guarantee that the agent selects it for every relevant request.

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

The Codex harness is disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Contact the IT team that deployed the settings to discuss access.

### Local

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
| `description` | Yes | A description of what the skill does **and when to use it**. Be specific about both capabilities and use cases to help Copilot decide when to load the skill. Maximum 1024 characters. |
| `argument-hint` | No | Hint text shown in the chat input field when the skill is invoked as a slash command. Helps users understand what additional information to provide (for example, `[test file] [options]`). |
| `user-invocable` | No | Controls whether the skill appears as a slash command in the chat menu. Defaults to `true`. Set to `false` to hide the skill from the `/` menu while still allowing the agent to load it automatically. |
| `disable-model-invocation` | No | Controls whether the agent can automatically load the skill based on relevance. Defaults to `false`. Set to `true` to require manual invocation through the `/` slash command only. |
| `context` `feature(forked-skill-context)` | No | Controls how the skill is loaded. Defaults to inline (the skill's instructions are added to the parent agent's context). Set to `fork` to run the skill in a dedicated subagent context. See [Run a skill in a forked context](#run-a-skill-in-a-forked-context). |

> [!IMPORTANT]
> When a skill is distributed through a [plugin](/docs/agent-customization/agent-plugins.md), the plugin name is automatically used as a command prefix (for example, `/my-plugin:test-runner`). Do not manually add namespace prefixes to the skill `name` field. Using prefixes like `myorg/skillname` or `myorg:skillname` causes the skill to silently fail to load.

### Body

The skill body contains the instructions, guidelines, and examples that Copilot should follow when using this skill. Write clear, specific instructions that describe:

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

To check the skill, run `/webapp-testing for the login page`. Confirm that the result identifies the relevant test file, uses the project test command, and reports whether the test passed.
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

Skills load content progressively to keep your context efficient. Here is an example of how Copilot uses the `webapp-testing` skill:

1. **Discovery**: Copilot reads the skill's `name` and `description` from the YAML frontmatter. When you ask "help me test the login page", Copilot matches this to the `webapp-testing` skill based on its description.

2. **Instructions loading**: Copilot loads the `SKILL.md` body into its context, giving it access to the detailed testing procedures and guidelines. You can also trigger this step directly by typing `/webapp-testing` in chat.

3. **Resource access**: As Copilot works through the instructions, it accesses additional files in the skill directory, such as `test-template.js` or example scenarios, only when it references them. If a file isn't referenced in the instructions, it won't be loaded.

This three-level loading system means you can install many skills without consuming context. Copilot loads only what is relevant for each task.

Skills that opt in to a [forked context](#run-a-skill-in-a-forked-context) follow the same discovery step, but their instructions and any files they read are loaded into a separate subagent. Only the skill's final result is returned to the parent agent.

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

Agent Skills is an open standard that enables portability across different AI agents. Skills you create in {% data variables.product.prodname_vscode_shortname %} work with multiple agents, including:

* **GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}**: Available in chat and agent mode
* **{% data variables.copilot.copilot_cli %}**: Accessible when working in the terminal
* **{% data variables.copilot.github_copilot_app %}**: Available in the dedicated desktop experience.
* **{% data variables.product.prodname_openai_codex %} integration (Experimental)**: Discovers workspace skills in `.github/skills/` after you [set up the integration](/docs/agents/run/agent-harnesses.md#codex).

Learn more about the Agent Skills standard at [agentskills.io](https://agentskills.io).

## Related resources

* [Customize AI responses overview](/docs/agent-customization/overview.md)
* [Create custom instructions](/docs/agent-customization/custom-instructions.md)
* [Create reusable prompt files](/docs/agent-customization/prompt-files.md)
* [Create custom agents](/docs/agent-customization/custom-agents.md)
* [Agent Skills specification](https://agentskills.io)
* [Reference skills repository](https://github.com/anthropics/skills)
* [Discover and manage agent plugins](/docs/agent-customization/agent-plugins.md)
