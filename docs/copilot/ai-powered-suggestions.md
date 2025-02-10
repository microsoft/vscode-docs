---
Order: 5
Area: copilot
TOCTitle: Code Completions
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
PageTitle: AI-powered code completions with GitHub Copilot
DateApproved: 02/06/2025
MetaDescription: Enhance your coding with AI-powered code completions from GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Code completions with GitHub Copilot in VS Code

GitHub Copilot acts as an AI-powered pair programmer, automatically offering suggestions to complete your code, comments, tests, and more. It provides these suggestions directly in the editor while you write your code, and it can work with a broad range of programming languages and frameworks.

Copilot provides two kinds of suggestions:

* **Code completions** - Start typing in the editor, and Copilot provides code suggestions that match your coding style and take your existing code into account.

* **Next Edit Suggestions (preview)** - Predict your next code edit with Copilot Next Edit Suggestions, aka Copilot NES. Based on the edits you're making, Copilot NES both predicts the location of the next edit you'll want to make and what that edit should be.

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

## Next Edit Suggestions (preview)

Inline suggestions are great at autocompleting a section of code. But since most coding activity is editing existing code, it's a natural evolution of Copilot code completions to also help with edits, both at the cursor and further away. Edits are often not made in isolation - there's a logical flow of what edits need to be made in different scenarios. Copilot Next Edit Suggestions (Copilot NES) is this evolution.

<video src="./images/inline-suggestions/nes-video.mp4" title="Copilot NES video" controls poster="./images/inline-suggestions/point3d.png"></video>

Based on the edits you're making, Copilot NES both predicts the location of the next edit you'll want to make and what that edit should be. Copilot NES helps you stay in the flow, suggesting future changes relevant to your current work, and you can simply `kbstyle(Tab)` to quickly navigate and accept Copilot's suggestions. Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

### Enabling edit suggestions

Copilot NES is currently in preview. You can enable it via the VS Code setting `setting(github.copilot.nextEditSuggestions.enabled)`:

1. Open the VS Code Settings editor (`kb(workbench.action.openSettings)`)
1. Search for `github.copilot.nextEditSuggestions.enabled`
1. Enable the setting

If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of Copilot "Editor Preview Features," in addition to you setting `setting(github.copilot.nextEditSuggestions.enabled)` in your editor.

You can learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

### Navigate and accept edit suggestions

You can quickly navigate suggested code changes with the `kbstyle(Tab)` key, saving you time to find the next relevant edit (no manual searching through files or references required). You can then accept a suggestion with the `kbstyle(Tab)` key again.

An arrow in the gutter indicates if there is an edit suggestion available. You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:
![Copilot NES gutter menu expanded](./images/inline-suggestions/gutter-menu-highlighted-updated.png)

If an edit suggestion is below the current editor view, the arrow will point down instead of right:
![Copilot NES with arrow directions changing](./images/inline-suggestions/nes-arrow-directions.gif)
<!-- ![Copilot NES with right arrow](./images/inline-suggestions/scan-right-highlight.png) -->
<!-- ![Copilot NES with down arrow](./images/inline-suggestions/scan-down-highlight.png) -->

### Use cases for Next Edit Suggestions

**Catching and correcting mistakes**

* **Copilot helps with simple mistakes like typos.** It'll suggest fixes where letters are missing or swapped, like `cont x = 5` or `conts x = 5`, which should've been `const x = 5`.

    ![Copilot NES fixing a typo from "conts" to "const"](./images/inline-suggestions/nes-typo.gif)

* **Copilot can also help with more challenging mistakes in logic**, like an inverted ternary expression:

    ![Copilot NES fixing a fibonacci logic mistake](./images/inline-suggestions/nes-fib-logic.gif)

    Or a comparison that should've used `&&` instead of `||`:

    ![Copilot NES fixing an if statement mistake](./images/inline-suggestions/nes-de-morgan.gif)

**Changing intent**

* **Copilot suggests changes to the rest of your code that match a new change in intent.** For example, when changing a class from `Point` to `Point3D`, Copilot will suggest to add a `z` variable to the class definition. After accepting the change, Copilot NES next recommends adding `z` to the distance calculation:

    ![Copilot NES gif for updating Point to Point3D](./images/inline-suggestions/nes-point.gif)
    <!-- ![Copilot NES for updating Point to Point3D](./images/inline-suggestions/point3d.png)

    ![Copilot NES for adding z to distance calculation of Point3D](./images/inline-suggestions/point3d-distance.png) -->

**Adding new variables or logic**

* **Using newly added arguments, variables, or functions**. Copilot helps you use new code you just added. This may be a small change, like calling a new method parameter in the actual method.

    It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, Copilot will first suggest to clean up the command in `extension.ts`. Then when you open `package.json`, Copilot suggests registering that command as well:

    ![Updating extension.ts and package.json with a new command](./images/inline-suggestions/nes-extension-and-package.gif)

    <!-- ![Add command in package.json](./images/inline-suggestions/add-disposable.png)
    ![Add command in package.json](./images/inline-suggestions/call-disposable-full.png) -->

**Refactoring**

* **Rename a variable once in a file, and Copilot will suggest to update it everywhere else.** If you use a new name or naming pattern, Copilot suggests to update subsequent code similarly.

    ![Copilot NES suggesting change after updating function name](./images/inline-suggestions/nes-gutter.gif)

* **Matching code style**. After copy-pasting some code, Copilot will suggest how to adjust it to match the current code where the paste happened.

### Further configuring edit suggestions

To use Copilot NES, you must set `setting(github.copilot.nextEditSuggestions.enabled)`. There are a couple of additional settings you can also use to configure your Copilot NES experience:

* `setting(editor.inlineSuggest.edits.codeShifting)`: You can disable this setting if you never want Copilot NES to shift your code to show a suggestion.

* `setting(editor.inlineSuggest.edits.renderSideBySide)`:

     * **auto (default)**: Show larger suggestions side-by-side if there is enough space in the viewport, otherwise the suggestions are shown below the relevant code.
     * **never**: Always show larger suggestions below the relevant code.

## Tips & tricks

### Context

To give you relevant inline suggestions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets Copilot get a bigger picture of your project.

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

* `setting(github.copilot.nextEditSuggestions.enabled)` - enable Copilot Next Edit Suggestions (Copilot NES).

* `setting(editor.inlineSuggest.edits.codeShifting)` - configure if Copilot NES is able to shift your code to show a suggestion.

* `setting(editor.inlineSuggest.edits.renderSideBySide)` - configure if Copilot NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code.

## Next steps

* Get started with the introductory [Copilot tutorial](/docs/copilot/getting-started-chat.md) to get set up with Copilot in VS Code and experience Copilot hands-on.

* Learn how you can use AI chat conversations with [Copilot Chat](/docs/copilot/copilot-chat.md).

## Additional resources

You can read more about [Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.
