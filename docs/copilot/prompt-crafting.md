---
Order: 6
Area: copilot
TOCTitle: Prompt crafting
ContentId: 5dfd207f-fcee-42c3-b7fe-622b42b3397c
PageTitle: Prompt crafting for GitHub Copilot
DateApproved: 02/28/2024
MetaDescription: Optimize your development experience with GitHub Copilot in VS Code through crafting chat prompts and providing context.
---
# GitHub Copilot optimization with prompt crafting and context setting

This article covers best practices for using GitHub Copilot in Visual Studio Code, so that you make the most of your AI pair programming experience.

>**Note**: "Prompt engineering" or "Prompt crafting" is a common phrase you'll hear when discussing AI and refers to how and what information is packaged and sent to an AI API endpoint. The Copilot extension does this process for you but you can help by providing hints to guide the extension.

If you are new to VS Code or GitHub Copilot, you might want to review the [GitHub Copilot Overview](/docs/copilot/overview.md) article first or dive straight into the [Getting started](/docs/copilot/getting-started.md) tutorial.

## Getting the most out of Copilot inline suggestions

The [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension presents [suggestions](/docs/copilot/overview.md#inline-suggestions) automatically to help you code more efficiently. There are things you can do to help ("prompt") Copilot to give you the best possible suggestions. And the good news is that you are probably already doing these right now, since they help you and your colleagues understand your code.

### Provide context to Copilot

Copilot works best when it has sufficient context to know what you're doing and what you want help with. Just as you would provide a colleague with the context when asking for help with a specific programming task, you can do the same with Copilot.

#### Open files

Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets the Copilot see a bigger picture of your project.

#### Top level comment

Just as you would give a brief, high-level introduction to a coworker, a top level comment in the file you're working in can help Copilot understand the overall context of the pieces you are creating.

<!-- Example of a good and bad top level comment -->

#### Appropriate includes and references

It's best to manually set the includes or module references you need for your work. Copilot can make suggestions, but you likely know best what dependencies you need to include. This can also help let Copilot know what frameworks, libraries, and their versions you'd like it to use when crafting suggestions.

In the following TypeScript example, we want to log the output of the `add`method. When we don't have any includes, Copilot suggests using `console.log`:

![Copilot inline suggestion proposes Console.log when no imports in the file.](images/prompt-crafting/copilot-suggestion-console-log.png)

On the other hand, when you add a reference to `Log4js`, Copilot suggests using that framework for logging the output:

![Copilot inline suggestion proposes logging using the imported logging framework.](images/prompt-crafting/copilot-suggestion-framework-log.png)

#### Meaningful function names

Just as a method called `fetchData()` won't mean much to a coworker (or you after several months), `fetchData()` won't help Copilot either. Using meaningful function names helps Copilot provide a body that does what you want.

<!-- Example of a meaningful function/method name. -->

#### Specific and well-scoped function comments

A function name can only be so descriptive without being overly long. Function comments can help fill in details that Copilot might need to know.

<!-- Example of a meaningful function/method comment -->

#### Prime Copilot with sample code

One trick to get Copilot on the right page, is to copy and paste sample code that is close to what you are looking for into your open editor. Providing a small example can help Copilot generate suggestions that match the language and tasks you want to achieve. Once Copilot begins providing you with the code you want and will actually use, you can delete the sample code from the file. This can be especially helpful to jump start Copilot to a newer library version when it defaults to providing older code suggestions.

### Be consistent and keep the quality bar high

Copilot is going to latch on to your code to generate suggestions that follow the existing pattern, so the adage "garbage in, garbage out" applies.

Always keeping a high quality bar can take discipline. Especially when you're coding fast and loose to get something working, you might want to disable Copilot completions while in "hacking" mode. You can temporarily disable completions from the Copilot status menu. Bring up the Copilot status menu dropdown by selecting the Copilot Status bar item.

![Hover over the Copilot Status bar item displays "Show Copilot status menu"](images/prompt-crafting/show-copilot-status-menu.png)

From the dropdown, you can disable completions entirely, or disable just for the active file type, for example Markdown files.

![Copilot Status menu dropdown with Disable Completions selected](images/prompt-crafting/disable-completions.png)

<!-- ### Be specific

break things down into separate specific tasks

Be specific about inputs, outputs, ranges, APIs, frameworks.

### Verify suggestions

Copilot is not a compiler or language service

Tools, which you may already be using, can help.

#### Language Service warnings

#### Linters -->

## Getting the most out of Copilot Chat

You can also get assistance from Copilot via a [chat interface](/docs/copilot/overview.md#chat-features) by installing the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

When you're using chat to interact with GitHub Copilot, there are several things you can do to optimize your experience.

### Use agents and slash commands

Agents are designed to collect extra context either about a code base or a specific domain or technology. By using the appropriate agent, Copilot Chat can find and provide better information to send to the Copilot backend. For example, use `@workspace` if you want to ask questions about your open project, or `@vscode` to know more about VS Code features and APIs.

![Asking the @vscode agent how to change the VS Code colors](images/prompt-crafting/agent-example.png)

Slash commands help Copilot Chat understand your **intent** when you ask a question. Are you learning about a code base (`/explain`), do you want help with fixing an issue (`/fix`), or are you creating test cases (`/tests`)? By letting Copilot Chat know what you're trying to do, it can tune its reply to your task and provide helpful commands, settings, and code snippets.

![Inline chat slash command list](images/prompt-crafting/inline-chat-slash-commands.png)

You could write out your project scope or current task with a natural language query but using agents and slash commands is more concise and explicit.

### Use context variables

You can use context variables to provide extra context to your questions in chat by using the `#` symbol:

The `#selection` context variable enables you to focus Copilot's suggestions on the specific text you select in the editor.

The `#file` variable lets you reference specific files from your workspace in your chat prompt. This helps make the answers from Copilot Chat more relevant to your code by providing context about the file you are working with. You can ask questions like "Can you suggest improvements to #file:package.json?" or "How do I add an extension in #file:devcontainer.json?". By using the `#file` variable, you can get more targeted and accurate responses from Copilot.

With the `#editor` context variable, you have control over whether to include the visible code of the active editor in your prompt to Copilot Chat. Previously, this information was automatically included when you hadn't selected text in the editor. Now, you can choose to explicitly add the visible code to the context or omit it for more general questions.

By combining the `#file`, `#editor`, and `#selection` variables, you have full control over the context you provide to Copilot Chat, ensuring that you receive the most relevant and helpful answers.

### Iterate on your solution

When asking Copilot Chat for help, you aren't stuck with the first response. You can iterate and prompt Copilot to improve the solution. Copilot has both the context of the generated code and also your current conversation.

Here's an example using inline chat to create a function to calculate Fibonacci numbers:

![First response from Copilot for a function to calculate Fibonacci numbers](images/prompt-crafting/fibonacci-first.png)

Maybe you prefer a solution that doesn't use recursion:

![Ask Copilot to not use recursion and new result](images/prompt-crafting/fibonacci-second.png)

You can even ask Copilot to follow coding conventions or improve variable names:

![Ask Copilot to use better variable names and new result](images/prompt-crafting/fibonacci-third.png)

Even if you've already accepted a result, you can always ask Copilot to iterate on the code later:

![Ask inline chat to use better variable names on existing code](images/prompt-crafting/fibonacci-better-var-names.png)

### Chat view locations

You can access the Copilot Chat view via the Activity Bar. Like other views in VS Code, you can [drag and drop](/docs/editor/custom-layout.md#drag-and-drop-views-and-panels) the Chat view anywhere.

For example, you can move it to the [Secondary Side Bar](/docs/editor/custom-layout.md#secondary-side-bar), so that you can use other views like the Explorer at the same time:

![Copilot view moved to Secondary Side Bar](images/prompt-crafting/secondary-sidebar.png)

Another option is to drag and drop the Chat view into the Panel region, for example not to take away screen space for the editor.

![Chat view in the Panel region](images/prompt-crafting/chat-in-panel.png)

If you need a larger display area for Copilot Chat, you can open the Chat view in the editor region. From the Chat view title bar **More Actions** (`...`) menu, select **Open Session in Editor**.

![Copilot Chat view title bar More Actions with Open Session in Editor selected](images/prompt-crafting/open-session-in-editor.png)

Just like any open editor, you can move editor-hosted Chat views into separate [Editor Groups](/docs/getstarted/userinterface.md#editor-groups) and use display customizations such as [Grid layout](/docs/editor/custom-layout.md#grid-layout) to have multiple chat sessions open in the editor region.

To move the Chat view back to the side bar, use the **Open Session in Side Bar** command in the editor title bar when the Chat view is the active editor.

![Chat view in editor with Open Session in Side bar displayed](images/prompt-crafting/open-session-in-sidebar.png)

## More resources about prompting for Copilot

If you'd like to learn more about productively using GitHub Copilot, you can follow up with these videos and blog posts:

* [Effective Prompting for GitHub Copilot](https://www.youtube.com/watch?v=ImWfIDTxn7E)
* [Pragmatic techniques to get the most out of GitHub Copilot](https://www.youtube.com/watch?v=CwAzIpc4AnA)
* [Best practices for prompting GitHub Copilot in VS Code](https://www.linkedin.com/pulse/best-practices-prompting-github-copilot-vs-code-pamela-fox)
* [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)
