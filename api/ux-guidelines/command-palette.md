---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for the command palette in a Visual Studio Code extension.
---

# Command Palette

The [Command Palette](/api/references/contribution-points#contributes.commands) is where all commands are found. It's important that your command names are labeled appropriately so users can easily find them.

**✔️ Do**

* Add keyboard shortcuts where appropriate
* Use clear names for commands
* Group commands together in the same category

❌ Don't

* Overwrite existing keyboard shortcuts
* Use emojis in command names

![Command Palette](images/guidelines/command-palette.png)

*This example has commands that are grouped together in the "Debug" category and have clear labels and only a few commands have shortcuts.*