---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code 0.10.4
MetaDescription: See what is new in Visual Studio Code 0.10.4
---

# 0.10.4 (December 2015)

Hi,

November was a big release for us (adding extensibility support and moving to Open Source) and we appreciate all the support we received leading up to and during the Connect(); event.  We've kept busy in December and we hope you like this release.

## Insider's Channel

There is now a setting to subscribe to the Insider's channel to get prerelease VS Code builds automatically. The value is `update.channel` and it defaults to `stable` which is the current release build.  Change the value to `insiders` to get install prerelease builds.

## Editor - Find/Replace improvements

Find/Replace improvements when in regex mode:

* Can now search for `^`, `$` or `^$` due to [community contribution](https://github.com/Microsoft/vscode/pull/314).
* Can now replace with `\n` or `\t`.

## Editor - Cursor Blinking Options

New option to configure cursor blinking: `editor.cursorBlinking` with values `blink`, `visible` and `hidden` due to [community contribution](https://github.com/Microsoft/vscode/pull/500).

## Editor - Current Line Command

New select current line command (`kb(expandLineSelection)`) from a [community contribution](https://github.com/Microsoft/vscode/pull/961).

## Key Bindings

We added a new widget that helps input the key binding rule when editing `keybindings.json`. To launch the **Define Keybinding** widget, press `kb(editor.action.defineKeybinding)`.

The widget is especially helpful when using a non-US standard keyboard layout:

![key binding widget](images/December/key-binding-widget.png)

We also created a new node module [`native-keymap`](https://www.npmjs.com/package/native-keymap) that is used in VS Code to render the key bindings with the actual user keyboard layout.

For example, `Split Editor` when using a French (France) keyboard layout is now rendered as `Ctrl+*`:

![render key binding](images/December/render-key-binding.png)

## Extension Debugging

We improved Extension debugging with a better way of connecting the debugger to the extension. The debugger will no longer try to reconnect to the extension when you close the window with your extension. In addition, the debugger will connect to your extension faster than before.

## File Picker improvements and fuzzy search

The file picker ("Quick Open") is now able to search on file paths when you include slash (Mac/Linux) or backslash (Windows) in the search term. This allows you to list all the files of a directory easily.

![Path Search in File Picker](images/December/path-search.png)

A new setting `search.fuzzyFilePicker` allows to enable fuzzy searching for the file picker. Once enabled, the search term will match on the full path of the file by default, without having to include path separators in the query.
In addition, a search term will match in a more fuzzy way on the path compared to the default. A search for `fb` will match a file `foobar` because this file contains `f` and `b`. We also added a new sorter for the picker once fuzzy searching is enabled that tries to put the most relevant results to the top. We would appreciate it if people would try out this option and give us feedback so that we can tune this experience.

## Persisted Zoom Level

A new setting `window.zoomLevel` allows you to change and persist the zoom level of the window. The default value is 0 and each increment increases the zoom level by 20% similar to the effect of the `View` menu `Zoom in` command.  Unlike the zoom level set with the `Zoom in`, `Zoom out` commands, the `window.zoomLevel` is a persisted setting.

## window.openFileInNewWindow

The setting `window.openInNewWindow` was renamed to `window.openFilesInNewWindow` to clarify its purpose. You can still use the old setting but we ask you to update to the new name.

## Emmet

Emmet is now supported in JSX and TSX files.

## Notable Bug Fixes

Thanks to the great feedback from our users we have fixed [many issues](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22Dec+2015%22+is%3Aclosed) for the December milestone. 

* We updated Electron to version 0.34.5.  This includes a bug fix for the issue on Linux where the editor font was showing blurry on certain high DPI displays.
* Submitted [pull request](https://github.com/atom/node-oniguruma/pull/46) to `atom/node-oniguruma` in order to [improve performance](https://github.com/Microsoft/vscode/issues/94) when colorizing long lines with multi-byte characters.
 
