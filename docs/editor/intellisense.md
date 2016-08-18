---
Order: 6
Area: editor
TOCTitle: IntelliSense
ContentId: 4E9A74AA-D778-4D1C-B369-83763B3C340F
PageTitle: IntelliSense in Visual Studio Code
DateApproved: 8/15/2016
MetaDescription: One of the core features of Visual Studio Code is IntelliSense.  Set breakpoints, step-in, inspect variables and more.
---

# IntelliSense

IntelliSense is a core features of Visual Studio Code. 

![IntelliSense demo](images/intellisense/intellisense.gif)

When you first download VS Code you will see syntax highlighting for all languages. To have the full IntelliSense experience you will need to install an extension. 

## Language Service Extensions

IntelliSense for JavaScript and TypeScript is provided out of the box through the [TypeScript](https://github.com/Microsoft/TypeScript/wiki/Salsa) language service. For other languages you will need to [install a language service extension](/docs/editor/extension-gallery).

<div class="marketplace-extensions-languages"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. 

> Tip: For configuring and troubleshooting JavaScript IntelliSense see [here](/docs/languages/javascript#configuring-intellisense).

## What is IntelliSense?

IntelliSense is a general term for a variety of code editing features, including: code completion, paramter info, quick info, and list members. IntelliSense has been described in a number of ways. 

* IntelliSense is intelligent code completion.
* IntelliSense is docs at your finger tips
* IntelliSense provides instant context-aware help. 

In other tools, IntelliSense goes by the terms "code completion", "auto code completion", "content assist", or "code hinting."

## Using IntelliSense

IntelliSense is very easy to use. Simply begin typing. While you type the language service will provide code completion and on certain characters (for example `.`) method suggestions will appear. 

> Tip: You can trigger IntelliSense in any editor window by typing <kbd>ctrl+space</kbd>. 

## IntelliSense Suggestion Priority

IntelliSense is context aware and will provide you with the best recommendation possible. The order and the icon to the left of the word indicate the priority of each suggestion. The language service provides this information. 

**Higher suggestion priority = higher order and a more detailed icon**

Methods, variables, and objects tend to have high priority. Simple word completion, tends to be lower priority. When the priority level is equivalent, ordering is done alphabetically. 

|       |         |
| ----- | ------- |
| ![purple cube for a method](images/intellisense/method_icon.png) | Method or Function |
| ![blue cuboid for a variable](images/intellisense/variable_icon.png) | Variable | 
| ![blue circles connected by a blue line for an object](images/intellisense/object_icon.png) | Object |
| ![a square with a small fold in the top left corner indicates word completion](images/intellisense/word_completion_icon.png) | Word Completion |

This image shows the result of triggering IntelliSense on `express` a popular [Node.js module](https://expressjs.com/). 

![image showing intellisense icons](images/intellisense/intellisense_icons.png)




## Customize IntelliSense

You can customize your IntelliSense experience in [settings](/docs/customization/userandworkspace.md). 

```json
{
    // Default settings shown below. Override by writing the setting in settings.json. 

    // Controls if quick suggestions should show up while typing
    "editor.quickSuggestions": true,

    // Controls if suggestions should be accetped with "Enter" - in addition to "Tab". Helps to avoid ambiguity between inserting new lines and accepting suggestions. 
    "editor.acceptSuggestionOnEnter": true,

    // Controls the delay in ms after which quick suggestions will show up. 
    "editor.quickSuggestionsDelay": 10
}
```

## Next Steps

IntelliSense is straight forward enough. Let's keep going. 

* [JavaScript](/docs/languages/javascript.md) - Get the most out of your JavaScript development, including configuring IntelliSense.

## Common Questions

* Why am I not getting any suggestions? (see image below)

![image of IntelliSense not working](images/intellisense/intellisense_error.png)

This issue can be caused by a variety of reasons. For JavaScript specific troubleshooting, please go to the troubleshooting section [here](/docs/languages/javascript#troubleshooting-intellisense). For other languages you will need to consult the language service extension's documentation. 

* Why am I only seeing word completion suggestions?

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

This issue is caused by missing typings files in JavaScript. You can learn how to solve this issue [here](/docs/languages/javascript#third-party-intellisense). For other languages, please consult the language service extension's documentation. 

