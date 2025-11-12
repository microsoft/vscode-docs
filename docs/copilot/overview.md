---
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
DateApproved: 11/12/2025
MetaDescription: Copilot is your AI pair programmer tool in Visual Studio Code. Get code suggestions as you type in the editor, or use natural language chat to ask about your code or start an editing session for implementing new feature and fixing bugs.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code

GitHub Copilot is an AI-powered coding assistant integrated into Visual Studio Code. It provides code suggestions, explanations, and automated implementations based on natural language prompts and existing code context. Copilot has been trained on public code repositories and can assist with most programming languages and frameworks.

<video src="images/overview/agent-mode-blog-video.mp4" title="Agent mode hero video" autoplay loop controls muted></video>

## Core capabilities

### Code completions

Copilot provides inline code suggestions as you type, ranging from single line completions to entire function implementations. With next edit suggestions, it predicts the next logical code change based on your current context.

<video src="images/inline-suggestions/nes-video.mp4" title="Copilot NES video" autoplay loop controls muted poster="./images/inline-suggestions/point3d.png"></video>

**Examples:**

- Type `function calculateTax(` to get a complete tax calculation implementation
- Write `// Create a REST API endpoint for user authentication` to generate Express.js route code
- Begin a React component with `const UserProfile = ({` to receive a complete functional component with TypeScript types

Learn more about [code completions in VS Code](/docs/copilot/ai-powered-suggestions.md).

### Autonomous coding

Agents can autonomously plan and execute complex development tasks, coordinating multi-step workflows that involve running terminal commands or invoking specialized tools. It can transform high-level requirements into working code.

Install Model Context Protocol (MCP) servers or tools from Marketplace extensions to further enhance the capabilities of the autonomous coding experience. For example, pull information from a database or connect to external APIs.

<video src="images/overview/agent-mode-short.mp4" title="Agent mode video" autoplay loop controls muted></video>

**Example tasks:**

- Implement authentication using OAuth
- Migrate the codebase to a new framework or language
- Debug failing tests and apply fixes
- Optimize performance across the application

Learn more about [autonomous coding with agents](/docs/copilot/chat/copilot-chat.md) and [configuring MCP servers in VS Code](/docs/copilot/customization/mcp-servers.md).

### Natural language chat

Use natural language to interact with your codebase through chat interfaces. Ask questions, request explanations, or specify code changes using conversational prompts.

Apply changes across multiple files in your project using single prompts. Copilot analyzes your project structure and makes coordinated modifications.

**Common queries:**

- "How does authentication work in this project?"
- "What's causing the memory leak in the data processing function?"
- "Add error handling to the payment processing service"
- "Add a login form and backend API"

![Screenshot of the Chat view, showing the response to asking how to add a login page to a web app.](images/overview/copilot-chat-view-add-page.png)

Learn more about [using chat in VS Code](/docs/copilot/chat/copilot-chat.md).

### Smart actions

VS Code has many predefined actions for common development tasks that are enhanced with AI capabilities and integrated into the editor.

From helping you write commit messages or pull requests descriptions, renaming code symbols, fixing errors in the editor, to semantic search that helps you find relevant files.

![Screenshot of the Smart Actions menu in VS Code](images/overview/copilot-chat-fix-test-failure.png)

Learn more about the [smart actions in VS Code](/docs/copilot/copilot-smart-actions.md).

## Getting started

### Step 1: Set up Copilot

