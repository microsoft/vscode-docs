---
Order: 13
Area: cpp
TOCTitle: Configure IntelliSense
ContentId: bf494c65-12b4-4506-ab6c-1fad76d7ccf1
PageTitle: Configure C/C++ IntelliSense
DateApproved: 8/23/2023
MetaDescription: Configure Visual Studio Code IntelliSense in the C/C++ Extension

---
# Configure C/C++ IntelliSense

This article is about configuring the C/C++ extension to provide proper [IntelliSense](/docs/editor/intellisense.md). IntelliSense is a helpful tool built into VS Code that provides various code editing features that help you code faster and more efficiently. For example, code completion, parameter info, syntax highlighting, code actions (light bulbs), and member lists are all generated using IntelliSense.

IntelliSense is powered by a language service, which provides C++ specific language completions in your code. For the extension to provide correct IntelliSense suggestions, you need to configure the C/C++ extension. There are three types of sources that can be used for configuration:

- A C/C++ compiler
- `compile_commands.json` file
- Another extension (for example, the [Makefile Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools) or [CMake extension](/docs/cpp/CMake-linux.md)).

## When is IntelliSense automatically configured?

The C/C++ Extension, in most occasions, configures IntelliSense automatically for you. Common compiler paths in world writeable locations are queried on your machine, and if a compiler is available, are configured. If a compiler in a non-world writeable location is determined, a notification is displayed asking to configure this compiler. When approving compilers for IntelliSense, ensure that the compiler path is correct. Common compilers in their default world writeable locations that are automatically configured include the clang compiler, GCC, MinGW, and MSVC. If a `compile_commands.json` file or another extension that provides a configuration is found in your workspace, the extension will also automatically use these options to configure IntelliSense.

## How to check whether IntelliSense is configured

There are multiple options to determine your IntelliSense status:

### Option 1: Check for a status bar indicator

 If you don't have IntelliSense configured, the C/C++ Extension shows an indicator in the status bar with a warning sign stating "Configure IntelliSense".

![configure-intelliSense-indicator-status-bar](images/intellisense/configure-intellisense-indicator.png)

