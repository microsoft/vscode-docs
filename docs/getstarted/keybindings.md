---
Order: 7
Area: getstarted
TOCTitle: Key Bindings
ContentId: 045980C1-62C7-4E8E-8CE4-BAD722FFE31E
PageTitle: Visual Studio Code Key Bindings
DateApproved: 08/01/2024
MetaDescription: Here you will find the complete list of key bindings for Visual Studio Code and how to change them.
MetaSocialImage: images/keybinding/customization-keybindings-social.png
---
# Key Bindings for Visual Studio Code

Visual Studio Code lets you perform most tasks directly from the keyboard. This page lists out the default bindings (keyboard shortcuts) and describes how you can update them.

>**Note:** If you visit this page on a Mac, you will see the key bindings for the Mac.  If you visit using Windows or Linux, you will see the keys for that platform. If you need the key bindings for another platform, hover your mouse over the key you are interested in.

## Keyboard Shortcuts editor

VS Code provides a rich keyboard shortcut editing experience with the Keyboard Shortcuts editor. The editor lists all available commands with and without keybindings, and enables you to change / remove / reset their keybindings using the available actions. You can use the search box to find commands or keybindings. You can open this editor by going to the menu under **File** > **Preferences** > **Keyboard Shortcuts** or by using the **Preferences: Open Keyboard Shortcuts** command (`kb(workbench.action.openGlobalKeybindings)`).

![Keyboard Shortcuts](images/keybinding/keyboard-shortcuts.gif)

Most importantly, you can see keybindings according to your keyboard layout. For example, key binding `kbstyle(Cmd+\)` in US keyboard layout will be shown as `kbstyle(Ctrl+Shift+Alt+Cmd+7)` when layout is changed to German. The dialog to enter key binding will assign the correct and desired key binding as per your keyboard layout.

For doing more advanced keyboard shortcut customization, read [Advanced Customization](/docs/getstarted/keybindings.md#advanced-customization).

## Customize shortcuts for UI actions

You can quickly customize the keybinding for user interface actions. Right-click on any action item in your workbench, and select **Customize Keybinding**. If the action has a `when` clause, it's automatically included, making it easier to set up your keybindings just the way you need them.

<video src="images/keybinding/customize-keybinding.mp4" title="Video that shows how to customize the keybinding for the split editor action." autoplay loop controls muted></video>

## Keymap extensions

Keyboard shortcuts are vital to productivity and changing keyboarding habits can be tough. To help with this, **File** > **Preferences** > **Migrate Keyboard Shortcuts from...** shows you a list of popular keymap extensions. These extensions modify the VS Code shortcuts to match those of other editors so you don't need to learn new keyboard shortcuts. There is also a [Keymaps category](https://marketplace.visualstudio.com/search?target=VSCode&category=Keymaps&sortBy=Installs) of extensions in the Marketplace.

<div class="marketplace-extensions-curated-keymaps"></div>

> Tip: Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com/vscode).

## Keyboard Shortcuts Reference

We also have a printable version of these keyboard shortcuts. **Help** > **Keyboard Shortcut Reference** displays a condensed PDF version suitable for printing as an easy reference.

Below are links to the three platform-specific versions (US English keyboard):

