# Migrate from TSLint to ESLint

TSLint has been the recommended linter for the past but now TSLint is deprecated and ESLint is taking over its duties. This page is to help you migrate from TSLint to ESLint.

## ESLint: Installation

You need to install ESLint. But because TypeScript isn't native to ESLint, you also need to install eslint-typescript-support:

```
> npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

This command above adds ESLint, adds a parser that makes ESLint understand TypeScript, and adds some TypeScript-specific rules.

Now, to make the actual migration simpler install the [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config)-utility. That tool will take your TSLint configuration and create the "closest" ESLint configuration from it.

```
> npm install -g tslint-to-eslint-config
> npx tslint-to-eslint-config
```

The first line installs the utility, the second runs the migration - for further options check its [usage guide](https://github.com/typescript-eslint/tslint-to-eslint-config#usage).

There should now be a new `.eslintrc.js`-file, a log-file (`tslint-to-eslint-config.log`), and likely there are changes to other files, like `.vscode/settings.json`. Carefully, review the changes, especially those that have been made to existing files, and check the log-file.

## ESLint: Configure

The `.eslintrc.js`-file is usually sufficient to get started but it's likely that the `parserOptions.project`-property is set to your `tsconfig.json`-file. That means that ESLint rules can use semantic information, e.g. is this variable a string or a number-array? That enables some powerful rules but means that ESLint takes much longer to compute.  The default rules for extensions do not require semantic information and unless you have added rules that do, we recommand to remove the `parserOptions.project`-property.

## ESLint: Run

You are now ready to run ESLint, but before that we recommend to disable TSLint. For that, open the extension-viewlet and select "Disable" in the context menu of the TSLint-extension.

It is time to lint! Use this command: `eslint -c .eslintrc.js --ext .ts <mySrcFolder>` (notice the `--ext .ts` option which tells ESLint to look at TypeScript files). We recommend to put the command in the `scripts`-section of your `package.json`-file, like so:

```json
"lint": "eslint -c .eslintrc.js --ext .ts <mySrcFolder>"
```

To integrate ESLint with VS  Code do the following:

* Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)-extension: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Create a task via "F1 > Configure Task > npm" and then in the `tasks.json` file configure the problem matcher to be `$eslint-stylish`

*Hint:* ESLint is sometimes "more correct" in how it does things and you'll sometimes find warnings that you didn't have before, e.g missing semicolons. Try the `--fix`-option to let ESLint clean-up things up for you.

**TSLint: Removal**

Congrats - you should now be having a working ESLint setup and it's time to clean up. You can remove the `tslint-to-eslint-config`-utility as that was only used for the migration and not for subsequent runs. The removal of TSLint depends on your project, but usually it is this:

- update `vscode/extensions.json` to recommend the ESLint-extension and not TSLint anymore:
```json
"recommendations": [
  "dbaeumer.vscode-eslint"
]
```
- remove the `tslint.json`-file
- remove the dependency on `tslint` in the `package.json`-file
- uninstall tslint with `npm uninstall tslint`
