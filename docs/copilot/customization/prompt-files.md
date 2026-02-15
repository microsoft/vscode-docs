---
ContentId: 5c8e7d42-9b1a-4f85-a3e2-6d5b8a9c1e43
DateApproved: 02/04/2026
MetaDescription: Learn how to create reusable prompt files for GitHub Copilot Chat in VS Code to standardize common development tasks and improve your coding workflow efficiency.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- prompt files
- slash commands
- reusable prompts
- copilot
- ai
- task automation
---
# Use prompt files in VS Code

Prompt files, also known as slash commands, let you simplify prompting for common tasks by encoding them as standalone Markdown files that you can invoke directly in chat. Each prompt file includes task-specific context and guidelines about how the task should be performed.

Unlike [custom instructions](/docs/copilot/customization/custom-instructions.md) that are applied automatically, you invoke prompt files manually in chat.

Use prompt files to:

* Simplify prompting for common tasks, such as scaffolding a new component, running and fixing tests, or preparing a pull request
* Override default behavior of a custom agent, such as creating a minimal implementation plan or generating mockups for API calls

## Prompt file locations

You can define prompt files for a specific workspace or at the user level, where they are available across all your workspaces.

| Scope | Default file location |
|-------|-----------------------|
| Workspace | `.github/prompts` folder |
| User profile | `prompts` folder of the current [VS Code profile](/docs/configure/profiles.md) |

You can configure additional file locations for workspace prompt files with the `setting(chat.promptFilesLocations)` setting.

## Prompt file format

Prompt files are Markdown files with the `.prompt.md` extension. The optional YAML frontmatter header configures the prompt's behavior:

| Field | Required | Description |
| --- | --- | --- |
| `description` | No | A short description of the prompt. |
| `name` | No | The name of the prompt, used after typing `/` in chat. If not specified, the file name is used. |
| `argument-hint` | No | Hint text shown in the chat input field to guide users on how to interact with the prompt. |
| `agent` | No | The agent used for running the prompt: `ask`, `agent`, `plan`, or the name of a [custom agent](/docs/copilot/customization/custom-agents.md). By default, the current agent is used. If tools are specified, the default agent is `agent`. |
| `model` | No | The language model used when running the prompt. If not specified, the currently selected model in model picker is used. |
| `tools` | No | A list of tool or tool set names that are available for this prompt. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. To include all tools of an MCP server, use the `<server name>/*` format.<br/>Learn more about [tools in chat](/docs/copilot/agents/agent-tools.md). |

> [!NOTE]
> If a given tool is not available when running the prompt, it is ignored.

The body contains the prompt text in Markdown format. Provide specific instructions, guidelines, or any other relevant information that you want the AI to follow.

You can reference other workspace files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

To reference agent tools in the body text, use the `#tool:<tool-name>` syntax. For example, to reference the `githubRepo` tool, use `#tool:githubRepo`.

Within a prompt file, you can reference variables by using the `${variableName}` syntax. You can reference the following variables:

* Workspace variables - `${workspaceFolder}`, `${workspaceFolderBasename}`
* Selection variables - `${selection}`, `${selectedText}`
* File context variables - `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
* Input variables - `${input:variableName}`, `${input:variableName:placeholder}` (pass values to the prompt from the chat input field)

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
Your goal is to generate a new React form component based on the templates in #tool:githubRepo contoso/react-templates.

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
<summary>Example: using variables</summary>

```markdown
---
description: 'Generate unit tests for the current file'
agent: 'agent'
tools: ['search', 'read', 'edit']
---
Generate unit tests for [${fileBasename}](${file}).

* Place the test file in the same directory: ${fileDirname}
* Name the test file: ${fileBasenameNoExtension}.test.ts
* Test framework: ${input:framework:jest or vitest}
* Follow testing conventions in: [testing.md](../docs/testing.md)

