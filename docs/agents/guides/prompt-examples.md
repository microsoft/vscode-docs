---
ContentId: 9d8f3a2b-5c6e-4f7a-8b9c-1d2e3f4a5b6c
DateApproved: 11/11/2026
MetaDescription: Use chat prompts in {% data variables.product.prodname_vscode_shortname %} to explore code, build features, refactor, debug, and test.
---
# Prompt examples

This article provides example prompts for chat in {% data variables.product.prodname_vscode %} across different scenarios and agents. Use these examples as inspiration to craft effective prompts for your own development tasks.

If you are new to using chat in {% data variables.product.prodname_vscode_shortname %}, learn more about [getting started with chat](/docs/chat/chat-overview.md) or review [best practices for prompt crafting](/docs/agents/best-practices.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Adapt an example to your project

The {% data variables.copilot.chat_view %} examples use the {% data variables.product.prodname_copilot_short %} harness. Select **Ask** for an explanation without edits, or **Agent** when you want the agent to make and verify changes.

> [!TIP]
> If you don't see the agent picker, look under **Add Context** (`+`) > **Agent**. To restore the separate picker, uncheck the experimental `setting(sessions.chat.experimental.agentsPickerInAttachContextMenu)` setting.

Before sending a prompt:

* **Select your context.** Type `#` in the chat input and choose a file, folder, or other item from the picker, or use **Add Context**. Replace sample filenames such as `calculator.test.js` and `styles.css` with files in your project. Available context items depend on your session. See [Add context to chat](/docs/chat/copilot-chat-context.md).
* **State the expected result.** Adapt the task to your project. For a failure, include the input, expected behavior, and relevant error or test output. Remove secrets from copied output.
* **Review before keeping changes.** Check tool approval requests, inspect the diff, and run the relevant checks. Treat tests that weren't run as unverified.

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

For a guided investigation with source references and verification steps, see [Explore a codebase with an agent](/docs/agents/guides/explore-a-codebase.md).

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

Use **Agent** for multi-file creation and **inline chat** (`kb(inlineChat.start)`) for targeted, in-place edits.

For complete workflows in an existing project, see [Add a feature](/docs/agents/guides/add-a-feature.md) and [Refactor without changing behavior](/docs/agents/guides/refactor-safely.md).

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

Use **Agent** to generate tests or fix failing tests. Provide the expected behavior and use the project's existing test framework. For a complete workflow, see [Add tests to existing code](/docs/agents/guides/test-code-with-ai.md).

```prompt
Add unit tests for the attached user service using the existing test framework.
Cover normal inputs, empty inputs, and error cases without changing implementation
code. Run the tests and report the command, results, and anything you couldn't run.
```

```prompt
Investigate the attached test failure before changing code.
Explain whether the cause is test setup, an incorrect expectation, or an
implementation bug. Propose a fix and wait for my approval before applying it.
Do not delete assertions, skip tests, or change expected results just to make
the tests pass.
```

After you agree on the cause and fix:

```prompt
Apply the agreed fix without changing unrelated code.
Run the relevant tests and report the command, results, and any tests not run.
```

## Debugging and fixing issues

Use **Agent** for fixing issues across files, or **Ask** to understand the root cause first.

```prompt
Investigate the attached compiler or lint errors.
Fix the root cause without suppressing diagnostics or changing unrelated code.
Rerun the command that reported the errors and summarize the remaining failures.
```

```prompt-ask
Explain why the selected function returns undefined for the input I provided.
Trace the return path without changing files.
```

## Working with source control

Attach the diff you want to discuss. Use **Ask** to summarize changes, draft release documentation, or choose a recovery action before changing Git history.

```prompt-ask
Summarize the attached diff. Group the changes by behavior and flag anything
that needs further review.
```

```prompt-ask
Draft release notes from the attached diff. Focus on user-visible changes
and flag claims that need verification. Do not edit files.
```

Before undoing a commit, establish whether it has been shared and which changes you want to keep:

```prompt-ask
Help me choose how to undo my most recent commit while keeping all file changes.
First ask whether it has been pushed or shared and whether I have uncommitted
changes. Explain an option that avoids rewriting shared history.
Do not run commands or change the repository.
```

Review the [Git undo and discard options](/docs/sourcecontrol/staging-commits.md#undo-or-discard-changes) before taking action.

## Working with external resources

Use `#fetch` to reference content from the web or use the GitHub MCP server to search for code examples in public GitHub repositories.

```prompt
How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage
```

```prompt
Build an API endpoint to fetch address info, use the template from GitHub repo contoso/api-templates
```

```prompt
Recommend extensions for the languages used in this workspace.
Explain what each adds and do not install anything.
```

## Terminal and command-line tasks

Use [terminal inline chat](/docs/chat/inline-chat.md#use-terminal-inline-chat) to get help with shell commands and terminal operations.

```prompt
How do I install npm packages?
```

```prompt
List the top 5 largest files in the src directory
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
* **Add context**: Select relevant files and symbols with the `#` picker or **Add Context**. Include error output and expected behavior when investigating a failure.
* **Iterate**: Start with a simple prompt and refine it based on the response. Ask follow-up questions to improve the results.
* **Break down complex tasks**: Instead of asking for everything at once, break large tasks into smaller, manageable steps.

Learn more about [best practices for crafting prompts](/docs/agents/best-practices.md) and [adding context to your prompts](/docs/chat/copilot-chat-context.md).

## Related resources

* [Chat overview](/docs/chat/chat-overview.md)
* [Add context to your chat prompt](/docs/chat/copilot-chat-context.md)
* [Inline chat](/docs/chat/inline-chat.md)
* [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation
