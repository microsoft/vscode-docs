---
# DO NOT TOUCH — Managed by doc writer
ContentId: 5b4962ff-2dc9-4201-aa95-46edb5a575b6
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Guidelines that showcase best practices for creating Visual Studio Code extensions.
---

# UX Guidelines

These guidelines cover the best practices for creating extensions that seamlessly integrate with VS Code's native interface and patterns. In these guidelines, you can expect to find:
- An outline of VS Code's overall UI architecture and elements
- Recommandations and examples for UI contributed by an extension
- Links to relevant guides and samples

Before diving into the details, it's important to understand how the various architectural UI parts of VS Code come together and how and where your extension could contribute.

## Architecture

The VS Code interface can roughly be divided into two main concepts: **containers** and **items**:

### Containers

Generally speaking, containers can be considered the larger sections of the VS Code interface that render one or more items. For example, the Sidebar functions as a container that can render one or more View items.

[![Overview of Visual Studio Code containers elements](images/examples/architecture-groups.png)](/assets/api/ux-guidelines/examples/architecture-groups.png)

#### Activity Bar

The Activity Bar serves as a core navigation surface in VS Code. Extensions can contribute items to the Activity Bar that render View Containers in the Primary Sidebar.

#### Primary Sidebar

The Primary Sidebar renders View Containers which in turn render Views. A concrete example is the Explorer--it is a View Container that contains multiple Views like the Open Editors view, the Outline view, and the Timeline view.

#### Secondary Sidebar

The Secondary Sidebar also functions as a View Container that can be used as an alternate location to display views. VS Code users can drag views like the Terminal or the Problems view to the Secondary Sidebar to customize their layout.

#### Editor

The Editor area contains one or more Editor Groups. Extensions can contribute Custom Editors or Webviews to open in the Editor area. They can also contribute Editor Actions to expose new icon buttons in the Editor Toolbar.

#### Panel

The Panel is another View Container. By default, views like the Terminal, Problems, and Output can be viewed in a single tab at a time. Users can also drag views into a split layout much like they can do in the Editor.

#### Status Bar

The Status Bar contains two groups of Status Bar Items.

### Items

Extensions can add items to the various containers listed above.

[![Overview of Visual Studio Code containers elements](images/examples/architecture-sections.png)](/assets/api/ux-guidelines/examples/architecture-sections.png)

### View

Views can be contributed in the form of a Tree View, Webview View, or a Welcome View and and can be dragged around to other areas of the interface.

### View Toolbar

Extensions can expose View-specific actions that appear as buttons on the View's toolbar.

### Sidebar Toolbar

Actions scoped to an entire View Container can also be exposed in the Sidebar Toolbar.

### Editor Toolbar

Extensions can contribution actions scoped to an editor directly in the Editor Toolbar.

### Panel Toolbar

The Panel Toolbar can expose options scoped to the currently selected View. For example the Terminal view exposes actions to add a new terminal, split the view layout, and more. Switching to the Problems view exposes a different set of actions.

### Status Bar Item

On the left, items are scoped to the entire Workspace. On the right, items are scoped to the current file.

## UI Elements

### Command Palette

Extensions can contribute Commands that appears in the Command Palette to quickly execute some functionality.

[![Overview of the Command Palette element](images/examples/command-palette.png)](images/examples/command-palette.png)

### Quick Pick

Quick Picks capture a user's input in several different ways. They can ask for a single selection, multiple selections, or even freeform text input.

![Overview of the Quick Pick element](images/examples/quick-pick.png)

### Notifications

Notifications are used to communicate information, warning, and error messages to users. They can also be used to indicate progress.

![Overview of the Notification element](images/examples/notification.png)

### Webviews

Webviews can be used to display custom content and functionality for use cases that go beyond VS Code's API.

![Overview of the Webview element](images/examples/webview.png)

### Context Menu

In contrast to the Command Palette's consistent location, Context Menus give users the ability to perform actions or configure something from a specific location.

![Overview of the Context Menu element](images/examples/context-menu.png)

### Walkthroughs

Walkthroughs provide a consistent experience for onboarding users to an extension via a multi-step checklist featuring rich content.

![Overview of the Walkthrough API](images/examples/walkthrough.png)

