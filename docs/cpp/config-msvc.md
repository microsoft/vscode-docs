---
Order: 4
Area: cpp
TOCTitle: Microsoft C++
ContentId: c8b779d6-79e2-49d6-acfc-430d7ac3a299
PageTitle: Configure Visual Studio Code for Microsoft C++
DateApproved: 04/17/2019
MetaDescription: Configure the C++ extension in Visual Studio Code to target Microsoft C++ on Windows.
---
# Configure VS Code for Microsoft C++

In this tutorial, you configure Visual Studio Code to use the Microsoft C++ compiler and debugger on Windows. The configuration applies to a single workspace (folder hierarchy), but you can easily copy the configuration files to other workspaces. After configuring VS Code, you will compile and debug a simple program to get familiar with the VS Code user interface. After completing this tutorial, you will be ready to create and configure your own workspace, and to explore the VS Code documentation for further information about its many features. This tutorial does not teach you details about Windows or the Microsoft C++ toolset or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following:

1. Install [Visual Studio Code](/download).
1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).

1. Install the Microsoft C++ (MSVC) compiler toolset.
   - If you have a recent version of Visual Studio, open the Visual Studio Installer from the Windows Start menu and verify that the C++ workload is checked. If it's not installed, then check the box and click the **Modify** button in the installer.
   - Or, download the standalone toolset by clicking the Visual Studio Build Tools link on the [Downloads page](https://visualstudio.microsoft.com/downloads/#other) and follow the prompts. With the default settings, the download size is about 1GB and the size on disk is about 4GB. If you don't require CMake support (and the Windows SDK that it depends on) the size on disk should be about 3GB.

## Start VS Code from the Developer Command Prompt

To build and debug code with MSVC in VS Code, you need to start VS Code from a **Developer Command Prompt for Visual Studio**. (An ordinary Windows command prompt, or a Bash prompt, does not have the necessary environment variables set.)

1. To open the Developer Command Prompt for VS, start typing "Developer" in the Windows Start menu, and you should see it appear in the list of suggestions. The exact name depends on which version of Visual Studio or the Visual Studio Build Tools you have installed. Click on the item to open the prompt.

![Developer Command Prompt](images/msvc/developer-cmd-prompt-menu.png)

1. Next, create an empty folder called "projects" where you can store all your VS Code projects, then create a subfolder called "helloworld", navigate into it, and open VS Code (`code`) in that folder (`.`) by entering the following commands:

```cmd
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

The **code .** command opens VS Code in the current working folder, which becomes your ****workspace****. Our task is to add three files to the workspace that will tell VS Code how to compile and debug our program. VS Code will place these files in a `.vscode` subfolder that it will create for us:

- `c_cpp_properties.json` to specify the compiler path
- `tasks.json` to specify how to build the executable
- `launch.json` to specify debugger settings

## Configure the compiler path

1. Press `kb(workbench.action.showCommands)` to open the Command Palette. It looks like this:

   ![Command Palette](images/cpp/command-palette.png)

1. Start typing "C/C++" and then choose **Edit Configurations** from the list of suggestions. VS Code creates a file called `c_cpp_properties.json` in the `.vscode` subfolder and populates it with some default settings. It then opens the file in the editor. If you have Visual Studio installed, the Microsoft C/C++ Extension should detect it and automatically populate the `compilerPath` setting for you. If not, you should add or update the `compilerPath` setting and paste in the path to cl.exe. In a default Visual Studio 2017 Build Tools installation, it looks something like this, depending on which specific version you have installed: "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16.27023/bin/Hostx64/x64/cl.exe".

1. Ensure the `intelliSenseMode` value is set to `"msvc-x64"`.

The extension can now infer the path to the MSVC include folder, which it needs for IntelliSense support. There is no need to specify the `includePath` value explicitly unless you have additional paths to header files in your code base. In fact, we recommend that you delete the setting entirely if you don't need it. We don't need it so it's removed from the code below.

Your complete `c_cpp_properties.json` file should like something like this:

```json
{
    "configurations": [
        {
            "name": "Win32",
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "compilerPath": "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16.27023/bin/Hostx64/x64/cl.exe",
            "windowsSdkVersion": "10.0.17763.0",
            "intelliSenseMode": "msvc-x64",
            "cStandard": "c11",
            "cppStandard": "c++17"
        }
    ],
    "version": 4
}
```

## Create a build task

Next, create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the Microsoft C++ compiler (cl.exe) to create an executable file based on the source code.

1. From the main menu, choose **View > Command Palette** and then type "task" and choose **Tasks: Add a default build task** then choose **Others**. VS Code creates a minimal `tasks.json` file and opens it in the editor.

1. Go ahead and replace the entire file contents with the following code snippet:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "msvc build",
            "type": "shell",
            "command": "cl.exe",
            "args": [
                "/EHsc",
                "/Zi",
                "/Fe:",
                "helloworld.exe",
                "helloworld.cpp"
            ],
            "group":  {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "reveal":"always"
            },
            "problemMatcher": "$msCompile"
        }
    ]
}

```

The `label` value will be used in the VS Code Command Palette and can be whatever name you like. The `command` value says that we are using `cl.exe`, the MSVC compiler. The `args` array specifies the command-line arguments that will be passed to the compiler that was specified in the previous step. They must appear in the order expected by the compiler.  In this example, we are specifying the exception handling mode (EHsc) and telling the compiler to produce a debug build with symbols (Zi). The `/Fe:` argument tells the compiler to name the executable "helloworld.exe".

The `group` value specifies that this task will be run when you press `kb(workbench.action.tasks.build)`.

## Configure debug settings

Next, you'll create a `launch.json` file to configure VS Code to launch the debugger when you press `kb(workbench.action.debug.start)` to debug the program.

1. From the main menu, choose **Debug > Add Configuration...** and then choose **C/C++ Windows (Launch)**. This causes the `launch.json` file to be created and opened. Replace the contents of the file with this

```json
{
   "version": "0.2.0",
    "configurations": [
        {
            "name": "(msvc) Launch",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "${workspaceFolder}/helloworld.exe",
            "args": [],
            "stopAtEntry": true,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false
        }
    ]
}
```

Note that the program name `helloworld.exe` matches what we specified in `tasks.json`.

By default, the C++ extension adds a breakpoint to the first line of `main`. The `stopAtEntry` value is set to `true` to cause the debugger to stop on that breakpoint. You can set this to `false` if you prefer to ignore it.

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

1. Now press `kb(workbench.action.files.save)` to save the file. Now notice how all the files we have just edited appear in the **File Explorer** view in the left panel of VS Code:

![File Explorer](images/msvc/file-explorer-msvc.png)

This same panel is also used for source control, debugging, searching and replacing text, and managing extensions. The buttons on the left control those views. We'll look at the **Debug View** later in this tutorial. You can find out more about the other views in the VS Code documentation.

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/cpp/cpp-intellisense-vector.png)

