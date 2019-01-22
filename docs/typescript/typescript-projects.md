---
Order: 2
Area: typescript
TOCTitle: Projects
ContentId: 6c3b1c4e-c8c8-4c0d-99a1-5897e8dd4747
PageTitle: TypeScript projects with Visual Studio Code
DateApproved: 12/12/2018
MetaDescription: Learn about TypeScript project with Visual Studio Code.
MetaSocialImage: images/typescript-tutorial/Languages_typescript.png
---
# TypeScript projects

## TypeScript files and projects

VS Code's TypeScript support can operate in two different modes:

* **File Scope**: In this mode, TypeScript files opened in Visual Studio Code are treated as independent units. As long as a file `a.ts` doesn't reference a file `b.ts` explicitly (either using [/// reference directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) or external modules), there is no common project context between the two files.

* **Explicit Project**: A TypeScript project is defined via a `tsconfig.json` file. The presence of such a file in a directory indicates that the directory is the root of a TypeScript project. The file itself lists the files belonging to the project as well as compiler options. Details about the `tsconfig.json` file can be found [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

>**Tip:** We recommend that you use explicit projects over file scope projects. Since explicit projects list the files belonging to a project language, features like **Peek References** `kb(editor.action.referenceSearch.trigger)` consider the project scope and not the file scope only.

## tsconfig.json

Typically the first step in any new TypeScript project is to add in a `tsconfig.json` file. This defines the TypeScript [project settings](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) such as the compiler options and the files that should be included. To do this, open up the folder where you want to store your source and add in a new file named `tsconfig.json`. Once in this file, IntelliSense (`kb(editor.action.triggerSuggest)`) will help you along the way.

![jsconfig.json IntelliSense](images/typescript/jsconfigintellisense.png)

A simple `tsconfig.json` looks like this for ES5, **CommonJS** [modules](http://www.commonjs.org/specs/modules/1.0) and source maps:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true
    }
}
```

Now when you create a `.ts` file as part of the project we will offer up rich editing experiences and syntax validation.

## JavaScript source map support

TypeScript debugging supports JavaScript source maps. Enable this by setting the `sourceMaps` attribute to `true` in the project's launch configuration file `launch.json`. In addition, you can specify a TypeScript file with the `program` attribute.

To generate source maps for your TypeScript files, compile with the `--sourcemap` option or set the `sourceMap` property in the `tsconfig.json` file to `true`.

In-lined source maps (a source map where the content is stored as a data URL instead of a separate file) are also supported, although in-lined source is not yet supported.

## Setting a different outFiles for generated files

If generated (transpiled) JavaScript files do not live next to their source, you can help the VS Code debugger locate them by setting the `outFiles` attribute in the launch configuration. Whenever you set a breakpoint in the original source, VS Code tries to find the generated source by searching the files specified by glob patterns in `outFiles`.

## Mixed TypeScript and JavaScript projects

It is now possible to have mixed TypeScript and JavaScript projects. To enable JavaScript inside a TypeScript project, you can set the `allowJs` property to `true` in the `tsconfig.json`.

>**Tip:** The `tsc` compiler does not detect the presence of a `jsconfig.json` file automatically. Use the `–p` argument to make `tsc` use your `jsconfig.json` file, e.g. `tsc -p jsconfig.json`.


## Next steps

Read on to find out about:

* [TBD JavaScript](/docs/languages/javascript.md) - we have several JavaScript specific features in VS Code

## Common questions

### TBD How do I resolve a TypeScript "Cannot compile external module" error?

