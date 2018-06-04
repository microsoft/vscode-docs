---
Order: 4
Area: python
TOCTitle: Debugging
ContentId: 3d9e6bcf-eae8-4c94-b857-89225b5c4ab5
PageTitle: Debugging Python with Visual Studio Code
DateApproved: 05/25/2018
MetaDescription: Debugging Python with Visual Studio Code
MetaSocialImage: images/tutorial/social.png
---
# Debugging Python with VS Code

The Python extension supports debugging of a number of types of Python applications. For a short walkthrough of basic debugging, see [Tutorial - Configure and run the debugger](python-tutorial.md#configure-and-run-the-debugger).

To familiarize yourself with VS Code's general debugging capabilities, such as examining local variables, the watch window, arguments, breakpoints, and more, review [VS Code debugging](/docs/editor/debugging.md). This present article addresses only those considerations that are specific to Python, mainly Python-specific debugging configurations.

## Initializing Python debugging configurations

The behavior of the VS Code debugger when working with Python is driven by a *configuration*. Configurations are defined in a `launch.json` file that's stored in a `.vscode` folder in your workspace.

To initialize debug configurations, first select the Debug View in the sidebar:

![Debug icon](images/debugging/debug-icon.png)

If you don't yet have any configurations defined, you'll see "No Configurations" in the drop-down list, and a dot on the settings icon:

![Debug toolbar settings command](images/debugging/debug-settings-warning-icon.png)

To generate a `launch.json` file with Python configurations, do the following steps:

1. Select the settings button (circled in the image above) or use the **Debug** > **Open configurations** menu command.

1. In the list of debuggers that appears, select **Python**. (You can also use **Python Experimental** if you'd like, which is work in progress. See [Issue 538](https://github.com/Microsoft/vscode-python/issues/538) (GitHub).)

1. The Python extension then creates and opens a `launch.json` file that contains number of pre-defined configurations.

You can always open `launch.json` from the Explorer, or use the Debug View settings icon. You're also free to add any other configurations you want. It's often helpful in a project to create a configuration that runs a specific startup file. For example, if you always want to always launch `startup.py` whenever you start the debugger, create a configuration entry as follows:

```json
{
    "name": "Python: startup.py",
    "type": "python",
    "request": "launch",
    "program": "${workspaceFolder}/startup.py",
},
```

The details of configuration properties are covered later in this article under [Standard configuration and options](#standard-configuration-and-options). Additional configurations are also described in this article under [Debugging specific app types](#debugging-specific-app-types).

## Choose a configuration

To select a debugging configuration, select the Debug View in the sidebar, then select an option of your choice from the drop-down list:

![Selecting a debug configuration](images/debugging/debug-configurations.png)

While debugging, the Status Bar shows the current configuration on the lower left, with the current debugging interpreter to the right. Selecting the configuration brings up the list from which you can choose a different configuration:

![Debugging Status Bar](images/debugging/debug-status-bar.png)

By default, the debugger uses the same `python.pythonPath` workspace setting as for other features of VS Code. To use a different interpreter for debugging specifically, set the value for `pythonPath` in the applicable debugger configuration. Alternately, select the named interpreter on the Status Bar to select a different one.

> **Note**: The debugger settings don't support relative paths, including when relying on the main `python.pythonPath` setting. To work around this, use an environment variable, or create a variable such as `${workspaceFolder}` that resolves to your project folder, then use that variable in the path, as in `"python.pythonPath": "${workspaceFolder}/venv/bin/python"`.

## Standard configuration and options

Standard configuration for `launch.json`:

```json
{
    "name": "Python: Current File",
    "type": "python",
    "request": "launch",
    "program": "${file}",
}
```

Custom configurations for various settings are described in the following sections.

### `name`

Provides the name for the debug configuration that appears in the VS Code drop-down list.

### `type`

Identifies the type of debugger to use; leave this set to `python` for Python code.

### `request`

Specifies the mode in which to start debugging:

- `launch`: start the debugger on the file specified in `program`
- `attach`: attach the debugger to an already running process. See [Remote debugging](#remote-debugging) for an example.

### `program`

Provides the fully qualified path to the python program's entry module (startup file). The value `${file}`, often used in default configurations, uses the currently active file in the editor. By specifying a specific startup file, you can always be sure of launching your program with the same entry point regardless of which files are open. For example:

```json
"program": "/Users/Me/Projects/PokemonGo-Bot/pokemongo_bot/event_handlers/__init__.py",
```

You can also rely on a relative path from the workspace root. For example, if the root is `/Users/Me/Projects/PokemonGo-Bot` then you can use the following:

```json
"program": "${workspaceFolder}/pokemongo_bot/event_handlers/__init__.py",
```

### `pythonPath`

Points to the Python interpreter to be used for debugging. If not specified, defaults to the interpreter identified in the `python.pythonPath` setting, which is equivalent to using the value `${config:python.pythonPath}`. To use a different interpreter, specify its path instead.

You can specify platform-specific paths by placing `pythonPath` within a parent object named `osx`, `windows`, or `linux`. For example, the configuration for PySpark uses the following values:

```json
"osx": {
    "pythonPath": "^\"\\${env:SPARK_HOME}/bin/spark-submit\""
},
"windows": {
    "pythonPath": "^\"\\${env:SPARK_HOME}/bin/spark-submit.cmd\""
},
"linux": {
    "pythonPath": "^\"\\${env:SPARK_HOME}/bin/spark-submit\""
},
```

Alternately, you can use a custom environment variable that's defined on each platform to contain the full path to the Python interpreter to use, so that no additional folder paths are needed.

### `args`

Specifies arguments to pass to the Python program, for example:

```json
"args": [
    "--quiet", "--norepeat"
],
```

### `stopOnEntry`

When set to true, breaks the debugger at the first line of the program being debugged. If omitted (the default) or set to false, the debugger runs the program to the first breakpoint.

### `console`

Specifies how program output is displayed.

| Value | Where output is displayed |
|--- | --- |
| `"none"` | VS Code debug console |
| `"integratedTerminal"` (default) | [VS Code Integrated Terminal](/docs/editor/integrated-terminal.md) |
| `"externalTerminal"` | Separate console window |

### `cwd`

Specifies the current working directory for the debugger, which is the base folder for any relative paths used in code. If omitted, defaults to `${workspaceFolder}` (the folder open in VS Code).

As an example, say `${workspaceFolder}` contains a `py_code` folder containing `app.py`, and a `data` folder containing `salaries.csv`. If you start the debugger on `py_code/app.py`, then the relative paths to the data file vary depending on the value of `cwd`:

| cwd | Relative path to data file |
| --- | --- |
| Omitted or `${workspaceFolder}` | `data/salaries.csv` |
| `${workspaceFolder}/py_code`) | `../data/salaries.csv` |
| `${workspaceFolder}/data` | `salaries.csv` |

### `debugOptions`

An array of additional options that may contain the following:

| Option | Description |
| --- | --- |
| `"RedirectOutput"` (default) | Causes the debugger to print all output from the program into the VS Code debug output window. If this setting is omitted, all program output is not displayed in the debugger output window. This option is typically omitted when using `"console": "integratedTerminal"` or `"console": "externalTerminal"` because there's no need to duplicate the output in the debug console. |
| `"DebugStdLib"` | Enabled debugging of standard library functions. |
| `"Django"` | Activates debugging features specific to the Django web framework. |
| `"Sudo"` | When used with `"console": "externalTerminal"`, allows for debugging apps that require elevation. Using an external console is necessary to capture the password. |
| `"Pyramid"` | Used when debugging a Pyramid application. |

### `env`

Sets optional environment variables for the debugger process beyond system environment variables, which the debugger always inherits.

### `envFile`

Optional path to a file that contains environment variable definitions. See [Configuring Python environments - environment variable definitions file](/docs/python/environments.md#environment-variable-definitions-file).

## Debugging specific app types

The configuration drop-down provides a variety of different options for general app types:

| Configuration | Description |
| --- | --- | --- |
| PySpark | Runs the program using PySpark instead of the default interpreter, using platform-specific values for `pythonPath` as shown earlier under the [pythonPath option](#pythonpath). |
| Python Module | Replaces `program` with the setting `"module": "module.name"` to debug a specific module. When using this configuration, replace the value with the desired module name. |
| Integrated Terminal/Console | Adds the `"console": "integratedTerminal"` option to the standard configuration. |
| External Terminal/Console | Adds the `"console": "externalTerminal"` option to the standard configuration. |
| Django | Specifies `"program": "${workspaceFolder}/manage.py"` and `"args": ["runserver", "--noreload", "--nothreading"]`, and adds "Django" and "RedirectOutput" to `debugOptions`. Note that automatic reloading of Django apps is not possible while debugging. To debug Django HTML templates, add breakpoints to `templates`. |
| Flask | See [Flask debugging](#flask-debugging) below. |
| Pyramid | Removes `program`, adds `"args": ["${workspaceFolder}/development.ini"]`, and adds "Pyramid" and "RedirectOutput" to `debugOptions`. |
| Watson | Specifies `"program": "${workspaceFolder}/console.py"` and `"args": ["dev", "runserver", "--noreload=True"]` |
| Scrapy | Specifies `"program": "~/.virtualenvs/scrapy/bin/scrapy"`, adds the `"console": "integratedTerminal"` option, and adds `"args": ["crawl", "specs", "-o", "bikes.json"]`. |
| Attach (Remote Debug) | See [Remote debugging](#remote-debugging) below. |

Specific steps are also needed for remote debugging and Google App Engine. For details on debugging unit tests (including nosetest), see [Unit testing](/docs/python/unit-testing.md).

To debug an app that requires administrator privileges, use `"console": "externalTerminal"` and include "Sudo" in `debugOptions`.

### Flask debugging

```json
{
    "name": "Python: Flask (0.11.x or later)",
    "type": "python",
    "request": "launch",
    "module": "flask",
    "env": {
        "FLASK_APP": "app.py"
    },
    "args": [
        "run",
        "--no-debugger",
        "--no-reload"
    ]
},
```

As you can see, this configuration specifies `"env": {"FLASK_APP": "app.py"}` and `"args": ["run", "--no-debugger","--no-reload"]`. The `"module": "flask"` property is used instead of `program`. (You may see `"FLASK_APP": "${workspaceFolder}/app.py"` in the `env` property, in which case modify the configuration to refer to only the filename. Otherwise you may see "Cannot import module C" errors where C is a drive letter.)

If you want to run Flask's development server in development mode, use the following configuration:

```json
{
    "name": "Python: Flask (development mode)",
    "type": "python",
    "request": "launch",
    "module": "flask",
    "env": {
        "FLASK_APP": "app.py",
        "FLASK_ENV": "development"
    },
    "args": [
        "run"
    ]
},
```

### Remote debugging

Remote debugging allows you to step through a program locally within VS Code while it runs on a remote computer. It is not necessary to install VS Code on the remote computer.

1. Both computers: make sure the same source code is available and identical.

1. Both computers: install [ptvsd 3.0.0](https://pypi.org/project/ptvsd/3.0.0/) using `pip3 install ptvsd==3.0.0` (Mac/Linux) or `pip install ptvsd==3.0.0` (Windows). Version 3.0.0 is required; later versions are not yet supported.

1. Remote computer: in the source code, add the following lines, replacing *my_secret* with a passphrase that you'll use to authenticate remote debugging, and replacing *address* with the remote computer's IP address and port number (IP address 1.2.3.4 is shown here for illustration only).

    ```python
    import ptvsd

    # Allow other computers to attach to ptvsd at this IP address and port, using the secret
    ptvsd.enable_attach("my_secret", address = ('1.2.3.4', 3000))

    # Pause the program until a remote debugger is attached
    ptvsd.wait_for_attach()
    ```

1. Local computer: in the source code, add a commented-out copy of the same code added on the remote computer. Adding these lines makes sure that the source code on both computers matches line by line.

    ```python
    #import ptvsd

    # Allow other computers to attach to ptvsd at this IP address and port, using the secret
    #ptvsd.enable_attach("my_secret", address = ('1.2.3.4', 3000))

    # Pause the program until a remote debugger is attached
    #ptvsd.wait_for_attach()
    ```

1. Local computer: switch to Debug View in VS Code, select the **Python: Attach** configuration, then select the settings (gear) icon to open `launch.json` to that configuration.

1. Local computer: Modify the configuration so that `remoteRoot` provide the location of the program on the remote computer's file system. Also modify `host`, `port`, and `secret` to match the values in the `ptvsd.enable_attach` call added to the source code. For example:

    ```js
    {
        "name": "Python Attach",
        "type": "python",
        "request": "attach",
        "localRoot": "${workspaceFolder}",
        "remoteRoot": "c:\\py\\hello",  // Set to the program location on the remote computer.
        "port": 3000,                   // Set to the remote port
        "secret": "my_secret",          // Set to your specific secret
        "host": "1.2.3.4"               // Set to your remote host
    }
    ```

    > **Tip*: If the `remoteRoot` path is the same as the local computer, you can use `${workspaceFolder}` as the value for `remoteRoot`.

1. Remote computer: start the program from the command line, which should pause on the `ptvsd.wait_for_attach()` call. Note that you **don't** run the program inside a separate debugger like VS Code. The ptvsd library is providing the remote debugging capabilities directly.

1. Local computer: set a breakpoint in the code where you want to start debugging.

    > **Tip**: setting a single breakpoint on the statement immediately following the `ptvsd.wait_for_attach()` line may not work. Set at least one other breakpoint on another statement.

1. Local computer: start the VS Code debugger using the modified **Python Attach** configuration. VS Code should stop on your locally-set breakpoints, allowing you to step through the code, examine variables, and perform all other debugging actions. Expressions that you enter in the **Debug Console** are run on the remote computer as well.

1. During remote debugging, the debugging toolbar appears as below:

    ![Debugging toolbar during remote debugging](images/debugging/remote-debug-toolbar.png)

    On this toolbar, the disconnect button (`kb(workbench.action.debug.stop)`) stops the debugger and allows the remote program to run to completion. The restart button (`kb(workbench.action.debug.restart)`) restarts the debugger on the local computer but does **not** restart the remote program. You use the restart button only when you've already restarted the remote program and need to reattach the debugger.

**Debugging over SSH**

In some cases you may want or need to use a secure connection to the remote computer when debugging. On Windows computers, you may need to install [OpenSSH](http://sshwindows.sourceforge.net/) to have the `ssh` command.

On the remote computer:

1. Modify the `sshd_config` config file (found under `etc/ssh/` on Linux and under `%programfiles(x86)%/openssh/etc` on Windows) to enable port forwarding.

1. Start the program and let it wait at the `ptvsd.wait_for_attach()` call as described in the previous section.

On the local computer:

1. Windows: use [PuTTY](https://www.putty.org/) to establish an SSH tunnel:
    1. Read [Setting up an SSH tunnel with PuTTY](http://realprogrammers.com/how_to/set_up_an_ssh_tunnel_with_putty.html) (until "Open the session" section).
    1. On the Tunnels screen, using a local mode, source port (the port which is the entry point on the local computer) can be different from the destination port (the end point on the server).
    1. Destination address should be the localhost or `127.0.0.1` address (which is the address that the remote SSH server uses to establish the tunnel).

1. Linux: run `ssh -L sourceport:localhost:destinationport user@remoteaddress` using a selected port for `destinationport` and the appropriate username and the remote computer's IP address in `user@remoteaddress`.

1. Verify that you can see a prompt in the SSH session.

1. In VS Code, set the port in the debug configuration to match the port shown on the Tunnels screen (Windows) or the port used in the `ssh` command (Linux).

1. Launch the program and attach the debugger as described in the previous section.

### Google App Engine debugging

Google App Engine launches an app by itself, so launching it in the VS Code debugger isn't directly possible. What's required instead is to use ptvsd in the app and then launch Google App Engine in a mode that allows VS Code to attach its debugger.

![Debugging Google App Engine](images/debugging/debugGAE.gif)

1. [Download ptvsd](https://pypi.python.org/pypi/ptvsd) and extract its files into a ptvsd folder in your working folder. (If using a different folder, modify the path in the `pydev_startup.py` file created in step 4).

1. Create a `tasks.json` file with the following contents:

    ```json
    {
        "version": "2.0.0",
        "tasks": [
            {
                "label": "Launch Google App Engine",
                "command": "python",
                "type": "shell",
                "args": [
                    "/usr/local/google_appengine/dev_appserver.py",
                    "--python_startup_script=${workspaceFolder}/pydev_startup.py",
                    "--automatic_restart=no",
                    "--max_module_instances=default:1",
                    "${workspaceFolder}/app.yaml"
                ]
            }
        ]
    }
    ```

1. On Windows and Linux, replace the first item in `args` with the path to wherever Google App Engine is installed (the path shown in the source code above is for macOS).

1. Create a file named pydev_startup.py in your project root with the following contents, modified as noted:
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
1. Create a `launch.json` configuring using the **Attach (Remote Debug)** configuration as a template. Make sure the secret and port values match what's in the source code above.
1. Add `"preLaunchTask": "python"` to `launch.json`.
1. From the Command Palette, run the **Run Build Task** command. This opens the Tasks output window where you see various messages.
1. Once you see the message "Google App Engine has started, ready to attach the debugger", start the VS Code debugger using the remote debugging configuration.
1. Set breakpoints where you want, then start the browser to start the app.

<a name="debugger-not-working"></a>

## Troubleshooting

There are many reasons why the debugger may not work. Oftentimes the debug console reveals specific causes, but two specific reasons are as follows:

- The path to the python executable is incorrect: check the value of `pythonPath` in your user settings.
- Invalid expressions in the watch window (see example below): clear all expressions from the Watch window and restart the debugger.

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

## Next steps

- [Python environments](/docs/python/environments.md) - Control which Python interpreter is used for editing and debugging.
- [Unit testing](/docs/python/unit-testing.md) - Configure unit test environments and discover, run, and debug tests.
- [Settings reference](/docs/python/settings-reference.md) - Explore the full range of Python-related settings in VS Code.
- [General debugging](/docs/editor/debugging.md) - Learn about the debugging features of VS Code.
