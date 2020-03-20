---
Order: 5
Area: java
TOCTitle: Project Management
ContentId: 251cba68-c77f-4ac6-a5de-1fab8dcca867
PageTitle: Syntax Mode, Maven Support, Java Package, and Dependency Management in Visual Studio Code
DateApproved: 6/17/2019
MetaDescription: Maven Support, Java Package and Dependency Management in Visual Studio Code
MetaSocialImage:
---

# Java Project Management in VS Code

This document will give you an overview of how to use the [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency) and [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extensions to manage your projects within Visual Studio Code.

VS Code also support a Syntax Mode for Java which works best for reading and navigating through source files.

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'project')" href="javascript:void(0)">Report an issue</a>

## Syntax Mode

Reading and navigating through source code is a common usage for lightweight editor. When developers use VS Code to open a Java source file/folder which doesn't involve a project system, it's annoying to see lots of semantic error reported when the source cannot be resolved as a project. With Syntax Moce, you’ll be able to read code more efficiently with the help of Code Navigation and Outline features. Syntax errors are also reported so you can fix them right away.

The good thing about this capability is that you won’t even aware its existence. But there is definitely a way to configure it. Go to PROBLEMS view, and look for the warning `File xxx is non-project file, only syntax errors are reported`, which means you are in Syntax Mode. If you want to see all the type errors and get full support, right click on this warning and the switch is in the context menu. See screenshots below.

![Enable Semantic](enablesemantic.png)

