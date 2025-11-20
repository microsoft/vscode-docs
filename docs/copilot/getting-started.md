---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 11/12/2025
MetaDescription: Build your first web application with GitHub Copilot in VS Code. Learn inline suggestions, agents, inline chat, smart actions, and how to personalize your AI coding experience.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Get started with GitHub Copilot in VS Code

GitHub Copilot transforms how you write code in Visual Studio Code. In this hands-on tutorial, you build a complete task management web application while discovering VS Code's AI capabilities: intelligent inline suggestions, autonomous feature development with agents, precise editing with inline chat, integrated smart actions, and powerful customization options.

By the end of this tutorial, you'll have both a working web application and a personalized AI coding setup that adapts to your development style.

## Prerequisites

* VS Code installed on your machine. Download it from the [Visual Studio Code website](https://code.visualstudio.com/).

* Access to GitHub Copilot. Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md).

    > [!TIP]
    > If you don't have a Copilot subscription, you can sign up to use Copilot for free directly from within VS Code and get a monthly limit of inline suggestions and chat interactions.

## Step 1: Experience inline suggestions

AI-powered inline suggestions appear as you type, helping you write code faster and with fewer errors. Let's start building the foundation of your task manager.

1. Create a new folder for your project and open it in VS Code.

1. Create a new file called `index.html`.

1. Start typing the following and, as you type, VS Code provides inline suggestions (_ghost text_):

    ```html
    <!DOCTYPE html>
    ```

    ![Screenshot showing Copilot suggesting HTML structure inline suggestion.](./images/getting-started/html-completion.png)

    You might see different suggestions because large language models are nondeterministic.

1. Press `kbstyle(Tab)` to accept the suggestion.

    Congratulations! You've just accepted your first AI-powered inline suggestion.

1. Continue building your HTML structure. Inside the `<body>` tag, start typing:

    ```html
    <div class="container">
        <h1>My Task Manager</h1>
        <form id="task-form">
    ```

    Notice how VS Code continues suggesting relevant HTML elements as you build your application structure.

1. If you see multiple suggestions, hover over the ghost text to see navigation controls, or use `kb(editor.action.inlineSuggest.showNext)` and `kb(editor.action.inlineSuggest.showPrevious)` to cycle through options.

    ![Screenshot showing inline suggestion navigation controls.](./images/getting-started/inline-suggestion-navigation.png)

Inline suggestions work automatically as you type, learning from your patterns and the context of your project. They're particularly helpful for writing boilerplate code, HTML structures, and repetitive patterns.

## Step 2: Build complete features with agents

Agents are VS Code's most powerful AI capability. Given a natural language prompt, they autonomously plan and implement complex features across multiple files. Let's use them to create the core functionality of your task manager.

1. Open the Chat view by pressing `kb(workbench.action.chat.open)` or by selecting the chat icon in the VS Code title bar.

    The Chat view enables you to have an ongoing conversation with the AI, making it easier to refine your requests and get better results.

1. In the agent picker at the top of the Chat view, select **Agent** to switch to an autonomous coding mode.

    ![Screenshot showing the agent picker in the Chat view.](./images/getting-started/agent-mode-selection.png)

1. Enter the following prompt and press `kbstyle(Enter)`. The agent will analyze your request and begin implementing the solution:

    ```text
    Create a complete task manager web application with the ability to add, delete, and mark tasks as completed. Include modern CSS styling and make it responsive. Use semantic HTML and ensure it's accessible. Separate markup, styles, and scripts into their own files.
    ```

    Watch as the agent generates the necessary files and code to implement your request. You should see it update the `index.html` file, create a `styles.css` file for styling, and a `script.js` file for functionality.

    > [!TIP]
    > Different language models might have different strengths. Use the model dropdown in the Chat view to switch between language models.

1. Review the generated files and select **Keep** to accept all the changes.

1. Open your `index.html` file in a browser to see your task manager in action. You can add tasks, mark them as complete, and delete them.

    > [!TIP]
    > Use the [Live Preview extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) to see your changes in VS Code, in real-time as you develop.

1. Let's add an extra feature. Enter the following prompt in the chat input box:

    ```text
    Add a filter system with buttons to show all tasks, only completed tasks, or only pending tasks. Update the styling to match the existing design.
    ```

    Notice how the agent coordinates changes across multiple files to implement this feature completely.

Agents excel at understanding high-level requirements and translating them into working code. They're perfect for implementing new features, refactoring large sections of code, or building entire applications from scratch.

## Step 3: Make precise adjustments with inline chat

While agents handle large features, editor inline chat is perfect for targeted improvements to specific code sections within a file. Let's use it to enhance the task manager app.

1. Open your JavaScript file and locate the code that adds new tasks.

1. Select the code block and then press `kb(inlinechat.start)` to open editor inline chat.

    ![Screenshot showing inline chat starting for selected code block.](./images/getting-started/inline-chat-start.png)

    > [!NOTE]
    > The exact code might vary because large language models are nondeterministic.

1. Enter the following prompt:

    ```text
    Add input validation to prevent adding empty tasks and trim whitespace from task text.
    ```

    Notice how inline chat focuses specifically on the selected code and makes targeted improvements.

    ![Screenshot showing inline chat adding validation to selected function.](./images/getting-started/inline-chat-validation.png)

1. Review the changes and select **Accept** to apply them.

Editor inline chat is ideal for making small, focused changes without affecting the broader codebase, like adding error handling, refactoring individual functions, or fixing bugs.

## Step 4: Personalize your AI experience

