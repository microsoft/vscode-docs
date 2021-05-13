---
Order:
Area: cpp
TOCTitle: Setup Help for LLDB-MI
ContentId: 1e84d196-397f-4dbb-9746-06f15766d83e
PageTitle: How to set up debugging on macOS with LLDB-MI
DateApproved: 2/12/2020
MetaDescription: How to set up debugging on macOS with LLDB-MI
---
# Debugging with LLDB-MI on macOS

The debug adapter for the [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) utilizes the machine interface mode for both gdb and lldb. To use this interface in lldb, the extension utilizes `lldb-mi`. The `lldb-mi` executable was built from the GitHub [lldb-mi repository](https://github.com/lldb-tools/lldb-mi) and has a dependency on the `LLDB.framework`, which is part of XCode.

## Prerequisites

The `lldb-mi` executable requires `LLDB.framework` to run.

### How to obtain the LLDB.framework

You can get the `LLDB.framework` one of two ways.

XCode:

   1. Open the **Apple App Store**.
   2. Search for 'XCode'.
   3. Select the **XCode** application and then **Install**.

XCode Command Line Tools:

   1. Open a terminal.
   2. Run `xcode-select --install`.
   3. Confirm the prompt.

## Example launch.json

Below is an example `launch.json` debug configuration entry for `lldb`:

```json
"configurations": [
    {
        "name": "Launch (lldb)",
        "type": "cppdbg",
        "request": "launch",
        "program": "${workspaceFolder}/a.out",
        "args": [],
        "stopAtEntry": false,
        "cwd": "${workspaceFolder}",
        "environment": [],
        "externalConsole": false
    }
]
```

## If you get a Developer Tools Access prompt

You may see a dialog saying "Developer Tools Access needs to take control of another process for debugging to continue."

![Developer Tool Access problem](images/debugger/DeveloperToolsAccess.png)

If you get this prompt, you will have to enter your username and password to allow debugging.

If you wish to permanently dismiss this prompt, you can run the following command in a terminal:

```bash
sudo DevToolsSecurity --enable
```

## Additional configurations

### Using an LLDB.framework not installed via XCode

If you wish to use an LLDB.framework that is not installed with XCode, you need to:

1. Copy the `lldb-mi` executable in `~/.vscode/extensions/ms.vscode-cpptools-<version>/debugAdapters/lldb-mi/bin` to the folder where the `LLDB.framework` is located.

2. Add the full path of `lldb-mi` to `miDebuggerPath` in your `launch.json` configuration.

For example, if you have the `LLDB.framework` folder located at `/Users/default/example/`, you would:

1. Copy `~/.vscode/extensions/ms.vscode-cpptools-<version>/debugAdapters/lldb-mi/bin/lldb-mi` into  `/Users/default/example/`.

2. Add the following to your existing configuration:

   ```json
   "miDebuggerPath": "/Users/default/example/lldb-mi"
   ```

### Using a custom-built lldb-mi

If you built your own `lldb-mi`, you can use it by setting `miDebuggerPath` to the full path of the executable.

## References

* [LLDB-MI Build](https://dev.azure.com/ms/vscode-cpptools/_build?definitionId=313)
* [LLDB-MI Repository](https://github.com/lldb-tools/lldb-mi)
