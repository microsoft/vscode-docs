---
Order: 13
Area: cpp
TOCTitle: Configure debugging
ContentId: 8cb0c932-d5f2-41e7-b297-5fd100ce4e0c
PageTitle: Configure launch.json for C/C++ debugging in Visual Studio Code
DateApproved: 6/10/2021
MetaDescription: Configure launch.json for C/C++ debugging in Visual Studio Code
---
# Configure C/C++ debugging

A `launch.json` file is used to configure the [debugger](/docs/editor/debugging.md) in Visual Studio Code.

Visual Studio Code generates a `launch.json` (under a `.vscode` folder in your project) with almost all of the required information. To get started with debugging you need to fill in the `program` field with the path to the executable you plan to debug. This must be specified for both the launch and attach (if you plan to attach to a running instance at any point) configurations.

The generated file contains two sections, one that configures debugging for launch and a second that configures debugging for attach.

## Configure VS Code's debugging behavior

Set or change the following options to control VS Code's behavior during debugging:

### program (required)

Specifies the full path to the executable the debugger will launch or attach to. The debugger requires this location in order to load debug symbols.

### symbolSearchPath

Tells the Visual Studio Windows Debugger what paths to search for symbol (.pdb) files. Separate multiple paths with a semicolon. For example: `"C:\\Symbols;C:\\SymbolDir2"`.

### requireExactSource

An optional flag that tells the Visual Studio Windows Debugger to require current source code to match the pdb.

### additionalSOLibSearchPath

Tells GDB or LLDB what paths to search for .so files. Separate multiple paths with a semicolon. For example: `"/Users/user/dir1;/Users/user/dir2"`.

### externalConsole

Used only when launching the debuggee. For `attach`, this parameter does not change the debuggee's behavior.

- **Windows**: When set to true, it will spawn an external console. When set to false, it will use VS Code's integratedTerminal.
- **Linux**: When set to true, it will notify VS Code to spawn an external console. When set to false, it will use VS Code's integratedTerminal.
- **macOS**: When set to true, it will spawn an external console through `lldb-mi`. When set to false, the output can be seen in VS Code's debugConsole. Due to limitations within `lldb-mi`, integratedTerminal support is not available.

### avoidWindowsConsoleRedirection

In order to support VS Code's Integrated Terminal with gdb on Windows, the extension adds console redirection commands to the debuggee's arguments to have console input and output show up in the integrated terminal. Setting this option to `true` will disable it.

### logging

Optional flags to determine what types of messages should be logged to the Debug Console.

- **exceptions**: Optional flag to determine whether exception messages should be logged to the Debug Console. Defaults to true.
- **moduleLoad**: Optional flag to determine whether module load events should be logged to the Debug Console. Defaults to true.
- **programOutput**: Optional flag to determine whether program output should be logged to the Debug Console. Defaults to true.
- **engineLogging**: Optional flag to determine whether diagnostic engine logs should be logged to the Debug Console. Defaults to false.
- **trace**: Optional flag to determine whether diagnostic adapter command tracing should be logged to the Debug Console. Defaults to false.
- **traceResponse**: Optional flag to determine whether diagnostic adapter command and response tracing should be logged to the Debug Console. Defaults to false.

### visualizerFile

