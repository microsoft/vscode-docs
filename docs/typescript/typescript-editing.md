---
Order: 3
Area: typescript
TOCTitle: Editing
ContentId: db5139eb-9623-4d0b-8180-8b495e2b8b06
PageTitle: TypeScript editing with Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Learn about TypeScript editing with Visual Studio Code.
---
# Editing TypeScript

Visual Studio Code has great editing support for [TypeScript](https://www.typescriptlang.org). This article goes into depth on the editing and programming language features that come built-in to VS Code. If you'd like to know more about general editing features in VS Code, such as keyboard shortcuts, multi-cursors, search, and find and replace, you can read [Basic Editing](/docs/editor/codebasics.md).

## IntelliSense

IntelliSense shows you intelligent code completion, hover information, and signature help so that you can write code more quickly and correctly.

![TypeScript small completions for String type](images/editing/ts-intellisense.png)

VS Code provides IntelliSense for individual TypeScript files as well as TypeScript `tsconfig.json` projects.

### Hover information

Hover over a TypeScript symbol to quickly see its type information and relevant documentation:

![Hover for a lodash function](images/editing/hover.png)

You can also show the hover information at the current cursor position with the `kb(editor.action.showHover)` keyboard shortcut.

### Signature help

As you write a TypeScript function call, VS Code shows information about the function signature and highlights the parameter that you are currently completing:

![Signature help for the lodash capitalize function](images/editing/signature-help.png)

Signature help is shown automatically when you type a `(` or `,` within a function call. Use `kb(editor.action.triggerParameterHints)`  to manually trigger signature help.

## Snippets

VS Code includes basic TypeScript [snippets](/docs/editor/userdefinedsnippets.md) that are suggested as you type;

![Typescript snippets](images/editing/ts-snippets.png)

You can install extensions to get additional snippets or define your own snippets for TypeScript. See [User Defined Snippets](/docs/editor/userdefinedsnippets.md) for more information.

> **Tip**: You can disable snippets by setting `editor.snippetSuggestions` to `"none"` in your [settings](/docs/getstarted/settings.md) file. If you'd like to see snippets, you can specify the order relative to suggestions; at the top (`"top"`), at the bottom (`"bottom"`), or inlined ordered alphabetically (`"inline"`). The default is `"inline"`.

## Inlay hints

Inlay hints add additional inline information to source code to help you understand what the code does.

**Parameter name inlay hints** show the names of parameters in function calls:

![Parameter name inlay hints](images/editing/inlay-parameters.png)

This can help you understand the meaning of each argument at a glance, which is especially helpful for functions that take Boolean flags or have parameters that are easy to mix up.

To enable parameter name hints, set `typescript.inlayHints.parameterNames.enabled`. There are three possible values:

* `none` — Disable parameter inlay hints.
* `literals` — Only show inlay hints for literals (string, number, Boolean).
* `all` — Show inlay hints for all arguments.

**Variable type inlay hints** show the types of variables that don't have explicit type annotations.

Setting: `typescript.inlayHints.variableTypes.enabled`

![Variable type inlay hints](images/editing/inlay-var-types.png)

**Property type inlay hints** show the type of class properties that don't have an explicit type annotation.

Setting: `typescript.inlayHints.propertyDeclarationTypes.enabled`

![Property type inlay hints](images/editing/inlay-property-types.png)

**Parameter type hints**  show the types of implicitly typed parameters.

Setting: `typescript.inlayHints.parameterTypes.enabled`

![Parameter type inlay hints](images/editing/inlay-parameter-types.png)

**Return type inlay hints** show the return types of functions that don't have an explicit type annotation.

Setting: `typescript.inlayHints.functionLikeReturnTypes.enabled`

![Return type inlay hints](images/editing/inlay-return-type.png)

## References CodeLens

The TypeScript references CodeLens displays an inline count of reference for classes, interfaces, methods, properties, and exported objects:

![TypeScript references CodeLens](images/editing/ts-references-code-lens.png)

You can enable this by setting `"typescript.referencesCodeLens.enabled": true` in the User Settings file.

Click on the reference count to quickly browse a list of references:

![TypeScript references CodeLens peek](images/editing/ts-references-code-lens-peek.png)

## Implementations CodeLens

The TypeScript implementations CodeLens displays the number of implementors of an interface:

![TypeScript implementations CodeLens](images/editing/ts-implementations-code-lens.png)

You can enable this by setting `"typescript.implementationsCodeLens.enabled": true`.

As with the references CodeLens, you can click on the implementation count to quickly browse a list of all implementations.

## Auto imports

Automatic imports speed up coding by helping you find available symbols and automatically adding imports for them.

Just start typing to see [suggestions](#intellisense) for all available TypeScript symbols in your current project.

![Global symbols are shown in the suggestion list](images/editing/auto-import-pre.png)

If you choose one of the suggestions from another file or module, VS Code will automatically add an import for it. In this example, VS Code adds an import for `Hercules` to the top of the file:

![After selecting a symbol from a different file, an import is added for it automatically](images/editing/auto-import-post.png)

You can disable auto imports by setting `"typescript.suggest.autoImports": false`.

## JSX and auto closing tags

VS Code's TypeScript features also work with [JSX](https://reactjs.org/docs/introducing-jsx.html). To use JSX in your TypeScript, use the `*.tsx` file extension instead of the normal `*.ts`:

![IntelliSense in JSX](images/editing/jsx.png)

VS Code also includes JSX-specific features such as autoclosing of JSX tags in TypeScript:

<video src="images/editing/jsx-tag-complete.mp4" placeholder="images/editing/jsx-tag-complete.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

Set `"typescript.autoClosingTags"` to `false` to disable JSX tag closing.

## JSDoc support

VS Code's TypeScript IntelliSense understands many standard [JSDoc](https://jsdoc.app) annotations, and uses them to show typing information and documentation in [suggestions](#intellisense), [hover information](#hover-information), and [signature help](#signature-help).

![TypeScript language within VS Code](images/editing/jsdocs.png)

Keep in mind that when using JSDoc for TypeScript code, you should not include type annotations. The TypeScript compiler only uses TypeScript type annotations and ignores those from JSDoc.

<video src="images/editing/jsdoc-autofill.mp4" placeholder="images/editing/jsdoc-autofill-placeholder.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

To disable JSDoc comment suggestions in TypeScript, set `"typescript.suggest.completeJSDocs": false`.

## Code navigation

Code navigation lets you quickly navigate TypeScript projects.

* **Go to Definition** `kb(editor.action.revealDefinition)` - Go to the source code of a symbol definition.
* **Peek Definition** `kb(editor.action.peekDefinition)` - Bring up a Peek window that shows the definition of a symbol.
* **Go to References** `kb(editor.action.goToReferences)` - Show all references to a symbol.
* **Go to Type Definition** - Go to the type that defines a symbol. For an instance of a class, this will reveal the class itself instead of where the instance is defined.
* **Go to Implementation** `kb(editor.action.goToImplementation)` - Go to the implementations of an interface or abstract method.

You can navigate via symbol search using the **Go to Symbol** commands from the **Command Palette** (`kb(workbench.action.showCommands)`).

* **Go to Symbol in File** `kb(workbench.action.gotoSymbol)`
* **Go to Symbol in Workspace** `kb(workbench.action.showAllSymbols)`

## Formatting

VS Code includes a TypeScript formatter that provides basic code formatting with reasonable defaults.

Use the `typescript.format.*` [settings](/docs/getstarted/settings.md) to configure the built-in formatter, such as making braces appear on their own line. Or, if the built-in formatter is getting in the way, set `"typescript.format.enable"` to `false` to disable it.

For more specialized code formatting styles, try installing one of the formatting extensions from the VS Code marketplace.

## Syntax highlighting and semantic highlighting

In addition to syntax highlighting, TypeScript and JavaScript also provide semantic highlighting.

Syntax highlighting colors the text based on lexical rules. Semantic highlighting enriches the syntax coloring based on resolved symbol information from the language service.

Whether semantic highlighting is visible depends on the current color theme. Each theme can [configure](/docs/getstarted/themes.md#editor-semantic-highlighting) whether to display semantic highlighting and how it styles the semantic tokens.

If semantic highlighting is enabled and the color theme has a corresponding styling rule defined, different colors and styles can be seen.

Semantic highlighting can change colors based on:

* The resolved type of a symbol: namespace, variable, property, variable, class, interface, typeParameter.
* Whether the variable/property is read-only (const) or modifiable.
* Whether the variable/property type is callable (a function type) or not.

## Next steps

Read on to find out about:

* [Refactor TypeScript](/docs/typescript/typescript-refactoring.md) - Learn about the useful refactorings available for TypeScript.
* [Debugging TypeScript](/docs/typescript/typescript-debugging.md) - Configure the debugger for your TypeScript project.
