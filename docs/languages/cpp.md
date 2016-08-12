---
Order: 4
Area: languages
TOCTitle: C++
ContentId: D06C8C5C-2D3A-4B2E-B31F-12F1907E6402
PageTitle: C++ programming with Visual Studio Code
DateApproved: 7/7/2016
MetaDescription: Find out how to get the best out of Visual Studio Code and C++.
---

# C/C++ for VS Code (Preview)

C/C++ support for Visual Studio Code is provided today as a preview of our work to enable cross-platform C and C++ development using VS Code on Windows, Linux, and OS X. Our focus in this preview release is code editing and navigation support for C and C++ code everywhere that VS Code runs, as well as debugging on Linux, OS X, and Windows (GDB only with Cygin and MinGW).

If you just want a lightweight tool to edit your C++ files, VS Code has you covered but if you want the best possible experience for your existing Visual C++ projects or debugging on Windows, we recommend you use a version of Visual Studio such as [Visual Studio Community](https://www.visualstudio.com/products/visual-studio-community-vs).

We're still shaping the C++ experience in VS Code so now is a great time to [provide bug reports, feature requests, and feedback](mailto:c_cpp_support@microsoft.com), and for those of you who use Linux or OS X as your development environment, to [get engaged](http://landinghub.visualstudio.com/c-nonwin) with the Visual Studio team.

## Getting Started

**To install the Microsoft C/C++ extension:**

* Open VS Code.
* Click the Extensions View icon on the Sidebar.
* Search for `cpptools`.
* Click **Install**, then click **Enable**.
* Open a folder that contains your C/C++ code.

**To enable code completion and navigation, you will need to generate a `c_cpp_properties.json` file:**

* Hover over any green squiggle in a source file (e.g. a #include statement).
* Click the lightbulb that appears underneath the mouse cursor.
* Click **Add include path to settings**.

This will generate a `c_cpp_properties.json` file that allows you to add additional include paths to properly enable code navigation and auto-completion.

**If you want to build your application from VS Code, you will need to generate a `tasks.json` file:**

* Open the **Command Palette** (`kb(workbench.action.showCommands)`).
* Select the **Tasks: Configure Task Runner** command and you will see a list of task runner templates.
* Select **Others** to create a task which runs an external command.
* Change the `command` to the commandline expression you use to build your application (e.g. `g++ -g main.cpp`).
* Add any required args (e.g. `-g` to build for debugging).
* You can now build your application with (`kb(workbench.action.tasks.build)`)

You should now see a `tasks.json` file in your workspace `.vscode` folder that looks something like:

```json
{
    "version": "0.1.0",
    "command": "g++",
    "isShellCommand": true,
    "showOutput": "always",
    "args": ["-g", "main.cpp"]
}
```

For more information on tasks, see [Integrate with External Tools via Tasks](/docs/editor/tasks).

**To enable debugging, you will need to generate a `launch.json` file:**

* Navigate to the Debug view by clicking the Debug icon in the Sidebar.
* In the **Debug** view, click the **Configure** icon.
* Select `C++ Launch (GDB/LLDB)` from the **Select Environment** dropdown. This creates a `launch.json` file for editing with two configurations:
  * **C++ Launch** defines the properties for launching your app when you start debugging (F5).
  * **C++ Attach** defines the properties for attaching to a process that's already running.
* Update the `program` property with the path to the program you are debugging.
  * If you are debugging on Windows, see [Windows debugging (Cygwin/MinGW)](#debug_windows).
* If you want your application to build when you start debugging, add a `preLaunchTask` property with the name of the build task you created in `tasks.json` ("g++" in the example above).

Your `launch.json` file should look something like:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C++ Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceRoot}/code.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceRoot}",
            "environment": [],
            "externalConsole": true,
            "preLaunchTask": "g++",
            "linux": {
                "MIMode": "gdb"
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb"
            }
        },
        {
            "name": "C++ Attach",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceRoot}/code.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceRoot}",
            "environment": [],
            "processId": "${command.pickProcess}",
            "externalConsole": false,
            "linux": {
                "MIMode": "gdb"
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb"
            }
        }
    ]
}
```

## Editing code

### Code Formatting

The C/C++ extension for Visual Studio Code supports automatic formatting with [clang-format](http://llvm.org/releases/download.html). To use this feature, you must install `clang-format` manually and add its path to your user [settings](/docs/customization/userandworkspace.md) file (`settings.json`).

To configure code formatting, open your `settings.json` file (**File** > **Preferences** > **User Settings**), then add the `c_cpp.clang_format_path` property and set its value to the path where clang-format.exe is installed.

For example:

```json
  "c_cpp.clang_format_path":"C:\\Program Files (x86)\\LLVM\\bin\\clang-format.exe"
