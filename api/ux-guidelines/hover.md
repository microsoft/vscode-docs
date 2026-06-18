---
# DO NOT TOUCH — Managed by doc writer
ContentId: 4b6d9e2a-8c3f-4a1e-b5d7-9f2e1c8a0b3d
DateApproved: 3/11/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for hovers used in a Visual Studio Code extension.
---

# Hovers

Hovers display rich, contextual information when a user moves their 
cursor over a UI element. Extensions can contribute hovers to the 
editor, status bar items, tree views, and other surfaces.

![Example of a hover showing symbol documentation](images/examples/hover-example.png)

## When to use

Use hovers to:

- Provide additional context that doesn't need to always be visible
- Show documentation, type signatures, or diagnostic details
- Offer quick actions without requiring the user to open a separate panel

## Anatomy

A hover is composed of:

- **Content** — Markdown-rendered text, code blocks, or links
- **Range** — The source range in the editor that triggered the hover
- **Position** — Where the hover is displayed relative to the trigger

## Best practices

**Do**

- Keep content concise and scannable
- Use Markdown formatting for code and emphasis
- Return `null` or `undefined` if your extension has nothing to show — 
  this allows other providers to contribute hovers
- Support cancellation tokens to avoid expensive computation when the 
  user moves away quickly

**Don't**

- Show redundant information already visible inline
- Use hovers for actions that modify state — use CodeLens or commands instead
- Return large walls of unstyled text

## Hover delay and dismissal

VS Code controls hover timing. Extensions do not need to implement 
their own delay logic. Hovers dismiss automatically when:

- The cursor moves outside the hover range
- The user presses `Escape`
- The editor loses focus

## Accessibility

Hovers are accessible via keyboard. Users can trigger and navigate 
hover content using `kb(editor.action.showHover)`. Ensure all 
information in the hover is also available through other accessible 
means such as diagnostics or the Problems panel.

## API reference

Use the following VS Code APIs to contribute hovers:

- [`vscode.HoverProvider`](https://code.visualstudio.com/api/references/vscode-api#HoverProvider)
- [`vscode.languages.registerHoverProvider`](https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider)
- [`vscode.Hover`](https://code.visualstudio.com/api/references/vscode-api#Hover)

## Links

- [Hover Provider Example](https://github.com/microsoft/vscode-extension-samples/tree/main/hover-sample)
- [VS Code API — Hover](https://code.visualstudio.com/api/references/vscode-api#Hover)
