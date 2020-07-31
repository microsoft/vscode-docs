---
Order: 5
Area: java
TOCTitle: Project Management
ContentId: 251cba68-c77f-4ac6-a5de-1fab8dcca867
PageTitle: Lightweight Mode, Maven Support, Java Package, and Dependency Management in Visual Studio Code
DateApproved: 7/30/2020
MetaDescription: Lightweight Mode, Maven Support, Java Package and Dependency Management in Visual Studio Code
MetaSocialImage:
---

# Java project management in VS Code

This document will give you an overview of how to manage your project.

If you run into any issues when using the features below, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'project')" href="javascript:void(0)">Report an issue</a>

## Project management

Project Management in VS Code for Java requires the [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency) extension. This extension has many features including creating projects as well as viewing the package structure of the project and its dependencies.

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

Visual Studio Code also supports Java files without a project system. The solution is folder-based, so you can open a source folder with Visual Studio Code.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/standalone.mp4" type="video/mp4">
</video>

### Multiple source folders

If you have multiple subfolders that have source code for your project, you can easily add these folders to source path, then all the code inside will be correctly compiled.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/multiple-source.mp4" type="video/mp4">
</video>

## Lightweight Mode

VS Code for Java supports two modes, lightweight and standard. With lightweight mode, only source files and JDK are resolved by language server; with standard mode, imported dependencies are resolved and project is built by language server. Lightweight mode works best when you need a super quick-to-start and lightweight environment to work with your source files, for example, reading source code, navigating among source code and JDK, viewing outline and Javadoc, and detecting and fixing syntax errors. Also, code completion is supported within the scope of source files and JDK.

Lightweight mode does neither resolve imported dependencies nor build project, so it does not support run, debugging, refactoring, linting or detecting semantic errors. For taking advantage of these features, you need switch your workspace from lightweight mode to standard mode.

You can control which mode to launch with by configuring `java.server.launchMode` with below options:

- `Hybrid` (default) - Firstly, a workspace is opened with lightweight mode. You will be asked whether to switch to standard mode if your workspace contains unresolved Java project. If you choose "Later", it will stay in lightweight mode. You can click the server mode icon on status bar to manually switch to standard mode.
- `Standard` - A workspace is opened with standard mode.
- `LightWeight` - A workspace is opened with lightweight mode. You can click the server mode icon on status bar to manually switch to standard mode.

<div id="codicon-listing">
Status bar indicates which mode current workspace is in using different icons. <i class="codicon codicon-rocket"></i> - workspace opened with lightweight mode; <i class="codicon codicon-sync"></i> - workspace being opened with standard mode; <i class="codicon codicon-thumbsup"> - workspace opened with standard mode. Clicking lightweight mode icon takes you to standard mode.
</div>

![Switch to Standard](images/java-project/switch-to-standard.gif)

## Working with JAR files

If you're just starting to learn Java and don't know what Maven or Gradle are, the Java extension lets you work with JAR files directly without any build tools through the **JAVA DEPENDENCIES** view.

### Adding external JAR

You can use the Java Dependency Viewer to add any JAR file to your project. Go to the **JAVA DEPENDENCIES** view, find the **Referenced Libraries** node, and click the **+** button to add a JAR file:

![Add Dependency](images/java-project/manage-dependencies.gif)

The other easy way to bring additional JAR files as dependencies is to create a `lib/` folder in the root directory of the standalone files and place your JAR files there. Source for `foo.jar` is automatically detected if there is a `foo-sources.jar` in the `lib/` folder.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/lib.mp4" type="video/mp4">
</video>

### Library configuration

Behind the scene, there's a setting `java.project.referencedLibaries` in `settings.json`. Below are details on how to customize this setting.

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

## Configure JDK

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

Runtime names must be one of: "J2SE-1.5", "JavaSE-1.6", "JavaSE-1.7", "JavaSE-1.8", "JavaSE-9", "JavaSE-10", "JavaSE-11", "JavaSE-12", "JavaSE-13", "JavaSE-14". We will update the list with each supported release of the JDK.

> **Note**: To enable Java preview features, see [How can I use VS Code with new Java versions](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions).

## Build Status

When you edit Java source code in Visual Studio Code, the Java language server is building your workspace to provide you with the necessary language features. You can see the detailed build task status and watch what is happening behind the scene by clicking the language server Status bar icon in the lower right.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-project/java.build.status.mp4" type="video/mp4">
</video>

### Additional resources

Visit the [GitHub Repo](https://github.com/microsoft/vscode-maven) of the Maven extension for additional [configurations](https://github.com/microsoft/vscode-maven/tree/master#additional-configurations) and a [troubleshooting guide](https://github.com/microsoft/vscode-maven/blob/master/Troubleshooting.md).

In addition to Maven, there's also a [Bazel extension](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel) if you use Bazel to build and test your project.

## Next steps

Read on to find out more about:

- [Java Editing](/docs/java/java-editing.md) - Explore the editing features for Java in VS Code.
- [Java Debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
- [Java Testing](/docs/java/java-testing.md) - Use VS Code for your JUnit and TestNG cases.
- [Java Extensions](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
