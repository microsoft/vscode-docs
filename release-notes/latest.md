---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code v0.9.0
MetaDescription: See what is new in Visual Studio Code 0.9.0
---

# VS Code v0.9.0 (October 2015)

Hi,

It’s that time again – our October update is ready for VS Code.

## Customization - Support for themes and languages.
You can now customize VS Code by adding new color themes and syntax highlighters. If you have a TextMate color theme
(.tmTheme) or a TextMate language specification (.tmLanguage), you can bring them into VS Code using the 'code' Yeoman generator.

Install and run the code Yeoman generator as follows:
1. `npm install -g yo`
2. `npm install -g generator-code`
3. `yo code`

After starting the Yeoman generator, follow the instructions where you will be asked for the URL or file name of the .tmTheme or .tmLanguage file and other data required by VS Code.

Next copy the generated folder into the .vscode/extensions folder in your user directory and restart VS Code to use the new features.

Depending on your platform, this folder is located here:
* **Windows** `%USERPROFILE%\.vscode\extensions`
* **Mac** `$HOME/.vscode/extensions`
* **Linux** `$HOME/.vscode/extensions`

In the future you will be able to publish these extensions to an external gallery to share them with the community.

##Editor - Performance
The VS Code team contributed a [Pull Request](https://github.com/atom/node-oniguruma/pull/40#issuecomment-141905620) to [node-oniguruma](https://github.com/atom/node-oniguruma) that results in a nice performance improvement when colorizing/tokenizing. Both the Atom and VS Code IDEs profit from this improvement.

## Debugging - Performance

We improved stepping performance by loading the scopes and variables of stack frames lazily. This improvement is based on a protocol change that affects all debug adapters.

## Debugging - Pre-Launch Task
In the launch configurations (launch.json), you can now use the `preLaunchTask` attribute to specify a task that is run before a debug session is started.

For example, with this option you could make sure that your project has been built before it is launched in the debugger. If the task results in errors, an error message warns you and you can decide to either fix the errors or launch the debugger anyway.

## Debugging - Debug Console
We have made many improvements to the Debug Console:
* Text selection is now supported
* Better colors for improved visibility
* Richer context menus
* Expansion of elements is preserved between sessions

![Debug Console](images/0_9_0/debugconsole.png)

## Debugging - Node.js Debugger
In 0.9.0, we focused on fixing the problems that resulted from the introduction of a new implementation of the Node.js debugger in VS Code 0.8.0.
You should no longer see empty CALL STACK, VARIABLES and WATCH views.


## Languages - C&#35;
The status of the OmniSharp server is now using a new language status indicator in the lower right corner.

![Language Status indicator](images/0_9_0/lang-status.png)

## Languages - TypeScript
We now ship with TypeScript 1.6.2.

Defining a task to run the TypeScript compiler in watch mode has been simplified.
You can now configure the `watch`  property in the `tsconfig.json` and then define a task as follows:
```json
{
	"version": "0.1.0",
	"command": "tsc",
	"isShellCommand": true,
	// define the task to be a watching task
	"isWatching": true,
	// use the standard tsc in watch mode problem matcher to find compile problems in the output.
	"problemMatcher": "$tsc-watch"
}
```
## Files - New Settings
We added two new configuration options to control how files open and folders reopen between sessions.

The `files.openInNewWindow` setting controls if files should open in a new window instead of reusing an existing VS Code instance. By default, VS Code will
open a new window, e.g. when you double click on a file outside VS Code or open a file from the command line. Set this to `false` to reuse the last
active instance of VS Code and open files in there.

The `files.reopenFolders` setting tells VS Code how to restore the opened windows of your previous session. By default, VS Code will
reopen the last opened folder you worked on (setting: `one`). Change this setting to `none` to never reopen any folders and always start with an
empty VS Code instance. Change it to `all` to restore all folders you worked on. This will reopen all the windows with folders of your previous session.

## Notable Bug Fixes

As always we fixed many issues.

Here are a few of the notable ones from the public bug tracker:

* [18998](/Issues/Detail/18998): newly added files not honored by tsconfig.json
* [18692](/Issues/Detail/18692): Changes to tsconfig.json not updated immediately

* JSON schemas should support external references.
* The CSS tooling now supports CSS3 identifier escaping.
