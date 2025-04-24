---
ContentId: 16c73175-a606-4aab-8ae5-a507fe8947eb
DateApproved: 04/03/2025
MetaDescription: Learn how to customize GitHub Copilot Chat with custom instructions and reusable prompt files to align AI responses with your coding practices and project requirements.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Customize chat responses in VS Code

Copilot can provide you with responses that match your coding practices and project requirements if you give it the right context. Custom instructions enable you to define and automatically apply the guidelines and rules for tasks like generating code, or performing code reviews. Prompt files let you craft complete chat prompts in Markdown files, which you can then reference in chat or share with others. In this article, you will learn how to use custom instructions and prompt files to customize your chat responses in Visual Studio Code.

## Custom instructions

Custom instructions enable you to describe common guidelines or rules to get responses that match your specific coding practices and tech stack. Instead of manually including this context in every chat query, custom instructions automatically incorporate this information with every chat request.

VS Code supports several types of custom instructions, targeted at different scenarios: code generation, test generation, code review, commit message generation, and pull request title and description generation instructions.

You can define custom instructions in two ways:

1. Using a `.github/copilot-instructions.md` file in your workspace
2. Directly in your VS Code settings through `settings.json`

If you define custom instructions in both the `.github/copilot-instructions.md` file and in settings, Copilot tries to combine instructions from both sources.

> [!NOTE]
> Custom instructions for code generation are not used for [code completions](/docs/copilot/ai-powered-suggestions.md) and are only used in [chat](/docs/copilot/chat/copilot-chat.md).

### Custom instructions example

The following example demonstrates custom instructions for code generation:

```markdown
# Project coding standards

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

### Use a `.github/copilot-instructions.md` file

You can store custom instructions in your workspace or repository in a `.github/copilot-instructions.md` file and describe your coding practices, preferred technologies, and project requirements by using Markdown.

VS Code automatically includes the instructions from the `.github/copilot-instructions.md` file to every chat request and applies them for generating code.

To use a `.github/copilot-instructions.md` file:

1. Set the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting to `true` to instruct Copilot in VS Code to use the custom instructions file.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Add natural language instructions to the file. You can use the Markdown format.

    Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

> [!NOTE]
> GitHub Copilot in Visual Studio also detects the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

### Use settings

You can also configure custom code-generation instructions in your user or workspace settings. The following table lists the settings for each type of custom instruction.

| Type of instruction | Setting name |
|----------------------|--------------|
| Code generation | `setting(github.copilot.chat.codeGeneration.instructions)` |
| Test generation | `setting(github.copilot.chat.testGeneration.instructions)` |
| Code review | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Commit message generation | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Pull request title and description generation | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |

You can define the custom instructions as text in the settings value or reference an external file in your workspace.

The following code snippet shows how to define a set of instructions in the `settings.json` file. To define instruction directly in settings, configure the `text` property. To reference an external file, configure the `file` property.

```json
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "text": "Always add a comment: 'Generated by Copilot'."
    },
    {
      "text": "In TypeScript always use underscore for private field names."
    },
    {
      "file": "general.instructions.md" // import instructions from file `general.instructions.md`
    },
    {
      "file": "db.instructions.md" // import instructions from file `db.instructions.md`
    }
  ],
```

### Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* Don't refer to external resources in the instructions, such as specific coding standards.

* Make it easy to share custom instructions with your team or across projects by storing your instructions in an external file. You can also version control the file to track changes over time.

* Split instructions into multiple files and add multiple file references to your settings. This approach is useful for organizing instructions by topic or type of task.

## Reusable prompt files (experimental)

Prompt files allow you to craft complete prompts in Markdown files, which you can then reference in chat. Unlike custom instructions that supplement your existing prompts, prompt files are standalone prompts that you can store within your workspace and share with others. With prompt files, you can create reusable templates for common tasks, store domain expertise in your codebase, and standardize AI interactions across your team.

A prompt file is a Markdown file that mimics the existing format of writing prompts in chat (for example, `Rewrite #file:x.ts`). This allows blending natural language instructions, additional context, and even linking to other prompt files as dependencies.

> [!TIP]
> Reference additional context files like API specs or documentation by using Markdown links to provide Copilot with more complete information.

