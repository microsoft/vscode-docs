---
# DO NOT TOUCH — Managed by doc writer
ContentId: 5b4962ff-2dc9-4201-aa95-46edb5a575b6
DateApproved: 5/5/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Guidelines that showcase best practices for creating Visual Studio Code extensions.
---

# UX Guidelines

These guidelines cover the best practices for creating extensions that seamlessly integrate with the VS Code's native user experience and interface. In these guidelines, you can expect to find:
- An outline of VS Code's overall UI architecture and elements
- Recommandations and examples for UI contributed by an extension
- Alternative approaches to specific UX scenarios

## Architecture

The main building blocks of the VS Code UI are as follows:

[![Overview of Visual Studio Code containers elements](images/examples/architecture-groups.png)](/assets/api/ux-guidelines/examples/architecture-groups.png)

### Activity Bar

The Activity Bar serves as a core navigation surface in VS Code. Extensions can contribute items to the Activity Bar that act as View Containers in the Primary Sidebar.

[![Overview of the Activity Bar element](images/examples/...)](/images/examples/...)

### Primary Sidebar

The Primary Sidebar acts as View Container which in turn render Views. A concrete example is the Explorer--it is a View Container that contains multiple views like the Open Editors view, the Outline view, and the Timeline view.

[![Overview of the Primary Sidebar element](images/examples/...)](/images/examples/...)

### Secondary Sidebar

The Secondary Sidebar also acts as a View Container that can be used as an alternate location to display views. VS Code users can drag views like the Terminal or the Problems view to the Secondary Sidebar to customize their layout.

[![Overview of the Secondary Sidebar element](images/examples/...)](/images/examples/...)

### Editor

The Editor area contains one or more Editor Groups. Extensions can contribute Custom Editors or Webviews to open in the Editor. They can also contribute Editor Actions to expose new icon buttons in the Editor Toolbar.

[![Overview of the Editor element](images/examples/...)](/images/examples/...)

### Panel

The Panel is another View Container. By default, views like the Terminal, Problems, and Output can be viewed in a single tab at a time. Users can also drag views into a split layout much like they can do in the Editor.

[![Overview of the Panel element](images/examples/...)](/images/examples/...)

### Status Bar

The Status Bar contains two main groups of Status Bar Items. On the left, items are scoped to the entire Workspace. On the right, items are scoped to the current file.

[![Overview of the Status Bar element](images/examples/...)](/images/examples/...)


## UI Elements

### Command Palette

Extensions can contribute Commands that appears in the Command Palette to quickly execute some functionality.

[![Overview of the Command Palette element](images/examples/...)](/images/examples/...)

### Quick Pick

Quick Picks capture a user's input in several different ways. They can ask for a single selection, multiple selections, or even freeform text input. For more complex scenarios, quick picks can even feature multiple steps.

[![Overview of the Quick Pick element](images/examples/...)](/images/examples/...)

### Notifications

Notifications are used to communicate ephemeral information, warning, and error messages to users. They can also be used to indicate progress.

[![Overview of the Notification element](images/examples/...)](/images/examples/...)


[![Overview of the View element](images/examples/...)](/images/examples/...)

### Webviews

Webviews can be used to display custom content and functionality for use cases that go beyond VS Code's API.

[![Overview of the Webview concept](images/examples/...)](/images/examples/...)

### Context Menu

In contrast to the Command Palette's consistent location, Context Menus give users the ability to perform actions or configure something from a specific location.

[![Overview of the Context Menu element](images/examples/...)](/images/examples/...)

### Walkthroughs

Walkthroughs provide a consistent experience for onboarding users to an extension via a multi-step checklist featuring rich content.

[![Overview of the Walkthrough concept](images/examples/...)](/images/examples/...)

## Other

### Progress

Extensions can communicate that some operation is in progress by using a progress notification or as a Status Bar Item.

[![Overview of the Progress concept](images/examples/...)](/images/examples/...)

### Themes and Icons

Color, Product Icon, and File Icon themes all enable users to customize the look and feel of VS Code.

[![Overview of the Color Theme and Icon Theme concepts](images/examples/...)](/images/examples/...)