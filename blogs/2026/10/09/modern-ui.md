# Modernizing the VS Code UI

We're updating the VS Code interface to make it clearer, more consistent, and easier to customize. That includes changes to spacing, typography, color themes, tabs, and how the different parts of the window fit together. We're also bringing the editor and Agents windows closer together, so they feel like two ways of working in the same product.

We know that changing an editor can be disruptive. You build habits around where controls live, how you move between files, and how much code fits on screen. Even a small change can affect your muscle memory and daily workflow.

We're listening to your feedback and using it to refine the design. Layout density and, more recently, the redesigned editor tabs are two examples. In this post, we'll look back at how the UI has evolved, explain how the Agents window helped us explore and develop a shared design system, and walk through the changes you've helped us make.

## An interface that's always evolving

VS Code's UI has been evolving since the [first preview in 2015](https://code.visualstudio.com/blogs/2016/04/14/vscode-1.0). Some changes have been small refinements; others have introduced new ways to organize your work. Even features that now feel like part of the original editor, such as tabs, arrived along the way.

![VS Code in 2015, with the Activity Bar, a single editor title, and the blue status bar before editor tabs were introduced.](./vscode-ui-2015-themes.png)

*2015: The early editor, shown in a still from the [September 2015 color-theme demo](https://code.visualstudio.com/updates/v0_8_0#_additional-themes). The release expanded the choice of themes, giving you more control over how your editor looked.*

![VS Code in 2016, showing the Explorer, Open Editors list, and tabs across two editor groups.](./vscode-ui-2016-tabs.png)

*2016: [Editor tabs and the Open Editors view](https://code.visualstudio.com/updates/June_2016#_tabs) changed how you navigated files and organized editor groups.*

![The Dark Modern and Light Modern themes introduced as defaults in VS Code in 2023.](./vscode-ui-2023-themes.png)

*2023: [Dark Modern and Light Modern](https://code.visualstudio.com/updates/v1_78#_new-default-color-themes) became the default themes, updating the workbench's appearance while keeping its familiar structure.*

In 2026, that evolution expanded to color with [Dark 2026 and Light 2026](https://github.com/microsoft/vscode/pull/288417). We developed the themes alongside the modernized UI, looking at workbench colors and [syntax highlighting](https://github.com/microsoft/vscode/pull/299014) as one experience. A tighter range of surface colors creates a clearer hierarchy and keeps code at the center, while more consistent hover, focus, selection, validation, and agent states help the interface read clearly in both light and dark environments.

![Light 2026 and Dark 2026 shown side by side with the same Explorer, TypeScript editor, and Chat layout.](./vscode-ui-2026-themes.png)

*Light 2026 and Dark 2026 themes.*

Today's modernization is another step in that evolution, not the first time we've revisited the interface. The challenge remains the same: improve VS Code while respecting the workflows and preferences you've built around it.

## Why update the UI?

As the interface has evolved, individual components have developed different approaches to spacing, typography, colors, and controls. Those differences make it harder to update the interface consistently, especially as we add new ways of working.

Modernizing the UI gives us an opportunity to bring those components together. We want the workbench to feel calmer and more consistent, with a clear hierarchy that keeps the focus on your work.

The initial changes included:

- Clearer separation between major areas of the workbench.
- Controls that make resizing and moving panels easier to discover.
- Updated typography and a simpler visual hierarchy.

- A consistent approach to spacing, corner radii, colors, and elevation.
- Refreshed tabs and status bar styling.

These changes use shared design tokens: named values for spacing, sizes, and colors, rather than separate values in every component. Tokens let us adjust the interface consistently and support different densities and themes. They're also what makes Compact density possible.

## A proving ground in the Agents window

Building the [Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) gave us a blank canvas for exploring this design system. A new window organized around agent sessions gave us room to work through spacing, typography, surfaces, and controls together, rather than changing one part of an established editor layout at a time.

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

Your feedback showed us where the initial design wasn't working well, whether on a small laptop display or in a layout with multiple editor groups and a busy side bar.

Several common themes came up:

- The modern UI uses too much screen space, particularly on smaller displays and information-dense layouts.
- Tabs and the status bar need to remain compact, clear, and customizable.
- Panel boundaries and resize controls need to be easy to find without becoming distracting.
- Rendering performance needs further improvement.

On a 1920 x 1080 display at 100% zoom, the modern UI currently uses approximately 20 px more horizontal space and 12-18 px more vertical space, depending on layout. We added space to separate content and make controls easier to find, but that also leaves less room for your work. Your feedback highlighted the importance of offering a better balance for different layouts.

Here's how we've been responding.

## How your feedback changed the design

### Layout Density

You told us that a more spacious interface wasn't an improvement if it meant seeing less of your code or project. That feedback led us to implmement **Layout Density**.

Compact density reduces spacing while keeping the structure and customization of the modern UI. It's designed for smaller displays, information-dense workflows, and anyone who prefers a tighter layout.

Combined with theme and color customization, it can give you a layout closer to the Classic UI while keeping the new foundation.

To enable compact density, set `window.density.layout` to `compact`.

![The same VS Code workspace shown side by side at default density and in Compact Mode.](./default-vs-compact-mode.png)

*Default density and compact density, shown with the same window size, theme, open views, and editor content.*

### Redesigned editor tabs

More recently, your feedback prompted us to revisit editor tabs. You use tabs to navigate files and see which content is active, so their relationship to the editor matters.

The initial pill-shaped tabs appeared as separate controls above the editor. With **connected tabs**, the selected tab joins the editor surface below it. The tab and its content appear as one continuous area, restoring a familiar cue for the active file.

![Pill tabs and connected tabs shown side by side with the same files, active tab, theme, and layout.](./pill-vs-connected-tabs.png)

*Pill tabs and connected tabs, captured from matching production component fixtures.*

If you prefer the pill design, you can still select it using the `workbench.experimental.modernUIEditorTabStyle` setting.

## Other refinements

We've also used your feedback to make smaller changes across the workbench:

- Simplified typography and removed all-caps labels.
- Refined spacing, corner radii, and colors for a more consistent hierarchy.
- Adjusted panel separation and resize controls.
- Provided more controls for editor tabs.
- Revisited status bar spacing.
- Expanded theme customization for modern UI elements.

There are also settings for the Activity Bar, tabs, and view headers:

- `workbench.experimental.modernUIUppercaseViewHeaders`
- `workbench.activityBar.compact`
- `workbench.editor.tabActionReserveSpace`

### More control for theme authors

Developing the 2026 themes also showed us where the existing color API didn't expose enough of the modernized interface. We have been adding [new registered color IDs](https://github.com/microsoft/vscode/pull/335056) so theme authors can shape Modern UI without affecting legacy colors.

The new colors cover:

- Shell and window state with `modernUI.shellBackground` and `modernUI.inactiveShellBackground`.
- Shared surfaces and frames with `surface.background`, `surface.foreground`, `surface.border`, `editor.border`, and `modernPanel.border`.
- Top-level resize affordances with `modernSash.gripForeground`.
- Tabs with `modernTab.*`, `modernEditorTab.*`, and `editorGroupHeader.connectedTabsBackground`.
- The Activity Bar with `modernActivityBar.*` and `modernActivityBarItem.*`.
- Inactive windows with `statusBar.inactiveBackground`.

To try them in the main workbench, enable Modern UI and add overrides to `workbench.colorCustomizations`:

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

The [Modern UI theming guide](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/modernUI/README.md) documents the complete token list, defaults, precedence rules, high-contrast behavior, and examples. The existing [Color Theme guide](https://code.visualstudio.com/api/extension-guides/color-theme) explains how to package and publish a theme extension.

## Improving rendering performance

You've also raised concerns about performance. Alongside the visual changes, we've been investigating styling and rendering costs, fixing expensive patterns, and adding checks to keep them from returning.

### More precise CSS selectors

When the UI changes, the browser works out which styles apply. This is called *style recalculation*. How we write CSS selectors affects how much of that work the browser needs to do.

For example, a `:has()` selector can make an element's styling depend on changes to its descendants. A selector such as `[class*="monaco-decoration-itemColor"]` searches the class attribute for a substring rather than matching a specific class token. Both can create broader dependencies than we need, causing unnecessary recalculation as the workbench changes.

In the [first set of selector fixes](https://github.com/microsoft/vscode/pull/329067), we gave CSS state that the component already knows. The diff editor exposes `has-diff-overview`, chat panes expose `chat-viewpane-container`, and the Run and Debug title maintains `has-start-debug-action-item`. CSS can match those classes directly instead of inspecting the DOM to discover the same information. Component code keeps the markers in sync, including removing them when they're no longer needed.

We applied the same approach to [file-decoration colors in editor tabs](https://github.com/microsoft/vscode/pull/331490). Resource labels now carry a stable `monaco-decoration-itemColor` class alongside their generated, per-color class. Tab styling matches the stable class; the generated class still supplies the color. Git and problem decorations keep their colors without requiring substring searches.

This isn't about removing every `:has()` selector. It's about keeping styling dependencies narrow, especially in parts of the UI that update frequently.

### Measuring the changes

The [first selector fixes](https://github.com/microsoft/vscode/pull/329067) were measured with a mixed workbench workload: resizing, switching views, scrolling, opening diffs, and widget animation.

| Mixed workbench metric | Modern UI before | Modern UI after | Change |
| --- | ---: | ---: | ---: |
| Style-recalculation time | 2,253.29 ms | 2,069.19 ms | -8.2% |
| Wall-clock time | 11,016.82 ms | 10,654.22 ms | -3.3% |
| Layout time | 141.79 ms | 151.21 ms | +6.6% |

This recovered some of the difference from the Classic UI, but not all of it. Wall-clock and style-recalculation times remained above the Classic baseline, and layout time increased.

An isolated 250-row selector test showed larger reductions: **79.2% less style-recalculation time** and **69.1% less wall-clock time**. Those gains apply to that stress case, not the whole editor.

The [decoration-selector change](https://github.com/microsoft/vscode/pull/331490) measured the cost of a **full style recalculation**:

| Full style-recalculation scenario | Before | After | Change |
| --- | ---: | ---: | ---: |
| Modern UI disabled | 1.35 ms | 0.57 ms | -57.8% |
| Modern UI enabled | 1.42 ms | 0.57 ms | -59.9% |
| With the base codicon substring rules also present | 2.80 ms | 2.13 ms | -23.9% |

Tree-row focus changes and tab switching were unchanged in the same test. The result is a targeted improvement to style recalculation.

### Keeping performance in check

Fixing individual selectors is only part of the work. An earlier [lint rule](https://github.com/microsoft/vscode/pull/327690) rejects root-anchored `:has()` selectors, where dependencies can extend across the workbench. We then [expanded those checks](https://github.com/microsoft/vscode/pull/333818) across core and built-in extension CSS to reject new class-substring selectors, with an explicit exception for existing codicon-family patterns. Parser tests cover nesting, comments, and escaped identifiers.

That follow-up also added a decoration-badge marker, changed selected chat-placeholder rules to exact class matches, and removed unused editor-header styling.

To make future comparisons repeatable, we added `npm run perf:css`. It exercises resizing, class mutations, tab operations, and side bar and panel toggles, recording build identity, elapsed time, and Chromium style and layout durations and counts.

The final comparison ran the optimized build between two clean baseline runs, using the same Electron binary, settings, workspace, and operation order. Each run had three warmup rounds and nine measured rounds.

We now have more precise selectors, checks against known expensive patterns, and a repeatable benchmark. We'll use those tools to guide further work, including reporting regressions and inconclusive results.

## What's next?

There's more to do. We'll continue to:

- Align shared controls and styling across the Agents and editor windows while preserving what each workflow needs.
- Continue refining Dark 2026 and Light 2026 through feedback on contrast, readability, and syntax colors.
- Refine tab styling and customization.
- Profile rendering costs and validate further improvements with repeatable workbench measurements.
- Adjust density, layout controls, and other details in response to specific feedback.
- Make Layout Density and related customization easier to discover.

## Timing and transition

We plan to move everyone to the new UI and remove the Classic UI. Maintaining one adaptable interface lets us focus improvements on a shared foundation.

During the transition, you can switch back to the Classic UI while we continue improving the modern UI with your feedback.

That option is temporary. We haven't set a removal date yet, and we'll share the timeline and give advance notice before removing it.

## Keep the feedback coming

Thank you for helping us improve the design. Both the larger updates, and the smaller refinements across the workbench all reflect what we've learned from you. As we bring the Agents and editor windows closer together, we want VS Code to feel more cohesive and still feel like yours.

Please keep sharing what works and what gets in your way. You don't need design terminology or a proposed fix, just your honest feedback. A screenshot and details about your display, zoom level, theme, settings, and workflow help us understand the problem.

[Share feedback or report an issue](https://github.com/microsoft/vscode/issues)

Happy coding!
