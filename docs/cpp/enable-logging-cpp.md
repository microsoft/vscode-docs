---
Order: 13
Area: cpp
TOCTitle: Logging
ContentId: EC8DC085-A0E4-4401-B41F-6497EDD49352
PageTitle: How to enable logging in the Visual Studio Code C/C++ extension
DateApproved: 07/25/2019
MetaDescription: How to enable logging in the Visual Studio Code C/C++ extension
---
# C/C++ extension logging
Logging information is available for the language server and debugger. If you are experiencing a problem that we are unable to diagnose based on information in your issue report, we might ask you to enable logging and send us your logs.

Logging information is delivered directly to the Output window in Visual Studio Code.

## Enable logging for the language server

To turn on full logging for the lanugage server, follow these steps:

1. Open the **Command Palette** and choose **Preferences: Workspace settings**.
1. Search for "logging" in the search box.
1. Find **C_cpp: Logging Level** and change the level to **Debug**.

   ![Logging level](images/cpp/logging-level.png)

1. From the main menu, open the Output Window by choosing **View** > **Output**.

1. Select the "C/C++" option in the log filter selector:

   ![Log filter selector](images/cpp/log-filter-selector.png)

## Enable logging for the debugger
Enabling logging for the debugger will show communication information between VS Code and our extension and between our extension and the debugger.

### Logging for `MI` debuggers

The logging block with its defaults is as follows:

```
"logging": {
    "trace": false,
    "traceResponse": false,
    "engineLogging": false
}
```

#### VS Code and the CppTools extension

The logging here is called `trace` logging and can be enabled by setting `trace` and `traceResponse` to `true` in the logging block inside `launch.json`. This will help diagnose issues related to VS Code's communication to our extension and our responses.

#### CppTools extension and the debugger

The logging between CppTools and the debugger is called `engineLogging`. When using an `MI` debugger such as `gdb` or `lldb`, this will show the request, response and events using the `mi` interpreter. This logging will help us determine whether the debugger is receiving the right commands and generating the correct responses.

### Logging for `Visual C++` debugger

The logging block with its defaults is as follows:

```
"logging": { 
    "engineLogging": false
}
```

The `Visual C++` debugger logging will show only the communication to and from VS Code as all communication to the debugger is done internally to the process and is not visible through logging.
