---
Order: 6
Area: educators
TOCTitle: Jupyter Notebooks
ContentId: 93f791e7-5723-4fc7-8061-7fa355d48a4d
PageTitle: Jupyter Notebooks in Visual Studio Code
DateApproved: 01/26/2021
MetaDescription: Jupyter Notebooks in Visual Studio Code
---

# Jupyter Notebooks

[Jupyter Notebooks](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/what_is_jupyter.html) are documents that contain a mix of live code (Python, R, Julia, JavaScript, and more), visualizations, and narrative text (Markdown). They're useful for breaking down concepts in a story telling form, where you can give some context and show the code below along with interactive visualizations.

## What do they look like in a classroom?

Below are several real life examples of how Jupyter Notebooks can be used in classrooms.

## Storytelling

Notebooks can be useful for explaining large topics, piece by piece, with rich imagery and videos embedded.

Here one instructor is using extra visualizations and pseudo-code to help students code their merge sort implementation.

![Teaching merge sort in a Notebook](images/notebooks/notebook_lesson_visual_md.gif)

This instructor is explaining how time complexities work broken down with tables of data, graphs, explanations, and code:

![Lecture explaining time complexities](images/notebooks/notebook_runtime_lecture.gif)

It's also a great way to see and compare the exact runtimes of code blocks, which can be very helpful for learning data structures and algorithm fundamentals.

## Interactive output

Jupyter Notebooks can also have rich interactive outputs. The instructor below is creating a Notebook for a lecture about the [maximum flow problem](https://en.wikipedia.org/wiki/Maximum_flow_problem) and utilizing the [pyviz library](https://pyvis.readthedocs.io/en/latest/tutorial.html#getting-started) to make an interactive network graph to visualize the problem description. They are also utilizing the built-in [LaTeX](https://www.latex-project.org/) support to show mathematical symbols for the problem constraints.

![Lecture notes for maximum flow problem](images/notebooks/notebook_interactive_output.gif)

## Rich assignments

They are also a great format for handing out assignments. Here an instructor created an assignment to teach Binary Search Trees that includes a mix of students needing to implement code and write long form written responses to theoretical questions.

![Binary Search Tree assignment in Notebook format](images/notebooks/notebook_assignment.gif)

## Getting started

You will need to have Python 3 installed on your machine along with the Microsoft [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) installed from the VS Code Marketplace. You can review the [introductory Python tutorial](/docs/python/python-tutorial.md) for help with setup.

In addition, you need to install the [Jupyter Notebooks extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter).

![Jupyter extension in VS Code Marketplace](images/notebooks/jupyter_market_place.png)

Once you have Python and the extensions installed, you will need to activate the Python environment by using the command **Python: Select Interpreter** from the Command Palette (`kb(workbench.action.showCommands)`).

For full instructions on how to use Jupyter Notebooks, follow the [step by step Jupyter Notebook guide](/docs/python/jupyter-support.md).
