---
ContentId: 0d58c0c9-bb02-4c6a-af43-595a85e4aa5c
DateApproved: 9/16/2026
MetaDescription: Inspect Git commits, compare revisions, and find file history and line authorship in {% data variables.product.prodname_vscode %}.
MetaSocialImage: images/staging-commits/source-control-graph.png
Keywords:
- source control
- git history
- git blame
- source control graph
---
# View source control history

Source control history helps you understand how a codebase changed, which commits affected a file, and who last changed a line. {% data variables.product.prodname_vscode_shortname %} provides the Source Control Graph for repository history, the Timeline view for file history, and Git blame information for individual lines.

* [Inspect or compare commits](#view-branch-and-commit-history) in the Source Control Graph.
* [Review a file's revisions](#view-file-history-with-the-timeline-view) in the Timeline view.
* [Find who last changed a line](#view-git-blame-information) with Git blame.

## View branch and commit history

The Source Control Graph in the Source Control view (`kb(workbench.view.scm)`) shows your commit history and branch relationships. When your branch has an upstream branch, the graph also identifies incoming and outgoing commits.

![Screenshot showing the Source Control Graph with commits and branch relationships.](images/staging-commits/source-control-graph.png)

### Inspect a commit

1. In the Source Control Graph, select a commit to expand its list of changed files.

1. Select a changed file to open its diff.

To review the commit's changes together in a multi-file diff, right-click the commit and select **Open Changes**. Selecting a commit to inspect it doesn't check it out or change your working files.

Changed binary files, such as images, remain in the multi-file diff and show **Binary file changed** instead of a text diff. When both file versions are available, select **Open Diff** to open the file in the normal diff editor, such as an image diff or applicable custom editor.

### Compare a commit with a branch or tag

1. In the Source Control Graph, right-click the commit you want to compare.

1. Select **Compare with...**.

1. In the reference picker, select a local branch, remote branch, or tag.

The comparison opens in a multi-file diff. The selected reference is on the left and the commit is on the right.

The commit's context menu also provides these shortcuts when the current branch has the corresponding references:

* **Compare with Remote** compares the commit with the current branch's upstream reference.
* **Compare with Merge Base** compares the commit with the base branch that {% data variables.product.prodname_vscode_shortname %} identifies for the current branch.

These actions compare committed revisions and don't switch your checked-out branch.

### Apply or check out a commit

* To apply a commit's changes to your current branch, right-click the commit in the Source Control Graph and select **Cherry Pick**.
* To check out the exact revision, right-click the commit and select **Checkout (Detached)**.

> [!CAUTION]
> **Checkout (Detached)** updates your working files and leaves `HEAD` detached from any branch. [Create a branch](/docs/sourcecontrol/branches-worktrees.md#create-new-branches) before making commits you want to keep.

### Understand incoming and outgoing commits

The graph identifies commits that differ between your current branch and its upstream branch:

* **Incoming commits** are available on the remote and have not been pulled.
* **Outgoing commits** exist locally and have not been pushed.

Select an **Incoming Changes** or **Outgoing Changes** entry to inspect its files, or right-click an individual commit and select **Open Changes**. Use the graph toolbar to fetch, pull, push, or sync changes.

## View file history with the Timeline view

The Timeline view shows events for the file that is active in the editor. These events can include Git commits and local file saves.

1. Open a file in the editor.

1. In the Explorer view (`kb(workbench.view.explorer)`), expand the **Timeline** view.

1. Select an event to inspect the corresponding file changes.

![Screenshot showing Git commits and local file saves in the Timeline view.](images/overview/timeline-view.png)

Use the Timeline filter to show only Git commits or to include events from other timeline providers. Learn more about the [Timeline view](/docs/editing/getting-started/userinterface.md#timeline-view).

To compare two committed versions of the same file:

1. In the Timeline view, right-click a Git commit and select **Select for Compare**.

1. Right-click another Git commit for that file and select **Compare with Selected**.

The diff shows the first selected revision on the left and the second on the right. This compares file revisions, not all files in those commits. To identify who last changed a particular line in the current file, use [Git blame](#view-git-blame-information).

## View Git blame information

Git blame information identifies the commit and author that last changed a line. {% data variables.product.prodname_vscode_shortname %} can show this information in the editor and in the Status Bar.

<video src="images/staging-commits/git-blame.mp4" title="Video showing Git blame information in the Status Bar and inline in the editor." autoplay muted loop controls></video>

1. Open a tracked file and place the cursor on the line you want to inspect.

1. If inline blame is hidden, run **Git: Toggle Git Blame Editor Decoration** from the Command Palette (`kb(workbench.action.showCommands)`). Use **Git: Toggle Git Blame Status Bar Item** to show or hide the Status Bar version.

1. Hover over the blame decoration to view commit details.

The hover includes co-author trailers. If {% data variables.product.prodname_vscode_shortname %} adds [AI co-author attribution](/docs/sourcecontrol/staging-commits.md#ai-co-author-attribution) to a commit, the blame hover includes that attribution.

## Configure history views

### Configure the Source Control Graph

Use the `setting(scm.graph.showIncomingChanges)` and `setting(scm.graph.showOutgoingChanges)` settings to control whether incoming and outgoing commits appear. Use the `setting(scm.graph.pageSize)` setting to configure how many commits the graph loads initially and each time you load more.

### Customize blame information

* `setting(git.blame.statusBarItem.enabled)`: shows blame information in the Status Bar.
* `setting(git.blame.editorDecoration.enabled)`: shows blame information inline in the editor.
* `setting(git.blame.editorDecoration.disableHover)`: hides the blame hover in the editor.
* `setting(git.blame.ignoreWhitespace)`: ignores whitespace changes when Git determines line authorship.

Use the `setting(git.blame.editorDecoration.template)` and `setting(git.blame.statusBarItem.template)` settings to choose which commit details appear.

For example, the following template shows the commit subject, author name, and relative author date:

```json
{
  "git.blame.editorDecoration.template": "${subject}, ${authorName} (${authorDateAgo})"
}
```

Use the `git.blame.editorDecorationForeground` theme color to change the color of inline blame information.

## Next steps

* [Create or switch branches](/docs/sourcecontrol/branches-worktrees.md).
* [Review and commit working changes](/docs/sourcecontrol/staging-commits.md).
* [Fetch, pull, and push changes](/docs/sourcecontrol/repos-remotes.md).
