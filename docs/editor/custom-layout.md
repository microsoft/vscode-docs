---
Order: 22
Area: editor
TOCTitle: Custom Layout
ContentId: 71e2c9c1-fb19-469a-9620-877d4b08fb0d
PageTitle: Custom layout of Visual Studio Code
DateApproved: 8/3/2023
MetaDescription: Visual Studio Code custom user interface layout.
---
# Custom Layout

Visual Studio Code comes with a simple user interface and convenient default layout. At the same time, VS Code provides options and settings to let you customize the UI layout to suite your preferences and work style. In this topic, we'll highlight the various UI customizations so you can display the views, editors, and panels in the way that's most productive for you.

If you are new to VS Code, you may want to start with the [user interface overview](/docs/getstarted/userinterface.md) or take a look at [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) article.

This article starts by discussing the [Workbench](#workbench) customizations that let you rearrange UI elements such as the Side bars, views, and panels. Later in the article, we'll cover customization of the [Editor](#editor) region with editor groups, split editors, and editor tabs.

## Workbench

### Primary side bar

The default (Primary) side bar shows views such as the File Explorer, Search, and Source Control on the left of the workbench. If you'd prefer it on the right, you can:

* Right-click the Activity bar and select **Move Primary Side Bar Right**.
* Run **View: Toggle Primary Side Bar Position** to switch the Primary side bar right and left.
* Set the **Workbench > Side Bar: Location** setting (`workbench.sideBar.location`) to `right`.

### Secondary side bar

issue #6326 "Secondary Side Bar deserves better documentation"

By default, VS Code shows all views in the **Primary side bar** located to the left of the editor region. If you like another place to display views, you can open the **Secondary side bar** and drag and drop views into the side bar.

This can be useful if you'd like to see two views at the same time, for example, the File Explorer on the right and Source Control view on the right

![alt](https://) TBD

### Panel

The Panel region displays UI elements such as the Problems, Terminal, and Output panels and by default is located under the editor region.

### Move Panel commands

by default Panel region is below the editor

* **View: Move Panel Left** (`workbench.action.positionPanelLeft`)
* **View: Move Panel Right** (`workbench.action.positionPanelRight`)
* **View: Move Panel To Bottom** (`workbench.action.positionPanelBottom`)

You can configure these options in the menu under **View** > **Appearance** > **Panel Position**, Panel region context menu, or using the new **View: Move Panel...** commands.

![alt](https://) TBD context menu

### Panel alignment

issue #6239 "Add handling of the Terminal / Output pane under User Interface"

This option allows you to configure how far the bottom Panel spans across your window. There are four options:

* **Center** - This is the classic behavior. The panel spans the width of the editor area only.
* **Left** - The panel will span from the left edge of the window to the right edge of the editor area.
* **Right** - The panel will span from the right edge of the window to the left edge of the editor area.
* **Justify** - The panel will span the full width of the window.

Note that with all options, the Activity Bar is considered the edge of the window.

You can configure these options in the menu under **View** > **Appearance** > **Align Panel**, Panel region context menu, or using the new **Set Panel Alignment to...** commands.

![alt](https://) TBD context menu

### Maximize Panel size

to fill the editor area

![alt](https://) TBD show Panel region title bar button

**View: Toggle Maximized Panel** command

? **Note**: Mention that besides overall Panel region layout, individual Panels may have their own layout customization for example Terminal, link to Terminal basics (has Terminal tabs?)

### Customize Layout control

Title bar buttons

first show show/hide Primary side bar, Panel, Secondary side bar

Full drop down

extra options:

Full screen - link to userinterface.md
Zen mode - link to userinterface.md
Centered layout - centers the editor region

also available from the View > Appearance menu

general VS Code UI - hidden items still show up in drop downs/context menus

### Drag and drop views and panels

issue #4362 - specific to dragging and dropping panels to have a side-by-side view - assigned gregvanl

lots of updates in https://code.visualstudio.com/updates/v1_46#_flexible-layout

mention restore layout command
Context menu **Reset Location**
**Views: Reset View Locations**

bug with putting a view back into the Panel title bar

## Tool bars

TBD general description of tool bars

### Hide items in tool bars

issue #6584

reminder VS Code UI - hidden items still show up in drop downs/context menus

https://code.visualstudio.com/updates/v1_72#_hide-actions-from-tool-bars

Right-click on any action in a tool bar and select its hide command or any of the toggle commands. Hidden actions are moved to the `...` **More Actions** menu and can be invoked from there. To restore a menu, right-click the tool bar button area and select the **Reset Menu** command. To restore all menus, run **Reset All Menus** from the Command Palette (`kb(workbench.action.showCommands)`).

## Editor

TBD a lot of this is covered in userinterface.md (leave alone, refactor, add locked editor groups there?)

### Mimimap and breadcrumbs

From View > Appearance fourth section for the editor region

### Editor groups

split editor link to user interface

all the Move Editor Group Down/Up/Left/Right commands 1.25 release notes

Mention Grid commands in View > Editor Layout - documented in userinterface.md

TBD what is **Flip Layout**?  Shft+Alt+0 (not on macOS) toggle horizontal/vertical editor group layout

#### Split in group

issue #6313

fair point to also mention in https://code.visualstudio.com/docs/getstarted/userinterface#_side-by-side-editing
and

why is this less good than Split in group?

by default splitting an editor will create a new editor group

for nice side-by-side review and editing of same file

https://code.visualstudio.com/updates/v1_61#_split-an-editor-without-creating-a-new-group

Toggle Layout to go from vertical to horizontal split

There is a setting `workbench.editor.splitInGroupLayout` if you prefer the splitting to be either vertical or horizontal.

### Locked editor groups

issue #6312
issue #6568 - assigned Ben and Daniel

Locked editor groups - don't really understand

Need to have more than one editor group for locking to be an option

Lock via **More Actions...**

Select the Lock action to unlock

The commands related to editor group locking:

* `workbench.action.lockEditorGroup`
* `workbench.action.unlockEditorGroup`
* `workbench.action.toggleEditorGroupLock`

somehow related to terminal in editor area

https://code.visualstudio.com/docs/terminal/basics#_terminals-in-editor-area

### View > Editor layout

### Drag and drop editors

### editor tabs

#### preview editors

covered elsewhere

#### Hide tabs

#### Pinned tabs

https://code.visualstudio.com/updates/v1_46#_pin-tabs

## Next steps

Read on to find out about:

* [Visual Studio Code User Interface](/docs/getstarted/userinterface.md) - A quick orientation to VS Code.
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
