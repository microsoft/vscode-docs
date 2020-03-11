---
Order: 4
Area: cpp
TOCTitle: Clang on macOS
ContentId: 6ef32219-81ad-4d73-84b8-8d4384a45f8a
PageTitle: Configure VS Code for Clang/LLVM on macOS
DateApproved: 07/25/2019
MetaDescription: Configuring the C++ extension in Visual Studio Code to target Clang/LLVM
---
# Configure VS Code for Clang on macOS

In this tutorial, you configure Visual Studio Code on macOS to use the Clang/LLVM compiler and debugger.

After configuring VS Code, you will compile and debug a simple program in VS Code. This tutorial does not teach you about Clang or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any trouble, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you must do the following:

1. Install [Visual Studio Code on macOS](/docs/setup/mac.md).

1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools). You can install the C/C++ extension by searching for 'c++' in the Extensions view (`kb(workbench.view.extensions)`).

    ![C/C++ extension](images/cpp/cpp-extension.png)

### Ensure Clang is installed

On macOS, since Xcode 4.2, Clang is included. To verify that it is installed on your machine, open a macOS Terminal window and enter the following command:

```bash
clang --version
```

1. If Clang isn't installed, enter the following command to install the command line developer tools:

```bash
xcode-select --install
```

## Create Hello World

From the MacOS Terminal, create an empty folder called `projects` where you can store all your VS Code projects, then create a subfolder called `helloworld`, navigate into it, and open VS Code in that folder by entering the following commands:

```cmd
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

The `code .` command opens VS Code in the current working folder, which becomes your "workspace". As you go through the tutorial, you will see three files in a `.vscode` folder in the workspace:

- `tasks.json` (compiler build settings)
- `launch.json` (debugger settings)
- `c_cpp_properties.json` (compiler path and IntelliSense settings)

### Add hello world source code file

In the File Explorer title bar, select **New File** and name the file `helloworld.cpp`.

![New File title bar button](images/msvc/new-file-button.png)

Paste in the following source code:

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

Now press `kb(workbench.action.files.save)` to save the file. Notice that your files are listed in the **File Explorer** view (`kb(workbench.view.explorer)`) in the side bar of VS Code:

![File Explorer](images/msvc/file-explorer.png)

You can also enable [Auto Save](/docs/editor/codebasics.md#saveauto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

The Activity Bar on the edge of Visual Studio Code lets you open different views such as **Search**, **Source Control**, and **Debug**. You'll look at the **Debug** view later in this tutorial. You can find out more about the other views in the VS Code [User Interface documentation](/docs/getstarted/userinterface.md).

>**Note**: When you save or open a C++ file, you may see a notification from the C/C++ extension about the availability of an Insiders version, which lets you test new features and fixes. You can ignore this notification by selecting the `X` (**Clear Notification**).

## Explore IntelliSense

In the `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/wsl/msg-intellisense.png)

You can press the `kbstyle(Tab)` key to insert the selected member. Then, when you add the opening parenthesis, you'll see information about arguments that the function requires.

## Build helloworld.cpp

Next, you'll create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the Clang C++ compiler to create an executable file from the source code.

It's important to have `helloworld.cpp` open in the editor because the next step will use that file as context to determine that the build task is for C++.

From the main menu, choose **Terminal** > **Configure Default Build Task**.
In the dropdown, which displays a listing various predefined build tasks for the compilers that VS Code found on your machine, choose **C/C++ clang++ build active file** to build the file that is currently displayed (active) in the editor.

![Build task](images/clang-mac/default-build-task.png)

This will create a `tasks.json` file in the `.vscode` folder and open it in the editor.