```

By default, the clang-format style is set to __file__ which means it looks for a `.clang-format` file inside your workspace. If the `.clang-format` file is found, formatting is applied according the settings specified in the file. If no `.clang-format` file is found in your workspace, formatting is applied according to a default style specified in `c_cpp_properties.json` instead. Currently, the default formatting style is __LLVM__.

To access the `c_cpp_properties.json` file, launch the __Command Palette__ (`kb(workbench.action.showCommands)`) prompt and begin typing **C/Cpp: Edit Configurations**, then choose this command from the command list that appears.

### Fuzzy Auto-Complete (preview)

Fuzzy auto-complete is powered by an enhanced tag-parser approach. Although suggestions are not based on semantic analysis of your code, this feature provides a wider selection of matches than the single-file IntelliSense experience provided today.

In particular, this feature's capabilities give a good experience for C code.

## Navigating code

The source code navigation features provided by the C/C++ extension are powerful tools for understanding and getting around in your codebase. These features are powered by tags stored in an offline database of symbol information (in the file `browse.VC.db`). With the C/C++ extension installed, this database is generated whenever a folder containing C++ source code files is loaded into VS Code. The platform indicator (Win32 in the figure below) turns red and appears next to a flame icon while the tag-parser is generating this information.

![The platform indicator during tag parsing](images/cpp/parsing.png)

When the platform indicator returns to its normal appearance, the source code symbols have been tagged in the offline database and source code navigation features are ready to be used.

### Specifying Additional Include Directories for Better Symbol Support.

To provide the best experience, the C/C++ extension for VS Code needs to know where it can find each header file referenced in your code. By default, the extension searches the current source directory, its sub-directories, and some platform-specific locations. If a referenced header file can't be found, VS Code displays a green squiggle underneath each #include directive that references it.

To specify additional include directories to be searched, place your cursor over any #include directive that displays a green squiggle, then click the lightbulb action when it appears. This opens the file `c_cpp_properties.json` for editing; here you can specify additional include directories for each platform configuration individually by adding more directories to its 'includePath' property.

![Adding an additional include path](images/cpp/includepath.gif)

### Search for Symbols

You can search for symbols in the current file or workspace to navigate your code more quickly.

To search for a symbol in the current file, press `kb(workbench.action.gotoSymbol)`, then enter the name of the symbol you're looking for. A list of potential matches will appear and be filtered as you type. Choose from the list of matches to navigate to its location.

![Searching the current file](images/cpp/filesearch.png)

To search for a symbol in the current workspace, start by pressing `kb(workbench.action.showAllSymbols)` instead, then enter the name of the symbol. A list of potential matches will appear as before. If you choose a match that was found in a file that's not already open, the file will be opened before navigating to the match's location.

![Searching in your workspace](images/cpp/workspacesearch.png)

Alternatively, you can search for symbols by accessing these commands through the __Command Palette__ if you prefer. Use __Quick Open__ (`kb(workbench.action.quickOpen)`) then enter the '@' command to search the current file, or the '#' command to search the current workspace. `kb(workbench.action.gotoSymbol)` and `kb(workbench.action.showAllSymbols)` are just shortcuts for the '@' and '#' commands, respectively, so everything works the same.

### Peek Definition

You can take a quick look at how a symbol was defined by using the Peek Definition feature. This feature displays a few lines of code near the definition inside a peek window so you can take a look without navigating away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere its used in your code and then press `kb(editor.action.previewDeclaration)`. Alternatively, you can choose __Peek Definition__ from the context menu (right-click, then choose __Peek Definition__).

![Peek definition](images/cpp/peekdefn.png)

Currently, the C/C++ extension doesn't parse code in a way that helps it distinguish between competing definitions based on how the symbol is used. These competing definitions arise when the symbol defines different things in different contexts, such as occurs with overloaded functions, classes and their constructors, and other situations. When this happens, each of the competing definitions are listed in the right-hand side of the peek window with the source code of the current selection displayed on the left.

With the peek window open, you browse the list of competing definitions to find the one you're interested in. If you want to navigate to the location of one of the definitions just double-click the definition you're interested in, or by double-clicking anywhere in the source code displayed on the left-hand side of the peek window. 

### Go to Definition

You can also quickly navigate to where a symbol is defined by using the Go to Definition feature.

To go to a symbol's definition, place your cursor on the symbol anywhere its used in your code and then press `kb(editor.action.goToDeclaration)`. Alternatively, you can choose __Go to Definition__ from the context menu (right-click, then choose __Go to Definition__). When there's only one definition of the symbol, you'll navigate directly to its location, otherwise the competing definitions are displayed in a peek window as described in the previous section and you have to choose the definition that you want to go to.

## Debugging

VS Code supports the following debuggers for C/C++ depending on the operating system you are using:

* **Linux**: supports debugging using GDB
* **OS X**: supports using LLDB or GDB
* **Windows**: currently supports GDB only (using Cygwin or MinGW)

### Windows debugging (Cygwin/MinGW) <a name="debug_windows"></a>

You can debug Windows applications created using Cygwin or MinGW by using VS Code. To use Cygwin or MinGW debugging features, the debugger path must be set manually in the launch configuration (`launch.json`). To debug your Cygwin or MinGW app, add the `miDebuggerPath` property and set its value to the location of the corresponding gdb.exe for your Cygwin or MinGW environment.

For example:

```json
    "miDebuggerPath":"c:\\mingw\\bin\\gdb.exe"
