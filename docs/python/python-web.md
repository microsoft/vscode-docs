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

## Starting a REPL

The extension comes with an integrated Python REPL. To activate it execute the command `Python WASM: Start REPL`

![Start Python Repl](images/web/repl.png)

You can also run code directly from within a GitHub repository by accessing the files through the GitHub Repositories extension. In the screenshot below the files are host [here](https://github.com/dbaeumer/python-sample):

## Debugging

There is also support for debugging Python files in the Web. The features currently supported are:

- setting breakpoints
- stepping into and out of functions
- debug across modules
- evaluate variables in the debug console
- debug the program in the intergrated terminal

The screen shot below shows an active debug session. The files are hosted directly on GitHub.

![Debugging a Python Program](images/web/debug.png)

## Crafting your own Python Environment

The extension uses a pre-configured Python environment based on the [CPython WebAssembly builds](https://github.com/tiran/cpython-wasm-test/releases). The used build is `Python-3.11.0-wasm32-wasi-16.zip`.

You can setup your own Python environment, including source wheel Python packages, following these steps:

- create a new GitHub repository.
- download a wasm-wasi-16 build from https://github.com/tiran/cpython-wasm-test/releases and expand it into the root of the repository
- to add source wheel packages do the following:
  - create a site-packages folder in the root
  - install the package using the following command `pip install my_package --target ./site-packages`. Note that you need to have a Python installation in your OS including pip.
- commit the changes
- change the python.wasm.runtime setting to point to your GitHub repository. For example:
  ```
  {
    "python.wasm.runtime": "https://github.com/dbaeumer/python-3.11.0"
  }
  ```

## Limitations

The Python Web support doesn't provide all the features available compared to running the code on our local machine. The major limitations in the Python interpreter are:

- No socket support.
- No thread support. As a consequence, there is no async support.
- No pip support.
- No support for native Python modules.

## Acknowledgement

The work would have not be possible without the support of the Python community which are building and maintaining the necessary WASM files of CPython.