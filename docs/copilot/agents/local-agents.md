---
ContentId: 3a6e8c1d-5f2b-4d9a-b7e1-9c4f2a8d6b3e
DateApproved: 02/04/2026
MetaDescription: Learn how to use local agents in VS Code for interactive coding tasks with full access to your workspace, tools, and models.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- local agent
- chat
- copilot
---

# Local agents in Visual Studio Code

Local agents run directly within VS Code on your machine. You interact with local agents through chat to get immediate results to your prompts. Local agents work on your workspace and have access to the full range of tools and models available in VS Code. By [creating custom agents](/docs/copilot/customization/custom-agents.md), you can let the agent assume a specific role or persona for a task, such as a code reviewer, tester, or documentation writer.

Local agents operate in the chat interface in VS Code. When you close a chat session, the local agent remains active and you can track it in the sessions view.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## Why use local agents?

* Interactive conversations that require immediate feedback, such as brainstorming, planning, or tasks that aren't yet fully defined
* Tasks that require context from your developer environment, such as linting errors, stack traces, unit test results
* Tasks that require access to specific tools from VS Code extensions or MCP servers or need to use specific models like BYOK models
* Tasks that don't require collaboration from other team members

## Key characteristics

* Runs within VS Code on your local machine and works on your current workspace
* Interactive chat-based interface for real-time feedback and iteration
* Full access to your workspace, files, and context
* Can access all agent tools configured in VS Code, such as built-in tools, MCP tools, and extension-provided tools
* Can use all models available to you in VS Code, including BYOK models and models from other providers

## Built-in agents

Local agent sessions use one of three built-in agents, each optimized for different types of tasks. You can switch between agents at any time during a chat session by selecting a different agent from the agent picker in the Chat view. For more specialized workflows, you can create your own [custom agents](/docs/copilot/customization/custom-agents.md).

### Agent

Agent is optimized for complex coding tasks based on high-level requirements that might require running terminal commands and tools. The AI operates autonomously, determining the relevant context and files to edit, planning the work needed, and iterating to resolve problems as they arise.

VS Code directly applies code changes in the editor, and the editor overlay controls enable you to navigate between the suggested edits and review them. The agent might invoke multiple [tools](/docs/copilot/agents/agent-tools.md) to accomplish different tasks.

You can [customize chat with extra tools](/docs/copilot/agents/agent-tools.md) by adding MCP servers or installing extensions that contribute tools.

Open chat with Agent: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

> [!IMPORTANT]
> If you don't see the agent option, make sure agents are enabled in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also disable agents. Contact your admin to enable this functionality.

### Plan

The plan agent is optimized for creating a structured implementation plan for a coding task. Use the plan agent when you want to break down a complex feature or change into smaller, manageable steps before implementation.

The plan agent generates a detailed plan outlining the steps needed and asks clarifying questions to ensure a comprehensive understanding of the task. You can then hand off the plan to an implementation agent or use it as a guide.

Open chat with Plan: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=plan) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=plan)

Learn more about [planning with agents](/docs/copilot/agents/planning.md).

### Ask

The Ask feature works best for answering questions about your codebase, coding, and general technology concepts. Use Ask when you want to understand how something works, explore ideas, or get help with coding tasks.

Ask uses agentic capabilities to research your codebase and gather relevant context. Responses can contain code blocks that you apply individually to your codebase. To apply a code block, hover over the code block and select the **Apply in Editor** button.

Open chat by using Ask: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

## Get started

> [!TIP]
> For a hands-on tutorial that demonstrates working with different agent types including background and cloud agents, see the [agents tutorial](/docs/copilot/agents/agents-tutorial.md).

To start a local agent session:

1. Select **Agent** from the agent picker in the Chat view.

1. Type a high-level prompt in the chat input field. For example, you might ask:

    ```prompt-agent
    Implement a user authentication system with OAuth2 and JWT.
    ```

    or

    ```prompt-agent
    Set up a CI/CD pipeline for this project.
    ```

1. Use the tools picker to [enable tools](/docs/copilot/agents/agent-tools.md) and give the agent more capabilities.

1. Select **Send** or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. Review and confirm code changes and tool invocations as the agent works through your request.

    You can send follow-up prompts while the agent is working. Queue messages for later, steer the agent in a new direction, or stop and send immediately. Learn more about [sending messages while a request is running](/docs/copilot/chat/chat-sessions.md#send-messages-while-a-request-is-running).

    > [!TIP]
    > VS Code helps you protect against inadvertent edits to sensitive files, such as workspace configuration settings or environment settings. Learn more about [editing sensitive files](/docs/copilot/chat/review-code-edits.md#edit-sensitive-files).

To start with Ask:

1. Type your prompt in the chat input field. For example, you might ask:

    ```prompt-ask
    Provide 3 ways to implement a search feature in React.
    ```

    or

    ```prompt-ask
    Where is the db connection configured in this project? #codebase
    ```

1. Select **Ask** from the agent picker in the Chat view.

1. Optionally, [add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to get more accurate responses.

1. Select **Send** or press `kb(workbench.action.chat.submit)` to submit your prompt.

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Overview of agent types and session management.
* [Agents tutorial](/docs/copilot/agents/agents-tutorial.md): Hands-on tutorial for working with different agent types.
* [Tools](/docs/copilot/agents/agent-tools.md): Extend agents with built-in, MCP, and extension tools.
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions.
* [Chat](/docs/copilot/chat/copilot-chat.md): Learn about the chat interface and interaction features.
