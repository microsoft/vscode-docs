---
Order: 10
Area: java
TOCTitle: Application Servers
ContentId: 4f5e169c-d91d-46b7-8c36-b695b5862313
PageTitle: Working with application servers in Visual Studio Code
DateApproved: 12/142021
MetaDescription: Tomcat, Jetty and Open Liberty extensions for Java developer using Visual Studio Code.
---

# Working with Application Servers in VS Code

Visual Studio Code is a code editor-centric development tool, so it doesn't come with any embedded application server. For most servers, you will need to deploy them using the command line, and then use the appropriate debugger [configuration](/docs/java/java-debugging.md#configure) if you want to attach to it.

On the other hand, we know that for certain Java workloads, server integration is very useful. With Visual Studio Code, you can find third party extensions for popular application servers, for example [Tomcat](https://tomcat.apache.org/), [Jetty](https://www.eclipse.org/jetty/), and [Open Liberty](https://openliberty.io/), which are helpful when working with those servers locally.

For [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard), see [Spring Boot in Visual Studio Code](/docs/java/java-spring-boot.md).

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Community Server Connectors

The [Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) extension is published by Red Hat. It provides a Remote Server Protocol-based server connector, which can start, stop, publish to, and otherwise control community runtimes and servers like [Apache Felix](https://felix.apache.org/documentation/index.html), [Karaf](https://karaf.apache.org/), and [Tomcat](https://tomcat.apache.org/).

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tomcat-jetty/server-connector.mp4" type="video/mp4">
</video>

## Other Servers

The [Open Liberty Tools](https://marketplace.visualstudio.com/items?itemName=Open-Liberty.liberty-dev-vscode-ext) extension lets you run your application on Open Liberty, allowing you to deploy, test, and debug your application from Visual Studio Code.

The [Server Connector](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-server-connector) extension by Red Hat allows you to start, stop, and deploy to a Red Hat server and runtime products like WildFly, JBoss EAP, Minishift, CDK.

[Extension Pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack) provides tools for creating MicroProfile projects to develop and deploy to runtimes such as Open Liberty, Quarkus, and Payara.
