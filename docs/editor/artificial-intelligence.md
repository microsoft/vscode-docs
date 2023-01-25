---
Order: 7
Area: editor
TOCTitle: Refactoring
ContentId:
PageTitle: Code smarter with artifical intelligence
DateApproved: 1/27/2023
MetaDescription: Code smarter with AI-powered suggestions from GitHub Copilot.
---
# Code smarter with artificial intelligence

In VS Code, you can enhance your coding with artificial intelligence (AI), such as suggestions for lines of code or entire functions, fast documentation creation, and help creating code-related artifacts like tests.

[GitHub Copilot](https://copilot.github.com/) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the [Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) in VS Code to generate code, or to learn from the code it generates.

## Prerequisites

You'll use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) to power your AI suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/	GitHub.copilot">Install the Copilot extension</a>

![Copilot extension in marketplace](./images/artifical-intelligence/copilot-extension.png)

To use GitHub Copilot, you need an active GitHub Copilot subscription. In the [content below](#activate-your-free-trial), you'll learn how VS Code will help you activate your free 60-day trial directly from VS Code.

You can also activate your trial starting from the [GitHub Copilot website](https://copilot.github.com/):

![Copilot website with trial button](./images/artifical-intelligence/website-top-buttons.png)

## Sign in

If you have not previously authorized VS Code in your GitHub account, you will be prompted to sign in to GitHub in VS Code:

![VS Code toast to sign into Copilot extension](./images/artifical-intelligence/copilot-auth.png)

In your browser, GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

## Activate your free trial

If you haven't yet activated your free trial for Copilot, the extension will notify you in VS Code. Select `Sign up for GitHub Copilot` to activate your trial.

![Copilot sign up toast in VS Code](./images/artifical-intelligence/copilot-access.png.png)

You can learn more about billing for Copilot in the [GitHub Copilot documentation](hhttps://docs.github.com/en/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Using Copilot

Enable the Copilot extension using its entry in the status bar:

![Copilot status bar entry to activate](./images/artifical-intelligence/activate-copilot.png)

## Seeing your first suggestion

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

Below is the general process you'll follow for harnessing its suggestions:

* Start writing code in VS Code
     * Copilot also helps with "non-coding" tasks, like writing a markdown file for a README, or creating tests
* Receive a Copilot suggestion in gray ghost text
     * Ghost text is placeholder text that will be replaced by input you type or select from Copilot
* Choose to accept Copilot's suggestion
     * You can accept suggestions with the `Tab` key
     * If you don't want to accept a suggestion, you can continue typing, and Copilot will continue to provide suggestions as you work

### JavaScript example

As an example, let's look at a Copilot suggestion for a JavaScript file. Other languages will work similarly.

Create a new file in VS Code. You can use the **File: New File** command in the Command Palette (`kbstyle(F1)`).

In the JavaScript file, type the following function header:

```js
function calculateDaysBetweenDates(begin, end) {
```

Copilot will provide a suggestion like the following:

![JavaScript ghost text suggestion](./images/artifical-intelligence/js-suggest.png)

Use `Tab` to accept the suggestion.

Congratulations, you just used AI to enhance your coding!

## Additional resources

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code).