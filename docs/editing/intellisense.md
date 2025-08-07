---
ContentId: 80f4fa1e-d4c5-42cf-8b12-4b8e88c41c3e
DateApproved: 08/07/2025
MetaDescription:  Learn about Visual Studio Code IntelliSense (intelligent code completion).
---
# IntelliSense

IntelliSense is a general term for various code editing features including: code completion, parameter info, quick info, and member lists. IntelliSense features are sometimes called by other names such as "code completion", "content assist", and "code hinting."

<video src="images/intellisense/intellisense.mp4" title="Video that shows IntelliSense in action. When typing 'app' for an Express app, suggestions are shown, such as '_router'." autoplay loop controls muted></video>

## IntelliSense for your programming language

Visual Studio Code IntelliSense is provided for JavaScript, TypeScript, JSON, HTML, CSS, SCSS, and Less out of the box. VS Code supports word-based completions for any programming language but can also be configured to have richer IntelliSense by installing a language extension.

Below are the most popular language extensions in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode). Select an extension tile below to read the description and reviews to decide which extension is best for you.

<div class="marketplace-extensions-languages-curated"></div>

## IntelliSense features

VS Code IntelliSense features are powered by a language service. A language service provides intelligent code completions based on language semantics and an analysis of your source code. If a language service knows possible completions, the IntelliSense suggestions will pop up as you type. If you continue typing characters, the list of members (variables, methods, and more) is filtered to only include members containing your typed characters. Pressing `kbstyle(Tab)` or `kbstyle(Enter)` will insert the selected member.

You can trigger IntelliSense in any editor window by typing `kb(editor.action.triggerSuggest)` or by typing a trigger character (such as the dot character (`kbstyle(.)`) in JavaScript).

<video src="images/intellisense/intellisense_packagejson.mp4" title="Video that shows IntelliSense triggered with 'Ctrl+Space' in a 'package.json' file." autoplay loop controls muted></video>

> [!TIP]
> The suggestions control supports CamelCase filtering, which means that you can type the letters that are upper cased in a method name to limit the suggestions. For example, "cra" brings up "createApplication".

