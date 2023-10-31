---
Order: 13
Area: cpp
TOCTitle: Configure IntelliSense
ContentId: bf494c65-12b4-4506-ab6c-1fad76d7ccf1
PageTitle: Configure C/C++ IntelliSense
DateApproved: 10/31/2023
MetaDescription: Configure Visual Studio Code IntelliSense in the C/C++ Extension
---
# Configure C/C++ IntelliSense

This article is about configuring the C/C++ extension to provide C++ specific [IntelliSense](/docs/editor/intellisense.md) suggestions in VS Code. IntelliSense is a helpful tool built into VS Code that provides various code editing features that help you code faster and more efficiently. For example, code completion, parameter info, syntax highlighting, code actions (light bulbs), and member lists are all generated using IntelliSense.

C/C++ IntelliSense only requires a C/C++ compiler to be installed on your system. The C/C++ compiler will provide C++ specific information to IntelliSense, such as the locations of system include paths and other settings. For project level configurations, reference the section [Project level IntelliSense Configuration](/docs/cpp/configure-intellisense.md#_Project-level-IntelliSense-Configuration).

## When will the C/C++ Extension configure core IntelliSense features for me?

A compiler is the only requirement to configure core Intellisense functionality. To identify a compiler for IntelliSense, the C++ Extension will scan common paths on your machine for compilers such as clang, GCC, MinGW, cygwin, cygwin64, and MSVC. If any of these compilers are identified and in a secure location, they are automatically configured for IntelliSense. Otherwise, a notification is displayed asking you to confirm that this compiler should be configured for IntelliSense. In either of these scenarios, the compiler selected will be set as the default compiler.

## How to check whether IntelliSense is configured

If you don't have IntelliSense configured, the C/C++ Extension shows an indicator in the status bar with a warning sign labeled **Configure IntelliSense**.

![configure-intelliSense-indicator-status-bar](images/intellisense/configure-intellisense-indicator.png)

To configure, select the status bar indicator, which navigates you to the [configuration quick pick](/docs/cpp/configure-intellisense.md#_Option-1.-Select-a-configuration-option-through-the-configuration-Quick-Pick). The quick pick can help you select or install a C/C++ compiler.

If you do not see a status bar indicator, you can also check your project's `c_cpp_properties.json` file. This file stores all of your configuration settings. Navigate to this file by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`) in VS Code. Check the `IntelliSense mode` to find your configuration. To learn more about the `c_cpp_properties.json` file, see the [schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

![Command Palette](images/cpp/command-palette.png)

## How to configure IntelliSense

IntelliSense configuration is stored in the `c_cpp_properties.json` file, which is automatically created in your workspace. All three of the following options are different ways of editing the `c_cpp_properties.json` file:

### Option 1. Select a configuration option through the configuration quick pick

Open the quick pick by entering **Select IntelliSense Configuration** in the Command Palette (`kb(workbench.action.showCommands)`), which shows you a dropdown with all of the configuration options found by the C/C++ Extension on your machine.

![Compiler Quick Pick](images/intellisense/compiler-quick-pick.png)

Select one of the options available. If you select a compiler, this compiler will will be used by IntelliSense by default. You can return to the Configuration Quick Pick at any point to change which option is used to configure IntelliSense.

If no options are available in the quick pick, no compiler could be identified in your system. You can browse your machine manually or install a C/C++ compiler. To install on a Windows machine, select the **Help me install a compiler** option, which redirects you to the step-by-step walkthrough of how to install a C/C++ compiler. On a Mac or Linux machine, select **Install a compiler** and navigate through the prompts to have a C++ compiler installed on your machine.

### Option 2. Edit your IntelliSense configurations through the UI

Open your IntelliSense configuration by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`). This is an interface of the `c_cpp_properties.json` file.
Set the **Compiler path** field to the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`. Set the **IntelliSense mode** to the architecture-specific variant of the compiler you're using.

### Option 3. Edit the `c_cpp_properties.json` file directly

You can edit the `c_cpp_properties.json` file directly to customize your configuration. Use the **C/C++ Edit Configurations (JSON)** command from the Command Palette (`kb(workbench.action.showCommands)`), then the `c_cpp_properties.json` file is created in the `.vscode` folder of your workspace.
Use the `compilerPath` variable to add a compiler. This variable is the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`.

For more information about the `c_cpp_properties.json` file, see the [c_cpp_properties.json schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

Select a tab to see some samples of a `c_cpp_configuration.json` file depending on your operating system:

<span class="ts" data-toggle="collapse">Sample c_cpp_configuration.json on Windows</span>
<div class="details collapse"><div class="comment">
<p> Using the default install path for MinGW:
```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "windowsSdkVersion": "10.0.22621.0",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "${default}",
            "compilerPath": "C:/msys64/mingw64/bin/gcc.exe"
        }
    ],
    "version": 4
}
```
</p>
</div>
</div>

<span class="ts" data-toggle="collapse"><span class="ident">Sample c_cpp_configuration.json on Mac</span></span>
<div class="details collapse">
<div class="comment"><p> Using the default install path for clang:
```json
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "macos-clang-arm64"
        }
    ],
    "version": 4
}
```
</p>
</div>
</div>

<span class="ts" data-toggle="collapse"><span class="ident">Sample c_cpp_configuration.json on Linux</span></span>
<div class="details collapse">
<div class="comment"><p> Using the default install path for GCC:
```json
{
  "configurations": [
        {
          "name": "Linux-GCC",
          "includePath": [
            "${workspaceFolder}/**"
          ],
          "defines": [],
          "compilerPath": "/usr/bin/g++",
          "cStandard": "c17",
          "cppStandard": "c++17",
          "intelliSenseMode": "gcc-x64",
          "browse": {
            "path": [
              "${workspaceFolder}"
            ],
            "limitSymbolsToIncludedHeaders": true,
            "databaseFilename": ""
          }
        }
  ],
  "version": 4
}
```
</p>
</div>
</div>

## Project Level IntelliSense Configuration

Configuring IntelliSense with a compiler provides you with core IntelliSense features. This is called the base configuration. When working with more complex usage scenarios, such as setting up a project that requires:

- additional include paths, such as a to reference one or many differnet libraries
- specific compiler arguments that influence the behavior of the language(and therefore IntelliSense)

There are multiple additional ways to configure your IntelliSense. You can provide these additional configurations either through the `c_cpp_properties.json` file and related settings, a `compile_commands.json` file, or a configuration provider in the form of another VS Code extension (for example, the [Makefile Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools) or [CMake Tools](/docs/cpp/CMake-linux.md) extension).

If another extension in VS Code is able to provide C/C++ IntelliSense configuration, this extension can be used as a source for configuration by listing it as a configuration provider. For example, the [Makefile Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools) or [CMake Tools](/docs/cpp/CMake-linux.md) extensions are able to provide this configuration. To add an extension as a configuration provider, either select the extension through the configuration quick pick, add it to configuration UI by editing the **Configuration provider** field under **Advanced Settings**, or add the `configurationProvider` field to your `c_cpp_properties.json` file. For example, in the case of the CMake extension, the path to add would be `ms-vscode.cmake-tools`.

If your program includes header files that aren't in your workspace or that aren't in the standard library path, you can modify the **Inlcude Path**. The C/C++ extension populates the include path by querying the compiler specified by **Compiler path**. If the extension can't find the path for the target system libraries, you can enter the include path manually.

Another option to provide intelliSense configuration is a `compile_commands.json` file, which describles the exact compile commands used for every file in a project. This file is often generated by a build system, such as CMake or Make by setting command line arguments when configuring your project. A `compile_commands.json` file can be selected for configuration through the same methods as discussed in the [How to configure IntelliSense section](/docs/cpp/configure-intellisense.md#_How-to-configure-IntelliSense): through the configuration quick pick, editing configurations through the UI, or editing the `c_cpp_properties.json` file directly. In the configuration UI, the file can be added under Advanced Configurations and the **Compile commands** field. For example, if your `compile_commands.json` file is in the root of your workspace, enter `${workspaceFolder}/compile_commands.json` in the **Compile commands** field. Otherwise, it can be added to the `c_cpp_properties.json` file directly using the `compileCommands` configuration property.

Note that if the compile commands database does not contain an entry for the translation unit that corresponds to the file you opened in the editor, your base configuration (found in `c_cpp_properties.json`) will be used instead (such as your `includePath` and `defines`). If the C/C++ Extension is reverting to the base configuration, this can also be a reason the  [language status bar indicator](/docs/cpp/configure-intellisense.md#_Option-1:-Check-for-a-status-bar-indicator) is being shown.

### Checking on IntelliSense using the language status bar

You can determine if IntelliSense is actively working on your file using the language status bar. To invoke the language status bar, open a C++ file. Note that the status bar shows the text **{} C++**. Hover over the **{}** symbol to open the language status bar flyout. The top item in the flyout indicates the IntelliSense status. Here are the different statuses and their meanings:

- **IntelliSense: Ready** = IntelliSense has been configured for the C/C++ Extension and automatically activates if you interact with the editor, for example, by writing code.
- **IntelliSense: Updating** = IntelliSense is actively working to determine any code completions, syntax highlighting, etc. based on changes you're making to your code.

![language-status-bar](images/intellisense/language-status-bar.png)

You can select the pin icon on the right of any item in the language status bar flyout to permanently pin it to your status bar.

## Next steps

- For more information about IntelliSense configuration, see [Customizing default settings](/docs/cpp/customize-default-settings-cpp.md).
- If you have trouble configuring the settings, please start a discussion at [GitHub discussions](https://github.com/microsoft/vscode-cpptools/discussions), or if you find an issue that needs to be fixed, file an issue at [GitHub issues](https://github.com/microsoft/vscode-cpptools/issues).
- Explore the [c_cpp_properties schema](/docs/cpp/c-cpp-properties-schema-reference.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