```

Cygwin/MinGW debugging on Windows supports both attach and launch debugging scenarios.

### Conditional Breakpoints

Conditional breakpoints enable you to break execution on a particular line of code only when the value of the conditional is true. To set a conditional breakpoint, right-click on an existing breakpoint and select __Edit Breakpoint__, this opens a small peek window where you can enter the condition that must evaluate to true in order for the breakpoint to activate and break execution.

![A conditional break](images/cpp/condbreak.png)

In the editor, conditional breakpoints are indicated by a breakpoint symbol that has a black equals sigh inside of it. You can place the cursor over a conditional breakpoint to show its condition.

### Function breakpoints

Function breakpoints enable you to break execution at the beginning of a function instead of on a particular line of code. To set a function breakpoint, on the __Debug Panel__, right click inside the __Breakpoints__ pane, then choose __Add Function Breakpoint__ and enter the name of the function on which you want to break execution.

### Expression evaluation

VS Code supports expression evaluation in several contexts:

* You can type an expression into the __Watch__ pane and it will be evaluated each time a breakpoint is hit.
* You can type an expression into the __Debug Console__ and it will be evaluated only once.
* You can evaluate any expression that appears in your code while you're stopped at a breakpoint.

Note that expressions in the Watch Pane take effect in the application being debugged; an expression that modifies the value of a variable will modify that variable for the duration of the program.

### Multi-threaded debugging

The C/C++ extension for VS Code now has the ability to debug threaded code.

### Core Dump debugging

The C/C++ extension for VS Code also has the ability to debug using a memory dump. To debug using a memory dump, open your launch.json file for editing and add the `coreDumpPath` property to the __C++ Launch__ configuration, setting its value to be a string containing the path to the core dump. This will even work for multi-threaded programs and x86 programs being debugged on an x64 machine.

### GDB and MI commands

You can execute GDB or MI commands directly through the debug console with the `-exec` command, but be careful -- executing GDB commands directly in the debug console is untested and might crash VS Code in some cases. For more information on debugging with VS Code, see this introduction to [debugging in VS Code](/docs/editor/debugging.md).

### Other Debugging Features

* Unconditional breakpoints
* Watch window
* Call stack
* Stepping

## Known limitations

### Symbols and Code Navigation

All platforms:

* Because the extension doesn't parse function bodies, Peek Definition and Go to Definition don't work for symbols defined inside the body of a function. 

### Debugging

Windows:

* Debugging of Windows applications created using Visual Studio is not currently supported. The extension supports debugging of Cygwin and MinGW applications on Windows.
* GDB on Cygwin and MinGW cannot break a running process. To set a breakpoint when the application is running (not stopped under the debugger), or to pause the application being debugged, press `kbstyle(Ctrl-C)` in the application's terminal.
* GDB on Cygwin cannot open core dumps.

Linux:

* GDB needs elevated permissions to attach to a process. When using *attach to process*, you need to provide your password before the debugging session can begin.

OS X:

* Additional install steps need to be completed manually to use GDB on OS X. See _Manual Installation for the C++ Debugger extension_ in the [README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).
* When attaching to a process with GDB, the application being debugged cannot be interrupted. GDB will only bind breakpoints set while the application is not running (either before attaching to the application, or while the application is in a stopped state). This is due to [a bug in GDB](https://sourceware.org/bugzilla/show_bug.cgi?id=20035).
* Core dumps cannot be loaded when debugging with GDB because GDB [does not support the core dump format used in OS X](https://www.sourceware.org/ml/gdb/2014-01/msg00036.html).
* When attached to a process with GDB, break-all will end the process.

## Next Steps

Read on to find out about:

* [Editing Evolved](/docs/editor/editingevolved.md) - find out more about advanced editing features
* [Tasks](/docs/editor/tasks.md) - use tasks to build your project and more
* [Debugging](/docs/editor/debugging.md) - find out how to use the debugger with your project

## Common Questions

**Q: I can't debug multi-threaded code.**

**A:** For multi-threaded debugging, you must use the version 1.1.1 of the C/C++ Extension for Visual Studio Code.

**Q: My project won't load.**

**A:** VS Code doesn't currently support C++ project files, instead it considers a directory of your choosing to be the workspace of your project. Source code files inside that directory and its sub-directories are part of the workspace.

**Q: IntelliSense isn't working.**

**A:** In this release, IntelliSense isn't supported. We plan to enable this and other features in future releases.

**Q: How do I build/run my project?**

**A:** VS Code supports tasks that you can configure to build your application, and natively understands the output of MSBuild, CSC, and XBuild. For more information, see the [Tasks](/docs/editor/tasks.md) documentation.

**Q: Why is there a .browse.VC.db file in my workspace?**

**A:** The C/C++ extension automatically creates a database of symbol information for your workspace and stores it in a `.browse.VC.db` file in your workspace's `.vscode` folder. This improves the extension's performance and this file should not be added to source control.