---
Order: 2
Area: cpp
TOCTitle: GCC on Windows Subsystem for Linux
ContentId: dc79a06a-6665-478c-9298-a1fc9cf8010d
PageTitle: Get Started with C++ and Windows Subsystem for Linux in Visual Studio Code
DateApproved: 04/18/2019
MetaDescription: Configuring the C++ extension in Visual Studio Code to target g++ and GDB on WSL installation with Ubuntu
---
# Using C++ and WSL in VS Code

In this tutorial, you configure Visual Studio Code to use the GCC C++ compiler (g++) and GDB debugger on Ubuntu in the Windows Subsystem for Linux (WSL). GCC stands for GNU Compiler Collection; GDB is the GNU debugger. WSL is a Linux command-line environment within Windows that runs directly on the machine hardware, not in a virtual machine. One great advantage of using WSL over a remote Linux machine or container is that WSL provides direct access to the file system in Linux; you don't have to bother with setting up a remote communication pipeline such as ssh. In this tutorial, you'll edit the source code in VS Code on Windows, and then compile and debug it in WSL.

The configuration that you'll create in this tutorial applies to a single workspace (folder hierarchy), but you can easily copy the configuration files to other workspaces and use them with just a few modifications. The same general steps apply to any Linux distro you might want to use.

After completing this tutorial, you will be ready to create and configure your own workspace, and to explore the VS Code documentation for further information about its many features. This tutorial does not teach you about GCC or Linux or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following steps:

1. Install [Visual Studio Code](/download).

1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).

1. Install [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) and then use the links on that same page to install your Linux distro of choice. This tutorial uses Ubuntu.

## Set up your Linux environment

1. Open the Bash shell for WSL. If you installed an Ubuntu distro, type "Ubuntu" in the Windows search box and then click on it in the result list. For Debian, type "Debian", and so on.

   ![Ubuntu in Start Menu](images/wsl/start-ubuntu.png)

   The shell appears with a command prompt that by default consists of your user name and computer name, and puts you in your home directory. For Ubuntu it looks like this:

   ![Bash Shell](images/wsl/bash-ubuntu.png)

1. Make a directory called `projects` and then subdirectory under that called `helloworld`:

   ```bash
   mkdir projects
   cd projects
   mkdir helloworld
   ```

   This directory is where you will place your executable file before debugging. You can navigate to this folder from anywhere by typing `cd $HOME/projects/helloworld` on the Bash command line. However, for this tutorial you won't need to use the shell after this. Keep the window open, though!

1. Although you will be using VS Code to edit your code on Windows, you'll be compiling the code on Linux using the g++ compiler. You'll also debug on Linux using GDB. These tools are not installed by default on Ubuntu, so you have to install them. Fortunately, that task is quite easy!

1. From the command prompt, first run `apt-get update` to update the Ubuntu package lists. An out-of-date distro can sometimes interfere with attempts to install new packages.

   ```bash
   sudo apt-get update
   ```

   If you like, you can run `sudo apt-get update && sudo apt-get dist-upgrade` to also download the latest versions of the system packages, but this can take significantly longer depending on your connection speed.

1. From the command prompt, install the GNU compiler tools and the GDB debugger by typing:

   ```bash
   sudo apt-get install build-essential gdb
   ```

1. Verify that the install succeeded by locating g++ and gdb. If the filenames are not returned from the `whereis` command, try running the update command again.

   ```bash
   whereis g++
   whereis gdb
   ```

## Create a workspace

In Windows, you will need an empty folder called `projects` (just like you now have on Ubuntu) where you can place your helloworld project, and other VS Code projects you might create.

1. Type **cmd** in the Windows search box and then choose **Windows command prompt**.
1. Enter the following commands:

   ```cmd
   mkdir projects
   cd projects
   mkdir helloworld
   cd helloworld
   code .
   ```

The **code .** command opens VS Code in the current working folder in Windows, which becomes your **workspace**. Our task is to add three files to the workspace that will tell VS Code how to compile and debug our program. VS Code will place these files in a `.vscode` subfolder that it will create for us:

- `c_cpp_properties.json` to specify the compiler path
- `tasks.json` to specify how to build the executable
- `launch.json` to specify debugger settings

## Set WSL as the default terminal (optional)

The default integrated terminal for VS Code is PowerShell, but PowerShell doesn't know about Linux or WSL, so we need to set VS Code to use a Bash shell. You can configure that setting globally or on a per-workspace basis.

If you are only using VS Code with WSL, then you might as well go ahead and set WSL as your default terminal globally. In VS Code, press `kb(workbench.action.showCommands)` to open the Command Palette. Start typing "Terminal" and then choose **Terminal: Select Default Shell**. From the list of options, choose WSL.

But if you also use VS Code on Windows and would sometimes like to use PowerShell, then you can leave PowerShell as the default and set WSL as the terminal only for the current workspace in the `tasks.json` file.

## Configure the compiler path

Press `kb(workbench.action.showCommands)` to open the Command Palette. It looks like this:

