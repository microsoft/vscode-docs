---
ContentId: 5d7b8e63-421c-4e92-9b03-a7d4c918f620
DateApproved: 10/29/2026
MetaDescription: Look up custom instruction formats, locations, activation rules, and settings in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../../learn/images/shared/agent-first-development-social.png
Keywords:
- custom instructions
- instructions.md
- copilot-instructions.md
- AGENTS.md
- CLAUDE.md
- applyTo
- reference
---
# Custom instructions reference

Use this reference to look up instruction file formats, locations, activation rules, and settings for your agent harness. For a first setup, examples, and verification steps, see [Use custom instructions](/docs/agent-customization/custom-instructions.md).

## Supported formats and locations

The selected [agent harness](/docs/agents/run/agent-harnesses.md#select-a-harness), not the language model, determines instruction support. The following table lists common project formats. Paths are relative to the repository root unless noted.

| Harness | Project instructions | Targeted instructions |
|---------|----------------------|-----------------------|
| {% data variables.product.prodname_copilot_short %} | `.github/copilot-instructions.md` or `AGENTS.md` | `.github/instructions/**/*.instructions.md` or nested `AGENTS.md` files |
| {% data variables.product.prodname_anthropic_claude %} | `CLAUDE.md` or `.claude/CLAUDE.md` | Markdown files in `.claude/rules` |
| {% data variables.product.prodname_openai_codex %} | `AGENTS.md` | `AGENTS.md` files along the path to the session's working directory |
| Local | `.github/copilot-instructions.md`, `AGENTS.md`, or `CLAUDE.md` | `.github/instructions/**/*.instructions.md` or Markdown files in `.claude/rules` |

`AGENTS.md` is a cross-agent instruction format. It is not a custom agent definition, and its discovery rules differ by harness. If your team uses multiple harnesses, choose a shared supported format where possible and keep any separate copies consistent.

Some harnesses support additional native formats. See the [Copilot instruction locations](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions), [Claude instruction locations](https://code.claude.com/docs/en/memory), and [Codex instruction discovery](https://developers.openai.com/codex/guides/agents-md) for their runtime-specific rules.

### User instructions

User instructions contain personal guidance across projects. `~` refers to the home directory on the machine where the agent runs.

| Harness | Personal project-independent guidance |
|---------|---------------------------------------|
| {% data variables.product.prodname_copilot_short %} | `~/.copilot/copilot-instructions.md` for general guidance; `~/.copilot/instructions/**/*.instructions.md` for modular instructions |
| {% data variables.product.prodname_anthropic_claude %} | `~/.claude/CLAUDE.md` for general guidance; `~/.claude/rules` for modular rules |
| {% data variables.product.prodname_openai_codex %} | `AGENTS.md` in the Codex home directory, which defaults to `~/.codex` |
| Local | Instructions in the {% data variables.product.prodname_vscode_shortname %} user profile, created through the Agent Customizations editor |

Harness user folders are separate from {% data variables.product.prodname_vscode_shortname %} profile storage and don't roam through Settings Sync. To move existing profile instructions, see [user customization migration](/docs/agent-customization/migrate-customizations.md#move-user-agents-and-instructions).

To sync Local profile instructions across devices, turn on [Settings Sync](/docs/configure/settings-sync.md), run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`), and select **Prompts and Instructions**.

### Additional search locations

The editor searches instruction directories recursively, so `.github/instructions` can contain subfolders for languages, teams, or modules.

The `setting(chat.instructionsFilesLocations)` setting adds search locations. It remains supported, and the editor forwards instructions from additional configured locations to Agent Host harnesses. Prefer native harness folders for portability: {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %} don't inherit editor settings. See [migrate configured locations](/docs/agent-customization/migrate-customizations.md#move-customizations-from-configured-locations).

For Local sessions that open a subfolder of a repository, `setting(chat.useCustomizationsInParentRepositories)` enables discovery from the parent repository. This setting doesn't control other harnesses. See [monorepo discovery](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo).

## File syntax

Project files such as `.github/copilot-instructions.md`, `AGENTS.md`, and `CLAUDE.md` contain Markdown instructions and don't require YAML frontmatter.

### Instructions file fields

An `*.instructions.md` file contains an optional YAML header between `---` delimiters, followed by Markdown instructions:

```markdown
---
name: 'Python tests'
description: 'Use when creating or updating Python tests.'
applyTo: 'tests/**/*.py'
---
Reuse fixtures from `tests/conftest.py`.
Run `python -m pytest <test-file>` after changing a test.
```

These fields describe the instruction format recognized by the editor. Activation depends on the [harness](#discovery-and-activation).

| Field | Type | Required | Meaning |
|-------|------|----------|---------|
| `name` | String | No | Display name in the UI. Defaults to the file name. |
| `description` | String | No | Describes the relevant task. In Local sessions, the agent can use it to decide whether to load the file on demand. |
| `applyTo` | String | No | One or more comma-separated glob patterns for matching files. Use `**` for all files. There is no default pattern. |

For Local sessions, omitting both `description` and `applyTo` leaves the file available for manual attachment rather than automatic activation. A description is not an additional condition that must match before `applyTo` takes effect.

Files shared with other {% data variables.product.prodname_copilot_short %} features can also use feature-specific fields such as `excludeAgent`. Check [GitHub's instruction support reference](https://docs.github.com/en/copilot/reference/custom-instructions-support) and [repository instruction configuration](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide) rather than assuming these fields switch the VS Code harness.

### Claude rules fields

Markdown rules in `.claude/rules` use `paths` instead of `applyTo`:

```markdown
---
paths:
  - 'tests/**/*.py'
---
Reuse fixtures from `tests/conftest.py`.
```

`paths` is an array of glob patterns. Omitting it makes the rule apply generally rather than restricting it to particular paths. Local also reads this format. See [Claude rules](https://code.claude.com/docs/en/memory) for native harness behavior.

## Discovery and activation

Discovery means a harness or the editor finds an instructions file. Inclusion means its contents become part of a request. Neither guarantees that the model follows every rule.

### File patterns

For repository instruction files, patterns are relative to the workspace or project root, not the directory containing the instructions file. Use `/` path separators across operating systems.

| Pattern | Matches | Does not match |
|---------|---------|----------------|
| `*.py` | `app.py` at the root | `src/app.py` |
| `src/*.py` | `src/app.py` | `src/api/routes.py` |
| `src/**/*.py` | `src/app.py`, `src/api/routes.py` | `tests/test_app.py` |
| `tests/**/*.py` | `tests/test_app.py`, `tests/unit/test_app.py` | `src/app.py` |
| `**/*.ts, **/*.tsx` | TypeScript and TSX files at any depth | JavaScript files |
| `**` | All files | No files excluded by the pattern |

In {% data variables.product.prodname_copilot_short %} sessions, `applyTo` targets files the agent works with. In Local, matching file context can attach instructions automatically when `setting(chat.includeApplyingInstructions)` is on. Local can also offer instructions for on-demand loading based on their description. Don't use a description as a substitute for a pattern when you need file-scoped guidance.

### Nested project instructions

| Harness | Nested-file behavior |
|---------|----------------------|
| {% data variables.product.prodname_copilot_short %} | Discovers `AGENTS.md` at the repository root, working directory, intermediate directories, and along paths to files it works with. Applicable instructions are combined. |
| {% data variables.product.prodname_openai_codex %} | Builds an instruction chain from the project root to the session's working directory. To use instructions in a subfolder, start the session with that subfolder as its working directory. |
| Local | Workspace-root `AGENTS.md` is included when `setting(chat.useAgentsMdFile)` is on. Nested files require both that setting and `setting(chat.useNestedAgentsMdFiles)`. |

`feature(nested-agents-md-files)`

Local nested-file discovery is experimental and off by default. When enabled, it lists nested files and their folder locations so the agent can load relevant instructions on demand. These Local settings don't change {% data variables.product.prodname_copilot_short %} or Codex discovery.

For Claude's directory-based loading, see [Claude instruction discovery](https://code.claude.com/docs/en/memory#how-claude-md-files-load).

### Reference other files

Markdown links let instructions point to supporting files and URLs. Relative file links resolve from the instructions file. Linking to a document is not a guarantee that its contents are included in every request.

In Local, `setting(chat.includeReferencedInstructions)` controls automatic inclusion of referenced instructions and is off by default. Other harnesses use their native inclusion mechanisms. See [Copilot file references](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions#referencing-other-files) and [Claude instructions](https://code.claude.com/docs/en/memory).

Keep essential rules in the instructions themselves. For a task that depends on a supporting document, attach that document or explicitly ask the agent to read it, and verify the resulting request or tool activity.

### Manual attachment

Sessions that support instruction attachments offer **Add Context** > **Instructions** in the chat input. If that option isn't available, attach the Markdown file as ordinary file context and ask the agent to follow it for the current task. See [attach instructions to one request](/docs/agent-customization/custom-instructions.md#attach-instructions-to-one-request).

## Combine instruction sources

There is no precedence rule that applies across all harnesses.

* {% data variables.product.prodname_copilot_short %} combines applicable user and repository instructions without a general precedence order between instruction files.
* Local can include multiple applicable instruction files. Avoid contradictory rules rather than relying on their order.
* Codex combines project instructions from the root toward the working directory, with more specific guidance later in the chain. Its native configuration also supports override files.
* Claude uses its own loading rules for user, project, and directory guidance.

For details, use the native documentation linked in [supported formats](#supported-formats-and-locations). To resolve conflicting rules, change their sources and [repeat a representative task](/docs/agent-customization/custom-instructions.md#resolve-conflicting-instructions).

## Organization instructions

Organization instructions are managed on GitHub rather than in a repository file. Their availability depends on the client and feature, so don't assume that signing in makes them available to every harness.

Local has an organization instruction provider controlled by `setting(github.copilot.chat.organizationInstructions.enabled)`, which is on by default. Verify discovery for your account and session in the Agent Customizations editor.

For organization configuration and supported GitHub experiences, see [organization custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions#about-organization-custom-instructions). Keep applicable organization and project guidance consistent.

## Settings

### Local harness settings

These settings control Local discovery and activation, not the native discovery rules of other harnesses:

| Purpose | Setting |
|---------|---------|
| Include `.github/copilot-instructions.md` | `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` |
| Include matching `.instructions.md` files | `setting(chat.includeApplyingInstructions)` |
| Include linked instructions | `setting(chat.includeReferencedInstructions)` |
| Include workspace-root `AGENTS.md` | `setting(chat.useAgentsMdFile)` |
| Discover nested `AGENTS.md` | `setting(chat.useNestedAgentsMdFiles)` |
| Include Claude instruction files | `setting(chat.useClaudeMdFile)` |
| Discover customizations in parent repositories | `setting(chat.useCustomizationsInParentRepositories)` |

For Claude instruction files, Local checks the workspace-root `CLAUDE.md`, `.claude/CLAUDE.md`, `~/.claude/CLAUDE.md`, and `CLAUDE.local.md`. Add personal project files such as `CLAUDE.local.md` to `.gitignore` if they shouldn't be shared.

For defaults and additional configuration, see [custom instruction settings](/docs/agents/reference/ai-settings.md#custom-instructions-settings). The additional-location setting is described separately under [search locations](#additional-search-locations).

### Generated-content settings

Code review, commit message generation, and pull request description generation have separate settings. Each accepts an array of objects with either a `text` property for an inline rule or a `file` property for a Markdown file path.

| Scenario | Setting |
|----------|---------|
| Review selected code | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Generate commit messages (Experimental) | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Generate pull request descriptions (Experimental) | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |

Settings-based code generation and test generation instructions are deprecated. Use instruction files for those scenarios instead.

## Related resources

* [Use custom instructions](/docs/agent-customization/custom-instructions.md) to create and test project guidance.
* [Migrate customizations](/docs/agent-customization/migrate-customizations.md) when changing harnesses or storage locations.
* [Debug instruction inclusion](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied) to inspect what reached the model.
