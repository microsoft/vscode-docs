---
# DO NOT TOUCH — Managed by doc writer
ContentId: fdd5476c-13e2-4f78-9dd3-0157eed36a29
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: UX guidelines for using context menus in a Visual Studio Code extension.
---

# Context Menus

[Menu items](/api/references/contribution-points#contributes.menus) appear in views, actions, and right-click menus. It's important that the grouping of menus remain consistent. If your extension has actions that relate to files, place your actions in the File Explorer context menu (when appropriate). If an extension has actions for certain file types, only display it for those items.

**✔️ Do**

* Show actions when contextually appropriate
* Group similar actions together
* Place large groups of actions into a submenu

❌ Don't

* Show actions for every file without context

![Context Menu](images/examples/context-menu.png)

*This example places a **Copy GitHub Permalink** next to the other copy commands. This action only appears on files that are from a GitHub repository.*

## Links

* [Context Menu API reference](/api/references/contribution-points#contributes.menus)
