---
Order:
Area: cpp
TOCTitle: Pipe transport
ContentId: 59BE5FF7-563F-4044-A562-294E75A75F96
PageTitle: Pipe transport for remote communication in C++ projects
DateApproved: 07/25/2019
MetaDescription: How to set up pipe transport for debugging C++ code in Visual Studio Code.
---
# Pipe transport

Pipe transport allows communication through a pipe program to a remote shell. For example, `ssh` on Linux. With the introduction of [Visual Studio Code Remote Development](/docs/remote/remote-overview.md) pipe transport is relevant primarily for IoT scenarios.

## How-To

`pipeTransport` is an option within the **launch.json** file. The structure looks as follows:

```json
"pipeTransport": {
    "pipeCwd": "/usr/bin",
    "pipeProgram": "/usr/bin/ssh",
    "pipeArgs": [
        "-pw",
        "<password>",
        "user@10.10.10.10"
    ],
    "debuggerPath": "/usr/bin/gdb"
},
```

The `pipeArgs` can be any set of arguments necessary to set up and authenticate the pipe connection. In the example, a password is used but you can also use an ssh key.

You may also need to add a `sourceFileMap` to map the path of where the code exists on the remote shell to where it is locally:

```json
"sourceFileMap": {
    // "remote": "local"
    "/home/user/src": "/src/projectA/src"
}
```

## Attach

You can also use the above `pipeTransport` block to attach to a remote process. In the attach case, you need to specify a `processId`. The extension can query processes from the remote machine. To do this, change `processId": "${command:pickProcess}` to `processId": "${command:pickRemoteProcess}`. The `pipeTransport` settings will be used to query the processes on the remote machine. Then select the process from the dropdown list. As with `launch`, you may need to configure `sourceFileMap`.

## Docker example

The `pipeTransport` can also be used to debug a process in a Docker container. For an attach, **launch.json** will include:

```json
"pipeTransport": {
    "pipeCwd": "${workspaceFolder}",
    "pipeProgram": "docker",
    "pipeArgs": [
        "exec",
        "-i",
        "hello_gdb",
        "sh",
        "-c"
    ],
    "debuggerPath": "/usr/bin/gdb"
},
```

Where `hello_gdb` is the name of your container.

Launch process by starting a container and then using the same `pipeTransport` to launch additional processes in the container. See this [launch.json](https://github.com/andyneff/hello-world-gdb/blob/master/.vscode/launch.json) for a [full example](https://github.com/andyneff/hello-world-gdb/).
