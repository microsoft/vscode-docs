---
ContentId: 0d58c0c9-bb02-4c6a-af43-595a85e4aa5c
DateApproved: 8/26/2026
MetaDescription: Inspect Git commits, branches, file history, and line authorship in Visual Studio Code with the Source Control Graph, Timeline view, and Git blame.
MetaSocialImage: images/staging-commits/source-control-graph.png
Keywords:
- source control
- git history
- git blame
- source control graph
---
# View source control history

Source control history helps you understand how a codebase changed, which commits affected a file, and who last changed a line. VS Code provides the Source Control Graph for repository history, the Timeline view for file history, and Git blame information for individual lines.

## View branch and commit history

The Source Control Graph in the Source Control view (`kb(workbench.view.scm)`) shows your commit history and branch relationships. When your branch has an upstream branch, the graph also identifies incoming and outgoing commits.

![Screenshot showing the Source Control Graph with commits and branch relationships.](images/staging-commits/source-control-graph.png)

Use the graph to:

* Select a commit to view the files that changed.
* Select a changed file to open its diff.
* Select **Open Changes** to review all changes in a commit.
* Open the context menu for a commit to check it out, cherry-pick it, or add it as context to chat.
* Compare a commit with another branch, a remote branch, or its merge base.

Use the graph toolbar to select a branch and to fetch, pull, push, or sync changes.

### Understand incoming and outgoing commits

The graph identifies commits that differ between your current branch and its upstream branch:

* **Incoming commits** are available on the remote and have not been pulled.
* **Outgoing commits** exist locally and have not been pushed.

Use the `setting(scm.graph.showIncomingChanges)` and `setting(scm.graph.showOutgoingChanges)` settings to control whether these commits appear. Use the `setting(scm.graph.pageSize)` setting to configure how many commits the graph initially loads.

## View file history with the Timeline view

The Timeline view shows events for the file that is active in the editor. These events can include Git commits and local file saves.

1. Open a file in the editor.

1. In the Explorer view (`kb(workbench.view.explorer)`), expand the **Timeline** view.

1. Select an event to inspect the corresponding file changes.

![Screenshot showing Git commits and local file saves in the Timeline view.](images/overview/timeline-view.png)

Use the Timeline filter to show only Git commits or to include events from other timeline providers. Learn more about the [Timeline view](/docs/editing/userinterface.md#timeline-view).

## View Git blame information

Git blame information identifies the commit and author that last changed a line. VS Code can show this information in the editor and in the Status Bar.

<video src="images/staging-commits/git-blame.mp4" title="Video showing Git blame information in the Status Bar and inline in the editor." autoplay muted loop controls></video>

Use the **Git: Toggle Git Blame Editor Decoration** and **Git: Toggle Git Blame Status Bar Item** commands to show or hide blame information. You can also configure these settings:

* `setting(git.blame.statusBarItem.enabled)`: shows blame information in the Status Bar.
* `setting(git.blame.editorDecoration.enabled)`: shows blame information inline in the editor.
* `setting(git.blame.editorDecoration.disableHover)`: hides the blame hover in the editor.
* `setting(git.blame.ignoreWhitespace)`: ignores whitespace changes when Git determines line authorship.

Hover over a blame decoration to view commit details, including co-author trailers. If VS Code adds [AI co-author attribution](/docs/sourcecontrol/staging-commits.md#ai-co-author-attribution) to a commit, the blame hover includes that attribution.

### Customize blame information

Use the `setting(git.blame.editorDecoration.template)` and `setting(git.blame.statusBarItem.template)` settings to choose which commit details appear.

For example, the following template shows the commit subject, author name, and relative author date:

```json
{
  "git.blame.editorDecoration.template": "${subject}, ${authorName} (${authorDateAgo})"
}
```

Use the `git.blame.editorDecorationForeground` theme color to change the color of inline blame information.

## Next steps

* [Staging and Committing](/docs/sourcecontrol/staging-commits.md) - Create focused commits and review changes
* [Branches and Worktrees](/docs/sourcecontrol/branches-worktrees.md) - Manage branches and parallel working directories
* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Review incoming and outgoing work
