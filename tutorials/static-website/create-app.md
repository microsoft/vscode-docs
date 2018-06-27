---
Order: 2
Area: staticsite
TOCTitle: Create the application
PageTitle: Create the application
MetaDescription: Website deployment to Azure Storage with Visual Studio Code
DateApproved: 6/27/2018
---
# Create your Node.js application

In this section, you will create a simple static website that can be deployed to the cloud. This tutorial uses [create-react-app](https://github.com/facebook/create-react-app), a React utility CLI, to quickly scaffold out a simple React app from the terminal. However, if you want to use Angular, Vue, any other framework, or just a folder with a few HTML files, those will all work too.

> **Tip:** If you already have your own application ready to deploy, you can skip ahead to [Deploy the Website](/tutorials/static-website/choose-deployment.md).

## Install create-react-app tool

[React](https://reactjs.org/) is a popular framework for building web applications, so we will use it as an example. You can scaffold (create) a new React application using the [create-react-app](https://github.com/facebook/create-react-app) tool. The `create-react-app` tool is shipped as an npm module and can be installed by using `npm`.

```bash
npm install -g create-react-app
```

The `-g` switch installs the `create-react-app` globally on your machine so you can run it from anywhere.

## Create a new application

Next, scaffold a new React app called `my-react-app` by running:

```bash
create-react-app my-react-app
```

And build the application by switching to the new folder and running `npm run build`.

```bash
cd my-react-app
npm run build
```

You should now have a `build` folder in your project folder. This contains the `.html`, `.css`, and `.js` files we will be deploying to Azure Storage.

## Run the application

Finally, let's ensure that the application runs. From the terminal, start the application using the `npm start` command.

```bash
npm start
```

Now, open your browser and navigate to [http://localhost:3000](http://localhost:3000), where you should see something like this:

![Running React App](images/static-website/local-app.png)

You are now ready to deploy your app!

----

<a class="tutorial-next-btn" href="/tutorials/static-website/create-storage">I created the React application</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-app')" href="javascript:void(0)">I ran into an issue</a>
