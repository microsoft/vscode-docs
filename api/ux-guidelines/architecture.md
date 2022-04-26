---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Description of the various parts of the Visual Studio Code interface.
---

# Architecture

The VS Code UI has two types of elements: containers and items. Containers refer to the outer layers, which include:

[![Overview of Visual Studio Code containers elements](images/examples/architecture-groups.png)](images/examples/architecture-groups.png)

1. [Activity Bar](#view-containers)
2. Sidebar
3. Editor
4. Panel
5. Status Bar

Items are placed inside of various containers and include:

[![Overview of Visual Studio Code item elements](images/examples/architecture-sections.png)](images/examples/architecture-sections.png)

6. View Container
7. [View](#views)
8. View Toolbar
9. Sidebar Toolbar
10. [Editor Toolbar](#editor-actions)
11. View Container
12. Panel Toolbar
13. View
14. [Status Bar Item](#status-bar)