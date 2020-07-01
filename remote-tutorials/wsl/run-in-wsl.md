---
Order: 5
Area: wsl
TOCTitle: Run in WSL
PageTitle: Run Visual Studio Code in Windows Subsystem for Linux
MetaDescription: Run Visual Studio Code in Windows Subsystem for Linux
DateApproved: 6/10/2020
---
# Run in Windows Subsystem for Linux

In the WSL terminal, make sure you are in the helloWorld folder, and type in `'code .'` to launch Visual Studio Code. The `'.'` argument tells VS Code to open the current folder.

> **Note:** If this command does not work, you may need to restart your terminal or you may not have added VS Code to your path when it was installed.

![launch VS Code](images/wsl/launch-code.png)

The first thing you'll see is a message about "Installing VS Code Server" (the c7d83e57… number is the version of the VS Code Server that matches the client-side tools you just installed). VS Code is installing a small server on the Linux side that the desktop VS Code will then talk to. That server will then install and host extensions in WSL, so that they run in the context of the tools and frameworks installed in WSL. In other words, your language extensions will run against the tools and frameworks installed in WSL, not against what is installed on the Windows side, as it should for the proper development experience.

The next thing that happens is VS Code will start and open the `helloWorld` folder. You may see a quick notification telling you that VS Code is connecting to WSL, and you may be prompted to allow access to the Node.js-based server.

![installing vscode server](images/wsl/installing-vscode-server.png)

Now, when you hover over `hello.py`, you get the proper Linux path.

![show hello.py Linux path](images/wsl/show-linux-path.png)

## Integrated Terminal

Run **Terminal** > **New Terminal** (`kb(workbench.action.terminal.toggleTerminal)`) to open a new terminal instance.

![new terminal in WSL](images/wsl/new-terminal-in-wsl.png)

You'll start a new instance of the bash shell in WSL, again from VS Code running on Windows.

**Tip**: In the lower left corner of the Status Bar, you can see that you're connected to your **WSL: Ubuntu** instance.

![Remote - WSL Status bar](images/wsl/wsl-status-bar.png)

### Known issue: Missing Activity bar icons

When VS Code restarted connected to WSL, some icons provided by extensions may be missing. This is a [known issue](https://github.com/microsoft/vscode-remote-release/issues/687) and the workaround is to close and reopen the connection.

* Close the connection with **File** > **Close Remote Connection**.
* Open the **File** > **Open Recent** list.
* Choose the folder with the **[WSL: Ubuntu]** suffix.

----

<a class="tutorial-next-btn" href="/remote-tutorials/wsl/edit-and-debug">I'm running VS Code in WSL</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-wsl', 'run-in-wsl')" href="javascript:void(0)">I ran into an issue</a>
