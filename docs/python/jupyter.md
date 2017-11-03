---
Order: 7
Area: python
TOCTitle: Jupyter
ContentId: 81681d53-6d06-486a-af96-0cc98cc4a273
PageTitle: Using Jupyter and Python in Visual Studio Code
DateApproved: 11/02/2017
MetaDescription: Using Jupyter and Python in Visual Studio Code
MetaSocialImage: TBD
---
# Using Jupyter and Python in Visual Studio Code

The Python extension supports running Python code directly in Jupyter and IPython kernels. Features include:

- Running a line, a selection, or a block of Python code (cell) (TODO: LINK) in a kernel. Note that code lenses automatically appear for cells that give you a shortcut to running code in a kernel.
- Select, restart, interrupt and shut down a kernel. This allows you to easily switch between Python 2.7 and Python 3.6.
- Viewing output within Visual Studio Code (Images, Html, Graphs, Latex, SVG, and more).

## Installation

If you're using Anaconda as your Python environment, Jupyter is already included (see [installing Jupyter using Anaconda and conda](http://jupyter.org/install.html) (jupyter.org)). Otherwise, install Jupyter in your chosen environment using `pip3 install --upgrade pip` first to upgrade pip itself, followed by `pip3 install jupyter`.

To install IPython in your current environment, just use `pip install ipython`.


## Jupyter settings

| Setting | Default | Description | See also |
| --- | --- | --- | --- |
| python.promptToInstallJupyter | `true` | Display prompt to install the Jupyter Extension. |
| "python.jupyter.defaultKernel" | `""` | Specifies the kernel in which to run code, such as "Python 3", defaulting to the first available kernel. |
| "python.jupyter.appendResults" | `true` | Specifies whether to append the results to results window. When false, results are cleared with each run. |
| "python.jupyter.startupCode" | `["%matplotlib inline"]` | Provides code to run when the kernel starts, where each item in the array is a separate line of code. The default startup code instructs the Jupyter kernel to generate output that can be displayed inline rather than displaying output in a Jupyter notebook. This startup code, of course, requires that matplotlib is installed in your environment, otherwise you'll see the message "Failed to execute kernel startup code." |

## Examples

Each of the following sections provides code that you can paste into a Python file and run in a Jupyter or IPython kernel.

- [Standard plot](#standard-plot)
- [Interactive Plot using D3js](#interactive-plot-using-d3js)
- [Interactive Plot using Bokeh](#interactive-plot-using-bokeh)
- [LaTex](#latex)
- [Inline images](#inline-images)
- [IFrame](#iframe)
- [More examples](#more-examples)

![Examples](https://raw.githubusercontent.com/DonJayamanne/pythonVSCodeDocs/master/images/jupyter/examples.gif)

### Standard plot

```python
#%%
import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np

x = np.linspace(0, 20, 100)
plt.plot(x, np.sin(x))
plt.show()
```

### Interactive Plot using D3js

> **Tip**: A toolbar for interacting with the graph appears when hovering the mouse over it.

```python
#%%
import matplotlib.pyplot as plt
import numpy as np
import mpld3

mpld3.enable_notebook()
fig, ax = plt.subplots(subplot_kw=dict(axisbg='#EEEEEE'))
ax.grid(color='white', linestyle='solid')
N = 50
scatter = ax.scatter(np.random.normal(size=N),
                     np.random.normal(size=N),
                     c=np.random.random(size=N),
                     s = 1000 * np.random.random(size=N),
                     alpha=0.3,
                     cmap=plt.cm.jet)
ax.set_title("D3 Scatter Plot", size=18);
```

For more information, see [D3js](http://mpld3.github.io/).


### Interactive Plot using Bokeh

> **Tip**: Use the toolbar next to the graph image to interact with the graph.

```python
#%%
from bokeh.io import push_notebook, show, output_notebook
from bokeh.layouts import row, gridplot
from bokeh.plotting import figure, show, output_file
output_notebook()

import numpy as np

x = np.linspace(0, 4*np.pi, 100)
y = np.sin(x)
TOOLS = "pan,wheel_zoom,box_zoom,reset,save,box_select"

p1 = figure(title="Legend Example", tools=TOOLS)
p1.circle(x,   y, legend="sin(x)")
p1.circle(x, 2*y, legend="2*sin(x)", color="orange")
p1.circle(x, 3*y, legend="3*sin(x)", color="green")
show(p1)
```

For more information, see [Bokeh graphs](http://bokeh.pydata.org/en/latest/docs/gallery.html).

### LaTex

```pytohn
#%%
from IPython.display import Latex
Latex('''The mass-energy equivalence is described by the famous equation

$$E=mc^2$$

discovered in 1905 by Albert Einstein.
In natural units ($c$ = 1), the formula expresses the identity

\\begin{equation}
E=m
\\end{equation}''')
```

For more information, see [LaTex](http://matplotlib.org/users/usetex.html).

### Inline images

```python
#%%
from IPython.display import Image
Image('http://jakevdp.github.com/figures/xkcd_version.png')
```

### IFrame

```python
#%%
from IPython.core.display import HTML
HTML("<iframe src='http://www.ncdc.noaa.gov/oa/satellite/satelliteseye/cyclones/pfctstorm91/pfctstorm.html' width='750' height='600'></iframe>")
```

## Troubleshooting

By default, IPython does not automatically reload modules on change, meaning that changes to are not reflected when a code cell is run. To change this behavior, create a configuration file named `ipython_config.py` with the following contents:

```python
c = get_config()
c.InteractiveShellApp.extensions = ['autoreload']
c.InteractiveShellApp.exec_lines = ['%autoreload 2']
c.InteractiveShellApp.exec_lines.append('print("Warning: disable autoreload in ipython_config.py to improve performance.")')
```
