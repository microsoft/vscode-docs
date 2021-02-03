---
Order: 4
Area: educators
TOCTitle: Jupyter Notebooks
ContentId: 93f791e7-5723-4fc7-8061-7fa355d48a4d
PageTitle: Jupyter Notebooks in Visual Studio Code
DateApproved: 01/26/2021
MetaDescription: Jupyter Notebooks in Visual Studio Code
---

# Jupyter Notebooks

[Jupyter Notebooks](https://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/what_is_jupyter.html) are documents that contain a mix of live code (Python, R, Julia, JavaScript, and more), visualizations, and narrative text (Markdown). They're useful for breaking down concepts in a story telling form where you can give some context and show the code below along with interactive visualizations.

## What do they look like in a classroom?

### Storytelling

In the classroom they can be useful for explaining large topics piece by piece with rich imagery and videos embedded.

Here one instructor is using extra visualizations and pseudo code to help students code their merge sort implementation.

![Teaching Merge Sort in a Notebook](images/notebooks/notebook_lesson_visual_md.gif)

This instructor is explaining how time complexities work piece by piece with tables of data, graphs, explanations, and code:

![Lecture explaining Time Complexities](images/notebooks/notebook_runtime_lecture.gif)

It's also a great way to see and compare the exact runtimes of code blocks, which can be super helpful for learning data structures and algorithm fundamentals.

### Interactive Output

Jupyter Notebooks can also have rich interactive outputs. The instructor below is creating a notebook for a lecture about the [Maximum flow problem](https://en.wikipedia.org/wiki/Maximum_flow_problem) and utilizing the [pyviz library](https://pyvis.readthedocs.io/en/latest/tutorial.html#getting-started) to make an interactive network graph to visualize the problem description. She is also utilizing the built in Latex support to show mathematical symbols for the problem constraints.

![Lecture notes for Maximum flow problem](images/notebooks/notebook_interactive_output.gif)

### Rich Assignments

They are also a great form to hand out assignments with. Here an instructor created an assignment to teach Binary Search Trees that includes a mix of students needing to implement code and write long form written responses to theoretical questions.

![Binary Search Tree assignment in notebook format](images/notebooks/notebook_assignment.gif)

## Getting Started

You will need to have Python 3 installed on your machine along with the Python extension installed. [See the full tutorial here.](https://code.visualstudio.com/docs/python/python-tutorial)

Afterwards, you will need to install the Jupyter Notebooks extension from the Extension Marketplace.

![Jupyter Extension in Extension Marketplace](images/notebooks/jupyter_market_place.png)

Then you need to activate the Python environment you have installed by using the command: `Python: Select Interpreter` from the Command Palette (⇧⌘P).

For full instructions and how to use Jupyter Notebooks, follow the [step by step Jupyter Notebook guide](https://code.visualstudio.com/docs/python/jupyter-support).