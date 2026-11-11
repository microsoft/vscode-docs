---
ContentId: bba20c6e-08c4-48ef-9d43-714322c88734
DateApproved: 11/11/2026
MetaDescription: Build Timeline providers for file, folder, and workspace history in {% data variables.product.prodname_vscode_shortname %} extensions.
MetaSocialImage: ../../images/logo-stable.png
---

# Timeline API

Use the Timeline API to add your extension's history to the built-in **Timeline** view, alongside Git and Local History. You can provide events for individual files and folders, or for the whole workspace. This guide shows how to register providers, refresh and paginate their results, and add commands to timeline items.

The API is available in {% data variables.product.prodname_vscode_shortname %} 1.145 and later. It does not require `enabledApiProposals`.

> [!NOTE]
> Until version 1.145 is released to Stable, use {% data variables.product.prodname_vscode_shortname %} Insiders. Run `npx @vscode/dts main -f` in your extension directory to download the finalized API declarations.

## Register a provider

Start with a [TypeScript extension](/api/get-started/your-first-extension.md). Set the minimum supported version and add the `onView:timeline` activation event in your extension's `package.json`:

```json
{
  "engines": {
    "vscode": "^1.145.0"
  },
  "activationEvents": [
    "onView:timeline"
  ]
}
```

Unlike views contributed by your extension, the built-in Timeline view requires an explicit activation event to activate your provider when the view is shown. You do not need to contribute a new view.

