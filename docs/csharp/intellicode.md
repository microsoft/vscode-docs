---
Order: 4
Area: csharp
TOCTitle: IntelliCode
ContentId: 0a0fd079-c56b-413c-8394-b166cd76be38
PageTitle: IntelliCode for C# in Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: IntelliCode for C# in Visual Studio Code
---

# IntelliCode for C# Dev Kit

For users of the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension in Visual Studio Code, the [IntelliCode for C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp) extension is available to provide IntelliCode support. Predictions of up to a whole-line of code, along with ranking methods and properties in the IntelliSense list are available for C# Dev Kit users.

## Whole line suggestions

**Scenario 1**: When grey-text is shown, press `kbstyle(Tab)` to accept the prediction (suggestion).

![Press Tab to accept prediction](images/intellicode/accept-prediction.gif)

**Scenario 2**: When grey-text is shown along with the IntelliSense list, press `kbstyle(Tab)` to accept the IntelliSense list selection, then `kbstyle(Tab)` again to accept the rest of the multi-token prediction. In this scenario, you can use the IntelliSense list selection to steer the multi-token prediction offered by IntelliCode.

![Use list selection to steer multi-choice prediction](images/intellicode/multi-token-prediction.gif)

Additionally, if the model is suggesting that a string should exist, but does not have a suggestion for the string, pressing `kbstyle(Tab)` places the cursor into the empty string, making it easier for you to complete your line of code.

This model makes predictions on what you'll type next based on a rich knowledge of what you have coded so far, which includes:

* Variable names and positions
* Libraries you're using
* Functions in nearby code
* The IntelliSense list

## Starred suggestions

This extension provides AI-assisted IntelliSense by showing recommended completion items for your code context at the top of the completions list.

![Ranks methods and properties in the IntelliSense list with stars](images/intellicode/rank-methods.png)

When it comes to overloads, rather than taking the time to cycle through the alphabetical list of member, IntelliCode presents the most relevant one first. This extension not only ranks known methods, but its deep learning model also ranks methods that are unique to your code.

To see AI-assisted ranking in the IntelliSense list, you must first open a C# file that is a part of a solution. C# files that aren't a part of a solution won't have this functionality available.

## Security and Privacy

All your code stays local – the model runs right on your computer - so there's no need to transmit code to a remote server for custom model training. This is enabled by our machine learning system design, which led to dramatically reduced memory footprint and improved inference speed.

Since models powering IntelliCode features run on your local machine, this allows IntelliCode support to be available in offline and air gapped environments.

## Get support for other languages

To get IntelliCode whole-line autocompletions for Python, JavaScript, and TypeScript in VS Code, install the general [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) extension. The general extension also ranks methods and properties in the IntelliSense list with stars for Python and SQL, in addition to the languages supported for whole-line autocomplete.

## Prerequisites

In order to use this extension, you must have both the C# Dev Kit and .NET 6 installed and enabled on your machine. This extension supports the following platforms and operating systems:

* **Windows**: x64 and ARM
  * x64 & ARM tested on Windows 11 22H2
* **macOS**: x64 and ARM.
  * x64 tested on OS X Monterey v12.6.5
  * ARM tested on OS X v PENDING
* **Linux**: x64 and ARM.
  * x64 Tested on Ubuntu 22.04

## How do I report feedback and issues

You can file an issue on our IntelliCode for VS Code extension [GitHub feedback repo](https://github.com/MicrosoftDocs/intellicode/issues).
