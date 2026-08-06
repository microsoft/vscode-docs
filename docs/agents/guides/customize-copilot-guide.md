---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 8/5/2026
MetaDescription: Customize AI in VS Code with a step-by-step project guide for instructions, custom agents, and agent skills.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- customization
- instructions
- custom agents
- skills
- copilot
- ai
- tutorial
---
# Customize AI for your project

This guide walks you through setting up AI customizations for your project in Visual Studio Code. You start with basic coding standards and progressively add more targeted capabilities.

To understand how the customization types differ and work together, see [Agent customization](/docs/agents/concepts/customization.md).

By the end, your project will have:

* Project-wide coding standards that apply to every chat request
* File-specific instructions for frontend code
* A custom agent with restricted tools
* A skill for a specialized capability

## Prerequisites

* [Download and install Visual Studio Code](/download)

* [Enable AI features in VS Code](/docs/getstarted/overview.md#enable-ai-features)

## Step 1: Set project-wide coding standards

Start by generating an instructions file that captures your project's coding standards. These instructions are automatically included in every chat request.

1. Open a workspace or folder in VS Code that contains the codebase you want to customize AI for.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. In the **Overview** tab, describe the workspace instructions you want to create. For example:

    ```prompt
    Create workspace instructions based on this codebase, including its architecture, coding standards, and preferred libraries.
    ```

1. Answer any clarifying questions. VS Code analyzes your project and generates a `.github/copilot-instructions.md` file tailored to your codebase.

1. Review the generated file and customize it. For example, add a rule about your preferred import style:

    ```markdown
    ## Imports
    - Use named imports instead of default imports.
    - Group imports: external libraries first, then internal modules, then relative paths.
    ```

1. Save the file.

**Verify it works**: Ask Copilot to generate some code (for example, "create a utility function for date formatting"). Check that the response follows your coding standards. Select the **References** section in the chat response to confirm that `copilot-instructions.md` was included.

> [!TIP]
> Learn more about always-on instructions in [Use custom instructions](/docs/agent-customization/custom-instructions.md#use-a-githubcopilot-instructionsmd-file).

## Step 2: Add file-specific instructions

When different parts of your codebase follow different conventions, use instructions files with `applyTo` patterns to target specific file types.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. In the **Overview** tab, describe the targeted instructions you want to create. For example:

    ```prompt
    Create workspace instructions that apply React-specific coding standards to TypeScript React files.
    ```

1. Answer any clarifying questions and review the generated instructions file.

**Verify it works**: Open a `.tsx` file and ask Copilot to "create a user profile card component". The response should follow your React-specific conventions. Check the **References** section to confirm the instructions file was applied.

> [!TIP]
> You can create multiple instructions files for different file types, frameworks, or modules. Learn more in [Use `.instructions.md` files](/docs/agent-customization/custom-instructions.md#use-instructionsmd-files).

## Step 3: Build a custom agent

Custom agents let the AI adopt specialized personas with specific tool access. Create a code reviewer agent that can only read code, not modify it.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. In the **Overview** tab, describe the custom agent you want to create. For example:

    ```prompt
    Create a workspace agent that reviews code for quality, security, and best practices without modifying files.
    ```

1. Answer any clarifying questions and review the generated agent file.

**Verify it works**: Select the **Reviewer** agent from the agents dropdown in the Chat view, then ask "review the authentication module". The agent should analyze the code without making changes.

> [!TIP]
> You can add `handoffs` to your agent to create guided workflows. For example, hand off from a planning agent to an implementation agent. Learn more in [Custom agents](/docs/agent-customization/custom-agents.md#handoffs).

## Step 4: Create a skill for a specialized capability

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

**Verify it works**: In chat, ask Copilot to add a new feature to your project (for example, "add a health check endpoint") and update the README. Check that the agent loads the skill and follows its workflow. You can also invoke the skill directly by typing `/update-readme` in the Chat view.

> [!TIP]
> You can generate a skill from the **Overview** tab in the Agent Customizations editor. You can also extract a skill from an ongoing conversation by asking "create a skill from what we just did". Learn more in [Agent Skills](/docs/agent-customization/agent-skills.md).

## What you built

Your project now has a layered AI customization setup:

```text
your-project/
  .github/
    copilot-instructions.md          # Project-wide coding standards (Step 1)
    instructions/
      react.instructions.md          # React-specific conventions (Step 2)
    agents/
      reviewer.agent.md              # Read-only code reviewer (Step 3)
    skills/
      update-readme/
        SKILL.md                     # README updater workflow (Step 4)
```

## Next steps

* Add [MCP servers](/docs/agent-customization/mcp-servers.md) to extend the agent with external tools and services.
* Set up [hooks](/docs/agent-customization/hooks.md) to automate tasks at agent lifecycle points, such as running a formatter after every file edit.
* Share customizations with your team by committing the `.github/` directory to your repository.
