# Modernizing the VS Code UI

VS Code's interface has been evolving since the [first preview in 2015](https://code.visualstudio.com/blogs/2016/04/14/vscode-1.0). Tabs, themes, and new ways to organize your work arrived along the way. Each change has added capabilities without losing the familiar workflows that make the editor feel like yours.

That brings us to 2026. As VS Code has grown, related parts of the [workbench](https://code.visualstudio.com/docs/editing/getting-started/userinterface), including the Activity Bar, side bars, editor groups, panel, tabs, and status bar, have developed different approaches to spacing, typography, colors, and controls. We started a UI modernization effort to bring those parts together around a clearer, more consistent, and more customizable foundation. Modern UI grew out of that process.

The way we work in VS Code is evolving too. The familiar editor window remains centered on writing, navigating, running, and debugging code, while the [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) gives you a dedicated place to start, monitor, and review agent sessions across projects. Modern UI brings these experiences into the same visual system, so moving between them feels like changing workflows, not changing products.

We know that changing a daily tool can be disruptive. You build habits around where controls live, how you move between files, and how much code fits on screen. This modernization is another step in VS Code's evolution, not a finished design we're handing down. The [public Modern UI feedback discussion](https://github.com/microsoft/vscode/issues/334285), community issues, and our own day-to-day use continue to shape it.

In this post, we'll look back at how the UI has evolved, explain how the Agents window helped us develop a shared design system, and walk through the changes you've helped us make.

## An interface that's always evolving

Some interface changes have been small refinements. Others have introduced new ways to organize your work. Even features that now feel like part of the original editor arrived gradually.

![VS Code in 2015, with the Activity Bar, a single editor title, and the blue status bar before editor tabs were introduced.](./vscode-ui-2015-themes.png)

*2015: The early editor, shown in a still from the [September 2015 color-theme demo](https://code.visualstudio.com/updates/v0_8_0#_additional-themes). The release expanded the choice of themes, giving you more control over how your editor looked.*

![VS Code in 2016, showing the Explorer, Open Editors list, and tabs across two editor groups.](./vscode-ui-2016-tabs.png)

*2016: [Editor tabs and the Open Editors view](https://code.visualstudio.com/updates/June_2016#_tabs) gave you a visible, familiar way to navigate files and organize editor groups.*

![The Dark Modern and Light Modern themes introduced as defaults in VS Code in 2023.](./vscode-ui-2023-themes.png)

*2023: [Dark Modern and Light Modern](https://code.visualstudio.com/updates/v1_78#_new-default-color-themes) became the default themes, giving you more control over the workbench's appearance while keeping its familiar structure.*

These updates didn't arrive as one-time reveals. Community feedback helped us refine how they worked across different themes, layouts, and workflows. The same is true of the current modernization.

## That brings us to 2026

As the workbench added more capabilities, related components sometimes solved the same design problems in different ways. Feedback and issue reports also highlighted a recurring tension: controls and boundaries need to be clear, but the interface can't take space away from code or make established workflows harder to use.

Those signals, together with an audit of where workbench components had diverged, defined the initial scope of the UI modernization effort:

* Separate major areas of the workbench clearly without making them feel disconnected.
* Make controls for resizing and moving panels easier to discover.
* Simplify typography and visual hierarchy so your work remains the focus.
* Use a consistent approach to spacing, corner radii, colors, and elevation.
* Refresh tabs while preserving customization.

These changes use shared design tokens: named values for spacing, sizes, and colors, rather than separate values in every component. Tokens let us adjust the interface consistently and support different densities and themes.

### The 2026 color themes

We began the modernization journey by rethinking color with [Dark 2026 and Light 2026](https://github.com/microsoft/vscode/pull/288417). We looked at workbench colors and [syntax highlighting](https://github.com/microsoft/vscode/pull/299014) as one experience, establishing a visual foundation that we later carried into Modern UI. A tighter range of surface colors creates a clearer hierarchy and keeps code at the center. More consistent hover, focus, selection, validation, and agent states help the interface read clearly in both light and dark environments.

![Light 2026 and Dark 2026 shown side by side with the same Explorer, TypeScript editor, and Chat layout.](./vscode-ui-2026-themes.png)

*Light 2026 and Dark 2026 themes.*

## A proving ground in the Agents window

The Agents window became available in Stable as a Preview earlier in 2026. It was designed for agent-driven development across multiple projects and sessions, rather than the editor window's focus on one workspace and its files.

Building that new window gave us a blank canvas for exploring the design system. A layout organized around agent sessions gave us room to work through spacing, typography, surfaces, and controls together, rather than changing one part of an established editor layout at a time.

We used it as a proving ground: a place to see how those decisions worked together when managing sessions, following progress, and reviewing changes. That helped us develop a shared visual language we could refine across VS Code, not a separate identity for the Agents window.

![The Agents window showing the Sessions and Customizations sidebar, new-session composer, and Files panel.](./vscode-agents-window.png)

*The [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) organizes the interface around agent sessions and reviewing their work. The screenshot shows an early implementation of the updated design system.*

The editor window brings a different set of demands, including dense file navigation, multiple editor groups, and long-established workflows. Bringing the design system into that environment helps us refine it further. The learning goes both ways.

## Two surfaces, one VS Code

We're aligning the Agents and editor windows around the same approach to typography, spacing, colors, tabs, and controls. Moving between them should feel like changing how you're working, not switching to a different product.

That doesn't mean making both layouts identical. The editor window centers on editing, navigating, and debugging code; the Agents window centers on delegating tasks and reviewing results. Each needs a layout that supports its purpose, with familiar controls and styling where they overlap.

![An earlier editor window and Agents window shown side by side, each based on its own UI foundation.](./editor-vs-agents-before.png)

*Earlier: the editor and Agents experiences began with layouts shaped independently around their workflows. For a like-for-like comparison, both windows use Dark 2026 and are shown at the same size.*

![The modern editor window and Agents window shown side by side with consistent spacing, surfaces, typography, and controls.](./editor-vs-agents-after.png)

*Now: a shared design system creates a stronger family resemblance while each window remains optimized for its purpose. Both windows use Dark 2026 and are the same size.*

It also doesn't mean everyone's VS Code should look the same. We're improving customization alongside consistency, so you can choose a theme, adjust density, and arrange your workspace to suit your screen and workflow.

## What we heard

When Modern UI reached more people, we opened a [public feedback discussion](https://github.com/microsoft/vscode/issues/334285). Developers shared dozens of detailed examples from different displays, zoom levels, themes, and layouts. We combined that feedback with individual issue reports and team self-hosting to identify patterns rather than treating any screenshot or preference as universal.

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

## Other refinements

Reports in the public feedback discussion, individual issues, and our own daily use also led to smaller changes across the workbench:

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

Developing the 2026 themes also showed us where the existing color API didn't expose enough of the modernized interface. Most theme users don't need to do anything because the new colors have defaults. If you customize workbench colors directly, you can override the new IDs. If you author a theme, you can use them to shape Modern UI without changing how your theme renders in the previous interface.

We have been adding [new registered color IDs](https://github.com/microsoft/vscode/pull/335056) for:

* Shell and window state with `modernUI.shellBackground` and `modernUI.inactiveShellBackground`.
* Shared surfaces and frames with `surface.background`, `surface.foreground`, `surface.border`, `editor.border`, and `modernPanel.border`.
* Top-level resize affordances with `modernSash.gripForeground`.
* Tabs with `modernTab.*`, `modernEditorTab.*`, and `editorGroupHeader.connectedTabsBackground`.
* The Activity Bar with `modernActivityBar.*` and `modernActivityBarItem.*`.
* Inactive windows with `statusBar.inactiveBackground`.

As a theme user, you can try the colors in the main workbench by enabling Modern UI and adding overrides to `workbench.colorCustomizations`:

```json
{
  "workbench.experimental.modernUI": true,
  "workbench.colorCustomizations": {
    "modernUI.shellBackground": "#181818",
    "modernUI.inactiveShellBackground": "#202020",
    "surface.border": "#3a3a3a",
    "modernPanel.border": "#505050",
    "modernSash.gripForeground": "#cccccc66",
    "modernTab.activeBackground": "#3d3d3d",
    "statusBar.inactiveBackground": "#202020"
  }
}
```

If you author a theme, the [Modern UI theming guide](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/modernUI/README.md) documents the complete token list, defaults, precedence rules, high-contrast behavior, and examples. The existing [Color Theme guide](https://code.visualstudio.com/api/extension-guides/color-theme) explains how to package and publish a theme extension.

## Keeping the interface responsive

Visual consistency is the main focus of the modernization, but it can't come at the cost of responsiveness. A smaller set of feedback reports called out rendering performance, so we investigated with browser traces and repeatable benchmarks. We evaluated the visual changes above through public feedback, individual issues, and team self-hosting across different themes and layouts.

When the UI changes, the browser recalculates which styles apply. Broad CSS selectors can make that work more expensive than necessary. In the [first set of selector fixes](https://github.com/microsoft/vscode/pull/329067), we replaced selectors that inspected large parts of the DOM with state classes that components already knew, such as whether the diff overview or a debug action was present.

We measured those changes with a repeatable sequence of common workbench interactions: resizing, switching views, scrolling, opening diffs, and running widget animations. The fixes reduced style-recalculation time by **8.2%** and wall-clock time by **3.3%** in that combined benchmark. Layout time increased by **6.6%**, so the result recovered some of the difference from the previous interface, but not all of it.

An isolated 250-row selector stress test showed larger reductions: **79.2% less style-recalculation time** and **69.1% less wall-clock time**. Those numbers describe that stress case, not the whole editor.

We applied the same approach to [file-decoration colors in editor tabs](https://github.com/microsoft/vscode/pull/331490). A full style recalculation with Modern UI enabled dropped from **1.42 ms to 0.57 ms** in that test. Tree-row focus changes and tab switching were unchanged, so this was a targeted improvement rather than a claim that the whole workbench became faster.

To prevent the same patterns from returning, [lint rules](https://github.com/microsoft/vscode/pull/333818) reject known expensive selectors in core and built-in extension CSS. We also added `npm run perf:css` to exercise resizing, class changes, tab operations, and side bar and panel toggles in a repeatable benchmark. Together, the traces, checks, and benchmark help us report improvements, regressions, and inconclusive results more clearly.

## What's next?

The priorities below combine themes from public feedback, individual issue reports, team self-hosting, and benchmark data. We'll continue to:

* Align shared controls and styling across the Agents and editor windows while preserving what each workflow needs.
* Continue refining Dark 2026 and Light 2026 through feedback on contrast, readability, and syntax colors.
* Refine tab styling and customization.
* Profile rendering costs and validate further improvements with repeatable workbench measurements.
* Adjust density, layout controls, and other details in response to specific feedback.
* Make Layout Density and related customization easier to discover.

## Timing and transition

Today, you can choose between Modern UI and the previous VS Code workbench design, which we refer to as Classic UI. Over time, we plan to make Modern UI the only interface. Maintaining one adaptable interface lets us focus improvements on a shared foundation.

During the transition, you can return to the Classic UI by opening Settings, searching for `workbench.experimental.modernUI`, and clearing the checkbox. If you switch back, please tell us why in the [Modern UI feedback discussion](https://github.com/microsoft/vscode/issues/334285). The display, zoom level, theme, settings, and workflow that led to the decision help us understand what Modern UI needs to improve before it becomes the only interface.

The option to return to Classic UI is temporary, although we haven't set a date for removing it. We'll share the timeline and give you advance notice before the transition ends.

## Keep the feedback coming

Thank you for helping us improve the design. Both the larger updates, and the smaller refinements across the workbench all reflect what we've learned from you. As we bring the Agents and editor windows closer together, we want VS Code to feel more cohesive and still feel like yours.

Please keep sharing what works and what gets in your way. You don't need design terminology or a proposed fix, just your honest feedback. A screenshot and details about your display, zoom level, theme, settings, and workflow help us understand the problem.

[Share feedback or report an issue](https://github.com/microsoft/vscode/issues)

Happy coding! 💙
