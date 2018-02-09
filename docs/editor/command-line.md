---
Order: 14
Area: editor
TOCTitle: Command Line
ContentId: 8faef870-7a5f-4070-ad17-8ba791006912
PageTitle: The Visual Studio Code Command Line Options
DateApproved: 2/7/2018
MetaDescription: Visual Studio Code command line options. Learn to control VS Code startup.
---
# Command Line Interface (CLI)

Visual Studio Code has a powerful command line interface that lets you control how you launch the editor. You can open or diff files, install extensions, even change the display language on startup.

**Note:** Users on macOS must first run a command (**Shell Command: Install 'code' command in PATH**) to add VS Code executable to the `PATH` environment variable. Read the [macOS Setup guide](/docs/setup/mac.md) for help.

## Launching from command line

You can launch VS Code from the command line to quickly open a file, folder, or project. Typically, you open VS Code within the context of a folder. To do this, type one of the following commands for Stable and Insiders respectively:

```bash
code .
or
code-insiders .
```

**Note**: Windows and Linux installations should add the VS Code binaries location to your system path. If this isn't the case, you can manually add the location to the Path/$PATH environment variable. For example on Windows, VS Code is installed under `Program Files\Microsoft VS Code\bin`. To review platform specific setup instructions, see [Setup](/docs/setup/setup-overview.md).

## Core CLI options

Here are optional arguments you can use when starting VS Code at the command line via `code`:

Argument|Description
------------------|-----------
`-h` or `--help` | Print usage
`-v` or `--version` | Print VS Code version (for example, 1.12.2) and GitHub commit id.
`-n` or `--new-window`| Opens a new session of VS Code instead of restoring the previous session (default).
`-r` or `--reuse-window` | Forces opening a file or folder in the last active window.
`-g` or `--goto` | When used with *file:line[:character]*, opens a file at a specific line and optional character position. This argument is provided since some operating systems permit `:` in a file name.
`-d` or `--diff` | Open a file difference editor. Requires two file paths as arguments.
`-w` or `--wait` | Wait for the window to be closed before returning.
`--locale <locale>` | Set the [display language](/docs/getstarted/locales.md) (locale) for the VS Code session. (for example, `en-US` or `zh-TW`)

## Opening Files and Folders

Sometimes you will want to open or create a file. If the specified file does not exist, VS Code will create them for you:

```bash
code index.html style.css readme.md
```

For both files and folders, you can use absolute or relative paths. Relative paths are relative to the current directory of the command prompt where you run `code`.

If you specify more than one file at the command line, VS Code will open only a single instance.

If you specify more than one folder at the command line, VS Code will create a [Multi-root Workspace](/docs/editor/multi-root-workspaces.md) including each folder.

Argument|Description
------------------|-----------
*file* | Name of a file to open. If the file doesn't exist, it will be created and marked as edited. You can specify multiple files by separating each file name with a space.
*file:line[:character]* | Name of a file to open at the specified line and optional character position. You can specify multiple files in this manner, but you must use the `-g` argument (once) before using the *file:line[:character]* specifier.
*folder* | Name of a folder to open. You can specify multiple folders and a new [Multi-root Workspace](/docs/editor/multi-root-workspaces.md) is created.

## Working with extensions

You can install extensions, disable extensions and more from the command line.

Argument|Description
------------------|-----------
`--install-extension <ext>` | Install an extension. Provide the full extension name `publisher.extension` as an argument.
`--uninstall-extension <ext>` | Uninstall an extension. Provide the full extension name `publisher.extension` as an argument.
`--disable-extensions` | Disable all installed extensions. Extensions will still be visible in the `Extensions: Show Installed Extensions` dropdown but they will never be activated.
`--list-extensions` | List the installed extensions.
`--show-versions` | Show versions of installed extensions, when using `--list-extensions`
`--enable-proposed-api <ext>` | Enables proposed api features for an extension. Provide the full extension name `publisher.extension` as an argument.

## Advanced CLI options

There are several CLI options that help with reproducing errors and advanced set-ups.

Argument|Description
------------------|-----------
`--extensions-dir <dir>` | Set the root path for extensions.
`--user-data-dir <dir>` | Specifies the directory that user data is kept in, useful when running as root.
`-p, --performance` | Start with the **Developer: Startup Performance** command enabled.
`--disable-gpu` | Disable GPU hardware acceleration.
`--verbose` | Print verbose output (implies `--wait`).
`--prof-startup` | Run CPU profiler during startup.
**Multi-root**|
`--add <dir>` | Add folder(s) to the last active window for a multi-root workspace.

## Opening VS Code with URLs

On Windows and macOS, you can also open projects and files using the platform's URL handling mechanism. Use the following URL formats to:

Open a project

```
vscode://file/FULL/PATH/TO/PROJECT/
```

Open a file

```
vscode://file/FULL/PATH/TO/FILE
```

Open a file to line and column

```
vscode://file/FULL/PATH/TO/FILE:LINE:COLUMN
```

> **Note:** You can use the URL in applications such as browsers or file explorers that can parse and redirect the URL. For example on Windows, you could pass a `vscode://` URL directly to the Windows Explorer or to the command line as `start vscode://file/FULL/PATH/TO/FILE`.

## Next Steps

Read on to find out about:

* [Basic Editing](/docs/editor/codebasics.md) - Learn the basics of the VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - VS Code lets you quickly understand and move through your source code.
