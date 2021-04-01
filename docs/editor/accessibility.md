---
Order: 17
Area: editor
TOCTitle: Accessibility
ContentId: 62894B41-CC33-400A-8A56-8C761C77B4C7
PageTitle: Accessibility in Visual Studio Code
DateApproved: 3/31/2021
MetaDescription: Visual Studio Code user accessibility features.  Learn here about the various ways VS Code aids user accessibility.
---
# Accessibility

Visual Studio Code has many features to help make the editor accessible to all users. Zoom and High Contrast colors improve editor visibility, keyboard-only navigation allows use without a mouse, and the editor has been optimized for screen readers.

## Zoom

You can adjust the Zoom level in VS Code with the **View** > **Appearance** > **Zoom** commands.  The zoom level increases or decreases by 20% each time a **Zoom** command is executed.

* **View** > **Appearance** > **Zoom In** (`kb(workbench.action.zoomIn)`) - increase the Zoom level.
* **View** > **Appearance** > **Zoom Out** (`kb(workbench.action.zoomOut)`) - decrease the Zoom level.
* **View** > **Appearance** > **Reset Zoom** (`kb(workbench.action.zoomReset)`) - reset the Zoom level to 0.

![Zoomed in editor](images/accessibility/zoomed-in.png)

### Persisted Zoom Level

When you adjust the zoom level with the **View** > **Zoom In / Out** commands, the zoom level is persisted in the `window.zoomLevel` [setting](/docs/getstarted/settings.md). The default value is 0 and each increment/decrement changes the zoom level by 20%.

## High Contrast theme

We support a High Contrast color theme on all platforms.  Use **File** > **Preferences** > **Color Theme** (`kb(workbench.action.selectTheme)`) to display the **Select Color Theme** dropdown and select the **High Contrast** theme.

![High Contrast Theme](images/accessibility/high-contrast.png)

## Keyboard navigation

You will find that VS Code provides an exhaustive list of commands in the **Command Palette** (`kb(workbench.action.showCommands)`) so that you can run VS Code without using the mouse.  Press `kb(workbench.action.showCommands)` then type a command name (for example 'git') to filter the list of commands.

VS Code also has many preset keyboard shortcuts for commands. These are displayed to the right of the command in the **Command Palette**.

![Keyboard shortcuts in Command Palette](images/accessibility/keyboard-shortcuts.png)

You can also set your own keyboard shortcuts. **File** > **Preferences** > **Keyboard Shortcuts** (`kb(workbench.action.openGlobalKeybindings)`) brings up the Keyboard Shortcuts editor where you can discover and modify keybindings for VS Code actions. See [Key Bindings](/docs/getstarted/keybindings.md) for more details on customizing or adding your own keyboard shortcuts.

For a quick navigation across the workbench, we recommend using **Focus Next Part** (`kb(workbench.action.focusNextPart)`) and **Focus Previous Part** (`kb(workbench.action.focusPreviousPart)`) commands.

### Anchor selection

To make it easier to start and end selection using the keyboard we have four commands: **Set Selection Anchor** (`kb(editor.action.setSelectionAnchor)`), **Select From Anchor to Cursor** (`kb(editor.action.selectFromAnchorToCursor)`), **Cancel Selection Anchor** (`kb(editor.action.cancelSelectionAnchor)`) and **Go to Selection Anchor**.

## Tab navigation

You can use the `kbstyle(Tab)` key to jump between VS Code UI controls. Use `kbstyle(Shift+Tab)` to tab in reverse order.  As you tab through the UI controls, you can see an indicator around the UI element once the element gains focus.

All elements in the workbench support tab navigation, but workbench toolbars and tab lists have only one tab stop, to avoid having too many. Once the focus is on a toolbar or a tab list, you can use the arrow keys to navigate within them.

## Tab trapping

By default, pressing the `kbstyle(Tab)` within a source code file inserts the Tab character (or spaces depending on your Indentation setting) and does not leave the open file. You can toggle the trapping of `kbstyle(Tab)` with `kb(editor.action.toggleTabFocusMode)` and subsequent `kbstyle(Tab)` keys will move focus out of the file.  When default `kbstyle(Tab)` trapping is off, you will see an indicator in the Status Bar.

![tab moves focus](images/accessibility/tab-moves-focus.png)

You can also toggle `kbstyle(Tab)` trapping from the **Command Palette** (`kb(workbench.action.showCommands)`) with the **Toggle Tab Key Moves Focus** action.

Read-only files never trap the `kbstyle(Tab)` key. The **Integrated Terminal** panel respects the `kbstyle(Tab)` trapping mode and can be toggled with `kb(editor.action.toggleTabFocusMode)`.

## Screen readers

