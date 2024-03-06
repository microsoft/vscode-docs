---
Order: 3
Area: copilot
TOCTitle: AI-powered suggestions
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
PageTitle: AI-powered suggestions with GitHub Copilot
DateApproved: 02/28/2024
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# AI-powered inline suggestions with GitHub Copilot in VS Code

GitHub Copilot provides autocomplete-style suggestions from an AI pair programmer as you code. As you start writing code or code-related items (comments, test, and more), Copilot presents suggestions automatically in the editor to help you code more efficiently. GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks.

## Getting started

> **Note**: After reviewing this topic, you can get started with the introductory [Copilot tutorial](/docs/copilot/getting-started-chat.md) to get set up and get your first inline suggestions.

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

* To use GitHub Copilot you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/getting-started.md#set-up-vs-code-for-github-copilot).

## Inline suggestions

Copilot offers coding suggestions as you type: sometimes the completion of the current line, sometimes a whole new block of code. You can accept all, or part, of a suggestion, or you can ignore the suggestion and keep typing.

Notice in the following example how Copilot suggests an implementation of the `calculateDaysBetweenDates` JavaScript function by using dimmed *ghost text*:

![JavaScript ghost text suggestion.](images/inline-suggestions/js-suggest.png)

When you're presented with an inline suggestion, you can accept it with the `kbstyle(Tab)` key.

For any given input, Copilot might offer multiple suggestions. You can hover over the suggestion to any of the other suggestions.

![Hovering over inline suggestions enables you to select from multiple suggestions](images/inline-suggestions/copilot-hover-highlight.png)

Rather than letting Copilot provide suggestions as you're typing, you can also use code comments to provide instructions to Copilot. By using code comments, you can be more specific about the suggestions you're looking for. For example, you could specify a type of algorithm to use, or which methods and properties to add to a class.

The following example shows how to instruct Copilot to create a class in TypeScript to represent a student, providing information about methods and properties:

![Use code comments to let Copilot generate a Student class in TypeScript with properties and methods.](images/inline-suggestions/ts-suggest-code-comment.png)

You can configure the font for the inline suggestions with the `editor.inlineSuggest.fontFamily` setting.

For giving you relevant inline suggestions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets the Copilot see a bigger picture of your project.

## Next steps

* Get started with the introductory [Copilot tutorial](/docs/copilot/getting-started-chat.md) to get set up and get your first inline suggestions.

* Learn how you can use AI-powered chat conversations with [GitHub Copilot Chat](/docs/copilot/copilot-chat.md).

## Additional resources

You can read more about [Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.