Register a [TimelineProvider](/api/references/vscode-api#TimelineProvider) with [`workspace.registerTimelineProvider`](/api/references/vscode-api#workspace.registerTimelineProvider). Supply a unique provider ID, a label for the view's source filter, and the URI schemes your provider supports. Use `'*'` to support all schemes.

The following example records file saves while the extension is active. Add it to your extension's entry point, together with the `getPage` helper in [Paginate results](#paginate-results).

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const history = new Map<string, vscode.TimelineItem[]>();
  const changes = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();
  let sequence = 0;

  const provider: vscode.TimelineProvider = {
    onDidChangeTimeline: changes.event,
    provideTimeline(uri, options, token) {
      if (token.isCancellationRequested) {
        return;
      }

      return getPage(history.get(uri.toString()) ?? [], options);
    }
  };

  context.subscriptions.push(
    changes,
    vscode.workspace.registerTimelineProvider(
      'example.saveHistory', 'Save history', 'file', provider
    ),
    vscode.workspace.onDidSaveTextDocument(document => {
      const item = new vscode.TimelineItem(
        `Saved ${vscode.workspace.asRelativePath(document.uri)}`, Date.now()
      );
      item.id = `save-${++sequence}`;
      item.iconPath = new vscode.ThemeIcon('save');
      item.contextValue = 'saveHistoryEntry';
      item.command = {
        command: 'vscode.open',
        title: 'Open file',
        arguments: [document.uri]
      };

      const key = document.uri.toString();
      const items = history.get(key) ?? [];
      items.unshift(item);
      history.set(key, items);
      changes.fire(document.uri);
    })
  );
}
```

Open the **Timeline** view in the Explorer, then save a file to see an entry. The source filter lists the provider as **Save history**. This example keeps only event metadata in memory, not saved file contents, and clears its history when the extension stops.

The provider receives the URI of the file or folder whose timeline is shown. Users can open a folder's timeline with **Open Timeline** in the Explorer context menu. This example records individual files. To support folder history, return events associated with the requested folder, such as commits affecting its descendants.

Providers run in parallel, and their results are merged. An error from one provider does not prevent other providers from displaying their results. Dispose of registrations when your extension stops, as the example does through `context.subscriptions`.

<!-- TODO: Add a human-captured screenshot showing Save history entries alongside built-in Timeline sources and the source filter. -->

## Create timeline items

Create a [TimelineItem](/api/references/vscode-api#TimelineItem) with a label and a timestamp in milliseconds since the Unix epoch. Return items ordered from newest to oldest.

Set `id` to a stable identifier that is unique across your provider's items. Without an ID, the timestamp identifies the item, so items with the same timestamp need distinct IDs.

Customize an item with these properties:

* `description`: Less prominent text displayed with the item.
* `iconPath`: An icon URI, light and dark icon paths, or a `ThemeIcon`.
* `tooltip`: Plain text or a `MarkdownString`.
* `command`: The command to run when the user opens the item.
* `contextValue`: A value for targeting [item actions](#add-timeline-actions).
* `accessibilityInformation`: An accessible label and optional role for screen readers.

### Resource-based items and comparisons

Set `resourceUri` to the content of a resource **as of that entry**, not its current working copy. For example, use the URI of a saved revision exposed through a [text document content provider](/api/extension-guides/virtual-documents.md).

When two selected items have a `resourceUri`, users can choose **Compare Selected**, including across providers such as your extension and Local History. Leave `resourceUri` unset for entries that represent multiple resources, such as a workspace commit.

You can also pass a resource URI instead of a label to the constructor:

```ts
function createSnapshotItem(
  id: string, snapshotUri: vscode.Uri, timestamp: number
): vscode.TimelineItem {
  const item = new vscode.TimelineItem(snapshotUri, timestamp);
  item.id = id;
  item.command = {
    command: 'vscode.open',
    title: 'Open saved version',
    arguments: [snapshotUri]
  };
  return item;
}
```

When `label` is unset or empty, the filename, file icon, and file decorations are derived from `resourceUri`. An explicit icon other than `ThemeIcon.File` or `ThemeIcon.Folder` overrides the file icon. With a label set, the item does not derive its label, icon, or decorations from the URI.

## Refresh results

Expose `onDidChangeTimeline` to notify the view when your data changes. Fire a URI to refresh one resource, an array of URIs to refresh several resources, or `undefined` to refresh all timelines from your provider.

The view requests the newest items again, including enough items to cover the results already loaded. Updated and removed items are reflected in the view.

Use `options.triggerKind` to distinguish an explicit user refresh (`TimelineTriggerKind.Invoke`) from automatic requests (`TimelineTriggerKind.Automatic`), such as switching editors, loading more items, or receiving a change event. Providers that cache remote history should fetch fresh data for an explicit refresh.

Honor the cancellation token when retrieving history. The in-memory example checks it before returning. For asynchronous work, also stop pending work or discard its result when cancellation is requested.

## Paginate results

Return a `Timeline` containing `items` and, when more items are available, a provider-defined `cursor`. The view passes that cursor back as `options.cursor` to request the next page. Omit the result cursor when no items remain.

`options.limit` is the requested number of items, not a required page size. You can return fewer or more items. Return a cursor whenever another page is available, even if you return fewer items than requested. An undefined limit requests all items, and an undefined cursor requests the newest items.

Add this helper outside `activate` for the in-memory example:

```ts
function getPage(
  items: readonly vscode.TimelineItem[], options: vscode.TimelineOptions
): vscode.Timeline {
  const start = options.cursor === undefined ? 0 : Number(options.cursor);
  if (!Number.isSafeInteger(start) || start < 0) {
    throw new Error('Invalid save history cursor.');
  }

  const end = options.limit === undefined ? items.length : start + options.limit;
  return {
    items: items.slice(start, end),
    cursor: end < items.length ? String(end) : undefined
  };
}
```

This example uses an offset as its cursor. For remote history, use the cursor supplied by your backend.

## Provide workspace history

Register a separate [WorkspaceTimelineProvider](/api/references/vscode-api#WorkspaceTimelineProvider) with [`workspace.registerWorkspaceTimelineProvider`](/api/references/vscode-api#workspace.registerWorkspaceTimelineProvider). It receives options and a cancellation token, but no resource URI or scheme filter.

The workspace timeline covers all workspace folders, including multi-root workspaces. Users can select **Pin Workspace Timeline** from the Timeline view's title menu to show it.

Add this registration inside `activate` to reuse the first example's saved events:

```ts
const workspaceChanges = new vscode.EventEmitter<void>();
context.subscriptions.push(
  workspaceChanges,
  changes.event(() => workspaceChanges.fire()),
  vscode.workspace.onDidChangeWorkspaceFolders(() => workspaceChanges.fire()),
  vscode.workspace.registerWorkspaceTimelineProvider(
    'example.saveHistory', 'Save history', {
      onDidChangeWorkspaceTimeline: workspaceChanges.event,
      provideWorkspaceTimeline(options, token) {
        if (token.isCancellationRequested) {
          return;
        }

        const items = [...history.entries()]
          .filter(([uri]) => vscode.workspace.getWorkspaceFolder(vscode.Uri.parse(uri)) !== undefined)
          .flatMap(([, entries]) => entries)
          .sort((a, b) => b.timestamp - a.timestamp);
        return getPage(items, options);
      }
    }
  )
);
```

Fire `onDidChangeWorkspaceTimeline` when workspace history changes. In this example, file-history changes also signal a workspace-history change.

A resource provider and workspace provider registered by the same extension can share an ID and appear as one source in the filter menu. Registering two resource providers, or two workspace providers, with the same ID fails.

## Add timeline actions

Contribute commands to `timeline/item/context` for item actions, or `timeline/title` for view actions. Use `TimelineItem.contextValue` through the `timelineItem` context key to target your entries:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "example.copyTimelineLabels",
        "title": "Copy Timeline Labels"
      }
    ],
    "menus": {
      "timeline/item/context": [
        {
          "command": "example.copyTimelineLabels",
          "when": "timelineItem == saveHistoryEntry",
          "group": "5_copy"
        }
      ]
    }
  }
}
```

