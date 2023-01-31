---
Order: 8
Area: java
TOCTitle: Testing
ContentId: 82be3b78-2c09-4571-abec-69f95f111e0f
PageTitle: Java Testing in Visual Studio Code
DateApproved: 2/11/2022
MetaDescription: See how you can test your Java code in Visual Studio Code.
MetaSocialImage:
---

# Testing Java with Visual Studio Code

Testing Java in Visual Studio Code is enabled by the [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) extension. It's a lightweight extension to run and debug Java test cases.

## Overview

The extension supports the following test frameworks:

- [JUnit 4](https://junit.org/junit4/) (v4.8.0+)
- [JUnit 5](https://junit.org/junit5/) (v5.1.0+)
- [TestNG](https://testng.org/doc/) (v6.9.13.3+)

The [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) works with the [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) and [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) extensions to provide the following features:

- Run/Debug test cases
- Customize test configurations
- View test report
- View tests in Testing Explorer

## Requirements

- JDK (version 1.8 or later)
- Visual Studio Code (version 1.59.0 or later)
- [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

## Project Setup

> **Note**: If you have already setup your Java test framework in your project, you can skip to the [Features](#features) section.

### Enable testing and adding test framework JARs to your project

Starting with Test Runner for Java version 0.34.0, you can enable a test framework for your unmanaged folder project (a project without any build tools) with just a few steps in the **Testing** Explorer:

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/enable-tests.mp4" type="video/mp4">
</video>

> **Note**: Currently this feature only supports unmanaged folders that do not contain any testing dependencies.

### JUnit 4

#### Maven

Add following configuration into your `pom.xml`:

```xml
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>(YOUR_JUNIT_VERSION)</version>
  <scope>test</scope>
</dependency>
```

#### Gradle

Make sure following lines are added in your `build.gradle`:

```groovy
plugins {
    java
}

dependencies {
    testImplementation('junit:junit:(YOUR_JUNIT_VERSION)')
}
```

#### Unmanaged folder

If your project does not use any build tools, you can enable JUnit 4 via the [Testing Explorer](#enable-testing-and-adding-test-framework-jars-to-your-project) or by manually downloading the following JARs and adding them to the project classpath (via setting `java.project.referencedLibraries`, check [Dependency management](/docs/java/java-project.md#dependency-management) for more information):

- [junit.jar](https://search.maven.org/search?q=g:junit%20AND%20a:junit)
- [hamcrest-core.jar](https://search.maven.org/artifact/org.hamcrest/hamcrest-core/1.3/jar)

> You can check the [official JUnit Wiki](https://github.com/junit-team/junit4/wiki/Download-and-Install) for more information about how to setup JUnit 4.

### JUnit 5

The JUnit 5 team provides a collection of sample projects with different build tools. Check the [junit5-sample repository](https://github.com/junit-team/junit5-samples) if your project uses Maven or Gradle as your build tool.

#### Unmanaged folder

If your project does not use any build tools, you can enable JUnit 5 via the [Testing Explorer](#enable-testing-and-adding-test-framework-jars-to-your-project) or by manually including the [junit-platform-console-standalone](https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/) JAR in the project classpath (via setting `java.project.referencedLibraries`, check [Dependency management](/docs/java/java-project.md#dependency-management) for more information).

### TestNG

#### Maven

Add following configuration into your `pom.xml`:

```xml
<dependency>
  <groupId>org.testng</groupId>
  <artifactId>testng</artifactId>
  <version>(YOUR_TESTNG_VERSION)</version>
  <scope>test</scope>
</dependency>
```

#### Gradle

Make sure following lines are added in your `build.gradle`:

```groovy
plugins {
    java
}

dependencies {
    testImplementation('org.testng:testng:(YOUR_TESTNG_VERSION)')
}
```

#### Unmanaged folder

If your project does not use any build tools, you can enable TestNG via the [Testing Explorer](#enable-testing-and-adding-test-framework-jars-to-your-project) or by manually downloading the following JARs and adding them to the project classpath (via setting `java.project.referencedLibraries`, check [Dependency management](/docs/java/java-project.md#dependency-management) for more information):

- [testng.jar](https://search.maven.org/search?q=g:org.testng%20AND%20a:testng)
- [jcommander.jar](https://search.maven.org/search?q=g:com.beust%20AND%20a:jcommander)
- [slf4j-api.jar](https://search.maven.org/search?q=g:org.slf4j%20AND%20a:slf4j-api)

## Features

### Run/Debug test cases

The Test Runner for Java extension will generate shortcuts (the green play button) on the left side of the class and method definition. To run the target test cases, select the green play button. You can also right-click on it to see more options.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/gutter-icon.mp4" type="video/mp4">
</video>

### Testing Explorer

The Testing Explorer is a tree view to show all the test cases in your workspace. You can select the beaker button on the left-side Activity bar of Visual Studio Code to open it. You can also run/debug your test cases and view their test results from there.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/test-explorer.mp4" type="video/mp4">
</video>

### Customize test configurations

Sometimes you may want to customize the configuration to run your test cases. To achieve this, you can add the configuration into your workspace [settings](/docs/getstarted/settings.md) under the section: `java.test.config`.

![Customize test configurations](images/java-testing/configuration.png)

Currently the supported configurations are:

- **args**: Specify the command-line arguments that will be passed to the test runner.
- **classPaths**: The classpaths defined in this setting will be appended to the resolved classpaths.
- **env**: Specify the extra environment variables when running the tests via a key-value object.
- **envFile**: Specify the absolute path to a file containing environment variable definitions.
- **modulePaths**: The modulepaths defined in this setting will be appended to the resolved modulepaths.
- **name**: Specify the name of the configuration item. You can set the default configuration name via setting `java.test.defaultConfig`.
- **preLaunchTask**: Specify the label of a task specified in `tasks.json` (in the workspace's `.vscode` folder). The task will be launched before the start of testing.
- **sourcePaths**: Specify the extra source paths when debugging the tests.
- **vmArgs**: Specify the extra options and system properties for the JVM.
- **workingDirectory**: Specify the working directory when running the tests.
- **testKind**: Specify the targeting test framework for this test configuration. Supported values are `junit`, `testng`.
- **filters**: Specify the test filters.
  - **tags**: Specify the tags to be included or excluded. Tags having `!` as the prefix will be **excluded**. Note: This setting only takes effect when `testKind` is set to `junit`

More details can be found on the [vscode-java-test Wiki](https://github.com/Microsoft/vscode-java-test/wiki/Run-with-Configuration).

### View test results

After running/debugging the test cases, the state of the related test items will be updated in both editor decorations and the Testing Explorer.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/test-result.mp4" type="video/mp4">
</video>

You can trigger the command **Test: Peek Output** to peek the results view. You can select the links in the stack trace to navigate to the source location.

### Generate tests

The extension provides features to help you scaffold test cases. You can find the entry in the editor context menu. Select **Source Action...** and then choose **Generate Tests...**.

If you trigger this source action from your main source code (test subject), you will be asked the test class's fully qualified name and the methods you want to test. The extension will then generate the test code for you:

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/generate-tests-from-main.mp4" type="video/mp4">
</video>

If you trigger the source action from your test source code, you will be asked which kinds of test methods you want to add. Including the lifecycle methods and the test method:

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/generate-tests-from-test.mp4" type="video/mp4">
</video>

### Test navigation

The extension provides features to help you navigate between your tests and test subjects. If your source code is contained in `src/main/java` or `src/test/java`, you can find the entry named **Go to Test** or **Go to Test Subject** in the editor context menu:

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-testing/test-navigation.mp4" type="video/mp4">
</video>

You can also find the command in the Command Palette (`kb(workbench.action.showCommands)`) by searching for **Java: Go to Test**.

### VS Code testing commands

There are other testing commands (for example, **Run Tests in Current File**) that can be found by searching for 'Test:' in the Command Palette (`kb(workbench.action.showCommands)`).

![Testing commands in the Command Palette](images/java-testing/command_palette.png)

### VS Code testing settings

There are VS Code settings specific to testing that can be found by searching for 'testing' in the Settings editor (`kb(workbench.action.openSettings)`).

![Testing settings in the Settings editor](images/java-testing/settings.png)

## FAQ

If you meet any problem when using the extension, you can review the [FAQ](https://github.com/microsoft/vscode-java-test/wiki/FAQ) and our [issue list](https://github.com/microsoft/vscode-java-test/issues) to check if there is an answer to your problem.

## Contributing and feedback

If you are interested in providing feedback or contributing directly to the code base, please read [Contributing to Test Runner for Java](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md), which covers the following:

- [Questions and Feedback](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#questions-and-feedback)
- [Reporting Issues](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#reporting-issues)
- [Contributing Fixes](https://github.com/Microsoft/vscode-java-test/blob/main/CONTRIBUTING.md#contributing-fixes)

## Next steps

Read on to find out about:

- [Debugging](/docs/java/java-debugging.md) - Find out how to debug your Java project with VS Code.
- [Extensions for Java](/docs/java/extensions.md) - Learn about more useful Java extensions for VS Code.
