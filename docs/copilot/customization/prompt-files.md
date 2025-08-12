---
ContentId: 5c8e7d42-9b1a-4f85-a3e2-6d5b8a9c1e43
DateApproved: 08/07/2025
MetaDescription: Learn how to create reusable prompt files for GitHub Copilot Chat in VS Code to standardize common development tasks and improve your coding workflow efficiency.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Prompt files for Copilot Chat

Prompt files are reusable prompts for common development tasks like generating code, performing code reviews, or scaffolding project components. Define your prompt content in Markdown files that you can run directly in chat, creating a library of standardized development workflows.

> [!NOTE]
> Prompt files are currently experimental and may change in future releases.

## What are prompt files?

Prompt files are standalone prompts that describe specific tasks to be performed (_what_ should be done). They can include task-specific guidelines or reference custom instructions to ensure consistent execution. Unlike custom instructions that apply to all requests, prompt files are triggered on-demand for specific tasks.

> [!TIP]
> Prompt files can take advantage of instruction files to reuse common guidelines and have task-specific instructions included in the prompt. For example, a security review prompt file can reference a custom instructions that describe general security practices, while also including specific instructions on how to report the findings of the review.

VS Code supports two types of scopes for prompt files:

* **Workspace prompt files**: Are only available within the workspace and are stored in the `.github/prompts` folder of the workspace.
* **User prompt files**: Are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

## Prompt file examples

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

## Prompt file structure

A prompt file is a Markdown file with the `.prompt.md` file suffix. It has the following two main sections:

### Header with metadata (Front Matter syntax)

* `mode`: The chat mode to use when running the prompt: `ask`, `edit`, or `agent` (default).
* `model`: The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used.
* `tools`: Array of tool (set) names to indicate which tools (sets) can be used in agent mode. Select **Configure Tools** to select the tools from the list of available tools in your workspace. If a given tool (set) is not available when running the prompt, it is ignored.
* `description`: A short description of the prompt.

### Body with the prompt content

Prompt files mimic the format of writing prompts in chat. This allows blending natural language instructions, additional context, and even linking to other prompt files as dependencies. You can use Markdown formatting to structure the prompt content, including headings, lists, and code blocks.

You can reference other workspace files, prompt files, or instruction files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

Within a prompt file, you can reference variables by using the `${variableName}` syntax. You can reference the following variables:

* Workspace variables - `${workspaceFolder}`, `${workspaceFolderBasename}`
* Selection variables - `${selection}`, `${selectedText}`
* File context variables - `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
* Input variables - `${input:variableName}`, `${input:variableName:placeholder}` (pass values to the prompt from the chat input field)

## Create a prompt file

You can create prompt files in your workspace or user profile. Workspace prompt files are only available within the workspace, while user prompt files are available across multiple workspaces.

To create a prompt file:

1. Select the **Configure Chat** button in the Chat view, select **Prompt Files**, and then select **New prompt file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the prompt file should be created.

    * **Workspace**: By default, workspace prompt files are stored in the `.github/prompts` folder of your workspace. Add more prompt folders for your workspace with the `setting(chat.promptFilesLocations)` setting.

    * **User profile**: User prompt files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for your prompt file.

    Alternatively, you can directly create a `.prompt.md` file in the prompts folder of your workspace.

1. Author the chat prompt by using Markdown formatting.

    Within a prompt file, reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#index.ts` references within the prompt file.

    You can also reference other `.prompt.md` files to create a hierarchy of prompts. You can also reference [instructions files](/docs/copilot/customization/custom-instructions.md) in the same way.

To modify an existing prompt file, select the **Configure Chat** button in the Chat view, select **Prompt Files**, and then select a prompt file from the list. Alternatively, use the **Chat: Configure Prompt Files** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the prompt file from the Quick Pick.

## Use a prompt file in chat

You have multiple options to run a prompt file:

* Run the **Chat: Run Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) and select a prompt file from the Quick Pick.

* In the Chat view, type `/` followed by the prompt file name in the chat input field.

    This option enables you to pass additional information in the chat input field. For example, `/create-react-form` or `/create-react-form: formName=MyForm`.

* Open the prompt file in the editor, and press the play button in the editor title area. You can choose to run the prompt in the current chat session or open a new chat session.

    This option is useful for quickly testing and iterating on your prompt files.

## Sync user prompt files across devices

VS Code can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user prompt files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Best practices for prompt files

* **Be specific about the task**: Clearly describe what the prompt should accomplish and what output format is expected.

* **Include examples**: Provide examples of the expected input and output to guide the AI's responses.

* **Reference instructions files**: Use Markdown links to reference custom instructions rather than duplicating guidelines in each prompt.

* **Use variables**: Take advantage of built-in variables like `${selection}` and input variables to make prompts more flexible.

* **Test and iterate**: Use the editor play button to test your prompts and refine them based on the results.

* **Organize by purpose**: Group related prompts in folders and use descriptive names that make their purpose clear.

## Settings reference

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

* [Customize AI responses overview](/docs/copilot/customization/overview.md)
* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
