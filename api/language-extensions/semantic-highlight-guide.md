---
# DO NOT TOUCH — Managed by doc writer
ContentId: 8308017a-75de-430a-b420-d9d2064162b9
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to syntax highlighting
---

# Semantic Highlight Guide

Semantic highlighting is an addition to syntax highlighting as described in the [Syntax Highlight guide](/api/language-extensions/syntax-highlight-guide). Visual Studio Code uses TextMate grammars as the main tokenization engine. TextMate grammars work on a single file as input and break it up based on lexical rules expressed in regular expressions.

Semantic tokenization allows language servers to provide additional token information based on the language server's knowledge on how to resolve symbols in the context of a project. Themes can opt in to use semantic tokens to improve and refine the syntax highlighting from grammars. The editor applies the highlighting from semantic tokens on top of the highlighting from grammars.

Here's an example of what semantic highlighting can add:

Without semantic highlighting:

![without semantic highlighting](images/semantic-highlighting/no-semantic-highlighting.png)

With semantic highlighting:

![with semantic highlighting](images/semantic-highlighting/with-semantic-highlighting.png)

Notice the color differences based on language service symbol understanding:

- line 10: `languageModes` is colored as a parameter
- line 11: `Range` and `Position` are colored as classes and `document` as a parameter.
- line 13: `getFoldingRanges` is colored as a function.

## Semantic token provider

To implement semantic highlighting, language extensions can register a `semantic token provider` by document language and/or file name. The editor will make requests to the providers when semantic tokens are needed.

```ts
const tokenTypes = ['class', 'interface', 'enum', 'function', 'variable'];
const tokenModifiers = ['declaration', 'documentation'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

const provider: vscode.DocumentSemanticTokensProvider = {
  provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
    // analyze the document and return semantic tokens

    const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
    // on line 1, characters 1-5 are a class declaration
    tokensBuilder.push(
      new vscode.Range(new vscode.Position(1, 1), new vscode.Position(1, 5)),
      'class',
      ['declaration'],
    );
    return tokensBuilder.build();
  }
};

const selector = { language: 'java', scheme: 'file' }; // register for all Java documents from the local file system

vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend);
```

The semantic token provider API comes in two flavors to accommodate a language server's capabilities:

- `DocumentSemanticTokensProvider` - Always takes a full document as input.

  - `provideDocumentSemanticTokens` - Provides all tokens of a document.
  - `provideDocumentSemanticTokensEdits`- Provides all tokens of a document as a delta to the previous response.

- `DocumentRangeSemanticTokensProvider` - Works only on a range.

  - `provideDocumentRangeSemanticTokens` - Provides all tokens of a document range.

Each token returned by the provider comes with a classification that consists of a token type, any number of token modifiers, and a token language.

As seen in the example above, the provider names the types and modifiers it's going to use in a `SemanticTokensLegend`. That allows the `provide` APIs to return token types and modifies as an index to the legend.

## Semantic token classification

The output of a semantic token provider consists of tokens. Each token has a range and a token classification that describes what kind of syntax element the token represents. Optionally, the classification can also name a language, if the token is part of an embedded language.

To describe the kind of syntax element, semantic token types and modifiers are used. This information is similar to the TextMate scopes described in the [Syntax Highlight guide](/api/language-extensions/syntax-highlight-guide), but we wanted to come up with a dedicated and cleaner classification system.

VS Code comes with a set of standard semantic token types and modifiers for all semantic token providers to use. Still, semantic token providers are free to define new types and modifiers and create a subtype of the standard types.

### Standard token types and modifiers

The standard types and modifiers cover common concepts used by many languages. While each language might use a different terminology for some types and modifiers, by adhering to the standard classifications, it will be possible for theme authors to define theming rules that work across languages.

These are the standard semantic token types and semantic token modifiers predefined by VS Code:

Standard token types:

