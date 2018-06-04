---
Order: 2
Area: java
TOCTitle: Spring Boot
ContentId: d37118cf-1b5b-4aee-9727-52fcfcac16bd
PageTitle: Spring Boot support in VS Code
DateApproved: 5/30/2018
MetaDescription: Spring Boot extensions for Java developer using Visual Studio Code editor.
---
# Build Spring Boot Apps with VS Code

Visual Studio Code is an ideal lightweight development environment for Spring Boot developers and there are several useful VS Code extensions including:

* [Spring Boot Support](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
* [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)

## Create Project

The [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) extension allows you to search for dependencies and generate new Spring Boot projects.

To install, launch VS Code and from the Extensions view (`kb(workbench.view.extensions)`), search for `vscode-spring-initializr`.

Once you have the extension installed, open the **Command Palette** (`kb(workbench.action.showCommands)`) and type `Spring Initializr` to start generating a Maven or Gradle project and then follow the wizard.

![Spring Initializr](images/java-spring-boot/spring-initializr.gif)

## Develop Application

The [Spring Boot Support](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot) extension includes rich language support for working with Spring Boot `application.properties`, `application.yml` and `.java` files.

The extension supports quick navigate through source code, smart code completions, quick access to running apps, and live application information. Similar code completion and validation features are also available for `.properties` and `.yml` files.

## Debug Application

You can press `kb(workbench.action.debug.start)` to run your application. After setting a breakpoint (`kb(editor.debug.action.toggleBreakpoint)`) in your source code, refresh your browser to hit the breakpoint. Details about debugging can be found in [Java Debugging](/docs/java/java-debugging.md)

## Next steps

* To deploy your web app, see the [Deploy a Java Application to Azure](/docs/java/java-webapp.md) tutorial.
* To containerize a web app and deploy as a Docker container, check out the [Java Container Tutorial](/docs/java/java-container.md).
* To learn more about Java Debugging features, see [Java Debugging Tutorial](/docs/java/java-debugging.md).
