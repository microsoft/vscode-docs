---
Order: 4
Area: cpp
TOCTitle: GCC on Windows Subsystem for Linux
ContentId: dc79a06a-6665-478c-9298-a1fc9cf8010d
PageTitle: Get Started with C++ and Windows Subsystem for Linux in Visual Studio Code
DateApproved: 5/13/2022
MetaDescription: Configuring the C++ extension in Visual Studio Code to target g++ and GDB on WSL installation with Ubuntu
---
# Using C++ and WSL in VS Code

In this tutorial, you will configure Visual Studio Code to use the GCC C++ compiler (g++) and GDB debugger on Ubuntu in the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) (WSL). GCC stands for GNU Compiler Collection; GDB is the GNU debugger. WSL is a Linux environment within Windows that runs directly on the machine hardware, not in a virtual machine.

> **Note**: Much of this tutorial is applicable to working with C++ and VS Code directly on a Linux machine.

Visual Studio Code has support for working directly in WSL with the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). We recommend this mode of [WSL development](/docs/remote/wsl.md), where all your source code files, in addition to the compiler, are hosted on the Linux distro. For more background, see [VS Code Remote Development](/docs/remote/remote-overview.md).

After completing this tutorial, you will be ready to create and configure your own C++ project, and to explore the VS Code documentation for further information about its many features. This tutorial does not teach you about GCC or Linux or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following steps:

1. Install [Visual Studio Code](/download).

1. Install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).

1. Install [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) and then use the links on that same page to install your Linux distribution of choice. This tutorial uses Ubuntu. During installation, remember your Linux user password because you'll need it to install additional software.

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

1. Although you will be using VS Code to edit your source code, you'll be compiling the source code on Linux using the g++ compiler. You'll also debug on Linux using GDB. These tools are not installed by default on Ubuntu, so you have to install them. Fortunately, that task is quite easy!

1. From the WSL command prompt, first run `apt-get update` to update the Ubuntu package lists. An out-of-date distro can sometimes interfere with attempts to install new packages.

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

>**Note**: The setup steps for installing the g++ compiler and GDB debugger apply if you are working directly on a Linux machine rather than in WSL. Running VS Code in your helloworld project, as well as the editing, building, and debugging steps are the same.

## Run VS Code in WSL

Navigate to your helloworld project folder and launch VS Code from the WSL terminal with `code .`:

```bash
cd $HOME/projects/helloworld
code .
```

You'll see a message about "Installing VS Code Server". VS Code is downloading and installing a small server on the Linux side that the desktop VS Code will then talk to. VS Code will then start and open the `helloWorld` folder. The File Explorer shows that VS Code is now running in the context of WSL with the title bar **WSL: Ubuntu**.

![File Explorer in WSL](images/wsl/file-explorer-wsl.png)

You can also tell the remote context from the Status bar.

![Remote context in the Status bar](images/wsl/wsl-status-bar.png)

If you click on the Remote Status bar item, you will see a dropdown of Remote commands appropriate for the session. For example, if you want to end your session running in WSL, you can select the **Close Remote Connection** command from the dropdown. Running `code .` from your WSL command prompt will restart VS Code running in WSL.

The **code .** command opened VS Code in the current working folder, which becomes your "workspace". As you go through the tutorial, you will see three files created in a `.vscode` folder in the workspace:

- `c_cpp_properties.json` (compiler path and IntelliSense settings)
- `tasks.json` (build instructions)
- `launch.json` (debugger settings)

## Add a source code file

In the File Explorer title bar, select the **New File** button and name the file `helloworld.cpp`.

![New File title bar button](images/wsl/new-file-button.png)

### Install the C/C++ extension

Once you create the file and VS Code detects it is a C++ language file, you may be prompted to install the [Microsoft C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) if you don't already have it installed.

![C++ extension notification](images/wsl/cpp-extension-notification.png)

Choose **Install** and then **Reload Required** when the button is displayed in the Extensions view to complete installing the C/C++ extension.

If you already have C/C++ language extensions installed locally in VS Code, you'll need to go to the Extensions view (`kb(workbench.view.extensions)`) and install those extensions into WSL. Locally installed extensions can be installed into WSL by selecting the **Install in WSL** button and then **Reload Required**.

![Install in WSL button](images/wsl/install-in-wsl.png)

### Add hello world source code

Now paste in this source code:

   ```cpp
   #include <iostream>
   #include <vector>
   #include <string>

   using namespace std;

   int main()
   {
      vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

      for (const string& word : msg)
      {
         cout << word << " ";
      }
      cout << endl;
   }
   ```

Now press `kb(workbench.action.files.save)` to save the file. Notice how the file you just added appears in the **File Explorer** view (`kb(workbench.view.explorer)`) in the side bar of VS Code:

![File Explorer](images/wsl/file-explorer-helloworld.png)

