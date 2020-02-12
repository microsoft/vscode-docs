---
Order: 15
Area: cpp
TOCTitle: Setup Help for LLDB-MI
ContentId: 1e84d196-397f-4dbb-9746-06f15766d83e
PageTitle: How to set up debugging on macOS with LLDB-MI
DateApproved: 2/01/2020
MetaDescription: How to set up debugging on macOS with LLDB-MI
---
# Setup
The debug adapter for the C/C++ extension utilizes the machine interface mode for both gdb and lldb. To use this interface in lldb, we utilize `lldb-mi`. We build `lldb-mi` from the GitHub [lldb-mi repository](https://github.com/lldb-tools/lldb-mi) and ship this executable which has a dependency on `LLDB.framework` which is part of XCode.

## Prerequisites
The `lldb-mi` executable requires `LLDB.framework` to run.

### How to obtain `LLDB.framework`
You can get `LLDB.framework` from one of the two choices below:
- `XCode`
    1. Open the `Apple App Store`
    2. Search for `XCode`
    3. Select the `XCode` application and `Install`

- `XCode Command Line Tools`
    1. Open a terminal
    2. Run `xcode-select --install`
    3. Confirm prompt

## Example default `launch.json`
```
{
    "name": "Launch (lldb)"
    "type": "cppdbg",
    "request": "launch",
    "program": "${workspaceFolder}/a.out"
    "args": [],
    "stopAtEntry": false,
    "cwd": "${workspaceFolder}
    "environment": [],
    "externalConsole": false
}
```

# Additional Information

## Developer Tool Access needs to take control of another process for debugging to continue.

![Developer Tool Access problem](images/debugger/DeveloperToolsAccess.png)

If you get this prompt, will have you type in your password to allow debugging.

If you wish to permanently dismiss this prompt, you can run the following command in a terminal:

```
sudo DevToolsSecurity --enable
```

## Using a LLDB.Framework not installed via XCode
If you wish to use a LLDB.framework that is not installed with XCode, you can copy the `lldb-mi` executable in `~/.vscode/extensions/ms.vscode-cpptools-<version>/debugAdapters/lldb-mi/bin` right next to where the `LLDB.framework` folder is located.

Then add the full path to `lldb-mi` to `miDebuggerPath` in your `launch.json` configuration.

### Example
You have the `LLDB.framework` folder located at `/Users/default/example/`

copy `~/.vscode/extensions/ms.vscode-cpptools-<version>/debugAdapters/lldb-mi/bin/lldb-mi` into  `/Users/default/example/`

Add the following to your existing configuration

```
{
    ...
    "miDebuggerPath": "/Users/default/example/lldb-mi"
    ...
}
```

## Using a custom built lldb-mi
If you built your own `lldb-mi`, you can use it by setting `miDebuggerPath` to the full path of the executable.

## References
- [LLDB-MI Build](https://dev.azure.com/ms/vscode-cpptools/_build?definitionId=313)
- [LLDB-MI Repository](https://github.com/lldb-tools/lldb-mi)