An item command receives `(item, uri, providerId, selectedItems)`:

* `item` is the entry on which the command runs.
* `uri` is the file or folder whose timeline is shown, or `undefined` for the workspace timeline.
* `providerId` is the ID supplied when registering the item's provider.
* `selectedItems` is defined when the target belongs to a multi-selection. It contains only selected items from that provider, including the target. Otherwise, it is `undefined`.

Add a handler inside `activate`:

```ts
context.subscriptions.push(
  vscode.commands.registerCommand('example.copyTimelineLabels', (
    item: vscode.TimelineItem | undefined,
    _uri: vscode.Uri | undefined,
    _providerId: string | undefined,
    selectedItems?: readonly vscode.TimelineItem[]
  ) => {
    if (!item) {
      return vscode.window.showWarningMessage('Select a Timeline item to copy its label.');
    }

    return vscode.env.clipboard.writeText(
      (selectedItems ?? [item])
        .map(entry => entry.label ?? entry.resourceUri?.toString() ?? String(entry.timestamp))
        .join('\n')
    );
  })
);
```

The guard handles invocation without an item, such as from the Command Palette. Menu arguments are not automatically supplied by other invocation methods.

Your extension receives its original items. Commands contributed by another extension receive read-only copies of the items, without the `command` property.

Use `listMultiSelection` and `listDoubleSelection` in `when` clauses to target selection sizes. For example, `timelineItem == saveHistoryEntry && !listMultiSelection` restricts an action to a single item.

Title-menu commands receive the resource URI, or `undefined` for the workspace timeline. Use `timelineForWorkspace` in a `when` clause to distinguish workspace actions from file and folder actions.

## Migrate from the proposed API

If your extension uses the former Timeline proposal:

* Remove `timeline` from `enabledApiProposals` and remove the proposed Timeline declaration file.
* Pass the provider ID and label to the registration function instead of defining them on the provider.
* Return `Timeline.cursor` instead of `Timeline.paging.cursor`, and treat `options.limit` as an optional number.
* Replace `TimelineChangeEvent` with `Uri | Uri[] | undefined` events for resource timelines. Use the separate workspace provider and its `Event<void>` for workspace history.

## Related resources

* [Commands guide](/api/extension-guides/command.md)
* [Menu contribution points](/api/references/contribution-points.md#contributes.menus)
* [When clause contexts](/api/references/when-clause-contexts.md)
