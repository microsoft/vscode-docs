---
# DO NOT TOUCH — Managed by doc writer
ContentId: 5b4962ff-2dc9-4201-aa95-46edb5a575b6
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Guidelines that showcase best practices for creating Visual Studio Code extensions.
---

# UX Guidelines

These guidelines cover the best practices for creating Visual Studio Code extensions that align with and build upon the core editor's user experience and interface. In these guidelines, you can expect to find:
- Recommandations for UI contributed by an extension
- Visual examples
- Alternative approaches to specific UX scenarios

## Architecture

The VS Code UI has two types of elements: containers and items. Containers refer to the outer layers, which include:

[![Overview of Visual Studio Code containers elements](images/examples/architecture-groups.png)](/assets/api/ux-guidelines/examples/architecture-groups.png)

1. [Activity Bar](/api/ux-guidelines/views#view-containers)
2. Sidebar
3. Editor
4. Panel
5. [Status Bar](/api/ux-guidelines/status-bar)

Items are placed inside of various containers and include:

[![Overview of Visual Studio Code item elements](images/examples/architecture-sections.png)](/assets/api/ux-guidelines/examples/architecture-sections.png)

6. View Container
7. [View](/api/ux-guidelines/views)
8. View Toolbar
9. Sidebar Toolbar
10. [Editor Toolbar](/api/ux-guidelines/editor-actions)
11. View Container
12. Panel Toolbar
13. View
14. [Status Bar Item](/api/ux-guidelines/status-bar)
