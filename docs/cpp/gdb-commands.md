---
Order:
Area: cpp
TOCTitle: Setup Help for GDB-COMMANDS
ContentId: 1097b015-54b7-4e87-afc9-25a36e7357e8
PageTitle: The execution order of GDB commands to set up GDB
DateApproved: 1/22/2024
MetaDescription: The execution order of GDB commands
---

# The execution order of GDB commands to set up GDB

In the VS code environment, there are some ways to set up GDB when debugging C/C++ applications:

1. `.gdbinit` file in the directory indicated by the `"cwd"` field in the `launch.json`
2. `"setupCommands"` filed in `launch.json`
3. `"postRemoteConnectCommands"` filed in `launch.json`

When starting debugging, the working directory for gdb is specified by the "cwd" field in `launch.json`. When gdb is launched, it automatically searches for the `.gdbinit` file in the working directory and executes the commands from `.gdbinit`. And then, GDB will execute the commands from `"setupCommands"` filed and `"postRemoteConnectCommands"` filed. The difference between `setupCommands` and `postRemoteConnectCommands` is that `setupCommands` are executed before loading the debug target, while `postRemoteConnectCommands` are executed after loading the debug target.

In some cases, we may need to load the `.gdbinit` file after loading the debugging target, for example, set hardware breakpoint. In such cases, it is recommended to rename the `.gdbinit` file, for example, to hello.gdbinit, and then add `{"text": "source /path/to/hello.gdbinit"}` to the `postRemoteConnectCommands` field.
