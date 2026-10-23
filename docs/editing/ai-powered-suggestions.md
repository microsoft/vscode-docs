---
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
DateApproved: 10/21/2026
MetaDescription: Get AI-powered ghost text completions and next edit suggestions in {% data variables.product.prodname_vscode_shortname %}.
Keywords: [nes, suggestions, inline completions, ghost text, next edit suggestions]
---
# Inline suggestions from GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}

Use inline suggestions when you want to keep writing code yourself, with help completing code, comments, or tests and making related edits. {% data variables.product.prodname_copilot %} suggests changes in the editor as you type. You review each suggestion and decide whether to accept it, accept part of it, or keep typing.

{% data variables.product.prodname_copilot_short %} uses your existing code as context for two kinds of suggestions:

* **Ghost text suggestions**: Dimmed text at your cursor suggests how to complete the code you're writing.

* **Next edit suggestions**: Based on your recent edits, {% data variables.product.prodname_copilot_short %} suggests another change and where to make it.

You don't need to start a chat for inline suggestions. You can also [combine them with chat and agents](#combine-suggestions-with-chat-and-agents) as your task changes.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in {% data variables.product.prodname_vscode_shortname %}.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

## Prerequisites

* {% data variables.product.prodname_vscode %} installed on your machine. Follow these steps to [set up {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md).
* Access to a GitHub Copilot subscription. Follow these steps to [set up GitHub Copilot](/docs/setup/copilot.md). You can set up {% data variables.copilot.copilot_free_short %} to get a monthly allowance of inline suggestions and AI credits.

## Ghost text suggestions

### Getting your first suggestions

Copilot offers dimmed *ghost text* suggestions as you type: sometimes the completion of the current line, sometimes a whole new block of code.

1. Open a file in a programming language of your choice and start typing. You should see inline suggestions from Copilot as you type.

    The following example shows how Copilot suggests an implementation of the `calculateDaysBetweenDates` JavaScript function by using dimmed *ghost text*:

    ![JavaScript ghost text suggestion.](images/inline-suggestions/js-suggest.png)

1. Review the suggested code. Press `kbstyle(Tab)` to accept it, or `kbstyle(Escape)` to dismiss it.

    To accept only part of a suggestion:

    * Use `kb(editor.action.inlineSuggest.acceptNextWord)` to accept the next word.
    * Run **Accept Next Line Of Inline Suggestion** from the Command Palette (`kb(workbench.action.showCommands)`) to accept the next line.

1. Continue editing and check that the accepted code does what you intended. Suggestions can be incorrect, so run the relevant tests before relying on the result.

### Alternative suggestions

For a given input, {% data variables.product.prodname_copilot_short %} might offer more than one suggestion. Hover over the suggestion to see the toolbar, then use its next and previous controls to compare alternatives.

![Hovering over inline suggestions enables you to select from multiple suggestions](images/inline-suggestions/copilot-hover-highlight.png)

### Generate suggestions from code comments

Instead of relying on Copilot to provide suggestions, you can provide hints about what code you expect by using code comments. For example, you could specify a type of algorithm or concept to use (for example, "use recursion" or "use a singleton pattern"), or which methods and properties to add to a class.

The following example shows how to instruct Copilot to create a class in TypeScript to represent a student, providing information about methods and properties:

![Use code comments to let Copilot generate a Student class in TypeScript with properties and methods.](images/inline-suggestions/ts-suggest-code-comment.png)

## Next edit suggestions

When one edit leads to another, next edit suggestions help you make the related changes. For example, after you add a parameter to a function, {% data variables.product.prodname_copilot_short %} can suggest updates to code that uses it. Suggestions can appear at your cursor or elsewhere in the file, and can change a symbol, a line, or several lines.

<video src="./images/inline-suggestions/nes-video.mp4" title="Video showing next edit suggestions in action on a Point typescript class." loop controls muted poster="./images/inline-suggestions/point3d.png"></video>

To use next edit suggestions (Copilot NES), verify that `setting(github.copilot.nextEditSuggestions.enabled)` is enabled.

### Navigate and accept edit suggestions

Press `kbstyle(Tab)` to navigate to a suggested edit. Review the proposed change, then press `kbstyle(Tab)` again to accept it or `kbstyle(Escape)` to dismiss it.

An arrow in the gutter indicates if there is an edit suggestion available. The arrow indicates where the next edit suggestion is located, relative to your current cursor position.

You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:

![Copilot NES gutter menu expanded](./images/inline-suggestions/gutter-menu-highlighted-updated.png)

> [!IMPORTANT]
> If you are a [{% data variables.product.prodname_vscode_shortname %} vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) user, please use the latest version of the extension to avoid any conflicts in keybindings with NES.

### Reduce distractions by edit suggestions

By default, edit suggestions are indicated by the gutter arrow and the code changes are shown in the editor. Enable `setting(editor.inlineSuggest.edits.showCollapsed)` to keep the suggested changes collapsed until you navigate to them. Alternatively, hover over the gutter arrow and select **Show Collapsed** from the menu.

### Use cases for next edit suggestions

**Catching and correcting mistakes**

* **Copilot helps with simple mistakes like typos.** It'll suggest fixes where letters are missing or swapped, like `cont x = 5` or `conts x = 5`, which should've been `const x = 5`.

    ![NES fixing a typo from "conts" to "const"](./images/inline-suggestions/nes-typo.png)

* **Copilot can also help with more challenging mistakes in logic**, like an inverted ternary expression:

    ![NES fixing a ternary logic mistake](./images/inline-suggestions/nes-ternary-logic.png)

    Or a comparison that should've used `&&` instead of `||`:

    ![NES fixing an if statement mistake](./images/inline-suggestions/nes-de-morgan.png)

**Changing intent**

* **Copilot suggests changes to the rest of your code that match a new change in intent.** For example, when changing a class from `Point` to `Point3D`, Copilot will suggest to add a `z` variable to the class definition. After accepting the change, Copilot NES next recommends adding `z` to the distance calculation:

    ![NES gif for updating Point to Point3D](./images/inline-suggestions/nes-point.png)

**Refactoring**

* **Rename a variable once in a file, and Copilot will suggest to update it everywhere else.** If you use a new name or naming pattern, Copilot suggests to update subsequent code similarly.

    ![Copilot NES suggesting change after updating function name](./images/inline-suggestions/nes-rename.png)

* **Matching code style**. After copy-pasting some code, Copilot will suggest how to adjust it to match the current code where the paste happened.

## Enable or disable inline suggestions

You can enable or disable inline suggestions either for all languages or for specific languages only. To enable or disable inline suggestions, select the Copilot menu in the Status Bar, and then check or uncheck the options to enable or disable inline suggestions. The option to disable inline suggestions for a specific language is dependent on the language of the active editor.

![Screenshot of the Copilot menu in the Status Bar with Snooze and Cancel Snooze buttons.](images/inline-suggestions/snooze-code-completions.png)

Alternatively, modify the `setting(github.copilot.enable)` setting in the Settings editor. Add an entry for each language you want to enable or disable inline suggestions for. To enable or disable inline suggestions for all languages, set the value for `*` to `true` or `false`.

To temporarily disable all inline suggestions in the editor, select the Copilot menu in the Status Bar, and then select the **Snooze** button to increment the snooze time by five minutes. To resume inline suggestions, select the **Cancel Snooze** button in the Copilot menu.

Alternatively, use the **Snooze Inline Suggestions** and **Cancel Snooze Inline Suggestions** commands in the Command Palette.

## Use inline suggestions on metered connections

When {% data variables.product.prodname_vscode_shortname %} treats your network connection as metered, {% data variables.product.prodname_copilot %} does not start new automatic ghost text or next edit suggestion requests. Requests already in progress continue.

You can still request a suggestion explicitly. Run the **Trigger Inline Suggestion** command from the Command Palette.

This behavior applies only to the built-in {% data variables.product.prodname_copilot_short %} provider. It does not change how local-only or third-party completion providers behave.

## Change the AI model for suggestions

Different Large Language Models (LLMs) are trained on different types of data and might have different capabilities and strengths. Learn more about how to [choose between different AI language models](/docs/agent-customization/language-models.md) in {% data variables.product.prodname_vscode_shortname %}.

To change the language model that is used for generating ghost text suggestions in the editor:

1. Select **Configure Inline Suggestions...** from the Chat menu in the {% data variables.product.prodname_vscode_shortname %} title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

> [!NOTE]
> The list of available models might vary and change over time. When no alternative models are available, the option to change the model is not available.
>
> If you are a {% data variables.copilot.copilot_business_short %} or Enterprise user, your Administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Tips & tricks

### Context

To give you relevant inline suggestions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in {% data variables.product.prodname_vscode_shortname %} while using Copilot helps set this context and lets Copilot get a bigger picture of your project.

### Guide suggestions with your code

Inline suggestions use the code around your cursor as context. Make your intent clear in the code you want to complete:

* **Use descriptive names and comments.** Name functions for the behavior they implement. Use a short module comment to explain its purpose, and focused function comments to specify inputs, expected results, or constraints that aren't clear from the name.
* **Include the imports you intend to use.** Existing imports help indicate the libraries and APIs that fit your project. For example, importing your project's logging library provides a more specific starting point than leaving the logging choice unspecified.
* **Provide a representative example.** Keep a small, correct example of the intended API or coding pattern in a related open file. This can help when working with an unfamiliar library version. Don't leave temporary sample code in production files.
* **Keep patterns consistent and review the result.** Suggestions can repeat mistakes in surrounding code as well as useful patterns. Check the proposed APIs, dependencies, and behavior before accepting a suggestion.

## Combine suggestions with chat and agents

Inline suggestions are one way to work with AI, not a choice that locks you out of other approaches:

* For a focused edit described in your own words, use [inline chat](/docs/chat/inline-chat.md#use-editor-inline-chat).

* To ask questions or work through a larger change beside your code, use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md).

* To assign tasks and manage agent sessions across projects, use the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

You can keep using inline suggestions while working with chat or agents. If you already have an agent conversation, see how to [continue a supported session in another interface](/docs/agents/run/sessions/manage-sessions.md#continue-an-existing-session).

## Settings

### Ghost text suggestions settings

* `setting(github.copilot.enable)` - enable or disable inline completions for all or specific languages.

* `setting(editor.inlineSuggest.fontFamily)` - configure the font for the inline completions.

* `setting(editor.inlineSuggest.showToolbar)` - enable or disable the toolbar that appears for inline completions.

* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)` - enable or disable syntax highlighting for inline completions.

### Next edit suggestions settings

* `setting(github.copilot.nextEditSuggestions.enabled)` - enable Copilot next edit suggestions (Copilot NES).

* `setting(editor.inlineSuggest.edits.allowCodeShifting)` - configure if Copilot NES is able to shift your code to show a suggestion.

* `setting(editor.inlineSuggest.edits.renderSideBySide)` - configure if Copilot NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code.

     * **auto (default)**: show larger edit suggestions side-by-side if there is enough space in the viewport, otherwise the suggestions are shown below the relevant code.
     * **never**: never show suggestions side-by-side, always show suggestions below the relevant code.

* `setting(github.copilot.nextEditSuggestions.fixes)` - enable next edit suggestions based on diagnostics (squiggles). For example, missing imports.

* `setting(editor.inlineSuggest.minShowDelay)` - Time in milliseconds to wait before showing inline suggestions. Default is `0`.

## Next steps

* Discover the key features in the [Quickstart](/docs/agents/quickstart.md).

* Watch the videos in our [{% data variables.product.prodname_vscode_shortname %} Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube.
