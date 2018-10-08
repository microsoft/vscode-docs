# Using Vue in Visual Studio Code

[Vue]() (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with [modern tooling]() and [supporting libraries]().

![welcome to Vue](images/vue/cli-my-app.png)

## Welcome to Vue

We'll be using the `vue create` [generator](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) for this tutorial. To install and use the generator as well as run the Vue application server, you'll need the [Node.js](https://nodejs.org/) JavaScript runtime, [npm](https://www.npmjs.com/) (the Node.js package manager) and [Vue CLI](https://cli.vuejs.org/guide/installation.html) installed. npm is included with Node.js which you can install from [here](https://nodejs.org/en/download/).

>**Tip**: To test that you have Node.js, npm and vue correctly installed on your machine, you can type `node --version`, `npm --version` and `vue --version`.

You can now create a new React application by typing:

```bash
vue create my-app
```

#### WARNING
> If you are on Windows using Git Bash with minTTY, the interactive prompts will not work. You must launch the command as winpty vue.cmd create hello-world.

You will be prompted to pick a preset. You can either choose the default preset which comes with a basic **Babel + ESLint** setup, or select "Manually select features" to pick the features you need.

![CLI New Project](images/vue/cli-new-project.png)

The default setup is great for quickly prototyping a new project, while the manual setup provides more options that are likely needed for more production-oriented projects.

![CLI Features](images/vue/cli-select-features.png)

If you chose to manually select features, at the end of the prompts you also have the option to save your selections as a preset so that you can reuse it in the future. We will discuss presets and plugins in the next section.

Let's quickly run our Vue application by navigating to the new folder and typing `npm run serve` to start the web server and open the application in a browser:

```bash
$ cd my-app
$ npm run serve

DONE  Compiled successfully                                                                                                              
 App running at:
 - Local:   http://localhost:8080/
 - Network: http://172.29.65.168:8080/

 Note that the development build is not optimized.
 To create a production build, run npm run build.
```

You should see "Welcome to Your Vue.js App" on `http://localhost:8080` in your browser. We'll leave the web server running while we look at the application with VS Code.

![CLI My App](images/vue/cli-my-app.png)

To open your Vue application in VS Code, open another terminal (or command prompt) and navigate to the `my-app` folder and type `code .`:

```bash
cd my-app
code .
```
