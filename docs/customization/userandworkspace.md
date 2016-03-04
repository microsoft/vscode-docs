---
Order: 2
Area: customization
TOCTitle: User and Workspace Settings
PageTitle: Visual Studio Code User and Workspace Settings
DateApproved: 3/7/2016
MetaDescription: How to modify Visual Studio Code User and Workspace Settings.
---

# User and Workspace Settings

It's easy to configure VS Code the way you want by editing the various setting files where you will find a great number of settings to play with.

VS Code provides two different scopes for settings:

* **User** these settings apply globally to any instance of VS Code you open
* **Workspace** these settings are stored inside your workspace in a `.vscode` folder and only apply when the workspace is opened. Settings defined on this scope overwrite the user scope.

## Creating User and Workspace Settings

The menu under **File** > **Preferences** provides entries to configure user and workspace settings. You are provided with a list of default settings. Copy any setting that you want to change to the related settings.json file.

In the example below, we disabled line numbers in the editor and configured line wrapping to wrap automatically based on the size of the editor.

![Example Settings](images/userandworkspace/settings.png)

## Settings File Locations

Depending on your platform, the user settings file is located here:

* **Windows** `%APPDATA%\Code\User\settings.json`
* **Mac** `$HOME/Library/Application Support/Code/User/settings.json`
* **Linux** `$HOME/.config/Code/User/settings.json`

The workspace setting file is located under the `.vscode` folder in your project.

## Settings File Sections

The `settings.json` file is divided into these sections:

- **Editor Configuration** - font, word wrapping, tab size, line numbers, indentation, ...
- **Files Configuration** - exclude filters, default encoding, trim trailing whitespace
- **HTTP Configuration** - Proxy settings
- **File Explorer Configuration** - Working Files behavior
- **Search Configuration** - file exclude filters
- **CSS Configuration** - CSS linting configuration
- **JavaScript Configuration** - Language specific settings
- **JSON Configuration** - Schemas associated with certain JSON files
- **Markdown Preview Configuration** - Add a custom CSS to the Markdown preview
- **Less Configuration** - Control linting for Less
- **Sass Configuration** - Control linting for Sass
- **TypeScript Configuration** - Language specific settings

## Default Settings

Below is a copy of the default `settings.json` file.

>**Tip:** While in the `settings.json` file, press `kb(workbench.action.gotoSymbol)` to see an outline of all available settings and navigate through the file.

