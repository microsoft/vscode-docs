---
Order: 3
Area: terminal
TOCTitle: Terminal Profiles
ContentId: 1a9d76e8-9c8c-446e-974e-d71570e7d62a
PageTitle: Terminal Profiles in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Visual Studio Code's integrated terminal allows configuring various profiles to make launching various shells easier.
---
# Terminal Profiles

Terminal profiles are platform-specific shell configurations comprised of an executable path, arguments, and other customizations. By default several profiles are automatically detected which can be customized or added to.

<!-- TODO: Image of customized select default profile quick pick -->

Example profile:

```jsonc
{
  "terminal.integrated.profiles.windows": {
    "Custom Init": {
      "path": "pwsh.exe",
      "args": [
         "-noexit",
         "-file",
         "${env:APPDATA}\\PowerShell\\custom-init.ps1"
      ]
    }
  },
  "terminal.integrated.defaultProfile.windows": "Custom Init"
}
```

You can use variables in terminal profiles as shown in the example above with the `APPDATA` environment variable. There is a list of available variables in the [Variables Reference](/docs/editor/variables-reference.md) topic.

Configure your default profile by running the **Terminal: Select Default Profile** command, which is also accessible via the new terminal dropdown.

![Select Default Profile is located at the bottom of the dropdown menu attached to the new terminal button](images/basics/terminal-dropdown.png)

The default terminal profile shell defaults to `$SHELL` on Linux and macOS and PowerShell on Windows. VS Code will automatically detect most standard shells that can then be configured as the default.

## Configuring profiles

To create a new profile, run the **Terminal: Select Default Profile** command and activate the configure button on the right side of the shell to base it on. This will add a new entry to your settings that can be tweaked manually in your `settings.json` file.

Profiles can be created using either a `path` or a `source`, as well as a set of optional arguments. A `source` is available only on Windows and can be used to let VS Code detect the install of either `PowerShell` or `Git Bash`. Alternatively, a `path` pointing directly to the shell executable can be used. Here are some example profile configurations:

```json
{
  "terminal.integrated.profiles.windows": {
    "PowerShell -NoProfile": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    }
  },
  "terminal.integrated.profiles.linux": {
    "zsh (login)": {
      "path": "zsh",
      "args": ["-l"]
    }
  }
}
```

Other arguments supported in profiles include:

* `overrideName`: A boolean indicating whether or not to replace the dynamic terminal title that detects what program is running with the static profile name.
* `env`: A map defining environment variables and their values, set the variable to `null` to delete it from the environment. This can be configured for all profiles using the `terminal.integrated.env.<platform>` setting.
* `icon`: An icon ID to use for the profile.
* `color`: A theme color ID to style the icon.