If there is a selection, only generate tests for this code:
${selection}
```

This example combines workspace, file context, selection, and input variables. When you run the prompt, Copilot resolves `${file}`, `${fileBasename}`, `${fileDirname}`, and `${fileBasenameNoExtension}` from the active editor, uses `${selection}` for any selected text, and prompts you to enter a value for `${input:framework}`.

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

## Create a prompt file

When you create a prompt file, choose whether to store it in your workspace or user profile. Workspace prompt files apply only to that workspace, while user prompt files are available across multiple workspaces.

To create a prompt file:

> [!TIP]
> Type `/prompts` in the chat input to quickly open the **Configure Prompt Files** menu.

1. In the Chat view, select **Configure Chat** (gear icon) > **Prompt Files**, and then select **New prompt file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Prompt File** or **Chat: New Untitled Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the scope of the prompt file:

    * **Workspace**: creates the prompt file in the `.github/prompts` folder of your workspace to only use it within that workspace. Add more prompt folders for your workspace with the `setting(chat.promptFilesLocations)` setting.

    * **User profile**: creates the prompt file in the [current profile folder](/docs/configure/profiles.md) to use it across all your workspaces.

1. Enter a file name for your prompt file. This is the default name that appears when you type `/` in chat.

1. Author the chat prompt by using Markdown formatting.

    * Fill in the YAML frontmatter at the top of the file to configure the prompt's description, agent, tools, and other settings.
    * Add instructions for the prompt in the body of the file.

To modify an existing prompt file, in the Chat view, select **Configure Chat** > **Prompt Files**, and then select a prompt file from the list. Alternatively, use the **Chat: Configure Prompt Files** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the prompt file from the Quick Pick.

## Use a prompt file in chat

You have multiple options to run a prompt file:

* In the Chat view, type `/` followed by the prompt name in the chat input field. [Agent skills](/docs/copilot/customization/agent-skills.md) also appear as slash commands alongside prompt files.

    You can add extra information in the chat input field. For example, `/create-react-form formName=MyForm` or `/create-api for listing customers`.

* Run the **Chat: Run Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) and select a prompt file from the Quick Pick.

* Open the prompt file in the editor, and press the play button in the editor title area. You can choose to run the prompt in the current chat session or open a new chat session.

    This option is useful for quickly testing and iterating on your prompt files.

> [!TIP]
> Use the `setting(chat.promptFilesRecommendations)` setting to show prompts as recommended actions when starting a new chat session.
>
> ![Screenshot showing a "explain" prompt file recommendation in the Chat view.](../images/customization/prompt-file-recommendations.png)

## Tool list priority

You can specify the list of available tools for both a custom agent and prompt file by using the `tools` metadata field. Prompt files can also reference a custom agent by using the `agent` metadata field.

The list of available tools in chat is determined by the following priority order:

1. Tools specified in the prompt file (if any)
2. Tools from the referenced custom agent in the prompt file (if any)
3. Default tools for the selected agent (if any)

## Sync user prompt files across devices

VS Code can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user prompt files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Tips for writing effective prompts

* Clearly describe what the prompt should accomplish and what output format is expected.

* Provide examples of the expected input and output to guide the AI's responses.

* Use Markdown links to reference custom instructions rather than duplicating guidelines in each prompt.

* Take advantage of built-in variables like `${selection}` and input variables to make prompts more flexible.

* Use the editor play button to test your prompts and refine them based on the results.

## Frequently asked questions

### How do I know where a prompt file comes from?

Prompt files can come from different sources: built-in, user-defined in your profile, workspace-defined prompts in your current workspace, or extension-contributed prompts.

To identify the source of a prompt file:

1. Select **Chat: Configure Prompt Files** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Hover over the prompt file in the list. The source location is displayed in a tooltip.

> [!TIP]
> Use the chat customization diagnostics view to see all loaded prompt files and any errors. Right-click in the Chat view and select **Diagnostics**. Learn more about [troubleshooting AI in VS Code](/docs/copilot/troubleshooting.md).

## Related resources

* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Configure tools in chat](/docs/copilot/agents/agent-tools.md)
* [Community contributed instructions, prompts, and custom agents](https://github.com/github/awesome-copilot)
