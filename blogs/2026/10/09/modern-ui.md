# Modernizing the VS Code UI

VS Code's interface has evolved since the [first preview in 2015](https://code.visualstudio.com/blogs/2016/04/14/vscode-1.0), with tabs, themes, and new ways to organize your work arriving over time. Because these changes affect a tool you use every day, we've learned to balance new capabilities with the familiar workflows and muscle memory that make the editor feel like yours.

The current modernization continues that approach. It began with the 2026 color themes, expanded through the Agents window, and is now shaping the editor itself. This post traces that journey and shows how your feedback is guiding what changes next.

## An interface that's always evolving

Some interface changes have been small refinements. Others have introduced new ways to organize your work. Even features that now feel like part of the original editor arrived gradually.

![VS Code in 2015, with the Activity Bar, a single editor title, and the blue status bar before editor tabs were introduced.](./vscode-ui-2015-themes.png)

*2015: The early editor, shown in a still from the [September 2015 color-theme demo](https://code.visualstudio.com/updates/v0_8_0#_additional-themes). The release expanded the choice of themes, giving you more control over how your editor looked.*

![VS Code in 2016, showing the Explorer, Open Editors list, and tabs across two editor groups.](./vscode-ui-2016-tabs.png)

*2016: [Editor tabs and the Open Editors view](https://code.visualstudio.com/updates/June_2016#_tabs) gave you a visible, familiar way to navigate files and organize editor groups.*

![The Dark Modern and Light Modern themes introduced as defaults in VS Code in 2023.](./vscode-ui-2023-themes.png)

*2023: [Dark Modern and Light Modern](https://code.visualstudio.com/updates/v1_78#_new-default-color-themes) became the default themes, giving you more control over the workbench's appearance while keeping its familiar structure.*

We continued refining each feature after it was introduced, guided by feedback across different themes, layouts, and workflows. The current modernization follows the same approach.

## The first step in 2026: color

We began the modernization journey by rethinking color with [Dark 2026 and Light 2026](https://github.com/microsoft/vscode/pull/288417). We looked at workbench colors and [syntax highlighting](https://github.com/microsoft/vscode/pull/299014) as one experience, establishing a visual foundation that we later carried into Modern UI. A tighter range of surface colors creates a clearer hierarchy and keeps code at the center. More consistent hover, focus, selection, validation, and agent states help the interface read clearly in both light and dark environments.

![Light 2026 and Dark 2026 shown side by side with the same Explorer, TypeScript editor, and Chat layout.](./vscode-ui-2026-themes.png)

*Light 2026 and Dark 2026 themes.*

Color gave us a starting point, but creating a more cohesive interface required shared rules for spacing, typography, surfaces, and controls. The opportunity to develop those rules came with a new kind of VS Code window.

## From the Agents window to the editor

The [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) became available in Stable as a Preview earlier in 2026. It was designed for starting, monitoring, and reviewing agent sessions across projects, rather than the editor window's focus on editing, navigating, running, and debugging code in a workspace.

Building that new window gave us a blank canvas for exploring the design system. A layout organized around agent sessions gave us room to work through spacing, typography, surfaces, and controls together, rather than changing one part of an established editor layout at a time.

We used it as a proving ground: a place to see how those decisions worked together when managing sessions, following progress, and reviewing changes. That helped us develop a shared visual language we could refine across VS Code, not a separate identity for the Agents window.

![The Agents window showing the Sessions and Customizations sidebar, new-session composer, and Files panel.](./vscode-agents-window.png)

*The [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) organizes the interface around agent sessions and reviewing their work. The screenshot shows an early implementation of the updated design system.*

Once those decisions worked together in the Agents window, the next question was whether the same system could support the editor. The editor brings different demands, including dense file navigation, multiple editor groups, and long-established workflows.

Bringing the shared system into that environment became the Modern UI effort. As the [workbench](https://code.visualstudio.com/docs/editing/getting-started/userinterface) had grown, related parts such as the Activity Bar, side bars, editor groups, panel, tabs, and status bar had developed different approaches to common design problems. The initial work focused on:

* Separating major areas of the workbench clearly without making them feel disconnected.
* Making controls for resizing and moving panels easier to discover.
* Simplifying typography and visual hierarchy so your work remains the focus.
* Using a consistent approach to spacing, corner radii, colors, and elevation.
* Refreshing tabs while preserving customization.

Shared design tokens provide named values for spacing, sizes, and colors instead of defining them separately in every component. This lets us adjust the interface consistently and support different densities and themes.

![An earlier editor window and Agents window shown side by side, each based on its own UI foundation.](./editor-vs-agents-before.png)

*Earlier: the editor and Agents experiences began with layouts shaped independently around their workflows. For a like-for-like comparison, both windows use Dark 2026 and are shown at the same size.*

![The modern editor window and Agents window shown side by side with consistent spacing, surfaces, typography, and controls.](./editor-vs-agents-after.png)

*Now: a shared design system creates a stronger family resemblance while each window remains optimized for its purpose. Both windows use Dark 2026 and are the same size.*

We're aligning the Agents and editor windows around the same approach to typography, spacing, colors, tabs, and controls. Moving between them should feel like changing how you're working, not switching to a different product. That doesn't mean making the layouts identical or making everyone's VS Code look the same. Each window remains optimized for its purpose, and you can still choose a theme, adjust density, and arrange your workspace to suit your screen and workflow.

## What we heard

As the Modern UI preview reached more people, our design assumptions met the realities of different displays, zoom levels, themes, and workflows. We opened a [public feedback discussion](https://github.com/microsoft/vscode/issues/334285), and developers shared dozens of detailed examples. We combined that feedback with individual issue reports and team self-hosting to identify patterns rather than treating any screenshot or preference as universal.

Several common themes emerged:

* **Overall density:** Gaps and panel padding left less room for code, tree rows, and terminal output, particularly on smaller displays and layouts with several editor groups.
* **Editor tabs:** The pill design made the active file feel detached from its editor, while tab labels and actions competed for limited horizontal space.
* **Status bar:** Wider item spacing reduced how much information fit before items were hidden.
* **Panel boundaries:** Separators and resize controls needed to be easy to find without becoming visually distracting.
* **Theming and contrast:** Theme users and authors needed more control over new surfaces, borders, and active states.
* **Responsiveness:** Some reports called out rendering performance as the workbench updated.

On a 1920 x 1080 display at 100% zoom, the modern UI currently uses approximately 20 px more horizontal space and 12-18 px more vertical space, depending on layout. We added space to separate content and make controls easier to find, but that also leaves less room for your work. Your feedback highlighted the importance of offering a better balance for different layouts.

## How your feedback changed the design

### Layout density

You told us that a more spacious interface wasn't an improvement if it meant seeing less of your code or project. That feedback led us to implement **Layout Density**.

Compact density reduces spacing while keeping the structure and customization of the modern UI. It's designed for smaller displays, information-dense workflows, and anyone who prefers a tighter layout.

Combined with theme and color customization, it can give you a layout closer to the previous interface while keeping the new foundation.

To use compact density, open **Customize Layout** from the title bar and select **Layout Density** > **Compact**, or set `window.density.layout` to `compact`.

![The same VS Code workspace shown side by side at default density and in Compact Mode.](./default-vs-compact-mode.png)

*Default density and compact density, shown with the same window size, theme, open views, and editor content.*

### Redesigned editor tabs

More recently, [feedback about editor tabs](https://github.com/microsoft/vscode/issues/336320) prompted us to revisit their design. You use tabs to navigate files and see which content is active, so their relationship to the editor matters.

The initial pill-shaped tabs appeared as separate controls above the editor. That made the selected file harder to connect visually with its content, especially in themes with subtle active-state colors. With **connected tabs**, the selected tab joins the editor surface below it. The tab and its content appear as one continuous area, restoring a familiar cue for the active file.

![Pill tabs and connected tabs shown side by side with the same files, active tab, theme, and layout.](./pill-vs-connected-tabs.png)

*Pill tabs and connected tabs, captured from matching production component fixtures.*

If you prefer the pill design, you can still select it using the `workbench.experimental.modernUIEditorTabStyle` setting.

### Smaller workbench refinements

Feedback also led to smaller changes across the workbench:

* Simplified typography and removed all-caps labels.
* Refined spacing, corner radii, and colors for a more consistent hierarchy.
* Adjusted panel separation and resize controls.
* Provided more controls for editor tabs.
* Revisited status bar spacing.
* Expanded theme customization for Modern UI elements.

You don't have to change any settings to use these refinements. The following optional settings provide more control:

* `workbench.experimental.modernUIUppercaseViewHeaders` uses uppercase text for view headers, side bar titles, and panel tabs.
* `workbench.activityBar.compact` uses a narrower Activity Bar size that frees up more horizontal space in the UI.
* `workbench.editor.tabActionReserveSpace` controls whether Modern UI tabs always reserve space for action buttons. Turn it off to give clean inactive tabs more room.

Settings with `experimental` in their name can change or be removed as the design stabilizes. The other settings are supported customization controls, not required migration steps.

### More color control for theme users and authors

The color work that started this journey came back into focus as Modern UI reached more people. The existing color API didn't expose enough of the new surfaces, borders, resize controls, tabs, and window states. We have been adding [new registered color IDs](https://github.com/microsoft/vscode/pull/335056) to cover those areas.

Most theme users don't need to do anything because the new colors have defaults. If you customize workbench colors directly, you can override the new IDs in `workbench.colorCustomizations`. If you author a theme, you can use them to shape Modern UI without changing how your theme renders in the previous interface.

The [Modern UI theming guide](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/modernUI/README.md) documents the complete token list, defaults, precedence rules, high-contrast behavior, and examples. The existing [Color Theme guide](https://code.visualstudio.com/api/extension-guides/color-theme) explains how to package and publish a theme extension.

### Keeping the interface responsive

Visual consistency can't come at the cost of responsiveness. Some feedback reports called out rendering performance, so we investigated with browser traces and repeatable benchmarks.

When the UI changes, the browser recalculates which styles apply. Broad CSS selectors can make that work more expensive than necessary. In the [first set of selector fixes](https://github.com/microsoft/vscode/pull/329067), we replaced selectors that inspected large parts of the DOM with state classes that components already knew, such as whether the diff overview or a debug action was present.

We measured those changes with a repeatable sequence of common workbench interactions: resizing, switching views, scrolling, opening diffs, and running widget animations. The fixes reduced style-recalculation time by **8.2%** and wall-clock time by **3.3%** in that combined benchmark. Layout time increased by **6.6%**, so the result recovered some of the difference from the previous interface, but not all of it.

These are targeted improvements rather than a claim that the whole workbench became faster. To prevent the same patterns from returning, [lint rules](https://github.com/microsoft/vscode/pull/333818) reject known expensive selectors, and `npm run perf:css` gives us a repeatable benchmark for future changes.

## Where we go from here

Modern UI is still evolving. Today, you can choose between it and the previous VS Code workbench design, which we refer to as Classic UI. Over time, we plan to make Modern UI the only interface so we can focus improvements on a shared foundation.

During the transition, you can return to Classic UI by opening Settings, searching for `workbench.experimental.modernUI`, and clearing the checkbox. This option is temporary, although we haven't set a date for removing it. We'll share the timeline and give you advance notice before the transition ends.

Before then, we'll continue to:

* Align shared controls and styling across the Agents and editor windows while preserving what each workflow needs.
* Continue refining Dark 2026 and Light 2026 through feedback on contrast, readability, and syntax colors.
* Refine tab styling and customization.
* Profile rendering costs and validate further improvements with repeatable workbench measurements.
* Adjust density, layout controls, and other details in response to specific feedback.
* Make Layout Density and related customization easier to discover.

Thank you for helping us improve the design. The larger updates and smaller refinements across the workbench reflect what we've learned from you. Please keep sharing what works and what gets in your way. You don't need design terminology or a proposed fix. A screenshot and details about your display, zoom level, theme, settings, and workflow help us understand the problem. If you return to Classic UI, tell us what Modern UI needs to improve before it becomes the only interface.

[Share feedback or report an issue](https://github.com/microsoft/vscode/issues)

Happy coding! 💙
