# Walkthroughs

Walkthroughs provide a consistent experience for onboarding users to an extension via a multi-step checklist featuring rich content.

**✔️ Do**

- Use helpful images to add context to the current Walkthrough step.
- Make sure images work across different color themes. Use SVGs with VS Code's [Theme Colors](https://code.visualstudio.com/api/references/theme-color) if possible.
- Provide actions (e.g. View all Commands) for each step. Use verbs where possible.

❌ Don't

- Add an excessive number of steps in a single walkthrough
- Add multiple walkthroughs unless absolutely necessary

![Example of walkthrough](images/examples/walkthrough.png)

## Links
- [Walkthroughs Contribution Point](https://code.visualstudio.com/api/references/contribution-points#contributes.walkthroughs)
- [SVG with Theme Color CSS Variable Example](https://github.com/microsoft/vscode/blob/a28eab68734e629c61590fae8c4b231c91f0eaaa/src/vs/workbench/contrib/welcomeGettingStarted/common/media/commandPalette.svg?short_path=52f2d6f#L11)