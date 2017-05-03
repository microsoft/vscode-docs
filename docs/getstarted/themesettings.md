---
Order: 5
Area: getstarted
TOCTitle: Settings
ContentId: FDA6D86C-FF24-49BC-A1EB-E3BA43130FA0
PageTitle: Visual Studio Code User and Workspace Settings
DateApproved: 4/5/2017
MetaDescription: How to modify Visual Studio Code User and Workspace Settings.
---
# Themable Colors

## Contrast Colors

- `contrastActiveBorder`: An extra border around active elements to separate them from others for greater contrast.
- `contrastBorder`: An extra border around elements to separate them from others for greater contrast.

The contrast colors are typically only set be high contrast themes. If set they add an additional border around items across the UI to increase the contrast.

## Base Colors

- `focusBorder`: Overall border color for focused elements. This color is only used if not overridden by a component.
- `foreground`: Overall foreground color. This color is only used if not overridden by a component.

## Button colors

- `button.background`: Button background color.
- `button.foreground`: Button foreground color.
- `button.hoverBackground`: Button background color when hovering.

A set of colors for button widgets such as `Open Folder` button in the explorer of a new window

![button widget](./images/themes/button.png)

## Dropdown colors

- `dropdown.background`: Dropdown background.
- `dropdown.border`: Dropdown border.
- `dropdown.foreground`: Dropdown foreground.

A set of colors for all dropdown widgets such as in the terminal or the output panel.

![drop down widget](./images/themes/dropdown.png)

## Activity Bar

- `activityBar.background`: Activity bar background color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.
- `activityBar.dropBackground`: Drag and drop feedback color for the activity bar items. The activity bar is showing on the far left or right and allows to switch between views of the side bar.
- `activityBar.foreground`: Activity bar foreground color (e.g. used for the icons). The activity bar is showing on the far left or right and allows to switch between views of the side bar.
- `activityBarBadge.background`: Activity notification badge background color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.
- `activityBarBadge.foreground`: Activity notification badge foreground color. The activity bar is showing on the far left or right and allows to switch between views of the side bar.

The activity bar is showing either on the far left or right.



- `debugExceptionWidget.background`: Exception widget background color.
- `debugExceptionWidget.border`: Exception widget border color.
- `debugToolBar.background`: Debug toolbar background color.
- `diffEditor.insertedTextBackground`: Background color for text that got inserted.
- `diffEditor.insertedTextBorder`: Outline color for the text that got inserted.
- `diffEditor.removedTextBackground`: Background color for text that got removed.
- `diffEditor.removedTextBorder`: Outline color for text that got removed.

