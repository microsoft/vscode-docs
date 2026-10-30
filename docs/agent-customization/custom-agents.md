---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 10/30/2026
MetaDescription: Create, test, and share custom agents in {% data variables.product.prodname_vscode_shortname %} for consistent code reviews and other recurring tasks.
MetaSocialImage: ../../learn/images/shared/agent-first-development-social.png
Keywords:
- custom agents
- chat modes
- agent personas
- handoffs
- subagents
- copilot
- ai
- customize
- code review
---
# Custom agents in {% data variables.product.prodname_vscode_shortname %}

Custom agents combine instructions, tools, and an optional language model into a reusable configuration for a specific role, such as planning or code review. Switch to a custom agent instead of repeating the same instructions and selecting tools for every conversation.

Start with one recurring task where the default agent needs more specific guidance. This article walks through creating a code review agent, checking its results, and refining it before sharing it with your team. For file locations, syntax, and harness-specific options, see the [Custom agent file reference](/docs/agents/reference/custom-agent-file-reference.md).

## When to use a custom agent

Create a custom agent when a recurring role needs its own instructions, tools, or output format. For example:

* Review code against your team's criteria with reading and search tools.
* Investigate how a feature works and return findings with file references.
* Produce implementation plans that follow your team's required structure.

You don't need a custom agent for every task. Use the [built-in planning workflow](/docs/agents/run/planning.md) if it already meets your needs. Put project-wide conventions in [custom instructions](/docs/agent-customization/custom-instructions.md), and put one-time requirements in your prompt. For reusable workflows with supporting scripts or resources, consider an [agent skill](/docs/agent-customization/agent-skills.md).

