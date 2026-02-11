---
Order: 9
Area: cpp
TOCTitle: C++ Dev Tools for Copilot
PageTitle: Leveraging C++ Development Tools with GitHub Copilot Chat

# Using C++ Development Tools with GitHub Copilot Chat

Refactoring and making updates in C++ code often requires tracking down edits across multiple files and knowledge of your build configuration.

GitHub Copilot Chat can leverage powerful C++ tools built into VS Code to provide context-aware assistance for your C++ projects. By using code understanding and CMake tools, Copilot can understand your codebase structure, dependencies, and build configurations to give you more accurate, helpful, and fast responses.

This guide covers the available tools and how to use them effectively with agent mode to accomplish tasks such as:
- Navigate and understand complex C++ codebases
- Refactor code with full context awareness
- Configure and build projects efficiently

To get started with these tools, you'll need to have the **C/C++ DevTools extension** installed along with the [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) and [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) extensions. These extensions are available automatically as part of the [C/C++ Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack).

You can enable/disable any of these tools at any point by navigating to the `Tools` option in chat and selecting the respective tool you'd like to enable/disable.

![All of the cpp tools listed in the Tools view](/docs/cpp/images/all-cpp-tools.png)

## C++ code understanding tools

The C++ extension provides tools that leverage language services to give Copilot Chat deep understanding of your code structure, symbols, and relationships. Ensure you are [configured with IntelliSense](/cpp/configure-intellisense.md) to leverage these tools.

To enable these tools, select the **Enable Cpp Code Editing Tools** setting in your VS Code user settings.

![Enable Cpp Code Editing tools setting in settings.json](/docs/cpp/images/cpp-code-editing-tools-setting.png)

### Get Symbol Information (`GetSymbolInfo_CppTools`)

**What it does:** Retrieves detailed information about symbols (functions, classes, variables, etc.) in your codebase, including their definitions, types, and documentation.

**Example Use Case:**
*Optimize memory performance and ensure non-breaking changes*

![User asking Copilot to refactor a symbol to be memory-safe, which invokes the get symbol info tool](/docs/cpp/images/get-symbol-info-example.png)

---

### Get Symbol References (`GetSymbolReferences_CppTools`)

**What it does:** Finds all references to a specific symbol throughout your codebase, showing where functions, classes, or variables are used.

**Example Use Case:**
*Add additional functionality to existing functions*

![User asking Copilot to update an existing function and add a parameter for logging, which invokes the get symbol references tool](/docs/cpp/images/get-symbol-references-example.png)

---

### Get Symbol Call Hierarchy (`GetSymbolCallHierarchy_CppTools`)

**What it does:** Shows the call hierarchy for functions, revealing both incoming calls (who calls this function) and outgoing calls (what this function calls).


**Example Use Case:**
*Dependency analysis for module migration*

![User asking Copilot to migrate a module into a separate library and thus requesting a dependency analysis, which invokes the get symbol call hierarchy tool](/docs/cpp/images/get-symbol-call-hierarchy-example.png)

---

## CMake Tools Integration

CMake tools allow Copilot Chat to understand your build configuration, targets, and dependencies, enabling build-aware assistance.

### CMake Build (`Build_CMakeTools`)

**What it does:** Builds your CMake project using the current configuration and selected target.

**Example Use Case:**
*Resolving build errors*

![User asking Copilot to resolve build errors, which invokes the CMake build tool](/docs/cpp/images/cmake-build-example.png)

---

### Run CTest (`RunCTest_CMakeTools`)

**What it does:** Runs test suite defined by CTest in your project

**Example Use Case:**
*Fix code according to unit tests*
![User asking to fix failing unit tests, which invokes run ctest](/docs/cpp/images/run-ctest-example.png.png)

---

### Tips for Effective Prompts

- **Be specific:** Identify the exact symbol, file, or component you're asking about (e.g., "refactor the `getConfig()` function" rather than "make this faster")
- **Reference context:** Ask Copilot Chat to consider specific files, functions, or modules when analyzing changes
- **Use custom instructions:** Set up [custom instructions](https://github.com/microsoft/vscode-docs/blob/main/docs/copilot/customization/custom-instructions.md) to guide Copilot Chat
- **Leverage latest models:** Use the latest AI models that support tool-calling for the most accurate code understanding and tool usage
- **Optimize tool performance** Only enable relevant tools to your development workflow to avoid context bloat

### When to Use Each Tool

**Symbol Information:** Use when you need to understand the structure of existing code or verify properties before making changes.

**Symbol References:** Use when refactoring to identify all usages and ensure changes don't break existing code.

**Call Hierarchy:** Use when analyzing dependencies, understanding call chains, or planning module migrations.

**CMake Build:** Use when troubleshooting build issues or verifying that changes compile successfully.

**CTest:** Use when validating changes against your test suite or debugging test failures.

