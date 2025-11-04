---
ContentId: 16c73175-a606-4aab-8ae5-a507
DateApproved: 10/09/2025
MetaDescription: Learn how to customize GitHub Copilot Chat with custom instructions, reusable prompt files, and custom chat modes to align AI responses with your coding practices and project requirements.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Customize chat to your workflow

You can customize chat in Visual Studio Code to match your coding practices and project requirements. Set up persistent configurations that automatically apply your preferred context, tools, and guidelines to every conversation. This saves time and ensures consistent responses without manually providing the same information in each chat request.

## Customization options

There are five main ways to customize chat in Visual Studio Code. These options work independently or you can combine them for more comprehensive customization.

### Custom instructions

[Custom instructions](/docs/copilot/customization/custom-instructions.md) let you define common guidelines or rules in a Markdown file for tasks like generating code, performing code reviews, or generating commit messages. With custom instruction, you describe _how_ a specific task should be performed. VS Code can automatically apply these instructions or you can choose to include them in specific chat requests.

Use custom instructions to:

- Specify coding practices, preferred technologies, or project requirements, so generated code follows your standards
- Provide guidelines about how a commit message or pull request title and description should be structured
- Set rules for code reviews, such as checking for security vulnerabilities, performance issues, or adherence to coding standards

### Prompt files

[Prompt files](/docs/copilot/customization/prompt-files.md) let you define reusable prompts for common and repeatable development tasks in a Markdown file. Prompt files are standalone prompts that you can run directly in chat. You can include task-specific context and guidelines about how the task should be performed. Combine prompt files with custom instructions to ensure consistent execution of complex tasks.

Use prompt files to:

- Create reusable prompts for common coding tasks, such as scaffolding a new component, API route, or generating tests
- Define prompts for performing code reviews, such as checking for code quality, security vulnerabilities, or performance issues
- Create step-by-step guides for complex processes or project-specific patterns
- Define prompts for generating implementation plans, architectural designs, or migration strategies

### Chat modes

[Chat modes](/docs/copilot/customization/custom-chat-modes.md) are a way to create a specialist assistant for specific roles or tasks, like a database administrator, front-end development, or planning. Within a chat mode Markdown file, you describe its scope and capabilities, which tools it can access, and a preferred language model.

Use chat modes to:

- Create a chat mode for planning, where the AI has read-only access to the codebase and can only generate implementation plans
- Define a research chat mode, where the AI can reach out to external resources to explore new technologies or gather information
- Create a front-end developer chat mode, where the AI can only generate and modify code related to front-end development

### Language models

[Language models](/docs/copilot/customization/language-models.md) let you choose from different AI models optimized for specific tasks. You can switch between models to get the best performance for code generation, reasoning, or specialized tasks like vision processing. Bring your own API key to access more models or have more control over model hosting.

Use different language models to:

- Use a fast model for quick code suggestions and simple refactoring tasks
- Switch to a more capable model for complex architectural decisions or detailed code reviews
- Bring your own API key to access experimental models or use locally hosted models

### MCP and tools

[MCP and tools](/docs/copilot/customization/mcp-servers.md) let you connect external services and specialized tools through Model Context Protocol (MCP). This extends chat capabilities beyond code to interact with databases, APIs, and other development tools.

Use MCP and tools to:

- Connect database tools to query and analyze data without leaving your development environment
- Integrate with external APIs to fetch real-time information or perform actions

## Usage scenarios

Different customization methods work best for different scenarios. The following table lists common use cases and the recommended approach:

| Use Case | Approach |
|----------|----------|
| Project-wide coding standards | [Custom instructions](/docs/copilot/customization/custom-instructions.md) |
| Language or framework-specific rules | [Custom instructions with glob patterns](/docs/copilot/customization/custom-instructions.md#instructions-file-format) |
| Reusable development tasks | [Prompt files](/docs/copilot/customization/prompt-files.md) |
| Use chat in plan or research mode | [Custom chat modes](/docs/copilot/customization/custom-chat-modes.md) |
| Define specialized workflows | [Custom chat modes](/docs/copilot/customization/custom-chat-modes.md) |
| Complex reasoning and analysis | [Language models](/docs/copilot/customization/language-models.md) |
| Bring your own model | [Language models](/docs/copilot/customization/language-models.md) |
| Integrate external services | [MCP and tools](/docs/copilot/customization/mcp-servers.md) |

## Getting started

You can implement chat customizations incrementally, starting with the simplest options and gradually adding more complexity as needed.

### 1. Try different language models

Start by experimenting with different **language models** to get better results for different types of work. Use the model picker in chat to switch between models - try faster models for simple tasks and more capable models for complex reasoning. This requires no setup and provides immediate results.

### 2. Set up basic guidelines

Create **custom instructions** for consistent results across all your chat interactions. Create a `.github/copilot-instructions.md` file with your coding standards and preferences. This automatically improves all chat responses without extra effort. Create different instructions files for different parts of your codebase using glob patterns to target specific languages or frameworks.

### 3. Add task automation

Once you identify repetitive tasks, create **prompt files** for common workflows like component generation, code reviews, or documentation tasks. These save time and ensure consistency across your team.

### 4. Extend capabilities

When you need to connect external services or perform specialized operations, add **MCP servers and tools** to extend chat beyond basic code assistance.

### 5. Create specialized workflows

For advanced usage, build **custom chat modes** that combine specific tools, instructions, and context for particular roles or project phases.

## Related resources

- [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
- [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
- [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
- [Choose language models](/docs/copilot/customization/language-models.md)
- [Use MCP servers and tools](/docs/copilot/customization/mcp-servers.md)
