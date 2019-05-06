---
Order: 6
Area: java
TOCTitle: Tomcat and Jetty
ContentId: 4f5e169c-d91d-46b7-8c36-b695b5862313
PageTitle: Tomcat and Jetty support in Visual Studio Code
DateApproved: 1/2/2019
MetaDescription: Tomcat and Jetty extensions for Java developer using Visual Studio Code.
---

# Tomcat and Jetty support in VS Code

Although Visual Studio Code is a code editor-centric development tool, we know that for certain Java workloads, server integration is very useful. With Visual Studio Code, you can find extensions for popular application servers, for example [Tomcat](http://tomcat.apache.org/) and [Jetty](http://www.eclipse.org/jetty/), which are helpful when working with those servers locally.

For [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard), see [Spring Boot in Visual Studio Code](/docs/java/java-spring-boot.md).

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'tomcat-jetty')" href="javascript:void(0)">Report an issue</a>

## Tomcat

With the [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat) extension, you can manage all your local Tomcat servers within the editor and easily debug and run your `war` package on Tomcat and link Tomcat into your workspace. You can also create a new Tomcat server from the explorer using the **Add** button and run a `war` package on it. You can also create the server during the deployment.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tomcat-jetty/tomcat.mp4" type="video/mp4">
</video>

For running and debugging a package, you can right-click a server to select a `war` package to debug. More details could be found in the [GitHub repository](https://github.com/adashen/vscode-tomcat) of the [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat) extension.

## Jetty

The [Jetty for Java](https://marketplace.visualstudio.com/items?itemName=SummerSun.vscode-jetty) extension for Visual Studio Code makes it much easier for you to run and deploy your `war` package, operate your Jetty Server, and interact with your application within the editor.

The extension includes the following features:

* Add Jetty Server from download directory
* Start/Restart/Stop/Delete Jetty Server
* Run/Debug/Delete `war` package
* Reveal `war` package in file explorer
* Open Server homepage
* Open `war` package homepage

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tomcat-jetty/jetty.mp4" type="video/mp4">
</video>

More details could be found in the [GitHub repository](https://github.com/summersun/vscode-jetty) of the [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat) extension.