* [Windows](https://go.microsoft.com/fwlink/?linkid=832145)
* [macOS](https://go.microsoft.com/fwlink/?linkid=832143)
* [Linux](https://go.microsoft.com/fwlink/?linkid=832144)

## Detecting keybinding conflicts

If you have many extensions installed or you have [customized](/docs/getstarted/keybindings.md#advanced-customization) your keyboard shortcuts, you can sometimes have keybinding conflicts where the same keyboard shortcut is mapped to several commands. This can result in confusing behavior, especially if different keybindings are going in and out of scope as you move around the editor.

The **Keyboard Shortcuts** editor has a context menu command **Show Same Keybindings**, which will filter the keybindings based on a keyboard shortcut to display conflicts.

![show keybinding conflicts menu](images/keybinding/show-conflicts-menu.png)

Pick a command with the keybinding you think is overloaded and you can see if multiple commands are defined, the source of the keybindings and when they are active.

![show keybinding conflicts result](images/keybinding/show-conflicts-result.png)

## Troubleshooting keybindings

To troubleshoot keybindings problems, you can execute the command **Developer: Toggle Keyboard Shortcuts Troubleshooting**. This will activate logging of dispatched keyboard shortcuts and will open an output panel with the corresponding log file.

You can then press your desired keybinding and check what keyboard shortcut VS Code detects and what command is invoked.

For example, when pressing `cmd+/` in a code editor on macOS, the logging output would be:

```
[KeybindingService]: / Received  keydown event - modifiers: [meta], code: MetaLeft, keyCode: 91, key: Meta
[KeybindingService]: | Converted keydown event - modifiers: [meta], code: MetaLeft, keyCode: 57 ('Meta')
[KeybindingService]: \ Keyboard event cannot be dispatched.
[KeybindingService]: / Received  keydown event - modifiers: [meta], code: Slash, keyCode: 191, key: /
[KeybindingService]: | Converted keydown event - modifiers: [meta], code: Slash, keyCode: 85 ('/')
[KeybindingService]: | Resolving meta+[Slash]
[KeybindingService]: \ From 2 keybinding entries, matched editor.action.commentLine, when: editorTextFocus && !editorReadonly, source: built-in.
```

The first keydown event is for the `MetaLeft` key (`cmd`) and cannot be dispatched. The second keydown event is for the `Slash` key (`/`) and is dispatched as `meta+[Slash]`. There were two keybinding entries mapped from `meta+[Slash]` and the one that matched was for the command `editor.action.commentLine`, which has the `when` condition `editorTextFocus && !editorReadonly` and is a built-in keybinding entry.

## Viewing modified keybindings

You can view any user modified keyboard shortcuts in VS Code in the **Keyboard Shortcuts** editor with the **Show User Keybindings** command in the **More Actions** (**...**) menu. This applies the `@source:user` filter to the **Keyboard Shortcuts** editor (**Source** is 'User').

![Default Keyboard Shortcuts](images/keybinding/user-keyboard-shortcuts.png)

## Advanced customization

All keyboard shortcuts in VS Code can be customized via the `keybindings.json` file, where you can overwrite the [Default Keyboard Shortcuts](/docs/getstarted/keybindings.md#default-keyboard-shortcuts).

To open the `keybindings.json` file:

* Open **Keyboard Shortcuts** editor, and then select the **Open Keyboard Shortcuts (JSON)** button on the right of the editor title bar.

  ![Open Keyboard Shortcuts JSON button](images/keybinding/open-keyboard-shortcuts-json.png) in the Command Palette (`kb(workbench.action.showCommands)`).

## Keyboard rules

Each rule consists of:

* a `key` that describes the pressed keys.
* a `command` containing the identifier of the command to execute.
* an **optional** `when` clause containing a boolean expression that will be evaluated depending on the current **context**.

Chords (two separate keypress actions) are described by separating the two keypresses with a space. For example, `kbstyle(Ctrl+K Ctrl+C)`.

When a key is pressed:

* the rules are evaluated from **bottom** to **top**.
* the first rule that matches, both the `key` and in terms of `when`, is accepted.
* no more rules are processed.
* if a rule is found and has a `command` set, the `command` is executed.

The additional `keybindings.json` rules are appended at runtime to the bottom of the default rules, thus allowing them to overwrite the default rules. The `keybindings.json` file is watched by VS Code so editing it while VS Code is running will update the rules at runtime.

The keyboard shortcuts dispatching is done by analyzing a list of rules that are expressed in JSON. Here are some examples:

```json
// Keybindings that are active when the focus is in the editor
{ "key": "home",            "command": "cursorHome",                  "when": "editorTextFocus" },
{ "key": "shift+home",      "command": "cursorHomeSelect",            "when": "editorTextFocus" },

// Keybindings that are complementary
{ "key": "f5",              "command": "workbench.action.debug.continue", "when": "inDebugMode" },
{ "key": "f5",              "command": "workbench.action.debug.start",    "when": "!inDebugMode" },

// Global keybindings
{ "key": "ctrl+f",          "command": "actions.find" },
{ "key": "alt+left",        "command": "workbench.action.navigateBack" },
{ "key": "alt+right",       "command": "workbench.action.navigateForward" },

// Global keybindings using chords (two separate keypress actions)
{ "key": "ctrl+k enter",    "command": "workbench.action.keepEditor" },
{ "key": "ctrl+k ctrl+w",   "command": "workbench.action.closeAllEditors" },
```

## Accepted keys

The `key` is made up of modifiers and the key itself.

The following modifiers are accepted:

Platform|Modifiers
--|---------
macOS|`kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Cmd+)`
Windows|`kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Win+)`
Linux|`kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Meta+)`

The following keys are accepted:

* `kbstyle(f1-f19)`, `kbstyle(a-z)`, `kbstyle(0-9)`
* ``kbstyle(`)``, `kbstyle(-)`, `kbstyle(=)`, `kbstyle([)`, `kbstyle(])`, `kbstyle(\)`, `kbstyle(;)`, `kbstyle(')`, `kbstyle(,)`, `kbstyle(.)`, `kbstyle(/)`
* `kbstyle(left)`, `kbstyle(up)`, `kbstyle(right)`, `kbstyle(down)`, `kbstyle(pageup)`, `kbstyle(pagedown)`, `kbstyle(end)`, `kbstyle(home)`
* `kbstyle(tab)`, `kbstyle(enter)`, `kbstyle(escape)`, `kbstyle(space)`, `kbstyle(backspace)`, `kbstyle(delete)`
* `kbstyle(pausebreak)`, `kbstyle(capslock)`, `kbstyle(insert)`
* `kbstyle(numpad0-numpad9)`, `kbstyle(numpad_multiply)`, `kbstyle(numpad_add)`, `kbstyle(numpad_separator)`
* `kbstyle(numpad_subtract)`, `kbstyle(numpad_decimal)`, `kbstyle(numpad_divide)`

## Command arguments

You can invoke a command with arguments. This is useful if you often perform the same operation on a specific file or folder. You can add a custom keyboard shortcut to do exactly what you want.

The following is an example overriding the `kbstyle(Enter)` key to print some text:

```json
  { "key": "enter", "command": "type",
                    "args": { "text": "Hello World" },
                    "when": "editorTextFocus" }
```

The type command will receive `{"text": "Hello World"}` as its first argument and add "Hello World" to the file instead of producing the default command.

For more information on commands that take arguments, refer to [Built-in Commands](/api/references/commands.md).

## Running multiple commands

It is possible to create a keybinding that runs several other commands sequentially using the command `runCommands`.

1. Run several commands without arguments: copy current line down, mark the current line as comment, move cursor to copied line

```json
{
  "key": "ctrl+alt+c",
  "command": "runCommands",
  "args": {
    "commands": [
      "editor.action.copyLinesDownAction",
      "cursorUp",
      "editor.action.addCommentLine",
      "cursorDown"
    ]
  }
},
```

2. It is also possible to pass arguments to commands: create a new untitled TypeScript file and insert a custom snippet

```json
{
  "key": "ctrl+n",
  "command": "runCommands",
  "args": {
    "commands": [
      {
        "command": "workbench.action.files.newUntitledFile",
        "args": {
          "languageId": "typescript"
        }
      },
      {
        "command": "editor.action.insertSnippet",
        "args": {
          "langId": "typescript",
          "snippet": "class ${1:ClassName} {\n\tconstructor() {\n\t\t$0\n\t}\n}"
        }
      }
    ]
  }
},
```

Note that commands run by `runCommands` receive the value of `"args"` as the first argument. So in the example above, `workbench.action.files.newUntitledFile` receives `{"languageId": "typescript" }` as its first and only argument.

To pass several arguments, one needs to have `"args"` as an array:

```json
{
  "key": "ctrl+shift+e",
  "command": "runCommands",
  "args": {
    "commands": [
      {
        // command invoked with 2 arguments: vscode.executeCommand("myCommand", "arg1", "arg2")
        "command": "myCommand",
        "args": [
          "arg1",
          "arg2"
        ]
      }
    ]
  }
}
```

To pass an array as the first argument, one needs to wrap the array in another array: `"args": [ [1, 2, 3] ]`.

## Removing a specific key binding rule

You can write a key binding rule that targets the removal of a specific default key binding. With the `keybindings.json`, it was always possible to redefine all the key bindings of VS Code, but it can be difficult to make a small tweak, especially around overloaded keys, such as `kbstyle(Tab)` or `kbstyle(Escape)`. To remove a specific key binding, add a `-` to the `command` and the rule will be a removal rule.

Here is an example:

```json
// In Default Keyboard Shortcuts
...
{ "key": "tab", "command": "tab", "when": ... },
{ "key": "tab", "command": "jumpToNextSnippetPlaceholder", "when": ... },
{ "key": "tab", "command": "acceptSelectedSuggestion", "when": ... },
...

// To remove the second rule, for example, add in keybindings.json:
{ "key": "tab", "command": "-jumpToNextSnippetPlaceholder" }

```

To override a specific key binding rule with an empty action, you can specify an empty command:

```json
// To override and disable any `tab` keybinding, for example, add in keybindings.json:
{ "key": "tab", "command": "" }
```

## Keyboard layouts

>**Note:** This section relates only to key bindings, not to typing in the editor.

The keys above are string representations for virtual keys and do not necessarily relate to the produced character when they are pressed. More precisely:

* Reference: [Virtual-Key Codes (Windows)](https://msdn.microsoft.com/library/windows/desktop/dd375731)
* `kbstyle(tab)` for `VK_TAB` (`0x09`)
* `kbstyle(;)` for `VK_OEM_1` (`0xBA`)
* `kbstyle(=)` for `VK_OEM_PLUS` (`0xBB`)
* `kbstyle(,)` for `VK_OEM_COMMA` (`0xBC`)
* `kbstyle(-)` for `VK_OEM_MINUS` (`0xBD`)
* `kbstyle(.)` for `VK_OEM_PERIOD` (`0xBE`)
* `kbstyle(/)` for `VK_OEM_2` (`0xBF`)
* ``kbstyle(`)`` for `VK_OEM_3` (`0xC0`)
* `kbstyle([)` for `VK_OEM_4` (`0xDB`)
* `kbstyle(\)` for `VK_OEM_5` (`0xDC`)
* `kbstyle(])` for `VK_OEM_6` (`0xDD`)
* `kbstyle(')` for `VK_OEM_7` (`0xDE`)
* etc.

Different keyboard layouts usually reposition the above virtual keys or change the characters produced when they are pressed. When using a different keyboard layout than the standard US, Visual Studio Code does the following:

All the key bindings are rendered in the UI using the current system's keyboard layout. For example, `Split Editor` when using a French (France) keyboard layout is now rendered as `kbstyle(Ctrl+*)`:

![render key binding](images/keybinding/render-key-binding.png)

When editing `keybindings.json`, VS Code highlights misleading key bindings, those that are represented in the file with the character produced under the standard US keyboard layout, but that need pressing keys with different labels under the current system's keyboard layout. For example, here is how the **Default Keyboard Shortcuts** rules look like when using a French (France) keyboard layout:

![keybindings.json guidance](images/keybinding/keybindings-json.png)

There is also a widget that helps input the key binding rule when editing `keybindings.json`. To launch the **Define Keybinding** widget, press `kb(editor.action.defineKeybinding)`. The widget listens for key presses and renders the serialized JSON representation in the text box and below it, the keys that VS Code has detected under your current keyboard layout. Once you've typed the key combination you want, you can press `kbstyle(Enter)` and a rule snippet will be inserted.

![key binding widget](images/keybinding/key-binding-widget.png)

>**Note:** On Linux, Visual Studio Code detects your current keyboard layout on start-up and then caches this information. For a good experience, we recommend restarting VS Code if you change your keyboard layout.

## Keyboard layout-independent bindings

Using scan codes, it is possible to define keybindings which do not change with the change of the keyboard layout. For example:

```json
{ "key": "cmd+[Slash]", "command": "editor.action.commentLine",
                           "when": "editorTextFocus" }
```

Accepted scan codes:

* `kbstyle([F1]-[F19])`, `kbstyle([KeyA]-[KeyZ])`, `kbstyle([Digit0]-[Digit9])`
* `kbstyle([Backquote])`, `kbstyle([Minus])`, `kbstyle([Equal])`, `kbstyle([BracketLeft])`, `kbstyle([BracketRight])`, `kbstyle([Backslash])`, `kbstyle([Semicolon])`, `kbstyle([Quote])`, `kbstyle([Comma])`, `kbstyle([Period])`, `kbstyle([Slash])`
* `kbstyle([ArrowLeft])`, `kbstyle([ArrowUp])`, `kbstyle([ArrowRight])`, `kbstyle([ArrowDown])`, `kbstyle([PageUp])`, `kbstyle([PageDown])`, `kbstyle([End])`, `kbstyle([Home])`
* `kbstyle([Tab])`, `kbstyle([Enter])`, `kbstyle([Escape])`, `kbstyle([Space])`, `kbstyle([Backspace])`, `kbstyle([Delete])`
* `kbstyle([Pause])`, `kbstyle([CapsLock])`, `kbstyle([Insert])`
* `kbstyle([Numpad0]-[Numpad9])`, `kbstyle([NumpadMultiply])`, `kbstyle([NumpadAdd])`, `kbstyle([NumpadComma])`
* `kbstyle([NumpadSubtract])`, `kbstyle([NumpadDecimal])`, `kbstyle([NumpadDivide])`

## when clause contexts

VS Code gives you fine control over when your key bindings are enabled through the optional `when` clause.  If your key binding doesn't have a `when` clause, the key binding is globally available at all times. A `when` clause evaluates to either Boolean true or false for enabling key bindings.

VS Code sets various context keys and specific values depending on what elements are visible and active in the VS Code UI. For example, the built-in **Start Debugging** command has the keyboard shortcut `kb(workbench.action.debug.start)`, which is only enabled when there is an appropriate debugger available (context `debuggersAvailable` is true) and the editor isn't in debug mode (context `inDebugMode` is false):

![Start Debugging when clause in the Keyboard Shorts editor](images/keybinding/start-debugging-when-clause.png)

You can also view a keybinding's when clause directly in the Default Keybindings JSON (**Preferences: Open Default Keyboard Shortcuts (JSON)**):

```json
{ "key": "f5",  "command": "workbench.action.debug.start",
                   "when": "debuggersAvailable && !inDebugMode" },
```

### Conditional operators

For when clause conditional expressions, the following conditional operators are useful for keybindings:

Operator | Symbol | Example
-------- | ------ | -----
Equality | `==` | `"editorLangId == typescript"`
Inequality | `!=` | `"resourceExtname != .js"`
Or | <code>\|\|</code> | `"isLinux`<code>\|\|</code>`isWindows"`
And | `&&` | `"textInputFocus && !editorReadonly"`
Matches | `=~` | `"resourceScheme =~ /^untitled$\|^file$/"`

You can find the full list of when clause conditional operators in the [when clause contexts](/api/references/when-clause-contexts.md#conditional-operators) reference.

### Available contexts

You can find some of the available `when` clause contexts in the [when clause context reference](/api/references/when-clause-contexts.md).

The list there isn't exhaustive and you can find other `when` clause contexts by searching and filtering in the Keyboard Shortcuts editor (**Preferences: Open Keyboard Shortcuts** ) or reviewing the Default Keybindings JSON file (**Preferences: Open Default Keyboard Shortcuts (JSON)**).

## Custom keybindings for refactorings

The `editor.action.codeAction` command lets you configure keybindings for specific [Refactorings](/docs/editor/refactoring.md) (Code Actions). For example, the keybinding below triggers the **Extract function** refactoring Code Actions:

```json
{
  "key": "ctrl+shift+r ctrl+e",
  "command": "editor.action.codeAction",
  "args": {
    "kind": "refactor.extract.function"
  }
}
```

This is covered in depth in the [Refactoring](/docs/editor/refactoring.md#keybindings-for-code-actions) topic where you can learn about different kinds of Code Actions and how to prioritize them in the case of multiple possible refactorings.

## Default Keyboard Shortcuts

You can view all default keyboard shortcuts in VS Code in the **Keyboard Shortcuts** editor with the **Show Default Keybindings** command in the **More Actions** (**...**) menu. This applies the `@source:default` filter to the **Keyboard Shortcuts** editor (**Source** is 'Default').

![Default Keyboard Shortcuts](images/keybinding/default-keyboard-shortcuts.png)

You can view the default keyboard shortcuts as a JSON file using the command **Preferences: Open Default Keyboard Shortcuts (JSON)**.

>**Note:** The following keys are rendered assuming a standard US keyboard layout. If you use a different keyboard layout, please [read below](/docs/getstarted/keybindings.md#keyboard-layouts). You can view the currently active keyboard shortcuts in VS Code in the **Command Palette** (**View** -> **Command Palette**) or in the **Keyboard Shortcuts** editor (**File** > **Preferences** > **Keyboard Shortcuts**).

Some commands included below do not have default keyboard shortcuts and so are displayed as `kbstyle(unassigned)` but you can assign your own keybindings.

### Basic Editing

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
Toggle Render Whitespace|`kb(toggleRenderWhitespace)`|`toggleRenderWhitespace`
Toggle Word Wrap|`kb(editor.action.toggleWordWrap)`|`editor.action.toggleWordWrap`

### Rich Languages Editing

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

### Navigation

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

### Editor/Window Management

Command|Key|Command id
-------|---|----------
New Window|`kb(workbench.action.newWindow)`|`workbench.action.newWindow`
Close Window|`kb(workbench.action.closeWindow)`|`workbench.action.closeWindow`
Close Editor|`kb(workbench.action.closeActiveEditor)`|`workbench.action.closeActiveEditor`
Close Folder|`kb(workbench.action.closeFolder)`|`workbench.action.closeFolder`
Cycle Between Editor Groups|`kb(workbench.action.navigateEditorGroups)`|`workbench.action.navigateEditorGroups`
Split Editor|`kb(workbench.action.splitEditor)`|`workbench.action.splitEditor`
Focus into First Editor Group|`kb(workbench.action.focusFirstEditorGroup)`|`workbench.action.focusFirstEditorGroup`
Focus into Second Editor Group|`kb(workbench.action.focusSecondEditorGroup)`|`workbench.action.focusSecondEditorGroup`
Focus into Third Editor Group|`kb(workbench.action.focusThirdEditorGroup)`|`workbench.action.focusThirdEditorGroup`
Focus into Editor Group on the Left|`kb(workbench.action.focusPreviousGroup)`|`workbench.action.focusPreviousGroup`
Focus into Editor Group on the Right|`kb(workbench.action.focusNextGroup)`|`workbench.action.focusNextGroup`
 Move Editor Left |`kb(workbench.action.moveEditorLeftInGroup)`|`workbench.action.moveEditorLeftInGroup`
 Move Editor Right |`kb(workbench.action.moveEditorRightInGroup)`|`workbench.action.moveEditorRightInGroup`
Move Active Editor Group Left|`kb(workbench.action.moveActiveEditorGroupLeft)`|`workbench.action.moveActiveEditorGroupLeft`
Move Active Editor Group Right|`kb(workbench.action.moveActiveEditorGroupRight)`|`workbench.action.moveActiveEditorGroupRight`
Move Editor into Next Group|`kb(workbench.action.moveEditorToNextGroup)`|`workbench.action.moveEditorToNextGroup`
Move Editor into Previous Group|`kb(workbench.action.moveEditorToPreviousGroup)`|`workbench.action.moveEditorToPreviousGroup`

### File Management

Command|Key|Command id
-------|---|----------
New File|`kb(workbench.action.files.newUntitledFile)`|`workbench.action.files.newUntitledFile`
Open File...|`kb(workbench.action.files.openFile)`|`workbench.action.files.openFile`
Save|`kb(workbench.action.files.save)`|`workbench.action.files.save`
Save All|`kb(saveAll)`|`saveAll`
Save As...|`kb(workbench.action.files.saveAs)`|`workbench.action.files.saveAs`
Close|`kb(workbench.action.closeActiveEditor)`|`workbench.action.closeActiveEditor`
Close Others|`kb(workbench.action.closeOtherEditors)`|`workbench.action.closeOtherEditors`
Close Group|`kb(workbench.action.closeEditorsInGroup)`|`workbench.action.closeEditorsInGroup`
Close Other Groups|`kb(workbench.action.closeEditorsInOtherGroups)`|`workbench.action.closeEditorsInOtherGroups`
Close Group to Left|`kb(workbench.action.closeEditorsToTheLeft)`|`workbench.action.closeEditorsToTheLeft`
Close Group to Right|`kb(workbench.action.closeEditorsToTheRight)`|`workbench.action.closeEditorsToTheRight`
Close All|`kb(workbench.action.closeAllEditors)`|`workbench.action.closeAllEditors`
Reopen Closed Editor|`kb(workbench.action.reopenClosedEditor)`|`workbench.action.reopenClosedEditor`
Keep Open|`kb(workbench.action.keepEditor)`|`workbench.action.keepEditor`
Copy Path of Active File|`kb(workbench.action.files.copyPathOfActiveFile)`|`workbench.action.files.copyPathOfActiveFile`
Reveal Active File in Windows|`kb(workbench.action.files.revealActiveFileInWindows)`|`workbench.action.files.revealActiveFileInWindows`
Show Opened File in New Window|`kb(workbench.action.files.showOpenedFileInNewWindow)`|`workbench.action.files.showOpenedFileInNewWindow`
Compare Opened File With|`kb(workbench.files.action.compareFileWith)`|`workbench.files.action.compareFileWith`

### Display

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

### Search

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

### Search Editor

Command|Key|Command id
-------|---|----------
Open Results In Editor|`kb(search.action.openInEditor)`|`search.action.openInEditor`
Focus Search Editor Input|`kb(search.action.focusQueryEditorWidget)`|`search.action.focusQueryEditorWidget`
Search Again|`kb(rerunSearchEditorSearch)`|`rerunSearchEditorSearch`
Delete File Results|`kb(search.searchEditor.action.deleteFileResults)`|`search.searchEditor.action.deleteFileResults`

### Preferences

Command|Key|Command id
-------|---|----------
Open Settings|`kb(workbench.action.openSettings)`|`workbench.action.openSettings`
Open Workspace Settings|`kb(workbench.action.openWorkspaceSettings)`|`workbench.action.openWorkspaceSettings`
Open Keyboard Shortcuts|`kb(workbench.action.openGlobalKeybindings)`|`workbench.action.openGlobalKeybindings`
Open User Snippets|`kb(workbench.action.openSnippets)`|`workbench.action.openSnippets`
Select Color Theme|`kb(workbench.action.selectTheme)`|`workbench.action.selectTheme`
Configure Display Language|`kb(workbench.action.configureLocale)`|`workbench.action.configureLocale`

### Debug

Command|Key|Command id
-------|---|----------
Toggle Breakpoint|`kb(editor.debug.action.toggleBreakpoint)`|`editor.debug.action.toggleBreakpoint`
Start|`kb(workbench.action.debug.start)`|`workbench.action.debug.start`
Continue|`kb(workbench.action.debug.continue)`|`workbench.action.debug.continue`
Start (without debugging)|`kb(workbench.action.debug.run)`|`workbench.action.debug.run`
Pause|`kb(workbench.action.debug.pause)`|`workbench.action.debug.pause`
Step Into|`kb(workbench.action.debug.stepInto)`|`workbench.action.debug.stepInto`

### Tasks

Command|Key|Command id
-------|---|----------
Run Build Task|`kb(workbench.action.tasks.build)`|`workbench.action.tasks.build`
Run Test Task|`kb(workbench.action.tasks.test)`|`workbench.action.tasks.test`

### Extensions

Command|Key|Command id
-------|---|----------
Install Extension|`kb(workbench.extensions.action.installExtension)`|`workbench.extensions.action.installExtension`
Show Installed Extensions|`kb(workbench.extensions.action.showInstalledExtensions)`|`workbench.extensions.action.showInstalledExtensions`
Show Outdated Extensions|`kb(workbench.extensions.action.listOutdatedExtensions)`|`workbench.extensions.action.listOutdatedExtensions`
Show Recommended Extensions|`kb(workbench.extensions.action.showRecommendedExtensions)`|`workbench.extensions.action.showRecommendedExtensions`
Show Popular Extensions|`kb(workbench.extensions.action.showPopularExtensions)`|`workbench.extensions.action.showPopularExtensions`
Update All Extensions|`kb(workbench.extensions.action.updateAllExtensions)`|`workbench.extensions.action.updateAllExtensions`

## Next steps

Now that you know about our Key binding support, what's next...

* [Language Support](/docs/languages/overview.md) - Our Good, Better, Best language grid to see what you can expect
* [Debugging](/docs/editor/debugging.md) - This is where VS Code really shines
* [Node.js](/docs/nodejs/nodejs-tutorial.md) - End to end Node.js scenario with a sample app

## Common questions

### How can I find out what command is bound to a specific key?

In the **Keyboard Shortcut** editor, you can filter on specific keystrokes to see which commands are bound to which keys. Below you can see that `kbstyle(Ctrl+Shift+P)` is bound to **Show All Commands** to bring up the Command Palette.

![Key bindings quick outline](images/keybinding/filter-on-keys.png)

### How to add a key binding to an action, for example, add Ctrl+D to Delete Lines

Find a rule that triggers the action in the **Default Keyboard Shortcuts** and write a modified version of it in your `keybindings.json` file:

```json
// Original, in Default Keyboard Shortcuts
{ "key": "ctrl+shift+k",          "command": "editor.action.deleteLines",
                                     "when": "editorTextFocus" },
// Modified, in User/keybindings.json, Ctrl+D now will also trigger this action
{ "key": "ctrl+d",                "command": "editor.action.deleteLines",
                                     "when": "editorTextFocus" },
```

### How can I add a key binding for only certain file types?

Use the `editorLangId` context key in your `when` clause:

```json
{ "key": "shift+alt+a",           "command": "editor.action.blockComment",
                                     "when": "editorTextFocus && editorLangId == csharp" },
```

### I have modified my key bindings in `keybindings.json`; why don't they work?

The most common problem is a syntax error in the file. Otherwise, try removing the `when` clause or picking a different `key`. Unfortunately, at this point, it is a trial and error process.
