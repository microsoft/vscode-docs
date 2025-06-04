---
ContentId: 045980C1-62C7-4E8E-8CE4-BAD722FFE31E
DateApproved: 05/08/2025
MetaDescription: Here you will find the complete list of keyboard shortcuts for Visual Studio Code and how to change them.
MetaSocialImage: images/keybinding/customization-keybindings-social.png
---
# Keyboard shortcuts for Visual Studio Code

Visual Studio Code lets you perform most tasks directly from the keyboard. This article explains how you can modify the default keyboard shorts that come with VS Code.

> [!NOTE]
> If you visit this page on a Mac, you will see the keyboard shortcuts for the Mac. If you visit using Windows or Linux, you will see the keys for that platform. If you need the keyboard shortcuts for another platform, hover your mouse over the key you are interested in.

## Keyboard Shortcuts editor

VS Code provides a rich keyboard shortcut editing experience with the Keyboard Shortcuts editor. The editor lists all available commands with and without keyboard shortcuts, and enables you to change, remove, or reset their keyboard shortcuts using the available actions. To find commands or keyboard shortcuts, use the search box and enter a command or shortcut to filter the list.

To open the Keyboard Shortcuts editor, select the **File** > **Preferences** > **Keyboard Shortcuts** menu, or use the **Preferences: Open Keyboard Shortcuts** command (`kb(workbench.action.openGlobalKeybindings)`) in the Command Palette.

![Keyboard Shortcuts](images/keybinding/keyboard-shortcuts.gif)

> [!NOTE]
> The keyboard shortcuts match your current keyboard layout. For example, keyboard shortcut `kbstyle(Cmd+\)` in US keyboard layout will be shown as `kbstyle(Ctrl+Shift+Alt+Cmd+7)` when the layout is changed to German. The dialog to change a keyboard shortcut assigns the correct and desired keyboard shortcut according to your keyboard layout.

## Customize shortcuts for UI actions

To customize a keyboard shortcut for a UI action, right-click on any action item in your workbench, and select **Configure Keybinding**. This opens the Keyboard Shortcuts editor, filtered to the corresponding command. If the action has a `when` clause, it's automatically included, making it easier to set up your keyboard shortcuts just the way you need them.

<video src="images/keybinding/customize-keybinding.mp4" title="Video that shows how to customize the keyboard shortcut for the split editor action." autoplay loop controls muted></video>

## Keymap extensions

Keymap extensions modify the VS Code shortcuts to match those of other editors, so you don't need to learn new keyboard shortcuts.

