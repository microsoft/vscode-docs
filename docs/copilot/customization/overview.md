---
ContentId: 16c73175-a606-4aab-8ae5-a507
DateApproved: 01/08/2026
MetaDescription: Learn how to customize chat in VS Code with custom instructions, reusable prompt files, and custom agents to align AI responses with your coding practices and project requirements.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- customization
- chat
- instructions
- rules
- slash commands
- prompt files
- custom agents
- agent skills
- mcp
---
# Customize AI in Visual Studio Code

AI models have broad general knowledge but don't know your codebase or team practices. Customization bridges this gap, tailoring responses to your coding standards, project structure, and workflows.

This article covers the customization options in VS Code: custom instructions, prompt files, custom agents, agent skills, MCP servers, and language models.

## Quick reference

| Option | Loading | Best For |
|--------|---------|----------|
| [Always-on instructions](#custom-instructions) | Every session | Codebase guardrails |
| [File-based instructions](#custom-instructions) | Pattern match / description match | Area-specific rules |
| [Prompts](#prompt-files) | User invokes | One-shot workflows |
| [Skills](#agent-skills) | Description match, on-demand | Reusable capabilities |
| [Custom agents](#custom-agents) | Top-level OR as subagent | Constrained workflows |
| [MCP](#mcp-and-tools) | Session start | External gateways |

## Custom instructions

[Custom instructions](/docs/copilot/customization/custom-instructions.md) enable you to define common guidelines and rules that automatically influence how AI generates code and handles other development tasks. Instead of manually including context in every chat prompt, specify custom instructions in a Markdown file to ensure consistent AI responses that align with your coding practices and project requirements.

VS Code supports two type of custom instructions:

- **Always-on instructions**: automatically applied to every chat session.
- **File-based instructions**: applied based on file path patterns or based on the instruction description

Use custom instructions to:

- Document _how_ to work with your code, such as coding standards, preferred technologies, or project requirements
- Provide project-wide context that helps the AI understand the project's goal, architecture, and file structure
- Specify task-specific guidelines, such as how to write tests, documentation, or perform code reviews

## Agent Skills

[Agent Skills](/docs/copilot/customization/agent-skills.md) enable you to give the AI specialized capabilities and workflows through folders containing instructions, scripts, and resources. These skills are loaded on-demand based on the task at hand. Agent Skills is an [open standard](https://agentskills.io) that works across multiple AI agents, including VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.

Use Agent Skills to:

- Create reusable capabilities that work across different GitHub Copilot tools
- Define specialized workflows for testing, debugging, or deployment processes
- Share capabilities with the AI community using the open standard
- Include scripts, examples, and other resources alongside instructions

## Prompt files

[Prompt files](/docs/copilot/customization/prompt-files.md), also known as slash commands, let you simplify prompting for common tasks by encoding them as standalone Markdown files that you can invoke directly in chat. Each prompt file includes task-specific context and guidelines about how the task should be performed.

Use prompt files to:

- Simplify prompting for common tasks, such as scaffolding a new component, running and fixing tests, or preparing a pull request
- Override default behavior of a custom agent, such as creating a minimal implementation plan, or generating mockups for API calls

## Custom agents

[Custom agents](/docs/copilot/customization/custom-agents.md) enable you to let the AI assume different personas for specific roles or tasks, like a database administration, front-end development, or planning. A custom agent is described in a Markdown file that defines its behavior, capabilities, tools, and language model preferences.

Use custom agents to:

- Create specialist custom agents that focus on a specific task or role, giving them only the relevant context and tools
- Create modular workflows by orchestrating multiple specialized agents, where each agent handles a specific part of the process
- Help optimize context usage for complex tasks by running custom agents as [subagents](/docs/copilot/agents/subagents.md)

## MCP and tools

[MCP and tools](/docs/copilot/customization/mcp-servers.md) provide a gateway to external services and specialized tools through Model Context Protocol (MCP). This extends the agent's capabilities beyond code and the terminal, and enable it to interact with databases, APIs, and other development tools. MCP Apps let you define rich user experiences, like dashboards or forms, to facilitate complex interactions.

Use MCP and tools to:

- Connect database tools to query and analyze data without leaving your development environment
- Integrate with external APIs to fetch real-time information or perform actions

## Language models

[Language models](/docs/copilot/customization/language-models.md) let you choose from different AI models optimized for specific tasks. You can switch between models to get the best performance for code generation, reasoning, or specialized tasks like vision processing. Bring your own API key to access more models or have more control over model hosting.

Use different language models to:

- Use a fast model for quick code suggestions and simple refactoring tasks
- Switch to a more capable model for complex architectural decisions or detailed code reviews
- Bring your own API key to access experimental models or use locally hosted models

## Getting started

Implement AI customizations incrementally and start with the simplest options and gradually add more complexity as needed.

### 1. Try different language models

Start by experimenting with different language models to get better results for different types of work. Use the model picker in chat to switch between models - try faster models for simple tasks and more capable models for complex reasoning. This requires no extra setup and provides immediate results.

### 2. Set up basic guidelines

Create always-on `.github/copilot-instructions.md` custom instructions to establish common coding standards and provide project context. Keep it concise and focused on high-level guidelines to start.

Gradually expand with file-based `*.instructions.md` custom instructions to assert more targeted rules for specific parts of your codebase or technologies.

### 3. Add task automation

Once you identify repetitive tasks, create prompt files for common workflows like component generation, code reviews, or documentation tasks. These save time and can help ensure consistency across your team.

### 4. Extend capabilities

When you need to connect external services or perform specialized operations, add MCP servers and tools to extend chat beyond basic code assistance and pull in organizational data or third-party APIs, like querying issue trackers or databases.

### 5. Create specialized workflows

For advanced usage, build custom agents that combine specific tools, instructions, and context for particular roles or project phases.

Identify reusable capabilities and workflows and package them as Agent Skills, which can be loaded on-demand as needed. This expands agents with extra functionality, while minimizing the impact on context usage.

## Related resources

- [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
- [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
- [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
- [Create custom agents](/docs/copilot/customization/custom-agents.md)
- [Choose language models](/docs/copilot/customization/language-models.md)
- [Use MCP servers and tools](/docs/copilot/customization/mcp-servers.md)
