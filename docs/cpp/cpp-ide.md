---
Order: 9
Area: cpp
TOCTitle: Editing and Navigating Code
ContentId: 61D63E54-67E2-4743-B5CB-C6E7F582982A
PageTitle: Edit and navigate C++ code
DateApproved: 1/2/2023
MetaDescription: How to edit and navigate C++ source files in Visual Studio Code.
---
# Editing and Navigating C++ in Visual Studio Code

This topic provides a quick overview of general C/C++ editor features, as well as some that are specific to C/C++. For more information about editing and navigating in Visual Studio Code, see [Basic Editing](/docs/editor/codebasics.md) and [Code Navigation](/docs/editor/editingevolved.md).

## Editing Set Up

To provide the best editing experience, the C++ extension needs to know where it can find each header file referenced in your code. By default, the extension searches the current source directory, its sub-directories, and some platform-specific locations. If a referenced header file can't be found, a red squiggle is displayed underneath the #include directive.

To specify additional include directories, select an #include that has not been referenced. Next, select the lightbulb that appear and choose `Edit "includePath" setting`. This opens the C/C++ Extension's Configurations interface. Under the Include Path section you can specify the paths for any additional include directories.

![Process of adding a new header to the include path](images\intellisense\AddingIncludePathToConfig.gif)

## List members

When you type a member access symbol (`.` or `->`) the editor will display a list of members. As you type additional letters, the list is filtered in real time:

![List members](images/cpp/list-members-cpp.png)

### Code formatting

The C/C++ extension for Visual Studio Code supports source code formatting using [clang-format](https://clang.llvm.org/docs/ClangFormat.html) which is included with the extension.

You can format an entire file with **Format Document** (`kb(editor.action.formatDocument)`) or just the current selection with **Format Selection** (`kb(editor.action.formatSelection)`) in right-click context menu. You can also configure auto-formatting with the following [settings](/docs/getstarted/settings.md):

* `editor.formatOnSave` - to format when you save your file.
* `editor.formatOnType` - to format as you type (triggered on the `kbstyle(;)` character).

By default, the clang-format style is set to "file". This means, if a `.clang-format` file is found in your workspace, the settings specified in the file will be used as a formatting reference. Otherwise, formatting is based on the default style specified in the `C_Cpp.clang_format_fallbackStyle` [setting](/docs/getstarted/settings.md).

Currently, the default formatting style is "Visual Studio" which is an approximation of the default code formatter in Visual Studio. It implies the following settings:

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

When IntelliSense is enabled, the Visual Studio Code C/C++ extension supports semantic colorization. See [Enhanced colorization](/docs/cpp/colorization-cpp.md) for more details about setting colors for classes, functions, variables and so on.

### Quick Info

You can hover over a symbol to see an inline view of its definition:

![Quick info](images/mingw/quickinfo.png)

### Peek Definition

The **Peek Definition** feature displays a few lines of code near the definition inside a *peek window*, so that you don't have to navigate away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere it's used in your source code and then press `kb(editor.action.peekDefinition)`. Alternatively, you can choose **Peek Definition** from the context menu (right-click, then choose **Peek Definition**).

![Peek definition](images/cpp/peekdefn.png)

Currently, the C/C++ extension doesn't parse code in a way that helps it distinguish between competing definitions based on how the symbol is used. These competing definitions arise when the symbol defines different things in different contexts, such as occurs with overloaded functions, classes and their constructors, and other situations. When this happens, each of the competing definitions is listed in the right-hand side of the peek window with the source code of the current selection displayed on the left.

With the peek window open, you browse the list of competing definitions to find the one you're interested in. If you want to navigate to the location of one of the definitions just double-click the definition you're interested in, or by double-clicking anywhere in the source code displayed on the left-hand side of the peek window.

### Peek Declaration

The **Peek Definition** feature displays a few lines of code near the definition inside a *peek window*, so that you don't have to navigate away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere it's used in your source code and then press `kb(editor.action.peekDefinition)`. Alternatively, you can choose **Peek Definition** from the context menu (right-click, then choose **Peek Definition**).

![Peek definition](images/cpp/peekdefn.png)

Currently, the C/C++ extension doesn't parse code in a way that helps it distinguish between competing definitions based on how the symbol is used. These competing definitions arise when the symbol defines different things in different contexts, such as occurs with overloaded functions, classes and their constructors, and other situations. When this happens, each of the competing definitions is listed in the right-hand side of the peek window with the source code of the current selection displayed on the left.

With the peek window open, you browse the list of competing definitions to find the one you're interested in. If you want to navigate to the location of one of the definitions just double-click the definition you're interested in, or by double-clicking anywhere in the source code displayed on the left-hand side of the peek window.

## Navigating source code

The source code navigation features provided are powerful tools for understanding for your codebase. These let you quickly search for symbols in your code, navigate to their definitions, and find references to them.

Navigation is powered by a set of tags stored in a local database of symbol information. Whenever a folder containing C++ source code files is opened, the  C/C++ extension creates a database of the symbols defined in those files. This database is updated whenever a file is saved, and shared between all workspaces that use the same source code.

### Search for symbols

You can search for symbols in the current file or workspace to navigate your code more quickly.

To search for a symbol in the current file, press `kb(workbench.action.gotoSymbol)`, then enter the name of the symbol you're looking for. A list of potential matches will appear; it is filtered as you type. Choose from the list of matches to navigate to its location.

![Searching the current file](images/cpp/filesearch.png)

To search for a symbol in the current workspace, press `kb(workbench.action.showAllSymbols)`, then enter the name of the symbol. A list of potential matches will appear. If you choose a match that was found in a file that's not already open, the file will be opened before navigating to the match's location.

![Searching in your workspace](images/cpp/workspacesearch.png)

You can also search for symbols by accessing these commands through the **Command Palette**. Use **Quick Open** (`kb(workbench.action.quickOpen)`) then enter the '@' command to search the current file, or the '#' command to search the current workspace. `kb(workbench.action.gotoSymbol)` and `kb(workbench.action.showAllSymbols)` are shortcuts for the '@' and '#' commands.

### Go to Definition

Use the **Go to Definition** feature to quickly navigate to where a symbol is defined in your source code.

Select a symbol in your source code and then press `kb(editor.action.revealDefinition)`. Or, choose **Go to Definition** from the context menu (right-click, then choose **Go to Definition**). When there's only one definition of the symbol, you'll navigate directly to its location, otherwise the competing definitions are displayed in a peek window as described in the previous section.

If no definitions can be found for the symbol you selected, the C/C++ Extension will automatically search for a declaration of the symbol.

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
