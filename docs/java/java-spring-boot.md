---
Order: 9
Area: java
TOCTitle: Spring Boot
ContentId: d37118cf-1b5b-4aee-9727-52fcfcac16bd
PageTitle: Spring Boot support in Visual Studio Code
DateApproved: 4/14/2021
MetaDescription: Spring Boot extensions for Java developer using Visual Studio Code editor.
---

# Spring Boot in Visual Studio Code

Visual Studio Code is an ideal lightweight development environment for Spring Boot application developers and there are several useful VS Code extensions including:

* [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
* [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
* [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'springboot')" href="javascript:void(0)">Report an issue</a>

## Prerequisites

A working Java environment with essential extensions installed is needed, including:

* [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/), version 11 or later.
* [Apache Maven](https://maven.apache.org/), version 3.0 or later.
* [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

For more details, please refer to [Java Tutorial](/docs/java/java-tutorial.md#before-you-begin)

>**Note**: More information about JDK can be found at [supported Java versions](/docs/java/java-tutorial.md#supported-java-versions).

## Create the project

The [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) extension allows you to search for dependencies and generate new Spring Boot projects.

To install, launch VS Code and from the Extensions view (`kb(workbench.view.extensions)`), search for `vscode-spring-initializr`.

Once you have the extension installed, open the **Command Palette** (`kb(workbench.action.showCommands)`) and type `Spring Initializr` to start generating a Maven or Gradle project and then follow the wizard.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-spring-boot/spring-initializr.mp4" type="video/mp4">
</video>

## Edit the project

The [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) extension allows you to edit dependencies after generating a new Spring Boot project.

Navigate to your `pom.xml` file and right-click to select `Edit starters`. The  **Command Palette** will show the dependencies you already have beginning with a `√` . You can search for other dependencies you want to add to your project. Or you can click on the existing dependencies to remove them.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-spring-boot/edit-starters.mp4" type="video/mp4">
</video>

## Develop the application

The [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot) extension includes rich language support for working with Spring Boot `application.properties`, `application.yml`, and `.java` files.

The extension supports quick navigate through source code, smart code completions, quick access to running apps, live application information, and code templates. Similar code completion and validation features are also available for `.properties` and `.yml` files.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-spring-boot/spring-code-edit.mp4" type="video/mp4">
</video>

## Run the application

In addition to click `kb(workbench.action.debug.start)` to run your application, there's another convenient extension [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard) with which you can view and manage all available Spring Boot projects in your workspace as well as quickly start, stop, or debug your project.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-spring-boot/spring-dashboard.mp4" type="video/mp4">
</video>

## Next steps

* To deploy your web app, see the [Deploy a Java Application to Azure](/docs/java/java-webapp.md) tutorial.
* To containerize a web app and deploy as a Docker container, check out the [Working with Docker](/docs/azure/docker.md).
* To learn more about Java Debugging features, see [Java Debugging Tutorial](/docs/java/java-debugging.md).