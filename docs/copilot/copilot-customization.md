---
ContentId: 16c73175-a606-4aab-8ae5-a507fe8947eb
DateApproved: 06/12/2025
MetaDescription: Learn how to customize GitHub Copilot Chat with custom instructions and reusable prompt files to align AI responses with your coding practices and project requirements.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Customize AI responses in VS Code

Chat in Visual Studio Code can give you responses and generate code that matches your coding practices and project requirements, if you give it the right context. Instead of repeatedly adding this information in every chat prompt, you can store this context in files and automatically include it in every chat request. In this article, you learn how to use custom instructions and prompt files to customize AI responses in VS Code.

There are three main ways to customize AI responses in Visual Studio Code:

* **Custom instructions**: Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should perform operate (_how_ a task should be done). Learn how to [define custom instructions](#custom-instructions).

    <details>
    <summary>Example scenarios</summary>

    * Specify coding practices, preferred technologies, or project requirements, so generated code follows your standards.
    * Set rules for code reviews, such as checking for security vulnerabilities or performance issues.
    * Provide instructions for generating commit messages or pull request titles and descriptions.

    </details>

* **Prompt files**: Define reusable prompts for common tasks like generating code or performing a code review. Prompt files are standalone prompts that you can run directly in chat. They describe the task to be performed (_what_ should be done). Optionally, you can include tasks-specific guidelines about how the task should be performed, or you can reference custom instructions in the prompt file. Learn how to [create prompt files](#prompt-files-experimental).

    <details>
    <summary>Example scenarios</summary>

    * Create reusable prompts for common coding tasks, such as scaffolding a new component, API route, or generating tests.
    * Define prompts for performing code reviews, such as checking for code quality, security vulnerabilities, or performance issues.
    * Create step-by-step guides for complex processes or project-specific patterns.
    * Define prompts for generating implementation plans, architectural designs, or migration strategies.

    </details>

* **Custom chat modes**: Define how chat operates, which tools it can use, and how it interacts with the codebase. Each chat prompt is run within the boundaries of the chat mode, without having to configure tools and instructions for every request.

    <details>
    <summary>Example scenarios</summary>

    * Create a chat mode for planning, where the AI has read-only access to the codebase and can only generate implementation plans.
    * Define a research chat mode, where the AI can reach out to external resources to explore new technologies or gather information.
    * Create a front-end developer chat mode, where the AI can only generate and modify code related to front-end development.

    </details>

## Custom instructions

Custom instructions enable you to describe common guidelines or rules to get responses that match your specific coding practices and tech stack. Instead of manually including this context in every chat query, custom instructions automatically incorporate this information with every chat request.

> [!NOTE]
> Custom instructions are not taken into account for [code completions](/docs/copilot/ai-powered-suggestions.md).

### Types of custom instructions

VS Code supports multiple ways to define custom instructions:

| Custom instructions type | Description |
|--------------------------|-------------|
| `.github/copilot-instructions.md` file | <ul><li>Describe code-generation instructions in Markdown.</li><li>All instructions are combined in a single file, stored within the workspace.</li><li>Instructions are automatically included in every chat request.</li><li>Supported across all editors and IDEs that support Copilot.</li><li>Use this file to define general coding practices, preferred technologies, and project requirements that apply to all code-generation tasks.</li></ul> |
| `.instructions.md` files | <ul><li>Describe code-generation instructions in Markdown.</li><li>Create one or more instructions files, stored in the workspace or your user profile.</li><li>Use glob patterns to automatically include instructions for all requests or for specific files.</li><li>Supported in VS Code.</li><li>Use these files if you want to have task-specific code-generation instructions, and to have more control over when to include instructions with your chat prompt.</li></ul> |
| VS Code settings | <ul><li>Specify instructions in VS Code user or workspace settings.</li><li>Define instructions in settings values or in one or more files.</li><li>Supported in VS Code.</li><li>Supports instructions for code generation, test generation, commit messages, code review, and PR titles and descriptions.</li><li>Use this option to define instructions for tasks other than code-generation.</li></ul> |

You can use a combination of these approaches to define custom instructions and the instructions are all included in the chat request. No particular order or priority is applied to the instructions, so make sure to avoid conflicting instructions in the files.

### Custom instructions examples

The following examples demonstrates how to use custom instructions:

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

### Use a `.github/copilot-instructions.md` file

You can store custom instructions in your workspace or repository in a `.github/copilot-instructions.md` file and describe your coding practices, preferred technologies, and project requirements by using Markdown. These instructions only apply to the workspace where the file is located.

VS Code automatically includes the instructions from the `.github/copilot-instructions.md` file in every chat request and applies them for generating code.

To use a `.github/copilot-instructions.md` file:

1. Set the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting to `true` to instruct VS Code to use the custom instructions file.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions by using natural language and in Markdown format.

    Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

> [!NOTE]
> GitHub Copilot in Visual Studio and GitHub.com also detect the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

### Use `.instructions.md` files

You can also create one or more `.instructions.md` files to store custom instructions for specific tasks. For example, you can create instruction files for different programming languages, frameworks, or project types.

VS Code can automatically add instructions files to all chat requests, or you can specify for which files the instructions should be applied automatically. Alternatively, you can manually attach instructions files to a chat prompt.

VS Code supports two types of scopes for instruction files:

* **Workspace instructions files**: are only available within the workspace and are stored in the `.github/instructions` folder of the workspace.
* **User instruction files**: are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

#### Instructions file structure

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

#### Create an instructions file

To create an instructions file:

1. Run the **Chat: New Instructions File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the instruction file should be created.

    User instruction files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user instruction files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md). Make sure to configure the **Prompts and Instructions** setting in the **Settings Sync: Configure** command.

    By default, workspace instruction files are stored in the `.github/instructions` folder of your workspace. Add more instruction folders for your workspace with the `setting(chat.instructionsFilesLocations)` setting.

1. Enter a name for your instruction file.

1. Author the custom instructions by using Markdown formatting.

    Reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#index.ts` references within the instructions file.

Use the **Chat: Configure Instructions** command from the Command Palette to select and edit an existing instructions file. This command opens the instruction file in the editor, where you can edit the instructions and metadata.

#### Use an instructions file in chat

To manually attach an instructions file to a chat prompt:

* In the Chat view, select **Add Context** > **Instructions** and select the instruction file from the Quick Pick.

* Run the **Chat: Attach Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instruction file from the Quick Pick.

To automatically apply instructions files, specify the `applyTo` metadata property in the instructions file:

* `**`: Apply the instructions for all chat requests.
* `<glob pattern>`: Apply the instructions based on the types of files that are in the chat context.

### Specify custom instructions in settings

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
    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
        { "text": "Always include a list of key changes." },
    "github.copilot.chat.reviewSelection.instructions": [
        { "file": "guidance/backend-review-guidelines.md" },
        { "file": "guidance/frontend-review-guidelines.md" }
  ]
```


### Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* Don't refer to external resources in the instructions, such as specific coding standards.

* Split instructions into multiple files. This approach is useful for organizing instructions by topic or type of task.

* Make it easy to share custom instructions with your team or across projects by storing your instructions in instruction files. You can also version control the files to track changes over time.

* Use the `applyTo` property in the instruction file header to automatically apply the instructions to specific files or folders.

* Reference custom instructions in your prompt files to keep your prompts clean and focused, and to avoid duplicating instructions for different tasks.

## Prompt files (experimental)

Prompt files are reusable prompts for common tasks like generating code or performing a code review. You define the prompt content in a Markdown file. A prompt file is a standalone prompt that you can run directly in chat. Optionally, you can also include guidelines about how the task should be performed.

> [!TIP]
> Prompt files can take advantage of instruction files to reuse common guidelines and have task-specific instructions included in the prompt. For example, a security review prompt file can reference a custom instructions that describe general security practices, while also including specific instructions on how to report the findings of the review.

VS Code supports two types of scopes for prompt files:

* **Workspace prompt files**: Are only available within the workspace and are stored in the `.github/prompts` folder of the workspace.
* **User prompt files**: Are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

### Prompt file examples

The following examples demonstrate how to use prompt files:

<details>
<summary>Example: generate a React form component</summary>

```markdown
---
mode: 'agent'
model: GPT-4o
tools: ['githubRepo', 'codebase']
description: 'Generate a new React form component'
---
Your goal is to generate a new React form component based on the templates in #githubRepo contoso/react-templates.

Ask for the form name and fields if not provided.

Requirements for the form:
* Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
* Use `react-hook-form` for form state management:
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
* Create reusable validation schemas in separate files
* Use TypeScript types to ensure type safety
* Customize UX-friendly validation rules
```

</details>

<details>
<summary>Example: perform a security review of a REST API</summary>

```markdown
---
mode: 'ask'
model: Claude Sonnet 4
description: 'Perform a REST API security review'
---
Perform a REST API security review and provide a TODO list of security issues to address.

* Ensure all endpoints are protected by authentication and authorization
* Validate all user inputs and sanitize data
* Implement rate limiting and throttling
* Implement logging and monitoring for security events

Return the TODO list in a Markdown format, grouped by priority and issue type.
```

</details>

### Prompt file structure

A prompt file is a Markdown file with the `.prompt.md` file suffix. It has the following two main sections:

* (Optional) Header with metadata (Front Matter syntax)

    * `mode`: The chat mode to use when running the prompt: `ask`, `edit`, or `agent` (default).
    * `model`: The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used.
    * `tools`: Array of tool (set) names to indicate which tools (sets) can be used in agent mode. Select **Configure Tools** to select the tools from the list of available tools in your workspace. If a given tool (set) is not available when running the prompt, it is ignored.
    * `description`: A short description of the prompt.

* Body with the prompt content

    Prompt files mimic the format of writing prompts in chat. This allows blending natural language instructions, additional context, and even linking to other prompt files as dependencies. You can use Markdown formatting to structure the prompt content, including headings, lists, and code blocks.

You can reference other workspace files, prompt files, or instructions files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

Within a prompt file, you can reference variables by using the `${variableName}` syntax. You can reference the following variables:

* Workspace variables - `${workspaceFolder}`, `${workspaceFolderBasename}`
* Selection variables - `${selection}`, `${selectedText}`
* File context variables - `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
* Input variables - `${input:variableName}`, `${input:variableName:placeholder}` (pass values to the prompt from the chat input field)

### Create a workspace prompt file

Workspace prompt files are stored in your workspace and are only available in that workspace.

By default, prompt files are located in the `.github/prompts` directory of your workspace. You can specify additional prompt file locations with the `setting(chat.promptFilesLocations)` setting.

To create a workspace prompt file:

1. Run the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the prompt file should be created.

    By default, only the `.github/prompts` folder is available. Add more prompt folders for your workspace with the `setting(chat.promptFilesLocations)` setting.

1. Enter a name for your prompt file.

    Alternatively, you can directly create a `.prompt.md` file in the prompts folder of your workspace.

1. Author the chat prompt by using Markdown formatting.

    Within a prompt file, reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#index.ts` references within the prompt file.

    You can also reference other `.prompt.md` files to create a hierarchy of prompts. You can also reference [instructions files](#custom-instructions) in the same way.

### Create a user prompt file

User prompt files are stored in your [user profile](/docs/configure/profiles.md). With user prompt files, you can share reusable prompts across multiple workspaces.

To create a user prompt file:

1. Select the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **User Data Folder** as the location for the prompt file.

    If you use multiple [VS Code profiles](/docs/configure/profiles.md), the prompt file is created in the current profile's user data folder.

1. Enter a name for your prompt file.

1. Author the chat prompt by using Markdown formatting.

    You can also reference other user prompt files or user instruction files.

### Use a prompt file in chat

You have multiple options to run a prompt file:

* Run the **Chat: Run Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) and select a prompt file from the Quick Pick.

* In the Chat view, type `/` followed by the prompt file name in the chat input field.

    This option enables you to pass additional information in the chat input field. For example, `/create-react-form` or `/create-react-form: formName=MyForm`.

* Open the prompt file in the editor, and press the play button in the editor title area. You can choose to run the prompt in the current chat session or open a new chat session.

    This option is useful for quickly testing and iterating on your prompt files.

### Sync user prompt files across devices

VS Code can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user prompt files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Centrally manage instructions and prompt files in VS Code

Enable or disable instructions and prompt files in VS Code with the `setting(chat.promptFiles)` setting.

To centrally enable or disable this setting within your organization, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Settings

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

<details>
<summary>Prompt files settings</summary>

* `setting(chat.promptFiles)` _(Experimental)_: Enable support for reusable prompt files and instruction files.

* `setting(chat.promptFilesLocations)` _(Experimental)_: A dictionary of folders where prompt files are located and a boolean indicating whether they are enabled. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths. By default, prompt files are located in the `.github/prompts` folder of your workspace.

    ```json
    "chat.promptFilesLocations": {
        ".github/prompts": false,
        "setup/**/prompts": true
    }
    ```

</details>

## Related content

* [Create custom chat modes](/docs/copilot/chat/chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
