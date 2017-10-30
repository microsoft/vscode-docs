---
Order:
TOCTitle: Goodbye User Voice
PageTitle: Goodbye User Voice
MetaDescription: Visual Studio Code is closing User Voice in favor of GitHub reactions.
Date: 2016-08-23
ShortDescription: Visual Studio Code is closing User Voice in favor of GitHub reactions.
Author: Wade Anderson
---

# Goodbye User Voice, Hello GitHub Reactions!

August 23, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

## Feedback Channels

Visual Studio Code's [User Voice site](https://visualstudio.uservoice.com/forums/293070-visual-studio-code) has always been the place for the community to suggest and vote on feature requests for VS Code. The ability to see the requests with the top votes or the most activity has allowed us to prioritize the VS Code backlog and deliver many of the top requests over the past 18 months. For example, we’ve added [Extensions](https://visualstudio.uservoice.com/forums/293070-visual-studio-code/suggestions/9181439-plugins) (plugins), [Tabs](https://visualstudio.uservoice.com/forums/293070-visual-studio-code/suggestions/7752519-implement-tabs) (tabbed headings) and an [Integrated Terminal](https://visualstudio.uservoice.com/forums/293070-visual-studio-code/suggestions/7752357-integrated-terminal), all because of your feedback and participation in User Voice.

The challenge with User Voice is that it is a separate feedback channel for the team to monitor and maintain. Today we spend the majority of our time in [GitHub](https://github.com/Microsoft/vscode), but we also monitor [Twitter](https://twitter.com/code), [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode), and [Gitter](https://gitter.im/Microsoft/vscode) along with [User Voice](https://visualstudio.uservoice.com/forums/293070-visual-studio-code). The management of User Voice requests is labor intensive and we haven't been as responsive to the community as we'd like.

## GitHub Reactions

Recently, GitHub introduced the ability to [add reactions to issues](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). This feature replaces the key value proposition of User Voice, which has been the ability to vote on a request. It is now possible for the community to not only comment on an issue in GitHub, but also provide a thumbs up/thumbs down vote. This means we can use the same tools and workflows to sort and manage feature requests as we do to manage bugs.

![github reactions animation](github_reaction.gif)

## Retiring User Voice

As a result, we are "retiring" the [VS Code User Voice site](https://visualstudio.uservoice.com/forums/293070-visual-studio-code) and asking the community to submit and vote on issues in GitHub.  To ease the transition, we’ve decided to migrate the current [top 50 User Voice requests](https://github.com/Microsoft/vscode/issues/10715), as of 08/18/2016, to GitHub. We will triage these requests and migrate them to the appropriate repositories. If a feature request is more closely aligned with an extension and not the core VS Code product, we’ll move the request to an existing extension's repository or label it as an ["extension-candidate"](https://github.com/Microsoft/vscode/labels/extension-candidate).

If your request is not on this list or if you have a new request, please open a new GitHub issue following these [guidelines](https://github.com/Microsoft/vscode/blob/master/CONTRIBUTING.md). After you create an issue, we will run it through our [issue tracking](https://github.com/Microsoft/vscode/wiki/Issue-Tracking) workflow. The inbox tracker for the week assigns your issue to the team member who owns the relevant area of code. The owner will then assign the correct labels and ask for more information if necessary. During milestone planning, we review the open issues and assign the ones we plan to work on to a milestone.

Thank you again for your continuing feedback and hopefully this change will let us be more responsive and ultimately deliver more of the experiences you want and need in VS Code.

Happy Coding.

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)