| ID      | Description                   |
| ----------------------------- | -------------------------------- |
| `namespace`| For identifiers that declare or reference a namespace, module, or package. |
| `class`| For identifiers that declare or reference a class type. |
| `enum`| For identifiers that declare or reference an enumeration type. |
| `interface`| For identifiers that declare or reference an interface type. |
| `struct`| For identifiers that declare or reference a struct type. |
| `typeParameter`| For identifiers that declare or reference a type parameter. |
| `type`| For identifiers that declare or reference a type that is not covered above. |
| `parameter` | For identifiers that declare or reference a function or method parameters. |
| `variable` | For identifiers that declare or reference a local or global variable. |
| `property` | For identifiers that declare or reference a member property, member field, or member variable. |
| `enumMember` | For identifiers that declare or reference an enumeration property, constant, or member. |
| `decorator` | For identifiers that declare or reference decorators and annotations. |
| `event`| For identifiers that declare an event property. |
| `function`| For identifiers that declare a function. |
| `method`| For identifiers that declare a member function or method. |
| `macro`| For identifiers that declare a macro. |
| `label`| For identifiers that declare a label. |
| `comment`| For tokens that represent a comment. |
| `string`| For tokens that represent a string literal. |
| `keyword`| For tokens that represent a language keyword. |
| `number`| For tokens that represent a number literal. |
| `regexp`| For tokens that represent a regular expression literal. |
| `operator`| For tokens that represent an operator. |

Standard token modifiers:

| ID      | Description                   |
| ----------------------------- | -------------------------------- |
| `declaration`| For declarations of symbols.  |
| `definition`| For definitions of symbols, for example, in header files.  |
| `readonly`| For readonly variables and member fields (constants).  |
| `static`| For class members (static members). |
| `deprecated`| For symbols that should no longer be used.  |
| `abstract`| For types and member functions that are abstract.  |
| `async`| For functions that are marked async.  |
| `modification`| For variable references where the variable is assigned to.  |
| `documentation`| For occurrences of symbols in documentation.  |
| `defaultLibrary`| For symbols that are part of the standard library.  |

Along with the standard types and modifiers, VS Code defines a mapping of types and modifiers to similar TextMate scopes. That's covered in the section [Semantic Token Scope Map](#semantic-token-scope-map).

### Custom token types and modifiers

If necessary, extensions can declare new types and modifiers or create sub types of existing types through the `semanticTokenTypes` and `semanticTokenModifiers` contribution points in their extension's `package.json`:

```json
{
  "contributes": {
    "semanticTokenTypes": [{
      "id": "templateType",
      "superType": "type",
      "description": "A template type."
    }],
    "semanticTokenModifiers": [{
      "id": "native",
      "description": "Annotates a symbol that is implemented natively"
    }]
  }
}
```

In the example above, an extension declares a new type `templateType` and a new modifier `native`. By naming `type` as the super type, theme styling rules for `type` will also apply to `templateType`:

```json
{
  "name": "Red Theme",
  "semanticTokenColors": {
    "type": "#ff0011"
  }
}
```

The `semanticTokenColors` value `"#ff0011"` shown above applies to both `type` and all it's subtypes, including `templateType`.

