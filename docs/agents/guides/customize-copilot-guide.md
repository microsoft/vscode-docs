---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 11/11/2026
MetaDescription: Improve your project's AI guidance with focused instructions, scoped rules, agents, and skills in {% data variables.product.prodname_vscode_shortname %}.
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

AI agents need reliable project context to follow your repository's structure and conventions. Build on the documentation and automation you already maintain. Start with one repeated problem, reuse an existing customization when it fits, and add your repository's own guidance only where needed.

This guide first helps you choose the right customization, then shows how the pieces fit together in a TypeScript API project. You'll apply what you need to your repository with focused project instructions and optional extensions. Finally, you'll try a representative task and refine the guidance based on the results.

The example uses the {% data variables.product.prodname_copilot %} harness in {% data variables.product.prodname_vscode %}, with alternatives for the {% data variables.product.prodname_anthropic_claude %} and {% data variables.product.prodname_openai_codex %} harnesses. A harness is the agent environment that provides tools and loads customizations. It is separate from the language model.

## Before you start

### Prepare your session

* Open your repository root.
* Complete the [setup and authentication for your harness](/docs/agents/run/agent-harnesses.md#requirements-and-setup) in {% data variables.product.prodname_vscode_shortname %}.
* [Select your harness](/docs/agents/run/agent-harnesses.md#select-a-harness) from **Session Target** and use it throughout setup.

Choose the article's tabs for your harness, not your language model. For example, a Claude model in a {% data variables.product.prodname_copilot_short %} session still uses the {% data variables.product.prodname_copilot_short %} harness.

> [!NOTE]
> Work in the current folder rather than a new worktree so new sessions can access your uncommitted customization files. In the {% data variables.copilot.agents_window %}, leave **New Worktree** unselected.

> [!NOTE]
> Claude and Codex harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Contact the IT team that deployed the settings to discuss access.

### Review your existing setup

Before adding another customization, check what the project already provides:

* Existing instruction files, skills, agents, and installed plugins for your harness.
* Setup, build, lint, and test commands documented in `README.md`, `CONTRIBUTING.md`, or other project documentation.
* Representative implementations, tests, and shared helpers that demonstrate the conventions you want followed.

Fix missing, stale, or unreliable documentation and commands that affect the task you want to improve. A customization should point to those shared sources rather than maintain a separate version solely for the agent.

If you haven't used an agent on this repository yet, run a representative task and use its result as a baseline. Otherwise, choose one recurring problem and note what the agent currently does and what a better result would look like. For example, generated API tests duplicate setup code, but should reuse the project's existing test helper.

## Choose the right customization

Choose the customization that matches the need. A one-time requirement belongs in the current prompt, not shared project configuration.

| What you encounter | Smallest useful response |
|------|-----|
| A published workflow already covers the capability you need | Reuse an existing skill or [plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) before building another |
| The agent puts handlers in the wrong layer or uses the wrong project command | Add [project instructions](#add-project-instructions) pointing to the expected structure, examples, and commands |
| Generated tests repeatedly duplicate shared setup | Add [scoped rules](#scoped-rules-for-specialized-conventions) for the relevant test files |
| You repeatedly need an API investigation with the same scope and output | Define a [custom agent](#custom-agents-for-specialized-roles) for that role |
| You repeat the same procedure to prepare a change for review | Package the procedure as an [agent skill](#skills-for-repeatable-procedures) |
| A command needs to run at a supported workflow event without the model requesting it | Configure a [hook](#hooks-for-event-driven-actions) |

## Example: Customize an API project

Consider a TypeScript API project with existing application code and tests. The `.github` entries below show the optional customizations discussed in this example, not files that every project needs:

```text
your-project/
  CONTRIBUTING.md              # Build, lint, and test commands
  src/
    api/routes/                # HTTP handlers
    schemas/                   # Request validation
    repositories/              # Data access
  tests/
    api/                       # Endpoint tests named *.test.ts
    helpers/createTestApp.ts   # Shared application setup for tests
  .github/
    copilot-instructions.md    # Copilot project instructions
    instructions/
      api-tests.instructions.md
    agents/
      researcher.agent.md
    skills/
      validate-change/
        SKILL.md
```

The team wants new handlers to follow this structure, API tests to reuse their existing setup, a researcher to explain request flows, and a repeatable procedure for checking an API change. These are different needs, not reasons to keep adding rules to one instruction file.

The four files below show one way to separate them for the **{% data variables.product.prodname_copilot_short %}** harness. Their full paths are relative to the repository root. Adapt them to files that exist in your project, and merge useful guidance into existing customizations rather than replacing them wholesale. You don't need all four files to get started.

<!-- {% annotated-code id="project-guidance" %} -->
<!-- {% file id="project" path=".github/copilot-instructions.md" %} -->

```markdown
# API project conventions

* Put HTTP handlers in `src/api/routes`.
* Put shared request-validation schemas in `src/schemas`.
* Keep database access in `src/repositories`, not in HTTP handlers.
* Read a nearby implementation before adding a new handler or schema.

## Project commands

Use the build, lint, and test commands documented in `CONTRIBUTING.md`.
```

<!-- {% /file %} -->
<!-- {% file id="tests" path=".github/instructions/api-tests.instructions.md" %} -->

```markdown
---
applyTo: 'tests/api/**/*.test.ts'
---
# API tests

* Reuse application setup from `tests/helpers/createTestApp.ts`.
* Check the response status and body for the requested behavior.
* Keep each test's data independent of other tests.
```

<!-- {% /file %} -->
<!-- {% file id="researcher" path=".github/agents/researcher.agent.md" %} -->

```markdown
---
name: Researcher
description: Trace API request handling and explain existing patterns without editing files
tools: ['read', 'search']
---
Investigate the API behavior identified in the request.
Follow the handler through validation and data access.
Read related tests to understand the expected behavior.

Return:
* Relevant files and symbols.
* A concise explanation of the request flow.
* Existing patterns to reuse for the proposed change.
* Open questions that the available code does not answer.

Do not edit files or run terminal commands.
```

<!-- {% /file %} -->
<!-- {% file id="skill" path=".github/skills/validate-change/SKILL.md" %} -->

```markdown
---
name: validate-change
description: Check an API change using the project's tests and lint commands. Use when preparing a change for review.
---
# Validate an API change

1. Inspect the changed handlers, schemas, repositories, and related tests.
1. Read `CONTRIBUTING.md` for test, lint, and setup commands.
1. Choose the smallest set of checks that covers the changed behavior.
   If a command or required tool is unavailable, report the limitation.
1. Run those checks without changing application code or weakening tests.
1. Summarize the commands, results, and remaining gaps.
```

<!-- {% /file %} -->
<!-- {% step id="shared" file="project" from="* Put HTTP handlers in `src/api/routes`." to="Use the build, lint, and test commands documented in `CONTRIBUTING.md`." %} -->
### Keep repository knowledge shared

Project instructions describe decisions that matter across tasks: where code belongs, how layers interact, and where to find project commands. Keep this knowledge in one place instead of repeating it in every prompt or custom agent. For your repository, replace the example paths and remove rules that don't address a recurring problem.

<!-- {% /step %} -->
<!-- {% step id="scope" file="tests" match="applyTo: 'tests/api/**/*.test.ts'" %} -->
### Narrow guidance to the files that need it

The pattern targets API test files, such as `tests/api/users.test.ts`, rather than the handler in `src/api/routes/users.ts`. It is relative to the repository root, not the instructions directory. Use a scoped file when a part of your codebase needs guidance that would be distracting in the project-wide file.

<!-- {% /step %} -->
<!-- {% step id="conventions" file="tests" from="* Reuse application setup from `tests/helpers/createTestApp.ts`." to="* Keep each test's data independent of other tests." %} -->
### Put specialized conventions beside their scope

These rules describe how this team writes API tests. They complement the shared architecture rules rather than repeating them. Adapt the fixture path and conventions to existing tests in your project. You don't need a separate agent just because one directory follows different rules.

<!-- {% /step %} -->
<!-- {% step id="role" file="researcher" from="name: Researcher" to="tools: ['read', 'search']" %} -->
### Define a role for a recurring task

The researcher has a focused purpose and access to reading and search tools. Use it to trace an API request from its handler through validation and data access before deciding where to make a change. It is not another file of general coding conventions. Tool access is harness-specific, so configure available tools and permissions rather than relying on role text to restrict actions.

<!-- {% /step %} -->
<!-- {% step id="result" file="researcher" from="Investigate the API behavior identified in the request." to="* Open questions that the available code does not answer." %} -->
### Describe the result, not the repository again

The agent body defines the investigation and the answer it should return. It doesn't repeat the directory rules or test setup. This keeps role-specific guidance separate from shared project knowledge, so each can change without maintaining several copies of the same rules.

<!-- {% /step %} -->
<!-- {% step id="workflow" file="skill" from="name: validate-change" to="1. Summarize the commands, results, and remaining gaps." %} -->
### Package a procedure for repeated use

The skill describes a sequence: inspect a change, select checks, run them, and summarize the result. Its description explains when to use that procedure. Unlike the scoped test rules, it is a task you invoke or the agent selects when relevant, not a convention for every matching file. Use it with an agent that has the required tools: the researcher above has no command-execution tools, and this skill's instructions don't change that configuration.

<!-- {% /step %} -->
<!-- {% /annotated-code %} -->

These responsibilities are useful across harnesses, but their file locations, activation rules, and tool controls differ. Use the harness-specific steps below to create your files. Instructions guide the model; they don't guarantee that it follows your conventions.

## Add project instructions

The first useful change is often one focused rule in an existing project instructions file. For example, point the agent to `src/api/routes` and a representative handler when it repeatedly creates handlers in the wrong layer. Keep an example of the current result so you can compare it after adding guidance. If the existing behavior already meets your needs, don't add a rule for it.

1. Open or create the project instructions file for your harness, relative to the repository root:

    * **{% data variables.product.prodname_copilot_short %}**: `.github/copilot-instructions.md` or `AGENTS.md`
    * **Claude**: `CLAUDE.md`
    * **Codex**: `AGENTS.md`

    To open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor), run **Chat: Open Customizations** from the Command Palette.

1. Add the guidance needed for your recurring problem. Use the [API project example](#example-customize-an-api-project) as a starting point, replacing its paths and conventions with your repository's own.
1. Preserve useful existing rules, remove conflicting or duplicate guidance, and save the file.

The example's project file is plain Markdown. You can adapt that body for another harness's project file, but don't assume that scoped-rule metadata or custom-agent tool lists transfer in the same way.

> [!TIP]
> You can ask an agent in chat to improve a customization. Identify the file and describe the behavior you want to change. Ask it to inspect relevant project conventions, preserve useful existing guidance, and limit changes to the customization. Use the intended harness and review the proposed changes.

### Keep the guidance focused

Keep only rules that help with your project:

* Name real paths, commands, and conventions instead of generic advice.
* Document decisions the agent cannot reliably infer from the code alone.
* Resolve conflicts and remove guidance duplicated elsewhere.
* Leave rules already enforced by formatters, linters, or CI in those tools. Explain how to run the existing checks instead of copying their configuration into prose.
* Move specialized rules into a narrower customization when they don't belong at project scope.

Learn more about [writing effective instructions](/docs/agent-customization/custom-instructions.md#write-effective-instructions). If this file addresses your need, skip the optional extensions and [try the guidance](#try-and-refine-your-guidance).

## Extend only where needed

Add another customization only when it addresses a specific need that your existing setup does not cover. Choose from the options below, or skip to [trying and refining your guidance](#try-and-refine-your-guidance). You don't need to use every type.

### Scoped rules for specialized conventions

Use scoped instructions when the agent needs conventions that apply only to particular files or directories. Keep broadly applicable rules in project instructions. A separate folder doesn't need its own instructions unless its conventions differ.

In the [API project example](#example-customize-an-api-project), endpoint tests reuse a shared application setup. The scoped rules describe that test-specific convention without repeating the project-wide architecture rules.

Create the file for your harness below, or ask the agent to create it from your existing test conventions.

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

Create `.github/instructions/api-tests.instructions.md`. For the example project's TypeScript API tests, include this YAML frontmatter before the Markdown instructions:

```yaml
---
applyTo: 'tests/api/**/*.test.ts'
---
```

Add the API test rules from the example, adapted to your repository. The pattern matches `.test.ts` files under `tests/api`, including subdirectories.

Learn more about [targeted instructions](/docs/agent-customization/custom-instructions.md#apply-instructions-to-specific-files-or-tasks) and [pattern syntax](/docs/agents/reference/custom-instructions-reference.md#file-patterns).

{% /tab %}
{% tab label="Claude" %}

Create `.claude/rules/api-tests.md`. Claude uses `paths` rather than `applyTo` for path-scoped rules:

```yaml
---
paths:
  - 'tests/api/**/*.test.ts'
---
```

Add your API test conventions below the header. Without `paths`, the rule file applies generally rather than only to matching files.

Learn more about [Claude path-specific rules](https://code.claude.com/docs/en/memory#path-specific-rules).

{% /tab %}
{% tab label="Codex" %}

Put your API test conventions in `tests/api/AGENTS.md`. Codex discovers instructions from the repository root down to the session's working directory. This is directory-based guidance, not an `applyTo` or `paths` glob.

To test the nested instructions, start a new Codex harness session with that subdirectory as its working folder. Opening a file in the editor doesn't change the session's working directory.

Learn more about [Codex instruction discovery](https://developers.openai.com/codex/guides/agents-md).

{% /tab %}
{% /tabs %}

Save the scoped rules and use a matching file when you [try the guidance](#try-and-refine-your-guidance). If you change the session's working folder for nested instructions, return to the repository root before creating other workspace customizations.

### Custom agents for specialized roles

Create a custom agent when you repeatedly need a distinct role with a consistent scope, expected output, or tool configuration. Use project or scoped instructions for additional coding conventions rather than creating a role for them.

The [researcher in the API project example](#example-customize-an-api-project) traces a request through the code and returns findings before you decide what to change.

Adapt the researcher's role to your needs and use the file location and tool configuration for your harness:

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

Save the adapted researcher example as `.github/agents/researcher.agent.md`. Keep its `tools` allowlist limited to the intended reading and search tools rather than tools that can edit files, run commands, or delegate work.

{% /tab %}
{% tab label="Claude" %}

Create `.claude/agents/researcher.md` using the Claude agent format. Adapt the research instructions and restrict the tools to `Read`, `Grep`, and `Glob`. Learn more about [Claude custom agents and tool access](https://code.claude.com/docs/en/sub-agents#available-tools).

{% /tab %}
{% tab label="Codex" %}

Save the research instructions in `.github/agents/researcher.agent.md`. The Codex integration in {% data variables.product.prodname_vscode_shortname %} loads the role instructions from this file, but doesn't use its `tools` frontmatter as a tool allowlist. Treat the no-edit instruction as guidance, not enforcement. Review [Codex permissions](/docs/agents/run/agent-harnesses.md#codex) before using the agent.

{% /tab %}
{% /tabs %}

Save the file and select the researcher from the agents dropdown in a new chat with the same harness. Ask it to explain an API request flow. Review its findings and tool activity.

For a complete test procedure and guidance on refining the agent's role, see [Verify your custom agent](/docs/agent-customization/custom-agents.md#verify-your-custom-agent).

### Skills for repeatable procedures

Use an agent skill when you repeatedly explain the same multi-step procedure. Package the procedure for an agent to use rather than creating a separate role just to repeat that workflow. Use scoped instructions instead when you need a convention for particular files, not a procedure to carry out.

The [validate-change skill in the API project example](#example-customize-an-api-project) packages the process of selecting and running relevant checks, then summarizing their results.

Adapt that complete `SKILL.md` file to your repository's process. Use the directory for your harness below. A skill can also include scripts, templates, and other resources; see the [testing skill and report template](/docs/agent-customization/agent-skills.md#create-a-skill) for a multi-file example.

{% tabs id="customization-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %}" %}

Store the skill at `.github/skills/validate-change/SKILL.md`, with its supporting files in the same skill directory.

{% /tab %}
{% tab label="Claude" %}

Store the skill at `.claude/skills/validate-change/SKILL.md`, with its supporting files in the same skill directory.

{% /tab %}
{% tab label="Codex" %}

Store the skill at `.agents/skills/validate-change/SKILL.md`, with its supporting files in the same skill directory.

{% /tab %}
{% /tabs %}

Review the skill and all supporting files. Keep its `name` consistent with the directory name, and use the description to explain when the workflow is useful. In a fresh chat, select **validate-change** from the `/` menu and give it a small task. If you also want automatic selection, try a matching request separately without naming the skill. See [Verify a skill](/docs/agent-customization/agent-skills.md#verify-a-skill).

### Hooks for event-driven actions

Use a hook when a command should run at a supported event, such as recording a tool call or running a formatter after a tool completes. Unlike an instruction or skill, the hook is invoked by the runtime at that event rather than relying on the model to request the action.

Keep ordinary build and quality checks in your existing automation. Add a hook only when running a command at a specific agent event matters, reusing existing scripts or checks where possible.

Hooks run code, and their event formats, permissions, and failure behavior depend on the harness. Review the script and its dependencies before enabling it. For setup and a connected configuration-and-script example, see [Configure agent hooks](/docs/agent-customization/hooks.md). Hooks complement project guidance; they don't replace it or guarantee that the model follows other instructions.

Before building a reusable workflow or role, [browse customization marketplaces](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview) for an existing skill or plugin. Plugins package related customizations so you can adopt them together. Review the publisher, included files, and supported harness before installing because a plugin can include scripts or servers that run code. Keep repository-specific rules in your project's instructions rather than duplicating a plugin's workflow. For more on how instructions, agents, skills, and hooks fit together, see [Agent customization](/docs/agents/concepts/customization.md).

## Try and refine your guidance

Choose a small task affected by the rule or role you added. For the API example, this could be adding a handler in the right layer, writing a test that reuses the shared setup, or explaining a request flow.

1. Save the customization and start a fresh chat with the same harness and repository. Confirm that the file appears in the Agent Customizations editor.
1. Repeat the task without restating the saved instructions in your prompt. Use a matching file for scoped guidance, select the custom agent for a role, or explicitly invoke a skill for its workflow.
1. Check **References**, where available, or [inspect the request](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied) if it is unclear whether the instructions were included.
1. Compare the actual changes and tool activity with the earlier result. Keep the model, task, and relevant context consistent where practical. Check file placement, reused patterns, and command output, not only the agent's summary.

Discovery, inclusion, and following the guidance are different checks. If a file is missing or not included, [troubleshoot the customization](/docs/agents/agent-troubleshooting/troubleshooting.md) before adding more instructions. If it is included but the result misses your goal, clarify one relevant rule and repeat the task.

Stop when the guidance addresses the need. More instructions consume context and can introduce conflicts. For a broader comparison of quality, reliability, and resource use, follow the [usage optimization loop](/docs/agents/guides/optimize-usage.md#inspect-token-usage-and-caching).

Keep useful customizations in version control with their supporting files, and update them when your project's structure or conventions change.
