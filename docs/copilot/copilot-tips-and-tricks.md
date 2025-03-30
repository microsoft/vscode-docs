---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 02/06/2025
MetaDescription: Tips and tricks to optimize your development experience with GitHub Copilot in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Tips and tricks for Copilot in VS Code

This article provides tips and tricks to optimize your development experience for using GitHub Copilot in Visual Studio Code.

## Checklist for using Copilot in VS Code

Use the following checklist to get the most out of Copilot:

1. [Choose the right tool](#choose-the-right-copilot-tool). _Use the tool that's optimized for editing, asking questions, or staying in the flow of writing code._

1. [Personalize Copilot](#personalize-copilot-with-custom-instructions). _Use custom instructions to get code suggestions that match your style and coding practices._

1. [Write effective prompts](#prompt-engineering) and provide [context](#provide-the-right-context). _Get the most relevant responses._

1. [Index your workspace](#workspace-indexing). _Receive accurate responses to questions about your codebase._

1. [Choose your AI model](#choose-your-ai-model). _Choose between models for fast coding or planning/reasoning._

1. [Reuse prompts](#reusable-prompts). _Save time by saving and reusing task-specific prompts across your team._

## Choose the right Copilot tool

Depending on your task, you can choose between different Copilot tools.

| Tool | Use case |
|------|----------|
| [Code completions](/docs/copilot/ai-powered-suggestions.md) | Streamline coding while staying in the flow.<br/>Receive inline suggestions for code snippets, variable names, and functions as you write them in the editor. |
| [Chat](/docs/copilot/chat/copilot-chat.md) | Have an ongoing chat conversation for brainstorming design ideas or getting code suggestions, optionally calling on domain-specific chat participants.<br/>Choose to apply specific code suggestions to your codebase. |
| [Edits](/docs/copilot/chat/copilot-edits.md) | Use natural language to start a coding editing session.<br/>Automatically apply large code changes across multiple files in your workspace. |
| [Agent mode](/docs/copilot/chat/chat-agent-mode.md) | Implement high-level requirements by starting an agentic coding flow.<br/>Copilot autonomously invokes multiple tools to plan and implement the code changes and tasks that are needed. |

## Personalize Copilot with custom instructions

When Copilot generates code or answers questions, it tries to match your coding practices and preferences such as which libraries you use or how you name your variables. However, it might not always have enough context to do this effectively. For example, if you work with a specific framework version, you need to provide additional context in your prompts.

To enhance Copilot's responses, you can use _custom instructions_ to provide it with contextual details about your team's workflow, tools, or project specifics. Copilot then incorporates these custom instructions with every request.

To enable custom instructions for your workspace:

1. Create a `.github/copilot-instructions.md` file in the root of your workspace
1. Add your instructions in Markdown format to the file. For example:

    ```markdown
    # Custom instructions for Copilot

    ## Project context
    This project is a web application built with React and Node.js.

    ## Indentation
    We use tabs, not spaces.

    ## Coding style
    Use camelCase for variable names and prefer arrow functions over traditional function expressions.

    ## Testing
    We use Jest for unit testing and Playwright for end-to-end testing.
    ```

Get more details about [using custom instructions for Copilot in VS Code](/docs/copilot/copilot-customization.md).

## Prompt engineering

You can enhance the quality of Copilot's responses by using effective prompts. A well-crafted prompt can help Copilot understand your requirements better and generate more relevant code suggestions.

* Start general, then get specific.

    ```text
    Generate a Calculator class.
    Add methods for addition, subtraction, multiplication, division, and factorial.
    Don't use any external libraries and don't use recursion.
    ```

* Give examples of what you want.

    ```text
    Generate a function that takes a string and returns the number of vowels in it.
    Example:
    findVowels("hello") returns 2
    findVowels("sky") returns 0
    ```

* Break down complex tasks into simpler tasks.

    Instead of asking Copilot to generate a meal planner app, break it down into smaller tasks:
    * Generate a function that takes a list of ingredients and returns a list of recipes.
    * Generate a function that takes a list of recipes and returns a shopping list.
    * Generate a function that takes a list of recipes and returns a meal plan for the week.

* Provide the [right context](#provide-the-right-context), such as code selections, files, terminal output, and more.

    Example, use the `#codebase` variable to refer to the entire codebase:

    ```text
    Where is the database connection string used in #codebase?
    ```

* Iterate on your prompts.

    Provide follow-up prompts to refine or modify the response. For example:

    * "Write a function to calculate the factorial of a number."
    * "Don't use recursion and optimize by using caching."
    * "Use meaningful variable names."

* Keep chat history relevant.

    Copilot uses history of the conversation to provide context. Remove past questions and responses from the history if they're not relevant. Or, start a new session if you want to change the context.

Get more details about [prompt engineering](/docs/copilot/chat/prompt-crafting.md).

Find practical [examples of prompts to use with Copilot](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context

Enrich your prompts with relevant context to get more accurate and relevant response from Copilot.

* Use the `#codebase` variable to let Copilot find the right files automatically.
* Reference files or symbols in your prompt by using `#file` or `#sym` chat variables.
* Drag and drop files, folders, or editor tabs onto the chat prompt.
* Add problems, test failures, or terminal output to your chat prompt for scenario-specific context.
* Add images or screenshots to your prompt to let Copilot analyze the image.

When you use [agent mode](/docs/copilot/chat/chat-agent-mode.md), Copilot autonomously finds the relevant files and context for you.

Get more details about [adding context to chat prompts](/docs/copilot/chat/copilot-chat-context.md).

## Reusable prompts

Reusable prompts enable you to save a prompt for a specific task with its context and instructions in a file. You can then attach and reuse that prompt in chat. If you store the prompt in your workspace, you can also share it with your team.

To create a reusable prompt:

1. Create a prompt file with the **Create Prompt** command from the Command Palette.

    This command creates a `.prompt.md` file in the `.github/prompts` folder at the root of your workspace.

1. Describe your prompt and relevant context in Markdown format.

    For example, use this prompt to generate a new React form component.

    ```markdown
    Your goal is to generate a new React form component.

    Ask for the form name and fields if not provided.

    Requirements for the form:
    * Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
    * Use `react-hook-form` for form state management:
    * Always define TypeScript types for your form data
    * Prefer *uncontrolled* components using register
    * Use `defaultValues` to prevent unnecessary rerenders
    * Use `yup` for validation:
    * Create reusable validation schemas in separate files
    * Use TypeScript types to ensure type safety
    * Customize UX-friendly validation rules
    ```

1. Add the prompt as context in chat.

Get started with [reusable prompts](/docs/copilot/copilot-customization.md#reusable-prompt-files-experimental).

## Choose your AI model

Copilot offers different AI models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks.

| Model type | Models |
|-----------|--------|
| Fast coding | <ul><li>GPT-4o</li><li>Claude Sonnet 3.5</li><li>Claude Sonnet 3.7</li><li>Gemini 2.0 Flash</li></ul> |
| Reasoning/planning | <ul><li>Claude Sonnet 3.7 Thinking</li><li>o1</li><li>o3-mini</li></ul> |

Choose the model that best fits your needs by using the model picker in the chat input field.

Learn more about [AI models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat) in the GitHub Copilot documentation.

## Workspace indexing

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

For GitHub repositories, you can use a remote index of your workspace, based on [GitHub code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/using-github-copilot/asking-github-copilot-questions-in-github#asking-exploratory-questions-about-a-repository). This allows Copilot to search your entire codebase very quickly, even if the codebase is very large.

Get more details about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).

## Related resources

* [Prompt engineering for Copilot Chat](/docs/copilot/chat/prompt-crafting.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
* [Personalize Copilot in VS Code](/docs/copilot/copilot-customization.md)
