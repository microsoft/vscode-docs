---
ContentId: 8f9a3e5c-2b4d-4a7f-9c8e-1d6f3a2b5c4e
DateApproved: 8/26/2026
MetaDescription: Learn how to use the plan agent for autonomous planning and task management with the todo list in {% data variables.product.prodname_vscode_shortname %} chat.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# Planning with agents in {% data variables.product.prodname_vscode_shortname %}

The plan agent enables you to create detailed implementation plans before starting the implementation to ensure all requirements are met. With todo lists, the agent can ensure it stays focused on the overall goals and tracks progress effectively.

For background on how the plan agent fits into the agent architecture, see [Agents concepts](/docs/agents/concepts/agents.md#planning).

This article explains how to use the plan agent and todo lists in {% data variables.product.prodname_vscode_shortname %}.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Plan a feature with agents">
Use the Plan agent to create a structured implementation plan for a new feature.

* [Open in {% data variables.product.prodname_vscode_shortname %}](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%2Fplan%20a%20terminal%20UI%20app%20to%20track%20my%20todo%20list.)

</div>

## How to plan a task

To plan a task, use the built-in **Plan** agent in the {% data variables.copilot.chat_view %}, describe your task, and iterate on the generated plan.

1. Open the {% data variables.copilot.chat_view %} by pressing `kb(workbench.action.chat.open)` and select **Plan** from the agents dropdown

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

    To implement the plan, select **Start Implementation** and choose an available implementation agent. The plan and conversation context carry over to the implementation agent. Learn more about [handing off a plan to implementation](/docs/agents/run/agent-harnesses.md#hand-off-a-session).

> [!TIP]
> The Plan agent automatically saves its implementation plan to a session memory file (`/memories/session/plan.md`). To access this file, run the **Chat: Show Memory Files** command and select `plan.md` from the list. Session memory is cleared when the conversation ends, so the plan is not available in subsequent sessions.

## Customize planning

You can tailor the planning process to fit your team's workflow:

* **Create a custom planning agent.** Define a [custom agent](/docs/agent-customization/custom-agents.md) with specific instructions for your planning process, such as enforcing architectural guidelines or requiring specific planning deliverables.

* **Choose models for planning and implementation.** Use the `setting(chat.planAgent.defaultModel)` setting to select a default model for the plan agent, and `setting(github.copilot.chat.implementAgent.model)` for the implementation step.

* **Add extra tools to the plan agent (experimental).** Use the `setting(github.copilot.chat.planAgent.additionalTools)` setting to give the plan agent access to additional tools during the research and planning phases. For example, use an MCP server to connect to internal data sources or tools.

## Related resources

* [Run deep research with the research agent](/docs/agents/run/agent-harnesses.md#run-deep-research-with-the-research-agent)
* [Memory in {% data variables.product.prodname_vscode_shortname %} agents](/docs/agents/run/memory.md)
* [Configure tools for agents](/docs/agents/run/tools.md)
* [Context engineering user guide](/docs/agents/guides/context-engineering-guide.md)
