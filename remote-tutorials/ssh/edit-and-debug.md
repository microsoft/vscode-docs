---
Order: 6
Area: ssh
TOCTitle: Edit and debug
PageTitle: Edit and debug the web app on your virtual machine
MetaDescription: Edit and debug the web app on your virtual machine
DateApproved: 4/8/2020
---
# Edit and debug with VS Code

From the Visual Studio Code File Explorer (`kb(workbench.view.explorer)`), navigate to your new `myExpressApp` folder and double-click the `app.js` file to open it in the editor.

## IntelliSense

You have syntax highlighting for the JavaScript file as well as IntelliSense with hovers, just like you would see if the source code was on your local machine.

![Express app.js hover](images/ssh/express-hover.png)

When you start typing, you'll get smart completions for the object methods and properties.

![Express app.js smart completions](images/ssh/express-completions.png)

## Debugging

Set a breakpoint on line 10 of `app.js` by clicking in the gutter to the left of the line number or by putting the cursor on the line and pressing `kb(editor.debug.action.toggleBreakpoint)`. The breakpoint will be displayed as a red circle.

![set breakpoint](images/ssh/set-breakpoint.png)

Now, press `kb(workbench.action.debug.start)` to run your application. If you are asked how to run the application, choose **Node.js**.

The app will start, and you'll hit the breakpoint. You can inspect variables, create watches, and navigate the call stack.

Press `kb(workbench.action.debug.stepOver)` to step or `kb(workbench.action.debug.start)` again to finish your debugging session.

![VS Code debug view](images/ssh/debug-view.png)

You get the full development experience of Visual Studio Code connected over SSH.

## Ending your SSH connection

You can end your session over SSH and go back to running VS Code locally with **File** > **Close Remote Connection**.

## Congratulations!

Congratulations, you've successfully completed this walkthrough!

Next, check out the other Remote Development extensions.

* [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
* [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Or get them all by installing the
[Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension pack.

----

<a class="tutorial-next-btn" href="/docs/remote/remote-tutorials">I'm Done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'edit-and-debug')" href="javascript:void(0)">I ran into an issue</a>
