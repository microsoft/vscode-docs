---
Order: 9
Area: cpp
TOCTitle: Editing and Navigating
ContentId: 61D63E54-67E2-4743-B5CB-C6E7F582982A
PageTitle: Edit and navigate
DateApproved: 1/2/2024
MetaDescription: How to edit and navigate C++ source files in Visual Studio Code.
---
# Editing and Navigating

This article provides an overview of code editing and navigating features specific to the C/C++ Extension. For more information about general editing and navigating in Visual Studio Code, see [Basic Editing](/docs/editor/codebasics.md) and [Code Navigation](/docs/editor/editingevolved.md).

## Editing Set Up

To provide the best editing experience, the C++ extension needs to know where it can find each header file referenced in your code. By default, the extension searches the current source directory, its subdirectories, and some platform-specific locations. If a referenced header file can't be found, a red squiggle is displayed underneath the #include directive.

To specify additional include directories, select an #include that has no reference. Next, select the light bulb that appears and choose `Edit "includePath" setting`, which opens the C/C++ Extension's Configurations interface. Under the Include Path section, you can specify the paths for any additional include directories.

![Process of adding a new header to the include path](images\intellisense\AddingIncludePathToConfig.gif)

## List members

When you type a member access symbol (`.` or `->`) the editor displays a list of members. As you type more letters, the list is filtered in real time:

![List members](images/cpp/list-members-cpp.png)

### Code formatting

