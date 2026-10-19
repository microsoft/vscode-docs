# VS Code Doc AI Assistant

This embedded extension provides authoring support for the VS Code documentation repository. It also contributes the language model tools used to generate release notes.

## Markdown authoring features

In Markdown files, the extension provides:

* Completions for feature IDs in `` `feature(<id>)` `` markers and `FeatureStatus` frontmatter.
* Completions for reusable paths in `{% data variables.<group>.<name> %}` directives.
* Hover details that show a feature's lifecycle state or a variable's resolved value.
* Diagnostics for unknown references and incomplete syntax.
* Quick fixes for likely reference typos and missing closing delimiters.

Feature completions come from `build/feature-lifecycle.json`. Variable completions come from `.yml` and `.yaml` files under `data/variables`.

Diagnostics run for Markdown files under `docs`, `api`, `remote`, `release-notes`, and `blogs`. Completions and hover information are available in any Markdown file in the repository.

Registry files are watched for changes. If a registry is missing or invalid, the extension reports the error in the **VS Code Doc Writer** output channel and in open published Markdown files.

## Development

1. Open `.vscode/extensions/doc-assistant` as a folder in VS Code.
2. Run `npm install`.
3. Press `F5` to compile the extension and open an Extension Development Host.

Run the available checks from the extension folder:

```console
npm run compile
npm run lint
npm test
```
