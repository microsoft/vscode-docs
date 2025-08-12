---
ContentId: 16c73175-a606-4aab-8ae5-a507fe8947eb
DateApproved: 08/07/2025
MetaDescription: Learn how to customize GitHub Copilot Chat with custom instructions, reusable prompt files, and custom chat modes to align AI responses with your coding practices and project requirements.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Customize AI responses in VS Code

Chat in Visual Studio Code can give you responses and generate code that matches your coding practices and project requirements, if you give it the right context. Instead of repeatedly adding this information in every chat prompt, you can store this context in files and automatically include it in every chat request.

There are three main ways to customize AI responses in Visual Studio Code:

* **[Custom instructions](/docs/copilot/customization/custom-instructions.md)**: Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should operate (_how_ a task should be done). VS Code can also help you [generate a custom instructions file for your workspace](/docs/copilot/customization/custom-instructions.md#generate-an-instructions-file-for-your-workspace) that matches your coding practices and project requirements.

    <details>
    <summary>Example scenarios</summary>

    * Specify coding practices, preferred technologies, or project requirements, so generated code follows your standards.
    * Set rules for code reviews, such as checking for security vulnerabilities or performance issues.
    * Provide instructions for generating commit messages or pull request titles and descriptions.

    </details>

* **[Prompt files](/docs/copilot/customization/prompt-files.md)**: Define reusable prompts for common tasks like generating code or performing a code review. Prompt files are standalone prompts that you can run directly in chat. They describe the task to be performed (_what_ should be done). Optionally, you can include task-specific guidelines about how the task should be performed, or you can reference custom instructions in the prompt file.

    <details>
    <summary>Example scenarios</summary>

    * Create reusable prompts for common coding tasks, such as scaffolding a new component, API route, or generating tests.
    * Define prompts for performing code reviews, such as checking for code quality, security vulnerabilities, or performance issues.
    * Create step-by-step guides for complex processes or project-specific patterns.
    * Define prompts for generating implementation plans, architectural designs, or migration strategies.

    </details>

* **[Custom chat modes](/docs/copilot/customization/custom-chat-modes.md)**: Define how chat operates, which tools it can use, and how it interacts with the codebase. Each chat prompt is run within the boundaries of the chat mode, without having to configure tools and instructions for every request.

    <details>
    <summary>Example scenarios</summary>

    * Create a chat mode for planning, where the AI has read-only access to the codebase and can only generate implementation plans.
    * Define a research chat mode, where the AI can reach out to external resources to explore new technologies or gather information.
    * Create a front-end developer chat mode, where the AI can only generate and modify code related to front-end development.

    </details>

## Choose the right customization approach

Different customization methods work best for different scenarios. Use this guide to choose the right approach:

| Use Case | Best Approach | Why |
|----------|---------------|-----|
| Project-wide coding standards | [Custom instructions](/docs/copilot/customization/custom-instructions.md) | Apply automatically to all chat requests |
| Language or framework-specific rules | [Custom instructions with glob patterns](/docs/copilot/customization/custom-instructions.md#instructions-file-structure) | Target specific file types |
| Reusable development tasks | [Prompt files](/docs/copilot/customization/prompt-files.md) | On-demand execution with consistent parameters |
| Specialized workflows | [Custom chat modes](/docs/copilot/customization/custom-chat-modes.md) | Combine tools, instructions, and context |
| Code review guidelines | [Custom instructions in settings](/docs/copilot/customization/custom-instructions.md#specify-custom-instructions-in-settings) | Apply to specific VS Code features |

## Quick start guide

Get started with customization in three steps:

### 1. Start with custom instructions

Create a `.github/copilot-instructions.md` file in your workspace root to define your basic coding standards:

```markdown
# Project coding standards

## Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use descriptive variable and function names

## Architecture
- Follow the existing folder structure
- Use dependency injection for services
- Write unit tests for all public functions
```

### 2. Add task-specific prompt files

Create reusable prompts for common tasks in `.github/prompts/`:

```markdown
---
description: 'Generate a new React component with TypeScript'
mode: 'agent'
---
Create a new React functional component with the following requirements:
- TypeScript interfaces for all props
- CSS modules for styling
- Basic error boundary handling
- JSDoc comments for all props
```

### 3. Create specialized chat modes

For advanced workflows, create custom chat modes that combine specific tools and instructions:

```markdown
---
description: 'Code review mode with security focus'
tools: ['codebase', 'search', 'usages']
---
You are performing a security-focused code review. Check for:
- Input validation issues
- Authentication and authorization problems
- Data exposure risks
- Dependency vulnerabilities
```

## Settings management

Enable customization features in your VS Code settings:

```json
{
  "chat.promptFiles": true,
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

For organizations, you can [centrally manage these settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) through device management policies.

## Related content

* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
