---
Order: 8
Area: remote
TOCTitle: SSH Tutorial
PageTitle: Connect over SSH with Visual Studio Code
ContentId: beb86509-a36f-4e3b-a32e-b3d8c3966dd7
MetaDescription: Connect over SSH with Visual Studio Code
DateApproved: 3/30/2023
---
# Remote development over SSH

This tutorial walks you through creating and connecting to a virtual machine (VM) on Azure using the Visual Studio Code [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension. You'll create a Node.js Express web app to show how you can edit and debug on a remote machine with VS Code just like you could if the source code was local.

> **Note**: Your Linux VM can be hosted anywhere - on your local host, on premise, in Azure, or in any other cloud, as long as the chosen Linux distribution meets these [prerequisites](/docs/remote/linux.md#local-linux-prerequisites).

## Prerequisites

To get started, you need to have done the following steps:

1. Install an [OpenSSH compatible SSH client](/docs/remote/troubleshooting.md#installing-a-supported-ssh-client) (PuTTY is not supported).
2. Install [Visual Studio Code](https://code.visualstudio.com).
3. Have an Azure subscription (If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) before you begin).

### Install the extension

The Remote - SSH extension is used to connect to SSH hosts.

> <a class="install-extension-btn" href="vscode:extension/ms-vscode-remote.remote-ssh">Install the Remote - SSH extension</a>

![Remote - SSH extension](images/ssh-tutorial/remote-ssh-extension.png)

### Remote - SSH

With the Remote - SSH extension installed, you will see a new Status bar item at the far left.

![Remote Status bar item](images/ssh-tutorial/remote-status-bar.png)

The Remote Status bar item can quickly show you in which context VS Code is running (local or remote) and clicking on the item will bring up the Remote - SSH commands.

![Remote - SSH commands](images/ssh-tutorial/remote-ssh-commands.png)

## Create a virtual machine

If you don't have an existing Linux virtual machine, you can create a new VM through the [Azure portal](https://portal.azure.com). In the Azure portal, search for "Virtual Machines", and choose **Add**. From there, you can select your Azure subscription and create a new resource group, if you don't already have one.

> **Note**: In this tutorial, we are using Azure, but your Linux VM can be hosted anywhere, as long as the Linux distribution meets these [prerequisites](/docs/remote/linux.md#local-linux-prerequisites).

![Create a virtual machine](images/ssh-tutorial/create-vm.png)

Now you can specify details of your VM, such as the name, the size, and the base image. Choose Ubuntu Server 18.04 LTS for this example, but you can choose recent versions of other Linux distros and look at VS Code's [supported SSH servers](/docs/remote/troubleshooting.md#installing-a-supported-ssh-server).

![Virtual machine instance details](images/ssh-tutorial/vm-instance-details.png)

## Set up SSH

There are several authentication methods into a VM, including an SSH public/private key pair or a username and password. We recommend using key-based authentication (if you use a username/password, you'll be prompted to enter your credentials more than once by the extension). If you're on Windows and have already created keys using PuttyGen, you can [reuse them](/docs/remote/troubleshooting.md#reusing-a-key-generated-in-puttygen).

### Create an SSH key

If you don't have an SSH key pair, open a bash shell or the command line and type in:

```bash
ssh-keygen -t ed25519
```

This will generate the SSH key. Press `kbstyle(Enter)` at the following prompt to save the key in the default location (under your user directory as a folder named `.ssh`).

![ssh-keygen output](images/ssh-tutorial/ssh-keygen.png)

You will then be prompted to enter a secure passphrase, but you can leave that blank. You should now have a `id_ed25519.pub` file which contains your new public SSH key.

>**Note**: If you are using a legacy system that doesn't support the Ed25519 algorithm, you can use rsa instead: `ssh-keygen -t rsa -b 4096`.

## Add SSH key to your VM

In the previous step, you generated an SSH key pair. Select **Use existing public key** in the dropdown for **SSH public key source** so that you can use the public key you just generated. Take the public key and paste it into your VM setup, by copying the entire contents of the `id_ed25519.pub` in the **SSH public key**. You also want to allow your VM to accept inbound SSH traffic by selecting **Allow selected ports** and choosing **SSH (22)** from the **Select inbound ports** dropdown list.

![Add SSH public key to VM](images/ssh-tutorial/add-ssh-public-key.png)

### Auto shutdown

A cool feature of using Azure VMs is the ability to enable auto shutdown (because let's face it, we all forget to turn off our VMs…). If you go to the **Management** tab, you can set the time you want to shut down the VM daily.

![Virtual machine auto-shutdown](images/ssh-tutorial/vm-auto-shutdown.png)

Select **Review and Create**, then **Create**, and Azure will deploy your VM for you!

Once the deployment is finished (it may take several minutes), go to the new resource view for your virtual machine.

## Connect using SSH

Now that you've created an SSH host, let's connect to it!

You'll have noticed an indicator on the bottom-left corner of the Status bar. This indicator tells you in which context VS Code is running (local or remote). Click on the indicator to bring up a list of Remote extension commands.

![Remote extension commands](images/ssh-tutorial/remote-commands-simple.png)

Choose the **Connect to Host...** command in the **Remote-SSH** section and connect to the host by entering connection information for your VM in the following format: `user@hostname`.

The `user` is the username you set when adding the SSH public key to your VM. For the `hostname`, go back to the [Azure portal](https://portal.azure.com) and in the **Overview** pane of the VM you created, copy the **Public IP address**.

![Virtual machine public IP address](images/ssh-tutorial/vm-public-ip-address.png)

Before connecting in Remote - SSH, you can verify you're able to connect to your VM via a command prompt using `ssh user@hostname`.

> Note: If you run into an error `ssh: connect to host <host ip> port 22: Connection timed out`, you may need to delete NRMS-Rule-106 from the Networking tab of your VM:

   ![Virtual machine list of NRMS rules](images/ssh-tutorial/vm-nrms-rules.png)

Set the user and hostname in the connection information text box.

![Set user and host name](images/ssh-tutorial/set-user-host.png)

VS Code will now open a new window (instance). You'll then see a notification that the "VS Code Server" is initializing on the SSH Host. Once the VS Code Server is installed on the remote host, it can run extensions and talk to your local instance of VS Code.

![Initializing VS Code Server](images/ssh-tutorial/init-vs-code-server.png)

You'll know you're connected to your VM by looking at the indicator in the Status bar. It shows the hostname of your VM.

![SSH indicator in Status bar](images/ssh-tutorial/ssh-status-bar.png)

The Remote - SSH extension also contributes a new icon on your Activity bar, and clicking on it will open the Remote explorer. From the dropdown, select **SSH Targets**, where you can configure your SSH connections. For instance, you can save the hosts you connect to the most and access them from here instead of entering the user and hostname.

![Remote button on Activity bar](images/ssh-tutorial/remote-on-activity-bar.png)

Once you're connected to your SSH host, you can interact with files and open folders on the remote machine. If you open the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`), you'll see you're working inside a bash shell **while you're on Windows**.

![Checking uname in the terminal](images/ssh-tutorial/check-uname.png)

You can use the bash shell to browse the file system on the VM. You can also browse and open folders on the remote home directory with **File** > **Open Folder**.

![Remote open folder](images/ssh-tutorial/remote-open-folder.png)

## Create your Node.js application

In this step, you will create a simple Node.js application. You will use an application generator to quickly scaffold out the application from a terminal.

### Install Node.js and npm

From the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`), update the packages in your Linux VM, then install Node.js, which includes npm, the Node.js package manager.

```bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

You can verify the installations by running:

```bash
node --version
npm --version
```

### Install the Express generator

[Express](https://www.expressjs.com) is a popular framework for building and running Node.js applications. You can scaffold (create) a new Express application using the [Express Generator](https://expressjs.com/en/starter/generator.html) tool. The Express Generator is shipped as an npm module and installed by using the npm command-line tool `npm`.

```bash
sudo npm install -g express-generator
```

The `-g` switch installs the Express Generator globally on your machine so that you can run it from anywhere.

### Create a new application

You can now create a new Express application called `myExpressApp` by running:

```bash
express myExpressApp --view pug
```

The `--view pug` parameters tell the generator to use the [pug](https://pugjs.org/api/getting-started.html) template engine.

To install all of the application's dependencies, go to the new folder and run `npm install`.

```bash
cd myExpressApp
npm install
```

### Run the application

Last, let's ensure that the application runs. From the terminal, start the application using the `npm start` command to start the server.

```bash
npm start
```

The Express app by default runs on [http://localhost:3000](http://localhost:3000). You won't see anything in your local browser on localhost:3000 because the web app is running on your virtual machine.

### Port forwarding

To be able to browse to the web app on your local machine, you can leverage another feature called [Port forwarding](/docs/remote/ssh.md#temporarily-forwarding-a-port).

To be able to access a port on the remote machine that may not be publicly exposed, you need to establish a connection or a tunnel between a port on your local machine and the server. With the app still running, open the SSH Explorer and find the **Forwarded Ports** view. Click on the **Forward a port** link and indicate that you want to forward port 3000:

![Enter the port to forward](images/ssh-tutorial/enter-port.png)

Name the connection "browser":

![Name the port](images/ssh-tutorial/name-port.png)

The server will now forward traffic on port 3000 to your local machine. When you browse to [http://localhost:3000](http://localhost:3000), you see the running web app.

![Running Express Application](images/ssh-tutorial/express.png)

## Edit and debug

From the Visual Studio Code File Explorer (`kb(workbench.view.explorer)`), navigate to your new `myExpressApp` folder and double-click the `app.js` file to open it in the editor.

### IntelliSense

You have syntax highlighting for the JavaScript file as well as IntelliSense with hovers, just like you would see if the source code was on your local machine.

![Express app.js hover](images/ssh-tutorial/express-hover.png)

When you start typing, you'll get smart completions for the object methods and properties.

![Express app.js smart completions](images/ssh-tutorial/express-completions.png)

### Debugging

Set a breakpoint on line 10 of `app.js` by clicking in the gutter to the left of the line number or by putting the cursor on the line and pressing `kb(editor.debug.action.toggleBreakpoint)`. The breakpoint will be displayed as a red circle.

![set breakpoint](images/ssh-tutorial/set-breakpoint.png)

Now, press `kb(workbench.action.debug.start)` to run your application. If you are asked how to run the application, choose **Node.js**.

The app will start, and you'll hit the breakpoint. You can inspect variables, create watches, and navigate the call stack.

Press `kb(workbench.action.debug.stepOver)` to step or `kb(workbench.action.debug.start)` again to finish your debugging session.

![VS Code debug view](images/ssh-tutorial/debug-view.png)

You get the full development experience of Visual Studio Code connected over SSH.

### Ending your SSH connection

You can end your session over SSH and go back to running VS Code locally with **File** > **Close Remote Connection**.

### Congratulations

Congratulations, you've successfully completed this tutorial!

Next, check out the other Remote Development extensions.

* [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Or get them all by installing the
[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) Extension Pack.