1. Hover over the Copilot icon in the Status Bar and select **Set up Copilot**.

    ![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

1. Choose a sign-in method and follow the prompts. If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

### Step 2: Basic code completion

1. Create a new file and start typing. VS Code shows inline suggestions in _ghost text_ in the editor.

    For example, create a new JavaScript file and start typing a function definition:

    ```javascript
    // Try typing this in a new .js file:
    function factorial(
    ```

1. Accept the inline suggestions with the `kbstyle(Tab)` key.

### Step 3: Autonomous coding

To perform more complex tasks in an autonomous manner, use agents in the chat interface. The AI will iterate on the code until the task is complete.

1. Open the Chat view (`kb(workbench.action.chat.open)`)
1. Select **Agent** from the agent picker
1. Ask to generate a basic web app like: "Create a basic node.js web app for sharing recipes. Make it look modern and responsive."

Notice how the agent independently generates code across multiple files and installs dependencies as needed for the task.

### Step 4: Inline chat

To get help with generating, refactoring, or explaining code directly in the editor, you can use editor inline chat. Enter a prompt and the AI will suggest code changes in the current file, keeping you in the flow of coding.

1. Select some code in your editor
1. Press `kb(inlinechat.start)` to open editor inline chat
1. Ask to explain or make a modification like: "Refactor this code to ..."
1. Review and accept the suggested changes

## Usage scenarios

### Code analysis and review

Understanding existing codebases and identifying issues:

- "Explain the authentication flow in this application"
- "What are the potential security issues in this payment handler?"
- "Document this API endpoint with proper JSDoc comments"

### Debugging and troubleshooting

Identifying and resolving code issues:

- "Why is this component re-rendering unnecessarily?"
- "Find and fix the memory leak in this data processing pipeline"
- "Optimize this database query for better performance"

Learn more about using [AI for debugging](/docs/copilot/guides/debug-with-copilot.md).

### Feature implementation

Building new functionality:

- "Create a user registration system with email verification"
- "Add real-time notifications using WebSockets"
- "Implement a shopping cart with local storage persistence"

### Testing and quality assurance

Generating tests and ensuring code quality:

- "Generate comprehensive unit tests for this service class"
- "Create integration tests for the API endpoints"
- "Add property-based tests for this data validation function"

Learn more about using [AI for testing](/docs/copilot/guides/test-with-copilot.md).

### Learning and documentation

Understanding new technologies and patterns:

- "Show me the differences between async/await and Promises"
- "How would you implement this pattern in Go instead of Python?"
- "What are the best practices for error handling in React?"

## Customize the AI to your workflow

### Custom instructions

Use custom instructions to define project-specific coding conventions and patterns, and the AI will generate code that matches your style. Automatically apply these instructions to all chat requests or only for specific file types.

```markdown
---
applyTo: "**"
---
# My Coding Style
- Use arrow functions for components
- Prefer const over let
- Always include TypeScript types
- Use descriptive variable names
- Follow the Repository pattern for data access
```

Learn more about [using custom instructions](/docs/copilot/customization/custom-instructions.md) to tailor the AI to your coding style.

### Language models

Quickly switch between different AI models to optimize for speed, reasoning, or specialized tasks. Choose from various built-in models or connect to external providers and bring your own API keys.

![Screenshot that shows the model picker in the Chat view.](images/language-models/model-dropdown-change-model.png)

Learn more about using [language models in VS Code](/docs/copilot/customization/language-models.md).

### Custom agents

The chat experience in VS Code can use different agents to switch between asking questions, making edits, or running autonomous coding sessions. You can also create custom agents that fit your workflow. For example, create a custom agent that focuses on planning and architecture discussions. Specify which tools chat is allowed to use, and provide custom instructions to provide the right context in which it should operate.

![Screenshot showing the Chat view, highlighting the agent picker.](images/overview/chat-mode-dropdown.png)

Learn more about [creating your own custom agents](/docs/copilot/customization/custom-agents.md).

### Extend chat with tools

Extend the capabilities of the chat experience with specialized tools from MCP servers or Marketplace extensions. For example, add tools for querying databases, connecting to external APIs, or performing specialized tasks.

![MCP tools list](images/mcp-servers/agent-mode-select-tools.png)

Learn more about [using MCP servers and tools](/docs/copilot/customization/mcp-servers.md).

## Best Practices

- Choose the right tool for the task. Get code completions while you're coding, use chat for natural language queries, and pick the agent that fits your workflow.

- Write effective prompts to get the best results. Be specific, provide the right context, and iterate often.

- Customize the AI to your coding style and project conventions by using custom instructions, prompt files, or custom agents.
- Extend the AI's capabilities with tools from MCP servers or Marketplace extensions.

- Choose a language model that is optimized for your task. Use fast models for quick code suggestions, reasoning models for more complex requests.

Get more [tips and tricks for using AI in VS Code](/docs/copilot/copilot-tips-and-tricks.md).

## Support

Support for GitHub Copilot Chat is provided by GitHub and can be reached at <https://support.github.com>.

To learn more about Copilot's security, privacy, compliance, and transparency, see the [GitHub Copilot Trust Center FAQ](https://copilot.github.trust.page/faq).

## Pricing

You can start using GitHub Copilot for free with monthly limits on completions and chat interactions. For more extensive usage, you can choose from various paid plans.

[View detailed GitHub Copilot pricing](https://docs.github.com/en/copilot/get-started/plans)

## Next steps

- [Set up Copilot in VS Code](/docs/copilot/setup.md)
- [Get started with hands-on examples](/docs/copilot/getting-started.md)
- [Customize the AI for your workflow](/docs/copilot/customization/overview.md)
- [Learn about security considerations of using AI in VS Code](/docs/copilot/security.md)