>**Tip:** Path, args, and env all support [resolving variables](https://code.visualstudio.com/docs/editor/variables-reference)

The **default profile** can be defined manually with the `terminal.integrated.defaultProfile.*` settings. This should be set to the name of an existing profile:

```json
{
  "terminal.integrated.profiles.windows": {
    "my-pwsh": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "my-pwsh"
}
```

>**Tip:** The integrated terminal shell is running with the permissions of VS Code. If you need to run a shell command with elevated (administrator) or different permissions, use platform utilities such as `runas.exe` within a terminal.

## Removing built-in profiles

To remove a built-in profile and prevent it from showing up in the new terminal dropdown, set the name of the profile to `null`. For example, to remove the `Git Bash` profile on Windows, use this setting:

```json
{
  "terminal.integrated.profiles.windows": {
    "Git Bash": null
  }
}
```

## Configuring the task/debug profile

By default, the task/debug features will use the default profile. This may not be ideal if your default has a heavy PowerShell startup script or a non-POSIX compliant shell for example. To configure a profile to be used only in the debug/tasks features, use the `terminal.integrated.automationProfile.<platform>` setting:

```jsonc
{
  "terminal.integrated.defaultProfile.osx": "fish",
  // Use a fully POSIX-compatible shell and avoid running a complex ~/.config/fish/config.fish
  // for tasks and debug
  "terminal.integrated.automationProfile.osx": {
    "path": "/bin/sh"
  }
}
```

## Profile-specific keybindings

Launching a terminal with a specific profile via a [dedicated keybinding](https://code.visualstudio.com/docs/getstarted/keybindings#_advanced-customization) can be accomplished with the `workbench.action.terminal.newWithProfile` command. This command takes a profile name and optional location as arguments. For example, to bind `kbstyle(Ctrl+Shift+T)` to open a terminal with the `zsh` profile:

```json
{
  "key": "ctrl+shift+t",
  "command": "workbench.action.terminal.newWithProfile",
  "args": {
    "profileName": "zsh",
    "location": "editor"
  }
}
```

## Unsafe profile detection

Certain shells are installed in unsafe paths by default, like a path that could be written to by another user on a Windows environment. VS Code will still detect these but not expose them as a proper profile until they have been explicitly configured via the **Terminal: Select Default Profile** command. When configuring an unsafe profile, there will be a warning before it's added:

![Shells with unsafe paths like c:\msys64 will show a warning before you can use the detected profile](images/profiles/unsafe-profile-warning.png)

## Cmder

Cmder itself is a terminal, but you can use the [Cmder](https://cmder.app) shell in VS Code with the following profile:

```json
{
  "terminal.integrated.profiles.windows": {
    "cmder": {
      "path": "C:\\WINDOWS\\System32\\cmd.exe",
      "args": ["/K", "C:\\cmder\\vendor\\bin\\vscode_init.cmd"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "cmder"
}
```

This profile should be picked up automatically when the `CMDER_ROOT` environment variable is set. It will also be detected as an [unsafe profile](#unsafe-profile-detection) if installed at `C:\cmder`. You may refer to [Cmder's wiki](https://github.com/cmderdev/cmder/wiki/Seamless-VS-Code-Integration) for more information.

## Cygwin

Cygwin itself is a terminal, but you can use the [Cygwin](https://www.cygwin.com/) shell in VS Code with the following profile:

```json
{
  "terminal.integrated.profiles.windows": {
    "Cygwin": {
      "path": "C:\\cygwin64\\bin\\bash.exe",
      "args": ["--login"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "Cygwin"
}
```

This profile should be detected automatically as an [unsafe profile](#unsafe-profile-detection) when installed at the default paths `C:\cygwin` or `C:\cygwin64`.

## Git Bash

A [limitation of Git Bash](https://github.com/microsoft/vscode/issues/85831#issuecomment-943403803) when VS Code uses bash.exe (the shell) as opposed to git-bash.exe (the terminal) is that history will not be retained across shell sessions. You can work around this by adding the following to your `~/.bashrc` or `~/.bash_profile` files:

```bash
export PROMPT_COMMAND='history -a'
```

This will cause the shell to call `history -a` whenever the prompt is printed which flushes the session's current session commands to the backing history file.

## MSYS2

MSYS2's bash shell can be configured with the following profile:

```json
{
  "terminal.integrated.profiles.windows": {
    "bash (MSYS2)": {
      "path": "C:\\msys64\\usr\\bin\\bash.exe",
      "args": [
        "--login",
        "-i"
      ],
      "env": { "CHERE_INVOKING": "1" }
    }
  }
}
```

The [`CHERE_INVOKING` environment variable](https://www.msys2.org/wiki/Launchers/#the-idea) is used to tell the login initialization script to preserve the working directory, instead of opening at `$HOME`.

This profile should be detected automatically as an [unsafe profile](#unsafe-profile-detection) when installed at the default path `C:\\msys64`.

## Windows PowerShell

When PowerShell 6+ is installed, Windows PowerShell is not included in the profiles list by default. To add Windows PowerShell as a profile, choose the **Select Default Profile** option in the new terminal dropdown and select the Windows PowerShell item. This will configure the profile and set it as your default.

## WSL

When running VS Code on your local machine, Windows Subsystem for Linux shells should be automatically detected. Depending on your setup, this may be a nuisance if you have a lot of distros installed. For finer control over the WSL profiles the automatic detection can be disabled with the `terminal.integrated.useWslProfiles` setting, then here's an example of how to manually configure a WSL shell:

```jsonc
{
  "terminal.integrated.profiles.windows": {
    "Debian (WSL)": {
      "path": "C:\\WINDOWS\\System32\\wsl.exe",
      "args": [
        "-d",
        "Debian"
      ]
    }
  }
}
```

## Common questions

### Why are there duplicate paths in the terminal's `$PATH` environment variable and/or why are they reversed on macOS?

This can happen on macOS because of how the terminal launches using VS Code's environment. When VS Code launches for the first time, to source your "development environment," it launches your configured shell as a **login shell**, which runs your `~/.profile`/`~/.bash_profile`/`~/.zprofile` scripts. Now when the terminal launches, it also runs as a login shell, which will put the standard paths to the front (for example, `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`) and reinitialize your shell environment.

To get a better understanding, you can simulate what is happening by launching an inner login shell within your operating system's built-in terminal:

```sh
# Add /test to the beginning of $PATH
export PATH=/test:$PATH
# Echo $PATH, /test should be at the beginning
echo $PATH
# Run bash as a login shell
bash -l
# Echo $PATH, the values should be jumbled
echo $PATH
```

Unfortunately, unlike in Linux, standalone macOS terminals all run as login shells by default, since macOS does not run a login shell when the user logs into the system. This encourages "bad behavior," like initializing aliases in your profile script when they should live in your `rc` script as that runs on non-login shells.

There are two direct fixes for this. The first is to set `"terminal.integrated.inheritEnv": false`, which will strip most environment variables from the terminal's environment, except for some important ones (like `HOME`, `SHELL`, `TMPDIR`, etc.).

The other fix is to no longer run a login shell in the terminal by creating a terminal profile and setting its `args` to `[]`. If you go with this fix, you will want to make sure any aliases in your profile scripts are moved over to your `~/.bashrc`/`~/.zshrc` file since aliases only apply to the shell they're set in.
