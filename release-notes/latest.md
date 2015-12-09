---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code 0.10.4
MetaDescription: See what is new in Visual Studio Code 0.10.4
---

# 0.10.4 (December 2015)

Hi,

## Insider's Channel 

There is now a setting to subscribe to the Insider's channel to get prerelease VS Code builds automatically.

## Editor

 * Find/Replace improvements when in regex mode:
  * Can now search for `^`, `$` or `^$` due to [community contribution](https://github.com/Microsoft/vscode/pull/314)
  * Can now replace with `\n` or `\t`
 * New option to configure cursor blinking: `"editor.cursorBlinking"` with values `"blink"`, `"visible"` and `"hidden"` due to [community contribution](https://github.com/Microsoft/vscode/pull/500).
 * New select current line command (`Ctrl/Cmd+I`) due to [community contribution](https://github.com/Microsoft/vscode/pull/961)

## Keybindings
 * Added a new widget that helps input the keybinding rule when editing `keybindings.json`. This is especially helpful when using a non-US standard keyboard layout:
![image](https://cloud.githubusercontent.com/assets/5047891/11427563/0d1e4fd2-9464-11e5-8f68-6b7d885c5198.png)

 * Created a new node module [`native-keymap`](https://www.npmjs.com/package/native-keymap) that is used in VSCode to render the keybindings with the actual user keyboard layout:
  * e.g. `Split Editor` when using a French (France) keyboard layout is now rendered as `Ctrl+*`:
  ![image](https://cloud.githubusercontent.com/assets/5047891/11594888/cba8ed42-9aac-11e5-8527-5510a37ac547.png)

## Notable Bug Fixes

As always we fixed many issues.

Here are a few of the notable ones:

 * Submitted PR to `atom/node-oniguruma` in order to improve performance when colorizing long lines with multi-byte characters
  * https://github.com/Microsoft/vscode/issues/94
  * https://github.com/atom/node-oniguruma/pull/46
