---
# DO NOT TOUCH — Managed by doc writer
ContentId: e8e157c4-ac6e-4278-9994-953212a1bb88
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for walkthroughs in a Visual Studio Code extension.
---

# Walkthroughs

Walkthroughs provide a consistent experience for onboarding users to an extension via a multi-step checklist featuring rich content.

**✔️ Do**

- Use helpful images to add context to the current Walkthrough step.
- Make sure images work across different color themes. Use SVGs with VS Code's [Theme Colors](/api/references/theme-color) if possible. The [Visual Studio Code Color Mapper](https://www.figma.com/community/plugin/1218260433851630449) Figma plugin enables easy theming of SVGs.
- Provide actions (for example, View all Commands) for each step. Use verbs where possible.

❌ Don't

- Add an excessive number of steps in a single walkthrough
- Add multiple walkthroughs unless absolutely necessary

![Example of walkthrough](images/examples/walkthrough.png)

## Links

- [Walkthroughs contribution point](/api/references/contribution-points#contributes.walkthroughs)
- [SVG with Theme Color CSS variable example](https://github.com/microsoft/vscode/blob/a28eab68734e629c61590fae8c4b231c91f0eaaa/src/vs/workbench/contrib/welcomeGettingStarted/common/media/commandPalette.svg?short_path=52f2d6f#L11)
- [Visual Studio Code Color Mapper](https://www.figma.com/community/plugin/1218260433851630449)
