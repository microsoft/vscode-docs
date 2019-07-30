---
Order: 6
Area: ssh
TOCTitle: Edit and debug
PageTitle: Edit and debug the web app on your virtual machine
MetaDescription: Edit and debug the web app on your virtual machine
DateApproved: 7/26/2019
---
# Edit and debug with VS Code

## IntelliSense

TBD

## Debugging

With your tools set up, let's take this one step further. Set a breakpoint on line 1 of TBD by clicking in the gutter to the left of the line number or by putting the cursor on the line and pressing `kb(editor.debug.action.toggleBreakpoint)`.

![set breakpoint](images/ssh/set-breakpoint.png) TBD

Now, press `kb(workbench.action.debug.start)` to run your application. You will be asked how to run the application, choose **Node.js**.

![select debug configuration](images/ssh/select-debug-config.png) TBD

The app will start, and you'll hit the breakpoint. You can inspect variables, create watches, and navigate the call stack.

Press `kb(workbench.action.debug.stepOver)` to step and you'll see the output in the debug console.

![VS Code debug view](images/ssh/debug-view.png)  TBD

You get the full development experience of Visual Studio Code connected over SSH.

## Ending your SSH connection

You can end your session over SSH and go back running VS Code locally with **File** > **Close Remote Connection**.

## Congratulations!

Congratulations, you've successfully completed this walkthrough!

Next, check out the other Remote Development extensions.

* [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
* [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Or get them all by installing the
[Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension pack.

----

<a class="tutorial-next-btn" href="/docs/remote/remote-tutorials">I'm Done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'connect-to-vm')" href="javascript:void(0)">I ran into an issue</a>