```json
// Overwrite settings by placing them into your settings file.
{

    //-------- Editor configuration --------

    // Controls the font family.
    "editor.fontFamily": "",

    // Controls the font size.
    "editor.fontSize": 0,

    // Controls the line height.
    "editor.lineHeight": 0,

    // Controls visibility of line numbers
    "editor.lineNumbers": true,

    // Controls visibility of the glyph margin
    "editor.glyphMargin": false,

    // Columns at which to show vertical rulers
    "editor.rulers": [],

    // Characters that will be used as word separators when doing word related navigations or operations
    "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",

    // Controls the rendering size of tabs in characters. Accepted values: "auto", 2, 4, 6, etc. If set to "auto", the value will be guessed when a file is opened.
    "editor.tabSize": 4,

    // Controls if the editor will insert spaces for tabs. Accepted values:  "auto", true, false. If set to "auto", the value will be guessed when a file is opened.
    "editor.insertSpaces": true,

    // Controls if selections have rounded corners
    "editor.roundedSelection": true,

    // Controls if the editor will scroll beyond the last line
    "editor.scrollBeyondLastLine": true,

    // Controls after how many characters the editor will wrap to the next line. Setting this to 0 turns on viewport width wrapping
    "editor.wrappingColumn": 300,

    // Controls the indentation of wrapped lines. Can be one of 'none', 'same' or 'indent'.
    "editor.wrappingIndent": "same",

    // A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events
    "editor.mouseWheelScrollSensitivity": 1,

    // Controls if quick suggestions should show up or not while typing
    "editor.quickSuggestions": true,

    // Controls the delay in ms after which quick suggestions will show up
    "editor.quickSuggestionsDelay": 10,

    // Controls if the editor should automatically close brackets after opening them
    "editor.autoClosingBrackets": true,

    // Controls if the editor should automatically format the line after typing
    "editor.formatOnType": false,

    // Controls if suggestions should automatically show up when typing trigger characters
    "editor.suggestOnTriggerCharacters": true,

    // Controls whether the editor should highlight similar matches to the selection
    "editor.selectionHighlight": true,

    // Controls the number of decorations that can show up at the same position in the overview ruler
    "editor.overviewRulerLanes": 3,

    // Controls the cursor blinking animation, accepted values are 'blink', 'visible', and 'hidden'
    "editor.cursorBlinking": "blink",

    // Controls the cursor style, accepted values are 'block' and 'line'
    "editor.cursorStyle": "line",

    // Enables font ligatures
    "editor.fontLigatures": false,

    // Controls if the cursor should be hidden in the overview ruler.
    "editor.hideCursorInOverviewRuler": false,

    // Controls whether the editor should render whitespace characters
    "editor.renderWhitespace": false,

    // Controls if the editor shows reference information for the modes that support it
    "editor.referenceInfos": true,

    // Controls whether the editor has code folding enabled
    "editor.folding": true,

    // Controls if the diff editor shows the diff side by side or inline
    "diffEditor.renderSideBySide": true,

    // Controls if the diff editor shows changes in leading or trailing whitespace as diffs
    "diffEditor.ignoreTrimWhitespace": true,


    //-------- Window configuration --------

    // When enabled, will open files in a new window instead of reusing an existing instance.
    "window.openFilesInNewWindow": true,

    // Controls how folders are being reopened after a restart. Select 'none' to never reopen a folder, 'one' to reopen the last folder you worked on or 'all' to reopen all folders of your last session.
    "window.reopenFolders": "one",

    // Adjust the zoom level of the window. The original size is 0 and each increment above or below represents zooming 20% larger or smaller.
    "window.zoomLevel": 0,


    //-------- Files configuration --------

    // Configure glob patterns for excluding files and folders.
    "files.exclude": {
        "**/.git": true,
        "**/.DS_Store": true
    },

    // The default character set encoding to use when reading and writing files.
    "files.encoding": "utf8",

    // The default end of line character.
    "files.eol": "\r\n",

    // When enabled, will trim trailing whitespace when you save a file.
    "files.trimTrailingWhitespace": false,

    // Controls auto save of dirty files. Accepted values:  "off", "afterDelay", "onFocusChange". If set to "afterDelay" you can configure the delay in "files.autoSaveDelay".
    "files.autoSave": "off",

    // Controls the delay in ms after which a dirty file is saved automatically. Only applies when "files.autoSave" is set to "afterDelay"
    "files.autoSaveDelay": 1000,


    //-------- File Explorer configuration --------

    // Maximum number of working files to show before scrollbars appear.
    "explorer.workingFiles.maxVisible": 9,

    // Controls if the height of the working files section should adapt dynamically to the number of elements or not.
    "explorer.workingFiles.dynamicHeight": true,


    //-------- HTTP configuration --------

    // The proxy setting to use. If not set will be taken from the http_proxy and https_proxy environment variables
    "http.proxy": "",

    // Whether the proxy server certificate should be verified against the list of supplied CAs.
    "http.proxyStrictSSL": true,


    //-------- Search configuration --------

    // Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the file.exclude setting.
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true
    },


    //-------- Update configuration --------

    // Configure the update channel to receive updates from. Requires a restart after change.
    "update.channel": "default",


    //-------- Git configuration --------

    // Is git enabled
    "git.enabled": true,

    // Path to the git executable
    "git.path": null,

    // Whether auto fetching is enabled.
    "git.autofetch": true,


    //-------- Telemetry configuration --------

    // Enable usage data and errors to be sent to Microsoft.
    "telemetry.enableTelemetry": true,


    //-------- CSS configuration --------

    // Controls CSS validation and problem severities.

    // Enables or disables all validations
    "css.validate": true,

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties
    "css.lint.compatibleVendorPrefixes": "ignore",

    // When using a vendor-specific prefix also include the standard property
    "css.lint.vendorPrefix": "warning",

    // Do not use duplicate style definitions
    "css.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets
    "css.lint.emptyRules": "warning",

    // Import statements do not load in parallel
    "css.lint.importStatement": "ignore",

    // Do not use width or height when using padding or border
    "css.lint.boxModel": "ignore",

    // The universal selector (*) is known to be slow
    "css.lint.universalSelector": "ignore",

    // No unit for zero needed
    "css.lint.zeroUnits": "ignore",

    // @font-face rule must define 'src' and 'font-family' properties
    "css.lint.fontFaceProperties": "warning",

    // Hex colors must consist of three or six hex numbers
    "css.lint.hexColorLength": "error",

    // Invalid number of parameters
    "css.lint.argumentsInColorFunction": "error",

    // Unknown property.
    "css.lint.unknownProperties": "warning",

    // IE hacks are only necessary when supporting IE7 and older
    "css.lint.ieHack": "ignore",

    // Unknown vendor specific property.
    "css.lint.unknownVendorSpecificProperties": "ignore",

    // Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
    "css.lint.propertyIgnoredDueToDisplay": "warning",

    // Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "css.lint.important": "ignore",

    // Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "css.lint.float": "ignore",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "css.lint.idSelector": "ignore",


    //-------- JSON configuration --------

    // Associate schemas to JSON files in the current project
    "json.schemas": [],


    //-------- Markdown preview configuration --------

    // A list of URLs or local paths to CSS style sheets to use from the markdown preview.
    "markdown.styles": [],


    //-------- Telemetry configuration --------

    // Enable crash reports to be sent to Microsoft.
    // This option requires restart of VSCode to take effect.
    "telemetry.enableCrashReporter": true,


    //-------- LESS configuration --------

    // Controls LESS validation and problem severities.

    // Enables or disables all validations
    "less.validate": true,

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties
    "less.lint.compatibleVendorPrefixes": "ignore",

    // When using a vendor-specific prefix also include the standard property
    "less.lint.vendorPrefix": "warning",

    // Do not use duplicate style definitions
    "less.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets
    "less.lint.emptyRules": "warning",

    // Import statements do not load in parallel
    "less.lint.importStatement": "ignore",

    // Do not use width or height when using padding or border
    "less.lint.boxModel": "ignore",

    // The universal selector (*) is known to be slow
    "less.lint.universalSelector": "ignore",

    // No unit for zero needed
    "less.lint.zeroUnits": "ignore",

    // @font-face rule must define 'src' and 'font-family' properties
    "less.lint.fontFaceProperties": "warning",

    // Hex colors must consist of three or six hex numbers
    "less.lint.hexColorLength": "error",

    // Invalid number of parameters
    "less.lint.argumentsInColorFunction": "error",

    // Unknown property.
    "less.lint.unknownProperties": "warning",

    // IE hacks are only necessary when supporting IE7 and older
    "less.lint.ieHack": "ignore",

    // Unknown vendor specific property.
    "less.lint.unknownVendorSpecificProperties": "ignore",

    // Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
    "less.lint.propertyIgnoredDueToDisplay": "warning",

    // Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "less.lint.important": "ignore",

    // Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "less.lint.float": "ignore",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "less.lint.idSelector": "ignore",


    //-------- Sass configuration --------

    // Controls Sass validation and problem severities.

    // Enables or disables all validations
    "sass.validate": true,

    // When using a vendor-specific prefix make sure to also include all other vendor-specific properties
    "sass.lint.compatibleVendorPrefixes": "ignore",

    // When using a vendor-specific prefix also include the standard property
    "sass.lint.vendorPrefix": "warning",

    // Do not use duplicate style definitions
    "sass.lint.duplicateProperties": "ignore",

    // Do not use empty rulesets
    "sass.lint.emptyRules": "warning",

    // Import statements do not load in parallel
    "sass.lint.importStatement": "ignore",

    // Do not use width or height when using padding or border
    "sass.lint.boxModel": "ignore",

    // The universal selector (*) is known to be slow
    "sass.lint.universalSelector": "ignore",

    // No unit for zero needed
    "sass.lint.zeroUnits": "ignore",

    // @font-face rule must define 'src' and 'font-family' properties
    "sass.lint.fontFaceProperties": "warning",

    // Hex colors must consist of three or six hex numbers
    "sass.lint.hexColorLength": "error",

    // Invalid number of parameters
    "sass.lint.argumentsInColorFunction": "error",

    // Unknown property.
    "sass.lint.unknownProperties": "warning",

    // IE hacks are only necessary when supporting IE7 and older
    "sass.lint.ieHack": "ignore",

    // Unknown vendor specific property.
    "sass.lint.unknownVendorSpecificProperties": "ignore",

    // Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
    "sass.lint.propertyIgnoredDueToDisplay": "warning",

    // Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
    "sass.lint.important": "ignore",

    // Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
    "sass.lint.float": "ignore",

    // Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
    "sass.lint.idSelector": "ignore",


    //-------- TypeScript configuration --------

    // Complete functions with their parameter signature.
    "typescript.useCodeSnippetsOnMethodSuggest": false,

    // Specifies the folder path containing the tsserver and lib*.d.ts files to use.
    "typescript.tsdk": null,


    //-------- PHP Configuration options --------

    // Whether php validation is enabled or not.
    "php.validate.enable": true,

    // Points to the php executable.
    "php.validate.executablePath": null,

    // Whether the linter is run on save or on type.
    "php.validate.run": "onSave",

    // Suggest extensions based on changed and open files.
    "extensions.showTips": true

}
```

## Common Questions

**Q: When does it make sense to use workspace settings?**

**A:** If you're using a workspace that needs custom settings but you don't want to apply them to your other VS Code projects. A good example is language-specific linting rules.


