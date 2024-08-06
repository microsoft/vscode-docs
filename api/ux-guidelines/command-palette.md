---
# DO NOT TOUCH — Managed by doc writer
ContentId: bf0d9a5e-897b-450a-adf4-3c8ca9b8e9de
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the Command Palette in a Visual Studio Code extension.
---

# Command Palette

The [Command Palette](/api/references/contribution-points#contributes.commands) is where all Commands are found. It's important that your command names are labeled appropriately so users can easily find them.

**✔️ Do**

* Add keyboard shortcuts where appropriate
* Use clear names for commands
* Group commands together in the same category

❌ Don't

* Overwrite existing keyboard shortcuts
* Use emojis in command names

![Command Palette](images/examples/command-palette.png)

*This example features commands each displaying a clear `category` prefix, for example "GitHub Issues".*

## Links

* [Commands API reference](/api/references/contribution-points#contributes.commands)
* [Commands extension guide](/api/extension-guides/command)
* [Hello World extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample)
