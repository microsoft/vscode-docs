---
Order: 1
Area: typescript
TOCTitle: Tutorial
ContentId: cb4f3742-733c-49d8-96db-d4bf8403bf64
PageTitle: TypeScript tutorial with Visual Studio Code
DateApproved: 12/12/2018
MetaDescription: TypeScript tutorial with Visual Studio Code.
MetaSocialImage: images/typescript-tutorial/Languages_typescript.png
---
# Editing TypeScript

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components. The TypeScript language specification can be found [here](https://github.com/Microsoft/TypeScript/tree/master/doc).

![TypeScript language within VS Code](images/typescript/typescript_hero.png)

## Installing the TypeScript compiler

Visual Studio Code includes TypeScript language support but does not include the TypeScript compiler, `tsc`. You will need to install the TypeScript compiler either globally or in your workspace to transpile TypeScript source code to JavaScript (`tsc HelloWorld.ts`).

The easiest way to install TypeScript is through npm, the [Node.js Package Manager](https://www.npmjs.com/). If you have npm installed, you can install TypeScript globally (`-g`) on your computer by:

```bash
npm install -g typescript
```

You can test your install by checking the version.

```bash
tsc --version
```

## Hello World

using terminal, default is powershell, link to topic

tsc .\helloworld.ts

if you have Node.js installed, you can do `node helloworld.js`

Doesn't look too different from `helloworld.ts`

## IntelliSense

syntax highlighting
smart completions
parameter help

## tsconfig.json

Typically the first step in any new TypeScript project is to add in a `tsconfig.json` file. This defines the TypeScript [project settings](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) such as the compiler options and the files that should be included. To do this, open up the folder where you want to store your source and add in a new file named `tsconfig.json`. Once in this file, IntelliSense (`kb(editor.action.triggerSuggest)`) will help you along the way.

![jsconfig.json IntelliSense](images/typescript/jsconfigintellisense.png)

A simple `tsconfig.json` looks like this to compile to ES5 and **CommonJS** [modules](http://www.commonjs.org/specs/modules/1.0).

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs"
    }
}
```

By default, TypeScript includes all the `.ts` files in the current folder and subfolders if the `files` attribute isn't included so we don't need to list `helloworld.ts` explicitly.

Now to build from the terminal, you can just type `tsc` and the TypeScript compiler knows to look at your `tsconfig.json` for project settings and compiler options.

Having the generated JavaScript file in the same folder at the TypeScript source will quickly get cluttered on larger projects, so you can specify the output directory for the compiler with the `outDir` attribute.

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "outDir": "out"
    }
}
```

Delete `helloworld.js` and run `tsc` again.

## Error checking

wrong type [ts] lets you know if came from the TypeScript language service
show problems pane
same error you would get from the command line

## Quick Fixes

"allowUnreachableCode": false and show Quick Fix

See https://github.com/Microsoft/TypeScript/blob/master/src/tsconfig-base.json and vscode projects

## Debugging

Open helloworld.ts and just F5

need sourcemaps

## Compiling skip this?

build from VS Code Terminal run task

also watch

## Next steps

OK, read on to find out about:

* [TBD JavaScript](/docs/languages/javascript.md) - we have several JavaScript specific features in VS Code

## Common questions

### TBD How do I resolve a TypeScript "Cannot compile external module" error?

