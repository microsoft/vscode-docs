---
Order: 1
Area: java
TOCTitle: Java Tutorial
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Build Java Web Apps with Visual Studio Code
DateApproved: 5/30/2018
MetaDescription: Java tutorial showing Java language support in the Visual Studio Code editor.
---
# Build Java Web Apps with VS Code

This tutorial shows you how to create a simple Java web application with Visual Studio Code. You'll learn how to run, debug, and edit the Java web app locally.

## Scenario

A simple Spring Boot Getting Started web app

![Greeting from Java](images/java-tutorial/greeting-from-spring.png)

## Before you begin

Before running and deploying this sample, you must have the Java SE Development Kit (JDK) and Apache Maven build tools on your local development environment. If you don't have, please install them.

Download and install the Java SE Development Kit (JDK), version 8:

<a class="tutorial-next-btn" href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank" style="background-color:#68217A">Download JDK</a>

>**Note**: The `JAVA_HOME` environment variable must be set to the install location of the JDK to complete this tutorial.

Download Apache Maven version 3 or greater:

<a class="tutorial-next-btn" href="https://maven.apache.org/download.cgi" target="_blank" style="background-color:#68217A">Download Apache Maven</a>

Install Apache Maven for your local development environment:

<a class="tutorial-next-btn" href="https://maven.apache.org/install" target="_blank" style="background-color:#68217A">Install Apache Maven</a>

## Download and test the Spring Boot app

Clone the [Spring Boot Getting Started](https://github.com/spring-guides/gs-spring-boot) sample project to your local machine. You can clone a Git repository with the **Git: Clone** command in the **Command Palette** (`kb(workbench.action.showCommands)`). Paste `https://github.com/spring-guides/gs-spring-boot.git` as the URL of the remote repository and then decide the parent directory under which to put the local repository. After that, open the cloned repository in VS Code by navigating to the repository folder and typing `code .`.

>**Note**: You can install Visual Studio Code from [https://code.visualstudio.com](https://code.visualstudio.com/) and Git from [https://git-scm.com](https://git-scm.com/).

![Clone Spring Repository](images/java-tutorial/clone-repository.gif)

From within VS Code, navigate to the `complete` folder that contains the project which is ready to run. Open any of the Java files in the repository (for example `complete\src\main\java\hello\Application.java`). If you don't have the Java language extensions installed for VS Code, you will be prompted to install the Microsoft [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack). Follow the instructions and reload VS Code after the installation.

![Install Java Extensions](images/java-tutorial/install-extensions.gif)

Once you have the Java Extension Pack installed, it will automatically build the project for you (this may take several minutes). You can run the application within VS Code by pressing `kb(workbench.action.debug.start)` and selecting the **Java** environment. The Java Debug extension will generate a debugging configuration file `launch.json` for you under a `.vscode` folder in your project. You can see build progress in the VS Code Status Bar and when everything is finished, the final active debug configuration is displayed.

![debug configuration in the Status Bar](images/java-tutorial/debugging-status-bar.png)

You can learn more about how VS Code launches your application in Debugging [Launch Configurations](/docs/editor/debugging.md#launch-configurations). Press `kb(workbench.action.debug.start)` again to launch the debugger.

![Run Spring Boot](images/java-tutorial/run-spring-boot.gif)

Test the web app by browsing to `http://localhost:8080` using a web browser. You should see the following message displayed: "Greetings from Spring Boot!".

![Greeting from Spring](images/java-tutorial/greeting-from-spring.png)

## Make a change

Let's now edit `HelloController.java` to change "Greetings from Spring Boot!" to something else like "Hello World". VS Code provides a great editing experience for Java, check out [Editing and Navigating Code](/docs/languages/java.md#editing-and-navigating-code) to learn about VS Code's editing and code navigation features.

Click the **Restart** button on the top of the editor to relaunch the app and see result by reloading the browser.

![Restart Application](images/java-tutorial/restart-application.png)

## Debug the application

Set a breakpoint (`kb(editor.debug.action.toggleBreakpoint)`) in the application source code, and reload your browser to hit the breakpoint.

![Debug Application](images/java-tutorial/debugging.png)

If you would like to learn more about debugging Java with VS Code, you can read [Java Debugging](/docs/java/java-debugging.md).

Congratulations, you have your first Spring Boot web app running locally! Read on to learn how to host it in the cloud.

## Next steps

* If you'd like to learn how to deploy your web application, checkout out the [Deploy a Java Application to Azure Web App](/docs/java/java-webapp.md) tutorial where we show how to run your web app in the cloud.
* To see how you can containerize the web app and deploy to the cloud as a Docker container, check out [Java Container Tutorial](/docs/java/java-container.md)
* To learn more about Java Debugging features, see [Java Debugging Tutorial](/docs/java/java-debugging.md)