The project mode will provide you full support for [standalone Java files](#standalone-java-file-support). It's also easy to turn back to Syntax Mode.

![Switch to Syntax](syntaxonly.png)

## Project management

Project Management in Visual Studio Code is provided by the [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency) extension. This extension has many features including creating projects as well as viewing the package structure of the project and its dependencies.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-dependency">Install the Java Dependency Viewer</a>

### Create project

In addition to creating a project through Maven Archetype, you can also use the following command to create a simple Java project: **Java: Create Java Project** from the Command Palette.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/create-project.mp4" type="video/mp4">
</video>

If you're creating a Spring Boot project, you can also use the [Spring Initializr](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) extension, see [Spring Boot in Visual Studio Code](/docs/java/java-spring-boot.md).

### Package and dependency view

The extension also has a hierarchy view of your project and dependencies, which supplements the file view and outline provided by Visual Studio Code, so you don't need to expand multiple subfolders to just view your Java package.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/package-viewer.mp4" type="video/mp4">
</video>

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/hierarchical.mp4" type="video/mp4">
</video>

### Standalone Java file support

Visual Studio Code also supports Java files without a project system. The solution is folder-based, so you can open a source folder with Visual Studio Code. After switching from [Syntax Mode](#syntax-mode) to Project Mode (by clicking the `Report compilation errors...` quickfix), all the Java files within the folder will be properly compiled with all language features available. You can also run and debug standalone files.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/standalone.mp4" type="video/mp4">
</video>

### Multiple source folders

If you have multiple subfolders that have source code for your project, you can easily add these folders to source path, then all the code inside will be correctly compiled.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/multiple-source.mp4" type="video/mp4">
</video>

### Adding external JAR

You can use the Java Dependency Viewer to add any JAR file to your project.

![Add Dependency](images/java-project/manage-dependencies.gif)

The other easy way to bring additional JAR files as dependencies is to create a `lib/` folder in the root directory of the standalone files and place your JAR files there. Source for `foo.jar` is automatically detected if there is a `foo-sources.jar` in the `lib/` folder.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/lib.mp4" type="video/mp4">
</video>

Behind the scene, there's a setting `java.project.referencedLibaries`. Below are details on how to customize this setting.

**Include libraries**

The libraries to reference are described using a set of glob patterns.

For example:

```json
"java.project.referencedLibraries": [
    "library/**/*.jar",
    "/home/username/lib/foo.jar"
]
```

The settings above will add all `.jar` files in workspace's library folder along with `foo.jar` from a specified absolute path to the project's external dependencies.

The referenced libraries are then watched by VS Code, and the project will be refreshed if there is a change to any of these dependent files.

By default, VS Code will reference all JAR files in workspace's `lib` directory using the glob pattern `lib/**/*.jar`.

**Exclude some libraries**

If you want to exclude some libraries from the project, you can expand `java.project.referencedLibraries` to use `include/exclude` fields and add an `exclude` glob pattern:

```json
"java.project.referencedLibraries": {
    "include": [
        "library/**/*.jar",
        "/home/username/lib/foo.jar"
    ],
    "exclude": [
        "library/sources/**"
    ]
}
```

In the example above, any binary JAR files in the `library/sources` folder are ignored as the project's external dependencies.

**Attach source jars**

By default, a referenced `{binary}.jar` will try to search `{binary}-sources.jar` under the same directory, and attach it as source if one match is found.

If you want to manually specify a JAR file as a source attachment, you can provide a key-value map in the `sources` field:

```json
"java.project.referencedLibraries": {
    "include": [
        "library/**/*.jar",
        "/home/username/lib/foo.jar"
    ],
    "exclude": [
        "library/sources/**"
    ],
    "sources": {
        "library/bar.jar": "library/sources/bar-src.jar"
    }
}
```

In this way, `bar-src.jar` is attached to bar.jar as its source.

In case VS Code throws an error for a classpath issue, try setting your classpath manually by either [setting the CLASSPATH environment variable](https://docs.oracle.com/javadb/10.8.3.0/getstart/tgs26250.html) or editing the `.classpath` file with the path to the JAR file:

```xml
<classpathentry kind="lib" path="lib/log4j.jar"/>
```

In some rare cases, you may need to clean the Java workspace by executing the **Java: Clean the java language server workspace** command from the Command Palette (`kb(workbench.action.showCommands)`) to let the language server rebuild your dependencies.

### Configure multiple JDK

As Java evolves, Java developers sometimes need to deal with multiple Java runtimes. The Java extension supports preference mapping through the `java.configuration.runtimes` array for Java execution environments. VS Code will detect the runtime required for your project and choose the appropriate one configured.

```json
"java.configuration.runtimes": [
  {
    "name": "JavaSE-1.8",
    "path": "/usr/local/jdk1.8.0_201"
  },
  {
    "name": "JavaSE-11",
    "path": "/usr/local/jdk-11.0.3",
    "sources" : "/usr/local/jdk-11.0.3/lib/src.zip",
    "javadoc" : "https://docs.oracle.com/en/java/javase/11/docs/api",
    "default":  true
   },
   {
    "name": "JavaSE-12",
    "path": "/usr/local/jdk-12.0.2"
   },
   {
    "name": "JavaSE-13",
    "path": "/usr/local/jdk-13"
   }
]
```

Runtime names must be one of: "J2SE-1.5", "JavaSE-1.6", "JavaSE-1.7", "JavaSE-1.8", "JavaSE-9", "JavaSE-10", "JavaSE-11", "JavaSE-12", "JavaSE-13". We will update the list with each supported release of the JDK.

## Maven

[Maven](http://maven.apache.org/) is a software tool that helps you manage Java projects and automate application builds. The [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven) extension for Visual Studio Code provides fully integrated Maven support, allowing you to explore Maven projects, execute Maven commands, and perform the goals of build lifecycle and plugins.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-maven">Install the Maven for Java extension</a>

### Exploring Maven project

Once a Maven project is loaded, the extension will be activated and it will automatically scan for `pom.xml` files in your workspace and displays all Maven projects and their modules in the side bar.

![Maven Explorer](images/java-project/maven-explorer.png)

### Resolve unknown type

The Maven extension also supports searching Maven Central to resolve unknown types in your source code. You can do this by selecting the **Resolve unknown type** link shown on hover.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-resolve-unknown-type.mp4" type="video/mp4">
</video>

### Working with POM.xml

The extension provides code snippets and auto completion for adding Maven dependencies based on local Maven repositories. See how easy it is to add a new dependency to your `pom.xml` with those convenient features.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-pom-editing.mp4" type="video/mp4">
</video>

The extension also enables you to generate effective POM.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-effective-pom.mp4" type="video/mp4">
</video>

You can also use the command **Maven: Add a Dependency** (or `maven.project.addDependency`) to help add a new dependency to `pom.xml`. The process is interactive.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-add-dependency.mp4" type="video/mp4">
</video>

You can also add dependencies through the Java Dependency Viewer, which calls the same Maven command.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-add-dependency-2.mp4" type="video/mp4">
</video>

Furthermore, VS Code also supports showing dependencies in a tree view, which allows you to inspect all dependencies in your project at a single place and check for potential issues.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-dependency-tree.mp4" type="video/mp4">
</video>

### Execute Maven commands and goals

By right-clicking each Maven project in the explorer, you can conveniently run Maven goals.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-run.mp4" type="video/mp4">
</video>

The extension also preserves the history of goals for each project, so you can quickly rerun the previous command, which is useful when you're running a long custom goal.

There are two ways to rerun a goal:

1. Command Palette > Select **Maven: History** > Select a project > Select command from the history.
2. Right-click a project > Click **History** > Select command from history.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-history.mp4" type="video/mp4">
</video>

You can also specify your favorite commands in settings for future execution.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-favorite-command.mp4" type="video/mp4">
</video>

For each plug-in you use with your project, the extension also provides you an easy way to access the goals within each plugin.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-plugin-goal.mp4" type="video/mp4">
</video>

To debug Maven goals, right-click on a goal and start debugging. The Maven extension will call the Java debugger with the right parameters. This is a handy, time-saving feature.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/debug-maven-plugin-goals.mp4" type="video/mp4">
</video>

### Generate project from Maven Archetype

Another handy feature provided by this extension is to generate a Maven project from [Archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html). The extension loads archetypes listed in local/remote catalogs. After selection, the extension sends `mvn archetype:generate -D...` to the terminal.

There are two ways to generate a Maven project:

1. From the Command Palette, select **Maven: Generate from Maven Archetype**.
2. Right-click on a folder and select **Generate from Maven Archetype**.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/maven-archetype.mp4" type="video/mp4">
</video>

## Build Status

When you edit Java source code in Visual Studio Code, the Java language server is building your workspace to provide you with the necessary language features. You can see the detailed build task status and watch what is happening behind the scene by clicking the language server Status bar icon in the lower right.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/java.build.status.mp4" type="video/mp4">
</video>

### Additional resources

Visit the [GitHub Repo](https://github.com/Microsoft/vscode-maven) of the Maven extension for additional [configurations](https://github.com/Microsoft/vscode-maven/tree/master#additional-configurations) and a [troubleshooting guide](https://github.com/Microsoft/vscode-maven/blob/master/Troubleshooting.md).

In addition to Maven, there's also a [Bazel extension](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel) if you use Bazel to build and test your project.

## Next steps

Read on to find out more about:

* [Java Editing](/docs/java/java-editing.md) - Explore the editing features for Java in VS Code.
* [Java Debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
* [Java Testing](/docs/java/java-testing.md) - Use VS Code for your JUnit and TestNG cases.
* [Java Extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
