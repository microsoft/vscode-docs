---
ContentId: 8b4f3c21-4e02-4a89-9f15-7a8d6b5c2e91
DateApproved: 08/07/2025
MetaDescription: Learn how to create custom instructions for GitHub Copilot Chat in VS Code to ensure AI responses match your coding practices, project requirements, and development standards.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Custom instructions for Copilot Chat

Custom instructions enable you to define common guidelines and rules that automatically influence how Copilot generates code, performs code reviews, and handles other development tasks. Instead of manually including context in every chat prompt, custom instructions ensure consistent AI responses that align with your coding practices and project requirements.

## What are custom instructions?

Custom instructions describe the conditions and standards that AI should follow when generating responses (_how_ a task should be done). They automatically apply to every chat request, ensuring consistency across your development workflow.

> [!NOTE]
> Custom instructions are not taken into account for [code completions](/docs/copilot/ai-powered-suggestions.md).

## Types of custom instructions

VS Code supports multiple ways to define custom instructions:

| Custom instructions type | Description |
|--------------------------|-------------|
| `.github/copilot-instructions.md` file | <ul><li>Describe code-generation instructions in Markdown.</li><li>All instructions are combined in a single file, stored within the workspace.</li><li>Instructions are automatically included in every chat request.</li><li>Supported across all editors and IDEs that support Copilot.</li><li>Use this file to define general coding practices, preferred technologies, and project requirements that apply to all code-generation tasks.</li></ul> |
| `.instructions.md` files | <ul><li>Describe code-generation instructions in Markdown.</li><li>Create one or more instructions files, stored in the workspace or your user profile.</li><li>Use glob patterns to automatically include instructions for all requests or for specific files.</li><li>Supported in VS Code.</li><li>Use these files if you want to have task-specific code-generation instructions, and to have more control over when to include instructions with your chat prompt.</li></ul> |
| VS Code settings | <ul><li>Specify instructions in VS Code user or workspace settings.</li><li>Define instructions in settings values or in one or more files.</li><li>Supported in VS Code.</li><li>Supports instructions for code generation, test generation, commit messages, code review, and PR titles and descriptions.</li><li>Use this option to define instructions for tasks other than code-generation.</li></ul> |

You can use a combination of these approaches to define custom instructions and the instructions are all included in the chat request. No particular order or priority is applied to the instructions, so make sure to avoid conflicting instructions in the files.

## Custom instructions examples

The following examples demonstrate how to use custom instructions:

<details>
<summary>Example: general coding guidelines</summary>

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
<summary>Example: TypeScript and React coding guidelines</summary>

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

## Use a `.github/copilot-instructions.md` file

You can store custom instructions in your workspace or repository in a `.github/copilot-instructions.md` file and describe your coding practices, preferred technologies, and project requirements by using Markdown. These instructions only apply to the workspace where the file is located.

VS Code automatically includes the instructions from the `.github/copilot-instructions.md` file in every chat request and applies them for generating code.

To use a `.github/copilot-instructions.md` file:

1. Set the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting to `true` to instruct VS Code to automatically use the `copilot-instructions.md` file for every chat request.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions by using natural language and in Markdown format.

    Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

> [!NOTE]
> GitHub Copilot in Visual Studio and GitHub.com also detect the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

## Use `.instructions.md` files

You can also create one or more `.instructions.md` files to store custom instructions for specific tasks. For example, you can create instruction files for different programming languages, frameworks, or project types.

VS Code can automatically add instructions files to all chat requests, or you can specify for which files the instructions should be applied automatically. Alternatively, you can manually attach instructions files to a chat prompt.

VS Code supports two types of scopes for instruction files:

* **Workspace instructions files**: are only available within the workspace and are stored in the `.github/instructions` folder of the workspace.
* **User instruction files**: are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

### Instructions file structure

An instructions file is a Markdown file with the `.instructions.md` file suffix. The instructions file consists of two sections:

