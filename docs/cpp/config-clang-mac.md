---
Order: 3
Area: cpp
TOCTitle: Clang on macOS
ContentId: 6ef32219-81ad-4d73-84b8-8d4384a45f8a
PageTitle: Get Started with C++ and Clang/LLVM in Visual Studio Code on macOS
DateApproved: 04/17/2019
MetaDescription: Configuring the C++ extension in Visual Studio Code to target Clang/LLVM
---
# Using Clang in Visual Studio Code

In this tutorial, you configure Visual Studio Code on macOS to use the Clang/LLVM compiler and debugger. The configuration applies to a single workspace (folder hierarchy), but you can easily copy the configuration files to other workspaces where the same settings are required. After configuring VS Code, you will compile and debug a simple program to get familiar with the VS Code user interface. After completing this tutorial, you will be ready to create and configure your own workspace, and to explore the VS Code documentation for further information about its many features. This tutorial does not teach you about Clang or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following steps:

1. Install [Visual Studio Code](/download) and follow the setup instructions in [Visual Studio Code on macOS](/docs/setup/mac.md).

1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).

## Add VS Code to your PATH

In order to start VS Code from the command line, we'll need to add it to the PATH environment variable. This only needs to be done once, on first use.

1. Open VS Code
1. Press `kb(workbench.action.showCommands)` to open the Command Palette.
1. Start typing "Shell" and from the list of suggestions choose **Shell Command: Install 'code' command in PATH**.

   ![Shell command in Command Palette](images/clang-mac/mac-command-palette-shell-command.png)

1. You should see a notification in the lower right of the VS Code window that tells you that VS Code was successfully added to the PATH.
1. Close VS Code.

## Start VS Code in a folder

In the macOS Terminal, create an empty folder called "projects" and then a subfolder called "helloworld". Navigate into it, and open VS Code (`code`) in that folder (`.`) by entering the following commands:

```bash
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

The **code .** command opens VS Code in the current working directory, which becomes your ***workspace***. Our task is to add three files to the workspace that will tell VS Code how to compile and debug our program. VS Code will place these files in a `.vscode` subdirectory that it will create for us:

- `c_cpp_properties.json` to specify the compiler path
- `tasks.json` to specify how to build the executable
- `launch.json` to specify debugger settings

## Configure the compiler path

1. Press `kb(workbench.action.showCommands)` to open the Command Palette. Start typing "C/C++" and then choose **Edit Configurations** from the list of suggestions. VS Code creates a file called `c_cpp_properties.json` and populates it with some default settings.
1. Find the `compilerPath` setting and paste in the path to the `bin` folder. For Clang, this is typically `usr/bin/clang/`.

The `compilerPath` setting is the most important setting in your configuration. The extension uses it to infer the path to system header files, which it needs for IntelliSense support. There is no need to specify it explicitly in the `includePath` setting unless you have additional or non-standard paths in your code base. In fact, we recommend that you delete the setting entirely if you don't need it.

1. On macOS, you must set the `macFrameworkPath` to point to the system header files.
1. The only other change is to set `intelliSenseMode` to `clang-x64"`.

Your complete `c_cpp_properties.json` file should look like this:

```json
{
    "configurations": [
        {
            "name": "macOS",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

## Create a build task

Next, we need to create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the g++ compiler on WSL to create an executable file based on the source code.

1. From the main menu, choose **View > Command Palette** and then type "task" and choose **Tasks: Add a default build task** then choose **Others**. VS Code creates a minimal `tasks.json` file and opens it in the editor.
1. Go ahead and replace the entire file contents with the following code snippet:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build with Clang",
            "type": "shell",
            "command": "clang++",
            "args": [
                "-std=c++17",
                "-stdlib=libc++",
                "helloworld.cpp",
                "-o",
                "helloworld.out",
                "--debug"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

The `label` value is used to identify the task in the VS Code Command Palette; you can name this whatever you like. The `args` array specifies the command-line arguments that will be passed to the compiler that was specified in the previous step. These arguments must be specified in the order expected by the compiler.

The `"isDefault": true` value in the `group` object specifies that this task will be run when you press `kb(workbench.action.tasks.build)`. The `--debug` argument causes debug symbols to be produced, which is required for stepping through code when you debug.

## Configure debug settings

Next, we'll configure VS Code to launch gdb when we press `kb(workbench.action.debug.start)` to debug the program. Note that
the program name `helloworld.out` matches what we specified in `tasks.json`.

By default, the C++ extension adds a breakpoint to the first line of `main`. The `stopAtEntry` value is set to `true` to cause the debugger to stop on that breakpoint. You can set this to `false` if you prefer to ignore it.

Your complete `launch.json` file should look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(lldb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/helloworld.out",
            "args": [],
            "stopAtEntry": true,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "lldb",
            "logging": {
                "trace": true,
                "traceResponse": true,
                "engineLogging": true
            }
        }
    ]
}
```

