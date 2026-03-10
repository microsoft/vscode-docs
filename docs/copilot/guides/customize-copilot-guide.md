---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 3/9/2026
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

1. In the Chat view, select **Configure Chat** (gear icon) > **Instructions & Rules**, and then select **New instruction file**.

1. Select `.github/instructions/` to store the instructions in your project.

1. Enter a file name, such as `react`.

1. Add the following content to the file:

    ```markdown
    ---
    applyTo: "**/*.tsx,**/*.jsx"
    ---
    # React component guidelines

    - Use functional components with hooks.
    - Define prop types with TypeScript interfaces.
    - Use CSS modules for component styling.
    - Export components as named exports.
    ```

1. Save the file.

**Verify it works**: Open a `.tsx` file and ask Copilot to "create a user profile card component". The response should follow your React-specific conventions. Check the **References** section to confirm the instructions file was applied.

> [!TIP]
> You can create multiple instructions files for different file types, frameworks, or modules. Learn more in [Use `.instructions.md` files](/docs/copilot/customization/custom-instructions.md#use-instructionsmd-files).

## Step 3: Create a reusable prompt file

Prompt files encode common tasks as slash commands you can invoke in chat. Create one for a task you perform regularly.

1. In the Chat view, select **Configure Chat** (gear icon) > **Prompt Files**, and then select **New prompt file**.

1. Select `.github/prompts/` to store the prompt file in your project.

1. Enter a file name, such as `create-component`.

1. Add the following content to the file:

    ```markdown
    ---
    description: Scaffold a new React component with tests
    agent: agent
    tools: ['editFiles', 'createFile']
    ---
    Create a new React component based on the user's description.

    For each component, generate:
    1. The component file in `src/components/`
    2. A test file in `src/components/__tests__/`

    Follow the conventions in [React guidelines](../instructions/react.instructions.md).
    ```

1. Save the file.

**Verify it works**: In the Chat view, type `/create-component a data table with sorting and filtering` and press `kbstyle(Enter)`. Copilot should scaffold the component and test file according to your conventions.

> [!TIP]
> Type `/create-prompt` in chat to generate a prompt file with AI assistance. You can also extract a reusable prompt from an ongoing conversation by asking "save this workflow as a prompt". Learn more in [Use prompt files](/docs/copilot/customization/prompt-files.md).

## Step 4: Build a custom agent

Custom agents let the AI adopt specialized personas with specific tool access. Create a code reviewer agent that can only read code, not modify it.

1. In the Chat view, select **Configure Chat** (gear icon) > **Custom Agents**, and then select **Create new custom agent**.

1. Select `.github/agents/` to store the agent in your project.

1. Enter a file name, such as `reviewer`.

1. Add the following content to the file:

    ```markdown
    ---
    description: Review code for quality, security, and best practices
    tools: ['search/codebase', 'search/workspace', 'githubRepo']
    ---
    You are a code reviewer. Analyze the provided code and identify:

    1. **Security issues**: SQL injection, XSS, hardcoded secrets, insecure dependencies
    2. **Code quality**: complex functions, duplicated logic, missing error handling
    3. **Best practices**: naming conventions, documentation, test coverage

    Provide specific, actionable feedback. Reference the relevant code locations.
    Do NOT modify any files. Only review and report findings.
    ```

1. Save the file.

**Verify it works**: Select the **Reviewer** agent from the agents dropdown in the Chat view, then ask "review the authentication module". The agent should analyze the code without making changes.

> [!TIP]
> You can add `handoffs` to your agent to create guided workflows. For example, hand off from a planning agent to an implementation agent. Learn more in [Custom agents](/docs/copilot/customization/custom-agents.md#handoffs).

## Step 5: Create a skill for a specialized capability

Skills are folders of instructions, scripts, and resources that Copilot loads when relevant to perform specialized tasks. Unlike instructions files that define coding standards, skills teach Copilot how to perform specific workflows.

1. Create a `.github/skills/update-readme/` directory in your workspace.

1. Create a `SKILL.md` file in the directory with the following content:

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

1. Save the file.

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
* See all your customizations in one place with the [Chat Customizations editor](/docs/copilot/customization/overview.md#chat-customizations-editor)