See the [customization comparison](/docs/agents/concepts/customization.md#customization-options-at-a-glance) if you're unsure which option fits.

## Create a custom agent

> [!TIP]
> Before creating an agent, check whether a plugin already provides one for your task. [Browse and install plugins from a marketplace](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace). Review the plugin's included agents and harness compatibility before installing it.

The following steps use the **{% data variables.product.prodname_copilot_short %}** harness and create a workspace agent that you can share through source control. Other harnesses have different file formats and tool rules. See [harness compatibility](/docs/agents/reference/custom-agent-file-reference.md#harness-compatibility) before reusing the file with another harness.

1. Open your project folder and select the **{% data variables.product.prodname_copilot_short %}** harness in chat.

1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`) to open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) and then select the **Agents** tab.

1. Select **New Agent** (plus icon) next to **Workspace**.

    ![Screenshot showing the Agent Customizations editor and the dropdown to create a new custom agent.](images/customization/create-custom-agent-2.png)

1. Choose the workspace location and enter `reviewer` as the file name.

1. Replace the generated file contents with the following example. Adapt the review criteria to problems your team repeatedly encounters.

    ```markdown
    ---
    name: Reviewer
    description: Review code for incorrect behavior and missing tests without editing files
    tools: ['read', 'search']
    ---
    Review the code supplied in the request. Read related code and tests
    when needed to check the behavior.

    Focus on:
    * Incorrect behavior and unhandled errors.
    * Missing tests for important behavior and error cases.

    Report only actionable findings. For each finding, include the file
    and line, the problem, its impact, and a suggested fix or test.
    If you find no issues, say so and note anything you couldn't verify.

    Do not edit files or run terminal commands.
    ```

1. Save the file, then [verify the agent](#verify-your-custom-agent) before adding more configuration.

The YAML header names the agent and selects reading and search tools. The Markdown body defines the review criteria and expected output. No model preference, handoff, or subagent configuration is needed for this example.

If you prefer to create the file directly, save it as `.github/agents/reviewer.agent.md`, creating the folders if needed. You can also run **Chat: New Custom Agent** or ask an agent to generate a starter file. Review generated instructions and tool choices before using them.

## Verify your custom agent

Check both whether the agent is available and whether it produces the result you need:

1. Open **Agents** in the Agent Customizations editor and confirm that **Reviewer** is listed without file errors.
1. Start a new chat with the same harness and repository folder. Select **Reviewer** from the **Agent** dropdown.
1. Use **Add Context** to attach a small source file and its tests. Choose code you understand so you can check the findings. Send a request without repeating the agent's instructions:

    ```prompt-reviewer
    Review these files.
    ```

1. Check that the response focuses on behavior and missing tests, cites relevant file locations, and explains each finding's impact. Verify the findings against the code, not just the requested output format.
1. Review the tool activity and workspace changes. For this reviewer, expect reading and search activity, not file edits or terminal commands. It should not claim to have run tests.

If the result isn't useful, clarify one instruction and repeat the same task in a new chat. Keep the harness, model, input files, and available tools consistent when comparing results. See [Troubleshoot custom agents](#troubleshoot-custom-agents) if the agent is missing or uses unexpected capabilities.

## Write effective agent instructions

Give the agent concrete decisions to make and a useful result to return, rather than only naming a persona.

* **Keep the role focused.** Define the task, the input it needs, and when it should stop. For example, replace 'Be an expert reviewer' with 'Review the supplied code for error-handling defects and missing tests. Report findings without editing files.'
* **Specify the output.** Ask for actionable findings with file and line references, not general feedback. For a planning agent, request implementation steps, affected files, tests to update, and decisions that need confirmation before coding.
* **Keep shared rules in project instructions.** Don't duplicate your repository's coding conventions in every agent. Use the agent body for role-specific guidance.
* **Match tools to the task.** A reviewer that only reads code doesn't need editing, terminal, or delegation tools. Use [editor completions](/docs/agents/reference/custom-agent-file-reference.md#edit-a-custom-agent-file) to select tools supported by your harness.
* **Refine from observed results.** Add a rule when it addresses a recurring failure, then repeat a representative task to check its effect.

Instructions guide the model. They don't guarantee compliance. A 'do not edit' instruction alone is not a permission boundary. Configure the tools the role needs and check their actual use. Tool restrictions differ by harness, so review [harness compatibility](/docs/agents/reference/custom-agent-file-reference.md#harness-compatibility) before sharing an agent across harnesses.

For more examples to adapt and verify, see the community-contributed [Awesome Copilot agents](https://github.com/github/awesome-copilot/blob/main/docs/README.agents.md).

## Use a custom agent

Select the intended harness from the **Session Target** control, then choose your custom agent from the **Agent** dropdown. Enter a request for its role and review the response and tool calls. The custom agent remains selected until you switch agents. Switch back to a general-purpose agent when you're ready for a different task, such as implementing a review finding.

In the {% data variables.product.prodname_copilot_short %} harness, the agent's instructions are added to your custom instructions and take precedence if they conflict. Keep the guidance consistent rather than relying on conflicting rules. For details, see the [agent file reference](/docs/agents/reference/custom-agent-file-reference.md#body).

Another agent can also invoke a custom agent as a [subagent](/docs/agents/run/subagents.md#run-a-custom-agent-as-a-subagent). Delegation is optional. You don't need it to use the reviewer yourself.

## Manage and share custom agents

Use the Agent Customizations editor to find and edit your agents. You can open it with **Chat: Open Customizations**, from **Customizations** in the {% data variables.copilot.agents_window %}, or from **Configure Custom Agents** in the agent dropdown. Hover over an agent to check its source location.

* **Share with your repository.** Review and commit the workspace agent file after verifying its behavior. Teammates who use a compatible harness can select it from the agent dropdown.
* **Reuse across your projects.** Select **New Agent** next to **User** in the editor. Store the file in a [user location supported by your harness](/docs/agents/reference/custom-agent-file-reference.md#custom-agent-file-locations).
* **Share across an organization.** Use [organization-level custom agents](/docs/agents/reference/custom-agent-file-reference.md#organization-level-agents) for supported experiences.
* **Distribute a bundle.** Package agents with related skills, instructions, or tools in an [agent plugin](/docs/agent-customization/agent-plugins.md#what-plugins-provide). Supported components depend on the selected harness and plugin format.

To remove an agent you maintain, delete its file or hover over it in the editor and select the trash icon. Deleting a shared workspace file removes it for teammates when they receive the repository change. You can't delete extension-provided agents in this editor. Disable or uninstall the contributing extension instead, which also affects its other features.

### Customize the agents dropdown list

To keep a custom agent available as a [subagent](/docs/agents/run/subagents.md) without listing it in the **Agent** dropdown, set `user-invocable: false` in its YAML frontmatter:

```yaml
user-invocable: false
```

This property controls picker visibility in both **Local** and **Copilot**. To show the agent again, set it to `true` or remove the property. Subagent invocation is controlled separately by `disable-model-invocation`.

Editing this property changes the agent definition, not a personal visibility preference. If you share the file in a repository, the change applies to everyone who uses that definition. It doesn't delete the agent file.

## Handoffs

> [!NOTE]
> Custom-agent `handoffs` are supported only in the **Local** harness. A Local handoff can still offer **Continue in** options for other supported session targets.

Handoffs connect agents into a workflow with suggested next steps. After a chat response completes, handoff buttons let you switch to another agent with the conversation context and a pre-filled prompt.

Use handoffs to review one stage of a task before starting the next. For example:

* **Planning to implementation**: Review a plan, then hand off to an implementation agent to start coding.
* **Implementation to review**: Complete implementation, then switch to a code review agent.
* **Failing tests to passing tests**: Review generated tests, then hand off to an agent that implements the changes needed to pass them.

For an optional planning-to-implementation workflow, create `.github/agents/planner.agent.md` with the following content:

```markdown
---
name: Planner
description: Generate an implementation plan without changing code
tools: ['read', 'search']
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
---
Research the requested feature or refactoring task.
Do not edit files. Return a Markdown plan with these sections:
* Overview
* Requirements
* Implementation steps
* Tests to add or update
```

Save the file, then try the handoff:

1. In a Local harness session, select **Planner** and ask it to plan a change.
1. Review the completed plan, then select **Implement Plan**.
1. Review the pre-filled implementation prompt and send it when you're ready for code changes.

Set `send: true` to submit the handoff prompt automatically. For all properties, including selecting a model for the next step, see the [handoff field reference](/docs/agents/reference/custom-agent-file-reference.md#handoff-fields).

Handoffs switch the active agent in your conversation. To delegate work without switching the main agent, use [subagents](/docs/agents/run/subagents.md#delegate-implementation-to-a-worker).

## Troubleshoot custom agents

Identify whether the problem is discovery, configuration, or the result before changing the agent's instructions.

| What you observe | What to check |
|------------------|---------------|
| The file isn't listed in the Agent Customizations editor. | Confirm the selected harness, [file name and location](/docs/agents/reference/custom-agent-file-reference.md#custom-agent-file-locations), and repository folder. A new worktree might not contain your uncommitted agent file. |
| The file is listed, but the agent isn't in the dropdown. | Check frontmatter errors and whether `user-invocable` is `false`. See [picker visibility](#customize-the-agents-dropdown-list). |
| The agent has unexpected tools or can't use a required tool. | Check the tool names supported by the selected harness and review actual tool activity. Editor completions don't prove runtime availability. For Local, also check whether a [prompt file overrides the tool list](/docs/agents/reference/custom-agent-file-reference.md#tool-list-priority). |
| The agent is selected, but the result doesn't follow its role. | Check for vague or conflicting instructions. Clarify one rule and [repeat the task in a new chat](#verify-your-custom-agent). Don't add more tools unless the task needs them. |

For unresolved problems, [inspect chat interactions](/docs/agents/agent-troubleshooting/troubleshooting.md#inspect-chat-interactions) to compare the request, instructions, and tool activity. File discovery alone doesn't establish that the agent follows the intended guidance.

## Related resources

* [Custom agent file reference](/docs/agents/reference/custom-agent-file-reference.md)
* [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md)
* [Coordinate research and implementation with subagents](/docs/agents/run/subagents.md#delegate-implementation-to-a-worker)
