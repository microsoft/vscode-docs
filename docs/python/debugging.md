---
Order: 4
Area: python
TOCTitle: Debugging
ContentId: 3d9e6bcf-eae8-4c94-b857-89225b5c4ab5
PageTitle: Debugging Python with Visual Studio Code
DateApproved: 11/10/2017
MetaDescription: Debugging Python with Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Debugging Python with VS Code

The Python extension supports debugging of a number of types of Python applications, including the following [general capabilities](/docs/editor/debugging.md):

- Watch window
- Evaluating expressions
- Locals
- Arguments
- Expanding children
- Breakpoints
- Conditional breakpoints
- Pausing (breaking into) running programs
- Custom startup directory

The default `launch.json` (which is where VS Code stores the debugger configurations) includes a number of starter debug configurations, these are available from the configuration drop-down. The default "Python" selection provides the standard configuration. See [Standard configuration and options](#standard-configuration-and-options) for a description of this configuration and the debug settings.

Additional configurations are described in [Debugging specific app types](#debugging-specific-app-types).

## Standard configuration and options

Standard configuration for `launch.json`:

```json
{
    "name": "Python",
    "type": "python",
    "pythonPath":"${config:python.pythonPath}",
    "request": "launch",
    "stopOnEntry": true,
    "console": "none",
    "program": "${file}",
    "cwd": "${workspaceRoot}",
    "debugOptions": [
        "WaitOnAbnormalExit",
        "WaitOnNormalExit",
        "RedirectOutput"
    ],
    "env": {"name":"value"}
}
```

Custom configurations for various settings are described in the following sections.

### `pythonPath`

Points to the Python interpreter to be used for debugging purposes. The standard configuration uses the interpreter identified in the `python.pythonPath` setting by referring to `${config:python.pythonPath}`. To use a different interpreter, specify its path instead.

### `program`

Provides the fully qualified path to the python program's entry module. The recommended value for this is `${file}`, which uses the active file in the editor. For programs with multiple files, however, you can specify the program's startup file. For example:

```json
"program": "/Users/Me/Projects/PokemonGo-Bot/pokemongo_bot/event_handlers/__init__.py",
```

You can also rely on a relative path from the workspace root. For example, if the root is `/Users/Me/Projects/PokemonGo-Bot` then you can use the following:

```json
"program": "${workspaceRoot}/pokemongo_bot/event_handlers/__init__.py",
```

### `args`

Specifies arguments to pass to the python program, for example:

```json
"args": [
    "--quiet", "--norepeat"
],
```

### `stopOnEntry`

When set to true, breaks the debugger at the first line of the program being debugged. Setting to false will run the program to the first breakpoint.

### `console`

Specifies how program output is displayed.

| Value | Where output is displayed |
|--- | --- |
| `"none"` (default) | No output |
| `"integratedTerminal"` | VS Code debug console |
| `"externalTerminal"` | Separate console window |

### `cwd`

Specifies the current working directly for the program being debugged, defaulting to the current folder. The standard configuration uses `${workspaceRoot}` to use the project folder.

### `debugOptions`

An array of additional options that may contain the following:

| Option | Description |
| --- | --- |
| `"WaitOnAbnormalExit"` | Prevents an external console window from automatically closing when a program terminates due to an error. |
| `"WaitOnNormalExit"` | Prevents an external console window from automatically closing when a program completes normally. |
| `"RedirectOutput"` | Causes the debugger to print all output from the program into the VS Code debug output window. If this setting is omitted, all program output is not displayed in the debugger output window. This option is typically omitted when using  `"console": "integratedTerminal"` or `"console": "externalTerminal"` because there's no need to duplicate the output in the debug console. |
| `"DebugStdLib"` | Enabled debugging of standard library functions. |
| `"DjangoDebugging"` | Activates debugging features specific to Django. |
| `"Sudo"` | When used with `"console": "externalTerminal"`, allows for debugging apps that require elevation. Using an external console is necessary to capture the password. |

### `env`

Sets custom environment variables for the debugger process beyond system environment variables, which the debugger always inherits.

## Debugging specific app types

The configuration drop-down provides a variety of different options for general app types:

| Configuration | Description |
| --- | --- | --- |
| PySpark | Runs the program using PySpark instead of the standard interpreter. |
| Python Module | Adds the setting `"module": "module.name"` to debug a specific module. When using this configuration, replace the value with the desired module name. |
| Integrated Terminal/Console | Specifies `"console": "integratedTerminal"` and removes the `RedirectOutput` option. |
| External Terminal/Console | Specifies `"console": "externalTerminal"` and removes the `RedirectOutput` option. |
| Django | Specifies `"program": "${workspaceRoot}/manage.py"` and `"args": ["runserver", "--noreload"]`, and adds "DjangoDebugging" to `debugOptions`. Note that automatic reloading of Django apps is not possible while debugging. To debug Django HTML templates, just add breakpoints to `templates`. |
| Flask | Specifies `"stopOnEntry": false`, `"env": {"FLASK_APP": "${workspaceRoot}/quickstart/app.py"}` and `"args": ["run", "--no-debugger","--no-reload"]`; note that you must modify the `program` setting to point to the flask executable, which is typically located with the Python interpreter. |
| Watson | Specifies `"program": "${workspaceRoot}/console.py"` and `"args": ["dev", "runserver", "--noreload=True"]` |
| Attach (Remote Debug) | See [Remote debugging](#remote-debugging) below. |

Specific steps are also needed for remote debugging and Google App Engine. For details on debugging unit tests (including nosetest), see [Unit testing](/docs/python/unit-testing.md).

To debug an app that requires administrator privileges, use `"console": "externalTerminal"` and include "Sudo" in `debugOptions`.

### Remote debugging

Remote debugging allows you to step through a program locally within VS Code while it's executed on a remote computer. In this case, it's necessary to have the source code on both computers.

1. On both development and remote computers, install the [ptvsd library](https://pypi.org/project/ptvsd/) (version `3.0.0` or later).
2. In the source code on both computers, add the following lines, replacing *my_secret* with the appropriate passphrase to authenticate remote debugging, and replacing *address* with the appropriate IP address (or `localhost`) and port number:

    ```python
    import ptvsd
    ptvsd.enable_attach("my_secret", address = ('0.0.0.0', 3000))

    # Enable the line of source code below only if you want the application to wait until the debugger has attached to it
    #ptvsd.wait_for_attach()
    ```
3. On the remote computer only, uncomment the last line above. You want to preserve the commented line on the development machine to ensure that source code on both machines match line for line.
4. Start the remote program.
5. Select the **Attach (Remote Debug)** configuration (below), then modify `remoteRoot` to point to the program's location on the remote computer, and modify `host`, `port`, and `secret` to match the values in the source code added above.

    ```json
    {
        "name": "Attach (Remote Debug)",
        "type": "python",
        "request": "attach",
        "localRoot": "${workspaceRoot}",
        "remoteRoot": "${workspaceRoot}",
        "port": 3000,
        "secret": "my_secret",
        "host": "localhost"
    }
    ```

**Debugging over SSH**

Windows:

1. Enable ssh port forwarding on the remote computer using sshd_config or similar.
2. Establish a PuTTY SSH tunnel:
    1. Read [Setting up an SSH tunnel with PuTTY](http://realprogrammers.com/how_to/set_up_an_ssh_tunnel_with_putty.html) (until "Open the session" section).
    2. On the Tunnels screen, using a local mode, source port (which is the port which will be the entry point on the local computer) can be different from the destination port (the end point on the server).
    3. Destination address should be the localhost or `127.0.0.1` address (which is the address that the remote SSH server will use to establish the tunnel).

Linux:

1. Run `ssh -L sourceport:localhost:destinationport user@remoteaddress`

Next, verify that you can see a prompt in the SSH session. Then open VS Code and configure the port to the debug port shown on the Tunnels screen.

Finally, launch the program and attach the debugger as described in the previous section.

### Google App Engine debugging

Google App Engine launches an app by itself, so launching it in the VS Code debugger isn't directly possible. What's required instead is to use ptvsd in the app and then launch Google App Engine in a mode that allows VS Code to attach its debugger.

![Debugging Google App Engine](images/debugging/debugGAE.gif)

1. [Download ptvsd](https://pypi.python.org/pypi/ptvsd) and extract its files into a ptvsd folder in your working folder. (If using a different folder, modify the path in the `pydev_startup.py` file created in step 4).

2. Create a `tasks.json` file with the following contents:

    ```json
    {
        "version": "0.1.0",
        "command": "python",
        "isShellCommand": true,
        "showOutput": "always",
        "args": [
            "/usr/local/google_appengine/dev_appserver.py",
            "--python_startup_script=${workspaceRoot}/pydev_startup.py",
            "--automatic_restart=no",
            "--max_module_instances=default:1",
            "${workspaceRoot}/app.yaml"
        ]
    }
    ```

3. On Windows and Linux, replace the first item in `args` with the path to wherever Google App Engine is installed (the path shown in the source code above is for macOS).

4. Create a file named pydev_startup.py in your project root with the following contents, modified as noted:
    ```python
    import sys
    import os

    #Assuming that pdvsd is located in the working folder
    sys.path.append(os.getcwd())

    import ptvsd
    # Modify the secret and port number as desired; you're debugging locally so the values don't matter.
    # However, be sure the port is not blocked on your computer.
    ptvsd.enable_attach(secret = 'gae', address = ('0.0.0.0', 3000))

    #The debug server has started and you can now use VS Code to attach to the application for debugging
    print("Google App Engine has started, ready to attach the debugger")
    ```
5. Create a `launch.json` configuring using the **Attach (Remote Debug)** configuration as a template. Make sure the secret and port values match what's in the source code above.
6. Add `"preLaunchTask": "python"` to `launch.json`.
7. From the Command Palette, run the **Run Build Task** command. This opens the Tasks output window where you see various messages.
8. Once you see the message "Google App Engine has started, ready to attach the debugger", start the VS Code debugger using the remote debugging configuration.
9. Set breakpoints where you want, then start the browser to start the app.

## Troubleshooting

### Debugger not working

There are many reasons why the debugger may not work; oftentimes the debug console reveals specific causes. Some specific reasons are described in the following table:

| Cause | Solution |
| --- | --- |
| The path to the python executable is incorrect | Check the value in the `pythonPath` setting of `launch.json`, restarting VS Code if you make a change. |
| Invalid expressions in watch window (see detailed output below) | Clear all expressions from the Watch window restart the debugger. |

Detailed output for invalid expressions:

```python
Traceback (most recent call last):
  File ".../visualstudio_py_debugger.py", line 1646, in loop
    cmd()
  File ".../visualstudio_py_debugger.py", line 1918, in command_execute_code
    thread.run_on_thread(text, cur_frame, eid, frame_kind, repr_kind)
  File ".../visualstudio_py_debugger.py", line 1246, in run_on_thread
    self.schedule_work(lambda : self.run_locally(text, cur_frame, execution_id, frame_kind, repr_kind))
  File ".../visualstudio_py_debugger.py", line 1238, in schedule_work
    self.unblock()
  File ".../visualstudio_py_debugger.py", line 1234, in unblock
    self._block_lock.release()
RuntimeError: release unlocked lock
```

### Unable to capture user input while debugging

Capturing user input while debugging is possible only when using the `"console": "externalTerminal"` configuration. The integrated terminal does not support capturing user input.

## Next steps

- [Python environments](/docs/python/environments.md) - Control which Python interpreter is used for editing and debugging.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.

- [General debugging](/docs/editor/debugging.md) - Learn about the debugging features of VS Code.
