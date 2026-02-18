---
ContentId: 8b4f3c21-4e02-4a89-9f15-7a8d6b5c2e91
DateApproved: 02/04/2026
MetaDescription: Learn how to create custom instructions for GitHub Copilot Chat in VS Code to ensure AI responses match your coding practices, project requirements, and development standards.
MetaSocialImage: ../images/shared/github-copilot-social.png
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
# Use custom instructions in VS Code

Custom instructions enable you to define common guidelines and rules that automatically influence how AI generates code and handles other development tasks. Instead of manually including context in every chat prompt, specify custom instructions in a Markdown file to ensure consistent AI responses that align with your coding practices and project requirements.

You can configure custom instructions to apply automatically to all chat requests or to specific files only. Alternatively, you can manually attach custom instructions to a specific chat prompt.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Generate instructions">
Set up your project for AI with `/init` to generate custom instructions tailored to your project.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?prompt=%2Finit)

</div>

> [!NOTE]
> Custom instructions are not taken into account for [inline suggestions](/docs/copilot/ai-powered-suggestions.md) as you type in the editor.

## Types of instruction files

VS Code supports two categories of custom instructions. If you have multiple instruction files in your project, VS Code combines and adds them to the chat context, no specific order is guaranteed.

### Always-on instructions

Always-on instructions are automatically included in every chat request. Use them for project-wide coding standards, architecture decisions, and conventions that apply to all code.

