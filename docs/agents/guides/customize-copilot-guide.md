---
ContentId: 2e8a4b9c-3d1f-5e7a-9c2b-4f6d8e1a3b5c
DateApproved: 8/26/2026
MetaDescription: Configure AI for a codebase in {% data variables.product.prodname_vscode_shortname %} with project instructions, targeted guidance, reusable workflows, and specialized agents.
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

# Configure AI for your codebase

AI agents can produce better results when they understand how your codebase is structured, which commands to run, and which conventions to follow. Configure this information once as repository customizations instead of repeating it in every prompt.

This guide starts with project instructions that provide immediate value across coding tasks. You then verify the improvement, share the configuration with your team, and add more focused customizations where they help.

To understand how the customization types differ and work together, see [Agent customization](/docs/agents/concepts/customization.md).

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download).
* [Enable AI features in {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md#enable-ai-features).
* Open the repository that you want to configure.

## Step 1: Create project instructions

Start with a `.github/copilot-instructions.md` file. {% data variables.product.prodname_vscode_shortname %} automatically includes this file in every chat request for the workspace, so use it for information that applies across the codebase.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. In the **Overview** tab, enter a prompt that asks the agent to analyze your codebase and create workspace instructions. For example:

    ```prompt
    Analyze this codebase and create workspace instructions that cover its architecture, important directories, build and test commands, preferred libraries, coding conventions, and requirements for completing a change.
    ```

1. Answer any clarifying questions. The agent analyzes your repository and generates `.github/copilot-instructions.md`.

1. Review and save the generated file.

> [!TIP]
> Project instructions are most useful when they document decisions the agent cannot reliably infer from the code alone. Avoid generic advice that applies to any project.

## Step 2: Review the generated instructions

Treat generated instructions as a starting point. Check that they contain accurate, project-specific information:

* **Architecture**: describe important directories, component boundaries, and where to add different types of code.
* **Commands**: include the correct build, test, lint, and formatting commands.
* **Technology choices**: identify preferred frameworks, libraries, and patterns.
* **Conventions**: capture naming, error-handling, testing, security, and documentation requirements.
* **Definition of done**: state which validations the agent should run before completing a task.

Remove information that is generic, obsolete, or duplicated elsewhere in the file. Resolve conflicting instructions and keep each rule concise.

For example, project-specific instructions might include:

```markdown
## Project structure

* Add API routes under `src/api/routes`.
* Put shared validation schemas in `src/schemas`.
* Keep database access in the repository layer.

## Validation

* Run the unit tests for the changed package.
* Run the linter before completing a code change.
* Add or update tests for every behavior change.
```

Learn more about writing effective [custom instructions](/docs/agent-customization/custom-instructions.md).

## Step 3: Verify the improvement

Test the configuration with a representative task from your repository. Choose a task where project knowledge affects the result, such as adding a component, changing an API endpoint, or fixing a test.

1. Ask the agent to complete the task.
1. Check that it places files in the correct directories and follows your documented patterns.
1. Check that it uses the preferred libraries and runs the correct validation commands.
1. Expand the **References** section in the chat response and confirm that `copilot-instructions.md` was included.

If the result misses a convention or validation step, add a focused rule to the instructions and repeat the task. This feedback loop turns corrections that you might otherwise repeat in chat into repository knowledge that applies to future requests.

## Step 4: Share the configuration

Commit `.github/copilot-instructions.md` to source control. Everyone who works with AI in the repository then receives the same project context without configuring it individually.

Review the instructions like other development configuration. Update them when the architecture, commands, dependencies, or team practices change.

At this point, your repository has a useful baseline customization. The remaining steps are optional. Add them when different parts of the codebase need distinct guidance or when your team repeatedly performs the same workflow.

## Step 5: Add targeted instructions

Use an `*.instructions.md` file when guidance should apply only to particular files or tasks. For example, frontend code and infrastructure code might follow different conventions.

1. Open the Agent Customizations editor.
1. In the **Overview** tab, describe the targeted workspace instructions you want to create. Base the request on a language, framework, directory, or task in your repository. For example:

    ```prompt
    Create workspace instructions for TypeScript React files. Follow the component, state management, accessibility, and testing patterns already used in this repository.
    ```

1. Review the generated file and its `applyTo` frontmatter value. The glob pattern determines which files receive the instructions automatically.
1. Open a matching file and ask the agent to make a small change. Check the response's **References** section to confirm that the targeted instructions were included.

Create separate instruction files only when the guidance has a clear scope. Keep standards that apply throughout the repository in `.github/copilot-instructions.md`.

Learn more about [file-based instructions](/docs/agent-customization/custom-instructions.md#use-instructionsmd-files).

## Step 6: Package a recurring workflow

Create an agent skill when your team repeatedly explains the same multi-step process. A skill can include instructions, scripts, templates, examples, and other resources that the agent loads when a task matches.

Examples include adding a database migration, creating a service endpoint, preparing a release, or diagnosing integration test failures.

1. Open the Agent Customizations editor.
1. In the **Overview** tab, describe a recurring workflow from your repository and ask the agent to create a workspace skill.
1. Review the generated `SKILL.md`. Make sure its `description` clearly states what the skill does and when the agent should load it.
1. Review any scripts, templates, or other resources in the skill directory.
1. Ask the agent to perform a matching task and check that it loads the skill and follows the documented workflow.

Learn more about [Agent Skills](/docs/agent-customization/agent-skills.md).

## Step 7: Add a specialized agent

Create a custom agent when a role needs focused instructions or a different set of tools. For example, a codebase researcher can investigate existing behavior and architecture before implementation without modifying files.

1. Open the Agent Customizations editor.
1. In the **Overview** tab, describe the role, its responsibilities, and the tools it should use. For example:

    ```prompt
    Create a workspace codebase researcher that investigates how features are implemented, traces behavior across files, and reports evidence-based findings before implementation. Give it read-only tools so it cannot modify the repository.
    ```

1. Review the generated agent file. Check that its instructions describe the role and that its tool configuration matches the actions it should perform.
1. Select the custom agent from the agents dropdown and ask it to research how a feature or subsystem works in your repository.
1. Verify that it identifies the relevant files, traces the implementation, supports its findings with evidence, and stays within its configured tool access.

Learn more about [custom agents](/docs/agent-customization/custom-agents.md).

## What you configured

Your repository can now contain the following shared customization layers:

```text
your-project/
  .github/
    copilot-instructions.md          # Project-wide context and standards
    instructions/
      frontend.instructions.md       # Guidance for matching files or tasks
    skills/
      project-workflow/
        SKILL.md                     # Instructions for a recurring workflow
    agents/
      researcher.agent.md            # Specialized role and tool configuration
```

Project instructions provide the baseline. Targeted instructions add context only where it applies. Skills package recurring workflows, and custom agents define specialized roles and tool access. You can adopt each layer independently as your repository's needs grow.

## Next steps

* [Create and manage customizations](/docs/agent-customization/overview.md) from the Agent Customizations editor.
* Add [MCP servers](/docs/agent-customization/mcp-servers.md) to connect the agent to external tools and services.
* Set up [hooks](/docs/agent-customization/hooks.md) when an action must run at a specific agent lifecycle event.