The C/C++ extension for Visual Studio Code supports source code formatting using [clang-format](https://clang.llvm.org/docs/ClangFormat.html), which is included with the extension.

You can format an entire file with **Format Document** (`kb(editor.action.formatDocument)`) or just the current selection with **Format Selection** (`kb(editor.action.formatSelection)`) in right-click context menu. You can also configure autoformatting with the following [settings](/docs/getstarted/settings.md):

* `editor.formatOnSave` - to format when you save your file.
* `editor.formatOnType` - to format as you type (triggered on the `kbstyle(;)` character).

By default, the clang-format style is set to "file". This means, if a `.clang-format` file is found in your workspace, the settings specified in the file are used as the formatting reference. Otherwise, formatting is based on the default style specified in the `C_Cpp.clang_format_fallbackStyle` [setting](/docs/getstarted/settings.md).

Currently, the default formatting style is "Visual Studio", an approximation of the default code formatter in Visual Studio. It implies the following settings:

```json
UseTab: (VS Code current setting)
IndentWidth: (VS Code current setting)
BreakBeforeBraces: Allman
AllowShortIfStatementsOnASingleLine: false
IndentCaseLabels: false
ColumnLimit: 0
```

To use a different version of clang-format than the one that ships with the extension, change the `C_Cpp.clang_format_path` [setting](/docs/getstarted/settings.md) to the path where the clang-format binary is installed.

For example, on the Windows platform, use:

```json
  "C_Cpp.clang_format_path": "C:\\Program Files (x86)\\LLVM\\bin\\clang-format.exe"
```

### Enhanced semantic colorization

When IntelliSense is enabled, the Visual Studio Code C/C++ extension supports semantic colorization. For more information about setting colors for classes, functions, variables, etc., see [Enhanced colorization](/docs/cpp/colorization-cpp.md). For more information on configuring IntelliSense, see [IntelliSense configuration](/docs/cpp/configure-intellisense.md).

### Quick Info

You can hover over a symbol to see an inline view of its definition:

![Quick info](images/mingw/quickinfo.png)

## Navigating source code

The source code navigation features provided are powerful tools for understanding for your codebase. These let you quickly search for symbols in your code, navigate to their definitions, and find references to them.

Navigation is powered by a set of tags stored in a local database of symbol information. Whenever a folder containing C++ source code files is opened, the  C/C++ extension creates a database of the symbols defined in those files. This database is updated whenever a file is saved, and shared between all workspaces that use the same source code.

### Search for symbols

You can search for symbols in the current file or workspace to navigate your code more quickly.

To search for a symbol in the current file, press `kb(workbench.action.gotoSymbol)`, then enter the name of the symbol you're looking for. A list of potential matches will appear; which is filtered as you type. Choose from the list of matches to navigate to its location.

![Searching the current file](images/cpp/filesearch.png)

To search for a symbol in the current workspace, press `kb(workbench.action.showAllSymbols)`, then enter the name of the symbol. A list of potential matches will appear. If the match you choose is located in a file that's not already open, the file will be opened before navigating to the match's location.

![Searching in your workspace](images/cpp/workspacesearch.png)

You can also search for symbols by accessing these commands through the **Command Palette**(`kb(workbench.action.showCommands)`). Use **Quick Open** (`kb(workbench.action.quickOpen)`) then enter the '@' command to search the current file, or the '#' command to search the current workspace. `kb(workbench.action.gotoSymbol)` and `kb(workbench.action.showAllSymbols)` are shortcuts for the '@' and '#' commands.

### Call hierarchy

A Call Hierarchy view shows all calls to or from a function. It lets you understand the complex calling relationships between the functions in your source code.

To view the call hierarchy, select a function, right-click to display the context menu and choose **Show Call Hierarchy**. You can also use the keyboard shortcut (`Shift+Alt+H` on windows), or invoke the **Command Palette** (`kb(workbench.action.showCommands)`) and run the command **Calls: Show Call Hierarchy**. This populates the call tree in the side bar with all of the functions called by your selected function.

![Selecting call hierarchy and showing calls in sidebar](images/cpp/call-hierarchy.gif)

Toggle the phone icon in the side bar menu to switch to incoming calls. Incoming calls show whenever your function is referenced by another function. You can also explore nested calls by selecting a function already shown in the call tree and right-clicking on that function to view the available commands.

![Nested Calls for Call Hierarchy](images/cpp/nested-calls-call-hierarchy.png)

### Peek

The *Peek* feature displays a few lines of code inside a *peek window*, so that you don't have to navigate away from your current location. It's useful for quickly understanding the context of a symbol without having to navigate away from your current code.

To open a *peek window*, navigate to the context menu by right-clicking and selecting **Peek**. There, you can choose to peek at a symbol's definition, declaration, type definition, or references.

![Peek definition](images/cpp/peekdefn.png)

With the peek window open, you browse the list of results shown to find the one you're interested in. If you want to navigate to the location of one of these results, just select result or double-click in the source code displayed on the left-hand side of the peek window.

### Go to definition

Use the **Go to Definition** feature to quickly navigate to where a symbol is defined in your source code. Select a symbol in your source code and then press `kb(editor.action.revealDefinition)`, or right-click and choose **Go to Definition** from the context menu. When there's only one definition of the symbol, you'll navigate directly to its location, otherwise the competing definitions are displayed in a peek window as described in the previous section.

If no definitions can be found for the symbol you selected, the C/C++ Extension will automatically search for a declaration of the symbol.

### Go to declaration

Use the **Go to Declaration** feature to navigate to the location a symbol is declared in your source code. This feature functions the same as **Go to Definition**, but for declarations. Select a symbol in your source code, right-click and choose **Go to Declaration** from the context menu. This will navigate you to the location of the symbol's declaration.

### Go to references

Use the **Go to References** feature to understand how often and where a symbol is referenced in your source code. Select a symbol in your source code and press `kb(editor.action.goToReferences)` or right-click and choose **Go to References** from the context menu. If any references are found, they are displayed in a peek window.

### Go to type definition

Use the **Go to Type Definition** feature to jump to where a type is defined in your source code. Select a type in your source code and press `kb(editor.action.goToTypeDefinition)` or right-click and choose **Go to Type Definition** from the context menu.

## Next steps

Read on to find out about:

* [Configure VS Code for Windows Subsystem for Linux](/docs/cpp/config-wsl.md)
* [Configure VS Code for MSVC](/docs/cpp/config-msvc.md)
* [Configure VS Code for Mingw-w64 and GCC](/docs/cpp/config-mingw.md)
* [Configure VS Code for macOS](/docs/cpp/config-clang-mac.md)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Tasks](/docs/editor/tasks.md) - use tasks to build your project and more
* [Debugging](/docs/editor/debugging.md) - find out how to use the debugger with your project

If you have any other questions or run into any issues, please file an issue on [GitHub](https://github.com/microsoft/vscode-cpptools/issues). You may be asked to provide logging information from the extension to help diagnose the issue. See [C/C++ extension logging](/docs/cpp/enable-logging-cpp.md) for help on providing extension logs.
