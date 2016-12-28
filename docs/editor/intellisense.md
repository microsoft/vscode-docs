---
Order: 4
Area: editor
TOCTitle: IntelliSense
ContentId: 80f4fa1e-d4c5-42cf-8b12-4b8e88c41c3e
PageTitle: IntelliSense in Visual Studio Code
DateApproved: 12/14/2016
MetaDescription:  Learn about Visual Studio Code IntelliSense (intelligent code completion). 
---

# IntelliSense

IntelliSense is a general term for a variety of code editing features including: code completion, parameter info, quick info, and member lists. IntelliSense features are sometimes called by other names such as "code completion", "content assist", and "code hinting."

![IntelliSense demo](images/intellisense/intellisense.gif)

## IntelliSense for your programming language

VS Code IntelliSense is provided for JavaScript, TypeScript, JSON, HTML, CSS, Less, and Sass out of the box. VS Code supports word based completions for any programming language but can also be configured to have richer IntelliSense by installing a language extension.

Below are the most popular language extensions in the [Marketplace](https://marketplace.visualstudio.com/vscode). Click on an extension tile below to read the description and reviews to decide which extension is best for you.

<div class="marketplace-extensions-languages"></div>

## IntelliSense Features

VS Code IntelliSense features are powered by a language service. A language service provides intelligent code completions based on language semantics and an analysis of your source code. If a language service knows possible completions, the IntelliSense suggestions will pop up as you type. If you continue typing characters, the list of members (variables, methods, etc.) is filtered to include only members containing your typed characters. Pressing `kbstyle(Tab)` or `kbstyle(Enter)` will insert the selected member.

You can trigger IntelliSense in any editor window by typing `kb(editor.action.triggerSuggest)` or by typing a trigger character (such as the dot character (`kbstyle(.)`) in JavaScript).

![intellisense in package json](images/intellisense/intellisense_packagejson.gif)

> **Tip:** The suggestions widget supports CamelCase filtering meaning you can type the upper case letters of a method name to limit the suggestions. For example, "cra" will quickly bring up "createApplication".

If you prefer, you can turn off IntelliSense while you type. See [Customizing IntelliSense](/docs/editor/intellisense.md#customizing-intellisense) below to learn how to disable or customize VS Code's IntelliSense features.

As provided by the language service, you can see **quick info** for each method.

![quick info](images/intellisense/quick_outline.png)

After choosing a method you are provided with **parameter info**.

![parameter info](images/intellisense/paramater_info.png)

When applicable, a language service will surface the underlying types in the quick info and method signatures. In the image above, you can see several `any` types. Because JavaScript is dynamic and doesn't need or enforce types, `any` suggests that the variable can be of any type.

## Types of Completions

The JavaScript code below illustrates IntelliSense completions. IntelliSense gives both inferred proposals and the global identifiers of the project. The inferred symbols are presented first, followed by the global identifiers (shown by the document icon).

![intellisense icons](images/intellisense/intellisense_icons.png)

VS Code IntelliSense offers different types of completions, including language server suggestions, snippets, and simple word based textual completions.

|       |         |
| ----- | ------- |
| ![method icon](images/intellisense/method_icon.png) | Methods, Functions, or Constructors |
| ![variable icon](images/intellisense/variable_icon.png) | Variables |
| ![class](images/intellisense/class_icon.png) | Classes |
| ![interface](images/intellisense/interface_icon.png) | Interfaces |
| ![module](images/intellisense/module_icon.png) | Modules |
| ![property](images/intellisense/property_icon.png) | Properties and Attributes |
| ![symbol](images/intellisense/enum_icon.png) | Enumerations |
| ![symbol](images/intellisense/symbol_icon.png) | Symbols |
| ![keyword](images/intellisense/keyword_icon.png) | Keywords |
| ![value](images/intellisense/value_icon.png) | Values |
| ![global identifiers](images/intellisense/file_icon.png) | Global Identifiers |
| ![a square with ellipses forming the bottom show snippet prefix](images/intellisense/snippet_icon.png) | Snippet Prefixes |
| ![a square with letters abc word completion](images/intellisense/word_completion_icon.png) | Words |

## Customizing IntelliSense

You can customize your IntelliSense experience in settings and key bindings.

### Settings

The settings shown below are the default settings. You can change these settings in your `settings.json` file as described in [User and Workspace Settings](/docs/customization/userandworkspace.md).

```javascript
{
    // Controls if quick suggestions should show up while typing
    "editor.quickSuggestions": true,

    // Controls if suggestions should be accepted with "Enter" - in addition to "Tab". Helps to avoid ambiguity between inserting new lines and accepting suggestions.
    "editor.acceptSuggestionOnEnter": true,

    // Controls the delay in ms after which quick suggestions will show up.
    "editor.quickSuggestionsDelay": 10,

    // Enable word based suggestions
    "editor.wordBasedSuggestions": true
}
```

By default, VS Code shows snippets and completion proposals in one widget. You can control the behavior with the `editor.snippetSuggestions` setting. To remove snippets from the suggestions widget, set the value to `"none"`. If you'd like to see snippets, you can specify the order relative to suggestions; at the top (`"top"`), at the bottom (`"bottom`"), or inline ordered alphabetically (`"inline"`). The default is `"inline"`.

### Key Bindings

The key binding shown below is the default key binding. You can change this key binding in your `keybindings.json` file as described in [Key Bindings](/docs/customization/keybindings.md).

> **Note:** There are many more key bindings relating to IntelliSense. Simply open the **Default Keyboard Shortcuts** (**File** > **Preferences** > **Keyboard Shortcuts**) and search for "suggest".

```json
{
    {
       "key": "ctrl+space",
       "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    }
}
```

## Troubleshooting

If you find IntelliSense has stopped working, the language service may not be running. Simply restart VS Code and this should solve the issue. If you are still missing IntelliSense features after installing a language extension, open an issue in the repository of the language extension.

> **Tip:** For configuring and troubleshooting JavaScript IntelliSense see [here](/docs/languages/javascript.md#intellisense).

A particular language extension may not support all the VS Code IntelliSense features. Review the extension's README to find out what is supported. If you think there are issues with a language extension, you can usually find the issue repository for an extension through the [Marketplace](https://marketplace.visualstudio.com/vscode). Navigate to the extension's detail page and click the `Support` link.

## Next Steps

IntelliSense is just one of VS Code's powerful features. Read on to learn more:

* [JavaScript](/docs/languages/javascript.md) - Get the most out of your JavaScript development, including configuring IntelliSense.
* [Node.js](/docs/runtimes/nodejs.md#intellisense-and-typings) - See an example of IntelliSense in action in the Node.js walkthrough.
* [Debugging](/docs/editor/debugging.md) - Learn how to set up debugging for your application.

## Common Questions

**Q: Why am I not getting any suggestions?**

![image of IntelliSense not working](images/intellisense/intellisense_error.png)

**A:** This can be caused by a variety of reasons. First, try restarting VS Code. If the problem persists, consult the language extension's documentation. For JavaScript specific troubleshooting, please see the [JavaScript language topic](/docs/languages/javascript.md#intellisense).

**Q: Why am I not seeing method and variable suggestions?**

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

**A:** This issue is caused by missing Typings files in JavaScript. You can learn how to solve this issue in the [JavaScript language topic](/docs/languages/javascript.md#intellisense). For other languages, please consult the extension's documentation.

