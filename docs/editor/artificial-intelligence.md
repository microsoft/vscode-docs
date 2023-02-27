---
Order: 7
Area: editor
TOCTitle: AI Tools
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: Enhance your coding with artificial intelligence
DateApproved: 1/27/2023
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# AI Tools in VS Code

In VS Code, you can enhance your coding with artificial intelligence (AI), such as suggestions for lines of code or entire functions, fast documentation creation, and help creating code-related artifacts like tests.

The [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the Copilot extension in VS Code to generate code, or to learn from the code it generates.

## Prerequisites

You'll use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) to power your AI suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the Copilot extension</a>

![Copilot extension in the VS Code Marketplace](images/artificial-intelligence/copilot-extension.png)

To use GitHub Copilot, you need an active GitHub Copilot subscription. In the [content below](#activate-your-free-trial), you'll learn how VS Code will help you activate your free 60-day trial directly from VS Code.

You can also activate your trial starting from the [GitHub Copilot signup page](https://github.com/github-copilot/signup).

## Sign in and sign up

If you have not previously authorized VS Code in your GitHub account, you will be prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/artificial-intelligence/copilot-auth-toast.png)

In your browser, GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

### Activate your free trial

If you haven't yet activated your free trial for Copilot, the extension will notify you in VS Code. Select **Signup for GitHub Copilot** to activate your trial.

![Copilot sign up notification in VS Code](images/artificial-intelligence/copilot-access-toast.png)

You can learn more about billing for Copilot in the [GitHub Copilot documentation](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Seeing your first suggestion

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

Below is the general process you'll follow for harnessing its suggestions:

* Start writing code.
* Receive a Copilot suggestion in gray ghost text.
  * Ghost text is placeholder text that will be replaced by input you type or select from Copilot.
* Choose to accept Copilot's suggestion.
  * You can accept suggestions with the `kbstyle(Tab)` key.
  * If you don't want to accept a suggestion, you can continue typing, and Copilot will continue to provide suggestions as you work.

Copilot provides two main kinds of suggestions: comments and code completion. We recommend trying out Copilot in your actual projects to see its power in action!

We'll explore Copilot suggestions for JavaScript files in the following sections. Other languages will work similarly.

### Comments

You can describe something you want to do using natural language within a comment, and Copilot will suggest the code to accomplish your goal.

As an example, if you start writing the comments in the JavaScript snippet below, Copilot will suggest an implementation of the function.

```js
// find all images without alternate text
// and give them a red border
function process() {
```

### Code completion

Copilot provides suggestions for a variety of languages and frameworks. For any given input, Copilot may offer multiple suggestions. You can select which suggestion to use, or reject all suggestions.

In a JavaScript file, type the following function header:

```js
function calculateDaysBetweenDates(begin, end) {
```

Copilot will provide a suggestion like the following:

![JavaScript ghost text suggestion](images/artificial-intelligence/js-suggest.png)

Use `kbstyle(Tab)` to accept the suggestion.

### Alternative and partial solutions

For any given input, GitHub Copilot may offer multiple suggestions. When Copilot offers a suggestion, you can hover over the suggestion to see the inline suggestion toolbar for choosing suggestions:

![JavaScript ghost text suggestion](images/artificial-intelligence/copilot-hover-highlight.png)

In the image above, Copilot presents three suggestions. You can accept the entire suggestion with `kbstyle(Tab)`, or only part of the suggestion with `kbstyle(Ctrl+Right Arrow)`. You can switch between suggestions in the suggestion toolbar, or use the keyboard shortcut `kb(editor.action.inlineSuggest.showNext)` instead.

## Additional resources

Congratulations, you've now used artificial intelligence to enhance your coding!

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code).
