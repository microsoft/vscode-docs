---
ContentId: 8b4f3c21-4e02-4a89-9f15-7a8d6b5c2e91
DateApproved: 10/29/2026
MetaDescription: Create and test custom instructions in {% data variables.product.prodname_vscode_shortname %} to guide agents with project conventions.
MetaSocialImage: ../../learn/images/shared/agent-first-development-social.png
Keywords:
- customize
- rules
- instructions
- copilot-instructions.md
- AGENTS.md
- CLAUDE.md
- coding standards
- ai
- copilot
---
# Use custom instructions in {% data variables.product.prodname_vscode_shortname %}

Custom instructions give an agent reusable guidance about your project, such as where to add code, which libraries to use, and which tests to run. Store this guidance in Markdown files instead of repeating it in every prompt, and share project instructions through source control.

Start with one convention the agent repeatedly misses. Create instructions in the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor), then test their effect in a new chat before adding more targeted guidance. For supported locations, file syntax, and settings, see the [Custom instructions reference](/docs/agents/reference/custom-instructions-reference.md).

Instructions guide the model. They don't guarantee compliance or replace tests, code review, or security controls. They don't apply to [inline suggestions](/docs/editing/ai-powered-suggestions.md) as you type.

## Get started with project instructions

Open the repository root and [select the agent harness](/docs/agents/run/agent-harnesses.md#select-a-harness) you intend to use. The harness determines which instruction files it reads. Choosing a Claude model in a {% data variables.product.prodname_copilot_short %} session, for example, doesn't switch to the Claude harness.

For this first setup, work in the current folder rather than a new worktree so the test session can access your uncommitted instructions.

### Create project instructions

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`) to open the Agent Customizations editor and select the **Instructions** tab.

1. To add a project instructions file, select `+` next to **Workspace** and choose the project instruction file offered for your harness, such as `AGENTS.md` or `CLAUDE.md`. The editor creates or opens the file in your workspace.

   If your repository already has a project instructions file, open it instead of creating a competing copy.

1. Add a few specific rules that address the repeated problem. For example, a Node.js API project might use the following instructions. Replace the paths and test command with ones that work in your repository.

   ```markdown
   # Project instructions

   * Add HTTP handlers under `src/api/routes`.
   * Keep database access in `src/repositories` so handlers remain independently testable.
   * Add or update tests for behavior changes, and run `npm test -- <test-file>` for the affected tests.
   ```

1. Save the file. No frontmatter is needed for these project instruction files.

#### Create the file directly

If you prefer to create the file outside the Agent Customizations editor, use a supported project instructions file for your harness. Paths below are relative to the repository root. Create missing folders as needed.

| Harness | Project instructions file |
|---------|---------------------------|
| {% data variables.product.prodname_copilot_short %} | `.github/copilot-instructions.md` or `AGENTS.md` |
| {% data variables.product.prodname_anthropic_claude %} | `CLAUDE.md` |
| {% data variables.product.prodname_openai_codex %} | `AGENTS.md` |
| Local | `.github/copilot-instructions.md` or `AGENTS.md` |

Add your rules, save the file, and verify it as described below. `AGENTS.md` is a cross-agent format, not a Codex-only file. See [supported formats](/docs/agents/reference/custom-instructions-reference.md#supported-formats-and-locations) before sharing one file across harnesses.

### Verify your instructions

Test a small task where the rules affect the outcome. Use the same harness and repository throughout:

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`). Select **Instructions** and confirm that the file is listed. This checks discovery, not whether the agent follows the rules.
1. Start a new chat so the test doesn't depend on guidance from the conversation that created the instructions.
1. Ask for a small change without repeating the rules in the prompt. For the API example, ask the agent to add an endpoint using the project's existing patterns.
1. Check the response's **References** section, where available, for the instructions file. If you need more detail, [inspect the request in Agent Debug Logs](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied).
1. Review the changes and tool activity. For the example, check where the handler was added, how it accesses data, and whether the agent ran the relevant tests.

