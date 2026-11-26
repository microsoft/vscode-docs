---
ContentId: f8820661-7772-47e6-b63e-ac59f6752d9c
DateApproved: 11/26/2026
MetaDescription: Set up a context engineering workflow in {% data variables.product.prodname_vscode_shortname %} with custom instructions, Agent Skills, and custom agents.
---
# Set up a context engineering flow in {% data variables.product.prodname_vscode_shortname %}

This guide shows you how to set up a context engineering workflow in {% data variables.product.prodname_vscode_shortname %} using custom instructions, [Agent Skills](/docs/agent-customization/agent-skills.md), and [custom agents](/docs/agent-customization/custom-agents.md) with the {% data variables.product.prodname_copilot_short %} harness.

Context engineering is a systematic approach to providing AI agents with targeted project information to improve the quality and accuracy of generated code. By curating essential project context through custom instructions, reusable planning skills, and role-specific agents, you enable AI to make better decisions and maintain persistent knowledge across interactions.

> [!TIP]
> {% data variables.product.prodname_vscode_shortname %} provides a [built-in Plan agent](/docs/agents/run/planning.md) (`/plan`) to create detailed implementation plans before starting complex coding tasks. If you don't need a custom planning template or team-specific workflow, start with `/plan` instead.

## Prerequisites

Use your own repository for this workflow. Before you start:

