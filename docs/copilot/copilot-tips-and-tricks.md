---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 02/06/2025
MetaDescription: Tips and tricks to optimize your development experience with GitHub Copilot in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Tips and tricks for using GitHub Copilot in VS Code

This article provides tips and tricks to optimize your development experience for using GitHub Copilot in Visual Studio Code.

## Choose the right Copilot tool

Depending on your task, you can choose between different Copilot tools.

### Code completions

* Completing code snippets, variable names, and functions as you write them in the editor
* Generating repetitive code
* Generating code from inline comments in natural language

Get started with [code completions](/docs/copilot/ai-powered-suggestions.md).

### Chat

* Answering questions about your code or technology in general by using natural language
* Brainstorming on software design and architecture ideas and concepts
* Generating large sections of code, then iterating on that code to meet your needs
* Accomplishing domain-specific tasks with subject-matter chat participants

Get started with [Copilot Chat](/docs/copilot/copilot-chat.md).

### Edits

* Generating and directly applying large sections of code across multiple files in your project
* Implementing high-level requirements by autonomously applying code changes and running commands to meet those requirements

Get started with [Copilot Edits](/docs/copilot/copilot-edits.md).

## Personalize Copilot with custom instructions

When Copilot generates code or answers questions, it tries to match your coding practices and preferences such as which libraries you use or how you name your variables. However, it might not always have enough context to do this effectively. For example, if you work with a specific framework version, you need to provide additional context in your prompts.

To enhance Copilot's responses, you can use _custom instructions_ to provide it with contextual details about your team's workflow, tools, or project specifics. Copilot then incorporates these custom instructions with every request.

To enable custom instructions for your workspace:

1. Enable the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`
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
* Give examples of what you want.
* Break down complex tasks into simpler tasks.
* Provide the [right context](#provide-the-right-context), such as code selections, files, terminal output, and more.
* Iterate on your prompts.
* Keep chat history relevant.

Get more details about [prompt engineering](/docs/copilot/prompt-crafting.md).

Find practical [examples of prompts to use with Copilot](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context

## Reusable prompts

## Iterate on your prompts

## Choose your AI model

## Workspace indexing


## Related resources

* [Prompt engineering for Copilot Chat](/docs/copilot/prompt-crafting.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
* [Personalize Copilot in VS Code](/docs/copilot/copilot-customization.md)