* A single [`.github/copilot-instructions.md`](#use-a-githubcopilot-instructionsmd-file) file
    * Automatically applies to all chat requests in the workspace
    * Stored within the workspace

* One or more [`AGENTS.md`](#use-an-agentsmd-file) files
    * Useful if you work with multiple AI agents in your workspace
    * Automatically applies to all chat requests in the workspace or to specific subfolders (experimental)
    * Stored in the root of the workspace or in subfolders (experimental)

* [Organization-level instructions](#share-custom-instructions-across-teams)
    * Share instructions across multiple workspaces and repositories within a GitHub organization
    * Defined at the GitHub organization level

* [`CLAUDE.md`](#use-a-claudemd-file) file
    * For compatibility with Claude Code and other Claude-based tools
    * Stored in the workspace root, `.claude` folder, or user home directory

### File-based instructions

File-based instructions are applied when files that the agent is working on match a specified pattern or if the description matches the current task. Use file-based instructions for language-specific conventions, framework patterns, or rules that only apply to certain parts of your codebase.

* One or more [`.instructions.md`](#use-instructionsmd-files) files
    * Conditionally apply instructions based on file type or location by using glob patterns
    * Stored in the workspace or user profile

To reference specific context in your instructions, such as files or URLs, you can use Markdown links.

> [!TIP]
> **Which approach should you use?** Start with a single `.github/copilot-instructions.md` file for project-wide coding standards. Add `.instructions.md` files when you need different rules for different file types or frameworks. Use `AGENTS.md` if you work with multiple AI agents in your workspace.

## Use a `.github/copilot-instructions.md` file

VS Code automatically detects a `.github/copilot-instructions.md` Markdown file in the root of your workspace and applies the instructions in this file to all chat requests within this workspace.

Use `copilot-instructions.md` for:

* Coding style and naming conventions that apply across the project
* Technology stack declarations and preferred libraries
* Architectural patterns to follow or avoid
* Security requirements and error handling approaches
* Documentation standards

Follow these steps to create a `.github/copilot-instructions.md` file in your workspace:

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions in Markdown format. Keep them concise and focused for optimal results.

> [!NOTE]
> VS Code also supports the use of an [`AGENTS.md` file](#use-an-agentsmd-file) for always-on instructions.

<details>
<summary>Example: General coding guidelines</summary>

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

</details>

## Use `.instructions.md` files

You can create file-based instructions with `*.instructions.md` Markdown files that are applied dynamically based on the files or tasks the agent is working on.

The agent determines which instructions files to apply based on the file patterns specified in the `applyTo` property in the instructions file header or semantic matching of the instruction description to the current task.

Use `.instructions.md` files for:

* Different conventions for frontend vs. backend code
* Language-specific guidelines in a monorepo
* Framework-specific patterns for specific modules
* Specialized rules for test files or documentation

### Instructions file locations

You can define instructions for a specific workspace or at the user level, where they are applied across all your workspaces.

| Scope | Default file location |
|-------|-----------------------|
| Workspace | `.github/instructions` folder |
| User profile | `prompts` folder of the current [VS Code profile](/docs/configure/profiles.md) |

For compatibility with Claude Code and other Claude-based tools, VS Code also detects instructions files in the `.claude/rules` workspace folder and the `~/.claude/rules` user folder.

You can configure additional file locations for workspace instructions files with the `setting(chat.instructionsFilesLocations)` setting. This is useful if you want to keep instructions files in a different folder or have multiple folders for better organization.

### Instructions file format

Instructions files are Markdown files with the `.instructions.md` extension. The optional YAML frontmatter header controls when the instructions are applied:

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No | Display name shown in the UI. Defaults to the file name. |
| `description` | No | Short description shown on hover in the Chat view. |
| `applyTo` | No | Glob pattern that defines which files the instructions apply to automatically, relative to the workspace root. Use `**` to apply to all files. If not specified, the instructions are not applied automatically — you can still add them manually to a chat request. |

The body contains the instructions in Markdown format. To reference agent tools, use the `#tool:<tool-name>` syntax (for example, `#tool:githubRepo`).

```markdown
---
name: 'Python Standards'
description: 'Coding conventions for Python files'
applyTo: '**/*.py'
---
# Python coding standards
- Follow the PEP 8 style guide.
- Use type hints for all function signatures.
- Write docstrings for public functions.
- Use 4 spaces for indentation.
```

### Create an instructions file

When you create an instructions file, choose whether to store it in your workspace or user profile. Workspace instructions files apply only to that workspace, while user instructions files are available across multiple workspaces.

To create an instructions file:

> [!TIP]
> Type `/instructions` in the chat input to quickly open the **Configure Instructions and Rules** menu.

1. In the Chat view, select **Configure Chat** (gear icon) > **Chat Instructions**, and then select **New instruction file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Instructions File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where to create the instructions file.

    * **Workspace**: create the instructions file in the `.github/instructions` folder of your workspace to only use it within that workspace. Add more instruction folders for your workspace with the `setting(chat.instructionsFilesLocations)` setting.

    * **User profile**: create the instructions files in the [current profile folder](/docs/configure/profiles.md) to use it across all your workspaces.

1. Enter a file name for your instructions file. This is the default name that is used in the UI.

1. Author the custom instructions by using Markdown formatting.

    * Fill in the YAML frontmatter at the top of the file to configure the instructions' description, name, and when they apply.
    * Add instructions in the body of the file.

To modify an existing instructions file, in the Chat view, select **Configure Chat** (gear icon) > **Chat Instructions**, and then select an instructions file from the list. Alternatively, use the **Chat: Configure Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instructions file from the Quick Pick.

<details>
<summary>Example: Language-specific coding guidelines</summary>

Notice how these instructions reference the general coding guidelines file. You can separate the instructions into multiple files to keep them organized and focused on specific topics.

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---
# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines
- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use React.FC type for components with children
- Keep components small and focused
- Use CSS modules for component styling
```

</details>

<details>
<summary>Example: Documentation writing guidelines</summary>

You can create instructions files for different types of tasks, including non-development activities like writing documentation.

```markdown
---
applyTo: "docs/**/*.md"
---
# Project documentation writing guidelines

## General Guidelines
- Write clear and concise documentation.
- Use consistent terminology and style.
- Include code examples where applicable.

## Grammar
* Use present tense verbs (is, open) instead of past tense (was, opened).
* Write factual statements and direct commands. Avoid hypotheticals like "could" or "would".
* Use active voice where the subject performs the action.
* Write in second person (you) to speak directly to readers.

## Markdown Guidelines
- Use headings to organize content.
- Use bullet points for lists.
- Include links to related resources.
- Use code blocks for code snippets.
```

</details>

For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

## Use an `AGENTS.md` file

VS Code automatically detects an `AGENTS.md` Markdown file in the root of your workspace and applies the instructions in this file to all chat requests within this workspace. This is useful if you work with multiple AI agents in your workspace and want a single set of instructions recognized by all of them, or if you want subfolder-level instructions that apply to specific parts of a monorepo.

Use `AGENTS.md` when:

* You work with multiple AI coding agents and want a single set of instructions recognized by all of them
* You want subfolder-level instructions that apply to specific parts of a monorepo

To enable or disable support for `AGENTS.md` files, configure the `setting(chat.useAgentsMdFile)` setting.

### Use multiple `AGENTS.md` files (experimental)

Using multiple `AGENTS.md` files in subfolders is useful if you want to apply different instructions to different parts of your project. For example, you can have one `AGENTS.md` file for the frontend code and another for the backend code.

Use the experimental `setting(chat.useNestedAgentsMdFiles)` setting to enable or disable support for nested `AGENTS.md` files in your workspace.

When enabled, VS Code searches recursively in all subfolders of your workspace for `AGENTS.md` files and adds their relative path to the chat context. The agent can then decide which instructions to use based on the files being edited.

> [!TIP]
> For folder-specific instructions, you can also use multiple [`.instructions.md`](#use-instructionsmd-files) files with different `applyTo` patterns that match the folder structure.

## Use a `CLAUDE.md` file

VS Code automatically detects a `CLAUDE.md` file and applies it as always-on instructions, similar to `AGENTS.md`. This is useful if you use Claude Code or other Claude-based tools alongside VS Code and want a single set of instructions recognized by all of them.

VS Code searches for `CLAUDE.md` files in these locations:

| Location | Description |
|----------|-------------|
| Workspace root | `CLAUDE.md` in the root of your workspace |
| `.claude` folder | `.claude/CLAUDE.md` in your workspace |
| User home | `~/.claude/CLAUDE.md` for personal instructions across all projects |
| Local variant | `CLAUDE.local.md` for local-only instructions (not committed to version control) |

To enable or disable support for `CLAUDE.md` files, configure the `setting(chat.useClaudeMdFile)` setting.

> [!NOTE]
> For `.claude/rules` instructions files, VS Code uses a `paths` property instead of `applyTo` for glob patterns, following the [Claude Rules format](https://code.claude.com/docs/en/memory#basic-structure). The `paths` property accepts an array of glob patterns and defaults to `**` (all files) when omitted.

## Generate custom instructions for your workspace

VS Code can analyze your workspace and generate always-on custom instructions that match your coding practices and project structure. These instructions then apply automatically to all chat requests in the workspace.

When you generate instructions, VS Code performs the following steps:

1. It discovers existing AI conventions in your workspace, such as `copilot-instructions.md` or `AGENTS.md` files.
1. It analyzes your project structure and coding patterns.
1. It generates comprehensive workspace instructions tailored to your project.

### Use the `/init` slash command

The quickest way to prime your workspace with custom instructions is to type the `/init` slash command in the chat input box.

The `/init` command is implemented as a contributed [prompt file](/docs/copilot/customization/prompt-files.md), so you can customize its behavior by modifying the underlying prompt.

### Use a command to generate instructions

To generate custom instructions for your workspace with a command:

1. In the Chat view, select **Configure Chat** (gear icon) > **Generate Chat Instructions**.

1. Review the generated instructions file and make any necessary edits.

## Share custom instructions across teams

To share custom instructions across multiple workspaces and repositories within your GitHub organization, you can define them at the GitHub organization level.

VS Code automatically detects custom instructions defined at the organization level to which your account has access. These instructions are shown in the **Chat Instructions** menu alongside your personal and workspace instructions, and are automatically applied to all chat requests.

To enable discovery of organization-level custom instructions, set `setting(github.copilot.chat.organizationInstructions.enabled)` to `true`.

Learn how you can [add custom instructions for your organization](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-organization-instructions) in the GitHub documentation.

## Sync user instructions files across devices

VS Code can sync your user instructions files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user instructions files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Specify custom instructions in settings

> [!NOTE]
> Support for settings-based instructions might be removed in the future. We recommend using file-based instructions for instead.

For specialized scenarios like code review or commit message generation, you can use VS Code settings to define custom instructions. For general coding instructions, use [file-based instructions](#types-of-instruction-files) instead.

<details>
<summary>Settings reference</summary>

| Type of instruction | Setting name |
|---------------------|--------------|
| Code review | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Commit message generation | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Pull request title and description generation | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |
| Code generation (deprecated)* | `setting(github.copilot.chat.codeGeneration.instructions)` |
| Test generation (deprecated)* | `setting(github.copilot.chat.testGeneration.instructions)` |

_\* The `codeGeneration` and `testGeneration` settings are deprecated as of VS Code 1.102. Use instructions files instead (`.github/copilot-instructions.md` or `*.instructions.md`)._

You can define the custom instructions as text in the settings value (`text` property) or reference an external file (`file` property) in your workspace.

The following code snippet shows how to define a set of instructions in the `settings.json` file.

```json
{
    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
        { "text": "Always include a list of key changes." }
    ],
    "github.copilot.chat.reviewSelection.instructions": [
        { "file": "guidance/backend-review-guidelines.md" },
        { "file": "guidance/frontend-review-guidelines.md" }
    ]
}
```

</details>

## Instruction priority

When multiple types of custom instructions exist, they are all provided to the AI. Higher-priority instructions take precedence when conflicts occur:

1. Personal instructions (user-level, highest priority)
1. Repository instructions (`.github/copilot-instructions.md` or `AGENTS.md`)
1. Organization instructions (lowest priority)

## Tips for writing effective instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* Include the reasoning behind rules. When instructions explain _why_ a convention exists, the AI makes better decisions in edge cases. For example: "Use `date-fns` instead of `moment.js` — moment.js is deprecated and increases bundle size."

* Show preferred and avoided patterns with concrete code examples. The AI responds more effectively to examples than to abstract rules.

* Focus on non-obvious rules. Skip conventions that standard linters or formatters already enforce.

* For task or language-specific instructions, use multiple `*.instructions.md` files per topic and apply them selectively by using the `applyTo` property.

* Store project-specific instructions in your workspace to share them with other team members and include them in your version control.

* Reuse and reference instructions files in your [prompt files](/docs/copilot/customization/prompt-files.md) and [custom agents](/docs/copilot/customization/custom-agents.md) to keep them clean and focused, and to avoid duplicating instructions.

* Whitespace between instructions is ignored, so you can format instructions as a single paragraph, on separate lines, or separated by blank lines for legibility.

## Frequently asked questions

### Why is my instructions file not being applied?

> [!TIP]
> Use the chat customization diagnostics view to see all loaded instruction files and any errors. Right-click in the Chat view and select **Diagnostics**. Learn more about [troubleshooting AI in VS Code](/docs/copilot/troubleshooting.md).

If your instructions file is not being applied, check the following:

* Verify that your instructions file is in the correct location. A `.github/copilot-instructions.md` file must be in the `.github` folder at the root of your workspace. A `*.instructions.md` file must be in one of the folders specified in the `setting(chat.instructionsFilesLocations)` setting (default: `.github/instructions`) or in your user profile.

* For `*.instructions.md` files, check that the `applyTo` glob pattern matches the file you are working on. If no `applyTo` property is specified, the instructions file is not applied automatically. Verify the **References** section in the chat response to see which instructions files were used.

* Check that the relevant settings are enabled: `setting(chat.includeApplyingInstructions)` for pattern-based instructions, `setting(chat.includeReferencedInstructions)` for instructions referenced via Markdown links, `setting(chat.useAgentsMdFile)` for `AGENTS.md` files.

For advanced diagnostics, [check language model requests in the Chat Debug view](https://github.com/microsoft/vscode/wiki/Copilot-Issues#language-model-requests-and-responses) or [debug the `applyTo` matching logic](https://github.com/microsoft/vscode/wiki/Copilot-Issues#custom-instructions-logs).

### How do I know where a custom instruction file comes from?

Custom instruction files can come from different sources: built-in, user-defined in your profile, workspace-defined instructions in your current workspace, organization-level instructions, or extension-contributed instructions.

To identify the source of a custom instruction file:

1. Select **Chat: Configure Instructions** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Hover over the instruction file in the list. The source location is displayed in a tooltip.

Use the chat customization diagnostics view to see all loaded instruction files and any errors. Right-click in the Chat view and select **Diagnostics**. Learn more about [troubleshooting AI in VS Code](/docs/copilot/troubleshooting.md).

## Related resources

* [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
* [Community contributed instructions, prompts, and custom agents](https://github.com/github/awesome-copilot)
