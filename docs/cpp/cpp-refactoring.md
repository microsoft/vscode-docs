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

To create a function declaration or definition, either:

* Click on your class function definition, then the Code Action (lightbulb icon) on the left. This will open a dropdown where you can select **Create a Declaration**. For creating a definition, it is the same process, just click on the function declaration, then select the Code Action for **Create a Definition**.
* Right click a function’s declaration or definition and select the **Create Definition/Declaration** from the context menu. Based on your code, the definition or the declaration will be created.
* Select the function, then use the **Command Palette** (`kb(workbench.action.showCommands)`) and type in the command **Create Declaration/Definition**.  Based on your code, the definition or the declaration will be created.

The location of where the definitions and declarations will be created is based on the patterns you have already established in your code. For example, if you previously had added definitions and declarations in the same file, the extension will also add any new ones to that same file. Function order will be maintained automatically.

If you have defined declarations or definitions in a different file from your source file, the extension will follow your convention. In the common case of having a header and a source file with matching names, the other file will be identified, even if the header file has not been included in the source file. In this case, once the declaration or definition has been added, your header file will be automatically referenced in your source file for you.

If you do not have any precedent of where you create definitions or declarations, we will create a header or source file with a matching name to your current file for you.

For templates, if a function template is declared in a header file, the definition of that function template will be created in the same header file. This also applies for non-template member functions of class templates.

## Extract to method

The Extract Method refactoring feature allows you to extract a block of code into a separate method to help improve code readability, reduce duplication, and make the code more modular.

To extract a method, select the C++ code you would like to extract. A code action (lightbulb) will appear with the option **Extract to Function**. Otherwise, right click on the code and select **Refactor > Extract** or use the keyboard command `Ctrl + Shift + R, Ctrl + E` to get more information. You can then name the new function that has been created. The new function containing your highlighted code will be placed above the current function.

## Quick Fixes/Light bulbs

Quick Fixes, shown as light bulbs in your code, are suggestions for how to fix and improve your code. The C/C++ extension provides C/C++ specific quick fixes in the following scenarios:

### Add missing header files

If there is an unknown symbol in your C++ code and the C/C++ Extension identifies the correct header file in your workspace, you will now have a quick fix available. Select the quick fix and the necessary header file include will be added to the top of your current C++ file.
