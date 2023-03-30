---
ContentId: f00c4913-58e3-4a61-aa42-e769c3430906
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to migrating extension projects from the TSLint linter to ESLint.
---
# Migrate from TSLint to ESLint

[TSLint](https://palantir.github.io/tslint/) has been the recommended linter in the past but now TSLint is deprecated and [ESLint](https://eslint.org/) is taking over its duties. This article will help you migrate from TSLint to ESLint.

## ESLint: Installation

You need to install ESLint. ESLint doesn't natively support TypeScript, so you will also need to install eslint-typescript-support:

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

or if you're using yarn as your package manager:

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

The command above adds ESLint, adds a parser that makes ESLint understand TypeScript, and adds some TypeScript-specific rules.

Now, to make the actual migration simpler, run the [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config) utility. This tool will take your TSLint configuration and create the "closest" ESLint configuration from it.

```bash
npx tslint-to-eslint-config
```

This command [downloads and executes](https://www.npmjs.com/package/npx) the utility to perform the migration. For further options, check the utility's [usage guide](https://github.com/typescript-eslint/tslint-to-eslint-config#usage).

There should now be a new `.eslintrc.js` file, a log file (`tslint-to-eslint-config.log`), and likely changes to other files, like `.vscode/settings.json`. Carefully review the changes, especially those made to existing files, and check the log file.

## ESLint: Configure

The `.eslintrc.js` file is usually sufficient to get started but it's likely that the `parserOptions.project` property is still set to your `tsconfig.json` file. That means that ESLint rules can use semantic information, for example, is this variable a string or a number-array? This configuration enables some powerful rules but means that ESLint takes much longer to compute. The default rules for extensions do not require semantic information and unless you have added rules that do, we recommend you remove the `parserOptions.project` property.

## ESLint: Run

You are now ready to run ESLint, but before doing that, we recommend you disable TSLint. To do so, open the Extensions view and select **Disable** in the context menu of the TSLint extension.

It is time to lint! Use this command: `eslint -c .eslintrc.js --ext .ts <mySrcFolder>` (notice the `--ext .ts` option which tells ESLint to look at TypeScript files). We recommend putting the command in the `scripts` section of your `package.json`-file, like so:

```json
"lint": "eslint -c .eslintrc.js --ext .ts <mySrcFolder>"
```

To integrate ESLint with Visual Studio Code, do the following:

* Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.
* Create a task via the **Tasks: Configure Task** command and select **npm: lint**.
* In the resulting `tasks.json` file, configure the problem matcher to be `$eslint-stylish`.

**Hint**: ESLint is sometimes "more correct" in how it does things and you may see warnings that you didn't have before, for example calling out missing semicolons. Try the `--fix` option to let ESLint clean up things up for you.

## TSLint: Removal

Congratulations. You should now have a working ESLint setup and it's time to clean up.

The removal of TSLint depends on your project, but usually these are the steps:

* Update `.vscode/extensions.json` to recommend the ESLint extension and not TSLint anymore:

  ```json
  "recommendations": [
    "dbaeumer.vscode-eslint"
  ]
  ```

* Remove the `tslint.json` file.
* Remove the dependency on `tslint` in the `package.json` file.
* Uninstall TSLint with `npm uninstall tslint`.
