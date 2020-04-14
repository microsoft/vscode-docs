---
Order: 5
Area: ssh
TOCTitle: Connect using SSH
PageTitle: Connect to your virtual machine using SSH
MetaDescription: Connect to your virtual machine using SSH
DateApproved: 4/8/2020
---
# Connect using SSH

Now that you've created an SSH host, let's connect to it!

You'll have noticed an indicator on the bottom-left corner of the Status bar. This indicator tells you in which context VS Code is running (local or remote). Click on the indicator to bring up a list of Remote extension commands.

![Remote extension commands](images/ssh/remote-commands.png)

Choose the **Remote-SSH: Connect to Host** command and connect to the host by entering connection information for your VM in the following format: `user@hostname`.

The `user` is the username you set when adding the SSH public key to your VM. For the `hostname`, go back to the [Azure portal](https://portal.azure.com) and in the **Overview** pane of the VM you created, copy the **Public IP address**.

![Virtual machine public IP address](images/ssh/vm-public-ip-address.png)

Set the user and hostname in the connection information text box.

![Set user and host name](images/ssh/set-user-host.png)

VS Code will now open a new window (instance). You'll then see a notification that the "VS Code Server" is initializing on the SSH Host. Once the VS Code Server is installed on the remote host, it can run extensions and talk to your local instance of VS Code.

![Initializing VS Code Server](images/ssh/init-vs-code-server.png)

You'll know you're connected to your VM by looking at the indicator in the Status bar. It shows the hostname of your VM.

![SSH indicator in Status bar](images/ssh/ssh-status-bar.png)

The Remote - SSH extension also contributes a new icon on your Activity bar, and clicking on it will open the SSH explorer. Here you can configure your SSH connections. For instance, you can save the hosts you connect to the most and access them from here instead of entering the user and hostname.

![Remote button on Activity bar](images/ssh/remote-on-activity-bar.png)

Once you're connected to your SSH host, you can interact with files and open folders on the remote machine. If you open the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`), you'll see you're working inside a bash shell **while you're on Windows**.

![Checking uname in the terminal](images/ssh/check-uname.png)

You can use the bash shell to browse the file system on the VM. You can also browse and open folders on the remote home directory with **File** > **Open Folder**.

![Remote open folder](images/ssh/remote-open-folder.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/create-website">I've connected to my VM</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'connect-to-vm')" href="javascript:void(0)">I ran into an issue</a>
