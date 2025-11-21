---
ContentId: 344271ac-56df-4cea-b0a9-2c135f7f3dec
DateApproved: 11/12/2025
MetaDescription: Master Git staging and commits in VS Code with granular file control, AI-powered commit messages, visual diff reviews, and comprehensive change tracking tools.
---
# Staging and committing changes

Creating focused commits with clear descriptions helps you and your team understand the history of your codebase. VS Code provides integrated Git tools for staging changes and creating commits, with support for granular control over which changes to include.

This article covers the staging and commit workflow in VS Code, from Git's two-step process to using AI assistance for commit messages and reviewing changes before committing.

## Git workflow

Git uses a two-step process to save your work: staging and committing. When you modify files, Git tracks these changes but doesn't automatically include them in your next commit. Staging lets you select which changes to include in each commit.

Think of staging as preparing a snapshot of your work. You can stage all changes at once for a comprehensive commit, or stage specific files and even individual lines to create focused, logical commits that are easier to review and understand later.

## View changes

The Source Control view (`kb(workbench.view.scm)`) is your central hub for managing changes in your Git repository. Changes are organized into two sections based on their staging status:

* **Changes**: lists all modified, added, or deleted files that are not yet staged for commit
* **Staged Changes**: lists files that have been staged and are ready to be committed

![Screenshot of the Source Control view showing a modified and new file under Changes.](images/staging-commits/view-changes.png)

Notice that changed files are listed with a "U" (untracked), "M" (modified), or "D" (deleted) icon next to them to indicate the type of change. This change indicator is also shown in the Explorer view and in the editor tab title for modified files.

The source control icon in the Activity Bar also shows a badge with the number of affected files to give you a quick overview of your uncommitted changes.

> [!TIP]
> You can view the list of changes in either a flat or tree structure. Toggle this with the **More Actions** (**...**) > **View & Sort** > **View as Tree/List** option in the Source Control view toolbar.

### Editor gutter indicators