- `editor.background`: Editor background color.
- `editor.findMatchBackground`: Color of the current search match.
- `editor.findMatchHighlightBackground`: Color of the other search matches.
- `editor.findRangeHighlightBackground`: Color the range limiting the search.
- `editor.foreground`: Editor default foreground color.
- `editor.hoverHighlightBackground`: Highlight below the word for which a hover is shown.
- `editor.inactiveSelectionBackground`: Color of the selection in an inactive editor.
- `editor.lineHighlightBackground`: Background color for the highlight of line at the cursor position.
- `editor.lineHighlightBorder`: Background color for the border around the line at the cursor position.
- `editor.rangeHighlightBackground`: Background color of highlighted ranges, like by quick open and find features.
- `editor.selectionBackground`: Color of the editor selection.
- `editor.selectionHighlightBackground`: Color for regions with the same content as the selection.
- `editor.wordHighlightBackground`: Background color of a symbol during read-access, like reading a variable.
- `editor.wordHighlightStrongBackground`: Background color of a symbol during write-access, like writing to a variable.
- `editorCursor.foreground`: Color of the editor cursor.
- `editorGroup.background`: Background color of an editor group. Editor groups are the containers of editors. The background color shows up when dragging editor groups around.
- `editorGroup.border`: Color to separate multiple editor groups from each other. Editor groups are the containers of editors.
- `editorGroup.dropBackground`: Background color when dragging editors around.
- `editorGroupHeader.noTabsBackground`: Background color of the editor group title header when tabs are disabled. Editor groups are the containers of editors.
- `editorGroupHeader.tabsBackground`: Background color of the tabs container. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `editorHoverWidget.background`: Background color of the editor hover.
- `editorHoverWidget.border`: Border color of the editor hover.
- `editorIndentGuide.background`: Color of the editor indentation guides.
- `editorLineNumber.foreground`: Color of editor line numbers.
- `editorLink.activeForeground`: Color of active links.
- `editorMarkerNavigation.background`: Editor marker navigation widget background.
- `editorMarkerNavigationError.background`: Editor marker navigation widget error color.
- `editorMarkerNavigationWarning.background`: Editor marker navigation widget warning color.
- `editorSuggestWidget.background`: Background color of the suggest widget.
- `editorSuggestWidget.border`: Border color of the suggest widget.
- `editorSuggestWidget.foreground`: Foreground color of the suggest widget.
- `editorSuggestWidget.highlightForeground`: Color of the match highlights in the suggest widget.
- `editorSuggestWidget.selectedBackground`: Background color of the selected entry in the suggest widget.
- `editorWhitespace.foreground`: Color of whitespace characters in the editor.
- `editorWidget.background`: Background color of editor widgets, such as find/replace.
- `input.background`: Input box background.
- `input.border`: Input box border.
- `input.foreground`: Input box foreground.
- `inputOption.activeBorder`: Border color of activated options in input fields.
- `inputValidation.errorBackground`: Input validation background color for error severity.
- `inputValidation.errorBorder`: Input validation border color for error severity.
- `inputValidation.infoBackground`: Input validation background color for information severity.
- `inputValidation.infoBorder`: Input validation border color for information severity.
- `inputValidation.warningBackground`: Input validation background color for information warning.
- `inputValidation.warningBorder`: Input validation border color for warning severity.
- `list.activeSelectionBackground`: List/Tree background color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
- `list.activeSelectionForeground`: List/Tree foreground color for the selected item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
- `list.dropBackground`: List/Tree drag and drop background when moving items around using the mouse.
- `list.focusBackground`: List/Tree background color for the focused item when the list/tree is active. An active list/tree has keyboard focus, an inactive does not.
- `list.highlightForeground`: List/Tree foreground color of the match highlights when searching inside the list/tree.
- `list.hoverBackground`: List/Tree background when hovering over items using the mouse.
- `list.inactiveSelectionBackground`: List/Tree background color for the selected item when the list/tree is inactive. An active list/tree has keyboard focus, an inactive does not.
- `notification.background`: Notifications background color. Notifications slide in from the top of the window.
- `notification.foreground`: Notifications foreground color. Notifications slide in from the top of the window.
- `panel.background`: Panel background color. Panels are shown below the editor area and contain views like output and integrated terminal.
- `panel.border`: Panel border color on the top separating to the editor. Panels are shown below the editor area and contain views like output and integrated terminal.
- `panelTitle.activeBorder`: Border color for the active panel title. Panels are shown below the editor area and contain views like output and integrated terminal.
- `panelTitle.activeForeground`: Title color for the active panel. Panels are shown below the editor area and contain views like output and integrated terminal.
- `panelTitle.inactiveForeground`: Title color for the inactive panel. Panels are shown below the editor area and contain views like output and integrated terminal.
- `peekView.border`: Color of the peek view borders and arrow.
- `peekViewEditor.background`: Background color of the peek view editor.
- `peekViewEditor.matchHighlightBackground`: Match highlight color in the peek view editor.
- `peekViewResult.background`: Background color of the peek view result list.
- `peekViewResult.fileForeground`: Foreground color for file nodes in the peek view result list.
- `peekViewResult.lineForeground`: Foreground color for line nodes in the peek view result list.
- `peekViewResult.matchHighlightBackground`: Match highlight color in the peek view result list.
- `peekViewResult.selectionBackground`: Background color of the selected entry in the peek view result list.
- `peekViewResult.selectionForeground`: Foreground color of the selected entry in the peek view result list.
- `peekViewTitle.background`: Background color of the peek view title area.
- `peekViewTitleDescription.foreground`: Color of the peek view title info.
- `peekViewTitleLabel.foreground`: Color of the peek view title.
- `pickerGroup.border`: Quick picker color for grouping borders.
- `pickerGroup.foreground`: Quick picker color for grouping labels.
- `scrollbar.shadow`: Scrollbar shadow to indicate that the view is scrolled.
- `scrollbarSlider.activeBackground`: Slider background color when active.
- `scrollbarSlider.background`: Slider background color.
- `scrollbarSlider.hoverBackground`: Slider background color when hovering.
- `sideBar.background`: Side bar background color. The side bar is the container for views like explorer and search.
- `sideBarSectionHeader.background`: Side bar section header background color. The side bar is the container for views like explorer and search.
- `sideBarTitle.foreground`: Side bar title foreground color. The side bar is the container for views like explorer and search.
- `statusBar.background`: Standard status bar background color. The status bar is shown in the bottom of the window.
- `statusBar.debuggingBackground`: Status bar background color when a program is being debugged. The status bar is shown in the bottom of the window
- `statusBar.foreground`: Status bar foreground color. The status bar is shown in the bottom of the window.
- `statusBar.noFolderBackground`: Status bar background color when no folder is opened. The status bar is shown in the bottom of the window.
- `statusBarItem.activeBackground`: Status bar item background color when clicking. The status bar is shown in the bottom of the window.
- `statusBarItem.hoverBackground`: Status bar item background color when hovering. The status bar is shown in the bottom of the window.
- `statusBarItem.prominentBackground`: Status bar prominent items background color. Prominent items stand out from other status bar entries to indicate importance. The status bar is shown in the bottom of the window.
- `statusBarItem.prominentHoverBackground`: Status bar prominent items background color when hovering. Prominent items stand out from other status bar entries to indicate importance. The status bar is shown in the bottom of the window.
- `tab.activeBackground`: Active tab background color. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `tab.activeForeground`: Active tab foreground color in an active group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `tab.border`: Border to separate tabs from each other. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `tab.inactiveBackground`: Inactive tab background color. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `tab.inactiveForeground`: Inactive tab foreground color in an active group. Tabs are the containers for editors in the editor area. Multiple tabs can be opened in one editor group. There can be multiple editor groups.
- `terminal.ansiBlack`: 'Black' ansi color in the terminal.
- `terminal.ansiBlue`: 'Blue' ansi color in the terminal.
- `terminal.ansiBrightBlack`: 'BrightBlack' ansi color in the terminal.
- `terminal.ansiBrightBlue`: 'BrightBlue' ansi color in the terminal.
- `terminal.ansiBrightCyan`: 'BrightCyan' ansi color in the terminal.
- `terminal.ansiBrightGreen`: 'BrightGreen' ansi color in the terminal.
- `terminal.ansiBrightMagenta`: 'BrightMagenta' ansi color in the terminal.
- `terminal.ansiBrightRed`: 'BrightRed' ansi color in the terminal.
- `terminal.ansiBrightWhite`: 'BrightWhite' ansi color in the terminal.
- `terminal.ansiBrightYellow`: 'BrightYellow' ansi color in the terminal.
- `terminal.ansiCyan`: 'Cyan' ansi color in the terminal.
- `terminal.ansiGreen`: 'Green' ansi color in the terminal.
- `terminal.ansiMagenta`: 'Magenta' ansi color in the terminal.
- `terminal.ansiRed`: 'Red' ansi color in the terminal.
- `terminal.ansiWhite`: 'White' ansi color in the terminal.
- `terminal.ansiYellow`: 'Yellow' ansi color in the terminal.
- `titleBar.activeBackground`: Title bar background when the window is active. Note that this color is currently only supported on macOS.
- `titleBar.activeForeground`: Title bar foreground when the window is active. Note that this color is currently only supported on macOS.
- `titleBar.inactiveBackground`: Title bar background when the window is inactive. Note that this color is currently only supported on macOS.
- `titleBar.inactiveForeground`: Title bar foreground when the window is inactive. Note that this color is currently only supported on macOS.
- `widget.shadow`: Shadow color of widgets such as find/replace inside the editor.
