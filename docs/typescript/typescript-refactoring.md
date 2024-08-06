---
Order: 4
Area: typescript
TOCTitle: Refactoring
ContentId: ff7a9f28-26b2-4ac6-8c16-1a16182bb6ca
PageTitle: TypeScript refactoring with Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Learn about TypeScript refactorings supported by Visual Studio Code.
---
# Refactoring TypeScript

[Source code refactoring](https://en.wikipedia.org/wiki/Code_refactoring) can improve the quality and maintainability of your project by restructuring your code while not modifying the runtime behavior. Visual Studio Code supports refactoring operations (refactorings) such as [Extract Method](https://refactoring.com/catalog/extractMethod.html) and [Extract Variable](https://refactoring.com/catalog/extractVariable.html) to improve your code base from within your editor.

Visual Studio Code has built-in support for TypeScript refactoring through the [TypeScript](https://www.typescriptlang.org/) language service and in this topic we'll demonstrate refactoring support with the TypeScript language service.

## Rename

One of the simplest refactorings is to rename a method or variable. Press `kb(editor.action.rename)` to rename the symbol under the cursor across your TypeScript project:

![Renaming a method](images/refactoring/rename.png)

## Refactoring

To see the available TypeScript refactorings, put your cursor on a region of your source code and either right-click to bring up the editor context menu and select **Refactor** or press `kb(editor.action.refactor)` directly.

![TypeScript refactoring](images/refactoring/refactorings.png)

See [Refactorings](/docs/editor/refactoring.md) for more information about refactorings and how you can configure keyboard shortcuts for individual refactorings.

Available TypeScript refactorings include:

* **Extract to method or function** - Extract the selected statements or expressions to either a new method or a new function in the file.

   ![Triggering the extract method refactoring on a selection](images/refactoring/refactor-extract-function.gif)

   After selecting the **Extract to method** or **Extract to function** refactoring, enter the name of the extracted method/function.

* **Extract to constant** - Extract the selected expression to a new constant in the file.

   ![Extracting a constant from a selection](images/refactoring/refactor-extract-constant.gif)

* **Extract type to interface or type alias** - Extract the selected complex type to either an interface or a type alias.

   ![Extract an inline type to an interface](images/refactoring/refactor-extract-interface.gif)

* **Move to new file** - Move one or more classes, functions, constants, or interfaces in the top-level scope of the file to a new file. The new file's name is inferred from the selected symbol's name.

   ![Moving a class to a new file](images/refactoring/refactor-move-file.gif)

* **Convert between named imports and namespace imports** - Convert between named imports (`import { Name } from './foo'`) and namespace imports (`import * as foo from './foo'`).

   ![Converting a named import to a namespace import](images/refactoring/refactor-convert-import.gif)

* **Convert between default export and named export** - Convert from using a `export default` and having a named export (`export const Foo = ...`).

* **Convert parameters to destructured object** - Rewrite a function that takes a long list of arguments to take a single arguments object.

* **Generate get and set accessors** - Encapsulate a selected class property by generating a getter and setter for it.

   ![Generating getters and setters from class property](images/refactoring/refactor-generate-get-set.gif)

* **Infer function return types** - Adds explicit return type annotations to functions.

    ![The Infer function return type refactoring in action](images/refactoring/ts-infer-return.gif)

* **Add/remove braces from arrow function** - Converts single line arrow function to multiline and back.

## Quick Fixes

Quick Fixes are suggested edits that address simple coding errors. Example Quick Fixes include:

* Adding a missing `this` to a member access.
* Fixing a misspelled property name.
* Removing unreachable code or unused imports
* Declaring

When you move your cursor on to a TypeScript error, VS Code shows a light bulb that indicates that Quick Fixes are available. Click the light bulb or press `kb(editor.action.quickFix)` to show a list of available Quick Fixes and [refactorings](#refactoring).

Additionally, **Code Action Widget: Include Nearby Quick Fixes** (`editor.codeActionWidget.includeNearbyQuickFixes`) is a setting that is enabled on default, which will activate the nearest Quick Fix in a line from `kb(editor.action.quickFix)` (command ID `editor.action.quickFix`), no matter where your cursor is in that line.

The command highlights the source code that will be refactored or fixed with Quick Fixes. Normal Code Actions and non-fix refactorings can still be activated at the cursor location.

## Unused variables and unreachable code

Unused TypeScript code, such as the `else` block of an `if` statement that is always true or an unreferenced import, is faded out in the editor:

![Unreachable source code faded out](images/refactoring/unreachable.png)

You can quickly remove this unused code by placing the cursor on it and triggering the Quick Fix command (`kb(editor.action.quickFix)`) or clicking on the light bulb.

To disable fading out of unused code, set `"editor.showUnused"` to `false`. You can also disable fading of unused code only in TypeScript by setting:

```json
"[typescript]": {
    "editor.showUnused":  false
},
"[typescriptreact]": {
    "editor.showUnused":  false
},
```

## Organize Imports

The **Organize Imports** source code action sorts the imports in a TypeScript file and removes unused imports:

<video src="images/refactoring/organize-imports.mp4" placeholder="images/refactoring/organize-imports-placeholder.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

You can run **Organize Imports** from the **Source Action** context menu or with the `kb(editor.action.organizeImports)` keyboard shortcut.

Organize imports can also be done automatically when you save a TypeScript file by setting:

```json
"editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
}
```

## Update imports on file move

When you move or rename a file that is imported by other files in your TypeScript project, VS Code can automatically update all import paths that reference the moved file.

The `typescript.updateImportsOnFileMove.enabled` setting controls this behavior. Valid settings values are:

* `"prompt"` - The default. Asks if paths should be updated for each file move.
* `"always"` - Always automatically update paths.
* `"never"` - Do not update paths automatically and do not prompt.

## Code Actions on Save

The `editor.codeActionsOnSave` setting lets you configure a set of Code Actions that are run when a file is saved. For example, you can enable Organize Imports on save by setting:

```json
// On explicit save, run fixAll source action. On auto save (window or focus change), run organizeImports source action.
"editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "always",
}
```

As of today, the following enums are supported:
* `explicit` (default): Triggers Code Actions when explicitly saved. Same as `true`.
* `always`: Triggers Code Actions when explicitly saved and on Auto Saves from window or focus changes.
* `never`: Never triggers Code Actions on save. Same as `false`.

You can also set `editor.codeActionsOnSave` to an array of Code Actions to execute in order.

Here are some source actions:

* `"organizeImports"` -  Enables organize imports on save.
* `"fixAll"` - Auto Fix on Save computes all possible fixes in one round (for all providers including ESLint).
* `"fixAll.eslint"` -  Auto Fix only for ESLint.
* `"addMissingImports"` - Adds all missing imports on save.

See [TypeScript](/docs/typescript/typescript-tutorial.md) for more information.

## Code suggestions

VS Code automatically suggests some common code simplifications such as converting a chain of `.then` calls on a promise to use `async` and `await`

<video src="images/refactoring/code-suggestions-convert-async.mp4" placeholder="images/refactoring/code-suggestions-convert-async-placeholder.png" autoplay loop controls muted>
    Sorry, your browser doesn't support HTML 5 video.
</video>

Set `"typescript.suggestionActions.enabled"` to `false` to disable suggestions.

## Next steps

Read on to find out about:

* [Editing TypeScript](/docs/typescript/typescript-editing.md) - Learn about VS Code editing features for TypeScript.
* [Debugging TypeScript](/docs/typescript/typescript-debugging.md) - Configure the debugger for your TypeScript project.