You can press the TAB key to insert the selected member; then, when you add the opening parenthesis, you will see information about any arguments that the function requires.

## Build the program

1. To run the build task that you defined in `tasks.json`, press `kb(workbench.action.tasks.build)` or from the main menu choose **View > Command Palette** and start typing "Tasks: Run Build Task". The option will appear before you finish typing.

   **Note:** If you see an error message that looks like this: **cl.exe: command not found**, it means you have not started VS Code from a Developer Command Prompt for VS. See the first section of this tutorial for more information.

1. When the task starts, you should see the integrated Terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed. For a successful MSVC build, the output looks something like this:

![MSVC build output in terminal](images/msvc/msvc-task-in-terminal.png)

1. As the message instructs, press any key to close the build message; the terminal now returns to the shell command prompt.

## Start a debugging session

1. You are now ready to run the program. Press `kb(workbench.action.debug.start)` or from the main menu choose **Debug > Start Debugging**. Before we start stepping through the code, let's take a moment to notice several changes in the user interface:

- The code editor highlights the first line in the `main` method. This is a breakpoint that the C++ extension automatically sets for you:

![Initial breakpoint](images/msvc/msvc-breakpoint-entry.png)

- The workspace pane on the left now shows debugging information, but there isn't any useful information yet because no program statements have been executed yet, other than some system startup code, which is reflected in the Threads window:

![Debugging windows](images/msvc/msvc-debugging-window.png)

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

![Debugging controls](images/cpp/debug-controls.png)

## Step through the code

Now we're ready to start stepping through the code.

1. Click or press the **Step over** icon in the debugging control panel until the `for (const string& word : msg)` statement is highlighted.

    ![Step over button](images/cpp/step-over-button.png)

    The **Step Over** command skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the left. In this case, the errors are expected because, although the variable names for the loop are now visible to the debugger, the statement has not executed yet, so there is nothing to read at this point. The contents of `msg` are visible, however, because that statement has completed.

1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.

1. Press **Step over** again to execute the `cout` statement. **Note** As of the March 2019 version of the extension, no output is displayed until the loop completes.

1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

    ![Breakpoint in gcc standard library header](images/msvc/msvc-system-header-stepping.png)

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
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
- Create a new workspace, copy your .json files to it, adjust the necessary settings for the new workspace path, program name, and so on, and start coding!