* (Optional) Header with metadata (Front Matter syntax)

    * `description`: A brief description of the instructions file. This description is displayed when you hover the instructions file in the Chat view.
    * `applyTo`: Specify a glob pattern for files to which the instructions are automatically applied. To always include the custom instructions, use the `**` pattern.

        For example, the following instructions file is always applied:

        ```markdown
        ---
        applyTo: "**"
        ---
        Add a comment at the end of the file: 'Contains AI-generated edits.'
        ```

* Body with the instruction content

    Specify the custom instructions in natural language by using Markdown formatting. You can use headings, lists, and code blocks to structure the instructions.

    You can reference other instruction files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the instruction file.

### Create an instructions file

You can create instructions files in your workspace or user profile. Workspace instructions files are only available within the workspace, while user instructions files are available across multiple workspaces.

To create an instructions file:

1. Select the **Configure Chat** button in the Chat view, select **Instructions**, and then select **New instruction file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Instructions File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the instruction file should be created.

    * **Workspace**: By default, workspace instruction files are stored in the `.github/instructions` folder of your workspace. Add more instruction folders for your workspace with the `setting(chat.instructionsFilesLocations)` setting.

    * **User profile**: User instruction files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user instruction files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for your instruction file.

1. Author the custom instructions by using Markdown formatting.

    Specify the `applyTo` metadata property in the header to configure when the instructions should be applied automatically. For example, you can specify `applyTo: "**/*.ts,**/*.tsx"` to apply the instructions only to TypeScript files.

    To reference additional workspace files, use Markdown links (`[index](../index.ts)`) or #-reference them (`#index.ts`) within the instructions file.

To modify an existing instructions file, select the **Configure Chat** button in the Chat view, select **Instructions**, and then select an instructions file from the list. Alternatively, use the **Chat: Configure Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instructions file from the Quick Pick.

### Use an instructions file in chat

If you specified the `applyTo` metadata property in the instructions file, VS Code automatically applies the instructions to all files that match the glob pattern.

To manually attach an instructions file to a chat prompt:

* In the Chat view, select **Add Context** > **Instructions** and select the instruction file from the Quick Pick.

* Run the **Chat: Attach Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instruction file from the Quick Pick.

## Specify custom instructions in settings

You can configure custom instructions for specialized scenarios in your user or workspace settings.

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

VS Code can analyze your workspace and generate a matching `.github/copilot-instructions.md` file with custom instructions that match your coding practices and project requirements.

To generate an instructions file for your workspace:

1. Select the **Configure Chat** button in the Chat view and select **Instructions**.

1. Select **Generate instructions** from the Quick Pick.

1. Review the generated instructions file and make any necessary edits.

## Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* Don't refer to external resources in the instructions, such as specific coding standards.

* Split instructions into multiple files. This approach is useful for organizing instructions by topic or type of task.

* Make it easy to share custom instructions with your team or across projects by storing your instructions in instruction files. You can also version control the files to track changes over time.

* Use the `applyTo` property in the instruction file header to automatically apply the instructions to specific files or folders.

* Reference custom instructions in your prompt files to keep your prompts clean and focused, and to avoid duplicating instructions for different tasks.

## Settings reference

<details>
<summary>Custom instructions settings</summary>

* `setting(chat.promptFiles)` _(Experimental)_: Enable reusable prompt and instructions files.

* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`: Controls whether code instructions from `.github/copilot-instructions.md` are added to Copilot requests.

* `setting(chat.instructionsFilesLocations)` _(Experimental)_: A dictionary of folders where instructions files are located and a boolean indicating whether they are enabled. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. By default, instructions files are located in the `.github/instructions` folder of your workspace.

    ```json
    "chat.instructionsFilesLocations": {
        "src/frontend/instructions": true,
        "src/backend/instructions": false
    }
    ```

* `setting(github.copilot.chat.codeGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate code.
* `setting(github.copilot.chat.testGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate tests.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: set of instructions that will be added to Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate commit messages.
* `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate pull request titles and descriptions.

</details>

## Related content

* [Customize AI responses overview](/docs/copilot/customization/overview.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