Along with custom token types, extensions can define how these are mapped to TextMate scopes. This is described in the [Custom Mappings](#custom-textmate-scope-mappings) section. Note that custom mapping rules are not automatically inherited from the super type. Instead, subtypes need to redefine the mapping, preferably to more specific scopes.

## Enablement of semantic highlighting

Whether semantic tokens are computed and highlighted is decided by the setting `editor.semanticHighlighting.enabled`. It can have values `true`, `false`, and `configuredByTheme`.

- `true` and `false` turn semantic highlighting on or off for all themes.
- `configuredByTheme` is the default and lets each theme control whether semantic highlighting is enabled or not. All the themes that ship with VS Code (for example, the "Dark+" default) have semantic highlighting enabled by default.

Language extensions that depend on semantic tokens can override the default for their language in their `package.json`:

```json
{
  "configurationDefaults": {
    "[languageId]": {
      "editor.semanticHighlighting.enabled": true
    }
  }
}
```

## Theming

Theming is about assigning colors and styles to tokens. Theming rules are specified in Color Theme files (JSON format). Users can also customize the theming rules in the user settings.

### Semantic coloring in Color Themes

Two new properties have been added to the Color Theme file format in order to support highlighting based on semantic tokens.

The property `semanticHighlighting` defines whether the theme is ready for highlighting using semantic tokens. It is false by default, but we encourage all themes to enable it. The property is used when the setting `editor.semanticHighlighting.enabled` is set to `configuredByTheme`.

The property `semanticTokenColors` allows a theme to define new coloring rules that match against the semantic token types and modifiers that are emitted by the semantic token providers.

```jsonc
{
  "name": "Red Theme",
  "tokenColors": [
    {
      "scope": "comment",
      "settings": {
        "foreground": "#dd0000",
        "fontStyle": "italic"
      }
    }
  ],
  "semanticHighlighting": true,
  "semanticTokenColors": {
    "variable.readonly:java": "#ff0011"
  }
}
```

`variable.readonly:java` is called a selector and has the form `(*|tokenType)(.tokenModifier)*(:tokenLanguage)?`.

The value describes the style if the rule matches. It is either a string, representing the foreground color, or an object, in the form `{ foreground: string, bold: boolean, italic: boolean, underline: boolean }` or `{ foreground: string, fontStyle: string }` as used for TextMate theme rule in `tokenColors`.

The foreground needs to follow a color format as described in [Color formats](/api/references/theme-color#color-formats). Transparency is not supported.

Here are other examples of selectors and styles:

- `"*.declaration": { "bold": true } // all declarations are bold`
- `"class:java": { "foreground": "#0f0", "italic": true } // classes in java`

If no rule matches or the theme has no `semanticTokenColors` section (but `semanticHighlighting` enabled), VS Code uses the [Semantic Token Scope Map](#semantic-token-scope-map) to evaluate a TextMate scope for the given semantic token. That scope is matched against the themes TextMate theming rules in `tokenColors`.

## Semantic token scope map

In order to make semantic highlighting work for themes that have not defined any specific semantic rules and to serve as fallback for custom token types and modifiers, VS Code maintains a map from semantic token selectors to TextMate scopes.

If a theme has semantic highlighting enabled, but does not contain a rule for the given semantic token, these TextMate scopes are used to find a TextMate theming rule instead.

### Predefined TextMate scope mappings

The following table lists the currently predefined mappings.

| Semantic Token Selector       | Fallback TextMate Scope                   |
| ----------------------------- | -------------------------------- |
| `namespace`|`entity.name.namespace`|
| `type`|`entity.name.type`|
| `type.defaultLibrary`|`support.type`|
| `struct`|`storage.type.struct`|
| `class`|`entity.name.type.class`|
| `class.defaultLibrary`|`support.class`|
| `interface`|`entity.name.type.interface`|
| `enum`|`entity.name.type.enum`|
| `function`|`entity.name.function`|
| `function.defaultLibrary`|`support.function`|
| `method`|`entity.name.function.member`|
| `macro`|`entity.name.function.macro`|
| `variable`|`variable.other.readwrite` , `entity.name.variable`|
| `variable.readonly`|`variable.other.constant`|
| `variable.readonly.defaultLibrary`|`support.constant`|
| `parameter`|`variable.parameter`|
| `property`|`variable.other.property`|
| `property.readonly`|`variable.other.constant.property`|
| `enumMember`|`variable.other.enummember`|
| `event`|`variable.other.event`|

### Custom TextMate scope mappings

This map can be extended by extensions through the `semanticTokenScopes` contribution point in their `package.json`.

There are two use cases for extensions to do that:

- The extension that defines custom token types and token modifiers provides TextMate scopes as fallback when a theme does not define a theming rule for the added semantic token type or modifiers:

  ```json
  {
    "contributes": {
      "semanticTokenScopes": [
        {
          "scopes": {
            "templateType": [ "entity.name.type.template" ]
          }
        }
      ]
    }
  }
  ```

- The provider of a TextMate grammar can describe the language-specific scopes. That helps with themes that contain language-specific theming rules.

  ```json
  {
    "contributes": {
      "semanticTokenScopes": [
        {
          "language": "typescript",
          "scopes": {
            "property.readonly": ["variable.other.constant.property.ts"],
          }
        }
      ]
    }
  }
  ```

## Try it out

We have a [Semantic Tokens sample](https://github.com/microsoft/vscode-extension-samples/tree/main/semantic-tokens-sample) that illustrates how to create a semantic token provider.

The [scope inspector](/api/language-extensions/syntax-highlight-guide#scope-inspector) tool allows you to explore what semantic tokens are present in a source file and what theme rules they match to. To see semantic token, use a built-in theme (for example, Dark+) on a TypeScript file.
