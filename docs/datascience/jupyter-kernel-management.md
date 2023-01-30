---
Order: 7
Area: datascience
TOCTitle: Manage Jupyter Kernels
ContentId: 3b6da7e6-c449-4c62-a019-9202412aac04
PageTitle: Manage Jupyter Kernels in Visual Studio Code
DateApproved: 1/26/2023
MetaDescription: Descriptions of kernel selection options and tutorials on managing different types of kernels when working with Jupyter Notebooks in Visual Studio Code.
MetaSocialImage: images/tutorial/social.png
---

# Manage Jupyter Kernels in VS Code

The Visual Studio Code notebooks' kernel picker lists the following categories of connection methods to run the code in your Jupyter notebook:

- [Jupyter Kernels](#jupyter-kernels)
- [Python Environments](#python-environments)
- [Existing Jupyter Server](#existing-jupyter-server)

By default, VS Code will recommend the one you've previously used with your notebook, but you can choose to connect to any other Jupyter kernels as shown below.

## Jupyter Kernels

The **Jupyter Kernels** category lists all Jupyter kernels that VS Code detects in the context of the compute system it's operating in (your desktop, [GitHub Codespaces](https://github.com/features/codespaces), remote server, etc.). Each Jupyter kernel has a Jupyter [kernel specification](https://jupyter-client.readthedocs.io/en/stable/kernels.html#kernel-specs), or Jupyter kernelspec, which contains a JSON file (`kernel.json`) with details about the kernel—name, description, and CLI information required to launch a process as a kernel.

## Python Environments

The **Python Environments** category lists the Python environments that VS Code detects from the compute system it's operating in (your desktop, Codespaces, remote server, etc.). It shows all Python environments grouped by type (for example, conda, venv)—whether the [IPyKernel](https://ipython.readthedocs.io/en/stable/install/kernel_install.html) is installed or not.

   > **Note**: You **do not** need to install [jupyter](https://pypi.org/project/jupyter/) into the Python environment you want to use. Only the IPyKernel package is required to launch a Python process as a kernel and execute code against your notebook (`pip install ipykernel`). Visit the [Jupyter extension wiki](https://github.com/microsoft/vscode-jupyter/wiki/Kernels-(Architecture)) to learn more.

## Existing Jupyter Server

The **Existing Jupyter Server** category lists remote Jupyter servers previously connected. You can also use this option to connect to an existing Jupyter server running remotely or locally. Find the URL for your Jupyter server, for example, `http://<ip-address>:<port>/?token=<token>` and paste it in the **Enter the URL of the running Jupyter server** option to connect to the remote server and execute code against your notebook using that server.

![Enter server URL](images/jupyter-kernel-management/select-enter-server-url.png)

When you're starting your remote server, be sure to:

1. Allow all origins (for example `--NotebookApp.allow_origin='*'`) to allow your servers to be accessed externally.
2. Set the notebook to listen on all IPs (`--NotebookApp.ip='0.0.0.0'`).

Once connected, all active Jupyter sessions will appear on this list.

You can create a new session from the server's kernelspec by:

1. Running the **Notebook: Select Notebook Kernel** command.
2. Choose **Select Another Kernel**.
3. Choose **Existing Jupyter Server**.
4. Select your server.

## Questions or feedback

You can add a [feature request](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=feature-request&template=3_feature_request.md) or [report a problem](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=bug&template=1_bug_report.md) by creating an issue in our repository, which is actively being monitored and managed by our engineering team.
