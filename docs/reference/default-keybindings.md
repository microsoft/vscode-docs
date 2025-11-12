---
ContentId: 5822cc5a-0744-4cf0-9498-05767a0fc2d4
DateApproved: 10/09/2025
MetaDescription: Reference of default keyboard shortcuts in Visual Studio Code.
---
# Default keyboard shortcuts reference

VS Code comes with a set of default keyboard shortcuts. This article lists common default keyboard shortcuts in VS Code.

For a full list of keyboard shortcuts, use either of these options within VS Code:

* Select **Preferences: Open Default Keyboard Shortcuts (JSON)** in the Command Palette.
* Open the Keyboard Shortcuts editor, and then select **Show System Keybindings** in the **More Actions** (**...**) menu.

> [!NOTE]
> The following keys are rendered assuming a standard US keyboard layout. Get more information about using a different [keyboard layout](/docs/configure/keybindings.md#keyboard-layouts).

## Basic Editing

Command|Key|Command id
-------|---|----------
Cut line (empty selection)|`kb(editor.action.clipboardCutAction)`|`editor.action.clipboardCutAction`
Copy line (empty selection)|`kb(editor.action.clipboardCopyAction)`|`editor.action.clipboardCopyAction`
Paste|`kb(editor.action.clipboardPasteAction)`|`editor.action.clipboardPasteAction`
Delete Line|`kb(editor.action.deleteLines)`|`editor.action.deleteLines`
Insert Line Below|`kb(editor.action.insertLineAfter)`|`editor.action.insertLineAfter`
Insert Line Above|`kb(editor.action.insertLineBefore)`|`editor.action.insertLineBefore`
Move Line Down|`kb(editor.action.moveLinesDownAction)`|`editor.action.moveLinesDownAction`
Move Line Up|`kb(editor.action.moveLinesUpAction)`|`editor.action.moveLinesUpAction`
Copy Line Down|`kb(editor.action.copyLinesDownAction)`|`editor.action.copyLinesDownAction`
Copy Line Up|`kb(editor.action.copyLinesUpAction)`|`editor.action.copyLinesUpAction`
Undo|`kb(undo)`|`undo`
Redo|`kb(redo)`|`redo`
Add Selection To Next Find Match|`kb(editor.action.addSelectionToNextFindMatch)`|`editor.action.addSelectionToNextFindMatch`
Move Last Selection To Next Find Match|`kb(editor.action.moveSelectionToNextFindMatch)`|`editor.action.moveSelectionToNextFindMatch`
Undo last cursor operation|`kb(cursorUndo)`|`cursorUndo`
Insert cursor at end of each line selected|`kb(editor.action.insertCursorAtEndOfEachLineSelected)`|`editor.action.insertCursorAtEndOfEachLineSelected`
Select all occurrences of current selection|`kb(editor.action.selectHighlights)`|`editor.action.selectHighlights`
Select all occurrences of current word|`kb(editor.action.changeAll)`|`editor.action.changeAll`
Select current line|`kb(expandLineSelection)`|`expandLineSelection`
Insert Cursor Below|`kb(editor.action.insertCursorBelow)`|`editor.action.insertCursorBelow`
Insert Cursor Above|`kb(editor.action.insertCursorAbove)`|`editor.action.insertCursorAbove`
Jump to matching bracket|`kb(editor.action.jumpToBracket)`|`editor.action.jumpToBracket`
Indent Line|`kb(editor.action.indentLines)`|`editor.action.indentLines`
Outdent Line|`kb(editor.action.outdentLines)`|`editor.action.outdentLines`
Go to Beginning of Line|`kb(cursorHome)`|`cursorHome`
Go to End of Line|`kb(cursorEnd)`|`cursorEnd`
Go to End of File|`kb(cursorBottom)`|`cursorBottom`
Go to Beginning of File|`kb(cursorTop)`|`cursorTop`
Scroll Line Down|`kb(scrollLineDown)`|`scrollLineDown`
Scroll Line Up|`kb(scrollLineUp)`|`scrollLineUp`
Scroll Page Down|`kb(scrollPageDown)`|`scrollPageDown`
Scroll Page Up|`kb(scrollPageUp)`|`scrollPageUp`
Fold (collapse) region|`kb(editor.fold)`|`editor.fold`
Unfold (uncollapse) region|`kb(editor.unfold)`|`editor.unfold`
Toggle Fold region|`kb(editor.toggleFold)`|`editor.toggleFold`
Fold (collapse) all subregions|`kb(editor.foldRecursively)`|`editor.foldRecursively`
Unfold (uncollapse) all subregions|`kb(editor.unfoldRecursively)`|`editor.unfoldRecursively`
Fold (collapse) all regions|`kb(editor.foldAll)`|`editor.foldAll`
Unfold (uncollapse) all regions|`kb(editor.unfoldAll)`|`editor.unfoldAll`
Add Line Comment|`kb(editor.action.addCommentLine)`|`editor.action.addCommentLine`
Remove Line Comment|`kb(editor.action.removeCommentLine)`|`editor.action.removeCommentLine`
Toggle Line Comment|`kb(editor.action.commentLine)`|`editor.action.commentLine`
Toggle Block Comment|`kb(editor.action.blockComment)`|`editor.action.blockComment`
Find|`kb(actions.find)`|`actions.find`
Replace|`kb(editor.action.startFindReplaceAction)`|`editor.action.startFindReplaceAction`
Find Next|`kb(editor.action.nextMatchFindAction)`|`editor.action.nextMatchFindAction`
Find Previous|`kb(editor.action.previousMatchFindAction)`|`editor.action.previousMatchFindAction`
Select All Occurrences of Find Match|`kb(editor.action.selectAllMatches)`|`editor.action.selectAllMatches`
Toggle Find Case Sensitive|`kb(toggleFindCaseSensitive)`|`toggleFindCaseSensitive`
Toggle Find Regex|`kb(toggleFindRegex)`|`toggleFindRegex`
Toggle Find Whole Word|`kb(toggleFindWholeWord)`|`toggleFindWholeWord`
Toggle Use of Tab Key for Setting Focus|`kb(editor.action.toggleTabFocusMode)`|`editor.action.toggleTabFocusMode`
Toggle Word Wrap|`kb(editor.action.toggleWordWrap)`|`editor.action.toggleWordWrap`

## Rich Languages Editing

Command|Key|Command id
-------|---|----------
Trigger Suggest|`kb(editor.action.triggerSuggest)`|`editor.action.triggerSuggest`
Trigger Parameter Hints|`kb(editor.action.triggerParameterHints)`|`editor.action.triggerParameterHints`
Format Document|`kb(editor.action.formatDocument)`|`editor.action.formatDocument`
Format Selection|`kb(editor.action.formatSelection)`|`editor.action.formatSelection`
Go to Definition|`kb(editor.action.revealDefinition)`|`editor.action.revealDefinition`
Show Hover|`kb(editor.action.showHover)`|`editor.action.showHover`
Peek Definition|`kb(editor.action.peekDefinition)`|`editor.action.peekDefinition`
Open Definition to the Side|`kb(editor.action.revealDefinitionAside)`|`editor.action.revealDefinitionAside`
Quick Fix|`kb(editor.action.quickFix)`|`editor.action.quickFix`
Go to References|`kb(editor.action.goToReferences)`|`editor.action.goToReferences`
Rename Symbol|`kb(editor.action.rename)`|`editor.action.rename`
Replace with Next Value|`kb(editor.action.inPlaceReplace.down)`|`editor.action.inPlaceReplace.down`
Replace with Previous Value|`kb(editor.action.inPlaceReplace.up)`|`editor.action.inPlaceReplace.up`
Expand AST Selection|`kb(editor.action.smartSelect.expand)`|`editor.action.smartSelect.expand`
Shrink AST Selection|`kb(editor.action.smartSelect.shrink)`|`editor.action.smartSelect.shrink`
Trim Trailing Whitespace|`kb(editor.action.trimTrailingWhitespace)`|`editor.action.trimTrailingWhitespace`
Change Language Mode|`kb(workbench.action.editor.changeLanguageMode)`|`workbench.action.editor.changeLanguageMode`

## Navigation

Command|Key|Command id
-------|---|----------
Show All Symbols|`kb(workbench.action.showAllSymbols)`|`workbench.action.showAllSymbols`
Go to Line...|`kb(workbench.action.gotoLine)`|`workbench.action.gotoLine`
Go to File..., Quick Open|`kb(workbench.action.quickOpen)`|`workbench.action.quickOpen`
Go to Symbol...|`kb(workbench.action.gotoSymbol)`|`workbench.action.gotoSymbol`
Show Problems|`kb(workbench.actions.view.problems)`|`workbench.actions.view.problems`
Go to Next Error or Warning|`kb(editor.action.marker.nextInFiles)`|`editor.action.marker.nextInFiles`
Go to Previous Error or Warning|`kb(editor.action.marker.prevInFiles)`|`editor.action.marker.prevInFiles`
Show All Commands|`kb(workbench.action.showCommands)` or `kbstyle(F1)`|`workbench.action.showCommands`
Navigate Editor Group History|`kb(workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup)`|`workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup`
Go Back|`kb(workbench.action.navigateBack)`|`workbench.action.navigateBack`
Go back in Quick Input|`kb(workbench.action.quickInputBack)`|`workbench.action.quickInputBack`
Go Forward|`kb(workbench.action.navigateForward)`|`workbench.action.navigateForward`
Focus Breadcrumbs|`kb(breadcrumbs.focus)`|`breadcrumbs.focus`
Focus and Select Breadcrumbs|`kb(breadcrumbs.focusAndSelect)`|`breadcrumbs.focusAndSelect`

## Editor/Window Management

Command|Key|Command id
-------|---|----------
New Window|`kb(workbench.action.newWindow)`|`workbench.action.newWindow`
Close Window|`kb(workbench.action.closeWindow)`|`workbench.action.closeWindow`
Close Editor|`kb(workbench.action.closeActiveEditor)`|`workbench.action.closeActiveEditor`
Close Folder|`kb(workbench.action.closeFolder)`|`workbench.action.closeFolder`
Split Editor|`kb(workbench.action.splitEditor)`|`workbench.action.splitEditor`
Focus into First Editor Group|`kb(workbench.action.focusFirstEditorGroup)`|`workbench.action.focusFirstEditorGroup`
Focus into Second Editor Group|`kb(workbench.action.focusSecondEditorGroup)`|`workbench.action.focusSecondEditorGroup`
Focus into Third Editor Group|`kb(workbench.action.focusThirdEditorGroup)`|`workbench.action.focusThirdEditorGroup`
Focus into Editor Group on the Left|`kb(workbench.action.focusLeftGroup)`|`workbench.action.focusLeftGroup`
Focus into Editor Group on the Right|`kb(workbench.action.focusRightGroup)`|`workbench.action.focusRightGroup`
Move Editor Left |`kb(workbench.action.moveEditorLeftInGroup)`|`workbench.action.moveEditorLeftInGroup`
Move Editor Right |`kb(workbench.action.moveEditorRightInGroup)`|`workbench.action.moveEditorRightInGroup`
Move Active Editor Group Left|`kb(workbench.action.moveActiveEditorGroupLeft)`|`workbench.action.moveActiveEditorGroupLeft`
Move Active Editor Group Right|`kb(workbench.action.moveActiveEditorGroupRight)`|`workbench.action.moveActiveEditorGroupRight`
Move Editor into Next Group|`kb(workbench.action.moveEditorToNextGroup)`|`workbench.action.moveEditorToNextGroup`
Move Editor into Previous Group|`kb(workbench.action.moveEditorToPreviousGroup)`|`workbench.action.moveEditorToPreviousGroup`

## File Management

Command|Key|Command id
-------|---|----------
New File|`kb(workbench.action.files.newUntitledFile)`|`workbench.action.files.newUntitledFile`
Open File...|`kb(workbench.action.files.openFile)`|`workbench.action.files.openFile`
Save|`kb(workbench.action.files.save)`|`workbench.action.files.save`
Save All|`kb(saveAll)`|`saveAll`
Save As...|`kb(workbench.action.files.saveAs)`|`workbench.action.files.saveAs`
Close|`kb(workbench.action.closeActiveEditor)`|`workbench.action.closeActiveEditor`
Close Group|`kb(workbench.action.closeEditorsInGroup)`|`workbench.action.closeEditorsInGroup`
Close All|`kb(workbench.action.closeAllEditors)`|`workbench.action.closeAllEditors`
Reopen Closed Editor|`kb(workbench.action.reopenClosedEditor)`|`workbench.action.reopenClosedEditor`
Keep Open|`kb(workbench.action.keepEditor)`|`workbench.action.keepEditor`
Copy Path of Active File|`kb(workbench.action.files.copyPathOfActiveFile)`|`workbench.action.files.copyPathOfActiveFile`
Reveal Active File in Windows|`kb(workbench.action.files.revealActiveFileInWindows)`|`workbench.action.files.revealActiveFileInWindows`

## Display

Command|Key|Command id
-------|---|----------
Toggle Full Screen|`kb(workbench.action.toggleFullScreen)`|`workbench.action.toggleFullScreen`
Toggle Zen Mode|`kb(workbench.action.toggleZenMode)`|`workbench.action.toggleZenMode`
Leave Zen Mode|`kb(workbench.action.exitZenMode)`|`workbench.action.exitZenMode`
Zoom in|`kb(workbench.action.zoomIn)`|`workbench.action.zoomIn`
Zoom out|`kb(workbench.action.zoomOut)`|`workbench.action.zoomOut`
Reset Zoom|`kb(workbench.action.zoomReset)`|`workbench.action.zoomReset`
Toggle Sidebar Visibility|`kb(workbench.action.toggleSidebarVisibility)`|`workbench.action.toggleSidebarVisibility`
Show Explorer / Toggle Focus|`kb(workbench.view.explorer)`|`workbench.view.explorer`
Show Search|`kb(workbench.view.search)`|`workbench.view.search`
Show Source Control|`kb(workbench.view.scm)`|`workbench.view.scm`
Show Run|`kb(workbench.view.debug)`|`workbench.view.debug`
Show Extensions|`kb(workbench.view.extensions)`|`workbench.view.extensions`
Show Output|`kb(workbench.action.output.toggleOutput)`|`workbench.action.output.toggleOutput`
Quick Open View|`kb(workbench.action.quickOpenView)`|`workbench.action.quickOpenView`
Open New Command Prompt|`kb(workbench.action.terminal.openNativeConsole)`|`workbench.action.terminal.openNativeConsole`
Toggle Markdown Preview|`kb(markdown.showPreview)`|`markdown.showPreview`
Open Preview to the Side|`kb(markdown.showPreviewToSide)`|`markdown.showPreviewToSide`
Toggle Integrated Terminal|`kb(workbench.action.terminal.toggleTerminal)`|`workbench.action.terminal.toggleTerminal`

## Search

Command|Key|Command id
-------|---|----------
Show Search|`kb(workbench.view.search)`|`workbench.view.search`
Replace in Files|`kb(workbench.action.replaceInFiles)`|`workbench.action.replaceInFiles`
Toggle Match Case|`kb(toggleSearchCaseSensitive)`|`toggleSearchCaseSensitive`
Toggle Match Whole Word|`kb(toggleSearchWholeWord)`|`toggleSearchWholeWord`
Toggle Use Regular Expression|`kb(toggleSearchRegex)`|`toggleSearchRegex`
Toggle Search Details|`kb(workbench.action.search.toggleQueryDetails)`|`workbench.action.search.toggleQueryDetails`
Focus Next Search Result|`kb(search.action.focusNextSearchResult)`|`search.action.focusNextSearchResult`
Focus Previous Search Result|`kb(search.action.focusPreviousSearchResult)`|`search.action.focusPreviousSearchResult`
Show Next Search Term|`kb(history.showNext)`|`history.showNext`
Show Previous Search Term|`kb(history.showPrevious)`|`history.showPrevious`

## Search Editor

Command|Key|Command id
-------|---|----------
Open Results In Editor|`kb(search.action.openInEditor)`|`search.action.openInEditor`
Focus Search Editor Input|`kb(search.action.focusQueryEditorWidget)`|`search.action.focusQueryEditorWidget`
Search Again|`kb(rerunSearchEditorSearch)`|`rerunSearchEditorSearch`
Delete File Results|`kb(search.searchEditor.action.deleteFileResults)`|`search.searchEditor.action.deleteFileResults`

## Preferences

Command|Key|Command id
-------|---|----------
Open Settings|`kb(workbench.action.openSettings)`|`workbench.action.openSettings`
Open Keyboard Shortcuts|`kb(workbench.action.openGlobalKeybindings)`|`workbench.action.openGlobalKeybindings`
Select Color Theme|`kb(workbench.action.selectTheme)`|`workbench.action.selectTheme`

## Chat

Command|Key|Command id
-------|---|----------
Open Chat view|`kb(workbench.action.chat.open)`|`workbench.action.chat.open`
Open chat in agent mode|`kb(workbench.action.chat.openagent)`|`workbench.action.chat.openagent`
Open editor inline chat|`kb(inlineChat.start)`|`inlineChat.start`
Open terminal inline chat|`kb(workbench.action.terminal.chat.start)`|`workbench.action.terminal.chat.start`
Open quick chat|`kb(workbench.action.quickchat.toggle)`|`workbench.action.quickchat.toggle`
Open agent picker|`kb(workbench.action.chat.openModePicker)`|`workbench.action.chat.openModePicker`
Open language model picker|`kb(workbench.action.chat.openModelPicker)`|`workbench.action.chat.openModelPicker`
New chat session|`kb(workbench.action.chat.newChat)`|`workbench.action.chat.newChat`
Accept inline suggestion|`kb(editor.action.inlineSuggest.commit)`|`editor.action.inlineSuggest.commit`

## Debug

Command|Key|Command id
-------|---|----------
Toggle Breakpoint|`kb(editor.debug.action.toggleBreakpoint)`|`editor.debug.action.toggleBreakpoint`
Start|`kb(workbench.action.debug.start)`|`workbench.action.debug.start`
Continue|`kb(workbench.action.debug.continue)`|`workbench.action.debug.continue`
Start (without debugging)|`kb(workbench.action.debug.run)`|`workbench.action.debug.run`
Pause|`kb(workbench.action.debug.pause)`|`workbench.action.debug.pause`
Step Into|`kb(workbench.action.debug.stepInto)`|`workbench.action.debug.stepInto`

## Tasks

Command|Key|Command id
-------|---|----------
Run Build Task|`kb(workbench.action.tasks.build)`|`workbench.action.tasks.build`

## Related resources

* [Customize keyboard shortcuts](/docs/configure/keybindings.md)
