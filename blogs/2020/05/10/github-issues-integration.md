---
Order: 56
TOCTitle: GitHub Issues Integration
PageTitle: Working with GitHub Issues in VS Code
MetaDescription: Working with GitHub Issues in VS Code
Date: 2020-05-10
Author: Alex Ross
MetaSocialImage:
---
# Working with GitHub Issues in VS Code

May 10, 2020 by Alex Ross, [@alexr00](https://github.com/alexr00/)

On the VS Code team, we use [issues](https://github.com/microsoft/vscode/issues) to track all of our work. From our long [iteration plans](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Aiteration-plan) to individual bugs, all of them are tracked as GitHub issues. Because of how much we and other projects on GitHub work with issues every day, we've added GitHub issue integration to the [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)(formerly named GitHub Pull Requests) to move the issues and the code closer together.

## Our Approach

Issues and pull requests often go hand in hand, so including them in the same [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) was a logical step since a lot of the same [GitHub API](https://developer.github.com/v4/) is needed for both issues and pull requests. We wanted to keep it as an installable extension, as GitHub use isn't ubiquitous across VS Code users, and by using our own [extension API](https://code.visualstudio.com/api/references/vscode-api) we're continuing to make sure it has the features that extensions need.

It was important that we not proscribe overly specific workflows. Instead, our goal was bring issues into the inner loop. For example, giving more context for an issue in a code comment is part of that goal, but adding full issue management into VS Code doesn't fit as well. We don't want to reinvent UI that GitHub already does well. We *do* want to make connections that aren't already there.

## Gaining Context

Linking to issues in code is a normal part of our workflow, especially when there's some logic that's difficult to understand or when there's a "todo" comment that needs action. If you do a [search for issues](https://github.com/microsoft/vscode/search?q=%22microsoft%2Fvscode%2Fissues%2F%22&unscoped_q=%22microsoft%2Fvscode%2Fissues%2F%22) in the VS Code repo you'll see some of them. While linking gives a pointer to more information, to actually learn more you need to leave you editor. By gaining this issue context through hovers, you don't need to break your flow to learn more.

![Issue Hover](issue-hover.png)

Issue hovers work on full issue urls, issue comment urls, issues reference by #1234, and issues reference by owner/repository#1234. We also often reference users in our codebase. Our [proposed API](https://github.com/microsoft/vscode/blob/d8317abc50e347d76fd471f5a070996cc7f73e20/src/vs/vscode.proposed.d.ts) has many of these references to make it obvious who's responsible for the proposals.

![User Hover](user-hover.png)

To make adding this context easier we have completion suggestions for issues and users. The list of possible issues is configurable with the setting `"githubIssues.queries"`, so if you work accross multiple repositories you can include queries for those issues. The list of users are the users who are collaborators in the currently open repository.

![Completion Suggestions](completion-suggestions.gif)

## Starting from Anywhere

When we find a bug in VS Code while working on some source we create an issue and assign it to whoever owns that area. Or, if the finder of the bug is also the owner, we'll often leave a "todo" comment as a reminder to come back to it. Having todos scattered throughout code is hard to keep track of when you have many contributors (though it's safe to say that we've all done it), but creating an issue and referencing it in the todo is trackable. To reduce the barrier and context loss for creating an issue while you're deep in the source there are a few new ways to create issues:

From a "todo" comment (configurable with `githubIssues.createIssueTriggers`) you can create and assign an issue without leaving VS Code.

![Create Issue from TODO](create-from-todo.gif)

And from a selection, you can quickly create an issue with a permalink back to the code it originated from using the **GitHub Issues: Create Issue from Selection** command. If you just need a pointer to some code, you can also use the **GitHub Issues: Copy GitHub Permalink** command.

## Working on Issues

A common work flow is to look at your issues, pick one to work on, create a branch to work in, make some commits, then merge your changes back into master. From the new Issues view you can do exactly that.

![Work on an Issue](work-on-issue.gif)

To fit more workflows there are several options you can configure. If your flow doesn't involve creating a topic branch, you can disable the branch creation with `"githubIssues.useBranchForIssues"`. If you have a different naming scheme for your branches you can use the `"githubIssues.workingIssueBranch"` setting. The issues listed in the Issues view can be configured to use a custom query with `"githubIssues.queries"`.

## Going Forward

Currently, most of these features are only supported in repository clones (not forks), so there is more work to be done to support that and other usecases. The complete GitHub integration is documented [here](https://code.visualstudio.com/docs/editor/github) and it will continue to expand as we add new feature and polish existing ones.

Happy Coding!

Alex Ross, VS Code developer
[@alexr00000](https://twitter.com/alexr00000)