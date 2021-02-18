---
Order: 4
Area: educators
TOCTitle: Python
ContentId: e58523d5-e243-45c2-8306-7114077d81ae
PageTitle: Python in Visual Studio Code
DateApproved: 02/17/2021
MetaDescription: Python in Visual Studio Code
---

# Python in Visual Studio Code

Visual Studio Code is a free, professional-grade, source code editor that fully supports Python and useful features such as real-time collaboration. It's highly customizable to support your classroom the way you like to teach.

> "[Visual Studio Code] is the best balance of authenticity and accessibility. Plus, [Visual Studio Code] works on every OS!" - Professor Zachary Dodds from Harvey Mudd College

Read below for recommendations for extensions, settings, and links to free lessons that you can use in your classes.

## Harvey Mudd College case study

Professor [Zachary Dodds](https://www.hmc.edu/about-hmc/hmc-experts/dodds-zachary/) is a Computer Science professor at [Harvey Mudd College](https://www.hmc.edu/) who teaches several introductory classes both for students new to Computer Science and students from a non-Computer Science background. He co-created the popular introduction to Computer Science class [CS5](https://www.cs.hmc.edu/twiki/bin/view/CS5), which attracts students from all backgrounds to develop programming and problem-solving skills useful in other engineering and mathematical disciplines and to build a "a coherent, intellectually compelling picture of Computer Science". The class is taught with Python and uses Visual Studio Code as the recommended editor.

### Why Visual Studio Code?

Professor Dodds has been recommending and using Visual Studio Code in his classes since Visual Studio Code debuted. "[Visual Studio Code] is the best balance of authenticity and accessibility"; it is a free professional-grade editor used by professional software engineers and students alike. "Plus, [Visual Studio Code] works on every OS": Windows, MacOS, Linux, and even [Chromebooks](https://code.visualstudio.com/blogs/2020/12/03/chromebook-get-started).

### Classroom settings

Since Visual Studio Code is super customizable, Professor Dodds gets his students running a tailored experience for his class that hides suggestive code completions so that they learn from what they type and reinforce the conceptual models being built. Here are the settings his students use to achieve this but you can find the most up-to-date settings on his course website: [CS5 - Python Tips)](https://www.cs.hmc.edu/twiki/bin/view/CS5/PythonTips).

```json
"editor.quickSuggestions": false,
"editor.acceptSuggestionOnCommitCharacter": false,
"editor.suggest.filterGraceful": true,
"editor.suggestOnTriggerCharacters": false,
"editor.acceptSuggestionOnEnter": "on",
"editor.suggest.showIcons": false,
"editor.suggest.maxVisibleSuggestions": 7,
"editor.hover.enabled": false,
"editor.hover.sticky": false,
"editor.suggest.snippetsPreventQuickSuggestions": false,
"editor.parameterHints.enabled": false,
"editor.wordBasedSuggestions": true,
"editor.tabCompletion": "on",
"extensions.ignoreRecommendations": true,
"files.autoSave": "afterDelay",
```

### Integrated Terminal

Finally, he also utilizes the built-in terminal heavily in his class as an introduction to running programs from the command line and navigating around their machine. He appreciates how "the built-in terminal panel does not try to automate too much (which, if it did, would deprive newcomers of the experience of the information-flow that's going on)."

This student can do all of his CLI needs and code in one place, such as installing Python libraries, as he works on Lab 3 from the CS5 class:
![Integrated Terminal](images/python/integrated-terminal.gif)

Thank you, Professor Dodds, for sharing your story! If you’re interested in using Visual Studio Code to teach Python in your classes, you can get started with the Python Education Extension Pack below!

## Python Extension Pack

Unsure of which extensions to recommend to your students for your class? You can point your students to the [Python Education Extension Pack](https://marketplace.visualstudio.com/items?itemName=tanhakabir.python-education-extension-pack) that contains all of the essential and helpful extensions for the classroom. You can download the pack from the Extension Marketplace:

![Python Education Extension Pack](images/python/python-extension-pack.png)

The pack contains:
* [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for basic Python functionality like compiling, debugging support, linting, Jupyter Notebooks, unit tests, and more.
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack) to enable real-time collaboration and [Live Share Audio](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-audio) to enable audio calls as well.
* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) to work on remote projects (like ones that live on lab machines) through SSH with full Visual Studio Code functionality.
* [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) for full Latex support in Markdown

## Free Python and Data Science lessons

### NASA-Inspired Lessons
This learning path enables students to use Python to explore doing analyses and projects inspired from real-world problems faced by National Aeronautics and Space Administration (NASA) scientists. View full details of the lessons under [NASA-Inspired Lessons](https://code.visualstudio.com/learn/students/nasa-python)

<br />
<img src="images/python/nasa-learning-path.png" alt="NASA Inspired Python lessons" style="border: 3px solid lightgray">

### Learn Python with Over The Moon
These space-themed lessons were inspired by the Netflix film, [Over the Moon](https://www.youtube.com/watch?v=26DIABx44Tw), and will introduce students to data science, machine learning, and artificial intelligence using Python and Azure. View full details on [Learn Python with Over The Moon](https://code.visualstudio.com/learn/students/over-the-moon-python).

<br />
<img src="images/python/over-the-moon-learning-path.png" alt="Learn Python with Over The Moon" style="border: 3px solid lightgray">

### Wonder Woman Inspired Lessons
Give an introduction to Python with WONDER WOMAN 1984 inspired lessons that help students learn about the basics like conditionals and variables. Get full lesson details under [Learn Python with Wonder Woman](https://code.visualstudio.com/learn/students/wonder-woman-python)

<br />
<img src="images/python/wonder-woman-learning-path.png" alt="Wonder Woman Inspired Python Lessons" style="border: 3px solid lightgray">

### Write basic Python in Notebooks
Learn the basics of Python. View the full lesson on [Microsoft Learn: Write basic Python in Notebooks in Visual Studio Code](https://docs.microsoft.com/learn/modules/basic-python-nasa/).

<br />
<img src="images/python/basic-python-lesson.png" alt="Basics of Python Lesson" style="border: 3px solid lightgray">

### Set up your Python beginner development environment
A step by step guide to installing and setting up your Python and Visual Studio Code environment. View the full lesson on [Microsoft Learn: Set up your Python beginner development environment with Visual Studio Code](https://docs.microsoft.com/learn/modules/python-install-vscode/).

<br />
<img src="images/python/setup-python-lesson.png" alt="Set up Python Lesson" style="border: 3px solid lightgray">