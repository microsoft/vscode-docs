---
Order: 5
Area: copilot
TOCTitle: Code Completions
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
PageTitle: AI-powered code completions with GitHub Copilot
DateApproved: 12/11/2024
MetaDescription: Enhance your coding with AI-powered code completions from GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Code completions with GitHub Copilot in VS Code

GitHub Copilot acts as an AI-powered pair programmer, automatically offering suggestions to complete your code, comments, tests, and more. It provides these suggestions directly in the editor while you write your code, and it can work with a broad range of programming languages and frameworks.

## Getting started

1. Install the GitHub Copilot extensions.

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot?referrer=docs-copilot-ai-powered-suggestions">Install the GitHub Copilot extensions</a>

1. Sign in with your GitHub account to use Copilot.

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. Discover the key features of Copilot in VS Code with our [Copilot Quickstart](/docs/copilot/getting-started.md).

## Inline suggestions

Copilot offers code suggestions as you type: sometimes the completion of the current line, sometimes a whole new block of code. You can accept all, or part of a suggestion, or you can keep typing and ignore the suggestions.

Notice in the following example how Copilot suggests an implementation of the `calculateDaysBetweenDates` JavaScript function by using dimmed *ghost text*:

![JavaScript ghost text suggestion.](images/inline-suggestions/js-suggest.png)

When you're presented with an inline suggestion, you can accept it with the `kbstyle(Tab)` key.

Copilot tries to apply the same coding style for the code suggestions that you already have in your code. Notice in the following example that Copilot applies the same input parameter naming scheme from the `add` method for the suggested `subtract` method.

![JavaScript ghost text suggestion.](images/inline-suggestions/ts-suggest-parameter-names.png)

### Partially accepting suggestions

You might not want to accept an entire suggestion from GitHub Copilot. You can use the `kb(editor.action.inlineSuggest.acceptNextWord)` keyboard shortcut to accept either the next word of a suggestion, or the next line.

### Alternative suggestions

For any given input, Copilot might offer multiple, alternative suggestions. You can hover over the suggestion to any of the other suggestions.

![Hovering over inline suggestions enables you to select from multiple suggestions](images/inline-suggestions/copilot-hover-highlight.png)

### Generate suggestions from code comments

Instead of relying on Copilot to provide suggestions, you can provide hints about what code you expect by using code comments. For example, you could specify a type of algorithm or concept to use (for example, "use recursion" or "use a singleton pattern"), or which methods and properties to add to a class.

The following example shows how to instruct Copilot to create a class in TypeScript to represent a student, providing information about methods and properties:

![Use code comments to let Copilot generate a Student class in TypeScript with properties and methods.](images/inline-suggestions/ts-suggest-code-comment.png)

## Next Edit Suggestions

Inline suggestions are great at autocompleting a section of code currently being edited. But since most coding activity is editing existing code, it's a natural evolution of Copilot Completions to also help with edits, both near the cursor and further away.

Copilot Next Edit Suggestions (aka "Copilot NES") both predicts the location of the next edit you'll want to make, and what that edit should be.

> **Note:** Copilot NES is currently in public preview. You can sign up for NES via [the watilist]().
<!-- TODO: Signup aka.ms link -->

<!-- TODO: Add gif (could be image, but think gif is more interesting and then remaining examples can be static images) -->

### Navigating edit suggestions

When you're presented with an edit suggestion, you can navigate to it with the `kbstyle(Tab)` key and then accept it with the `kbstyle(Tab)` key again.

An arrow in the gutter indicates if there is an edit suggestion available:
<!-- TODO: Add image -->

If an edit suggestion is below the current editor view, the arrow will point down:
<!-- TODO: Add image -->

You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:
<!-- TODO: Add image -->

### Next Edit Suggestions in action

<!-- TODO: Polish entire section, add an image per example -->

The following are examples of how NES can help in a variety of scenarios.

**Renames**

* rename variable once in file, suggest to update everywhere else
* changing variables with a particular pattern: like two variables index1, index2 and renaming one to indexArr1 then the suggestion for the second should come to be made indexArr2

**Adding new variables or arguments**

* Add an argument to a function
* Add a new variable in a class, use it in an upcoming if or switch statement

**Correcting typos**

* making a mistake where letters are missing like "cont x = 5" or swapped like "conts x = 5". This should be "const x = 5"
* there are many expressions that are clearfly false "const fitsInArray = x <= arr.length" this is a bug because arrays often need the < check instead of the <=
* OR statement that should have been an AND statement

**Refactorings**

* having two conditional branches that are rewritten to use ternaries or rewrittern to have early returns or rewritten to modify common shared variables

**Changing intent**

* Point to Point3d
* function like “moveCursorUp” and then changing it from “Up” to “Down” should adjust all the code logically

**Matching coding patterns**

* Match after copy-pasting
     * copy-pasting an object declaration like a workbench action and adjusting one name, often ends up needing to adjust the function name, the natural language string, the keybinding, etc. there are these “things that come in groups” where the same concept is repeated but as a string, as an enum, etc.
     * copy-pasting some code like 2 for loops and then adjusting them to match the current code where the paste happened

## Tips & tricks

### Context

To give you relevant inline suggestions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets the Copilot see a bigger picture of your project.

### Enable or disable code completions

You can temporarily enable or disable code completions either for all languages, or for specific languages only.

1. The GitHub Copilot status icon in the VS Code Status Bar indicates whether GitHub Copilot is enabled or disabled.

    ![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/inline-suggestions/vscode-status-bar-copilot-active.jpg)

1. To enable or disable Copilot completions, first select the GitHub Copilot icon in the Status Bar.

1. If you are disabling GitHub Copilot, you are asked whether you want to disable suggestions globally, or for the language of the file you are currently editing.

    * To disable suggestions from GitHub Copilot globally, select **Disable Globally**.
    * To disable suggestions from GitHub Copilot for the specified language, select **Disable for \<language\>**.

    ![Screenshot showing the VS Code command menu for Copilot, highlighting the options to disable completions.](./images/inline-suggestions/copilot-disable-completions.png)

### Settings

* `setting(editor.inlineSuggest.enabled)` - enable or disable inline completions.

* `setting(editor.inlineSuggest.fontFamily)` - configure the font for the inline completions.

* `setting(editor.inlineSuggest.showToolbar)` - enable or disable the toolbar that appears for inline completions.

* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)` - enable or disable syntax highlighting for inline completions.

* <!-- TODO: Update to NES setting, and/or just point to code completions setting if we just base NES permissions off that -->

## Next steps

* Get started with the introductory [Copilot tutorial](/docs/copilot/getting-started-chat.md) to get set up with Copilot in VS Code and experience Copilot hands-on.

* Learn how you can use AI chat conversations with [Copilot Chat](/docs/copilot/copilot-chat.md).

## Additional resources

You can read more about [Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.
