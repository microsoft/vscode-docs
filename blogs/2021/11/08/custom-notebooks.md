---
Order: 70
TOCTitle: Custom Notebooks
PageTitle: Notebooks, Visual Studio Code style
MetaDescription: Bringing Custom Notebook Experiences to the Visual Studio Code Extension Marketplace.
Date: 2021-11-08
Author: Tanha Kabir
---

# Notebooks, Visual Studio Code style

November 8, 2021 by Tanha Kabir, [@_tanhakabir](https://twitter.com/_tanhakabir)

Notebooks are documents that contain a mix of rich markdown, executable code snippets, and accompanying rich output. These are all separated into distinct cells and can be interleaved in any order.

![An example Notebook showing code cells, markdown, and a rich graph output](notebook.png)

If you aren't familiar with Notebooks you might be familiar with REPLs? A REPL is an interactive application where you can write a few lines of code and execute them immediately for some output. And Notebooks are the epitome of REPLs; they're an easy to create an environment that let's you iterate and work on small chunks of code.

But not only are they great REPLs, they're also great storytelling devices since they allow you to interleave rich Markdown that can have images, math equations, and everything else you're used to from rich Markdown in the rest of VS Code. Perfect for sharing your ideas with your coworkers or a public community.

The most popular form of Notebooks today are Jupyter Notebooks, these are Notebooks that are geared towards the Data Science community with rich Python support. They also support other languages like Julia or R through Jupyter Kernels: executables that follow a certain protocol that are installed on your machine and run code for you from your Notebooks. VS Code had been supporting Jupyter Notebooks for several years now.

A couple months ago, the VS Code team published a blog post announcing tha Notebooks in VS Code got a huge revamp. [Link to announcement blog.](blogs/2021/08/05/notebooks).


### What does revamping mean for Notebooks in VS Code?

We made Notebooks a part of the core functionality of VS Code! This means there are now [Notebook APIs](api/extension-guides/notebook) available in the VS Code extension APIs to support extension authors to create Notebook experiences in VS Code. Anyone can make a executable Notebook extension for VS Code that can support custom languages and custom rich outputs. The experience of creating these Notebooks for VS Code will be no different than creating any other extension.

Prior to these APIs, Jupyter Notebook support in VS Code was contributed solely from the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter). The extension created its Notebook experience within an isolated webview, somewhat like an independent webpage within VS Code that doesn't talk with any of the other extensions you have installed.

However, now with the core [Notebook APIs](api/extension-guides/notebook), the Notebook interface comes from VS Code and isn't in an isolated webview. This means Notebook interfaces can now interact with the rest of the VS Code experience. Editor extensions like [Rainbow Indent](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) will work in the code cells of your Notebooks.

But we didn't want to limit these APIs to just Jupyter Notebook experiences. We believe that there are many other domains that can benefit from having a tool that's built to help you iterate and narrate your code. And so we made the new [Notebook APIs](api/extension-guides/notebook) public for any extension authors to use to craft their own Notebook experiences. We call these Custom Notebooks.

## Beginnings of a Notebook Extension Ecosystem

### GitHub Issues Notebook

The first experience we created in the team is the [GitHub Issues Notebook](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks): a Notebook to help us triage and organize the thousands of issues we have in GitHub. With this Notebook we can query multiple repos at once to find issues like finding all the issues labeled `bug` and assigned to me. The VS Code team uses this Notebook on a daily basis to process all the issues across the many repos the team works on.

![A preview of the GitHub Issues Notebook we use on the team that's available in the vscode repo](github-issues-notebook.png)

You can find the Notebooks we use for triaging in the [VS Code repo under `.vscode/notebooks`](https://github.com/microsoft/vscode/tree/main/.vscode/notebooks). There's one called `inbox.github-issues` where a VS Code team member uses this Notebook to triage many newly filed issues to their appropriate area and assignee.

[GitHub Issues Notebook is avaliable in the marketplace]((https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks)) for anyone to use. You can try it out by installing the extension, creating a file for your Notebook with a `.github-issues` ending such as `my-notebook.github-issues`, and finally creating any query such as:

```
$repo=repo:microsoft/vscode-github-issue-notebooks
$repo is:open no:assignee

```

The languge is the Notebook used to query is almost the same as the one your use to query issues on GitHub.com. This language in the GitHub Issues Notebook, however. allows you to make variables and use them in any other cell.

You can view the source code for the [GitHub Issues Notebook here on GitHub.com](https://github.com/microsoft/vscode-github-issue-notebooks).

### REST Book

Inspired by the querying experience in the GitHub Issues Notebook, I created [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) on my first week on the VS Code team. REST Book allows you to make HTTP calls in a Notebook. I found REST Book useful to iterate on my projects with a server by being able to make multiple calls over time and compare the results easily on one page. I also used REST Book Notebooks to set up some manual testing of my project with some documentation around the test cases.

![A preview of the REST Book being used in a project with an Express App](rest-book.png)

This extension is also live on the marketplace today. You can install the [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) extension, create a file with a `.restbook` ending, and then perform any HTTP query like `GET github.com`.

Developing REST Book seemed complicated to me at first, but with the large number of VS Code APIs available, programming and creating REST Book was much easier than I expected. Most notably, I used the language APIs heavily for syntax highlight and auto-completions for my custom REST querying language. Then with the Notebook APIs, I just needed to fill in what should be done when the user of my extension wants to run a query.

You can view the source code for the [REST Book here](https://github.com/tanhakabir/rest-book).

For both of these Notebooks, it was great to leverage the VS Code Notebook UI to create these REPL-like experiences. We didn't have to worry about creating and then having to maintain a UI; we could focus on just the functionality.
## Make your own custom notebook extension

### Watch a coding tutorial

The VS Code team recorded a livestream several months back about Custom Notebooks and in it I showcased in a live coding demo of what it's like to create a Custom Notebook extension. You can watch it on Youtube: [VS Code Notebooks: A Deep Dive](https://youtu.be/D-AXZZDTQhM). Some of the exact code has changed since the video but the principles are still the same.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D-AXZZDTQhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For the most up to date and detailed code for when you're ready to build your own Notebook extension, you can reference the [Notebook API docs]((api/extension-guides/notebook)).

### Bring your ideas to the community

If you aren't as interested in creating your own Notebook extension but have ideas you want to be made, we encourage you to tweet Notebook ideas at the VS Code Twitter account, [@code](https://twitter.com/code), or make issues in the [VS Code GitHub repository](https://github.com/microsoft/vscode) with your Notebook ideas. Then the VS Code community can read and chime in on your Notebook and eventually inspire folks to make your Notebook idea a reality!

We hope the few Notebooks we covered in this blog is just the beginning! We're excited to see what Custom Notebook experiences you all will inspire and create!


Happy Coding!

Tanha Kabir ([@_tanhakabir](https://twitter.com/_tanhakabir)) , and the VS Code Team ([@code](https://twitter.com/code))