![Command Palette](images/cpp/command-palette.png)

Start typing "C/C++" and then choose **Edit Configurations** from the list of suggestions. VS Code creates a file called `c_cpp_properties.json` in the `.vscode` subfolder and populates it with some default settings. It then opens the file in the editor. Find the `compilerPath` setting and paste in the path to the `bin` folder in WSL so that the line looks like this: `"compilerPath": "/usr/bin/g++"`.

The `compilerPath` setting is the most important setting in your configuration. The extension uses it to infer the path to the C++ standard library header files. When the extension knows where to find those files, it can provide lots of useful information to you as you write code. This information is called **IntelliSense** and you'll see some examples later in this tutorial.

The only other change is to set `intelliSenseMode` to `gcc-x64`. This setting helps the IntelliSense feature provide the correct information for GCC. For this tutorial, you don't need to be concerned with the other settings.

You might notice that there is also an `includePath` setting. You only need to set this if your program includes header files that are not in your workspace or in the standard library path. In fact, we recommend that you delete the setting entirely if you don't need it. We don't need it so it's removed from the code below. Your complete `c_cpp_properties.json` file should look like this:

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
            "compilerPath": "/usr/bin/g++",
            "cStandard": "c11",
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

## Create a build task

Next, create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the g++ compiler on WSL to create an executable file based on the source code.

1. From the main menu, choose **View > Command Palette** and then type "task" and choose **Tasks: Add a default build task** and then choose **Others**. VS Code creates a minimal `tasks.json` file and opens it in the editor.

1. Go ahead and replace the entire file contents with the following code snippet, but be sure to replace the placeholders with your actual Linux user name (the $HOME environment variable doesn't work here for WSL). To see your Linux user name, from the Bash shell type:

   ```bash
    cd $HOME
    pwd
   ```

   ```json
    {
        "version": "2.0.0",
        "windows": {
            "options": {
                "shell": {
                    "executable": "c:\\windows\\sysnative\\bash.exe",
                    "args": ["-c"]
                }
            }
        },
        "tasks": [
            {
                "label": "build hello world on WSL",
                "type": "shell",
                "command": "g++",
                "args": [
                    "-g",
                    "-o",
                    "/home/<your linux user name>/projects/helloworld/helloworld.out",
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

    The `command` setting specifies the program to run; in this case that is g++.exe. The `args` array specifies the command-line arguments that will be passed to g++. These arguments must be specified in the order expected by the compiler. You are telling g++ on WSL to grab the source file in our current workspace directory on Windows, compile it, then place the executable file in our `helloworld` folder under the `$HOME/projects/helloworld` folder in WSL.

    The `label` value is what you will see in the VS Code Command Palette; you can name this whatever you like.

    The `"isDefault": true` value in the `group` object specifies that this task will be run when you press `kb(workbench.action.tasks.build)`. This property is for convenience only; if you set it to false you'll have to run it from the Command Palette menu under "Run Build Task".

    The `windows.options.shell` setting tells VS Code to use the WSL Bash shell to run the commands that are defined in this file. If you set the default terminal to WSL globally in the earlier step in this tutorial, then you can remove the `windows` setting here.

## Configure debug settings

Next, you'll create a `launch.json` file to configure VS Code to launch GDB on WSL when you press `kb(workbench.action.debug.start)` to debug the program. From the main menu, choose **Debug > Add Configuration...** and then choose **C++ (GDB/LLDB)**. VS Code creates the file and opens it in the editor. The `program` setting specifies the program you want to debug. Set it to `helloworld.out` to match what you specified in `tasks.json`.

The path to the executable must be a literal path; you can't use `$HOME` in `launch.json` with WSL. You will have to substitute your actual Linux user name in the `program` and `cwd` properties.

Under `sourceFileMap`, you need to tell GDB where to find the header files. Currently, this value must point to the actual location in your WSL distro folder within the Windows file system. Happily, there is an easy way to get that after you add the source code file to this project. For now, your complete `launch.json` file should look something like this. Of course, you need to provide your specific path information for the `cwd`, `program`, and `/usr` settings:

```json
{
"version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "/home/<your Linux user name>/projects/helloworld/helloworld.out",
            "args": [""],
            "stopAtEntry": true,
            "cwd": "/home/<your Linux user name>/projects/helloworld/",
            "environment": [],
            "externalConsole": true,
            "windows": {
                "MIMode": "gdb",
                "miDebuggerPath": "/usr/bin/gdb",
                "setupCommands": [
                    {
                        "description": "Enable pretty-printing for gdb",
                        "text": "-enable-pretty-printing",
                        "ignoreFailures": true
                    }
                ]
            },
            "pipeTransport": {
                "pipeCwd": "",
                "pipeProgram": "c:\\windows\\sysnative\\bash.exe",
                "pipeArgs": ["-c"],
                "debuggerPath": "/usr/bin/gdb"
            },
            "sourceFileMap": {
                "/mnt/c": "${env:systemdrive}/",
                "/usr": "C:\\Users\\<path to WSL directory which you will place here later>"
            }
        }
    ]
}
```

By default, the C++ extension adds a breakpoint to the first line of `main`. The `stopAtEntry` value is set to `true` to cause the debugger to stop on that breakpoint when you start debugging. You can set this to `false` if you prefer to ignore it.

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

        vector<string> msg {"Hello", "C++", "World", "from", "VS Code!", "and the C++ extension!"};

        for (const string& word : msg)
        {
            cout << word << " ";
        }
        cout << endl;
    }
   ```

