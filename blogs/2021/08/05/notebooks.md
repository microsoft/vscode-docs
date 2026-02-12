---
Order: 
TOCTitle: Notebooks
PageTitle: The Coming of Age of Notebooks
MetaDescription: Challenges with the rollout of the new native notebook experience in Visual Studio Code.
Date: 2021-08-05
Author: Chris Dias
---
# The Coming of Age of Notebooks

August 05, 2021 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

**A (not so) new way of doing development**

Notebooks—documents that contain text, executable code, as well as the output of that code—are an interesting and exciting new way to do development.

[![An image of a notebook that analyzes data from the Titanic shipwreck](notebook.png)](/assets/blogs/2021/08/05/notebook.png)

Ok, it's not totally new. Donald Knuth introduced the concept of [Literate Programming](https://en.wikipedia.org/wiki/Literate_programming) in 1984 and Wolfram Mathematica introduced the [Notebook UI powered by Kernels](https://en.wikipedia.org/wiki/Wolfram_Mathematica) in 1988.

Over the past decade, we've seen an explosion in notebook usage, especially with the rise of Data Science. Tools like Jupyter Notebooks have become a de facto tool in the data science community. They are used and loved for everything from virtual scratch pads, data preparation tasks, and complex machine learning model development.

One interesting trend we've seen is that data science and machine learning is becoming a team sport: developers are increasingly collaborating with data scientists to prepare data sets for model training, refactor exploratory code for production use, and integrate model inferencing into their core product. Our own team analyzes vast amounts of usage data every day and uses [Jupyter notebooks](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) to track, analyze, and validate hypotheses. We use domain-specific notebooks ([GitHub Issues](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks)) to track issues and work items across GitHub repositories, providing insight into the readiness to release VS Code each month. Notebooks are now critical for us to run the VS Code project.

## New UI, no warning

We've been hard at work building notebook support into the core of VS Code to make them faster and safer—and to allow your favorite VS Code extensions to work in them. As a part of this effort, we are also introducing changes to the user experience to make notebooks feel like an integral part of the tool, not an add-on as they were in earlier efforts.

If you are on the [Insiders builds](https://code.visualstudio.com/insiders/), you have been able to follow along as we evolved the experience. On Stable, we had 40% of users on the new notebook experience. Feedback was generally positive. So, like Nigel Tufnel, we decided to [turn the volume to 11](https://www.youtube.com/watch?v=hW008FcKr3Q) and moved everyone forward onto the new implementation.

Unfortunately, as you quickly let us know, we made the transition for you with little to no warning. There you were, doing your work using Jupyter Notebooks, cleaning and analyzing that massive data set to model the expansion of the Universe, and we turned your world upside down. You grabbed a coffee, started VS Code, and "boom" your notebook experience was..._different_.

While we are excited about introducing new experiences in VS Code, surprises like this are not what you expect in the morning as you fire up the tool. For this, we would like to apologize. There are better ways of rolling out changes, to keep everyone informed as to what's happening, why, and when.

## But it's different!

The original version of notebooks in VS Code was very close to the classic Jupyter Notebooks experience, it looked and behaved pretty much the same. That was a reasonable starting point, a warm, cozy, and familiar experience. However, as we learned more about how VS Code users work with both notebooks and the rest of the tool, we realized that the two experiences needed to be more similar than different.

Notebooks in VS Code should feel natural so that you can seamlessly move between crafting your code files and your notebook modeling the Universe in Python. This means that notebooks in VS Code take advantage of built-in metaphors and familiar keyboard shortcuts as much as possible.

For example, writing in a code cell should feel the same as writing code in the full-fledged text editor, no matter the language you use. Settings should not be specific to notebooks. Quick fixes, outline, source actions, refactorings, multiple-cursors, word wrapping, shrink and expand selection, column selection mode, change casing, and other editor experiences should be the same. Your favorite editor extensions like [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) and Snippets should just work. You should be able to compare notebooks graphically, side by side, just as you do with source files today.

## The ecosystem

Furthermore, we envision a rich extension ecosystem for notebooks. You should be able to search the Marketplace for Kernels or custom visualizers in the same way you discover themes and new language support. Our API even supports creating custom (non-Jupyter) notebooks for new domains. For example, the [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) extension lets you write and persist REST calls with custom visualizations for outputs (for example, JSON, HTML, and a custom document). As mentioned earlier, the [GitHub Issues Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks) lets you create notebooks of different issue queries for your repository to manage your project, [just like we do](https://github.com/microsoft/vscode/blob/eede0a5b712cbaeb0ce3ad9b3b54261f1d6c1f91/.vscode/notebooks/endgame.github-issues).

## The future looks bright

To complete the metaphor, notebooks in VS Code have matured from those [awkward teen years](https://www.huffpost.com/entry/awkward-teenage-years-success_n_4734007) into (young) adulthood, confident and strong, with a bright future. Working with VS Code notebooks may take a bit of adjustment if you are moving from Jupyter, but we hope it will be worth it in the end. And, as we always try to do, you can customize the experience through settings (search for `@tag:notebookLayout` in the Settings editor).

We believe that expanding VS Code's rich coding experiences and ecosystem to include comprehensive Jupyter Notebook support makes for a great tool for bringing powerful new insights into your daily development. [We've got some great new experiences in the July release](https://code.visualstudio.com/updates/v1_59#_notebook-layout-improvements), please give it a try and let us know what you think (good and bad!). Your feedback is critical to helping us build the best possible product.

Thanks!

Jim, Joe, Kai, Chris, and the VS Code Team

Happy Notebooking!
