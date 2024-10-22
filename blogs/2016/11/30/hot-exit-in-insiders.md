---
Order:
TOCTitle: Hot Exit Comes to Insiders
PageTitle: Hot Exit Comes to Insiders
MetaDescription: Unsaved changes are now remembered between Visual Studio Code sessions.
MetaSocialImage: /assets/blogs/2016/11/30/opengraph_insiders.png
Date: 2016-11-30
ShortDescription: Unsaved changes are now remembered between Visual Studio Code sessions.
Author: Daniel Imms
---

# Hot Exit Comes to Insiders

November 30, 2016 by Daniel Imms, [@Tyriar](https://twitter.com/Tyriar)

The ability to have Visual Studio Code remember unsaved changes when you exit (hot exit) has been a long requested feature, in fact it's currently [number #3](https://github.com/microsoft/vscode/issues/101) in terms of 👍 reactions on GitHub. We've been working on an implementation for some time and it is now enabled by default in the Insiders build!

## Initial design

We initially considered tying backups to an opened folder so that once VS Code was closed, that same folder would have to be opened again in order to trigger the hot exit restore. The main issue with this approach was that backups could potentially go "missing"; the backups are still around but the user may have forgotten which folder they were in when they made the changes.

## Restricting to entire application shutdown

It was due to this fear of having backups persisted but not be discoverable that we decided to add a restriction to when a hot exit occurs: Hot exit will only occur when *all* VS Code windows are being closed, or in the case of Mac, the application is quit (`kbstyle(Cmd+Q)`).

While this may seem restricting at first, particularly when you frequently work on multiple folders, the great thing is that *all* of the workspaces with backups will be presented when you relaunch VS Code and so there is no ambiguity as to what else could be backed up.

The important exception to this restriction is that when a window is reloaded then hot exit will always trigger. This means no more annoying Save dialog when installing extensions!

## Crash protection

The way hot exit works is to periodically make backups of unsaved files. If VS Code happens to crash, a backup restore will occur the next time the folder is opened.

## Looking forward

Hot exit will be coming to the Stable build in the November/December update (1.8.0).

After that, we want to look into how best to loosen the restrictions for when a hot exit is triggered while at the same time ensuring backups don't go missing ([#15467](https://github.com/microsoft/vscode/issues/15467)). The solution to this largely depends on how VS Code will handle multiple folder workspaces ([#396](https://github.com/microsoft/vscode/issues/396)).

[#HappyCoding](https://twitter.com/hashtag/HappyCoding?src=hash)

Daniel Imms, VS Code Team Member <br>
[@Tyriar](https://twitter.com/Tyriar)
