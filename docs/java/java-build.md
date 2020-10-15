---
Order: 6
Area: java
TOCTitle: Build Tools
ContentId: 6ba93ee8-33d7-483a-a3b0-82241cedecbf
PageTitle: Maven and Gradle support for Java in Visual Studio Code
DateApproved: 9/14/2020
MetaDescription: Maven and Gradle support for Java in Visual Studio Code
MetaSocialImage:
---

# Java build tools in VS Code

This document will give you an overview of how work with your Java build tools in Visual Studio Code. It covers the [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extension as well as other tools.

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'project')" href="javascript:void(0)">Report an issue</a>

## Maven

[Maven](https://maven.apache.org/) is a software tool that helps you manage Java projects and automate application builds. The [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extension for Visual Studio Code provides fully integrated Maven support, allowing you to explore Maven projects, execute Maven commands, and perform the goals of build lifecycle and plugins.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-maven">Install the Maven for Java extension</a>

### Exploring Maven project

Once a Maven project is loaded, the extension will be activated and it will automatically scan for `pom.xml` files in your workspace and displays all Maven projects and their modules in the side bar.

![Maven Explorer](images/java-build/maven-explorer.png)

### Resolve unknown type

The Maven extension also supports searching Maven Central to resolve unknown types in your source code. You can do this by selecting the **Resolve unknown type** link shown on hover.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-resolve-unknown-type.mp4" type="video/mp4">
</video>

### Working with POM.xml

The extension provides code snippets and auto completion for adding Maven dependencies based on local Maven repositories. See how easy it is to add a new dependency to your `pom.xml` with those convenient features.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-pom-editing.mp4" type="video/mp4">
</video>

The extension also enables you to generate effective POM.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-effective-pom.mp4" type="video/mp4">
</video>

You can also use the command **Maven: Add a Dependency** (or `maven.project.addDependency`) to help add a new dependency to `pom.xml`. The process is interactive.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-add-dependency.mp4" type="video/mp4">
</video>

You can also add dependencies through the project view, which calls the same Maven command.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-add-dependency-2.mp4" type="video/mp4">
</video>

Furthermore, VS Code also supports showing dependencies in a tree view, which allows you to inspect all dependencies in your project at a single place and check for potential issues.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-dependency-tree.mp4" type="video/mp4">
</video>

### Execute Maven commands and goals

By right-clicking each Maven project in the explorer, you can conveniently run Maven goals.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-run.mp4" type="video/mp4">
</video>

The extension also preserves the history of goals for each project, so you can quickly rerun the previous command, which is useful when you're running a long custom goal.

There are two ways to rerun a goal:

1. Command Palette > Select **Maven: History** > Select a project > Select command from the history.
2. Right-click a project > Click **History** > Select command from history.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-history.mp4" type="video/mp4">
</video>

You can also specify your favorite commands in settings for future execution.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-favorite-command.mp4" type="video/mp4">
</video>

For each plug-in you use with your project, the extension also provides you an easy way to access the goals within each plugin.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-plugin-goal.mp4" type="video/mp4">
</video>

To debug Maven goals, right-click on a goal and start debugging. The Maven extension will call the Java debugger with the right parameters. This is a handy, time-saving feature.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/debug-maven-plugin-goals.mp4" type="video/mp4">
</video>

### Generate project from Maven Archetype

Another handy feature provided by this extension is to generate a Maven project from [Archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html). The extension loads archetypes listed in local/remote catalogs. After selection, the extension sends `mvn archetype:generate -D...` to the terminal.

There are two ways to generate a Maven project:

1. From the Command Palette, select **Maven: Generate from Maven Archetype**.
2. Right-click on a folder and select **Generate from Maven Archetype**.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-build/maven-archetype.mp4" type="video/mp4">
</video>

## Gradle

VS Code supports basic Gradle Java project (not including Android). There are also a couple third party extensions available for writing `.gradle` files as well as running Gradle tasks.

* [Gradle Language Support](https://marketplace.visualstudio.com/items?itemName=naco-siren.gradle-language)
* [Gradle Tasks](https://marketplace.visualstudio.com/items?itemName=richardwillis.vscode-gradle)

### Additional resources

Visit the [GitHub Repo](https://github.com/microsoft/vscode-maven) of the Maven extension for additional [configurations](https://github.com/microsoft/vscode-maven/tree/master#additional-configurations) and a [troubleshooting guide](https://github.com/microsoft/vscode-maven/blob/master/Troubleshooting.md).

In addition to Maven, there's also a [Bazel extension](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel) if you use Bazel to build and test your project.

## Next steps

Read on to find out more about:

* [Java Editing](/docs/java/java-editing.md) - Explore the editing features for Java in VS Code.
* [Java Debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
* [Java Testing](/docs/java/java-testing.md) - Use VS Code for your JUnit and TestNG cases.
* [Java Extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
