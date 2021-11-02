---
Order: 70
TOCTitle: Custom Notebooks
PageTitle: Notebooks, Visual Studio Code style
MetaDescription: Bringing Custom Notebook Experiences to the Visual Studio Code Extension Marketplace.
Date: 2021-11-02
Author: Tanha Kabir
---

# Notebooks, Visual Studio Code style

October 21, 2021 by Tanha Kabir, [@_tanhakabir](https://twitter.com/_tanhakabir)

**We revamped Notebooks in Visual Studio Code!** [Link to announcement blog.](blogs/2021/08/05/notebooks)

### First, what is a Notebook?

A Notebook is a code document that consists of Markdown cells, code cells, and corresponding output cells.

<image>

These output cells can be simple as plain text or complex like interactive graph visualizations.

<image>

The markdown can be as rich as markdown elsewhere on VS Code, so you can have images, links, lists, and more.

<image>

All this makes for a really useful storytelling device to explain the full context of the code and analysis you intended to do. Which was the original motivations from Donald Knuth in 1984 when he introduced the term "Literate Programming" for Notebook-like experiences.

Notebooks are currently used heavily in Data Science to iterate on and share ideas.

### Then what does revamping mean for Notebooks?

We made Notebooks a part of the core functionality of VS Code! This means we created several [Notebook APIs](api/extension-guides/notebook) to support creating Notebook experiences in VS Code.

Prior to these APIs, Jupyter Notebook support in VS Code was contributed soley from the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter). The extension created its Notebook experience within an isolated webview. Somewhat like an independent webpage within VS Code that doesn't talk with any of the other extensions you have installed.

However, now with the core [Notebook APIs](api/extension-guides/notebook), the Notebook interface comes from VS Code and isn't in an isolated webview. This means Notebook interfaces can now interact with the rest of the VS Code experience. Editor extensions like [Rainbow Indent](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) will work in the code cells of your Notebooks.

But we didn't want to limit these APIs to just Jupyter Notebook experiences. We believe that there are many other domains that can benefit from having a tool that's built to help you iterate and narrate your code. And so we made the new [Notebook APIs](api/extension-guides/notebook) public for any extension authors to use to craft their own Notebook experiences. We call these Custom Notebooks.

## Beginnings of a Notebook Extension Ecosystem

### GitHub Issues Notebook

The first experience we created in the team is the [GitHub Issues Notebook](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks): a Notebook to help us triage and organize the thousands of issues we have in GitHub. With this Notebook we can query multiple repos at once to find issues like finding all the issues labeled `bug` and assigned to me.

![A preview of the GitHub Issues Notebook we use on the team that's available in the vscode repo](github-issues-notebook.png)

You can find the Notebooks we use for triaging in the [VS Code repo under `.vscode/notebooks`](https://github.com/microsoft/vscode/tree/main/.vscode/notebooks).

[GitHub Issues Notebook is avaliable in the marketplace]((https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks)) for anyone to use. You can try it out by installing the extension, creating a file for your Notebook with a `.github-issues` ending such as `my-notebook.github-issues`, and finally creating any query such as:

```
$repo=repo:microsoft/vscode-github-issue-notebooks
$repo is:open no:assignee

```

The languge is the Notebook used to query is almost the same as the one your use to query issues on GitHub.com. This language in the GitHub Issues Notebook, however. allows you to make variables and use them in any other cell.

### REST Book

Inspired by the querying experience in the GitHub Issues Notebook, I created [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) on my first week on the VS Code team. REST Book allows you to make HTTP calls in a Notebook. I found REST Book useful to iterate on my projects with a server by being able to make multiple calls over time and compare the results easily on one page. I also used REST Book Notebooks to set up some manual testing of my project with some documentation around the test cases.

![A preview of the REST Book being used in a project with an Express App](rest-book.png)

This extension is also live on the marketplace today. You can install the [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) extension, create a file with a `.restbook` ending, and then perform any HTTP query like `GET github.com`.

Developing REST Book seemed complicated to me at first, but with the large number of VS Code APIs available, programming and creating REST Book was much easier than I expected. Most notably, I used the language APIs heavily for syntax highlight and auto-completions for my custom REST querying language. Then with the Notebook APIs, I just needed to fill in what should be done when the user of my extension wants to run a query.

For both of these Notebooks, it was great to leverage the VS Code Notebook UI to create these REPL-like experiences. We didn't have to mess around with creating and then having to maintain a UI; we could focus on just the functionality.

### Make your own custom notebook extension

The VS Code team recorded a livestream several months back about Custom Notebooks and in it I showcased in a live demo what it's like to create a Custom Notebook extension. You can watch it here on Youtube: [VS Code Notebooks: A Deep Dive](https://youtu.be/D-AXZZDTQhM). Some of the exact code has changed since the video but the principles are still the same. For the most up to date code, you can look at the [Notebook API docs]((api/extension-guides/notebook)).

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D-AXZZDTQhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

We hope this is just the beginning! We're excited to see what Custom Notebook experiences you all create!


Happy Coding!

Tanha Kabir ([@_tanhakabir](https://twitter.com/_tanhakabir)) , and the VS Code Team ([@code](https://twitter.com/code))











