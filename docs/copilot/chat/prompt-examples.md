---
ContentId: 9d8f3a2b-5c6e-4f7a-8b9c-1d2e3f4a5b6c
DateApproved: 02/04/2026
MetaDescription: Discover effective prompt examples for chat in VS Code across different scenarios including code generation, debugging, testing, and working with notebooks.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Prompt examples

This article provides example prompts for chat in Visual Studio Code across different scenarios and agents. Use these examples as inspiration to craft effective prompts for your own development tasks.

If you are new to using chat in VS Code, learn more about [getting started with chat](/docs/copilot/chat/copilot-chat.md) or review [best practices for prompt crafting](/docs/copilot/guides/prompt-engineering-guide.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## General coding and technology questions

Use the **Ask** agent to get quick answers about coding concepts, technology topics, and general programming questions.

```prompt-ask
What is a linked list?
```

```prompt-ask
Provide 3 ways to implement a search feature in React.
```

```prompt-ask
Explain the difference between async/await and promises.
```

## Understanding and exploring your codebase

Use the **Ask** agent with `#codebase` to understand how your project works, locate specific functionality, or explore code relationships.

```prompt-ask
Explain how authentication works in #codebase
```

```prompt-ask
Where is the database connection string configured? #codebase
```

```prompt-ask
How do I build this #codebase?
```

```prompt-ask
Which testing framework is used for #calculator.test.js?
```

## Code generation and editing

Use **Agent** for multi-file creation and **inline chat** (`kb(inlinechat.start)`) for targeted, in-place edits.

```prompt
Add a login button and style it based on #styles.css
```

```prompt
Create a meal-planning web app using React and Node.js
```

```prompt
Refactor this code to use async/await
```

## Testing and quality assurance

Use **Agent** to generate tests or fix failing tests.

```prompt
Add unit tests for the user service.
```

```prompt
Fix the failing tests #testFailure
```

## Debugging and fixing issues

Use **Agent** for fixing issues across files, or **Ask** to understand the root cause first.

```prompt
Fix the issues in #problems
```

```prompt
Why is this function returning undefined?
```

## Working with source control

Use chat to work with your pending changes and generate release documentation.

```prompt
Summarize the #changes
```

```prompt
Generate release notes based on the #changes
```

## Working with external resources

Use `#fetch` and `#githubRepo` to reference content from the web or GitHub repositories.

```prompt
How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage
```

```prompt
Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates
```

```prompt
What are the top #extensions for this workspace?
```

## Terminal and command-line tasks

Use [terminal inline chat](/docs/copilot/chat/inline-chat.md#use-terminal-inline-chat) to get help with shell commands and terminal operations.

```prompt
How do I install npm packages?
```

```prompt
List the top 5 largest files in the src directory
```

```prompt
undo the last git commit
```

## Working with Jupyter notebooks

Use **Agent** to create, edit, and work with Jupyter notebooks.

```prompt
/newNotebook use pandas and seaborn to read and visualize the titanic dataset. Show key information from the dataset.
```

```prompt
Create a notebook to read data from #housing.csv and plot the distribution of prices
```

```prompt
Make sure the data is cleaned before visualizing and processing it
```

```prompt
Show the correlation between different features in the dataset
```

## Multi-turn conversation examples

Chat supports follow-up prompts within the same session. Use multi-turn conversations to iterate on results and refine the AI's output.

**First prompt:**

```prompt
Create a REST API with Express.js that has endpoints for users and products
```

**Follow-up prompts:**

```prompt
Add input validation and error handling to both endpoints
```

```prompt
Now add unit tests for the validation logic
```

By building on earlier responses, the AI maintains context from the previous steps and generates more coherent code.

## Tips for crafting effective prompts

* **Be specific**: Include details about what you want to accomplish, the technologies to use, and the expected output format.
* **Add context**: Use #-mentions to reference files, symbols, or context variables like `#codebase`, `#changes`, or `#problems`.
* **Iterate**: Start with a simple prompt and refine it based on the response. Ask follow-up questions to improve the results.
* **Break down complex tasks**: Instead of asking for everything at once, break large tasks into smaller, manageable steps.

Learn more about [best practices for crafting prompts](/docs/copilot/guides/prompt-engineering-guide.md) and [adding context to your prompts](/docs/copilot/chat/copilot-chat-context.md).

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Inline chat](/docs/copilot/chat/inline-chat.md)
* [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation
