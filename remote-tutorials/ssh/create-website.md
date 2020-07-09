---
Order: 5
Area: ssh
TOCTitle: Create a website
PageTitle: Create a Node.js Express web app on your virtual machine
MetaDescription: Create a Node.js Express web app on your virtual machine
DateApproved: 7/9/2020
---
# Create your Node.js Application

In this step, you will create a simple Node.js application. You will use an application generator to quickly scaffold out the application from a terminal.

## Install Node.js and npm

From the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`), install Node.js and npm, the Node.js package manager.

```bash
sudo apt-get install nodejs npm
```

You can verify the installations by running:

```bash
node --version
npm --version
```

## Install the Express Generator

[Express](https://www.expressjs.com) is a popular framework for building and running Node.js applications. You can scaffold (create) a new Express application using the [Express Generator](https://expressjs.com/en/starter/generator.html) tool. The Express Generator is shipped as an npm module and installed by using the npm command-line tool `npm`.

```bash
sudo npm install -g express-generator
```

The `-g` switch installs the Express Generator globally on your machine so you can run it from anywhere.

## Scaffold a New Application

You can now scaffold a new Express application called `myExpressApp` by running:

```bash
express myExpressApp --view pug
```

The `--view pug` parameters tell the generator to use the [pug](https://pugjs.org/api/getting-started.html) template engine.

To install all of the application's dependencies, go to the new folder and run `npm install`.

```bash
cd myExpressApp
npm install
```

## Run the Application

Last, let's ensure that the application runs. From the terminal, start the application using the `npm start` command to start the server.

```bash
npm start
```

The Express app by default runs on [http://localhost:3000](http://localhost:3000). You won't see anything in your local browser on localhost:3000 because the web app is running on your virtual machine.

## Port forwarding

To be able to browse to the web app on your local machine, you can leverage another feature called [Port forwarding](/docs/remote/ssh.md#forwarding-a-port-creating-ssh-tunnel).

To be able to access a port on the remote machine that may not be publicly exposed, you need to establish a connection or a tunnel between a port on your local machine and the server. With the app still running, open the SSH Explorer and find the **Forwarded Ports** view. Click on the **Forward a port** link and indicate that you want to forward port 3000:

![Enter the port to forward](images/ssh/enter-port.png)

Name the connection "browser":

![Name the port](images/ssh/name-port.png)

The server will now forward traffic on port 3000 to your local machine. When you browse to http://localhost:3000, you see the running web app.

![Running Express Application](images/ssh/express.png)

----

<a class="tutorial-next-btn" href="/remote-tutorials/ssh/edit-and-debug">I've created a web app</a> <a class="tutorial-feedback-btn" onclick="reportIssue('remote-tutorials-ssh', 'create-website')" href="javascript:void(0)">I ran into an issue</a>