You can also enable [Auto Save](/docs/editor/codebasics.md#save-auto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

The Activity Bar on the far left lets you open different views such as **Search**, **Source Control**, and **Run**. You'll look at the **Run** view later in this tutorial. You can find out more about the other views in the VS Code [User Interface documentation](/docs/getstarted/userinterface.md).

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/wsl/msg-intellisense.png)

You can press the `kbstyle(Tab)` key to insert the selected member; then, when you add the opening parenthesis, you will see information about any arguments that the function requires.

## Run helloworld.cpp

Remember, the C++ extension uses the C++ compiler you have installed on your machine to build your program. Make sure you have a C++ compiler installed before attempting to run and debug `helloworld.cpp` in VS Code.

1. Open `helloworld.cpp` so that it is the active file.
2. Press the play button in the top right corner of the editor.

   ![Screenshot of helloworld.cpp and play button](images/playbutton/run-play-button.png)

3. Choose **g++ build and debug active file** from the list of detected compilers on your system.

   ![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

You'll only be asked to choose a compiler the first time you run `helloworld.cpp`. This compiler will be set as the "default" compiler in `tasks.json` file.

4. After the build succeeds, your program's output will appear in the integrated **Terminal**.

    ![screenshot of program output](images/playbutton/helloworld-terminal-output.png)

The first time you run your program, the C++ extension creates `tasks.json`, which you'll find in your project's `.vscode` folder. `tasks.json` stores build configurations.

Your new `tasks.json` file should look similar to the JSON below:

```json
{
"version": "2.0.0",
"tasks": [
    {
        "type": "shell",
        "label": "C/C++: g++ build active file",
        "command": "/usr/bin/g++",
        "args": [
            "-g",
            "${file}",
            "-o",
            "${fileDirname}/${fileBasenameNoExtension}"
        ],
        "options": {
            "cwd": "/usr/bin"
        },
        "problemMatcher": [
            "$gcc"
        ],
        "group": {
            "kind": "build",
            "isDefault": true
        },
        "detail": "Task generated by Debugger."
    }
]
}
```

>**Note**: You can learn more about `tasks.json` variables in the [variables reference](/docs/editor/variables-reference.md).

The `command` setting specifies the program to run; in this case that is g++.
The `args` array specifies the command-line arguments that will be passed to g++. These arguments must be specified in the order expected by the compiler.

This task tells g++ to take the active file (`${file}`), compile it, and create an executable file in the current directory (`${fileDirname}`) with the same name as the active file but without an extension (`${fileBasenameNoExtension}`), resulting in `helloworld` for our example.

The `label` value is what you will see in the tasks list; you can name this whatever you like.

The `detail` value is what you will as the description of the task in the tasks list. It's highly recommended to rename this value to differentiate it from similar tasks.

From now on, the play button will read from `tasks.json` to figure out how to build and run your program. You can define multiple build tasks in `tasks.json`, and whichever task is marked as the default will be used by the play button. In case you need to change the default compiler, you can run **Tasks: Configure default build task**. Alternatively you can modify the `tasks.json` file and remove the default by replacing this segment:

```json
    "group": {
        "kind": "build",
        "isDefault": true
    },
```

with this:

```json
    "group": "build",
```

### Modifying tasks.json

You can modify your `tasks.json` to build multiple C++ files by using an argument like `"${workspaceFolder}/*.cpp"` instead of `${file}`.This will build all `.cpp` files in your current folder. You can also modify the output filename by replacing `"${fileDirname}/${fileBasenameNoExtension}"` with a hard-coded filename (for example 'helloworld.out').

## Debug helloworld.cpp

1. Go back to `helloworld.cpp` so that it is the active file.
1. Set a breakpoint by clicking on the editor margin or using F9 on the current line.
   ![screenshot of breakpoint in helloworld.cpp](images/playbutton/cpp-breakpoint.png)
1. From the drop-down next to the play button, select **Debug C/C++ File**.
   ![Screenshot of play button drop-down](images/playbutton/run-debug-arrow.png)
   ![Screenshot of play button drop-down](images/playbutton/debug-cpp-file-play-button.png)
1. Choose **C/C++: g++ build and debug active file** from the list of detected compilers on your system (you'll only be asked to choose a compiler the first time you run/debug `helloworld.cpp`).
   ![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

The play button has two modes: **Run C/C++ File** and **Debug C/C++ File**. It will default to the last-used mode. If you see the debug icon in the play button, you can just click the play button to debug, instead of selecting the drop-down menu item.
   ![screenshot of play button in debug mode](images/playbutton/debug-button.png)

## Explore the debugger

Before you start stepping through the code, let's take a moment to notice several changes in the user interface:

- The Integrated Terminal appears at the bottom of the source code editor. In the **Debug Output** tab, you see output that indicates the debugger is up and running.
- The editor highlights line 12, which is a breakpoint that you set before starting the debugger:

   ![Initial breakpoint](images/playbutton/breakpoint-debug.png)

- The **Run and Debug** view on the left shows debugging information. You'll see an example later in the tutorial.

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

   ![Debugging controls](images/cpp/debug-controls.png)

If you already have a launch.json file in your workspace, the play button will read from it when figuring out how run and debug your C++ file. If you don’t have launch.json, the play button will create a temporary “quick debug” configuration on the fly, eliminating the need for launch.json altogether!

## Step through the code

Now you're ready to start stepping through the code.

1. Click or press the **Step over** icon in the debugging control panel.

   ![Step over button](images/cpp/step-over-button.png)

   This will advance program execution to the first line of the for loop, and skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the side.

   ![Debugging windows](images/wsl/debug-view-variables.png)

1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.
1. Press **Step over** again to execute the `cout` statement. (Note that as of the March 2019 release, the C++ extension does not print any output to the **Debug Console** until the last cout executes.)
1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

   ![Breakpoint in gcc standard library header](images/cpp/gcc-system-header-stepping.png)

   To return to your own code, one way is to keep pressing **Step over**. Another way is to set a breakpoint in your code by switching to the `helloworld.cpp` tab in the code editor, putting the insertion point somewhere on the `cout` statement inside the loop, and pressing `kb(editor.debug.action.toggleBreakpoint)`. A red dot appears in the gutter on the left to indicate that a breakpoint has been set on this line.

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   Then press `kb(workbench.action.debug.start)` to start execution from the current line in the standard library header. Execution will break on `cout`. If you like, you can press `kb(editor.debug.action.toggleBreakpoint)` again to toggle off the breakpoint.

   When the loop has completed, you can see the output in the **Debug Console** tab of the integrated terminal, along with some other diagnostic information that is output by GDB.

   ![Debug console display](images/wsl/debug-console-output-wsl.png)

## Set a watch

To keep track of the value of a variable as your program executes, set a **watch** on the variable.

1. Place the insertion point inside the loop. In the **Watch** window, click the plus sign and in the text box, type `word`, which is the name of the loop variable. Now view the Watch window as you step through the loop.

   ![Watch window](images/cpp/watch-window.png)

1. To quickly view the value of any variable while execution is paused on a breakpoint, you can hover over it with the mouse pointer.

   ![Mouse hover](images/cpp/mouse-hover.png)

Next, you'll create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the g++ compiler to create an executable file from the source code.

It's important to have `helloworld.cpp` open in the editor because the next step uses the active file in the editor for context to create the build task in the next step.

## Customize debugging with launch.json

When you debug with the play button or `kb(workbench.action.debug.start)`, the C++ extension creates a dynamic debug configuration on the fly.

There are cases where you'd want to customize your debug configuration, such as specifying arguments to pass to the program at runtime. You can define custom debug configurations in a `launch.json` file.

To create `launch.json`, choose **Add Debug Configuration** from the play button drop-down menu.

![Add debug configuration play button menu](images/playbutton/add-debug-configuration.png)

You'll then see a dropdown for various predefined debugging configurations. Choose **g++ build and debug active file**.

![C++ debug configuration dropdown](images/wsl/build-and-debug-active-file.png)

VS Code creates a `launch.json` file, which looks something like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C/C++: g++ build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "C/C++: g++ build active file"
        }
    ]
}
```

 In the JSON above, `program` specifies the program you want to debug. Here it is set to the active file folder `${fileDirname}` and active filename without an extension `${fileBasenameNoExtension}`, which if `helloworld.cpp` is the active file will be `helloworld`. The `args` property is an array of arguments to pass to the program at runtime.

By default, the C++ extension won't add any breakpoints to your source code and the `stopAtEntry` value is set to `false`.

 Change the `stopAtEntry` value to `true` to cause the debugger to stop on the `main` method when you start debugging.

 > From now on, the play button and `kb(workbench.action.debug.start)` will read from your `launch.json` file when launching your program for debugging.

## C/C++ configurations

If you want more control over the C/C++ extension, you can create a `c_cpp_properties.json` file, which will allow you to change settings such as the path to the compiler, include paths, C++ standard (default is C++17), and more.

You can view the C/C++ configuration UI by running the command **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`).

![Command Palette](images/cpp/command-palette.png)

This opens the **C/C++ Configurations** page. When you make changes here, VS Code writes them to a file called `c_cpp_properties.json` in the `.vscode` folder.

![Command Palette](images/wsl/intellisense-configurations-wsl.png)

You only need to modify the **Include path** setting if your program includes header files that are not in your workspace or in the standard library path.

Visual Studio Code places these settings in `.vscode/c_cpp_properties.json`. If you open that file directly, it should look something like this:

```json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/gcc",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

## Closing the WSL session

When you are done working in WSL, you can close your remote session with the **Close Remote Connection** command available in the main **File** menu and the Command Palette (`kb(workbench.action.showCommands)`). This will restart VS Code running locally. You can easily reopen your WSL session from the **File** > **Open Recent** list by selecting folders with the **[WSL]** suffix.

## Next steps

- Explore the [VS Code User Guide](/docs/editor/codebasics.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
- Create a new workspace, copy your .json files to it, adjust the necessary settings for the new workspace path, program name, and so on, and start coding!