Select the **File** > **Preferences** > **Migrate Keyboard Shortcuts from...** menu to get a list of popular keymap extensions. There is also a [Keymaps category](https://marketplace.visualstudio.com/search?target=VSCode&category=Keymaps&sortBy=Installs) of extensions in the Marketplace.

<div class="marketplace-extensions-curated-keymaps"></div>

## Keyboard Shortcuts reference

We have a printable version of the default keyboard shortcuts. Select **Help** > **Keyboard Shortcut Reference** to display a condensed PDF version suitable for printing as an easy reference.

The following links provide access to the three platform-specific versions (US English keyboard):

* [Windows](https://go.microsoft.com/fwlink/?linkid=832145)
* [macOS](https://go.microsoft.com/fwlink/?linkid=832143)
* [Linux](https://go.microsoft.com/fwlink/?linkid=832144)

## Detecting keyboard shortcut conflicts

If you have many extensions installed or you have modified your keyboard shortcuts, there might be keyboard shortcut conflicts, where the same keyboard shortcut is mapped to multiple commands. This can result in confusing behavior, especially if different keyboard shortcuts are going in and out of scope as you move around the editor.

Right-click on an item in the list of keyboard shortcuts, and select **Show Same Keybindings** to view all entries with the same keyboard shortcut.

![show keyboard shortcut conflicts menu](images/keybinding/show-conflicts-menu.png)

## Troubleshooting keyboard shortcuts

To troubleshoot keyboard shortcut problems, you can execute the command **Developer: Toggle Keyboard Shortcuts Troubleshooting**. This activates logging of dispatched keyboard shortcuts and opens the Output panel with the corresponding log file.

You can then press your desired keyboard shortcut and check what keyboard shortcut VS Code detects and what command is invoked.

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

In the example log, the first keydown event is for the `MetaLeft` key (`cmd`) and cannot be dispatched. The second keydown event is for the `Slash` key (`/`) and is dispatched as `meta+[Slash]`. There were two keyboard shortcut entries mapped from `meta+[Slash]` and the one that matched was for the command `editor.action.commentLine`, which has the `when` condition `editorTextFocus && !editorReadonly` and is a built-in keyboard shortcut entry.

## Viewing modified keyboard shortcuts

To filter the list to only show the shortcuts you have modified, select the **Show User Keybindings** command in the **More Actions** (**...**) menu. This applies the `@source:user` filter to the **Keyboard Shortcuts** editor (**Source** is 'User').

![Default Keyboard Shortcuts](images/keybinding/user-keyboard-shortcuts.png)

## Advanced customization

VS Code keeps track of the keyboard shortcuts you have customized in the `keybindings.json` file. For advanced customization, you can also directly modify the `keybindings.json` file.

To open the `keybindings.json` file:

* Open **Keyboard Shortcuts** editor, and then select the **Open Keyboard Shortcuts (JSON)** button on the right of the editor title bar.

  ![Open Keyboard Shortcuts JSON button](images/keybinding/open-keyboard-shortcuts-json.png)

* Alternatively, use the **Open Default Keyboard Shortcuts (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Keyboard rules

A keyboard shortcut configuration in VS Code is also known as a _keyboard rule_. Each rule consists of the following attributes:

* `key`: describes the pressed key(s), for example `kb(actions.find)`.
* `command`: the identifier of the VS Code command to execute, for example `workbench.view.explorer` to open the Explorer view.
* `when`: (optional) clause containing a boolean expression that is evaluated depending on the current [context](#when-clause-contexts).

Chords (two separate keypress actions) are described by separating the two keypresses with a space. For example, `kbstyle(Ctrl+K Ctrl+C)`.

When a key is pressed, the following evaluation rules are applied:

* Rules are evaluated from **bottom** to **top**.
* The first rule that matches both the `key` and `when` clause, is accepted.
* If a rule is found, no more rules are processed.
* If a rule is found and has a `command` set, the `command` is executed.

The additional `keybindings.json` rules are appended at runtime to the bottom of the default rules, thus allowing them to overwrite the default rules. The `keybindings.json` file is watched by VS Code, so editing it while VS Code is running will update the rules at run-time.

The keyboard shortcuts dispatching is done by analyzing a list of rules that are expressed in JSON. Here are some examples:

```json
// Keyboard shortcuts that are active when the focus is in the editor
{ "key": "home",            "command": "cursorHome",                  "when": "editorTextFocus" },
{ "key": "shift+home",      "command": "cursorHomeSelect",            "when": "editorTextFocus" },

// Keyboard shortcuts that are complementary
{ "key": "f5",              "command": "workbench.action.debug.continue", "when": "inDebugMode" },
{ "key": "f5",              "command": "workbench.action.debug.start",    "when": "!inDebugMode" },

// Global keyboard shortcuts
{ "key": "ctrl+f",          "command": "actions.find" },
{ "key": "alt+left",        "command": "workbench.action.navigateBack" },
{ "key": "alt+right",       "command": "workbench.action.navigateForward" },

// Global keyboard shortcuts using chords (two separate keypress actions)
{ "key": "ctrl+k enter",    "command": "workbench.action.keepEditor" },
{ "key": "ctrl+k ctrl+w",   "command": "workbench.action.closeAllEditors" },
```

## Accepted keys

The `key` is made up of modifiers and the key itself.

The following modifiers are accepted:

| Platform | Modifiers |
| -- | --------- |
| macOS | `kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Cmd+)` |
| Windows | `kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Win+)` |
| Linux | `kbstyle(Ctrl+)`, `kbstyle(Shift+)`, `kbstyle(Alt+)`, `kbstyle(Meta+)` |

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

The `type` command will receive `{"text": "Hello World"}` as its first argument, and add "Hello World" to the file instead of producing the default command.

For more information on commands that take arguments, refer to [Built-in Commands](/api/references/commands.md).

## Running multiple commands

A keyboard shortcut can be configured to run multiple commands sequentially by using the command `runCommands`.

* Run several commands without arguments:

  The following example copies the current line down, marks the current line as a comment, and moves the cursor to the copied line.

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

* To pass arguments to commands:

  This example creates a new untitled TypeScript file and inserts a custom snippet.

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

Note that commands run by `runCommands` receive the value of `"args"` as the first argument. In the previous example, `workbench.action.files.newUntitledFile` receives `{"languageId": "typescript" }` as its first and only argument.

To pass several arguments, you need to have `"args"` as an array:

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

To pass an array as the first argument, wrap the array in another array: `"args": [ [1, 2, 3] ]`.

## Removing a keyboard shortcut

To remove a keyboard shortcut, right-click on the entry in the Keyboard Shortcuts editor, and select **Remove Keybinding**.

To remove a keyboard shortcut by using the `keybindings.json` file, add a `-` to the `command` and the rule will be a removal rule.

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

To override a specific keyboard shortcut rule with an empty action, you can specify an empty command:

```json
// To override and disable any `tab` keyboard shortcut, for example, add in keybindings.json:
{ "key": "tab", "command": "" }
```

## Keyboard layouts

> [!NOTE]
> This section relates only to keyboard shortcuts, not to typing in the editor.

Keys are string representations for virtual keys and do not necessarily relate to the produced character when they are pressed. More precisely:

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

Different keyboard layouts usually reposition these virtual keys or change the characters produced when they are pressed. When using a different keyboard layout than the standard US, Visual Studio Code does the following:

All the keyboard shortcuts are rendered in the UI using the current system's keyboard layout. For example, `Split Editor` when using a French (France) keyboard layout is now rendered as `kbstyle(Ctrl+*)`:

![render keyboard shortcut](images/keybinding/render-key-binding.png)

When editing `keybindings.json`, VS Code highlights misleading keyboard shortcuts, those that are represented in the file with the character produced under the standard US keyboard layout, but that need pressing keys with different labels under the current system's keyboard layout. For example, here is how the default keyboard shortcut rules look like when using a French (France) keyboard layout:

![keybindings.json guidance](images/keybinding/keybindings-json.png)

There is also a UI control that helps input the keyboard shortcut rule when editing `keybindings.json`. To launch the **Define Keybinding** control, press `kb(editor.action.defineKeybinding)`. The control listens for key presses and renders the serialized JSON representation in the text box and below it, the keys that VS Code has detected under your current keyboard layout. Once you've typed the key combination you want, you can press `kbstyle(Enter)` and a rule snippet is inserted.

![keyboard shortcut widget](images/keybinding/key-binding-widget.png)

> [!NOTE]
> On Linux, VS Code detects your current keyboard layout on startup, and then caches this information. We recommend that you restart VS Code when you change your keyboard layout.

## Keyboard layout-independent bindings

Using scan codes, it is possible to define keyboard shortcuts that do not change with the change of the keyboard layout. For example:

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

VS Code gives you precise control over when your keyboard shortcuts are enabled through the optional `when` clause.  If your keyboard shortcut doesn't have a `when` clause, the keyboard shortcut is globally available at all times. A `when` clause evaluates to either true or false for enabling keyboard shortcuts.

VS Code sets various context keys and specific values depending on what elements are visible and active in the VS Code UI. For example, the built-in **Start Debugging** command has the keyboard shortcut `kb(workbench.action.debug.start)`, which is only enabled when there is an appropriate debugger available (context `debuggersAvailable` is true) and the editor isn't in debug mode (context `inDebugMode` is false):

![Start Debugging when clause in the Keyboard Shorts editor](images/keybinding/start-debugging-when-clause.png)

You can also view a keyboard shortcut's when clause directly in the default `keybinding.json` (**Preferences: Open Default Keyboard Shortcuts (JSON)**):

```json
{ "key": "f5",  "command": "workbench.action.debug.start",
                   "when": "debuggersAvailable && !inDebugMode" },
```

### Conditional operators

For `when` clause conditional expressions, the following conditional operators are useful for keyboard shortcuts:

| Operator | Symbol | Example |
| -------- | ------ | ------- |
| Equality | `==` | `"editorLangId == typescript"` |
| Inequality | `!=` | `"resourceExtname != .js"` |
| Or | <code>\|\|</code> | `"isLinux`<code>\|\|</code>`isWindows"` |
| And | `&&` | `"textInputFocus && !editorReadonly"` |
| Matches | `=~` | `"resourceScheme =~ /^untitled$\|^file$/"` |

You can find the full list of when clause conditional operators in the [when clause contexts](/api/references/when-clause-contexts.md#conditional-operators) reference.

### Available contexts

You can find some of the available `when` clause contexts in the [when clause context reference](/api/references/when-clause-contexts.md).

The list there isn't exhaustive and you can find other `when` clause contexts by searching and filtering in the Keyboard Shortcuts editor (**Preferences: Open Keyboard Shortcuts** ) or reviewing the default `keybindings.json` file (**Preferences: Open Default Keyboard Shortcuts (JSON)**).

## Custom keyboard shortcuts for refactorings

The `editor.action.codeAction` command lets you configure keyboard shortcuts for specific [Refactorings](/docs/editing/refactoring.md) (Code Actions). For example, the keyboard shortcut below triggers the **Extract function** refactoring Code Action:

```json
{
  "key": "ctrl+shift+r ctrl+e",
  "command": "editor.action.codeAction",
  "args": {
    "kind": "refactor.extract.function"
  }
}
```

This is covered in depth in the [Refactoring](/docs/editing/refactoring.md#keyboard-shortcuts-for-code-actions) article, where you can learn about different kinds of Code Actions and how to prioritize them in the case of multiple possible refactorings.

## Related resources

* [VS Code default keyboard shortcuts reference](/docs/reference/default-keybindings.md)

## Common questions

### How can I find out what command is bound to a specific key?

In the Keyboard Shortcuts editor, you can filter on specific keystrokes to see which commands are bound to which keys. In the following screenshot, you can see that `kbstyle(Ctrl+Shift+P)` is bound to **Show All Commands** to bring up the Command Palette.

![Keyboard shortcuts quick outline](images/keybinding/filter-on-keys.png)

### How to add a keyboard shortcut to an action, for example, add Ctrl+D to Delete Lines

Find a rule that triggers the action in the **Default Keyboard Shortcuts** and write a modified version of it in your `keybindings.json` file:

```json
// Original, in Default Keyboard Shortcuts
{ "key": "ctrl+shift+k",          "command": "editor.action.deleteLines",
                                     "when": "editorTextFocus" },
// Modified, in User/keybindings.json, Ctrl+D now will also trigger this action
{ "key": "ctrl+d",                "command": "editor.action.deleteLines",
                                     "when": "editorTextFocus" },
```

### How can I add a keyboard shortcut for only certain file types?

Use the `editorLangId` context key in your `when` clause:

```json
{ "key": "shift+alt+a",           "command": "editor.action.blockComment",
                                     "when": "editorTextFocus && editorLangId == csharp" },
```

### I have modified my keyboard shortcuts in `keybindings.json`; why don't they work?

The most common problem is a syntax error in the file. Otherwise, try removing the `when` clause or picking a different `key`. Unfortunately, at this point, it is a trial and error process.
