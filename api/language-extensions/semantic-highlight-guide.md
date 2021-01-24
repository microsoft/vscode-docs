---
# DO NOT TOUCH — Managed by doc writer
ContentId: 8308017a-75de-430a-b420-d9d2064162b9
DateApproved: 12/11/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to syntax highlighting
---

# Semantic Highlight Guide

Semantic highlighting is an addition to syntax highlighting as described in the [Syntax Highlight Guide](syntax-highlight-guide). Visual Studio Code uses TextMate grammars as the main tokenization engine. TextMate grammars work on a single file as input and break it up based on lexical rules expressed in regular expressions.

Semantic tokenization allows language servers to provide additional token information based on the language server's knowledge on how to resolve symbols in the context of a project. Themes can opt-in to use semantic tokens to improve and refine the syntax highlighting from grammars. The editor applies the highlighting from semantic tokens on top of the highlighting from grammars.

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

- `DocumentRangeSemanticTokensProvider` - Works only on a range:

  - `provideDocumentRangeSemanticTokens` - Provides all tokens of a document range.

Each token returned by the provider comes with a classification that consists of a token type, any number of token modifiers, and a token language. This information is similar to the TextMate scopes described in the [Syntax Highlight Guide](/api/language-extensions/syntax-highlight-guide), but has its own dedicated, cleaner classification system.

As seen in the example above, the provider names the types and modifiers it's going to use in a `SemanticTokensLegend`. That allows the `provide` APIs to return token types and modifies as an index to the legend.

## Semantic token classification

These are the standard semantic token types and semantic token modifiers predefined by VS Code.

The standard types and modifiers cover common concepts used by many languages. While each languages might use a different terminology for some types and modifiers, by adhering to the standard classifications, it will be possible for theme authors to define theming rules that work across languages.

Standard semantic token types:


| Id      | Description                   |
| ----------------------------- | -------------------------------- |
| `namespace`| For identifiers that declare or reference a namespace, module or package. |
| `class`| For identifiers that declare of reference a class type. |
| `enum`| For identifiers that declare of reference an enumeration type. |
| `interface`| For identifiers that declare of reference an interface type. |
| `struct`| For identifiers that declare of reference an struct type. |
| `typeParameter`| For identifiers that declare of reference a type parameter. |
| `type`| For identifiers that declare of reference a type that is not covered above. |
| `parameter` | For identifiers that declare of reference a function or method parameters. |
| `variable` | For identifiers that declare of reference a local or global variable. |
| `property` | For identifiers that declare of reference a member property, member field or member variable. |
| `enumMember` | For identifiers that declare of enumeration property, constant or member. |
| `event`| For identifiers that declare of enumeration property. |
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


Standard semantic token modifiers:

| Id      | Description                   |
| ----------------------------- | -------------------------------- |
| `declaration`| For declarations of symbols.  |
| `definition`| For definitions of symbols, e.g. in header files.  |
| `readonly`| For readonly variables and member fields a.k.a. constants.  |
| `static`| For class members a.k.a static members. |
| `deprecated`| For symbols that should no longer be used.  |
| `abstract`| For types and member functions that are abstract.  |
| `async`| For functions that are marked async.  |
| `modification`| For variable references where the variable is assigned to.  |
| `documentation`| For occurrences of symbols in documentation.  |
| `defaultLibrary`| For symbols that are part of the standard library.  |

If necessary, extensions can define new types and modifiers or create sub types of existing type through the `semanticTokenTypes` and `semanticTokenModifiers` contribution points.

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

A contributed type can name a super type from which it will inherit all styling rules.

## Theming

Theming is about assigning colors and styles to tokens. Theming rules are specified in color themes, but users can customize the theming rules in the user settings.

Using the `semanticHighlighting` setting, a color theme can tell the editor whether semantic tokens should be shown or not.

If enabled, semantic tokens are first matched against the semantic token rules defined in `semanticTokenColors`:

```json
{
  "semanticTokenColors": {
    "variable.readonly:java": "#ff0000"
  }
}
```

`variable.readonly:java` is called a selector and has the form `(*|tokenType)(.tokenModifier)*(:tokenLanguage)?`.

Here are other examples of selectors and styles:

- "*.declaration": { "fontStyle": "bold" }: // all declarations are bold
- "class:java": { "foreground": "#00ff00" "fontStyle": "bold" } // classes in java

If no rule matches, the VS Code uses the [Semantic Token Scope Map](#semantic-token-scope-map) to evaluate a TextMate scope for the given semantic token. That scope is matched against the TextMate theming rules in `tokenColors`.

## Semantic token scope map

In order to make semantic highlighting also work for themes that have not defined any specific semantic rules and to serve as fallback for custom token types and modifiers, VS Code maintains a map from semantic token selectors to TextMate scopes.

If a theme has semantic highlighting enabled, but does not contain a rule for the given semantic token, these TextMate scopes are used to find a TextMate theming rule instead.

The following table shows the predefined mappings.

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

This map can be extended by new rules through the `semanticTokenScopes` contribution point.

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

- The provider of a TextMate grammar can describe the language specific scopes. That helps with themes that contain language specific theming rules.

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

We have a [Semantic Tokens sample](https://github.com/microsoft/vscode-extension-samples/tree/master/semantic-tokens-sample) that illustrates how to create a semantic token provider.

The [scope inspector](/api/language-extensions/syntax-highlight-guide#scope-inspector) tool allows you to explore what semantic tokens are present in a source file and what theme rules they match to. To see semantic token, use a built-in theme (for example, Dark+) on a TypeScript file.
