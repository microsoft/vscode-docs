---
Order: 4
Area: editor
TOCTitle: IntelliSense
ContentId: 4E9A74AA-D778-4D1C-B369-83763B3C340F
PageTitle: IntelliSense in Visual Studio Code
DateApproved: 8/15/2016
MetaDescription: One of the core features of Visual Studio Code is IntelliSense.  Set breakpoints, step-in, inspect variables and more.
---

# IntelliSense

IntelliSense is a general term for a variety of code editing features, including: code completion, parameter info, quick info, and list members. IntelliSense is described in a number of ways such as "code completion", "content assist", and "code hinting."

![IntelliSense demo](images/intellisense/intellisense.gif)

## Where is IntelliSense for my language? 

When you first download VS Code you will see IntelliSense for JavaScript and TypeScript only. Although nearly every language has syntax highlighting, IntelliSense for other languages is provided through a language extension. 

Below are the most popular language extensions in the [Marketplace](https://marketplace.visualstudio.com/vscode). Click on an extension tile below to read the description and reviews to decide which extension is best for you. 

> Tip: For configuring and troubleshooting JavaScript IntelliSense see [here](/docs/languages/javascript#configuring-intellisense).

<div class="marketplace-extensions-languages"></div>


## IntelliSense Features

You can trigger IntelliSense in any editor window by typing <kbd>ctrl+space</kbd> or by typing a trigger character (such as `.` in JavaScript). If you continue typing characters, the list of members (variables, methods, etc.) is filtered to include only members containing your typed characters. Pressing <kbd>tab</kbd> will insert the selected member. 

![intellisense in package json](images/intellisense/intellisense_packagejson.gif)

> Tip: You can turn off IntelliSense while you type. See the [Customize IntelliSense below](#_customize_intellisense).

In addition, you can see **quick info** for each method (as provided by the language service). 

![quick info](images/intellisense/quick_outline.png)

After choosing a method you are provided with **parameter info**. 

![paramater info](images/intellisense/paramater_info.png)

## Suggestion Priority

The order and the icon to the left of the word show the IntelliSense suggestion's priority.  

> **Higher suggestion priority = higher order and a more detailed icon**

This image shows the result of triggering IntelliSense on `express` a popular [Node.js module](https://expressjs.com/). 

![image showing intellisense icons](images/intellisense/intellisense_icons.png)

Methods, variables, and objects tend to be high priority. Simple word completion, tend to be lower priority. When the priority level is equivalent, ordering is done alphabetically. 

|       |         |
| ----- | ------- |
| ![purple cube for a method](images/intellisense/method_icon.png) | Method or Function |
| ![blue cuboid for a variable](images/intellisense/variable_icon.png) | Variable | 
| ![blue circles connected by a blue line for an object](images/intellisense/object_icon.png) | Object |
| ![a square with a small fold in the top left corner indicates word completion](images/intellisense/word_completion_icon.png) | Word Completion |
| ![a square with a small fold in the top left corner indicates string completion](images/intellisense/string_completion_icon.png) | String completion |

## Customize IntelliSense

You can customize your IntelliSense experience in settings. 

> Tip: The settings shown below are the default settings. You can change these settings in your settings.json file as described [here](/docs/customization/userandworkspace.md). 

```json
{

    // Controls if quick suggestions should show up while typing
    "editor.quickSuggestions": true,

    // Controls if suggestions should be accepted with "Enter" - in addition to "Tab". Helps to avoid ambiguity between inserting new lines and accepting suggestions. 
    "editor.acceptSuggestionOnEnter": true,

    // Controls the delay in ms after which quick suggestions will show up. 
    "editor.quickSuggestionsDelay": 10
}
```

## Troubleshooting IntelliSense

If you find IntelliSense has stopped working, the language service may have crashed. Simply restart VS Code and this should solve 99% of the problems. If you continue to lack IntelliSense features after installing a language extension, open an issue in the repository of the language extension. 

> Tip: For configuring and troubleshooting JavaScript IntelliSense see [here](/docs/languages/javascript#configuring-intellisense).

> Note: Not all language extensions provide all or even some IntelliSense features. Read the extension's README to find the right fit for you. 

> Tip: You can find the issue repository for most extensions in the [Marketplace](https://marketplace.visualstudio.com/vscode). Navigate to the extension's detail page and click `Support`. 


## How does IntelliSense work? 

Each language service runs in our shared [extension host process](https://code.visualstudio.com/docs/extensions/our-approach#_stability-extension-isolation). This process is separate from the main execution process, keeping VS Code fast and responsive. The language service interacts with VS Code's main process through the extension API. 

From here the details become language dependent. The [TypeScript language service](https://github.com/Microsoft/TypeScript/wiki/Salsa), which powers both JavaScript and TypeScript, uses static analysis and will provide suggestions based on type inference, JS Docs and TypeScript definition files (you can read more about the TypeScript language service's IntelliSense strategy [here](https://github.com/Microsoft/TypeScript/wiki/Salsa#features)). Other language may implement a different strategy, including using an "execution based" model. 

## Next Steps

IntelliSense is straight forward enough. Let's keep going. 

* [JavaScript](/docs/languages/javascript.md) - Get the most out of your JavaScript development, including configuring IntelliSense.
* [Node.js](https://code.visualstudio.com/docs/runtimes/nodejs#_intellisense-and-typings) - See an example of IntelliSense in action in the Node.js walkthrough. 
* [Debugging](/docs/editor/debugging.md) - Learn how to setup debugging for your application. 

## Common Questions

* Why am I not getting any suggestions? (see image below)

![image of IntelliSense not working](images/intellisense/intellisense_error.png)

This issue can be caused by a variety of reasons. First, try restarting VS Code. If the problem persists, consult the language extension's documentation. For JavaScript specific troubleshooting, please navigate to the [JavaScript language document](/docs/languages/javascript). 

* Why am I not seeing method and variable suggestions? (see image below)

![image of IntelliSense showing no useful suggestions](images/intellisense/missing_typings.png)

This issue is caused by missing typings files in JavaScript. You can learn how to solve this issue in the [JavaScript language document](/docs/languages/javascript). For other languages, please consult the extension's documentation. 

