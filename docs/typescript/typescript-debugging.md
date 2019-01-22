---
Order: 4
Area: typescript
TOCTitle: Debugging
ContentId: 19c60eb6-662b-444a-92f6-009642cc1e5b
PageTitle: TypeScript debugging with Visual Studio Code
DateApproved: 12/12/2018
MetaDescription: TypeScript debugging with Visual Studio Code.
MetaSocialImage: images/typescript-tutorial/Languages_typescript.png
---
# Debugging TypeScript

## JavaScript source map support

TBD This is now the launch.json default

TypeScript debugging supports JavaScript source maps. Enable this by setting the `sourceMaps` attribute to `true` in the project's launch configuration file `launch.json`. In addition, you can specify a TypeScript file with the `program` attribute.

To generate source maps for your TypeScript files, compile with the `--sourcemap` option or set the `sourceMap` property in the `tsconfig.json` file to `true`.

In-lined source maps (a source map where the content is stored as a data URL instead of a separate file) are also supported, although in-lined source is not yet supported.

## Client side debugging with Chrome debugger

React, Vue, Angular

Does React work?

## Debugging recipes

vscode-recipes
typescript site

## Next steps

OK, read on to find out about:

* [TBD JavaScript](/docs/languages/javascript.md) - we have several JavaScript specific features in VS Code

## Common questions

### TBD How do I resolve a TypeScript "Cannot compile external module" error?

