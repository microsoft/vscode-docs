---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 4/29/2026
MetaDescription: Step-by-step guide to customizing AI in VS Code with instructions, prompt files, custom agents, and skills.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- customization
- instructions
- prompt files
- custom agents
- skills
- copilot
- ai
- tutorial
---
# Customize AI for your project

This guide walks you through setting up AI customizations for your project in Visual Studio Code. You start with basic coding standards and progressively add more targeted capabilities.

By the end, your project will have:

* Project-wide coding standards that apply to every chat request
* File-specific instructions for frontend code
* A reusable prompt file for a common task
* A custom agent with restricted tools
* A skill for a specialized capability

## Prerequisites

* [VS Code](https://code.visualstudio.com/download) installed
* A [GitHub Copilot plan](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot) (Free, Pro, Business, or Enterprise)
* The [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) installed
* An open workspace or folder in VS Code

## Step 1: Set project-wide coding standards

Start by generating an instructions file that captures your project's coding standards. These instructions are automatically included in every chat request.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Type `/init` and press `kbstyle(Enter)`.

    ```prompt
    /init
    ```

1. VS Code analyzes your project structure and generates a `.github/copilot-instructions.md` file tailored to your codebase.

1. Review the generated file and customize it. For example, add a rule about your preferred import style:

    ```markdown
    ## Imports
    - Use named imports instead of default imports.
    - Group imports: external libraries first, then internal modules, then relative paths.
    ```

1. Save the file.

**Verify it works**: Ask Copilot to generate some code (for example, "create a utility function for date formatting"). Check that the response follows your coding standards. Select the **References** section in the chat response to confirm that `copilot-instructions.md` was included.

> [!TIP]
> Learn more about always-on instructions in [Use custom instructions](/docs/copilot/customization/custom-instructions.md#use-a-githubcopilot-instructionsmd-file).

## Step 2: Add file-specific instructions

When different parts of your codebase follow different conventions, use instructions files with `applyTo` patterns to target specific file types.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Type `/create-instructions`, followed by a description of the instructions you want to create, and press `kbstyle(Enter)`.

    ```prompt
    /create-instructions React-specific coding standards
    ```

1. Answer the clarifying questions about the instructions and review the generated instructions file.

**Verify it works**: Open a `.tsx` file and ask Copilot to "create a user profile card component". The response should follow your React-specific conventions. Check the **References** section to confirm the instructions file was applied.

> [!TIP]
> You can create multiple instructions files for different file types, frameworks, or modules. Learn more in [Use `.instructions.md` files](/docs/copilot/customization/custom-instructions.md#use-instructionsmd-files).

## Step 3: Create a reusable prompt file

Prompt files encode common tasks as slash commands you can invoke in chat. Create one for a task you perform regularly.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Type `/create-prompt`, followed by a description of the prompt you want to create, and press `kbstyle(Enter)`.

    ```prompt
    /create-prompt Scaffold a new React component with tests
    ```

1. Answer the clarifying questions about the prompt and review the generated prompt file.

**Verify it works**: In the Chat view, type `/<prompt name> data table with sorting and filtering` and press `kbstyle(Enter)`. The agent should scaffold the component and test file according to your conventions.

> [!TIP]
> Type `/create-prompt` in chat to generate a prompt file with AI assistance. You can also extract a reusable prompt from an ongoing conversation by asking "save this workflow as a prompt". Learn more in [Use prompt files](/docs/copilot/customization/prompt-files.md).

## Step 4: Build a custom agent

Custom agents let the AI adopt specialized personas with specific tool access. Create a code reviewer agent that can only read code, not modify it.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Type `/create-agent`, followed by a description of the agent you want to create, and press `kbstyle(Enter)`.

    ```prompt
    /create-agent A code reviewer that analyzes code for quality, security, and best practices without modifying files
    ```

1. Answer the clarifying questions about the agent and review the generated agent file.

**Verify it works**: Select the **Reviewer** agent from the agents dropdown in the Chat view, then ask "review the authentication module". The agent should analyze the code without making changes.

> [!TIP]
> You can add `handoffs` to your agent to create guided workflows. For example, hand off from a planning agent to an implementation agent. Learn more in [Custom agents](/docs/copilot/customization/custom-agents.md#handoffs).

## Step 5: Create a skill for a specialized capability

Skills are folders of instructions, scripts, and resources that Copilot loads when relevant to perform specialized tasks. Unlike instructions files that define coding standards, skills teach Copilot how to perform specific workflows.

1. Run the **Chat: Open Customizations** command from the Command Palette (`kb(workbench.action.showCommands)`) to open the Agent Customizations editor.

1. Select the **Skills** tab and then select **New Skill (Workspace)** from the dropdown.

1. Enter the name of the skill, such as `update-readme`, and press `kbstyle(Enter)`.

1. Add the following content to the `SKILL.md` file:

    ```markdown
    ---
    name: update-readme
    description: Update the project README to reflect recent code changes. Whenever code changes are made, this skill reviews the changes and updates the README with new features, usage instructions, and API references.
    ---
    # Update README

    When updating the README:
    1. Review recent code changes to identify new or modified features
    2. Update the relevant sections (installation, usage, API reference)
    3. Add entries for new commands, configuration options, or environment variables
    4. Remove documentation for deleted or deprecated features
    5. Keep the existing tone, structure, and formatting conventions
    ```

**Verify it works**: In chat, ask Copilot to add a new feature to your project (for example, "add a health check endpoint"). When it generates the code, it should also automatically update the README with the new endpoint's documentation. You can also invoke the skill directly by typing `/update-readme` in the Chat view.

> [!TIP]
> Type `/create-skill` in chat to generate a skill with AI assistance. You can also extract a skill from an ongoing conversation by asking "create a skill from what we just did". Learn more in [Agent Skills](/docs/copilot/customization/agent-skills.md).

## What you built

Your project now has a layered AI customization setup:

```text
your-project/
  .github/
    copilot-instructions.md          # Project-wide coding standards (Step 1)
    instructions/
      react.instructions.md          # React-specific conventions (Step 2)
    prompts/
      create-component.prompt.md     # Reusable component scaffolding (Step 3)
    agents/
      reviewer.agent.md              # Read-only code reviewer (Step 4)
    skills/
      update-readme/
        SKILL.md                     # README updater workflow (Step 5)
```

## Next steps

* Add [MCP servers](/docs/copilot/customization/mcp-servers.md) to extend the agent with external tools and services
* Set up [hooks](/docs/copilot/customization/hooks.md) to automate tasks at agent lifecycle points, such as running a formatter after every file edit
* Browse [agent plugins](/docs/copilot/customization/agent-plugins.md) to install pre-packaged customizations from community marketplaces
* Share customizations with your team by committing the `.github/` directory to your repository
* See all your customizations in one place with the [Agent Customizations editor](/docs/copilot/customization/overview.md#agent-customizations-editor)