If you prefer, you can turn off IntelliSense while you type. See [Customizing IntelliSense](#customizing-intellisense), to learn how to disable or customize VS Code's IntelliSense features.

As provided by the language service, you can see **quick info** for each method by either pressing `kb(toggleSuggestionDetails)` or selecting the `>` icon. The accompanying documentation for the method expands to the side. The expanded documentation remains available and updates as you navigate the list. You can close this by pressing `kb(toggleSuggestionDetails)` again or by selecting the close icon.

<video src="images/intellisense/intellisense_docs.mp4" title="Video that shows quick info for suggestions." autoplay loop controls muted></video>

After choosing a method, you are provided with **parameter info**.

![parameter info](images/intellisense/paramater_info.png)

When applicable, a language service surfaces the underlying types in the quick info and method signatures. In the previous screenshot, you can see several `any` types. Because JavaScript is dynamic and doesn't need or enforce types, `any` suggests that the variable can be of any type.

## Types of completions

The JavaScript code in the following screenshot illustrates IntelliSense completions. IntelliSense gives both inferred proposals and the global identifiers of the project. The inferred symbols are presented first, followed by the global identifiers (indicated by the `abc` word icon).

![intellisense icons](images/intellisense/intellisense_icons.png)

VS Code IntelliSense offers different types of completions, including language server suggestions, snippets, and simple word-based textual completions.

| Icon | Name | Symbol type |
| ---- | ---- | ----------- |
| <i class="codicon codicon-symbol-method" style="color:#b180d7"></i> | Methods and Functions | `method`, `function`, `constructor`  |
| <i class="codicon codicon-symbol-variable" style="color:#75beff"></i> | Variables | `variable` |
| <i class="codicon codicon-symbol-field" style="color:#75beff"></i> | Fields | `field` |
| <i class="codicon codicon-symbol-parameter"></i> | Type parameters | `typeParameter` |
| <i class="codicon codicon-symbol-constant"></i> | Constants | `constant` |
| <i class="codicon codicon-symbol-class" style="color:#ee9d28"></i> | Classes | `class` |
| <i class="codicon codicon-symbol-interface" style="color:#75beff"></i> | Interfaces | `interface` |
| <i class="codicon codicon-symbol-structure"></i> | Structures | `struct` |
| <i class="codicon codicon-symbol-event" style="color:#ee9d28"></i> | Events | `event` |
| <i class="codicon codicon-symbol-operator"></i> | Operators | `operator` |
| <i class="codicon codicon-symbol-namespace"></i> | Modules | `module` |
| <i class="codicon codicon-symbol-property"></i> | Properties and Attributes | `property` |
| <i class="codicon codicon-symbol-enum" style="color:#ee9d28"></i> | Enumerations | `enum` |
| <i class="codicon codicon-symbol-enum-member" style="color:#75beff"></i> | Enumeration members | `enumMember` |
| <i class="codicon codicon-symbol-reference"></i> | References | `reference` |
| <i class="codicon codicon-symbol-keyword"></i> | Keywords | `keyword` |
| <i class="codicon codicon-symbol-file"></i> | Files | `file` |
| <i class="codicon codicon-symbol-folder"></i> | Folders | `folder` |
| <i class="codicon codicon-symbol-color"></i> | Colors | `color` |
| <i class="codicon codicon-symbol-ruler"></i> | Unit | `unit` |
| <i class="codicon codicon-symbol-snippet"></i> | Snippet prefixes | `snippet` |
| <i class="codicon codicon-symbol-text"></i> | Words | `text` |

## Customizing IntelliSense

You can customize your IntelliSense experience in settings and keyboard shortcuts.

### Settings

The settings shown below are the default settings. You can change these settings in the [Settings editor](/docs/configure/settings.md#settings-editor) (`kb(workbench.action.openSettings)`).

```javascript
{
    // Controls if quick suggestions should show up while typing
    "editor.quickSuggestions": {
        "other": true,
        "comments": false,
        "strings": false
    },

     // Controls whether suggestions should be accepted on commit characters. For example, in JavaScript, the semi-colon (`;`) can be a commit character that accepts a suggestion and types that character.
    "editor.acceptSuggestionOnCommitCharacter": true,

    // Controls if suggestions should be accepted on 'Enter' - in addition to 'Tab'. Helps to avoid ambiguity between inserting new lines or accepting suggestions. The value 'smart' means only accept a suggestion with Enter when it makes a textual change
    "editor.acceptSuggestionOnEnter": "on",

    // Controls the delay in ms after which quick suggestions will show up.
    "editor.quickSuggestionsDelay": 10,

    // Controls if suggestions should automatically show up when typing trigger characters
    "editor.suggestOnTriggerCharacters": true,

    // Controls if pressing tab inserts the best suggestion and if tab cycles through other suggestions
    "editor.tabCompletion": "off",

    // Controls whether sorting favours words that appear close to the cursor
    "editor.suggest.localityBonus": true,

    // Controls how suggestions are pre-selected when showing the suggest list
    "editor.suggestSelection": "first",

    // Enable word based suggestions
    "editor.wordBasedSuggestions": "matchingDocuments",

    // Enable parameter hints
    "editor.parameterHints.enabled": true,
}
```

### Tab completion

The editor supports _tab completion_, which inserts the best matching completion when pressing `kb(insertBestCompletion)`. This works regardless of the suggest control showing or not. Also, pressing `kb(insertNextSuggestion)` after inserting a suggestion inserts the next best suggestion.

<video src="images/intellisense/tabCompletion.mp4" title="Video that shows toggling between suggestions with the Tab key." autoplay loop controls muted></video>

By default, tab completion is disabled. Use the `setting(editor.tabCompletion)` setting to enable it. These values exist:

* `off` - (default) Tab completion is disabled.
* `on` - Tab completion is enabled for all suggestions and repeated invocations insert the next best suggestion.
* `onlySnippets` - Tab completion only inserts static snippets which prefix match the current line prefix.

### Locality bonus

Sorting of suggestions depends on extension information and on how well they match the current word you are typing. In addition, you can ask the editor to boost suggestions that appear closer to the cursor position, using the `setting(editor.suggest.localityBonus)` setting.

![Sorted By Locality](images/intellisense/localitybonus.png)

In the previous screenshot, you can see that `count`, `context`, and `colocated` are sorted based on the scopes in which they appear (loop, function, file).

### Suggestion selection

By default, VS Code pre-selects the first suggestion in the suggestion list. If you'd like different behavior, for example, to always select the most recently used item in the suggestion list, you can use the `setting(editor.suggestSelection)` setting.

The available `setting(editor.suggestSelection)` values are:

* `first` - (default) Always select the top list item.
* `recentlyUsed` - The previously used item is selected unless a prefix (type to select) selects a different item.
* `recentlyUsedByPrefix` - Select items based on previous prefixes that have completed those suggestions.

Selecting the most recently used item is very useful as you can quickly insert the same completion multiple times.

"Type to select" means that the current prefix (roughly the text left of the cursor) is used to filter and sort suggestions. When this happens and when its result differs from the result of `recentlyUsed`, it will be given precedence.

When using the last option, `recentlyUsedByPrefix`, VS Code remembers which item was selected for a specific prefix (partial text). For example, if you typed `co` and then selected `console`, the next time you typed `co`, the suggestion `console` would be pre-selected. This lets you quickly map various prefixes to different suggestions, for example `co` -> `console` and `con` -> `const`.

### Snippets in suggestions

By default, VS Code shows snippets and completion proposals in one control. You can modify the behavior with the `setting(editor.snippetSuggestions)` setting. To remove snippets from the suggestions control, set the value to `"none"`. If you'd like to see snippets, you can specify the order relative to suggestions; at the top (`"top"`), at the bottom (`"bottom"`), or inline ordered alphabetically (`"inline"`). The default is `"inline"`.

### Keyboard shortcuts

The keyboard shortcuts shown here are the default keyboard shortcuts. To assign a different keyboard shortcut, use the [Keyboard Shortcuts editor](/docs/configure/keybindings.md) (`kb(workbench.action.openGlobalKeybindings)`).

| Command | Keybinding |
| --- | --- |
| `editor.action.triggerSuggest` | `kb(editor.action.triggerSuggest)` |
| `toggleSuggestionDetails` | `kb(toggleSuggestionDetails)` |
| `toggleSuggestionFocus` | `kb(toggleSuggestionFocus)` |

> [!TIP]
> There are many more keyboard shortcuts related to IntelliSense. Open the **Default Keyboard Shortcuts** (**File** > **Preferences** > **Keyboard Shortcuts**) and search for "suggest".

## Enhance completions with AI

GitHub Copilot provides coding suggestions as you type in your editor. You can also ask Copilot coding-related questions, such as how best to code something, how to fix a bug, or how someone else's code works.

To get started:

1. Install the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot).

1. Discover the key functionality with our [Copilot quickstart](/docs/copilot/getting-started.md).

> [!TIP]
> If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Troubleshooting

If you find IntelliSense has stopped working, the language service may not be running. Try restarting VS Code and this should solve the issue. If you are still missing IntelliSense features after installing a language extension, open an issue in the repository of the language extension.

> [!TIP]
> For configuring and troubleshooting JavaScript IntelliSense, see the [JavaScript documentation](/docs/languages/javascript.md#intellisense).

A particular language extension may not support all the VS Code IntelliSense features. Review the extension's README to find out what is supported. If you think there are issues with a language extension, you can usually find the issue repository for an extension through the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode). Navigate to the extension's Details page and select the **Support** link.

## Next steps

IntelliSense is just one of VS Code's powerful features. Read on to learn more:

* [Debugging](/docs/debugtest/debugging.md) - Learn how to set up debugging for your application.
* [Creating Language extensions](/api/language-extensions/programmatic-language-features.md) - Learn how to create extensions that add IntelliSense for new programming languages.
* [GitHub Copilot in VS Code](/docs/copilot/overview.md) - Learn how to use AI with GitHub Copilot to enhance your coding.

## Common questions

### Why am I not getting any suggestions?

This can be caused by a variety of reasons. First, try restarting VS Code. If the problem persists, consult the language extension's documentation. For JavaScript-specific troubleshooting, please see the [JavaScript language topic](/docs/languages/javascript.md#intellisense).

### Why am I not seeing method and variable suggestions?

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

This issue is caused by missing type declaration (typings) files in JavaScript. Most common JavaScript libraries ship with declaration files or have type declaration files available.

Make sure to install the corresponding npm or yarn package for the library you are using. Learn more about IntelliSense in the [Working with JavaScript](/docs/nodejs/working-with-javascript.md#intellisense) article. For other languages, please consult the extension's documentation.