To help you quickly identify changes in your files, VS Code shows gutter indicators in the editor next to the line number to represent added, modified, or deleted lines since your last commit. You can also see these indicators in the [minimap](/docs/getstarted/userinterface.md#minimap).

The gutter color indicates the type of change:

* **Green bar**: new lines added since the last commit
* **Blue bar**: lines modified since the last commit
* **Red triangle**: lines deleted (shown above the deletion point)

When you select the gutter indicator, an inline diff preview of your changes appears. You can stage or revert changes directly from this preview using the corresponding buttons.

![Screenshot of editor gutter indicators showing line changes and a hover showing Git blame information.](images/staging-commits/gutter-diff-preview.png)

You can customize the gutter indicator behavior with these settings:

* `setting(scm.diffDecorations)`: control when diff decorations appear (all, gutter, overview, minimap, or none)
* `setting(scm.diffDecorationsGutterAction)`: control the actions available in the gutter menu
* `setting(scm.diffDecorationsGutterPattern)`: customize the pattern used for gutter decorations
* `setting(scm.diffDecorationsGutterVisibility)`: control when to show gutter decorations (always or on hover)
* `setting(scm.diffDecorationsGutterWidth)`: set the width of the gutter indicator
* `setting(scm.diffDecorationsIgnoreTrimWhitespace)`: ignore whitespace changes in diff decorations

## Staging changes

Staging changes prepares them for adding to your next commit. You can stage entire files or specific lines and code blocks for more granular control.

To stage individual files, hover over them in the **Changes** list and select the **+** (plus) icon, or right-click the file and select **Stage Changes**. You can also drag files from the **Changes** section and drop them into the **Staged Changes** section to stage them.

![Screenshot of staging changes in the Source Control view.](images/staging-commits/stage-changes.png)

When you're using the tree view, you can stage entire folders by staging the folder itself. To stage all modified files at once, hover over the **Changes** header and select the **+** (plus) icon.

There are more specialized staging actions available in the Command Palette (`kb(workbench.action.showCommands)`). Type "Git: Stage" to see options for staging files.

### Stage specific lines or code blocks

Instead of staging entire files, you can also stage specific parts of a file. Partial staging enables you to create focused commits. For example, if you've made formatting changes and bug fixes in the same file, you can commit them separately with appropriate commit messages.

You can perform partial staging from the diff editor:

1. Select a file in the **Changes** list to open the [diff editor](#review-changes-with-the-diff-editor)

1. Select the lines you want to stage

1. Use the **Stage** button in the gutter of the diff editor next to your selection to stage only those lines

    ![Screenshot of staging specific lines from the diff editor.](images/staging-commits/stage-specific-lines.png)

    You can also right-click the selection and choose **Stage Selected Ranges** or run **Git: Stage Selected Ranges** from the Command Palette.

### Unstage changes

To remove files from staging, hover over them in the **Staged Changes** list and select the **-** (minus) icon, or right-click and choose **Unstage Changes**. The files move back to the **Changes** section without losing your modifications.

![Screenshot of unstaging changes in the Source Control view.](images/staging-commits/unstage-changes.png)

Similarly, you can also unstage specific lines or code blocks from the diff editor using the **Unstage** button in the gutter next to your selection.

## Commit your changes

Once you've staged your changes, you can create a commit to save them to your local repository. To create a commit, you need to write a commit message that describes the changes. This message helps you and others understand the purpose of the commit when reviewing the commit history.

### Write commit messages

A commit message describes the changes you're committing and helps others (and your future self) understand the purpose of the commit. Type your message in the commit message input box at the top of the Source Control view and select **Commit** to save your staged changes.

To help you write a commit message, select the sparkle icon <i class="codicon codicon-sparkle"></i> in the commit message input box to use AI to generate the message based on your staged changes. You can [create custom instructions](/docs/copilot/customization/custom-instructions.md#specify-custom-instructions-in-settings) to guide the AI in generating messages.

![Screenshot of generating a commit message with AI.](images/staging-commits/generate-commit-message.png)

If you want to write commit messages with multiple paragraphs, you can use a full editor instead of the input box. Enable this with the `setting(git.useEditorAsCommitInput)` setting. When you commit changes without a commit message, a new editor tab opens for you to write your message.

> [!TIP]
> To cycle through your previous commit messages, press `kb(history.showPrevious)` and `kb(history.showNext)` while focused in the commit message input box.

### Commit changes

Select the **Commit** button in the Source Control view to commit the changes in the **Staged Changes** section. Any unstaged changes remain in the **Changes** section for future commits.

To commit all changes (staged and unstaged) at once, select the **More Actions** (**...**) menu and choose **Commit** > **Commit All**. This stages and commits all modified files in one step.

### Amend the previous commit

If you need to modify your most recent commit, you can amend it instead of creating a new commit. This is useful for adding forgotten changes or correcting the commit message.

To amend a commit, select the **Commit** button dropdown and select **Commit (Amend)**, or use the **Commit Staged (Amend)** option from the **More Actions** (**...**) menu.

> [!NOTE]
> Only amend commits that haven't been pushed to a shared repository. Amending pushed commits rewrites history and can cause issues for other collaborators.

### Undo the last commit

If you need to undo your last commit, select the **More Actions** (**...**) menu in the Source Control view, then choose **Commit** > **Undo Last Commit**. This removes the last commit from your branch history but keeps all the changes from that commit staged in the **Staged Changes** section.

### Discard changes

To completely discard uncommitted changes and revert a file to its last committed state, right-click the file in the Source Control view and select **Discard Changes**. Alternatively, hover over the file in the **Changes** list and select the discard icon (a curved arrow pointing left).

Discarded changes are moved to the Recycle Bin (Windows) or Trash (macOS/Linux), giving you a chance to recover them if needed.

## Review changes with the diff editor

The diff editor shows what changed in your files. It displays side-by-side comparisons of the original and modified versions. The diff editor can open in side-by-side or inline view.

To open the diff editor, select any file in the Source Control view **Changes** or **Staged Changes** lists to see the changes for that file versus the last committed version.

> [!TIP]
> For large files, collapse the unchanged sections by selecting the **Collapse Unchanged Regions** button in the diff editor toolbar. This helps you focus on the actual changes. You can also quickly navigate between changes using the **Next Change** and **Previous Change** buttons.

### Side-by-side vs inline view

By default, the diff editor shows a side-by-side comparison with the original file on the left and your changes on the right.

![Screenshot of the Diff Editor showing side-by-side changes between file versions.](images/staging-commits/diff-editor.png)

Toggle to inline view by selecting **More Actions** (**...**) > **Inline View** in the diff editor toolbar to view changes within one editor.

![Screenshot of the Diff Editor showing inline changes between file versions.](images/staging-commits/diff-editor-inline.png)

Configure your preferred default view with the `setting(diffEditor.renderSideBySide)` setting.

### Stage and revert from the diff editor

The diff editor includes a gutter with **Stage** and **Revert** buttons next to each change. These buttons let you:

* Stage individual code blocks or lines directly from the diff view
* Revert specific changes without affecting other modifications

If you select specific lines in the diff editor, the buttons operate only on your selection.

You can hide the diff editor gutter with the `setting(diffEditor.renderGutterMenu)` setting.

### Accessible diff viewer

For screen reader users, VS Code provides the Accessible Diff Viewer, which presents changes in a unified patch format. To open the Accessible Diff Viewer, use the **More Actions** (**...**) menu in the diff editor toolbar and select **Open Accessible Diff Viewer** or use the `kb(editor.action.accessibleDiffViewer.next)` keyboard shortcut.

Navigate through changes with **Go to Next Difference** (`kb(editor.action.accessibleDiffViewer.next)`) and **Go to Previous Difference** (`kb(editor.action.accessibleDiffViewer.previous)`) commands.

## Review code changes with AI

VS Code enables you to review your uncommitted changes using AI assistance before committing them. These AI features complement manual code review and help catch problems early in your development workflow.

To perform an AI-powered code review of your uncommitted changes:

1. Select the **Code Review** button in the Source Control view

    ![Screenshot of the Code Review button in the Source Control view.](images/staging-commits/copilot-code-review.png)

1. VS Code analyzes your changes and generates review comments and suggestions, which appear as overlay comments in the editor

    ![Screenshot of the code review results, showing as editor overlay comments.](images/staging-commits/copilot-code-review-results.png)

## Git blame information

VS Code can show git blame information inline in the editor and in the Status Bar. Hover over the Status Bar item or editor inline hint to view detailed git blame information.

<video src="images/staging-commits/git-blame.mp4" title="Video showing Git blame information in the Status Bar and inline in the editor." autoplay muted loop></video>

To enable or disable git blame information, use the **Git: Toggle Git Blame Editor Decoration** and **Git: Toggle Git Blame Status Bar Item** commands, or configure these settings:

* `setting(git.blame.statusBarItem.enabled)` (enabled by default)
* `setting(git.blame.editorDecoration.enabled)`

You can customize the format of the message that is shown in the editor and in the Status Bar with the `setting(git.blame.editorDecoration.template)` and `setting(git.blame.statusBarItem.template)` settings. You can use variables for the most common information.

For example, the following template shows the subject of the commit, the author's name, and the author's date relative to now:

```json
{
  "git.blame.editorDecoration.template": "${subject}, ${authorName} (${authorDateAgo})"
}
```

To adjust the color of the editor decoration, use the `git.blame.editorDecorationForeground` theme color.

## Graph view for commit history

The Source Control Graph in the Source Control view provides a visual representation of your commit history and branch relationships. When you have a remote repository configured, you can see how many commits you are ahead or behind the remote.

The graph contains the current branch, the current branch's upstream branch, and an optional base branch. The root of the graph is the common ancestor of these branches.

![Screenshot showing the Source Control Graph.](images/staging-commits/source-control-graph.png)

The graph provides the following functionality:

* Select an entry to see the files that are changed in that commit. Select the **Open Changes** action to see the diff of the commit in the editor.
* Right-click on a commit to perform actions such as checkout, cherry-pick, adding it as context to chat, and more.
* Select a file to see the diff of that file in the editor.
* Select a commit and compare it with another branch or tag by right-clicking the commit and selecting **Compare with**, **Compare with Remote**, or **Compare with Merge Base**.

Use the actions in the Graph view tool bar to select the branch, fetch, pull, push, and sync changes.

## Timeline view for file history

The Timeline view, accessible at the bottom of the File Explorer, is a unified view for visualizing the events history for a file. For example, you can view Git commits or local file saves in a timeline view.

![Screenshot of the timeline view showing file commit history.](images/overview/timeline-view.png)

Learn more about the [Timeline view](/docs/getstarted/userinterface.md#timeline-view).

## Next steps

* [Repositories and Remotes](/docs/sourcecontrol/repos-remotes.md) - Learn about cloning, publishing, and syncing with remote repositories
* [Source Control Overview](/docs/sourcecontrol/overview.md) - Explore other Git features like branching and merging
* [Working with GitHub](/docs/sourcecontrol/github.md) - Learn how to work with pull requests and issues
* [Copilot in VS Code](/docs/copilot/overview.md) - Discover more AI-powered development features
