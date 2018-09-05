---
Order: 42
TOCTitle: Introducing GitHub Pull Requests for Visual Studio Code
PageTitle: Introducing GitHub Pull Requests for Visual Studio Code
MetaDescription: Introducing GitHub Pull Requests for Visual Studio Code
MetaSocialImage: /assets/blogs/2018/09/05/github_pr_hero.png
Date: 2018-09-05
ShortDescription: Introducing GitHub Pull Requests for Visual Studio Code
Author: Kenneth Auchenberg
---
# Introducing GitHub Pull Requests for Visual Studio Code

September 5, 2018 Kenneth Auchenberg, [@auchenberg](https://twitter.com/auchenberg)

Like many other open source projects, the [Visual Studio Code community collaborates](https://github.com/Microsoft/vscode) through [pull requests](https://github.com/Microsoft/vscode/pulls) to land fixes and new features. Since this past spring, our team has been working to bring you a new integrated pull request experience that enables you to collaborate, comment, review, and validate GitHub pull requests directly from Visual Studio Code.

Today, we are announcing the public preview of [GitHub Pull Requests for Visual Studio Code](https://github.com/Microsoft/vscode-pull-request-github/), closing a gap in the workflow that we and millions of engineers experience every day: The ability to review code where it was written – inside the editor.

![hero](github_pr_hero.png)

## Review and Manage Pull Request from within Visual Studio Code

The new GitHub Pull Requests extension is designed to help you review and manage pull requests (PR) from within Visual Studio Code, including:

- Ability to authenticate and connect Visual Studio Code to GitHub;
- List and browse PRs from within Visual Studio Code;
- Interact with PRs in-editor, including in-editor commenting with markdown support;
- Validate PRs from the editor with a new local `checkout and run` workflow for rich language features such as Go To Definition and IntelliSense; and
- Terminal integration that enables the Visual Studio Code UI and CLIs like `git` to co-exist.

![overview](github_pr_overview.png)

## Extension Built in Collaboration with GitHub

As part of our broader efforts to bring pull requests into Visual Studio Code in the past year, we reached out to numerous partners. After learning the GitHub Editor team was already thinking along these lines, we began work together in April to enable a new pull request experience in Visual Studio Code by creating a new extension that enables the workflow to create and review pull requests to be integrated directly into the Visual Studio Code through a set of new of Visual Studio Code extension APIs.

## A More Natural PR Experience

Today when reviewing code, many of us are forced to leave our editors to use a simplified web interface or third party review tool that presents changes in a different editor. This makes it easy to get a visual overview of the changes, but most of the time you don’t have full context of where the changes were made and how they affect surrounding code. Being outside of your normal coding environment also means that you don’t have your favorite keyboard shortcuts, themes, and customizations. More importantly, it means that you don’t have an environment with the power to navigate the code and validate that the changes you are reviewing actually work as expected.

The new pull request extension changes this by enabling a new “Pull Requests” explorer inside the source control sidebar in Visual Studio Code, that allows you to browse and interact with pull requests.

<iframe src="https://channel9.msdn.com/Events/Microsoft-Azure/Azure-DevOps-Launch-2018/A107/player" width="960" height="540" allowFullScreen frameBorder="0"></iframe>

## New open extension APIs in Visual Studio Code

Our new pull requests experience is powered by a set of new extension APIs that allow Visual Studio Code extension authors to write extensions that enable the concept of pull requests and their related metadata. This open extension model enables pull request providers to work just like our existing source control providers. This enables anyone to write an extension for Visual Studio Code that provides in-editor commenting and capabilities to review code hosted in their platform. You can see these new APIs in action in the [source code](https://github.com/Microsoft/vscode-pull-request-github/tree/master/src) for the GitHub Pull Requests extension.

Since the extension is using a set of cutting edge APIs that currently are in their proposed state, you’ll need to grab the [Insiders Edition of Visual Studio Code](https://code.visualstudio.com/insiders), as we are still maturing the these extension APIs. If you are interested, you can read more about how we are introducing new APIs, and the details for our [extension API process here](https://github.com/Microsoft/vscode/wiki/Extension-API-process).

## Going forward

We are excited about bringing pull requests into Visual Studio Code, as we believe it will simplify the way you review code. Our extension with GitHub is the first of a number of integrations with source control platform providers  on ways we can bring code reviews inside Visual Studio Code in meaningful ways.

Please try out the public preview of [GitHub Pull Requests for Visual Studio Code](https://github.com/Microsoft/vscode-pull-request-github), and as always, we are eager to hear your feedback, so don’t hesitate in reaching to us on [GitHub](https://github.com/Microsoft/vscode-pull-request-github) or [@code on Twitter](https://twitter.com/code).

One more thing, today we are also releasing Azure DevOps, and the new Azure Pipelines extension for the GitHub CI marketplace, visit for more information, https://aka.ms/azurecicd





//

[Kenneth Auchenberg (Microsoft)](https://twitter.com/auchenberg), Rachel Macfarlane (Microsoft), [Kai Maetzel (Microsoft)](https://twitter.com/kaimaetzel), [Peng Lyu (Microsoft)](https://twitter.com/njukidreborn)
, [Sarah Guthals (GitHub)](https://twitter.com/sarahguthals) and [Andreia Gaita (GitHub)](https://twitter.com/shana)

and on behalf of the Visual Studio Code team:


Happy Coding!