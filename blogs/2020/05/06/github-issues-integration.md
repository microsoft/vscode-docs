---
Order: 56
TOCTitle: GitHub Issues Integration
PageTitle: Working with GitHub Issues in Visual Studio Code
MetaDescription: Working with GitHub Issues in Visual Studio Code
Date: 2020-05-06
Author: Alex Ross
MetaSocialImage:
---
# Introducing GitHub Issues Integration

May 6, 2020 by Alex Ross, [@alexr00](https://github.com/alexr00/)

On the Visual Studio Code team, we use GitHub [issues](https://github.com/microsoft/vscode/issues) to track all of our work. From our detailed [iteration plans](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Aiteration-plan) to individual bugs, we track everything as GitHub issues. Given how important issues are to our team and other GitHub projects, we wanted to add GitHub issues integration to VS Code. This addition complemented the GitHub Pull Request work we [announced](https://code.visualstudio.com/blogs/2018/09/10/introducing-github-pullrequests) over a year ago. Starting with VS Code version 1.45, this new support to move the issues and source code closer together will be available in the [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension (formerly named GitHub Pull Requests).

## Our integration approach

Issues and pull requests often go hand in hand, so including them in the same [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension was a logical step as much of the same [GitHub API](https://developer.github.com/v4/) is needed for both issues and pull requests. We did not want to add GitHub functionality directly to the core VS Code editor because there are many source control options. Instead, we will recommend the extension when we detect that a user's open repository uses GitHub. By working with our own [extension API](https://code.visualstudio.com/api/references/vscode-api), we ensure the API has the features that extension authors need, and other repository providers can implement similar integration.

It was important that we not prescribe overly specific workflows. Instead, our goal was to bring issues into the inner development loop in a flexible way. For example, giving more context for an issue in a code comment is part of that goal, but adding full issue management into VS Code doesn't fit as well. We don't want to reinvent UI that GitHub already does well. We **do** want to make connections that aren't already there.

## Issues in the code context

Linking to issues in source code is a normal part of our workflow, especially when there's some logic that's difficult to understand or when there's a //TODO comment that needs action. If you do a [search for issue references](https://github.com/microsoft/vscode/search?q=%22Microsoft%2Fvscode%2Fissues%22) in the VS Code repo, you'll see plenty of issues mentioned. While linking gives a pointer to more information, to actually learn more you need to leave the editor. Now, by gaining this issue context through hovers, you don't need to break your flow to learn more.

![Issue Hover](issue-hover.png)

Issue hovers work on full issue URLs, issue comment URLs, issues referenced by number (`#1234`), and issues referenced by `owner/repository#1234` (for example `Microsoft/vscode#1234`). We also often reference users in our codebase. The VS Code [proposed API](https://github.com/microsoft/vscode/blob/d8317abc50e347d76fd471f5a070996cc7f73e20/src/vs/vscode.proposed.d.ts) has many developer references to make it obvious who's responsible for the proposals.

![User Hover](user-hover.png)

Issue context is typically needed in commit messages to reference an issue the commit resolves, within source code files, and in Markdown (such as a changelog). To easily add this context, we have added completion suggestions for issues and users. In the Git commit textbox, you can format your issue completion with the `githubIssues.issueCompletionFormatScm` setting. In Markdown files, issues complete as a Markdown link, and in other files, issues complete as a simple issue number (`#1234`).

![Completion Suggestions](completion-suggestions.gif)

The list of possible issues is configurable with the setting `githubIssues.queries`, so if you work across multiple repositories, you can include queries for those issues. The queries use the [GitHub search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax). The list of users includes the collaborators in the currently open repository.

![Issue Queries](issue-queries.png)

## Creating an issue from anywhere

When we find a bug in VS Code while working on some source code, we create an issue and assign it to whoever owns that area. Or, if the finder of the bug is also the owner, we'll often leave a //TODO comment as a reminder to come back to it. Having //TODOs scattered throughout the codebase is hard to keep track of when you have many contributors (though it's safe to say that we've all done it), but creating an issue and referencing it in the //TODO is trackable. To reduce the barrier and context loss when creating an issue while you're deep in the source, there are a few new ways to create issues:

From a //TODO comment (configurable with `githubIssues.createIssueTriggers`), you can create and assign an issue without leaving VS Code.

![Create Issue from TODO](create-from-todo.gif)

And from a selection, you can quickly create an issue with a permalink back to the source code where it originated, using the **GitHub Issues: Create Issue from Selection** command. If you just need a pointer to some code, you can also use the **GitHub Issues: Copy GitHub Permalink** command. Finally, if there is failure information in the terminal, you can just copy the output to the clipboard and create an issue using **GitHub Issues: Create Issue from Clipboard**.

## Working on issues

A common workflow is to look at your issues, pick one to work on, create a branch to work in, make some commits, then merge your changes back into main with a pull request. From the new **Issues** view, you can do exactly that.

![Work on an Issue](work-on-issue.gif)

To fit more workflows, there are several options you can configure. If your flow doesn't involve creating a topic branch, you can disable the branch creation with `githubIssues.useBranchForIssues`. If you have a different naming scheme for your branches, you can use the `githubIssues.issueBranchTitle` setting. The issues listed in the **Issues** view can be configured to use a custom query with `githubIssues.queries`.

## Want to learn more?

You can watch this **What every GitHub user should know about VS Code** talk from [GitHub Satellite](https://githubsatellite.com) by Sana Ajani, [@sana_ajani](https://twitter.com/sana_ajani), and Burke Holland, [@burkeholland](https://twitter.com/burkeholland).

<iframe src="https://www.youtube.com/embed/T6sW1Dk9B4E?rel=0&amp;disablekb=0&amp;modestbranding=1&amp;showinfo=0" frameborder="0" allowfullscreen title="What every GitHub user should know about VS Code"></iframe>

---

You can also read the [Working with GitHub](/docs/sourcecontrol/github.md) topic, which describes VS Code's GitHub integration in more detail.

## Going forward

Currently, most of these features are only supported in repository clones (not forks), so there is more work to be done to support that and other use cases. We would love to see your feedback for this extension, so feel free to leave us a suggestion in the issues in the extension [repo](https://github.com/microsoft/vscode-pull-request-github/issues)!

Happy Coding!

Alex Ross, VS Code developer
[@alexr00](https://github.com/alexr00)