`.natvis` file to be used when debugging. See [Create custom views of native objects](https://learn.microsoft.com/visualstudio/debugger/create-custom-views-of-native-objects) for information on how to create Natvis files.

### showDisplayString

When a `visualizerFile` is specified, `showDisplayString` will enable the display string. Turning on this option can cause slower performance during debugging.

**Example:**

```json
{
   "name": "C++ Launch (Windows)",
   "type": "cppvsdbg",
   "request": "launch",
   "program": "C:\\app1\\Debug\\app1.exe",
   "symbolSearchPath": "C:\\Symbols;C:\\SymbolDir2",
   "externalConsole": true,
   "logging": {
       "moduleLoad": false,
       "trace": true
    },
   "visualizerFile": "${workspaceFolder}/my.natvis",
   "showDisplayString": true
}
```

## Configure the target application

The following options enable you to modify the state of the target application when it is launched:

### args

JSON array of command-line arguments to pass to the program when it is launched. Example `["arg1", "arg2"]`. If you are escaping characters, you will need to double escape them. For example, `["{\\\"arg1\\\": true}"]` will send `{"arg1": true}` to your application.

### cwd

Sets the working directory of the application launched by the debugger.

### environment

Environment variables to add to the environment for the program. Example: `[ { "name": "config", "value": "Debug" } ]`, not `[ { "config": "Debug" } ]`.

**Example:**

```json
{
   "name": "C++ Launch",
   "type": "cppdbg",
   "request": "launch",
   "program": "${workspaceFolder}/a.out",
   "args": ["arg1", "arg2"],
   "environment": [{"name": "config", "value": "Debug"}],
   "cwd": "${workspaceFolder}"
}
```

## Customizing GDB or LLDB

You can change the behavior of GDB or LLDB by setting the following options:

### MIMode

Indicates the debugger that VS Code will connect to. Must be set to `gdb` or `lldb`. This is pre-configured on a per-operating system basis and can be changed as needed.

### miDebuggerPath

The path to the debugger (such as gdb). When only the executable is specified, it will search the operating system's PATH variable for a debugger (GDB on Linux and Windows, LLDB on OS X).

### miDebuggerArgs

Additional arguments to pass to the debugger (such as gdb).

### stopAtEntry

If set to true, the debugger should stop at the entry-point of the target (ignored on attach). Default value is `false`.

### stopAtConnect

If set to true, the debugger should stop after connecting to the target. If set to false, the debugger will continue after connecting. Default value is `false`.

### setupCommands

JSON array of commands to execute in order to set up the GDB or LLDB. Example: `"setupCommands": [ { "text": "target-run", "description": "run target", "ignoreFailures": false }]`.

### customLaunchSetupCommands

If provided, this replaces the default commands used to launch a target with some other commands. For example, this can be "-target-attach" in order to attach to a target process. An empty command list replaces the launch commands with nothing, which can be useful if the debugger is being provided launch options as command-line options. Example: `"customLaunchSetupCommands": [ { "text": "target-run", "description": "run target", "ignoreFailures": false }]`.

### launchCompleteCommand

The command to execute after the debugger is fully set up in order to cause the target process to run. Allowed values are "exec-run", "exec-continue", "None". The default value is "exec-run".

**Example:**

```json
{
   "name": "C++ Launch",
   "type": "cppdbg",
   "request": "launch",
   "program": "${workspaceFolder}/a.out",
   "stopAtEntry": false,
   "customLaunchSetupCommands": [
      { "text": "target-run", "description": "run target", "ignoreFailures": false }
   ],
   "launchCompleteCommand": "exec-run",
   "linux": {
      "MIMode": "gdb",
      "miDebuggerPath": "/usr/bin/gdb"
   },
   "osx": {
      "MIMode": "lldb"
   },
   "windows": {
      "MIMode": "gdb",
      "miDebuggerPath": "C:\\MinGw\\bin\\gdb.exe"
   }
}
```

### symbolLoadInfo

- **loadAll**: If true, symbols for all libs will be loaded, otherwise no solib symbols will be loaded. Modified by ExceptionList. Default value is true.
- **exceptionList**: List of filenames (wildcards allowed) separated by semicolons `;`. Modifies behavior of LoadAll. If LoadAll is true then don't load symbols for libs that match any name in the list. Otherwise only load symbols for libs that match. Example: ```"foo.so;bar.so"```

## Debugging dump files

The C/C++ extension enables debugging dump files on Windows and core dump files Linux and OS X.

### dumpPath

If you want to debug a Windows dump file, set this to the path to the dump file to start debugging in the `launch` configuration.

### coreDumpPath

Full path to a core dump file to debug for the specified program. Set this to the path to the core dump file to start debugging in the `launch` configuration.
_Note: core dump debugging is not supported with MinGw._

## Remote debugging or debugging with a local debugger server

### miDebuggerServerAddress

Network address of the debugger server (for example, gdbserver) to connect to for remote debugging (example: `localhost:1234`).

### debugServerPath

Full path to debug server to launch.

### debugServerArgs

Arguments for the debugger server.

### serverStarted

Server-started pattern to look for in the debug server output. Regular expressions are supported.

### filterStdout

If set to true, search `stdout` stream for server-started pattern and log stdout to debug output. Default value is `true`.

### filterStderr

If set to true, search `stderr` stream for server-started pattern and log stderr to debug output. Default value is `false`.

### serverLaunchTimeout

Time in milliseconds, for the debugger to wait for the debugServer to start up. Default is 10000.

### pipeTransport

For information about attaching to a remote process, such as debugging a process in a Docker container, see the [Pipe transport](/docs/cpp/pipe-transport.md) settings article.

### hardwareBreakpoints

If provided, this explicitly controls hardware breakpoint behavior for remote targets. If `require` is set to true, always use hardware breakpoints. Default value is `false`. `limit` is an optional limit on the number of available hardware breakpoints to use which is only enforced when `require` is true and `limit` is greater than 0. Defaults value is 0. Example: ```"hardwareBreakpoints": { require: true, limit: 6 }```.

## Additional properties

### processId

Defaults to `${command:pickProcess}` which will display a list of available processes the debugger can attach to. We recommend that you leave this default, but the property can be explicitly set to a specific process ID for the debugger to attach to.

### request

Indicates whether the configuration section is intended to `launch` the program or `attach` to an already running instance.

### targetArchitecture

`Deprecated` This option is no longer needed as the target architecture is automatically detected.

### type

Indicates the underlying debugger being used. Must be `cppvsdbg` when using the Visual Studio Windows debugger, and `cppdbg` when using GDB or LLDB. This is automatically set to the correct value when the
`launch.json` file is created.

### sourceFileMap

This allows mapping of the compile-time paths for source to local source locations. It is an object of key/value pairs and will resolve the first string-matched path. (example: `"sourceFileMap": { "/mnt/c": "c:\\" }` will map any path returned by the debugger that begins with `/mnt/c` and convert it to `c:\\`. You can have multiple mappings in the object but they will be handled in the order provided.)

## Environment variable definitions file

An environment variable definitions file is a simple text file containing key-value pairs in the form of `environment_variable=value`, with `#` used for comments. Multiline values are not supported.

The `cppvsdbg` debugger configuration also contains an `envFile` property that allows you to easily set variables for debugging purposes.

For example:

**project.env file**:

```bash
# project.env

# Example environment with key as 'MYENVRIONMENTPATH' and value as C:\\Users\\USERNAME\\Project
MYENVRIONMENTPATH=C:\\Users\\USERNAME\\Project

# Variables with spaces
SPACED_OUT_PATH="C:\\This Has Spaces\\Project"
```

## Symbol Options

The `symbolOptions` element allows customization of how the debugger searches for symbols. Example:

```json
    "symbolOptions": {
        "searchPaths": [
            "C:\\src\\MyOtherProject\\bin\\debug",
            "https://my-companies-symbols-server"
        ],
        "searchMicrosoftSymbolServer": true,
        "cachePath": "%TEMP%\\symcache",
        "moduleFilter": {
            "mode": "loadAllButExcluded",
            "excludedModules": [ "DoNotLookForThisOne*.dll" ]
        }
    }
```

### Properties

**searchPaths**: Array of symbol server URLs (example: https://msdl.microsoft.com/download/symbols) or directories (example: /build/symbols) to search for .pdb files. These directories will be searched in addition to the default locations -- next to the module and the path where the pdb was originally dropped to.

**searchMicrosoftSymbolServer**: If `true` the Microsoft Symbol server (https://msdl.microsoft.com/download/symbols) is added to the symbols search path. If unspecified, this option defaults to `false`.

**cachePath**": Directory where symbols downloaded from symbol servers should be cached. If unspecified, the debugger will default to %TEMP%\\SymbolCache..

**moduleFilter.mode**: This value is either `"loadAllButExcluded"` or `"loadOnlyIncluded"`. In `"loadAllButExcluded"` mode, the debugger loads symbols for all modules unless the module is in the 'excludedModules' array. In `"loadOnlyIncluded"` mode, the debugger will not attempt to load symbols for ANY module unless it is in the 'includedModules' array, or it is included through the 'includeSymbolsNextToModules' setting.

#### Properties for `"loadAllButExcluded"` mode

**moduleFilter.excludedModules**: Array of modules that the debugger should NOT load symbols for. Wildcards (example: MyCompany.*.dll) are supported.

#### Properties for `"loadOnlyIncluded"` mode

**moduleFilter.includedModules**: Array of modules that the debugger should load symbols for. Wildcards (example: MyCompany.*.dll) are supported.

**moduleFilter.includeSymbolsNextToModules**: If true, for any module NOT in the 'includedModules' array, the debugger will still check next to the module itself and the launching executable, but it will not check paths on the symbol search list. This option defaults to 'true'.
