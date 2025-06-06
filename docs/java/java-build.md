---
ContentId: 6ba93ee8-33d7-483a-a3b0-82241cedecbf
DateApproved: 12/10/2021
MetaDescription: Maven and Gradle support for Java in Visual Studio Code
MetaSocialImage:
---
# Java build tools in VS Code

This document is an overview of how to work with your Java build tools in Visual Studio Code. It covers the [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) and [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) extensions as well as other tools.

If you run into any issues when using the features below, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Maven

[Maven](https://maven.apache.org/) is a software tool that helps you manage Java projects and automate application builds. The [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extension for Visual Studio Code provides fully integrated Maven support, allowing you to explore Maven projects, execute Maven commands, and perform the goals of build lifecycle and plugins. We recommend installing the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes Maven support and other important Java development features.

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

### Exploring Maven project

Once a Maven project is loaded, the extension will be activated and it will automatically scan for `pom.xml` files in your workspace and displays all Maven projects and their modules in the side bar.

![Maven Explorer](images/java-build/maven-explorer.png)

### Resolve unknown type

The Maven extension also supports searching Maven Central to resolve unknown types in your source code. You can do this by selecting the **Resolve unknown type** link shown on hover.

<video src="images/java-build/maven-resolve-unknown-type.mp4" autoplay loop muted playsinline controls title="Resolve unknown type">
</video>

### Working with POM.xml

The extension provides code snippets and auto completion for adding Maven dependencies based on local Maven repositories. See how easy it is to add a new dependency to your `pom.xml` with those convenient features.

<video src="images/java-build/maven-pom-editing.mp4" autoplay loop muted playsinline controls title="Add a new dependency to POM file">
</video>

The extension also enables you to generate effective POM.

<video src="images/java-build/maven-effective-pom.mp4" autoplay loop muted playsinline controls title="Generate effective POM">
</video>

You can also use the command **Maven: Add a Dependency** (or `maven.project.addDependency`) to help add a new dependency to `pom.xml`. The process is interactive.

<video src="images/java-build/maven-add-dependency.mp4" autoplay loop muted playsinline controls title="Add a dependency">
</video>

You can also add dependencies through the project view, which calls the same Maven command.

<video src="images/java-build/maven-add-dependency-2.mp4" autoplay loop muted playsinline controls title="Add dependency through project view">
</video>

Furthermore, VS Code also supports showing dependencies in a tree view, which allows you to inspect all dependencies in your project at a single place and check for potential issues.

<video src="images/java-build/maven-dependency-tree.mp4" autoplay loop muted playsinline controls title="Inspect Maven dependency tree">
</video>

### Execute Maven commands and goals

By right-clicking each Maven project in the Explorer, you can conveniently run Maven goals.

<video src="images/java-build/maven-run.mp4" autoplay loop muted playsinline controls title="Run Maven goals">
</video>

The extension also preserves the history of goals for each project, so you can quickly rerun the previous command, which is useful when you're running a long custom goal.

There are two ways to rerun a goal:

1. In the Command Palette, run **Maven: History**, then select a project and a command from its history.
2. Right-click a project and select **History**. You can then select a previous command from history.

<video src="images/java-build/maven-history.mp4" autoplay loop muted playsinline controls title="Run goals from Maven history">
</video>

You can also specify your favorite commands in settings for future execution.

<video src="images/java-build/maven-favorite-command.mp4" autoplay loop muted playsinline controls title="Specify favorite commands">
</video>

For each plug-in you use with your project, the extension also provides you an easy way to access the goals within each plugin.

<video src="images/java-build/maven-plugin-goal.mp4" autoplay loop muted playsinline controls title="Easy way to access goals within each plugin">
</video>

To debug Maven goals, right-click on a goal and start debugging. The Maven extension will call the Java debugger with the right parameters. This is a handy, time-saving feature.

<video src="images/java-build/debug-maven-plugin-goals.mp4" autoplay loop muted playsinline controls title="Debug Maven goals">
</video>

### Generate project from Maven Archetype

Another handy feature provided by this extension is to generate a Maven project from [Archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html). The extension loads archetypes listed in local/remote catalogs. After selection, the extension sends `mvn archetype:generate -D...` to the terminal.

There are several ways to create a Maven project:

1. From the Maven Explorer, select the **+** **Create Maven Project** button.

   ![Create Maven Project](images/java-build/create-maven-project.png)

2. Open the **Command Palette** (`kb(workbench.action.showCommands)`), search for **Create Java Project** command.

   <video src="images/java-build/maven-archetype-command.mp4" autoplay loop muted playsinline controls title="Create Java Project Command">
   </video>

3. Right-click on a target folder and select **Create Maven Project**.

   <video src="images/java-build/maven-archetype-folder.mp4" autoplay loop muted playsinline controls title="Create Maven Project Command">
   </video>

## Gradle

VS Code supports Gradle Java projects (excluding Android) through the [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) extension. This extension offers several components to enhance your Gradle Java project experience:
- **Gradle Build Server:** The [Gradle Build Server](https://github.com/microsoft/build-server-for-gradle) is used to import Gradle projects and delegate build tasks to the Gradle daemon, ensuring consistent project output as if running Gradle tasks from the command line.
- **Visual Interface:** Allows you to view and manage Gradle tasks and project dependencies, and run Gradle tasks directly within VS Code.
- **Gradle Language Server:** Provides an improved authoring experience for Gradle build files, including syntax highlighting, error reporting, and auto-completion.

### Gradle Build Server
By default, if you have installed the Gradle for Java extension, the Gradle Build Server is used to import Gradle projects. You can toggle the Gradle Build Server on or off by setting `java.gradle.buildServer.enabled`.

You can view the Gradle build output in the Build Server for Gradle (Build) output channel and trace the interactions between VS Code and the Gradle Build Server in the Build Server for Gradle (Log) output channel.

### Delegate tests to Gradle
The extension supports delegating the test execution to Gradle. You can configure the test profile you want to use in the Testing Explorer.

<video src="images/java-build/delegate-test-to-gradle.mp4" autoplay loop muted playsinline controls title="Delegate tests to Gradle">
</video>

> Note: Make sure you have installed the [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) extension to use this feature.

### Working with Gradle tasks

When you open a Gradle project in VSCode, you can find some useful Gradle views by clicking the Gradle Side Bar item. **Gradle Projects** view lists all the Gradle projects found in the workspace. You can view, run, or debug Gradle tasks here.

<video src="images/java-build/gradle-tasks.mp4" autoplay loop muted playsinline controls title="Gradle tasks view">
</video>

When there are many Gradle tasks in the workspace, it might be hard to find a specific task. The extension offers a **Pinned Tasks** view to help you pin your favorite tasks so that you can easily find them in a separate view. You can also see recently executed tasks in the **Recent Tasks** view.

<video src="images/java-build/gradle-pinned-recent-tasks.mp4" autoplay loop muted playsinline controls title="Pin a Gradle task">
</video>

### Viewing Gradle dependencies

In the **Gradle Projects** view, you can find a **Dependencies** item under each Gradle project item. It includes all the dependencies in your specified configuration, you can easily check the dependency status of your project.

![Gradle Dependencies](images/java-build/gradle-dependencies.png)

### Managing Gradle Daemons

The **Gradle Daemons** view shows the daemon status of the current workspace. It lists all the running Gradle daemons in the same version as the workspace. You can choose to stop a specific one or all the daemons in this view.

<video src="images/java-build/gradle-daemons.mp4" autoplay loop muted playsinline controls title="Managing Gradle Daemons">
</video>

### Authoring build files

The extension provides some useful authoring features on the Gradle build files.

When opening a Groovy Gradle file, the extension will analyze the Gradle file and provide semantic tokens information, providing more precise highlighting results.

![Gradle Highlighting](images/java-build/gradle-highlighting.png)

In the **Outline** view, the extension provides the document symbols of the opened Gradle file, which can help you to navigate to any part of the file easily.

![Gradle Outline](images/java-build/gradle-outline.png)

If there is any syntax error (missing characters, type not found, etc.) in the opened Gradle file, you can find them in the **Problems** view.

![Gradle Problems](images/java-build/gradle-problems.png)

The extension supports basic auto completions for a Gradle file, when you're trying to type Gradle closures or properties in a Gradle script, the extension will suggest available closures or properties for you.

<video src="images/java-build/gradle-auto-completion.mp4" autoplay loop muted playsinline controls title="Auto completion for Gradle file">
</video>

When you are trying to declare a new dependency, the extension will provide a dependency candidate list for you.

<video src="images/java-build/gradle-dependency-completion.mp4" autoplay loop muted playsinline controls title="Auto completion for new dependency for Gradle">
</video>

## Additional resources

Visit the [GitHub Repo](https://github.com/microsoft/vscode-maven) of the Maven extension for additional [configurations](https://github.com/microsoft/vscode-maven/tree/main#additional-configurations) and a [troubleshooting guide](https://github.com/microsoft/vscode-maven/blob/main/Troubleshooting.md).

In addition to Maven, there's also a [Bazel extension](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel) if you use Bazel to build and test your project.

## Next steps

Read on to find out more about:

* [Java editing](/docs/java/java-editing.md) - Explore the editing features for Java in VS Code.
* [Java debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
* [Java testing](/docs/java/java-testing.md) - Use VS Code for your JUnit and TestNG cases.
* [Java extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
