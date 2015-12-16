---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code 0.10.4
MetaDescription: See what is new in Visual Studio Code 0.10.4
---

# Progress Tracking
Reviewed and updated:

- [ ] Andre
- [ ] Isidor
- [x] Joe
- [ ] Alex
- [x] Ben
- [x] Joao
- [x] Dirk
- [ ] Erich
- [x] Martin
- [ ] Chris
- [ ] Sofian
- [ ] Brad

# 0.10.4 (December 2015)


Hi,

November was a big release for us (adding extensibility support and moving to Open Source) and we appreciate all the support we received leading up to and during the Connect(); event.  We've kept busy in December and we hope you like this release.

## Thanks
A big thanks for the great contributions we have received. The community has filed <<<feature requests>>>, <<<bugs>>> and submitted <<<pull requests>>>. We have addressed many of these issues and merged the pull requests.

Regarding fixes, if you want to find out when a fix to your issue is available in a VS Code update, please check the **milestone** assigned to the issue.

## Insider's Channel

There is now a setting to subscribe to the Insider's channel to get prerelease VS Code builds automatically. The value is `update.channel` and it defaults to `stable` which is the current release build.  Change the value to `insiders` and restart Code to get install prerelease builds. For more details refer to

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

## ES6 is the new default

We have made ES6 the default for JavaScript files. That means you don't need to create `jsconfig.json` files to enable new syntax and that by default you get suggestions for ES6-types, like `Promise`, `Set`, `Map`, `String.startsWith` and much more. Thanks to @felixrieseberg for this [contribution](https://github.com/Microsoft/vscode/pull/337).

At the same time the grammar used to colorize JavaScript also got updated to support the ES6 syntax. 

## Extension Debugging

We improved Extension debugging with a better way of connecting the debugger to the extension. The debugger will no longer try to reconnect to the extension when you close the window with your extension. In addition, the debugger will connect to your extension faster than before.

## Extension Issues

If VS Code identifies an issue with an installed extension, it will display an `issues` prompt on the Status Bar.  Click on the `issues` prompt to see the extension issue details and have the option to uninstall the extension.

![extension issues](images/December/extension-issues.png)

## File Picker improvements and fuzzy search

The file picker ("Quick Open") is now able to search on file paths when you include slash (Mac/Linux) or backslash (Windows) in the search term. This allows you to list all the files of a directory easily.

![Path Search in File Picker](images/December/path-search.png)

A new setting `filePicker.alternateFileNameMatching` allows to enable fuzzy searching for the file picker. Once enabled, the search term will match on the full path of the file by default, without having to include path separators in the query.
In addition, a search term will match in a more fuzzy way on the path compared to the default. A search for `fb` will match a file `foobar` because this file contains `f` and `b`. We also added a new sorter for the picker once fuzzy searching is enabled that tries to put the most relevant results to the top. We would appreciate it if people would try out this option and give us feedback so that we can tune this experience.

![Fuzzy Search in File Picker](images/December/fuzzy-search.png)

## Persisted Zoom Level

A new setting `window.zoomLevel` allows you to change and persist the zoom level of the window. The default value is 0 and each increment increases the zoom level by 20% similar to the effect of the `View` menu `Zoom in` command.  Unlike the zoom level set with the `Zoom in`, `Zoom out` commands, the `window.zoomLevel` is a persisted setting.

## window.openFileInNewWindow

The setting `window.openInNewWindow` was renamed to `window.openFilesInNewWindow` to clarify its purpose. You can still use the old setting but we ask you to update to the new name.

## Emmet

Emmet is now supported in JSX and TSX files.

## Scoped Git Services

It is now possible to open a sub-directory of a git repository in Code.
Code's git services will still work as usual, showing all changes within
the repository, but the changes outside of the scoped directory will now
be slightly faded out.

## Git Status Bar Actions

There is now a **Synchronize** action in the status bar, next to the branch
indicator, when the current checked out branch has an upstream branch configured.

![git status bar sync](images/December/git-status-bar-sync.png)

If there is no upstream branch configured and the git repository has remotes set
up, a new **Publish** action will be shown. This will let you publish the current
branch to remote.

![git status bar publish](images/December/git-status-bar-publish.png)

## TypeScript

The TypeScript language service got updated to version 1.7.5.

## Language Server

The language server protocol now supports all available language features. Please see the documentation
[here](https://code.visualstudio.com/docs/extensions/example-language-server) for details on how to implement a
language server.

## Debug Console Wraps Text

We now wrap long text in the debug console.
![debug console word wrap](images/December/debug-repl-wrap.png)

## JSON Schema Contributions

Extensions can now contribute a JSON schema associations. The `jsonValidation` contribution point takes a file pattern and the URL of the JSON schema. 
```json
    "contributes": {
        "jsonValidation": [{
            "fileMatch": ".jshintrc",
            "url": "http://json.schemastore.org/jshintrc"
        }]
```

Alternativly, extensions can also give the path to a file io the extension folder:
```json
        "jsonValidation": [{
            "fileMatch": ".htmlhintrc",
            "url": "./schemas/htmlhintrc.schema.json"
        }]
```

## Engineering

Enabled continued integration for branches and pull requests:
- [Travis CI](https://travis-ci.org/Microsoft/vscode/) - Linux and OS X
- [AppVeyor](https://ci.appveyor.com/project/VSCode/vscode) - Windows


## Notable Bug Fixes

Thanks to the great feedback from our users we have fixed [many issues](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+milestone%3A%22Dec+2015%22+is%3Aclosed) for the December milestone.

* We updated Electron to version 0.34.5.  This includes a bug fix for the issue on Linux where the editor font was showing blurry on certain high DPI displays.
* Submitted [pull request](https://github.com/atom/node-oniguruma/pull/46) to `atom/node-oniguruma` in order to [improve performance](https://github.com/Microsoft/vscode/issues/94) when colorizing long lines with multi-byte characters.
* [Proxy support for extension gallery](https://github.com/Microsoft/vscode/issues/69)
* Various fixes to the default light and dark theme. Due to the move to textmate tokenizers in the last release there were changes in the appearance of the default light and dark theme: Some themes got far more colorful, in particular JavaScript, some languages lost colors, e.g. Jade and XML. The goal was to stay as close as possible to what we had in 0.9.0: We stick to a few major colors: blue for keywords, green for comments and red for strings.

