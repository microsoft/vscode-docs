---
ContentId: 8b4f3c21-4e02-4a89-9f15-7a8d6b5c2e91
DateApproved: 10/09/2025
MetaDescription: Learn how to create custom instructions for GitHub Copilot Chat in VS Code to ensure AI responses match your coding practices, project requirements, and development standards.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use custom instructions in VS Code

Custom instructions enable you to define common guidelines and rules that automatically influence how AI generates code and handles other development tasks. Instead of manually including context in every chat prompt, specify custom instructions in a Markdown file to ensure consistent AI responses that align with your coding practices and project requirements.

You can configure custom instructions to apply automatically to all chat requests or to specific files only. Alternatively, you can manually attach custom instructions to a specific chat prompt.

> [!NOTE]
> Custom instructions are not taken into account for [code completions](/docs/copilot/ai-powered-suggestions.md) as you type in the editor.

## Type of instructions files

VS Code supports multiple types of Markdown-based instructions files. If you have multiple types of instructions files in your project, VS Code combines and adds them to the chat context, no specific order is guaranteed.

* A single [`.github/copilot-instructions.md`](#use-a-githubcopilotinstructionsmd-file) file
    * Automatically applies to all chat requests in the workspace
    * Stored within the workspace

* One or more [`.instructions.md`](#use-instructionsmd-files) files
    * Created for specific tasks or files
    * Use `applyTo` frontmatter to define what files the instructions should be applied to
    * Stored in the workspace or user profile

* A single [`AGENTS.md`](#use-an-agentsmd-file-experimental) file (experimental)
    * Useful if you work with multiple AI agents in your workspace
    * Automatically applies to all chat requests in the workspace
    * Stored in the root of the workspace

Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

To reference specific context in your instructions, such as files or URLs, you can use Markdown links.

## Custom instructions examples

The following examples demonstrate how to use custom instructions. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

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

## Use a `.github/copilot-instructions.md` file

Define your custom instructions in a single `.github/copilot-instructions.md` Markdown file in the root of your workspace. VS Code applies the instructions in this file automatically to all chat requests within this workspace.

To use a `.github/copilot-instructions.md` file:

1. Enable the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions by using natural language and in Markdown format.

> [!NOTE]
> GitHub Copilot in Visual Studio and GitHub.com also detect the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

## Use `.instructions.md` files

Instead of using a single instructions file that applies to all chat requests, you can create multiple `.instructions.md` files that apply to specific file types or tasks. For example, you can create instructions files for different programming languages, frameworks, or project types.

By using the `applyTo` frontmatter property in the instructions file header, you can specify a glob pattern to define which files the instructions should be applied to automatically. Instructions files are used when creating or modifying files and are typically not applied for read operations.

Alternatively, you can manually attach an instructions file to a specific chat prompt by using the **Add Context** > **Instructions** option in the Chat view.

* **Workspace instructions files**: are only available within the workspace and are stored in the `.github/instructions` folder of the workspace.
* **User instructions files**: are available across multiple workspaces and are stored in the `prompts` directory within the current [VS Code profile](/docs/configure/profiles.md#where-are-profiles-kept).

### Instructions file format

Instructions files use the `.instructions.md` extension and have this structure:

* **Header** (optional): YAML frontmatter
    * `description`: Description shown on hover in Chat view
    * `applyTo`: Glob pattern for automatic application (use `**` for all files)

* **Body**: Instructions in Markdown format

Example:

```markdown
---
applyTo: "**/*.py"
---
# Project coding standards for Python
- Follow the PEP 8 style guide for Python.
- Always prioritize readability and clarity.
- Write clear and concise comments for each function.
- Ensure functions have descriptive names and include type hints.
- Maintain proper indentation (use 4 spaces for each level of indentation).
```

### Create an instructions file

When you create an instructions file, choose whether to store it in your workspace or user profile. Workspace instructions files apply only to that workspace, while user instructions files are available across multiple workspaces.

To create an instructions file:

1. In the Chat view, select **Configure Chat** > **Instructions**, and then select **New instruction file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Instructions File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where to create the instructions file.

    * **Workspace**: By default, workspace instructions files are stored in the `.github/instructions` folder of your workspace. Add more instruction folders for your workspace with the `setting(chat.instructionsFilesLocations)` setting.

    * **User profile**: User instructions files are stored in the `prompts` directory within the [current profile folder](/docs/configure/profiles.md#where-are-profiles-kept). You can sync your user instructions files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for your instructions file.

1. Author the custom instructions by using Markdown formatting.

    Specify the `applyTo` metadata property in the header to configure when the instructions should be applied automatically. For example, you can specify `applyTo: "**/*.ts,**/*.tsx"` to apply the instructions only to TypeScript files.

    To reference additional workspace files, use Markdown links (`[index](../index.ts)`).

To modify an existing instructions file, in the Chat view, select **Configure Chat** > **Instructions**, and then select an instructions file from the list. Alternatively, use the **Chat: Configure Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instructions file from the Quick Pick.

## Use an `AGENTS.md` file

If you work with multiple AI agents in your workspace, you can define custom instructions for all agents in an `AGENTS.md` Markdown file at the root(s) of the workspace. VS Code applies the instructions in this file automatically to all chat requests within this workspace.

To enable or disable support for `AGENTS.md` files, configure the `setting(chat.useAgentsMdFile)` setting.

### Use multiple `AGENTS.md` files (experimental)

Using multiple `AGENTS.md` files in subfolders is useful if you want to apply different instructions to different parts of your project. For example, you can have one `AGENTS.md` file for the frontend code and another for the backend code.

Use the experimental `setting(chat.useNestedAgentsMdFiles)` setting to enable or disable support for nested `AGENTS.md` files in your workspace.

When enabled, VS Code searches recursively in all subfolders of your workspace for `AGENTS.md` files and adds their relative path to the chat context. The agent can then decide which instructions to use based on the files being edited.

> [!TIP]
> For folder-specific instructions, you can also use multiple [`.instructions.md`](#use-instructionsmd-files) files with different `applyTo` patterns that match the folder structure.

## Specify custom instructions in settings

You can configure custom instructions for specialized scenarios by using VS Code user or workspace settings.

| Type of instruction | Setting name |
|---------------------|--------------|
| Code review | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Commit message generation | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Pull request title and description generation | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |
| Code generation (deprecated)* | `setting(github.copilot.chat.codeGeneration.instructions)` |
| Test generation (deprecated)* | `setting(github.copilot.chat.testGeneration.instructions)` |

_\* The `codeGeneration` and `testGeneration` settings are deprecated as of VS Code 1.102. We recommend that you use instructions files instead (`.github/copilot-instructions.md` or `*.instructions.md`)._

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

## Generate an instructions file for your workspace

VS Code can analyze your workspace and generate a matching `.github/copilot-instructions.md` file with custom instructions that match your coding practices and project structure.

To generate an instructions file for your workspace:

1. In the Chat view, select **Configure Chat** > **Generate Instructions**.

1. Review the generated instructions file and make any necessary edits.

## Sync user instructions files across devices

VS Code can sync your user instructions files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user instructions files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* For task or language-specific instructions, use multiple `*.instructions.md` files per topic and apply them selectively by using the `applyTo` property.

* Store project-specific instructions in your workspace to share them with other team members and include them in your version control.

* Reuse and reference instructions files in your [prompt files](/docs/copilot/customization/prompt-files.md) and [chat modes](/docs/copilot/customization/custom-chat-modes.md) to keep them clean and focused, and to avoid duplicating instructions.

## Related resources

* [Customize AI responses overview](/docs/copilot/customization/overview.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
* [Community contributed instructions, prompts, and chat modes](https://github.com/github/awesome-copilot)