VS Code supports screen readers in the editor using a strategy based on paging the text. We have tested using the [NVDA screen reader](https://www.nvaccess.org), VoiceOver on macOS and Orca on Linux.

> When using NVDA on Windows, we recommend to update to NVDA 2017.3 or higher. NVDA 2017.3 increases NVDA's timeout for receiving a caret move event from 30ms to 100ms. This version is the first one [where the built-in timeout is increased from 30ms to 100ms](https://github.com/nvaccess/nvda/pull/7201).

> For NVDA, we recommend staying in focus mode and using the hotkeys to navigate, instead of using browse mode.

The **Go to Next/Previous Error or Warning** actions (`kb(editor.action.marker.nextInFiles)` and `kb(editor.action.marker.prevInFiles)`) allow screen readers to announce the error or warning messages.

When the suggestions pop up, they will get announced to screen readers. It is possible to navigate the suggestions using `kbstyle(Ctrl+Up)` and `kbstyle(Ctrl+Down)`, you can dismiss the suggestions with `kbstyle(Shift+Escape)` and if suggestions get in your way, you can disable the auto-popup of suggestions with the `editor.quickSuggestions` setting.

The **Go to Next/Previous Difference** actions (`kb(editor.action.diffReview.next)` and `kb(editor.action.diffReview.prev)`), when in a diff editor pane, will bring up the Diff Review pane, which allows the navigation of the diffs, presented in a unified patch format. Arrow Up and Arrow Down can be used to navigate through the unchanged, inserted, or deleted lines. Pressing `kbstyle(Enter)` will return focus to the modified pane of the diff editor at the selected line number (or closest still existing line number in case a deleted line is selected). Use `kbstyle(Escape)` or `kb(Shift+Escape)` to dismiss the Diff Review pane.

## Accessibility help

You can press `kb(editor.action.showAccessibilityHelp)` to trigger the **Show Accessibility Help** dialog while in an editor to check the state of various accessibility options in VS Code:

![accessibility status](images/accessibility/status.png)

## Screen reader mode

When VS Code detects that a screen reader is being used, it goes into screen reader optimized mode for the UI such as the editor and Integrated Terminal. The Status Bar displays **Screen Reader Optimized** in the lower right and you can exit screen reader mode by clicking on the display text.

![screen reader optimized mode](images/accessibility/screen-reader-mode.png)

Certain features such as folding, minimap (code overview), and word wrap are disabled when in screen reader mode. You can control whether VS Code uses screen reader mode with the **Editor: Accessibility Support** setting (`editor.accessibilitySupport`) and the values are `on`, `off`, or the default `auto` to automatically detect a screen reader through querying the platform.

## Terminal accessibility

Output in the Integrated Terminal can be navigated through by using the "navigation mode" commands available in the Command Palette (press `kbstyle(F1)` and search for "terminal navigation mode").

### Minimum contrast ratio

The setting `terminal.integrated.minimumContrastRatio` can be set to a number between 1 and 21, this will cause the text color either increase or reduce luminance until the contrast ratio is met or pure white (`#FFFFFF`) black (`#000000`) is hit.

## Status Bar accessibility

Once a focus is in the Status bar via **Focus Next Part** (`kb(workbench.action.focusNextPart)`) arrow navigation can be used to move focus between Status bar entries.

## Debugger accessibility

The VS Code debugger UI is user accessible and has the following features:

* Changes in debug state are read out (for example 'started', 'breakpoint hit', 'terminated', ...).
* All debug actions are keyboard accessible.
* Both the Run view and Debug Console support Tab navigation.
* Debug hover is keyboard accessible (`kb(editor.action.showHover)`).
* Keyboard shortcuts can be created to set focus to each debugger area.

## Current known issues

VS Code has some known accessibility issues depending on the platform. Here's a [full list](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Aaccessibility) of VS Code accessibility issues.

### macOS

There is screen reader support for the editor with VoiceOver.

### Linux

Screen reader support for the editor is still work in progress because the accessibility implementation for Chrome on Linux is work in progress.
Thus there are a couple of things needed in order to have screen reader Orca working with VS Code:

* Make sure to use the latest version of Orca out of master. More details can be found on the [Orca page](https://gitlab.gnome.org/GNOME/orca/-/blob/master/README.md).
* We have tested that VS Code works well with Orca on Ubuntu 18, Fedora 31, Arch Linux. With Ubuntu 19, we have encountered issues.
* Make sure to have the setting `"editor.accessibilitySupport": "on"` in VS Code. You can do this using settings, or by running the **Show Accessibility Help** command and pressing `kbstyle(Ctrl+E)` to turn on accessibilitySupport.
* If Orca is still silent, try setting `ACCESSIBILITY_ENABLED=1` as an environment variable.

After enabling that setting, VS Code should work with the Orca screen reader.

## Next steps

Read on to find out about:

* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