## Add a source code file

1. In the main VS Code menu, click on **File > New File** and name it `helloworld.cpp`.
1. Paste in this source code:

    ```cpp
    #include <iostream>
    #include <vector>
    #include <string>

    using namespace std;

    int main()
    {

        vector<string> msg {"Hello", "C++", "World", "from", "VS Code!"};

        for (const string& word : msg)
        {
            cout << word << " ";
        }
        cout << endl;
    }
    ```

1. Now press `kb(workbench.action.files.save)` to save the file. Notice how all the files we have just edited appear in the **File Explorer** view in the left panel of VS Code:

![File Explorer](images/clang-mac/file-explorer-mac.png)

This same panel is also used for source control, debugging, searching and replacing text, and managing extensions. The buttons on the left control those views. We'll look at the **Debug View** later in this tutorial. You can find out more about the other views in the VS Code documentation.

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/cpp/cpp-intellisense-vector.png)

## Build the program

1. To run the build task that you defined in tasks.json, press `kb(workbench.action.tasks.build)` or from the main menu choose **View > Command Palette** and start typing "Tasks: Run Build Task". The option will appear before you finish typing.
1. When the task starts, you should see an integrated terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed. For a successful Clang build, the output looks something like this:

![Clang build output in terminal](images/clang-mac/clang-task-in-terminal.png)

1. As the message instructs, press any key to close the integrated terminal.

## Start a debugging session

1. You are now ready to run the program. Press `kb(workbench.action.debug.start)` or from the main menu choose **Debug > Start Debugging**. Before we start stepping through the code, let's take a moment to notice several changes in the user interface:

- The **Debug Console** appears and displays output from the debugger.

- The code editor highlights the first statement in the `main` method. This is a breakpoint that the C++ extension automatically sets for you:

![Initial breakpoint](images/cpp/breakpoint-default.png)

- The workspace pane on the left now shows debugging information. These windows will dynamically update as you step through the code.

![Debugging windows](images/clang-mac/mac-debugging-windows.png)

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

![Debugging controls](images/cpp/debug-controls.png)

## Step through the code

Now we're ready to start stepping through the code.

1. Click or press the **Step over** icon in the debugging control panel.

    ![Step over button](images/cpp/step-over-button.png)

    This will advance program execution to the first line of the for loop, and skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the left. In this case, the errors are expected because, although the variable names for the loop are now visible to the debugger, the statement has not executed yet, so there is nothing to read at this point. The contents of `msg` are visible, however, because that statement has completed.
1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.
1. Press **Step over** again to execute the `cout` statement. Your application is now running in a macOS **Terminal** window. Press **Cmd+Tab** to find it. You should see `Hello` output there on the command line.
1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

    ![Breakpoint in gcc standard library header](images/clang-mac/lldb-header-stepping.png)

    To return to your own code, one way is to keep pressing **Step over**. Another way is to set a breakpoint in your code by switching to the `helloworld.cpp` tab in the code editor, putting the insertion point somewhere on the `cout` statement inside the loop, and pressing `kb(editor.debug.action.toggleBreakpoint)`. A red dot appears in the gutter on the left to indicate that a breakpoint has been set on this line.

    ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

    Then press `kb(workbench.action.debug.start)` to start execution from the current line in the standard library header. Execution will break on `cout`. If you like, you can press `kb(editor.debug.action.toggleBreakpoint)` again to toggle off the breakpoint.

## Set a watch

Sometimes you might want to keep track of the value of a variable as your program executes. You can do this by setting a **watch** on the variable.

1. Place the insertion point inside the loop. In the **Watch** window, click the plus sign and in the text box, type `word`, which is the name of the loop variable. Now view the Watch window as you step through the loop.

   ![Watch window](images/cpp/watch-window.png)

1. Add another watch by adding this statement before the loop: `int i = 0;`. Then, inside the loop, add this statement: `++i;`. Now add a watch for `i` as you did in the previous step.

1. To quickly view the value of any variable while execution is paused on a breakpoint, you can simply hover over it with the mouse pointer.

   ![Mouse hover](images/cpp/mouse-hover.png)

## Next steps

- Explore the [VS Code User Guide](/docs/editor/codebasics.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md)
- Create a new workspace, copy your .json files to it, adjust the necessary settings for the new workspace path, program name, and so on, and start coding!
