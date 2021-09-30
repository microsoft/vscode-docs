---
Order: 67
TOCTitle: Custom Notebooks
PageTitle: Notebooks, Visual Studio Code style
MetaDescription: Bringing Custom Notebook Experiences to the Visual Studio Code Extension Marketplace.
Date: 2021-10-17
Author: Tanha Kabir
---

# Notebooks, Visual Studio Code style

October 17, 2021 by Tanha Kabir, [@_tanhakabir](https://twitter.com/_tanhakabir)

**We revamped Notebooks in Visual Studio Code!** [Link to announcement blog.](blogs/2021/08/05/notebooks)

### First, what is a Notebook?

A Notebook is a code document that consists of Markdown cells, code cells, and corresponding output cells.

<image>

These output cells can be simple as plain text or complex like interactive graph visualizations.

<image>

_____

The markdown can be as rich as markdown elsewhere on VS Code, so you can have images, links, lists, and more.

<image>

This is really useful for storytelling and explaining the full context of the code you have. And this

Notebooks are used heavily in Data Science to iterate on ideas and have a great storytelling medium behind code at the same time.

### Then what does revamping mean for Notebooks?

We made Notebooks a part of the core functionality of VS Code!  This helped us to make viewing and editing Jupyter Notebooks, Notebooks of the file type `.ipynb`, be available out of the box in VS Code!

 created APIs to support creating Notebook experiences in VS Code.

With these new [Notebook APIs](api/extension-guides/notebook) you can create your own custom Notebook experience like the [GitHub Issues Notebook](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks).

There are also [Notebook Renderer APIs](api/extension-guides/notebook#notebook-renderer) to create output cell renderer extensions that work across Notebooks!

This means I can create a CSV renderer extension that displays CSV data in the visualization that I prefer.



## Beginnings of a Notebook Extension Ecosystem










