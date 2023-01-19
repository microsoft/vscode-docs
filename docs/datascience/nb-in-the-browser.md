---
Order: 8
Area: datascience
TOCTitle: Jupyter Notebooks on VS Code browser
ContentId: 0faf5b06-ddad-4594-8d5e-fa409c7da82c
PageTitle: Jupyter Notebooks on VS Code browser
DateApproved: 1/9/2023
MetaDescription: Ways to work with Jupyter notebooks in the browser on VS Code.
MetaSocialImage: images/tutorial/social.png
---

# Jupyter notebooks in VS Code running in the browser

Visual Studio Code supports working with [Jupyter Notebooks](https://jupyter-notebook.readthedocs.io/en/latest/) on the desktop, and extends to various browser-based platforms like [Codespaces](https://github.com/features/codespaces) and [VS Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web).

Using these browser-based platforms enables you to work on your notebooks (and beyond!) without having to install anything on your machine. You can read more about each of options and how to get started below.
- [Jupyter notebooks on **Codespaces**](#jupyter-notebooks-on-codespaces)
- [Remote tunneling with **VS Code Server** on VS Code for the Web](#remote-tunneling-with-vs-code-server)
- [Connect to a remote **Jupyter server** on VS Code for the Web](#connect-to-a-remote-jupyter-server)

## Jupyter notebooks on Codespaces

Developing Jupyter notebooks in VS Code can be done entirely through a web-based interface using [Codespaces](https://github.com/features/codespaces), a cloud-hosted development environment that is secure and configurable with free compute resources (more on Codespaces [monthly usage quotas](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces)). This means you can take advantage of all VS Code functionalities, including Jupyter notebooks support, without installing anything on your machine. To get started quickly,
1. Navigate to https://github.com/codespaces
2. Under **Explore quick start templates**, select **Use this template** for **Jupyter Notebook**. If you don't see the **Jupyter Notebook** template, click **See all** and search for the template.
    ![Use Codespaces Jupyter Notebook Template](images/nb-in-the-browser/codespaces-jupyter-template.png)
3. That's it! A codespace will be created for you to get started!
   > **Tip**: You can customize your project by committing [configuration files](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/introduction-to-dev-containers) to your repository (often known as Configuration-as-Code), which creates a repeatable codespace configuration for all users of your project. You can also see examples of predefined configurations on the [devcontainers/images repository](https://github.com/devcontainers/images/tree/main/src) to use and/or amend as needed for your project.

## Jupyter notebooks on VS Code web (vscode.dev)

You can also use [VS Code for the web](https://code.visualstudio.com/docs/editor/vscode-web) by going to https://vscode.dev or https://github.dev (available by typing '.' when viewing a repo on https://github.com ), which gives you options to connect to the following types of kernels for your notebook:
1. [Remote tunneling with VS Code Server](#remote-tunneling-with-vs-code-server)
2. [Remote tunneling with Jupyter server](#connect-to-a-remote-jupyter-server)

### Remote tunneling with VS Code Server

You can securely connect to a remote machine without the requirement of SSH by installing the [VS Code Server](https://code.visualstudio.com/docs/remote/vscode-server) on your remote machine and accessing it through VS Code for the Web. To do so:

1. Install the `code` [CLI](https://code.visualstudio.com/#alt-downloads) on your remote machine.
   > **Note**: You can skip this step if VS Code Desktop is already installed on the remote machine, because the `code` CLI is built into VS Code Desktop.
2. Create a [secure tunnel](https://code.visualstudio.com/docs/remote/tunnels) with the tunnel command: `code tunnel` (you can also run `code-insiders tunnel` if you wish to use the daily release of VS Code) and follow the prompts to grant access to the server. This will download and start the VS Code Server on your remote machine and then create a tunnel to it.
3. Use the CLI's output vscode.dev URL tied to this remote machine, such as https://vscode.dev/tunnel/<machine_name>/<folder_name> for access to this remote machine on any client.
4. Open a notebook file and select any Jupyter kernel or Python environment to run your code

### Connect to a remote Jupyter server

You can also connect to a remote Jupyter server directly by selecting the `Jupyter: Specify Jupyter Server for Connections` command -> pasting the URL for your remote Jupyter server, e.g., `http://<ip-address>:<port>/?token=<token>`.

![Enter Jupyter server](images/nb-in-the-browser/select-enter-server-url.png)

> **Note**: When you’re starting your remote server, ensure to: (1) alow all origins (e.g., `--NotebookApp.allow_origin='*'`) to allow your servers to be accessed externally, and (2) set notebook to listen to listen on all IPs (e.g., `--NotebookApp.ip='0.0.0.0'`).

Since VS Code for the Web runs entirely in your web browser, there are some limitations compared to the desktop and Codespaces experiences.
- No access the VS Code terminal (though you can run [magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html) from your notebook cells)
- Limited debugging
- Partial Python IntelliSense support
- No isort extension support

## Continue working on Codespaces

As with VS Code Desktop, you can easily continue your work from VS Code for the Web (https://vscode.dev or https://github.dev) on Codespaces. To do so:

1. Sign into Codespaces by opening the Command Palette (`kb(workbench.action.showCommands)`) and selecting **Codespaces: Sign in**
6. Navigate to the Remote Explorer tab

    ![Remote explorer tab](images/nb-in-the-browser/remote-explorer-tab.png)

From there, you can either connect to an existing Codespace or create a new one. This will open up a new window for you to continue working on your project on Codespaces.

## Questions or feedback

Please add a [feature request](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=feature-request&template=3_feature_request.md) or [report a problem](https://github.com/microsoft/vscode-jupyter/issues/new?assignees=&labels=bug&template=1_bug_report.md) by logging an issue in our repository that is actively being monitored and managed by our engineering team.
