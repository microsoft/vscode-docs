---
ContentId: 8f9a3e5c-2b4d-4a7f-9c8e-1d6f3a2b5c4e
DateApproved: 9/17/2026
MetaDescription: Create and review implementation plans with {% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# Plan work with agents in {% data variables.product.prodname_vscode_shortname %}

Planning helps you clarify requirements, compare approaches, and identify risks before an agent changes your code. Use a separate planning step when the approach is uncertain or a change spans multiple parts of your project. For a small, well-defined edit, you can ask an agent to implement it directly.

You can ask an agent to propose an approach in an ordinary conversation. For a dedicated planning workflow, use **Plan** mode in a **{% data variables.product.prodname_copilot_short %}** session. The agent researches your project, asks clarifying questions, and creates a plan for you to review before implementation.

This article walks you through creating a plan with {% data variables.product.prodname_copilot_short %}, reviewing and refining it, and choosing whether to implement it or save it for later. It also covers the different controls for [planning in a Local session](#plan-in-a-local-session).

For an end-to-end example, follow the guide to [add a feature to an existing project](/docs/agents/guides/add-a-feature.md), from defining requirements to reviewing the tested change.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Plan a feature with agents">
Use {% data variables.product.prodname_copilot_short %} to create and review an implementation plan before changing code.

* [Start planning](#how-to-plan-a-task)

</div>

## How to plan a task

Open your project folder in {% data variables.product.prodname_vscode_shortname %} and [set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) before you begin.

The following steps use the **{% data variables.product.prodname_copilot_short %}** session target. Learn more about [choosing an agent harness](/docs/agents/run/agent-harnesses.md).

1. Open the {% data variables.copilot.chat_view %} with `kb(workbench.action.chat.open)` and select **New Chat** (`+`).

1. Choose **{% data variables.product.prodname_copilot_short %}** from the **Session Target** control.

1. Enter `/plan` followed by the outcome you want, any constraints, and how you will verify success. For example:

    ```prompt
    /plan Add pagination to this project's product-list API.
    Follow the existing API conventions and preserve the behavior of requests
    that don't specify pagination. Include tests for invalid parameters,
    empty results, and compatibility with existing clients.
    Identify decisions I need to make before implementation.
    ```

    `/plan` switches the session to Plan mode and submits your request. Alternatively, select **Plan** from the agent mode picker and enter the task without the slash command.

1. Answer the agent's clarifying questions as it researches your project. For example, agree on a pagination approach and defaults before it finalizes the plan. If you're unsure, ask it to recommend an approach and explain the tradeoffs.

The agent presents a plan with implementation steps, relevant files, and verification steps. An illustrative outline for the pagination task is:

* Add optional pagination parameters using the API's existing validation patterns.
* Apply pagination when requested, preserving the response format and behavior for existing clients.
* Add tests for valid and invalid parameters, empty results, and requests without pagination.
* Run the API test suite and verify that existing clients still receive the expected results.

Your actual plan should identify the files and code patterns in your project, not just list generic tasks.

### Ask the current agent to plan

For a discussion of an approach, you can ask the current agent for a plan without explicitly selecting Plan mode:

```prompt
Research how to add pagination to this project's product-list API.
Propose an implementation plan and identify compatibility risks.
Do not change project files. Wait for my approval before implementing.
```

This request guides the agent's behavior but does not change the session's permissions. Select Plan mode or use `/plan` when you want to start the dedicated workflow explicitly.

## Review and refine the plan

When {% data variables.product.prodname_copilot_short %} presents a **Review Plan** card, read the full plan before starting implementation:

1. Select **Open Full Plan** to open the plan file in the Markdown editor.
1. Review the approach, affected code, and verification steps. You can edit the plan or add inline comments.
1. To request revisions, add an overall comment in the card's feedback area and select **Submit Feedback**. This sends your overall and inline comments to the agent without approving implementation.

The card offers **Open Full Plan** when the session provides a plan file. Other sessions can show **Plan summary** or **Open Plan** labels instead.

Check the plan against your intended outcome:

* **Scope:** it solves the requested problem and excludes unrelated changes.
* **Project fit:** it identifies affected files and reuses existing patterns.
* **Decisions:** assumptions, dependencies, and unresolved choices are explicit.
* **Verification:** the proposed tests and manual checks demonstrate that the change works without breaking existing behavior.

For example, submit this feedback:

```prompt
Keep the current response format unchanged and exclude UI changes.
Split the implementation into independently testable steps.
Add a compatibility check for requests that omit pagination parameters.
```

Review the updated plan and resolve open questions before choosing an implementation action. Pending feedback disables approval until you submit or clear it. The review controls save edits to the plan file before submitting approval or feedback.

## Implement or save the plan

After reviewing the plan, choose an action from the plan-review card. The available actions depend on the session:

| Action | What it does |
|--------|--------------|
| **Implement Plan** | Approves the plan and starts implementation in the current session. |
| **Approve Plan Only** | Approves the plan without executing it. |
| **Implement with Autopilot** | Continues autonomously using the selected approval level in the {% data variables.product.prodname_copilot_short %} session. |
| **Reject** | Declines the plan without starting implementation. |

To share the plan or keep it with your project, open the full plan and save a separate copy. To implement it in another session, start a session with the desired agent and attach the saved plan. This shares the plan rather than transferring the entire conversation.

> [!NOTE]
> Approving a plan and approving tool actions are separate decisions. Review the session's [permissions](/docs/agents/run/approvals.md#permission-levels) before starting implementation. In a {% data variables.product.prodname_copilot_short %} session, Autopilot controls how the agent continues working, while the selected approval level controls which actions need confirmation.

## Customize planning

Use a capable reasoning model for complex planning, then choose a lower-cost model that can reliably implement the reviewed, well-scoped plan. This can reduce AI credit usage, but compare total cost and quality because retries and rework can outweigh a cheaper model's savings.

In a {% data variables.product.prodname_copilot_short %} session, use the [language model picker](/docs/agent-customization/language-models.md#change-the-model-for-chat) to choose the planning model. To use a different model for a separate implementation request:

1. Choose **Approve Plan Only**, when offered, and wait for the planning request to finish.
1. Select the implementation model and switch from **Plan** to **Interactive** in the agent mode picker.
1. Ask the agent to implement the approved plan in the same conversation.

For model-selection guidance, see [Optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

For a repeatable planning workflow, define a [custom agent](/docs/agent-customization/custom-agents.md) with instructions such as architectural guidelines or required planning deliverables.

## Plan in a Local session

The **Local** session target provides a built-in Plan agent with different controls from {% data variables.product.prodname_copilot_short %} Plan mode. Select **Local** from the **Session Target** control, then select **Plan** from the agents dropdown or enter `/plan` followed by your task.

By default, this agent researches your project without editing project files. After it creates a plan, use these actions:

| Goal | Action |
|------|--------|
| Read the full plan | Run **Chat: Show Memory Files** from the Command Palette (`kb(workbench.action.showCommands)`) and select the session's `plan.md`. The plan is stored in [session memory](/docs/agents/run/memory.md#session-memory) at `/memories/session/plan.md`, not as a project file. |
| Implement in the current conversation | Select **Start Implementation**. This switches to Agent and submits the implementation request immediately. |
| Hand off to another destination | Open the dropdown next to **Start Implementation** and select an available **Continue in** destination. The dropdown appears only when supported destinations are available. Learn more about [session handoffs](/docs/agents/run/agent-harnesses.md#hand-off-a-session). |
| Save an editable copy | Select **Open in Editor**. This switches to Agent and asks it to create an untitled copy of the plan, which you can save in your project. Unlike **Open Full Plan**, it creates a copy rather than opening the existing plan file. |

> [!CAUTION]
> In a Local session, **Start with Autopilot** (Preview) starts implementation with automatic tool approval and continues autonomously. This includes approval for file edits, terminal commands, and external tool calls. Your organization can restrict this option.

### Local planning settings

These options apply to the built-in Plan agent in Local sessions, not to {% data variables.product.prodname_copilot_short %} Plan mode:

* **Choose default models.** Use `setting(chat.planAgent.defaultModel)` for planning. The experimental `setting(github.copilot.chat.implementAgent.model)` setting selects the model used by **Start Implementation** in the current conversation.

* **Add tools (Experimental).** Use `setting(github.copilot.chat.planAgent.additionalTools)` to add research tools. Additional tools can expand the agent's capabilities beyond its default read-only project access.

* **Let Agent switch to Plan (Experimental).** With `setting(github.copilot.chat.switchAgent.enabled)` enabled, Agent can choose to switch to Plan for research or complex tasks. The model decides when to switch. Use `/plan` when you want to start the dedicated workflow explicitly.

## Related resources

* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md)
* [Write effective prompts](/docs/agents/guides/prompt-engineering-guide.md)