* Open the repository root as a folder or workspace in {% data variables.product.prodname_vscode_shortname %}. The workflow stores shared customization files under `.github`.
* Use a [{% data variables.product.prodname_copilot_short %} harness session](/docs/agents/run/agent-harnesses.md#copilot) in either the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).
* Set up the repository's development environment, including its dependencies and test commands, before you ask the agent to implement a plan.

If you use another harness, check [reusing customizations across harnesses](/docs/agent-customization/overview.md#reuse-customizations-across-harnesses) for supported file locations and fields.

## Context engineering workflow

The high-level workflow for context engineering in {% data variables.product.prodname_vscode_shortname %} consists of three stages:

1. Curate project-wide context: use custom instructions to give every request concise architectural and contributor guidelines.
1. Generate an implementation plan: combine a read-only planning custom agent with a reusable planning skill and template to produce a structured plan file.
1. Generate implementation code: switch to an implementation custom agent in a fresh chat or nested session to build and test against the approved plan.

As you work through the steps, you can iterate and refine the output with follow-up prompts in the chat.

The following diagram illustrates a context engineering workflow in {% data variables.product.prodname_vscode_shortname %}:

![Diagram that shows the context engineering workflow in {% data variables.product.prodname_vscode_shortname %} consisting of three main steps.](../images/context-engineering-guide/context-engineering-workflow.png)

<!--
```mermaid
flowchart TD
    %% Nodes
    C1(["Project description"]) --&gt; curate[Curate project context]
    C2(["Architecture"]) --&gt; curate
    C3(["Other"]) --&gt; curate
    task(["Task context"]) --&gt; plan["Generate plan"]
    curate --&gt; plan
    plan --&gt; P(["&lt;feature&gt;-plan.md"])
    T([Plan template]) --&gt; P(["&lt;feature&gt;-plan.md"])
    P --&gt; implement["Generate code"]
    implement --&gt; code(["&lt;code&gt;"])
    C4([Coding guidelines]) --&gt; code

    %% Styles
    classDef input fill:#f5f5f5,stroke:#616161,stroke-width:2px;
    classDef process fill:#fff3e0,stroke:#fb8c00,stroke-width:2px;
    classDef output fill:#e8f5e9,stroke:#43a047,stroke-width:2px;

    class C1,C2,C3,C4,T, input;
    class curate,plan,implement process;
    class P,code output;
```
-->

## Step 1: Curate project-wide context

Start with concise project instructions that address a repeated problem, such as using the wrong test command or missing an architectural constraint. Reuse existing project documentation for supporting detail instead of copying it all into the instructions file.

**Why this helps:** The agent could find this information in the codebase, but it might be buried in comments or scattered across multiple files. By providing a concise summary of the most important information, you help the agent to always have critical context available for decision-making.

1. Identify existing documentation relevant to the problem, such as `ARCHITECTURE.md` or `CONTRIBUTING.md`. Create a supporting document only when the necessary information is missing.

    > [!TIP]
    > If relevant documentation is missing, use AI to draft it, then review the result for accuracy. Choose only the document your task needs:
    > * `Generate an ARCHITECTURE.md (max 2 page) file that describes the overall architecture of the project.`
    > * `Generate a PRODUCT.md (max 2 page) file that describes the product functionality of the project.`
    > * `Generate a CONTRIBUTING.md (max 1 page) file that describes developer guidelines and best practices for contributing to the project.`

1. Create a workspace instructions file (`.github/copilot-instructions.md` or `AGENTS.md`) from the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor): run **Chat: Open Customizations**, select **Instructions**, and select **New Instruction** (`+`) next to **Workspace**. Alternatively, create `.github/copilot-instructions.md` directly at the root of your repository. See [Create project instructions](/docs/agent-customization/custom-instructions.md#get-started-with-project-instructions).

1. Put essential rules directly in the instructions file and link to supporting documentation for detail. Adapt the following example to documents that exist in your repository.

    The following example `.github/copilot-instructions.md` file provides a starting point:

    ```markdown
    # [Project Name] Guidelines

    * [Product Vision and Goals](../PRODUCT.md): Understand the high-level vision and objectives of the product to ensure alignment with business goals.
    * [System Architecture and Design Principles](../ARCHITECTURE.md): Overall system architecture, design patterns, and design principles that guide the development process.
    * [Contributing Guidelines](../CONTRIBUTING.md): Overview of the project's contributing guidelines and collaboration practices.

    Suggest to update these documents if you find any incomplete or conflicting information during your work.
    ```

> [!TIP]
> Start small, keeping the initial project-wide context concise and focused on the most critical information. If uncertain, focus on high-level architecture and only add new rules to address errors or incorrect behavior the agent makes repeatedly (for example, using the wrong shell command or ignoring certain files).

Markdown links don't automatically load linked files into the model's context. For a task that needs a supporting document, attach it or ask the agent to read it, then [verify inclusion and behavior](/docs/agent-customization/custom-instructions.md#verify-your-instructions).

## Step 2: Create an implementation plan

Once you have project-specific context in place, combine a read-only planning [custom agent](/docs/agent-customization/custom-agents.md) with a reusable planning [Agent Skill](/docs/agent-customization/agent-skills.md) to generate structured implementation plans. Generating an implementation plan is an iterative process that might require multiple rounds of refinement to ensure it's complete and accurate.

> [!TIP]
> Treat custom agents and skills as living documents. Refine them over time based on any mistakes or gaps you observe in the agent's behavior.

1. Create a planning [Agent Skill](/docs/agent-customization/agent-skills.md#create-a-skill) named `plan-qna` using the Agent Customizations editor (**Chat: Open Customizations** > **Skills** > **New Skill** next to **Workspace**). This creates `.github/skills/plan-qna/SKILL.md`.

    Add a `plan-template.md` file inside `.github/skills/plan-qna/` to define a consistent plan structure:

    ```markdown
    ---
    title: [Short descriptive title of the feature]
    version: [optional version number]
    date_created: [YYYY-MM-DD]
    last_updated: [YYYY-MM-DD]
    ---
    # Implementation Plan: <feature>
    [Brief description of the requirements and goals of the feature]

    ## Architecture and design
    Describe the high-level architecture and design considerations.

    ## Tasks
    Break down the implementation into smaller, manageable tasks using a Markdown checklist format.

    ## Open questions
    Outline 1 to 3 open questions or uncertainties that need to be clarified.
    ```

    Then define `.github/skills/plan-qna/SKILL.md` so it asks clarifying questions before filling out the template:

    ```markdown
    ---
    name: plan-qna
    description: Clarify requirements with 3 focused questions and draft a structured implementation plan using the project template. Use when planning a new feature or complex change.
    ---
    # Clarifying Implementation Plan

    1. Briefly analyze the feature request and inspect relevant files in the codebase.
    1. Ask 3 focused questions to clarify ambiguous requirements, constraints, or edge cases. Wait for answers before writing the plan.
    1. Draft a detailed implementation plan following [plan-template.md](./plan-template.md) and pause for review before implementation begins.
    ```

1. Create a read-only planning [custom agent](/docs/agent-customization/custom-agents.md) using the Agent Customizations editor (**Chat: Open Customizations** > **Agents** > **New Agent** next to **Workspace**), saving it as `.github/agents/plan.agent.md`.

    Restricting `tools` to `['read', 'search', 'web']` keeps the planning agent focused on research and design without modifying code:

    ```markdown
    ---
    name: Plan
    description: 'Architect and planner to create detailed implementation plans without editing code.'
    tools: ['read', 'search', 'web']
    ---
    # Planning Agent

    You are an architect focused on creating detailed and comprehensive implementation plans for new features and bug fixes. Break down complex requirements into clear, actionable tasks that developers can review and execute.

    ## Workflow

    1. Analyze and understand: Gather context from the codebase, provided documentation, and relevant web sources to understand the requirements and constraints.
    1. Structure the plan: Follow the repository's planning skill and template when drafting the plan.
    1. Pause for review: Iterate on the plan based on user feedback until the requirements and tasks are clear.
    ```

1. Select the **Plan** custom agent in the agent picker and invoke your planning skill with `/plan-qna`. For example:

    ```prompt
    /plan-qna Add a customer details page for displaying and editing customer information.
    ```

    You can also paste a GitHub issue URL as context. Answer the clarifying questions, review the generated plan, and refine any missing requirements before approving it.

## Step 3: Generate implementation code

After refining and approving the implementation plan, transition to implementation with a fresh context so planning discussion doesn't crowd out code generation.

1. For smaller tasks, switch from **Plan** to **Agent** in the same chat and prompt it to implement the approved plan.

    For larger or complex features, switch to **Agent** and ask it to save the plan to a file (for example, `<my-feature>-plan.md`), then open a [new chat or nested session](/docs/agents/run/sessions/manage-sessions.md#start-a-new-or-related-conversation) to start implementation with a clean context window.

1. For a reusable test-driven implementation workflow, create a [custom agent](/docs/agent-customization/custom-agents.md) named `TDD` via the Agent Customizations editor (**Chat: Open Customizations** > **Agents** > **New Agent** next to **Workspace**), saving it as `.github/agents/tdd.agent.md`:

    ```markdown
    ---
    name: TDD
    description: 'Execute a detailed implementation plan as a test-driven developer.'
    tools: ['read', 'edit', 'search', 'execute']
    ---
    # TDD Implementation Agent
    Expert TDD developer generating high-quality, fully tested, maintainable code for the given implementation plan.

    ## Test-driven development
    1. Write or update tests first to encode acceptance criteria and expected behavior
    2. Implement minimal code to satisfy test requirements
    3. Run targeted tests immediately after each change
    4. Run full test suite to catch regressions before moving to next task
    5. Refactor while keeping all tests green

    ## Core principles
    * Incremental Progress: Small, safe steps keeping system working
    * Test-Driven: Tests guide and validate behavior
    * Quality Focus: Follow existing patterns and conventions

    ## Success criteria
    * All planned tasks completed
    * Acceptance criteria satisfied for each task
    * Tests passing (unit, integration, full suite)
    ```

1. In your fresh chat or nested session, select the **TDD** custom agent and reference the saved implementation plan file:

    ```prompt
    Implement #<my-feature>-plan.md following TDD principles and report all test results.
    ```

> [!TIP]
> Get a fresh pair of agent eyes: open a new chat (`kb(workbench.action.chat.newChat)`) or nested session and ask the agent to review the code changes against `#<my-feature>-plan.md` to catch missed requirements or inconsistencies.

## Best practices and common patterns

Following these best practices helps you establish a sustainable and effective context engineering workflow.

### Context management principles

**Start small and iterate**: Begin with minimal project context and gradually add detail based on observed AI behavior. Avoid context overload that can dilute focus.

**Keep context fresh**: Regularly audit and update your project documentation (using the agent) as the codebase evolves. Stale context leads to outdated or incorrect suggestions.

**Use progressive context building**: Start with high-level concepts and progressively add detail rather than overwhelming the AI with comprehensive information upfront.

**Maintain context isolation**: Keep different types of work (planning, coding, testing, debugging) in separate chat sessions to prevent context mixing and confusion.

**Be mindful of credit consumption**: More context files, larger instruction sets, and complex agent chains all increase token usage and [AI credit](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) consumption. Start with concise context and expand only when needed. For more tips, see [optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

### Documentation strategies

**Create living documents**: Treat your custom instructions, custom agents, and templates as evolving resources. Refine them based on observed AI mistakes or shortcomings.

**Focus on decision-making context**: Prioritize information that helps AI make better architectural and implementation decisions rather than exhaustive technical details.

**Use consistent patterns**: Establish and document coding conventions, naming patterns, and architectural decisions to help AI generate consistent code.

**Reference external knowledge**: Link to relevant external documentation, APIs, or standards that the AI should consider when generating code.

### Workflow optimization

**Clean transitions between stages**: Save approved implementation plans to Markdown files and start a fresh chat or [nested session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) when switching from planning to implementation or review.

**Implement feedback loops**: Continuously validate that AI understands your context correctly. Ask clarifying questions and course-correct early when misunderstandings occur.

**Use incremental complexity**: Build features incrementally, validating each step before adding complexity. This prevents compounding errors and maintains working code.

**Separate concerns**: Use different agents for different activities (planning versus implementation versus review) to maintain focused, relevant context.

**Version your context**: Use git to track changes to your context engineering setup, allowing you to revert problematic changes and understand what works best.

**Verify cache performance**: Use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to check prompt cache hit rates and token usage. Good cache performance means your context setup is structured in a way that the model provider can reuse previous request prefixes, reducing latency and token costs.

### Anti-patterns to avoid

**Context dumping**: Avoid providing excessive, unfocused information that doesn't directly help with decision-making.

**Inconsistent guidance**: Ensure all documentation aligns with your chosen architectural patterns and coding standards.

**Neglecting validation**: Don't assume AI correctly understands your context. Always test understanding before proceeding with complex implementations.

**One-size-fits-all**: Different team members or project phases may need different context configurations. Be flexible in your approach.

**Over-engineering agent chains**: Deeply nested subagent workflows and excessive tool calls multiply token usage and [credit consumption](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs). Keep agent chains as shallow as practical and limit tools to what each agent actually needs.

### Measuring success

A successful context engineering setup should result in:

* **Reduced back-and-forth**: Less need to correct or redirect AI responses
* **Consistent code quality**: Generated code follows established patterns and conventions
* **Faster implementation**: Less time spent explaining context and requirements
* **Better architectural decisions**: AI suggests solutions that align with project goals and constraints

### Scaling context engineering

**For teams**: Share context engineering setups through version control and establish team conventions for maintaining shared context.

**For large projects**: Consider creating context hierarchies with project-wide, module-specific, and feature-specific context layers using [instructions files](/docs/agent-customization/custom-instructions.md).

**For long-term projects**: Establish regular context review cycles to keep documentation current and remove outdated information.

**For multiple projects**: Create reusable templates and patterns that can be adopted across different codebases and domains.

By following these practices and continuously refining your approach, you'll develop a context engineering workflow that enhances AI-assisted development while maintaining code quality and project consistency.

## Related resources

Learn more about customizing AI in {% data variables.product.prodname_vscode_shortname %}:

* [Custom instructions](/docs/agent-customization/custom-instructions.md)
* [Agent Skills](/docs/agent-customization/agent-skills.md)
* [Custom agents](/docs/agent-customization/custom-agents.md)
