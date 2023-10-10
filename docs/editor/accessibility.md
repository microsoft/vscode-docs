---
Order: 22
Area: editor
TOCTitle: Accessibility
ContentId: 62894B41-CC33-400A-8A56-8C761C77B4C7
PageTitle: Accessibility in Visual Studio Code
DateApproved: 10/4/2023
MetaDescription: Visual Studio Code user accessibility features.  Learn here about the various ways VS Code aids user accessibility.
---
# Accessibility

Visual Studio Code has many features to help make the editor accessible to all users. Zoom levels and High Contrast colors improve editor visibility, keyboard-only navigation supports use without a mouse, and the editor has been optimized for screen readers.

## Zoom

You can adjust the zoom level in VS Code with the **View** > **Appearance** > **Zoom** commands.  Each **Zoom** command will increase or decrease the zoom level by 20 percent.

* **View** > **Appearance** > **Zoom In** (`kb(workbench.action.zoomIn)`) - increase the zoom level.
* **View** > **Appearance** > **Zoom Out** (`kb(workbench.action.zoomOut)`) - decrease the zoom level.
* **View** > **Appearance** > **Reset Zoom** (`kb(workbench.action.zoomReset)`) - reset the zoom level to 0.

>**Note**: If you're using a magnifier, hold down the `alt` key while viewing the hover to move the cursor over the hover.

![Zoomed in editor](images/accessibility/zoomed-in.png)

### Persistent zoom Level

When you adjust the zoom level with the **View** > **Zoom In** or  **Zoom Out** commands, the zoom level is persisted in the [`window.zoomLevel` setting](/docs/getstarted/settings.md). The default value is 0, and each increment or decrement changes the zoom level by 20 percent.

## High Contrast theme

VS Code supports a High Contrast color theme on all platforms.  Go to **File** > **Preferences** > **Theme** > **Color Theme** (`kb(workbench.action.selectTheme)`) to display the **Select Color Theme** dropdown and select the **High Contrast** theme.

![High Contrast theme](images/accessibility/high-contrast.png)

## Color vision accessibility

You can search for extensions in **Visual Studio Marketplace** that are compatible with color vision deficiency. Use the Extensions view `kb(workbench.view.extensions)` and search for "colorblind" to show relevant options.

![Visual Studio Marketplace in VS Code UI](images/accessibility/accessibility-extension-marketplace.png)

Once you've installed a color theme from the marketplace, you can [change the color theme](/docs/getstarted/themes.md) with **File** > **Preferences** > **Theme** > **Color Theme** `kb(workbench.action.selectTheme)`.

![Dropdown for Select Color Theme](images/accessibility/accessibility-select-theme.png)

### Recommended themes for color vision accessibility

