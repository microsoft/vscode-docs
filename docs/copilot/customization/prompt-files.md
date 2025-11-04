---
ContentId: 5c8e7d42-9b1a-4f85-a3e2-6d5b8a9c1e43
DateApproved: 10/09/2025
MetaDescription: Learn how to create reusable prompt files for GitHub Copilot Chat in VS Code to standardize common development tasks and improve your coding workflow efficiency.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use prompt files in VS Code

Prompt files are Markdown files that define reusable prompts for common development tasks like generating code, performing code reviews, or scaffolding project components. They are standalone prompts that you can run directly in chat, enabling the creation of a library of standardized development workflows.

They can include task-specific guidelines or reference custom instructions to ensure consistent execution. Unlike custom instructions that apply to all requests, prompt files are triggered on-demand for specific tasks.

> [!NOTE]
> Prompt files are currently experimental and may change in future releases.

VS Code supports two types of scopes for prompt files:

* **Workspace prompt files**: Are only available within the workspace and are stored in the `.github/prompts` folder of the workspace.
* **User prompt files**: Are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

## Prompt file examples

The following examples demonstrate how to use prompt files. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

<details>
<summary>Example: generate a React form component</summary>

```markdown
---
agent: 'agent'
model: GPT-4o
tools: ['githubRepo', 'search/codebase']
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
agent: 'ask'
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

## Prompt file format

Prompt files are Markdown files and use the `.prompt.md` extension and have this structure:

* **Header** (optional): YAML frontmatter
    * `description`: Short description of the prompt
    * `agent`: Agent used for running the prompt: `ask`, `edit`, `agent` (default), or the name of a [custom agent](/docs/copilot/customization/custom-agents.md)
    * `model`: Language model used when running the prompt. If not specified, the currently selected model in model picker is used.
    * `tools`: Array of tool (set) names that can be used. Select **Configure Tools** to select the tools from the list of available tools in your workspace. If a given tool (set) is not available when running the prompt, it is ignored.

* **Body**: Prompt instructions in Markdown format

    Reference other workspace files, prompt files, or instruction files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

    Within a prompt file, you can reference variables by using the `${variableName}` syntax. You can reference the following variables:

    * Workspace variables - `${workspaceFolder}`, `${workspaceFolderBasename}`
    * Selection variables - `${selection}`, `${selectedText}`
    * File context variables - `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
    * Input variables - `${input:variableName}`, `${input:variableName:placeholder}` (pass values to the prompt from the chat input field)

### Tool list priority

You can specify the list of available tools for both a custom agent and prompt file by using the `tools` metadata field. Prompt files can also reference a custom agent by using the `agent` metadata field.

The list available tools in chat is determined by the following priority order:

1. Tools specified in the prompt file (if any)
2. Tools from the referenced custom agent in the prompt file (if any)
3. Default tools for the selected agent (if any)

## Create a prompt file

When you create a prompt file, choose whether to store it in your workspace or user profile. Workspace prompt files apply only to that workspace, while user prompt files are available across multiple workspaces.

To create a prompt file:

1. Enable the `setting(chat.promptFiles)` setting.

1. In the Chat view, select **Configure Chat** > **Prompt Files**, and then select **New prompt file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the prompt file should be created.

    * **Workspace**: By default, workspace prompt files are stored in the `.github/prompts` folder of your workspace. Add more prompt folders for your workspace with the `setting(chat.promptFilesLocations)` setting.

    * **User profile**: User prompt files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for your prompt file.

1. Author the chat prompt by using Markdown formatting.

    Within a prompt file, reference additional workspace files as Markdown links (`[index](../index.ts)`).

    You can also reference other `.prompt.md` files to create a hierarchy of prompts. You can also reference [instructions files](/docs/copilot/customization/custom-instructions.md) in the same way.

To modify an existing prompt file, in the Chat view, select **Configure Chat** > **Prompt Files**, and then select a prompt file from the list. Alternatively, use the **Chat: Configure Prompt Files** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the prompt file from the Quick Pick.

## Use a prompt file in chat

You have multiple options to run a prompt file:

* In the Chat view, type `/` followed by the prompt file name in the chat input field.

    This option enables you to pass additional information in the chat input field. For example, `/create-react-form` or `/create-react-form: formName=MyForm`.

* Run the **Chat: Run Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) and select a prompt file from the Quick Pick.

* Open the prompt file in the editor, and press the play button in the editor title area. You can choose to run the prompt in the current chat session or open a new chat session.

    This option is useful for quickly testing and iterating on your prompt files.

## Sync user prompt files across devices

VS Code can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user prompt files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Tips for defining prompt files

* Clearly describe what the prompt should accomplish and what output format is expected.

* Provide examples of the expected input and output to guide the AI's responses.

* Use Markdown links to reference custom instructions rather than duplicating guidelines in each prompt.

* Take advantage of built-in variables like `${selection}` and input variables to make prompts more flexible.

* Use the editor play button to test your prompts and refine them based on the results.

## Related resources

* [Customize AI responses overview](/docs/copilot/customization/overview.md)
* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](/docs/copilot/chat/chat-tools.md)
* [Community contributed instructions, prompts, and custom agents](https://github.com/github/awesome-copilot)
