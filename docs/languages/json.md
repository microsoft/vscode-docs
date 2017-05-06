---
Order: 3
Area: languages
TOCTitle: JSON
ContentId: FB3B14D9-A59A-4968-ACFC-5FB5D4E9B70E
PageTitle: JSON editing in Visual Studio Code
DateApproved: 5/4/2017
MetaDescription: Edit JSON files in Visual Studio Code
---
# Editing JSON with VS Code

JSON is a data format that is common in configuration files like `package.json` or `project.json`. We also use it extensively in VS Code for our configuration files.  When opening a file that ends with `.json`, VS Code provides features out of the box to make it simpler to write or modify the file's content.

![JSON within VS Code](images/json/json_hero.png)

## JSON Comments

Comments in JSON are an extension to JSON specification that is supported by VS Code. You can use single line (//) as well as block comments (/* */) as used in JavaScript.

## IntelliSense & Validation

For properties and values (`kb(editor.action.triggerSuggest)`), both for JSON data with and without schema, we offer up suggestions as you type with IntelliSense.   We also perform structural and value verification based on an associated JSON schema giving you red squigglies.

![IntelliSense](images/json/intellisense.png)

### Package and Project Dependencies

We also offer IntelliSense for specific value sets such as package and project dependencies in `package.json`, `project.json` and `bower.json`.

## Quick Navigation

JSON files can get pretty large and we support quick navigation to properties `kb(workbench.action.gotoSymbol)` (**Go to Symbol**) with the Command Palette.

![Goto Symbol](images/json/gotosymbol.png)

## Hovers

When you hover over properties and values for JSON data with or without schema, we will provide additional context.

![Hover](images/json/hoverandtoggle.png)


## Formatting

You can format your JSON document using `kb(editor.action.formatDocument)` or **Format Document** from the context menu.

## JSON Schemas & Settings

To understand the structure of JSON files, we use [JSON schemas](https://spacetelescope.github.io/understanding-json-schema/). JSON schemas describe the shape of the JSON file, as well as value sets, default values, and descriptions.

Servers like [JSON Schema Store](http://schemastore.org) provide schemas for most of the common JSON based configuration files. However, schemas can also be defined in a file in the VS Code workspace, as well as the VS Code settings files.

The association of a JSON file to a schema can be done either in the JSON file itself using the `$schema` attribute, or in the User or Workspace [Settings](/docs/getstarted/settings.md) (**File** > **Preferences** > **Settings**) under the property `json.schemas`.

VS Code extensions can also define schemas and schema mapping. That's why VS Code already knows about the schema of some well known JSON files such as `package.json`, `bower.json` and `tsconfig.json`.

### Mapping in the JSON

In the following example, the JSON file specifies that its contents follow the [CoffeeLint](http://www.coffeelint.org/) schema.

```json
{
   "$schema": "http://json.schemastore.org/coffeelint",
   "line_endings": "unix"
}
```

### Mapping in the User Settings

The following excerpt from the User Settings shows how `.babelrc` files are mapped to the [babelrc](https://babeljs.io/docs/usage/babelrc) schema located on http://json.schemastore.org/babelrc.

```json
"json.schemas": [
    {
        "fileMatch": [
            "/.babelrc"
        ],
        "url": "http://json.schemastore.org/babelrc"
    },
```

>**Tip:** Additionally to defining a schema for `.babelrc`, also make sure that `.babelrc` is associated to the JSON language mode. This is also done in the settings using the `files.association` array setting.

>**Tip:** For an overview on settings, see [User and Workspace Settings](/docs/getstarted/settings.md).

### Mapping to a Schema in the Workspace

To map a schema that is located in the workspace, use a relative path. In this example, a file in the workspace root called `myschema.json` will be used as the schema for all files ending with `.foo.json`.

```json
"json.schemas": [
    {
        "fileMatch": [
            "/*.foo.json"
        ],
        "url": "./myschema.json"
    },
```

### Mapping to a Schema Defined in Settings

To map a schema that is defined in the User or Workspace Settings, use the `schema` property. In this example, a schema is defined that will be used for all files named `.myconfig`.

```json
"json.schemas": [
    {
        "fileMatch": [
            "/.myconfig"
        ],
        "schema": {
            "type": "object",
            "properties": {
                "name" : {
                    "type": "string",
                    "description": "The name of the entry"
                }
            }
        }
    },
```


### Mapping a Schema in an Extension

Schemas and schema associations can also be defined by an extension. Check out the [jsonValidation contribution point](/docs/extensionAPI/extension-points.md#contributesjsonvalidation).

### Define Snippets in JSON Schemas

JSON schemas describe the shape of the JSON file, as well as value sets and default values which are used by the JSON language support to provide completion proposals.
If you are a schema author and want to provide even more customized completion proposals, you can also specify snippets in the schema. The following example shows a schema for a our keybinding settings file defining a snippet:

```json
{
    "type": "array",
    "title": "Keybindings configuration",
    "items": {
        "type": "object",
        "required": ["key"],
        "defaultSnippets": [
            {
                "label": "New keybinding",
                "description": "Binds a key to a command for a given state",
                "body": { "key": "$1", "command": "$2", "when": "$3" }
            }
        ],
        "properties": {
            "key": {
                "type": "string",
            }
            ...
        }
    }
};
```

Use the property `defaultSnippets` to specify any number of snippets for the given JSON object.
- `label` and `description` will be shown in the completion selection dialog. If no label is provided, a stringified object representation of the snippet will be shown as label instead.
- `body` is the JSON object that is stringified and inserted when the completion is selected by the user. [Snippet syntax](https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md) can be used inside strings literals to define tabstops, placeholders and variables. If a string starts with `^`, the string content will be inserted as-is, not stringified. You can use this to specify snippets for numbers and booleans.

Note that `defaultSnippets` is not part of the JSON schema spec but a VS Code specific schema extension.

