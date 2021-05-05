---
Order: 10
Area: python
TOCTitle: PyTorch Support
ContentId: 7B5266AD-3D3E-491F-BD7C-B883C592D943
PageTitle: PyTorch Development in Visual Studio Code
DateApproved: 5/5/2021
MetaDescription: This topic highlights some of the PyTorch features available within Visual Studio Code.
MetaSocialImage: images/tutorial/social.png
---
# PyTorch Support in Visual Studio Code

Along with support for [Jupyter Notebooks](/docs/python/jupyter-support.md) Visual Studio Code offers a number of features of particular interest for PyTorch developers. This article covers some of those features and illustrates how they can help you in your projects. If you're unfamiliar with PyTorch development, Microsoft Learn offers a [Getting Started with PyTorch](/learn/paths/pytorch-fundamentals/) learning path that covers the fundamentals of deep learning with PyTorch.

## Data viewer support for Tensors and data slices

VS Code provides a [Data Viewer](/docs/python/jupyter-support.md#variable-explorer-and-data-viewer) that allows you to explore the variables within your code and notebooks, including PyTorch and TensorFlow `Tensor` data types. Along with that the Data Viewer has support for slicing data, allowing you to view any 2D slice of your higher dimensional data. If you have 3-dimensional or greater data (numpy `ndarray`, PyTorch `Tensor`, or TensorFlow `EagerTensor` types) a data slicing panel will open in the Data Viewer by default. Using the panel, you can either use the input box to programmatically specify your slice using Python slice syntax or you can use the interactive **Axis** and **Index** dropdowns to slice as well.

![Data Viewer with data slices and tensors](images/pytorch-support/data-slicing.png)

## TensorBoard integration with VS Code

[TensorBoard](https://www.tensorflow.org/tensorboard) is a data science companion dashboard that helps [PyTorch](https://pytorch.org/) and [TensorFlow](https://www.tensorflow.org/) developers visualize datasets and model training. With TensorBoard directly integrated in VS Code, you can spot check your models predictions, view the architecture of your model, analyze your model's loss and accuracy over time, and profile your code to find out where it's the slowest.

![TensorBoard integration with VS Code](images/pytorch-support/tensorboard-integration.png)

To start a TensorBoard session, open the **Command Palette** (`kb(workbench.action.showCommands)`) and search for the command `Python: Launch TensorBoard`. Afterwards, you will be prompted to select the folder where your TensorBoard log files are located. By default, VS Code uses your current working directory and automatically detects your TensorBoard log files within any subdirectories, but you can also specify your own directory. VS Code will then open a new tab with TensorBoard and manage it's lifecycle as you work.

## PyTorch Profiler integration with VS Code

Along with TensorBoard, VS Code and the Python extension also integrate the PyTorch Profiler, allowing you to better analyze your PyTorch models in one place. For more information about the profiler, see the [PyTorch Profiler documentation](https://pytorch.org/blog/introducing-pytorch-profiler-the-new-and-improved-performance-tool/).

![PyTorch Profiler integration with VS Code](images/pytorch-support/pytorch-profiler.png)

## IntelliSense for Pytorch through the Pylance language server

Through the Pylance language server, VS Code supports improved completions for submodules, such as `nn`, `optim`, and `cuda` for PyTorch starting with version 1.8.1

![Pylance support for PyTorch](images/pytorch-support/pytorch-pylance.gif)
