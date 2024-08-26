---
Order: 6
Area: getstarted
TOCTitle: Settings
ContentId: FDA6D86C-FF24-49BC-A1EB-E3BA43130FA0
PageTitle: Visual Studio Code User and Workspace Settings
DateApproved: 08/01/2024
MetaDescription: How to modify Visual Studio Code User and Workspace Settings.
---
# User and Workspace Settings

You can configure Visual Studio Code to your liking through its various settings. Nearly every part of VS Code's editor, user interface, and functional behavior has options you can modify.

VS Code provides different scopes for settings:

* **User settings** - Settings that apply globally to any instance of VS Code you open.
* **Workspace settings** - Settings stored inside your workspace and only apply when the workspace is opened.

In this article, we'll first describe user settings as these are your personal settings for customizing VS Code. Later we'll cover [Workspace settings](#workspace-settings), which will be specific to the project you're working on.

## Settings editor

Use the Settings editor to review and change VS Code settings. To open the Settings editor, navigate to **File** > **Preferences** > **Settings**. Alternately, open the Settings editor from the **Command Palette** (`kb(workbench.action.showCommands)`) with **Preferences: Open Settings** or use the keyboard shortcut (`kb(workbench.action.openSettings)`).

When you open the Settings editor, you can search and discover the settings you are looking for. When you search using the search bar, it not only shows and highlights the settings matching your criteria, but also filter out those which are not matching. This makes finding settings quick and easy.

![Filtering settings by searching in the Settings editor](images/settings/settings-search.png)

Changes to settings are applied directly by VS Code, as you change them. Modified settings are indicated with a blue line, similar to modified lines in the editor.

In the example below, the Side Bar location and File Icon Theme were changed.

![Modified settings in the Settings editor showing blue vertical bars to the left of them](images/settings/settings-modified.png)

The gear icon (**More Actions...** `kb(settings.action.showContextMenu)`) opens a context menu with options to reset a setting to its default value, and to copy the setting ID or copy a JSON name-value pair.

![Settings edit gear context menu](images/settings/more-actions-context-menu.png)

### Edit settings

Each setting can be edited by either a checkbox, an text input field, or a dropdown. Edit the text or select the option you want to change to the desired settings.

![An example setting with a dropdown](images/settings/settings-edit.png)

### Settings groups

Settings are represented in groups, so that you can navigate to them easily. There is a **Commonly Used** group at the top, which shows popular customizations.

In the following example, the source control settings are focused by selecting **Source Control** in the tree view.

![Settings editor with the Source Control section of the table of contents selected](images/settings/settings-groups.png)

> **Note**: VS Code extensions can also add their own custom settings, and those settings are visible under an **Extensions** section.

## Changing a setting

As an example, let's hide the [Activity Bar](/docs/getstarted/userinterface.md#basic-layout) from VS Code. You might want to hide the Activity Bar to give the editor a little more room, or if you prefer to open views via the **View** menu or Command Palette.

1. Open the Settings Editor (`kb(workbench.action.openSettings)`) and type "activity" in the search bar.

![Settings editor with 'activity' in the search bar with at least five settings](images/settings/search-for-activity.png)

1. You can further limit the scope to just those settings under the **Appearance** group in the table of contents on the left. There should now be just three settings.

1. You can now check and uncheck the **Workbench** > **Activity Bar: Visible** setting to hide and unhide the Activity Bar. Notice that when you have changed the setting value to be different than the default value, you see a blue line to the left.

![Activity Bar: Visible unchecked and Activity Bar is hidden](images/settings/activity-bar-hidden.png)

You can always reset a setting to the default value by hovering over a setting to show the gear icon, clicking on the gear icon, and then selecting the **Reset Setting** action.

## Settings editor filters

The Settings editor search bar has several filters to make it easier to manage your settings. To the right of the search bar is a filter button with a funnel icon that provides options to easily add a filter to the search bar.

### Modified settings

To check which settings you have configured, there is a `@modified` filter in the search bar. A setting shows up under this filter if its value differs from the default value, or if its value is explicitly set in the respective settings JSON file.

This filter can be useful if you have forgotten whether you configured a setting, or if the editor is not behaving as you expect because you accidentally configured a setting.

![Settings editor with @modified filter showing changed settings](images/settings/modified-filter-settings.png)

### Other filters

There are several other handy filters to help with searching through settings. Type the `@` symbol in the search bar to discover the different filters.

![Setting editor @ tag filter dropdown](images/settings/settings-editor-filters.png)

Here are some of the filters available:

* `@ext` - Settings specific to an extension. You provide the extension ID such as `@ext:ms-python.python`.
* `@feature` - Settings specific to a **Features** subgroup. For example, `@feature:explorer` shows settings of the File Explorer.
* `@id` - Find a setting based on the setting ID. For example, `@id:workbench.activityBar.visible`.
* `@lang` - Apply a language filter based on a language ID. For example, `@lang:typescript`. See [Language-specific editor settings](#language-specific-editor-settings) for more details.
* `@tag` - Settings specific to a system of VS Code. For example, `@tag:workspaceTrust` for settings related to [Workspace Trust](/docs/editor/workspace-trust.md), or `@tag:accessibility` for settings related to accessibility.

The search bar remembers your settings search queries and supports Undo/Redo (`kb(undo)`/`kb(redo)`). You can quickly clear a search term or filter with the **Clear Settings Search Input** button at the right of the search bar.

![Clear Settings Search Input button in the right of the Settings editor](images/settings/clear-search-input-button.png)

## Extension settings

Installed VS Code extensions can also contribute their own settings, which you can review under the **Extensions** section of the Settings editor.

![C++ extension settings in the Settings editor](images/settings/cpp-extension-settings.png)

You can also review an extension's settings from the Extensions view (`kb(workbench.view.extensions)`) by selecting the extension and reviewing the **Feature Contributions** tab.

![Python extension Settings list under Feature Contributions tab](images/settings/python-feature-contributions.png)

Extension authors can learn more about adding custom settings in the [configuration contribution point documentation](/api/references/contribution-points.md#contributes.configuration).

## settings.json

VS Code stores setting values in a `settings.json` file. The Settings editor is the user interface that enables you to review and modify setting values that are stored in a `settings.json` file. You can also review and edit this file directly by opening it in the editor with the **Preferences: Open User Settings (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`). Settings are written as JSON by specifying the setting ID and value.

![User settings.json open in the editor](images/settings/settings-json-in-editor.png)

The `settings.json` file has full IntelliSense with smart completions for settings and values and description hovers. Errors due to incorrect setting names or JSON formatting are also highlighted.

![IntelliSense for settings.json open in the editor](images/settings/settings-json-intellisense.png)

Some settings can only be edited in `settings.json` such as **Workbench: Color Customizations** and show an **Edit in settings.json** link in the Settings editor.

![Workbench: Color Customizations setting with Edit in settings.json link](images/settings/edit-in-settings-json-link.png)

### Changing settings.json

As an example, lets change the editor line number color. Select the **Edit in settings.json** link and add the following JSON:

```json
     "workbench.colorCustomizations": {
        "editorLineNumber.foreground": "#00ff00"
    }
```

Notice that the line numbers in the editor for the `settings.json` file are now green.

![settings.json editor with green line numbers](images/settings/color-customization-example.png)

Remove the `workbench.colorCustomizations` setting code block to return the line number color to the default.

>**Note**: The example above changes the editor line number for all [Color Themes](/docs/getstarted/themes.md), but you can tune colors per [specific Color Theme](/docs/getstarted/themes.md#customizing-a-color-theme) or even [create your own Color Theme](/api/extension-guides/color-theme.md#create-a-new-color-theme) extension.

If you prefer to always work directly with `settings.json`, you can set `"workbench.settings.editor": "json"` so that **File** > **Preferences** > **Settings** and the keybinding `kb(workbench.action.openSettings)` always opens the `settings.json` file and not the Setting editor UI.

### Settings file locations

Depending on your platform, the user settings file is located here:

* **Windows** `%APPDATA%\Code\User\settings.json`
* **macOS** `$HOME/Library/Application\ Support/Code/User/settings.json`
* **Linux** `$HOME/.config/Code/User/settings.json`

### Reset all settings

While you can reset settings individually via the Settings editor **Reset Setting** command, you can reset all changed settings by opening `settings.json` and deleting the entries between the braces `{}`. Be careful since there is no way to recover your previous setting values.

## Workspace settings

Workspace settings are specific to a project and can be shared across developers on a project. Workspace settings override user settings.

>**Note**: A VS Code "workspace" is usually just your project root folder. Workspace settings as well as [debugging](/docs/editor/debugging.md) and [task](/docs/editor/tasks.md) configurations are stored at the root in a `.vscode` folder. You can also have more than one root folder in a VS Code workspace through a feature called [Multi-root workspaces](/docs/editor/multi-root-workspaces.md). You can learn more in the [What is a VS Code "workspace"?](/docs/editor/workspaces.md) article.

You can edit via the Settings editor **Workspace** tab or open that tab directly with the **Preferences: Open Workspace Settings** command.

![Settings editor with Workspace tab highlighted](images/settings/settings-editor-workspace-tab.png)

All features of the Settings editor such as settings groups, search, and filtering behave the same for Workspace settings. Not all User settings are available as Workspace settings. For example, application-wide settings related to updates and security can not be overridden by Workspace settings.

### Workspace settings.json location

Similar to User Settings, Workspace Settings are also stored in a `settings.json` file, which you can edit directly via the **Preferences: Open Workspace Settings (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`).

The workspace settings file is located under the `.vscode` folder in your root folder.

![The File Explorer displaying settings.json under the .vscode folder](images/settings/settings-json-under-vscode.png)

>**Note:** For a [Multi-root Workspace](/docs/editor/multi-root-workspaces.md#settings), workspace settings are located inside the workspace configuration file.

When you add a Workspace Settings `settings.json` file to your project or source control, the settings for the project will be shared by all users of that project.

## Language specific editor settings

One way to customize language-specific settings is by opening the Settings editor, pressing on the filter button, and selecting the language option to add a language filter. Alternatively, one can directly type a language filter of the form `@lang:languageId` into the search widget. The settings that show up will be configurable for that specific language, and will show the setting value specific to that language, if applicable.

When you modify a setting while there is a language filter in place, the setting is configured in the given scope for that language.
For example, when modifying the user-scope `diffEditor.codeLens` setting while there is a `@lang:css` filter in the search widget, the Settings editor saves the new value to the CSS-specific section of the user settings file.

![Editing the CSS-specific user-scoped diffEditor.codeLens setting in the Settings editor](images/settings/settings-css-example.png)

>**Note:** If you enter more than one language filter in the search widget, the current behavior is that only the first language filter will be used.

Another way to customize your editor by language is by running the global command **Preferences: Configure Language Specific Settings** (command ID: `workbench.action.configureLanguageBasedSettings`) from the **Command Palette** (`kb(workbench.action.showCommands)`) which opens the language picker. Select the language you want. Then, the Settings editor opens with a language filter for the selected language, which allows you to modify language-specific settings for that language. Though, if you have the `workbench.settings.editor` setting set to `json`, then the `settings.json` file opens with a new language entry where you can add applicable settings.

![Configure language-specific settings command typed up in the Command Palette](images/settings/pref-config-lang-settings.png)

Select the language via the dropdown:

![Select language dropdown](images/settings/lang-selection.png)

Now you can start editing settings specifically for that language:

![Settings editor showing a specific language filter](images/settings/lang-based-settings-editor.png)

Or, if `workbench.settings.editor` is set to `json`, now you can start adding language-specific settings to your user settings:

![Suggestions for language-specific settings shown in the settings JSON file](images/settings/lang-based-settings.png)

If you have a file open and you want to customize the editor for this file type, select the Language Mode in the Status Bar to the bottom-right of the VS Code window. This opens the Language Mode picker with an option **Configure 'language_name' language based settings**. Selecting this opens your user `settings.json` with the language entry where you can add applicable settings.

Language-specific editor settings always override non-language-specific editor settings, even if the non-language-specific setting
has a narrower scope. For example, language-specific user settings override non-language-specific workspace settings.

You can scope language-specific settings to the workspace by placing them in the workspace settings just like other settings. If you have settings defined for the same language in both user and workspace scopes, then they are merged by giving precedence to the ones defined in the workspace.

The following example can be pasted into a settings JSON file to customize editor settings for the `typescript` and `markdown` language modes.

```json
{
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.wordWrap": "on",
    "editor.renderWhitespace": "all",
    "editor.acceptSuggestionOnEnter": "off"
  }
}
```

You can use IntelliSense in `settings.json` to help you find language-specific settings. All editor settings and some non-editor settings are supported. Some languages have default language-specific settings already set, which you can review in `defaultSettings.json` by running the **Preferences: Open Default Settings** command.

### Multiple language-specific editor settings

You can configure language specific editor settings for multiple languages at once. The following example shows how you can customize settings for `javascript` and `typescript` languages together in your `settings.json` file:

```json
"[javascript][typescript]": {
  "editor.maxTokenizationLineLength": 2500
}
```

## Settings precedence

Configurations can be overridden at multiple levels by the different setting scopes. In the following list, **later scopes override earlier scopes**:

* Default settings - This scope represents the default unconfigured setting values.
* User settings - Apply globally to all VS Code instances.
* Remote settings - Apply to a remote machine opened by a user.
* Workspace settings - Apply to the open folder or workspace.
* Workspace Folder settings - Apply to a specific folder of a [multi-root workspace](/docs/editor/multi-root-workspaces.md).
* Language-specific default settings - These are language-specific default values that can be contributed by extensions.
* Language-specific user settings - Same as User settings, but specific to a language.
* Language-specific remote settings - Same as Remote settings, but specific to a language.
* Language-specific workspace settings - Same as Workspace settings, but specific to a language.
* Language-specific workspace folder settings - Same as Workspace Folder settings, but specific to a language.
* Policy settings - Set by the system administrator, these values always override other setting values.

Setting values can be of various types:

* String - `"files.autoSave": "afterDelay"`
* Boolean - `"editor.minimap.enabled": true`
* Number - `"files.autoSaveDelay": 1000`
* Array - `"editor.rulers": []`
* Object - `"search.exclude": { "**/node_modules": true, "**/bower_components": true }`

Values with primitive types and Array types are overridden, meaning a configured value in a scope that takes precedence over another scope is used instead of the value in the other scope. But, values with Object types are merged.

For example, `workbench.colorCustomizations` takes an Object that specifies a group of UI elements and their desired colors. If your user settings set the editor backgrounds to blue and green:

```json
  "workbench.colorCustomizations": {
    "editor.background": "#000088",
    "editor.selectionBackground": "#008800"
  }
```

And your open workspace settings set the editor foreground to red:

```json
  "workbench.colorCustomizations": {
    "editor.foreground": "#880000",
    "editor.selectionBackground": "#00FF00"
  }
```

The result, when that workspace is open, is the combination of those two color customizations, as if you had specified:

```json
  "workbench.colorCustomizations": {
    "editor.background": "#000088",
    "editor.selectionBackground": "#00FF00",
    "editor.foreground": "#880000"
  }
```

If there are conflicting values, such as `editor.selectionBackground` in the example above, the usual override behavior occurs, with workspace values taking precedence over user values, and language-specific values taking precedence over non-language-specific values.

### Note about multiple language specific settings

If you are using [multiple language-specific settings](#multiple-languagespecific-editor-settings), be aware that language-specific settings are merged and precedence is set based on the full language string (for example `"[typescript][javascript]"`) and not the individual language IDs (`typescript` and `javascript`). This means that for example, a `"[typescript][javascript]"` workspace setting will not override a `"[javascript]"` user setting.

## Settings and security

Some settings allow you to specify an executable that VS Code will run to perform certain operations. For example, you can choose which shell the Integrated Terminal should use. For enhanced security, such settings can only be defined in user settings and not at workspace scope.

Here is the list of settings not supported in workspace settings:

* `git.path`
* `terminal.external.windowsExec`
* `terminal.external.osxExec`
* `terminal.external.linuxExec`

The first time you open a workspace that defines any of these settings, VS Code will warn you and then always ignore the values after that.

## Settings Sync

You can share your user settings across your VS Code instances with the [Settings Sync](/docs/editor/settings-sync.md) feature. This feature lets you share settings, keyboard shortcuts, and installed extensions across your VS Code installs on various machines. You can enable Settings Sync via the **Backup and Sync Settings** command on the right of the Settings editor or on the **Accounts** Activity Bar context menu.

![Turn on Settings Sync command in the Accounts Activity Bar menu](images/settings/accounts-context-menu.png)

You can learn more about turning on and configuring Settings Sync in the [Settings Sync](/docs/editor/settings-sync.md) user guide.

> **Note**: VS Code does not synchronize your extensions to or from a [remote](/docs/remote/remote-overview.md) window, such as when you're connected to SSH, a development container (devcontainer), or WSL.

## Common questions

### VS Code says "Unable to write settings."

If you try to change a setting (for example turning on Auto Save or selecting a new Color Theme) and you see "Unable to write into user settings. Please open user settings to correct errors/warnings in it and try again.", it means your `settings.json` file is ill-formed or has errors. The error can be as simple as a missing comma or incorrect setting value. Open the `settings.json` file with the **Preferences: Open User Settings (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`) and you should see the error highlighted with red squiggles.

### How can I reset my user settings?

The easiest way to reset VS Code back to the default settings is to clear your user `settings.json` file. You can open the `settings.json` file with the **Preferences: Open User Settings (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`). Once the file is open in an editor, delete everything between the two curly braces `{}`, save the file, and VS Code will go back to using the default values.

### When does it make sense to use workspace settings?

If you're using a workspace that needs custom settings but you don't want to apply them to your other VS Code projects. A good example is language-specific linting rules.

### Where can I find extension settings?

In general, VS Code extensions store their settings in your user or workspaces settings files and they are available through the Settings editor UI (**Preferences: Open Settings (UI)** command) or via IntelliSense in your `settings.json` file (**Preferences: Open User Settings (JSON)** command). Searching by the extension name (for example `gitlens` or `python`) can help filter down settings to just those contributed by an extension.

## Default settings

Below are the Visual Studio Code default settings and their values. You can also view the default values in the Settings editor or see a read-only version of the `defaultSettings.json` via the **Preferences: Open Default Settings (JSON)** command in the Command Palette (`kb(workbench.action.showCommands)`).

```json
{
// Telemetry

    //  - all: Sends usage data, errors, and crash reports.
    //  - error: Sends general error telemetry and crash reports.
    //  - crash: Sends OS level crash reports.
    //  - off: Disables all product telemetry.
    "telemetry.telemetryLevel": "all",

    // Controls whether the editor shows CodeLens.
    "diffEditor.codeLens": false,

    //  - legacy: Uses the legacy diffing algorithm.
    //  - advanced: Uses the advanced diffing algorithm.
    "diffEditor.diffAlgorithm": "advanced",

    // Controls how many lines are used as context when comparing unchanged regions.
    "diffEditor.hideUnchangedRegions.contextLineCount": 3,

    // Controls whether the diff editor shows unchanged regions.
    "diffEditor.hideUnchangedRegions.enabled": false,

    // Controls how many lines are used as a minimum for unchanged regions.
    "diffEditor.hideUnchangedRegions.minimumLineCount": 3,

    // Controls how many lines are used for unchanged regions.
    "diffEditor.hideUnchangedRegions.revealLineCount": 20,

    // When enabled, the diff editor ignores changes in leading or trailing whitespace.
    "diffEditor.ignoreTrimWhitespace": true,

    // Timeout in milliseconds after which diff computation is cancelled. Use 0 for no timeout.
    "diffEditor.maxComputationTime": 5000,

    // Maximum file size in MB for which to compute diffs. Use 0 for no limit.
    "diffEditor.maxFileSize": 50,

    // When enabled, the diff editor shows a special gutter for revert and stage actions.
    "diffEditor.renderGutterMenu": true,

    // Controls whether the diff editor shows +/- indicators for added/removed changes.
    "diffEditor.renderIndicators": true,

    // When enabled, the diff editor shows arrows in its glyph margin to revert changes.
    "diffEditor.renderMarginRevertIcon": true,

    // Controls whether the diff editor shows the diff side by side or inline.
    "diffEditor.renderSideBySide": true,

    // If the diff editor width is smaller than this value, the inline view is used.
    "diffEditor.renderSideBySideInlineBreakpoint": 900,

    // If enabled and the editor width is too small, the inline view is used.
    "diffEditor.useInlineViewWhenSpaceIsLimited": true,

    //  - off: Lines will never wrap.
    //  - on: Lines will wrap at the viewport width.
    //  - inherit: Lines will wrap according to the `editor.wordWrap` setting.
    "diffEditor.wordWrap": "inherit",

    // Controls whether suggestions should be accepted on commit characters. For example, in JavaScript, the semi-colon (`;`) can be a commit character that accepts a suggestion and types that character.
    "editor.acceptSuggestionOnCommitCharacter": true,

    // Controls whether suggestions should be accepted on `Enter`, in addition to `Tab`. Helps to avoid ambiguity between inserting new lines or accepting suggestions.
    //  - on
    //  - smart: Only accept a suggestion with `Enter` when it makes a textual change.
    //  - off
    "editor.acceptSuggestionOnEnter": "on",

    // Controls the number of lines in the editor that can be read out by a screen reader at once. When we detect a screen reader, we automatically set the default to be 500.
    "editor.accessibilityPageSize": 10,

    // Controls if the UI should run in a mode where it is optimized for screen readers.
    //  - auto: Use platform APIs to detect when a Screen Reader is attached.
    //  - on: Optimize for usage with a Screen Reader.
    //  - off: Assume a screen reader is not attached.
    "editor.accessibilitySupport": "auto",

    // Controls whether the editor should automatically close brackets after the user adds an opening bracket.
    //  - always
    //  - languageDefined: Use language configurations to determine when to autoclose brackets.
    //  - beforeWhitespace: Autoclose brackets only when the cursor is to the left of whitespace.
    //  - never
    "editor.autoClosingBrackets": "languageDefined",

    // Controls whether the editor should automatically close comments after the user adds an opening comment.
    //  - always
    //  - languageDefined: Use language configurations to determine when to autoclose comments.
    //  - beforeWhitespace: Autoclose comments only when the cursor is to the left of whitespace.
    //  - never
    "editor.autoClosingComments": "languageDefined",

    // Controls whether the editor should remove adjacent closing quotes or brackets when deleting.
    //  - always
    //  - auto: Remove adjacent closing quotes or brackets only if they were automatically inserted.
    //  - never
    "editor.autoClosingDelete": "auto",

    // Controls whether the editor should type over closing quotes or brackets.
    //  - always
    //  - auto: Type over closing quotes or brackets only if they were automatically inserted.
    //  - never
    "editor.autoClosingOvertype": "auto",

    // Controls whether the editor should automatically close quotes after the user adds an opening quote.
    //  - always
    //  - languageDefined: Use language configurations to determine when to autoclose quotes.
    //  - beforeWhitespace: Autoclose quotes only when the cursor is to the left of whitespace.
    //  - never
    "editor.autoClosingQuotes": "languageDefined",

    // Controls whether the editor should automatically adjust the indentation when users type, paste, move or indent lines.
    //  - none: The editor will not insert indentation automatically.
    //  - keep: The editor will keep the current line's indentation.
    //  - brackets: The editor will keep the current line's indentation and honor language defined brackets.
    //  - advanced: The editor will keep the current line's indentation, honor language defined brackets and invoke special onEnterRules defined by languages.
    //  - full: The editor will keep the current line's indentation, honor language defined brackets, invoke special onEnterRules defined by languages, and honor indentationRules defined by languages.
    "editor.autoIndent": "full",

    // Controls whether the editor should automatically surround selections when typing quotes or brackets.
    //  - languageDefined: Use language configurations to determine when to automatically surround selections.
    //  - quotes: Surround with quotes but not brackets.
    //  - brackets: Surround with brackets but not quotes.
    //  - never
    "editor.autoSurround": "languageDefined",

    // Controls whether bracket pair colorization is enabled or not. Use `workbench.colorCustomizations` to override the bracket highlight colors.
    "editor.bracketPairColorization.enabled": true,

    // Controls whether each bracket type has its own independent color pool.
    "editor.bracketPairColorization.independentColorPoolPerBracketType": false,

    // Run Code Actions for the editor on save.
    "editor.codeActionsOnSave": {},

    // Enable/disable showing nearest Quick Fix within a line when not currently on a diagnostic.
    "editor.codeActionWidget.includeNearbyQuickFixes": true,

    // Enable/disable showing group headers in the Code Action menu.
    "editor.codeActionWidget.showHeaders": true,

    // Controls whether the editor shows CodeLens.
    "editor.codeLens": true,

    // Controls the font family for CodeLens.
    "editor.codeLensFontFamily": "",

    // Controls the font size in pixels for CodeLens. When set to 0, 90% of `editor.fontSize` is used.
    "editor.codeLensFontSize": 0,

    // Controls whether the editor should render the inline color decorators and color picker.
    "editor.colorDecorators": true,

    // Controls the condition to make a color picker appear from a color decorator
    //  - clickAndHover: Make the color picker appear both on click and hover of the color decorator
    //  - hover: Make the color picker appear on hover of the color decorator
    //  - click: Make the color picker appear on click of the color decorator
    "editor.colorDecoratorsActivatedOn": "clickAndHover",

    // Controls the max number of color decorators that can be rendered in an editor at once.
    "editor.colorDecoratorsLimit": 500,

    // Enable that the selection with the mouse and keys is doing column selection.
    "editor.columnSelection": false,

    // Controls if empty lines should be ignored with toggle, add or remove actions for line comments.
    "editor.comments.ignoreEmptyLines": true,

    // Controls whether a space character is inserted when commenting.
    "editor.comments.insertSpace": true,

    // Controls whether syntax highlighting should be copied into the clipboard.
    "editor.copyWithSyntaxHighlighting": true,

    // Control the cursor animation style.
    "editor.cursorBlinking": "blink",

    // Controls whether the smooth caret animation should be enabled.
    //  - off: Smooth caret animation is disabled.
    //  - explicit: Smooth caret animation is enabled only when the user moves the cursor with an explicit gesture.
    //  - on: Smooth caret animation is always enabled.
    "editor.cursorSmoothCaretAnimation": "off",

    // Controls the cursor style.
    "editor.cursorStyle": "line",

    // Controls the minimal number of visible leading lines (minimum 0) and trailing lines (minimum 1) surrounding the cursor. Known as 'scrollOff' or 'scrollOffset' in some other editors.
    "editor.cursorSurroundingLines": 0,

    // Controls when `editor.cursorSurroundingLines` should be enforced.
    //  - default: `cursorSurroundingLines` is enforced only when triggered via the keyboard or API.
    //  - all: `cursorSurroundingLines` is enforced always.
    "editor.cursorSurroundingLinesStyle": "default",

    // Controls the width of the cursor when `editor.cursorStyle` is set to `line`.
    "editor.cursorWidth": 0,

    // Controls whether inline color decorations should be shown using the default document color provider
    "editor.defaultColorDecorators": false,

    // Defines a default folding range provider that takes precedence over all other folding range providers. Must be the identifier of an extension contributing a folding range provider.
    "editor.defaultFoldingRangeProvider": null,

    // Defines a default formatter which takes precedence over all other formatter settings. Must be the identifier of an extension contributing a formatter.
    "editor.defaultFormatter": null,

    // Controls whether the Go to Definition mouse gesture always opens the peek widget.
    "editor.definitionLinkOpensInPeek": false,

    // Controls whether `editor.tabSize#` and `#editor.insertSpaces` will be automatically detected when a file is opened based on the file contents.
    "editor.detectIndentation": true,

    // Controls whether the editor should allow moving selections via drag and drop.
    "editor.dragAndDrop": true,

    // Controls whether you can drag and drop a file into a text editor by holding down the `Shift` key (instead of opening the file in an editor).
    "editor.dropIntoEditor.enabled": true,

    // Controls if a widget is shown when dropping files into the editor. This widget lets you control how the file is dropped.
    //  - afterDrop: Show the drop selector widget after a file is dropped into the editor.
    //  - never: Never show the drop selector widget. Instead the default drop provider is always used.
    "editor.dropIntoEditor.showDropSelector": "afterDrop",

    // Controls whether copying without a selection copies the current line.
    "editor.emptySelectionClipboard": true,

    // Scrolling speed multiplier when pressing `Alt`.
    "editor.fastScrollSensitivity": 5,

    // Controls whether the Find Widget should add extra lines on top of the editor. When true, you can scroll beyond the first line when the Find Widget is visible.
    "editor.find.addExtraSpaceOnTop": true,

    // Controls the condition for turning on Find in Selection automatically.
    //  - never: Never turn on Find in Selection automatically (default).
    //  - always: Always turn on Find in Selection automatically.
    //  - multiline: Turn on Find in Selection automatically when multiple lines of content are selected.
    "editor.find.autoFindInSelection": "never",

    // Controls whether the cursor should jump to find matches while typing.
    "editor.find.cursorMoveOnType": true,

    // Controls whether the Find Widget should read or modify the shared find clipboard on macOS.
    "editor.find.globalFindClipboard": false,

    // Controls whether the search automatically restarts from the beginning (or the end) when no further matches can be found.
    "editor.find.loop": true,

    // Controls whether the search string in the Find Widget is seeded from the editor selection.
    //  - never: Never seed search string from the editor selection.
    //  - always: Always seed search string from the editor selection, including word at cursor position.
    //  - selection: Only seed search string from the editor selection.
    "editor.find.seedSearchStringFromSelection": "always",

    // Controls whether the editor has code folding enabled.
    "editor.folding": true,

    // Controls whether the editor should highlight folded ranges.
    "editor.foldingHighlight": true,

    // Controls whether the editor automatically collapses import ranges.
    "editor.foldingImportsByDefault": false,

    // The maximum number of foldable regions. Increasing this value may result in the editor becoming less responsive when the current source has a large number of foldable regions.
    "editor.foldingMaximumRegions": 5000,

    // Controls the strategy for computing folding ranges.
    //  - auto: Use a language-specific folding strategy if available, else the indentation-based one.
    //  - indentation: Use the indentation-based folding strategy.
    "editor.foldingStrategy": "auto",

    // Controls the font family.
    "editor.fontFamily": "Consolas, 'Courier New', monospace",

    // Configures font ligatures or font features. Can be either a boolean to enable/disable ligatures or a string for the value of the CSS 'font-feature-settings' property.
    "editor.fontLigatures": false,

    // Controls the font size in pixels.
    "editor.fontSize": 14,

    // Configures font variations. Can be either a boolean to enable/disable the translation from font-weight to font-variation-settings or a string for the value of the CSS 'font-variation-settings' property.
    "editor.fontVariations": false,

    // Controls the font weight. Accepts "normal" and "bold" keywords or numbers between 1 and 1000.
    "editor.fontWeight": "normal",

    // Controls whether the editor should automatically format the pasted content. A formatter must be available and the formatter should be able to format a range in a document.
    "editor.formatOnPaste": false,

    // Format a file on save. A formatter must be available, the file must not be saved after delay, and the editor must not be shutting down.
    "editor.formatOnSave": false,

    // Controls if format on save formats the whole file or only modifications. Only applies when `editor.formatOnSave` is enabled.
    //  - file: Format the whole file.
    //  - modifications: Format modifications (requires source control).
    //  - modificationsIfAvailable: Will attempt to format modifications only (requires source control). If source control can't be used, then the whole file will be formatted.
    "editor.formatOnSaveMode": "file",

    // Controls whether the editor should automatically format the line after typing.
    "editor.formatOnType": false,

    // Controls whether the editor should render the vertical glyph margin. Glyph margin is mostly used for debugging.
    "editor.glyphMargin": true,

    // Alternative command id that is being executed when the result of 'Go to Declaration' is the current location.
    "editor.gotoLocation.alternativeDeclarationCommand": "editor.action.goToReferences",

    // Alternative command id that is being executed when the result of 'Go to Definition' is the current location.
    "editor.gotoLocation.alternativeDefinitionCommand": "editor.action.goToReferences",

    // Alternative command id that is being executed when the result of 'Go to Implementation' is the current location.
    "editor.gotoLocation.alternativeImplementationCommand": "",

    // Alternative command id that is being executed when the result of 'Go to Reference' is the current location.
    "editor.gotoLocation.alternativeReferenceCommand": "",

    // Alternative command id that is being executed when the result of 'Go to Type Definition' is the current location.
    "editor.gotoLocation.alternativeTypeDefinitionCommand": "editor.action.goToReferences",

    // Controls the behavior the 'Go to Declaration'-command when multiple target locations exist.
    //  - peek: Show Peek view of the results (default)
    //  - gotoAndPeek: Go to the primary result and show a Peek view
    //  - goto: Go to the primary result and enable Peek-less navigation to others
    "editor.gotoLocation.multipleDeclarations": "peek",

    // Controls the behavior the 'Go to Definition'-command when multiple target locations exist.
    //  - peek: Show Peek view of the results (default)
    //  - gotoAndPeek: Go to the primary result and show a Peek view
    //  - goto: Go to the primary result and enable Peek-less navigation to others
    "editor.gotoLocation.multipleDefinitions": "peek",

    // Controls the behavior the 'Go to Implementations'-command when multiple target locations exist.
    //  - peek: Show Peek view of the results (default)
    //  - gotoAndPeek: Go to the primary result and show a Peek view
    //  - goto: Go to the primary result and enable Peek-less navigation to others
    "editor.gotoLocation.multipleImplementations": "peek",

    // Controls the behavior the 'Go to References'-command when multiple target locations exist.
    //  - peek: Show Peek view of the results (default)
    //  - gotoAndPeek: Go to the primary result and show a Peek view
    //  - goto: Go to the primary result and enable Peek-less navigation to others
    "editor.gotoLocation.multipleReferences": "peek",

    // Controls the behavior the 'Go to Type Definition'-command when multiple target locations exist.
    //  - peek: Show Peek view of the results (default)
    //  - gotoAndPeek: Go to the primary result and show a Peek view
    //  - goto: Go to the primary result and enable Peek-less navigation to others
    "editor.gotoLocation.multipleTypeDefinitions": "peek",

    // Controls whether bracket pair guides are enabled or not.
    //  - true: Enables bracket pair guides.
    //  - active: Enables bracket pair guides only for the active bracket pair.
    //  - false: Disables bracket pair guides.
    "editor.guides.bracketPairs": false,

    // Controls whether horizontal bracket pair guides are enabled or not.
    //  - true: Enables horizontal guides as addition to vertical bracket pair guides.
    //  - active: Enables horizontal guides only for the active bracket pair.
    //  - false: Disables horizontal bracket pair guides.
    "editor.guides.bracketPairsHorizontal": "active",

    // Controls whether the editor should highlight the active bracket pair.
    "editor.guides.highlightActiveBracketPair": true,

    // Controls whether the editor should highlight the active indent guide.
    //  - true: Highlights the active indent guide.
    //  - always: Highlights the active indent guide even if bracket guides are highlighted.
    //  - false: Do not highlight the active indent guide.
    "editor.guides.highlightActiveIndentation": true,

    // Controls whether the editor should render indent guides.
    "editor.guides.indentation": true,

    // Controls whether the cursor should be hidden in the overview ruler.
    "editor.hideCursorInOverviewRuler": false,

    // Prefer showing hovers above the line, if there's space.
    "editor.hover.above": true,

    // Controls the delay in milliseconds after which the hover is shown.
    "editor.hover.delay": 300,

    // Controls whether the hover is shown.
    "editor.hover.enabled": true,

    // Controls the delay in milliseconds after which the hover is hidden.
    "editor.hover.hidingDelay": 300,

    // Controls whether the hover should remain visible when mouse is moved over it.
    "editor.hover.sticky": true,

    // The number of spaces used for indentation or `"tabSize"` to use the value from `editor.tabSize#`. This setting is overridden based on the file contents when `#editor.detectIndentation` is on.
    "editor.indentSize": "tabSize",

    // Enables the inlay hints in the editor.
    //  - on: Inlay hints are enabled
    //  - onUnlessPressed: Inlay hints are showing by default and hide when holding Ctrl+Alt
    //  - offUnlessPressed: Inlay hints are hidden by default and show when holding Ctrl+Alt
    //  - off: Inlay hints are disabled
    "editor.inlayHints.enabled": "on",

    // Controls font family of inlay hints in the editor. When set to empty, the `editor.fontFamily` is used.
    "editor.inlayHints.fontFamily": "",

    // Controls font size of inlay hints in the editor. As default the `editor.fontSize` is used when the configured value is less than `5` or greater than the editor font size.
    "editor.inlayHints.fontSize": 0,

    // Enables the padding around the inlay hints in the editor.
    "editor.inlayHints.padding": false,

    // Controls whether the accessibility hint should be provided to screen reader users when an inline completion is shown.
    "editor.inlineCompletionsAccessibilityVerbose": false,

    // Controls whether to automatically show inline suggestions in the editor.
    "editor.inlineSuggest.enabled": true,

    // Controls the font family of the inline suggestions.
    "editor.inlineSuggest.fontFamily": "default",

    // Controls when to show the inline suggestion toolbar.
    //  - always: Show the inline suggestion toolbar whenever an inline suggestion is shown.
    //  - onHover: Show the inline suggestion toolbar when hovering over an inline suggestion.
    //  - never: Never show the inline suggestion toolbar.
    "editor.inlineSuggest.showToolbar": "onHover",

    // Controls how inline suggestions interact with the suggest widget. If enabled, the suggest widget is not shown automatically when inline suggestions are available.
    "editor.inlineSuggest.suppressSuggestions": false,

    // Insert spaces when pressing `Tab`. This setting is overridden based on the file contents when `editor.detectIndentation` is on.
    "editor.insertSpaces": true,

    // Defines the bracket symbols that increase or decrease the indentation.
    "editor.language.brackets": null,

    // Defines the bracket pairs that are colorized by their nesting level if bracket pair colorization is enabled.
    "editor.language.colorizedBracketPairs": null,

    // Special handling for large files to disable certain memory intensive features.
    "editor.largeFileOptimizations": true,

    // Controls the letter spacing in pixels.
    "editor.letterSpacing": 0,

    // Enables the Code Action lightbulb in the editor.
    //  - off: Disable the code action menu.
    //  - onCode: Show the code action menu when the cursor is on lines with code.
    //  - on: Show the code action menu when the cursor is on lines with code or on empty lines.
    "editor.lightbulb.enabled": "on",

    // Controls the line height.
    //  - Use 0 to automatically compute the line height from the font size.
    //  - Values between 0 and 8 will be used as a multiplier with the font size.
    //  - Values greater than or equal to 8 will be used as effective values.
    "editor.lineHeight": 0,

    // Controls the display of line numbers.
    //  - off: Line numbers are not rendered.
    //  - on: Line numbers are rendered as absolute number.
    //  - relative: Line numbers are rendered as distance in lines to cursor position.
    //  - interval: Line numbers are rendered every 10 lines.
    "editor.lineNumbers": "on",

    // Controls whether the editor has linked editing enabled. Depending on the language, related symbols such as HTML tags, are updated while editing.
    "editor.linkedEditing": false,

    // Controls whether the editor should detect links and make them clickable.
    "editor.links": true,

    // Highlight matching brackets.
    "editor.matchBrackets": "always",

    // Lines above this length will not be tokenized for performance reasons
    "editor.maxTokenizationLineLength": 20000,

    // Controls whether the minimap is hidden automatically.
    "editor.minimap.autohide": false,

    // Controls whether the minimap is shown.
    "editor.minimap.enabled": true,

    // Limit the width of the minimap to render at most a certain number of columns.
    "editor.minimap.maxColumn": 120,

    // Render the actual characters on a line as opposed to color blocks.
    "editor.minimap.renderCharacters": true,

    // Scale of content drawn in the minimap: 1, 2 or 3.
    "editor.minimap.scale": 1,

    // Controls the font size of section headers in the minimap.
    "editor.minimap.sectionHeaderFontSize": 9,

    // Controls the amount of space (in pixels) between characters of section header.
    "editor.minimap.sectionHeaderLetterSpacing": 1,

    // Controls whether MARK: comments are shown as section headers in the minimap.
    "editor.minimap.showMarkSectionHeaders": true,

    // Controls whether named regions are shown as section headers in the minimap.
    "editor.minimap.showRegionSectionHeaders": true,

    // Controls when the minimap slider is shown.
    "editor.minimap.showSlider": "mouseover",

    // Controls the side where to render the minimap.
    "editor.minimap.side": "right",

    // Controls the size of the minimap.
    //  - proportional: The minimap has the same size as the editor contents (and might scroll).
    //  - fill: The minimap will stretch or shrink as necessary to fill the height of the editor (no scrolling).
    //  - fit: The minimap will shrink as necessary to never be larger than the editor (no scrolling).
    "editor.minimap.size": "proportional",

    // A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
    "editor.mouseWheelScrollSensitivity": 1,

    // Zoom the font of the editor when using mouse wheel and holding `Ctrl`.
    "editor.mouseWheelZoom": false,

    // Controls the max number of cursors that can be in an active editor at once.
    "editor.multiCursorLimit": 10000,

    // Merge multiple cursors when they are overlapping.
    "editor.multiCursorMergeOverlapping": true,

    // The modifier to be used to add multiple cursors with the mouse. The Go to Definition and Open Link mouse gestures will adapt such that they do not conflict with the multicursor modifier.
    //  - ctrlCmd: Maps to `Control` on Windows and Linux and to `Command` on macOS.
    //  - alt: Maps to `Alt` on Windows and Linux and to `Option` on macOS.
    "editor.multiCursorModifier": "alt",

    // Controls pasting when the line count of the pasted text matches the cursor count.
    //  - spread: Each cursor pastes a single line of the text.
    //  - full: Each cursor pastes the full text.
    "editor.multiCursorPaste": "spread",

    // Controls whether occurrences should be highlighted across open files.
    //  - off: Does not highlight occurrences.
    //  - singleFile: Highlights occurrences only in the current file.
    //  - multiFile: Experimental: Highlights occurrences across all valid open files.
    "editor.occurrencesHighlight": "singleFile",

    // Controls whether a border should be drawn around the overview ruler.
    "editor.overviewRulerBorder": true,

    // Controls the amount of space between the bottom edge of the editor and the last line.
    "editor.padding.bottom": 0,

    // Controls the amount of space between the top edge of the editor and the first line.
    "editor.padding.top": 0,

    // Controls whether the parameter hints menu cycles or closes when reaching the end of the list.
    "editor.parameterHints.cycle": true,

    // Enables a pop-up that shows parameter documentation and type information as you type.
    "editor.parameterHints.enabled": true,

    // Controls whether you can paste content in different ways.
    "editor.pasteAs.enabled": true,

    // Controls if a widget is shown when pasting content in to the editor. This widget lets you control how the file is pasted.
    //  - afterPaste: Show the paste selector widget after content is pasted into the editor.
    //  - never: Never show the paste selector widget. Instead the default pasting behavior is always used.
    "editor.pasteAs.showPasteSelector": "afterPaste",

    // Controls whether to focus the inline editor or the tree in the peek widget.
    //  - tree: Focus the tree when opening peek
    //  - editor: Focus the editor when opening peek
    "editor.peekWidgetDefaultFocus": "tree",

    // Controls whether suggestions should automatically show up while typing.
    "editor.quickSuggestions": {
        "other": "on",
        "comments": "off",
        "strings": "off"
    },

    // Controls the delay in milliseconds after which quick suggestions will show up.
    "editor.quickSuggestionsDelay": 10,

    // Enable/disable the ability to preview changes before renaming
    "editor.rename.enablePreview": true,

    // Controls whether the editor should render control characters.
    "editor.renderControlCharacters": true,

    // Render last line number when the file ends with a newline.
    "editor.renderFinalNewline": "on",

    // Controls how the editor should render the current line highlight.
    //  - none
    //  - gutter
    //  - line
    //  - all: Highlights both the gutter and the current line.
    "editor.renderLineHighlight": "line",

    // Controls if the editor should render the current line highlight only when the editor is focused.
    "editor.renderLineHighlightOnlyWhenFocus": false,

    // Controls how the editor should render whitespace characters.
    //  - none
    //  - boundary: Render whitespace characters except for single spaces between words.
    //  - selection: Render whitespace characters only on selected text.
    //  - trailing: Render only trailing whitespace characters.
    //  - all
    "editor.renderWhitespace": "selection",

    // Controls whether selections should have rounded corners.
    "editor.roundedSelection": true,

    // Render vertical rulers after a certain number of monospace characters. Use multiple values for multiple rulers. No rulers are drawn if array is empty.
    "editor.rulers": [],

    // Control whether inline suggestions are announced by a screen reader.
    "editor.screenReaderAnnounceInlineSuggestion": true,

    // Controls the visibility of the horizontal scrollbar.
    //  - auto: The horizontal scrollbar will be visible only when necessary.
    //  - visible: The horizontal scrollbar will always be visible.
    //  - hidden: The horizontal scrollbar will always be hidden.
    "editor.scrollbar.horizontal": "auto",

    // The height of the horizontal scrollbar.
    "editor.scrollbar.horizontalScrollbarSize": 12,

    // When set, the horizontal scrollbar will not increase the size of the editor's content.
    "editor.scrollbar.ignoreHorizontalScrollbarInContentHeight": false,

    // Controls whether clicks scroll by page or jump to click position.
    "editor.scrollbar.scrollByPage": false,

    // Controls the visibility of the vertical scrollbar.
    //  - auto: The vertical scrollbar will be visible only when necessary.
    //  - visible: The vertical scrollbar will always be visible.
    //  - hidden: The vertical scrollbar will always be hidden.
    "editor.scrollbar.vertical": "auto",

    // The width of the vertical scrollbar.
    "editor.scrollbar.verticalScrollbarSize": 14,

    // Controls the number of extra characters beyond which the editor will scroll horizontally.
    "editor.scrollBeyondLastColumn": 4,

    // Controls whether the editor will scroll beyond the last line.
    "editor.scrollBeyondLastLine": true,

    // Controls whether the Linux primary clipboard should be supported.
    "editor.selectionClipboard": true,

    // Scroll only along the predominant axis when scrolling both vertically and horizontally at the same time. Prevents horizontal drift when scrolling vertically on a trackpad.
    "editor.scrollPredominantAxis": true,

    // Controls whether the editor should highlight matches similar to the selection.
    "editor.selectionHighlight": true,

    // Controls whether the semanticHighlighting is shown for the languages that support it.
    //  - true: Semantic highlighting enabled for all color themes.
    //  - false: Semantic highlighting disabled for all color themes.
    //  - configuredByTheme: Semantic highlighting is configured by the current color theme's `semanticHighlighting` setting.
    "editor.semanticHighlighting.enabled": "configuredByTheme",

    // Overrides editor semantic token color and styles from the currently selected color theme.
    "editor.semanticTokenColorCustomizations": {},

    // Controls strikethrough deprecated variables.
    "editor.showDeprecated": true,

    // Controls when the folding controls on the gutter are shown.
    //  - always: Always show the folding controls.
    //  - never: Never show the folding controls and reduce the gutter size.
    //  - mouseover: Only show the folding controls when the mouse is over the gutter.
    "editor.showFoldingControls": "mouseover",

    // Controls fading out of unused code.
    "editor.showUnused": true,

    // Whether leading and trailing whitespace should always be selected.
    "editor.smartSelect.selectLeadingAndTrailingWhitespace": true,

    // Whether subwords (like 'foo' in 'fooBar' or 'foo_bar') should be selected.
    "editor.smartSelect.selectSubwords": true,

    // Controls whether the editor will scroll using an animation.
    "editor.smoothScrolling": false,

    // Controls if surround-with-snippets or file template snippets show as Code Actions.
    "editor.snippets.codeActions.enabled": true,

    // Controls whether snippets are shown with other suggestions and how they are sorted.
    //  - top: Show snippet suggestions on top of other suggestions.
    //  - bottom: Show snippet suggestions below other suggestions.
    //  - inline: Show snippets suggestions with other suggestions.
    //  - none: Do not show snippet suggestions.
    "editor.snippetSuggestions": "inline",

    // Keep peek editors open even when double-clicking their content or when hitting `Escape`.
    "editor.stablePeek": false,

    // Defines the model to use for determining which lines to stick. If the outline model does not exist, it will fall back on the folding provider model which falls back on the indentation model. This order is respected in all three cases.
    "editor.stickyScroll.defaultModel": "outlineModel",

    // Shows the nested current scopes during the scroll at the top of the editor.
    "editor.stickyScroll.enabled": true,

    // Defines the maximum number of sticky lines to show.
    "editor.stickyScroll.maxLineCount": 5,

    // Enable scrolling of Sticky Scroll with the editor's horizontal scrollbar.
    "editor.stickyScroll.scrollWithEditor": true,

    // Emulate selection behavior of tab characters when using spaces for indentation. Selection will stick to tab stops.
    "editor.stickyTabStops": false,

    // Controls whether filtering and sorting suggestions accounts for small typos.
    "editor.suggest.filterGraceful": true,

    // Controls whether words are overwritten when accepting completions. Note that this depends on extensions opting into this feature.
    //  - insert: Insert suggestion without overwriting text right of the cursor.
    //  - replace: Insert suggestion and overwrite text right of the cursor.
    "editor.suggest.insertMode": "insert",

    // Controls whether sorting favors words that appear close to the cursor.
    "editor.suggest.localityBonus": false,

    // When enabled IntelliSense filtering requires that the first character matches on a word start. For example, `c` on `Console` or `WebContext` but not on `description`.
    "editor.suggest.matchOnWordStartOnly": true,

    // Controls whether to preview the suggestion outcome in the editor.
    "editor.suggest.preview": false,

    // Controls whether a suggestion is selected when the widget shows.
    //  - always: Always select a suggestion when automatically triggering IntelliSense.
    //  - never: Never select a suggestion when automatically triggering IntelliSense.
    //  - whenTriggerCharacter: Select a suggestion only when triggering IntelliSense from a trigger character.
    //  - whenQuickSuggestion: Select a suggestion only when triggering IntelliSense as you type.
    "editor.suggest.selectionMode": "always",

    // Controls whether remembered suggestion selections are shared between multiple workspaces and windows (needs `editor.suggestSelection`).
    "editor.suggest.shareSuggestSelections": false,

    // When enabled IntelliSense shows `class`-suggestions.
    "editor.suggest.showClasses": true,

    // When enabled IntelliSense shows `color`-suggestions.
    "editor.suggest.showColors": true,

    // When enabled IntelliSense shows `constant`-suggestions.
    "editor.suggest.showConstants": true,

    // When enabled IntelliSense shows `constructor`-suggestions.
    "editor.suggest.showConstructors": true,

    // When enabled IntelliSense shows `customcolor`-suggestions.
    "editor.suggest.showCustomcolors": true,

    // When enabled IntelliSense shows `deprecated`-suggestions.
    "editor.suggest.showDeprecated": true,

    // When enabled IntelliSense shows `enumMember`-suggestions.
    "editor.suggest.showEnumMembers": true,

    // When enabled IntelliSense shows `enum`-suggestions.
    "editor.suggest.showEnums": true,

    // When enabled IntelliSense shows `event`-suggestions.
    "editor.suggest.showEvents": true,

    // When enabled IntelliSense shows `field`-suggestions.
    "editor.suggest.showFields": true,

    // When enabled IntelliSense shows `file`-suggestions.
    "editor.suggest.showFiles": true,

    // When enabled IntelliSense shows `folder`-suggestions.
    "editor.suggest.showFolders": true,

    // When enabled IntelliSense shows `function`-suggestions.
    "editor.suggest.showFunctions": true,

    // Controls whether to show or hide icons in suggestions.
    "editor.suggest.showIcons": true,

    // Controls whether suggest details show inline with the label or only in the details widget.
    "editor.suggest.showInlineDetails": true,

    // When enabled IntelliSense shows `interface`-suggestions.
    "editor.suggest.showInterfaces": true,

    // When enabled IntelliSense shows `issues`-suggestions.
    "editor.suggest.showIssues": true,

    // When enabled IntelliSense shows `keyword`-suggestions.
    "editor.suggest.showKeywords": true,

    // When enabled IntelliSense shows `method`-suggestions.
    "editor.suggest.showMethods": true,

    // When enabled IntelliSense shows `module`-suggestions.
    "editor.suggest.showModules": true,

    // When enabled IntelliSense shows `operator`-suggestions.
    "editor.suggest.showOperators": true,

    // When enabled IntelliSense shows `property`-suggestions.
    "editor.suggest.showProperties": true,

    // When enabled IntelliSense shows `reference`-suggestions.
    "editor.suggest.showReferences": true,

    // When enabled IntelliSense shows `snippet`-suggestions.
    "editor.suggest.showSnippets": true,

    // Controls the visibility of the status bar at the bottom of the suggest widget.
    "editor.suggest.showStatusBar": false,

    // When enabled IntelliSense shows `struct`-suggestions.
    "editor.suggest.showStructs": true,

    // When enabled IntelliSense shows `typeParameter`-suggestions.
    "editor.suggest.showTypeParameters": true,

    // When enabled IntelliSense shows `unit`-suggestions.
    "editor.suggest.showUnits": true,

    // When enabled IntelliSense shows `user`-suggestions.
    "editor.suggest.showUsers": true,

    // When enabled IntelliSense shows `value`-suggestions.
    "editor.suggest.showValues": true,

    // When enabled IntelliSense shows `variable`-suggestions.
    "editor.suggest.showVariables": true,

    // When enabled IntelliSense shows `text`-suggestions.
    "editor.suggest.showWords": true,

    // Controls whether an active snippet prevents quick suggestions.
    "editor.suggest.snippetsPreventQuickSuggestions": false,

    // Font size for the suggest widget. When set to `0`, the value of `editor.fontSize` is used.
    "editor.suggestFontSize": 0,

    // Line height for the suggest widget. When set to `0`, the value of `editor.lineHeight` is used. The minimum value is 8.
    "editor.suggestLineHeight": 0,

    // Controls whether suggestions should automatically show up when typing trigger characters.
    "editor.suggestOnTriggerCharacters": true,

    // Controls how suggestions are pre-selected when showing the suggest list.
    //  - first: Always select the first suggestion.
    //  - recentlyUsed: Select recent suggestions unless further typing selects one, e.g. `console.| -> console.log` because `log` has been completed recently.
    //  - recentlyUsedByPrefix: Select suggestions based on previous prefixes that have completed those suggestions, e.g. `co -> console` and `con -> const`.
    "editor.suggestSelection": "first",

    // Enables tab completions.
    //  - on: Tab complete will insert the best matching suggestion when pressing tab.
    //  - off: Disable tab completions.
    //  - onlySnippets: Tab complete snippets when their prefix match. Works best when 'quickSuggestions' aren't enabled.
    "editor.tabCompletion": "off",

    // Controls whether the editor receives tabs or defers them to the workbench for navigation.
    "editor.tabFocusMode": false,

    // The number of spaces a tab is equal to. This setting is overridden based on the file contents when `editor.detectIndentation` is on.
    "editor.tabSize": 4,

    // Overrides editor syntax colors and font style from the currently selected color theme.
    "editor.tokenColorCustomizations": {},

    // Remove trailing auto inserted whitespace.
    "editor.trimAutoWhitespace": true,

    // Controls whether clicking on the empty content after a folded line will unfold the line.
    "editor.unfoldOnClickAfterEndOfLine": false,

    // Defines allowed characters that are not being highlighted.
    "editor.unicodeHighlight.allowedCharacters": {},

    // Unicode characters that are common in allowed locales are not being highlighted.
    "editor.unicodeHighlight.allowedLocales": {
        "_os": true,
        "_vscode": true
    },

    // Controls whether characters are highlighted that can be confused with basic ASCII characters, except those that are common in the current user locale.
    "editor.unicodeHighlight.ambiguousCharacters": true,

    // Controls whether characters in comments should also be subject to Unicode highlighting.
    "editor.unicodeHighlight.includeComments": "inUntrustedWorkspace",

    // Controls whether characters in strings should also be subject to Unicode highlighting.
    "editor.unicodeHighlight.includeStrings": true,

    // Controls whether characters that just reserve space or have no width at all are highlighted.
    "editor.unicodeHighlight.invisibleCharacters": true,

    // Controls whether all non-basic ASCII characters are highlighted. Only characters between U+0020 and U+007E, tab, line-feed and carriage-return are considered basic ASCII.
    "editor.unicodeHighlight.nonBasicASCII": "inUntrustedWorkspace",

    // Remove unusual line terminators that might cause problems.
    //  - auto: Unusual line terminators are automatically removed.
    //  - off: Unusual line terminators are ignored.
    //  - prompt: Unusual line terminators prompt to be removed.
    "editor.unusualLineTerminators": "prompt",

    // Inserting and deleting whitespace follows tab stops.
    "editor.useTabStops": true,

    // Controls whether completions should be computed based on words in the document and from which documents they are computed.
    //  - off: Turn off Word Based Suggestions.
    //  - currentDocument: Only suggest words from the active document.
    //  - matchingDocuments: Suggest words from all open documents of the same language.
    //  - allDocuments: Suggest words from all open documents.
    "editor.wordBasedSuggestions": "matchingDocuments",

    // Controls the word break rules used for Chinese/Japanese/Korean (CJK) text.
    //  - normal: Use the default line break rule.
    //  - keepAll: Word breaks should not be used for Chinese/Japanese/Korean (CJK) text. Non-CJK text behavior is the same as for normal.
    "editor.wordBreak": "normal",

    "editor.wordSegmenterLocales": null,

    // Characters that will be used as word separators when doing word related navigations or operations.
    "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

    // Controls how lines should wrap.
    //  - off: Lines will never wrap.
    //  - on: Lines will wrap at the viewport width.
    //  - wordWrapColumn: Lines will wrap at `editor.wordWrapColumn`.
    //  - bounded: Lines will wrap at the minimum of viewport and `editor.wordWrapColumn`.
    "editor.wordWrap": "off",

    // Controls the wrapping column of the editor when `editor.wordWrap` is `wordWrapColumn` or `bounded`.
    "editor.wordWrapColumn": 80,

    // Controls the indentation of wrapped lines.
    //  - none: No indentation. Wrapped lines begin at column 1.
    //  - same: Wrapped lines get the same indentation as the parent.
    //  - indent: Wrapped lines get +1 indentation toward the parent.
    //  - deepIndent: Wrapped lines get +2 indentation toward the parent.
    "editor.wrappingIndent": "same",

    // Controls the algorithm that computes wrapping points. Note that when in accessibility mode, advanced will be used for the best experience.
    //  - simple: Assumes that all characters are of the same width. This is a fast algorithm that works correctly for monospace fonts and certain scripts (like Latin characters) where glyphs are of equal width.
    //  - advanced: Delegates wrapping points computation to the browser. This is a slow algorithm, that might cause freezes for large files, but it works correctly in all cases.
    "editor.wrappingStrategy": "simple",

// Chat

    // Whether pending inline chat sessions prevent saving.
    "inlineChat.acceptedOrDiscardBeforeSave": true,

    // Whether the inline chat also renders an accessible diff viewer for its changes.
    //  - auto: The accessible diff viewer is based on screen reader mode being enabled.
    //  - on: The accessible diff viewer is always enabled.
    //  - off: The accessible diff viewer is never enabled.
    "inlineChat.accessibleDiffView": "auto",

    // Whether to finish an inline chat session when typing outside of changed regions.
    "inlineChat.finishOnType": false,

    // Whether holding the inline chat keybinding will automatically enable speech recognition.
    "inlineChat.holdToSpeech": true,

    // Configure if changes crafted with inline chat are applied directly to the document or are previewed first.
    //  - live: Changes are applied directly to the document, can be highlighted via inline diffs, and accepted/discarded by hunks. Ending a session will keep the changes.
    //  - preview: Changes are previewed only and need to be accepted via the apply button. Ending a session will discard the changes.
    "inlineChat.mode": "live",

// SCM

    // Controls whether inline actions are always visible in the Source Control view.
    "scm.alwaysShowActions": false,

    // Controls whether repositories should always be visible in the Source Control view.
    "scm.alwaysShowRepositories": false,

    // Controls whether the Source Control view should automatically reveal and select files when opening them.
    "scm.autoReveal": true,

    // Controls the count badge on the Source Control icon on the Activity Bar.
    //  - all: Show the sum of all Source Control Provider count badges.
    //  - focused: Show the count badge of the focused Source Control Provider.
    //  - off: Disable the Source Control count badge.
    "scm.countBadge": "all",

    // Controls the default Source Control repository view mode.
    //  - tree: Show the repository changes as a tree.
    //  - list: Show the repository changes as a list.
    "scm.defaultViewMode": "list",

    // Controls the default Source Control repository changes sort order when viewed as a list.
    //  - name: Sort the repository changes by file name.
    //  - path: Sort the repository changes by path.
    //  - status: Sort the repository changes by Source Control status.
    "scm.defaultViewSortKey": "path",

    // Controls diff decorations in the editor.
    //  - all: Show the diff decorations in all available locations.
    //  - gutter: Show the diff decorations only in the editor gutter.
    //  - overview: Show the diff decorations only in the overview ruler.
    //  - minimap: Show the diff decorations only in the minimap.
    //  - none: Do not show the diff decorations.
    "scm.diffDecorations": "all",

    // Controls the behavior of Source Control diff gutter decorations.
    //  - diff: Show the inline diff Peek view on click.
    //  - none: Do nothing.
    "scm.diffDecorationsGutterAction": "diff",

    // Controls whether a pattern is used for the diff decorations in gutter.
    "scm.diffDecorationsGutterPattern": {
        "added": false,
        "modified": true
    },

    // Controls the visibility of the Source Control diff decorator in the gutter.
    //  - always: Show the diff decorator in the gutter at all times.
    //  - hover: Show the diff decorator in the gutter only on hover.
    "scm.diffDecorationsGutterVisibility": "always",

    // Controls the width(px) of diff decorations in gutter (added & modified).
    "scm.diffDecorationsGutterWidth": 3,

    // Controls whether leading and trailing whitespace is ignored in Source Control diff gutter decorations.
    //  - true: Ignore leading and trailing whitespace.
    //  - false: Do not ignore leading and trailing whitespace.
    //  - inherit: Inherit from `diffEditor.ignoreTrimWhitespace`.
    "scm.diffDecorationsIgnoreTrimWhitespace": "false",

    // Controls the font for the input message. Use `default` for the workbench user interface font family, `editor` for the `editor.fontFamily`'s value, or a custom font family.
    "scm.inputFontFamily": "default",

    // Controls the font size for the input message in pixels.
    "scm.inputFontSize": 13,

    // Controls the maximum number of lines that the input will auto-grow to.
    "scm.inputMaxLineCount": 10,

    // Controls the minimum number of lines that the input will auto-grow from.
    "scm.inputMinLineCount": 1,

    // Controls the count badges on Source Control Provider headers.
    //  - hidden: Hide Source Control Provider count badges.
    //  - auto: Only show count badge for Source Control Provider when non-zero.
    //  - visible: Show Source Control Provider count badges.
    "scm.providerCountBadge": "hidden",

    // Controls the sort order of the repositories in the source control repositories view.
    //  - discovery time: Repositories in the Source Control Repositories view are sorted by discovery time. Repositories in the Source Control view are sorted in the order that they were selected.
    //  - name: Repositories in the Source Control Repositories and Source Control views are sorted by repository name.
    //  - path: Repositories in the Source Control Repositories and Source Control views are sorted by repository path.
    "scm.repositories.sortOrder": "discovery time",

    // Controls how many repositories are visible in the Source Control Repositories section. Set to 0, to be able to manually resize the view.
    "scm.repositories.visible": 10,

    // Controls whether an action button can be shown in the Source Control view.
    "scm.showActionButton": true,

    // Controls whether the All Changes entry is shown for incoming/outgoing changes in the Source Control view.
    "scm.showChangesSummary": true,

    // Controls whether to render incoming/outgoing changes using a graph in the Source Control view.
    "scm.showHistoryGraph": true,

    // Controls whether incoming changes are shown in the Source Control view.
    //  - always: Always show incoming changes in the Source Control view.
    //  - never: Never show incoming changes in the Source Control view.
    //  - auto: Only show incoming changes in the Source Control view when any exist.
    "scm.showIncomingChanges": "auto",

    // Controls whether an action button can be shown in the Source Control input.
    "scm.showInputActionButton": true,

    // Controls whether outgoing changes are shown in the Source Control view.
    //  - always: Always show outgoing changes in the Source Control view.
    //  - never: Never show outgoing changes in the Source Control view.
    //  - auto: Only show outgoing changes in the Source Control view when any exist.
    "scm.showOutgoingChanges": "auto",

    // Controls the default working set to use when switching to a source control history item group that does not have a working set.
    //  - empty: Use an empty working set when switching to a source control history item group that does not have a working set.
    //  - current: Use the current working set when switching to a source control history item group that does not have a working set.
    "scm.workingSets.default": "current",

    // Controls whether to store editor working sets when switching between source control history item groups.
    "scm.workingSets.enabled": false,

// Security

    // A set of UNC host names (without leading or trailing backslash, for example `192.168.0.1` or `my-server`) to allow without user confirmation. If a UNC host is being accessed that is not allowed via this setting or has not been acknowledged via user confirmation, an error will occur and the operation stopped.
    "security.allowedUNCHosts": [],

    // If enabled, a dialog will ask for confirmation whenever a local file or workspace is about to open through a protocol handler.
    "security.promptForLocalFileProtocolHandling": true,

    // If enabled, a dialog will ask for confirmation whenever a remote file or workspace is about to open through a protocol handler.
    "security.promptForRemoteFileProtocolHandling": true,

    // If enabled, only allows access to UNC host names that are allowed by the `security.allowedUNCHosts` setting or after user confirmation.
    "security.restrictUNCAccess": true,

    // Controls when the restricted mode banner is shown.
    //  - always: Show the banner every time an untrusted workspace is open.
    //  - untilDismissed: Show the banner when an untrusted workspace is opened until dismissed.
    //  - never: Do not show the banner when an untrusted workspace is open.
    "security.workspace.trust.banner": "untilDismissed",

    // Controls whether or not the empty window is trusted by default within VS Code. When used with `security.workspace.trust.untrustedFiles`, you can enable the full functionality of VS Code without prompting in an empty window.
    "security.workspace.trust.emptyWindow": true,

    // Controls whether or not Workspace Trust is enabled within VS Code.
    "security.workspace.trust.enabled": true,

    // Controls when the startup prompt to trust a workspace is shown.
    //  - always: Ask for trust every time an untrusted workspace is opened.
    //  - once: Ask for trust the first time an untrusted workspace is opened.
    //  - never: Do not ask for trust when an untrusted workspace is opened.
    "security.workspace.trust.startupPrompt": "once",

    // Controls how to handle opening untrusted files in a trusted workspace. This setting also applies to opening files in an empty window which is trusted via `security.workspace.trust.emptyWindow`.
    //  - prompt: Ask how to handle untrusted files for each workspace. Once untrusted files are introduced to a trusted workspace, you will not be prompted again.
    //  - open: Always allow untrusted files to be introduced to a trusted workspace without prompting.
    //  - newWindow: Always open untrusted files in a separate window in restricted mode without prompting.
    "security.workspace.trust.untrustedFiles": "prompt",

// Workbench

    // Whether to dim unfocused editors and terminals, which makes it more clear where typed input will go to. This works with the majority of editors with the notable exceptions of those that utilize iframes like notebooks and extension webview editors.
    "accessibility.dimUnfocused.enabled": false,

    // The opacity fraction (0.2 to 1.0) to use for unfocused editors and terminals. This will only take effect when `accessibility.dimUnfocused.enabled` is enabled.
    "accessibility.dimUnfocused.opacity": 0.75,

    // Controls whether the Accessible View is hidden.
    "accessibility.hideAccessibleView": false,

    // Controls the height of editor tabs. Also applies to the title control bar when `workbench.editor.showTabs` is not set to `multiple`.
    "window.density.editorTabHeight": "default",

    // Controls the behavior of clicking an Activity Bar icon in the workbench.
    //  - toggle: Hide the Primary Side Bar if the clicked item is already visible.
    //  - focus: Focus the Primary Side Bar if the clicked item is already visible.
    "workbench.activityBar.iconClickBehavior": "toggle",

    // Controls the location of the Activity Bar relative to the Primary and Secondary Side Bars.
    //  - default: Show the Activity Bar on the side of the Primary Side Bar and on top of the Secondary Side Bar.
    //  - top: Show the Activity Bar on top of the Primary and Secondary Side Bars.
    //  - bottom: Show the Activity Bar at the bottom of the Primary and Secondary Side Bars.
    //  - hidden: Hide the Activity Bar in the Primary and Secondary Side Bars.
    "workbench.activityBar.location": "default",

    // Controls whether to automatically resume available working changes stored in the cloud for the current workspace.
    //  - onReload: Automatically resume available working changes from the cloud on window reload.
    //  - off: Never attempt to resume working changes from the cloud.
    "workbench.cloudChanges.autoResume": "onReload",

    // Controls whether to prompt the user to store working changes in the cloud when using Continue Working On.
    //  - prompt: Prompt the user to sign in to store working changes in the cloud with Continue Working On.
    //  - off: Do not store working changes in the cloud with Continue Working On unless the user has already turned on Cloud Changes.
    "workbench.cloudChanges.continueOn": "prompt",

    // Overrides colors from the currently selected color theme.
    "workbench.colorCustomizations": {},

    // Specifies the color theme used in the workbench.
    "workbench.colorTheme": "Default Dark Modern",

    // Controls where the command palette should ask chat questions.
    //  - chatView: Ask chat questions in the Chat view.
    //  - quickChat: Ask chat questions in Quick Chat.
    "workbench.commandPalette.experimental.askChatLocation": "chatView",

    // Controls whether the command palette should include similar commands. You must have an extension installed that provides Natural Language support.
    "workbench.commandPalette.experimental.enableNaturalLanguageSearch": true,

    // Controls whether the command palette should have a list of commonly used commands.
    "workbench.commandPalette.experimental.suggestCommands": false,

    // Controls the number of recently used commands to keep in history for the command palette. Set to 0 to disable command history.
    "workbench.commandPalette.history": 50,

    // Controls whether the last typed input to the command palette should be restored when opening it the next time.
    "workbench.commandPalette.preserveInput": false,

    // Controls whether to always show the editor actions, even when the editor group is not active.
    "workbench.editor.alwaysShowEditorActions": false,

    // If an editor matching one of the listed types is opened as the first in an editor group and more than one group is open, the group is automatically locked. Locked groups will only be used for opening editors when explicitly chosen by a user gesture (for example drag and drop), but not by default. Consequently, the active editor in a locked group is less likely to be replaced accidentally with a different editor.
    "workbench.editor.autoLockGroups": {
        "default": false,
        "workbench.editor.chatSession": false,
        "workbench.editorinputs.searchEditorInput": false,
        "workbench.editors.gettingStartedInput": false,
        "repl": false,
        "terminalEditor": true,
        "imagePreview.previewEditor": false,
        "vscode.audioPreview": false,
        "vscode.videoPreview": false,
        "jsProfileVisualizer.cpuprofile.table": false,
        "jsProfileVisualizer.heapprofile.table": false,
        "jsProfileVisualizer.heapsnapshot.table": false,
        "jupyter-notebook": false,
        "workbench.input.interactive": false,
        "mainThreadWebview-markdown.preview": false,
        "mainThreadWebview-simpleBrowser.view": true,
        "mainThreadWebview-browserPreview": true
    },

    // Controls if the centered layout should automatically resize to maximum width when more than one group is open. Once only one group is open it will resize back to the original centered width.
    "workbench.editor.centeredLayoutAutoResize": true,

    // Controls whether the centered layout tries to maintain constant width when the window is resized.
    "workbench.editor.centeredLayoutFixedWidth": false,

    // Controls the behavior of empty editor groups when the last tab in the group is closed. When enabled, empty groups will automatically close. When disabled, empty groups will remain part of the grid.
    "workbench.editor.closeEmptyGroups": true,

    // Controls whether editors showing a file that was opened during the session should close automatically when getting deleted or renamed by some other process. Disabling this will keep the editor open  on such an event. Note that deleting from within the application will always close the editor and that editors with unsaved changes will never close to preserve your data.
    "workbench.editor.closeOnFileDelete": false,

    // Controls whether the custom workbench editor labels should be applied.
    "workbench.editor.customLabels.enabled": true,

    // Controls the rendering of the editor label. Each __Item__ is a pattern that matches a file path. Both relative and absolute file paths are supported. In case multiple patterns match, the longest matching path will be picked. Each __Value__ is the template for the rendered editor when the __Item__ matches.
    "workbench.editor.customLabels.patterns": {},

    // Controls whether editor file decorations should use badges.
    "workbench.editor.decorations.badges": true,

    // Controls whether editor file decorations should use colors.
    "workbench.editor.decorations.colors": true,

    // The default editor for files detected as binary. If undefined, the user will be presented with a picker.
    "workbench.editor.defaultBinaryEditor": "",

    // Controls how the editor group is resized when double clicking on a tab. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    //  - maximize: All other editor groups are hidden and the current editor group is maximized to take up the entire editor area.
    //  - expand: The editor group takes as much space as possible by making all other editor groups as small as possible.
    //  - off: No editor group is resized when double clicking on a tab.
    "workbench.editor.doubleClickTabToToggleEditorGroupSizes": "expand",

    // Controls if editors can be dragged out of the window to open them in a new window. Press and hold the `Alt` key while dragging to toggle this dynamically.
    "workbench.editor.dragToOpenWindow": true,

    // Controls where the editor actions are shown.
    //  - default: Show editor actions in the window title bar when `workbench.editor.showTabs` is set to `none`. Otherwise, editor actions are shown in the editor tab bar.
    //  - titleBar: Show editor actions in the window title bar. If `window.customTitleBarVisibility` is set to `never`, editor actions are hidden.
    //  - hidden: Editor actions are not shown.
    "workbench.editor.editorActionsLocation": "default",

    // Controls if the empty editor text hint should be visible in the editor.
    "workbench.editor.empty.hint": "text",

    // Controls whether opened editors show as preview editors. Preview editors do not stay open, are reused until explicitly set to be kept open (via double-click or editing), and show file names in italics.
    "workbench.editor.enablePreview": true,

    // Controls whether editors remain in preview when a code navigation is started from them. Preview editors do not stay open, and are reused until explicitly set to be kept open (via double-click or editing). This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.enablePreviewFromCodeNavigation": false,

    // Controls whether editors opened from Quick Open show as preview editors. Preview editors do not stay open, and are reused until explicitly set to be kept open (via double-click or editing). When enabled, hold Ctrl before selection to open an editor as a non-preview. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.enablePreviewFromQuickOpen": false,

    // Controls whether editors are closed in most recently used order or from left to right.
    "workbench.editor.focusRecentEditorAfterClose": true,

    // Controls whether a top border is drawn on tabs for editors that have unsaved changes. This value is ignored when `workbench.editor.showTabs` is not set to multiple.
    "workbench.editor.highlightModifiedTabs": false,

    // Enables use of editor history in language detection. This causes automatic language detection to favor languages that have been recently opened and allows for automatic language detection to operate with smaller inputs.
    "workbench.editor.historyBasedLanguageDetection": true,

    // Controls the format of the label for an editor.
    //  - default: Show the name of the file. When tabs are enabled and two files have the same name in one group the distinguishing sections of each file's path are added. When tabs are disabled, the path relative to the workspace folder is shown if the editor is active.
    //  - short: Show the name of the file followed by its directory name.
    //  - medium: Show the name of the file followed by its path relative to the workspace folder.
    //  - long: Show the name of the file followed by its absolute path.
    "workbench.editor.labelFormat": "default",

    // Controls whether the language in a text editor is automatically detected unless the language has been explicitly set by the language picker. This can also be scoped by language so you can specify which languages you do not want to be switched off of. This is useful for languages like Markdown that often contain other languages that might trick language detection into thinking it's the embedded language and not Markdown.
    "workbench.editor.languageDetection": true,

    // When enabled, shows a Status bar Quick Fix when the editor language doesn't match detected content language.
    "workbench.editor.languageDetectionHints": {
        "untitledEditors": true,
        "notebookEditors": true
    },

    // Controls if the number of opened editors should be limited or not. When enabled, less recently used editors will close to make space for newly opening editors.
    "workbench.editor.limit.enabled": false,

    // Controls if the maximum number of opened editors should exclude dirty editors for counting towards the configured limit.
    "workbench.editor.limit.excludeDirty": false,

    // Controls if the limit of maximum opened editors should apply per editor group or across all editor groups.
    "workbench.editor.limit.perEditorGroup": false,

    // Controls the maximum number of opened editors. Use the `workbench.editor.limit.perEditorGroup` setting to control this limit per editor group or across all groups.
    "workbench.editor.limit.value": 10,

    // Enables the use of mouse buttons four and five for commands 'Go Back' and 'Go Forward'.
    "workbench.editor.mouseBackForwardToNavigate": true,

    // Controls the scope of history navigation in editors for commands such as 'Go Back' and 'Go Forward'.
    //  - default: Navigate across all opened editors and editor groups.
    //  - editorGroup: Navigate only in editors of the active editor group.
    //  - editor: Navigate only in the active editor.
    "workbench.editor.navigationScope": "default",

    // Controls where editors open. Select `left` or `right` to open editors to the left or right of the currently active one. Select `first` or `last` to open editors independently from the currently active one.
    "workbench.editor.openPositioning": "right",

    // Controls the default direction of editors that are opened side by side (for example, from the Explorer). By default, editors will open on the right hand side of the currently active one. If changed to `down`, the editors will open below the currently active one.
    "workbench.editor.openSideBySideDirection": "right",

    // Controls the size of pinned editor tabs. Pinned tabs are sorted to the beginning of all opened tabs and typically do not close until unpinned. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    //  - normal: A pinned tab inherits the look of non pinned tabs.
    //  - compact: A pinned tab will show in a compact form with only icon or first letter of the editor name.
    //  - shrink: A pinned tab shrinks to a compact fixed size showing parts of the editor name.
    "workbench.editor.pinnedTabSizing": "normal",

    // When enabled, displays pinned tabs in a separate row above all other tabs. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.pinnedTabsOnSeparateRow": false,

    // When enabled, a language detection model that takes into account editor history will be given higher precedence.
    "workbench.editor.preferHistoryBasedLanguageDetection": false,

    // Controls whether pinned editors should close when keyboard or middle mouse click is used for closing.
    //  - keyboardAndMouse: Always prevent closing the pinned editor when using mouse middle click or keyboard.
    //  - keyboard: Prevent closing the pinned editor when using the keyboard.
    //  - mouse: Prevent closing the pinned editor when using mouse middle click.
    //  - never: Never prevent closing a pinned editor.
    "workbench.editor.preventPinnedEditorClose": "keyboardAndMouse",

    // Restores the last editor view state (such as scroll position) when re-opening editors after they have been closed. Editor view state is stored per editor group and discarded when a group closes. Use the `workbench.editor.sharedViewState` setting to use the last known view state across all editor groups in case no previous view state was found for a editor group.
    "workbench.editor.restoreViewState": true,

    // Controls whether an editor is revealed in any of the visible groups if opened. If disabled, an editor will prefer to open in the currently active editor group. If enabled, an already opened editor will be revealed instead of opened again in the currently active editor group. Note that there are some cases where this setting is ignored, such as when forcing an editor to open in a specific group or to the side of the currently active group.
    "workbench.editor.revealIfOpen": false,

    // Controls whether scrolling over tabs will open them or not. By default tabs will only reveal upon scrolling, but not open. You can press and hold the Shift-key while scrolling to change this behavior for that duration. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.scrollToSwitchTabs": false,

    // Preserves the most recent editor view state (such as scroll position) across all editor groups and restores that if no specific editor view state is found for the editor group.
    "workbench.editor.sharedViewState": false,

    // Controls whether opened editors should show with an icon or not. This requires a file icon theme to be enabled as well.
    "workbench.editor.showIcons": true,

    // Controls whether opened editors should show as individual tabs, one single large tab or if the title area should not be shown.
    //  - multiple: Each editor is displayed as a tab in the editor title area.
    //  - single: The active editor is displayed as a single large tab in the editor title area.
    //  - none: The editor title area is not displayed.
    "workbench.editor.showTabs": "multiple",

    // Controls the layout for when an editor is split in an editor group to be either vertical or horizontal.
    //  - vertical: Editors are positioned from top to bottom.
    //  - horizontal: Editors are positioned from left to right.
    "workbench.editor.splitInGroupLayout": "horizontal",

    // Controls if editor groups can be split from drag and drop operations by dropping an editor or file on the edges of the editor area.
    "workbench.editor.splitOnDragAndDrop": true,

    // Controls the size of editor groups when splitting them.
    //  - auto: Splits the active editor group to equal parts, unless all editor groups are already in equal parts. In that case, splits all the editor groups to equal parts.
    //  - distribute: Splits all the editor groups to equal parts.
    //  - split: Splits the active editor group to equal parts.
    "workbench.editor.splitSizing": "auto",

    // Controls the visibility of the tab close action button.
    "workbench.editor.tabActionCloseVisibility": true,

    // Controls the position of the editor's tabs action buttons (close, unpin). This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.tabActionLocation": "right",

    // Controls the visibility of the tab unpin action button.
    "workbench.editor.tabActionUnpinVisibility": true,

    // Controls the size of editor tabs. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    //  - fit: Always keep tabs large enough to show the full editor label.
    //  - shrink: Allow tabs to get smaller when the available space is not enough to show all tabs at once.
    //  - fixed: Make all tabs the same size, while allowing them to get smaller when the available space is not enough to show all tabs at once.
    "workbench.editor.tabSizing": "fit",

    // Controls the maximum width of tabs when `workbench.editor.tabSizing` size is set to `fixed`.
    "workbench.editor.tabSizingFixedMaxWidth": 160,

    // Controls the minimum width of tabs when `workbench.editor.tabSizing` size is set to `fixed`.
    "workbench.editor.tabSizingFixedMinWidth": 50,

    // Controls the height of the scrollbars used for tabs and breadcrumbs in the editor title area.
    //  - default: The default size.
    //  - large: Increases the size, so it can be grabbed more easily with the mouse.
    "workbench.editor.titleScrollbarSizing": "default",

    // Controls the format of the label for an untitled editor.
    //  - content: The name of the untitled file is derived from the contents of its first line unless it has an associated file path. It will fallback to the name in case the line is empty or contains no word characters.
    //  - name: The name of the untitled file is not derived from the contents of the file.
    "workbench.editor.untitled.labelFormat": "content",

    // Controls whether tabs should be wrapped over multiple lines when exceeding available space or whether a scrollbar should appear instead. This value is ignored when `workbench.editor.showTabs` is not set to `multiple`.
    "workbench.editor.wrapTabs": false,

    // Configure glob patterns to editors (for example `"*.hex": "hexEditor.hexedit"`). These have precedence over the default behavior.
    "workbench.editorAssociations": {},

    // Controls the minimum size of a file in MB before asking for confirmation when opening in the editor. Note that this setting may not apply to all editor types and environments.
    "workbench.editorLargeFileConfirmation": 1024,

    // Fetches experiments to run from a Microsoft online service.
    "workbench.enableExperiments": true,

    // Configure the browser to use for opening http or https links externally. This can either be the name of the browser (`edge`, `chrome`, `firefox`) or an absolute path to the browser's executable. Will use the system default if not set.
    "workbench.externalBrowser": "",

    // Configure the opener to use for external URIs (http, https).
    "workbench.externalUriOpeners": {},

    // Controls font aliasing method in the workbench.
    //  - default: Sub-pixel font smoothing. On most non-retina displays this will give the sharpest text.
    //  - antialiased: Smooth the font on the level of the pixel, as opposed to the subpixel. Can make the font appear lighter overall.
    //  - none: Disables font smoothing. Text will show with jagged sharp edges.
    //  - auto: Applies `default` or `antialiased` automatically based on the DPI of displays.
    "workbench.fontAliasing": "default",

    // Controls the delay in milliseconds after which the hover is shown for workbench items (ex. some extension provided tree view items). Already visible items may require a refresh before reflecting this setting change.
    "workbench.hover.delay": 500,

    // Specifies the file icon theme used in the workbench or 'null' to not show any file icons.
    //  - null: No file icons
    //  - vs-minimal
    //  - vs-seti
    "workbench.iconTheme": "vs-seti",

    // Controls whether the layout control is shown in the custom title bar. This setting only has an effect when `window.customTitleBarVisibility` is not set to `never`.
    "workbench.layoutControl.enabled": true,

    // Controls whether the layout control in the custom title bar is displayed as a single menu button or with multiple UI toggles.
    //  - menu: Shows a single button with a dropdown of layout options.
    //  - toggles: Shows several buttons for toggling the visibility of the panels and side bar.
    //  - both: Shows both the dropdown and toggle buttons.
    "workbench.layoutControl.type": "both",

    // Controls the type of matching used when searching lists and trees in the workbench.
    //  - fuzzy: Use fuzzy matching when searching.
    //  - contiguous: Use contiguous matching when searching.
    "workbench.list.defaultFindMatchType": "fuzzy",

    // Controls the default find mode for lists and trees in the workbench.
    //  - highlight: Highlight elements when searching. Further up and down navigation will traverse only the highlighted elements.
    //  - filter: Filter elements when searching.
    "workbench.list.defaultFindMode": "highlight",

    // Scrolling speed multiplier when pressing `Alt`.
    "workbench.list.fastScrollSensitivity": 5,

    // Controls whether lists and trees support horizontal scrolling in the workbench. Warning: turning on this setting has a performance implication.
    "workbench.list.horizontalScrolling": false,

    // A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
    "workbench.list.mouseWheelScrollSensitivity": 1,

    // The modifier to be used to add an item in trees and lists to a multi-selection with the mouse (for example in the explorer, open editors and scm view). The 'Open to Side' mouse gestures - if supported - will adapt such that they do not conflict with the multiselect modifier.
    //  - ctrlCmd: Maps to `Control` on Windows and Linux and to `Command` on macOS.
    //  - alt: Maps to `Alt` on Windows and Linux and to `Option` on macOS.
    "workbench.list.multiSelectModifier": "ctrlCmd",

    // Controls how to open items in trees and lists using the mouse (if supported). Note that some trees and lists might choose to ignore this setting if it is not applicable.
    "workbench.list.openMode": "singleClick",

    // Controls whether clicks in the scrollbar scroll page by page.
    "workbench.list.scrollByPage": false,

    // Controls whether lists and trees have smooth scrolling.
    "workbench.list.smoothScrolling": false,

    // Controls how type navigation works in lists and trees in the workbench. When set to `trigger`, type navigation begins once the `list.triggerTypeNavigation` command is run.
    "workbench.list.typeNavigationMode": "automatic",

    // Controls whether local file history is enabled. When enabled, the file contents of an editor that is saved will be stored to a backup location to be able to restore or review the contents later. Changing this setting has no effect on existing local file history entries.
    "workbench.localHistory.enabled": true,

    // Configure paths or glob patterns for excluding files from the local file history.
    "workbench.localHistory.exclude": {},

    // Controls the maximum number of local file history entries per file. When the number of local file history entries exceeds this number for a file, the oldest entries will be discarded.
    "workbench.localHistory.maxFileEntries": 50,

    // Controls the maximum size of a file (in KB) to be considered for local file history. Files that are larger will not be added to the local file history. Changing this setting has no effect on existing local file history entries.
    "workbench.localHistory.maxFileSize": 256,

    // Configure an interval in seconds during which the last entry in local file history is replaced with the entry that is being added. This helps reduce the overall number of entries that are added, for example when auto save is enabled. This setting is only applied to entries that have the same source of origin. Changing this setting has no effect on existing local file history entries.
    "workbench.localHistory.mergeWindow": 10,

    // Controls the default location of the panel (Terminal, Debug Console, Output, Problems) in a new workspace. It can either show at the bottom, top, right, or left of the editor area.
    "workbench.panel.defaultLocation": "bottom",

    // Controls whether the panel opens maximized. It can either always open maximized, never open maximized, or open to the last state it was in before being closed.
    //  - always: Always maximize the panel when opening it.
    //  - never: Never maximize the panel when opening it. The panel will open un-maximized.
    //  - preserve: Open the panel to the state that it was in, before it was closed.
    "workbench.panel.opensMaximized": "preserve",

    // Specifies the preferred color theme for dark OS appearance when `window.autoDetectColorScheme` is enabled.
    "workbench.preferredDarkColorTheme": "Default Dark Modern",

    // Specifies the preferred color theme used in high contrast dark mode when `window.autoDetectHighContrast` is enabled.
    "workbench.preferredHighContrastColorTheme": "Default High Contrast",

    // Specifies the preferred color theme used in high contrast light mode when `window.autoDetectHighContrast` is enabled.
    "workbench.preferredHighContrastLightColorTheme": "Default High Contrast Light",

    // Specifies the preferred color theme for light OS appearance when `window.autoDetectColorScheme` is enabled.
    "workbench.preferredLightColorTheme": "Default Light Modern",

    // Specifies the product icon theme used.
    //  - Default: Default
    "workbench.productIconTheme": "Default",

    // Controls whether Quick Open should close automatically once it loses focus.
    "workbench.quickOpen.closeOnFocusLost": true,

    // Controls whether the last typed input to Quick Open should be restored when opening it the next time.
    "workbench.quickOpen.preserveInput": false,

    // Controls whether the workbench should render with fewer animations.
    //  - on: Always render with reduced motion.
    //  - off: Do not render with reduced motion
    //  - auto: Render with reduced motion based on OS configuration.
    "workbench.reduceMotion": "auto",

    // When enabled, remote extensions recommendations will be shown in the Remote Indicator menu.
    "workbench.remoteIndicator.showExtensionRecommendations": true,

    // Controls the hover feedback delay in milliseconds of the dragging area in between views/editors.
    "workbench.sash.hoverDelay": 300,

    // Controls the feedback area size in pixels of the dragging area in between views/editors. Set it to a larger value if you feel it's hard to resize views using the mouse.
    "workbench.sash.size": 4,

    // Configure settings to be applied for all profiles.
    "workbench.settings.applyToAllProfiles": [],

    // Determines which settings editor to use by default.
    //  - ui: Use the settings UI editor.
    //  - json: Use the JSON file editor.
    "workbench.settings.editor": "ui",

    // Controls whether to enable the natural language search mode for settings. The natural language search is provided by a Microsoft online service.
    "workbench.settings.enableNaturalLanguageSearch": true,

    // Controls whether opening keybinding settings also opens an editor showing all default keybindings.
    "workbench.settings.openDefaultKeybindings": false,

    // Controls whether opening settings also opens an editor showing all default settings.
    "workbench.settings.openDefaultSettings": false,

    // Controls the behavior of the Settings editor Table of Contents while searching.
    //  - hide: Hide the Table of Contents while searching.
    //  - filter: Filter the Table of Contents to just categories that have matching settings. Clicking on a category will filter the results to that category.
    "workbench.settings.settingsSearchTocBehavior": "filter",

    // Controls whether to use the split JSON editor when editing settings as JSON.
    "workbench.settings.useSplitJSON": false,

    // Controls the location of the primary side bar and activity bar. They can either show on the left or right of the workbench. The secondary side bar will show on the opposite side of the workbench.
    "workbench.sideBar.location": "left",

    // Controls which editor is shown at startup, if none are restored from the previous session.
    //  - none: Start without an editor.
    //  - welcomePage: Open the Welcome page, with content to aid in getting started with VS Code and extensions.
    //  - readme: Open the README when opening a folder that contains one, fallback to 'welcomePage' otherwise. Note: This is only observed as a global configuration, it will be ignored if set in a workspace or folder configuration.
    //  - newUntitledFile: Open a new untitled text file (only applies when opening an empty window).
    //  - welcomePageInEmptyWorkbench: Open the Welcome page when opening an empty workbench.
    //  - terminal: Open a new terminal in the editor area.
    "workbench.startupEditor": "welcomePage",

    // Controls the visibility of the status bar at the bottom of the workbench.
    "workbench.statusBar.visible": true,

    // When enabled, will show the watermark tips when no editor is open.
    "workbench.tips.enabled": true,

    // Controls whether sticky scrolling is enabled in trees.
    "workbench.tree.enableStickyScroll": true,

    // Controls how tree folders are expanded when clicking the folder names. Note that some trees and lists might choose to ignore this setting if it is not applicable.
    "workbench.tree.expandMode": "singleClick",

    // Controls tree indentation in pixels.
    "workbench.tree.indent": 8,

    // Controls whether the tree should render indent guides.
    "workbench.tree.renderIndentGuides": "onHover",

    // Controls the number of sticky elements displayed in the tree when `workbench.tree.enableStickyScroll` is enabled.
    "workbench.tree.stickyScrollMaxItemCount": 7,

    // When enabled, trusted domain prompts will appear when opening links in trusted workspaces.
    "workbench.trustedDomains.promptInTrustedWorkspace": false,

    // Controls the visibility of view header actions. View header actions may either be always visible, or only visible when that view is focused or hovered over.
    "workbench.view.alwaysShowHeaderActions": false,

    // When enabled, an extension's walkthrough will open upon install of the extension.
    "workbench.welcomePage.walkthroughs.openOnInstall": true,

// Window

    // If set, automatically switch to the preferred color theme based on the OS appearance. If the OS appearance is dark, the theme specified at `workbench.preferredDarkColorTheme` is used, for light `workbench.preferredLightColorTheme`.
    "window.autoDetectColorScheme": false,

    // If enabled, will automatically change to high contrast theme if the OS is using a high contrast theme. The high contrast theme to use is specified by `workbench.preferredHighContrastColorTheme` and `workbench.preferredHighContrastLightColorTheme`.
    "window.autoDetectHighContrast": true,

    // If enabled, clicking on an inactive window will both activate the window and trigger the element under the mouse if it is clickable. If disabled, clicking anywhere on an inactive window will activate it only and a second click is required on the element.
    "window.clickThroughInactive": true,

    // Controls whether closing the last editor should also close the window. This setting only applies for windows that do not show folders.
    "window.closeWhenEmpty": false,

    // Show command launcher together with the window title. This setting only has an effect when `window.customTitleBarVisibility` is not set to `never`.
    "window.commandCenter": true,

    // Controls whether to show a confirmation dialog before closing a window or quitting the application.
    //  - always: Always ask for confirmation.
    //  - keyboardOnly: Only ask for confirmation if a keybinding was used.
    //  - never: Never explicitly ask for confirmation.
    "window.confirmBeforeClose": "never",

    // Controls whether a confirmation dialog shows asking to save or discard an opened untitled workspace in the window when switching to another workspace. Disabling the confirmation dialog will always discard the untitled workspace.
    "window.confirmSaveUntitledWorkspace": true,

    // Controls whether the menu bar will be focused by pressing the Alt-key. This setting has no effect on toggling the menu bar with the Alt-key.
    "window.customMenuBarAltFocus": true,

    // Adjust when the custom title bar should be shown. The custom title bar can be hidden when in full screen mode with `windowed`. The custom title bar can only be hidden in none full screen mode with `never` when `window.titleBarStyle` is set to `native`.
    //  - auto: Automatically changes custom title bar visibility.
    //  - windowed: Hide custom titlebar in full screen. When not in full screen, automatically change custom title bar visibility.
    //  - never: Hide custom titlebar when `window.titleBarStyle` is set to `native`.
    "window.customTitleBarVisibility": "auto",

    // Adjust the appearance of dialog windows.
    "window.dialogStyle": "native",

    // If enabled, this setting will close the window when the application icon in the title bar is double-clicked. The window will not be able to be dragged by the icon. This setting is effective only if `window.titleBarStyle` is set to `custom`.
    "window.doubleClickIconToClose": false,

    // Controls if native full-screen should be used on macOS. Disable this option to prevent macOS from creating a new space when going full-screen.
    "window.nativeFullScreen": true,

    // Enables macOS Sierra window tabs. Note that changes require a full restart to apply and that native tabs will disable a custom title bar style if configured.
    "window.nativeTabs": false,

    // Controls whether the main menus can be opened via Alt-key shortcuts. Disabling mnemonics allows to bind these Alt-key shortcuts to editor commands instead.
    "window.enableMenuBarMnemonics": true,

    // Control the visibility of the menu bar. A setting of 'toggle' means that the menu bar is hidden and a single press of the Alt key will show it. A setting of 'compact' will move the menu into the side bar.
    //  - classic: Menu is displayed at the top of the window and only hidden in full screen mode.
    //  - visible: Menu is always visible at the top of the window even in full screen mode.
    //  - toggle: Menu is hidden but can be displayed at the top of the window via the Alt key.
    //  - hidden: Menu is always hidden.
    //  - compact: Menu is displayed as a compact button in the side bar. This value is ignored when `window.titleBarStyle` is `native`.
    "window.menuBarVisibility": "classic",

    // Controls the dimensions of opening a new window when at least one window is already opened. Note that this setting does not have an impact on the first window that is opened. The first window will always restore the size and location as you left it before closing.
    //  - default: Open new windows in the center of the screen.
    //  - inherit: Open new windows with same dimension as last active one.
    //  - offset: Open new windows with same dimension as last active one with an offset position.
    //  - maximized: Open new windows maximized.
    //  - fullscreen: Open new windows in full screen mode.
    "window.newWindowDimensions": "default",

    // Specifies the profile to use when opening a new window. If a profile name is provided, the new window will use that profile. If no profile name is provided, the new window will use the profile of the active window or the default profile if no active window exists.
    "window.newWindowProfile": null,

    // Controls whether files should open in a new window when using a command line or file dialog.
    // Note that there can still be cases where this setting is ignored (e.g. when using the `--new-window` or `--reuse-window` command line option).
    //  - on: Files will open in a new window.
    //  - off: Files will open in the window with the files' folder open or the last active window.
    //  - default: Files will open in a new window unless picked from within the application (e.g. via the File menu).
    "window.openFilesInNewWindow": "off",

    // Controls whether folders should open in a new window or replace the last active window.
    // Note that there can still be cases where this setting is ignored (e.g. when using the `--new-window` or `--reuse-window` command line option).
    //  - on: Folders will open in a new window.
    //  - off: Folders will replace the last active window.
    //  - default: Folders will open in a new window unless a folder is picked from within the application (e.g. via the File menu).
    "window.openFoldersInNewWindow": "default",

    // Controls whether a new empty window should open when starting a second instance without arguments or if the last running instance should get focus.
    // Note that there can still be cases where this setting is ignored (e.g. when using the `--new-window` or `--reuse-window` command line option).
    //  - on: Open a new empty window.
    //  - off: Focus the last active running instance.
    "window.openWithoutArgumentsInNewWindow": "on",

    // Controls whether a window should restore to full screen mode if it was exited in full screen mode.
    "window.restoreFullscreen": false,

    // Controls how windows and editors within are being restored when opening.
    //  - preserve: Always reopen all windows. If a folder or workspace is opened (e.g. from the command line) it opens as a new window unless it was opened before. If files are opened they will open in one of the restored windows together with editors that were previously opened.
    //  - all: Reopen all windows unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window.
    //  - folders: Reopen all windows that had folders or workspaces opened unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window.
    //  - one: Reopen the last active window unless a folder, workspace or file is opened (e.g. from the command line). If a file is opened, it will replace any of the editors that were previously opened in a window.
    //  - none: Never reopen a window. Unless a folder or workspace is opened (e.g. from the command line), an empty window will appear.
    "window.restoreWindows": "all",

    // Controls the window title based on the current context such as the opened workspace or active editor.
    "window.title": "${dirty}${activeEditorShort}${separator}${rootName}${separator}${profileName}${separator}${appName}",

    // Adjust the appearance of the window title bar to be native by the OS or custom. On Linux and Windows, this setting also affects the application and context menu appearances. Changes require a full restart to apply.
    "window.titleBarStyle": "custom",

    // Separator used by `window.title`.
    "window.titleSeparator": " - ",

    // Adjust the default zoom level for all windows. Each increment above `0` (e.g. `1`) or below (e.g. `-1`) represents zooming `20%` larger or smaller. You can also enter decimals to adjust the zoom level with a finer granularity. See `window.zoomPerWindow` for configuring if the 'Zoom In' and 'Zoom Out' commands apply the zoom level to all windows or only the active window.
    "window.zoomLevel": 0,

    // Controls if the 'Zoom In' and 'Zoom Out' commands apply the zoom level to all windows or only the active window. See `window.zoomLevel` for configuring a default zoom level for all windows.
    "window.zoomPerWindow": true,

// Files

    // Configure glob patterns of file associations to languages.
    "files.associations": {},

    // When enabled, the editor will attempt to guess the character set encoding when opening files. This setting can also be configured per language. Note, this setting is not respected by text search. Only `files.encoding` is respected.
    "files.autoGuessEncoding": false,

    // Controls auto save of editors that have unsaved changes.
    //  - off: An editor with changes is never automatically saved.
    //  - afterDelay: An editor with changes is automatically saved after the configured `files.autoSaveDelay`.
    //  - onFocusChange: An editor with changes is automatically saved when the editor loses focus.
    //  - onWindowChange: An editor with changes is automatically saved when the window loses focus.
    "files.autoSave": "off",

    // Controls the delay in milliseconds after which an editor with unsaved changes is saved automatically. Only applies when `files.autoSave` is set to `afterDelay`.
    "files.autoSaveDelay": 1000,

    // When enabled, will limit auto save of editors to files that have no errors reported in them at the time the auto save is triggered. Only applies when `files.autoSave` is enabled.
    "files.autoSaveWhenNoErrors": false,

    // When enabled, will limit auto save of editors to files that are inside the opened workspace. Only applies when `files.autoSave` is enabled.
    "files.autoSaveWorkspaceFilesOnly": false,

    // List of character set encodings that the editor should attempt to guess in the order they are listed. In case it cannot be determined, `files.encoding` is respected.
    "files.candidateGuessEncodings": [],

    // The default language identifier that is assigned to new files. If configured to `${activeEditorLanguage}`, will use the language identifier of the currently active text editor if any.
    "files.defaultLanguage": "",

    // Default path for file dialogs, overriding user's home path. Only used in the absence of a context-specific path, such as most recently opened file or folder.
    "files.dialog.defaultPath": "",

    // Moves files/folders to the OS trash (recycle bin on Windows) when deleting. Disabling this will delete files/folders permanently.
    "files.enableTrash": true,

    // The default character set encoding to use when reading and writing files. This setting can also be configured per language.
    "files.encoding": "utf8",

    // The default end of line character.
    //  - \n: LF
    //  - \r\n: CRLF
    //  - auto: Uses operating system specific end of line character.
    "files.eol": "auto",

    // Configure glob patterns for excluding files and folders. For example, the File Explorer decides which files and folders to show or hide based on this setting. Refer to the `search.exclude` setting to define search-specific excludes.
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/Thumbs.db": true
    },

    // Hot Exit controls whether unsaved files are remembered between sessions, allowing the save prompt when exiting the editor to be skipped.
    //  - off: Disable hot exit. A prompt will show when attempting to close a window with editors that have unsaved changes.
    //  - onExit: Hot exit will be triggered when the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu). All windows without folders opened will be restored upon next launch. A list of previously opened windows with unsaved files can be accessed via `File > Open Recent > More...`
    //  - onExitAndWindowClose: Hot exit will be triggered when the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu), and also for any window with a folder opened regardless of whether it's the last window. All windows without folders opened will be restored upon next launch. A list of previously opened windows with unsaved files can be accessed via `File > Open Recent > More...`
    "files.hotExit": "onExit",

    // When enabled, insert a final new line at the end of the file when saving it.
    "files.insertFinalNewline": false,

    // Timeout in milliseconds after which file participants for create, rename, and delete are cancelled. Use `0` to disable participants.
    "files.participants.timeout": 60000,

    // Configure paths or glob patterns to exclude from being marked as read-only if they match as a result of the `files.readonlyInclude` setting.
    "files.readonlyExclude": {},

    // Marks files as read-only when their file permissions indicate as such. This can be overridden via `files.readonlyInclude#` and `#files.readonlyExclude` settings.
    "files.readonlyFromPermissions": false,

    // Configure paths or glob patterns to mark as read-only.
    "files.readonlyInclude": {},

    // Controls if files that were part of a refactoring are saved automatically
    "files.refactoring.autoSave": true,

    // Restore the undo stack when a file is reopened.
    "files.restoreUndoStack": true,

    // A save conflict can occur when a file is saved to disk that was changed by another program in the meantime. To prevent data loss, the user is asked to compare the changes in the editor with the version on disk. This setting should only be changed if you frequently encounter save conflict errors and may result in data loss if used without caution.
    //  - askUser: Will refuse to save and ask for resolving the save conflict manually.
    //  - overwriteFileOnDisk: Will resolve the save conflict by overwriting the file on disk with the changes in the editor.
    "files.saveConflictResolution": "askUser",

    // Enables the simple file dialog for opening and saving files and folders. The simple file dialog replaces the system file dialog when enabled.
    "files.simpleDialog.enable": false,

    // When enabled, will trim all new lines after the final new line at the end of the file when saving it.
    "files.trimFinalNewlines": false,

    // When enabled, will trim trailing whitespace when saving a file.
    "files.trimTrailingWhitespace": false,

    // When enabled, trailing whitespace will be removed from multiline strings and regexes will be removed on save or when executing 'editor.action.trimTrailingWhitespace'.
    "files.trimTrailingWhitespaceInRegexAndStrings": true,

    // Configure paths or glob patterns to exclude from file watching.
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true,
        "**/.hg/store/**": true
    },

    // Configure extra paths to watch for changes inside the workspace.
    "files.watcherInclude": [],

// Screencast Mode

    // Controls the font size (in pixels) of the screencast mode keyboard.
    "screencastMode.fontSize": 56,

    // Options for customizing the keyboard overlay in screencast mode.
    "screencastMode.keyboardOptions": {
        "showKeys": true,
        "showKeybindings": true,
        "showCommands": true,
        "showCommandGroups": false,
        "showSingleEditorCursorMoves": true
    },

    // Controls how long (in milliseconds) the keyboard overlay is shown in screencast mode.
    "screencastMode.keyboardOverlayTimeout": 800,

    // Controls the color in hex (#RGB, #RGBA, #RRGGBB or #RRGGBBAA) of the mouse indicator in screencast mode.
    "screencastMode.mouseIndicatorColor": "#FF0000",

    // Controls the size (in pixels) of the mouse indicator in screencast mode.
    "screencastMode.mouseIndicatorSize": 20,

    // Controls the vertical offset of the screencast mode overlay from the bottom as a percentage of the workbench height.
    "screencastMode.verticalOffset": 20,

// Zen Mode

    // Controls whether turning on Zen Mode also centers the layout.
    "zenMode.centerLayout": true,

    // Controls whether turning on Zen Mode also puts the workbench into full screen mode.
    "zenMode.fullScreen": true,

    // Controls whether turning on Zen Mode also hides the activity bar either at the left or right of the workbench.
    "zenMode.hideActivityBar": true,

    // Controls whether turning on Zen Mode also hides the editor line numbers.
    "zenMode.hideLineNumbers": true,

    // Controls whether turning on Zen Mode also hides the status bar at the bottom of the workbench.
    "zenMode.hideStatusBar": true,

    // Controls whether a window should restore to Zen Mode if it was exited in Zen Mode.
    "zenMode.restore": true,

    // Controls whether turning on Zen Mode should show multiple editor tabs, a single editor tab, or hide the editor title area completely.
    //  - multiple: Each editor is displayed as a tab in the editor title area.
    //  - single: The active editor is displayed as a single large tab in the editor title area.
    //  - none: The editor title area is not displayed.
    "zenMode.showTabs": "multiple",

    // Controls whether notifications do not disturb mode should be enabled while in Zen Mode. If true, only error notifications will pop out.
    "zenMode.silentNotifications": true,

// File Explorer

    // Controls whether the Explorer should automatically open a file when it is dropped into the explorer
    "explorer.autoOpenDroppedFile": true,

    // Controls whether the Explorer should automatically reveal and select files when opening them.
    //  - true: Files will be revealed and selected.
    //  - false: Files will not be revealed and selected.
    //  - focusNoScroll: Files will not be scrolled into view, but will still be focused.
    "explorer.autoReveal": true,

    // Configure paths or glob patterns for excluding files and folders from being revealed and selected in the Explorer when they are opened.
    "explorer.autoRevealExclude": {
        "**/node_modules": true,
        "**/bower_components": true
    },

    // Controls whether the Explorer should render folders in a compact form. In such a form, single child folders will be compressed in a combined tree element. Useful for Java package structures, for example.
    "explorer.compactFolders": true,

    // Controls whether the Explorer should ask for confirmation when deleting a file via the trash.
    "explorer.confirmDelete": true,

    // Controls whether the Explorer should ask for confirmation to move files and folders via drag and drop.
    "explorer.confirmDragAndDrop": true,

    // Controls whether the Explorer should ask for confirmation when pasting native files and folders.
    "explorer.confirmPasteNative": true,

    // Controls whether the Explorer should ask for confirmation when undoing.
    //  - verbose: Explorer will prompt before all undo operations.
    //  - default: Explorer will prompt before destructive undo operations.
    //  - light: Explorer will not prompt before undo operations when focused.
    "explorer.confirmUndo": "default",

    // The path separation character used when copying relative file paths.
    //  - /: Use slash as path separation character.
    //  - \: Use backslash as path separation character.
    //  - auto: Uses operating system specific path separation character.
    "explorer.copyRelativePathSeparator": "auto",

    // Controls whether file decorations should use badges.
    "explorer.decorations.badges": true,

    // Controls whether file decorations should use colors.
    "explorer.decorations.colors": true,

    // Controls whether the Explorer should allow to move files and folders via drag and drop. This setting only effects drag and drop from inside the Explorer.
    "explorer.enableDragAndDrop": true,

    // Controls whether the Explorer should support undoing file and folder operations.
    "explorer.enableUndo": true,

    // Controls whether entries in .gitignore should be parsed and excluded from the Explorer. Similar to `files.exclude`.
    "explorer.excludeGitIgnore": false,

    // Controls whether the Explorer should expand multi-root workspaces containing only one folder during initialization
    "explorer.expandSingleFolderWorkspaces": true,

    // Controls whether file nesting is enabled in the Explorer. File nesting allows for related files in a directory to be visually grouped together under a single parent file.
    "explorer.fileNesting.enabled": false,

    // Controls whether file nests are automatically expanded. `explorer.fileNesting.enabled` must be set for this to take effect.
    "explorer.fileNesting.expand": true,

    // Controls nesting of files in the Explorer. `explorer.fileNesting.enabled` must be set for this to take effect. Each __Item__ represents a parent pattern and may contain a single `*` character that matches any string. Each __Value__ represents a comma separated list of the child patterns that should be shown nested under a given parent. Child patterns may contain several special tokens:
    // - `${capture}`: Matches the resolved value of the `*` from the parent pattern
    // - `${basename}`: Matches the parent file's basename, the `file` in `file.ts`
    // - `${extname}`: Matches the parent file's extension, the `ts` in `file.ts`
    // - `${dirname}`: Matches the parent file's directory name, the `src` in `src/file.ts`
    // - `*`:  Matches any string, may only be used once per child pattern
    "explorer.fileNesting.patterns": {
        "*.ts": "${capture}.js",
        "*.js": "${capture}.js.map, ${capture}.min.js, ${capture}.d.ts",
        "*.jsx": "${capture}.js",
        "*.tsx": "${capture}.ts",
        "tsconfig.json": "tsconfig.*.json",
        "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb"
    },

    // Controls which naming strategy to use when giving a new name to a duplicated Explorer item on paste.
    //  - simple: Appends the word "copy" at the end of the duplicated name potentially followed by a number.
    //  - smart: Adds a number at the end of the duplicated name. If some number is already part of the name, tries to increase that number.
    //  - disabled: Disables incremental naming. If two files with the same name exist, you will be prompted to overwrite the existing file.
    "explorer.incrementalNaming": "simple",

    // The minimum number of editor slots pre-allocated in the Open Editors pane. If set to 0 the Open Editors pane will dynamically resize based on the number of editors.
    "explorer.openEditors.minVisible": 0,

    // Controls the sorting order of editors in the Open Editors pane.
    //  - editorOrder: Editors are ordered in the same order editor tabs are shown.
    //  - alphabetical: Editors are ordered alphabetically by tab name inside each editor group.
    //  - fullPath: Editors are ordered alphabetically by full path inside each editor group.
    "explorer.openEditors.sortOrder": "editorOrder",

    // The initial maximum number of editors shown in the Open Editors pane.
    "explorer.openEditors.visible": 9,

    // Controls the property-based sorting of files and folders in the Explorer.
    //  - default: Files and folders are sorted by their names. Folders are displayed before files.
    //  - mixed: Files and folders are sorted by their names. Files are interwoven with folders.
    //  - filesFirst: Files and folders are sorted by their names. Files are displayed before folders.
    //  - type: Files and folders are grouped by extension type then sorted by their names. Folders are displayed before files.
    //  - modified: Files and folders are sorted by last modified date in descending order. Folders are displayed before files.
    //  - foldersNestsFiles: Files and folders are sorted by their names. Folders are displayed before files. Files with nested children are displayed before other files.
    "explorer.sortOrder": "default",

    // Controls the lexicographic sorting of file and folder names in the Explorer.
    //  - default: Uppercase and lowercase names are mixed together.
    //  - upper: Uppercase names are grouped together before lowercase names.
    //  - lower: Lowercase names are grouped together before uppercase names.
    //  - unicode: Names are sorted in Unicode order.
    "explorer.sortOrderLexicographicOptions": "default",

// Search

    // Controls the positioning of the actionbar on rows in the search view.
    //  - auto: Position the actionbar to the right when the search view is narrow, and immediately after the content when the search view is wide.
    //  - right: Always position the actionbar to the right.
    "search.actionsPosition": "right",

    // Controls whether the search results will be collapsed or expanded.
    //  - auto: Files with less than 10 results are expanded. Others are collapsed.
    //  - alwaysCollapse
    //  - alwaysExpand
    "search.collapseResults": "alwaysExpand",

    // Controls whether search file decorations should use badges.
    "search.decorations.badges": true,

    // Controls whether search file decorations should use colors.
    "search.decorations.colors": true,

    // Controls the default search result view mode.
    //  - tree: Shows search results as a tree.
    //  - list: Shows search results as a list.
    "search.defaultViewMode": "list",

    // Configure glob patterns for excluding files and folders in fulltext searches and quick open. Inherits all glob patterns from the `files.exclude` setting.
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/*.code-search": true
    },

    // Controls whether to follow symlinks while searching.
    "search.followSymlinks": true,

    // Controls the maximum number of search results, this can be set to `null` (empty) to return unlimited results.
    "search.maxResults": 20000,

    // Controls whether the search view should read or modify the shared find clipboard on macOS.
    "search.globalFindClipboard": false,

    // Controls where new `Search: Find in Files` and `Find in Folder` operations occur: either in the search view, or in a search editor.
    //  - view: Search in the search view, either in the panel or side bars.
    //  - reuseEditor: Search in an existing search editor if present, otherwise in a new search editor.
    //  - newEditor: Search in a new search editor.
    "search.mode": "view",

    // Controls whether the last typed input to Quick Search should be restored when opening it the next time.
    "search.quickAccess.preserveInput": false,

    // Controls sorting order of editor history in quick open when filtering.
    //  - default: History entries are sorted by relevance based on the filter value used. More relevant entries appear first.
    //  - recency: History entries are sorted by recency. More recently opened entries appear first.
    "search.quickOpen.history.filterSortOrder": "default",

    // Whether to include results from recently opened files in the file results for Quick Open.
    "search.quickOpen.includeHistory": true,

    // Whether to include results from a global symbol search in the file results for Quick Open.
    "search.quickOpen.includeSymbols": false,

    // Number of threads to use for searching. When set to 0, the engine automatically determines this value.
    "search.ripgrep.maxThreads": 0,

    // The default number of surrounding context lines to use when creating new Search Editors. If using `search.searchEditor.reusePriorSearchConfiguration`, this can be set to `null` (empty) to use the prior Search Editor's configuration.
    "search.searchEditor.defaultNumberOfContextLines": 1,

    // Configure effect of double-clicking a result in a search editor.
    //  - selectWord: Double-clicking selects the word under the cursor.
    //  - goToLocation: Double-clicking opens the result in the active editor group.
    //  - openLocationToSide: Double-clicking opens the result in the editor group to the side, creating one if it does not yet exist.
    "search.searchEditor.doubleClickBehaviour": "goToLocation",

    // When enabled, new Search Editors will reuse the includes, excludes, and flags of the previously opened Search Editor.
    "search.searchEditor.reusePriorSearchConfiguration": false,

    // Configure effect of single-clicking a result in a search editor.
    //  - default: Single-clicking does nothing.
    //  - peekDefinition: Single-clicking opens a Peek Definition window.
    "search.searchEditor.singleClickBehaviour": "default",

    // Search all files as you type.
    "search.searchOnType": true,

    // When `search.searchOnType` is enabled, controls the timeout in milliseconds between a character being typed and the search starting. Has no effect when `search.searchOnType` is disabled.
    "search.searchOnTypeDebouncePeriod": 300,

    // Update the search query to the editor's selected text when focusing the search view. This happens either on click or when triggering the `workbench.views.search.focus` command.
    "search.seedOnFocus": false,

    // Enable seeding search from the word nearest the cursor when the active editor has no selection.
    "search.seedWithNearestWord": false,

    // Controls whether to show line numbers for search results.
    "search.showLineNumbers": false,

    // Search case-insensitively if the pattern is all lowercase, otherwise, search case-sensitively.
    "search.smartCase": false,

    // Controls sorting order of search results.
    //  - default: Results are sorted by folder and file names, in alphabetical order.
    //  - fileNames: Results are sorted by file names ignoring folder order, in alphabetical order.
    //  - type: Results are sorted by file extensions, in alphabetical order.
    //  - modified: Results are sorted by file last modified date, in descending order.
    //  - countDescending: Results are sorted by count per file, in descending order.
    //  - countAscending: Results are sorted by count per file, in ascending order.
    "search.sortOrder": "default",

    // Controls whether to use your global gitignore file (for example, from `$HOME/.config/git/ignore`) when searching for files. Requires `search.useIgnoreFiles` to be enabled.
    "search.useGlobalIgnoreFiles": false,

    // Controls whether to use `.gitignore` and `.ignore` files when searching for files.
    "search.useIgnoreFiles": true,

    // Controls whether to use `.gitignore` and `.ignore` files in parent directories when searching for files. Requires `search.useIgnoreFiles` to be enabled.
    "search.useParentIgnoreFiles": false,

    // Controls whether to open Replace Preview when selecting or replacing a match.
    "search.useReplacePreview": true,

// HTTP

    // Specifies domain names for which proxy settings should be ignored for HTTP/HTTPS requests.
    "http.noProxy": [],

    // The proxy setting to use. If not set, will be inherited from the `http_proxy` and `https_proxy` environment variables.
    "http.proxy": "",

    // The value to send as the `Proxy-Authorization` header for every network request.
    "http.proxyAuthorization": null,

    // Overrides the principal service name for Kerberos authentication with the HTTP proxy. A default based on the proxy hostname is used when this is not set.
    "http.proxyKerberosServicePrincipal": "",

    // Controls whether the proxy server certificate should be verified against the list of supplied CAs.
    "http.proxyStrictSSL": true,

    // Use the proxy support for extensions.
    //  - off: Disable proxy support for extensions.
    //  - on: Enable proxy support for extensions.
    //  - fallback: Enable proxy support for extensions, fall back to request options, when no proxy found.
    //  - override: Enable proxy support for extensions, override request options.
    "http.proxySupport": "override",

    // Controls whether CA certificates should be loaded from the OS. (On Windows and macOS, a reload of the window is required after turning this off.)
    "http.systemCertificates": true,

// Keyboard

    // Controls the dispatching logic for key presses to use either `code` (recommended) or `keyCode`.
    "keyboard.dispatch": "code",

    // Controls if the AltGraph+ modifier should be treated as Ctrl+Alt+.
    "keyboard.mapAltGrToCtrlAlt": false,

// Update

    // Enable to download and install new VS Code versions in the background on Windows.
    "update.enableWindowsBackgroundUpdates": true,

    // Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service.
    //  - none: Disable updates.
    //  - manual: Disable automatic background update checks. Updates will be available if you manually check for updates.
    //  - start: Check for updates only on startup. Disable automatic background update checks.
    //  - default: Enable automatic update checks. Code will check for updates automatically and periodically.
    "update.mode": "default",

    // Show Release Notes after an update. The Release Notes are fetched from a Microsoft online service.
    "update.showReleaseNotes": true,

// Comments

    // Controls whether the comment thread should collapse when the thread is resolved.
    "comments.collapseOnResolve": true,

    // Controls whether the comments widget scrolls or expands.
    "comments.maxHeight": true,

    // Controls when the comments view should open.
    //  - never: The comments view will never be opened.
    //  - file: The comments view will open when a file with comments is active.
    //  - firstFile: If the comments view has not been opened yet during this session it will open the first time during a session that a file with comments is active.
    //  - firstFileUnresolved: If the comments view has not been opened yet during this session and the comment is not resolved, it will open the first time during a session that a file with comments is active.
    "comments.openView": "firstFile",

    // Determines if relative time will be used in comment timestamps (ex. '1 day ago').
    "comments.useRelativeTime": true,

    // Controls the visibility of the comments bar and comment threads in editors that have commenting ranges and comments. Comments are still accessible via the Comments view and will cause commenting to be toggled on in the same way running the command "Comments: Toggle Editor Commenting" toggles comments.
    "comments.visible": true,

// Debug

    // Allow setting breakpoints in any file.
    "debug.allowBreakpointsEverywhere": false,

    // Controls whether variables that are lazily resolved, such as getters, are automatically resolved and expanded by the debugger.
    //  - auto: When in screen reader optimized mode, automatically expand lazy variables.
    //  - on: Always automatically expand lazy variables.
    //  - off: Never automatically expand lazy variables.
    "debug.autoExpandLazyVariables": "auto",

    // At the end of a debug session, all the read-only tabs associated with that session will be closed
    "debug.closeReadonlyTabsOnEnd": false,

    // Controls whether to confirm when the window closes if there are active debug sessions.
    //  - never: Never confirm.
    //  - always: Always confirm if there are debug sessions.
    "debug.confirmOnExit": "never",

    // Controls whether suggestions should be accepted on Enter in the Debug Console. Enter is also used to evaluate whatever is typed in the Debug Console.
    "debug.console.acceptSuggestionOnEnter": "off",

    // Controls if the Debug Console should be automatically closed when the debug session ends.
    "debug.console.closeOnEnd": false,

    // Controls if the Debug Console should collapse identical lines and show a number of occurrences with a badge.
    "debug.console.collapseIdenticalLines": true,

    // Controls the font family in the Debug Console.
    "debug.console.fontFamily": "default",

    // Controls the font size in pixels in the Debug Console.
    "debug.console.fontSize": 14,

    // Controls if the Debug Console should suggest previously typed input.
    "debug.console.historySuggestions": true,

    // Controls the line height in pixels in the Debug Console. Use 0 to compute the line height from the font size.
    "debug.console.lineHeight": 0,

    // Controls if the lines should wrap in the Debug Console.
    "debug.console.wordWrap": true,

    // Show Source Code in Disassembly View.
    "debug.disassemblyView.showSourceCode": true,

    // Color of the Status bar when debugger is active.
    "debug.enableStatusBarColor": true,

    // Controls whether the editor should be focused when the debugger breaks.
    "debug.focusEditorOnBreak": true,

    // Controls whether the workbench window should be focused when the debugger breaks.
    "debug.focusWindowOnBreak": true,

    // Controls the action to perform when clicking the editor gutter with the middle mouse button.
    //  - logpoint: Add Logpoint.
    //  - conditionalBreakpoint: Add Conditional Breakpoint.
    //  - triggeredBreakpoint: Add Triggered Breakpoint.
    //  - none: Don't perform any action.
    "debug.gutterMiddleClickAction": "logpoint",

    // Hide 'Start Debugging' control in title bar of 'Run and Debug' view while debugging is active. Only relevant when `debug.toolBarLocation` is not `docked`.
    "debug.hideLauncherWhileDebugging": false,

    // Show variable values inline in editor while debugging.
    //  - on: Always show variable values inline in editor while debugging.
    //  - off: Never show variable values inline in editor while debugging.
    //  - auto: Show variable values inline in editor while debugging when the language supports inline value locations.
    "debug.inlineValues": "auto",

    // Controls when the internal Debug Console should open.
    "debug.internalConsoleOptions": "openOnFirstSessionStart",

    // Controls what to do when errors are encountered after running a preLaunchTask.
    //  - debugAnyway: Ignore task errors and start debugging.
    //  - showErrors: Show the Problems view and do not start debugging.
    //  - prompt: Prompt user.
    //  - abort: Cancel debugging.
    "debug.onTaskErrors": "prompt",

    // Controls when the debug view should open.
    "debug.openDebug": "openOnDebugBreak",

    // Automatically open the explorer view at the end of a debug session.
    "debug.openExplorerOnEnd": false,

    // Controls what editors to save before starting a debug session.
    //  - allEditorsInActiveGroup: Save all editors in the active group before starting a debug session.
    //  - nonUntitledEditorsInActiveGroup: Save all editors in the active group except untitled ones before starting a debug session.
    //  - none: Don't save any editors before starting a debug session.
    "debug.saveBeforeStart": "allEditorsInActiveGroup",

    // Controls whether breakpoints should be shown in the overview ruler.
    "debug.showBreakpointsInOverviewRuler": false,

    // Controls whether inline breakpoints candidate decorations should be shown in the editor while debugging.
    "debug.showInlineBreakpointCandidates": true,

    // Controls when the debug Status bar should be visible.
    //  - never: Never show debug in Status bar
    //  - always: Always show debug in Status bar
    //  - onFirstSessionStart: Show debug in Status bar only after debug was started for the first time
    "debug.showInStatusBar": "onFirstSessionStart",

    // Controls whether the debug sub-sessions are shown in the debug tool bar. When this setting is false the stop command on a sub-session will also stop the parent session.
    "debug.showSubSessionsInToolBar": false,

    // Show variable type in variable pane during debug session
    "debug.showVariableTypes": false,

    // Before starting a new debug session in an integrated or external terminal, clear the terminal.
    "debug.terminal.clearBeforeReusing": false,

    // Controls the location of the debug toolbar.
    //  - floating: Show debug toolbar in all views.
    //  - docked: Show debug toolbar only in debug views.
    //  - commandCenter: `(Experimental)` Show debug toolbar in the command center.
    //  - hidden: Do not show debug toolbar.
    "debug.toolBarLocation": "floating",

    // Global debug launch configuration. Should be used as an alternative to 'launch.json' that is shared across workspaces.
    "launch": {
        "configurations": [],
        "compounds": []
    },

// HTML

    // Enable/disable autoclosing of HTML tags.
    "html.autoClosingTags": true,

    // Enable/disable auto creation of quotes for HTML attribute assignment. The type of quotes can be configured by `html.completion.attributeDefaultValue`.
    "html.autoCreateQuotes": true,

    // Controls the default value for attributes when completion is accepted.
    //  - doublequotes: Attribute value is set to "".
    //  - singlequotes: Attribute value is set to ''.
    //  - empty: Attribute value is not set.
    "html.completion.attributeDefaultValue": "doublequotes",

    // A list of relative file paths pointing to JSON files following the custom data format.
    // VS Code loads custom data on startup to enhance its HTML support for the custom HTML tags, attributes and attribute values you specify in the JSON files.
    // The file paths are relative to workspace and only workspace folder settings are considered.
    "html.customData": [],

    // List of tags, comma separated, where the content shouldn't be reformatted. `null` defaults to the `pre` tag.
    "html.format.contentUnformatted": "pre,code,textarea",

    // Enable/disable default HTML formatter.
    "html.format.enable": true,

    // List of tags, comma separated, that should have an extra newline before them. `null` defaults to `"head, body, /html"`.
    "html.format.extraLiners": "head, body, /html",

    // Format and indent `{{#foo}}` and `{{/foo}}`.
    "html.format.indentHandlebars": false,

    // Indent `<head>` and `<body>` sections.
    "html.format.indentInnerHtml": false,

    // Maximum number of line breaks to be preserved in one chunk. Use `null` for unlimited.
    "html.format.maxPreserveNewLines": null,

    // Controls whether existing line breaks before elements should be preserved. Only works before elements, not inside tags or for text.
    "html.format.preserveNewLines": true,

    // Honor django, erb, handlebars and php templating language tags.
    "html.format.templating": false,

    // List of tags, comma separated, that shouldn't be reformatted.
    "html.format.unformatted": "wbr",

    // Keep text content together between this string.
    "html.format.unformattedContentDelimiter": "",

    // Wrap attributes.
    //  - auto: Wrap attributes only when line length is exceeded.
    //  - force: Wrap each attribute except first.
    //  - force-aligned: Wrap each attribute except first and keep aligned.
    //  - force-expand-multiline: Wrap each attribute.
    //  - aligned-multiple: Wrap when line length is exceeded, align attributes vertically.
    //  - preserve: Preserve wrapping of attributes.
    //  - preserve-aligned: Preserve wrapping of attributes but align.
    "html.format.wrapAttributes": "auto",

    // Indent wrapped attributes to after N characters. Use `null` to use the default indent size. Ignored if `html.format.wrapAttributes` is set to `aligned`.
    "html.format.wrapAttributesIndentSize": null,

    // Maximum amount of characters per line (0 = disable).
    "html.format.wrapLineLength": 120,

    // Show tag and attribute documentation in hover.
    "html.hover.documentation": true,

    // Show references to MDN in hover.
    "html.hover.references": true,

    // Controls whether the built-in HTML language support suggests HTML5 tags, properties and values.
    "html.suggest.html5": true,

    // Traces the communication between VS Code and the HTML language server.
    "html.trace.server": "off",

    // Controls whether the built-in HTML language support validates embedded scripts.
    "html.validate.scripts": true,

    // Controls whether the built-in HTML language support validates embedded styles.
    "html.validate.styles": true,

// JSON

    // Enable/disable default JSON formatter
    "json.format.enable": true,

    // Keep all existing new lines when formatting.
    "json.format.keepLines": false,

    // The maximum number of outline symbols and folding regions computed (limited for performance reasons).
    "json.maxItemsComputed": 5000,

    // When enabled, JSON schemas can be fetched from http and https locations.
    "json.schemaDownload.enable": true,

    // Associate schemas to JSON files in the current project.
    "json.schemas": [],

    // Traces the communication between VS Code and the JSON language server.
    "json.trace.server": "off",

    // Enable/disable JSON validation.
    "json.validate.enable": true,

// Markdown

    // Defines where files copied created by drop or paste should be created. This is a map from globs that match on the Markdown document to destinations.
    "markdown.copyFiles.destination": {},

    // Controls if files created by drop or paste should overwrite existing files.
    //  - nameIncrementally: If a file with the same name already exists, append a number to the file name, for example: `image.png` becomes `image-1.png`.
    //  - overwrite: If a file with the same name already exists, overwrite it.
    "markdown.copyFiles.overwriteBehavior": "nameIncrementally",

    // Controls if files outside of the workspace that are dropped into a Markdown editor should be copied into the workspace.
    //  - mediaFiles: Try to copy external image and video files into the workspace.
    //  - never: Do not copy external files into the workspace.
    "markdown.editor.drop.copyIntoWorkspace": "mediaFiles",

    // Enable dropping files into a Markdown editor while holding Shift. Requires enabling `editor.dropIntoEditor.enabled`.
    //  - always: Always insert Markdown links.
    //  - smart: Smartly create Markdown links by default when not dropping into a code block or other special element. Use the drop widget to switch between pasting as plain text or as Markdown links.
    //  - never: Never create Markdown links.
    "markdown.editor.drop.enabled": "smart",

    // Snippet used when adding audio to Markdown. This snippet can use the following variables:
    // - `${src}` — The resolved path of the audio  file.
    // - `${title}` — The title used for the audio. A snippet placeholder will automatically be created for this variable.
    "markdown.editor.filePaste.audioSnippet": "<audio controls src=\"${src}\" title=\"${title}\"></audio>",

    // Controls if files outside of the workspace that are pasted into a Markdown editor should be copied into the workspace.
    //  - mediaFiles: Try to copy external image and video files into the workspace.
    //  - never: Do not copy external files into the workspace.
    "markdown.editor.filePaste.copyIntoWorkspace": "mediaFiles",

    // Enable pasting files into a Markdown editor to create Markdown links. Requires enabling `editor.pasteAs.enabled`.
    //  - always: Always insert Markdown links.
    //  - smart: Smartly create Markdown links by default when not pasting into a code block or other special element. Use the paste widget to switch between pasting as plain text or as Markdown links.
    //  - never: Never create Markdown links.
    "markdown.editor.filePaste.enabled": "smart",

    // Snippet used when adding videos to Markdown. This snippet can use the following variables:
    // - `${src}` — The resolved path of the video file.
    // - `${title}` — The title used for the video. A snippet placeholder will automatically be created for this variable.
    "markdown.editor.filePaste.videoSnippet": "<video controls src=\"${src}\" title=\"${title}\"></video>",

    // Controls if Markdown links are created when URLs are pasted into a Markdown editor. Requires enabling `editor.pasteAs.enabled`.
    //  - always: Always insert Markdown links.
    //  - smart: Smartly create Markdown links by default when not pasting into a code block or other special element. Use the paste widget to switch between pasting as plain text or as Markdown links.
    //  - smartWithSelection: Smartly create Markdown links by default when you have selected text and are not pasting into a code block or other special element. Use the paste widget to switch between pasting as plain text or as Markdown links.
    //  - never: Never create Markdown links.
    "markdown.editor.pasteUrlAsFormattedLink.enabled": "smartWithSelection",

    // Enable/disable a paste option that updates links and reference in text that is copied and pasted between Markdown editors.
    "markdown.editor.updateLinksOnPaste.enabled": true,

    // Controls where links in Markdown files should be opened.
    //  - currentGroup: Open links in the active editor group.
    //  - beside: Open links beside the active editor.
    "markdown.links.openLocation": "currentGroup",

    // Enable highlighting link occurrences in the current document.
    "markdown.occurrencesHighlight.enabled": false,

    // Controls if file extensions (for example `.md`) are added or not for links to Markdown files. This setting is used when file paths are added by tooling such as path completions or file renames.
    //  - auto: For existing paths, try to maintain the file extension style. For new paths, add file extensions.
    //  - includeExtension: Prefer including the file extension. For example, path completions to a file named `file.md` will insert `file.md`.
    //  - removeExtension: Prefer removing the file extension. For example, path completions to a file named `file.md` will insert `file` without the `.md`.
    "markdown.preferredMdPathExtensionStyle": "auto",

    // Sets how line-breaks are rendered in the Markdown preview. Setting it to `true` creates a `<br>` for newlines inside paragraphs.
    "markdown.preview.breaks": false,

    // Double-click in the Markdown preview to switch to the editor.
    "markdown.preview.doubleClickToSwitchToEditor": true,

    // Controls the font family used in the Markdown preview.
    "markdown.preview.fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif",

    // Controls the font size in pixels used in the Markdown preview.
    "markdown.preview.fontSize": 14,

    // Controls the line height used in the Markdown preview. This number is relative to the font size.
    "markdown.preview.lineHeight": 1.6,

    // Convert URL-like text to links in the Markdown preview.
    "markdown.preview.linkify": true,

    // Mark the current editor selection in the Markdown preview.
    "markdown.preview.markEditorSelection": true,

    // Controls how links to other Markdown files in the Markdown preview should be opened.
    //  - inPreview: Try to open links in the Markdown preview.
    //  - inEditor: Try to open links in the editor.
    "markdown.preview.openMarkdownLinks": "inPreview",

    // When a Markdown preview is scrolled, update the view of the editor.
    "markdown.preview.scrollEditorWithPreview": true,

    // When a Markdown editor is scrolled, update the view of the preview.
    "markdown.preview.scrollPreviewWithEditor": true,

    // Enable some language-neutral replacement and quotes beautification in the Markdown preview.
    "markdown.preview.typographer": false,

    // Controls the logging level of the Markdown language server.
    "markdown.server.log": "off",

    // A list of URLs or local paths to CSS style sheets to use from the Markdown preview. Relative paths are interpreted relative to the folder open in the Explorer. If there is no open folder, they are interpreted relative to the location of the Markdown file. All '\' need to be written as '\\'.
    "markdown.styles": [],

    // Enable path suggestions while writing links in Markdown files.
    "markdown.suggest.paths.enabled": true,

    // Enable suggestions for headers in other Markdown files in the current workspace. Accepting one of these suggestions inserts the full path to header in that file, for example: `[link text](/path/to/file.md#header)`.
    //  - never: Disable workspace header suggestions.
    //  - onDoubleHash: Enable workspace header suggestions after typing `#` in a path, for example: `[link text](#`.
    //  - onSingleOrDoubleHash: Enable workspace header suggestions after typing either `#` or `#` in a path, for example: `[link text](#` or `[link text](#`.
    "markdown.suggest.paths.includeWorkspaceHeaderCompletions": "onDoubleHash",

    // Enable debug logging for the Markdown extension.
    "markdown.trace.extension": "off",

    // Traces the communication between VS Code and the Markdown language server.
    "markdown.trace.server": "off",

    // Try to update links in Markdown files when a file is renamed/moved in the workspace. Use `markdown.updateLinksOnFileMove.include` to configure which files trigger link updates.
    //  - prompt: Prompt on each file move.
    //  - always: Always update links automatically.
    //  - never: Never try to update link and don't prompt.
    "markdown.updateLinksOnFileMove.enabled": "never",

    // Enable updating links when a directory is moved or renamed in the workspace.
    "markdown.updateLinksOnFileMove.enableForDirectories": true,

    // Glob patterns that specifies files that trigger automatic link updates. See `markdown.updateLinksOnFileMove.enabled` for details about this feature.
    "markdown.updateLinksOnFileMove.include": [
        "**/*.{md,mkd,mdwn,mdown,markdown,markdn,mdtxt,mdtext,workbook}",
        "**/*.{jpg,jpe,jpeg,png,bmp,gif,ico,webp,avif,tiff,svg,mp4}"
    ],

    // Validate duplicated definitions in the current file.
    "markdown.validate.duplicateLinkDefinitions.enabled": "warning",

    // Enable all error reporting in Markdown files.
    "markdown.validate.enabled": false,

    // Validate links to other files in Markdown files, for example `[link](/path/to/file.md)`. This checks that the target files exists. Requires enabling `markdown.validate.enabled`.
    "markdown.validate.fileLinks.enabled": "warning",

    // Validate the fragment part of links to headers in other files in Markdown files, for example: `[link](/path/to/file.md#header)`. Inherits the setting value from `markdown.validate.fragmentLinks.enabled` by default.
    "markdown.validate.fileLinks.markdownFragmentLinks": "inherit",

    // Validate fragment links to headers in the current Markdown file, for example: `[link](#header)`. Requires enabling `markdown.validate.enabled`.
    "markdown.validate.fragmentLinks.enabled": "warning",

    // Configure links that should not be validated. For example adding `/about` would not validate the link `[about](/about)`, while the glob `/assets/**/*.svg` would let you skip validation for any link to `.svg` files under the `assets` directory.
    "markdown.validate.ignoredLinks": [],

    // Validate reference links in Markdown files, for example: `[link][ref]`. Requires enabling `markdown.validate.enabled`.
    "markdown.validate.referenceLinks.enabled": "warning",

    // Validate link definitions that are unused in the current file.
    "markdown.validate.unusedLinkDefinitions.enabled": "hint",

// PHP

    // Controls whether the built-in PHP language suggestions are enabled. The support suggests PHP globals and variables.
    "php.suggest.basic": true,

    // Enable/disable built-in PHP validation.
    "php.validate.enable": true,

    // Points to the PHP executable.
    "php.validate.executablePath": null,

    // Whether the linter is run on save or on type.
    "php.validate.run": "onSave",

// TypeScript

    // Enable/disable automatic closing of JSX tags.
    "javascript.autoClosingTags": true,

    // Enable/disable default JavaScript formatter.
    "javascript.format.enable": true,

    // Defines space handling after a comma delimiter.
    "javascript.format.insertSpaceAfterCommaDelimiter": true,

    // Defines space handling after the constructor keyword.
    "javascript.format.insertSpaceAfterConstructor": false,

    // Defines space handling after function keyword for anonymous functions.
    "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,

    // Defines space handling after keywords in a control flow statement.
    "javascript.format.insertSpaceAfterKeywordsInControlFlowStatements": true,

    // Defines space handling after opening and before closing empty braces.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces": true,

    // Defines space handling after opening and before closing JSX expression braces.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,

    // Defines space handling after opening and before closing non-empty braces.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,

    // Defines space handling after opening and before closing non-empty brackets.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,

    // Defines space handling after opening and before closing non-empty parenthesis.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,

    // Defines space handling after opening and before closing template string braces.
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,

    // Defines space handling after a semicolon in a for statement.
    "javascript.format.insertSpaceAfterSemicolonInForStatements": true,

    // Defines space handling after a binary operator.
    "javascript.format.insertSpaceBeforeAndAfterBinaryOperators": true,

    // Defines space handling before function argument parentheses.
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false,

    // Defines whether an open brace is put onto a new line for control blocks or not.
    "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,

    // Defines whether an open brace is put onto a new line for functions or not.
    "javascript.format.placeOpenBraceOnNewLineForFunctions": false,

    // Defines handling of optional semicolons.
    //  - ignore: Don't insert or remove any semicolons.
    //  - insert: Insert semicolons at statement ends.
    //  - remove: Remove unnecessary semicolons.
    "javascript.format.semicolons": "ignore",

    // Enable/disable inlay hints for member values in enum declarations:
    "javascript.inlayHints.enumMemberValues.enabled": false,

    // Enable/disable inlay hints for implicit return types on function signatures:
    "javascript.inlayHints.functionLikeReturnTypes.enabled": false,

    // Enable/disable inlay hints for parameter names:
    "javascript.inlayHints.parameterNames.enabled": "none",

    // Suppress parameter name hints on arguments whose text is identical to the parameter name.
    "javascript.inlayHints.parameterNames.suppressWhenArgumentMatchesName": true,

    // Enable/disable inlay hints for implicit parameter types:
    "javascript.inlayHints.parameterTypes.enabled": false,

    // Enable/disable inlay hints for implicit types on property declarations:
    "javascript.inlayHints.propertyDeclarationTypes.enabled": false,

    // Enable/disable inlay hints for implicit variable types:
    "javascript.inlayHints.variableTypes.enabled": false,

    // Suppress type hints on variables whose name is identical to the type name.
    "javascript.inlayHints.variableTypes.suppressWhenTypeMatchesName": true,

    // Specify glob patterns of files to exclude from auto imports.
    "javascript.preferences.autoImportFileExcludePatterns": [],

    // Preferred path style for auto imports.
    //  - shortest: Prefers a non-relative import only if one is available that has fewer path segments than a relative import.
    //  - relative: Prefers a relative path to the imported file location.
    //  - non-relative: Prefers a non-relative import based on the `baseUrl` or `paths` configured in your `jsconfig.json` / `tsconfig.json`.
    //  - project-relative: Prefers a non-relative import only if the relative import path would leave the package or project directory.
    "javascript.preferences.importModuleSpecifier": "shortest",

    // Preferred path ending for auto imports.
    //  - auto: Use project settings to select a default.
    //  - minimal: Shorten `./component/index.js` to `./component`.
    //  - index: Shorten `./component/index.js` to `./component/index`.
    //  - js: Do not shorten path endings; include the `.js` or `.ts` extension.
    "javascript.preferences.importModuleSpecifierEnding": "auto",

    // Preferred style for JSX attribute completions.
    //  - auto: Insert `={}` or `=""` after attribute names based on the prop type. See `javascript.preferences.quoteStyle` to control the type of quotes used for string attributes.
    //  - braces: Insert `={}` after attribute names.
    //  - none: Only insert attribute names.
    "javascript.preferences.jsxAttributeCompletionStyle": "auto",

    // Preferred quote style to use for Quick Fixes.
    //  - auto: Infer quote type from existing code
    //  - single: Always use single quotes: `'`
    //  - double: Always use double quotes: `"`
    "javascript.preferences.quoteStyle": "auto",

    // When on a JSX tag, try to rename the matching tag instead of renaming the symbol.
    "javascript.preferences.renameMatchingJsxTags": true,

    // The setting 'typescript.preferences.renameShorthandProperties' has been deprecated in favor of 'typescript.preferences.useAliasesForRenames'
    // Enable/disable introducing aliases for object shorthand properties during renames.
    "javascript.preferences.renameShorthandProperties": true,

    // Enable/disable introducing aliases for object shorthand properties during renames.
    "javascript.preferences.useAliasesForRenames": true,

    // Makes Go to Definition avoid type declaration files when possible by triggering Go to Source Definition instead. This allows Go to Source Definition to be triggered with the mouse gesture.
    "javascript.preferGoToSourceDefinition": false,

    // Enable/disable references CodeLens in JavaScript files.
    "javascript.referencesCodeLens.enabled": false,

    // Enable/disable references CodeLens on all functions in JavaScript files.
    "javascript.referencesCodeLens.showOnAllFunctions": false,

    // Enable/disable auto import suggestions.
    "javascript.suggest.autoImports": true,

    // Enable/disable snippet completions for class members.
    "javascript.suggest.classMemberSnippets.enabled": true,

    // Complete functions with their parameter signature.
    "javascript.suggest.completeFunctionCalls": false,

    // Enable/disable suggestion to complete JSDoc comments.
    "javascript.suggest.completeJSDocs": true,

    // Enabled/disable autocomplete suggestions.
    "javascript.suggest.enabled": true,

    // Enable/disable showing completions on potentially undefined values that insert an optional chain call. Requires strict null checks to be enabled.
    "javascript.suggest.includeAutomaticOptionalChainCompletions": true,

    // Enable/disable auto-import-style completions on partially-typed import statements.
    "javascript.suggest.includeCompletionsForImportStatements": true,

    // Enable/disable generating `@returns` annotations for JSDoc templates.
    "javascript.suggest.jsdoc.generateReturns": true,

    // Enable/disable including unique names from the file in JavaScript suggestions. Note that name suggestions are always disabled in JavaScript code that is semantically checked using `@ts-check` or `checkJs`.
    "javascript.suggest.names": true,

    // Enable/disable suggestions for paths in import statements and require calls.
    "javascript.suggest.paths": true,

    // Enable/disable suggestion diagnostics for JavaScript files in the editor.
    "javascript.suggestionActions.enabled": true,

    // Enable/disable automatic updating of import paths when you rename or move a file in VS Code.
    //  - prompt: Prompt on each rename.
    //  - always: Always update paths automatically.
    //  - never: Never rename paths and don't prompt.
    "javascript.updateImportsOnFileMove.enabled": "prompt",

    // Enable/disable JavaScript validation.
    "javascript.validate.enable": true,

    // Enable/disable semantic checking of JavaScript files. Existing `jsconfig.json` or `tsconfig.json` files override this setting.
    "js/ts.implicitProjectConfig.checkJs": false,

    // Enable/disable `experimentalDecorators` in JavaScript files that are not part of a project. Existing `jsconfig.json` or `tsconfig.json` files override this setting.
    "js/ts.implicitProjectConfig.experimentalDecorators": false,

    // Sets the module system for the program.
    "js/ts.implicitProjectConfig.module": "ESNext",

    // Enable/disable strict function types in JavaScript and TypeScript files that are not part of a project. Existing `jsconfig.json` or `tsconfig.json` files override this setting.
    "js/ts.implicitProjectConfig.strictFunctionTypes": true,

    // Enable/disable strict null checks in JavaScript and TypeScript files that are not part of a project. Existing `jsconfig.json` or `tsconfig.json` files override this setting.
    "js/ts.implicitProjectConfig.strictNullChecks": true,

    // Set target JavaScript language version for emitted JavaScript and include library declarations.
    "js/ts.implicitProjectConfig.target": "ES2020",

    // Enable/disable automatic closing of JSX tags.
    "typescript.autoClosingTags": true,

    // Check if npm is installed for Automatic Type Acquisition.
    "typescript.check.npmIsInstalled": true,

    // Disables automatic type acquisition. Automatic type acquisition fetches `@types` packages from npm to improve IntelliSense for external libraries.
    "typescript.disableAutomaticTypeAcquisition": false,

    // Enables prompting of users to use the TypeScript version configured in the workspace for Intellisense.
    "typescript.enablePromptUseWorkspaceTsdk": false,

    // Enable/disable default TypeScript formatter.
    "typescript.format.enable": true,

    // Indent case clauses in switch statements.
    "typescript.format.indentSwitchCase": true,

    // Defines space handling after a comma delimiter.
    "typescript.format.insertSpaceAfterCommaDelimiter": true,

    // Defines space handling after the constructor keyword.
    "typescript.format.insertSpaceAfterConstructor": false,

    // Defines space handling after function keyword for anonymous functions.
    "typescript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,

    // Defines space handling after keywords in a control flow statement.
    "typescript.format.insertSpaceAfterKeywordsInControlFlowStatements": true,

    // Defines space handling after opening and before closing empty braces.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces": true,

    // Defines space handling after opening and before closing JSX expression braces.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,

    // Defines space handling after opening and before closing non-empty braces.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,

    // Defines space handling after opening and before closing non-empty brackets.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,

    // Defines space handling after opening and before closing non-empty parenthesis.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,

    // Defines space handling after opening and before closing template string braces.
    "typescript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,

    // Defines space handling after a semicolon in a for statement.
    "typescript.format.insertSpaceAfterSemicolonInForStatements": true,

    // Defines space handling after type assertions in TypeScript.
    "typescript.format.insertSpaceAfterTypeAssertion": false,

    // Defines space handling after a binary operator.
    "typescript.format.insertSpaceBeforeAndAfterBinaryOperators": true,

    // Defines space handling before function argument parentheses.
    "typescript.format.insertSpaceBeforeFunctionParenthesis": false,

    // Defines whether an open brace is put onto a new line for control blocks or not.
    "typescript.format.placeOpenBraceOnNewLineForControlBlocks": false,

    // Defines whether an open brace is put onto a new line for functions or not.
    "typescript.format.placeOpenBraceOnNewLineForFunctions": false,

    // Defines handling of optional semicolons.
    //  - ignore: Don't insert or remove any semicolons.
    //  - insert: Insert semicolons at statement ends.
    //  - remove: Remove unnecessary semicolons.
    "typescript.format.semicolons": "ignore",

    // Enable/disable implementations CodeLens. This CodeLens shows the implementers of an interface.
    "typescript.implementationsCodeLens.enabled": false,

    // Enable/disable implementations CodeLens on interface methods.
    "typescript.implementationsCodeLens.showOnInterfaceMethods": false,

    // Enable/disable inlay hints for member values in enum declarations:
    "typescript.inlayHints.enumMemberValues.enabled": false,

    // Enable/disable inlay hints for implicit return types on function signatures:
    "typescript.inlayHints.functionLikeReturnTypes.enabled": false,

    // Enable/disable inlay hints for parameter names:
    "typescript.inlayHints.parameterNames.enabled": "none",

    // Suppress parameter name hints on arguments whose text is identical to the parameter name.
    "typescript.inlayHints.parameterNames.suppressWhenArgumentMatchesName": true,

    // Enable/disable inlay hints for implicit parameter types:
    "typescript.inlayHints.parameterTypes.enabled": false,

    // Enable/disable inlay hints for implicit types on property declarations:
    "typescript.inlayHints.propertyDeclarationTypes.enabled": false,

    // Enable/disable inlay hints for implicit variable types:
    "typescript.inlayHints.variableTypes.enabled": false,

    // Suppress type hints on variables whose name is identical to the type name.
    "typescript.inlayHints.variableTypes.suppressWhenTypeMatchesName": true,

    // Sets the locale used to report JavaScript and TypeScript errors. Defaults to use VS Code's locale.
    "typescript.locale": "auto",

    // Specifies the path to the npm executable used for Automatic Type Acquisition.
    "typescript.npm": "",

    // Specify glob patterns of files to exclude from auto imports.
    "typescript.preferences.autoImportFileExcludePatterns": [],

    // Preferred path style for auto imports.
    //  - shortest: Prefers a non-relative import only if one is available that has fewer path segments than a relative import.
    //  - relative: Prefers a relative path to the imported file location.
    //  - non-relative: Prefers a non-relative import based on the `baseUrl` or `paths` configured in your `jsconfig.json` / `tsconfig.json`.
    //  - project-relative: Prefers a non-relative import only if the relative import path would leave the package or project directory.
    "typescript.preferences.importModuleSpecifier": "shortest",

    // Preferred path ending for auto imports.
    //  - auto: Use project settings to select a default.
    //  - minimal: Shorten `./component/index.js` to `./component`.
    //  - index: Shorten `./component/index.js` to `./component/index`.
    //  - js: Do not shorten path endings; include the `.js` or `.ts` extension.
    "typescript.preferences.importModuleSpecifierEnding": "auto",

    // Enable/disable searching `package.json` dependencies for available auto imports.
    //  - auto: Search dependencies based on estimated performance impact.
    //  - on: Always search dependencies.
    //  - off: Never search dependencies.
    "typescript.preferences.includePackageJsonAutoImports": "auto",

    // Preferred style for JSX attribute completions.
    //  - auto: Insert `={}` or `=""` after attribute names based on the prop type.
    //  - braces: Insert `={}` after attribute names.
    //  - none: Only insert attribute names.
    "typescript.preferences.jsxAttributeCompletionStyle": "auto",

    // Include the `type` keyword in auto-imports whenever possible.
    "typescript.preferences.preferTypeOnlyAutoImports": false,

    // Preferred quote style to use for Quick Fixes.
    //  - auto: Infer quote type from existing code
    //  - single: Always use single quotes: `'`
    //  - double: Always use double quotes: `"`
    "typescript.preferences.quoteStyle": "auto",

    // When on a JSX tag, try to rename the matching tag instead of renaming the symbol.
    "typescript.preferences.renameMatchingJsxTags": true,

    // Enable/disable introducing aliases for object shorthand properties during renames.
    "typescript.preferences.useAliasesForRenames": true,

    // Makes Go to Definition avoid type declaration files when possible by triggering Go to Source Definition instead. This allows Go to Source Definition to be triggered with the mouse gesture.
    "typescript.preferGoToSourceDefinition": false,

    // Enable/disable references CodeLens in TypeScript files.
    "typescript.referencesCodeLens.enabled": false,

    // Enable/disable references CodeLens on all functions in TypeScript files.
    "typescript.referencesCodeLens.showOnAllFunctions": false,

    // Report style checks as warnings.
    "typescript.reportStyleChecksAsWarnings": true,

    // Enable/disable auto import suggestions.
    "typescript.suggest.autoImports": true,

    // Enable/disable snippet completions for class members.
    "typescript.suggest.classMemberSnippets.enabled": true,

    // Complete functions with their parameter signature.
    "typescript.suggest.completeFunctionCalls": false,

    // Enable/disable suggestion to complete JSDoc comments.
    "typescript.suggest.completeJSDocs": true,

    // Enabled/disable autocomplete suggestions.
    "typescript.suggest.enabled": true,

    // Enable/disable showing completions on potentially undefined values that insert an optional chain call. Requires strict null checks to be enabled.
    "typescript.suggest.includeAutomaticOptionalChainCompletions": true,

    // Enable/disable auto-import-style completions on partially-typed import statements.
    "typescript.suggest.includeCompletionsForImportStatements": true,

    // Enable/disable generating `@returns` annotations for JSDoc templates.
    "typescript.suggest.jsdoc.generateReturns": true,

    // Enable/disable snippet completions for methods in object literals.
    "typescript.suggest.objectLiteralMethodSnippets.enabled": true,

    // Enable/disable suggestions for paths in import statements and require calls.
    "typescript.suggest.paths": true,

    // Enable/disable suggestion diagnostics for TypeScript files in the editor.
    "typescript.suggestionActions.enabled": true,

    // Enabled/disable occasional surveys that help us improve VS Code's JavaScript and TypeScript support.
    "typescript.surveys.enabled": true,

    // Controls auto detection of tsc tasks.
    //  - on: Create both build and watch tasks.
    //  - off: Disable this feature.
    //  - build: Only create single run compile tasks.
    //  - watch: Only create compile and watch tasks.
    "typescript.tsc.autoDetect": "on",

    // Specifies the folder path to the tsserver and `lib*.d.ts` files under a TypeScript install to use for IntelliSense, for example: `./node_modules/typescript/lib`.
    // - When specified as a user setting, the TypeScript version from `typescript.tsdk` automatically replaces the built-in TypeScript version.
    // - When specified as a workspace setting, `typescript.tsdk` allows you to switch to use that workspace version of TypeScript for IntelliSense with the `TypeScript: Select TypeScript version` command.
    "typescript.tsdk": "",

    // Enables region-based diagnostics in TypeScript.
    "typescript.tsserver.enableRegionDiagnostics": true,

    // Enables tracing TS server performance to a directory. These trace files can be used to diagnose TS Server performance issues. The log may contain file paths, source code, and other potentially sensitive information from your project.
    "typescript.tsserver.enableTracing": false,

    // Enables logging of the TS server to a file. This log can be used to diagnose TS Server issues. The log may contain file paths, source code, and other potentially sensitive information from your project.
    "typescript.tsserver.log": "off",

    // The maximum amount of memory (in MB) to allocate to the TypeScript server process.
    "typescript.tsserver.maxTsServerMemory": 3072,

    // Run TS Server on a custom Node installation. This can be a path to a Node executable, or 'node' if you want VS Code to detect a Node installation.
    "typescript.tsserver.nodePath": "",

    // Additional paths to discover TypeScript Language Service plugins.
    "typescript.tsserver.pluginPaths": [],

    // Controls if TypeScript launches a dedicated server to more quickly handle syntax related operations, such as computing code folding.
    //  - always: Use a lighter weight syntax server to handle all IntelliSense operations. This syntax server can only provide IntelliSense for opened files.
    //  - never: Don't use a dedicated syntax server. Use a single server to handle all IntelliSense operations.
    //  - auto: Spawn both a full server and a lighter weight server dedicated to syntax operations. The syntax server is used to speed up syntax operations and provide IntelliSense while projects are loading.
    "typescript.tsserver.useSyntaxServer": "auto",

    // Configure which watching strategies should be used to keep track of files and directories.
    "typescript.tsserver.watchOptions": {},

    // Enable/disable project-wide IntelliSense on web.
    "typescript.tsserver.web.projectWideIntellisense.enabled": true,

    // Suppresses semantic errors.
    "typescript.tsserver.web.projectWideIntellisense.suppressSemanticErrors": true,

    // Enable/disable package acquisition on the web. This enables IntelliSense for imported packages.
    "typescript.tsserver.web.typeAcquisition.enabled": false,

    // Enable/disable automatic updating of import paths when you rename or move a file in VS Code.
    //  - prompt: Prompt on each rename.
    //  - always: Always update paths automatically.
    //  - never: Never rename paths and don't prompt.
    "typescript.updateImportsOnFileMove.enabled": "prompt",

    // Enable/disable TypeScript validation.
    "typescript.validate.enable": true,

    // Exclude symbols that come from library files in Go to Symbol in Workspace results.
    "typescript.workspaceSymbols.excludeLibrarySymbols": true,

    // Controls which files are searched by Go to Symbol in Workspace.
    //  - allOpenProjects: Search all open JavaScript or TypeScript projects for symbols.
    //  - currentProject: Only search for symbols in the current JavaScript or TypeScript project.
    "typescript.workspaceSymbols.scope": "allOpenProjects",

// Testing

    // Always reveal the executed test when `testing.followRunningTest` is on. If this setting is turned off, only failed tests will be revealed.
    "testing.alwaysRevealTestOnStateChange": false,

    // Configures when the error Peek view is automatically opened.
    //  - failureAnywhere: Open automatically no matter where the failure is.
    //  - failureInVisibleDocument: Open automatically when a test fails in a visible document.
    //  - never: Never automatically open.
    "testing.automaticallyOpenPeekView": "failureInVisibleDocument",

    // Controls whether to automatically open the Peek view during continuous run mode.
    "testing.automaticallyOpenPeekViewDuringAutoRun": false,

    // How long to wait, in milliseconds, after a test is marked as outdated and starting a new run.
    "testing.autoRun.delay": 1000,

    // Controls the count badge on the Testing icon on the Activity Bar.
    //  - failed: Show the number of failed tests
    //  - off: Disable the testing count badge
    //  - passed: Show the number of passed tests
    //  - skipped: Show the number of skipped tests
    "testing.countBadge": "failed",

    // Configures the colors used for percentages in test coverage bars.
    "testing.coverageBarThresholds": {
        "red": 0,
        "yellow": 60,
        "green": 90
    },

    // Controls whether the coverage toolbar is shown in the editor.
    "testing.coverageToolbarEnabled": false,

    // Controls the action to take when left-clicking on a test decoration in the gutter.
    //  - run: Run the test.
    //  - debug: Debug the test.
    //  - runWithCoverage: Run the test with coverage.
    //  - contextMenu: Open the context menu for more options.
    "testing.defaultGutterClickAction": "run",

    // Configures what percentage is displayed by default for test coverage.
    //  - totalCoverage: A calculation of the combined statement, function, and branch coverage.
    //  - statement: The statement coverage.
    //  - minimum: The minimum of statement, function, and branch coverage.
    "testing.displayedCoveragePercent": "totalCoverage",

    // Controls whether the running test should be followed in the Test Explorer view.
    "testing.followRunningTest": true,

    // Controls whether test decorations are shown in the editor gutter.
    "testing.gutterEnabled": true,

    // Controls when the testing view should open.
    //  - neverOpen: Never automatically open the testing views
    //  - openOnTestStart: Open the test results view when tests start
    //  - openOnTestFailure: Open the test result view on any test failure
    //  - openExplorerOnTestStart: Open the test explorer when tests start
    "testing.openTesting": "openOnTestStart",

    // Control whether save all dirty editors before running a test.
    "testing.saveBeforeTest": true,

    // Controls whether to show messages from all test runs.
    "testing.showAllMessages": false,

    // Whether test coverage should be down in the File Explorer view.
    "testing.showCoverageInExplorer": true,

// CSS

    // Insert semicolon at end of line when completing CSS properties.
    "css.completion.completePropertyWithSemicolon": true,

    // By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.
    "css.completion.triggerPropertyValueCompletion": true,

    // A list of relative file paths pointing to JSON files following the [custom data format.
    // VS Code loads custom data on startup to enhance its CSS support for the custom CSS properties (variables), at-rules, pseudo-classes, and pseudo-elements you specify in the JSON files.
    // The file paths are relative to workspace and only workspace folder settings are considered.
    "css.customData": [],

    // Put braces on the same line as rules (`collapse`) or put braces on own line (`expand`).
    "css.format.braceStyle": "collapse",

    // Enable/disable default CSS formatter.
    "css.format.enable": true,

    // Maximum number of line breaks to be preserved in one chunk, when `css.format.preserveNewLines` is enabled.
    "css.format.maxPreserveNewLines": null,

    // Separate rulesets by a blank line.
    "css.format.newlineBetweenRules": true,

    // Separate selectors with a new line.
    "css.format.newlineBetweenSelectors": true,

    // Whether existing line breaks before elements should be preserved.
    "css.format.preserveNewLines": true,

    // Ensure a space character around selector separators '>', '+', '~' (e.g. `a > b`).
    "css.format.spaceAroundSelectorSeparator": false,

    // Show tag and attribute documentation in CSS hovers.
    "css.hover.documentation": true,

    // Show references to MDN in CSS hovers.
    "css.hover.references": true,

    // Invalid number of parameters.
    "css.lint.argumentsInColorFunction": "error",

    // Do not use `width` or `height` when using `padding` or `border`.
    "css.lint.boxModel": "ignore",

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties.
    "css.lint.compatibleVendorPrefixes": "ignore",

    // Do not use duplicate style definitions.
    "css.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets.
    "css.lint.emptyRules": "warning",

    // Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "css.lint.float": "ignore",

    // `@font-face` rule must define `src` and `font-family` properties.
    "css.lint.fontFaceProperties": "warning",

    // Hex colors must consist of 3, 4, 6 or 8 hex numbers.
    "css.lint.hexColorLength": "error",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "css.lint.idSelector": "ignore",

    // IE hacks are only necessary when supporting IE7 and older.
    "css.lint.ieHack": "ignore",

    // Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "css.lint.important": "ignore",

    // Import statements do not load in parallel.
    "css.lint.importStatement": "ignore",

    // Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect.
    "css.lint.propertyIgnoredDueToDisplay": "warning",

    // The universal selector (`*`) is known to be slow.
    "css.lint.universalSelector": "ignore",

    // Unknown at-rule.
    "css.lint.unknownAtRules": "warning",

    // Unknown property.
    "css.lint.unknownProperties": "warning",

    // Unknown vendor specific property.
    "css.lint.unknownVendorSpecificProperties": "ignore",

    // A list of properties that are not validated against the `unknownProperties` rule.
    "css.lint.validProperties": [],

    // When using a vendor-specific prefix, also include the standard property.
    "css.lint.vendorPrefix": "warning",

    // No unit for zero needed.
    "css.lint.zeroUnits": "ignore",

    // Traces the communication between VS Code and the CSS language server.
    "css.trace.server": "off",

    // Enables or disables all validations.
    "css.validate": true,

// LESS

    // Insert semicolon at end of line when completing CSS properties.
    "less.completion.completePropertyWithSemicolon": true,

    // By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.
    "less.completion.triggerPropertyValueCompletion": true,

    // Put braces on the same line as rules (`collapse`) or put braces on own line (`expand`).
    "less.format.braceStyle": "collapse",

    // Enable/disable default LESS formatter.
    "less.format.enable": true,

    // Maximum number of line breaks to be preserved in one chunk, when `less.format.preserveNewLines` is enabled.
    "less.format.maxPreserveNewLines": null,

    // Separate rulesets by a blank line.
    "less.format.newlineBetweenRules": true,

    // Separate selectors with a new line.
    "less.format.newlineBetweenSelectors": true,

    // Whether existing line breaks before elements should be preserved.
    "less.format.preserveNewLines": true,

    // Ensure a space character around selector separators '>', '+', '~' (e.g. `a > b`).
    "less.format.spaceAroundSelectorSeparator": false,

    // Show tag and attribute documentation in LESS hovers.
    "less.hover.documentation": true,

    // Show references to MDN in LESS hovers.
    "less.hover.references": true,

    // Invalid number of parameters.
    "less.lint.argumentsInColorFunction": "error",

    // Do not use `width` or `height` when using `padding` or `border`.
    "less.lint.boxModel": "ignore",

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties.
    "less.lint.compatibleVendorPrefixes": "ignore",

    // Do not use duplicate style definitions.
    "less.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets.
    "less.lint.emptyRules": "warning",

    // Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "less.lint.float": "ignore",

    // `@font-face` rule must define `src` and `font-family` properties.
    "less.lint.fontFaceProperties": "warning",

    // Hex colors must consist of 3, 4, 6 or 8 hex numbers.
    "less.lint.hexColorLength": "error",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "less.lint.idSelector": "ignore",

    // IE hacks are only necessary when supporting IE7 and older.
    "less.lint.ieHack": "ignore",

    // Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "less.lint.important": "ignore",

    // Import statements do not load in parallel.
    "less.lint.importStatement": "ignore",

    // Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect.
    "less.lint.propertyIgnoredDueToDisplay": "warning",

    // The universal selector (`*`) is known to be slow.
    "less.lint.universalSelector": "ignore",

    // Unknown at-rule.
    "less.lint.unknownAtRules": "warning",

    // Unknown property.
    "less.lint.unknownProperties": "warning",

    // Unknown vendor specific property.
    "less.lint.unknownVendorSpecificProperties": "ignore",

    // A list of properties that are not validated against the `unknownProperties` rule.
    "less.lint.validProperties": [],

    // When using a vendor-specific prefix, also include the standard property.
    "less.lint.vendorPrefix": "warning",

    // No unit for zero needed.
    "less.lint.zeroUnits": "ignore",

    // Enables or disables all validations.
    "less.validate": true,

// SCSS (Sass)

    // Insert semicolon at end of line when completing CSS properties.
    "scss.completion.completePropertyWithSemicolon": true,

    // By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.
    "scss.completion.triggerPropertyValueCompletion": true,

    // Put braces on the same line as rules (`collapse`) or put braces on own line (`expand`).
    "scss.format.braceStyle": "collapse",

    // Enable/disable default SCSS formatter.
    "scss.format.enable": true,

    // Maximum number of line breaks to be preserved in one chunk, when `scss.format.preserveNewLines` is enabled.
    "scss.format.maxPreserveNewLines": null,

    // Separate rulesets by a blank line.
    "scss.format.newlineBetweenRules": true,

    // Separate selectors with a new line.
    "scss.format.newlineBetweenSelectors": true,

    // Whether existing line breaks before elements should be preserved.
    "scss.format.preserveNewLines": true,

    // Ensure a space character around selector separators '>', '+', '~' (e.g. `a > b`).
    "scss.format.spaceAroundSelectorSeparator": false,

    // Show tag and attribute documentation in SCSS hovers.
    "scss.hover.documentation": true,

    // Show references to MDN in SCSS hovers.
    "scss.hover.references": true,

    // Invalid number of parameters.
    "scss.lint.argumentsInColorFunction": "error",

    // Do not use `width` or `height` when using `padding` or `border`.
    "scss.lint.boxModel": "ignore",

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties.
    "scss.lint.compatibleVendorPrefixes": "ignore",

    // Do not use duplicate style definitions.
    "scss.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets.
    "scss.lint.emptyRules": "warning",

    // Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "scss.lint.float": "ignore",

    // `@font-face` rule must define `src` and `font-family` properties.
    "scss.lint.fontFaceProperties": "warning",

    // Hex colors must consist of 3, 4, 6 or 8 hex numbers.
    "scss.lint.hexColorLength": "error",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "scss.lint.idSelector": "ignore",

    // IE hacks are only necessary when supporting IE7 and older.
    "scss.lint.ieHack": "ignore",

    // Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "scss.lint.important": "ignore",

    // Import statements do not load in parallel.
    "scss.lint.importStatement": "ignore",

    // Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect.
    "scss.lint.propertyIgnoredDueToDisplay": "warning",

    // The universal selector (`*`) is known to be slow.
    "scss.lint.universalSelector": "ignore",

    // Unknown at-rule.
    "scss.lint.unknownAtRules": "warning",

    // Unknown property.
    "scss.lint.unknownProperties": "warning",

    // Unknown vendor specific property.
    "scss.lint.unknownVendorSpecificProperties": "ignore",

    // A list of properties that are not validated against the `unknownProperties` rule.
    "scss.lint.validProperties": [],

    // When using a vendor-specific prefix, also include the standard property.
    "scss.lint.vendorPrefix": "warning",

    // No unit for zero needed.
    "scss.lint.zeroUnits": "ignore",

    // Enables or disables all validations.
    "scss.validate": true,

// Extensions

    // When enabled, automatically checks extensions for updates. If an extension has an update, it is marked as outdated in the Extensions view. The updates are fetched from a Microsoft online service.
    "extensions.autoCheckUpdates": true,

    // If activated, extensions will automatically restart following an update if the window is not in focus.
    "extensions.autoRestart": false,

    // Controls the automatic update behavior of extensions. The updates are fetched from a Microsoft online service.
    //  - true: Download and install updates automatically for all extensions, except for those extensions where updates are ignored.
    //  - onlyEnabledExtensions: Download and install updates automatically only for enabled extensions.
    //  - false: Extensions are not automatically updated.
    "extensions.autoUpdate": true,

    // When enabled, editors with extension details will be automatically closed upon navigating away from the Extensions View.
    "extensions.closeExtensionDetailsOnViewChange": false,

    // When an extension is listed here, a confirmation prompt will not be shown when that extension handles a URI.
    "extensions.confirmedUriHandlerExtensionIds": [],

    // When enabled, the notifications for extension recommendations will not be shown.
    "extensions.ignoreRecommendations": false,

    // Override the untrusted workspace support of an extension. Extensions using `true` will always be enabled. Extensions using `limited` will always be enabled, and the extension will hide functionality that requires trust. Extensions using `false` will only be enabled only when the workspace is trusted.
    "extensions.supportUntrustedWorkspaces": {},

    // Override the virtual workspaces support of an extension.
    "extensions.supportVirtualWorkspaces": {},

    // Enable web worker extension host.
    //  - true: The Web Worker Extension Host will always be launched.
    //  - false: The Web Worker Extension Host will never be launched.
    //  - auto: The Web Worker Extension Host will be launched when a web extension needs it.
    "extensions.webWorker": "auto",

// Output

    // Enable/disable the ability of smart scrolling in the output view. Smart scrolling allows you to lock scrolling automatically when you click in the output view and unlocks when you click in the last line.
    "output.smartScroll.enabled": true,

// Settings Sync

    // List of extensions to be ignored while synchronizing. The identifier of an extension is always `${publisher}.${name}`. For example: `vscode.csharp`.
    "settingsSync.ignoredExtensions": [],

    // Configure settings to be ignored while synchronizing.
    "settingsSync.ignoredSettings": [],

    // Synchronize keybindings for each platform.
    "settingsSync.keybindingsPerPlatform": true,

// Notebooks

    // Controls whether code cells in the interactive window are collapsed by default.
    "interactiveWindow.collapseCellInputCode": "fromEditor",

    // The limit of notebook output size in kilobytes (KB) where notebook files will no longer be backed up for hot reload. Use 0 for unlimited.
    "notebook.backup.sizeLimit": 10000,

    // When enabled, notebook breadcrumbs contain code cells.
    "notebook.breadcrumbs.showCodeCells": true,

    // Show available diagnostics for cell failures.
    "notebook.cellFailureDiagnostics": true,

    // Controls where the focus indicator is rendered, either along the cell borders or on the left gutter.
    "notebook.cellFocusIndicator": "gutter",

    // Where the cell toolbar should be shown, or whether it should be hidden.
    "notebook.cellToolbarLocation": {
        "default": "right"
    },

    // Whether the cell toolbar should appear on hover or click.
    "notebook.cellToolbarVisibility": "click",

    // Run a series of Code Actions for a notebook on save.
    "notebook.codeActionsOnSave": {},

    // Control whether the notebook editor should be rendered in a compact form. For example, when turned on, it will decrease the left margin width.
    "notebook.compactView": true,

    // Control whether a confirmation prompt is required to delete a running cell.
    "notebook.confirmDeleteRunningCell": true,

    // Control whether outputs action should be rendered in the output toolbar.
    "notebook.consolidatedOutputButton": true,

    // Control whether extra actions are shown in a dropdown next to the run button.
    "notebook.consolidatedRunButton": false,

    // Defines a default notebook formatter which takes precedence over all other formatter settings. Must be the identifier of an extension contributing a formatter.
    "notebook.defaultFormatter": null,

    // Whether to use the enhanced text diff editor for notebook.
    "notebook.diff.enablePreview": true,

    // Hide Metadata Differences
    "notebook.diff.ignoreMetadata": false,

    // Hide Outputs Differences
    "notebook.diff.ignoreOutputs": false,

    // Whether to render the overview ruler in the diff editor for notebook.
    "notebook.diff.overviewRuler": false,

    // Priority list for output mime types
    "notebook.displayOrder": [],

    // Control whether the notebook editor should allow moving cells through drag and drop.
    "notebook.dragAndDropEnabled": true,

    // Settings for code editors used in notebooks. This can be used to customize most editor.* settings.
    "notebook.editorOptionsCustomizations": {},

    // Customize the Find Widget behavior for searching within notebook cells. When both markup source and markup preview are enabled, the Find Widget will search either the source code or preview based on the current state of the cell.
    "notebook.find.filters": {
        "markupSource": true,
        "markupPreview": true,
        "codeSource": true,
        "codeOutput": true
    },

    // Format a notebook cell upon execution. A formatter must be available.
    "notebook.formatOnCellExecution": false,

    // Format a notebook on save. A formatter must be available, `files.autoSave` must not be set to `afterDelay`, and the editor must not be shutting down when formatting.
    "notebook.formatOnSave.enabled": false,

    // Control whether to render a global toolbar inside the notebook editor.
    "notebook.globalToolbar": true,

    // Control whether the actions on the notebook toolbar should render label or not.
    "notebook.globalToolbarShowLabel": "always",

    // When enabled the Go to Symbol Quick Pick will display full code symbols from the notebook, as well as Markdown headers.
    "notebook.gotoSymbols.showAllSymbols": true,

    // When enabled, insert a final new line into the end of code cells when saving a notebook.
    "notebook.insertFinalNewline": false,

    // Control where the insert cell actions should appear.
    //  - betweenCells: A toolbar that appears on hover between cells.
    //  - notebookToolbar: The toolbar at the top of the notebook editor.
    //  - both: Both toolbars.
    //  - hidden: The insert actions don't appear anywhere.
    "notebook.insertToolbarLocation": "both",

    // Controls the display of line numbers in the cell editor.
    "notebook.lineNumbers": "off",

    // Controls the line height in pixels of markdown cells in notebooks. When set to `0`, `normal` will be used
    "notebook.markdown.lineHeight": 0,

    // Controls the font size in pixels of rendered markup in notebooks. When set to `0`, 120% of `editor.fontSize` is used.
    "notebook.markup.fontSize": 0,

    // When enabled cursor can navigate to the next/previous cell when the current cursor in the cell editor is at the first/last line.
    "notebook.navigation.allowNavigateToSurroundingCells": true,

    // When enabled, notebook outline shows code cells.
    "notebook.outline.showCodeCells": false,

    // When enabled, notebook outline shows code cell symbols.
    "notebook.outline.showCodeCellSymbols": true,

    // When enabled, notebook outline will show only markdown cells containing a header.
    "notebook.outline.showMarkdownHeadersOnly": true,

    // The font family of the output text within notebook cells. When set to empty, the `editor.fontFamily` is used.
    "notebook.output.fontFamily": "",

    // Font size for the output text within notebook cells. When set to 0, `editor.fontSize` is used.
    "notebook.output.fontSize": 0,

    // Line height of the output text within notebook cells.
    //  - When set to 0, editor line height is used.
    //  - Values between 0 and 8 will be used as a multiplier with the font size.
    //  - Values greater than or equal to 8 will be used as effective values.
    "notebook.output.lineHeight": 0,

    // Control whether to disable filepath links in the output of notebook cells.
    "notebook.output.linkifyFilePaths": true,

    // Control whether to render error output in a minimal style.
    "notebook.output.minimalErrorRendering": false,

    // Initially render notebook outputs in a scrollable region when longer than the limit.
    "notebook.output.scrolling": true,

    // Controls how many lines of text are displayed in a text output.
    "notebook.output.textLineLimit": 30,

    // Controls whether the lines in output should wrap.
    "notebook.output.wordWrap": false,

    // How far to scroll when revealing the next cell upon running notebook.cell.executeAndSelectBelow.
    //  - fullCell: Scroll to fully reveal the next cell.
    //  - firstLine: Scroll to reveal the first line of the next cell.
    //  - none: Do not scroll.
    "notebook.scrolling.revealNextCellOnExecute": "fullCell",

    // Whether the cell status bar should be shown.
    //  - hidden: The cell Status bar is always hidden.
    //  - visible: The cell Status bar is always visible.
    //  - visibleAfterExecute: The cell Status bar is hidden until the cell has executed. Then it becomes visible to show the execution status.
    "notebook.showCellStatusBar": "visible",

    // Controls when the Markdown header folding arrow is shown.
    //  - always: The folding controls are always visible.
    //  - never: Never show the folding controls and reduce the gutter size.
    //  - mouseover: The folding controls are visible only on mouseover.
    "notebook.showFoldingControls": "mouseover",

    // Controls whether to render notebook Sticky Scroll headers in the notebook editor.
    "notebook.stickyScroll.enabled": false,

    // Control whether nested sticky lines appear to stack flat or indented.
    //  - flat: Nested sticky lines appear flat.
    //  - indented: Nested sticky lines appear indented.
    "notebook.stickyScroll.mode": "indented",

    // Whether to use separate undo/redo stack for each cell.
    "notebook.undoRedoPerCell": true,

    // Automatically scroll the interactive window to show the output of the last statement executed. If this value is false, the window will only scroll if the last cell was already the one scrolled to.
    "interactiveWindow.alwaysScrollOnNewCell": true,

    // Execute the Interactive Window (REPL) input box with shift+enter, so that enter can be used to create a newline.
    "interactiveWindow.executeWithShiftEnter": false,

    // Prompt to save the interactive window when it is closed. Only new interactive windows will be affected by this setting change.
    "interactiveWindow.promptToSaveOnClose": false,

    // Display a hint in the Interactive Window (REPL) input box to indicate how to execute code.
    "interactiveWindow.showExecutionHint": true,

// Terminal

    // When opening a file from the Explorer in a terminal, determines what kind of terminal will be launched
    //  - integrated: Use VS Code's integrated terminal.
    //  - external: Use the configured external terminal.
    //  - both: Use the other two together.
    "terminal.explorerKind": "integrated",

    // Customizes which terminal to run on Linux.
    "terminal.external.linuxExec": "xterm",

    // Customizes which terminal application to run on macOS.
    "terminal.external.osxExec": "Terminal.app",

    // Customizes which terminal to run on Windows.
    "terminal.external.windowsExec": "C:\\WINDOWS\\System32\\cmd.exe",

    // When opening a repository from the Source Control Repositories view in a terminal, determines what kind of terminal will be launched
    //  - integrated: Use VS Code's integrated terminal.
    //  - external: Use the configured external terminal.
    //  - both: Use the other two together.
    "terminal.sourceControlRepositoriesKind": "integrated",

    // Focus the terminal accessible view when a command is executed.
    "terminal.integrated.accessibleViewFocusOnCommandExecution": false,

    // Preserve the cursor position on reopen of the terminal's accessible view rather than setting it to the bottom of the buffer.
    "terminal.integrated.accessibleViewPreserveCursorPosition": false,

    // Whether or not to allow chord keybindings in the terminal. Note that when this is true and the keystroke results in a chord it will bypass `terminal.integrated.commandsToSkipShell`, setting this to false is particularly useful when you want ctrl+k to go to your shell (not VS Code).
    "terminal.integrated.allowChords": true,

    // An array of strings containing the URI schemes that the terminal is allowed to open links for.
    "terminal.integrated.allowedLinkSchemes": [
        "file",
        "http",
        "https",
        "mailto",
        "vscode",
        "vscode-insiders"
    ],

    // Whether to allow menubar mnemonics (for example Alt+F) to trigger the open of the menubar. Note that this will cause all alt keystrokes to skip the shell when true. This does nothing on macOS.
    "terminal.integrated.allowMnemonics": false,

    // If enabled, alt/option + click will reposition the prompt cursor to underneath the mouse when `editor.multiCursorModifier` is set to `'alt'` (the default value). This may not work reliably depending on your shell.
    "terminal.integrated.altClickMovesCursor": true,

    // The terminal profile to use on Linux for automation-related terminal usage like tasks and debug.
    "terminal.integrated.automationProfile.linux": null,

    // The terminal profile to use on macOS for automation-related terminal usage like tasks and debug.
    "terminal.integrated.automationProfile.osx": null,

    // The terminal profile to use for automation-related terminal usage like tasks and debug. This setting will currently be ignored if `terminal.integrated.automationShell.windows` (now deprecated) is set.
    "terminal.integrated.automationProfile.windows": null,

    // A set of messages that, when encountered in the terminal, will be automatically responded to. Provided the message is specific enough, this can help automate away common responses.
    "terminal.integrated.autoReplies": {},

    // The number of milliseconds to show the bell within a terminal tab when triggered.
    "terminal.integrated.bellDuration": 1000,

    // A set of command IDs whose keybindings will not be sent to the shell but instead always be handled by VS Code. This allows keybindings that would normally be consumed by the shell to act instead the same as when the terminal is not focused, for example `Ctrl+P` to launch Quick Open.
    "terminal.integrated.commandsToSkipShell": [],

    // Controls whether to confirm when the window closes if there are active terminal sessions.
    //  - never: Never confirm.
    //  - always: Always confirm if there are terminals.
    //  - hasChildProcesses: Confirm if there are any terminals that have child processes.
    "terminal.integrated.confirmOnExit": "never",

    // Controls whether to confirm killing terminals when they have child processes. When set to editor, terminals in the editor area will be marked as changed when they have child processes. Note that child process detection may not work well for shells like Git Bash which don't run their processes as child processes of the shell.
    //  - never: Never confirm.
    //  - editor: Confirm if the terminal is in the editor.
    //  - panel: Confirm if the terminal is in the panel.
    //  - always: Confirm if the terminal is either in the editor or panel.
    "terminal.integrated.confirmOnKill": "editor",

    // Controls whether text selected in the terminal will be copied to the clipboard.
    "terminal.integrated.copyOnSelection": false,

    // Controls whether the terminal cursor blinks.
    "terminal.integrated.cursorBlinking": false,

    // Controls the style of terminal cursor when the terminal is focused.
    "terminal.integrated.cursorStyle": "block",

    // Controls the style of terminal cursor when the terminal is not focused.
    "terminal.integrated.cursorStyleInactive": "outline",

    // Controls the width of the cursor when `terminal.integrated.cursorStyle` is set to `line`.
    "terminal.integrated.cursorWidth": 1,

    // Whether to draw custom glyphs for block element and box drawing characters instead of using the font, which typically yields better rendering with continuous lines. Note that this doesn't work when `terminal.integrated.gpuAcceleration` is disabled.
    "terminal.integrated.customGlyphs": true,

    // An explicit start path where the terminal will be launched, this is used as the current working directory (cwd) for the shell process. This may be particularly useful in workspace settings if the root directory is not a convenient cwd.
    "terminal.integrated.cwd": "",

    // Controls where newly created terminals will appear.
    //  - editor: Create terminals in the editor
    //  - view: Create terminals in the terminal view
    "terminal.integrated.defaultLocation": "view",

    // The default terminal profile on Linux.
    "terminal.integrated.defaultProfile.linux": null,

    // The default terminal profile on macOS.
    "terminal.integrated.defaultProfile.osx": null,

    // The default terminal profile on Windows.
    //  - null: Automatically detect the default
    //  - PowerShell: $(terminal-powershell) PowerShell
    // - path: C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
    //  - Windows PowerShell: $(terminal-powershell) Windows PowerShell
    // - path: C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
    //  - Git Bash: $(terminal) Git Bash
    // - path: C:\Program Files\Git\bin\bash.exe
    // - args: ['--login','-i']
    //  - Command Prompt: $(terminal-cmd) Command Prompt
    // - path: C:\WINDOWS\System32\cmd.exe
    // - args: []
    //  - Ubuntu-22.04 (WSL): $(terminal-ubuntu) Ubuntu-22.04 (WSL)
    // - path: C:\WINDOWS\System32\wsl.exe
    // - args: ['-d','Ubuntu-22.04']
    //  - JavaScript Debug Terminal: $($(debug)) JavaScript Debug Terminal
    // - extensionIdentifier: ms-vscode.js-debug
    "terminal.integrated.defaultProfile.windows": null,

    // Controls whether to detect and set the `$LANG` environment variable to a UTF-8 compliant option since VS Code's terminal only supports UTF-8 encoded data coming from the shell.
    //  - auto: Set the `$LANG` environment variable if the existing variable does not exist or it does not end in `'.UTF-8'`.
    //  - off: Do not set the `$LANG` environment variable.
    //  - on: Always set the `$LANG` environment variable.
    "terminal.integrated.detectLocale": "auto",

    // Controls whether bold text in the terminal will always use the "bright" ANSI color variant.
    "terminal.integrated.drawBoldTextInBrightColors": true,

    // This is now deprecated. Instead use the `terminal.integrated.enableVisualBell` and `accessibility.signals.terminalBell` settings.
    //
    "terminal.integrated.enableBell": false,

    // Whether to enable file links in terminals. Links can be slow when working on a network drive in particular because each file link is verified against the file system. Changing this will take effect only in new terminals.
    //  - off: Always off.
    //  - on: Always on.
    //  - notRemote: Enable only when not in a remote workspace.
    "terminal.integrated.enableFileLinks": "on",

    // Enables image support in the terminal, this will only work when `terminal.integrated.gpuAcceleration` is enabled. Both sixel and iTerm's inline image protocol are supported on Linux and macOS, Windows support will light up automatically when ConPTY passes through the sequences. Images will currently not be restored between window reloads/reconnects.
    "terminal.integrated.enableImages": false,

    // Controls whether to show a warning dialog when pasting multiple lines into the terminal.
    //  - auto: Enable the warning but do not show it when:
    //
    // - Bracketed paste mode is enabled (the shell supports multi-line paste natively)
    // - The paste is handled by the shell's readline (in the case of pwsh)
    //  - always: Always show the warning if the text contains a new line.
    //  - never: Never show the warning.
    "terminal.integrated.enableMultiLinePasteWarning": "auto",

    // Persist terminal sessions/history for the workspace across window reloads.
    "terminal.integrated.enablePersistentSessions": true,

    // Controls whether the visual terminal bell is enabled. This shows up next to the terminal's name.
    "terminal.integrated.enableVisualBell": false,

    // Object with environment variables that will be added to the VS Code process to be used by the terminal on Linux. Set to `null` to delete the environment variable.
    "terminal.integrated.env.linux": {},

    // Object with environment variables that will be added to the VS Code process to be used by the terminal on macOS. Set to `null` to delete the environment variable.
    "terminal.integrated.env.osx": {},

    // Object with environment variables that will be added to the VS Code process to be used by the terminal on Windows. Set to `null` to delete the environment variable.
    "terminal.integrated.env.windows": {},

    // Whether to display the environment changes indicator on each terminal which explains whether extensions have made, or want to make changes to the terminal's environment.
    //  - off: Disable the indicator.
    //  - on: Enable the indicator.
    //  - warnonly: Only show the warning indicator when a terminal's environment is 'stale', not the information indicator that shows a terminal has had its environment modified by an extension.
    "terminal.integrated.environmentChangesIndicator": "warnonly",

    // Whether to relaunch terminals automatically if extensions want to contribute to their environment and have not been interacted with yet.
    "terminal.integrated.environmentChangesRelaunch": true,

    // Scrolling speed multiplier when pressing `Alt`.
    "terminal.integrated.fastScrollSensitivity": 5,

    // Controls whether the terminal, accessible buffer, or neither will be focused after `Terminal: Run Selected Text In Active Terminal` has been run.
    //  - terminal: Always focus the terminal.
    //  - accessible-buffer: Always focus the accessible buffer.
    //  - none: Do nothing.
    "terminal.integrated.focusAfterRun": "none",

    // Controls the font family of the terminal. Defaults to `editor.fontFamily`'s value.
    "terminal.integrated.fontFamily": "",

    // Controls the font size in pixels of the terminal.
    "terminal.integrated.fontSize": 14,

    // The font weight to use within the terminal for non-bold text. Accepts "normal" and "bold" keywords or numbers between 1 and 1000.
    "terminal.integrated.fontWeight": "normal",

    // The font weight to use within the terminal for bold text. Accepts "normal" and "bold" keywords or numbers between 1 and 1000.
    "terminal.integrated.fontWeightBold": "bold",

    // Controls whether the terminal will leverage the GPU to do its rendering.
    //  - auto: Let VS Code detect which renderer will give the best experience.
    //  - on: Enable GPU acceleration within the terminal.
    //  - off: Disable GPU acceleration within the terminal. The terminal will render much slower when GPU acceleration is off but it should reliably work on all systems.
    "terminal.integrated.gpuAcceleration": "auto",

    // Whether to hide the terminal view on startup, avoiding creating a terminal when there are no persistent sessions.
    //  - never: Never hide the terminal view on startup.
    //  - whenEmpty: Only hide the terminal when there are no persistent sessions restored.
    //  - always: Always hide the terminal, even when there are persistent sessions restored.
    "terminal.integrated.hideOnStartup": "never",

    // Controls whether the terminal will ignore bracketed paste mode even if the terminal was put into the mode, omitting the `\x1b[200~` and `\x1b[201~` sequences when pasting. This is useful when the shell is not respecting the mode which can happen in sub-shells for example.
    "terminal.integrated.ignoreBracketedPasteMode": false,

    // A set of process names to ignore when using the `terminal.integrated.confirmOnKill` setting.
    "terminal.integrated.ignoreProcessNames": [
        "starship",
        "oh-my-posh",
        "bash",
        "zsh"
    ],

    // Whether new shells should inherit their environment from VS Code, which may source a login shell to ensure $PATH and other development variables are initialized. This has no effect on Windows.
    "terminal.integrated.inheritEnv": true,

    // Controls if the first terminal without input will show a hint about available actions when it is focused.
    "terminal.integrated.initialHint": true,

    // Controls the letter spacing of the terminal. This is an integer value which represents the number of additional pixels to add between characters.
    "terminal.integrated.letterSpacing": 0,

    // Controls the line height of the terminal. This number is multiplied by the terminal font size to get the actual line-height in pixels.
    "terminal.integrated.lineHeight": 1,

    // When local echo should be enabled. This will override `terminal.integrated.localEchoLatencyThreshold`
    //  - on: Always enabled
    //  - off: Always disabled
    //  - auto: Enabled only for remote workspaces
    "terminal.integrated.localEchoEnabled": "auto",

    // Local echo will be disabled when any of these program names are found in the terminal title.
    "terminal.integrated.localEchoExcludePrograms": [
        "vim",
        "vi",
        "nano",
        "tmux"
    ],

    // Length of network delay, in milliseconds, where local edits will be echoed on the terminal without waiting for server acknowledgement. If '0', local echo will always be on, and if '-1' it will be disabled.
    "terminal.integrated.localEchoLatencyThreshold": 30,

    // Terminal style of locally echoed text; either a font style or an RGB color.
    "terminal.integrated.localEchoStyle": "dim",

    // Controls whether to force selection when using Option+click on macOS. This will force a regular (line) selection and disallow the use of column selection mode. This enables copying and pasting using the regular terminal selection, for example, when mouse mode is enabled in tmux.
    "terminal.integrated.macOptionClickForcesSelection": false,

    // Controls whether to treat the option key as the meta key in the terminal on macOS.
    "terminal.integrated.macOptionIsMeta": false,

    // Controls how terminal reacts to middle click.
    //  - default: The platform default to focus the terminal. On Linux this will also paste the selection.
    //  - paste: Paste on middle click.
    "terminal.integrated.middleClickBehavior": "default",

    // When set, the foreground color of each cell will change to try meet the contrast ratio specified. Note that this will not apply to `powerline` characters per #146406. Example values:
    //
    // - 1: Do nothing and use the standard theme colors.
    // - 4.5: [WCAG AA compliance (minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (default).
    // - 7: [WCAG AAA compliance (enhanced)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html).
    // - 21: White on black or black on white.
    "terminal.integrated.minimumContrastRatio": 4.5,

    // A multiplier to be used on the `deltaY` of mouse wheel scroll events.
    "terminal.integrated.mouseWheelScrollSensitivity": 1,

    // Zoom the font of the terminal when using mouse wheel and holding `Ctrl`.
    "terminal.integrated.mouseWheelZoom": false,

    // When the terminal process must be shut down (for example on window or application close), this determines when the previous terminal session contents/history should be restored and processes be recreated when the workspace is next opened.
    //
    // Caveats:
    //
    // - Restoring of the process current working directory depends on whether it is supported by the shell.
    // - Time to persist the session during shutdown is limited, so it may be aborted when using high-latency remote connections.
    //  - onExit: Revive the processes after the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu).
    //  - onExitAndWindowClose: Revive the processes after the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu), or when the window is closed.
    //  - never: Never restore the terminal buffers or recreate the process.
    "terminal.integrated.persistentSessionReviveProcess": "onExit",

    // Controls the maximum amount of lines that will be restored when reconnecting to a persistent terminal session. Increasing this will restore more lines of scrollback at the cost of more memory and increase the time it takes to connect to terminals on start up. This setting requires a restart to take effect and should be set to a value less than or equal to `terminal.integrated.scrollback`.
    "terminal.integrated.persistentSessionScrollback": 100,

    // A set of terminal profile customizations for Linux which allows adding, removing or changing how terminals are launched. Profiles are made up of a mandatory path, optional arguments and other presentation options.
    //
    // To override an existing profile use its profile name as the key, for example:
    //
    // ```json
    // "terminal.integrated.profile.linux": {
    //   "bash": null
    // }
    // ```
    //
    // [Read more about configuring profiles](https://code.visualstudio.com/docs/terminal/profiles).
    "terminal.integrated.profiles.linux": {
        "bash": {
            "path": "bash",
            "icon": "terminal-bash"
        },
        "zsh": {
            "path": "zsh"
        },
        "fish": {
            "path": "fish"
        },
        "tmux": {
            "path": "tmux",
            "icon": "terminal-tmux"
        },
        "pwsh": {
            "path": "pwsh",
            "icon": "terminal-powershell"
        }
    },

    // A set of terminal profile customizations for Mac which allows adding, removing or changing how terminals are launched. Profiles are made up of a mandatory path, optional arguments and other presentation options.
    "terminal.integrated.profiles.osx": { },

    // A set of terminal profile customizations for Windows which allows adding, removing or changing how terminals are launched. Profiles are made up of a mandatory path, optional arguments and other presentation options.
    "terminal.integrated.profiles.windows": { },

    // Rescale glyphs horizontally that are a single cell wide but have glyphs that would overlap following cell(s).
    "terminal.integrated.rescaleOverlappingGlyphs": true,

    // Controls how terminal reacts to right click.
    //  - default: Show the context menu.
    //  - copyPaste: Copy when there is a selection, otherwise paste.
    //  - paste: Paste on right click.
    //  - selectWord: Select the word under the cursor and show the context menu.
    //  - nothing: Do nothing and pass event to terminal.
    "terminal.integrated.rightClickBehavior": "copyPaste",

    // Controls the maximum number of lines the terminal keeps in its buffer.
    "terminal.integrated.scrollback": 1000,

    // Dispatches most keybindings to the terminal instead of the workbench, overriding `terminal.integrated.commandsToSkipShell`, which can be used alternatively for fine tuning.
    "terminal.integrated.sendKeybindingsToShell": false,

    // When shell integration is enabled, adds a decoration for each command.
    //  - both: Show decorations in the gutter (left) and overview ruler (right)
    //  - gutter: Show gutter decorations to the left of the terminal
    //  - overviewRuler: Show overview ruler decorations to the right of the terminal
    //  - never: Do not show decorations
    "terminal.integrated.shellIntegration.decorationsEnabled": "both",

    // Determines whether or not shell integration is auto-injected to support features like enhanced command tracking and current working directory detection.
    "terminal.integrated.shellIntegration.enabled": true,

    // Controls the number of recently used commands to keep in the terminal command history. Set to 0 to disable terminal command history.
    "terminal.integrated.shellIntegration.history": 100,

    // Controls whether to show the alert "The terminal process terminated with exit code" when exit code is non-zero.
    "terminal.integrated.showExitAlert": true,

    // Whether to show hovers for links in the terminal output.
    "terminal.integrated.showLinkHover": true,

    // Controls whether the terminal will scroll using an animation.
    "terminal.integrated.smoothScrolling": false,

    // Controls the working directory a split terminal starts with.
    //  - workspaceRoot: A new split terminal will use the workspace root as the working directory. In a multi-root workspace a choice for which root folder to use is offered.
    //  - initial: A new split terminal will use the working directory that the parent terminal started with.
    //  - inherited: On macOS and Linux, a new split terminal will use the working directory of the parent terminal. On Windows, this behaves the same as initial.
    "terminal.integrated.splitCwd": "inherited",

    // Shows the current command at the top of the terminal.
    "terminal.integrated.stickyScroll.enabled": true,

    // Defines the maximum number of sticky lines to show. Sticky scroll lines will never exceed 40% of the viewport regardless of this setting.
    "terminal.integrated.stickyScroll.maxLineCount": 5,

    // Controls which built-in completions are activated. This setting can cause conflicts if custom shell completions are configured in the shell profile.
    "terminal.integrated.suggest.builtinCompletions": {
        "pwshCode": true,
        "pwshGit": true
    },

    // Enables experimental terminal Intellisense suggestions for supported shells (PowerShell) when `terminal.integrated.shellIntegration.enabled` is set to `true`.
    "terminal.integrated.suggest.enabled": false,

    // Controls whether suggestions should automatically show up while typing.
    "terminal.integrated.suggest.quickSuggestions": true,

    // Controls whether suggestions should run immediately when `Enter` (not `Tab`) is used to accept the result.
    //  - never: Never run on `Enter`.
    //  - exactMatch: Run on `Enter` when the suggestion is typed in its entirety.
    //  - exactMatchIgnoreExtension: Run on `Enter` when the suggestion is typed in its entirety or when a file is typed without its extension included.
    //  - always: Always run on `Enter`.
    "terminal.integrated.suggest.runOnEnter": "exactMatchIgnoreExtension",

    // Controls whether suggestions should automatically show up when typing trigger characters.
    "terminal.integrated.suggest.suggestOnTriggerCharacters": true,

    // A theme color ID to associate with terminal icons by default.
    "terminal.integrated.tabs.defaultColor": null,

    // A codicon ID to associate with terminal icons by default.
    "terminal.integrated.tabs.defaultIcon": "terminal",

    // Controls the terminal description, which appears to the right of the title. Variables are substituted based on the context:
    // - `${cwd}`: the terminal's current working directory
    // - `${cwdFolder}`: the terminal's current working directory, displayed for multi-root workspaces or in a single root workspace when the value differs from the initial working directory. On Windows, this will only be displayed when shell integration is enabled.
    // - `${workspaceFolder}`: the workspace in which the terminal was launched
    // - `${workspaceFolderName}`: the `name` of the workspace in which the terminal was launched
    // - `${local}`: indicates a local terminal in a remote workspace
    // - `${process}`: the name of the terminal process
    // - `${separator}`: a conditional separator (` - `) that only shows when surrounded by variables with values or static text.
    // - `${sequence}`: the name provided to the terminal by the process
    // - `${task}`: indicates this terminal is associated with a task
    "terminal.integrated.tabs.description": "${task}${separator}${local}${separator}${cwdFolder}",

    // Controls whether terminal tab statuses support animation (eg. in progress tasks).
    "terminal.integrated.tabs.enableAnimation": true,

    // Controls whether terminal tabs display as a list to the side of the terminal. When this is disabled a dropdown will display instead.
    "terminal.integrated.tabs.enabled": true,

    // Controls whether focusing the terminal of a tab happens on double or single click.
    //  - singleClick: Focus the terminal when clicking a terminal tab
    //  - doubleClick: Focus the terminal when double-clicking a terminal tab
    "terminal.integrated.tabs.focusMode": "doubleClick",

    // Controls whether the terminal tabs view will hide under certain conditions.
    //  - never: Never hide the terminal tabs view
    //  - singleTerminal: Hide the terminal tabs view when there is only a single terminal opened
    //  - singleGroup: Hide the terminal tabs view when there is only a single terminal group opened
    "terminal.integrated.tabs.hideCondition": "singleTerminal",

    // Controls the location of the terminal tabs, either to the left or right of the actual terminal(s).
    //  - left: Show the terminal tabs view to the left of the terminal
    //  - right: Show the terminal tabs view to the right of the terminal
    "terminal.integrated.tabs.location": "right",

    // Separator used by `terminal.integrated.tabs.title#` and `#terminal.integrated.tabs.description`.
    "terminal.integrated.tabs.separator": " - ",

    // Controls whether terminal split and kill buttons are displays next to the new terminal button.
    //  - always: Always show the actions
    //  - singleTerminal: Show the actions when it is the only terminal opened
    //  - singleTerminalOrNarrow: Show the actions when it is the only terminal opened or when the tabs view is in its narrow textless state
    //  - never: Never show the actions
    "terminal.integrated.tabs.showActions": "singleTerminalOrNarrow",

    // Shows the active terminal information in the view. This is particularly useful when the title within the tabs aren't visible.
    //  - always: Always show the active terminal
    //  - singleTerminal: Show the active terminal when it is the only terminal opened
    //  - singleTerminalOrNarrow: Show the active terminal when it is the only terminal opened or when the tabs view is in its narrow textless state
    //  - never: Never show the active terminal
    "terminal.integrated.tabs.showActiveTerminal": "singleTerminalOrNarrow",

    // Controls the terminal title. Variables are substituted based on the context:
    // - `${cwd}`: the terminal's current working directory
    // - `${cwdFolder}`: the terminal's current working directory, displayed for multi-root workspaces or in a single root workspace when the value differs from the initial working directory. On Windows, this will only be displayed when shell integration is enabled.
    // - `${workspaceFolder}`: the workspace in which the terminal was launched
    // - `${workspaceFolderName}`: the `name` of the workspace in which the terminal was launched
    // - `${local}`: indicates a local terminal in a remote workspace
    // - `${process}`: the name of the terminal process
    // - `${separator}`: a conditional separator (` - `) that only shows when surrounded by variables with values or static text.
    // - `${sequence}`: the name provided to the terminal by the process
    // - `${task}`: indicates this terminal is associated with a task
    "terminal.integrated.tabs.title": "${process}",

    // The number of cells in a tab stop.
    "terminal.integrated.tabStopWidth": 8,

    // Controls what version of Unicode to use when evaluating the width of characters in the terminal. If you experience emoji or other wide characters not taking up the right amount of space or backspace either deleting too much or too little then you may want to try tweaking this setting.
    //  - 6: Version 6 of Unicode. This is an older version which should work better on older systems.
    //  - 11: Version 11 of Unicode. This version provides better support on modern systems that use modern versions of Unicode.
    "terminal.integrated.unicodeVersion": "11",

    // Controls whether or not WSL distros are shown in the terminal dropdown
    "terminal.integrated.useWslProfiles": true,

    // Whether to use ConPTY for Windows terminal process communication (requires Windows 10 build number 18309+). Winpty will be used if this is false.
    "terminal.integrated.windowsEnableConpty": true,

    // A string containing all characters to be considered word separators when double-clicking to select word and in the fallback 'word' link detection. Since this is used for link detection, including characters such as `:` that are used when detecting links will cause the line and column part of links like `file:10:5` to be ignored.
    "terminal.integrated.wordSeparators": " ()[]{}',\"`─‘’“”|",

    // Enable automatic tasks - note that tasks won't run in an untrusted workspace.
    //  - on: Always
    //  - off: Never
    "task.allowAutomaticTasks": "on",

    // Controls enablement of `provideTasks` for all task provider extension. If the Tasks: Run Task command is slow, disabling auto detect for task providers may help. Individual extensions may also provide settings that disable auto detection.
    "task.autoDetect": "on",

    // Configures whether to show the problem matcher prompt when running a task. Set to `true` to never prompt, or use a dictionary of task types to turn off prompting only for specific task types.
    "task.problemMatchers.neverPrompt": false,

    // Controls whether to show the task detail for tasks that have a detail in task quick picks, such as Run Task.
    "task.quickOpen.detail": true,

    // Controls the number of recent items tracked in task quick open dialog.
    "task.quickOpen.history": 30,

    // Causes the Tasks: Run Task command to use the slower "show all" behavior instead of the faster two level picker where tasks are grouped by provider.
    "task.quickOpen.showAll": false,

    // Controls whether the task quick pick is skipped when there is only one task to pick from.
    "task.quickOpen.skip": false,

    // On window reload, reconnect to tasks that have problem matchers.
    "task.reconnection": true,

    // Save all dirty editors before running a task.
    //  - always: Always saves all editors before running.
    //  - never: Never saves editors before running.
    //  - prompt: Prompts whether to save editors before running.
    "task.saveBeforeRun": "always",

    // Configures whether a warning is shown when a provider is slow
    "task.slowProviderWarning": true,

    // Enable verbose logging for tasks.
    "task.verboseLogging": false,

    // Controls whether Problems view should automatically reveal files when opening them.
    "problems.autoReveal": true,

    // Show Errors & Warnings on files and folder. Overwritten by `problems.visibility` when it is off.
    "problems.decorations.enabled": true,

    // Controls the default view mode of the Problems view.
    "problems.defaultViewMode": "tree",

    // When enabled shows the current problem in the status bar.
    "problems.showCurrentInStatus": false,

    // Controls the order in which problems are navigated.
    //  - severity: Navigate problems ordered by severity
    //  - position: Navigate problems ordered by position
    "problems.sortOrder": "severity",

    // Controls whether the problems are visible throughout the editor and workbench.
    "problems.visibility": true,

    // Enable/disable navigation breadcrumbs.
    "breadcrumbs.enabled": true,

    // Controls whether and how file paths are shown in the breadcrumbs view.
    //  - on: Show the file path in the breadcrumbs view.
    //  - off: Do not show the file path in the breadcrumbs view.
    //  - last: Only show the last element of the file path in the breadcrumbs view.
    "breadcrumbs.filePath": "on",

    // Render breadcrumb items with icons.
    "breadcrumbs.icons": true,

    // When enabled breadcrumbs show `array`-symbols.
    "breadcrumbs.showArrays": true,

    // When enabled breadcrumbs show `boolean`-symbols.
    "breadcrumbs.showBooleans": true,

    // When enabled breadcrumbs show `class`-symbols.
    "breadcrumbs.showClasses": true,

    // When enabled breadcrumbs show `constant`-symbols.
    "breadcrumbs.showConstants": true,

    // When enabled breadcrumbs show `constructor`-symbols.
    "breadcrumbs.showConstructors": true,

    // When enabled breadcrumbs show `enumMember`-symbols.
    "breadcrumbs.showEnumMembers": true,

    // When enabled breadcrumbs show `enum`-symbols.
    "breadcrumbs.showEnums": true,

    // When enabled breadcrumbs show `event`-symbols.
    "breadcrumbs.showEvents": true,

    // When enabled breadcrumbs show `field`-symbols.
    "breadcrumbs.showFields": true,

    // When enabled breadcrumbs show `file`-symbols.
    "breadcrumbs.showFiles": true,

    // When enabled breadcrumbs show `function`-symbols.
    "breadcrumbs.showFunctions": true,

    // When enabled breadcrumbs show `interface`-symbols.
    "breadcrumbs.showInterfaces": true,

    // When enabled breadcrumbs show `key`-symbols.
    "breadcrumbs.showKeys": true,

    // When enabled breadcrumbs show `method`-symbols.
    "breadcrumbs.showMethods": true,

    // When enabled breadcrumbs show `module`-symbols.
    "breadcrumbs.showModules": true,

    // When enabled breadcrumbs show `namespace`-symbols.
    "breadcrumbs.showNamespaces": true,

    // When enabled breadcrumbs show `null`-symbols.
    "breadcrumbs.showNull": true,

    // When enabled breadcrumbs show `number`-symbols.
    "breadcrumbs.showNumbers": true,

    // When enabled breadcrumbs show `object`-symbols.
    "breadcrumbs.showObjects": true,

    // When enabled breadcrumbs show `operator`-symbols.
    "breadcrumbs.showOperators": true,

    // When enabled breadcrumbs show `package`-symbols.
    "breadcrumbs.showPackages": true,

    // When enabled breadcrumbs show `property`-symbols.
    "breadcrumbs.showProperties": true,

    // When enabled breadcrumbs show `string`-symbols.
    "breadcrumbs.showStrings": true,

    // When enabled breadcrumbs show `struct`-symbols.
    "breadcrumbs.showStructs": true,

    // When enabled breadcrumbs show `typeParameter`-symbols.
    "breadcrumbs.showTypeParameters": true,

    // When enabled breadcrumbs show `variable`-symbols.
    "breadcrumbs.showVariables": true,

    // Controls whether and how symbols are shown in the breadcrumbs view.
    //  - on: Show all symbols in the breadcrumbs view.
    //  - off: Do not show symbols in the breadcrumbs view.
    //  - last: Only show the current symbol in the breadcrumbs view.
    "breadcrumbs.symbolPath": "on",

    // Controls how symbols are sorted in the breadcrumbs outline view.
    //  - position: Show symbol outline in file position order.
    //  - name: Show symbol outline in alphabetical order.
    //  - type: Show symbol outline in symbol type order.
    "breadcrumbs.symbolSortOrder": "position",

    // Controls whether Outline items are collapsed or expanded.
    //  - alwaysCollapse: Collapse all items.
    //  - alwaysExpand: Expand all items.
    "outline.collapseItems": "alwaysExpand",

    // Render Outline elements with icons.
    "outline.icons": true,

    // Use badges for errors and warnings on Outline elements. Overwritten by `problems.visibility` when it is off.
    "outline.problems.badges": true,

    // Use colors for errors and warnings on Outline elements. Overwritten by `problems.visibility` when it is off.
    "outline.problems.colors": true,

    // Show errors and warnings on Outline elements. Overwritten by `problems.visibility` when it is off.
    "outline.problems.enabled": true,

    // When enabled, Outline shows `array`-symbols.
    "outline.showArrays": true,

    // When enabled, Outline shows `boolean`-symbols.
    "outline.showBooleans": true,

    // When enabled, Outline shows `class`-symbols.
    "outline.showClasses": true,

    // When enabled, Outline shows `constant`-symbols.
    "outline.showConstants": true,

    // When enabled, Outline shows `constructor`-symbols.
    "outline.showConstructors": true,

    // When enabled, Outline shows `enumMember`-symbols.
    "outline.showEnumMembers": true,

    // When enabled, Outline shows `enum`-symbols.
    "outline.showEnums": true,

    // When enabled, Outline shows `event`-symbols.
    "outline.showEvents": true,

    // When enabled, Outline shows `field`-symbols.
    "outline.showFields": true,

    // When enabled, Outline shows `file`-symbols.
    "outline.showFiles": true,

    // When enabled, Outline shows `function`-symbols.
    "outline.showFunctions": true,

    // When enabled, Outline shows `interface`-symbols.
    "outline.showInterfaces": true,

    // When enabled, Outline shows `key`-symbols.
    "outline.showKeys": true,

    // When enabled, Outline shows `method`-symbols.
    "outline.showMethods": true,

    // When enabled, Outline shows `module`-symbols.
    "outline.showModules": true,

    // When enabled, Outline shows `namespace`-symbols.
    "outline.showNamespaces": true,

    // When enabled, Outline shows `null`-symbols.
    "outline.showNull": true,

    // When enabled, Outline shows `number`-symbols.
    "outline.showNumbers": true,

    // When enabled, Outline shows `object`-symbols.
    "outline.showObjects": true,

    // When enabled, Outline shows `operator`-symbols.
    "outline.showOperators": true,

    // When enabled, Outline shows `package`-symbols.
    "outline.showPackages": true,

    // When enabled, Outline shows `property`-symbols.
    "outline.showProperties": true,

    // When enabled, Outline shows `string`-symbols.
    "outline.showStrings": true,

    // When enabled, Outline shows `struct`-symbols.
    "outline.showStructs": true,

    // When enabled, Outline shows `typeParameter`-symbols.
    "outline.showTypeParameters": true,

    // When enabled, Outline shows `variable`-symbols.
    "outline.showVariables": true,

    // Experimental. Controls whether the Timeline view will load the next page of items when you scroll to the end of the list.
    "timeline.pageOnScroll": false,

    // The number of items to show in the Timeline view by default and when loading more items. Setting to `null` (the default) will automatically choose a page size based on the visible area of the Timeline view.
    "timeline.pageSize": null,

    // Configure settings to be overridden for the clojure language.
    "[clojure]":  {
        "diffEditor.ignoreTrimWhitespace": false
    },

    // Configure settings to be overridden for the coffeescript language.
    "[coffeescript]":  {
        "diffEditor.ignoreTrimWhitespace": false
    },

    // Configure settings to be overridden for the csharp language.
    "[csharp]":  {
        "editor.maxTokenizationLineLength": 2500
    },

    // Configure settings to be overridden for the css language.
    "[css]":  {
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the dockercompose language.
    "[dockercompose]":  {
        "editor.insertSpaces": true,
        "editor.tabSize": 2,
        "editor.autoIndent": "advanced"
    },

    // Configure settings to be overridden for the dockerfile language.
    "[dockerfile]":  {
        "editor.quickSuggestions": {
                "strings": true
        }
    },

    // Configure settings to be overridden for the fsharp language.
    "[fsharp]":  {
        "diffEditor.ignoreTrimWhitespace": false
    },

    // Configure settings to be overridden for the git-commit language.
    "[git-commit]":  {
        "editor.rulers": [
                50,
                72
        ],
        "editor.wordWrap": "off",
        "workbench.editor.restoreViewState": false
    },

    // Configure settings to be overridden for the git-rebase language.
    "[git-rebase]":  {
        "workbench.editor.restoreViewState": false
    },

    // Configure settings to be overridden for the go language.
    "[go]":  {
        "editor.insertSpaces": false
    },

    // Configure settings to be overridden for the handlebars language.
    "[handlebars]":  {
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the html language.
    "[html]":  {
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the jade language.
    "[jade]":  {
        "diffEditor.ignoreTrimWhitespace": false
    },

    // Configure settings to be overridden for the javascript language.
    "[javascript]":  {
        "editor.maxTokenizationLineLength": 2500
    },

    // Configure settings to be overridden for the json language.
    "[json]":  {
        "editor.quickSuggestions": {
                "strings": true
        },
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the jsonc language.
    "[jsonc]":  {
        "editor.quickSuggestions": {
                "strings": true
        },
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the less language.
    "[less]":  {
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the makefile language.
    "[makefile]":  {
        "editor.insertSpaces": false
    },

    // Configure settings to be overridden for the markdown language.
    "[markdown]":  {
        "editor.unicodeHighlight.ambiguousCharacters": false,
        "editor.unicodeHighlight.invisibleCharacters": false,
        "diffEditor.ignoreTrimWhitespace": false,
        "editor.wordWrap": "on",
        "editor.quickSuggestions": {
                "comments": "off",
                "strings": "off",
                "other": "off"
        }
    },

    // Configure settings to be overridden for the plaintext language.
    "[plaintext]":  {
        "editor.unicodeHighlight.ambiguousCharacters": false,
        "editor.unicodeHighlight.invisibleCharacters": false
    },

    // Configure settings to be overridden for the python language.
    "[python]":  {
        "diffEditor.ignoreTrimWhitespace": false
    },

    // Configure settings to be overridden for the scss language.
    "[scss]":  {
        "editor.suggest.insertMode": "replace"
    },

    // Configure settings to be overridden for the search-result language.
    "[search-result]":  {
        "editor.lineNumbers": "off"
    },

    // Configure settings to be overridden for the shellscript language.
    "[shellscript]":  {
        "files.eol": "\n"
    },

    // Configure settings to be overridden for the yaml language.
    "[yaml]":  {
        "editor.insertSpaces": true,
        "editor.tabSize": 2,
        "editor.autoIndent": "advanced",
        "diffEditor.ignoreTrimWhitespace": false
    },

// Remote

    // The name under which the remote tunnel access is registered. If not set, the host name is used.
    "remote.tunnels.access.hostNameOverride": "",

    // Prevent the computer from sleeping when remote tunnel access is turned on.
    "remote.tunnels.access.preventSleep": false,

    // When enabled, new running processes are detected and ports that they listen on are automatically forwarded. Disabling this setting will not prevent all ports from being forwarded. Even when disabled, extensions will still be able to cause ports to be forwarded, and opening some URLs will still cause ports to forwarded.
    "remote.autoForwardPorts": true,

    // The number of auto forwarded ports that will trigger the switch from `process` to `hybrid` when automatically forwarding ports and `remote.autoForwardPortsSource` is set to `process`. Set to `0` to disable the fallback.
    "remote.autoForwardPortsFallback": 20,

    // Sets the source from which ports are automatically forwarded when `remote.autoForwardPorts` is true. On Windows and macOS remotes, the `process` and `hybrid` options have no effect and `output` will be used.
    //  - process: Ports will be automatically forwarded when discovered by watching for processes that are started and include a port.
    //  - output: Ports will be automatically forwarded when discovered by reading terminal and debug output. Not all processes that use ports will print to the integrated terminal or debug console, so some ports will be missed. Ports forwarded based on output will not be "un-forwarded" until reload or until the port is closed by the user in the Ports view.
    //  - hybrid: Ports will be automatically forwarded when discovered by reading terminal and debug output. Not all processes that use ports will print to the integrated terminal or debug console, so some ports will be missed. Ports will be "un-forwarded" by watching for processes that listen on that port to be terminated.
    "remote.autoForwardPortsSource": "process",

    // When enabled extensions are downloaded locally and installed on remote.
    "remote.downloadExtensionsLocally": false,

    // Override the kind of an extension. `ui` extensions are installed and run on the local machine while `workspace` extensions are run on the remote. By overriding an extension's default kind using this setting, you specify if that extension should be installed and enabled locally or remotely.
    "remote.extensionKind": {
        "pub.name": [
            "ui"
        ]
    },

    // Controls whether local URLs with a port will be forwarded when opened from the terminal and the debug console.
    "remote.forwardOnOpen": true,

    // Specifies the local host name that will be used for port forwarding.
    "remote.localPortHost": "localhost",

    // Set default properties that are applied to all ports that don't get properties from the setting `remote.portsAttributes`.
    "remote.otherPortsAttributes": {},

    // Set properties that are applied when a specific port number is forwarded.
    "remote.portsAttributes": {},

    // Restores the ports you forwarded in a workspace.
    "remote.restoreForwardedPorts": true,

// Accessibility

    // Set the color mode for native UI elements such as native dialogs, menus and title bar.
    //  - default: Native element colors match the system colors.
    //  - auto: Use light native element colors for light color themes and dark for dark color themes.
    //  - light: Use light native element colors.
    //  - dark: Use dark native element colors.
    "window.systemColorTheme": "default",

    // On keypress, close the Accessible View and focus the element from which it was invoked.
    "accessibility.accessibleView.closeOnKeyPress": true,

    // Controls whether variable changes should be announced in the debug watch view.
    "accessibility.debugWatchVariableAnnouncements": true,

    // Whether or not position changes should be debounced
    "accessibility.signalOptions.debouncePositionChanges": false,

    // The volume of the sounds in percent (0-100).
    "accessibility.signalOptions.volume": 70,

    // Indicates when a chat request is made.
    "accessibility.signals.chatRequestSent": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the response has been received.
    "accessibility.signals.chatResponseReceived": {
        "sound": "auto"
    },

    // Indicates when a feature is cleared (for example, the terminal, Debug Console, or Output channel).
    "accessibility.signals.clear": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the focus moves to an deleted line in Accessible Diff Viewer mode or to the next/previous change.
    "accessibility.signals.diffLineDeleted": {
        "sound": "auto"
    },

    // Indicates when the focus moves to an inserted line in Accessible Diff Viewer mode or to the next/previous change.
    "accessibility.signals.diffLineInserted": {
        "sound": "auto"
    },

    // Indicates when the focus moves to an modified line in Accessible Diff Viewer mode or to the next/previous change.
    "accessibility.signals.diffLineModified": {
        "sound": "auto"
    },

    // Indicates when a file or notebook is formatted.
    "accessibility.signals.format": {
        "sound": "never",
        "announcement": "never"
    },

    // Indicates when the active line has a breakpoint.
    "accessibility.signals.lineHasBreakpoint": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the active line has an error.
    "accessibility.signals.lineHasError": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the active line has a folded area that can be unfolded.
    "accessibility.signals.lineHasFoldedArea": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the active line has an inline suggestion.
    "accessibility.signals.lineHasInlineSuggestion": {
        "sound": "auto"
    },

    // Indicates when the active line has a warning.
    "accessibility.signals.lineHasWarning": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when trying to read a line with inlay hints that has no inlay hints.
    "accessibility.signals.noInlayHints": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a notebook cell execution is successfully completed.
    "accessibility.signals.notebookCellCompleted": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a notebook cell execution fails.
    "accessibility.signals.notebookCellFailed": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the debugger stopped on a breakpoint.
    "accessibility.signals.onDebugBreak": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the active line has a warning.
    "accessibility.signals.positionHasError": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the active line has a warning.
    "accessibility.signals.positionHasWarning": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates on loop while progress is occurring.
    "accessibility.signals.progress": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a file is saved.
    "accessibility.signals.save": {
        "sound": "never",
        "announcement": "never"
    },

    // Indicates when a task is completed.
    "accessibility.signals.taskCompleted": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a task fails (non-zero exit code).
    "accessibility.signals.taskFailed": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when the terminal bell is ringing.
    "accessibility.signals.terminalBell": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a terminal command fails (non-zero exit code) or when a command with such an exit code is navigated to in the accessible view.
    "accessibility.signals.terminalCommandFailed": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when a terminal command succeeds (zero exit code) or when a command with such an exit code is navigated to in the accessible view.
    "accessibility.signals.terminalCommandSucceeded": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Indicates when terminal Quick Fixes are available.
    "accessibility.signals.terminalQuickFix": {
        "sound": "auto",
        "announcement": "auto"
    },

    // Plays a sound / audio cue when the voice recording has started.
    "accessibility.signals.voiceRecordingStarted": {
        "sound": "on"
    },

    // Plays a sound / audio cue when the voice recording has stopped.
    "accessibility.signals.voiceRecordingStopped": {
        "sound": "auto"
    },

    // Controls whether links should be underlined in the workbench.
    "accessibility.underlineLinks": false,

    // Provide information about actions that can be taken in the comment widget or in a file which contains comments.
    "accessibility.verbosity.comments": true,

    // Provide information about how to access the debug console accessibility help dialog when the debug console or run and debug viewlet is focused.
    "accessibility.verbosity.debug": true,

    // Provide information about how to navigate changes in the diff editor when it is focused.
    "accessibility.verbosity.diffEditor": true,

    // Indicate when a diff editor becomes the active editor.
    "accessibility.verbosity.diffEditorActive": true,

    // Provide information about relevant actions in an empty text editor.
    "accessibility.verbosity.emptyEditorHint": true,

    // Provide information about how to open the hover in an Accessible View.
    "accessibility.verbosity.hover": true,

    // Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused.
    "accessibility.verbosity.inlineChat": true,

    // Provide information about how to access the inline completions hover and Accessible View.
    "accessibility.verbosity.inlineCompletions": true,

    // Provide information about how to change a keybinding in the keybindings editor when a row is focused.
    "accessibility.verbosity.keybindingsEditor": true,

    // Provide information about how to focus the cell container or inner editor when a notebook cell is focused.
    "accessibility.verbosity.notebook": true,

    // Provide information about how to open the notification in an Accessible View.
    "accessibility.verbosity.notification": true,

    // Provide information about how to access the chat help menu when the chat input is focused.
    "accessibility.verbosity.panelChat": true,

    // Provide information about relevant actions for the REPL input.
    "accessibility.verbosity.replInputHint": true,

    // Provide information about how to access the terminal accessibility help menu when the terminal is focused.
    "accessibility.verbosity.terminal": true,

    // Merge editor diff algorithm.
    //  - legacy: Uses the legacy diffing algorithm.
    //  - advanced: Uses the advanced diffing algorithm.
    "mergeEditor.diffAlgorithm": "advanced",

    // Controls if deletions in base or one of the inputs should be indicated by a vertical bar.
    "mergeEditor.showDeletionMarkers": true,

    // Controls the font family in chat codeblocks.
    "chat.editor.fontFamily": "default",

    // Controls the font size in pixels in chat codeblocks.
    "chat.editor.fontSize": 14,

    // Controls the font weight in chat codeblocks.
    "chat.editor.fontWeight": "default",

    // Controls the line height in pixels in chat codeblocks. Use 0 to compute the line height from the font size.
    "chat.editor.lineHeight": 0,

    // Controls whether lines should wrap in chat codeblocks.
    "chat.editor.wordWrap": "off",

// Emmet

    // An array of languages where Emmet abbreviations should not be expanded.
    "emmet.excludeLanguages": [
        "markdown"
    ],

    // An array of paths, where each path can contain Emmet syntaxProfiles and/or snippet files.
    // In case of conflicts, the profiles/snippets of later paths will override those of earlier paths.
    "emmet.extensionsPath": [],

    // Enable Emmet abbreviations in languages that are not supported by default. Add a mapping here between the language and Emmet supported language.
    //  For example: `{"vue-html": "html", "javascript": "javascriptreact"}`
    "emmet.includeLanguages": {},

    // When set to `false`, the whole file is parsed to determine if current position is valid for expanding Emmet abbreviations. When set to `true`, only the content around the current position in CSS/SCSS/Less files is parsed.
    "emmet.optimizeStylesheetParsing": true,

    // Preferences used to modify behavior of some actions and resolvers of Emmet.
    "emmet.preferences": {},

    // Shows possible Emmet abbreviations as suggestions. Not applicable in stylesheets or when emmet.showExpandedAbbreviation is set to `"never"`.
    "emmet.showAbbreviationSuggestions": true,

    // Shows expanded Emmet abbreviations as suggestions.
    // The option `"inMarkupAndStylesheetFilesOnly"` applies to html, haml, jade, slim, xml, xsl, css, scss, sass, less and stylus.
    // The option `"always"` applies to all parts of the file regardless of markup/css.
    "emmet.showExpandedAbbreviation": "always",

    // If `true`, then Emmet suggestions will show up as snippets allowing you to order them as per `editor.snippetSuggestions` setting.
    "emmet.showSuggestionsAsSnippets": false,

    // Define profile for specified syntax or use your own profile with specific rules.
    "emmet.syntaxProfiles": {},

    // When enabled, Emmet abbreviations are expanded when pressing TAB.
    "emmet.triggerExpansionOnTab": false,

    // If `true`, Emmet will use inline completions to suggest expansions.
    "emmet.useInlineCompletions": false,

    // Variables to be used in Emmet snippets.
    "emmet.variables": {},

// Git

    // Controls whether force push (with or without lease) is enabled.
    "git.allowForcePush": false,

    // Controls whether commits without running pre-commit and commit-msg hooks are allowed.
    "git.allowNoVerifyCommit": false,

    // Always show the Staged Changes resource group.
    "git.alwaysShowStagedChangesResourceGroup": false,

    // Controls the signoff flag for all commits.
    "git.alwaysSignOff": false,

    // When set to true, commits will automatically be fetched from the default remote of the current Git repository. Setting to `all` will fetch from all remotes.
    "git.autofetch": false,

    // Duration in seconds between each automatic git fetch, when `git.autofetch` is enabled.
    "git.autofetchPeriod": 180,

    // Whether auto refreshing is enabled.
    "git.autorefresh": true,

    // Configures when repositories should be automatically detected.
    //  - true: Scan for both subfolders of the current opened folder and parent folders of open files.
    //  - false: Disable automatic repository scanning.
    //  - subFolders: Scan for subfolders of the currently opened folder.
    //  - openEditors: Scan for parent folders of open files.
    "git.autoRepositoryDetection": true,

    // Stash any changes before pulling and restore them after successful pull.
    "git.autoStash": false,

    // Prefix used when creating a new branch.
    "git.branchPrefix": "",

    // List of protected branches. By default, a prompt is shown before changes are committed to a protected branch. The prompt can be controlled using the `git.branchProtectionPrompt`  setting.
    "git.branchProtection": [],

    // Controls whether a prompt is being shown before changes are committed to a protected branch.
    //  - alwaysCommit: Always commit changes to the protected branch.
    //  - alwaysCommitToNewBranch: Always commit changes to a new branch.
    //  - alwaysPrompt: Always prompt before changes are committed to a protected branch.
    "git.branchProtectionPrompt": "alwaysPrompt",

    // List of dictionaries used for the randomly generated branch name. Each value represents the dictionary used to generate the segment of the branch name. Supported dictionaries: `adjectives`, `animals`, `colors` and `numbers`.
    //  - adjectives: A random adjective
    //  - animals: A random animal name
    //  - colors: A random color name
    //  - numbers: A random number between 100 and 999
    "git.branchRandomName.dictionary": [
        "adjectives",
        "animals"
    ],

    // Controls whether a random name is generated when creating a new branch.
    "git.branchRandomName.enable": false,

    // Controls the sort order for branches.
    "git.branchSortOrder": "committerdate",

    // A regular expression to validate new branch names.
    "git.branchValidationRegex": "",

    // The character to replace whitespace in new branch names, and to separate segments of a randomly generated branch name.
    "git.branchWhitespaceChar": "-",

    // Controls what type of Git refs are listed when running `Checkout to...`.
    //  - local: Local branches
    //  - tags: Tags
    //  - remote: Remote branches
    "git.checkoutType": [
        "local",
        "remote",
        "tags"
    ],

    // Controls whether the diff editor should be automatically closed when changes are stashed, committed, discarded, staged, or unstaged.
    "git.closeDiffOnOperation": false,

    // List of git commands (ex: commit, push) that would have their `stdout` logged to the git output. If the git command has a client-side hook configured, the client-side hook's `stdout` will also be logged to the git output.
    "git.commandsToLog": [],

    // Always confirm the creation of empty commits for the 'Git: Commit Empty' command.
    "git.confirmEmptyCommits": true,

    // Controls whether to ask for confirmation before force-pushing.
    "git.confirmForcePush": true,

    // Controls whether to ask for confirmation before committing without verification.
    "git.confirmNoVerifyCommit": true,

    // Confirm before synchronizing Git repositories.
    "git.confirmSync": true,

    // Controls the Git count badge.
    //  - all: Count all changes.
    //  - tracked: Count only tracked changes.
    //  - off: Turn off counter.
    "git.countBadge": "all",

    // Controls whether Git contributes colors and badges to the Explorer and the Open Editors view.
    "git.decorations.enabled": true,

    // The name of the default branch (example: main, trunk, development) when initializing a new Git repository. When set to empty, the default branch name configured in Git will be used.
    "git.defaultBranchName": "main",

    // The default location to clone a Git repository.
    "git.defaultCloneDirectory": null,

    // Controls whether to automatically detect Git submodules.
    "git.detectSubmodules": true,

    // Controls the limit of Git submodules detected.
    "git.detectSubmodulesLimit": 10,

    // Enables commit signing with GPG, X.509, or SSH.
    "git.enableCommitSigning": false,

    // Whether Git is enabled.
    "git.enabled": true,

    // Commit all changes when there are no staged changes.
    "git.enableSmartCommit": false,

    // Controls whether the Git Sync command appears in the status bar.
    "git.enableStatusBarSync": true,

    // When enabled, fetch all branches when pulling. Otherwise, fetch just the current one.
    "git.fetchOnPull": false,

    // Push all annotated tags when running the sync command.
    "git.followTagsWhenSync": false,

    // List of Git repositories to ignore.
    "git.ignoredRepositories": [],

    // Ignores the legacy Git warning.
    "git.ignoreLegacyWarning": false,

    // Ignores the warning when there are too many changes in a repository.
    "git.ignoreLimitWarning": false,

    // Ignores the warning when Git is missing.
    "git.ignoreMissingGitWarning": false,

    // Ignores the warning when it looks like the branch might have been rebased when pulling.
    "git.ignoreRebaseWarning": false,

    // Ignore modifications to submodules in the file tree.
    "git.ignoreSubmodules": false,

    // Ignores the warning when Git 2.25 - 2.26 is installed on Windows.
    "git.ignoreWindowsGit27Warning": false,

    // Controls whether to show commit message input validation diagnostics.
    "git.inputValidation": false,

    // Controls the commit message length threshold for showing a warning.
    "git.inputValidationLength": 72,

    // Controls the commit message subject length threshold for showing a warning. Unset it to inherit the value of `git.inputValidationLength`.
    "git.inputValidationSubjectLength": 50,

    // Open the merge editor for files that are currently under conflict.
    "git.mergeEditor": false,

    // Controls whether to open a repository automatically after cloning.
    //  - always: Always open in current window.
    //  - alwaysNewWindow: Always open in a new window.
    //  - whenNoFolderOpen: Only open in current window when no folder is opened.
    //  - prompt: Always prompt for action.
    "git.openAfterClone": "prompt",

    // Controls whether the diff editor should be opened when clicking a change. Otherwise the regular editor will be opened.
    "git.openDiffOnClick": true,

    // Control whether a repository in parent folders of workspaces or open files should be opened.
    //  - always: Always open a repository in parent folders of workspaces or open files.
    //  - never: Never open a repository in parent folders of workspaces or open files.
    //  - prompt: Prompt before opening a repository the parent folders of workspaces or open files.
    "git.openRepositoryInParentFolders": "prompt",

    // Controls whether to optimistically update the state of the Source Control view after running git commands.
    "git.optimisticUpdate": true,

    // Path and filename of the git executable, e.g. `C:\Program Files\Git\bin\git.exe` (Windows). This can also be an array of string values containing multiple paths to look up.
    "git.path": null,

    // Run a git command after a successful commit.
    //  - none: Don't run any command after a commit.
    //  - push: Run 'git push' after a successful commit.
    //  - sync: Run 'git pull' and 'git push' after a successful commit.
    "git.postCommitCommand": "none",

    // Controls whether Git should check for unsaved files before committing.
    //  - always: Check for any unsaved files.
    //  - staged: Check only for unsaved staged files.
    //  - never: Disable this check.
    "git.promptToSaveFilesBeforeCommit": "always",

    // Controls whether Git should check for unsaved files before stashing changes.
    //  - always: Check for any unsaved files.
    //  - staged: Check only for unsaved staged files.
    //  - never: Disable this check.
    "git.promptToSaveFilesBeforeStash": "always",

    // Prune when fetching.
    "git.pruneOnFetch": false,

    // Controls whether a branch that does not have outgoing commits is fast-forwarded before it is checked out.
    "git.pullBeforeCheckout": false,

    // Fetch all tags when pulling.
    "git.pullTags": true,

    // Force Git to use rebase when running the sync command.
    "git.rebaseWhenSync": false,

    // Remember the last git command that ran after a commit.
    "git.rememberPostCommitCommand": false,

    // Automatically replace the local tags with the remote tags in case of a conflict when running the pull command.
    "git.replaceTagsWhenPull": false,

    // List of folders that are ignored while scanning for Git repositories when `git.autoRepositoryDetection` is set to `true` or `subFolders`.
    "git.repositoryScanIgnoredFolders": [
        "node_modules"
    ],

    // Controls the depth used when scanning workspace folders for Git repositories when `git.autoRepositoryDetection` is set to `true` or `subFolders`. Can be set to `-1` for no limit.
    "git.repositoryScanMaxDepth": 1,

    // Controls whether to require explicit Git user configuration or allow Git to guess if missing.
    "git.requireGitUserConfig": true,

    // List of paths to search for Git repositories in.
    "git.scanRepositories": [],

    // Controls whether an action button is shown in the Source Control view.
    "git.showActionButton": {
        "commit": true,
        "publish": true,
        "sync": true
    },

    // Controls whether to show the commit input in the Git source control panel.
    "git.showCommitInput": true,

    // Controls whether to show an inline Open File action in the Git changes view.
    "git.showInlineOpenFileAction": true,

    // Controls whether Git actions should show progress.
    "git.showProgress": true,

    // Controls whether to show a notification when a push is successful.
    "git.showPushSuccessNotification": false,

    // Controls the threshold of the similarity index (the amount of additions/deletions compared to the file's size) for changes in a pair of added/deleted files to be considered a rename.
    "git.similarityThreshold": 50,

    // Control which changes are automatically staged by Smart Commit.
    //  - all: Automatically stage all changes.
    //  - tracked: Automatically stage tracked changes only.
    "git.smartCommitChanges": "all",

    // Controls how to limit the number of changes that can be parsed from Git status command. Can be set to 0 for no limit.
    "git.statusLimit": 10000,

    // Suggests to enable smart commit (commit all changes when there are no staged changes).
    "git.suggestSmartCommit": true,

    // Controls whether a notification comes up when running the Sync action, which allows the user to cancel the operation.
    "git.supportCancellation": false,

    // Controls whether to enable VS Code to be the authentication handler for Git processes spawned in the Integrated Terminal. Note: Terminals need to be restarted to pick up a change in this setting.
    "git.terminalAuthentication": true,

    // Controls whether to enable VS Code to be the Git editor for Git processes spawned in the integrated terminal. Note: Terminals need to be restarted to pick up a change in this setting.
    "git.terminalGitEditor": false,

    // Controls which date to use for items in the Timeline view.
    //  - committed: Use the committed date
    //  - authored: Use the authored date
    "git.timeline.date": "committed",

    // Controls whether to show the commit author in the Timeline view.
    "git.timeline.showAuthor": true,

    // Controls whether to show uncommitted changes in the Timeline view.
    "git.timeline.showUncommitted": false,

    // Controls how untracked changes behave.
    //  - mixed: All changes, tracked and untracked, appear together and behave equally.
    //  - separate: Untracked changes appear separately in the Source Control view. They are also excluded from several actions.
    //  - hidden: Untracked changes are hidden and excluded from several actions.
    "git.untrackedChanges": "mixed",

    // Controls whether to use the message from the commit input box as the default stash message.
    "git.useCommitInputAsStashMessage": false,

    // Controls whether a full text editor will be used to author commit messages, whenever no message is provided in the commit input box.
    "git.useEditorAsCommitInput": true,

    // Controls whether force pushing uses the safer force-if-includes variant.
    "git.useForcePushIfIncludes": true,

    // Controls whether force pushing uses the safer force-with-lease variant.
    "git.useForcePushWithLease": true,

    // Controls whether GIT_ASKPASS should be overwritten to use the integrated version.
    "git.useIntegratedAskPass": true,

    // Enable verbose output when `git.useEditorAsCommitInput` is enabled.
    "git.verboseCommit": false,

    // Controls whether to query repository rules for GitHub repositories
    "github.branchProtection": true,

    // Controls whether to enable automatic GitHub authentication for git commands within VS Code.
    "github.gitAuthentication": true,

    // Controls which protocol is used to clone a GitHub repository
    "github.gitProtocol": "https",

    // GitHub Enterprise Server URI
    "github-enterprise.uri": "",

// Grunt

    // Controls enablement of Grunt task detection. Grunt task detection can cause files in any open workspace to be executed.
    "grunt.autoDetect": "off",

// Gulp

    // Controls enablement of Gulp task detection. Gulp task detection can cause files in any open workspace to be executed.
    "gulp.autoDetect": "off",

// Python notebooks

    // Enable/disable pasting of images into Markdown cells in ipynb notebook files. Pasted images are inserted as attachments to the cell.
    "ipynb.pasteImagesAsAttachments.enabled": true,

// Jake

    // Controls enablement of Jake task detection. Jake task detection can cause files in any open workspace to be executed.
    "jake.autoDetect": "off",

// Markdown

    // Enable/disable rendering math in the built-in Markdown preview.
    "markdown.math.enabled": true,

    // A collection of custom macros. Each macro is a key-value pair where the key is a new command name and the value is the expansion of the macro.
    "markdown.math.macros": {},

// Media Previewer

    // Start playing videos on mute automatically.
    "mediaPreview.video.autoPlay": false,

    // Loop videos over again automatically.
    "mediaPreview.video.loop": false,

// Merge Conflict

    // Whether to automatically navigate to the next merge conflict after resolving a merge conflict.
    "merge-conflict.autoNavigateNextConflict.enabled": false,

    // Create a CodeLens for merge conflict blocks within editor.
    "merge-conflict.codeLens.enabled": true,

    // Create decorators for merge conflict blocks within editor.
    "merge-conflict.decorators.enabled": true,

    // Controls where the diff view should be opened when comparing changes in merge conflicts.
    //  - Current: Open the diff view in the current editor group.
    //  - Beside: Open the diff view next to the current editor group.
    //  - Below: Open the diff view below the current editor group.
    "merge-conflict.diffViewPosition": "Current",

// Microsoft Sovereign Cloud

    // The custom configuration for the Sovereign Cloud to use with the Microsoft Sovereign Cloud authentication provider. This along with setting `microsoft-sovereign-cloud.environment` to `custom` is required to use this feature.
    "microsoft-sovereign-cloud.customEnvironment": {},

    // The Sovereign Cloud to use for authentication. If you select `custom`, you must also set the `microsoft-sovereign-cloud.customEnvironment` setting.
    //  - ChinaCloud: Azure China
    //  - USGovernment: Azure US Government
    //  - custom: A custom Microsoft Sovereign Cloud
    "microsoft-sovereign-cloud.environment": "",

// JavaScript Debugger

    // Configures which processes to automatically attach and debug when `debug.node.autoAttach` is on. A Node process launched with the `--inspect` flag will always be attached to, regardless of this setting.
    //  - always: Auto attach to every Node.js process launched in the terminal.
    //  - smart: Auto attach when running scripts that aren't in a node_modules folder.
    //  - onlyWithFlag: Only auto attach when the `--inspect` is given.
    //  - disabled: Auto attach is disabled and not shown in status bar.
    "debug.javascript.autoAttachFilter": "disabled",

    // Configures glob patterns for determining when to attach in "smart" `debug.javascript.autoAttachFilter` mode. `$KNOWN_TOOLS$` is replaced with a list of names of common test and code runners.
    "debug.javascript.autoAttachSmartPattern": [
        "${workspaceFolder}/**",
        "!**/node_modules/**",
        "**/$KNOWN_TOOLS$/**"
    ],

    // When debugging a remote web app, configures whether to automatically tunnel the remote server to your local machine.
    "debug.javascript.automaticallyTunnelRemoteServer": true,

    // Whether to stop when conditional breakpoints throw an error.
    "debug.javascript.breakOnConditionalError": false,

    // Where a "Run" and "Debug" code lens should be shown in your npm scripts. It may be on "all", scripts, on "top" of the script section, or "never".
    "debug.javascript.codelens.npmScripts": "top",

    // Options used when debugging open links clicked from inside the JavaScript Debug Terminal. Can be set to "off" to disable this behavior, or "always" to enable debugging in all terminals.
    "debug.javascript.debugByLinkOptions": "on",

    // The default `runtimeExecutable` used for launch configurations, if unspecified. This can be used to config custom paths to Node.js or browser installations.
    "debug.javascript.defaultRuntimeExecutable": {
        "pwa-node": "node"
    },

    // Default options used when debugging a process through the `Debug: Attach to Node.js Process` command.
    "debug.javascript.pickAndAttachOptions": {},

    // Request options to use when loading resources, such as source maps, in the debugger. You may need to configure this if your sourcemaps require authentication or use a self-signed certificate, for instance. Options are used to create a request using the `got` library.
    // A common case to disable certificate verification can be done by passing `{ "https": { "rejectUnauthorized": false } }`.
    "debug.javascript.resourceRequestOptions": {},

    // Default launch options for the JavaScript debug terminal and npm scripts.
    "debug.javascript.terminalOptions": {},

    // Configures whether sourcemapped file where the original file can't be read will automatically be unmapped. If this is false (default), a prompt is shown.
    "debug.javascript.unmapMissingSources": false,

// Npm

    // Controls whether npm scripts should be automatically detected.
    "npm.autoDetect": "on",

    // Enable running npm scripts contained in a folder from the Explorer context menu.
    "npm.enableRunFromFolder": false,

    // The NPM Script Explorer is now available in 'Views' menu in the Explorer in all folders.
    // Enable an explorer view for npm scripts when there is no top-level 'package.json' file.
    "npm.enableScriptExplorer": false,

    // Configure glob patterns for folders that should be excluded from automatic script detection.
    "npm.exclude": "",

    // Fetch data from https://registry.npmjs.org and https://registry.bower.io to provide auto-completion and information on hover features on npm dependencies.
    "npm.fetchOnlinePackageInfo": true,

    // The package manager used to run scripts.
    //  - auto: Auto-detect which package manager to use for running scripts based on lock files and installed package managers.
    //  - npm: Use npm as the package manager for running scripts.
    //  - yarn: Use yarn as the package manager for running scripts.
    //  - pnpm: Use pnpm as the package manager for running scripts.
    //  - bun: Use bun as the package manager for running scripts.
    "npm.packageManager": "auto",

    // Run npm commands with the `--silent` option.
    "npm.runSilent": false,

    // The default click action used in the NPM Scripts Explorer: `open` or `run`, the default is `open`.
    "npm.scriptExplorerAction": "open",

    // An array of regular expressions that indicate which scripts should be excluded from the NPM Scripts view.
    "npm.scriptExplorerExclude": [],

    // Display hover with 'Run' and 'Debug' commands for scripts.
    "npm.scriptHover": true,

// References Search View

    // Controls whether 'Peek References' or 'Find References' is invoked when selecting CodeLens references.
    //  - peek: Show references in peek editor.
    //  - view: Show references in separate view.
    "references.preferredLocation": "peek",

// Simple Browser

    // Enable/disable the floating indicator that shows when focused in the simple browser.
    "simpleBrowser.focusLockIndicator.enabled": true

}
```
