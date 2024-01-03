---
Order: 11
Area: cpp
TOCTitle: Refactoring
ContentId: 5b5da770-b59f-4eca-94a3-78e824d16b52
PageTitle: Refactoring C++ code
DateApproved: 1/3/2024
MetaDescription: How to refactor C++ source files in Visual Studio Code.
---
# Refactoring C++ code

The C/C++ Extension in Visual Studio Code has multiple refactoring features to help you improve your code's structure, readability, and maintainability without altering its runtime behavior. These include features such as Extract Method and Create Declaration and Definitions.

## Create declarations or definitions

Simplify the process of creating a function's declaration or definition by letting the C/C++ extension generate these items for you. This functionality applies to member functions, namespaces as classes, and templates.

![Create a definition and a declaration across two files](images/refactoring/create-declaration-and-definition-different-files.gif)

To create a function declaration or definition, either:

* Select your class function definition, then the Code Action (light bulb icon) which opens a dropdown where you can select **Create a Declaration**. For creating a definition, it is the same process, choose the function declaration, then select the Code Action for **Create a Definition**.
* Right-click a function’s declaration or definition and select the **Create Definition/Declaration** from the context menu. Based on your code, a definition or a declaration will be created.
* Select the function, then use the **Command Palette** (`kb(workbench.action.showCommands)`) and type in the command **Create Declaration/Definition**. Based on your code, a definition or a declaration will be created.

The location of where the definitions and declarations are created is based on the previous patterns you established in your code. For example, if you previously added definitions and declarations in the same file, the extension will also add any new ones to that same file. Function order is maintained automatically.

![Create a definition and a declaration in the same file](images/refactoring/create-declaration-and-definition-same-file.gif)

If you defined declarations or definitions in a different file from your source file, the extension follows your convention. For example, for a header and a source file with matching names, both are identified, even if the header file has not been included in the source file. In this case, once the declaration or definition is added, your header file is automatically referenced in your source file for you.

If you do not have any precedent of where you create definitions or declarations, we will create a header or source file with a matching name to your current file for you.

For templates, if a function template is declared in a header file, the definition of that function template will be created in the same header file. This also applies for nontemplate member functions of class templates.

## Extract to method

The Extract Method refactoring feature allows you to extract a block of code into a separate method to help improve code readability, reduce duplication, and make the code more modular.

To extract a method, select the C++ code you would like to extract. A code action (light bulb) will appear with the option **Extract to Function**. Otherwise, right-click on the code and select **Refactor > Extract** or use the keyboard command (`Ctrl + Shift + R, Ctrl + E` on windows) to get more information. You can then name the new function that has been created. The new function containing your highlighted code will be placed above the current function.

![Extract Method and create declaration](images/refactoring/extract-method.gif)

## Quick Fixes/Light bulbs

Quick Fixes, shown as light bulbs in your code, are suggestions for how to fix and improve your code. The C/C++ extension provides C/C++ specific quick fixes in many scenarios, including:

### Add missing header files

If there is an unknown symbol in your C++ code and the C/C++ Extension identifies the correct header file in your workspace, there is now a quick fix available. Select the quick fix and the necessary header file include will be added to the top of your current C++ file.

![Add Missing Include in code using a code action](images/refactoring/quick-fix-add-missing-includes.gif)

## Next steps

Read on to find out about:

* [C++ Code Navigation](/docs/cpp/cpp-ide.md)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Tasks](/docs/editor/tasks.md) - use tasks to build your project and more
* [Debugging](/docs/editor/debugging.md) - find out how to use the debugger with your project

If you have any other questions or run into any issues, please file an issue on [GitHub](https://github.com/microsoft/vscode-cpptools/issues). You might be asked to provide logging information from the extension to help diagnose the issue. See [C/C++ extension logging](/docs/cpp/enable-logging-cpp.md) for help on providing extension logs.