Customizing chat makes it work better for your specific needs and coding style. You can set up custom instructions and build specialized custom agents. Let's create a complete personalization setup for your project.

### Create custom instructions

Custom instructions tell the AI about your coding preferences and standards. These apply automatically to all chat interactions.

1. Create a new folder called `.github` in your project root.

1. Inside the `.github` folder, create a file called `copilot-instructions.md`.

1. Add the following content:

    ```markdown
    # Project general coding guidelines

    ## Code Style
    - Use semantic HTML5 elements (header, main, section, article, etc.)
    - Prefer modern JavaScript (ES6+) features like const/let, arrow functions, and template literals

    ## Naming Conventions
    - Use PascalCase for component names, interfaces, and type aliases
    - Use camelCase for variables, functions, and methods
    - Prefix private class members with underscore (_)
    - Use ALL_CAPS for constants

    ## Code Quality
    - Use meaningful variable and function names that clearly describe their purpose
    - Include helpful comments for complex logic
    - Add error handling for user inputs and API calls
    ```

1. Save the file. These instructions now apply to all your chat interactions in this project.

1. Test the custom instructions by asking the agent to add a new feature:

    ```text
    Add a dark mode toggle button to the task manager.
    ```

    Notice how the generated code follows the guidelines you specified. VS Code supports more advanced custom instructions like applying instructions for specific file types.

### Create a custom agent for code reviews

Custom agents create specialized AI personas for specific tasks. Let's create a "Code Reviewer" agent that focuses on analysis and providing feedback on code. In the custom agent definition, you can define the AI's role, specific guidelines, and which tools it can use.

1. Open the Command Palette and run the **Chat: New Custom Agent** command.

1. Select `.github/agents` as the location.

    This option adds the custom agent to your workspace, enabling other team members to use it when they open the project.

1. Name the custom agent "Code Reviewer". This creates a new file called `Code Reviewer.md` in the `.github/agents` folder.

1. Replace the file contents with the following content. Note that this custom agent doesn't allow code changes.

    ```markdown
    ---
    description: 'Review code for quality and adherence to best practices.'
    tools: ['usages', 'vscodeAPI', 'problems', 'fetch', 'githubRepo', 'search']
    ---
    # Code Reviewer agent

    You are an experienced senior developer conducting a thorough code review. Your role is to review the code for quality, best practices, and adherence to [project standards](../copilot-instructions.md) without making direct code changes.

    When reviewing code, structure your feedback with clear headings and specific examples from the code being reviewed.

    ## Analysis Focus
    - Analyze code quality, structure, and best practices
    - Identify potential bugs, security issues, or performance problems
    - Evaluate accessibility and user experience considerations

    ## Important Guidelines
    - Ask clarifying questions about design decisions when appropriate
    - Focus on explaining what should be changed and why
    - DO NOT write or suggest specific code changes directly
    ```

1. Save the file. In the Chat view, you can now select this custom agent from the agent picker.

    ![Screenshot showing the Code Reviewer custom agent in the agent picker.](./images/getting-started/custom-mode-dropdown.png)

1. Test your custom agent:

   * Select **Code Reviewer** from the agent picker
   * Enter the following prompt: "Review my full project"

   Notice how the AI now behaves as a code reviewer, providing analysis and suggestions without writing code directly.

    ![Screenshot showing custom reviewer agent analyzing code.](./images/getting-started/custom-reviewer-mode.png)

## Step 5: Use smart actions for pre-built AI assistance

Smart actions provide AI functionality directly integrated within VS Code's interface, seamlessly plugging into your development workflow. Unlike chat interactions, smart actions appear contextually where you need them most. Let's explore commit message generation as an example.

1. Open the **Source Control** view by pressing `kb(workbench.view.scm)` or selecting the Source Control icon in the Activity Bar.

1. If you haven't yet initialized a Git repository for your project, do so by selecting **Initialize Repository** in the Source Control view.

1. Stage your changes by selecting the **+** button next to the files you want to commit.

1. Select the **sparkle icon** to generate a commit message based on your staged changes.

    The AI analyzes your staged changes and generates a descriptive commit message that follows conventional commit standards. The AI considers:

    * What files were changed
    * The nature of the changes (added features, bug fixes, refactoring)
    * The scope and impact of modifications

    ![Screenshot showing generated commit message in Source Control view.](./images/getting-started/generated-commit-message.png)

1. Review the generated message. If you're satisfied with it, proceed with your commit. If you want a different style or focus, select the sparkle icon again to generate an alternative message.

Smart actions like commit message generation demonstrate how AI integrates naturally into your existing workflow without requiring you to context-switch to chat interfaces. VS Code has many other smart actions to help you with debugging, testing, and more.

## Next steps

Congratulations! You've built a complete task management application and learned how to work effectively with AI across VS Code's core capabilities.

You can further enhance your AI's capabilities by exploring other customization options:

* Add more specialized agents for different tasks like planning, debugging, or documentation.
* Create custom instructions for specific programming languages or frameworks.
* Extend the AI's capabilities with extra tools from MCP (Model Context Protocol) servers or VS Code extensions.

## Related resources

* [GitHub Copilot in VS Code cheat sheet](/docs/copilot/reference/copilot-vscode-features.md) - Quick reference for all GitHub Copilot features in VS Code
* [Chat documentation](/docs/copilot/chat/copilot-chat.md) - Deep dive into autonomous coding in VS Code
* [Customization guide](/docs/copilot/customization/overview.md) - Advanced personalization techniques
* [MCP tools](/docs/copilot/customization/mcp-servers.md) - Extend agents with external APIs and services
