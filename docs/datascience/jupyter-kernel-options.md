---
Order: 7
Area: datascience
TOCTitle: Jupyter Kernel Options in VS Code
ContentId: 3b6da7e6-c449-4c62-a019-9202412aac04
PageTitle: Jupyter Kernel Options in VS Code
DateApproved: 11/21/2022
MetaDescription: Descriptions, tips, and tricks on kernel selection options when working with Jupyter Notebooks in Visual Studio Code.
MetaSocialImage: images/tutorial/social.png
---

# Jupyter Kernel Options in VS Code <!-- omit in toc -->

The VS Code notebooks’ kernel picker lists the following categories of connection methods to run the code in your Jupyter notebook:
- [Jupyter Kernels](#jupyter-kernels)
- [Python Environments](#python-environments)
- [Existing Jupyter Server](#existing-jupyter-server)

By default, we will recommend the one you’ve previously used with your notebook, but you can choose to connect to any other Jupyter kernels as shown below.

## Jupyter Kernels

The **Jupyter Kernels** category lists all Jupyter kernels that VS Code detects in the context of the compute system it’s operating in (your desktop, Codespaces, remote server, etc.). Each Jupyter kernels has Jupyter [kernel specification](https://jupyter-client.readthedocs.io/en/stable/kernels.html#kernel-specs), or Jupyter kernelspec, which contains a JSON file (i.e., `kernel.json`) with details about the kernel—name, description, CLI information required to launch a process as a kernel.

## Python Environments

The **Python Environments** category lists the Python environments that VS Code detects from the compute system it’s operating in (your desktop, Codespaces, remote server, etc.). It shows all Python environments grouped by type (e.g., conda, venv)—whether the [IPyKernel](https://ipython.readthedocs.io/en/stable/install/kernel_install.html) is installed or not.

   > **Note**: You **__do not__** need to install [jupyter](https://pypi.org/project/jupyter/) into the Python environment you want to use. Only the IPyKernel package is required to launch a Python process as a kernel and execute code against your notebook, e.g., `pip install ipykernel`. Visit our [wiki](https://github.com/microsoft/vscode-jupyter/wiki/Kernels-(Architecture)) to learn more.

## Existing Jupyter Server

The **Existing Jupyter Server** category lists remote Jupyter servers previously connected. You can also use this option to connect to an existing Jupyter server running remotely or locally. Grab the URL for your Jupyter server, e.g., `http://<ip-address>:<port>/?token=<token>` and paste it in the **Enter the URL of the running Jupyter server** option to connect to the remote server and execute code against your notebook using that server.

![Enter server URL](images/jupyter-kernel-options/select-enter-server-url.png)

   > **Note**: When you’re starting the Jupyter server, ensure to: (1) allow all origins (e.g., `--NotebookApp.allow_origin = '*'`) to allow your servers to be accessed externally, and (2) set the notebook to listen to listen on all IPs (e.g., `--NotebookApp.ip = '0.0.0.0'`).

Once connected, all active Jupyter sessions will appear on this list. You can create new session from the server’s kernelspec by selecting the **Notebook: Select Notebook Kernel** command -> **Select Another Kernel…** -> **Existing Jupyter Server…** -> your server.

## Questions or feedback <!-- omit in toc -->

Please add a [feature request](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=feature-request&template=3_feature_request.md) or [report a problem](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=bug&template=1_bug_report.md) by logging an issue in our repository that is actively being monitored and managed by our engineering team.