1. Now press `kb(workbench.action.files.save)` to save the file. Notice how all the files you have just edited appear in the **File Explorer** view in the left panel of VS Code:

   ![File Explorer](images/cpp/file-explorer-mingw.png)

This same panel is also used for source control, debugging, searching and replacing text, and managing extensions. The buttons on the left control those views. You'll look at the **Debug View** later in this tutorial. You can find out more about the other views in the VS Code documentation.

## Set path to system headers

Now that you have a source file, you can use it to easily get the Windows path to the system headers in your Linux distro. You need to specify this value in the file mappings in `launch.json` file so that GDB can step into system headers if you press `kb(workbench.action.debug.stepInto)` during debugging.

1. In `helloworld.cpp`, hover your mouse over the `string` in this statement: `vector<string> msg...`
1. Right-click and choose **Go to definition** to open `stringfwd.h` in the editor.
1. Right click on the tab with the file name and choose **Copy path**.
1. Navigate back to `launch.json` and replace the path in this value with the path you just copied. Then delete everything in your new path back to `usr/`. Finally, convert the "/" path separators to "\\". This gives VS Code the information it needs to find the `usr` folder for your specific distro; it can find the header files from there. The end result will look something like this, but not exactly, so be sure to use your actual path:

   ```json
   "/usr": "C:\\Users\\<my windows user name>\\AppData\\Local\\Packages\\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\\LocalState\\rootfs\\usr\\"
   ```

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

   ![Statement completion IntelliSense](images/cpp/cpp-intellisense-vector.png)

You can press the TAB key to insert the selected member; then, when you add the opening parenthesis, you will see information about any arguments that the function requires.

## Build the program

1. To run the build task that you defined in `tasks.json`, press `kb(workbench.action.tasks.build)` or from the main menu choose **View > Command Palette** and start typing "Tasks: Run Build Task". The option will appear before you finish typing.
1. When the task starts, you should see the integrated Terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed. For a successful g++ build, the output looks something like this:

   ![G++ build output in terminal](images/wsl/wsl-task-in-terminal.png)

1. As the message instructs, press any key to close the build message; the terminal now returns to the shell command prompt.

## Start a debugging session

1. You are now ready to run the program. Press `kb(workbench.action.debug.start)` or from the main menu choose **Debug > Start Debugging**. Before you start stepping through the code, let's take a moment to notice several changes in the user interface:

- The integrated terminal appears at the bottom of the code editor. In the **Debug Output** tab, you see output that indicates the debugger is up and running.
- The code editor highlights the first statement in the `main` method. This is a breakpoint that the C++ extension automatically sets for you:

   ![Initial breakpoint](images/wsl/wsl-breakpoint-default.png)

- The workspace pane on the left shows debugging information. You'll see an example later in the tutorial.

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

   ![Debugging controls](images/cpp/debug-controls.png)

## Step through the code

Now you're ready to start stepping through the code.

1. Click or press the **Step over** icon in the debugging control panel.

   ![Step over button](images/cpp/step-over-button.png)

   This will advance program execution to the first line of the for loop, and skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the left.

   ![Debugging windows](images/cpp/debugger-panel.png)

   In this case, the errors are expected because, although the variable names for the loop are now visible to the debugger, the statement has not executed yet, so there is nothing to read at this point. The contents of `msg` are visible, however, because that statement has completed.

1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.
1. Press **Step over** again to execute the `cout` statement. (Note that as of the March 2019 release, the C++ extension does not print any output to the **Debug Console** until the loop exits.)
1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

   ![Breakpoint in gcc standard library header](images/cpp/gcc-system-header-stepping.png)

   To return to your own code, one way is to keep pressing **Step over**. Another way is to set a breakpoint in your code by switching to the `helloworld.cpp` tab in the code editor, putting the insertion point somewhere on the `cout` statement inside the loop, and pressing `kb(editor.debug.action.toggleBreakpoint)`. A red dot appears in the gutter on the left to indicate that a breakpoint has been set on this line.

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   Then press `kb(workbench.action.debug.start)` to start execution from the current line in the standard library header. Execution will break on `cout`. If you like, you can press `kb(editor.debug.action.toggleBreakpoint)` again to toggle off the breakpoint.

   When the loop has completed, you can see the output in the **Debug Console** tab of the integrated terminal, along with some other diagnostic information that is output by GDB.

   ![Debug console display](images/wsl/debug-console-output-wsl.png)

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