Replace the contents of that file with the following:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558 
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "label": "clang++ build active file",
            "command": "/usr/bin/clang++",
            "args": [
                "-std=c++17",
                "-stdlib=libc++",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

The JSON above differs from the template code that was generated in the following ways:
- `"args"` is updated to compile with C++17 because the helloworld.cpp uses C++17 language features and by default the JSON template uses C++98.
- Changes the current working directory directive (`"cwd"`) to the folder where helloworld.cpp is.

The `command` setting specifies the program to run. In this case, "clang++" is the driver that causes the Clang compiler to expect C++ code and link against the C++ standard library.

The `args` array specifies the command-line arguments that will be passed to clang++. These arguments must be specified in the order expected by the compiler.
This task tells the C++ compiler to compile the active file (`${file}`), and create an output file (`-o` switch) in the current directory (`${fileDirname}`) with the same name as the active file (`${fileBasenameNoExtension}`), resulting in `helloworld` for our example.

The `label` value is what you will see in the tasks list. Name this what you want.

The `problemMatcher` value selects the output parser to use for finding errors and warnings in the compiler output. For clang++.exe, you'll get the best results if you use the `$gcc` problem matcher.

The `"isDefault": true` value in the `group` object specifies that this task will be run when you press `kb(workbench.action.tasks.build)`. This property is for convenience only; if you set it to false, you can still run it from the Terminal menu with **Terminal > Run Build Task**.

>**Note**: You can learn more about `task.json` variables in the [variables reference](/docs/editor/variables-reference.md).

### Running the build

1. Go back to `helloworld.cpp`. Your task builds the active file and you want to build `helloworld.cpp`.
1. To run the build task that you defined in tasks.json, press `kb(workbench.action.tasks.build)` or from the **Terminal** main menu choose **Run Build Task**.
1. When the task starts, you should see the Integrated Terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed. For a successful Clang build, the output looks something like this:

   ![Clang build output in terminal](images/clang-mac/clang-task-in-terminal.png)

1. Create a new terminal using the **+** button and you'll have a new terminal with the `helloworld` folder as the working directory. Run `ls` and you should now see the executable `helloworld.exe` along with various intermediate C++ output and debugging files (`helloworld.obj`, `helloworld.pdb`).

    ![Hello World in macOS terminal](images/msvc/helloworld-in-terminal.png)

1. You can run `helloworld` in the terminal by typing `.\helloworld`.

### Modifying tasks.json

You can modify your `tasks.json` to build multiple C++ files by using an argument like `"${workspaceFolder}\\*.cpp"` instead of `${file}`. This will build all `.cpp` files in your current folder. You can also modify the output filename by replacing `"${fileDirname}\\${fileBasenameNoExtension}"` with a hard-coded filename (for example `"${workspaceFolder}\\myProgram"`).

## Debug helloworld.cpp

Next, you'll create a `launch.json` file to configure VS Code to launch the LLDB debugger when you press `kb(workbench.action.debug.start)` to debug the program. 

From the main menu, choose **Run** > **Add Configuration...** and then choose **C++ (GDB/LLDB)**.

You'll then see a dropdown for various predefined debugging configurations. Choose **clang++ build and debug active file**.

![C++ debug configuration dropdown](images/clang-mac/build-and-debug-active-file.png)

VS Code creates a `launch.json` file, opens it in the editor, and builds and runs 'helloworld'.

```json
{

    "version": "0.2.0",
    "configurations": [
        {
            "name": "clang++ build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "clang++ build active file"
        }
    ]
}
```

The `program` setting specifies the program you want to debug. Here it is set to the active file folder `${fileDirname}` and active filename `${fileBasenameNoExtension}`, which if `helloworld.cpp` is the active file will be `helloworld`.

By default, the C++ extension won't add any breakpoints to your source code and the `stopAtEntry` value is set to `false`. Change the `stopAtEntry` value to `true` to cause the debugger to stop on the `main` method when you start debugging.

### Start a debugging session

> **Note**: You may have issues debugging on macOS Catalina. See [issue #3829](https://github.com/microsoft/vscode-cpptools/issues/3829) for details and possible workarounds.

1. Go back to `helloworld.cpp` so that it is the active file.
2. Press `kb(workbench.action.debug.start)` or from the main menu choose **Run > Start Debugging**. Before you start stepping through the source code, let's take a moment to notice several changes in the user interface:

- The Integrated Terminal appears at the bottom of the source code editor. In the **Debug Output** tab, you see output that indicates the debugger is up and running.
- The editor highlights the first statement in the `main` method. This is a breakpoint that the C++ extension automatically sets for you:

   ![Initial breakpoint](images/msvc/stopAtEntry.png)

- The Run view on the left shows debugging information. You'll see an example later in the tutorial.

- At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

## Step through the code

Now you're ready to start stepping through the code.

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

1. To quickly view the value of any variable while execution is paused on a breakpoint, you can hover over it with the mouse pointer.

   ![Mouse hover](images/cpp/mouse-hover.png)

## C/C++ configurations



=========================== old below



### Configure the C++ extension

Configure the C++ extension to use Clang as follows:

1. In VS Code, press `kb(workbench.action.showCommands)` to open the Command Palette. It looks like this:

   ![Command Palette](images/clang-mac/mac-command-palette-configurations.png)

1. Open the **C/C++ Configurations** page by typing "C/C++" and then choose **C/C++: Edit Configurations (UI)** from the list.

   ![Command Palette](images/clang-mac/intellisense-configurations-mac-clang.png)

1. In the **C/C++ Configurations** page, click **Add Configuration** and provide a configuration name. Then click **OK**.

1. Find the **Compiler path** setting. VS Code populates it based on what it finds on your system. For Clang on macOS, the path should look like: `/usr/bin/clang`.

   The **Compiler path** setting is the most important setting in your configuration. The C++ extension uses it to infer the path to the C++ standard library header files. When the extension knows where to find those files, it can provide useful information as you code. This information is called *IntelliSense* and you'll see some examples later in this tutorial.
1. You only need to modify the **Include path** setting if your program includes header files that are not in your workspace or the standard library path.

1. Scroll down and expand **Advanced Settings** and ensure that `Mac framework path` points to the system header files. For example: `/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks`

Visual Studio code saves these settings in `.vscode/c_cpp_properties.json`. If you open that file, it should look something like this (depending on your specific framework and compiler paths):

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
            "intelliSenseMode": "${default}"
        }
    ],
    "version": 4
}
```

1. Close VS Code

## Configure debug settings

Next, configure VS Code to launch the LLDB debugger when you press `kb(workbench.action.debug.start)`.

1. From the Command Palette, type "launch" and then choose **Debug: Open launch.json**. This may download some packages. Next, choose the **C++ (GDB/LLDB)** environment.

1. In the launch.json file that appears, for `program`, use `${workspaceFolder}/helloworld.out` (which correlates with the compiler output argument that you specified in `tasks.json`).

1. By default, the C++ extension adds a breakpoint to the first line of `main`. The `stopAtEntry` value is set to `true` to cause the debugger to stop on that breakpoint. You can set this to `false` if you prefer.

1. Set `externalConsole` to `true` to display the program output in an external Terminal window. (Currently on Mac, the output cannot be directed to the integrated Terminal window.)

Your complete `launch.json` file should look something like this:

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

VS Code is now configured to use Clang on macOS. The configuration applies to the current workspace. To reuse the configuration, just copy the three JSON files to a .vscode folder in a new workspace and change the names of the source file(s) and executable as needed.

The remaining steps are provided as an optional exercise to help you get familiar with the editing and debugging experience.

## Create Hello World

1. Select the "helloWorld" folder in the File Explorer. Right-click in the pane and select **New File** from the context menu. Name the file `helloworld.cpp`. Ensure that the file is not in the `.vscode` subfolder.

1. Paste the following code into helloWorld.cpp:

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

1. Now press `kb(workbench.action.files.save)` to save the file. Notice the list of files in the **File Explorer** view in the side bar of VS Code:

![File Explorer](images/clang-mac/file-explorer-mac.png)

You can also enable [Auto Save](/docs/editor/codebasics.md#saveauto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

The Activity Bar on the edge of VS Code lets you open different views such as **Search**, **Source Control**, and **Debug**. You'll look at the **Debug** view later in this tutorial. You can find out more about the other views in the VS Code [User Interface documentation](/docs/getstarted/userinterface.md).

>**Note**: When you save or open a C++ file, you may see a notification from the C/C++ extension about the availability of an Insiders version, which lets you test new features and fixes. You can ignore this notification by selecting the `X` (**Clear Notification**).
This same panel is also used for source control, debugging, searching and replacing text, and managing extensions. The buttons on the left control those views. We'll look at the **Run View** later in this tutorial. You can find out more about the other views in the VS Code documentation.

## Explore IntelliSense

In your new `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object:

![Statement completion IntelliSense](images/cpp/cpp-intellisense-vector.png)

You can press the `kbstyle(Tab)` key to insert the selected member; then, when you add the opening parenthesis, you will see information about any arguments that the function requires.



## Start a debugging session

> **Note**: You may have issues debugging on macOS Catalina. See [issue #3829](https://github.com/microsoft/vscode-cpptools/issues/3829) for details and possible workarounds.

1. You are now ready to run the program. Press `kb(workbench.action.debug.start)` or from the main menu choose **Run > Start Debugging**. Before we start stepping through the code, let's take a moment to notice several changes in the user interface:

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

1. To quickly view the value of any variable while execution is paused on a breakpoint, you can hover over it with the mouse pointer.

   ![Mouse hover](images/cpp/mouse-hover.png)

## Next steps

- Explore the [VS Code User Guide](/docs/editor/codebasics.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md)
- Create a new workspace, copy your .json files to it, adjust the necessary settings for the new workspace path, program name, and so on, and start coding!
