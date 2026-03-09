---
ContentId: 8f9a3e5c-2b4d-4a7f-9c8e-1d6f3a2b5c4e
DateApproved: 3/9/2026
MetaDescription: Learn how to use the plan agent for autonomous planning and task management with the todo list in VS Code chat.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Planning with agents in VS Code

Agents in Visual Studio Code help you execute complex coding tasks autonomously. The plan agent enables you to create detailed implementation plans before starting the implementation to ensure all requirements are met. With todo lists, the agent can ensure it stays focused on the overall goals and tracks progress effectively.

Using plans and todos lets you structure and review details of the implementation with the agent before coding starts, improving the quality and reliability of the generated code. The plan and todos also provide better guidance to the agent to work through more complex and longer tasks in a systematic way.

This article explains how to research and plan development tasks with agents in VS Code, including the plan agent and todo lists.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Plan a feature with agents">
Use the Plan agent to create a structured implementation plan for a new feature.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%2Fplan%20a%20terminal%20UI%20app%20to%20track%20my%20todo%20list.)

</div>

## Plan agent for detailed task research

The built-in plan agent collaborates with you to create detailed implementation plans before executing them. This ensures that all requirements are considered and addressed before any code changes are made. The plan agent does not make any code changes until the plan is reviewed and approved by you. Once approved, you can hand off the plan to the default agent or save the plan for further refinement, review, or team discussions.

The plan agent is designed to:

* Research the task comprehensively using read-only tools and codebase analysis to identify requirements and constraints
* Ask clarifying questions interactively to resolve ambiguities before drafting the plan
* Break down the task into manageable, actionable steps with clear verification criteria and documented decisions
* Present a concise plan draft, based on a standardized plan format, for user review and iteration

The plan agent uses a 4-phase iterative workflow: **Discovery** (research) → **Alignment** (ask questions) → **Design** (draft plan) → **Refinement** (iterate). Questions are asked through interactive prompts that pause the agent until you respond, ensuring better alignment with your intent before code changes are made.

### How to plan a task

To plan a task, use the built-in **Plan** agent in the Chat view, describe your task, and iterate on the generated plan.

1. Open the Chat view by pressing `kb(workbench.action.chat.open)` and select **Plan** from the agents dropdown

    Alternatively, type `/plan` followed by your task description to switch to the Plan agent and start planning in one step.

1. Enter a high-level task (feature, refactoring, bug, etc.) and submit it. For example:

    ```prompt-plan
    Implement a user authentication system with OAuth2 and JWT
    ```

    Use the `/plan` slash command to start planning directly from the chat input box:

    ```prompt
    /plan Add unit tests for all API endpoints
    ```

1. Answer any clarifying questions the agent asks after researching your task.

1. The Plan agent generates a high-level plan summary, implementation and verification steps. Review the plan draft and submit follow-up prompts to iterate on the plan until it meets your requirements.

1. When the plan is finalized, choose to start the implementation or open the planning prompt in the editor for further review.

    To implement the plan, you can continue in the same session or start a new [Copilot CLI session](/docs/copilot/agents/copilot-cli.md) to implement the plan in the background.

> [!TIP]
> The Plan agent automatically saves its implementation plan to a session memory file (`/memories/session/plan.md`). To access this file, run the **Chat: Show Memory Files** command and select `plan.md` from the list. Session memory is cleared when the conversation ends, so the plan is not available in subsequent sessions.

## Customize planning

You can tailor the planning process to fit your team's workflow:

* **Create a custom planning agent.** Define a [custom agent](/docs/copilot/customization/custom-agents.md) with specific instructions for your planning process, such as enforcing architectural guidelines or requiring specific planning deliverables.

* **Choose models for planning and implementation.** Use the `setting(chat.planAgent.defaultModel)` setting to select a default model for the plan agent, and `setting(github.copilot.chat.implementAgent.model)` for the implementation step.

* **Add extra tools to the plan agent (experimental).** Use the `setting(github.copilot.chat.planAgent.additionalTools)` setting to give the plan agent access to additional tools during the research and planning phases. For example, use an MCP server to connect to internal data sources or tools.

## Related resources

* [Memory in VS Code agents](/docs/copilot/agents/memory.md)
* [Configure tools for agents](/docs/copilot/agents/agent-tools.md)
* [Context engineering user guide](/docs/copilot/guides/context-engineering-guide.md)