* [GitHub](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) - Accessible to most forms of colorblindness and matches the themes in GitHub's settings.
* [Gotthard](https://marketplace.visualstudio.com/items?itemName=janbiasi.gotthard-theme) - Optimized for approximately 20 programming languages.
* [Blinds](https://marketplace.visualstudio.com/items?itemName=tankashing.blinds-theme) - Created for people with deuteranopia, featuring a high contrast color ratio.
* [Greative](https://marketplace.visualstudio.com/items?itemName=Greative.greative) - Considers both colorblindness and light sensitivity.
* [Pitaya Smoothie](https://marketplace.visualstudio.com/items?itemName=trallard.pitaya-smoothie) - Accessible to most forms of colorblindness and compliant with [WCAG 2.1 criteria for color contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).

## Customizing warning colors

The default color theme for VS Code is **Dark+**. However, you can customize both the theme and property colors in the user interface.

>**Note**: Go to [Customizing a Color Theme](/docs/getstarted/themes.md#customizing-a-color-theme) for more info about overriding the colors in your current theme.

To customize the error and warning squiggles, go to **File** > **Preferences** > **Settings**. Search for "color customizations" to find the **Workbench: Color Customizations** setting, and open your user `settings.json` file by selecting **Edit in settings.json**.

![JSON file settings icon](images/accessibility/accessibility-settings-json-file.png)

In your `settings.json` file, nest the following code inside the outermost curly braces. You can assign a color to each object by entering a hex code:

```json
"workbench.colorCustomizations": {
    "editorError.foreground": "#ffef0f",
    "editorWarning.foreground": "#3777ff"
}
```

In the following example, the warning color is applied when a comma is missing after a JSON item.

![JSON code to alter colors for error and warning squiggles](images/accessibility/accessibility-extension-squiggles.png)

* `editorError.foreground` - Overrides the wavy line beneath an error.
* `editorWarning.foreground` - Overrides the wavy line beneath a warning.
* `editorError.background` - Overrides the highlight color of an error.
* `editorWarning.background` - Overrides the highlight color of a warning.

Assigning a color to the background of `editorError` and `editorWarning` also helps to identify potential issues. The color that you choose will highlight the respective error or warning. The colors shown in the preceding example, `#ffef0f` (yellow) and `#37777ff` (blue), are more accessible to individuals with common forms of color vision deficiencies.

### Selecting accessible colors

The accessibility of colors is subjective to the type of anomalous trichromacy (colorblindness). The level of severity ranges per person and can be divided into four condition types:

|   Condition      |   Type    |
|       ---        |    ---    |
|   Deuteranopia   |   Reduced sensitivity to green light. It is the most common form of color blindness.
|   Protanopia     |   Reduced sensitivity to red light.
|   Tritanopia     |   Reduced sensitivity to blue light. This condition is considered rare.
|   Monochromia    |   The inability to see all colors, also referred to as *achromatopsia*. More information about the rarest form of colorblindness: [Foundation Fighting Blindness](https://www.fightingblindness.org/diseases/achromatopsia).

One of the best approaches to selecting the best colors for a specific condition is to apply complementary colors. These are colors located opposite of one another on a color wheel.

![Color wheel highlighting complementary colors for regular vision, deuteranopia, protanopia, tritanopia and monochromacy](images/accessibility/accessibility-color-wheels.png)

>**Note**: For more information on finding complementary colors, access the colorblind simulator and interactive color wheel at [Adobe Color](https://color.adobe.com/create/color-accessibility).

## Dim unfocused editors and terminals

Unfocused views can be dimmed to make it more clear where typed input will go. This is especially useful when working with multiple editor groups or terminals. Turn this feature on by setting `"accessibility.dimUnfocused.enabled": true` and configure the dimness level with `accessibility.dimUnfocused.opacity`.

## Keyboard navigation

VS Code includes an exhaustive list of commands in the **Command Palette** (`kb(workbench.action.showCommands)`) so that you can use VS Code without a mouse.  Select `kb(workbench.action.showCommands)`, then type a command name (for example, "git") to filter the list of commands.

VS Code also has many preset keyboard shortcuts for commands.

![Key bindings for commands are displayed at the end of the command palette entry](images/accessibility/keyboard-shortcuts.png)

You can also set your own keyboard shortcuts. **File** > **Preferences** > **Keyboard Shortcuts** (`kb(workbench.action.openGlobalKeybindings)`) opens the keyboard shortcuts editor, where you can discover and modify key bindings for VS Code actions. For more details on customizing or adding your own keyboard shortcuts, go to [Key Bindings for Visual Studio Code](/docs/getstarted/keybindings.md).

For quick navigation across the workbench, we recommend using **Focus Next Part** (`kb(workbench.action.focusNextPart)`) and **Focus Previous Part** (`kb(workbench.action.focusPreviousPart)`) commands.

### Anchor selection

To make it easier to start and end selections with the keyboard, there are four commands: **Set Selection Anchor** (`kb(editor.action.setSelectionAnchor)`), **Select From Anchor to Cursor** (`kb(editor.action.selectFromAnchorToCursor)`), **Cancel Selection Anchor** (`kb(editor.action.cancelSelectionAnchor)`) and **Go to Selection Anchor**.

## Tab navigation

You can use the `kbstyle(Tab)` key to navigate between UI controls in VS Code. Use `kbstyle(Shift+Tab)` to tab in reverse order.  As you tab through UI controls, an indicator will appear around each UI element when it has focus.

All elements in the workbench support tab navigation. To avoid having too many tab stops, workbench toolbars and tab lists each have only one. Once a toolbar or a tab list has focus, use the arrow keys to navigate within them.

> **Note**: Tab navigation goes in the visually natural order, with the exception of WebViews (like Markdown preview). For WebViews, we recommend using the `kb(workbench.action.focusNextPart)` and `kb(workbench.action.focusPreviousPart)` commands to navigate between the WebViews and the rest of the workbench. Alternatively, you can use one of many Focus Editor commands.

## Tab trapping

By default, pressing `kbstyle(Tab)` within a source code file inserts the Tab character (or spaces depending on your indentation setting) and does not leave the open file. You can turn on `kbstyle(Tab)` trapping with `kb(editor.action.toggleTabFocusMode)`, and subsequent `kbstyle(Tab)` keys will move focus out of the file.  An indicator in the status bar will show when the default `kbstyle(Tab)` trapping is off.

Tab trapping also exists in the integrated terminal. The default behavior for each feature can be configured with `editor.tabFocusMode` and `terminal.integrated.tabFocusMode`.

![Status bar item indication that pressing Tab moves focus](images/accessibility/tab-moves-focus.png)

You can also turn `kbstyle(Tab)` trapping on or off from the **Command Palette** (`kb(workbench.action.showCommands)`) with the **Toggle Tab Key Moves Focus** action.

Read-only files never trap the `kbstyle(Tab)` key. The **Integrated Terminal** panel respects the `kbstyle(Tab)` trapping mode and can be switched with `kb(editor.action.toggleTabFocusMode)`.

## Screen readers

VS Code supports screen readers in the editor using a strategy based on text pagination. The following screen readers have been tested:

* Windows: [NVDA](https://www.nvaccess.org) and [JAWS](https://www.freedomscientific.com/products/software/jaws/)
* macOS: [VoiceOver](https://support.apple.com/guide/voiceover/welcome/mac)
* Linux: [Orca](https://help.gnome.org/users/orca/stable/introduction.html.en)

> For NVDA, we recommend that you stay in focus mode and use the hotkeys to navigate, instead of using browse mode.

Screen readers use **Go to Next/Previous Error or Warning** actions (`kb(editor.action.marker.nextInFiles)` and `kb(editor.action.marker.prevInFiles)`) to announce error and warning messages.

When the suggestions pop up, they will get announced to screen readers. Navigate the suggestions using `kbstyle(Ctrl+Up)` and `kbstyle(Ctrl+Down)` and dismiss them with `kbstyle(Shift+Escape)`. If the suggestions get in your way, you can turn them off with the `editor.quickSuggestions` setting.

In a diff editor pane, the **Go to Next/Previous Difference** actions (`kb(editor.action.accessibleDiffViewer.next)` and `kb(editor.action.accessibleDiffViewer.prev)`) will show the Accessible Diff Viewer, presented in a unified patch format. Navigate through the unchanged, inserted, or deleted lines with `kbstyle(Up)` and `kbstyle(Down)`. Press `kbstyle(Enter)` to return focus to the modified pane of the diff editor at the selected line number (or the closest line number that still exists, if a deleted line is selected). Use `kbstyle(Escape)` or `kbstyle(Shift+Escape)` to dismiss the Accessible Diff Viewer.

## Accessibility help

The command **Open Accessibility Help** `kb(editor.action.accessibilityHelp)` opens a help menu based on the current context. It currently applies to the editor, terminal, notebook, chat panel, and inline chat features.

You can dismiss any open accessibility help menus or additional help documentation from within the help menu.

![Help dialog explains how to turn on screen reader mode, tab focus mode, and other details](images/accessibility/status.png)

## Accessible view

Run the command **Open Accessible View** `kb(editor.action.accessibleView)` to display an accessible view to inspect content character by character and line by line. The accessible view is currently available for hovers, notifications, Jupyter notebook output, and chat responses.

## Screen reader mode

When VS Code detects that a screen reader is being used, it goes into an optimized screen reader mode for UI including the editor and integrated terminal. The status bar will display **Screen Reader Optimized** in the lower right. You can exit screen reader mode by clicking on the display text or using the **Toggle Screen Reader Accessibility Mode** command.

![Clicking the Screen Reader Optimized status bar indicator will turn the mode off](images/accessibility/screen-reader-mode.png)

Some features, including folding and minimap (code overview), are turned off in screen reader mode. You can control how VS Code uses screen reader mode by setting **Editor: Accessibility Support** (`editor.accessibilitySupport`) to `on`, `off`, or `auto`. The default, `auto`, will automatically detect a screen reader.

## Input control and result navigation

Use (`kb(widgetNavigation.focusNext)`) and (`kb(widgetNavigation.focusPrevious)`) for consistent navigation between an input control and its results (for example, search and filter UI). This shortcut works in the extensions view, the keyboard shortcuts editor, and the panels for comments, problems, and the debug console.

## Terminal accessibility

For useful tips when using a screen reader, get terminal accessibility help via `kb(editor.action.accessibilityHelp)`. One tip is to use `kb(workbench.action.terminal.focusAccessibleBuffer)` to access the buffer in the terminal. This will automatically enter the browse mode, depending on your screen reader, for an accessible view of the entire terminal buffer.

Use `terminal.integrated.tabFocusMode` to control whether the terminal receives the `kbstyle(Tab)` key instead of the workbench, similar to the `editor.tabFocusMode` counterpart for the editor.

### Shell integration

The terminal has a [shell integration feature](/docs/terminal/shell-integration.md) that includes many additional features that are not found in other terminals. When using a screen reader, the [Run Recent Command](/docs/terminal/shell-integration.md#run-recent-command) and [Go to Recent Directory](/docs/terminal/shell-integration.md#go-to-recent-directory) features are particularly useful.

Another shell integration command, **Terminal: Navigate Accessible Buffer** (`kb(workbench.action.terminal.navigateAccessibleBuffer)`), navigates between terminal commands similar to navigation inside the editor with **Go to Symbol in Editor...**.

### Minimum contrast ratio

Set `terminal.integrated.minimumContrastRatio` to a number between 1 and 21 to adjust text color luminance to the desired contrast ratio, pure white (`#FFFFFF`), or pure black (`#000000`).

>**Note:** The `terminal.integrated.minimumContrastRatio` setting will not apply to `powerline` characters.

## Status bar accessibility

Once focus is in the status bar via **Focus Next Part** (`kb(workbench.action.focusNextPart)`), use arrow navigation to move focus between status bar entries.

### Diff editor accessibility

There is an Accessible Diff Viewer in the diff editor that presents changes in a unified patch format. You can navigate between changes with **Go to Next Difference** (`kb(editor.action.accessibleDiffViewer.next)`) and **Go to Previous Difference** (`kb(editor.action.accessibleDiffViewer.prev)`). Navigate lines with the arrow keys and press `kbstyle(Enter)` to jump back in the diff editor and the selected line.

## Debugger accessibility

The user-accessible VS Code debugger UI includes the following features:

* Debug state changes are read out (for example, "started," "breakpoint hit," and "terminated").
* All debug actions are keyboard-accessible.
* Both the **Run and Debug** view and debug console support Tab navigation.
* Debug hover is keyboard-accessible (`kb(editor.action.showHover)`).
* Keyboard shortcuts can be created to set focus to each debugger area.

## Audio cues

Audio cues indicate if the current line has certain markers that include: errors, warnings, breakpoints, folded text regions, or inline suggestions.

They are played when the primary cursor changes its line or the first time a marker is added to the current line. Audio cues are automatically turned on when a screen reader is attached, but can also be controlled by the settings `audioCues.*`.

The command **Help: List Audio Cues** lists all available audio cues, previews each audio cue as you move through the list, and reviews which cues are currently turned on.

## Hover accessibility

Some hovers cannot be hovered normally, which makes them hard to use with screen magnifiers. To work around this, hold the `kbstyle(Alt)` or `kbstyle(Option)` key while a hover is active to "lock" it in place so that it won't hide when hovered. Release the key to unlock the hover.

## Current known issues

VS Code has some known accessibility issues, depending on the platform. For the full list, go to [VS Code accessibility issues](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Aaccessibility).

### macOS

The editor includes screen reader support for VoiceOver.

### Linux

VS Code works well with the Orca screen reader. If Orca in your Linux distribution does not read the editor content:

* Check the `"editor.accessibilitySupport": "on"` setting in VS Code. You can do this in the **Settings** menu or by running the **Show Accessibility Help** command and pressing `kbstyle(Ctrl+E)` to turn accessibility support on.
* If Orca is still silent, try setting `ACCESSIBILITY_ENABLED=1` as an environment variable.

After turning that setting on, VS Code should work with the Orca screen reader.

## Next steps

* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
