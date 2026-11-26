# Build and documentation tools

The `build` folder contains the tools used to preview, validate, and maintain the documentation.
Run the named npm scripts from the repository root; see [package.json](../package.json) for the available commands.

* `preview/`: Local site preview, sidebar generation, and page rendering helpers.
* `checks/`: Content, links, navigation, product references, and findings validation.
* `workflow/`: Documentation planning, drafting, and review helpers.
* `media/`: Attended capture, replay, media preparation, storyboards, and recipes.
* `release/`: Release preparation and keybinding maintenance.
* `assets/`: Image, video, and embed utilities.
* `lib/`: Helpers shared by multiple tools.
* `schemas/`: JSON schemas used by the tools.

Site data, including the sitemap, lifecycle registry, and `keybindings/`, remains at the root of `build`.
See [CONTRIBUTING.md](../CONTRIBUTING.md) and [DOCS-AGENT-WORKFLOW.md](../DOCS-AGENT-WORKFLOW.md) for the associated workflows.