If the result meets your goal, review and commit the instructions file so your team can use it. If not, [identify whether the file was discovered, included, or followed](#troubleshoot-instructions) before adding more rules.

For a complete before-and-after comparison and team rollout workflow, follow [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

## How instructions apply

Scope and activation answer different questions. Scope determines where guidance is available and who shares it. Activation determines when that guidance is included in a request.

| Scope | Use it for |
|-------|------------|
| Workspace or repository | Project conventions shared with contributors through source control |
| User | Personal preferences across projects, in a location supported by your harness |
| Organization | Centrally managed guidance for supported experiences |

Start with project instructions for rules that apply broadly. Use targeted instructions for guidance needed only in part of your codebase.

| Activation | How it works |
|------------|--------------|
| Project-wide | The harness includes guidance from its project instruction files. |
| File pattern | An `.instructions.md` file uses `applyTo`, or a Claude rules file uses `paths`, to match files the agent works with. |
| Task relevance | In Local sessions, a `description` lets the agent decide whether to read an instructions file for the task. This is separate from pattern matching. |
| Manual | Attach guidance for a particular request when automatic discovery or activation isn't appropriate. |

An instruction file such as `AGENTS.md` provides guidance to an existing agent. It doesn't define a [custom agent](/docs/agent-customization/custom-agents.md). For a reusable multi-step workflow rather than coding conventions or project context, consider an [agent skill](/docs/agent-customization/agent-skills.md).

## Apply instructions to specific files or tasks

Keep project-wide rules in your main instructions file. Add targeted guidance when, for example, tests need different conventions from application code. The following example scopes Python testing rules to a `tests` directory.

Create the file for your harness below, adapting the paths and rules to your project.

{% tabs id="instruction-harness" %}
{% tab label="{% data variables.product.prodname_copilot_short %} or Local" %}

Create multiple `.instructions.md` files in `.github/instructions` to keep guidance for different languages, folders, or tasks separate. Use the `applyTo` field in each file's YAML frontmatter to specify which files the instructions apply to.

For example, create `.github/instructions/python-tests.instructions.md` with guidance for Python tests:

```markdown
---
applyTo: 'tests/**/*.py'
---
# Python tests

* Reuse fixtures from `tests/conftest.py` instead of duplicating setup.
* Name tests `test_<behavior>_<condition>`.
* Run `python -m pytest <test-file>` after changing a test.
```

The pattern matches `tests/test_api.py` and `tests/unit/test_api.py`, but not `src/api.py`. It is relative to the workspace or project root, not the `.github/instructions` directory.

In Local sessions, you can also add a `description`, such as `'Use when creating or updating Python tests.'`, for task-based discovery. The description is not an extra restriction on `applyTo`. The agent can load the file by relevance separately from pattern matching.

{% /tab %}
{% tab label="Claude" %}

Create multiple Markdown files in `.claude/rules` to separate guidance by language, folder, or task. Use the `paths` field in each file's YAML frontmatter to list the file patterns the rules apply to. Patterns are relative to the project root.

For example, create `.claude/rules/python-tests.md`:

```markdown
---
paths:
  - 'tests/**/*.py'
---
# Python tests

* Reuse fixtures from `tests/conftest.py` instead of duplicating setup.
* Name tests `test_<behavior>_<condition>`.
* Run `python -m pytest <test-file>` after changing a test.
```

The rule targets Python files under `tests`, including nested directories. Without `paths`, the rule applies generally.

{% /tab %}
{% tab label="Codex" %}

Create an `AGENTS.md` file in each directory that needs specialized guidance. Keep project-wide instructions in the repository-root `AGENTS.md`. Codex uses directory locations rather than `applyTo` or `paths` patterns, and these files don't require YAML frontmatter.

For example, create `tests/AGENTS.md`:

```markdown
# Python tests

* Reuse fixtures from `conftest.py` instead of duplicating setup.
* Name tests `test_<behavior>_<condition>`.
* Run `python -m pytest <test-file>` after changing a test.
```

Start a new Codex session with `tests` as its working directory. Codex loads instructions along the path from the repository root to that directory. Opening a test file in the editor doesn't change the session's working directory.

{% /tab %}
{% /tabs %}

After creating the file:

1. Save it and start a new chat with the same harness.
1. Ask the agent to add or update a test in the matching directory.
1. [Verify inclusion and behavior](#verify-your-instructions). Check that the test follows the naming and fixture conventions and that the agent runs the test command.

For additional patterns and nested-file behavior, see [instruction activation](/docs/agents/reference/custom-instructions-reference.md#discovery-and-activation).

### Attach instructions to one request

For a one-time requirement, put the guidance in your prompt rather than creating a shared rule.

To reuse an existing instructions file for one request, select **Add Context** (`+` icon) in the chat input and select the file before sending the request.

## Write effective instructions

Write rules that help the agent make project-specific decisions, rather than describing everything in the repository.

| Instead of | Write |
|------------|-------|
| Write good tests. | Reuse fixtures from `tests/conftest.py` and run `python -m pytest <test-file>` after changing a test. |
| Follow the architecture. | Keep database access in `src/repositories` so HTTP handlers remain independently testable. |
| Follow our style. | Use the existing error type in `src/errors.ts` rather than returning an error string. |

* **Keep rules concise.** Use a short statement for each requirement and explain non-obvious constraints.
* **Prefer actionable details.** Name the command, directory, library, or existing example the agent should use.
* **Avoid unnecessary context.** Don't duplicate rules enforced by formatters or linters. Move specialized guidance out of the project-wide file.
* **Maintain instructions with the code.** Review changes through source control and update rules when commands, architecture, or dependencies change.
* **Reference supporting documentation carefully.** Use Markdown links with relative paths and `/` separators. A link doesn't guarantee that the document's contents reach the model. Check [referenced-file behavior](/docs/agents/reference/custom-instructions-reference.md#reference-other-files).

### Resolve conflicting instructions

Keep shared requirements consistent across personal, repository, and organization guidance. Don't rely on a universal precedence order: [combination rules differ by harness](/docs/agents/reference/custom-instructions-reference.md#combine-instruction-sources).

If a personal instruction requests one library and the repository requires another, remove or narrow the conflicting personal rule. Don't add another rule to compensate. Repeat the same representative task in a new chat after resolving the conflict.

## Manage project and personal instructions

Return to **Instructions** in the Agent Customizations editor to find and edit existing instructions. To add personal instructions, select `+` next to **User**. Follow the prompts for a name and storage location supported by your harness, save the file, and verify it in a new chat with that harness.

Use user scope for personal preferences across projects. Don't put your individual response preferences in a shared project file unless your team wants them too. For locations and synchronization limits, see [user instructions](/docs/agents/reference/custom-instructions-reference.md#user-instructions).

<a name="sync-local-agent-instructions-across-devices"></a>

## Instruction formats and settings

Use the [Custom instructions reference](/docs/agents/reference/custom-instructions-reference.md) to look up:

* [File formats, locations, and frontmatter](/docs/agents/reference/custom-instructions-reference.md#supported-formats-and-locations).
* [Discovery, patterns, and nested instructions](/docs/agents/reference/custom-instructions-reference.md#discovery-and-activation).
* [Personal instructions and Settings Sync](/docs/agents/reference/custom-instructions-reference.md#user-instructions).
* [Organization instructions](/docs/agents/reference/custom-instructions-reference.md#organization-instructions).
* [Settings for instructions and generated content](/docs/agents/reference/custom-instructions-reference.md#settings).

## Troubleshoot instructions

Identify the failure stage before changing your guidance:

| What you observe | What to check |
|------------------|---------------|
| The file isn't listed in the Customizations editor. | Confirm the selected harness, file name, supported location, and whether the session uses the folder containing your changes. |
| The file is discovered but isn't included for the task. | Check frontmatter errors and activation conditions. Test a matching file, or attach the instructions manually. For Local, check the applicable [discovery settings](/docs/agents/reference/custom-instructions-reference.md#local-harness-settings). |
| The file is included but the result doesn't follow it. | Check for contradictory or vague rules. Clarify one rule, repeat the task in a new chat, and compare the actual changes and tool activity. |

The response's **References** section, where available, helps check inclusion, not compliance. For detailed evidence, follow [instruction diagnostics](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied). Prepare logging before reproducing the issue.

## Related resources

* [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md) for a measured create, verify, and share workflow.
* [Custom instructions reference](/docs/agents/reference/custom-instructions-reference.md) for syntax and harness-specific behavior.
* [Agent customization concepts](/docs/agents/concepts/customization.md) to choose between instructions, skills, and other customizations.
