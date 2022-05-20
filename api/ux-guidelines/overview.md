---
# DO NOT TOUCH — Managed by doc writer
ContentId: 5b4962ff-2dc9-4201-aa95-46edb5a575b6
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Guidelines that showcase best practices for creating Visual Studio Code extensions.
---

# UX Guidelines

These guidelines cover the best practices for creating Visual Studio Code extensions that extend the core editor's user experience and interface. In these guidelines, you can expect to find:
- An outline of VS Code's overall UI architecture and elements
- Recommandations and examples of UI contributed by an extension
- Alternative approaches to specific UX scenarios

## Architecture

The main building blocks of the VS Code UI are as follows:

[![Overview of Visual Studio Code containers elements](images/examples/architecture-groups.png)](/assets/api/ux-guidelines/examples/architecture-groups.png)

### Activity Bar

The Activity Bar serves as a core navigation surface in VS Code. Extensions can contribute items to the Activity Bar that open a View Container in the Primary Sidebar. View Containers can contain one or more views contributed by an extension.

[![Overview of the Activity Bar element](images/examples/...)](/images/examples/...)

### Primary Sidebar

The Primary Sidebar renders View Containers which in turn render Views. A concrete example is the Explorer--it contains multiple views like the Open Editors view, one or more Folder views, the Outline view, and the Timeline view.

[![Overview of the Primary Sidebar element](images/examples/...)](/images/examples/...)

### Secondary Sidebar

The Secondary Sidebar can be used as an alternate location to display views. VS Code users can drag views like the Terminal or the Problems view to the Secondary Sidebar to customize their layout to best suit their needs.

[![Overview of the Secondary Sidebar element](images/examples/...)](/images/examples/...)

### Editor

The Editor area contains one or more Editor Groups. Extensions can contribute Custom Editors or Webviews to open in the Editor. They can also contribute Editor Actions to expose new icon buttons in the Editor Toolbar.

[![Overview of the Editor element](images/examples/...)](/images/examples/...)

### Panel

The Panel is another surface to render Views. By default, views like the Terminal, Problems, and Output can be viewed in a single tab at a time. Users can also drag views into a split layout much like they can do in the Editor.

[![Overview of the Panel element](images/examples/...)](/images/examples/...)

### Status Bar

The Status Bar contains two main groups of Status Bar Items. On the left, items are scoped to the entire Workspace. On the right, items are scoped to the current file.

[![Overview of the Status Bar element](images/examples/...)](/images/examples/...)


## UI Elements

### Command Palette

Extensions can contribute Commands that appears in the Command Palette to quickly execute some functionality.

### Quick Pick

Quick Picks capture a user's input in several different ways. They can ask for a single selection, multiple selections, or even freeform text input. For more complex scenarios, quick picks can even feature multiple steps.

### Notifications

Notifications are used to communicate ephemeral information, warning, and error messages to users. They can also be used to indicate progress.

### Views

Views are a fundamental building block of VS Code's UI that can be configured to display tree views, webviews, and welcome views.

### Webviews

Webviews can be used to display custom content and functionality for use cases that go beyond VS Code's API.


### Status Bar Items

Status Bar Items are contributed to the Status Bar to communicate some state or messaging in a unintrusive location.

### Context Menu

In contrast to the Command Palette's consistent location, Context Menus give users the ability to perform actions or configure something from a specific location.

### Editor Actions

Extensions can contribute icons to the Editor Toolbar to perform actions scoped to the current editor.

### Walkthroughs

Walkthroughs provide a consistent experience for onboarding users to an extension via a multi-step checklist featuring rich content.

## Other Concepts

### Progress

Extensions can communicate that some operation is in progress by using a progress notification or as a Status Bar Item.

### Themes and Icons

Color, Product Icon, and File Icon themes all enable users to customize the look and feel of VS Code.