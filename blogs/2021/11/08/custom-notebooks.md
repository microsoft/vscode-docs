---
Order: 70
TOCTitle: Custom Notebooks
PageTitle: Notebooks, Visual Studio Code style
MetaDescription: Bringing custom notebook experiences to the Visual Studio Code extension Marketplace.
Date: 2021-11-08
Author: Tanha Kabir
---

# Notebooks, Visual Studio Code style

November 8, 2021 by Tanha Kabir, [@_tanhakabir](https://twitter.com/_tanhakabir)

Notebooks are documents that contain a mix of rich Markdown, executable code snippets, and accompanying rich output. These are all separated into distinct cells and can be interleaved in any order.

![An example notebook showing code cells, Markdown, and a rich graph output](notebook.png)

If you aren't familiar with notebooks, you might be familiar with REPLs ([read-eval-print loop](https://wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop))? A REPL is an interactive application where you can write a few lines of code and execute the code immediately and see the output. Notebooks are the epitome of a REPL and let you quickly create an environment where you can iterate and work on small chunks of code.

Notebooks are not only great REPLs, they are also great storytelling devices, allowing you to interleave Markdown elements like images, math equations, and explanatory text with your code. Notebooks can be a perfect way to share and explain your ideas with coworkers or the public community.

The most popular form of notebooks today is the Jupyter Notebook, used extensively in the data science community with rich Python support. Jupyter Notebooks also support other languages like Julia or R through Jupyter kernels, executables that follow a specific protocol to run code in your notebook. Visual Studio Code has supported Jupyter Notebooks for several years but [recently added native notebook support](https://code.visualstudio.com/blogs/2021/08/05/notebooks) into the VS Code core.

## Notebook support in VS Code

That's right, notebooks are now a part of the core functionality of VS Code! This means there are now [Notebook APIs](/api/extension-guides/notebook.md) available in VS Code to let extension authors create their own notebook experiences. Anyone can make a VS Code notebook extension that supports custom languages and rich output and creating a notebook is no different than creating any other extension.

Prior to the Notebook APIs, Jupyter Notebook support in VS Code was contributed solely from the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter). The extension created its notebook experience within an isolated webview, somewhat like an independent webpage within VS Code, that can't talk with any of the other extensions you have installed.

However, now with the core [Notebook APIs](/api/extension-guides/notebook.md), the notebook support comes from VS Code and isn't in an isolated webview. This means notebook extensions can interact with the rest of VS Code and other extensions. For example, editor extensions like [Rainbow Indent](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) will work in the code cells of your notebooks.

The Notebook APIs are not limited to Jupyter Notebooks, as we believe that there are many other domains that can benefit from having a tool to help you iterate and narrate your code. We made the new [Notebook APIs](/api/extension-guides/notebook.md) public for any extension author to craft their own custom notebooks.

## Beginnings of a notebook extension ecosystem

The next section describes two custom notebooks that we developed while vetting the Notebook API.

### GitHub Issues Notebook

The first notebook experience the VS Code team created was the [GitHub Issues Notebook](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks). It is a notebook to help us triage and organize the thousands of issues we have in GitHub. With this notebook, we can examine multiple repos at once to find issues using queries such as "find all the issues labeled `bug` and assigned to me". The VS Code team uses this notebook daily to process issues across the many repos the team works on.

![A preview of the GitHub Issues Notebook we use on the team that's available in the vscode repo](github-issues-notebook.png)

You can find the specific notebooks we use for triaging in the [VS Code repo under `.vscode/notebooks`](https://github.com/microsoft/vscode/tree/main/.vscode/notebooks). There's one called `inbox.github-issues` to triage new issues to their appropriate area and assignee.

[GitHub Issues Notebook is available on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks) for anyone to use. You can try it out by installing the extension, creating a file for your notebook with a `.github-issues` file extension such as `my-notebook.github-issues`, and then creating queries such as:

```
$repo=repo:microsoft/vscode-github-issue-notebooks
$repo is:open no:assignee
```

The notebook language, `github-issues`, used to create the queries is almost the same as the syntax used on GitHub.com. One addition in the GitHub Issues Notebook language is that it allows you to create variables and use them in any other cell.

You can view the source code for the [GitHub Issues Notebook here on GitHub.com](https://github.com/microsoft/vscode-github-issue-notebooks).

### REST Book

Inspired by the querying experience in the GitHub Issues Notebook, I created [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) as a learning exercise when I first joined the VS Code team. REST Book allows you to make HTTP calls in a notebook. I found REST Book useful to iterate on my projects with a server, by being able to make multiple calls over time and compare the results easily on one page. I also used REST Book notebooks to set up some manual testing of my project with documentation interleaved with the test cases.

![A preview of the REST Book being used in a project with an Express App](rest-book.png)

This REST Book extension is also available on the Marketplace today. You can install the [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) extension, create a file with a `.restbook` ending, and then perform any HTTP query like `GET github.com`.

Developing REST Book seemed complicated to me at first, but with the large number of VS Code APIs available, programming and creating REST Book was much easier than I expected. Most notably, I used the language APIs heavily for syntax highlighting and auto-completions for my custom REST query language. Then with the Notebook APIs, I just needed to fill in what should be done when the user wants to run a query.

You can view the source code for the [REST Book here](https://github.com/tanhakabir/rest-book).

For both of these notebooks, it was great to have the VS Code Notebook UI to create these REPL-like experiences. You don't need to worry about creating and maintaining your own UI, you can just focus on the functionality.

## Make your own custom notebook extension

### Watch a coding tutorial

The VS Code team recorded a livestream several months ago about custom notebooks and in it, I showcased in a live coding demo of what it's like to create a custom notebook extension. You can watch it on YouTube: [VS Code Notebooks: A Deep Dive](https://youtu.be/D-AXZZDTQhM). Some of the Notebook APIs have changed since the video was published but the principles are still the same.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/D-AXZZDTQhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For the most up to date and detailed information when you're ready to build your own notebook extension, you can reference the [Notebook extension authors guide](/api/extension-guides/notebook.md).

### Share your ideas with the community

If you aren't interested in creating your own notebook extension but have ideas for useful applications, we encourage you to tweet notebook ideas at the VS Code Twitter account, [@code](https://twitter.com/code), or create issues in the [VS Code GitHub repository](https://github.com/microsoft/vscode). This will let the VS Code community read and discuss your notebook idea and hopefully inspire folks to make your notebook a reality!

The few custom notebooks we covered in this blog are just the beginning! We're excited to see what custom notebook experiences you will inspire and create!

Happy Coding!

Tanha Kabir ([@_tanhakabir](https://twitter.com/_tanhakabir)) , and the VS Code Team ([@code](https://twitter.com/code))
