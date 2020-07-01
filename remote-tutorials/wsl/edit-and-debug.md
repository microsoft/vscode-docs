---
Order: 6
Area: wsl
TOCTitle: Edit and debug
PageTitle: Edit and debug Python in WSL with Visual Studio Code
MetaDescription: Edit and debug Python in WSL with Visual Studio Code
DateApproved: 6/10/2020
---
# Edit and debug with VS Code

## Installing the Python extension (and additional tools)

Click on `hello.py` to open it for editing. You will be prompted with an extension recommendation, in this case to install the [Microsoft Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension, which will give you rich editing and debugging experiences. Go ahead and select **Install** and reload if prompted.

![Python extension recommendation](images/wsl/python-extension-recommendation.png)

To prove that the extension is installed in WSL, open the Extensions view again (`kb(workbench.view.extensions)`). You will see a section titled **WSL – Installed** and you can see any extensions that are installed on the WSL side.

![WSL installed extensions](images/wsl/wsl-installed-extensions.png)

Upon reload, you'll also get prompted telling you that the pylint linter is not installed. Linters are used to show errors and warnings in source code. Go ahead and select **Install**.

![pylint not installed notification](images/wsl/pylint-not-installed.png)

Now, when you edit your code, you get rich colorization and completions.

![Python IntelliSense](images/wsl/python-intellisense.png)

And when you save your file (`kb(workbench.action.files.save)`), you'll get linting errors and warnings on the file.

![pylint error](images/wsl/pylint-error.png)

## Debugging

With your tools set up, let's take this one step further. Set a breakpoint on line 1 of hello.py by clicking in the gutter to the left of the line number or by putting the cursor on the line and pressing `kb(editor.debug.action.toggleBreakpoint)`.

![set breakpoint](images/wsl/set-breakpoint.png)

Now, press `kb(workbench.action.debug.start)` to run your application. You will be asked how to run the application, and since this is a simple file, just choose **Python File**.

![select debug configuration](images/wsl/select-debug-config.png)

The app will start, and you'll hit the breakpoint. You can inspect variables, create watches, and navigate the call stack.

Press `kb(workbench.action.debug.stepOver)` to step and you'll see the output of the print statement in the debug console.

![VS Code debug view](images/wsl/debug-view.png)

You get the full development experience of Visual Studio Code, using the Linux instance installed in WSL.

If you want to open another folder in WSL, open the **File** menu and choose **Open Folder**. You'll get a minimal file and folder navigator for the Linux file system, not the Windows file system.

![open folder navigator](images/wsl/open-folder.png)

If you want to switch back to the Windows, select the **Show Local** option and you'll get the standard Windows File Open dialog.

## Ending your WSL connection

You can end your session in WSL and go back to running VS Code locally with **File** > **Close Remote Connection**.

## Congratulations!

Congratulations, you've successfully completed this walkthrough!

Next, check out the other Remote Development extensions.

* [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Or get them all by installing the
[Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension pack.

----

<a class="tutorial-next-btn" href="/docs/remote/remote-tutorials">I'm Done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-wsl', 'edit-and-debug')" href="javascript:void(0)">I ran into an issue</a>
