---
Order: 3
Area: cpp
TOCTitle: GCC on Windows
ContentId: 7efec972-6556-4526-8aa8-c73b3319d612
PageTitle: Get Started with C++ and MinGW-w64 in Visual Studio Code
DateApproved: 12/14/2023
MetaDescription: Configuring the C++ extension in Visual Studio Code to target g++ and gdb on a MinGW-w64 installation
---
# Using GCC with MinGW

In this tutorial, you configure Visual Studio Code to use the GCC C++ compiler (g++) and GDB debugger from [mingw-w64](http://mingw-w64.org) to create programs that run on Windows. After configuring VS Code, you will compile, run, and debug a Hello World program.

This tutorial does not teach you about GCC, GDB, minGW-w64, or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/microsoft/vscode-docs/issues/new).

## Prerequisites

To successfully complete this tutorial, you must do the following steps:

1. Install [Visual Studio Code](/download).

1. Install the [C/C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools). You can install the C/C++ extension by searching for 'C++' in the Extensions view (`kb(workbench.view.extensions)`).

    ![C/C++ extension](images/cpp/cpp-extension.png)

## Installing the MinGW-w64 toolchain

Get the latest version of MinGW-w64 via [MSYS2](https://www.msys2.org/), which provides up-to-date native builds of GCC, MinGW-w64, and other helpful C++ tools and libraries. This will provide you with the necessary tools to compile your code, debug it, and configure it to work with [IntelliSense](/docs/editor/intellisense.md).

To install the MinGW-w64 toolchain, check out this video or follow the steps below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/oC69vlWofJQ?si=cj-xpNS28xNBMEcP" title="Installing MinGW to build C++ code on Windows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

1. You can download the latest installer from the MSYS2 page or use this [**direct link to the installer**](https://github.com/msys2/msys2-installer/releases/download/2024-01-13/msys2-x86_64-20240113.exe).

1. Run the installer and follow the steps of the installation wizard. Note that MSYS2 requires 64 bit Windows 8.1 or newer.

1. In the wizard, choose your desired Installation Folder. Record this directory for later. In most cases, the recommended directory is acceptable. The same applies when you get to setting the start menu shortcuts step. When complete, ensure the **Run MSYS2 now** box is checked and select **Finish**. This will open a MSYS2 terminal window for you.

1. In this terminal, install the MinGW-w64 toolchain by running the following command:

    ```sh
   pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
    ```

1. Accept the default number of packages in the `toolchain` group by pressing `kbstyle(Enter)`.

    ![MYSS2 Installer](images/cpp/cpp-install-MSYS2-toolchain.png)

1. Enter `Y` when prompted whether to proceed with the installation.

1. Add the path of your MinGW-w64 `bin` folder to the Windows `PATH` environment variable by using the following steps:
   1. In the Windows search bar, type **Settings** to open your Windows Settings.
   1. Search for **Edit environment variables for your account**.
   1. In your **User variables**, select the `Path` variable and then select **Edit**.
   1. Select **New** and add the MinGW-w64 destination folder you recorded during the installation process to the list. If you used the default settings above, then this will be the path: `C:\msys64\ucrt64\bin`.
   1. Select **OK**, and then select **OK** again in the **Environment Variables** window to update the `PATH` environment variable.
      You have to reopen any console windows for the updated `PATH` environment variable to be available.

### Check your MinGW installation

To check that your MinGW-w64 tools are correctly installed and available, open a **new** Command Prompt and type:

```bash
gcc --version
g++ --version
gdb --version
```

You should see output that states which versions of GCC, g++ and GDB you have installed. If this is not the case:

1. Make sure your PATH variable entry matches the MinGW-w64 binary location where the toolchain was installed. If the compilers do not exist at that PATH entry, make sure you followed the previous instructions.
2. If `gcc` has the correct output but not `gdb`, then you need to install the packages you are missing from the MinGW-w64 toolset.
   - If on compilation you are getting the "The value of miDebuggerPath is invalid." message, one cause can be you are missing the `mingw-w64-gdb` package.

## Create a Hello World app

First, lets get a project set up.

1. Launch a Windows command prompt (Enter **Windows command prompt** in the Windows search bar).
1. Run the following commands. These will create an empty folder called `projects` where you can place all your VS Code projects. There, the next commands will create and navigate to a subfolder called `helloworld`. From there, you will open `helloworld` directly in VS Code.

```bat
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

The "code ." command opens VS Code in the current working folder, which becomes your "workspace". Accept the [Workspace Trust](/docs/editor/workspace-trust.md) dialog by selecting **Yes, I trust the authors** since this is a folder you created.

As you go through the tutorial, you will see three files created in a `.vscode` folder in the workspace:

- `tasks.json` (build instructions)
- `launch.json` (debugger settings)
- `c_cpp_properties.json` (compiler path and IntelliSense settings)

### Add a Hello World source code file

In the File Explorer title bar, select the **New File** button and name the file `helloworld.cpp`.

![New File title bar button](images/mingw/new-file-button.png)

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

![File Explorer](images/mingw/file-explorer-mingw.png)

You can also enable [Auto Save](/docs/editor/codebasics.md#save-auto-save) to automatically save your file changes, by selecting **File** > **Auto Save**.  You can find out more about the other views in the VS Code [User Interface documentation](/docs/getstarted/userinterface.md).

>**Note**: When you save or open a C++ file, you may see a notification from the C/C++ extension about the availability of an Insiders version, which lets you test new features and fixes. You can ignore this notification by selecting the `X` (**Clear Notification**).

## Explore IntelliSense

[IntelliSense](/docs/editor/intellisense.md) is a tool to help you code faster and more efficiently by adding code editing features such as code completion, parameter info, quick info, and member lists.

To see IntelliSense in action,
hover over `vector` or `string` to see their type information. If you type  `msg.` in line 10, you can see a completion list of recommended member functions to call, all generated by IntelliSense:

![Statement completion IntelliSense](images/wsl/msg-intellisense.png)

You can press the `kbstyle(Tab)` key to insert a selected member. If you then add open parenthesis, IntelliSense will show information on which arguments are required.

If IntelliSense is not already configured, open the Command Palette (`kb(workbench.action.showCommands)`) and enter **Select IntelliSense Configuration**. From the dropdown of compilers, select `Use gcc.exe` to configure. More information can be found in the [IntelliSense configuration documentation](/docs/languages/cpp.md#intellisense-configuration).

## Run helloworld.cpp

Remember, the C++ extension uses the C++ compiler you have installed on your machine to build your program. Make sure you have completed the "Installing the MinGW-w64 toolchain" step before attempting to run and debug `helloworld.cpp` in VS Code.

1. Open `helloworld.cpp` so that it is the active file.
2. Press the play button in the top right corner of the editor.

   ![Screenshot of helloworld.cpp and play button](images/playbutton/run-play-button.png)

3. Choose **C/C++: g++.exe build and debug active file** from the list of detected compilers on your system.

   ![C++ debug configuration dropdown](images/playbutton/select-gcc-compiler.png)

You'll only be asked to choose a compiler the first time you run `helloworld.cpp`. This compiler will be set as the "default" compiler in `tasks.json` file.

4. After the build succeeds, your program's output will appear in the integrated **Terminal**.

    ![screenshot of program output](images/playbutton/helloworld-terminal-output.png)

Congratulations! You've just run your first C++ program in VS Code!

### Understanding tasks.json

The first time you run your program, the C++ extension creates a `tasks.json` file, which you'll find in your project's `.vscode` folder. `tasks.json` stores your build configurations.

Your new `tasks.json` file should look similar to the JSON below:

```json
{
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C/C++: g++.exe build active file",
            "command": "C:\\msys64\\ucrt64\\bin\\g++.exe",
            "args": [
                "-fdiagnostics-color=always",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "options": {
                "cwd": "${fileDirname}"
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
    ],
    "version": "2.0.0"
}
```

>**Note**: You can learn more about `tasks.json` variables in the [variables reference](/docs/editor/variables-reference.md).

The `command` setting specifies the program to run; in this case that is `g++`.

The `args` array specifies the command-line arguments passed to g++. These arguments are listed in this file in the specific order expected by the compiler.

This task tells g++ to take the active file (`${file}`), compile it, and create an output file (`-o` switch) in the current directory (`${fileDirname}`) with the same name as the active file but with the `.exe` extension (`${fileBasenameNoExtension}.exe`). For us, this results in `helloworld.exe`.

The `label` value is what you will see in the tasks list; you can name this whatever you like.

The `detail` value is what you will see as the description of the task in the tasks list. It's highly recommended to rename this value to differentiate it from similar tasks.

The `problemMatcher` value selects the output parser to use for finding errors and warnings in the compiler output. For GCC, you'll get the best results if you use the `$gcc` problem matcher.

From now on, the play button will read from `tasks.json` to figure out how to build and run your program. You can define multiple build tasks in `tasks.json`, and whichever task is marked as the default will be used by the play button. In case you need to change the default compiler, you can run **Tasks: Configure Default Build Task** in the Command Palette. Alternatively you can modify the `tasks.json` file and remove the default by replacing this segment:

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

You can modify your `tasks.json` to build multiple C++ files by using an argument like `"${workspaceFolder}/*.cpp"` instead of `"${file}"`.This will build all `.cpp` files in your current folder. You can also modify the output filename by replacing `"${fileDirname}\\${fileBasenameNoExtension}.exe"` with a hard-coded filename (for example `"${workspaceFolder}\\myProgram.exe"`).

## Debug helloworld.cpp

To debug your code,

1. Go back to `helloworld.cpp` so that it is the active file.
2. Set a breakpoint by clicking on the editor margin or using F9 on the current line.
   ![screenshot of breakpoint in helloworld.cpp](images/playbutton/cpp-breakpoint.png)
3. From the drop-down next to the play button, select **Debug C/C++ File**.
   ![Screenshot of play button drop-down](images/playbutton/debug-cpp-file-play-button.png)
4. Choose **C/C++: g++ build and debug active file** from the list of detected compilers on your system (you'll only be asked to choose a compiler the first time you run or debug `helloworld.cpp`).
   ![C++ debug configuration dropdown](images/playbutton/select-gcc-compiler.png)

The play button has two modes: **Run C/C++ File** and **Debug C/C++ File**. It will default to the last-used mode. If you see the debug icon in the play button, you can just select the play button to debug, instead of using the drop-down.

## Explore the debugger

Before you start stepping through the code, let's take a moment to notice several changes in the user interface:

- The Integrated Terminal appears at the bottom of the source code editor. In the **Debug Console** tab, you see output that indicates the debugger is up and running.
- The editor highlights the line where you set a breakpoint before starting the debugger:

   ![Initial breakpoint](images/playbutton/breakpoint-debug.png)

- The **Run and Debug** view on the left shows debugging information. You'll see an example later in the tutorial.

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

   ![Debugging controls](images/cpp/debug-controls.png)

### Step through the code

Now you're ready to start stepping through the code.

1. Select the **Step over** icon in the debugging control panel.

   ![Step over button](images/cpp/step-over-button.png)

   This will advance program execution to the first line of the for loop, and skip over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window on the left.

   ![Debugging windows](images/wsl/debug-view-variables.png)

   In this case, the errors are expected because, although the variable names for the loop are now visible to the debugger, the statement has not executed yet, so there is nothing to read at this point. The contents of `msg` are visible, however, because that statement has completed.

1. Press **Step over** again to advance to the next statement in this program (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variables.
1. Press **Step over** again to execute the `cout` statement. (Note that the C++ extension does not print any output to the **Debug Console** until the loop exits.)
1. If you like, you can keep pressing **Step over** until all the words in the vector have been printed to the console. But if you are curious, try pressing the **Step Into** button to step through source code in the C++ standard library!

   To return to your own code, one way is to keep pressing **Step over**. Another way is to set a breakpoint in your code by switching to the `helloworld.cpp` tab in the code editor, putting the insertion point somewhere on the `cout` statement inside the loop, and pressing `kb(editor.debug.action.toggleBreakpoint)`. A red dot appears in the gutter on the left to indicate that a breakpoint has been set on this line.

   ![Breakpoint in main](images/cpp/breakpoint-in-main.png)

   Then press `kb(workbench.action.debug.start)` to start execution from the current line in the standard library header. Execution will break on `cout`. If you like, you can press `kb(editor.debug.action.toggleBreakpoint)` again to toggle off the breakpoint.

   When the loop has completed, you can see the output in the Integrated Terminal, along with some other diagnostic information that is output by GDB.

   ![Debug output in terminal](images/mingw/mingw-debug-output.png)

### Set a watch

Sometimes you might want to keep track of the value of a variable as your program executes. You can do this by setting a **watch** on the variable.

1. Place the insertion point inside the loop. In the **Watch** window, select the plus sign and in the text box, type `word`, which is the name of the loop variable. Now view the Watch window as you step through the loop.

   ![Watch window](images/cpp/watch-window.png)

1. Add another watch by adding this statement before the loop: `int i = 0;`. Then, inside the loop, add this statement: `++i;`. Now add a watch for `i` as you did in the previous step.

1. To quickly view the value of any variable while execution is paused on a breakpoint, you can hover over it with the mouse pointer.

   ![Mouse hover](images/cpp/mouse-hover.png)

## Customize debugging with launch.json

When you debug with the play button or `kb(workbench.action.debug.start)`, the C++ extension creates a dynamic debug configuration on the fly.

There are cases where you'd want to customize your debug configuration, such as specifying arguments to pass to the program at runtime. You can define custom debug configurations in a `launch.json` file.

To create `launch.json`, choose **Add Debug Configuration** from the play button drop-down menu.

![Add debug configuration play button menu](images/playbutton/add-debug-configuration.png)

You'll then see a dropdown for various predefined debugging configurations. Choose **C/C++: g++.exe build and debug active file**.

![C++ debug configuration dropdown](images/playbutton/select-gcc-compiler.png)

VS Code creates a `launch.json` file in the `.vscode` folder`, which looks something like this:

```json
{
    "configurations": [
        {
            "name": "C/C++: g++.exe build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "C:\\msys64\\ucrt64\\bin\\gdb.exe",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                },
                {
                    "description": "Set Disassembly Flavor to Intel",
                    "text": "-gdb-set disassembly-flavor intel",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "C/C++: g++.exe build active file"
        }
    ],
    "version": "2.0.0"
}
```

In the JSON above, `program` specifies the program you want to debug. Here it is set to the active file folder (`${fileDirname}`) and active filename with the `.exe` extension (`${fileBasenameNoExtension}.exe`), which if `helloworld.cpp` is the active file will be `helloworld.exe`. The `args` property is an array of arguments to pass to the program at runtime.

By default, the C++ extension won't add any breakpoints to your source code and the `stopAtEntry` value is set to `false`.

Change the `stopAtEntry` value to `true` to cause the debugger to stop on the `main` method when you start debugging.

> From now on, the play button and `kb(workbench.action.debug.start)` will read from your `launch.json` file when launching your program for debugging.

## Adding additional C/C++ settings

If you want more control over the C/C++ extension, you can create a `c_cpp_properties.json` file, which will allow you to change settings such as the path to the compiler, include paths, C++ standard (default is C++17), and more.

You can view the C/C++ configuration UI by running the command **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`).

![Command Palette](images/cpp/command-palette.png)

This opens the **C/C++ Configurations** page. When you make changes here, VS Code writes them to a file called `c_cpp_properties.json` in the `.vscode` folder.

Here, we've changed the **Configuration name** to **GCC**, set the **Compiler  path** dropdown to the g++ compiler, and the **IntelliSense mode** to match the compiler (**gcc-x64**).

![Command Palette](images/mingw/intellisense-configurations-mingw.png)

Visual Studio Code places these settings in `.vscode\c_cpp_properties.json`. If you open that file directly, it should look something like this:

```json
{
    "configurations": [
        {
            "name": "GCC",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "windowsSdkVersion": "10.0.22000.0",
            "compilerPath": "C:/msys64/mingw64/bin/g++.exe",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "windows-gcc-x64"
        }
    ],
    "version": 4
}
```

You only need to add to the **Include path** array setting if your program includes header files that are not in your workspace or in the standard library path.

### Compiler path

The extension uses the `compilerPath` setting to infer the path to the C++ standard library header files. When the extension knows where to find those files, it can provide features like smart completions and **Go to Definition** navigation.

The C/C++ extension attempts to populate `compilerPath` with the default compiler location based on what it finds on your system. The extension looks in several common compiler locations.

The `compilerPath` search order is:

- First check for the Microsoft Visual C++ compiler
- Then look for g++ on Windows Subsystem for Linux (WSL)
- Then g++ for MinGW-w64.

If you have Visual Studio or WSL installed, you might need to change `compilerPath` to match the preferred compiler for your project. For example, if you installed MinGW-w64 version 8.1.0 using the i686 architecture, Win32 threading, and sjlj exception handling install options, the path would look like this: `C:\Program Files (x86)\mingw-w64\i686-8.1.0-win32-sjlj-rt_v6-rev0\mingw64\bin\g++.exe`.

## Troubleshooting

### MSYS2 is installed, but g++ and gdb are still not found


You must follow the steps on the [MSYS2 website](https://www.msys2.org/) to use the MSYS CLI to install the full MinGW-w64 toolchain(`pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain`), as well as all required prerequisites. The toolchain includes g++ and gdb.


### As a Windows user, running the pacman command gives me an error

UCRT on Windows machines is only included in Windows 10 or later. If you are using another version of Windows, run the following command that does not use UCRT:

```MSYS2
pacman -S --needed base-devel mingw-w64-x86_64-toolchain
```

When adding the the MinGW-w64 destination folder to your list of environment variables, the default path will then be: `C:\msys64\mingw64\bin`.

### MinGW 32-bit

If you need a 32-bit version of the MinGW toolset, consult the [Downloading](https://www.msys2.org/wiki/MSYS2-installation/) section on the MSYS2 wiki. It includes links to both 32-bit and 64-bit installation options.

## Next steps

- Explore the [VS Code User Guide](/docs/editor/codebasics.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
- Create a new workspace, copy your `.vscode` JSON files to it, adjust the necessary settings for the new workspace path, program name, etc. and start coding!