VS Code supports two types of prompts:

* **Workspace prompt files**: stored in a Markdown file within your workspace and only available in that workspace.
* **User prompt files**: stored in a Markdown file in your profile folder and available for use across multiple workspaces.

Common use cases include:

* **Code generation**: create reusable prompts for components, tests, or migrations (for example, React forms, or API mocks).
* **Domain expertise**: share specialized knowledge through prompts, such as security practices, or compliance checks.
* **Team collaboration**: document patterns and guidelines with references to specs and documentation.
* **Onboarding**: create step-by-step guides for complex processes or project-specific patterns.

### Prompt file examples

* Document a reusable task for generating a form:

    ```markdown
    Your goal is to generate a new React form component.

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

* Document reusable security practices for REST APIs, which can be used to do security reviews of REST APIs:

    ```markdown
    Secure REST API review:
    * Ensure all endpoints are protected by authentication and authorization
    * Validate all user inputs and sanitize data
    * Implement rate limiting and throttling
    * Implement logging and monitoring for security events
    …
    ```

### Create a workspace prompt file

Workspace prompt files are stored in your workspace and are only available in that workspace. Workspace prompt files are stored in the `.github/prompts` directory of your workspace.

To create a workspace prompt file:

1. Set the `setting(chat.promptFiles)` setting to `true` for the `.github/prompts` directory.

1. Create a `.prompt.md` file in the `.github/prompts` directory of your workspace.

    By default, prompt files are located in the `.github/prompts` directory of your workspace. You can specify additional prompt file locations with the `setting(chat.promptFilesLocations)` setting.

    Alternatively, use the **Chat: Create Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) to create a prompt.

1. Author the chat prompt by using Markdown formatting.

    Within a prompt file, reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#file:../index.ts` references within the prompt file.

    You can also reference other `.prompt.md` files to create a hierarchy of prompts, with reusable prompts that can be shared across multiple prompt files.

### Create a user prompt file

User prompt files are stored in your [user profile](/docs/configure/profiles.md). With user prompt files, you can share reusable prompts across multiple workspaces.

To create a user prompt file:

1. Select the **Chat: Create User Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Enter a name for your prompt file.

1. Author the chat prompt by using Markdown formatting.

    You can also reference other `.prompt.md` user prompt files to create a hierarchy of prompts, with reusable prompts that can be shared across multiple prompt files.

> [!TIP]
> User prompt files can be synced across multiple devices with [Settings Sync](/docs/configure/settings-sync.md). Make sure to enable support for prompt files in your Settings Sync configuration. Select **Settings Sync: Configure** from the Command Palette, and make sure **Prompts** is selected.

### Use a prompt file in chat

To use a prompt file as a chat prompt, attach it to your chat request as context:

1. Open the Chat view in VS Code (`kb(workbench.action.chat.open)`).

1. Select **Attach Context** in the chat input field, and then select **Prompt...**.

    Alternatively, use the **Chat: Use Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a prompt file from the Quick Pick to attach it to your chat request.

    You can use prompt files in any of the chat modes (ask, edit, or agent mode).

1. Optionally, attach additional context files required for the task or include more instructions in the chat prompt.

    To use the prompt file as-is, send the chat prompt without any additional instructions.

## Settings

### Custom instructions settings

* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`: controls whether code instructions from `.github/copilot-instructions.md` are added to Copilot requests.
* `setting(github.copilot.chat.codeGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate code.
* `setting(github.copilot.chat.testGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate tests.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: set of instructions that will be added to Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate commit messages.
* `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate pull request titles and descriptions.

### Prompt files (experimental) settings

* `setting(chat.promptFiles)` _(Experimental)_: enable reusable prompt files.

* `setting(chat.promptFilesLocations)` _(Experimental)_: a list of folders where prompt files are located. You can specify one or more folders where prompt files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

    | Setting value | Description |
    |---------------|-------------|
    | `["/path/to/folder"]` | Enable prompt files for a specific path. Specify one or more folders where prompt files are located. Relative paths are resolved from the root folder(s) of your workspace.<br/>By default, `.github/prompts` is added but disabled. |

## Related content

* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