To configure, select the status bar indicator, which navigates you to the [configuration quickpickpick](/docs/cpp/configure-intellisense.md#_Option-1.-Select-a-configuration-option-through-the-configuration-Quick-Pick). The status bar indicator also is shown if you have provided a configuration for IntelliSense, but the C/C++ Extension is reverting to the base configuration provided in your `c_cpp_properties.json` file. In this case, open the `c_cpp_properties.json` file (Select **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`)).

### Option 2: Check the language status bar

To invoke the language status bar, open a C++ file. Note that the status bar now shows the text "{} C++". Hover over the "{}" symbol to open the language status bar flyout. The top item in the flyout indicates the IntelliSense status. Here are the different statuses and their meanings:

- "IntelliSense: Ready" = IntelliSense has been configured for the C/C++ Extension and will automatically activate if you interact with the editor, for example, by writing code.
- "IntelliSense: Updating" = IntelliSense is actively working to determine any code completions, syntax highlighting, etc. based on changes you're making to your code
- "IntelliSense: Not configured" = IntelliSense isn't configured, and will not provide you with code completion features. To configure, navigate you to the [configuration quickpickpick](/docs/cpp/configure-intellisense.md#_Option-1.-Select-a-configuration-option-through-the-configuration-Quick-Pick) as explained below.

![language-status-bar](images/intellisense/language-status-bar.png)

### Option 3: Check the `c_cpp_properties.json` file

All configuration settings are stored in your project's `c_cpp_properties.json` file. Navigate to this file by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`) in VS Code. Check the "IntelliSense mode" to understand your configuration. To learn more about the `c_cpp_properties.json` file, see the [c_cpp_properties.json schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

![Command Palette](images/cpp/command-palette.png)

## How to configure IntelliSense

If you have determined that IntelliSense isn't configured, you have multiple options to configure:

### Option 1. Select a configuration option through the configuration Quick Pick

Open the quick pick by entering **Select IntelliSense Configuration** in the Command Palette (`kb(workbench.action.showCommands)`), which shows you a dropdown with all of the configuration options found by the C/C++ Extension on your machine.

![Compiler Quick Pick](images/intellisense/compiler-quick-pick.png)

Select one of the options available. You can return to the Configuration Quick Pick at any point to change which option is being configured for IntelliSense.

If no options are available in the quick pick, there are multiple options to help you install a compiler which you can use for IntelliSense. On a Windows machine, select the “Help me install a compiler” option, which redirects you to the step-by-step walkthrough of how to install a C/C++ compiler. On a Mac or Linux machine, select "Install a compiler" and navigate through the prompts to have a compiler either the Clang or GCC compiler installed on your machine.

### Option 2. Edit your IntelliSense configurations

Open your IntelliSense configuration by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`).

For configuring a `compile_commands.json` file, enter the full path of the `compile_commands.json` file into the Compile commands field. For example, if your `compile_commands.json` file is in the root of your workspace, use `${workspaceFolder}/compile_commands.json`.

For configuring another extension, set the Configuration Provider field to the ID of the extension that provides IntelliSense configuration information. For example, use the VS Code extension ID `ms-vscode.cmake-tools` to provide configuration information from the [CMake Tools extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools).

For configuring a compiler, set the "Compiler path" field to the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`. Set the "IntelliSense mode" to the architecture-specific variant of the compiler you're using. If you're using a compiler that isn't supported by the C/C++ Extension, you can set the "IntelliSense mode" to `gcc-x64` or `clang-x64` to get IntelliSense for your project. You can also set the "Include path" to the path of any header files that aren't in your workspace or standard library path.

### Option 3. Edit the `c_cpp_properties.json` file directly

The `c_cpp_properties.json` file is used to configure IntelliSense for the C/C++ Extension. It's located in the `.vscode` folder of your workspace. The edit configuration view in option 2 is an interface for the `c_cpp_properties.json` file. The C/C++ Extension automatically creates this file for you if you have a compiler installed in a world writeable location. If you don't have a compiler installed, you can create this file manually.

You can edit the `c_cpp_properties.json` file directly to add or update your configuration choices. Use the **C/C++ Edit Configurations (JSON)** command from the Command Palette (`kb(workbench.action.showCommands)`) and add the relevant settings. For `compile_commands.json` as a configuration, use the  `compileCommands` variable and for using another extension, use the `configurationProvider` variable. To add a compiler, use the `compilerPath` variable. This variable is the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`.

Make sure you have defined the following settings if you are writing to your `c_cpp_properties.json` file:

- IntelliSense mode: The IntelliSense mode to use that maps to a platform and architecture variant of MSVC, gcc, or Clang.
- Include path: You only need to modify the **Include path** if your program includes header files that aren't in your workspace or that aren't in the standard library path.The C/C++ extension populates the include path by querying the compiler specified by **Compiler path**. If the extension can't find the path for the target system libraries, you can enter the include path manually.

For more information about the `c_cpp_properties.json` file, see the [c_cpp_properties.json schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

Here's a sample `c_cpp_configuration.json` file on a Windows machine using the default install path for minGW:

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
            "cStandard": "c23",
            "cppStandard": "c++23",
            "intelliSenseMode": "${default}",
            "compilerPath": "C:/msys64/mingw64/bin/gcc.exe"
        }
    ],
    "version": 4
}
```

## Next steps

- For more information about IntelliSense configuration, see [Customizing default settings](/docs/cpp/customize-default-settings-cpp.md).
- If you have trouble configuring the settings, please start a discussion at [GitHub discussions](https://github.com/microsoft/vscode-cpptools/discussions), or if you find an issue that needs to be fixed, file an issue at [GitHub issues](https://github.com/microsoft/vscode-cpptools/issues).
- Explore the [c_cpp_properties schema](/docs/cpp/c-cpp-properties-schema-reference.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
