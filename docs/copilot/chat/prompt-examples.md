---
ContentId: 9d8f3a2b-5c6e-4f7a-8b9c-1d2e3f4a5b6c
DateApproved: 10/17/2025
MetaDescription: Discover effective prompt examples for chat in VS Code across different scenarios including code generation, debugging, testing, and working with notebooks.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Prompt examples for chat in VS Code

This article provides example prompts for chat in Visual Studio Code across different scenarios and chat modes. Use these examples as inspiration to craft effective prompts for your own development tasks.

If you are new to using chat in VS Code, learn more about [getting started with chat](/docs/copilot/chat/copilot-chat.md) or review [best practices for prompt crafting](/docs/copilot/chat/prompt-crafting.md).

## General coding and technology questions

* Use chat in VS Code to get quick answers about coding concepts, technology topics, and general programming questions.
    * `"What is a linked list?"`
    * `"Provide 3 ways to implement a search feature in React."`
    * `"Explain the difference between async/await and promises"`

## Understanding and exploring your codebase

* Use chat in VS Code to understand how your project works, locate specific functionality, or explore code relationships.
    * `"Explain how authentication works in #codebase"`
    * `"Where is the database connection string configured? #codebase"`
    * `"How do I build this #codebase?"`
    * `"Which testing framework is used for #calculator.test.js?"`

## Code generation and editing

* Use chat in VS Code to generate new code, add features, or modify existing functionality.
    * `"Add a login button and style it based on #styles.css"`
    * `"Create a meal-planning web app using React and Node.js"`
    * `"Refactor this code to use async/await"`

## Testing and quality assurance

* Use chat in VS Code to generate tests or fix failing tests.
    * `"Add unit tests for the user service."`
    * `"Fix the failing tests #testFailure"`

## Debugging and fixing issues

* Use chat in VS Code to identify and fix problems in your code.
    * `"Fix the issues in #problems"`
    * `"Fix the failing tests #testFailure"`
    * `"Why is this function returning undefined?"`

## Working with source control

* Use chat in VS Code to work with your pending changes and generate release documentation.
    * `"Summarize the #changes"`
    * `"Generate release notes based on the #changes"`
    * `"Summarize the changes in #changes"`

## Working with external resources

* Use chat in VS Code to reference content from the web or GitHub repositories.
    * `"How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage"`
    * `"Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates"`
    * `"What are the top #extensions for this workspace?"`

## Terminal and command-line tasks

* Use terminal inline chat to get help with shell commands and terminal operations.
    * `"How do I install npm packages?"`
    * `"List the top 5 largest files in the src directory"`
    * `"undo the last git commit"`

## Working with Jupyter notebooks

* Use chat in VS Code to create, edit, and work with Jupyter notebooks.
    * `/newNotebook use pandas and seaborn to read and visualize the titanic dataset. Show key information from the dataset.`
    * `Create a notebook to read data from #housing.csv and plot the distribution of prices`
    * `Make sure the data is cleaned before visualizing and processing it`
    * `Show the correlation between different features in the dataset`

## Tips for crafting effective prompts

* **Be specific**: Include details about what you want to accomplish, the technologies to use, and the expected output format.
* **Add context**: Use #-mentions to reference files, symbols, or context variables like `#codebase`, `#changes`, or `#problems`.
* **Iterate**: Start with a simple prompt and refine it based on the response. Ask follow-up questions to improve the results.
* **Use the right mode**: Choose ask mode for questions, edit mode for targeted edits, or agent mode for complex multi-step tasks.
* **Break down complex tasks**: Instead of asking for everything at once, break large tasks into smaller, manageable steps.

Learn more about [best practices for crafting prompts](/docs/copilot/chat/prompt-crafting.md) and [adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md).

## Related resources

* [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation

* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)

* [Prompt engineering best practices](/docs/copilot/chat/prompt-crafting.md)
