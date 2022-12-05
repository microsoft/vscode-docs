---
Order: 13
Area: python
TOCTitle: Python in the Web
ContentId: 366e4bbf-fa87-4813-9dfc-6c831b20a4d2
PageTitle: Running and Debugging Python code in the Web
DateApproved: 7/13/2022
MetaDescription: Running and Debugging Python code in the Web.
MetaSocialImage: images/tutorial/social.png
---
# Running and Debugging Python code in the Web

We are happy to announce a first experinmental support for running Python code on the Web. To try it out install the latest pre-release version of the [Experimental - Python for the Web](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-python-web-wasm) extension from the marketplace.

## Pre-requisites

The following pre-requisites need to be fullfiled to use the extension:

- you need to have the [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) installed.
- you need to authenticate with GitHub.
- you need to use a browser that has support for Cross Origin Isolation. We tested the extension so far unde Microsoft Edge and Google Chrome.
- your code must either be hosted on a GitHub repository and accessed through the GitHub Repository extension or on your local file system.
- when starting VS Code on the Web via either `https://vscode.dev/` or `https://insiders.vscode.dev/` you need to add the following query parameter to the URL: `?vscode-coi=`

## Run `Hello World`

The screenshot belows shows the execution of a simple Python program in the browser. The program consists of two files `app.py` and `hello.py` and there content is store on the local file system.

![Execution of Python code store on local disk](images/web/execution-local-files.png)

# Acknowledgement

The work would have not be possible without the support of the Python community which are building and maintaining the necessary WASM files of CPython.