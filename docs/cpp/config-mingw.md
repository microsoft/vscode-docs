---
Order: 1
Area: cpp
TOCTitle: Mingw on Windows
ContentId: 7efec972-6556-4526-8aa8-c73b3319d612
PageTitle: Get Started with C++ and Mingw-w64 in Visual Studio Code
DateApproved: 04/17/2019
MetaDescription: Configuring the C++ extension in Visual Studio Code to target g++ and gdb on a Mingw-w64 installation
---
# Using Mingw in Visual Studio Code

In this tutorial, you configure Visual Studio Code on Windows to use the g++ compiler and gdb debugger in [Mingw-w64](http://mingw-w64.org/doku.php/start). Mingw-w64 is a Linux development environment that runs on Windows.

The configuration that you'll create in this tutorial applies to a single workspace (folder hierarchy), but you can easily copy the configuration files to other workspaces and use them with just a few modifications.

After configuring VS Code, you will compile and debug a simple program to get familiar with the VS Code user interface. After completing this tutorial, you will be ready to create and configure your own workspace, and to explore the VS Code documentation for further information about its many features. This tutorial does not teach you about GCC or Mingw-w64 or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following:

1. Install [Visual Studio Code](/download).

1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).

1. Install [Mingw-w64](http://mingw-w64.org/doku.php/download/mingw-builds) to a folder that has no spaces in its path (in other words, NOT the default location of C:/Program Files/). In this tutorial, we assume it is installed under `C:\Mingw-w64`.

1. Install a shell program such as Bash. If you have installed Git for Windows, you already have a Bash shell that the extension can discover and use for its integrated Terminal. If you don't have Git for Windows installed, then you can install bash.exe as part of [MSYS2](https://sourceforge.net/projects/msys2/).
1. In the Windows search box, type "path" and then choose "Edit the system environment variables" from the results list.
1. Add the paths to your Bash shell and to your mingw-w64 `bin` folder to the Windows PATH environment variable. The extension will pass this environment variable to the Bash shell when it opens it.

## Configure Bash console to use

If you do not have Windows Subsystem for Linux (WSL) installed, you can skip to the next section.

The Bash shell that WSL installs can conflict with whatever shell you intend to use for Mingw-w64. By default, the VS Code integrated Terminal first looks for a WSL Bash console. This is located in either "C:/Windows/System32/bash.exe" (for 64-bit VS Code) or "C:/Windows/sysnative/bash.exe" (for 32-bit VS Code). You can't use the WSL Bash console with Mingw-w64 because it sees the Windows file system as being under the /mnt/ folder and this causes various problems. Therefore, you need to make sure that VS Code knows which console you intend to use for this project.

1. From the VS Code main menu, open **View > Command Palette** and start typing "Settings".
1. From the suggestion list, choose **Preferences: Open Settings (JSON)**. For example, if you have Git for Windows installed, you can use its shell by adding this line:

   ```json
   "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
   ```

You can use any other shell by specifying its full path in this setting.

## Create a workspace

1. At a Windows command prompt, create an empty folder called `projects` where you can place all your VS Code projects. Then create a subfolder called `helloworld`, navigate into it, and open VS Code (`code`) in that folder (`.`) by entering the following commands:

   ```cmd
   mkdir projects
   cd projects
   mkdir helloworld
   cd helloworld
   code .
   ```

The **code .** command opens VS Code in the current working folder, which becomes your **workspace**. Our task is to add three files to the workspace that will tell VS Code how to compile and debug our program. VS Code will place these files in a `.vscode` subfolder that it will create for us:

- `c_cpp_properties.json` to specify the compiler path
- `tasks.json` to specify how to build the executable
- `launch.json` to specify debugger settings

## Configure the compiler path

1. Press `kb(workbench.action.showCommands)` to open the Command Palette. It looks like this:

   ![Command Palette](images/cpp/command-palette.png)

1. Start typing "C/C++" and then choose **Edit Configurations** from the list of suggestions. VS Code creates a file called `c_cpp_properties.json` and populates it with some default settings.
1. Find the `compilerPath` setting and paste in the path to the `bin` folder. If you installed Mingw-w64 version 8.1.0 under C:\mingw-w64, the path will look like this: `C:\mingw-w64\x86_64-8.1.0-win32-seh-rt_v6-rev0\mingw64\bin\g++.exe`.

   The `compilerPath` setting is the most important setting in your configuration. The extension uses it to infer the path to the C++ standard library header files. When the extension knows where to find those files, it can provide lots of useful information to you as you write code. This information is called *IntelliSense* and you'll see some examples later in this tutorial.

1. Set `intelliSenseMode` to `gcc-x64`. This setting helps the IntelliSense feature provide the correct information for GCC.

You might notice that there is also an `includePath` setting in the default file. You only need to set this if your program includes header files that are not in your workspace or in the standard library path. In fact, we recommend that you delete the setting entirely if you don't need it. It's not needed in this tutorial it so it's removed from the code below. Your complete `c_cpp_properties.json` file should look like this (but be sure to use your specific Mingw-w64 path):

```json
{
    "configurations": [
        {
            "name": "Win32",
            "defines": [
                "_DEBUG",
                "UNICODE"
            ],
            "compilerPath": "C:/mingw-w64/x86_64-8.1.0-win32-seh-rt_v6-rev0/mingw64/bin/g++.exe",
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

## Create a build task

Next, create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the g++ compiler on WSL to create an executable file based on the source code.

1. From the main menu, choose **View > Command Palette** and then type "task" and choose **Tasks: Add a default build task** then choose **Others**. VS Code creates a minimal `tasks.json` file and opens it in the editor.

1. Go ahead and replace the entire file contents with the following code snippet:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build hello world",
            "type": "shell",
            "command": "g++",
            "args": [
                "-g",
                "-o",
                "helloworld",
                "helloworld.cpp"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

   The `command` setting specifies the program to run; in this case that is g++.exe. The `args` array specifies the command-line arguments that will be passed to g++. These arguments must be specified in the order expected by the compiler.

   The `label` value is what you will see in the VS Code Command Palette; you can name this whatever you like.

   The `"isDefault": true` value in the `group` object specifies that this task will be run when you press `kb(workbench.action.tasks.build)`. This property is for convenience only; if you set it to false you'll have to run it from the Command Palette menu under "Run Build Task".

## Configure debug settings

Next, we'll configure VS Code to launch the GCC debugger (gdb.exe) when you press `kb(workbench.action.debug.start)`. Note that
the program name `helloworld.exe` matches what you specified in `tasks.json`. You will need to adjust your `miDebuggerPath` value to exactly match the path to your Mingw-w64 installation.

By default, the C++ extension adds a breakpoint to the first line of `main`. The `stopAtEntry` value is set to `true` to cause the debugger to stop on that breakpoint. You can set this to `false` if you prefer to ignore it.

Your complete `launch.json` file should look something like this:

```json
{
   "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/helloworld.exe",
            "args": [],
            "stopAtEntry": true,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "C:/mingw-w64/x86_64-8.1.0-win32-seh-rt_v6-rev0/mingw64/bin/gdb.exe",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
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

1. Now press `kb(workbench.action.files.save)` to save the file. Notice how all the files you have just edited appear in the **File Explorer** view in the left panel of VS Code:

   ![File Explorer](images/cpp/file-explorer-mingw.png)

   This same panel is also used for source control, debugging, searching and replacing text, and managing extensions. The buttons on the left control those views. We'll look at the **Debug View** later in this tutorial. You can find out more about the other views in the VS Code documentation.

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/cpp/cpp-intellisense-vector.png)

You can press the TAB key to insert the selected member; then, when you add the opening parenthesis, you will see information about any arguments that the function requires.

## Build the program

1. To run the build task that you defined in `tasks.json`, press `kb(workbench.action.tasks.build)` or from the main menu choose **View > Command Palette** and start typing "Tasks: Run Build Task". The option will appear before you finish typing.
1. When the task starts, you should see the integrated Terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed. For a successful g++ build, the output looks something like this:

   ![G++ build output in terminal](images/mingw/gcc-task-in-terminal.png)

1. As the message instructs, press any key to close the build message; the terminal now returns to the shell command prompt.

## Start a debugging session

1. You are now ready to run the program. Press `kb(workbench.action.debug.start)` or from the main menu choose **Debug > Start Debugging**. Before you start stepping through the code, let's take a moment to notice several changes in the user interface:

- The Terminal shows the command line that was used to start gdb. It shows the paths to the C++ extension, as well as to your mingw-w64 installation. In general, you should never need to be concerned with the details here:

   ```cmd
   $ env "c:\Users\satyan\.vscode\extensions\ms-vscode.cpptools-0.21.0\debugAdapters\bin\WindowsDebugLauncher.exe" --std
   in=Microsoft-MIEngine-In-slkzoloe.km0 --stdout=Microsoft-MIEngine-Out-b2nqrdmk.cc2 --stderr=Microsoft-MIEngine-Error-
   f42jy5qt.jfs --pid=Microsoft-MIEngine-Pid-32dwsmv3.tuh --dbgExe=C:/mingw-w64/x86_64-8.1.0-win32-seh-rt_v6-rev0/mingw6
   4/bin/gdb.exe --interpreter=mi
   ```

- The code editor highlights the first statement in the `main` method. This is a breakpoint that the C++ extension automatically sets for you:

   ![Initial breakpoint](images/cpp/breakpoint-default.png)

- The workspace pane on the left now shows debugging information. You'll see an example later in this tutorial.

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

![Debugging controls](images/cpp/debug-controls.png)

## Step through the code

Now we're ready to start stepping through the code.

1. Click or press the **Step over** icon in the debugging control panel.

   ![Step over button](images/cpp/step-over-button.png)

   This will advance program execution to the first line of the for loop, and skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the left.

   ![Debugging windows](images/cpp/debugger-panel.png)

   In this case, the errors are expected because, although the variable names for the loop are now visible to the debugger, the statement has not executed yet, so there is nothing to read at this point. The contents of `msg` are visible, however, because that statement has completed.

1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.
1. Press **Step over** again to execute the `cout` statement. Note: Currently you do not see any output in the Terminal window until the entire loop has completed.
1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

   ![Breakpoint in gcc standard library header](images/cpp/gcc-system-header-stepping.png)

   To return to your own code, one way is to keep pressing **Step over**. Another way is to set a breakpoint in your code by switching to the `helloworld.cpp` tab in the code editor, putting the insertion point somewhere on the `cout` statement inside the loop, and pressing `kb(editor.debug.action.toggleBreakpoint)`. A red dot appears in the gutter on the left to indicate that a breakpoint has been set on this line.

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   Then press `kb(workbench.action.debug.start)` to start execution from the current line in the standard library header. Execution will break on `cout`. If you like, you can press `kb(editor.debug.action.toggleBreakpoint)` again to toggle off the breakpoint.

   When the loop has completed, you can see the output in the **Terminal** tab of the integrated terminal,. In the **Debug Output** tab, you can see diagnostic information that is output by GDB.

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